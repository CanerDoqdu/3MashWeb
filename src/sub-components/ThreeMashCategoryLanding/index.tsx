import { useEffect, useMemo, useState } from "preact/hooks";
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
  kind: "resins" | "printers" | "generic";
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
    currentLabel: string;
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

interface Props {
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
  return { __html: value };
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

function ButtonLink({ button }: { button: CategoryButton }) {
  return (
    <a className={`tmcl-btn tmcl-btn-${button.variant || "dark"}`} href={button.href}>
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
  const href = product ? getProductHref(product) : card.href;
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

export default function ThreeMashCategoryLanding({ data, productList }: Props) {
  const [activeFilter, setActiveFilter] = useState(data.selector.filters?.[0]?.id || "all");
  const liveProducts = productList?.data || [];
  const liveProductsByTitle = useMemo(() => {
    const map = new Map<string, IkasProduct>();
    liveProducts.forEach((product) => map.set(normalize(product.name), product));
    return map;
  }, [liveProducts]);
  const productCards = data.selector.products.length ? data.selector.products : liveProductCards(liveProducts);
  const visibleCards = productCards.filter((card) => activeFilter === "all" || card.filterId === activeFilter);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const payload = {
      enabled: true,
      highlightText: data.announcement.highlight,
      text: data.announcement.text,
      ctaText: data.announcement.ctaText,
      href: data.announcement.href,
    };
    const targetWindow = window as CategoryAnnouncementWindow;
    targetWindow.__THREE_MASH_PRODUCT_ANNOUNCEMENT__ = payload;
    window.dispatchEvent(new CustomEvent("three-mash:product-announcement", { detail: payload }));

    return () => {
      delete targetWindow.__THREE_MASH_PRODUCT_ANNOUNCEMENT__;
      window.dispatchEvent(new CustomEvent("three-mash:product-announcement", { detail: { enabled: false } }));
    };
  }, [data.announcement.ctaText, data.announcement.highlight, data.announcement.href, data.announcement.text]);

  return (
    <section className={`three-mash-category-landing tmcl-${data.kind}`}>
      <div className="tmcl-hero">
        <div className="tmcl-wrap">
          <div className="tmcl-crumb">
            <a href={data.breadcrumb.homeHref}>{data.breadcrumb.homeLabel}</a>
            {" \u00A0/\u00A0 "}
            <span>{data.breadcrumb.parentLabel}</span>
            {" \u00A0/\u00A0 "}
            <span>{data.breadcrumb.currentLabel}</span>
          </div>
          <h1>{titleWithEmphasis(data.hero.titlePrefix, data.hero.titleEmphasis, data.hero.titleSuffix)}</h1>
          <p dangerouslySetInnerHTML={rich(data.hero.descriptionHtml)} />
          <div className="tmcl-actions">
            {data.hero.buttons.map((button) => (
              <ButtonLink button={button} key={`${button.label}-${button.href}`} />
            ))}
          </div>
          <div className="tmcl-value-strip">
            {data.hero.metrics.map((metric) => (
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

      <section className="tmcl-section tmcl-section-tight">
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
              <a href={data.feature.content.href}>{data.feature.content.ctaText}</a>
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
              <div className="tmcl-faq-item" key={item.question}>
                <details open={index === 0}>
                  <summary>
                    {item.question}
                    <span>+</span>
                  </summary>
                  <div dangerouslySetInnerHTML={rich(item.answerHtml)} />
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tmcl-final">
        <div className="tmcl-wrap">
          <h2>{titleWithEmphasis(data.finalCta.titlePrefix, data.finalCta.titleEmphasis, data.finalCta.titleSuffix)}</h2>
          <p dangerouslySetInnerHTML={rich(data.finalCta.descriptionHtml)} />
          <div className="tmcl-actions tmcl-final-actions">
            {data.finalCta.buttons.map((button) => (
              <ButtonLink button={button} key={`${button.label}-${button.href}`} />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
