import { customerStore, initCustomerStore, logout, reaction } from "@ikas/bp-storefront";
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
  // Strip any 2-letter language prefix (e.g. /tr, /en, /tr/, /en/)
  const withoutLang = clean.replace(/^\/[a-z]{2}(?:\/|$)/, "/");
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

const AUTH_BROADCAST_CHANNEL = "3mash_auth_sync";
const LOGOUT_TIMESTAMP_KEY = "tm_logout_timestamp";

/**
 * Checks whether the environment is currently running inside the ikas studio customizer iframe.
 */
export function isStudioPreviewActive(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (sessionStorage.getItem("tm_studio_logged_out") === "1") return false;
  } catch {}
  return isStudioEnvironment();
}

/**
 * Synchronously checks if a valid customer token exists in client storage.
 */
export function hasCustomerToken(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const token = localStorage.getItem("customerToken");
    return Boolean(token && token.trim());
  } catch {
    return false;
  }
}

/**
 * Synchronously resolves the customer authentication state.
 * A session without a stored customerToken is NEVER authenticated.
 */
export function isCustomerAuthenticated(): CustomerAuthState {
  if (typeof window === "undefined") return "unauthenticated";

  // If there is no token in storage, the user is unauthenticated
  const hasToken = hasCustomerToken();
  if (!hasToken) {
    // Clean up any residual in-memory state
    if (customerStore.customer) {
      try {
        customerStore.customer = null;
        (customerStore as any)._token = null;
      } catch {}
    }
    return "unauthenticated";
  }

  // Token exists: check if customer model is already resolved
  if (customerStore.customer) return "authenticated";

  // Token exists, but store hasn't initialized customer model yet
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
 * Handler for multi-tab logout events.
 * Wipes in-memory session, clears cart, dispatches events, and redirects if on a protected route.
 */
function handleCrossTabLogout(): void {
  clearClientAuthStorage();

  try {
    customerStore.customer = null;
    (customerStore as any)._token = null;
    customerStore._favoriteProducts = [];
    customerStore._isFavoriteProductsLoaded = false;
  } catch {}

  clearGlobalCart();

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("3mash-cart-updated"));
    window.dispatchEvent(new CustomEvent("3mash-auth-updated"));

    if (isProtectedPath(window.location.pathname)) {
      const target = localizedHref("/account/login");
      window.location.replace(safeRedirect(target));
    }
  }
}

// ── Setup multi-tab communication ──────────────────────────────────
if (typeof window !== "undefined") {
  if (typeof BroadcastChannel !== "undefined") {
    try {
      const authChannel = new BroadcastChannel(AUTH_BROADCAST_CHANNEL);
      authChannel.onmessage = (event) => {
        if (event.data?.type === "LOGOUT") {
          handleCrossTabLogout();
        }
      };
    } catch {}
  }

  window.addEventListener("storage", (e: StorageEvent) => {
    if (e.key === "customerToken" && (!e.newValue || !e.newValue.trim())) {
      handleCrossTabLogout();
    } else if (e.key === LOGOUT_TIMESTAMP_KEY && e.newValue) {
      handleCrossTabLogout();
    }
  });
}

/**
 * Performs a complete, secure logout across all storage, memory, and open tabs:
 * 1. Purges client auth storage & caches
 * 2. Broadcasts logout to all other open tabs
 * 3. Invokes ikas logout(customerStore)
 * 4. Clears in-memory customer and global cart
 * 5. Dispatches global events
 * 6. Immediately redirects to redirectTarget (default /account/login) if on protected route or forceRedirect
 */
export async function performLogout(options?: {
  forceRedirect?: boolean;
  redirectTarget?: string;
}): Promise<void> {
  // 1. Purge client storage immediately
  clearClientAuthStorage();

  // 2. Set multi-tab logout timestamp for StorageEvent fallback
  try {
    localStorage.setItem(LOGOUT_TIMESTAMP_KEY, Date.now().toString());
  } catch {}

  try {
    sessionStorage.setItem("tm_studio_logged_out", "1");
  } catch {}

  // 3. Broadcast to other tabs immediately
  try {
    if (typeof window !== "undefined" && typeof BroadcastChannel !== "undefined") {
      const channel = new BroadcastChannel(AUTH_BROADCAST_CHANNEL);
      channel.postMessage({ type: "LOGOUT", timestamp: Date.now() });
      channel.close();
    }
  } catch {}

  // 4. Invalidate ikas store
  try {
    await logout(customerStore);
  } catch {}

  // 5. Invalidate in-memory store references
  try {
    customerStore.customer = null;
    (customerStore as any)._token = null;
    customerStore._favoriteProducts = [];
    customerStore._isFavoriteProductsLoaded = false;
  } catch {}

  clearGlobalCart();

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("3mash-cart-updated"));
    window.dispatchEvent(new CustomEvent("3mash-auth-updated"));

    const onProtected = isProtectedPath(window.location.pathname);
    if (onProtected || options?.forceRedirect) {
      const target = localizedHref(options?.redirectTarget || "/account/login");
      window.location.replace(safeRedirect(target));
    }
  }
}

/**
 * Subscribe to auth state changes via MobX reaction and window events.
 * Automatically triggers initCustomerStore when a token exists but the store
 * hasn't been initialized yet. Returns an unsubscribe function.
 */
let _sharedAuthInitPromise: Promise<void> | null = null;

export function subscribeAuthState(
  callback: (state: CustomerAuthState) => void,
): () => void {
  const handleUpdate = () => {
    callback(isCustomerAuthenticated());
  };

  // Kick off store init if token exists but store isn't ready yet.
  if (
    typeof window !== "undefined" &&
    !customerStore._initialized &&
    hasCustomerToken()
  ) {
    if (!_sharedAuthInitPromise) {
      _sharedAuthInitPromise = initCustomerStore(customerStore)
        .catch(() => {})
        .finally(() => {
          _sharedAuthInitPromise = null;
        });
    }
    _sharedAuthInitPromise.then(handleUpdate);
  }

  const dispose = reaction(
    () => [
      customerStore._token,
      customerStore._initialized,
      customerStore.customer,
    ],
    handleUpdate,
  );

  const handleStorage = (e: StorageEvent) => {
    if (e.key === "customerToken" || e.key === LOGOUT_TIMESTAMP_KEY || e.key === null) {
      handleUpdate();
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("pageshow", handleUpdate);
    window.addEventListener("popstate", handleUpdate);
    window.addEventListener("storage", handleStorage);
    window.addEventListener("3mash-auth-updated", handleUpdate);
  }

  return () => {
    dispose();
    if (typeof window !== "undefined") {
      window.removeEventListener("pageshow", handleUpdate);
      window.removeEventListener("popstate", handleUpdate);
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("3mash-auth-updated", handleUpdate);
    }
  };
}

