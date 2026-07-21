import { IkasComponentRenderer } from "@ikas/bp-storefront";
import { useEffect, useRef } from "preact/hooks";
import threeMashLogoImage from "../../assets/three-mash-logo-data";
import { renderFooterHtml, ThreeMashStaticSection, threeMashThemeStyle } from "../../sub-components/ThreeMashSectionRenderer";
import type { Props as GeneratedProps } from "./types";

type Props = GeneratedProps & {
  components?: any[];
  bottomComponents?: any[];
  [key: string]: any;
};

const footerDefaultProps: Partial<Props> = {
  logoText: "mash",
  descriptionText: "Dental klinik ve laboratuvarlar için entegre 3D baskı ekosistemi: yazıcı, reçine, kürleme ve üretim know-how'ı — birlikte.",
  productColumnTitle: "Ürünler",
  productLink1Text: "3D Yazıcılar",
  productLink1Href: "/urunler/3d-yazicilar",
  productLink2Text: "Dental Reçineler",
  productLink2Href: "/urunler/dental-recineler",
  productLink3Text: "Yıkama & Kürleme",
  productLink3Href: "/urunler/yikama-kurleme",
  productLink4Text: "Masaüstü Tarayıcılar",
  productLink4Href: "/urunler/masasustu-tarayicilar",
  productLink5Text: "Zirkon Bloklar",
  productLink5Href: "/urunler/zirkon-bloklar",
  productLink6Text: "Dental Fırınlar",
  productLink6Href: "/urunler/dental-firinlar",
  companyColumnTitle: "Şirket",
  companyLink1Text: "Hakkımızda",
  companyLink1Href: "https://3mash.com/pages/about-us",
  companyLink2Text: "Mash Academy",
  companyLink2Href: "/mash-academy",
  companyLink3Text: "Blog",
  companyLink3Href: "https://3mash.com/blog",
  contactColumnTitle: "İletişim",
  contactLink1Text: "info@3mash.com",
  contactLink1Href: "mailto:info@3mash.com",
  contactLink2Text: "Antalya Teknokent, Konyaaltı",
  contactLink2Href: "#",
  contactLink3Text: "@3mashsocial",
  contactLink3Href: "https://instagram.com/3mashsocial",
  showSocialIcons: true,
  instagramHref: "https://instagram.com/3mashsocial",
  instagramLabel: "Instagram",
  linkedinHref: "",
  linkedinLabel: "LinkedIn",
  youtubeHref: "",
  youtubeLabel: "YouTube",
  facebookHref: "",
  facebookLabel: "Facebook",
  copyrightText: "© 2026 3MASH Teknoloji A.Ş. Tüm hakları saklıdır.",
  legalText: "KVKK · İade & Garanti · Mesafeli Satış",
  logoHref: "/",
  logoImageAlt: "3mash",
};

function withFooterDefaults<T extends Partial<Props>>(props: T): Props & T {
  const resolved: Record<string, unknown> = { ...footerDefaultProps };
  for (const [key, value] of Object.entries(props)) {
    if (value == null) continue;
    if (typeof value === "string" && value.trim() === "") continue;
    resolved[key] = value;
  }
  return resolved as Props & T;
}

function html(value?: string, fallback = "") {
  return { __html: richText(value, fallback) };
}

function richText(value: unknown, fallback: string) {
  if (typeof value !== "string") return fallback;
  const visibleText = value.replace(/<[^>]*>/g, "").replace(/&nbsp;/gi, " ").trim();
  return visibleText ? value : fallback;
}

function plainText(value: unknown, fallback: string) {
  if (typeof value !== "string") return fallback;
  return value.trim() || fallback;
}

function imageSource(source: unknown, fallback: string) {
  if (typeof source === "string" && source.trim()) return source.trim();
  if (source && typeof source === "object") {
    const image = source as Record<string, unknown>;
    for (const key of ["url", "src", "imageUrl", "thumbnailUrl", "originalSrc"]) {
      const value = image[key];
      if (typeof value === "string" && value.trim()) return value.trim();
    }
  }
  return fallback;
}

