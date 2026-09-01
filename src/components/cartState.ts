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

function writeCache(cart: IkasCart | null) {
  if (typeof window === "undefined") return;

  try {
    if (!cart) {
      sessionStorage.removeItem(CART_CACHE_KEY);
      return;
    }

    // PII security: cart cache disabled to prevent sensitive order/line item data leakage
    // sessionStorage.setItem(CART_CACHE_KEY, JSON.stringify(cart));
    // (Keep reading old cache for backward compatibility if it exists)
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

export function subscribeCart(listener: CartListener) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function publishCartFromIkasStore() {
  const nextCart = cloneCart();

  if (!nextCart) return;

  publish(nextCart);
}

export async function refreshGlobalCart() {
  await waitForCartStoreInit(cartStore);

  await getCart();

  publish(cloneCart());
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

      initialized = true;
    } finally {
      initializing = null;
    }
  })();

  return initializing;
}