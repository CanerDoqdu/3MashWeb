---
name: ikas-studio-refactor
description: >-
  eğer kullanıcı section proplarının tamamen yenilenmesini istiyorsa hazırda bulunan propları silip yeniden yazmalısın; bileşeni tamamen özelleştirilebilir hale getirmek için izlenecek sistematik prosedür.
  
  İkas Studio tema bileşenlerini (component) tamamen özelleştirilebilir hale getirmek için
  kullanılan sistematik refactoring metodolojisi. Bu skill, bir bileşendeki tüm metinleri,
  linkleri ve yapısal elemanları ikas panelinden düzenlenebilir kılar. Ayrıca "Ekle/Sil/Gizle"
  esnekliği sağlayarak kullanıcının panelden istediği parçayı gösterip gizlemesine veya
  yeni maddeler eklemesine imkan tanır. ThreeMashHeader bileşeni, yalnızca bu mantığın
  davranışsal referansıdır; başka bileşenlerin tasarım yapısı veya prop ağacı için şablon
  değildir. Bu skill, kullanıcı bir ikas bileşenini
  özelleştirilebilir yapmak istediğinde veya "studio" / "panel" / "düzenlenebilir" gibi
  kelimeler kullandığında aktifleştirilmelidir.
---

# İkas Studio Bileşen Refactoring Skill

Bu skill, 3MashWeb ikas temasındaki bileşenleri (component) tamamen ikas Studio panelinden
özelleştirilebilir hale getirmek için gereken sistematik yaklaşımı tanımlar.

## Felsefe

Bir bileşeni "özelleştirilebilir" yapmanın **iki aşaması** vardır:

1. **Aşama 1 — Metin & Link Düzenleme**: Tüm hardcoded metinleri, linkleri ve görselleri
   `ikas.config.json` propsları üzerinden panelden düzenlenebilir kılmak.
2. **Aşama 2 — Yapısal Esneklik (Ekle/Sil/Gizle)**: Kullanıcının panelden istediği
   parçayı gösterip gizlemesine (`showX` toggleları) veya boş "genişletilmiş slot yuvaları"
   aracılığıyla yeni maddeler eklemesine imkan tanımak.

Her iki aşama da tamamlandığında bileşen "Studio-Ready" kabul edilir.

---

## ⚠️ KRİTİK KURALLAR — YAPILMAMASI GEREKENLER

Bu bölüm, önceki konuşmalarda yapılan hataların tekrarını önlemek için oluşturulmuştur.
**Bunları mutlaka oku ve asla ihlal etme.**

### 0. 🏆 ALTIN KURAL: Studio Her Zaman Üstüne Yazar — Hardcoded Yapı KESİNLİKLE Yasaktır!

> **"Eğer Studio'da girilen değeri sistem görmüyorsa / yansıtmıyorsa, kod hardcoded'dır ve bu kesinlikle istenmeyen bir durumdur!"**

- **Studio Her Zaman Önceliklidir**: Studio panelinden girilen her değer (`props.xxx`), koddaki her türlü varsayılanın ve yapının **üzerine yazabilmelidir** (Studio overrides everything).
- **Sıfır Hardcoded Metin/Link**: Bileşenin JSX yapısında ekranda görünen **hiçbir metin, link, buton etiketi, görsel URL'i veya başlık koda statik (hardcoded) olarak gömülü kalamaz**.
- **Varsayılanlar (Fallback) Sadece Emniyet Kemeridir**: Koddaki fallback/default değerler sadece Studio'dan henüz bir değer atanmadığında (ilk kurulum/boş durum) sayfanın çökmemesi içindir. Studio'dan bir değer girildiği anda kod geriye çekilmeli ve Studio değeri basılmalıdır.
- **Teşhis (Debug) Prensibi**: Eğer panelden bir metni değiştirdiğinde sitede değişmiyorsa veya eski metin kalmaya devam ediyorsa; **hemen kodda o değerin hardcoded bırakılıp bırakılmadığını veya bir prop'un JSX'e bağlanmayıp unutulduğunu kontrol et.**

### 0.0.1 Görsel Yapıyı ve Stilleri Koruma — Refactor Tasarım Yenilemesi Değildir

Studio prop refactor'ı mevcut component'ın tasarımını yeniden yapma izni vermez.
Kullanıcı açıkça görsel/tasarım değişikliği istemedikçe mevcut JSX/DOM hiyerarşisini,
markup'ı, class adlarını, renderer/component seçimini, accordion/menu etkileşimini,
boşlukları, tipografiyi, renk varsayılanlarını, animasyonları, breakpoint'leri ve responsive
davranışı aynen koru.

- Prop'ları mevcut render yoluna bağla; aynı UI'ı yeniden yazmak, özel markup üretmek veya
  paylaşılan renderer'ı component'a özel renderer ile değiştirmek yerine mevcut renderer'ı
  kullan.
- CSS'i yeniden yazma, yeniden biçimlendirme veya görünüm "düzeltmesi" yapma. CSS değişikliği
  yalnızca yeni bir prop/toggle'ın mevcut tasarım içinde çalışması için gerçekten zorunluysa
  eklenebilir; mevcut değerleri, selector'ları ve responsive kuralları koruyan en küçük,
  additive değişiklik olmalıdır.
- Mevcut CSS selector'ları ile markup arasında uyumsuzluk fark edersen bunu tasarım
  değiştirerek çözme. Önce hangi render yolunun gerçek/aktif olduğunu doğrula; mevcut
  renderer ve görünümü koruyup prop'ları o yola bağla. Uyumsuzluk güvenli biçimde yalnızca
  prop wiring ile çözülemiyorsa dur ve kullanıcıdan onay al.
- UI davranışını veya yapısını etkileyen belirsiz bir karar varsa varsayım yapma. İlgisiz
  layout/template dosyalarını değiştirme ve bir component'ın görünümünü başka component'tan
  kopyalama.
- Düzenlemeden önce hedef component'ın markup/CSS diff'ini incele; tamamlandığında tasarım
  dosyalarının gereksiz yere değişmediğini doğrula.

### 0.1 Görünen Metin Props'larında Sayfadaki İçeriği Varsayılan Yap

Bir `TEXT` veya `RICH_TEXT` prop'u sayfada görünen bir başlık, açıklama, etiket, kart metni,
buton yazısı, teknik özellik, erişilebilirlik metni ya da başka bir kullanıcı içeriğini
kontrol ediyorsa, `defaultValue` mevcut sayfada o alanda görünen içeriğin aynısı olmalıdır.
Refactor sırasında bu alanları boş bırakma, genel bir yer tutucu yazma veya mevcut metni
özetleyip değiştirme. Amaç Studio alanı ilk kez açıldığında sayfada görünen metnin kaybolmaması
ve alanın merchant'a hangi gerçek içeriği yönettiğini göstermesidir.

- Her görünür metin prop'u için mevcut JSX/render fallback'inden ve mümkünse mevcut sayfa
  görünümünden doğru başlangıç metnini belirle. Parçalı başlıklarda her prop'a yalnızca o
  prop'un kontrol ettiği mevcut metin parçasını yaz.
- `RICH_TEXT` varsayılanında mevcut vurguların, bağlantıların ve satır sonlarının gerekli
  HTML'ini koru; `TEXT` alanına HTML koyma.
- Locale'a göre değişen metinlerde temel prop'un varsayılanı mevcut Türkçe içeriği, `*En`
  prop'un varsayılanı aynı alanın gerçek İngilizce karşılığı olmalıdır. Türkçe metni İngilizce
  varsayılan olarak kopyalama.
- Boş `defaultValue` yalnızca metin gerçekten opsiyonelse ve boşken arayüzde görünmemesi
  tasarlanmışsa kabul edilebilir. Mevcut görünür metin boş olamaz; gizleme için metin alanını
  temizlemek yerine explicit `BOOLEAN` toggle kullan.
- Metnin mevcut hali kaynak koddan, placement değerinden veya erişilebilir görünümden
  belirlenemiyorsa tahmin ederek boş bırakma; analizi tamamlamak için gereken bilgiyi iste.

`defaultValue` yalnızca component schema'sının yeni veya varsayılan placement'lar için
başlangıç değeridir. Mevcut placement'ta kayıtlı boş prop değeri schema varsayılanını
geçersiz kılabilir. Kullanıcı mevcut Studio placement'ını da onarmayı istiyorsa önce canlı
değerleri oku, sonra yalnızca boş ve ilgili metin alanlarını gerçek mevcut sayfa içeriğiyle
doldur ve yeniden oku. Sadece schema varsayılanını güncellediysen mevcut placement içeriği de
düzeldiğini varsayma veya raporlama.

### 0.1.1 ÖNEMLİ: Görünen RICH_TEXT Alanlarını Boş Bırakma

Her görünür `RICH_TEXT`/`TEXT` prop'un varsayılanını config mutation'ından sonra tek tek
denetle. JSX/render fallback'inde görünen değer, schema `defaultValue`'sunda da aynı içerikle
bulunmalı; özellikle üst etiket, numara, başlık parçaları ve kısa kart etiketlerini atlama.
Örneğin `reason1Eyebrow` boş bırakılamaz: Türkçe varsayılanı `SEBEP 01`, İngilizce karşılığı
`REASON 01` olmalıdır. Bir kontrol listesi veya toplu CLI komutu çalıştırılmış olması bu
alanların doğru doldurulduğunu kanıtlamaz.

Schema varsayılanını ve mevcut Studio placement değerini ayrı kontroller olarak ele al:

- Schema audit'inde görünen her `TEXT`/`RICH_TEXT` alanının `defaultValue` değerinin boş
  olmadığını doğrula. Bilerek boş bırakılması gereken gerçek opsiyonel metni açık bir toggle
  ile gizle; görünür metni boş default ile temsil etme.
