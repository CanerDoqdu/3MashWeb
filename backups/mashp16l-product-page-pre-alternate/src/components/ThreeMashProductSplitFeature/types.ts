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
  /** 0-100 arası değer; boş bırakıldığında ürün verisindeki oran korunur. Yalnızca yüzde çubuğu gösterilen ürünlerde kullanılır. */
  item1Percent?: number;
  item2DescriptionHtml?: string;
  /** 0-100 arası değer; boş bırakıldığında ürün verisindeki oran korunur. Yalnızca yüzde çubuğu gösterilen ürünlerde kullanılır. */
  item2Percent?: number;
  item3DescriptionHtml?: string;
  /** 0-100 arası değer; boş bırakıldığında ürün verisindeki oran korunur. Yalnızca yüzde çubuğu gösterilen ürünlerde kullanılır. */
  item3Percent?: number;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  /** CRS Composite kaynak yapısındaki reusable template datası. Boş bırakılırsa ürünün varsayılan şablon datası kullanılır. */
  productTemplateJson?: string;
  sectionLabelEn?: string;
  titleHtmlEn?: string;
  sideHtmlEn?: string;
  panelTitleHtmlEn?: string;
  panelNoteEn?: string;
  item1DescriptionHtmlEn?: string;
  item2DescriptionHtmlEn?: string;
  item3DescriptionHtmlEn?: string;
  item4DescriptionHtml?: string;
  item4DescriptionHtmlEn?: string;
  /** 0-100 arası değer; boş bırakıldığında ürün verisindeki oran korunur. Yalnızca yüzde çubuğu gösterilen ürünlerde kullanılır. */
  item4Percent?: number;
  item5DescriptionHtml?: string;
  item5DescriptionHtmlEn?: string;
  /** 0-100 arası değer; boş bırakıldığında ürün verisindeki oran korunur. Yalnızca yüzde çubuğu gösterilen ürünlerde kullanılır. */
  item5Percent?: number;
  showSectionHeading?: boolean;
  showChecklist?: boolean;
  showItem1?: boolean;
  showItem2?: boolean;
  showItem3?: boolean;
  showItem4?: boolean;
  showItem5?: boolean;
}
