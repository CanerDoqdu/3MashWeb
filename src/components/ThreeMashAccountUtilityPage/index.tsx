import { useEffect, useMemo, useState } from "preact/hooks";
import type { ComponentChildren } from "preact";

import {
  createMediaSrcset,
  customerStore,
  forgotPassword,
  getCustomerAddressText,
  getDefaultSrc,
  getFavoriteProducts,
  getOrders,
  getProductHref,
  getProductVariantFormattedFinalPrice,
  getProductVariantMainImage,
  getSelectedProductVariant,
  initCustomerStore,
  recoverPassword,
  Router,
  saveCustomer,
  type IkasCustomer,
  type IkasCustomerAddress,
  type IkasImage,
  type IkasOrder,
  type IkasProduct,
} from "@ikas/bp-storefront";

import forgotPasswordBgImage from "../../assets/forgot-password-bg-data";
import ThreeMashAccountLayout from "../ThreeMashAccountLayout";
import { Props } from "./types";
import type { Props as AccountInfoProps } from "../ThreeMashAccountInfoPage/types";

const defaultAuthImage = forgotPasswordBgImage;


// ─── Customer store eager init ─────────────────────────────────────────────
// We start initializing the customer store the moment this module is imported
// (i.e. on page load), not when the user eventually clicks an account link.
// A tiny sync-readable wrapper lets the component know whether the promise
// has already resolved so it can skip the loading state on first render.
let customerStoreInitPromise: Promise<void> | null = null;
let customerStoreInitResolved = false;

function ensureCustomerStoreReady() {
  if (!customerStoreInitPromise) {
    customerStoreInitPromise = initCustomerStore(customerStore).then(() => {
      customerStoreInitResolved = true;
    });
  }
  return customerStoreInitPromise;
}

// Kick off eagerly — browser only.
if (typeof window !== "undefined" && !customerStore._initialized) {
  ensureCustomerStoreReady();
} else if (typeof window !== "undefined") {
  customerStoreInitResolved = true;
}

type DashboardProps = Props & Partial<AccountInfoProps>;
const criticalAccountCss = `
.tmau-page,
.tmau-auth,
.three-mash-account-info-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  overflow-x: clip;
  background: var(--tmai-bg, var(--tm-theme-bg, #fafaf7));
  color: var(--tmai-text, var(--tm-theme-text, #0e0e0c));
  font-family: var(--tm-theme-font-body, "Inter", system-ui, sans-serif);
}

.tmau-page *,
.tmau-page *::before,
.tmau-page *::after,
.tmau-auth *,
.tmau-auth *::before,
.tmau-auth *::after,
.three-mash-account-info-page *,
.three-mash-account-info-page *::before,
.three-mash-account-info-page *::after {
  box-sizing: border-box;
}

.tmau-shell,
.tmai-shell,
.three-mash-account-layout {
  display: grid;
  grid-template-columns: minmax(280px, 0.42fr) minmax(0, 1fr);
  gap: 24px;
  align-items: stretch;
  width: 100%;
  max-width: min(var(--tmai-max, 1180px), 1180px);
  margin: 0 auto;
  min-height: 0;
  padding: 20px 10px 10px;
}

.tmau-sidebar,
.tmai-sidebar,
.tmau-main,
.tmai-main {
  min-width: 0;
  width: 100%;
}

.tmau-sidebar,
.tmai-sidebar {
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: clamp(34px, 4vw, 48px);
  background: var(--tmai-dark, var(--tm-theme-dark, #0e0e0c));
  color: var(--tm-theme-bg, #fafaf7);
}

.tmau-main,
.tmai-main {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: clamp(34px, 4vw, 48px);
  background: #fff;
  border: 1px solid var(--tmai-line, var(--tm-theme-line, #e6e6e0));
}

.tmau-main-head,
.tmai-form-head {
  display: grid;
  gap: 14px;
  min-width: 0;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--tmai-line, var(--tm-theme-line, #e6e6e0));
}

.tmau-main-head h1,
.tmai-form-head h1 {
  margin: 0;
  color: var(--tmai-text, var(--tm-theme-text, #0e0e0c));
  font-size: clamp(34px, 4vw, 56px);
  line-height: 1;
  font-weight: 800;
}

@media (max-width: 980px) {
  .tmau-shell,
  .tmai-shell,
  .three-mash-account-layout {
    grid-template-columns: 1fr;
    gap: 18px;
    padding: 34px 18px var(--tmai-pad-bottom, 86px);
  }
}

@media (max-width: 768px) {
  .tmau-shell,
  .tmai-shell,
  .three-mash-account-layout {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 20px 12px 64px;
  }

  .tmau-sidebar,
  .tmai-sidebar,
  .tmau-main,
  .tmai-main {
    padding: 24px 16px;
  }
}
`;



