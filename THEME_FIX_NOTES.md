# 3MASH Tema Düzeltme Notları

## Kaynak HTML Dosyaları

- `C:\Users\caner\Downloads\3MASH-Recineler-Konsept.html`
- `C:\Users\caner\Downloads\3MASH-Yazicilar-Konsept.html`
- `C:\Users\caner\Desktop\3MASH-Anasayfa-Konsept-v2.html`
- `C:\Users\caner\Downloads\3MASH-CRS-Composite-Konsept.html`

## Yetkili Kaynak Kuralı

- Kullanıcının verdiği kaynaklar dışında kafaya göre tasarım kaynağı kullanılmamalı.
- Spesifik olarak kullanıcı istemedikçe veya açıkça izin vermedikçe internetten, başka sitelerden, template galerilerinden ya da benzer markalardan tasarım referansı alınmamalı.
- Yetkili kaynaklar:
  - Kullanıcının verdiği lokal HTML dosyaları.
  - Kullanıcının açıkça referans verdiği `https://3mash.com/` canlı sitesi.
  - Projenin mevcut kodu ve mevcut assetleri.
- `https://3mash.com/` yalnızca kullanıcının açıkça belirttiği alanlar için referans alınmalı; örnek: navbar logo spacing.
- Eğer kaynaklar arasında çelişki varsa kafaya göre karar verilmemeli; kullanıcıdan teyit alınmalı veya not dosyasındaki öncelik açıkça belirtilmeli.
- Tasarım, renk, spacing, animasyon veya component davranışı için verilen kaynakların dışına çıkılmamalı.

## Global Hata Önleme Kuralları

- Kaynakta birebir kopyalanmış bir alan, kullanıcı açıkça izin vermedikçe yeniden yorumlanmamalı, sadeleştirilmemeli veya "daha doğru olur" düşüncesiyle değiştirilmemeli.
- Kullanıcının ekran görüntüsüyle "doğru hali bu" dediği alan en güncel kabul kriteridir; önceki yorum veya ara düzeltme bu görüntüyle çelişiyorsa görüntü esas alınmalı.
- 3MASH logo tek bir marka görseli olarak ele alınmalı. Logo ikon + JSX text olarak parçalanmamalı.
- Logo için yetkili kaynak `https://3mash.com/` canlı sitesidir. Lokal konsept HTML'deki inline logo veya elle çizilmiş fallback, canlı 3mash logo kaynağının yerine kullanılmamalı.
- 3mash kaynak logosunda text görselin içindeyse, text JSX olarak tekrar basılmamalı. Header'da beyaz görünen görsel text siyaha çevrilecekse bu işlem görsel/mask üzerinden yapılmalı; ayrı yazı elementi eklenmemeli.
- Kaynakta ok, nokta, vurgu, emoji, satır kırılımı veya özel karakter varsa aynen korunmalı. Örnek: `Keşfet →` ok karakteri kaldırılmamalı.
- Türkçe büyük harfler CSS `text-transform` dönüşümüne bırakılmamalı. Kaynak `ÜRETİM` ise prop/defaultValue doğrudan `ÜRETİM` olmalı; `Üretim` yazıp tarayıcı dönüşümünden `ÜRETIM` üretilmesine izin verilmemeli.
- Açılır menü gibi viewport'a taşabilen panellerde kaynak iç tasarım korunmalı, ancak panel konumu viewport içinde kalacak şekilde ölçülüp clamp edilmelidir. Taşma varsa kaynak tasarım bozulmadan konum düzeltilmeli.
- C4P öne çıkan ürün kartı sağ taraf iconlarını kaldırma kapsamına dahil edilmemeli; kart içeriği ve görsel/animasyon davranışı için kullanıcının en son verdiği ekran görüntüsü ve kaynak kod esas alınmalı.
- Ürün sayfası datası canlı siteden veya kaynak HTML'den alınsa bile kullanıcıya görünen metinlerde `ürün sayfasına göre`, `açıklamaya göre`, `canlı ürün sayfasındaki bilgiye göre`, `kaynakta belirtildiği gibi` gibi kaynak-atfı cümleleri yazılmamalı. Kaynak sadece doğrulama için kullanılır; frontend metni doğrudan ürün bilgisi gibi okunmalıdır.
- Ürün datasında kaynakta gerçek sayı/oran/metrik yoksa yüzde, MPa, değerlendirme oranı veya performans değeri uydurulmamalı. Kaynakta yüzdesiz değerlendirme metni varsa rating bar yüzdesiz metin olarak render edilmeli; kaynakta açıkça sayı varsa sayı kullanılmalı.
- Tekli ürün use-case / uygulama görsel kartlarında ürünün 1. görseli kullanılmamalı; 1. görsel ana ürün/hero görselidir. Uygulama kartları 2. görselden başlamalı ve 3, 4 diye devam etmelidir. Kaynakta yeterli uygulama görseli yoksa boş bırakmak yerine 2. görsel aynı ürün için kopyalanarak eksik slotlar doldurulmalıdır.
- İkas CLI ile aynı `ikas.config.json` dosyasına paralel update komutu çalıştırılmamalı. Config/type üreten komutlar sırayla çalıştırılmalı ve her seri sonunda JSON parse kontrolü yapılmalı.

## Model ve Reasoning Seçimi

- Yeni chat/session başlatırken kodlama ve uzun kaynak karşılaştırma yapabilen en güçlü model seçilmeli.
- Reasoning seviyesi yüksek tutulmalı.
- Bu iş hızlı cevap gerektiren basit bir metin işi değildir; kaynak HTML, mevcut componentler, ikas config/CLI kuralları ve responsive davranış birlikte düşünülmeli.
- Modelden önce okuması, sonra karar vermesi istenmeli.
- Model kafasına göre tasarım kararı vermemeli; reasoning süreci verilen kaynaklara ve proje kurallarına bağlı kalmalı.
- Yeni chate yapıştırılacak promptlarda şu ifade yer alabilir:
  - `Bu iş için yüksek reasoning kullan. Önce kaynakları oku, sonra planla, sonra uygula. Verilen kaynaklar dışında tasarım referansı kullanma.`

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
- Güncel durum notu: Dental reçineler kategori sayfası yapıldı; bu kategoriye dokunulmayacak.
- Sıradaki kategori 3D Yazıcılar kategorisidir.
- 3D Yazıcılar için kaynak dosya kullanıcı tarafından gönderildi: `C:\Users\caner\Downloads\3MASH-Yazicilar-Konsept.html`.

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

### 6.10 Sayfa İzolasyonu ve Dinamik Davranışlar

