import { tLocalized } from "../../utils/i18n";
import { useEffect, useRef, useState } from "preact/hooks";
import {
  apiSearchProducts,
  addProductToFavorites,
  createMediaSrcset,
  customerStore,
  getDefaultSrc,
  getFavoriteProductsIds,
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
  removeProductFromFavorites,
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
const RESIN_FALLBACK_SEARCHES = [
  "Mash Study",
  "Mash Clear",
  "Mash Trial White",
  "Mash Trial Pink",
] as const;

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
  if (normalized === tLocalized("sirala", "sirala")) return tLocalized("Önerilen", "Recommended");
  if (normalized.includes("default") || normalized.includes("varsayilan")) return tLocalized("Önerilen", "Recommended");
  if (normalized.includes("most relevant") || normalized.includes("relevant")) return tLocalized("Önerilen", "Recommended");
  if (normalized.includes("newest") || normalized.includes(tLocalized("en yeni", "newest")) || normalized === "new") return tLocalized("En Yeni", "Newest");
  if (normalized.includes("oldest") || normalized.includes("en eski")) return tLocalized("En Eski", "Oldest");
  if (normalized.includes("price") && (normalized.includes("low") || normalized.includes("asc") || normalized.includes("cheap"))) return tLocalized("Fiyat: Artan", "Price: Low to High");
  if (normalized.includes("price") && (normalized.includes("high") || normalized.includes("desc") || normalized.includes("expensive"))) return tLocalized("Fiyat: Azalan", "Price: High to Low");
  if (normalized.includes("name") && normalized.includes("az")) return tLocalized("İsim: A-Z", "Name: A-Z");
  if (normalized.includes("name") && normalized.includes("za")) return tLocalized("İsim: Z-A", "Name: Z-A");
  if (normalized.includes("increasing price")) return tLocalized("Fiyat: Artan", "Price: Low to High");
  if (normalized.includes("decreasing price")) return tLocalized("Fiyat: Azalan", "Price: High to Low");
  if (normalized.includes("last added")) return tLocalized("Son Eklenen", "Recently Added");
  if (normalized.includes("first added")) return tLocalized("İlk Eklenen", "First Added");
  if (normalized.includes("increasing discount")) return tLocalized("İndirim: Artan", "Discount: Ascending");
  if (normalized.includes("decreasing discount")) return tLocalized("İndirim: Azalan", "Discount: Descending");
  if (normalized.includes("featured")) return tLocalized("Öne Çıkan", "Featured");

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
  return label || tLocalized("Kategori", "Category");
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
  index = 0,
  isFavorite = false,
  onToggleFavorite,
}: {
  product: IkasProduct;
  props: Props;
  index?: number;
  isFavorite?: boolean;
  onToggleFavorite?: (productId: string) => void;
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
    <div className="tm-products-card">
      <div className="tm-products-card-media-wrap">
        <a
          href={getProductHref(product)}
          className="tm-products-card-media-link"
          aria-label={product.name}
        >
          <div className="tm-products-card-media">
            {imageSrc && !isMediaLoaded ? (
              <div className="tm-products-card-media-loader" aria-hidden="true" />
            ) : null}

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
        </a>

        {/* Top Badges & Wishlist */}
        <div className="tm-products-card-top-actions">
          {hasDiscount ? (
            <span className="tm-products-badge-popular">
              {props.discountText || tLocalized("İndirim", "Discount")}
            </span>
          ) : <span />}

          <button
            type="button"
            className={`tm-products-card-fav-btn${isFavorite ? " is-active" : ""}`}
            aria-label={isFavorite ? tLocalized("Favorilerden çıkar", "Remove from favorites") : tLocalized("Favorilere ekle", "Add to favorites")}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite?.(product.id);
            }}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill={isFavorite ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="1.8"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="tm-products-card-body">
        <div className="tm-products-card-info">
          {product.brand?.name ? (
            <span className="tm-products-card-brand">{product.brand.name}</span>
          ) : (
            <span className="tm-products-card-brand">{props.fallbackCategoryText || "3MASH"}</span>
          )}

          <a href={getProductHref(product)} className="tm-products-card-title-link">
            <h3 className="tm-products-card-title">{product.name}</h3>
          </a>

          {firstCategory ? (
            <span className="tm-products-card-category">{firstCategory}</span>
          ) : null}
        </div>

        <div className="tm-products-card-footer">
          <div className="tm-products-card-price-wrap">
            {price ? (
              <strong className="tm-products-card-price">{price}</strong>
            ) : (
              <strong className="tm-products-card-price is-quote">
                {props.priceRequestText || tLocalized("Teklif Alın", "Get a Quote")}
              </strong>
            )}
            {comparePrice ? (
              <span className="tm-products-card-compare-price">{comparePrice}</span>
            ) : null}
          </div>

          <a
            href={getProductHref(product)}
            className="tm-products-card-cta-btn"
          >
            <span>{props.viewProductText || tLocalized("Ürünü İncele", "View Product")}</span>
            <svg
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M4.167 10h11.666M10.833 5l5 5-5 5" />
            </svg>
          </a>
        </div>
      </div>
    </div>
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
  const [gridLayout, setGridLayout] = useState<"grid-4" | "grid-3">("grid-4");
  const [favoriteIds, setFavoriteIds] = useState<Record<string, boolean>>({});
  const [favoritePendingIds, setFavoritePendingIds] = useState<Record<string, boolean>>({});

  const committedSearchRef = useRef(productList?.searchKeyword || "");
  const appliedUrlSearchRef = useRef(false);
  const unfilteredProductsRef = useRef<IkasProduct[]>(products);
  const sortControlRef = useRef<HTMLDivElement>(null);
  const categoriesScrollRef = useRef<HTMLDivElement>(null);
  const categoryRequestRef = useRef(0);

  useEffect(() => {
    if (!customerStore.customer) return;
    let mounted = true;
    getFavoriteProductsIds(customerStore)
      .then((favorites) => {
        if (!mounted) return;
        setFavoriteIds(
          favorites.reduce<Record<string, boolean>>((result, favorite) => {
            if (favorite.productId) result[favorite.productId] = true;
            return result;
          }, {}),
        );
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  const sortOptions = productList ? getProductListSortOptions(productList) : [];
  const selectedSort =
    sortOptions.find((option) => option.isSelected)?.value || "";
  const selectedSortLabel =
    localizeSortLabel(sortOptions.find((option) => option.value === selectedSort)?.label) ||
    props.sortLabel ||
    tLocalized("Önerilen", "Recommended");

  const pageTitle =
    normalizedText(props.eyebrowText) === tLocalized("ürün kategorisi", "product category")
      ? props.titleText || productList?.category?.name || productList?.brand?.name || tLocalized("Ürünler", "Products")
      : tLocalized("Tüm Ürünler", "All Products");

  const fallbackCategories = [
    { id: ALL_PRODUCTS_FILTER_ID, label: tLocalized("Tüm Ürünler", "All Products"), group: "Kategori" as const },
    { id: "3d-yazicilar", label: tLocalized("3D Yazıcılar", "3D Printers"), group: "Kategori" as const },
    { id: "3d-yazici-yedek-parcalari", label: tLocalized("3D Yazıcı Yedek Parçaları", "3D Printer Spare Parts"), group: "Kategori" as const },
    { id: "recineler", label: tLocalized("Reçineler", "Resins"), group: "Kategori" as const },
    { id: "kurleme-cihazlari", label: tLocalized("Kürleme Cihazları", "Curing Devices"), group: "Kategori" as const },
    { id: "tarayicilar", label: tLocalized("Tarayıcılar", "Scanners"), group: "Kategori" as const },
    { id: "masaustu-tarayicilar", label: tLocalized("Masaüstü Tarayıcılar", "Desktop Scanners"), group: "Kategori" as const },
    { id: "sistemler", label: tLocalized("Sistemler", "Systems"), group: "Kategori" as const },
    { id: "yazilimlar", label: tLocalized("Yazılımlar", "Software"), group: "Kategori" as const },
  ];

  const fetchedCategories = (categoryCatalog ? availableProductCategories(categoryCatalog) : [])
    .filter((category) => Boolean(category.id))
    .map((category) => ({
      id: category.id,
      label: categoryLabel(category),
      group: "Kategori" as const,
    }));

  const categoryLinks: ListingLink[] = fetchedCategories.length > 0
    ? [
        {
          id: ALL_PRODUCTS_FILTER_ID,
          label: tLocalized("Tüm Ürünler", "All Products"),
          group: "Kategori",
        },
        ...fetchedCategories,
      ]
    : fallbackCategories;

  const showSearchControl = props.showSearch !== false;
  // Keep sorting visible on the product listing toolbar.
  const showSortControl = true;
  const showNavigationControls = props.showNavigation !== false;

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
      "#f7f8f4",
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
      "#e5e8e0",
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

    void getProductListInitialData(categoryProductList).then(async () => {
      if (requestId !== categoryRequestRef.current) return;

      const productsById = new Map<string, IkasProduct>();
      (categoryProductList.data || []).forEach((product) => {
        productsById.set(product.id, product);
      });

      if (categoryCatalog) {
        (categoryCatalog.data || []).forEach((product) => {
          const productName = searchKey(product.name);
          const isMissingResin =
            searchKey(link.label).includes("recine") &&
            RESIN_FALLBACK_SEARCHES.some((name) => productName.includes(searchKey(name)));
          if (productCategoryMatches(product, link) || isMissingResin) {
            productsById.set(product.id, product);
          }
        });
      }

      if (searchKey(link.label).includes("recine")) {
        const missingSearches = RESIN_FALLBACK_SEARCHES.filter(
          (name) => !Array.from(productsById.values()).some((product) => searchKey(product.name).includes(searchKey(name))),
        );
        const fallbackResults = await Promise.all(
          missingSearches.map(async (query) => {
            try {
              const response = await apiSearchProducts({
                input: { query, page: 1, perPage: 10 },
              } as Parameters<typeof apiSearchProducts>[0]);
              return response?.data?.data || [];
            } catch {
              return [];
            }
          }),
        );
        fallbackResults.flat().forEach((product) => {
          productsById.set(product.id, product);
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

  function scrollCategories(direction: "left" | "right") {
    if (!categoriesScrollRef.current) return;
    const scrollAmount = 260;
    categoriesScrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }

  async function handleToggleFavorite(productId: string) {
    if (!customerStore.customer) {
      window.location.href = "/account/login";
      return;
    }

    if (favoritePendingIds[productId]) return;
    const isFavorite = Boolean(favoriteIds[productId]);
    setFavoritePendingIds((prev) => ({ ...prev, [productId]: true }));
    try {
      const success = isFavorite
        ? await removeProductFromFavorites(customerStore, productId)
        : await addProductToFavorites(customerStore, productId);
      if (success) {
        setFavoriteIds((prev) => ({ ...prev, [productId]: !isFavorite }));
      }
    } finally {
      setFavoritePendingIds((prev) => {
        const next = { ...prev };
        delete next[productId];
        return next;
      });
    }
  }

  return (
    <section className="three-mash-products-page" style={style}>
      <div className="tm-products-wrap">
        {/* Top Hero & Header Container */}
        <div className="tm-products-hero-container">
          {/* Breadcrumb Navigation */}
          <nav className="tm-products-breadcrumb" aria-label="Breadcrumb">
            <a href="/" className="tm-products-breadcrumb-link">
              {tLocalized("Ana Sayfa", "Home")}
            </a>
            <span className="tm-products-breadcrumb-sep" aria-hidden="true">&gt;</span>
            <span className="tm-products-breadcrumb-current">{pageTitle}</span>
          </nav>

          <div className="tm-products-hero-main">
            <div className="tm-products-hero-text">
              <h1 className="tm-products-hero-title">{pageTitle}</h1>
              <p className="tm-products-hero-subtitle">
                {props.descriptionText ||
                  tLocalized(
                    "Profesyonel 3D baskı ve dental çözümlerini keşfedin.",
                    "Explore professional 3D printing and dental solutions."
                  )}
              </p>
            </div>
          </div>

          {/* Pill Search Input Bar */}
          {showSearchControl ? (
            <div className="tm-products-search-pill-container">
              <div className="tm-products-search-pill">
                <svg
                  className="tm-products-search-pill-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  focusable="false"
                >
                  <circle cx="11" cy="11" r="7" />
                  <line x1="16.5" y1="16.5" x2="21" y2="21" />
                </svg>

                <input
                  type="search"
                  className="tm-products-search-pill-input"
                  value={searchValue}
                  placeholder={
                    props.searchPlaceholder ||
                    tLocalized("Ürün adı veya marka ara...", "Search product name or brand...")
                  }
                  onInput={handleSearch}
                  onKeyDown={handleSearchKeyDown}
                  aria-label={props.searchLabel || tLocalized("Ürün adı veya marka ara...", "Search product name or brand...")}
                />

                <button
                  type="button"
                  className="tm-products-search-pill-btn"
                  aria-label={tLocalized("Ara", "Search")}
                  onClick={commitSearch}
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M4.167 10h11.666M10.833 5l5 5-5 5" />
                  </svg>
                </button>
              </div>
            </div>
          ) : null}
        </div>

        {/* Categories Bar ("Kategoriler") */}
        {showNavigationControls ? (
          <div className="tm-products-categories-section">
            <h2 className="tm-products-categories-heading">
              {tLocalized("Kategoriler", "Categories")}
            </h2>

            <div
              className="tm-products-categories-scroll"
              ref={categoriesScrollRef}
              role="tablist"
            >
              {categoryLinks.map((link) => {
                const isActive = activeFilterId === link.id;
                return (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`tm-products-category-pill${isActive ? " is-active" : ""}`}
                    onClick={() => handleListingFilter(link)}
                    key={`${link.group}-${link.id}`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            <div className="tm-products-categories-arrows" aria-hidden="true">
              <button
                type="button"
                className="tm-products-category-arrow-btn"
                aria-label={tLocalized("Geri", "Previous categories")}
                onClick={() => scrollCategories("left")}
              >
                &lt;
              </button>
              <button
                type="button"
                className="tm-products-category-arrow-btn"
                aria-label={tLocalized("İleri", "Next categories")}
                onClick={() => scrollCategories("right")}
              >
                &gt;
              </button>
            </div>
          </div>
        ) : null}

        {/* Toolbar Sub-Bar (Sorting and Grid Layout Toggle) */}
        <div className="tm-products-toolbar-row">
          {/* Left: active search query + sort dropdown */}
          <div className="tm-products-toolbar-left">
            {trimmedSearch ? (
              <div className="tm-products-active-query-pill">
                <span>{tLocalized("Arama:", "Search:")} <b>{trimmedSearch}</b></span>
                <button
                  type="button"
                  aria-label={tLocalized("Aramayı temizle", "Clear search")}
                  onClick={() => setSearchValue("")}
                >
                  ✕
                </button>
              </div>
            ) : null}

            {/* Sort Dropdown — grid ikonlarının solunda */}
            {showSortControl ? (
              <div className="tm-products-sort-wrapper" ref={sortControlRef}>
                <span className="tm-products-sort-label">
                  {props.sortLabel || tLocalized("Sırala:", "Sort:")}
                </span>

                <button
                  type="button"
                  className="tm-products-sort-btn"
                  aria-haspopup="listbox"
                  aria-expanded={sortMenuOpen}
                  onClick={() => setSortMenuOpen((isOpen) => !isOpen)}
                >
                  <span>{selectedSortLabel}</span>
                  {/* Heroicons: chevron-down */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    focusable="false"
                    className="tm-products-sort-arrow"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {sortMenuOpen ? (
                  <div className="tm-products-sort-dropdown" role="listbox">
                    {sortOptions.map((option) => (
                      <button
                        type="button"
                        role="option"
                        aria-selected={option.value === selectedSort}
                        className={`tm-products-sort-option${option.value === selectedSort ? " is-selected" : ""}`}
                        onClick={() =>
                          handleSortValue(option.value as IkasProductListSortType)
                        }
                        key={option.value}
                      >
                        {localizeSortLabel(option.label)}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          {/* Grid Layout Switcher */}
            <div className="tm-products-layout-switcher" role="group" aria-label={tLocalized("Grid görünümü", "Grid layout")}>
              <button
                type="button"
                className={`tm-products-layout-btn${gridLayout === "grid-4" ? " is-active" : ""}`}
                aria-label={tLocalized("4'lü Görünüm", "4 Columns View")}
                onClick={() => setGridLayout("grid-4")}
              >
                {/* 4 squares in 2x2 = represents 4-column grid */}
                <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false">
                  <rect x="1" y="1" width="6" height="6" rx="1" />
                  <rect x="9" y="1" width="6" height="6" rx="1" />
                  <rect x="1" y="9" width="6" height="6" rx="1" />
                  <rect x="9" y="9" width="6" height="6" rx="1" />
                </svg>
              </button>

              <button
                type="button"
                className={`tm-products-layout-btn${gridLayout === "grid-3" ? " is-active" : ""}`}
                aria-label={tLocalized("3'lü Görünüm", "3 Columns View")}
                onClick={() => setGridLayout("grid-3")}
              >
                {/* 3 vertical bars = represents 3-column grid */}
                <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false">
                  <rect x="1" y="1" width="4" height="14" rx="1" />
                  <rect x="6" y="1" width="4" height="14" rx="1" />
                  <rect x="11" y="1" width="4" height="14" rx="1" />
                </svg>
              </button>
            </div>
          </div>

        {/* Product Cards Grid Area */}
        {!productList ? (
          <div className="tm-products-setup-box">
            {props.setupMessage ||
              tLocalized(
                "Ürünler kısa süre içinde burada listelenecek.",
                "Products will be listed here shortly."
              )}
          </div>
        ) : showProductSkeletons ? (
          <div className={`tm-products-grid ${gridLayout}`} aria-label={tLocalized("Ürünler yükleniyor", "Loading products")}>
            {Array.from({ length: 8 }, (_, index) => (
              <ProductCardSkeleton index={index} key={index} />
            ))}
          </div>
        ) : displayedProducts.length > 0 ? (
          <div className={`tm-products-grid ${gridLayout}`}>
            {displayedProducts.map((product, index) => (
              <ProductCard
                product={product}
                props={props}
                index={index}
                isFavorite={Boolean(favoriteIds[product.id])}
                onToggleFavorite={handleToggleFavorite}
                key={product.id}
              />
            ))}
          </div>
        ) : (
          <div className="tm-products-empty-box">
            <div className="tm-products-empty-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="11" cy="11" r="7" />
                <line x1="16.5" y1="16.5" x2="21" y2="21" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </div>
            <h2>{props.emptyTitle || tLocalized("Ürün bulunamadı", "Product not found")}</h2>
            <p>
              {props.emptyMessage ||
                (trimmedSearch
                  ? tLocalized(
                      "Aramanızla eşleşen aktif ürün bulunamadı. Lütfen farklı kelimelerle tekrar deneyin.",
                      "No active products matching your search were found. Please try with different keywords."
                    )
                  : tLocalized(
                      "Bu kategoride listelenecek ürün bulunamadı.",
                      "No products found in this category."
                    ))}
            </p>
          </div>
        )}

        {/* Pagination Section */}
        {productList && (hasProductListPrevPage(productList) || hasProductListNextPage(productList)) ? (
          <div className="tm-products-pagination-container">
            <button
              type="button"
              className="tm-products-pagination-btn"
              disabled={!hasProductListPrevPage(productList)}
              onClick={() => goToPage((productList.page || 1) - 1)}
            >
              <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                <path d="M15.5 10H4.5M9 5.5 4.5 10 9 14.5" />
              </svg>
              <span>{props.prevPageText || tLocalized("Önceki", "Previous")}</span>
            </button>
            <span className="tm-products-pagination-current">
              {productList.page || 1}
            </span>
            <button
              type="button"
              className="tm-products-pagination-btn"
              disabled={!hasProductListNextPage(productList)}
              onClick={() => goToPage((productList.page || 1) + 1)}
            >
              <span>{props.nextPageText || tLocalized("Sonraki", "Next")}</span>
              <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                <path d="M4.5 10h11M11 5.5l4.5 4.5-4.5 4.5" />
              </svg>
            </button>
          </div>
        ) : null}

      </div>
    </section>
  );
}

export default ThreeMashProductsPage;
