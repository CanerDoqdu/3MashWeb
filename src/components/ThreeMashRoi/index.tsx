import { renderRoiHtml, ThreeMashStaticSection } from "../../sub-components/ThreeMashSectionRenderer";
import { Props } from "./types";

export function ThreeMashRoi(props: Props) {
  return (
    <ThreeMashStaticSection
      props={props}
      fallback={renderRoiHtml(props)}
      styleOverrides={{ "--tmr-background-glow-factor": props.showBackgroundGlow !== false ? 1 : 0 }}
    />
  );
}

export default ThreeMashRoi;
