// This file is auto-generated — do not edit manually.
import type { IkasProduct } from "@ikas/bp-storefront";

export interface Props {
  product?: IkasProduct | null;
  /** Sarı kutudaki numara (Örn: 02) */
  sectionIndex?: string;
  /** Numaranın yanındaki büyük harf etiket */
  sectionLabel?: string;
  /** Örn: Marjin sınırları ve tüberkül detayları belirgin. */
  titleHtml?: string;
  /** Başlığın sağındaki açıklama paragrafı */
  sideHtml?: string;
  /** Örn: Eğilme Mukavemeti */
  card1Title?: string;
  /** Örn: ISO 10477 veya 144 MPa */
  card1Value?: string;
  /** Örn: Model — küçük yeşil etiket */
  card1Tag?: string;
  /** Kartın altındaki küçük açıklama metni */
  card1Caption?: string;
  /** Örn: Esneklik Modülü */
  card2Title?: string;
  /** Örn: 3326 MPa */
  card2Value?: string;
  /** Örn: Stabilite */
  card2Tag?: string;
  card2Caption?: string;
  /** Örn: Çekme Dayanımı */
  card3Title?: string;
  /** Örn: ASTM D638 */
  card3Value?: string;
  /** Örn: Model */
  card3Tag?: string;
  card3Caption?: string;
  /** Örn: CRS MODEL · BOYUTSAL KARARLILIK · DLP / LCD */
  specTag?: string;
  /** Örn: Tedavinin referans noktası doğru modeldir. */
  specTitleHtml?: string;
  /** Sol paneldeki uzun açıklama paragrafı */
  specDescriptionHtml?: string;
  /** Alt butonun metni */
  specCtaText?: string;
  /** Alt butonun yönlendirme adresi */
  specCtaHref?: string;
  /** Örn: Uygulama */
  specRow1Label?: string;
  /** Örn: Master protez modeli */
  specRow1Value?: string;
  /** Örn: Uygulama */
  specRow2Label?: string;
  /** Örn: Ortodontik model */
  specRow2Value?: string;
  /** Örn: Detay */
  specRow3Label?: string;
  /** Örn: Belirgin kole hatları */
  specRow3Value?: string;
  /** Örn: İş akışı */
  specRow4Label?: string;
  /** Örn: Dijital tarama gösterimleri */
  specRow4Value?: string;
  /** Örn: Uyum */
  specRow5Label?: string;
  /** Örn: Tüm DLP / LCD 3D yazıcılar */
  specRow5Value?: string;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  /** CRS Composite kaynak yapısındaki reusable template datası. Boş bırakılırsa ürünün varsayılan şablon datası kullanılır. */
  productTemplateJson?: string;
}
