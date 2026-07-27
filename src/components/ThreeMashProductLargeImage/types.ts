// This file is auto-generated — do not edit manually.
import type { IkasImage } from "@ikas/bp-storefront";

export interface Props {
  /** Sayfa içi link için id. Boş bırakılabilir. */
  sectionAnchorId?: string;
  image?: IkasImage | null;
  /** IMAGE alanı boşsa bu URL kullanılır. */
  imageUrl?: string;
  /** Erişilebilirlik ve SEO için görsel açıklaması. */
  imageAlt?: string;
  showText?: boolean;
  titleText?: string;
  descriptionHtml?: string;
  /** left, center veya right. */
  textAlign?: string;
  maxWidth?: number;
  imageMaxWidth?: number;
  paddingTop?: number;
  paddingBottom?: number;
  /** CSS aspect-ratio değeri. Örn: 16 / 9, 4 / 3, 1 / 1. */
  imageAspectRatio?: string;
  imageBorderRadius?: number;
  /** contain, cover, fill, scale-down veya none. */
  imageFit?: string;
  /** CSS object-position. Örn: center center, top center, 50% 40%. */
  imagePosition?: string;
  /** lazy veya eager. İlk ekrandaki kritik görsel için eager kullanılabilir. */
  loadingMode?: string;
  /** async, sync veya auto. */
  decodingMode?: string;
  /** high, low veya auto. İlk ekrandaki ana görsel için high kullanılabilir. */
  fetchPriorityMode?: string;
  /** Tarayıcının doğru responsive görsel seçmesi için sizes değeri. */
  sizes?: string;
  /** ikas IMAGE datası varsa responsive srcset üretir. */
  useSrcSet?: boolean;
  titleFontSize?: number;
  bodyFontSize?: number;
  textSpacing?: number;
  backgroundColor?: string;
  textColor?: string;
  mutedTextColor?: string;
  placeholderText?: string;
}
