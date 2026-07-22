import { useEffect, useState } from "preact/hooks";
import {
  cartStore,
  changeItemQuantity,
  customerStore,
  getCart,
  getCheckoutUrlFromCartStore,
  getOrderLineItemFormattedFinalPriceWithQuantity,
  getOrderLineItemFormattedFinalUnitPrice,
  hasCart,
  initCustomerStore,
  removeItem,
  Router,
  waitForCartStoreInit,
  type IkasCart,
  type IkasCustomer,
  type IkasOrderLineItem,
} from "@ikas/bp-storefront";
import type { Props } from "./types";

function text(value: string | undefined, fallback: string) {
  return value?.trim() || fallback;
}

function href(value: string | undefined, fallback: string) {
  const next = value?.trim();
  return next && next !== "#" ? next : fallback;
}

function money(value: number | null | undefined, cart: IkasCart | null) {
  const symbol = cart?.currencySymbol || cart?.currencyCode || "";
  return `${symbol} ${Number(value || 0).toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`.trim();
}

function imageUrl(item: IkasOrderLineItem) {
  const id = item.variant?.mainImageId;
  return id ? `https://cdn.myikas.com/images/${id}/image_360.webp` : "";
}

function productHref(item: IkasOrderLineItem) {
  const slug = item.variant?.slug?.trim();
  return slug ? `/${slug.replace(/^\/+/, "")}` : "#";
}

function itemTitle(item: IkasOrderLineItem) {
  return item.variant?.name || "Ürün";
}

function variantText(item: IkasOrderLineItem) {
  return item.variant?.variantValues?.map((value) => value.variantValueName).filter(Boolean).join(" / ") || item.variant?.sku || "";
}

function EmptyCart({ props, count, isLoggedIn }: { props: Props; count: number; isLoggedIn: boolean }) {
  const buttonHref = isLoggedIn ? href(props.emptyButtonHref, "/tum-urunler") : href(props.loginHref, "/account/login");

  function navigate() {
    if (!isLoggedIn) {
      Router.navigateToPage("LOGIN");
      return;
    }

    window.location.href = buttonHref;
  }

  return (
    <div className="tmcart-wrap">
      <h1>{text(props.titleText, "Sepetim")} ( {count} )</h1>
      <div className="tmcart-empty">
        <div className="tmcart-empty-icon" aria-hidden="true">
          <span className="tmcart-empty-handle" />
          <span className="tmcart-empty-basket" />
          <span className="tmcart-empty-wheel tmcart-empty-wheel-left" />
          <span className="tmcart-empty-wheel tmcart-empty-wheel-right" />
        </div>
      </div>
      {!isLoggedIn ? <p className="tmcart-login-note">{text(props.loginRequiredText, "Sepetinizi görüntülemek için hesabınıza giriş yapın.")}</p> : null}
      <button className="tmcart-empty-button" type="button" onClick={navigate}>
        {text(props.emptyButtonText, "ALIŞVERİŞE BAŞLA")}
      </button>
    </div>
  );
}

function CartLine({ item, props, onChanged }: { item: IkasOrderLineItem; props: Props; onChanged: () => void }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const image = imageUrl(item);
  const detail = variantText(item);

  async function updateQuantity(quantity: number) {
    if (isUpdating) return;
    setIsUpdating(true);
    await changeItemQuantity(item, quantity);
    await getCart();
    setIsUpdating(false);
    onChanged();
  }

  async function remove(event: Event) {
    event.preventDefault();
    if (isUpdating) return;
    setIsUpdating(true);
    await removeItem(item);
    await getCart();
    setIsUpdating(false);
    onChanged();
  }

  return (
    <article className="tmcart-item">
      <a className="tmcart-item-media" href={productHref(item)}>
        {image ? <img src={image} alt={itemTitle(item)} loading="lazy" decoding="async" /> : <span>{itemTitle(item).slice(0, 1)}</span>}
      </a>
      <div className="tmcart-item-copy">
        <a href={productHref(item)}>{itemTitle(item)}</a>
        {detail ? <small>{detail}</small> : null}
        <button type="button" onClick={remove} disabled={isUpdating}>{text(props.removeText, "Kaldır")}</button>
      </div>
      <div className="tmcart-qty" aria-label="Adet">
        <button type="button" disabled={isUpdating || item.quantity <= 1} onClick={() => updateQuantity(item.quantity - 1)}>-</button>
        <span>{item.quantity}</span>
        <button type="button" disabled={isUpdating} onClick={() => updateQuantity(item.quantity + 1)}>+</button>
      </div>
      <div className="tmcart-price">
        <strong>{getOrderLineItemFormattedFinalPriceWithQuantity(item)}</strong>
        <small>{getOrderLineItemFormattedFinalUnitPrice(item)}</small>
      </div>
    </article>
  );
}

export function ThreeMashCartPage(props: Props) {
  const [customer, setCustomer] = useState<IkasCustomer | null>(customerStore.customer);
  const [cart, setCartState] = useState<IkasCart | null>(cartStore.cart);

  function refreshState() {
    setCustomer(customerStore.customer);
    setCartState(cartStore.cart);
  }

  useEffect(() => {
    let mounted = true;
    Promise.all([initCustomerStore(customerStore), waitForCartStoreInit(cartStore)])
      .then(() => getCart())
      .finally(() => {
        if (!mounted) return;
        refreshState();
      });

    return () => {
      mounted = false;
    };
  }, []);

  const items = cart?.orderLineItems?.filter((item) => !item.deleted) || [];
  const hasItems = Boolean(customer) && hasCart(cartStore) && items.length > 0;

  const style = {
    "--tmcart-bg": text(props.backgroundColor, "#ffffff"),
    "--tmcart-text": text(props.textColor, "#000000"),
    "--tmcart-muted": text(props.mutedTextColor, "#777777"),
    "--tmcart-line": text(props.lineColor, "#e8e8e8"),
    "--tmcart-button-bg": text(props.buttonBackgroundColor, "#000000"),
    "--tmcart-button-text": text(props.buttonTextColor, "#ffffff"),
  } as any;

  function checkout() {
    const checkoutUrl = getCheckoutUrlFromCartStore(cartStore);
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
      return;
    }
    Router.navigate("/checkout");
  }

  if (!hasItems) {
    return (
      <section className="three-mash-cart-page" style={style}>
        <EmptyCart props={props} count={items.length} isLoggedIn={Boolean(customer)} />
      </section>
    );
  }

  return (
    <section className="three-mash-cart-page" style={style}>
      <div className="tmcart-wrap">
        <h1>{text(props.titleText, "Sepetim")} ( {items.length} )</h1>
        <div className="tmcart-shell">
          <div className="tmcart-list">
            {items.map((item) => <CartLine item={item} props={props} onChanged={refreshState} key={item.id} />)}
          </div>

          <aside className="tmcart-summary">
            <span>{text(props.subtotalText, "Ara Toplam")}</span>
            <strong>{money(cart?.totalFinalPrice, cart)}</strong>
            <button type="button" onClick={checkout}>{text(props.checkoutButtonText, "SATIN AL")}</button>
            <a href={href(props.continueShoppingHref, "/tum-urunler")}>{text(props.continueShoppingText, "Alışverişe devam et")}</a>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default ThreeMashCartPage;
