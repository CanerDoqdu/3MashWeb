import { ThreeMashProductsPage } from "../ThreeMashProductsPage";
import { listingProps } from "../ThreeMashProductListingPresets";
import type { Props } from "../ThreeMashProductsPage/types";

export function ThreeMashCrealityListingPage(props: Props) {
  return (
    <ThreeMashProductsPage
      {...listingProps(props, {
        eyebrowText: "MARKA KOLEKSİYONU",
        titleText: "Creality",
        descriptionText: "Creality ürünleri ve aksesuarları için canlı envanter.",
      })}
    />
  );
}

export default ThreeMashCrealityListingPage;
