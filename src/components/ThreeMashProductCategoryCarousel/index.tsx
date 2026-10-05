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
import { tLocalized, localizedHref, translateText, isEnglishLocale, hasEnglishProductPage } from "../../utils/i18n";
import { sanitizeHtml } from "../../utils/sanitizeHtml";
import { debugError } from "../../utils/debugError";

function propString(value: unknown) {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (!value || typeof value !== "object") return "";
  const data = value as Record<string, unknown>;
  const candidates = [data.value, data.html, data.text, data.title, data.name, data.id, data.slug];
  for (const candidate of candidates) {
    if (typeof candidate === "string") return candidate;
  }
  return "";
}

function text(value: unknown, fallback = "") {
  const trimmed = propString(value).trim();
  return trimmed || fallback;
}

function localizedPropText(value: unknown, englishValue: unknown, fallback = "") {
  return isEnglishLocale() ? text(englishValue, fallback) : text(value, fallback);
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
  const categoryLabel = isEnglishLocale() ? translateText(category) : category;
  const price = variant ? getProductVariantFormattedFinalPrice(variant) : "";

  return (
    <a className="tmpcc-card" href={localizedHref(getProductHref(product))} target={target} rel={target ? "noopener noreferrer" : undefined}>
      <span className="tmpcc-media">
        {image ? <img src={image} alt={media?.image?.altText || product.name} loading="lazy" decoding="async" /> : <span>{product.name.slice(0, 1)}</span>}
      </span>
      {showCategoryName && categoryLabel ? <small>{categoryLabel}</small> : null}
      <strong>{isEnglishLocale() ? translateText(product.name) : product.name}</strong>
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
  const title = isEnglishLocale() ? translateText(product.name) : product.name;
  const desc = description ? (isEnglishLocale() ? translateText(description) : description) : "";
  return {
    id: product.id,
    title,
    href: localizedHref(getProductHref(product)),
    image,
    imageAlt: imageSource?.altText || title,
    category: product.categories?.[0]?.name || product.brand?.name || "",
    descriptionHtml: desc ? escapeHtml(desc) : "",
  };
}

export function ThreeMashProductCategoryCarousel(props: Props) {
  const rawSourceData = resolveSharedProductDetailData(props.product, props.productTemplateJson);

  const rawRelated = rawSourceData?.related;
  const rawFinalCta = rawSourceData?.finalCta;

  // Override related and finalCta fields from Studio props
  const sourceData = rawSourceData ? {
    ...rawSourceData,
    related: rawRelated ? {
      ...rawRelated,
      index: text(props.relatedIndex, rawRelated.index ?? "07"),
      label: localizedPropText(props.relatedLabel, props.relatedLabelEn, rawRelated.label ?? tLocalized("İLGİLİ ÜRÜNLER", "RELATED PRODUCTS")),
      titleHtml: localizedPropText(props.relatedTitleHtml, props.relatedTitleHtmlEn, rawRelated.titleHtml ?? ""),
    } : rawRelated,
    finalCta: rawFinalCta ? {
      ...rawFinalCta,
      titleHtml: localizedPropText(props.finalCtaTitleHtml, props.finalCtaTitleHtmlEn, rawFinalCta.titleHtml ?? ""),
      textHtml: localizedPropText(props.finalCtaTextHtml, props.finalCtaTextHtmlEn, rawFinalCta.textHtml ?? ""),
      primaryText: localizedPropText(props.primaryButtonText, props.primaryButtonTextEn, rawFinalCta.primaryText ?? ""),
      primaryHref: text(props.primaryButtonHref, rawFinalCta.primaryHref ?? ""),
      secondaryText: localizedPropText(props.secondaryButtonText, props.secondaryButtonTextEn, rawFinalCta.secondaryText ?? ""),
      secondaryHref: text(props.secondaryButtonHref, rawFinalCta.secondaryHref ?? ""),
    } : rawFinalCta,
  } : rawSourceData;

  const [resolvedProducts, setResolvedProducts] = useState<IkasProduct[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const requestKeyRef = useRef("");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const limit = numberValue(props.productLimit, 12, 1, 40);
  const mode = text(props.sourceMode, "auto").toLowerCase() === "manual" ? "manual" : "auto";
  const category = autoCategory(props.product);
  const productList = useMemo(
    () => (mode === "auto" ? makeCategoryProductList(props.product, limit) : normalizeProductList(props.productList, limit)),
    [mode, props.product?.id, props.productList, limit]
  );

  useEffect(() => {
    if (!productList) return;
    const requestKey = [
      mode,
      props.product?.id || "",
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
        const relatedProducts = mode === "auto" && props.product
          ? fetchedProducts.filter((item) => item.id !== props.product?.id)
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
  }, [productList, mode, props.product?.id, limit]);

  const products = (resolvedProducts || listProducts(productList))
    .filter((item) => props.showCurrentProduct !== false || item.id !== props.product?.id)
    .filter((item) => hasEnglishProductPage(getProductHref(item) || item));
  const scrollCards = numberValue(props.scrollByCards, 1, 1, 6);
  const sectionAnchorId = propString(props.sectionAnchorId);
  const defaultCategoryTitle = categoryName(category)
    ? tLocalized(`Diğer ${categoryName(category)} Ürünleri`, `Other ${categoryName(category)} Products`)
    : tLocalized("Diğer Ürünler", "Other Products");
  const fallbackTitle = localizedPropText(props.titleText, props.titleTextEn, defaultCategoryTitle);
  const fallbackDescription = localizedPropText(props.descriptionHtml, props.descriptionHtmlEn);
  const hasHeader =
    props.showHeader !== false &&
    (fallbackTitle.trim() !== "" || fallbackDescription.trim() !== "");

  function scroll(direction: -1 | 1) {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const card = scroller.querySelector<HTMLElement>(".tmpcc-card");
    const gap = numberValue(props.cardGap, 56, 0, 120);
    const distance = ((card?.offsetWidth || scroller.clientWidth / 4) + gap) * scrollCards;
    scroller.scrollBy({ left: direction * distance, behavior: "smooth" });
  }

  const style = {
    "--tmpcc-bg": text(props.backgroundColor, "#ffffff"),
    "--tmpcc-text": text(props.textColor, "#0E0E0C"),
    "--tmpcc-muted": text(props.mutedTextColor, "#55554e"),
    "--tmpcc-card-bg": text(props.cardBackgroundColor, "#ffffff"),
    "--tmpcc-arrow-bg": text(props.arrowBackgroundColor, "#ffffff"),
    "--tmpcc-arrow": text(props.arrowColor, "#0E0E0C"),
    "--tmpcc-max": cssLength(props.maxWidth, 1280, 480, 2560),
    "--tmpcc-pt": cssLength(props.paddingTop, 64, 0, 320),
    "--tmpcc-pb": cssLength(props.paddingBottom, 0, 0, 320),
    "--tmpcc-gap": cssLength(props.cardGap, 56, 0, 120),
    "--tmpcc-desktop": numberValue(props.visibleCardsDesktop, 4, 1, 6),
    "--tmpcc-tablet": numberValue(props.visibleCardsTablet, 3, 1, 4),
    "--tmpcc-mobile": numberValue(props.visibleCardsMobile, 1, 1, 2),
    "--tmpcc-image-h": cssLength(props.imageHeight, 250, 120, 520),
    "--tmpcc-image-fit": imageFit(props.imageFit),
    "--tmpcc-image-scale": numberValue(props.imageScale, 1, 0.2, 2),
    "--tmpcc-image-y": cssLength(props.imageYOffset, 0, -120, 120),
    "--tmpcc-title-lines": numberValue(props.titleMaxLines, 1, 1, 4),
    "--tmpcc-title-size": cssLength(props.titleFontSize, 26, 12, 72),
    "--tmpcc-card-title-size": cssLength(props.cardTitleFontSize, 13, 10, 24),
    "--tmpcc-price-size": cssLength(props.priceFontSize, 13, 10, 24),
  };

  const effectiveProducts = products.map(sourceRelatedProduct);

  if (sourceData) {
    return (
      <ProductDetailSectionScope
        data={sourceData}
        id={sectionAnchorId.trim() || undefined}
        colorOverrides={{
          backgroundColor: props.backgroundColor,
          textColor: props.textColor,
          accentColor: props.accentColor,
        }}
      >
        {props.showRelatedProducts !== false ? (
          <ProductDetailRelatedSection
            data={sourceData}
            products={effectiveProducts}
            showHeader={props.showHeader}
            showArrows={props.showArrows}
            scrollByCards={props.scrollByCards}
            openLinksInNewTab={props.openLinksInNewTab}
            previousProductsLabel={localizedPropText(props.previousProductsLabel, props.previousProductsLabelEn, tLocalized("Önceki ilgili ürünler", "Previous related products"))}
            nextProductsLabel={localizedPropText(props.nextProductsLabel, props.nextProductsLabelEn, tLocalized("Sonraki ilgili ürünler", "Next related products"))}
            categoryProductsAriaLabel={localizedPropText(props.categoryProductsAriaLabel, props.categoryProductsAriaLabelEn, tLocalized("İlgili ürünler", "Related products"))}
            productLinkText={localizedPropText(props.relatedProductLinkText, props.relatedProductLinkTextEn, tLocalized("İncele", "View"))}
          />
        ) : null}
        {props.showFinalCta !== false ? (
          <ProductDetailFinalCtaSection
            data={sourceData}
            backgroundColor={props.finalCtaBackground}
            textColor={props.finalCtaTextColor}
          />
        ) : null}
      </ProductDetailSectionScope>
    );
  }
  return (
    <section id={sectionAnchorId.trim() || undefined} className="three-mash-product-category-carousel" style={style as any}>
      <div className="tmpcc-wrap">
        {hasHeader ? (
          <div className="tmpcc-head">
            <div>
              {fallbackTitle.trim() !== "" && <h2>{fallbackTitle}</h2>}
              {fallbackDescription.trim() !== "" && (
                <div className="tmpcc-description" dangerouslySetInnerHTML={html(fallbackDescription)} />
              )}
            </div>
            {props.showArrows !== false && products.length > 1 ? (
              <div className="tmpcc-arrows">
                <button type="button" aria-label={localizedPropText(props.previousProductsLabel, props.previousProductsLabelEn, tLocalized("Önceki ürünler", "Previous products"))} onClick={() => scroll(-1)}>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
                </button>
                <button type="button" aria-label={localizedPropText(props.nextProductsLabel, props.nextProductsLabelEn, tLocalized("Sonraki ürünler", "Next products"))} onClick={() => scroll(1)}>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
                </button>
              </div>
            ) : null}
          </div>
        ) : null}

        {props.showRelatedProducts !== false ? (products.length ? (
          <div className="tmpcc-shell">
            {!hasHeader && props.showArrows !== false && products.length > 1 ? (
              <button type="button" className="tmpcc-side tmpcc-side-left" aria-label={localizedPropText(props.previousProductsLabel, props.previousProductsLabelEn, tLocalized("Önceki ürünler", "Previous products"))} onClick={() => scroll(-1)}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
              </button>
            ) : null}
            <div ref={scrollerRef} className="tmpcc-track" aria-label={localizedPropText(props.categoryProductsAriaLabel, props.categoryProductsAriaLabelEn, tLocalized("Kategori ürünleri", "Category products"))}>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  showCategoryName={props.showCategoryName === true}
                  showPrice={props.showPrice === true}
                  target={props.openLinksInNewTab ? "_blank" : undefined}
                />
              ))}
            </div>
            {!hasHeader && props.showArrows !== false && products.length > 1 ? (
              <button type="button" className="tmpcc-side tmpcc-side-right" aria-label={localizedPropText(props.nextProductsLabel, props.nextProductsLabelEn, tLocalized("Sonraki ürünler", "Next products"))} onClick={() => scroll(1)}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
              </button>
            ) : null}
          </div>
        ) : (
          <div className="tmpcc-setup">
            {isLoading
              ? localizedPropText(props.loadingProductsText, props.loadingProductsTextEn, tLocalized("Ürünler yükleniyor...", "Loading products..."))
              : localizedPropText(
                  props.setupMessage,
                  props.setupMessageEn,
                  tLocalized("İlgili ürünler kısa süre içinde burada listelenecek.", "Related products will be listed here shortly.")
                )}
          </div>
        )) : null}
      </div>
    </section>
  );
}

export default ThreeMashProductCategoryCarousel;
