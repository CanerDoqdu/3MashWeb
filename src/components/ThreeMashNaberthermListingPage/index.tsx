import { tLocalized } from "../../utils/i18n";
import { ThreeMashProductsPage } from "../ThreeMashProductsPage";
import { listingProps } from "../ThreeMashProductListingPresets";
import type { Props } from "../ThreeMashProductsPage/types";

export function ThreeMashNaberthermListingPage(props: Props) {
  return (
    <ThreeMashProductsPage
      {...listingProps(props, {
        eyebrowText: tLocalized("MARKA KOLEKSİYONU", "BRAND COLLECTION"),
        titleText: "Nabertherm",
        descriptionText: "Nabertherm fırın ve ısıl işlem çözümleri için canlı envanter.",
      })}
    />
  );
}

export default ThreeMashNaberthermListingPage;
