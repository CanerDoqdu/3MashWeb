import { renderSolutionHtml, solutionThemeStyle, ThreeMashStaticSection } from "../../sub-components/ThreeMashSectionRenderer";
import type { Props } from "./types";

export function ThreeMashSolution(props: Props) {
  return (
    <ThreeMashStaticSection
      props={props}
      fallback={renderSolutionHtml(props)}
      styleOverrides={solutionThemeStyle(props)}
    />
  );
}

export default ThreeMashSolution;
