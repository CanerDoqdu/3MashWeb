import { useEffect, useMemo, useState } from "preact/hooks";

import {
  customerStore,
  initCustomerStore,
  logout,
  Router,
  saveCustomer,
  type IkasCustomer,
} from "@ikas/bp-storefront";

import { Props } from "./types";





type Status = "idle" | "loading" | "success" | "error";

type AccountForm = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

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

function text(value: string | undefined, fallback: string) {
  return value?.trim() || fallback;
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

function normalizeHref(value: string | undefined, fallback: string) {
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

function useAccountCustomer() {
  const [isReady, setIsReady] = useState(customerStore._initialized);

  const [customer, setCustomer] = useState<IkasCustomer | null>(
    customerStore.customer,
  );

  useEffect(() => {
    let mounted = true;

    if (customerStore._initialized) {
      setCustomer(customerStore.customer);
      setIsReady(true);

      return () => {
        mounted = false;
      };
    }

    initCustomerStore(customerStore).finally(() => {
      if (!mounted) return;

      setCustomer(customerStore.customer);
      setIsReady(true);
    });

    return () => {
      mounted = false;
    };
  }, []);

  return {
    isReady,
    customer,
    setCustomer,
  };
}


export function ThreeMashAccountInfoPage(props: Props) {
 const { isReady, customer, setCustomer } = useAccountCustomer();
  const [form, setForm] = useState<AccountForm>(() =>
    getFormFromCustomer(customerStore.customer),
  );
  const [phoneCountryIso, setPhoneCountryIso] = useState(
    () => detectPhoneCountry(customerStore.customer?.phone).iso,
  );
  const [status, setStatus] = useState<Status>("idle");

useEffect(() => {
  
  if (!isReady || !customer) return;

  setForm(getFormFromCustomer(customer));
  setPhoneCountryIso(detectPhoneCountry(customer.phone).iso);
}, [isReady, customer]);

const fullName = useMemo(() => {
  const composed = `${form.firstName} ${form.lastName}`.trim();

  return (
    composed ||
    customer?.fullName ||
    customer?.email ||
    ""
  );
}, [customer, form.firstName, form.lastName]);

  const themeStyle = {
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
  };

  function updateField(field: keyof AccountForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    if (status !== "idle") setStatus("idle");
  }

  async function submit(event: Event) {
    event.preventDefault();
    if (!customer || status === "loading") return;

    setStatus("loading");
    const nextCustomer: IkasCustomer = {
      ...customer,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim() || null,
      phone: phoneForSave(form.phone, phoneCountry.dialCode),
    };

    const success = await saveCustomer(customerStore, nextCustomer);
    if (success) {
      setCustomer(customerStore.customer || nextCustomer);
      setForm(getFormFromCustomer(customerStore.customer || nextCustomer));
      setStatus("success");
      return;
    }

    setStatus("error");
  }

  async function handleLogout(event: Event) {
    event.preventDefault();
    await logout(customerStore);
    Router.navigateToPage("LOGIN");
  }

const links = [
  {
    label: text(props.profileTitle, "Kişisel Bilgilerim"),
    href: "/account",
    active: true,
  },
  {
    label: "Adreslerim",
    href: "/account/addresses",
  },
  {
    label: "Beğendiğim Ürünler",
    href: "/account/favorite-products",
  },
  {
    label: "Siparişlerim",
    href: "/account/orders",
  },
];
const phoneCountry =
  phoneCountries.find((country) => country.iso === phoneCountryIso) ||
  phoneCountries[0];
if (!isReady) {
  return (
    <section className="three-mash-account-info-page" style={themeStyle}>
      <div className="tmai-shell">
        <aside className="tmai-sidebar">
          <span className="tmai-kicker">HESABIM</span>

          <div className="tmai-user">
            <span className="tmai-user-name-skeleton" />
            <span className="tmai-user-action-skeleton" />
          </div>

          <nav className="tmai-menu">
            <h2>{text(props.profileTitle, "Kişisel Bilgilerim")}</h2>
            {links.slice(0, 3).map((item) => (
              <a className={item.active ? "is-active" : ""} href={item.href}>
                {item.label}
              </a>
            ))}

            <h2>Sipariş Bilgilerim</h2>
            <a href="/account/orders">Siparişlerim</a>
          </nav>
        </aside>

        <main className="tmai-main">
          <div className="tmai-form-loading">
            <div className="tmai-loading-title" />
            <div className="tmai-loading-line" />
            <div className="tmai-loading-fields" />
          </div>
        </main>
      </div>
    </section>
  );
}



if (!customer) {
  return (
    <section
      className="three-mash-account-info-page"
      style={themeStyle}
    >
      <div className="tmai-login-required">
        <span>HESAP</span>

        <h1>
          {text(
            props.loginRequiredTitle,
            "Hesabınıza giriş yapın"
          )}
        </h1>

        <p>
          {text(
            props.loginRequiredText,
            "Kişisel bilgiler, adresler, favoriler ve siparişler giriş yapan müşterinin ikas hesabından çekilir."
          )}
        </p>

        <a href={normalizeHref(props.loginHref, "/account/login")}>
          {text(props.loginButtonText, "Giriş Yap")}
        </a>
      </div>
    </section>
  );
}
  return (
    <section className="three-mash-account-info-page" style={themeStyle}>
      <div className="tmai-shell">
        <aside className="tmai-sidebar" aria-label="Hesap menüsü">
          <span className="tmai-kicker">HESABIM</span>
          <div className="tmai-user">
<strong>{fullName}</strong>
            <a href="/account/logout" onClick={handleLogout}>
              {text(props.logoutText, "Çıkış yap")}
            </a>
          </div>

          <nav className="tmai-menu">
            <h2>{text(props.profileTitle, "Kişisel Bilgilerim")}</h2>
            {links.slice(0, 3).map((item) => (
              <a className={item.active ? "is-active" : ""} href={item.href}>
                {item.label}
              </a>
            ))}

        <h2>Sipariş Bilgilerim</h2>

<a href="/account/orders">
  Siparişlerim
</a>
          </nav>
        </aside>

        <main className="tmai-main">
          <form className="tmai-form" onSubmit={submit}>
            <header className="tmai-form-head">
              <span>01</span>
              <h1>{text(props.formTitle, "Kişisel Bilgilerim")}</h1>
              <p>
                Hesap bilgileriniz, sipariş ve destek süreçlerinde kullanılan
                müşteri kaydınızla eşleşir.
              </p>
            </header>

            <div className="tmai-fields">
              <label className="tmai-field">
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
              </label>

              <label className="tmai-field">
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
              </label>

              <label className="tmai-field">
                <span>{text(props.phoneLabel, "Telefon")}</span>
                <div className="tmai-phone-input">
                  <label
                    className="tmai-phone-country"
                    aria-label="Telefon ülke kodu"
                  >
                    <img
                      src={`https://cdn.myikas.com/sf/assets/flags/3x2/${phoneCountry.iso}.svg`}
                      alt={phoneCountry.iso}
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
                        <option
                          value={country.iso}
                        >{`${country.name} ${country.dialCode}`}</option>
                      ))}
                    </select>
                  </label>
                  <b>{phoneCountry.dialCode}</b>
                  <input
                    value={form.phone}
                    autoComplete="tel"
                    inputMode="tel"
                    pattern="\\d{7,14}"
                    onInput={(event) =>
                      updateField(
                        "phone",
                        (event.currentTarget as HTMLInputElement).value,
                      )
                    }
                  />
                </div>
              </label>

              <label className="tmai-field">
                <span className="is-required">
                  * {text(props.emailLabel, "Email")}
                </span>
                <input
                  value={form.email}
                  autoComplete="email"
                  type="email"
                  disabled
                />
              </label>
            </div>

            <button
              className="tmai-submit"
              type="submit"
              disabled={!isReady || status === "loading"}
            >
              {status === "loading"
                ? text(props.savingText, "Kaydediliyor...")
                : text(props.saveButtonText, "Kaydet")}
            </button>

            {status !== "idle" && (
              <p className={`tmai-status is-${status}`}>
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
        </main>
      </div>
    </section>
  );
}

export default ThreeMashAccountInfoPage;
