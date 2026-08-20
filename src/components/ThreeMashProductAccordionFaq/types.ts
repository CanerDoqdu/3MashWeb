// This file is auto-generated — do not edit manually.
import type { IkasProduct } from "@ikas/bp-storefront";

export interface Props {
  product?: IkasProduct | null;
  /** Sarı kutudaki numara (Örn: 05) */
  sectionIndex?: string;
  /** Numaranın yanındaki büyük harf etiket */
  sectionLabel?: string;
  /** Geniş (wide) h2 başlığı, tam genişlik */
  titleHtml?: string;
  /** Başlığın yanındaki açıklama bölümü */
  sideHtml?: string;
  /** Sayfa yüklendiğinde 1. soru otomatik açık durumda olsun */
  openFirst?: boolean;
  /** Örn: CRS Composite nasıl uygulanır? */
  faq1Question?: string;
  /** Sorunun açıldığında görünen cevap metni */
  faq1AnswerHtml?: string;
  faq2Question?: string;
  faq2AnswerHtml?: string;
  faq3Question?: string;
  faq3AnswerHtml?: string;
  faq4Question?: string;
  faq4AnswerHtml?: string;
  faq5Question?: string;
  faq5AnswerHtml?: string;
  faq6Question?: string;
  faq6AnswerHtml?: string;
  backgroundColor?: string;
  textColor?: string;
  lineColor?: string;
  /** CRS Composite kaynak yapısındaki reusable template datası. Boş bırakılırsa ürünün varsayılan şablon datası kullanılır. */
  productTemplateJson?: string;
}
