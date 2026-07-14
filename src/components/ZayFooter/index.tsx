import { Props } from "./types";

type IconName = "location" | "phone" | "envelope" | "facebook" | "instagram" | "twitter" | "linkedin";

function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {name === "location" && (
        <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.7A2.7 2.7 0 1 1 12 6.3a2.7 2.7 0 0 1 0 5.4Z" />
      )}
      {name === "phone" && (
        <path d="M6.7 3.8 10 7.1 8.2 9c.9 1.8 2.3 3.2 4.1 4.1l1.9-1.8 3.3 3.3-1.7 3.8c-.2.5-.8.8-1.4.7C8.9 18.3 4.8 14.2 4 8.7c-.1-.6.2-1.1.7-1.4l2-3.5Z" />
      )}
      {name === "envelope" && (
        <path d="M4 6h16v12H4V6Zm8 7.1L5.9 8H5v.8l7 5.8 7-5.8V8h-.9L12 13.1Z" />
      )}
      {name === "facebook" && <path d="M14 8.5h2V5h-2.7c-3 0-4.3 1.8-4.3 4.2V12H7v3.4h2V21h3.8v-5.6h2.6L16 12h-3.2V9.6c0-.7.4-1.1 1.2-1.1Z" />}
      {name === "instagram" && (
        <path d="M8 3h8c2.8 0 5 2.2 5 5v8c0 2.8-2.2 5-5 5H8c-2.8 0-5-2.2-5-5V8c0-2.8 2.2-5 5-5Zm0 2c-1.7 0-3 1.3-3 3v8c0 1.7 1.3 3 3 3h8c1.7 0 3-1.3 3-3V8c0-1.7-1.3-3-3-3H8Zm4 3.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Zm0 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm4.8-3.2a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Z" />
      )}
      {name === "twitter" && (
        <path d="M20.7 7.1v.5c0 5.5-4.2 11.8-11.8 11.8-2.3 0-4.5-.7-6.3-1.9h1c1.9 0 3.7-.7 5.1-1.8-1.8 0-3.3-1.2-3.8-2.8.3.1.5.1.8.1.4 0 .7-.1 1.1-.2-1.9-.4-3.3-2-3.3-4v-.1c.6.3 1.2.5 1.9.5-1.1-.8-1.9-2-1.9-3.4 0-.8.2-1.5.6-2.1 2.1 2.5 5.2 4.2 8.6 4.4-.1-.3-.1-.6-.1-.9 0-2.3 1.9-4.1 4.1-4.1 1.2 0 2.2.5 3 1.3.9-.2 1.8-.5 2.5-1-.3 1-.9 1.7-1.7 2.2.8-.1 1.5-.3 2.2-.6-.5.8-1.1 1.5-1.8 2.1Z" />
      )}
      {name === "linkedin" && (
        <path d="M6.5 8.7H3.4V21h3.1V8.7ZM5 3C4 3 3.2 3.8 3.2 4.8S4 6.6 5 6.6s1.8-.8 1.8-1.8S6 3 5 3Zm16 11.1c0-3.3-1.8-5.4-4.6-5.4-1.6 0-2.7.9-3.2 1.8V8.7h-3.1V21h3.1v-6.6c0-1.7.9-2.7 2.3-2.7s2.3 1 2.3 2.8V21H21v-6.9Z" />
      )}
    </svg>
  );
}

