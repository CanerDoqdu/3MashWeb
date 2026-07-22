import { ThreeMashProductsPage } from "../ThreeMashProductsPage";
import { listingProps } from "../ThreeMashProductListingPresets";
import type { Props } from "../ThreeMashProductsPage/types";

export function ThreeMashArgenListingPage(props: Props) {
  return (
    <ThreeMashProductsPage
      {...listingProps(props, {
        eyebrowText: "MARKA KOLEKSİYONU",
        titleText: "Argen",
        descriptionText: "Argen materyalleri ve üretim çözümleri için canlı envanter.",
      })}
    />
  );
}

export default ThreeMashArgenListingPage;
