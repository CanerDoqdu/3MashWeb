import ThreeMashCategoryLanding from "../../sub-components/ThreeMashCategoryLanding";
import { dentalFurnacesCategoryData } from "../../sub-components/ThreeMashCategoryLanding/presets";
import { isCurrentCategory } from "../../sub-components/ThreeMashCategoryLanding/categoryDetection";
import type { Props } from "./types";

export function ThreeMashDentalOvensListingPage(props: Props) {
  if (!isCurrentCategory("furnaces", props.productList)) return null;
  return <ThreeMashCategoryLanding {...props} data={dentalFurnacesCategoryData} productList={props.productList} />;
}

export default ThreeMashDentalOvensListingPage;

