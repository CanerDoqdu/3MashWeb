import { useState } from "preact/hooks";
import { Props } from "./types";
import { isEnglishLocale, tLocalized, tProp } from "../../utils/i18n";
import { businessConfig } from "../../utils/businessConfig";
import {
  safeCheckoutHref,
  safeMailAddress,
  safeMailtoHref,
  safeNavigationHref,
} from "../../utils/safeRedirect";

type ContactForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

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

function text(value: string | undefined, fallbackTr: string, fallbackEn?: string) {
  const legacyTurkishDefaults = new Set(["Ad", "Soyad", "Mesaj"]);
  return tProp(
    legacyTurkishDefaults.has(value?.trim() || "") ? undefined : value,
    fallbackTr,
    fallbackEn || fallbackTr,
  );
}

function localizedText(
  valueTr: string | undefined,
  valueEn: string | undefined,
  fallbackTr: string,
  fallbackEn: string,
) {
  return tProp(
    isEnglishLocale() ? valueEn : valueTr,
    fallbackTr,
    fallbackEn,
  );
}

function href(value: string | undefined, fallback: string) {
  return safeNavigationHref(value, fallback);
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

function mailHref(
  recipient: string,
  form: ContactForm,
  dialCode: string,
  subjectPrefix: string,
  labels: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  },
  includePhone: boolean,
) {
  const safeRecipient = safeMailAddress(recipient, businessConfig.recipientEmail) || businessConfig.recipientEmail;
  const subject = `${subjectPrefix} - ${form.firstName} ${form.lastName}`.trim();
  const phone = form.phone.trim() ? `${dialCode} ${form.phone.trim()}` : "-";
  const body = [
    `${labels.firstName}: ${form.firstName}`,
    `${labels.lastName}: ${form.lastName}`,
    `${labels.email}: ${form.email}`,
    ...(includePhone ? [`${labels.phone}: ${phone}`] : []),
    "",
    form.message,
  ].join("\n");
  return safeMailtoHref(safeRecipient, subject, body);
}

