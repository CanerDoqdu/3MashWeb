import { useEffect, useLayoutEffect, useRef, useState } from "preact/hooks";
import {
  createMediaSrcset,
  customerStore,
  getDefaultSrc,
  getOrderLineItemFormattedFinalPriceWithQuantity,
  getProductHref,
  getProductListInitialData,
  getProductVariantMainImage,
  getSelectedProductVariant,
  removeItem,
  searchProductList as updateProductSearchList,
  type IkasCart,
  type IkasOrderLineItem,
  type IkasProduct,
  type IkasProductList,
  type IkasProductVariant,
} from "@ikas/bp-storefront";
import { hydrateMissingOrderLineImageFallbacks, orderLineImageUrl, orderLineImageUrlCandidates } from "../ThreeMashOrderLineImage";
import { ecoBlocksIcon, ecoCuringIcon, ecoOvenIcon, ecoPrinterIcon, ecoResinIcon, ecoScannerIcon } from "../../assets/eco-icons-data";
import threeMashHeaderLogoImage from "../../assets/three-mash-header-logo-final-data";
import { Props } from "./types";
import {
  getCurrentCart,
  initGlobalCart,
  publishCartFromIkasStore,
  refreshGlobalCart,
  subscribeCart,
} from "../cartState";

type ActiveMenu = "products" | "why" | null;
type ActiveAction = "profile" | "store" | null;

interface MenuItem {
  title?: string;
  description?: string;
  href?: string;
  icon?: string;
}

interface FlowItem {
  number?: string;
  title?: string;
  description?: string;
  href?: string;
}

interface SearchSuggestion {
  product: IkasProduct;
  score: number;
}

interface HeaderAnnouncementOverride {
  highlightText?: string;
  text?: string;
  ctaText?: string;
  href?: string;
}

const defaultProductsMenuText = "Ürünler";
const defaultWhyMenuText = "Akış";
const defaultReferencesText = "Güven";
const defaultAcademyText = "Akademi";
const defaultMobileMenuLabel = "Ana Menü";
const defaultReferencesHomeHref = "/";
const defaultReferencesSectionId = "guven";
const pendingReferencesScrollKey = "three_mash_pending_references_scroll";
const academyPageHref = "/pages/mash-akademi";

const legacyAcademyRouteKeys = new Set([
  "akademi",
  "academy",
  "mash-akademi",
  "mash-academy",
  "pages-akademi",
  "pages-academy",
  "pages-mash-akademi",
  "pages-mash-academy",
]);

const defaultAnnouncement = {
  highlightText: "⚡ Fırsatı kaçırmayın.",
  text: "3D dental baskıda yüksek hassasiyet ve güvenilir üretim akışını keşfedin.",
  ctaText: "Detayları gör →",
  href: "/search",
};

const defaultProductsFeature = {
  eyebrow: "YENİ · DÜNYADA İLK",
  title: "MASH C1E<br>Akıllı Kürleme Cihazı",
  description: "Post-curing'i kullanıcı hatasından arındırır: reçineye göre süre, sıcaklık ve dalga boyunu otomatik yönetir.",
  ctaText: "Keşfet →",
  href: "/kurleme-cihazlari",
};

const defaultProductPrimary: Required<MenuItem>[] = [
  { title: "3D Yazıcılar", description: "P1D / P16L hassas baskı", href: "/3d-yazicilar", icon: ecoPrinterIcon },
  { title: "Yıkama", description: "Baskı sonrası ultrasonik temizlik", href: "/yikama-cihazlari", icon: ecoScannerIcon },
  { title: "Kürleme", description: "360° homojen UV post-curing", href: "/kurleme-cihazlari", icon: ecoCuringIcon },
];

const defaultProductSecondary: Required<MenuItem>[] = [
  { title: "Dental Reçineler", description: "Dental reçine seçenekleri", href: "/dental-3d-yazici-recineleri", icon: ecoResinIcon },
  { title: "Zirkon Bloklar", description: "Freze tarafının sarfları", href: "/zirkon-bloklar", icon: ecoBlocksIcon },
  { title: "Dental Fırınlar", description: "Sinterleme çözümleri", href: "/dental-firinlar", icon: ecoOvenIcon },
  { title: "Tarayıcılar", description: "Lab tarafında hassas veri", href: "/masasustu-tarayicilar", icon: ecoCuringIcon },
];

