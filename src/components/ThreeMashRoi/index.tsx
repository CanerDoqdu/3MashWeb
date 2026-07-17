import { renderRoiHtml, ThreeMashStaticSection } from "../../sub-components/ThreeMashSectionRenderer";
import { Props } from "./types";

export function ThreeMashRoi(props: Props) {
  return <ThreeMashStaticSection props={props} fallback={renderRoiHtml(props)} />;
}

export default ThreeMashRoi;
