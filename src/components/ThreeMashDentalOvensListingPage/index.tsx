import ThreeMashCategoryLanding from "../../sub-components/ThreeMashCategoryLanding";
import { dentalFurnacesCategoryData } from "../../sub-components/ThreeMashCategoryLanding/presets";
import type { Props } from "./types";

export function ThreeMashDentalOvensListingPage(props: Props) {
  return <ThreeMashCategoryLanding {...props} data={dentalFurnacesCategoryData} productList={props.productList} />;
}

export default ThreeMashDentalOvensListingPage;
