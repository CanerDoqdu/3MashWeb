import ThreeMashCategoryLanding from "../../sub-components/ThreeMashCategoryLanding";
import { dentalResinsCategoryData } from "../../sub-components/ThreeMashCategoryLanding/presets";
import type { Props } from "./types";

export function ThreeMashDentalResinsListingPage(props: Props) {
  return <ThreeMashCategoryLanding data={dentalResinsCategoryData} productList={props.productList} />;
}

export default ThreeMashDentalResinsListingPage;
