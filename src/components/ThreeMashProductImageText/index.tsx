import { getDefaultSrc } from "@ikas/bp-storefront";
import { Props } from "./types";
import argenzHtMultilayerDetailImage from "../../assets/argenz-ht-multilayer-detail-data";
import crsCompositeSararmaImage from "../../assets/crs-composite-sararma-data";
import crsModelMarginDetailImage from "../../assets/crs-model-margin-detail-data";
import crsTrayControlledProcessImage from "../../assets/crs-tray-controlled-process-data";
import { useSharedProductDetailData } from "../../sub-components/ThreeMashProductDetailData";
import { ProductDetailEcosystemSection, ProductDetailSectionScope, ProductDetailUseCasesSection } from "../../sub-components/ThreeMashProductDetailTemplate";

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
    data.title,
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

function text(value: unknown, fallback = "") {
  const trimmed = propString(value).trim();
  return trimmed || fallback;
}

function boolValue(value: unknown): boolean | undefined {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value === 0 ? false : true;
  if (value && typeof value === "object") {
    const data = value as Record<string, unknown>;
    for (const candidate of [data.value, data.checked, data.enabled, data.selected, data.current, data.data]) {
      const parsed = boolValue(candidate);
      if (parsed !== undefined) return parsed;
    }
  }

  const normalized = propString(value).trim().toLocaleLowerCase("tr");
  if (["false", "0", "no", "hayir", "hayır", "kapali", "kapalı", "off"].includes(normalized)) return false;
  if (["true", "1", "yes", "evet", "acik", "açık", "on"].includes(normalized)) return true;
  return undefined;
}

