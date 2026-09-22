import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import type { ComponentChildren } from "preact";
import { resolveProductDetailData } from "../ThreeMashProductDetailData";
import { tLocalized, isEnglishLocale, translateText, localizedHref } from "../../utils/i18n";
import { safeJsonLdScript, sanitizeHtml } from "../../utils/sanitizeHtml";
import { safeNavigationHref, safeWhatsAppHref } from "../../utils/safeRedirect";

export type ProductGalleryItem = {
  src: string;
  thumbSrc?: string;
  alt?: string;
};

export type ProductVariantValue = {
  id: string;
  name: string;
  selected: boolean;
  hasStock: boolean;
  color?: string;
  rawValue: unknown;
};

export type ProductVariantGroup = {
  id: string;
  name: string;
  values: ProductVariantValue[];
};

export type ProductDetailTemplateData = {
  key: string;
  announcement?: {
    enabled?: boolean;
    strongText: string;
    longText?: string;
    ctaText: string;
    ctaHref: string;
  };
  breadcrumb: {
    homeText: string;
    homeHref: string;
    categoryText: string;
    categoryHref: string;
    productText: string;
  };
  hero: {
    kicker: string;
    titleHtml: string;
    leadHtml: string;
    pills: Array<{ label: string; value?: string }>;
    galleryBadge?: string;
    gallery: ProductGalleryItem[];
    summarySuffix: string;
    buyHrefBase: string;
    whatsappHref: string;
    whatsappText: string;
    addToCartText: string;
    disableAddToCart?: boolean;
    addingToCartText: string;
    outOfStockText: string;
    selectedPrefix: string;
    trustBadges: string[];
  };
  ratings?: {
    index: string;
    label: string;
    titleHtml: string;
    sideHtml: string;
    panelTitleHtml: string;
    note: string;
    items: Array<{ descriptionHtml: string; percent?: number }>;
  };
  metrics?: {
    index: string;
    label: string;
    titleHtml: string;
    sideHtml: string;
    items: Array<{ name: string; value: string; unit?: string; tag?: string; caption: string }>;
  };
  specHighlight?: {
    tag: string;
    titleHtml: string;
    descriptionHtml: string;
    ctaText: string;
    ctaHref: string;
    rows: Array<{ label: string; value: string }>;
  };
  useCases?: {
    index: string;
    label: string;
    titleHtml: string;
    sideHtml: string;
    layout?: "uniform" | "bleed";
    photos: Array<{
      src: string;
      alt: string;
      title: string;
      text: string;
      imageFit?: "contain" | "cover";
      imageOffsetY?: string;
      imageScale?: string;
      imageBackground?: "white";
      mediaType?: "image" | "video";
    }>;
    cards: Array<{ eyebrow: string; title: string; items: string[]; note?: string }>;
    devices: {
      eyebrow: string;
      title: string;
      textHtml: string;
      chips: Array<{ label: string; highlighted?: boolean }>;
    };
  };
  ecosystem?: {
    index: string;
    label: string;
    titleHtml: string;
    textHtml: string;
    chips: string[];
    buttons: Array<{ text: string; href: string; variant?: "line" }>;
  };
  faq?: {
    index: string;
    label: string;
    titleHtml: string;
    sideHtml: string;
    items: Array<{ question: string; answerHtml: string }>;
    openFirst?: boolean;
  };
  video?: {
    index: string;
    label: string;
    titleHtml: string;
    sideHtml: string;
    href: string;
    image: string;
    imageAlt: string;
    title: string;
    text: string;
    meta: string;
  };
  related?: {
    index: string;
    label: string;
    titleHtml: string;
    items: Array<{
      tag: string;
      tagVariant?: "ce";
      title: string;
      descriptionHtml: string;
      href: string;
      linkText: string;
      background: string;
      image?: string;
      imageAlt?: string;
    }>;
  };
  finalCta?: {
    titleHtml: string;
    textHtml: string;
    primaryText: string;
    primaryHref: string;
    secondaryText: string;
    secondaryHref: string;
  };
};

export type ProductDetailRelatedProduct = {
  id: string;
  title: string;
  href: string;
  image?: string;
  imageAlt?: string;
  category?: string;
  descriptionHtml?: string;
};

const RELATED_PRODUCT_IMAGES: Record<string, { src: string; alt: string }> = {
  "/crs-model-yuksek-hassasiyetli-model-recinesi": {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/36167f47-c92f-4660-967c-d4a8faa86006/1080/crs-model-resin.webp",
    alt: tLocalized("CRS Model reçine ürün görseli", "CRS Model resin product image"),
  },
  "/crs-denture-biouyumlu-protez-recinesi": {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/7a581ce8-604c-47c0-bb9d-c05e4cdefae0/1080/denture-resin.webp",
    alt: tLocalized("CRS Denture reçine ürün görseli", "CRS Denture resin product image"),
  },
  "/crs-gingiva-yirtilmaz-dis-eti-recinesi": {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/b80f60c6-a2eb-4a48-a541-fa0c84489c6a/1080/gingiva-resin.webp",
    alt: tLocalized("CRS Gingiva reçine ürün görseli", "CRS Gingiva resin product image"),
  },
  "/crs-tray-resin-olcu-kasigi-3d-yazici-recinesi": {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a7753220-8b7a-4832-a428-c8678e941fda/1080/crs-tray-resin.webp",
    alt: tLocalized("CRS Tray Resin ürün görseli", "CRS Tray Resin product image"),
  },
};

function relatedProductImage(item: { href: string; image?: string; imageAlt?: string; title: string }) {
  if (item.image) return { src: item.image, alt: item.imageAlt || item.title };
  if (RELATED_PRODUCT_IMAGES[item.href]) return RELATED_PRODUCT_IMAGES[item.href];

  const productData = resolveProductDetailData({ slug: item.href });
  const mainImage = productData?.hero.gallery[0];
  return mainImage?.src ? { src: mainImage.src, alt: mainImage.alt || (isEnglishLocale() ? `${item.title} product image` : `${item.title} ürün görseli`) } : undefined;
}

