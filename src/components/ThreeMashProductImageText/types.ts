// This file is auto-generated — do not edit manually.
import type { IkasProduct, IkasImage } from "@ikas/bp-storefront";

export interface Props {
  /** Aktif olduğunda bu bölüm seçili ürün için ürün bazlı alanları kullanır. Canlı sitede seçili ürün/slug eşleşmesine göre uygulanır. */
  productBasedEnabled?: boolean;
  product?: IkasProduct | null;
  /** İsteğe bağlı. Virgülle ürün URL slug yazarsan ürün bazlı ayarlar sadece o URL’lerde çalışır. Boşsa seçili Ürün prop’u üzerinden eşleşir. */
  productBasedTargetSlugs?: string;
  /** Virgülle ürün URL slug yaz. Eşleşen sluglarda section gizlenir; diğer ürünler etkilenmez. */
  productBasedHiddenSlugs?: string;
  /** Slug yazmadan spesifik ürün seç. Ürün seçilmezse yanındaki switch yok sayılır. */
  productBasedVisibilityProduct1?: IkasProduct | null;
  /** Açıksa seçilen üründe section görünür. Kapalıysa sadece seçilen üründe gizlenir. Ürün seçilmemişse bu switch yok sayılır. */
  productBasedVisibilityShow1?: boolean;
  /** Slug yazmadan spesifik ürün seç. Ürün seçilmezse yanındaki switch yok sayılır. */
  productBasedVisibilityProduct2?: IkasProduct | null;
  /** Açıksa seçilen üründe section görünür. Kapalıysa sadece seçilen üründe gizlenir. Ürün seçilmemişse bu switch yok sayılır. */
  productBasedVisibilityShow2?: boolean;
  /** Slug yazmadan spesifik ürün seç. Ürün seçilmezse yanındaki switch yok sayılır. */
  productBasedVisibilityProduct3?: IkasProduct | null;
  /** Açıksa seçilen üründe section görünür. Kapalıysa sadece seçilen üründe gizlenir. Ürün seçilmemişse bu switch yok sayılır. */
  productBasedVisibilityShow3?: boolean;
  /** Slug yazmadan spesifik ürün seç. Ürün seçilmezse yanındaki switch yok sayılır. */
  productBasedVisibilityProduct4?: IkasProduct | null;
  /** Açıksa seçilen üründe section görünür. Kapalıysa sadece seçilen üründe gizlenir. Ürün seçilmemişse bu switch yok sayılır. */
  productBasedVisibilityShow4?: boolean;
  /** Slug yazmadan spesifik ürün seç. Ürün seçilmezse yanındaki switch yok sayılır. */
  productBasedVisibilityProduct5?: IkasProduct | null;
  /** Açıksa seçilen üründe section görünür. Kapalıysa sadece seçilen üründe gizlenir. Ürün seçilmemişse bu switch yok sayılır. */
  productBasedVisibilityShow5?: boolean;
  /** Kapalıysa bu ürün için görsel metin detay section render edilmez. */
  productBasedSectionVisible?: boolean;
  /** Sayfa içi link için id. Boş bırakılabilir. */
  productBasedSectionAnchorId?: string;
  /** Doluysa ürün bazlı başlık metnini HTML olarak ezer. */
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
  /** ArgenZ HT+ Multilayer katmanlı görsel. Değiştirmek için buraya yeni görsel yükleyin. */
  productBasedImageUrl?: IkasImage | null;
  productBasedImageAlt?: string;
  /** Açılırsa görsel sağa, metin sola geçer. */
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
  /** Varsayılan görsel. Ürün bazlı görsel doluysa bu alan kullanılmaz. */
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
  /** CRS kaynaklı reusable ürün template datası. Doluysa bu section kendi karşılık gelen bölümünü bu datadan render eder. */
  productTemplateJson?: string;
}
