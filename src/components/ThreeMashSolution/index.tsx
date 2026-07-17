import { renderSolutionHtml, ThreeMashStaticSection } from "../../sub-components/ThreeMashSectionRenderer";
import { Props } from "./types";

export function ThreeMashSolution(props: Props) {
  return <ThreeMashStaticSection props={props} fallback={renderSolutionHtml(props)} />;
}

export default ThreeMashSolution;
