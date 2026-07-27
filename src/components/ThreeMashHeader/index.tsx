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
  searchProductList as updateProductSearchList,
  waitForCartStoreInit,
  type IkasCart,
  type IkasOrderLineItem,
  type IkasProduct,
  type IkasProductVariant,
} from "@ikas/bp-storefront";
import { ecoBlocksIcon, ecoCuringIcon, ecoOvenIcon, ecoPrinterIcon, ecoResinIcon, ecoScannerIcon } from "../../assets/eco-icons-data";
import mashC4pFeatureImage from "../../assets/mash-c4p-feature-data";
import threeMashLogoImage from "../../assets/three-mash-logo-data";
import { orderLineImageUrl, orderLineImageUrlCandidates } from "../ThreeMashOrderLineImage";
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
type ActiveAction = "profile" | "store" | null;

type SearchSuggestion = {
  product: IkasProduct;
  score: number;
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
const academyPageHref = "/pages/mash-academy";
const defaultReferencesHomeHref = "/";
const defaultReferencesSectionId = "guven";
const pendingReferencesScrollKey = "tmh-pending-references-scroll";
const legacyAcademyRouteKeys = new Set(["academy", "mash-academy", "pages-mash-academy", "2tplvqpo-rovtvwz53h"]);

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
  return internal || fallback;
}

function searchPageHref(value?: string) {
  return headerRouteHref(value, "/search");
}

