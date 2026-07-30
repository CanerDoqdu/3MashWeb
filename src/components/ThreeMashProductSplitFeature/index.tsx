import { getDefaultSrc } from "@ikas/bp-storefront";
import { Props } from "./types";
import crsModelDimensionalStabilityImage from "../../assets/crs-model-dimensional-stability-data";
import { resolveProductDetailData } from "../../sub-components/ThreeMashProductDetailData";
import { ProductDetailRatingsSection, ProductDetailSectionScope } from "../../sub-components/ThreeMashProductDetailTemplate";

function propString(value: unknown) {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (!value || typeof value !== "object") return "";

  const data = value as Record<string, unknown>;
  const candidates = [
    data.src,
    data.url,
    data.href,
    data.defaultSrc,
    data.originalSrc,
    data.imageUrl,
    data.value,
    data.html,
    data.text,
    (data.image as Record<string, unknown> | undefined)?.src,
    (data.image as Record<string, unknown> | undefined)?.url,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) return candidate;
  }

  return "";
}

function imageSrc(value: unknown) {
  if (!value) return "";
  if (typeof value === "string") return value.trim();
  try {
    return getDefaultSrc(value as any) || propString(value);
  } catch {
    return propString(value);
  }
}

function html(value: unknown) {
  return { __html: propString(value) };
}

function text(value: unknown, fallback: string) {
  const trimmed = propString(value).trim();
  return trimmed ? trimmed : fallback;
}

function boolValue(value: unknown): boolean | undefined {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  if (value && typeof value === "object") {
    const data = value as Record<string, unknown>;
    for (const candidate of [data.value, data.checked, data.enabled, data.selected, data.current, data.data]) {
      const parsed = boolValue(candidate);
      if (parsed !== undefined) return parsed;
    }
  }
  const normalizedValue = propString(value).trim().toLocaleLowerCase("tr");
  if (["false", "0", "no", "hayir", "hayır", "kapali", "kapalı", "off"].includes(normalizedValue)) return false;
  if (["true", "1", "yes", "evet", "acik", "açık", "on"].includes(normalizedValue)) return true;
  return undefined;
}