- Tekli ürün sayfası için oluşturulacak yapı başka sayfaları değiştirmemeli.
- Tekli ürün sayfasına özel duyuru bandı, hero, ürün galerisi, varyant seçimi, metrikler, FAQ, video ve ilgili ürünler sadece o ürün detay sayfasında görünmeli.
- Anasayfaya geri dönüldüğünde tekli ürün sayfasındaki ürün duyuru bandı görünmemeli.
- Kategori sayfalarına gidildiğinde tekli ürün sayfasına özel alanlar kategori sayfasına taşmamalı.
- Başka tekli ürün sayfasına gidildiğinde önceki ürünün içerikleri kalmamalı; tüm içerik aktif ürünün prop/datasından gelmeli.
- Sayfa componentleri global CSS veya global state üzerinden diğer sayfaların görünümünü bozmamalı.
- Ürüne özel class isimleri ve CSS seçicileri scoped olmalı; örnek olarak tekli ürün yapısı kendi root class'ı altında çalışmalı.
- Duyuru bandı global header'ın parçası gibi davranmamalı; ürün detay template'inin sayfaya özel bir bölümü olarak yönetilmeli.
- Eğer global header içinde genel duyuru bandı varsa, ürün detay sayfasındaki ürün duyurusu onunla karıştırılmamalı.
- Ürün detay sayfasındaki state değerleri route değişiminde sıfırlanmalı veya yeni ürün datasına göre yeniden kurulmalı.
- Galeri seçimi, renk/boyut seçimi, açık FAQ durumu ve animasyon tetiklemeleri başka sayfalara taşınmamalı.
- Tekli ürün template'i tekrar kullanılabilir olmalı ama her instance kendi datasıyla izole çalışmalı.
- Dinamikleşen tüm alanlarda fallback/default içerik dikkatli kullanılmalı; yanlış ürün datası yoksa önceki üründen kalan içerik gösterilmemeli.
- Routing tarafında kategori sayfasından ürün detayına geçiş ve ürün detayından anasayfa/kategoriye dönüş temiz olmalı.
- Kabul kriteri: tekli ürün sayfasına gir, ürün duyuru bandını gör; anasayfaya geri dön, bu duyuru bandının kaybolduğunu doğrula.
- Kabul kriteri: bir ürün detayından başka ürün detayına geç, eski ürünün görsel/metin/varyant/FAQ bilgisinin kalmadığını doğrula.

## Durum

- Not alma başladı.
- Henüz düzeltme uygulanmadı.

## 7. Hafızası Sıfır Chat İçin Uygulama Brifi

### 7.1 Proje Bağlamı

- Proje: `C:\Users\caner\3MashWeb`
- Proje tipi: ikas code components / Preact tabanlı tema component projesi.
- Ana config: `ikas.config.json`
- Global stil dosyası: `src/global.css`
- Component export dosyası: `src/components/index.ts`
- Kaynak HTML dosyaları gerçek tasarım referansıdır; mevcut componentlerdeki hatalı kopya referans alınmamalı.
- Amaç mevcut temayı kaynak HTML'lere sadık hale getirmek, ancak bunu kopyala-yapıştır statik HTML olarak değil, reusable component/prop yapısıyla yapmak.

### 7.2 Önce Okunacak Dosyalar

- Mutlaka okunacak kaynaklar:
  - `C:\Users\caner\Desktop\3MASH-Anasayfa-Konsept-v2.html`
  - `C:\Users\caner\Downloads\3MASH-Recineler-Konsept.html`
  - `C:\Users\caner\Downloads\3MASH-Yazicilar-Konsept.html`
  - `C:\Users\caner\Downloads\3MASH-CRS-Composite-Konsept.html`
- Mutlaka okunacak proje dosyaları:
  - `src/global.css`
  - `ikas.config.json`
  - `src/components/ThreeMashHeader/index.tsx`
  - `src/components/ThreeMashHeader/styles.css`
  - `src/components/ThreeMashFooter/index.tsx`
  - `src/components/ThreeMashFooter/styles.css`
  - `src/components/ThreeMashHero/index.tsx`
  - `src/components/ThreeMashHero/styles.css`
  - `src/sub-components/ThreeMashSectionRenderer/index.tsx`
  - `src/sub-components/ThreeMashSectionRenderer/styles.css`
  - `src/components/ThreeMashDentalResinsListingPage/index.tsx`
  - `src/components/ThreeMash3dPrintersListingPage/index.tsx`
  - `src/components/ThreeMashProductDetailLive/index.tsx`
  - `src/components/ThreeMashProductDetailLive/styles.css`
- İşe başlamadan önce `git status --short` çalıştırılmalı.
- Var olan kullanıcı değişiklikleri geri alınmamalı.

### 7.3 Genel Uygulama Sırası

- Önce global token ve font sistemi düzeltilmeli.
- Sonra header/navbar ve footer düzeltilmeli.
- Sonra anasayfa hero ve anasayfa sectionları kaynak HTML'e göre düzeltilmeli.
- Sonra kategori sayfası template sistemi kurulmalı.
- Sonra tekli ürün sayfası template sistemi kurulmalı.
- En son responsive ve görsel karşılaştırma yapılmalı.

### 7.4 Global Tema Yapımı

- Fontlar global olmalı:
  - Body: `Inter`
  - Heading: `Space Grotesk`
  - Emphasis/italic vurgu: `Newsreader`
  - Logo text: `Baloo 2`
- Bu fontlar sadece CSS'te değil, ikas Studio içinde görünen global değerlerde de doğru görünmeli.
- `ikas.config.json` içindeki global style/default font değerleri kontrol edilmeli.
- Kaynak HTML'lerdeki renk tokenları global tema tokenlarına bağlanmalı:
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
- Gereksiz ekstra renkler temizlenmeli.
- Özellikle anasayfada kaynak HTML'de olmayan sarı arka plan/parlama efektleri kaldırılmalı.

### 7.5 Header / Navbar Yapımı

- Navbar kaynak HTML ve `https://3mash.com/` referansına göre düzeltilmeli.
- Logo yeniden hizalanmalı:
  - Logo ikon ile `mash` text arasındaki boşluk kaynak siteye göre ayarlanmalı.
  - Header ve footer aynı doğru logo mantığını kullanmalı.
- Ürünler açılır penceresi mevcut hatalı yapı üstünden yamalanmamalı; kaynak tasarıma göre sıfırdan oluşturulmalı.
- Açılır ürün penceresindeki öne çıkan ürün alanı korunmalı ve şu içerik yerleştirilmeli:
  - `YENİ · DÜNYADA İLK`
  - `MASH C4P Akıllı Kürleme Cihazı`
  - `Reçineye göre otomatik kürleme. Sonuç kalitesini kullanıcı hatasından çıkarır.`
  - Link: `https://studio.ikasapps.com/yikama-kurleme-cihazlari`
- Açılır penceredeki sağ taraf tamamen sıfırlanmalı.
- Mevcut yanlış iconlar kaldırılmalı.
- Sağ taraf kaynak HTML'deki gibi metin/link düzeniyle yapılmalı.
- Navbar global component olmalı; anasayfa, kategori ve tekli ürün sayfalarında ayrı ayrı kopyalanmamalı.

