import { getDefaultSrc } from "@ikas/bp-storefront";
import { Props } from "./types";
import { useSharedProductDetailData, resolveProductDetailData } from "../../sub-components/ThreeMashProductDetailData";
import {
  ProductDetailSectionScope,
  ProductDetailVideoSection,
  type ProductDetailTemplateData,
} from "../../sub-components/ThreeMashProductDetailTemplate";
import { isEnglishLocale, isTurkishText, tLocalized } from "../../utils/i18n";
import { safeNavigationHref } from "../../utils/safeRedirect";

function trimmedText(value: unknown): string {
  const trimmed = typeof value === "string" ? value.trim() : "";
  if (isEnglishLocale() && isTurkishText(trimmed)) return "";
  return trimmed;
}

function imageSource(value: unknown): string {
  if (!value) return "";
  if (typeof value === "string") return value.trim();
  // NOTE: getDefaultSrc is from @ikas/bp-storefront (third-party).
  // Its type signature expects IkasImage-like object; value is of unknown type from props.
  try { return getDefaultSrc(value as any) || ""; } catch { return ""; }
}

export const DEFAULT_PRODUCT_VIDEO_HREF = "https://www.youtube.com/watch?v=dNPHy_sd9aQ";

function overrideVideoData(baseData: ProductDetailTemplateData | null, props: Props): ProductDetailTemplateData {
  const currentVideo = baseData?.video;
  // NOTE: Props ARE fully typed in types.ts, but TypeScript's type narrowing
  // after optional chaining sometimes requires explicit any casts for clarity in override chains.
  const p = props as any;

  // 01. Bölüm Başlığı
  const index = trimmedText(p.sectionIndex) || currentVideo?.index || "04";
  const label = trimmedText(p.sectionLabel) || currentVideo?.label || tLocalized("VİDEO", "VIDEO");
  const titleHtml = trimmedText(p.titleHtml) || currentVideo?.titleHtml || "";
  const sideHtml = trimmedText(p.sideHtml) || currentVideo?.sideHtml || "";

  // 02. Video Bağlantısı ve Kapak (Resolution: Studio prop override > hardcoded default)
  const videoUrl = props.videoHref?.trim()
    ? props.videoHref
    : (currentVideo?.href?.trim() || DEFAULT_PRODUCT_VIDEO_HREF);

  const href = safeNavigationHref(videoUrl, DEFAULT_PRODUCT_VIDEO_HREF);
  const image = imageSource(p.posterImage) || currentVideo?.image || "https://img.youtube.com/vi/dNPHy_sd9aQ/maxresdefault.jpg";
  const imageAlt = trimmedText(p.posterImageAlt) || currentVideo?.imageAlt || "Video";

  const base = baseData || ({
    key: "product-video",
    breadcrumb: { homeText: "", homeHref: "", categoryText: "", categoryHref: "", productText: "" },
    hero: { kicker: "", titleHtml: "", leadHtml: "", pills: [], gallery: [], summarySuffix: "", buyHrefBase: "", whatsappHref: "", whatsappText: "", addToCartText: "", addingToCartText: "", outOfStockText: "", selectedPrefix: "", trustBadges: [] },
  } as ProductDetailTemplateData);

  return {
    ...base,
    video: { index, label, titleHtml, sideHtml, href, image, imageAlt, title: "", text: "", meta: "" },
  };
}

export function ThreeMashProductVideo(props: Props) {
  const sharedData = useSharedProductDetailData(props.product);
  const fallbackData = props.product ? resolveProductDetailData(props.product) : null;
  const rawData = sharedData || fallbackData;

  const data = overrideVideoData(rawData, props);

  return (
    <ProductDetailSectionScope data={data}>
      <ProductDetailVideoSection data={data} />
    </ProductDetailSectionScope>
  );
}

export default ThreeMashProductVideo;
