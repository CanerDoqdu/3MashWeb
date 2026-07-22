import { ThreeMashProductsPage } from "../ThreeMashProductsPage";
import { listingProps } from "../ThreeMashProductListingPresets";
import type { Props } from "../ThreeMashProductsPage/types";

export function ThreeMash3shapeListingPage(props: Props) {
  return (
    <ThreeMashProductsPage
      {...listingProps(props, {
        eyebrowText: "MARKA KOLEKSİYONU",
        titleText: "3Shape",
        descriptionText: "3Shape ekosistemi için canlı ürün envanteri.",
      })}
    />
  );
}

export default ThreeMash3shapeListingPage;
