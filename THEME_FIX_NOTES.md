# 3MASH Tema Düzeltme Notları

## Kaynak HTML Dosyaları

- `C:\Users\caner\Downloads\3MASH-Recineler-Konsept.html`
- `C:\Users\caner\Downloads\3MASH-Yazicilar-Konsept.html`
- `C:\Users\caner\Desktop\3MASH-Anasayfa-Konsept-v2.html`

## Genel Durum

- Temayı oluştururken kullanılan şablon HTML doğru kopyalanmamış.
- Tema bu hatalı kopyanın üstüne hazırlanmış.
- Birçok küçük hata var; düzeltmeler not alınıp sırayla uygulanacak.

## 1. Global Font Değerleri

- Global font değerleri yanlış.
- Fontlar düzgün çalışmıyor.
- Olması gereken fontlar kaynak HTML dosyalarında belli.
- Font değerleri global olmalı.
- Studio içinde görünen global font değerleri de değiştirilmeli.

## 2. Anasayfa İçerikleri

### 2.1 Renk Kodları

- Gereksiz renk kodları olmamalı.
- Kaynak HTML'den farklı renk kodları olmamalı.
- Anasayfadaki renk kodları kontrol edilmeli.
- Amaç: anasayfadaki background color değerleri kaynak HTML dosyasındaki değerlerle birebir aynı olmalı.

### 2.2 Navbar Logo

- Navbardaki logo yanlış yapılmış.
- Logo ile text arasındaki boşluk miktarı yanlış.
- Doğru referans: `https://3mash.com/`
- Navbar logosu bu referansa göre düzeltilmeli.

### 2.2.1 Navbar Açılır Ürünler Penceresi

- Navbardaki açılır ürünler penceresi doğru kopyalanmamış.
- Açılır ürünler penceresi tamamen sıfırdan, kaynak tasarımla aynı şekilde oluşturulmalı.
- Design birebir kaynak HTML'deki gibi olmalı.
- Placeholder olarak yazılmış olan öne çıkan ürün alanı silinmeyecek.
- Aşağıdaki içerik aynı öne çıkan ürün alanına yerleştirilecek:
  - `YENİ · DÜNYADA İLK`
  - `MASH C4P Akıllı Kürleme Cihazı`
  - `Reçineye göre otomatik kürleme. Sonuç kalitesini kullanıcı hatasından çıkarır.`
  - Bağlantı: `https://studio.ikasapps.com/yikama-kurleme-cihazlari`

### 2.2.2 Navbar Açılır Ürünler Penceresi Sağ Taraf

- Açılır ürünler componentının sağ tarafı tamamen yanlış yapılmış.
- Bu alan sıfırlanmalı.
- Mevcut iconlar kaldırılmalı.
- Sağ taraf birebir kaynak HTML'deki gibi yapılmalı.

### 2.3 Footer Logo

- Footerdaki logo tamamen yanlış.
- Önce navbardaki logo düzeltilmeli.
- Sonra footer logosu da aynı doğru yapıya göre düzeltilmeli.

### 2.4 Arkaplandaki Sarılıklar

- Anasayfa arkaplanındaki sarı tonlar kaldırılmalı.
- Sadece kaynak HTML dosyasındaki arkaplan rengi kullanılmalı.
- Anasayfadaki background color değerleri kaynak HTML ile birebir aynı olmalı.

### 2.5 Hero Sayı Animasyonu

- Kaynak HTML'de hero başlangıcı "Kliniğiniz her yıl 72.000..." gibi bir sayı ile başlıyor.
- Kaynakta bu sayı için animasyon var.
- Bu animasyon tema tarafına doğru kopyalanmamış.
- Hero section sayı animasyonu kaynak HTML'deki davranışa göre eklenmeli.

### 2.6 Hero İstatistik Yazıları

- `±20 µm`, `<6 ay`, `580+` yazıları çift renk görünüyor.
- Bu çift renk problemi düzeltilmeli.
- Renkler kaynak HTML kodundaki gibi olmalı.

### 2.7 Hero Butonları

- "Sebebini görün" ve "Ücretsiz danışmanlık" butonları yanlış.
- Renkleri yanlış.
- Boyutları yanlış.
- Kaynak HTML'deki renk, boyut ve görsel davranışa göre düzeltilmeli.

## 3. Anasayfa Sonraki Sectionlar

### 3.1 Section 3 - Üretim Ekosistemi