- Mevcut placement'ın ekranda boş kaldığı bildirilirse `list_editor_pages` →
  `list_page_sections` → `get_section_values` ile doğru placement ve kayıtlı değeri oku.
  Dolu alanları koru; yalnızca boş ve render fallback'iyle doğrulanmış alanları doldur.
  Örneğin boş `reason1Eyebrow` değerini, mevcut içerik bu varsayılanı kullanıyorsa `SEBEP 01`
  olarak düzelt; İngilizce locale alanına `REASON 01` yaz.
- Yazdıktan sonra aynı placement değerini yeniden oku. Schema default'unu değiştirmek mevcut
  placement'taki boş override'ı doldurmaz. Editör bağlantısı yoksa placement'ı düzeltilmiş
  gibi raporlama; hangi katmanın doğrulanamadığını açıkça belirt.

### 0.1.2 Toplu Varsayılan Doldurmada Ürün ve Kategori Sayfaları

Kullanıcı proje genelindeki boş veya eksik prop varsayılanlarını doldurmayı istediğinde,
ürün ve kategori sayfalarına ait `TEXT`/`RICH_TEXT` prop'larını bu toplu işlemin dışında
tut. Buna ürün detay/içerik bileşenleri, ürün listeleri ve kategori landing/listing
bileşenleri; ayrıca `PRODUCT`, `PRODUCT_LIST`, ürün şablonu veya kategori preset'lerinden
gelen metinleri override eden alanlar dahildir.

- Bu alanların boş veya eksik `defaultValue` değerlerini toplu doldurma amacıyla değiştirme;
  ürün/kategori verisinden gelen mevcut render fallback'ini koru.
- Başka ürün veya kategoriler için yanlış olacak sabit metin, bağlantı ya da sahte örnek
  içerik üretme. Bu alanlar boş kalabilir ve toplu doldurma denetiminde eksik sayılmaz.
- Bu istisna ürün/kategori prop'larını bir ürün veya kategori bağlamında açıkça düzenleme
  isteğini engellemez; ancak bu durumda da yalnızca o bağlam için kaynakta veya placement'ta
  doğrulanmış gerçek değer kullanılmalıdır.

### 0.2 RICH_TEXT Araç Çubuğu Component Prop'u Değildir

`RICH_TEXT`, ikas Studio'da HTML/string içerik düzenleyicisidir ve kendi yerleşik araç
çubuğunu kullanır. `ikas.config.json` component prop şeması bu araç çubuğunun düğmelerini
component bazında eklemek, kaldırmak veya sıralamak için bir ayar sunmaz. Bu nedenle
toolbar düğmelerini `add-prop` ile eklemeye çalışma ve ikas tarafından desteklendiği
doğrulanmamış biçimlendirme kontrollerini varmış gibi raporlama. Kullanıcı farklı bir
araç çubuğu veya özel editör davranışı istiyorsa bunun mevcut ikas Studio editöründe
desteklendiğini ayrıca doğrula; destek yoksa component kodundan toolbar'ı değiştireceğini
vaat etme.


### 0.3 Görselleri Atlamadan Studio'dan Yönetilebilir Yap

Complete refactor sırasında component'taki her anlamlı görsel kaynağını ayrı ayrı
envanterle. JSX içindeki `<img>`/`<video>` kaynaklarını, inline HTML görsellerini, statik
asset importlarını, CDN URL'lerini ve CSS `background-image` değerlerini incele. Yalnızca
metin/renk prop'ları eklemek component'ı Studio-ready yapmaz.

- Sosyal medya ve ödeme logoları, küçük ikonlar ve marka işaretleri de görsel içeriktir;
  metin veya bağlantılarının düzenlenebilir olması, görsellerinin de düzenlenebilir olduğu
  anlamına gelmez. Bu parçaları atlama: kullanıcı açısından değiştirilmesi anlamlı olanları
  Studio'dan görseli değiştirilebilir hâle getir; bileşene göre uygun prop yapısını seç ve
  mevcut görünümü varsayılan olarak koru.
- Merchant'ın seçip değiştirmesi gereken her bağımsız görsel için `IMAGE` prop'u ekle veya
  mevcut doğru `IMAGE` prop'unu render'a bağla. DisplayName Türkçe ve emoji prefix'li olsun
  (ör. `🖼️ Kart 1 Görseli`).