### 7.6 Footer Yapımı

- Footer logosu tamamen düzeltilmeli.
- Önce navbar logo standardı netleştirilmeli, footer bu standarda göre uyarlanmalı.
- Footer ayrı kopya HTML olarak her sayfaya yazılmamalı.
- Global footer componenti düzeltilip tüm sayfalarda aynı doğru footer kullanılmalı.

### 7.7 Anasayfa Yapımı

- Anasayfa kaynağı: `C:\Users\caner\Desktop\3MASH-Anasayfa-Konsept-v2.html`
- Mevcut anasayfa componentleri kaynak HTML'e göre kontrol edilmeli.
- Background renkleri kaynak dosyadaki değerlerle birebir aynı olmalı.
- Kaynakta olmayan sarı glow/arka plan sarılıkları kaldırılmalı.
- Hero başlangıç sayısı kaynakta olduğu gibi animasyonlu olmalı.
- Hero başlığındaki sayı `72.000` gibi kaynak davranışına göre başlamalı ve animasyon doğru çalışmalı.
- `±20 µm`, `<6 ay`, `580+` gibi hero istatistikleri çift renk olmamalı; kaynak HTML'deki renkte olmalı.
- `Sebebini görün` ve `Ücretsiz danışmanlık` butonları kaynak HTML'deki renk, boyut, border, padding ve hover mantığına göre düzeltilmeli.
- Section 3 / Üretim Ekosistemi:
  - Mevcut animasyon kaldırılmalı.
  - Kaynak HTML'deki tasarıma birebir dönülmeli.
  - Ürün SVG'leri kaldırılmalı.
  - Bizim gerçek ürün/category bağlantıları yerleştirilmeli.
- Section 4:
  - Renk, font, spacing ve kart yapıları kaynakla karşılaştırılıp düzeltilmeli.
- Section 5:
  - Eski haline getirilmeli.
- Anasayfa düzeltmeleri bittikten sonra responsive test yapılmalı.

### 7.8 Kategori Sayfaları Yapımı

- Kategori sayfaları tek tek statik kopya olarak değil, ortak template/component sistemiyle yapılmalı.
- Elimizdeki `3MASH-Recineler-Konsept.html` ve `3MASH-Yazicilar-Konsept.html` iki ana referans olarak kullanılmalı.
- Dental reçineler kategorisi dental reçineler için oluşturulan kategori sayfasına yönlenmeli.
- Yazıcılar kategorisi yazıcılar için oluşturulan kategori sayfasına yönlenmeli.
- Bu iki kategori aynı şablon mantığını paylaşmalı.
- Componentler prop tabanlı tasarlanmalı:
  - Hero/intro alanı
  - Kategori açıklaması
  - Ürün liste/grid alanı
  - Filtre veya kategori kırılım alanları varsa prop listeleri
  - CTA alanları
  - SEO/heading metinleri
- Aynı component sistemi ileride diğer kategoriler için de kullanılmalı.
- Kaynak dosya eşleşmesi uygulanmadan önce kontrol edilmeli:
  - Dental reçineler için doğru kaynak muhtemelen `3MASH-Recineler-Konsept.html`.
  - Yazıcılar için doğru kaynak `3MASH-Yazicilar-Konsept.html`.
  - Önceki notlarda kullanıcı `3MASH-Yazicilar-Konsept.html` dosyasını iki kategori için de yazdı; uygulamada kullanıcıdan veya dosya içeriğinden doğru eşleşme teyit edilmeli.

### 7.9 Tekli Ürün Sayfaları Yapımı

- Tekli ürün kaynağı: `C:\Users\caner\Downloads\3MASH-CRS-Composite-Konsept.html`
- Bu dosya CRS Composite için örnek ürün detay sayfasıdır.
- Amaç tek bir CRS Composite kopyası yapmak değil, tüm tekli ürün sayfaları için reusable template kurmaktır.
- Sayfa parça parça component olmalı:
  - Ürüne özel duyuru bandı
  - Breadcrumb
  - Product hero
  - Sticky gallery
  - Product configurator
  - Trust badges
  - Rating bars
  - Metric cards
  - Spec highlight / dark band
  - Use cases
  - Ecosystem callout
  - FAQ
  - Video block
  - Related products
  - Final CTA
- Ürün datası prop/listelerle gelmeli.
- Tek ürün bilgisi hardcode edilmemeli; CRS Composite sadece default/demo veri olarak kullanılmalı.
- Galeri thumbnail tıklayınca ana görsel değişmeli.
- Renk ve boyut seçimi state ile çalışmalı.
- Seçime göre özet metni ve satın alma URL'i güncellenmeli.
- Rating bar ve metrik count-up animasyonları IntersectionObserver ile çalışmalı.
- FAQ kaynak HTML'deki `details/summary` davranışında olmalı.
- Video kartı büyük görsel + play icon + link olarak çalışmalı.
- İlgili ürün grid'i prop listesiyle farklı ürün gruplarına uyarlanabilir olmalı.

### 7.10 Sayfa İzolasyonu

- En kritik kural: herhangi bir sayfa için yapılan özel alan başka sayfaya taşmamalı.
- Tekli ürün sayfasındaki ürün duyuru bandı anasayfada görünmemeli.
- Anasayfaya geri dönünce tekli ürün sayfasının duyurusu, galerisi, varyant state'i, FAQ açık/kapalı durumu veya özel içeriği kalmamalı.
- Kategori sayfalarına geçince tekli ürün sayfasına ait alanlar görünmemeli.
- Başka ürün detayına geçince önceki ürünün içerikleri kalmamalı.
- Her template kendi root class'ı altında scoped CSS kullanmalı.
- Global CSS sadece gerçek global token/font/reset için kullanılmalı.
- Ürüne/kategoriye özel CSS global selector ile başka sayfaları etkilememeli.
- Duyuru bandı ikiye ayrılmalı:
  - Global header duyurusu varsa tüm siteye ait olmalı.
  - Ürün detay duyurusu sadece ürün detay template içinde render edilmeli.
- Route değişimlerinde component state yeni dataya göre resetlenmeli.

### 7.11 Doğrulama

- Build çalıştırılmalı:
  - `pnpm build` veya projedeki mevcut script neyse `pnpm run build`
- Gerekirse dev server çalıştırılıp görsel kontrol yapılmalı:
  - `pnpm dev`
