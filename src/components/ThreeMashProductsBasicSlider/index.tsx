import { useEffect, useRef } from "preact/hooks";
import { basicSliderImages } from "../../assets/basic-slider-images-data";
import { Props } from "./types";
import { resolveSharedProductDetailData } from "../../sub-components/ThreeMashProductDetailData";
import { tLocalized } from "../../utils/i18n";
import { sanitizeHtml } from "../../utils/sanitizeHtml";

const DEFAULT_IMAGES = basicSliderImages;
function defaultIntroTitle() {
  return tLocalized("Uyumlu Cihazlar", "Compatible Devices");
}
function defaultIntroDescription() {
  return tLocalized(
    "<p>Custom Resin Solutions <b>resmi distribütörü</b> olarak; kullandığınız 3D yazıcı markası fark etmeksizin, parametre uyumlama işlemini <b>ücretsiz</b> olarak gerçekleştirmekteyiz. Satış sonrası kullanıcı eğitimleri ve <b>7/24 teknik destek</b> ile yanınızdayız.</p>",
    "<p>As the <b>official distributor</b> of Custom Resin Solutions, we carry out parameter matching <b>free of charge</b>, regardless of which 3D printer brand you use. We're with you with after-sales user training and <b>24/7 technical support</b>.</p>"
  );
}

type SliderImage = {
  src: string;
  alt: string;
};

function propString(value: unknown) {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (!value || typeof value !== "object") return "";

  const data = value as Record<string, unknown>;
  const candidates = [
    data.src,
    data.url,
    data.defaultSrc,
    data.originalSrc,
    data.imageUrl,
    data.value,
    data.text,
    data.title,
    (data.image as Record<string, unknown> | undefined)?.src,
    (data.image as Record<string, unknown> | undefined)?.url,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) return candidate;
  }

  return "";
}

function text(value: unknown, fallback = "") {
  const trimmed = propString(value).trim();
  return trimmed || fallback;
}

function boolValue(value: unknown): boolean | undefined {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value === 0 ? false : true;
  if (value && typeof value === "object") {
    const data = value as Record<string, unknown>;
    for (const candidate of [data.value, data.checked, data.enabled, data.selected, data.current, data.data]) {
      const parsed = boolValue(candidate);
      if (parsed !== undefined) return parsed;
    }
  }

  const normalized = propString(value).trim().toLocaleLowerCase("tr");
  if (["false", "0", "no", "hayir", tLocalized("hayır", "no"), "kapali", tLocalized("kapalı", "closed"), "off"].includes(normalized)) return false;
  if (["true", "1", "yes", "evet", "acik", tLocalized("açık", "open"), "on"].includes(normalized)) return true;
  return undefined;
}

