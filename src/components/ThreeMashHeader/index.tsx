import { useEffect, useLayoutEffect, useRef, useState } from "preact/hooks";
import {
  apiSearchProducts,
  cartStore,
  createMediaSrcset,
  customerStore,
  initCustomerStore,
  getDefaultSrc,
  getOrderLineItemFormattedFinalPriceWithQuantity,
  getProductHref,
  getProductListInitialData,
  getProductVariantMainImage,
  getSelectedProductVariant,
  IkasStorefrontConfig,
  initProductList,
  removeItem,

  type IkasCart,
  type IkasOrderLineItem,
  type IkasProduct,
  type IkasProductList,
  type IkasProductVariant,
} from "@ikas/bp-storefront";
import { hydrateMissingOrderLineImageFallbacks, orderLineImageUrl, orderLineImageUrlCandidates } from "../ThreeMashOrderLineImage";
import { ecoBlocksIcon, ecoCuringIcon, ecoOvenIcon, ecoPrinterIcon, ecoResinIcon, ecoScannerIcon } from "../../assets/eco-icons-data";
import threeMashHeaderLogoImage from "../../assets/three-mash-header-logo-final-data";
import { categoryLandingDataFromKey } from "../../sub-components/ThreeMashCategoryLanding/presets";
import { tLocalized, tProp, isEnglishLocale, translateText, localizedHref, setPreferredLocale, resolveLocalizedUrl, EN_TO_TR_ROUTE_MAP } from "../../utils/i18n";
import { sanitizeHtml, sanitizeSvgMarkup } from "../../utils/sanitizeHtml";
import { debugError } from "../../utils/debugError";
 
import { safeDecodeURI } from "../../utils/safeDecodeURI";
import { safeNavigationHref, safeRedirect } from "../../utils/safeRedirect";
import {
  performLogout,
  isCustomerAuthenticated,
  subscribeAuthState,
  hasCustomerToken,
  type CustomerAuthState,
} from "../../utils/auth";
import {
  ACF_FEP_FILM_SLUG,
  ARGENZ_HT_MULTILAYER_SLUG,
  ARGENZ_HT_PLUS_SLUG,
  ARGENZ_ST_MULTILAYER_SLUG,
  CREALITY_HALOT_SKY_6K_SLUG,
  CREALITY_HALOT_SKY_LCD_KIT_SLUG,
  CREALITY_WASH_CURE_UW03_SLUG,
  CRS_ALIGNER_SLUG,
  CRS_CAST_SLUG,
  CRS_COMPOSITE_SLUG,
  CRS_DENTURE_SLUG,
  CRS_FLEXIT_SLUG,
  CRS_GINGIVA_SLUG,
  CRS_GUIDE_SLUG,
  CRS_IBT_SLUG,
  CRS_MODEL_SLUG,
  CRS_SPLINT_HARD_SLUG,
  CRS_SPLINT_SOFT_SLUG,
  CRS_TRAY_SLUG,
  labProductDetailDataBySlug,
  MASH_C1E_UV_CURING_SLUG,
  MASH_CLEAR_SLUG,
  MASH_CURIE_M1_DENTAL_SLUG,
  MASH_CURIE_M1_JEWELRY_SLUG,
  MASH_P16L_LARGE_BUILD_PLATE_SLUG,
  MASH_P16L_LCD_SCREEN_SLUG,
  MASH_P16L_MAINBOARD_SLUG,
  MASH_P16L_PRINTER_SLUG,
  MASH_P16L_RESIN_TANK_SLUG,
  MASH_P16L_SMALL_BUILD_PLATE_SLUG,
  MASH_STUDY_SLUG,
  MASH_TRIAL_PINK_SLUG,
  MASH_TRIAL_WHITE_SLUG,
  MASH_W1E_ULTRASONIC_WASH_SLUG,
  MESA_GRADE_5_ELI_TITANIUM_DISK_SLUG,
  NABERTHEM_LHT_01_16_TURBO_FIRE_SLUG,
  NABERTHEM_LHT_02_17_LB_SPEED_SLUG,
  NABERTHEM_VL_01_12_LB_PORCELAIN_SLUG,
  NABERTHEM_VL_01_12_LB_PRESS_SLUG,
  PIOCREAT_C01_LCD_KIT_SLUG,
  printerSparePartDetailDataBySlug,
  resolveProductDetailData,
  THREESHAPE_E2_SLUG,
  THREESHAPE_E3_SLUG,
  THREESHAPE_E4_SLUG,
  TRASFORMER_COMP_FLOW_SLUG,
  TRASFORMER_LIGHT_GLASS_SLUG,
  zirconBlockDetailDataBySlug,
} from "../../sub-components/ThreeMashProductDetailData";
import { Props } from "./types";
import {
  getCurrentCart,
  getCartStatus,
  initGlobalCart,
  publishCartFromIkasStore,
  refreshGlobalCart,
  subscribeCart,
} from "../cartState";

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



function productListPropValue(source: unknown): IkasProductList["productListPropValue"] | null {
  if (!source || typeof source !== "object") return null;
  const item = source as {
    productListPropValue?: IkasProductList["productListPropValue"];
    productListType?: IkasProductList["productListPropValue"]["productListType"];
  };
  if (item.productListPropValue) return item.productListPropValue;
  if (item.productListType) return item as IkasProductList["productListPropValue"];
  return null;
}

function normalizeSearchProductList(source: IkasProductList | undefined): IkasProductList | undefined {
  if (!source) {
    return initProductList({
      type: "ALL",
      sort: "DEFAULT",
      limit: 12,
      pageType: "CUSTOM",
      productListPropValue: {
        id: "",
        productListType: "ALL",
        initialSort: "DEFAULT",
        initialLimit: 12,
        productCount: null,
        productIds: [],
        usePageFilter: false,
        category: null,
        brand: null,
        relatedProductsType: null,
      },
    });
  }

  const list = source as IkasProductList;
  if (Array.isArray(list.data) && list.productListPropValue) return list;

  const propValue = productListPropValue(source);
  if (!propValue) return list;

  return initProductList({
    type: propValue.productListType || "ALL",
    sort: propValue.initialSort || "DEFAULT",
    limit: Math.max(propValue.initialLimit || propValue.productCount || 12, 12),
    pageType: propValue.brand ? "BRAND" : propValue.category ? "CATEGORY" : "CUSTOM",
    filterBrandId: propValue.brand || undefined,
    filterCategoryId: propValue.category || undefined,
    productListPropValue: {
      ...propValue,
      productIds: propValue.productIds || [],
    },
  });
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
  return slug ? localizedHref(`/${slug.replace(/^\/+/, "")}`) : "#";
}

function cartItemTitle(item: IkasOrderLineItem) {
  return item.variant?.name || tLocalized("Ürün", "Product");
}

function cartItemVariantText(item: IkasOrderLineItem) {
  return item.variant?.variantValues?.map((value) => value.variantValueName).filter(Boolean).join(" / ") || item.variant?.sku || "";
}

const defaultSearchSvg = `<svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="2"/><path d="m16 16 4.2 4.2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
const defaultAccountSvg = `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
const defaultCartSvg = `<svg viewBox="0 0 24 24" fill="none"><path d="M6.2 7.5h14l-1.4 8.2a2 2 0 0 1-2 1.7H9.1a2 2 0 0 1-2-1.6L5.5 4.5H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9.5" cy="20" r="1.4" fill="currentColor"/><circle cx="17" cy="20" r="1.4" fill="currentColor"/></svg>`;
const defaultOrdersSvg = `<svg viewBox="0 0 24 24" fill="none"><path d="m4 7 8-4 8 4v10l-8 4-8-4V7Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="m4.5 7.5 7.5 4 7.5-4M12 11.5V21" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`;
const defaultAddressesSvg = `<svg viewBox="0 0 24 24" fill="none"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="10" r="2.5" stroke="currentColor" stroke-width="1.8"/></svg>`;
const defaultAcademySvg = `<svg viewBox="0 0 24 24" fill="none"><path d="m3 9 9-4 9 4-9 4-9-4Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M7 11.2V15c2.8 2.2 7.2 2.2 10 0v-3.8M21 10v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const defaultLogoutSvg = `<svg viewBox="0 0 24 24" fill="none"><path d="M14 5V4a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M10 12h11m0 0-4-4m4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const academyPageHref = "/pages/mash-academy";
const defaultReferencesHomeHref = "/";
const defaultReferencesSectionId = "guven";
const pendingReferencesScrollKey = "tmh-pending-references-scroll";
const legacyAcademyRouteKeys = new Set(["academy", "mash-academy", "pages-mash-academy", "2tplvqpo-rovtvwz53h"]);
/**
 * Nav text functions — computed at render time to reflect language changes.
 */
