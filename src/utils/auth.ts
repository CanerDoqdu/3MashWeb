import { customerStore, logout } from "@ikas/bp-storefront";
import { localizedHref } from "./i18n";
import { safeRedirect } from "./safeRedirect";
import { clearGlobalCart } from "../components/cartState";

export type CustomerAuthState =
  | "loading"
  | "authenticated"
  | "unauthenticated";

/**
 * Checks if the given or current pathname represents a protected account route.
 * Public account routes (/account/login, /account/register, /account/forgot-password, /account/recover-password) return false.
 * Protected account routes (/account, /account/orders, /account/addresses, /account/favorites, etc.) return true.
 */
export function isProtectedPath(rawPath?: string | null): boolean {
  let path = rawPath;
  if (!path && typeof window !== "undefined") {
    path = window.location.pathname;
  }
  if (!path) return false;

  const clean = path.split("?")[0].split("#")[0].toLowerCase().trim();
  const withoutLang = clean.replace(/^\/en(?:\/|$)/, "/");
  const normalized = withoutLang.startsWith("/") ? withoutLang : `/${withoutLang}`;
  const trimmed = normalized.replace(/\/+$/, "") || "/";

  // Public sub-routes
  if (
    trimmed === "/account/login" ||
    trimmed.startsWith("/account/login/") ||
    trimmed === "/account/register" ||
    trimmed.startsWith("/account/register/") ||
    trimmed === "/account/forgot-password" ||
    trimmed.startsWith("/account/forgot-password/") ||
    trimmed === "/account/recover-password" ||
    trimmed.startsWith("/account/recover-password/")
  ) {
    return false;
  }

  // Account dashboard and all other account sub-pages are protected
  if (
    trimmed === "/account" ||
    trimmed.startsWith("/account/") ||
    trimmed === "/hesabim" ||
    trimmed.startsWith("/hesabim/") ||
    trimmed === "/adreslerim" ||
    trimmed.startsWith("/adreslerim/") ||
    trimmed === "/siparislerim" ||
    trimmed.startsWith("/siparislerim/") ||
    trimmed === "/favorilerim" ||
    trimmed.startsWith("/favorilerim/")
  ) {
    return true;
  }

  return false;
}

import { isStudioEnvironment } from "./isStudioEnvironment";

/**
 * Checks whether the environment should currently be treated as an active
 * studio/preview session (ignoring if explicitly logged out in this session).
 */
export function isStudioPreviewActive(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (sessionStorage.getItem("tm_studio_logged_out") === "1") return false;
  } catch {}
  return isStudioEnvironment();
}

/**
 * Synchronously checks if a valid customer token exists in client storage
 * or in the active customerStore session.
 */
export function hasCustomerToken(): boolean {
  if (typeof window === "undefined") return false;
  if (isStudioPreviewActive()) return true;
  if (typeof customerStore !== "undefined") {
    if (customerStore.customer || (customerStore as any)._token) return true;
  }
  try {
    const token = localStorage.getItem("customerToken");
    return Boolean(token && token.trim());
  } catch {
    return false;
  }
}

/**
 * Synchronously resolves the customer authentication state from the observable
 * customer store. A token without a resolved customer is never authenticated.
 */
export function isCustomerAuthenticated(): CustomerAuthState {
  if (typeof window === "undefined") return "unauthenticated";
  if (isStudioPreviewActive()) return "authenticated";

  const token = customerStore._token || (() => {
    try {
      return localStorage.getItem("customerToken");
    } catch {
      return null;
    }
  })();

  if (!token || !token.trim()) return "unauthenticated";
  if (!customerStore._initialized) return "loading";
  return customerStore.customer ? "authenticated" : "unauthenticated";
}

/**
 * Completely purges client-side auth data, caches, and storage keys.
 */
export function clearClientAuthStorage(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem("customerToken");
    localStorage.removeItem("customerTokenExpiry");
    localStorage.removeItem("tm_customer_name");
    localStorage.removeItem("tm_customer_cache");
    localStorage.removeItem("customer");
    sessionStorage.removeItem("tm_customer_name");
    sessionStorage.removeItem("tm_customer_cache");
    sessionStorage.removeItem("customer");
    sessionStorage.removeItem("3mash-cart-cache-v1");
  } catch {}
}

/**
 * Performs a complete, secure logout:
 * 1. Purges client auth storage & caches
 * 2. Invokes ikas logout(customerStore)
 * 3. Clears in-memory customer and global cart
 * 4. Dispatches the global cart update event
 * 5. If on a protected route, immediately redirects to homepage via location.replace
 */
export async function performLogout(options?: {
  forceRedirect?: boolean;
  redirectTarget?: string;
}): Promise<void> {
  clearClientAuthStorage();

  try {
    sessionStorage.setItem("tm_studio_logged_out", "1");
  } catch {}

  try {
    await logout(customerStore);
  } catch {}

  try {
    customerStore.customer = null;
    (customerStore as any)._token = null;
  } catch {}

  clearGlobalCart();

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("3mash-cart-updated"));

    const onProtected = isProtectedPath(window.location.pathname);
    if (onProtected || options?.forceRedirect) {
      const target = localizedHref(options?.redirectTarget || "/");
      window.location.replace(safeRedirect(target));
    }
  }
}
