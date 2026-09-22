import { useEffect, useRef, useState } from "preact/hooks";
import {
  customerStore,
  getFavoriteProducts,
  getOrders,
  initCustomerStore,
  reaction,
  type IkasCustomer,
  type IkasOrder,
  type IkasProduct,
} from "@ikas/bp-storefront";

import {
  AccountProfileForm,
  AddressesView,
  FavoritesView,
  ForgotPasswordView,
  isStudioEnvironment,
  mockStudioCustomer,
  mockStudioOrders,
  OrdersView,
  RecoverPasswordView,
  text,
  type DashboardProps,
} from "../ThreeMashAccountUtilityPage";
import { t, tLocalized, localizedHref } from "../../utils/i18n";
import { safeNavigationHref, safeRedirect } from "../../utils/safeRedirect";
import ProtectedRoute from "../../sub-components/ProtectedRoute";
import {
  performLogout,
  hasCustomerToken,
  isCustomerAuthenticated,
  isStudioPreviewActive,
} from "../../utils/auth";

// Critical CSS injected inline — ikas Studio does not bundle sub-component CSS files.
// The registered page's own styles.css (ThreeMashAccountInfoPage/styles.css) covers
// most tmai-* / tmau-* classes. We only inject the new classes added by this shell.
const criticalLayoutCss = `
.three-mash-account-info-page,
.tmau-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: calc(100vh - 90px);
  overflow-x: hidden;
  background: var(--tmai-bg, var(--tm-theme-bg, #fafaf7));
  color: var(--tmai-text, var(--tm-theme-text, #0e0e0c));
  font-family: var(--tm-theme-font-body, "Inter", system-ui, sans-serif);
}
.three-mash-account-info-page *, .tmau-page * { box-sizing: border-box; }

.tmai-shell, .three-mash-account-layout {
  display: grid;
  grid-template-columns: minmax(280px, 0.42fr) minmax(0, 1fr);
  gap: 24px;
  align-items: stretch;
  width: 100%;
  max-width: min(var(--tmai-max, 1180px), 1180px);
  margin: 0 auto;
  flex: 1;
  min-height: 560px;
  padding: var(--tmai-pad-top, clamp(40px,5vw,64px)) 24px var(--tmai-pad-bottom, clamp(64px,8vw,110px));
}
.tmai-sidebar {
  display: flex;
  flex-direction: column;
  gap: 28px;
  height: 100%;
  min-height: 100%;
  padding: clamp(34px,4vw,48px);
  background: var(--tmai-dark, var(--tm-theme-dark, #0e0e0c));
  color: var(--tm-theme-bg, #fafaf7);
  min-width: 0;
  box-sizing: border-box;
}
.tmai-main, .tmai-main-panel {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100%;
  padding: clamp(34px,4vw,48px);
  background: #fff;
  min-width: 0;
  border: 1px solid var(--tmai-line, var(--tm-theme-line, #e6e6e0));
  box-sizing: border-box;
  overflow: hidden;
}

/* Loading overlay — right panel only */
.tmai-panel-loading {
  position: absolute;
  inset: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.78);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.18s ease;
}
.tmai-panel-loading.is-visible {
  opacity: 1;
  pointer-events: all;
}
.tmai-panel-spinner {
  display: block;
  width: 36px;
  height: 36px;
  border: 3px solid var(--tmai-line, #e6e6e0);
  border-top-color: var(--tmai-accent, var(--tm-theme-accent, #c7f136));
  border-radius: 50%;
  animation: tmai-spin 0.65s linear infinite;
}
@keyframes tmai-spin { to { transform: rotate(360deg); } }

/* Content fade-in on route swap */
.tmai-main > *:not(.tmai-panel-loading) {
  animation: tmai-fade-in 0.22s ease both;
}
@keyframes tmai-fade-in {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Auth inner forms (forgot / recover — rendered inside panel) */
.tmau-auth-form-wrap { display: grid; gap: 0; width: 100%; min-width: 0; }
.tmau-auth-inner-form { display: grid; gap: 14px; width: min(100%,480px); margin-top: 28px; }
.tmau-auth-login-link { display: block; margin-top: 16px; color: var(--tmai-muted,#55554e); font-size: 13px; text-decoration: underline; }

.tmai-menu a,
.tmai-menu button,
.tmai-nav-btn {
  display: block;
  width: fit-content;
  background: none;
  border: 0;
  padding: 0;
  margin: 0;
  color: #cfcfc6;
  font-family: var(--tm-theme-font-body, "Inter", system-ui, sans-serif);
  font-size: 14px;
  line-height: 1.35;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  transition: color 160ms ease;
}
.tmai-menu a:hover,
.tmai-menu a.is-active,
.tmai-menu button:hover,
.tmai-menu button.is-active,
.tmai-nav-btn:hover,
.tmai-nav-btn.is-active {
  color: var(--tmai-accent, var(--tm-theme-accent, #c7f136));
}

/* Responsive */
@media (max-width: 980px) {
  .tmai-shell, .three-mash-account-layout {
    grid-template-columns: 1fr;
    max-width: 100vw;
    min-height: 0;
    padding: 34px 18px 72px;
  }
  .tmai-sidebar, .tmai-main, .tmai-main-panel {
    min-height: auto;
    padding: 30px 22px;
  }
}
@media (max-width: 640px) {
  .tmai-shell, .three-mash-account-layout { padding: 26px 14px 58px; }
}
`;

