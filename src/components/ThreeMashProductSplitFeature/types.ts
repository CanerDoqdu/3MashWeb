// This file is auto-generated — do not edit manually.
import type { IkasImage } from "@ikas/bp-storefront";

export interface Props {
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
  mediaColumnWidth?: number;
  titleFontSize?: number;
  bodyFontSize?: number;
  /** CSS aspect-ratio değeri. Örn: 1.5 / 1, 16 / 9, 1 / 1. */
  mediaAspectRatio?: string;
  mediaBorderRadius?: number;
  /** contain, cover, fill veya scale-down. */
  imageObjectFit?: string;
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
