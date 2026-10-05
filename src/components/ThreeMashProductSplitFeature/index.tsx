import { Props } from "./types";
import { useSharedProductDetailData, resolveProductDetailData } from "../../sub-components/ThreeMashProductDetailData";
import {
  ProductDetailRatingsSection,
  ProductDetailSectionScope,
  type ProductDetailTemplateData,
} from "../../sub-components/ThreeMashProductDetailTemplate";
import { makePlaceholderRatings } from "../../sub-components/ThreeMashProductSectionPlaceholder";
import { tLocalized, isEnglishLocale, isTurkishText } from "../../utils/i18n";
import { isStudioEnvironment } from "../../utils/isStudioEnvironment";

function trimmedText(value: unknown): string {
  const trimmed = typeof value === "string" ? value.trim() : "";
  if (isEnglishLocale() && isTurkishText(trimmed)) return "";
  return trimmed;
}

function localizedText(trValue: unknown, enValue: unknown, fallback?: string): string {
  return (isEnglishLocale() ? trimmedText(enValue) : trimmedText(trValue)) || fallback || "";
}

function numberValue(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 100) return value;
  if (typeof value === "string" && value.trim()) {
    const num = Number(value.trim());
    if (Number.isFinite(num) && num >= 0 && num <= 100) return num;
  }
  return undefined;
}

function overrideRatingsData(baseData: ProductDetailTemplateData, props: Props): ProductDetailTemplateData {
  const currentRatings = baseData.ratings;
  // Props are generated from the component schema and consumed directly; product data provides locale fallbacks.
  const showHeader = props.showSectionHeading !== false;
  const showChecklist = props.showChecklist !== false;
  const index = showHeader ? trimmedText(props.sectionIndex) || currentRatings?.index || "01" : "";
  const label = showHeader
    ? localizedText(props.sectionLabel, props.sectionLabelEn, currentRatings?.label || tLocalized("KULLANICI DENEYİMİ", "USER EXPERIENCE"))
    : "";
  const titleHtml = showHeader
    ? localizedText(props.titleHtml, props.titleHtmlEn, currentRatings?.titleHtml)
    : "";
  const sideHtml = showHeader
    ? localizedText(props.sideHtml, props.sideHtmlEn, currentRatings?.sideHtml)
    : "";
  const panelTitleHtml = localizedText(props.panelTitleHtml, props.panelTitleHtmlEn, currentRatings?.panelTitleHtml);
  const note = localizedText(props.panelNote, props.panelNoteEn, currentRatings?.note);
  const baseItems = currentRatings?.items ?? [];
  const itemInputs = [
    {
      visible: props.showItem1 !== false,
      tr: props.item1DescriptionHtml,
      en: props.item1DescriptionHtmlEn,
      percent: props.item1Percent,
    },
    {
      visible: props.showItem2 !== false,
      tr: props.item2DescriptionHtml,
      en: props.item2DescriptionHtmlEn,
      percent: props.item2Percent,
    },
    {
      visible: props.showItem3 !== false,
      tr: props.item3DescriptionHtml,
      en: props.item3DescriptionHtmlEn,
      percent: props.item3Percent,
    },
    {
      visible: props.showItem4 === true,
      tr: props.item4DescriptionHtml,
      en: props.item4DescriptionHtmlEn,
      percent: props.item4Percent,
    },
    {
      visible: props.showItem5 === true,
      tr: props.item5DescriptionHtml,
      en: props.item5DescriptionHtmlEn,
      percent: props.item5Percent,
    },
  ];

  const items = showChecklist
    ? itemInputs.flatMap((input, index) => {
        if (!input.visible) return [];
        const baseItem = baseItems[index];
        const descriptionHtml = localizedText(input.tr, input.en, baseItem?.descriptionHtml);
        if (!descriptionHtml) return [];
        const percent = numberValue(input.percent) ?? baseItem?.percent;
        return [{ descriptionHtml, ...(percent !== undefined ? { percent } : {}) }];
      })
    : [];

  return {
    ...baseData,
    ratings: {
      index,
      label,
      titleHtml,
      sideHtml,
      panelTitleHtml,
      note,
      items,
      showHeader,
      showChecklist,
    },
  };
}

export function ThreeMashProductSplitFeature(props: Props) {
  const isStudio = isStudioEnvironment();
  const sharedData = useSharedProductDetailData(props.product, props.productTemplateJson);
  const fallbackData = props.product ? resolveProductDetailData(props.product, props.productTemplateJson) : null;
  const rawData = sharedData || fallbackData || (isStudio ? makePlaceholderRatings() : null);

  if (!rawData) return null;

  const data = overrideRatingsData(rawData, props);

  return (
    <ProductDetailSectionScope
      data={data}
      colorOverrides={{
        backgroundColor: props.backgroundColor,
        textColor: props.textColor,
        accentColor: props.accentColor,
      }}
    >
      <ProductDetailRatingsSection data={data} />
    </ProductDetailSectionScope>
  );
}

export default ThreeMashProductSplitFeature;