type ProductAnnouncementPayload = {
  enabled?: boolean;
  highlightText?: string;
  text?: string;
  ctaText?: string;
  href?: string;
};

type Props = {
  data: ProductDetailTemplateData;
  variantGroups: ProductVariantGroup[];
  selectedGalleryIndex: number;
  onGallerySelect: (index: number) => void;
  onVariantSelect: (value: unknown) => void;
  onAddToCart: () => void;
  isAddToCartDisabled: boolean;
  isAdding: boolean;
  message?: string;
  price?: string;
  compareAtPrice?: string;
  selectedSummary: string;
  relatedProducts?: ProductDetailRelatedProduct[];
};

function templateStyle() {
  return {
    "--tmpdt-bg": "var(--tm-theme-bg, #FAFAF7)",
    "--tmpdt-ink": "var(--tm-theme-text, #0E0E0C)",
    "--tmpdt-sub": "var(--tm-theme-sub, #55554e)",
    "--tmpdt-mut": "var(--tm-theme-muted, #8f8f86)",
    "--tmpdt-line": "var(--tm-theme-line, #E6E6E0)",
    "--tmpdt-line2": "var(--tm-theme-line-strong, #d5d5cd)",
    "--tmpdt-lime": "var(--tm-theme-accent, #C7F136)",
    "--tmpdt-lime-ink": "var(--tm-theme-accent-text, #3d4d0e)",
    "--tmpdt-lime-soft": "var(--tm-theme-accent-soft, #F2F8DC)",
    "--tmpdt-red": "var(--tm-theme-danger, #E2492F)",
    "--tmpdt-panel": "var(--tm-theme-panel, #F1F1EC)",
    "--tmpdt-dark": "var(--tm-theme-dark, #0E0E0C)",
  } as any;
}

export function ProductDetailSectionScope({ data, children }: { data: ProductDetailTemplateData; children: ComponentChildren }) {
  const style = useMemo(templateStyle, []);
  return (
    <section lang={isEnglishLocale() ? "en" : "tr"} className="three-mash-product-detail-template" style={style} data-product-template-key={data.key}>
      {children}
    </section>
  );
}

function html(value: string) {
  return { __html: sanitizeHtml(translateText(value)) };
}

function t(value?: string | null): string {
  return translateText(value || "");
}

function SectionIndex({ index, label }: { index: string; label: string }) {
  const hasIndex = (index ?? "").trim() !== "";
  const hasLabel = (label ?? "").trim() !== "";
  if (!hasIndex && !hasLabel) return null;
  return (
    <div className="tmpdt-idx">
      {hasIndex && <span className="tmpdt-idx-n">{index}</span>}
      {hasLabel && <span className="tmpdt-idx-t">{t(label)}</span>}
      <span className="tmpdt-idx-ln" />
    </div>
  );
}

function SectionHead({ titleHtml, sideHtml, wide = false }: { titleHtml: string; sideHtml?: string; wide?: boolean }) {
  const hasTitle = (titleHtml ?? "").trim() !== "";
  const hasSide = (sideHtml ?? "").trim() !== "";
  if (!hasTitle && !hasSide) return null;
  return (
    <div className={`tmpdt-shead${hasSide ? "" : " tmpdt-solo"}`}>
      {hasTitle && <h2 className={wide ? "tmpdt-wide" : ""} dangerouslySetInnerHTML={html(titleHtml)} />}
      {hasSide && sideHtml ? <div className="tmpdt-side" dangerouslySetInnerHTML={html(sideHtml)} /> : null}
    </div>
  );
}

function isResinProductDetail(data: ProductDetailTemplateData) {
  const categoryHref = data.breadcrumb.categoryHref.toLocaleLowerCase("tr-TR");
  return categoryHref.includes("dental-3d-yazici-recineleri") || categoryHref.includes("dental-recineler");
}

function CountText({ value, active }: { value: string; active: boolean }) {
  const parsed = Number(value.replace(/\./g, "").replace(",", "."));
  const numeric = Number.isFinite(parsed) && /^\d+[.,]?\d*$/.test(value.trim());
  const [text, setText] = useState(value);

  useEffect(() => {
    if (!numeric) {
      setText(value);
      return undefined;
    }
    if (!active) {
      setText(value);
      return undefined;
    }

    let frame = 0;
    let completionTimer = 0;
    let start = 0;
    const duration = 1100;
    const tick = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setText(Math.round(parsed * eased).toLocaleString("tr-TR"));
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    completionTimer = window.setTimeout(() => {
      setText(parsed.toLocaleString("tr-TR"));
    }, duration + 50);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(completionTimer);
    };
  }, [active, numeric, parsed, value]);

  return <>{text}</>;
}

function useInView<T extends HTMLElement>(key: string) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
  }, [key]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [key]);

  return [ref, visible] as const;
}

function productBuyHref(base: string, variantGroups: ProductVariantGroup[]) {
  const params = new URLSearchParams();
  variantGroups.forEach((group) => {
    const selected = group.values.find((value) => value.selected);
    if (selected) params.set(group.name, selected.name);
  });
  const query = params.toString();
  if (!query) return base;
  return `${base}${base.includes("?") ? "&" : "?"}${query}`;
}

