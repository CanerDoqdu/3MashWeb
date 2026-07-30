# Reçine Ürün Sayfası Kaynak ve Uygulama Notları

Bu dosya, CRS reçine ürün sayfaları düzenlenirken bu sohbette verilen çalışma kurallarını ve yapılan hatalardan çıkarılan düzeltmeleri kaydetmek için oluşturuldu. Buradaki kurallar genelleme değil, bu konuşmada açıkça verilen talimatlara ve yaşanan örneklere dayanır.

## Temel Kural

Reçine ürün sayfaları düzenlenirken yalnızca kullanıcı tarafından verilen kaynaklar kullanılacak.

Kullanıcı genellikle iki kaynak verir:

- Canlı ürün URL'si: örnek `https://3mash.com/crs-tray-resin-olcu-kasigi-3d-yazici-recinesi`
- Yerel SingleFile HTML export dosyası: örnek `C:\Users\caner\Downloads\CRS Tray Resin – Ölçü Kaşığı 3D Yazıcı Reçinesi (DLP_LCD Uyumlu) (7_28_2026 4：56：27 PM).html`

Bu iki kaynağın dışına çıkılmayacak. Başka web siteleri, başka ürün sayfaları, önceki ürünlerden kopya içerikler veya tahmini içerikler kullanılmayacak.

Kullanıcı özellikle şunu belirtti:

- "başka source kullanmak yok"
- "sana verdiğim kaynakları kullan"
- "başka kaynaklara asla bakma"
- "eğer kaynağa erişemiyorsan bana söylemelisin"

Kaynakta bulunmayan bir bilgi varsa tahmin edilmeyecek. Kaynakta yoksa kullanıcıya bunun kaynakta bulunmadığı açıkça söylenecek.

## Proje ve ikas Studio Bağlamı

Bu repo bir ikas Code Components projesidir.

`CLAUDE.md` içindeki proje tanımı:

- Preact + TypeScript componentleri yazılıyor.
- Bu componentler e-commerce storefront için hazırlanıyor.
- ikas Code Components framework kullanılıyor.
- ikas Studio/editor içinde bu componentler section olarak sayfalara ekleniyor ve prop'lar sağ panelden yönetiliyor.
- Development sırasında ikas editor, dev server'a Dev Components panelinden bağlanıyor.

`README.ikas.md` içindeki bilgiye göre:

- `npm run dev` veya `npx ikas-component dev` dev server başlatır.
- Studio/editor dev server'a bağlanıp componentleri canlı düzenler.
- `npm run build` veya `pnpm build` production component output üretir.
- Build output `dist/` altına gider.

Bu konuşmadaki ekran görüntülerinde görülen Studio yapı taşları:

- Sol panelde ürün sayfasındaki section listesi var.
- Örnek section adları:
  - `Anasayfa Üst Menü`
  - `Tekli Ürün`
  - `Ürün İkili Özellik`
  - `Ürün Metrik Daireleri`
  - `Ürün Görsel Metin Detay`
  - `Ürünler Basic Slider`
  - `Ürün Video`
  - `Ürün Büyük Görsel`
  - `Ürün Açılır SSS`
  - `Ürün Kategori Carousel`
  - `Anasayfa Alt Bilgi`
- Sağ panelde component prop'ları ve ürün bazlı ayarlar var.
- Bu prop'lar Studio'dan girilebilir fakat bizim yaptığımız işte birçok ürün özel preset kod içinde slug bazlı uygulanıyor.

ikas Studio açısından kritik nokta:

- Bir component prop'u global kalırsa aynı section başka ürünlerde de etkilenebilir.
- Bu yüzden reçine içerikleri ürün/slug/current URL eşleşmesiyle ayrılmalı.
- "Sayfanın ürününü kullan" gibi Studio seçenekleri product prop'u ile eşleşmeye çalışır; ancak bazen current URL fallback'i de gerekir.
- Component preview ile canlı ürün sayfası aynı veri şekline sahip olmayabilir. Bu yüzden slug detection sadece `props.product` üzerine kurulursa kırılabilir.

## Repo Kuralları

`CLAUDE.md` içinde özellikle belirtilen kurallar:

- `ikas.config.json`, `types.ts`, `global-types.ts`, `src/components/index.ts` manuel düzenlenmeyecek.
- Bunlar auto-generated dosyalardır.
- Component veya prop ekleme/çıkarma gerekiyorsa ikas CLI kullanılacak.
- CLI prop veya enum kaldırınca component source dosyalarını temizlemez; source içinde eski identifier kalıp kalmadığı `rg` ile aranmalı.
- Root componentlerde `observer()` kullanılmaz; ikas runtime root componentleri zaten reactive yapar.
- `observer()` sadece `src/sub-components/` altındaki extracted sub-componentlerde kullanılmalıdır.
- Storefront API fonksiyonları veya model shape'leri tahmin edilmeyecek.
- Storefront API kullanmadan önce MCP doküman araçları kullanılmalı.
- Build sonunda `npx ikas-component build`, `npm run build` veya bu repoda kullanılan haliyle `pnpm build` çalıştırılmalı.

Bu reçine sayfası işleri çoğunlukla mevcut component source ve preset düzenlemesi olduğu için `ikas.config.json` ve `types.ts` dosyalarına manuel dokunulmamalıdır. Eğer yeni prop gerçekten gerekirse CLI ile eklenmeli, sonra source kodda kullanılmalıdır.

Bu konuşmada bazı auto-generated dosyalar zaten çalışma alanında modified görünüyordu. Bu dosyalar kullanıcı/önceki işlemlerden gelmiş olabilir; unrelated değişiklikler revert edilmeyecek.

## Source Nasıl Okunacak

Kaynak okuma işi aceleye getirilmeyecek. Her ürün için önce verilen URL ve verilen yerel HTML export birlikte doğrulanacak.

Yerel HTML SingleFile export olduğu için kaynak içerikler farklı yerlerde bulunabilir:

- `<script type=application/ld+json>` içinde ürün JSON-LD bilgisi.
- `FAQPage-script` içinde SSS soru-cevap JSON-LD bilgisi.
- Visible HTML section'ları içinde text ve layout.
- CSS custom property olarak `--sf-img-N`.
- Doğrudan `src=data:image/...;base64,...` şeklinde gömülü görsel.
- `background-image:var(--sf-img-N)` ile referanslanan görseller.
- YouTube iframe embed URL'leri.
- Product carousel veya cihaz logo görselleri gibi aynı sayfada ama ilgili section'a ait olmayan görseller.

