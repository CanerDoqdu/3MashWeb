import { renderSolutionHtml, ThreeMashStaticSection } from "../../sub-components/ThreeMashSectionRenderer";
import { Props } from "./types";

export function ThreeMashSolution(props: Props) {
  const dynamicProps = { ...props, sectionHtml: undefined, contentHtml: undefined };
  return <ThreeMashStaticSection props={dynamicProps} fallback={renderSolutionHtml(dynamicProps)} />;
}

export default ThreeMashSolution;
