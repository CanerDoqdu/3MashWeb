import { isEnglishLocale, localizedHref } from "../../utils/i18n";
import { useEffect, useLayoutEffect, useState } from "preact/hooks";
import { safeNavigationHref } from "../../utils/safeRedirect";
import { sanitizeHtml } from "../../utils/sanitizeHtml";
import {
  customerLogin,
  customerStore,
  forgotPassword,
  register,
  recoverPassword,
  Router,
  type IkasImage,
} from "@ikas/bp-storefront";
import { Props } from "./types";
import authCriticalStyles from "../authCriticalStyles";

const defaultAuthImage =
  "https://cdn.myikas.com/images/theme-images/a6f9541f-702d-431d-9744-9d4f494c94af/image_1080.webp";
const logoImageIds = [
  "4a6af8e2-cb7c-4cc8-ba17-13656d4b8670",
  "b87e4343-0ef5-4084-b8b0-1b60abeb1012",
  "de819199-332c-407c-82de-917418b2c2e1",
];

const accountTextDefaults = {
  eyebrowText: ["Hesabım", "MY ACCOUNT"],
  titleText: ["Üye Girişi", "Member Login"],
  subtitleText: [
    "Siparişlerinizi takip etmek, adreslerinizi yönetmek ve 3mash hesabınıza hızlıca erişmek için giriş yapın.",
    "Log in to quickly track your orders, manage your addresses, and access your 3mash account.",
  ],
  loginTabText: ["Üye Girişi", "Member Login"],
  registerTabText: ["Üye Ol", "Sign Up"],
  emailLabel: ["Email", "E-mail"],
  passwordLabel: ["Şifre", "Password"],
  submitButtonText: ["Üye Girişi", "Sign In"],
  forgotPasswordText: ["Parolamı Unuttum", "Forgot My Password"],
  registerPromptText: ["Hesabınız yok mu?", "Do not have an account yet?"],
  registerButtonText: ["Kayıt Ol", "Create Account"],
  loadingText: ["Giriş yapılıyor...", "Signing in..."],
  successMessage: [
    "Giriş başarılı. Hesabınıza yönlendiriliyorsunuz.",
    "Login successful. Redirecting to your account.",
  ],
  errorMessage: [
    "Email veya şifre hatalı. Lütfen bilgilerinizi kontrol edin.",
    "Email or password is incorrect. Please check your details.",
  ],
  recoverPasswordText: ["Şifremi Kurtar", "Recover Password"],
  registerSubmitButtonText: ["Hesap Oluştur", "Create Account"],
  registerLoadingText: ["Kaydınız oluşturuluyor...", "Creating account..."],
  firstNameLabel: ["Ad", "First Name"],
  lastNameLabel: ["Soyad", "Last Name"],
  termsMembershipText: ["Üyelik Sözleşmesi", "Membership Agreement"],
  termsAndText: ["ve", "and"],
  termsKvkkText: ["KVKK Aydınlatma Metni", "KVKK Clarification Notice"],
  termsAcceptedText: ["'ni okudum, kabul ediyorum. ", "have been read and accepted."],
  marketingIntroText: [
    "Kampanya, indirim ve duyurulardan haberdar olmak için",
    "I have read and approve the",
  ],
  marketingConsentText: [
    "Ticari Elektronik İleti Onayı",
    "Commercial Electronic Message Consent",
  ],
  marketingAcceptedText: [
    "metnini okudum, onaylıyorum. Tarafıma ticari elektronik ileti gönderilmesini kabul ediyorum.",
    "notice and consent to receive commercial electronic messages.",
  ],
  forgotPasswordEyebrowText: ["HESAP", "ACCOUNT"],
  forgotPasswordTitleText: ["Şifremi Unuttum", "Forgot Password"],
  forgotPasswordDescriptionText: [
    "Email adresinizi girin; şifre yenileme bağlantısını size gönderelim.",
    "Enter your email and we will send you a password reset link.",
  ],
  forgotPasswordEmailLabel: ["Email", "E-mail"],
  forgotPasswordSubmitText: ["Gönder", "Send"],
  forgotPasswordSubmittingText: ["Gönderiliyor...", "Sending..."],
  forgotPasswordSuccessText: [
    "Şifre yenileme bağlantısı email adresinize gönderildi.",
    "The password reset link was sent to your email.",
  ],
  forgotPasswordErrorText: [
    "İşlem tamamlanamadı. Email adresinizi kontrol edin.",
    "The request could not be completed. Check your email address.",
  ],
  forgotPasswordLoginPromptText: ["Hesabınıza giriş yapın.", "Log in to your account."],
  forgotPasswordLoginLinkText: ["Üye Girişi", "Member Login"],
  recoverPasswordEyebrowText: ["HESAP", "ACCOUNT"],
  recoverPasswordTitleText: ["Şifremi Kurtar", "Recover Password"],
  recoverPasswordDescriptionText: [
    "Yeni şifrenizi belirleyin ve hesabınıza güvenli şekilde tekrar erişin.",
    "Set your new password to regain access to your account securely.",
  ],
  recoverPasswordLabel: ["Şifre", "Password"],
  recoverPasswordConfirmLabel: ["Şifre Tekrar", "Confirm Password"],
  recoverPasswordSubmitText: ["Şifreyi Güncelle", "Update Password"],
  recoverPasswordSubmittingText: ["Güncelleniyor...", "Updating..."],
  recoverPasswordSuccessText: [
    "Şifreniz güncellendi. Giriş sayfasına yönlendiriliyorsunuz.",
    "Your password has been updated. Redirecting to login.",
  ],
  recoverPasswordErrorText: [
    "Şifreler eşleşmiyor veya bağlantı geçersiz.",
    "The passwords do not match or the reset link is invalid.",
  ],
  recoverPasswordMismatchText: ["Şifreler eşleşmiyor.", "Passwords do not match."],
  recoverPasswordLoginPromptText: ["Hesabınıza giriş yapın.", "Log in to your account."],
  recoverPasswordLoginLinkText: ["Üye Girişi", "Member Login"],
} as const satisfies Record<string, readonly [string, string]>;