- Desktop, tablet ve mobil viewport kontrol edilmeli.
- Anasayfa kaynak HTML ile görsel olarak karşılaştırılmalı.
- Kategori sayfaları kendi kaynaklarıyla karşılaştırılmalı.
- CRS Composite tekli ürün sayfası kaynak HTML ile karşılaştırılmalı.
- Navbar açılır ürünler penceresi hover/click davranışı kontrol edilmeli.
- Header/footer tüm sayfalarda doğru görünmeli.
- Ürün detay sayfasından anasayfaya dönüşte ürün duyurusunun kaybolduğu doğrulanmalı.
- Ürün detayından kategoriye dönüşte ürün detay state'inin taşmadığı doğrulanmalı.
- Bir tekli ürün datasından başka tekli ürün datasına geçildiğinde eski data kalmadığı doğrulanmalı.
- Linkler kontrol edilmeli:
  - Dental reçineler kategori linki
  - Yazıcılar kategori linki
  - CRS Composite ürün linki
  - Sepete ekle linki
  - WhatsApp / danışmanlık linkleri
  - İlgili ürün linkleri

### 7.12 Çalışma Kuralları

- Kullanıcının mevcut değişiklikleri geri alınmamalı.
- Büyük refactor yapılacaksa önce ilgili dosyalar okunmalı.
- Önce notlardaki problemi doğrula, sonra kod değiştir.
- Kaynak HTML'deki design gerçek referanstır.
- Mevcut component yanlışsa, mevcut yanlış yapıyı korumaya çalışmadan kaynak tasarıma göre yeniden kur.
- Ancak global header/footer gibi ortak parçalar kopyalanmamalı; tek doğru ortak component kullanılmalı.
- Yeni prop eklenirse `types.ts`, `index.tsx`, `styles.css` ve `ikas.config.json` uyumlu güncellenmeli.
- Değişiklikten sonra build alınmalı.
- Görsel doğrulama yapılmadan iş tamamlandı sayılmamalı.

## 8. Session Planı ve Yeni Chat Promptları

### 8.1 Genel Session Kuralı

- İş 4 ayrı session halinde ilerlemeli.
- Her session sadece kendi kapsamındaki işleri yapmalı.
- Her session başında bu dosya tekrar okunmalı.
- Her session sonunda:
  - Yapılan değişiklikler özetlenmeli.
  - `pnpm run build` veya projedeki build scripti çalıştırılmalı.
  - Gerekirse görsel/responsive kontrol yapılmalı.
  - Sadece ilgili session değişiklikleri commitlenmeli.
  - Commit sonrası yeni chate geçilmeli.
- Mevcut kullanıcı değişiklikleri asla geri alınmamalı.
- Önceki session tamamlanmadan sonraki sessiona geçilmemeli.

### 8.2 Session 1 - Global + Header/Footer

Kapsam:

- Global font değerleri.
- Global renk/token sistemi.
- ikas Studio'da görünen global font/tema değerleri.
- Navbar logo düzeltmesi.
- Navbar ürünler açılır penceresinin sıfırdan, kaynak tasarıma uygun yapılması.
- Açılır ürün penceresi sağ tarafının sıfırlanması ve iconların kaldırılması.
- Footer logo düzeltmesi.
- Header/footer ortak component olarak tüm sayfalarda doğru çalışması.

Bu sessionda özellikle okunacak dosyalar:

- `C:\Users\caner\Desktop\3MASH-Anasayfa-Konsept-v2.html`
- `C:\Users\caner\Downloads\3MASH-CRS-Composite-Konsept.html`
- `src/global.css`
- `ikas.config.json`
- `src/components/ThreeMashHeader/index.tsx`
- `src/components/ThreeMashHeader/styles.css`
- `src/components/ThreeMashFooter/index.tsx`
- `src/components/ThreeMashFooter/styles.css`
- `src/sub-components/ThreeMashSectionRenderer/index.tsx`
- `src/sub-components/ThreeMashSectionRenderer/styles.css`

Session 1 kabul kriterleri:

- Fontlar global olarak doğru çalışmalı.
- Studio global değerleri doğru görünmeli.
- Navbar logo spacing'i kaynak siteyle uyumlu olmalı.
- Navbar ürün dropdown kaynak tasarıma göre düzelmiş olmalı.
- C4P öne çıkan ürün alanı korunmalı ve doğru içerikle yerleşmeli.
- Dropdown sağ tarafındaki yanlış iconlu yapı kaldırılmış olmalı.
- Footer logo navbar standardıyla uyumlu olmalı.
- Header/footer başka sayfalara özel bozulma yaratmamalı.
- Build başarılı olmalı.

Session 1 için yeni chate yapıştırılacak prompt:

```text
THEME_FIX_NOTES.md dosyasını oku. Session 1 kapsamından başla: Global + Header/Footer. Hiçbir mevcut kullanıcı değişikliğini geri alma. Önce ilgili kaynak HTML'leri ve proje componentlerini oku. Global font/token sistemini, ikas Studio global değerlerini, navbar logosunu, navbar ürün dropdown'ını ve footer logosunu notlardaki kabul kriterlerine göre düzelt. İş bitince build al, değişiklikleri özetle ve commit için hazır hale getir.
```

### 8.3 Session 2 - Anasayfa

Kapsam:

- Anasayfa background renkleri.
- Kaynakta olmayan sarı arkaplan/parlama efektlerinin kaldırılması.
- Hero sayı animasyonu.
- Hero istatistik yazılarındaki çift renk problemleri.
- Hero butonlarının renk/boyut/spacing düzeltmeleri.
- Section 3 Üretim Ekosistemi'nin kaynak tasarıma döndürülmesi.
- Section 4 renk/font/spacing kontrolü.
- Section 5'in eski haline getirilmesi.
- Anasayfa responsive kontrolü.

Bu sessionda özellikle okunacak dosyalar:

- `C:\Users\caner\Desktop\3MASH-Anasayfa-Konsept-v2.html`
- `src/components/ThreeMashHero/index.tsx`
- `src/components/ThreeMashHero/styles.css`
- `src/components/ThreeMashSolution/index.tsx`
- `src/components/ThreeMashSolution/styles.css`
- `src/components/ThreeMashCuring/index.tsx`
- `src/components/ThreeMashCuring/styles.css`
- `src/components/ThreeMashEcosystem/index.tsx`
- `src/components/ThreeMashEcosystem/styles.css`
- `src/components/ThreeMashTrust/index.tsx`
- `src/components/ThreeMashTrust/styles.css`
- `src/sub-components/ThreeMashSectionRenderer/index.tsx`
- `src/sub-components/ThreeMashSectionRenderer/styles.css`
- `ikas.config.json`

Session 2 kabul kriterleri:

