import { getDefaultSrc } from "@ikas/bp-storefront";
import { Props } from "./types";
import { resolveProductDetailData } from "../../sub-components/ThreeMashProductDetailData";
import { ProductDetailMetricsSection, ProductDetailSectionScope } from "../../sub-components/ThreeMashProductDetailTemplate";

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
    data.text,
    data.html,
    data.label,
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

function boolValue(value: unknown) {
  if (typeof value === "boolean") return value;
  const normalized = propString(value).trim().toLocaleLowerCase("tr");
  if (["false", "0", "no", "hayir", "hayır", "kapali", "kapalı"].includes(normalized)) return false;
  if (["true", "1", "yes", "evet", "acik", "açık"].includes(normalized)) return true;
  return undefined;
}

function text(value: unknown, fallback = "") {
  const trimmed = propString(value).trim();
  return trimmed || fallback;
}

function pascal(value: string) {
  return value.charAt(0).toLocaleUpperCase("tr") + value.slice(1);
}

const ARGENZ_PRODUCT_BASED_DEFAULTS: Record<string, unknown> = {
  productBasedSectionVisible: true,
  productBasedMetricCount: 3,
  productBasedMetric1Enabled: true,
  productBasedMetric1Value: "50",
  productBasedMetric1Unit: "%",
  productBasedMetric1Title: "Işık Geçirgenliği",
  productBasedMetric1Subtitle: "",
  productBasedMetric2Enabled: true,
  productBasedMetric2Value: "850",
  productBasedMetric2Unit: "MPa",
  productBasedMetric2Title: "Eğilme Mukavemeti",
  productBasedMetric2Subtitle: "",
  productBasedMetric3Enabled: true,
  productBasedMetric3Value: "4Y",
  productBasedMetric3Unit: "",
  productBasedMetric3Title: "İtriyum Mol Yüzdesi",
  productBasedMetric3Subtitle: "",
  productBasedMetric4Enabled: false,
  productBasedMetric5Enabled: false,
  productBasedMetric6Enabled: false,
};

const ARGENZ_HT_PRODUCT_BASED_DEFAULTS: Record<string, unknown> = {
  ...ARGENZ_PRODUCT_BASED_DEFAULTS,
  productBasedMetric1Value: "45",
  productBasedMetric1Unit: "%",
  productBasedMetric1Title: "Işık Geçirgenliği",
  productBasedMetric1Subtitle: "",
  productBasedMetric2Value: "1250",
  productBasedMetric2Unit: "MPa",
  productBasedMetric2Title: "Eğilme Mukavemeti",
  productBasedMetric2Subtitle: "",
  productBasedMetric3Value: "4Y",
  productBasedMetric3Unit: "",
  productBasedMetric3Title: "İtriyum Mol Yüzdesi",
  productBasedMetric3Subtitle: "",
};

