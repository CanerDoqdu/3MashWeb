import ThreeMashPrintersSourceLanding from "../../sub-components/ThreeMashPrintersSourceLanding";
import { isCurrentCategory } from "../../sub-components/ThreeMashCategoryLanding/categoryDetection";
import type { Props } from "./types";

export function ThreeMash3dPrintersListingPage(props: Props) {
  if (!isCurrentCategory("printers", props.productList)) return null;
  return <ThreeMashPrintersSourceLanding {...props} />;
}

export default ThreeMash3dPrintersListingPage;

