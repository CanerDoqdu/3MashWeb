import { useEffect, useLayoutEffect, useMemo, useState } from "preact/hooks";
import {
  publishCartFromIkasStore,
  refreshGlobalCart,
} from "../cartState";

import {
  addItemToCart,
  getDefaultSrc,
  getDisplayedProductVariantTypes,
  getProductFirstCategory,
  getProductHref,
  getProductListInitialData,
  getProductOptionSet,
  getProductVariantFormattedFinalPrice,
  getProductVariantFormattedSellPrice,
  getProductVariantMainImage,
  getSelectedProductVariant,
  hasProductStock,
  hasProductValidOptionValues,
  hasProductVariantDiscount,
  hasProductVariantStock,
  initProductList,
  initProductOnBrowser,
  initProductOptionSetValues,
  isAddToCartEnabled,
  selectVariantValue,
  type IkasProduct,
  type IkasProductList,
  type IkasProductVariant,
  getCart,
} from "@ikas/bp-storefront";
import ThreeMashProductDetailTemplate, {
  ProductDetailHeroSection,
  ProductDetailSectionScope,
  productAnnouncementPayload,
  type ProductDetailTemplateData,
  type ProductGalleryItem,
  type ProductDetailRelatedProduct,
  type ProductVariantGroup,
} from "../../sub-components/ThreeMashProductDetailTemplate";
import { publishSharedProductDetailData, resolveProductDetailData } from "../../sub-components/ThreeMashProductDetailData";
import { rememberOrderLineImageFallback } from "../ThreeMashOrderLineImage";
import { Props } from "./types";

type PlainObject = Record<string, unknown>;
type PreviewSelection = Record<string, string>;

const CRS_COMPOSITE_SLUG = "crs-composite-mukemmel-dayanimli-gecici-recinesi";

const CRS_GALLERY: ProductGalleryItem[] = [
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/d875a523-2228-44a7-818d-022312b0a44d/1080/composite-resin-ce.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/d875a523-2228-44a7-818d-022312b0a44d/540/composite-resin-ce.webp",
    alt: "CRS Composite CE Class IIa sertifikalı geçici ve daimi reçinesi",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/deb67f5e-a02a-4fa6-9cb8-595a277d69fd/1080/composite-apps-10.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/deb67f5e-a02a-4fa6-9cb8-595a277d69fd/540/composite-apps-10.webp",
    alt: "CRS Composite kron uygulaması",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/9d7bb34c-1f0d-4b36-8f0e-ce9a41863d55/1080/composite-apps-11.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/9d7bb34c-1f0d-4b36-8f0e-ce9a41863d55/540/composite-apps-11.webp",
    alt: "CRS Composite köprü uygulaması",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1cd726f4-d0ec-4f4b-9407-ca7a84da9961/1080/composite-apps-12.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1cd726f4-d0ec-4f4b-9407-ca7a84da9961/540/composite-apps-12.webp",
    alt: "CRS Composite restorasyon",
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/0c8743e4-abb5-4d0b-854c-3a4f5a46b686/1080/sand-model-gecici-4.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/0c8743e4-abb5-4d0b-854c-3a4f5a46b686/540/sand-model-gecici-4.webp",
    alt: "CRS Composite model üzerinde geçici",
  },
];