Kaynak okurken yapılacak minimum kontroller:

1. Dosyanın doğru ürün olduğunu doğrula.
   - `<title>` kontrol edilir.
   - `og:url` veya canonical kontrol edilir.
   - Product JSON-LD `name`, `description`, `image` alanları kontrol edilir.
   - Kullanıcının verdiği URL slug ile dosyadaki slug eşleşmeli.

2. Product JSON-LD okunur.
   - `@type: Product`
   - `name`
   - `description`
   - `image` array
   - `offers`
   - varyant query'si varsa URL'den takip edilir.

3. Görsel sırası product JSON-LD'den alınır.
   - İlk galeri için `image` array sırası esas alınır.
   - Section görselleri için sadece product JSON-LD yeterli değildir; ilgili section içinde kullanılan görsel ayrıca bulunmalıdır.

4. Section id ve çevre text ile doğru bölüm bulunur.
   - Örneğin CRS Tray slider altı section `id=10`.
   - Başlık metniyle arama yapılır: `Ölçü Kaşığı Üretiminde Kontrollü ve Uyumlu Süreç`.
   - Section'ın başından sonuna kadar slice alınır.
   - Görsel o slice içinden çıkarılır.

5. Layout source'tan okunur.
   - `style=flex-direction:row-reverse` gibi değerler önemlidir.
   - DOM sırası da kontrol edilir.
   - Görsel solda mı sağda mı sadece tahminle belirlenmez.
   - Studio'daki mevcut görünüm değil, source layout karar verir.

6. SSS için visible HTML yetmez.
   - Accordion soru satırları görünür HTML'de olabilir.
   - Gerçek cevaplar sayfanın altında JSON-LD olarak yer alabilir.
   - `FAQPage-script`, `FAQPage`, `acceptedAnswer`, `mainEntity` aranmalıdır.
   - JSON parse edilebiliyorsa parse edilip `name` ve `acceptedAnswer.text` birebir alınmalıdır.

7. Video için bütün HTML aranır.
   - `youtube.com/embed/`
   - `youtube.com/watch?v=`
   - `youtu.be/`
   - `.mp4`
   - Component'teki slug mapping ile eşleştiği doğrulanır.

8. Metrikler için hem text hem görsel kontrol edilir.
   - Bazı metrik değerleri image olarak gömülü olabilir.
   - Sadece OCR/tahminle değil, mümkünse image dosyası çıkarılıp görsel olarak kontrol edilir.
   - CE badge gibi değer olmayan ikon metrikleri ayrıca ele alınır.

9. Uyumlu cihaz slider görselleri ile ürün section görselleri karıştırılmaz.
   - `marquee_image__image`, cihaz logoları ve carousel ürünleri sık görünür.
   - Bunlar slider altı detail section görseli değildir.

10. Kaynakta olmayan alanlar doldurulmaz.
    - Cevap yoksa uydurulmaz.
    - Renk yoksa swatch uydurulmaz.
    - Bar yoksa bar uydurulmaz.

## Komutlarla Kaynak Okuma Pratiği

PowerShell ortamında multiline heredoc her zaman Bash gibi çalışmaz. Bu yüzden Windows PowerShell'de Node komutları tek satır veya ayrı script dosyası ile çalıştırılmalı.

Kullanılabilecek okuma yöntemleri:

```powershell
rg -n "CRS Tray Resin nedir|FAQPage|acceptedAnswer|youtube.com/embed" "C:\Users\caner\Downloads\urun.html"
```

```powershell
node -e "const fs=require('fs'); const html=fs.readFileSync('C:/Users/caner/Downloads/source.html','utf8'); const i=html.indexOf('Sıkça Sorulan Sorular'); console.log(i);"
```

Section slice almak için:

```powershell
node -e "const fs=require('fs'); const html=fs.readFileSync('C:/Users/caner/Downloads/source.html','utf8'); const i=html.indexOf('SECTION BASLIGI'); const start=html.lastIndexOf('<div id=', i); const end=html.indexOf('<div id=', i + 1); console.log(html.slice(start,end));"
```

FAQ JSON-LD bulmak için:

```powershell
node -e "const fs=require('fs'); const html=fs.readFileSync('C:/Users/caner/Downloads/source.html','utf8'); const m=html.match(/<script id=FAQPage-script type=application\\/ld\\+json[^>]*>([\\s\\S]*?)<\\/script>/); console.log(m && m[1]);"
```

Video ID bulmak için:

```powershell
node -e "const fs=require('fs'); const html=fs.readFileSync('C:/Users/caner/Downloads/source.html','utf8'); console.log([...html.matchAll(/(?:youtube\\.com\\/embed\\/|youtube\\.com\\/watch\\?v=|youtu\\.be\\/)([A-Za-z0-9_-]+)/g)].map(m=>m[1]));"
```

Base64 section görseli çıkarmak için:

```powershell
node -e "const fs=require('fs'); const html=fs.readFileSync('C:/Users/caner/Downloads/source.html','utf8'); const i=html.indexOf('SECTION BASLIGI'); const start=html.lastIndexOf('<div id=', i); const end=html.indexOf('<div id=', i + 1); const s=html.slice(start,end); const m=s.match(/src=data:image\\/webp;base64,([^\\s>]+)/); if(m) fs.writeFileSync('tmp/section-image.webp', Buffer.from(m[1], 'base64')); console.log(m && m[1].length);"
```

Çıkarılan görsel mutlaka gözle kontrol edilmeli. Bu projede `view_image` ile local dosya kontrolü yapılabilir.

## Kopyalama Kuralları

Kopyalarken yapılmayacaklar:

- Kaynak metni kendi cümlelerinle yeniden yazma.
- Kaynakta olmayan teknik değer ekleme.
- Başka ürün SSS'ini kullanma.
- Başka ürün görselini kullanma.
- Önceki presetleri yeni ürüne otomatik taşıma.
- `-` ile bullet üretme; kaynakta `●` varsa `●`.
- Source'ta bar yoksa bar ekleme; source'ta bar varsa barları atlama.

Kopyalarken yapılacaklar:

