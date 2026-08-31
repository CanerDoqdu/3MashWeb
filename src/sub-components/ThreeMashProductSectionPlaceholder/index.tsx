import { tLocalized } from "../../utils/i18n";
/**
 * ThreeMashProductSectionPlaceholder
 *
 * Her section bileseninin tamamen ayni HTML/CSS tasarim ve renk semasiyla
 * temiz placeholder metinleriyle render olmasini saglar.
 */

import type { ProductDetailTemplateData } from "../ThreeMashProductDetailTemplate";

export const PLACEHOLDER_BASE_KEY = "__placeholder__";

export function makePlaceholderBase(): ProductDetailTemplateData {
  return {
    key: PLACEHOLDER_BASE_KEY,
    breadcrumb: {
      homeText: tLocalized("Ana sayfa", "Home"),
      homeHref: "/",
      categoryText: tLocalized("Kategori Adı", "Category Name"),
      categoryHref: "#",
      productText: tLocalized("Ürün Başlığı", "Product Title"),
    },
    hero: {
      kicker: tLocalized("Ürün Üst Etiketi", "Product Top Label"),
      titleHtml: tLocalized('Ürün Başlığı ve <span class="em">Vurgulu Metin</span>', 'Product Title and <span class="em">Emphasized Text</span>'),
      leadHtml: tLocalized(
        "Ürün kısa açıklama metni buraya gelecek. Panelden veya ürün açıklamasından düzenleyebilirsiniz.",
        "Product short description text goes here. You can edit from panel or product description."
      ),
      pills: [
        { label: tLocalized("Örnek Rozet 1", "Sample Badge 1") },
        { label: tLocalized("Örnek Rozet 2", "Sample Badge 2") },
        { label: tLocalized("Örnek Rozet 3", "Sample Badge 3") },
      ],
      gallery: [],
      selectedPrefix: tLocalized("Seçiminiz:", "Your selection:"),
      summarySuffix: tLocalized("— ek açıklama metni.", "— additional description text."),
      buyHrefBase: "#",
      whatsappHref: tLocalized("https://wa.me/905314326577?text=Urun%20hakkinda%20bilgi%20almak%20istiyorum", "https://wa.me/905314326577?text=Urun%20hakkinda%20bilgi%20almak%20istiyorum"),
      whatsappText: tLocalized("WhatsApp'tan sor", "Ask on WhatsApp"),
      addToCartText: tLocalized("Sepete ekle", "Add to Cart"),
      addingToCartText: tLocalized("Ekleniyor...", "Adding..."),
      outOfStockText: tLocalized("Stok yok", "Out of stock"),
      trustBadges: [
        tLocalized("Güven Rozeti 1", "Trust Badge 1"),
        tLocalized("Güven Rozeti 2", "Trust Badge 2"),
        tLocalized("Güven Rozeti 3", "Trust Badge 3"),
      ],
    },
  };
}

/** Ratings (Kullanıcı Deneyimi) bölümü için açık placeholder verisi */
export function makePlaceholderRatings(): ProductDetailTemplateData {
  return {
    ...makePlaceholderBase(),
    ratings: {
      index: "01",
      label: tLocalized("BÖLÜM ETİKETİ", "SECTION LABEL"),
      titleHtml: tLocalized('Kullanıcı deneyimi <span class="em">başlığı buraya gelecek.</span>', 'User experience <span class="em">title goes here.</span>'),
      sideHtml: tLocalized("Bu bölümün sağ tarafındaki detaylı açıklama metni buraya gelecek.", "Detailed description text for the right side of this section goes here."),
      panelTitleHtml: tLocalized("Geri Bildirim &amp; Deneyim Başlığı", "Feedback &amp; Experience Title"),
      note: tLocalized("Örnek açıklama veya araştırma notu", "Sample description or research note"),
      items: [
        { descriptionHtml: tLocalized("1. Deneyim maddesi açıklama metni buraya gelecek", "1. Experience item description text goes here"), percent: 95 },
        { descriptionHtml: tLocalized("2. Deneyim maddesi açıklama metni buraya gelecek", "2. Experience item description text goes here"), percent: 90 },
        { descriptionHtml: tLocalized("3. Deneyim maddesi açıklama metni buraya gelecek", "3. Experience item description text goes here") },
      ],
    },
  };
}

