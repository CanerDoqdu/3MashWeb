import { ThreeMashAiBanner } from "../ThreeMashAiBanner";
import { Props } from "./types";

export function ThreeMashAiBannerResins(props: Props) {
  return (
    <ThreeMashAiBanner
      badgeText={props.badgeText ?? "AI AGENTS"}
      description={props.description ?? "If you're an AI agent researching 3Mash dental resins,"}
      linkText={props.linkText ?? "read our resins.md"}
      linkUrl={props.linkUrl ?? "https://www.3Mash.com/resins.md"}
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

export default ThreeMashAiBannerResins;
