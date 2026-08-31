import { tLocalized } from "../../utils/i18n";
import { ThreeMashProductsPage } from "../ThreeMashProductsPage";
import { listingProps } from "../ThreeMashProductListingPresets";
import type { Props } from "../ThreeMashProductsPage/types";

export function ThreeMashCrealityListingPage(props: Props) {
  return (
    <ThreeMashProductsPage
      {...listingProps(props, {
        eyebrowText: tLocalized("MARKA KOLEKSİYONU", "BRAND COLLECTION"),
        titleText: tLocalized("Creality", "creality"),
        descriptionText: tLocalized("Creality ürünleri ve aksesuarları için canlı envanter.", "Live inventory for Creality products and accessories."),
      })}
    />
  );
}

export default ThreeMashCrealityListingPage;
