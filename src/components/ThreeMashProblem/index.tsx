import { Props } from "./types";

function html(value?: string) {
  return { __html: value || "" };
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

export function ThreeMashProblem(props: Props) {
  const hairImage = imageSource(props.hairImageUrl);
  const themeStyle = {
    "--tmproblem-bg": props.backgroundColor || "#FAFAF7",
    "--tmproblem-text": props.textColor || "#0E0E0C",
    "--tmproblem-sub": props.subTextColor || "#55554E",
    "--tmproblem-muted": props.mutedTextColor || "#8F8F86",
    "--tmproblem-line": props.lineColor || "#E6E6E0",
    "--tmproblem-line-strong": props.lineStrongColor || "#D4D4CC",
    "--tmproblem-panel": props.panelColor || "#FFFFFF",
    "--tmproblem-accent": props.accentColor || "#C7F136",
    "--tmproblem-accent-text": props.accentTextColor || "#3D4D0E",
    "--tmproblem-danger": props.dangerColor || "#E2492F",
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

  return (
    <section className="three-mash-problem" id={anchorId(props.sectionAnchorId)} style={themeStyle}>
      <div className="tmproblem-wrap">
        <div className="tmproblem-index">
          <span className="tmproblem-index-number">{props.indexNumber || ""}</span>
          <span className="tmproblem-index-text">{props.indexText || ""}</span>
          <span className="tmproblem-index-line" />
        </div>

        <div className="tmproblem-head">
          <h2>
            {props.titleText || ""} <span>{props.titleEmphasis || ""}</span>
          </h2>
          <div className="tmproblem-side" dangerouslySetInnerHTML={html(props.sideHtml)} />
        </div>

        <div className="tmproblem-cards">
          <article className="tmproblem-card tmproblem-card-bad">
            <div className="tmproblem-card-label">{props.badLabel || ""}</div>
            <div className="tmproblem-card-value">{props.badValue || ""}</div>
            <div className="tmproblem-card-description" dangerouslySetInnerHTML={html(props.badDescriptionHtml)} />
          </article>

          <article className="tmproblem-card tmproblem-card-good">
            <div className="tmproblem-card-label">{props.goodLabel || ""}</div>
            <div className="tmproblem-card-value">{props.goodValue || ""}</div>
            <div className="tmproblem-card-description" dangerouslySetInnerHTML={html(props.goodDescriptionHtml)} />
          </article>
        </div>

        {props.showHairNote !== false ? (
          <div className="tmproblem-hair-note">
            {hairImage ? <img className="tmproblem-hair-image" src={hairImage} alt="" aria-hidden="true" /> : null}
            <p dangerouslySetInnerHTML={html(props.hairNoteHtml)} />
          </div>
        ) : null}

        {props.showReference !== false ? (
          <p className="tmproblem-reference" dangerouslySetInnerHTML={html(props.referenceHtml)} />
        ) : null}
      </div>
    </section>
  );
}

export default ThreeMashProblem;
