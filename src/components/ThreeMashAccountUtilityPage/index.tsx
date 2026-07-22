import { useEffect, useMemo, useState } from "preact/hooks";
import {
  createMediaSrcset,
  customerStore,
  forgotPassword,
  getCustomerAddressText,
  getDefaultSrc,
  getFavoriteProducts,
  getOrders,
  getProductHref,
  getProductVariantFormattedFinalPrice,
  getProductVariantMainImage,
  getSelectedProductVariant,
  initCustomerStore,
  logout,
  recoverPassword,
  Router,
  type IkasCustomer,
  type IkasCustomerAddress,
  type IkasImage,
  type IkasOrder,
  type IkasProduct,
} from "@ikas/bp-storefront";
import { Props } from "./types";

const defaultAuthImage = "https://cdn.myikas.com/images/theme-images/4a6af8e2-cb7c-4cc8-ba17-13656d4b8670/image_3840.webp";

function text(value: string | undefined, fallback: string) {
  return value?.trim() || fallback;
}

function href(value: string | undefined, fallback: string) {
  const next = value?.trim();
  return next && next !== "#" ? next : fallback;
}

function imageIdToUrl(value: string) {
  const trimmed = value.trim();
  if (trimmed.startsWith("theme-images/")) return `https://cdn.myikas.com/images/${trimmed}/image_3840.webp`;
  return trimmed;
}

function imageSource(value: IkasImage | string | null | undefined, fallback: string) {
  if (typeof value === "string" && value.trim()) return imageIdToUrl(value);
  if (value && typeof value === "object") {
    const image = value as { id?: unknown; url?: unknown; src?: unknown; imageUrl?: unknown; image?: { url?: unknown; src?: unknown }; file?: { url?: unknown; src?: unknown } };
    if (typeof image.url === "string") return imageIdToUrl(image.url);
    if (typeof image.src === "string") return imageIdToUrl(image.src);
    if (typeof image.imageUrl === "string") return imageIdToUrl(image.imageUrl);
    if (typeof image.id === "string") return imageIdToUrl(image.id);
    if (typeof image.image?.url === "string") return imageIdToUrl(image.image.url);
    if (typeof image.image?.src === "string") return imageIdToUrl(image.image.src);
    if (typeof image.file?.url === "string") return imageIdToUrl(image.file.url);
    if (typeof image.file?.src === "string") return imageIdToUrl(image.file.src);
  }
  return fallback;
}

function getQueryParam(name: string) {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get(name) || "";
}

function formatDate(value: number | null | undefined) {
  if (!value) return "";
  return new Intl.DateTimeFormat("tr-TR", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(value));
}