const CRS_COMPOSITE_TEMPLATE: ProductDetailTemplateData = {
  key: CRS_COMPOSITE_SLUG,
  announcement: {
    enabled: true,
    strongText: "Fırsatı kaçırmayın.",
    longText: "CE Class IIa CRS Composite'i cihazınızın parametreleriyle birlikte kalibre ederek, ücretsiz kurulum desteğiyle teslim ediyoruz.",
    ctaText: "Ücretsiz parametre uyumlaması →",
    ctaHref: "#satinal",
  },
  breadcrumb: {
    homeText: "Ana sayfa",
    homeHref: "/",
    categoryText: "Dental Reçineler",
    categoryHref: "/dental-3d-yazici-recineleri",
    productText: "CRS Composite",
  },
  hero: {
    kicker: "CRS Composite · Biyouyumlu Kron-Köprü Reçinesi",
    titleHtml: 'Daimi kron artık <span class="em">baskıdan</span> çıkıyor.',
    leadHtml:
      "Geçici ve daimi kuron-köprülerin katmanlı üretimi için biyouyumlu reçine. Sektörde önde gelen rakiplerine kıyasla <b>daha yüksek bükülme mukavemeti</b> ve hassas marjinal uyum sağlar; yarı saydamlık-opaklık arasında dengeli translüsentliğe sahiptir. Ağız koşullarına dayanıklıdır, tat ve koku yapmaz.",
    pills: [
      { value: "144 MPa", label: "eğilme mukavemeti" },
      { value: "5000 MPa", label: "eğilme modülü" },
      { value: "CE", label: "Class IIa" },
      { label: "Sararma yapmaz" },
    ],
    galleryBadge: "CE CLASS IIa",
    gallery: CRS_GALLERY,
    selectedPrefix: "Seçiminiz:",
    summarySuffix: "— parametre uyumlaması ve teknik destek dahil.",
    buyHrefBase: "/crs-composite-mukemmel-dayanimli-gecici-recinesi",
    whatsappHref: "https://wa.me/905314326577?text=CRS%20Composite%20hakkında%20bilgi%20almak%20istiyorum",
    whatsappText: "WhatsApp'tan sor",
    addToCartText: "Sepete ekle →",
    addingToCartText: "Ekleniyor...",
    outOfStockText: "Stok yok",
    trustBadges: ["Ücretsiz kargo", "Koşulsuz iade", "Güvenli ödeme"],
  },
  ratings: {
    index: "01",
    label: "Kullanıcı Deneyimi",
    titleHtml: 'Biyouyumlu <span class="hl">geçici ve daimi</span> reçinesi.',
    sideHtml: "CRS Composite, <b>CE Class IIa</b> sertifikalı toksik olmayan formülasyonu sayesinde ağız içinde güvenle kullanılabilir.",
    panelTitleHtml: "CRS Composite'i satın alanlar <span class=\"em\">nasıl değerlendirdi?</span>",
    note: "Ürünü satın alan kullanıcıların geri bildirimlerine göre.",
    items: [
      { descriptionHtml: "Baskı sonrası kürleme işleminde <b>sararma yapmadığını</b> söyledi", percent: 99 },
      { descriptionHtml: "<b>Yüksek mekanik dayanımı</b> sayesinde kırılmadan uzun süre kullanılabildiğini söyledi", percent: 97 },
      { descriptionHtml: "<b>Şırınga dolgu malzemesiyle yüksek uyum</b> sayesinde hasta ağzında geçici diş üzerinde değişiklik yapabildiğini söyledi", percent: 95 },
    ],
  },
  metrics: {
    index: "02",
    label: "Teknik Özellikler",
    titleHtml: 'Baskı sonrası <span class="em">sararma yapmaz</span>, kalıcıda kullanılır.',
    sideHtml:
      "CRS Composite, kalıcı uygulamada kullanıldığını iddia eden rakip markalara göre daha yüksek dayanım sunar ve kürleme sonrası sararmaz. Değerler ISO 10477 standardına göredir.",
    items: [
      {
        name: "Eğilme Mukavemeti",
        value: "144",
        unit: "MPa",
        tag: "ISO 10477",
        caption: "Kalıcı restorasyon iddiası taşıyan birçok geçici reçinenin üzerinde; kırılmadan uzun süre kullanım.",
      },
      {
        name: "Eğilme Modülü",
        value: "5000",
        unit: "MPa",
        tag: "ISO 10477",
        caption: "Yüksek rijitlik: fonksiyon altında bükülmeye direnç, stabil oklüzyon.",
      },
      {
        name: "Biyouyumluluk",
        value: "CE",
        unit: "Class IIa",
        tag: "MDR",
        caption: "Ağız içinde belirli süre temas eden tıbbi cihaz sınıfı; toksik olmayan formülasyon.",
      },
    ],
  },
  specHighlight: {
    tag: "CRS COMPOSITE · CE CLASS IIa · MDR",
    titleHtml: 'Porselen estetiği, <span class="em">marka bağımsız glaze.</span>',
    descriptionHtml:
      "CE Class IIa sertifikalı, toksik olmayan formülasyonu sayesinde ağız içinde güvenle kullanılır. Yarı saydamlık ve opaklık arasında mükemmel bir translüsent dengeye sahiptir; marka ve renk ayırt etmeksizin <b>optik glaze</b> yapılabilir. Ağız koşullarına dayanıklıdır, <b>tat ve koku yapmaz.</b>",
    ctaText: "Renk ve boyut seç →",
    ctaHref: "#satinal",
    rows: [
      { label: "Eğilme mukavemeti", value: "144 MPa" },
      { label: "Eğilme modülü", value: "5000 MPa" },
      { label: "Sertifikasyon", value: "CE Class IIa (MDR)" },
      { label: "Uygulama", value: "Geçici + daimi" },
      { label: "Uyum", value: "Tüm DLP / LCD" },
    ],
  },
  useCases: {
    index: "03",
    label: "Uygulama & Uyumluluk",
    titleHtml: 'Nerede kullanılır, <span class="em">neyle çalışır?</span>',
    sideHtml: "Hepsi tek bakışta: uygulama alanları, öne çıkan özellikler ve uyumlu 3D yazıcılar.",
    photos: [
      { src: CRS_GALLERY[1].src, alt: "CRS Composite ile üretilmiş kron restorasyonu", title: "Aynı gün kron", text: "Porselen benzeri güç ve estetik, tek seansta." },
      { src: CRS_GALLERY[2].src, alt: "CRS Composite ile üretilmiş köprü restorasyonu", title: "Köprü restorasyonları", text: "144 MPa dayanım; kırılmadan uzun süre kullanım." },
      { src: CRS_GALLERY[4].src, alt: "Model üzerinde CRS Composite geçici restorasyon", title: "Model üzerinde uyum", text: "Hassas marjinal uyum, net kole hatları." },
    ],
    cards: [
      {
        eyebrow: "Uygulama Alanları",
        title: "Hangi restorasyonlar?",
        items: [
          "Porselen benzeri güç ve güzelliğe sahip <b>aynı gün kron ve köprüler</b>",
          "Çok çeşitli <b>kalıcı ve geçici</b> diş restorasyonları",
          "Çıkarılabilir total protezler için <b>vakaya özel</b> tasarlanmış kuron ve köprüler",
        ],
        note: "Vakanıza uygun tasarım parametrelerini ücretsiz paylaşıyoruz.",
      },
      {
        eyebrow: "Öne Çıkan Özellikler",
        title: "Neden CRS Composite?",
        items: [
          "Yarı saydamlık-opaklık arasında dengeli <b>translüsentlik</b>",
          "Marka ve renk ayırt etmeksizin <b>optik glaze</b>",
          "Ağız koşullarına dayanıklı; <b>tat ve koku yapmaz</b>",
          "<b>CE Class IIa</b> biyouyumlu, toksik olmayan formülasyon",
        ],
      },
    ],
    devices: {
      eyebrow: "Uyumlu Cihazlar",
      title: "Tüm DLP & LCD yazıcılarla çalışır",
      textHtml:
        "Custom Resin Solutions <b>resmi distribütörü</b> olarak; kullandığınız 3D yazıcı markası fark etmeksizin, parametre uyumlama işlemini <b>ücretsiz</b> gerçekleştiriyoruz. Satış sonrası kullanıcı eğitimleri ve <b>7/24 teknik destek</b> ile yanınızdayız.",
      chips: [
        { label: "Creality Halot-Sky" },
        { label: "Phrozen Mini 8K" },
        { label: "Asiga Max UV" },
        { label: "Anycubic Photon Mono" },
        { label: "SprintRay Pro S" },
        { label: "Shining AccuFab-D1" },
        { label: "Nova Bene 4" },
        { label: "Ackuretta Dentiq" },
        { label: "Elegoo Mars 3" },
        { label: "+ tüm DLP / LCD markaları", highlighted: true },
      ],
    },
  },
  ecosystem: {
    index: "04",
    label: "Ekosistem",
    titleHtml: 'Reçine tek başına yeterli değil: <span class="em">kürleme sonucu tamamlar.</span>',
    textHtml:
      "CRS Composite'in 144 MPa dayanımını ve sararmasız rengini ortaya çıkaran şey, doğru <b>post-curing</b> protokolüdür. Reçineyi cihazınızın parametreleriyle birlikte kalibre ederek teslim ediyoruz; akıllı kürleme cihazımız bu protokolü otomatik uygular.",
    chips: ["385 nm optimize baskı", "Doğru post-curing protokolü", "Marka bağımsız kalibrasyon", "7/24 teknik destek"],
    buttons: [
      { text: "3D yazıcıları gör →", href: "/3d-yazicilar" },
      { text: "Kürlemenin önemini gör →", href: "/yikama-kurleme-cihazlari#neden-gerekli", variant: "line" },
    ],
  },
  faq: {
    index: "05",
    label: "Sık Sorulan Sorular",
    titleHtml: 'CRS Composite hakkında <span class="em">merak edilenler.</span>',
    sideHtml: "Klinik ve laboratuvarların CRS Composite için en çok sorduğu sorular, net cevaplarla.",
    openFirst: true,
    items: [
      {
        question: "1 kg CRS Composite reçinesinden kaç üye iş alabiliriz?",
        answerHtml:
          "Bu, restorasyonun boyutuna, duvar kalınlığına ve destek yapılarına göre değişir. Tek bir kron ünitesi ortalama olarak birkaç mililitre reçine tüketir; 1 kg reçineden genellikle <b>yüzlerce üye</b> üretilebilir.",
      },
      {
        question: "CRS Composite reçinesinin kırılma direnci nedir?",
        answerHtml:
          "CRS Composite, ISO 10477 standardına göre <b>144 MPa eğilme mukavemeti</b> ve <b>5000 MPa eğilme modülü</b> sunar.",
      },
      {
        question: "CRS Composite hasta ağzında tat veya koku bırakır mı?",
        answerHtml: "Hayır. CRS Composite <b>ağız koşullarına dayanıklıdır, tat ve koku yapmaz.</b>",
      },
      {
        question: "Dirençli olması için tavsiye edilen tasarım parametreleri nelerdir?",
        answerHtml:
          "Dayanım için <b>yeterli minimum duvar kalınlığı</b>, köprülerde uygun konnektör kesiti, doğru baskı yönü ve reçineye özel doğru post-curing süresi kritik önemdedir.",
      },
      {
        question: "Klinik uygulamalar için şırınga kompozitler ile uyumlu mudur?",
        answerHtml:
          "Evet. CRS Composite, <b>şırınga dolgu malzemesiyle yüksek uyum</b> gösterir; hasta ağzında geçici diş üzerinde ekleme ve düzeltme yapılabilir.",
      },
    ],
  },
  video: {
    index: "06",
    label: "Videoda Gör",
    titleHtml: 'Baskıdan ağza: <span class="em">süreci izleyin.</span>',
    sideHtml: "Tasarımdan baskıya, kürlemeden glaze'e; CRS Composite ile tek seans kron-köprü akışının tamamı.",
    href: "https://www.youtube.com/@3mashsocial",
    image: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1cd726f4-d0ec-4f4b-9407-ca7a84da9961/3840/composite-apps-12.webp",
    imageAlt: "CRS Composite uygulama videosu",
    title: "CRS Composite ile tek seans kron-köprü",
    text: "Baskı parametreleri, post-curing protokolü ve optik glaze adımları; uygulamalı anlatım.",
    meta: "Mash Academy · YouTube'da izle",
  },
  related: {
    index: "07",
    label: "İlgili Reçineler",
    titleHtml: 'Aynı vakada <span class="em">birlikte çalışanlar.</span>',
    items: [
      {
        tag: "HASSASİYET",
        title: "CRS Model",
        descriptionHtml: "Kron-köprü öncesi master model. Belirgin <b>kole hatları</b>, net marjinal uyum.",
        href: "/crs-model-yuksek-hassasiyetli-model-recinesi",
        linkText: "İncele",
        background: "linear-gradient(160deg,#EFE7D3,#fff)",
      },
      {
        tag: "CE CLASS IIa",
        tagVariant: "ce",
        title: "CRS Denture",
        descriptionHtml: "Çıkarılabilir protez tabanı; PMMA'ya kıyasla <b>düşük çekme</b>, cila + glaze uyumlu.",
        href: "/crs-denture-biouyumlu-protez-recinesi",
        linkText: "İncele",
        background: "linear-gradient(160deg,#F6E3E4,#fff)",
      },
      {
        tag: "YIRTILMAZ",
        title: "CRS Gingiva",
        descriptionHtml: "İmplant modeli ve diş eti maskesi. Yüksek yırtılma direnci, doğal diş eti rengi.",
        href: "/crs-gingiva-yirtilmaz-dis-eti-recinesi",
        linkText: "İncele",
        background: "linear-gradient(160deg,#F5DEE0,#fff)",
      },
      {
        tag: "TÜM HAT",
        title: "Tüm reçineler",
        descriptionHtml: "16 CRS & Mash reçinesini uygulamaya göre karşılaştırın; doğru reçineyi seçin.",
        href: "/dental-3d-yazici-recineleri",
        linkText: "Reçine seçici",
        background: "linear-gradient(160deg,#EEEEE9,#fff)",
      },
    ],
  },
  finalCta: {
    titleHtml: "CRS Composite'i cihazınıza <span class=\"em\">birlikte kalibre edelim.</span>",
    textHtml:
      "Hangi yazıcı, hangi vaka, hangi renk? Kısa bir görüşmeyle CRS Composite'i cihazınızın parametreleriyle eşleştirip doğru kürleme protokolüyle birlikte <b>ücretsiz</b> teslim edelim.",
    primaryText: "Renk ve boyut seç ↑",
    primaryHref: "#satinal",
    secondaryText: "Uzmana danış — ücretsiz",
    secondaryHref: "/pages/iletisim",
  },
};

