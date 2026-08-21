/**
 * ThreeMashProductSectionPlaceholder
 *
 * Her section bileseninin tamamen ayni HTML/CSS tasarim ve renk semasiyla
 * sorunsuz render olmasi icin varsayilan tema verilerini saglar.
 */

import type { ProductDetailTemplateData } from "../ThreeMashProductDetailTemplate";

export const PLACEHOLDER_BASE_KEY = "__placeholder__";

export function makePlaceholderBase(): ProductDetailTemplateData {
  return {
    key: PLACEHOLDER_BASE_KEY,
    breadcrumb: {
      homeText: "Ana sayfa",
      homeHref: "/",
      categoryText: "Dental Çözümler",
      categoryHref: "/3d-yazicilar",
      productText: "3MASH Dental Ürün",
    },
    hero: {
      kicker: "Dental Üretim Çözümleri",
      titleHtml: 'Yüksek hassasiyetli <span class="em">üretim standardı.</span>',
      leadHtml: "Dental klinik ve laboratuvar iş akışları için optimize edilmiş güvenilir üretim çözümü.",
      pills: [
        { label: "±20 µm Hassasiyet" },
        { label: "Yüksek Dayanım" },
        { label: "%100 Uyum" },
      ],
      gallery: [],
      selectedPrefix: "Seçiminiz:",
      summarySuffix: "— teknik destek ve kurulum dahil.",
      buyHrefBase: "#",
      whatsappHref: "https://wa.me/905314326577?text=Urun%20hakkinda%20bilgi%20almak%20istiyorum",
      whatsappText: "WhatsApp'tan sor",
      addToCartText: "Sepete ekle",
      addingToCartText: "Ekleniyor...",
      outOfStockText: "Stok yok",
      trustBadges: ["Ücretsiz kargo", "Koşulsuz iade", "Güvenli ödeme"],
    },
  };
}

/** Ratings (Kullanıcı Deneyimi) bölümü için tema varsayılanı */
export function makePlaceholderRatings(): ProductDetailTemplateData {
  return {
    ...makePlaceholderBase(),
    ratings: {
      index: "01",
      label: "KULLANICI DENEYİMİ",
      titleHtml: 'Sahada test edilmiş, <span class="em">kanıtlanmış sonuçlar.</span>',
      sideHtml: "Klinik ve laboratuvar ortamlarında yapılan geri bildirimler doğrultusunda optimize edilmiştir.",
      panelTitleHtml: "Klinik &amp; Laboratuvar Geri Bildirimleri",
      note: "Düzenli geri bildirim anketleri baz alınmıştır.",
      items: [
        { descriptionHtml: "Uygulama hassasiyeti ve tutarlı sonuç memnuniyeti", percent: 98 },
        { descriptionHtml: "İş akışında zaman tasarrufu ve verimlilik artışı", percent: 95 },
        { descriptionHtml: "Teknik destek ve parametre uyumluluğu memnuniyeti" },
      ],
    },
  };
}

/** Metrics (Metrik Daireleri) bölümü için tema varsayılanı */
export function makePlaceholderMetrics(): ProductDetailTemplateData {
  return {
    ...makePlaceholderBase(),
    metrics: {
      index: "02",
      label: "TEKNİK ÖZELLİKLER",
      titleHtml: 'Ölçüsel doğruluk ve <span class="em">yüksek performans.</span>',
      sideHtml: "Dental standartlara tam uyumlu üretim parametreleri.",
      items: [
        { name: "Hassasiyet", value: "±20", unit: "µm", caption: "Tekrarlanabilir boyutsal doğruluk" },
        { name: "Dayanım", value: "Yüksek", caption: "Optimum mekanik stabilite" },
        { name: "Uyumluluk", value: "%100", caption: "Entegre dijital iş akışı desteği" },
      ],
    },
  };
}