- Görsel canlı ürün/kategori/blog verisinden geliyorsa uygun dinamik prop türünü
  (`PRODUCT`, `PRODUCT_LIST`, `CATEGORY` vb.) ve o modelin resmi görsel helper'ını kullan.
  Dinamik kaynağa ek olarak merchant IMAGE override/fallback'i anlamlıysa ikisini de sun ve
  önceliği açık belirle (ör. dinamik ürün görseli → Studio IMAGE → mevcut asset fallback'i).
- `IMAGE` ve diğer dinamik prop tiplerine schema `defaultValue` yazma. Bundled asset mevcut
  tasarımı koruyan runtime fallback'i olabilir; Studio'dan görsel seçildiğinde seçilen görsel
  gerçekten render edilmelidir.
- Çok parçalı görsel kompozisyonunu tek kaynağa indirme. Her parça ayrı değiştirilebilmeli
  ise her biri için ayrı `IMAGE` prop'u veya desteklenen image-list yapısı kullan.
- Anlamlı görsellerin alt metnini de denetle; gerekiyorsa düzenlenebilir `TEXT` alt metni ve
  locale karşılığı için `*En` alanı ekle. Dekoratif görsellerde boş alt metnini ve
  `aria-hidden` davranışını koru.
- Yeni slotu görsel kaynağı yokken boş render etme. Dinamik kaynak veya Studio IMAGE
  fallback'inden en az biri bulunmadan slot görünür olmamalı.

### Görsel İçeriği ile Görünüm Ayarlarını Ayır

Prop gruplarını prop'un teknik türüne göre değil, merchant'ın değiştirdiği anlama göre
sınıflandır. Bir kartın veya ürünün görsel kaynağı (`IMAGE`), görsel alternatif metni
ve varsa o görsele ait içerik bilgileri, ilgili kartın/içerik öğesinin grubunda kalır.
Görselin `width`, `height`, `fit`, X/Y konumu, opacity ve filtreleri gibi sunum
kontrolleri ise `🎨 Görünüm ve Renkler` veya uygun görsel ayarları alt grubunda yer alır.

Bu nedenle yalnızca prop tipi `IMAGE` diye görsel kaynağını görünüm grubuna taşıma.
Örneğin ürün kartında ürün adı, açıklaması ve teknik değerleriyle birlikte ürün görseli
ve alt metni de kartın içeriğidir; görsel boyutlandırma ve efekt kontrolleri kart
içeriğinden ayrı görünüm ayarlarıdır.

Refactor sonunda render edilen her görsel kaynağını prop envanteriyle çapraz kontrol et.
Her anlamlı görsel için kaynak prop'u, öncelik kuralı ve alt metin durumu doğrulanmadan
görsel audit'ini tamamlandı sayma.

### 1. `text(value, fallback)` ile Gizleme YAPMAZ

İkas'ın `text()` fonksiyonu boş string döndürüldüğünde fallback kullanır.
Bu yüzden bir kullanıcı panelden metni sildiğinde eleman gizlenmez, fallback görünür.
**Bir elemanı gizlemek/göstermek için her zaman explicit `BOOLEAN` toggle kullan.**

```tsx
// ❌ YANLIŞ — metin silince fallback görünür, gizlenmiş olmaz
{text(props.myText, "Varsayılan metin")}

// ✅ DOĞRU — boolean toggle ile kontrol et
{props.showMyItem !== false && (
  <span>{text(props.myText, "Varsayılan metin")}</span>
)}
```

### 2. `groupId` Kullan, `propGroupId` DEĞİL

```json
// ❌ YANLIŞ
{ "name": "showX", "propGroupId": "myGroup" }

// ✅ DOĞRU
{ "name": "showX", "groupId": "myGroup" }
```

### 3. Mevcut Elemanlar için `!== false`, Yeni Slotlar için `=== true`

- **Mevcut elemanları** (şu an görünen) gizlerken: `props.showX !== false`
  → `defaultValue: true` ile geriye dönük uyumlu (panelde toggle yokken de çalışır)
- **Yeni slot yuvaları** (şu an görünmeyen, eklenecek) için: `props.showX === true` veya `props.showX`
  → `defaultValue: false` ile başlangıçta gizli

```tsx
// Mevcut item — varsayılan olarak GÖRÜNSİN
  title: text(props.product1Title, defaults.title),
  href: props.product1Href || defaults.href,
}] : [])

// Yeni slot — varsayılan olarak GİZLİ
...(props.showProduct7 ? [{
  title: text(props.product7Title, ""),
  href: props.product7Href || "",
}] : [])
```
aksi halde `require()` hata verir.

### 5. `ikas theme dev` Restart Zorunluluğu

`ikas.config.json` değişikliklerinden sonra dev server **mutlaka yeniden başlatılmalıdır**.
Terminal'e `R` tuşu göndererek hot-restart yapılabilir veya process kill edip
`ikas theme dev` tekrar çalıştırılabilir.

#### Canlı Prop Değerleri için Yerel Server

Mevcut placement prop değerlerini okumak veya güncellemek için admin/storefront
tarayıcı sayfasını açma; bu işlem MCP live-editor araçlarıyla yapılır.

1. Workspace kökünde `ikas theme dev` başlat ve açık bırak. Komut yerel component server'ı
   ve editor tünelini kullanır; `5201` doluysa ikinci bir component server başlatma.
2. MCP ile önce `list_editor_pages`, ardından hedef sayfa için `list_page_sections` çağır.
3. Yalnızca bu araçlar yerleşimleri ve değerleri döndürdükten sonra `get_section_values`
   ile mevcut prop değerlerini oku ve boş olan istenen alanları güncelle.
4. MCP sayfa/değer çağrısı başarısızsa, tarayıcıya gitmeden yalnızca `ikas theme dev`'i
   `R` ile yeniden başlat ve MCP çağrısını tekrar dene. Hâlâ veri dönmüyorsa tahmini değer
   yazma; hangi adımın başarısız olduğunu bildir.

### 6. Gereksiz Prop Ekleme — Panel Temiz Tutulmalı

Panelde gereksiz prop bolluğu yaratma. Her bölüm/sekme/yapı için yalnızca gerekli minimum
prop sayısını ekle. `showX` togglelarını akıllıca kullan:
- Birbirine bağlı 3-4 alt prop varsa, tek bir `showX` toggle ile hepsini yönet
- Her bir alt-prop için ayrı toggle EKLEME

### 7. Var Olan Yorum ve JSDoc'ları Silme

Mevcut kodda yer alan yorum satırları ve JSDoc açıklamalarını ASLA silme.
Yalnızca kendi eklediğin koda ait yorumlar ekleyebilirsin.

### 8. İzin Verilen Prop Tipleri

İkas engine yalnızca şu prop tiplerini destekler:
```
TEXT, RICH_TEXT, NUMBER, BOOLEAN, COLOR, IMAGE, SVG,
ENUM, PRODUCT_LIST, LIST_OF_LINK, COMPONENT_LIST
```
`LIST_OF_LINK` sadece title+URL destekler, description+icon DESTEKLEMEz.
Bu yüzden zengin içerikli (ikon+başlık+açıklama) listeler için


Projede başka bileşenlerde önceden var olan TypeScript hataları olabilir.
Doğrulama yaparken **sadece üzerinde çalıştığın bileşeni filtrele**:

```bash
npx tsc --noEmit 2>&1 | findstr /I "ThreeMashHeader"
```

### 10. COMPONENT_LIST Header/Sticky Bileşenlerde Kullanılmaz

`COMPONENT_LIST` tipi Header gibi sticky/compact layout gerektiren bileşenlerde
düzgün çalışmaz çünkü ikas engine onu tam sayfa genişliğinde render eder.

### 10.1 Slot Kapasitesi ve Uçtan Uca Prop Doğrulaması

Bir component'a eklenebilir kart, ürün, metrik veya başka bir slot eklemeden önce
component'ın gerçek layout kapasitesini belirle. Mevcut öğeleri ve yeni slotları ayrı
say; toplam kapasiteyi, masaüstü kolon sayısını ve tek kolona/başka düzene geçilen
breakpoint'i kaynak CSS'ten doğrula. Yakındaki site grid'lerini sabit üç kolon gibi
kullanıyorsa bu davranışı koru; sırf yeni slot eklendi diye bilinmeyen veya sınırsız
kapasite varsayma.

- Analiz çıktısında toplam kapasiteyi açık yaz: mevcut öğe sayısı + eklenebilir slot
  sayısı. Her yeni slotun `showX` toggle'ı `defaultValue: false` olmalıdır.
- Slot props'larını yalnızca config'e eklemek yeterli değildir. Her prop için şu zinciri
  doğrula: config şeması ve `groupId` → CLI ile üretilmiş TypeScript tipi → component'ın
  renderer'a ilettiği değer → renderer'ın aynı prop adını okuyup doğru görsel/ürün/metin/
  bağlantı davranışında kullanması.
- Bir slotu açıp içerik verdiğinde doğru konumda ve doğru locale'de render edildiğini;
  kapattığında DOM'dan çıktığını; gerekli görsel/ürün kaynağı yokken boş kart oluşmadığını
  kontrol et. IMAGE ve PRODUCT alternatifleri varsa her ikisini de ayrı ayrı dene ve
  öncelik sırasını doğrula.
- Shared renderer kullanan component'larda slot numara union'larını, conditional slot
  listesini, helper fallback'lerini ve `Props` tiplerini birlikte kontrol et. Prop adı
  sadece schema'da mevcut diye çalışıyor kabul etme.

`ThreeMashSolution` için doğrulanmış kapasite üç mevcut ürün kartı + üç opsiyonel ek kart
(4-6), toplam altı karttır. Renderer slot 6'yı tanımalı; ek kartların toggle'ları kapalı
başlamalıdır. `.tmr-products` masaüstünde üç kolon, 960px ve altında tek kolon kalır.
Bu component'ta slot eklerken bu kapasiteyi, breakpoint'i ve IMAGE/PRODUCT kaynaklarının
gerçekten renderer'a ulaştığını yeniden doğrula.

---

## ADIM ADIM PROSEDÜR

### Adım 0: Analiz — Bileşeni İncele

Herhangi bir değişiklik yapmadan önce bileşeni **analiz et**:

1. **`ikas.config.json`** içinde bileşenin kaydını bul:
   - `components[N]` → `name`, `entry`, `styles`, `props`, `propGroups`
   - Mevcut propsları listele
   - Mevcut propGroups hiyerarşisini çıkar

2. **`types.ts`** dosyasını oku → Mevcut TypeScript interface

3. **`index.tsx`** dosyasını oku → JSX yapısını ve hardcoded metinleri bul:
   - Hangi stringler panelden düzenlenebilir olmalı?
   - Hangi bölümler aç/kapa toggle almalı?
4. **`styles.css`** dosyasını oku → Toggle olduğunda CSS düzenleme gerekir mi?

**Analiz çıktısı şu formatta olmalı:**

```
📦 Bileşen: ThreeMashXxx
📝 Düzenlenebilir Metinler: [liste]
👁️ Gizlenebilir Bölümler: [liste]
➕ Eklenebilir Slotlar: [liste]
🔧 Tahmini Prop Sayısı: N
🧱 Toplam Öğe Kapasitesi: N (mevcut + opsiyonel slotlar)
📐 Responsive Grid: [masaüstü kolon sayısı] → [breakpoint ve dar ekran düzeni]
```

---

### Adım 1: Config Katmanı — `ikas.config.json`

Bileşenin `components[N]` nesnesine yeni propslar ve propGroups ekle.

#### Prop Tanımlama Şablonu

```json
{
  "name": "camelCasePropName",
  "displayName": "🏷️ Kullanıcıya Görünen Türkçe İsim",
  "type": "RICH_TEXT | TEXT | BOOLEAN | NUMBER | IMAGE | COLOR | SVG | ENUM",
  "required": false,
  "defaultValue": "varsayılan değer",
  "description": "Kullanıcıya açıklama (opsiyonel, uzun açıklamalar için)",
  "groupId": "hangiGrupAltinda"
}
```
---

## TAM REFACTOR STANDARDI

Bu skill, tüm site component'larının prop yapısını standartlaştırır. Amaç mevcut
component'a birkaç prop eklemek değil; component'ın Studio schema'sını analiz edip
gereksiz prop'ları temizlemek, doğru prop'ları korumak ve yapıyı baştan kurmaktır.

### 11. Component Schema'sını Baştan Kur

- Mevcut prop, propGroup ve JSX kullanımını önce eksiksiz listele.
- Kullanılmayan veya eski davranışa ait prop'ları CLI ile sil.
- Complete refactor'da eski propGroup ağacını olduğu gibi bırakıp üstüne yeni gruplar ekleme veya eski ID/hiyerarşiyi kolaylık olsun diye taşıma. Önce eski alt grupları ve ana grupları CLI ile kaldır; sonra yeni ağacı canonical sırada yeniden oluştur ve korunan tüm prop'ları yeni gruplara ata. Kullanılan/doğru prop'ları koru, eski grup yapısını koruma.
- Component'ın gerçek davranışı için gerekli mevcut prop'ları silme; canonical gruplara
  taşı ve displayName'lerini standardize et.
- Yeni prop yalnızca gerçekten eksik bir kullanıcı kontrolü varsa eklenir.
- Config, generated `types.ts` ve JSX prop isimleri birebir eşleşmelidir.

### 12. Canonical Prop Group Standardı

Prop gruplarını Header'ın Studio prop panelindeki ilk sayfa düzenini yalnızca görsel ve
organizasyonel referans alarak kur: kısa, anlaşılır, emoji prefix'li grup adları kullan.
Bu, Header'ın tasarımını, içerik modelini veya prop ağacını diğer bileşenlere kopyalama
talimatı değildir. Her section/component kendi görsel yapısını, içerik ihtiyaçlarını ve
alanlarını korur; ortak olan yalnızca anlaşılır prop gruplama ve panel görünümü ilkeleridir.

Grup adları merchant'a component'ın ne yaptığını ve grubun hangi alanı yönettiğini doğrudan
anlatmalıdır. `🧮 Bileşene Özel Veri`, `🎨 Ayarlar`, `📦 İçerik` gibi tek başına belirsiz
başlıklar kullanma; gerçek işlevi söyle. Örneğin `Anasayfa Giriş + Yatırım Getirisi`
component'ındaki hesap girdileri `🧮 Tasarruf Hesaplayıcısı`, giriş başlığı `📝 Anasayfa
Başlığı`, sonuç değerleri `📊 Tasarruf Metrikleri` olarak adlandırılabilir. Her grup adını
component'ın adı ve gerçek prop'larıyla birlikte okuyan merchant, grubun neyi değiştirdiğini
anlayabilmelidir.

Görünürlük toggle'larını içeren grubu yalnızca içeriğin türüne göre adlandırma. `👁️ Alt
Bölümler` gibi başlıklar kontrolün ne yaptığını belirsiz bırakır; `👁️ Görünürlük ve Gösterim`
veya component'ın davranışını daha net anlatan eşdeğer bir ad kullan. Alt grup adı da
`reason1Eyebrow` gibi içerik prop'larının kategorisiymiş izlenimi vermemelidir.

Bu liste önerilen bir başlangıç standardıdır; her component için zorunlu grup listesi,
zorunlu grup adı veya zorunlu grup sırası değildir. Önce hedef component'ın gerçek JSX
yapısını, veri kaynaklarını ve responsive ihtiyaçlarını analiz et. Sonra yalnızca o
component'ın prop'larını en anlaşılır şekilde sınıflandıran grupları oluştur.

Component'ın yapısı gerektiriyorsa bu listedeki grupları kaldırabilir, birleştirebilir,
yeniden adlandırabilir veya yeni component'a özgü gruplar ekleyebilirsin. Örneğin bir
ürün detay section'ında `🧮 Ürün Verisi`, bir hesaplama section'ında `🧮 Hesaplama
Parametreleri`, bir FAQ section'ında `❓ Sorular` veya bir medya section'ında `🖼️ Medya
İçeriği` daha doğru olabilir. Grup sırası, o component'ın Studio panelinde en anlaşılır
akışı sağlayacak şekilde `propGroups` dizisiyle belirlenir.

Bir grupta o component'a ait prop yoksa grup oluşturma. Başka bir component'ın grup
adlarını, alt gruplarını, prop listesini veya yerleşimini doğrudan kopyalama. Ortak
standardın özü; kısa, anlaşılır, emoji prefix'li adlar, mantıklı hiyerarşi, descriptionsız
prop group nesneleri ve component'a uygun panel düzenidir.

### Ortak Prop Kategorileri ve Sabit Adlandırma

Her refactor'da aşağıdaki ortak işlevleri özellikle denetle. İlgili prop'lar varsa kategori
adlarını tüm component'larda aynı kullan; eşdeğer yapıya göre `Görünürlük`, `Görünürlük
Kontrolleri`, `Responsive Düzen`, `Bilgisayar / Mobil Düzen` gibi alternatifler türetme:

- Görünürlük toggle'ları: `👁️ Görünürlük`. İlgili toggle'ları doğrudan bu tek gruba ata;
  `Alt Bölüm Görünürlüğü` gibi ikinci bir görünürlük alt kategorisi oluşturma.
- Yalnızca renk prop'ları: `🎨 Renkler`. Aynı grupta renk dışı görünüm kontrolleri de varsa
  `🎨 Görünüm ve Renkler` adını kullan veya farklı işlevleri ayrı, anlamlı kategorilere ayır.
  Gereksiz yere uzun grup adları seçme.
- Masaüstü/mobil sayfa ölçüsü ve boşluk prop'ları (`width`, `height`, `padding`, `margin`):
  ortak ana grup adı `📐 Sayfa Düzeni`; alt grup adları her component'ta aynı olacak şekilde
  `💻 Bilgisayar` ve `📱 Mobil` olmalıdır. Grup ID'leri de mümkün olduğunca `pageLayout`,
  `desktopLayout`, `mobileLayout` olarak tutarlı kullanılsın.

Bu adlandırma standardı ilgili özellik mevcut olduğunda zorunludur; boş grup üretmek veya
yalnızca kategoriyi doldurmak için yeni prop eklemek zorunlu değildir. Responsive CSS'in
bulunması tek başına Studio'da düzenlenebilir sayfa düzeni prop'u olduğu anlamına gelmez.
Ürün görseli genişliği, konumu ve efektleri gibi görsele özel kontroller `Sayfa Düzeni`
değil, görsel sunum grubunda kalır. Bir component'ta gerçek masaüstü/mobil sayfa düzeni
kontrolü yoksa `📐 Sayfa Düzeni` kategorisi ekleme; yeni kontrol eklemek gerekiyorsa önce
mevcut CSS davranışını koruyan, merchant için anlamlı değerleri belirle.

### Locale İçerikleri Grubu

Bir component'ta Türkçe ve İngilizce ayrı içerik düzenlenebiliyorsa, yalnızca o
component'ta gerçekten çevrilebilir kullanıcı metni bulunduğunda ilgili ana grubun
altına şu child group eklenir:

```json
{
  "id": "contentLocale",
  "name": "🌐 İngilizce İçerikleri"
}
```

Bu grup tüm component'lara körlemesine eklenmez. Locale'a göre değişen her kullanıcı
metni için Türkçe temel prop ile aynı anlamı taşıyan `*En` prop'u oluşturulur:

| Türkçe temel prop | İngilizce prop |
|---|---|
| `titleText` | `titleTextEn` |
| `descriptionHtml` | `descriptionHtmlEn` |
| `buttonText` | `buttonTextEn` |
| `referenceHtml` | `referenceHtmlEn` |

`*En` prop'u, Türkçe prop'un tipiyle aynı olmalıdır (`TEXT` veya `RICH_TEXT`).
DisplayName'ler Türkçe ve emoji prefix'li olmalıdır; örneğin `🌐 İngilizce Başlık
Metni`. İngilizce alan boşsa Türkçe Studio değeri İngilizce olarak basılmaz. Component'ın
mevcut İngilizce locale fallback'i kullanılmalı; yeni bir Türkçe fallback zinciri veya
aynı Türkçe metni İngilizce alana kopyalayan davranış eklenmemelidir.

Her `*En` prop'un `defaultValue` değeri anlamlı ve boş olmayan İngilizce içerik olmalıdır.
Yeni slot prop'larında da boş default kullanılmaz; slot kapalı başlasa bile açıldığında
görülecek açıklayıcı bir İngilizce başlangıç metni tanımlanır. Fallback mekanizması,
merchant'ın Studio'da alanı sonradan bilerek temizlemesi için güvenlik davranışıdır;
schema'yı boş default'larla bırakmak için kullanılmaz.

Runtime çözümleme sırası:

1. Türkçe locale'de temel prop kullanılır.
2. İngilizce locale'de dolu olan `*En` prop kullanılır.
3. `*En` boşsa mevcut İngilizce locale fallback mekanizması kullanılır.
4. Çözülmüş değer, render edilmeden önce mevcut HTML sanitizer ve güvenli link
   kurallarından geçirilir.

Locale prop'ları ana içerik prop'larından kopuk bir içerik modeli oluşturmaz; yalnızca
aynı component içindeki İngilizce Studio override alanlarıdır. Locale grubu ekleniyorsa
grup doğrulamasında child group'un gerçekten prop taşıdığı ve hiçbir `*En` prop'un
ungrouped kalmadığı kontrol edilmelidir.

### Mevcut Placement'larda İngilizce Değerleri Doldurma

`defaultValue`, component schema'sının varsayılanıdır; mevcut bir Studio placement'ında
kayıtlı boş prop değeri bu varsayılanı otomatik olarak devralmayabilir. Bu nedenle schema
ve generated types'in doğru olması, mevcut sayfadaki İngilizce alanların dolu olduğunu
kanıtlamaz.

İstenen sonuç mevcut Studio placement'larının da İngilizce içerik göstermesiyse, kod
refactor'ından ayrı olarak live editor'da şu read-before-write akışını uygula:

1. `list_editor_pages` ile hedef sayfanın `page_id` değerini bul.
2. `list_page_sections(page_id)` ile hedef component placement'ını ve onun `elementId`
  değerini doğrula. Component adı benzer diye başka placement seçme.
3. `get_section_values(page_id, element_ids)` ile güncel `propValues` değerlerini oku.
  `common` metadata varsa aşağıdaki ortak Header/Footer kuralını uygula.
4. Yalnızca istenen locale grubundaki boş veya hiç kaydedilmemiş `*En` prop'larını,
  kullanıcı tarafından istenen İngilizce içerik ya da ilgili schema `defaultValue`'larıyla
  doldur. Dolu İngilizce değerleri ve istenmeyen diğer prop'ları koru; Türkçe metni
  İngilizce prop'una kopyalama.
5. Birden fazla alan için `update_page_sections` ile batch yaz; tek alan için
  `update_section_prop` kullanılabilir. `TEXT` ve `RICH_TEXT` değerlerini
  `{ "value": "English text" }` şeklinde gönder.
6. `get_section_values` ile yeniden oku ve yalnızca hedeflenen alanların yazıldığını,
  istenen `*En` alanlarının artık boş olmadığını doğrula.

Header/Footer ortak (`common`) placement ise değerleri `get_section_values` ile önce
oku; yazım tema genelinde tüm sayfalara yansır. Yalnızca istenen İngilizce alanları
değiştir. Index sayfasındaki canonical placement yoksa yazım yapılamaz; placement
ekleme gerekip gerekmediğini ayrıca değerlendir. Live editor bağlantısı yoksa schema
default'larını mevcut placement'a yazılmış gibi raporlama; erişim engelini belirt ve
değerleri canlı editöre ulaşınca doldur.

### Placement Prop'larını Atlamadan Doldurma

Kullanıcı mevcut Studio placement'larındaki boş prop değerlerini doldurmayı istediğinde,
bu kontrol tüm istenen prop'lar için zorunludur; yalnızca locale alanlarına uygulanmaz.

1. Her hedef page ve component placement'ını `list_editor_pages` ve
  `list_page_sections` ile doğrula. Aynı component birden fazla kez yerleştirilmişse
  doğru `elementId` değerini teyit et; benzer isimli placement'ı tahmin ederek seçme.
2. Her hedef placement'ın mevcut prop değerlerini `get_section_values` ile oku. `common`
  metadata varsa Header/Footer ortak değerlerinin tema geneline yazıldığını hesaba kat.
3. Yazmadan önce bir manifest hazırla: her satırda `page_id`, `element_id`, prop adı,
  mevcut değer ve yazılacak değer bulunsun. Kullanıcının istediği tüm alanları manifestte
  say; dolu ve değiştirilmesi istenmeyen değerleri koru, kapalı/opsiyonel alanlara içerik
  uydurma.
4. Schema `defaultValue`'sunu mevcut placement değeriymiş gibi kullanma. Boş metin
  alanlarını kaynak/render fallback'inde veya mevcut sayfa içeriğinde doğrulanan gerçek
  metinle doldur. Locale alanlarında her dili kendi gerçek metniyle doldur.
5. Birden fazla değer için `update_page_sections`, tek değer için `update_section_prop`
  kullan; değer şekillerini prop türüne göre gönder.
6. Yazımdan sonra her placement'ı `get_section_values` ile yeniden oku. Manifestteki her
  hedef prop'un yazıldığını ve beklenen değere eşit olduğunu tek tek doğrula. İstenen,
  yazılan ve yeniden okunup doğrulanan prop sayıları eşit değilse görev tamamlanmış
  değildir; eksikleri düzeltip yeniden oku.
7. Sonuçta istenen, güncellenen, doğrulanan ve boş bırakılan prop sayılarını bildir; boş
  bırakılan her alanın nedenini belirt. Live editor/MCP erişimi yoksa yazma adımını
  tamamlanmış gibi raporlama ve tahmini değer gönderme.

1. `📝 İçerik` — başlık, açıklama, metin ve görseller
2. `🔗 Butonlar ve Linkler` — CTA metinleri ve URL'ler
3. `🧮 Bileşene Özel Veri` — hesap, ürün, kart veya domain verileri
4. `📊 Metrikler / Sonuçlar` — sonuç veya istatistik varsa
5. `🎨 Görünüm ve Renkler` — COLOR, SVG/IMAGE görünüm ayarları
6. `📐 Sayfa Düzeni` — gerçek masaüstü/mobil sayfa ölçüsü ve boşluk prop'ları varsa kullanılır
7. `👁️ Görünürlük ve Slotlar` — alt bölüm, mevcut item ve yeni slot toggle'ları

Grup adlarına `01`, `02` gibi sıra numaraları ekleme. Prop group nesnelerine `description` ekleme; eski açıklamaları da bırakma. Bir grup gerçekten gereksiz hale geldiyse tamamen kaldır. Alt gruplar yalnızca prop sayısı ve anlamlı kategori gerektiriyorsa oluşturulur; onlar da kısa, emoji prefix'li ve descriptionsız olur. Sıralamayı numaralı adlarla değil, ilgili component için seçilen grupların `propGroups` dizisindeki gerçek sırasıyla sağla.

Header'ın `Duyuru`, `Logo`, `Ürünler`, `Neden 3mash`, `Referanslar`, `Akademi`, `Arama`,
`Profil`, `Sepet` ve `Mobil Menü` grupları Header'a özeldir; diğer component'lara
kopyalanmaz. Diğer component'lar yalnızca kendi gerçek içeriklerine karşılık gelen ana
grupları kullanır; gereksiz boş grup oluşturmaz. Header'ın arama/cart/auth logic'i,
yerleşimi ve özel alan adları da başka component'lara taşınmaz.

### 13. Component Toggle Kuralı

- `showSection` veya `showComponent` ekleme. Component placement zaten Studio'dan silinebilir.
- Yalnızca component içindeki anlamlı alt bölümler için toggle kullan.
- Mevcut elemanlar `props.showX !== false` ile varsayılan açık kalır.
- Yeni slotlar `props.showX === true` ile varsayılan kapalı kalır.
- Yeni slot toggle açık olsa bile gerekli içerik yoksa boş kart/link render edilmez.

### 13.1 KRİTİK: Görünürlük Toggle'ını Gerçek Render Yolunda Uçtan Uca Doğrula

Bir BOOLEAN prop'un config'te bulunması veya JSX'te bir koşula yazılmış olması, toggle'ın
çalıştığını kanıtlamaz. Kullanıcının Studio'da değiştirdiği placement ile ekranda görünen
section farklı component'lardan geliyorsa, yanlış component'a eklenen toggle görünür içeriği
etkilemez. Özellikle ayrı bir "detay" / "içerik" section'ı ile tüm sayfayı oluşturan canlı
ürün renderer'ı birlikte kullanılıyorsa, toggle'ın hangi placement'a ait olduğunu varsayma.

> ⚠️ **UYARI:** Kaynak kod/config güncel olsa bile ikas Studio eski import veya yayın paketini
> çalıştırıyor olabilir; yeni oluşturulan `ikas-components.json` mevcut placement'a otomatik
> uygulanmış sayılmaz. Bu durumda toggle'lar güncel JSX'te doğru olsa bile çalışmıyor gibi
> görünür. Kaynak kod veya başarılı yerel derleme tek başına toggle'ın düzeldiğini kanıtlamaz.

Her görünürlük toggle'ı için şu zinciri gerçek aktif sayfa ve placement üzerinden izle ve
doğrula:

1. `ikas.config.json` içindeki component `id`, `entry` ve `BOOLEAN` prop adını bul; aynı
   `showX` adının başka component'ta olması onun bu section'ı kontrol ettiği anlamına gelmez.
2. Hedef sayfadaki gerçek placement'ı belirle. Gizlenecek DOM içeriğini hangi component
   üretiyorsa, toggle o component'ın Studio prop'undan okunmalı. Toggle başka bir section'a
   aitse değeri render eden component'a geçir veya kontrolü gerçek render eden component'ın
   prop'larına ekle. Component adına ya da görsel benzerliğe bakarak placement seçme.
3. Prop'u generated `types.ts`'den gerçek component girişine, varsa ara wrapper/data
   katmanlarına ve ortak renderer'a kadar takip et. Her sınırda aynı değerin kaybolmadan
   aktarıldığını doğrula.
4. En son renderer'ın ilgili alt bölümü `showX !== false` benzeri varsayılan-açık bir koşulla
   render dışı bıraktığını doğrula. Gizleme CSS class'ına veya yalnızca parent component'taki
   kullanılmayan bir koşula bırakılmamalı. Paylaşılan renderer'ın diğer çağıranları için
   prop opsiyonel olmalı ve değer verilmediğinde mevcut görünüm korunmalı.
5. Studio'da hedef placement'ta toggle'ı önce kapat, sonra aç. Kapalı durumda hedef içerik
   DOM'dan çıkmalı; açık durumda geri gelmeli. Yalnızca toggle'ın panelde görünmesi, config
   default'unun `false` olması veya TypeScript/build başarısı işlevsellik testi değildir.
6. Config değiştiyse dev server'ı yeniden başlat; preview'da doğru sayfa/placement'ı ve
   güncel prop değerini doğrula. Mevcut placement'taki kayıtlı `false` değerini schema
   `defaultValue` ile karıştırma.

Doğrulama raporunda her toggle'ın hangi component placement'ını kontrol ettiğini ve kapalı /
açık davranışının preview'da denendiğini belirt. Doğru placement'a veya preview'a erişilemiyorsa
toggle'ı çalışıyor diye raporlama; doğrulanamayan render sınırını açıkça belirt.

### 14. Sayfa Düzeni Grubu — Component'a Göre Uygula

Responsive ölçü ve boşluk kontrolü gerektiren section/component'ta bu ihtiyacı açıkça
ifade eden grup `📐 Sayfa Düzeni` olarak adlandırılır. Bu ad, masaüstü/mobil sayfa yerleşimi
kontrolleri olan tüm component'larda aynıdır; `Responsive Düzen`, `Responsive Ayarlar` veya
`💻 Bilgisayar / Mobil Düzen` gibi alternatif adlar kullanma. Component'ta böyle bir kontrol
gerçekten yoksa boş grup ekleme ve responsive CSS'i tek başına gerekçe sayma. Eski `02.
Mobile Düzen` gibi numaralı adlandırmaları taşıma.

Bu gruptaki alt gruplar ve prop'lar da dinamik seçilir. Örneğin yalnızca mobil padding
kontrolü gerekiyorsa masaüstü genişlik, yükseklik ve margin prop'larını kopyalama.

Grup altında, bileşenin gerçekten ihtiyaç duyduğu görünüm kontrollerini aşağıdaki aynı
adlandırılmış, descriptionsız alt gruplara ayır:

- `💻 Bilgisayar` — bilgisayar görünümündeki ölçü ve boşluk kontrolleri
- `📱 Mobil` — mobil görünümdeki ölçü ve boşluk kontrolleri

Gerektiğinde görünüm için `width`, `height`, `padding` ve `margin` kontrollerinin uygun
olanlarını ekle; her component'a otomatik olarak sekiz prop kopyalama. Bu prop'lar
`TEXT` tipinde olup CSS birimlerini (`px`, `%`, `rem`, `auto` gibi) destekleyebilir.
DisplayName'ler kısa, Türkçe ve emoji prefix'li olmalıdır.

Varsayılanları mevcut CSS davranışını koruyacak değerlerden üret; boş değerle mevcut ölçüleri ezme. Prop değerlerini CSS'e uygulamadan önce güvenli uzunluk/değer doğrulaması yap. Bilgisayar değerlerini varsayılan stiller olarak uygula, mobil değerleri mevcut breakpoint'lerde uygula. Bu kontroller mevcut grid, stack, breakpoint ve responsive logic'i bozmaz; yalnızca kök section/component ölçü ve boşluklarını Studio'dan düzenler.

### 15. Component'a Özel Logic'i Genelleştirme

Header'daki arama, sepet, müşteri auth, locale switch, anchor scroll, route alias,
cart loading/error ve hydration logic'leri Header'a özgüdür; diğer component'lara
kopyalanmaz. Her component kendi mevcut davranışını korur ve yalnızca kendi metin,
link, görsel, renk ve yapısal item'larını Studio props'una bağlar.

### 16. Tüm Component'lara Taşınabilecek Ortak Pattern'ler

- Mevcut item'lar ve yeni slotlar conditional spread ile ayrı yönetilir.
- Yeni slotlar boş içerikle render edilmez.
- IMAGE/SVG prop'u varsa kullanılır, yoksa güvenli fallback asset kullanılır.
- Linkler component'ın güvenli route helper'ı ve locale helper'ı üzerinden normalize edilir.
- Türkçe/İngilizce fallback'ler `tLocalized` veya `tProp` ile render zamanında çözülür.
- `aria-label`, alt text, loading, empty, error, login/logout ve yardımcı metinler de
  kullanıcıya görünen içeriktir; hardcoded bırakılmaz.
- Desktop ve mobile aynı içeriğin iki görünümü ise aynı prop kaynağını paylaşır.

### 17. Prop Görünümü Standardı

- Her displayName Türkçe, açık ve emoji prefix'li olmalıdır:
  `📝 Başlık Metni`, `🔗 Buton Linki`, `🔢 Varsayılan Vaka`, `🎨 Arka Plan Rengi`,
  `👁️ Alt Alanı Göster`, `🖼️ Logo Görseli`.
- Prop group adları Header'ın prop panelindeki örnek gibi kısa ve emoji prefix'li olmalı; grup adlarında sıra numarası (`01`, `02`) ve group `description` alanı bulunmamalıdır.
- `Work Min`, `Cost Step`, `Value`, `Enable Style` gibi teknik isimler panelde görünmez.
- Prop-level `description` yalnızca merchant'ın bilmesi gereken somut bilgi varsa eklenir: zorunlu veri/format, birim, geçerli min-max-step ilişkisi, başka bir prop'a bağımlılık, boş değer davranışı veya güvenli link/asset koşulu. Açıklama kısa ve uygulanabilir olmalı; gereksiz/genel açıklama yazma. `required: true` yalnızca boş değer runtime'da gerçekten geçersizse kullanılır; önemli bir kuralı sadece `required` bayrağına bırakma, gerekiyorsa prop açıklamasında da belirt.
- `propGroups` için `description` alanı kullanılmaz; bu kural, gerekli prop-level açıklamaları engellemez.
- Her prop geçerli bir groupId'ye sahip olmalıdır.
- Refactor sonunda `ungrouped = 0`, `duplicate prop names = 0`, `invalid groupId = 0`
  kontrolleri zorunludur.
- Bir grubun ideal boyutu 5-10 prop'tur; büyük gruplar anlamlı alt gruplara ayrılır.

### 18. CLI Değişiklik Güvenliği

- `ikas.config.json`, `types.ts`, `global-types.ts` ve `src/components/index.ts` elle
  düzenlenmez; prop/group mutation için ikas CLI kullanılır. Kullanıcı mevcut bileşenin
  Studio'da görünen adını değiştirmeyi açıkça isterse, aşağıdaki 18.1 bölümündeki sınırlı
  `name` alanı istisnası uygulanabilir.
- **Component kimliği sabittir:** Refactor sırasında mevcut component'ın `id`, `name`,
  `entry`, `styles` değerlerini, klasör adını veya export adını değiştirme. Kullanıcı
  açıkça yeniden adlandırma istemedikçe component adını değiştirme; component ID'sini
  hiçbir durumda yeniden üretme. Mevcut component'ı kaldırıp yeniden ekleme, `add-component`
  / `remove-component` komutlarını mevcut component üzerinde çalıştırma veya sırf generated
  dosyaları yenilemek için geçici component oluşturup silme. Bunlar ID/Studio placement
  bağını veya `src/components/index.ts` export yolunu bozabilir.
- Her CLI mutation grubundan önce ve sonra hedef component'ın `id`, `name`, `entry` ve
  `styles` alanlarının değişmediğini doğrula. Yalnızca kullanıcı açıkça görünen adı
  değiştirmeyi istemişse 18.1'deki dar `name` istisnası uygulanır; diğer kimlik/path
  alanları yine aynı kalmalıdır. CLI bir generated export'u, klasör yolunu veya component
  kaydını beklenmedik biçimde değiştirdiyse devam etme; önce değişikliğin nedenini incele ve
  yalnızca hedef component için geri döndürülebilir, güvenli kurtarma yolunu belirle. Başka
  bir component'ın adını/ID'sini değiştirerek veya geçici component ekleyip silerek
  düzeltmeye çalışma.
- Aynı config dosyasına yapılan CLI mutation komutları paralel çalıştırılmaz; sıralı
  çalıştırılır.
- Her mutation grubundan sonra config tekrar okunur ve children/groupId kaybı kontrol edilir.
- `--group` parametresi boş gönderilmez.
- DisplayName güncellemesi ve group taşıma ayrı, küçük ve doğrulanabilir adımlarda yapılır.

### 18.1 Studio'da Görünen Bileşen Adını Değiştirme

Kullanıcı "bileşenin adını Türkçe yap", "Studio'da görünen adını değiştir" veya eşdeğer
bir istek verdiğinde, önce Studio listesindeki görünen kayıt adını (`ikas.config.json`
içindeki component `name`) teknik kaynak adından ayır. Görünen ad; boşluk ve Türkçe
karakter içerebilir. Örneğin `ReferanslarSayfasiCozumOrtaklari` yerine
`Referanslar Sayfası Çözüm Ortakları` kullanılır. ASCII transliterasyonunu (`Cozum`,
`Sayfasi`, `IsAkisi`) Studio'da Türkçe ad gösterme çözümü olarak sunma.

Ad değişikliğinde aşağıdaki sıralı, kimliği koruyan yolu uygula:

1. `ikas-component config update-component --help` ile mevcut CLI desteğini kontrol et.
   CLI sürümünde yalnızca `isHeader` / `isFooter` güncellenebiliyor ve bileşen adı
   değiştirme seçeneği yoksa bu komutla adı değiştirmeye çalışma. `add-component` yeni ID üretir;
   mevcut kaydı silip yeniden eklemek Studio placement bağını koparabileceğinden yasaktır.
2. Değişiklik öncesi hedef kaydın `id`, `name`, `entry`, `styles` değerlerini ve ilgili
   paket girdisini kaydet. Hedefi ID ile bul; benzer isimli kaydı seçme.
3. Bileşen adını değiştirme CLI tarafından desteklenmiyorsa ve kullanıcı görünen adı açıkça
   istediyse, `ikas.config.json` için yukarıdaki dar istisnayı kullan: yalnızca hedef
   kaydın `name` alanını düzenle. `id`, `entry`, `styles`, prop'lar, klasör adı, kaynak
   dosya adı ve kaynak fonksiyon/export adı aynı kalmalıdır. Config'i silip yeniden
   oluşturma; `src/components/index.ts` dosyasını ad değişikliği amacıyla elle düzenleme.
4. Component'ın yayımlanmış paket girdisini de yeni `name` ile güncelle. Her component
   için ayrı geçici çıktı kullan: `npx ikas-component publish --component "<Yeni Görünen Ad>"
   --output "<geçici-json-yolu>"`. Varsayılan çıktı dosyasına tek component publish etmek,
   var olan çok bileşenli paketi tek girdili paketle ezebilir. Geçici çıktıları doğrula ve
   ana paketi yeniden kurarken özgün parent girdisi, diğer bileşenler, `sharedModules` ve
   `globalStyles` verilerini koru; yalnızca yeniden adlandırılan girdileri değiştir.
5. Her adımın ardından config ve paketi ID üzerinden kontrol et: `id`, `entry`, `styles`,
   prop sayısı ve teknik kaynak export'u değişmemiş olmalı; yalnızca Studio `name` değeri
   istenen Türkçe ad olmalı. Paket girdisinin adı ve ID'si config ile eşleşmeli, derlenmiş
   istemci/sunucu kodu ve CSS boş olmamalıdır.
6. Çok girdili paketin JSON yapısını, toplam kayıt sayısını, eski/yeni adları ve korunması
   gereken özgün ID'leri doğrulamadan Studio'ya aktarılmaya hazır olduğunu söyleme.
   Studio'da içe aktarma veya görünürlük denenmediyse bunu test edilmiş gibi raporlama.

Bu istisna yalnızca mevcut bileşenin görünen `name` alanı içindir; prop, propGroup veya
başka generated metadata'yı elle değiştirmek için kullanılamaz. CLI'nin ad değiştirme desteği
ileride eklenirse doğrudan CLI'yi tercih et ve yine her adımda kimlik/yol değişmezliğini
doğrula.

### 18.2 Birleşik Bileşeni Bağımsız Bölümlere Ayırma

Kullanıcı, tek bir component içinde birden fazla bağımsız sayfa bölümü bulunduğunu ve
bunların ayrı ayrı Studio'dan eklenebilmesi gerektiğini söylerse, yalnızca kullanıcı
ayırmayı istediğinde bu bölümleri bağımsız section component'larına dönüştür. Bir
component'ı kendiliğinden parçalama; önce hangi parçaların bağımsız yerleştirilebilir
olacağını mevcut JSX, veri akışı, stiller ve kullanıcının istediği sayfa yapısına göre
belirle.

Uygulama yöntemi:

1. Mevcut birleşik component'ın her görsel bölümünü ve render sırasını envanterle. Her
   bölümün JSX/render kaynağını, kullandığı prop'ları, locale/link/görsel yardımcılarını,
   CSS selector'larını ve responsive davranışını eşleştir. Bölümler arasındaki ortak
   yardımcıları ve gerçekten paylaşılan alt bileşenleri ayrıca belirle.
2. Her bağımsız bölüm için ayrı bir kayıtlı section ve ayrı klasör oluştur:
   `src/components/<TeknikBilesenAdi>/index.tsx`, `types.ts` ve `styles.css`.
   Bileşenleri mevcut proje standardına göre CLI ile kaydet; `types.ts` ve
   `src/components/index.ts` generated dosyalarını elle düzenleme. Teknik dosya/export
   adları geçerli PascalCase olmalı; Studio'da görünen ad gerekiyorsa 18.1'deki isim
   prosedürünü uygula.
3. Bölümün mevcut markup'ını ve stillerini olabildiğince aynen koruyup kendi section
   girişine taşı. Alt parçalar birden fazla section tarafından kullanılıyorsa
   `src/sub-components/<PaylasilanAltBilesen>/index.tsx` ve `styles.css` altında tut;
   düz `.tsx` dosyalarını component klasörlerine saçma. Ortak locale, güvenli link,
   görsel veya veri yardımcılarını tek yerde bırakıp mevcut davranışla kullan.
4. Her yeni section'ın prop şemasını kendi gerçek ihtiyaçlarına göre oluştur. Yalnızca
   ilgili bölümün kullandığı propları taşı; JSX'te erişilmeyen eski propları kopyalama.
   Yeni kayıtlarda bölüm başına propGroup, locale fallback'i, toggle ve erişilebilirlik
   davranışlarını skill'in ilgili kurallarına göre doğrula. İçerik veya görsel değerlerini
   çevreleyen sayfa/parent'tan otomatik olarak aldığını varsayma; her section tek başına
   yerleştirildiğinde de çalışmalıdır.
5. CSS'i bölümlere ayırırken selector'ları, sınıf adlarını, değerleri, breakpoint'leri ve
   DOM ilişkilerini koru. Aynı global selector birden fazla section'a sızıyorsa, yalnızca
   zorunlu en küçük scope değişikliğini yap ve önce/sonra görsel davranışı karşılaştır.
   Tasarım yenilemesi yapma.
6. Eski birleşik component'ı silme veya kaydını kaldırma; kullanıcı bunu açıkça istemedikçe
   mevcut placement'ların ve ID'nin çalışmasını koru. Yeni bağımsız section'lar yeni kayıt
   olarak ekleniyorsa bunların yeni ID alacağını bil; eski component ID'sini yeniden
   üretme veya yeni bölümler arasında keyfî biçimde paylaştırma. Kullanıcı eski kayıtların
   kaldırılmasını açıkça isterse, önce kaynak/config/paketin yedeğini al, etkilenecek
   placement-ID bağını açıkça değerlendir ve 18.1'deki adım adım kimlik denetimini uygula.
7. Çoklu Studio paketini üretirken yalnızca yeni kayıtları değil, korunması gereken eski
   kayıtları da dahil et. Tek section publish çıktısını doğrudan mevcut çoklu paketin
   üzerine yazma. Her yeni section'ı ayrı geçici çıktı olarak yayımla, sonra paket
   envelope'unu ve ortak verileri (`sharedModules`, `globalStyles`) koruyarak birleştir.
   Son pakette kayıt sayısını, her bileşenin `id`/`name`/props eşleşmesini, derlenmiş
   istemci/sunucu çıktısını ve CSS'i doğrula.
8. Her section'ı ayrı ayrı type-check/build/publish ile doğrula. Proje genelindeki
   `src/components/index.ts` kaynaklı önceden var olan hataları yeni section hatalarıyla
   karıştırma; ancak tam proje build'i başarısızsa tüm çözümü hatasız ilan etme. Studio
   import/preview yapılmadıysa bağımsız yerleştirme veya görünürlüğün orada test edildiğini
   iddia etme.

#### Örnek: `ThreeMashReferences` bölümlemesi

`ThreeMashReferences` içindeki beş bağımsız görsel bölüm, aşağıdaki ayrı section
girişlerine ayrıldı:

| Studio'da görünen ad | Teknik component/klasör adı |
|---|---|
| Referanslar Sayfası Giriş | `ReferanslarSayfasiGiris` |
| Referanslar Sayfası Referanslar | `ReferanslarSayfasiReferanslar` |
| Referanslar Sayfası Klinik Vaka | `ReferanslarSayfasiKlinikVaka` |
| Referanslar Sayfası Çözüm Ortakları | `ReferanslarSayfasiCozumOrtaklari` |
| Referanslar Sayfası İş Akışı | `ReferanslarSayfasiIsAkisi` |

Her bölüm `src/components/` altında ayrı klasör, giriş dosyası, generated prop tipi ve
stillerle kayıtlıdır. Bölümlerin mevcut iç renderer'ları ve ortak
`threeMashReferencesStandalone` yardımcı mantığı `src/sub-components/` ve `src/utils/`
katmanlarında paylaşılır; böylece beş ayrı section oluşurken özgün render davranışı,
locale/link/görsel yardımcıları ve responsive tasarım kopyalanıp farklılaştırılmaz. Bu
örnek yalnızca ayırma yöntemini açıklar; başka bir component'ın içerik modelini veya prop
ağacını şablon olarak kopyalama talimatı değildir.

### 19. Refactor Doğrulama Sırası

1. Config ve propGroup ağacını oku.
2. JSX hardcoded metin/link/görsel/aria/state string audit'i yap.
3. Gerekli prop'ları koru, gereksizleri sil, eksikleri ekle.
4. Prop group ve displayName'leri canonical standarda göre yeniden kur.
5. Generated types'i CLI'nin üretmesine izin ver.
6. JSX'i props, toggle ve slot pattern'lerine bağla.
7. CSS'i yalnızca yeni layout ihtiyacı varsa güncelle.
8. Ungrouped, duplicate ve invalid group kontrollerini çalıştır.
  - Canonical sıra, descriptionsız grup adları ve eski/boş grup kalmadığını da doğrula.
  - Responsive kontrol eklendiyse `📐 Sayfa Düzeni` grubunun yalnızca ilgili
    ölçü/boşluk prop'larını içerdiğini doğrula.
9. Component filtreli TypeScript kontrolünü çalıştır.
10. Config değiştiyse `ikas theme dev` restart et.
11. Görev mevcut placement'ları doldurmayı da içeriyorsa, `list_page_sections` →
    `get_section_values` → `update_page_sections` akışını uygula. Mevcut placement'ın
    boş override'larının schema `defaultValue`'sunu otomatik miras aldığını varsayma;
    yalnızca istenen boş `*En` değerlerini yaz, sonra tekrar okuyup doğrula. Common
    Header/Footer yazımlarının tema genelinde etkili olduğunu hesaba kat.
12. Studio preview'da desktop/mobile ve toggle davranışını test et.
13. Full build baseline hatalarını yeni hatalardan ayırarak raporla; baseline hata varsa
    component refactor'ını tamamen başarılı diye raporlama.

#### Prop Adlandırma Kuralları

| Kullanım | İsimlendirme | Tip | defaultValue |
|---|---|---|---|
| Mevcut alt bölüm toggle | `showBolumAdi` | BOOLEAN | `true` |
| Yeni slot toggle | `showSlotN` | BOOLEAN | `false` |
| Metin içeriği | `bolumAdiText` | RICH_TEXT | Mevcut hardcoded metin |
| URL / bağlantı | `bolumAdiHref` | TEXT | Mevcut hardcoded href |
| Görsel | `bolumAdiImageUrl` | IMAGE | `""` |
| Renk | `bolumAdiBgColor` | COLOR | Mevcut hardcoded renk |

#### DisplayName Kuralları

- Her zaman Türkçe yaz
- Emoji prefixi kullan: 👁️ (göster/gizle), ➕ (yeni ekle), 📝 (metin), 🔗 (link), 🖼️ (görsel), 🎨 (renk), ⚡ (vurgu)
- Mevcut elemanlar: `"👁️ {Eleman Adı}'nı Göster"`
- Yeni slotlar: `"➕ {Slot Adı}'yı Ekle / Göster"`

#### PropGroups Hiyerarşisi Şablonu

```json
"propGroups": [
  {
    "id": "anaGrupId",
    "name": "📦 Ana Grup Adı",
    "children": [
      {
        "id": "altGrupId",
        "name": "📌 Alt Grup Adı"
      }
    ]
  }
]
```

**Önemli**: Grup adlarına sıra numarası ekleme ve prop group nesnelerine `description` koyma. `propGroups` yapısı bileşen kaydının props dizisinden SONRA yer alır. İç içe `children` ile alt gruplar oluşturulur. Her prop'un `groupId`'si bu gruplardan birine referans vermelidir. Refactor sonunda eski/boş grup ve eski grup hiyerarşisi kalmamalıdır.

---

### Adım 2: Types Katmanı — `types.ts`

Her eklenen prop için TypeScript interface'e karşılık gelen property ekle.

```typescript
export interface Props {
  // ───── Mevcut proplar ─────
  // ... (dokunma, koru)

  // ───── Yeni eklenen proplar ─────

  /** Açıklama metni */
  showBannerSection?: boolean;
  bannerTitle?: string;
  bannerDescription?: string;
  bannerHref?: string;
  bannerBgColor?: string;
  bannerImageUrl?: IkasImage | null;
}
```

**Tip Eşlemeleri:**

| ikas.config.json type | TypeScript type |
|---|---|
| `TEXT` | `string` |
| `RICH_TEXT` | `string` |
| `NUMBER` | `number` |
| `BOOLEAN` | `boolean` |
| `COLOR` | `string` |
| `IMAGE` | `IkasImage \| null` |
| `SVG` | `string` |
| `ENUM` | ilgili enum type (import et) |
| `PRODUCT_LIST` | `IkasProductList` |

---

### Adım 3: Logic Katmanı — `index.tsx`

Hardcoded verileri props'tan okumaya dönüştür.

#### Pattern A: Basit Metin Değiştirme

```tsx
// ÖNCESİ (hardcoded)
<h2>Kliniğinizin Sessiz Kaybı</h2>

// SONRASI (prop'tan oku)
<h2>{text(props.sectionTitle, "Kliniğinizin Sessiz Kaybı")}</h2>
```

> **NOT**: `text()` fonksiyonu projenin `i18n` utils'inden gelir. Eğer bileşende
> `text()` yoksa, `tProp()` veya inline fallback kullan:
> ```tsx
> {props.sectionTitle || "Varsayılan Metin"}
> ```

#### Pattern B: Bölüm Toggle (Göster/Gizle)

```tsx
// Mevcut alt bölüm — varsayılan AÇIK
{props.showFeatureCard !== false && (
  <section className="my-section">
    {/* içerik */}
  </section>
)}

// Yeni slot — varsayılan KAPALI
{props.showExtraSection && (
  <section className="extra-section">
    {/* içerik */}
  </section>
)}
```

#### Pattern C: Conditional Spread ile Dinamik Liste

Bu pattern, Header'daki ürün listesi gibi dinamik diziler için kullanılır.
Mevcut hardcoded diziyi conditional spread ile değiştir:

```tsx
// ÖNCESİ
const items = [
  { title: "3D Yazıcılar", href: "/3d-yazicilar", icon: printerIcon },
  { title: "Yıkama & Kürleme", href: "/yikama-kurleme", icon: washIcon },
  { title: "Dental Reçineler", href: "/dental-recineler", icon: resinIcon },
];

// SONRASI
const defaults = getDefaultItems(); // Fallback verileri döner

const items = [
  // Mevcut item 1 — toggle ile kontrol
  ...(props.showItem1 !== false ? [{
    title: text(props.item1Title, defaults[0].title),
    description: text(props.item1Description, defaults[0].description),
    href: props.item1Href || defaults[0].href,
    icon: defaults[0].icon,
  }] : []),

  // Mevcut item 2
  ...(props.showItem2 !== false ? [{
    title: text(props.item2Title, defaults[1].title),
    href: props.item2Href || defaults[1].href,
    icon: defaults[1].icon,
  }] : []),

  // Mevcut item 3
  ...(props.showItem3 !== false ? [{
    title: text(props.item3Title, defaults[2].title),
    href: props.item3Href || defaults[2].href,
    icon: defaults[2].icon,
  }] : []),

  // ─── Genişletilmiş Slot Yuvaları ───
  // Yeni slot 4 — varsayılan KAPALI
  ...(props.showItem4 ? [{
    title: text(props.item4Title, ""),
    href: props.item4Href || "#",
    icon: defaultSlotIcon,
  }] : []),

  // Yeni slot 5 — varsayılan KAPALI
  ...(props.showItem5 ? [{
    title: text(props.item5Title, ""),
    href: props.item5Href || "#",
    icon: defaultSlotIcon,
  }] : []),
];
```

#### Pattern D: Görsel/İkon Override

```tsx
// Prop'tan custom görsel varsa kullan, yoksa varsayılan SVG/emoji
const iconSrc = props.item1IconImageUrl
  ? getDefaultSrc(props.item1IconImageUrl)
  : null;

{iconSrc ? (
  <img src={iconSrc} className="custom-icon" alt="" />
) : (
  <span className="default-icon"
    dangerouslySetInnerHTML={{ __html: defaultSvgIcon }}
  />
)}
```

---

### Adım 4: CSS Katmanı — `styles.css`

Toggle'larla eleman gizlendiğinde layout bozulmaması için CSS ayarlaması gerekebilir.

#### Yaygın Senaryolar:

1. **Grid/Flex item kaldırıldığında**:
```css
/* Feature card gizlendiğinde mega menu grid düzeni */
.mega-menu.has-no-feature {
  grid-template-columns: 1fr 1fr; /* 3 sütundan 2'ye düş */
}
```

2. **Genişletilmiş slotlar eklendiğinde**:
```css
/* Yeni ekstra item'lar için footer slot */
.products-footer-slot {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
```

3. **Responsive ayarlamalar**:
```css
@media (max-width: 900px) {
  .mega-menu.has-no-feature {
    grid-template-columns: 1fr;
  }
}
```

---

### Adım 5: Doğrulama

1. **TypeScript kontrolü** (sadece ilgili bileşeni filtrele):
   ```bash
   npx tsc --noEmit 2>&1 | findstr /I "ThreeMashBilesen"
   ```

2. **Dev server restart**:
   - `ikas theme dev` çalışıyorsa kill edip yeniden başlat
   - Veya terminal'e `R` tuşu gönder

3. **Tarayıcıda test**:
   - Bileşen hala normal görünüyor mu? (geriye dönük uyumluluk)
   - Panelde yeni proplar doğru gruplar altında görünüyor mu?
   - Toggle'lar çalışıyor mu?
   - Yeni slotlar aktifleştirildiğinde doğru render ediliyor mu?

---

## REFERANS: ThreeMashHeader Implementasyonu

ThreeMashHeader, bu skill'in referans implementasyonudur. Aşağıdaki dosyalar
detaylı inceleme için kullanılabilir:

- **Config**: `ikas.config.json` → `components[0]` (satır 7-1598)
- **Types**: `src/components/ThreeMashHeader/types.ts`
- **Logic**: `src/components/ThreeMashHeader/index.tsx`
- **Styles**: `src/components/ThreeMashHeader/styles.css`

### Header'da Uygulanan Yapı Özeti:

| Bölüm | Proplar | Toggle | Slot Sayısı |
|---|---|---|---|
| Duyuru Bandı | metin, link, highlight | `showAnnouncement` | — |
| Dil Seçici | bayrak görselleri, metinler | `showAnnouncementLangSwitch` | — |
| Logo | görsel, link, alt text, boyut/filter ayarları | — | — |
| Ürünler Menüsü (Sol Sütun) | 3 mevcut ürün + 2 slot (7,9) | `showProduct1-3`, `showProduct7,9` | 2 ek |
| Ürünler Menüsü (Sağ Sütun) | 3 mevcut ürün + 2 slot (8,10) | `showProduct4-6`, `showProduct8,10` | 2 ek |
| Öne Çıkan Kart | eyebrow, title, desc, cta, renk | `showProductsFeatureCard` | — |
| Alt Bar (Tüm Ürünler) | metin, link | `showAllProductsLink` | — |
| Neden 3mash Menüsü | 4 mevcut madde + 2 slot (5,6) | `showWhyMenu`, `showWhyItem1-6` | 2 ek |
| Referanslar | metin, link, sectionId | `showReferencesMenu` | — |
| Akademi | metin, link | `showAcademyMenu` | — |
| Arama | placeholder, link, product list, ikon | `showSearchButton` | — |
| Profil | panel desc, 5 link (text+href), login/logout text | `showProfileMenu` | — |
| Sepet | buton text, link, ikon | `showStorePanel` | — |
| Mobil Menü | 6 link (text+href), dil switch | `showMobile*` toggleları | — |

---

## PROPGROUPS ORGANİZASYONU PRENSİPLERİ

İkas panelinde propları düzenli tutmak için propGroups kullan:

1. **Ana gruplar** = Bu component'ın gerçek prop kategorileri; örneğin içerik, link, veri veya görünüm. Duyuru, Logo ve Ürünler yalnızca Header'a ait örneklerdir.
2. **Alt gruplar** (`children`) = Yalnızca bu component'ın kendi ana grubu altında anlamlı bir alt kategori oluşuyorsa kullanılır.
3. Emojiler ile görsel hiyerarşi oluştur
4. Her prop'un `groupId`'si bir gruba ait olmalı
5. Bir grupta 5-10 prop ideal, 15'ten fazla olmamalı

Aşağıdaki ağaç yalnızca Header'ın mevcut prop organizasyonunu açıklayan örnektir;
yeni bir component için kopyalanamaz. Yeni component'ın ağacı, Adım 0 analizinden
çıkan gerçek yapıya göre yeniden oluşturulur.

```
📢 Duyuru Bandı
  └── 🌐 Dil Seçenekleri
📦 Ürünler Menüsü
  ├── ⭐ Öne Çıkan Ürün Kartı
  ├── 🏭 Sol Sütun (Üretim)
  └── 🔬 Sağ Sütun (Tamamlayıcı)
💡 Neden 3mash
  ├── 📌 Madde 1
  ├── 📌 Madde 2
  └── ➕ Madde 5 (Yeni Ekle)
```

---

## SONRAKİ BİLEŞENLER İÇİN KONTROL LİSTESİ

Yeni bir bileşeni Studio-Ready yaparken bu checklisteyi takip et:

- [ ] **Adım 0**: Bileşeni analiz et — hardcoded metinleri, gizlenebilir bölümleri, eklenebilir slotları belirle
- [ ] **Adım 1**: `ikas.config.json`'a props + propGroups ekle
- [ ] **Adım 2**: `types.ts`'ye TypeScript interface güncelle
- [ ] **Adım 3**: `index.tsx`'te hardcoded → prop dönüşümlerini yap (Sıfır hardcoded metin kuralı!)
- [ ] **Adım 4**: `styles.css`'te toggle durumları için CSS ekle (gerekirse)
- [ ] Mevcut placement'lar da doldurulacaksa live değerleri oku, sadece istenen boş `*En` prop'larını yaz ve yeniden okuyup doğrula; schema default'unun kayıtlı boş override'ı doldurduğunu varsayma.
- [ ] **PropGroup Temizliği**: Eski grup ağacını CLI ile kaldırıp canonical sırada yeniden kur; grup adlarında sıra numarası veya group `description` bırakma.
- [ ] **📐 Sayfa Düzeni**: Component'ın gerçek responsive ihtiyacı varsa yalnızca gerekli görünüm, ölçü ve boşluk prop'larını ekle; tüm component'larda `💻 Bilgisayar` ve `📱 Mobil` alt grup adlarını aynı tut; başka component'lardan gereksiz layout prop'larını kopyalama.
- [ ] **Adım 5**: TypeScript doğrulama + dev server restart + tarayıcı test
- [ ] **Studio Önceliği Doğrulaması**: Studio panelinden girilen değer arayüze anında yansıyor mu? Studio'yu ezen hiçbir hardcoded değer veya statik fallback kalmadı mı?
- [ ] **Görünürlük uçtan uca testi**: Her toggle gerçek aktif placement'tan renderer'a kadar izlenip Studio preview'da kapalı/açık denenerek DOM'dan çıkıp geri geldiği doğrulandı mı?
- [ ] Geriye dönük uyumluluk kontrolü (mevcut görünüm korunuyor mu?)


---

## SLOT YUVALARI STRATEJİSİ

Her bileşen tipi için önerilen slot sayısı:

| Bileşen Tipi | Mevcut Item | Ek Slot | Toplam Maks |
|---|---|---|---|
| Header Menü (liste) | 3-6 | +2-4 | ~10 |
| Footer Link Grubu | 4-8 | +2 | ~10 |
| FAQ Maddeleri | 5-10 | +3-5 | ~15 |
| Özellik Kartları | 3-6 | +2-3 | ~9 |
| Referans/Logo Grid | 6-12 | +4 | ~16 |
| Basit Text Section | 1-3 | 0 | ~3 |

**Kural**: Slot yuvaları makul tutulmalı. Kullanılmayacak 20 boş slot paneli kirletir.

---

## DOSYA DÜZENLEME SIRASI

**Her zaman bu sırayla düzenle:**

1. `ikas.config.json` — Config source of truth
2. `types.ts` — TypeScript interface (config ile uyumlu)
3. `index.tsx` — Logic (props okuma + conditional rendering)
4. `styles.css` — CSS adaptasyonları (gerekirse)
5. Dev server restart → Test

Bu sıra bozulursa TypeScript hataları ortaya çıkabilir çünkü `index.tsx`'te
henüz tanımlanmamış prop'lara referans verilmiş olur.
