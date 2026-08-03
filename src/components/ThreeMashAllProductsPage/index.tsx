import { ThreeMashProductsPage } from "../ThreeMashProductsPage";
import { listingProps } from "../ThreeMashProductListingPresets";
import type { Props } from "../ThreeMashProductsPage/types";

export function ThreeMashAllProductsPage(props: Props) {
  return (
    <ThreeMashProductsPage
      {...listingProps(props, {
        eyebrowText: "TÜM ÜRÜNLER",
        titleText: "Ürünler",
        descriptionText: "Güncel ürün kataloğunu keşfedin; yayındaki ürünleri tek yerden inceleyin.",
      })}
    />
  );
}

export default ThreeMashAllProductsPage;
