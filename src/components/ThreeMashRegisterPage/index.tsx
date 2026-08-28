import { useState } from "preact/hooks";
import {
  customerStore,
  register,
  Router,
  type IkasImage,
} from "@ikas/bp-storefront";
import { Props } from "./types";
import { t, tLocalized, tProp } from "../../utils/i18n";

const defaultAuthImage =
  "https://cdn.myikas.com/images/theme-images/a6f9541f-702d-431d-9744-9d4f494c94af/image_1080.webp";
const logoImageIds = [
  "4a6af8e2-cb7c-4cc8-ba17-13656d4b8670",
  "b87e4343-0ef5-4084-b8b0-1b60abeb1012",
  "de819199-332c-407c-82de-917418b2c2e1",
];

function text(value: string | undefined, fallbackTr: string, fallbackEn?: string) {
  return tProp(value, fallbackTr, fallbackEn || fallbackTr);
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

export function ThreeMashRegisterPage(props: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [marketingAccepted, setMarketingAccepted] = useState(true);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function submit(event: Event) {
    event.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    const result = await register(
      customerStore,
      firstName,
      lastName,
      email,
      password,
      marketingAccepted,
      [],
      null,
    );
    if (result.isSuccess) {
      setStatus("success");
      setTimeout(() => Router.navigate("/account"), 350);
      return;
    }
    setStatus("error");
  }

  const image = imageSource(props.backgroundImageUrl, defaultAuthImage);
  const style = {
    "--tmrpg-auth-bg": themeColor(
      props.backgroundColor,
      "#FAFAF7",
      "--tm-theme-bg",
      ["#ffffff", "#fff"],
    ),
    "--tmrpg-auth-panel": themeColor(
      props.panelColor,
      "#F1F1EC",
      "--tm-theme-panel",
      ["#ffffff", "#fff"],
    ),
    "--tmrpg-auth-text": themeColor(
      props.textColor,
      "#0E0E0C",
      "--tm-theme-text",
      ["#000000", "#111111"],
    ),
    "--tmrpg-auth-muted": themeColor(
      props.mutedTextColor,
      "#55554e",
      "--tm-theme-sub",
      ["#686b77", "#777777"],
    ),
    "--tmrpg-auth-line": themeColor(
      props.lineColor,
      "#E6E6E0",
      "--tm-theme-line",
      ["#d6d7dc", "#e5e5e5"],
    ),
    "--tmrpg-auth-accent": themeColor(
      props.accentColor,
      "#C7F136",
      "--tm-theme-accent",
      ["#dbfa37"],
    ),
    "--tmrpg-auth-button-text": themeColor(
      props.buttonTextColor,
      "#0E0E0C",
      "--tm-theme-text",
      ["#ffffff", "#fff"],
    ),
    "--tmrpg-auth-dark": "var(--tm-theme-dark, #0E0E0C)",
    "--tmrpg-auth-visual": `url(${image})`,
  } as any;

  return (
    <section className="three-mash-register-page" style={style}>
      <div className="tmrpg-auth-panel">
        <form className="tmrpg-auth-form" onSubmit={submit}>
          <div className="tmrpg-auth-copy">
            <span>{text(props.eyebrowText, "HESAP", "ACCOUNT")}</span>
            <h1>{text(props.titleText, tLocalized("3mash hesabınızı oluşturun.", "Create your 3mash account."), "Create your 3mash account.")}</h1>
            <p>
              {text(
                props.subtitleText,
                tLocalized("Sipariş, favori ürün ve destek süreçlerinizi hesabınızdan takip edin.", "Track your orders, wishlist items and support requests in your account."),
                "Track your orders, wishlist items and support requests in your account."
              )}
            </p>
          </div>

          <div className="tmrpg-auth-tabs">
            <a href={href(props.loginTabHref, "/account/login")}>
              {text(props.loginTabText, "Üye Girişi", "Sign In")}
            </a>
            <span className="is-active">
              {text(props.registerTabText, tLocalized("Üye Ol", "Register"), "Register")}
            </span>
          </div>

          <label className="tmrpg-auth-field">
            <span>* {text(props.nameLabel, tLocalized("Ad", "First Name"), "First Name")}</span>
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

          <label className="tmrpg-auth-field">
            <span>* {text(props.surnameLabel, tLocalized("Soyad", "Last Name"), "Last Name")}</span>
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

          <label className="tmrpg-auth-field">
            <span>* {text(props.emailLabel, "Email", "Email")}</span>
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

          <label className="tmrpg-auth-field">
            <span>* {text(props.passwordLabel, tLocalized("Şifre", "Password"), "Password")}</span>
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

          <label className="tmrpg-auth-check">
            <input
              type="checkbox"
              checked={marketingAccepted}
              onInput={(event) =>
                setMarketingAccepted(
                  (event.currentTarget as HTMLInputElement).checked,
                )
              }
            />
            <span>
              {t("auth.marketingConsentPrefix", "Kampanyalardan haberdar olmak için")}{" "}
              <a
                href={href(
                  props.marketingHref,
                  "/pages/ticari-elektronik-ileti-onayi",
                )}
              >
                {t("auth.marketingConsentLink", "Ticari Elektronik İleti Onayı")}
              </a>{" "}
              {t("auth.marketingConsentSuffix", "metnini okudum, onaylıyorum. Tarafınızdan gönderilecek ticari elektronik iletileri almak istiyorum.")}
            </span>
          </label>

          <label className="tmrpg-auth-check">
            <input
              type="checkbox"
              checked={termsAccepted}
              required
              onInput={(event) =>
                setTermsAccepted(
                  (event.currentTarget as HTMLInputElement).checked,
                )
              }
            />
            <span>
              <a href={href(props.termsHref, "/pages/uyelik-sozlesmesi")}>
                {t("auth.termsMembershipLink", tLocalized("Üyelik Sözleşmesi", "Membership Agreement"))}
              </a>{" "}
              {t("auth.termsAnd", "ve")}{" "}
              <a href={href(props.kvkkHref, "/pages/gizlilik-politikasi-ve-kvkk")}>
                {t("auth.termsKvkkLink", tLocalized("KVKK Aydınlatma Metni", "KVKK Clarification Text"))}
              </a>
              {t("auth.termsSuffix", "ni okudum, kabul ediyorum.")}
            </span>
          </label>

          <button
            className="tmrpg-auth-submit"
            type="submit"
            disabled={status === "loading" || !termsAccepted}
          >
            {status === "loading"
              ? text(props.loadingText, tLocalized("Kaydınız oluşturuluyor...", "Creating account..."), "Creating account...")
              : text(props.submitButtonText, tLocalized("Hesap Oluştur", "Create Account"), "Create Account")}
          </button>

          {status !== "idle" && (
            <p className={`tmrpg-auth-status is-${status}`}>
              {status === "success"
                ? text(
                    props.successMessage,
                    tLocalized("Kaydınız oluşturuldu. Hesabınıza yönlendiriliyorsunuz.", "Account created successfully. Redirecting to your account."),
                    "Account created successfully. Redirecting to your account."
                  )
                : status === "error"
                  ? text(
                      props.errorMessage,
                      tLocalized("Kayıt tamamlanamadı. Lütfen bilgilerinizi kontrol edin.", "Registration failed. Please check your information."),
                      "Registration failed. Please check your information."
                    )
                  : text(props.loadingText, tLocalized("Kaydınız oluşturuluyor...", "Creating account..."), "Creating account...")}
            </p>
          )}

          <div className="tmrpg-auth-login-callout">
            <span>
              {text(props.loginPromptText, tLocalized("Zaten hesabınız var mı?", "Already have an account?"), "Already have an account?")}
            </span>
            <a href={href(props.loginButtonHref, "/account/login")}>
              {text(props.loginButtonText, tLocalized("Giriş yap", "Sign in"), "Sign in")}
            </a>
          </div>
        </form>
      </div>

      <div className="tmrpg-auth-image" aria-hidden="true">
        <img src={image} alt="" />
      </div>
    </section>
  );
}

export default ThreeMashRegisterPage;