/** UseCases (Görsel Metin / Kullanım Alanları) bölümü için tema varsayılanı */
export function makePlaceholderUseCases(): ProductDetailTemplateData {
  return {
    ...makePlaceholderBase(),
    useCases: {
      index: "03",
      label: "UYGULAMA ALANLARI",
      titleHtml: 'Geniş endikasyon ve <span class="em">üretim seçenekleri.</span>',
      sideHtml: "Dental klinik ve laboratuvar ihtiyaçlarına özel tasarlanmış çok yönlü kullanım.",
      photos: [
        {
          src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/deb67f5e-a02a-4fa6-9cb8-595a277d69fd/1080/composite-apps-10.webp",
          alt: "Uygulama örneği 1",
          title: "Hassas Üretim",
          text: "Mikron düzeyinde detay ve pürüzsüz yüzey kalitesi.",
        },
        {
          src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/9d7bb34c-1f0d-4b36-8f0e-ce9a41863d55/1080/composite-apps-11.webp",
          alt: "Uygulama örneği 2",
          title: "Klinik Uyum",
          text: "Hasta konforu ve marjinal uyum için özel optimizasyon.",
        },
        {
          src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1cd726f4-d0ec-4f4b-9407-ca7a84da9961/1080/composite-apps-12.webp",
          alt: "Uygulama örneği 3",
          title: "Dayanıklı Yapı",
          text: "Uzun ömürlü kullanım ve mekanik kararlılık.",
        },
      ],
      cards: [
        {
          eyebrow: "ÖNE ÇIKAN ÖZELLİK",
          title: "Tekrarlanabilir Hassasiyet",
          items: ["Maksimum boyutsal kararlılık", "Kolay temizlik ve finisaj", "Hızlı ve güvenilir parametre ayarları"],
        },
        {
          eyebrow: "İŞ AKIŞI",
          title: "Entegre Dijital Süreç",
          items: ["Tüm popüler yazılımlarla tam uyum", "Minimum malzeme sarfiyatı"],
        },
      ],
      devices: {
        eyebrow: "CİHAZ VE SİSTEM UYUMLULUĞU",
        title: "Tüm modern cihazlarla senkron.",
        textHtml: "Açık sistem mimarisi sayesinde mevcut ekipmanlarınızla sorunsuz çalışır.",
        chips: [
          { label: "MASH P16L", highlighted: true },
          { label: "MASH P1D", highlighted: true },
          { label: "MASH C1E" },
          { label: "MASH W1E" },
          { label: "385nm & 405nm" },
        ],
      },
    },
  };
}

/** FAQ (Sıkça Sorulan Sorular) bölümü için tema varsayılanı */
export function makePlaceholderFaq(): ProductDetailTemplateData {
  return {
    ...makePlaceholderBase(),
    faq: {
      index: "05",
      label: "SIKÇA SORULAN SORULAR",
      titleHtml: 'Merak edilen sorular ve <span class="em">net cevaplar.</span>',
      sideHtml: "Ürün ve entegrasyon süreçleriyle ilgili en çok sorulan konular.",
      openFirst: true,
      items: [
        {
          question: "Bu ürün hangi cihazlarla uyumludur?",
          answerHtml: "3MASH ekosistemindeki tüm cihazlarla ve sektör standardı açık sistem ekipmanlarıyla tam uyumludur.",
        },
        {
          question: "Parametre ve kalibrasyon desteği veriliyor mu?",
          answerHtml: "Evet, satın alım sonrasında teknik ekibimiz ve Mash Academy uzmanlarımız tarafından cihazınıza özel kalibrasyon desteği sağlanır.",
        },
        {
          question: "Teslimat ve garanti koşulları nelerdir?",
          answerHtml: "Tüm siparişler hızlı kargo ve 3MASH teknik servis güvencesiyle sevk edilir.",
        },
      ],
    },
  };
}

/** SpecHighlight (Büyük Görsel / Spec Vurgu) bölümü için tema varsayılanı */
export function makePlaceholderSpecHighlight(): ProductDetailTemplateData {
  return {
    ...makePlaceholderBase(),
    specHighlight: {
      tag: "TEKNİK DETAY",
      titleHtml: 'Üstün performans için <span class="em">mühendislik detayları.</span>',
      descriptionHtml: "Laboratuvar ve klinik standartlarını en üst seviyeye taşımak üzere optimize edilmiş teknik veriler.",
      ctaText: "Detaylı bilgi al →",
      ctaHref: "#satinal",
      rows: [
        { label: "Dalga Boyu", value: "385 nm & 405 nm" },
        { label: "Hassasiyet", value: "±20 µm" },
        { label: "Uygulama", value: "Dental & Medikal" },
        { label: "Garanti", value: "2 Yıl" },
      ],
    },
  };
}