- Başlık birebir alınır.
- `<b>` vurguları korunur.
- `<mark>` highlight gerekiyorsa kaynak vurgusuna göre uygulanır.
- Paragraflar ayrı tutulur.
- Bullet sırası korunur.
- Görsel konumu source layout'a göre korunur.
- Görsel URL'si veya base64 görsel source section'dan alınır.
- SSS cevapları varsa JSON-LD'den birebir alınır.
- Video ID kaynak iframe'den alınır.

Türkçe karakterler:

- Source'taki Türkçe karakterler korunur.
- Kod dosyasında mevcut encoding UTF-8 ise Türkçe metin kullanılabilir.
- Bazı kaynaklarda özel tire veya `385–405` gibi en dash olabilir. Daha önce bazı yerlerde ASCII `385-405` kullanıldı; birebir kaynak isteniyorsa source karakteri korunmalıdır.

Ancak kod edit kuralı olarak default ASCII tercih edilse de, bu repo zaten Türkçe user-facing text içeriyor. Ürün metinleri Türkçe olduğu için Türkçe karakterleri korumak gerekir.

## Görsel + Text Layout Probleminin Kök Sebebi

Bu konuşmada tekrar eden en büyük problem, image-text section'larında içerik doğru alınsa bile render edilen layout'un kaynak sayfaya yeterince benzememesiydi.

Kullanıcının verdiği CRS Tray örneğinde iki ekran vardı:

- Yapılan versiyon: görsel/text yaklaşık aynı bölgede ama font küçük, text blok sıkışık, görsel konumu ve ölçeği kaynakla aynı değil.
- Olması gereken kaynak versiyon: header altında daha aşağıdan başlayan section, solda daha kontrollü ölçekte görsel, sağda büyük başlık, daha büyük body font, daha geniş satır aralıkları ve bullet spacing.

Kök sebep sadece source okumak değil. Problem iki parçalı:

1. Kaynaktan sadece içerik ve görsel alınması.
2. Kaynak sayfanın render edilmiş layout metriklerinin kod değerlerine doğru çevrilmemesi.

Yani başlık, açıklama ve görsel bulunuyor; fakat şu değerler yeterince doğru ölçülmeden tahmini giriliyor:

- Section top/bottom padding.
- Container max width.
- Sol görsel kolon genişliği.
- Sağ text kolon genişliği.
- İki kolon arasındaki gap.
- Görsel frame genişliği/yüksekliği.
- Görselin kendi object-fit/object-position davranışı.
- Başlık font-size.
- Başlık line-height.
- Başlık font-weight.
- Body font-size.
- Body line-height.
- Paragraph gap.
- Subtitle margin.
- Bullet font-size.
- Bullet line-height.
- Bullet gap.
- Desktop/laptop breakpoint davranışı.
- Header yüksekliğinin sayfa görüntüsündeki section algısına etkisi.

Bu nedenle layout laptop ve PC çözünürlüklerinde tutmuyor. Çünkü sadece tek bir ekran görüntüsüne bakıp birkaç prop değeri değiştirmek yeterli olmuyor; kaynak sayfanın responsive metrikleri ölçülmeden `maxWidth`, `columnGap`, `imageColumnWidth`, `textColumnWidth`, `fontSize`, `lineHeight`, `paddingTop` gibi değerler tahmini kalıyor.

## Bu Problem Kaynaktan mı, Kodlamadan mı?

Bu problem çoğunlukla kodlama/layout çevirisi problemi.

Kaynakta içerik mevcut:

- HTML içinde başlık var.
- Açıklama var.
- Görsel var.
- Bullet list var.
- FAQ JSON-LD var.
- Video var.

Ancak HTML source tek başına "ekranda kaç px duruyor" bilgisini doğrudan vermez. SingleFile HTML'de class'lar, inline style'lar ve CSS var ama doğru sonucu görmek için render edilmiş sayfada computed style ve bounding box ölçülmelidir.

Yapılan hata:

- Source'tan text ve görsel çıkarıldı.
- Sonra mevcut component preset değerleri yaklaşık ayarlandı.
- Görsel biraz büyük/küçük veya yukarı/aşağı deneme yanılma ile oynatıldı.
- Fontlar da tahmini `28`, `13`, `17` gibi değerlerle ayarlandı.
- Kaynakta olması gereken desktop font/spacing değerleri ölçülmedi.

Doğru yaklaşım:

- Önce kaynak sayfa target viewport'ta render edilir.
- Aynı viewport'ta bizim Studio/preview render edilir.
- İki görüntüde aynı section için bounding box ölçülür.
- Sonra değerler bu ölçülere göre kodlanır.

## Image-Text Section İçin Zorunlu Ölçüm Checklist'i

Bir görsel + text section kopyalanırken sadece DOM içeriği değil, render metrikleri de alınmalı.

Kaynak sayfada ölçülecek değerler:

1. Viewport ölçüsü.
   - Örneğin 1440 px desktop.
   - Laptop genişliği ayrı ölçülmeli.

2. Section başlangıç Y pozisyonu.
   - Header varsa header dahil ekran görüntüsünde section nerede başlıyor.
   - Studio preview ile canlı sayfa header farkı varsa not edilmeli.

3. Section yüksekliği.
   - Kaynak section toplam kaç px yüksek.

4. Container ölçüsü.
   - X pozisyonu.
   - Width.
   - Height.
   - Sol/sağ boşluklar.

5. Görsel box ölçüsü.
   - `x`
   - `y`
   - `width`
   - `height`
   - Görselin box içindeki gerçek görünür alanı.
   - Görselin crop olup olmadığı.

6. Text box ölçüsü.
   - `x`
   - `y`
   - `width`
   - `height`

7. Başlık computed style.
   - `font-size`
   - `line-height`
   - `font-weight`
   - `margin-bottom`
   - Satır kırılımı.

8. Body computed style.
   - `font-size`
   - `line-height`
   - Paragraph width.
   - Paragraph margin.

9. Subtitle computed style.
   - `font-size`
   - `line-height`
   - `margin-top`
   - `margin-bottom`

10. Bullet list computed style.
    - Bullet marker kaynakta bitişik mi boşluklu mu.
    - List item gap.
    - Font-size.
    - Line-height.

11. Responsive davranış.
    - 1440 desktop.
    - Laptop genişliği.
    - Mobile gerekirse.

