/**
 * Validates and sanitizes redirect URLs.
 *
 * Rules:
 * 1. Relative URLs starting with "/" are safe (same-origin)
 * 2. Absolute URLs must match current window.location.origin
 * 3. javascript: and data: schemes are forbidden
 * 4. If invalid, returns "/account/login" (safe fallback)
 */
function isBlockedScheme(value: string): boolean {
  return /^(?:javascript|data|vbscript|file):/i.test(value);
}

function normalizeSameOriginPath(value: string): string {
  if (!value || value === "#") return "";
  if (value.startsWith("//")) return "";

  if (value.startsWith("/")) {
    const normalized = value.replace(/^\/+/g, "/");
    return normalized.startsWith("//") ? "" : normalized;
  }

  return value;
}

export function safeRedirect(url?: string): string {
  if (!url) return "/account/login";

  const trimmed = url.trim();
  if (!trimmed) return "/account/login";
  if (trimmed.startsWith("//") || isBlockedScheme(trimmed)) {
    return "/account/login";
  }

  const relative = normalizeSameOriginPath(trimmed);
  if (relative) {
    if (relative.startsWith("/")) return relative;
    return relative;
  }

  if (typeof window === "undefined") {
    return "/account/login";
  }

  try {
    const parsed = new URL(trimmed, window.location.href);
    if (parsed.origin !== window.location.origin) {
      return "/account/login";
    }
    return `${parsed.pathname}${parsed.search}${parsed.hash}` || "/account/login";
  } catch {
    return "/account/login";
  }
}

export function safeNavigationHref(url?: string, fallback = "/"): string {
  const trimmed = (url ?? "").trim();
  if (!trimmed || trimmed === "#") return fallback;

  if (trimmed.startsWith("#")) return trimmed;
  if (trimmed.startsWith("//") || isBlockedScheme(trimmed)) return fallback;

  if (trimmed.startsWith("/")) {
    const normalized = normalizeSameOriginPath(trimmed);
    return normalized || fallback;
  }

  if (typeof window === "undefined") return fallback;

  try {
    const parsed = new URL(trimmed, window.location.href);
    if (parsed.origin !== window.location.origin) return fallback;
    const normalized = `${parsed.pathname}${parsed.search}${parsed.hash}`;
    return normalized || fallback;
  } catch {
    return fallback;
  }
}

export function safeMailAddress(value?: string, fallback = ""): string {
  const candidate = (value ?? "").trim().replace(/[\r\n\t\u0000]+/g, "");
  if (!candidate) return fallback;

  if (candidate.includes("<") || candidate.includes(">") || candidate.includes("\"") || candidate.includes("'") || candidate.includes("\\")) {
    return fallback;
  }

  if (!/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(candidate)) {
    return fallback;
  }

  return candidate;
}

export function safeMailtoHref(recipient: string, subject: string, body: string): string {
  const safeRecipient = safeMailAddress(recipient, "");
  if (!safeRecipient) return "#";

  return `mailto:${safeRecipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
