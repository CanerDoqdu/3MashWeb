import { useEffect, useState } from "preact/hooks";
import {
  cartStore,
  changeItemQuantity,
  customerStore,
  getCart,
  saveCouponCode,
removeCouponCode,
  getCheckoutUrlFromCartStore,
  getOrderLineItemFormattedFinalPriceWithQuantity,
  getOrderLineItemFormattedFinalUnitPrice,
  initCustomerStore,
  removeItem,
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
  initGlobalCart,
   publishCartFromIkasStore,
  refreshGlobalCart,
  subscribeCart,
} from "../cartState";
import { t, tLocalized, tProp, isEnglishLocale } from "../../utils/i18n";
import { safeNavigationHref } from "../../utils/safeRedirect";

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
  return safeNavigationHref(value, fallback);
}


function continueShoppingTarget(value: string | undefined) {
  const next = href(value, categoryProductsPageHref);
  return legacyContinueShoppingHrefs.has(next)
    ? categoryProductsPageHref
    : next;
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
  return slug ? `/${slug.replace(/^\/+/, "")}` : "#";
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

function EmptyCart({
  props,
  count,
  isLoggedIn,
}: {
  props: Props;
  count: number;
  isLoggedIn: boolean;
}) {
  const buttonHref = isLoggedIn
    ? continueShoppingTarget(props.emptyButtonHref)
    : href(props.loginHref, "/account/login");
  const buttonText = isLoggedIn
    ? text(props.emptyButtonText, tLocalized("ALIŞVERİŞE BAŞLA", "START SHOPPING"), "START SHOPPING")
    : text(props.loginRequiredText, tLocalized("GİRİŞ YAP", "SIGN IN"), "SIGN IN");

  return (
    <div className="tmcart-wrap">
      <header className="tmcart-head">
        <span>{tLocalized("SEPET", "CART")}</span>
        <h1>{text(props.titleText, tLocalized("Sepetim", "My Cart"), "My Cart")}</h1>
        <p>
          {tLocalized(
            `${count} ürün sepetinizde. Siparişi tamamlamadan önce ürünleri ve adetleri kontrol edin.`,
            `${count} items in your cart. Check your items and quantities before checking out.`
          )}
        </p>
      </header>
      <div className="tmcart-empty">
        <svg
          className="tmcart-empty-icon"
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 576 512"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z" />
        </svg>
        <h2>{tLocalized("Sepetiniz boş.", "Your cart is empty.")}</h2>
        <p>
          {tLocalized(
            "3mash ürünlerine geri dönerek ihtiyacınız olan cihaz, reçine veya sarf malzemelerini sepetinize ekleyebilirsiniz.",
            "Explore 3mash products to add 3D printers, resins or consumables to your cart."
          )}
        </p>
      </div>
      <a className="tmcart-empty-button" href={buttonHref}>
        {buttonText}
      </a>
    </div>
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
        <button
          type="button"
          disabled={isUpdating || item.quantity <= 1}
          onClick={() => updateQuantity(item.quantity - 1)}
        >
          -
        </button>
        <span>{item.quantity}</span>
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
        <small>{getOrderLineItemFormattedFinalUnitPrice(item)}</small>
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
const [isCartReady, setIsCartReady] = useState(false);
const [checkoutError, setCheckoutError] = useState("");

const [couponCode, setCouponCode] = useState("");
const [couponLoading, setCouponLoading] = useState(false);
const [couponMessage, setCouponMessage] = useState("");
const [couponOpen, setCouponOpen] = useState(false);

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

  // Cached/global cart zaten ilk render'da hazır.
  setIsCartReady(true);

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
  void initGlobalCart();

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

  try {
    await saveCouponCode(cartStore.cart, code);
    await getCart();
    refreshState();

    if (cartStore.cart?.couponCode) {
      setCouponMessage(tLocalized("İndirim kodu uygulandı.", "Discount code applied."));
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
    await removeCouponCode(cartStore.cart);
    await getCart();
    refreshState();

    setCouponCode("");
    setCouponMessage("");
  } finally {
    setCouponLoading(false);
  }
}
  async function checkout() {
    if (isCheckingOut) return;
    setIsCheckingOut(true);
    setCheckoutError("");

    try {
      await waitForCartStoreInit(cartStore);
      await getCart();
      refreshState();

      const checkoutUrl = getCheckoutUrlFromCartStore(cartStore);
      if (!checkoutUrl) throw new Error("Checkout URL unavailable");
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
if (isCartReady && !hasItems) {
  return (
    <section
      className="three-mash-cart-page tmcart-is-empty"
      style={style}
    >
      <div className="tmcart-wrap">
        <header className="tmcart-head">
          <span>{tLocalized("SEPET", "CART")}</span>

          <h1>{text(props.titleText, tLocalized("Sepetim", "My Cart"), "My Cart")}</h1>

          <p>
            {tLocalized("0 ürün sepetinizde. Siparişi tamamlamadan önce ürünleri ve adetleri kontrol edin.", "0 items in your cart. Check your items and quantities before checking out."
            )}
          </p>
        </header>

        <div className="tmcart-shell">
          <div className="tmcart-list">
            <div className="tmcart-empty-message">
              {tLocalized("Sepetiniz boş.", "Your cart is empty.")}
            </div>
          </div>

          <aside className="tmcart-summary">
            <h2>{tLocalized("Sipariş Özeti", "Order Summary")}</h2>

            <div className="tmcart-summary-row">
              <span>{text(props.subtotalText, tLocalized("Ara Toplam", "Subtotal"), "Subtotal")}</span>
              <strong>{money(0, cart)}</strong>
            </div>

            <div className="tmcart-summary-row tmcart-summary-total">
              <span>{tLocalized("Toplam", "Total")}</span>
              <strong>{money(0, cart)}</strong>
            </div>

            <div className="tmcart-coupon-slot">
              <button
                type="button"
                className="tmcart-coupon-start"
                disabled
              >
                {tLocalized("Promosyon kodu ekle", "Add promo code")}
              </button>
            </div>

            <button type="button" disabled>
              <span>
                {text(props.checkoutButtonText, tLocalized("SATIN AL", "CHECKOUT"), "CHECKOUT")}
              </span>

              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z" />
              </svg>
            </button>

            <a href={continueShoppingTarget(props.continueShoppingHref)}>
              {text(props.continueShoppingText, tLocalized("Alışverişe devam et", "Continue shopping"), "Continue shopping")}
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}

  return (
    <section className="three-mash-cart-page" style={style}>
      <div className="tmcart-wrap">
        <header className="tmcart-head">
          <span>{tLocalized("SEPET", "CART")}</span>
          <h1>{text(props.titleText, tLocalized("Sepetim", "My Cart"), "My Cart")}</h1>
          <p>
            {tLocalized(
              `${itemCount} ürün sepetinizde. Siparişi tamamlamadan önce ürünleri ve adetleri kontrol edin.`,
              `${itemCount} items in your cart. Check your items and quantities before checking out.`
            )}
          </p>
        </header>
        <div className="tmcart-shell">
          <div className="tmcart-list">
            {items.map((item) => (
              <CartLine
                item={item}
                props={props}
                onChanged={refreshState}
                key={item.id}
              />
            ))}
          </div>

          <aside className="tmcart-summary">
            <h2>{tLocalized("Sipariş Özeti", "Order Summary")}</h2>
            <div className="tmcart-summary-row">
              <span>{text(props.subtotalText, tLocalized("Ara Toplam", "Subtotal"), "Subtotal")}</span>
              <strong>{money(cartSubtotal(items), cart)}</strong>
            </div>

            {cart?.orderAdjustments?.map((adjustment) => (
              <div className="tmcart-summary-row" key={`${adjustment.name}-${adjustment.order}`}>
                <span>{adjustment.name || tLocalized("Düzeltme", "Adjustment")}</span>
                <strong>{adjustmentValue(adjustment, cart)}</strong>
              </div>
            ))}

            {cart?.shippingLines?.map((shippingLine) => (
              <div className="tmcart-summary-row" key={`${shippingLine.title}-${shippingLine.shippingZoneRateId}`}>
                <span>{shippingLine.title || tLocalized("Kargo", "Shipping")}</span>
                <strong>{money(shippingLine.finalPrice, cart)}</strong>
              </div>
            ))}

            {cart?.taxLines?.map((taxLine) => (
              <div className="tmcart-summary-row" key={`${taxLine.rate}-${taxLine.price}`}>
                <span>{`${tLocalized("Vergi", "Tax")} (${taxLine.rate}%)`}</span>
                <strong>{money(taxLine.price, cart)}</strong>
              </div>
            ))}

            <div className="tmcart-summary-row tmcart-summary-total">
              <span>{tLocalized("Toplam", "Total")}</span>
              <strong>{money(cart?.totalFinalPrice, cart)}</strong>
            </div>
             <div className="tmcart-coupon-slot">
  {cart?.couponCode ? (
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
  ) : couponOpen ? (
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
    </div>
  ) : (
    <button
      type="button"
      className="tmcart-coupon-start"
      onClick={() => setCouponOpen(true)}
    >
      {tLocalized("Promosyon kodu ekle", "Add promo code")}
    </button>
  )}
</div>
            
            
            <button type="button" onClick={checkout} disabled={isCheckingOut}>
              <span>
                {text(props.checkoutButtonText, tLocalized("ALIŞVERİŞİ TAMAMLA", "PROCEED TO CHECKOUT"), "PROCEED TO CHECKOUT")}
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
