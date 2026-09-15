


import { localizedHref, tLocalized } from "../../utils/i18n";
import { safeNavigationHref, safeRedirect } from "../../utils/safeRedirect";
import { useEffect, useLayoutEffect, useState } from "preact/hooks";
  
import {
  customerLogin,
  customerStore,
  forgotPassword,
  register,
  recoverPassword,
  initCustomerStore,
  Router,
  type IkasImage,
} from "@ikas/bp-storefront";
import { Props } from "./types";
import authCriticalStyles from "../authCriticalStyles";
import forgotPasswordBgImage from "../../assets/forgot-password-bg-data";

const defaultAuthImage =
  "https://cdn.myikas.com/images/theme-images/a6f9541f-702d-431d-9744-9d4f494c94af/image_1080.webp";
const logoImageIds = [
  "4a6af8e2-cb7c-4cc8-ba17-13656d4b8670",
  "b87e4343-0ef5-4084-b8b0-1b60abeb1012",
  "de819199-332c-407c-82de-917418b2c2e1",
];

function text(value: string | undefined, fallback: string) {
  return value?.trim() || fallback;
}

function href(value: string | undefined, fallback: string) {
  return safeNavigationHref(localizedHref(value || fallback), fallback);
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
console.log("LOGIN PAGE BUILD CHECK — v2 with initCustomerStore fix");
function EyeIcon({ visible }: { visible: boolean }) {
  if (visible) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  );
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

export function ThreeMashAccountPage(props: Props) {
  type AuthMode = "login" | "register" | "forgot-password" | "recover-password";
  const [authMode, setAuthMode] = useState<AuthMode>(() => {
    const propMode = (props as any)?.mode;
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
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [marketingAccepted, setMarketingAccepted] = useState(false);
  const [recoveryToken, setRecoveryToken] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
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
  navigateToMode(
    tab,
    tab === "register" ? (props.registerTabHref || "/account/register") : "/account/login",
  );
}

function navigateToLogin() {
  navigateToMode("login", "/account/login"); // localizedHref'i navigateToMode zaten uyguluyor
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
        if (password !== passwordAgain || !recoveryToken) {
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
        : await register(customerStore, firstName, lastName, email, password, marketingAccepted, [], null);
          if (result.isSuccess) {
        setStatus("success");
        if (typeof window !== "undefined") {
          try {
            sessionStorage.removeItem("tm_studio_logged_out");
            localStorage.removeItem("tm_customer_name");
            localStorage.removeItem("tm_customer_cache");
            sessionStorage.removeItem("tm_customer_cache");
          } catch { }
        }
        try {
          await initCustomerStore(customerStore);
        } catch { }
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("3mash-auth-updated"));
        }
        setTimeout(() => {
          Router.navigate(localizedHref("/account"));
        }, 350);
        return;
      }
  
      setStatus("error");
    } catch {
      setStatus("error");
    } finally {
      setStatus((current) => (current === "loading" ? "error" : current));
    }
  }

  const image = imageSource(
    props.backgroundImageUrl,
    authMode === "forgot-password" ? forgotPasswordBgImage : defaultAuthImage,
  );
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
      "#DBFA37",
      "--tm-theme-accent",
      ["#c7f136"],
    ),
    "--tma-auth-button-text": themeColor(
      props.buttonTextColor,
      "#0E0E0C",
      "--tm-theme-text",
      ["#ffffff", "#fff"],
    ),
    "--tma-auth-dark": "var(--tm-theme-dark, #0E0E0C)",
    "--tma-auth-visual": `url(${image})`,
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
            <span>{text(props.eyebrowText, "HESAP")}</span>
            <h1>{authMode === "forgot-password"
              ? tLocalized("Şifremi Unuttum", "Forgot Password")
              : authMode === "recover-password"
                ? tLocalized("Şifremi Kurtar", "Recover Password")
                : text(props.titleText, tLocalized("3mash hesabınıza giriş yapın.", "Log in to your 3mash account."))}</h1>
            <p>
              {authMode === "forgot-password"
                ? tLocalized("Email adresinizi girin; şifre yenileme bağlantısını size gönderelim.", "Enter your email and we will send you a password reset link.")
                : authMode === "recover-password"
                  ? tLocalized("Yeni şifrenizi belirleyin ve hesabınıza güvenli şekilde tekrar erişin.", "Set a new password and securely access your account again.")
                  : text(
                    props.subtitleText,
                    tLocalized("Siparişlerinizi, favorilerinizi ve hesap bilgilerinizi tek yerden yönetin.", "Manage your orders, favorites, and account information from one place."),
                  )}
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
              {text(props.loginTabText, tLocalized("Üye Girişi", "Member Login"))}
            </button>
            <button
              className={activeTab === "register" ? "is-active" : ""}
              type="button"
              onClick={() => switchTab("register")}
            >
              {text(props.registerTabText, tLocalized("Üye Ol", "Register"))}
            </button>
          </div>}

          {(authMode === "forgot-password" || authMode === "recover-password") && (
            <h2 className="tma-auth-secondary-title">
              {authMode === "forgot-password"
                ? tLocalized("Şifremi Unuttum", "Forgot Password")
                : tLocalized("Şifremi Kurtar", "Recover Password")}
            </h2>
          )}

          {authMode === "forgot-password" ? (
            <label className="tma-auth-field">
              <span>* {tLocalized("Email", "E-mail")}</span>
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
                <span>* {tLocalized("Şifre", "Password")}</span>
                <div className="tma-password-wrap">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={password}
                    required
                    onInput={(event) =>
                      setPassword((event.currentTarget as HTMLInputElement).value)
                    }
                  />
                  <button
                    type="button"
                    className="tma-password-toggle"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? tLocalized("Şifreyi gizle", "Hide password") : tLocalized("Şifreyi göster", "Show password")}
                    tabIndex={-1}
                  >
                    <EyeIcon visible={showPassword} />
                  </button>
                </div>
              </label>
              <label className="tma-auth-field">
                <span>* {tLocalized("Şifre Tekrar", "Confirm Password")}</span>
                <div className="tma-password-wrap">
                  <input
                    name="passwordAgain"
                    type={showPasswordAgain ? "text" : "password"}
                    autoComplete="new-password"
                    value={passwordAgain}
                    required
                    onInput={(event) =>
                      setPasswordAgain((event.currentTarget as HTMLInputElement).value)
                    }
                  />
                  <button
                    type="button"
                    className="tma-password-toggle"
                    onClick={() => setShowPasswordAgain((prev) => !prev)}
                    aria-label={showPasswordAgain ? tLocalized("Şifreyi gizle", "Hide password") : tLocalized("Şifreyi göster", "Show password")}
                    tabIndex={-1}
                  >
                    <EyeIcon visible={showPasswordAgain} />
                  </button>
                </div>
              </label>
            </>
          ) : activeTab === "login" ? (
            <>
              <label className="tma-auth-field">
                <span>* {text(props.emailLabel, tLocalized("Email", "E-mail"))}</span>
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
                <span>* {text(props.passwordLabel, tLocalized("Şifre", "Password"))}</span>
                <div className="tma-password-wrap">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    required
                    onInput={(event) =>
                      setPassword((event.currentTarget as HTMLInputElement).value)
                    }
                  />
                  <button
                    type="button"
                    className="tma-password-toggle"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? tLocalized("Şifreyi gizle", "Hide password") : tLocalized("Şifreyi göster", "Show password")}
                    tabIndex={-1}
                  >
                    <EyeIcon visible={showPassword} />
                  </button>
                </div>
              </label>
            </>
          ) : (
            <>
              <label className="tma-auth-field">
                <span>* {tLocalized("Ad", "First Name")}</span>
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
                <span>* {tLocalized("Soyad", "Last Name")}</span>
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
                <span>* {text(props.emailLabel, tLocalized("Email", "E-mail"))}</span>
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
                <span>* {text(props.passwordLabel, tLocalized("Şifre", "Password"))}</span>
                <div className="tma-password-wrap">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={password}
                    required
                    onInput={(event) =>
                      setPassword((event.currentTarget as HTMLInputElement).value)
                    }
                  />
                  <button
                    type="button"
                    className="tma-password-toggle"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? tLocalized("Şifreyi gizle", "Hide password") : tLocalized("Şifreyi göster", "Show password")}
                    tabIndex={-1}
                  >
                    <EyeIcon visible={showPassword} />
                  </button>
                </div>
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
                  <a href="/pages/uyelik-sozlesmesi">{tLocalized("Üyelik Sözleşmesi", "Membership Agreement")}</a>{" "}
                  {tLocalized("ve", "and")}{" "}
                  <a href="/pages/gizlilik-politikasi-ve-kvkk">{tLocalized("KVKK Aydınlatma Metni", "KVKK Clarification Text")}</a>{" "}
                  {tLocalized("'ni okudum, kabul ediyorum. ", "have been read and agreed to. *")}
                </span>
              </label>

              <label className="tma-auth-check">
                <input
                  type="checkbox"
                  checked={marketingAccepted}
                  onInput={(event) =>
                    setMarketingAccepted((event.currentTarget as HTMLInputElement).checked)
                  }
                />
                <span>
                  {tLocalized("Kampanya, indirim ve duyurulardan haberdar olmak için", "To be informed about campaigns and updates,")}{" "}
                  <a href="/pages/ticari-elektronik-ileti-onayi">{tLocalized("Ticari Elektronik İleti Onayı", "Commercial Electronic Message Consent")}</a>{" "}
                  {tLocalized("metnini okudum, onaylıyorum. Tarafıma ticari elektronik ileti gönderilmesini kabul ediyorum. ", "text, I have read and agree to receive commercial electronic messages. *")}
                </span>
              </label>
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
              ? text(
                props.loadingText,
                activeTab === "login"
                  ? tLocalized("Giriş yapılıyor...", "Logging in...")
                  : tLocalized("Kaydınız oluşturuluyor...", "Creating account..."),
              )
              : authMode === "forgot-password"
                ? tLocalized("Gönder", "Send")
                : authMode === "recover-password"
                  ? tLocalized("Şifreyi Güncelle", "Update Password")
                  : activeTab === "login"
                    ? text(props.submitButtonText, tLocalized("Giriş Yap", "Sign In"))
                    : tLocalized("Hesap Oluştur", "Create Account")}
          </button>

          {authMode === "login" && (
            <>
              <div className="tma-auth-password-links">
                <a
                  className="tma-auth-underlink"
                  href={href(props.forgotPasswordHref, "/account/forgot-password")}
                  onClick={(event) => {
                    event.preventDefault();
                    navigateToMode("forgot-password", href(props.forgotPasswordHref, "/account/forgot-password"));
                  }}
                >
                  {text(props.forgotPasswordText, tLocalized("Parolamı Unuttum", "Forgot My Password"))}
                </a>

                <a
                  className="tma-auth-underlink"
                  href={href(props.recoverPasswordHref, "/account/recover-password")}
                  onClick={(event) => {
                    event.preventDefault();
                    navigateToMode("recover-password", href(props.recoverPasswordHref, "/account/recover-password"));
                  }}
                >
                  {text(props.recoverPasswordText, tLocalized("Şifremi Kurtar", "Recover Password"))}
                </a>
              </div>

              <div className="tma-auth-register-callout">
                <span>
                  {text(props.registerPromptText, tLocalized("Henüz hesabınız yok mu?", "Don't have an account yet?"))}
                </span>
                <button type="button" onClick={() => switchTab("register")}>
                  {text(props.registerButtonText, tLocalized("Hesap oluştur", "Create Account"))}
                </button>
              </div>
            </>
          )}

          {(authMode === "forgot-password" || authMode === "recover-password") && (
            <div className="tma-auth-register-callout">
              <span>
                {tLocalized("Hesabınıza giriş yapın", "Log in to your account")}
              </span>
              <a
                className="tma-auth-secondary-link"
                href={localizedHref("/account/login")}
                onClick={(event) => {
                  event.preventDefault();
                  navigateToLogin();
                }}
              >
                {tLocalized("Üye Girişi", "Member Login")}
              </a>
            </div>
          )}

          {status !== "idle" && (
            <p className={`tma-auth-status is-${status}`}>
              {status === "success"
                ? authMode === "forgot-password"
                  ? tLocalized("Şifre yenileme bağlantısı email adresinize gönderildi.", "The password reset link was sent to your email.")
                  : authMode === "recover-password"
                    ? tLocalized("Şifreniz güncellendi. Giriş sayfasına yönlendiriliyorsunuz.", "Your password was updated. Redirecting to login.")
                    : text(
                      props.successMessage,
                      tLocalized("Giriş başarılı. Hesabınıza yönlendiriliyorsunuz.", "Login successful. You are being redirected to your account."),
                    )
                : status === "error"
                  ? authMode === "forgot-password"
                    ? tLocalized("İşlem tamamlanamadı. Email adresinizi kontrol edin.", "The request could not be completed. Check your email address.")
                    : authMode === "recover-password"
                      ? tLocalized("Şifreler eşleşmiyor veya bağlantı geçersiz.", "The passwords do not match or the link is invalid.")
                      : text(
                        props.errorMessage,
                        tLocalized("Email veya şifre hatalı. Lütfen bilgilerinizi kontrol edin.", "Email or password is incorrect. Please check your details."),
                      )
                  : text(props.loadingText, tLocalized("Giriş yapılıyor...", "Logging in..."))}
            </p>
          )}

        </form>
      </div>

    </section>
  );
}

export default ThreeMashAccountPage;
