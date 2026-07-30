import { createMediaSrcset, getDefaultSrc } from "@ikas/bp-storefront";
import { Props } from "./types";
import { resolveProductDetailData } from "../../sub-components/ThreeMashProductDetailData";
import { ProductDetailSectionScope, ProductDetailSpecHighlightSection } from "../../sub-components/ThreeMashProductDetailTemplate";

const ZIRCON_PRODUCTS = [
  { slug: "argenz-st-multilayer-zirkon-blok", aliases: ["ArgenZ ST Multilayer Zirkon Blok"] },
  { slug: "argenz-ht-plus-zirkon-blok", aliases: ["ArgenZ HT+ Zirkon Blok", "ArgenZ HT Plus Zirkon Blok"] },
  { slug: "argenz-ht-multilayer-zirkon-blok", aliases: ["ArgenZ HT Multilayer Zirkon Blok"] },
] as const;

function propString(value: unknown) {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (!value || typeof value !== "object") return "";

  const data = value as Record<string, unknown>;
  const candidates = [
    data.name,
    data.slug,
    data.handle,
    data.href,
    data.url,
    data.src,
    data.defaultSrc,
    data.originalSrc,
    data.imageUrl,
    data.value,
    data.text,
    (data.product as Record<string, unknown> | undefined)?.name,
    (data.product as Record<string, unknown> | undefined)?.slug,
    (data.product as Record<string, unknown> | undefined)?.href,
    (data.product as Record<string, unknown> | undefined)?.url,
    (data.image as Record<string, unknown> | undefined)?.src,
    (data.image as Record<string, unknown> | undefined)?.url,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) return candidate;
  }

  return "";
}

function slugify(value?: string) {
  return (value || "")
    .toLocaleLowerCase("tr")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function currentPageText() {
  const parts: string[] = [];
  if (typeof window !== "undefined") {
    parts.push(window.location.pathname, window.location.href);
    const nextSlug = (window as any).__NEXT_DATA__?.query?.slug;
    if (typeof nextSlug === "string") parts.push(nextSlug);
  }
  if (typeof document !== "undefined") {
    parts.push(document.title);
    document.querySelectorAll('link[rel="canonical"], meta[property="og:url"], meta[property="og:title"], meta[name="twitter:title"]').forEach((node) => {
      const value = node instanceof HTMLMetaElement ? node.content : node.getAttribute("href");
      if (value) parts.push(value);
    });
  }

  return slugify(parts.join(" "));
}

function sectionIsActive(props: Props) {
  const pageText = slugify(`${currentPageText()} ${propString(props.product)}`);

  return ZIRCON_PRODUCTS.some(({ slug, aliases }) => {
    const terms = [slug, ...aliases].map(slugify);
    return terms.some((term) => pageText.includes(term));
  });
}

function imageSource(value: unknown) {
  if (!value) return "";
  if (typeof value === "string") return value.trim();
  try {
    return getDefaultSrc(value as any) || propString(value);
  } catch {
    return propString(value);
  }
}

function imageSrcSet(value: unknown) {
  if (!value || typeof value === "string") return "";
  try {
    return createMediaSrcset(value as any) || "";
  } catch {
    return "";
  }
}

export function ThreeMashProductLargeImage(props: Props) {
  const sourceData = resolveProductDetailData(props.product, (props as Record<string, unknown>).productTemplateJson);
  if (sourceData) {
    return (
      <ProductDetailSectionScope data={sourceData}>
        <ProductDetailSpecHighlightSection data={sourceData} />
      </ProductDetailSectionScope>
    );
  }

  if (!sectionIsActive(props)) return null;

  const src = imageSource(props.image);
  if (!src) return null;

  const srcSet = imageSrcSet(props.image);

  return (
    <section className="three-mash-product-large-image">
      <div className="tmplg-wrap">
        <div className="tmplg-frame">
          <img
            src={src}
            srcSet={srcSet || undefined}
            sizes="(max-width: 900px) calc(100vw - 36px), min(1240px, calc(100vw - 64px))"
            alt="Zirkon blok ürün görseli"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}

export default ThreeMashProductLargeImage;
