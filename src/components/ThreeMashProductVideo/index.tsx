import { getDefaultSrc } from "@ikas/bp-storefront";
import { Props } from "./types";
import { useSharedProductDetailData, resolveProductDetailData } from "../../sub-components/ThreeMashProductDetailData";
import {
  ProductDetailSectionScope,
  ProductDetailVideoSection,
  type ProductDetailTemplateData,
} from "../../sub-components/ThreeMashProductDetailTemplate";

function trimmedText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function imageSource(value: unknown): string {
  if (!value) return "";
  if (typeof value === "string") return value.trim();
  try { return getDefaultSrc(value as any) || ""; } catch { return ""; }
}

function overrideVideoData(baseData: ProductDetailTemplateData | null, props: Props): ProductDetailTemplateData | null {
  if (!baseData) return null;

  const currentVideo = baseData.video;
  const p = props as any;

  // 01. Bölüm Başlığı
  const index = trimmedText(p.sectionIndex) || currentVideo?.index || "04";
  const label = trimmedText(p.sectionLabel) || currentVideo?.label || "VİDEO";
  const titleHtml = trimmedText(p.titleHtml) || currentVideo?.titleHtml || "";
  const sideHtml = trimmedText(p.sideHtml) || currentVideo?.sideHtml || "";

  // 02. Video Bağlantısı ve Kapak
  const href = trimmedText(p.videoHref) || currentVideo?.href || "";
  const image = imageSource(p.posterImage) || currentVideo?.image || "";
  const imageAlt = trimmedText(p.posterImageAlt) || currentVideo?.imageAlt || "";

  // 03. Overlay İçerikleri
  const title = trimmedText(p.videoOverlayTitle) || currentVideo?.title || "";
  const text = trimmedText(p.videoOverlayText) || currentVideo?.text || "";
  const meta = trimmedText(p.videoOverlayMeta) || currentVideo?.meta || "";

  return {
    ...baseData,
    video: { index, label, titleHtml, sideHtml, href, image, imageAlt, title, text, meta },
  };
}

export function ThreeMashProductVideo(props: Props) {
  const sharedData = useSharedProductDetailData(props.product);
  const fallbackData = props.product ? resolveProductDetailData(props.product) : null;
  const rawData = sharedData || fallbackData;

  const data = overrideVideoData(rawData, props);

  if (!data?.video) {
    return null;
  }

  return (
    <ProductDetailSectionScope data={data}>
      <ProductDetailVideoSection data={data} />
    </ProductDetailSectionScope>
  );
}

export default ThreeMashProductVideo;
