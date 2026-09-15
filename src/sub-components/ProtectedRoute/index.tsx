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
    if (authState === "authenticated") {
      return "authenticated";
    }
    // If a valid customer token exists, give initCustomerStore a chance in useEffect
    if (hasCustomerToken()) {
      return "loading";
    }
    return syncRedirectAndReturn(redirectHref);
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
      const target = localizedHref(redirectHref || "/account/login");
      window.location.replace(safeRedirect(target));
    }

    function checkAuthSync(): CustomerAuthState {
      if (isStudio) return "authenticated";
      if (typeof window === "undefined") return "unauthenticated";
      return isCustomerAuthenticated();
    }

    // ── Async init — only needed when initial state is "loading" ─────
    // (token exists but store not yet initialized at render time).
    if (authStatus === "loading") {
      if (isStudio) {
        setAuthStatus("authenticated");
      } else if (customerStore._initialized && isCustomerAuthenticated() === "authenticated") {
        setAuthStatus("authenticated");
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

    // ── BFCache, Storage & Navigation Listeners ────────────────────
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

    function handlePageShow(event?: PageTransitionEvent) {
      // Immediate BFCache check: if back button restored page but token is absent, redirect immediately
      if (!isStudio && (!hasCustomerToken() || isCustomerAuthenticated() === "unauthenticated")) {
        if (containerRef.current) {
          containerRef.current.style.display = "none";
        }
        redirectToTarget();
        return;
      }
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

    function handleStorage(e: StorageEvent) {
      if (e.key === "customerToken" || e.key === "tm_logout_timestamp" || e.key === null) {
        applyAuthState();
      }
    }

    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("storage", handleStorage);
    window.addEventListener("3mash-auth-updated", handleAuthChanged);

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
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("3mash-auth-updated", handleAuthChanged);
      disposeAuthReaction();
    };
  }, [isStudio, redirectHref]);

  if (authStatus !== "authenticated") {
    return (
      <div
        className="tm-auth-loading-shell"
        role="status"
        aria-label="Loading"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(220px, .42fr) minmax(0, 1fr)",
          gap: "24px",
          alignItems: "stretch",
          width: "min(100%, 1180px)",
          minHeight: "560px",
          margin: "0 auto",
          padding: "clamp(40px, 5vw, 64px) 24px clamp(64px, 8vw, 110px)",
          background: "var(--tmrpg-auth-bg, var(--tm-theme-bg, #fafaf7))",
        }}
      >
        <style>{`
          @keyframes tm-auth-pulse { 50% { opacity: .52; } }
          .tm-auth-loading-block { animation: tm-auth-pulse 1.2s ease-in-out infinite; }
          @media (max-width: 760px) {
            .tm-auth-loading-shell { grid-template-columns: 1fr !important; }
            .tm-auth-loading-sidebar { min-height: 190px !important; }
          }
        `}</style>
        <div
          className="tm-auth-loading-sidebar"
          style={{
            minHeight: "100%",
            padding: "clamp(34px, 4vw, 48px)",
            background: "var(--tm-theme-dark, #0e0e0c)",
          }}
        >
          <span className="tm-auth-loading-block" style={{ display: "block", width: "92px", height: "20px", background: "rgba(250,250,247,.16)" }} />
          <span className="tm-auth-loading-block" style={{ display: "block", width: "68%", height: "34px", marginTop: "42px", background: "rgba(250,250,247,.16)" }} />
          <span className="tm-auth-loading-block" style={{ display: "block", width: "82%", height: "14px", marginTop: "28px", background: "rgba(250,250,247,.12)" }} />
        </div>
        <div
          className="tm-auth-loading-block"
          style={{
            minHeight: "100%",
            padding: "clamp(34px, 4vw, 48px)",
            background: "#fff",
            border: "1px solid var(--tm-theme-line, #e6e6e0)",
          }}
        >
          <span style={{ display: "block", width: "100%", height: "58px", background: "var(--tm-theme-panel, #f1f1ec)" }} />
          <span style={{ display: "block", width: "42%", height: "26px", marginTop: "34px", background: "var(--tm-theme-panel, #f1f1ec)" }} />
          <span style={{ display: "block", width: "100%", height: "52px", marginTop: "28px", background: "var(--tm-theme-panel, #f1f1ec)" }} />
          <span style={{ display: "block", width: "100%", height: "52px", marginTop: "18px", background: "var(--tm-theme-panel, #f1f1ec)" }} />
          <span style={{ display: "block", width: "100%", height: "52px", marginTop: "18px", background: "var(--tm-theme-panel, #f1f1ec)" }} />
        </div>
      </div>
    );
  }

  return <div ref={containerRef} style={{ display: "contents" }}>{children}</div>;
}

