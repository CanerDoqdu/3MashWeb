import { IkasComponentRenderer } from "@ikas/bp-storefront";
import { useEffect, useRef, useState } from "preact/hooks";
import { ecoBlocksIcon, ecoCuringIcon, ecoOvenIcon, ecoPrinterIcon, ecoResinIcon, ecoScannerIcon } from "../../assets/eco-icons-data";
import mashC4pFeatureImage from "../../assets/mash-c4p-feature-data";
import threeMashLogoImage from "../../assets/three-mash-logo-data";
import type { Props as GeneratedProps } from "./types";

type Props = GeneratedProps & {
  components?: any[];
  announcementComponents?: any[];
  navbarComponents?: any[];
  logoText?: string;
  [key: string]: any;
};

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
type ActiveAction = "profile" | "store" | null;
type HeaderDropdownKey = "products" | "why" | "profile" | "store";

const headerLogoComponentId = "2tplvqpo-headerLogo";
const headerDesktopMenuComponentId = "2tplvqpo-headerDesktopMenu";
const headerMenuItemComponentIds = new Set(["2tplvqpo-headerProductsMenu", "2tplvqpo-headerWhyMenu", "2tplvqpo-headerPlainLinks"]);
const headerActionsComponentId = "2tplvqpo-headerActions";
const headerMobileMenuComponentId = "2tplvqpo-headerMobileMenu";

function componentInstanceProps(component: any) {
  const propValues = component?.propValues || {};
  const props: Record<string, unknown> = {};
  for (const [key, entry] of Object.entries(propValues)) {
    props[key] = entry && typeof entry === "object" && "value" in entry ? (entry as { value: unknown }).value : entry;
  }
  return props;
}

const defaultSearchSvg = `<svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="2"/><path d="m16 16 4.2 4.2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
const defaultAccountSvg = `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
const defaultCartSvg = `<svg viewBox="0 0 24 24" fill="none"><path d="M6.2 7.5h14l-1.4 8.2a2 2 0 0 1-2 1.7H9.1a2 2 0 0 1-2-1.6L5.5 4.5H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9.5" cy="20" r="1.4" fill="currentColor"/><circle cx="17" cy="20" r="1.4" fill="currentColor"/></svg>`;
const headerDropdownEventName = "three-mash-header-dropdown-open";
const headerDefaultProps: Partial<Props> = {
  logoText: "mash",
  logoHref: "#",
  productsMenuText: "Ürünler",
  productsFeatureEyebrow: "YENİ · DÜNYADA İLK",
  productsFeatureTitle: "MASH C4P Akıllı Kürleme Cihazı",
  productsFeatureDescription: "Reçineye göre otomatik kürleme. Sonuç kalitesini kullanıcı hatasından çıkarır.",
  productsFeatureCtaText: "Keşfet",
  productsFeatureHref: "/urunler/c4p",
  productsCol1Title: "Üretim",
  product1Title: "3D Yazıcılar",
  product1Description: "P1D / P16L hassas baskı",
  product1Href: "/urunler/3d-yazicilar",
  product2Title: "Yıkama & Kürleme",
  product2Description: "Yıkama ve akıllı kürleme",
  product2Href: "/urunler/yikama-kurleme",
  product3Title: "Dental Reçineler",
  product3Description: "Dental reçine seçenekleri",
  product3Href: "/urunler/dental-recineler",
  productsCol2Title: "Tamamlayıcı",
  product4Title: "Masaüstü Tarayıcılar",
  product4Description: "Lab için hassas tarama",
  product4Href: "/urunler/masasustu-tarayicilar",
  product5Title: "Zirkon Bloklar & Titanyum",
  product5Description: "Freze sarfları",
  product5Href: "/urunler/zirkon-bloklar",
  product6Title: "Dental Fırınlar",
  product6Description: "Sinterleme çözümleri",
  product6Href: "/urunler/dental-firinlar",
  whyMenuText: "Neden 3mash?",
  whyMenuEyebrow: "SAYFA AKIŞI",
  whyMenuDescription: "Kaybın nereden başladığını ve 3mash sisteminin bunu nasıl azalttığını adım adım görün.",
  referencesText: "Referanslar",
  referencesHref: "#guven",
  academyText: "Academy",
  academyHref: "/mash-academy",
  searchAriaLabel: "Ara",
  accountAriaLabel: "Hesabım",
  cartAriaLabel: "Sepet",
  searchPlaceholder: "Ürün, kategori veya içerik ara",
  mobileMenuLabel: "Menü",
};

function withHeaderDefaults<T extends Partial<Props>>(props: T): Props & T {
  const resolved: Record<string, unknown> = { ...headerDefaultProps };
  for (const [key, value] of Object.entries(props)) {
    if (value == null) continue;
    if (typeof value === "string" && value.trim() === "") continue;
    resolved[key] = value;
  }
  return resolved as Props & T;
}

function emitHeaderDropdownOpen(dropdown: HeaderDropdownKey) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(headerDropdownEventName, { detail: dropdown }));
}

function href(value?: string) {
  const trimmed = value?.trim();
  if (!trimmed) return "#";
  if (trimmed.length > 1 && trimmed.startsWith("#")) return `/${trimmed}`;
  return trimmed;
}