- Anasayfa background renkleri kaynak HTML ile uyumlu olmalı.
- Gereksiz sarı arkaplan/parlamalar kalkmış olmalı.
- Hero sayı animasyonu kaynak HTML davranışına göre çalışmalı.
- `±20 µm`, `<6 ay`, `580+` renkleri kaynakla uyumlu olmalı.
- `Sebebini görün` ve `Ücretsiz danışmanlık` butonları kaynakla uyumlu olmalı.
- Section 3 kaynak tasarıma dönmüş olmalı; gereksiz animasyon kalkmalı.
- Section 3'te ürün SVG'leri yerine bizim ürün/category bağlantıları kullanılmalı.
- Section 4 kaynak renk/font/spacing değerleriyle kontrol edilmiş olmalı.
- Section 5 eski haline dönmüş olmalı.
- Desktop/tablet/mobile kontrol yapılmış olmalı.
- Build başarılı olmalı.

Session 2 için yeni chate yapıştırılacak prompt:

```text
THEME_FIX_NOTES.md dosyasını oku. Session 2 kapsamından devam et: Anasayfa. Session 1'in global header/footer kararlarını koru. Hiçbir mevcut kullanıcı değişikliğini geri alma. C:\Users\caner\Desktop\3MASH-Anasayfa-Konsept-v2.html kaynak HTML'ini gerçek referans kabul et. Anasayfa background renklerini, hero sayı animasyonunu, stat renklerini, hero butonlarını, section 3/4/5 düzeltmelerini ve responsive kontrolleri notlardaki kabul kriterlerine göre uygula. İş bitince build al, değişiklikleri özetle ve commit için hazır hale getir.
```

### 8.4 Session 3 - Kategori Sayfaları

Kapsam:

- Dental reçineler kategori sayfası.
- Yazıcılar kategori sayfası.
- Ortak kategori template/component yapısı.
- Prop/list tabanlı içerik yönetimi.
- Kategori routing/linkleri.
- Diğer kategorilere çoğaltılabilir yapı.

Bu sessionda özellikle okunacak dosyalar:

- `C:\Users\caner\Downloads\3MASH-Recineler-Konsept.html`
- `C:\Users\caner\Downloads\3MASH-Yazicilar-Konsept.html`
- `src/components/ThreeMashDentalResinsListingPage/index.tsx`
- `src/components/ThreeMashDentalResinsListingPage/types.ts`
- `src/components/ThreeMash3dPrintersListingPage/index.tsx`
- `src/components/ThreeMash3dPrintersListingPage/types.ts`
- `src/components/ThreeMashProductListingPresets.ts`
- `src/components/product-list-utils.ts`
- `ikas.config.json`

Session 3 kabul kriterleri:

- Dental reçineler kategorisi doğru özel kategori sayfasına yönlenmiş durumda kabul edilmeli; bu sayfaya tekrar dokunulmamalı.
- Yazıcılar kategorisi doğru özel kategori sayfasına yönlenmeli.
- Dental reçineler kategorisi tamamlandığı için bu kategori üzerinde yeni değişiklik yapılmamalı.
- Sıradaki çalışma 3D Yazıcılar kategorisi olmalı.
- 3D Yazıcılar için gönderilen kaynak dosya kullanılmalı: `C:\Users\caner\Downloads\3MASH-Yazicilar-Konsept.html`.
- İki kategori sayfası ortak component/prop sistemiyle kurulmalı.
- Diğer kategorilere çoğaltılabilecek yapı hazırlanmalı.
- Header/footer global component olarak kalmalı.
- Build başarılı olmalı.
- Responsive kontrol yapılmalı.

Session 3 için yeni chate yapıştırılacak prompt:

```text
THEME_FIX_NOTES.md dosyasını oku. Session 3 kapsamından devam et: Kategori Sayfaları. Hiçbir mevcut kullanıcı değişikliğini geri alma. Dental reçineler kategori sayfası yapıldı; bu kategoriye dokunma. Sıradaki çalışma 3D Yazıcılar kategorisidir. Kullanıcı 3D Yazıcılar için kaynak dosyayı gönderdi: C:\Users\caner\Downloads\3MASH-Yazicilar-Konsept.html. Bu dosyayı oku, 3D Yazıcılar kategori sayfasını mevcut ortak reusable component/prop mantığıyla oluştur veya tamamla; yazıcılar kategorisi kendi özel sayfasına yönlensin. Header/footer global kalsın. İş bitince build al, responsive kontrol yap, değişiklikleri özetle ve commit için hazır hale getir.
```

### 8.5 Session 4 - Tekli Ürün Sayfaları

Kapsam:

- CRS Composite kaynaklı reusable tekli ürün sayfası template'i.
- Product detail component kırılımı.
- Prop/list tabanlı ürün datası.
- Ürün duyuru bandı.
- Breadcrumb.
- Sticky gallery.
- Product configurator.
- Trust badges.
- Rating bars.
- Metric cards.
- Spec highlight / dark band.
- Use cases.
- Ecosystem callout.
- FAQ.
- Video block.
- Related products.
- Final CTA.
- Sayfa izolasyonu ve route geçişlerinde state temizliği.

Bu sessionda özellikle okunacak dosyalar:

- `C:\Users\caner\Downloads\3MASH-CRS-Composite-Konsept.html`
- `src/components/ThreeMashProductDetailLive/index.tsx`
- `src/components/ThreeMashProductDetailLive/styles.css`
- `src/components/ThreeMashProductDetailLive/types.ts`
- `src/components/ThreeMashSingleProduct/index.tsx`
- `src/components/ThreeMashSingleProduct/styles.css`
- `src/components/ThreeMashSingleProduct/types.ts`
- `src/components/ThreeMashProductAccordionFaq/index.tsx`
- `src/components/ThreeMashProductMetrics/index.tsx`
- `src/components/ThreeMashProductImageText/index.tsx`
- `src/components/ThreeMashProductVideo/index.tsx`
- `src/components/ThreeMashProductLargeImage/index.tsx`
- `ikas.config.json`

Session 4 kabul kriterleri:

- CRS Composite kaynak HTML'deki ürün detay yapısı reusable template olarak kurulmalı.
- CRS Composite sadece örnek/default data olmalı; template başka ürünlere uyarlanabilir olmalı.
- Ürün duyuru bandı sadece ürün detay sayfasında görünmeli.
- Anasayfaya veya kategoriye dönünce ürün duyurusu ve ürün state'i taşmamalı.
- Galeri thumbnail davranışı çalışmalı.
- Renk/boyut seçimi çalışmalı.
- Sepete ekle URL'i seçime göre güncellenmeli.
- Rating bar animasyonları çalışmalı.
- Metrik count-up animasyonları çalışmalı.
- FAQ çalışmalı.
- Video ve ilgili ürün linkleri çalışmalı.
- Header/footer global component olarak kalmalı.
- Build başarılı olmalı.
- Desktop/tablet/mobile kontrol yapılmalı.

Session 4 için yeni chate yapıştırılacak prompt:

