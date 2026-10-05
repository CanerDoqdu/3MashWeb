// This file is auto-generated — do not edit manually.
import type { IkasBlog } from "@ikas/bp-storefront";

export interface Props {
  /** Güncel blog içeriği, başlık, kapak görseli ve kategorisi bu kayıttan alınır. */
  blog: IkasBlog | null;
  backLinkText?: string;
  /** Güvenli yönlendirme için site içi yol kullanın. */
  backLinkHref?: string;
  setupMessage?: string;
  backgroundColor?: string;
  textColor?: string;
  mutedTextColor?: string;
  lineColor?: string;
  accentColor?: string;
  /** CSS ölçü birimi kullanın; ör. 19px. */
  bodyFontSize?: string;
  /** CSS genişlik değeri kullanın; ör. 720px. */
  contentWidth?: string;
  /** column, wide veya full değerlerinden birini kullanın. */
  heroImageWidth?: string;
  /** left veya center değerlerinden birini kullanın. */
  titleAlign?: string;
  /** compact, normal veya generous değerlerinden birini kullanın. */
  headerSpacing?: string;
  showPublicationLabel?: boolean;
  showCategory?: boolean;
  showReadingTime?: boolean;
  showAuthor?: boolean;
  backLinkTextEn?: string;
  setupMessageEn?: string;
  publicationLabelText?: string;
  publicationLabelTextEn?: string;
  readingTimeSuffix?: string;
  readingTimeSuffixEn?: string;
  showBackLink?: boolean;
  showExcerpt?: boolean;
  showHeroImage?: boolean;
  showArticleBody?: boolean;
  showSetupMessage?: boolean;
}
