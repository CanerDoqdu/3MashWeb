import { Props } from "./types";
import { useSharedProductDetailData, resolveProductDetailData } from "../../sub-components/ThreeMashProductDetailData";
import {
  ProductDetailSectionScope,
  ProductDetailVideoSection,
  type ProductDetailTemplateData,
} from "../../sub-components/ThreeMashProductDetailTemplate";
import { isEnglishLocale, isTurkishText, tLocalized } from "../../utils/i18n";

function trimmedText(value: unknown): string {
  const trimmed = typeof value === "string" ? value.trim() : "";
  if (isEnglishLocale() && isTurkishText(trimmed)) return "";
  return trimmed;
}

function safeVideoHref(value: unknown): string {
  const href = typeof value === "string" ? value.trim() : "";
  if (!href) return "";

  try {
    const url = new URL(href);
    if (url.protocol !== "https:") return "";

    const host = url.hostname.toLowerCase();
    const isVideoHost = ["youtube.com", "www.youtube.com", "youtu.be", "vimeo.com", "player.vimeo.com"].includes(host);
    const isDirectVideo = /\.(mp4|webm|ogg|mov)(?:$|[?#])/i.test(url.pathname);

    return isVideoHost || isDirectVideo ? url.href : "";
  } catch {
    return "";
  }
}

function overrideVideoData(baseData: ProductDetailTemplateData | null, props: Props): ProductDetailTemplateData | null {
  const currentVideo = baseData?.video;

  // 01. Bölüm Başlığı
  const index = trimmedText(props.sectionIndex) || currentVideo?.index || "04";
  const label = trimmedText(props.sectionLabel) || currentVideo?.label || tLocalized("VİDEO", "VIDEO");
  const titleHtml = trimmedText(props.titleHtml) || currentVideo?.titleHtml || "";
  const sideHtml = trimmedText(props.sideHtml) || currentVideo?.sideHtml || "";

  const href = safeVideoHref(props.videoHref) || safeVideoHref(currentVideo?.href);
  if (!href) return null;

  const base = baseData || ({
    key: "product-video",
    breadcrumb: { homeText: "", homeHref: "", categoryText: "", categoryHref: "", productText: "" },
    hero: { kicker: "", titleHtml: "", leadHtml: "", pills: [], gallery: [], summarySuffix: "", buyHrefBase: "", whatsappHref: "", whatsappText: "", addToCartText: "", addingToCartText: "", outOfStockText: "", selectedPrefix: "", trustBadges: [] },
  } as ProductDetailTemplateData);

  return {
    ...base,
    video: {
      index,
      label,
      titleHtml,
      sideHtml,
      href,
      image: currentVideo?.image || "",
      imageAlt: currentVideo?.imageAlt || "",
      title: currentVideo?.title || tLocalized("Ürün videosu", "Product video"),
      text: currentVideo?.text || "",
      meta: currentVideo?.meta || "",
    },
  };
}

export function ThreeMashProductVideo(props: Props) {
  const sharedData = useSharedProductDetailData(props.product);
  const fallbackData = props.product ? resolveProductDetailData(props.product) : null;
  const rawData = sharedData || fallbackData;

  const data = overrideVideoData(rawData, props);
  if (!data) return null;

  return (
    <ProductDetailSectionScope
      data={data}
      colorOverrides={{
        backgroundColor: props.backgroundColor,
        textColor: props.textColor,
      }}
    >
      <ProductDetailVideoSection data={data} />
    </ProductDetailSectionScope>
  );
}

export default ThreeMashProductVideo;
