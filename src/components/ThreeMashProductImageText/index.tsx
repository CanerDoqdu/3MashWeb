import { getDefaultSrc } from "@ikas/bp-storefront";
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
    data.title,
    (data.image as Record<string, unknown> | undefined)?.src,
    (data.image as Record<string, unknown> | undefined)?.url,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) return candidate;
  }

  return "";
}

function imageSrc(value: unknown) {
  if (!value) return "";
  if (typeof value === "string") return value.trim();
  try {
    return getDefaultSrc(value as any) || propString(value);
  } catch {
    return propString(value);
  }
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
  if (["false", "0", "no", "hayir", "hayır", "kapali", "kapalı", "off"].includes(normalized)) return false;
  if (["true", "1", "yes", "evet", "acik", "açık", "on"].includes(normalized)) return true;
  return undefined;
}

function pascal(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function productBasedApplies(props: Props) {
  return boolValue(props.productBasedEnabled) !== false;
}

const ARGENZ_PRODUCT_BASED_DEFAULTS: Record<string, unknown> = {
  productBasedSectionVisible: true,
  productBasedSectionAnchorId: "",
  productBasedTitleHtml: "",
  productBasedTitleText: "Öne Çıkan Özellikler",
  productBasedDescriptionHtml:
    '<p><b>Geçirgenlik:</b> %50</p>\n\n<p><b>Eğilme Mukavemeti:</b> 850 MPa</p>\n\n<p><b>İtriyum Mol Yüzdesi:</b> 4Y</p>\n\n<p><b>Renk Skalası:</b> 16 VITA Klasik ve 3 Bleach ve 5 açık ton seçenekleri mevcuttur.</p>\n\n<p><b>Uygulama Alanları:</b> Tek kron veya 1 ara gövdeli 3 üyeli köprülere kadar uygulanabilir.</p>\n\n<p class="tmpit-download"><a href="https://s3.amazonaws.com/argen-product-images/commerce/brochure_uploads/brochures/000/000/469/original/BD-18072-ArgenZ-ST-Multilayer-Nesting-Instructions-Ver3-1120.pdf?1669756572" target="_blank" rel="noreferrer">Yerleştirme Kılavuzu:</a></p>\n\n<p class="tmpit-download"><a href="https://s3.amazonaws.com/argen-product-images/commerce/brochure_uploads/brochures/000/000/508/original/L03500.pdf?1680796097" target="_blank" rel="noreferrer">IFU:</a></p>',
  productBasedSubTitle: "",
  productBasedBullet1Text: "",
  productBasedBullet2Text: "",
  productBasedBullet3Text: "",
  productBasedBullet4Text: "",
  productBasedBullet5Text: "",
  productBasedBullet6Text: "",
  productBasedImageUrl: "https://cdn.myikas.com/images/theme-images/52f4db8b-7c32-45a6-914f-95b2f0c9cf2c/image_1080.webp",
  productBasedImageAlt: "ArgenZ ST Multilayer öne çıkan özellikler",
  productBasedReverseLayout: false,
  productBasedMaxWidth: 1240,
  productBasedPaddingTop: 96,
  productBasedPaddingBottom: 96,
  productBasedColumnGap: 92,
  productBasedImageColumnWidth: 650,
  productBasedTextColumnWidth: 430,
  productBasedImageMaxWidth: 650,
  productBasedImageAspectRatio: "1.42 / 1",
  productBasedImageObjectFit: "cover",
  productBasedImageScale: 1,
  productBasedImageXOffset: 0,
  productBasedImageYOffset: 0,
  productBasedTitleFontSize: 28,
  productBasedBodyFontSize: 14,
  productBasedSubtitleFontSize: 18,
  productBasedTitleDescriptionGap: 38,
  productBasedBackgroundColor: "#ffffff",
  productBasedTextColor: "#050505",
  productBasedMutedTextColor: "#050505",
};

function filled(value: unknown) {
  return typeof value === "string" ? value.trim() !== "" : value !== undefined && value !== null;
}

function normalized(value: unknown) {
  return propString(value).trim().toLocaleLowerCase("tr");
}

function hasArgenzProductDetailContent(data: Record<string, unknown>) {
  const contentParts = [
    data.productBasedTitleText,
    data.productBasedDescriptionHtml,
    data.productBasedImageUrl,
    data.titleText,
    data.descriptionHtml,
    data.imageUrl,
  ]
    .map(normalized)
    .join(" ");

  return (
    contentParts.includes("öne çıkan özellikler") ||
    contentParts.includes("geçirgenlik") ||
    contentParts.includes("bd-18072") ||
    contentParts.includes("l03500") ||
    contentParts.includes("52f4db8b")
  );
}

function productBasedProps(props: Props): Props {
  const source = props as Record<string, unknown>;
  const useArgenzDefaults = hasArgenzProductDetailContent(source);
  if (!productBasedApplies(props) && !useArgenzDefaults) return props;

  return new Proxy(props as Record<string, unknown>, {
    get(target, prop) {
      if (typeof prop !== "string") return Reflect.get(target, prop);
      if (prop.startsWith("productBased")) return target[prop];
      const productBasedName = `productBased${pascal(prop)}`;
      const productBasedValue = target[productBasedName];
      if (useArgenzDefaults && productBasedName in ARGENZ_PRODUCT_BASED_DEFAULTS) {
        return ARGENZ_PRODUCT_BASED_DEFAULTS[productBasedName];
      }
      if (filled(productBasedValue)) return productBasedValue;
      if (filled(ARGENZ_PRODUCT_BASED_DEFAULTS[productBasedName])) return ARGENZ_PRODUCT_BASED_DEFAULTS[productBasedName];
      return target[prop];
    },
  }) as Props;
}

function html(value: unknown) {
  return { __html: propString(value) };
}

function numberValue(value: unknown, fallback: number, min?: number, max?: number) {
  const next = Number(value);
  if (!Number.isFinite(next)) return fallback;
  return Math.min(max ?? next, Math.max(min ?? next, next));
}

function cssLength(value: unknown, fallback: number) {
  return `${numberValue(value, fallback)}px`;
}

function objectFit(value: unknown) {
  const normalized = text(value, "contain").toLowerCase();
  return ["contain", "cover", "fill", "scale-down"].includes(normalized) ? normalized : "contain";
}

export function ThreeMashProductImageText(props: Props) {
  if (productBasedApplies(props) && boolValue(props.productBasedSectionVisible) === false) return null;

  const viewProps = productBasedProps(props);
  const useArgenzDefaults = hasArgenzProductDetailContent(props as Record<string, unknown>) || hasArgenzProductDetailContent(viewProps as Record<string, unknown>);
  const src = imageSrc(viewProps.imageUrl);
  const bullets = useArgenzDefaults
    ? []
    : [
        text(viewProps.bullet1Text),
        text(viewProps.bullet2Text),
        text(viewProps.bullet3Text),
        text(viewProps.bullet4Text),
        text(viewProps.bullet5Text),
        text(viewProps.bullet6Text),
      ].filter(Boolean);

  const style = {
    "--tmpit-bg": text(viewProps.backgroundColor, "#ffffff"),
    "--tmpit-text": text(viewProps.textColor, "#050505"),
    "--tmpit-muted": text(viewProps.mutedTextColor, "#050505"),
    "--tmpit-max": cssLength(viewProps.maxWidth, 1240),
    "--tmpit-pt": cssLength(viewProps.paddingTop, 96),
    "--tmpit-pb": cssLength(viewProps.paddingBottom, 96),
    "--tmpit-gap": cssLength(viewProps.columnGap, 92),
    "--tmpit-image-col": cssLength(viewProps.imageColumnWidth, 650),
    "--tmpit-text-col": cssLength(viewProps.textColumnWidth, 430),
    "--tmpit-image-max": cssLength(viewProps.imageMaxWidth, 650),
    "--tmpit-image-ratio": text(viewProps.imageAspectRatio, "1.65 / 1"),
    "--tmpit-image-fit": objectFit(viewProps.imageObjectFit),
    "--tmpit-image-scale": numberValue(viewProps.imageScale, 1, 0.2, 2),
    "--tmpit-image-x": cssLength(viewProps.imageXOffset, 0),
    "--tmpit-image-y": cssLength(viewProps.imageYOffset, 0),
    "--tmpit-title-size": cssLength(viewProps.titleFontSize, 32),
    "--tmpit-body-size": cssLength(viewProps.bodyFontSize, 16),
    "--tmpit-subtitle-size": cssLength(viewProps.subtitleFontSize, 18),
    "--tmpit-title-description-gap": cssLength(viewProps.titleDescriptionGap, 38),
  } as any;

  return (
    <section
      id={text(viewProps.sectionAnchorId) || undefined}
      className={`three-mash-product-image-text${boolValue(viewProps.reverseLayout) ? " is-reversed" : ""}`}
      style={style}
    >
      <div className="tmpit-wrap">
        <div className="tmpit-media">
          {src ? (
            <img src={src} alt={text(viewProps.imageAlt)} loading="lazy" decoding="async" />
          ) : (
            <div className="tmpit-placeholder">Görsel ekleyin</div>
          )}
        </div>

        <div className="tmpit-copy">
          {text(viewProps.titleHtml) ? (
            <h2 dangerouslySetInnerHTML={html(viewProps.titleHtml)} />
          ) : (
            <h2>{text(viewProps.titleText, "Geliştirilmiş Kalıp-Ölçü Hassasiyeti")}</h2>
          )}
          {text(viewProps.descriptionHtml) ? <div className="tmpit-description" dangerouslySetInnerHTML={html(viewProps.descriptionHtml)} /> : null}
          {!useArgenzDefaults && text(viewProps.subTitle) ? <h3>{text(viewProps.subTitle)}</h3> : null}
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
