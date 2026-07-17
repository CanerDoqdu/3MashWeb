import { renderEcosystemHtml, ThreeMashStaticSection } from "../../sub-components/ThreeMashSectionRenderer";
import { Props } from "./types";

export function ThreeMashEcosystem(props: Props) {
  return <ThreeMashStaticSection props={props} fallback={renderEcosystemHtml(props)} />;
}

export default ThreeMashEcosystem;
