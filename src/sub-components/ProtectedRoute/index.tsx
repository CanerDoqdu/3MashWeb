import { useEffect, useRef, useState } from "preact/hooks";
import {
  customerStore,
  reaction,
} from "@ikas/bp-storefront";
import {
  hasCustomerToken,
  initializeCustomerStore,
  isCustomerAuthenticated,
  redirectToLogin,
} from "../../utils/auth";

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

function computeInitialAuthStatus(
  isStudio: boolean,
): AuthStatus {
  if (isStudio) return "authenticated";
  if (typeof window === "undefined") return "loading";
  return isCustomerAuthenticated();
}

export default function ProtectedRoute({
  children,
  redirectHref,
  isStudio = false,
}: Props) {
  const [authStatus, setAuthStatus] = useState<AuthStatus>(() =>
    computeInitialAuthStatus(isStudio),
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    let redirectStarted = false;
    let initPending = false;

    function redirectOnce() {
      if (redirectStarted) return;
      redirectStarted = true;
      redirectToLogin(redirectHref || "/account/login");
    }

    function applyAuthState() {
      const state = isStudio ? "authenticated" : isCustomerAuthenticated();
      setAuthStatus(state);

      if (state === "unauthenticated") {
        if (containerRef.current) containerRef.current.style.display = "none";
        redirectOnce();
      } else if (state === "authenticated") {
        if (containerRef.current) containerRef.current.style.display = "";
      } else if (hasCustomerToken() && !initPending) {
        initPending = true;
        initializeCustomerStore()
          .then(() => {
            if (!mounted) return;
            initPending = false;
            if (isCustomerAuthenticated() === "authenticated") {
              window.performance?.mark("3mash-auth-authenticated");
            }
            applyAuthState();
          })
          .catch((error) => {
            if (!mounted) return;
            initPending = false;
            console.error("Failed to initialize customer authentication state.", error);
            setAuthStatus("unauthenticated");
            redirectOnce();
          });
      }
    }

    function handlePageHide() {
      if (containerRef.current) {
        containerRef.current.style.display = "none";
      }
    }

    function handleStorage(e: StorageEvent) {
      if (e.key === "customerToken" || e.key === "tm_logout_timestamp" || e.key === null) {
        applyAuthState();
      }
    }

    if (!isStudio && isCustomerAuthenticated() === "loading" && hasCustomerToken()) {
      window.performance?.mark("3mash-auth-check-start");
    }
    applyAuthState();

    window.addEventListener("pageshow", applyAuthState);
    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("popstate", applyAuthState);
    window.addEventListener("storage", handleStorage);
    window.addEventListener("3mash-auth-updated", applyAuthState);

    const disposeAuthReaction = reaction(
      () => [
        customerStore._token,
        customerStore._initialized,
        customerStore.customer,
      ],
      applyAuthState,
    );

    return () => {
      mounted = false;
      window.removeEventListener("pageshow", applyAuthState);
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("popstate", applyAuthState);
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("3mash-auth-updated", applyAuthState);
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
