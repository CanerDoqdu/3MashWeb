import { ThreeMashProductsPage } from "../ThreeMashProductsPage";
import { listingProps } from "../ThreeMashProductListingPresets";
import type { Props } from "../ThreeMashProductsPage/types";

export function ThreeMashNaberthermListingPage(props: Props) {
  return (
    <ThreeMashProductsPage
      {...listingProps(props, {
        eyebrowText: "MARKA KOLEKSİYONU",
        titleText: "Nabertherm",
        descriptionText: "Nabertherm fırın ve ısıl işlem çözümleri için canlı envanter.",
      })}
    />
  );
}

export default ThreeMashNaberthermListingPage;