function productRouteHref(value: string | undefined, fallback: string) {
  const trimmed = value?.trim();
  if (!trimmed) return fallback;
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

function c4pRouteHref(value: string | undefined) {
  const trimmed = value?.trim();
  if (!trimmed) return "/urunler/c4p";
  const normalized = trimmed
    .toLowerCase()
    .replace(/^https?:\/\/(?:www\.)?3mash\.com/i, "")
    .replace(/\/$/, "");
  if (normalized === "/yikama-kurleme-cihazlari" || normalized === "/3d-yazicilar") return "/urunler/c4p";
  return trimmed;
}

function smoothAnchorClick(event: MouseEvent, targetHref?: string) {
  const target = targetHref?.trim();
  if (!target) return;

  const hash = target.startsWith("#")
    ? target
    : target.startsWith("/#")
      ? target.slice(1)
      : "";
  if (!hash || hash.length <= 1) return;

  const section = document.querySelector(hash);
  if (!section) return;

  event.preventDefault();
  section.scrollIntoView({ behavior: "smooth", block: "start" });
}

function text(value: string | undefined, fallback: string) {
  const trimmed = value?.trim();
  return trimmed || fallback;
}

function richTextValue(value: string | undefined, fallback: string) {
  const visibleText = inlineHtml(value)
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .trim();
  return visibleText ? value : fallback;
}

function inlineHtml(value?: string) {
  return (value || "")
    .trim()
    .replace(/<\/p>\s*<p[^>]*>/gi, "<br />")
    .replace(/^<p[^>]*>/i, "")
    .replace(/<\/p>$/i, "");
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function styleTextChunks(markup: string, phrase?: string, enabled?: boolean, className = "tmh-word-style") {
  const target = phrase?.trim();
  if (!enabled || !target) return markup;

  const matcher = new RegExp(escapeRegExp(target), "gi");
  return markup
    .split(/(<[^>]+>)/g)
    .map((part) => {
      if (!part || part.startsWith("<")) return part;
      return part.replace(matcher, (match) => `<span class="${className}">${match}</span>`);
    })
    .join("");
}

function richText(value?: string, props?: Props) {
  const markup = inlineHtml(value);
  if (!props) return { __html: markup };
  return {
    __html: styleTextChunks(markup, props.styledPhrase, props.wordStyleEnabled !== false),
  };
}

function announcementRichText(value: string | undefined, props: Props) {
  const markup = richText(value, props).__html;
  return {
    __html: styleTextChunks(markup, props.announcementStyledPhrase, props.announcementWordStyleEnabled !== false, "tmh-ann-word-style"),
  };
}

function RichInline({ value, className, wordStyle }: { value?: string; className?: string; wordStyle?: Props }) {
  return <span className={className} dangerouslySetInnerHTML={richText(value, wordStyle)} />;
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

function legacyProductIcon(image: unknown, svg: unknown, replacement: string, tokens: string[]) {
  if (imageSource(image)) {
    return { iconImageUrl: image, iconSvg: svg };
  }

  const markup = svgMarkup(svg);
  if (markup && tokens.some((token) => markup.includes(token))) {
    return { iconImageUrl: replacement, iconSvg: undefined };
  }

  return { iconImageUrl: image, iconSvg: svg };
}

function resolveProductIcon(image: unknown, svg: unknown, replacement: string, tokens: string[], showIcons: boolean) {
  if (!showIcons) {
    return { iconImageUrl: undefined, iconSvg: undefined };
  }

  const resolved = legacyProductIcon(image, svg, replacement, tokens);
  if (imageSource(resolved.iconImageUrl) || svgMarkup(resolved.iconSvg)) {
    return resolved;
  }

  return { iconImageUrl: replacement, iconSvg: undefined };
}

function resolveActionIcon(image: unknown, svg: unknown, fallbackSvg: string, showIcons: boolean) {
  if (!showIcons) {
    return { image: undefined, svg: undefined };
  }

  return {
    image,
    svg: imageSource(image) || svgMarkup(svg) ? svg : fallbackSvg,
  };
}

function ProductLink({ item, wordStyle }: { item: MenuItem; wordStyle: Props }) {
  const hasIcon = Boolean(imageSource(item.iconImageUrl) || svgMarkup(item.iconSvg));

  return (
    <a href={href(item.href)} className={`tmh-mega-link${hasIcon ? "" : " tmh-mega-link-no-icon"}`} data-tmr-category-source="products">
      <InlineIcon image={item.iconImageUrl} svg={item.iconSvg} className="tmh-product-icon" />
      <span className="tmh-mega-link-copy">
        <b dangerouslySetInnerHTML={richText(item.title, wordStyle)} />
        <span dangerouslySetInnerHTML={richText(item.description, wordStyle)} />
      </span>
    </a>
  );
}

function FlowLink({ item, wordStyle }: { item: FlowItem; wordStyle: Props }) {
  return (
    <a href={href(item.href)} className="tmh-flow-link" onClick={(event) => smoothAnchorClick(event, item.href)}>
      <span className="tmh-flow-number" dangerouslySetInnerHTML={richText(item.number, wordStyle)} />
      <span className="tmh-flow-copy">
        <b dangerouslySetInnerHTML={richText(item.title, wordStyle)} />
        <span dangerouslySetInnerHTML={richText(item.description, wordStyle)} />
      </span>
    </a>
  );
}

function Logo({ props }: { props: Props }) {
  const { logoText, logoHref, logoImageUrl, logoImageAlt, logoSvg } = props;
  const logoSvgMarkup = svgMarkup(logoSvg);

  return (
    <a className="tmh-logo" href={href(logoHref)} aria-label={logoText}>
      {logoSvgMarkup ? (
        <span className="tmh-logo-svg" dangerouslySetInnerHTML={{ __html: logoSvgMarkup }} />
      ) : (
        <img src={imageSource(logoImageUrl, threeMashLogoImage)} alt={logoImageAlt || logoText} />
      )}
      <span dangerouslySetInnerHTML={richText(logoText, props)} />
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

function productPrimaryItems(props: Partial<Props>) {
  const showProductIcons = props.showProductIcons !== false;
  return [
    { title: props.product1Title, description: props.product1Description, href: productRouteHref(props.product1Href, "/urunler/3d-yazicilar"), ...resolveProductIcon(props.product1IconImageUrl, props.product1IconSvg, ecoPrinterIcon, ["printer", "M6 9V3h12v6"], showProductIcons) },
    { title: props.product2Title, description: props.product2Description, href: productRouteHref(props.product2Href, "/urunler/yikama-kurleme"), ...resolveProductIcon(props.product2IconImageUrl, props.product2IconSvg, ecoScannerIcon, ["washer", "circle cx=\"12\" cy=\"14\"", "M7 7h10"], showProductIcons) },
    { title: props.product3Title, description: props.product3Description, href: productRouteHref(props.product3Href, "/urunler/dental-recineler"), ...resolveProductIcon(props.product3IconImageUrl, props.product3IconSvg, ecoResinIcon, ["flask-conical", "M10 2v7.5"], showProductIcons) },
  ];
}

function productSecondaryItems(props: Partial<Props>) {
  const showProductIcons = props.showProductIcons !== false;
  return [
    { title: props.product4Title, description: props.product4Description, href: productRouteHref(props.product4Href, "/urunler/masasustu-tarayicilar"), ...resolveProductIcon(props.product4IconImageUrl, props.product4IconSvg, ecoCuringIcon, ["scan-line", "M3 7V5a2 2"], showProductIcons) },
    { title: props.product5Title, description: props.product5Description, href: productRouteHref(props.product5Href, "/urunler/zirkon-bloklar"), ...resolveProductIcon(props.product5IconImageUrl, props.product5IconSvg, ecoBlocksIcon, ["class=\"box\"", "M12 2 3 7l9 5"], showProductIcons) },
    { title: props.product6Title, description: props.product6Description, href: productRouteHref(props.product6Href, "/urunler/dental-firinlar"), ...resolveProductIcon(props.product6IconImageUrl, props.product6IconSvg, ecoOvenIcon, ["flame", "a3.5 3.5"], showProductIcons) },
  ];
}

function whyMenuItems(props: Partial<Props>) {
  return [
    { number: text(props.why1Number, "01"), title: text(props.why1Title, "Gizli maliyetinizi görün"), description: text(props.why1Description, "Tekrar işlerin yıllık kayba nasıl döndüğünü hesaplayın"), href: text(props.why1Href, "#hesap") },
    { number: text(props.why2Number, "02"), title: text(props.why2Title, "Hassasiyet farkını anlayın"), description: text(props.why2Description, "İlk seferde oturmayan işlerin asıl sebebini görün"), href: text(props.why2Href, "#sebep") },
    { number: text(props.why3Number, "03"), title: text(props.why3Title, "Uyumlu üretimi keşfedin"), description: text(props.why3Description, "Yazıcı, reçine ve parametre aynı sonuç için birlikte çalışır"), href: text(props.why3Href, "#cozum") },
    { number: text(props.why4Number, "04"), title: text(props.why4Title, "Kürlemenin etkisini görün"), description: text(props.why4Description, "Doğru baskının son adımda neden kaybedilmemesi gerektiğini öğrenin"), href: text(props.why4Href, "#kurleme") },
    { number: text(props.why5Number, "05"), title: text(props.why5Title, "Tek çatıdaki akışı inceleyin"), description: text(props.why5Description, "Cihazdan sarfa, eğitimden desteğe tüm ekosistemi görün"), href: text(props.why5Href, "#ekosistem") },
    { number: text(props.why6Number, "06"), title: text(props.why6Title, "Gerçek kullanıcıları görün"), description: text(props.why6Description, "Klinik ve laboratuvarların 3mash deneyimlerine bakın"), href: text(props.why6Href, "#guven") },
    { number: text(props.why7Number, "07"), title: text(props.why7Title, "Aklınızdaki soruları çözün"), description: text(props.why7Description, "Maliyet, hassasiyet ve süreç hakkında net cevaplar alın"), href: text(props.why7Href, "#sss") },
  ];
}

function ProductsMegaMenu({ props, primaryItems, secondaryItems }: { props: Partial<Props>; primaryItems: MenuItem[]; secondaryItems: MenuItem[] }) {
  const wordStyle = props as Props;

  return (
    <div className="tmh-mega tmh-products-mega">
      <a className="tmh-feature" href={href(c4pRouteHref(props.productsFeatureHref))}>
        <span className="tmh-micro" dangerouslySetInnerHTML={richText(props.productsFeatureEyebrow, wordStyle)} />
        <b dangerouslySetInnerHTML={richText(props.productsFeatureTitle, wordStyle)} />
        <span className="tmh-feature-media">
          <img src={imageSource(props.productsFeatureImageUrl, mashC4pFeatureImage)} alt={props.productsFeatureImageAlt || ""} />
        </span>
        <span dangerouslySetInnerHTML={richText(props.productsFeatureDescription, wordStyle)} />
        <em dangerouslySetInnerHTML={richText(props.productsFeatureCtaText, wordStyle)} />
      </a>
      <div className="tmh-mega-column">
        <span className="tmh-micro" dangerouslySetInnerHTML={richText(props.productsCol1Title, wordStyle)} />
        {primaryItems.map((item, index) => (
          <ProductLink item={item} wordStyle={wordStyle} key={index} />
        ))}
      </div>
      <div className="tmh-mega-column">
        <span className="tmh-micro" dangerouslySetInnerHTML={richText(props.productsCol2Title, wordStyle)} />
        {secondaryItems.map((item, index) => (
          <ProductLink item={item} wordStyle={wordStyle} key={index} />
        ))}
      </div>
    </div>
  );
}

function WhyMegaMenu({ props, items, menuLeft }: { props: Partial<Props>; items: FlowItem[]; menuLeft: number | null }) {
  const wordStyle = props as Props;

  return (
    <div
      className="tmh-mega tmh-flow-mega"
      style={menuLeft == null ? undefined : ({ "--tmh-flow-mega-left": `${menuLeft}px`, "--tmh-flow-translate-x": "0px" } as any)}
    >
      <div className="tmh-flow-intro">
        <span className="tmh-micro" dangerouslySetInnerHTML={richText(props.whyMenuEyebrow, wordStyle)} />
        <b dangerouslySetInnerHTML={richText(props.whyMenuText, wordStyle)} />
        <p dangerouslySetInnerHTML={richText(props.whyMenuDescription, wordStyle)} />
      </div>
      <div className="tmh-flow-grid">
        {items.map((item, index) => (
          <FlowLink item={item} wordStyle={wordStyle} key={index} />
        ))}
      </div>
    </div>
  );
}

function MobileHeaderMenu({ props, productItems, whyItems }: { props: Partial<Props>; productItems: MenuItem[]; whyItems: FlowItem[] }) {
  const wordStyle = props as Props;

  return (
    <details className="tmh-mobile-menu">
      <summary dangerouslySetInnerHTML={richText(props.mobileMenuLabel, wordStyle)} />
      <div className="tmh-mobile-panel">
        <div className="tmh-mobile-group">
          <span className="tmh-mobile-heading" dangerouslySetInnerHTML={richText(props.productsMenuText, wordStyle)} />
          {productItems.map((item, index) => (
            <a href={href(item.href)} className="tmh-mobile-product" key={index}>
              <InlineIcon image={item.iconImageUrl} svg={item.iconSvg} className="tmh-mobile-link-icon" />
              <span>
                <b dangerouslySetInnerHTML={richText(item.title, wordStyle)} />
                <small dangerouslySetInnerHTML={richText(item.description, wordStyle)} />
              </span>
            </a>
          ))}
        </div>
        <div className="tmh-mobile-group">
          <span className="tmh-mobile-heading" dangerouslySetInnerHTML={richText(props.whyMenuText, wordStyle)} />
          {whyItems.map((item, index) => (
            <a href={href(item.href)} className="tmh-mobile-flow" key={index} onClick={(event) => smoothAnchorClick(event, item.href)}>
              <span className="tmh-mobile-flow-number" dangerouslySetInnerHTML={richText(item.number, wordStyle)} />
              <span>
                <b dangerouslySetInnerHTML={richText(item.title, wordStyle)} />
                <small dangerouslySetInnerHTML={richText(item.description, wordStyle)} />
              </span>
            </a>
          ))}
        </div>
        <div className="tmh-mobile-group tmh-mobile-group-inline">
          <a href={href(props.referencesHref)} dangerouslySetInnerHTML={richText(props.referencesText, wordStyle)} />
          <a href={href(props.academyHref)} dangerouslySetInnerHTML={richText(props.academyText, wordStyle)} />
        </div>
      </div>
    </details>
  );
}

export function HeaderAnnouncementPart(props: Partial<Props>) {
  const resolvedProps = withHeaderDefaults(props);
  if (resolvedProps.showAnnouncement === false) return null;
  return (
    <div style={{ ...getHeaderThemeStyle(resolvedProps), display: "contents" }}>
      <HeaderAnnouncementFallback {...resolvedProps} />
    </div>
  );
}

export function HeaderNavbarLogoPart(props: Partial<Props>) {
  const resolvedProps = withHeaderDefaults(props);
  return (
    <span style={{ ...getHeaderThemeStyle(resolvedProps), display: "contents" }}>
      <Logo props={resolvedProps} />
    </span>
  );
}

export function HeaderProductsMenuPart(props: Partial<Props>) {
  const resolvedProps = withHeaderDefaults(props);
  const [isOpen, setIsOpen] = useState(false);
  const primaryItems = productPrimaryItems(resolvedProps);
  const secondaryItems = productSecondaryItems(resolvedProps);

  function openMenu() {
    emitHeaderDropdownOpen("products");
    setIsOpen(true);
  }

  function toggleMenu() {
    setIsOpen((current) => {
      if (current) return false;
      emitHeaderDropdownOpen("products");
      return true;
    });
  }

  useEffect(() => {
    function closeWhenAnotherDropdownOpens(event: Event) {
      if ((event as CustomEvent<HeaderDropdownKey>).detail !== "products") setIsOpen(false);
    }

    window.addEventListener(headerDropdownEventName, closeWhenAnotherDropdownOpens);
    return () => window.removeEventListener(headerDropdownEventName, closeWhenAnotherDropdownOpens);
  }, []);

  return (
    <li
      className={isOpen ? "is-open" : ""}
      onMouseEnter={openMenu}
      onFocusIn={openMenu}
      style={getHeaderThemeStyle(resolvedProps)}
    >
      <button className="tmh-menu-trigger" type="button" onClick={toggleMenu}>
        <RichInline value={resolvedProps.productsMenuText} wordStyle={resolvedProps} />
        <CaretIcon />
      </button>
      <ProductsMegaMenu props={resolvedProps} primaryItems={primaryItems} secondaryItems={secondaryItems} />
    </li>
  );
}

export function HeaderWhyMenuPart(props: Partial<Props>) {
  const resolvedProps = withHeaderDefaults(props);
  const [isOpen, setIsOpen] = useState(false);
  const [menuLeft, setMenuLeft] = useState<number | null>(null);
  const menuRef = useRef<HTMLLIElement>(null);
  const items = whyMenuItems(resolvedProps);

  function openMenu() {
    emitHeaderDropdownOpen("why");
    setIsOpen(true);
    requestAnimationFrame(updateMenuPosition);
  }

  function toggleMenu() {
    setIsOpen((current) => {
      if (current) return false;
      emitHeaderDropdownOpen("why");
      requestAnimationFrame(updateMenuPosition);
      return true;
    });
  }

  function updateMenuPosition() {
    const item = menuRef.current;
    if (!item || typeof window === "undefined") return;
    const rect = item.getBoundingClientRect();
    const panelWidth = Math.min(760, window.innerWidth - 32);
    const desiredLeft = rect.left + rect.width / 2 - panelWidth / 2;
    const clampedLeft = Math.min(window.innerWidth - panelWidth - 16, Math.max(16, desiredLeft));
    setMenuLeft(clampedLeft - rect.left);
  }

  useEffect(() => {
    function closeWhenAnotherDropdownOpens(event: Event) {
      if ((event as CustomEvent<HeaderDropdownKey>).detail !== "why") setIsOpen(false);
    }

    window.addEventListener(headerDropdownEventName, closeWhenAnotherDropdownOpens);
    window.addEventListener("resize", updateMenuPosition);
    return () => {
      window.removeEventListener(headerDropdownEventName, closeWhenAnotherDropdownOpens);
      window.removeEventListener("resize", updateMenuPosition);
    };
  }, []);

  return (
    <li
      ref={menuRef}
      className={isOpen ? "is-open" : ""}
      onMouseEnter={openMenu}
      onFocusIn={openMenu}
      style={getHeaderThemeStyle(resolvedProps)}
    >
      <button className="tmh-menu-trigger" type="button" onClick={toggleMenu}>
        <RichInline value={resolvedProps.whyMenuText} wordStyle={resolvedProps} />
        <CaretIcon />
      </button>
      <WhyMegaMenu props={resolvedProps} items={items} menuLeft={menuLeft} />
    </li>
  );
}

export function HeaderPlainLinksPart(props: Partial<Props>) {
  const resolvedProps = withHeaderDefaults(props);
  return (
    <>
      <li>
        <a className="tmh-plain-link" href={href(resolvedProps.referencesHref)}>
          <RichInline value={resolvedProps.referencesText} wordStyle={resolvedProps} />
        </a>
      </li>
      <li>
        <a className="tmh-plain-link" href={href(resolvedProps.academyHref)}>
          <RichInline value={resolvedProps.academyText} wordStyle={resolvedProps} />
        </a>
      </li>
    </>
  );
}

export function HeaderDesktopMenuPart(props: Partial<Props> & { components?: any[] }) {
  const resolvedProps = withHeaderDefaults(props);
  const components = Array.isArray(props.components) ? props.components : [];
  return (
    <nav className="tmh-desktop-nav" aria-label={resolvedProps.mobileMenuLabel}>
      <ul className="tmh-menu">
        {components.length > 0 ? (
          <IkasComponentRenderer id="desktop-menu-components" components={components} parentProps={resolvedProps} />
        ) : (
          <>
            <HeaderProductsMenuPart {...resolvedProps} />
            <HeaderWhyMenuPart {...resolvedProps} />
            <HeaderPlainLinksPart {...resolvedProps} />
          </>
        )}
      </ul>
    </nav>
  );
}

export function HeaderActionsPart(props: Partial<Props>) {
  const resolvedProps = withHeaderDefaults(props);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeAction, setActiveAction] = useState<ActiveAction>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const showActionIcons = resolvedProps.showActionIcons !== false;
  const searchIcon = resolveActionIcon(resolvedProps.searchIconImageUrl, resolvedProps.searchIconSvg, defaultSearchSvg, showActionIcons);
  const accountIcon = resolveActionIcon(resolvedProps.accountIconImageUrl, resolvedProps.accountIconSvg, defaultAccountSvg, showActionIcons);
  const cartIcon = resolveActionIcon(resolvedProps.cartIconImageUrl, resolvedProps.cartIconSvg, defaultCartSvg, showActionIcons);
  const profileLinks = [
    { label: richTextValue(resolvedProps.profileLink1Text, "Siparişlerim"), link: text(resolvedProps.profileLink1Href, "https://3mash.com/account/orders") },
    { label: richTextValue(resolvedProps.profileLink2Text, "Adreslerim"), link: text(resolvedProps.profileLink2Href, "https://3mash.com/account/addresses") },
    { label: richTextValue(resolvedProps.profileLink3Text, "Destek talebi"), link: text(resolvedProps.profileLink3Href, "https://3mash.com/pages/iletisim") },
    { label: richTextValue(resolvedProps.profileLink4Text, "Teknik destek"), link: text(resolvedProps.profileLink4Href, "https://3mash.com/pages/iletisim") },
    { label: richTextValue(resolvedProps.profileLink5Text, "Mash Academy"), link: text(resolvedProps.profileLink5Href, "/mash-academy") },
    { label: richTextValue(resolvedProps.profileLink6Text, "Çıkış yap"), link: text(resolvedProps.profileLink6Href, "https://3mash.com/account/logout") },
  ];

  useEffect(() => {
    if (isSearchOpen) searchInputRef.current?.focus();
  }, [isSearchOpen]);

  useEffect(() => {
    function closeWhenMenuDropdownOpens(event: Event) {
      const dropdown = (event as CustomEvent<HeaderDropdownKey>).detail;
      if (dropdown !== "profile" && dropdown !== "store") setActiveAction(null);
    }

    window.addEventListener(headerDropdownEventName, closeWhenMenuDropdownOpens);
    return () => window.removeEventListener(headerDropdownEventName, closeWhenMenuDropdownOpens);
  }, []);

  function openActionPanel(action: ActiveAction) {
    if (action) emitHeaderDropdownOpen(action);
    setIsSearchOpen(false);
    setActiveAction((current) => (action === "profile" && current === "profile" ? null : action));
  }

  function submitSearch(event: Event) {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    const target = href(resolvedProps.searchHref);
    const param = resolvedProps.searchQueryParam || "q";
    try {
      const url = new URL(target, window.location.origin);
      url.searchParams.set(param, query);
      window.location.href = url.toString();
    } catch {
      window.location.href = `${target}${target.includes("?") ? "&" : "?"}${encodeURIComponent(param)}=${encodeURIComponent(query)}`;
    }
  }

  return (
    <div className={`tmh-actions${isSearchOpen ? " is-search-open" : ""}`} style={getHeaderThemeStyle(resolvedProps)}>
      <form className="tmh-inline-search" onSubmit={submitSearch}>
        {isSearchOpen && (
          <input
            ref={searchInputRef}
            className="tmh-inline-search-input"
            value={searchQuery}
            placeholder={resolvedProps.searchPlaceholder || ""}
            aria-label={resolvedProps.searchPlaceholder || ""}
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
          aria-label={resolvedProps.searchAriaLabel || ""}
          onClick={() => {
            if (!isSearchOpen) {
              setActiveAction(null);
              setIsSearchOpen(true);
            }
          }}
        >
          <InlineIcon image={searchIcon.image} svg={searchIcon.svg} className="tmh-action-svg" />
        </button>
      </form>
      {resolvedProps.showProfileMenu === false ? (
        <a href={href(resolvedProps.accountHref)} aria-label={resolvedProps.accountAriaLabel || ""}>
          <InlineIcon image={accountIcon.image} svg={accountIcon.svg} className="tmh-action-svg" />
        </a>
      ) : (
        <div className="tmh-action-wrap">
          <button className="tmh-action-button" type="button" aria-label={resolvedProps.accountAriaLabel || ""} aria-expanded={activeAction === "profile"} onClick={() => openActionPanel("profile")}>
            <InlineIcon image={accountIcon.image} svg={accountIcon.svg} className="tmh-action-svg" />
          </button>
          <div className={`tmh-action-panel tmh-profile-panel${activeAction === "profile" ? " is-open" : ""}`}>
            <span className="tmh-action-panel-kicker">{text(resolvedProps.accountAriaLabel, "HESABIM")}</span>
            <b dangerouslySetInnerHTML={richText(richTextValue(resolvedProps.profileMenuTitle, "Hesabım"), resolvedProps)} />
            <p dangerouslySetInnerHTML={richText(richTextValue(resolvedProps.profileMenuDescription, "Sipariş, destek ve hesap işlemlerinize hızlıca ulaşın."), resolvedProps)} />
            <div className="tmh-panel-links">
              {profileLinks.map((item) => (
                <a href={href(item.link)} dangerouslySetInnerHTML={richText(item.label, resolvedProps)} />
              ))}
            </div>
          </div>
        </div>
      )}
      {resolvedProps.showStorePanel === false ? (
        <a href={href(resolvedProps.cartHref)} aria-label={resolvedProps.cartAriaLabel || ""} className="tmh-cart">
          <InlineIcon image={cartIcon.image} svg={cartIcon.svg} className="tmh-action-svg" />
        </a>
      ) : (
        <div className="tmh-action-wrap" onMouseEnter={() => openActionPanel("store")} onFocus={() => openActionPanel("store")}>
          <button className="tmh-action-button tmh-cart" type="button" aria-label={resolvedProps.cartAriaLabel || ""} aria-expanded={activeAction === "store"} onClick={() => openActionPanel("store")}>
            <InlineIcon image={cartIcon.image} svg={cartIcon.svg} className="tmh-action-svg" />
          </button>
          <div className={`tmh-action-panel tmh-store-panel${activeAction === "store" ? " is-open" : ""}`}>
            <span className="tmh-action-panel-kicker">{text(resolvedProps.cartAriaLabel, "SEPETİM")}</span>
            <div className="tmh-cart-empty-card">
              <div className="tmh-store-card-head">
                <span className="tmh-store-visual" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M7 8h10l-.7 10.1a1.9 1.9 0 0 1-1.9 1.8H9.6a1.9 1.9 0 0 1-1.9-1.8L7 8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                    <path d="M10 8V6.8a2 2 0 0 1 4 0V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
                <div>
                  <b className="tmh-store-card-title" dangerouslySetInnerHTML={richText(richTextValue(resolvedProps.storePanelTitle, "3mash Store"), resolvedProps)} />
                  <p className="tmh-store-card-description" dangerouslySetInnerHTML={richText(richTextValue(resolvedProps.storePanelDescription, "Sepet ve mağaza işlemleri güvenli 3mash mağazasında devam eder."), resolvedProps)} />
                </div>
              </div>
              <a className="tmh-cart-market-button" href={href(resolvedProps.storePanelButtonHref || resolvedProps.cartHref)} dangerouslySetInnerHTML={richText(richTextValue(resolvedProps.storePanelButtonText, "Markete git"), resolvedProps)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function HeaderMobileMenuPart(props: Partial<Props>) {
  const resolvedProps = withHeaderDefaults(props);
  return (
    <div style={{ ...getHeaderThemeStyle(resolvedProps), display: "contents" }}>
      <MobileHeaderMenu props={resolvedProps} productItems={productPrimaryItems(resolvedProps).concat(productSecondaryItems(resolvedProps))} whyItems={whyMenuItems(resolvedProps)} />
    </div>
  );
}

export function HeaderNavbarPart(props: Partial<Props> & { components?: any[] }) {
  const resolvedProps = withHeaderDefaults(props);
  const components = Array.isArray(props.components) ? props.components : [];
  const logoComponents = components.filter((component) => component?.codeComponentId === headerLogoComponentId);
  const menuItemComponents = components.filter((component) => headerMenuItemComponentIds.has(component?.codeComponentId));
  const legacyDesktopMenuComponents = components.filter((component) => component?.codeComponentId === headerDesktopMenuComponentId);
  const actionComponents = components.filter((component) => component?.codeComponentId === headerActionsComponentId);
  const mobileMenuComponents = components.filter((component) => component?.codeComponentId === headerMobileMenuComponentId);
  const groupedComponentIds = new Set([
    headerLogoComponentId,
    headerDesktopMenuComponentId,
    headerActionsComponentId,
    headerMobileMenuComponentId,
    ...headerMenuItemComponentIds,
  ]);
  const otherComponents = components.filter((component) => !groupedComponentIds.has(component?.codeComponentId));
  const childProps = (component: any) => withHeaderDefaults({ ...resolvedProps, ...componentInstanceProps(component) });

  return (
    <div className="three-mash-header" style={getHeaderThemeStyle(resolvedProps)}>
      <header className="tmh-header">
        <div className="tmh-wrap tmh-nav">
          {components.length > 0 ? (
            <>
              {logoComponents.map((component) => (
                <HeaderNavbarLogoPart key={component?.id || component?.codeComponentId} {...childProps(component)} />
              ))}
              {legacyDesktopMenuComponents.length > 0 ? (
                legacyDesktopMenuComponents.map((component) => <HeaderDesktopMenuPart key={component?.id || component?.codeComponentId} {...childProps(component)} />)
              ) : menuItemComponents.length > 0 ? (
                <nav className="tmh-desktop-nav" aria-label={resolvedProps.mobileMenuLabel}>
                  <ul className="tmh-menu">
                    {menuItemComponents.map((component) => {
                      const props = childProps(component);
                      if (component?.codeComponentId === "2tplvqpo-headerProductsMenu") return <HeaderProductsMenuPart key={component?.id || component?.codeComponentId} {...props} />;
                      if (component?.codeComponentId === "2tplvqpo-headerWhyMenu") return <HeaderWhyMenuPart key={component?.id || component?.codeComponentId} {...props} />;
                      return <HeaderPlainLinksPart key={component?.id || component?.codeComponentId} {...props} />;
                    })}
                  </ul>
                </nav>
              ) : null}
              {actionComponents.map((component) => (
                <HeaderActionsPart key={component?.id || component?.codeComponentId} {...childProps(component)} />
              ))}
              {mobileMenuComponents.map((component) => (
                <HeaderMobileMenuPart key={component?.id || component?.codeComponentId} {...childProps(component)} />
              ))}
              {otherComponents.length > 0 ? <IkasComponentRenderer id="navbar-other-components" components={otherComponents} parentProps={resolvedProps} /> : null}
            </>
          ) : (
            <>
              <HeaderNavbarLogoPart {...resolvedProps} />
              <HeaderDesktopMenuPart {...resolvedProps} />
              <HeaderActionsPart {...resolvedProps} />
              <HeaderMobileMenuPart {...resolvedProps} />
            </>
          )}
        </div>
      </header>
    </div>
  );
}

function getHeaderThemeStyle(props: Props) {
  return {
    "--tmh-bg": props.backgroundColor || "#FAFAF7",
    "--tmh-ann-bg": props.announcementBackgroundColor || "#0E0E0C",
    "--tmh-ann-text": props.announcementTextColor || "#CFCFC6",
    "--tmh-word-color": props.styledPhraseColor || "#C7F136",
    "--tmh-word-weight": props.styledPhraseBold ? "800" : "inherit",
    "--tmh-word-style": props.styledPhraseItalic ? "italic" : "inherit",
    "--tmh-ann-word-color": props.announcementStyledPhraseColor || "#C7F136",
    "--tmh-ann-word-weight": props.announcementStyledPhraseBold ? "800" : "inherit",
    "--tmh-ann-word-style": props.announcementStyledPhraseItalic ? "italic" : "inherit",
    "--tmh-accent": props.accentColor || "#C7F136",
    "--tmh-text": props.textColor || "#0E0E0C",
    "--tmh-muted": props.mutedTextColor || "#8F8F86",
    "--tmh-line": props.lineColor || "#E6E6E0",
    "--tmh-panel": props.panelColor || "#FFFFFF",
    "--tmh-badge": props.badgeColor || "#E2492F",
    "--tmh-why-card-glow": props.showWhyItemGlow === false ? "none" : "linear-gradient(90deg, color-mix(in srgb, var(--tmh-accent) 10%, transparent), transparent 44%)",
    "--tmh-why-card-hover-glow": props.showWhyItemGlow === false ? "none" : "linear-gradient(90deg, color-mix(in srgb, var(--tmh-accent) 18%, transparent), transparent 48%)",
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
    ...imageControlVars("tmh-product-icon-image", props, "productIconImage", 34, 34, 48),
    ...svgControlVars("tmh-product-icon-svg", props, "productIconSvg", 21, 21, 48),
    ...imageControlVars("tmh-action-icon-image", props, "actionIconImage", 22, 22, 36),
    ...svgControlVars("tmh-action-icon-svg", props, "actionIconSvg", 22, 22, 36),
  };
}

function HeaderNavigation(props: Props) {
  props = withHeaderDefaults(props);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>(null);
  const [activeAction, setActiveAction] = useState<ActiveAction>(null);
  const [whyMenuLeft, setWhyMenuLeft] = useState<number | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const whyMenuRef = useRef<HTMLLIElement>(null);
  const showProductIcons = props.showProductIcons !== false;
  const showActionIcons = props.showActionIcons !== false;
  const searchIcon = resolveActionIcon(props.searchIconImageUrl, props.searchIconSvg, defaultSearchSvg, showActionIcons);
  const accountIcon = resolveActionIcon(props.accountIconImageUrl, props.accountIconSvg, defaultAccountSvg, showActionIcons);
  const cartIcon = resolveActionIcon(props.cartIconImageUrl, props.cartIconSvg, defaultCartSvg, showActionIcons);
  const productPrimary: MenuItem[] = [
    { title: props.product1Title, description: props.product1Description, href: productRouteHref(props.product1Href, "/urunler/3d-yazicilar"), ...resolveProductIcon(props.product1IconImageUrl, props.product1IconSvg, ecoPrinterIcon, ["printer", "M6 9V3h12v6"], showProductIcons) },
    { title: props.product2Title, description: props.product2Description, href: productRouteHref(props.product2Href, "/urunler/yikama-kurleme"), ...resolveProductIcon(props.product2IconImageUrl, props.product2IconSvg, ecoScannerIcon, ["washer", "circle cx=\"12\" cy=\"14\"", "M7 7h10"], showProductIcons) },
    { title: props.product3Title, description: props.product3Description, href: productRouteHref(props.product3Href, "/urunler/dental-recineler"), ...resolveProductIcon(props.product3IconImageUrl, props.product3IconSvg, ecoResinIcon, ["flask-conical", "M10 2v7.5"], showProductIcons) },
  ];

  const productSecondary: MenuItem[] = [
    { title: props.product4Title, description: props.product4Description, href: productRouteHref(props.product4Href, "/urunler/masasustu-tarayicilar"), ...resolveProductIcon(props.product4IconImageUrl, props.product4IconSvg, ecoCuringIcon, ["scan-line", "M3 7V5a2 2"], showProductIcons) },
    { title: props.product5Title, description: props.product5Description, href: productRouteHref(props.product5Href, "/urunler/zirkon-bloklar"), ...resolveProductIcon(props.product5IconImageUrl, props.product5IconSvg, ecoBlocksIcon, ["class=\"box\"", "M12 2 3 7l9 5"], showProductIcons) },
    { title: props.product6Title, description: props.product6Description, href: productRouteHref(props.product6Href, "/urunler/dental-firinlar"), ...resolveProductIcon(props.product6IconImageUrl, props.product6IconSvg, ecoOvenIcon, ["flame", "a3.5 3.5"], showProductIcons) },
  ];

  const whyItems: FlowItem[] = [
    { number: text(props.why1Number, "01"), title: text(props.why1Title, "Gizli maliyetinizi görün"), description: text(props.why1Description, "Tekrar işlerin yıllık kayba nasıl döndüğünü hesaplayın"), href: text(props.why1Href, "#hesap") },
    { number: text(props.why2Number, "02"), title: text(props.why2Title, "Hassasiyet farkını anlayın"), description: text(props.why2Description, "İlk seferde oturmayan işlerin asıl sebebini görün"), href: text(props.why2Href, "#sebep") },
    { number: text(props.why3Number, "03"), title: text(props.why3Title, "Uyumlu üretimi keşfedin"), description: text(props.why3Description, "Yazıcı, reçine ve parametre aynı sonuç için birlikte çalışır"), href: text(props.why3Href, "#cozum") },
    { number: text(props.why4Number, "04"), title: text(props.why4Title, "Kürlemenin etkisini görün"), description: text(props.why4Description, "Doğru baskının son adımda neden kaybedilmemesi gerektiğini öğrenin"), href: text(props.why4Href, "#kurleme") },
    { number: text(props.why5Number, "05"), title: text(props.why5Title, "Tek çatıdaki akışı inceleyin"), description: text(props.why5Description, "Cihazdan sarfa, eğitimden desteğe tüm ekosistemi görün"), href: text(props.why5Href, "#ekosistem") },
    { number: text(props.why6Number, "06"), title: text(props.why6Title, "Gerçek kullanıcıları görün"), description: text(props.why6Description, "Klinik ve laboratuvarların 3mash deneyimlerine bakın"), href: text(props.why6Href, "#guven") },
    { number: text(props.why7Number, "07"), title: text(props.why7Title, "Aklınızdaki soruları çözün"), description: text(props.why7Description, "Maliyet, hassasiyet ve süreç hakkında net cevaplar alın"), href: text(props.why7Href, "#sss") },
  ];

  const profileLinks = [
    { label: richTextValue(props.profileLink1Text, "Siparişlerim"), link: text(props.profileLink1Href, "https://3mash.com/account/orders") },
    { label: richTextValue(props.profileLink2Text, "Adreslerim"), link: text(props.profileLink2Href, "https://3mash.com/account/addresses") },
    { label: richTextValue(props.profileLink3Text, "Destek talebi"), link: text(props.profileLink3Href, "https://3mash.com/pages/iletisim") },
    { label: richTextValue(props.profileLink4Text, "Teknik destek"), link: text(props.profileLink4Href, "https://3mash.com/pages/iletisim") },
    { label: richTextValue(props.profileLink5Text, "Mash Academy"), link: text(props.profileLink5Href, "/mash-academy") },
    { label: richTextValue(props.profileLink6Text, "Çıkış yap"), link: text(props.profileLink6Href, "https://3mash.com/account/logout") },
  ];

  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setActiveMenu(null);
        setActiveAction(null);
      }
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  useEffect(() => {
    function smoothSamePageAnchor(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as Element | null;
      const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      const rawHref = anchor?.getAttribute("href")?.trim();
      if (!anchor || !rawHref || anchor.target) return;

      let hash = "";
      if (rawHref.startsWith("#")) {
        hash = rawHref;
      } else {
        try {
          const url = new URL(rawHref, window.location.href);
          if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;
          hash = url.hash;
        } catch {
          return;
        }
      }

      if (!hash || hash.length <= 1) return;
      const section = document.querySelector(hash);
      if (!section) return;

      event.preventDefault();
      setActiveMenu(null);
      setActiveAction(null);
      window.history.pushState(null, "", hash);
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    document.addEventListener("click", smoothSamePageAnchor);
    return () => document.removeEventListener("click", smoothSamePageAnchor);
  }, []);

  useEffect(() => {
    if (activeMenu !== "why") return;

    updateWhyMenuPosition();
    window.addEventListener("resize", updateWhyMenuPosition);
    return () => window.removeEventListener("resize", updateWhyMenuPosition);
  }, [activeMenu]);

  function updateWhyMenuPosition() {
    const item = whyMenuRef.current;
    if (!item || typeof window === "undefined") return;

    const rect = item.getBoundingClientRect();
    const panelWidth = Math.min(760, window.innerWidth - 32);
    const desiredLeft = rect.left + rect.width / 2 - panelWidth / 2;
    const clampedLeft = Math.min(window.innerWidth - panelWidth - 16, Math.max(16, desiredLeft));
    setWhyMenuLeft(clampedLeft - rect.left);
  }

  function openMenu(menu: ActiveMenu) {
    setActiveMenu(menu);
    setActiveAction(null);
    if (menu === "why") {
      requestAnimationFrame(updateWhyMenuPosition);
    }
  }

  function toggleMenu(menu: ActiveMenu) {
    setActiveAction(null);
    setActiveMenu((current) => {
      if (current === menu) return null;
      if (menu === "why") requestAnimationFrame(updateWhyMenuPosition);
      return menu;
    });
  }

  function toggleAction(action: ActiveAction) {
    setActiveMenu(null);
    setIsSearchOpen(false);
    setActiveAction((current) => (current === action ? null : action));
  }

  function openActionPanel(action: ActiveAction) {
    setActiveMenu(null);
    setIsSearchOpen(false);
    setActiveAction(action);
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
    <header className="tmh-header" ref={headerRef}>
        <div className="tmh-wrap tmh-nav">
          <Logo props={props} />

          <nav className="tmh-desktop-nav" aria-label={props.mobileMenuLabel}>
            <ul className="tmh-menu">
              <li
                className={activeMenu === "products" ? "is-open" : ""}
                onMouseEnter={() => openMenu("products")}
                onFocusIn={() => openMenu("products")}
              >
                <button className="tmh-menu-trigger" type="button" onClick={() => toggleMenu("products")}>
                  <RichInline value={props.productsMenuText} wordStyle={props} />
                  <CaretIcon />
                </button>
                <ProductsMegaMenu props={props} primaryItems={productPrimary} secondaryItems={productSecondary} />
              </li>

              <li
                ref={whyMenuRef}
                className={activeMenu === "why" ? "is-open" : ""}
                onMouseEnter={() => openMenu("why")}
                onFocusIn={() => openMenu("why")}
              >
                <button className="tmh-menu-trigger" type="button" onClick={() => toggleMenu("why")}>
                  <RichInline value={props.whyMenuText} wordStyle={props} />
                  <CaretIcon />
                </button>
                <WhyMegaMenu props={props} items={whyItems} menuLeft={whyMenuLeft} />
              </li>

              <li>
                <a className="tmh-plain-link" href={href(props.referencesHref)} onMouseEnter={() => { setActiveMenu(null); setActiveAction(null); }}>
                  <RichInline value={props.referencesText} wordStyle={props} />
                </a>
              </li>
              <li>
                <a className="tmh-plain-link" href={href(props.academyHref)} onMouseEnter={() => { setActiveMenu(null); setActiveAction(null); }}>
                  <RichInline value={props.academyText} wordStyle={props} />
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
                  if (!isSearchOpen) {
                    setActiveAction(null);
                    setIsSearchOpen(true);
                  }
                }}
              >
                <InlineIcon image={searchIcon.image} svg={searchIcon.svg} className="tmh-action-svg" />
              </button>
            </form>
            {props.showProfileMenu === false ? (
              <a href={href(props.accountHref)} aria-label={props.accountAriaLabel || ""}>
                <InlineIcon image={accountIcon.image} svg={accountIcon.svg} className="tmh-action-svg" />
              </a>
            ) : (
              <div className="tmh-action-wrap">
                <button
                  className="tmh-action-button"
                  type="button"
                  aria-label={props.accountAriaLabel || ""}
                  aria-expanded={activeAction === "profile"}
                  onClick={() => toggleAction("profile")}
                >
                  <InlineIcon image={accountIcon.image} svg={accountIcon.svg} className="tmh-action-svg" />
                </button>
                <div className={`tmh-action-panel tmh-profile-panel${activeAction === "profile" ? " is-open" : ""}`}>
                  <span className="tmh-action-panel-kicker">{text(props.accountAriaLabel, "HESABIM")}</span>
                  <b dangerouslySetInnerHTML={richText(richTextValue(props.profileMenuTitle, "Hesabım"), props)} />
                  <p dangerouslySetInnerHTML={richText(richTextValue(props.profileMenuDescription, "Sipariş, destek ve hesap işlemlerinize hızlıca ulaşın."), props)} />
                  <div className="tmh-panel-links">
                    {profileLinks.map((item) => (
                      <a href={href(item.link)} dangerouslySetInnerHTML={richText(item.label, props)} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            {props.showStorePanel === false ? (
              <a href={href(props.cartHref)} aria-label={props.cartAriaLabel || ""} className="tmh-cart">
                <InlineIcon image={cartIcon.image} svg={cartIcon.svg} className="tmh-action-svg" />
              </a>
            ) : (
              <div
                className="tmh-action-wrap"
                onMouseEnter={() => openActionPanel("store")}
                onFocus={() => openActionPanel("store")}
              >
                <button
                  className="tmh-action-button tmh-cart"
                  type="button"
                  aria-label={props.cartAriaLabel || ""}
                  aria-expanded={activeAction === "store"}
                  onClick={() => openActionPanel("store")}
                >
                  <InlineIcon image={cartIcon.image} svg={cartIcon.svg} className="tmh-action-svg" />
                </button>
                <div className={`tmh-action-panel tmh-store-panel${activeAction === "store" ? " is-open" : ""}`}>
                  <span className="tmh-action-panel-kicker">{text(props.cartAriaLabel, "SEPETİM")}</span>
                  <div className="tmh-cart-empty-card">
                    <div className="tmh-store-card-head">
                      <span className="tmh-store-visual" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                          <path d="M7 8h10l-.7 10.1a1.9 1.9 0 0 1-1.9 1.8H9.6a1.9 1.9 0 0 1-1.9-1.8L7 8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                          <path d="M10 8V6.8a2 2 0 0 1 4 0V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      </span>
                      <div>
                        <b className="tmh-store-card-title" dangerouslySetInnerHTML={richText(richTextValue(props.storePanelTitle, "3mash Store"), props)} />
                        <p className="tmh-store-card-description" dangerouslySetInnerHTML={richText(richTextValue(props.storePanelDescription, "Sepet ve mağaza işlemleri güvenli 3mash mağazasında devam eder."), props)} />
                      </div>
                    </div>
                    <a
                      className="tmh-cart-market-button"
                      href={href(props.storePanelButtonHref || props.cartHref)}
                      dangerouslySetInnerHTML={richText(richTextValue(props.storePanelButtonText, "Markete git"), props)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <MobileHeaderMenu props={props} productItems={productPrimary.concat(productSecondary)} whyItems={whyItems} />
        </div>
    </header>
  );
}

function HeaderAnnouncementFallback(props: Props) {
  if (props.showAnnouncement === false) return null;

  return (
    <div className="tmh-announcement">
      <div className="tmh-announcement-inner">
        <b dangerouslySetInnerHTML={announcementRichText(props.announcementHighlightText, props)} />
        <span dangerouslySetInnerHTML={announcementRichText(props.announcementText, props)} />
        <a href={href(props.announcementHref)} dangerouslySetInnerHTML={announcementRichText(props.announcementCtaText, props)} />
      </div>
    </div>
  );
}

export function ThreeMashHeader(props: Props) {
  const resolvedProps = withHeaderDefaults(props);
  const announcementComponents = Array.isArray(resolvedProps.announcementComponents) ? resolvedProps.announcementComponents : [];
  const navbarComponents = Array.isArray(resolvedProps.navbarComponents) ? resolvedProps.navbarComponents : [];
  const legacyComponents = Array.isArray(resolvedProps.components) ? resolvedProps.components : [];
  const usesComponentListCategories = props.announcementComponents !== undefined || props.navbarComponents !== undefined;

  return (
    <section className="three-mash-header" style={getHeaderThemeStyle(resolvedProps)}>
      {usesComponentListCategories ? (
        <>
          {announcementComponents.length > 0 ? (
            <IkasComponentRenderer id="header-announcement-components" components={announcementComponents} parentProps={resolvedProps} />
          ) : null}
          {navbarComponents.length > 0 ? <HeaderNavbarPart {...resolvedProps} components={navbarComponents} /> : null}
        </>
      ) : legacyComponents.length > 0 ? (
        <IkasComponentRenderer id="header-components-legacy" components={legacyComponents} parentProps={resolvedProps} />
      ) : (
        <>
          <HeaderAnnouncementFallback {...resolvedProps} />
          <HeaderNavigation {...resolvedProps} />
        </>
      )}
    </section>
  );
}

export default ThreeMashHeader;
