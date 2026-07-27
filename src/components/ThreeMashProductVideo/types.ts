// This file is auto-generated — do not edit manually.
import type { IkasProduct, IkasImage } from "@ikas/bp-storefront";

export interface Props {
  /** Aktif olduğunda bu bölüm, seçili ürün veya sayfa ürünü için aşağıdaki ürün bazlı ayarları kullanır. */
  productBasedEnabled?: boolean;
  /** Spesifik ürün seçebilir veya bu alanın kendi Sayfanın ürününü kullan seçeneğini açarak mevcut ürün sayfasına otomatik bağlayabilirsin. */
  product?: IkasProduct | null;
  /** Sayfa içi link için id. Boş bırakılabilir. */
  productBasedSectionAnchorId?: string;
  /** YouTube, Vimeo, embed, mp4 veya webm linki girilebilir. */
  productBasedVideoUrl?: string;
  /** Direkt mp4/webm linklerinde video başlamadan önce gösterilir. */
  productBasedPosterImage?: IkasImage | null;
  productBasedShowText?: boolean;
  productBasedTitleText?: string;
  productBasedDescriptionHtml?: string;
  /** left, center veya right. */
  productBasedTextAlign?: string;
  productBasedControlsEnabled?: boolean;
  /** Tarayıcı kuralı nedeniyle otomatik oynatma açılırsa video sessize alınır. */
  productBasedAutoplayEnabled?: boolean;
  productBasedMutedEnabled?: boolean;
  productBasedLoopEnabled?: boolean;
  productBasedPlaysInlineEnabled?: boolean;
  productBasedLazyLoadEnabled?: boolean;
  productBasedMaxWidth?: number;
  productBasedVideoMaxWidth?: number;
  productBasedPaddingTop?: number;
  productBasedPaddingBottom?: number;
  /** CSS aspect-ratio değeri. Örn: 16 / 9, 4 / 3, 1 / 1. */
  productBasedVideoAspectRatio?: string;
  productBasedVideoBorderRadius?: number;
  /** Direkt video linklerinde contain, cover, fill veya scale-down. */
  productBasedVideoFit?: string;
  productBasedTitleFontSize?: number;
  productBasedBodyFontSize?: number;
  productBasedTextSpacing?: number;
  productBasedBackgroundColor?: string;
  productBasedTextColor?: string;
  productBasedMutedTextColor?: string;
  productBasedPlaceholderText?: string;
  /** Sayfa içi link için id. Boş bırakılabilir. */
  sectionAnchorId?: string;
  /** YouTube, Vimeo, embed, mp4 veya webm linki girilebilir. */
  videoUrl?: string;
  /** Direkt mp4/webm linklerinde video başlamadan önce gösterilir. */
  posterImage?: IkasImage | null;
  showText?: boolean;
  titleText?: string;
  descriptionHtml?: string;
  /** left, center veya right. */
  textAlign?: string;
  controlsEnabled?: boolean;
  /** Tarayıcı kuralı nedeniyle otomatik oynatma açılırsa video sessize alınır. */
  autoplayEnabled?: boolean;
  mutedEnabled?: boolean;
  loopEnabled?: boolean;
  playsInlineEnabled?: boolean;
  lazyLoadEnabled?: boolean;
  maxWidth?: number;
  videoMaxWidth?: number;
  paddingTop?: number;
  paddingBottom?: number;
  /** CSS aspect-ratio değeri. Örn: 16 / 9, 4 / 3, 1 / 1. */
  videoAspectRatio?: string;
  videoBorderRadius?: number;
  /** Direkt video linklerinde contain, cover, fill veya scale-down. */
  videoFit?: string;
  titleFontSize?: number;
  bodyFontSize?: number;
  textSpacing?: number;
  backgroundColor?: string;
  textColor?: string;
  mutedTextColor?: string;
  placeholderText?: string;
}
