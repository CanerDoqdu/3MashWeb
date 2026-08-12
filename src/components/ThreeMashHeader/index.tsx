import { useEffect, useRef, useState } from "preact/hooks";
import {
  cartStore,
  createMediaSrcset,
  customerStore,
  getCart,
  getDefaultSrc,
  getOrderLineItemFormattedFinalPriceWithQuantity,
  getProductHref,
  getProductVariantMainImage,
  getSelectedProductVariant,
  initCustomerStore,
  removeItem,
  searchProductList as updateProductSearchList,
  waitForCartStoreInit,
  type IkasCart,
  type IkasOrderLineItem,
  type IkasProduct,
  type IkasProductVariant,
} from "@ikas/bp-storefront";
import { hydrateMissingOrderLineImageFallbacks, orderLineImageUrl, orderLineImageUrlCandidates } from "../ThreeMashOrderLineImage";
import { ecoBlocksIcon, ecoCuringIcon, ecoOvenIcon, ecoPrinterIcon, ecoResinIcon, ecoScannerIcon } from "../../assets/eco-icons-data";
import { Props } from "./types";

type MenuItem = {
  title?: string;
  description?: string;
  href?: string;
  icon?: string;
};

type FlowItem = {
  number?: string;
  title?: string;
  description?: string;
  href?: string;
};

type ActiveMenu = "products" | "why" | null;
type ActiveAction = "profile" | "store" | null;

type SearchSuggestion = {
  product: IkasProduct;
  score: number;
};

type HeaderAnnouncementOverride = {
  enabled?: boolean;
  highlightText?: string;
  text?: string;
  ctaText?: string;
  href?: string;
};

function cartImageUrl(item: IkasOrderLineItem) {
  return orderLineImageUrl(item, 180);
}

function handleOrderLineImageError(event: Event, candidates: string[]) {
  const image = event.currentTarget as HTMLImageElement;
  const nextIndex = Number(image.dataset.imageIndex || 0) + 1;
  const next = candidates[nextIndex];

  if (next) {
    image.dataset.imageIndex = String(nextIndex);
    image.src = next;
    return;
  }

  image.style.display = "none";
  image.removeAttribute("src");
}

function cartProductHref(item: IkasOrderLineItem) {
  const slug = item.variant?.slug?.trim();
  return slug ? `/${slug.replace(/^\/+/, "")}` : "#";
}

function cartItemTitle(item: IkasOrderLineItem) {
  return item.variant?.name || "Ürün";
}

function cartItemVariantText(item: IkasOrderLineItem) {
  return item.variant?.variantValues?.map((value) => value.variantValueName).filter(Boolean).join(" / ") || item.variant?.sku || "";
}

const defaultSearchSvg = `<svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="2"/><path d="m16 16 4.2 4.2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
const defaultAccountSvg = `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
const defaultCartSvg = `<svg viewBox="0 0 24 24" fill="none"><path d="M6.2 7.5h14l-1.4 8.2a2 2 0 0 1-2 1.7H9.1a2 2 0 0 1-2-1.6L5.5 4.5H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9.5" cy="20" r="1.4" fill="currentColor"/><circle cx="17" cy="20" r="1.4" fill="currentColor"/></svg>`;
const threeMashHeaderLogoImage = "https://cdn.myikas.com/images/theme-images/4a6af8e2-cb7c-4cc8-ba17-13656d4b8670/image_3840.webp";
const academyPageHref = "/pages/mash-academy";
const defaultReferencesHomeHref = "/";
const defaultReferencesSectionId = "guven";
const pendingReferencesScrollKey = "tmh-pending-references-scroll";
const legacyAcademyRouteKeys = new Set(["academy", "mash-academy", "pages-mash-academy", "2tplvqpo-rovtvwz53h"]);
const defaultProductsMenuText = "Ürünler";
const defaultWhyMenuText = "Neden 3mash?";
const defaultReferencesText = "Referanslar";
const defaultAcademyText = "Academy";
const defaultMobileMenuLabel = "Menü";
const defaultAnnouncement = {
  highlightText: "⚡ Fırsatı kaçırmayın.",
  text: "Kliniğinizin sessiz kaybını 30 saniyede hesaplayın; ücretsiz analizle nasıl azaltabileceğinizi birlikte görelim.",
  ctaText: "Hemen hesaplayın",
  href: "#hesap",
};

function announcementOverridePayload(value: unknown): HeaderAnnouncementOverride | null {
  if (!value || typeof value !== "object") return null;
  const data = value as HeaderAnnouncementOverride;
  if (data.enabled === false) return null;
  if (!data.highlightText && !data.text && !data.ctaText) return null;
  return data;
}

function currentProductAnnouncement() {
  if (typeof window === "undefined") return null;
  return announcementOverridePayload((window as unknown as { __THREE_MASH_PRODUCT_ANNOUNCEMENT__?: unknown }).__THREE_MASH_PRODUCT_ANNOUNCEMENT__);
}
const defaultProductsFeature = {
  eyebrow: "YENİ · DÜNYADA İLK",
  title: "MASH C1E<br>Akıllı Kürleme Cihazı",
  description: "Post-curing'i kullanıcı hatasından arındırır: reçineye göre süre, sıcaklık ve dalga boyunu otomatik yönetir.",
  ctaText: "Keşfet →",
  href: "/yikama-kurleme-cihazlari",
};
const defaultProductPrimary: Required<MenuItem>[] = [
  { title: "3D Yazıcılar", description: "P1D / P16L hassas baskı", href: "/3d-yazicilar", icon: ecoPrinterIcon },
  { title: "Yıkama & Kürleme", description: "Yıkama ve akıllı kürleme", href: "/yikama-kurleme-cihazlari", icon: ecoScannerIcon },
  { title: "Dental Reçineler", description: "Dental reçine seçenekleri", href: "/dental-3d-yazici-recineleri", icon: ecoResinIcon },
];
const defaultProductSecondary: Required<MenuItem>[] = [
  { title: "Masaüstü Tarayıcılar", description: "Lab tarafında hassas veri", href: "/masasustu-tarayicilar", icon: ecoCuringIcon },
  { title: "Zirkon Bloklar & Titanyum", description: "Freze tarafının sarfları", href: "/zirkon-bloklar", icon: ecoBlocksIcon },
  { title: "Dental Fırınlar", description: "Sinterleme çözümleri", href: "/dental-firinlar", icon: ecoOvenIcon },
];

