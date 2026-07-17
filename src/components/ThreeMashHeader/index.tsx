import { useEffect, useRef, useState } from "preact/hooks";
import threeMashLogoImage from "../../assets/three-mash-logo-data";
import vectorPrinterImage from "../../assets/vectorprinter-data";
import { Props } from "./types";

type MenuItem = {
  title?: string;
  description?: string;
  href?: string;
  iconImageUrl?: unknown;
  iconSvg?: unknown;
};

type FlowItem = {
  number?: string;
  title?: string;
  description?: string;
  href?: string;
};

type ActiveMenu = "products" | "why" | null;

function href(value?: string) {
  return value && value.trim() ? value : "#";
}

function svgMarkup(value: unknown) {
  if (typeof value === "string") {
    return value.trim();
  }

  if (value && typeof value === "object") {
    const asset = value as { svg?: unknown; value?: unknown; url?: unknown; src?: unknown };
    if (typeof asset.svg === "string") return asset.svg.trim();
    if (typeof asset.value === "string") return asset.value.trim();
    if (typeof asset.url === "string") return `<img src="${asset.url}" alt="" />`;
    if (typeof asset.src === "string") return `<img src="${asset.src}" alt="" />`;
  }

  return "";
}

function imageSource(value: unknown, fallback = "") {
  if (typeof value === "string" && value.trim()) {
    return imageIdToUrl(value);
  }

  if (value && typeof value === "object") {
    const image = value as {
      id?: unknown;
      url?: unknown;
      src?: unknown;
      imageUrl?: unknown;
      value?: unknown;
      image?: { url?: unknown; src?: unknown };
      file?: { url?: unknown; src?: unknown };
    };
    if (typeof image.url === "string") return imageIdToUrl(image.url);
    if (typeof image.src === "string") return imageIdToUrl(image.src);
    if (typeof image.imageUrl === "string") return imageIdToUrl(image.imageUrl);
    if (typeof image.value === "string") return imageIdToUrl(image.value);
    if (typeof image.id === "string") return imageIdToUrl(image.id);
    if (typeof image.image?.url === "string") return imageIdToUrl(image.image.url);
    if (typeof image.image?.src === "string") return imageIdToUrl(image.image.src);
    if (typeof image.file?.url === "string") return imageIdToUrl(image.file.url);
    if (typeof image.file?.src === "string") return imageIdToUrl(image.file.src);
  }

  return fallback;
}

function imageIdToUrl(value: string) {
  const trimmed = value.trim();
  if (trimmed.startsWith("theme-images/")) {
    return `https://cdn.myikas.com/images/${trimmed}/image_3840.webp`;
  }
  return trimmed;
}

function numberInRange(value: unknown, fallback: number, min: number, max: number) {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.min(max, Math.max(min, numeric));
}

function logoFit(value: unknown) {
  return value === "cover" || value === "fill" || value === "scale-down" ? value : "contain";
}

function percentage(value: unknown, fallback: number, min: number, max: number) {
  return `${numberInRange(value, fallback, min, max)}%`;
}

function imageControlVars(cssPrefix: string, props: Props, propPrefix: string, width: number, height: number, max: number) {
  const source = props as unknown as Record<string, unknown>;
  return {
    [`--${cssPrefix}-width`]: `${numberInRange(source[`${propPrefix}Width`], width, 4, max)}px`,
    [`--${cssPrefix}-height`]: `${numberInRange(source[`${propPrefix}Height`], height, 4, max)}px`,
    [`--${cssPrefix}-x`]: `${numberInRange(source[`${propPrefix}XOffset`], 0, -48, 48)}px`,
    [`--${cssPrefix}-y`]: `${numberInRange(source[`${propPrefix}YOffset`], 0, -48, 48)}px`,
    [`--${cssPrefix}-fit`]: logoFit(source[`${propPrefix}Fit`]),
    [`--${cssPrefix}-opacity`]: numberInRange(source[`${propPrefix}Opacity`], 100, 0, 100) / 100,
    [`--${cssPrefix}-brightness`]: percentage(source[`${propPrefix}Brightness`], 100, 0, 220),
    [`--${cssPrefix}-contrast`]: percentage(source[`${propPrefix}Contrast`], 100, 0, 220),
    [`--${cssPrefix}-saturation`]: percentage(source[`${propPrefix}Saturation`], 100, 0, 300),
    [`--${cssPrefix}-hue`]: `${numberInRange(source[`${propPrefix}Hue`], 0, -180, 180)}deg`,
    [`--${cssPrefix}-invert`]: percentage(source[`${propPrefix}Invert`], 0, 0, 100),
  };
}

