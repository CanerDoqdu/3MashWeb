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
import { resolveProductDetailData } from "../../sub-components/ThreeMashProductDetailData";
import {
  ProductDetailFinalCtaSection,
  ProductDetailRelatedSection,
  ProductDetailSectionScope,
  type ProductDetailRelatedProduct,
} from "../../sub-components/ThreeMashProductDetailTemplate";

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

function html(value: unknown) {
  return { __html: propString(value) };
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

function normalizeProductList(source: Props["productList"] | undefined, limit: number): IkasProductList | undefined {
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
  const image = media?.image ? getDefaultSrc(media.image) : "";
  const description = truncateText(plainText((product as { shortDescription?: unknown; description?: unknown }).shortDescription || (product as { description?: unknown }).description), 118);
  return {
    id: product.id,
    title: product.name,
    href: getProductHref(product),
    image,
    imageAlt: media?.image?.altText || product.name,
    category: product.categories?.[0]?.name || product.brand?.name || "",
    descriptionHtml: description ? escapeHtml(description) : "",
  };
}

export function ThreeMashProductCategoryCarousel(props: Props) {
  const sourceData = resolveProductDetailData(props.product, (props as Record<string, unknown>).productTemplateJson);

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
        setResolvedProducts(listProducts(productList).slice(0, limit));
      })
      .catch((error) => {
        console.error("ThreeMashProductCategoryCarousel product fetch failed", error);
        if (isMounted) setResolvedProducts([]);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [productList, mode, props.product?.id, limit]);

  const products = (resolvedProducts || listProducts(productList)).filter((item) => props.showCurrentProduct !== false || item.id !== props.product?.id);
  const scrollCards = numberValue(props.scrollByCards, 1, 1, 6);
  const hasHeader = props.showHeader !== false && (text(props.titleText) || text(props.descriptionHtml));

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
    "--tmpcc-text": text(props.textColor, "#111111"),
    "--tmpcc-muted": text(props.mutedTextColor, "#5f5f5f"),
    "--tmpcc-card-bg": text(props.cardBackgroundColor, "transparent"),
    "--tmpcc-arrow-bg": text(props.arrowBackgroundColor, "#f4f4f4"),
    "--tmpcc-arrow": text(props.arrowColor, "#111111"),
    "--tmpcc-max": cssLength(props.maxWidth, 1240, 320, 1800),
    "--tmpcc-pt": cssLength(props.paddingTop, 72, 0, 220),
    "--tmpcc-pb": cssLength(props.paddingBottom, 72, 0, 220),
    "--tmpcc-gap": cssLength(props.cardGap, 56, 8, 160),
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
  } as any;

  if (sourceData) {
    return (
      <ProductDetailSectionScope data={sourceData}>
        <ProductDetailRelatedSection data={sourceData} products={products.map(sourceRelatedProduct)} />
        <ProductDetailFinalCtaSection data={sourceData} />
      </ProductDetailSectionScope>
    );
  }

  return (
    <section id={text(props.sectionAnchorId) || undefined} className="three-mash-product-category-carousel" style={style}>
      <div className="tmpcc-wrap">
        {hasHeader ? (
          <div className="tmpcc-head">
            <div>
              <h2>{text(props.titleText, categoryName(category) ? `Diğer ${categoryName(category)} Ürünleri` : "Diğer Ürünler")}</h2>
              {text(props.descriptionHtml) ? <div className="tmpcc-description" dangerouslySetInnerHTML={html(props.descriptionHtml)} /> : null}
            </div>
            {props.showArrows !== false && products.length > 1 ? (
              <div className="tmpcc-arrows">
                <button type="button" aria-label="Önceki ürünler" onClick={() => scroll(-1)}>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
                </button>
                <button type="button" aria-label="Sonraki ürünler" onClick={() => scroll(1)}>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
                </button>
              </div>
            ) : null}
          </div>
        ) : null}

        {products.length ? (
          <div className="tmpcc-shell">
            {!hasHeader && props.showArrows !== false && products.length > 1 ? (
              <button type="button" className="tmpcc-side tmpcc-side-left" aria-label="Önceki ürünler" onClick={() => scroll(-1)}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
              </button>
            ) : null}
            <div ref={scrollerRef} className="tmpcc-track" aria-label="Kategori ürünleri">
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
              <button type="button" className="tmpcc-side tmpcc-side-right" aria-label="Sonraki ürünler" onClick={() => scroll(1)}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
              </button>
            ) : null}
          </div>
        ) : (
          <div className="tmpcc-setup">
            {isLoading
              ? "Ürünler yükleniyor..."
              : props.setupMessage || "Otomatik mod için Product alanını sayfa ürününe bağlayın veya manuel modda Product List alanından kategori/ürün seçin."}
          </div>
        )}
      </div>
    </section>
  );
}

export default ThreeMashProductCategoryCarousel;
