// This file is auto-generated — do not edit manually.
import type { IkasImage } from "@ikas/bp-storefront";

export interface Props {
  /** Sayfa içi link için id. Boş bırakılabilir. */
  sectionAnchorId?: string;
  /** Boş değilse Başlık Metni yerine kullanılır. */
  titleHtml?: string;
  titleText?: string;
  descriptionHtml?: string;
  subTitle?: string;
  bullet1Text?: string;
  bullet2Text?: string;
  bullet3Text?: string;
  bullet4Text?: string;
  bullet5Text?: string;
  bullet6Text?: string;
  imageUrl?: IkasImage | null;
  imageAlt?: string;
  /** Açılırsa yazı sola, görsel sağa geçer. */
  reverseLayout?: boolean;
  maxWidth?: number;
  paddingTop?: number;
  paddingBottom?: number;
  columnGap?: number;
  imageColumnWidth?: number;
  textColumnWidth?: number;
  imageMaxWidth?: number;
  /** CSS aspect-ratio değeri. Örn: 16 / 9, 1.65 / 1. */
  imageAspectRatio?: string;
  /** contain, cover, fill veya scale-down. */
  imageObjectFit?: string;
  imageScale?: number;
  imageXOffset?: number;
  imageYOffset?: number;
  titleFontSize?: number;
  bodyFontSize?: number;
  subtitleFontSize?: number;
  backgroundColor?: string;
  textColor?: string;
  mutedTextColor?: string;
}
