import { Props } from "./types";
import { useSharedProductDetailData, resolveProductDetailData } from "../../sub-components/ThreeMashProductDetailData";
import {
  ProductDetailMetricsSection,
  ProductDetailSectionScope,
  type ProductDetailTemplateData,
} from "../../sub-components/ThreeMashProductDetailTemplate";
import { makePlaceholderMetrics } from "../../sub-components/ThreeMashProductSectionPlaceholder";
import { tLocalized, isEnglishLocale, isTurkishText } from "../../utils/i18n";
import { isStudioEnvironment } from "../../utils/isStudioEnvironment";

function trimmedText(value: unknown): string {
  const trimmed = typeof value === "string" ? value.trim() : "";
  if (isEnglishLocale() && isTurkishText(trimmed)) return "";
  return trimmed;
}

function localizedOverride(turkish: unknown, english: unknown): string {
  return isEnglishLocale() ? trimmedText(english) : trimmedText(turkish);
}

function overrideMetricsData(baseData: ProductDetailTemplateData | null, props: Props): ProductDetailTemplateData | null {
  if (!baseData) return null;

  const currentMetrics = baseData.metrics;
  // NOTE: Props ARE fully typed, but TypeScript's type narrowing after optional chaining
  // sometimes requires explicit any casts for clarity in override chains.
  const metrics = {
    index: trimmedText(props.sectionIndex) || currentMetrics?.index || "02",
    label: localizedOverride(props.sectionLabel, props.sectionLabelEn) || currentMetrics?.label || tLocalized("TEKNİK ÖZELLİKLER", "TECHNICAL SPECIFICATIONS"),
    titleHtml: localizedOverride(props.titleHtml, props.titleHtmlEn) || currentMetrics?.titleHtml || "",
    sideHtml: localizedOverride(props.sideHtml, props.sideHtmlEn) || currentMetrics?.sideHtml || "",
    items: currentMetrics?.items ? [...currentMetrics.items] : [],
  };

  // 3 Beyaz Kart Overrides
  // NOTE: Dynamic property access via template literals (e.g., `card${i}Title`) requires
  // type narrowing to 'any' because TypeScript cannot statically verify computed property names,
  // even though all card1Title/card2Title/card3Title/etc. ARE defined in the Props interface.
  for (let i = 1; i <= 3; i++) {
    const title = localizedOverride((props as any)[`card${i}Title`], (props as any)[`card${i}TitleEn`]);
    const val = localizedOverride((props as any)[`card${i}Value`], (props as any)[`card${i}ValueEn`]);
    const unit = localizedOverride((props as any)[`card${i}Unit`], (props as any)[`card${i}UnitEn`]);
    const tag = localizedOverride((props as any)[`card${i}Tag`], (props as any)[`card${i}TagEn`]);
    const caption = localizedOverride((props as any)[`card${i}Caption`], (props as any)[`card${i}CaptionEn`]);

    if (title || val || unit || tag || caption) {
      const idx = i - 1;
      const existing = metrics.items[idx] || { name: "", value: "", unit: "", tag: "", caption: "" };
      metrics.items[idx] = {
        name: title || existing.name,
        value: val || existing.value,
        unit: unit || existing.unit || "",
        tag: tag || existing.tag || "",
        caption: caption || existing.caption || "",
      };
    }
  }

  // Optional metric slots extend the data-driven three-card set without rendering empty cards.
  for (let i = 4; i <= 5; i++) {
    if ((props as any)[`showMetricCard${i}`] !== true) continue;

    const title = localizedOverride((props as any)[`card${i}Title`], (props as any)[`card${i}TitleEn`]);
    const value = localizedOverride((props as any)[`card${i}Value`], (props as any)[`card${i}ValueEn`]);
    const unit = localizedOverride((props as any)[`card${i}Unit`], (props as any)[`card${i}UnitEn`]);
    const tag = localizedOverride((props as any)[`card${i}Tag`], (props as any)[`card${i}TagEn`]);
    const caption = localizedOverride((props as any)[`card${i}Caption`], (props as any)[`card${i}CaptionEn`]);
    const idx = i - 1;
    const existing = metrics.items[idx] || { name: "", value: "", unit: "", tag: "", caption: "" };

    metrics.items[idx] = {
      name: title || existing.name,
      value: value || existing.value,
      unit: unit || existing.unit || "",
      tag: tag || existing.tag || "",
      caption: caption || existing.caption || "",
    };
  }

  const metricVisibility = [
    props.showMetricCard1 !== false,
    props.showMetricCard2 !== false,
    props.showMetricCard3 !== false,
    props.showMetricCard4 === true,
    props.showMetricCard5 === true,
  ];
  metrics.items = metrics.items.slice(0, 5).filter((item, index) =>
    metricVisibility[index] && item.name.trim() !== "" && item.value.trim() !== ""
  );

  // Siyah Teknik Vurgu ve Tablo Kartı (Spec Highlight) Overrides
  // NOTE: Props ARE fully typed, but casts clarify the override chain.
  let specHighlight = props.showSpecHighlight === false
    ? undefined
    : baseData.specHighlight
      ? { ...baseData.specHighlight }
      : undefined;
  const specTag = localizedOverride(props.specTag, props.specTagEn);
  const specTitleHtml = localizedOverride(props.specTitleHtml, props.specTitleHtmlEn);
  const specDescriptionHtml = localizedOverride(props.specDescriptionHtml, props.specDescriptionHtmlEn);
  const specCtaText = localizedOverride(props.specCtaText, props.specCtaTextEn);
  const specCtaHref = trimmedText(props.specCtaHref);

  if (props.showSpecHighlight !== false && (specTag || specTitleHtml || specDescriptionHtml || specCtaText || specCtaHref)) {
    specHighlight = {
      tag: specTag || specHighlight?.tag || "",
      titleHtml: specTitleHtml || specHighlight?.titleHtml || "",
      descriptionHtml: specDescriptionHtml || specHighlight?.descriptionHtml || "",
      ctaText: specCtaText || specHighlight?.ctaText || tLocalized("Boyut seç →", "Select size →"),
      ctaHref: specCtaHref || specHighlight?.ctaHref || "#satinal",
      rows: specHighlight?.rows ? [...specHighlight.rows] : [],
    };
  }

  // Tablo Satırları (1..5)
  // NOTE: Dynamic property access via template literals (e.g., `specRow${r}Label`) requires
  // type narrowing to 'any' because TypeScript cannot statically verify computed property names,
  // even though all specRow1Label/specRow2Label/etc. ARE defined in the Props interface.
  if (specHighlight) {
    const rows = [...(specHighlight.rows || [])];
    for (let r = 1; r <= 5; r++) {
      const label = localizedOverride((props as any)[`specRow${r}Label`], (props as any)[`specRow${r}LabelEn`]);
      const value = localizedOverride((props as any)[`specRow${r}Value`], (props as any)[`specRow${r}ValueEn`]);
      if (label || value) {
        const rowIdx = r - 1;
        const existing = rows[rowIdx] || { label: "", value: "" };
        rows[rowIdx] = {
          label: label || existing.label,
          value: value || existing.value,
        };
      }
    }
    specHighlight.rows = props.showSpecTable === false ? [] : rows.slice(0, 5);
  }

  return {
    ...baseData,
    metrics,
    specHighlight,
  };
}

export function ThreeMashProductMetrics(props: Props) {
  const isStudio = isStudioEnvironment();
  const sharedData = useSharedProductDetailData(props.product);
  const fallbackData = props.product ? resolveProductDetailData(props.product) : null;
  const rawData = sharedData || fallbackData || (isStudio ? makePlaceholderMetrics() : null);

  if (!rawData) return null;

  const data = overrideMetricsData(rawData, props) || rawData;

  return (
    <ProductDetailSectionScope data={data}>
      <ProductDetailMetricsSection data={data} />
    </ProductDetailSectionScope>
  );
}

export default ThreeMashProductMetrics;
