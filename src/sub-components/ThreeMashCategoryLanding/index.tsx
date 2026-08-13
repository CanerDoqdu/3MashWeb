import { useEffect, useLayoutEffect, useMemo, useState } from "preact/hooks";
import {
  createMediaSrcset,
  getDefaultSrc,
  getProductHref,
  getProductVariantMainImage,
  getSelectedProductVariant,
  type IkasProduct,
  type IkasProductList,
  type IkasProductVariant,
} from "@ikas/bp-storefront";

export type CategoryButton = {
  label: string;
  href: string;
  variant?: "lime" | "line" | "dark" | "inverse";
};

export type CategoryMetric = {
  value: string;
  emphasis?: string;
  label: string;
};

export type CategoryFilter = {
  id: string;
  label: string;
};

export type CategoryProductSpec = {
  label: string;
  value: string;
};

export type CategoryProductCard = {
  title: string;
  descriptionHtml: string;
  href: string;
  imageSrc?: string;
  imageAlt?: string;
  sourceIcon?: boolean;
  filterId?: string;
  tag?: string;
  status?: string;
  hot?: boolean;
  tone?: string;
  specs?: CategoryProductSpec[];
};

export type CategoryCompareColumn = {
  title: string;
  subtitle?: string;
};

export type CategoryCompareRow = {
  label: string;
  values: string[];
};

export type CategoryFeature = {
  eyebrow: string;
  titlePrefix: string;
  titleEmphasis: string;
  titleSuffix?: string;
  descriptionHtml: string;
  href: string;
  ctaText: string;
  specs: CategoryProductSpec[];
};

export type CategoryLineCard = {
  marker: string;
  title: string;
  descriptionHtml: string;
  items: string[];
  variant?: "accent" | "plain";
};

export type CategoryWhyCard = {
  number: string;
  title: string;
  descriptionHtml: string;
};

export type CategoryCallout = {
  titlePrefix: string;
  titleEmphasis: string;
  titleSuffix?: string;
  descriptionHtml: string;
  buttons: CategoryButton[];
};

export type CategoryFaq = {
  question: string;
  answerHtml: string;
};

export type CategorySectionHead = {
  number: string;
  label: string;
  titlePrefix: string;
  titleEmphasis: string;
  titleSuffix?: string;
  sideHtml: string;
};

export type CategoryLandingData = {
  kind: "resins" | "printers" | "wash-cure" | "zircon" | "furnaces" | "scanners" | "spares" | "systems" | "titanium";
  announcement: {
    highlight: string;
    text: string;
    href: string;
    ctaText: string;
  };
  breadcrumb: {
    homeLabel: string;
    homeHref: string;
    parentLabel: string;
    parentHref?: string;
    currentLabel: string;
    currentHref?: string;
  };
  hero: {
    titlePrefix: string;
    titleEmphasis: string;
    titleSuffix?: string;
    descriptionHtml: string;
    buttons: CategoryButton[];
    metrics: CategoryMetric[];
  };
  selector: CategorySectionHead & {
    anchorId: string;
    cardCtaText: string;
    filters?: CategoryFilter[];
    products: CategoryProductCard[];
    emptyMessageHtml?: string;
    compare?: {
      columns: CategoryCompareColumn[];
      rows: CategoryCompareRow[];
      noteHtml?: string;
    };
  };
  feature: {
    number: string;
    label: string;
    content: CategoryFeature;
  };
  detail: CategorySectionHead & {
    lineCards?: CategoryLineCard[];
    whyCards?: CategoryWhyCard[];
    callout?: CategoryCallout;
  };
  faq: {
    number: string;
    label: string;
    title: string;
    sideHtml: string;
    items: CategoryFaq[];
  };
  finalCta: {
    titlePrefix: string;
    titleEmphasis: string;
    titleSuffix?: string;
    descriptionHtml: string;
    buttons: CategoryButton[];
  };
};

export type CategoryLandingOverrides = {
  eyebrowText?: string;
  heroTitlePrefix?: string;
  heroTitleEmphasis?: string;
  heroTitleSuffix?: string;
  heroDescriptionHtml?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  metric1Value?: string;
  metric1Label?: string;
  metric2Value?: string;
  metric2Label?: string;
  finalTitlePrefix?: string;
  finalTitleEmphasis?: string;
  finalDescriptionHtml?: string;
  finalPrimaryButtonText?: string;
  finalPrimaryButtonHref?: string;
  finalSecondaryButtonText?: string;
  finalSecondaryButtonHref?: string;
  backgroundColor?: string;
  textColor?: string;
  mutedTextColor?: string;
  panelColor?: string;
  accentColor?: string;
  lineColor?: string;
};