function slugify(value: string) {
  return value
    .toLocaleLowerCase("tr")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function collectProductStrings(value: unknown, output: string[] = []) {
  if (!value) return output;
  if (typeof value === "string" || typeof value === "number") {
    const raw = String(value).trim();
    if (raw) {
      output.push(raw.toLocaleLowerCase("tr"));
      output.push(slugify(raw));
    }
    return output;
  }
  if (Array.isArray(value)) {
    value.forEach((item) => collectProductStrings(item, output));
    return output;
  }
  if (typeof value === "object") {
    const data = value as Record<string, unknown>;
    for (const key of ["slug", "handle", "url", "path", "href", "name", "title", "id"]) collectProductStrings(data[key], output);
    for (const key of ["metadata", "product", "variant", "variants", "selectedVariant"]) collectProductStrings(data[key], output);
  }
  return output;
}

function currentPageStrings() {
  const terms: string[] = [];
  if (typeof window !== "undefined") {
    terms.push(window.location.pathname, window.location.href);
    // NOTE: __NEXT_DATA__ is typed in src/types/globals.d.ts (Next.js runtime API)
    const nextSlug = window.__NEXT_DATA__?.query?.slug;
    if (typeof nextSlug === "string") terms.push(nextSlug);
  }
  if (typeof document !== "undefined") {
    terms.push(document.title);
    document.querySelectorAll('link[rel="canonical"], meta[property="og:url"], meta[property="og:title"], meta[name="twitter:title"]').forEach((node) => {
      const value = node instanceof HTMLMetaElement ? node.content : node.getAttribute("href");
      if (value) terms.push(value);
    });
  }
  return terms;
}

function isResinProduct(product: unknown) {
  const terms = Array.from(new Set([...collectProductStrings(product), ...currentPageStrings()].map(slugify))).filter((term) => term.length > 2);
  if (!terms.length) return false;

  const text = terms.join(" ");
  const resinTerms = [
    "dental-3d-yazici-recineleri",
    "recine",
    "recinesi",
    "resin",
    "composite",
    "gingiva",
    "model",
    "denture",
    "aligner",
    "splint",
    "guide",
    "ibt",
    "cast",
    "tray",
    "flexit",
    "trial",
    "study",
    "clear",
  ];

  return resinTerms.some((term) => text.includes(term));
}

function sectionIsVisible(props: Props) {
  if (boolValue(props.sectionVisible) === false) return false;
  return isResinProduct(props.product);
}

function html(value: unknown) {
  return { __html: propString(value) };
}

function numberValue(value: number | undefined, fallback: number, min: number, max: number) {
  const next = Number(value);
  if (!Number.isFinite(next)) return fallback;
  return Math.min(max, Math.max(min, next));
}

function percent(value: number | undefined, fallback: number, min = 0, max = 220) {
  return `${numberValue(value, fallback, min, max)}%`;
}

function legacyNumberValue(value: number | undefined, legacyDefault: number, fallback: number, min: number, max: number) {
  const next = Number(value);
  if (!Number.isFinite(next) || next === legacyDefault) return fallback;
  return Math.min(max, Math.max(min, next));
}

function sliderGapValue(value: number | undefined) {
  const next = Number(value);
  if (!Number.isFinite(next) || next === 72 || next === 92) return 42;
  return Math.min(140, Math.max(8, next));
}

function sliderDurationValue(value: number | undefined) {
  const next = Number(value);
  if (!Number.isFinite(next) || next === 24) return 64;
  return Math.min(180, Math.max(16, next));
}

function objectFit(value: unknown) {
  const normalized = text(value, "contain").toLowerCase();
  return ["contain", "cover", "fill", "scale-down"].includes(normalized) ? normalized : "contain";
}

function backgroundColor(value: unknown) {
  const normalized = text(value, "#ffffff").toLowerCase();
  if (normalized === "#fafaf7" || normalized === "#fafa f7" || normalized === "var(--tm-theme-bg, #ffffff)") return "#ffffff";
  return text(value, "#ffffff");
}

function themeToken(value: string | undefined, fallback: string, token: string) {
  const trimmed = value?.trim();
  if (trimmed && trimmed.toLowerCase() !== fallback.toLowerCase()) return trimmed;
  return `var(${token}, ${fallback})`;
}

function sliderImage(props: Props, index: number): SliderImage | null {
  const data = props as Record<string, unknown>;
  if (data[`image${index}Enabled`] === false) return null;

  const src = text(data[`image${index}`], DEFAULT_IMAGES[index - 1] || "");
  if (!src) return null;

  return {
    src,
    alt: text(data[`image${index}Alt`], `Uyumlu cihaz ${index}`),
  };
}

function sliderImages(props: Props) {
  const count = numberValue(props.imageCount, DEFAULT_IMAGES.length, 1, 9);
  return Array.from({ length: count }, (_, index) => sliderImage(props, index + 1)).filter((item): item is SliderImage => Boolean(item));
}

function ImageItem({ image, cloneIndex }: { image: SliderImage; cloneIndex?: number }) {
  return (
    <div className="tmpbs-image-item" aria-hidden={cloneIndex !== undefined ? "true" : undefined}>
      <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
    </div>
  );
}

export function ThreeMashProductsBasicSlider(props: Props) {
  const sourceData = resolveSharedProductDetailData(props.product, (props as Record<string, unknown>).productTemplateJson);

  const sliderRef = useRef<HTMLDivElement>(null);
  const sectionVisible = !sourceData && sectionIsVisible(props);
  const images = sectionVisible ? sliderImages(props) : [];
  const itemCount = images.length;

  useEffect(() => {
    if (!sectionVisible) return;
    const slider = sliderRef.current;
    if (!slider) return;
    const track = slider.querySelector<HTMLElement>(".tmpbs-track");
    if (!track) return;
    slider.classList.remove("is-loop-ready");
    if (itemCount <= 1) return;

    const measure = () => {
      const target = Array.from(track.children).filter((child): child is HTMLElement => child instanceof HTMLElement)[itemCount];
      if (!target) return;
      const distance = target.offsetLeft;
      if (distance <= 0) return;
      track.style.setProperty("--tmpbs-loop-distance", `${distance}px`);
      slider.classList.add("is-loop-ready");
    };

    const frame = window.requestAnimationFrame(measure);
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    observer?.observe(slider);
    observer?.observe(track);
    track.querySelectorAll("img").forEach((image) => {
      if (!image.complete) image.addEventListener("load", measure, { once: true });
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [itemCount, sectionVisible]);

  if (sourceData) return null;

  if (!sectionVisible) return null;

  const style = {
    "--tmr-bg": backgroundColor(props.backgroundColor),
    "--tmr-text": themeToken(props.textColor, "#0E0E0C", "--tm-theme-text"),
    "--tmr-sub": themeToken(props.subTextColor, "#55554E", "--tm-theme-sub"),
    "--tmr-slider-max": `${numberValue(props.maxWidth, 1240, 320, 1800)}px`,
    "--tmr-slider-padding-top": `${numberValue(props.paddingTop, 32, 0, 180)}px`,
    "--tmr-slider-padding-bottom": `${numberValue(props.paddingBottom, 32, 0, 180)}px`,
    "--tmr-slider-intro-max": `${numberValue(props.introMaxWidth, 1320, 320, 1800)}px`,
    "--tmr-slider-intro-spacing": `${numberValue(props.introSpacing, 42, 0, 120)}px`,
    "--tmr-slider-intro-title-size": `${numberValue(props.introTitleFontSize, 22, 12, 72)}px`,
    "--tmr-slider-intro-body-size": `${numberValue(props.introBodyFontSize, 16, 10, 28)}px`,
    "--tmpbs-duration": `${sliderDurationValue(props.carouselDurationSeconds)}s`,
    "--tmpbs-edge-fade": `${numberValue(props.edgeFadeWidth, 44, 0, 140)}px`,
    "--tmpbs-gap": `${sliderGapValue(props.imageGap)}px`,
    "--tmpbs-width": `${legacyNumberValue(props.imageWidth, 220, 150, 48, 360)}px`,
    "--tmpbs-height": `${legacyNumberValue(props.imageHeight, 250, 150, 48, 360)}px`,
    "--tmpbs-fit": objectFit(props.imageFit),
    "--tmpbs-scale": numberValue(props.imageScale, 1, 0.2, 2),
    "--tmpbs-x": `${numberValue(props.imageXOffset, 0, -160, 160)}px`,
    "--tmpbs-y": `${numberValue(props.imageYOffset, 0, -160, 160)}px`,
    "--tmpbs-opacity": percent(props.imageOpacity, 100, 0, 100),
    "--tmpbs-brightness": percent(props.imageBrightness, 100),
    "--tmpbs-contrast": percent(props.imageContrast, 100),
    "--tmpbs-saturation": percent(props.imageSaturation, 100, 0, 260),
    "--tmpbs-hue": `${numberValue(props.imageHue, 0, -180, 180)}deg`,
    "--tmpbs-invert": percent(props.imageInvert, 0, 0, 100),
    "--tmpbs-desktop-items": numberValue(props.visibleImagesDesktop, 4, 1, 6),
    "--tmpbs-tablet-items": numberValue(props.visibleImagesTablet, 3, 1, 4),
  } as any;

  const introTitle = text(props.introTitle, defaultIntroTitle());
  const introDescriptionHtml = text(props.introDescriptionHtml, defaultIntroDescription());
  const hasIntro = props.showIntro !== false && (introTitle || introDescriptionHtml);
  const noPause = props.pauseOnHover === false ? " is-no-pause" : "";
  const single = itemCount === 1 ? " is-single" : "";
  const baseItems = images.map((image) => <ImageItem image={image} />);
  const items =
    itemCount <= 1
      ? baseItems
      : [
          ...baseItems,
          ...images.map((image, index) => <ImageItem image={image} cloneIndex={index + 1} />),
          ...images.map((image, index) => <ImageItem image={image} cloneIndex={index + images.length + 1} />),
        ];

  return (
    <section id={props.sectionAnchorId || undefined} className="three-mash-products-basic-slider" style={style}>
      <div className="tmpbs-wrap">
        {hasIntro ? (
          <div className={`tmpbs-intro tmpbs-intro-${props.introAlign || "center"}`}>
            {introTitle ? <h2>{introTitle}</h2> : null}
            {introDescriptionHtml ? <div className="tmpbs-intro-copy" dangerouslySetInnerHTML={{ __html: sanitizeHtml(introDescriptionHtml) }} /> : null}
          </div>
        ) : null}

        {itemCount ? (
          <div ref={sliderRef} className={`tmpbs-slider${single}${noPause}`} aria-label={props.carouselAriaLabel || "Uyumlu cihazlar"}>
            <div className="tmpbs-track">{items}</div>
          </div>
        ) : (
          <div className="tmpbs-setup">{props.setupMessage || tLocalized("Slider görseli ekleyin.", "Add a slider image.")}</div>
        )}
      </div>
    </section>
  );
}

export default ThreeMashProductsBasicSlider;
