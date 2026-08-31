import { tLocalized } from "../../utils/i18n";
import { ThreeMashProductsPage } from "../ThreeMashProductsPage";
import { listingProps } from "../ThreeMashProductListingPresets";
import type { Props } from "../ThreeMashProductsPage/types";

export function ThreeMashMashBrandListingPage(props: Props) {
  return (
    <ThreeMashProductsPage
      {...listingProps(props, {
        eyebrowText: tLocalized("MARKA KOLEKSİYONU", "BRAND COLLECTION"),
        titleText: "MASH",
        descriptionText: tLocalized("MASH yazıcı, reçine ve üretim ekosistemi için canlı ürün envanteri.", "Live product inventory for the MASH printer, resin, and production ecosystem."),
      })}
    />
  );
}

export default ThreeMashMashBrandListingPage;