- Mevcut animasyon kaldırılmalı.
- Kaynak HTML'deki tasarıma birebir geçilmeli.
- Renkler, fontlar ve genel görünüm kaynakla aynı olmalı.
- Ürün SVG'leri kaldırılmalı.
- Onların yerine bizim ürünlerin bağlantıları koyulmalı.

### 3.2 Section 4

- Renk ve font konuları kontrol edilmeli.
- Kaynak HTML ile uyumlu hale getirilmeli.

### 3.3 Section 5

- Eski haline getirilmeli.

## 4. Responsive Kontrol

- Anasayfa düzeltmeleri bittikten sonra responsive kontrol yapılmalı.
- Mobil, tablet ve desktop görünümler kontrol edilmeli.

## 5. Kategori Sayfaları

### 5.1 Dental Reçineler Sayfası

- Kaynak: `file:///C:/Users/caner/Downloads/3MASH-Yazicilar-Konsept.html`
- Bu kaynak tasarım projedeki dental reçineler sayfasına özel olarak oluşturulacak.
- Dental reçineler kategorisi bu sayfaya yönlendirecek.
- Sayfa, kategori sayfası mantığıyla hazırlanacak.

### 5.2 Yazıcılar Sayfası

- Kaynak: `file:///C:/Users/caner/Downloads/3MASH-Yazicilar-Konsept.html`
- Bu kaynak tasarım projedeki yazıcılar sayfasına özel olarak oluşturulacak.
- Yazıcılar kategorisine tıklanınca bu sayfaya yönlendirilecek.
- Sayfa, kategori sayfası mantığıyla hazırlanacak.

### 5.3 Ortak Şablon ve Component Yaklaşımı

- Dental reçineler ve yazıcılar için kullanılacak şablonlar aynı yapıda.
- Proplar doğru şekilde oluşturulursa tüm kategori sayfaları hızlıca üretilebilir.
- Bu sayfalar parça parça component halinde oluşturulacak.
- Aynı component/prop yapısı ileride diğer kategori sayfalarını oluşturmayı kolaylaştırmalı.
- Eldeki iki örnek diğer kategoriler için yeterli referans kabul edilebilir.
- Diğer kategori sayfaları da bu şablon ve component yaklaşımıyla oluşturulabilir.

## 6. Tekli Ürün Sayfaları

### 6.1 Kaynak ve Amaç

- Kaynak: `file:///C:/Users/caner/Downloads/3MASH-CRS-Composite-Konsept.html`
- Bu kaynak, tekli ürün sayfalarında yapacağımız yeni ürün detay sayfası yapısı için referans alınacak.
- CRS Composite sayfası sadece tek bir ürün için kopyalanacak statik bir sayfa olarak düşünülmemeli.
- Asıl amaç: tekli ürün sayfaları için yeniden kullanılabilir, prop kontrollü ve parça parça componentlerden oluşan bir sistem kurmak.
- Bu yapı doğru kurulursa CRS Composite dışında diğer ürün detay sayfaları da aynı şablonla hızlıca oluşturulabilir.

### 6.2 Anladığım Ana İstek

- Tekli ürün sayfası, kaynak HTML'deki tasarım kalitesine ve bölüm sırasına göre yeniden oluşturulacak.
- Mevcut projedeki ürün detay sayfası bu kaynakla uyumlu hale getirilecek.
- Tasarım birebir kaynak hissini taşımalı: fontlar, renkler, boşluklar, grid yapıları, butonlar, kartlar, koyu/açık section ayrımları ve responsive davranış korunmalı.
- Sayfa tek parça büyük bir component olarak yazılmamalı.
- Hero, galeri, satın alma paneli, teknik metrikler, kullanım alanları, video, FAQ, ilgili ürünler ve final CTA gibi parçalar componentlere bölünmeli.
- Her parça prop almalı; böylece başka ürünlerde sadece içerik, görsel, link, renk varyasyonu ve metrikler değiştirilerek yeni sayfa üretilebilmeli.

### 6.3 Sayfa Bölümleri

- Üst duyuru bandı:
  - Ürüne özel kısa kampanya/servis mesajı.
  - CTA anchor bağlantısı.
  - Mobilde uzun metnin gizlenmesi davranışı korunmalı.

- Header / navbar:
  - Global navbar düzeltmelerinden sonra bu sayfada da aynı header kullanılmalı.
  - Tekli ürün sayfasına özel tekrar navbar yazılmamalı.

- Breadcrumb:
  - Ana sayfa / kategori / ürün yapısı olmalı.
  - Prop olarak kategori adı, kategori linki ve ürün adı verilmeli.

