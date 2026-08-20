// This file is auto-generated — do not edit manually.
import type { IkasProduct } from "@ikas/bp-storefront";

export interface Props {
  product?: IkasProduct | null;
  /** Sarı kutudaki numara (Örn: 01) */
  sectionIndex?: string;
  /** Numaranın yanındaki büyük harf etiket */
  sectionLabel?: string;
  /** Bölümün sol tarafındaki büyük h2 başlığı */
  titleHtml?: string;
  /** Başlığın sağındaki açıklama paragrafı */
  sideHtml?: string;
  /** Siyah panelin içindeki büyük h3 başlığı */
  panelTitleHtml?: string;
  /** Başlığın hemen altındaki küçük gri not metni */
  panelNote?: string;
  /** Örn: <b>%94</b> kullanıcı kole hattını net görüyor. */
  item1DescriptionHtml?: string;
  /** Bar genişliğini belirler. Boş bırakılırsa bar görünmez. */
  item1Percent?: number;
  item2DescriptionHtml?: string;
  item2Percent?: number;
  item3DescriptionHtml?: string;
  item3Percent?: number;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  /** CRS Composite kaynak yapısındaki reusable template datası. Boş bırakılırsa ürünün varsayılan şablon datası kullanılır. */
  productTemplateJson?: string;
}