/** Metrics (Metrik Daireleri) bölümü için açık placeholder verisi */
export function makePlaceholderMetrics(): ProductDetailTemplateData {
  return {
    ...makePlaceholderBase(),
    metrics: {
      index: "02",
      label: tLocalized("TEKNİK ÖZELLİKLER", "SPECIFICATIONS"),
      titleHtml: tLocalized('Bölüm ana başlığı ve <span class="em">vurgulu metin.</span>', 'Main section title and <span class="em">emphasized text.</span>'),
      sideHtml: tLocalized("Teknik özellikler bölümü için sağ tarafta yer alan genel açıklama metni.", "General description text on the right side for specifications section."),
      items: [
        { name: tLocalized("Özellik 1", "Feature 1"), value: "01", unit: tLocalized("Birim", "Unit"), caption: tLocalized("1. kart açıklama metni buraya gelecek", "Card 1 description text goes here") },
        { name: tLocalized("Özellik 2", "Feature 2"), value: "02", unit: tLocalized("Birim", "Unit"), caption: tLocalized("2. kart açıklama metni buraya gelecek", "Card 2 description text goes here") },
        { name: tLocalized("Özellik 3", "Feature 3"), value: "03", unit: tLocalized("Birim", "Unit"), caption: tLocalized("3. kart açıklama metni buraya gelecek", "Card 3 description text goes here") },
      ],
    },
    specHighlight: {
      tag: tLocalized("ÖNE ÇIKAN DETAY", "FEATURED DETAIL"),
      titleHtml: tLocalized('Siyah kutu başlığı ve <span class="em">vurgulu metin.</span>', 'Black box title and <span class="em">emphasized text.</span>'),
      descriptionHtml: tLocalized("Siyah kutu içerisindeki detaylı ürün açıklaması metni buraya gelecek.", "Detailed product description text inside black box goes here."),
      ctaText: tLocalized("İncele →", "Explore →"),
      ctaHref: "#satinal",
      rows: [
        { label: tLocalized("Özellik Adı 1", "Feature Name 1"), value: tLocalized("Özellik Değeri 1", "Feature Value 1") },
        { label: tLocalized("Özellik Adı 2", "Feature Name 2"), value: tLocalized("Özellik Değeri 2", "Feature Value 2") },
        { label: tLocalized("Özellik Adı 3", "Feature Name 3"), value: tLocalized("Özellik Değeri 3", "Feature Value 3") },
        { label: tLocalized("Özellik Adı 4", "Feature Name 4"), value: tLocalized("Özellik Değeri 4", "Feature Value 4") },
      ],
    },
  };
}

/** UseCases (Görsel Metin / Kullanım Alanları) bölümü için açık placeholder verisi */
export function makePlaceholderUseCases(): ProductDetailTemplateData {
  return {
    ...makePlaceholderBase(),
    useCases: {
      index: "03",
      label: tLocalized("KULLANIM ALANLARI", "APPLICATION AREAS"),
      titleHtml: tLocalized('Kullanım alanları ve <span class="em">uygulama seçenekleri.</span>', 'Application areas and <span class="em">application options.</span>'),
      sideHtml: tLocalized("Uygulama alanları bölümünün sağ üst genel açıklama metni buraya gelecek.", "General description text for the top right of the application areas section goes here."),
      photos: [
        {
          src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/deb67f5e-a02a-4fa6-9cb8-595a277d69fd/1080/composite-apps-10.webp",
          alt: tLocalized("1. Görsel", "1st Image"),
          title: tLocalized("1. Görsel Başlığı", "1st Image Title"),
          text: tLocalized("1. Görsel açıklama metni buraya gelecek.", "1st Image description text goes here."),
        },
        {
          src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/9d7bb34c-1f0d-4b36-8f0e-ce9a41863d55/1080/composite-apps-11.webp",
          alt: tLocalized("2. Görsel", "2nd Image"),
          title: tLocalized("2. Görsel Başlığı", "2nd Image Title"),
          text: tLocalized("2. Görsel açıklama metni buraya gelecek.", "2nd Image description text goes here."),
        },
        {
          src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1cd726f4-d0ec-4f4b-9407-ca7a84da9961/1080/composite-apps-12.webp",
          alt: tLocalized("3. Görsel", "3rd Image"),
          title: tLocalized("3. Görsel Başlığı", "3rd Image Title"),
          text: tLocalized("3. Görsel açıklama metni buraya gelecek.", "3rd Image description text goes here."),
        },
      ],
      cards: [
        {
          eyebrow: tLocalized("KART ETİKETİ 1", "CARD LABEL 1"),
          title: tLocalized("1. Kart Başlığı", "1st Card Title"),
          items: [
            tLocalized("1. Madde açıklama metni", "1st Item description text"),
            tLocalized("2. Madde açıklama metni", "2nd Item description text"),
            tLocalized("3. Madde açıklama metni", "3rd Item description text"),
          ],
        },
        {
          eyebrow: tLocalized("KART ETİKETİ 2", "CARD LABEL 2"),
          title: tLocalized("2. Kart Başlığı", "2nd Card Title"),
          items: [
            tLocalized("1. Madde açıklama metni", "1st Item description text"),
            tLocalized("2. Madde açıklama metni", "2nd Item description text"),
          ],
        },
      ],
      devices: {
        eyebrow: tLocalized("UYUMLULUK", "COMPATIBILITY"),
        title: tLocalized("Sistem ve cihaz uyumluluğu başlığı.", "System and device compatibility title."),
        textHtml: tLocalized("Cihaz uyumluluğu ile ilgili genel açıklama metni buraya gelecek.", "General description text regarding device compatibility goes here."),
        chips: [
          { label: tLocalized("Örnek Cihaz 1", "Sample Device 1"), highlighted: true },
          { label: tLocalized("Örnek Cihaz 2", "Sample Device 2"), highlighted: true },
          { label: tLocalized("Örnek Cihaz 3", "Sample Device 3") },
          { label: tLocalized("Örnek Cihaz 4", "Sample Device 4") },
        ],
      },
    },
  };
}

