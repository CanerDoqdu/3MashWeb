import { Props } from "./types";

function propString(value: unknown) {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (!value || typeof value !== "object") return "";

  const data = value as Record<string, unknown>;
  const candidates = [
    data.src,
    data.url,
    data.href,
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

function html(value: unknown) {
  return { __html: propString(value) };
}

function text(value: unknown, fallback: string) {
  const trimmed = propString(value).trim();
  return trimmed ? trimmed : fallback;
}

function numberValue(value: number | undefined, fallback: number, min?: number, max?: number) {
  const next = Number(value);
  if (!Number.isFinite(next)) return fallback;
  return Math.min(max ?? next, Math.max(min ?? next, next));
}

function cssLength(value: number | undefined, fallback: number, unit = "px") {
  return `${numberValue(value, fallback)}${unit}`;
}

function ratioValue(value: unknown, fallback: string) {
  const trimmed = propString(value).trim();
  return trimmed || fallback;
}

function mediaMode(value?: unknown) {
  const normalized = propString(value).trim().toLowerCase();
  return normalized === "grid" || normalized === "compare" || normalized === "karşılaştırma" ? "grid" : "single";
}

function objectFit(value?: unknown) {
  const normalized = propString(value).trim().toLowerCase();
  return ["contain", "cover", "fill", "scale-down"].includes(normalized) ? normalized : "cover";
}

function clampPercent(value: number | undefined, fallback: number) {
  return numberValue(value, fallback, 0, 100);
}

function renderTitle(props: Props) {
  if (propString(props.titleHtml).trim()) {
    return <h2 className="tmpsf-title" dangerouslySetInnerHTML={html(props.titleHtml)} />;
  }

  const lines = [
    [text(props.titleLine1Before, ""), text(props.titleLine1Highlight, ""), text(props.titleLine1After, "")],
    [text(props.titleLine2Before, ""), text(props.titleLine2Highlight, ""), text(props.titleLine2After, "")],
    [text(props.titleLine3Before, ""), text(props.titleLine3Highlight, ""), text(props.titleLine3After, "")],
  ];

  return (
    <h2 className="tmpsf-title">
      {lines.map(([before, highlight, after], index) => {
        if (!before && !highlight && !after) return null;
        return (
          <span className="tmpsf-title-line" key={index}>
            {before ? <>{before}</> : null}
            {highlight ? <mark>{highlight}</mark> : null}
            {after ? <>{after}</> : null}
          </span>
        );
      })}
    </h2>
  );
}

function renderQuote(textValue: unknown, name: unknown, role: unknown, index?: number) {
  const quoteText = propString(textValue).trim();
  const nameText = propString(name).trim();
  const roleText = propString(role).trim();
  if (!quoteText) return null;

  return (
    <figure className="tmpsf-quote" key={index}>
      <blockquote dangerouslySetInnerHTML={html(quoteText)} />
      {nameText || roleText ? (
        <figcaption>
          {nameText ? <b>{nameText}</b> : null}
          {roleText ? <span>{roleText}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}

function renderScore(textValue: unknown, value: number | undefined, fallbackValue: number, index: number) {
  const scoreText = propString(textValue).trim();
  if (!scoreText) return null;
  const score = clampPercent(value, fallbackValue);

  return (
    <div className="tmpsf-score" key={index}>
      <p dangerouslySetInnerHTML={html(scoreText)} />
      <div className="tmpsf-score-row">
        <span className="tmpsf-score-track">
          <span style={{ width: `${score}%` }} />
        </span>
        <b>%{score}</b>
      </div>
    </div>
  );
}

function renderMediaItem(src: unknown, alt: unknown, label: unknown, index: number) {
  const srcText = propString(src).trim();
  const altText = propString(alt).trim();
  const labelText = propString(label).trim();
  if (!srcText) return null;

  return (
    <figure className="tmpsf-media-item" key={index}>
      {labelText ? <figcaption>{labelText}</figcaption> : null}
      <img src={srcText} alt={altText || labelText || ""} loading="lazy" decoding="async" />
    </figure>
  );
}

export function ThreeMashProductSplitFeature(props: Props) {
  const mode = mediaMode(props.mediaLayout);
  const mediaItems = [
    renderMediaItem(props.imageUrl, props.imageAlt, props.imageLabel, 1),
    renderMediaItem(props.image2Url, props.image2Alt, props.image2Label, 2),
    renderMediaItem(props.image3Url, props.image3Alt, props.image3Label, 3),
    renderMediaItem(props.image4Url, props.image4Alt, props.image4Label, 4),
  ].filter(Boolean);

  const style = {
    "--tmpsf-bg": text(props.backgroundColor, "#ffffff"),
    "--tmpsf-text": text(props.textColor, "#050505"),
    "--tmpsf-muted": text(props.mutedTextColor, "#181818"),
    "--tmpsf-accent": text(props.accentColor, "#c7f136"),
    "--tmpsf-media-bg": text(props.mediaBackgroundColor, "#eeeeee"),
    "--tmpsf-score-track": text(props.scoreTrackColor, "#050505"),
    "--tmpsf-max": cssLength(props.maxWidth, 1240),
    "--tmpsf-pt": cssLength(props.paddingTop, 82),
    "--tmpsf-pb": cssLength(props.paddingBottom, 82),
    "--tmpsf-gap": cssLength(props.columnGap, 64),
    "--tmpsf-text-col": cssLength(props.textColumnWidth, 420),
    "--tmpsf-media-col": cssLength(props.mediaColumnWidth, 720),
    "--tmpsf-title-size": cssLength(props.titleFontSize, 34),
    "--tmpsf-body-size": cssLength(props.bodyFontSize, 17),
    "--tmpsf-media-ratio": ratioValue(props.mediaAspectRatio, mode === "grid" ? "1.44 / 1" : "1.5 / 1"),
    "--tmpsf-media-radius": cssLength(props.mediaBorderRadius, 28),
    "--tmpsf-image-fit": objectFit(props.imageObjectFit),
    "--tmpsf-image-scale": numberValue(props.imageScale, 1, 0.2, 2),
    "--tmpsf-image-x": cssLength(props.imageXOffset, 0),
    "--tmpsf-image-y": cssLength(props.imageYOffset, 0),
  } as any;

  const quoteNodes = [
    renderQuote(props.quote1Text, props.quote1Name, props.quote1Role, 1),
    renderQuote(props.quote2Text, props.quote2Name, props.quote2Role, 2),
    renderQuote(props.quote3Text, props.quote3Name, props.quote3Role, 3),
  ].filter(Boolean);

  const scoreNodes = [
    renderScore(props.score1Text, props.score1Value, 99, 1),
    renderScore(props.score2Text, props.score2Value, 97, 2),
    renderScore(props.score3Text, props.score3Value, 96, 3),
  ].filter(Boolean);

  return (
    <section
      id={text(props.sectionAnchorId, "") || undefined}
      className={`three-mash-product-split-feature${props.reverseLayout ? " is-reversed" : ""} is-${mode}`}
      style={style}
    >
      <div className="tmpsf-wrap">
        <div className="tmpsf-copy">
          {renderTitle(props)}
          {text(props.introHtml, "") ? <div className="tmpsf-intro" dangerouslySetInnerHTML={html(props.introHtml)} /> : null}
          {text(props.detailHtml, "") ? <div className="tmpsf-detail" dangerouslySetInnerHTML={html(props.detailHtml)} /> : null}
          {text(props.proofTitle, "") ? <h3>{text(props.proofTitle, "")}</h3> : null}
          {props.showScoreBars ? <div className="tmpsf-scores">{scoreNodes}</div> : <div className="tmpsf-quotes">{quoteNodes}</div>}
        </div>

        <div className="tmpsf-media" aria-label={text(props.imageAlt, "Ürün görseli")}>
          {mediaItems.length ? mediaItems : <div className="tmpsf-media-placeholder">Görsel ekleyin</div>}
        </div>
      </div>
    </section>
  );
}

export default ThreeMashProductSplitFeature;
