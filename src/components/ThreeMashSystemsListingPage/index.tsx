import ThreeMashCategoryLanding from "../../sub-components/ThreeMashCategoryLanding";
import { systemsCategoryData } from "../../sub-components/ThreeMashCategoryLanding/presets";
import type { Props } from "./types";

export function ThreeMashSystemsListingPage(props: Props) {
  return <ThreeMashCategoryLanding data={systemsCategoryData} productList={props.productList} />;
}

export default ThreeMashSystemsListingPage;
