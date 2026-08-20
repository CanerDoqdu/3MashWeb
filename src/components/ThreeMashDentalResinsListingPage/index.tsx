import ThreeMashCategoryLanding from "../../sub-components/ThreeMashCategoryLanding";
import { dentalResinsCategoryData } from "../../sub-components/ThreeMashCategoryLanding/presets";
import { isCurrentCategory } from "../../sub-components/ThreeMashCategoryLanding/categoryDetection";
import type { Props } from "./types";

export function ThreeMashDentalResinsListingPage(props: Props) {
  if (!isCurrentCategory("resins", props.productList)) return null;
  return <ThreeMashCategoryLanding {...props} data={dentalResinsCategoryData} productList={props.productList} />;
}

export default ThreeMashDentalResinsListingPage;

