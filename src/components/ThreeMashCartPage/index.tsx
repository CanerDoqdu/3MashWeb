import { useEffect, useState } from "preact/hooks";
import {
  cartStore,
  changeItemQuantity,
  customerStore,
  getCart,
  getCheckoutUrlFromCartStore,
  getCouponCodeForm,
  getOrderLineItemFormattedFinalPriceWithQuantity,
  getOrderLineItemFormattedFinalUnitPrice,
  initCouponCodeForm,
  initCustomerStore,
  removeCouponCodeForm,
  removeItem,
  setCouponCodeFormCouponCode,
  submitCouponCodeForm,
  waitForCartStoreInit,
  type IkasCart,
  type IkasCustomer,
  type IkasOrderLineItem,
} from "@ikas/bp-storefront";
import {
  hydrateMissingOrderLineImageFallbacks,
  orderLineImageUrl,
  orderLineImageUrlCandidates,
} from "../ThreeMashOrderLineImage";
import type { Props } from "./types";
import {
  getCurrentCart,
  hasCartItemsInMemory,
  initGlobalCart,
  isCartInitialized,
  publishCartFromIkasStore,
  refreshGlobalCart,
  subscribeCart,
} from "../cartState";
import { t, tLocalized, tProp, isEnglishLocale, localizedHref } from "../../utils/i18n";
import { safeCheckoutHref, safeNavigationHref } from "../../utils/safeRedirect";

const categoryProductsPageHref = "/dental-3d-yazici-recineleri";
const legacyContinueShoppingHrefs = new Set([
  "/2tplvqpo-category-products-page",
  tLocalized("/tum-urunler", "/tum-urunler"),
  "/search",
  "/cart",
]);

function text(value: string | undefined, fallbackTr: string, fallbackEn?: string) {
  return tProp(value, fallbackTr, fallbackEn || fallbackTr);
}

function href(value: string | undefined, fallback: string) {
  return localizedHref(safeNavigationHref(value, fallback));
}


function continueShoppingTarget(value: string | undefined) {
  const next = safeNavigationHref(value, categoryProductsPageHref);
  return localizedHref(
    legacyContinueShoppingHrefs.has(next)
      ? categoryProductsPageHref
      : next
  );
}

function money(value: number | null | undefined, cart: IkasCart | null) {
  const symbol = cart?.currencySymbol || cart?.currencyCode || "";
  return `${symbol} ${Number(value || 0).toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`.trim();
}

function cartItemCount(items: IkasOrderLineItem[]) {
  return items.reduce((total, item) => total + Number(item.quantity || 0), 0);
}

function cartSubtotal(items: IkasOrderLineItem[]) {
  return items.reduce(
    (total, item) => total + Number(item.price || 0),
    0,
  );
}

function adjustmentValue(
  adjustment: NonNullable<IkasCart["orderAdjustments"]>[number],
  cart: IkasCart | null,
) {
  if (adjustment.amountType === "RATIO") {
    return `${adjustment.type === "DECREMENT" ? "-" : "+"}${adjustment.amount}%`;
  }

  const amount = adjustment.type === "DECREMENT"
    ? -adjustment.amount
    : adjustment.amount;
  return money(amount, cart);
}

function imageUrl(item: IkasOrderLineItem) {
  return orderLineImageUrl(item, 360);
}

function handleOrderLineImageError(event: Event, candidates: string[]) {
  const image = event.currentTarget as HTMLImageElement;
  const nextIndex = Number(image.dataset.imageIndex || 0) + 1;
  const next = candidates[nextIndex];

  if (next) {
    image.dataset.imageIndex = String(nextIndex);
    image.src = next;
    return;
  }

  image.style.display = "none";
  image.removeAttribute("src");
}

function productHref(item: IkasOrderLineItem) {
  const slug = item.variant?.slug?.trim();
  return slug ? localizedHref(`/${slug.replace(/^\/+/, "")}`) : "#";
}

function itemTitle(item: IkasOrderLineItem) {
  return item.variant?.name || tLocalized("Ürün", "Product");
}

function variantText(item: IkasOrderLineItem) {
  return (
    item.variant?.variantValues
      ?.map((value) => value.variantValueName)
      .filter(Boolean)
      .join(" / ") ||
    item.variant?.sku ||
    ""
  );
}

