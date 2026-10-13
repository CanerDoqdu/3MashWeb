import { Props } from "./types";
import { useAlternateProductPageEnabled, useSharedProductDetailData, resolveProductDetailData } from "../../sub-components/ThreeMashProductDetailData";
import {
  ProductDetailSectionScope,
  ProductDetailVideoSection,
  type ProductDetailTemplateData,
} from "../../sub-components/ThreeMashProductDetailTemplate";
import { isEnglishLocale, isTurkishText, tLocalized } from "../../utils/i18n";
import { isStudioEnvironment } from "../../utils/isStudioEnvironment";

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

function overrideVideoData(baseData: ProductDetailTemplateData | null, props: Props, showPlaceholder: boolean): ProductDetailTemplateData | null {
  const currentVideo = baseData?.video;

  // 01. Bölüm Başlığı
  const index = trimmedText(props.sectionIndex) || currentVideo?.index || "04";
  const label = trimmedText(props.sectionLabel) || currentVideo?.label || tLocalized("VİDEO", "VIDEO");
  const titleHtml = trimmedText(props.titleHtml) || currentVideo?.titleHtml || "";
  const sideHtml = trimmedText(props.sideHtml) || currentVideo?.sideHtml || "";

  const href = safeVideoHref(props.videoHref) || safeVideoHref(currentVideo?.href);
  if (!href && !showPlaceholder) return null;

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
      titleHtml: titleHtml || (showPlaceholder ? tLocalized("Buraya ürün tanıtım videosunun <span class=\"em\">başlığını yazın.</span>", "Add a <span class=\"em\">title</span> for the product video here.") : ""),
      sideHtml: sideHtml || (showPlaceholder ? tLocalized("YouTube, Vimeo veya doğrudan video adresini Video URL alanına ekleyin.", "Add a YouTube, Vimeo, or direct video URL in the Video URL field.") : ""),
      href,
      image: currentVideo?.image || "",
      imageAlt: currentVideo?.imageAlt || "",
      title: currentVideo?.title || tLocalized("Ürün videosu", "Product video"),
      text: currentVideo?.text || (showPlaceholder ? tLocalized("Video adresini ekleyerek bu bölümü tamamlayın.", "Add a video URL to complete this section.") : ""),
      meta: currentVideo?.meta || "",
    },
  };
}

function ThreeMashProductVideoContent(props: Props) {
  const isStudio = isStudioEnvironment();
  const sharedData = useSharedProductDetailData(props.product);
  const fallbackData = props.product ? resolveProductDetailData(props.product) : null;
  const rawData = sharedData || fallbackData;

  const data = overrideVideoData(rawData, props, isStudio);
  if (!data) return null;

  return (
    <ProductDetailSectionScope
      data={data}
      colorOverrides={{
        backgroundColor: props.backgroundColor,
        textColor: props.textColor,
      }}
    >
      <ProductDetailVideoSection data={data} showEmptyState={isStudio} />
    </ProductDetailSectionScope>
  );
}

export function ThreeMashProductVideo(props: Props) {
  if (useAlternateProductPageEnabled()) return null;
  return <ThreeMashProductVideoContent {...props} />;
}

export default ThreeMashProductVideo;