type AccountTextKey = keyof typeof accountTextDefaults;

const accountLinkDefaults = {
  registerTabHref: "/account/register",
  forgotPasswordHref: "/account/forgot-password",
  recoverPasswordHref: "/account/recover-password",
  loginHref: "/account/login",
  accountHref: "/account",
  membershipAgreementHref: "/pages/uyelik-sozlesmesi",
  kvkkNoticeHref: "/pages/gizlilik-politikasi-ve-kvkk",
  commercialConsentHref: "/pages/ticari-elektronik-ileti-onayi",
} as const;

type AccountLinkKey = keyof typeof accountLinkDefaults;

function localizedText(props: Props, key: AccountTextKey) {
  const isEn = isEnglishLocale();
  const configuredValue = isEn
    ? props[`${key}En` as keyof Props]
    : props[key];
  const fallback = accountTextDefaults[key][isEn ? 1 : 0];
  const content =
    typeof configuredValue === "string" && configuredValue.trim()
      ? configuredValue.trim()
      : fallback;
  const inlineContent = content
    .replace(/<\/p>\s*<p[^>]*>/gi, "<br />")
    .replace(/^<p[^>]*>/i, "")
    .replace(/<\/p>$/i, "")
    .replace(/&lt;\/?p(?:\s[^&]*?)?&gt;/gi, "")
    .replace(/&#0*60;\/?p(?:\s[^&]*?)?&#0*62;/gi, "");

  return (
    <span
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(inlineContent) }}
    />
  );
}

function href(props: Props, key: AccountLinkKey) {
  const configuredValue = props[key];
  const path =
    typeof configuredValue === "string" && configuredValue.trim()
      ? configuredValue.trim()
      : accountLinkDefaults[key];
  const localizedPath = localizedHref(path);
  return safeNavigationHref(localizedPath, localizedPath || accountLinkDefaults[key]);
}

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

function imageIdToUrl(value: string) {
  const trimmed = value.trim();
  if (trimmed.includes("a6f9541f-702d-431d-9744-9d4f494c94af"))
    return defaultAuthImage;
  if (trimmed.startsWith("theme-images/"))
    return `https://cdn.myikas.com/images/${trimmed}/image_3840.webp`;
  return trimmed;
}

function withAuthFallback(value: string) {
  return logoImageIds.some((id) => value.includes(id))
    ? defaultAuthImage
    : value;
}

