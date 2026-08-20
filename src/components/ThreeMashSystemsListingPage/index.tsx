import ThreeMashCategoryLanding from "../../sub-components/ThreeMashCategoryLanding";
import { systemsCategoryData } from "../../sub-components/ThreeMashCategoryLanding/presets";
import { isCurrentCategory } from "../../sub-components/ThreeMashCategoryLanding/categoryDetection";
import type { Props } from "./types";

export function ThreeMashSystemsListingPage(props: Props) {
  if (!isCurrentCategory("systems", props.productList)) return null;
  return <ThreeMashCategoryLanding {...props} data={systemsCategoryData} productList={props.productList} />;
}

export default ThreeMashSystemsListingPage;

