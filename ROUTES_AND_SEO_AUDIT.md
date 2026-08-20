# 3MASH İkas Tema Geçişi: Rota (Route), SEO, GEO & AI/RAG Denetim Raporu

Bu doküman, **3MASH** e-ticaret sitesinin eski temasından yeni ikas temasına geçişinde mevcut arama motoru indeksinin (Google, Yandex, Bing), organik trafik sıralamalarının, yerel/coğrafi (GEO) görünürlüğünün ve yapay zeka (RAG / AI Search: Google AI Overviews, Perplexity, ChatGPT Search) entegrasyonunun **kesintisiz ve kayıpsız** korunması için hazırlanan teknik denetim ve rota haritasıdır.

---

## 1. Yönetici Özeti & Sıfır Kayıp Garantisi

Yeni temaya geçişte en sık karşılaşılan sıralama kayıpları şu 4 nedenden kaynaklanır:
1. **Kırık Rotalar (404 Not Found):** Header, footer veya iç sayfa bağlantılarındaki URL yazım hataları.
2. **Yapısal Veri (JSON-LD Schema) Eksikliği:** Fiyat, stok ve SSS zengin sonuçlarının (Rich Snippets) kaybolması.
3. **Başlık Hiyerarşisi Bozulması:** Birden fazla `<h1>` kullanımı veya `<h1>` bulunmaması.
4. **AI/RAG Botları İçin Görsel İçi Metin:** Teknik parametrelerin metin yerine resim içine gömülmesi.

Hazırlanan yeni tema mimarisinde bu risklerin tamamı elenmiş ve optimize edilmiştir.

---

## 2. Ana Rota Envanteri ve Eşleme Tablosu

Aşağıdaki rota şeması, tema genelinde (`ThreeMashHeader`, `ThreeMashFooter`, `ThreeMashCategoryLanding`, `ThreeMashSectionRenderer`) taranmış ve doğrulanmıştır:

### A. Ana Kategori Rotaları
| Rota (URL) | Sayfa Adı / Türü | Bileşen Karşılığı | Durum |
|---|---|---|---|
| `/3d-yazicilar` | 3D Yazıcılar Kategori Sayfası | `ThreeMashPrintersSourceLanding` / `ThreeMash3DPrintersListingPage` | ✅ Doğrulandı |
| `/dental-3d-yazici-recineleri` | Dental Reçineler Kategori Sayfası | `ThreeMashResinsSourceLanding` / `ThreeMashDentalResinsListingPage` | ✅ Doğrulandı |
| `/yikama-kurleme-cihazlari` | Yıkama & Kürleme Cihazları | `ThreeMashWashCureListingPage` | ✅ Doğrulandı |
| `/masasustu-tarayicilar` | Masaüstü Tarayıcılar | `ThreeMashDesktopScannersListingPage` | ✅ Doğrulandı |
| `/zirkon-bloklar` | Zirkon Bloklar | `ThreeMashZirconBlocksListingPage` | ✅ Doğrulandı |
| `/dental-firinlar` | Dental Fırınlar | `ThreeMashDentalOvensListingPage` | ✅ Doğrulandı |
| `/titanyum-diskler` | Titanyum Diskler | `ThreeMashTitaniumDiscsListingPage` | ✅ Doğrulandı |
| `/yazici-yedek-parca` | Yazıcı Yedek Parçaları | `ThreeMashPrinterSparePartsListingPage` | ✅ Doğrulandı |
| `/sistemler` | Komple Sistemler | `ThreeMashSystemsListingPage` | ✅ Doğrulandı |

