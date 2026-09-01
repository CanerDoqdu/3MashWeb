import { tLocalized } from "../../utils/i18n";
import { useState } from "preact/hooks";
import {
  customerLogin,
  customerStore,
  initCustomerStore,
  Router,
  type IkasImage,
} from "@ikas/bp-storefront";
import { Props } from "./types";

// Eagerly start the customer store so it's ready when the user logs in
// and navigates to /account pages — avoids the loading flash entirely.
if (typeof window !== "undefined" && !customerStore._initialized) {
  initCustomerStore(customerStore).catch(() => {});
}


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
  const next = value?.trim();
  return next && next !== "#" ? next : fallback;
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

export function ThreeMashAccountPage(props: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function submit(event: Event) {
    event.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    const result = await customerLogin(customerStore, email, password);
    if (result.isSuccess) {
      setStatus("success");
      if (typeof window !== "undefined" && customerStore.customer) {
        try {
          // PII storage disabled: customer name should not be cached client-side
          localStorage.removeItem("tm_customer_name");
          localStorage.removeItem("tm_customer_cache");
          sessionStorage.removeItem("tm_customer_cache");
        } catch {}
      }
      setTimeout(() => Router.navigate("/account"), 350);
      return;
    }
    setStatus("error");
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
  } as any;

  return (
    <section className="three-mash-auth-page tma-login-page" style={style}>
      <div className="tma-auth-panel">
        <form className="tma-auth-form" onSubmit={submit}>
          <div className="tma-auth-copy">
            <span>{text(props.eyebrowText, "HESAP")}</span>
            <h1>{text(props.titleText, tLocalized("3mash hesabınıza giriş yapın.", "Log in to your 3mash account."))}</h1>
            <p>
              {text(
                props.subtitleText,
                tLocalized("Siparişlerinizi, favorilerinizi ve hesap bilgilerinizi tek yerden yönetin.", "Manage your orders, favorites, and account information from one place."),
              )}
            </p>
          </div>

          <div className="tma-auth-tabs">
            <span className="is-active">
              {text(props.loginTabText, tLocalized("Üye Girişi", "Member Login"))}
            </span>
            <a href={href(props.registerTabHref, "/account/register")}>
              {text(props.registerTabText, tLocalized("Üye Ol", "Register"))}
            </a>
          </div>

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

          <button
            className="tma-auth-submit"
            type="submit"
            disabled={status === "loading"}
          >
            {status === "loading"
              ? text(props.loadingText, tLocalized("Giriş yapılıyor...", "Logging in..."))
              : text(props.submitButtonText, tLocalized("Üye Girişi", "Member Login"))}
          </button>

          <a
            className="tma-auth-underlink"
            href={href(props.forgotPasswordHref, "/account/forgot-password")}
          >
            {text(props.forgotPasswordText, tLocalized("Parolamı Unuttum", "Forgot My Password"))}
          </a>

          <div className="tma-auth-register-callout">
            <span>
              {text(props.registerPromptText, tLocalized("Henüz hesabınız yok mu?", "Don't have an account yet?"))}
            </span>
            <a href={href(props.registerButtonHref, "/account/register")}>
              {text(props.registerButtonText, tLocalized("Hesap oluştur", "Create Account"))}
            </a>
          </div>

          {status !== "idle" && (
            <p className={`tma-auth-status is-${status}`}>
              {status === "success"
                ? text(
                    props.successMessage,
                    tLocalized("Giriş başarılı. Hesabınıza yönlendiriliyorsunuz.", "Login successful. You are being redirected to your account."),
                  )
                : status === "error"
                  ? text(
                      props.errorMessage,
                      tLocalized("Email veya şifre hatalı. Lütfen bilgilerinizi kontrol edin.", "Email or password is incorrect. Please check your details."),
                    )
                  : text(props.loadingText, tLocalized("Giriş yapılıyor...", "Logging in..."))}
            </p>
          )}
        </form>
      </div>

      <div className="tma-auth-image" aria-hidden="true">
        <img src={image} alt="" />
      </div>
    </section>
  );
}

export default ThreeMashAccountPage;
