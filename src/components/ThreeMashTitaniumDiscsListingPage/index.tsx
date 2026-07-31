import ThreeMashCategoryLanding from "../../sub-components/ThreeMashCategoryLanding";
import { titaniumDiscsCategoryData } from "../../sub-components/ThreeMashCategoryLanding/presets";
import type { Props } from "./types";

export function ThreeMashTitaniumDiscsListingPage(props: Props) {
  return <ThreeMashCategoryLanding data={titaniumDiscsCategoryData} productList={props.productList} />;
}

export default ThreeMashTitaniumDiscsListingPage;
