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
  initProductList,
  initCustomerStore,
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
import { categoryLandingDataFromKey } from "../../sub-components/ThreeMashCategoryLanding/presets";
import { tLocalized, tProp, isEnglishLocale, translateText } from "../../utils/i18n";
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
  LAB_PRODUCT_DETAIL_DATA_BY_SLUG,
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
  PRINTER_SPARE_PART_DETAIL_DATA_BY_SLUG,
  resolveProductDetailData,
  THREESHAPE_E2_SLUG,
  THREESHAPE_E3_SLUG,
  THREESHAPE_E4_SLUG,
  TRASFORMER_COMP_FLOW_SLUG,
  TRASFORMER_LIGHT_GLASS_SLUG,
  ZIRCON_BLOCK_DETAIL_DATA_BY_SLUG,
} from "../../sub-components/ThreeMashProductDetailData";
import { Props } from "./types";
import {
  getCurrentCart,
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
const defaultProductsMenuText = tLocalized("Ürünler", "Products");
const defaultWhyMenuText = "Neden 3mash?";
const defaultReferencesText = "Referanslar";
const defaultAcademyText = "Academy";
const defaultMobileMenuLabel = tLocalized("Menü", "Menu");

// Critical header styles live with the markup so route changes cannot briefly
// paint the header in its unstyled/default browser state before the component
// stylesheet is applied. Keep this intentionally small and structural only.
const criticalHeaderCss = `
/*
 * First-paint header CSS.
 * This is intentionally emitted before the header markup so the server-rendered
 * navbar has the same geometry and appearance before the full component CSS arrives.
 */
.three-mash-header,
.three-mash-header * { box-sizing: border-box; }

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

.three-mash-header [hidden] { display: none !important; }

.three-mash-header .tmh-wrap {
  width: min(100%, 1240px);
  margin: 0 auto;
  padding: 0 32px;
}

.three-mash-header .tmh-announcement {
  width: 100%;
  height: var(--tmh-announcement-fixed-height);
  overflow: hidden;
  background: var(--tmh-ann-bg);
  color: var(--tmh-ann-text);
  font-size: 13px;
  line-height: 1.45;
}

.three-mash-header .tmh-announcement-inner {
  width: min(100%, 1240px);
  height: 100%;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 8px;
  row-gap: 3px;
  text-align: center;
  flex-wrap: wrap;
}

.three-mash-header .tmh-announcement-inner > * { margin: 0; }
.three-mash-header .tmh-announcement b {
  color: var(--tmh-accent);
  font-weight: 600;
}
.three-mash-header .tmh-announcement a {
  color: #fff;
  text-decoration: underline;
  text-underline-offset: 3px;
  font-weight: 600;
}
 
.three-mash-header .tmh-header {
  position: sticky !important;
  top: 0;
  width: 100%;
  z-index: 99999;
  background: color-mix(in srgb, var(--tmh-bg) 92%, transparent);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--tmh-line);
}

@media (max-width: 900px) {
  .three-mash-header {
    --tmh-announcement-fixed-height: 76px;
  }

  .three-mash-header .tmh-announcement {
    font-size: 12.5px;
    line-height: 1.25;
  }

  .three-mash-header .tmh-announcement-inner {
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    align-content: center;
    gap: 3px;
    padding-top: 6px;
    padding-bottom: 6px;
  }

  .three-mash-header .tmh-announcement-inner > * {
    min-width: 0;
    max-width: 100%;
    margin: 0;
  }

  .three-mash-header .tmh-announcement [data-tmh-ann-text] {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
}

@media (max-width: 620px) {
  .three-mash-header {
    --tmh-announcement-fixed-height: 76px;
    --tmh-nav-fixed-height: 66px;
  }
}

.three-mash-header .tmh-nav {
  height: var(--tmh-nav-fixed-height);
  min-height: var(--tmh-nav-fixed-height);
  display: flex;
  align-items: center;
  gap: 38px;
  overflow: visible;
}

.three-mash-header .tmh-logo {
  display: inline-flex;
  align-items: center;
  gap: 0;
  flex: 0 0 116px;
  width: 116px;
  min-width: 0;
  max-width: 116px;
  margin-right: 6px;
  color: var(--tmh-text);
  text-decoration: none;
  overflow: visible;
}

.three-mash-header .tmh-logo-image-wrap {
  position: relative;
  display: block;
  width: min(var(--tmh-logo-image-width), 118px);
  height: min(var(--tmh-logo-image-height), 25px);
  flex: 0 0 auto;
  transform: translate(var(--tmh-logo-image-x), var(--tmh-logo-image-y));
  opacity: var(--tmh-logo-image-opacity);
}

.three-mash-header .tmh-logo-image-wrap img,
.three-mash-header .tmh-logo > img {
  display: block;
  width: 100%;
  height: 100%;
  flex: 0 0 auto;
  object-fit: var(--tmh-logo-image-fit);
  filter:
    brightness(var(--tmh-logo-image-brightness))
    contrast(var(--tmh-logo-image-contrast))
    saturate(var(--tmh-logo-image-saturation))
    hue-rotate(var(--tmh-logo-image-hue))
    invert(var(--tmh-logo-image-invert));
}

.three-mash-header .tmh-desktop-nav {
  display: block;
  flex: 1 1 auto;
  min-width: 0;
}

.three-mash-header .tmh-menu {
  display: flex;
  align-items: stretch;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.three-mash-header .tmh-menu > li {
  position: relative;
  display: flex;
  align-items: stretch;
  margin: 0;
  padding: 0;
  list-style: none;
}

.three-mash-header .tmh-menu-trigger,
.three-mash-header .tmh-plain-link {
  min-height: 70px;
  max-width: 180px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0 13px;
  margin: 0;
  border: 0;
  background: transparent;
  color: var(--tmh-text);
  font-family: var(--tm-theme-font-body, "Inter", sans-serif);
  font-size: 14.5px;
  font-weight: 500;
  line-height: 1.2;
  text-decoration: none;
  cursor: pointer;
  white-space: normal;
  overflow-wrap: anywhere;
  text-align: left;
}

.three-mash-header .tmh-caret {
  display: block;
  width: 10px;
  height: 8px;
  flex: 0 0 auto;
  color: var(--tmh-muted);
  transform: translateY(1px);
}

.three-mash-header .tmh-actions {
  display: flex;
  align-items: center;
  gap: 22px;
  flex: 0 0 auto;
  min-width: 0;
  position: relative;
}

.three-mash-header .tmh-inline-search {
  position: relative;
  min-width: 0;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0;
  flex: 0 0 auto;
  border: 1px solid transparent;
  border-radius: 999px;
}

.three-mash-header .tmh-action-wrap {
  position: relative;
  width: 24px;
  height: 24px;
  flex: 0 0 auto;
}

.three-mash-header .tmh-actions > a,
.three-mash-header .tmh-icon-button,
.three-mash-header .tmh-action-button {
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;
  padding: 0;
  margin: 0;
  border: 0;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--tmh-text);
  position: relative;
  text-decoration: none;
}

.three-mash-header .tmh-action-svg {
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.three-mash-header .tmh-action-svg > svg,
.three-mash-header .tmh-action-svg > img {
  display: block;
  width: 22px;
  height: 22px;
  max-width: 22px;
  max-height: 22px;
}

.three-mash-header .tmh-mobile-menu {
  display: none;
  position: relative;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 0;
  color: var(--tmh-text);
  cursor: pointer;
  margin: 0;
  padding: 6px;
}

.three-mash-header .tmh-header-spacer { height: 0; }

@media (max-width: 1000px) {
  .three-mash-header .tmh-desktop-nav,
  .three-mash-header .tmh-actions { display: none; }
  .three-mash-header .tmh-mobile-menu { display: block; margin-left: auto; }
  .three-mash-header .tmh-nav { gap: 18px; }
}

@media (max-width: 620px) {
  .three-mash-header {
    --tmh-announcement-fixed-height: 76px;
    --tmh-nav-fixed-height: 66px;
  }
  .three-mash-header .tmh-wrap,
  .three-mash-header .tmh-announcement-inner {
    padding-left: 20px;
    padding-right: 20px;
  }
  .three-mash-header .tmh-nav {
    gap: 12px;
    flex-wrap: nowrap;
  }
  .three-mash-header .tmh-logo {
    flex-basis: 112px;
    width: 112px;
    max-width: 112px;
  }
  .three-mash-header .tmh-logo-image-wrap,
  .three-mash-header .tmh-logo > img {
    width: min(var(--tmh-logo-image-width), 112px);
    height: min(var(--tmh-logo-image-height), 24px);
  }
  .three-mash-header .tmh-header-spacer { height: 0; }
}
`;

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
  return (
    announcementOverridePayload((window as unknown as { __THREE_MASH_PRODUCT_ANNOUNCEMENT__?: unknown }).__THREE_MASH_PRODUCT_ANNOUNCEMENT__) ||
    routeAnnouncementOverride()
  );
}

