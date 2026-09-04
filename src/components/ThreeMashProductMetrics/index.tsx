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

function overrideMetricsData(baseData: ProductDetailTemplateData | null, props: Props): ProductDetailTemplateData | null {
  if (!baseData) return null;

  const currentMetrics = baseData.metrics;
  // NOTE: Props ARE fully typed, but TypeScript's type narrowing after optional chaining
  // sometimes requires explicit any casts for clarity in override chains.
  const metrics = {
    index: trimmedText((props as any).sectionIndex) || currentMetrics?.index || "02",
    label: trimmedText((props as any).sectionLabel) || currentMetrics?.label || tLocalized("TEKNİK ÖZELLİKLER", "TECHNICAL SPECIFICATIONS"),
    titleHtml: trimmedText((props as any).titleHtml) || currentMetrics?.titleHtml || "",
    sideHtml: trimmedText((props as any).sideHtml) || currentMetrics?.sideHtml || "",
    items: currentMetrics?.items ? [...currentMetrics.items] : [],
  };

  // 3 Beyaz Kart Overrides
  // NOTE: Dynamic property access via template literals (e.g., `card${i}Title`) requires
  // type narrowing to 'any' because TypeScript cannot statically verify computed property names,
  // even though all card1Title/card2Title/card3Title/etc. ARE defined in the Props interface.
  for (let i = 1; i <= 3; i++) {
    const rawTitle = (props as any)[`card${i}Title`];
    const title = trimmedText(rawTitle);
    const rawVal = (props as any)[`card${i}Value`];
    const val = trimmedText(rawVal);
    const rawTag = (props as any)[`card${i}Tag`];
    const tag = trimmedText(rawTag);
    const rawCaption = (props as any)[`card${i}Caption`];
    const caption = trimmedText(rawCaption);

    if (title || val || tag || caption) {
      const idx = i - 1;
      const existing = metrics.items[idx] || { name: "", value: "", unit: "", tag: "", caption: "" };
      metrics.items[idx] = {
        name: title || existing.name,
        value: val || existing.value,
        unit: existing.unit || "",
        tag: tag || existing.tag || "",
        caption: caption || existing.caption || "",
      };
    }
  }

  // Siyah Teknik Vurgu ve Tablo Kartı (Spec Highlight) Overrides
  // NOTE: Props ARE fully typed, but casts clarify the override chain.
  let specHighlight = baseData.specHighlight ? { ...baseData.specHighlight } : undefined;
  const specTag = trimmedText((props as any).specTag);
  const specTitleHtml = trimmedText((props as any).specTitleHtml);
  const specDescriptionHtml = trimmedText((props as any).specDescriptionHtml);
  const specCtaText = trimmedText((props as any).specCtaText);
  const specCtaHref = trimmedText((props as any).specCtaHref);

  if (specTag || specTitleHtml || specDescriptionHtml || specCtaText || specCtaHref) {
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
      const label = trimmedText((props as any)[`specRow${r}Label`]);
      const value = trimmedText((props as any)[`specRow${r}Value`]);
      if (label || value) {
        const rowIdx = r - 1;
        const existing = rows[rowIdx] || { label: "", value: "" };
        rows[rowIdx] = {
          label: label || existing.label,
          value: value || existing.value,
        };
      }
    }
    specHighlight.rows = rows;
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
