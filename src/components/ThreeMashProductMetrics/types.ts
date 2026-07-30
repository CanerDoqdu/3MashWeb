// This file is auto-generated — do not edit manually.
import type { IkasProduct, IkasImage } from "@ikas/bp-storefront";

export interface Props {
  /** Aktif olduğunda bu bölüm seçili ürün için ürün bazlı alanları kullanır. Canlı sitede seçili ürün/slug eşleşmesine göre uygulanır. */
  productBasedEnabled?: boolean;
  /** Spesifik ürün seçebilir veya bu alanın kendi Sayfanın ürününü kullan seçeneğini açarak mevcut ürün sayfasına otomatik bağlayabilirsin. */
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
  /** Kapalıysa sadece eşleşen ürün için metrik section render edilmez. */
  productBasedSectionVisible?: boolean;
  /** Sayfa içi link için id. Boş bırakılabilir. */
  productBasedSectionAnchorId?: string;
  /** En fazla 6 metrik render edilir. */
  productBasedMetricCount?: number;
  productBasedMetric1Enabled?: boolean;
  productBasedMetric1Value?: string;
  productBasedMetric1Unit?: string;
  productBasedMetric1Title?: string;
  productBasedMetric1Subtitle?: string;
  /** Doluysa sarı dairedeki değer yerine bu görsel gösterilir. */
  productBasedMetric1ImageUrl?: IkasImage | null;
  productBasedMetric1ImageAlt?: string;
  productBasedMetric2Enabled?: boolean;
  productBasedMetric2Value?: string;
  productBasedMetric2Unit?: string;
  productBasedMetric2Title?: string;
  productBasedMetric2Subtitle?: string;
  /** Doluysa sarı dairedeki değer yerine bu görsel gösterilir. */
  productBasedMetric2ImageUrl?: IkasImage | null;
  productBasedMetric2ImageAlt?: string;
  productBasedMetric3Enabled?: boolean;
  productBasedMetric3Value?: string;
  productBasedMetric3Unit?: string;
  productBasedMetric3Title?: string;
  productBasedMetric3Subtitle?: string;
  /** Doluysa sarı dairedeki değer yerine bu görsel gösterilir. */
  productBasedMetric3ImageUrl?: IkasImage | null;
  productBasedMetric3ImageAlt?: string;
  productBasedMetric4Enabled?: boolean;
  productBasedMetric4Value?: string;
  productBasedMetric4Unit?: string;
  productBasedMetric4Title?: string;
  productBasedMetric4Subtitle?: string;
  /** Doluysa sarı dairedeki değer yerine bu görsel gösterilir. */
  productBasedMetric4ImageUrl?: IkasImage | null;
  productBasedMetric4ImageAlt?: string;
  productBasedMetric5Enabled?: boolean;
  productBasedMetric5Value?: string;
  productBasedMetric5Unit?: string;
  productBasedMetric5Title?: string;
  productBasedMetric5Subtitle?: string;
  /** Doluysa sarı dairedeki değer yerine bu görsel gösterilir. */
  productBasedMetric5ImageUrl?: IkasImage | null;
  productBasedMetric5ImageAlt?: string;
  productBasedMetric6Enabled?: boolean;
  productBasedMetric6Value?: string;
  productBasedMetric6Unit?: string;
  productBasedMetric6Title?: string;
  productBasedMetric6Subtitle?: string;
  /** Doluysa sarı dairedeki değer yerine bu görsel gösterilir. */
  productBasedMetric6ImageUrl?: IkasImage | null;
  productBasedMetric6ImageAlt?: string;
  productBasedMaxWidth?: number;
  productBasedPaddingTop?: number;
  productBasedPaddingBottom?: number;
  productBasedGridGap?: number;
  productBasedCircleSize?: number;
  productBasedMetricImageSize?: number;
  /** contain, cover, fill veya scale-down. */
  productBasedMetricImageObjectFit?: string;
  productBasedCircleSpacing?: number;
  productBasedDesktopColumns?: number;
  productBasedTabletColumns?: number;
  productBasedValueFontSize?: number;
  productBasedUnitFontSize?: number;
  productBasedTitleFontSize?: number;
  productBasedSubtitleFontSize?: number;
  productBasedBackgroundColor?: string;
  productBasedTextColor?: string;
  productBasedMutedTextColor?: string;
  productBasedCircleColor?: string;
  productBasedCircleTextColor?: string;
  /** Sayfa içi link için id. Boş bırakılabilir. */
  sectionAnchorId?: string;
  /** En fazla 6 metrik render edilir. */
  metricCount?: number;
  metric1Enabled?: boolean;
  metric1Value?: string;
  metric1Unit?: string;
  metric1Title?: string;
  metric1Subtitle?: string;
  /** Doluysa sarı dairedeki değer yerine bu görsel gösterilir. */
  metric1ImageUrl?: IkasImage | null;
  metric1ImageAlt?: string;
  metric2Enabled?: boolean;
  metric2Value?: string;
  metric2Unit?: string;
  metric2Title?: string;
  metric2Subtitle?: string;
  /** Doluysa sarı dairedeki değer yerine bu görsel gösterilir. */
  metric2ImageUrl?: IkasImage | null;
  metric2ImageAlt?: string;
  metric3Enabled?: boolean;
  metric3Value?: string;
  metric3Unit?: string;
  metric3Title?: string;
  metric3Subtitle?: string;
  /** Doluysa sarı dairedeki değer yerine bu görsel gösterilir. */
  metric3ImageUrl?: IkasImage | null;
  metric3ImageAlt?: string;
  metric4Enabled?: boolean;
  metric4Value?: string;
  metric4Unit?: string;
  metric4Title?: string;
  metric4Subtitle?: string;
  /** Doluysa sarı dairedeki değer yerine bu görsel gösterilir. */
  metric4ImageUrl?: IkasImage | null;
  metric4ImageAlt?: string;
  metric5Enabled?: boolean;
  metric5Value?: string;
  metric5Unit?: string;
  metric5Title?: string;
  metric5Subtitle?: string;
  /** Doluysa sarı dairedeki değer yerine bu görsel gösterilir. */
  metric5ImageUrl?: IkasImage | null;
  metric5ImageAlt?: string;
  metric6Enabled?: boolean;
  metric6Value?: string;
  metric6Unit?: string;
  metric6Title?: string;
  metric6Subtitle?: string;
  /** Doluysa sarı dairedeki değer yerine bu görsel gösterilir. */
  metric6ImageUrl?: IkasImage | null;
  metric6ImageAlt?: string;
  maxWidth?: number;
  paddingTop?: number;
  paddingBottom?: number;
  gridGap?: number;
  circleSize?: number;
  metricImageSize?: number;
  /** contain, cover, fill veya scale-down. */
  metricImageObjectFit?: string;
  circleSpacing?: number;
  desktopColumns?: number;
  tabletColumns?: number;
  valueFontSize?: number;
  unitFontSize?: number;
  titleFontSize?: number;
  subtitleFontSize?: number;
  backgroundColor?: string;
  textColor?: string;
  mutedTextColor?: string;
  circleColor?: string;
  circleTextColor?: string;
  /** CRS kaynaklı reusable ürün template datası. Doluysa bu section kendi karşılık gelen bölümünü bu datadan render eder. */
  productTemplateJson?: string;
}
