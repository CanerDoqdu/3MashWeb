import { ThreeMashProductsPage } from "../ThreeMashProductsPage";
import { listingProps } from "../ThreeMashProductListingPresets";
import type { Props } from "../ThreeMashProductsPage/types";

export function ThreeMashPrinterSparePartsListingPage(props: Props) {
  return (
    <ThreeMashProductsPage
      {...listingProps(props, {
        eyebrowText: "ÜRÜN KATEGORİSİ",
        titleText: "3D Yazıcı Yedek Parçaları",
        descriptionText: "3D yazıcı bakım, servis ve yedek parça ürünleri için canlı envanter.",
      })}
    />
  );
}

export default ThreeMashPrinterSparePartsListingPage;
