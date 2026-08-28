import ThreeMashAccountLayout from "../ThreeMashAccountLayout";
import { Props } from "./types";

export function ThreeMashAccountInfoPage(props: Props) {
  return <ThreeMashAccountLayout {...props} mode="account" />;
}

export default ThreeMashAccountInfoPage;
