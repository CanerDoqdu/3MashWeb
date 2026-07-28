// This file is auto-generated — do not edit manually.
import type { IkasProduct, IkasImage } from "@ikas/bp-storefront";

export interface Props {
  /** Aktif olduğunda bu bölüm, seçili ürün veya sayfa ürünü için aşağıdaki ürün bazlı ayarları kullanır. */
  productBasedEnabled?: boolean;
  product?: IkasProduct | null;
  /** Kapalıysa bu ürün için görsel metin detay section render edilmez. */
  productBasedSectionVisible?: boolean;
  /** Sayfa içi link için id. Boş bırakılabilir. */
  productBasedSectionAnchorId?: string;
  /** Boş değilse Başlık Metni yerine kullanılır. */
  productBasedTitleHtml?: string;
  productBasedTitleText?: string;
  productBasedDescriptionHtml?: string;
  productBasedSubTitle?: string;
  productBasedBullet1Text?: string;
  productBasedBullet2Text?: string;
  productBasedBullet3Text?: string;
  productBasedBullet4Text?: string;
  productBasedBullet5Text?: string;
  productBasedBullet6Text?: string;
  productBasedImageUrl?: IkasImage | null;
  productBasedImageAlt?: string;
  /** Açılırsa yazı sola, görsel sağa geçer. */
  productBasedReverseLayout?: boolean;
  productBasedMaxWidth?: number;
  productBasedPaddingTop?: number;
  productBasedPaddingBottom?: number;
  productBasedColumnGap?: number;
  productBasedImageColumnWidth?: number;
  productBasedTextColumnWidth?: number;
  productBasedImageMaxWidth?: number;
  /** CSS aspect-ratio değeri. Örn: 16 / 9, 1.65 / 1. */
  productBasedImageAspectRatio?: string;
  /** contain, cover, fill veya scale-down. */
  productBasedImageObjectFit?: string;
  productBasedImageScale?: number;
  productBasedImageXOffset?: number;
  productBasedImageYOffset?: number;
  productBasedTitleFontSize?: number;
  productBasedBodyFontSize?: number;
  productBasedSubtitleFontSize?: number;
  productBasedTitleDescriptionGap?: number;
  productBasedBackgroundColor?: string;
  productBasedTextColor?: string;
  productBasedMutedTextColor?: string;
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
  titleDescriptionGap?: number;
  backgroundColor?: string;
  textColor?: string;
  mutedTextColor?: string;
}
