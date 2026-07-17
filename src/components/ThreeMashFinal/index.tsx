import { renderFinalHtml, ThreeMashStaticSection } from "../../sub-components/ThreeMashSectionRenderer";
import { Props } from "./types";

export function ThreeMashFinal(props: Props) {
  return <ThreeMashStaticSection props={props} fallback={renderFinalHtml(props)} />;
}

export default ThreeMashFinal;
