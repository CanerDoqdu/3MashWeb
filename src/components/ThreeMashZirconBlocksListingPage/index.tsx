import ThreeMashCategoryLanding from "../../sub-components/ThreeMashCategoryLanding";
import { zirconBlocksCategoryData } from "../../sub-components/ThreeMashCategoryLanding/presets";
import type { Props } from "./types";

export function ThreeMashZirconBlocksListingPage(props: Props) {
  return <ThreeMashCategoryLanding data={zirconBlocksCategoryData} productList={props.productList} />;
}

export default ThreeMashZirconBlocksListingPage;