function pascal(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

const ARGENZ_PRODUCT_BASED_DEFAULTS: Record<string, unknown> = {
  productBasedSectionVisible: true,
  productBasedTitleHtml: "",
  productBasedTitleLine1Before: "",
  productBasedTitleLine1Highlight: "Katman Çizgileri",
  productBasedTitleLine1After: "",
  productBasedTitleLine2Before: "",
  productBasedTitleLine2Highlight: "Olmadan",
  productBasedTitleLine2After: " Doğal Diş",
  productBasedTitleLine3Before: "Görünümü",
  productBasedTitleLine3Highlight: "",
  productBasedTitleLine3After: "",
  productBasedIntroHtml:
    "<p>ArgenZ HT+ Multilayer Zirkonyum Blokları, dişin doğal gradyanını katman çizgileri olmaksızın yansıtarak benzersiz dayanıklılık ve renk doğruluğu sağlar. ABD'de izostatik presleme yöntemiyle üretilen bu yüksek kalite bloklar <b>FDA 510(k)</b> onayına sahiptir.</p>",
  productBasedDetailHtml: "",
  productBasedProofTitle: "Argen bloklarını kullananlar nasıl değerlendirdi?",
  productBasedQuote1Text:
    "<p>Koleden insizale renk geçişleri çok başarılı. Doğala özdeş renk geçişini yakalamak diğer bloklara nazaran daha az müdahale ile mümkün oluyor.</p>",
  productBasedQuote1Name: "Robert",
  productBasedQuote1Role: "CadCrowns, CA Inc.",
  productBasedQuote2Text:
    "<p>ArgenZ HT+, zirkonyum blok konusundaki tercihimiz. Şeffaflığı tam yerinde ve rengi harika. Dayanıklılığı da tam anlamıyla mükemmel.</p>",
  productBasedQuote2Name: "Tokuma Tanizaki",
  productBasedQuote2Role: "ACL Hawaii, Inc",
  productBasedQuote3Text: "",
  productBasedQuote3Name: "",
  productBasedQuote3Role: "",
  productBasedShowScoreBars: false,
  productBasedScore1Text: "",
  productBasedScore2Text: "",
  productBasedScore3Text: "",
  productBasedMediaLayout: "single",
  productBasedImageUrl: "https://cdn.myikas.com/images/theme-images/5574c72d-1874-42b8-9512-c20987744b5c/image_1080.webp",
  productBasedImageAlt: "ArgenZ HT+ Multilayer zirkonyum blok doğal diş görünümü",
  productBasedImageLabel: "",
  productBasedImage2Url: "",
  productBasedImage2Alt: "",
  productBasedImage2Label: "",
  productBasedImage3Url: "",
  productBasedImage3Alt: "",
  productBasedImage3Label: "",
  productBasedImage4Url: "",
  productBasedImage4Alt: "",
  productBasedImage4Label: "",
  productBasedReverseLayout: false,
  productBasedMaxWidth: 1900,
  productBasedPaddingTop: 118,
  productBasedPaddingBottom: 88,
  productBasedColumnGap: 140,
  productBasedTextColumnWidth: 460,
  productBasedContentWidth: 460,
  productBasedMediaColumnWidth: 1080,
  productBasedTitleFontSize: 28,
  productBasedBodyFontSize: 15,
  productBasedTitleMarginBottom: 42,
  productBasedIntroMarginBottom: 0,
  productBasedProofTitleMarginTop: 36,
  productBasedProofTitleMarginBottom: 20,
  productBasedScoreGap: 34,
  productBasedScoreBarMarginTop: 34,
  productBasedScoreBarWidth: 429,
  productBasedScoreBarHeight: 18,
  productBasedMediaDisplayWidth: 1080,
  productBasedMediaTopMargin: 0,
  productBasedMediaAspectRatio: "1.42 / 1",
  productBasedMediaBorderRadius: 28,
  productBasedImageObjectFit: "cover",
  productBasedImageScale: 1,
  productBasedImageXOffset: 0,
  productBasedImageYOffset: 0,
  productBasedBackgroundColor: "#ffffff",
  productBasedTextColor: "#000000",
  productBasedMutedTextColor: "#000000",
  productBasedAccentColor: "#dbfa37",
  productBasedMediaBackgroundColor: "#eeeeee",
};

const ARGENZ_ST_PRODUCT_BASED_DEFAULTS: Record<string, unknown> = {
  ...ARGENZ_PRODUCT_BASED_DEFAULTS,
  productBasedTitleLine1Before: "",
  productBasedTitleLine1Highlight: "Süper Işık Geçirgenliği(ST)",
  productBasedTitleLine1After: " ile",
  productBasedTitleLine2Before: "Üst Düzey Uyum",
  productBasedTitleLine2Highlight: "",
  productBasedTitleLine2After: "",
  productBasedTitleLine3Before: "",
  productBasedIntroHtml:
    "<p>Anterior kron ve köprü uygulamalarında, yüksek ışık geçirgenliği ile yandaki diş rengine en üst düzeyde uyum aranır.</p><p>ArgenZ ST Multilayer Zirkon Blok, doğal dentindeki renk geçişlerini katman çizgileri olmadan taklit eder ve süper şeffaflığıyla klinik ile laboratuvarlara büyük avantaj sağlar.</p><p>Makyaj gerektirmez; <b>sadece glaze uygulayıp</b> protezi bitime gönderebilirsiniz.</p>",
  productBasedProofTitle: "",
  productBasedQuote1Text: "",
  productBasedQuote1Name: "",
  productBasedQuote1Role: "",
  productBasedQuote2Text: "",
  productBasedQuote2Name: "",
  productBasedQuote2Role: "",
  productBasedImageAlt: "ArgenZ ST Multilayer zirkon blok ile doğal diş görünümü",
  productBasedImageObjectFit: "contain",
};

const CRS_TRAY_PRODUCT_BASED_DEFAULTS: Record<string, unknown> = {
  productBasedSectionVisible: true,
  productBasedTitleHtml: "Ölçü Süreçlerinde <mark>Stabil ve Tekrarlanabilir Sonuçlar</mark>",
  productBasedTitleLine1Before: "",
  productBasedTitleLine1Highlight: "",
  productBasedTitleLine1After: "",
  productBasedTitleLine2Before: "",
  productBasedTitleLine2Highlight: "",
  productBasedTitleLine2After: "",
  productBasedTitleLine3Before: "",
  productBasedTitleLine3Highlight: "",
  productBasedTitleLine3After: "",
  productBasedIntroHtml:
    "<p><b>CRS Tray Reçinesi</b> ile üretilen ölçü kaşıkları, dijital tasarım sürecine uyumlu şekilde hazırlanır ve her baskıda aynı formun korunmasına katkı sağlar. Bu sayede <b>ölçü süreçlerinde daha kontrollü ve öngörülebilir sonuçlar elde edilmesine yardımcı olur.</b></p>",
  productBasedDetailHtml: "",
  productBasedProofTitle: "CRS Tray Reçinesi'ni satın alanlar nasıl değerlendirdi?",
  productBasedQuote1Text: "",
  productBasedQuote1Name: "",
  productBasedQuote1Role: "",
  productBasedQuote2Text: "",
  productBasedQuote2Name: "",
  productBasedQuote2Role: "",
  productBasedQuote3Text: "",
  productBasedQuote3Name: "",
  productBasedQuote3Role: "",
  productBasedShowScoreBars: true,
  productBasedScore1Text: "<p>Ölçü kaşıklarının baskı sonrası formunu koruduğu ve stabil sonuçlar sunduğu belirtiliyor.</p>",
  productBasedScore1Value: 99,
  productBasedScore2Text: "<p>Tekrarlanabilir üretim sayesinde dijital iş akışına kolayca entegre edildiği ifade ediliyor.</p>",
  productBasedScore2Value: 96,
  productBasedScore3Text: "<p>Farklı dental ölçü uygulamalarında güvenle tercih edildiği görülüyor.</p>",
  productBasedScore3Value: 95,
  productBasedMediaLayout: "single",
  productBasedImageUrl: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/c089d52c-d0b8-4a97-8ac2-11fdc42768cf/1080/crs-tray-recinesi.webp",
  productBasedImageAlt: "CRS Tray Resin ölçü kaşığı 3D yazıcı reçinesi",
  productBasedImageLabel: "",
  productBasedImage2Url: "",
  productBasedImage2Alt: "",
  productBasedImage2Label: "",
  productBasedImage3Url: "",
  productBasedImage3Alt: "",
  productBasedImage3Label: "",
  productBasedImage4Url: "",
  productBasedImage4Alt: "",
  productBasedImage4Label: "",
  productBasedReverseLayout: false,
  productBasedMaxWidth: 1620,
  productBasedPaddingTop: 92,
  productBasedPaddingBottom: 96,
  productBasedColumnGap: 0,
  productBasedTextColumnWidth: 460,
  productBasedContentWidth: 460,
  productBasedMediaColumnWidth: 1080,
  productBasedMediaViewportWidth: "82vw",
  productBasedTitleFontSize: 34,
  productBasedBodyFontSize: 16,
  productBasedMediaAspectRatio: "1.48 / 1",
  productBasedMediaBorderRadius: 0,
  productBasedImageObjectFit: "contain",
  productBasedImageScale: 1.25,
  productBasedImageXOffset: 0,
  productBasedImageYOffset: 0,
  productBasedBackgroundColor: "#ffffff",
  productBasedTextColor: "#000000",
  productBasedMutedTextColor: "#000000",
  productBasedAccentColor: "#dbfa37",
  productBasedMediaBackgroundColor: "#ffffff",
  productBasedTitleMarginBottom: 28,
  productBasedIntroMarginBottom: 0,
  productBasedProofTitleMarginTop: 44,
  productBasedProofTitleMarginBottom: 32,
  productBasedScoreGap: 34,
  productBasedScoreBarMarginTop: 18,
  productBasedScoreBarWidth: 429,
  productBasedScoreBarHeight: 18,
  productBasedMediaDisplayWidth: 1080,
  productBasedMediaTopMargin: 0,
};

const CRS_COMPOSITE_PRODUCT_BASED_DEFAULTS: Record<string, unknown> = {
  productBasedSectionVisible: true,
  productBasedTitleHtml: "Biyouyumlu <mark>Geçici ve Daimi</mark><br />Reçinesi",
  productBasedTitleLine1Before: "",
  productBasedTitleLine1Highlight: "",
  productBasedTitleLine1After: "",
  productBasedTitleLine2Before: "",
  productBasedTitleLine2Highlight: "",
  productBasedTitleLine2After: "",
  productBasedTitleLine3Before: "",
  productBasedTitleLine3Highlight: "",
  productBasedTitleLine3After: "",
  productBasedIntroHtml:
    "<p>CRS Composite, <b>CE Class IIA</b> sertifikalı toksik olmayan formülasyonu sayesinde ağız içinde güvenle kullanılabilir.</p>",
  productBasedDetailHtml: "",
  productBasedProofTitle: "CRS Composite Reçinesi'ni satın alanlar nasıl değerlendirdi ?",
  productBasedQuote1Text: "",
  productBasedQuote1Name: "",
  productBasedQuote1Role: "",
  productBasedQuote2Text: "",
  productBasedQuote2Name: "",
  productBasedQuote2Role: "",
  productBasedQuote3Text: "",
  productBasedQuote3Name: "",
  productBasedQuote3Role: "",
  productBasedShowScoreBars: true,
  productBasedScore1Text: "<p>Baskı sonrası kürleme işleminde <b>sararma yapmadığını</b> söyledi</p>",
  productBasedScore1Value: 99,
  productBasedScore2Text: "<p><b>Yüksek mekanik dayanımı</b> sayesinde kırılmadan uzun süre kullanılabildiğini söyledi</p>",
  productBasedScore2Value: 97,
  productBasedScore3Text: "<p><b>Şırınga dolgu malzemesiyle yüksek uyum</b> sayesinde hasta ağzında geçici diş üzerinde değişiklik yapabildiğini söyledi</p>",
  productBasedScore3Value: 95,
  productBasedMediaLayout: "single",
  productBasedImageUrl: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/0c8743e4-abb5-4d0b-854c-3a4f5a46b686/1080/sand-model-gecici-4.webp",
  productBasedImageAlt: "CRS Composite geçici ve daimi reçine uygulama modeli",
  productBasedImageLabel: "",
  productBasedImage2Url: "",
  productBasedImage2Alt: "",
  productBasedImage2Label: "",
  productBasedImage3Url: "",
  productBasedImage3Alt: "",
  productBasedImage3Label: "",
  productBasedImage4Url: "",
  productBasedImage4Alt: "",
  productBasedImage4Label: "",
  productBasedReverseLayout: false,
  productBasedMaxWidth: 1620,
  productBasedPaddingTop: 92,
  productBasedPaddingBottom: 96,
  productBasedColumnGap: 0,
  productBasedTextColumnWidth: 460,
  productBasedContentWidth: 460,
  productBasedMediaColumnWidth: 1080,
  productBasedTitleFontSize: 34,
  productBasedBodyFontSize: 16,
  productBasedMediaAspectRatio: "1.48 / 1",
  productBasedMediaBorderRadius: 0,
  productBasedImageObjectFit: "contain",
  productBasedImageScale: 1.25,
  productBasedImageXOffset: 0,
  productBasedImageYOffset: 0,
  productBasedBackgroundColor: "#ffffff",
  productBasedTextColor: "#000000",
  productBasedMutedTextColor: "#000000",
  productBasedAccentColor: "#dbfa37",
  productBasedMediaBackgroundColor: "#ffffff",
  productBasedTitleMarginBottom: 28,
  productBasedIntroMarginBottom: 0,
  productBasedProofTitleMarginTop: 44,
  productBasedProofTitleMarginBottom: 32,
  productBasedScoreGap: 34,
  productBasedScoreBarMarginTop: 18,
  productBasedScoreBarWidth: 429,
  productBasedScoreBarHeight: 18,
  productBasedMediaDisplayWidth: 1080,
  productBasedMediaTopMargin: 0,
};

const CRS_MODEL_PRODUCT_BASED_DEFAULTS: Record<string, unknown> = {
  productBasedSectionVisible: true,
  productBasedTitleHtml: "Bir Model Reçinesini Kaliteli Yapan Unsur: <mark>Boyutsal Kararlılık</mark>",
  productBasedTitleLine1Before: "",
  productBasedTitleLine1Highlight: "",
  productBasedTitleLine1After: "",
  productBasedTitleLine2Before: "",
  productBasedTitleLine2Highlight: "",
  productBasedTitleLine2After: "",
  productBasedTitleLine3Before: "",
  productBasedTitleLine3Highlight: "",
  productBasedTitleLine3After: "",
  productBasedIntroHtml:
    "<p>CRS Model, hassasiyeti yüksek model baskıları almanıza olanak sağlar ve baskı sonrası şekil değiştirmez.</p><p>Bir tedavideki en önemli şey modelin doğruluğudur çünkü diğer tüm işlemlerin referans noktası model olmaktadır. CRS Model'in yüksek boyutsal kararlılığı sayesinde, protezin başlangıç noktasından her zaman emin olursunuz.</p>",
  productBasedDetailHtml: "",
  productBasedProofTitle: "CRS Model Reçinesi'ni satın alanlar nasıl değerIendirdi ?",
  productBasedQuote1Text: "",
  productBasedQuote1Name: "",
  productBasedQuote1Role: "",
  productBasedQuote2Text: "",
  productBasedQuote2Name: "",
  productBasedQuote2Role: "",
  productBasedQuote3Text: "",
  productBasedQuote3Name: "",
  productBasedQuote3Role: "",
  productBasedShowScoreBars: true,
  productBasedScore1Text: "<p>Baskı sonrası <b>boyut değiştirmemesi</b> sayesinde herhangi bir uyum sorunu yaşamadığını söyledi.</p>",
  productBasedScore1Value: 99,
  productBasedScore2Text: "<p>Yüksek doğruluğu sayesinde tüm <b>implant analogları ile mükemmel uyumlu</b> olduğu söyledi.</p>",
  productBasedScore2Value: 97,
  productBasedScore3Text: "<p>Renk seçenekleri sayesinde hasta ve hekimlere kron renklerini göstermeyi kolaylaştırdığını söyledi.</p>",
  productBasedScore3Value: 96,
  productBasedMediaLayout: "single",
  productBasedImageUrl: crsModelDimensionalStabilityImage,
  productBasedImageAlt: "CRS Model boyutsal kararlılık model detayları",
  productBasedImageLabel: "",
  productBasedImage2Url: "",
  productBasedImage2Alt: "",
  productBasedImage2Label: "",
  productBasedImage3Url: "",
  productBasedImage3Alt: "",
  productBasedImage3Label: "",
  productBasedImage4Url: "",
  productBasedImage4Alt: "",
  productBasedImage4Label: "",
  productBasedReverseLayout: false,
  productBasedMaxWidth: 1620,
  productBasedPaddingTop: 92,
  productBasedPaddingBottom: 96,
  productBasedColumnGap: 0,
  productBasedTextColumnWidth: 460,
  productBasedContentWidth: 460,
  productBasedMediaColumnWidth: 1080,
  productBasedMediaViewportWidth: "82vw",
  productBasedTitleFontSize: 34,
  productBasedBodyFontSize: 16,
  productBasedMediaAspectRatio: "1.48 / 1",
  productBasedMediaBorderRadius: 0,
  productBasedImageObjectFit: "contain",
  productBasedImageScale: 1.25,
  productBasedImageXOffset: 0,
  productBasedImageYOffset: 0,
  productBasedBackgroundColor: "#ffffff",
  productBasedTextColor: "#000000",
  productBasedMutedTextColor: "#000000",
  productBasedAccentColor: "#dbfa37",
  productBasedMediaBackgroundColor: "#ffffff",
  productBasedTitleMarginBottom: 54,
  productBasedIntroMarginBottom: 0,
  productBasedProofTitleMarginTop: 44,
  productBasedProofTitleMarginBottom: 32,
  productBasedScoreGap: 34,
  productBasedScoreBarMarginTop: 18,
  productBasedScoreBarWidth: 429,
  productBasedScoreBarHeight: 18,
  productBasedMediaDisplayWidth: 1080,
  productBasedMediaTopMargin: 0,
};

function filled(value: unknown) {
  return typeof value === "string" ? value.trim() !== "" : value !== undefined && value !== null;
}

function normalized(value: unknown) {
  return propString(value).trim().toLocaleLowerCase("tr");
}

function slugify(value: string) {
  return value
    .toLocaleLowerCase("tr")
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

function collectProductStrings(value: unknown, output: string[] = []) {
  if (!value) return output;
  if (typeof value === "string" || typeof value === "number") {
    const raw = String(value).trim();
    if (raw) {
      output.push(raw.toLocaleLowerCase("tr"));
      output.push(slugify(raw));
    }
    return output;
  }
  if (Array.isArray(value)) {
    value.forEach((item) => collectProductStrings(item, output));
    return output;
  }
  if (typeof value === "object") {
    const data = value as Record<string, unknown>;
    for (const key of ["slug", "handle", "url", "path", "href", "name", "title", "id"]) collectProductStrings(data[key], output);
    for (const key of ["metadata", "product", "variant", "variants", "selectedVariant"]) collectProductStrings(data[key], output);
  }
  return output;
}

function productMatchesCurrentPage(product: unknown) {
  if (!product) return false;
  if (typeof window === "undefined") return true;
  const current = `${window.location.pathname} ${window.location.href}`.toLocaleLowerCase("tr");
  const currentSlug = slugify(window.location.pathname);
  const terms = Array.from(new Set(collectProductStrings(product))).filter((term) => term.length > 2);
  return terms.some((term) => current.includes(term) || currentSlug.includes(term));
}

function targetSlugsMatch(data: Record<string, unknown>) {
  const raw = propString(data.productBasedTargetSlugs).trim();
  if (!raw) return undefined;
  if (typeof window === "undefined") return undefined;
  const current = `${window.location.pathname} ${window.location.href}`.toLocaleLowerCase("tr");
  const currentSlug = slugify(window.location.pathname);
  const targets = raw
    .split(/[\n,;]+/)
    .map((item) => slugify(item.trim()))
    .filter(Boolean);
  return targets.some((target) => current.includes(target) || currentSlug.includes(target));
}

function slugListMatch(value: unknown, product: unknown) {
  const targets = propString(value)
    .split(/[\n,;]+/)
    .map((item) => slugify(item.trim()))
    .filter(Boolean);
  if (!targets.length) return undefined;

  const terms = collectProductStrings(product).map(slugify);
  if (typeof window !== "undefined") {
    terms.push(slugify(window.location.pathname));
    terms.push(slugify(window.location.href));
  }

  const uniqueTerms = Array.from(new Set(terms.filter((term) => term.length > 2)));
  if (!uniqueTerms.length) return undefined;
  return targets.some((target) =>
    uniqueTerms.some((term) => term === target || term.includes(target) || (target.length >= 14 && target.includes(term))),
  );
}

function productBasedHidden(props: Props) {
  const visibility = productBasedVisibilityOverride(props);
  if (visibility === false) return true;
  return slugListMatch((props as Record<string, unknown>).productBasedHiddenSlugs, props.product) === true;
}

function productSelectionMatchesCurrent(selection: unknown, currentProduct: unknown) {
  const targets = Array.from(new Set(collectProductStrings(selection).map(slugify))).filter((term) => term.length > 2);
  if (!targets.length) return false;

  const terms = collectProductStrings(currentProduct).map(slugify);
  if (typeof window !== "undefined") {
    terms.push(slugify(window.location.pathname));
    terms.push(slugify(window.location.href));
  }

  const uniqueTerms = Array.from(new Set(terms.filter((term) => term.length > 2)));
  return targets.some((target) =>
    uniqueTerms.some((term) => term === target || term.includes(target) || (target.length >= 14 && target.includes(term))),
  );
}

function productBasedVisibilityOverride(props: Props) {
  const data = props as Record<string, unknown>;
  for (let index = 1; index <= 5; index += 1) {
    const product = data[`productBasedVisibilityProduct${index}`];
    if (!product) continue;
    if (productSelectionMatchesCurrent(product, props.product)) {
      const showValue = data[`productBasedVisibilityShow${index}`];
      return (showValue === undefined ? boolValue(data[`productBasedVisibilityVisible${index}`]) : boolValue(showValue)) !== false;
    }
  }
  return undefined;
}

function isEditorPreview() {
  if (typeof window === "undefined") return false;
  try {
    if (window.self !== window.top) return true;
  } catch {
    return true;
  }
  return window.location.href.toLocaleLowerCase("tr").includes("ikas");
}

function productBasedApplies(props: Props) {
  if (boolValue(props.productBasedEnabled) === false) return false;
  const data = props as Record<string, unknown>;
  if (productBasedHidden(props)) return false;
  if (productBasedVisibilityOverride(props) === true) return true;
  const targetMatch = targetSlugsMatch(data);
  if (targetMatch !== undefined) return targetMatch;
  return productMatchesCurrentPage(props.product);
}

function productBasedDesignApplies(props: Props) {
  if (boolValue(props.productBasedEnabled) === false) return false;
  if (productBasedHidden(props)) return false;
  return isEditorPreview() || productBasedApplies(props);
}

function normalizedJson(value: unknown) {
  try {
    return JSON.stringify(value ?? "").toLocaleLowerCase("tr");
  } catch {
    return normalized(value);
  }
}

function currentPathText() {
  if (typeof window === "undefined") return "";
  return `${window.location.pathname} ${window.location.href}`.toLocaleLowerCase("tr");
}

function productLooksLikeHtPlus(data: Record<string, unknown>) {
  const productText = normalizedJson(data.product);
  const pageText = [
    data.productBasedTitleHtml,
    data.productBasedTitleLine1Before,
    data.productBasedTitleLine1Highlight,
    data.productBasedTitleLine1After,
    data.productBasedTitleLine2Before,
    data.productBasedTitleLine2Highlight,
    data.productBasedTitleLine2After,
    data.productBasedTitleLine3Before,
    data.productBasedTitleLine3Highlight,
    data.productBasedTitleLine3After,
    data.productBasedIntroHtml,
    data.productBasedImageAlt,
    data.titleHtml,
    data.titleLine1Before,
    data.titleLine1Highlight,
    data.titleLine1After,
    data.titleLine2Before,
    data.titleLine2Highlight,
    data.titleLine2After,
    data.titleLine3Before,
    data.titleLine3Highlight,
    data.titleLine3After,
    data.introHtml,
    data.imageAlt,
    currentPathText(),
  ]
    .map(normalized)
    .join(" ");
  const combined = `${productText} ${pageText} ${currentPathText()}`;

  return (
    combined.includes("argenz-ht-plus") ||
    combined.includes("argenz-ht-multilayer") ||
    combined.includes("argenz ht+") ||
    combined.includes("ht+ multilayer")
  );
}

function productLooksLikeSt(data: Record<string, unknown>) {
  const combined = `${normalizedJson(data.product)} ${currentPathText()}`;
  return combined.includes("argenz-st") || combined.includes("argenz st");
}

function productLooksLikeCrsTray(data: Record<string, unknown>) {
  const productText = normalizedJson(data.product);
  const pageText = [
    data.productBasedTitleHtml,
    data.productBasedTitleLine1Before,
    data.productBasedTitleLine1Highlight,
    data.productBasedTitleLine1After,
    data.productBasedTitleLine2Before,
    data.productBasedTitleLine2Highlight,
    data.productBasedTitleLine2After,
    data.productBasedIntroHtml,
    data.productBasedImageUrl,
    data.titleHtml,
    data.titleLine1Before,
    data.titleLine1Highlight,
    data.titleLine1After,
    data.titleLine2Before,
    data.titleLine2Highlight,
    data.titleLine2After,
    data.introHtml,
    data.imageUrl,
  ]
    .map(normalized)
    .join(" ");

  const combined = `${productText} ${pageText}`;
  return (
    combined.includes("9a834f16-e7e0-41da-b7ab-2854e565daf2") ||
    combined.includes("crs-tray-resin") ||
    combined.includes("ölçü kaşığı") ||
    combined.includes("olcu kasigi")
  );
}

function productLooksLikeCrsComposite(data: Record<string, unknown>) {
  const productText = normalizedJson(data.product);
  const pageText = currentPathText();

  const combined = `${productText} ${pageText}`;
  return (
    combined.includes("crs-composite-mukemmel-dayanimli-gecici-recinesi") ||
    combined.includes("crs composite") ||
    combined.includes("custom composite resin")
  );
}

function targetLooksLikeCrsComposite(data: Record<string, unknown>) {
  const targetMatch = targetSlugsMatch(data);
  if (targetMatch !== true) return false;
  const targets = normalized(data.productBasedTargetSlugs);
  return targets.includes("crs-composite-mukemmel-dayanimli-gecici-recinesi") || targets.includes("crs composite");
}

function productLooksLikeCrsModel(data: Record<string, unknown>) {
  const productText = normalizedJson(data.product);
  const pageText = currentPathText();

  const combined = `${productText} ${pageText}`;
  return (
    combined.includes("crs-model-yuksek-hassasiyetli-model-recinesi") ||
    combined.includes("crs model") ||
    combined.includes("custom model sand resin")
  );
}

function targetLooksLikeCrsModel(data: Record<string, unknown>) {
  const targetMatch = targetSlugsMatch(data);
  if (targetMatch !== true) return false;
  const targets = normalized(data.productBasedTargetSlugs);
  return targets.includes("crs-model-yuksek-hassasiyetli-model-recinesi") || targets.includes("crs model");
}

function hasStaleSplitContent(data: Record<string, unknown>) {
  const titleParts = [
    data.productBasedTitleHtml,
    data.productBasedTitleLine1Before,
    data.productBasedTitleLine1Highlight,
    data.productBasedTitleLine1After,
    data.productBasedTitleLine2Before,
    data.productBasedTitleLine2Highlight,
    data.productBasedTitleLine2After,
    data.productBasedTitleLine3Before,
    data.productBasedTitleLine3Highlight,
    data.productBasedTitleLine3After,
    data.titleHtml,
    data.titleLine1Before,
    data.titleLine1Highlight,
    data.titleLine1After,
    data.titleLine2Before,
    data.titleLine2Highlight,
    data.titleLine2After,
    data.titleLine3Before,
    data.titleLine3Highlight,
    data.titleLine3After,
  ]
    .map(normalized)
    .join(" ");

  const bodyParts = [
    data.productBasedIntroHtml,
    data.productBasedDetailHtml,
    data.productBasedProofTitle,
    data.productBasedQuote1Text,
    data.productBasedQuote1Name,
    data.productBasedQuote1Role,
    data.productBasedQuote2Text,
    data.productBasedQuote2Name,
    data.productBasedQuote2Role,
    data.productBasedQuote3Text,
    data.productBasedQuote3Name,
    data.productBasedQuote3Role,
    data.introHtml,
    data.detailHtml,
    data.proofTitle,
    data.quote1Text,
    data.quote1Name,
    data.quote1Role,
    data.quote2Text,
    data.quote2Name,
    data.quote2Role,
    data.quote3Text,
    data.quote3Name,
    data.quote3Role,
  ]
    .map(normalized)
    .join(" ");

  const imageParts = [
    data.productBasedImageUrl,
    data.productBasedImage2Url,
    data.productBasedImage3Url,
    data.productBasedImage4Url,
    data.imageUrl,
    data.image2Url,
    data.image3Url,
    data.image4Url,
  ]
    .map(normalized)
    .join(" ");

  return (
    titleParts.includes("katman çizgileri") ||
    titleParts.includes("olmadan") ||
    titleParts.includes("doğal diş") ||
    bodyParts.includes("koleden insizale") ||
    bodyParts.includes("argenz ht+") ||
    imageParts.includes("52f4db8b") ||
    imageParts.includes("409af8d9") ||
    imageParts.includes("def44dad")
  );
}

function shouldUseArgenzDefaults(data: Record<string, unknown>) {
  if (productLooksLikeSt(data)) return false;
  return productLooksLikeHtPlus(data) || hasStaleSplitContent(data);
}

const ARGENZ_STALE_PRODUCT_BASED_VALUES: Record<string, unknown[]> = {
  productBasedMaxWidth: [1640, 1740, 1780],
  productBasedPaddingTop: [132],
  productBasedPaddingBottom: [142],
  productBasedColumnGap: [72, 160, 180, 220, 260],
  productBasedTextColumnWidth: [340, 420, 500, 520],
  productBasedContentWidth: [340, 420, 470, 500, 510],
  productBasedMediaColumnWidth: [856, 960],
  productBasedTitleMarginBottom: [48],
  productBasedMediaDisplayWidth: [856, 960],
  productBasedTitleFontSize: [22, 24, 30, 32],
  productBasedBodyFontSize: [13, 14, 16],
};

function samePropValue(value: unknown, staleValue: unknown) {
  if (typeof staleValue === "number") return Number(value) === staleValue;
  return normalized(value) === normalized(staleValue);
}

function isKnownStaleArgenzValue(propName: string, value: unknown) {
  const staleValues = ARGENZ_STALE_PRODUCT_BASED_VALUES[propName];
  if (staleValues?.some((staleValue) => samePropValue(value, staleValue))) return true;

  if (propName.toLowerCase().includes("imageurl")) {
    const image = normalized(value);
    return image.includes("52f4db8b") || image.includes("409af8d9") || image.includes("def44dad");
  }

  return false;
}

function isCompositeDefaultValue(propName: string, value: unknown) {
  const current = normalized(value);
  const compositeDefault = normalized(CRS_COMPOSITE_PRODUCT_BASED_DEFAULTS[propName]);
  return !!current && !!compositeDefault && current === compositeDefault;
}

function productBasedProps(props: Props): Props {
  if (!productBasedDesignApplies(props)) return props;

  const source = props as Record<string, unknown>;
  const useCrsCompositeDefaults = productLooksLikeCrsComposite(source) || targetLooksLikeCrsComposite(source);
  const useCrsModelDefaults = !useCrsCompositeDefaults && (productLooksLikeCrsModel(source) || targetLooksLikeCrsModel(source));
  const useCrsDefaults = !useCrsCompositeDefaults && !useCrsModelDefaults && productLooksLikeCrsTray(source);
  const useStDefaults = !useCrsCompositeDefaults && !useCrsModelDefaults && productLooksLikeSt(source);
  const useArgenzDefaults = !useCrsCompositeDefaults && !useCrsModelDefaults && shouldUseArgenzDefaults(source);
  const defaults = useCrsCompositeDefaults
    ? CRS_COMPOSITE_PRODUCT_BASED_DEFAULTS
    : useCrsModelDefaults
      ? CRS_MODEL_PRODUCT_BASED_DEFAULTS
    : useCrsDefaults
      ? CRS_TRAY_PRODUCT_BASED_DEFAULTS
      : useStDefaults
        ? ARGENZ_ST_PRODUCT_BASED_DEFAULTS
        : ARGENZ_PRODUCT_BASED_DEFAULTS;

  return new Proxy(props as Record<string, unknown>, {
    get(target, prop) {
      if (typeof prop !== "string") return Reflect.get(target, prop);
      if (prop.startsWith("productBased")) return target[prop];
      const productBasedName = `productBased${pascal(prop)}`;
      const defaultValue = defaults[productBasedName];
      if (Object.prototype.hasOwnProperty.call(target, productBasedName)) {
        const productBasedValue = target[productBasedName];
        const isStaleLayoutValue =
          [
            "productBasedColumnGap",
            "productBasedTextColumnWidth",
            "productBasedContentWidth",
            "productBasedMediaColumnWidth",
            "productBasedMediaDisplayWidth",
            "productBasedTitleFontSize",
            "productBasedBodyFontSize",
          ].includes(productBasedName) && isKnownStaleArgenzValue(productBasedName, productBasedValue);
        if (!useCrsDefaults && useArgenzDefaults && (isStaleLayoutValue || isKnownStaleArgenzValue(productBasedName, productBasedValue))) {
          return defaultValue;
        }
        if ((useStDefaults || useArgenzDefaults || useCrsDefaults) && isCompositeDefaultValue(productBasedName, productBasedValue)) {
          return defaultValue;
        }
        if ((useCrsModelDefaults || useCrsDefaults) && productBasedName in defaults) return defaultValue;
        if (productBasedValue !== undefined && productBasedValue !== null) return productBasedValue;
      }
      if ((useCrsCompositeDefaults || useCrsModelDefaults || useStDefaults || useArgenzDefaults || useCrsDefaults) && productBasedName in defaults) {
        return defaultValue;
      }
      if ((useCrsCompositeDefaults || useCrsModelDefaults || useArgenzDefaults || useCrsDefaults) && filled(defaultValue)) return defaultValue;
      return target[prop];
    },
  }) as Props;
}

function numberValue(value: unknown, fallback: number, min?: number, max?: number) {
  const next = Number(value);
  if (!Number.isFinite(next)) return fallback;
  return Math.min(max ?? next, Math.max(min ?? next, next));
}

function cssLength(value: unknown, fallback: number, unit = "px") {
  return `${numberValue(value, fallback)}${unit}`;
}

function cssLengthOrFallback(value: unknown, fallback: number, unit = "px") {
  const next = Number(value);
  return `${Number.isFinite(next) && next > 0 ? next : fallback}${unit}`;
}

function ratioValue(value: unknown, fallback: string) {
  const trimmed = propString(value).trim();
  return trimmed || fallback;
}

function mediaMode(value?: unknown) {
  const normalized = propString(value).trim().toLowerCase();
  return normalized === "grid" || normalized === "compare" || normalized === "karşılaştırma" ? "grid" : "single";
}

function objectFit(value?: unknown) {
  const normalized = propString(value).trim().toLowerCase();
  return ["contain", "cover", "fill", "scale-down"].includes(normalized) ? normalized : "cover";
}

function clampPercent(value: unknown, fallback: number) {
  return numberValue(value, fallback, 0, 100);
}

function renderTitle(props: Props) {
  if (propString(props.titleHtml).trim()) {
    return <h2 className="tmpsf-title" dangerouslySetInnerHTML={html(props.titleHtml)} />;
  }

  const lines = [
    [text(props.titleLine1Before, ""), text(props.titleLine1Highlight, ""), text(props.titleLine1After, "")],
    [text(props.titleLine2Before, ""), text(props.titleLine2Highlight, ""), text(props.titleLine2After, "")],
    [text(props.titleLine3Before, ""), text(props.titleLine3Highlight, ""), text(props.titleLine3After, "")],
  ];

  return (
    <h2 className="tmpsf-title">
      {lines.map(([before, highlight, after], index) => {
        if (!before && !highlight && !after) return null;
        return (
          <span className="tmpsf-title-line" key={index}>
            {before ? <>{before}</> : null}
            {highlight ? <mark>{highlight}</mark> : null}
            {after ? <>{after}</> : null}
          </span>
        );
      })}
    </h2>
  );
}

function renderQuote(textValue: unknown, name: unknown, role: unknown, index?: number) {
  const quoteText = propString(textValue).trim();
  const nameText = propString(name).trim();
  const roleText = propString(role).trim();
  if (!quoteText) return null;

  return (
    <figure className="tmpsf-quote" key={index}>
      <blockquote dangerouslySetInnerHTML={html(quoteText)} />
      {nameText || roleText ? (
        <figcaption>
          {nameText ? <b>{nameText}</b> : null}
          {roleText ? <span>{roleText}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}

function renderScore(textValue: unknown, value: number | undefined, fallbackValue: number, index: number) {
  const scoreText = propString(textValue).trim();
  if (!scoreText) return null;
  const score = clampPercent(value, fallbackValue);

  return (
    <div className="tmpsf-score" key={index}>
      <p dangerouslySetInnerHTML={html(scoreText)} />
      <div className="tmpsf-score-row">
        <span className="tmpsf-score-track">
          <span style={{ width: `${score}%` }} />
        </span>
        <b>%{score}</b>
      </div>
    </div>
  );
}

function renderMediaItem(src: unknown, alt: unknown, label: unknown, index: number) {
  const srcText = imageSrc(src).trim();
  const altText = propString(alt).trim();
  const labelText = propString(label).trim();
  if (!srcText) return null;

  return (
    <figure className="tmpsf-media-item" key={index}>
      {labelText ? <figcaption>{labelText}</figcaption> : null}
      <img src={srcText} alt={altText || labelText || ""} loading="lazy" decoding="async" />
    </figure>
  );
}

export function ThreeMashProductSplitFeature(props: Props) {
  const sourceData = resolveProductDetailData(props.product, (props as Record<string, unknown>).productTemplateJson);
  if (sourceData) {
    return (
      <ProductDetailSectionScope data={sourceData}>
        <ProductDetailRatingsSection data={sourceData} />
      </ProductDetailSectionScope>
    );
  }

  const visibility = productBasedVisibilityOverride(props);
  if (visibility === false) return null;
  if (visibility !== true && (isEditorPreview() || productBasedApplies(props)) && boolValue(props.productBasedSectionVisible) === false) return null;
  if (productBasedHidden(props)) return null;

  const viewProps = productBasedProps(props);
  const mode = mediaMode(viewProps.mediaLayout);
  const mediaItems = [
    renderMediaItem(viewProps.imageUrl, viewProps.imageAlt, viewProps.imageLabel, 1),
    renderMediaItem(viewProps.image2Url, viewProps.image2Alt, viewProps.image2Label, 2),
    renderMediaItem(viewProps.image3Url, viewProps.image3Alt, viewProps.image3Label, 3),
    renderMediaItem(viewProps.image4Url, viewProps.image4Alt, viewProps.image4Label, 4),
  ].filter(Boolean);

  const style = {
    "--tmpsf-bg": text(viewProps.backgroundColor, "#ffffff"),
    "--tmpsf-text": text(viewProps.textColor, "#050505"),
    "--tmpsf-muted": text(viewProps.mutedTextColor, "#181818"),
    "--tmpsf-accent": text(viewProps.accentColor, "#c7f136"),
    "--tmpsf-media-bg": text(viewProps.mediaBackgroundColor, "#eeeeee"),
    "--tmpsf-score-track": text(viewProps.scoreTrackColor, "#050505"),
    "--tmpsf-max": cssLength(viewProps.maxWidth, 1240),
    "--tmpsf-pt": cssLength(viewProps.paddingTop, 82),
    "--tmpsf-pb": cssLength(viewProps.paddingBottom, 82),
    "--tmpsf-gap": cssLength(viewProps.columnGap, 64),
    "--tmpsf-text-col": cssLength(viewProps.textColumnWidth, 420),
    "--tmpsf-content-w": cssLengthOrFallback((viewProps as any).contentWidth, numberValue(viewProps.textColumnWidth, 540)),
    "--tmpsf-media-col": cssLength(viewProps.mediaColumnWidth, 720),
    "--tmpsf-media-vw": text((viewProps as any).mediaViewportWidth, "52vw"),
    "--tmpsf-title-size": cssLength(viewProps.titleFontSize, 34),
    "--tmpsf-body-size": cssLength(viewProps.bodyFontSize, 17),
    "--tmpsf-media-ratio": ratioValue(viewProps.mediaAspectRatio, mode === "grid" ? "1.44 / 1" : "1.5 / 1"),
    "--tmpsf-media-radius": cssLength(viewProps.mediaBorderRadius, 28),
    "--tmpsf-image-fit": objectFit(viewProps.imageObjectFit),
    "--tmpsf-image-scale": numberValue(viewProps.imageScale, 1, 0.2, 2),
    "--tmpsf-image-x": cssLength(viewProps.imageXOffset, 0),
    "--tmpsf-image-y": cssLength(viewProps.imageYOffset, 0),
    "--tmpsf-title-mb": cssLength((viewProps as any).titleMarginBottom, 42),
    "--tmpsf-intro-mb": cssLength((viewProps as any).introMarginBottom, 0),
    "--tmpsf-proof-mt": cssLength((viewProps as any).proofTitleMarginTop, 38),
    "--tmpsf-proof-mb": cssLength((viewProps as any).proofTitleMarginBottom, 20),
    "--tmpsf-score-gap": cssLength((viewProps as any).scoreGap, 34),
    "--tmpsf-score-bar-mt": cssLength((viewProps as any).scoreBarMarginTop, 34),
    "--tmpsf-score-bar-w": cssLengthOrFallback((viewProps as any).scoreBarWidth, 9999),
    "--tmpsf-score-bar-h": cssLength((viewProps as any).scoreBarHeight, 18),
    "--tmpsf-media-display-w": cssLengthOrFallback((viewProps as any).mediaDisplayWidth, numberValue(viewProps.mediaColumnWidth, 720)),
    "--tmpsf-media-mt": cssLength((viewProps as any).mediaTopMargin, 0),
  } as any;

  const quoteNodes = [
    renderQuote(viewProps.quote1Text, viewProps.quote1Name, viewProps.quote1Role, 1),
    renderQuote(viewProps.quote2Text, viewProps.quote2Name, viewProps.quote2Role, 2),
    renderQuote(viewProps.quote3Text, viewProps.quote3Name, viewProps.quote3Role, 3),
  ].filter(Boolean);

  const scoreNodes = [
    renderScore(viewProps.score1Text, viewProps.score1Value, 99, 1),
    renderScore(viewProps.score2Text, viewProps.score2Value, 97, 2),
    renderScore(viewProps.score3Text, viewProps.score3Value, 96, 3),
  ].filter(Boolean);

  return (
    <section
      id={text(viewProps.sectionAnchorId, "") || undefined}
      className={`three-mash-product-split-feature${viewProps.reverseLayout ? " is-reversed" : ""} is-${mode}`}
      style={style}
    >
      <div className="tmpsf-wrap">
        <div className="tmpsf-copy">
          {renderTitle(viewProps)}
          {text(viewProps.introHtml, "") ? <div className="tmpsf-intro" dangerouslySetInnerHTML={html(viewProps.introHtml)} /> : null}
          {text(viewProps.detailHtml, "") ? <div className="tmpsf-detail" dangerouslySetInnerHTML={html(viewProps.detailHtml)} /> : null}
          {text(viewProps.proofTitle, "") ? <h3>{text(viewProps.proofTitle, "")}</h3> : null}
          {viewProps.showScoreBars ? <div className="tmpsf-scores">{scoreNodes}</div> : <div className="tmpsf-quotes">{quoteNodes}</div>}
        </div>

        <div className="tmpsf-media" aria-label={text(viewProps.imageAlt, "Ürün görseli")}>
          {mediaItems.length ? mediaItems : <div className="tmpsf-media-placeholder">Görsel ekleyin</div>}
        </div>
      </div>
    </section>
  );
}

export default ThreeMashProductSplitFeature;