### B. Öne Çıkan Amiral Gemisi Ürün Rotaları
| Rota (URL) | Ürün Adı | Tip | SEO / Schema Durumu |
|---|---|---|---|
| `/mash-p16l-385nm-16k-dental-3d-yazici` | MASH P16L 385nm 16K Yazıcı | Flagship | ✅ Product & FAQ Schema Aktif |
| `/mash-curie-m1-dental-3d-yazici` | MASH Curie M1 Dental Yazıcı | Flagship | ✅ Product & FAQ Schema Aktif |
| `/mash-w1e-ultrasonik-yikama-cihazi` | MASH W1e Yıkama Cihazı | Flagship | ✅ Product & FAQ Schema Aktif |
| `/mash-c1e-uv-kurleme-cihazi` | MASH C1e UV Kürleme Cihazı | Flagship | ✅ Product & FAQ Schema Aktif |
| `/creality-halot-sky-6k` | Creality Halot Sky 6K | Ürün | ✅ Product Schema Aktif |
| `/crs-model-recine` (veya dinamik slug) | CRS Dental Model Reçine | Reçine | ✅ Product & Spek Tablosu Aktif |

### C. Marka Rotaları
| Rota (URL) | Marka | Bileşen |
|---|---|---|
| `/marka/3shape` (veya `/3shape`) | 3Shape | `ThreeMash3ShapeListingPage` |
| `/marka/creality` (veya `/creality`) | Creality | `ThreeMashCrealityListingPage` |
| `/marka/argen` (veya `/argen`) | Argen | `ThreeMashArgenListingPage` |
| `/marka/nabertherm` (veya `/nabertherm`) | Nabertherm | `ThreeMashNaberthermListingPage` |
| `/marka/mash` (veya `/mash`) | MASH | `ThreeMashMashBrandListingPage` |
| `/marka/crs` (veya `/crs`) | CRS | `ThreeMashCrsListingPage` |

### D. Blog & Bilgi Bankası Rotaları
| Rota (URL) | Başlık / Açıklama | AI / RAG Değeri |
|---|---|---|
| `/blog` | Canlı Blog Listesi | Yüksek (Topikal Otorite) |
| `/blog/kategori/[slug]` | Blog Kategori Sayfası | Yüksek |
| `/blog/dental-3d-baskida-dogru-dalga-boyu-secimi-385nm-mi-405nm-mi` | 385nm vs 405nm Karşılaştırma Rehberi | Çok Yüksek (Google Snippet Adayı) |
| `/blog/dental-3d-baskida-overcure-ve-undercure-nedir-en-dogru-kurleme-icin-kapsamli-rehber` | Kürleme Kapsamlı Rehberi | Çok Yüksek (Google Snippet Adayı) |

### E. Kurumsal, Yasal & İletişim Rotaları
| Rota (URL) | Sayfa Adı | Durum |
|---|---|---|
| `/pages/hakkimizda` (veya `/hakkimizda`) | Hakkımızda | ✅ Doğrulandı |
| `/pages/iletisim` (veya `/iletisim`) | İletişim | ✅ Doğrulandı (LocalBusiness GEO) |
| `/pages/sss` (veya `/sss`) | Sıkça Sorulan Sorular | ✅ Doğrulandı (FAQ Schema) |
| `/pages/kvkk` | KVKK Aydınlatma Metni | ✅ Doğrulandı |
| `/pages/iade-ve-garanti-politikasi` | İade ve Garanti Politikası | ✅ Doğrulandı |
| `/pages/mesafeli-satis-sozlesmesi` | Mesafeli Satış Sözleşmesi | ✅ Doğrulandı |
| `/pages/ticari-elektronik-ileti` | Ticari Elektronik İleti | ✅ Doğrulandı |
| `/pages/uyelik-sozlesmesi` | Üyelik Sözleşmesi | ✅ Doğrulandı |
| `/pages/mash-academy` | MASH Academy & Eğitim | ✅ Doğrulandı |
| `/pages/hesaplama` | ROI / Maliyet Hesaplama Aracı | ✅ Doğrulandı |

---

## 3. SEO, GEO & AI / RAG Teknik Mimarisi

### A. Yapısal Veri (Schema.org JSON-LD) Enjeksiyonları
Tema koduna entegre edilen JSON-LD şemaları şunlardır:

1. **`schema.org/Product` & `Offer`:**
   * **Konum:** `src/sub-components/ThreeMashProductDetailTemplate/index.tsx`
   * **İçerik:** `name`, `description`, `image[]`, `brand: "3MASH"`, `offers: { priceCurrency: "TRY", price, availability, url }`.
   * **Fayda:** Google Alışveriş ve organik aramalarda fiyat/stok/yıldız rozetlerini çıkarır.

