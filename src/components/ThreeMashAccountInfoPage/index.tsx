import { ThreeMashAccountUtilityPage } from "../ThreeMashAccountUtilityPage";
import { Props } from "./types";

export function ThreeMashAccountInfoPage(props: Props) {
  return <ThreeMashAccountUtilityPage {...props} mode="account" />;
}

export default ThreeMashAccountInfoPage;
