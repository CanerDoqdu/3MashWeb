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
import { rememberOrderLineImageFallback } from "../ThreeMashOrderLineImage";
import { Props } from "./types";

type PlainObject = Record<string, unknown>;

function inlineHtml(value?: string) {
  return { __html: value || "" };
}

function isPlainObject(value: unknown): value is PlainObject {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
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

function normalizedVariantText(value: string | undefined) {
  return (value || "")
    .toLocaleLowerCase("tr")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizedVariantKey(value: string | undefined) {
  return normalizedVariantText(value)
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9.]+/g, "");
}

const ZIRCON_SHADE_COLORS: Record<string, string> = {
  a1: "#ede9d0",
  a2: "#ede9d0",
  a3: "#ede9d0",
  "a3.5": "#e4dcc2",
  a4: "#d2c99a",
  b1: "#efead4",
  b2: "#ebe3c7",
  b3: "#e1d7b2",
  b4: "#e1d6b5",
  c1: "#e1d6b5",
  c2: "#e1d6b5",
  c3: "#e5dbc3",
  c4: "#d2c99a",
  d2: "#dcd4b4",
  d3: "#d1c2a3",
  d4: "#d1c2a3",
  om1: "#fffefe",
  om2: "#fffefe",
  om3: "#fffefe",
  white: "#ffffff",
};

function cssColorValue(value: unknown): string {
  if (typeof value !== "string") return "";
  const text = value.trim();
  if (/^(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(text)) return `#${text}`;
  const isSafeColor =
    /^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(text) ||
    /^rgba?\(\s*[\d.\s,%]+\)$/i.test(text) ||
    /^hsla?\(\s*[\d.\s,%degturnrad]+\)$/i.test(text) ||
    /^[a-z]+$/i.test(text);
  return isSafeColor ? text : "";
}

function variantColorCode(variantValue: unknown): string {
  if (!isPlainObject(variantValue)) return "";
  return cssColorValue(variantValue.colorCode);
}

function colorForVariantValue(product: IkasProduct, variantType: unknown, variantValue: unknown) {
  const direct = variantColorCode(variantValue);
  if (direct) return direct;

  const valueName = isPlainObject(variantValue) && typeof variantValue.name === "string" ? variantValue.name : "";
  const shadeColor = ZIRCON_SHADE_COLORS[normalizedVariantKey(valueName)];
  if (shadeColor) return shadeColor;

  const valueId = isPlainObject(variantValue) && typeof variantValue.id === "string" ? variantValue.id : "";
  if (!valueId) return "";

  const typeData = variantType as { variantType?: { values?: unknown[] } } | undefined;
  const typeMatch = typeData?.variantType?.values?.find((value) => isPlainObject(value) && value.id === valueId);
  const typeColor = variantColorCode(typeMatch);
  if (typeColor) return typeColor;

  for (const productVariantType of product.variantTypes || []) {
    const match = productVariantType.variantType.values?.find((value) => value.id === valueId);
    const color = variantColorCode(match);
    if (color) return color;
  }

  return "";
}

function isColorVariant(product: IkasProduct, variantType: unknown, valueName: string | undefined, variantValue?: unknown) {
  const typeName = (variantType as { variantType?: { name?: string } } | undefined)?.variantType?.name;
  const type = normalizedVariantText(typeName);
  return type.includes("renk") || type.includes("color") || Boolean(colorForVariantValue(product, variantType, variantValue));
}

function uniqueDisplayedVariantValues<T extends { variantValue?: { id?: string; name?: string }; isSelected?: boolean; hasStock?: boolean }>(
  items: T[],
) {
  const values = new Map<string, T>();

  for (const item of items) {
    const name = item.variantValue?.name || "";
    const key = normalizedVariantKey(name) || item.variantValue?.id || name;
    const current = values.get(key);
    if (!current || item.isSelected || (!current.hasStock && item.hasStock)) values.set(key, item);
  }

  return Array.from(values.values());
}

function themeToken(value: string | undefined, defaultValue: string, tokenName: string) {
  const trimmed = value?.trim();
  if (trimmed && trimmed.toLowerCase() !== defaultValue.toLowerCase()) return trimmed;
  return `var(${tokenName}, ${defaultValue})`;
}

export function ThreeMashSingleProduct(props: Props) {
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
      rememberOrderLineImageFallback(product, variant, image ? [getDefaultSrc(image)] : []);
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
    <section className="three-mash-single-product" style={style}>
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
                            {uniqueDisplayedVariantValues(variantType.displayedVariantValues).map((item) => (
                              (() => {
                                const color = colorForVariantValue(product, variantType, item.variantValue);
                                const isColor = isColorVariant(product, variantType, item.variantValue.name, item.variantValue);
                                return (
                                  <button
                                    type="button"
                                    className={`${item.isSelected ? "is-selected" : ""}${isColor ? " is-color-swatch" : ""}`}
                                    disabled={!item.hasStock}
                                    style={isColor ? { "--tmpdl-swatch": color || "#f6f1e7" } as any : undefined}
                                    onClick={() => {
                                      selectVariantValue(product, item.variantValue, true);
                                      setSelectedImageIndex(0);
                                      setMessage("");
                                      setVersion((current) => current + 1);
                                    }}
                                    aria-label={`${variantType.variantType.name}: ${item.variantValue.name}`}
                                    title={item.variantValue.name}
                                    key={item.variantValue.id}
                                  >
                                    <span>{item.variantValue.name}</span>
                                  </button>
                                );
                              })()
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
                    <span aria-hidden="true" />
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
  );
}

export default ThreeMashSingleProduct;