function formatOrderTotal(order: IkasOrder) {
  const symbol = order.currencySymbol || order.currencyCode || "";
  return `${symbol} ${Number(order.totalFinalPrice || 0).toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function customerName(customer: IkasCustomer | null) {
  if (!customer) return "Hesabım";
  return customer.fullName || `${customer.firstName || ""} ${customer.lastName || ""}`.trim() || customer.email || "Hesabım";
}

function AccountSidebar({ customer, props }: { customer: IkasCustomer | null; props: Props }) {
  async function handleLogout(event: Event) {
    event.preventDefault();
    await logout(customerStore);
    Router.navigateToPage("LOGIN");
  }

  return (
    <aside className="tmau-sidebar">
      <div className="tmau-user">
        <strong>{customerName(customer)}</strong>
        <a href="/account/logout" onClick={handleLogout}>Çıkış yap</a>
      </div>

      <nav className="tmau-menu">
        <h2>Kişisel Bilgilerim</h2>
        <a href={href(props.accountHref, "/account")}>Kişisel Bilgilerim</a>
        <a href={href(props.addressesHref, "/account/addresses")}>Adreslerim</a>
        <a href={href(props.favoritesHref, "/account/favorites")}>Beğendiğim Ürünler</a>
        <h2>Sipariş Bilgilerim</h2>
        <a href={href(props.ordersHref, "/account/orders")}>Siparişlerim</a>
      </nav>
    </aside>
  );
}

function AuthShell({ props, active, children }: { props: Props; active: "forgot" | "recover"; children: preact.ComponentChildren }) {
  const image = imageSource(props.backgroundImageUrl, defaultAuthImage);
  return (
    <section className="tmau-auth">
      <div className="tmau-auth-panel">
        <div className="tmau-auth-form">
          <div className="tmau-auth-tabs">
            <a href={href(props.loginHref, "/account/login")}>Üye Girişi</a>
            <a href={href(props.registerHref, "/account/register")}>Üye Ol</a>
          </div>
          <h1>{active === "forgot" ? text(props.titleText, "Parolamı Unuttum") : text(props.titleText, "Şifremi Kurtar")}</h1>
          {children}
        </div>
      </div>
      <div className="tmau-auth-image" aria-hidden="true">
        <img src={image} alt="" />
      </div>
    </section>
  );
}

function ForgotPasswordView({ props }: { props: Props }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function submit(event: Event) {
    event.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    const success = await forgotPassword(customerStore, email);
    setStatus(success ? "success" : "error");
  }

  return (
    <AuthShell props={props} active="forgot">
      <form onSubmit={submit}>
        <label className="tmau-auth-field">
          <span>* Email</span>
          <input type="email" value={email} required autoComplete="email" onInput={(event) => setEmail((event.currentTarget as HTMLInputElement).value)} />
        </label>
        <button className="tmau-auth-submit" type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Gönderiliyor..." : "Gönder"}
        </button>
        {status !== "idle" && <p className={`tmau-status is-${status}`}>{status === "success" ? "Şifre yenileme bağlantısı email adresinize gönderildi." : status === "error" ? "İşlem tamamlanamadı. Email adresini kontrol edin." : "Gönderiliyor..."}</p>}
      </form>
    </AuthShell>
  );
}

function RecoverPasswordView({ props }: { props: Props }) {
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "mismatch">("idle");

  async function submit(event: Event) {
    event.preventDefault();
    if (status === "loading") return;
    if (password !== passwordAgain) {
      setStatus("mismatch");
      return;
    }
    const token = getQueryParam("token");
    setStatus("loading");
    const success = token ? await recoverPassword(customerStore, password, passwordAgain, token) : false;
    if (success) {
      setStatus("success");
      setTimeout(() => Router.navigateToPage("LOGIN"), 650);
      return;
    }
    setStatus("error");
  }

  return (
    <AuthShell props={props} active="recover">
      <form onSubmit={submit}>
        <label className="tmau-auth-field">
          <span>* Şifre</span>
          <input type="password" value={password} required autoComplete="new-password" onInput={(event) => setPassword((event.currentTarget as HTMLInputElement).value)} />
        </label>
        <label className="tmau-auth-field">
          <span>* Şifre Tekrar</span>
          <input type="password" value={passwordAgain} required autoComplete="new-password" onInput={(event) => setPasswordAgain((event.currentTarget as HTMLInputElement).value)} />
        </label>
        <button className="tmau-auth-submit" type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Kaydediliyor..." : "Şifreyi Güncelle"}
        </button>
        {status !== "idle" && <p className={`tmau-status is-${status}`}>{status === "success" ? "Şifreniz güncellendi. Giriş sayfasına yönlendiriliyorsunuz." : status === "mismatch" ? "Şifreler eşleşmiyor." : status === "error" ? "Token geçersiz veya işlem tamamlanamadı." : "Kaydediliyor..."}</p>}
      </form>
    </AuthShell>
  );
}

function AddressCard({ address }: { address: IkasCustomerAddress }) {
  return (
    <article className="tmau-card">
      <h2>{address.title || "Adres"}</h2>
      <p>{getCustomerAddressText(address)}</p>
      <small>{`${address.firstName || ""} ${address.lastName || ""}`.trim()}</small>
    </article>
  );
}

function ProductCard({ product }: { product: IkasProduct }) {
  const variant = getSelectedProductVariant(product) || product.variants?.[0];
  const media = variant ? getProductVariantMainImage(variant) : undefined;
  const image = media?.image;
  return (
    <a className="tmau-product" href={getProductHref(product)}>
      <div className="tmau-product-media">
        {image ? <img src={getDefaultSrc(image)} srcSet={createMediaSrcset(image)} alt={image.altText || product.name} loading="lazy" /> : <span>{product.name.slice(0, 1)}</span>}
      </div>
      <strong>{product.name}</strong>
      <small>{variant ? getProductVariantFormattedFinalPrice(variant) : ""}</small>
    </a>
  );
}

export function ThreeMashAccountUtilityPage(props: Props) {
  const mode = props.mode || "orders";
  const [customer, setCustomer] = useState<IkasCustomer | null>(customerStore.customer);
  const [orders, setOrders] = useState<IkasOrder[]>([]);
  const [favorites, setFavorites] = useState<IkasProduct[]>([]);
  const [ready, setReady] = useState(customerStore._initialized);

  useEffect(() => {
    let mounted = true;
    initCustomerStore(customerStore).then(async () => {
      if (!mounted) return;
      setCustomer(customerStore.customer);
      setReady(true);
      if (!customerStore.customer) return;
      if (mode === "orders") setOrders(await getOrders(customerStore));
      if (mode === "favorites") setFavorites(await getFavoriteProducts(customerStore));
    });
    return () => {
      mounted = false;
    };
  }, [mode]);

  const addresses = customer?.addresses || [];
  const title = useMemo(() => {
    if (mode === "addresses") return text(props.titleText, "Adreslerim");
    if (mode === "favorites") return text(props.titleText, "Beğendiğim Ürünler");
    return text(props.titleText, "Siparişlerim");
  }, [mode, props.titleText]);

  if (mode === "forgot-password") return <ForgotPasswordView props={props} />;
  if (mode === "recover-password") return <RecoverPasswordView props={props} />;

  if (ready && !customer) {
    return (
      <section className="tmau-page">
        <div className="tmau-login-required">
          <h1>Hesabınıza giriş yapın</h1>
          <p>Bu sayfayı görüntülemek için müşteri hesabıyla giriş yapılması gerekiyor.</p>
          <a href={href(props.loginHref, "/account/login")}>Giriş Yap</a>
        </div>
      </section>
    );
  }

  return (
    <section className="tmau-page">
      <div className="tmau-shell">
        <AccountSidebar customer={customer} props={props} />
        <main className="tmau-main">
          <h1>{ready ? title : "Yükleniyor..."}</h1>

          {mode === "addresses" && (
            <div className="tmau-list">
              {addresses.length ? addresses.map((address) => <AddressCard address={address} />) : <p className="tmau-empty">{text(props.emptyText, "Kayıtlı adresiniz bulunmuyor.")}</p>}
            </div>
          )}

          {mode === "orders" && (
            <div className="tmau-list">
              {orders.length ? (
                orders.map((order) => (
                  <article className="tmau-card">
                    <h2>{order.orderNumber || order.id}</h2>
                    <p>{formatDate(order.orderedAt || order.createdAt)}</p>
                    <small>{formatOrderTotal(order)}</small>
                  </article>
                ))
              ) : (
                <p className="tmau-empty">{text(props.emptyText, "Henüz siparişiniz bulunmuyor.")}</p>
              )}
            </div>
          )}

          {mode === "favorites" && (
            <div className="tmau-products">
              {favorites.length ? favorites.map((product) => <ProductCard product={product} />) : <p className="tmau-empty">{text(props.emptyText, "Beğendiğiniz ürün bulunmuyor.")}</p>}
            </div>
          )}
        </main>
      </div>
    </section>
  );
}

export default ThreeMashAccountUtilityPage;
