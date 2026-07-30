import { useEffect, useRef, useState } from "preact/hooks";
import { Props } from "./types";

function stripInlineTypographyStyles(markup: string) {
  return markup.replace(/\sstyle=("[^"]*"|'[^']*'|[^\s>]+)/gi, (_match, rawValue: string) => {
    const quote = rawValue[0] === '"' || rawValue[0] === "'" ? rawValue[0] : "";
    const style = quote ? rawValue.slice(1, -1) : rawValue;
    const kept = style
      .split(";")
      .map((part) => part.trim())
      .filter(
        (part) =>
          part &&
          !/^(font-family|font-size|font-weight|font-style|font-variant(?:-[\w-]+)?|letter-spacing|color|background(?:-color)?|border-color|text-align)\s*:/i.test(part),
      );

    return kept.length ? ` style=${quote}${kept.join("; ")}${quote}` : "";
  });
}

function inlineHtml(value?: string) {
  return stripInlineTypographyStyles((value || "")
    .trim()
    .replace(/<\/p>\s*<p[^>]*>/gi, "<br />")
    .replace(/^<p[^>]*>/i, "")
    .replace(/<\/p>$/i, ""));
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function styleTextChunks(markup: string, props?: Props) {
  const target = props?.styledPhrase?.trim();
  if (props?.wordStyleEnabled === false || !target) return markup;

  const matcher = new RegExp(escapeRegExp(target), "gi");
  return markup
    .split(/(<[^>]+>)/g)
    .map((part) => {
      if (!part || part.startsWith("<")) return part;
      return part.replace(matcher, (match) => `<span class="tmproblem-word-style">${match}</span>`);
    })
    .join("");
}

function html(value?: string, props?: Props) {
  return { __html: styleTextChunks(inlineHtml(value), props) };
}

function RichInline({ value, className, wordStyle }: { value?: string; className?: string; wordStyle?: Props }) {
  return <span className={className} dangerouslySetInnerHTML={html(value, wordStyle)} />;
}

function sideHtml(value?: string, enabled = true, props?: Props) {
  const source = value || "";
  if (!enabled) return html(source.replace(/<span class="tmproblem-glitch"[^>]*>(.*?)<\/span>/gi, "$1"), props);
  if (source.includes("tmproblem-glitch")) return html(source, props);
  return html(source.replace(/dijitalleşti/gi, (match) => `<span class="tmproblem-glitch">${match}</span>`), props);
}

function anchorId(value?: string) {
  const trimmed = value?.trim();
  return trimmed || undefined;
}

function imageSource(value: unknown) {
  if (typeof value === "string" && value.trim()) {
    return imageIdToUrl(value);
  }

  if (value && typeof value === "object") {
    const image = value as {
      id?: unknown;
      url?: unknown;
      src?: unknown;
      imageUrl?: unknown;
      value?: unknown;
      image?: { url?: unknown; src?: unknown };
      file?: { url?: unknown; src?: unknown };
    };
    if (typeof image.url === "string") return imageIdToUrl(image.url);
    if (typeof image.src === "string") return imageIdToUrl(image.src);
    if (typeof image.imageUrl === "string") return imageIdToUrl(image.imageUrl);
    if (typeof image.value === "string") return imageIdToUrl(image.value);
    if (typeof image.id === "string") return imageIdToUrl(image.id);
    if (typeof image.image?.url === "string") return imageIdToUrl(image.image.url);
    if (typeof image.image?.src === "string") return imageIdToUrl(image.image.src);
    if (typeof image.file?.url === "string") return imageIdToUrl(image.file.url);
    if (typeof image.file?.src === "string") return imageIdToUrl(image.file.src);
  }

  return "";
}

function imageIdToUrl(value: string) {
  const trimmed = value.trim();
  if (trimmed.startsWith("theme-images/")) {
    return `https://cdn.myikas.com/images/${trimmed}/image_3840.webp`;
  }
  return trimmed;
}

function numberInRange(value: unknown, fallback: number, min: number, max: number) {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.min(max, Math.max(min, numeric));
}

function imageFit(value: unknown) {
  return value === "cover" || value === "fill" || value === "scale-down" ? value : "contain";
}

function percentage(value: unknown, fallback: number, min: number, max: number) {
  return `${numberInRange(value, fallback, min, max)}%`;
}

function parseRangeValue(value?: string) {
  const match = (value || "").match(/^\s*(\d+)\s*[–-]\s*(\d+)\s*(.*)$/);
  if (!match) return null;
  return {
    min: Number(match[1]),
    max: Number(match[2]),
    suffix: match[3] || "",
  };
}

export function ThreeMashProblem(props: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const badRange = parseRangeValue(props.badValue);
  const [animatedBadValue, setAnimatedBadValue] = useState(() => (badRange ? `0–0${badRange.suffix}` : props.badValue || ""));
  const hairImage = imageSource(props.hairImageUrl);

  useEffect(() => {
    const range = parseRangeValue(props.badValue);
    if (!range || props.showBadValueCountUp === false) {
      setAnimatedBadValue(props.badValue || "");
      return undefined;
    }

    const section = sectionRef.current;
    if (!section) return undefined;

    let frame = 0;
    let started = false;
    let observer: IntersectionObserver | undefined;

    const animate = () => {
      const duration = 820;
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentMin = Math.round(range.min * eased);
        const currentMax = Math.round(range.max * eased);
        setAnimatedBadValue(`${currentMin}–${currentMax}${range.suffix}`);
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    const startAnimation = () => {
      if (started) return;
      started = true;
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
        setAnimatedBadValue(props.badValue || "");
        return;
      }
      setAnimatedBadValue(`0–0${range.suffix}`);
      animate();
    };

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          startAnimation();
          observer?.disconnect();
        },
        { threshold: 0.34 },
      );
      observer.observe(section);
    } else {
      startAnimation();
    }

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [props.badValue, props.showBadValueCountUp]);

  const themeStyle = {
    "--tmproblem-bg": "var(--bg, #FAFAF7)",
    "--tmproblem-text": "var(--ink, #0E0E0C)",
    "--tmproblem-sub": "var(--sub, #55554E)",
    "--tmproblem-muted": "var(--mut, #8F8F86)",
    "--tmproblem-line": "var(--line, #E6E6E0)",
    "--tmproblem-line-strong": "var(--line2, #D5D5CD)",
    "--tmproblem-panel": "#FFFFFF",
    "--tmproblem-accent": "var(--lime, #C7F136)",
    "--tmproblem-accent-text": "var(--lime-ink, #3D4D0E)",
    "--tmproblem-danger": "var(--red, #E2492F)",
    "--tmproblem-bg-glow-color": "var(--lime, #C7F136)",
    "--tmproblem-bg-glow-opacity": 0,
    "--tmproblem-word-color": "var(--lime, #C7F136)",
    "--tmproblem-word-weight": props.styledPhraseBold ? "800" : "inherit",
    "--tmproblem-word-style": props.styledPhraseItalic ? "italic" : "inherit",
    "--tmproblem-hair-image-width": `${numberInRange(props.hairImageWidth, 58, 8, 140)}px`,
    "--tmproblem-hair-image-height": `${numberInRange(props.hairImageHeight, 58, 8, 140)}px`,
    "--tmproblem-hair-image-x": `${numberInRange(props.hairImageXOffset, 0, -80, 80)}px`,
    "--tmproblem-hair-image-y": `${numberInRange(props.hairImageYOffset, 0, -80, 80)}px`,
    "--tmproblem-hair-image-fit": imageFit(props.hairImageFit),
    "--tmproblem-hair-image-opacity": numberInRange(props.hairImageOpacity, 100, 0, 100) / 100,
    "--tmproblem-hair-image-brightness": percentage(props.hairImageBrightness, 100, 0, 220),
    "--tmproblem-hair-image-contrast": percentage(props.hairImageContrast, 100, 0, 220),
    "--tmproblem-hair-image-saturation": percentage(props.hairImageSaturation, 100, 0, 300),
    "--tmproblem-hair-image-hue": `${numberInRange(props.hairImageHue, 0, -180, 180)}deg`,
    "--tmproblem-hair-image-invert": percentage(props.hairImageInvert, 0, 0, 100),
  } as any;
  const hasRichBadValue = Boolean(props.badValue && /<[^>]+>/.test(props.badValue));

  return (
    <section ref={sectionRef} className="three-mash-problem" id={anchorId(props.sectionAnchorId)} style={themeStyle}>
      <div className="tmproblem-wrap">
        <div className="tmproblem-index">
          <span className="tmproblem-index-number" dangerouslySetInnerHTML={html(props.indexNumber, props)} />
          <span className="tmproblem-index-text" dangerouslySetInnerHTML={html(props.indexText, props)} />
          <span className="tmproblem-index-line" />
        </div>

        <div className="tmproblem-head">
          <h2>
            <RichInline value={props.titleText} wordStyle={props} /> <span className="tmproblem-title-em" dangerouslySetInnerHTML={html(props.titleEmphasis, props)} />
          </h2>
          <div className="tmproblem-side" dangerouslySetInnerHTML={sideHtml(props.sideHtml, props.showDigitalGlitch !== false, props)} />
        </div>

        <div className="tmproblem-cards">
          <article className="tmproblem-card tmproblem-card-bad">
            <div className="tmproblem-card-label" dangerouslySetInnerHTML={html(props.badLabel, props)} />
            <div className="tmproblem-card-value" dangerouslySetInnerHTML={html(hasRichBadValue ? props.badValue : animatedBadValue, props)} />
            <div className="tmproblem-card-description" dangerouslySetInnerHTML={html(props.badDescriptionHtml, props)} />
          </article>

          <article className="tmproblem-card tmproblem-card-good">
            <div className="tmproblem-card-label" dangerouslySetInnerHTML={html(props.goodLabel, props)} />
            <div className="tmproblem-card-value" dangerouslySetInnerHTML={html(props.goodValue, props)} />
            <div className="tmproblem-card-description" dangerouslySetInnerHTML={html(props.goodDescriptionHtml, props)} />
          </article>
        </div>

        {props.showHairNote !== false ? (
          <div className="tmproblem-hair-note">
            {hairImage ? <img className="tmproblem-hair-image" src={hairImage} alt="" aria-hidden="true" /> : null}
            <p dangerouslySetInnerHTML={html(props.hairNoteHtml, props)} />
          </div>
        ) : null}

        {props.showReference !== false ? (
          <p className="tmproblem-reference" dangerouslySetInnerHTML={html(props.referenceHtml, props)} />
        ) : null}
      </div>
    </section>
  );
}

export default ThreeMashProblem;
