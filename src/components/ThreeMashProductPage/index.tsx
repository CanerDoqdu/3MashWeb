import { tLocalized } from "../../utils/i18n";
import { Props } from "./types";
import { machineP16L, resinBottle } from "../../assets/remaining-assets-data";
import p1dPrinterImage from "../../assets/p1d-printer-data";
import { safeNavigationHref } from "../../utils/safeRedirect";
import { sanitizeHtml } from "../../utils/sanitizeHtml";

function href(value?: string) {
  return safeNavigationHref(value, "#");
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
  return { __html: styleTextChunks(sanitizeHtml(inlineHtml(value)), props) };
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

function themeToken(value: string | undefined, defaultValue: string, tokenName: string) {
  const trimmed = value?.trim();
  if (trimmed && trimmed.toLowerCase() !== defaultValue.toLowerCase()) return trimmed;
  return `var(${tokenName}, ${defaultValue})`;
}

type ProductTemplate = {
  key: string;
  imagePreset: string;
  backgroundColor: string;
  textColor: string;
  subTextColor: string;
  mutedTextColor: string;
  panelColor: string;
  accentColor: string;
  lineColor: string;
};

const productTemplates: Record<string, ProductTemplate> = {
  printer: {
    key: "printer",
    imagePreset: "p16l",
    backgroundColor: "#f7f7f2",
    textColor: "#050505",
    subTextColor: "#4d4d45",
    mutedTextColor: "#8f8d84",
    panelColor: "#ffffff",
    accentColor: "#c7ff1a",
    lineColor: "#deded5",
  },
  p16l: {
    key: "p16l",
    imagePreset: "p16l",
    backgroundColor: "#f7f7f2",
    textColor: "#050505",
    subTextColor: "#4d4d45",
    mutedTextColor: "#8f8d84",
    panelColor: "#ffffff",
    accentColor: "#c7ff1a",
    lineColor: "#deded5",
  },
  p1d: {
    key: "p1d",
    imagePreset: "p1d",
    backgroundColor: "#f4f5f1",
    textColor: "#080908",
    subTextColor: "#474b45",
    mutedTextColor: "#81877d",
    panelColor: "#ffffff",
    accentColor: "#c7ff1a",
    lineColor: "#dfe2da",
  },
  resin: {
    key: "resin",
    imagePreset: "resin",
    backgroundColor: "#f5f7f1",
    textColor: "#07110c",
    subTextColor: "#435048",
    mutedTextColor: "#7f8a80",
    panelColor: "#ffffff",
    accentColor: "#a9e84d",
    lineColor: "#dce5d8",
  },
  curing: {
    key: "curing",
    imagePreset: "printer",
    backgroundColor: "#f8f6f0",
    textColor: "#11100c",
    subTextColor: "#504b40",
    mutedTextColor: "#8f8878",
    panelColor: "#fffdf8",
    accentColor: "#f1cf36",
    lineColor: "#e7e0d2",
  },
  scanner: {
    key: "scanner",
    imagePreset: "printer",
    backgroundColor: "#f4f8f8",
    textColor: "#071012",
    subTextColor: "#3f4d50",
    mutedTextColor: "#77878b",
    panelColor: "#ffffff",
    accentColor: "#49d6c8",
    lineColor: "#d8e7e8",
  },
  blocks: {
    key: "blocks",
    imagePreset: "resin",
    backgroundColor: "#f7f4ef",
    textColor: "#120d08",
    subTextColor: "#52483d",
    mutedTextColor: "#8d8173",
    panelColor: "#fffdf9",
    accentColor: "#e8d07a",
    lineColor: "#e4dbce",
  },
  oven: {
    key: "oven",
    imagePreset: "printer",
    backgroundColor: "#f8f3f1",
    textColor: "#120807",
    subTextColor: "#54413d",
    mutedTextColor: "#927d77",
    panelColor: "#ffffff",
    accentColor: "#ff8a4c",
    lineColor: "#eadbd6",
  },
};

function templatePreset(preset?: string) {
  const key = preset?.trim().toLowerCase();
  if (!key || key === "custom") return null;
  return productTemplates[key] || productTemplates.printer;
}

function presetImage(preset?: string) {
  const key = preset?.trim().toLowerCase();
  if (key === "p1d" || key === "printer" || key === "mash-p1d") return p1dPrinterImage;
  if (key === "resin" || key === "crs" || key === "recine" || key === tLocalized("reçine", "Resin")) return resinBottle;
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
  const template = templatePreset(props.templatePreset);
  const productImage = imageSource(props.productImageUrl) || presetImage(props.imagePreset || template?.imagePreset);
  const themeStyle = {
    backgroundColor: template?.backgroundColor || themeToken(props.backgroundColor, "#f7f7f2", "--tm-theme-bg"),
    "--tmpp-bg": template?.backgroundColor || themeToken(props.backgroundColor, "#f7f7f2", "--tm-theme-bg"),
    "--tmpp-text": template?.textColor || themeToken(props.textColor, "#050505", "--tm-theme-text"),
    "--tmpp-sub": template?.subTextColor || themeToken(props.subTextColor, "#4d4d45", "--tm-theme-sub"),
    "--tmpp-muted": template?.mutedTextColor || themeToken(props.mutedTextColor, "#8f8d84", "--tm-theme-muted"),
    "--tmpp-panel": template?.panelColor || themeToken(props.panelColor, "#ffffff", "--tm-theme-panel"),
    "--tmpp-accent": template?.accentColor || themeToken(props.accentColor, "#c7ff1a", "--tm-theme-accent"),
    "--tmpp-line": template?.lineColor || themeToken(props.lineColor, "#deded5", "--tm-theme-line"),
    "--tmpp-word-color": themeToken(props.styledPhraseColor, "#C7F136", "--tm-theme-accent"),
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