```text
THEME_FIX_NOTES.md dosyasını oku. Session 4 kapsamından devam et: Tekli Ürün Sayfaları. Hiçbir mevcut kullanıcı değişikliğini geri alma. C:\Users\caner\Downloads\3MASH-CRS-Composite-Konsept.html dosyasını tekli ürün detay template'i için kaynak kabul et. Sayfayı tek statik kopya olarak değil, reusable component/prop sistemiyle kur. Ürün duyuru bandı, galeri, konfigurasyon, rating/metrik animasyonları, FAQ, video, related products ve final CTA alanlarını notlardaki kabul kriterlerine göre uygula. Sayfa izolasyonuna özellikle dikkat et: ürün detayına özel duyuru/state başka sayfalara taşmamalı. İş bitince build al, responsive ve route geçiş kontrollerini yap, değişiklikleri özetle ve commit için hazır hale getir.
```

## 9. CLAUDE.md Proje Kuralları

### 9.1 Neden Önemli

- `CLAUDE.md` bu projenin ikas Code Components çalışma kurallarını içerir.
- Yeni chat/session başlarken `THEME_FIX_NOTES.md` ile birlikte `CLAUDE.md` de okunmalı.
- Bu bölüm, `CLAUDE.md` içinden tema düzeltme işi için gerekli olan kuralları özetler.

### 9.2 Auto-Generated Dosya Kuralı

- Aşağıdaki dosyalar normal şartlarda elle oluşturulmamalı veya elle düzenlenmemeli:
  - `ikas.config.json`
  - `src/components/**/types.ts`
  - `src/global-types.ts`
  - `src/components/index.ts`
- Component, prop, enum ve prop group değişiklikleri ikas CLI ile yapılmalı.
- Kullanılacak temel CLI komutları:
  - `npx ikas-component config add-component`
  - `npx ikas-component config add-prop`
  - `npx ikas-component config update-prop`
  - `npx ikas-component config remove-prop`
  - `npx ikas-component config add-prop-group`
  - `npx ikas-component config update-prop-group`
  - `npx ikas-component config add-enum`
  - `npx ikas-component config update-enum`
  - `npx ikas-component config remove-enum`
- Önceki notlarda geçen `ikas.config.json uyumlu güncellenmeli` ifadesi, elle düzenleme anlamına gelmez.
- Doğru yorum: prop/config/type değişiklikleri CLI ile yapılmalı; CLI'nin ürettiği dosyalar kontrol edilmeli.
- `remove-prop` veya `remove-enum` sonrasında kaynak kodda eski prop/enum referansı kalıp kalmadığı `rg` ile aranmalı.

### 9.3 MCP / Storefront API Kuralı

- Storefront API, model tipi veya ikas helper fonksiyonu kullanılacaksa imza tahmin edilmemeli.
- Kod yazmadan önce ilgili MCP doküman/tool bilgisi kontrol edilmeli.
- Özellikle ürün, varyant, fiyat, sepete ekleme, müşteri, cart, category, image ve navigation API'lerinde dokümana bakılmalı.
- Gerekli olabilecek MCP/ikas doküman başlıkları:
  - `get_section_template`
  - `get_framework_guide`
  - `get_code_example`
  - `search_docs`
  - `get_function_doc`
  - `get_model_guide`
  - `get_type_definition`
  - `get_prop_types`
- MCP aracı mevcut değilse, mevcut kod örnekleri ve kurulu paket tipleri okunmalı; API imzası tahmin edilmemeli.

### 9.4 Yeni Section / Component Oluşturma Kuralı

- Yeni page-level alanlar `section` olarak eklenmeli.
- Yeni section başlatırken önce ikas section template mantığı takip edilmeli.
- Section props yapısı CLI ile oluşturulmalı.
- Root componentler `observer()` ile sarılmamalı; ikas runtime root componentleri zaten reactive yapar.
- Sadece `src/sub-components/` altındaki yardımcı sub-componentlerde `observer()` kullanılabilir.
- Section root elementlerinde `backgroundColor` COLOR prop bulunmalı.
- Gerekirse `textColor` gibi renk propları da section seviyesinde tanımlanmalı.

### 9.5 Sub-Component Yapısı

- Paylaşılan veya parçalanmış componentler `src/sub-components/` altında kendi klasörleriyle oluşturulmalı.
- Sub-component yapısı:
  - `src/sub-components/ComponentName/index.tsx`
  - `src/sub-components/ComponentName/styles.css`
- Sub-componentler için `types.ts` oluşturulmamalı.
- Sub-component Props tipi kendi `index.tsx` içinde inline tanımlanmalı.
- `src/components/` sadece ikas config'e kayıtlı root section/component dosyaları için kullanılmalı.
- Tekli ürün ve kategori sayfası parçaları mümkünse bu sub-component yapısıyla kurulmalı.

### 9.6 User-Visible Text Kuralı

- JSX içinde kullanıcıya görünen metin hardcode edilmemeli.
- Başlık, buton, açıklama, boş durum, loading metni, form label, aria-label ve anlamlı alt metinler prop olmalı.
- Default içerikler prop `defaultValue` olarak tanımlanmalı.
- Metin propları editor içinde mantıklı prop group altında toplanmalı.
- CRS Composite veya kategori örnek metinleri component içine sabit gömülmemeli; default data/prop olarak gelmeli.

### 9.7 Prop Group ve Editor Düzeni

- Çok prop içeren componentlerde prop group kullanılmalı.
- İçerik, görsel, bağlantılar, varyantlar, metrikler, FAQ, video, ilgili ürünler ve görünüm ayarları ayrı gruplar halinde düzenlenmeli.
- Nested prop group en fazla 1 seviye kullanılmalı.
- Group ID'leri component içinde unique olmalı.

### 9.8 Preact ve Event Kuralı

- Text input gibi inputlarda `onChange` yerine `onInput` kullanılmalı.
- Storefront modelleri null olabilir; her zaman null kontrolü yapılmalı.
- Mutasyon yapan storefront fonksiyonlarında dönüş değerine gereksiz güvenilmemeli; model observable olarak güncellenebilir.

### 9.9 CSS Scoping Kuralı

- ikas build CSS'i component id prefix'iyle scope eder.
- Buna rağmen sayfa izolasyonu için root class altında seçiciler yazılmalı.
- Global CSS sadece gerçek global token/font/reset işleri için kullanılmalı.
- Ürüne veya kategoriye özel selectorlar global element selectorlarıyla başka sayfalara taşmamalı.

### 9.10 Build Kuralı

- Her session sonunda build/check yapılmalı.
- Tercih edilen komutlar:
  - `npx ikas-component check --json`
  - `npx ikas-component build`
  - veya proje scripti olarak `pnpm run build`
- Build/type hataları çözülmeden session tamamlandı sayılmamalı.

## 10. Global Text, Font ve Color Sisteminin Gerçekten Düzeltilmesi

### 10.1 Problem Tanımı