function getDefaultProductsMenuText() {
  return tLocalized("Ürünler", "Products");
}
function getDefaultWhyMenuText() {
  return tLocalized("Neden 3mash?", "Why 3mash?");
}
function getDefaultReferencesText() {
  return tLocalized("Referanslar", "References");
}
function getDefaultAcademyText() {
  return "Academy";
}
function getDefaultMobileMenuLabel() {
  return tLocalized("Menü", "Menu");
}

// Critical header styles live with the markup so route changes cannot briefly
// paint the header in its unstyled/default browser state before the component
// stylesheet is applied. Keep this intentionally small and structural only.
const criticalHeaderCss = `
/*
 * First-paint header structure (CLS safeguard).
 * Full component aesthetics, dropdowns, and animations reside in styles.css.
 */
.three-mash-header {
  --tmh-announcement-fixed-height: 37px;
  --tmh-nav-fixed-height: 70px;
  width: 100%;
  margin: 0;
  padding: 0;
  background: var(--tmh-bg);
  color: var(--tmh-text);
  font-family: var(--tm-theme-font-body, "Inter", sans-serif);
}
.three-mash-header, .three-mash-header * { box-sizing: border-box; }
.three-mash-header [hidden] { display: none !important; }
.three-mash-header .tmh-announcement {
  width: 100%;
  min-height: var(--tmh-announcement-fixed-height);
  overflow: visible;
  position: relative;
  background: var(--tmh-ann-bg);
  color: var(--tmh-ann-text);
  font-size: 13px;
  line-height: 1.45;
  z-index: 101;
}
 
.three-mash-header .tmh-announcement-inner {
  position: relative;
  width: min(100%, 1240px);
  min-height: 100%;
  margin: 0 auto;
  padding: 6px 90px 6px 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  text-align: center;
  flex-wrap: wrap;
}
.three-mash-header .tmh-announcement b { color: var(--tmh-accent); font-weight: 600; }
.three-mash-header .tmh-announcement a { color: #fff; text-decoration: underline; font-weight: 600; }
.three-mash-header .tmh-header {
  position: sticky !important;
  top: 0;
  width: 100%;
  z-index: 100;
}
.three-mash-header .tmh-nav {
  height: var(--tmh-nav-fixed-height);
  min-height: var(--tmh-nav-fixed-height);
}
@media (max-width: 900px) {
  .three-mash-header {
    --tmh-announcement-fixed-height: 76px;
  }
}
  .three-mash-header .tmh-wrap {
  width: min(100%, 1240px);
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  align-items: center;
}
.three-mash-header .tmh-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 38px;
  overflow: visible;
}
.three-mash-header .tmh-logo {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}
.three-mash-header .tmh-logo-image-wrap {
  display: flex;
  align-items: center;
}
.three-mash-header .tmh-desktop-nav {
  display: flex;
  align-items: center;
  flex: 1;
}
.three-mash-header .tmh-menu {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 6px;
}
.three-mash-header .tmh-menu-trigger,
.three-mash-header .tmh-plain-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0 13px;
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  font-family: var(--tm-theme-font-body, "Inter", sans-serif);
  font-size: 14.5px;
  font-weight: 500;
  text-decoration: none;
}
.three-mash-header .tmh-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}
.three-mash-header .tmh-inline-search {
  display: flex;
  align-items: center;
}
.three-mash-header .tmh-action-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
}
.three-mash-header .tmh-icon-button,
.three-mash-header .tmh-action-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: inherit;
}
.three-mash-header .tmh-mobile-menu {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: inherit;
}
.three-mash-header .tmh-header-spacer {
  width: 100%;
}
@media (max-width: 1000px) {
  .three-mash-header .tmh-desktop-nav { display: none; }
  .three-mash-header .tmh-mobile-menu { display: block; margin-left: auto; }
  .three-mash-header .tmh-actions { display: none; }
}
@media (max-width: 620px) {
  .three-mash-header {
    --tmh-announcement-fixed-height: 76px;
    --tmh-nav-fixed-height: 66px;
  }
}
`;

/**
 * Computes default announcement dynamically so it reflects language changes on client-side.
 * At SSR, first paint script sets correct lang; at client render, this function gets fresh locale value.
 */
function getDefaultAnnouncement() {
  return {
    highlightText: tLocalized("⚡ Fırsatı kaçırmayın.", "⚡ Don't miss out."),
    text: tLocalized(
      "Kliniğinizin sessiz kaybını 30 saniyede hesaplayın; ücretsiz analizle nasıl azaltabileceğinizi birlikte görelim.",
      "Calculate your clinic's silent loss in 30 seconds; see how to reduce it with free analysis."
    ),
    ctaText: tLocalized("Hemen hesaplayın", "Calculate now"),
    href: "#hesap",
  };
}

function announcementOverridePayload(value: unknown): HeaderAnnouncementOverride | null {
  if (!value || typeof value !== "object") return null;
  const data = value as HeaderAnnouncementOverride;
  if (data.enabled === false) return null;
  if (!data.highlightText && !data.text && !data.ctaText) return null;
  return data;
}

function safeLocationPathname() {
  if (typeof window !== "undefined") return window.location.pathname;

  try {
    const currentPath = IkasStorefrontConfig.getCurrentPath?.();
    return typeof currentPath === "string" ? currentPath : "";
  } catch {
    return "";
  }
}

function currentProductAnnouncement() {
  const browserAnnouncement = typeof window !== "undefined"
    ? announcementOverridePayload((window as unknown as { __THREE_MASH_PRODUCT_ANNOUNCEMENT__?: unknown }).__THREE_MASH_PRODUCT_ANNOUNCEMENT__)
    : null;
  const routeAnnouncement = routeAnnouncementOverride();
  return (
    routeAnnouncement ||
    browserAnnouncement
  );
}

function currentRouteKey() {
  const pathname = safeLocationPathname();
  return pathname
    .toLocaleLowerCase("tr")
    .replace(/^\/+|\/+$/g, "")
    .split("/")
    .pop() || "";
}

function productAnnouncementFromData(data: ReturnType<typeof resolveProductDetailData>): HeaderAnnouncementOverride | null {
  const productAnnouncement = data?.announcement;
  if (!productAnnouncement || productAnnouncement.enabled === false) return null;
  return {
    enabled: true,
    highlightText: productAnnouncement.strongText,
    text: productAnnouncement.longText || "",
    ctaText: productAnnouncement.ctaText,
    href: productAnnouncement.ctaHref,
  };
}

function announcementForRouteKey(routeKey: string): HeaderAnnouncementOverride | null {
  if (!routeKey) return null;
  const enMapped = EN_TO_TR_ROUTE_MAP[`/${routeKey}`] || EN_TO_TR_ROUTE_MAP[routeKey];
  const trRouteKey = enMapped ? enMapped.replace(/^\/+/, "") : routeKey;
  const resolvedRouteKey = englishProductRouteAliases[routeKey] || trRouteKey;

  const productAnnouncement = productAnnouncementFromData(resolveProductDetailData({ slug: resolvedRouteKey }));
  if (productAnnouncement) return productAnnouncement;

  const categoryData = categoryLandingDataFromKey(resolvedRouteKey);
  if (categoryData) {
    return {
      enabled: true,
      highlightText: categoryData.announcement.highlight,
      text: categoryData.announcement.text,
      ctaText: categoryData.announcement.ctaText,
      href: categoryData.announcement.href,
    };
  }

  return null;
}

const englishProductRouteAliases: Record<string, string> = {
  "mash-p16l-385nm-16k-dental-3d-printer": "mash-p16l-385nm-16k-dental-3d-yazici",
  "mash-curie-m1-dental-3d-printer": "mash-curie-m1-dental-3d-yazici",
  "mash-curie-m1-dental-dlp-3d-printer": "mash-curie-m1-dental-3d-yazici",
  "creality-halot-sky-6k-dental-3d-printer": "creality-halot-sky-6k",
  "mash-w1e-ultrasonic-washing-unit": "mash-w1e-ultrasonik-yikama-cihazi",
  "mash-c1e-smart-uv-curing-unit": "mash-c1e-uv-kurleme-cihazi",
  "creality-wash-and-cure-uw-02": "creality-washcure-uw-02",
  "argenz-ht-plus-zirconia-disc": "argenz-ht-plus-zirkon-blok",
  "argenz-st-multilayer-zirconia-disc": "argenz-st-multilayer-zirkon-blok",
  "argenz-ht-plus-multilayer-zirconia-disc": "argenz-ht-multilayer-zirkon-blok",
};

function englishLocalePath(pathname: string, search: string, hash: string): string {
  return resolveLocalizedUrl("en", { pathname, search, hash });
}

