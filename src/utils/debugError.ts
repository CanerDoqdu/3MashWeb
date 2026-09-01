/**
 * Debug logging utility - silent in production
 */
export function debugError(label: string, error: any) {
  if (typeof process !== "undefined" && process.env?.NODE_ENV === "development") {
    console.error(label, error);
  }
  // TODO: Log to error tracking service (Sentry, etc.)
}