function imageSource(
  value: IkasImage | string | null | undefined,
  fallback: string,
) {
  if (typeof value === "string" && value.trim())
    return withAuthFallback(imageIdToUrl(value));
  if (value && typeof value === "object") {
    const image = value as {
      id?: unknown;
      url?: unknown;
      src?: unknown;
      imageUrl?: unknown;
      image?: { url?: unknown; src?: unknown };
      file?: { url?: unknown; src?: unknown };
    };
    if (typeof image.url === "string")
      return withAuthFallback(imageIdToUrl(image.url));
    if (typeof image.src === "string")
      return withAuthFallback(imageIdToUrl(image.src));
    if (typeof image.imageUrl === "string")
      return withAuthFallback(imageIdToUrl(image.imageUrl));
    if (typeof image.id === "string")
      return withAuthFallback(imageIdToUrl(image.id));
    if (typeof image.image?.url === "string")
      return withAuthFallback(imageIdToUrl(image.image.url));
    if (typeof image.image?.src === "string")
      return withAuthFallback(imageIdToUrl(image.image.src));
    if (typeof image.file?.url === "string")
      return withAuthFallback(imageIdToUrl(image.file.url));
    if (typeof image.file?.src === "string")
      return withAuthFallback(imageIdToUrl(image.file.src));
  }
  return fallback;
}

