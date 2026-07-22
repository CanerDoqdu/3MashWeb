import { ThreeMashProductsPage } from "../ThreeMashProductsPage";
import { listingProps } from "../ThreeMashProductListingPresets";
import type { Props } from "../ThreeMashProductsPage/types";

export function ThreeMashCrsListingPage(props: Props) {
  return (
    <ThreeMashProductsPage
      {...listingProps(props, {
        eyebrowText: "MARKA KOLEKSİYONU",
        titleText: "CRS",
        descriptionText: "CRS reçine ve sarf ürünleri için canlı ürün envanteri.",
      })}
    />
  );
}

export default ThreeMashCrsListingPage;
