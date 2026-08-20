// This file is auto-generated — do not edit manually.
import type { IkasProduct, IkasImage } from "@ikas/bp-storefront";

export interface Props {
  product?: IkasProduct | null;
  /** Sarı kutudaki numara (Örn: 04) */
  sectionIndex?: string;
  /** Numaranın yanındaki büyük harf etiket */
  sectionLabel?: string;
  /** Geniş (wide) h2 başlığı, tam genişlik */
  titleHtml?: string;
  /** Başlığın sağındaki açıklama bölümü */
  sideHtml?: string;
  /** YouTube, Vimeo veya MP4 linki. Tıklandığında açılır. */
  videoHref?: string;
  /** Video oynamadan önce gösterilen kapak fotoğrafı */
  posterImage?: IkasImage | null;
  /** Erişilebilirlik için görsel açıklama metni */
  posterImageAlt?: string;
  /** Videonun üzerindeki ana başlık (Örn: 3MASH CRS Demo) */
  videoOverlayTitle?: string;
  /** Başlığın altındaki kısa açıklama (Örn: 3 dakikalık uygulama videosu) */
  videoOverlayText?: string;
  /** Sağ alt köşedeki küçük meta bilgisi (Örn: YouTube · HD) */
  videoOverlayMeta?: string;
  backgroundColor?: string;
  textColor?: string;
  /** CRS Composite kaynak yapısındaki reusable template datası. Boş bırakılırsa ürünün varsayılan şablon datası kullanılır. */
  productTemplateJson?: string;
}