/** FAQ (Sıkça Sorulan Sorular) bölümü için açık placeholder verisi */
export function makePlaceholderFaq(): ProductDetailTemplateData {
  return {
    ...makePlaceholderBase(),
    faq: {
      index: "04",
      label: tLocalized("SIKÇA SORULAN SORULAR", "FREQUENTLY ASKED QUESTIONS"),
      titleHtml: tLocalized('Sıkça sorulan sorular <span class="em">ve yanıtlar.</span>', 'Frequently asked questions <span class="em">and answers.</span>'),
      sideHtml: tLocalized("Bu ürünle ilgili en çok merak edilen konulara dair açıklamalar.", "Explanations for the most frequently asked questions about this product."),
      openFirst: true,
      items: [
        {
          question: tLocalized("1. Örnek soru metni buraya gelecek?", "1. Sample question text goes here?"),
          answerHtml: tLocalized("1. Soruya ait detaylı cevap metni buraya gelecek.", "1. Detailed answer text goes here."),
        },
        {
          question: tLocalized("2. Örnek soru metni buraya gelecek?", "2. Sample question text goes here?"),
          answerHtml: tLocalized("2. Soruya ait detaylı cevap metni buraya gelecek.", "2. Detailed answer text goes here."),
        },
        {
          question: tLocalized("3. Örnek soru metni buraya gelecek?", "3. Sample question text goes here?"),
          answerHtml: tLocalized("3. Soruya ait detaylı cevap metni buraya gelecek.", "3. Detailed answer text goes here."),
        },
      ],
    },
  };
}

/** SpecHighlight (Büyük Görsel / Spec Vurgu) bölümü için açık placeholder verisi */
export function makePlaceholderSpecHighlight(): ProductDetailTemplateData {
  return {
    ...makePlaceholderBase(),
    specHighlight: {
      tag: tLocalized("ÖNE ÇIKAN DETAY", "FEATURED DETAIL"),
      titleHtml: tLocalized('Siyah kutu başlığı ve <span class="em">vurgulu metin.</span>', 'Black box title and <span class="em">emphasized text.</span>'),
      descriptionHtml: tLocalized("Siyah kutu içerisindeki detaylı ürün açıklaması metni buraya gelecek.", "Detailed product description text inside black box goes here."),
      ctaText: tLocalized("İncele →", "Explore →"),
      ctaHref: "#satinal",
      rows: [
        { label: tLocalized("Özellik Adı 1", "Feature Name 1"), value: tLocalized("Özellik Değeri 1", "Feature Value 1") },
        { label: tLocalized("Özellik Adı 2", "Feature Name 2"), value: tLocalized("Özellik Değeri 2", "Feature Value 2") },
        { label: tLocalized("Özellik Adı 3", "Feature Name 3"), value: tLocalized("Özellik Değeri 3", "Feature Value 3") },
        { label: tLocalized("Özellik Adı 4", "Feature Name 4"), value: tLocalized("Özellik Değeri 4", "Feature Value 4") },
      ],
    },
  };
}
