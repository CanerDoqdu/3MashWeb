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
import ThreeMashAccountPage from "../ThreeMashAccountPage";
import { Props } from "./types";
import type { Props as AccountInfoProps } from "../ThreeMashAccountInfoPage/types";
import { localizedHref, t, tLocalized, isEnglishLocale } from "../../utils/i18n";
export { isStudioEnvironment } from "../../utils/isStudioEnvironment";
import { isStudioEnvironment } from "../../utils/isStudioEnvironment";
import { businessConfig } from "../../utils/businessConfig";
import { safeNavigationHref } from "../../utils/safeRedirect";

export type DashboardProps = Props &
  Partial<AccountInfoProps> &
  {
    accountLabel?: string;
    accountGroupTitle?: string;
    accountHref?: string;
    titleText?: string;
    titleTextEn?: string;
    emptyText?: string;
    emptyTextEn?: string;
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
  { iso: "FR", name: tLocalized("France", "France"), dialCode: "+33" },
  { iso: "NL", name: tLocalized("Netherlands", "Netherlands"), dialCode: "+31" },
  { iso: "IT", name: tLocalized("Italy", "Italy"), dialCode: "+39" },
  { iso: "ES", name: tLocalized("Spain", "Spain"), dialCode: "+34" },
  { iso: "AE", name: tLocalized("United Arab Emirates", "United Arab Emirates"), dialCode: "+971" },
  { iso: "SA", name: tLocalized("Saudi Arabia", "Saudi Arabia"), dialCode: "+966" },
  { iso: "IQ", name: tLocalized("Iraq", "Iraq"), dialCode: "+964" },
  { iso: "AZ", name: tLocalized("Azerbaijan", "Azerbaijan"), dialCode: "+994" },
  { iso: "SL", name: tLocalized("Sierra Leone", "Sierra Leone"), dialCode: "+232" },
];

// ─── Helpers ───────────────────────────────────────────────────────────────

export function localizedText(
  valueTr: string | undefined,
  valueEn: string | undefined,
) {
  return (isEnglishLocale() ? valueEn : valueTr)?.trim() ?? "";
}