function storePageHref(value?: string, fallback?: string) {
  return headerRouteHref(value || fallback, "/cart");
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
    if (url.hostname === "3mash.com" || url.hostname === "www.3mash.com") {
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
  "tum-urunler": "/tum-urunler",
  "urunler": "/tum-urunler",
  "products": "/tum-urunler",
  "collections-all": "/tum-urunler",
};

function productRouteHref(value: string | undefined, fallback: string) {
  const trimmed = value?.trim();
  if (!trimmed || trimmed === "#") return fallback;
  const normalized = routeAliasKey(trimmed);
  const slug = routeTextKey(normalized);
  const nestedSlug = slug.replace(/^urunler-/, "");
  return productCategoryRoutes[slug] || productCategoryRoutes[nestedSlug] || internalSiteHref(trimmed);
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

  const stored = savePendingReferencesScroll(targetId);
  window.location.href = stored ? homeTarget : `${homeTarget}${hash}`;
}

function searchCategoryHref(searchHref: string | undefined, firstCategoryHref: string | undefined) {
  const configuredSearchHref = searchHref?.trim();
  const configuredFirstCategoryHref = firstCategoryHref?.trim();
  return productRouteHref(configuredSearchHref && configuredSearchHref !== "#" ? configuredSearchHref : configuredFirstCategoryHref, "/3d-yazicilar");
}

function c4pRouteHref(value: string | undefined) {
  const trimmed = value?.trim();
  if (!trimmed) return "/yikama-kurleme-cihazlari";
  const normalized = trimmed
    .toLowerCase()
    .replace(/^https?:\/\/(?:www\.)?3mash\.com/i, "")
    .replace(/\/$/, "");
  if (normalized === "/mash" || normalized === "/urunler/c4p") return "/yikama-kurleme-cihazlari";
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

  let queryIndex = 0;
  for (let index = 0; index < candidate.length && queryIndex < query.length; index += 1) {
    if (candidate[index] === query[queryIndex]) queryIndex += 1;
  }
  return queryIndex === query.length ? 70 + candidate.length : Number.POSITIVE_INFINITY;
}

function searchSuggestions(products: IkasProduct[], query: string): SearchSuggestion[] {
  const normalizedQuery = searchKey(query);
  if (!normalizedQuery) return [];

  return products
    .map((product) => ({ product, score: fuzzyScore(productSearchText(product), normalizedQuery) }))
    .filter((item) => Number.isFinite(item.score))
    .sort((a, b) => a.score - b.score || a.product.name.length - b.product.name.length)
    .slice(0, 5);
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
    <a href={href(item.href)} className={`tmh-mega-link${hasIcon ? "" : " tmh-mega-link-no-icon"}`}>
      <InlineIcon image={item.iconImageUrl} svg={item.iconSvg} className="tmh-product-icon" />
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
  const { logoText, logoHref, logoImageUrl, logoImageAlt, logoSvg } = props;
  const logoSvgMarkup = svgMarkup(logoSvg);

  return (
    <a className="tmh-logo" href={headerRouteHref(logoHref, "/")} aria-label={logoText}>
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

export function ThreeMashHeader(props: Props) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>(null);
  const [activeAction, setActiveAction] = useState<ActiveAction>(null);
  const [cart, setCart] = useState<IkasCart | null>(cartStore.cart);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(customerStore.customer));
  const [whyMenuLeft, setWhyMenuLeft] = useState<number | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const committedSuggestionSearchRef = useRef("");
  const headerRef = useRef<HTMLElement>(null);
  const whyMenuRef = useRef<HTMLLIElement>(null);
  const showProductIcons = props.showProductIcons !== false;
  const showActionIcons = props.showActionIcons !== false;
  const searchIcon = resolveActionIcon(props.searchIconImageUrl, props.searchIconSvg, defaultSearchSvg, showActionIcons);
  const accountIcon = resolveActionIcon(props.accountIconImageUrl, props.accountIconSvg, defaultAccountSvg, showActionIcons);
  const cartIcon = resolveActionIcon(props.cartIconImageUrl, props.cartIconSvg, defaultCartSvg, showActionIcons);
  const searchTargetHref = href(searchCategoryHref(props.searchHref, props.product1Href));
  const referencesTargetHref = referencesSectionTarget(props.referencesHomeHref, props.referencesSectionId);
  const searchSuggestionItems = searchSuggestions(props.searchProductList?.data || [], searchQuery);
  const hasSearchSuggestions = isSearchOpen && searchQuery.trim().length > 0 && searchSuggestionItems.length > 0;
  const cartItems = isLoggedIn ? cart?.orderLineItems?.filter((item) => !item.deleted) || [] : [];
  const cartItemCount = cartItems.reduce((total, item) => total + Number(item.quantity || 0), 0);
  const visibleCartItems = cartItems.slice(0, 4);
  const productPrimary: MenuItem[] = [
    { title: props.product1Title, description: props.product1Description, href: productRouteHref(props.product1Href, "/3d-yazicilar"), ...resolveProductIcon(props.product1IconImageUrl, props.product1IconSvg, ecoPrinterIcon, ["printer", "M6 9V3h12v6"], showProductIcons) },
    { title: props.product2Title, description: props.product2Description, href: productRouteHref(props.product2Href, "/yikama-kurleme-cihazlari"), ...resolveProductIcon(props.product2IconImageUrl, props.product2IconSvg, ecoScannerIcon, ["washer", "circle cx=\"12\" cy=\"14\"", "M7 7h10"], showProductIcons) },
    { title: props.product3Title, description: props.product3Description, href: productRouteHref(props.product3Href, "/dental-3d-yazici-recineleri"), ...resolveProductIcon(props.product3IconImageUrl, props.product3IconSvg, ecoResinIcon, ["flask-conical", "M10 2v7.5"], showProductIcons) },
  ];

  const productSecondary: MenuItem[] = [
    { title: props.product4Title, description: props.product4Description, href: productRouteHref(props.product4Href, "/masasustu-tarayicilar"), ...resolveProductIcon(props.product4IconImageUrl, props.product4IconSvg, ecoCuringIcon, ["scan-line", "M3 7V5a2 2"], showProductIcons) },
    { title: props.product5Title, description: props.product5Description, href: productRouteHref(props.product5Href, "/zirkon-bloklar"), ...resolveProductIcon(props.product5IconImageUrl, props.product5IconSvg, ecoBlocksIcon, ["class=\"box\"", "M12 2 3 7l9 5"], showProductIcons) },
    { title: props.product6Title, description: props.product6Description, href: productRouteHref(props.product6Href, "/dental-firinlar"), ...resolveProductIcon(props.product6IconImageUrl, props.product6IconSvg, ecoOvenIcon, ["flame", "a3.5 3.5"], showProductIcons) },
  ];

  const whyItems: FlowItem[] = [
    { number: text(props.why1Number, "01"), title: text(props.why1Title, "Yılda $126K'ya varan görünmez kayıp"), description: text(props.why1Description, "Tekrarlanan işlerin kliniğinize gerçek maliyeti"), href: text(props.why1Href, "#sorun") },
    { number: text(props.why2Number, "02"), title: text(props.why2Title, "Sebep: ölçüsel hassasiyet"), description: text(props.why2Description, "250–500µm sapma bandı vs ±20µm güvenli bölge"), href: text(props.why2Href, "#sebep") },
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
    "--tmh-bg": themeToken(props.backgroundColor, "#FAFAF7", "--tm-theme-bg"),
    "--tmh-ann-bg": themeToken(props.announcementBackgroundColor, "#0E0E0C", "--tm-theme-announcement-bg"),
    "--tmh-ann-text": themeToken(props.announcementTextColor, "#CFCFC6", "--tm-theme-announcement-text"),
    "--tmh-word-color": themeToken(props.styledPhraseColor, "#C7F136", "--tm-theme-accent"),
    "--tmh-word-weight": props.styledPhraseBold ? "800" : "inherit",
    "--tmh-word-style": props.styledPhraseItalic ? "italic" : "inherit",
    "--tmh-ann-word-color": themeToken(props.announcementStyledPhraseColor, "#C7F136", "--tm-theme-accent"),
    "--tmh-ann-word-weight": props.announcementStyledPhraseBold ? "800" : "inherit",
    "--tmh-ann-word-style": props.announcementStyledPhraseItalic ? "italic" : "inherit",
    "--tmh-accent": themeToken(props.accentColor, "#C7F136", "--tm-theme-accent"),
    "--tmh-accent-text": "var(--tm-theme-accent-text, #3D4D0E)",
    "--tmh-text": themeToken(props.textColor, "#0E0E0C", "--tm-theme-text"),
    "--tmh-muted": themeToken(props.mutedTextColor, "#8F8F86", "--tm-theme-muted"),
    "--tmh-line": themeToken(props.lineColor, "#E6E6E0", "--tm-theme-line"),
    "--tmh-panel": themeToken(props.panelColor, "#FFFFFF", "--tm-theme-panel"),
    "--tmh-badge": themeToken(props.badgeColor, "#E2492F", "--tm-theme-danger"),
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

  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus();
    }
  }, [isSearchOpen]);

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
      setCart(cartStore.cart);
    };

    Promise.all([initCustomerStore(customerStore), waitForCartStoreInit(cartStore)])
      .then(() => getCart())
      .finally(refreshCartState);

    window.addEventListener("focus", refreshCartState);
    window.addEventListener("ikas:open-cart-sidebar", refreshCartState as EventListener);

    return () => {
      mounted = false;
      window.removeEventListener("focus", refreshCartState);
      window.removeEventListener("ikas:open-cart-sidebar", refreshCartState as EventListener);
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

  function toggleAction(action: ActiveAction) {
    setActiveMenu(null);
    setIsSearchOpen(false);
    setActiveAction((current) => (current === action ? null : action));
  }

  function submitSearch(event: Event) {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    const target = searchPageHref(props.searchHref);
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
            <b dangerouslySetInnerHTML={announcementRichText(props.announcementHighlightText, props)} />
            <span dangerouslySetInnerHTML={announcementRichText(props.announcementText, props)} />
            <a href={href(props.announcementHref)} dangerouslySetInnerHTML={announcementRichText(props.announcementCtaText, props)} />
          </div>
        </div>
      )}

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
                <button className="tmh-menu-trigger" type="button">
                  <RichInline value={props.productsMenuText} wordStyle={props} />
                  <CaretIcon />
                </button>
                <div className="tmh-mega tmh-products-mega">
                  <a className="tmh-feature" href={href(c4pRouteHref(props.productsFeatureHref))}>
                    <span className="tmh-micro" dangerouslySetInnerHTML={richText(props.productsFeatureEyebrow, props)} />
                    <b dangerouslySetInnerHTML={richText(props.productsFeatureTitle, props)} />
                    <span className="tmh-feature-media">
                      <img src={imageSource(props.productsFeatureImageUrl, mashC4pFeatureImage)} alt={props.productsFeatureImageAlt || ""} />
                    </span>
                    <span dangerouslySetInnerHTML={richText(props.productsFeatureDescription, props)} />
                    <em dangerouslySetInnerHTML={richText(props.productsFeatureCtaText, props)} />
                  </a>
                  <div className="tmh-mega-column">
                    <span className="tmh-micro" dangerouslySetInnerHTML={richText(props.productsCol1Title, props)} />
                    {productPrimary.map((item, index) => (
                      <ProductLink item={item} wordStyle={props} key={index} />
                    ))}
                  </div>
                  <div className="tmh-mega-column">
                    <span className="tmh-micro" dangerouslySetInnerHTML={richText(props.productsCol2Title, props)} />
                    {productSecondary.map((item, index) => (
                      <ProductLink item={item} wordStyle={props} key={index} />
                    ))}
                  </div>
                  <a className="tmh-products-all-link" href={href(productRouteHref(props.allProductsHref, "/tum-urunler"))}>
                    {props.allProductsText || "Tümü"}
                  </a>
                </div>
              </li>

              <li
                ref={whyMenuRef}
                className={activeMenu === "why" ? "is-open" : ""}
                onMouseEnter={() => openMenu("why")}
                onFocusIn={() => openMenu("why")}
              >
                <button className="tmh-menu-trigger" type="button">
                  <RichInline value={props.whyMenuText} wordStyle={props} />
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
                  <RichInline value={props.referencesText} wordStyle={props} />
                </a>
              </li>
              <li>
                <a className="tmh-plain-link" href={academyPageTarget(props.academyHref)} onMouseEnter={() => { setActiveMenu(null); setActiveAction(null); }}>
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
              <a
                className="tmh-icon-button"
                href={searchTargetHref}
                aria-label={props.searchAriaLabel || ""}
                onClick={() => {
                  setActiveMenu(null);
                  setActiveAction(null);
                  setIsSearchOpen(false);
                }}
              >
                <InlineIcon image={searchIcon.image} svg={searchIcon.svg} className="tmh-action-svg" />
              </a>
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
                            <a className="tmh-cart-live-item" href={cartProductHref(item)} key={item.id}>
                              <span className="tmh-cart-live-image">
                                <span>{cartItemTitle(item).slice(0, 1)}</span>
                                {image ? <img src={image} alt={cartItemTitle(item)} loading="lazy" decoding="async" data-image-index="0" onError={(event) => handleOrderLineImageError(event, imageCandidates)} /> : null}
                              </span>
                              <span className="tmh-cart-live-copy">
                                <b>{cartItemTitle(item)}</b>
                                {variant ? <small>{variant}</small> : null}
                                <em>Adet {item.quantity}</em>
                              </span>
                              <strong>{getOrderLineItemFormattedFinalPriceWithQuantity(item)}</strong>
                            </a>
                          );
                        })}
                      </div>
                      <a className="tmh-cart-market-button tmh-cart-go-button" href="/cart">Sepete git</a>
                    </div>
                  ) : (
                    <div className="tmh-cart-empty-card">
                      <a
                        className="tmh-cart-market-button"
                        href={storePageHref(props.storePanelButtonHref, props.cartHref)}
                        dangerouslySetInnerHTML={richText(richTextValue(props.storePanelButtonText, "Markete git"), props)}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <details className="tmh-mobile-menu">
            <summary dangerouslySetInnerHTML={richText(props.mobileMenuLabel, props)} />
            <div className="tmh-mobile-panel">
              <div className="tmh-mobile-group">
                <span className="tmh-mobile-heading" dangerouslySetInnerHTML={richText(props.productsMenuText, props)} />
                {productPrimary.concat(productSecondary).map((item, index) => (
                  <a href={href(item.href)} className="tmh-mobile-product" key={index}>
                      <InlineIcon image={item.iconImageUrl} svg={item.iconSvg} className="tmh-mobile-link-icon" />
                      <span>
                        <b dangerouslySetInnerHTML={richText(item.title, props)} />
                      <small dangerouslySetInnerHTML={richText(item.description, props)} />
                      </span>
                    </a>
                  ))}
              </div>
              <div className="tmh-mobile-group">
                <span className="tmh-mobile-heading" dangerouslySetInnerHTML={richText(props.whyMenuText, props)} />
                {whyItems.map((item, index) => (
                  <a href={href(item.href)} className="tmh-mobile-flow" key={index}>
                    <span className="tmh-mobile-flow-number" dangerouslySetInnerHTML={richText(item.number, props)} />
                    <span>
                      <b dangerouslySetInnerHTML={richText(item.title, props)} />
                      <small dangerouslySetInnerHTML={richText(item.description, props)} />
                    </span>
                  </a>
                ))}
              </div>
              <div className="tmh-mobile-group tmh-mobile-group-inline">
                <a
                  href={referencesTargetHref}
                  onClick={(event) => handleReferencesClick(event, props.referencesHomeHref, props.referencesSectionId)}
                  dangerouslySetInnerHTML={richText(props.referencesText, props)}
                />
                <a href={academyPageTarget(props.academyHref)} dangerouslySetInnerHTML={richText(props.academyText, props)} />
              </div>
            </div>
          </details>
        </div>
      </header>

    </section>
  );
}

export default ThreeMashHeader;
