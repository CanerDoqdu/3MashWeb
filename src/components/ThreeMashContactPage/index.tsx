import { useState } from "preact/hooks";
import { Props } from "./types";

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

function text(value: string | undefined, fallback: string) {
  return value?.trim() || fallback;
}

function href(value: string | undefined, fallback: string) {
  const next = value?.trim();
  return next && next !== "#" ? next : fallback;
}

function mailHref(recipient: string, form: ContactForm, dialCode: string) {
  const subject = encodeURIComponent(`3mash İletişim Formu - ${form.firstName} ${form.lastName}`.trim());
  const phone = form.phone.trim() ? `${dialCode} ${form.phone.trim()}` : "-";
  const body = encodeURIComponent(
    [`Ad: ${form.firstName}`, `Soyad: ${form.lastName}`, `Email: ${form.email}`, `Telefon: ${phone}`, "", form.message].join("\n"),
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
    "--tm-contact-bg": text(props.backgroundColor, "#ffffff"),
    "--tm-contact-text": text(props.textColor, "#000000"),
    "--tm-contact-muted": text(props.mutedTextColor, "#6b7280"),
    "--tm-contact-line": text(props.lineColor, "#d9d9d9"),
    "--tm-contact-button-bg": text(props.buttonBackgroundColor, "#000000"),
    "--tm-contact-button-text": text(props.buttonTextColor, "#ffffff"),
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

  const phoneCountry = phoneCountries.find((country) => country.iso === phoneCountryIso) || phoneCountries[0];

  return (
    <section className="three-mash-contact-page" style={style}>
      <div className="tm-contact-shell">
        <header className="tm-contact-heading">
          <h1>{text(props.titleText, "Bize Ulaşın")}</h1>
          <p>
            {text(
              props.descriptionText,
              "Sizden herhangi bir soru ya da geri dönüş gelince çok mutlu oluyoruz. Aşağıdaki formu kullanarak bize her türlü soruyu sorabilirsiniz. Size en geç 24 saat içinde yanıt vereceğiz. Sitemizi ziyaret ettiğiniz için teşekkür ederiz.",
            )}
          </p>
        </header>

        <form className="tm-contact-form" onSubmit={submit}>
          <div className="tm-contact-grid">
            <label className="tm-contact-field">
              <span className="is-required">* {text(props.firstNameLabel, "Ad")}</span>
              <input value={form.firstName} required autoComplete="given-name" onInput={(event) => updateField("firstName", (event.currentTarget as HTMLInputElement).value)} />
            </label>

            <label className="tm-contact-field">
              <span className="is-required">* {text(props.lastNameLabel, "Soyad")}</span>
              <input value={form.lastName} required autoComplete="family-name" onInput={(event) => updateField("lastName", (event.currentTarget as HTMLInputElement).value)} />
            </label>

            <label className="tm-contact-field">
              <span className="is-required">* {text(props.emailLabel, "Email")}</span>
              <input type="email" value={form.email} required autoComplete="email" onInput={(event) => updateField("email", (event.currentTarget as HTMLInputElement).value)} />
            </label>

            <label className="tm-contact-field">
              <span>{text(props.phoneLabel, "Telefon")}</span>
              <div className="tm-contact-phone">
                <label className="tm-contact-country" aria-label="Telefon ülke kodu">
                  <img src={`https://cdn.myikas.com/sf/assets/flags/3x2/${phoneCountry.iso}.svg`} alt={phoneCountry.iso} />
                  <span aria-hidden="true">⌄</span>
                  <select value={phoneCountry.iso} onChange={(event) => setPhoneCountryIso((event.currentTarget as HTMLSelectElement).value)}>
                    {phoneCountries.map((country) => (
                      <option value={country.iso}>{`${country.name} ${country.dialCode}`}</option>
                    ))}
                  </select>
                </label>
                <b>{phoneCountry.dialCode}</b>
                <input value={form.phone} inputMode="tel" autoComplete="tel" pattern="\\d{7,14}" onInput={(event) => updateField("phone", (event.currentTarget as HTMLInputElement).value)} />
              </div>
            </label>
          </div>

          <label className="tm-contact-field tm-contact-message">
            <span className="is-required">* {text(props.messageLabel, "Mesaj")}</span>
            <textarea rows={5} value={form.message} required onInput={(event) => updateField("message", (event.currentTarget as HTMLTextAreaElement).value)} />
          </label>

          <label className="tm-contact-consent">
            <input type="checkbox" checked={kvkkAccepted} onInput={(event) => setKvkkAccepted((event.currentTarget as HTMLInputElement).checked)} />
            <span>
              {text(props.kvkkTextBefore, "Kişisel verilerin korunması kanunu")}{" "}
              <a href={href(props.kvkkHref, "/pages/gizlilik-politikasi-ve-kvkk")} target="_blank" rel="noreferrer">
                {text(props.kvkkLinkText, "okudum, onaylıyorum")}
              </a>
            </span>
          </label>

          <button className="tm-contact-submit" type="submit" disabled={!kvkkAccepted}>
            <span>{text(props.buttonText, "Gönder")}</span>
          </button>

          {submitted ? <p className="tm-contact-status">{text(props.successText, "Mail uygulamanız açılıyor.")}</p> : null}
        </form>
      </div>
    </section>
  );
}

export default ThreeMashContactPage;
