import ThreeMashCategoryLanding from "../../sub-components/ThreeMashCategoryLanding";
import { washCureCategoryData } from "../../sub-components/ThreeMashCategoryLanding/presets";
import { isCurrentCategory } from "../../sub-components/ThreeMashCategoryLanding/categoryDetection";
import type { Props } from "./types";

export function ThreeMashWashCureListingPage(props: Props) {
  if (!isCurrentCategory("wash-cure", props.productList)) return null;
  return <ThreeMashCategoryLanding {...props} data={washCureCategoryData} productList={props.productList} />;
}

export default ThreeMashWashCureListingPage;

