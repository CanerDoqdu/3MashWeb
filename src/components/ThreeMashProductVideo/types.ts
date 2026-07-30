// This file is auto-generated — do not edit manually.
import type { IkasProduct, IkasImage } from "@ikas/bp-storefront";

export interface Props {
  /** Aktif olduğunda seçili ürün veya hedef slug eşleşirse Ürün Bazlı Video URL kullanılır. */
  productBasedEnabled?: boolean;
  /** Bu URL'nin uygulanacağı ürünü seçin veya sayfanın ürününü kullan seçeneğini açın. */
  product?: IkasProduct | null;
  /** Tek URL kullanıyorsanız slug yazın. Ürün Bazlı Video URL alanında slug | URL satırları varsa burayı boş bırakın. */
  productBasedTargetSlugs?: string;
  /** Virgülle ürün URL slug yaz. Eşleşen sluglarda ürün bazlı video uygulanmaz; diğer ürünler etkilenmez. */
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
  /** Her satıra slug | video URL yazın. 3mash.com ürün sayfalarından bulunan ürün videoları hazır girilidir. */
  productBasedVideoUrl?: string;
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
  /** CRS kaynaklı reusable ürün template datası. Doluysa bu section kendi karşılık gelen bölümünü bu datadan render eder. */
  productTemplateJson?: string;
}
