import ThreeMashCategoryLanding from "../../sub-components/ThreeMashCategoryLanding";
import { curingCategoryData } from "../../sub-components/ThreeMashCategoryLanding/presets";
import { isCurrentCategory } from "../../sub-components/ThreeMashCategoryLanding/categoryDetection";
import type { Props } from "./types";

export function ThreeMashCuringListingPage(props: Props) {
  if (!isCurrentCategory("curing", props.productList)) return null;
  return <ThreeMashCategoryLanding {...props} data={curingCategoryData()} productList={props.productList} />;
}

export default ThreeMashCuringListingPage;