function pascal(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

const ARGENZ_PRODUCT_BASED_DEFAULTS: Record<string, unknown> = {
  productBasedSectionVisible: true,
  productBasedSectionAnchorId: "",
  productBasedTitleHtml: "",
  productBasedTitleText: "Öne Çıkan Özellikler",
  productBasedDescriptionHtml:
    '<p><b>Geçirgenlik:</b> %45</p>\n\n<p><b>Eğilme Mukavemeti:</b> 1250 MPa</p>\n\n<p><b>İtriyum Mol Yüzdesi:</b> 4Y</p>\n\n<p><b>Renk Skalası:</b> 16 VITA Klasik ve 3 Bleach ve 5 açık ton seçenekleri mevcuttur.</p>\n\n<p><b>Uygulama Alanları:</b> Tek krondan full mouth restorasyonlara kadar tüm işler.</p>\n\n<p class="tmpit-download"><a href="https://s3.amazonaws.com/argen-product-images/commerce/brochure_uploads/brochures/000/000/508/original/L03500.pdf?1680796097" target="_blank" rel="noreferrer">IFU:</a></p>',
  productBasedSubTitle: "",
  productBasedBullet1Text: "",
  productBasedBullet2Text: "",
  productBasedBullet3Text: "",
  productBasedBullet4Text: "",
  productBasedBullet5Text: "",
  productBasedBullet6Text: "",
  productBasedImageUrl: argenzHtMultilayerDetailImage,
  productBasedImageAlt: "ArgenZ HT+ Multilayer Zirkon Blok öne çıkan özellikler",
  productBasedReverseLayout: false,
  productBasedMaxWidth: 1240,
  productBasedPaddingTop: 96,
  productBasedPaddingBottom: 96,
  productBasedColumnGap: 92,
  productBasedImageColumnWidth: 650,
  productBasedTextColumnWidth: 430,
  productBasedImageMaxWidth: 650,
  productBasedImageAspectRatio: "1.42 / 1",
  productBasedImageObjectFit: "contain",
  productBasedImageScale: 1,
  productBasedImageXOffset: 0,
  productBasedImageYOffset: 0,
  productBasedTitleFontSize: 28,
  productBasedBodyFontSize: 14,
  productBasedSubtitleFontSize: 18,
  productBasedTitleDescriptionGap: 38,
  productBasedBackgroundColor: "#ffffff",
  productBasedTextColor: "#050505",
  productBasedMutedTextColor: "#050505",
};

const ARGENZ_ST_PRODUCT_BASED_DEFAULTS: Record<string, unknown> = {
  ...ARGENZ_PRODUCT_BASED_DEFAULTS,
  productBasedDescriptionHtml:
    '<p><b>Geçirgenlik:</b> %50</p>\n\n<p><b>Eğilme Mukavemeti:</b> 850 MPa</p>\n\n<p><b>İtriyum Mol Yüzdesi:</b> 4Y</p>\n\n<p><b>Renk Skalası:</b> 16 VITA Klasik ve 3 Bleach ve 5 açık ton seçenekleri mevcuttur.</p>\n\n<p><b>Uygulama Alanları:</b> Tek kron veya 1 ara gövdeli 3 üyeli köprülere kadar uygulanabilir.</p>\n\n<p class="tmpit-download"><a href="https://s3.amazonaws.com/argen-product-images/commerce/brochure_uploads/brochures/000/000/469/original/BD-18072-ArgenZ-ST-Multilayer-Nesting-Instructions-Ver3-1120.pdf?1669756572" target="_blank" rel="noreferrer">Yerleştirme Kılavuzu:</a></p>\n\n<p class="tmpit-download"><a href="https://s3.amazonaws.com/argen-product-images/commerce/brochure_uploads/brochures/000/000/508/original/L03500.pdf?1680796097" target="_blank" rel="noreferrer">IFU:</a></p>',
  productBasedImageUrl: "https://cdn.myikas.com/images/theme-images/52f4db8b-7c32-45a6-914f-95b2f0c9cf2c/image_1080.webp",
  productBasedImageAlt: "ArgenZ ST Multilayer öne çıkan özellikler",
  productBasedImageObjectFit: "cover",
};

const CRS_COMPOSITE_PRODUCT_BASED_DEFAULTS: Record<string, unknown> = {
  productBasedSectionVisible: true,
  productBasedSectionAnchorId: "crs-composite-sararma",
  productBasedTitleHtml: "",
  productBasedTitleText: "Baskı Sonrası Sararma Yapmaz",
  productBasedDescriptionHtml:
    "<p>CRS Composite Reçinesi, 144 Mpa eğilme mukavemeti ile kalıcı uygulamalarda kullanılabildiğini iddaa eden rakip markalara göre daha <b>yüksek dayanım</b> sunuyor ve diğer markalarda yaşanan kürleme işlemi sonrası <b>sararma yapmıyor.</b></p>",
  productBasedSubTitle: "Uygulama Alanları",
  productBasedBullet1Text: "Porselen benzeri güç ve güzelliğe sahip aynı gün kron ve köprüler",
  productBasedBullet2Text: "Çok çeşitli kalıcı ve geçici diş restorasyonları",
  productBasedBullet3Text: "Çıkarılabilir total protezler için vakaya özel tasarlanmış kuron ve köprüler",
  productBasedBullet4Text: "",
  productBasedBullet5Text: "",
  productBasedBullet6Text: "",
  productBasedImageUrl: crsCompositeSararmaImage,
  productBasedImageAlt: "CRS Composite uygulama alanı",
  productBasedReverseLayout: false,
  productBasedMaxWidth: 1500,
  productBasedPaddingTop: 94,
  productBasedPaddingBottom: 94,
  productBasedColumnGap: 110,
  productBasedImageColumnWidth: 648,
  productBasedTextColumnWidth: 520,
  productBasedImageMaxWidth: 648,
  productBasedImageAspectRatio: "1.45 / 1",
  productBasedImageObjectFit: "contain",
  productBasedImageScale: 1.08,
  productBasedImageXOffset: 0,
  productBasedImageYOffset: 0,
  productBasedTitleFontSize: 34,
  productBasedBodyFontSize: 16,
  productBasedSubtitleFontSize: 20,
  productBasedTitleDescriptionGap: 24,
  productBasedBackgroundColor: "#ffffff",
  productBasedTextColor: "#050505",
  productBasedMutedTextColor: "#3a3a3a",
};

const CRS_MODEL_PRODUCT_BASED_DEFAULTS: Record<string, unknown> = {
  productBasedSectionVisible: true,
  productBasedSectionAnchorId: "crs-model-marjin-detay",
  productBasedTitleHtml: "",
  productBasedTitleText: "Belirgin Marjin Sınırları ve Tüberkül Detayları",
  productBasedDescriptionHtml:
    "<p>CRS Model reçinesi ile üreteceğiniz modellerde kole çizgileri son derece belirgindir ve marjinal oturumu rahatlıkla tespit edebilirsiniz.</p>",
  productBasedSubTitle: "Uygulama Alanları",
  productBasedBullet1Text: "Keskin kenar çizgilerine ve temas noktalarına sahip hassas modeller ve kalıplar",
  productBasedBullet2Text: "Ortodontik modeller",
  productBasedBullet3Text: "Mock-up ve wax-up uygulamaları",
  productBasedBullet4Text: "Güdüklü modeller",
  productBasedBullet5Text: "",
  productBasedBullet6Text: "",
  productBasedImageUrl: crsModelMarginDetailImage,
  productBasedImageAlt: "CRS Model belirgin marjin sınırları ve tüberkül detayları",
  productBasedReverseLayout: false,
  productBasedMaxWidth: 1500,
  productBasedPaddingTop: 86,
  productBasedPaddingBottom: 86,
  productBasedColumnGap: 110,
  productBasedImageColumnWidth: 720,
  productBasedTextColumnWidth: 520,
  productBasedImageMaxWidth: 720,
  productBasedImageAspectRatio: "1 / 1",
  productBasedImageObjectFit: "contain",
  productBasedImageScale: 1,
  productBasedImageXOffset: 0,
  productBasedImageYOffset: -120,
  productBasedImageOverflow: "visible",
  productBasedTitleFontSize: 28,
  productBasedBodyFontSize: 13,
  productBasedSubtitleFontSize: 17,
  productBasedTitleDescriptionGap: 28,
  productBasedBackgroundColor: "#ffffff",
  productBasedTextColor: "#050505",
  productBasedMutedTextColor: "#3a3a3a",
};

const CRS_TRAY_PRODUCT_BASED_DEFAULTS: Record<string, unknown> = {
  productBasedSectionVisible: true,
  productBasedSectionAnchorId: "crs-tray-kontrollu-surec",
  productBasedTitleHtml: "",
  productBasedTitleText: "Ölçü Kaşığı Üretiminde Kontrollü ve Uyumlu Süreç",
  productBasedDescriptionHtml:
    "<p><b>CRS Tray Kaşık Reçinesi</b> ile üretilen ölçü kaşıkları, dijital tasarım ve 3D baskı süreçlerine uygun olarak hazırlanır. Bu yapı, ölçü süreçlerinde daha kontrollü bir kullanım sağlar ve farklı dental uygulamalarda uyumlu sonuçlar elde edilmesine katkı sunar.</p>",
  productBasedSubTitle: "Uygulama Alanları",
  productBasedBullet1Text: "Kişiye özel ölçü kaşığı üretimi",
  productBasedBullet2Text: "İmplant ölçü uygulamaları",
  productBasedBullet3Text: "Kron ve köprü ölçü süreçleri",
  productBasedBullet4Text: "Ortodontik ölçü hazırlıkları",
  productBasedBullet5Text: "",
  productBasedBullet6Text: "",
  productBasedImageUrl: crsTrayControlledProcessImage,
  productBasedImageAlt: "CRS Tray ölçü kaşığı üretiminde kontrollü süreç",
  productBasedReverseLayout: false,
  productBasedMaxWidth: 1512,
  productBasedPaddingTop: 140,
  productBasedPaddingBottom: 110,
  productBasedColumnGap: 255,
  productBasedImageColumnWidth: 560,
  productBasedTextColumnWidth: 520,
  productBasedImageMaxWidth: 560,
  productBasedImageAspectRatio: "1.08 / 1",
  productBasedImageObjectFit: "contain",
  productBasedImageScale: 0.86,
  productBasedImageXOffset: 0,
  productBasedImageYOffset: 20,
  productBasedImageOverflow: "visible",
  productBasedTitleFontSize: 44,
  productBasedBodyFontSize: 18,
  productBasedSubtitleFontSize: 22,
  productBasedTitleDescriptionGap: 30,
  productBasedDesktopTitleMax: 48,
  productBasedDesktopBodyMax: 19,
  productBasedBackgroundColor: "#ffffff",
  productBasedTextColor: "#050505",
  productBasedMutedTextColor: "#3a3a3a",
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
    for (const key of ["slug", "handle", "url", "path", "href", "name", "title", "id"]) {
      collectProductStrings(data[key], output);
    }
    for (const key of ["metadata", "product", "variant", "variants", "selectedVariant"]) {
      collectProductStrings(data[key], output);
    }
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
    data.productBasedTitleText,
    data.productBasedDescriptionHtml,
    data.productBasedImageAlt,
    data.titleText,
    data.descriptionHtml,
    data.imageAlt,
    currentPathText(),
  ]
    .map(normalized)
    .join(" ");
  const combined = `${productText} ${pageText}`;

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

function productLooksLikeCrsComposite(data: Record<string, unknown>) {
  const combined = `${normalizedJson(data.product)} ${currentPathText()}`;
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
  const combined = `${normalizedJson(data.product)} ${currentPathText()}`;
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

function productLooksLikeCrsTray(data: Record<string, unknown>) {
  const combined = `${normalizedJson(data.product)} ${normalized(data.productBasedTitleText)} ${normalized(data.productBasedImageAlt)} ${currentPathText()}`;
  return (
    combined.includes("crs-tray-resin-olcu-kasigi-3d-yazici-recinesi") ||
    combined.includes("crs tray") ||
    combined.includes("tray resin") ||
    combined.includes("ölçü kaşığı") ||
    combined.includes("olcu kasigi")
  );
}

function targetLooksLikeCrsTray(data: Record<string, unknown>) {
  const targetMatch = targetSlugsMatch(data);
  if (targetMatch !== true) return false;
  const targets = normalized(data.productBasedTargetSlugs);
  return targets.includes("crs-tray-resin-olcu-kasigi-3d-yazici-recinesi") || targets.includes("crs tray");
}

function hasHtProductDetailContent(data: Record<string, unknown>) {
  const contentParts = [
    data.productBasedTitleText,
    data.productBasedDescriptionHtml,
    data.productBasedImageUrl,
    data.titleText,
    data.descriptionHtml,
    data.imageUrl,
  ]
    .map(normalized)
    .join(" ");

  return (
    contentParts.includes("argenz ht+") ||
    contentParts.includes("1250 mpa") ||
    contentParts.includes("%45") ||
    contentParts.includes("full mouth") ||
    contentParts.includes("ht+ multilayer")
  );
}

function isHtDefaultValue(propName: string, value: unknown) {
  const current = normalized(value);
  const htDefault = normalized(ARGENZ_PRODUCT_BASED_DEFAULTS[propName]);
  return !!current && !!htDefault && current === htDefault;
}

function isCompositeDefaultValue(propName: string, value: unknown) {
  const current = normalized(value);
  const compositeDefault = normalized(CRS_COMPOSITE_PRODUCT_BASED_DEFAULTS[propName]);
  return !!current && !!compositeDefault && current === compositeDefault;
}

function shouldUseHtProductDefaults(data: Record<string, unknown>) {
  if (productLooksLikeSt(data)) return false;
  return productLooksLikeHtPlus(data) || hasHtProductDetailContent(data);
}

function shouldUseProductBasedValue(data: Record<string, unknown>, propName: string, value: unknown, useHtDefaults: boolean) {
  if (!filled(value)) return false;
  if (useHtDefaults) return true;
  if (productLooksLikeSt(data) && isHtDefaultValue(propName, value)) return false;
  if (!productLooksLikeHtPlus(data) && isHtDefaultValue(propName, value)) return false;
  return true;
}

function shouldHideBullets(data: Record<string, unknown>) {
  return (
    productLooksLikeHtPlus(data) ||
    hasHtProductDetailContent(data) ||
    normalized(data.descriptionHtml).includes("öne çıkan özellikler")
  );
}

function productBasedProps(props: Props): Props {
  const source = props as Record<string, unknown>;
  const applies = productBasedDesignApplies(props);
  const useCompositeDefaults = applies && (productLooksLikeCrsComposite(source) || targetLooksLikeCrsComposite(source));
  const useCrsModelDefaults = applies && !useCompositeDefaults && (productLooksLikeCrsModel(source) || targetLooksLikeCrsModel(source));
  const useCrsTrayDefaults =
    applies && !useCompositeDefaults && !useCrsModelDefaults && (productLooksLikeCrsTray(source) || targetLooksLikeCrsTray(source));
  const useStDefaults = applies && !useCompositeDefaults && !useCrsModelDefaults && !useCrsTrayDefaults && productLooksLikeSt(source);
  const useHtDefaults =
    applies && !useCompositeDefaults && !useCrsModelDefaults && !useCrsTrayDefaults && !useStDefaults && shouldUseHtProductDefaults(source);
  const defaults = useCompositeDefaults
    ? CRS_COMPOSITE_PRODUCT_BASED_DEFAULTS
    : useCrsModelDefaults
      ? CRS_MODEL_PRODUCT_BASED_DEFAULTS
      : useCrsTrayDefaults
        ? CRS_TRAY_PRODUCT_BASED_DEFAULTS
        : useStDefaults
          ? ARGENZ_ST_PRODUCT_BASED_DEFAULTS
          : ARGENZ_PRODUCT_BASED_DEFAULTS;
  if (!applies) return props;
  if (!useCompositeDefaults && !useCrsModelDefaults && !useCrsTrayDefaults && !useStDefaults && !useHtDefaults) return props;

  return new Proxy(props as Record<string, unknown>, {
    get(target, prop) {
      if (typeof prop !== "string") return Reflect.get(target, prop);
      if (prop.startsWith("productBased")) return target[prop];
      const productBasedName = `productBased${pascal(prop)}`;
      const productBasedValue = target[productBasedName];
      if ((useStDefaults || useHtDefaults) && isCompositeDefaultValue(productBasedName, productBasedValue) && productBasedName in defaults) {
        return defaults[productBasedName];
      }
      if ((useCrsModelDefaults || useCrsTrayDefaults) && productBasedName in defaults) return defaults[productBasedName];
      if ((useCompositeDefaults || useCrsModelDefaults || useCrsTrayDefaults) && filled(productBasedValue) && !isHtDefaultValue(productBasedName, productBasedValue)) {
        return productBasedValue;
      }
      if (shouldUseProductBasedValue(target, productBasedName, productBasedValue, useHtDefaults)) return productBasedValue;
      if ((useStDefaults || useHtDefaults) && productBasedName in defaults) return defaults[productBasedName];
      if ((useCompositeDefaults || useCrsModelDefaults || useCrsTrayDefaults) && productBasedName in defaults) return defaults[productBasedName];
      return target[prop];
    },
  }) as Props;
}

function html(value: unknown) {
  return { __html: propString(value) };
}

function numberValue(value: unknown, fallback: number, min?: number, max?: number) {
  const next = Number(value);
  if (!Number.isFinite(next)) return fallback;
  return Math.min(max ?? next, Math.max(min ?? next, next));
}

function cssLength(value: unknown, fallback: number) {
  return `${numberValue(value, fallback)}px`;
}

function objectFit(value: unknown) {
  const normalized = text(value, "contain").toLowerCase();
  return ["contain", "cover", "fill", "scale-down"].includes(normalized) ? normalized : "contain";
}

export function ThreeMashProductImageText(props: Props) {
  const sourceData = useSharedProductDetailData(props.product, (props as Record<string, unknown>).productTemplateJson);
  if (sourceData) {
    return (
      <ProductDetailSectionScope data={sourceData}>
        <ProductDetailUseCasesSection data={sourceData} />
        <ProductDetailEcosystemSection data={sourceData} />
      </ProductDetailSectionScope>
    );
  }
  const visibility = productBasedVisibilityOverride(props);
  if (visibility === false) return null;
  if (visibility !== true && (isEditorPreview() || productBasedApplies(props)) && boolValue(props.productBasedSectionVisible) === false) return null;
  if (productBasedHidden(props)) return null;

  const viewProps = productBasedProps(props);
  const hideBullets = shouldHideBullets(props as Record<string, unknown>) || shouldHideBullets(viewProps as Record<string, unknown>);
  const src = imageSrc(viewProps.imageUrl);
  const bullets = hideBullets
    ? []
    : [
        text(viewProps.bullet1Text),
        text(viewProps.bullet2Text),
        text(viewProps.bullet3Text),
        text(viewProps.bullet4Text),
        text(viewProps.bullet5Text),
        text(viewProps.bullet6Text),
      ].filter(Boolean);

  const style = {
    "--tmpit-bg": text(viewProps.backgroundColor, "#ffffff"),
    "--tmpit-text": text(viewProps.textColor, "#050505"),
    "--tmpit-muted": text(viewProps.mutedTextColor, "#050505"),
    "--tmpit-max": cssLength(viewProps.maxWidth, 1240),
    "--tmpit-pt": cssLength(viewProps.paddingTop, 96),
    "--tmpit-pb": cssLength(viewProps.paddingBottom, 96),
    "--tmpit-gap": cssLength(viewProps.columnGap, 92),
    "--tmpit-image-col": cssLength(viewProps.imageColumnWidth, 650),
    "--tmpit-text-col": cssLength(viewProps.textColumnWidth, 430),
    "--tmpit-image-max": cssLength(viewProps.imageMaxWidth, 650),
    "--tmpit-image-ratio": text(viewProps.imageAspectRatio, "1.65 / 1"),
    "--tmpit-image-fit": objectFit(viewProps.imageObjectFit),
    "--tmpit-image-scale": numberValue(viewProps.imageScale, 1, 0.2, 2),
    "--tmpit-image-x": cssLength(viewProps.imageXOffset, 0),
    "--tmpit-image-y": cssLength(viewProps.imageYOffset, 0),
    "--tmpit-image-overflow": text((viewProps as Record<string, unknown>).imageOverflow, "hidden"),
    "--tmpit-title-size": cssLength(viewProps.titleFontSize, 32),
    "--tmpit-body-size": cssLength(viewProps.bodyFontSize, 16),
    "--tmpit-subtitle-size": cssLength(viewProps.subtitleFontSize, 18),
    "--tmpit-title-desktop-max": cssLength((viewProps as Record<string, unknown>).desktopTitleMax, 30),
    "--tmpit-body-desktop-max": cssLength((viewProps as Record<string, unknown>).desktopBodyMax, 14),
    "--tmpit-title-description-gap": cssLength(viewProps.titleDescriptionGap, 38),
  } as any;

  return (
    <section
      id={text(viewProps.sectionAnchorId) || undefined}
      className={`three-mash-product-image-text${boolValue(viewProps.reverseLayout) ? " is-reversed" : ""}`}
      style={style}
    >
      <div className="tmpit-wrap">
        <div className="tmpit-media">
          {src ? (
            <img src={src} alt={text(viewProps.imageAlt)} loading="lazy" decoding="async" />
          ) : (
            <div className="tmpit-placeholder">Görsel ekleyin</div>
          )}
        </div>

        <div className="tmpit-copy">
          {text(viewProps.titleHtml) ? (
            <h2 dangerouslySetInnerHTML={html(viewProps.titleHtml)} />
          ) : (
            <h2>{text(viewProps.titleText, "Geliştirilmiş Kalıp-Ölçü Hassasiyeti")}</h2>
          )}
          {text(viewProps.descriptionHtml) ? <div className="tmpit-description" dangerouslySetInnerHTML={html(viewProps.descriptionHtml)} /> : null}
          {!hideBullets && text(viewProps.subTitle) ? <h3>{text(viewProps.subTitle)}</h3> : null}
          {bullets.length ? (
            <ul>
              {bullets.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default ThreeMashProductImageText;