function svgControlVars(cssPrefix: string, props: Props, propPrefix: string, width: number, height: number, max: number) {
  const source = props as unknown as Record<string, unknown>;
  return {
    [`--${cssPrefix}-width`]: `${numberInRange(source[`${propPrefix}Width`], width, 4, max)}px`,
    [`--${cssPrefix}-height`]: `${numberInRange(source[`${propPrefix}Height`], height, 4, max)}px`,
    [`--${cssPrefix}-x`]: `${numberInRange(source[`${propPrefix}XOffset`], 0, -48, 48)}px`,
    [`--${cssPrefix}-y`]: `${numberInRange(source[`${propPrefix}YOffset`], 0, -48, 48)}px`,
    [`--${cssPrefix}-opacity`]: numberInRange(source[`${propPrefix}Opacity`], 100, 0, 100) / 100,
    [`--${cssPrefix}-brightness`]: percentage(source[`${propPrefix}Brightness`], 100, 0, 220),
    [`--${cssPrefix}-contrast`]: percentage(source[`${propPrefix}Contrast`], 100, 0, 220),
    [`--${cssPrefix}-saturation`]: percentage(source[`${propPrefix}Saturation`], 100, 0, 300),
    [`--${cssPrefix}-hue`]: `${numberInRange(source[`${propPrefix}Hue`], 0, -180, 180)}deg`,
    [`--${cssPrefix}-invert`]: percentage(source[`${propPrefix}Invert`], 0, 0, 100),
  };
}

function InlineSvg({ svg, className }: { svg?: unknown; className: string }) {
  const markup = svgMarkup(svg);

  if (!markup) {
    return null;
  }

  return <span className={className} aria-hidden="true" dangerouslySetInnerHTML={{ __html: markup }} />;
}

function InlineIcon({ image, svg, className }: { image?: unknown; svg?: unknown; className: string }) {
  const imageUrl = imageSource(image);

  if (imageUrl) {
    return (
      <span className={className} aria-hidden="true">
        <img src={imageUrl} alt="" loading="lazy" decoding="async" />
      </span>
    );
  }

  return <InlineSvg svg={svg} className={className} />;
}

function ProductLink({ item }: { item: MenuItem }) {
  const hasIcon = Boolean(imageSource(item.iconImageUrl) || svgMarkup(item.iconSvg));

  return (
    <a href={href(item.href)} className={`tmh-mega-link${hasIcon ? "" : " tmh-mega-link-no-icon"}`}>
      <InlineIcon image={item.iconImageUrl} svg={item.iconSvg} className="tmh-product-icon" />
      <span className="tmh-mega-link-copy">
        <b>{item.title || ""}</b>
        <span>{item.description || ""}</span>
      </span>
    </a>
  );
}

function FlowLink({ item }: { item: FlowItem }) {
  return (
    <a href={href(item.href)} className="tmh-flow-link">
      <span className="tmh-flow-number">{item.number || ""}</span>
      <span className="tmh-flow-copy">
        <b>{item.title || ""}</b>
        <span>{item.description || ""}</span>
      </span>
    </a>
  );
}

