import { ThreeMashProductsPage } from "../ThreeMashProductsPage";
import { listingProps } from "../ThreeMashProductListingPresets";
import type { Props } from "../ThreeMashProductsPage/types";

export function ThreeMashWashCureListingPage(props: Props) {
  return (
    <ThreeMashProductsPage
      {...listingProps(props, {
        eyebrowText: "ÜRÜN KATEGORİSİ",
        titleText: "Yıkama & Kürleme",
        descriptionText: "Baskı sonrası temizlik, kurutma ve kürleme akışı için canlı ürün envanteri.",
      })}
    />
  );
}

export default ThreeMashWashCureListingPage;