// ─── Mode helpers ───────────────────────────────────────────────────────────

type AccountMode =
  | "account"
  | "addresses"
  | "orders"
  | "favorites"
  | "forgot-password"
  | "recover-password";

function modeFromPathname(pathname: string, fallback: AccountMode): AccountMode {
  const clean = pathname.split("?")[0].split("#")[0].toLowerCase().trim();
  const withoutLang = clean.replace(/^\/en(?:\/|$)/, "/");
  const normalized = withoutLang.startsWith("/") ? withoutLang : `/${withoutLang}`;
  const p = normalized.replace(/\/+$/, "") || "/";
  if (p === "/account" || p === "/hesabim") return "account";
  if (p === "/account/addresses" || p === "/adreslerim") return "addresses";
  if (
    p === "/account/favorites" ||
    p === "/account/favorite-products" ||
    p === "/favorilerim"
  )
    return "favorites";
  if (p === "/account/orders" || p === "/siparislerim") return "orders";
  if (p === "/account/forgot-password") return "forgot-password";
  if (p === "/account/recover-password") return "recover-password";
  return fallback;
}

function isPublicAuthPath(pathname?: string): boolean {
  if (!pathname) return false;
  const p = pathname.replace(/\/+$/, "");
  return (
    p === "/account/forgot-password" ||
    p === "/account/recover-password" ||
    p === "/account/login" ||
    p === "/account/register"
  );
}

function modeFromHref(nextHref: string, fallback: AccountMode): AccountMode {
  try {
    const pathname =
      typeof window !== "undefined"
        ? new URL(nextHref, window.location.origin).pathname
        : nextHref;
    return modeFromPathname(pathname, fallback);
  } catch {
    return fallback;
  }
}

function normalizeHref(value: string | undefined, fallback: string) {
  return safeNavigationHref(value, fallback);
}

function customerName(customer: any) {
  if (!customer) return "";
  const name = `${customer.firstName ?? ""} ${customer.lastName ?? ""}`.trim();
  return name || customer.email || "";
}

function getInitialSidebarName(customer: any): string {
  const direct = customerName(customer);
  if (direct) return direct;
  if (typeof customerStore !== "undefined" && customerStore.customer) {
    const storeDirect = customerName(customerStore.customer);
    if (storeDirect) return storeDirect;
  }
  // PII storage disabled: no longer reading cached customer name
  return "";
}

// ─── themeColor helper for CSS custom properties ────────────────────────────

function themeColor(
  input: string | undefined,
  fallback: string,
  token: string,
  legacyDefaults: string[] = [],
) {
  const trimmed = input?.trim();
  const normalized = trimmed?.toLowerCase();
  const defaults = [fallback, ...legacyDefaults].map((item) =>
    item.toLowerCase(),
  );
  if (!trimmed || (normalized && defaults.includes(normalized))) {
    return `var(${token}, ${fallback})`;
  }
  return trimmed;
}

function numeric(value: number | undefined, fallback: number, min: number, max: number) {
  const next = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(next)) return fallback;
  return Math.min(max, Math.max(min, next));
}