interface Props extends CategoryLandingOverrides {
  data: CategoryLandingData;
  productList?: IkasProductList;
}

type CategoryAnnouncementWindow = Window & {
  __THREE_MASH_PRODUCT_ANNOUNCEMENT__?: {
    enabled?: boolean;
    highlightText?: string;
    text?: string;
    ctaText?: string;
    href?: string;
  };
};

function rich(value: string) {
  return { __html: normalizeHtmlLinks(value) };
}

function textValue(value: string | undefined, fallback: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

function richValue(value: string | undefined, fallback: string) {
  return value !== undefined && value.trim() ? value : fallback;
}

function routeKey(value: string) {
  return value
    .trim()
    .toLocaleLowerCase("tr-TR")
    .replace(/^https?:\/\/(?:www\.)?(?:3mash\.com|studio\.ikasapps\.com)/i, "")
    .split(/[?#]/)[0]
    .replace(/\/+$/g, "")
    .replace(/^\//, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const categoryRouteAliases: Record<string, string> = {
  "": "/",
  "anasayfa": "/",
  "home": "/",
  "search": "/search",
  "arama": "/search",
  "arama-sayfasi": "/search",
  "tum-urunler": "/search",
  "urunler": "/search",
  "products": "/search",
  "resins": "/dental-3d-yazici-recineleri",
  "printers": "/3d-yazicilar",
  "wash-cure": "/yikama-kurleme-cihazlari",
  "zircon": "/zirkon-bloklar",
  "furnaces": "/dental-firinlar",
  "scanners": "/masasustu-tarayicilar",
  "spares": "/3d-yazici-yedek-parcalari",
  "systems": "/sistemler",
  "titanium": "/titanyum-diskler",
  "3d-yazicilar": "/3d-yazicilar",
  "3d-yazici": "/3d-yazicilar",
  "urunler-3d-yazicilar": "/3d-yazicilar",
  "dental-3d-yazici-recineleri": "/dental-3d-yazici-recineleri",
  "dental-recineler": "/dental-3d-yazici-recineleri",
  "urunler-dental-recineler": "/dental-3d-yazici-recineleri",
  "recineler": "/dental-3d-yazici-recineleri",
  "yikama-kurleme-cihazlari": "/yikama-kurleme-cihazlari",
  "yikama-kurleme": "/yikama-kurleme-cihazlari",
  "urunler-yikama-kurleme": "/yikama-kurleme-cihazlari",
  "kurleme-cihazlari": "/yikama-kurleme-cihazlari",
  "urunler-kurleme-cihazlari": "/yikama-kurleme-cihazlari",
  "masasustu-tarayicilar": "/masasustu-tarayicilar",
  "masaustu-tarayicilar": "/masasustu-tarayicilar",
  "urunler-masasustu-tarayicilar": "/masasustu-tarayicilar",
  "zirkon-bloklar": "/zirkon-bloklar",
  "zirkon-bloklar-titanyum": "/zirkon-bloklar",
  "urunler-zirkon-bloklar": "/zirkon-bloklar",
  "dental-firinlar": "/dental-firinlar",
  "firinlar": "/dental-firinlar",
  "urunler-dental-firinlar": "/dental-firinlar",
  "3d-yazici-yedek-parcalari": "/3d-yazici-yedek-parcalari",
  "yedek-parcalar": "/3d-yazici-yedek-parcalari",
  "sistemler": "/sistemler",
  "titanyum-diskler": "/titanyum-diskler",
};

function categoryHref(value: string) {
  const trimmed = value.trim();
  if (!trimmed || /^(#|mailto:|tel:|whatsapp:)/i.test(trimmed)) return trimmed || "#";

  try {
    const url = new URL(trimmed);
    if (url.hostname !== "3mash.com" && url.hostname !== "www.3mash.com" && url.hostname !== "studio.ikasapps.com") {
      return trimmed;
    }
    const route = `${url.pathname}${url.search}${url.hash}` || "/";
    const mapped = categoryRouteAliases[routeKey(route)];
    return mapped ? `${mapped}${url.search}${url.hash}` : route;
  } catch {
    const mapped = categoryRouteAliases[routeKey(trimmed)];
    return mapped || trimmed;
  }
}

function parentCategoryHref(data: CategoryLandingData) {
  const parentLabelKey = routeKey(data.breadcrumb.parentLabel || "");
  if (parentLabelKey === "urunler" || parentLabelKey === "products") {
    return "/search";
  }

  return categoryHref(data.breadcrumb.parentHref || "/search");
}

function smoothCategoryClick(event: MouseEvent, rawHref: string) {
  const target = categoryHref(rawHref);
  const hashIndex = target.indexOf("#");
  const hash = hashIndex >= 0 ? target.slice(hashIndex) : "";
  if (!hash || hash.length <= 1 || typeof window === "undefined") return;

  const targetPath = hashIndex > 0 ? target.slice(0, hashIndex) : "";
  const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";
  const normalizedTargetPath = targetPath ? targetPath.replace(/\/+$/, "") || "/" : currentPath;
  if (normalizedTargetPath !== currentPath) {
    event.preventDefault();
    event.stopPropagation();
    try {
      localStorage.setItem("tmcl-pending-anchor-scroll", JSON.stringify({ sectionId: decodeURIComponent(hash.slice(1)).trim(), block: "center", fromTop: true }));
    } catch {
      // Storage can be unavailable; the route still works without smooth scroll.
    }
    window.location.href = normalizedTargetPath;
    return;
  }

  const targetId = decodeURIComponent(hash.slice(1)).trim();
  const section = document.getElementById(targetId) || document.querySelector(hash);
  if (!section) return;

  event.preventDefault();
  event.stopPropagation();
  section.scrollIntoView({ behavior: "smooth", block: "start" });
}

function consumePendingAnchorScroll() {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem("tmcl-pending-anchor-scroll");
    if (!raw) return null;
    localStorage.removeItem("tmcl-pending-anchor-scroll");
    const parsed = JSON.parse(raw) as { sectionId?: unknown; block?: unknown };
    const sectionId = typeof parsed.sectionId === "string" ? parsed.sectionId : "";
    const block: ScrollLogicalPosition = parsed.block === "center" || parsed.block === "end" || parsed.block === "nearest" ? parsed.block : "start";
    return sectionId ? { sectionId, block, fromTop: true } : null;
  } catch {
    return null;
  }
}

function isSrcdocPreview() {
  return typeof window !== "undefined" && window.location.href.startsWith("about:srcdoc");
}

function safeHistoryReplace(url: string) {
  if (typeof window === "undefined") return;
  if (isSrcdocPreview() && !url.startsWith("#")) return;
  try {
    window.history.replaceState(null, "", url);
  } catch {
    // Studio srcdoc previews reject normal path URLs; scrolling should still work.
  }
}

function anchorScrollTarget(section: HTMLElement, sectionId: string) {
  if (sectionId !== "neden-gerekli") return section;
  return section.querySelector(".tmcl-section-head") || section;
}

function normalizeHtmlLinks(value: string) {
  return value.replace(/\shref=(["'])(.*?)\1/gi, (_match, quote: string, rawHref: string) => {
    return ` href=${quote}${categoryHref(rawHref)}${quote}`;
  });
}

function normalize(value: string | undefined) {
  return (value || "")
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function safeVariant(product: IkasProduct): IkasProductVariant | null {
  try {
    return getSelectedProductVariant(product) || product.variants?.[0] || null;
  } catch {
    return product.variants?.[0] || null;
  }
}

function findLiveProduct(products: IkasProduct[], title: string) {
  const key = normalize(title);
  return (
    products.find((product) => normalize(product.name) === key) ||
    products.find((product) => {
      const productKey = normalize(product.name);
      return productKey.includes(key) || key.includes(productKey);
    }) ||
    null
  );
}

function liveProductDescription(product: IkasProduct) {
  const categoryName = product.categories?.[0]?.name;
  const brandName = product.brand?.name;
  if (categoryName && brandName) return `${categoryName} · <b>${brandName}</b>`;
  if (categoryName) return categoryName;
  if (brandName) return `<b>${brandName}</b>`;
  return product.name;
}

function liveProductCards(products: IkasProduct[]): CategoryProductCard[] {
  return products.map((product) => ({
    title: product.name,
    descriptionHtml: liveProductDescription(product),
    href: getProductHref(product),
    tag: product.categories?.[0]?.name,
  }));
}

function titleWithEmphasis(prefix: string, emphasis: string, suffix?: string) {
  return (
    <>
      {prefix} <span className="tmcl-em">{emphasis}</span>
      {suffix ? ` ${suffix}` : null}
    </>
  );
}

function categoryStyle(props: CategoryLandingOverrides) {
  return {
    "--tmcl-bg": textValue(props.backgroundColor, "var(--tm-theme-bg, #FAFAF7)"),
    "--tmcl-ink": textValue(props.textColor, "var(--tm-theme-text, #0E0E0C)"),
    "--tmcl-sub": textValue(props.mutedTextColor, "var(--tm-theme-sub, #55554e)"),
    "--tmcl-mut": textValue(props.mutedTextColor, "var(--tm-theme-muted, #8f8f86)"),
    "--tmcl-line": textValue(props.lineColor, "var(--tm-theme-line, #E6E6E0)"),
    "--tmcl-line2": textValue(props.lineColor, "var(--tm-theme-line-strong, #d5d5cd)"),
    "--tmcl-lime": textValue(props.accentColor, "var(--tm-theme-accent, #C7F136)"),
    "--tmcl-panel": textValue(props.panelColor, "var(--tm-theme-panel, #F1F1EC)"),
  };
}

function ButtonLink({ button }: { button: CategoryButton }) {
  const normalizedHref = categoryHref(button.href);

  return (
    <a className={`tmcl-btn tmcl-btn-${button.variant || "dark"}`} href={normalizedHref} onClick={(event) => smoothCategoryClick(event, normalizedHref)}>
      {button.label}
    </a>
  );
}

function BottleIcon() {
  return (
    <svg viewBox="0 0 48 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M18 6h12v8l5 7v31a4 4 0 0 1-4 4H17a4 4 0 0 1-4-4V21l5-7V6z" />
      <line x1="18" y1="6" x2="30" y2="6" />
      <line x1="13" y1="35" x2="35" y2="35" />
    </svg>
  );
}

function PrinterIcon() {
  return (
    <svg viewBox="0 0 64 74" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <rect x="12" y="6" width="40" height="60" rx="9" />
      <rect x="21" y="15" width="22" height="17" rx="2" className="tmcl-icon-red" />
      <line x1="21" y1="44" x2="43" y2="44" />
      <line x1="32" y1="32" x2="32" y2="44" className="tmcl-icon-red" />
      <rect x="19" y="52" width="26" height="8" rx="4" />
    </svg>
  );
}

function ProductCard({
  card,
  cardCtaText,
  kind,
  product,
}: {
  card: CategoryProductCard;
  cardCtaText: string;
  kind: CategoryLandingData["kind"];
  product: IkasProduct | null;
}) {
  const variant = product ? safeVariant(product) : null;
  const media = variant ? getProductVariantMainImage(variant) : undefined;
  const image = media?.image;
  const href = categoryHref(product ? getProductHref(product) : card.href);
  const liveImageSrc = image ? getDefaultSrc(image) : "";
  const imageSrc = card.sourceIcon ? "" : card.imageSrc || liveImageSrc;
  const imageAlt = card.imageAlt || image?.altText || card.title;

  return (
    <a className={`tmcl-product-card${card.hot ? " is-hot" : ""}`} href={href}>
      <div className="tmcl-product-media" style={card.tone ? { "--tmcl-card-tone": card.tone } as any : undefined}>
        {card.tag ? <span className={`tmcl-card-tag${card.hot ? " is-hot" : ""}`}>{card.tag}</span> : null}
        {card.status ? <span className="tmcl-card-status">{card.status}</span> : null}
        {imageSrc ? (
          media?.isVideo && !card.imageSrc ? (
            <video src={imageSrc} muted playsInline loop autoPlay />
          ) : (
            <img src={imageSrc} srcSet={card.imageSrc || !image ? undefined : createMediaSrcset(image)} alt={imageAlt} loading="lazy" decoding="async" />
          )
        ) : kind === "printers" ? (
          <PrinterIcon />
        ) : (
          <BottleIcon />
        )}
      </div>
      <div className="tmcl-product-body">
        <h3>{card.title}</h3>
        <p dangerouslySetInnerHTML={rich(card.descriptionHtml)} />
        {card.specs?.length ? (
          <div className="tmcl-product-specs">
            {card.specs.map((spec) => (
              <div key={`${card.title}-${spec.label}`}>
                <span>{spec.label}</span>
                <b>{spec.value}</b>
              </div>
            ))}
          </div>
        ) : null}
        <span className="tmcl-card-link">
          {cardCtaText} <em>→</em>
        </span>
      </div>
    </a>
  );
}

function SectionIndex({ number, label }: { number: string; label: string }) {
  return (
    <div className="tmcl-index">
      <span className="tmcl-index-number">{number}</span>
      <span className="tmcl-index-label">{label}</span>
      <span className="tmcl-index-line" />
    </div>
  );
}

function SectionHead({ section }: { section: CategorySectionHead }) {
  return (
    <>
      <SectionIndex number={section.number} label={section.label} />
      <div className="tmcl-section-head">
        <h2>{titleWithEmphasis(section.titlePrefix, section.titleEmphasis, section.titleSuffix)}</h2>
        <div className="tmcl-section-side" dangerouslySetInnerHTML={rich(section.sideHtml)} />
      </div>
    </>
  );
}

function FaqItem({ item, defaultOpen }: { item: CategoryFaq; defaultOpen: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const panelId = `tmcl-faq-${routeKey(item.question)}`;

  return (
    <div className={`tmcl-faq-item${isOpen ? " is-open" : ""}`}>
      <button type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setIsOpen((current) => !current)}>
        {item.question}
        <span>+</span>
      </button>
      <div className="tmcl-faq-panel" id={panelId}>
        <div dangerouslySetInnerHTML={rich(item.answerHtml)} />
      </div>
    </div>
  );
}

export default function ThreeMashCategoryLanding(props: Props) {
  const { data, productList } = props;
  const heroButtons = data.hero.buttons.map((button, index) => {
    if (index === 0) {
      return {
        ...button,
        label: textValue(props.primaryButtonText, button.label),
        href: textValue(props.primaryButtonHref, button.href),
      };
    }
    if (index === 1) {
      return {
        ...button,
        label: textValue(props.secondaryButtonText, button.label),
        href: textValue(props.secondaryButtonHref, button.href),
      };
    }
    return button;
  });
  const heroMetrics = data.hero.metrics.map((metric, index) => {
    if (index === 0) {
      return {
        ...metric,
        value: textValue(props.metric1Value, metric.value),
        label: textValue(props.metric1Label, metric.label),
      };
    }
    if (index === 1) {
      return {
        ...metric,
        value: textValue(props.metric2Value, metric.value),
        label: textValue(props.metric2Label, metric.label),
      };
    }
    return metric;
  });
  const finalButtons = data.finalCta.buttons.map((button, index) => {
    if (index === 0) {
      return {
        ...button,
        label: textValue(props.finalPrimaryButtonText, button.label),
        href: textValue(props.finalPrimaryButtonHref, button.href),
      };
    }
    if (index === 1) {
      return {
        ...button,
        label: textValue(props.finalSecondaryButtonText, button.label),
        href: textValue(props.finalSecondaryButtonHref, button.href),
      };
    }
    return button;
  });
  const [activeFilter, setActiveFilter] = useState(data.selector.filters?.[0]?.id || "all");
  const liveProducts = productList?.data || [];
  const liveProductsByTitle = useMemo(() => {
    const map = new Map<string, IkasProduct>();
    liveProducts.forEach((product) => map.set(normalize(product.name), product));
    return map;
  }, [liveProducts]);
  const productCards = data.selector.products.length ? data.selector.products : liveProductCards(liveProducts);
  const visibleCards = productCards.filter((card) => activeFilter === "all" || card.filterId === activeFilter);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const payload = {
      enabled: true,
      highlightText: textValue(props.eyebrowText, data.announcement.highlight),
      text: data.announcement.text,
      ctaText: data.announcement.ctaText,
      href: data.announcement.href,
    };
    const targetWindow = window as CategoryAnnouncementWindow;
    targetWindow.__THREE_MASH_PRODUCT_ANNOUNCEMENT__ = payload;
    window.dispatchEvent(new CustomEvent("three-mash:product-announcement", { detail: payload }));

    return () => {
      window.requestAnimationFrame(() => {
        if (targetWindow.__THREE_MASH_PRODUCT_ANNOUNCEMENT__ !== payload) return;
        delete targetWindow.__THREE_MASH_PRODUCT_ANNOUNCEMENT__;
        window.dispatchEvent(new CustomEvent("three-mash:product-announcement", { detail: { enabled: false } }));
      });
    };
  }, [data.announcement.ctaText, data.announcement.highlight, data.announcement.href, data.announcement.text, props.eyebrowText]);

  useLayoutEffect(() => {
    const pending = consumePendingAnchorScroll();
    if (!pending) return undefined;

    let frame = 0;
    let attempts = 0;
    const previousScrollBehavior = document.documentElement.style.scrollBehavior;
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    document.documentElement.style.scrollBehavior = "auto";
    safeHistoryReplace(`${window.location.pathname}${window.location.search}`);
    window.scrollTo(0, 0);

    const scrollToPending = () => {
      const section = document.getElementById(pending.sectionId);
      if (!section) {
        attempts += 1;
        if (attempts < 90) frame = window.requestAnimationFrame(scrollToPending);
        return;
      }

      const target = anchorScrollTarget(section, pending.sectionId);
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
      target.scrollIntoView({ behavior: "smooth", block: pending.block });
      safeHistoryReplace(`#${pending.sectionId}`);
    };

    const timeout = window.setTimeout(() => {
      window.scrollTo(0, 0);
      frame = window.requestAnimationFrame(scrollToPending);
    }, 520);

    return () => {
      window.clearTimeout(timeout);
      if (frame) window.cancelAnimationFrame(frame);
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  return (
    <section className={`three-mash-category-landing tmcl-${data.kind}`} style={categoryStyle(props) as any}>
      <div className="tmcl-hero">
        <div className="tmcl-wrap">
          <div className="tmcl-crumb">
            <a href={categoryHref(data.breadcrumb.homeHref)}>{data.breadcrumb.homeLabel}</a>
            {" \u00A0/\u00A0 "}
            <a href={parentCategoryHref(data)}>{data.breadcrumb.parentLabel}</a>
            {" \u00A0/\u00A0 "}
            <span aria-current="page">{data.breadcrumb.currentLabel}</span>
          </div>
          <h1>{titleWithEmphasis(
            textValue(props.heroTitlePrefix, data.hero.titlePrefix),
            textValue(props.heroTitleEmphasis, data.hero.titleEmphasis),
            props.heroTitleSuffix !== undefined ? props.heroTitleSuffix : data.hero.titleSuffix,
          )}</h1>
          <p dangerouslySetInnerHTML={rich(richValue(props.heroDescriptionHtml, data.hero.descriptionHtml))} />
          <div className="tmcl-actions">
            {heroButtons.map((button) => (
              <ButtonLink button={button} key={`${button.label}-${button.href}`} />
            ))}
          </div>
          <div className="tmcl-value-strip">
            {heroMetrics.map((metric) => (
              <div key={`${metric.value}-${metric.label}`}>
                <strong>
                  {metric.value}
                  {metric.emphasis ? <em>{metric.emphasis}</em> : null}
                </strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="tmcl-section" id={data.selector.anchorId}>
        <div className="tmcl-wrap">
          <SectionHead section={data.selector} />
          {data.selector.filters?.length ? (
            <div className="tmcl-filter-chips" aria-label={data.selector.label}>
              {data.selector.filters.map((filter) => (
                <button
                  type="button"
                  className={filter.id === activeFilter ? "is-active" : ""}
                  onClick={() => setActiveFilter(filter.id)}
                  key={filter.id}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          ) : null}

          <div className={`tmcl-product-grid tmcl-product-grid-${data.kind}`}>
            {visibleCards.map((card) => (
              <ProductCard
                card={card}
                cardCtaText={data.selector.cardCtaText}
                kind={data.kind}
                product={liveProductsByTitle.get(normalize(card.title)) || findLiveProduct(liveProducts, card.title)}
                key={card.title}
              />
            ))}
            {!visibleCards.length && data.selector.emptyMessageHtml ? (
              <div className="tmcl-empty" dangerouslySetInnerHTML={rich(data.selector.emptyMessageHtml)} />
            ) : null}
          </div>

          {data.selector.compare ? (
            <>
              <div className="tmcl-compare">
                <table>
                  <thead>
                    <tr>
                      {data.selector.compare.columns.map((column) => (
                        <th key={column.title}>
                          {column.title}
                          {column.subtitle ? <span>{column.subtitle}</span> : null}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.selector.compare.rows.map((row) => (
                      <tr key={row.label}>
                        <td>{row.label}</td>
                        {row.values.map((value, index) => (
                          <td dangerouslySetInnerHTML={rich(value)} key={`${row.label}-${index}`} />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {data.selector.compare.noteHtml ? <p className="tmcl-note" dangerouslySetInnerHTML={rich(data.selector.compare.noteHtml)} /> : null}
            </>
          ) : null}
        </div>
      </section>

      <section className="tmcl-section tmcl-section-tight" id={routeKey(data.detail.label)}>
        <div className="tmcl-wrap">
          <SectionIndex number={data.feature.number} label={data.feature.label} />
          <div className="tmcl-flag">
            <div>
              <div className="tmcl-flag-tag">{data.feature.content.eyebrow}</div>
              <h3>
                {data.feature.content.titlePrefix} <em>{data.feature.content.titleEmphasis}</em>
                {data.feature.content.titleSuffix ? ` ${data.feature.content.titleSuffix}` : null}
              </h3>
              <p dangerouslySetInnerHTML={rich(data.feature.content.descriptionHtml)} />
              <a href={categoryHref(data.feature.content.href)}>{data.feature.content.ctaText}</a>
            </div>
            <div className="tmcl-spec-table">
              {data.feature.content.specs.map((spec) => (
                <div key={`${spec.label}-${spec.value}`}>
                  <span>{spec.label}</span>
                  <b>{spec.value}</b>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="tmcl-section tmcl-section-tight">
        <div className="tmcl-wrap">
          <SectionHead section={data.detail} />
          {data.detail.lineCards?.length ? (
            <div className="tmcl-line-cards">
              {data.detail.lineCards.map((card) => (
                <div className={`tmcl-line-card tmcl-line-card-${card.variant || "plain"}`} key={card.title}>
                  <div className="tmcl-line-title">
                    <span>{card.marker}</span>
                    <h3>{card.title}</h3>
                  </div>
                  <p dangerouslySetInnerHTML={rich(card.descriptionHtml)} />
                  <ul>
                    {card.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : null}
          {data.detail.whyCards?.length ? (
            <div className="tmcl-why-grid">
              {data.detail.whyCards.map((card) => (
                <div className="tmcl-why-card" key={card.number}>
                  <span>{card.number}</span>
                  <h3>{card.title}</h3>
                  <p dangerouslySetInnerHTML={rich(card.descriptionHtml)} />
                </div>
              ))}
            </div>
          ) : null}
          {data.detail.callout ? (
            <div className="tmcl-callout">
              <div>
                <h3>{titleWithEmphasis(data.detail.callout.titlePrefix, data.detail.callout.titleEmphasis, data.detail.callout.titleSuffix)}</h3>
                <p dangerouslySetInnerHTML={rich(data.detail.callout.descriptionHtml)} />
              </div>
              <div className="tmcl-callout-actions">
                {data.detail.callout.buttons.map((button) => (
                  <ButtonLink button={button} key={`${button.label}-${button.href}`} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="tmcl-section tmcl-section-tight" id="sss">
        <div className="tmcl-wrap">
          <SectionIndex number={data.faq.number} label={data.faq.label} />
          <div className="tmcl-section-head">
            <h2>{data.faq.title}</h2>
            <div className="tmcl-section-side" dangerouslySetInnerHTML={rich(data.faq.sideHtml)} />
          </div>
          <div className="tmcl-faq">
            {data.faq.items.map((item, index) => (
              <FaqItem item={item} defaultOpen={index === 0} key={item.question} />
            ))}
          </div>
        </div>
      </section>

      <section className="tmcl-final">
        <div className="tmcl-wrap">
          <h2>{titleWithEmphasis(
            textValue(props.finalTitlePrefix, data.finalCta.titlePrefix),
            textValue(props.finalTitleEmphasis, data.finalCta.titleEmphasis),
            data.finalCta.titleSuffix,
          )}</h2>
          <p dangerouslySetInnerHTML={rich(richValue(props.finalDescriptionHtml, data.finalCta.descriptionHtml))} />
          <div className="tmcl-actions tmcl-final-actions">
            {finalButtons.map((button) => (
              <ButtonLink button={button} key={`${button.label}-${button.href}`} />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