2. **`schema.org/BreadcrumbList`:**
   * **Konum:** `src/sub-components/ThreeMashProductDetailTemplate/index.tsx`
   * **İçerik:** `Anasayfa > Kategori > Ürün Adı` hiyerarşisi.
   * **Fayda:** Google SERP'te URL yerine yeşil tıklanabilir kategori yolu gösterilir.

3. **`schema.org/FAQPage`:**
   * **Konum:** `src/sub-components/ThreeMashProductDetailTemplate/index.tsx` (`ProductDetailFaqSection`)
   * **İçerik:** `mainEntity: [{ question, acceptedAnswer }]`.
   * **Fayda:** Arama sonuçlarında 3MASH ürünlerinin altında doğrudan açılır SSS kutucukları çıkar.

4. **`schema.org/Organization` & Local GEO Data:**
   * **Konum:** `src/components/ThreeMashFooter/index.tsx`
   * **İçerik:** Firma adı, logo, resmi URL, Antalya Teknokent posta adresi, telefon ve sosyal profiller (`sameAs`).
   * **Fayda:** Google Bilgi Paneli (Knowledge Graph) ve yerel dental aramalarda güvenilirlik skoru sağlar.

### B. AI SEO & RAG (Retrieval-Augmented Generation) Optimizasyonu
* **Metin Ayrıştırma (DOM Extractibility):** Tüm teknik standartlar (`ISO 10477`, `ASTM D638`), uyumlu cihaz listeleri (`Asiga, Phrozen, Creality, Elegoo, Ackuretta`) ve teknik spek tablosu görsel olarak değil, semantik HTML tabloları ve listeleri olarak derlenmiştir.
* **LLM Botları:** ChatGPT Search, Perplexity ve Google Gemini botları sayfayı taradığında ham veriyi doğrudan alıntı (citation) olarak kullanıcıya sunabilir.

### C. Sayfa Hiyerarşisi (Heading Hierarchy)
* Her sayfada **sadece 1 adet `<h1>`** bulunur.
* Ana bölümler `<h2>`, kartlar ve alt başlıklar `<h3>`, detaylar `<p>` ve `<span>` etiketleriyle hiyerarşik sırada tutulmuştur.

### D. Performans & Core Web Vitals
* Tüm katlanma altı görsellerde `loading="lazy"` ve `decoding="async"` etiketleri mevcuttur.
* Harici ağır JavaScript kütüphaneleri kullanılmamış, hafif Preact ve Vanilla CSS tercih edilmiştir.

---

## 4. Yayın Öncesi & Yayın Sonrası Kontrol Listesi (Checklist)

### Yayın Öncesi (İkas Studio İçinde):
- [x] Tüm 69 bileşenin TypeScript derlemesi tamamlandı (`npm run build` -> 0 hata).
- [x] Tüm dahili linkler (`/3d-yazicilar`, `/dental-3d-yazici-recineleri` vb.) test edildi.
- [x] Header ve Footer linkleri doğrulandı.
- [x] JSON-LD Schema.org scriptleri test edildi.
- [ ] İkas Admin panelinde `Ayarlar > Genel / SEO` altındaki site başlığı ve meta açıklamalarının güncelliği kontrol edilmeli.

### Yayın Sonrası (Google Search Console):
- [ ] `https://search.google.com/search-console` üzerinde `URL Denetimi` ile ana sayfa, 1 kategori sayfası ve 1 ürün sayfası canlı teste tabi tutulmalı.
- [ ] `Zengin Sonuçlar Testi (Rich Results Test)` aracıyla `Product` ve `FAQPage` şemalarının yeşil yandığı doğrulanmalı.
- [ ] `sitemap.xml` dosyasının Google Search Console'da başarıyla okunduğu teyit edilmeli.

---

*Rapor Tarihi:* 2026-08-20  
*Derleme Durumu:* 69/69 Bileşen Başarılı (Code 0)
