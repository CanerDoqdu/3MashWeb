import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import {
  getDefaultSrc,
  getProductFirstCategory,
  getProductHref,
  getProductListInitialData,
  getProductVariantFormattedFinalPrice,
  getProductVariantMainImage,
  initProductList,
  type IkasProduct,
  type IkasProductList,
  type IkasProductVariant,
} from "@ikas/bp-storefront";
import { Props } from "./types";
import { resolveSharedProductDetailData } from "../../sub-components/ThreeMashProductDetailData";
import {
  ProductDetailFinalCtaSection,
  ProductDetailRelatedSection,
  ProductDetailSectionScope,
  type ProductDetailRelatedProduct,
} from "../../sub-components/ThreeMashProductDetailTemplate";
import { tLocalized } from "../../utils/i18n";
import { sanitizeHtml } from "../../utils/sanitizeHtml";
import { debugError } from "../../utils/debugError";

function propString(value: unknown) {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (!value || typeof value !== "object") return "";
  const data = value as Record<string, unknown>;
  const candidates = [data.id, data.value, data.slug, data.name, data.title, data.text, data.html];
  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) return candidate;
  }
  return "";
}

function text(value: unknown, fallback = "") {
  const trimmed = propString(value).trim();
  return trimmed || fallback;
}

function searchKey(value: unknown) {
  return propString(value)
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
    .replace(/\s+/g, " ")
    .trim();
}

function html(value: unknown) {
  return { __html: sanitizeHtml(propString(value)) };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function plainText(value: unknown) {
  return propString(value).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function truncateText(value: string, limit: number) {
  if (value.length <= limit) return value;
  const trimmed = value.slice(0, limit - 1).trimEnd();
  return `${trimmed.replace(/[,.!?;:]+$/, "")}…`;
}

function numberValue(value: number | undefined, fallback: number, min: number, max: number) {
  const next = Number(value);
  if (!Number.isFinite(next)) return fallback;
  return Math.min(max, Math.max(min, next));
}

function cssLength(value: number | undefined, fallback: number, min = 0, max = 2000) {
  return `${numberValue(value, fallback, min, max)}px`;
}

function imageFit(value: unknown) {
  const fit = text(value, "contain").toLowerCase();
  return ["contain", "cover", "fill", "scale-down"].includes(fit) ? fit : "contain";
}

function selectedVariant(product: IkasProduct): IkasProductVariant | null {
  try {
    const selectedIds = (product.selectedVariantValues || []).map((item) => item.id);
    const match = product.variants?.find((variant) => selectedIds.every((id) => variant.variantValues?.some((value) => value.id === id)));
    return match || product.variants?.[0] || null;
  } catch {
    return product.variants?.[0] || null;
  }
}

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

function normalizeProductList(source: unknown, limit: number): IkasProductList | undefined {
  if (!source) return undefined;
  const list = source as IkasProductList;
  if (Array.isArray(list.data) && list.productListPropValue) return list;

  const propValue = productListPropValue(source);
  if (!propValue) return undefined;

  return initProductList({
    type: propValue.productListType || "ALL",
    sort: propValue.initialSort || "DEFAULT",
    limit: propValue.initialLimit || propValue.productCount || limit,
    pageType: propValue.brand ? "BRAND" : propValue.category ? "CATEGORY" : "CUSTOM",
    filterBrandId: propValue.brand || undefined,
    filterCategoryId: propValue.category || undefined,
    productListPropValue: {
      ...propValue,
      productIds: propValue.productIds || [],
    },
  });
}

function categoryId(category: unknown) {
  if (!category || typeof category !== "object") return "";
  const data = category as Record<string, unknown>;
  return text(data.id || data.categoryId || data.value);
}

function categoryName(category: unknown) {
  if (!category || typeof category !== "object") return "";
  const data = category as Record<string, unknown>;
  return text(data.name || data.title);
}

function autoCategory(product?: IkasProduct | null) {
  if (!product) return null;
  try {
    return getProductFirstCategory(product) || product.categories?.[0] || null;
  } catch {
    return product.categories?.[0] || null;
  }
}

function listProducts(productList: IkasProductList | undefined) {
  if (!productList) return [];
  const list = productList as IkasProductList & { products?: unknown[]; items?: unknown[] };
  const raw = [
    ...(Array.isArray(list.data) ? list.data : []),
    ...(Array.isArray(list.products) ? list.products : []),
    ...(Array.isArray(list.items) ? list.items : []),
  ];
  const seen = new Set<string>();
  return raw
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const source = item as { name?: unknown; product?: unknown; value?: unknown };
      if (typeof source.name === "string") return source as IkasProduct;
      if (source.product && typeof source.product === "object" && typeof (source.product as { name?: unknown }).name === "string") {
        return source.product as IkasProduct;
      }
      if (source.value && typeof source.value === "object" && typeof (source.value as { name?: unknown }).name === "string") {
        return source.value as IkasProduct;
      }
      return null;
    })
    .filter((product): product is IkasProduct => {
      if (!product || !product.id || seen.has(product.id)) return false;
      seen.add(product.id);
      return true;
    });
}

