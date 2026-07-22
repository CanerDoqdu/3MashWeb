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
import { Props } from "./types";

function inlineHtml(value?: string) {
  return { __html: value || "" };
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

function ProductDetailFooter() {
  return (
    <footer className="tmpdl-site-footer">
      <div className="tmpdl-site-footer-inner">
        <a className="tmpdl-footer-logo" href="/" aria-label="3mash store">
          <img src={threeMashLogoImage} alt="3mash store" />
        </a>
        <nav aria-label="Footer menü">
          <a href="/tum-urunler">Tüm Ürünler</a>
          <a href="/pages/about-us">Hakkımızda</a>
          <a href="/pages/iletisim">İletişim</a>
          <a href="/blog">Blog</a>
        </nav>
        <span>© 2026 3Mash</span>
      </div>
    </footer>
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
                            {variantType.displayedVariantValues.map((item) => (
                              <button
                                type="button"
                                className={item.isSelected ? "is-selected" : ""}
                                disabled={!item.hasStock}
                                onClick={() => {
                                  selectVariantValue(product, item.variantValue, true);
                                  setSelectedImageIndex(0);
                                  setMessage("");
                                  setVersion((current) => current + 1);
                                }}
                                key={item.variantValue.id}
                              >
                                {item.variantValue.name}
                              </button>
                            ))}
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

              <div className="tmpdl-data-map">
                <h2>Bu Şablonda ikas Alanları</h2>
                <div>
                  <span>Ürün başlığı</span>
                  <b>ikas ürün adı</b>
                </div>
                <div>
                  <span>Fiyat</span>
                  <b>ikas varyant fiyatı / aktif TL fiyat listesi</b>
                </div>
                <div>
                  <span>Görsel galeri</span>
                  <b>ikas ürün görselleri ve video medyaları</b>
                </div>
                <div>
                  <span>Ürün açıklaması</span>
                  <b>ikas ürün açıklaması alanı</b>
                </div>
                <div>
                  <span>Video</span>
                  <b>ürün medyasına video eklenirse galeride ve aşağıdaki video alanında görünür</b>
                </div>
              </div>

              {videoMedia?.image ? (
                <section className="tmpdl-video-section">
                  <h2>Ürün Videosu</h2>
                  <video src={getDefaultSrc(videoMedia.image)} controls playsInline />
                </section>
              ) : null}

              <div className="tmpdl-fixed-buy">
                <button type="button" disabled={!isInStock || isAdding} onClick={handleAddToCart}>
                  {isAdding ? props.addingToCartText || "Ekleniyor..." : props.addToCartText || "SEPETE EKLE"}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
      <ProductDetailFooter />
    </>
  );
}

export default ThreeMashProductDetailLive;
