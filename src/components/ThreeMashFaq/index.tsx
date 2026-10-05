import {
  faqThemeStyle,
  renderFaqHtml,
  ThreeMashStaticSection,
} from "../../sub-components/ThreeMashSectionRenderer";
import { Props } from "./types";

export function ThreeMashFaq(props: Props) {
  return (
    <ThreeMashStaticSection
      props={props}
      fallback={renderFaqHtml(props)}
      styleOverrides={faqThemeStyle(props)}
    />
  );
}

export default ThreeMashFaq;
