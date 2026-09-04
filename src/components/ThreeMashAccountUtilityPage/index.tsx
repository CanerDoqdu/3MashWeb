import { useEffect, useLayoutEffect, useState } from "preact/hooks";

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
  recoverPassword,
  Router,
  saveCustomer,
  type IkasCustomer,
  type IkasCustomerAddress,
  type IkasOrder,
  type IkasProduct,
} from "@ikas/bp-storefront";

import ThreeMashAccountLayout from "../ThreeMashAccountLayout";
import { Props } from "./types";
import type { Props as AccountInfoProps } from "../ThreeMashAccountInfoPage/types";
import { t, tLocalized, tProp, isEnglishLocale } from "../../utils/i18n";
export { isStudioEnvironment } from "../../utils/isStudioEnvironment";
import { isStudioEnvironment } from "../../utils/isStudioEnvironment";
import { businessConfig } from "../../utils/businessConfig";
import { safeNavigationHref } from "../../utils/safeRedirect";

export type DashboardProps = Props &
  Partial<AccountInfoProps> & {
    accountLabel?: string;
    accountGroupTitle?: string;
    accountHref?: string;
  };

// ─── Types ─────────────────────────────────────────────────────────────────

type AccountForm = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

type FormStatus = "idle" | "loading" | "success" | "error";

// ─── Constants ─────────────────────────────────────────────────────────────

const phoneCountries = [
  { iso: "TR", name: tLocalized("Türkiye", "Turkey"), dialCode: "+90" },
  { iso: "US", name: tLocalized("United States", "United States"), dialCode: "+1" },
  { iso: "GB", name: tLocalized("United Kingdom", "United Kingdom"), dialCode: "+44" },
  { iso: "DE", name: tLocalized("Germany", "Germany"), dialCode: "+49" },
  { iso: "FR", name: tLocalized("France", "france"), dialCode: "+33" },
  { iso: "NL", name: tLocalized("Netherlands", "Netherlands"), dialCode: "+31" },
  { iso: "IT", name: tLocalized("Italy", "Italy"), dialCode: "+39" },
  { iso: "ES", name: tLocalized("Spain", "spain"), dialCode: "+34" },
  { iso: "AE", name: tLocalized("United Arab Emirates", "United Arab Emirates"), dialCode: "+971" },
  { iso: "SA", name: tLocalized("Saudi Arabia", "Saudi Arabia"), dialCode: "+966" },
  { iso: "IQ", name: tLocalized("Iraq", "Iraq"), dialCode: "+964" },
  { iso: "AZ", name: tLocalized("Azerbaijan", "Azerbaijan"), dialCode: "+994" },
  { iso: "SL", name: tLocalized("Sierra Leone", "Sierra Leone"), dialCode: "+232" },
];

// ─── Helpers ───────────────────────────────────────────────────────────────

export function text(value: string | undefined, fallbackTr: string, fallbackEn?: string) {
  return tProp(value, fallbackTr, fallbackEn || fallbackTr);
}