const CRS_COMPOSITE_PRODUCT_BASED_DEFAULTS: Record<string, unknown> = {
  productBasedSectionVisible: true,
  productBasedMetricCount: 3,
  productBasedMetric1Enabled: true,
  productBasedMetric1Value: "144",
  productBasedMetric1Unit: "Mpa",
  productBasedMetric1Title: "Eğilme Mukavemeti",
  productBasedMetric1Subtitle: "ISO 10477",
  productBasedMetric2Enabled: true,
  productBasedMetric2Value: "",
  productBasedMetric2Unit: "",
  productBasedMetric2Title: "CE CLASS IIA Sertifikalı",
  productBasedMetric2Subtitle: "MDR Regülasyonu",
  productBasedMetric2ImageUrl:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180'%3E%3Ccircle cx='90' cy='90' r='88' fill='%230047ba'/%3E%3Cg fill='%23ffd400'%3E%3Cpath d='M90 11l3.5 10.8h11.3l-9.1 6.6 3.5 10.8L90 32.5l-9.1 6.7 3.5-10.8-9.1-6.6h11.3zM90 141l3.5 10.8h11.3l-9.1 6.6 3.5 10.8-9.2-6.7-9.1 6.7 3.5-10.8-9.1-6.6h11.3zM25 76l3.5 10.8h11.3l-9.1 6.6 3.5 10.8L25 97.5l-9.1 6.7 3.5-10.8-9.1-6.6h11.3zM155 76l3.5 10.8h11.3l-9.1 6.6 3.5 10.8-9.2-6.7-9.1 6.7 3.5-10.8-9.1-6.6h11.3zM44 30l3.5 10.8h11.3l-9.1 6.6 3.5 10.8-9.2-6.7-9.1 6.7 3.5-10.8-9.1-6.6h11.3zM136 30l3.5 10.8h11.3l-9.1 6.6 3.5 10.8-9.2-6.7-9.1 6.7 3.5-10.8-9.1-6.6h11.3zM44 122l3.5 10.8h11.3l-9.1 6.6 3.5 10.8-9.2-6.7-9.1 6.7 3.5-10.8-9.1-6.6h11.3zM136 122l3.5 10.8h11.3l-9.1 6.6 3.5 10.8-9.2-6.7-9.1 6.7 3.5-10.8-9.1-6.6h11.3z'/%3E%3C/g%3E%3Ctext x='90' y='113' text-anchor='middle' font-family='Arial,Helvetica,sans-serif' font-size='66' font-weight='700' fill='white'%3ECE%3C/text%3E%3C/svg%3E",
  productBasedMetric2ImageAlt: "CE CLASS IIA Sertifikalı",
  productBasedMetric3Enabled: true,
  productBasedMetric3Value: "3326",
  productBasedMetric3Unit: "Mpa",
  productBasedMetric3Title: "Eğilme Modülü",
  productBasedMetric3Subtitle: "ISO 10477",
  productBasedMetric4Enabled: false,
  productBasedMetric5Enabled: false,
  productBasedMetric6Enabled: false,
};

const CRS_MODEL_PRODUCT_BASED_DEFAULTS: Record<string, unknown> = {
  productBasedSectionVisible: true,
  productBasedMetricCount: 3,
  productBasedMetric1Enabled: true,
  productBasedMetric1Value: "95",
  productBasedMetric1Unit: "Mpa",
  productBasedMetric1Title: "Eğilme Mukavemeti",
  productBasedMetric1Subtitle: "ISO 10477",
  productBasedMetric2Enabled: true,
  productBasedMetric2Value: "2650",
  productBasedMetric2Unit: "Mpa",
  productBasedMetric2Title: "Esneklik Modülü",
  productBasedMetric2Subtitle: "",
  productBasedMetric3Enabled: true,
  productBasedMetric3Value: "26",
  productBasedMetric3Unit: "Mpa",
  productBasedMetric3Title: "Çekme Dayanımı",
  productBasedMetric3Subtitle: "ASTM D638",
  productBasedMetric4Enabled: false,
  productBasedMetric5Enabled: false,
  productBasedMetric6Enabled: false,
};

const CRS_TRAY_PRODUCT_BASED_DEFAULTS: Record<string, unknown> = {
  productBasedSectionVisible: true,
  productBasedMetricCount: 3,
  productBasedMetric1Enabled: true,
  productBasedMetric1Value: "3000",
  productBasedMetric1Unit: "Mpa",
  productBasedMetric1Title: "Eğilme Modülü",
  productBasedMetric1Subtitle: "ISO 10477",
  productBasedMetric2Enabled: true,
  productBasedMetric2Value: "",
  productBasedMetric2Unit: "",
  productBasedMetric2Title: "CE Class I Sertifikalı",
  productBasedMetric2Subtitle: "",
  productBasedMetric2ImageUrl: CRS_COMPOSITE_PRODUCT_BASED_DEFAULTS.productBasedMetric2ImageUrl,
  productBasedMetric2ImageAlt: "CE Class I Sertifikalı",
  productBasedMetric3Enabled: true,
  productBasedMetric3Value: "110",
  productBasedMetric3Unit: "Mpa",
  productBasedMetric3Title: "Eğilme Mukavemeti",
  productBasedMetric3Subtitle: "ISO 10477",
  productBasedMetric4Enabled: false,
  productBasedMetric5Enabled: false,
  productBasedMetric6Enabled: false,
};