function routeAnnouncementOverride(): HeaderAnnouncementOverride | null {
  return announcementForRouteKey(currentRouteKey());
}

const firstPaintCategoryRouteKeys = [
  "3d-yazicilar",
  "dental-3d-yazici-recineleri",
  tLocalized("yikama-kurleme-cihazlari", "yikama-kurleme-cihazlari"),
  "masasustu-tarayicilar",
  "zirkon-bloklar",
  "dental-firinlar",
  "3d-yazici-yedek-parcalari",
  "sistemler",
  "titanyum-diskler",
];

const firstPaintProductRouteKeys = [
  CRS_COMPOSITE_SLUG,
  CRS_SPLINT_HARD_SLUG,
  CRS_SPLINT_SOFT_SLUG,
  CRS_GUIDE_SLUG,
  CRS_IBT_SLUG,
  CRS_FLEXIT_SLUG,
  CRS_ALIGNER_SLUG,
  CRS_DENTURE_SLUG,
  CRS_GINGIVA_SLUG,
  CRS_MODEL_SLUG,
  CRS_TRAY_SLUG,
  MASH_CLEAR_SLUG,
  CRS_CAST_SLUG,
  MASH_STUDY_SLUG,
  MASH_TRIAL_PINK_SLUG,
  MASH_TRIAL_WHITE_SLUG,
  CREALITY_HALOT_SKY_LCD_KIT_SLUG,
  PIOCREAT_C01_LCD_KIT_SLUG,
  ACF_FEP_FILM_SLUG,
  MASH_P16L_MAINBOARD_SLUG,
  MASH_P16L_LARGE_BUILD_PLATE_SLUG,
  MASH_P16L_SMALL_BUILD_PLATE_SLUG,
  MASH_P16L_LCD_SCREEN_SLUG,
  MASH_P16L_RESIN_TANK_SLUG,
  ARGENZ_ST_MULTILAYER_SLUG,
  ARGENZ_HT_PLUS_SLUG,
  ARGENZ_HT_MULTILAYER_SLUG,
  MASH_P16L_PRINTER_SLUG,
  MASH_CURIE_M1_DENTAL_SLUG,
  MASH_CURIE_M1_JEWELRY_SLUG,
  CREALITY_HALOT_SKY_6K_SLUG,
  MASH_W1E_ULTRASONIC_WASH_SLUG,
  MASH_C1E_UV_CURING_SLUG,
  CREALITY_WASH_CURE_UW03_SLUG,
  THREESHAPE_E2_SLUG,
  THREESHAPE_E3_SLUG,
  THREESHAPE_E4_SLUG,
  NABERTHEM_LHT_02_17_LB_SPEED_SLUG,
  NABERTHEM_LHT_01_16_TURBO_FIRE_SLUG,
  NABERTHEM_VL_01_12_LB_PRESS_SLUG,
  NABERTHEM_VL_01_12_LB_PORCELAIN_SLUG,
  MESA_GRADE_5_ELI_TITANIUM_DISK_SLUG,
  TRASFORMER_COMP_FLOW_SLUG,
  TRASFORMER_LIGHT_GLASS_SLUG,
  ...Object.keys(printerSparePartDetailDataBySlug()),
  ...Object.keys(zirconBlockDetailDataBySlug()),
  ...Object.keys(labProductDetailDataBySlug()),
  ...Object.keys(englishProductRouteAliases),
];

function firstPaintAnnouncementMap() {
  return Object.fromEntries(
    Array.from(new Set([...firstPaintCategoryRouteKeys, ...firstPaintProductRouteKeys]))
      .map((routeKey) => [routeKey, announcementForRouteKey(routeKey)] as const)
      .filter((entry): entry is readonly [string, HeaderAnnouncementOverride] => Boolean(entry[1])),
  );
}

