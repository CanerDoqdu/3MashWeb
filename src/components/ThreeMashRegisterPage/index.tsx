import { useState } from "preact/hooks";
import { customerStore, register, Router, type IkasImage } from "@ikas/bp-storefront";
import { Props } from "./types";

const defaultAuthImage = "https://cdn.myikas.com/images/theme-images/a6f9541f-702d-431d-9744-9d4f494c94af/image_1080.webp";
const logoImageIds = ["4a6af8e2-cb7c-4cc8-ba17-13656d4b8670", "b87e4343-0ef5-4084-b8b0-1b60abeb1012", "de819199-332c-407c-82de-917418b2c2e1"];

function text(value: string | undefined, fallback: string) {
  return value?.trim() || fallback;
}

function href(value: string | undefined, fallback: string) {
  const next = value?.trim();
  return next && next !== "#" ? next : fallback;
}

function imageIdToUrl(value: string) {
  const trimmed = value.trim();
  if (trimmed.includes("a6f9541f-702d-431d-9744-9d4f494c94af")) return defaultAuthImage;
  if (trimmed.startsWith("theme-images/")) return `https://cdn.myikas.com/images/${trimmed}/image_3840.webp`;
  return trimmed;
}

function withAuthFallback(value: string) {
  return logoImageIds.some((id) => value.includes(id)) ? defaultAuthImage : value;
}

function imageSource(value: IkasImage | string | null | undefined, fallback: string) {
  if (typeof value === "string" && value.trim()) return withAuthFallback(imageIdToUrl(value));
  if (value && typeof value === "object") {
    const image = value as { id?: unknown; url?: unknown; src?: unknown; imageUrl?: unknown; image?: { url?: unknown; src?: unknown }; file?: { url?: unknown; src?: unknown } };
    if (typeof image.url === "string") return withAuthFallback(imageIdToUrl(image.url));
    if (typeof image.src === "string") return withAuthFallback(imageIdToUrl(image.src));
    if (typeof image.imageUrl === "string") return withAuthFallback(imageIdToUrl(image.imageUrl));
    if (typeof image.id === "string") return withAuthFallback(imageIdToUrl(image.id));
    if (typeof image.image?.url === "string") return withAuthFallback(imageIdToUrl(image.image.url));
    if (typeof image.image?.src === "string") return withAuthFallback(imageIdToUrl(image.image.src));
    if (typeof image.file?.url === "string") return withAuthFallback(imageIdToUrl(image.file.url));
    if (typeof image.file?.src === "string") return withAuthFallback(imageIdToUrl(image.file.src));
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
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function submit(event: Event) {
    event.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    const result = await register(customerStore, firstName, lastName, email, password, marketingAccepted, [], null);
    if (result.isSuccess) {
      setStatus("success");
      setTimeout(() => Router.navigate("/account"), 350);
      return;
    }
    setStatus("error");
  }

  const image = imageSource(props.backgroundImageUrl, defaultAuthImage);

  return (
    <section className="three-mash-register-page">
      <div className="tmrpg-auth-panel">
        <form className="tmrpg-auth-form" onSubmit={submit}>
          <div className="tmrpg-auth-tabs">
            <a href={href(props.loginTabHref, "/account/login")}>{text(props.loginTabText, "Üye Girişi")}</a>
            <span className="is-active">{text(props.registerTabText, "Üye Ol")}</span>
          </div>

          <label className="tmrpg-auth-field">
            <span>* {text(props.nameLabel, "Ad")}</span>
            <input name="firstName" autoComplete="given-name" value={firstName} required onInput={(event) => setFirstName((event.currentTarget as HTMLInputElement).value)} />
          </label>

          <label className="tmrpg-auth-field">
            <span>* {text(props.surnameLabel, "Soyad")}</span>
            <input name="lastName" autoComplete="family-name" value={lastName} required onInput={(event) => setLastName((event.currentTarget as HTMLInputElement).value)} />
          </label>

          <label className="tmrpg-auth-field">
            <span>* {text(props.emailLabel, "Email")}</span>
            <input name="email" type="email" autoComplete="email" value={email} required onInput={(event) => setEmail((event.currentTarget as HTMLInputElement).value)} />
          </label>

          <label className="tmrpg-auth-field">
            <span>* {text(props.passwordLabel, "Şifre")}</span>
            <input name="password" type="password" autoComplete="new-password" value={password} required onInput={(event) => setPassword((event.currentTarget as HTMLInputElement).value)} />
          </label>

          <label className="tmrpg-auth-check">
            <input type="checkbox" checked={marketingAccepted} onInput={(event) => setMarketingAccepted((event.currentTarget as HTMLInputElement).checked)} />
            <span>
              Kampanyalardan haberdar olmak için <a href={href(props.marketingHref, "/2tplvqpo-commercial-electronic-page")}>Ticari Elektronik İleti Onayı</a> metnini okudum, onaylıyorum.
              <br />
              Tarafınızdan gönderilecek ticari elektronik iletileri almak istiyorum.
            </span>
          </label>

          <label className="tmrpg-auth-check">
            <input type="checkbox" checked={termsAccepted} required onInput={(event) => setTermsAccepted((event.currentTarget as HTMLInputElement).checked)} />
            <span>
              <a href={href(props.termsHref, "/2tplvqpo-membership-agreement-page")}>Üyelik Sözleşmesi</a> ve <a href={href(props.kvkkHref, "/2tplvqpo-kvkk-page")}>KVKK Aydınlatma Metni</a>ni okudum, kabul ediyorum.
            </span>
          </label>

          <button className="tmrpg-auth-submit" type="submit" disabled={status === "loading" || !termsAccepted}>
            {status === "loading" ? text(props.loadingText, "Kaydınız oluşturuluyor...") : text(props.submitButtonText, "Hesap Oluştur")}
          </button>

          {status !== "idle" && (
            <p className={`tmrpg-auth-status is-${status}`}>
              {status === "success" ? text(props.successMessage, "Kaydınız oluşturuldu. Hesabınıza yönlendiriliyorsunuz.") : status === "error" ? text(props.errorMessage, "Kayıt tamamlanamadı. Lütfen bilgilerinizi kontrol edin.") : text(props.loadingText, "Kaydınız oluşturuluyor...")}
            </p>
          )}
        </form>
      </div>

      <div className="tmrpg-auth-image" aria-hidden="true">
        <img src={image} alt="" />
      </div>
    </section>
  );
}

export default ThreeMashRegisterPage;
