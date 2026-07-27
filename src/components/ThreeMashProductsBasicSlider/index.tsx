import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import {
  apiSearchProducts,
  getDefaultSrc,
  getProductHref,
  getProductListInitialData,
  getProductVariantFormattedFinalPrice,
  getProductVariantFormattedSellPrice,
  getProductVariantMainImage,
  hasProductVariantDiscount,
  initProductList,
  type IkasProduct,
  type IkasProductList,
  type IkasProductVariant,
} from "@ikas/bp-storefront";
import { Props } from "./types";

type SelectedProductRef = {
  productId: string;
  variantId: string;
};

type ManualSliderCard = {
  image: string;
  imageAlt: string;
  tag: string;
  title: string;
  descriptionHtml: string;
  specs: Array<[string, string]>;
  ctaText: string;
  ctaHref: string;
};

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

function text(value: unknown, fallback = "") {
  const trimmed = propString(value).trim();
  return trimmed || fallback;
}

function html(value: unknown) {
  return { __html: propString(value) };
}

function selectedProductRef(source: unknown): SelectedProductRef | null {
  if (typeof source === "string") return { productId: source, variantId: "" };
  if (!source || typeof source !== "object") return null;
  const item = source as {
    productId?: unknown;
    variantId?: unknown;
    id?: unknown;
    product?: { id?: unknown };
    variant?: { id?: unknown };
    value?: {
      productId?: unknown;
      variantId?: unknown;
      id?: unknown;
      product?: { id?: unknown };
      variant?: { id?: unknown };
    };
  };
  const productId = item.productId || item.product?.id || item.value?.productId || item.value?.product?.id || item.value?.id || item.id;
  if (typeof productId !== "string" || !productId) return null;
  const variantId = item.variantId || item.variant?.id || item.value?.variantId || item.value?.variant?.id || "";
  return {
    productId,
    variantId: typeof variantId === "string" ? variantId : "",
  };
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

function normalizeProductList(source: Props["productList"] | undefined): IkasProductList | undefined {
  if (!source) return undefined;
  const list = source as IkasProductList;
  if (Array.isArray(list.data) && list.productListPropValue) return list;

  const propValue = productListPropValue(source);
  if (!propValue) return undefined;

  return initProductList({
    type: propValue.productListType || "ALL",
    sort: propValue.initialSort || "DEFAULT",
    limit: propValue.initialLimit || propValue.productCount || 6,
    pageType: propValue.brand ? "BRAND" : propValue.category ? "CATEGORY" : "CUSTOM",
    filterBrandId: propValue.brand || undefined,
    filterCategoryId: propValue.category || undefined,
    productListPropValue: {
      ...propValue,
      productIds: propValue.productIds || [],
    },
  });
}

function selectedProductRefs(productList: IkasProductList | undefined) {
  return (productList?.productListPropValue?.productIds || []).map(selectedProductRef).filter((item): item is SelectedProductRef => Boolean(item));
}

function needsProductListRefresh(productList: IkasProductList | undefined) {
  if (!productList || productList.isLoading) return false;
  if (!productList.data || productList.data.length === 0) return true;

  const selectedRefs = selectedProductRefs(productList);
  const selectedIds = selectedRefs.map((item) => item.productId);
  const dataIds = (productList.data || []).map((product) => product?.id).filter(Boolean);
  const uniqueDataIds = new Set(dataIds);

  if (selectedIds.length <= 1) return dataIds.length > 1 && uniqueDataIds.size === 1;

  return uniqueDataIds.size < Math.min(new Set(selectedIds).size, 6);
}

function orderedProducts(products: IkasProduct[], selectedRefs: SelectedProductRef[]) {
  const productsById = new Map(products.map((product) => [product.id, product]));
  return selectedRefs
    .map((ref) => {
      const product = productsById.get(ref.productId);
      if (!product) return null;
      const variant = ref.variantId ? product.variants?.find((item) => item.id === ref.variantId) : null;
      if (variant) product.selectedVariantValues = variant.variantValues;
      return product;
    })
    .filter((product): product is IkasProduct => Boolean(product));
}

async function fetchRecentStoreProducts(productList: IkasProductList) {
  const liveAllProducts = initProductList({
    type: "ALL",
    sort: productList.sort || "DEFAULT",
    limit: Math.max(productList.limit || 6, 20),
    pageType: "CUSTOM",
    excludedFields: productList.excludedFields || undefined,
    productListPropValue: {
      id: "",
      productListType: "ALL",
      initialSort: productList.sort || "DEFAULT",
      initialLimit: Math.max(productList.limit || 6, 20),
      productCount: null,
      productIds: [],
      usePageFilter: false,
      category: null,
      brand: null,
      relatedProductsType: null,
    },
  });

  await getProductListInitialData(liveAllProducts);
  return (liveAllProducts.data || []).slice(0, 6);
}

function selectedProductId(source: unknown) {
  const ref = selectedProductRef(source);
  return ref?.productId || "";
}

function uniqueProducts(products: IkasProduct[]) {
  const seen = new Set<string>();
  return products.filter((product) => {
    if (!product.id || seen.has(product.id)) return false;
    seen.add(product.id);
    return true;
  });
}

function sliderProducts(productList: IkasProductList | undefined) {
  if (!productList) return [];
  const list = productList as IkasProductList & { products?: unknown[]; items?: unknown[] };
  const rawProducts: unknown[] = [
    ...(Array.isArray(list.data) ? list.data : []),
    ...(Array.isArray(list.products) ? list.products : []),
    ...(Array.isArray(list.items) ? list.items : []),
  ];

  const products = rawProducts
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
    .filter((product): product is IkasProduct => Boolean(product));

  const uniqueLiveProducts = uniqueProducts(products);
  const selectedIds = (productList.productListPropValue?.productIds || []).map(selectedProductId).filter(Boolean);
  if (!selectedIds.length) return uniqueLiveProducts.slice(0, 6);

  const productsById = new Map(uniqueLiveProducts.map((product) => [product.id, product]));
  const ordered = selectedIds.map((id) => productsById.get(id)).filter((product): product is IkasProduct => Boolean(product));
  return (ordered.length > 0 ? ordered : uniqueLiveProducts).slice(0, 6);
}

function selectedVariant(product: IkasProduct): IkasProductVariant | null {
  try {
    const selectedValues = product.selectedVariantValues || [];
    const selectedIds = selectedValues.map((item) => item.id);
    const match = product.variants?.find((variant) => selectedIds.every((id) => variant.variantValues?.some((value) => value.id === id)));
    return match || product.variants?.[0] || null;
  } catch {
    return product.variants?.[0] || null;
  }
}

function plainText(value: unknown) {
  return String(value || "")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function truncateText(value: string, maxLength: number) {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, Math.max(0, maxLength - 3)).trim()}...`;
}

function numberValue(value: number | undefined, fallback: number, min: number, max: number) {
  const next = Number(value);
  if (!Number.isFinite(next)) return fallback;
  return Math.min(max, Math.max(min, next));
}

function percent(value: number | undefined, fallback: number, min = 0, max = 220) {
  return `${numberValue(value, fallback, min, max)}%`;
}

function imageFit(value: unknown) {
  const normalized = typeof value === "string" ? value.trim().toLowerCase() : "";
  return ["contain", "cover", "fill", "scale-down"].includes(normalized) ? normalized : "contain";
}

function sourceMode(value: unknown) {
  const normalized = text(value, "products").toLowerCase();
  return normalized === "manual" || normalized === "manuel" || normalized === "custom" ? "manual" : "products";
}

function themeToken(value: string | undefined, fallback: string, token: string) {
  const trimmed = value?.trim();
  if (trimmed && trimmed.toLowerCase() !== fallback.toLowerCase()) return trimmed;
  return `var(${token}, ${fallback})`;
}

function manualCard(props: Props, index: number): ManualSliderCard | null {
  const data = props as Record<string, unknown>;
  if (data[`manualCard${index}Enabled`] === false) return null;

  const image = text(data[`manualCard${index}ImageUrl`]);
  const title = text(data[`manualCard${index}Title`]);
  const descriptionHtml = text(data[`manualCard${index}DescriptionHtml`]);
  const tag = text(data[`manualCard${index}Tag`]);
  if (!image && !title && !descriptionHtml && !tag) return null;

  const specs: Array<[string, string]> = [];
  const spec1Label = text(data[`manualCard${index}Spec1Label`]);
  const spec1Value = text(data[`manualCard${index}Spec1Value`]);
  const spec2Label = text(data[`manualCard${index}Spec2Label`]);
  const spec2Value = text(data[`manualCard${index}Spec2Value`]);
  if (spec1Label || spec1Value) specs.push([spec1Label, spec1Value]);
  if (spec2Label || spec2Value) specs.push([spec2Label, spec2Value]);

  return {
    image,
    imageAlt: text(data[`manualCard${index}ImageAlt`], title || tag),
    tag,
    title,
    descriptionHtml,
    specs,
    ctaText: text(data[`manualCard${index}CtaText`], props.ctaText || "İncele"),
    ctaHref: text(data[`manualCard${index}CtaHref`]),
  };
}

function manualCards(props: Props) {
  const count = numberValue(props.manualCardCount, 4, 1, 8);
  return Array.from({ length: count }, (_, index) => manualCard(props, index + 1)).filter((item): item is ManualSliderCard => Boolean(item));
}

function productCard(product: IkasProduct, props: Props, cloneIndex?: number) {
  const variant = selectedVariant(product);
  const media = variant ? getProductVariantMainImage(variant) : undefined;
  const image = media?.image ? getDefaultSrc(media.image) : "";
  const categoryName = product.categories?.[0]?.name || product.brand?.name || "";
  const rawDescription = (product as { shortDescription?: unknown; description?: unknown }).shortDescription || product.description;
  const description = truncateText(plainText(rawDescription), numberValue(props.descriptionMaxLength, 170, 40, 320));
  const finalPrice = variant ? getProductVariantFormattedFinalPrice(variant) : "";
  const sellPrice = variant && hasProductVariantDiscount(variant) ? getProductVariantFormattedSellPrice(variant) : "";
  const specs: Array<[string, string]> = [];
  if (finalPrice) specs.push(["Fiyat", finalPrice]);
  if (sellPrice) specs.push(["Liste", sellPrice]);
  if (specs.length < 2 && categoryName) specs.push([product.brand?.name ? "Marka" : "Kategori", categoryName]);
  const key = `${product.id}${cloneIndex !== undefined ? `-clone-${cloneIndex}` : ""}`;

  return (
    <article className="tmr-product tmr-live-product" key={key} aria-hidden={cloneIndex !== undefined ? "true" : undefined}>
      <a className="tmr-live-product-link" href={getProductHref(product)}>
        <div className="tmr-product-media">
          {props.showCategoryTag !== false && categoryName ? <span className="tmr-tag">{categoryName}</span> : null}
          {image ? <img className="tmr-product-img" src={image} alt={media?.image?.altText || product.name} loading="lazy" decoding="async" /> : <span className="tmr-product-fallback">{product.name.slice(0, 1)}</span>}
        </div>
        <div className="tmr-product-body">
          <h3>{product.name}</h3>
          {props.showDescription !== false && description ? <p>{description}</p> : null}
          {props.showSpecs !== false && specs.length ? (
            <div className="tmr-spec">
              {specs.map(([label, value]) => (
                <div key={label}>
                  <span>{label}</span>
                  <b>{value}</b>
                </div>
              ))}
            </div>
          ) : null}
          {props.showCta !== false ? <span className="tmr-go">{props.ctaText || "İncele"} <span>→</span></span> : null}
        </div>
      </a>
    </article>
  );
}

function manualProductCard(card: ManualSliderCard, props: Props, index: number, cloneIndex?: number) {
  const key = `manual-${index}${cloneIndex !== undefined ? `-clone-${cloneIndex}` : ""}`;
  const content = (
    <>
      <div className="tmr-product-media">
        {props.showCategoryTag !== false && card.tag ? <span className="tmr-tag">{card.tag}</span> : null}
        {card.image ? <img className="tmr-product-img" src={card.image} alt={card.imageAlt} loading="lazy" decoding="async" /> : <span className="tmr-product-fallback">{card.title.slice(0, 1) || "?"}</span>}
      </div>
      <div className="tmr-product-body">
        {card.title ? <h3>{card.title}</h3> : null}
        {props.showDescription !== false && card.descriptionHtml ? <p dangerouslySetInnerHTML={html(card.descriptionHtml)} /> : null}
        {props.showSpecs !== false && card.specs.length ? (
          <div className="tmr-spec">
            {card.specs.map(([label, value], specIndex) => (
              <div key={specIndex}>
                <span>{label}</span>
                <b>{value}</b>
              </div>
            ))}
          </div>
        ) : null}
        {props.showCta !== false && card.ctaText ? <span className="tmr-go">{card.ctaText} <span>→</span></span> : null}
      </div>
    </>
  );

  return (
    <article className="tmr-product tmr-live-product" key={key} aria-hidden={cloneIndex !== undefined ? "true" : undefined}>
      {card.ctaHref ? (
        <a className="tmr-live-product-link" href={card.ctaHref}>
          {content}
        </a>
      ) : (
        <div className="tmr-live-product-link">{content}</div>
      )}
    </article>
  );
}

export function ThreeMashProductsBasicSlider(props: Props) {
  const [resolvedProducts, setResolvedProducts] = useState<IkasProduct[] | null>(null);
  const refreshRequestKeyRef = useRef("");
  const sliderRef = useRef<HTMLDivElement>(null);
  const normalizedProductList = normalizeProductList(props.productList);
  const productList = resolvedProducts && normalizedProductList ? { ...normalizedProductList, data: resolvedProducts } : normalizedProductList;
  const mode = sourceMode(props.sliderSource);
  const products = useMemo(() => (mode === "products" ? sliderProducts(productList) : []), [mode, productList]);
  const customCards = useMemo(() => (mode === "manual" ? manualCards(props) : []), [mode, props]);
  const itemCount = mode === "manual" ? customCards.length : products.length;

  useEffect(() => {
    if (sourceMode(props.sliderSource) === "manual") return;
    const productList = normalizeProductList(props.productList);
    if (!needsProductListRefresh(productList)) return;
    if (!productList) return;

    const selectedRefs = selectedProductRefs(productList);
    const requestKey =
      selectedRefs.map((item) => `${item.productId}:${item.variantId}`).join("|") ||
      [
        productList.type,
        productList.sort,
        productList.limit,
        productList.productListPropValue?.category || productList.filterCategoryId || "",
        productList.productListPropValue?.brand || productList.filterBrandId || "",
      ].join("|");
    if (refreshRequestKeyRef.current === requestKey) return;
    refreshRequestKeyRef.current = requestKey;

    let isMounted = true;
    getProductListInitialData(productList)
      .then(async () => {
        const loadedProducts = productList.data || [];
        if (!selectedRefs.length) {
          if (isMounted && loadedProducts.length > 0) {
            setResolvedProducts(loadedProducts.slice(0, 6));
            return;
          }
          const recentProducts = await fetchRecentStoreProducts(productList);
          if (isMounted && recentProducts.length > 0) setResolvedProducts(recentProducts);
          return;
        }

        const refreshedProducts = orderedProducts(loadedProducts, selectedRefs);
        if (refreshedProducts.length >= Math.min(new Set(selectedRefs.map((item) => item.productId)).size, 6)) {
          if (isMounted) setResolvedProducts(refreshedProducts);
          return;
        }

        const response = await apiSearchProducts({
          input: {
            productIdList: selectedRefs.map((item) => item.productId),
            page: 1,
            perPage: Math.max(selectedRefs.length, 20),
          },
        } as Parameters<typeof apiSearchProducts>[0], productList.excludedFields || []);

        const orderedApiProducts = orderedProducts(response.data?.data || [], selectedRefs);
        if (isMounted && orderedApiProducts.length > 0) {
          setResolvedProducts(orderedApiProducts);
          return;
        }

        const recentProducts = await fetchRecentStoreProducts(productList);
        if (isMounted && recentProducts.length > 0) setResolvedProducts(recentProducts);
      })
      .catch((error) => {
        console.error("ThreeMashProductsBasicSlider product list refresh failed", error);
      });

    return () => {
      isMounted = false;
    };
  }, [props.productList, props.sliderSource]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const track = slider.querySelector<HTMLElement>(".tmr-products-track");
    if (!track) return;
    slider.classList.remove("tmr-products-loop-ready");
    if (itemCount <= 1) return;

    const measure = () => {
      const target = Array.from(track.children).filter((child): child is HTMLElement => child instanceof HTMLElement)[itemCount];
      if (!target) return;
      const distance = target.offsetLeft;
      if (distance <= 0) return;
      track.style.setProperty("--tmr-products-loop-distance", `${distance}px`);
      track.style.setProperty("--tmr-products-loop-distance-negative", `${distance * -1}px`);
      slider.classList.add("tmr-products-loop-ready");
    };

    const frame = window.requestAnimationFrame(measure);
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    observer?.observe(slider);
    observer?.observe(track);
    track.querySelectorAll("img").forEach((image) => {
      if (!image.complete) image.addEventListener("load", measure, { once: true });
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [itemCount]);

  const style = {
    "--tmr-bg": themeToken(props.backgroundColor, "#FAFAF7", "--tm-theme-bg"),
    "--tmr-text": themeToken(props.textColor, "#0E0E0C", "--tm-theme-text"),
    "--tmr-sub": themeToken(props.subTextColor, "#55554E", "--tm-theme-sub"),
    "--tmr-muted": themeToken(props.mutedTextColor, "#8F8F86", "--tm-theme-muted"),
    "--tmr-line": themeToken(props.lineColor, "#E6E6E0", "--tm-theme-line"),
    "--tmr-panel": themeToken(props.panelColor, "#FFFFFF", "--tm-theme-panel"),
    "--tmr-accent": themeToken(props.accentColor, "#C7F136", "--tm-theme-accent"),
    "--tmr-accent-text": themeToken(props.accentTextColor, "#3D4D0E", "--tm-theme-accent-text"),
    "--tmr-slider-max": `${numberValue(props.maxWidth, 1240, 320, 1800)}px`,
    "--tmr-slider-padding-top": `${numberValue(props.paddingTop, 32, 0, 180)}px`,
    "--tmr-slider-padding-bottom": `${numberValue(props.paddingBottom, 32, 0, 180)}px`,
    "--tmr-slider-intro-max": `${numberValue(props.introMaxWidth, 1320, 320, 1800)}px`,
    "--tmr-slider-intro-spacing": `${numberValue(props.introSpacing, 42, 0, 120)}px`,
    "--tmr-slider-intro-title-size": `${numberValue(props.introTitleFontSize, 22, 12, 72)}px`,
    "--tmr-slider-intro-body-size": `${numberValue(props.introBodyFontSize, 16, 10, 28)}px`,
    "--tmr-solution-carousel-duration": `${numberValue(props.carouselDurationSeconds, 24, 4, 90)}s`,
    "--tmr-solution-edge-fade-width": `${numberValue(props.edgeFadeWidth, 44, 0, 120)}px`,
    "--tmr-solution-card-gap": `${numberValue(props.cardGap, 22, 8, 48)}px`,
    "--tmr-solution-card-radius": `${numberValue(props.cardRadius, 20, 0, 36)}px`,
    "--tmr-solution-media-start": props.cardMediaStartColor || "#F4F4EF",
    "--tmr-solution-media-end": props.cardMediaEndColor || "#E9E9E2",
    "--tmr-solution-image-width": `${numberValue(props.productImageWidth, 170, 48, 280)}px`,
    "--tmr-solution-image-height": `${numberValue(props.productImageHeight, 156, 48, 240)}px`,
    "--tmr-solution-image-x": `${numberValue(props.productImageXOffset, 0, -90, 90)}px`,
    "--tmr-solution-image-y": `${numberValue(props.productImageYOffset, 0, -90, 90)}px`,
    "--tmr-solution-image-fit": imageFit(props.productImageFit),
    "--tmr-solution-image-opacity": percent(props.productImageOpacity, 100, 0, 100),
    "--tmr-solution-image-brightness": percent(props.productImageBrightness, 100),
    "--tmr-solution-image-contrast": percent(props.productImageContrast, 100),
    "--tmr-solution-image-saturation": percent(props.productImageSaturation, 100, 0, 260),
    "--tmr-solution-image-hue": `${numberValue(props.productImageHue, 0, -180, 180)}deg`,
    "--tmr-solution-image-invert": percent(props.productImageInvert, 0, 0, 100),
    "--tmr-slider-desktop-cards": numberValue(props.visibleCardsDesktop, 3, 1, 5),
    "--tmr-slider-tablet-cards": numberValue(props.visibleCardsTablet, 2, 1, 3),
  } as any;

  const noPause = props.pauseOnHover === false ? " tmr-products-no-pause" : "";
  const single = itemCount === 1 ? " tmr-products-single" : "";
  const baseCards =
    mode === "manual"
      ? customCards.map((card, index) => manualProductCard(card, props, index))
      : products.map((product) => productCard(product, props));
  const cards =
    itemCount <= 1
      ? baseCards
      : [
          ...baseCards,
          ...(mode === "manual"
            ? customCards.map((card, index) => manualProductCard(card, props, index, index + 1))
            : products.map((product, index) => productCard(product, props, index + 1))),
          ...(mode === "manual"
            ? customCards.map((card, index) => manualProductCard(card, props, index, index + customCards.length + 1))
            : products.map((product, index) => productCard(product, props, index + products.length + 1))),
        ];
  const hasIntro = props.showIntro !== false && (text(props.introTitle) || text(props.introDescriptionHtml));

  return (
    <section id={props.sectionAnchorId || undefined} className="three-mash-products-basic-slider tmr-solution" style={style}>
      <div className="tmpbs-wrap">
        {hasIntro ? (
          <div className={`tmpbs-intro tmpbs-intro-${props.introAlign || "center"}`}>
            {text(props.introTitle) ? <h2>{text(props.introTitle)}</h2> : null}
            {text(props.introDescriptionHtml) ? <div className="tmpbs-intro-copy" dangerouslySetInnerHTML={html(props.introDescriptionHtml)} /> : null}
          </div>
        ) : null}
        {itemCount ? (
          <div
            ref={sliderRef}
            className={`tmr-products tmr-products-slider tmr-products-live${single}${noPause}`}
            data-tmr-products-original-count={itemCount}
            aria-label={props.carouselAriaLabel || "Ürünler"}
          >
            <div className="tmr-products-track">{cards}</div>
          </div>
        ) : (
          <div className="tmr-products-setup">
            {props.setupMessage || "Bu slider ikas canlı ürün datasına bağlıdır. Product List alanını ürün listesine bağlayın."}
          </div>
        )}
      </div>
    </section>
  );
}

export default ThreeMashProductsBasicSlider;
