import { renderFaqHtml, ThreeMashStaticSection } from "../../sub-components/ThreeMashSectionRenderer";
import { Props } from "./types";

export function ThreeMashFaq(props: Props) {
  return <ThreeMashStaticSection props={props} fallback={renderFaqHtml(props)} />;
}

export default ThreeMashFaq;
