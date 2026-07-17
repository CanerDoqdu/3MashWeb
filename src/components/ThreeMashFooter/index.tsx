import { renderFooterHtml, ThreeMashStaticSection } from "../../sub-components/ThreeMashSectionRenderer";
import { Props } from "./types";

export function ThreeMashFooter(props: Props) {
  return <ThreeMashStaticSection props={props} fallback={renderFooterHtml(props)} />;
}

export default ThreeMashFooter;