export function ThreeMashAccountPage(props: Props & { mode?: string }) {
  type AuthMode = "login" | "register" | "forgot-password" | "recover-password";
  const [authMode, setAuthMode] = useState<AuthMode>(() => {
    const propMode = props.mode;
    if (
      propMode === "register" ||
      propMode === "forgot-password" ||
      propMode === "recover-password"
    ) {
      return propMode;
    }

    if (typeof window !== "undefined") {
      const pathname = window.location.pathname.replace(/\/+$/, "");
      if (pathname === "/account/register") return "register";
      if (pathname === "/account/forgot-password") return "forgot-password";
      if (pathname === "/account/recover-password") return "recover-password";
    }
    return "login";
  });
  const activeTab = authMode === "register" ? "register" : "login";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [marketingAccepted, setMarketingAccepted] = useState(false);
  const [recoveryToken, setRecoveryToken] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "mismatch"
  >("idle");
  const [isFormReady, setIsFormReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setIsFormReady(true);

    function handlePopState() {
      const pathname = window.location.pathname.replace(/\/+$/, "");
      const nextMode: AuthMode = pathname === "/account/register"
        ? "register"
        : pathname === "/account/forgot-password"
          ? "forgot-password"
          : pathname === "/account/recover-password"
            ? "recover-password"
            : "login";
      setAuthMode(nextMode);
      setStatus("idle");
    }

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useLayoutEffect(() => {
    if (authMode !== "recover-password" || typeof window === "undefined") return;
    const token = new URLSearchParams(window.location.search).get("token") || "";
    setRecoveryToken(token);
    if (token) window.history.replaceState({}, "", window.location.pathname);
  }, [authMode]);

  useLayoutEffect(() => {
    if (authMode !== "recover-password" || typeof document === "undefined") return undefined;
    const existing = document.head.querySelector('meta[name="referrer"]') as HTMLMetaElement | null;
    const previousContent = existing?.content;
    const meta = existing || document.createElement("meta");
    if (!existing) {
      meta.name = "referrer";
      document.head.appendChild(meta);
    }
    meta.content = "no-referrer";
    return () => {
      if (existing) {
        if (previousContent === undefined) existing.removeAttribute("content");
        else existing.content = previousContent;
      } else {
        meta.remove();
      }
    };
  }, [authMode]);

  function navigateToMode(mode: AuthMode, nextHref: string) {
    if (mode === authMode) return;
    if (typeof window !== "undefined") {
      try {
        window.history.pushState({}, "", localizedHref(nextHref));
      } catch {
        // Studio iframe navigation can reject history updates.
      }
    }
    setAuthMode(mode);
    setStatus("idle");
  }

  function switchTab(tab: "login" | "register") {
    if (tab === activeTab) return;
    navigateToMode(
      tab,
      localizedHref(
        tab === "register"
          ? href(props, "registerTabHref")
          : href(props, "loginHref"),
      ),
    );
  }

  function navigateToLogin() {
    navigateToMode("login", href(props, "loginHref"));
  }

  async function submit(event: Event) {
    event.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    try {
      if (authMode === "forgot-password") {
        const success = await forgotPassword(customerStore, email);
        setStatus(success ? "success" : "error");
        return;
      }

      if (authMode === "recover-password") {
        if (password !== passwordAgain) {
          setStatus("mismatch");
          return;
        }
        if (!recoveryToken) {
          setStatus("error");
          return;
        }
        const success = await recoverPassword(
          customerStore,
          password,
          passwordAgain,
          recoveryToken,
        );
        setStatus(success ? "success" : "error");
        if (success) setTimeout(navigateToLogin, 800);
        return;
      }

      const result = activeTab === "login"
        ? await customerLogin(customerStore, email, password)
        : await register(
            customerStore,
            firstName,
            lastName,
            email,
            password,
            props.showMarketingConsent !== false && marketingAccepted,
            [],
            null,
          );
      if (result.isSuccess) {
        setStatus("success");
        if (typeof window !== "undefined") {
          try {
            sessionStorage.removeItem("tm_studio_logged_out");
            localStorage.removeItem("tm_customer_name");
            localStorage.removeItem("tm_customer_cache");
            sessionStorage.removeItem("tm_customer_cache");
          } catch {}
        }
        setTimeout(() => Router.navigate(href(props, "accountHref")), 350);
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    } finally {
      setStatus((current) => (current === "loading" ? "error" : current));
    }
  }

  const image = imageSource(props.backgroundImageUrl, defaultAuthImage);
  const style = {
    "--tma-auth-bg": themeColor(
      props.backgroundColor,
      "#FAFAF7",
      "--tm-theme-bg",
      ["#ffffff", "#fff"],
    ),
    "--tma-auth-panel": themeColor(
      props.panelColor,
      "#F1F1EC",
      "--tm-theme-panel",
      ["#ffffff", "#fff"],
    ),
    "--tma-auth-text": themeColor(
      props.textColor,
      "#0E0E0C",
      "--tm-theme-text",
      ["#000000", "#111111"],
    ),
    "--tma-auth-muted": themeColor(
      props.mutedTextColor,
      "#55554e",
      "--tm-theme-sub",
      ["#686b77", "#777777"],
    ),
    "--tma-auth-line": themeColor(
      props.lineColor,
      "#E6E6E0",
      "--tm-theme-line",
      ["#d6d7dc", "#e5e5e5"],
    ),
    "--tma-auth-accent": themeColor(
      props.accentColor,
      "#C7F136",
      "--tm-theme-accent",
      ["#dbfa37"],
    ),
    "--tma-auth-button-text": themeColor(
      props.buttonTextColor,
      "#0E0E0C",
      "--tm-theme-text",
      ["#ffffff", "#fff"],
    ),
    "--tma-auth-dark": "var(--tm-theme-dark, #0E0E0C)",
    "--tma-auth-visual": `url(${image})`,
    "--tma-auth-brand-label": JSON.stringify(props.brandText?.trim() ?? ""),
  } as any; // CSS-in-JS: dynamic CSS custom properties for theme styling

  return (
    <section className="three-mash-auth-page tma-login-page" style={style}>
      <link rel="preload" as="font" href="https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa25L7SUc.woff2" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" as="font" href="https://fonts.gstatic.com/s/spacegrotesk/v22/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj4PVnsqPMBTTA.woff2" type="font/woff2" crossOrigin="anonymous" />
      <style dangerouslySetInnerHTML={{ __html: authCriticalStyles }} />
      <div className="tma-auth-panel">
        <form
          className={`tma-auth-form${activeTab === "register" ? " is-register" : ""}${authMode === "forgot-password" || authMode === "recover-password" ? " is-secondary" : ""}${isFormReady ? "" : " is-initial-loading"}`}
          onSubmit={submit}
        >
          <div className="tma-auth-copy">
            <span>
              {authMode === "forgot-password"
                ? localizedText(props, "forgotPasswordEyebrowText")
                : authMode === "recover-password"
                  ? localizedText(props, "recoverPasswordEyebrowText")
                  : localizedText(props, "eyebrowText")}
            </span>
            <h1>
              {authMode === "forgot-password"
                ? localizedText(props, "forgotPasswordTitleText")
                : authMode === "recover-password"
                  ? localizedText(props, "recoverPasswordTitleText")
                  : localizedText(props, "titleText")}
            </h1>
            <p>
              {authMode === "forgot-password"
                ? localizedText(props, "forgotPasswordDescriptionText")
                : authMode === "recover-password"
                  ? localizedText(props, "recoverPasswordDescriptionText")
                  : localizedText(props, "subtitleText")}
            </p>
          </div>

          <div className="tma-auth-initial-loader" aria-hidden="true">
            <span className="tma-auth-form-spinner" />
          </div>

          {(authMode === "login" || authMode === "register") && <div className="tma-auth-tabs">
            <button
              className={activeTab === "login" ? "is-active" : ""}
              type="button"
              onClick={() => switchTab("login")}
            >
              {localizedText(props, "loginTabText")}
            </button>
            <button
              className={activeTab === "register" ? "is-active" : ""}
              type="button"
              onClick={() => switchTab("register")}
            >
              {localizedText(props, "registerTabText")}
            </button>
          </div>}

          {(authMode === "forgot-password" || authMode === "recover-password") && (
            <h2 className="tma-auth-secondary-title">
              {authMode === "forgot-password"
                ? localizedText(props, "forgotPasswordTitleText")
                : localizedText(props, "recoverPasswordTitleText")}
            </h2>
          )}

          {authMode === "forgot-password" ? (
            <label className="tma-auth-field">
              <span>* {localizedText(props, "forgotPasswordEmailLabel")}</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                required
                onInput={(event) =>
                  setEmail((event.currentTarget as HTMLInputElement).value)
                }
              />
            </label>
          ) : authMode === "recover-password" ? (
            <>
              <label className="tma-auth-field">
                <span>* {localizedText(props, "recoverPasswordLabel")}</span>
                <input
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  required
                  onInput={(event) =>
                    setPassword((event.currentTarget as HTMLInputElement).value)
                  }
                />
              </label>
              <label className="tma-auth-field">
                <span>* {localizedText(props, "recoverPasswordConfirmLabel")}</span>
                <input
                  name="passwordAgain"
                  type="password"
                  autoComplete="new-password"
                  value={passwordAgain}
                  required
                  onInput={(event) =>
                    setPasswordAgain((event.currentTarget as HTMLInputElement).value)
                  }
                />
              </label>
            </>
          ) : activeTab === "login" ? (
            <>
              <label className="tma-auth-field">
                <span>* {localizedText(props, "emailLabel")}</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  required
                  onInput={(event) =>
                    setEmail((event.currentTarget as HTMLInputElement).value)
                  }
                />
              </label>

              <label className="tma-auth-field">
                <span>* {localizedText(props, "passwordLabel")}</span>
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  required
                  onInput={(event) =>
                    setPassword((event.currentTarget as HTMLInputElement).value)
                  }
                />
              </label>
            </>
          ) : (
            <>
              <label className="tma-auth-field">
                <span>* {localizedText(props, "firstNameLabel")}</span>
                <input
                  name="firstName"
                  autoComplete="given-name"
                  value={firstName}
                  required
                  onInput={(event) =>
                    setFirstName((event.currentTarget as HTMLInputElement).value)
                  }
                />
              </label>

              <label className="tma-auth-field">
                <span>* {localizedText(props, "lastNameLabel")}</span>
                <input
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  required
                  onInput={(event) =>
                    setLastName((event.currentTarget as HTMLInputElement).value)
                  }
                />
              </label>

              <label className="tma-auth-field">
                <span>* {localizedText(props, "emailLabel")}</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  required
                  onInput={(event) =>
                    setEmail((event.currentTarget as HTMLInputElement).value)
                  }
                />
              </label>

              <label className="tma-auth-field">
                <span>* {localizedText(props, "passwordLabel")}</span>
                <input
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  required
                  onInput={(event) =>
                    setPassword((event.currentTarget as HTMLInputElement).value)
                  }
                />
              </label>

              <label className="tma-auth-check">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  required
                  onInput={(event) =>
                    setTermsAccepted((event.currentTarget as HTMLInputElement).checked)
                  }
                />
                <span>
                  <a href={href(props, "membershipAgreementHref")}>
                    {localizedText(props, "termsMembershipText")}
                  </a>{" "}
                  {localizedText(props, "termsAndText")}{" "}
                  <a href={href(props, "kvkkNoticeHref")}>
                    {localizedText(props, "termsKvkkText")}
                  </a>{" "}
                  {localizedText(props, "termsAcceptedText")}
                </span>
              </label>

              {props.showMarketingConsent !== false && (
                <label className="tma-auth-check">
                  <input
                    type="checkbox"
                    checked={marketingAccepted}
                    onInput={(event) =>
                      setMarketingAccepted((event.currentTarget as HTMLInputElement).checked)
                    }
                  />
                  <span>
                    {localizedText(props, "marketingIntroText")}{" "}
                    <a href={href(props, "commercialConsentHref")}>
                      {localizedText(props, "marketingConsentText")}
                    </a>{" "}
                    {localizedText(props, "marketingAcceptedText")}
                  </span>
                </label>
              )}
            </>
          )}

          <button
            className="tma-auth-submit"
            type="submit"
            disabled={
              status === "loading" ||
              (activeTab === "register" && !termsAccepted)
            }
          >
            {status === "loading"
              ? authMode === "forgot-password"
                ? localizedText(props, "forgotPasswordSubmittingText")
                : authMode === "recover-password"
                  ? localizedText(props, "recoverPasswordSubmittingText")
                  : activeTab === "login"
                    ? localizedText(props, "loadingText")
                    : localizedText(props, "registerLoadingText")
              : authMode === "forgot-password"
                ? localizedText(props, "forgotPasswordSubmitText")
                : authMode === "recover-password"
                  ? localizedText(props, "recoverPasswordSubmitText")
                  : activeTab === "login"
                    ? localizedText(props, "submitButtonText")
                    : localizedText(props, "registerSubmitButtonText")}
          </button>

          {authMode === "login" && (
            <>
              <div className="tma-auth-password-links">
                {props.showForgotPasswordLink !== false && (
                  <a
                    className="tma-auth-underlink"
                    href={href(props, "forgotPasswordHref")}
                    onClick={(event) => {
                      event.preventDefault();
                      navigateToMode("forgot-password", href(props, "forgotPasswordHref"));
                    }}
                  >
                    {localizedText(props, "forgotPasswordText")}
                  </a>
                )}

                {props.showRecoverPasswordLink !== false && (
                  <a
                    className="tma-auth-underlink"
                    href={href(props, "recoverPasswordHref")}
                    onClick={(event) => {
                      event.preventDefault();
                      navigateToMode("recover-password", href(props, "recoverPasswordHref"));
                    }}
                  >
                    {localizedText(props, "recoverPasswordText")}
                  </a>
                )}
              </div>

              <div className="tma-auth-register-callout">
                <span>
                  {localizedText(props, "registerPromptText")}
                </span>
                <button type="button" onClick={() => switchTab("register")}>
                  {localizedText(props, "registerButtonText")}
                </button>
              </div>
            </>
          )}

          {((authMode === "forgot-password" &&
            props.showForgotPasswordLoginLink !== false) ||
            (authMode === "recover-password" &&
              props.showRecoverPasswordLoginLink !== false)) && (
            <div className="tma-auth-register-callout">
              <span>{authMode === "forgot-password"
                ? localizedText(props, "forgotPasswordLoginPromptText")
                : localizedText(props, "recoverPasswordLoginPromptText")}</span>
              <a
                className="tma-auth-secondary-link"
                href={href(props, "loginHref")}
                onClick={(event) => {
                  event.preventDefault();
                  navigateToLogin();
                }}
              >
                {authMode === "forgot-password"
                  ? localizedText(props, "forgotPasswordLoginLinkText")
                  : localizedText(props, "recoverPasswordLoginLinkText")}
              </a>
            </div>
          )}

          {status !== "idle" && (
            <p className={`tma-auth-status is-${status === "mismatch" ? "error" : status}`}>
              {status === "success"
                ? authMode === "forgot-password"
                  ? localizedText(props, "forgotPasswordSuccessText")
                  : authMode === "recover-password"
                    ? localizedText(props, "recoverPasswordSuccessText")
                    : localizedText(props, "successMessage")
                : status === "mismatch"
                  ? localizedText(props, "recoverPasswordMismatchText")
                : status === "error"
                  ? authMode === "forgot-password"
                    ? localizedText(props, "forgotPasswordErrorText")
                    : authMode === "recover-password"
                      ? localizedText(props, "recoverPasswordErrorText")
                      : localizedText(props, "errorMessage")
                  : authMode === "forgot-password"
                    ? localizedText(props, "forgotPasswordSubmittingText")
                    : authMode === "recover-password"
                      ? localizedText(props, "recoverPasswordSubmittingText")
                      : activeTab === "login"
                        ? localizedText(props, "loadingText")
                        : localizedText(props, "registerLoadingText")}
            </p>
          )}

        </form>
      </div>

    </section>
  );
}

export default ThreeMashAccountPage;