function makeCategoryProductList(product: IkasProduct | null | undefined, limit: number) {
  const category = autoCategory(product);
  const id = categoryId(category);
  if (!id) return undefined;
  return initProductList({
    type: "CATEGORY",
    sort: "DEFAULT",
    limit,
    pageType: "CATEGORY",
    filterCategoryId: id,
    productListPropValue: {
      id: `auto-category-${id}`,
      productListType: "CATEGORY",
      initialSort: "DEFAULT",
      initialLimit: limit,
      productCount: null,
      productIds: [],
      usePageFilter: false,
      category: id,
      brand: null,
      relatedProductsType: null,
    },
  });
}

function makeAllProductList(limit: number) {
  return initProductList({
    type: "ALL",
    sort: "DEFAULT",
    limit: Math.max(limit, 40),
    pageType: "CUSTOM",
    productListPropValue: {
      id: "product-category-carousel-all-products",
      productListType: "ALL",
      initialSort: "DEFAULT",
      initialLimit: Math.max(limit, 40),
      productCount: null,
      productIds: [],
      usePageFilter: false,
      category: null,
      brand: null,
      relatedProductsType: null,
    },
  });
}

function productsShareCategory(product: IkasProduct, currentProduct: IkasProduct) {
  const currentCategory = autoCategory(currentProduct);
  const candidateCategory = autoCategory(product);
  const currentId = categoryId(currentCategory);
  const candidateId = categoryId(candidateCategory);
  if (currentId && candidateId) return currentId === candidateId;

  const currentName = searchKey(categoryName(currentCategory));
  const candidateName = searchKey(categoryName(candidateCategory));
  if (currentName && candidateName) return currentName === candidateName;

  const categoryFamily = (item: IkasProduct) => {
    const identity = searchKey(`${item.name} ${getProductHref(item) || ""}`);
    if (["recine", "resin", "composite", "gingiva", "denture", "splint", "aligner", "guide", "model", "tray", "flexit", "trial", "study", "clear", "crs"].some((term) => identity.includes(term))) return "resin";
    if ([tLocalized("yikama", "yikama"), tLocalized("kurleme", "kurleme"), "wash", "cure", "w1e", "c1e", "uw02", "uw03"].some((term) => identity.includes(term))) return "wash-cure";
    if (["yazici", "printer", "p16l", "p1d", "curie", "halot"].some((term) => identity.includes(term))) return "printer";
    if (["tarayici", "scanner", "3shape", "e2", "e3", "e4"].some((term) => identity.includes(term))) return "scanner";
    if (["zirkon", "zircon", "argenz"].some((term) => identity.includes(term))) return "zircon";
    if (["firin", "furnace", "oven", "naberthem"].some((term) => identity.includes(term))) return "furnace";
    return "other";
  };

  return categoryFamily(product) === categoryFamily(currentProduct) && categoryFamily(currentProduct) !== "other";
}