export function ThreeMashContactPage(props: Props) {
  const [form, setForm] = useState<ContactForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [phoneCountryIso, setPhoneCountryIso] = useState("TR");
  const [kvkkAccepted, setKvkkAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const heroKickerText = localizedText(
    props.heroKickerText,
    props.heroKickerTextEn,
    "İLETİŞİM",
    "CONTACT",
  );
  const titleText = localizedText(
    props.titleText,
    props.titleTextEn,
    "Bize Ulaşın",
    "Contact Us",
  );
  const descriptionText = localizedText(
    props.descriptionText,
    props.descriptionTextEn,
    "Sizden herhangi bir soru ya da geri dönüş gelince çok mutlu oluyoruz. Aşağıdaki formu kullanarak bize her türlü soruyu sorabilirsiniz. Size en geç 24 saat içinde yanıt vereceğiz. Sitemizi ziyaret ettiğiniz için teşekkür ederiz.",
    "We're always happy to hear any question or feedback from you. You can ask us anything using the form below. We will respond to you within 24 hours at the latest. Thank you for visiting our site.",
  );
  const directEmailSubjectText = localizedText(
    props.directEmailSubjectText,
    props.directEmailSubjectTextEn,
    "3mash İletişim",
    "3mash Contact",
  );
  const emailSubjectPrefix = localizedText(
    props.emailSubjectPrefix,
    props.emailSubjectPrefixEn,
    "3mash İletişim Formu",
    "3mash Contact Form",
  );
  const locationText = localizedText(
    props.locationText,
    props.locationTextEn,
    "Antalya Teknokent, Konyaaltı",
    "Antalya Teknokent, Konyaaltı",
  );
  const locationHref =
    safeCheckoutHref(props.locationHref) ||
    "https://maps.google.com/?q=Antalya%20Teknokent%20Konyaalt%C4%B1";
  const supportText = localizedText(
    props.supportText,
    props.supportTextEn,
    "Teknik destek ve ürün danışmanlığı",
    "Technical support & product consulting",
  );
  const infoPanelTitle = localizedText(
    props.infoPanelTitle,
    props.infoPanelTitleEn,
    "Doğru kişiye hızlı ulaşın.",
    "Reach the right person fast.",
  );
  const infoPanelDescription = localizedText(
    props.infoPanelDescription,
    props.infoPanelDescriptionEn,
    "Ürün seçimi, parametre kalibrasyonu, satış sonrası destek veya Academy iş birlikleri için mesajınızı doğrudan ekibe iletin.",
    "Send your message directly to the team for product selection, parameter calibration, post-sale support or Academy partnerships.",
  );
  const responseTimeLabel = localizedText(
    props.responseTimeLabel,
    props.responseTimeLabelEn,
    "Yanıt süresi",
    "Response time",
  );
  const responseTimeValue = localizedText(
    props.responseTimeValue,
    props.responseTimeValueEn,
    "En geç 24 saat içinde dönüş",
    "Reply within 24 hours at latest",
  );
  const supportScopeLabel = localizedText(
    props.supportScopeLabel,
    props.supportScopeLabelEn,
    "Destek kapsamı",
    "Support scope",
  );
  const supportScopeValue = localizedText(
    props.supportScopeValue,
    props.supportScopeValueEn,
    "Cihaz, reçine, kürleme ve sarf malzemeleri",
    "Printers, resins, curing and consumables",
  );
  const locationLabel = localizedText(
    props.locationLabel,
    props.locationLabelEn,
    "Lokasyon",
    "Location",
  );
  const extraInfo1Label = localizedText(
    props.extraInfo1Label,
    props.extraInfo1LabelEn,
    "Ek Bilgi",
    "Additional information",
  );
  const extraInfo1Value = localizedText(
    props.extraInfo1Value,
    props.extraInfo1ValueEn,
    "İletişim detayınızı buraya ekleyin.",
    "Add your contact details here.",
  );
  const extraInfo2Label = localizedText(
    props.extraInfo2Label,
    props.extraInfo2LabelEn,
    "Ek Bilgi",
    "Additional information",
  );
  const extraInfo2Value = localizedText(
    props.extraInfo2Value,
    props.extraInfo2ValueEn,
    "İletişim detayınızı buraya ekleyin.",
    "Add your contact details here.",
  );
  const firstNameLabel = localizedText(
    props.firstNameLabel,
    props.firstNameLabelEn,
    "Ad",
    "First Name",
  );
  const lastNameLabel = localizedText(
    props.lastNameLabel,
    props.lastNameLabelEn,
    "Soyad",
    "Last Name",
  );
  const emailLabel = localizedText(
    props.emailLabel,
    props.emailLabelEn,
    "Email",
    "E-mail",
  );
  const phoneLabel = localizedText(
    props.phoneLabel,
    props.phoneLabelEn,
    "Telefon",
    "Phone",
  );
  const messageLabel = localizedText(
    props.messageLabel,
    props.messageLabelEn,
    "Mesaj",
    "Message",
  );
  const kvkkTextBefore = localizedText(
    props.kvkkTextBefore,
    props.kvkkTextBeforeEn,
    "Kişisel verilerin korunması kanunu",
    "Personal data protection law",
  );
  const kvkkLinkText = localizedText(
    props.kvkkLinkText,
    props.kvkkLinkTextEn,
    "okudum, onaylıyorum",
    "I have read and agree",
  );
  const buttonText = localizedText(
    props.buttonText,
    props.buttonTextEn,
    "Gönder",
    "Send",
  );
  const successText = localizedText(
    props.successText,
    props.successTextEn,
    "Mail uygulamanız açılıyor.",
    "Opening mail app...",
  );
  const phoneCountryAriaLabel = localizedText(
    props.phoneCountryAriaLabel,
    props.phoneCountryAriaLabelEn,
    "Telefon ülke kodu",
    "Phone country code",
  );

  const recipient = safeMailAddress(text(props.recipientEmail, businessConfig.recipientEmail), businessConfig.recipientEmail) || businessConfig.recipientEmail;
  const style = {
    "--tm-contact-bg": themeColor(
      props.backgroundColor,
      "#FAFAF7",
      "--tm-theme-bg",
      ["#ffffff", "#fff"],
    ),
    "--tm-contact-text": themeColor(
      props.textColor,
      "#0E0E0C",
      "--tm-theme-text",
      ["#000000", "#111111"],
    ),
    "--tm-contact-muted": themeColor(
      props.mutedTextColor,
      "#55554e",
      "--tm-theme-sub",
      ["#6b7280", "#777777"],
    ),
    "--tm-contact-line": themeColor(
      props.lineColor,
      "#E6E6E0",
      "--tm-theme-line",
      ["#d9d9d9", "#e5e5e5"],
    ),
    "--tm-contact-panel": "var(--tm-theme-panel, #F1F1EC)",
    "--tm-contact-accent": themeColor(
      props.buttonBackgroundColor,
      "#C7F136",
      "--tm-theme-accent",
      ["#000000"],
    ),
    "--tm-contact-button-text": themeColor(
      props.buttonTextColor,
      "#0E0E0C",
      "--tm-theme-text",
      ["#ffffff", "#fff"],
    ),
    "--tm-contact-dark": "var(--tm-theme-dark, #0E0E0C)",
  } as any;

  function updateField(field: keyof ContactForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    if (submitted) setSubmitted(false);
  }

  function submit(event: Event) {
    event.preventDefault();
    if (!kvkkAccepted) return;
    setSubmitted(true);
    window.location.href = mailHref(
      recipient,
      form,
      phoneCountry.dialCode,
      emailSubjectPrefix,
      {
        firstName: firstNameLabel,
        lastName: lastNameLabel,
        email: emailLabel,
        phone: phoneLabel,
      },
      props.showPhoneField !== false,
    );
  }

  const phoneCountry =
    phoneCountries.find((country) => country.iso === phoneCountryIso) ||
    phoneCountries[0];

  return (
    <section className="three-mash-contact-page" style={style}>
      <div className="tm-contact-shell">
        {props.showHero !== false && (
          <section className="tm-contact-hero">
            <span className="tm-contact-kicker">{heroKickerText}</span>
            <div
              className={`tm-contact-hero-grid${props.showDirectContact === false ? " tm-contact-hero-grid--single" : ""}`}
            >
              <div>
                <h1>{titleText}</h1>
                <p>{descriptionText}</p>
              </div>
              {props.showDirectContact !== false && (
                <div className="tm-contact-direct">
                  <a href={safeMailtoHref(recipient, directEmailSubjectText, "")}>{recipient}</a>
                  <a
                    href={locationHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {locationText}
                  </a>
                  <span>{supportText}</span>
                </div>
              )}
            </div>
          </section>
        )}

        <section
          className={`tm-contact-layout${props.showInfoPanel === false || props.showContactForm === false ? " tm-contact-layout--single" : ""}`}
        >
          {props.showInfoPanel !== false && (
            <aside className="tm-contact-info-panel">
              <span className="tm-contact-section-code">{props.infoPanelCode || "01"}</span>
              <h2>{infoPanelTitle}</h2>
              <p>{infoPanelDescription}</p>
              {props.showInfoList !== false && (
                <div className="tm-contact-info-list">
                  <div>
                    <b>{responseTimeLabel}</b>
                    <span>{responseTimeValue}</span>
                  </div>
                  <div>
                    <b>{supportScopeLabel}</b>
                    <span>{supportScopeValue}</span>
                  </div>
                  <div>
                    <b>{locationLabel}</b>
                    <span>{locationText}</span>
                  </div>
                  {props.showExtraInfo1 === true && (
                    <div>
                      <b>{extraInfo1Label}</b>
                      <span>{extraInfo1Value}</span>
                    </div>
                  )}
                  {props.showExtraInfo2 === true && (
                    <div>
                      <b>{extraInfo2Label}</b>
                      <span>{extraInfo2Value}</span>
                    </div>
                  )}
                </div>
              )}
            </aside>
          )}

          {props.showContactForm !== false && <form className="tm-contact-form" onSubmit={submit}>
            <div className="tm-contact-grid">
              <label className="tm-contact-field">
                <span className="is-required">
                  * {firstNameLabel}
                </span>
                <input
                  value={form.firstName}
                  required
                  autoComplete="given-name"
                  onInput={(event) =>
                    updateField(
                      "firstName",
                      (event.currentTarget as HTMLInputElement).value,
                    )
                  }
                />
              </label>

              <label className="tm-contact-field">
                <span className="is-required">
                  * {lastNameLabel}
                </span>
                <input
                  value={form.lastName}
                  required
                  autoComplete="family-name"
                  onInput={(event) =>
                    updateField(
                      "lastName",
                      (event.currentTarget as HTMLInputElement).value,
                    )
                  }
                />
              </label>

              <label className="tm-contact-field">
                <span className="is-required">
                  * {emailLabel}
                </span>
                <input
                  type="email"
                  value={form.email}
                  required
                  autoComplete="email"
                  onInput={(event) =>
                    updateField(
                      "email",
                      (event.currentTarget as HTMLInputElement).value,
                    )
                  }
                />
              </label>

              {props.showPhoneField !== false && (
                <label className="tm-contact-field">
                  <span>{phoneLabel}</span>
                  <div className="tm-contact-phone">
                    <label
                      className="tm-contact-country"
                      aria-label={phoneCountryAriaLabel}
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
                        {phoneCountries.map((country) => (
                          <option
                            key={country.iso}
                            value={country.iso}
                          >{`${country.name} ${country.dialCode}`}</option>
                        ))}
                      </select>
                    </label>
                    <b>{phoneCountry.dialCode}</b>
                    <input
                      value={form.phone}
                      inputMode="tel"
                      autoComplete="tel"
                      onInput={(event) =>
                        updateField(
                          "phone",
                          (event.currentTarget as HTMLInputElement).value,
                        )
                      }
                    />
                  </div>
                </label>
              )}
            </div>

            <label className="tm-contact-field tm-contact-message">
              <span className="is-required">
                * {messageLabel}
              </span>
              <textarea
                rows={5}
                value={form.message}
                required
                onInput={(event) =>
                  updateField(
                    "message",
                    (event.currentTarget as HTMLTextAreaElement).value,
                  )
                }
              />
            </label>

            <label className="tm-contact-consent">
              <input
                type="checkbox"
                checked={kvkkAccepted}
                onInput={(event) =>
                  setKvkkAccepted(
                    (event.currentTarget as HTMLInputElement).checked,
                  )
                }
              />
              <span>
                {kvkkTextBefore}{" "}
                <a
                  href={href(props.kvkkHref, tLocalized("/pages/gizlilik-politikasi-ve-kvkk", "/pages/gizlilik-politikasi-ve-kvkk"))}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {kvkkLinkText}
                </a>
              </span>
            </label>

            <button
              className="tm-contact-submit"
              type="submit"
              disabled={!kvkkAccepted}
            >
              <span>{buttonText}</span>
            </button>

            {submitted ? (
              <p className="tm-contact-status">
                {successText}
              </p>
            ) : null}
          </form>}
        </section>
      </div>
    </section>
  );
}

export default ThreeMashContactPage;
