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
      homeText: "Ana sayfa",
      homeHref: "/",
      categoryText: "Kategori Adı",
      categoryHref: "#",
      productText: "Ürün Başlığı",
    },
    hero: {
      kicker: "Ürün Üst Etiketi",
      titleHtml: 'Ürün Başlığı ve <span class="em">Vurgulu Metin</span>',
      leadHtml: "Ürün kısa açıklama metni buraya gelecek. Panelden veya ürün açıklamasından düzenleyebilirsiniz.",
      pills: [
        { label: "Örnek Rozet 1" },
        { label: "Örnek Rozet 2" },
        { label: "Örnek Rozet 3" },
      ],
      gallery: [],
      selectedPrefix: "Seçiminiz:",
      summarySuffix: "— ek açıklama metni.",
      buyHrefBase: "#",
      whatsappHref: "https://wa.me/905314326577?text=Urun%20hakkinda%20bilgi%20almak%20istiyorum",
      whatsappText: "WhatsApp'tan sor",
      addToCartText: "Sepete ekle",
      addingToCartText: "Ekleniyor...",
      outOfStockText: "Stok yok",
      trustBadges: ["Güven Rozeti 1", "Güven Rozeti 2", "Güven Rozeti 3"],
    },
  };
}

/** Ratings (Kullanıcı Deneyimi) bölümü için açık placeholder verisi */
export function makePlaceholderRatings(): ProductDetailTemplateData {
  return {
    ...makePlaceholderBase(),
    ratings: {
      index: "01",
      label: "BÖLÜM ETİKETİ",
      titleHtml: 'Kullanıcı deneyimi <span class="em">başlığı buraya gelecek.</span>',
      sideHtml: "Bu bölümün sağ tarafındaki detaylı açıklama metni buraya gelecek.",
      panelTitleHtml: "Geri Bildirim &amp; Deneyim Başlığı",
      note: "Örnek açıklama veya araştırma notu",
      items: [
        { descriptionHtml: "1. Deneyim maddesi açıklama metni buraya gelecek", percent: 95 },
        { descriptionHtml: "2. Deneyim maddesi açıklama metni buraya gelecek", percent: 90 },
        { descriptionHtml: "3. Deneyim maddesi açıklama metni buraya gelecek" },
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
      label: "TEKNİK ÖZELLİKLER",
      titleHtml: 'Bölüm ana başlığı ve <span class="em">vurgulu metin.</span>',
      sideHtml: "Teknik özellikler bölümü için sağ tarafta yer alan genel açıklama metni.",
      items: [
        { name: "Özellik 1", value: "01", unit: "Birim", caption: "1. kart açıklama metni buraya gelecek" },
        { name: "Özellik 2", value: "02", unit: "Birim", caption: "2. kart açıklama metni buraya gelecek" },
        { name: "Özellik 3", value: "03", unit: "Birim", caption: "3. kart açıklama metni buraya gelecek" },
      ],
    },
    specHighlight: {
      tag: "ÖNE ÇIKAN DETAY",
      titleHtml: 'Siyah kutu başlığı ve <span class="em">vurgulu metin.</span>',
      descriptionHtml: "Siyah kutu içerisindeki detaylı ürün açıklaması metni buraya gelecek.",
      ctaText: "İncele →",
      ctaHref: "#satinal",
      rows: [
        { label: "Özellik Adı 1", value: "Özellik Değeri 1" },
        { label: "Özellik Adı 2", value: "Özellik Değeri 2" },
        { label: "Özellik Adı 3", value: "Özellik Değeri 3" },
        { label: "Özellik Adı 4", value: "Özellik Değeri 4" },
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
      label: "KULLANIM ALANLARI",
      titleHtml: 'Kullanım alanları ve <span class="em">uygulama seçenekleri.</span>',
      sideHtml: "Uygulama alanları bölümünün sağ üst genel açıklama metni buraya gelecek.",
      photos: [
        {
          src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/deb67f5e-a02a-4fa6-9cb8-595a277d69fd/1080/composite-apps-10.webp",
          alt: "1. Görsel",
          title: "1. Görsel Başlığı",
          text: "1. Görsel açıklama metni buraya gelecek.",
        },
        {
          src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/9d7bb34c-1f0d-4b36-8f0e-ce9a41863d55/1080/composite-apps-11.webp",
          alt: "2. Görsel",
          title: "2. Görsel Başlığı",
          text: "2. Görsel açıklama metni buraya gelecek.",
        },
        {
          src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1cd726f4-d0ec-4f4b-9407-ca7a84da9961/1080/composite-apps-12.webp",
          alt: "3. Görsel",
          title: "3. Görsel Başlığı",
          text: "3. Görsel açıklama metni buraya gelecek.",
        },
      ],
      cards: [
        {
          eyebrow: "KART ETİKETİ 1",
          title: "1. Kart Başlığı",
          items: ["1. Madde açıklama metni", "2. Madde açıklama metni", "3. Madde açıklama metni"],
        },
        {
          eyebrow: "KART ETİKETİ 2",
          title: "2. Kart Başlığı",
          items: ["1. Madde açıklama metni", "2. Madde açıklama metni"],
        },
      ],
      devices: {
        eyebrow: "UYUMLULUK",
        title: "Sistem ve cihaz uyumluluğu başlığı.",
        textHtml: "Cihaz uyumluluğu ile ilgili genel açıklama metni buraya gelecek.",
        chips: [
          { label: "Örnek Cihaz 1", highlighted: true },
          { label: "Örnek Cihaz 2", highlighted: true },
          { label: "Örnek Cihaz 3" },
          { label: "Örnek Cihaz 4" },
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
      label: "SIKÇA SORULAN SORULAR",
      titleHtml: 'Sıkça sorulan sorular <span class="em">ve yanıtlar.</span>',
      sideHtml: "Bu ürünle ilgili en çok merak edilen konulara dair açıklamalar.",
      openFirst: true,
      items: [
        {
          question: "1. Örnek soru metni buraya gelecek?",
          answerHtml: "1. Soruya ait detaylı cevap metni buraya gelecek.",
        },
        {
          question: "2. Örnek soru metni buraya gelecek?",
          answerHtml: "2. Soruya ait detaylı cevap metni buraya gelecek.",
        },
        {
          question: "3. Örnek soru metni buraya gelecek?",
          answerHtml: "3. Soruya ait detaylı cevap metni buraya gelecek.",
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
      tag: "ÖNE ÇIKAN DETAY",
      titleHtml: 'Siyah kutu başlığı ve <span class="em">vurgulu metin.</span>',
      descriptionHtml: "Siyah kutu içerisindeki detaylı ürün açıklaması metni buraya gelecek.",
      ctaText: "İncele →",
      ctaHref: "#satinal",
      rows: [
        { label: "Özellik Adı 1", value: "Özellik Değeri 1" },
        { label: "Özellik Adı 2", value: "Özellik Değeri 2" },
        { label: "Özellik Adı 3", value: "Özellik Değeri 3" },
        { label: "Özellik Adı 4", value: "Özellik Değeri 4" },
      ],
    },
  };
}
