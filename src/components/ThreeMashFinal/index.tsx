import {
  finalThemeStyle,
  renderFinalHtml,
  ThreeMashStaticSection,
} from "../../sub-components/ThreeMashSectionRenderer";
import { Props } from "./types";

export function ThreeMashFinal(props: Props) {
  return (
    <ThreeMashStaticSection
      props={props}
      fallback={renderFinalHtml(props)}
      styleOverrides={finalThemeStyle(props)}
    />
  );
}

export default ThreeMashFinal;
