// This file is auto-generated — do not edit manually.
import type { IkasProduct, IkasImage } from "@ikas/bp-storefront";

export interface Props {
  product?: IkasProduct | null;
  /** Sarı kutudaki numara (Örn: 03) */
  sectionIndex?: string;
  /** Numaranın yanındaki büyük harf etiket */
  sectionLabel?: string;
  /** Bölümün sol büyük h2 başlığı */
  titleHtml?: string;
  /** Başlığın sağındaki açıklama paragrafı */
  sideHtml?: string;
  /** Fotoğraf şeridindeki 1. kart görseli */
  photo1Image?: IkasImage | null;
  /** Görselin altındaki kalın başlık (Örn: Geçici & Daimi Kron) */
  photo1Title?: string;
  /** Başlığın altındaki açıklama metni */
  photo1Text?: string;
  photo2Image?: IkasImage | null;
  /** Örn: Hassas Model Üretimi */
  photo2Title?: string;
  photo2Text?: string;
  photo3Image?: IkasImage | null;
  /** Örn: Biyouyumlu Splint */
  photo3Title?: string;
  photo3Text?: string;
  /** Küçük büyük harf etiket (Örn: KULLANIM ALANLARI) */
  cardEyebrow?: string;
  /** Kartın h3 başlığı */
  cardTitle?: string;
  /** Örn: Geçici kron ve köprü */
  bullet1Text?: string;
  bullet2Text?: string;
  bullet3Text?: string;
  bullet4Text?: string;
  bullet5Text?: string;
  bullet6Text?: string;
  /** Listenin altındaki küçük not metni */
  cardNote?: string;
  /** Örn: CİHAZ UYUMLULUĞU */
  devicesEyebrow?: string;
  /** h3 başlığı */
  devicesTitle?: string;
  /** Başlığın altındaki p açıklama metni */
  devicesTextHtml?: string;
  /** Örn: Asiga, Phrozen, Creality, Elegoo, HeyGears */
  devicesChips?: string;
  /** Sarı kutudaki numara (Örn: 04) */
  ecoIndex?: string;
  /** Numaranın yanındaki büyük harf etiket (Örn: TARAMA EKOSİSTEMİ) */
  ecoLabel?: string;
  /** tmpdt-dev içindeki h3 başlığı */
  ecoTitleHtml?: string;
  /** h3 başlığının altındaki p açıklama metni */
  ecoTextHtml?: string;
  /** tmpdt-chipwrap içindeki span çipler. Örn: 3Shape Trios, Medit i700, Cerec Omnicam */
  ecoChips?: string;
  /** tmpdt-dev-actions içindeki ana buton metni */
  ecoButton1Text?: string;
  /** Ana butonun href adresi */
  ecoButton1Href?: string;
  /** tmpdt-btn.tmpdt-line çerçeveli buton metni */
  ecoButton2Text?: string;
  /** Çerçeveli butonun href adresi */
  ecoButton2Href?: string;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  /** CRS Composite kaynak yapısındaki reusable template datası. Boş bırakılırsa ürünün varsayılan şablon datası kullanılır. */
  productTemplateJson?: string;
}
