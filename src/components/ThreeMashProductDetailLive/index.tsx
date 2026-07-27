import { useEffect, useState } from "preact/hooks";
import {
  addItemToCart,
  getDisplayedProductVariantTypes,
  getProductHref,
  getProductOptionSet,
  getProductVariantFormattedFinalPrice,
  getProductVariantFormattedSellPrice,
  getProductVariantMainImage,
  getSelectedProductVariant,
  getDefaultSrc,
  createMediaSrcset,
  hasProductStock,
  hasProductValidOptionValues,
  hasProductVariantDiscount,
  hasProductVariantStock,
  initProductOnBrowser,
  initProductOptionSetValues,
  isAddToCartEnabled,
  selectVariantValue,
  type IkasProduct,
  type IkasProductVariant,
} from "@ikas/bp-storefront";
import threeMashLogoImage from "../../assets/three-mash-logo-data";
import { ThreeMashFooter } from "../ThreeMashFooter";
import { rememberOrderLineImageFallback } from "../ThreeMashOrderLineImage";
import { Props } from "./types";

function inlineHtml(value?: string) {
  return { __html: value || "" };
}

type PlainObject = Record<string, unknown>;
type ProductMediaItem = NonNullable<IkasProductVariant["images"]>[number];

function isPlainObject(value: unknown): value is PlainObject {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function selectedVariant(product: IkasProduct): IkasProductVariant | null {
  try {
    return getSelectedProductVariant(product) || product.variants?.[0] || null;
  } catch {
    return product.variants?.[0] || null;
  }
}

function allVariantMedia(variant: IkasProductVariant | null) {
  return variant?.images || [];
}

function isMediaVideo(media: unknown) {
  const item = media as { isVideo?: unknown; image?: { isVideo?: unknown } } | undefined;
  return item?.isVideo === true || item?.image?.isVideo === true;
}

function plainText(value?: string) {
  return (value || "")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function summaryText(product: IkasProduct) {
  const source = (product as unknown as { shortDescription?: string }).shortDescription || product.description || "";
  const text = plainText(source);
  if (!text) return "Bu ürün ikas panelindeki canlı ürün datası ile otomatik gösterilir.";
  return text.length > 220 ? `${text.slice(0, 220).trim()}...` : text;
}

function slugify(value?: string) {
  return (value || "")
    .toLocaleLowerCase("tr")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizedKey(value: unknown) {
  return stringValue(value)
    .toLocaleLowerCase("tr")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function normalizedVariantText(value: string | undefined) {
  return (value || "")
    .toLocaleLowerCase("tr")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizedVariantKey(value: string | undefined) {
  return normalizedVariantText(value)
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9.]+/g, "");
}

const ZIRCON_SHADE_COLORS: Record<string, string> = {
  a1: "#ede9d0",
  a2: "#ede9d0",
  a3: "#ede9d0",
  "a3.5": "#e4dcc2",
  a4: "#d2c99a",
  b1: "#efead4",
  b2: "#ebe3c7",
  b3: "#e1d7b2",
  b4: "#e1d6b5",
  c1: "#e1d6b5",
  c2: "#e1d6b5",
  c3: "#e5dbc3",
  c4: "#d2c99a",
  d2: "#dcd4b4",
  d3: "#d1c2a3",
  d4: "#d1c2a3",
  om1: "#fffefe",
  om2: "#fffefe",
  om3: "#fffefe",
  white: "#ffffff",
};

function cssColorValue(value: unknown): string {
  if (typeof value !== "string") return "";
  const text = value.trim();
  if (/^(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(text)) return `#${text}`;
  const isSafeColor =
    /^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(text) ||
    /^rgba?\(\s*[\d.\s,%]+\)$/i.test(text) ||
    /^hsla?\(\s*[\d.\s,%degturnrad]+\)$/i.test(text) ||
    /^[a-z]+$/i.test(text);
  return isSafeColor ? text : "";
}

function variantColorCode(variantValue: unknown): string {
  if (!isPlainObject(variantValue)) return "";
  return cssColorValue(variantValue.colorCode);
}

function colorForVariantValue(product: IkasProduct, variantType: unknown, variantValue: unknown) {
  const direct = variantColorCode(variantValue);
  if (direct) return direct;

  const valueName = isPlainObject(variantValue) && typeof variantValue.name === "string" ? variantValue.name : "";
  const shadeColor = ZIRCON_SHADE_COLORS[normalizedVariantKey(valueName)];
  if (shadeColor) return shadeColor;

  const valueId = isPlainObject(variantValue) && typeof variantValue.id === "string" ? variantValue.id : "";
  if (!valueId) return "";

  const typeData = variantType as { variantType?: { values?: unknown[] } } | undefined;
  const typeMatch = typeData?.variantType?.values?.find((value) => isPlainObject(value) && value.id === valueId);
  const typeColor = variantColorCode(typeMatch);
  if (typeColor) return typeColor;

  for (const productVariantType of product.variantTypes || []) {
    const match = productVariantType.variantType.values?.find((value) => value.id === valueId);
    const color = variantColorCode(match);
    if (color) return color;
  }

  return "";
}

function isColorVariant(product: IkasProduct, variantType: unknown, valueName: string | undefined, variantValue?: unknown) {
  const typeName = (variantType as { variantType?: { name?: string } } | undefined)?.variantType?.name;
  const type = normalizedVariantText(typeName);
  return type.includes("renk") || type.includes("color") || Boolean(colorForVariantValue(product, variantType, variantValue));
}

function uniqueDisplayedVariantValues<T extends { variantValue?: { id?: string; name?: string }; isSelected?: boolean; hasStock?: boolean }>(
  items: T[],
) {
  const values = new Map<string, T>();

  for (const item of items) {
    const name = item.variantValue?.name || "";
    const key = normalizedVariantKey(name) || item.variantValue?.id || name;
    const current = values.get(key);
    if (!current || item.isSelected || (!current.hasStock && item.hasStock)) values.set(key, item);
  }

  return Array.from(values.values());
}

function imageValue(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (!isPlainObject(value)) return "";

  const candidates = [
    value.url,
    value.src,
    value.imageUrl,
    value.thumbnailUrl,
    value.value,
    value.id,
    isPlainObject(value.image) ? value.image.url || value.image.src || value.image.id : "",
    isPlainObject(value.file) ? value.file.url || value.file.src || value.file.id : "",
  ];

  const found = candidates.find((candidate) => typeof candidate === "string" && candidate.trim());
  return typeof found === "string" ? found.trim() : "";
}

function customValuePayload(value: unknown): unknown {
  if (!isPlainObject(value)) return value;

  const nested =
    value.value ??
    value.text ??
    value.html ??
    value.richText ??
    value.content ??
    value.url ??
    value.src ??
    value.imageUrl ??
    value.file ??
    value.image;

  return nested === undefined ? value : nested;
}

function customField(product: IkasProduct, keys: string[]) {
  const wanted = new Set(keys.map(normalizedKey));
  const source = product as unknown as PlainObject;

  for (const key of keys) {
    if (source[key] !== undefined) return customValuePayload(source[key]);
  }

  const containers = [
    source.customFields,
    source.customFieldValues,
    source.productCustomFields,
    source.attributes,
    source.productAttributes,
    source.metafields,
    source.metaFields,
  ];

  for (const container of containers) {
    if (Array.isArray(container)) {
      for (const item of container) {
        if (!isPlainObject(item)) continue;
        const aliases = [
          item.key,
          item.code,
          item.name,
          item.slug,
          item.handle,
          item.fieldName,
          item.title,
          isPlainObject(item.customField) ? item.customField.key || item.customField.code || item.customField.name : "",
          isPlainObject(item.field) ? item.field.key || item.field.code || item.field.name : "",
        ];
        if (aliases.some((alias) => wanted.has(normalizedKey(alias)))) return customValuePayload(item);
      }
      continue;
    }

    if (isPlainObject(container)) {
      for (const [key, value] of Object.entries(container)) {
        if (wanted.has(normalizedKey(key))) return customValuePayload(value);
      }
    }
  }

  return undefined;
}

function customText(product: IkasProduct, keys: string[]) {
  const value = customField(product, keys);
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (typeof value === "string") return value.trim();
  if (isPlainObject(value)) {
    const nested = value.text ?? value.value ?? value.html ?? value.content ?? value.name ?? value.title;
    return typeof nested === "string" ? nested.trim() : "";
  }
  return "";
}

function customImage(product: IkasProduct, keys: string[]) {
  const value = customField(product, keys);
  if (Array.isArray(value)) return imageValue(value[0]);
  return imageValue(value);
}

function customUrl(product: IkasProduct, keys: string[]) {
  return customText(product, keys) || customImage(product, keys);
}

function isMeaningfulHtml(value: string) {
  return plainText(value).length > 0 || /<(img|iframe|video|table|ul|ol)\b/i.test(value);
}

function parseJsonArray(value: string) {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function youtubeEmbed(value: string) {
  const raw = value.trim();
  if (!raw) return "";
  if (raw.includes("embed/")) return raw;
  const match = raw.match(/(?:v=|youtu\.be\/|shorts\/)([A-Za-z0-9_-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : raw;
}

function productFeatureItems(product: IkasProduct) {
  const listSource = customField(product, ["product_features", "features", "ozellikler", "one_cikan_ozellikler"]);
  const list = Array.isArray(listSource) ? listSource : parseJsonArray(customText(product, ["product_features", "features", "ozellikler"]));
  const fromList = list
    .map((item) => {
      const data = isPlainObject(item) ? item : {};
      const title = stringValue(data.title || data.baslik || data.name);
      const text = stringValue(data.text || data.description || data.aciklama || data.content);
      const image = imageValue(data.image || data.gorsel || data.icon || data.ikon);
      return { title, text, image };
    })
    .filter((item) => item.title || item.text || item.image);

  if (fromList.length) return fromList;

  return Array.from({ length: 8 }, (_, index) => {
    const number = index + 1;
    return {
      title: customText(product, [`feature_${number}_title`, `ozellik_${number}_baslik`, `feature${number}Title`]),
      text: customText(product, [`feature_${number}_text`, `feature_${number}_description`, `ozellik_${number}_metin`, `feature${number}Text`]),
      image: customImage(product, [`feature_${number}_image`, `feature_${number}_icon`, `ozellik_${number}_gorsel`, `feature${number}Image`]),
    };
  }).filter((item) => item.title || item.text || item.image);
}

function productSpecItems(product: IkasProduct) {
  return Array.from({ length: 12 }, (_, index) => {
    const number = index + 1;
    return {
      label: customText(product, [`spec_${number}_label`, `technical_spec_${number}_label`, `teknik_${number}_etiket`]),
      value: customText(product, [`spec_${number}_value`, `technical_spec_${number}_value`, `teknik_${number}_deger`]),
      description: customText(product, [`spec_${number}_description`, `technical_spec_${number}_description`, `teknik_${number}_aciklama`]),
    };
  }).filter((item) => item.label || item.value || item.description);
}

function productFaqItems(product: IkasProduct) {
  return Array.from({ length: 8 }, (_, index) => {
    const number = index + 1;
    return {
      question: customText(product, [`faq_${number}_question`, `question_${number}`, `question${number}`, `soru_${number}`]),
      answer: customText(product, [`faq_${number}_answer`, `answer_${number}_html`, `answer${number}Html`, `cevap_${number}`]),
    };
  }).filter((item) => item.question && item.answer);
}

function categoryName(category: unknown) {
  const data = category as { name?: unknown; title?: unknown } | undefined;
  return stringValue(data?.name) || stringValue(data?.title);
}

function categoryHref(category: unknown) {
  const data = category as { href?: unknown; path?: unknown; slug?: unknown; name?: unknown; title?: unknown } | undefined;
  const href = stringValue(data?.href);
  const path = stringValue(data?.path);
  const slug = stringValue(data?.slug);
  const name = categoryName(category);

  if (href) return href;
  if (path) return path.startsWith("/") ? path : `/${path}`;
  if (slug) return slug.startsWith("/") ? slug : `/${slug}`;
  return name ? `/${slugify(name)}` : "/";
}

function makeWhatsappHref(product: IkasProduct) {
  const productUrl = typeof window !== "undefined" ? window.location.href : getProductHref(product);
  const message = `Merhaba, ${product.name} ile ilgileniyorum. Detaylı bilgi alabilir miyim? ${productUrl}`;
  return `https://wa.me/905314326577?text=${encodeURIComponent(message)}`;
}

function ProductDetailHeader() {
  return (
    <header className="tmpdl-site-header">
      <div className="tmpdl-site-header-inner">
        <a className="tmpdl-site-logo" href="/" aria-label="3mash store">
          <img src={threeMashLogoImage} alt="3mash store" />
        </a>
        <nav className="tmpdl-site-nav" aria-label="Ana menü">
          <a href="/dental-3d-yazici-recineleri">Dental Reçineler</a>
          <a href="/3d-yazicilar">3D Yazıcılar</a>
          <a href="/zirkon-bloklar">Zirkon Bloklar</a>
          <a href="/masasustu-tarayicilar">Masaüstü Tarayıcılar</a>
          <a href="/dental-firinlar">Dental Fırınlar</a>
          <a href="/pages/mash-academy">Mash Academy</a>
        </nav>
      </div>
    </header>
  );
}

function ProductContentSection({
  eyebrow,
  title,
  html,
  image,
  imageAlt,
  reverse = false,
}: {
  eyebrow?: string;
  title?: string;
  html?: string;
  image?: string;
  imageAlt?: string;
  reverse?: boolean;
}) {
  if (!eyebrow && !title && !isMeaningfulHtml(html || "") && !image) return null;

  return (
    <section className={`tmpdl-content-section${reverse ? " is-reverse" : ""}`}>
      <div className="tmpdl-content-copy">
        {eyebrow ? <span>{eyebrow}</span> : null}
        {title ? <h2>{title}</h2> : null}
        {html && isMeaningfulHtml(html) ? <div className="tmpdl-rich" dangerouslySetInnerHTML={inlineHtml(html)} /> : null}
      </div>
      {image ? (
        <div className="tmpdl-content-media">
          <img src={image} alt={imageAlt || title || ""} loading="lazy" decoding="async" />
        </div>
      ) : null}
    </section>
  );
}

function ProductFeaturesSection({ product }: { product: IkasProduct }) {
  const features = productFeatureItems(product);
  const title = customText(product, ["features_title", "product_features_title", "one_cikanlar_baslik"]) || "Öne Çıkan Özellikler";
  const eyebrow = customText(product, ["features_eyebrow", "one_cikanlar_etiket"]);

  if (!features.length) return null;

  return (
    <section className="tmpdl-template-section tmpdl-features-section">
      <div className="tmpdl-section-head">
        {eyebrow ? <span>{eyebrow}</span> : null}
        <h2>{title}</h2>
      </div>
      <div className="tmpdl-feature-grid">
        {features.map((feature, index) => (
          <article key={`${feature.title || "feature"}-${index}`}>
            {feature.image ? <img src={feature.image} alt="" loading="lazy" decoding="async" /> : null}
            {feature.title ? <h3>{feature.title}</h3> : null}
            {feature.text ? <p>{feature.text}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}

function ProductSpecsSection({ product }: { product: IkasProduct }) {
  const title = customText(product, ["technical_specs_title", "teknik_ozellikler_baslik"]) || "Teknik Özellikler";
  const intro = customText(product, ["technical_specs_intro", "teknik_ozellikler_aciklama"]);
  const html = customText(product, ["technical_specs_html", "teknik_ozellikler_html"]);
  const rows = productSpecItems(product);

  if (!isMeaningfulHtml(html) && !rows.length) return null;

  return (
    <section className="tmpdl-template-section tmpdl-specs-section">
      <div className="tmpdl-section-head">
        <span>Teknik Detaylar</span>
        <h2>{title}</h2>
        {intro ? <p>{intro}</p> : null}
      </div>
      {isMeaningfulHtml(html) ? (
        <div className="tmpdl-rich tmpdl-specs-html" dangerouslySetInnerHTML={inlineHtml(html)} />
      ) : (
        <div className="tmpdl-specs-table">
          {rows.map((row, index) => (
            <div key={`${row.label || "spec"}-${index}`}>
              <span>{row.label}</span>
              <b>{row.value}</b>
              {row.description ? <em>{row.description}</em> : null}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function ProductVideoSection({ product, fallbackMedia }: { product: IkasProduct; fallbackMedia?: ProductMediaItem }) {
  const videoUrl = customUrl(product, ["product_video_url", "video_url", "tanitim_video_url"]);
  const title = customText(product, ["product_video_title", "video_title", "video_baslik"]) || "Ürün Videosu";
  const description = customText(product, ["product_video_text", "video_description", "video_aciklama"]);
  const poster = customImage(product, ["product_video_poster", "video_poster", "poster_image"]);
  const fallbackUrl = fallbackMedia?.image ? getDefaultSrc(fallbackMedia.image) : "";
  const url = videoUrl || fallbackUrl;

  if (!url) return null;

  const embedUrl = youtubeEmbed(url);
  const isEmbed = /^https?:\/\/[^"]*(youtube\.com|youtu\.be|vimeo\.com)/i.test(embedUrl) || embedUrl.includes("embed/");

  return (
    <section className="tmpdl-template-section tmpdl-video-section">
      <div className="tmpdl-section-head">
        <span>Video</span>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {isEmbed ? (
        <iframe src={embedUrl} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
      ) : (
        <video src={url} poster={poster || undefined} controls playsInline />
      )}
    </section>
  );
}

function ProductDocumentsSection({ product }: { product: IkasProduct }) {
  const brochure = customUrl(product, ["product_brochure", "katalog_dosyasi", "brochure_url", "catalog_file"]);
  const safety = customUrl(product, ["safety_document", "guvenlik_dokumani", "msds_file"]);

  if (!brochure && !safety) return null;

  return (
    <section className="tmpdl-template-section tmpdl-documents-section">
      <div className="tmpdl-section-head">
        <span>Dokümanlar</span>
        <h2>Ürün Dokümanları</h2>
      </div>
      <div className="tmpdl-doc-links">
        {brochure ? (
          <a href={brochure} target="_blank" rel="noopener noreferrer">
            Katalog
          </a>
        ) : null}
        {safety ? (
          <a href={safety} target="_blank" rel="noopener noreferrer">
            Güvenlik Dokümanı
          </a>
        ) : null}
      </div>
    </section>
  );
}

function ProductFaqSection({ product }: { product: IkasProduct }) {
  const title = customText(product, ["product_faq_title", "faq_title", "sss_baslik"]) || "Sıkça Sorulan Sorular";
  const html = customText(product, ["product_faq_html", "faq_html", "sss_html"]);
  const items = productFaqItems(product);

  if (!isMeaningfulHtml(html) && !items.length) return null;

  return (
    <section className="tmpdl-template-section tmpdl-faq-section">
      <div className="tmpdl-section-head">
        <span>SSS</span>
        <h2>{title}</h2>
      </div>
      {isMeaningfulHtml(html) ? (
        <div className="tmpdl-rich" dangerouslySetInnerHTML={inlineHtml(html)} />
      ) : (
        <div className="tmpdl-faq-list">
          {items.map((item, index) => (
            <details key={`${item.question}-${index}`} open={index === 0}>
              <summary>{item.question}</summary>
              <div dangerouslySetInnerHTML={inlineHtml(item.answer)} />
            </details>
          ))}
        </div>
      )}
    </section>
  );
}

function ProductTemplateSections({ product, videoMedia }: { product: IkasProduct; videoMedia?: ProductMediaItem }) {
  const introTitle = customText(product, ["product_intro_title", "tanitim_basligi"]);
  const introText = customText(product, ["product_intro_text", "product_intro_html", "tanitim_aciklamasi"]);
  const introImage = customImage(product, ["product_intro_image", "tanitim_gorseli"]);
  const storyTitle = customText(product, ["product_story_title", "hikaye_basligi"]);
  const storyText = customText(product, ["product_story_text", "product_story_html", "hikaye_metni"]);
  const storyImage = customImage(product, ["product_story_image", "hikaye_gorseli"]);
  const usageTitle = customText(product, ["usage_title", "application_title", "kullanim_alanlari_baslik"]);
  const usageText = customText(product, ["usage_html", "application_html", "kullanim_alanlari_html"]);
  const usageImage = customImage(product, ["usage_image", "application_image", "kullanim_alanlari_gorsel"]);

  return (
    <div className="tmpdl-template-sections">
      <ProductContentSection eyebrow="Kısa Tanıtım" title={introTitle} html={introText} image={introImage} imageAlt={introTitle} />
      <ProductContentSection eyebrow="Ürün Hikayesi" title={storyTitle} html={storyText} image={storyImage} imageAlt={storyTitle} reverse />
      <ProductFeaturesSection product={product} />
      <ProductSpecsSection product={product} />
      <ProductContentSection eyebrow="Kullanım Alanları" title={usageTitle} html={usageText} image={usageImage} imageAlt={usageTitle} />
      <ProductVideoSection product={product} fallbackMedia={videoMedia} />
      <ProductDocumentsSection product={product} />
      <ProductFaqSection product={product} />
    </div>
  );
}

function themeToken(value: string | undefined, defaultValue: string, tokenName: string) {
  const trimmed = value?.trim();
  if (trimmed && trimmed.toLowerCase() !== defaultValue.toLowerCase()) return trimmed;
  return `var(${tokenName}, ${defaultValue})`;
}

export function ThreeMashProductDetailLive(props: Props) {
  const product = props.product || null;
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState("");
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (!product) return;
    initProductOnBrowser(product);
    getProductOptionSet(product).then(() => {
      if (product.productOptionSet) initProductOptionSetValues(product.productOptionSet);
      setVersion((current) => current + 1);
    });
  }, [product?.id]);

  const variant = product ? selectedVariant(product) : null;
  const mediaList = allVariantMedia(variant);
  const mainMedia = mediaList[selectedImageIndex] || (variant ? getProductVariantMainImage(variant) : undefined);
  const image = mainMedia?.image;
  const videoMedia = mediaList.find((item) => isMediaVideo(item));
  const isInStock = !!product && !!variant && hasProductStock(product) && hasProductVariantStock(variant);
  const hasDiscount = !!variant && hasProductVariantDiscount(variant);
  const variantTypes = product ? getDisplayedProductVariantTypes(product) : [];
  const firstCategory = product?.categories?.[0];
  const firstCategoryName = categoryName(firstCategory);
  const productSummary = product ? summaryText(product) : "";

  const style = {
    "--tmpdl-bg": themeToken(props.backgroundColor, "#f6f7f3", "--tm-theme-bg"),
    "--tmpdl-text": themeToken(props.textColor, "#10120f", "--tm-theme-text"),
    "--tmpdl-muted": themeToken(props.mutedTextColor, "#666b61", "--tm-theme-muted"),
    "--tmpdl-panel": themeToken(props.panelColor, "#ffffff", "--tm-theme-panel"),
    "--tmpdl-line": themeToken(props.lineColor, "#dfe3da", "--tm-theme-line"),
    "--tmpdl-accent": themeToken(props.accentColor, "#c7f136", "--tm-theme-accent"),
  } as any;

  async function handleAddToCart() {
    if (!product || !variant || !isInStock || isAdding) return;

    if (!hasProductValidOptionValues(product)) {
      setMessage(props.optionRequiredMessage || "Lütfen gerekli ürün seçeneklerini tamamlayın.");
      return;
    }

    if (!isAddToCartEnabled(product)) {
      setMessage(props.addToCartErrorMessage || "Ürün sepete eklenemiyor.");
      return;
    }

    setIsAdding(true);
    setMessage("");
    try {
      rememberOrderLineImageFallback(product, variant, image ? [getDefaultSrc(image)] : []);
      const result = await addItemToCart(variant, product, quantity);
      if (result.success) {
        window.dispatchEvent(new CustomEvent("ikas:open-cart-sidebar"));
      } else {
        setMessage(props.addToCartErrorMessage || "Ürün sepete eklenemedi.");
      }
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <>
      <ProductDetailHeader />
      <section className="three-mash-product-detail-live" style={style}>
        <div className="tmpdl-wrap">
          {!product ? (
            <div className="tmpdl-setup">
              {props.setupMessage ||
                "Bu section Ürün Sayfası için tasarlandı. ikas editörde Product alanını sayfa ürününe bağlayın veya ürün preview datasını seçin."}
            </div>
          ) : (
            <div className="tmpdl-page" data-version={version}>
              <div className="tmpdl-grid">
                <div className="tmpdl-gallery">
                  <div className="tmpdl-main-media">
                    {image ? (
                      mainMedia?.isVideo ? (
                        <video src={getDefaultSrc(image)} controls playsInline />
                      ) : (
                        <img
                          src={getDefaultSrc(image)}
                          srcSet={createMediaSrcset(image)}
                          alt={image.altText || product.name}
                          loading="eager"
                          decoding="async"
                        />
                      )
                    ) : (
                      <div className="tmpdl-fallback">{product.name.slice(0, 1)}</div>
                    )}
                  </div>

                  {mediaList.length > 1 ? (
                    <div className="tmpdl-thumbs">
                      {mediaList.map((item, index) => (
                        <button
                          type="button"
                          className={index === selectedImageIndex ? "is-selected" : ""}
                          onClick={() => setSelectedImageIndex(index)}
                          aria-label={`${product.name} görsel ${index + 1}`}
                          key={`${item.image?.id || index}`}
                        >
                          {item.image ? <img src={getDefaultSrc(item.image)} alt="" /> : null}
                          {isMediaVideo(item) ? <span>Video</span> : null}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="tmpdl-info">
                  <div className="tmpdl-info-head">
                    <div className="tmpdl-title-row">
                      <h1>{product.name}</h1>
                      <button className="tmpdl-favorite" type="button" aria-label="Favorilere ekle">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 20.8 3.7 12.5C1.7 10.5 1.7 7.3 3.7 5.3 5.7 3.3 8.9 3.3 10.9 5.3L12 6.4l1.1-1.1c2-2 5.2-2 7.2 0s2 5.2 0 7.2L12 20.8Z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="tmpdl-price-row">
                    <div className="tmpdl-price">
                      {variant ? <strong>{getProductVariantFormattedFinalPrice(variant)}</strong> : null}
                      {variant && hasDiscount ? <span>{getProductVariantFormattedSellPrice(variant)}</span> : null}
                    </div>
                    <div className={isInStock ? "tmpdl-stock is-stocked" : "tmpdl-stock is-out"}>
                      {isInStock ? props.inStockText || "Stokta" : props.outOfStockText || "Stokta Yok"}
                    </div>
                  </div>

                  {variantTypes.length > 0 ? (
                    <div className="tmpdl-variants">
                      {variantTypes.map((variantType) => (
                        <div className="tmpdl-variant-group" key={variantType.variantType.id}>
                          <span>{variantType.variantType.name}</span>
                          <div>
                            {uniqueDisplayedVariantValues(variantType.displayedVariantValues).map((item) => {
                              const color = colorForVariantValue(product, variantType, item.variantValue);
                              const isColor = isColorVariant(product, variantType, item.variantValue.name, item.variantValue);
                              return (
                                <button
                                  type="button"
                                  className={`${item.isSelected ? "is-selected" : ""}${isColor ? " is-color-swatch" : ""}`}
                                  disabled={!item.hasStock}
                                  style={isColor ? { "--tmpdl-swatch": color || "#f6f1e7" } as any : undefined}
                                  onClick={() => {
                                    selectVariantValue(product, item.variantValue, true);
                                    setSelectedImageIndex(0);
                                    setMessage("");
                                    setVersion((current) => current + 1);
                                  }}
                                  aria-label={`${variantType.variantType.name}: ${item.variantValue.name}`}
                                  title={item.variantValue.name}
                                  key={item.variantValue.id}
                                >
                                  <span>{item.variantValue.name}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  <div className="tmpdl-buy">
                    <button className="add-to-cart" type="button" disabled={!isInStock || isAdding} onClick={handleAddToCart}>
                      {isAdding ? props.addingToCartText || "Ekleniyor..." : props.addToCartText || "SEPETE EKLE"}
                    </button>
                  </div>

                  <a className="tmpdl-whatsapp" href={makeWhatsappHref(product)} target="_blank" rel="nofollow noreferrer">
                    <span aria-hidden="true">Whatsapp</span>
                    <b>WhatsApp</b>
                  </a>

                  {message ? <p className="tmpdl-message">{message}</p> : null}

                  <div className="tmpdl-service-grid">
                    <span className="tmpdl-service tmpdl-service-shipping">Ücretsiz Kargo</span>
                    <span className="tmpdl-service tmpdl-service-return">Koşulsuz İade</span>
                    <span className="tmpdl-service tmpdl-service-payment">Güvenli Ödeme</span>
                  </div>

                  {product.description ? (
                    <div className="tmpdl-description">
                      <details open>
                        <summary>{props.descriptionTitle || "Ürün Açıklaması"}</summary>
                        <div className="tmpdl-description-content" dangerouslySetInnerHTML={inlineHtml(product.description)} />
                      </details>
                    </div>
                  ) : productSummary ? (
                    <div className="tmpdl-description">
                      <details open>
                        <summary>{props.descriptionTitle || "Ürün Açıklaması"}</summary>
                        <div className="tmpdl-description-content">{productSummary}</div>
                      </details>
                    </div>
                  ) : null}
                </div>
              </div>

              <ProductTemplateSections product={product} videoMedia={videoMedia} />

              <div className="tmpdl-fixed-buy">
                <button type="button" disabled={!isInStock || isAdding} onClick={handleAddToCart}>
                  {isAdding ? props.addingToCartText || "Ekleniyor..." : props.addToCartText || "SEPETE EKLE"}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
      <ThreeMashFooter />
    </>
  );
}

export default ThreeMashProductDetailLive;
