import { ThreeMashProductsPage } from "../ThreeMashProductsPage";
import { listingProps } from "../ThreeMashProductListingPresets";
import type { Props } from "../ThreeMashProductsPage/types";

export function ThreeMash3dPrintersListingPage(props: Props) {
  return (
    <ThreeMashProductsPage
      {...listingProps(props, {
        eyebrowText: "ÜRÜN KATEGORİSİ",
        titleText: "3D Yazıcılar",
        descriptionText: "Dental klinik ve laboratuvarlar için canlı 3D yazıcı envanteri.",
      })}
    />
  );
}

export default ThreeMash3dPrintersListingPage;
