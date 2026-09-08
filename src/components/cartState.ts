import {
  cartStore,
  getCart,
  waitForCartStoreInit,
  type IkasCart,
} from "@ikas/bp-storefront";

export type CartStatus = "idle" | "loading" | "ready" | "error";
type CartListener = (cart: IkasCart | null, status: CartStatus, error: Error | null) => void;

const CART_CACHE_KEY = "3mash-cart-cache-v1";
const CART_LOAD_TIMEOUT_MS = 10000;

const listeners = new Set<CartListener>();

let initialized = false;
let initializing: Promise<void> | null = null;
let cartStatus: CartStatus = "idle";
let cartError: Error | null = null;

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
    listener(currentCart, cartStatus, cartError);
  });
}

function publish(cart: IkasCart | null) {
  currentCart = cart;

  writeCache(cart);

  notify();
}

function setStatus(status: CartStatus, error: Error | null = null) {
  cartStatus = status;
  cartError = error;
  notify();
}

function withCartTimeout<T>(promise: Promise<T>) {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      setTimeout(
        () => reject(new Error("Cart loading timed out")),
        CART_LOAD_TIMEOUT_MS,
      );
    }),
  ]);
}

export function getCurrentCart() {
  return currentCart;
}

export function isCartInitialized(): boolean {
  return cartStatus === "ready" || cartStatus === "error";
}

export function getCartStatus(): CartStatus {
  return cartStatus;
}

export function getCartError(): Error | null {
  return cartError;
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
  setStatus("ready");
  publish(nextCart);
}

export async function refreshGlobalCart() {
  setStatus("loading");

  try {
    await withCartTimeout(
      waitForCartStoreInit(cartStore).then(() => getCart()),
    );
    initialized = true;
    setStatus("ready");
  } catch (error) {
    initialized = true;
    setStatus("error", error instanceof Error ? error : new Error("Cart refresh failed"));
  } finally {
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

  setStatus("loading");

  initializing = (async () => {
    try {
      await withCartTimeout(waitForCartStoreInit(cartStore));

      if (cartStore.cart) {
        publish(cloneCart());
      }

      await withCartTimeout(getCart());

      initialized = true;
      setStatus("ready");
      publish(cloneCart());
    } catch (error) {
      initialized = true;
      setStatus("error", error instanceof Error ? error : new Error("Cart initialization failed"));
    } finally {
      initializing = null;
      notify();
    }
  })();

  return initializing;
}

export function clearGlobalCart() {
  currentCart = null;
  initialized = true;
  cartError = null;
  cartStatus = "ready";
  if (typeof window !== "undefined") {
    try {
      sessionStorage.removeItem(CART_CACHE_KEY);
    } catch {}
  }
  notify();
}
