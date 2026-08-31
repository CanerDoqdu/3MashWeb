import { getDefaultSrc } from "@ikas/bp-storefront";
import { Props } from "./types";
import { useSharedProductDetailData, resolveProductDetailData } from "../../sub-components/ThreeMashProductDetailData";
import { ProductDetailSectionScope, ProductDetailSpecHighlightSection, type ProductDetailTemplateData } from "../../sub-components/ThreeMashProductDetailTemplate";
import { makePlaceholderSpecHighlight } from "../../sub-components/ThreeMashProductSectionPlaceholder";
import { isEnglishLocale, isTurkishText, tLocalized } from "../../utils/i18n";

function trimmedText(value: unknown): string {
  const trimmed = typeof value === "string" ? value.trim() : "";
  if (isEnglishLocale() && isTurkishText(trimmed)) return "";
  return trimmed;
}

function imageSource(value: unknown): string {
  if (!value) return "";
  if (typeof value === "string") return value.trim();
  try {
    return getDefaultSrc(value as any) || "";
  } catch {
    return "";
  }
}

export function ThreeMashProductLargeImage(props: Props) {
  const sharedData = useSharedProductDetailData(props.product, (props as Record<string, unknown>).productTemplateJson);
  const fallbackData = props.product ? resolveProductDetailData(props.product) : null;
  const src = imageSource(props.image);

  if (src) {
    return (
      <section className="three-mash-product-large-image">
        <div className="tmplg-wrap">
          <div className="tmplg-frame">
            <img
              src={src}
              alt={tLocalized("Urun detay gorseli", "Product detail image")}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>
    );
  }

  const data = sharedData || fallbackData || makePlaceholderSpecHighlight();

  if (data?.specHighlight) {
    return (
      <ProductDetailSectionScope data={data}>
        <ProductDetailSpecHighlightSection data={data} />
      </ProductDetailSectionScope>
    );
  }

  const placeholderData = makePlaceholderSpecHighlight();
  return (
    <ProductDetailSectionScope data={placeholderData}>
      <ProductDetailSpecHighlightSection data={placeholderData} />
    </ProductDetailSectionScope>
  );
}

export default ThreeMashProductLargeImage;
