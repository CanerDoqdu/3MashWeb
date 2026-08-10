import ThreeMashCategoryLanding from "../../sub-components/ThreeMashCategoryLanding";
import { washCureCategoryData } from "../../sub-components/ThreeMashCategoryLanding/presets";
import type { Props } from "./types";

export function ThreeMashWashCureListingPage(props: Props) {
  return <ThreeMashCategoryLanding {...props} data={washCureCategoryData} productList={props.productList} />;
}

export default ThreeMashWashCureListingPage;
