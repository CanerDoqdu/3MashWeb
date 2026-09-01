/**
 * Debug error logging utility.
 *
 * IMPORTANT: This is a theme (vendor) component.
 * We DO NOT send errors to third-party services (Sentry, Rollbar, etc.)
 * to protect merchant data privacy.
 *
 * Instead:
 * 1. Dev environment: log to console for local debugging
 * 2. Production: merchant can optionally provide their own error tracker via window.__MERCHANT_ERROR_TRACKER__
 *
 * This way, merchant data stays under merchant's control.
 *
 * @example
 * // Merchant initializes their tracker before loading the theme:
 * window.__MERCHANT_ERROR_TRACKER__ = (label, error) => {
 *   fetch('/api/errors', { method: 'POST', body: JSON.stringify({ label, error }) });
 * };
 */

export function debugError(label: string, error: any) {
  // Development: log to console
  if (typeof process !== "undefined" && process.env?.NODE_ENV === "development") {
    console.error(label, error);
  }

  // Production: use merchant's tracker if provided
  // Note: (window as any) is necessary because ikas CLI's TypeScript doesn't
  // include our custom globals.d.ts declarations. This is safe because:
  // 1. We check typeof before calling
  // 2. The function is wrapped in try/catch
  // 3. Merchant-provided, not user-controlled
  if (typeof window !== "undefined") {
    const win = window as any;
    if (typeof win.__MERCHANT_ERROR_TRACKER__ === "function") {
      try {
        win.__MERCHANT_ERROR_TRACKER__(label, error);
      } catch {
        // Merchant's tracker failed — fail silently to avoid cascading errors
      }
    }
  }
}
