/**
 * Validates and sanitizes redirect URLs.
 *
 * Rules:
 * 1. Relative URLs starting with "/" are safe (same-origin)
 * 2. Absolute URLs must match current window.location.origin
 * 3. javascript: and data: schemes are forbidden
 * 4. If invalid, returns "/account/login" (safe fallback)
 */
export function safeRedirect(url?: string): string {
  if (!url) return "/account/login";

  const trimmed = url.trim();
  if (!trimmed) return "/account/login";

  if (trimmed.startsWith("/")) return trimmed;

  if (/^(javascript|data|vbscript|file):/i.test(trimmed)) {
    return "/account/login";
  }

  try {
    const parsed = new URL(trimmed, window.location.href);
    if (parsed.origin === window.location.origin) {
      return parsed.toString();
    }
  } catch {
    // Invalid URL; fall back to safe login route.
  }

  return "/account/login";
}
