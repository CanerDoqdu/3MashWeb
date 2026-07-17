import { renderTrustHtml, ThreeMashStaticSection } from "../../sub-components/ThreeMashSectionRenderer";
import { Props } from "./types";

export function ThreeMashTrust(props: Props) {
  return <ThreeMashStaticSection props={props} fallback={renderTrustHtml(props)} />;
}

export default ThreeMashTrust;
