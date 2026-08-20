import { getDefaultSrc } from "@ikas/bp-storefront";
import { Props } from "./types";
import { useSharedProductDetailData, resolveProductDetailData } from "../../sub-components/ThreeMashProductDetailData";
import { ProductDetailSectionScope, ProductDetailSpecHighlightSection, type ProductDetailTemplateData } from "../../sub-components/ThreeMashProductDetailTemplate";

function trimmedText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
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
  const data = sharedData || fallbackData;

  if (data?.specHighlight) {
    return (
      <ProductDetailSectionScope data={data}>
        <ProductDetailSpecHighlightSection data={data} />
      </ProductDetailSectionScope>
    );
  }

  const src = imageSource(props.image);
  if (!src) return null;

  return (
    <section className="three-mash-product-large-image">
      <div className="tmplg-wrap">
        <div className="tmplg-frame">
          <img
            src={src}
            alt="Ürün detay görseli"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}

export default ThreeMashProductLargeImage;
