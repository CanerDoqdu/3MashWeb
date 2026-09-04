import ThreeMashCategoryLanding from "../../sub-components/ThreeMashCategoryLanding";
import { desktopScannersCategoryData } from "../../sub-components/ThreeMashCategoryLanding/presets";
import { isCurrentCategory } from "../../sub-components/ThreeMashCategoryLanding/categoryDetection";
import type { Props } from "./types";

export function ThreeMashDesktopScannersListingPage(props: Props) {
  if (!isCurrentCategory("scanners", props.productList)) return null;
  return <ThreeMashCategoryLanding {...props} data={desktopScannersCategoryData()} productList={props.productList} />;
}

export default ThreeMashDesktopScannersListingPage;

