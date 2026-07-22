import { ThreeMashProductsPage } from "../ThreeMashProductsPage";
import { listingProps } from "../ThreeMashProductListingPresets";
import type { Props } from "../ThreeMashProductsPage/types";

export function ThreeMashMashBrandListingPage(props: Props) {
  return (
    <ThreeMashProductsPage
      {...listingProps(props, {
        eyebrowText: "MARKA KOLEKSİYONU",
        titleText: "MASH",
        descriptionText: "MASH yazıcı, reçine ve üretim ekosistemi için canlı ürün envanteri.",
      })}
    />
  );
}

export default ThreeMashMashBrandListingPage;