function firstPaintAnnouncementScript() {
  const payload = JSON.stringify(firstPaintAnnouncementMap())
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/`/g, "\\u0060")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
  return `
(function(){
  try {
    var isEn = false;
    var p = (window.location.pathname || "").toLowerCase();
    if (p === "/en" || p.indexOf("/en/") === 0) isEn = true;
    if (!isEn && window.location.search) {
      var s = window.location.search.toLowerCase();
      if (s.indexOf("lang=en") !== -1 || s.indexOf("locale=en") !== -1) isEn = true;
    }
    if (isEn) {
      document.documentElement.lang = "en";
      document.documentElement.setAttribute("data-3mash-locale", "en");
      document.documentElement.classList.add("tm-locale-en");
    } else {
      document.documentElement.lang = "tr";
      document.documentElement.setAttribute("data-3mash-locale", "tr");
      document.documentElement.classList.add("tm-locale-tr");
    }
  } catch(e){}

  var path=(window.location.pathname||"").toLocaleLowerCase("tr").replace(/^\\/+|\\/+$/g,"").split("/").pop()||"";
  var map=${payload};
  var ann=map[path];
  var root=document.currentScript&&document.currentScript.closest&&document.currentScript.closest(".three-mash-header");
  if(!root)return;
  var strong=root.querySelector("[data-tmh-ann-highlight]");
  var text=root.querySelector("[data-tmh-ann-text]");
  var link=root.querySelector("[data-tmh-ann-link]");
  if(!ann)return;
  if(strong)strong.textContent=ann.highlightText||"";
  if(text)text.textContent=ann.text||"";
  if(link){link.textContent=ann.ctaText||"";if(ann.href)link.setAttribute("href",ann.href);}
})();`;
}


function getDefaultProductsFeature() {
  return {
    eyebrow: tLocalized("YENİ · DÜNYADA İLK", "NEW · WORLD'S FIRST"),
    title: tLocalized("MASH C1E<br>Akıllı Kürleme Cihazı", "MASH C1E<br>Smart Curing Unit"),
    description: tLocalized(
      "Post-curing'i kullanıcı hatasından arındırır: reçineye göre süre, sıcaklık ve dalga boyunu otomatik yönetir.",
      "Eliminates user error in post-curing: automatically manages time, temperature, and wavelength based on resin."
    ),
    ctaText: tLocalized("Keşfet →", "Discover →"),
    href: tLocalized("/yikama-kurleme-cihazlari", "/yikama-kurleme-cihazlari"),
  };
}

function getDefaultProductPrimary(): Required<MenuItem>[] {
  return [
    { title: tLocalized("3D Yazıcılar", "3D Printers"), description: tLocalized("P1D / P16L hassas baskı", "P1D / P16L precision printing"), href: "/3d-yazicilar", icon: ecoPrinterIcon },
    { title: tLocalized("Yıkama & Kürleme", "Wash & Cure"), description: tLocalized("Yıkama ve akıllı kürleme", "Wash and smart curing"), href: tLocalized("/yikama-kurleme-cihazlari", "/yikama-kurleme-cihazlari"), icon: ecoScannerIcon },
    { title: tLocalized("Dental Reçineler", "Dental Resins"), description: tLocalized("Dental reçine seçenekleri", "Dental resin options"), href: "/dental-3d-yazici-recineleri", icon: ecoResinIcon },
  ];
}

function getDefaultProductSecondary(): Required<MenuItem>[] {
  return [
    { title: tLocalized("Masaüstü Tarayıcılar", "Desktop Scanners"), description: tLocalized("Lab tarafında hassas veri", "Precise lab data"), href: "/masasustu-tarayicilar", icon: ecoCuringIcon },
    { title: tLocalized("Zirkon Bloklar & Titanyum", "Zirconia Blocks & Titanium"), description: tLocalized("Freze tarafının sarfları", "Milling consumables"), href: "/zirkon-bloklar", icon: ecoBlocksIcon },
    { title: tLocalized("Dental Fırınlar", "Dental Furnaces"), description: tLocalized("Sinterleme çözümleri", "Sintering solutions"), href: "/dental-firinlar", icon: ecoOvenIcon },
  ];
}

function href(value?: string) {
  return localizedHref(safeNavigationHref(value, "#"));
}

function headerRouteHref(value: string | undefined, fallback: string) {
  const trimmed = value?.trim();
  if (!trimmed || trimmed === "#") return localizedHref(fallback);
  const internal = internalSiteHref(trimmed);
  const normalized = routeAliasKey(internal || trimmed);
  const slug = routeTextKey(internal || trimmed);

  if (normalized === "/" && fallback === "/cart") return localizedHref("/cart");
  if (slug === "account-login" || slug === "login") return localizedHref("/account/login");
  if (slug === "account" || slug === tLocalized("hesabim", "hesabim")) {
    return localizedHref(fallback.includes("/account/login") ? "/account/login" : (internal || fallback));
  }
  if (slug === "cart" || slug === tLocalized("sepet", "cart")) return localizedHref("/cart");
  if (slug === "search" || slug === tLocalized("arama", "search")) return localizedHref("/search");
  if (productCategoryRoutes[slug]) return localizedHref(productCategoryRoutes[slug]);
  return localizedHref(internal || fallback);
}

function searchPageHref(value?: string) {
  return headerRouteHref(value, "/search");
}

function storePageHref(value?: string) {
  const internal = internalSiteHref(value || "") || value || "";
  const normalized = routeAliasKey(internal);
  const slug = routeTextKey(internal);
  if (!internal.trim() || normalized === "/" || slug === "cart" || slug === tLocalized("sepet", "cart")) return "/search";
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
      return localizedHref(`${url.pathname}${url.search}${url.hash}` || "/");
    }
  } catch {
    // Relative route, keep as-is.
  }

  return localizedHref(trimmed);
}

const productCategoryRoutes: Record<string, string> = {
  "3d-yazicilar": "/3d-yazicilar",
  "3d-yazici": "/3d-yazicilar",
  "dental-3d-yazici-recineleri": "/dental-3d-yazici-recineleri",
  "dental-recineler": "/dental-3d-yazici-recineleri",
  "recineler": "/dental-3d-yazici-recineleri",
  "yikama-kurleme-cihazlari": tLocalized("/yikama-kurleme-cihazlari", "/yikama-kurleme-cihazlari"),
  "yikama-kurleme": tLocalized("/yikama-kurleme-cihazlari", "/yikama-kurleme-cihazlari"),
  "kurleme-cihazlari": tLocalized("/yikama-kurleme-cihazlari", "/yikama-kurleme-cihazlari"),
  "masasustu-tarayicilar": "/masasustu-tarayicilar",
  "masaustu-tarayicilar": "/masasustu-tarayicilar",
  "tarayicilar": "/masasustu-tarayicilar",
  "scanners": "/masasustu-tarayicilar",
  "desktop-scanners": "/masasustu-tarayicilar",
  "lab-scanners": "/masasustu-tarayicilar",
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
  if (!trimmed || trimmed === "#" || trimmed.startsWith("#")) {
    return localizedHref(defaultReferencesHomeHref);
  }
  const internal = internalSiteHref(trimmed);
  const withoutHash = internal.split("#")[0] || defaultReferencesHomeHref;
  return localizedHref(withoutHash);
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

function isSrcdocPreview() {
  return typeof window !== "undefined" && window.location.href.startsWith("about:srcdoc");
}

function safeHistoryReplace(url: string) {
  if (typeof window === "undefined") return;
  if (isSrcdocPreview() && !url.startsWith("#")) return;
  try {
    window.history.replaceState(null, "", url);
  } catch {
    // Studio srcdoc previews reject normal path URLs; scrolling should still work.
  }
}

function safeHistoryPush(url: string) {
  if (typeof window === "undefined") return;
  if (isSrcdocPreview() && !url.startsWith("#")) return;
  try {
    window.history.pushState(null, "", url);
  } catch {
    // Studio srcdoc previews reject normal path URLs; scrolling should still work.
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
    safeHistoryPush(hash);
    return;
  }

  savePendingReferencesScroll(targetId);
  window.location.href = safeRedirect(homeTarget);
}

function handleAnnouncementClick(event: MouseEvent, targetHref: string) {
  const safeTarget = safeNavigationHref(targetHref, "#");
  if (safeTarget !== "#karsilastirma-tablosu" || typeof window === "undefined") return;

  const section = document.getElementById("karsilastirma-tablosu");
  if (!section) return;

  event.preventDefault();
  event.stopPropagation();
  section.scrollIntoView({ behavior: "smooth", block: "center" });
}

function c4pRouteHref(value: string | undefined) {
  const trimmed = value?.trim();
  if (!trimmed) return tLocalized("/yikama-kurleme-cihazlari", "/yikama-kurleme-cihazlari");
  const normalized = trimmed
    .toLowerCase()
    .replace(/^https?:\/\/(?:www\.)?(?:3mash\.com|studio\.ikasapps\.com)/i, "")
    .replace(/\/$/, "");
  if (normalized === "/mash" || normalized === tLocalized("/urunler/c4p", "/urunler/c4p") || normalized === tLocalized("/yikama-kurleme-cihazlari", "/yikama-kurleme-cihazlari")) return tLocalized("/yikama-kurleme-cihazlari", "/yikama-kurleme-cihazlari");
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
    .slice(0, 3);
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

function richTextValue(value: string | undefined, fallbackTr: string, fallbackEn?: string) {
  const visibleText = inlineHtml(value)
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .trim();
  if (visibleText) {
    if (isEnglishLocale()) {
      if (visibleText === fallbackTr.trim()) {
        return fallbackEn || translateText(fallbackTr);
      }
      return translateText(value);
    }
    return value;
  }
  return isEnglishLocale() ? (fallbackEn || translateText(fallbackTr)) : fallbackTr;
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
  const raw = isEnglishLocale() ? translateText(value) : value;
  const markup = sanitizeHtml(inlineHtml(raw));
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
    return sanitizeSvgMarkup(value);
  }

  if (value && typeof value === "object") {
    const asset = value as { svg?: unknown; value?: unknown; url?: unknown; src?: unknown };
    if (typeof asset.svg === "string") return sanitizeSvgMarkup(asset.svg);
    if (typeof asset.value === "string") return sanitizeSvgMarkup(asset.value);
    const imageUrl = typeof asset.url === "string" ? asset.url : typeof asset.src === "string" ? asset.src : "";
    if (/^(?:https?:\/\/|\/|data:image\/)/i.test(imageUrl.trim())) {
      const escapedUrl = imageUrl.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
      return `<img src="${escapedUrl}" alt="" />`;
    }
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

  if (sectionId === tLocalized("cozum", "cozum")) {
    return Math.max(0, elementAbsoluteTop - headerOffset - (isMobile ? 10 : 20));
  } else if (sectionId === "sebep" || sectionId === "reason" || sectionId === "sorun") {
    return Math.max(0, elementAbsoluteTop - headerOffset - (isMobile ? 12 : 24));
  } else if (sectionId === tLocalized("kurleme", "kurleme")) {
    return Math.max(0, elementAbsoluteTop - headerOffset - (isMobile ? 10 : 18));
  }
  return Math.max(0, elementAbsoluteTop - headerOffset - (isMobile ? 12 : 20));
}

function findSectionTargetElement(sectionId: string): HTMLElement | null {
  const cleanId = sectionId.replace(/^#+/, "").trim();
  if (!cleanId) return null;

  if (cleanId === "sebep" || cleanId === "reason" || cleanId === "sorun") {
    return document.querySelector("#sebep, #reason, #sorun, .three-mash-problem, .tmproblem-head, .tmproblem");
  }
  if (cleanId === tLocalized("cozum", "cozum")) {
    return document.querySelector(tLocalized("#cozum, .three-mash-solution, .tmr-solution, .tmr-head", "#cozum, .three-mash-solution, .tmr-solution, .tmr-head"));
  }
  if (cleanId === tLocalized("kurleme", "kurleme")) {
    return document.querySelector(tLocalized("#kurleme, .three-mash-curing, .tmr-curing", "#kurleme, .three-mash-curing, .tmr-curing"));
  }
  if (cleanId === "ekosistem") {
    return document.querySelector("#ekosistem, .three-mash-ecosystem, .tmr-ecosystem");
  }
  if (cleanId === "guven" || cleanId === "referanslar") {
    return document.querySelector("#guven, #referanslar, .three-mash-trust, .tmr-testimonials");
  }
  if (cleanId === "sss") {
    return document.querySelector("#sss, .three-mash-faq, .tmr-faq");
  }
  if (cleanId === tLocalized("iletisim-cta", "iletisim-cta")) {
    return document.querySelector(tLocalized("#iletisim-cta, .three-mash-final, .tmr-final", "#iletisim-cta, .three-mash-final, .tmr-final"));
  }
  return document.getElementById(cleanId) || document.querySelector(`#${cleanId}`);
}