function svgMarkup(source: unknown) {
  if (typeof source === "string" && source.trim()) return source.trim();
  if (source && typeof source === "object") {
    const svg = (source as Record<string, unknown>).svg;
    if (typeof svg === "string" && svg.trim()) return svg.trim();
  }
  return "";
}

function productPageHref(value: unknown, fallback: string) {
  if (typeof value !== "string" || !value.trim()) return fallback;
  const trimmed = value.trim();
  const normalized = trimmed
    .toLowerCase()
    .replace(/^https?:\/\/(?:www\.)?3mash\.com/i, "")
    .replace(/\/$/, "");
  const legacyRoutes: Record<string, string> = {
    "/3d-yazicilar": "/urunler/3d-yazicilar",
    "/dental-3d-yazici-recineleri": "/urunler/dental-recineler",
    "/yikama-kurleme-cihazlari": "/urunler/yikama-kurleme",
    "/masasustu-tarayicilar": "/urunler/masasustu-tarayicilar",
    "/zirkon-bloklar": "/urunler/zirkon-bloklar",
    "/dental-firinlar": "/urunler/dental-firinlar",
  };
  return legacyRoutes[normalized] || trimmed;
}

function footerLinks(props: Props, prefix: "product" | "company" | "contact", count: number, defaults: Array<[string, string]>) {
  return defaults.slice(0, count).map(([label, href], index) => {
    const number = index + 1;
    const text = richText(props[`${prefix}Link${number}Text`], label);
    const link = prefix === "product"
      ? productPageHref(props[`${prefix}Link${number}Href`], href)
      : plainText(props[`${prefix}Link${number}Href`], href);
    return (
      <a key={`${prefix}-${number}`} href={link} dangerouslySetInnerHTML={{ __html: text }} />
    );
  });
}

