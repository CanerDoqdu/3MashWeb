import ThreeMashCategoryLanding from "../../sub-components/ThreeMashCategoryLanding";
import { zirconBlocksCategoryData } from "../../sub-components/ThreeMashCategoryLanding/presets";
import { isCurrentCategory } from "../../sub-components/ThreeMashCategoryLanding/categoryDetection";
import type { Props } from "./types";

export function ThreeMashZirconBlocksListingPage(props: Props) {
  if (!isCurrentCategory("zircon", props.productList)) return null;
  return <ThreeMashCategoryLanding {...props} data={zirconBlocksCategoryData()} productList={props.productList} />;
}

export default ThreeMashZirconBlocksListingPage;

