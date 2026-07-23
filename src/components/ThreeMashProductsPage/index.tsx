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
  { label: "Dental Reçineler", href: "/dental-3d-yazici-recineleri", group: "Kategori" },
  { label: "Yıkama & Kürleme", href: "/yikama-kurleme-cihazlari", group: "Kategori" },
  { label: "Masaüstü Tarayıcılar", href: "/masasustu-tarayicilar", group: "Kategori" },
  { label: "Zirkon Bloklar", href: "/zirkon-bloklar", group: "Kategori" },
  { label: "Dental Fırınlar", href: "/dental-firinlar", group: "Kategori" },
  { label: "Yedek Parçalar", href: "/3d-yazici-yedek-parcalari", group: "Kategori" },
  { label: "Sistemler", href: "/sistemler", group: "Kategori" },
  { label: "Titanyum Diskler", href: "/titanyum-diskler", group: "Kategori" },
  { label: "MASH", href: "/mash-marka", group: "Marka" },
  { label: "CRS", href: "/crs", group: "Marka" },
  { label: "3Shape", href: "/3shape", group: "Marka" },
  { label: "Creality", href: "/creality", group: "Marka" },
  { label: "Argen", href: "/argen", group: "Marka" },
  { label: "Nabertherm", href: "/nabertherm", group: "Marka" },
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

function isActiveListingLink(link: ListingLink, pageTitle: string, eyebrow: string | undefined) {
  const page = normalizedText(pageTitle);
  const label = normalizedText(link.label);
  const isAllProducts = label === "tüm ürünler" && (page === "ürünler" || page === "tüm ürünler");
  const isBrand = normalizedText(eyebrow).includes("marka") && page === label;
  return isAllProducts || isBrand || page === label;
}

function activeGroup(pageTitle: string, eyebrow: string | undefined) {
  if (normalizedText(eyebrow).includes("marka")) return "Marka";
  if (normalizedText(pageTitle) === "ürünler") return "Kategori";
  return "Kategori";
}

