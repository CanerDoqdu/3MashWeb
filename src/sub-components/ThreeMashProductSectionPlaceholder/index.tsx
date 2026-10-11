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
        { label: tLocalized("Örnek Rozet 1", "Material Grade") },
        { label: tLocalized("Örnek Rozet 2", "Clinical Workflow") },
        { label: tLocalized("Örnek Rozet 3", "CAD/CAM Ready") },
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
        tLocalized("Güven Rozeti 1", "Quality Assured"),
        tLocalized("Güven Rozeti 2", "Clinical Use"),
        tLocalized("Güven Rozeti 3", "Lab Ready"),
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
      label: tLocalized("ÜRÜN ÖZELLİKLERİ", "PRODUCT FEATURES"),
      titleHtml: tLocalized('Buraya ürünün öne çıkan <span class="em">özelliğini yazın.</span>', "Add the product's key <span class=\"em\">feature here.</span>"),
      sideHtml: tLocalized("Buraya ürünün hangi ihtiyacı karşıladığını ve sağladığı faydayı yazın.", "Describe the need this product addresses and its benefit here."),
      panelTitleHtml: tLocalized("Buraya ürünün <span class=\"em\">kullanım avantajlarını yazın.</span>", "Add the product's <span class=\"em\">usage benefits here.</span>"),
      note: tLocalized("Her maddeye ürünün doğrulanmış bir özelliğini veya faydasını ekleyin.", "Add a verified product feature or benefit to each item."),
      items: [
        { descriptionHtml: tLocalized("Buraya ürünün 1. öne çıkan özelliğini veya faydasını yazın.", "Add the product's first key feature or benefit here.") },
        { descriptionHtml: tLocalized("Buraya ürünün 2. öne çıkan özelliğini veya faydasını yazın.", "Add the product's second key feature or benefit here.") },
        { descriptionHtml: tLocalized("Buraya ürünün 3. öne çıkan özelliğini veya faydasını yazın.", "Add the product's third key feature or benefit here.") },
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
      titleHtml: tLocalized('Buraya ürünün teknik özelliklerini anlatan <span class="em">başlığı yazın.</span>', "Add a <span class=\"em\">heading</span> for this product's technical specifications."),
      sideHtml: tLocalized("Her karta teknik özellik adını, doğrulanmış değerini ve gerekiyorsa birimini girin.", "For each card, enter the specification name, verified value, and unit if applicable."),
      items: [
        { name: tLocalized("Buraya 1. teknik özellik adını yazın.", "Add the first specification name here."), value: tLocalized("Değeri girin", "Add value"), caption: tLocalized("Buraya bu teknik değere ait kısa açıklamayı yazın.", "Add a short explanation of this specification here.") },
        { name: tLocalized("Buraya 2. teknik özellik adını yazın.", "Add the second specification name here."), value: tLocalized("Değeri girin", "Add value"), caption: tLocalized("Buraya bu teknik değere ait kısa açıklamayı yazın.", "Add a short explanation of this specification here.") },
        { name: tLocalized("Buraya 3. teknik özellik adını yazın.", "Add the third specification name here."), value: tLocalized("Değeri girin", "Add value"), caption: tLocalized("Buraya bu teknik değere ait kısa açıklamayı yazın.", "Add a short explanation of this specification here.") },
      ],
    },
    specHighlight: {
      tag: tLocalized("ÖNE ÇIKAN DETAY", "FEATURED DETAIL"),
      titleHtml: tLocalized('Buraya ürünün öne çıkan <span class="em">teknik detayını yazın.</span>', "Add the product's <span class=\"em\">key technical detail here.</span>"),
      descriptionHtml: tLocalized("Buraya ürünün doğrulanmış önemli bir özelliğini ve müşteriye sağladığı faydayı açıklayın.", "Describe a verified product feature and the benefit it provides here."),
      ctaText: tLocalized("Buraya buton metnini yazın →", "Add button text here →"),
      ctaHref: "",
      rows: [],
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
      titleHtml: tLocalized('Buraya ürünün kullanım alanlarını anlatan <span class="em">başlığı yazın.</span>', "Add a <span class=\"em\">heading</span> describing this product's applications."),
      sideHtml: tLocalized("Görselleri, başlıkları ve açıklamaları ürünün gerçek kullanım senaryolarına göre ekleyin.", "Add images, titles, and descriptions for the product's actual use cases."),
      photos: [
        {
          src: "",
          alt: tLocalized("Ürünün 1. kullanım görseli", "Product application image 1"),
          title: tLocalized("Buraya 1. kullanım görselinin başlığını yazın.", "Add the first application image title here."),
          text: tLocalized("Bu alana 1. kullanım görselini ekleyin ve ne gösterdiğini açıklayın.", "Add the first application image here and describe what it shows."),
        },
        {
          src: "",
          alt: tLocalized("Ürünün 2. kullanım görseli", "Product application image 2"),
          title: tLocalized("Buraya 2. kullanım görselinin başlığını yazın.", "Add the second application image title here."),
          text: tLocalized("Bu alana 2. kullanım görselini ekleyin ve ne gösterdiğini açıklayın.", "Add the second application image here and describe what it shows."),
        },
        {
          src: "",
          alt: tLocalized("Ürünün 3. kullanım görseli", "Product application image 3"),
          title: tLocalized("Buraya 3. kullanım görselinin başlığını yazın.", "Add the third application image title here."),
          text: tLocalized("Bu alana 3. kullanım görselini ekleyin ve ne gösterdiğini açıklayın.", "Add the third application image here and describe what it shows."),
        },
      ],
      cards: [
        {
          eyebrow: tLocalized("KULLANIM ALANI 1", "APPLICATION 1"),
          title: tLocalized("Buraya 1. kullanım alanının başlığını yazın.", "Add the first application title here."),
          items: [
              tLocalized("Buraya 1. kullanım detayı yazın.", "Add the first application detail here."),
              tLocalized("Buraya 2. kullanım detayı yazın.", "Add the second application detail here."),
              tLocalized("Buraya 3. kullanım detayı yazın.", "Add the third application detail here."),
          ],
        },
        {
          eyebrow: tLocalized("KULLANIM ALANI 2", "APPLICATION 2"),
          title: tLocalized("Buraya 2. kullanım alanının başlığını yazın.", "Add the second application title here."),
          items: [
              tLocalized("Buraya 1. kullanım detayı yazın.", "Add the first application detail here."),
              tLocalized("Buraya 2. kullanım detayı yazın.", "Add the second application detail here."),
          ],
        },
      ],
      devices: {
        eyebrow: tLocalized("UYUMLULUK", "COMPATIBILITY"),
        title: tLocalized("Buraya ürünün uyumlu olduğu cihaz veya sistemleri yazın.", "Add the devices or systems compatible with this product here."),
        textHtml: tLocalized("Buraya ürünün uyumluluk koşullarını ve gerekli teknik bilgileri yazın.", "Add the product's compatibility requirements and technical information here."),
        chips: [],
      },
    },
    ecosystem: {
      index: "04",
      label: tLocalized("SİSTEM UYUMLULUĞU", "SYSTEM COMPATIBILITY"),
      titleHtml: tLocalized('Buraya ürünün birlikte çalıştığı <span class="em">sistemleri yazın.</span>', 'Add the <span class="em">systems this product works with.</span>'),
      textHtml: tLocalized("Uyumlu ürün, cihaz veya yazılım adlarını ve varsa bağlantılarını ekleyin.", "Add compatible product, device, or software names and links if available."),
      chips: [],
      buttons: [],
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
      titleHtml: tLocalized('Buraya ürünün <span class="em">sıkça sorulan sorular</span> başlığını yazın.', "Add the <span class=\"em\">frequently asked questions</span> heading here."),
      sideHtml: tLocalized("Soru alanlarına müşterilerin ürünü almadan önce merak edebileceği konuları, yanıt alanlarına doğru bilgileri ekleyin.", "Add common pre-purchase questions and accurate answers in the question and answer fields."),
      openFirst: true,
      items: [
        {
          question: tLocalized("Buraya ürünle ilgili sık sorulan 1. soruyu yazın.", "Add the first frequently asked question about this product here."),
          answerHtml: tLocalized("Buraya 1. sorunun yanıtını yazın.", "Add the answer to question 1 here."),
        },
        {
          question: tLocalized("Buraya ürünle ilgili sık sorulan 2. soruyu yazın.", "Add the second frequently asked question about this product here."),
          answerHtml: tLocalized("Buraya 2. sorunun yanıtını yazın.", "Add the answer to question 2 here."),
        },
        {
          question: tLocalized("Buraya ürünle ilgili sık sorulan 3. soruyu yazın.", "Add the third frequently asked question about this product here."),
          answerHtml: tLocalized("Buraya 3. sorunun yanıtını yazın.", "Add the answer to question 3 here."),
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
      titleHtml: tLocalized('Buraya ürünün öne çıkan <span class="em">teknik detayını yazın.</span>', "Add the product's <span class=\"em\">key technical detail here.</span>"),
      descriptionHtml: tLocalized("Buraya ürünün doğrulanmış önemli bir özelliğini ve müşteriye sağladığı faydayı açıklayın.", "Describe a verified product feature and the benefit it provides here."),
      ctaText: tLocalized("Buraya buton metnini yazın →", "Add button text here →"),
      ctaHref: "",
      rows: [],
    },
  };
}
