import { ThreeMashProductsPage } from "../ThreeMashProductsPage";
import { listingProps } from "../ThreeMashProductListingPresets";
import type { Props } from "../ThreeMashProductsPage/types";

export function ThreeMashCategoryProductsPage(props: Props) {
  return (
    <ThreeMashProductsPage
      {...listingProps(props, {
        eyebrowText: "ÜRÜN KATEGORİSİ",
        titleText: "",
        descriptionText: "Bu kategoriye bağlı aktif ürünleri canlı olarak inceleyin.",
        showSort: false,
      })}
    />
  );
}

export default ThreeMashCategoryProductsPage;
