import { renderFooterHtml, ThreeMashStaticSection } from "../../sub-components/ThreeMashSectionRenderer";
import { Props } from "./types";

export function ThreeMashFooter(props: Props) {
  const liveFooterProps = { ...props, sectionHtml: "" };
  return <ThreeMashStaticSection props={{ ...liveFooterProps, sectionHtml: renderFooterHtml(liveFooterProps) }} />;
}

export default ThreeMashFooter;
