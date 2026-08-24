// This file is auto-generated — do not edit manually.
import type { IkasBlog } from "@ikas/bp-storefront";

export interface Props {
  /** Blog yazı rotasında geçerli ikas blog yazısına bağlayın. */
  blog: IkasBlog | null;
  backLinkText?: string;
  backLinkHref?: string;
  setupMessage?: string;
  backgroundColor?: string;
  textColor?: string;
  mutedTextColor?: string;
  lineColor?: string;
  accentColor?: string;
  /** Makale gövde yazı boyutu. Örnek: 18px, 20px. */
  bodyFontSize?: string;
  /** Makale metninin maksimum genişliği. Örnek: 680px, 760px. */
  contentWidth?: string;
  /** column: metin sütunuyla sınırlı · wide: daha geniş (varsayılan) · full: tam ekran genişliği */
  heroImageWidth?: string;
  /** left: sola hizalı (varsayılan) · center: ortalı */
  titleAlign?: string;
  /** compact: dar · normal · generous: geniş (varsayılan) */
  headerSpacing?: string;
  showPublicationLabel?: boolean;
  showCategory?: boolean;
  showReadingTime?: boolean;
  showAuthor?: boolean;
}