function href(value?: string) {
  const trimmed = value?.trim();
  if (!trimmed) return "#";
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
  "yikama-cihazlari": "/yikama-cihazlari",
  "yikama": "/yikama-cihazlari",
  "kurleme-cihazlari": "/kurleme-cihazlari",
  "kurleme": "/kurleme-cihazlari",
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

function safeHistoryReplace(url: string) {
  if (typeof window === "undefined") return;
  try {
    window.history.replaceState(null, "", url);
  } catch {}
}

function safeHistoryPush(url: string) {
  if (typeof window === "undefined") return;
  try {
    window.history.pushState(null, "", url);
  } catch {}
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
    safeHistoryPush(hash);
    return;
  }

  savePendingReferencesScroll(targetId);
  window.location.href = homeTarget;
}

function handleAnnouncementClick(event: MouseEvent, targetHref: string) {
  if (targetHref !== "#karsilastirma-tablosu" || typeof window === "undefined") return;

  const section = document.getElementById("karsilastirma-tablosu");
  if (!section) return;

  event.preventDefault();
  event.stopPropagation();
  section.scrollIntoView({ behavior: "smooth", block: "center" });
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
    .slice(0, 3);
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
  if (typeof value === "string") return value.trim();
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
  if (typeof value === "string" && value.trim()) return value.trim();
  if (value && typeof value === "object") {
    const image = value as { id?: unknown; url?: unknown; src?: unknown; imageUrl?: unknown; value?: unknown };
    if (typeof image.url === "string") return image.url;
    if (typeof image.src === "string") return image.src;
    if (typeof image.imageUrl === "string") return image.imageUrl;
  }
  return fallback;
}