function dashboardStyle(props: DashboardProps) {
  return {
    "--tmai-bg": themeColor(props.backgroundColor, "#FAFAF7", "--tm-theme-bg", [
      "#ffffff",
      "#fff",
    ]),
    "--tmai-sidebar": themeColor(
      props.sidebarColor,
      "#F1F1EC",
      "--tm-theme-panel",
      ["#f7f7f5", "#ffffff", "#fff"],
    ),
    "--tmai-text": themeColor(props.textColor, "#0E0E0C", "--tm-theme-text", [
      "#050505",
      "#000000",
      "#111111",
    ]),
    "--tmai-muted": themeColor(
      props.mutedTextColor,
      "#55554e",
      "--tm-theme-sub",
      ["#9698a3", "#777777"],
    ),
    "--tmai-line": themeColor(props.lineColor, "#E6E6E0", "--tm-theme-line", [
      "#e6e6e1",
      "#e5e5e5",
    ]),
    "--tmai-accent": themeColor(
      props.accentColor,
      "#C7F136",
      "--tm-theme-accent",
      ["#dbfa37"],
    ),
    "--tmai-button-text": themeColor(
      props.buttonTextColor,
      "#0E0E0C",
      "--tm-theme-text",
      ["#ffffff", "#fff"],
    ),
    "--tmai-dark": "var(--tm-theme-dark, #0E0E0C)",
    "--tmai-max": `${numeric(props.maxWidth, 1180, 960, 1760)}px`,
    "--tmai-pad-top": `${numeric(props.sectionPaddingTop, 52, 0, 180)}px`,
    "--tmai-pad-bottom": `${numeric(props.sectionPaddingBottom, 86, 24, 240)}px`,
  } as any; // CSS-in-JS: dynamic CSS custom properties for theme styling
}

// ─── Shell Component ─────────────────────────────────────────────────────────

