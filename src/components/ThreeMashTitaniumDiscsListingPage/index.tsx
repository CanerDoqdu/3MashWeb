import { ThreeMashProductsPage } from "../ThreeMashProductsPage";
import { listingProps } from "../ThreeMashProductListingPresets";
import type { Props } from "../ThreeMashProductsPage/types";

export function ThreeMashTitaniumDiscsListingPage(props: Props) {
  return (
    <ThreeMashProductsPage
      {...listingProps(props, {
        eyebrowText: "ÜRÜN KATEGORİSİ",
        titleText: "Titanyum Diskler",
        descriptionText: "Dental CAD/CAM üretim için titanyum disk canlı envanteri.",
      })}
    />
  );
}

export default ThreeMashTitaniumDiscsListingPage;
