import {
  renderTrustHtml,
  ThreeMashStaticSection,
  trustThemeStyle,
} from "../../sub-components/ThreeMashSectionRenderer";
import { Props } from "./types";

export function ThreeMashTrust(props: Props) {
  return (
    <ThreeMashStaticSection
      props={props}
      fallback={renderTrustHtml(props)}
      styleOverrides={trustThemeStyle(props)}
    />
  );
}

export default ThreeMashTrust;
