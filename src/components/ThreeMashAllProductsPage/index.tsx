import { tLocalized } from "../../utils/i18n";
import { ThreeMashProductsPage } from "../ThreeMashProductsPage";
import { listingProps } from "../ThreeMashProductListingPresets";
import type { Props } from "../ThreeMashProductsPage/types";

export function ThreeMashAllProductsPage(props: Props) {
  return (
    <ThreeMashProductsPage
      {...listingProps(props, {
        eyebrowText: tLocalized("TÜM ÜRÜNLER", "All Products"),
        titleText: tLocalized("Ürünler", "Products"),
        descriptionText: tLocalized("Güncel ürün kataloğunu keşfedin; yayındaki ürünleri tek yerden inceleyin.", "Discover our current product catalog; browse live products in one place."),
        showNavigation: true,
      })}
    />
  );
}

export default ThreeMashAllProductsPage;
