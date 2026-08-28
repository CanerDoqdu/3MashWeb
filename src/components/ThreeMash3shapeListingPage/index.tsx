import { tLocalized } from "../../utils/i18n";
import { ThreeMashProductsPage } from "../ThreeMashProductsPage";
import { listingProps } from "../ThreeMashProductListingPresets";
import type { Props } from "../ThreeMashProductsPage/types";

export function ThreeMash3shapeListingPage(props: Props) {
  return (
    <ThreeMashProductsPage
      {...listingProps(props, {
        eyebrowText: tLocalized("MARKA KOLEKSİYONU", "BRAND COLLECTION"),
        titleText: "3Shape",
        descriptionText: tLocalized("3Shape ekosistemi için canlı ürün envanteri.", "Live product inventory for the 3Shape ecosystem."),
      })}
    />
  );
}

export default ThreeMash3shapeListingPage;