- Global text, font ve color değerleri hâlâ doğru şekilde değiştirilmemiş / ayarlanmamış kabul edilmeli.
- Bu iş yalnızca birkaç component içinde renk değiştirmek değildir.
- Bu iş yalnızca CSS'e birkaç `font-family` yazmak da değildir.
- Amaç, temanın genel tipografi ve renk sistemini kaynak HTML'lerdeki tasarım sistemine göre gerçekten yeniden ayarlamaktır.
- Global değerler doğru kurulmazsa anasayfa, kategori sayfaları ve tekli ürün sayfaları tek tek yamalansa bile tutarlı görünmez.
- Bu yüzden global text/color işi Session 1'in en kritik işi olarak ele alınmalı.

### 10.2 Ne Anlatılmak İsteniyor

- Kaynak HTML'lerde belirli bir tasarım dili var:
  - Body text `Inter` kullanıyor.
  - Heading text `Space Grotesk` kullanıyor.
  - Vurgulu/italic estetik kelimeler `Newsreader` kullanıyor.
  - Logo text `Baloo 2` kullanıyor.
  - Renk sistemi sınırlı ve kontrollü tokenlardan oluşuyor.
- Mevcut projede bu sistem düzgün globalleşmemiş.
- Bazı componentlerde fontlar farklı çalışıyor.
- Bazı yerlerde kaynakta olmayan renkler kullanılmış.
- Bazı yerlerde aynı anlamdaki text farklı renklerde görünüyor.
- Bazı yerlerde arkaplan renkleri kaynak HTML'den sapmış.
- Bazı yerlerde sarı/lime tonu arkaplan parlaması gibi gereksiz şekilde yayılmış.
- Kullanıcının beklentisi: kaynak HTML'deki global text/color sistemi tema genelinde aynı şekilde çalışmalı.

### 10.3 Yetkili Global Referans

- Global font ve renk sistemi için birincil referans lokal kaynak HTML dosyalarıdır.
- Öncelikle şu dosyalardaki `<style>` ve `:root` blokları incelenmeli:
  - `C:\Users\caner\Desktop\3MASH-Anasayfa-Konsept-v2.html`
  - `C:\Users\caner\Downloads\3MASH-Recineler-Konsept.html`
  - `C:\Users\caner\Downloads\3MASH-Yazicilar-Konsept.html`
  - `C:\Users\caner\Downloads\3MASH-CRS-Composite-Konsept.html`
- Verilen kaynaklar dışında global renk/font referansı kullanılmamalı.
- `https://3mash.com/` sadece kullanıcının açıkça belirttiği navbar logo spacing gibi alanlarda referans alınmalı; global renk sistemi için kafaya göre canlı siteden yeni değer çekilmemeli.

### 10.4 Beklenen Global Font Sistemi

- Body/default text:
  - Font: `Inter`
  - Kullanım alanları: paragraflar, açıklamalar, side textler, kart açıklamaları, form açıklamaları, body copy.
- Heading/display text:
  - Font: `Space Grotesk`
  - Kullanım alanları: `h1`, `h2`, `h3`, büyük metrikler, section başlıkları, butonlarda kaynakta heading font kullanılan yerler.
- Italic/emphasis text:
  - Font: `Newsreader`
  - Kullanım alanları: başlıklardaki estetik vurgulu kelimeler, `.em`, `.serif` benzeri kaynak vurguları.
- Logo text:
  - Font: `Baloo 2`
  - Kullanım alanları: `mash` logo yazısı.
- Bu fontlar sadece component CSS içinde dağınık şekilde kullanılmamalı.
- Global token/custom property veya ortak global style olarak tanımlanmalı.
- Componentler mümkün olduğunca bu global font değişkenlerini kullanmalı.
- Örnek mantık:
  - `--tm-theme-font-body`
  - `--tm-theme-font-heading`
  - `--tm-theme-font-serif`
  - `--tm-theme-font-logo`
- İsimler mevcut projedeki pattern'e göre seçilmeli; yeni isim uydurmadan önce mevcut `src/global.css` ve componentler okunmalı.

### 10.5 Studio Global Değerleri

- Sadece CSS tarafı yeterli değildir.
- ikas Studio içinde görünen global font/color değerleri de doğru olmalı.
- `ikas.config.json` elle düzenlenmemeli; CLAUDE.md kuralına göre CLI ile yönetilmeli.
- Ancak mevcut config okunarak Studio'da hangi global alanların göründüğü anlaşılmalı.
- Eğer global font/color değerleri config içinde component prop defaultları olarak dağılmışsa:
  - Bunlar tek tek kaynak HTML tokenlarıyla karşılaştırılmalı.
  - Gerekli prop/default değişiklikleri ikas CLI ile yapılmalı.
  - CLI sonrası generated dosyalar kontrol edilmeli.
- Studio'da kullanıcı font/color gördüğünde kaynak HTML'deki sistemle çelişen değerler görmemeli.

### 10.6 Beklenen Global Color Tokenları

- Kaynak sistemde ana renkler şunlardır:
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
- Bu tokenlar global tema renklerinin ana kaynağı olmalı.
- Componentlerde aynı anlam için farklı hex kodları kullanılmamalı.
- Örnek:
  - Ana metin her yerde `#0E0E0C` / `--ink` / global text token olmalı.
  - Açıklama metni `#55554e` / `--sub` olmalı.
  - Muted text `#8f8f86` / `--mut` olmalı.
  - Border `#E6E6E0` veya gerekli yerde `#d5d5cd` olmalı.
  - Accent lime `#C7F136` olmalı.
  - Dark section background `#0E0E0C` olmalı.
- Kaynakta olmayan mor, mavi, ekstra sarı, ekstra gri, farklı siyah veya farklı beyaz tonları kullanılmamalı.

### 10.7 Yapılacak Teknik Kontrol

- Önce kaynak HTML'lerdeki `:root` renkleri çıkarılmalı.
- Sonra projedeki renk kullanımları taranmalı:
  - `src/global.css`
  - `src/components/**/*.css`
  - `src/components/**/*.tsx`
  - `src/sub-components/**/*.css`
  - `src/sub-components/**/*.tsx`
  - `ikas.config.json`
- `rg` ile hex renkler aranmalı:
  - `rg -n "#[0-9A-Fa-f]{3,8}" src ikas.config.json`
- Her bulunan renk için karar verilmeli:
  - Kaynak token mı?
  - Kaynak tokenın gerekli varyasyonu mu?
  - Gereksiz/yanlış renk mi?
  - Sadece ürün görsel swatch gibi gerçek içerik rengi mi?
- Ürün swatch renkleri gibi içerik anlamı taşıyan renkler global tema renkleriyle karıştırılmamalı.
- Ancak layout, background, border, text, button ve section renklerinde kaynak dışı renk bırakılmamalı.

### 10.8 Componentlerde Yapılacak Düzeltme Mantığı

