import { useEffect, useRef, useState } from "preact/hooks";
import {
  createMediaSrcset,
  getDefaultSrc,
  getProductHref,
  getProductListPage,
  getProductListSortOptions,
  getProductVariantFormattedFinalPrice,
  getProductVariantFormattedSellPrice,
  getProductVariantMainImage,
  getSelectedProductVariant,
  hasProductListNextPage,
  hasProductListPrevPage,
  hasProductVariantDiscount,
  searchProductList,
  setSortType,
  type IkasProduct,
  type IkasProductListSortType,
  type IkasProductVariant,
} from "@ikas/bp-storefront";
import { Props } from "./types";

type ListingLink = {
  label: string;
  href: string;
  group: "Kategori" | "Marka";
};

const listingLinks: ListingLink[] = [
  { label: "Tüm Ürünler", href: "/tum-urunler", group: "Kategori" },
  { label: "3D Yazıcılar", href: "/3d-yazicilar", group: "Kategori" },
  {
    label: "Dental Reçineler",
    href: "/dental-3d-yazici-recineleri",
    group: "Kategori",
  },
  {
    label: "Yıkama & Kürleme",
    href: "/yikama-kurleme-cihazlari",
    group: "Kategori",
  },
  {
    label: "Masaüstü Tarayıcılar",
    href: "/masasustu-tarayicilar",
    group: "Kategori",
  },
  { label: "Zirkon Bloklar", href: "/zirkon-bloklar", group: "Kategori" },
  { label: "Dental Fırınlar", href: "/dental-firinlar", group: "Kategori" },
  {
    label: "Yedek Parçalar",
    href: "/3d-yazici-yedek-parcalari",
    group: "Kategori",
  },
];

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

function isActiveListingLink(
  link: ListingLink,
  pageTitle: string,
  eyebrow: string | undefined,
) {
  const page = normalizedText(pageTitle);
  const label = normalizedText(link.label);
  const isAllProducts =
    label === "tüm ürünler" && (page === "ürünler" || page === "tüm ürünler");
  const isBrand = normalizedText(eyebrow).includes("marka") && page === label;
  return isAllProducts || isBrand || page === label;
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

const listingFilterAliases: Record<string, string[]> = {
  "3d yazicilar": ["3d yazici", "3d printer", "printer", "yazici"],
  "dental recineler": ["dental recine", "recine", "resin"],
  "yikama kurleme": ["yikama", "kurleme", "wash", "cure"],
  "masaustu tarayicilar": [
    "masaustu tarayici",
    "tarayici",
    "scanner",
    "3shape",
  ],
  "zirkon bloklar": ["zirkon", "zircon", "blok"],
  "dental firinlar": ["dental firin", "firin", "oven", "furnace"],
  "yedek parcalar": ["yedek parca", "spare"],
  sistemler: ["sistem", "system"],
  "titanyum diskler": ["titanyum", "titanium", "disk"],
};

function listingFilterTerms(link: ListingLink) {
  const labelKey = searchKey(link.label);

  return Array.from(
    new Set([labelKey, ...(listingFilterAliases[labelKey] || [])]),
  ).filter(Boolean);
}

function filterProductsByListing(products: IkasProduct[], link: ListingLink) {
  if (searchKey(link.label) === "tum urunler") return products;

  const terms = listingFilterTerms(link);

  return products.filter((product) => {
    const categoryText = searchKey(
      product.categories
        ?.map((category) => category.name)
        .filter(Boolean)
        .join(" ") || "",
    );
    const brandText = searchKey(product.brand?.name || "");
    const haystack =
      link.group === "Marka"
        ? brandText
        : categoryText || productSearchText(product);

    return terms.some(
      (term) =>
        haystack.includes(term) ||
        (term.length > 4 && productSearchText(product).includes(term)),
    );
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
  const productList = props.productList;
  const products = productList?.data || [];
  const [searchValue, setSearchValue] = useState(
    productList?.searchKeyword || "",
  );
  const [activeFilterLabel, setActiveFilterLabel] = useState("Tüm Ürünler");
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const committedSearchRef = useRef(productList?.searchKeyword || "");
  const appliedUrlSearchRef = useRef(false);
  const unfilteredProductsRef = useRef<IkasProduct[]>(products);
  const sortControlRef = useRef<HTMLLabelElement>(null);
  const sortOptions = productList ? getProductListSortOptions(productList) : [];
  const selectedSort =
    sortOptions.find((option) => option.isSelected)?.value || "";
  const selectedSortLabel =
    localizeSortLabel(sortOptions.find((option) => option.value === selectedSort)?.label) ||
    props.sortLabel ||
    "Sırala";
  const pageTitle =
    props.titleText ||
    productList?.category?.name ||
    productList?.brand?.name ||
    "Ürünler";
  const eyebrowText = props.eyebrowText?.trim() || "";
  const categoryLinks = listingLinks.filter(
    (link) => link.group === "Kategori",
  );
  const activeListingFilter =
    listingLinks.find((link) => link.label === activeFilterLabel) ||
    categoryLinks[0];
  const isAllProductsFilter =
    !activeListingFilter ||
    searchKey(activeListingFilter.label) === "tum urunler";
  const isCategoryProductsPage =
    normalizedText(eyebrowText) === "ürün kategorisi";
  const isDentalResinCategoryPage =
    isCategoryProductsPage && normalizedText(pageTitle) === "dental reçineler";
  const showSearchControl = props.showSearch !== false;
  const showSortControl =
    !isCategoryProductsPage &&
    props.showSort !== false &&
    sortOptions.length > 0;
  const showListControls = showSearchControl || showSortControl;
  const showNavigationControls =
    !isCategoryProductsPage && props.showNavigation !== false;
  const displayEyebrowText =
    eyebrowText ||
    (isCategoryProductsPage ? "ÜRÜN KATEGORİSİ" : "CANLI ÜRÜN KATALOĞU");
  const trimmedSearch = searchValue.trim();
  const fallbackProducts =
    unfilteredProductsRef.current.length > 0
      ? unfilteredProductsRef.current
      : products;
  const productSource = products.length > 0 ? products : fallbackProducts;
  const filteredByListing =
    activeListingFilter && !isAllProductsFilter
      ? filterProductsByListing(productSource, activeListingFilter)
      : productSource;
  const displayedProducts = trimmedSearch
    ? filterProducts(filteredByListing, trimmedSearch)
    : filteredByListing;
  const showProductSkeletons = Boolean(productList?.isLoading) && displayedProducts.length === 0;

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
                <p className="tm-products-eyebrow">{displayEyebrowText}</p>
                <h1>{pageTitle}</h1>
                <p>
                  {props.descriptionText ||
                    "Güncel ürün kataloğunu keşfedin; yayındaki ürünleri tek yerden inceleyin."}
                </p>
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
                  <span className="is-active">Filtreler</span>
                </div>
                <nav
                  className="tm-products-nav"
                  aria-label="Ürün kategori ve marka filtreleri"
                >
                  {categoryLinks.map((link) => (
                    <button
                      type="button"
                      className={
                        activeFilterLabel === link.label ||
                        (isAllProductsFilter &&
                          isActiveListingLink(link, pageTitle, props.eyebrowText))
                          ? "is-active"
                          : ""
                      }
                      data-group={link.group}
                      aria-pressed={activeFilterLabel === link.label}
                      onClick={() => setActiveFilterLabel(link.label)}
                      key={`${link.group}-${link.label}`}
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