function CartLine({
  item,
  props,
  onChanged,
}: {
  item: IkasOrderLineItem;
  props: Props;
  onChanged: () => void;
}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState("");
  const imageCandidates = orderLineImageUrlCandidates(item, 360);
  const image = imageCandidates[0] || imageUrl(item);
  const detail = variantText(item);

async function updateQuantity(quantity: number) {
  if (isUpdating) return;

  setIsUpdating(true);
  setUpdateError("");

  try {
    await changeItemQuantity(
      item,
      quantity
    );

    publishCartFromIkasStore();

    void refreshGlobalCart();
  } catch {
    setUpdateError(tLocalized("Sepet güncellenemedi. Lütfen tekrar deneyin.", "The cart could not be updated. Please try again."));
  } finally {
    setIsUpdating(false);
  }
}

 async function remove(event: Event) {
  event.preventDefault();

  if (isUpdating) return;

  setIsUpdating(true);
  setUpdateError("");

try {
  await removeItem(item);

  publishCartFromIkasStore();

  void refreshGlobalCart();
} catch {
  setUpdateError(tLocalized("Ürün sepetten kaldırılamadı. Lütfen tekrar deneyin.", "The item could not be removed. Please try again."));
} finally {
  setIsUpdating(false);
}
}

  return (
    <article className="tmcart-item">
      <a className="tmcart-item-media" href={productHref(item)}>
        <span>{itemTitle(item).slice(0, 1)}</span>
        {image ? (
          <img
            src={image}
            alt={itemTitle(item)}
            loading="lazy"
            decoding="async"
            data-image-index="0"
            onError={(event) =>
              handleOrderLineImageError(event, imageCandidates)
            }
          />
        ) : null}
      </a>
      <div className="tmcart-item-copy">
        <a href={productHref(item)}>{itemTitle(item)}</a>
        {detail ? <small>{detail}</small> : null}
        <button
          type="button"
          onClick={remove}
          disabled={isUpdating}
          aria-label={tLocalized(`${itemTitle(item)} sepetten kaldır`, `Remove ${itemTitle(item)} from cart`)}
        >
          {text(props.removeText, tLocalized("Kaldır", "Remove"), "Remove")}
        </button>
        {updateError ? <p className="tmcart-error" role="alert" aria-live="assertive">{updateError}</p> : null}
      </div>
      <div className="tmcart-qty" aria-label={tLocalized("Adet", "Quantity")}>
        <span className="tmcart-qty-label">{tLocalized("Adet", "Quantity")}</span>
        <button
          type="button"
          disabled={isUpdating || item.quantity <= 1}
          onClick={() => updateQuantity(item.quantity - 1)}
        >
          -
        </button>
        <span className="tmcart-qty-value">{item.quantity}</span>
        <button
          type="button"
          disabled={isUpdating}
          onClick={() => updateQuantity(item.quantity + 1)}
        >
          +
        </button>
      </div>
      <div className="tmcart-price">
        <strong>{getOrderLineItemFormattedFinalPriceWithQuantity(item)}</strong>
        {Number(item.price || 0) !== 0 ? (
          <small>{getOrderLineItemFormattedFinalUnitPrice(item)}</small>
        ) : null}
      </div>
    </article>
  );
}