function Logo({ logoText, logoHref, logoImageUrl, logoImageAlt, logoSvg }: Pick<Props, "logoText" | "logoHref" | "logoImageUrl" | "logoImageAlt" | "logoSvg">) {
  const logoSvgMarkup = svgMarkup(logoSvg);

  return (
    <a className="tmh-logo" href={href(logoHref)} aria-label={logoText}>
      {logoSvgMarkup ? (
        <span className="tmh-logo-svg" dangerouslySetInnerHTML={{ __html: logoSvgMarkup }} />
      ) : (
        <img src={imageSource(logoImageUrl, threeMashLogoImage)} alt={logoImageAlt || logoText} />
      )}
      <span>{logoText || ""}</span>
    </a>
  );
}

function CaretIcon() {
  return (
    <svg className="tmh-caret" viewBox="0 0 12 8" aria-hidden="true" focusable="false">
      <path d="M1 1.5 6 6.5l5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ThreeMashHeader(props: Props) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const productPrimary: MenuItem[] = [
    { title: props.product1Title, description: props.product1Description, href: props.product1Href, iconImageUrl: props.product1IconImageUrl, iconSvg: props.product1IconSvg },
    { title: props.product2Title, description: props.product2Description, href: props.product2Href, iconImageUrl: props.product2IconImageUrl, iconSvg: props.product2IconSvg },
    { title: props.product3Title, description: props.product3Description, href: props.product3Href, iconImageUrl: props.product3IconImageUrl, iconSvg: props.product3IconSvg },
  ];

  const productSecondary: MenuItem[] = [
    { title: props.product4Title, description: props.product4Description, href: props.product4Href, iconImageUrl: props.product4IconImageUrl, iconSvg: props.product4IconSvg },
    { title: props.product5Title, description: props.product5Description, href: props.product5Href, iconImageUrl: props.product5IconImageUrl, iconSvg: props.product5IconSvg },
    { title: props.product6Title, description: props.product6Description, href: props.product6Href, iconImageUrl: props.product6IconImageUrl, iconSvg: props.product6IconSvg },
  ];

  const whyItems: FlowItem[] = [
    { number: props.why1Number, title: props.why1Title, description: props.why1Description, href: props.why1Href },
    { number: props.why2Number, title: props.why2Title, description: props.why2Description, href: props.why2Href },
    { number: props.why3Number, title: props.why3Title, description: props.why3Description, href: props.why3Href },
    { number: props.why4Number, title: props.why4Title, description: props.why4Description, href: props.why4Href },
  ];

  const themeStyle = {
    "--tmh-bg": props.backgroundColor || "#FAFAF7",
    "--tmh-ann-bg": props.announcementBackgroundColor || "#0E0E0C",
    "--tmh-ann-text": props.announcementTextColor || "#CFCFC6",
    "--tmh-accent": props.accentColor || "#C7F136",
    "--tmh-text": props.textColor || "#0E0E0C",
    "--tmh-muted": props.mutedTextColor || "#8F8F86",
    "--tmh-line": props.lineColor || "#E6E6E0",
    "--tmh-panel": props.panelColor || "#FFFFFF",
    "--tmh-badge": props.badgeColor || "#E2492F",
    "--tmh-logo-image-width": `${numberInRange(props.logoImageWidth, 32, 18, 96)}px`,
    "--tmh-logo-image-height": `${numberInRange(props.logoImageHeight, 32, 18, 96)}px`,
    "--tmh-logo-image-x": `${numberInRange(props.logoImageXOffset, 0, -24, 24)}px`,
    "--tmh-logo-image-y": `${numberInRange(props.logoImageYOffset, 0, -24, 24)}px`,
    "--tmh-logo-image-fit": logoFit(props.logoImageFit),
    "--tmh-logo-image-opacity": numberInRange(props.logoImageOpacity, 100, 0, 100) / 100,
    "--tmh-logo-image-brightness": percentage(props.logoImageBrightness, 100, 0, 220),
    "--tmh-logo-image-contrast": percentage(props.logoImageContrast, 100, 0, 220),
    "--tmh-logo-image-saturation": percentage(props.logoImageSaturation, 100, 0, 300),
    "--tmh-logo-image-hue": `${numberInRange(props.logoImageHue, 0, -180, 180)}deg`,
    "--tmh-logo-image-invert": percentage(props.logoImageInvert, 0, 0, 100),
    "--tmh-logo-svg-width": `${numberInRange(props.logoSvgWidth, 32, 18, 96)}px`,
    "--tmh-logo-svg-height": `${numberInRange(props.logoSvgHeight, 32, 18, 96)}px`,
    "--tmh-logo-svg-x": `${numberInRange(props.logoSvgXOffset, 0, -24, 24)}px`,
    "--tmh-logo-svg-y": `${numberInRange(props.logoSvgYOffset, 0, -24, 24)}px`,
    "--tmh-logo-svg-opacity": numberInRange(props.logoSvgOpacity, 100, 0, 100) / 100,
    "--tmh-logo-svg-brightness": percentage(props.logoSvgBrightness, 100, 0, 220),
    "--tmh-logo-svg-contrast": percentage(props.logoSvgContrast, 100, 0, 220),
    "--tmh-logo-svg-saturation": percentage(props.logoSvgSaturation, 100, 0, 300),
    "--tmh-logo-svg-hue": `${numberInRange(props.logoSvgHue, 0, -180, 180)}deg`,
    "--tmh-logo-svg-invert": percentage(props.logoSvgInvert, 0, 0, 100),
    ...imageControlVars("tmh-products-feature-image", props, "productsFeatureImage", 152, 122, 260),
    ...imageControlVars("tmh-product-icon-image", props, "productIconImage", 24, 24, 48),
    ...svgControlVars("tmh-product-icon-svg", props, "productIconSvg", 21, 21, 48),
    ...imageControlVars("tmh-action-icon-image", props, "actionIconImage", 22, 22, 36),
    ...svgControlVars("tmh-action-icon-svg", props, "actionIconSvg", 22, 22, 36),
  };

  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  function openMenu(menu: ActiveMenu) {
    setActiveMenu(menu);
  }

  function submitSearch(event: Event) {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    const target = href(props.searchHref);
    const param = props.searchQueryParam || "q";
    try {
      const url = new URL(target, window.location.origin);
      url.searchParams.set(param, query);
      window.location.href = url.toString();
    } catch {
      window.location.href = `${target}${target.includes("?") ? "&" : "?"}${encodeURIComponent(param)}=${encodeURIComponent(query)}`;
    }
  }

  return (
    <section className="three-mash-header" style={themeStyle}>
      {props.showAnnouncement !== false && (
        <div className="tmh-announcement">
          <div className="tmh-announcement-inner">
            <b>{props.announcementHighlightText || ""}</b>
            <span>{props.announcementText || ""}</span>
            <a href={href(props.announcementHref)}>{props.announcementCtaText || ""}</a>
          </div>
        </div>
      )}

      <header className="tmh-header" ref={headerRef}>
        <div className="tmh-wrap tmh-nav">
          <Logo
            logoText={props.logoText}
            logoHref={props.logoHref}
            logoImageUrl={props.logoImageUrl}
            logoImageAlt={props.logoImageAlt}
            logoSvg={props.logoSvg}
          />

          <nav className="tmh-desktop-nav" aria-label={props.mobileMenuLabel}>
            <ul className="tmh-menu">
              <li
                className={activeMenu === "products" ? "is-open" : ""}
                onMouseEnter={() => openMenu("products")}
                onFocusIn={() => openMenu("products")}
              >
                <button className="tmh-menu-trigger" type="button">
                  <span>{props.productsMenuText || ""}</span>
                  <CaretIcon />
                </button>
                <div className="tmh-mega tmh-products-mega">
                  <a className="tmh-feature" href={href(props.productsFeatureHref)}>
                    <span className="tmh-micro">{props.productsFeatureEyebrow || ""}</span>
                    <b>{props.productsFeatureTitle || ""}</b>
                    <span className="tmh-feature-media">
                      <img src={imageSource(props.productsFeatureImageUrl, vectorPrinterImage)} alt={props.productsFeatureImageAlt || ""} />
                    </span>
                    <span>{props.productsFeatureDescription || ""}</span>
                    <em>{props.productsFeatureCtaText || ""}</em>
                  </a>
                  <div className="tmh-mega-column">
                    <span className="tmh-micro">{props.productsCol1Title || ""}</span>
                    {productPrimary.map((item, index) => (
                      <ProductLink item={item} key={index} />
                    ))}
                  </div>
                  <div className="tmh-mega-column">
                    <span className="tmh-micro">{props.productsCol2Title || ""}</span>
                    {productSecondary.map((item, index) => (
                      <ProductLink item={item} key={index} />
                    ))}
                  </div>
                </div>
              </li>

              <li
                className={activeMenu === "why" ? "is-open" : ""}
                onMouseEnter={() => openMenu("why")}
                onFocusIn={() => openMenu("why")}
              >
                <button className="tmh-menu-trigger" type="button">
                  <span>{props.whyMenuText || ""}</span>
                  <CaretIcon />
                </button>
                <div className="tmh-mega tmh-flow-mega">
                  <div className="tmh-flow-intro">
                    <span className="tmh-micro">{props.whyMenuEyebrow || ""}</span>
                    <b>{props.whyMenuText || ""}</b>
                    <p>{props.whyMenuDescription || ""}</p>
                  </div>
                  <div className="tmh-flow-grid">
                    {whyItems.map((item, index) => (
                      <FlowLink item={item} key={index} />
                    ))}
                  </div>
                </div>
              </li>

              <li>
                <a className="tmh-plain-link" href={href(props.referencesHref)} onMouseEnter={() => setActiveMenu(null)}>
                  {props.referencesText || ""}
                </a>
              </li>
              <li>
                <a className="tmh-plain-link" href={href(props.academyHref)} onMouseEnter={() => setActiveMenu(null)}>
                  {props.academyText || ""}
                </a>
              </li>
            </ul>
          </nav>

          <div className={`tmh-actions${isSearchOpen ? " is-search-open" : ""}`}>
            <form className="tmh-inline-search" onSubmit={submitSearch}>
              {isSearchOpen && (
                <input
                  ref={searchInputRef}
                  className="tmh-inline-search-input"
                  value={searchQuery}
                  placeholder={props.searchPlaceholder || ""}
                  aria-label={props.searchPlaceholder || ""}
                  onInput={(event) => setSearchQuery((event.currentTarget as HTMLInputElement).value)}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }
                  }}
                />
              )}
              <button
                className="tmh-icon-button"
                type={isSearchOpen ? "submit" : "button"}
                aria-label={props.searchAriaLabel || ""}
                onClick={() => {
                  if (!isSearchOpen) setIsSearchOpen(true);
                }}
              >
                <InlineIcon image={props.searchIconImageUrl} svg={props.searchIconSvg} className="tmh-action-svg" />
              </button>
            </form>
            <a href={href(props.accountHref)} aria-label={props.accountAriaLabel || ""}>
              <InlineIcon image={props.accountIconImageUrl} svg={props.accountIconSvg} className="tmh-action-svg" />
            </a>
            <a href={href(props.cartHref)} aria-label={props.cartAriaLabel || ""} className="tmh-cart">
              <InlineIcon image={props.cartIconImageUrl} svg={props.cartIconSvg} className="tmh-action-svg" />
            </a>
          </div>

          <details className="tmh-mobile-menu">
            <summary>{props.mobileMenuLabel || ""}</summary>
            <div className="tmh-mobile-panel">
              <a href={href(props.productsFeatureHref)}>{props.productsMenuText || ""}</a>
              {productPrimary.concat(productSecondary).map((item, index) => (
                <a href={href(item.href)} key={index}>{item.title || ""}</a>
              ))}
              <a href={href(props.why1Href)}>{props.whyMenuText || ""}</a>
              {whyItems.map((item, index) => (
                <a href={href(item.href)} key={index}>{item.title || ""}</a>
              ))}
              <a href={href(props.referencesHref)}>{props.referencesText || ""}</a>
              <a href={href(props.academyHref)}>{props.academyText || ""}</a>
            </div>
          </details>
        </div>
      </header>

    </section>
  );
}

export default ThreeMashHeader;
