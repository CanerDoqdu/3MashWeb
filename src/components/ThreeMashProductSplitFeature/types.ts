// This file is auto-generated — do not edit manually.
import type { IkasProduct, IkasImage } from "@ikas/bp-storefront";

export interface Props {
  /** Aktif olduğunda bu bölüm, seçili ürün veya sayfa ürünü için aşağıdaki ürün bazlı ayarları kullanır. */
  productBasedEnabled?: boolean;
  /** Spesifik ürün seçebilir veya bu alanın kendi Sayfanın ürününü kullan seçeneğini açarak mevcut ürün sayfasına otomatik bağlayabilirsin. */
  product?: IkasProduct | null;
  /** Sayfa içi link için id. Boş bırakılabilir. */
  productBasedSectionAnchorId?: string;
  /** Boş değilse satırlı başlık propları yerine bu alan kullanılır. Vurgu için <mark>...</mark> kullanın. */
  productBasedTitleHtml?: string;
  productBasedTitleLine1Before?: string;
  productBasedTitleLine1Highlight?: string;
  productBasedTitleLine1After?: string;
  productBasedTitleLine2Before?: string;
  productBasedTitleLine2Highlight?: string;
  productBasedTitleLine2After?: string;
  productBasedTitleLine3Before?: string;
  productBasedTitleLine3Highlight?: string;
  productBasedTitleLine3After?: string;
  productBasedIntroHtml?: string;
  productBasedDetailHtml?: string;
  productBasedProofTitle?: string;
  productBasedQuote1Text?: string;
  productBasedQuote1Name?: string;
  productBasedQuote1Role?: string;
  productBasedQuote2Text?: string;
  productBasedQuote2Name?: string;
  productBasedQuote2Role?: string;
  productBasedQuote3Text?: string;
  productBasedQuote3Name?: string;
  productBasedQuote3Role?: string;
  /** Açıldığında yorumların yerine yüzde barları gösterilir. */
  productBasedShowScoreBars?: boolean;
  productBasedScore1Text?: string;
  productBasedScore1Value?: number;
  productBasedScore2Text?: string;
  productBasedScore2Value?: number;
  productBasedScore3Text?: string;
  productBasedScore3Value?: number;
  /** single veya grid yazın. */
  productBasedMediaLayout?: string;
  productBasedImageUrl?: IkasImage | null;
  productBasedImageAlt?: string;
  productBasedImageLabel?: string;
  productBasedImage2Url?: IkasImage | null;
  productBasedImage2Alt?: string;
  productBasedImage2Label?: string;
  productBasedImage3Url?: IkasImage | null;
  productBasedImage3Alt?: string;
  productBasedImage3Label?: string;
  productBasedImage4Url?: IkasImage | null;
  productBasedImage4Alt?: string;
  productBasedImage4Label?: string;
  productBasedReverseLayout?: boolean;
  productBasedMaxWidth?: number;
  productBasedPaddingTop?: number;
  productBasedPaddingBottom?: number;
  productBasedColumnGap?: number;
  productBasedTextColumnWidth?: number;
  /** Sol taraftaki başlık, açıklama ve skor metinlerinin maksimum genişliği. */
  productBasedContentWidth?: number;
  /** Sağ tarafta görsele ayrılan toplam kolon alanı. Kutunun sığması için Görsel Kutusu Genişliği ile beraber kullan. */
  productBasedMediaColumnWidth?: number;
  productBasedTitleFontSize?: number;
  productBasedBodyFontSize?: number;
  productBasedTitleMarginBottom?: number;
  productBasedIntroMarginBottom?: number;
  productBasedProofTitleMarginTop?: number;
  productBasedProofTitleMarginBottom?: number;
  productBasedScoreGap?: number;
  productBasedScoreBarMarginTop?: number;
  productBasedScoreBarWidth?: number;
  productBasedScoreBarHeight?: number;
  /** Görselin dış kutu genişliği. Resim alanını büyütmek/küçültmek için bunu değiştir. */
  productBasedMediaDisplayWidth?: number;
  productBasedMediaTopMargin?: number;
  /** CSS aspect-ratio değeri. Örn: 1.5 / 1, 16 / 9, 1 / 1. */
  productBasedMediaAspectRatio?: string;
  productBasedMediaBorderRadius?: number;
  /** contain, cover, fill veya scale-down. */
  productBasedImageObjectFit?: string;
  /** Sadece kutunun içindeki resmi yakınlaştırır. Dış kutu boyutu için Görsel Kutusu Genişliği değerini değiştir. */
  productBasedImageScale?: number;
  productBasedImageXOffset?: number;
  productBasedImageYOffset?: number;
  productBasedBackgroundColor?: string;
  productBasedTextColor?: string;
  productBasedMutedTextColor?: string;
  productBasedAccentColor?: string;
  productBasedMediaBackgroundColor?: string;
  productBasedScoreTrackColor?: string;
  /** Sayfa içi link için id. Boş bırakılabilir. */
  sectionAnchorId?: string;
  /** Boş değilse satırlı başlık propları yerine bu alan kullanılır. Vurgu için <mark>...</mark> kullanın. */
  titleHtml?: string;
  titleLine1Before?: string;
  titleLine1Highlight?: string;
  titleLine1After?: string;
  titleLine2Before?: string;
  titleLine2Highlight?: string;
  titleLine2After?: string;
  titleLine3Before?: string;
  titleLine3Highlight?: string;
  titleLine3After?: string;
  introHtml?: string;
  detailHtml?: string;
  proofTitle?: string;
  quote1Text?: string;
  quote1Name?: string;
  quote1Role?: string;
  quote2Text?: string;
  quote2Name?: string;
  quote2Role?: string;
  quote3Text?: string;
  quote3Name?: string;
  quote3Role?: string;
  /** Açıldığında yorumların yerine yüzde barları gösterilir. */
  showScoreBars?: boolean;
  score1Text?: string;
  score1Value?: number;
  score2Text?: string;
  score2Value?: number;
  score3Text?: string;
  score3Value?: number;
  /** single veya grid yazın. */
  mediaLayout?: string;
  imageUrl?: IkasImage | null;
  imageAlt?: string;
  imageLabel?: string;
  image2Url?: IkasImage | null;
  image2Alt?: string;
  image2Label?: string;
  image3Url?: IkasImage | null;
  image3Alt?: string;
  image3Label?: string;
  image4Url?: IkasImage | null;
  image4Alt?: string;
  image4Label?: string;
  reverseLayout?: boolean;
  maxWidth?: number;
  paddingTop?: number;
  paddingBottom?: number;
  columnGap?: number;
  textColumnWidth?: number;
  /** Sol taraftaki başlık, açıklama ve skor metinlerinin maksimum genişliği. */
  contentWidth?: number;
  /** Sağ tarafta görsele ayrılan toplam kolon alanı. Kutunun sığması için Görsel Kutusu Genişliği ile beraber kullan. */
  mediaColumnWidth?: number;
  titleFontSize?: number;
  bodyFontSize?: number;
  titleMarginBottom?: number;
  introMarginBottom?: number;
  proofTitleMarginTop?: number;
  proofTitleMarginBottom?: number;
  scoreGap?: number;
  scoreBarMarginTop?: number;
  /** 0 bırakılırsa mevcut alanı kullanır. */
  scoreBarWidth?: number;
  scoreBarHeight?: number;
  /** Görselin dış kutu genişliği. Resim alanını büyütmek/küçültmek için bunu değiştir. */
  mediaDisplayWidth?: number;
  mediaTopMargin?: number;
  /** CSS aspect-ratio değeri. Örn: 1.5 / 1, 16 / 9, 1 / 1. */
  mediaAspectRatio?: string;
  mediaBorderRadius?: number;
  /** contain, cover, fill veya scale-down. */
  imageObjectFit?: string;
  /** Sadece kutunun içindeki resmi yakınlaştırır. Dış kutu boyutu için Görsel Kutusu Genişliği değerini değiştir. */
  imageScale?: number;
  imageXOffset?: number;
  imageYOffset?: number;
  backgroundColor?: string;
  textColor?: string;
  mutedTextColor?: string;
  accentColor?: string;
  mediaBackgroundColor?: string;
  scoreTrackColor?: string;
}
