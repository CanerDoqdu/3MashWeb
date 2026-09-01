import { Props } from "./types";
import { useSharedProductDetailData, resolveProductDetailData } from "../../sub-components/ThreeMashProductDetailData";
import {
  ProductDetailRatingsSection,
  ProductDetailSectionScope,
  type ProductDetailTemplateData,
} from "../../sub-components/ThreeMashProductDetailTemplate";
import { makePlaceholderRatings } from "../../sub-components/ThreeMashProductSectionPlaceholder";
import { tLocalized, isEnglishLocale, isTurkishText } from "../../utils/i18n";

function trimmedText(value: unknown): string {
  const trimmed = typeof value === "string" ? value.trim() : "";
  if (isEnglishLocale() && isTurkishText(trimmed)) return "";
  return trimmed;
}

function numberValue(value: unknown): number | undefined {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const num = Number(value.trim());
    if (!Number.isNaN(num)) return num;
  }
  return undefined;
}

function overrideRatingsData(baseData: ProductDetailTemplateData, props: Props): ProductDetailTemplateData {
  const currentRatings = baseData.ratings;
  // NOTE: Props ARE fully typed in the Props interface, but TypeScript's type narrowing
  // after optional chaining sometimes requires explicit any casts for clarity in override chains.
  const index = trimmedText((props as any).sectionIndex) || currentRatings?.index || "01";
  const label = trimmedText((props as any).sectionLabel) || currentRatings?.label || tLocalized("KULLANICI DENEYİMİ", "USER EXPERIENCE");
  const titleHtml = trimmedText((props as any).titleHtml) || currentRatings?.titleHtml || "";
  const sideHtml = trimmedText((props as any).sideHtml) || currentRatings?.sideHtml || "";
  const panelTitleHtml = trimmedText((props as any).panelTitleHtml) || currentRatings?.panelTitleHtml || "";
  const note = trimmedText((props as any).panelNote) || currentRatings?.note || "";

  const items = currentRatings?.items ? [...currentRatings.items] : [];

  const item1Desc = trimmedText((props as any).item1DescriptionHtml);
  const item1Pct = numberValue((props as any).item1Percent);
  if (item1Desc || item1Pct !== undefined) {
    items[0] = {
      descriptionHtml: item1Desc || items[0]?.descriptionHtml || "",
      percent: item1Pct !== undefined ? item1Pct : items[0]?.percent,
    };
  }

  const item2Desc = trimmedText((props as any).item2DescriptionHtml);
  const item2Pct = numberValue((props as any).item2Percent);
  if (item2Desc || item2Pct !== undefined) {
    items[1] = {
      descriptionHtml: item2Desc || items[1]?.descriptionHtml || "",
      percent: item2Pct !== undefined ? item2Pct : items[1]?.percent,
    };
  }

  const item3Desc = trimmedText((props as any).item3DescriptionHtml);
  const item3Pct = numberValue((props as any).item3Percent);
  if (item3Desc || item3Pct !== undefined) {
    items[2] = {
      descriptionHtml: item3Desc || items[2]?.descriptionHtml || "",
      percent: item3Pct !== undefined ? item3Pct : items[2]?.percent,
    };
  }

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
    },
  };
}

export function ThreeMashProductSplitFeature(props: Props) {
  const sharedData = useSharedProductDetailData(props.product);
  const fallbackData = props.product ? resolveProductDetailData(props.product) : null;
  const rawData = sharedData || fallbackData || makePlaceholderRatings();

  const data = overrideRatingsData(rawData, props);

  return (
    <ProductDetailSectionScope data={data}>
      <ProductDetailRatingsSection data={data} />
    </ProductDetailSectionScope>
  );
}

export default ThreeMashProductSplitFeature;
