import { ThreeMashProductsPage } from "../ThreeMashProductsPage";
import { listingProps } from "../ThreeMashProductListingPresets";
import type { Props } from "../ThreeMashProductsPage/types";

export function ThreeMashDentalOvensListingPage(props: Props) {
  return (
    <ThreeMashProductsPage
      {...listingProps(props, {
        eyebrowText: "ÜRÜN KATEGORİSİ",
        titleText: "Dental Fırınlar",
        descriptionText: "Dental üretim ve sinterleme süreçleri için canlı fırın envanteri.",
      })}
    />
  );
}

export default ThreeMashDentalOvensListingPage;
