// This file is auto-generated — do not edit manually.
import type { IkasProduct } from "@ikas/bp-storefront";

export interface Props {
  product?: IkasProduct | null;
  /** Sarı kutudaki numara (Örn: 07) */
  relatedIndex?: string;
  /** Numaranın yanındaki büyük harf etiket */
  relatedLabel?: string;
  /** Karuselın üstündeki geniş h2 başlığı */
  relatedTitleHtml?: string;
  /** Sayfanın en altındaki siyah bandın h2 başlığı */
  finalCtaTitleHtml?: string;
  /** Başlığın altındaki açıklama paragrafı */
  finalCtaTextHtml?: string;
  /** Sol büyük lime buton (a.tmpdt-lime) */
  primaryButtonText?: string;
  /** WhatsApp linki veya herhangi bir URL */
  primaryButtonHref?: string;
  /** Sağ çerçeveli buton (a.tmpdt-inv) */
  secondaryButtonText?: string;
  /** İletişim sayfası veya herhangi bir URL */
  secondaryButtonHref?: string;
  backgroundColor?: string;
  finalCtaBackground?: string;
  finalCtaTextColor?: string;
  accentColor?: string;
  /** CRS Composite kaynak yapısındaki reusable template datası. Boş bırakılırsa ürünün varsayılan şablon datası kullanılır. */
  productTemplateJson?: string;
}
