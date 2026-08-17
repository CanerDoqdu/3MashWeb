import {
  cartStore,
  getCart,
  waitForCartStoreInit,
  type IkasCart,
} from "@ikas/bp-storefront";

type CartListener = (
  cart: IkasCart | null
) => void;

const CART_CACHE_KEY =
  "3mash-cart-snapshot-v1";

const listeners = new Set<CartListener>();

let initialized = false;
let initializing: Promise<void> | null = null;

function readCachedCart(): IkasCart | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw =
      window.sessionStorage.getItem(
        CART_CACHE_KEY
      );

    if (!raw) return null;

    return JSON.parse(raw) as IkasCart;
  } catch {
    return null;
  }
}

function writeCachedCart(
  cart: IkasCart | null
) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    if (!cart) {
      window.sessionStorage.removeItem(
        CART_CACHE_KEY
      );
      return;
    }

    window.sessionStorage.setItem(
      CART_CACHE_KEY,
      JSON.stringify(cart)
    );
  } catch {
    // Cache başarısız olsa bile
    // gerçek cart çalışmaya devam eder.
  }
}

/*
 * EN ÖNEMLİ KISIM:
 *
 * Yeni document açıldığında cartStore henüz
 * initialize olmamış olabilir.
 *
 * Bu yüzden ilk state cache'ten gelir.
 */
let currentCart: IkasCart | null =
  readCachedCart() ||
  (cartStore.cart
    ? ({ ...cartStore.cart } as IkasCart)
    : null);

function cloneStoreCart(): IkasCart | null {
  return cartStore.cart
    ? ({ ...cartStore.cart } as IkasCart)
    : null;
}

function notify() {
  listeners.forEach((listener) => {
    listener(currentCart);
  });
}

function publishStoreCart() {
  currentCart = cloneStoreCart();

  writeCachedCart(currentCart);

  notify();
}

export function getCurrentCart():
  IkasCart | null {
  return currentCart;
}

export function subscribeCart(
  listener: CartListener
) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

/*
 * IKAS mutation cartStore'u zaten değiştirmişse
 * network beklemeden yayınlamak için.
 */
export function publishCartFromIkasStore() {
  const next = cloneStoreCart();

  if (!next) return;

  currentCart = next;

  writeCachedCart(currentCart);

  notify();
}

/*
 * Server'dan gerçek cart'ı alır
 * ve bütün componentleri günceller.
 */
export async function refreshGlobalCart() {
  await waitForCartStoreInit(cartStore);

  await getCart();

  publishStoreCart();
}

/*
 * Her document başlangıcında:
 *
 * 1. Cache zaten currentCart'a yüklendi.
 * 2. Subscriber bunu ilk render'da kullanabilir.
 * 3. IKAS arka planda doğrulanır.
 */
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

      /*
       * IKAS store zaten hazırsa cache'i
       * gerçek store ile hemen yenileyebiliriz.
       */
      if (cartStore.cart) {
        publishStoreCart();
      }

      /*
       * Network doğrulaması.
       * İlk render bunu beklemiyor.
       */
      await getCart();

      publishStoreCart();

      initialized = true;
    } finally {
      initializing = null;
    }
  })();

  return initializing;
}