Bu değerler ölçülmeden "biraz büyüt", "biraz küçült", "yukarı al" gibi değişiklikler deneme yanılma olur ve tekrar hata üretir.

## Kaynak Layout'u Koda Çevirme Kuralı

Kaynakta ölçülen değerler component presetlerine açıkça çevrilmeli.

Örnek eşleştirme:

- Kaynak container width -> `productBasedMaxWidth`
- Görsel kolon genişliği -> `productBasedImageColumnWidth`
- Text kolon genişliği -> `productBasedTextColumnWidth`
- Görsel box ratio -> `productBasedImageAspectRatio`
- Görsel box max width -> `productBasedImageMaxWidth`
- Görselin box içindeki boyutu -> `productBasedImageScale`
- Görselin box içindeki pozisyonu -> `productBasedImageXOffset`, `productBasedImageYOffset`
- Başlık font-size -> `productBasedTitleFontSize`
- Body font-size -> `productBasedBodyFontSize`
- Subtitle font-size -> `productBasedSubtitleFontSize`
- Title-description arası -> `productBasedTitleDescriptionGap`
- Kolon arası -> `productBasedColumnGap`
- Section üst/alt boşluğu -> `productBasedPaddingTop`, `productBasedPaddingBottom`

Eğer CSS component içinde global cap koyuyorsa bu da hesaba katılmalı.

Örnek hata:

`ThreeMashProductImageText/styles.css` içinde desktop için başlık şu şekilde sınırlanmıştı:

`font-size: min(var(--tmpit-title-size), 30px);`

Bu durumda preset'te `productBasedTitleFontSize: 42` yazılsa bile desktop'ta başlık 30px'e düşer. Kullanıcının "fontu tutturamıyorsun" dediği problemin teknik sebeplerinden biri budur.

Bu tip cap'ler varsa kaynak layout'a göre component CSS'i de düzenlenmeli veya sadece ilgili ürün/preset için etkisiz hale getirilmelidir. Aksi halde prop değerleri doğru girilse bile render yanlış kalır.

## Görseli Ayarlarken Yapılacaklar

Görselde sorun olduğunda önce sorunun tipi belirlenmeli:

- Görsel yanlış mı?
- Görsel doğru ama crop mu oluyor?
- Görsel doğru ama frame küçük mü?
- Görsel doğru ama frame doğru, sadece iç pozisyon mu yanlış?
- Görsel doğru ama source'ta başka aspect ratio ile mi render edilmiş?

Yanlış çözüm örnekleri:

- Crop sorununu sadece `YOffset` ile çözmeye çalışmak.
- Frame küçükken sadece `scale()` ile iç zoom yapmak.
- Resmi büyütmek için text kolonunu daraltmak.
- Görsel frame'i değiştirmek gerekirken section gap/padding ile oynamak.

Doğru çözüm sırası:

1. Doğru source görseli doğrula.
2. Görselin gerçek oranını ölç.
3. Kaynakta render edilen box oranını ölç.
4. Component frame oranını ona göre ayarla.
5. `object-fit` ve `object-position`/offset değerlerini en son ince ayar olarak kullan.
6. Text ve layout sabit kalması isteniyorsa sadece image ile ilgili değerleri değiştir.

CRS Tray örneğinde:

- Görsel doğruydu.
- Fakat ilk ayarlarda image box/source oranı tutmadığı için görsel yarım görünüyordu.
- Kullanıcı "sadece resmi yukarı kaydır" dediğinde sadece offset değiştirildi ama sorun tam çözülmedi.
- Daha doğru teşhis: frame/aspect ve image scale birlikte değerlendirilmeliydi.

## Font ve Spacing Ayarlarken Yapılacaklar

Fontlar source'a bakılarak tahmin edilmemeli, computed style ölçülmeli.

Ölçülecek:

- Title font-size.
- Title line-height.
- Title weight.
- Body font-size.
- Body line-height.
- Subtitle font-size.
- Bullet font-size.
- Bullet item margin/gap.

CRS Tray örneğinde yapılan versiyonda:

- Başlık olması gerekene göre küçük kaldı.
- Body fontu küçük ve sıkışık kaldı.
- Bullet list spacing kaynak görünümüne göre doğru değildi.
- Text box y pozisyonu ve block genişliği kaynakla aynı değildi.

Bunun sebebi sadece texti kopyalamakla yetinilmesi, source computed typography değerlerinin ölçülmemesidir.

## Laptop ve PC Çözünürlüğü Kuralı

Bir layout sadece tek desktop genişliğinde ayarlanmayacak.

Kontrol edilecek minimum iki desktop viewport:

- Geniş desktop: yaklaşık 1440 px.
- Laptop: kullanıcının Studio/preview kullandığı daha dar genişlik.

Eğer kaynak sayfa ile bizim component aynı breakpoint'te değilse:

- CSS breakpoint'ler kontrol edilmeli.
- `max-width`, `min()`, `clamp()`, `grid-template-columns` değerleri incelenmeli.
- Component CSS'inde text/görsel oranını bozan cap veya media query var mı bakılmalı.

Örnek problem:

Bir componentte grid şu mantıkla kurulmuş olabilir:

`minmax(0, min(var(--tmpit-image-col), 56%)) minmax(0, min(var(--tmpit-text-col), 44%))`

Bu, preset'te genişlik verilse bile viewport daralınca kolonları yüzdelik limite sokar. Kaynakta farklı kolon oranı varsa bizim layout tutmaz.

Bu nedenle sadece prop değiştirmek yetmeyebilir; component CSS grid mantığı da source layout'a uygun olmalıdır.

## Kaynak Okuma Sırası

Her reçine ürünü için yapılacak işlem sırası:

1. Ürünün ilk/top section'ı.
2. İkinci section: `Ürün İkili Özellik`.
3. `Ürün Metrik Daireleri`.
4. Slider alanı.
5. Slider altındaki `Ürün Görsel Metin Detay`.
6. Video.
7. SSS.

Kullanıcı bu sırayı açıkça anlattı ve her sayfada aynı mantığın izlenmesini istedi.

## 1. Ürün İlk Sayfası

İlk ürün alanında şunlar kaynaktan alınacak:

- Ürün adı.
- Ürün açıklaması.
- Ürün galeri görselleri ve sıraları.
- Varyantlar.
- Renk seçenekleri varsa renk kodları.

