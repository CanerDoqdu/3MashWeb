import { useEffect, useLayoutEffect, useMemo, useState } from "preact/hooks";
import {
  apiSearchProducts,
  createMediaSrcset,
  getDefaultSrc,
  getProductHref,
  getProductVariantFormattedFinalPrice,
  getProductVariantMainImage,
  getSelectedProductVariant,
  type IkasImage,
  type IkasProduct,
  type IkasProductList,
  type IkasProductVariant,
} from "@ikas/bp-storefront";
import { tLocalized, isEnglishLocale, translateText, localizedHref } from "../../utils/i18n";
import { safeDecodeURI } from "../../utils/safeDecodeURI";
import { safeRedirect } from "../../utils/safeRedirect";
import { sanitizeHtml } from "../../utils/sanitizeHtml";

export type CategoryButton = {
  label: string;
  href: string;
  variant?: "lime" | "line" | "dark" | "inverse";
};

export type CategoryMetric = {
  value: string;
  emphasis?: string;
  label: string;
};

export type CategoryFilter = {
  id: string;
  label: string;
};

export type CategoryProductSpec = {
  label: string;
  value: string;
};

export type CategoryProductCard = {
  title: string;
  descriptionHtml: string;
  href: string;
  imageSrc?: string;
  imageAlt?: string;
  sourceIcon?: boolean;
  filterId?: string;
  tag?: string;
  status?: string;
  hot?: boolean;
  tone?: string;
  specs?: CategoryProductSpec[];
};

export type CategoryCompareColumn = {
  title: string;
  subtitle?: string;
};

export type CategoryCompareRow = {
  label: string;
  values: string[];
};

export type CategoryFeature = {
  eyebrow: string;
  titlePrefix: string;
  titleEmphasis: string;
  titleSuffix?: string;
  descriptionHtml: string;
  href: string;
  ctaText: string;
  specs: CategoryProductSpec[];
};

export type CategoryLineCard = {
  marker: string;
  title: string;
  descriptionHtml: string;
  items: string[];
  variant?: "accent" | "plain";
};

export type CategoryWhyCard = {
  number: string;
  title: string;
  descriptionHtml: string;
};

export type CategoryCallout = {
  titlePrefix: string;
  titleEmphasis: string;
  titleSuffix?: string;
  descriptionHtml: string;
  buttons: CategoryButton[];
};

export type CategoryFaq = {
  question: string;
  answerHtml: string;
};

export type CategorySectionHead = {
  number: string;
  label: string;
  titlePrefix: string;
  titleEmphasis: string;
  titleSuffix?: string;
  sideHtml: string;
};

export type CategoryLandingData = {
  kind: "resins" | "printers" | "wash-cure" | "washing" | "curing" | "zircon" | "furnaces" | "scanners" | "spares" | "systems" | "titanium";
  announcement: {
    highlight: string;
    text: string;
    href: string;
    ctaText: string;
  };
  breadcrumb: {
    homeLabel: string;
    homeHref: string;
    parentLabel: string;
    parentHref?: string;
    currentLabel: string;
    currentHref?: string;
  };
  hero: {
    titlePrefix: string;
    titleEmphasis: string;
    titleSuffix?: string;
    descriptionHtml: string;
    buttons: CategoryButton[];
    metrics: CategoryMetric[];
  };
  selector: CategorySectionHead & {
    anchorId: string;
    cardCtaText: string;
    filters?: CategoryFilter[];
    products: CategoryProductCard[];
    emptyMessageHtml?: string;
    compare?: {
      columns: CategoryCompareColumn[];
      rows: CategoryCompareRow[];
      noteHtml?: string;
    };
  };
  feature: {
    number: string;
    label: string;
    content: CategoryFeature;
  };
  detail: CategorySectionHead & {
    lineCards?: CategoryLineCard[];
    whyCards?: CategoryWhyCard[];
    callout?: CategoryCallout;
  };
  faq: {
    number: string;
    label: string;
    title: string;
    sideHtml: string;
    items: CategoryFaq[];
  };
  finalCta: {
    titlePrefix: string;
    titleEmphasis: string;
    titleSuffix?: string;
    descriptionHtml: string;
    buttons: CategoryButton[];
  };
};

