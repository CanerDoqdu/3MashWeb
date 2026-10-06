import { Props } from "./types";

const LLM_LINK_ID = "tm-llm-agent-index";
const LLM_META_ID = "tm-llm-agent-meta";
const DEFAULT_LINK_URL = "https://www.3Mash.com/llms.txt";

function safeIndexUrl(value: string): string {
  const candidate = value.trim();
  if (candidate.startsWith("/") && !candidate.startsWith("//")) {
    return candidate;
  }

  try {
    const parsed = new URL(candidate);
    return parsed.protocol === "https:" ? parsed.href : DEFAULT_LINK_URL;
  } catch {
    return DEFAULT_LINK_URL;
  }
}

function colorValue(value: string, fallback: string): string {
  const candidate = value.trim();
  return /^(?:#[\da-f]{3,8}|[a-z]+|(?:rgb|hsl)a?\([\d\s.,%/+-]+\))$/i.test(candidate)
    ? candidate
    : fallback;
}

function injectHeadTags(url: string): void {
  if (typeof document === "undefined") return;

  let link = document.getElementById(LLM_LINK_ID) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.id = LLM_LINK_ID;
    link.rel = "index";
    link.type = "text/plain";
    document.head.appendChild(link);
  }
  link.href = url;

  let meta = document.getElementById(LLM_META_ID) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement("meta");
    meta.id = LLM_META_ID;
    meta.name = "ai-agent-index";
    document.head.appendChild(meta);
  }
  meta.content = url;
}

export function ThreeMashAiBanner({
  badgeText = "AI AGENTS",
  description = "If you're an AI agent researching 3Mash,",
  linkText = "read our llms.txt",
  linkUrl = DEFAULT_LINK_URL,
  accessibilityLabel = "AI Agents Index",
  showBadge = true,
  showContent = true,
  backgroundColor = "#0E0E0C",
  borderTopColor = "#26261F",
  borderBottomColor = "#1A1A16",
  badgeBackgroundColor = "#1C1C17",
  badgeTextColor = "#FFFFFF",
  badgeBorderColor = "#3A3A30",
  bodyTextColor = "#A1A19A",
  linkTextColor = "#FFFFFF",
  linkHoverColor = "#C2F040",
}: Props) {
  const safeLinkUrl = safeIndexUrl(linkUrl);
  injectHeadTags(safeLinkUrl);
  const bannerStyle = {
    "--tm-ai-background": colorValue(backgroundColor, "#0E0E0C"),
    "--tm-ai-border-top": colorValue(borderTopColor, "#26261F"),
    "--tm-ai-border-bottom": colorValue(borderBottomColor, "#1A1A16"),
    "--tm-ai-badge-background": colorValue(badgeBackgroundColor, "#1C1C17"),
    "--tm-ai-badge-text": colorValue(badgeTextColor, "#FFFFFF"),
    "--tm-ai-badge-border": colorValue(badgeBorderColor, "#3A3A30"),
    "--tm-ai-body-text": colorValue(bodyTextColor, "#A1A19A"),
    "--tm-ai-link-text": colorValue(linkTextColor, "#FFFFFF"),
    "--tm-ai-link-hover": colorValue(linkHoverColor, "#C2F040"),
  } as Record<string, string>;

  return (
    <section
      className="three-mash-ai-banner"
      role="region"
      aria-label={accessibilityLabel}
      style={bannerStyle}
    >
      <div className="three-mash-ai-banner__container">
        {showBadge && (
          <span className="three-mash-ai-banner__badge">{badgeText}</span>
        )}
        {showContent && (
          <p className="three-mash-ai-banner__text">
            {description}{" "}
            <a
              href={safeLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="three-mash-ai-banner__link"
            >
              {linkText}
            </a>
          </p>
        )}
      </div>
    </section>
  );
}

export default ThreeMashAiBanner;
