import {
  cartStore,
  getCart,
  waitForCartStoreInit,
  type IkasCart,
} from "@ikas/bp-storefront";

type CartListener = (cart: IkasCart | null) => void;

const CART_CACHE_KEY = "3mash-cart-cache-v1";

const listeners = new Set<CartListener>();

let initialized = false;
let initializing: Promise<void> | null = null;

function cloneCart(): IkasCart | null {
  return cartStore.cart
    ? ({ ...cartStore.cart } as IkasCart)
    : null;
}

function readCache(): IkasCart | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = sessionStorage.getItem(CART_CACHE_KEY);

    if (!raw) return null;

    return JSON.parse(raw) as IkasCart;
  } catch {
    return null;
  }
}

function sanitizeCartForCache(cart: IkasCart): Partial<IkasCart> {
  // Strip sensitive customer and address data to prevent PII exposure
  const { customer, shippingAddress, billingAddress, ...safeCart } = cart as any;
  return safeCart;
}

function writeCache(cart: IkasCart | null) {
  if (typeof window === "undefined") return;

  try {
    if (!cart) {
      sessionStorage.removeItem(CART_CACHE_KEY);
      return;
    }

    // Cache sanitized line items and totals (no PII) for instant page-to-page navigation
    sessionStorage.setItem(CART_CACHE_KEY, JSON.stringify(sanitizeCartForCache(cart)));
  } catch {
    // Cache hata verse bile gerçek cart çalışmaya devam eder.
  }
}

let currentCart: IkasCart | null =
  readCache() || cloneCart();

function notify() {
  listeners.forEach((listener) => {
    listener(currentCart);
  });
}

function publish(cart: IkasCart | null) {
  currentCart = cart;

  writeCache(cart);

  notify();
}

export function getCurrentCart() {
  return currentCart;
}

export function isCartInitialized(): boolean {
  if (initialized) return true;
  if (typeof window !== "undefined" && (cartStore as any)?.isCartInitialLoadFinished === true) {
    return true;
  }
  return false;
}

export function hasCartItemsInMemory(): boolean {
  const c = currentCart || (cartStore.cart ? ({ ...cartStore.cart } as IkasCart) : null);
  if (!c?.orderLineItems) return false;
  return c.orderLineItems.some(
    (item) => !item.deleted && Number(item.quantity || 0) > 0
  );
}

export function subscribeCart(listener: CartListener) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function publishCartFromIkasStore() {
  const nextCart = cloneCart();

  if (!nextCart) return;

  initialized = true;
  publish(nextCart);
}

export async function refreshGlobalCart() {
  try {
    await waitForCartStoreInit(cartStore);
    await getCart();
  } catch {
    // Network error handling
  } finally {
    initialized = true;
    publish(cloneCart());
  }
}

export function initGlobalCart() {
  if (initialized) {
    return Promise.resolve();
  }

  if (initializing) {
    return initializing;
  }

  initializing = (async () => {
    try {
      await waitForCartStoreInit(cartStore);

      if (cartStore.cart) {
        publish(cloneCart());
      }

      await getCart();

      publish(cloneCart());
    } catch {
      // Network hatası olsa bile arayüz kilitlenmesin
    } finally {
      initialized = true;
      initializing = null;
      notify();
    }
  })();

  return initializing;
}

export function clearGlobalCart() {
  currentCart = null;
  initialized = true;
  if (typeof window !== "undefined") {
    try {
      sessionStorage.removeItem(CART_CACHE_KEY);
    } catch {}
  }
  notify();
}