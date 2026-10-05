import { useEffect, useLayoutEffect, useMemo, useState } from "preact/hooks";
import {
  publishCartFromIkasStore,
  refreshGlobalCart,
} from "../cartState";

import {
  addItemToCart,
  apiSearchProducts,
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
  type IkasImage,
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
import { isEnglishLocale, isTurkishText, localizedHref, tLocalized, tProp, EN_TO_TR_ROUTE_MAP } from "../../utils/i18n";
import { sanitizeHtml } from "../../utils/sanitizeHtml";
import { debugError } from "../../utils/debugError";
import { Props } from "./types";
import type { Props as SingleProductProps } from "../ThreeMashSingleProduct/types";
import { isCustomerAuthenticated } from "../../utils/auth";
import { safeRedirect } from "../../utils/safeRedirect";

type PlainObject = Record<string, unknown>;
type PreviewSelection = Record<string, string>;
type SingleProductRuntimeProps = Props & SingleProductProps & { renderMode?: string };

const CRS_COMPOSITE_SLUG = "crs-composite-mukemmel-dayanimli-gecici-recinesi";

function localizedStudioText(
  valueTr: string | undefined,
  valueEn: string | undefined,
  fallbackTr: string,
  fallbackEn: string,
) {
  return tProp(isEnglishLocale() ? valueEn : valueTr, fallbackTr, fallbackEn);
}

function hasStudioTextOverride(
  valueTr: string | undefined,
  valueEn: string | undefined,
  fallbackTr: string,
  fallbackEn: string,
) {
  const normalizedTr = valueTr?.trim();
  const normalizedEn = valueEn?.trim();
  return Boolean(
    (normalizedTr && normalizedTr !== fallbackTr) ||
    (normalizedEn && normalizedEn !== fallbackEn)
  );
}

const CRS_GALLERY: ProductGalleryItem[] = [
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/d875a523-2228-44a7-818d-022312b0a44d/1080/composite-resin-ce.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/d875a523-2228-44a7-818d-022312b0a44d/540/composite-resin-ce.webp",
    alt: tLocalized("CRS Composite CE Class IIa sertifikalı geçici ve daimi reçinesi", "CRS Composite CE Class IIa certified temporary and permanent resin"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/deb67f5e-a02a-4fa6-9cb8-595a277d69fd/1080/composite-apps-10.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/deb67f5e-a02a-4fa6-9cb8-595a277d69fd/540/composite-apps-10.webp",
    alt: tLocalized("CRS Composite kron uygulaması", "CRS Composite crown application"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/9d7bb34c-1f0d-4b36-8f0e-ce9a41863d55/1080/composite-apps-11.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/9d7bb34c-1f0d-4b36-8f0e-ce9a41863d55/540/composite-apps-11.webp",
    alt: tLocalized("CRS Composite köprü uygulaması", "CRS Composite bridge application"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1cd726f4-d0ec-4f4b-9407-ca7a84da9961/1080/composite-apps-12.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1cd726f4-d0ec-4f4b-9407-ca7a84da9961/540/composite-apps-12.webp",
    alt: tLocalized("CRS Composite restorasyon", "CRS Composite restoration"),
  },
  {
    src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/0c8743e4-abb5-4d0b-854c-3a4f5a46b686/1080/sand-model-gecici-4.webp",
    thumbSrc: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/0c8743e4-abb5-4d0b-854c-3a4f5a46b686/540/sand-model-gecici-4.webp",
    alt: tLocalized("CRS Composite model üzerinde geçici", "Temporary on the CRS Composite model"),
  },
];

function CRS_COMPOSITE_TEMPLATE(): ProductDetailTemplateData {
  return {
    key: CRS_COMPOSITE_SLUG,
    announcement: {
      enabled: true,
      strongText: tLocalized("Fırsatı kaçırmayın.", "Don't miss the opportunity."),
      longText: tLocalized("CE Class IIa CRS Composite'i cihazınızın parametreleriyle birlikte kalibre ederek, ücretsiz kurulum desteğiyle teslim ediyoruz.", "We deliver the CE Class IIa CRS Composite calibrated together with your device's parameters, with free setup support."),
      ctaText: tLocalized("Ücretsiz parametre uyumlaması →", "Free parameter matching →"),
      ctaHref: "#satinal",
    },
    breadcrumb: {
      homeText: tLocalized("Ana sayfa", "Home"),
      homeHref: "/",
      categoryText: tLocalized("Dental Reçineler", "Dental Resins"),
      categoryHref: "/dental-3d-yazici-recineleri",
      productText: tLocalized("CRS Composite", "CRS Composite"),
    },
    hero: {
      kicker: tLocalized("CRS Composite · Biyouyumlu Kron-Köprü Reçinesi", "CRS Composite · Biocompatible Crown-and-Bridge Resin"),
      titleHtml: tLocalized("Daimi kron artık <span class=\"em\">baskıdan</span> çıkıyor.", "The permanent crown now comes out of a <span class=\"em\">print.</span>"),
      leadHtml:
        tLocalized("Geçici ve daimi kuron-köprülerin katmanlı üretimi için biyouyumlu reçine. Sektörde önde gelen rakiplerine kıyasla <b>daha yüksek bükülme mukavemeti</b> ve hassas marjinal uyum sağlar; yarı saydamlık-opaklık arasında dengeli translüsentliğe sahiptir. Ağız koşullarına dayanıklıdır, tat ve koku yapmaz.", "A biocompatible resin for layered production of temporary and permanent crowns and bridges. It provides <b>higher flexural strength</b> and precise marginal fit compared to leading competitors in the industry; it has balanced translucency between semi-transparency and opacity. It is resistant to oral conditions and produces no taste or odor."),
      pills: [
        { value: "144 MPa", label: tLocalized("eğilme mukavemeti", "flexural strength") },
        { value: "5000 MPa", label: tLocalized("eğilme modülü", "flexural modulus") },
        { value: "CE", label: tLocalized("Class IIa", "Class IIa") },
        { label: tLocalized("Sararma yapmaz", "Does not turn yellow") },
      ],
      galleryBadge: tLocalized("CE CLASS IIa", "CE CLASS IIa"),
      gallery: CRS_GALLERY,
      selectedPrefix: tLocalized("Seçiminiz:", "Your selection:"),
      summarySuffix: tLocalized("— parametre uyumlaması ve teknik destek dahil.", "— including parameter matching and technical support."),
      buyHrefBase: "/crs-composite-mukemmel-dayanimli-gecici-recinesi",
      whatsappHref: tLocalized("https://wa.me/905314326577?text=CRS%20Composite%20hakkında%20bilgi%20almak%20istiyorum", "https://wa.me/905314326577?text=CRS%20Composite%20hakkında%20bilgi%20almak%20istiyorum"),
      whatsappText: tLocalized("WhatsApp'tan sor", "Ask via WhatsApp"),
      addToCartText: tLocalized("Sepete ekle →", "Add to cart →"),
      addingToCartText: tLocalized("Ekleniyor...", "Adding..."),
      outOfStockText: tLocalized("Stok yok", "Out of stock"),
      trustBadges: [tLocalized("Ücretsiz kargo", "Free shipping"), tLocalized("Koşulsuz iade", "Hassle-free Returns"), tLocalized("Güvenli ödeme", "Secure Payment")],
    },
    ratings: {
      index: "01",
      label: tLocalized("Kullanıcı Deneyimi", "User Experience"),
      titleHtml: tLocalized("Biyouyumlu <span class=\"hl\">geçici ve daimi</span> reçinesi.", "Biocompatible <span class=\"hl\">temporary and permanent</span> resin."),
      sideHtml: tLocalized("CRS Composite, <b>CE Class IIa</b> sertifikalı toksik olmayan formülasyonu sayesinde ağız içinde güvenle kullanılabilir.", "Thanks to its <b>CE Class IIa</b> certified, non-toxic formulation, CRS Composite can be used safely intraorally."),
      panelTitleHtml: tLocalized("CRS Composite'i satın alanlar <span class=\"em\">nasıl değerlendirdi?</span>", "Buyers of CRS Composite — <span class=\"em\">how did they rate it?</span>"),
      note: tLocalized("Ürünü satın alan kullanıcıların geri bildirimlerine göre.", "Based on feedback from customers who purchased the product."),
      items: [
        { descriptionHtml: tLocalized("Baskı sonrası kürleme işleminde <b>sararma yapmadığını</b> söyledi", "It was noted that it <b>doesn't yellow</b> during post-print curing"), percent: 99 },
        { descriptionHtml: tLocalized("<b>Yüksek mekanik dayanımı</b> sayesinde kırılmadan uzun süre kullanılabildiğini söyledi", "Said it can be used for a long time without breaking, thanks to its <b>high mechanical strength</b>"), percent: 97 },
        { descriptionHtml: tLocalized("<b>Şırınga dolgu malzemesiyle yüksek uyum</b> sayesinde hasta ağzında geçici diş üzerinde değişiklik yapabildiğini söyledi", "Said that thanks to <b>high compatibility with syringe filling material</b>, adjustments can be made to the temporary tooth in the patient's mouth"), percent: 95 },
      ],
    },
    metrics: {
      index: "02",
      label: tLocalized("Teknik Özellikler", "Technical Specifications"),
      titleHtml: tLocalized("Baskı sonrası <span class=\"em\">sararma yapmaz</span>, kalıcıda kullanılır.", "<span class=\"em\">Doesn't yellow</span> after printing, used in permanent restorations."),
      sideHtml:
        tLocalized("CRS Composite, kalıcı uygulamada kullanıldığını iddia eden rakip markalara göre daha yüksek dayanım sunar ve kürleme sonrası sararmaz. Değerler ISO 10477 standardına göredir.", "CRS Composite offers higher strength than competitor brands that claim to be usable for permanent applications, and it does not yellow after curing. Values are according to the ISO 10477 standard."),
      items: [
        {
          name: tLocalized("Eğilme Mukavemeti", "Flexural Strength"),
          value: "144",
          unit: tLocalized("MPa", "MPa"),
          tag: tLocalized("ISO 10477", "ISO 10477"),
          caption: tLocalized("Kalıcı restorasyon iddiası taşıyan birçok geçici reçinenin üzerinde; kırılmadan uzun süre kullanım.", "Outperforms many temporary resins that claim to be permanent-restoration-grade; long-term use without breaking."),
        },
        {
          name: tLocalized("Eğilme Modülü", "Flexural Modulus"),
          value: "5000",
          unit: tLocalized("MPa", "MPa"),
          tag: tLocalized("ISO 10477", "ISO 10477"),
          caption: tLocalized("Yüksek rijitlik: fonksiyon altında bükülmeye direnç, stabil oklüzyon.", "High rigidity: resistance to bending under function, stable occlusion."),
        },
        {
          name: tLocalized("Biyouyumluluk", "Biocompatibility"),
          value: "CE",
          unit: tLocalized("Class IIa", "Class IIa"),
          tag: "MDR",
          caption: tLocalized("Ağız içinde belirli süre temas eden tıbbi cihaz sınıfı; toksik olmayan formülasyon.", "A class of medical device that has contact inside the mouth for a certain period; non-toxic formulation."),
        },
      ],
    },
    specHighlight: {
      tag: tLocalized("CRS COMPOSITE · CE CLASS IIa · MDR", "CRS COMPOSITE · CE CLASS IIa · MDR"),
      titleHtml: tLocalized("Porselen estetiği, <span class=\"em\">marka bağımsız glaze.</span>", "Porcelain aesthetics, <span class=\"em\">brand-independent glaze.</span>"),
      descriptionHtml:
        tLocalized("CE Class IIa sertifikalı, toksik olmayan formülasyonu sayesinde ağız içinde güvenle kullanılır. Yarı saydamlık ve opaklık arasında mükemmel bir translüsent dengeye sahiptir; marka ve renk ayırt etmeksizin <b>optik glaze</b> yapılabilir. Ağız koşullarına dayanıklıdır, <b>tat ve koku yapmaz.</b>", "Thanks to its CE Class IIa certified, non-toxic formulation, it can be used safely intraorally. It has an excellent translucency balance between semi-transparency and opacity; <b>optical glazing</b> can be applied regardless of brand or color. It withstands oral conditions and <b>produces no taste or odor.</b>"),
      ctaText: tLocalized("Renk ve boyut seç →", "Select color and size →"),
      ctaHref: "#satinal",
      rows: [
        { label: tLocalized("Eğilme mukavemeti", "Flexural strength"), value: "144 MPa" },
        { label: tLocalized("Eğilme modülü", "Flexural modulus"), value: "5000 MPa" },
        { label: tLocalized("Sertifikasyon", "Certification"), value: "CE Class IIa (MDR)" },
        { label: tLocalized("Uygulama", "APPLICATION"), value: tLocalized("Geçici + daimi", "Temporary + permanent") },
        { label: tLocalized("Uyum", "Compatibility"), value: tLocalized("Tüm DLP / LCD", "All DLP / LCD") },
      ],
    },
    useCases: {
      index: "03",
      label: tLocalized("Uygulama & Uyumluluk", "Application & Compatibility"),
      titleHtml: tLocalized("Nerede kullanılır, <span class=\"em\">neyle çalışır?</span>", "Where is it used, <span class=\"em\">what does it work with?</span>"),
      sideHtml: tLocalized("Uygulama alanları ve uyumlu cihazlar hakkında bilgi alın.", "Learn about applications and compatible devices."),
      photos: [
        { src: CRS_GALLERY[1].src, alt: tLocalized("CRS Composite ile üretilmiş kron restorasyonu", "Crown restoration produced with CRS Composite"), title: tLocalized("Aynı gün kron", "Same-day crown"), text: tLocalized("Porselen benzeri güç ve estetik, tek seansta.", "Porcelain-like strength and aesthetics, in a single session.") },
        { src: CRS_GALLERY[2].src, alt: tLocalized("CRS Composite ile üretilmiş köprü restorasyonu", "Bridge restoration produced with CRS Composite"), title: tLocalized("Köprü restorasyonları", "Bridge restorations"), text: tLocalized("144 MPa dayanım; kırılmadan uzun süre kullanım.", "144 MPa strength; long-lasting use without breaking.") },
        { src: CRS_GALLERY[4].src, alt: tLocalized("Model üzerinde CRS Composite geçici restorasyon", "CRS Composite temporary restoration on a model"), title: tLocalized("Model üzerinde uyum", "Fit on the model"), text: tLocalized("Hassas marjinal uyum, net kole hatları.", "Precise marginal fit, clear cervical lines.") },
      ],
      cards: [
        {
          eyebrow: tLocalized("Uygulama Alanları", "Application Areas"),
          title: tLocalized("Hangi restorasyonlar?", "Which restorations?"),
          items: [
            tLocalized("Porselen benzeri güç ve güzelliğe sahip <b>aynı gün kron ve köprüler</b>", "<b>Same-day crowns and bridges</b> with porcelain-like strength and beauty"),
            tLocalized("Çok çeşitli <b>kalıcı ve geçici</b> diş restorasyonları", "A wide variety of <b>permanent and temporary</b> dental restorations"),
            tLocalized("Çıkarılabilir total protezler için <b>vakaya özel</b> tasarlanmış kuron ve köprüler", "Crowns and bridges designed <b>case-specifically</b> for removable full dentures"),
          ],
          note: tLocalized("Vakanıza uygun tasarım parametrelerini ücretsiz paylaşıyoruz.", "We share design parameters suited to your case free of charge."),
        },
        {
          eyebrow: tLocalized("Öne Çıkan Özellikler", "Featured Features"),
          title: tLocalized("Neden CRS Composite?", "Why CRS Composite?"),
          items: [
            tLocalized("Yarı saydamlık-opaklık arasında dengeli <b>translüsentlik</b>", "Balanced <b>translucency</b> between translucent and opaque"),
            tLocalized("Marka ve renk ayırt etmeksizin <b>optik glaze</b>", "<b>Optical glaze</b> regardless of brand or shade"),
            tLocalized("Ağız koşullarına dayanıklı; <b>tat ve koku yapmaz</b>", "Resistant to oral conditions; <b>no taste or odor</b>"),
            tLocalized("<b>CE Class IIa</b> biyouyumlu, toksik olmayan formülasyon", "<b>CE Class IIa</b> biocompatible, non-toxic formulation"),
          ],
        },
      ],
      devices: {
        eyebrow: tLocalized("Uyumlu Cihazlar", "Compatible Devices"),
        title: tLocalized("Tüm DLP & LCD yazıcılarla çalışır", "Works with all DLP & LCD printers"),
        textHtml:
          tLocalized("Custom Resin Solutions <b>resmi distribütörü</b> olarak; kullandığınız 3D yazıcı markası fark etmeksizin, parametre uyumlama işlemini <b>ücretsiz</b> gerçekleştiriyoruz. Satış sonrası kullanıcı eğitimleri ve <b>7/24 teknik destek</b> ile yanınızdayız.", "As the <b>official distributor</b> of Custom Resin Solutions, we carry out parameter calibration <b>free of charge</b> regardless of the 3D printer brand you use. We are with you with post-sale user training and <b>24/7 technical support.</b>"),
        chips: [
          { label: tLocalized("Creality Halot-Sky", "Creality Halot-Sky") },
          { label: tLocalized("Phrozen Mini 8K", "Phrozen Mini 8K") },
          { label: tLocalized("Asiga Max UV", "Minimum Max UV") },
          { label: tLocalized("Anycubic Photon Mono", "Anycubic Photon Mono") },
          { label: tLocalized("SprintRay Pro S", "SprintRay Pro S") },
          { label: tLocalized("Shining AccuFab-D1", "Shining AccuFab-D1") },
          { label: tLocalized("Nova Bene 4", "Nova Bene 4") },
          { label: tLocalized("Ackuretta Dentiq", "Ackuretta Dentiq") },
          { label: tLocalized("Elegoo Mars 3", "Elegoo Mars 3") },
          { label: tLocalized("+ tüm DLP / LCD markaları", "+ all DLP / LCD brands"), highlighted: true },
        ],
      },
    },
    ecosystem: {
      index: "04",
      label: tLocalized("Ekosistem", "Ecosystem"),
      titleHtml: tLocalized("Reçine tek başına yeterli değil: <span class=\"em\">kürleme sonucu tamamlar.</span>", "Resin alone is not enough: <span class=\"em\">curing completes the result.</span>"),
      textHtml:
        tLocalized("CRS Composite'in 144 MPa dayanımını ve sararmasız rengini ortaya çıkaran şey, doğru <b>post-curing</b> protokolüdür. Reçineyi cihazınızın parametreleriyle birlikte kalibre ederek teslim ediyoruz; akıllı kürleme cihazımız bu protokolü otomatik uygular.", "What brings out CRS Composite's 144 MPa strength and non-yellowing color is the correct <b>post-curing</b> protocol. We deliver the resin calibrated together with your device's parameters; our smart curing device applies this protocol automatically."),
      chips: [tLocalized("385 nm optimize baskı", "385 nm optimized printing"), tLocalized("Doğru post-curing protokolü", "The right post-curing protocol"), tLocalized("Marka bağımsız kalibrasyon", "Brand-independent calibration"), tLocalized("7/24 teknik destek", "24/7 technical support")],
      buttons: [
        { text: tLocalized("3D yazıcıları gör →", "See 3D printers →"), href: "/3d-yazicilar" },
        { text: tLocalized("Kürlemenin önemini gör →", "See the importance of curing →"), href: tLocalized("/yikama-kurleme-cihazlari#neden-gerekli", "/yikama-kurleme-cihazlari#neden-gerekli"), variant: "line" },
      ],
    },
    faq: {
      index: "05",
      label: tLocalized("Sık Sorulan Sorular", "Frequently Asked Questions"),
      titleHtml: tLocalized("CRS Composite hakkında <span class=\"em\">merak edilenler.</span>", "<span class=\"em\">Frequently asked questions</span> about CRS Composite."),
      sideHtml: tLocalized("Klinik ve laboratuvarların CRS Composite için en çok sorduğu sorular, net cevaplarla.", "The most frequently asked questions from clinics and laboratories about CRS Composite, with clear answers."),
      openFirst: true,
      items: [
        {
          question: tLocalized("1 kg CRS Composite reçinesinden kaç üye iş alabiliriz?", "How many units of work can we get from 1 kg of CRS Composite resin?"),
          answerHtml:
            tLocalized("Bu, restorasyonun boyutuna, duvar kalınlığına ve destek yapılarına göre değişir. Tek bir kron ünitesi ortalama olarak birkaç mililitre reçine tüketir; 1 kg reçineden genellikle <b>yüzlerce üye</b> üretilebilir.", "This varies depending on the size of the restoration, wall thickness, and support structures. A single crown unit consumes an average of a few milliliters of resin; <b>hundreds of units</b> can typically be produced from 1 kg of resin."),
        },
        {
          question: tLocalized("CRS Composite reçinesinin kırılma direnci nedir?", "What is the fracture strength of CRS Composite resin?"),
          answerHtml:
            tLocalized("CRS Composite, ISO 10477 standardına göre <b>144 MPa eğilme mukavemeti</b> ve <b>5000 MPa eğilme modülü</b> sunar.", "CRS Composite offers a <b>144 MPa flexural strength</b> and a <b>5000 MPa flexural modulus</b> according to the ISO 10477 standard."),
        },
        {
          question: tLocalized("CRS Composite hasta ağzında tat veya koku bırakır mı?", "Does CRS Composite leave a taste or odor in the patient's mouth?"),
          answerHtml: tLocalized("Hayır. CRS Composite <b>ağız koşullarına dayanıklıdır, tat ve koku yapmaz.</b>", "No. CRS Composite <b>is resistant to oral conditions and does not produce any taste or odor.</b>"),
        },
        {
          question: tLocalized("Dirençli olması için tavsiye edilen tasarım parametreleri nelerdir?", "What are the recommended design parameters for resistance?"),
          answerHtml:
            tLocalized("Dayanım için <b>yeterli minimum duvar kalınlığı</b>, köprülerde uygun konnektör kesiti, doğru baskı yönü ve reçineye özel doğru post-curing süresi kritik önemdedir.", "For strength, <b>sufficient minimum wall thickness</b>, an appropriate connector cross-section in bridges, correct print orientation, and the right resin-specific post-curing time are critically important."),
        },
        {
          question: tLocalized("Klinik uygulamalar için şırınga kompozitler ile uyumlu mudur?", "Is it compatible with syringe composites for clinical applications?"),
          answerHtml:
            tLocalized("Evet. CRS Composite, <b>şırınga dolgu malzemesiyle yüksek uyum</b> gösterir; hasta ağzında geçici diş üzerinde ekleme ve düzeltme yapılabilir.", "Yes. CRS Composite shows <b>high compatibility with syringe filling material</b>; additions and corrections can be made on the temporary tooth in the patient's mouth."),
        },
      ],
    },
    video: {
      index: "06",
      label: tLocalized("Videoda Gör", "Watch Video"),
      titleHtml: tLocalized("Baskıdan ağza: <span class=\"em\">süreci izleyin.</span>", "From print to mouth: <span class=\"em\">follow the process.</span>"),
      sideHtml: tLocalized("Tasarımdan baskıya, kürlemeden glaze'e; CRS Composite ile tek seans kron-köprü akışının tamamı.", "From design to printing, from curing to glaze; the entire single-session crown-and-bridge workflow with CRS Composite."),
      href: "https://www.youtube.com/@3mashsocial",
      image: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1cd726f4-d0ec-4f4b-9407-ca7a84da9961/3840/composite-apps-12.webp",
      imageAlt: tLocalized("CRS Composite uygulama videosu", "CRS Composite application video"),
      title: tLocalized("CRS Composite ile tek seans kron-köprü", "Single-session crown-and-bridge with CRS Composite"),
      text: tLocalized("Baskı parametreleri, post-curing protokolü ve optik glaze adımları; uygulamalı anlatım.", "Print parameters, post-curing protocol, and optical glaze steps; a hands-on walkthrough."),
      meta: "Mash Academy · YouTube'da izle",
    },
    related: {
      index: "07",
      label: tLocalized("İlgili Reçineler", "Related Resins"),
      titleHtml: tLocalized("Aynı vakada <span class=\"em\">birlikte çalışanlar.</span>", "Those who <span class=\"em\">work together</span> on the same case."),
      items: [
        {
          tag: tLocalized("HASSASİYET", "PRECISION"),
          title: tLocalized("CRS Model", "CRS Model"),
          descriptionHtml: tLocalized("Kron-köprü öncesi master model. Belirgin <b>kole hatları</b>, net marjinal uyum.", "Master model prior to crown-bridge work. Distinct <b>cervical lines</b>, clear marginal fit."),
          href: "/crs-model-yuksek-hassasiyetli-model-recinesi",
          linkText: tLocalized("İncele", "Explore"),
          background: "linear-gradient(160deg,#EFE7D3,#fff)",
        },
        {
          tag: tLocalized("CE CLASS IIa", "CE CLASS IIa"),
          tagVariant: "ce",
          title: tLocalized("CRS Denture", "CRS Denture"),
          descriptionHtml: tLocalized("Çıkarılabilir protez tabanı; PMMA'ya kıyasla <b>düşük çekme</b>, cila + glaze uyumlu.", "Removable denture base; <b>low shrinkage</b> compared to PMMA, compatible with polishing + glazing."),
          href: "/crs-denture-biouyumlu-protez-recinesi",
          linkText: tLocalized("İncele", "Explore"),
          background: "linear-gradient(160deg,#F6E3E4,#fff)",
        },
        {
          tag: "YIRTILMAZ",
          title: tLocalized("CRS Gingiva", "CRS Gingiva"),
          descriptionHtml: tLocalized("İmplant modeli ve diş eti maskesi. Yüksek yırtılma direnci, doğal diş eti rengi.", "Implant model and gingiva mask. High tear resistance, natural gingiva color."),
          href: "/crs-gingiva-yirtilmaz-dis-eti-recinesi",
          linkText: tLocalized("İncele", "Explore"),
          background: "linear-gradient(160deg,#F5DEE0,#fff)",
        },
        {
          tag: tLocalized("TÜM HAT", "FULL RANGE"),
          title: tLocalized("Tüm reçineler", "All resins"),
          descriptionHtml: tLocalized("16 CRS & Mash reçinesini uygulamaya göre karşılaştırın; doğru reçineyi seçin.", "Compare 16 CRS & Mash resins by application; choose the right resin."),
          href: "/dental-3d-yazici-recineleri",
          linkText: tLocalized("Reçine seçici", "Resin selector"),
          background: "linear-gradient(160deg,#EEEEE9,#fff)",
        },
      ],
    },
    finalCta: {
      titleHtml: tLocalized("CRS Composite'i cihazınıza <span class=\"em\">birlikte kalibre edelim.</span>", "Let's calibrate CRS Composite to your device, <span class=\"em\">together.</span>"),
      textHtml:
        tLocalized("Hangi yazıcı, hangi vaka, hangi renk? Kısa bir görüşmeyle CRS Composite'i cihazınızın parametreleriyle eşleştirip doğru kürleme protokolüyle birlikte <b>ücretsiz</b> teslim edelim.", "Which printer, which case, which shade? With a short conversation, let's match CRS Composite to your device's parameters and deliver it with the correct curing protocol, <b>free of charge</b>."),
      primaryText: tLocalized("Renk ve boyut seç ↑", "Select color and size ↑"),
      primaryHref: "#satinal",
      secondaryText: tLocalized("Uzmana danış — ücretsiz", "consult an expert — free"),
      secondaryHref: tLocalized("/pages/iletisim", "/pages/iletisim"),
    },
  };
}

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

function productCategoryKeys(product: IkasProduct) {
  const source = product as IkasProduct & {
    category?: unknown;
    productCategories?: unknown[];
  };
  const categories = [
    ...(product.categories || []),
    ...(Array.isArray(source.productCategories) ? source.productCategories : []),
  ];
  if (source.category) categories.push(source.category);

  const ids = new Set<string>();
  const names = new Set<string>();
  categories.forEach((category) => {
    const value = category as { id?: unknown; categoryId?: unknown; value?: unknown; name?: unknown; title?: unknown; slug?: unknown };
    const id = stringValue(value.id) || stringValue(value.categoryId) || stringValue(value.value);
    const name = stringValue(value.name) || stringValue(value.title) || stringValue(value.slug);
    if (id) ids.add(id);
    if (name) names.add(slugify(name));
  });
  return { ids, names };
}

function productsShareCategory(product: IkasProduct, currentProduct: IkasProduct) {
  const current = productCategoryKeys(currentProduct);
  const candidate = productCategoryKeys(product);
  for (const id of current.ids) if (candidate.ids.has(id)) return true;
  for (const name of current.names) if (name && candidate.names.has(name)) return true;
  return false;
}

function relatedProduct(product: IkasProduct): ProductDetailRelatedProduct {
  const variant = selectedVariant(product);
  const media = variant ? getProductVariantMainImage(variant) : undefined;
  const fallbackImage = variant?.images?.find((item) => !isMediaVideo(item))?.image;
  const imageSource = media?.image || fallbackImage;
  const image = imageSource ? getDefaultSrc(imageSource) : "";
  const description = summaryText(product);
  return {
    id: product.id,
    title: product.name,
    href: getProductHref(product) || `/${productSlug(product)}`,
    image,
    imageAlt: imageSource?.altText || product.name,
    category: categoryName(firstProductCategory(product)) || product.brand?.name || "",
    descriptionHtml: description ? escapeHtml(description.length > 118 ? `${description.slice(0, 117).trimEnd()}...` : description) : "",
  };
}

function safeLocationPathname() {
  if (typeof window === "undefined") return "";
  return window.location.pathname;
}

function productSlug(product: IkasProduct | null) {
  const data = product as unknown as { slug?: unknown; handle?: unknown; url?: unknown; path?: unknown } | null;
  const raw = stringValue(data?.slug) || stringValue(data?.handle) || stringValue(data?.url) || stringValue(data?.path) || (product ? slugify(product.name) : "");
  const productDataSlug = raw.toLocaleLowerCase("tr").replace(/^\/+|\/+$/g, "").split("/").pop();
  if (productDataSlug) return productDataSlug;
  const pathname = safeLocationPathname();
  return pathname.toLocaleLowerCase("tr").replace(/^\/+|\/+$/g, "").split("/").pop() || "";
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
  a1: "#ede9d0",
  a2: "#ede9d0",
  a3: "#ede9d0",
  a4: "#efead4",
  c1: "#e1d6b5",
  c2: "#e1d6b5",
  d2: "#dcd4b4",
  "1m1": "#F4EDE4",
  "1-m-1": "#F4EDE4",
  "1.m.1": "#F4EDE4",
  "1 m 1": "#F4EDE4",
  "a3.5": "#e1d6b5",
  b1: "#dcd4b4",
  b2: "#ebe3c7",
  b3: "#e1d7b2",
  sand: "#ebc686",
  gray: "#767a83",
  grey: "#767a83",
  black: "#000000",
  siyah: "#000000",
  cosmetic: "#000000",
  "cosmetik": "#000000",
  kosmetik: "#000000",
  white: "#ffffff",
  pinkish: "#ba6c74",
  pink: "#f18789",
  "light-pink": "#f18789",
  lightpink: "#f18789",
  reddish: "#bc5e5f",
  "dark-reddish": "#a65657",
  darkreddish: "#a65657",
  gingiva: "#ba6c74",
  clear: "#f9f9f9",
  transparan: "#f9f9f9",
  transparent: "#f9f9f9",
  orange: "#f5b62f",
  turuncu: "#f5b62f",
  lightorange: "#f5b62f",
  "light-orange": "#f5b62f",
  "light orange": "#f5b62f",
  cast: "#f5b62f",
  "cast-orange": "#f5b62f",
  bleach: "#faf9f5",
  peach: "#ffdab9",
  seftali: "#ffdab9",
  "light-blue": "#add8e6",
  lightblue: "#add8e6",
  "acik-mavi": "#add8e6",
  acikmavi: "#add8e6",
  mavi: "#add8e6",
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
  const trimmed = typeof value === "string" ? value.trim() : "";
  if (isEnglishLocale() && isTurkishText(trimmed)) return "";
  return trimmed;
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
  if (link.pageId === "2tplvqpo-contact-page") return tLocalized("/pages/iletisim", "/pages/iletisim");
  if (link.pageId === "2tplvqpo-references-page") return "/pages/referanslar";
  if (link.label === tLocalized("Arama Sayfası", "Search Page")) return "/search";
  if (link.label === tLocalized("iletişim", "iletişim") || link.label === tLocalized("İletişim", "Contact")) return tLocalized("/pages/iletisim", "/pages/iletisim");
  return "";
}

function setLocalizedOverride(
  target: PlainObject,
  key: string,
  valueTr: string | undefined,
  valueEn: string | undefined,
  fallbackTr: string,
  fallbackEn: string,
  onlyCustom: boolean,
) {
  if (onlyCustom && !hasStudioTextOverride(valueTr, valueEn, fallbackTr, fallbackEn)) return;
  const value = localizedStudioText(valueTr, valueEn, fallbackTr, fallbackEn).trim();
  if (value) target[key] = value;
}

function productDetailPropOverrides(props: SingleProductRuntimeProps, onlyCustom = false) {
  const announcement: PlainObject = {};
  const breadcrumb: PlainObject = {};
  const hero: PlainObject = {};

  setLocalizedOverride(announcement, "strongText", props.announcementStrongText, props.announcementStrongTextEn, "Fırsatı kaçırmayın.", "Don't miss the opportunity.", onlyCustom);
  setLocalizedOverride(announcement, "longText", props.announcementText, props.announcementTextEn, "CE Class IIa CRS Composite'i cihazınızın parametreleriyle birlikte kalibre ederek, ücretsiz kurulum desteğiyle teslim ediyoruz.", "We deliver the CE Class IIa CRS Composite calibrated with your device parameters and provide free setup support.", onlyCustom);
  setLocalizedOverride(announcement, "ctaText", props.announcementButtonText, props.announcementButtonTextEn, "Ücretsiz parametre uyumlaması →", "Free parameter matching →", onlyCustom);

  if (Object.keys(announcement).length) announcement.enabled = true;

  const announcementButtonHref = linkValue(props.announcementButtonHref);
  if (announcementButtonHref) {
    if (props.showAnnouncement !== false) announcement.enabled = true;
    announcement.ctaHref = announcementButtonHref;
  }

  if (props.showAnnouncement === false) announcement.enabled = false;

  setLocalizedOverride(breadcrumb, "homeText", props.breadcrumbHomeText, props.breadcrumbHomeTextEn, "Ana sayfa", "Home", onlyCustom);
  const categoryUsesPrimaryProp = Boolean(trimmedText(props.breadcrumbCategoryText));
  setLocalizedOverride(
    breadcrumb,
    "categoryText",
    categoryUsesPrimaryProp ? props.breadcrumbCategoryText : props.categoryText,
    categoryUsesPrimaryProp ? props.breadcrumbCategoryTextEn : props.categoryTextEn,
    categoryUsesPrimaryProp ? "Dental Reçineler" : "Kategori",
    categoryUsesPrimaryProp ? "Dental Resins" : "Category",
    onlyCustom,
  );

  const breadcrumbCategoryHref = linkValue(props.breadcrumbCategoryHref);
  if (breadcrumbCategoryHref) breadcrumb.categoryHref = breadcrumbCategoryHref;
  const breadcrumbHomeHref = linkValue(props.breadcrumbHomeHref);
  if (breadcrumbHomeHref) breadcrumb.homeHref = breadcrumbHomeHref;

  setLocalizedOverride(hero, "kicker", props.heroKicker, props.heroKickerEn, "CRS Composite · Biyouyumlu Kron-Köprü Reçinesi", "CRS Composite · Biocompatible Crown-and-Bridge Resin", onlyCustom);
  setLocalizedOverride(hero, "titleHtml", props.heroTitleHtml, props.heroTitleHtmlEn, "Daimi kron artık <em>baskıdan</em> çıkıyor.", "The permanent crown now comes out of a <em>print.</em>", onlyCustom);
  setLocalizedOverride(hero, "leadHtml", props.heroDescriptionHtml, props.heroDescriptionHtmlEn, "Geçici ve daimi kuron-köprülerin katmanlı üretimi için biyouyumlu reçine. Sektörde önde gelen rakiplerine kıyasla <b>daha yüksek bükülme mukavemeti</b> ve hassas marjinal uyum sağlar; yarı saydamlık-opaklık arasında dengeli translüsentliğe sahiptir. Ağız koşullarına dayanıklıdır, tat ve koku yapmaz.", "A biocompatible resin for layered production of temporary and permanent crowns and bridges. It provides <b>higher flexural strength</b> and precise marginal fit compared to leading competitors; it has balanced translucency between semi-transparency and opacity. It is resistant to oral conditions and produces no taste or odor.", onlyCustom);

  const pillInputs = [
    [props.heroPill1Label, props.heroPill1LabelEn, props.heroPill1Value, props.heroPill1ValueEn, "eğilme mukavemeti", "flexural strength", "144 MPa", "144 MPa"],
    [props.heroPill2Label, props.heroPill2LabelEn, props.heroPill2Value, props.heroPill2ValueEn, "eğilme modülü", "flexural modulus", "5000 MPa", "5000 MPa"],
    [props.heroPill3Label, props.heroPill3LabelEn, props.heroPill3Value, props.heroPill3ValueEn, "Class IIa", "Class IIa", "CE", "CE"],
    [props.heroPill4Label, props.heroPill4LabelEn, props.heroPill4Value, props.heroPill4ValueEn, "Sararma yapmaz", "Does not turn yellow", "", ""],
    [props.heroPill5Label, props.heroPill5LabelEn, props.heroPill5Value, props.heroPill5ValueEn, "yapmaz", "free", "Tat ve koku", "Taste and odor"],
    [props.heroPill6Label, props.heroPill6LabelEn, props.heroPill6Value, props.heroPill6ValueEn, "dayanıklıdır", "oral conditions", "Ağız koşullarına", "Resistant to"],
  ] as const;

  const pills: Array<{ label: string; value?: string }> = [];
  pillInputs.forEach(([labelTr, labelEn, valueTr, valueEn, labelFallbackTr, labelFallbackEn, valueFallbackTr, valueFallbackEn], index) => {
    if (index === 4 && props.showHeroPill5 !== true) return;
    if (index === 5 && props.showHeroPill6 !== true) return;
    const label = localizedStudioText(labelTr, labelEn, labelFallbackTr, labelFallbackEn).trim();
    const value = localizedStudioText(valueTr, valueEn, valueFallbackTr, valueFallbackEn).trim();
    if (label || value) pills.push({ label, value: value || undefined });
  });
  if (!onlyCustom || pills.some((pill, index) => index >= 4) || pillInputs.slice(0, 4).some(([labelTr, labelEn, valueTr, valueEn, labelFallbackTr, labelFallbackEn, valueFallbackTr, valueFallbackEn]) =>
    hasStudioTextOverride(labelTr, labelEn, labelFallbackTr, labelFallbackEn) ||
    hasStudioTextOverride(valueTr, valueEn, valueFallbackTr, valueFallbackEn)
  )) hero.pills = pills;

  setLocalizedOverride(hero, "galleryBadge", props.galleryBadge, props.galleryBadgeEn, "CE CLASS IIa", "CE CLASS IIa", onlyCustom);
  setLocalizedOverride(hero, "selectedPrefix", props.selectedPrefix, props.selectedPrefixEn, "Seçiminiz:", "Your selection:", onlyCustom);
  setLocalizedOverride(hero, "summarySuffix", props.summarySuffix, props.summarySuffixEn, "— parametre uyarlaması ve teknik destek dahil.", "— parameter matching and technical support included.", onlyCustom);
  setLocalizedOverride(hero, "whatsappText", props.whatsappButtonText, props.whatsappButtonTextEn, "WhatsApp'tan sor", "Ask via WhatsApp", onlyCustom);

  const whatsappButtonHref = linkValue(props.whatsappButtonHref);
  if (whatsappButtonHref) hero.whatsappHref = whatsappButtonHref;

  const trustBadges = [
    localizedStudioText(props.trustBadge1, props.trustBadge1En, "Ücretsiz kargo", "Free shipping"),
    localizedStudioText(props.trustBadge2, props.trustBadge2En, "Koşulsuz iade", "Hassle-free returns"),
    localizedStudioText(props.trustBadge3, props.trustBadge3En, "Güvenli ödeme", "Secure payment"),
  ].map(trimmedText).filter(Boolean);
  if (!onlyCustom || [props.trustBadge1, props.trustBadge2, props.trustBadge3].some((value, index) =>
    hasStudioTextOverride(
      value,
      [props.trustBadge1En, props.trustBadge2En, props.trustBadge3En][index],
      ["Ücretsiz kargo", "Koşulsuz iade", "Güvenli ödeme"][index],
      ["Free shipping", "Hassle-free returns", "Secure payment"][index],
    )
  )) hero.trustBadges = trustBadges;

  const overrides: PlainObject = {};
  if (Object.keys(announcement).length || props.showAnnouncement === false) overrides.announcement = announcement;
  if (Object.keys(breadcrumb).length) overrides.breadcrumb = breadcrumb;
  if (Object.keys(hero).length) overrides.hero = hero;
  return overrides;
}

function productDetailPropKey(props: SingleProductRuntimeProps) {
  return Object.entries(props)
    .filter(([key]) => key !== "product" && key !== "renderMode")
    .map(([key, value]) => {
      if (/^galleryImage[1-5]$/.test(key) || key === "trustBadgeIconImage") {
        const image = value as IkasImage | null | undefined;
        return image ? getDefaultSrc(image) : "";
      }
      return typeof value === "object" ? linkValue(value) : String(value ?? "");
    })
    .join("\n");
}

function propsTemplateData(props: SingleProductRuntimeProps): ProductDetailTemplateData {
  const template = deepMerge(CRS_COMPOSITE_TEMPLATE(), parseTemplateJson(props.productTemplateJson));
  const merged = deepMerge(template, productDetailPropOverrides(props));
  merged.hero.gallery = studioGallery(merged.hero.gallery, props, false);
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

function studioGallery(
  gallery: ProductGalleryItem[],
  props: SingleProductRuntimeProps,
  onlyCustom: boolean,
): ProductGalleryItem[] {
  const images: Array<IkasImage | null | undefined> = [
    props.galleryImage1,
    props.galleryImage2,
    props.galleryImage3,
    props.galleryImage4,
    props.galleryImage5,
  ];
  const altTexts = [
    [props.galleryImage1Alt, props.galleryImage1AltEn, "CRS Composite CE Class IIa sertifikalı geçici ve daimi reçinesi", "CRS Composite CE Class IIa certified temporary and permanent resin"],
    [props.galleryImage2Alt, props.galleryImage2AltEn, "CRS Composite kron uygulaması", "CRS Composite crown application"],
    [props.galleryImage3Alt, props.galleryImage3AltEn, "CRS Composite köprü uygulaması", "CRS Composite bridge application"],
    [props.galleryImage4Alt, props.galleryImage4AltEn, "CRS Composite restorasyon", "CRS Composite restoration"],
    [props.galleryImage5Alt, props.galleryImage5AltEn, "CRS Composite model üzerinde geçici", "Temporary on the CRS Composite model"],
  ] as const;

  return Array.from({ length: Math.max(gallery.length, images.length) }, (_, index) => {
    const image = images[index];
    const existing = gallery[index];
    const [altTr, altEn, fallbackTr, fallbackEn] = altTexts[index];
    const hasAltOverride = hasStudioTextOverride(altTr, altEn, fallbackTr, fallbackEn);
    if (!image && !existing) return null;

    const src = image ? getDefaultSrc(image) : existing?.src;
    if (!src) return existing || null;

    const alt = image
      ? hasAltOverride
        ? localizedStudioText(altTr, altEn, fallbackTr, fallbackEn)
        : (typeof image.altText === "string" && image.altText.trim()) || localizedStudioText(altTr, altEn, fallbackTr, fallbackEn)
      : !onlyCustom || hasAltOverride
        ? localizedStudioText(altTr, altEn, fallbackTr, fallbackEn)
        : existing?.alt || fallbackTr;

    return {
      ...(existing || {}),
      src,
      alt,
      ...(image ? { thumbSrc: undefined } : {}),
    };
  }).filter((item): item is ProductGalleryItem => item !== null);
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

function makeWhatsappHref(product: IkasProduct, props: SingleProductRuntimeProps) {
  const productUrl = typeof window !== "undefined" ? window.location.href : getProductHref(product);
  const phoneNumber = trimmedText(props.whatsappPhoneNumber).replace(/\D/g, "");
  if (!/^\d{8,15}$/.test(phoneNumber)) return "";
  const template = localizedStudioText(
    props.whatsappMessageTemplate,
    props.whatsappMessageTemplateEn,
    "Merhaba, {productName} ile ilgileniyorum. Detaylı bilgi alabilir miyim? {productUrl}",
    "Hello, I am interested in {productName}. Could I get more information? {productUrl}",
  );
  const message = template
    .split("{productName}").join(product.name)
    .split("{productUrl}").join(productUrl || "");
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

function genericProductData(product: IkasProduct, variant: IkasProductVariant | null, labels: SingleProductRuntimeProps): ProductDetailTemplateData {
  const firstCategory = product.categories?.[0];
  const categoryText = categoryName(firstCategory) || product.brand?.name || "";
  const categoryLink = categoryHref(firstCategory);
  const gallery = productMediaGallery(product, variant);
  const href = getProductHref(product) || `/${productSlug(product)}`;
  return {
    key: productSlug(product) || product.id || product.name,
    announcement: { enabled: false, strongText: "", ctaText: "", ctaHref: "#satinal" },
    breadcrumb: {
      homeText: localizedStudioText(labels.breadcrumbHomeText, labels.breadcrumbHomeTextEn, "Ana sayfa", "Home"),
      homeHref: "/",
      categoryText,
      categoryHref: categoryLink,
      productText: product.name,
    },
    hero: {
      kicker: categoryText,
      titleHtml: product.name,
      leadHtml: summaryText(product),
      pills: [],
      gallery,
      selectedPrefix: localizedStudioText(labels.selectedPrefix, labels.selectedPrefixEn, "Seçiminiz:", "Your selection:"),
      summarySuffix: "",
      buyHrefBase: href,
      whatsappHref: makeWhatsappHref(product, labels),
      whatsappText: localizedStudioText(labels.whatsappButtonText, labels.whatsappButtonTextEn, "WhatsApp'tan sor", "Ask via WhatsApp"),
      addToCartText: localizedStudioText(labels.addToCartText, labels.addToCartTextEn, "SEPETE EKLE", "ADD TO CART"),
      addingToCartText: localizedStudioText(labels.addingToCartText, labels.addingToCartTextEn, "Ekleniyor...", "ADDING..."),
      outOfStockText: localizedStudioText(labels.outOfStockText, labels.outOfStockTextEn, "Stok Yok", "OUT OF STOCK"),
      trustBadges: [],
    },
    ratings: {
      index: "01",
      label: tLocalized("Ürün Bilgileri", "Product Information"),
      titleHtml: tLocalized("Kullanıcı deneyimi ve ürün kullanımı.", "Product experience and usage."),
      sideHtml: tLocalized("Ürün bilgileri ve kullanım detayları.", "Product information and usage details."),
      panelTitleHtml: tLocalized("Geri Bildirim &amp; Deneyim Başlığı", "Feedback &amp; Experience Title"),
      note: tLocalized("Örnek açıklama veya araştırma notu", "Sample description or research note"),
      items: [
        { descriptionHtml: tLocalized("Ürün kullanım deneyimi hakkında bilgi.", "Information about the product experience."), percent: 95 },
        { descriptionHtml: tLocalized("Günlük iş akışına uyum sağlayan kullanım.", "Usage designed to fit the daily workflow."), percent: 90 },
        { descriptionHtml: tLocalized("Teknik destek ve yönlendirme için bizimle iletişime geçin.", "Contact us for technical support and guidance.") },
      ],
    },
    metrics: {
      index: "02",
      label: tLocalized("TEKNİK ÖZELLİKLER", "TECHNICAL SPECIFICATIONS"),
      titleHtml: tLocalized("Bölüm ana başlığı ve <span class=\"em\">vurgulu metin.</span>", "Section main heading and <span class=\"em\">highlighted text.</span>"),
      sideHtml: tLocalized("Teknik özellikler ve ürün detayları hakkında bilgi alın.", "Learn about technical specifications and product details."),
      items: [
        { name: tLocalized("Ürün özelliği", "Product feature"), value: "01", unit: tLocalized("Bilgi", "Info"), caption: tLocalized("Ürün özellikleri için ürün açıklamasını inceleyin.", "See the product description for specifications.") },
        { name: tLocalized("Kullanım", "Usage"), value: "02", unit: tLocalized("Bilgi", "Info"), caption: tLocalized("Kullanım detayları için bizimle iletişime geçin.", "Contact us for usage details.") },
        { name: tLocalized("Destek", "Support"), value: "03", unit: tLocalized("Bilgi", "Info"), caption: tLocalized("Teknik destek seçenekleri hakkında bilgi alın.", "Learn about technical support options.") },
      ],
    },
    useCases: {
      index: "03",
      label: tLocalized("KULLANIM ALANLARI", "APPLICATION AREAS"),
      titleHtml: tLocalized("Kullanım alanları ve <span class=\"em\">uygulama seçenekleri.</span>", "Application areas and <span class=\"em\">usage options.</span>"),
      sideHtml: tLocalized("Ürününüz için uygun kullanım alanlarını keşfedin.", "Explore suitable applications for your product."),
      photos: [
        {
          src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/deb67f5e-a02a-4fa6-9cb8-595a277d69fd/1080/composite-apps-10.webp",
          alt: tLocalized("1. Görsel", "1. Image"),
          title: tLocalized("1. Görsel Başlığı", "1. Image Title"),
          text: tLocalized("Ürün kullanımından bir görünüm.", "A view of the product in use."),
        },
        {
          src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/9d7bb34c-1f0d-4b36-8f0e-ce9a41863d55/1080/composite-apps-11.webp",
          alt: tLocalized("2. Görsel", "2. Image"),
          title: tLocalized("2. Görsel Başlığı", "2. Image Title"),
          text: tLocalized("Ürünün iş akışındaki kullanımını inceleyin.", "See the product in the workflow."),
        },
        {
          src: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1cd726f4-d0ec-4f4b-9407-ca7a84da9961/1080/composite-apps-12.webp",
          alt: tLocalized("3. Görsel", "3. Image"),
          title: tLocalized("3. Görsel Başlığı", "3. Image Title"),
          text: tLocalized("Detaylı ürün bilgileri için iletişime geçin.", "Contact us for detailed product information."),
        },
      ],
      cards: [
        {
          eyebrow: tLocalized("KART ETİKETİ 1", "CARD LABEL 1"),
          title: tLocalized("1. Kart Başlığı", "1. Card Title"),
          items: [tLocalized("Ürün özellikleri", "Product features"), tLocalized("Kullanım seçenekleri", "Usage options"), tLocalized("Teknik destek", "Technical support")],
        },
        {
          eyebrow: tLocalized("KART ETİKETİ 2", "CARD LABEL 2"),
          title: tLocalized("2. Kart Başlığı", "2. Card Title"),
          items: [tLocalized("Kurulum desteği", "Setup support"), tLocalized("Kullanım önerileri", "Usage guidance")],
        },
      ],
      devices: {
        eyebrow: "UYUMLULUK",
        title: tLocalized("Sistem ve cihaz uyumluluğu başlığı.", "System and device compatibility heading."),
        textHtml: tLocalized("Uyumluluk bilgileri için ürün detaylarını ve teknik desteği inceleyin.", "Review the product details and technical support for compatibility information."),
        chips: [
          { label: tLocalized("Uyumlu cihaz", "Compatible device"), highlighted: true },
          { label: tLocalized("Teknik uyumluluk", "Technical compatibility"), highlighted: true },
          { label: tLocalized("Kurulum desteği", "Setup support") },
          { label: tLocalized("İş akışı desteği", "Workflow support") },
        ],
      },
    },
    faq: {
      index: "04",
      label: tLocalized("SIKÇA SORULAN SORULAR", "FREQUENTLY ASKED QUESTIONS"),
      titleHtml: tLocalized("Sıkça sorulan sorular <span class=\"em\">ve yanıtlar.</span>", "Frequently asked questions <span class=\"em\">and answers.</span>"),
      sideHtml: tLocalized("Bu ürünle ilgili en çok merak edilen konulara dair açıklamalar.", "Explanations for the most frequently asked questions about this product."),
      openFirst: true,
      items: [
        {
          question: tLocalized("Bu ürün hangi iş akışlarına uygundur?", "Which workflows is this product suitable for?"),
          answerHtml: tLocalized("Ürünün iş akışınıza uygunluğu hakkında bilgi almak için bizimle iletişime geçin.", "Contact us to learn how the product fits your workflow."),
        },
        {
          question: tLocalized("Kurulumdan önce neler kontrol edilmelidir?", "What should be checked before installation?"),
          answerHtml: tLocalized("Kurulum ve kullanım öncesi gereksinimler ürün detaylarına göre değişebilir; ekibimiz yardımcı olur.", "Pre-installation and usage requirements vary by product; our team can help."),
        },
        {
          question: tLocalized("Bu ürün için nasıl bilgi alabilirim?", "How can I get more information about this product?"),
          answerHtml: tLocalized("Uygulama seçenekleri ve teknik özellikler için ürün bilgilerini inceleyin.", "Review the product information for applications and technical specifications."),
        },
      ],
    },
    specHighlight: {
      tag: tLocalized("ÖNE ÇIKAN DETAY", "FEATURED DETAIL"),
      titleHtml: tLocalized("Siyah kutu başlığı ve <span class=\"em\">vurgulu metin.</span>", "Black box heading and <span class=\"em\">highlighted text.</span>"),
      descriptionHtml: tLocalized("Ürün özellikleri ve kullanım seçenekleri hakkında bilgi alın.", "Learn about product features and usage options."),
      ctaText: tLocalized("İncele →", "View →"),
      ctaHref: "#satinal",
      rows: [
        { label: tLocalized("Özellik Adı 1", "Feature Name 1"), value: tLocalized("Özellik Değeri 1", "Feature Value 1") },
        { label: tLocalized("Özellik Adı 2", "Feature Name 2"), value: tLocalized("Özellik Değeri 2", "Feature Value 2") },
        { label: tLocalized("Özellik Adı 3", "Feature Name 3"), value: tLocalized("Özellik Değeri 3", "Feature Value 3") },
        { label: tLocalized("Özellik Adı 4", "Feature Name 4"), value: tLocalized("Özellik Değeri 4", "Feature Value 4") },
      ],
    },
    related: {
      index: "07",
      label: tLocalized("İlgili Ürünler", "Related Products"),
      titleHtml: tLocalized("Aynı kategorideki <span class=\"em\">diğer ürünler.</span>", "<span class=\"em\">Other products</span> in the same category."),
      items: [
        {
          tag: tLocalized("1. KATEGORİ", "1. CATEGORY"),
          title: tLocalized("1. Örnek İlgili Ürün", "1. Sample Related Product"),
          descriptionHtml: tLocalized("Aynı ürün ailesindeki seçenekleri inceleyin.", "Explore options from the same product family."),
          href: "#",
          linkText: tLocalized("İncele", "Explore"),
          background: "#0E0E0C",
          image: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/deb67f5e-a02a-4fa6-9cb8-595a277d69fd/1080/composite-apps-10.webp",
        },
        {
          tag: tLocalized("2. KATEGORİ", "2. CATEGORY"),
          title: tLocalized("2. Örnek İlgili Ürün", "2. Sample Related Product"),
          descriptionHtml: tLocalized("İhtiyacınıza uygun alternatif ürünleri keşfedin.", "Discover alternative products for your needs."),
          href: "#",
          linkText: tLocalized("İncele", "Explore"),
          background: "#0E0E0C",
          image: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/9d7bb34c-1f0d-4b36-8f0e-ce9a41863d55/1080/composite-apps-11.webp",
        },
        {
          tag: tLocalized("3. KATEGORİ", "3. CATEGORY"),
          title: tLocalized("3. Örnek İlgili Ürün", "3. Sample Related Product"),
          descriptionHtml: tLocalized("Uyumlu ürün ve aksesuar seçeneklerini görün.", "View compatible products and accessories."),
          href: "#",
          linkText: tLocalized("İncele", "Explore"),
          background: "#0E0E0C",
          image: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1cd726f4-d0ec-4f4b-9407-ca7a84da9961/1080/composite-apps-12.webp",
        },
        {
          tag: tLocalized("4. KATEGORİ", "4. CATEGORY"),
          title: tLocalized("4. Örnek İlgili Ürün", "4. Sample Related Product"),
          descriptionHtml: tLocalized("Ürün seçiminde ekibimizden destek alın.", "Get help from our team with product selection."),
          href: "#",
          linkText: tLocalized("İncele", "Explore"),
          background: "#0E0E0C",
          image: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/d875a523-2228-44a7-818d-022312b0a44d/1080/composite-resin-ce.webp",
        },
      ],
    },
    finalCta: {
      titleHtml: tLocalized("Ürün seçiminiz için <span class=\"em\">yanınızdayız.</span>", "We are <span class=\"em\">here to help</span> with your product selection."),
      textHtml: tLocalized("Ürün ve satın alma seçenekleri hakkında bilgi almak için ekibimizle iletişime geçin.", "Contact our team for product and purchase information."),
      primaryText: tLocalized("İletişime geç", "Contact us"),
      primaryHref: "#",
      secondaryText: tLocalized("Satın alma seçenekleri", "Purchase options"),
      secondaryHref: "#",
    },
  };
}

function templateData(
  product: IkasProduct,
  variant: IkasProductVariant | null,
  props: SingleProductRuntimeProps
) {
  const resolved = resolveProductDetailData(product) || genericProductData(product, variant, props);

  const LAB_PRODUCT_SLUGS = new Set([
    "mash-c1e-uv-kurleme-cihazi",
    "mash-w1e-ultrasonik-yikama-cihazi",
    "creality-washcure-uw-02",
    "mash-p16l-385nm-16k-dental-3d-yazici",
    "mash-curie-m1-dental-3d-yazici",
    "creality-halot-sky-6k",
    "3shape-e2",
    "3shape-e3",
    "3shape-e4",
    "trasformer-light-glass-mufla-sistemi",
  ]);

  const labProduct = typeof resolved.key === "string" && LAB_PRODUCT_SLUGS.has(resolved.key);

  const merged = labProduct
    ? resolved
    : deepMerge(
      deepMerge(
        resolved,
        parseTemplateJson(props.productTemplateJson)
      ),
      customJson(product)
    );
  const studioMerged = deepMerge(merged, productDetailPropOverrides(props, true));
  const gallery = studioGallery(
    studioMerged.hero.gallery.length ? studioMerged.hero.gallery : productMediaGallery(product, variant),
    props,
    true,
  );

  return {
    ...studioMerged,
    key: `${studioMerged.key}-${product.id || productSlug(product)}`,
    hero: {
      ...studioMerged.hero,
      addToCartText: labProduct
        ? studioMerged.hero.addToCartText
        : localizedStudioText(props.addToCartText, props.addToCartTextEn, "SEPETE EKLE", "ADD TO CART"),
      addingToCartText: labProduct
        ? studioMerged.hero.addingToCartText
        : localizedStudioText(props.addingToCartText, props.addingToCartTextEn, "Ekleniyor...", "ADDING..."),
      outOfStockText: labProduct
        ? studioMerged.hero.outOfStockText
        : localizedStudioText(props.outOfStockText, props.outOfStockTextEn, "Stok Yok", "OUT OF STOCK"),
      gallery,
    },
  };
}

function previewVariantGroups(selection: PreviewSelection, props: SingleProductRuntimeProps): ProductVariantGroup[] {
  return [
    {
      id: "preview-color",
      name: localizedStudioText(props.previewColorLabel, props.previewColorLabelEn, "Renk", "Colour"),
      values: [
        { id: "preview-color-1", name: localizedStudioText(props.previewColor1, props.previewColor1En, "A1", "A1"), color: props.previewColorHex1 || "#ede9d0" },
        { id: "preview-color-2", name: localizedStudioText(props.previewColor2, props.previewColor2En, "A2", "A2"), color: props.previewColorHex2 || "#efead4" },
        { id: "preview-color-3", name: localizedStudioText(props.previewColor3, props.previewColor3En, "A3", "A3"), color: props.previewColorHex3 || "#e1d6b5" },
      ].map((value) => ({
        ...value,
        selected: (selection["preview-color"] || "preview-color-1") === value.id,
        hasStock: true,
        rawValue: { groupId: "preview-color", valueId: value.id },
      })),
    },
    {
      id: "preview-size",
      name: localizedStudioText(props.previewSizeLabel, props.previewSizeLabelEn, "Boyut", "Dimension"),
      values: [
        { id: "preview-size-1", name: localizedStudioText(props.previewSize1, props.previewSize1En, "500 gr", "500 g") },
        { id: "preview-size-2", name: localizedStudioText(props.previewSize2, props.previewSize2En, "1000 gr", "1000 g") },
      ].map((value) => ({
        ...value,
        selected: (selection["preview-size"] || "preview-size-1") === value.id,
        hasStock: true,
        rawValue: { groupId: "preview-size", valueId: value.id },
      })),
    },
  ];
}

function variantGroups(product: IkasProduct): ProductVariantGroup[] {
  return (getDisplayedProductVariantTypes(product) || []).map((variantType) => {
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
        color: isColor ? color || "#ede9d0" : undefined,
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

export function ThreeMashProductDetailLive(props: SingleProductRuntimeProps) {
  const [fetchedProduct, setFetchedProduct] = useState<IkasProduct | null>(null);
  const product = props.product || fetchedProduct;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState("");
  const [version, setVersion] = useState(0);
  const [previewSelection, setPreviewSelection] = useState<PreviewSelection>({});
  const [relatedProducts, setRelatedProducts] = useState<ProductDetailRelatedProduct[] | undefined>(undefined);

  // If props.product is missing (e.g. on /en routes where ikas doesn't pass the product object),
  // recover by resolving the slug from the URL and fetching via apiSearchProducts.
  useEffect(() => {
    if (props.product || typeof window === "undefined") return;

    let isMounted = true;
    const path = window.location.pathname.replace(/^\/en(\/|$)/, "/").replace(/\/+$/, "") || "/";
    const rawSlug = path.replace(/^\//, "");
    if (!rawSlug || rawSlug === "search" || rawSlug.startsWith("pages/")) return;

    const trTarget = EN_TO_TR_ROUTE_MAP[`/${rawSlug}`] || EN_TO_TR_ROUTE_MAP[path];
    const trSlug = trTarget ? trTarget.replace(/^\//, "") : rawSlug;

    const searchQuery = trSlug.replace(/-/g, " ");

    apiSearchProducts({
      input: {
        query: searchQuery,
        perPage: 5,
      },
    } as Parameters<typeof apiSearchProducts>[0])
      .then((res) => {
        if (!isMounted) return;
        const products = res?.data?.data || [];
        if (!products.length) return;

        // Try exact match on slug or name
        const match =
          products.find((p) => {
            const s = productSlug(p);
            return s === trSlug || s === rawSlug;
          }) || products[0];

        if (match) {
          setFetchedProduct(match);
        }
      })
      .catch((err) => {
        debugError("ThreeMashProductDetailLive: failed to recover product from slug", err);
      });

    return () => {
      isMounted = false;
    };
  }, [props.product]);

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
  const groups = useMemo(() => (product ? variantGroups(product) : previewVariantGroups(previewSelection, props)), [product?.id, version, previewSelection, detailPropKey]);
  const isInStock = !!product && !!variant && hasProductStock(product) && hasProductVariantStock(variant);
  const requiresVariantSelection = !!product && !hasProductValidOptionValues(product);
  // IKAS can return an incomplete variant in the Studio "Tekli Ürün" preview.
  // The native price helpers assume price data exists and can throw on undefined.discountPrice.
  // Keep this component render-safe when Studio gives us an incomplete variant.
  const safeHasDiscount = (currentVariant: IkasProductVariant | null): boolean => {
    if (!currentVariant) return false;
    try {
      return !!hasProductVariantDiscount(currentVariant);
    } catch (error) {
      debugError("ThreeMashProductDetailLive: discount detection failed", error);
      return false;
    }
  };

  const safeFinalPrice = (currentVariant: IkasProductVariant | null): string => {
    if (!currentVariant) return "";
    try {
      return getProductVariantFormattedFinalPrice(currentVariant) || "";
    } catch (error) {
      debugError("ThreeMashProductDetailLive: final price formatting failed", error);
      return "";
    }
  };

  const safeSellPrice = (currentVariant: IkasProductVariant | null): string => {
    if (!currentVariant) return "";
    try {
      return getProductVariantFormattedSellPrice(currentVariant) || "";
    } catch (error) {
      debugError("ThreeMashProductDetailLive: sell price formatting failed", error);
      return "";
    }
  };

  const hasDiscount = safeHasDiscount(variant);
  const addDisabled = !isInStock || requiresVariantSelection;

  useEffect(() => {
    const productList = categoryProductList(product, 12);
    const currentId = product?.id || "";
    const currentCategoryId = product ? categoryId(firstProductCategory(product)) : "";
    if (!product || !productList || !currentId || !currentCategoryId) {
      setRelatedProducts([]);
      return undefined;
    }
    let isMounted = true;
    getProductListInitialData(productList)
      .then(async () => {
        if (!isMounted) return;
        const listedProducts = listProducts(productList);
        const response = currentCategoryId
          ? await apiSearchProducts({
            input: {
              categoryIdList: [currentCategoryId],
              page: 1,
              perPage: 20,
            },
          } as Parameters<typeof apiSearchProducts>[0])
          : null;
        const apiProducts = response?.data?.data || [];
        const liveRelatedProducts = (apiProducts.length ? apiProducts : listedProducts)
          .filter((item) => item.id !== currentId)
          .slice(0, 8)
          .map(relatedProduct);
        setRelatedProducts(liveRelatedProducts.length ? liveRelatedProducts : []);
      })
      .catch((error) => {
        debugError("ThreeMashProductDetailLive related products failed", error);
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

    if (isCustomerAuthenticated() !== "authenticated") {
      setMessage(localizedStudioText(props.loginRequiredMessage, props.loginRequiredMessageEn, "Lütfen giriş yapın.", "Please sign in."));
      window.setTimeout(() => {
        window.location.href = safeRedirect(localizedHref("/account/login"));
      }, 250);
      return;
    }

    if (!hasProductValidOptionValues(product)) {
      setMessage(localizedStudioText(props.optionRequiredMessage, props.optionRequiredMessageEn, "Lütfen gerekli ürün seçeneklerini tamamlayın.", "Please complete the required product options."));
      return;
    }

    if (!isAddToCartEnabled(product)) {
      setMessage(localizedStudioText(props.addToCartErrorMessage, props.addToCartErrorMessageEn, "Ürün sepete eklenemiyor.", "The product cannot be added to the cart."));
      return;
    }

    setIsAdding(true);
    setMessage("");

    try {
      rememberOrderLineImageFallback(
        product,
        variant,
        data?.hero.gallery[selectedImageIndex]?.src
          ? [data.hero.gallery[selectedImageIndex].src]
          : image ? [getDefaultSrc(image)] : []
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
        setMessage(localizedStudioText(props.addToCartErrorMessage, props.addToCartErrorMessageEn, "Ürün sepete eklenemedi.", "The product could not be added to the cart."));
      }
    } catch (error) {
      debugError("ThreeMashProductDetailLive add to cart failed", error);
      setMessage(localizedStudioText(props.addToCartErrorMessage, props.addToCartErrorMessageEn, "Ürün sepete eklenemedi. Lütfen daha sonra tekrar deneyin.", "The product could not be added to the cart. Please try again."));
    } finally {
      setIsAdding(false);
    }
  }

  if (!data) {
    return (
      <section className="three-mash-product-detail-live" style={style}>
        <div className="tmpdl-setup">
          {localizedStudioText(props.setupMessage, props.setupMessageEn, "Bu bölüm Ürün Sayfası için tasarlandı. Ürün alanını ikas ürün verisine bağlayın.", "This section is designed for product pages. Connect the product field to ikas product data.")}
        </div>
      </section>
    );
  }

  if (props.renderMode === "hero") {
    return (
      <section className="three-mash-product-detail-live" style={style} data-product-detail-key={data.key}>
        <ProductDetailSectionScope data={data}>
          <ProductDetailHeroSection
            data={data}
            variantGroups={groups}
            showBreadcrumb={props.showBreadcrumb !== false}
            showGallery={props.showGallery !== false}
            showGalleryBadge={props.showGalleryBadge !== false}
            galleryThumbAriaLabel={localizedStudioText(props.galleryThumbAriaLabel, props.galleryThumbAriaLabelEn, "Ürün görseli", "Product image")}
            trustBadgeIconSrc={props.trustBadgeIconImage ? getDefaultSrc(props.trustBadgeIconImage) : ""}
            showHeroKicker={props.showHeroKicker !== false}
            showHeroDescription={props.showHeroDescription !== false}
            showHeroPills={props.showHeroPills !== false}
            showSelectionSummary={props.showSelectionSummary !== false}
            showAddToCartButton={props.showAddToCartButton !== false}
            showWhatsAppButton={props.showWhatsAppButton !== false}
            showTrustBadges={props.showTrustBadges !== false}
            selectedGalleryIndex={selectedImageIndex}
            onGallerySelect={setSelectedImageIndex}
            onVariantSelect={(value) => {
              if (!product) {
                const item = value as { groupId?: string; valueId?: string };
                if (item.groupId && item.valueId) setPreviewSelection((current) => ({ ...current, [item.groupId as string]: item.valueId as string }));
                return;
              }
              // NOTE: selectVariantValue is from @ikas/bp-storefront (third-party).
              // Its type signature is not available at compile time, so we use any here.
              // The value is from internal component callbacks (trusted source).
              selectVariantValue(product, value as any, true);
              setSelectedImageIndex(0);
              setMessage("");
              setVersion((current) => current + 1);
            }}
            onAddToCart={handleAddToCart}
            isAddToCartDisabled={addDisabled}
            isAdding={isAdding}
            message={message || (product && !isInStock ? data.hero.outOfStockText : "")}
            price={safeFinalPrice(variant)}
            compareAtPrice={hasDiscount ? safeSellPrice(variant) : ""}
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
        visibility={{
          photos: props.showPhotos !== false,
          card1: props.showUseCard1 !== false,
          card2: props.showUseCard2 !== false,
          devices: props.showDevices !== false,
          ecosystem: props.showEcosystem !== false,
        }}
        selectedGalleryIndex={selectedImageIndex}
        onGallerySelect={setSelectedImageIndex}
        onVariantSelect={(value) => {
          if (!product) {
            const item = value as { groupId?: string; valueId?: string };
            if (item.groupId && item.valueId) setPreviewSelection((current) => ({ ...current, [item.groupId as string]: item.valueId as string }));
            return;
          }
          // NOTE: selectVariantValue is from @ikas/bp-storefront (third-party).
          // Its type signature is not available at compile time, so we use any here.
          // The value is from internal component callbacks (trusted source).
          selectVariantValue(product, value as any, true);
          setSelectedImageIndex(0);
          setMessage("");
          setVersion((current) => current + 1);
        }}
        onAddToCart={handleAddToCart}
        isAddToCartDisabled={addDisabled}
        isAdding={isAdding}
        message={message || (product && !isInStock ? (isEnglishLocale() ? "Out of stock" : (data.hero.outOfStockText || tLocalized("Stok yok", "Out of stock"))) : "")}
        price={safeFinalPrice(variant)}
        compareAtPrice={hasDiscount ? safeSellPrice(variant) : ""}
        selectedSummary={selectedSummary(data, groups)}
        relatedProducts={relatedProducts}
      />
    </section>
  );
}

export default ThreeMashProductDetailLive;