function scrollToSectionWithOffset(sectionId: string, onAlreadyAtSection?: () => void) {
  if (typeof window === "undefined") return;

  const currentPath = (window.location.pathname.replace(/\/+$/, "") || "/").replace(/^\/en(?=\/|$)/, "") || "/";
  const cleanId = sectionId.replace(/^#+/, "").trim();
  const isTopTarget = !cleanId || cleanId === "__top__" || cleanId === tLocalized("giris", "giris") || cleanId === "/" || cleanId === "top";

  if (currentPath !== "/") {
    if (isTopTarget) {
      savePendingReferencesScroll("__top__");
      window.location.href = safeRedirect(localizedHref("/"));
      return;
    }
    savePendingReferencesScroll(cleanId);
    window.location.href = safeRedirect(localizedHref(`/#${cleanId}`));
    return;
  }

  if (isTopTarget) {
    if (window.scrollY <= 80) {
      if (onAlreadyAtSection) onAlreadyAtSection();
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (onAlreadyAtSection) {
      setTimeout(onAlreadyAtSection, 350);
    }
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

  window.scrollTo({
    top: targetTop,
    left: 0,
    behavior: "smooth",
  });

  safeHistoryPush(`#${cleanId}`);
}

function FlowLink({
  item,
  wordStyle,
  onToast,
  onCloseMenu,
}: {
  item: FlowItem;
  wordStyle: Props;
  onToast?: (msg: string) => void;
  onCloseMenu?: () => void;
}) {
  const itemHref = localizedHref(item.href) || "#";
  const sectionId = flowSectionId(item);
  const isFirstItem = item.number === "01" || itemHref === "/" || !sectionId || sectionId === tLocalized("giris", "giris");

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
            if (onToast) onToast(tLocalized("Şu an bu bölümdesiniz", "You're viewing this section"));
          });
          return;
        }

        scrollToSectionWithOffset(sectionId, () => {
          if (onToast) onToast(tLocalized("Şu an bu bölümdesiniz", "You're viewing this section"));
        });
      }}
    >
      <span
        className="tmh-flow-number"
        dangerouslySetInnerHTML={richText(item.number, wordStyle)}
      />
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

  if (fallback === "/" || slug === "sorun" || slug === tLocalized("sebep", "reason") || slug === tLocalized("piyasada-yaygin-kurulum-250-500", "piyasada-yaygin-kurulum-250-500")) return tLocalized("/#sebep", "/#sebep");
  if (slug === tLocalized("cozum", "cozum")) return tLocalized("/#cozum", "/#cozum");
  if (slug === tLocalized("kurleme", "kurleme") || slug === tLocalized("neden-gerekli", "neden-gerekli")) return tLocalized("/#kurleme", "/#kurleme");
  if (slug === tLocalized("iletisim-cta", "iletisim-cta") || slug === "kritik-son-adim" || slug === "son-adim") return tLocalized("/#iletisim-cta", "/#iletisim-cta");
  return target.startsWith("#") ? `/${target}` : target;
}

function scrollToHeaderAnchor(section: Element, sectionId: string, _behavior: ScrollBehavior = "smooth") {
  scrollToSectionWithOffset(sectionId);
}

function scrollToPendingHeaderAnchor(
  section: Element,
  sectionId: string,
  _behavior: ScrollBehavior = "smooth"
) {
  scrollToSectionWithOffset(sectionId);
}

function handleHeaderAnchorNavigation(event: MouseEvent, rawHref: string | undefined) {
  if (typeof window === "undefined") return;

  const targetHref = href(rawHref);
  if (targetHref === "/") {
    event.preventDefault();
    event.stopPropagation();
    scrollToSectionWithOffset("__top__");
    return;
  }

  let url: URL;
  try {
    url = new URL(targetHref, window.location.href);
  } catch {
    return;
  }

  if (url.origin !== window.location.origin || !url.hash || url.hash.length <= 1) return;

  const sectionId = safeDecodeURI(url.hash.slice(1)).trim();
  event.preventDefault();
  event.stopPropagation();
  scrollToSectionWithOffset(sectionId);
}

