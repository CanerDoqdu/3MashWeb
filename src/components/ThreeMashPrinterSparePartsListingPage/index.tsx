import ThreeMashCategoryLanding from "../../sub-components/ThreeMashCategoryLanding";
import { printerSparePartsCategoryData } from "../../sub-components/ThreeMashCategoryLanding/presets";
import type { Props } from "./types";

export function ThreeMashPrinterSparePartsListingPage(props: Props) {
  return <ThreeMashCategoryLanding {...props} data={printerSparePartsCategoryData} productList={props.productList} />;
}

export default ThreeMashPrinterSparePartsListingPage;