function ProductCard({ product, showCategoryName, showPrice, target }: { product: IkasProduct; showCategoryName: boolean; showPrice: boolean; target?: string }) {
  const variant = selectedVariant(product);
  const media = variant ? getProductVariantMainImage(variant) : undefined;
  const image = media?.image ? getDefaultSrc(media.image) : "";
  const category = product.categories?.[0]?.name || product.brand?.name || "";
  const price = variant ? getProductVariantFormattedFinalPrice(variant) : "";

  return (
    <a className="tmpcc-card" href={getProductHref(product)} target={target} rel={target ? "noopener noreferrer" : undefined}>
      <span className="tmpcc-media">
        {image ? <img src={image} alt={media?.image?.altText || product.name} loading="lazy" decoding="async" /> : <span>{product.name.slice(0, 1)}</span>}
      </span>
      {showCategoryName && category ? <small>{category}</small> : null}
      <strong>{product.name}</strong>
      {showPrice && price ? <em>{price}</em> : null}
    </a>
  );
}

function sourceRelatedProduct(product: IkasProduct): ProductDetailRelatedProduct {
  const variant = selectedVariant(product);
  const media = variant ? getProductVariantMainImage(variant) : undefined;
  const fallbackImage = variant?.images?.find((item) => !item.isVideo)?.image;
  const imageSource = media?.image || fallbackImage;
  const image = imageSource ? getDefaultSrc(imageSource) : "";
  const description = truncateText(plainText((product as { shortDescription?: unknown; description?: unknown }).shortDescription || (product as { description?: unknown }).description), 118);
  return {
    id: product.id,
    title: product.name,
    href: getProductHref(product),
    image,
    imageAlt: imageSource?.altText || product.name,
    category: product.categories?.[0]?.name || product.brand?.name || "",
    descriptionHtml: description ? escapeHtml(description) : "",
  };
}