export type CategoryLandingOverrides = {
  [key: string]: unknown;
  showAnnouncement?: boolean;
  showHero?: boolean;
  showMetrics?: boolean;
  showSelector?: boolean;
  showFeature?: boolean;
  showDetail?: boolean;
  showFaq?: boolean;
  showFinalCta?: boolean;
  breadcrumbHomeLabel?: string;
  breadcrumbHomeLabelEn?: string;
  breadcrumbHomeHref?: string;
  breadcrumbParentLabel?: string;
  breadcrumbParentLabelEn?: string;
  breadcrumbParentHref?: string;
  breadcrumbCurrentLabel?: string;
  breadcrumbCurrentLabelEn?: string;
  printerP16lImage?: IkasImage | null;
  printerCurieImage?: IkasImage | null;
  printerHalotImage?: IkasImage | null;
  printerP16lImageAlt?: string;
  printerP16lImageAltEn?: string;
  printerCurieImageAlt?: string;
  printerCurieImageAltEn?: string;
  printerHalotImageAlt?: string;
  printerHalotImageAltEn?: string;

  // announcement
  eyebrowText?: string;
  announcementText?: string;
  announcementCtaText?: string;
  announcementHref?: string;

  // hero
  heroTitlePrefix?: string;
  heroTitleEmphasis?: string;
  heroTitleSuffix?: string;
  heroDescriptionHtml?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;

  // metrics
  metric1Value?: string;
  metric1Emphasis?: string;
  metric1Label?: string;
  metric2Value?: string;
  metric2Emphasis?: string;
  metric2Label?: string;
  metric3Value?: string;
  metric3Emphasis?: string;
  metric3Label?: string;
  metric4Value?: string;
  metric4Emphasis?: string;
  metric4Label?: string;

  // selector
  selectorNumber?: string;
  selectorLabel?: string;
  selectorTitlePrefix?: string;
  selectorTitleEmphasis?: string;
  selectorTitleSuffix?: string;
  selectorSideHtml?: string;
  selectorSideHtmlEn?: string;
  selectorFilter1Label?: string;
  selectorFilter1LabelEn?: string;
  selectorFilter2Label?: string;
  selectorFilter2LabelEn?: string;
  selectorFilter3Label?: string;
  selectorFilter3LabelEn?: string;
  selectorFilter4Label?: string;
  selectorFilter4LabelEn?: string;
  selectorFilter5Label?: string;
  selectorFilter5LabelEn?: string;
  selectorFilter6Label?: string;
  selectorFilter6LabelEn?: string;
  selectorFilter7Label?: string;
  selectorFilter7LabelEn?: string;
  selectorCardCtaText?: string;
  selectorProduct1Title?: string;
  selectorProduct1TitleEn?: string;
  selectorProduct1Href?: string;
  selectorProduct1Image?: IkasImage | null;
  selectorProduct1ImageAlt?: string;
  selectorProduct1ImageAltEn?: string;
  selectorProduct1DescriptionHtml?: string;
  selectorProduct1DescriptionHtmlEn?: string;
  selectorProduct1Visible?: boolean;
  selectorProduct1Tag?: string;
  selectorProduct1TagEn?: string;
  selectorProduct1Spec1Label?: string;
  selectorProduct1Spec1LabelEn?: string;
  selectorProduct1Spec1Value?: string;
  selectorProduct1Spec1ValueEn?: string;
  selectorProduct1Spec2Label?: string;
  selectorProduct1Spec2LabelEn?: string;
  selectorProduct1Spec2Value?: string;
  selectorProduct1Spec2ValueEn?: string;
  selectorProduct1Spec3Label?: string;
  selectorProduct1Spec3LabelEn?: string;
  selectorProduct1Spec3Value?: string;
  selectorProduct1Spec3ValueEn?: string;
  selectorProduct2DescriptionHtml?: string;
  selectorProduct2Title?: string;
  selectorProduct2TitleEn?: string;
  selectorProduct2Href?: string;
  selectorProduct2Image?: IkasImage | null;
  selectorProduct2ImageAlt?: string;
  selectorProduct2ImageAltEn?: string;
  selectorProduct2DescriptionHtmlEn?: string;
  selectorProduct2Visible?: boolean;
  selectorProduct2Tag?: string;
  selectorProduct2TagEn?: string;
  selectorProduct2Spec1Label?: string;
  selectorProduct2Spec1LabelEn?: string;
  selectorProduct2Spec1Value?: string;
  selectorProduct2Spec1ValueEn?: string;
  selectorProduct2Spec2Label?: string;
  selectorProduct2Spec2LabelEn?: string;
  selectorProduct2Spec2Value?: string;
  selectorProduct2Spec2ValueEn?: string;
  selectorProduct2Spec3Label?: string;
  selectorProduct2Spec3LabelEn?: string;
  selectorProduct2Spec3Value?: string;
  selectorProduct2Spec3ValueEn?: string;
  selectorProduct3DescriptionHtml?: string;
  selectorProduct3Title?: string;
  selectorProduct3TitleEn?: string;
  selectorProduct3Href?: string;
  selectorProduct3Image?: IkasImage | null;
  selectorProduct3ImageAlt?: string;
  selectorProduct3ImageAltEn?: string;
  selectorProduct3DescriptionHtmlEn?: string;
  selectorProduct3Visible?: boolean;
  selectorProduct3Tag?: string;
  selectorProduct3TagEn?: string;
  selectorProduct3Spec1Label?: string;
  selectorProduct3Spec1LabelEn?: string;
  selectorProduct3Spec1Value?: string;
  selectorProduct3Spec1ValueEn?: string;
  selectorProduct3Spec2Label?: string;
  selectorProduct3Spec2LabelEn?: string;
  selectorProduct3Spec2Value?: string;
  selectorProduct3Spec2ValueEn?: string;
  selectorProduct3Spec3Label?: string;
  selectorProduct3Spec3LabelEn?: string;
  selectorProduct3Spec3Value?: string;
  selectorProduct3Spec3ValueEn?: string;
  selectorCompareColumn1Title?: string;
  selectorCompareVisible?: boolean;
  selectorCompareColumn1TitleEn?: string;
  selectorCompareColumn2Title?: string;
  selectorCompareColumn2TitleEn?: string;
  selectorCompareColumn2Subtitle?: string;
  selectorCompareColumn2SubtitleEn?: string;
  selectorCompareColumn3Title?: string;
  selectorCompareColumn3TitleEn?: string;
  selectorCompareColumn3Subtitle?: string;
  selectorCompareColumn3SubtitleEn?: string;
  selectorCompareColumn4Title?: string;
  selectorCompareColumn4TitleEn?: string;
  selectorCompareColumn1Subtitle?: string;
  selectorCompareColumn1SubtitleEn?: string;
  selectorCompareColumn4Subtitle?: string;
  selectorCompareColumn4SubtitleEn?: string;
  selectorCompareRow1Label?: string;
  selectorCompareRow1LabelEn?: string;
  selectorCompareRow1Value1?: string;
  selectorCompareRow1Value1En?: string;
  selectorCompareRow1Value2?: string;
  selectorCompareRow1Value2En?: string;
  selectorCompareRow1Value3?: string;
  selectorCompareRow1Value3En?: string;
  selectorCompareRow2Label?: string;
  selectorCompareRow2LabelEn?: string;
  selectorCompareRow2Value1?: string;
  selectorCompareRow2Value1En?: string;
  selectorCompareRow2Value2?: string;
  selectorCompareRow2Value2En?: string;
  selectorCompareRow2Value3?: string;
  selectorCompareRow2Value3En?: string;
  selectorCompareRow3Label?: string;
  selectorCompareRow3LabelEn?: string;
  selectorCompareRow3Value1?: string;
  selectorCompareRow3Value1En?: string;
  selectorCompareRow3Value2?: string;
  selectorCompareRow3Value2En?: string;
  selectorCompareRow3Value3?: string;
  selectorCompareRow3Value3En?: string;
  selectorCompareRow4Label?: string;
  selectorCompareRow4LabelEn?: string;
  selectorCompareRow4Value1?: string;
  selectorCompareRow4Value1En?: string;
  selectorCompareRow4Value2?: string;
  selectorCompareRow4Value2En?: string;
  selectorCompareRow4Value3?: string;
  selectorCompareRow4Value3En?: string;
  selectorCompareRow5Label?: string;
  selectorCompareRow5LabelEn?: string;
  selectorCompareRow5Value1?: string;
  selectorCompareRow5Value1En?: string;
  selectorCompareRow5Value2?: string;
  selectorCompareRow5Value2En?: string;
  selectorCompareRow5Value3?: string;
  selectorCompareRow5Value3En?: string;
  selectorCompareRow6Label?: string;
  selectorCompareRow6LabelEn?: string;
  selectorCompareRow6Value1?: string;
  selectorCompareRow6Value1En?: string;
  selectorCompareRow6Value2?: string;
  selectorCompareRow6Value2En?: string;
  selectorCompareRow6Value3?: string;
  selectorCompareRow6Value3En?: string;
  selectorCompareRow7Label?: string;
  selectorCompareRow7LabelEn?: string;
  selectorCompareRow7Value1?: string;
  selectorCompareRow7Value1En?: string;
  selectorCompareRow7Value2?: string;
  selectorCompareRow7Value2En?: string;
  selectorCompareRow7Value3?: string;
  selectorCompareRow7Value3En?: string;
  selectorCompareNoteHtml?: string;
  selectorCompareNoteHtmlEn?: string;
  addSelectorCompareTable?: boolean;

  // feature
  featureNumber?: string;
  featureLabel?: string;
  featureEyebrow?: string;
  featureTitlePrefix?: string;
  featureTitleEmphasis?: string;
  featureTitleSuffix?: string;
  featureDescriptionHtml?: string;
  featureHref?: string;
  featureCtaText?: string;

  // feature specs
  featureSpec1Label?: string;
  featureSpec1Value?: string;
  featureSpec2Label?: string;
  featureSpec2Value?: string;
  featureSpec3Label?: string;
  featureSpec3Value?: string;
  featureSpec4Label?: string;
  featureSpec4Value?: string;

  // detail
  detailNumber?: string;
  detailLabel?: string;
  detailTitlePrefix?: string;
  detailTitleEmphasis?: string;
  detailTitleSuffix?: string;
  detailSideHtml?: string;

  // detail cards
  detailCard1Title?: string;
  detailCard1DescriptionHtml?: string;
  detailCard2Title?: string;
  detailCard2DescriptionHtml?: string;
  detailCard3Title?: string;
  detailCard3DescriptionHtml?: string;
  detailCard4Title?: string;
  detailCard4DescriptionHtml?: string;
  detailCard1TitleEn?: string;
  detailCard1DescriptionHtmlEn?: string;
  detailCard2TitleEn?: string;
  detailCard2DescriptionHtmlEn?: string;
  detailCard3TitleEn?: string;
  detailCard3DescriptionHtmlEn?: string;
  detailCard4TitleEn?: string;
  detailCard4DescriptionHtmlEn?: string;
  detailLineCard1Marker?: string;
  detailLineCard1Item1?: string;
  detailLineCard1Item1En?: string;
  detailLineCard1Item2?: string;
  detailLineCard1Item2En?: string;
  detailLineCard1Item3?: string;
  detailLineCard1Item3En?: string;
  detailLineCard1Visible?: boolean;
  detailLineCard2Marker?: string;
  detailLineCard2Item1?: string;
  detailLineCard2Item1En?: string;
  detailLineCard2Item2?: string;
  detailLineCard2Item2En?: string;
  detailLineCard2Item3?: string;
  detailLineCard2Item3En?: string;
  detailLineCard2Visible?: boolean;

  // detail callout
  detailCalloutTitlePrefix?: string;
  detailCalloutTitleEmphasis?: string;
  detailCalloutTitleSuffix?: string;
  detailCalloutDescriptionHtml?: string;
  detailCalloutButton1Text?: string;
  detailCalloutButton1Href?: string;
  detailCalloutButton2Text?: string;
  detailCalloutButton2Href?: string;

  // faq header
  faqNumber?: string;
  faqLabel?: string;
  faqTitle?: string;
  faqSideHtml?: string;

  // faq items
  faq1Question?: string;
  faq1AnswerHtml?: string;
  faq2Question?: string;
  faq2AnswerHtml?: string;
  faq3Question?: string;
  faq3AnswerHtml?: string;
  faq4Question?: string;
  faq4AnswerHtml?: string;
  faq5Question?: string;
  faq5AnswerHtml?: string;

  // final CTA
  finalTitlePrefix?: string;
  finalTitleEmphasis?: string;
  finalTitleSuffix?: string;
  finalDescriptionHtml?: string;
  finalPrimaryButtonText?: string;
  finalPrimaryButtonHref?: string;
  finalSecondaryButtonText?: string;
  finalSecondaryButtonHref?: string;

  // appearance
  backgroundColor?: string;
  textColor?: string;
  mutedTextColor?: string;
  panelColor?: string;
  accentColor?: string;
  lineColor?: string;
};

interface Props extends CategoryLandingOverrides {
  data: CategoryLandingData;
  productList?: IkasProductList;
  useLiveSelectorProducts?: boolean;
}

type CategoryAnnouncementWindow = Window & {
  __THREE_MASH_PRODUCT_ANNOUNCEMENT__?: {
    enabled?: boolean;
    highlightText?: string;
    text?: string;
    ctaText?: string;
    href?: string;
  };
};

function rich(value: string) {
  return { __html: sanitizeHtml(normalizeHtmlLinks(translateText(value))) };
}

function textValue(value: string | undefined, fallback: string) {
  const trimmed = value?.trim();
  return trimmed ? translateText(trimmed) : translateText(fallback);
}

function richValue(value: string | undefined, fallback: string) {
  return value !== undefined && value.trim() ? value : fallback;
}

function localizedTextValue(value: unknown, valueEn: unknown, fallback: string) {
  const localizedValue = isEnglishLocale() ? valueEn : value;
  const text = typeof localizedValue === "string" ? localizedValue : "";
  return text.trim() ? translateText(text.trim()) : translateText(fallback);
}

function localizedHtmlValue(value: unknown, valueEn: unknown, fallback: string) {
  const localizedValue = isEnglishLocale() ? valueEn : value;
  return typeof localizedValue === "string" && localizedValue.trim() ? localizedValue : fallback;
}

function localizedTextProp(props: CategoryLandingOverrides, key: string, fallback: string) {
  const value = props[key];
  const valueEn = props[`${key}En`];
  return localizedTextValue(
    typeof value === "string" ? value : undefined,
    typeof valueEn === "string" ? valueEn : undefined,
    fallback,
  );
}

function localizedHtmlProp(props: CategoryLandingOverrides, key: string, fallback: string) {
  const value = props[key];
  const valueEn = props[`${key}En`];
  return localizedHtmlValue(
    typeof value === "string" ? value : undefined,
    typeof valueEn === "string" ? valueEn : undefined,
    fallback,
  );
}

