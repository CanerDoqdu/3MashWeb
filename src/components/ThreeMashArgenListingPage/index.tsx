import { tLocalized } from "../../utils/i18n";
import { ThreeMashProductsPage } from "../ThreeMashProductsPage";
import { listingProps } from "../ThreeMashProductListingPresets";
import type { Props } from "../ThreeMashProductsPage/types";

export function ThreeMashArgenListingPage(props: Props) {
  return (
    <ThreeMashProductsPage
      {...listingProps(props, {
        eyebrowText: tLocalized("MARKA KOLEKSİYONU", "BRAND COLLECTION"),
        titleText: "Argen",
        descriptionText: tLocalized("Argen materyalleri ve üretim çözümleri için canlı envanter.", "Live inventory for Argen materials and production solutions."),
      })}
    />
  );
}

export default ThreeMashArgenListingPage;