Önemli uyarı:

Renk seçeneklerindeki renk kodları/varyant renkleri eksik gelirse kaynak sitedeki renkler kopyalanacak. Rastgele renk atanmayacak.

CRS Tray örneğinde kaynakta renk seçeneği yoktu; sadece `Boyut=1000-gr` varyantı vardı. Bu durumda renk swatch uydurulmamalı.

## 2. Ürün İkili Özellik Section'ı

Bu section sabit şablon gibi ele alınacak fakat içerik ürüne özel olacak.

Yapılacaklar:

- Source'taki ikinci section bulunacak.
- Sağ taraftaki görsel indirilecek veya kaynak HTML içinden çıkarılacak.
- Bizim Studio'daki aynı ürünün ikinci section'ındaki görsel alanına yerleştirilecek.
- Text birebir kaynak yapısına göre alınacak.
- Font, yapı, barlar ve görsel-text oranı kaynak sayfaya mümkün olduğunca uygun olacak.

Önemli uyarılar:

- Resmi büyüt denildiğinde sadece iç zoom yapılmayacak. Çerçeve/frame boyutu ve layout gerçekten büyütülecek.
- Text alanı ezilmeyecek.
- Barlar kaynakta varsa koyulacak.
- Kaynakta bar yoksa bar uydurulmayacak.
- Kaynakta `●` varsa `-` kullanılmayacak.

CRS Model'de yapılan hata:

- Section 2 görseli büyütülmek istenirken text alanı daraltıldı.
- Barlar eklenirken görsel frame'i küçüldü.
- Görselin sadece içi zoomlandı ama gerçek çerçeve büyümedi.
- Doğru düzeltme: text kolonunu bozmadan, barları ekleyip görsel frame oranını ve kolon alanını korumak.

CRS Tray'de yapılan hata:

- Section 2 layout source'a göre kontrol edilmeden preset uygulanmaya çalışıldı.
- Görsel/bar/layout değerleri ürüne özel ve slug bazlı tutulmalı.

## 3. Ürün Metrik Daireleri

Metric section kaynaktan alınacak.

Yapılacaklar:

- Metrik değerleri.
- Birimler.
- Başlıklar.
- Alt açıklamalar.
- CE gibi ikon/görsel metrik varsa doğru metrik sırasında kullanılacak.

CRS Tray için kaynakta çıkarılan metrikler:

- `3000 Mpa` - `Eğilme Modülü` - `ISO 10477`
- `CE Class I Sertifikalı`
- `110 Mpa` - `Eğilme Mukavemeti` - `ISO 10477`

Metrikler taşmayacak ve dairelerin içinde düzgün duracak.

## 4. Slider

Slider tüm reçinelerde görünür olacak, diğer ürünlerde görünmeyecek mantığı daha önce konuşuldu.

Kullanıcı şunu istedi:

- `Ürünler Basic Slider` tüm reçinelerde görünsün.
- Diğer ürünlerde görünmesin.

Bu davranış slug/category bazlı olmalı, global switch gibi tüm ürünleri etkilememeli.

Slider'ın üstünde reçine sayfaları için şu metin bulunmalı:

Başlık:

`Uyumlu Cihazlar`

Metin:

`Custom Resin Solutions resmi distribütörü olarak; kullandığınız 3D yazıcı markası fark etmeksizin, parametre uyumlama işlemini ücretsiz olarak gerçekleştirmekteyiz. Satış sonrası kullanıcı eğitimleri ve 7/24 teknik destek ile yanınızdayız.`

Metindeki bold kısımlar kaynak/istenen görsele göre korunmalı:

- `resmi distribütörü`
- `ücretsiz`
- `7/24 teknik destek`

## 5. Slider Altındaki Ürün Görsel Metin Detay

Bu section için kaynakta sliderın altında bulunan, görsel ve metinden oluşan section alınacak.

Yapılacaklar:

- Kaynakta slider altındaki section bulunacak.
- Oradaki görsel birebir alınacak.
- Oradaki text birebir alınacak.
- Görselin solda mı sağda mı olduğu source'tan kontrol edilecek.
- Bullet işareti `●` ise aynı kullanılacak.
- Textler arasında kaynakta boşluk varsa korunacak.

Önemli uyarı:

Kullanıcı ilk genel talimatta "sliderın altında bulunan solda resim bulunan o resmi birebir indiriceksin bize koyacaksın ardından yanındaki texti alıcaksın" dedi. Daha sonra CRS Model için özel olarak "slider altındaki sectionda resimle textin yerlerini değiştirimisin resim sağda olması lazımdı bundan sonra böyle olucak" dedi. Bu nedenle her ürün için kesin karar source HTML'den verilmelidir; önceki ürün düzeni kör şekilde uygulanmamalıdır.

CRS Tray özelinde kaynak HTML:

- `id=10` altında `image-card-container style=flex-direction:row-reverse` vardı.
- DOM sırası `content` sonra `imageContainer` idi.
- Bu kaynak yapısında görsel solda, text sağda görünmeliydi.

CRS Tray slider altı text:

Başlık:

`Ölçü Kaşığı Üretiminde Kontrollü ve Uyumlu Süreç`

Açıklama:

`CRS Tray Kaşık Reçinesi ile üretilen ölçü kaşıkları, dijital tasarım ve 3D baskı süreçlerine uygun olarak hazırlanır. Bu yapı, ölçü süreçlerinde daha kontrollü bir kullanım sağlar ve farklı dental uygulamalarda uyumlu sonuçlar elde edilmesine katkı sunar.`

Alt başlık:

`Uygulama Alanları`

Maddeler:

- `Kişiye özel ölçü kaşığı üretimi`
- `İmplant ölçü uygulamaları`
- `Kron ve köprü ölçü süreçleri`
- `Ortodontik ölçü hazırlıkları`

Burada madde işareti kaynakta `●` idi; `-` olarak değiştirilmemeli.

CRS Tray'de yapılan hata:

- İlk önce görsel sağ/text sol yapıldı; kaynakta bunun tersi görünüyordu.
- Gömülü görsel kaynak HTML'den çıkarıldı fakat görsel frame içinde yarım göründü.
- Sadece resmi yukarı kaydırma denenince sorun çözülmedi, çünkü sorun sadece offset değildi.
- Doğru yaklaşım: kaynak görselin portre oranı dikkate alınmalı; frame oranı/resim alanı kırpma yapmayacak şekilde ayarlanmalı.

