import { tLocalized } from "../../utils/i18n";
import { ThreeMashProductsPage } from "../ThreeMashProductsPage";
import { listingProps } from "../ThreeMashProductListingPresets";
import type { Props } from "../ThreeMashProductsPage/types";

export function ThreeMashCrsListingPage(props: Props) {
  return (
    <ThreeMashProductsPage
      {...listingProps(props, {
        eyebrowText: tLocalized("MARKA KOLEKSİYONU", "BRAND COLLECTION"),
        titleText: "CRS",
        descriptionText: "CRS reçine ve sarf ürünleri için canlı ürün envanteri.",
      })}
    />
  );
}

export default ThreeMashCrsListingPage;
