import { tLocalized } from "../../utils/i18n";
import { useEffect, useRef, useState } from "preact/hooks";
import {
  createMediaSrcset,
  getDefaultSrc,
  getProductHref,
  getProductListFilterCategories,
  getProductListInitialData,
  getProductListPage,
  getProductListSortOptions,
  getProductVariantFormattedFinalPrice,
  getProductVariantFormattedSellPrice,
  getProductVariantMainImage,
  getSelectedProductVariant,
  hasProductListNextPage,
  hasProductListPrevPage,
  hasProductVariantDiscount,
  initProductList,
  searchProductList,
  setSortType,
  type IkasProduct,
  type IkasFilterCategory,
  type IkasProductList,
  type IkasProductListSortType,
  type IkasProductVariant,
} from "@ikas/bp-storefront";
import { Props } from "./types";

type ListingLink = {
  label: string;
  id: string;
  group: "Kategori" | "Marka";
};

const ALL_PRODUCTS_FILTER_ID = "all-products";

function safeVariant(product: IkasProduct): IkasProductVariant | null {
  try {
    return getSelectedProductVariant(product) || product.variants?.[0] || null;
  } catch {
    return product.variants?.[0] || null;
  }
}

function normalizedText(value: string | undefined) {
  return (value || "")
    .replace(/&/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function themeToken(
  value: string | undefined,
  defaultValue: string,
  tokenName: string,
) {
  const trimmed = value?.trim();
  if (trimmed && trimmed.toLowerCase() !== defaultValue.toLowerCase())
    return trimmed;
  return `var(${tokenName}, ${defaultValue})`;
}

function searchKey(value: string | undefined) {
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
    .replace(/\s+/g, " ")
    .trim();
}

function localizeSortLabel(value: string | undefined) {
  const label = (value || "").trim();
  const normalized = searchKey(label);

  if (!normalized) return label;
  if (normalized === "sirala") return "Sırala";
  if (normalized.includes("default") || normalized.includes("varsayilan")) return "Varsayılan";
  if (normalized.includes("most relevant") || normalized.includes("relevant")) return "En Alakalı";
  if (normalized.includes("newest") || normalized.includes("en yeni") || normalized === "new") return "En Yeni";
  if (normalized.includes("oldest") || normalized.includes("en eski")) return "En Eski";
  if (normalized.includes("price") && (normalized.includes("low") || normalized.includes("asc") || normalized.includes("cheap"))) return "Fiyat: Artan";
  if (normalized.includes("price") && (normalized.includes("high") || normalized.includes("desc") || normalized.includes("expensive"))) return "Fiyat: Azalan";
  if (normalized.includes("name") && normalized.includes("az")) return "İsim: A-Z";
  if (normalized.includes("name") && normalized.includes("za")) return "İsim: Z-A";
  if (normalized.includes("increasing price")) return "Fiyat: Artan";
  if (normalized.includes("decreasing price")) return "Fiyat: Azalan";
  if (normalized.includes("last added")) return "Son Eklenen";
  if (normalized.includes("first added")) return "İlk Eklenen";
  if (normalized.includes("increasing discount")) return "İndirim: Artan";
  if (normalized.includes("decreasing discount")) return "İndirim: Azalan";
  if (normalized.includes("featured")) return "Öne Çıkan";

  return label;
}

function productSearchText(product: IkasProduct) {
  const categoryNames =
    product.categories
      ?.map((category) => category.name)
      .filter(Boolean)
      .join(" ") || "";
  const variantSkus =
    product.variants
      ?.map((variant) => variant.sku)
      .filter(Boolean)
      .join(" ") || "";
  return searchKey(
    `${product.name} ${product.brand?.name || ""} ${categoryNames} ${variantSkus}`,
  );
}

function filterProducts(products: IkasProduct[], query: string) {
  const key = searchKey(query);
  if (!key) return products;
  return products.filter((product) => productSearchText(product).includes(key));
}

function availableProductCategories(productList: IkasProductList): IkasFilterCategory[] {
  const categoriesById = new Map<string, IkasFilterCategory>();
  getProductListFilterCategories(productList).forEach((category) => {
    if (category.id) categoriesById.set(category.id, category);
  });
  (productList.data || []).forEach((product) => {
    (product.categories || []).forEach((category) => {
      const categoryData = category as unknown as Record<string, unknown>;
      const categoryName =
        categoryData.name || categoryData.title || categoryData.slug;
      if (category.id) {
        categoriesById.set(
          category.id,
          (categoryName
            ? { ...category, name: String(categoryName) }
            : category) as unknown as IkasFilterCategory,
        );
      }
    });
  });
  return Array.from(categoriesById.values());
}

function categoryLabel(category: IkasFilterCategory) {
  const data = category as unknown as Record<string, unknown>;
  const label = String(data.name || data.title || data.slug || data.handle || "").trim();
  return label || "Kategori";
}

function productCategoryMatches(product: IkasProduct, category: ListingLink) {
  const targetLabel = searchKey(category.label);
  return (product.categories || []).some((item) => {
    const data = item as unknown as Record<string, unknown>;
    const id = String(data.id || data.categoryId || data.value || "");
    const label = searchKey(String(data.name || data.title || data.slug || data.handle || ""));
    return id === category.id || label === targetLabel;
  });
}

function ProductCard({
  product,
  props,
  isCategoryPage = false,
}: {
  product: IkasProduct;
  props: Props;
  isCategoryPage?: boolean;
}) {
  const variant = safeVariant(product);
  const media = variant ? getProductVariantMainImage(variant) : undefined;
  const image = media?.image;
  const imageSrc = image ? getDefaultSrc(image) : "";
  const [isMediaLoaded, setIsMediaLoaded] = useState(!imageSrc);
  const hasDiscount = variant ? hasProductVariantDiscount(variant) : false;
  const firstCategory = product.categories?.[0]?.name;
  const price = variant ? getProductVariantFormattedFinalPrice(variant) : "";
  const comparePrice =
    variant && hasDiscount ? getProductVariantFormattedSellPrice(variant) : "";

  useEffect(() => {
    setIsMediaLoaded(!imageSrc);
  }, [imageSrc]);

  return (
    <a
      className={`tm-products-card${isCategoryPage ? " is-category-card" : ""}`}
      href={getProductHref(product)}
    >
      <div className="tm-products-card-media">
        {imageSrc && !isMediaLoaded ? <div className="tm-products-card-media-loader" aria-hidden="true" /> : null}
        <div className="tm-products-card-badges">
          {hasDiscount ? <span>{props.discountText || "İndirim"}</span> : null}
        </div>
        {image ? (
          media?.isVideo ? (
            <video
              src={imageSrc}
              muted
              playsInline
              loop
              autoPlay
              onLoadedData={() => setIsMediaLoaded(true)}
              onError={() => setIsMediaLoaded(true)}
            />
          ) : (
            <img
              src={imageSrc}
              srcSet={createMediaSrcset(image)}
              alt={image.altText || product.name}
              loading="lazy"
              decoding="async"
              ref={(node) => {
                if (node?.complete) setIsMediaLoaded(true);
              }}
              onLoad={() => setIsMediaLoaded(true)}
              onError={() => setIsMediaLoaded(true)}
            />
          )
        ) : (
          <div className="tm-products-card-fallback" aria-hidden="true">
            {product.name.slice(0, 1)}
          </div>
        )}
      </div>

      <div className="tm-products-card-body">
        <div className="tm-products-card-meta">
          {firstCategory ? (
            <span>{firstCategory}</span>
          ) : (
            <span>{props.fallbackCategoryText || "3MASH"}</span>
          )}
          {product.brand?.name ? <span>{product.brand.name}</span> : null}
        </div>

        <div className="tm-products-card-title">
          <h3>{product.name}</h3>
        </div>

        {props.showSku !== false && variant?.sku ? (
          <p className="tm-products-sku">
            <span>{props.skuText || "SKU"}</span>
            {variant.sku}
          </p>
        ) : null}

        <div className="tm-products-card-bottom">
          <div className="tm-products-price">
            {price ? (
              <strong>{price}</strong>
            ) : (
              <strong>{props.priceRequestText || "Teklif Alın"}</strong>
            )}
            {comparePrice ? <span>{comparePrice}</span> : null}
          </div>
          <em>{props.viewProductText || "Ürünü İncele"}</em>
        </div>
      </div>
    </a>
  );
}

function ProductCardSkeleton({ index }: { index: number }) {
  return (
    <div className="tm-products-card tm-products-card-skeleton" aria-hidden="true" key={index}>
      <div className="tm-products-card-spinner" />
    </div>
  );
}

export function ThreeMashProductsPage(props: Props) {
  const sourceProductList = props.productList;
  const [activeProductList, setActiveProductList] =
    useState<IkasProductList | undefined>(sourceProductList);
  const [categoryCatalog, setCategoryCatalog] =
    useState<IkasProductList | undefined>(sourceProductList);
  const productList = activeProductList || sourceProductList;
  const products = productList?.data || [];
  const [searchValue, setSearchValue] = useState(
    productList?.searchKeyword || "",
  );
  const [activeFilterId, setActiveFilterId] = useState(ALL_PRODUCTS_FILTER_ID);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const committedSearchRef = useRef(productList?.searchKeyword || "");
  const appliedUrlSearchRef = useRef(false);
  const unfilteredProductsRef = useRef<IkasProduct[]>(products);
  const sortControlRef = useRef<HTMLLabelElement>(null);
  const categoryRequestRef = useRef(0);
  const sortOptions = productList ? getProductListSortOptions(productList) : [];
  const selectedSort =
    sortOptions.find((option) => option.isSelected)?.value || "";
  const selectedSortLabel =
    localizeSortLabel(sortOptions.find((option) => option.value === selectedSort)?.label) ||
    props.sortLabel ||
    "Sırala";
  const pageTitle =
    normalizedText(props.eyebrowText) === "ürün kategorisi"
      ? props.titleText || productList?.category?.name || productList?.brand?.name || "Ürünler"
      : tLocalized("Tüm Ürünler", "All Products");
  const eyebrowText = props.eyebrowText?.trim() || "";
  const categoryLinks: ListingLink[] = [
    {
      id: ALL_PRODUCTS_FILTER_ID,
      label: tLocalized("Tüm Ürünler", "All Products"),
      group: "Kategori",
    },
    ...((categoryCatalog ? availableProductCategories(categoryCatalog) : [])
      .filter((category) => Boolean(category.id))
      .map((category) => ({
        id: category.id,
        label: categoryLabel(category),
        group: "Kategori" as const,
      }))),
  ];
  const isCategoryProductsPage =
    normalizedText(eyebrowText) === "ürün kategorisi";
  const isDentalResinCategoryPage =
    isCategoryProductsPage && normalizedText(pageTitle) === tLocalized("dental reçineler", "Dental Resins");
  const showSearchControl = props.showSearch !== false;
  const showSortControl =
    !isCategoryProductsPage &&
    props.showSort !== false &&
    sortOptions.length > 0;
  const showListControls = showSearchControl || showSortControl;
  const showNavigationControls = !isCategoryProductsPage;
  const displayEyebrowText = eyebrowText || "ÜRÜN KATEGORİSİ";
  const trimmedSearch = searchValue.trim();
  const fallbackProducts =
    unfilteredProductsRef.current.length > 0
      ? unfilteredProductsRef.current
      : products;
  const productSource = products.length > 0 ? products : fallbackProducts;
  const displayedProducts = trimmedSearch
    ? filterProducts(productSource, trimmedSearch)
    : productSource;
  const showProductSkeletons = Boolean(
    productList?.isLoading,
  ) && displayedProducts.length === 0;

  const style = {
    "--tm-products-bg": themeToken(
      props.backgroundColor,
      "#f6f7f3",
      "--tm-theme-bg",
    ),
    "--tm-products-text": themeToken(
      props.textColor,
      "#10120f",
      "--tm-theme-text",
    ),
    "--tm-products-muted": themeToken(
      props.mutedTextColor,
      "#64695f",
      "--tm-theme-muted",
    ),
    "--tm-products-card": themeToken(
      props.cardColor,
      "#ffffff",
      "--tm-theme-panel",
    ),
    "--tm-products-line": themeToken(
      props.lineColor,
      "#dfe3da",
      "--tm-theme-line",
    ),
    "--tm-products-accent": themeToken(
      props.accentColor,
      "#c7f136",
      "--tm-theme-accent",
    ),
  } as any;

  useEffect(() => {
    setActiveProductList(sourceProductList);
    setCategoryCatalog(sourceProductList);
    setActiveFilterId(ALL_PRODUCTS_FILTER_ID);
    setSearchValue(sourceProductList?.searchKeyword || "");
    committedSearchRef.current = sourceProductList?.searchKeyword || "";
  }, [sourceProductList]);

  useEffect(() => {
    if (!sourceProductList || sourceProductList.type === "CATEGORY") return;

    const allProductsList = initProductList({
      type: "ALL",
      sort: sourceProductList.sort || "DEFAULT",
      limit: Math.max(sourceProductList.limit || 12, 200),
      pageType: "CUSTOM",
      productListPropValue: {
        ...sourceProductList.productListPropValue,
        id: "all-products-category-catalog",
        productListType: "ALL",
        category: null,
        brand: null,
        productIds: [],
      },
    });

    void getProductListInitialData(allProductsList).then(() => {
      setCategoryCatalog(allProductsList);
    });
  }, [sourceProductList]);

  useEffect(() => {
    if (!trimmedSearch && products.length > 0) {
      unfilteredProductsRef.current = products;
    }
  }, [products, trimmedSearch]);

  useEffect(() => {
    if (
      !productList ||
      typeof window === "undefined" ||
      appliedUrlSearchRef.current
    )
      return;
    const param = props.searchQueryParam || "q";
    const query =
      new URLSearchParams(window.location.search).get(param)?.trim() || "";
    appliedUrlSearchRef.current = true;
    if (query) {
      setSearchValue(query);
      committedSearchRef.current = query;
    }
    if (query && productList.searchKeyword !== query) {
      searchProductList(productList, query);
    }
  }, [productList, props.searchQueryParam]);

  useEffect(() => {
    if (!productList) return;
    const nextSearch = productList.searchKeyword || "";
    if (
      searchValue === committedSearchRef.current &&
      searchKey(nextSearch) !== searchKey(searchValue)
    ) {
      setSearchValue(nextSearch);
      committedSearchRef.current = nextSearch;
    }
  }, [productList?.searchKeyword, searchValue]);

  useEffect(() => {
    if (!productList) return;
    const nextSearch = searchValue.trim();
    if (nextSearch === committedSearchRef.current) return;

    const timeout = window.setTimeout(() => {
      committedSearchRef.current = nextSearch;
      searchProductList(productList, nextSearch);
    }, 240);

    return () => window.clearTimeout(timeout);
  }, [productList, searchValue]);

  useEffect(() => {
    if (!sortMenuOpen || typeof document === "undefined") return;

    function closeSortMenu(event: MouseEvent) {
      if (sortControlRef.current?.contains(event.target as Node)) return;
      setSortMenuOpen(false);
    }

    document.addEventListener("mousedown", closeSortMenu);
    return () => document.removeEventListener("mousedown", closeSortMenu);
  }, [sortMenuOpen]);

  function handleSearch(event: Event) {
    setSearchValue((event.currentTarget as HTMLInputElement).value);
  }

  function handleSearchKeyDown(event: KeyboardEvent) {
    if (!productList || event.key !== "Enter") return;
    commitSearch();
  }

  function handleListingFilter(link: ListingLink) {
    if (!sourceProductList) return;

    setActiveFilterId(link.id);
    if (link.id === ALL_PRODUCTS_FILTER_ID) {
      categoryRequestRef.current += 1;
      setActiveProductList(sourceProductList);
      return;
    }

    const requestId = ++categoryRequestRef.current;
    const categoryProductList = initProductList({
      type: "CATEGORY",
      sort: productList?.sort || "DEFAULT",
      limit: productList?.limit || 12,
      pageType: "CATEGORY",
      filterCategoryId: link.id,
      productListPropValue: {
        ...sourceProductList.productListPropValue,
        id: `category-${link.id}`,
        productListType: "CATEGORY",
        category: link.id,
        brand: null,
        productIds: [],
      },
    });

    void getProductListInitialData(categoryProductList).then(() => {
      if (requestId !== categoryRequestRef.current) return;

      const productsById = new Map<string, IkasProduct>();
      (categoryProductList.data || []).forEach((product) => {
        productsById.set(product.id, product);
      });

      if (productsById.size === 0 && categoryCatalog) {
        (categoryCatalog.data || []).forEach((product) => {
          if (productCategoryMatches(product, link)) {
            productsById.set(product.id, product);
          }
        });
      }

      setActiveProductList({
        ...categoryProductList,
        data: Array.from(productsById.values()),
      });
      setSearchValue("");
      committedSearchRef.current = "";
    }).catch(() => {
      if (requestId !== categoryRequestRef.current) return;
      setActiveProductList({
        ...categoryProductList,
        data: [],
      });
      setSearchValue("");
      committedSearchRef.current = "";
    });
  }

  function commitSearch() {
    if (!productList) return;
    const nextSearch = searchValue.trim();
    if (nextSearch === committedSearchRef.current) return;
    committedSearchRef.current = nextSearch;
    searchProductList(productList, nextSearch);
  }

  function handleSortValue(value: IkasProductListSortType) {
    if (!productList) return;
    setSortType(productList, value);
    setSortMenuOpen(false);
  }

  function goToPage(page: number) {
    if (!productList) return;
    getProductListPage(productList, page);
  }

  return (
    <section
      className={`three-mash-products-page${isCategoryProductsPage ? " is-category-products-page" : " is-search-products-page"}${isDentalResinCategoryPage ? " is-dental-resin-category-page" : ""}`}
      style={style}
    >
      <div className="tm-products-wrap">
        <div className="tm-products-head">
          <div>
            {isCategoryProductsPage ? (
              <>
                <p className="tm-products-eyebrow">{displayEyebrowText}</p>
                <h1>{pageTitle}</h1>
                {props.descriptionText ? <p>{props.descriptionText}</p> : null}
              </>
            ) : (
              <>
                <h1>{pageTitle}</h1>
              </>
            )}
          </div>
        </div>

        {!productList ? (
          <div className="tm-products-setup">
            {props.setupMessage ||
              "Ürünler kısa süre içinde burada listelenecek."}
          </div>
        ) : (
          <>
            {showListControls ? (
              <div className="tm-products-toolbar">
                {showSearchControl ? (
                  <label className="tm-products-search">
                    <span>{props.searchLabel || "Arama"}</span>
                    <div className="tm-products-search-control">
                      <input
                        type="search"
                        value={searchValue}
                        placeholder={
                          props.searchPlaceholder || "Ürün adı, marka"
                        }
                        onInput={handleSearch}
                        onKeyDown={handleSearchKeyDown}
                      />
                      <button
                        type="button"
                        className="tm-products-search-icon"
                        aria-label="Ara"
                        onClick={commitSearch}
                      >
                        <svg viewBox="0 0 24 24" focusable="false">
                          <circle cx="11" cy="11" r="7" />
                          <line x1="16.5" y1="16.5" x2="21" y2="21" />
                        </svg>
                      </button>
                    </div>
                  </label>
                ) : (
                  <span />
                )}

                {showSortControl ? (
                  <label className="tm-products-sort" ref={sortControlRef}>
                    <span>{props.sortLabel || "Sırala"}</span>
                    <button
                      className="tm-products-sort-trigger"
                      type="button"
                      aria-haspopup="listbox"
                      aria-expanded={sortMenuOpen}
                      onClick={() => setSortMenuOpen((isOpen) => !isOpen)}
                    >
                      <span>{selectedSortLabel}</span>
                      <svg
                        viewBox="0 0 12 8"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path d="M1 1.5 6 6.5l5-5" />
                      </svg>
                    </button>
                    {sortMenuOpen ? (
                      <div className="tm-products-sort-menu" role="listbox">
                        {sortOptions.map((option) => (
                          <button
                            type="button"
                            role="option"
                            aria-selected={option.value === selectedSort}
                            className={
                              option.value === selectedSort ? "is-selected" : ""
                            }
                            onClick={() =>
                              handleSortValue(
                                option.value as IkasProductListSortType,
                              )
                            }
                            key={option.value}
                          >
                            {localizeSortLabel(option.label)}
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </label>
                ) : null}
              </div>
            ) : null}

            {trimmedSearch ? (
              <div className="tm-products-active-query">
                <span>
                  Arama: <b>{trimmedSearch}</b>
                </span>
                <button type="button" onClick={() => setSearchValue("")}>
                  Temizle
                </button>
              </div>
            ) : null}

            {showNavigationControls ? (
              <div className="tm-products-nav-shell">
                <div className="tm-products-nav-tabs" aria-label="Liste türü">
                  <span className="is-active">Kategoriler</span>
                </div>
                <nav
                  className="tm-products-nav"
                  aria-label="Ürün kategorileri"
                >
                  {categoryLinks.map((link) => (
                    <button
                      type="button"
                      className={
                        activeFilterId === link.id
                          ? "is-active"
                          : ""
                      }
                      data-group={link.group}
                      aria-pressed={activeFilterId === link.id}
                      onClick={() => handleListingFilter(link)}
                      key={`${link.group}-${link.id}`}
                    >
                      {link.label}
                    </button>
                  ))}
                </nav>
              </div>
            ) : null}

            {showProductSkeletons ? (
              <div className="tm-products-grid" aria-label="Ürünler yükleniyor">
                {Array.from({ length: 8 }, (_, index) => (
                  <ProductCardSkeleton index={index} key={index} />
                ))}
              </div>
            ) : displayedProducts.length > 0 ? (
              <div className="tm-products-grid">
                {displayedProducts.map((product) => (
                  <ProductCard
                    product={product}
                    props={props}
                    isCategoryPage={isCategoryProductsPage}
                    key={product.id}
                  />
                ))}
              </div>
            ) : (
              <div className="tm-products-empty">
                <h2>{props.emptyTitle || "Ürün bulunamadı"}</h2>
                <p>
                  {props.emptyMessage ||
                    (trimmedSearch
                      ? "Aramanızla eşleşen aktif ürün bulunamadı."
                      : isCategoryProductsPage
                        ? "Bu kategoriye bağlı aktif ürün yok."
                        : "Bu listeye bağlı aktif ürün yok veya filtreler sonucu ürün kalmadı.")}
                </p>
              </div>
            )}

            <div className="tm-products-pagination">
              <button
                type="button"
                disabled={!hasProductListPrevPage(productList)}
                onClick={() => goToPage((productList.page || 1) - 1)}
              >
                {props.prevPageText || "Önceki"}
              </button>
              <span>{productList.page || 1}</span>
              <button
                type="button"
                disabled={!hasProductListNextPage(productList)}
                onClick={() => goToPage((productList.page || 1) + 1)}
              >
                {props.nextPageText || "Sonraki"}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default ThreeMashProductsPage;