function themeToken(value: string | undefined, defaultValue: string, tokenName: string) {
  const trimmed = value?.trim();
  if (trimmed && trimmed.toLowerCase() !== defaultValue.toLowerCase()) return trimmed;
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

function productSearchText(product: IkasProduct) {
  const categoryNames = product.categories?.map((category) => category.name).filter(Boolean).join(" ") || "";
  const variantSkus = product.variants?.map((variant) => variant.sku).filter(Boolean).join(" ") || "";
  return searchKey(`${product.name} ${product.brand?.name || ""} ${categoryNames} ${variantSkus}`);
}

function filterProducts(products: IkasProduct[], query: string) {
  const key = searchKey(query);
  if (!key) return products;
  return products.filter((product) => productSearchText(product).includes(key));
}

function ProductCard({ product, props, isCategoryPage = false }: { product: IkasProduct; props: Props; isCategoryPage?: boolean }) {
  const variant = safeVariant(product);
  const media = variant ? getProductVariantMainImage(variant) : undefined;
  const image = media?.image;
  const hasDiscount = variant ? hasProductVariantDiscount(variant) : false;
  const firstCategory = product.categories?.[0]?.name;
  const price = variant ? getProductVariantFormattedFinalPrice(variant) : "";
  const comparePrice = variant && hasDiscount ? getProductVariantFormattedSellPrice(variant) : "";

  return (
    <a className={`tm-products-card${isCategoryPage ? " is-category-card" : ""}`} href={getProductHref(product)}>
      <div className="tm-products-card-media">
        <div className="tm-products-card-badges">
          {hasDiscount ? <span>{props.discountText || "İndirim"}</span> : null}
        </div>
        {image ? (
          media?.isVideo ? (
            <video src={getDefaultSrc(image)} muted playsInline loop autoPlay />
          ) : (
            <img
              src={getDefaultSrc(image)}
              srcSet={createMediaSrcset(image)}
              alt={image.altText || product.name}
              loading="lazy"
              decoding="async"
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
          {firstCategory ? <span>{firstCategory}</span> : <span>{props.fallbackCategoryText || "3MASH"}</span>}
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
            {price ? <strong>{price}</strong> : <strong>{props.priceRequestText || "Teklif Alın"}</strong>}
            {comparePrice ? <span>{comparePrice}</span> : null}
          </div>
          <em>{props.viewProductText || "Ürünü İncele"}</em>
        </div>
      </div>
    </a>
  );
}

export function ThreeMashProductsPage(props: Props) {
  const productList = props.productList;
  const products = productList?.data || [];
  const [searchValue, setSearchValue] = useState(productList?.searchKeyword || "");
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const committedSearchRef = useRef(productList?.searchKeyword || "");
  const appliedUrlSearchRef = useRef(false);
  const unfilteredProductsRef = useRef<IkasProduct[]>(products);
  const sortControlRef = useRef<HTMLLabelElement>(null);
  const sortOptions = productList ? getProductListSortOptions(productList) : [];
  const selectedSort = sortOptions.find((option) => option.isSelected)?.value || "";
  const selectedSortLabel = sortOptions.find((option) => option.value === selectedSort)?.label || props.sortLabel || "Sırala";
  const pageTitle = props.titleText || productList?.category?.name || productList?.brand?.name || "Ürünler";
  const currentGroup = activeGroup(pageTitle, props.eyebrowText);
  const categoryLinks = listingLinks.filter((link) => link.group === "Kategori");
  const brandLinks = listingLinks.filter((link) => link.group === "Marka");
  const isCategoryProductsPage = normalizedText(props.eyebrowText) === "ürün kategorisi";
  const showSearchControl = props.showSearch !== false;
  const showSortControl = !isCategoryProductsPage && props.showSort !== false && sortOptions.length > 0;
  const showListControls = showSearchControl || showSortControl;
  const showNavigationControls = !isCategoryProductsPage && props.showNavigation !== false;
  const trimmedSearch = searchValue.trim();
  const fallbackProducts = unfilteredProductsRef.current.length > 0 ? unfilteredProductsRef.current : products;
  const displayedProducts = trimmedSearch ? filterProducts(products.length > 0 ? products : fallbackProducts, trimmedSearch) : products;

  const style = {
    "--tm-products-bg": themeToken(props.backgroundColor, "#f6f7f3", "--tm-theme-bg"),
    "--tm-products-text": themeToken(props.textColor, "#10120f", "--tm-theme-text"),
    "--tm-products-muted": themeToken(props.mutedTextColor, "#64695f", "--tm-theme-muted"),
    "--tm-products-card": themeToken(props.cardColor, "#ffffff", "--tm-theme-panel"),
    "--tm-products-line": themeToken(props.lineColor, "#dfe3da", "--tm-theme-line"),
    "--tm-products-accent": themeToken(props.accentColor, "#c7f136", "--tm-theme-accent"),
  } as any;

  useEffect(() => {
    if (!trimmedSearch && products.length > 0) {
      unfilteredProductsRef.current = products;
    }
  }, [products, trimmedSearch]);

  useEffect(() => {
    if (!productList || typeof window === "undefined" || appliedUrlSearchRef.current) return;
    const param = props.searchQueryParam || "q";
    const query = new URLSearchParams(window.location.search).get(param)?.trim() || "";
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
    if (searchValue === committedSearchRef.current && searchKey(nextSearch) !== searchKey(searchValue)) {
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
    <section className={`three-mash-products-page${isCategoryProductsPage ? " is-category-products-page" : ""}`} style={style}>
      <div className="tm-products-wrap">
        <div className="tm-products-head">
          <div>
            {isCategoryProductsPage ? (
              <h1>{pageTitle}</h1>
            ) : (
              <>
                {props.eyebrowText ? <p className="tm-products-eyebrow">{props.eyebrowText}</p> : null}
                <h1>{pageTitle}</h1>
                <p>
                  {props.descriptionText ||
                    "ikas envanterindeki aktif ürünler bu sayfada canlı olarak listelenir."}
                </p>
              </>
            )}
          </div>
        </div>

        {!productList ? (
          <div className="tm-products-setup">
            {props.setupMessage ||
              "Bu sayfanın canlı ürünleri göstermesi için ikas editörde Product List alanını All Products veya ilgili kategori olarak bağlayın."}
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
                        placeholder={props.searchPlaceholder || "Ürün adı, marka veya SKU"}
                        onInput={handleSearch}
                        onKeyDown={handleSearchKeyDown}
                      />
                      <span className="tm-products-search-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" focusable="false">
                          <circle cx="11" cy="11" r="7" />
                          <line x1="16.5" y1="16.5" x2="21" y2="21" />
                        </svg>
                      </span>
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
                      <svg viewBox="0 0 12 8" aria-hidden="true" focusable="false">
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
                            className={option.value === selectedSort ? "is-selected" : ""}
                            onClick={() => handleSortValue(option.value as IkasProductListSortType)}
                            key={option.value}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </label>
                ) : null}
              </div>
            ) : null}

            {showNavigationControls ? (
              <div className="tm-products-nav-shell">
                <div className="tm-products-nav-tabs" aria-label="Liste türü">
                  <span className={currentGroup === "Kategori" ? "is-active" : ""}>Kategoriler</span>
                  <span className={currentGroup === "Marka" ? "is-active" : ""}>Markalar</span>
                </div>
                <nav className="tm-products-nav" aria-label="Ürün kategori ve marka geçişleri">
                  {[...categoryLinks, ...brandLinks].map((link) => (
                    <a
                      href={link.href}
                      className={isActiveListingLink(link, pageTitle, props.eyebrowText) ? "is-active" : ""}
                      data-group={link.group}
                      key={`${link.group}-${link.label}`}
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>
            ) : null}

            {displayedProducts.length > 0 ? (
              <div className="tm-products-grid">
                {displayedProducts.map((product) => (
                  <ProductCard product={product} props={props} isCategoryPage={isCategoryProductsPage} key={product.id} />
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
