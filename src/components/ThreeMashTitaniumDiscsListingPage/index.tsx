import ThreeMashCategoryLanding from "../../sub-components/ThreeMashCategoryLanding";
import { titaniumDiscsCategoryData } from "../../sub-components/ThreeMashCategoryLanding/presets";
import { isCurrentCategory } from "../../sub-components/ThreeMashCategoryLanding/categoryDetection";
import type { Props } from "./types";

export function ThreeMashTitaniumDiscsListingPage(props: Props) {
  if (!isCurrentCategory("titanium", props.productList)) return null;
  return <ThreeMashCategoryLanding {...props} data={titaniumDiscsCategoryData} productList={props.productList} />;
}

export default ThreeMashTitaniumDiscsListingPage;