function routeKey(value: string) {
  return value
    .trim()
    .toLocaleLowerCase("tr-TR")
    .replace(/^https?:\/\/(?:www\.)?(?:3mash\.com|studio\.ikasapps\.com)/i, "")
    .split(/[?#]/)[0]
    .replace(/\/+$/g, "")
    .replace(/^\//, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const categoryRouteAliases: Record<string, string> = {
  "resins": "/dental-3d-yazici-recineleri",
  "dental-resins": "/dental-3d-yazici-recineleri",
  "printers": "/3d-yazicilar",
  "3d-printers": "/3d-yazicilar",
  "wash-cure": tLocalized("/yikama-kurleme-cihazlari", "/yikama-kurleme-cihazlari"),
  "wash-and-cure-devices": tLocalized("/yikama-kurleme-cihazlari", "/yikama-kurleme-cihazlari"),
  "washing": tLocalized("/yikama-cihazlari", "/yikama-cihazlari"),
  "curing": tLocalized("/kurleme-cihazlari", "/kurleme-cihazlari"),
  "yikama-cihazlari": tLocalized("/yikama-cihazlari", "/yikama-cihazlari"),
  "yikama": tLocalized("/yikama-cihazlari", "/yikama-cihazlari"),
  "urunler-yikama": tLocalized("/yikama-cihazlari", "/yikama-cihazlari"),
  "urunler-yikama-cihazlari": tLocalized("/yikama-cihazlari", "/yikama-cihazlari"),
  "kurleme-cihazlari": tLocalized("/kurleme-cihazlari", "/kurleme-cihazlari"),
  "kurleme": tLocalized("/kurleme-cihazlari", "/kurleme-cihazlari"),
  "urunler-kurleme": tLocalized("/kurleme-cihazlari", "/kurleme-cihazlari"),
  "urunler-kurleme-cihazlari": tLocalized("/kurleme-cihazlari", "/kurleme-cihazlari"),
  "zircon": "/zirkon-bloklar",
  "furnaces": "/dental-firinlar",
  "dental-furnaces": "/dental-firinlar",
  "scanners": "/masasustu-tarayicilar",
  "desktop-scanners": "/masasustu-tarayicilar",
  "lab-scanners": "/masasustu-tarayicilar",
  "spares": "/3d-yazici-yedek-parcalari",
  "systems": "/sistemler",
  "titanium": "/titanyum-diskler",
  "titanium-disc": "/titanyum-diskler",
  "titanium-discs": "/titanyum-diskler",
  "titanium-diskler": "/titanyum-diskler",
  "3d-yazicilar": "/3d-yazicilar",
  "3d-yazici": "/3d-yazicilar",
  "urunler-3d-yazicilar": "/3d-yazicilar",
  "dental-3d-yazici-recineleri": "/dental-3d-yazici-recineleri",
  "dental-recineler": "/dental-3d-yazici-recineleri",
  "urunler-dental-recineler": "/dental-3d-yazici-recineleri",
  "recineler": "/dental-3d-yazici-recineleri",
  "yikama-kurleme-cihazlari": tLocalized("/yikama-kurleme-cihazlari", "/yikama-kurleme-cihazlari"),
  "yikama-kurleme": tLocalized("/yikama-kurleme-cihazlari", "/yikama-kurleme-cihazlari"),
  "urunler-yikama-kurleme": tLocalized("/yikama-kurleme-cihazlari", "/yikama-kurleme-cihazlari"),
  "masasustu-tarayicilar": "/masasustu-tarayicilar",
  "masaustu-tarayicilar": "/masasustu-tarayicilar",
  "urunler-masasustu-tarayicilar": "/masasustu-tarayicilar",
  "zirkon-bloklar": "/zirkon-bloklar",
  "zirkon-bloklar-titanyum": "/zirkon-bloklar",
  "urunler-zirkon-bloklar": "/zirkon-bloklar",
  "dental-firinlar": "/dental-firinlar",
  "firinlar": "/dental-firinlar",
  "urunler-dental-firinlar": "/dental-firinlar",
  "3d-yazici-yedek-parcalari": "/3d-yazici-yedek-parcalari",
  "yedek-parcalar": "/3d-yazici-yedek-parcalari",
  "sistemler": "/sistemler",
  "titanyum-diskler": "/titanyum-diskler",
};

// Individual product pages: TR slug (as it appears after categoryHref) -> confirmed EN path.
const englishProductRoutes: Record<string, string> = {
  "mash-p16l-385nm-16k-dental-3d-yazici": "/en/mash-p16l-385nm-16k-dental-3d-printer",
  "mash-curie-m1-dental-3d-yazici": "/en/mash-curie-m1-dental-3d-printer",
  "creality-halot-sky-6k": "/en/creality-halot-sky-6k-1",
  "mash-w1e-ultrasonik-yikama-cihazi": "/en/mash-w1e-ultrasonik-yikama-cihazi",
  "mash-c1e-uv-kurleme-cihazi": "/en/mash-c1e-uv-curing-device",
  "creality-washcure-uw-02": "/en/creality-wash-and-cure-uw-02",
  "argenz-ht-plus-zirkon-blok": "/en/argenz-ht-plus-zirconia-disc",
  "argenz-st-multilayer-zirkon-blok": "/en/argenz-st-multilayer-zirconia-disc",
  "argenz-ht-multilayer-zirkon-blok": "/en/argenz-ht-plus-multilayer-zirconia-disc",
};

// Category / listing pages: TR slug -> confirmed EN path. Confirmed against the live
// storefront nav + footer on 2026-09-20. Entries left out (spares "/sistemler",
// "/3d-yazici-yedek-parcalari", "/titanyum-diskler") have no confirmed EN slug yet —
// they fall back to localizedHref() below until confirmed, rather than guessing.
const englishCategoryRoutes: Record<string, string> = {
  "dental-3d-yazici-recineleri": "/en/dental-resins",
  "3d-yazicilar": "/en/3d-printers",
  "yikama-kurleme-cihazlari": "/en/wash-and-cure-devices",
  "masasustu-tarayicilar": "/en/lab-scanners",
  // NOTE: user said zircon/furnaces are disabled on EN, but the live footer nav links
  // to both of these — confirm before trusting the two rows below.
  "zirkon-bloklar": "/en/zircon-blocks",
  "dental-firinlar": "/en/dental-furnaces",
 
  "pages-iletisim": "/en/pages/iletisim",
  "iletisim": "/en/pages/iletisim",
};

/**
 * Single source of truth for turning any raw href (button, breadcrumb, product
 * card, or a link embedded inside rich HTML) into the href that should actually
 * be rendered, for both locales.
 *
 * Replaces the old categoryProductHref, which only applied EN routing to
 * product cards and, for unmapped routes, appended "?lang=en" to the Turkish
 * slug without ever adding the "/en/" prefix the storefront actually uses.
 */
function resolveHref(value: string): string {
  const canonical = categoryHref(value);

  const isHashOnly = canonical.startsWith("#");
  const isProtocolLink = /^[a-z][a-z0-9+.-]*:/i.test(canonical);
  if (isHashOnly || isProtocolLink) {
    return canonical;
  }

  const hashIndex = canonical.indexOf("#");
  const hash = hashIndex >= 0 ? canonical.slice(hashIndex) : "";
  const pathAndQuery = hashIndex >= 0 ? canonical.slice(0, hashIndex) : canonical;

  if (!isEnglishLocale()) {
    return `${localizedHref(pathAndQuery)}${hash}`;
  }

  const key = routeKey(pathAndQuery);
  const englishRoute = englishProductRoutes[key] || englishCategoryRoutes[key];
  if (englishRoute) return `${englishRoute}${hash}`;

  return `${localizedHref(pathAndQuery)}${hash}`;
}

function categoryHref(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "#";
  if (/^(javascript:|data:|vbscript:|file:)/i.test(trimmed)) {
    return "#";
  }
  if (/^(#|mailto:|tel:|whatsapp:)/i.test(trimmed)) {
    return trimmed || "#";
  }

  try {
    const url = new URL(trimmed);
    const isCurrentStorefront = typeof window !== "undefined" && url.origin === window.location.origin;
    const isIkasStorefront = url.hostname === "studio.ikasapps.com" || url.hostname.endsWith(".ikas.shop");
    if (!isCurrentStorefront && url.hostname !== "3mash.com" && url.hostname !== "www.3mash.com" && !isIkasStorefront) {
      return trimmed;
    }
    const route = `${url.pathname}${url.search}${url.hash}` || "/";
    const mapped = categoryRouteAliases[routeKey(route)];
    return mapped ? `${mapped}${url.search}${url.hash}` : route;
  } catch {
    const mapped = categoryRouteAliases[routeKey(trimmed)];
    return mapped || trimmed;
  }
}

function parentCategoryHref(data: CategoryLandingData) {
  const parentLabelKey = routeKey(data.breadcrumb.parentLabel || "");
  if (parentLabelKey === tLocalized("urunler", "urunler") || parentLabelKey === "products") {
    return "/search";
  }

  return categoryHref(data.breadcrumb.parentHref || "/search");
}

function smoothCategoryClick(event: MouseEvent, rawHref: string) {
  const target = categoryHref(rawHref);
  const hashIndex = target.indexOf("#");
  const hash = hashIndex >= 0 ? target.slice(hashIndex) : "";
  if (!hash || hash.length <= 1 || typeof window === "undefined") return;

  const targetPath = hashIndex > 0 ? target.slice(0, hashIndex) : "";
  const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";
  const normalizedTargetPath = targetPath ? targetPath.replace(/\/+$/, "") || "/" : currentPath;
  if (normalizedTargetPath !== currentPath) {
    event.preventDefault();
    event.stopPropagation();
    try {
      localStorage.setItem("tmcl-pending-anchor-scroll", JSON.stringify({ sectionId: safeDecodeURI(hash.slice(1)).trim(), block: "center", fromTop: true }));
    } catch {
      // Storage can be unavailable
    }
    window.location.href = safeRedirect(localizedHref(normalizedTargetPath));
    return;
  }

  const targetId = safeDecodeURI(hash.slice(1)).trim();
  const section = document.getElementById(targetId) || document.querySelector(hash);
  if (!section) return;

  event.preventDefault();
  event.stopPropagation();
  section.scrollIntoView({ behavior: "smooth", block: "start" });
}

function consumePendingAnchorScroll() {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem("tmcl-pending-anchor-scroll");
    if (!raw) return null;
    localStorage.removeItem("tmcl-pending-anchor-scroll");
    const parsed = JSON.parse(raw) as { sectionId?: unknown; block?: unknown };
    const sectionId = typeof parsed.sectionId === "string" ? parsed.sectionId : "";
    const block: ScrollLogicalPosition = parsed.block === "center" || parsed.block === "end" || parsed.block === "nearest" ? parsed.block : "start";
    return sectionId ? { sectionId, block, fromTop: true } : null;
  } catch {
    return null;
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
    // Studio preview safe ignore
  }
}

function anchorScrollTarget(section: HTMLElement, sectionId: string) {
  if (sectionId !== tLocalized("neden-gerekli", "neden-gerekli")) return section;
  return section.querySelector(".tmcl-section-head") || section;
}

function normalizeHtmlLinks(value: string): string {
  if (typeof window === "undefined" || typeof DOMParser === "undefined") {
    return value;
  }
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<div>${value}</div>`, "text/html");
    const links = doc.querySelectorAll("a[href]");
    links.forEach((link) => {
      const href = link.getAttribute("href") || "";
      link.setAttribute("href", resolveHref(href));
    });
    return doc.body.innerHTML;
  } catch {
    // If parsing fails, return original value unchanged
    return value;
  }
}

function normalize(value: string | undefined) {
  return (value || "")
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function safeVariant(product: IkasProduct): IkasProductVariant | null {
  try {
    return getSelectedProductVariant(product) || product.variants?.[0] || null;
  } catch {
    return product.variants?.[0] || null;
  }
}

function findLiveProduct(products: IkasProduct[], title: string) {
  const key = normalize(title);
  return (
    products.find((product) => normalize(product.name) === key) ||
    products.find((product) => {
      const productKey = normalize(product.name);
      return productKey.includes(key) || key.includes(productKey);
    }) ||
    null
  );
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function plainText(value: unknown) {
  return String(value || "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncateText(value: string, limit: number) {
  if (value.length <= limit) return value;
  return `${value.slice(0, Math.max(0, limit - 1)).trimEnd()}…`;
}

function rawProductDescription(product: IkasProduct) {
  const data = product as { shortDescription?: unknown; description?: unknown };
  return data.shortDescription || data.description || "";
}

function liveProductDescription(product: IkasProduct) {
  const description = truncateText(plainText(rawProductDescription(product)), 170);
  if (description) return escapeHtml(description);
  const categoryName = product.categories?.[0]?.name;
  const brandName = product.brand?.name;
  if (categoryName && brandName) return `${categoryName} • <b>${brandName}</b>`;
  if (categoryName) return categoryName;
  if (brandName) return `<b>${brandName}</b>`;
  return product.name;
}

function liveProductStatus(product: IkasProduct) {
  const variant = safeVariant(product);
  return variant ? getProductVariantFormattedFinalPrice(variant) : "";
}

function liveProductFilterId(
  product: IkasProduct,
  filters: CategoryFilter[] | undefined,
  preset: CategoryProductCard | undefined,
) {
  if (preset?.filterId) return preset.filterId;
  if (!filters?.length) return undefined;

  const filterCandidates = filters.filter((filter) => filter.id !== "all");
  if (!filterCandidates.length) return undefined;

  const searchableText = normalize(
    [
      product.name,
      product.brand?.name,
      ...(product.categories?.map((category) => category.name).filter(Boolean) || []),
      plainText(rawProductDescription(product)),
    ]
      .filter(Boolean)
      .join(" "),
  );

  const match = filterCandidates.find((filter) => {
    const idKey = normalize(filter.id);
    const labelKey = normalize(filter.label);
    return (
      (idKey && searchableText.includes(idKey)) ||
      (labelKey && searchableText.includes(labelKey))
    );
  });

  return match?.id;
}

export function productMatchesCategoryKind(product: IkasProduct, kind: CategoryLandingData["kind"]) {
  const signals = [
    product.name,
    getProductHref(product) || "",
    ...(product.categories?.map((category) => category.name).filter(Boolean) || []),
    product.brand?.name || "",
    product.metaData?.slug || "",
  ].filter(Boolean);

  const normalizedSignals = signals.map((signal) => normalize(signal));

  const furnaceSignals = [
    "naberthem lht 02 17 lb speed",
    "naberthem lht 01 16 turbo fire",
    "naberthem vl 01 12 lb pres firini",
    "naberthem vl 01 12 lb press firini",
    "naberthem vl 01 12 lb porselen firini",
  ];

  const scannerSignals = [
    "3shape e2",
    "3shape e3",
    "3shape e4",
    "e2 yuksek uretkenlik",
    "implant bar dogrulugu",
    "hiz ve hassasiyet",
  ];

  const spareSignals = [
    "ana kart",
    "control board",
    "lcd ekran",
    "ekran kiti",
    "baski tablosi",
    "build plate",
    "recine tanki",
    "resin tank",
    "acf film",
    "fep film",
    "film",
    "piocreat c01",
    "creality halot sky",
    "yedek parca",
  ];

  const systemSignals = [
    "trasformer comp flow",
    "comp flow siringa kompozit",
    "comp flow şırınga kompozit",
    "trasformer light glass",
    "light glass mufla sistemi",
    "trasformer-comp-flow-siringa-kompozit",
    "trasformer-light-glass-mufla-sistemi",
    "light glass muffle system",
  ];

  const matchesAny = (candidates: string[]) => {
    const normalizedCandidates = candidates.map((candidate) => normalize(candidate));

    return normalizedCandidates.some((candidate) =>
      normalizedSignals.some((signal) => signal.includes(candidate) || candidate.includes(signal)),
    );
  };

  if (kind === "furnaces") return matchesAny(furnaceSignals);
  if (kind === "scanners") return matchesAny(scannerSignals);
  if (kind === "spares") return matchesAny(spareSignals);
  if (kind === "systems") return matchesAny(systemSignals);
  return true;
}

function liveProductCards(
  products: IkasProduct[],
  presetCards: CategoryProductCard[],
  filters?: CategoryFilter[],
  preservePresetCards = false,
  kind?: CategoryLandingData["kind"],
): CategoryProductCard[] {
  const productPool = kind ? products.filter((product) => productMatchesCategoryKind(product, kind)) : products;
  const presetByTitle = new Map(
    presetCards.map((card, index) => [normalize(card.title), { card, index }] as const),
  );

  if (preservePresetCards) {
    return presetCards.map((card) => {
      const cardKey = normalize(card.title);
      const cardHrefKey = normalize(card.href);
      const liveProduct = productPool.find((product) => {
        const productKey = normalize(product.name);
        const productHrefKey = normalize(getProductHref(product) || "");
        return (
          productKey === cardKey ||
          productKey.includes(cardKey) ||
          cardKey.includes(productKey) ||
          (productHrefKey && cardHrefKey && (productHrefKey.includes(cardHrefKey) || cardHrefKey.includes(productHrefKey)))
        );
      });
      if (!liveProduct) return { ...card, status: card.status || "" };
      return {
        ...card,
        title: liveProduct.name,
        descriptionHtml: liveProductDescription(liveProduct) || card.descriptionHtml,
        href: getProductHref(liveProduct) || card.href,
        imageAlt: liveProduct.name,
        status: liveProductStatus(liveProduct) || card.status || "",
      };
    });
  }

  return productPool
    .map((product, index) => ({ product, index }))
    .sort((left, right) => {
      const leftPreset = presetByTitle.get(normalize(left.product.name));
      const rightPreset = presetByTitle.get(normalize(right.product.name));
      const leftOrder = leftPreset?.index ?? Number.MAX_SAFE_INTEGER;
      const rightOrder = rightPreset?.index ?? Number.MAX_SAFE_INTEGER;
      if (leftOrder !== rightOrder) return leftOrder - rightOrder;
      return left.index - right.index;
    })
    .map(({ product }) => {
      const preset = presetByTitle.get(normalize(product.name))?.card;
      return {
        title: product.name,
        descriptionHtml: liveProductDescription(product),
        href: getProductHref(product),
        imageAlt: product.name,
        filterId: liveProductFilterId(product, filters, preset),
        tag: product.categories?.[0]?.name || product.brand?.name || "",
        status: liveProductStatus(product) || tLocalized("Teklif alın", "Get a quote"),
      };
    });
}

function titleWithEmphasis(prefix: string, emphasis: string, suffix?: string) {
  return (
    <>
      {prefix} <span className="tmcl-em">{emphasis}</span>
      {suffix ? ` ${suffix}` : null}
    </>
  );
}

function categoryStyle(props: CategoryLandingOverrides) {
  return {
    "--tmcl-bg": textValue(props.backgroundColor, "var(--tm-theme-bg, #FAFAF7)"),
    "--tmcl-ink": textValue(props.textColor, "var(--tm-theme-text, #0E0E0C)"),
    "--tmcl-sub": textValue(props.mutedTextColor, "var(--tm-theme-sub, #55554e)"),
    "--tmcl-mut": textValue(props.mutedTextColor, "var(--tm-theme-muted, #8f8f86)"),
    "--tmcl-line": textValue(props.lineColor, "var(--tm-theme-line, #E6E6E0)"),
    "--tmcl-line2": textValue(props.lineColor, "var(--tm-theme-line-strong, #d5d5cd)"),
    "--tmcl-lime": textValue(props.accentColor, "var(--tm-theme-accent, #C7F136)"),
    "--tmcl-panel": textValue(props.panelColor, "var(--tm-theme-panel, #F1F1EC)"),
  };
}

function ButtonLink({ button }: { button: CategoryButton }) {
  const normalizedHref = resolveHref(button.href);

  return (
    <a className={`tmcl-btn tmcl-btn-${button.variant || "dark"}`} href={normalizedHref} onClick={(event) => smoothCategoryClick(event, normalizedHref)}>
      {button.label}
    </a>
  );
}

function BottleIcon() {
  return (
    <svg viewBox="0 0 48 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M18 6h12v8l5 7v31a4 4 0 0 1-4 4H17a4 4 0 0 1-4-4V21l5-7V6z" />
      <line x1="18" y1="6" x2="30" y2="6" />
      <line x1="13" y1="35" x2="35" y2="35" />
    </svg>
  );
}

function PrinterIcon() {
  return (
    <svg viewBox="0 0 64 74" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <rect x="12" y="6" width="40" height="60" rx="9" />
      <rect x="21" y="15" width="22" height="17" rx="2" className="tmcl-icon-red" />
      <line x1="21" y1="44" x2="43" y2="44" />
      <line x1="32" y1="32" x2="32" y2="44" className="tmcl-icon-red" />
      <rect x="19" y="52" width="26" height="8" rx="4" />
    </svg>
  );
}

function ProductCard({
  card,
  cardCtaText,
  kind,
  product,
  preferLiveImage,
  imageOverride,
  imageAltOverride,
}: {
  card: CategoryProductCard;
  cardCtaText: string;
  kind: CategoryLandingData["kind"];
  product: IkasProduct | null;
  preferLiveImage: boolean;
  imageOverride?: IkasImage | null;
  imageAltOverride?: string;
}) {
  const variant = product ? safeVariant(product) : null;
  const media = variant ? getProductVariantMainImage(variant) : undefined;
  const image = media?.image;
  const studioImage = imageOverride || null;
  const studioImageSrc = studioImage ? getDefaultSrc(studioImage) : "";
  const href = resolveHref(card.href);
  const liveImageSrc = image ? getDefaultSrc(image) : "";
  const imageSrc = card.sourceIcon ? "" : studioImageSrc || (preferLiveImage && liveImageSrc ? liveImageSrc : card.imageSrc || liveImageSrc);
  const imageAlt = imageAltOverride || (preferLiveImage ? image?.altText || card.imageAlt || card.title : card.imageAlt || image?.altText || card.title);
  const imageSrcSet = studioImage
    ? createMediaSrcset(studioImage)
    : preferLiveImage || !card.imageSrc
      ? (image ? createMediaSrcset(image) : undefined)
      : undefined;

  return (
    <a className={`tmcl-product-card${card.hot ? " is-hot" : ""}`} href={href}>
      <div className="tmcl-product-media" style={card.tone ? { "--tmcl-card-tone": card.tone } as any : undefined}>
        {card.tag && kind !== "resins" ? <span className={`tmcl-card-tag${card.hot ? " is-hot" : ""}`}>{card.tag}</span> : null}
        {card.status ? <span className="tmcl-card-status">{card.status}</span> : null}
        {imageSrc ? (
          media?.isVideo && !studioImageSrc && (preferLiveImage || !card.imageSrc) ? (
            <video src={imageSrc} muted playsInline loop autoPlay />
          ) : (
            <img src={imageSrc} srcSet={imageSrcSet} alt={imageAlt} loading="lazy" decoding="async" />
          )
        ) : kind === "printers" ? (
          <PrinterIcon />
        ) : (
          <BottleIcon />
        )}
      </div>
      <div className="tmcl-product-body">
        <h3>{card.title}</h3>
        <p dangerouslySetInnerHTML={rich(card.descriptionHtml)} />
        {card.specs?.length ? (
          <div className="tmcl-product-specs">
            {card.specs.map((spec) => (
              <div key={`${card.title}-${spec.label}`}>
                <span>{spec.label}</span>
                <b>{spec.value}</b>
              </div>
            ))}
          </div>
        ) : null}
        <span className="tmcl-card-link">
          {cardCtaText} <em>→</em>
        </span>
      </div>
    </a>
  );
}

function SectionIndex({ number, label }: { number: string; label: string }) {
  return (
    <div className="tmcl-index">
      <span className="tmcl-index-number">{number}</span>
      <span className="tmcl-index-label">{label}</span>
      <span className="tmcl-index-line" />
    </div>
  );
}

function SectionHead({ section }: { section: CategorySectionHead }) {
  return (
    <>
      <SectionIndex number={section.number} label={section.label} />
      <div className="tmcl-section-head">
        <h2>{titleWithEmphasis(section.titlePrefix, section.titleEmphasis, section.titleSuffix)}</h2>
        <div className="tmcl-section-side" dangerouslySetInnerHTML={rich(section.sideHtml)} />
      </div>
    </>
  );
}

function FaqItem({ item, defaultOpen }: { item: CategoryFaq; defaultOpen: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const panelId = `tmcl-faq-${routeKey(item.question)}`;

  return (
    <div className={`tmcl-faq-item${isOpen ? " is-open" : ""}`}>
      <button type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setIsOpen((current) => !current)}>
        {item.question}
        <span>+</span>
      </button>
      <div className="tmcl-faq-panel" id={panelId}>
        <div dangerouslySetInnerHTML={rich(item.answerHtml)} />
      </div>
    </div>
  );
}

export default function ThreeMashCategoryLanding(props: Props) {
  const { data, productList } = props;

  const heroButtons = data.hero.buttons.map((button, index) => {
    if (index === 0) {
      return {
        ...button,
        label: localizedTextProp(props, "primaryButtonText", button.label),
        href: localizedTextProp(props, "primaryButtonHref", button.href),
      };
    }
    if (index === 1) {
      return {
        ...button,
        label: localizedTextProp(props, "secondaryButtonText", button.label),
        href: localizedTextProp(props, "secondaryButtonHref", button.href),
      };
    }
    return button;
  });

  const baseHeroMetrics = data.hero.metrics.map((metric, index) => {
    if (index === 0) {
      return {
        ...metric,
        value: localizedTextProp(props, "metric1Value", metric.value),
        emphasis: localizedTextProp(props, "metric1Emphasis", metric.emphasis || ""),
        label: localizedTextProp(props, "metric1Label", metric.label),
      };
    }
    if (index === 1) {
      return {
        ...metric,
        value: localizedTextProp(props, "metric2Value", metric.value),
        emphasis: localizedTextProp(props, "metric2Emphasis", metric.emphasis || ""),
        label: localizedTextProp(props, "metric2Label", metric.label),
      };
    }
    if (index === 2) {
      return {
        ...metric,
        value: localizedTextProp(props, "metric3Value", metric.value),
        emphasis: localizedTextProp(props, "metric3Emphasis", metric.emphasis || ""),
        label: localizedTextProp(props, "metric3Label", metric.label),
      };
    }
    if (index === 3) {
      return {
        ...metric,
        value: localizedTextProp(props, "metric4Value", metric.value),
        emphasis: localizedTextProp(props, "metric4Emphasis", metric.emphasis || ""),
        label: localizedTextProp(props, "metric4Label", metric.label),
      };
    }
    return metric;
  });

  const featureSpecs = (data.feature.content.specs || []).map((spec, index) => {
    const lKey = `featureSpec${index + 1}Label` as keyof CategoryLandingOverrides;
    const vKey = `featureSpec${index + 1}Value` as keyof CategoryLandingOverrides;
    return {
      label: localizedTextProp(props, String(lKey), spec.label),
      value: localizedTextProp(props, String(vKey), spec.value),
    };
  });

  const detailLineCards = data.detail.lineCards?.map((card, index) => {
    const cardIndex = index + 1;
    const tKey = `detailCard${cardIndex}Title` as keyof CategoryLandingOverrides;
    const tEnKey = `detailCard${cardIndex}TitleEn` as keyof CategoryLandingOverrides;
    const dKey = `detailCard${cardIndex}DescriptionHtml` as keyof CategoryLandingOverrides;
    const dEnKey = `detailCard${cardIndex}DescriptionHtmlEn` as keyof CategoryLandingOverrides;
    const markerKey = `detailLineCard${cardIndex}Marker` as keyof CategoryLandingOverrides;
    const visibleKey = `detailLineCard${cardIndex}Visible` as keyof CategoryLandingOverrides;
    return {
      ...card,
      marker: localizedTextProp(props, String(markerKey), card.marker),
      title: localizedTextValue(
        props[tKey] as string | undefined,
        props[tEnKey] as string | undefined,
        card.title,
      ),
      descriptionHtml: localizedHtmlValue(
        props[dKey] as string | undefined,
        props[dEnKey] as string | undefined,
        card.descriptionHtml,
      ),
      items: card.items.map((item, itemIndex) => {
        const itemKey = `detailLineCard${cardIndex}Item${itemIndex + 1}` as keyof CategoryLandingOverrides;
        const itemEnKey = `detailLineCard${cardIndex}Item${itemIndex + 1}En` as keyof CategoryLandingOverrides;
        return localizedTextValue(
          props[itemKey] as string | undefined,
          props[itemEnKey] as string | undefined,
          item,
        );
      }),
      visible: props[visibleKey] !== false,
    };
  }).filter((card) => card.visible);

  const detailWhyCards = data.detail.whyCards?.map((card, index) => {
    const cardIndex = index + 1;
    const nKey = `detailCard${cardIndex}Number` as keyof CategoryLandingOverrides;
    const tKey = `detailCard${cardIndex}Title` as keyof CategoryLandingOverrides;
    const tEnKey = `detailCard${cardIndex}TitleEn` as keyof CategoryLandingOverrides;
    const dKey = `detailCard${cardIndex}DescriptionHtml` as keyof CategoryLandingOverrides;
    const dEnKey = `detailCard${cardIndex}DescriptionHtmlEn` as keyof CategoryLandingOverrides;
    return {
      ...card,
      number: localizedTextProp(props, String(nKey), card.number),
      title: localizedTextValue(
        props[tKey] as string | undefined,
        props[tEnKey] as string | undefined,
        card.title,
      ),
      descriptionHtml: localizedHtmlValue(
        props[dKey] as string | undefined,
        props[dEnKey] as string | undefined,
        card.descriptionHtml,
      ),
      visible: props[`detailWhyCard${cardIndex}Visible`] !== false,
    };
  }).filter((card) => card.visible);

  const detailCalloutButtons = (data.detail.callout?.buttons || []).map((btn, index) => {
    const tKey = `detailCalloutButton${index + 1}Text` as keyof CategoryLandingOverrides;
    const hKey = `detailCalloutButton${index + 1}Href` as keyof CategoryLandingOverrides;
    return {
      ...btn,
      label: localizedTextProp(props, String(tKey), btn.label),
      href: localizedTextProp(props, String(hKey), btn.href),
    };
  });

  const faqItems = (data.faq.items || []).map((item, index) => {
    const qKey = `faq${index + 1}Question` as keyof CategoryLandingOverrides;
    const qEnKey = `faq${index + 1}QuestionEn` as keyof CategoryLandingOverrides;
    const aKey = `faq${index + 1}AnswerHtml` as keyof CategoryLandingOverrides;
    const aEnKey = `faq${index + 1}AnswerHtmlEn` as keyof CategoryLandingOverrides;
    return {
      question: localizedTextValue(
        props[qKey] as string | undefined,
        props[qEnKey] as string | undefined,
        item.question,
      ),
      answerHtml: localizedHtmlValue(
        props[aKey] as string | undefined,
        props[aEnKey] as string | undefined,
        item.answerHtml,
      ),
    };
  });

  const finalButtons = data.finalCta.buttons.map((button, index) => {
    if (index === 0) {
      return {
        ...button,
        label: localizedTextProp(props, "finalPrimaryButtonText", button.label),
        href: localizedTextProp(props, "finalPrimaryButtonHref", button.href),
      };
    }
    if (index === 1) {
      return {
        ...button,
        label: localizedTextProp(props, "finalSecondaryButtonText", button.label),
        href: localizedTextProp(props, "finalSecondaryButtonHref", button.href),
      };
    }
    return button;
  });

  const selectorFilters = data.selector.filters?.map((filter, index) => {
    const labelKey = `selectorFilter${index + 1}Label` as keyof CategoryLandingOverrides;
    const labelEnKey = `selectorFilter${index + 1}LabelEn` as keyof CategoryLandingOverrides;
    return {
      ...filter,
      label: localizedTextValue(
        props[labelKey] as string | undefined,
        props[labelEnKey] as string | undefined,
        filter.label,
      ),
    };
  });
  const [activeFilter, setActiveFilter] = useState(data.selector.filters?.[0]?.id || "all");
  const [extraProducts, setExtraProducts] = useState<IkasProduct[]>([]);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const response = await apiSearchProducts({
          input: {
            page: 1,
            perPage: 50,
          },
        } as Parameters<typeof apiSearchProducts>[0]);
        if (!active) return;
        const items = response?.data?.data || [];
        if (items.length) {
          setExtraProducts(items);
        }
      } catch {
        // silent
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const liveProducts = useMemo(() => {
    const base = productList?.data || [];
    if (!extraProducts.length) return base;
    const existingIds = new Set(base.map((p) => p.id));
    const merged = [...base];
    for (const p of extraProducts) {
      if (!existingIds.has(p.id)) {
        merged.push(p);
      }
    }
    return merged;
  }, [productList?.data, extraProducts]);

  const liveProductsByTitle = useMemo(() => {
    const map = new Map<string, IkasProduct>();
    liveProducts.forEach((product) => map.set(normalize(product.name), product));
    return map;
  }, [liveProducts]);
  const configuredProductIds = useMemo(
    () => new Set((productList?.data || []).map((product) => product.id)),
    [productList?.data],
  );
  const useDynamicSelectorProducts =
    Boolean(productList?.data?.length) &&
    (data.kind !== "wash-cure" || props.useLiveSelectorProducts !== false);
  const heroMetrics = baseHeroMetrics.map((metric, index) => {
    const priceMetricIndex = data.kind === "washing" ? 1 : data.kind === "curing" || data.kind === "zircon" ? 3 : data.kind === "wash-cure" ? 3 : -1;
    if (index !== priceMetricIndex) return metric;
    const liveProduct = useDynamicSelectorProducts
      ? productList?.data?.[0]
      : findLiveProduct(liveProducts, data.selector.products[0]?.title || "");
    const livePrice = liveProduct ? liveProductStatus(liveProduct) : "";
    return {
      ...metric,
      value: livePrice,
      emphasis: "",
      label: useDynamicSelectorProducts && liveProduct ? liveProduct.name : metric.label,
    };
  });
  const productCards = useMemo(
    () =>
      useDynamicSelectorProducts
        ? liveProductCards(
            productList?.data || [],
            data.selector.products,
            selectorFilters,
            false,
            data.kind,
          )
        : liveProductCards(
            liveProducts,
            data.selector.products,
            selectorFilters,
            data.kind === "wash-cure" || data.kind === "resins" || data.kind === "zircon",
            data.kind,
          ),
    [selectorFilters, data.selector.products, liveProducts, data.kind, productList?.data, useDynamicSelectorProducts],
  );
  const cardDescriptionOverrides = [
    [props.selectorProduct1DescriptionHtml, props.selectorProduct1DescriptionHtmlEn],
    [props.selectorProduct2DescriptionHtml, props.selectorProduct2DescriptionHtmlEn],
    [props.selectorProduct3DescriptionHtml, props.selectorProduct3DescriptionHtmlEn],
  ];
  const cardTitleOverrides = [
    [props.selectorProduct1Title, props.selectorProduct1TitleEn],
    [props.selectorProduct2Title, props.selectorProduct2TitleEn],
    [props.selectorProduct3Title, props.selectorProduct3TitleEn],
  ];
  const cardHrefOverrides = [
    [props.selectorProduct1Href, props.selectorProduct1HrefEn],
    [props.selectorProduct2Href, props.selectorProduct2HrefEn],
    [props.selectorProduct3Href, props.selectorProduct3HrefEn],
  ];
  const cardImageOverrides = [
    props.selectorProduct1Image,
    props.selectorProduct2Image,
    props.selectorProduct3Image,
  ];
  const cardImageAltOverrides = [
    [props.selectorProduct1ImageAlt, props.selectorProduct1ImageAltEn],
    [props.selectorProduct2ImageAlt, props.selectorProduct2ImageAltEn],
    [props.selectorProduct3ImageAlt, props.selectorProduct3ImageAltEn],
  ];
  const cardTagOverrides = [
    [props.selectorProduct1Tag, props.selectorProduct1TagEn],
    [props.selectorProduct2Tag, props.selectorProduct2TagEn],
    [props.selectorProduct3Tag, props.selectorProduct3TagEn],
  ];
  const cardVisibility = [
    props.selectorProduct1Visible,
    props.selectorProduct2Visible,
    props.selectorProduct3Visible,
  ];
  const cardSpecOverrides = [
    [
      [
        props.selectorProduct1Spec1Label,
        props.selectorProduct1Spec1LabelEn,
        props.selectorProduct1Spec1Value,
        props.selectorProduct1Spec1ValueEn,
      ],
      [
        props.selectorProduct1Spec2Label,
        props.selectorProduct1Spec2LabelEn,
        props.selectorProduct1Spec2Value,
        props.selectorProduct1Spec2ValueEn,
      ],
      [
        props.selectorProduct1Spec3Label,
        props.selectorProduct1Spec3LabelEn,
        props.selectorProduct1Spec3Value,
        props.selectorProduct1Spec3ValueEn,
      ],
    ],
    [
      [
        props.selectorProduct2Spec1Label,
        props.selectorProduct2Spec1LabelEn,
        props.selectorProduct2Spec1Value,
        props.selectorProduct2Spec1ValueEn,
      ],
      [
        props.selectorProduct2Spec2Label,
        props.selectorProduct2Spec2LabelEn,
        props.selectorProduct2Spec2Value,
        props.selectorProduct2Spec2ValueEn,
      ],
      [
        props.selectorProduct2Spec3Label,
        props.selectorProduct2Spec3LabelEn,
        props.selectorProduct2Spec3Value,
        props.selectorProduct2Spec3ValueEn,
      ],
    ],
    [
      [
        props.selectorProduct3Spec1Label,
        props.selectorProduct3Spec1LabelEn,
        props.selectorProduct3Spec1Value,
        props.selectorProduct3Spec1ValueEn,
      ],
      [
        props.selectorProduct3Spec2Label,
        props.selectorProduct3Spec2LabelEn,
        props.selectorProduct3Spec2Value,
        props.selectorProduct3Spec2ValueEn,
      ],
      [
        props.selectorProduct3Spec3Label,
        props.selectorProduct3Spec3LabelEn,
        props.selectorProduct3Spec3Value,
        props.selectorProduct3Spec3ValueEn,
      ],
    ],
  ];
  const visibleCards = productCards
    .map((card, index) => {
      const [tag, tagEn] = cardTagOverrides[index] || [];
      const [title, titleEn] = cardTitleOverrides[index] || [];
      const [imageAlt, imageAltEn] = cardImageAltOverrides[index] || [];
      const specOverrides = cardSpecOverrides[index] || [];
      const specs = Array.from({ length: Math.max(card.specs?.length || 0, specOverrides.length) }, (_, specIndex) => {
        const spec = card.specs?.[specIndex];
        const [label, labelEn, value, valueEn] = specOverrides[specIndex] || [];
        return {
          label: localizedTextValue(label, labelEn, spec?.label || ""),
          value: localizedTextValue(value, valueEn, spec?.value || ""),
        };
      }).filter((spec) => spec.label || spec.value);
      return {
        ...card,
        title: localizedTextValue(title, titleEn, card.title),
        href: localizedTextValue(
          cardHrefOverrides[index]?.[0],
          cardHrefOverrides[index]?.[1],
          card.href,
        ),
        descriptionHtml: localizedHtmlValue(
          cardDescriptionOverrides[index]?.[0],
          cardDescriptionOverrides[index]?.[1],
          card.descriptionHtml,
        ),
        imageAlt: localizedTextValue(imageAlt, imageAltEn, card.imageAlt || card.title),
        tag: localizedTextValue(tag, tagEn, card.tag || ""),
        slotIndex: index,
        specs,
      };
    })
    .filter((card, index) => cardVisibility[index] !== false && (activeFilter === "all" || card.filterId === activeFilter));
  const compareSource = data.selector.compare;
  const compare = props.selectorCompareVisible === false || (!compareSource && props.addSelectorCompareTable !== true)
    ? undefined
    : (() => {
        const columnOverrides = [
          [props.selectorCompareColumn1Title, props.selectorCompareColumn1TitleEn, props.selectorCompareColumn1Subtitle, props.selectorCompareColumn1SubtitleEn],
          [props.selectorCompareColumn2Title, props.selectorCompareColumn2TitleEn, props.selectorCompareColumn2Subtitle, props.selectorCompareColumn2SubtitleEn],
          [props.selectorCompareColumn3Title, props.selectorCompareColumn3TitleEn, props.selectorCompareColumn3Subtitle, props.selectorCompareColumn3SubtitleEn],
          [props.selectorCompareColumn4Title, props.selectorCompareColumn4TitleEn, props.selectorCompareColumn4Subtitle, props.selectorCompareColumn4SubtitleEn],
        ];
        const rowOverrides = Array.from({ length: 7 }, (_, rowIndex) => {
          const row = rowIndex + 1;
          const label = props[`selectorCompareRow${row}Label` as keyof CategoryLandingOverrides] as string | undefined;
          const labelEn = props[`selectorCompareRow${row}LabelEn` as keyof CategoryLandingOverrides] as string | undefined;
          return {
            label: [label, labelEn],
            values: [1, 2, 3].map((column) => [
              props[`selectorCompareRow${row}Value${column}` as keyof CategoryLandingOverrides] as string | undefined,
              props[`selectorCompareRow${row}Value${column}En` as keyof CategoryLandingOverrides] as string | undefined,
            ]),
          };
        });
        const sourceColumns = compareSource?.columns || [];
        const columns = Array.from({ length: compareSource?.columns.length || 4 }, (_, index) => {
          const column = sourceColumns[index];
          const [title, titleEn, subtitle, subtitleEn] = columnOverrides[index] || [];
          const productTitle = index > 0 ? data.selector.products[index - 1]?.title || "" : "";
          return {
            title: localizedTextValue(title, titleEn, column?.title || productTitle || tLocalized("Özellik", "Feature")),
            subtitle: localizedTextValue(subtitle, subtitleEn, column?.subtitle || ""),
          };
        });
        const sourceRows = compareSource?.rows || [];
        const rows = rowOverrides.map((override, index) => {
          const row = sourceRows[index];
          return {
            label: localizedTextValue(override.label[0], override.label[1], row?.label || ""),
            values: override.values.map(([cell, cellEn], valueIndex) =>
              localizedHtmlValue(cell, cellEn, row?.values[valueIndex] || ""),
            ),
          };
        }).filter((row) => row.label || row.values.some((value) => value.trim()));
        if (!rows.length) return undefined;

        return {
          columns,
          rows,
          noteHtml: localizedHtmlValue(
            props.selectorCompareNoteHtml,
            props.selectorCompareNoteHtmlEn,
            compareSource?.noteHtml || "",
          ),
        };
      })();

  // Announcement bar payload
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const payload = {
      enabled: props.showAnnouncement !== false,
      highlightText: localizedTextProp(props, "eyebrowText", data.announcement.highlight),
      text: localizedTextProp(props, "announcementText", data.announcement.text),
      ctaText: localizedTextProp(props, "announcementCtaText", data.announcement.ctaText),
      href: localizedTextProp(props, "announcementHref", data.announcement.href),
    };
    const targetWindow = window as CategoryAnnouncementWindow;
    targetWindow.__THREE_MASH_PRODUCT_ANNOUNCEMENT__ = payload;
    window.dispatchEvent(new CustomEvent("three-mash:product-announcement", { detail: payload }));

    return () => {
      window.requestAnimationFrame(() => {
        if (targetWindow.__THREE_MASH_PRODUCT_ANNOUNCEMENT__ !== payload) return;
        delete targetWindow.__THREE_MASH_PRODUCT_ANNOUNCEMENT__;
        window.dispatchEvent(new CustomEvent("three-mash:product-announcement", { detail: { enabled: false } }));
      });
    };
  }, [
    data.announcement.ctaText,
    data.announcement.highlight,
    data.announcement.href,
    data.announcement.text,
    props.eyebrowText,
    props.eyebrowTextEn,
    props.announcementText,
    props.announcementTextEn,
    props.announcementCtaText,
    props.announcementCtaTextEn,
    props.announcementHref,
    props.announcementHrefEn,
    props.showAnnouncement,
  ]);

  // Smooth scroll logic
  useLayoutEffect(() => {
    const pending = consumePendingAnchorScroll();
    if (!pending) return undefined;

    let frame = 0;
    let attempts = 0;
    const previousScrollBehavior = document.documentElement.style.scrollBehavior;
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    document.documentElement.style.scrollBehavior = "auto";
    safeHistoryReplace(`${window.location.pathname}${window.location.search}`);
    window.scrollTo(0, 0);

    const scrollToPending = () => {
      const section = document.getElementById(pending.sectionId);
      if (!section) {
        attempts += 1;
        if (attempts < 90) frame = window.requestAnimationFrame(scrollToPending);
        return;
      }

      const target = anchorScrollTarget(section, pending.sectionId);
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
      target.scrollIntoView({ behavior: "smooth", block: pending.block });
      safeHistoryReplace(`#${pending.sectionId}`);
    };

    const timeout = window.setTimeout(() => {
      window.scrollTo(0, 0);
      frame = window.requestAnimationFrame(scrollToPending);
    }, 520);

    return () => {
      window.clearTimeout(timeout);
      if (frame) window.cancelAnimationFrame(frame);
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  return (
    <section className={`three-mash-category-landing tmcl-${data.kind}`} style={categoryStyle(props) as any}>
      {/* HERO SECTION */}
      {props.showHero !== false && (
      <div className="tmcl-hero">
        <div className="tmcl-wrap">
          <div className="tmcl-crumb">
            <a href={resolveHref(localizedTextProp(props, "breadcrumbHomeHref", data.breadcrumb.homeHref))}>
              {localizedTextValue(props.breadcrumbHomeLabel, props.breadcrumbHomeLabelEn, data.breadcrumb.homeLabel)}
            </a>
            {"  /  "}
            <a href={resolveHref(localizedTextProp(props, "breadcrumbParentHref", parentCategoryHref(data)))}>
              {localizedTextValue(props.breadcrumbParentLabel, props.breadcrumbParentLabelEn, data.breadcrumb.parentLabel)}
            </a>
            {"  /  "}
            <span aria-current="page">
              {localizedTextValue(props.breadcrumbCurrentLabel, props.breadcrumbCurrentLabelEn, data.breadcrumb.currentLabel)}
            </span>
          </div>
          <h1>
            {titleWithEmphasis(
              localizedTextProp(props, "heroTitlePrefix", data.hero.titlePrefix),
              localizedTextProp(props, "heroTitleEmphasis", data.hero.titleEmphasis),
              localizedTextProp(props, "heroTitleSuffix", data.hero.titleSuffix || "")
            )}
          </h1>
          <p dangerouslySetInnerHTML={rich(localizedHtmlProp(props, "heroDescriptionHtml", data.hero.descriptionHtml))} />
          <div className="tmcl-actions">
            {heroButtons.filter((_, index) => index > 0 || props.showSelector !== false).map((button) => (
              <ButtonLink button={button} key={`${button.label}-${button.href}`} />
            ))}
          </div>
          {props.showMetrics !== false ? <div className="tmcl-value-strip">
            {heroMetrics.map((metric) => (
              <div key={`${metric.value}-${metric.label}`}>
                <strong>
                  {metric.value}
                  {metric.emphasis ? <em>{metric.emphasis}</em> : null}
                </strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div> : null}
        </div>
      </div>
      )}

      {/* SECTION 01: SELECTOR & PRODUCTS */}
      {props.showSelector !== false && (
      <section className="tmcl-section" id={data.selector.anchorId}>
        <div className="tmcl-wrap">
          <SectionHead
            section={{
              number: localizedTextProp(props, "selectorNumber", data.selector.number),
              label: localizedTextProp(props, "selectorLabel", data.selector.label),
              titlePrefix: localizedTextProp(props, "selectorTitlePrefix", data.selector.titlePrefix),
              titleEmphasis: localizedTextProp(props, "selectorTitleEmphasis", data.selector.titleEmphasis),
              titleSuffix: localizedTextProp(props, "selectorTitleSuffix", data.selector.titleSuffix || ""),
              sideHtml: localizedHtmlProp(props, "selectorSideHtml", data.selector.sideHtml),
            }}
          />
          {selectorFilters?.length ? (
            <div className="tmcl-filter-chips" aria-label={localizedTextProp(props, "selectorLabel", data.selector.label)}>
              {selectorFilters.map((filter) => (
                <button
                  type="button"
                  className={filter.id === activeFilter ? "is-active" : ""}
                  onClick={() => setActiveFilter(filter.id)}
                  key={filter.id}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          ) : null}

          <div className={`tmcl-product-grid tmcl-product-grid-${data.kind}`}>
            {visibleCards.map((card) => {
              const slotIndex = card.slotIndex;
              const sourceTitle = productCards[slotIndex]?.title || card.title;
              const product = liveProductsByTitle.get(normalize(sourceTitle)) || findLiveProduct(liveProducts, sourceTitle);
              const [imageAlt, imageAltEn] = cardImageAltOverrides[slotIndex] || [];
              return (
                <ProductCard
                  card={card}
                  cardCtaText={localizedTextProp(props, "selectorCardCtaText", data.selector.cardCtaText)}
                  kind={data.kind}
                  product={product}
                  preferLiveImage={Boolean(product && configuredProductIds.has(product.id))}
                  imageOverride={cardImageOverrides[slotIndex]}
                  imageAltOverride={localizedTextValue(imageAlt, imageAltEn, "") || undefined}
                  key={card.title}
                />
              );
            })}
            {!visibleCards.length && data.selector.emptyMessageHtml ? (
              <div className="tmcl-empty" dangerouslySetInnerHTML={rich(localizedHtmlProp(props, "selectorEmptyMessageHtml", data.selector.emptyMessageHtml))} />
            ) : null}
          </div>

          {compare ? (
            <>
              <div className="tmcl-compare tmcl-compare-desktop">
                <table>
                  <thead>
                    <tr>
                      {compare.columns.map((column) => (
                        <th key={column.title}>
                          {column.title}
                          {column.subtitle ? <span>{column.subtitle}</span> : null}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {compare.rows.map((row) => (
                      <tr key={row.label}>
                        <td>{row.label}</td>

                        {row.values.map((value, index) => (
                          <td dangerouslySetInnerHTML={rich(value)} key={`${row.label}-${index}`} />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="tmcl-compare-mobile">
                {compare.columns.slice(1).map((column, columnIndex) => (
                  <div className="tmcl-compare-mobile-card" key={column.title}>
                    <div className="tmcl-compare-mobile-head">
                      <strong>{column.title}</strong>
                      {column.subtitle ? <span>{column.subtitle}</span> : null}
                    </div>

                    <div className="tmcl-compare-mobile-rows">
                      {compare.rows.map((row) => (
                        <div className="tmcl-compare-mobile-row" key={row.label}>
                          <span>{row.label}</span>

                          <div dangerouslySetInnerHTML={rich(row.values[columnIndex] || "")} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {compare.noteHtml ? (
                <p className="tmcl-note" dangerouslySetInnerHTML={rich(compare.noteHtml)} />
              ) : null}
            </>
          ) : null}
        </div>
      </section>
      )}

      {/* SECTION 02: FEATURE / HIGHLIGHT */}
      {props.showFeature !== false && (
      <section className="tmcl-section tmcl-section-tight" id={routeKey(data.detail.label)}>
        <div className="tmcl-wrap">
          <SectionIndex
            number={localizedTextProp(props, "featureNumber", data.feature.number)}
            label={localizedTextProp(props, "featureLabel", data.feature.label)}
          />
          <div className="tmcl-flag">
            <div>
              <div className="tmcl-flag-tag">{localizedTextProp(props, "featureEyebrow", data.feature.content.eyebrow)}</div>
              <h3>
                {titleWithEmphasis(
                  localizedTextProp(props, "featureTitlePrefix", data.feature.content.titlePrefix),
                  localizedTextProp(props, "featureTitleEmphasis", data.feature.content.titleEmphasis),
                  localizedTextProp(props, "featureTitleSuffix", data.feature.content.titleSuffix || "")
                )}
              </h3>
              <p dangerouslySetInnerHTML={rich(localizedHtmlProp(props, "featureDescriptionHtml", data.feature.content.descriptionHtml))} />
              <a href={resolveHref(localizedTextProp(props, "featureHref", data.feature.content.href))}>
                {localizedTextProp(props, "featureCtaText", data.feature.content.ctaText)}
              </a>
            </div>
            <div className="tmcl-spec-table">
              {featureSpecs.map((spec) => (
                <div key={`${spec.label}-${spec.value}`}>
                  <span>{spec.label}</span>
                  <b>{spec.value}</b>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* SECTION 03: DETAIL / WHY NEEDED */}
      {props.showDetail !== false && (
      <section className="tmcl-section tmcl-section-tight">
        <div className="tmcl-wrap">
          <SectionHead
            section={{
              number: localizedTextProp(props, "detailNumber", data.detail.number),
              label: localizedTextProp(props, "detailLabel", data.detail.label),
              titlePrefix: localizedTextProp(props, "detailTitlePrefix", data.detail.titlePrefix),
              titleEmphasis: localizedTextProp(props, "detailTitleEmphasis", data.detail.titleEmphasis),
              titleSuffix: localizedTextProp(props, "detailTitleSuffix", data.detail.titleSuffix || ""),
              sideHtml: localizedHtmlProp(props, "detailSideHtml", data.detail.sideHtml),
            }}
          />
          {detailLineCards?.length ? (
            <div className="tmcl-line-cards">
              {detailLineCards.map((card) => (
                <div className={`tmcl-line-card tmcl-line-card-${card.variant || "plain"}`} key={card.title}>
                  <div className="tmcl-line-title">
                    <span>{card.marker}</span>
                    <h3>{card.title}</h3>
                  </div>
                  <p dangerouslySetInnerHTML={rich(card.descriptionHtml)} />
                  <ul>
                    {card.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : null}
          {detailWhyCards?.length ? (
            <div className="tmcl-why-grid">
              {detailWhyCards.map((card) => (
                <div className="tmcl-why-card" key={card.number}>
                  <span>{card.number}</span>
                  <h3>{card.title}</h3>
                  <p dangerouslySetInnerHTML={rich(card.descriptionHtml)} />
                </div>
              ))}
            </div>
          ) : null}
          {data.detail.callout ? (
            <div className="tmcl-callout">
              <div>
                <h3>
                  {titleWithEmphasis(
                    localizedTextProp(props, "detailCalloutTitlePrefix", data.detail.callout.titlePrefix),
                    localizedTextProp(props, "detailCalloutTitleEmphasis", data.detail.callout.titleEmphasis),
                    localizedTextProp(props, "detailCalloutTitleSuffix", data.detail.callout.titleSuffix || "")
                  )}
                </h3>
                <p dangerouslySetInnerHTML={rich(localizedHtmlProp(props, "detailCalloutDescriptionHtml", data.detail.callout.descriptionHtml))} />
              </div>
              <div className="tmcl-callout-actions">
                {detailCalloutButtons.map((button) => (
                  <ButtonLink button={button} key={`${button.label}-${button.href}`} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
      )}

      {/* SECTION 04: FAQ */}
      {props.showFaq !== false && (
      <section className="tmcl-section tmcl-section-tight" id="sss">
        <div className="tmcl-wrap">
          <SectionIndex
            number={localizedTextProp(props, "faqNumber", data.faq.number)}
            label={localizedTextProp(props, "faqLabel", data.faq.label)}
          />
          <div className="tmcl-section-head">
            <h2>{localizedTextProp(props, "faqTitle", data.faq.title)}</h2>
            <div className="tmcl-section-side" dangerouslySetInnerHTML={rich(localizedHtmlProp(props, "faqSideHtml", data.faq.sideHtml))} />
          </div>
          <div className="tmcl-faq">
            {faqItems.map((item, index) => (
              <FaqItem item={item} defaultOpen={index === 0} key={item.question} />
            ))}
          </div>
        </div>
      </section>
      )}

      {/* FINAL CTA SECTION */}
      {props.showFinalCta !== false && (
      <section className="tmcl-final">
        <div className="tmcl-wrap">
          <h2>
            {titleWithEmphasis(
              localizedTextProp(props, "finalTitlePrefix", data.finalCta.titlePrefix),
              localizedTextProp(props, "finalTitleEmphasis", data.finalCta.titleEmphasis),
              localizedTextProp(props, "finalTitleSuffix", data.finalCta.titleSuffix || "")
            )}
          </h2>
          <p dangerouslySetInnerHTML={rich(localizedHtmlProp(props, "finalDescriptionHtml", data.finalCta.descriptionHtml))} />
          <div className="tmcl-actions tmcl-final-actions">
            {finalButtons.map((button) => (
              <ButtonLink button={button} key={`${button.label}-${button.href}`} />
            ))}
          </div>
        </div>
      </section>
      )}
    </section>
  );
}
