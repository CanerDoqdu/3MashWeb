// This file is auto-generated — do not edit manually.
import type { IkasProductList } from "@ikas/bp-storefront";

export interface Props {
  /** Kategoriye ait canlı ürün listesi */
  productList?: IkasProductList;
  /** Duyuru bandındaki sol vurgulu metin (Örn: 🔥 Doğru reçineyi mi arıyorsunuz?) */
  eyebrowText?: string;
  /** Duyuru bandındaki açıklama metni */
  announcementText?: string;
  /** Duyuru bandındaki buton/link metni */
  announcementCtaText?: string;
  /** Duyuru butonunun yönlendireceği bağlantı (Örn: #secici) */
  announcementHref?: string;
  /** Hero başlığının ilk kısmı (Örn: Sonucun yarısı) */
  heroTitlePrefix?: string;
  /** Hero başlığının ortasındaki eğik/vurgulu kelime (Örn: reçinede) */
  heroTitleEmphasis?: string;
  /** Hero başlığının son kısmı (Örn: saklı.) */
  heroTitleSuffix?: string;
  /** Hero bölümündeki zengin metin açıklaması */
  heroDescriptionHtml?: string;
  /** Hero ana butonunun üzerindeki metin (Örn: Reçineni seç →) */
  primaryButtonText?: string;
  /** Hero ana butonunun yönlendireceği link veya çapa (Örn: #secici) */
  primaryButtonHref?: string;
  /** Hero ikinci butonunun üzerindeki metin (Örn: Emin değil misiniz? Ekibe sorun) */
  secondaryButtonText?: string;
  /** Hero ikinci butonunun yönlendireceği bağlantı (Örn: /pages/iletisim) */
  secondaryButtonHref?: string;
  /** 1. metrik rozetinin sol başlığı (Örn: CE) */
  metric1Value?: string;
  /** 1. metrik rozetinin vurgulu kısmı (Örn: Class IIa) */
  metric1Emphasis?: string;
  /** 1. metrik rozetinin altındaki açıklama metni */
  metric1Label?: string;
  /** 2. metrik rozetinin sol başlığı (Örn: 16) */
  metric2Value?: string;
  /** 2. metrik rozetinin vurgulu kısmı (Örn: reçine) */
  metric2Emphasis?: string;
  /** 2. metrik rozetinin altındaki açıklama metni */
  metric2Label?: string;
  /** 3. metrik rozetinin sol başlığı (Örn: Marka) */
  metric3Value?: string;
  /** 3. metrik rozetinin vurgulu kısmı (Örn: bağımsız) */
  metric3Emphasis?: string;
  /** 3. metrik rozetinin altındaki açıklama metni */
  metric3Label?: string;
  /** 4. metrik rozetinin sol başlığı (Örn: Birlikte) */
  metric4Value?: string;
  /** 4. metrik rozetinin vurgulu kısmı (Örn: kalibre) */
  metric4Emphasis?: string;
  /** 4. metrik rozetinin altındaki açıklama metni */
  metric4Label?: string;
  /** Bölüm sıra numarası (Örn: 01) */
  selectorNumber?: string;
  /** Numaranın yanındaki küçük başlık (Örn: REÇİNE SEÇİCİ) */
  selectorLabel?: string;
  /** Seçici ana başlığının ilk kısmı (Örn: Hangi işe) */
  selectorTitlePrefix?: string;
  /** Seçici ana başlığının vurgulu kısmı (Örn: hangi reçine?) */
  selectorTitleEmphasis?: string;
  /** Seçici ana başlığının son kısmı */
  selectorTitleSuffix?: string;
  /** Seçici başlığının sağındaki açıklama metni */
  selectorSideHtml?: string;
  /** Kartların altındaki link metni (Örn: Reçineyi incele) */
  selectorCardCtaText?: string;
  /** Bölüm sıra numarası (Örn: 02) */
  featureNumber?: string;
  /** Bölüm başlık etiketi (Örn: CİHAZ VE REÇİNE UYUMU) */
  featureLabel?: string;
  /** Öne çıkan blok üstündeki rozet metni (Örn: ÖNE ÇIKAN ÇÖZÜM) */
  featureEyebrow?: string;
  /** Öne çıkan kart başlığı ilk kısım */
  featureTitlePrefix?: string;
  /** Öne çıkan kart başlığı vurgulu kısım */
  featureTitleEmphasis?: string;
  /** Öne çıkan kart başlığı son kısım */
  featureTitleSuffix?: string;
  /** Öne çıkan kartın açıklama metni */
  featureDescriptionHtml?: string;
  /** Öne çıkan kartın buton linki */
  featureHref?: string;
  /** Öne çıkan kartın buton metni */
  featureCtaText?: string;
  /** Bölüm sıra numarası (Örn: 03) */
  detailNumber?: string;
  /** Bölüm başlık etiketi (Örn: NEDEN GEREKLİ?) */
  detailLabel?: string;
  /** Detay bölümü başlığının ilk kısmı */
  detailTitlePrefix?: string;
  /** Detay bölümü başlığının vurgulu kısmı */
  detailTitleEmphasis?: string;
  /** Detay bölümü başlığının son kısmı */
  detailTitleSuffix?: string;
  /** Detay başlığının sağındaki açıklama metni */
  detailSideHtml?: string;
  /** Alt çağrı kutusunun başlık ilk kısmı */
  detailCalloutTitlePrefix?: string;
  /** Alt çağrı kutusunun vurgulu başlığı */
  detailCalloutTitleEmphasis?: string;
  /** Alt çağrı kutusunun son başlık kısmı */
  detailCalloutTitleSuffix?: string;
  /** Alt çağrı kutusunun açıklama metni */
  detailCalloutDescriptionHtml?: string;
  /** Bölüm sıra numarası (Örn: 04) */
  faqNumber?: string;
  /** Bölüm başlık etiketi (Örn: SIKÇA SORULAN SORULAR) */
  faqLabel?: string;
  /** SSS bölümü ana başlığı (Örn: Aklınıza takılan sorular) */
  faqTitle?: string;
  /** SSS başlığının sağındaki açıklama metni */
  faqSideHtml?: string;
  /** Sayfa sonu CTA başlığı ilk kısım */
  finalTitlePrefix?: string;
  /** Sayfa sonu CTA başlığı vurgulu kısım */
  finalTitleEmphasis?: string;
  /** Sayfa sonu CTA başlığı son kısım */
  finalTitleSuffix?: string;
  /** Sayfa sonu CTA açıklama metni */
  finalDescriptionHtml?: string;
  /** Sayfa sonu ana buton metni */
  finalPrimaryButtonText?: string;
  /** Sayfa sonu ana buton linki */
  finalPrimaryButtonHref?: string;
  /** Sayfa sonu ikincil buton metni */
  finalSecondaryButtonText?: string;
  /** Sayfa sonu ikincil buton linki */
  finalSecondaryButtonHref?: string;
  /** Sayfa genel arka plan rengi */
  backgroundColor?: string;
  /** Sayfa genel metin ve başlık rengi */
  textColor?: string;
  /** İkincil açıklamalar ve etiket rengi */
  mutedTextColor?: string;
  /** Kartlar ve bilgi kutularının arka plan rengi */
  panelColor?: string;
  /** Öne çıkan buton ve rozet vurgu rengi (Lime) */
  accentColor?: string;
  /** Bölüm ayraçları ve kart kenarlık rengi */
  lineColor?: string;
}