type AccountForm = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

type FormStatus = "idle" | "loading" | "success" | "error";

const phoneCountries = [
  { iso: "TR", name: "Türkiye", dialCode: "+90" },
  { iso: "US", name: "United States", dialCode: "+1" },
  { iso: "GB", name: "United Kingdom", dialCode: "+44" },
  { iso: "DE", name: "Germany", dialCode: "+49" },
  { iso: "FR", name: "France", dialCode: "+33" },
  { iso: "NL", name: "Netherlands", dialCode: "+31" },
  { iso: "IT", name: "Italy", dialCode: "+39" },
  { iso: "ES", name: "Spain", dialCode: "+34" },
  { iso: "AE", name: "United Arab Emirates", dialCode: "+971" },
  { iso: "SA", name: "Saudi Arabia", dialCode: "+966" },
  { iso: "IQ", name: "Iraq", dialCode: "+964" },
  { iso: "AZ", name: "Azerbaijan", dialCode: "+994" },
  { iso: "SL", name: "Sierra Leone", dialCode: "+232" },
];

function isStudioEnvironment() {
  if (typeof window === "undefined") return false;

  return (
    window.location.hostname.includes("ikasapps.com") ||
    window.location.hostname.includes("myikas.com") ||
    window.location.search.includes("studio=") ||
    window.location.search.includes("preview=") ||
    document.referrer.includes("ikasapps.com") ||
    document.referrer.includes("myikas.com") ||
    (typeof window.parent !== "undefined" && window.parent !== window)
  );
}

const mockStudioCustomer: IkasCustomer = {
  id: "studio-preview-customer",
  firstName: "Caner",
  lastName: "Doğdu",
  email: "info@3mash.com",
  phone: "+905321234567",
  addresses: [
    {
      id: "addr-studio-1",
      title: "Ofis Adresi",
      address: "Antalya Teknokent, Ar-Ge 2 Binası, Konyaaltı",
      city: { name: "Antalya" } as any,
      district: { name: "Konyaaltı" } as any,
      country: { name: "Türkiye" } as any,
      postalCode: "07070",
      firstName: "Caner",
      lastName: "Doğdu",
      phone: "+905321234567",
    } as any,
  ],
  favoriteProducts: [],
} as any;

const mockStudioOrders: IkasOrder[] = [
  {
    id: "ord-studio-1",
    orderNumber: "3M-892410",
    orderedAt: Date.now() - 86400000 * 2,
    totalFinalPrice: 18750,
    currencySymbol: "₺",
    currencyCode: "TRY",
  } as any,
];

function text(value: string | undefined, fallback: string) {
  return value?.trim() || fallback;
}

function href(value: string | undefined, fallback: string) {
  const next = value?.trim();
  return next && next !== "#" ? next : fallback;
}

