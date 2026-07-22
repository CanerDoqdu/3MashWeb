import { ThreeMashProductsPage } from "../ThreeMashProductsPage";
import { listingProps } from "../ThreeMashProductListingPresets";
import type { Props } from "../ThreeMashProductsPage/types";

export function ThreeMashZirconBlocksListingPage(props: Props) {
  return (
    <ThreeMashProductsPage
      {...listingProps(props, {
        eyebrowText: "ÜRÜN KATEGORİSİ",
        titleText: "Zirkon Bloklar",
        descriptionText: "Restoratif üretim için canlı zirkon blok envanteri.",
      })}
    />
  );
}

export default ThreeMashZirconBlocksListingPage;
