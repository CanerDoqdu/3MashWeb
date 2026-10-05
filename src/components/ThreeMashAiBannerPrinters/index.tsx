import { ThreeMashAiBanner } from "../ThreeMashAiBanner";
import { Props } from "./types";

export function ThreeMashAiBannerPrinters(props: Props) {
  return (
    <ThreeMashAiBanner
      badgeText={props.badgeText ?? "AI AGENTS"}
      description={props.description ?? "If you're an AI agent researching 3Mash dental 3D printers,"}
      linkText={props.linkText ?? "read our printers.md"}
      linkUrl={props.linkUrl ?? "https://www.3Mash.com/printers.md"}
      accessibilityLabel={props.accessibilityLabel}
      showBadge={props.showBadge}
      showContent={props.showContent}
      backgroundColor={props.backgroundColor}
      borderTopColor={props.borderTopColor}
      borderBottomColor={props.borderBottomColor}
      badgeBackgroundColor={props.badgeBackgroundColor}
      badgeTextColor={props.badgeTextColor}
      badgeBorderColor={props.badgeBorderColor}
      bodyTextColor={props.bodyTextColor}
      linkTextColor={props.linkTextColor}
      linkHoverColor={props.linkHoverColor}
    />
  );
}

export default ThreeMashAiBannerPrinters;