function href(value?: string) {
  const trimmed = value?.trim();
  if (!trimmed) return "#";
  return trimmed;
}

function headerRouteHref(value: string | undefined, fallback: string) {
  const trimmed = value?.trim();
  if (!trimmed || trimmed === "#") return fallback;
  const internal = internalSiteHref(trimmed);
  const normalized = routeAliasKey(internal || trimmed);
  const slug = routeTextKey(internal || trimmed);

  if (normalized === "/" && fallback === "/cart") return "/cart";
  if (slug === "account-login" || slug === "login" || slug === "hesabim" || slug === "account") return "/account/login";
  if (slug === "cart" || slug === "sepet") return "/cart";
  if (slug === "search" || slug === "arama") return "/search";
  if (productCategoryRoutes[slug]) return productCategoryRoutes[slug];
  return internal || fallback;
}

function searchPageHref(value?: string) {
  return headerRouteHref(value, "/search");
}

function storePageHref(value?: string) {
  const slug = routeTextKey(internalSiteHref(value || "") || value || "");
  if (slug === "cart" || slug === "sepet") return "/search";
  return headerRouteHref(value, "/search");
}

function routeAliasKey(value: string) {
  return value
    .trim()
    .toLocaleLowerCase("tr-TR")
    .replace(/^https?:\/\/(?:www\.)?3mash\.com/i, "")
    .split(/[?#]/)[0]
    .replace(/\/+/g, "/")
    .replace(/\/$/, "");
}

function routeTextKey(value: string) {
  return routeAliasKey(value)
    .replace(/^\//, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function internalSiteHref(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^(mailto:|tel:|#)/i.test(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed);
    if (url.hostname === "3mash.com" || url.hostname === "www.3mash.com" || url.hostname === "studio.ikasapps.com") {
      return `${url.pathname}${url.search}${url.hash}` || "/";
    }
  } catch {
    // Relative route, keep as-is.
  }

  return trimmed;
}

const productCategoryRoutes: Record<string, string> = {
  "3d-yazicilar": "/3d-yazicilar",
  "3d-yazici": "/3d-yazicilar",
  "dental-3d-yazici-recineleri": "/dental-3d-yazici-recineleri",
  "dental-recineler": "/dental-3d-yazici-recineleri",
  "recineler": "/dental-3d-yazici-recineleri",
  "yikama-kurleme-cihazlari": "/yikama-kurleme-cihazlari",
  "yikama-kurleme": "/yikama-kurleme-cihazlari",
  "kurleme-cihazlari": "/yikama-kurleme-cihazlari",
  "masasustu-tarayicilar": "/masasustu-tarayicilar",
  "masaustu-tarayicilar": "/masasustu-tarayicilar",
  "tarayicilar": "/masasustu-tarayicilar",
  "zirkon-bloklar": "/zirkon-bloklar",
  "zirkon-bloklar-titanyum": "/zirkon-bloklar",
  "dental-firinlar": "/dental-firinlar",
  "firinlar": "/dental-firinlar",
  "3d-yazici-yedek-parcalari": "/3d-yazici-yedek-parcalari",
  "yedek-parcalar": "/3d-yazici-yedek-parcalari",
  "sistemler": "/sistemler",
  "titanyum-diskler": "/titanyum-diskler",
  "tum-urunler": "/search",
  "urunler": "/search",
  "products": "/search",
  "collections-all": "/search",
};

function productRouteHref(value: string | undefined, fallback: string) {
  const trimmed = value?.trim();
  if (!trimmed || trimmed === "#") return fallback;
  const internal = internalSiteHref(trimmed);
  const normalized = routeAliasKey(internal);
  const slug = routeTextKey(normalized);
  const nestedSlug = slug.replace(/^urunler-/, "");
  return productCategoryRoutes[slug] || productCategoryRoutes[nestedSlug] || internal;
}

function academyPageTarget(value: string | undefined) {
  const trimmed = value?.trim();
  if (!trimmed || trimmed === "#") return academyPageHref;
  const internal = internalSiteHref(trimmed);
  const slug = routeTextKey(internal);
  return legacyAcademyRouteKeys.has(slug) ? academyPageHref : href(internal);
}

function cleanSectionId(value: string | undefined, fallback: string) {
  return (value || fallback).trim().replace(/^#+/, "") || fallback;
}

function sectionHash(sectionId: string | undefined, fallback: string) {
  return `#${encodeURIComponent(cleanSectionId(sectionId, fallback))}`;
}

function homeRouteTarget(value: string | undefined) {
  const trimmed = value?.trim();
  if (!trimmed || trimmed === "#" || trimmed.startsWith("#")) return defaultReferencesHomeHref;
  const internal = internalSiteHref(trimmed);
  const withoutHash = internal.split("#")[0] || defaultReferencesHomeHref;
  return withoutHash;
}

function referencesSectionTarget(homeHref?: string, sectionId?: string) {
  const homeTarget = homeRouteTarget(homeHref);
  return `${homeTarget}${sectionHash(sectionId, defaultReferencesSectionId)}`;
}

function savePendingReferencesScroll(sectionId: string) {
  try {
    localStorage.setItem(pendingReferencesScrollKey, sectionId);
    return true;
  } catch {
    return false;
  }
}

function consumePendingReferencesScroll() {
  try {
    const sectionId = localStorage.getItem(pendingReferencesScrollKey);
    if (sectionId) localStorage.removeItem(pendingReferencesScrollKey);
    return sectionId || "";
  } catch {
    return "";
  }
}

function referencesClickTarget(homeHref: string | undefined, sectionId: string | undefined) {
  const targetId = cleanSectionId(sectionId, defaultReferencesSectionId);
  return {
    homeTarget: homeRouteTarget(homeHref),
    hash: sectionHash(targetId, defaultReferencesSectionId),
    targetId,
  };
}

function handleReferencesClick(event: MouseEvent, homeHref: string | undefined, sectionId: string | undefined) {
  const { homeTarget, hash, targetId } = referencesClickTarget(homeHref, sectionId);
  const section = document.getElementById(targetId) || document.querySelector(hash);

  event.preventDefault();
  event.stopPropagation();

  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", hash);
    return;
  }

  savePendingReferencesScroll(targetId);
  window.location.href = `${homeTarget}${hash}`;
}

function c4pRouteHref(value: string | undefined) {
  const trimmed = value?.trim();
  if (!trimmed) return "/yikama-kurleme-cihazlari";
  const normalized = trimmed
    .toLowerCase()
    .replace(/^https?:\/\/(?:www\.)?(?:3mash\.com|studio\.ikasapps\.com)/i, "")
    .replace(/\/$/, "");
  if (normalized === "/mash" || normalized === "/urunler/c4p" || normalized === "/yikama-kurleme-cihazlari") return "/yikama-kurleme-cihazlari";
  return trimmed;
}

function searchKey(value: string | undefined) {
  return (value || "")
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function safeSearchVariant(product: IkasProduct): IkasProductVariant | null {
  try {
    return getSelectedProductVariant(product) || product.variants?.[0] || null;
  } catch {
    return product.variants?.[0] || null;
  }
}

function productSearchText(product: IkasProduct) {
  const categoryNames = product.categories?.map((category) => category.name).join(" ") || "";
  const variantSkus = product.variants?.map((variant) => variant.sku).filter(Boolean).join(" ") || "";
  return searchKey(`${product.name} ${product.brand?.name || ""} ${categoryNames} ${variantSkus}`);
}

function fuzzyScore(candidate: string, query: string) {
  if (!candidate || !query) return Number.POSITIVE_INFINITY;
  if (candidate === query) return 0;
  if (candidate.startsWith(query)) return 2;

  const wordStartIndex = candidate.split(" ").findIndex((word) => word.startsWith(query));
  if (wordStartIndex >= 0) return 8 + wordStartIndex;

  const containsIndex = candidate.indexOf(query);
  if (containsIndex >= 0) return 20 + containsIndex;

  return Number.POSITIVE_INFINITY;
}

function searchSuggestions(products: IkasProduct[], query: string): SearchSuggestion[] {
  const normalizedQuery = searchKey(query);
  if (!normalizedQuery) return [];

  return products
    .map((product) => ({ product, score: fuzzyScore(productSearchText(product), normalizedQuery) }))
    .filter((item) => Number.isFinite(item.score))
    .sort((a, b) => a.score - b.score || a.product.name.length - b.product.name.length)
    .slice(0, 1);
}

function text(value: string | undefined, fallback: string) {
  const trimmed = value?.trim();
  return trimmed || fallback;
}

const legacyThemeCategoryNames = new Set([
  "clothing",
  "bags",
  "accessories",
  "hats & caps",
  "laptop sleeves",
]);

function normalizedCategoryText(value: string | null | undefined) {
  return (value || "").replace(/\s+/g, " ").trim().toLowerCase();
}

function directNodeText(element: Element) {
  return Array.from(element.childNodes)
    .filter((node) => node.nodeType === Node.TEXT_NODE)
    .map((node) => node.textContent || "")
    .join(" ");
}

function isLegacyThemeCategoryText(value: string | null | undefined) {
  return legacyThemeCategoryNames.has(normalizedCategoryText(value));
}

function legacyThemeCategoryRow(element: Element, root: Element) {
  let current: Element | null = element;
  let fallback: HTMLElement | null = element instanceof HTMLElement ? element : null;

  while (current && current !== root) {
    if (!(current instanceof HTMLElement)) {
      current = current.parentElement;
      continue;
    }

    if (current.closest(".three-mash-header")) return null;

    const directText = directNodeText(current);
    const fullText = current.textContent || "";
    const isDirectMatch = isLegacyThemeCategoryText(directText);
    const isCompactFullMatch = isLegacyThemeCategoryText(fullText);
    const rowLike = current.matches("a, button, li, [role='button'], [class*='category'], [class*='menu'], [class*='item'], [class*='row']");

    if ((isDirectMatch || isCompactFullMatch) && rowLike) return current;
    if (isDirectMatch && !fallback) fallback = current;

    current = current.parentElement;
  }

  return fallback;
}

function hideLegacyThemeCategories() {
  const roots = Array.from(
    document.querySelectorAll<HTMLElement>(".category-products-main, .search-wrapper, .mobile-menu, [class*='category-products']")
  );
  const scanRoots = Array.from(new Set<HTMLElement>([...roots, document.body]));

  scanRoots.forEach((root) => {
    [root, ...Array.from(root.querySelectorAll<HTMLElement>("*"))].forEach((element) => {
      if (element.dataset.tmhLegacyCategoryHidden === "true") return;
      if (!isLegacyThemeCategoryText(directNodeText(element)) && !isLegacyThemeCategoryText(element.textContent)) return;

      const row = legacyThemeCategoryRow(element, root);
      if (!row || row.dataset.tmhLegacyCategoryHidden === "true") return;

      row.dataset.tmhLegacyCategoryHidden = "true";
      row.setAttribute("aria-hidden", "true");
      row.style.display = "none";
    });
  });
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

function visibleTextKey(value?: string) {
  return inlineHtml(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim()
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i");
}

function sourceRichText(value: string | undefined, fallback: string, staleKeys: string[] = []) {
  const key = visibleTextKey(value);
  if (!key || staleKeys.includes(key)) return fallback;
  return value;
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

function themeToken(value: string | undefined, defaultValue: string, tokenName: string) {
  const trimmed = value?.trim();
  if (trimmed && trimmed.toLowerCase() !== defaultValue.toLowerCase()) return trimmed;
  return `var(${tokenName}, ${defaultValue})`;
}

function sourceThemeToken(defaultValue: string, tokenName: string) {
  return `var(${tokenName}, ${defaultValue})`;
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
  return (
    <a href={href(item.href)} className="tmh-mega-link">
      {item.icon ? (
        <span className="tmh-mega-link-icon" aria-hidden="true">
          <img src={item.icon} alt="" loading="lazy" decoding="async" />
        </span>
      ) : null}
      <span className="tmh-mega-link-copy">
        <b dangerouslySetInnerHTML={richText(item.title, wordStyle)} />
        <span dangerouslySetInnerHTML={richText(item.description, wordStyle)} />
      </span>
    </a>
  );
}

function SearchSuggestionLink({ product }: { product: IkasProduct }) {
  const variant = safeSearchVariant(product);
  const media = variant ? getProductVariantMainImage(variant) : undefined;
  const image = media?.image;
  const meta = product.brand?.name || product.categories?.[0]?.name || "";

  return (
    <a className="tmh-search-suggestion" href={getProductHref(product)}>
      <span className="tmh-search-suggestion-media">
        {image ? (
          media?.isVideo ? (
            <video src={getDefaultSrc(image)} muted playsInline />
          ) : (
            <img src={getDefaultSrc(image)} srcSet={createMediaSrcset(image)} alt={image.altText || product.name} loading="lazy" decoding="async" />
          )
        ) : (
          <span aria-hidden="true">{product.name.slice(0, 1)}</span>
        )}
      </span>
      <span className="tmh-search-suggestion-copy">
        <b>{product.name}</b>
        {meta ? <small>{meta}</small> : null}
      </span>
    </a>
  );
}

function FlowLink({ item, wordStyle }: { item: FlowItem; wordStyle: Props }) {
  return (
    <a href={href(item.href)} className="tmh-flow-link">
      <span className="tmh-flow-number" dangerouslySetInnerHTML={richText(item.number, wordStyle)} />
      <span className="tmh-flow-copy">
        <b dangerouslySetInnerHTML={richText(item.title, wordStyle)} />
        <span dangerouslySetInnerHTML={richText(item.description, wordStyle)} />
      </span>
    </a>
  );
}

function Logo({ props }: { props: Props }) {
  const { logoText, logoHref, logoImageAlt } = props;
  const logoImage = threeMashHeaderLogoImage;

  return (
    <a className="tmh-logo" href={headerRouteHref(logoHref, "/")} aria-label={logoText}>
      <span className="tmh-logo-image-wrap" style={{ "--tmh-logo-mask-image": `url("${logoImage}")` } as any}>
        <img src={logoImage} alt={logoImageAlt || logoText} />
      </span>
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
  const [activeAction, setActiveAction] = useState<ActiveAction>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState<IkasCart | null>(cartStore.cart);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(customerStore.customer));
  const [removingCartItemId, setRemovingCartItemId] = useState("");
  const [productsMenuLeft, setProductsMenuLeft] = useState<number | null>(null);
  const [whyMenuLeft, setWhyMenuLeft] = useState<number | null>(null);
  const [productAnnouncement, setProductAnnouncement] = useState<HeaderAnnouncementOverride | null>(() => currentProductAnnouncement());
  const searchInputRef = useRef<HTMLInputElement>(null);
  const committedSuggestionSearchRef = useRef("");
  const headerRef = useRef<HTMLElement>(null);
  const productsMenuRef = useRef<HTMLLIElement>(null);
  const whyMenuRef = useRef<HTMLLIElement>(null);
  const showActionIcons = props.showActionIcons !== false;
  const searchIcon = resolveActionIcon(props.searchIconImageUrl, props.searchIconSvg, defaultSearchSvg, showActionIcons);
  const accountIcon = resolveActionIcon(props.accountIconImageUrl, props.accountIconSvg, defaultAccountSvg, showActionIcons);
  const cartIcon = resolveActionIcon(props.cartIconImageUrl, props.cartIconSvg, defaultCartSvg, showActionIcons);
  const referencesTargetHref = referencesSectionTarget(props.referencesHomeHref, props.referencesSectionId);
  const searchSuggestionItems = searchSuggestions(props.searchProductList?.data || [], searchQuery);
  const hasSearchSuggestions = isSearchOpen && searchQuery.trim().length > 0 && searchSuggestionItems.length > 0;
  const cartItems = isLoggedIn ? cart?.orderLineItems?.filter((item) => !item.deleted) || [] : [];
  const cartItemCount = cartItems.reduce((total, item) => total + Number(item.quantity || 0), 0);
  const visibleCartItems = cartItems.slice(0, 4);
  const productsMenuText = sourceRichText(props.productsMenuText, defaultProductsMenuText);
  const whyMenuText = sourceRichText(props.whyMenuText, defaultWhyMenuText);
  const referencesText = sourceRichText(props.referencesText, defaultReferencesText);
  const academyText = sourceRichText(props.academyText, defaultAcademyText, ["akademi"]);
  const mobileMenuLabel = richTextValue(props.mobileMenuLabel, defaultMobileMenuLabel);
  const announcementHighlightText = richTextValue(productAnnouncement?.highlightText ?? props.announcementHighlightText, defaultAnnouncement.highlightText);
  const announcementText = richTextValue(productAnnouncement?.text ?? props.announcementText, defaultAnnouncement.text);
  const announcementCtaText = richTextValue(productAnnouncement?.ctaText ?? props.announcementCtaText, defaultAnnouncement.ctaText);
  const announcementHref = productAnnouncement?.href ?? props.announcementHref;
  const productsCol1Title = sourceRichText(props.productsCol1Title, "ÜRETİM", ["uretim"]);
  const productsCol2Title = sourceRichText(props.productsCol2Title, "TAMAMLAYICI", ["tamamlayici"]);
  const productsFeatureEyebrow = sourceRichText(props.productsFeatureEyebrow, defaultProductsFeature.eyebrow);
  const productsFeatureTitle = sourceRichText(props.productsFeatureTitle, defaultProductsFeature.title, ["mash c4p akilli kurleme cihazi"]);
  const productsFeatureDescription = sourceRichText(props.productsFeatureDescription, defaultProductsFeature.description, [
    "recineye gore otomatik kurleme. sonuc kalitesini kullanici hatasindan cikarir.",
  ]);
  const productsFeatureCtaText = sourceRichText(props.productsFeatureCtaText, defaultProductsFeature.ctaText, ["kesfet"]);
  const mobileSearchHref = searchPageHref(props.searchHref);
  const productPrimary: MenuItem[] = [
    {
      title: sourceRichText(props.product1Title, defaultProductPrimary[0].title),
      description: sourceRichText(props.product1Description, defaultProductPrimary[0].description, ["mash p1d (385 nm dlp) · p16l — ±20µm hassasiyet"]),
      href: productRouteHref(props.product1Href, defaultProductPrimary[0].href),
      icon: ecoPrinterIcon,
    },
    {
      title: sourceRichText(props.product2Title, defaultProductPrimary[1].title),
      description: sourceRichText(props.product2Description, defaultProductPrimary[1].description, ["c4p akilli kurleme · c1e ekonomik"]),
      href: productRouteHref(props.product2Href, defaultProductPrimary[1].href),
      icon: ecoScannerIcon,
    },
    {
      title: sourceRichText(props.product3Title, defaultProductPrimary[2].title),
      description: sourceRichText(props.product3Description, defaultProductPrimary[2].description, ["crs · ce class iia biyouyumlu & model"]),
      href: productRouteHref(props.product3Href, defaultProductPrimary[2].href),
      icon: ecoResinIcon,
    },
  ];

  const productSecondary: MenuItem[] = [
    { title: sourceRichText(props.product4Title, defaultProductSecondary[0].title), description: sourceRichText(props.product4Description, defaultProductSecondary[0].description, ["lab icin hassas tarama"]), href: productRouteHref(props.product4Href, defaultProductSecondary[0].href), icon: ecoCuringIcon },
    { title: sourceRichText(props.product5Title, defaultProductSecondary[1].title), description: sourceRichText(props.product5Description, defaultProductSecondary[1].description, ["freze sarflari"]), href: productRouteHref(props.product5Href, defaultProductSecondary[1].href), icon: ecoBlocksIcon },
    { title: sourceRichText(props.product6Title, defaultProductSecondary[2].title), description: sourceRichText(props.product6Description, defaultProductSecondary[2].description, ["sinterleme cozumleri"]), href: productRouteHref(props.product6Href, defaultProductSecondary[2].href), icon: ecoOvenIcon },
  ];

  const whyItems: FlowItem[] = [
    { number: text(props.why1Number, "01"), title: text(props.why1Title, "Yılda $126K'ya varan görünmez kayıp"), description: text(props.why1Description, "Tekrarlanan işlerin kliniğinize gerçek maliyeti"), href: text(props.why1Href, "#sorun") },
    { number: text(props.why2Number, "02"), title: text(props.why2Title, "Sebep: ölçüsel hassasiyet"), description: text(props.why2Description, "250–500µm sapma bandı vs ±20µm güvenli bölge"), href: text(props.why2Href, "#piyasada-yaygin-kurulum-250-500") },
    { number: text(props.why3Number, "03"), title: text(props.why3Title, "Çözüm: uyumlu ekosistem"), description: text(props.why3Description, "Yazıcı + reçine + parametre bilgisi, birlikte kalibre"), href: text(props.why3Href, "#cozum") },
    { number: text(props.why4Number, "04"), title: text(props.why4Title, "Ve kürleme — son %20'lik fark"), description: text(props.why4Description, "Doğru basılan iş, yanlış kürlenirse yine başarısız olur"), href: text(props.why4Href, "#kurleme") },
  ];

  const profileLinks = [
    { label: richTextValue(props.profileLink1Text, "Siparişlerim"), link: text(props.profileLink1Href, "/account/orders") },
    { label: richTextValue(props.profileLink2Text, "Adreslerim"), link: text(props.profileLink2Href, "/account/addresses") },
    { label: richTextValue(props.profileLink5Text, "Mash Academy"), link: academyPageTarget(props.profileLink5Href) },
    { label: richTextValue(props.profileLink6Text, "Çıkış yap"), link: text(props.profileLink6Href, "/account/logout") },
  ];

  const themeStyle = {
    "--tmh-bg": sourceThemeToken("#FAFAF7", "--tm-theme-bg"),
    "--tmh-ann-bg": sourceThemeToken("#0E0E0C", "--tm-theme-announcement-bg"),
    "--tmh-ann-text": sourceThemeToken("#CFCFC6", "--tm-theme-announcement-text"),
    "--tmh-word-color": sourceThemeToken("#C7F136", "--tm-theme-accent"),
    "--tmh-word-weight": props.styledPhraseBold ? "800" : "inherit",
    "--tmh-word-style": props.styledPhraseItalic ? "italic" : "inherit",
    "--tmh-ann-word-color": sourceThemeToken("#C7F136", "--tm-theme-accent"),
    "--tmh-ann-word-weight": props.announcementStyledPhraseBold ? "800" : "inherit",
    "--tmh-ann-word-style": props.announcementStyledPhraseItalic ? "italic" : "inherit",
    "--tmh-accent": sourceThemeToken("#C7F136", "--tm-theme-accent"),
    "--tmh-accent-text": "var(--tm-theme-accent-text, #3D4D0E)",
    "--tmh-text": sourceThemeToken("#0E0E0C", "--tm-theme-text"),
    "--tmh-muted": sourceThemeToken("#8F8F86", "--tm-theme-muted"),
    "--tmh-line": sourceThemeToken("#E6E6E0", "--tm-theme-line"),
    "--tmh-panel": sourceThemeToken("#FFFFFF", "--tm-theme-surface"),
    "--tmh-source-panel": "var(--tm-theme-panel, #F1F1EC)",
    "--tmh-badge": sourceThemeToken("#E2492F", "--tm-theme-danger"),
    "--tmh-why-card-glow": props.showWhyItemGlow === false ? "none" : "linear-gradient(90deg, color-mix(in srgb, var(--tmh-accent) 10%, transparent), transparent 44%)",
    "--tmh-why-card-hover-glow": props.showWhyItemGlow === false ? "none" : "linear-gradient(90deg, color-mix(in srgb, var(--tmh-accent) 18%, transparent), transparent 48%)",
    // Older page instances can retain their former 32px Studio values. Keep the shared brand mark at the source size.
    "--tmh-logo-image-width": `${numberInRange(props.logoImageWidth, 116, 116, 118)}px`,
    "--tmh-logo-image-height": `${numberInRange(props.logoImageHeight, 24, 24, 25)}px`,
    "--tmh-logo-image-x": `${numberInRange(props.logoImageXOffset, 0, -24, 24)}px`,
    "--tmh-logo-image-y": `${numberInRange(props.logoImageYOffset, 0, -24, 24)}px`,
    "--tmh-logo-image-fit": logoFit(props.logoImageFit),
    "--tmh-logo-image-opacity": numberInRange(props.logoImageOpacity, 100, 0, 100) / 100,
    "--tmh-logo-image-brightness": percentage(props.logoImageBrightness, 100, 0, 220),
    "--tmh-logo-image-contrast": percentage(props.logoImageContrast, 100, 0, 220),
    "--tmh-logo-image-saturation": percentage(props.logoImageSaturation, 100, 0, 300),
    "--tmh-logo-image-hue": `${numberInRange(props.logoImageHue, 0, -180, 180)}deg`,
    "--tmh-logo-image-invert": percentage(props.logoImageInvert, 0, 0, 100),
    "--tmh-logo-svg-width": `${numberInRange(props.logoSvgWidth, 116, 116, 118)}px`,
    "--tmh-logo-svg-height": `${numberInRange(props.logoSvgHeight, 24, 24, 25)}px`,
    "--tmh-logo-svg-x": `${numberInRange(props.logoSvgXOffset, 0, -24, 24)}px`,
    "--tmh-logo-svg-y": `${numberInRange(props.logoSvgYOffset, 0, -24, 24)}px`,
    "--tmh-logo-svg-opacity": numberInRange(props.logoSvgOpacity, 100, 0, 100) / 100,
    "--tmh-logo-svg-brightness": percentage(props.logoSvgBrightness, 100, 0, 220),
    "--tmh-logo-svg-contrast": percentage(props.logoSvgContrast, 100, 0, 220),
    "--tmh-logo-svg-saturation": percentage(props.logoSvgSaturation, 100, 0, 300),
    "--tmh-logo-svg-hue": `${numberInRange(props.logoSvgHue, 0, -180, 180)}deg`,
    "--tmh-logo-svg-invert": percentage(props.logoSvgInvert, 0, 0, 100),
    ...imageControlVars("tmh-action-icon-image", props, "actionIconImage", 22, 22, 36),
    ...svgControlVars("tmh-action-icon-svg", props, "actionIconSvg", 22, 22, 36),
  };

  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus();
    }
  }, [isSearchOpen]);
  useEffect(() => {
  let frame = 0;

  const updateHeaderPosition = () => {
    const header = headerRef.current;
    const announcement = document.querySelector(
      ".tmh-announcement"
    ) as HTMLElement | null;

    if (!header) return;

    const announcementHeight = announcement?.offsetHeight || 0;
    const top = Math.max(0, announcementHeight - window.scrollY);

    header.style.setProperty("--tmh-sticky-top", `${top}px`);
  };

  const onScroll = () => {
    if (frame) return;

    frame = window.requestAnimationFrame(() => {
      frame = 0;
      updateHeaderPosition();
    });
  };

  updateHeaderPosition();

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateHeaderPosition);

  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", updateHeaderPosition);

    if (frame) {
      window.cancelAnimationFrame(frame);
    }
  };
}, []);

  useEffect(() => {
    const pendingSectionId = consumePendingReferencesScroll();
    const pendingHash = pendingSectionId ? sectionHash(pendingSectionId, defaultReferencesSectionId) : window.location.hash;
    if (!pendingHash || pendingHash.length <= 1) return;
    let frame = 0;
    let attempts = 0;

    const scrollToPendingSection = () => {
      const sectionId = decodeURIComponent(pendingHash.slice(1));
      const section = document.getElementById(sectionId) || document.querySelector(pendingHash);
      if (!section) {
        attempts += 1;
        if (attempts < 90) {
          frame = window.requestAnimationFrame(scrollToPendingSection);
        }
        return;
      }

      section.scrollIntoView({ behavior: "smooth", block: "start" });
      if (pendingSectionId) window.history.replaceState(null, "", pendingHash);
    };

    const timeout = window.setTimeout(() => {
      frame = window.requestAnimationFrame(scrollToPendingSection);
    }, 120);

    return () => {
      window.clearTimeout(timeout);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    const refreshCartState = () => {
      if (!mounted) return;
      setIsLoggedIn(Boolean(customerStore.customer));
      setCart(cartStore.cart ? ({ ...cartStore.cart } as IkasCart) : null);
    };
    const syncCartState = async () => {
      await getCart();
      await hydrateMissingOrderLineImageFallbacks(cartStore.cart?.orderLineItems || []);
      refreshCartState();
    };

    Promise.all([initCustomerStore(customerStore), waitForCartStoreInit(cartStore)])
      .then(syncCartState)
      .catch(refreshCartState);

    window.addEventListener("focus", syncCartState);
    window.addEventListener("ikas:open-cart-sidebar", syncCartState as EventListener);

    return () => {
      mounted = false;
      window.removeEventListener("focus", syncCartState);
      window.removeEventListener("ikas:open-cart-sidebar", syncCartState as EventListener);
    };
  }, []);

  useEffect(() => {
    const productList = props.searchProductList;
    if (!productList) return;

    const query = searchQuery.trim();
    if (!isSearchOpen && committedSuggestionSearchRef.current === query) return;
    if (query === committedSuggestionSearchRef.current) return;

    const timeout = window.setTimeout(() => {
      committedSuggestionSearchRef.current = query;
      updateProductSearchList(productList, query);
    }, 180);

    return () => window.clearTimeout(timeout);
  }, [props.searchProductList, searchQuery, isSearchOpen]);

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
    setProductAnnouncement(currentProductAnnouncement());

    function handleProductAnnouncement(event: Event) {
      setProductAnnouncement(announcementOverridePayload((event as CustomEvent).detail));
    }

    window.addEventListener("three-mash:product-announcement", handleProductAnnouncement);
    return () => window.removeEventListener("three-mash:product-announcement", handleProductAnnouncement);
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
      const sectionId = decodeURIComponent(hash.slice(1));
      const section = document.getElementById(sectionId) || document.querySelector(hash);
      if (!section) return;

      event.preventDefault();
      event.stopPropagation();
      setActiveMenu(null);
      setActiveAction(null);
      window.history.pushState(null, "", hash);
      setTimeout(() => section.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
    }

    document.addEventListener("click", smoothSamePageAnchor);
    return () => document.removeEventListener("click", smoothSamePageAnchor);
  }, []);

  useEffect(() => {
    let frame = 0;
    const scheduleCleanup = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        hideLegacyThemeCategories();
      });
    };

    scheduleCleanup();
    const observer = typeof MutationObserver === "undefined" ? null : new MutationObserver(scheduleCleanup);
    observer?.observe(document.body, { childList: true, subtree: true, characterData: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (activeMenu !== "products") return;

    updateProductsMenuPosition();
    window.addEventListener("resize", updateProductsMenuPosition);
    return () => window.removeEventListener("resize", updateProductsMenuPosition);
  }, [activeMenu]);

  useEffect(() => {
    if (activeMenu !== "why") return;

    updateWhyMenuPosition();
    window.addEventListener("resize", updateWhyMenuPosition);
    return () => window.removeEventListener("resize", updateWhyMenuPosition);
  }, [activeMenu]);

  function updateProductsMenuPosition() {
    const item = productsMenuRef.current;
    if (!item || typeof window === "undefined") return;

    const rect = item.getBoundingClientRect();
    const panelWidth = Math.min(880, window.innerWidth - 32);
    const desiredLeft = rect.left + rect.width / 2 - panelWidth / 2;
    const clampedLeft = Math.min(window.innerWidth - panelWidth - 16, Math.max(16, desiredLeft));
    setProductsMenuLeft(clampedLeft - rect.left);
  }

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
    setIsMobileMenuOpen(false);
    if (menu === "products") {
      requestAnimationFrame(updateProductsMenuPosition);
    }
    if (menu === "why") {
      requestAnimationFrame(updateWhyMenuPosition);
    }
  }

  function toggleAction(action: ActiveAction) {
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setActiveAction((current) => (current === action ? null : action));
  }

  function navigateSearchFallback(query: string) {
    const target = searchPageHref(props.searchHref);
    const param = props.searchQueryParam || "q";
    try {
      const url = new URL(target, "https://3mash.local");
      url.searchParams.set(param, query);
      window.location.href = `${url.pathname}${url.search}${url.hash}`;
    } catch {
      window.location.href = `${target}${target.includes("?") ? "&" : "?"}${encodeURIComponent(param)}=${encodeURIComponent(query)}`;
    }
  }

  function goToSearchMatch() {
    const query = searchQuery.trim();
    if (!query) return;

    const firstSuggestion = searchSuggestionItems[0]?.product;
    if (firstSuggestion) {
      const productHref = getProductHref(firstSuggestion);
      if (productHref && productHref !== "#") {
        window.location.href = productHref;
        return;
      }
    }

    navigateSearchFallback(query);
  }

  function submitSearch(event: Event) {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    goToSearchMatch();
  }

  function toggleSearch(event: Event) {
    event.preventDefault();
    setActiveMenu(null);
    setActiveAction(null);
    setIsMobileMenuOpen(false);

    if (!isSearchOpen) {
      setIsSearchOpen(true);
      return;
    }

    goToSearchMatch();
  }

  async function removeCartItem(event: Event, item: IkasOrderLineItem) {
    event.preventDefault();
    event.stopPropagation();
    if (removingCartItemId) return;

    setRemovingCartItemId(item.id);
    try {
      await removeItem(item);
      await getCart();
      setCart(cartStore.cart ? ({ ...cartStore.cart } as IkasCart) : null);
    } finally {
      setRemovingCartItemId("");
    }
  }

  return (
    <section className="three-mash-header" style={themeStyle}>
      {props.showAnnouncement !== false && (
        <div className="tmh-announcement">
          <div className="tmh-announcement-inner">
            <b dangerouslySetInnerHTML={announcementRichText(announcementHighlightText, props)} />
            <span dangerouslySetInnerHTML={announcementRichText(announcementText, props)} />
            <a href={href(text(announcementHref, defaultAnnouncement.href))} dangerouslySetInnerHTML={announcementRichText(announcementCtaText, props)} />
          </div>
        </div>
      )}

      <header className="tmh-header" ref={headerRef}>
        <div className="tmh-wrap tmh-nav">
          <Logo props={props} />

          <nav className="tmh-desktop-nav" aria-label={mobileMenuLabel}>
            <ul className="tmh-menu">
              <li
  ref={productsMenuRef}
  className={activeMenu === "products" ? "is-open" : ""}
  onMouseEnter={() => openMenu("products")}
  onMouseLeave={() => setActiveMenu(null)}
  onFocusIn={() => openMenu("products")}
>
                <button className="tmh-menu-trigger" type="button">
                  <RichInline value={productsMenuText} wordStyle={props} />
                  <CaretIcon />
                </button>
                <div
                  className="tmh-mega tmh-products-mega"
                  style={productsMenuLeft == null ? undefined : { "--tmh-products-mega-left": `${productsMenuLeft}px`, "--tmh-products-translate-x": "0px" } as any}
                >
                  <a className="tmh-feature" href={href(c4pRouteHref(text(props.productsFeatureHref, defaultProductsFeature.href)))}>
                    <span className="tmh-micro" dangerouslySetInnerHTML={richText(productsFeatureEyebrow, props)} />
                    <b dangerouslySetInnerHTML={richText(productsFeatureTitle, props)} />
                    <span dangerouslySetInnerHTML={richText(productsFeatureDescription, props)} />
                    <em dangerouslySetInnerHTML={richText(productsFeatureCtaText, props)} />
                  </a>
                  <div className="tmh-mega-column">
                    <span className="tmh-micro" dangerouslySetInnerHTML={richText(productsCol1Title, props)} />
                    {productPrimary.map((item, index) => (
                      <ProductLink item={item} wordStyle={props} key={index} />
                    ))}
                  </div>
                  <div className="tmh-mega-column">
                    <span className="tmh-micro" dangerouslySetInnerHTML={richText(productsCol2Title, props)} />
                    {productSecondary.map((item, index) => (
                      <ProductLink item={item} wordStyle={props} key={index} />
                    ))}
                  </div>
                </div>
              </li>

              <li
                ref={whyMenuRef}
                className={activeMenu === "why" ? "is-open" : ""}
                onMouseEnter={() => openMenu("why")}
                onFocusIn={() => openMenu("why")}
              >
                <button className="tmh-menu-trigger" type="button">
                  <RichInline value={whyMenuText} wordStyle={props} />
                  <CaretIcon />
                </button>
                <div
                  className="tmh-mega tmh-flow-mega"
                  style={whyMenuLeft == null ? undefined : { "--tmh-flow-mega-left": `${whyMenuLeft}px`, "--tmh-flow-translate-x": "0px" } as any}
                >
                  <div className="tmh-flow-grid">
                    {whyItems.map((item, index) => (
                      <FlowLink item={item} wordStyle={props} key={index} />
                    ))}
                  </div>
                </div>
              </li>

              <li>
                <a
                  className="tmh-plain-link"
                  href={referencesTargetHref}
                  onClick={(event) => handleReferencesClick(event, props.referencesHomeHref, props.referencesSectionId)}
                  onMouseEnter={() => { setActiveMenu(null); setActiveAction(null); }}
                >
                  <RichInline value={referencesText} wordStyle={props} />
                </a>
              </li>
              <li>
                <a className="tmh-plain-link" href={academyPageTarget(props.academyHref)} onMouseEnter={() => { setActiveMenu(null); setActiveAction(null); }}>
                  <RichInline value={academyText} wordStyle={props} />
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
                type="button"
                aria-label={props.searchAriaLabel || ""}
                aria-expanded={isSearchOpen}
                onClick={toggleSearch}
              >
                <InlineIcon image={searchIcon.image} svg={searchIcon.svg} className="tmh-action-svg" />
              </button>
              {hasSearchSuggestions ? (
                <div className="tmh-search-suggestions" role="listbox">
                  {searchSuggestionItems.map((item) => (
                    <SearchSuggestionLink product={item.product} key={item.product.id} />
                  ))}
                </div>
              ) : null}
            </form>
            {props.showProfileMenu === false ? (
              <a href={headerRouteHref(props.accountHref, "/account/login")} aria-label={props.accountAriaLabel || ""}>
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
              <a href={headerRouteHref(props.cartHref, "/cart")} aria-label={props.cartAriaLabel || ""} className="tmh-cart">
                <InlineIcon image={cartIcon.image} svg={cartIcon.svg} className="tmh-action-svg" />
              </a>
            ) : (
              <div className="tmh-action-wrap">
                <button
                  className="tmh-action-button tmh-cart"
                  type="button"
                  aria-label={props.cartAriaLabel || ""}
                  aria-expanded={activeAction === "store"}
                  onClick={() => toggleAction("store")}
                >
                  <InlineIcon image={cartIcon.image} svg={cartIcon.svg} className="tmh-action-svg" />
                  {cartItemCount > 0 ? <span className="tmh-cart-badge">{cartItemCount}</span> : null}
                </button>
                <div className={`tmh-action-panel tmh-store-panel${activeAction === "store" ? " is-open" : ""}`}>
                  <span className="tmh-action-panel-kicker">{text(props.cartAriaLabel, "SEPETİM")}</span>
                  {isLoggedIn && cartItems.length > 0 ? (
                    <div className="tmh-cart-live">
                      <div className="tmh-cart-count">{cartItemCount} ürün sepetinizde</div>
                      <div className="tmh-cart-live-list">
                        {visibleCartItems.map((item) => {
                          const imageCandidates = orderLineImageUrlCandidates(item, 180);
                          const image = imageCandidates[0] || cartImageUrl(item);
                          const variant = cartItemVariantText(item);
                          return (
                            <div className="tmh-cart-live-item" key={item.id}>
                              <a className="tmh-cart-live-link" href={cartProductHref(item)}>
                                <span className="tmh-cart-live-image">
                                  <span>{cartItemTitle(item).slice(0, 1)}</span>
                                  {image ? <img src={image} alt={cartItemTitle(item)} loading="lazy" decoding="async" data-image-index="0" onError={(event) => handleOrderLineImageError(event, imageCandidates)} /> : null}
                                </span>
                                <span className="tmh-cart-live-copy">
                                  <b>{cartItemTitle(item)}</b>
                                  {variant ? <small>{variant}</small> : null}
                                  <em>Adet {item.quantity}</em>
                                </span>
                              </a>
                              <strong>{getOrderLineItemFormattedFinalPriceWithQuantity(item)}</strong>
                              <button
                                className="tmh-cart-live-remove"
                                type="button"
                                aria-label={`${cartItemTitle(item)} sepetten kaldır`}
                                disabled={removingCartItemId === item.id}
                                onClick={(event) => removeCartItem(event, item)}
                              >
                                ×
                              </button>
                            </div>
                          );
                        })}
                      </div>
                      <a className="tmh-cart-market-button tmh-cart-go-button" href="/cart">Sepete git</a>
                    </div>
                  ) : (
                    <div className="tmh-cart-empty-card">
                      <a
                        className="tmh-cart-market-button"
                        href={storePageHref(props.storePanelButtonHref)}
                        dangerouslySetInnerHTML={richText(richTextValue(props.storePanelButtonText, "Markete git"), props)}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <button
            className="tmh-mobile-menu"
            type="button"
            aria-label={inlineHtml(mobileMenuLabel).replace(/<[^>]*>/g, " ").trim()}
            aria-expanded={isMobileMenuOpen}
            onClick={() => {
              setActiveMenu(null);
              setActiveAction(null);
              setIsSearchOpen(false);
              setIsMobileMenuOpen((current) => !current);
            }}
          >
            <svg className="tmh-hamburger-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" focusable="false">
              <line x1="3" y1="7" x2="21" y2="7" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="17" x2="21" y2="17" />
            </svg>
          </button>
        </div>
        <div className={`tmh-mobile-panel${isMobileMenuOpen ? " is-open" : ""}`}>
          <nav className="tmh-mobile-list" aria-label={mobileMenuLabel}>
            <a href={mobileSearchHref} dangerouslySetInnerHTML={richText(productsMenuText, props)} />
            <a className="tmh-mobile-accent-link" href={href(productPrimary[2]?.href)} dangerouslySetInnerHTML={richText(productPrimary[2]?.title, props)} />
            <a href={href(productPrimary[0]?.href)} dangerouslySetInnerHTML={richText(productPrimary[0]?.title, props)} />
            <a href={academyPageTarget(props.academyHref)} dangerouslySetInnerHTML={richText(academyText, props)} />
            <a href={headerRouteHref(props.accountHref, "/account/login")} dangerouslySetInnerHTML={richText(richTextValue(props.profileMenuTitle, "Hesabım"), props)} />
          </nav>
        </div>
      </header>
      <div className="tmh-header-spacer" />
    </section>
  );
}

export default ThreeMashHeader;