Bu section'da kullanıcı "hiçbir şeye dokunma sadece resmi yukarı kaydır" dediğinde layout/text değiştirilmeyecek. Ancak görsel hâlâ blocked/kırpılıyorsa sorun offset değilse, sadece görseli etkileyen frame/fit/overflow değerleri düzenlenebilir; text ve layout'a dokunulmaz.

CRS Composite özelinde öğrenilen kritik nokta:

- `Ürün Görsel Metin Detay` section'ında doğru görsel, product JSON-LD `image` array'indeki `composite-apps-12.webp` değildir.
- Doğru görsel, kaynak HTML'de `Baskı Sonrası Sararma Yapmaz` başlığının bulunduğu section içinde gömülü `src=data:image/webp;base64,...` görselidir.
- Bu görsel tepsi üstünde çok sayıda diş restorasyonu olan görseldir; U şeklindeki çene/model görseli bu section için yanlıştır.
- Kaynak HTML'de canlı CDN URL bulunamazsa base64 görsel section slice içinden çıkarılmalı ve gözle doğrulanmalıdır.
- Bu repo/ikas build akışında component içinden doğrudan `.webp` import etmek her component build'inde çalışmayabilir. `pnpm build`, `No loader is configured for ".webp" files` hatası verebilir.
- Bu yüzden gömülü section görselleri için güvenli yol, mevcut pattern'e uygun `src/assets/...-data.ts` dosyası oluşturup data URL string export etmek ve component'te onu import etmektir.

CRS Composite slider altı gerçek text:

Başlık:

`Baskı Sonrası Sararma Yapmaz`

Açıklama:

`CRS Composite Reçinesi, 144 Mpa eğilme mukavemeti ile kalıcı uygulamalarda kullanılabildiğini iddaa eden rakip markalara göre daha yüksek dayanım sunuyor ve diğer markalarda yaşanan kürleme işlemi sonrası sararma yapmıyor.`

Alt başlık:

`Uygulama Alanları`

Maddeler:

- `Porselen benzeri güç ve güzelliğe sahip aynı gün kron ve köprüler`
- `Çok çeşitli kalıcı ve geçici diş restorasyonları`
- `Çıkarılabilir total protezler için vakaya özel tasarlanmış kuron ve köprüler`

## 6. Video

Video kaynağı yalnızca verilen canlı URL ve yerel HTML içinden alınacak.

CRS Tray kaynak HTML'de video:

`https://www.youtube.com/embed/dNPHy_sd9aQ`

Kodda bu slug için mapping/fallback olmalı:

`crs-tray-resin-olcu-kasigi-3d-yazici-recinesi | https://www.youtube.com/watch?v=dNPHy_sd9aQ`

Yapılan hata:

- Map satırı olsa bile component'in slug fallback'i garanti değildi.
- Studio/product prop eksik eşleşirse video görünmeyebilir.
- Düzeltme: Tray slug'ı URL/title/product üzerinden yakalanmalı ve `dNPHy_sd9aQ` fallback olarak kullanılmalı.

## 7. SSS

SSS kesinlikle ürüne özel olacak.

Kullanıcı özellikle şunu istedi:

- CRS Composite sayfasının SSS'leri başka ürünlerde kullanılmayacak.
- Verilen source'taki SSS o sayfaya özel doldurulacak.
- Tüm reçinelerde SSS component'i olacak fakat içerikler ürüne özel olacak.

SSS kaynakları:

- Görünen accordion HTML'inde sadece soru satırları olabilir.
- Gerçek cevaplar sayfanın altındaki `FAQPage-script` JSON-LD içinde olabilir.
- Sadece görünür HTML'e bakıp "cevap yok" demek yanlış olabilir.

CRS Tray'de yapılan hata:

- İlk bakışta sadece accordion soru satırları görüldü.
- Cevaplar yok sanıldı.
- Cevaplar tahmini olarak yazıldı.
- Kullanıcı "uydurduğun cevapları kaldırdın sourcedaki gerçek cevapları neden yerleştirmedin" diye uyardı.
- Sonra kaynak HTML'de `script id=FAQPage-script type=application/ld+json` içinde gerçek cevaplar bulundu.

CRS Tray SSS gerçek kaynak cevapları:

1. Soru:
   `CRS Tray Resin nedir?`

   Cevap:
   `CRS Tray Resin, kişiye özel dental ölçü kaşıklarının üretimi için kullanılan, DLP ve LCD 3D yazıcılarla uyumlu bir fotopolimer reçinedir.`

2. Soru:
   `CRS Tray Resin ne için kullanılır?`

   Cevap:
   `CRS Tray Resin, kron, köprü, protez ve ortodontik işlemlerde kullanılan ölçü kaşıklarının üretimi için kullanılır.`

3. Soru:
   `Hangi yazıcılarla uyumludur?`

   Cevap:
   `CRS Tray Resin, 385–405 nm dalga boyunda çalışan DLP ve LCD 3D yazıcılarla uyumludur.`

4. Soru:
   `Ağız içinde kullanılabilir mi?`

   Cevap:
   `CRS Tray Resin, doğrudan ağız içinde kullanılmaz; ölçü kaşığı üretimi için geliştirilmiştir ve tam kürlenmemiş hali intraoral kullanım için uygun değildir.`

5. Soru:
   `Baskı sonrası işlem gerekli mi?`

   Cevap:
   `Evet. Baskı sonrası parçalar izopropil alkol ile yıkanmalı ve UV ışık ile post-cure işlemi uygulanmalıdır.`

6. Soru:
   `Post-cure neden gereklidir?`

   Cevap:
   `Post-cure işlemi, reçinenin gerekli mekanik özellikleri kazanmasını ve artık monomerlerin azaltılmasını sağlar.`

7. Soru:
   `Hangi alanlarda tercih edilir?`

   Cevap:
   `CRS Tray Resin, implant, protez, ortodonti ve termoform uygulamalarında kullanılan ölçü kaşıklarının üretiminde tercih edilir.`

8. Soru:
   `Raf ömrü ne kadardır?`

   Cevap:
   `Açılmamış ürün, serin ve karanlık ortamda saklandığında yaklaşık 2 yıl raf ömrüne sahiptir.`

