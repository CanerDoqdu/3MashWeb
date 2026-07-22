import { ThreeMashProductsPage } from "../ThreeMashProductsPage";
import { listingProps } from "../ThreeMashProductListingPresets";
import type { Props } from "../ThreeMashProductsPage/types";

export function ThreeMashAllProductsPage(props: Props) {
  return (
    <ThreeMashProductsPage
      {...listingProps(props, {
        eyebrowText: "TÜM ÜRÜNLER",
        titleText: "Ürünler",
        descriptionText: "3mash envanterindeki aktif ürünleri canlı olarak inceleyin.",
      })}
    />
  );
}

export default ThreeMashAllProductsPage;