function filled(value: unknown) {
  return typeof value === "string" ? value.trim() !== "" : value !== undefined && value !== null;
}

function normalized(value: unknown) {
  return propString(value).trim().toLocaleLowerCase("tr");
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

function productMatchesCurrentPage(product: unknown) {
  if (!product) return false;
  if (typeof window === "undefined") return true;
  const current = `${window.location.pathname} ${window.location.href}`.toLocaleLowerCase("tr");
  const currentSlug = slugify(window.location.pathname);
  const terms = Array.from(new Set(collectProductStrings(product))).filter((term) => term.length > 2);
  return terms.some((term) => current.includes(term) || currentSlug.includes(term));
}

function targetSlugsMatch(data: Record<string, unknown>) {
  const raw = propString(data.productBasedTargetSlugs).trim();
  if (!raw) return undefined;
  if (typeof window === "undefined") return undefined;
  const current = `${window.location.pathname} ${window.location.href}`.toLocaleLowerCase("tr");
  const currentSlug = slugify(window.location.pathname);
  const targets = raw
    .split(/[\n,;]+/)
    .map((item) => slugify(item.trim()))
    .filter(Boolean);
  return targets.some((target) => current.includes(target) || currentSlug.includes(target));
}

function slugListMatch(value: unknown, product: unknown) {
  const targets = propString(value)
    .split(/[\n,;]+/)
    .map((item) => slugify(item.trim()))
    .filter(Boolean);
  if (!targets.length) return undefined;

  const terms = collectProductStrings(product).map(slugify);
  if (typeof window !== "undefined") {
    terms.push(slugify(window.location.pathname));
    terms.push(slugify(window.location.href));
  }

  const uniqueTerms = Array.from(new Set(terms.filter((term) => term.length > 2)));
  if (!uniqueTerms.length) return undefined;
  return targets.some((target) =>
    uniqueTerms.some((term) => term === target || term.includes(target) || (target.length >= 14 && target.includes(term))),
  );
}

function productBasedHidden(props: Props) {
  const visibility = productBasedVisibilityOverride(props);
  if (visibility === false) return true;
  return slugListMatch((props as Record<string, unknown>).productBasedHiddenSlugs, props.product) === true;
}

function productSelectionMatchesCurrent(selection: unknown, currentProduct: unknown) {
  const targets = Array.from(new Set(collectProductStrings(selection).map(slugify))).filter((term) => term.length > 2);
  if (!targets.length) return false;

  const terms = collectProductStrings(currentProduct).map(slugify);
  if (typeof window !== "undefined") {
    terms.push(slugify(window.location.pathname));
    terms.push(slugify(window.location.href));
  }

  const uniqueTerms = Array.from(new Set(terms.filter((term) => term.length > 2)));
  return targets.some((target) =>
    uniqueTerms.some((term) => term === target || term.includes(target) || (target.length >= 14 && target.includes(term))),
  );
}

function productBasedVisibilityOverride(props: Props) {
  const data = props as Record<string, unknown>;
  for (let index = 1; index <= 5; index += 1) {
    const product = data[`productBasedVisibilityProduct${index}`];
    if (!product) continue;
    if (productSelectionMatchesCurrent(product, props.product)) {
      const showValue = data[`productBasedVisibilityShow${index}`];
      return (showValue === undefined ? boolValue(data[`productBasedVisibilityVisible${index}`]) : boolValue(showValue)) !== false;
    }
  }
  return undefined;
}

function isEditorPreview() {
  if (typeof window === "undefined") return false;
  try {
    if (window.self !== window.top) return true;
  } catch {
    return true;
  }
  return window.location.href.toLocaleLowerCase("tr").includes("ikas");
}

function productBasedApplies(props: Props) {
  if (boolValue(props.productBasedEnabled) === false) return false;
  const data = props as Record<string, unknown>;
  if (productBasedHidden(props)) return false;
  if (productBasedVisibilityOverride(props) === true) return true;
  const targetMatch = targetSlugsMatch(data);
  if (targetMatch !== undefined) return targetMatch;
  return productMatchesCurrentPage(props.product);
}

function productBasedDesignApplies(props: Props) {
  if (boolValue(props.productBasedEnabled) === false) return false;
  if (productBasedHidden(props)) return false;
  return isEditorPreview() || productBasedApplies(props);
}

function normalizedJson(value: unknown) {
  try {
    return JSON.stringify(value ?? "").toLocaleLowerCase("tr");
  } catch {
    return normalized(value);
  }
}

function currentPathText() {
  if (typeof window === "undefined") return "";
  return `${window.location.pathname} ${window.location.href}`.toLocaleLowerCase("tr");
}

function productLooksLikeHtPlus(data: Record<string, unknown>) {
  const textParts = [
    normalizedJson(data.product),
    data.productBasedMetric1Title,
    data.productBasedMetric1Value,
    data.productBasedMetric2Title,
    data.productBasedMetric2Value,
    data.productBasedMetric3Title,
    data.productBasedMetric3Value,
    data.metric1Title,
    data.metric1Value,
    data.metric2Title,
    data.metric2Value,
    data.metric3Title,
    data.metric3Value,
    currentPathText(),
  ]
    .map(normalized)
    .join(" ");

  return (
    textParts.includes("argenz-ht-plus") ||
    textParts.includes("argenz-ht-multilayer") ||
    textParts.includes("argenz ht+") ||
    textParts.includes("ht+ multilayer") ||
    (textParts.includes("1250") && textParts.includes("4y"))
  );
}

function productLooksLikeSt(data: Record<string, unknown>) {
  const combined = `${normalizedJson(data.product)} ${currentPathText()}`;
  return combined.includes("argenz-st") || combined.includes("argenz st");
}

function productLooksLikeCrsComposite(data: Record<string, unknown>) {
  const combined = `${normalizedJson(data.product)} ${normalized(data.productBasedMetric1Title)} ${normalized(data.productBasedMetric2Title)} ${currentPathText()}`;
  return (
    combined.includes("crs-composite-mukemmel-dayanimli-gecici-recinesi") ||
    combined.includes("crs composite") ||
    combined.includes("custom composite resin")
  );
}

function targetLooksLikeCrsComposite(data: Record<string, unknown>) {
  const targetMatch = targetSlugsMatch(data);
  if (targetMatch !== true) return false;
  const targets = normalized(data.productBasedTargetSlugs);
  return targets.includes("crs-composite-mukemmel-dayanimli-gecici-recinesi") || targets.includes("crs composite");
}

function productLooksLikeCrsModel(data: Record<string, unknown>) {
  const combined = `${normalizedJson(data.product)} ${normalized(data.productBasedMetric1Title)} ${normalized(data.productBasedMetric2Title)} ${currentPathText()}`;
  return (
    combined.includes("crs-model-yuksek-hassasiyetli-model-recinesi") ||
    combined.includes("crs model") ||
    combined.includes("custom model sand resin")
  );
}

function targetLooksLikeCrsModel(data: Record<string, unknown>) {
  const targetMatch = targetSlugsMatch(data);
  if (targetMatch !== true) return false;
  const targets = normalized(data.productBasedTargetSlugs);
  return targets.includes("crs-model-yuksek-hassasiyetli-model-recinesi") || targets.includes("crs model");
}

function productLooksLikeCrsTray(data: Record<string, unknown>) {
  const combined = `${normalizedJson(data.product)} ${normalized(data.productBasedMetric1Title)} ${normalized(data.productBasedMetric2Title)} ${currentPathText()}`;
  return (
    combined.includes("crs-tray-resin-olcu-kasigi-3d-yazici-recinesi") ||
    combined.includes("crs tray") ||
    combined.includes("tray resin") ||
    combined.includes("ölçü kaşığı") ||
    combined.includes("olcu kasigi")
  );
}

function targetLooksLikeCrsTray(data: Record<string, unknown>) {
  const targetMatch = targetSlugsMatch(data);
  if (targetMatch !== true) return false;
  const targets = normalized(data.productBasedTargetSlugs);
  return targets.includes("crs-tray-resin-olcu-kasigi-3d-yazici-recinesi") || targets.includes("crs tray");
}

const STALE_PRODUCT_BASED_VALUES: Record<string, unknown[]> = {
  productBasedMetric1Value: ["120"],
  productBasedMetric1Unit: ["45"],
  productBasedMetric1Title: ["ff"],
  productBasedMetric1Subtitle: ["4m nl"],
  productBasedMetric3Unit: ["4y"],
};

function samePropValue(value: unknown, staleValue: unknown) {
  if (typeof staleValue === "number") return Number(value) === staleValue;
  return normalized(value) === normalized(staleValue);
}

function isStaleProductBasedValue(data: Record<string, unknown>, productBasedName: string) {
  const staleValues = STALE_PRODUCT_BASED_VALUES[productBasedName];
  return staleValues?.some((staleValue) => samePropValue(data[productBasedName], staleValue)) ?? false;
}

function valueFor(props: Props, propName: keyof Props) {
  if (!productBasedDesignApplies(props)) return props[propName];

  const data = props as Record<string, unknown>;
  const useCompositeDefaults = productLooksLikeCrsComposite(data) || targetLooksLikeCrsComposite(data);
  const useCrsModelDefaults = !useCompositeDefaults && (productLooksLikeCrsModel(data) || targetLooksLikeCrsModel(data));
  const useCrsTrayDefaults =
    !useCompositeDefaults && !useCrsModelDefaults && (productLooksLikeCrsTray(data) || targetLooksLikeCrsTray(data));
  const useStDefaults = productLooksLikeSt(data);
  const useHtDefaults = productLooksLikeHtPlus(data) && !useStDefaults && !useCompositeDefaults && !useCrsModelDefaults && !useCrsTrayDefaults;
  const defaults = useCompositeDefaults
    ? CRS_COMPOSITE_PRODUCT_BASED_DEFAULTS
    : useCrsModelDefaults
      ? CRS_MODEL_PRODUCT_BASED_DEFAULTS
      : useCrsTrayDefaults
        ? CRS_TRAY_PRODUCT_BASED_DEFAULTS
        : useHtDefaults
          ? ARGENZ_HT_PRODUCT_BASED_DEFAULTS
          : ARGENZ_PRODUCT_BASED_DEFAULTS;
  const useProductFallback = useCompositeDefaults || useCrsModelDefaults || useCrsTrayDefaults || useStDefaults || useHtDefaults;
  const productBasedName = `productBased${pascal(String(propName))}`;
  const productBasedValue = data[productBasedName];
  if ((useCrsModelDefaults || useCrsTrayDefaults) && productBasedName in defaults) return defaults[productBasedName];
  if (useProductFallback && isStaleProductBasedValue(data, productBasedName) && filled(defaults[productBasedName])) return defaults[productBasedName];
  if (productBasedValue !== undefined && productBasedValue !== null) return productBasedValue;
  if (props[propName] !== undefined && props[propName] !== null) return props[propName];
  if (useProductFallback && filled(defaults[productBasedName])) return defaults[productBasedName];
  return undefined;
}

function numberValue(value: unknown, fallback: number, min?: number, max?: number) {
  const next = Number(value);
  if (!Number.isFinite(next)) return fallback;
  return Math.min(max ?? next, Math.max(min ?? next, next));
}

function cssLength(value: unknown, fallback: number) {
  return `${numberValue(value, fallback)}px`;
}

function metric(props: Props, index: number) {
  const field = (name: string) => {
    const propKey = `metric${index}${name}`;
    return valueFor(props, propKey as keyof Props);
  };

  const enabled = boolValue(field("Enabled")) ?? field("Enabled") !== false;
  const value = text(field("Value"));
  const unit = text(field("Unit"));
  const title = text(field("Title"));
  const rawSubtitle = text(field("Subtitle"));
  const subtitle = normalized(rawSubtitle) === normalized(value) ? "" : rawSubtitle;
  const image = imageSrc(field("ImageUrl"));

  if (!enabled || (!value && !title && !image)) return null;

  return {
    value,
    unit,
    title,
    subtitle,
    image,
    imageAlt: text(field("ImageAlt"), title),
  };
}

export function ThreeMashProductMetrics(props: Props) {
  const sourceData = resolveProductDetailData(props.product, (props as Record<string, unknown>).productTemplateJson);
  if (sourceData) {
    return (
      <ProductDetailSectionScope data={sourceData}>
        <ProductDetailMetricsSection data={sourceData} />
      </ProductDetailSectionScope>
    );
  }

  const visibility = productBasedVisibilityOverride(props);
  if (visibility === false) return null;
  if (visibility !== true && (isEditorPreview() || productBasedApplies(props)) && boolValue(props.productBasedSectionVisible) === false) return null;
  if (productBasedHidden(props)) return null;

  const maxItems = numberValue(valueFor(props, "metricCount"), 3, 1, 6);
  const metrics = [1, 2, 3, 4, 5, 6].slice(0, maxItems).map((index) => metric(props, index)).filter(Boolean);

  const style = {
    "--tmpm-bg": text(valueFor(props, "backgroundColor"), "#ffffff"),
    "--tmpm-text": text(valueFor(props, "textColor"), "#050505"),
    "--tmpm-muted": text(valueFor(props, "mutedTextColor"), "#050505"),
    "--tmpm-circle": text(valueFor(props, "circleColor"), "#d8ff1f"),
    "--tmpm-circle-text": text(valueFor(props, "circleTextColor"), "#050505"),
    "--tmpm-max": cssLength(valueFor(props, "maxWidth"), 1240),
    "--tmpm-pt": cssLength(valueFor(props, "paddingTop"), 88),
    "--tmpm-pb": cssLength(valueFor(props, "paddingBottom"), 88),
    "--tmpm-gap": cssLength(valueFor(props, "gridGap"), 96),
    "--tmpm-circle-size": cssLength(valueFor(props, "circleSize"), 148),
    "--tmpm-image-size": cssLength(valueFor(props, "metricImageSize"), 148),
    "--tmpm-image-fit": text(valueFor(props, "metricImageObjectFit"), "contain"),
    "--tmpm-circle-spacing": cssLength(valueFor(props, "circleSpacing"), 46),
    "--tmpm-value-size": cssLength(valueFor(props, "valueFontSize"), 50),
    "--tmpm-unit-size": cssLength(valueFor(props, "unitFontSize"), 22),
    "--tmpm-title-size": cssLength(valueFor(props, "titleFontSize"), 16),
    "--tmpm-subtitle-size": cssLength(valueFor(props, "subtitleFontSize"), 13),
    "--tmpm-desktop-cols": numberValue(valueFor(props, "desktopColumns"), 3, 1, 6),
    "--tmpm-tablet-cols": numberValue(valueFor(props, "tabletColumns"), 2, 1, 3),
  } as any;

  return (
    <section id={text(valueFor(props, "sectionAnchorId")) || undefined} className="three-mash-product-metrics" style={style}>
      <div className="tmpm-wrap">
        <div className="tmpm-grid">
          {metrics.map((item, index) => {
            const metricItem = item as { value: string; unit: string; title: string; subtitle: string; image: string; imageAlt: string };
            return (
              <article className={`tmpm-item${metricItem.image ? " has-image" : ""}`} key={index}>
                {metricItem.image ? (
                  <div className="tmpm-image">
                    <img src={metricItem.image} alt={metricItem.imageAlt} loading="lazy" decoding="async" />
                  </div>
                ) : (
                  <div className="tmpm-circle">
                    <strong>{metricItem.value}</strong>
                    {metricItem.unit ? <span>{metricItem.unit}</span> : null}
                  </div>
                )}
                <div className="tmpm-copy">
                  {metricItem.title ? <h3>{metricItem.title}</h3> : null}
                  {metricItem.subtitle ? <p>{metricItem.subtitle}</p> : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ThreeMashProductMetrics;