- Product hero:
  - Sol tarafta sticky ürün galerisi.
  - Sağ tarafta ürün bilgi ve satın alma paneli.
  - Kaynakta kullanılan oranlar korunmalı: desktopta galeri solda, içerik sağda; mobilde tek kolon.
  - Hero alt çizgisi, boşlukları ve `#satinal` anchor mantığı korunmalı.

- Ürün galerisi:
  - Ana görsel + thumbnail sistemi olmalı.
  - Thumbnail tıklanınca ana görsel değişmeli.
  - CE badge veya ürün rozeti prop ile yönetilmeli.
  - Görseller ikas ürün görsellerinden veya manuel prop listesinden gelebilmeli.

- Satın alma / konfigurasyon paneli:
  - Ürün kicker, başlık, açıklama ve pill bilgileri prop olmalı.
  - Renk seçimi swatch sistemi olarak kurulmalı.
  - Boyut seçimi segmented control olarak kurulmalı.
  - Seçime göre özet metni ve sepete ekle linki güncellenmeli.
  - Ürüne özel varyant/query parametre mantığı prop ile yönetilmeli.
  - WhatsApp veya danışmanlık bağlantısı prop olmalı.
  - Teknik destek / kurulum / güven unsurları prop listesi olmalı.

- Kullanıcı deneyimi / rating bar bölümü:
  - Kaynaktaki koyu panel ve animasyonlu yüzde barları korunmalı.
  - Her satır açıklama + yüzde değeri prop listesiyle gelmeli.
  - Bölüm viewport'a girince barlar ve sayılar animate olmalı.

- Teknik özellikler bölümü:
  - Metrik kartları prop listesiyle gelmeli.
  - Sayısal değerler count-up animasyonu desteklemeli.
  - ISO/MDR gibi küçük etiketler prop olmalı.
  - CRS Composite örneğindeki `144 MPa`, `5000 MPa`, `CE Class IIa` gibi değerler sadece default örnek olmalı.

- Flag / koyu teknik vurgu bandı:
  - Kaynaktaki koyu iki kolonlu band korunmalı.
  - Sol taraf ürün değer önerisi, sağ taraf teknik tablo olmalı.
  - Teknik tablo satırları prop listesiyle yönetilmeli.

- Uygulama ve uyumluluk bölümü:
  - Fotoğraf stripi prop listesiyle kurulmalı.
  - Uygulama alanları kartı, özellikler kartı ve uyumlu cihazlar kartı ayrılmalı.
  - Uyumlu cihaz chipleri prop listesiyle gelmeli.
  - `+ tüm DLP / LCD markaları` gibi son chip ayrıca vurgulanabilmeli.

- Ekosistem callback bölümü:
  - Reçine tek başına yeterli değil mesajı gibi ürün grubuna göre değişebilen destek bölümü olmalı.
  - Yazıcı, reçine, kürleme, Academy ve teknik destek bağlantılarına yönlendirebilmeli.
  - CTA butonları prop olmalı.

- FAQ bölümü:
  - Sık sorulan sorular prop listesiyle oluşturulmalı.
  - İlk soru açık başlayabilmeli.
  - `details/summary` davranışı kaynakla aynı kalmalı.

- Video bölümü:
  - Büyük video kartı, background image, play icon, başlık ve açıklama prop olmalı.
  - YouTube/Mash Academy linki prop olarak verilmeli.

- İlgili ürünler bölümü:
  - 4'lü ürün kart grid'i korunmalı.
  - Kart başlığı, açıklaması, görsel/renk arkaplanı, etiket ve link prop listesiyle gelmeli.
  - İlgili reçineler, ilgili yazıcılar veya aynı ekosistemdeki ürünler için yeniden kullanılabilmeli.

- Final CTA:
  - Ürüne göre değişen son çağrı alanı.
  - Birincil buton satın alma anchorına döner.
  - İkincil buton iletişim veya danışmanlığa gider.

- Footer:
  - Global footer düzeltildikten sonra tekli ürün sayfasında da ortak footer kullanılmalı.
  - Kaynak HTML'deki footer sadece görsel referans olarak alınmalı; projede ayrı kopya footer üretilmemeli.

### 6.4 Component Kırılımı

- `ThreeMashProductDetailLive` ana container olarak kalabilir veya yeni tekli ürün template componenti oluşturulabilir.
- Parça component önerileri:
  - `ProductDetailAnnouncement`
  - `ProductDetailBreadcrumb`
  - `ProductDetailHero`
  - `ProductGallery`
  - `ProductConfigurator`
  - `ProductTrustBadges`
  - `ProductRatingBars`
  - `ProductMetricCards`
  - `ProductSpecHighlight`
  - `ProductUseCases`
  - `ProductEcosystemCallout`
  - `ProductFaq`
  - `ProductVideoBlock`
  - `ProductRelatedGrid`
  - `ProductFinalCta`

