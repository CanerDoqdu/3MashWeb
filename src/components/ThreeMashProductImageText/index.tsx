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

function objectFit(value: unknown) {
  const normalized = text(value, "contain").toLowerCase();
  return ["contain", "cover", "fill", "scale-down"].includes(normalized) ? normalized : "contain";
}

export function ThreeMashProductImageText(props: Props) {
  const imageSrc = text(props.imageUrl);
  const bullets = [
    text(props.bullet1Text),
    text(props.bullet2Text),
    text(props.bullet3Text),
    text(props.bullet4Text),
    text(props.bullet5Text),
    text(props.bullet6Text),
  ].filter(Boolean);

  const style = {
    "--tmpit-bg": text(props.backgroundColor, "#ffffff"),
    "--tmpit-text": text(props.textColor, "#050505"),
    "--tmpit-muted": text(props.mutedTextColor, "#050505"),
    "--tmpit-max": cssLength(props.maxWidth, 1240),
    "--tmpit-pt": cssLength(props.paddingTop, 96),
    "--tmpit-pb": cssLength(props.paddingBottom, 96),
    "--tmpit-gap": cssLength(props.columnGap, 92),
    "--tmpit-image-col": cssLength(props.imageColumnWidth, 650),
    "--tmpit-text-col": cssLength(props.textColumnWidth, 430),
    "--tmpit-image-max": cssLength(props.imageMaxWidth, 650),
    "--tmpit-image-ratio": text(props.imageAspectRatio, "1.65 / 1"),
    "--tmpit-image-fit": objectFit(props.imageObjectFit),
    "--tmpit-image-scale": numberValue(props.imageScale, 1, 0.2, 2),
    "--tmpit-image-x": cssLength(props.imageXOffset, 0),
    "--tmpit-image-y": cssLength(props.imageYOffset, 0),
    "--tmpit-title-size": cssLength(props.titleFontSize, 32),
    "--tmpit-body-size": cssLength(props.bodyFontSize, 16),
    "--tmpit-subtitle-size": cssLength(props.subtitleFontSize, 18),
  } as any;

  return (
    <section
      id={text(props.sectionAnchorId) || undefined}
      className={`three-mash-product-image-text${props.reverseLayout ? " is-reversed" : ""}`}
      style={style}
    >
      <div className="tmpit-wrap">
        <div className="tmpit-media">
          {imageSrc ? (
            <img src={imageSrc} alt={text(props.imageAlt)} loading="lazy" decoding="async" />
          ) : (
            <div className="tmpit-placeholder">Görsel ekleyin</div>
          )}
        </div>

        <div className="tmpit-copy">
          {text(props.titleHtml) ? (
            <h2 dangerouslySetInnerHTML={html(props.titleHtml)} />
          ) : (
            <h2>{text(props.titleText, "Geliştirilmiş Kalıp-Ölçü Hassasiyeti")}</h2>
          )}
          {text(props.descriptionHtml) ? <div className="tmpit-description" dangerouslySetInnerHTML={html(props.descriptionHtml)} /> : null}
          {text(props.subTitle) ? <h3>{text(props.subTitle)}</h3> : null}
          {bullets.length ? (
            <ul>
              {bullets.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default ThreeMashProductImageText;