function InlineSvg({ svg, className }: { svg?: unknown; className: string }) {
  const markup = svgMarkup(svg);
  if (!markup) return null;
  return (
    <span
      className={className}
      aria-hidden="true"
      style={{ width: "22px", height: "22px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}

function InlineIcon({ image, svg, className }: { image?: unknown; svg?: unknown; className: string }) {
  const imageUrl = imageSource(image);
  if (imageUrl) {
    return (
      <span
        className={className}
        aria-hidden="true"
        style={{ width: "22px", height: "22px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}
      >
        <img src={imageUrl} alt="" width="22" height="22" loading="lazy" decoding="async" />
      </span>
    );
  }
  return <InlineSvg svg={svg} className={className} />;
}

const defaultSearchSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`;
const defaultAccountSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
const defaultCartSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>`;

function resolveActionIcon(image: unknown, svg: unknown, fallbackSvg: string, showIcons: boolean) {
  if (!showIcons) return { image: undefined, svg: undefined };
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

function cartImageUrl(item: IkasOrderLineItem) {
  return orderLineImageUrl(item, 180);
}

function handleOrderLineImageError(
  event: Event,
  candidates: string[]
) {
  const image = event.currentTarget as HTMLImageElement;
  const nextIndex =
    Number(image.dataset.imageIndex || 0) + 1;

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

function flowSectionId(item: FlowItem) {
  const rawHref = item.href?.trim() || "";
  const rawHash = rawHref.includes("#") ? rawHref.split("#").pop() || "" : rawHref;
  return cleanSectionId(rawHash, defaultReferencesSectionId);
}

function headerScrollOffset() {
  const header = document.querySelector(".three-mash-header .tmh-header");
  const headerHeight = header instanceof HTMLElement ? header.getBoundingClientRect().height : 70;
  return Math.max(68, Math.ceil(headerHeight + 14));
}

function getElementHeaderScrollTop(targetEl: HTMLElement, sectionId?: string): number {
  const headerOffset = headerScrollOffset();
  const innerHead = targetEl.querySelector(".tmproblem-head, .tmproblem-index, .tmr-head, .tmr-index, .tmr-why-grid, h2") as HTMLElement | null;
  const refEl = innerHead && innerHead.getBoundingClientRect().top < targetEl.getBoundingClientRect().top + 160
    ? innerHead
    : targetEl;

  const rect = refEl.getBoundingClientRect();
  const elementAbsoluteTop = window.scrollY + rect.top;
  const isMobile = window.innerWidth <= 768;

  if (sectionId === "cozum") {
    return Math.max(0, elementAbsoluteTop - headerOffset - (isMobile ? 10 : 20));
  } else if (sectionId === "sebep" || sectionId === "sorun") {
    return Math.max(0, elementAbsoluteTop - headerOffset - (isMobile ? 12 : 24));
  } else if (sectionId === "kurleme") {
    return Math.max(0, elementAbsoluteTop - headerOffset - (isMobile ? 10 : 18));
  }
  return Math.max(0, elementAbsoluteTop - headerOffset - (isMobile ? 12 : 20));
}

function findSectionTargetElement(sectionId: string): HTMLElement | null {
  const cleanId = sectionId.replace(/^#+/, "").trim();
  if (!cleanId) return null;
  if (cleanId === "sebep" || cleanId === "sorun") return document.querySelector("#sebep, #sorun, .three-mash-problem, .tmproblem-head, .tmproblem");
  if (cleanId === "cozum") return document.querySelector("#cozum, .three-mash-solution, .tmr-solution, .tmr-head");
  if (cleanId === "kurleme") return document.querySelector("#kurleme, .three-mash-curing, .tmr-curing");
  if (cleanId === "ekosistem") return document.querySelector("#ekosistem, .three-mash-ecosystem, .tmr-ecosystem");
  if (cleanId === "guven" || cleanId === "referanslar") return document.querySelector("#guven, #referanslar, .three-mash-trust, .tmr-testimonials");
  if (cleanId === "sss") return document.querySelector("#sss, .three-mash-faq, .tmr-faq");
  if (cleanId === "iletisim-cta") return document.querySelector("#iletisim-cta, .three-mash-final, .tmr-final");
  return document.getElementById(cleanId) || document.querySelector(`#${cleanId}`);
}

function scrollToSectionWithOffset(sectionId: string, onAlreadyAtSection?: () => void) {
  if (typeof window === "undefined") return;
  const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";
  const cleanId = sectionId.replace(/^#+/, "").trim();
  const isTopTarget = !cleanId || cleanId === "__top__" || cleanId === "giris" || cleanId === "/" || cleanId === "top";

  if (currentPath !== "/") {
    if (isTopTarget) {
      savePendingReferencesScroll("__top__");
      window.location.href = "/";
      return;
    }
    savePendingReferencesScroll(cleanId);
    window.location.href = `/#${cleanId}`;
    return;
  }

  if (isTopTarget) {
    if (window.scrollY <= 80) {
      if (onAlreadyAtSection) onAlreadyAtSection();
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (onAlreadyAtSection) setTimeout(onAlreadyAtSection, 350);
    safeHistoryReplace(`${window.location.pathname}${window.location.search}`);
    return;
  }

  const targetEl = findSectionTargetElement(cleanId);
  if (!targetEl) return;
  const targetTop = getElementHeaderScrollTop(targetEl, cleanId);

  if (Math.abs(window.scrollY - targetTop) < 35) {
    if (onAlreadyAtSection) onAlreadyAtSection();
    return;
  }

  window.scrollTo({ top: targetTop, left: 0, behavior: "smooth" });
  safeHistoryPush(`#${cleanId}`);
}

function FlowLink({ item, wordStyle, onToast, onCloseMenu }: { item: FlowItem; wordStyle: Props; onToast?: (msg: string) => void; onCloseMenu?: () => void; }) {
  const itemHref = href(item.href);
  const sectionId = flowSectionId(item);
  const isFirstItem = item.number === "01" || itemHref === "/" || !sectionId || sectionId === "giris";

  return (
    <a
      href={itemHref}
      className="tmh-flow-link"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        if (onCloseMenu) onCloseMenu();
        if (isFirstItem) {
          scrollToSectionWithOffset("__top__", () => {
            if (onToast) onToast("Zaten ilgili bölümdesiniz");
          });
          return;
        }
        scrollToSectionWithOffset(sectionId, () => {
          if (onToast) onToast("Zaten ilgili bölümdesiniz");
        });
      }}
    >
      <span className="tmh-flow-number" dangerouslySetInnerHTML={richText(item.number, wordStyle)} />
      <span className="tmh-flow-copy">
        <b dangerouslySetInnerHTML={richText(item.title, wordStyle)} />
        <span dangerouslySetInnerHTML={richText(item.description, wordStyle)} />
      </span>
    </a>
  );
}

function whyMenuHref(fallback: string) {
  const target = text(undefined, fallback).trim();
  const hash = target.includes("#") ? `#${target.split("#").pop() || ""}` : target;
  const slug = routeTextKey(hash);
  if (fallback === "/" || slug === "sorun" || slug === "sebep" || slug === "piyasada-yaygin-kurulum-250-500") return "/#sebep";
  if (slug === "cozum") return "/#cozum";
  if (slug === "kurleme" || slug === "neden-gerekli") return "/#kurleme";
  if (slug === "iletisim-cta" || slug === "kritik-son-adim" || slug === "son-adim") return "/#iletisim-cta";
  return target.startsWith("#") ? `/${target}` : target;
}

function Logo({ props }: { props: Props }) {
  const { logoText, logoHref, logoImageAlt } = props;
  const logoImage = threeMashHeaderLogoImage;

  return (
    <a className="tmh-logo" href={headerRouteHref(logoHref, "/")} aria-label={logoText}>
      <span className="tmh-logo-image-wrap" style={{ width: "118px", height: "25px" } as any}>
        <img src={logoImage} alt={logoImageAlt || logoText} width="118" height="25" loading="eager" decoding="sync" />
      </span>
    </a>
  );
}

function CaretIcon() {
  return (
    <svg className="tmh-caret" width="10" height="8" viewBox="0 0 12 8" aria-hidden="true" focusable="false">
      <path d="M1 1.5 6 6.5l5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function currentRouteKey() {
  if (typeof window === "undefined") return "";
  return routeTextKey(window.location.pathname || "");
}

function normalizeSearchProductList(productList?: IkasProductList) {
  return productList ? ({ ...productList, data: productList.data || [] } as IkasProductList) : undefined;
}

export function ThreeMashHeaderV2(props: Props) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>(null);
  const [activeAction, setActiveAction] = useState<ActiveAction>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState<IkasCart | null>(() => getCurrentCart());
  const [removingCartItemId, setRemovingCartItemId] = useState("");
  const [productsMenuLeft, setProductsMenuLeft] = useState<number | null>(null);
  const [whyMenuLeft, setWhyMenuLeft] = useState<number | null>(null);
  const [resolvedSearchProductList, setResolvedSearchProductList] = useState<IkasProductList | undefined>(() => normalizeSearchProductList(props.searchProductList));
  const searchInputRef = useRef<HTMLInputElement>(null);
  const committedSuggestionSearchRef = useRef("");
  const searchListLoadKeyRef = useRef("");
  const headerRef = useRef<HTMLElement>(null);
  const productsMenuRef = useRef<HTMLLIElement>(null);
  const whyMenuRef = useRef<HTMLLIElement>(null);
  const showActionIcons = props.showActionIcons !== false;
  const searchIcon = resolveActionIcon(props.searchIconImageUrl, props.searchIconSvg, defaultSearchSvg, showActionIcons);
  const accountIcon = resolveActionIcon(props.accountIconImageUrl, props.accountIconSvg, defaultAccountSvg, showActionIcons);
  const cartIcon = resolveActionIcon(props.cartIconImageUrl, props.cartIconSvg, defaultCartSvg, showActionIcons);
  const referencesTargetHref = referencesSectionTarget(props.referencesHomeHref, props.referencesSectionId);
  const searchProductList = resolvedSearchProductList || normalizeSearchProductList(props.searchProductList);
  const searchSuggestionItems = searchSuggestions(searchProductList?.data || [], searchQuery);
  const hasSearchSuggestions = isSearchOpen && searchQuery.trim().length > 0 && searchSuggestionItems.length > 0;
  
  const cartItems = cart?.orderLineItems?.filter((item) => !item.deleted && Number(item.quantity || 0) > 0) || [];
  const cartItemCount = cartItems.reduce((total, item) => total + Number(item.quantity || 0), 0);
  const visibleCartItems = cartItems.slice(0, 4);

  const productsMenuText = sourceRichText(props.productsMenuText, defaultProductsMenuText);
  const whyMenuText = sourceRichText(props.whyMenuText, defaultWhyMenuText);
  const referencesText = sourceRichText(props.referencesText, defaultReferencesText);
  const academyText = sourceRichText(props.academyText, defaultAcademyText, ["akademi"]);
  const mobileMenuLabel = richTextValue(props.mobileMenuLabel, defaultMobileMenuLabel);
  const announcementHighlightText = richTextValue(props.announcementHighlightText, defaultAnnouncement.highlightText);
  const announcementText = richTextValue(props.announcementText, defaultAnnouncement.text);
  const announcementCtaText = richTextValue(props.announcementCtaText, defaultAnnouncement.ctaText);
  const announcementHref = props.announcementHref;
  const effectiveAnnouncementHref = currentRouteKey() === "3d-yazicilar" ? "#karsilastirma-tablosu" : announcementHref;
  
  const productsCol1Title = sourceRichText(props.productsCol1Title, "ÜRETİM", ["uretim"]);
  const productsCol2Title = sourceRichText(props.productsCol2Title, "TAMAMLAYICI", ["tamamlayici"]);
  const productsFeatureEyebrow = sourceRichText(props.productsFeatureEyebrow, defaultProductsFeature.eyebrow);
  const productsFeatureTitle = sourceRichText(props.productsFeatureTitle, defaultProductsFeature.title);
  const productsFeatureDescription = sourceRichText(props.productsFeatureDescription, defaultProductsFeature.description);
  const productsFeatureCtaText = sourceRichText(props.productsFeatureCtaText, defaultProductsFeature.ctaText);
  const mobileSearchHref = searchPageHref(props.searchHref);

  // Left Column (Sol Kolon): 3D Yazıcılar, Yıkama, Kürleme
  const productPrimary: MenuItem[] = [
    {
      title: sourceRichText(props.product1Title, defaultProductPrimary[0].title),
      description: sourceRichText(props.product1Description, defaultProductPrimary[0].description),
      href: productRouteHref(props.product1Href, defaultProductPrimary[0].href),
      icon: ecoPrinterIcon,
    },
    {
      title: sourceRichText(props.product2Title, defaultProductPrimary[1].title),
      description: sourceRichText(props.product2Description, defaultProductPrimary[1].description),
      href: productRouteHref(props.product2Href, defaultProductPrimary[1].href),
      icon: ecoScannerIcon,
    },
    {
      title: sourceRichText(props.product3Title, defaultProductPrimary[2].title),
      description: sourceRichText(props.product3Description, defaultProductPrimary[2].description),
      href: productRouteHref(props.product3Href, defaultProductPrimary[2].href),
      icon: ecoCuringIcon,
    },
  ];

  // Right Column (Sağ Kolon): Dental Reçineler, Zirkon Bloklar, Son Satır: Dental Fırınlar | Tarayıcılar
  const productSecondary: MenuItem[] = [
    {
      title: sourceRichText(props.product4Title, defaultProductSecondary[0].title),
      description: sourceRichText(props.product4Description, defaultProductSecondary[0].description),
      href: productRouteHref(props.product4Href, defaultProductSecondary[0].href),
      icon: ecoResinIcon,
    },
    {
      title: sourceRichText(props.product5Title, defaultProductSecondary[1].title),
      description: sourceRichText(props.product5Description, defaultProductSecondary[1].description),
      href: productRouteHref(props.product5Href, defaultProductSecondary[1].href),
      icon: ecoBlocksIcon,
    },
    {
      title: sourceRichText(props.product6Title, defaultProductSecondary[2].title),
      description: sourceRichText(props.product6Description, defaultProductSecondary[2].description),
      href: productRouteHref(props.product6Href, defaultProductSecondary[2].href),
      icon: ecoOvenIcon,
    },
    {
      title: sourceRichText(props.product7Title, defaultProductSecondary[3].title),
      description: sourceRichText(props.product7Description, defaultProductSecondary[3].description),
      href: productRouteHref(props.product7Href, defaultProductSecondary[3].href),
      icon: ecoCuringIcon,
    },
  ];

  const whyItems: FlowItem[] = [
    { number: text(props.why1Number, "01"), title: text(props.why1Title, "Yılda $126K'ya varan görünmez kayıp"), description: text(props.why1Description, "Tekrarlanan işlerin kliniğinize gerçek maliyeti"), href: "/" },
    { number: text(props.why2Number, "02"), title: text(props.why2Title, "Sebep: ölçüsel hassasiyet"), description: text(props.why2Description, "250–500µm sapma bandı vs ±20µm güvenli bölge"), href: whyMenuHref("/#sebep") },
    { number: text(props.why3Number, "03"), title: text(props.why3Title, "Çözüm: uyumlu ekosistem"), description: text(props.why3Description, "Yazıcı + reçine + parametre bilgisi, birlikte kalibre"), href: whyMenuHref("/#cozum") },
    { number: text(props.why4Number, "04"), title: text(props.why4Title, "Ve kürleme — son %20'lik fark"), description: text(props.why4Description, "Doğru basılan iş, yanlış kürlenirse yine başarısız olur"), href: whyMenuHref("/#kurleme") },
  ];

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  function showToast(message: string) {
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    setToastMessage(message);
    toastTimerRef.current = window.setTimeout(() => setToastMessage(null), 2200);
  }

  const profileLinks = [
    { label: richTextValue(props.profileLink1Text, "Siparişlerim"), link: headerRouteHref(props.profileLink1Href, "/account/orders") },
    { label: richTextValue(props.profileLink2Text, "Adreslerim"), link: headerRouteHref(props.profileLink2Href, "/account/addresses") },
    { label: richTextValue(props.profileLink5Text, "Mash Academy"), link: academyPageTarget(props.profileLink5Href) },
    { label: richTextValue(props.profileLink6Text, "Çıkış yap"), link: headerRouteHref(props.profileLink6Href, "/account/logout") },
  ];
  const accountMenuTitle = "Hesabım";

  useEffect(() => {
    if (isSearchOpen) searchInputRef.current?.focus();
  }, [isSearchOpen]);

  useEffect(() => {
    const productList = normalizeSearchProductList(props.searchProductList);
    setResolvedSearchProductList(productList);
    if (!productList || productList.isLoading || productList.data?.length) return;

    const requestKey = [
      productList.type,
      productList.sort,
      productList.limit,
      productList.productListPropValue?.category || productList.filterCategoryId || "",
      productList.productListPropValue?.brand || productList.filterBrandId || "",
    ].join("|");
    if (searchListLoadKeyRef.current === requestKey) return;
    searchListLoadKeyRef.current = requestKey;

    let isMounted = true;
    getProductListInitialData(productList)
      .then(() => {
        if (isMounted) setResolvedSearchProductList({ ...productList, data: productList.data || [] } as IkasProductList);
      })
      .catch((error) => {
        console.error("ThreeMashHeaderV2 search product list load failed", error);
      });

    return () => {
      isMounted = false;
    };
  }, [props.searchProductList]);

  useEffect(() => {
    const productList = searchProductList;
    if (!productList) return;

    const query = searchQuery.trim();
    if (!isSearchOpen && committedSuggestionSearchRef.current === query) return;
    if (query === committedSuggestionSearchRef.current) return;

    const timeout = window.setTimeout(() => {
      committedSuggestionSearchRef.current = query;
      Promise.resolve(updateProductSearchList(productList, query)).finally(() => {
        setResolvedSearchProductList({ ...productList, data: productList.data || [] } as IkasProductList);
      });
    }, 180);

    return () => window.clearTimeout(timeout);
  }, [searchProductList, searchQuery, isSearchOpen]);

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
    const unsubscribe = subscribeCart((nextCart) => setCart(nextCart));
    void initGlobalCart();
    return unsubscribe;
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
    if (menu === "products") requestAnimationFrame(updateProductsMenuPosition);
    if (menu === "why") requestAnimationFrame(updateWhyMenuPosition);
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
      publishCartFromIkasStore();
      void refreshGlobalCart();
    } finally {
      setRemovingCartItemId("");
    }
  }

  return (
    <section className="three-mash-header">
      {props.showAnnouncement !== false && (
        <div className="tmh-announcement">
          <div className="tmh-announcement-inner">
            <b data-tmh-ann-highlight dangerouslySetInnerHTML={announcementRichText(announcementHighlightText, props)} />
            <span data-tmh-ann-text dangerouslySetInnerHTML={announcementRichText(announcementText, props)} />
            <a
              data-tmh-ann-link
              href={href(text(effectiveAnnouncementHref, defaultAnnouncement.href))}
              onClick={(event) => handleAnnouncementClick(event, text(effectiveAnnouncementHref, defaultAnnouncement.href))}
              dangerouslySetInnerHTML={announcementRichText(announcementCtaText, props)}
            />
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
                  hidden={activeMenu !== "products"}
                  style={productsMenuLeft == null ? undefined : ({ "--tmh-products-mega-left": `${productsMenuLeft}px`, "--tmh-products-translate-x": "0px" } as any)}
                >
                  <a className="tmh-feature" href={href(productRouteHref(props.productsFeatureHref, defaultProductsFeature.href))}>
                    <span className="tmh-micro" dangerouslySetInnerHTML={richText(productsFeatureEyebrow, props)} />
                    <b dangerouslySetInnerHTML={richText(productsFeatureTitle, props)} />
                    <span dangerouslySetInnerHTML={richText(productsFeatureDescription, props)} />
                    <em dangerouslySetInnerHTML={richText(productsFeatureCtaText, props)} />
                  </a>

                  {/* SOL KOLON: 3D Yazıcılar, Yıkama, Kürleme */}
                  <div className="tmh-mega-column">
                    <span className="tmh-micro" dangerouslySetInnerHTML={richText(productsCol1Title, props)} />
                    {productPrimary.map((item, index) => (
                      <ProductLink item={item} wordStyle={props} key={index} />
                    ))}
                  </div>

                  {/* SAĞ KOLON: Dental Reçineler, Zirkon Bloklar, Son Satır: Dental Fırınlar | Tarayıcılar */}
                  <div className="tmh-mega-column">
                    <span className="tmh-micro" dangerouslySetInnerHTML={richText(productsCol2Title, props)} />
                    <ProductLink item={productSecondary[0]} wordStyle={props} />
                    <ProductLink item={productSecondary[1]} wordStyle={props} />
                    <div className="tmh-mega-row-split">
                      <ProductLink item={productSecondary[2]} wordStyle={props} />
                      <ProductLink item={productSecondary[3]} wordStyle={props} />
                    </div>
                  </div>
                </div>
              </li>

              <li
                ref={whyMenuRef}
                className={activeMenu === "why" ? "is-open" : ""}
                onMouseEnter={() => openMenu("why")}
                onMouseLeave={() => setActiveMenu(null)}
                onFocusIn={() => openMenu("why")}
              >
                <button className="tmh-menu-trigger" type="button">
                  <RichInline value={whyMenuText} wordStyle={props} />
                  <CaretIcon />
                </button>
                <div
                  className="tmh-mega tmh-flow-mega"
                  hidden={activeMenu !== "why"}
                  style={whyMenuLeft == null ? undefined : ({ "--tmh-flow-mega-left": `${whyMenuLeft}px`, "--tmh-flow-translate-x": "0px" } as any)}
                >
                  <div className="tmh-flow-grid">
                    {whyItems.map((item, index) => (
                      <FlowLink
                        item={item}
                        wordStyle={props}
                        key={index}
                        onToast={showToast}
                        onCloseMenu={() => setActiveMenu(null)}
                      />
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
                <div
                  className={`tmh-action-panel tmh-profile-panel${activeAction === "profile" ? " is-open" : ""}`}
                  hidden={activeAction !== "profile"}
                >
                  <span className="tmh-action-panel-kicker">3Mash</span>
                  <b dangerouslySetInnerHTML={richText(accountMenuTitle, props)} />
                  <p dangerouslySetInnerHTML={richText(richTextValue(props.profileMenuDescription, "Sipariş, destek ve hesap işlemlerinize hızlıca ulaşın."), props)} />
                  <div className="tmh-panel-links">
                    {profileLinks.map((item, idx) => (
                      <a href={href(item.link)} dangerouslySetInnerHTML={richText(item.label, props)} key={idx} />
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
                  {cartItemCount > 0 ? (
                    <span className="tmh-cart-badge">{cartItemCount}</span>
                  ) : null}
                </button>
                <div
                  className={`tmh-action-panel tmh-store-panel${activeAction === "store" ? " is-open" : ""}`}
                  hidden={activeAction !== "store"}
                >
                  <span className="tmh-action-panel-kicker">{text(props.cartAriaLabel, "SEPETİM")}</span>
                  {cartItems.length > 0 ? (
                    <div className="tmh-cart-live">
                      <div className="tmh-cart-count">{cartItemCount} ürün sepetinizde</div>
                      <div className="tmh-cart-live-list">
                        {visibleCartItems.map((item) => {
                          const imageCandidates = Array.from(
                            new Set([
                              cartImageUrl(item),
                              ...orderLineImageUrlCandidates(item, 180),
                            ].filter(Boolean))
                          ) as string[];
                          const image = imageCandidates[0];
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
                        href="/search"
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
            <svg className="tmh-hamburger-svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" focusable="false">
              <line x1="3" y1="7" x2="21" y2="7" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="17" x2="21" y2="17" />
            </svg>
          </button>
        </div>
        <div
          className={`tmh-mobile-panel${isMobileMenuOpen ? " is-open" : ""}`}
          hidden={!isMobileMenuOpen}
        >
          <nav className="tmh-mobile-list" aria-label={mobileMenuLabel}>
            <a href={mobileSearchHref} dangerouslySetInnerHTML={richText(productsMenuText, props)} />
            <a href={href(productPrimary[0]?.href)} dangerouslySetInnerHTML={richText(productPrimary[0]?.title, props)} />
            <a href={href(productPrimary[1]?.href)} dangerouslySetInnerHTML={richText(productPrimary[1]?.title, props)} />
            <a href={href(productPrimary[2]?.href)} dangerouslySetInnerHTML={richText(productPrimary[2]?.title, props)} />
            <a href={href(productSecondary[0]?.href)} dangerouslySetInnerHTML={richText(productSecondary[0]?.title, props)} />
            <a href={href(productSecondary[1]?.href)} dangerouslySetInnerHTML={richText(productSecondary[1]?.title, props)} />
            <a href={href(productSecondary[2]?.href)} dangerouslySetInnerHTML={richText(productSecondary[2]?.title, props)} />
            <a href={href(productSecondary[3]?.href)} dangerouslySetInnerHTML={richText(productSecondary[3]?.title, props)} />
            <a href={academyPageTarget(props.academyHref)} dangerouslySetInnerHTML={richText(academyText, props)} />
            <a href={headerRouteHref(props.accountHref, "/account/login")} dangerouslySetInnerHTML={richText(accountMenuTitle, props)} />
          </nav>
        </div>
      </header>
      <div className="tmh-header-spacer" />
      {toastMessage && (
        <div className="tmh-toast-notification" role="status" aria-live="polite">
          <span className="tmh-toast-dot" />
          <span>{toastMessage}</span>
        </div>
      )}
    </section>
  );
}

export default ThreeMashHeaderV2;