### 6.5 Prop Modeli

- Prop modeli ürün bazlı içerik girmeyi kolaylaştırmalı.
- Tek tek sabit alanlar yerine tekrar eden yapılar listelerle yönetilmeli.
- Önerilen prop grupları:
  - Genel: ürün adı, kategori adı, kategori linki, breadcrumb, SEO başlık/metin gerekiyorsa.
  - Hero: kicker, title, emphasizedTitle, leadHtml, pills.
  - Gallery: images, thumbnail images, badge text, alt metinler.
  - Variants: renk seçenekleri, boyut seçenekleri, default seçimler, query parametre isimleri.
  - CTA: sepete ekle link base'i, WhatsApp/danışmanlık linki, buton metinleri.
  - Trust: küçük güven maddeleri.
  - Ratings: açıklama ve yüzde listesi.
  - Metrics: metrik adı, değer, birim, etiket, açıklama, animasyon tipi.
  - Specs: teknik tablo satırları.
  - Use cases: görsel kartlar, uygulama listesi, özellik listesi, cihaz chipleri.
  - Ecosystem: başlık, açıklama, chipler, butonlar.
  - FAQ: soru/cevap listesi.
  - Video: link, görsel, başlık, açıklama, üst etiket.
  - Related products: kart listesi.
  - Final CTA: başlık, açıklama, butonlar.

### 6.6 Davranış ve Animasyon

- Galeri thumbnail tıklama davranışı Preact state ile kurulmalı.
- Swatch ve boyut seçimleri Preact state ile yönetilmeli.
- Seçime bağlı satın alma URL'i otomatik güncellenmeli.
- Rating bar ve teknik metrik count-up animasyonları IntersectionObserver ile tetiklenmeli.
- Animasyonlar kaynak HTML'deki gibi sade olmalı; gereksiz ekstra animasyon eklenmemeli.
- Mobil menü/header davranışı global header üzerinden çözülmeli.

### 6.7 Görsel ve Tasarım Kuralları

- Kaynak dosyadaki global renk tokenları korunmalı:
  - `--bg: #FAFAF7`
  - `--ink: #0E0E0C`
  - `--sub: #55554e`
  - `--mut: #8f8f86`
  - `--line: #E6E6E0`
  - `--line2: #d5d5cd`
  - `--lime: #C7F136`
  - `--lime-ink: #3d4d0e`
  - `--lime-soft: #F2F8DC`
  - `--red: #E2492F`
  - `--panel: #F1F1EC`
  - `--dark: #0E0E0C`
- Fontlar global tema düzeltmesiyle aynı olmalı:
  - Body: `Inter`
  - Heading: `Space Grotesk`
  - Italic emphasis: `Newsreader`
  - Logo text: `Baloo 2`
- Kaynak tasarımdaki border radius, spacing, grid oranları ve buton ölçüleri korunmalı.
- Gereksiz yeni renk, gradient veya farklı tema tonu eklenmemeli.

### 6.8 Routing

- Tekli ürün sayfaları ilgili ürün route'una bağlanmalı.
- Kategori sayfasındaki ürün kartları bu tekli ürün sayfalarına yönlendirmeli.
- Örnek CRS Composite URL'i:
  - `https://3mash.com/crs-composite-mukemmel-dayanimli-gecici-recinesi`
- Kategori dönüş linkleri doğru kategori sayfasına gitmeli.

### 6.9 Kontrol ve Kabul Kriterleri

- CRS Composite kaynak HTML ile görsel karşılaştırma yapılmalı.
- Desktop, tablet ve mobil responsive kontrol edilmeli.
- Galeri çalışmalı.
- Renk ve boyut seçimi çalışmalı.
- Seçime göre özet ve satın alma linki güncellenmeli.
- Rating bar ve metrik animasyonları çalışmalı.
- FAQ açılıp kapanmalı.
- Video kartı doğru linke gitmeli.
- İlgili ürün kartları doğru linklere gitmeli.
- Header ve footer global düzeltilmiş halleriyle görünmeli.
- Başka ürün sayfasına aynı template ile geçerken kod kopyası minimum olmalı.

## Durum

- Not alma başladı.
- Henüz düzeltme uygulanmadı.
