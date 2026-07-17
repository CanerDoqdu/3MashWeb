import { renderCuringHtml, ThreeMashStaticSection } from "../../sub-components/ThreeMashSectionRenderer";
import { Props } from "./types";

export function ThreeMashCuring(props: Props) {
  return <ThreeMashStaticSection props={props} fallback={renderCuringHtml(props)} />;
}

export default ThreeMashCuring;
