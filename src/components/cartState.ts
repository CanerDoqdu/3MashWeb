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
const CART_LOAD_RETRY_DELAYS_MS = [500, 1500] as const;

const listeners = new Set<CartListener>();

let initialized = false;
let initializing: Promise<void> | null = null;
let cartGeneration = 0;
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
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<T>((_, reject) => {
    timeoutId = setTimeout(
      () => reject(new Error("Cart loading timed out")),
      CART_LOAD_TIMEOUT_MS,
    );
  });

  return Promise.race([promise, timeout]).finally(() => {
    if (timeoutId !== undefined) clearTimeout(timeoutId);
  });
}

async function withCartRetries<T>(operation: () => Promise<T>): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    try {
      return await operation();
    } catch (error) {
      const retryDelay = CART_LOAD_RETRY_DELAYS_MS[attempt];
      if (retryDelay === undefined) throw error;
      await new Promise<void>((resolve) => setTimeout(resolve, retryDelay));
    }
  }
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
  const c = currentCart;
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
  const generation = cartGeneration;
  setStatus("loading");

  try {
    await withCartRetries(() =>
      withCartTimeout(
        waitForCartStoreInit(cartStore).then(async () => {
          if (generation !== cartGeneration) return;
          await getCart();
        }),
      ),
    );
    if (generation !== cartGeneration) return;
    initialized = true;
    setStatus("ready");
  } catch (error) {
    if (generation !== cartGeneration) return;
    initialized = false;
    setStatus("error", error instanceof Error ? error : new Error("Cart refresh failed"));
  } finally {
    if (generation === cartGeneration) {
      publish(cloneCart());
    }
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
  const generation = cartGeneration;

  const task = (async () => {
    try {
      await withCartRetries(async () => {
        await withCartTimeout(waitForCartStoreInit(cartStore));

        if (generation !== cartGeneration) return;
        await withCartTimeout(getCart());
      });

      if (generation !== cartGeneration) return;
      initialized = true;
      setStatus("ready");
      publish(cloneCart());
    } catch (error) {
      if (generation !== cartGeneration) return;
      initialized = false;
      setStatus("error", error instanceof Error ? error : new Error("Cart initialization failed"));
    } finally {
      if (generation === cartGeneration) {
        initializing = null;
        notify();
      }
    }
  })();

  initializing = task;
  return task;
}

export function clearGlobalCart() {
  cartGeneration++;
  initializing = null;
  currentCart = null;
  initialized = false;
  cartError = null;
  cartStatus = "ready";
  if (typeof window !== "undefined") {
    try {
      sessionStorage.removeItem(CART_CACHE_KEY);
    } catch {}
  }
  notify();
}
