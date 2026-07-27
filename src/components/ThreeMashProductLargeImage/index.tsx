import { createMediaSrcset, getDefaultSrc } from "@ikas/bp-storefront";
import { Props } from "./types";

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
    data.html,
    data.text,
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

function html(value: unknown) {
  return { __html: propString(value) };
}

function numberValue(value: number | undefined, fallback: number, min?: number, max?: number) {
  const next = Number(value);
  if (!Number.isFinite(next)) return fallback;
  return Math.min(max ?? next, Math.max(min ?? next, next));
}

function cssLength(value: number | undefined, fallback: number) {
  return `${numberValue(value, fallback)}px`;
}

function normalizedAlign(value: unknown) {
  const align = text(value, "center").toLowerCase();
  return ["left", "center", "right"].includes(align) ? align : "center";
}

function objectFit(value: unknown) {
  const fit = text(value, "cover").toLowerCase();
  return ["contain", "cover", "fill", "scale-down", "none"].includes(fit) ? fit : "cover";
}

function imageSource(value: unknown) {
  if (!value) return "";
  if (typeof value === "string") return value.trim();
  try {
    return getDefaultSrc(value as any) || propString(value);
  } catch {
    return propString(value);
  }
}

function imageSrcSet(value: unknown) {
  if (!value || typeof value === "string") return "";
  try {
    return createMediaSrcset(value as any) || "";
  } catch {
    return "";
  }
}

function loadingMode(value: unknown) {
  const mode = text(value, "lazy").toLowerCase();
  return mode === "eager" ? "eager" : "lazy";
}

function decodingMode(value: unknown) {
  const mode = text(value, "async").toLowerCase();
  return ["async", "sync", "auto"].includes(mode) ? mode : "async";
}

function fetchPriorityMode(value: unknown) {
  const mode = text(value, "auto").toLowerCase();
  return ["high", "low", "auto"].includes(mode) ? mode : "auto";
}

export function ThreeMashProductLargeImage(props: Props) {
  const src = imageSource(props.image) || text(props.imageUrl);
  const srcSet = props.useSrcSet !== false ? imageSrcSet(props.image) : "";
  const title = text(props.titleText);
  const description = text(props.descriptionHtml);
  const align = normalizedAlign(props.textAlign);
  const loading = loadingMode(props.loadingMode);
  const fetchPriority = fetchPriorityMode(props.fetchPriorityMode);

  const style = {
    "--tmplg-bg": text(props.backgroundColor, "#ffffff"),
    "--tmplg-text": text(props.textColor, "#050505"),
    "--tmplg-muted": text(props.mutedTextColor, "#171717"),
    "--tmplg-max": cssLength(props.maxWidth, 1240),
    "--tmplg-image-max": cssLength(props.imageMaxWidth, 1240),
    "--tmplg-pt": cssLength(props.paddingTop, 72),
    "--tmplg-pb": cssLength(props.paddingBottom, 72),
    "--tmplg-ratio": text(props.imageAspectRatio, "16 / 9"),
    "--tmplg-radius": cssLength(props.imageBorderRadius, 0),
    "--tmplg-fit": objectFit(props.imageFit),
    "--tmplg-position": text(props.imagePosition, "center center"),
    "--tmplg-title-size": cssLength(props.titleFontSize, 28),
    "--tmplg-body-size": cssLength(props.bodyFontSize, 16),
    "--tmplg-text-gap": cssLength(props.textSpacing, 24),
  } as any;

  return (
    <section id={text(props.sectionAnchorId) || undefined} className="three-mash-product-large-image" style={style}>
      <div className="tmplg-wrap">
        {props.showText !== false && (title || description) ? (
          <div className={`tmplg-copy tmplg-copy-${align}`}>
            {title ? <h2>{title}</h2> : null}
            {description ? <div className="tmplg-description" dangerouslySetInnerHTML={html(props.descriptionHtml)} /> : null}
          </div>
        ) : null}

        <div className="tmplg-frame">
          {src ? (
            <img
              src={src}
              srcSet={srcSet || undefined}
              sizes={text(props.sizes, "(max-width: 900px) calc(100vw - 36px), min(1240px, calc(100vw - 64px))")}
              alt={text(props.imageAlt, title)}
              loading={loading}
              decoding={decodingMode(props.decodingMode) as any}
              fetchPriority={fetchPriority as any}
            />
          ) : (
            <div className="tmplg-placeholder">{text(props.placeholderText, "Görsel ekleyin")}</div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ThreeMashProductLargeImage;
