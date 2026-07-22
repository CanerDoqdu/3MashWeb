import { ThreeMashProductsPage } from "../ThreeMashProductsPage";
import { listingProps } from "../ThreeMashProductListingPresets";
import type { Props } from "../ThreeMashProductsPage/types";

export function ThreeMashDentalResinsListingPage(props: Props) {
  return (
    <ThreeMashProductsPage
      {...listingProps(props, {
        eyebrowText: "ÜRÜN KATEGORİSİ",
        titleText: "Dental Reçineler",
        descriptionText: "Model, splint, guide ve geçici uygulamalar için canlı reçine envanteri.",
      })}
    />
  );
}

export default ThreeMashDentalResinsListingPage;