function numeric(
  value: number | undefined,
  fallback: number,
  min: number,
  max: number,
) {
  const next = typeof value === "number" ? value : Number(value);

  if (!Number.isFinite(next)) return fallback;

  return Math.min(max, Math.max(min, next));
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

function detectPhoneCountry(value: string | null | undefined) {
  const phone = value?.trim() || "";

  return (
    [...phoneCountries]
      .sort((a, b) => b.dialCode.length - a.dialCode.length)
      .find((country) => phone.startsWith(country.dialCode)) ||
    phoneCountries[0]
  );
}

function stripPhoneDialCode(value: string | null | undefined) {
  const phone = value?.trim() || "";
  const country = detectPhoneCountry(phone);

  return phone.startsWith(country.dialCode)
    ? phone.slice(country.dialCode.length).trim()
    : phone;
}

function phoneForSave(localPhone: string, dialCode: string) {
  const trimmed = localPhone.trim();

  if (!trimmed) return null;
  if (trimmed.startsWith("+")) return trimmed;

  return `${dialCode}${trimmed.replace(/\s+/g, "")}`;
}

function getFormFromCustomer(customer: IkasCustomer | null): AccountForm {
  return {
    firstName: customer?.firstName || "",
    lastName: customer?.lastName || "",
    phone: stripPhoneDialCode(customer?.phone),
    email: customer?.email || "",
  };
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
    "--tmai-pad-bottom": `${numeric(
      props.sectionPaddingBottom,
      86,
      24,
      240,
    )}px`,
  } as any;
}

function imageIdToUrl(value: string) {
  const trimmed = value.trim();

  if (trimmed.startsWith("theme-images/")) {
    return `https://cdn.myikas.com/images/${trimmed}/image_3840.webp`;
  }

  return trimmed;
}

function imageSource(
  value: IkasImage | string | null | undefined,
  fallback: string,
) {
  if (typeof value === "string" && value.trim()) {
    return imageIdToUrl(value);
  }

  if (value && typeof value === "object") {
    const image = value as {
      id?: unknown;
      url?: unknown;
      src?: unknown;
      imageUrl?: unknown;
      image?: { url?: unknown; src?: unknown };
      file?: { url?: unknown; src?: unknown };
    };

    if (typeof image.url === "string") return imageIdToUrl(image.url);
    if (typeof image.src === "string") return imageIdToUrl(image.src);
    if (typeof image.imageUrl === "string") {
      return imageIdToUrl(image.imageUrl);
    }
    if (typeof image.id === "string") return imageIdToUrl(image.id);
    if (typeof image.image?.url === "string") {
      return imageIdToUrl(image.image.url);
    }
    if (typeof image.image?.src === "string") {
      return imageIdToUrl(image.image.src);
    }
    if (typeof image.file?.url === "string") {
      return imageIdToUrl(image.file.url);
    }
    if (typeof image.file?.src === "string") {
      return imageIdToUrl(image.file.src);
    }
  }

  return fallback;
}

function getQueryParam(name: string) {
  if (typeof window === "undefined") return "";

  return new URLSearchParams(window.location.search).get(name) || "";
}

