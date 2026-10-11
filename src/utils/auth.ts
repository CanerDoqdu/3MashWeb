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

let customerStoreInitPromise: Promise<void> | null = null;

export function initializeCustomerStore(): Promise<void> {
  if (customerStore._initialized) return Promise.resolve();
  if (!customerStoreInitPromise) {
    customerStoreInitPromise = initCustomerStore(customerStore).finally(() => {
      customerStoreInitPromise = null;
    });
  }
  return customerStoreInitPromise;
}

/**
 * Resolve the canonical auth state from the actual store lifecycle instead of mixing
 * token presence, hydration timing, and cached browser state into separate decisions.
 */
export function isCustomerAuthenticated(): CustomerAuthState {
  if (typeof window === "undefined") return "unauthenticated";

  if (isStudioPreviewActive()) {
    return "authenticated";
  }

  const hasToken = hasCustomerToken();
  if (!hasToken) {
    if (customerStore.customer) {
      try {
        customerStore.customer = null;
        (customerStore as any)._token = null;
      } catch {}
    }
    return "unauthenticated";
  }

  if (!customerStore._initialized) return "loading";
  return customerStore.customer ? "authenticated" : "unauthenticated";
}

let logoutInProgress = false;

export function redirectToLogin(redirectHref = "/account/login"): void {
  if (typeof window === "undefined" || logoutInProgress) return;
  const target = localizedHref(redirectHref);
  window.location.replace(safeRedirect(target));
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
  logoutInProgress = true;
  try {
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
    }
  } finally {
    logoutInProgress = false;
  }

  if (typeof window !== "undefined" && isProtectedPath(window.location.pathname)) {
    redirectToLogin();
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
  logoutInProgress = true;
  try {
    // 1. Purge client storage immediately
    clearClientAuthStorage();

    // 2. Set multi-tab logout timestamp for StorageEvent fallback
    try {
      localStorage.setItem(LOGOUT_TIMESTAMP_KEY, Date.now().toString());
    } catch {}

    try {
      sessionStorage.setItem("tm_studio_logged_out", "1");
    } catch {}

    // 3. Broadcast logout to other tabs immediately
    try {
      if (typeof window !== "undefined" && typeof BroadcastChannel !== "undefined") {
        const channel = new BroadcastChannel(AUTH_BROADCAST_CHANNEL);
        channel.postMessage({ type: "LOGOUT", timestamp: Date.now() });
        channel.close();
      }
    } catch {}

    // 4. Invalidate the ikas store
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
    }
  } finally {
    logoutInProgress = false;
  }

  if (typeof window !== "undefined") {
    const onProtected = isProtectedPath(window.location.pathname);
    if (onProtected || options?.forceRedirect) {
      redirectToLogin(options?.redirectTarget || "/account/login");
    }
  }
}

/**
 * Subscribe to auth state changes via MobX reaction and window events.
 * Automatically initializes the customer store when a token exists but the store
 * hasn't been initialized yet. Returns an unsubscribe function.
 */
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
    initializeCustomerStore()
      .then(handleUpdate)
      .catch((error) => {
        console.error("Failed to initialize customer authentication state.", error);
        handleUpdate();
      });
  }

  handleUpdate();

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