function AccountLayoutContent(props: DashboardProps) {
  const isStudio = isStudioPreviewActive();

  // ── Initial mode from URL (or prop if set by ikas Studio preview) ──
  const [mode, setMode] = useState<AccountMode>(() => {
    if (props.mode) return props.mode as AccountMode;
    if (typeof window !== "undefined") {
      return modeFromPathname(
        window.location.pathname.replace(/\/+$/, ""),
        "account",
      );
    }
    return "account";
  });

  // ── Customer state ────────────────────────────────────────────────
  const [customer, setCustomer] = useState<IkasCustomer | null>(() => {
    if (customerStore.customer) return customerStore.customer;
    if (isStudio) return mockStudioCustomer;
    return null;
  });

  const [orders, setOrders] = useState<IkasOrder[]>(
    () => (isStudio ? mockStudioOrders : []),
  );
  const [favorites, setFavorites] = useState<IkasProduct[]>([]);

  // ── Sidebar name ──────────────────────────────────────────────────
  const [sidebarName, setSidebarName] = useState(() =>
    getInitialSidebarName(customer),
  );

  // ── Right-panel loading overlay state ────────────────────────────
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const loadingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Sync sidebar name when customer changes ────────────────────────
  useEffect(() => {
    const nextName =
      customerName(customer) || getInitialSidebarName(customer);
    if (nextName) {
      setSidebarName(nextName);
      // PII storage disabled: customer name should not be cached client-side
    }
  }, [customer]);

  // ── Listen to browser popstate (back/forward), pageshow (bfcache) & storage (multi-tab) ─
  useEffect(() => {
    if (typeof window === "undefined") return;

    function handleAuthVerification() {
      if (isStudio) return true;
      const currentPath = typeof window !== "undefined" ? window.location.pathname : "";
      if (isPublicAuthPath(currentPath) || mode === "forgot-password" || mode === "recover-password") {
        return true;
      }
      if (!hasCustomerToken() || isCustomerAuthenticated() === "unauthenticated") {
        setCustomer(null);
        setOrders([]);
        setFavorites([]);
        setSidebarName("");
        window.location.replace(safeRedirect(localizedHref("/account/login")));
        return false;
      }
      return true;
    }

    function handlePageShow() {
      handleAuthVerification();
    }

    function handlePopState() {
      if (!handleAuthVerification()) return;
      setMode(
        modeFromPathname(
          window.location.pathname.replace(/\/+$/, ""),
          (props.mode as AccountMode) || "account",
        ),
      );
    }

    function handleStorage(e: StorageEvent) {
      if (e.key === "customerToken" || e.key === "tm_logout_timestamp" || e.key === null) {
        handleAuthVerification();
      }
    }

    function handleAuthUpdated() {
      handleAuthVerification();
    }

    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("storage", handleStorage);
    window.addEventListener("3mash-auth-updated", handleAuthUpdated);

    const disposeAuthReaction = reaction(
      () => [
        customerStore._token,
        customerStore._initialized,
        customerStore.customer,
      ],
      handleAuthVerification,
    );

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("3mash-auth-updated", handleAuthUpdated);
      disposeAuthReaction();
    };
  }, [props.mode, isStudio]);

  // ── Load customer + section data on mount / mode change ───────────
  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        let currentCustomer = customerStore.customer;
        if (!currentCustomer && hasCustomerToken()) {
          try {
            await initCustomerStore(customerStore);
            currentCustomer = customerStore.customer;
          } catch {}
        }

        if (mounted) {
          if (currentCustomer) {
            setCustomer(currentCustomer);
            setSidebarName(customerName(currentCustomer));
            try {
              localStorage.removeItem("tm_customer_name");
              localStorage.removeItem("tm_customer_cache");
            } catch {}
          } else if (isStudio) {
            setCustomer(mockStudioCustomer);
            setSidebarName(customerName(mockStudioCustomer));
          }
        }

        if (mode === "orders") {
          const nextOrders = await getOrders(customerStore);
          if (mounted) setOrders(nextOrders || []);
        }

        if (mode === "favorites") {
          const nextFavorites = await getFavoriteProducts(customerStore);
          if (mounted) setFavorites(nextFavorites || []);
        }
      } catch {
        if (mounted) {
          if (isStudio) {
            setCustomer(mockStudioCustomer);
            if (mode === "orders") setOrders(mockStudioOrders);
          }
        }
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [mode, isStudio]);

  // ── Navigation handler (sidebar clicks) ───────────────────────────
  // Uses buttons instead of <a href> so ikas router never intercepts.
  // URL is updated via pushState, right panel swaps via setMode.
  function handleNavigate(nextHref: string) {
    if (!isStudio && (!hasCustomerToken() || isCustomerAuthenticated() === "unauthenticated")) {
      window.location.replace(safeRedirect(localizedHref("/account/login")));
      return;
    }

    const nextMode = modeFromHref(
      nextHref,
      (props.mode as AccountMode) || "account",
    );

    // Already on this mode — no-op
    if (nextMode === mode) return;

    // Push URL without full navigation — sidebar stays mounted
    if (typeof window !== "undefined") {
      try {
        window.history.pushState({}, "", safeRedirect(nextHref));
      } catch {
        // iframe-safe
      }
    }

    // Show loading overlay briefly during view swap
    setIsLoadingContent(true);
    if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);

    // Swap mode in next frame and transition out loading overlay
    requestAnimationFrame(() => {
      setMode(nextMode);
      loadingTimerRef.current = setTimeout(() => {
        setIsLoadingContent(false);
      }, 150);
    });
  }

  async function handleLogout(event: Event) {
    event.preventDefault();
    setCustomer(null);
    setOrders([]);
    setFavorites([]);
    setSidebarName("");
    // performLogout clears storage, clears cart, broadcasts across tabs, and redirects to login.
    await performLogout({ forceRedirect: true, redirectTarget: "/account/login" });
  }

  // ── Href helpers ──────────────────────────────────────────────────
  const accountHref = normalizeHref(props?.accountHref, "/account");
  const addressesHref = normalizeHref(props?.addressesHref, "/account/addresses");
  const favoritesHref = normalizeHref(props?.favoritesHref, "/account/favorites");
  const ordersHref = normalizeHref(props?.ordersHref, "/account/orders");

  const personalLinks = [
    {
      key: "account" as AccountMode,
      label: text(props?.profileTitle, tLocalized("Kişisel Bilgilerim", "My Personal Information"), "Profile Info"),
      href: accountHref,
    },
    {
      key: "addresses" as AccountMode,
      label: text(props?.addressesTitle, tLocalized("Adreslerim", "My Addresses"), "My Addresses"),
      href: addressesHref,
    },
    {
      key: "favorites" as AccountMode,
      label: text(props?.favoritesTitle, tLocalized("Beğendiğim Ürünler", "My Favorites"), "Favorite Products"),
      href: favoritesHref,
    },
  ];

  const effectiveCustomer = customer || (isStudio ? mockStudioCustomer : null);
  const addresses = effectiveCustomer?.addresses || [];

  // ── Right panel content ───────────────────────────────────────────
  function renderContent() {
    switch (mode) {
      case "account":
        if (!effectiveCustomer && !isStudio) {
          return (
            <div
              className="tmai-loading-placeholder"
              style={{ minHeight: "360px", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <span className="tmai-panel-spinner" style={{ display: "inline-block" }} />
            </div>
          );
        }
        return (
          <AccountProfileForm
            customer={effectiveCustomer || ({} as IkasCustomer)}
            ready={Boolean(effectiveCustomer)}
            setCustomer={setCustomer}
            props={props}
          />
        );
      case "addresses":
        return <AddressesView addresses={addresses} props={props} />;
      case "orders":
        return <OrdersView orders={orders} props={props} />;
      case "favorites":
        return <FavoritesView favorites={favorites} props={props} />;
      case "forgot-password":
        return <ForgotPasswordView props={props} />;
      case "recover-password":
        return <RecoverPasswordView props={props} />;
      default:
        return null;
    }
  }

  return (
    <section
      className="three-mash-account-info-page tmau-page"
      style={dashboardStyle(props)}
    >
      <style dangerouslySetInnerHTML={{ __html: criticalLayoutCss }} />
      <section className="three-mash-account-layout tmai-shell">

        {/* ── LEFT SIDEBAR — never unmounts ─────────────────────── */}
        <aside className="tmai-sidebar">

          <span className="tmai-kicker">
            {text(props?.accountLabel, tLocalized("HESABIM", "MY ACCOUNT"), "MY ACCOUNT")}
          </span>

          <div className="tmai-user">
            {sidebarName ? (
              <strong>{sidebarName}</strong>
            ) : (
              <span className="tmai-user-name-skeleton" aria-hidden="true" />
            )}
            <a
              href="#"
              className="tmai-logout tmau-logout"
              onClick={handleLogout}
            >
              {text(props?.logoutText, tLocalized("Çıkış yap", "Sign out"), "Sign out")}
            </a>
          </div>

          <nav className="tmai-menu">
            <h2>
              {text(props?.accountGroupTitle, tLocalized("Hesap Yönetimi", "Account Management"), "Account Management")}
            </h2>

            {personalLinks.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => handleNavigate(item.href)}
                className={`tmai-nav-btn${mode === item.key ? " is-active" : ""}`}
              >
                {item.label}
              </button>
            ))}

            <h2>{tLocalized("Sipariş Bilgilerim", "Order Information")}</h2>

            <button
              type="button"
              onClick={() => handleNavigate(ordersHref)}
              className={`tmai-nav-btn${mode === "orders" ? " is-active" : ""}`}
            >
              {text(props?.ordersTitle, tLocalized("Siparişlerim", "My Orders"), "My Orders")}
            </button>
          </nav>

        </aside>

        {/* ── RIGHT PANEL — content swaps, sidebar stays ────────── */}
        <main className="tmai-main tmai-main-panel">

          {/* Loading overlay — covers only the right panel */}
          <div
            className={`tmai-panel-loading${isLoadingContent ? " is-visible" : ""}`}
            aria-hidden="true"
          >
            <span className="tmai-panel-spinner" />
          </div>

          {renderContent()}

        </main>

      </section>
    </section>
  );
}

export default function ThreeMashAccountLayout(props: DashboardProps) {
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "";
  const isPublicAuthMode =
    props.mode === "forgot-password" ||
    props.mode === "recover-password" ||
    isPublicAuthPath(currentPath);

  if (isPublicAuthMode) {
    return <AccountLayoutContent {...props} />;
  }

  return (
    <ProtectedRoute
      redirectHref="/account/login"
      isStudio={isStudioPreviewActive()}
    >
      <AccountLayoutContent {...props} />
    </ProtectedRoute>
  );
}