// This file is auto-generated — do not edit manually.
import type { IkasImage } from "@ikas/bp-storefront";

export interface Props {
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
