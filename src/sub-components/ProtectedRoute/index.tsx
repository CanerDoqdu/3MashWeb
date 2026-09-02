import { useEffect, useState } from "preact/hooks";
import {
  customerStore,
  initCustomerStore,
} from "@ikas/bp-storefront";
import { localizedHref } from "../../utils/i18n";
import { safeRedirect } from "../../utils/safeRedirect";

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
  isStudio?: boolean;
};

export default function ProtectedRoute({
  children,
  loginHref,
  isStudio = false,
}: Props) {
  // Never infer auth during render: the first protected-route render is always loading.
  const [authStatus, setAuthStatus] = useState<AuthStatus>("loading");

  useEffect(() => {
    let mounted = true;

    function redirectToLogin() {
      if (typeof window === "undefined") return;

      window.performance?.mark("3mash-auth-redirect");
      window.performance?.measure(
        "3mash-auth-check-to-redirect",
        "3mash-auth-check-start",
        "3mash-auth-redirect",
      );
      const target = localizedHref(loginHref || "/account/login");
      window.location.replace(safeRedirect(target));
    }

    if (isStudio) {
      setAuthStatus("authenticated");
      return () => {
        mounted = false;
      };
    }

    if (customerStore._initialized) {
      if (customerStore.customer) {
        setAuthStatus("authenticated");
      } else {
        redirectToLogin();
      }
      return () => {
        mounted = false;
      };
    }

    (customerStoreInitPromise || initCustomerStore(customerStore))
      .then(() => {
        if (!mounted) return;
        if (customerStore.customer) {
          window.performance?.mark("3mash-auth-authenticated");
          setAuthStatus("authenticated");
        } else {
          redirectToLogin();
        }
      })
      .catch(() => {
        if (!mounted) return;
        redirectToLogin();
      });

    return () => {
      mounted = false;
    };
  }, [isStudio]);

  if (authStatus === "loading") {
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

  if (authStatus !== "authenticated") return null;
  return <>{children}</>;
}