function socialIcon(name: "facebook" | "instagram" | "youtube" | "linkedin") {
  const icons: Record<typeof name, string> = {
    facebook: `<path d="M14.5 8H13c-1.1 0-2 .9-2 2v2H8.8v3H11v5h3v-5h2.2l.5-3H14v-1.5c0-.3.2-.5.5-.5h2V8z"></path>`,
    instagram: `<rect x="4" y="4" width="16" height="16" rx="5"></rect><circle cx="12" cy="12" r="3.5"></circle><circle cx="16.5" cy="7.5" r="0.8"></circle>`,
    youtube: `<path d="M4.5 8.5c.2-1.4 1-2.2 2.4-2.4C8.2 6 10.1 6 12 6s3.8 0 5.1.1c1.4.2 2.2 1 2.4 2.4.1.9.2 2.1.2 3.5s-.1 2.6-.2 3.5c-.2 1.4-1 2.2-2.4 2.4-1.3.1-3.2.1-5.1.1s-3.8 0-5.1-.1c-1.4-.2-2.2-1-2.4-2.4-.1-.9-.2-2.1-.2-3.5s.1-2.6.2-3.5z"></path><path d="m10.5 9.5 4 2.5-4 2.5z"></path>`,
    linkedin: `<path d="M6.5 10v8"></path><path d="M6.5 6.5v.1"></path><path d="M10.5 18v-8"></path><path d="M10.5 13.5c0-2.1 1.2-3.5 3.1-3.5s3 1.3 3 3.7V18"></path>`,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true" dangerouslySetInnerHTML={{ __html: icons[name] }} />;
}

function socialLink(props: Props, icon: "facebook" | "instagram" | "youtube" | "linkedin", hrefKey: string, labelKey: string, fallbackHref: string, fallbackLabel: string) {
  const href = plainText(props[hrefKey], fallbackHref);
  const label = plainText(props[labelKey], fallbackLabel);
  if (!href) {
    return (
      <span className="tmr-footer-social-icon" aria-label={label} role="img">
        {socialIcon(icon)}
      </span>
    );
  }
  return (
    <a href={href} aria-label={label} target="_blank" rel="noopener noreferrer">
      {socialIcon(icon)}
    </a>
  );
}

function footerCopyrightText(props: Partial<Props>) {
  const fallback = "© 2026 3MASH Teknoloji A.Ş. Tüm hakları saklıdır.";
  const current = richText(props.copyrightText, fallback);
  if (/all\s+rights\s+(reserved|preserved)/i.test(current)) return fallback;
  if (/3MASH\s+Teknoloji\s+A\.Ş\./i.test(current) && !/Tüm\s+hakları\s+saklıdır/i.test(current)) {
    return current.replace(/3MASH\s+Teknoloji\s+A\.Ş\./i, "3MASH Teknoloji A.Ş. Tüm hakları saklıdır.");
  }
  return current;
}

export function FooterBrandPart(props: Partial<Props>) {
  const resolved = withFooterDefaults(props);
  const logoSvg = svgMarkup(resolved.logoSvg);
  const logoVisual = logoSvg
    ? <span className="tmr-footer-logo-svg" aria-hidden="true" dangerouslySetInnerHTML={{ __html: logoSvg }} />
    : <img src={imageSource(resolved.logoImageUrl, threeMashLogoImage)} alt={plainText(resolved.logoImageAlt, "3mash")} />;

  return (
    <div>
      <a className="tmr-footer-logo" href={plainText(resolved.logoHref, "/")}>
        {logoVisual}
        <b dangerouslySetInnerHTML={html(resolved.logoText, "mash")} />
      </a>
      <p dangerouslySetInnerHTML={html(resolved.descriptionText, footerDefaultProps.descriptionText as string)} />
    </div>
  );
}

export function FooterProductLinksPart(props: Partial<Props>) {
  const resolved = withFooterDefaults(props);
  return (
    <div className="tmr-footer-link-col" data-tmr-footer-sync="products">
      <h6 dangerouslySetInnerHTML={html(resolved.productColumnTitle, "Ürünler")} />
      {footerLinks(resolved, "product", 6, [
        ["3D Yazıcılar", "/urunler/3d-yazicilar"],
        ["Dental Reçineler", "/urunler/dental-recineler"],
        ["Yıkama & Kürleme", "/urunler/yikama-kurleme"],
        ["Masaüstü Tarayıcılar", "/urunler/masasustu-tarayicilar"],
        ["Zirkon Bloklar", "/urunler/zirkon-bloklar"],
        ["Dental Fırınlar", "/urunler/dental-firinlar"],
      ])}
    </div>
  );
}

export function FooterCompanyLinksPart(props: Partial<Props>) {
  const resolved = withFooterDefaults(props);
  return (
    <div className="tmr-footer-link-col">
      <h6 dangerouslySetInnerHTML={html(resolved.companyColumnTitle, "Şirket")} />
      {footerLinks(resolved, "company", 3, [
        ["Hakkımızda", "https://3mash.com/pages/about-us"],
        ["Mash Academy", "/mash-academy"],
        ["Blog", "https://3mash.com/blog"],
      ])}
    </div>
  );
}

export function FooterContactLinksPart(props: Partial<Props> & { components?: any[] }) {
  const resolved = withFooterDefaults(props);
  const components = Array.isArray(props.components) ? props.components : [];
  return (
    <div className="tmr-footer-link-col">
      <h6 dangerouslySetInnerHTML={html(resolved.contactColumnTitle, "İletişim")} />
      {footerLinks(resolved, "contact", 3, [
        ["info@3mash.com", "mailto:info@3mash.com"],
        ["Antalya Teknokent, Konyaaltı", "#"],
        ["@3mashsocial", "https://instagram.com/3mashsocial"],
      ])}
      {components.length > 0 ? (
        <IkasComponentRenderer id="footer-contact-components" components={components} parentProps={resolved} />
      ) : (
        <FooterSocialLinksPart {...resolved} />
      )}
    </div>
  );
}

export function FooterSocialLinksPart(props: Partial<Props>) {
  const resolved = withFooterDefaults(props);
  if (resolved.showSocialIcons === false) return null;

  return (
    <div className="tmr-footer-social">
      {socialLink(resolved, "facebook", "facebookHref", "facebookLabel", "", "Facebook")}
      {socialLink(resolved, "instagram", "instagramHref", "instagramLabel", "https://instagram.com/3mashsocial", "Instagram")}
      {socialLink(resolved, "youtube", "youtubeHref", "youtubeLabel", "", "YouTube")}
      {socialLink(resolved, "linkedin", "linkedinHref", "linkedinLabel", "", "LinkedIn")}
    </div>
  );
}

export function FooterLegalBarPart(props: Partial<Props>) {
  const resolved = withFooterDefaults(props);
  return (
    <div className="tmr-base">
      <span dangerouslySetInnerHTML={{ __html: footerCopyrightText(resolved) }} />
      <div className="tmr-base-meta">
        <span dangerouslySetInnerHTML={html(resolved.legalText, "KVKK · İade & Garanti · Mesafeli Satış")} />
      </div>
    </div>
  );
}

export function ThreeMashFooter(props: Props) {
  const resolved = withFooterDefaults(props);
  const components = Array.isArray(resolved.components) ? resolved.components : [];
  const bottomComponents = Array.isArray(resolved.bottomComponents) ? resolved.bottomComponents : [];
  const columnComponents = components.filter((component) => component?.codeComponentId !== "2tplvqpo-footerLegalBar");
  const legacyLegalComponents = components.filter((component) => component?.codeComponentId === "2tplvqpo-footerLegalBar");
  const legalComponents = bottomComponents.length > 0 ? bottomComponents : legacyLegalComponents;
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const syncFooterCategoryLists = () => {
      root.querySelectorAll<HTMLElement>("[data-tmr-footer-sync]").forEach((column) => {
        const sourceName = column.dataset.tmrFooterSync;
        if (!sourceName) return;

        const sourceLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>(`a[data-tmr-category-source="${sourceName}"]`));
        if (!sourceLinks.length) return;

        const title = column.querySelector("h6")?.cloneNode(true);
        const seen = new Set<string>();
        const links = sourceLinks
          .map((link) => {
            const label = link.querySelector("b")?.textContent?.trim() || link.textContent?.trim() || "";
            const linkHref = link.getAttribute("href")?.trim() || "";
            const key = `${label}|${linkHref}`;
            if (!label || !linkHref || seen.has(key)) return null;
            seen.add(key);

            const item = document.createElement("a");
            item.setAttribute("href", linkHref);
            item.textContent = label;
            return item;
          })
          .filter((item): item is HTMLAnchorElement => Boolean(item));

        if (!links.length) return;
        const signature = links.map((item) => `${item.textContent || ""}|${item.getAttribute("href") || ""}`).join("||");
        if (column.dataset.tmrFooterSyncSignature === signature) return;
        column.dataset.tmrFooterSyncSignature = signature;

        column.replaceChildren(...(title ? [title] : []), ...links);
      });
    };

    syncFooterCategoryLists();
    const syncObserver = typeof MutationObserver === "undefined" ? null : new MutationObserver(syncFooterCategoryLists);
    syncObserver?.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["href", "data-tmr-category-source"] });

    return () => syncObserver?.disconnect();
  }, [components, bottomComponents]);

  if (!components.length && !legalComponents.length) {
    return <ThreeMashStaticSection props={props} fallback={renderFooterHtml(props)} />;
  }

  return (
    <div ref={rootRef} className="three-mash-remaining" style={threeMashThemeStyle(resolved)}>
      <footer className="tmr-footer">
        <div className="tmr-wrap">
          <div className="tmr-footer-cols">
            {columnComponents.length > 0 ? (
              <IkasComponentRenderer id="footer-components" components={columnComponents} parentProps={resolved} />
            ) : (
              <>
                <FooterBrandPart {...resolved} />
                <FooterProductLinksPart {...resolved} />
                <FooterCompanyLinksPart {...resolved} />
                <FooterContactLinksPart {...resolved} />
              </>
            )}
          </div>
          {legalComponents.length > 0 ? (
            <IkasComponentRenderer id="footer-legal-components" components={legalComponents} parentProps={resolved} />
          ) : (
            <FooterLegalBarPart {...resolved} />
          )}
        </div>
      </footer>
    </div>
  );
}

export default ThreeMashFooter;