function formatDate(value: number | null | undefined) {
  if (!value) return "";

  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

function formatOrderTotal(order: IkasOrder) {
  const symbol = order.currencySymbol || order.currencyCode || "";

  return `${symbol} ${Number(order.totalFinalPrice || 0).toLocaleString(
    "tr-TR",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  )}`;
}

function pageDescription(mode: string) {
  if (mode === "account") {
    return "Hesap bilgileriniz, sipariş ve destek süreçlerinde kullanılan müşteri kaydınızla eşleşir.";
  }

  if (mode === "addresses") {
    return "Teslimat ve fatura adreslerinizi hesabınıza bağlı olarak görüntüleyin.";
  }

  if (mode === "favorites") {
    return "Beğendiğiniz ürünleri hızlıca takip edin ve ürün sayfalarına geri dönün.";
  }

  return "Sipariş geçmişinizi, tarih ve toplam bilgileriyle birlikte kontrol edin.";
}

function modeFromPathname(pathname: string, fallback: string) {
  if (pathname === "/account") return "account";
  if (pathname === "/account/addresses") return "addresses";

  if (
    pathname === "/account/favorites" ||
    pathname === "/account/favorite-products"
  ) {
    return "favorites";
  }

  if (pathname === "/account/orders") return "orders";
  if (pathname === "/account/forgot-password") return "forgot-password";
  if (pathname === "/account/recover-password") return "recover-password";

  return fallback || "account";
}

function AccountProfileForm({
  customer,
  ready,
  setCustomer,
  props,
}: {
  customer: IkasCustomer;
  ready: boolean;
  setCustomer: (customer: IkasCustomer | null) => void;
  props: DashboardProps;
}) {
  const [form, setForm] = useState<AccountForm>(() =>
    getFormFromCustomer(customer),
  );

  const [phoneCountryIso, setPhoneCountryIso] = useState(
    () => detectPhoneCountry(customer.phone).iso,
  );

  const [status, setStatus] = useState<FormStatus>("idle");

  useEffect(() => {
    setForm(getFormFromCustomer(customer));
    setPhoneCountryIso(detectPhoneCountry(customer.phone).iso);
  }, [customer]);

  const phoneCountry =
    phoneCountries.find((country) => country.iso === phoneCountryIso) ||
    phoneCountries[0];

  function updateField(field: keyof AccountForm, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (status !== "idle") {
      setStatus("idle");
    }
  }

  async function submit(event: Event) {
    event.preventDefault();

    if (status === "loading") return;

    setStatus("loading");

    const nextCustomer: IkasCustomer = {
      ...customer,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim() || null,
      phone: phoneForSave(form.phone, phoneCountry.dialCode),
    };

    if (isStudioEnvironment()) {
      setTimeout(() => {
        setCustomer(nextCustomer);
        setStatus("success");
      }, 400);

      return;
    }

    try {
      const success = await saveCustomer(customerStore, nextCustomer);

      if (success) {
        const savedCustomer = customerStore.customer || nextCustomer;

        setCustomer(savedCustomer);
        setForm(getFormFromCustomer(savedCustomer));
        setStatus("success");

        return;
      }
    } catch {
      // Save failed.
    }

    setStatus("error");
  }

  return (
    <form className="tmai-form tmau-form" onSubmit={submit}>
      <header className="tmai-form-head tmau-main-head">
        <span>01</span>
        <h1>{text(props.formTitle, "Kişisel Bilgilerim")}</h1>
        <p>{pageDescription("account")}</p>
      </header>

      <div className="tmai-fields tmau-fields">
        <div className="tmai-field tmau-field">
          <span className="is-required">
            * {text(props.firstNameLabel, "Ad")}
          </span>

          <input
            value={form.firstName}
            autoComplete="given-name"
            required
            onInput={(event) =>
              updateField(
                "firstName",
                (event.currentTarget as HTMLInputElement).value,
              )
            }
          />
        </div>

        <div className="tmai-field tmau-field">
          <span className="is-required">
            * {text(props.lastNameLabel, "Soyad")}
          </span>

          <input
            value={form.lastName}
            autoComplete="family-name"
            required
            onInput={(event) =>
              updateField(
                "lastName",
                (event.currentTarget as HTMLInputElement).value,
              )
            }
          />
        </div>

        <div className="tmai-field tmau-field">
          <span>{text(props.phoneLabel, "Telefon")}</span>

          <div className="tmai-phone-input tmau-phone-input">
            <label
              className="tmai-phone-country tmau-phone-country"
              aria-label="Telefon ülke kodu"
            >
              <img
                src={`https://cdn.myikas.com/sf/assets/flags/3x2/${phoneCountry.iso}.svg`}
                alt={phoneCountry.iso}
                width="24"
                height="16"
              />

              <span aria-hidden="true">⌄</span>

              <select
                value={phoneCountry.iso}
                onChange={(event) =>
                  setPhoneCountryIso(
                    (event.currentTarget as HTMLSelectElement).value,
                  )
                }
              >
                {phoneCountries.map((country) => (
                  <option key={country.iso} value={country.iso}>
                    {`${country.name} ${country.dialCode}`}
                  </option>
                ))}
              </select>
            </label>

            <b>{phoneCountry.dialCode}</b>

            <input
              value={form.phone}
              autoComplete="tel"
              inputMode="tel"
              onInput={(event) =>
                updateField(
                  "phone",
                  (event.currentTarget as HTMLInputElement).value,
                )
              }
            />
          </div>
        </div>

        <div className="tmai-field tmau-field">
          <span className="is-required">
            * {text(props.emailLabel, "Email")}
          </span>

          <input
            value={form.email}
            autoComplete="email"
            type="email"
            disabled
          />
        </div>
      </div>

      <button
        className="tmai-submit tmau-submit"
        type="submit"
        disabled={!ready || status === "loading"}
      >
        {status === "loading"
          ? text(props.savingText, "Kaydediliyor...")
          : text(props.saveButtonText, "Kaydet")}
      </button>

      {status !== "idle" && (
        <p className={`tmai-status tmau-status is-${status}`}>
          {status === "success"
            ? text(props.successMessage, "Bilgileriniz güncellendi.")
            : status === "error"
              ? text(
                  props.errorMessage,
                  "Bilgiler kaydedilemedi. Lütfen tekrar deneyin.",
                )
              : text(props.savingText, "Kaydediliyor...")}
        </p>
      )}
    </form>
  );
}

function modeFromHref(nextHref: string, fallback: string) {
  const pathname =
    typeof window !== "undefined"
      ? new URL(nextHref, window.location.origin).pathname.replace(/\/+$/, "")
      : nextHref.replace(/\/+$/, "");

  return modeFromPathname(pathname, fallback);
}

function AuthShell({
  props,
  active,
  children,
}: {
  props: DashboardProps;
  active: "forgot" | "recover";
  children: ComponentChildren;
}) {
  const image = imageSource(props.backgroundImageUrl, defaultAuthImage);

  const title =
    active === "forgot"
      ? text(props.titleText, "Parolamı Unuttum")
      : text(props.titleText, "Şifremi Kurtar");

  const copy =
    active === "forgot"
      ? "Lütfen üye olurken kullandığınız email adresinizi giriniz. Şifreniz email adresinize gönderilecektir."
      : "Yeni şifrenizi belirleyin ve hesabınıza güvenli şekilde tekrar erişin.";

  return (
     <section
      className={`tmau-auth is-${active}`}
      style={{ "--tmau-auth-visual": `url("${image}")` } as any}
    >
      <style dangerouslySetInnerHTML={{ __html: criticalAccountCss }} />
      <div className="tmau-auth-panel">
        <div className="tmau-auth-form">
          <div className="tmau-auth-copy">
            <span>HESAP</span>
            <h1>{title}</h1>
            <p>{copy}</p>
          </div>

          <div className="tmau-auth-fields">
            {active === "recover" && (
              <div className="tmau-auth-tabs">
                <a href={href(props.loginHref, "/account/login")}>
                  Üye Girişi
                </a>

                <a href={href(props.registerHref, "/account/register")}>
                  Üye Ol
                </a>
              </div>
            )}

            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

function ForgotPasswordView({ props }: { props: DashboardProps }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function submit(event: Event) {
    event.preventDefault();

    if (status === "loading") return;

    setStatus("loading");

    try {
      const success = await forgotPassword(customerStore, email);
      setStatus(success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <AuthShell props={props} active="forgot">
      <form onSubmit={submit}>
        <label className="tmau-auth-field">
          <span>
            <b>* </b>Email
          </span>

          <input
            type="email"
            value={email}
            required
            autoComplete="email"
            onInput={(event) =>
              setEmail((event.currentTarget as HTMLInputElement).value)
            }
          />
        </label>

        <button
          className="tmau-auth-submit"
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Gönderiliyor..." : "Gönder"}
        </button>

        {status !== "idle" && (
          <p className={`tmau-status is-${status}`}>
            {status === "success"
              ? "Şifre yenileme bağlantısı email adresinize gönderildi."
              : status === "error"
                ? "İşlem tamamlanamadı. Email adresini kontrol edin."
                : "Gönderiliyor..."}
          </p>
        )}
      </form>

      <a
        className="tmau-auth-login-link"
        href={href(props.loginHref, "/account/login")}
      >
        Üye Girişi
      </a>
    </AuthShell>
  );
}

function RecoverPasswordView({ props }: { props: DashboardProps }) {
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "mismatch"
  >("idle");

  async function submit(event: Event) {
    event.preventDefault();

    if (status === "loading") return;

    if (password !== passwordAgain) {
      setStatus("mismatch");
      return;
    }

    const token = getQueryParam("token");

    if (!token) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const success = await recoverPassword(
        customerStore,
        password,
        passwordAgain,
        token,
      );

      if (success) {
        setStatus("success");

        setTimeout(() => {
          Router.navigateToPage("LOGIN");
        }, 650);

        return;
      }

      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <AuthShell props={props} active="recover">
      <form onSubmit={submit}>
        <label className="tmau-auth-field">
          <span>* Şifre</span>

          <input
            type="password"
            value={password}
            required
            autoComplete="new-password"
            onInput={(event) =>
              setPassword((event.currentTarget as HTMLInputElement).value)
            }
          />
        </label>

        <label className="tmau-auth-field">
          <span>* Şifre Tekrar</span>

          <input
            type="password"
            value={passwordAgain}
            required
            autoComplete="new-password"
            onInput={(event) =>
              setPasswordAgain(
                (event.currentTarget as HTMLInputElement).value,
              )
            }
          />
        </label>

        <button
          className="tmau-auth-submit"
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Kaydediliyor..." : "Şifreyi Güncelle"}
        </button>

        {status !== "idle" && (
          <p className={`tmau-status is-${status}`}>
            {status === "success"
              ? "Şifreniz güncellendi. Giriş sayfasına yönlendiriliyorsunuz."
              : status === "mismatch"
                ? "Şifreler eşleşmiyor."
                : status === "error"
                  ? "işlem tamamlanamadı."
                  : "Kaydediliyor..."}
          </p>
        )}
      </form>
    </AuthShell>
  );
}

function AddressCard({ address }: { address: IkasCustomerAddress }) {
  return (
    <article className="tmau-card">
      <h2>{address.title || "Adres"}</h2>
      <p>{getCustomerAddressText(address)}</p>

      <small>
        {`${address.firstName || ""} ${address.lastName || ""}`.trim()}
      </small>
    </article>
  );
}

function ProductCard({ product }: { product: IkasProduct }) {
  const variant = getSelectedProductVariant(product) || product.variants?.[0];
  const media = variant ? getProductVariantMainImage(variant) : undefined;
  const image = media?.image;

  return (
    <a className="tmau-product" href={getProductHref(product)}>
      <div className="tmau-product-media">
        {image ? (
          <img
            src={getDefaultSrc(image)}
            srcSet={createMediaSrcset(image)}
            alt={image.altText || product.name}
            loading="lazy"
          />
        ) : (
          <span>{product.name.slice(0, 1)}</span>
        )}
      </div>

      <strong>{product.name}</strong>

      <small>
        {variant ? getProductVariantFormattedFinalPrice(variant) : ""}
      </small>
    </a>
  );
}

export function ThreeMashAccountUtilityPage(props: DashboardProps) {
  const isStudio = isStudioEnvironment();

  const [mode, setMode] = useState(() =>
    props.mode
      ? props.mode
      : modeFromPathname(
          typeof window !== "undefined"
            ? window.location.pathname.replace(/\/+$/, "")
            : "",
          "account",
        ),
  );

  const [customer, setCustomer] = useState<IkasCustomer | null>(
    () => customerStore.customer || (isStudio ? mockStudioCustomer : null),
  );

  const [orders, setOrders] = useState<IkasOrder[]>(
    () => (isStudio ? mockStudioOrders : []),
  );

  const [favorites, setFavorites] = useState<IkasProduct[]>([]);

  const [ready, setReady] = useState(
    isStudio || customerStore._initialized || customerStoreInitResolved,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    function handlePopState() {
      setMode(
        modeFromPathname(
          window.location.pathname.replace(/\/+$/, ""),
          props.mode || "account",
        ),
      );
    }

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [props.mode]);

  function handleAccountNavigate(nextHref: string) {
    const nextMode = modeFromHref(nextHref, props.mode || "account");

    if (
      nextMode === "forgot-password" ||
      nextMode === "recover-password"
    ) {
      Router.navigate(nextHref);
      return;
    }

    setMode(nextMode);

    if (typeof window !== "undefined" && !isStudio) {
      try {
        window.history.pushState({}, "", nextHref);
      } catch {
        // iframe safe
      }
    }
  }

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        // If the eager init hasn't finished yet, wait for it now.
        // In most cases it will already be done by the time the user
        // navigates here, making this await essentially instant.
        if (!customerStore._initialized) {
          await ensureCustomerStoreReady();
        }

        if (!mounted) return;

        const currentCustomer = customerStore.customer;

        if (currentCustomer) {
          setCustomer(currentCustomer);
        } else if (isStudio) {
          setCustomer(mockStudioCustomer);
        }

        setReady(true);

        if (!currentCustomer) {
          if (isStudio && mode === "orders") {
            setOrders(mockStudioOrders);
          }

          return;
        }

        if (mode === "orders") {
          const nextOrders = await getOrders(customerStore);

          if (mounted) {
            setOrders(nextOrders || []);
          }
        }

        if (mode === "favorites") {
          const nextFavorites = await getFavoriteProducts(customerStore);

          if (mounted) {
            setFavorites(nextFavorites || []);
          }
        }
      } catch {
        if (mounted) {
          setReady(true);

          if (isStudio) {
            setCustomer(mockStudioCustomer);

            if (mode === "orders") {
              setOrders(mockStudioOrders);
            }
          }
        }
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [mode, isStudio]);

  const effectiveCustomer =
    customer || (isStudio ? mockStudioCustomer : null);

  const addresses = effectiveCustomer?.addresses || [];

  const title = useMemo(() => {
    if (mode === "addresses") {
      return text(props.titleText, "Adreslerim");
    }

    if (mode === "favorites") {
      return text(props.titleText, "Beğendiğim Ürünler");
    }

    return text(props.titleText, "Siparişlerim");
  }, [mode, props.titleText]);

  if (mode === "forgot-password") {
    return <ForgotPasswordView props={props} />;
  }

  if (mode === "recover-password") {
    return <RecoverPasswordView props={props} />;
  }

  return (
    <section
      className={`tmau-page three-mash-account-info-page is-${mode}`}
      style={dashboardStyle(props)}
    >
      <style dangerouslySetInnerHTML={{ __html: criticalAccountCss }} />
      <ThreeMashAccountLayout
        props={props}
        active={mode}
        customer={effectiveCustomer}
        isReady={ready}
        onNavigate={handleAccountNavigate}
      >
        {mode === "account" && (
          <AccountProfileForm
            customer={effectiveCustomer || ({} as IkasCustomer)}
            ready={ready}
            setCustomer={setCustomer}
            props={props}
          />
        )}

        {mode !== "account" && (
          <header className="tmau-main-head">
            <span>
              {mode === "addresses"
                ? "01"
                : mode === "orders"
                  ? "02"
                  : "03"}
            </span>

            <h1>{title}</h1>
            <p>{pageDescription(mode)}</p>
          </header>
        )}

        {mode === "addresses" && (
          <div className="tmau-list">
            {addresses.length ? (
              addresses.map((address, index) => (
                <AddressCard key={address.id || index} address={address} />
              ))
            ) : (
              <p className="tmau-empty">
                {text(props.emptyText, "Kayıtlı adresiniz bulunmuyor.")}
              </p>
            )}
          </div>
        )}

        {mode === "orders" && (
          <div className="tmau-list">
            {orders.length ? (
              orders.map((order) => (
                <article key={order.id} className="tmau-card">
                  <h2>{order.orderNumber || order.id}</h2>

                  <p>{formatDate(order.orderedAt || order.createdAt)}</p>

                  <small>{formatOrderTotal(order)}</small>
                </article>
              ))
            ) : (
              <p className="tmau-empty">
                {text(props.emptyText, "Henüz siparişiniz bulunmuyor.")}
              </p>
            )}
          </div>
        )}

        {mode === "favorites" && (
          <div className="tmau-products">
            {favorites.length ? (
              favorites.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="tmau-empty">
                {text(props.emptyText, "Beğendiğiniz ürün bulunmuyor.")}
              </p>
            )}
          </div>
        )}
      </ThreeMashAccountLayout>
    </section>
  );
}

export default ThreeMashAccountUtilityPage;