export function href(value: string | undefined, fallback: string) {
  return safeNavigationHref(value, fallback);
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

function formatDate(value: number | null | undefined) {
  if (!value) return "";
  const localeCode = isEnglishLocale() ? "en-US" : "tr-TR";
  return new Intl.DateTimeFormat(localeCode, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

function formatOrderTotal(order: IkasOrder) {
  const symbol = order.currencySymbol || order.currencyCode || "";
  const localeCode = isEnglishLocale() ? "en-US" : "tr-TR";
  return `${symbol} ${Number(order.totalFinalPrice || 0).toLocaleString(
    localeCode,
    { minimumFractionDigits: 2, maximumFractionDigits: 2 },
  )}`;
}

export function pageDescription(mode: string) {
  if (mode === "account") {
    return t(
      "account.profileDesc",
      "Hesap bilgileriniz, sipariş ve destek süreçlerinde kullanılan müşteri kaydınızla eşleşir."
    );
  }
  if (mode === "addresses") {
    return t(
      "account.addressesDesc",
      "Teslimat ve fatura adreslerinizi hesabınıza bağlı olarak görüntüleyin."
    );
  }
  if (mode === "favorites") {
    return t(
      "account.favoritesDesc",
      "Beğendiğiniz ürünleri hızlıca takip edin ve ürün sayfalarına geri dönün."
    );
  }
  return t(
    "account.ordersDesc",
    "Sipariş geçmişinizi, tarih ve toplam bilgileriyle birlikte kontrol edin."
  );
}

/**
 * Detects studio/preview mode based on structural signals only.
 * Hostname and iframe checks are the only reliable indicators.
 * URL parameters (?studio=, ?preview=) and document.referrer are NOT checked
 * because they are attacker-controllable.
 */
export const mockStudioCustomer: IkasCustomer = {
  id: "studio-preview-customer",
  firstName: "Caner",
  lastName: tLocalized("Doğdu", "Born"),
  email: businessConfig.recipientEmail,
  phone: "+905321234567",
  addresses: [
    {
      id: "addr-studio-1",
      title: "Ofis Adresi",
      address: tLocalized("Antalya Teknokent, Ar-Ge 2 Binası, Konyaaltı", "Antalya Teknokent, R&D Building 2, Konyaaltı"),
      // NOTE: Mock data objects for studio preview — intentionally incomplete.
      city: { name: "Antalya" } as any,
      district: { name: tLocalized("Konyaaltı", "Konyaaltı") } as any,
      country: { name: tLocalized("Türkiye", "Turkey") } as any,
      postalCode: "07070",
      firstName: "Caner",
      lastName: tLocalized("Doğdu", "Born"),
      phone: "+905321234567",
    } as any,
  ],
  favoriteProducts: [],
} as any;

export const mockStudioOrders: IkasOrder[] = [
  {
    id: "ord-studio-1",
    orderNumber: "3M-892410",
    orderedAt: Date.now() - 86400000 * 2,
    totalFinalPrice: 18750,
    currencySymbol: "₺",
    currencyCode: "TRY",
  } as any, // NOTE: Mock data for studio preview — intentionally incomplete.
];

// ─── Sub-components ────────────────────────────────────────────────────────

function AddressCard({ address }: { address: IkasCustomerAddress }) {
  return (
    <article className="tmau-card">
      <h2>{address.title || t("account.defaultAddress", tLocalized("Adres", "Address"))}</h2>
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

// ─── Exported View Components ──────────────────────────────────────────────

export function AccountProfileForm({
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
  const isStudio = isStudioEnvironment();

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
    phoneCountries.find((c) => c.iso === phoneCountryIso) || phoneCountries[0];

  function updateField(field: keyof AccountForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    if (status !== "idle") setStatus("idle");
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

    if (isStudio) {
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

  const formTitle =
    props.profileTitle ||
    props.formTitle ||
    (props.mode === "account" ? props.titleText : undefined) ||
    t("account.profile", tLocalized("Kişisel Bilgilerim", "My Personal Information"));

  return (
    <form className="tmai-form tmau-form" onSubmit={submit}>
      <header className="tmai-form-head tmau-main-head">
        <span>01</span>
        <h1>{formTitle}</h1>
        <p>{pageDescription("account")}</p>
      </header>

      <div className="tmai-fields tmau-fields">
        <div className="tmai-field tmau-field">
          <span className="is-required">
            * {text(props.firstNameLabel, tLocalized("Ad", "First Name"), "First Name")}
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
            * {text(props.lastNameLabel, tLocalized("Soyad", "Last Name"), "Last Name")}
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
          <span>{text(props.phoneLabel, tLocalized("Telefon", "Phone"), "Phone")}</span>
          <div className="tmai-phone-input tmau-phone-input">
            <label
              className="tmai-phone-country tmau-phone-country"
              aria-label={t("account.phoneCountryAria", "Telefon ülke kodu")}
            >
              <img
                src={`https://cdn.myikas.com/sf/assets/flags/3x2/${phoneCountry.iso}.svg`}
                alt={phoneCountry.iso}
                width="24"
                height="16"
              />
              <svg width="9" height="6" viewBox="0 0 9 6" fill="none" aria-hidden="true">
                <path d="M1 1.25L4.5 4.75L8 1.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <select
                value={phoneCountry.iso}
                onChange={(event) =>
                  setPhoneCountryIso(
                    (event.currentTarget as HTMLSelectElement).value,
                  )
                }
              >
                {phoneCountries.map((c) => (
                  <option key={c.iso} value={c.iso}>
                    {`${c.name} ${c.dialCode}`}
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
            * {text(props.emailLabel, tLocalized("Email", "E-mail"), tLocalized("Email", "E-mail"))}
          </span>
          <input value={form.email} autoComplete="email" type="email" disabled />
        </div>
      </div>

      <button
        className="tmai-submit tmau-submit"
        type="submit"
        disabled={!ready || status === "loading"}
      >
        {status === "loading"
          ? text(props.savingText, tLocalized("Kaydediliyor...", "Saving..."), "Saving...")
          : text(props.saveButtonText, tLocalized("Kaydet", "Save"), "Save")}
      </button>

      {status !== "idle" && (
        <p className={`tmai-status tmau-status is-${status}`}>
          {status === "success"
            ? text(props.successMessage, tLocalized("Bilgileriniz güncellendi.", "Your information has been updated."), "Your information has been updated.")
            : status === "error"
              ? text(
                  props.errorMessage,
                  tLocalized("Bilgiler kaydedilemedi. Lütfen tekrar deneyin.", "Failed to save information. Please try again."),
                  "Failed to save information. Please try again."
                )
              : text(props.savingText, tLocalized("Kaydediliyor...", "Saving..."), "Saving...")}
        </p>
      )}
    </form>
  );
}

export function AddressesView({
  addresses,
  props,
}: {
  addresses: IkasCustomerAddress[];
  props: DashboardProps;
}) {
  const title =
    props.addressesTitle ||
    (props.mode === "addresses" ? props.titleText : undefined) ||
    t("account.addresses", tLocalized("Adreslerim", "My Addresses"));
  const emptyText =
    (props.mode === "addresses" ? props.emptyText : undefined) ||
    t("account.noAddresses", "Kayıtlı adresiniz bulunmuyor.");

  return (
    <>
      <header className="tmau-main-head tmai-form-head">
        <span>01</span>
        <h1>{title}</h1>
        <p>{pageDescription("addresses")}</p>
      </header>
      <div className="tmau-list">
        {addresses.length ? (
          addresses.map((address, index) => (
            <AddressCard key={address.id || index} address={address} />
          ))
        ) : (
          <p className="tmau-empty">{emptyText}</p>
        )}
      </div>
    </>
  );
}

export function OrdersView({
  orders,
  props,
}: {
  orders: IkasOrder[];
  props: DashboardProps;
}) {
  const title =
    props.ordersTitle ||
    (props.mode === "orders" ? props.titleText : undefined) ||
    t("account.orders", tLocalized("Siparişlerim", "My Orders"));
  const emptyText =
    (props.mode === "orders" ? props.emptyText : undefined) ||
    t("account.noOrders", "Henüz siparişiniz bulunmuyor.");

  return (
    <>
      <header className="tmau-main-head tmai-form-head">
        <span>02</span>
        <h1>{title}</h1>
        <p>{pageDescription("orders")}</p>
      </header>
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
          <p className="tmau-empty">{emptyText}</p>
        )}
      </div>
    </>
  );
}

export function FavoritesView({
  favorites,
  props,
}: {
  favorites: IkasProduct[];
  props: DashboardProps;
}) {
  const title =
    props.favoritesTitle ||
    (props.mode === "favorites" ? props.titleText : undefined) ||
    t("account.favorites", tLocalized("Beğendiğim Ürünler", "My Favorites"));
  const emptyText =
    (props.mode === "favorites" ? props.emptyText : undefined) ||
    t("account.noFavorites", "Beğendiğiniz ürün bulunmuyor.");

  return (
    <>
      <header className="tmau-main-head tmai-form-head">
        <span>03</span>
        <h1>{title}</h1>
        <p>{pageDescription("favorites")}</p>
      </header>
      <div className="tmau-products">
        {favorites.length ? (
          favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="tmau-empty">{emptyText}</p>
        )}
      </div>
    </>
  );
}

export function ForgotPasswordView({ props }: { props: DashboardProps }) {
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

  const title =
    (props.mode === "forgot-password" ? props.titleText : undefined) ||
    t("auth.forgotPassword", "Parolamı Unuttum");

  return (
    <div className="tmau-auth-form-wrap">
      <header className="tmau-main-head tmai-form-head">
        <span>{t("account.title", "HESAP")}</span>
        <h1>{title}</h1>
        <p>
          {t(
            "auth.forgotPasswordDesc",
            "Lütfen üye olurken kullandığınız email adresinizi giriniz. Şifreniz email adresinize gönderilecektir."
          )}
        </p>
      </header>

      <form className="tmau-auth-inner-form" onSubmit={submit}>
        <label className="tmau-auth-field tmai-field">
          <span>
            <b>* </b>{tLocalized("Email", "E-mail")}
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
          className="tmai-submit tmau-submit"
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? t("common.sending", "Gönderiliyor...") : t("common.send", "Gönder")}
        </button>

        {status !== "idle" && (
          <p className={`tmai-status tmau-status is-${status}`}>
            {status === "success"
              ? t("auth.resetLinkSent", "Şifre yenileme bağlantısı email adresinize gönderildi.")
              : status === "error"
                ? t("auth.resetLinkError", "İşlem tamamlanamadı. Email adresini kontrol edin.")
                : t("common.sending", "Gönderiliyor...")}
          </p>
        )}
      </form>

      <a
        className="tmau-auth-login-link"
        href={href(props.loginHref, "/account/login")}
      >
        {t("auth.loginTitle", "Üye Girişi")}
      </a>
    </div>
  );
}

export function RecoverPasswordView({ props }: { props: DashboardProps }) {
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "mismatch"
  >("idle");

  function getQueryParam(name: string) {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get(name) || "";
  }

  const token = getQueryParam("token");

  useLayoutEffect(() => {
    if (token) {
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [token]);

  // Security: Token is extracted then immediately removed from URL via history.replaceState().
  // Host document MUST have <meta name="referrer" content="no-referrer"> to prevent
  // token leakage to third-party scripts or external links. No third-party trackers
  // should be loaded on this recovery flow.

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
    <div className="tmau-auth-form-wrap">
      <header className="tmau-main-head tmai-form-head">
        <span>{t("account.title", "HESAP")}</span>
        <h1>{text(props.titleText, tLocalized("Şifremi Kurtar", "Recover Password"), "Reset Password")}</h1>
        <p>
          {t(
            "auth.recoverPasswordDesc",
            "Yeni şifrenizi belirleyin ve hesabınıza güvenli şekilde tekrar erişin."
          )}
        </p>
      </header>

      <form className="tmau-auth-inner-form" onSubmit={submit}>
        <label className="tmau-auth-field tmai-field">
          <span>* {t("auth.password", tLocalized("Şifre", "Password"))}</span>
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

        <label className="tmau-auth-field tmai-field">
          <span>* {t("auth.passwordAgain", "Şifre Tekrar")}</span>
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
          className="tmai-submit tmau-submit"
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? t("common.saving", tLocalized("Kaydediliyor...", "Saving...")) : t("auth.updatePassword", "Şifreyi Güncelle")}
        </button>

        {status !== "idle" && (
          <p className={`tmai-status tmau-status is-${status}`}>
            {status === "success"
              ? t("auth.passwordUpdated", "Şifreniz güncellendi. Giriş sayfasına yönlendiriliyorsunuz.")
              : status === "mismatch"
                ? t("auth.passwordMismatch", "Şifreler eşleşmiyor.")
                : status === "error"
                  ? t("auth.operationFailed", "İşlem tamamlanamadı.")
                  : t("common.saving", tLocalized("Kaydediliyor...", "Saving..."))}
          </p>
        )}
      </form>
    </div>
  );
}

// ─── Main export — delegates to the unified account layout shell ──

export function ThreeMashAccountUtilityPage(props: DashboardProps) {
  // Route to the unified account layout with the mode passed from ikas config.
  // Each registered page (addresses, orders, favorites) sets a different mode prop.
  return <ThreeMashAccountLayout {...props} />;
}

export default ThreeMashAccountUtilityPage;