export function ThreeMashCartPage(props: Props) {
  const [customer, setCustomer] = useState<IkasCustomer | null>(
    customerStore.customer,
  );
const [cart, setCartState] =
  useState<IkasCart | null>(
    () => getCurrentCart()
  );

const [isCheckingOut, setIsCheckingOut] = useState(false);
const [isCartReady, setIsCartReady] = useState(
  () => isCartInitialized() || hasCartItemsInMemory()
);
const [checkoutError, setCheckoutError] = useState("");

const [couponCode, setCouponCode] = useState("");
const [couponLoading, setCouponLoading] = useState(false);
const [couponMessage, setCouponMessage] = useState("");
const [couponOpen, setCouponOpen] = useState(false);
  const couponForm = getCouponCodeForm(customerStore);

  useEffect(() => {
    initCouponCodeForm(couponForm);
  }, [couponForm]);

  useEffect(() => {
    if (couponCode) {
      setCouponCodeFormCouponCode(couponForm, couponCode);
    }
  }, [couponCode, couponForm]);

  function refreshState() {
    setCustomer(customerStore.customer);
    setCartState(cartStore.cart ? ({ ...cartStore.cart } as IkasCart) : null);
  }

  useEffect(() => {
  let mounted = true;

  const unsubscribe = subscribeCart(
    (nextCart) => {
      if (!mounted) return;

      setCartState(nextCart);
      setIsCartReady(true);
    }
  );

  // Customer ayrı initialize olsun.
  void initCustomerStore(
    customerStore
  ).then(() => {
    if (!mounted) return;

    setCustomer(
      customerStore.customer
    );
  });

  // Server cart arkada doğrulansın.
  void initGlobalCart().finally(() => {
    if (!mounted) return;
    setCartState(
      cartStore.cart
        ? ({ ...cartStore.cart } as IkasCart)
        : getCurrentCart(),
    );
    setIsCartReady(true);
  });

  return () => {
    mounted = false;
    unsubscribe();
  };
}, []);

  useEffect(() => {
  const syncCart = () => {
    setCartState(
      cartStore.cart
        ? ({ ...cartStore.cart } as IkasCart)
        : null
    );
    setIsCartReady(true);
  };

  window.addEventListener(
    "3mash-cart-updated",
    syncCart
  );

  return () => {
    window.removeEventListener(
      "3mash-cart-updated",
      syncCart
    );
  };
}, []);
const items =
  cart?.orderLineItems?.filter(
    (item) =>
      !item.deleted &&
      Number(item.quantity || 0) > 0
  ) || [];
  const itemCount = cartItemCount(items);
  const hasItems = items.length > 0;

  const style = {
    "--tmcart-bg": text(props.backgroundColor, "var(--tm-theme-bg, #fafaf7)"),
    "--tmcart-text": text(props.textColor, "var(--tm-theme-text, #0e0e0c)"),
    "--tmcart-muted": text(
      props.mutedTextColor,
      "var(--tm-theme-sub, #55554e)",
    ),
    "--tmcart-line": text(props.lineColor, "var(--tm-theme-line, #e6e6e0)"),
    "--tmcart-button-bg": text(
      props.buttonBackgroundColor,
      "var(--tm-theme-accent, #c7f136)",
    ),
    "--tmcart-button-text": text(
      props.buttonTextColor,
      "var(--tm-theme-text, #0e0e0c)",
    ),
  } as any; // CSS-in-JS: dynamic CSS custom properties for theme styling
async function applyCoupon() {
  const code = couponCode.trim();

  if (!code || !cartStore.cart || couponLoading) return;

  setCouponLoading(true);
  setCouponMessage("");
  setCouponCodeFormCouponCode(couponForm, code);

  try {
    const success = await submitCouponCodeForm(couponForm);
    await getCart();
    refreshState();

    if (success && cartStore.cart?.couponCode) {
      setCouponMessage(tLocalized("İndirim kodu uygulandı.", "Discount code applied."));
      setCouponOpen(false);
    } else {
      setCouponMessage(tLocalized("Geçersiz indirim kodu.", "Invalid discount code."));
    }
  } catch {
    setCouponMessage(tLocalized("Geçersiz indirim kodu.", "Invalid discount code."));
  } finally {
    setCouponLoading(false);
  }
}

async function deleteCoupon() {
  if (!cartStore.cart || couponLoading) return;

  setCouponLoading(true);
  setCouponMessage("");

  try {
    const success = await removeCouponCodeForm(couponForm);
    await getCart();
    refreshState();

    if (success) {
      setCouponCode("");
      setCouponOpen(false);
      setCouponMessage("");
    }
  } catch {
    setCouponMessage(tLocalized("Promosyon kodu kaldırılamadı.", "Promo code could not be removed."));
  } finally {
    setCouponLoading(false);
  }
}
  async function checkout() {
    if (isCheckingOut || !hasItems) return;
    setIsCheckingOut(true);
    setCheckoutError("");

    try {
      await waitForCartStoreInit(cartStore);
      await getCart();
      refreshState();

      const checkoutUrl = safeCheckoutHref(getCheckoutUrlFromCartStore(cartStore));
      if (!checkoutUrl) throw new Error("Checkout URL unavailable or unsafe");
      window.location.href = checkoutUrl;
    } catch {
      setCheckoutError(
        tLocalized(
          "Ödeme sayfasına yönlendirilemedi, lütfen tekrar deneyin.",
          "Could not open the checkout page. Please try again.",
        ),
      );
    } finally {
      setIsCheckingOut(false);
    }
  }

  const isLoading = !isCartReady && !hasItems;
  const isEmpty = isCartReady && !hasItems;

  return (
    <section
      className={`three-mash-cart-page ${
        isLoading ? "tmcart-is-loading" : isEmpty ? "tmcart-is-empty" : ""
      }`.trim()}
      style={style}
    >
      <div className="tmcart-wrap">
        <header className="tmcart-head">
          <h1>{text(props.titleText, tLocalized("Sepetim", "My Cart"), "My Cart")}</h1>
          <p>
            {isLoading
              ? tLocalized("Sepetiniz yükleniyor...", "Loading your cart...")
              : tLocalized(
                  `${itemCount} ürün sepetinizde. Siparişi tamamlamadan önce ürünleri ve adetleri kontrol edin.`,
                  `${itemCount} items in your cart. Check your items and quantities before checking out.`
                )}
          </p>
        </header>

        <div className="tmcart-shell">
          <div className="tmcart-list">
            {isLoading ? (
              <div className="tmcart-loading-message">
                <span className="tmcart-spinner" aria-hidden="true" />
              </div>
            ) : isEmpty ? (
              <div className="tmcart-empty-message">
                {tLocalized("Sepetiniz boş.", "Your cart is empty.")}
              </div>
            ) : (
              items.map((item) => (
                <CartLine
                  item={item}
                  props={props}
                  onChanged={refreshState}
                  key={item.id}
                />
              ))
            )}
          </div>

          <aside className="tmcart-summary">
            <h2>{tLocalized("Sipariş Özeti", "Order Summary")}</h2>

            <div className="tmcart-summary-row">
              <span>{text(props.subtotalText, tLocalized("Ara Toplam", "Subtotal"), "Subtotal")}</span>
              <strong>{money(hasItems ? cartSubtotal(items) : 0, cart)}</strong>
            </div>

            {hasItems && cart?.orderAdjustments?.filter((adjustment) => Number(adjustment.amount || 0) !== 0).map((adjustment) => (
              <div className="tmcart-summary-row" key={`${adjustment.name}-${adjustment.order}`}>
                <span>{adjustment.name || tLocalized("Düzeltme", "Adjustment")}</span>
                <strong>{adjustmentValue(adjustment, cart)}</strong>
              </div>
            ))}

            {hasItems && cart?.taxLines?.filter((taxLine) => Number(taxLine.price || 0) !== 0).map((taxLine) => (
              <div className="tmcart-summary-row" key={`${taxLine.rate}-${taxLine.price}`}>
                <span>{`${tLocalized("Vergi", "Tax")} (${taxLine.rate}%)`}</span>
                <strong>{money(taxLine.price, cart)}</strong>
              </div>
            ))}

            <div className="tmcart-summary-row tmcart-summary-total">
              <span>{tLocalized("Toplam", "Total")}</span>
              <strong>{money(hasItems ? cart?.totalFinalPrice : 0, cart)}</strong>
            </div>

            <div className="tmcart-coupon-slot">
              {hasItems && cart?.couponCode ? (
                <div className="tmcart-coupon-applied">
                  <span>
                    <b>{cart.couponCode}</b> {tLocalized("uygulandı", "applied")}
                  </span>

                  <button
                    type="button"
                    aria-label={tLocalized("Promosyon kodunu kaldır", "Remove promo code")}
                    onClick={() => void deleteCoupon()}
                    disabled={couponLoading}
                  >
                    ×
                  </button>
                </div>
              ) : hasItems && couponOpen ? (
                <div className="tmcart-coupon-entry">
                  <input
                    autoFocus
                    type="text"
                    value={couponCode}
                    placeholder={tLocalized("Promosyon kodu giriniz", "Enter promo code")}
                    onInput={(event) =>
                      setCouponCode(
                        (event.currentTarget as HTMLInputElement).value
                      )
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        void applyCoupon();
                      }

                      if (event.key === "Escape") {
                        setCouponOpen(false);
                        setCouponCode("");
                        setCouponMessage("");
                      }
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => void applyCoupon()}
                    disabled={couponLoading || !couponCode.trim()}
                  >
                    {couponLoading ? "..." : tLocalized("KULLAN", "APPLY")}
                  </button>
                  {couponMessage ? <p className="tmcart-error" role="alert" aria-live="assertive">{couponMessage}</p> : null}
                </div>
              ) : (
                <button
                  type="button"
                  className="tmcart-coupon-start"
                  onClick={() => hasItems && setCouponOpen(true)}
                  disabled={!hasItems}
                >
                  {tLocalized("Promosyon kodu ekle", "Add promo code")}
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={checkout}
              disabled={isCheckingOut}
            >
              <span>
                {hasItems
                  ? text(props.checkoutButtonText, tLocalized("ALIŞVERİŞİ TAMAMLA", "PROCEED TO CHECKOUT"), "PROCEED TO CHECKOUT")
                  : text(props.checkoutButtonText, tLocalized("SATIN AL", "CHECKOUT"), "CHECKOUT")}
              </span>

              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z" />
              </svg>
            </button>

            {checkoutError ? (
              <p className="tmcart-error" role="alert" aria-live="assertive">{checkoutError}</p>
            ) : null}

            <a href={continueShoppingTarget(props.continueShoppingHref)}>
              {text(props.continueShoppingText, tLocalized("Alışverişe devam et", "Continue shopping"), "Continue shopping")}
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default ThreeMashCartPage;