function Logo({ props }: { props: Props }) {
  const { logoText, logoHref, logoImageAlt } = props;
  const logoImage = threeMashHeaderLogoImage;

  return (
    <a className="tmh-logo" href={headerRouteHref(logoHref, "/")} aria-label={logoText}>
      {/* NOTE: CSS-in-JS style for logo image wrapper dimensions */}
      <span
        className="tmh-logo-image-wrap"
        style={{
          width: "118px",
          height: "25px",
        } as any}
      >
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

export function ThreeMashHeader(props: Props) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>(null);
  const [activeAction, setActiveAction] = useState<ActiveAction>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLangOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isLangOpen]);

  const [cart, setCart] = useState<IkasCart | null>(
    () => getCurrentCart()
  );
  const [cartStatus, setCartStatus] = useState(() => getCartStatus());
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

  // ── Compute announcement fresh on every render (no stale content) ──
  const productAnnouncement = currentProductAnnouncement();

  const [isHydrated, setIsHydrated] = useState(false);

  const [authState, setAuthState] = useState<CustomerAuthState>(() => {
    return isCustomerAuthenticated();
  });
  const isAuthenticated = authState === "authenticated";

 useEffect(() => {
    setIsHydrated(true);

    if (!customerStore._initialized && hasCustomerToken()) {
      initCustomerStore(customerStore)
        .then(() => {
          setAuthState(isCustomerAuthenticated());
        })
        .catch(() => { });
    }

    const unsubscribe = subscribeAuthState((nextState) => {
      setAuthState(nextState);
    });

    // Safety poll: catches late store init from other components or
    // race conditions where MobX reaction misses the change.
    const pollId = setInterval(() => {
      const next = isCustomerAuthenticated();
      setAuthState((prev) => (prev !== next ? next : prev));
    }, 800);

    return () => {
      unsubscribe();
      clearInterval(pollId);
    };
  }, []);

  const showActionIcons = props.showActionIcons !== false;
  const searchIcon = resolveActionIcon(props.searchIconImageUrl, props.searchIconSvg, defaultSearchSvg, showActionIcons);
  const accountIcon = resolveActionIcon(props.accountIconImageUrl, props.accountIconSvg, defaultAccountSvg, showActionIcons);
  const cartIcon = resolveActionIcon(props.cartIconImageUrl, props.cartIconSvg, defaultCartSvg, showActionIcons);
  const referencesTargetHref = referencesSectionTarget(props.referencesHomeHref, props.referencesSectionId);
  const searchProductList = resolvedSearchProductList || normalizeSearchProductList(props.searchProductList);
  const searchSuggestionItems = searchSuggestions(searchProductList?.data || [], searchQuery);
  const hasSearchSuggestions = isSearchOpen && searchQuery.trim().length > 0 && searchSuggestionItems.length > 0;
  const cartItems =
    cart?.orderLineItems?.filter(
      (item) =>
        !item.deleted &&
        Number(item.quantity || 0) > 0
    ) || []; const cartItemCount = cartItems.reduce((total, item) => total + Number(item.quantity || 0), 0);
  const visibleCartItems = cartItems.slice(0, 4);

  // Compute all dynamic text at render time so they reflect language changes
  const defaultAnn = getDefaultAnnouncement();
  const productsMenuText = props.productsMenuText || getDefaultProductsMenuText();
  const defaultProductsFeature = getDefaultProductsFeature();
  const defaultProductPrimary = getDefaultProductPrimary();
  const defaultProductSecondary = getDefaultProductSecondary();
  const whyMenuText = props.whyMenuText || getDefaultWhyMenuText();
  const referencesText = props.referencesText || getDefaultReferencesText();
  const academyText = props.academyText || getDefaultAcademyText();
  const mobileMenuLabel = richTextValue(props.mobileMenuLabel, getDefaultMobileMenuLabel());
  const announcementHighlightText = richTextValue(productAnnouncement?.highlightText ?? props.announcementHighlightText, defaultAnn.highlightText);
  const announcementText = richTextValue(productAnnouncement?.text ?? props.announcementText, defaultAnn.text);
  const announcementCtaText = richTextValue(productAnnouncement?.ctaText ?? props.announcementCtaText, defaultAnn.ctaText);
  const announcementHref = productAnnouncement?.href ?? props.announcementHref;
  const effectiveAnnouncementHref = currentRouteKey() === "3d-yazicilar" ? "#karsilastirma-tablosu" : announcementHref;
  const productsCol1Title = sourceRichText(props.productsCol1Title, tLocalized("ÜRETİM", "PRODUCTION"), [tLocalized("uretim", "uretim")]);
  const productsCol2Title = sourceRichText(props.productsCol2Title, tLocalized("TAMAMLAYICI", "COMPLEMENTARY"), ["tamamlayici"]);
  const productsFeatureEyebrow = sourceRichText(props.productsFeatureEyebrow, defaultProductsFeature.eyebrow);
  const productsFeatureTitle = sourceRichText(props.productsFeatureTitle, defaultProductsFeature.title, [tLocalized("mash c4p akilli kurleme cihazi", "mash c4p akilli kurleme cihazi")]);
  const productsFeatureDescription = sourceRichText(props.productsFeatureDescription, defaultProductsFeature.description, [
    tLocalized("recineye gore otomatik kurleme. sonuc kalitesini kullanici hatasindan cikarir.", "automatic curing based on the resin. Removes result quality from user error."),
  ]);
  const productsFeatureCtaText = sourceRichText(props.productsFeatureCtaText, defaultProductsFeature.ctaText, [tLocalized("kesfet", "kesfet")]);
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
      description: sourceRichText(props.product2Description, defaultProductPrimary[1].description, [tLocalized("c4p akilli kurleme · c1e ekonomik", "c4p smart curing · c1e economical")]),
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

  // English storefront intentionally exposes only the allowed secondary product group.
  // Zirconia Blocks & Titanium and Dental Furnaces must not appear in /en.
  const productSecondary: MenuItem[] = isEnglishLocale()
    ? [
      {
        title: sourceRichText(props.product4Title, defaultProductSecondary[0].title),
        description: sourceRichText(props.product4Description, defaultProductSecondary[0].description, [tLocalized("lab icin hassas tarama", "lab icin hassas tarama")]),
        href: productRouteHref(props.product4Href, defaultProductSecondary[0].href),
        icon: ecoCuringIcon,
      },
    ]
    : [
      { title: sourceRichText(props.product4Title, defaultProductSecondary[0].title), description: sourceRichText(props.product4Description, defaultProductSecondary[0].description, [tLocalized("lab icin hassas tarama", "lab icin hassas tarama")]), href: productRouteHref(props.product4Href, defaultProductSecondary[0].href), icon: ecoCuringIcon },
      { title: sourceRichText(props.product5Title, defaultProductSecondary[1].title), description: sourceRichText(props.product5Description, defaultProductSecondary[1].description, ["freze sarflari"]), href: productRouteHref(props.product5Href, defaultProductSecondary[1].href), icon: ecoBlocksIcon },
      { title: sourceRichText(props.product6Title, defaultProductSecondary[2].title), description: sourceRichText(props.product6Description, defaultProductSecondary[2].description, ["sinterleme cozumleri"]), href: productRouteHref(props.product6Href, defaultProductSecondary[2].href), icon: ecoOvenIcon },
    ];

  const whyItems: FlowItem[] = [
    { number: text(props.why1Number, "01"), title: text(props.why1Title, tLocalized("Yılda $126K'ya varan görünmez kayıp", "Invisible loss up to $126K per year")), description: text(props.why1Description, tLocalized("Tekrarlanan işlerin kliniğinize gerçek maliyeti", "The true cost of remakes to your clinic")), href: "/" },
    { number: text(props.why2Number, "02"), title: text(props.why2Title, tLocalized("Sebep: ölçüsel hassasiyet", "Reason: dimensional accuracy")), description: text(props.why2Description, tLocalized("250–500µm sapma bandı vs ±20µm güvenli bölge", "250–500µm deviation band vs ±20µm safe zone")), href: whyMenuHref(tLocalized("/#sebep", "/#reason")) },
    { number: text(props.why3Number, "03"), title: text(props.why3Title, tLocalized("Çözüm: uyumlu ekosistem", "Solution: compatible ecosystem")), description: text(props.why3Description, tLocalized("Yazıcı + reçine + parametre bilgisi, birlikte kalibre", "Printer + resin + parameter knowledge, calibrated together")), href: whyMenuHref(tLocalized("/#cozum", "/#cozum")) },
    { number: text(props.why4Number, "04"), title: text(props.why4Title, tLocalized("Ve kürleme — son %20'lik fark", "And curing — the final 20% difference")), description: text(props.why4Description, tLocalized("Doğru basılan iş, yanlış kürlenirse yine başarısız olur", "A properly printed job fails if improperly cured")), href: whyMenuHref(tLocalized("/#kurleme", "/#kurleme")) },
  ];

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  function showToast(message: string) {
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    setToastMessage(message);
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 2200);
  }

  async function handleHeaderLogout(event: Event) {
    event.preventDefault();
    setActiveAction(null);
    await performLogout({ forceRedirect: true, redirectTarget: "/" });
  }

  // ── Profile links in dropdown ─────────────────────────────────────
  const loginTarget = headerRouteHref(props.accountHref, "/account/login");
  // Ensure user is only treated as authed when a valid token exists in storage
  const isCurrentlyAuthed = isHydrated && hasCustomerToken() && (isAuthenticated || !!customerStore.customer);
  const ordersTarget = headerRouteHref(props.profileLink1Href, "/account/orders");
  const addressesTarget = headerRouteHref(props.profileLink2Href, "/account/addresses");

  const customerDisplayName = customerStore.customer
    ? `${customerStore.customer.firstName ?? ""} ${customerStore.customer.lastName ?? ""}`.trim() || customerStore.customer.email
    : null;

  const profileLinks = [
    {
      icon: defaultOrdersSvg,
      label: tProp(
        props.profileLink1Text,
        "Siparişlerim",
        "My Orders",
      ),
      link: isCurrentlyAuthed ? ordersTarget : loginTarget,
      authHref: ordersTarget,
      isProtected: true,
      isLogout: false,
    },
    {
      icon: defaultAddressesSvg,
      label: tProp(
        props.profileLink2Text,
        "Adreslerim",
        "My Addresses",
      ),
      link: isCurrentlyAuthed ? addressesTarget : loginTarget,
      authHref: addressesTarget,
      isProtected: true,
      isLogout: false,
    },
    {
      icon: defaultAcademySvg,
      label: tProp(
        props.profileLink5Text,
        "Mash Academy",
        "Mash Academy",
      ),
      link: academyPageTarget(
        props.profileLink5Href
      ),
      authHref: academyPageTarget(props.profileLink5Href),
      isProtected: false,
      isLogout: false,
    },
    {
      icon: defaultLogoutSvg,
      label: isCurrentlyAuthed
        ? tProp(
          props.profileLink6Text,
          "Çıkış yap",
          "Sign Out",
        )
        : tLocalized("Giriş Yap", "Log In"),
      link: isCurrentlyAuthed ? "#" : loginTarget,
      authHref: loginTarget,
      isProtected: false,
      isLogout: isCurrentlyAuthed,
    },
  ];

  function handleDropdownLinkClick(event: MouseEvent, item: (typeof profileLinks)[0]) {
    setActiveAction(null);
    if (item.isLogout) {
      handleHeaderLogout(event);
      return;
    }
    event.preventDefault();
    const authed = isAuthenticated || isCustomerAuthenticated() === "authenticated" || hasCustomerToken();
    const destination = item.isProtected
      ? (authed ? (item.authHref || item.link) : loginTarget)
      : item.link;

    window.location.href = safeRedirect(destination);
  }
  const accountMenuTitle = tLocalized("Hesabım", "My Account");
  const accountMenuDescription = tProp(
    props.profileMenuDescription,
    "Sipariş, destek ve hesap işlemlerinize hızlıca ulaşın.",
    "Quickly access your orders, support, and account settings.",
  );

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
        debugError("ThreeMashHeader search product list load failed", error);
      });

    return () => {
      isMounted = false;
    };
  }, [props.searchProductList]);

  useLayoutEffect(() => {
    const pendingSectionId = consumePendingReferencesScroll();
    if (pendingSectionId === "__top__") {
      const previousScrollBehavior = document.documentElement.style.scrollBehavior;
      const previousScrollRestoration = window.history.scrollRestoration;
      window.history.scrollRestoration = "manual";
      document.documentElement.style.scrollBehavior = "auto";
      safeHistoryReplace(`${window.location.pathname}${window.location.search}`);
      window.scrollTo(0, 0);
      const timeout = window.setTimeout(() => {
        document.documentElement.style.scrollBehavior = previousScrollBehavior;
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }, 220);
      return () => {
        window.clearTimeout(timeout);
        document.documentElement.style.scrollBehavior = previousScrollBehavior;
        window.history.scrollRestoration = previousScrollRestoration;
      };
    }

    const pendingHash = pendingSectionId ? sectionHash(pendingSectionId, defaultReferencesSectionId) : window.location.hash;
    if (!pendingHash || pendingHash.length <= 1) return;
    let frame = 0;
    let attempts = 0;
    const previousScrollBehavior = document.documentElement.style.scrollBehavior;
    const previousScrollRestoration = window.history.scrollRestoration;

    if (pendingSectionId) {
      window.history.scrollRestoration = "manual";
      document.documentElement.style.scrollBehavior = "auto";
      safeHistoryReplace(`${window.location.pathname}${window.location.search}`);
      window.scrollTo(0, 0);

    }

    const scrollToPendingSection = () => {
      const sectionId = safeDecodeURI(pendingHash.slice(1));
      const section = document.getElementById(sectionId) || document.querySelector(pendingHash);
      if (!section) {
        attempts += 1;
        if (attempts < 90) {
          frame = window.requestAnimationFrame(scrollToPendingSection);
        }
        return;
      }

      scrollToSectionWithOffset(sectionId);
      if (pendingSectionId) safeHistoryReplace(pendingHash);
    };

    const timeout = window.setTimeout(() => {
      frame = window.requestAnimationFrame(scrollToPendingSection);
    }, pendingSectionId ? 300 : 120);

    return () => {
      window.clearTimeout(timeout);
      if (frame) window.cancelAnimationFrame(frame);
      if (pendingSectionId) {
        document.documentElement.style.scrollBehavior = previousScrollBehavior;
        window.history.scrollRestoration = previousScrollRestoration;
      }
    };
  }, []);



  useEffect(() => {
    const productList = searchProductList;
    if (!productList) return;

    const query = searchQuery.trim();
    if (!isSearchOpen && committedSuggestionSearchRef.current === query) return;
    if (query === committedSuggestionSearchRef.current) return;

    const timeout = window.setTimeout(() => {
      committedSuggestionSearchRef.current = query;
      if (!query) {
        setResolvedSearchProductList({ ...productList, data: [] } as IkasProductList);
        return;
      }

      void (async () => {
        try {
          const response = await apiSearchProducts({
            input: { query, page: 1, perPage: 8 },
          } as Parameters<typeof apiSearchProducts>[0]);
          setResolvedSearchProductList({
            ...productList,
            data: response.data?.data || [],
          } as IkasProductList);
        } catch {
          setResolvedSearchProductList({ ...productList, data: [] } as IkasProductList);
        }
      })();
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

  useLayoutEffect(() => {
    // Announcement is now computed fresh on every render, so no state update needed.
    // Event listener kept for potential future dynamic announcement updates.
    function handleProductAnnouncement(event: Event) {
      // The announcement will be re-computed on the next render via currentProductAnnouncement()
      // which reads from window.__THREE_MASH_PRODUCT_ANNOUNCEMENT__
      // For immediate UI update, a state trigger could be added here if needed.
    }

    window.addEventListener("three-mash:product-announcement", handleProductAnnouncement);
    return () => window.removeEventListener("three-mash:product-announcement", handleProductAnnouncement);
  }, []);


  useEffect(() => {
    let mounted = true;
    const unsubscribe = subscribeCart(
      (nextCart, nextStatus) => {
        if (!mounted) return;
        setCart(nextCart);
        setCartStatus(nextStatus);
      }
    );

    void initGlobalCart();

    const syncCart = () => {
      setCart(cartStore.cart ? ({ ...cartStore.cart } as IkasCart) : null);
      setCartStatus(getCartStatus());
    };
    window.addEventListener("3mash-cart-updated", syncCart);

    return () => {
      mounted = false;
      unsubscribe();
      window.removeEventListener("3mash-cart-updated", syncCart);
    };
  }, []);
  useEffect(() => {
    function smoothSamePageAnchor(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as Element | null;
      const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      const rawHref = anchor?.getAttribute("href")?.trim();
      if (!anchor || !rawHref || anchor.target) return;

      let hash = "";
      let samePath = true;
      if (rawHref.startsWith("#")) {
        hash = rawHref;
      } else {
        try {
          const url = new URL(rawHref, window.location.href);
          if (url.origin !== window.location.origin) return;
          samePath = url.pathname === window.location.pathname;
          hash = url.hash;
        } catch {
          return;
        }
      }

      if (!hash || hash.length <= 1 || !samePath) return;

      const sectionId = safeDecodeURI(hash.slice(1));
      const section = document.getElementById(sectionId) || document.querySelector(hash);
      if (!section) return;

      event.preventDefault();
      event.stopPropagation();
      setActiveMenu(null);
      setActiveAction(null);
      safeHistoryPush(hash);
      setTimeout(() => section.scrollIntoView({ behavior: "smooth", block: sectionId === "karsilastirma-tablosu" ? "center" : "start" }), 0);
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
      window.location.href = safeRedirect(`${url.pathname}${url.search}${url.hash}`);
    } catch {
      window.location.href = safeRedirect(`${target}${target.includes("?") ? "&" : "?"}${encodeURIComponent(param)}=${encodeURIComponent(query)}`);
    }
  }

  function goToSearchMatch() {
    const query = searchQuery.trim();
    if (!query) return;

    const firstSuggestion = searchSuggestionItems[0]?.product;
    if (firstSuggestion) {
      const productHref = getProductHref(firstSuggestion);
      if (productHref && productHref !== "#") {
        window.location.href = safeRedirect(productHref);
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

  async function removeCartItem(
    event: Event,
    item: IkasOrderLineItem
  ) {
    event.preventDefault();
    event.stopPropagation();

    if (removingCartItemId) return;

    setRemovingCartItemId(item.id);

    try {
      await removeItem(item);

      // IKAS store değiştiyse anında tüm siteye yayınla.
      publishCartFromIkasStore();

      // Server doğrulaması arkada.
      void refreshGlobalCart();
    } finally {
      setRemovingCartItemId("");
    }
  }



  return (
    <section className="three-mash-header" style={themeStyle}>
      {/* Preconnect and preload critical web fonts to eliminate layout shift (CLS) */}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link rel="preload" as="font" type="font/woff2" href="https://fonts.gstatic.com/s/spacegrotesk/v22/V8mDoQDjQSkFtoMM3T6r8E7mPbF4C_k3HqU.woff2" crossOrigin="anonymous" />
<link rel="preload" as="font" type="font/woff2" href="https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7W0Q5nw.woff2" crossOrigin="anonymous" />
<link rel="preload" as="font" type="font/woff2" href="https://fonts.gstatic.com/s/newsreader/v26/cY9kfjOCX1hbuyalUrK439vogqC9yFZCYg7oRZaLP4obnf7fTXglsMwaT9ZJFjSAgA.woff2" crossOrigin="anonymous" /><style dangerouslySetInnerHTML={{ __html: criticalHeaderCss }} />
      {props.showAnnouncement !== false && (
        <>
          <div className="tmh-announcement">
            <div className="tmh-announcement-inner">
              <b data-tmh-ann-highlight dangerouslySetInnerHTML={announcementRichText(announcementHighlightText, props)} />
              <span data-tmh-ann-text dangerouslySetInnerHTML={announcementRichText(announcementText, props)} />
              <a
                data-tmh-ann-link
                href={href(text(effectiveAnnouncementHref, defaultAnn.href))}
                onClick={(event) => handleAnnouncementClick(event, text(effectiveAnnouncementHref, defaultAnn.href))}
                dangerouslySetInnerHTML={announcementRichText(announcementCtaText, props)}
              />
              <div className="tmh-announcement-lang" ref={langDropdownRef}>
                <button
                  type="button"
                  className="tmh-lang-trigger"
                  aria-label={isEnglishLocale() ? "Language: English" : "Dil: Türkçe"}
                  aria-expanded={isLangOpen}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLangOpen((prev) => !prev);
                  }}
                >
                  {isEnglishLocale() ? (
                    <>
                      <svg className="tmh-flag-svg" viewBox="0 0 60 40" width="16" height="11" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <rect width="60" height="40" fill="#012169" rx="2" />
                        <path d="M0 0 L60 40 M60 0 L0 40" stroke="#ffffff" strokeWidth="6" />
                        <path d="M0 0 L60 40 M60 0 L0 40" stroke="#C8102E" strokeWidth="2.5" />
                        <path d="M30 0 v40 M0 20 h60" stroke="#ffffff" strokeWidth="10" />
                        <path d="M30 0 v40 M0 20 h60" stroke="#C8102E" strokeWidth="6" />
                      </svg>
                      <span>EN</span>
                    </> 
                  ) : (
                    <>
                      <svg className="tmh-flag-svg" viewBox="0 0 1200 800" width="16" height="11" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <rect width="1200" height="800" fill="#E30A17" rx="30" />
                        <circle cx="425" cy="400" r="200" fill="#ffffff" />
                        <circle cx="475" cy="400" r="160" fill="#E30A17" />
                        <polygon fill="#ffffff" points="583.33,400 700.86,438.19 628.21,338.2 628.21,461.8 700.86,361.81" />
                      </svg>
                      <span>TR</span>
                    </>
                  )}
                  <svg className={`tmh-lang-caret ${isLangOpen ? "is-open" : ""}`} width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {isLangOpen && (
                  <div className="tmh-lang-dropdown" role="menu">
                    <button
                      type="button"
                      role="menuitem"
                      className={`tmh-lang-option ${!isEnglishLocale() ? "is-active" : ""}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setIsLangOpen(false);
                        setPreferredLocale("tr");
                        if (typeof window === "undefined") return;
                        const targetUrl = resolveLocalizedUrl("tr");
                        window.location.href = safeRedirect(targetUrl);
                      }}
                    >
                      <svg className="tmh-flag-svg" viewBox="0 0 1200 800" width="16" height="11" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <rect width="1200" height="800" fill="#E30A17" rx="30" />
                        <circle cx="425" cy="400" r="200" fill="#ffffff" />
                        <circle cx="475" cy="400" r="160" fill="#E30A17" />
                        <polygon fill="#ffffff" points="583.33,400 700.86,438.19 628.21,338.2 628.21,461.8 700.86,361.81" />
                      </svg>
                      <span>Türkçe (TR)</span>
                      {!isEnglishLocale() && <span className="tmh-lang-check">✓</span>}
                    </button>

                    <button
                      type="button"
                      role="menuitem"
                      className={`tmh-lang-option ${isEnglishLocale() ? "is-active" : ""}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setIsLangOpen(false);
                        setPreferredLocale("en");
                        if (typeof window === "undefined") return;
                        const targetUrl = resolveLocalizedUrl("en");
                        window.location.href = safeRedirect(targetUrl);
                      }}
                    >
                      <svg className="tmh-flag-svg" viewBox="0 0 60 40" width="16" height="11" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <rect width="60" height="40" fill="#012169" rx="2" />
                        <path d="M0 0 L60 40 M60 0 L0 40" stroke="#ffffff" strokeWidth="6" />
                        <path d="M0 0 L60 40 M60 0 L0 40" stroke="#C8102E" strokeWidth="2.5" />
                        <path d="M30 0 v40 M0 20 h60" stroke="#ffffff" strokeWidth="10" />
                        <path d="M30 0 v40 M0 20 h60" stroke="#C8102E" strokeWidth="6" />
                      </svg>
                      <span>English (EN)</span>
                      {isEnglishLocale() && <span className="tmh-lang-check">✓</span>}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <script dangerouslySetInnerHTML={{ __html: firstPaintAnnouncementScript() }} />
        </>
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
                  // NOTE: CSS-in-JS with dynamic positioning for mega menu
                  style={productsMenuLeft == null ? undefined : { "--tmh-products-mega-left": `${productsMenuLeft}px`, "--tmh-products-translate-x": "0px" } as any}
                >
                  <a className="tmh-feature" href={localizedHref(c4pRouteHref(text(props.productsFeatureHref, defaultProductsFeature.href)))}>
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
                  // NOTE: CSS-in-JS with dynamic positioning for mega menu
                  style={whyMenuLeft == null ? undefined : { "--tmh-flow-mega-left": `${whyMenuLeft}px`, "--tmh-flow-translate-x": "0px" } as any}
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
              <a href={headerRouteHref(props.accountHref, isCurrentlyAuthed ? "/account" : "/account/login")} aria-label={props.accountAriaLabel || ""}>
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
                  <b dangerouslySetInnerHTML={richText(isCurrentlyAuthed && customerDisplayName ? customerDisplayName : accountMenuTitle, props)} />
                  <p dangerouslySetInnerHTML={richText(accountMenuDescription, props)} />
                  <div
                    className="tmh-panel-links"
                    key={isCurrentlyAuthed ? "tmh-links-authed" : "tmh-links-guest"}
                  >
                    {profileLinks.map((item, index) => (
                      <a
                        key={`${isCurrentlyAuthed ? "authed" : "guest"}-${index}-${item.link}`}
                        href={item.isLogout ? "#" : href(item.link)}
                        onClick={(e) => handleDropdownLinkClick(e, item)}
                      >
                        <InlineIcon svg={item.icon} className="tmh-panel-link-icon" />
                        <span dangerouslySetInnerHTML={richText(item.label, props)} />
                      </a>
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
                </button>
                {cartItemCount > 0 ? (
                  <span className="tmh-cart-badge" aria-hidden="true">
                    {cartItemCount}
                  </span>
                ) : null}
                <div
                  className={`tmh-action-panel tmh-store-panel${activeAction === "store" ? " is-open" : ""}`}
                  hidden={activeAction !== "store"}
                >
                  <span className="tmh-action-panel-kicker">{text(props.cartAriaLabel, tLocalized("SEPETİM", "MY CART"))}</span>
                  {cartStatus === "loading" || cartStatus === "idle" ? (
                    <div className="tmh-cart-live tmh-cart-loading-state">
                      <span className="tmh-cart-spinner" aria-hidden="true" />
                      <span>{tLocalized("Sepet yükleniyor...", "Loading cart...")}</span>
                    </div>
                  ) : cartStatus === "error" ? (
                    <div className="tmh-cart-empty-card tmh-cart-error-state">
                      <span>{tLocalized("Sepet yüklenemedi.", "The cart could not be loaded.")}</span>
                      <button
                        className="tmh-cart-market-button"
                        type="button"
                        onClick={() => void refreshGlobalCart()}
                      >
                        {tLocalized("Tekrar dene", "Try again")}
                      </button>
                    </div>
                  ) : cartItems.length > 0 ? (
                    <div className="tmh-cart-live">
                      <div className="tmh-cart-count">{cartItemCount} {tLocalized("ürün sepetinizde", "items in your cart")}</div>
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
                                  <em>{tLocalized("Adet", "Qty")} {item.quantity}</em>
                                </span>
                              </a>
                              <strong>{getOrderLineItemFormattedFinalPriceWithQuantity(item)}</strong>
                              <button
                                className="tmh-cart-live-remove"
                                type="button"
                                aria-label={tLocalized(`${cartItemTitle(item)} sepetten kaldır`, `Remove ${cartItemTitle(item)} from cart`)}
                                disabled={removingCartItemId === item.id}
                                onClick={(event) => removeCartItem(event, item)}
                              >
                                ×
                              </button>
                            </div>
                          );
                        })}
                      </div>
                      <a className="tmh-cart-market-button tmh-cart-go-button" href={localizedHref("/cart")}>{tLocalized("Sepete git", "Go to Cart")}</a>
                    </div>
                  ) : (
                    <div className="tmh-cart-empty-card">
                      <a
                        className="tmh-cart-market-button"
                        href={localizedHref("/search")}
                        onClick={() => {
                          try {
                            sessionStorage.removeItem("tm_market_nav_stack");
                          } catch { }
                        }}
                        dangerouslySetInnerHTML={richText(richTextValue(props.storePanelButtonText, "Markete git", "Go to Store"), props)}
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
            <a className="tmh-mobile-accent-link" href={href(productPrimary[2]?.href)} dangerouslySetInnerHTML={richText(productPrimary[2]?.title, props)} />
            <a href={href(productPrimary[0]?.href)} dangerouslySetInnerHTML={richText(productPrimary[0]?.title, props)} />
            <a href={academyPageTarget(props.academyHref)} dangerouslySetInnerHTML={richText(academyText, props)} />
            <a href={headerRouteHref(props.accountHref, isCurrentlyAuthed ? "/account" : "/account/login")} dangerouslySetInnerHTML={richText(accountMenuTitle, props)} />
            <div className="tmh-mobile-lang-wrap">
              <button
                type="button"
                className={`tmh-mobile-lang-btn ${!isEnglishLocale() ? "is-active" : ""}`}
                onClick={() => {
                  setPreferredLocale("tr");
                  if (typeof window === "undefined") return;
                  const targetUrl = resolveLocalizedUrl("tr");
                  window.location.href = safeRedirect(targetUrl);
                }}
              >
                <svg className="tmh-flag-svg" viewBox="0 0 1200 800" width="16" height="11" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <rect width="1200" height="800" fill="#E30A17" rx="30" />
                  <circle cx="425" cy="400" r="200" fill="#ffffff" />
                  <circle cx="475" cy="400" r="160" fill="#E30A17" />
                  <polygon fill="#ffffff" points="583.33,400 700.86,438.19 628.21,338.2 628.21,461.8 700.86,361.81" />
                </svg>
                <span>Türkçe</span>
              </button>
              <button
                type="button"
                className={`tmh-mobile-lang-btn ${isEnglishLocale() ? "is-active" : ""}`}
                onClick={() => {
                  setPreferredLocale("en");
                  if (typeof window === "undefined") return;
                  const targetUrl = resolveLocalizedUrl("en");
                  window.location.href = safeRedirect(targetUrl);
                }}
              >
                <svg className="tmh-flag-svg" viewBox="0 0 60 40" width="16" height="11" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <rect width="60" height="40" fill="#012169" rx="2" />
                  <path d="M0 0 L60 40 M60 0 L0 40" stroke="#ffffff" strokeWidth="6" />
                  <path d="M0 0 L60 40 M60 0 L0 40" stroke="#C8102E" strokeWidth="2.5" />
                  <path d="M30 0 v40 M0 20 h60" stroke="#ffffff" strokeWidth="10" />
                  <path d="M30 0 v40 M0 20 h60" stroke="#C8102E" strokeWidth="6" />
                </svg>
                <span>English</span>
              </button>
            </div>
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

export default ThreeMashHeader;