function currentRouteKey() {
  if (typeof window === "undefined") return "";
  return window.location.pathname
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

  const productAnnouncement = productAnnouncementFromData(resolveProductDetailData({ slug: routeKey }));
  if (productAnnouncement) return productAnnouncement;

  const categoryData = categoryLandingDataFromKey(routeKey);
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

function routeAnnouncementOverride(): HeaderAnnouncementOverride | null {
  return announcementForRouteKey(currentRouteKey());
}

const firstPaintCategoryRouteKeys = [
  "3d-yazicilar",
  "dental-3d-yazici-recineleri",
  "yikama-kurleme-cihazlari",
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
  ...Object.keys(PRINTER_SPARE_PART_DETAIL_DATA_BY_SLUG),
  ...Object.keys(ZIRCON_BLOCK_DETAIL_DATA_BY_SLUG),
  ...Object.keys(LAB_PRODUCT_DETAIL_DATA_BY_SLUG),
];

const firstPaintAnnouncementMap = Object.fromEntries(
  Array.from(new Set([...firstPaintCategoryRouteKeys, ...firstPaintProductRouteKeys]))
    .map((routeKey) => [routeKey, announcementForRouteKey(routeKey)] as const)
    .filter((entry): entry is readonly [string, HeaderAnnouncementOverride] => Boolean(entry[1])),
);

function firstPaintAnnouncementScript() {
  const payload = JSON.stringify(firstPaintAnnouncementMap).replace(/</g, "\\u003c");
  return `
(function(){
  var path=(window.location.pathname||"").toLocaleLowerCase("tr").replace(/^\\/+|\\/+$/g,"").split("/").pop()||"";
  if(window.location.pathname.indexOf("/en")===0||(document.documentElement&&document.documentElement.lang==="en"))return;
  var map=${payload};
  var ann=map[path];
  if(!ann)return;
  var root=document.currentScript&&document.currentScript.closest&&document.currentScript.closest(".three-mash-header");
  if(!root)return;
  var strong=root.querySelector("[data-tmh-ann-highlight]");
  var text=root.querySelector("[data-tmh-ann-text]");
  var link=root.querySelector("[data-tmh-ann-link]");
  if(strong)strong.textContent=ann.highlightText||"";
  if(text)text.textContent=ann.text||"";
  if(link){link.textContent=ann.ctaText||"";if(ann.href)link.setAttribute("href",ann.href);}
})();`;
}


const defaultProductsFeature = {
  eyebrow: "YENİ · DÜNYADA İLK",
  title: "MASH C1E<br>Akıllı Kürleme Cihazı",
  description: "Post-curing'i kullanıcı hatasından arındırır: reçineye göre süre, sıcaklık ve dalga boyunu otomatik yönetir.",
  ctaText: "Keşfet →",
  href: "/yikama-kurleme-cihazlari",
};
const defaultProductPrimary: Required<MenuItem>[] = [
  { title: tLocalized("3D Yazıcılar", "3D Printers"), description: "P1D / P16L hassas baskı", href: "/3d-yazicilar", icon: ecoPrinterIcon },
  { title: tLocalized("Yıkama", "Washing"), description: "Baskı sonrası ultrasonik temizlik", href: "/yikama-cihazlari", icon: ecoScannerIcon },
  { title: tLocalized("Kürleme", "Curing"), description: "360° homojen UV post-curing", href: "/kurleme-cihazlari", icon: ecoCuringIcon },
];
const defaultProductSecondary: Required<MenuItem>[] = [
  { title: tLocalized("Dental Reçineler", "Dental Resins"), description: "Dental reçine seçenekleri", href: "/dental-3d-yazici-recineleri", icon: ecoResinIcon },
  { title: "Zirkon Bloklar & Titanyum", description: "Freze tarafının sarfları", href: "/zirkon-bloklar", icon: ecoBlocksIcon },
  { title: "Tarayıcılar ve Fırınlar", description: "Lab tarafında hassas veri · Sinterleme çözümleri", href: "/dental-firinlar", icon: ecoOvenIcon },
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
  const internal = internalSiteHref(value || "") || value || "";
  const normalized = routeAliasKey(internal);
  const slug = routeTextKey(internal);
  if (!internal.trim() || normalized === "/" || slug === "cart" || slug === "sepet") return "/search";
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

function richText(value?: string, props?: any) {
  const raw = isEnglishLocale() ? translateText(value) : value;
  const markup = inlineHtml(raw);
  if (!props) return { __html: markup };
  return {
    __html: styleTextChunks(markup, props.styledPhrase, props.wordStyleEnabled !== false),
  };
}

function announcementRichText(value: string | undefined, props: any) {
  const markup = richText(value, props).__html;
  return {
    __html: styleTextChunks(markup, props.announcementStyledPhrase, props.announcementWordStyleEnabled !== false, "tmh-ann-word-style"),
  };
}

function RichInline({ value, className, wordStyle }: { value?: string; className?: string; wordStyle?: any }) {
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

function ProductLink({ item, wordStyle }: { item: MenuItem; wordStyle: any }) {
  const isCombinedProduct = item.title === "Tarayıcılar ve Fırınlar";

  return (
    <a href={href(item.href)} className={`tmh-mega-link${isCombinedProduct ? " tmh-mega-link-combined" : ""}`}>
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

  if (cleanId === "sebep" || cleanId === "sorun") {
    return document.querySelector("#sebep, #sorun, .three-mash-problem, .tmproblem-head, .tmproblem");
  }
  if (cleanId === "cozum") {
    return document.querySelector("#cozum, .three-mash-solution, .tmr-solution, .tmr-head");
  }
  if (cleanId === "kurleme") {
    return document.querySelector("#kurleme, .three-mash-curing, .tmr-curing");
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
  if (cleanId === "iletisim-cta") {
    return document.querySelector("#iletisim-cta, .three-mash-final, .tmr-final");
  }
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

  if (fallback === "/" || slug === "sorun" || slug === "sebep" || slug === "piyasada-yaygin-kurulum-250-500") return "/#sebep";
  if (slug === "cozum") return "/#cozum";
  if (slug === "kurleme" || slug === "neden-gerekli") return "/#kurleme";
  if (slug === "iletisim-cta" || slug === "kritik-son-adim" || slug === "son-adim") return "/#iletisim-cta";
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

  const sectionId = decodeURIComponent(url.hash.slice(1)).trim();
  event.preventDefault();
  event.stopPropagation();
  scrollToSectionWithOffset(sectionId);
}

function Logo({ props }: { props: any }) {
  const { logoText, logoHref, logoImageAlt } = props;
  const logoImage = threeMashHeaderLogoImage;

  return (
    <a className="tmh-logo" href={headerRouteHref(logoHref, "/")} aria-label={logoText}>
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

export function ThreeMashHeaderV2(props: any) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>(null);
  const [activeAction, setActiveAction] = useState<ActiveAction>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const [cart, setCart] = useState<IkasCart | null>(
  () => getCurrentCart()
);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(customerStore.customer));
  const [removingCartItemId, setRemovingCartItemId] = useState("");
  const [productsMenuLeft, setProductsMenuLeft] = useState<number | null>(null);
  const [whyMenuLeft, setWhyMenuLeft] = useState<number | null>(null);
  const [productAnnouncement, setProductAnnouncement] = useState<HeaderAnnouncementOverride | null>(() => currentProductAnnouncement());
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
const cartItems =
  cart?.orderLineItems?.filter(
    (item) =>
      !item.deleted &&
      Number(item.quantity || 0) > 0
  ) || []; const cartItemCount = cartItems.reduce((total, item) => total + Number(item.quantity || 0), 0);
  const visibleCartItems = cartItems.slice(0, 4);
  const productsMenuText = tProp(props.productsMenuText, defaultProductsMenuText, "Products");
  const whyMenuText = tProp(props.whyMenuText, defaultWhyMenuText, "Why 3mash?");
  const referencesText = tProp(props.referencesText, defaultReferencesText, "References");
  const academyText = tProp(props.academyText, defaultAcademyText, "Academy");
  const mobileMenuLabel = tProp(props.mobileMenuLabel, defaultMobileMenuLabel, "Menu");
  const rawAnnHighlight = productAnnouncement?.highlightText ?? props.announcementHighlightText;
  const rawAnnText = productAnnouncement?.text ?? props.announcementText;
  const rawAnnCta = productAnnouncement?.ctaText ?? props.announcementCtaText;
  const announcementHighlightText = tProp(rawAnnHighlight, defaultAnnouncement.highlightText, "⚡ Don't miss out.");
  const announcementText = tProp(rawAnnText, defaultAnnouncement.text, "Calculate your clinic's silent loss in 30 seconds; see how to reduce it with a free analysis.");
  const announcementCtaText = tProp(rawAnnCta, defaultAnnouncement.ctaText, "Calculate now");
  const announcementHref = productAnnouncement?.href ?? props.announcementHref;
  const effectiveAnnouncementHref = currentRouteKey() === "3d-yazicilar" ? "#karsilastirma-tablosu" : announcementHref;
  const productsCol1Title = tProp(props.productsCol1Title, "ÜRETİM", "PRODUCTION");
  const productsCol2Title = tProp(props.productsCol2Title, "TAMAMLAYICI", "COMPLEMENTARY");
  const productsFeatureEyebrow = tProp(props.productsFeatureEyebrow, defaultProductsFeature.eyebrow, "FEATURED");
  const productsFeatureTitle = tProp(props.productsFeatureTitle, defaultProductsFeature.title, "MASH C4P Smart Curing Unit");
  const productsFeatureDescription = tProp(props.productsFeatureDescription, defaultProductsFeature.description, "Automatic curing tailored to resin. Eliminates user error from outcome quality.");
  const productsFeatureCtaText = tProp(props.productsFeatureCtaText, defaultProductsFeature.ctaText, "Explore");
  const mobileSearchHref = searchPageHref(props.searchHref);
  const productPrimary: MenuItem[] = [
    {
      title: tProp(props.product1Title, defaultProductPrimary[0].title, "3D Printers"),
      description: tProp(props.product1Description, defaultProductPrimary[0].description, "MASH P1D (385 nm DLP) · P16L — ±20µm accuracy"),
      href: productRouteHref(props.product1Href, defaultProductPrimary[0].href),
      icon: ecoPrinterIcon,
    },
    {
      title: tLocalized(defaultProductPrimary[1].title, "Desktop Scanners"),
      description: tLocalized(defaultProductPrimary[1].description, "Lab-speed digital impressions with 3Shape E Series"),
      href: defaultProductPrimary[1].href,
      icon: ecoScannerIcon,
    },
    {
      title: tLocalized(defaultProductPrimary[2].title, "Wash & Cure"),
      description: tLocalized(defaultProductPrimary[2].description, "MASH C4P · W1E · Creality UW02 post-processing"),
      href: defaultProductPrimary[2].href,
      icon: ecoCuringIcon,
    },
  ];

  const productSecondary: MenuItem[] = [
    {
      title: tLocalized(defaultProductSecondary[0].title, "Dental Resins"),
      description: tLocalized(defaultProductSecondary[0].description, "CRS Composite Resin — biocompatible & high strength"),
      href: defaultProductSecondary[0].href,
      icon: ecoResinIcon,
    },
    {
      title: tProp(props.product5Title, defaultProductSecondary[1].title, "Zirconia Blocks"),
      description: tProp(props.product5Description, defaultProductSecondary[1].description, "Multilayer blocks with balanced esthetics & strength"),
      href: productRouteHref(props.product5Href, defaultProductSecondary[1].href),
      icon: ecoBlocksIcon,
    },
    {
      title: tLocalized(defaultProductSecondary[2].title, "Dental Furnaces"),
      description: tLocalized(defaultProductSecondary[2].description, "Nabertherm sintering and porcelain furnaces"),
      href: defaultProductSecondary[2].href,
      icon: ecoCuringIcon,
    },
  ];

  const whyItems: FlowItem[] = [
    {
      number: text(props.why1Number, "01"),
      title: tProp(props.why1Title, "Yılda $126K'ya varan görünmez kayıp", "Up to $126K invisible loss per year"),
      description: tProp(props.why1Description, "Tekrarlanan işlerin kliniğinize gerçek maliyeti", "The real cost of remake jobs to your clinic"),
      href: "/",
    },
    {
      number: text(props.why2Number, "02"),
      title: tProp(props.why2Title, "Sebep: ölçüsel hassasiyet", "Cause: dimensional accuracy"),
      description: tProp(props.why2Description, "250–500µm sapma bandı vs ±20µm güvenli bölge", "250–500µm deviation band vs ±20µm safe zone"),
      href: whyMenuHref("/#sebep"),
    },
    {
      number: text(props.why3Number, "03"),
      title: tProp(props.why3Title, "Çözüm: uyumlu ekosistem", "Solution: compatible ecosystem"),
      description: tProp(props.why3Description, "Yazıcı + reçine + parametre bilgisi, birlikte kalibre", "Printer + resin + parameter knowledge, calibrated together"),
      href: whyMenuHref("/#cozum"),
    },
    {
      number: text(props.why4Number, "04"),
      title: tProp(props.why4Title, "Ve kürleme — son %20'lik fark", "And curing — the final 20% difference"),
      description: tProp(props.why4Description, "Doğru basılan iş, yanlış kürlenirse yine başarısız olur", "Correctly printed jobs still fail if incorrectly cured"),
      href: whyMenuHref("/#kurleme"),
    },
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

  const profileLinks = [
    {
      label: richTextValue(
        props.profileLink1Text,
        tLocalized("Siparişlerim", "My Orders")
      ),
      link: headerRouteHref(
        props.profileLink1Href,
        "/account/orders"
      ),
    },
    {
      label: richTextValue(
        props.profileLink2Text,
        tLocalized("Adreslerim", "My Addresses")
      ),
      link: headerRouteHref(
        props.profileLink2Href,
        "/account/addresses"
      ),
    },
    {
      label: richTextValue(
        props.profileLink5Text,
        "Mash Academy"
      ),
      link: academyPageTarget(
        props.profileLink5Href
      ),
    },
    {
      label: richTextValue(
        props.profileLink6Text,
        tLocalized("Çıkış yap", "Sign out")
      ),
      link: headerRouteHref(
        props.profileLink6Href,
        "/account/logout"
      ),
    },
  ];
  const accountMenuTitle = tLocalized("Hesabım", "My Account");

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
        console.error("ThreeMashHeader search product list load failed", error);
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
      const sectionId = decodeURIComponent(pendingHash.slice(1));
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

  useLayoutEffect(() => {
    setProductAnnouncement(currentProductAnnouncement());

    function handleProductAnnouncement(event: Event) {
      setProductAnnouncement(announcementOverridePayload((event as CustomEvent).detail) || routeAnnouncementOverride());
    }

    window.addEventListener("three-mash:product-announcement", handleProductAnnouncement);
    return () => window.removeEventListener("three-mash:product-announcement", handleProductAnnouncement);
  }, []);


 useEffect(() => {
  const unsubscribe = subscribeCart(
    (nextCart) => {
      setCart(nextCart);
    }
  );

  void initGlobalCart();

  return unsubscribe;
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

      if (!hash || hash.length <= 1) return;
      const sectionId = decodeURIComponent(hash.slice(1));
      const section = document.getElementById(sectionId) || document.querySelector(hash);
      if (!section || !samePath && !document.getElementById(sectionId)) return;

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
      {/* Preconnect to Google Fonts to reduce render-blocking font load time */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <style dangerouslySetInnerHTML={{ __html: criticalHeaderCss }} />
      <>
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
          <script dangerouslySetInnerHTML={{ __html: firstPaintAnnouncementScript() }} />
      </>

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
                    <ProductLink item={productSecondary[0]} wordStyle={props} />
                    <ProductLink item={productSecondary[1]} wordStyle={props} />
                    <ProductLink item={productSecondary[2]} wordStyle={props} />
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
 {cartItemCount > 0 ? (
  <span className="tmh-cart-badge">
    {cartItemCount}
  </span>
) : null}         </button>
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
                      <a className="tmh-cart-market-button tmh-cart-go-button" href="/cart">{tLocalized("Sepete git", "Go to Cart")}</a>
                    </div>
                  ) : (
                    <div className="tmh-cart-empty-card">
                      <a
                        className="tmh-cart-market-button"
                        href="/search"
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
