import { Props } from "./types";
import { machineP16L, resinBottle } from "../../assets/remaining-assets-data";
import p1dPrinterImage from "../../assets/p1d-printer-data";

function href(value?: string) {
  return value && value.trim() ? value : "#";
}

function inlineHtml(value?: string) {
  return (value || "")
    .trim()
    .replace(/<\/p>\s*<p[^>]*>/gi, "<br />")
    .replace(/^<p[^>]*>/i, "")
    .replace(/<\/p>$/i, "");
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
      return part.replace(matcher, (match) => `<span class="tmpp-word-style">${match}</span>`);
    })
    .join("");
}

function richText(value?: string, props?: Props) {
  return { __html: styleTextChunks(inlineHtml(value), props) };
}

function imageIdToUrl(value: string) {
  const trimmed = value.trim();
  if (trimmed.startsWith("theme-images/")) {
    return `https://cdn.myikas.com/images/${trimmed}/image_3840.webp`;
  }
  return trimmed;
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

function numberInRange(value: unknown, fallback: number, min: number, max: number) {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.min(max, Math.max(min, numeric));
}

function percentage(value: unknown, fallback: number, min: number, max: number) {
  return `${numberInRange(value, fallback, min, max)}%`;
}

function presetImage(preset?: string) {
  const key = preset?.trim().toLowerCase();
  if (key === "p1d" || key === "printer" || key === "mash-p1d") return p1dPrinterImage;
  if (key === "resin" || key === "crs" || key === "recine" || key === "reçine") return resinBottle;
  return machineP16L;
}

function SpecRow({ label, value, wordStyle }: { label?: string; value?: string; wordStyle: Props }) {
  if (!label && !value) return null;

  return (
    <div className="tmpp-spec-row">
      <span dangerouslySetInnerHTML={richText(label, wordStyle)} />
      <b dangerouslySetInnerHTML={richText(value, wordStyle)} />
    </div>
  );
}

export function ThreeMashProductPage(props: Props) {
  const productImage = imageSource(props.productImageUrl) || presetImage(props.imagePreset);
  const themeStyle = {
    backgroundColor: props.backgroundColor || "#f7f7f2",
    "--tmpp-bg": props.backgroundColor || "#f7f7f2",
    "--tmpp-text": props.textColor || "#050505",
    "--tmpp-sub": props.subTextColor || "#4d4d45",
    "--tmpp-muted": props.mutedTextColor || "#8f8d84",
    "--tmpp-panel": props.panelColor || "#ffffff",
    "--tmpp-accent": props.accentColor || "#c7ff1a",
    "--tmpp-line": props.lineColor || "#deded5",
    "--tmpp-word-color": props.styledPhraseColor || "#C7F136",
    "--tmpp-word-weight": props.styledPhraseBold ? "800" : "inherit",
    "--tmpp-word-style": props.styledPhraseItalic ? "italic" : "inherit",
    "--tmpp-image-width": `${numberInRange(props.productImageWidth, 82, 10, 140)}%`,
    "--tmpp-image-height": `${numberInRange(props.productImageHeight, 82, 10, 140)}%`,
    "--tmpp-image-x": `${numberInRange(props.productImageXOffset, 0, -120, 120)}px`,
    "--tmpp-image-y": `${numberInRange(props.productImageYOffset, 0, -120, 120)}px`,
    "--tmpp-image-opacity": numberInRange(props.productImageOpacity, 100, 0, 100) / 100,
    "--tmpp-image-brightness": percentage(props.productImageBrightness, 100, 0, 220),
    "--tmpp-image-contrast": percentage(props.productImageContrast, 100, 0, 220),
    "--tmpp-image-saturation": percentage(props.productImageSaturation, 100, 0, 300),
  } as any;

  return (
    <section className="three-mash-product-page" style={themeStyle}>
      <div className="tmpp-wrap">
        <div className="tmpp-copy">
          <div className="tmpp-kicker">
            <span />
            <span dangerouslySetInnerHTML={richText(props.eyebrowText, props)} />
          </div>
          <h1>
            <span dangerouslySetInnerHTML={richText(props.titleText, props)} />
            {props.titleEmphasis ? <em dangerouslySetInnerHTML={richText(props.titleEmphasis, props)} /> : null}
          </h1>
          <div
            className="tmpp-description"
            dangerouslySetInnerHTML={richText(props.descriptionHtml, props)}
          />
          <div className="tmpp-actions">
            <a className="tmpp-button tmpp-button-primary" href={href(props.primaryButtonHref)}>
              <span dangerouslySetInnerHTML={richText(props.primaryButtonText, props)} />
            </a>
            <a className="tmpp-button tmpp-button-secondary" href={href(props.secondaryButtonHref)}>
              <span dangerouslySetInnerHTML={richText(props.secondaryButtonText, props)} />
            </a>
          </div>
        </div>

        <div className="tmpp-media-panel">
          <div className="tmpp-image-stage">
            <img src={productImage} alt={props.productImageAlt || ""} loading="eager" decoding="async" />
          </div>
        </div>

        <div className="tmpp-specs">
          <SpecRow label={props.spec1Label} value={props.spec1Value} wordStyle={props} />
          <SpecRow label={props.spec2Label} value={props.spec2Value} wordStyle={props} />
          <SpecRow label={props.spec3Label} value={props.spec3Value} wordStyle={props} />
          <SpecRow label={props.spec4Label} value={props.spec4Value} wordStyle={props} />
        </div>
      </div>
    </section>
  );
}

export default ThreeMashProductPage;
