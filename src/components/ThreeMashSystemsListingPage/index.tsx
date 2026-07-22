import { ThreeMashProductsPage } from "../ThreeMashProductsPage";
import { listingProps } from "../ThreeMashProductListingPresets";
import type { Props } from "../ThreeMashProductsPage/types";

export function ThreeMashSystemsListingPage(props: Props) {
  return (
    <ThreeMashProductsPage
      {...listingProps(props, {
        eyebrowText: "ÜRÜN KATEGORİSİ",
        titleText: "Sistemler",
        descriptionText: "Dental üretim iş akışları için sistem çözümleri ve canlı envanter.",
      })}
    />
  );
}

export default ThreeMashSystemsListingPage;
