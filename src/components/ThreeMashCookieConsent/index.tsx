import { useEffect, useState, useRef } from "preact/hooks";
import { t, tLocalized, localizedHref } from "../../utils/i18n";
import { stringValue, safeFunctionCall } from "../../types/typeGuards";
import cookiePrinterImage from "../../assets/cookie-printer-image-data";

export interface CookieConsentState {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  timestamp: string;
  version: number;
}

const STORAGE_KEY = "tm_cookie_consent";
const CURRENT_VERSION = 1;

function getStoredConsent(): CookieConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.version === "number" && parsed.version === CURRENT_VERSION) {
      return parsed;
    }
  } catch {}
  return null;
}

function applyConsentEffects(consent: CookieConsentState) {
  if (typeof window === "undefined") return;

  // 1. Meta Pixel consent control
  // window.fbq is typed in src/types/globals.d.ts
  safeFunctionCall(window.fbq, "consent", consent.marketing ? "grant" : "revoke");

  // 2. Google Consent Mode
  // window.gtag is typed in src/types/globals.d.ts
  safeFunctionCall(window.gtag, "consent", "update", {
    analytics_storage: consent.analytics ? "granted" : "denied",
    ad_storage: consent.marketing ? "granted" : "denied",
    functionality_storage: consent.functional ? "granted" : "denied",
    personalization_storage: consent.marketing ? "granted" : "denied",
    security_storage: "granted",
  });

  // 3. Purge non-consented tracking cookies when the browser is idle.
  const purgeCookies = () => {
    try {
      const cookiesToPurge: string[] = [];
      if (!consent.marketing) {
        cookiesToPurge.push("fr", "_fbp", "_fbc", "_gcl_au", "tr");
      }
      if (!consent.analytics) {
        cookiesToPurge.push("zfccn", "_ga", "_gid", "_gat", "zpc", "_zohopagesense");
      }
      if (!consent.functional) {
        cookiesToPurge.push("_siq", "_zld", "_zldp", "LS_CSRF_TOKEN");
      }

      if (cookiesToPurge.length === 0 || typeof document === "undefined") return;

      const hostname = window.location.hostname;
      const allowedDomains = ["3mash.com", "myikas.com", "ikasapps.com"];
      const baseDomain = allowedDomains.find(
        (allowed) => hostname === allowed || hostname.endsWith(`.${allowed}`),
      );

      if (!baseDomain) {
        if (typeof process !== "undefined" && process.env?.NODE_ENV === "development") {
          console.warn("CookieConsent: hostname not in allowlist, skipping purge");
        }
        return;
      }

      const domainVariants = [...new Set([
        `.${hostname}`,
        hostname,
        `.${baseDomain}`,
      ])];
      const cookieList = document.cookie.split(";");
      for (const cookie of cookieList) {
        const name = cookie.split("=")[0].trim();
        if (!cookiesToPurge.some((pattern) => name === pattern || name.startsWith(pattern))) {
          continue;
        }

        // Clear the host-only cookie once, then only the current and base domains.
        document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax`;
        for (const domain of domainVariants) {
          document.cookie = `${name}=; Path=/; Domain=${domain}; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax`;
        }
      }
    } catch {}
  };

  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(purgeCookies, { timeout: 1500 });
  } else {
    setTimeout(purgeCookies, 0);
  }

  // 4. Dispatch global event for external scripts & ikas components
  try {
    window.__tmCookieConsent = consent;
    window.dispatchEvent(
      new CustomEvent("tm_cookie_consent_updated", { detail: consent })
    );
  } catch {}
}

export function ThreeMashCookieConsent() {
  const [consent, setConsent] = useState<CookieConsentState | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  // Preference switches
  const [preferences, setPreferences] = useState({
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    const existing = getStoredConsent();
    if (existing) {
      setConsent(existing);
      setPreferences({
        analytics: existing.analytics,
        marketing: existing.marketing,
        functional: existing.functional,
      });
      applyConsentEffects(existing);
      setIsOpen(false);
    } else {
      // First visit: default to strictly necessary prior to explicit choice
      applyConsentEffects({
        necessary: true,
        analytics: false,
        marketing: false,
        functional: false,
        timestamp: new Date().toISOString(),
        version: CURRENT_VERSION,
      });
      // Show banner after brief delay
      const timer = setTimeout(() => setIsOpen(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const consentRef = useRef<CookieConsentState | null>(consent);
  consentRef.current = consent;

  function closeModal() {
    setIsOpen(false);
    setIsPreferencesOpen(false);
    const c = consentRef.current;
    if (c) {
      setPreferences({
        analytics: c.analytics,
        marketing: c.marketing,
        functional: c.functional,
      });
    }
  }

  // Listen for global open requests (e.g. from footer links or #cerez-ayarlari)
  useEffect(() => {
    function handleOpen() {
      const current = consentRef.current || getStoredConsent();
      if (current) {
        setPreferences({
          analytics: current.analytics,
          marketing: current.marketing,
          functional: current.functional,
        });
      }
      setIsPreferencesOpen(true);
      setIsOpen(true);
    }

    function checkHash() {
      if (typeof window !== "undefined") {
        const hash = window.location.hash.toLowerCase();
        if (
          hash === "#cerez-ayarlari" ||
          hash === "#cookie-preferences" ||
          hash === "#cookie-settings"
        ) {
          handleOpen();
        }
      }
    }

    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      if (
        target?.closest(
          ".tm-open-cookie-settings, [href*='#cerez-ayarlari'], [href*='#cookie-settings'], [href*='#cookie-preferences']"
        )
      ) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        handleOpen();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeModal();
      }
    }

    window.addEventListener("tm_open_cookie_settings", handleOpen);
    window.addEventListener("hashchange", checkHash);
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClick, true);
    checkHash();

    return () => {
      window.removeEventListener("tm_open_cookie_settings", handleOpen);
      window.removeEventListener("hashchange", checkHash);
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  function saveConsent(state: Omit<CookieConsentState, "necessary" | "timestamp" | "version">) {
    const fullState: CookieConsentState = {
      necessary: true,
      analytics: state.analytics,
      marketing: state.marketing,
      functional: state.functional,
      timestamp: new Date().toISOString(),
      version: CURRENT_VERSION,
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fullState));
    } catch {}

    setConsent(fullState);
    setPreferences({
      analytics: fullState.analytics,
      marketing: fullState.marketing,
      functional: fullState.functional,
    });
    applyConsentEffects(fullState);
    setIsOpen(false);
    setIsPreferencesOpen(false);
  }

  function handleAcceptAll() {
    saveConsent({ analytics: true, marketing: true, functional: true });
  }

  function handleOnlyNecessary() {
    saveConsent({ analytics: false, marketing: false, functional: false });
  }

  function handleCloseBanner() {
    // Closing banner without choice treats as necessary cookies only to respect privacy
    handleOnlyNecessary();
  }

  function handleSavePreferences() {
    saveConsent(preferences);
  }

  return (
    <>
      {/* ── Main Cookie Banner Card (Bottom-Left Floating) ── */}
      {isOpen && !isPreferencesOpen && (
        <aside
          className="tm-cookie-banner"
          role="dialog"
          aria-modal="false"
          aria-labelledby="tm-cookie-heading"
          aria-describedby="tm-cookie-desc"
        >
          {/* Close button (top-right X) */}
          <button
            type="button"
            className="tm-cookie-close-btn"
            onClick={handleCloseBanner}
            aria-label={t("cookies.closePanel", "Close cookie settings")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Centered Printer Visual */}
          <div className="tm-cookie-visual-wrap">
            <img
              src={cookiePrinterImage}
              alt="3MASH Dental 3D Printer"
              className="tm-cookie-printer-img"
              loading="lazy"
            />
          </div>

          {/* Heading */}
          <h2 id="tm-cookie-heading" className="tm-cookie-heading">
            {t("cookies.bannerTitle", "We Use Cookies")}
          </h2>

          {/* Description */}
          <p id="tm-cookie-desc" className="tm-cookie-desc">
            {t(
              "cookies.bannerDesc",
              "We use cookies to improve your experience, understand how our website is used, and provide relevant content. You can choose which optional cookies you allow."
            )}
          </p>

          {/* Two Action Buttons Placed Horizontally */}
          <div className="tm-cookie-actions tm-cookie-actions-horizontal">
            <button
              type="button"
              className="tm-cookie-btn tm-cookie-btn-primary"
              onClick={handleAcceptAll}
            >
              {t("cookies.acceptAll", "Accept all cookies")}
            </button>
            <button
              type="button"
              className="tm-cookie-btn tm-cookie-btn-secondary"
              onClick={() => setIsPreferencesOpen(true)}
            >
              {t("cookies.manageCookies", "Manage cookies")}
            </button>
          </div>
        </aside>
      )}

      {/* ── Cookie Preferences Modal / Panel ── */}
      {isOpen && isPreferencesOpen && (
        <div
          className="tm-cookie-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="tm-pref-heading"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="tm-cookie-modal-card">
            {/* Modal Header */}
            <div className="tm-cookie-modal-header">
              <h2 id="tm-pref-heading" className="tm-cookie-modal-title">
                {t("cookies.preferencesTitle", "Cookie Preferences")}
              </h2>
              <button
                type="button"
                className="tm-cookie-modal-close"
                onClick={closeModal}
                aria-label={tLocalized("Kapat", "Close")}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <p className="tm-cookie-modal-desc">
              {t(
                "cookies.preferencesDesc",
                "Review the cookie categories used on our website below and customize your preferences."
              )}{" "}
              <a href={localizedHref("/pages/gizlilik-politikasi-ve-kvkk")} target="_blank" rel="noopener noreferrer" className="tm-cookie-policy-text-link">
                {t("cookies.policyLink", "Cookie Policy →")}
              </a>
            </p>

            {/* Categories List */}
            <div className="tm-cookie-pref-list">
              {/* 1. Necessary */}
              <div className="tm-cookie-pref-item is-required">
                <div className="tm-cookie-pref-info">
                  <div className="tm-cookie-pref-title-row">
                    <span className="tm-cookie-pref-name">
                      {t("cookies.necessaryTitle", "Strictly Necessary")}
                    </span>
                    <span className="tm-cookie-badge-req">
                      {t("cookies.alwaysActive", "Always Active")}
                    </span>
                  </div>
                  <p className="tm-cookie-pref-desc">
                    {t(
                      "cookies.necessaryDesc",
                      "Essential for core website security, cart/session operations, and language preference. Cannot be disabled."
                    )}
                  </p>
                </div>
                <div className="tm-cookie-switch-wrap">
                  <input type="checkbox" checked disabled className="tm-cookie-input-switch" aria-label="Zorunlu Çerezler" />
                  <span className="tm-cookie-switch-ui is-disabled-checked" />
                </div>
              </div>

              {/* 2. Analytics */}
              <div className="tm-cookie-pref-item">
                <div className="tm-cookie-pref-info">
                  <div className="tm-cookie-pref-title-row">
                    <span className="tm-cookie-pref-name">
                      {t("cookies.analyticsTitle", "Performance & Analytics")}
                    </span>
                    <span className="tm-cookie-tool-tag">Zoho PageSense</span>
                  </div>
                  <p className="tm-cookie-pref-desc">
                    {t(
                      "cookies.analyticsDesc",
                      "Helps us anonymously analyze visitor traffic and interactions to improve website performance."
                    )}
                  </p>
                </div>
                <label className="tm-cookie-switch-wrap">
                  <input
                    type="checkbox"
                    className="tm-cookie-input-switch"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences((current) => ({ ...current, analytics: (e.target as HTMLInputElement).checked }))}
                    aria-label="Analitik Çerezleri"
                  />
                  <span className="tm-cookie-switch-ui" />
                </label>
              </div>

              {/* 3. Marketing */}
              <div className="tm-cookie-pref-item">
                <div className="tm-cookie-pref-info">
                  <div className="tm-cookie-pref-title-row">
                    <span className="tm-cookie-pref-name">
                      {t("cookies.marketingTitle", "Marketing & Targeting")}
                    </span>
                    <span className="tm-cookie-tool-tag">Meta Pixel</span>
                  </div>
                  <p className="tm-cookie-pref-desc">
                    {t(
                      "cookies.marketingDesc",
                      "Allows us to provide personalized product campaigns and measure advertising effectiveness."
                    )}
                  </p>
                </div>
                <label className="tm-cookie-switch-wrap">
                  <input
                    type="checkbox"
                    className="tm-cookie-input-switch"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences((current) => ({ ...current, marketing: (e.target as HTMLInputElement).checked }))}
                    aria-label="Pazarlama Çerezleri"
                  />
                  <span className="tm-cookie-switch-ui" />
                </label>
              </div>

              {/* 4. Functional */}
              <div className="tm-cookie-pref-item">
                <div className="tm-cookie-pref-info">
                  <div className="tm-cookie-pref-title-row">
                    <span className="tm-cookie-pref-name">
                      {t("cookies.functionalTitle", "Functional Cookies")}
                    </span>
                    <span className="tm-cookie-tool-tag">Zoho SalesIQ</span>
                  </div>
                  <p className="tm-cookie-pref-desc">
                    {t(
                      "cookies.functionalDesc",
                      "Powers live chat customer support and enhanced interactive features."
                    )}
                  </p>
                </div>
                <label className="tm-cookie-switch-wrap">
                  <input
                    type="checkbox"
                    className="tm-cookie-input-switch"
                    checked={preferences.functional}
                    onChange={(e) => setPreferences((current) => ({ ...current, functional: (e.target as HTMLInputElement).checked }))}
                    aria-label="İşlevsel Çerezler"
                  />
                  <span className="tm-cookie-switch-ui" />
                </label>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="tm-cookie-modal-actions">
              <button
                type="button"
                className="tm-cookie-btn tm-cookie-btn-primary"
                onClick={handleSavePreferences}
              >
                {t("cookies.savePreferences", "Save preferences")}
              </button>
              <button
                type="button"
                className="tm-cookie-btn tm-cookie-btn-secondary"
                onClick={handleAcceptAll}
              >
                {t("cookies.acceptAll", "Accept All")}
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}

export default ThreeMashCookieConsent;
