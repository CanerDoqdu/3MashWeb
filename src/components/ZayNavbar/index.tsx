import { useState } from "preact/hooks";
import { Props } from "./types";

type IconName =
  | "envelope"
  | "phone"
  | "facebook"
  | "instagram"
  | "twitter"
  | "linkedin"
  | "search"
  | "cart"
  | "user";

interface IconProps {
  name: IconName;
  className?: string;
}

function Icon({ name, className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {name === "envelope" && (
        <path d="M4 6h16v12H4V6Zm8 7.1L5.9 8H5v.8l7 5.8 7-5.8V8h-.9L12 13.1Z" />
      )}
      {name === "phone" && (
        <path d="M6.7 3.8 10 7.1 8.2 9c.9 1.8 2.3 3.2 4.1 4.1l1.9-1.8 3.3 3.3-1.7 3.8c-.2.5-.8.8-1.4.7C8.9 18.3 4.8 14.2 4 8.7c-.1-.6.2-1.1.7-1.4l2-3.5Z" />
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
      {name === "search" && (
        <path d="m20.5 19.1-4.2-4.2a7.3 7.3 0 1 0-1.4 1.4l4.2 4.2 1.4-1.4ZM5 10.7a5.7 5.7 0 1 1 11.4 0A5.7 5.7 0 0 1 5 10.7Z" />
      )}
      {name === "cart" && (
        <path d="M7.4 18.2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6Zm9 0a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6ZM5.2 4H2v2h1.7l2.4 9.2c.3 1 1.1 1.6 2.1 1.6h8.5c1 0 1.8-.6 2.1-1.5L21 8H7.1L6.5 5.7C6.3 4.7 5.8 4 5.2 4Zm2.4 6h10.7l-1.4 4.8H8.4L7.6 10Z" />
      )}
      {name === "user" && (
        <path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 2c-4.4 0-8 2.4-8 5.4V21h16v-1.6c0-3-3.6-5.4-8-5.4Z" />
      )}
    </svg>
  );
}

export function ZayNavbar({
  logoText,
  logoHref = "/",
  showTopBar = true,
  emailText,
  emailHref,
  phoneText,
  phoneHref,
  facebookHref,
  instagramHref,
  twitterHref,
  linkedinHref,
  facebookAriaLabel,
  instagramAriaLabel,
  twitterAriaLabel,
  linkedinAriaLabel,
  homeText,
  homeHref = "/",
  aboutText,
  aboutHref = "/about",
  shopText,
  shopHref = "/shop",
  contactText,
  contactHref = "/contact",
  searchPlaceholder,
  searchAriaLabel,
  menuAriaLabel,
  cartHref = "/cart",
  cartCount,
  cartAriaLabel,
  accountHref = "/account",
  accountCount,
  accountAriaLabel,
  backgroundColor = "#ffffff",
  topBarBackgroundColor = "#212934",
  topBarTextColor = "#cfd6e1",
  logoColor = "#59ab6e",
  linkColor = "#212934",
  accentColor = "#69bb7e",
  iconColor = "#212934",
  badgeBackgroundColor = "#e9eef5",
  badgeTextColor = "#212934",
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { text: homeText, href: homeHref },
    { text: aboutText, href: aboutHref },
    { text: shopText, href: shopHref },
    { text: contactText, href: contactHref },
  ].filter((item) => item.text);

  const socialLinks = [
    { href: facebookHref, label: facebookAriaLabel, icon: "facebook" as const },
    { href: instagramHref, label: instagramAriaLabel, icon: "instagram" as const },
    { href: twitterHref, label: twitterAriaLabel, icon: "twitter" as const },
    { href: linkedinHref, label: linkedinAriaLabel, icon: "linkedin" as const },
  ].filter((item) => item.href && item.label);

  const rootStyle = {
    backgroundColor,
    "--zay-top-bg": topBarBackgroundColor,
    "--zay-top-text": topBarTextColor,
    "--zay-logo": logoColor,
    "--zay-link": linkColor,
    "--zay-accent": accentColor,
    "--zay-icon": iconColor,
    "--zay-badge-bg": badgeBackgroundColor,
    "--zay-badge-text": badgeTextColor,
  } as any;

  return (
    <section className="zay-navbar" style={rootStyle}>
      {showTopBar && (
        <div className="zay-navbar__top">
          <div className="zay-navbar__container zay-navbar__top-content">
            <div className="zay-navbar__contact">
              {emailText && emailHref && (
                <a className="zay-navbar__top-link" href={emailHref}>
                  <Icon name="envelope" className="zay-navbar__top-icon" />
                  <span>{emailText}</span>
                </a>
              )}
              {phoneText && phoneHref && (
                <a className="zay-navbar__top-link" href={phoneHref}>
                  <Icon name="phone" className="zay-navbar__top-icon" />
                  <span>{phoneText}</span>
                </a>
              )}
            </div>
            {socialLinks.length > 0 && (
              <div className="zay-navbar__social">
                {socialLinks.map((item) => (
                  <a
                    key={item.icon}
                    className="zay-navbar__social-link"
                    href={item.href}
                    aria-label={item.label}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon name={item.icon} className="zay-navbar__social-icon" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <nav className="zay-navbar__main">
        <div className="zay-navbar__container zay-navbar__main-content">
          <a className="zay-navbar__logo" href={logoHref}>
            {logoText}
          </a>

          <button
            className={`zay-navbar__toggle${isOpen ? " zay-navbar__toggle--open" : ""}`}
            type="button"
            aria-label={menuAriaLabel}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>

          <div className={`zay-navbar__collapse${isOpen ? " zay-navbar__collapse--open" : ""}`}>
            <ul className="zay-navbar__menu">
              {navItems.map((item) => (
                <li className="zay-navbar__menu-item" key={item.href}>
                  <a className="zay-navbar__menu-link" href={item.href}>
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>

            <div className="zay-navbar__actions">
              <label className="zay-navbar__mobile-search">
                <input className="zay-navbar__search-input" type="text" placeholder={searchPlaceholder} />
                <span className="zay-navbar__search-addon">
                  <Icon name="search" className="zay-navbar__action-icon" />
                </span>
              </label>

              <button className="zay-navbar__icon-button zay-navbar__desktop-search" type="button" aria-label={searchAriaLabel}>
                <Icon name="search" className="zay-navbar__action-icon" />
              </button>

              <a className="zay-navbar__icon-link" href={cartHref} aria-label={cartAriaLabel}>
                <Icon name="cart" className="zay-navbar__action-icon" />
                {cartCount && <span className="zay-navbar__badge">{cartCount}</span>}
              </a>

              <a className="zay-navbar__icon-link" href={accountHref} aria-label={accountAriaLabel}>
                <Icon name="user" className="zay-navbar__action-icon" />
                {accountCount && <span className="zay-navbar__badge">{accountCount}</span>}
              </a>
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
}

export default ZayNavbar;