- Her component kendi içinde rastgele font/color tanımlamamalı.
- Componentler global tokenlardan beslenmeli.
- Eğer componentte şu tarz fallbackler varsa kontrol edilmeli:
  - `themeToken(props.textColor, "...", "--tm-theme-text")`
  - `themeToken(props.backgroundColor, "...", "--tm-theme-bg")`
  - `var(--tm-theme-...)`
- Fallback değerleri kaynak HTML ile uyumlu değilse düzeltilmeli.
- Aynı renk farklı isimlerle dağılmışsa standart tokena bağlanmalı.
- Local component düzeltmesi global sistemin yerine geçmemeli.
- Önce global değer doğru kurulmalı, sonra component fallbackleri buna bağlanmalı.

### 10.9 Text Hiyerarşisi

- `h1`:
  - Kaynak HTML'deki `Space Grotesk` karakterini taşımalı.
  - Letter spacing kaynakla uyumlu olmalı.
  - Gereksiz font farkları olmamalı.
- `h2`, `h3`:
  - Section başlıkları kaynak font/weight/line-height değerlerine yaklaşmalı.
- Paragraph/body:
  - `Inter` ile okunmalı.
  - Renk olarak genellikle `--sub` veya bağlama göre `--ink` kullanılmalı.
- Micro/kicker/index text:
  - `Space Grotesk`
  - Uppercase kaynak davranışı korunmalı.
  - Letter spacing kaynak HTML'de varsa korunmalı; global kural gereği yeni negatif letter spacing uydurulmamalı.
- Emphasis:
  - `Newsreader`
  - Italic ve font-weight kaynakla uyumlu olmalı.
- Button text:
  - Kaynakta hangi font/weight kullanılıyorsa o korunmalı.
  - Butonlar her componentte farklı görünmemeli.

### 10.10 Arkaplan Renkleri ve Sarı Parlama Problemi

- Anasayfada kaynak HTML'de olmayan sarımsı arkaplan/parlama/glow efektleri kaldırılmalı.
- Sadece kaynak HTML'de tanımlı arkaplan rengi ve kaynakta gerçekten varsa kaynak efektleri kullanılmalı.
- `lime-soft` sadece kaynakta gerçekten soft vurgu/panel için kullanıldığı yerlerde kullanılmalı.
- Tüm section backgroundları tek tek kontrol edilmeli.
- Global background tokenı yanlışsa bütün sayfalar yanlış görünür; önce global background düzeltilmeli.

### 10.11 Button Renkleri

- Global button renkleri kaynak HTML'deki `.btn`, `.btn.lime`, `.btn.line`, `.btn.inv` mantığıyla eşleşmeli.
- Buton renkleri component bazlı rastgele belirlenmemeli.
- Hero butonları kaynakta özel boyut/renk kullanıyorsa buna göre düzeltilmeli.
- Kategori ve ürün sayfalarındaki CTA butonları aynı global sistemden beslenmeli.

### 10.12 Yapılmaması Gerekenler

- Verilen kaynaklar dışında renk paleti çıkarma.
- Yeni gradient/orb/glow uydurma.
- Component özelinde geçici renk yaması yapıp global sistemi bozuk bırakma.
- `ikas.config.json` veya `types.ts` dosyalarını elle düzenleme.
- JSX içine yeni hardcoded kullanıcı metni koyma.
- Anasayfa rengi düzeldi diye kategori/ürün sayfasında kaynak dışı renk bırakma.
- Ürün swatch renkleriyle global tema renklerini karıştırma.

### 10.13 Kabul Kriterleri

- Global fontlar kaynak HTML'le uyumlu çalışmalı.
- Studio'da görünen global font/color değerleri kaynak sistemle çelişmemeli.
- Body, heading, emphasis ve logo fontları doğru olmalı.
- Kaynak dışı layout/text/background/button renkleri temizlenmiş olmalı.
- Anasayfa background rengi kaynak HTML ile aynı olmalı.
- Gereksiz sarı arkaplan/parlama efektleri kalkmış olmalı.
- Header, footer, anasayfa, kategori ve ürün sayfaları aynı global token sisteminden beslenmeli.
- Build başarılı olmalı.
- Görsel kontrolde sayfalar birbirinden kopuk farklı tema gibi görünmemeli.

### 10.14 Session 1'e Eklenecek Net Talimat

Yeni chat Session 1 promptuna şu ek talimat eklenmeli:

```text
Global text/font/color sistemi sadece component bazlı yama olarak düzeltilmeyecek. Önce kaynak HTML'lerdeki :root renkleri, font importları ve text hiyerarşisi çıkarılacak. Sonra src/global.css, component CSS/TSX fallbackleri ve Studio'da görünen prop/default değerleri bu sisteme göre hizalanacak. Kaynak dışı layout/text/background/button renkleri temizlenecek. ikas.config.json ve types.ts elle düzenlenmeyecek; gerekli prop/config değişiklikleri ikas CLI ile yapılacak.
```

### 10.15 Inline Rich Text Font Hatası

- Global font/token değerleri eklenmiş olsa bile ikas Studio'da daha önce doldurulmuş rich text alanları inline `font-family`, `font-size`, `font-weight`, `font-style`, `font-variant`, `letter-spacing`, `color`, `background`, `background-color`, `border-color` veya `text-align` taşıyabilir.
- Bu inline değerler component CSS'inden daha baskın kalabildiği için kullanıcı tarafında "global font/renk uygulanmadı" gibi görünür.
- Session 1 ve sonraki sessionlarda rich text ve komple `sectionHtml` render eden helperlar bu eski inline tipografi/renk değerlerini temizlemeli.
- Source HTML'de bilinçli renk vurguları varsa bunlar inline style'a bırakılmamalı; component class'ı ve source token CSS'i üzerinden yeniden verilmelidir.
- Anasayfa renk prop'ları source tasarımı bozuyorsa runtime görseli eski prop değerlerine bağlı kalmamalı; source tokenları (`--bg`, `--ink`, `--sub`, `--mut`, `--line`, `--line2`, `--lime`, `--lime-ink`, `--lime-soft`, `--red`, `--dark`) görselde öncelikli olmalıdır.
- Font fallbackleri kaynak HTML dışına genişletilmemeli. Source `font-family: 'Inter', sans-serif;` diyorsa global token ve component fallbackleri de `"Inter", sans-serif` kalmalı; `system-ui`, `-apple-system`, `BlinkMacSystemFont`, `"Segoe UI"`, `ui-sans-serif`, `Georgia`, `"Times New Roman"` gibi genel güvenlik fallbackleri eklenmemelidir.
- Kaynak font rolleri karıştırılmamalı:
  - Body/default text: `Inter`
  - Heading/display/micro/metric text: `Space Grotesk`
  - Italic emphasis: `Newsreader`
  - Logo text kaynağı gerekiyorsa: `Baloo 2`