function isPlainObject(value: unknown): value is PlainObject {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function stringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function slugify(value?: string) {
  return (value || "")
    .toLocaleLowerCase("tr")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function plainText(value?: string) {
  return (value || "")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function summaryText(product: IkasProduct) {
  const source = (product as unknown as { shortDescription?: string }).shortDescription || product.description || "";
  const text = plainText(source);
  if (!text) return "";
  return text.length > 260 ? `${text.slice(0, 260).trim()}...` : text;
}

function selectedVariant(product: IkasProduct): IkasProductVariant | null {
  try {
    return getSelectedProductVariant(product) || product.variants?.[0] || null;
  } catch {
    return product.variants?.[0] || null;
  }
}

function allVariantMedia(variant: IkasProductVariant | null) {
  return variant?.images || [];
}

function isMediaVideo(media: unknown) {
  const item = media as { isVideo?: unknown; image?: { isVideo?: unknown } } | undefined;
  return item?.isVideo === true || item?.image?.isVideo === true;
}

function categoryName(category: unknown) {
  const data = category as { name?: unknown; title?: unknown } | undefined;
  return stringValue(data?.name) || stringValue(data?.title);
}

function categoryId(category: unknown) {
  const data = category as { id?: unknown; categoryId?: unknown; value?: unknown } | undefined;
  return stringValue(data?.id) || stringValue(data?.categoryId) || stringValue(data?.value);
}

function categoryHref(category: unknown) {
  const data = category as { href?: unknown; path?: unknown; slug?: unknown; name?: unknown; title?: unknown } | undefined;
  const href = stringValue(data?.href);
  const path = stringValue(data?.path);
  const slug = stringValue(data?.slug);
  const name = categoryName(category);
  if (href) return href;
  if (path) return path.startsWith("/") ? path : `/${path}`;
  if (slug) return slug.startsWith("/") ? slug : `/${slug}`;
  return name ? `/${slugify(name)}` : "/";
}

function firstProductCategory(product: IkasProduct | null) {
  if (!product) return null;
  try {
    return getProductFirstCategory(product) || product.categories?.[0] || null;
  } catch {
    return product.categories?.[0] || null;
  }
}

function categoryProductList(product: IkasProduct | null, limit: number): IkasProductList | undefined {
  const id = categoryId(firstProductCategory(product));
  if (!id) return undefined;
  return initProductList({
    type: "CATEGORY",
    sort: "DEFAULT",
    limit,
    pageType: "CATEGORY",
    filterCategoryId: id,
    productListPropValue: {
      id: `product-detail-related-${id}`,
      productListType: "CATEGORY",
      initialSort: "DEFAULT",
      initialLimit: limit,
      productCount: null,
      productIds: [],
      usePageFilter: false,
      category: id,
      brand: null,
      relatedProductsType: null,
    },
  });
}

function listProducts(productList: IkasProductList | undefined) {
  if (!productList) return [];
  const list = productList as IkasProductList & { products?: unknown[]; items?: unknown[] };
  const raw = [
    ...(Array.isArray(list.data) ? list.data : []),
    ...(Array.isArray(list.products) ? list.products : []),
    ...(Array.isArray(list.items) ? list.items : []),
  ];
  const seen = new Set<string>();
  return raw
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const source = item as { name?: unknown; product?: unknown; value?: unknown };
      if (typeof source.name === "string") return source as IkasProduct;
      if (source.product && typeof source.product === "object" && typeof (source.product as { name?: unknown }).name === "string") {
        return source.product as IkasProduct;
      }
      if (source.value && typeof source.value === "object" && typeof (source.value as { name?: unknown }).name === "string") {
        return source.value as IkasProduct;
      }
      return null;
    })
    .filter((item): item is IkasProduct => {
      if (!item || !item.id || seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
}

function relatedProduct(product: IkasProduct): ProductDetailRelatedProduct {
  const variant = selectedVariant(product);
  const media = variant ? getProductVariantMainImage(variant) : undefined;
  const image = media?.image ? getDefaultSrc(media.image) : "";
  const description = summaryText(product);
  return {
    id: product.id,
    title: product.name,
    href: getProductHref(product) || `/${productSlug(product)}`,
    image,
    imageAlt: media?.image?.altText || product.name,
    category: categoryName(firstProductCategory(product)) || product.brand?.name || "",
    descriptionHtml: description ? escapeHtml(description.length > 118 ? `${description.slice(0, 117).trimEnd()}...` : description) : "",
  };
}

function productSlug(product: IkasProduct | null) {
  const data = product as unknown as { slug?: unknown; handle?: unknown; url?: unknown; path?: unknown } | null;
  const raw = stringValue(data?.slug) || stringValue(data?.handle) || stringValue(data?.url) || stringValue(data?.path) || (product ? slugify(product.name) : "");
  const productDataSlug = raw.toLocaleLowerCase("tr").replace(/^\/+|\/+$/g, "").split("/").pop();
  if (productDataSlug) return productDataSlug;
  if (typeof window === "undefined") return "";
  return window.location.pathname.toLocaleLowerCase("tr").replace(/^\/+|\/+$/g, "").split("/").pop() || "";
}

function isCrsComposite(product: IkasProduct | null) {
  const slug = productSlug(product);
  const name = slugify(product?.name || "");
  return slug === CRS_COMPOSITE_SLUG || name.includes("crs-composite") || name.includes("custom-composite-resin");
}

function cssColorValue(value: unknown): string {
  if (typeof value !== "string") return "";
  const text = value.trim();
  if (/^(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(text)) return `#${text}`;
  return /^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(text) ? text : "";
}

function normalizedVariantText(value: string | undefined) {
  return (value || "").toLocaleLowerCase("tr").replace(/\s+/g, " ").trim();
}

function normalizedVariantKey(value: string | undefined) {
  return normalizedVariantText(value)
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9.]+/g, "");
}

const SHADE_COLORS: Record<string, string> = {
  a1: "#f3ede0",
  a2: "#efe4cf",
  a3: "#e8d7b8",
  "a3.5": "#e0cba6",
  b1: "#f4efe2",
  b2: "#ebe3c7",
  b3: "#e1d7b2",
  sand: "#ebc686",
  gray: "#767a83",
  grey: "#767a83",
  white: "#ffffff",
};

function colorForVariantValue(product: IkasProduct, variantType: unknown, variantValue: unknown) {
  const direct = isPlainObject(variantValue) ? cssColorValue(variantValue.colorCode) : "";
  if (direct) return direct;

  const valueName = isPlainObject(variantValue) && typeof variantValue.name === "string" ? variantValue.name : "";
  const shadeColor = SHADE_COLORS[normalizedVariantKey(valueName)];
  if (shadeColor) return shadeColor;

  const valueId = isPlainObject(variantValue) && typeof variantValue.id === "string" ? variantValue.id : "";
  if (!valueId) return "";

  const typeData = variantType as { variantType?: { values?: unknown[] } } | undefined;
  const typeMatch = typeData?.variantType?.values?.find((value) => isPlainObject(value) && value.id === valueId);
  const typeColor = isPlainObject(typeMatch) ? cssColorValue(typeMatch.colorCode) : "";
  if (typeColor) return typeColor;

  for (const productVariantType of product.variantTypes || []) {
    const match = productVariantType.variantType.values?.find((value) => value.id === valueId);
    const color = isPlainObject(match) ? cssColorValue(match.colorCode) : "";
    if (color) return color;
  }

  return "";
}

function uniqueDisplayedVariantValues<T extends { variantValue?: { id?: string; name?: string }; isSelected?: boolean; hasStock?: boolean }>(items: T[]) {
  const values = new Map<string, T>();
  for (const item of items) {
    const name = item.variantValue?.name || "";
    const key = normalizedVariantKey(name) || item.variantValue?.id || name;
    const current = values.get(key);
    if (!current || item.isSelected || (!current.hasStock && item.hasStock)) values.set(key, item);
  }
  return Array.from(values.values());
}

function imageValue(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (!isPlainObject(value)) return "";
  const candidates = [
    value.url,
    value.src,
    value.imageUrl,
    value.thumbnailUrl,
    value.value,
    isPlainObject(value.image) ? value.image.url || value.image.src : "",
    isPlainObject(value.file) ? value.file.url || value.file.src : "",
  ];
  const found = candidates.find((candidate) => typeof candidate === "string" && candidate.trim());
  return typeof found === "string" ? found.trim() : "";
}

function customValuePayload(value: unknown): unknown {
  if (!isPlainObject(value)) return value;
  const nested = value.value ?? value.text ?? value.html ?? value.richText ?? value.content ?? value.url ?? value.src ?? value.imageUrl ?? value.file ?? value.image;
  return nested === undefined ? value : nested;
}

function normalizedKey(value: unknown) {
  return stringValue(value)
    .toLocaleLowerCase("tr")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function customField(product: IkasProduct, keys: string[]) {
  const wanted = new Set(keys.map(normalizedKey));
  const source = product as unknown as PlainObject;
  for (const key of keys) if (source[key] !== undefined) return customValuePayload(source[key]);

  const containers = [source.customFields, source.customFieldValues, source.productCustomFields, source.attributes, source.productAttributes, source.metafields, source.metaFields];
  for (const container of containers) {
    if (Array.isArray(container)) {
      for (const item of container) {
        if (!isPlainObject(item)) continue;
        const aliases = [
          item.key,
          item.code,
          item.name,
          item.slug,
          item.handle,
          item.fieldName,
          item.title,
          isPlainObject(item.customField) ? item.customField.key || item.customField.code || item.customField.name : "",
          isPlainObject(item.field) ? item.field.key || item.field.code || item.field.name : "",
        ];
        if (aliases.some((alias) => wanted.has(normalizedKey(alias)))) return customValuePayload(item);
      }
      continue;
    }
    if (isPlainObject(container)) {
      for (const [key, value] of Object.entries(container)) {
        if (wanted.has(normalizedKey(key))) return customValuePayload(value);
      }
    }
  }
  return undefined;
}

function customJson(product: IkasProduct) {
  const source = customField(product, ["three_mash_product_detail_json", "product_detail_template_json", "single_product_template_json"]);
  return parseTemplateJson(source);
}

function parseTemplateJson(source: unknown) {
  const text = typeof source === "string" ? source.trim() : "";
  if (!text) return undefined;
  try {
    const parsed = JSON.parse(text);
    return isPlainObject(parsed) ? parsed : undefined;
  } catch {
    return undefined;
  }
}

function trimmedText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function linkValue(source: unknown) {
  if (typeof source === "string") return source.trim();
  if (!source || typeof source !== "object") return "";
  const link = source as {
    href?: unknown;
    externalLink?: unknown;
    fileUrl?: unknown;
    pageId?: unknown;
    label?: unknown;
  };
  if (typeof link.href === "string" && link.href.trim()) return link.href.trim();
  if (typeof link.externalLink === "string" && link.externalLink.trim()) return link.externalLink.trim();
  if (typeof link.fileUrl === "string" && link.fileUrl.trim()) return link.fileUrl.trim();
  if (link.pageId === "2tplvqpo-search-page") return "/search";
  if (link.pageId === "2tplvqpo-contact-page") return "/pages/iletisim";
  if (link.pageId === "2tplvqpo-references-page") return "/pages/referanslar";
  if (link.label === "Arama Sayfası") return "/search";
  if (link.label === "iletişim" || link.label === "İletişim") return "/pages/iletisim";
  return "";
}

function productDetailPropOverrides(props: Props) {
  const announcement: PlainObject = {};
  const breadcrumb: PlainObject = {};
  const hero: PlainObject = {};

  const announcementStrongText = trimmedText(props.announcementStrongText);
  if (announcementStrongText) {
    announcement.enabled = true;
    announcement.strongText = announcementStrongText;
  }

  const announcementText = trimmedText(props.announcementText);
  if (announcementText) {
    announcement.enabled = true;
    announcement.longText = announcementText;
  }

  const announcementButtonText = trimmedText(props.announcementButtonText);
  if (announcementButtonText) {
    announcement.enabled = true;
    announcement.ctaText = announcementButtonText;
  }

  const announcementButtonHref = linkValue(props.announcementButtonHref);
  if (announcementButtonHref) {
    announcement.enabled = true;
    announcement.ctaHref = announcementButtonHref;
  }

  const breadcrumbCategoryText = trimmedText(props.breadcrumbCategoryText || props.categoryText);
  if (breadcrumbCategoryText && breadcrumbCategoryText !== "Kategori") breadcrumb.categoryText = breadcrumbCategoryText;

  const breadcrumbCategoryHref = linkValue(props.breadcrumbCategoryHref);
  if (breadcrumbCategoryHref) breadcrumb.categoryHref = breadcrumbCategoryHref;

  const heroKicker = trimmedText(props.heroKicker);
  if (heroKicker) hero.kicker = heroKicker;

  const heroTitleHtml = trimmedText(props.heroTitleHtml);
  if (heroTitleHtml) hero.titleHtml = heroTitleHtml;

  const heroDescriptionHtml = trimmedText(props.heroDescriptionHtml);
  if (heroDescriptionHtml) hero.leadHtml = heroDescriptionHtml;

  const heroPill1Label = trimmedText(props.heroPill1Label);
  const heroPill1Value = trimmedText(props.heroPill1Value);
  const heroPill2Label = trimmedText(props.heroPill2Label);
  const heroPill2Value = trimmedText(props.heroPill2Value);
  const heroPill3Label = trimmedText(props.heroPill3Label);
  const heroPill3Value = trimmedText(props.heroPill3Value);
  const heroPill4Label = trimmedText(props.heroPill4Label);
  const heroPill4Value = trimmedText(props.heroPill4Value);

  const pills: Array<{ label: string; value?: string }> = [];
  if (heroPill1Label || heroPill1Value) pills.push({ label: heroPill1Label, value: heroPill1Value || undefined });
  if (heroPill2Label || heroPill2Value) pills.push({ label: heroPill2Label, value: heroPill2Value || undefined });
  if (heroPill3Label || heroPill3Value) pills.push({ label: heroPill3Label, value: heroPill3Value || undefined });
  if (heroPill4Label || heroPill4Value) pills.push({ label: heroPill4Label, value: heroPill4Value || undefined });
  if (pills.length) hero.pills = pills;

  const galleryBadge = trimmedText(props.galleryBadge);
  if (galleryBadge) hero.galleryBadge = galleryBadge;

  const selectedPrefix = trimmedText(props.selectedPrefix);
  if (selectedPrefix) hero.selectedPrefix = selectedPrefix;

  const summarySuffix = trimmedText(props.summarySuffix);
  if (summarySuffix) hero.summarySuffix = summarySuffix;

  const whatsappButtonText = trimmedText(props.whatsappButtonText);
  if (whatsappButtonText) hero.whatsappText = whatsappButtonText;

  const whatsappButtonHref = linkValue(props.whatsappButtonHref);
  if (whatsappButtonHref) hero.whatsappHref = whatsappButtonHref;

  const trustBadges = [props.trustBadge1, props.trustBadge2, props.trustBadge3].map(trimmedText).filter(Boolean);
  if (trustBadges.length) hero.trustBadges = trustBadges;

  const overrides: PlainObject = {};
  if (Object.keys(announcement).length) overrides.announcement = announcement;
  if (Object.keys(breadcrumb).length) overrides.breadcrumb = breadcrumb;
  if (Object.keys(hero).length) overrides.hero = hero;
  return overrides;
}

function productDetailPropKey(props: Props) {
  return [
    props.announcementStrongText,
    props.announcementText,
    props.announcementButtonText,
    linkValue(props.announcementButtonHref),
    props.breadcrumbCategoryText,
    linkValue(props.breadcrumbCategoryHref),
    props.heroKicker,
    props.heroTitleHtml,
    props.heroDescriptionHtml,
    props.heroPill1Label,
    props.heroPill1Value,
    props.heroPill2Label,
    props.heroPill2Value,
    props.heroPill3Label,
    props.heroPill3Value,
    props.heroPill4Label,
    props.heroPill4Value,
    props.galleryBadge,
    props.selectedPrefix,
    props.summarySuffix,
    props.whatsappButtonText,
    linkValue(props.whatsappButtonHref),
    props.trustBadge1,
    props.trustBadge2,
    props.trustBadge3,
    props.categoryText,
  ]
    .map((item) => trimmedText(item))
    .join("\n");
}

function propsTemplateData(props: Props): ProductDetailTemplateData {
  const template = deepMerge(CRS_COMPOSITE_TEMPLATE, parseTemplateJson(props.productTemplateJson));
  const merged = deepMerge(template, productDetailPropOverrides(props));
  return {
    ...merged,
    key: `${merged.key || CRS_COMPOSITE_SLUG}-studio-preview`,
  };
}

function deepMerge<T>(base: T, override: unknown): T {
  if (!isPlainObject(base) || !isPlainObject(override)) return (override === undefined ? base : override) as T;
  const next: PlainObject = { ...base };
  for (const [key, value] of Object.entries(override)) {
    if (Array.isArray(value)) next[key] = value;
    else if (isPlainObject(value) && isPlainObject(next[key])) next[key] = deepMerge(next[key], value);
    else if (value !== undefined) next[key] = value;
  }
  return next as T;
}

function productMediaGallery(product: IkasProduct, variant: IkasProductVariant | null): ProductGalleryItem[] {
  const mediaList = allVariantMedia(variant).filter((item) => !isMediaVideo(item));
  const gallery = mediaList
    .map((item) => {
      const image = item.image;
      return image ? { src: getDefaultSrc(image), alt: image.altText || product.name } : null;
    })
    .filter(Boolean) as ProductGalleryItem[];

  if (gallery.length) return gallery;
  const mainImage = variant ? getProductVariantMainImage(variant)?.image : undefined;
  return mainImage ? [{ src: getDefaultSrc(mainImage), alt: mainImage.altText || product.name }] : [];
}

function makeWhatsappHref(product: IkasProduct) {
  const productUrl = typeof window !== "undefined" ? window.location.href : getProductHref(product);
  const message = `Merhaba, ${product.name} ile ilgileniyorum. Detaylı bilgi alabilir miyim? ${productUrl}`;
  return `https://wa.me/905314326577?text=${encodeURIComponent(message)}`;
}

function genericProductData(product: IkasProduct, variant: IkasProductVariant | null, labels: Pick<Props, "addToCartText" | "addingToCartText" | "outOfStockText">): ProductDetailTemplateData {
  const firstCategory = product.categories?.[0];
  const categoryText = categoryName(firstCategory) || "Kategori Adı";
  const categoryLink = categoryHref(firstCategory);
  const gallery = productMediaGallery(product, variant);
  const href = getProductHref(product) || `/${productSlug(product)}`;
  return {
    key: productSlug(product) || product.id || product.name,
    announcement: { enabled: false, strongText: "", ctaText: "", ctaHref: "#satinal" },
    breadcrumb: {
      homeText: "Ana sayfa",
      homeHref: "/",
      categoryText,
      categoryHref: categoryLink,
      productText: product.name,
    },
    hero: {
      kicker: categoryText,
      titleHtml: product.name,
      leadHtml: summaryText(product) || "Ürün kısa açıklama metni buraya gelecek. Panelden veya ürün açıklamasından düzenleyebilirsiniz.",
      pills: [
        { label: "Örnek Rozet 1" },
        { label: "Örnek Rozet 2" },
        { label: "Örnek Rozet 3" },
      ],
      gallery,
      selectedPrefix: "Seçiminiz:",
      summarySuffix: "",
      buyHrefBase: href,
      whatsappHref: makeWhatsappHref(product),
      whatsappText: "WhatsApp'tan sor",
      addToCartText: labels.addToCartText || "Sepete ekle",
      addingToCartText: labels.addingToCartText || "Ekleniyor...",
      outOfStockText: labels.outOfStockText || "Stok yok",
      trustBadges: ["Güven Rozeti 1", "Güven Rozeti 2", "Güven Rozeti 3"],
    },
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
    related: {
      index: "07",
      label: "İLGİLİ ÜRÜNLER",
      titleHtml: 'Aynı kategorideki <span class="em">diğer ürünler.</span>',
      items: [
        {
          tag: "3D YAZICI",
          title: "MASH P16L Dental 3D Yazıcı",
          descriptionHtml: "385nm 16K ultra hassas dental 3D yazıcı çözümü.",
          href: "/3d-yazicilar",
          linkText: "İncele",
          background: "#0E0E0C",
          image: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/deb67f5e-a02a-4fa6-9cb8-595a277d69fd/1080/composite-apps-10.webp",
        },
        {
          tag: "KÜRLEME",
          title: "MASH C1E UV Kürleme Cihazı",
          descriptionHtml: "24 LED 360° homojen UV polimerizasyon ünitesi.",
          href: "/yikama-kurleme",
          linkText: "İncele",
          background: "#0E0E0C",
          image: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/9d7bb34c-1f0d-4b36-8f0e-ce9a41863d55/1080/composite-apps-11.webp",
        },
        {
          tag: "YIKAMA",
          title: "MASH W1E Ultrasonik Yıkama",
          descriptionHtml: "Çift tanklı otomatik vortex yıkama sistemi.",
          href: "/yikama-kurleme",
          linkText: "İncele",
          background: "#0E0E0C",
          image: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1cd726f4-d0ec-4f4b-9407-ca7a84da9961/1080/composite-apps-12.webp",
        },
        {
          tag: "REÇİNE",
          title: "CRS Composite Geçici Reçine",
          descriptionHtml: "CE Class IIa sertifikalı kuron ve köprü reçinesi.",
          href: "/dental-recineler",
          linkText: "İncele",
          background: "#0E0E0C",
          image: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/d875a523-2228-44a7-818d-022312b0a44d/1080/composite-resin-ce.webp",
        },
      ],
    },
    finalCta: {
      titleHtml: 'Dijital iş akışınızı <span class="em">birlikte başlatalım.</span>',
      textHtml: "Kliniğinize veya laboratuvarınıza özel çözümler için uzmanlarımızla hemen iletişime geçin.",
      primaryText: "WhatsApp'tan Danışın",
      primaryHref: "https://wa.me/905314326577?text=Bilgi%20almak%20istiyorum",
      secondaryText: "Tüm Ürünleri İncele",
      secondaryHref: "/tum-urunler",
    },
  };
}

function templateData(product: IkasProduct, variant: IkasProductVariant | null, props: Props) {
  const resolved = resolveProductDetailData(product);
  const base = resolved || (isCrsComposite(product) ? CRS_COMPOSITE_TEMPLATE : genericProductData(product, variant, props));
  const fromProps = deepMerge(base, parseTemplateJson(props.productTemplateJson));
  const custom = customJson(product);
  const merged = deepMerge(custom ? deepMerge(fromProps, custom) : fromProps, productDetailPropOverrides(props));
  return {
    ...merged,
    key: `${merged.key}-${product.id || productSlug(product)}`,
    hero: {
      ...merged.hero,
      addToCartText: props.addToCartText || merged.hero.addToCartText,
      addingToCartText: props.addingToCartText || merged.hero.addingToCartText,
      outOfStockText: props.outOfStockText || merged.hero.outOfStockText,
      gallery: merged.hero.gallery.length ? merged.hero.gallery : productMediaGallery(product, variant),
    },
  };
}

function previewVariantGroups(selection: PreviewSelection): ProductVariantGroup[] {
  return [
    {
      id: "preview-color",
      name: "Renk",
      values: [
        { id: "A1", name: "A1", color: "#f3ede0" },
        { id: "A2", name: "A2", color: "#efe4cf" },
        { id: "A3", name: "A3", color: "#e8d7b8" },
      ].map((value) => ({
        ...value,
        selected: (selection["preview-color"] || "A1") === value.id,
        hasStock: true,
        rawValue: { groupId: "preview-color", valueId: value.id },
      })),
    },
    {
      id: "preview-size",
      name: "Boyut",
      values: [
        { id: "500-gr", name: "500 gr" },
        { id: "1000-gr", name: "1000 gr" },
      ].map((value) => ({
        ...value,
        selected: (selection["preview-size"] || "500-gr") === value.id,
        hasStock: true,
        rawValue: { groupId: "preview-size", valueId: value.id },
      })),
    },
  ];
}

function variantGroups(product: IkasProduct): ProductVariantGroup[] {
  return getDisplayedProductVariantTypes(product).map((variantType) => {
    const typeName = variantType.variantType.name || "";
    const values = uniqueDisplayedVariantValues(variantType.displayedVariantValues).map((item) => {
      const color = colorForVariantValue(product, variantType, item.variantValue);
      const type = normalizedVariantText(typeName);
      const isColor = type.includes("renk") || type.includes("color") || Boolean(color);
      return {
        id: item.variantValue.id,
        name: item.variantValue.name || "",
        selected: !!item.isSelected,
        hasStock: !!item.hasStock,
        color: isColor ? color || "#f3ede0" : undefined,
        rawValue: item.variantValue,
      };
    });
    return {
      id: variantType.variantType.id,
      name: typeName,
      values,
    };
  });
}

function selectedSummary(data: ProductDetailTemplateData, groups: ProductVariantGroup[]) {
  const values = groups.map((group) => group.values.find((value) => value.selected)?.name).filter(Boolean);
  return [data.breadcrumb.productText, ...values].join(" · ");
}

function themeToken(value: string | undefined, defaultValue: string, tokenName: string) {
  const trimmed = value?.trim();
  if (trimmed && trimmed.toLowerCase() !== defaultValue.toLowerCase()) return trimmed;
  return `var(${tokenName}, ${defaultValue})`;
}

export function ThreeMashProductDetailLive(props: Props) {
  const product = props.product || null;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState("");
  const [version, setVersion] = useState(0);
  const [previewSelection, setPreviewSelection] = useState<PreviewSelection>({});
  const [relatedProducts, setRelatedProducts] = useState<ProductDetailRelatedProduct[]>([]);

  useEffect(() => {
    if (!product) return;
    initProductOnBrowser(product);
    getProductOptionSet(product).then(() => {
      if (product.productOptionSet) initProductOptionSetValues(product.productOptionSet);
      setVersion((current) => current + 1);
    });
  }, [product?.id]);

  useEffect(() => {
    setSelectedImageIndex(0);
    setMessage("");
    setIsAdding(false);
  }, [product?.id, product ? productSlug(product) : ""]);

  const variant = product ? selectedVariant(product) : null;
  const image = allVariantMedia(variant)[selectedImageIndex]?.image || (variant ? getProductVariantMainImage(variant)?.image : undefined);
  const detailPropKey = productDetailPropKey(props);
  const data = useMemo(
    () => (product ? templateData(product, variant, props) : props.showTemplatePreview === false ? null : propsTemplateData(props)),
    [product?.id, version, props.addToCartText, props.addingToCartText, props.outOfStockText, props.productTemplateJson, props.showTemplatePreview, detailPropKey],
  );
  if (typeof window !== "undefined") {
    (window as unknown as { __THREE_MASH_PRODUCT_DETAIL_DATA__?: unknown }).__THREE_MASH_PRODUCT_DETAIL_DATA__ = data;
  }
  const groups = useMemo(() => (product ? variantGroups(product) : previewVariantGroups(previewSelection)), [product?.id, version, previewSelection]);
  const isInStock = !!product && !!variant && hasProductStock(product) && hasProductVariantStock(variant);
  const hasDiscount = !!variant && hasProductVariantDiscount(variant);
  const addDisabled = !!data?.hero.disableAddToCart || !product || !variant || !isInStock || isAdding;

  useEffect(() => {
    const productList = categoryProductList(product, 12);
    if (!productList || !product) {
      setRelatedProducts([]);
      return undefined;
    }
    let isMounted = true;
    const currentId = product.id;
    getProductListInitialData(productList)
      .then(() => {
        if (!isMounted) return;
        setRelatedProducts(
          listProducts(productList)
            .filter((item) => item.id !== currentId)
            .slice(0, 8)
            .map(relatedProduct),
        );
      })
      .catch((error) => {
        console.error("ThreeMashProductDetailLive related products failed", error);
        if (isMounted) setRelatedProducts([]);
      });
    return () => {
      isMounted = false;
    };
  }, [product?.id, product ? categoryId(firstProductCategory(product)) : ""]);

  useEffect(() => {
    setSelectedImageIndex(0);
    setMessage("");
    setIsAdding(false);
    setPreviewSelection({});
  }, [data?.key]);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return undefined;
    publishSharedProductDetailData(data);
    const payload = data ? productAnnouncementPayload(data) : null;
    const targetWindow = window as unknown as { __THREE_MASH_PRODUCT_ANNOUNCEMENT__?: unknown };
    targetWindow.__THREE_MASH_PRODUCT_ANNOUNCEMENT__ = payload;
    window.dispatchEvent(new CustomEvent("three-mash:product-announcement", { detail: payload }));

    return () => {
      publishSharedProductDetailData(null);
      window.requestAnimationFrame(() => {
        if (targetWindow.__THREE_MASH_PRODUCT_ANNOUNCEMENT__ !== payload) return;
        targetWindow.__THREE_MASH_PRODUCT_ANNOUNCEMENT__ = null;
        window.dispatchEvent(new CustomEvent("three-mash:product-announcement", { detail: null }));
      });
    };
  }, [
    data?.key,
    data?.announcement?.enabled,
    data?.announcement?.strongText,
    data?.announcement?.longText,
    data?.announcement?.ctaText,
    data?.announcement?.ctaHref,
  ]);

  const style = {
    "--tmpdt-bg": themeToken(props.backgroundColor, "#FAFAF7", "--tm-theme-bg"),
    "--tmpdt-ink": themeToken(props.textColor, "#0E0E0C", "--tm-theme-text"),
    "--tmpdt-sub": themeToken(props.mutedTextColor, "#55554e", "--tm-theme-sub"),
    "--tmpdt-line": themeToken(props.lineColor, "#E6E6E0", "--tm-theme-line"),
    "--tmpdt-panel": themeToken(props.panelColor, "#F1F1EC", "--tm-theme-panel"),
    "--tmpdt-lime": themeToken(props.accentColor, "#C7F136", "--tm-theme-accent"),
  } as any;

async function handleAddToCart() {
  if (!product || !variant || !isInStock || isAdding) return;

  if (!hasProductValidOptionValues(product)) {
    setMessage(
      props.optionRequiredMessage ||
        "Lütfen gerekli ürün seçeneklerini tamamlayın."
    );
    return;
  }

  if (!isAddToCartEnabled(product)) {
    setMessage(
      props.addToCartErrorMessage ||
        "Ürün sepete eklenemiyor."
    );
    return;
  }

  setIsAdding(true);
  setMessage("");

  try {
    rememberOrderLineImageFallback(
      product,
      variant,
      image ? [getDefaultSrc(image)] : []
    );

const result = await addItemToCart(
  variant,
  product,
  1
);

if (result.success) {
  // IKAS store'u anında global state'e yayınla.
  publishCartFromIkasStore();

  // Header cart panelini aç.
  window.dispatchEvent(
    new CustomEvent("ikas:open-cart-sidebar")
  );

  // Server'dan arkada doğrula.
  void refreshGlobalCart();
} else {
  setMessage(
    props.addToCartErrorMessage ||
      "Ürün sepete eklenemedi."
  );
}
  } finally {
    setIsAdding(false);
  }
}

  if (!data) {
    return (
      <section className="three-mash-product-detail-live" style={style}>
        <div className="tmpdl-setup">
          {props.setupMessage || "Ürün detayları kısa süre içinde burada gösterilecek."}
        </div>
      </section>
    );
  }

  if ((props as unknown as { renderMode?: string }).renderMode === "hero") {
    return (
      <section className="three-mash-product-detail-live" style={style} data-product-detail-key={data.key}>
        <ProductDetailSectionScope data={data}>
          <ProductDetailHeroSection
            data={data}
            variantGroups={groups}
            selectedGalleryIndex={selectedImageIndex}
            onGallerySelect={setSelectedImageIndex}
            onVariantSelect={(value) => {
              if (!product) {
                const item = value as { groupId?: string; valueId?: string };
                if (item.groupId && item.valueId) setPreviewSelection((current) => ({ ...current, [item.groupId as string]: item.valueId as string }));
                return;
              }
              selectVariantValue(product, value as any, true);
              setSelectedImageIndex(0);
              setMessage("");
              setVersion((current) => current + 1);
            }}
            onAddToCart={handleAddToCart}
            isAddToCartDisabled={addDisabled}
            isAdding={isAdding}
            message={message || (product && !isInStock ? data.hero.outOfStockText : "")}
            price={variant ? getProductVariantFormattedFinalPrice(variant) : ""}
            compareAtPrice={variant && hasDiscount ? getProductVariantFormattedSellPrice(variant) : ""}
            selectedSummary={selectedSummary(data, groups)}
          />
        </ProductDetailSectionScope>
      </section>
    );
  }

  return (
    <section className="three-mash-product-detail-live" style={style} data-product-detail-key={data.key}>
      <ThreeMashProductDetailTemplate
        data={data}
        variantGroups={groups}
        selectedGalleryIndex={selectedImageIndex}
        onGallerySelect={setSelectedImageIndex}
        onVariantSelect={(value) => {
          if (!product) {
            const item = value as { groupId?: string; valueId?: string };
            if (item.groupId && item.valueId) setPreviewSelection((current) => ({ ...current, [item.groupId as string]: item.valueId as string }));
            return;
          }
          selectVariantValue(product, value as any, true);
          setSelectedImageIndex(0);
          setMessage("");
          setVersion((current) => current + 1);
        }}
        onAddToCart={handleAddToCart}
        isAddToCartDisabled={addDisabled}
        isAdding={isAdding}
        message={message || (product && !isInStock ? data.hero.outOfStockText : "")}
        price={variant ? getProductVariantFormattedFinalPrice(variant) : ""}
        compareAtPrice={variant && hasDiscount ? getProductVariantFormattedSellPrice(variant) : ""}
        selectedSummary={selectedSummary(data, groups)}
        relatedProducts={relatedProducts}
      />
    </section>
  );
}

export default ThreeMashProductDetailLive;
