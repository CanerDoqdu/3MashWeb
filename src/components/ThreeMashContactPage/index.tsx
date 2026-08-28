import { useState } from "preact/hooks";
import { Props } from "./types";
import { t, tLocalized, tProp } from "../../utils/i18n";

type ContactForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
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

function mailHref(recipient: string, form: ContactForm, dialCode: string) {
  const subject = encodeURIComponent(
    `3mash İletişim Formu - ${form.firstName} ${form.lastName}`.trim(),
  );
  const phone = form.phone.trim() ? `${dialCode} ${form.phone.trim()}` : "-";
  const body = encodeURIComponent(
    [
      `Ad: ${form.firstName}`,
      `Soyad: ${form.lastName}`,
      `Email: ${form.email}`,
      `Telefon: ${phone}`,
      "",
      form.message,
    ].join("\n"),
  );
  return `mailto:${recipient}?subject=${subject}&body=${body}`;
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

  const recipient = text(props.recipientEmail, "info@3mash.com");
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
    window.location.href = mailHref(recipient, form, phoneCountry.dialCode);
  }

  const phoneCountry =
    phoneCountries.find((country) => country.iso === phoneCountryIso) ||
    phoneCountries[0];

  return (
    <section className="three-mash-contact-page" style={style}>
      <div className="tm-contact-shell">
        <section className="tm-contact-hero">
          <span className="tm-contact-kicker">{t("footer.contactTitle", "İLETİŞİM")}</span>
          <div className="tm-contact-hero-grid">
            <div>
              <h1>{text(props.titleText, tLocalized("Bize Ulaşın", "Contact Us"), "Contact Us")}</h1>
              <p>
                {text(
                  props.descriptionText,
                  "Sizden herhangi bir soru ya da geri dönüş gelince çok mutlu oluyoruz. Aşağıdaki formu kullanarak bize her türlü soruyu sorabilirsiniz. Size en geç 24 saat içinde yanıt vereceğiz. Sitemizi ziyaret ettiğiniz için teşekkür ederiz.",
                  "We are very happy to receive any questions or feedback from you. You can ask us anything using the form below. We will respond to you within 24 hours at the latest. Thank you for visiting our website."
                )}
              </p>
            </div>
            <div className="tm-contact-direct">
              <a href={`mailto:${recipient}`}>{recipient}</a>
              <a
                href="https://maps.google.com/?q=Antalya%20Teknokent%20Konyaalt%C4%B1"
                target="_blank"
                rel="noreferrer"
              >
                {tLocalized("Antalya Teknokent, Konyaaltı", "Antalya Technopark, Konyaalti")}
              </a>
              <span>{tLocalized("Teknik destek ve ürün danışmanlığı", "Technical support & product consulting")}</span>
            </div>
          </div>
        </section>

        <section className="tm-contact-layout">
          <aside className="tm-contact-info-panel">
            <span className="tm-contact-section-code">01</span>
            <h2>{tLocalized("Doğru kişiye hızlı ulaşın.", "Reach the right person fast.")}</h2>
            <p>
              {tLocalized(
                "Ürün seçimi, parametre kalibrasyonu, satış sonrası destek veya Academy iş birlikleri için mesajınızı doğrudan ekibe iletin.",
                "Send your message directly to the team for product selection, parameter calibration, post-sale support or Academy partnerships."
              )}
            </p>
            <div className="tm-contact-info-list">
              <div>
                <b>{tLocalized("Yanıt süresi", "Response time")}</b>
                <span>{tLocalized("En geç 24 saat içinde dönüş", "Reply within 24 hours at latest")}</span>
              </div>
              <div>
                <b>{tLocalized("Destek kapsamı", "Support scope")}</b>
                <span>{tLocalized("Cihaz, reçine, kürleme ve sarf malzemeleri", "Printers, resins, curing and consumables")}</span>
              </div>
              <div>
                <b>{tLocalized("Lokasyon", "Location")}</b>
                <span>Antalya Teknokent</span>
              </div>
            </div>
          </aside>

          <form className="tm-contact-form" onSubmit={submit}>
            <div className="tm-contact-grid">
              <label className="tm-contact-field">
                <span className="is-required">
                  * {text(props.firstNameLabel, tLocalized("Ad", "First Name"), "First Name")}
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
                  * {text(props.lastNameLabel, tLocalized("Soyad", "Last Name"), "Last Name")}
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
                  * {text(props.emailLabel, "Email", "Email")}
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

              <label className="tm-contact-field">
                <span>{text(props.phoneLabel, tLocalized("Telefon", "Phone"), "Phone")}</span>
                <div className="tm-contact-phone">
                  <label
                    className="tm-contact-country"
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
            </div>

            <label className="tm-contact-field tm-contact-message">
              <span className="is-required">
                * {text(props.messageLabel, tLocalized("Mesaj", "Message"), "Message")}
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
                {text(
                  props.kvkkTextBefore,
                  tLocalized("Kişisel verilerin korunması kanunu", "Personal data protection law"),
                  "Personal data protection law"
                )}{" "}
                <a
                  href={href(props.kvkkHref, "/pages/gizlilik-politikasi-ve-kvkk")}
                  target="_blank"
                  rel="noreferrer"
                >
                  {text(props.kvkkLinkText, tLocalized("okudum, onaylıyorum", "I have read and agree"), "I have read and agree")}
                </a>
              </span>
            </label>

            <button
              className="tm-contact-submit"
              type="submit"
              disabled={!kvkkAccepted}
            >
              <span>{text(props.buttonText, "Gönder", "Send")}</span>
            </button>

            {submitted ? (
              <p className="tm-contact-status">
                {text(props.successText, tLocalized("Mail uygulamanız açılıyor.", "Opening mail app..."), "Opening mail app...")}
              </p>
            ) : null}
          </form>
        </section>
      </div>
    </section>
  );
}

export default ThreeMashContactPage;
