import { renderCuringHtml, ThreeMashStaticSection } from "../../sub-components/ThreeMashSectionRenderer";
import { Props } from "./types";

export function ThreeMashCuring(props: Props) {
  const dynamicProps = { ...props, sectionHtml: undefined, contentHtml: undefined };
  return <ThreeMashStaticSection props={dynamicProps} fallback={renderCuringHtml(dynamicProps)} />;
}

export default ThreeMashCuring;
