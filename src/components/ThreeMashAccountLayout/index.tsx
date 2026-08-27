import { ComponentChildren } from "preact";
import { useEffect, useState } from "preact/hooks";
import {
  Router,
  customerStore,
  logout,
  type IkasCustomer,
} from "@ikas/bp-storefront";


type Props = {
  children: ComponentChildren;
  props?: any;
  active?: string;
  customer?: IkasCustomer | null;
  isReady?: boolean;
  onNavigate?: (href: string) => void;
};


function text(value: string | undefined, fallback: string) {
  return value?.trim() || fallback;
}


function normalizeHref(
  value: string | undefined,
  fallback: string,
) {
  const next = value?.trim();

  return next && next !== "#"
    ? next
    : fallback;
}


function customerName(customer: any) {
  if (!customer) return "";

  const name =
    `${customer.firstName ?? ""} ${customer.lastName ?? ""}`
      .trim();

  return name || customer.email || "";
}

function getInitialSidebarName(customer: any): string {
  const direct = customerName(customer);
  if (direct) return direct;
  if (typeof window !== "undefined") {
    try {
      const cached =
        localStorage.getItem("tm_customer_name") ||
        sessionStorage.getItem("tm_customer_name");
      if (cached) return cached;
      const cachedCustomer =
        localStorage.getItem("tm_customer_cache") ||
        sessionStorage.getItem("tm_customer_cache");
      if (cachedCustomer) {
        const parsed = JSON.parse(cachedCustomer);
        const name = customerName(parsed);
        if (name) return name;
      }
    } catch {}
  }
  return "";
}


export default function ThreeMashAccountLayout({
  children,
  props,
  active,
  customer = customerStore.customer,
  isReady = customerStore._initialized,
  onNavigate,
}: Props) {

  const [sidebarName, setSidebarName] = useState(() =>
    getInitialSidebarName(customer),
  );

  useEffect(() => {
    const nextName = customerName(customer);
    if (nextName) {
      setSidebarName(nextName);
      try {
        localStorage.setItem("tm_customer_name", nextName);
        sessionStorage.setItem("tm_customer_name", nextName);
        if (customer) {
          localStorage.setItem("tm_customer_cache", JSON.stringify(customer));
          sessionStorage.setItem("tm_customer_cache", JSON.stringify(customer));
        }
      } catch {}
    }
  }, [customer]);


  async function handleLogout(event: Event) {
    event.preventDefault();

    try {
      localStorage.removeItem("tm_customer_name");
      localStorage.removeItem("tm_customer_cache");
      sessionStorage.removeItem("tm_customer_name");
      sessionStorage.removeItem("tm_customer_cache");
    } catch {}

    await logout(customerStore);

    Router.navigate(normalizeHref(props?.loginHref, "/account/login"));
  }

  function handleNavigate(event: Event, nextHref: string) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation?.();

    if (onNavigate) {
      onNavigate(nextHref);
      return;
    }

    Router.navigate(nextHref);
  }

  const accountHref = normalizeHref(props?.accountHref, "/account");
  const addressesHref = normalizeHref(props?.addressesHref, "/account/addresses");
  const favoritesHref = normalizeHref(props?.favoritesHref, "/account/favorites");
  const ordersHref = normalizeHref(props?.ordersHref, "/account/orders");

  const personalLinks = [
    {
      key: "account",
      label: text(props?.profileTitle, "Kişisel Bilgilerim"),
      href: accountHref,
    },
    {
      key: "addresses",
      label: text(props?.addressesTitle, "Adreslerim"),
      href: addressesHref,
    },
    {
      key: "favorites",
      label: text(props?.favoritesTitle, "Beğendiğim Ürünler"),
      href: favoritesHref,
    },
  ];

  return (
    <section className="three-mash-account-layout tmai-shell tmau-shell">


      <aside className="tmai-sidebar tmau-sidebar">

        <span className="tmai-kicker tmau-kicker">
          {text(props?.accountLabel, "HESABIM")}
        </span>


        <div className="tmai-user tmau-user">
          <strong>
            {sidebarName || text(props?.profileTitle, "Hesabım")}
          </strong>

          <a
            href="#"
            className="tmai-logout tmau-logout"
            onClick={handleLogout}
          >
            {text(
              props?.logoutText,
              "Çıkış yap",
            )}
          </a>
        </div>


        <nav className="tmai-menu tmau-menu">

          <h2>
            {text(
              props?.accountGroupTitle,
              "Hesap Yönetimi",
            )}
          </h2>


          {personalLinks.map((item) => (
            <a
              key={item.key}
              href={item.href}
              onClick={(event) => handleNavigate(event, item.href)}
              className={
                active === item.key
                  ? "is-active"
                  : ""
              }
            >
              {item.label}
            </a>
          ))}



          <h2>
            Sipariş Bilgilerim
          </h2>


          <a
            href={ordersHref}
            onClick={(event) => handleNavigate(event, ordersHref)}
            className={
              active === "orders"
                ? "is-active"
                : ""
            }
          >
            Siparişlerim
          </a>


        </nav>

      </aside>



      <main className="tmai-main tmau-main">

        {children}

      </main>


    </section>
  );
}