function Gallery({ data, selectedGalleryIndex, onGallerySelect }: Pick<Props, "data" | "selectedGalleryIndex" | "onGallerySelect">) {
  const gallery = data.hero.gallery;
  const selected = gallery[selectedGalleryIndex] || gallery[0];
  const thumbColumns = Math.max(1, Math.min(gallery.length, 8));
  const imageRef = useRef<HTMLImageElement>(null);

  return (
    <div className="tmpdt-gal">
      <div className="tmpdt-gal-main">
        {data.hero.galleryBadge ? <span className="tmpdt-cebadge">{data.hero.galleryBadge}</span> : null}
        {selected ? (
          <img
            ref={imageRef}
            src={selected.src}
            alt={selected.alt || data.breadcrumb.productText}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        ) : null}
      </div>
      {gallery.length > 1 ? (
        <div className="tmpdt-thumbs" style={{ "--tmpdt-thumb-cols": thumbColumns } as any}>
          {gallery.map((item, index) => (
            <button
              type="button"
              className={index === selectedGalleryIndex ? "is-on" : ""}
              onClick={() => onGallerySelect(index)}
              aria-label={`${data.breadcrumb.productText} görsel ${index + 1}`}
              key={`${item.src}-${index}`}
            >
<img
  src={item.thumbSrc || item.src}
  alt=""
  decoding="async"
/>            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function photoTransformStyle(photo: { imageOffsetY?: string; imageScale?: string }) {
  const style: Record<string, string> = {};
  if (photo.imageOffsetY) style["--tmpdt-photo-y"] = photo.imageOffsetY;
  if (photo.imageScale) style["--tmpdt-photo-scale"] = photo.imageScale;
  return Object.keys(style).length ? (style as any) : undefined;
}

function localizeAddToCartText(text?: string): string {
  if (!isEnglishLocale()) return text || tLocalized("Sepete ekle →", "Add to cart →");
  const normalized = (text || "").toLowerCase().trim();
  if (!normalized || normalized.includes(tLocalized("sepet", "cart")) || normalized === tLocalized("ekle", "add")) {
    return text && text === text.toUpperCase() ? "ADD TO CART" : "Add to Cart →";
  }
  return text || "Add to Cart →";
}

function localizeAddingToCartText(text?: string): string {
  if (!isEnglishLocale()) return text || tLocalized("Ekleniyor...", "Adding...");
  const normalized = (text || "").toLowerCase().trim();
  if (!normalized || normalized.includes("ekleniyor")) {
    return text && text === text.toUpperCase() ? "ADDING..." : "Adding...";
  }
  return text || "Adding...";
}

function localizeOutOfStockText(text?: string): string {
  if (!isEnglishLocale()) return text || tLocalized("Stok yok", "Out of stock");
  const normalized = (text || "").toLowerCase().trim();
  if (!normalized || normalized.includes(tLocalized("stok", "stok")) || normalized.includes(tLocalized("tükendi", "Out of Stock"))) {
    return text && text === text.toUpperCase() ? "OUT OF STOCK" : "Out of stock";
  }
  return text || "Out of stock";
}

function localizeWhatsAppText(text?: string): string {
  if (!isEnglishLocale()) return text || tLocalized("WhatsApp'tan sor", "Ask via WhatsApp");
  const fallbackText = tLocalized("WhatsApp'tan sor", "Ask via WhatsApp");
  return !text || text === fallbackText || text === tLocalized("Teklif alın", "Get a quote") ? "Ask via WhatsApp" : text;
}

function localizeSummarySuffix(suffix?: string): string {
  if (!isEnglishLocale()) return suffix || "";
  const normalized = (suffix || "").toLowerCase().trim();
  if (normalized.includes("uyumluluk") || normalized.includes("parametre") || normalized.includes(tLocalized("teknik destek", "technical support"))) {
    return "— compatibility check & technical support included.";
  }
  return suffix || "";
}

function Configurator(props: Props) {
  const buyHref = productBuyHref(props.data.hero.buyHrefBase, props.variantGroups);

  const hidePriceProducts = [
    "mash w1e ultrasonik yıkama cihazı",
    "creality wash&cure uw-03",
    "mash c1e uv kürleme cihazı",
    "creality halot-sky 6k - hassasiyeti arttırılmış versiyon",
  ];

  const hidePrice = hidePriceProducts.includes(
    props.data.breadcrumb.productText.toLocaleLowerCase("tr-TR").trim()
  );

  const hasManySwatches = props.variantGroups.some(
    (group) => group.values.some((value) => value.color) && group.values.length > 12
  );
  const rawMessage = props.message || "";
  const displayedMessage = isEnglishLocale() && (rawMessage.toLowerCase().includes(tLocalized("stok", "stok")) || rawMessage.toLowerCase().includes(tLocalized("tükendi", "Out of Stock")))
    ? "Out of stock"
    : rawMessage;

  return (
    <div className="tmpdt-cfg">
  {props.price && !hidePrice ? (
        <div className="tmpdt-price">
          <strong>{props.price}</strong>
          {props.compareAtPrice ? <span>{props.compareAtPrice}</span> : null}
        </div>
      ) : null}
      {props.variantGroups.length ? (
        <div className={`tmpdt-options${hasManySwatches ? " has-many-swatches" : ""}`}>
          {props.variantGroups.map((group) => {
            const selected = group.values.find((value) => value.selected);
            const isColor = group.values.some((value) => value.color);
            const isManyColor = isColor && group.values.length > 12;
            return (
              <div className={`tmpdt-cfg-row${isColor ? " is-color" : ""}${isManyColor ? " is-many-color" : ""}`} key={group.id}>
                <div className="tmpdt-lab">
                  {group.name} <b>{selected?.name || ""}</b>
                </div>
                {isColor ? (
                  <div className="tmpdt-swatches">
                    {group.values.map((value) => (
                      <button
                        type="button"
                        className={`${value.selected ? "is-on" : ""}${!value.hasStock ? " is-unavailable" : ""}`}
                        aria-disabled={!value.hasStock}
                        onClick={() => props.onVariantSelect(value.rawValue)}
                        title={value.name}
                        key={value.id}
                      >
                        <span className="tmpdt-chip" style={{ background: value.color || "#f3ede0" }} />
                        <span className="tmpdt-nm">{value.name}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="tmpdt-seg">
                    {group.values.map((value) => (
                      <button
                        type="button"
                        className={`${value.selected ? "is-on" : ""}${!value.hasStock ? " is-unavailable" : ""}`}
                        aria-disabled={!value.hasStock}
                        onClick={() => props.onVariantSelect(value.rawValue)}
                        key={value.id}
                      >
                        {value.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : null}
      <div className="tmpdt-sum">
        {isEnglishLocale() && (props.data.hero.selectedPrefix === tLocalized("Seçiminiz:", "Your selection:") || !props.data.hero.selectedPrefix) ? "Selected:" : props.data.hero.selectedPrefix} <b>{props.selectedSummary}</b> {localizeSummarySuffix(props.data.hero.summarySuffix)}
      </div>
      <div className="tmpdt-act">
        {!props.data.hero.disableAddToCart && (
          <button
            type="button"
            className="tmpdt-btn tmpdt-lime"
            onClick={props.onAddToCart}
            disabled={props.isAddToCartDisabled}
          >
            {props.isAdding
              ? localizeAddingToCartText(props.data.hero.addingToCartText)
              : props.isAddToCartDisabled
              ? localizeOutOfStockText(props.data.hero.outOfStockText)
              : localizeAddToCartText(props.data.hero.addToCartText)}
          </button>
        )}
        <a className="tmpdt-btn tmpdt-line" href={safeWhatsAppHref(props.data.hero.whatsappHref)} target="_blank" rel="noopener noreferrer">
          {localizeWhatsAppText(props.data.hero.whatsappText)}
        </a>
      </div>
      {displayedMessage ? <p className="tmpdt-msg">{displayedMessage}</p> : null}
      <div className="tmpdt-trust">
        {props.data.hero.trustBadges.map((item) => (
          <span key={item}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12l4 4L19 7" />
            </svg>
            {item === tLocalized("Ücretsiz kargo", "Free Shipping") ? tLocalized("Ücretsiz kargo", "Free Shipping") : item === tLocalized("Koşulsuz iade", "Hassle-free Returns") ? tLocalized("Koşulsuz iade", "Hassle-free Returns") : item === tLocalized("Güvenli ödeme", "Secure Payment") ? tLocalized("Güvenli ödeme", "Secure Payment") : item}
          </span>
        ))}
      </div>
    </div>
  );
}

function productJsonLd(props: Props): string {
  const { data, price } = props;
  const rawTitle = (data.hero.titleHtml || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const rawDescription = (data.hero.leadHtml || data.hero.kicker || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const images = (data.hero.gallery || []).map((g) => g.src).filter(Boolean);
  const numericPrice = price ? price.replace(/[^0-9.,]/g, "").replace(",", ".") : "";

  const productSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: rawTitle,
    description: rawDescription,
    image: images.length ? images : undefined,
    brand: {
      "@type": "Brand",
      name: tLocalized("3MASH", "3MASH"),
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "TRY",
      price: numericPrice || undefined,
      availability: props.isAddToCartDisabled ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
      url: typeof window !== "undefined" ? window.location.href : undefined,
    },
  };

  const breadcrumbSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: data.breadcrumb.homeText || tLocalized("Anasayfa", "Home"),
        item: data.breadcrumb.homeHref || "/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: data.breadcrumb.categoryText || tLocalized("Kategori", "Category"),
        item: data.breadcrumb.categoryHref || tLocalized("/kategori", "/kategori"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: data.breadcrumb.productText || rawTitle,
      },
    ],
  };

  return safeJsonLdScript([productSchema, breadcrumbSchema]);
}

export function ProductDetailHeroSection(props: Props) {
  const heroRef = useRef<HTMLDivElement>(null);
  const jsonLd = useMemo(() => productJsonLd(props), [props.data.key, props.price, props.isAddToCartDisabled]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div className="tmpdt-wrap">
        <div className="tmpdt-crumb">
          <a href={localizedHref(props.data.breadcrumb.homeHref)}>{isEnglishLocale() && (props.data.breadcrumb.homeText === tLocalized("Ana sayfa", "Home") || props.data.breadcrumb.homeText === tLocalized("Anasayfa", "Home")) ? "Home" : props.data.breadcrumb.homeText}</a>
          <span>/</span>
          <a href={localizedHref(props.data.breadcrumb.categoryHref)}>{props.data.breadcrumb.categoryText}</a>
          <span>/</span>
          <span>{props.data.breadcrumb.productText}</span>
        </div>
        <div className="tmpdt-phero" id="satinal" ref={heroRef}>
          <Gallery data={props.data} selectedGalleryIndex={props.selectedGalleryIndex} onGallerySelect={props.onGallerySelect} />
          <div className="tmpdt-buy">
            <div className="tmpdt-kicker">{props.data.hero.kicker}</div>
            <h1 dangerouslySetInnerHTML={html(props.data.hero.titleHtml)} />
            <p className="tmpdt-lead" dangerouslySetInnerHTML={html(props.data.hero.leadHtml)} />
            <div className="tmpdt-pills">
              {props.data.hero.pills.map((pill) => (
                <span key={`${pill.value || ""}-${pill.label}`}>
                  {pill.value ? <b>{pill.value}</b> : null}
                  {pill.value ? " " : ""}
                  {pill.label}
                </span>
              ))}
            </div>
            <Configurator {...props} />
          </div>
        </div>
      </div>
    </>
  );
}

export function productAnnouncementPayload(data: ProductDetailTemplateData): ProductAnnouncementPayload | null {
  const announcement = data.announcement;
  if (!announcement || announcement.enabled === false) return null;
  return {
    enabled: true,
    highlightText: announcement.strongText,
    text: announcement.longText || "",
    ctaText: announcement.ctaText,
    href: announcement.ctaHref === "#satinal" ? "#uygulama" : announcement.ctaHref,
  };
}

export function ProductDetailRatingsSection({ data }: { data: ProductDetailTemplateData }) {
  const ratings = data.ratings;
  const [ref, visible] = useInView<HTMLDivElement>(`${data.key}-ratings`);
  if (!ratings?.items.length) return null;

  return (
    <section className="tmpdt-section" id="deneyim">
      <div className="tmpdt-wrap">
        <SectionIndex index={ratings.index} label={ratings.label} />
        <SectionHead titleHtml={ratings.titleHtml} sideHtml={ratings.sideHtml} />
        <div className="tmpdt-rate" ref={ref}>
          <div className="tmpdt-rate-hd">
            <h3 dangerouslySetInnerHTML={html(ratings.panelTitleHtml)} />
            <div className="tmpdt-note">{t(ratings.note)}</div>
          </div>
          {ratings.items.map((item, index) => (
            (() => {
              const fallbackPercent = [99, 97, 96][index];
              const percent = isResinProductDetail(data) && (typeof item.percent === "number" && item.percent > 0
                ? item.percent
                : fallbackPercent);

              return <div className={`tmpdt-rrow${isResinProductDetail(data) ? "" : " is-plain"}`} key={`${item.descriptionHtml}-${index}`}>
              <div className="tmpdt-rdesc" dangerouslySetInnerHTML={html(item.descriptionHtml)} />
              {isResinProductDetail(data) ? (
                <div className="tmpdt-rmeter">
                  <div className="tmpdt-rtrack">
                    <i style={{ width: visible ? `${percent}%` : "0%" }} />
                  </div>
                  <div className="tmpdt-rpct">
                    %<CountText value={String(percent)} active={visible} />
                  </div>
                </div>
              ) : null}
              </div>;
            })()
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductDetailMetricsSection({ data }: { data: ProductDetailTemplateData }) {
  const metrics = data.metrics;
  const [ref, visible] = useInView<HTMLDivElement>(`${data.key}-metrics`);
  if (!metrics?.items.length) return null;

  return (
    <section className="tmpdt-section tmpdt-section-tight" id="teknik">
      <div className="tmpdt-wrap" ref={ref}>
        <SectionIndex index={metrics.index} label={metrics.label} />
        <SectionHead titleHtml={metrics.titleHtml} sideHtml={metrics.sideHtml} wide />
        <div className="tmpdt-meters">
          {metrics.items.map((item) => (
            <article className="tmpdt-meter" key={`${item.name}-${item.value}`}>
              <div className="tmpdt-meter-nm">{t(item.name)}</div>
              <div className="tmpdt-meter-val">
                <CountText value={item.value} active={visible} />
                {item.unit ? <em>{t(item.unit)}</em> : null}
              </div>
              {item.tag ? <span className="tmpdt-iso">{t(item.tag)}</span> : null}
              <div className="tmpdt-meter-cap">{t(item.caption)}</div>
            </article>
          ))}
        </div>
        {data.specHighlight ? <ProductDetailSpecHighlight data={data.specHighlight} /> : null}
      </div>
    </section>
  );
}

export function ProductDetailSpecHighlightSection({ data }: { data: ProductDetailTemplateData }) {
  if (!data.specHighlight) return null;

  return (
    <section className="tmpdt-section tmpdt-section-tight" id="teknik-vurgu">
      <div className="tmpdt-wrap">
        <ProductDetailSpecHighlight data={data.specHighlight} />
      </div>
    </section>
  );
}

export function ProductDetailSpecHighlight({ data }: { data: NonNullable<ProductDetailTemplateData["specHighlight"]> }) {
  return (
    <div className="tmpdt-flag">
      <div>
        <div className="tmpdt-flag-tag">{t(data.tag)}</div>
        <h3 dangerouslySetInnerHTML={html(data.titleHtml)} />
        <p dangerouslySetInnerHTML={html(data.descriptionHtml)} />
        <a className="tmpdt-go" href={safeNavigationHref(localizedHref(data.ctaHref))}>
          {t(data.ctaText)}
        </a>
      </div>
      <div className="tmpdt-spectbl">
        {data.rows.map((row) => (
          <div key={row.label}>
            <span>{t(row.label)}</span>
            <b>{t(row.value)}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProductDetailUseCasesSection({ data }: { data: ProductDetailTemplateData }) {
  const useCases = data.useCases;
  if (!useCases) return null;

  return (
    <section className={`tmpdt-section tmpdt-section-tight${useCases.layout ? ` tmpdt-usecases-${useCases.layout}` : ""}`} id="uygulama">
      <div className="tmpdt-wrap">
        <SectionIndex index={useCases.index} label={useCases.label} />
        <SectionHead titleHtml={useCases.titleHtml} sideHtml={useCases.sideHtml} wide />
        {useCases.photos.length ? (
          <div className="tmpdt-pstrip">
            {useCases.photos.map((photo, index) => (
              <article
                className={`tmpdt-pshot tmpdt-pshot-${index + 1}${photo.imageFit === "cover" ? " is-cover" : ""}${photo.imageBackground === "white" ? " is-white-media" : ""}${photo.mediaType === tLocalized("video", "video") ? tLocalized("is-video", "is-video") : ""}`}
                key={photo.title}
              >
                <div className="tmpdt-pshot-im">
                  {photo.mediaType === tLocalized("video", "video") ? (
                    <video
                      src={photo.src}
                      aria-label={photo.alt}
                      width="100%"
                      height="100%"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      style={photoTransformStyle(photo)}
                    />
                  ) : (
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      decoding="async"
                      style={photoTransformStyle(photo)}
                    />
                  )}
                </div>
                <div className="tmpdt-pshot-cp">
                  <b>{t(photo.title)}</b>
                  <span>{t(photo.text)}</span>
                </div>
              </article>
            ))}
          </div>
        ) : null}
        {useCases.cards.length ? (
          <div className="tmpdt-open2">
            {useCases.cards.map((card) => (
              <article className="tmpdt-ocard" key={card.title}>
                <div className="tmpdt-oh">{t(card.eyebrow)}</div>
                <h3>{t(card.title)}</h3>
                <ul>
                  {card.items.map((item) => (
                    <li key={item} dangerouslySetInnerHTML={html(item)} />
                  ))}
                </ul>
                {card.note ? <div className="tmpdt-onote">{t(card.note)}</div> : null}
              </article>
            ))}
          </div>
        ) : null}
        <div className="tmpdt-devfull">
          <div className="tmpdt-oh">{t(useCases.devices.eyebrow)}</div>
          <h3>{t(useCases.devices.title)}</h3>
          <p dangerouslySetInnerHTML={html(useCases.devices.textHtml)} />
          <div className="tmpdt-chips2">
            {useCases.devices.chips.map((chip) => (
              <span className={chip.highlighted ? "is-more" : ""} key={chip.label}>
                {t(chip.label)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProductDetailDevicesSection({ data }: { data: ProductDetailTemplateData }) {
  const useCases = data.useCases;
  if (!useCases) return null;

  return (
    <section className="tmpdt-section tmpdt-section-tight" id="uyumlu-cihazlar">
      <div className="tmpdt-wrap">
        <div className="tmpdt-devfull">
          <div className="tmpdt-oh">{useCases.devices.eyebrow}</div>
          <h3>{useCases.devices.title}</h3>
          <p dangerouslySetInnerHTML={html(useCases.devices.textHtml)} />
          <div className="tmpdt-chips2">
            {useCases.devices.chips.map((chip) => (
              <span className={chip.highlighted ? "is-more" : ""} key={chip.label}>
                {chip.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProductDetailEcosystemSection({ data }: { data: ProductDetailTemplateData }) {
  const ecosystem = data.ecosystem;
  if (!ecosystem) return null;

  return (
    <section className="tmpdt-section tmpdt-section-tight">
      <div className="tmpdt-wrap">
        <SectionIndex index={ecosystem.index} label={ecosystem.label} />
        <div className="tmpdt-dev">
          <h3 dangerouslySetInnerHTML={html(ecosystem.titleHtml)} />
          <p dangerouslySetInnerHTML={html(ecosystem.textHtml)} />
          <div className="tmpdt-chipwrap">
            {ecosystem.chips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>
          <div className="tmpdt-dev-actions">
            {ecosystem.buttons.map((button) => (
              <a className={`tmpdt-btn${button.variant === "line" ? " tmpdt-line" : ""}`} href={safeNavigationHref(localizedHref(button.href))} key={button.text}>
                {button.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function faqJsonLd(faq: ProductDetailTemplateData["faq"]): string | null {
  if (!faq?.items?.length) return null;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answerHtml.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim(),
      },
    })),
  };
  return safeJsonLdScript(faqSchema);
}

export function ProductDetailFaqSection({ data }: { data: ProductDetailTemplateData }) {
  const faq = data.faq;
  if (!faq?.items.length) return null;

  const jsonLd = useMemo(() => faqJsonLd(faq), [data.key, faq.items]);

  return (
    <section className="tmpdt-section tmpdt-section-tight" id="sss">
      {jsonLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} /> : null}
      <div className="tmpdt-wrap">
        <SectionIndex index={faq.index} label={faq.label} />
        <SectionHead titleHtml={faq.titleHtml} sideHtml={faq.sideHtml} wide />
        <div className="tmpdt-faq">
          {faq.items.map((item, index) => (
            <div className="tmpdt-qa" key={`${data.key}-${item.question}`}>
              <details open={(faq.openFirst ?? true) && index === 0}>
                <summary>
                  {t(item.question)}
                  <span>+</span>
                </summary>
                <div className="tmpdt-answer" dangerouslySetInnerHTML={html(item.answerHtml)} />
              </details>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function extractYouTubeId(url: string | undefined): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  const match = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/i
  );
  return match ? match[1] : null;
}

function isDirectVideoFile(url: string | undefined): boolean {
  if (!url) return false;
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url.trim());
}

export function ProductDetailVideoSection({ data }: { data: ProductDetailTemplateData }) {
  const video = data.video;
  if (!video) return null;

  const sectionRef = useRef<HTMLElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const videoElemRef = useRef<HTMLVideoElement>(null);
  const hasAutoplayedRef = useRef(false);

  const [shouldLoad, setShouldLoad] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const videoHref = video.href?.trim() || "https://www.youtube.com/watch?v=dNPHy_sd9aQ";
  const youtubeId = extractYouTubeId(videoHref);
  const isDirect = isDirectVideoFile(videoHref);

  const posterSrc =
    video.image ||
    (youtubeId ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg` : "");

  function postYouTubeMessage(func: string, args: any[] = []) {
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow) return;
    try {
      iframe.contentWindow.postMessage(
        JSON.stringify({ event: "command", func, args }),
        "*"
      );
    } catch {}
  }

  function handlePlayManual() {
    setIsPlaying(true);
    setShouldLoad(true);
    hasAutoplayedRef.current = true;
    if (youtubeId) {
      postYouTubeMessage("playVideo");
    } else if (videoElemRef.current) {
      void videoElemRef.current.play();
    }
  }

  function toggleSound(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (youtubeId) {
      if (nextMuted) {
        postYouTubeMessage("mute");
      } else {
        postYouTubeMessage("unMute");
        postYouTubeMessage("setVolume", [100]);
      }
    } else if (videoElemRef.current) {
      videoElemRef.current.muted = nextMuted;
    }
  }

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      setIsPlaying(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Autoplay once when entering viewport
          if (!hasAutoplayedRef.current) {
            hasAutoplayedRef.current = true;
            setShouldLoad(true);
            setIsPlaying(true);
          } else {
            // Re-entered viewport: resume playback without restarting
            if (youtubeId) {
              postYouTubeMessage("playVideo");
            } else if (videoElemRef.current) {
              void videoElemRef.current.play();
            }
          }
        } else {
          // Left viewport: pause video to save audio & resources
          if (hasAutoplayedRef.current) {
            if (youtubeId) {
              postYouTubeMessage("pauseVideo");
            } else if (videoElemRef.current) {
              videoElemRef.current.pause();
            }
          }
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [youtubeId, isDirect]);

  return (
    <section className="tmpdt-section tmpdt-section-tight" id="video" ref={sectionRef}>
      <div className="tmpdt-wrap">
        <SectionIndex index={video.index} label={video.label} />
        <SectionHead titleHtml={video.titleHtml} sideHtml={video.sideHtml} wide />

        <div className={`tmpdt-vid${isPlaying ? " is-playing" : ""}`}>
          {/* Active Player (YouTube iframe or HTML5 video) */}
          {shouldLoad ? (
            youtubeId ? (
              <iframe
                ref={iframeRef}
                className="tmpdt-vid-frame"
                src={`https://www.youtube.com/embed/${youtubeId}?enablejsapi=1&autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1`}
                title={video.title || "YouTube video"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                onLoad={() => setIsIframeLoaded(true)}
              />
            ) : isDirect ? (
              <video
                ref={videoElemRef}
                className="tmpdt-vid-frame"
                src={videoHref}
                playsInline
                autoPlay
                muted
                loop
                controls
                preload="metadata"
                onLoadedData={() => setIsIframeLoaded(true)}
              />
            ) : (
              <iframe
                ref={iframeRef}
                className="tmpdt-vid-frame"
                src={videoHref}
                title={video.title || "Video"}
                allow="autoplay; fullscreen"
                allowFullScreen
                onLoad={() => setIsIframeLoaded(true)}
              />
            )
          ) : null}

          {/* Poster Image (Visible before play or while live player is loading) */}
          {posterSrc && (!isPlaying || !isIframeLoaded) ? (
            <img
              src={posterSrc}
              alt={video.imageAlt || video.title || "Video"}
              className={`tmpdt-vid-poster${isIframeLoaded && isPlaying ? " is-hidden" : ""}`}
              loading="lazy"
              decoding="async"
              onClick={handlePlayManual}
            />
          ) : null}

          {/* Overlay Content (Title, Text, Meta, Play Button) */}
          <div
            className={`tmpdt-vid-ov${isPlaying ? " is-playing" : ""}`}
            onClick={!isPlaying ? handlePlayManual : undefined}
          >
            {!isPlaying ? (
              <button
                type="button"
                className="tmpdt-play"
                aria-label={tLocalized("Videoyu Oynat", "Play Video")}
                onClick={handlePlayManual}
              >
                <span className="tmpdt-play-icon" aria-hidden="true"></span>
              </button>
            ) : null}
          </div>

          {/* Audio Toggle / Unmute Control */}
          {isPlaying ? (
            <button
              type="button"
              className="tmpdt-sound-btn"
              onClick={toggleSound}
              aria-label={isMuted ? tLocalized("Sesi Aç", "Unmute") : tLocalized("Sesi Kapat", "Mute")}
            >
              {isMuted ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              )}
              <span>{isMuted ? tLocalized("Sesi Aç", "Unmute") : tLocalized("Sesi Kapat", "Mute")}</span>
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function ProductDetailRelatedSection({
  data,
  products,
  titleHtml,
}: {
  data: ProductDetailTemplateData;
  products?: ProductDetailRelatedProduct[];
  titleHtml?: string;
}) {
  const related = data.related;
  const hasLiveProductSource = Array.isArray(products);
  const liveProducts = products?.filter((item) => item.id && item.title && item.href) || [];
  const relatedRailRef = useRef<HTMLDivElement>(null);
  const shouldUseLiveProducts = hasLiveProductSource && liveProducts.length > 0;
  if (!shouldUseLiveProducts && !related?.items.length) return null;

  function scrollRelated(direction: -1 | 1) {
    const rail = relatedRailRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>(".tmpdt-rc");
    const gap = 18;
    const distance = card ? (card.offsetWidth + gap) * 2 : rail.clientWidth * 0.9;
    rail.scrollBy({ left: direction * distance, behavior: "smooth" });
  }

  const defaultLabel = isEnglishLocale() ? "Related Products" : tLocalized("İlgili Ürünler", "Related Products");
  const relatedLabel = related?.label !== undefined && related?.label !== null ? related.label : defaultLabel;
  const relatedIndex = related?.index !== undefined && related?.index !== null ? related.index : "07";
  const defaultTitle = isEnglishLocale() ? 'Working <span class="em">together in the same case.</span>' : tLocalized("Aynı vakada <span class=\"em\">birlikte çalışanlar.</span>", "Those who <span class=\"em\">work together</span> on the same case.");
  const resolvedTitle = titleHtml !== undefined && titleHtml !== null ? titleHtml : (related?.titleHtml !== undefined && related?.titleHtml !== null ? related.titleHtml : defaultTitle);

  return (
    <section className="tmpdt-section tmpdt-section-tight">
      <div className="tmpdt-wrap">
        <SectionIndex index={relatedIndex} label={relatedLabel} />
        <SectionHead titleHtml={resolvedTitle} wide />
        {shouldUseLiveProducts ? (
          <div className="tmpdt-rshell">
            {liveProducts.length > 4 ? (
              <button type="button" className="tmpdt-rnav tmpdt-rnav-prev" aria-label={tLocalized("Önceki ilgili ürünler", "Previous related products")} onClick={() => scrollRelated(-1)}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
            ) : null}
            <div ref={relatedRailRef} className="tmpdt-rgrid tmpdt-rgrid-live" aria-label={tLocalized("İlgili ürünler", "Related products")}>
              {liveProducts.map((item) => (
                <article className="tmpdt-rc tmpdt-rc-live" key={item.id}>
                  <a className="tmpdt-rc-live-link" href={localizedHref(item.href)}>
                    <div className="tmpdt-rc-ph tmpdt-rc-live-ph">
                      
                      {item.image ? (
                        <img className="tmpdt-rc-live-img" src={item.image} alt={item.imageAlt || item.title} loading="lazy" decoding="async" />
                      ) : (
                        <svg viewBox="0 0 48 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" aria-hidden="true">
                          <path d="M18 6h12v8l5 7v31a4 4 0 0 1-4 4H17a4 4 0 0 1-4-4V21l5-7V6z" />
                          <line x1="18" y1="6" x2="30" y2="6" />
                          <line x1="13" y1="35" x2="35" y2="35" />
                        </svg>
                      )}
                    </div>
                    <div className="tmpdt-rc-bd">
                      <h3>{t(item.title)}</h3>
                      {item.descriptionHtml ? <div className="tmpdt-rc-ds" dangerouslySetInnerHTML={html(item.descriptionHtml)} /> : null}
                      <span className="tmpdt-rc-go">
                        {tLocalized("İncele", "View")} <span>→</span>
                      </span>
                    </div>
                  </a>
                </article>
              ))}
            </div>
            {liveProducts.length > 4 ? (
              <button type="button" className="tmpdt-rnav tmpdt-rnav-next" aria-label={tLocalized("Sonraki ilgili ürünler", "Next related products")} onClick={() => scrollRelated(1)}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m9 6 6 6-6 6" />
                </svg>
              </button>
            ) : null}
          </div>
        ) : (
          <div className="tmpdt-rgrid">
            {related?.items.map((item) => {
              const isAllResins =
                item.href === "/dental-3d-yazici-recineleri" ||
                item.tag === "TÜM HAT" ||
                item.tag === "FULL RANGE" ||
                item.title?.toLowerCase().includes("tüm reçineler") ||
                item.title?.toLowerCase().includes("all resins");
              const image = relatedProductImage(item);
              return (
                <article className="tmpdt-rc" key={item.title}>
                  <a className="tmpdt-rc-live-link" href={localizedHref(item.href)}>
                    <div className="tmpdt-rc-ph" style={{ background: item.background }}>
                      <span className={`tmpdt-rc-tag${item.tagVariant === "ce" ? " is-ce" : ""}`}>{t(item.tag)}</span>
                      {isAllResins ? (
                        <div className="tmpdt-rc-trio" aria-hidden="true">
                          <img
                            className="tmpdt-rc-trio-img is-left"
                            src="https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a7753220-8b7a-4832-a428-c8678e941fda/1080/crs-tray-resin.webp"
                            alt="CRS Tray Resin"
                            loading="lazy"
                            decoding="async"
                          />
                          <img
                            className="tmpdt-rc-trio-img is-center"
                            src="https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/36167f47-c92f-4660-967c-d4a8faa86006/1080/crs-model-resin.webp"
                            alt="CRS Model Resin"
                            loading="lazy"
                            decoding="async"
                          />
                          <img
                            className="tmpdt-rc-trio-img is-right"
                            src="https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/7a581ce8-604c-47c0-bb9d-c05e4cdefae0/1080/denture-resin.webp"
                            alt="CRS Denture Resin"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      ) : image ? (
                        <img className="tmpdt-rc-live-img" src={image.src} alt={image.alt} loading="lazy" decoding="async" />
                      ) : (
                        <svg viewBox="0 0 48 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" aria-hidden="true">
                          <path d="M18 6h12v8l5 7v31a4 4 0 0 1-4 4H17a4 4 0 0 1-4-4V21l5-7V6z" />
                          <line x1="18" y1="6" x2="30" y2="6" />
                          <line x1="13" y1="35" x2="35" y2="35" />
                        </svg>
                      )}
                    </div>
                    <div className="tmpdt-rc-bd">
                      <h3>{t(item.title)}</h3>
                      <div className="tmpdt-rc-ds" dangerouslySetInnerHTML={html(item.descriptionHtml)} />
                      <span className="tmpdt-rc-go">
                        {t(item.linkText)} <span>→</span>
                      </span>
                    </div>
                  </a>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export function ProductDetailFinalCtaSection({ data }: { data: ProductDetailTemplateData }) {
  const finalCta = data.finalCta;
  if (!finalCta) return null;

  const titleHtml = (finalCta.titleHtml ?? "").trim();
  const textHtml = (finalCta.textHtml ?? "").trim();
  const primaryText = (finalCta.primaryText ?? "").trim();
  const secondaryText = (finalCta.secondaryText ?? "").trim();

  if (!titleHtml && !textHtml && !primaryText && !secondaryText) {
    return null;
  }

  return (
    <section className="tmpdt-final">
      <div className="tmpdt-wrap">
        {titleHtml !== "" && <h2 dangerouslySetInnerHTML={html(finalCta.titleHtml)} />}
        {textHtml !== "" && <p dangerouslySetInnerHTML={html(finalCta.textHtml)} />}
        {(primaryText !== "" || secondaryText !== "") && (
          <div className="tmpdt-final-actions">
            {primaryText !== "" && (
              <a className="tmpdt-btn tmpdt-lime" href={safeNavigationHref(localizedHref(finalCta.primaryHref || "#"), "#")}>
                {t(finalCta.primaryText)}
              </a>
            )}
            {secondaryText !== "" && (
              <a className="tmpdt-btn tmpdt-inv" href={safeNavigationHref(localizedHref(finalCta.secondaryHref || "#"), "#")}>
                {t(finalCta.secondaryText)}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export function ThreeMashProductDetailTemplate(props: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const style = useMemo(
    () =>
      templateStyle(),
    [],
  );

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    node.scrollTop = 0;
  }, [props.data.key]);

  return (
    <section ref={rootRef} className="three-mash-product-detail-template" style={style} data-product-template-key={props.data.key}>
      <ProductDetailHeroSection {...props} />
      <ProductDetailRatingsSection data={props.data} />
      <ProductDetailMetricsSection data={props.data} />
      <ProductDetailUseCasesSection data={props.data} />
      <ProductDetailEcosystemSection data={props.data} />
      <ProductDetailFaqSection data={props.data} />
      <ProductDetailVideoSection data={props.data} />
      <ProductDetailRelatedSection data={props.data} products={props.relatedProducts} />
      <ProductDetailFinalCtaSection data={props.data} />
    </section>
  );
}

export default ThreeMashProductDetailTemplate;