9. Soru:
   `Reçine baskıdan önce karıştırılmalı mı?`

   Cevap:
   `Evet. Homojen karışım sağlamak için baskı öncesinde şişe en az 1 dakika çalkalanmalıdır.`

Bu cevaplar başka kaynaklardan değil, verilen HTML export içindeki JSON-LD `FAQPage-script` bölümünden alınmıştır.

## Slug Bazlı Görünürlük ve Global Değişiklik Hataları

Önceki sorunlardan biri component görünürlüğünün global davranmasıydı.

Kullanıcı şunları belirtti:

- Bir section kapatılınca başka ürün sayfasında da kapanıyordu.
- Görsel bir ürün için değiştirildiğinde başka ürünlerde de değişmiş gibi görünüyordu.
- Slug spesifik görünürlük çalışmıyordu.
- Her slug için on/off mantığı istenmişti.

Çıkarılan kural:

- Ürün bazlı içerik slug/product/current URL ile eşleşmeli.
- Bir ürüne ait görsel, metin, video veya SSS başka ürüne taşmamalı.
- Studio preview'da bile preset seçerken mümkün olduğunca current URL, product slug, product name ve target slug birlikte kontrol edilmeli.
- Global default'lar ürün bazlı presetleri ezmemeli.

Ürün bazlı visibility için net kural:

- `Ürün bazlı ayarlar aktif` switch'i tek başına "bu section tüm ürünlerde göster/gizle" anlamına gelmemelidir.
- Visibility kararı önce hedef ürün/slug/current URL eşleşmesini bulmalı, sonra `Bu Üründe Section Göster` benzeri ürün bazlı switch'i sadece eşleşen ürün için uygulamalıdır.
- Eğer current ürün CRS Composite değilse, CRS Composite için kapatılan `Ürün Görsel Metin Detay`, `Ürün İkili Özellik` veya `Ürün Metrik Daireleri` başka ürünlerde kapanmamalıdır.
- Eğer target slug alanı doluysa, visibility sadece o slug listesiyle eşleşen ürünlerde etkili olmalıdır.
- Target slug boşsa fallback olarak seçili ürün prop'u ve current URL slug'ı kullanılmalıdır.
- Studio preview ile canlı ürün sayfası farklı veri verdiği için karar sadece `props.product` üstünden verilmemelidir; current URL fallback'i de olmalıdır.
- Component default görünürlüğü global kalabilir, fakat ürün bazlı görünürlük prop'u global default'u override etmeden sadece eşleşen ürün scope'unda çalışmalıdır.

`Ürün Görsel Metin Detay` için özel uyarı:

- Bu component'te ürün bazlı visibility yoksa veya global çalışıyorsa CRS Composite için yapılan kapatma/yanlış görsel düzeltmesi diğer ürünlerde de görünür.
- Bu kabul edilmeyecek davranıştır; `productBasedSectionVisible === false` kontrolü mutlaka `productBasedApplies(props)` veya eşdeğer slug/product/current URL match sonucuyla birlikte çalışmalıdır.
- Doğru mantık: `if (matchesCurrentProduct && productBasedSectionVisible === false) return null;`
- Yanlış mantık: `if (productBasedSectionVisible === false) return null;`

## Büyük Görsel Component Notu

`Ürün Büyük Görsel` için kullanıcı karmaşık prop yapısını istemedi.

İstenen yapı:

- Component'a tıklayınca sadece resim yükleme olsun.
- Resmin hangi sluglarda aktif olduğunu gösteren basit switch veya slug mantığı olsun.
- Zirkon sayfalarında bu resim olsun.
- Gerekirse hardcoded yapılabilir.

Kullanıcı bu component için şunu söyledi:

- "tamamen o karmaşıklığı hepsini sil çok basit olucak"
- "sadece zirkon sayfalarında bu resim olsun gerekirse hardcoded yap"
- "still globally visible" hatası kabul edilmeyecek.

## Yapılan Hatalar ve Düzeltme Şekli

### Hata: Yanlış Kaynak Kullanmak

Bazı cevaplarda veya section içeriklerinde verilen source yerine başka ürün ya da eski preset bilgileri kullanıldı.

Düzeltme:

- Sadece kullanıcının verdiği canlı URL ve yerel HTML dosyası okunacak.
- Kaynak yoksa "kaynakta yok" denecek.
- Önceki ürünlerden SSS/metin taşınmayacak.

### Hata: Görseli Global Değiştirmek

Bir ürüne konması gereken görsel başka ürün sayfasında da göründü.

Düzeltme:

- Görsel slug bazlı preset içinde tutulmalı.
- Component default görseli değiştirilmemeli.
- Eğer product/slug match yoksa ürün bazlı preset uygulanmamalı.

CRS Composite örneğinde yapılan hata:

- `Baskı Sonrası Sararma Yapmaz` section'ı için yanlışlıkla `composite-apps-12.webp` veya U şeklindeki çene görseli kullanıldı.
- Kaynak ekran görüntüsündeki doğru görsel local HTML içindeki base64 section görseliydi.
- Düzeltme yapılırken yalnızca `crs-composite-mukemmel-dayanimli-gecici-recinesi` slug'ına uygulanmalı; başka reçine veya Argen ürünlerine taşmamalı.

### Hata: Visibility Switch Global Çalıştı

Bir ürün için kapatılan section diğer üründe de kapandı.

Düzeltme:

- Visibility product seçimi current product/current URL ile eşleştirilmeli.
- Global `sectionVisible` doğrudan tüm ürünlerde karar verici olmamalı.
- Slug bazlı hidden/show list veya ürün bazlı selection kullanılmalı.

### Hata: Image Frame Yerine İç Zoom Yapmak

Kullanıcı "resmi büyüt" dediğinde sadece `scale()` ile iç görsel büyütüldü; frame aynı kaldı veya daha da küçüldü.

Düzeltme:

- Resmi büyütmek gerekiyorsa image column, image max width, display width, aspect ratio ve layout frame birlikte kontrol edilmeli.
- `scale()` sadece küçük ince ayar için kullanılmalı.
- Text alanı ezilmemeli.

### Hata: Text Boşluklarını Silmek

CRS Model'de metinler arası boşluklar yok oldu.

Düzeltme:

- Açıklama paragrafları ayrı `<p>` olarak korunmalı.
- Bullet'lar kaynakta ayrı satırsa ayrı item olmalı.
- Component CSS gap değerleri tamamen kaldırılmamalı.