export function ZayFooter({
  brandTitle,
  productsTitle,
  infoTitle,
  addressText,
  phoneText,
  phoneHref,
  emailText,
  emailHref,
  productLink1Text,
  productLink1Href,
  productLink2Text,
  productLink2Href,
  productLink3Text,
  productLink3Href,
  productLink4Text,
  productLink4Href,
  productLink5Text,
  productLink5Href,
  productLink6Text,
  productLink6Href,
  productLink7Text,
  productLink7Href,
  infoLink1Text,
  infoLink1Href,
  infoLink2Text,
  infoLink2Href,
  infoLink3Text,
  infoLink3Href,
  infoLink4Text,
  infoLink4Href,
  infoLink5Text,
  infoLink5Href,
  facebookHref,
  facebookAriaLabel,
  instagramHref,
  instagramAriaLabel,
  twitterHref,
  twitterAriaLabel,
  linkedinHref,
  linkedinAriaLabel,
  emailInputLabel,
  emailPlaceholder,
  subscribeButtonText,
  copyrightText,
  backgroundColor = "#212934",
  bottomBackgroundColor = "#1d242d",
  headingColor = "#cfd6e1",
  brandColor = "#59ab6e",
  textColor = "#cfd6e1",
  linkColor = "#dcdde1",
  accentColor = "#68bb7d",
  borderColor = "#2d343f",
  subscribeButtonBackgroundColor = "#59ab6e",
  subscribeButtonTextColor = "#ffffff",
}: Props) {
  const productLinks = [
    { text: productLink1Text, href: productLink1Href },
    { text: productLink2Text, href: productLink2Href },
    { text: productLink3Text, href: productLink3Href },
    { text: productLink4Text, href: productLink4Href },
    { text: productLink5Text, href: productLink5Href },
    { text: productLink6Text, href: productLink6Href },
    { text: productLink7Text, href: productLink7Href },
  ].filter((link) => link.text);

  const infoLinks = [
    { text: infoLink1Text, href: infoLink1Href },
    { text: infoLink2Text, href: infoLink2Href },
    { text: infoLink3Text, href: infoLink3Href },
    { text: infoLink4Text, href: infoLink4Href },
    { text: infoLink5Text, href: infoLink5Href },
  ].filter((link) => link.text);

  const socialLinks = [
    { href: facebookHref, label: facebookAriaLabel, icon: "facebook" as const },
    { href: instagramHref, label: instagramAriaLabel, icon: "instagram" as const },
    { href: twitterHref, label: twitterAriaLabel, icon: "twitter" as const },
    { href: linkedinHref, label: linkedinAriaLabel, icon: "linkedin" as const },
  ].filter((link) => link.href && link.label);

  const rootStyle = {
    backgroundColor,
    color: textColor,
    "--zay-footer-bottom-bg": bottomBackgroundColor,
    "--zay-footer-heading": headingColor,
    "--zay-footer-brand": brandColor,
    "--zay-footer-link": linkColor,
    "--zay-footer-accent": accentColor,
    "--zay-footer-border": borderColor,
    "--zay-footer-subscribe-bg": subscribeButtonBackgroundColor,
    "--zay-footer-subscribe-text": subscribeButtonTextColor,
  } as any;

  return (
    <section className="zay-footer" style={rootStyle}>
      <div className="zay-footer__container">
        <div className="zay-footer__columns">
          <div className="zay-footer__column">
            {brandTitle && <h2 className="zay-footer__heading zay-footer__heading--brand">{brandTitle}</h2>}
            <ul className="zay-footer__list zay-footer__contact-list">
              {addressText && (
                <li className="zay-footer__contact-item">
                  <Icon name="location" className="zay-footer__contact-icon" />
                  <span>{addressText}</span>
                </li>
              )}
              {phoneText && (
                <li className="zay-footer__contact-item">
                  <Icon name="phone" className="zay-footer__contact-icon" />
                  <a href={phoneHref}>{phoneText}</a>
                </li>
              )}
              {emailText && (
                <li className="zay-footer__contact-item">
                  <Icon name="envelope" className="zay-footer__contact-icon" />
                  <a href={emailHref}>{emailText}</a>
                </li>
              )}
            </ul>
          </div>

          <div className="zay-footer__column">
            {productsTitle && <h2 className="zay-footer__heading">{productsTitle}</h2>}
            <ul className="zay-footer__list">
              {productLinks.map((link) => (
                <li className="zay-footer__list-item" key={link.text}>
                  <a href={link.href}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="zay-footer__column">
            {infoTitle && <h2 className="zay-footer__heading">{infoTitle}</h2>}
            <ul className="zay-footer__list">
              {infoLinks.map((link) => (
                <li className="zay-footer__list-item" key={link.text}>
                  <a href={link.href}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="zay-footer__divider" />

        <div className="zay-footer__utility">
          {socialLinks.length > 0 && (
            <div className="zay-footer__social">
              {socialLinks.map((link) => (
                <a
                  className="zay-footer__social-link"
                  href={link.href}
                  aria-label={link.label}
                  target="_blank"
                  rel="noreferrer"
                  key={link.icon}
                >
                  <Icon name={link.icon} className="zay-footer__social-icon" />
                </a>
              ))}
            </div>
          )}

          <form className="zay-footer__subscribe" onSubmit={(event) => event.preventDefault()}>
            {emailInputLabel && <label className="zay-footer__sr-only">{emailInputLabel}</label>}
            <input className="zay-footer__input" type="email" placeholder={emailPlaceholder} />
            {subscribeButtonText && (
              <button className="zay-footer__button" type="submit">
                {subscribeButtonText}
              </button>
            )}
          </form>
        </div>
      </div>

      {copyrightText && (
        <div className="zay-footer__bottom">
          <div className="zay-footer__container">
            <div className="zay-footer__copyright" dangerouslySetInnerHTML={{ __html: copyrightText }} />
          </div>
        </div>
      )}
    </section>
  );
}

export default ZayFooter;
