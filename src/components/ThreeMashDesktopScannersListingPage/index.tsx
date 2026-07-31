import ThreeMashCategoryLanding from "../../sub-components/ThreeMashCategoryLanding";
import { desktopScannersCategoryData } from "../../sub-components/ThreeMashCategoryLanding/presets";
import type { Props } from "./types";

export function ThreeMashDesktopScannersListingPage(props: Props) {
  return <ThreeMashCategoryLanding data={desktopScannersCategoryData} productList={props.productList} />;
}

export default ThreeMashDesktopScannersListingPage;
