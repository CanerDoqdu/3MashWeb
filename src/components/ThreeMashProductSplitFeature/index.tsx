import { Props } from "./types";
import { useSharedProductDetailData, resolveProductDetailData } from "../../sub-components/ThreeMashProductDetailData";
import {
  ProductDetailRatingsSection,
  ProductDetailSectionScope,
  type ProductDetailTemplateData,
} from "../../sub-components/ThreeMashProductDetailTemplate";

function trimmedText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
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
  if (!currentRatings && !props.titleHtml && !props.panelTitleHtml) return baseData;

  const ratings = {
    index: trimmedText(props.sectionIndex) || currentRatings?.index || "01",
    label: trimmedText(props.sectionLabel) || currentRatings?.label || "KULLANICI DENEYİMİ",
    titleHtml: trimmedText(props.titleHtml) || currentRatings?.titleHtml || "",
    sideHtml: trimmedText(props.sideHtml) || currentRatings?.sideHtml || "",
    panelTitleHtml: trimmedText(props.panelTitleHtml) || currentRatings?.panelTitleHtml || "",
    note: trimmedText(props.panelNote) || currentRatings?.note || "",
    items: currentRatings?.items ? [...currentRatings.items] : [],
  };

  const item1Desc = trimmedText(props.item1DescriptionHtml);
  const item1Pct = numberValue(props.item1Percent);
  if (item1Desc || item1Pct !== undefined) {
    ratings.items[0] = {
      descriptionHtml: item1Desc || ratings.items[0]?.descriptionHtml || "",
      percent: item1Pct !== undefined ? item1Pct : ratings.items[0]?.percent,
    };
  }

  const item2Desc = trimmedText(props.item2DescriptionHtml);
  const item2Pct = numberValue(props.item2Percent);
  if (item2Desc || item2Pct !== undefined) {
    ratings.items[1] = {
      descriptionHtml: item2Desc || ratings.items[1]?.descriptionHtml || "",
      percent: item2Pct !== undefined ? item2Pct : ratings.items[1]?.percent,
    };
  }

  const item3Desc = trimmedText(props.item3DescriptionHtml);
  const item3Pct = numberValue(props.item3Percent);
  if (item3Desc || item3Pct !== undefined) {
    ratings.items[2] = {
      descriptionHtml: item3Desc || ratings.items[2]?.descriptionHtml || "",
      percent: item3Pct !== undefined ? item3Pct : ratings.items[2]?.percent,
    };
  }

  return {
    ...baseData,
    ratings,
  };
}

export function ThreeMashProductSplitFeature(props: Props) {
  const sharedData = useSharedProductDetailData(props.product);
  const fallbackData = props.product ? resolveProductDetailData(props.product) : null;
  const rawData = sharedData || fallbackData;

  if (!rawData) {
    return null;
  }

  const data = overrideRatingsData(rawData, props);

  if (!data.ratings || !data.ratings.items.length) {
    return null;
  }

  return (
    <ProductDetailSectionScope data={data}>
      <ProductDetailRatingsSection data={data} />
    </ProductDetailSectionScope>
  );
}

export default ThreeMashProductSplitFeature;
