import ThreeMashCategoryLanding from "../../sub-components/ThreeMashCategoryLanding";
import { printerSparePartsCategoryData } from "../../sub-components/ThreeMashCategoryLanding/presets";
import { isCurrentCategory } from "../../sub-components/ThreeMashCategoryLanding/categoryDetection";
import type { Props } from "./types";

export function ThreeMashPrinterSparePartsListingPage(props: Props) {
  if (!isCurrentCategory("spares", props.productList)) return null;
  return <ThreeMashCategoryLanding {...props} data={printerSparePartsCategoryData} productList={props.productList} />;
}

export default ThreeMashPrinterSparePartsListingPage;

