import ThreeMashCategoryLanding from "../../sub-components/ThreeMashCategoryLanding";
import { dentalFurnacesCategoryData, dentalResinsCategoryData, desktopScannersCategoryData, printerSparePartsCategoryData, printersCategoryData, systemsCategoryData, titaniumDiscsCategoryData, washCureCategoryData, zirconBlocksCategoryData, categoryLandingDataFromKey } from "../../sub-components/ThreeMashCategoryLanding/presets";
import ThreeMashPrintersSourceLanding from "../../sub-components/ThreeMashPrintersSourceLanding";
import { ThreeMashProductsPage } from "../ThreeMashProductsPage";
import { listingProps } from "../ThreeMashProductListingPresets";
import { getProductHref } from "@ikas/bp-storefront";
import type { Props } from "./types";

function stringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function decodeText(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function normalizedSlug(value: unknown) {
  return decodeText(stringValue(value))
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const PRINTER_PRODUCT_KEYS = new Set([
  "mash-p16l-385nm-16k-dental-3d-yazici",
  "mash-curie-m1-dental-3d-yazici",
  "creality-halot-sky-6k",
  "mash-p16l",
  "mash-curie-m1",
  "creality-halot-sky-6k",
]);

const RESIN_PRODUCT_KEYS = new Set([
  "crs-composite-mukemmel-dayanimli-gecici-recinesi",
  "crs-model-yuksek-hassasiyetli-model-recinesi",
  "crs-denture-biouyumlu-protez-recinesi",
  "crs-gingiva-yirtilmaz-dis-eti-recinesi",
  "crs-splint-hard-resin-sert-gece-plagi-recinesi",
  "crs-splint-soft-resin-dental-splint-gece-plak-recinesi",
  "crs-aligner-memory-shape-ozellikli-aligner-recinesi",
  "crs-ibt-resin-ortodontik-ibt-recinesi",
  "guide-resin-kilavuz-recinesi-biyouyumlu-cerrahi-rehber",
  "crs-cast-cekmeyen-dokum-recinesi",
  "crs-flexit-recin-protez-recinesi",
  "crs-tray-resin-olcu-kasigi-3d-yazici-recinesi",
  "mash-study-resin-dental-model-3d-yazici-recinesi",
  "mash-trial-white-resin-gecici-dental-recinesi",
  "mash-trial-pink-resin-dental-try-in-gecici-recinesi",
  "mash-clear-resin-dental-cerrahi-kilavuz-recinesi",
  "crs-composite",
  "crs-model",
  "crs-denture",
  "crs-gingiva",
  "crs-splint-hard",
  "crs-splint-soft",
  "crs-aligner",
  "crs-ibt",
  "crs-guide",
  "crs-cast",
  "crs-flexit",
  "crs-tray",
  "mash-study",
  "mash-trial-white",
  "mash-trial-pink",
  "mash-clear",
]);

const WASH_CURE_PRODUCT_KEYS = new Set([
  "creality-washcure-uw-02",
  "creality-washcure-uw-03",
  "creality-wash-cure-uw-02",
  "creality-wash-cure-uw-03",
  "creality-washcure-uw-03",
]);

const ZIRCON_PRODUCT_KEYS = new Set([
  "argenz-ht-plus-zirkon-blok",
  "argenz-st-multilayer-zirkon-blok",
  "argenz-ht-multilayer-zirkon-blok",
  "argenz-ht-plus",
  "argenz-st-multilayer",
  "argenz-ht-multilayer",
]);

const FURNACE_PRODUCT_KEYS = new Set([
  "naberthem-lht-02-17-lb-speed",
  "naberthem-lht-01-16-turbo-fire",
  "naberthem-vl-01-12-lb-press-firini",
  "naberthem-vl-01-12-lb-pres-firini",
  "naberthem-vl-01-12-lb-porselen-firini",
]);

const SCANNER_PRODUCT_KEYS = new Set([
  "3shape-e2",
  "3shape-e3",
  "3shape-e4",
  "e2-yuksek-uretkenlik",
  "implant-bar-dogrulugu",
  "hiz-ve-hassasiyet",
]);

const SPARE_PRODUCT_KEYS = new Set([
  "mash-p16l-ana-kart",
  "mash-p16l-16k-monokrom-lcd-ekran-yedek-parca",
  "mash-p16l-kucuk-hizli-baski-tablasi",
  "mash-p16l-kucuk-baski-tablasi",
  "mash-p16l-buyuk-baski-tablasi-211x118mm",
  "mash-p16l-recine-tanki-800ml",
  "seffaf-fep-film-3d-yazici",
  "seffaf-acf-film",
  "acf-film",
  "piocreat-c01-lcd-ekran-kiti",
  "creality-halot-sky-lcd-ekran-kiti-6k-mono",
]);

const SYSTEM_PRODUCT_KEYS = new Set([
  "trasformer-comp-flow-siringa-kompozit",
  "trasformer-light-glass-mufla-sistemi",
  "trasformer-comp-flow",
  "trasformer-light-glass",
]);

const TITANIUM_PRODUCT_KEYS = new Set([
  "mesa-grade-5-eli-titanyum-disk",
  "mesa-grade-5-eli",
  "mesa-titanyum-disk",
]);

function lastPathKey(value: unknown) {
  const text = stringValue(value);
  if (!text) return "";
  try {
    const url = new URL(text, typeof window !== "undefined" ? window.location.origin : "https://3mash.com");
    const parts = url.pathname.split("/").filter(Boolean);
    return normalizedSlug(parts[parts.length - 1] || url.pathname);
  } catch {
    return normalizedSlug(text);
  }
}

function metaSignals(entity: Record<string, unknown> | null | undefined) {
  if (!entity || typeof entity !== "object") return [];
  const metaData = entity.metaData && typeof entity.metaData === "object" ? (entity.metaData as Record<string, unknown>) : null;
  return [
    entity.name,
    metaData?.slug,
    metaData?.pageTitle,
    ...(Array.isArray(metaData?.canonicals) ? metaData.canonicals : []),
  ].filter(Boolean);
}

function categoryDataFromCategory(category: unknown) {
  if (!category || typeof category !== "object") return null;
  const data = category as Record<string, unknown>;
  const signals = [
    ...metaSignals(data),
    ...(Array.isArray(data.categoryPath) ? data.categoryPath : []),
    ...(Array.isArray(data.categoryPathItems) ? data.categoryPathItems.flatMap((item) => metaSignals(item as Record<string, unknown>)) : []),
  ];

  for (const signal of signals) {
    const matched = categoryLandingDataFromKey(stringValue(signal));
    if (matched) return matched;
  }
  return null;
}

function productDataFromProduct(product: unknown) {
  if (!product || typeof product !== "object") return null;
  const data = product as Record<string, unknown>;
  const productKeys = [data.name, ...metaSignals(data)];

  try {
    productKeys.push(getProductHref(data as Parameters<typeof getProductHref>[0]));
  } catch {
    // Product href is optional in Studio preview data.
  }

  for (const value of productKeys) {
    const key = lastPathKey(value);
    if (PRINTER_PRODUCT_KEYS.has(key)) return printersCategoryData;
    if (RESIN_PRODUCT_KEYS.has(key)) return dentalResinsCategoryData;
    if (WASH_CURE_PRODUCT_KEYS.has(key)) return washCureCategoryData;
    if (ZIRCON_PRODUCT_KEYS.has(key)) return zirconBlocksCategoryData;
    if (FURNACE_PRODUCT_KEYS.has(key)) return dentalFurnacesCategoryData;
    if (SCANNER_PRODUCT_KEYS.has(key)) return desktopScannersCategoryData;
    if (SPARE_PRODUCT_KEYS.has(key)) return printerSparePartsCategoryData;
    if (SYSTEM_PRODUCT_KEYS.has(key)) return systemsCategoryData;
    if (TITANIUM_PRODUCT_KEYS.has(key)) return titaniumDiscsCategoryData;
  }

  const categories = Array.isArray(data.categories) ? data.categories : [];
  for (const category of categories) {
    const matched = categoryDataFromCategory(category);
    if (matched) return matched;
  }

  return null;
}

function productListCategoryData(productList: Props["productList"]) {
  if (!productList) return null;

  const directCategory =
    categoryDataFromCategory(productList.category) ||
    categoryDataFromCategory(productList.pageSpecificData) ||
    categoryLandingDataFromKey(productList.productListPropValue?.category || undefined);

  if (directCategory) return directCategory;

  let printerMatches = 0;
  let resinMatches = 0;
  let washCureMatches = 0;
  let zirconMatches = 0;
  let furnaceMatches = 0;
  let scannerMatches = 0;
  let spareMatches = 0;
  let systemMatches = 0;
  let titaniumMatches = 0;

  (productList.data || []).slice(0, 24).forEach((product) => {
    const data = productDataFromProduct(product);
    if (data === printersCategoryData) printerMatches += 1;
    if (data === dentalResinsCategoryData) resinMatches += 1;
    if (data === washCureCategoryData) washCureMatches += 1;
    if (data === zirconBlocksCategoryData) zirconMatches += 1;
    if (data === dentalFurnacesCategoryData) furnaceMatches += 1;
    if (data === desktopScannersCategoryData) scannerMatches += 1;
    if (data === printerSparePartsCategoryData) spareMatches += 1;
    if (data === systemsCategoryData) systemMatches += 1;
    if (data === titaniumDiscsCategoryData) titaniumMatches += 1;
  });

  const otherMatches = {
    printer: resinMatches + washCureMatches + zirconMatches + furnaceMatches + scannerMatches + spareMatches + systemMatches + titaniumMatches,
    resin: printerMatches + washCureMatches + zirconMatches + furnaceMatches + scannerMatches + spareMatches + systemMatches + titaniumMatches,
    washCure: printerMatches + resinMatches + zirconMatches + furnaceMatches + scannerMatches + spareMatches + systemMatches + titaniumMatches,
    zircon: printerMatches + resinMatches + washCureMatches + furnaceMatches + scannerMatches + spareMatches + systemMatches + titaniumMatches,
    furnace: printerMatches + resinMatches + washCureMatches + zirconMatches + scannerMatches + spareMatches + systemMatches + titaniumMatches,
    scanner: printerMatches + resinMatches + washCureMatches + zirconMatches + furnaceMatches + spareMatches + systemMatches + titaniumMatches,
    spare: printerMatches + resinMatches + washCureMatches + zirconMatches + furnaceMatches + scannerMatches + systemMatches + titaniumMatches,
    system: printerMatches + resinMatches + washCureMatches + zirconMatches + furnaceMatches + scannerMatches + spareMatches + titaniumMatches,
    titanium: printerMatches + resinMatches + washCureMatches + zirconMatches + furnaceMatches + scannerMatches + spareMatches + systemMatches,
  };

  if (printerMatches > 0 && otherMatches.printer === 0) return printersCategoryData;
  if (resinMatches > 0 && otherMatches.resin === 0) return dentalResinsCategoryData;
  if (washCureMatches > 0 && otherMatches.washCure === 0) return washCureCategoryData;
  if (zirconMatches > 0 && otherMatches.zircon === 0) return zirconBlocksCategoryData;
  if (furnaceMatches > 0 && otherMatches.furnace === 0) return dentalFurnacesCategoryData;
  if (scannerMatches > 0 && otherMatches.scanner === 0) return desktopScannersCategoryData;
  if (spareMatches > 0 && otherMatches.spare === 0) return printerSparePartsCategoryData;
  if (systemMatches > 0 && otherMatches.system === 0) return systemsCategoryData;
  if (titaniumMatches > 0 && otherMatches.titanium === 0) return titaniumDiscsCategoryData;
  return null;
}

function addRouteSignals(urlLike: string | undefined, signals: string[]) {
  if (!urlLike) return;
  signals.push(urlLike);

  try {
    const url = new URL(urlLike, typeof window !== "undefined" ? window.location.origin : "https://3mash.com");
    signals.push(url.pathname);
    url.pathname.split("/").filter(Boolean).forEach((part) => signals.push(part));
    url.searchParams.forEach((value) => signals.push(value));
  } catch {
    // Plain paths are valid route signals.
  }
}

function currentRouteCategoryData() {
  if (typeof window === "undefined") return null;
  const signals: string[] = [];

  addRouteSignals(window.location.href, signals);
  addRouteSignals(window.location.pathname, signals);

  try {
    document
      .querySelectorAll('link[rel="canonical"], meta[property="og:url"], meta[property="og:title"], meta[name="twitter:title"]')
      .forEach((node) => {
        const value = node instanceof HTMLMetaElement ? node.content : node.getAttribute("href") || "";
        addRouteSignals(value, signals);
      });
  } catch {
    // DOM metadata is optional.
  }

  try {
    if (window.parent && window.parent !== window) {
      addRouteSignals(window.parent.location.href, signals);
      addRouteSignals(window.parent.location.pathname, signals);
    }
  } catch {
    // Studio preview can be cross-origin.
  }

  for (const signal of signals) {
    const matched = categoryLandingDataFromKey(signal);
    if (matched) return matched;
  }
  return null;
}

export function ThreeMashCategoryProductsPage(props: Props) {
  const productListCategory = productListCategoryData(props.productList);
  const routeCategoryData = currentRouteCategoryData();
  const detectedCategoryData = productListCategory || routeCategoryData;

  if (detectedCategoryData === printersCategoryData) {
    return <ThreeMashPrintersSourceLanding {...props} />;
  }

  if (detectedCategoryData) {
    return <ThreeMashCategoryLanding {...props} data={detectedCategoryData} productList={props.productList} />;
  }

  return (
    <ThreeMashProductsPage
      {...listingProps(props, {
        eyebrowText: "ÜRÜN KATEGORİSİ",
        titleText: "",
        descriptionText: "Bu kategoriye ait güncel ürünleri tek yerden inceleyin.",
        showSort: false,
      })}
    />
  );
}

export default ThreeMashCategoryProductsPage;
