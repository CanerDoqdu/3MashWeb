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

const categoryProductsPageHref = "/dental-3d-yazici-recineleri";
const legacyContinueShoppingHrefs = new Set([
  "/2tplvqpo-category-products-page",
  "/tum-urunler",
  "/search",
  "/cart",
]);

function text(value: string | undefined, fallback: string) {
  return value?.trim() || fallback;
}

function href(value: string | undefined, fallback: string) {
  const next = value?.trim();
  return next && next !== "#" ? next : fallback;
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
  return item.variant?.name || "Ürün";
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
    ? text(props.emptyButtonText, "ALIŞVERİŞE BAŞLA")
    : text(props.loginRequiredText, "GİRİŞ YAP");

  return (
    <div className="tmcart-wrap">
      <header className="tmcart-head">
        <span>SEPET</span>
        <h1>{text(props.titleText, "Sepetim")}</h1>
        <p>
          {count} ürün sepetinizde. Siparişi tamamlamadan önce ürünleri ve
          adetleri kontrol edin.
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
        <h2>Sepetiniz boş.</h2>
        <p>
          3mash ürünlerine geri dönerek ihtiyacınız olan cihaz, reçine veya sarf
          ürününü sepete ekleyin.
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
  const imageCandidates = orderLineImageUrlCandidates(item, 360);
  const image = imageCandidates[0] || imageUrl(item);
  const detail = variantText(item);

  async function updateQuantity(quantity: number) {
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      await changeItemQuantity(item, quantity);
      await getCart();
      onChanged();
    } finally {
      setIsUpdating(false);
    }
  }

  async function remove(event: Event) {
    event.preventDefault();
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      await removeItem(item);
      await getCart();
      onChanged();
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
          aria-label={`${itemTitle(item)} sepetten kaldır`}
        >
          {text(props.removeText, "Kaldır")}
        </button>
      </div>
      <div className="tmcart-qty" aria-label="Adet">
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
  const [cart, setCartState] = useState<IkasCart | null>(cartStore.cart);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
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
    Promise.all([
      initCustomerStore(customerStore),
      waitForCartStoreInit(cartStore),
    ])
      .then(async () => {
        await getCart();
        await hydrateMissingOrderLineImageFallbacks(
          cartStore.cart?.orderLineItems || [],
        );
      })
      .finally(() => {
        if (!mounted) return;
        refreshState();
      });

    return () => {
      mounted = false;
    };
  }, []);

  const items = cart?.orderLineItems?.filter((item) => !item.deleted) || [];
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
  } as any;
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
      setCouponMessage("İndirim kodu uygulandı.");
    } else {
      setCouponMessage("Geçersiz indirim kodu.");
    }
  } catch {
    setCouponMessage("Geçersiz indirim kodu.");
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

    try {
      await waitForCartStoreInit(cartStore);
      await getCart();
      refreshState();

      const checkoutUrl = getCheckoutUrlFromCartStore(cartStore);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } finally {
      setIsCheckingOut(false);
    }
  }

  if (!hasItems) {
    return (
      <section className="three-mash-cart-page" style={style}>
        <EmptyCart
          props={props}
          count={itemCount}
          isLoggedIn={Boolean(customer)}
        />
      </section>
    );
  }

  return (
    <section className="three-mash-cart-page" style={style}>
      <div className="tmcart-wrap">
        <header className="tmcart-head">
          <span>SEPET</span>
          <h1>{text(props.titleText, "Sepetim")}</h1>
          <p>
            {itemCount} ürün sepetinizde. Siparişi tamamlamadan önce ürünleri ve
            adetleri kontrol edin.
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
            <h2>Sipariş Özeti</h2>
            <div className="tmcart-summary-row">
              <span>{text(props.subtotalText, "Ara Toplam")}</span>
              <strong>{money(cart?.totalFinalPrice, cart)}</strong>
            </div>

            <div className="tmcart-summary-row tmcart-summary-total">
              <span>Toplam</span>
              <strong>{money(cart?.totalFinalPrice, cart)}</strong>
            </div>
             <div className="tmcart-coupon-slot">
  {cart?.couponCode ? (
    <div className="tmcart-coupon-applied">
      <span>
        <b>{cart.couponCode}</b> uygulandı
      </span>

      <button
        type="button"
        aria-label="Promosyon kodunu kaldır"
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
        placeholder="Promosyon kodu giriniz"
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
        {couponLoading ? "..." : "KULLAN"}
      </button>
    </div>
  ) : (
    <button
      type="button"
      className="tmcart-coupon-start"
      onClick={() => setCouponOpen(true)}
    >
      Promosyon kodu ekle
    </button>
  )}
</div>
            
            
            <button type="button" onClick={checkout} disabled={isCheckingOut}>
              <span>
                {text(props.checkoutButtonText, "ALIŞVERİŞİ TAMAMLA")}
              </span>
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z" />
              </svg>
            </button>
            <a href={continueShoppingTarget(props.continueShoppingHref)}>
              {text(props.continueShoppingText, "Alışverişe devam et")}
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default ThreeMashCartPage;