export function href(value: string | undefined) {
  return safeNavigationHref(localizedHref(value));
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

export function pageDescription(mode: string, props: DashboardProps) {
  if (mode === "account") {
    return localizedText(
      props.profileDescription,
      props.profileDescriptionEn,
    );
  }
  if (mode === "addresses") {
    return localizedText(
      props.addressesDescription,
      props.addressesDescriptionEn,
    );
  }
  if (mode === "favorites") {
    return localizedText(
      props.favoritesDescription,
      props.favoritesDescriptionEn,
    );
  }
  return localizedText(
    props.ordersDescription,
    props.ordersDescriptionEn,
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

function AddressCard({
  address,
  props,
}: {
  address: IkasCustomerAddress;
  props: DashboardProps;
}) {
  return (
    <article className="tmau-card">
      <h2>
        {address.title ||
          localizedText(
            props.defaultAddressLabel,
            props.defaultAddressLabelEn,
          )}
      </h2>
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
  const firstNameLabel = localizedText(
    props.firstNameLabel,
    props.firstNameLabelEn,
  );
  const lastNameLabel = localizedText(
    props.lastNameLabel,
    props.lastNameLabelEn,
  );
  const phoneLabel = localizedText(
    props.phoneLabel,
    props.phoneLabelEn,
  );
  const emailLabel = localizedText(
    props.emailLabel,
    props.emailLabelEn,
  );
  const phoneCountryLabel = localizedText(
    props.phoneCountryLabel,
    props.phoneCountryLabelEn,
  );

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

  const localizedFormTitle = localizedText(
    props.profileTitle,
    props.profileTitleEn,
  );

  return (
    <form className="tmai-form tmau-form" onSubmit={submit}>
      <header className="tmai-form-head tmau-main-head">
        {props.profileStepText && <span>{props.profileStepText}</span>}
        <h1>{localizedFormTitle}</h1>
        <p>{pageDescription("account", props)}</p>
      </header>

      <div className="tmai-fields tmau-fields">
        <label className="tmai-field tmau-field">
          <span className="is-required">
            * {firstNameLabel}
          </span>
          <input
            aria-label={firstNameLabel}
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
        </label>

        <label className="tmai-field tmau-field">
          <span className="is-required">
            * {lastNameLabel}
          </span>
          <input
            aria-label={lastNameLabel}
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
        </label>

        <div className="tmai-field tmau-field">
          <span>{phoneLabel}</span>
          <div className="tmai-phone-input tmau-phone-input">
            <label
              className="tmai-phone-country tmau-phone-country"
              aria-label={phoneCountryLabel}
            >
              <img
                src={`https://cdn.myikas.com/sf/assets/flags/3x2/${phoneCountry.iso}.svg`}
                alt={phoneCountry.name}
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
              aria-label={phoneLabel}
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

        <label className="tmai-field tmau-field">
          <span className="is-required">
            * {emailLabel}
          </span>
          <input
            aria-label={emailLabel}
            value={form.email}
            autoComplete="email"
            type="email"
            disabled
            readOnly
            style={{ cursor: "not-allowed", opacity: 0.85 }}
          />
        </label>
      </div>

      <button
        className="tmai-submit tmau-submit"
        type="submit"
        disabled={!ready || status === "loading"}
      >
        {status === "loading"
          ? localizedText(props.savingText, props.savingTextEn)
          : localizedText(props.saveButtonText, props.saveButtonTextEn)}
      </button>

      {status !== "idle" && (
        <p className={`tmai-status tmau-status is-${status}`}>
          {status === "success"
            ? localizedText(props.successMessage, props.successMessageEn)
            : status === "error"
              ? localizedText(
                  props.errorMessage,
                  props.errorMessageEn,
                )
              : localizedText(props.savingText, props.savingTextEn)}
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
  const title = localizedText(
    props.mode === "addresses" ? props.titleText : props.addressesTitle,
    props.mode === "addresses" ? props.titleTextEn : props.addressesTitleEn,
  );
  const emptyText = localizedText(
    props.mode === "addresses" ? props.emptyText : props.addressesEmptyText,
    props.mode === "addresses" ? props.emptyTextEn : props.addressesEmptyTextEn,
  );

  return (
    <>
      <header className="tmau-main-head tmai-form-head">
        {props.addressesStepText && <span>{props.addressesStepText}</span>}
        <h1>{title}</h1>
        <p>{pageDescription("addresses", props)}</p>
      </header>
      <div className="tmau-list">
        {addresses.length ? (
          addresses.map((address, index) => (
            <AddressCard key={address.id || index} address={address} props={props} />
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
  const title = localizedText(
    props.mode === "orders" ? props.titleText : props.ordersTitle,
    props.mode === "orders" ? props.titleTextEn : props.ordersTitleEn,
  );
  const emptyText = localizedText(
    props.mode === "orders" ? props.emptyText : props.ordersEmptyText,
    props.mode === "orders" ? props.emptyTextEn : props.ordersEmptyTextEn,
  );

  return (
    <>
      <header className="tmau-main-head tmai-form-head">
        {props.ordersStepText && <span>{props.ordersStepText}</span>}
        <h1>{title}</h1>
        <p>{pageDescription("orders", props)}</p>
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
  const title = localizedText(
    props.mode === "favorites" ? props.titleText : props.favoritesTitle,
    props.mode === "favorites" ? props.titleTextEn : props.favoritesTitleEn,
  );
  const emptyText = localizedText(
    props.mode === "favorites" ? props.emptyText : props.favoritesEmptyText,
    props.mode === "favorites" ? props.emptyTextEn : props.favoritesEmptyTextEn,
  );

  return (
    <>
      <header className="tmau-main-head tmai-form-head">
        {props.favoritesStepText && <span>{props.favoritesStepText}</span>}
        <h1>{title}</h1>
        <p>{pageDescription("favorites", props)}</p>
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

  const title = localizedText(
    props.forgotPasswordTitleText,
    props.forgotPasswordTitleTextEn,
  );

  return (
    <div className="tmau-auth-form-wrap">
      <header className="tmau-main-head tmai-form-head">
        <span>{localizedText(
          props.forgotPasswordEyebrowText,
          props.forgotPasswordEyebrowTextEn,
        )}</span>
        <h1>{title}</h1>
        <p>
          {localizedText(
            props.forgotPasswordDescriptionText,
            props.forgotPasswordDescriptionTextEn,
          )}
        </p>
      </header>

      <form className="tmau-auth-inner-form" onSubmit={submit}>
        <label className="tmau-auth-field tmai-field">
          <span>
            <b>* </b>{localizedText(
              props.forgotPasswordEmailLabel,
              props.forgotPasswordEmailLabelEn,
            )}
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
          {status === "loading"
            ? localizedText(
                props.forgotPasswordSubmittingText,
                props.forgotPasswordSubmittingTextEn,
              )
            : localizedText(
                props.forgotPasswordSubmitText,
                props.forgotPasswordSubmitTextEn,
              )}
        </button>

        {status !== "idle" && (
          <p className={`tmai-status tmau-status is-${status}`}>
            {status === "success"
              ? localizedText(
                  props.forgotPasswordSuccessText,
                  props.forgotPasswordSuccessTextEn,
                )
              : status === "error"
                ? localizedText(
                    props.forgotPasswordErrorText,
                    props.forgotPasswordErrorTextEn,
                  )
                : localizedText(
                    props.forgotPasswordSubmittingText,
                    props.forgotPasswordSubmittingTextEn,
                  )}
          </p>
        )}
      </form>

      {props.showForgotPasswordLoginLink !== false && (
        <a
          className="tmau-auth-login-link"
          href={href(props.loginHref)}
        >
          {localizedText(
            props.forgotPasswordLoginLinkText,
            props.forgotPasswordLoginLinkTextEn,
          )}
        </a>
      )}
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
          Router.navigate(href(props.loginHref));
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
        <span>{localizedText(
          props.recoverPasswordEyebrowText,
          props.recoverPasswordEyebrowTextEn,
        )}</span>
        <h1>{localizedText(
          props.recoverPasswordTitleText,
          props.recoverPasswordTitleTextEn,
        )}</h1>
        <p>
          {localizedText(
            props.recoverPasswordDescriptionText,
            props.recoverPasswordDescriptionTextEn,
          )}
        </p>
      </header>

      <form className="tmau-auth-inner-form" onSubmit={submit}>
        <label className="tmau-auth-field tmai-field">
          <span>* {localizedText(
            props.recoverPasswordLabel,
            props.recoverPasswordLabelEn,
          )}</span>
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
          <span>* {localizedText(
            props.recoverPasswordConfirmLabel,
            props.recoverPasswordConfirmLabelEn,
          )}</span>
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
          {status === "loading"
            ? localizedText(
                props.recoverPasswordSubmittingText,
                props.recoverPasswordSubmittingTextEn,
              )
            : localizedText(
                props.recoverPasswordSubmitText,
                props.recoverPasswordSubmitTextEn,
              )}
        </button>

        {status !== "idle" && (
          <p className={`tmai-status tmau-status is-${status}`}>
            {status === "success"
              ? localizedText(
                  props.recoverPasswordSuccessText,
                  props.recoverPasswordSuccessTextEn,
                )
              : status === "mismatch"
                ? localizedText(
                    props.recoverPasswordMismatchText,
                    props.recoverPasswordMismatchTextEn,
                  )
                : status === "error"
                  ? localizedText(
                      props.recoverPasswordErrorText,
                      props.recoverPasswordErrorTextEn,
                    )
                  : localizedText(
                      props.recoverPasswordSubmittingText,
                      props.recoverPasswordSubmittingTextEn,
                    )}
          </p>
        )}
      </form>

    </div>
  );
}

// ─── Main export — delegates to the unified account layout shell ──

function isPublicAuthMode(mode: string | undefined) {
  return mode === "forgot-password" || mode === "recover-password";
}

export function ThreeMashAccountUtilityPage(props: DashboardProps) {
  // Forgot and recover password screens are public auth routes and must not be
  // wrapped by the protected /account dashboard shell.
  if (isPublicAuthMode(props.mode)) {
    return <ThreeMashAccountPage {...props} />;
  }

  // Route to the unified account layout with the mode passed from ikas config.
  // Each registered page (addresses, orders, favorites) sets a different mode prop.
  return <ThreeMashAccountLayout {...props} />;
}

export default ThreeMashAccountUtilityPage;