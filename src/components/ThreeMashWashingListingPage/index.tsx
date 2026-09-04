import ThreeMashCategoryLanding from "../../sub-components/ThreeMashCategoryLanding";
import { washingCategoryData } from "../../sub-components/ThreeMashCategoryLanding/presets";
import { isCurrentCategory } from "../../sub-components/ThreeMashCategoryLanding/categoryDetection";
import type { Props } from "./types";

export function ThreeMashWashingListingPage(props: Props) {
  if (!isCurrentCategory("washing", props.productList)) return null;
  return <ThreeMashCategoryLanding {...props} data={washingCategoryData()} productList={props.productList} />;
}

export default ThreeMashWashingListingPage;