### Hata: Bullet İşaretini Değiştirmek

Kaynakta `●` varken `-` kullanıldı.

Düzeltme:

- Kaynakta ne varsa aynısı kullanılacak.
- Bu projede ilgili section bullet CSS'i `●` üretmeli veya metin kaynak işaretini korumalı.

### Hata: SSS Cevaplarını Uydurmak

CRS Tray'de cevaplar ilk aramada görünür accordion HTML'inde bulunamadı ve tahmini cevaplar yazıldı.

Düzeltme:

- HTML'in tamamında `FAQPage-script` JSON-LD aranmalı.
- `acceptedAnswer.text` değerleri birebir alınmalı.
- JSON-LD yoksa, cevap uydurulmayacak; kullanıcıya kaynakta cevap bulunmadığı söylenecek.

### Hata: Video Linkinin Görünmemesi

Video map'e satır eklenmiş olsa bile component slug'ı yakalayamayınca video boş kalabilir.

Düzeltme:

- Kaynak HTML'deki video ID çıkarılmalı.
- Slug mapping eklenmeli.
- Gerekirse aynı slug için direct fallback eklenmeli.

### Hata: Resim Yarım Göründü

CRS Tray slider altı turkuaz ölçü kaşığı görseli HTML'den çıkarıldı ama section içinde yarım göründü.

Düzeltme:

- Önce source görselin gerçek oranı ve component frame oranı karşılaştırılmalı.
- Offset ile çözülmezse image frame/aspect ratio kaynak görsele göre düzeltilmeli.
- Ancak kullanıcı "hiçbir şeye dokunma" dediyse sadece image ile ilgili değerler değiştirilmeli; text/layout/section sırası korunmalı.

## Dosya ve Component Eşleşmeleri

Bu projede reçine ürün sayfası düzenlemelerinde dokunulan ana componentler:

- `src/components/ThreeMashSingleProduct/index.tsx`
- `src/components/ThreeMashProductSplitFeature/index.tsx`
- `src/components/ThreeMashProductMetrics/index.tsx`
- `src/components/ThreeMashProductImageText/index.tsx`
- `src/components/ThreeMashProductVideo/index.tsx`
- `src/components/ThreeMashProductAccordionFaq/index.tsx`

Asset gerekirse:

- `src/assets/...-data.ts`
- Gömülü base64 kaynak görseller için data asset dosyası kullanılabilir.

Asset/build notu:

- `pnpm exec tsc --noEmit` `.webp` importunu type olarak kabul edebilir.
- Fakat `pnpm build` / `ikas-component build` component bazlı bundling sırasında `.webp` loader hatası verebilir.
- Bu yüzden build doğrulaması sadece TypeScript ile bitirilmemeli; production build mutlaka çalıştırılmalıdır.
- Build `.webp` loader hatası verirse raw `.webp` importu yerine data URL export eden `...-data.ts` kullanılmalıdır.

Kaynak SingleFile HTML'deki görsel tipleri:

- CDN URL olarak JSON-LD veya `background-image` içinde bulunabilir.
- `--sf-img-N` CSS variable içinde base64 data image olabilir.
- Section içinde doğrudan `src=data:image/webp;base64,...` olarak gömülü olabilir.

Görsel seçerken:

- Sadece ilk bulunan görsel alınmaz.
- Section id'si ve çevre text ile doğru görsel eşleştirilir.
- Slider altı section için ilgili section'ın kendi `imageContainer` içindeki görsel alınır.
- Uyumlu cihaz logoları veya carousel görselleri yanlışlıkla section görseli sanılmamalı.

## CRS Tray Kaynak Özeti

Verilen kaynaklar:

- `C:\Users\caner\Downloads\CRS Tray Resin – Ölçü Kaşığı 3D Yazıcı Reçinesi (DLP_LCD Uyumlu) (7_28_2026 4：56：27 PM).html`
- `https://3mash.com/crs-tray-resin-olcu-kasigi-3d-yazici-recinesi`

Ürün görsel sırası:

1. `https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a7753220-8b7a-4832-a428-c8678e941fda/1080/crs-tray-resin.webp`
2. `https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/c089d52c-d0b8-4a97-8ac2-11fdc42768cf/1080/crs-tray-recinesi.webp`
3. `https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/84ae7002-2669-48b0-a7ea-627ca96b1c06/1080/crs-tray-recinesi.webp`
4. `https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/9bc9c9df-e2bc-4870-afcd-4c120e55faca/1080/crs-tray-recinesi.webp`

Ürün açıklaması:

`CRS Tray Resin; kişiye özel ölçü kaşıklarının üretimi için geliştirilmiş, DLP ve LCD yazıcılarla uyumlu bir 3D yazıcı reçinesidir. 385-405 nm dalga boyunda çalışan sistemlerle optimize edilmiştir. Baskı sonrası uygulanan işlemlerle gerekli mekanik özellikleri kazanır ve ölçü kaşığı üretiminde güvenilir bir kullanım sunar. Dijital iş akışına uyumlu yapısı sayesinde, implant, protez ve ortodontik uygulamalarda kullanılan ölçü süreçlerinde tercih edilir.`

Video:

`https://www.youtube.com/watch?v=dNPHy_sd9aQ`

Slider altı görsel:

- Kaynak HTML `id=10` içinde doğrudan `src=data:image/webp;base64,...` olarak gömülü.
- Bu görsel turkuaz ölçü kaşığı görselidir.

SSS:

- Görünür HTML'de sadece soru satırları var.
- Gerçek cevaplar alttaki `FAQPage-script` JSON-LD içindedir.

## Çalışma Sonunda Kontrol

Değişiklikten sonra:

- `pnpm build` çalıştırılmalı.
- Build geçmediyse final cevapta açıkça belirtilmeli.
- Eğer kullanıcı işlemi bölerse veya build abort olursa bu saklanmamalı.
- Görsel/layout değişikliklerinde mümkünse Studio veya browser görünümü kontrol edilmeli.

Bu dosyanın amacı sonraki reçine sayfalarında aynı hataları tekrar etmemek ve sadece kullanıcı tarafından verilen kaynaklara bağlı kalarak ürün bazlı, slug spesifik içerik düzenlemelerini doğru yapmaktır.