export function ThreeMashProductCategoryCarousel(props: Props) {
  // NOTE: Props interface auto-generated and may be incomplete for runtime-injected properties.
  // Using "as any" allows access to properties that exist at runtime but not in types.ts.
  // This is a known limitation of the ikas CLI auto-generation process.
  const p = props as any;
  const rawSourceData = resolveSharedProductDetailData(props.product, p.productTemplateJson);

  // Override related and finalCta fields from Studio props
  const sourceData = rawSourceData ? {
    ...rawSourceData,
    related: rawSourceData.related ? {
      ...rawSourceData.related,
      index: text(p.relatedIndex) || rawSourceData.related.index || "07",
      label: text(p.relatedLabel) || rawSourceData.related.label || tLocalized("İLGİLİ ÜRÜNLER", "RELATED PRODUCTS"),
      titleHtml: text(p.relatedTitleHtml) || rawSourceData.related.titleHtml || "",
    } : rawSourceData.related,
    finalCta: rawSourceData.finalCta ? {
      ...rawSourceData.finalCta,
      titleHtml: text(p.finalCtaTitleHtml) || rawSourceData.finalCta.titleHtml || "",
      textHtml: text(p.finalCtaTextHtml) || rawSourceData.finalCta.textHtml || "",
      primaryText: text(p.primaryButtonText) || rawSourceData.finalCta.primaryText || "",
      primaryHref: text(p.primaryButtonHref) || rawSourceData.finalCta.primaryHref || "",
      secondaryText: text(p.secondaryButtonText) || rawSourceData.finalCta.secondaryText || "",
      secondaryHref: text(p.secondaryButtonHref) || rawSourceData.finalCta.secondaryHref || "",
    } : rawSourceData.finalCta,
  } : rawSourceData;

  const [resolvedProducts, setResolvedProducts] = useState<IkasProduct[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const requestKeyRef = useRef("");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const limit = numberValue((p as any).productLimit, 12, 1, 40);
  const mode = text((p as any).sourceMode, "auto").toLowerCase() === "manual" ? "manual" : "auto";
  const category = autoCategory(p.product);
  const productList = useMemo(
    () => (mode === "auto" ? makeCategoryProductList(p.product, limit) : normalizeProductList((p as any).productList, limit)),
    [mode, p.product?.id, (p as any).productList, limit]
  );

  useEffect(() => {
    if (!productList) return;
    const requestKey = [
      mode,
      p.product?.id || "",
      productList.productListPropValue?.category || productList.filterCategoryId || "",
      productList.productListPropValue?.brand || productList.filterBrandId || "",
      productList.productListPropValue?.productIds?.length || "",
      productList.limit || limit,
    ].join("|");
    if (requestKeyRef.current === requestKey && resolvedProducts) return;
    requestKeyRef.current = requestKey;
    let isMounted = true;
    setIsLoading(true);
    getProductListInitialData(productList)
      .then(() => {
        if (!isMounted) return;
        const fetchedProducts = listProducts(productList);
        const relatedProducts = mode === "auto" && p.product
          ? fetchedProducts.filter((item) => item.id !== p.product.id)
          : fetchedProducts;
        setResolvedProducts(relatedProducts.slice(0, limit));
      })
      .catch((error) => {
        debugError("ThreeMashProductCategoryCarousel product fetch failed", error);
        if (isMounted) setResolvedProducts([]);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [productList, mode, p.product?.id, limit]);

  const products = (resolvedProducts || listProducts(productList)).filter((item) => (p as any).showCurrentProduct !== false || item.id !== p.product?.id);
  const scrollCards = numberValue((p as any).scrollByCards, 1, 1, 6);
  const hasHeader = (p as any).showHeader !== false && (text((p as any).titleText) || text((p as any).descriptionHtml));

  function scroll(direction: -1 | 1) {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const card = scroller.querySelector<HTMLElement>(".tmpcc-card");
    const gap = numberValue((p as any).cardGap, 56, 0, 120);
    const distance = ((card?.offsetWidth || scroller.clientWidth / 4) + gap) * scrollCards;
    scroller.scrollBy({ left: direction * distance, behavior: "smooth" });
  }

  const style = {
    "--tmpcc-bg": text((p as any).backgroundColor, "#ffffff"),
    "--tmpcc-ink": text((p as any).textColor, "#0E0E0C"),
    "--tmpcc-sub": text((p as any).mutedTextColor, "#55554e"),
    "--tmpcc-card-bg": text((p as any).cardBackgroundColor, "#ffffff"),
    "--tmpcc-arrow-bg": text((p as any).arrowBackgroundColor, "#ffffff"),
    "--tmpcc-arrow-ink": text((p as any).arrowColor, "#0E0E0C"),
    "--tmpcc-mw": cssLength((p as any).maxWidth, 1280, 480, 2560),
    "--tmpcc-pt": cssLength((p as any).paddingTop, 64, 0, 320),
    "--tmpcc-pb": cssLength((p as any).paddingBottom, 0, 0, 320),
    "--tmpcc-gap": cssLength((p as any).cardGap, 56, 0, 120),
    "--tmpcc-desktop": numberValue((p as any).visibleCardsDesktop, 4, 1, 6),
    "--tmpcc-tablet": numberValue((p as any).visibleCardsTablet, 3, 1, 4),
    "--tmpcc-mobile": numberValue((p as any).visibleCardsMobile, 1, 1, 2),
    "--tmpcc-image-h": cssLength((p as any).imageHeight, 250, 120, 520),
    "--tmpcc-image-fit": imageFit((p as any).imageFit),
    "--tmpcc-image-scale": numberValue((p as any).imageScale, 1, 0.2, 2),
    "--tmpcc-image-y": cssLength((p as any).imageYOffset, 0, -120, 120),
    "--tmpcc-title-lines": numberValue((p as any).titleMaxLines, 1, 1, 4),
    "--tmpcc-title-size": cssLength((p as any).titleFontSize, 26, 12, 72),
    "--tmpcc-card-title-size": cssLength((p as any).cardTitleFontSize, 13, 10, 24),
    "--tmpcc-price-size": cssLength((p as any).priceFontSize, 13, 10, 24),
  } as any;

  const effectiveProducts = products.map(sourceRelatedProduct);
  /*
    {
      id: "p-rel-1",
      title: "1. Örnek İlgili Ürün",
      href: "#",
      image: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/deb67f5e-a02a-4fa6-9cb8-595a277d69fd/1080/composite-apps-10.webp",
      imageAlt: "1. Örnek İlgili Ürün",
      category: "1. KATEGORİ",
      descriptionHtml: "1. İlgili ürünün kısa tanıtım açıklaması metni buraya gelecek.",
    },
    {
      id: "p-rel-2",
      title: "2. Örnek İlgili Ürün",
      href: "#",
      image: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/9d7bb34c-1f0d-4b36-8f0e-ce9a41863d55/1080/composite-apps-11.webp",
      imageAlt: "2. Örnek İlgili Ürün",
      category: "2. KATEGORİ",
      descriptionHtml: "2. İlgili ürünün kısa tanıtım açıklaması metni buraya gelecek.",
    },
    {
      id: "p-rel-3",
      title: "3. Örnek İlgili Ürün",
      href: "#",
      image: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1cd726f4-d0ec-4f4b-9407-ca7a84da9961/1080/composite-apps-12.webp",
      imageAlt: "3. Örnek İlgili Ürün",
      category: "3. KATEGORİ",
      descriptionHtml: "3. İlgili ürünün kısa tanıtım açıklaması metni buraya gelecek.",
    },
    {
      id: "p-rel-4",
      title: "4. Örnek İlgili Ürün",
      href: "#",
      image: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/d875a523-2228-44a7-818d-022312b0a44d/1080/composite-resin-ce.webp",
      imageAlt: "4. Örnek İlgili Ürün",
      category: "4. KATEGORİ",
      descriptionHtml: "4. İlgili ürünün kısa tanıtım açıklaması metni buraya gelecek.",
    },
  ]; */

  if (sourceData) {
    return (
      <ProductDetailSectionScope data={sourceData}>
        <ProductDetailRelatedSection
          data={sourceData}
          products={effectiveProducts}
        />
        <ProductDetailFinalCtaSection data={sourceData} />
      </ProductDetailSectionScope>
    );
  }
  return (
    <section id={text((p as any).sectionAnchorId) || undefined} className="three-mash-product-category-carousel" style={style}>
      <div className="tmpcc-wrap">
        {hasHeader ? (
          <div className="tmpcc-head">
            <div>
              <h2>{text((p as any).titleText, categoryName(category) ? `Diğer ${categoryName(category)} Ürünleri` : tLocalized("Diğer Ürünler", "Other Products"))}</h2>
              {text((p as any).descriptionHtml) ? <div className="tmpcc-description" dangerouslySetInnerHTML={html((p as any).descriptionHtml)} /> : null}
            </div>
            {(p as any).showArrows !== false && products.length > 1 ? (
              <div className="tmpcc-arrows">
                <button type="button" aria-label={tLocalized("Önceki ürünler", "Previous products")} onClick={() => scroll(-1)}>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
                </button>
                <button type="button" aria-label={tLocalized("Sonraki ürünler", "Next products")} onClick={() => scroll(1)}>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
                </button>
              </div>
            ) : null}
          </div>
        ) : null}

        {products.length ? (
          <div className="tmpcc-shell">
            {!hasHeader && (p as any).showArrows !== false && products.length > 1 ? (
              <button type="button" className="tmpcc-side tmpcc-side-left" aria-label={tLocalized("Önceki ürünler", "Previous products")} onClick={() => scroll(-1)}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
              </button>
            ) : null}
            <div ref={scrollerRef} className="tmpcc-track" aria-label={tLocalized("Kategori ürünleri", "Category products")}>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  showCategoryName={(p as any).showCategoryName === true}
                  showPrice={(p as any).showPrice === true}
                  target={(p as any).openLinksInNewTab ? "_blank" : undefined}
                />
              ))}
            </div>
            {!hasHeader && (p as any).showArrows !== false && products.length > 1 ? (
              <button type="button" className="tmpcc-side tmpcc-side-right" aria-label={tLocalized("Sonraki ürünler", "Next products")} onClick={() => scroll(1)}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
              </button>
            ) : null}
          </div>
        ) : (
          <div className="tmpcc-setup">
            {isLoading
              ? tLocalized("Ürünler yükleniyor...", "Loading products...")
              : (p as any).setupMessage || tLocalized("İlgili ürünler kısa süre içinde burada listelenecek.", "Related products will be listed here shortly.")}
          </div>
        )}
      </div>
    </section>
  );
}

export default ThreeMashProductCategoryCarousel;
