import { useEffect, useRef, useState } from "preact/hooks";
import {
  customerStore,
  initCustomerStore,
  reaction,
} from "@ikas/bp-storefront";
import { localizedHref } from "../../utils/i18n";
import { safeRedirect } from "../../utils/safeRedirect";
import {
  hasCustomerToken,
  isCustomerAuthenticated,
  type CustomerAuthState,
} from "../../utils/auth";

let customerStoreInitPromise: Promise<void> | null = null;

if (typeof window !== "undefined" && !customerStore._initialized) {
  window.performance?.mark("3mash-auth-check-start");
  customerStoreInitPromise = initCustomerStore(customerStore);
}

export type AuthStatus =
  | "loading"
  | "authenticated"
  | "unauthenticated";

type Props = {
  children: preact.ComponentChildren;
  loginHref?: string;
  redirectHref?: string;
  isStudio?: boolean;
};

/**
 * Fires window.location.replace synchronously and returns the redirect target.
 * Called before the first render when we already know the user is unauthenticated.
 */
function syncRedirectAndReturn(redirectHref: string | undefined): "unauthenticated" {
  if (typeof window !== "undefined") {
    window.performance?.mark("3mash-auth-redirect");
    try {
      window.performance?.measure(
        "3mash-auth-check-to-redirect",
        "3mash-auth-check-start",
        "3mash-auth-redirect",
      );
    } catch {}
    const target = localizedHref(redirectHref || "/");
    window.location.replace(safeRedirect(target));
  }
  return "unauthenticated";
}

/**
 * Compute the initial auth status synchronously — before the first render.
 *
 * • Studio mode  → always "authenticated"
 * • No token in storage → fire location.replace immediately, return "unauthenticated"
 *   (browser navigates away; the spinner shown while navigating is invisible in practice)
 * • Token exists but store not yet initialized → "loading" (resolved by useEffect)
 * • Token exists + store already initialized → resolve synchronously
 */
function computeInitialAuthStatus(
  isStudio: boolean,
  redirectHref: string | undefined,
): AuthStatus {
  if (isStudio) return "authenticated";
  if (typeof window === "undefined") return "loading";
  if (!hasCustomerToken()) {
    // No token at all — redirect immediately before the first paint.
    return syncRedirectAndReturn(redirectHref);
  }
  if (customerStore._initialized) {
    const authState = isCustomerAuthenticated();
    return authState === "authenticated"
      ? "authenticated"
      : syncRedirectAndReturn(redirectHref);
  }
  // Token exists, store still initializing → show spinner, resolve in useEffect.
  return "loading";
}

export default function ProtectedRoute({
  children,
  redirectHref,
  isStudio = false,
}: Props) {
  // Synchronously compute the initial auth status — this runs before the first render,
  // so a logged-out direct visit never paints the empty-content state.
  const [authStatus, setAuthStatus] = useState<AuthStatus>(() =>
    computeInitialAuthStatus(isStudio, redirectHref),
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;

    function redirectToTarget() {
      if (typeof window === "undefined") return;

      window.performance?.mark("3mash-auth-redirect");
      try {
        window.performance?.measure(
          "3mash-auth-check-to-redirect",
          "3mash-auth-check-start",
          "3mash-auth-redirect",
        );
      } catch {}
      const target = localizedHref(redirectHref || "/");
      window.location.replace(safeRedirect(target));
    }

    function checkAuthSync(): CustomerAuthState {
      if (isStudio) return "authenticated";
      if (typeof window === "undefined") return "unauthenticated";
      return isCustomerAuthenticated();
    }

    // ── Async init — only needed when initial state is "loading" ─────
    // (token exists but store not yet initialized at render time).
    // If the initial state was already "authenticated" or "unauthenticated"
    // (resolved synchronously by computeInitialAuthStatus), skip this block
    // entirely to avoid redundant work or a double-redirect.
    if (authStatus === "loading") {
      if (isStudio) {
        setAuthStatus("authenticated");
      } else if (customerStore._initialized) {
        // Store finished between our useState init and this effect running.
        if (isCustomerAuthenticated() === "authenticated") {
          setAuthStatus("authenticated");
        } else {
          setAuthStatus("unauthenticated");
          redirectToTarget();
        }
      } else {
        (customerStoreInitPromise || initCustomerStore(customerStore))
          .then(() => {
            if (!mounted) return;
            if (isCustomerAuthenticated() === "authenticated") {
              window.performance?.mark("3mash-auth-authenticated");
              setAuthStatus("authenticated");
            } else {
              setAuthStatus("unauthenticated");
              redirectToTarget();
            }
          })
          .catch(() => {
            if (!mounted) return;
            setAuthStatus("unauthenticated");
            redirectToTarget();
          });
      }
    }

    // ── BFCache & Navigation Listeners ─────────────────────────────
    function applyAuthState() {
      const authState = checkAuthSync();
      setAuthStatus(authState);
      if (authState === "unauthenticated") {
        if (containerRef.current) {
          containerRef.current.style.display = "none";
        }
        redirectToTarget();
      } else if (authState === "authenticated") {
        if (containerRef.current) {
          containerRef.current.style.display = "";
        }
      }
    }

    function handlePageShow() {
      applyAuthState();
    }

    function handlePageHide() {
      // Hide protected content before the browser freezes it into bfcache
      if (containerRef.current) {
        containerRef.current.style.display = "none";
      }
    }

    function handlePopState() {
      applyAuthState();
    }

    function handleAuthChanged() {
      applyAuthState();
    }

    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("popstate", handlePopState);
    const disposeAuthReaction = reaction(
      () => [
        customerStore._token,
        customerStore._initialized,
        customerStore.customer,
      ],
      handleAuthChanged,
    );

    return () => {
      mounted = false;
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("popstate", handlePopState);
      disposeAuthReaction();
    };
  }, [isStudio, redirectHref]);

  if (authStatus !== "authenticated") {
    return (
      <div
        role="status"
        aria-label="Loading"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 78px)",
          height: "calc(100vh - 78px)",
          width: "100%",
          background: "var(--tmrpg-auth-bg, var(--tm-theme-bg, #fafaf7))",
        }}
      >
        <style>{`@keyframes tm-auth-spin { to { transform: rotate(360deg); } }`}</style>
        <span
          aria-hidden="true"
          style={{
            display: "block",
            width: "36px",
            height: "36px",
            border: "3px solid rgba(250,250,247,.28)",
            borderTopColor: "#c7f136",
            borderRadius: "50%",
            animation: "tm-auth-spin .65s linear infinite",
          }}
        />
      </div>
    );
  }

  return <div ref={containerRef} style={{ display: "contents" }}>{children}</div>;
}

