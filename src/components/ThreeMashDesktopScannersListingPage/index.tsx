import { ThreeMashProductsPage } from "../ThreeMashProductsPage";
import { listingProps } from "../ThreeMashProductListingPresets";
import type { Props } from "../ThreeMashProductsPage/types";

export function ThreeMashDesktopScannersListingPage(props: Props) {
  return (
    <ThreeMashProductsPage
      {...listingProps(props, {
        eyebrowText: "ÜRÜN KATEGORİSİ",
        titleText: "Masaüstü Tarayıcılar",
        descriptionText: "Dijital ölçü ve laboratuvar akışı için canlı masaüstü tarayıcı envanteri.",
      })}
    />
  );
}

export default ThreeMashDesktopScannersListingPage;
