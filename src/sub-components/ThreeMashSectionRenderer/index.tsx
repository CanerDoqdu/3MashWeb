import { useEffect, useRef } from "preact/hooks";
import {
  createMediaSrcset,
  getDefaultSrc,
  getIkasCategoryHref,
  getProductHref,
  getProductVariantFormattedFinalPrice,
  getProductVariantFormattedSellPrice,
  getProductVariantMainImage,
  hasProductVariantDiscount,
  type IkasCategory,
  type IkasCategoryList,
  type IkasImage,
  type IkasNavigationLinkList,
  type IkasProduct,
  type IkasProductList,
  type IkasProductVariant,
} from "@ikas/bp-storefront";
import {
  profileBerkan,
  profileGoksel,
  profileMehmet,
} from "../../assets/remaining-assets-data";
import { tLocalized, isEnglishLocale, tProp, isTurkishText, localizedHref } from "../../utils/i18n";
import { sanitizeHtml, sanitizeSvgMarkup } from "../../utils/sanitizeHtml";
import { safeNavigationHref } from "../../utils/safeRedirect";
import {
  ecoBlocksIcon,
  ecoCuringIcon,
  ecoOvenIcon,
  ecoPrinterIcon,
  ecoResinIcon,
  ecoScannerIcon,
} from "../../assets/eco-icons-data";
import mashC1eImage from "../../assets/mash-c1e-section-clean-data";
import mashW1eImage from "../../assets/mash-w1e-section-clean-data";
import p1dSectionCardImage from "../../assets/p1d-section-card-data";
import { crsModelBottleImage } from "../../assets/crs-model-data";
import { p16lPrimaryImage } from "../../assets/solution-p16l-media-data";
import trustLogo1 from "../../assets/trust-logo-1-data";
import trustLogo2 from "../../assets/trust-logo-2-data";
import trustLogo3 from "../../assets/trust-logo-3-data";
import trustLogo4 from "../../assets/trust-logo-4-data";
import trustLogo5 from "../../assets/trust-logo-5-data";

const trustedLabelMarkup = `<span class="tmr-trusted-label"><span class="tmr-trusted-label-text">Güvenenler</span><img src="${trustLogo3}" alt="" aria-hidden="true"></span>`;
const bundledTrustedLogos = `<div class="tmr-trusted-logos"><span class="tmr-trusted-logo"><img src="${trustLogo1}" alt="Güvenen marka 1"></span><span class="tmr-trusted-logo"><img src="${trustLogo3}" alt="Güvenen marka 2"></span><span class="tmr-trusted-logo"><img src="${trustLogo4}" alt="Güvenen marka 3"></span></div>`;
const threeMashFullLogoImage =
  "https://cdn.myikas.com/images/theme-images/4a6af8e2-cb7c-4cc8-ba17-13656d4b8670/image_3840.webp";
const footerMapsHref =
  "https://www.google.com/maps/search/?api=1&query=Antalya%20Teknokent%2C%20Konyaalt%C4%B1";
const academyPageHref = "/pages/mash-academy";
const consultationWhatsappHref =
  "https://wa.me/905314326577?text=Merhaba%2C%20%C3%BCcretsiz%20dan%C4%B1%C5%9Fmanl%C4%B1k%20almak%20istiyorum";

const solutionSetupHtml = () => tLocalized("<div class=\"tmr-products-setup\">Ürünler kısa süre içinde burada listelenecek.</div>", "<div class=\"tmr-products-setup\">Products will be listed here shortly.</div>");

const legacyThemeCategoryNames = new Set([
  "clothing",
  "bags",
  "accessories",
  "hats & caps",
  "laptop sleeves",
]);

function isLegacyThemeCategoryName(value: string | null | undefined) {
  return legacyThemeCategoryNames.has(
    (value || "").replace(/\s+/g, " ").trim().toLowerCase(),
  );
}

export const defaultSolutionHtml = `
<section id="cozum" class="tmr-section tmr-section-tight">
  <div class="tmr-wrap">
    <div class="tmr-index"><span class="tmr-index-number">03</span><span class="tmr-index-text">Çözüm · Üretim Ekosistemi</span><span class="tmr-index-line"></span></div>
    <div class="tmr-head"><h2>Hassasiyet cihazdan çıkmaz; <span>uyumdan çıkar.</span></h2><div class="tmr-side">Kuronun oturması üç şeyin senkronuna bağlı: <b>yazıcı, reçine, kürleme.</b> Biz üçünü birlikte kalibre edip saha birikimiyle teslim ediyoruz — elinizdeki başka marka cihaza bile.</div></div>
    <div class="tmr-products-setup">Ürünler kısa süre içinde burada listelenecek.</div>
  </div>
</section>`;

export const defaultCuringHtml = `
<section class="tmr-section tmr-dark tmr-curing" id="kurleme">
  <div class="tmr-wrap">
    <div class="tmr-index"><span class="tmr-index-number">04</span><span class="tmr-index-text">Kritik Son Adım</span><span class="tmr-index-line"></span></div>
    <div class="tmr-head"><h2>Sadece yazıcı değil. Sonucu <span class="tmr-title-em">kürleme</span> tamamlar.</h2><div class="tmr-side">Baskı, cihazdan çıktığında bitmemiştir. Yanlış kürlenen iş, <b>doğru basılmış olsa bile</b> başarısız olur. İşte üç sebep:</div></div>
    <div class="tmr-why-grid"><article><div>SEBEP 01</div><h3>Mekanik dayanım</h3><p>Eksik kürleme (undercure) kırılganlık demek — geçici kron ve köprülerin <b>sık kırılmasının</b> en yaygın görünmez sebebi.</p></article><article id="piyasada-yaygin-kurulum-250-500" style="scroll-margin-top: 112px;"><div>SEBEP 02</div><h3>Ölçüsel doğruluk</h3><p>Fazla kürleme (overcure) malzemeyi <b>çeker ve deforme eder</b>. Yazıcıda kazanılan ±20 µm, kürleme ünitesinde kaybedilir.</p></article><article><div>SEBEP 03</div><h3>Biyouyumluluk &amp; renk</h3><p>Doğru dönüşüm derecesi <b>monomer salınımını</b> engeller; renk stabilitesi ve hasta güvenliği sağlar.</p></article></div>
    <div class="tmr-products tmr-products-two"><article class="tmr-product"><div class="tmr-product-media"><span class="tmr-tag tmr-lime-tag">YIKAMA</span><img class="tmr-product-img tmr-machine-phrozen" src="${mashW1eImage}" alt="Mash W1E Ultrasonik Yıkama Cihazı"></div><div class="tmr-product-body"><h3>Mash W1E Ultrasonik Yıkama Cihazı</h3><p>Reçine baskı sonrası yüzeyde kalan fazla reçineyi <b>ultrasonik temizleme</b> ile kısa sürede ve hassas biçimde uzaklaştırır; kürleme öncesi temiz yüzey sağlar.</p><div class="tmr-spec"><div><span>İşlem</span><b>Ultrasonik temizleme</b></div><div><span>Akış</span><b>Yıkama → kürleme hazırlığı</b></div></div><a class="tmr-go" href="/mash-w1e-ultrasonik-yikama-cihazi">İncele <span>→</span></a></div></article><article class="tmr-product"><div class="tmr-product-media"><span class="tmr-tag">KÜRLEME</span><img class="tmr-product-img tmr-machine-uw02" src="${mashC1eImage}" alt="Mash C1E UV Kürleme Cihazı"></div><div class="tmr-product-body"><h3>Mash C1E UV Kürleme Cihazı</h3><p>24 LED'li 360° kürleme sistemi ve 360-530 nm geniş spektrum desteğiyle <b>homojen UV post-curing</b> sağlar; mekanik dayanım, boyutsal doğruluk ve yüzey kalitesi hedefini tamamlar.</p><div class="tmr-spec"><div><span>Işık</span><b>24 LED / 360°</b></div><div><span>Spektrum</span><b>360-530 nm</b></div></div><a class="tmr-go" href="/mash-c1e-uv-kurleme-cihazi">İncele <span>→</span></a></div></article></div>
    <p class="tmr-readmore">Derine inmek isteyenlere, Mash Academy'den: <a href="/blog/dental-3d-baskida-overcure-ve-undercure-nedir-en-dogru-kurleme-icin-kapsamli-rehber">Overcure ve Undercure Nedir?</a> · <a href="/blog/dental-3d-baskida-dogru-dalga-boyu-secimi-385nm-mi-405nm-mi">385nm mi 405nm mi?</a></p>
  </div>
</section>`;

export function getDefaultRoiHtml() {
  return tLocalized("<div class=\"tmr-roi\"><div class=\"tmr-wrap\"><div class=\"tmr-roi-num\"><span>YATIRIMIN GERİ DÖNÜŞÜ</span><b>&lt; 6 ay</b></div><p>3mash ekosistemine geçen bir klinik, yatırımını <b>6 aydan kısa sürede</b> geri kazanma potansiyeline sahip. Sonrasında bu verimlilik her yıl sürer: <b>yılda $72–162K'ya varan tasarruf potansiyeli.</b></p><a class=\"tmr-btn\" href=\"/\">Kliniğiniz için hesaplayalım →</a></div></div>", "<div class=\"tmr-roi\"><div class=\"tmr-wrap\"><div class=\"tmr-roi-num\"><span>RETURN ON INVESTMENT</span><b>&lt; 6 months</b></div><p>A clinic that switches to the 3mash ecosystem has the potential to recover its investment in <b>less than 6 months</b>. After that, this efficiency continues every year: <b>up to $72–162K in potential annual savings.</b></p><a class=\"tmr-btn\" href=\"/\">Let's calculate it for your clinic →</a></div></div>");
}

export const defaultRoiHtml = new Proxy({} as { toString(): string }, {
  get(_target, prop) {
    const val = getDefaultRoiHtml();
    return typeof (val as any)[prop] === "function" ? (val as any)[prop].bind(val) : (val as any)[prop];
  },
});

export const defaultEcosystemHtml = `<section id="ekosistem" class="tmr-section"><div class="tmr-wrap"><div class="tmr-index"><span class="tmr-index-number">05</span><span class="tmr-index-text">Uçtan Uca</span><span class="tmr-index-line"></span></div><div class="tmr-head"><h2>Dijital akışın her parçası, <span>tek çatı altında.</span></h2><div class="tmr-side">Cihaz satıp gitmiyoruz: doğru ürün için <b>danışmanlık</b>, sürdürülebilirlik için <b>Academy eğitimleri</b>, satış sonrasında teknisyen + mühendis <b>teknik destek.</b></div></div><div class="tmr-eco"><a href="/3d-yazicilar"><span class="tmr-eco-icon"><img src="${ecoPrinterIcon}" alt="" aria-hidden="true"></span><span>3D Yazıcılar</span></a><a href="/dental-3d-yazici-recineleri"><span class="tmr-eco-icon"><img src="${ecoResinIcon}" alt="" aria-hidden="true"></span><span>Dental Reçineler</span></a><a href="/yikama-kurleme-cihazlari"><span class="tmr-eco-icon"><img src="${ecoScannerIcon}" alt="" aria-hidden="true"></span><span>Yıkama &amp; Kürleme</span></a><a href="/masasustu-tarayicilar"><span class="tmr-eco-icon"><img src="${ecoCuringIcon}" alt="" aria-hidden="true"></span><span>Masaüstü Tarayıcılar</span></a><a href="/zirkon-bloklar"><span class="tmr-eco-icon"><img src="${ecoBlocksIcon}" alt="" aria-hidden="true"></span><span>Zirkon Bloklar</span></a><a href="/dental-firinlar"><span class="tmr-eco-icon"><img src="${ecoOvenIcon}" alt="" aria-hidden="true"></span><span>Dental Fırınlar</span></a></div></div></section>`;

export const defaultTrustHtml = `<section id="guven" class="tmr-section tmr-section-tight"><div class="tmr-wrap"><div class="tmr-index"><span class="tmr-index-number">06</span><span class="tmr-index-text">Referanslar</span><span class="tmr-index-line"></span></div><div class="tmr-head"><h2>Güvenin <span>gerçek sonuçla eşleştiği yer.</span></h2><div class="tmr-side">Tutarlılık, görünür kalite ve sürdürülebilir üretim. <b>580+</b> dental klinik ve laboratuvar, aynı sistemle tek bir hedefe odaklanıyor.</div></div><div class="tmr-testimonials"><article class="tmr-testimonial tmr-featured"><div class="tmr-quote">“</div><p>Profesyoneller mutlak başarı için profesyonellere güvenir. Ekipman seçimi, temini, eğitimi ve kullanımında Mash ile iş birliği yapıyoruz.</p><div class="tmr-who"><img class="tmr-avatar" src="${profileMehmet}" alt="Mehmet İşlek"><div><b>Mehmet İşlek</b><small>ATTELIA · Kurucu Başhekim — 22 yıldır gülümseme tasarlayan klinik</small></div></div></article><article class="tmr-testimonial"><div class="tmr-quote">“</div><p>Yenilikçi ve yaratıcı. Donanım, yazılım ve malzemelerde uzun vadeli, başarılı bir iş birliği.</p><div class="tmr-who"><img class="tmr-avatar" src="${profileBerkan}" alt="Berkan Öztaş"><div><b>Berkan Öztaş</b><small>DENTEK · Genel Müd. Yard.</small></div></div></article><article class="tmr-testimonial"><div class="tmr-quote">“</div><p>Sorunları biz daha yaşamadan çözmüşler. Her zaman aynı kalitede üretim — mükemmel sonuçlar.</p><div class="tmr-who"><img class="tmr-avatar" src="${profileGoksel}" alt="Göksel Pişkin"><div><b>Göksel Pişkin</b><small>MIKRO LAB · Kurucu Ortak</small></div></div></article></div><div class="tmr-trusted">${trustedLabelMarkup}${bundledTrustedLogos}</div></div></section>`;

export const defaultFaqHtml = `<section id="sss" class="tmr-section tmr-section-tight"><div class="tmr-wrap"><div class="tmr-index"><span class="tmr-index-number">07</span><span class="tmr-index-text">Sık Sorulanlar</span><span class="tmr-index-line"></span></div><div class="tmr-head"><h2>Kısa, net cevaplar.</h2><div class="tmr-side">En kritik kararları hızlı vermeniz için, klinik ve laboratuvarlardan gelen soruları net cevaplarla topladık.</div></div><div class="tmr-faq"><details open><summary>Dental 3D baskıda ölçüsel hassasiyet neden bu kadar önemli?<span>+</span></summary><div>Çünkü bir restorasyonun ilk seferde oturması doğrudan ölçüsel hassasiyete bağlıdır. Ulusal ölçekli klinik verilerde kron tekrarlarının en sık sebepleri <b>proksimal uyumsuzluk, marjinal hatalar ve estetik başarısızlıktır</b> — üçü de birer hassasiyet problemidir. 3mash ekosistemi <b>±20 µm</b> boyutsal hassasiyeti, tek seferlik değil <b>her baskıda</b> tekrar edilebilir şekilde sağlar; bu da tekrar oranını ve gizli maliyeti düşürür.</div></details><details><summary>Bir kron tekrarının (remake) maliyeti gerçekte ne kadar?<span>+</span></summary><div>Tahminî olarak <b>~500 dolar</b> — ve bu tutarın büyük kısmı lab ücreti değil, <b>koltuk süresidir</b> (yeniden prep, ölçü ve yapıştırma randevusu). Klinik işletme gideri saatte ~$375 modellenir; tek bir tekrar bunun çoğunu tüketir. Kendi kalemlerinizle hesaplamak için <a href="#">maliyet detay sayfamıza</a> bakabilirsiniz.</div></details><details><summary>3D baskıda kürleme (post-curing) neden kritik?<span>+</span></summary><div>Çünkü baskı, cihazdan çıktığında henüz bitmemiştir. Yetersiz kürleme (undercure) <b>kırılganlık</b>, fazla kürleme (overcure) ise <b>deformasyon</b> yaratır — yazıcıda kazandığınız hassasiyeti kürlemede kaybedebilirsiniz. 3mash'in akıllı kürleme cihazı parametreleri otomatik yönetir ve bu riski kullanıcı hatasından arındırır.</div></details><details><summary>3mash yalnızca cihaz mı satıyor?<span>+</span></summary><div>Hayır. 3mash entegre bir <b>üretim ekosistemi</b> sunar: yazıcı, reçine ve kürlemeyi birlikte kalibre eder; danışmanlık, Mash Academy eğitimleri ve <b>diş teknisyeni + mühendislerden</b> oluşan satış sonrası teknik destekle tüm süreçte yanınızda olur.</div></details><details><summary>Elimdeki başka marka yazıcıyla çalışır mısınız?<span>+</span></summary><div>Evet. Hem reçine hem yazıcı tarafında güçlü bir teknik birikime sahip olduğumuz için çözümlerimiz <b>marka bağımsızdır</b>; mevcut cihazınızın parametrelerini optimize ederek onu da aynı sonuca getirebiliriz.</div></details></div></div></section>`;

export const defaultFinalHtml = `<section id="iletisim-cta" class="tmr-final"><div class="tmr-wrap"><h2>Bu görünmez kaybı <span>birlikte azaltalım.</span></h2><p>Mevcut iş akışınızı birlikte inceleyelim; kaybın nerede oluştuğunu birlikte görelim ve size uygun ekosistemi kuralım — <b class="tmr-final-white">elinizdeki cihazlarla bile.</b></p><div><a class="tmr-btn tmr-btn-lime" href="${consultationWhatsappHref}">Uzmana danış — ücretsiz</a><a class="tmr-btn tmr-btn-invert" href="${academyPageHref}">Mash Academy'yi keşfet</a></div></div></section>`;

export function getDefaultFooterHtml() {
  return renderFooterHtml({});
}

export const defaultFooterHtml = new Proxy({} as { toString(): string }, {
  get(_target, prop) {
    const val = getDefaultFooterHtml();
    return typeof (val as any)[prop] === "function" ? (val as any)[prop].bind(val) : (val as any)[prop];
  },
});

export interface ThreeMashSectionRenderProps {
  productList?: IkasProductList;
  productCategoryList?: IkasCategoryList;
  productFooterLinks?: IkasNavigationLinkList;
  productFooterLinksEn?: IkasNavigationLinkList;
  footerCategoryLimit?: number;
  companyFooterLinks?: IkasNavigationLinkList;
  companyFooterLinksEn?: IkasNavigationLinkList;
  contactFooterLinks?: IkasNavigationLinkList;
  contactFooterLinksEn?: IkasNavigationLinkList;
  productColumnTitle?: string;
  productColumnTitleEn?: string;
  companyColumnTitle?: string;
  companyColumnTitleEn?: string;
  contactColumnTitle?: string;
  contactColumnTitleEn?: string;
  descriptionTextEn?: string;
  productLink1Text?: string;
  productLink1TextEn?: string;
  productLink1Href?: string;
  productLink2Text?: string;
  productLink2TextEn?: string;
  productLink2Href?: string;
  productLink3Text?: string;
  productLink3TextEn?: string;
  productLink3Href?: string;
  productLink4Text?: string;
  productLink4TextEn?: string;
  productLink4Href?: string;
  productLink5Text?: string;
  productLink5TextEn?: string;
  productLink5Href?: string;
  productLink6Text?: string;
  productLink6TextEn?: string;
  productLink6Href?: string;
  companyLink1Text?: string;
  companyLink1TextEn?: string;
  companyLink1Href?: string;
  companyLink2Text?: string;
  companyLink2TextEn?: string;
  companyLink2Href?: string;
  companyLink3Text?: string;
  companyLink3TextEn?: string;
  companyLink3Href?: string;
  companyLink4Text?: string;
  companyLink4TextEn?: string;
  companyLink4Href?: string;
  contactLink1Text?: string;
  contactLink1TextEn?: string;
  contactLink1Href?: string;
  contactLink2Text?: string;
  contactLink2TextEn?: string;
  contactLink2Href?: string;
  contactLink3Text?: string;
  contactLink3TextEn?: string;
  contactLink3Href?: string;
  showBrand?: boolean;
  showProductColumn?: boolean;
  showCompanyColumn?: boolean;
  showContactColumn?: boolean;
  showPaymentBadges?: boolean;
  showProductLink1?: boolean;
  showProductLink2?: boolean;
  showProductLink3?: boolean;
  showProductLink4?: boolean;
  showProductLink5?: boolean;
  showProductLink6?: boolean;
  showCompanyLink1?: boolean;
  showCompanyLink2?: boolean;
  showCompanyLink3?: boolean;
  showCompanyLink4?: boolean;
  showContactLink1?: boolean;
  showContactLink2?: boolean;
  showContactLink3?: boolean;
  showLegalInfo?: boolean;
  showLegalLink1?: boolean;
  showLegalLink2?: boolean;
  showLegalLink3?: boolean;
  showLegalLink4?: boolean;
  showLegalLink5?: boolean;
  paymentMethodsLabel?: string;
  paymentMethodsLabelEn?: string;
  visaBadgeLabel?: string;
  visaBadgeImage?: IkasImage | null;
  maestroBadgeLabel?: string;
  maestroBadgeImage?: IkasImage | null;
  mastercardBadgeLabel?: string;
  mastercardBadgeImage?: IkasImage | null;
  facebookIconImage?: IkasImage | null;
  instagramIconImage?: IkasImage | null;
  youtubeIconImage?: IkasImage | null;
  linkedinIconImage?: IkasImage | null;
  curingProduct1Product?: IkasProduct | null;
  curingProduct2Product?: IkasProduct | null;
  sectionHtml?: string;
  sectionAnchorId?: string;
  desktopWidth?: string;
  desktopHeight?: string;
  desktopPadding?: string;
  desktopMargin?: string;
  mobileWidth?: string;
  mobileHeight?: string;
  mobilePadding?: string;
  mobileMargin?: string;
  indexNumber?: string;
  indexText?: string;
  indexTextEn?: string;
  titleText?: string;
  titleTextEn?: string;
  titleEmphasis?: string;
  titleEmphasisEn?: string;
  sideHtml?: string;
  sideHtmlEn?: string;
  reason1Eyebrow?: string;
  reason1EyebrowEn?: string;
  reason1Title?: string;
  reason1TitleEn?: string;
  reason1DescriptionHtml?: string;
  reason1DescriptionHtmlEn?: string;
  reason2Eyebrow?: string;
  reason2EyebrowEn?: string;
  reason2Title?: string;
  reason2TitleEn?: string;
  reason2DescriptionHtml?: string;
  reason2DescriptionHtmlEn?: string;
  reason3Eyebrow?: string;
  reason3EyebrowEn?: string;
  reason3Title?: string;
  reason3TitleEn?: string;
  reason3DescriptionHtml?: string;
  reason3DescriptionHtmlEn?: string;
  curingProduct1Tag?: string;
  curingProduct1TagEn?: string;
  curingProduct1Title?: string;
  curingProduct1TitleEn?: string;
  curingProduct1DescriptionHtml?: string;
  curingProduct1DescriptionHtmlEn?: string;
  curingProduct1ImageUrl?: unknown;
  curingProduct1ImageAlt?: string;
  curingProduct1ImageAltEn?: string;
  curingProduct1Spec1Label?: string;
  curingProduct1Spec1LabelEn?: string;
  curingProduct1Spec1Value?: string;
  curingProduct1Spec1ValueEn?: string;
  curingProduct1Spec2Label?: string;
  curingProduct1Spec2LabelEn?: string;
  curingProduct1Spec2Value?: string;
  curingProduct1Spec2ValueEn?: string;
  curingProduct1CtaText?: string;
  curingProduct1CtaTextEn?: string;
  curingProduct1CtaHref?: string;
  curingProduct2Tag?: string;
  curingProduct2TagEn?: string;
  curingProduct2Title?: string;
  curingProduct2TitleEn?: string;
  curingProduct2DescriptionHtml?: string;
  curingProduct2DescriptionHtmlEn?: string;
  curingProduct2ImageUrl?: unknown;
  curingProduct2ImageAlt?: string;
  curingProduct2ImageAltEn?: string;
  curingProduct2Spec1Label?: string;
  curingProduct2Spec1LabelEn?: string;
  curingProduct2Spec1Value?: string;
  curingProduct2Spec1ValueEn?: string;
  curingProduct2Spec2Label?: string;
  curingProduct2Spec2LabelEn?: string;
  curingProduct2Spec2Value?: string;
  curingProduct2Spec2ValueEn?: string;
  curingProduct2CtaText?: string;
  curingProduct2CtaTextEn?: string;
  curingProduct2CtaHref?: string;
  readMoreText?: string;
  readMoreTextEn?: string;
  readMoreLink1Text?: string;
  readMoreLink1TextEn?: string;
  readMoreLink1Href?: string;
  readMoreLink2Text?: string;
  readMoreLink2TextEn?: string;
  readMoreLink2Href?: string;
  dynamicPriceLabel?: string;
  dynamicPriceLabelEn?: string;
  dynamicListPriceLabel?: string;
  dynamicListPriceLabelEn?: string;
  dynamicBrandLabel?: string;
  dynamicBrandLabelEn?: string;
  dynamicCategoryLabel?: string;
  dynamicCategoryLabelEn?: string;
  showReason1?: boolean;
  showReason2?: boolean;
  showReason3?: boolean;
  showProduct1?: boolean;
  showProduct2?: boolean;
  showReadMore?: boolean;
  showReadMoreLink1?: boolean;
  showReadMoreLink2?: boolean;
  contentHtml?: string;
  eyebrowText?: string;
  eyebrowTextEn?: string;
  valueText?: string;
  valueTextEn?: string;
  descriptionHtml?: string;
  descriptionHtmlEn?: string;
  ctaText?: string;
  ctaTextEn?: string;
  ctaHref?: string;
  primaryButtonText?: string;
  primaryButtonTextEn?: string;
  primaryButtonHref?: string;
  primaryButtonHrefEn?: string;
  secondaryButtonText?: string;
  secondaryButtonTextEn?: string;
  secondaryButtonHref?: string;
  logoText?: string;
  descriptionText?: string;
  productsColumnHtml?: string;
  companyColumnHtml?: string;
  contactColumnHtml?: string;
  copyrightText?: string;
  copyrightTextEn?: string;
  legalLink1Text?: string;
  legalLink1TextEn?: string;
  legalLink1Href?: string;
  legalLink2Text?: string;
  legalLink2TextEn?: string;
  legalLink2Href?: string;
  legalLink3Text?: string;
  legalLink3TextEn?: string;
  legalLink3Href?: string;
  legalLink4Text?: string;
  legalLink4TextEn?: string;
  legalLink4Href?: string;
  legalLink5Text?: string;
  legalLink5TextEn?: string;
  legalLink5Href?: string;
  showSocialIcons?: boolean;
  instagramHref?: string;
  instagramLabel?: string;
  linkedinHref?: string;
  linkedinLabel?: string;
  youtubeHref?: string;
  youtubeLabel?: string;
  facebookHref?: string;
  facebookLabel?: string;
  logoHref?: string;
  logoImageUrl?: IkasImage | null;
  logoImageAlt?: string;
  logoSvg?: unknown;
  logoImageWidth?: number;
  logoImageHeight?: number;
  logoImageXOffset?: number;
  logoImageYOffset?: number;
  logoImageFit?: string;
  logoImageOpacity?: number;
  logoImageBrightness?: number;
  logoImageContrast?: number;
  logoImageSaturation?: number;
  logoImageHue?: number;
  logoImageInvert?: number;
  logoSvgWidth?: number;
  logoSvgHeight?: number;
  logoSvgXOffset?: number;
  logoSvgYOffset?: number;
  logoSvgOpacity?: number;
  logoSvgBrightness?: number;
  logoSvgContrast?: number;
  logoSvgSaturation?: number;
  logoSvgHue?: number;
  logoSvgInvert?: number;
  showDiagram?: boolean;
  diagramImageUrl?: unknown;
  diagramImageAlt?: string;
  diagramImageWidth?: number;
  diagramImageHeight?: number;
  diagramImageXOffset?: number;
  diagramImageYOffset?: number;
  diagramImageFit?: string;
  diagramImageOpacity?: number;
  diagramImageBrightness?: number;
  diagramImageContrast?: number;
  diagramImageSaturation?: number;
  diagramImageHue?: number;
  diagramImageInvert?: number;
  backgroundColor?: string;
  showBackgroundGlow?: boolean;
  showReturnMetric?: boolean;
  showDescription?: boolean;
  showPrimaryButton?: boolean;
  showSecondaryButton?: boolean;
  showCta?: boolean;
  textColor?: string;
  subTextColor?: string;
  buttonBackgroundColor?: string;
  buttonTextColor?: string;
  buttonRadius?: number;
  primaryButtonBackgroundColor?: string;
  primaryButtonTextColor?: string;
  secondaryButtonTextColor?: string;
  mutedTextColor?: string;
  lineColor?: string;
  panelColor?: string;
  darkColor?: string;
  accentColor?: string;
  accentTextColor?: string;
  accentSoftColor?: string;
  dangerColor?: string;
  cardMediaStartColor?: string;
  cardMediaEndColor?: string;
  hoverVideoAutoplayEnabled?: boolean;
  wordStyleEnabled?: boolean;
  styledPhrase?: string;
  styledPhraseColor?: string;
  styledPhraseBold?: boolean;
  styledPhraseItalic?: boolean;
  reasonCardBackgroundColor?: string;
  productMediaStartColor?: string;
  productMediaEndColor?: string;
  reasonCardRadius?: number;
  productCardRadius?: number;
  productImageWidth?: number;
  productImageHeight?: number;
  productImageXOffset?: number;
  productImageYOffset?: number;
  productImageFit?: string;
  productImageOpacity?: number;
  productImageBrightness?: number;
  productImageContrast?: number;
  productImageSaturation?: number;
  productImageHue?: number;
  productImageInvert?: number;
}

function html(value?: string, fallback = "") {
  const source = value && value.trim() ? value : fallback;
  return { __html: sanitizeHtml(source) };
}

function value(value: unknown, fallback: string) {
  const trimmed = typeof value === "string" ? value.trim() : "";
  if (!trimmed) return inlineHtml(fallback);
  if (isEnglishLocale() && isTurkishText(trimmed)) {
    return inlineHtml(fallback);
  }
  return inlineHtml(trimmed);
}

function stripInlineTypographyStyles(markup: string) {
  return markup.replace(
    /\sstyle=("[^"]*"|'[^']*'|[^\s>]+)/gi,
    (_match, rawValue: string) => {
      const quote =
        rawValue[0] === '"' || rawValue[0] === "'" ? rawValue[0] : "";
      const style = quote ? rawValue.slice(1, -1) : rawValue;
      const kept = style
        .split(";")
        .map((part) => part.trim())
        .filter(
          (part) =>
            part &&
            !/^(font-family|font-size|font-weight|font-style|font-variant(?:-[\w-]+)?|letter-spacing|color|background(?:-color)?|border-color|text-align)\s*:/i.test(
              part,
            ),
        );

      return kept.length ? ` style=${quote}${kept.join("; ")}${quote}` : "";
    },
  );
}

function inlineHtml(value: string) {
  return sanitizeHtml(
    stripInlineTypographyStyles(
      value
        .replace(/<\/p>\s*<p[^>]*>/gi, "<br />")
        .replace(/^<p[^>]*>/i, "")
        .replace(/<\/p>$/i, ""),
    ),
  );
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function styleTextChunks(markup: string, props: ThreeMashSectionRenderProps) {
  const target = props.styledPhrase?.trim();
  if (props.wordStyleEnabled === false || !target) return markup;

  const matcher = new RegExp(escapeRegExp(target), "gi");
  return markup
    .split(/(<[^>]+>)/g)
    .map((part) => {
      if (!part || part.startsWith("<")) return part;
      return part.replace(
        matcher,
        (match) => `<span class="tmr-word-style">${match}</span>`,
      );
    })
    .join("");
}

function numberInRange(
  value: unknown,
  fallback: number,
  min: number,
  max: number,
) {
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

function parseOptionalDimension(
  value: unknown,
  min = 20,
  max = 600,
): string | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed)) return undefined;
  return `${Math.min(max, Math.max(min, parsed))}px`;
}

function safeLayoutValue(
  value: unknown,
  kind: "width" | "height" | "padding" | "margin",
) {
  if (typeof value !== "string") return undefined;
  const tokens = value.trim().split(/\s+/).filter(Boolean);
  const maxTokens = kind === "width" || kind === "height" ? 1 : 4;
  if (!tokens.length || tokens.length > maxTokens) return undefined;

  const isValidLength = (token: string) => {
    if (token.toLowerCase() === "auto" && kind !== "padding") return true;
    if (token.startsWith("-") && kind !== "margin") return false;

    const unsigned = token.startsWith("-") ? token.slice(1) : token;
    if (unsigned === "0") return true;

    return /^(?:\d+(?:\.\d+)?|\.\d+)(?:px|%|rem|em|vw|vh|dvw|dvh|svw|svh|lvw|lvh)$/i.test(unsigned);
  };

  return tokens.every(isValidLength) ? tokens.join(" ") : undefined;
}

function percentage(
  value: unknown,
  fallback: number,
  min: number,
  max: number,
) {
  return `${numberInRange(value, fallback, min, max)}%`;
}

function imageFit(value: unknown) {
  return value === "cover" || value === "fill" || value === "scale-down"
    ? value
    : "contain";
}

function svgMarkup(value: unknown) {
  if (typeof value === "string") {
    return value.trim();
  }

  if (value && typeof value === "object") {
    const asset = value as { svg?: unknown; value?: unknown };
    if (typeof asset.svg === "string") return asset.svg.trim();
    if (typeof asset.value === "string") return asset.value.trim();
  }

  return "";
}

function escapeAttr(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function heading(titleText: string, titleEmphasis = "") {
  return `${titleText}${titleEmphasis ? ` <span class="tmr-title-em">${titleEmphasis}</span>` : ""}`;
}

function imageIdToUrl(value: string) {
  const trimmed = value.trim();
  if (trimmed.startsWith("theme-images/")) {
    return `https://cdn.myikas.com/images/${trimmed}/image_3840.webp`;
  }
  return trimmed;
}

function selectedVariant(product: IkasProduct): IkasProductVariant | null {
  const variants = product.variants || [];
  const selectedValueIds = new Set(
    (product.selectedVariantValues || []).map((value) => value.id),
  );

  if (selectedValueIds.size > 0) {
    const selected = variants.find(
      (variant) =>
        variant.isActive !== false &&
        variant.variantValues.every((value) => selectedValueIds.has(value.id)),
    );
    if (selected) return selected;
  }

  return (
    variants.find((variant) => variant.isActive !== false) ||
    variants[0] ||
    null
  );
}

function plainText(source: unknown) {
  if (typeof source !== "string") return "";
  return source
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncateText(source: string, maxLength: number) {
  if (source.length <= maxLength) return source;
  const trimmed = source.slice(0, maxLength).trim();
  const lastSpace = trimmed.lastIndexOf(" ");
  return `${(lastSpace > 80 ? trimmed.slice(0, lastSpace) : trimmed).trim()}...`;
}

function liveProductCard(product: IkasProduct) {
  const variant = selectedVariant(product);
  const media = variant ? getProductVariantMainImage(variant) : undefined;
  const image = media?.image;
  const categoryName =
    product.categories?.[0]?.name || product.brand?.name || tLocalized("3MASH", "3MASH");
  const rawDescription =
    (product as { shortDescription?: unknown; description?: unknown })
      .shortDescription || (product as { description?: unknown }).description;
  const description = truncateText(plainText(rawDescription), 145);
  const finalPrice = variant
    ? getProductVariantFormattedFinalPrice(variant)
    : "";
  const sellPrice =
    variant && hasProductVariantDiscount(variant)
      ? getProductVariantFormattedSellPrice(variant)
      : "";
  const href = getProductHref(product);

  const mediaMarkup = image
    ? media?.isVideo
      ? `<video class="tmr-product-video" src="${escapeAttr(getDefaultSrc(image))}" muted playsinline loop preload="metadata"></video>`
      : `<img class="tmr-product-img tmr-live-product-img" src="${escapeAttr(getDefaultSrc(image))}" srcset="${escapeAttr(createMediaSrcset(image))}" alt="${escapeAttr(image.altText || product.name)}" loading="lazy" decoding="async">`
    : `<div class="tmr-product-fallback" aria-hidden="true">${escapeHtml(product.name.slice(0, 1))}</div>`;

  return `<article class="tmr-product tmr-live-product"><a class="tmr-live-product-link" href="${escapeAttr(href)}"><div class="tmr-product-media"><span class="tmr-tag">${escapeHtml(categoryName)}</span>${mediaMarkup}</div><div class="tmr-product-body"><h3>${escapeHtml(product.name)}</h3>${description ? `<p>${escapeHtml(description)}</p>` : ""}<div class="tmr-spec tmr-live-spec">${finalPrice ? `<div><span>Fiyat</span><b>${escapeHtml(finalPrice)}</b></div>` : ""}${sellPrice ? `<div><span>Liste</span><b>${escapeHtml(sellPrice)}</b></div>` : ""}</div><em class="tmr-go">İncele <span>→</span></em></div></a></article>`;
}

function imageSource(source: unknown, fallback: string) {
  if (typeof source === "string" && source.trim()) {
    return imageIdToUrl(source);
  }

  if (source && typeof source === "object") {
    const image = source as {
      id?: unknown;
      url?: unknown;
      src?: unknown;
      imageUrl?: unknown;
      value?: unknown;
      image?: { url?: unknown; src?: unknown };
      file?: { url?: unknown; src?: unknown };
    };
    if (typeof image.id === "string" && image.id) {
      try {
        return getDefaultSrc(source as IkasImage);
      } catch {
        return fallback;
      }
    }
    if (typeof image.url === "string") return imageIdToUrl(image.url);
    if (typeof image.src === "string") return imageIdToUrl(image.src);
    if (typeof image.imageUrl === "string") return imageIdToUrl(image.imageUrl);
    if (typeof image.value === "string") return imageIdToUrl(image.value);
    if (typeof image.id === "string") return imageIdToUrl(image.id);
    if (typeof image.image?.url === "string")
      return imageIdToUrl(image.image.url);
    if (typeof image.image?.src === "string")
      return imageIdToUrl(image.image.src);
    if (typeof image.file?.url === "string")
      return imageIdToUrl(image.file.url);
    if (typeof image.file?.src === "string")
      return imageIdToUrl(image.file.src);
  }

  return fallback;
}

function linkHref(source: unknown, fallback: string) {
  if (typeof source === "string" && source.trim()) {
    return source.trim();
  }

  if (source && typeof source === "object") {
    const link = source as {
      href?: unknown;
      externalLink?: unknown;
      fileUrl?: unknown;
      pageId?: unknown;
      label?: unknown;
    };
    if (typeof link.href === "string" && link.href.trim())
      return link.href.trim();
    if (typeof link.externalLink === "string" && link.externalLink.trim())
      return link.externalLink.trim();
    if (typeof link.fileUrl === "string" && link.fileUrl.trim())
      return link.fileUrl.trim();
    if (link.pageId === "2tplvqpo-about-us-page") return "/pages/about-us";
    if (link.pageId === "2tplvqpo-kvkk-page") return "/pages/gizlilik-politikasi-ve-kvkk";
    if (link.pageId === "2tplvqpo-return-warranty-page")
      return "/pages/iade-ve-garanti";
    if (link.pageId === "2tplvqpo-distance-sales-page")
      return "/pages/mesafeli-satis-sozlesmesi";
    if (link.pageId === "2tplvqpo-membership-agreement-page")
      return "/pages/uyelik-sozlesmesi";
    if (link.pageId === "2tplvqpo-commercial-electronic-page")
      return "/pages/ticari-elektronik-ileti-onayi";
    if (link.pageId === "egF4vDuOju") return "/pages/mash-p1d";
    if (link.pageId === "NCjIeO1nu4") return "/pages/mash-p16l";
    if (link.pageId === "hw1iKDxUMY") return "/pages/crs-recineler";
    if (link.label === tLocalized("MASH P1D", "MASH P1D")) return localizedHref("/pages/mash-p1d");
    if (link.label === tLocalized("MASH P16L", "MASH P16L")) return localizedHref("/pages/mash-p16l");
    if (link.label === tLocalized("CRS Reçineler", "CRS Resins")) return localizedHref("/pages/crs-recineler");
  }

  return localizedHref(fallback);
}

function productPageHref(source: unknown, fallback: string) {
  const current = value(source, fallback);
  const normalized = current
    .toLowerCase()
    .replace(/^https?:\/\/(?:www\.)?3mash\.com/i, "")
    .replace(/\/$/, "");
  const routes: Record<string, string> = {
    "/urunler/3d-yazicilar": "/3d-yazicilar",
    "/urunler/dental-recineler": "/dental-3d-yazici-recineleri",
    "/urunler/yikama-kurleme": "/yikama-kurleme-cihazlari",
    "/urunler/yikama-cihazlari": "/yikama-cihazlari",
    "/urunler/yikama": "/yikama-cihazlari",
    "/urunler/kurleme-cihazlari": "/kurleme-cihazlari",
    "/urunler/kurleme": "/kurleme-cihazlari",
    "/yikama-cihazlari": "/yikama-cihazlari",
    "/yikama": "/yikama-cihazlari",
    "/kurleme-cihazlari": "/kurleme-cihazlari",
    "/kurleme": "/kurleme-cihazlari",
    "/urunler/masasustu-tarayicilar": "/masasustu-tarayicilar",
    "/urunler/zirkon-bloklar": "/zirkon-bloklar",
    "/urunler/dental-firinlar": "/dental-firinlar",
  };
  return localizedHref(routes[normalized] || current);
}

function normalizedInternalRouteHref(href: string) {
  const normalized =
    href
      .trim()
      .replace(/^https?:\/\/(?:www\.)?3mash\.com/i, "")
      .replace(/\/+$/, "") || "/";
  const key = normalized.toLowerCase();
  const routes: Record<string, string> = {
    "/academy": academyPageHref,
    "/mash-academy": academyPageHref,
    "/pages/academy": academyPageHref,
    "/2tplvqpo-rovtvwz53h": academyPageHref,
    "/2tplvqpo-about-us-page": "/pages/about-us",
    "/pages/about-us": "/pages/about-us",
    "/pages/hakkimizda": "/pages/about-us",
    "/about-us": "/pages/about-us",
    "/hakkimizda": "/pages/about-us",
    "/2tplvqpo-kvkk-page": "/pages/gizlilik-politikasi-ve-kvkk",
    "/pages/gizlilik-politikasi-ve-kvkk": "/pages/gizlilik-politikasi-ve-kvkk",
    "/pages/kvkk": "/pages/gizlilik-politikasi-ve-kvkk",
    "/pages/kvkk-aydinlatma-metni": "/pages/gizlilik-politikasi-ve-kvkk",
    "/2tplvqpo-return-warranty-page": "/pages/iade-ve-garanti",
    "/pages/iade-ve-garanti": "/pages/iade-ve-garanti",
    "/pages/iade-ve-garanti-kosullari": "/pages/iade-ve-garanti",
    "/2tplvqpo-distance-sales-page": "/pages/mesafeli-satis-sozlesmesi",
    "/pages/mesafeli-satis-sozlesmesi": "/pages/mesafeli-satis-sozlesmesi",
    "/2tplvqpo-membership-agreement-page": "/pages/uyelik-sozlesmesi",
    "/pages/uyelik-sozlesmesi": "/pages/uyelik-sozlesmesi",
    "/2tplvqpo-commercial-electronic-page": "/pages/ticari-elektronik-ileti-onayi",
    "/pages/ticari-elektronik-ileti-onayi": "/pages/ticari-elektronik-ileti-onayi",
    "/pages/ticari-elektronik-ileti": "/pages/ticari-elektronik-ileti-onayi",
    "/pages/cerez-politikasi": "/pages/cerez-politikasi",
    "/pages/cerez": "/pages/cerez-politikasi",
    "/cerez-politikasi": "/pages/cerez-politikasi",
    "/cookie-policy": "/pages/cerez-politikasi",
    "/pages/cookie-policy": "/pages/cerez-politikasi",
    "/pages/sss": "/pages/sss",
    "/pages/faq": "/pages/sss",
    "/urunler/3d-yazicilar": "/3d-yazicilar",
    "/urunler/dental-recineler": "/dental-3d-yazici-recineleri",
    "/urunler/yikama-kurleme": "/yikama-kurleme-cihazlari",
    "/urunler/yikama-cihazlari": "/yikama-cihazlari",
    "/urunler/yikama": "/yikama-cihazlari",
    "/urunler/kurleme-cihazlari": "/kurleme-cihazlari",
    "/urunler/kurleme": "/kurleme-cihazlari",
    "/yikama-cihazlari": "/yikama-cihazlari",
    "/yikama": "/yikama-cihazlari",
    "/kurleme-cihazlari": "/kurleme-cihazlari",
    "/kurleme": "/kurleme-cihazlari",
    "/urunler/masasustu-tarayicilar": "/masasustu-tarayicilar",
    "/urunler/zirkon-bloklar": "/zirkon-bloklar",
    "/urunler/dental-firinlar": "/dental-firinlar",
  };
  return localizedHref(routes[key] || href);
}

function raw(props: object, key: string) {
  return (props as Record<string, unknown>)[key];
}

function field(
  props: ThreeMashSectionRenderProps,
  key: string,
  fallbackTr: string,
  fallbackEn?: string,
) {
  const rawVal = raw(props, key) as string | undefined;
  const resolved = tProp(rawVal, fallbackTr, fallbackEn);
  return inlineHtml(resolved);
}

function localizedValue(
  props: ThreeMashSectionRenderProps,
  key: string,
  fallbackTr: string,
  fallbackEn: string,
) {
  const localizedKey = isEnglishLocale() ? `${key}En` : key;
  const current = raw(props, localizedKey);
  return tProp(
    typeof current === "string" ? current : undefined,
    fallbackTr,
    fallbackEn,
  );
}

function localizedField(
  props: ThreeMashSectionRenderProps,
  key: string,
  fallbackTr: string,
  fallbackEn: string,
) {
  return inlineHtml(localizedValue(props, key, fallbackTr, fallbackEn));
}

function specs(
  props: ThreeMashSectionRenderProps,
  prefix: string,
  count: number,
  defaults: Array<[string, string]>,
  localeOverrides = false,
) {
  const resolveField = (key: string, fallback: string) =>
    localeOverrides
      ? localizedField(props, key, fallback, fallback)
      : field(props, key, fallback);

  return defaults
    .slice(0, count)
    .map(([label, text], index) => {
      const number = index + 1;
      return `<div><span>${resolveField(`${prefix}Spec${number}Label`, label)}</span><b>${resolveField(`${prefix}Spec${number}Value`, text)}</b></div>`;
    })
    .join("");
}

function withLegacyDefaults(
  props: ThreeMashSectionRenderProps,
  replacements: Record<string, { legacy: string; next: string }>,
) {
  const nextProps = { ...props } as Record<string, unknown>;
  Object.entries(replacements).forEach(([key, replacement]) => {
    const current =
      typeof nextProps[key] === "string" ? String(nextProps[key]).trim() : "";
    if (current && current === replacement.legacy) {
      nextProps[key] = replacement.next;
    }
  });
  return nextProps as ThreeMashSectionRenderProps;
}

type ProductCardDefaults = {
  tag: string;
  image: string;
  imageAlt: string;
  imageClass: string;
  title: string;
  descriptionHtml: string;
  specs: Array<[string, string]>;
  ctaText: string;
  ctaHref: string;
  tagClass?: string;
};

function isIkasProduct(source: unknown): source is IkasProduct {
  return Boolean(
    source &&
    typeof source === "object" &&
    typeof (source as { name?: unknown }).name === "string",
  );
}

function selectedProductId(source: unknown) {
  if (typeof source === "string") return source;
  if (!source || typeof source !== "object") return "";
  const item = source as {
    productId?: unknown;
    id?: unknown;
    product?: { id?: unknown };
    value?: { productId?: unknown; id?: unknown; product?: { id?: unknown } };
  };
  const productId =
    item.productId ||
    item.product?.id ||
    item.value?.productId ||
    item.value?.product?.id ||
    item.value?.id ||
    item.id;
  return typeof productId === "string" ? productId : "";
}

function uniqueProducts(products: IkasProduct[]) {
  const seen = new Set<string>();
  return products.filter((product) => {
    if (!product.id || seen.has(product.id)) return false;
    seen.add(product.id);
    return true;
  });
}

function solutionProducts(productList: IkasProductList | undefined) {
  if (!productList) return [];

  const list = productList as IkasProductList & {
    products?: unknown[];
    items?: unknown[];
  };

  const rawProducts: unknown[] = [
    ...(Array.isArray(list.data) ? list.data : []),
    ...(Array.isArray(list.products) ? list.products : []),
    ...(Array.isArray(list.items) ? list.items : []),
  ];

  const products = rawProducts
    .map((item) => {
      if (!item || typeof item !== "object") return null;

      const source = item as {
        name?: unknown;
        product?: unknown;
        value?: unknown;
      };

      // Ürün doğrudan geliyorsa
      if (typeof source.name === "string") {
        return source as IkasProduct;
      }

      // Ürün { product: {...} } şeklinde geliyorsa
      if (
        source.product &&
        typeof source.product === "object" &&
        typeof (source.product as { name?: unknown }).name === "string"
      ) {
        return source.product as IkasProduct;
      }

      // Ürün { value: {...} } şeklinde geliyorsa
      if (
        source.value &&
        typeof source.value === "object" &&
        typeof (source.value as { name?: unknown }).name === "string"
      ) {
        return source.value as IkasProduct;
      }

      return null;
    })
    .filter((product): product is IkasProduct => Boolean(product));

  const uniqueLiveProducts = uniqueProducts(products);

  const selectedIds = (productList.productListPropValue?.productIds || [])
    .map(selectedProductId)
    .filter(Boolean);

  // Tüm Ürünler veya kategori bağlantısında
  if (!selectedIds.length) {
    return uniqueLiveProducts.slice(0, 6);
  }

  // Editörde özel ürünler seçildiyse seçilen sırayı koru
  const productsById = new Map(
    uniqueLiveProducts.map((product) => [product.id, product]),
  );

  const orderedProducts = selectedIds
    .map((id) => productsById.get(id))
    .filter((product): product is IkasProduct => Boolean(product));

  return (
    orderedProducts.length > 0 ? orderedProducts : uniqueLiveProducts
  ).slice(0, 6);
}

function productCardDefaultsFromProduct(
  product: IkasProduct,
  defaults: ProductCardDefaults,
  options?: {
    imageFallback?: string;
    labels?: {
      price?: string;
      list?: string;
      brand?: string;
      category?: string;
    };
  },
): ProductCardDefaults {
  const variant = selectedVariant(product);
  const media = variant ? getProductVariantMainImage(variant) : undefined;
  const image = media?.image
    ? getDefaultSrc(media.image)
    : options?.imageFallback || defaults.image;
  const categoryName =
    product.categories?.[0]?.name || product.brand?.name || defaults.tag;
  const rawDescription =
    (product as { shortDescription?: unknown; description?: unknown })
      .shortDescription || (product as { description?: unknown }).description;
  const description =
    truncateText(plainText(rawDescription), 170) || defaults.descriptionHtml;
  const finalPrice = variant
    ? getProductVariantFormattedFinalPrice(variant)
    : "";
  const sellPrice =
    variant && hasProductVariantDiscount(variant)
      ? getProductVariantFormattedSellPrice(variant)
      : "";
  const specs: Array<[string, string]> = [];

  if (finalPrice) specs.push([options?.labels?.price || tLocalized("Fiyat", "Price"), finalPrice]);
  if (sellPrice) specs.push([options?.labels?.list || tLocalized("Liste", "List"), sellPrice]);
  if (specs.length < 2 && categoryName)
    specs.push([
      product.brand?.name
        ? options?.labels?.brand || tLocalized("Marka", "Brand")
        : options?.labels?.category || tLocalized("Kategori", "Category"),
      categoryName,
    ]);

  return {
    ...defaults,
    tag: categoryName,
    image,
    imageAlt: media?.image?.altText || product.name,
    title: product.name,
    descriptionHtml: escapeHtml(description),
    specs: specs.length ? specs : defaults.specs,
    ctaText: tLocalized("İncele", "Explore"),
    ctaHref: localizedHref(getProductHref(product)),
  };
}

function productCard(
  props: ThreeMashSectionRenderProps,
  prefix: string,
  defaults: ProductCardDefaults,
  localeOverrides = false,
) {
  const selectedProduct = raw(props, `${prefix}Product`);
  if (isIkasProduct(selectedProduct)) {
    const isCuringProduct = prefix === "curingProduct1" || prefix === "curingProduct2";
    const dynamicLabels = isCuringProduct
      ? {
          price: plainText(localizedValue(props, "dynamicPriceLabel", "Fiyat", "Price")),
          list: plainText(localizedValue(props, "dynamicListPriceLabel", "Liste", "List")),
          brand: plainText(localizedValue(props, "dynamicBrandLabel", "Marka", "Brand")),
          category: plainText(localizedValue(props, "dynamicCategoryLabel", "Kategori", "Category")),
        }
      : undefined;
    const imageFallback = isCuringProduct
      ? imageSource(raw(props, `${prefix}ImageUrl`), defaults.image)
      : defaults.image;
    const productDefaults = productCardDefaultsFromProduct(
      selectedProduct,
      defaults,
      { imageFallback, labels: dynamicLabels },
    );
    if (isCuringProduct) {
      productDefaults.ctaText = plainText(
        localizedValue(props, `${prefix}CtaText`, "İncele", "Explore"),
      );
    }
    const tagClass = productDefaults.tagClass
      ? ` ${productDefaults.tagClass}`
      : "";
    const isCrsResinCard = prefix === "solutionCard3";
    const media = isCrsResinCard
      ? `<div class="tmr-product-media tmr-product-media-${escapeAttr(prefix)}"><span class="tmr-tag${tagClass}">${escapeHtml(productDefaults.tag)}</span><img class="tmr-product-img is-left" src="https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a7753220-8b7a-4832-a428-c8678e941fda/1080/crs-tray-resin.webp" alt="CRS Tray Resin" loading="lazy" decoding="async"><img class="tmr-product-img is-center" src="https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/36167f47-c92f-4660-967c-d4a8faa86006/1080/crs-model-resin.webp" alt="CRS Model Resin" loading="lazy" decoding="async"><img class="tmr-product-img is-right" src="https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/7a581ce8-604c-47c0-bb9d-c05e4cdefae0/1080/denture-resin.webp" alt="CRS Denture Resin" loading="lazy" decoding="async"></div>`
      : `<div class="tmr-product-media tmr-product-media-${escapeAttr(prefix)}"><span class="tmr-tag${tagClass}">${escapeHtml(productDefaults.tag)}</span><img class="tmr-product-img ${productDefaults.imageClass}" src="${escapeAttr(productDefaults.image)}" alt="${escapeAttr(productDefaults.imageAlt)}"></div>`;
    return `<article class="tmr-product">${media}<div class="tmr-product-body"><h3>${escapeHtml(productDefaults.title)}</h3><p>${productDefaults.descriptionHtml}</p><div class="tmr-spec">${productDefaults.specs.map(([label, text]) => `<div><span>${escapeHtml(label)}</span><b>${escapeHtml(text)}</b></div>`).join("")}</div><a class="tmr-go" href="${escapeAttr(localizedHref(productDefaults.ctaHref))}">${escapeHtml(productDefaults.ctaText)} <span aria-hidden="true">→</span></a></div></article>`;
  }

  const isCrsResinCard = prefix === "solutionCard3";
  const resolveField = (key: string, fallback: string) =>
    localeOverrides
      ? localizedField(props, key, fallback, fallback)
      : field(props, key, fallback);
  const image = imageSource(raw(props, `${prefix}ImageUrl`), defaults.image);
  const alt = resolveField(`${prefix}ImageAlt`, defaults.imageAlt);
  const tagClass = defaults.tagClass ? ` ${defaults.tagClass}` : "";
  const media = isCrsResinCard
    ? `<div class="tmr-product-media tmr-product-media-${escapeAttr(prefix)}"><span class="tmr-tag${tagClass}">${resolveField(`${prefix}Tag`, defaults.tag)}</span><img class="tmr-product-img is-left" src="https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a7753220-8b7a-4832-a428-c8678e941fda/1080/crs-tray-resin.webp" alt="CRS Tray Resin" loading="lazy" decoding="async"><img class="tmr-product-img is-center" src="https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/36167f47-c92f-4660-967c-d4a8faa86006/1080/crs-model-resin.webp" alt="CRS Model Resin" loading="lazy" decoding="async"><img class="tmr-product-img is-right" src="https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/7a581ce8-604c-47c0-bb9d-c05e4cdefae0/1080/denture-resin.webp" alt="CRS Denture Resin" loading="lazy" decoding="async"></div>`
    : `<div class="tmr-product-media tmr-product-media-${escapeAttr(prefix)}"><span class="tmr-tag${tagClass}">${resolveField(`${prefix}Tag`, defaults.tag)}</span><img class="tmr-product-img ${defaults.imageClass}" src="${escapeAttr(image)}" alt="${escapeAttr(alt)}"></div>`;

  return `<article class="tmr-product">${media}<div class="tmr-product-body"><h3>${resolveField(`${prefix}Title`, defaults.title)}</h3><p>${resolveField(`${prefix}DescriptionHtml`, defaults.descriptionHtml)}</p><div class="tmr-spec">${specs(props, prefix, defaults.specs.length, defaults.specs, localeOverrides)}</div><a class="tmr-go" href="${escapeAttr(localizedHref(linkHref(raw(props, `${prefix}CtaHref`), defaults.ctaHref)))}">${resolveField(`${prefix}CtaText`, defaults.ctaText)} <span aria-hidden="true">→</span></a></div></article>`;
}

function solutionP1dCard(props: ThreeMashSectionRenderProps) {
  return solutionProductCard(props, "solutionCard1", {
    tagTr: "PROFESYONEL",
    tagEn: "PROFESSIONAL",
    image: p1dSectionCardImage,
    imageAltTr: "MASH P1D",
    imageAltEn: "MASH P1D",
    imageClass: "tmr-machine-printer",
    titleTr: "MASH P1D",
    titleEn: "MASH P1D",
    descriptionTr: "Malzemeye göre tasarlanmış optik sistemle <b>profesyonel DLP</b> üretim. Yüksek hacimli lab ve kliniklerin motoru.",
    descriptionEn: "<b>Professional DLP</b> production with an optical system designed around the material. The engine of high-volume labs and clinics.",
    specsTr: "<div><span>Işık kaynağı</span><b>385 nm DLP</b></div><div><span>Hassasiyet</span><b>±20 µm</b></div><div><span>Karakter</span><b>Tekrar edilebilirlik</b></div>",
    specsEn: "<div><span>Light source</span><b>385 nm DLP</b></div><div><span>Accuracy</span><b>±20 µm</b></div><div><span>Character</span><b>Repeatability</b></div>",
    ctaTextTr: "İncele",
    ctaTextEn: "Explore",
    ctaHref: "/3d-yazicilar",
  });
}

function solutionSecondCard(props: ThreeMashSectionRenderProps) {
  return solutionProductCard(props, "solutionCard2", {
    tagTr: "GİRİŞ SEGMENTİ",
    tagEn: "ENTRY LEVEL",
    image: p16lPrimaryImage,
    imageAltTr: "MASH P16L",
    imageAltEn: "MASH P16L",
    imageClass: "tmr-machine-p16l",
    titleTr: "MASH P16L",
    titleEn: "MASH P16L",
    descriptionTr: "Dijitale yeni geçenler için <b>3mash revizyonlu</b> LCD yazıcı. Aynı parametre desteği, aynı teknik ekip.",
    descriptionEn: "An <b>3mash-revised</b> LCD printer for those new to digital. Same parameter support, same technical team.",
    specsTr: "<div><span>Teknoloji</span><b>LCD · revize</b></div><div><span>Rol</span><b>Ekosisteme giriş</b></div><div><span>Destek</span><b>Kurulum + eğitim</b></div>",
    specsEn: "<div><span>Technology</span><b>LCD · revised</b></div><div><span>Role</span><b>Entry into the ecosystem</b></div><div><span>Support</span><b>Installation + training</b></div>",
    ctaTextTr: "İncele",
    ctaTextEn: "Explore",
    ctaHref: "/3d-yazicilar",
  });
}

function solutionResinCategoryCard(props: ThreeMashSectionRenderProps) {
  return solutionProductCard(props, "solutionCard3", {
    tagTr: "RESMİ DİSTRİBÜTÖR",
    tagEn: "OFFICIAL DISTRIBUTOR",
    image: crsModelBottleImage,
    imageAltTr: "CRS Reçineler",
    imageAltEn: "CRS Resins",
    imageClass: "tmr-resin-bottle",
    titleTr: "CRS Reçineler",
    titleEn: "CRS Resins",
    descriptionTr: "<b>CE Class IIa</b> biyouyumlu &amp; model reçineleri; cihazınızın parametreleriyle <b>birlikte kalibre edilmiş</b> teslim edilir.",
    descriptionEn: "<b>CE Class IIa</b> biocompatible &amp; model resins; delivered <b>calibrated together</b> with your device parameters.",
    specsTr: "<div><span>Sertifika</span><b>CE Class IIa</b></div><div><span>Uygulama</span><b>Model · geçici · splint · guide</b></div><div><span>Uyum</span><b>Marka bağımsız</b></div>",
    specsEn: "<div><span>Certificate</span><b>CE Class IIa</b></div><div><span>Application</span><b>Model · temporary · splint · guide</b></div><div><span>Compatibility</span><b>Brand-independent</b></div>",
    ctaTextTr: "İncele",
    ctaTextEn: "Explore",
    ctaHref: "/dental-3d-yazici-recineleri",
    resinImages: [
      {
        sourceKey: "solutionCard3ImageLeftUrl",
        altKey: "solutionCard3ImageLeftAlt",
        source: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/a7753220-8b7a-4832-a428-c8678e941fda/1080/crs-tray-resin.webp",
        altTr: "CRS Tepsi Reçinesi",
        altEn: "CRS Tray Resin",
        className: "is-left",
      },
      {
        sourceKey: "solutionCard3ImageCenterUrl",
        altKey: "solutionCard3ImageCenterAlt",
        source: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/36167f47-c92f-4660-967c-d4a8faa86006/1080/crs-model-resin.webp",
        altTr: "CRS Model Reçinesi",
        altEn: "CRS Model Resin",
        className: "is-center",
      },
      {
        sourceKey: "solutionCard3ImageRightUrl",
        altKey: "solutionCard3ImageRightAlt",
        source: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/7a581ce8-604c-47c0-bb9d-c05e4cdefae0/1080/denture-resin.webp",
        altTr: "CRS Protez Reçinesi",
        altEn: "CRS Denture Resin",
        className: "is-right",
      },
    ],
  });
}

type SolutionResinImage = {
  sourceKey: string;
  altKey: string;
  source: string;
  altTr: string;
  altEn: string;
  className: string;
};

type SolutionCardDefaults = {
  tagTr: string;
  tagEn: string;
  image: string;
  imageAltTr: string;
  imageAltEn: string;
  imageClass: string;
  titleTr: string;
  titleEn: string;
  descriptionTr: string;
  descriptionEn: string;
  specsTr: string;
  specsEn: string;
  ctaTextTr: string;
  ctaTextEn: string;
  ctaHref: string;
  resinImages?: SolutionResinImage[];
};

function solutionProductCard(
  props: ThreeMashSectionRenderProps,
  prefix: string,
  defaults: SolutionCardDefaults,
) {
  const selectedProduct = raw(props, `${prefix}Product`);
  const product = isIkasProduct(selectedProduct) ? selectedProduct : null;
  const variant = product ? selectedVariant(product) : null;
  const productMedia = variant ? getProductVariantMainImage(variant) : undefined;
  const productImage = productMedia?.image;
  const tag = localizedField(props, `${prefix}Tag`, defaults.tagTr, defaults.tagEn);
  const title = localizedField(props, `${prefix}Title`, defaults.titleTr, defaults.titleEn);
  const description = localizedField(
    props,
    `${prefix}DescriptionHtml`,
    defaults.descriptionTr,
    defaults.descriptionEn,
  );
  const specsHtml = localizedField(
    props,
    `${prefix}SpecsHtml`,
    defaults.specsTr,
    defaults.specsEn,
  );
  const image = productImage
    ? getDefaultSrc(productImage)
    : imageSource(raw(props, `${prefix}ImageUrl`), defaults.image);
  const configuredImageAlt = raw(props, `${prefix}ImageAlt`);
  const shouldUseProductAlt = Boolean(
    productImage &&
      (typeof configuredImageAlt !== "string" ||
        !configuredImageAlt.trim() ||
        configuredImageAlt === defaults.imageAltTr ||
        configuredImageAlt === defaults.imageAltEn),
  );
  const imageAlt = escapeAttr(
    plainText(
      shouldUseProductAlt
        ? productImage?.altText || product?.name || defaults.imageAltTr
        : localizedValue(
            props,
            `${prefix}ImageAlt`,
            defaults.imageAltTr,
            defaults.imageAltEn,
          ),
    ),
  );
  const mediaMarkup = productImage
    ? productMedia?.isVideo
      ? `<video class="tmr-product-video" src="${escapeAttr(image)}" muted playsinline loop preload="metadata"></video>`
      : `<img class="tmr-product-img" src="${escapeAttr(image)}" alt="${imageAlt}" loading="lazy" decoding="async">`
    : defaults.resinImages
    ? defaults.resinImages
        .map((resinImage) => {
          const source = imageSource(raw(props, resinImage.sourceKey), resinImage.source);
          const alt = escapeAttr(
            plainText(
              localizedValue(props, resinImage.altKey, resinImage.altTr, resinImage.altEn),
            ),
          );
          return `<img class="tmr-product-img ${resinImage.className}" src="${escapeAttr(source)}" alt="${alt}" loading="lazy" decoding="async">`;
        })
        .join("")
    : image.trim()
      ? `<img class="tmr-product-img ${escapeAttr(defaults.imageClass)}" src="${escapeAttr(image)}" alt="${imageAlt}" loading="lazy" decoding="async">`
      : "";
  const configuredHref = linkHref(raw(props, `${prefix}CtaHref`), defaults.ctaHref);
  const fallbackHref = defaults.ctaHref ? localizedHref(defaults.ctaHref) : "";
  const ctaHref = configuredHref
    ? safeNavigationHref(localizedHref(configuredHref), fallbackHref)
    : "";
  const ctaText = localizedField(
    props,
    `${prefix}CtaText`,
    defaults.ctaTextTr,
    defaults.ctaTextEn,
  );
  const ctaMarkup = ctaHref
    ? `<a class="tmr-go" href="${escapeAttr(ctaHref)}">${ctaText} <span aria-hidden="true">→</span></a>`
    : "";

  return `<article class="tmr-product"><div class="tmr-product-media tmr-product-media-${escapeAttr(prefix)}"><span class="tmr-tag">${tag}</span>${mediaMarkup}</div><div class="tmr-product-body"><h3>${title}</h3><p>${description}</p><div class="tmr-spec">${specsHtml}</div>${ctaMarkup}</div></article>`;
}

function solutionExtraCard(props: ThreeMashSectionRenderProps, number: 4 | 5 | 6) {
  const prefix = `solutionCard${number}`;
  const product = raw(props, `${prefix}Product`);
  const image = imageSource(raw(props, `${prefix}ImageUrl`), "");

  if (!isIkasProduct(product) && !image) return null;

  return solutionProductCard(props, prefix, {
    tagTr: "YENİ ÇÖZÜM",
    tagEn: "NEW SOLUTION",
    image: "",
    imageAltTr: "Yeni çözüm ürünü görseli",
    imageAltEn: "New solution product image",
    imageClass: "tmr-solution-extra-image",
    titleTr: "Yeni çözüm ürünü",
    titleEn: "New solution product",
    descriptionTr: "Bu alanı yeni ürününüzün kısa açıklamasıyla düzenleyin.",
    descriptionEn: "Add a short description of your new product here.",
    specsTr: "<div><span>Özellik</span><b>Ürün bilgisi</b></div>",
    specsEn: "<div><span>Feature</span><b>Product detail</b></div>",
    ctaTextTr: "Ürünü İncele",
    ctaTextEn: "Explore product",
    ctaHref: "",
  });
}

export function threeMashThemeStyle(props: ThreeMashSectionRenderProps) {
  const desktopWidth = safeLayoutValue(raw(props, "desktopWidth"), "width");
  const desktopHeight = safeLayoutValue(raw(props, "desktopHeight"), "height");
  const desktopPadding = safeLayoutValue(raw(props, "desktopPadding"), "padding");
  const desktopMargin = safeLayoutValue(raw(props, "desktopMargin"), "margin");
  const mobileWidth = safeLayoutValue(raw(props, "mobileWidth"), "width");
  const mobileHeight = safeLayoutValue(raw(props, "mobileHeight"), "height");
  const mobilePadding = safeLayoutValue(raw(props, "mobilePadding"), "padding");
  const mobileMargin = safeLayoutValue(raw(props, "mobileMargin"), "margin");
  const curingImageWidth = parseOptionalDimension(
    raw(props, "productImageWidth"),
    20,
    560,
  );
  const curingImageHeight = parseOptionalDimension(
    raw(props, "productImageHeight"),
    20,
    360,
  );

  return {
    ...(desktopWidth !== undefined ? { "--tmr-page-desktop-width": desktopWidth } : {}),
    ...(desktopHeight !== undefined ? { "--tmr-page-desktop-height": desktopHeight } : {}),
    ...(desktopPadding !== undefined ? { "--tmr-page-desktop-padding": desktopPadding } : {}),
    ...(desktopMargin !== undefined ? { "--tmr-page-desktop-margin": desktopMargin } : {}),
    ...(mobileWidth !== undefined ? { "--tmr-page-mobile-width": mobileWidth } : {}),
    ...(mobileHeight !== undefined ? { "--tmr-page-mobile-height": mobileHeight } : {}),
    ...(mobilePadding !== undefined ? { "--tmr-page-mobile-padding": mobilePadding } : {}),
    ...(mobileMargin !== undefined ? { "--tmr-page-mobile-margin": mobileMargin } : {}),
    "--tmr-bg": "var(--bg, #FAFAF7)",
    "--tmr-text": "var(--ink, #0E0E0C)",
    "--tmr-sub": "var(--sub, #55554E)",
    "--tmr-muted": "var(--mut, #8F8F86)",
    "--tmr-line": "var(--line, #E6E6E0)",
    "--tmr-line-strong": "var(--line2, #D5D5CD)",
    "--tmr-panel": "#FFFFFF",
    "--tmr-dark": "var(--dark, #0E0E0C)",
    "--tmr-accent": themeColor(
      raw(props, "accentColor"),
      "var(--lime, #C7F136)",
    ),
    "--tmr-background-glow-factor": 0,
    "--tmr-accent-text": "var(--lime-ink, #3D4D0E)",
    "--tmr-accent-soft": "var(--lime-soft, #F2F8DC)",
    "--tmr-danger": "var(--red, #E2492F)",
    "--tmr-word-color": themeColor(props.styledPhraseColor, "#C7F136"),
    "--tmr-word-weight": props.styledPhraseBold ? "800" : "inherit",
    "--tmr-word-style": props.styledPhraseItalic ? "italic" : "inherit",
    "--tmr-solution-carousel-duration": `${numberInRange(raw(props, "carouselDurationSeconds"), 24, 4, 90)}s`,
    "--tmr-solution-edge-fade-width": `${numberInRange(raw(props, "edgeFadeWidth"), 44, 0, 120)}px`,
    "--tmr-solution-card-gap": `${numberInRange(raw(props, "cardGap"), 22, 8, 48)}px`,
    "--tmr-solution-card-radius": `${numberInRange(raw(props, "cardRadius"), 20, 0, 36)}px`,
    "--tmr-solution-media-start": "#F4F4EF",
    "--tmr-solution-media-end": "#E9E9E2",
    "--tmr-solution-image-width": `${numberInRange(raw(props, "productImageWidth"), 170, 48, 280)}px`,
    "--tmr-solution-image-height": `${numberInRange(raw(props, "productImageHeight"), 156, 48, 240)}px`,
    "--tmr-solution-image-x": `${numberInRange(raw(props, "productImageXOffset"), 0, -90, 90)}px`,
    "--tmr-solution-image-y": `${numberInRange(raw(props, "productImageYOffset"), 0, -90, 90)}px`,
    "--tmr-solution-image-fit": imageFit(raw(props, "productImageFit")),
    "--tmr-solution-image-opacity": percentage(
      raw(props, "productImageOpacity"),
      100,
      0,
      100,
    ),
    "--tmr-solution-image-brightness": percentage(
      raw(props, "productImageBrightness"),
      100,
      0,
      220,
    ),
    "--tmr-solution-image-contrast": percentage(
      raw(props, "productImageContrast"),
      100,
      0,
      220,
    ),
    "--tmr-solution-image-saturation": percentage(
      raw(props, "productImageSaturation"),
      100,
      0,
      260,
    ),
    "--tmr-solution-image-hue": `${numberInRange(raw(props, "productImageHue"), 0, -180, 180)}deg`,
    "--tmr-solution-image-invert": percentage(
      raw(props, "productImageInvert"),
      0,
      0,
      100,
    ),
    "--tmr-curing-background": themeColor(props.backgroundColor, "#0E0E0C"),
    "--tmr-curing-text": themeColor(props.textColor, "#FFFFFF"),
    "--tmr-curing-sub": themeColor(props.subTextColor, "#A5A59A"),
    "--tmr-curing-muted": themeColor(props.mutedTextColor, "#8B8B80"),
    "--tmr-curing-line": themeColor(props.lineColor, "#26261F"),
    "--tmr-curing-panel": themeColor(props.panelColor, "#161612"),
    "--tmr-curing-accent": themeColor(props.accentColor, "#C7F136"),
    "--tmr-curing-accent-text": themeColor(props.accentTextColor, "#3D4D0E"),
    "--tmr-curing-accent-soft": themeColor(props.accentSoftColor, "#1C1C17"),
    "--tmr-curing-reason-bg": themeColor(
      raw(props, "reasonCardBackgroundColor"),
      "#161612",
    ),
    "--tmr-curing-product-media-start": themeColor(
      raw(props, "productMediaStartColor"),
      "#1D1D17",
    ),
    "--tmr-curing-product-media-end": themeColor(
      raw(props, "productMediaEndColor"),
      "#14140F",
    ),
    "--tmr-curing-reason-radius": `${numberInRange(raw(props, "reasonCardRadius"), 18, 0, 36)}px`,
    "--tmr-curing-product-radius": `${numberInRange(raw(props, "productCardRadius"), 20, 0, 36)}px`,
    ...(curingImageWidth
      ? {
          "--tmr-curing-image-width": curingImageWidth,
          "--tmr-curing-image-max-width": "100%",
        }
      : {}),
    ...(curingImageHeight
      ? {
          "--tmr-curing-image-height": curingImageHeight,
          "--tmr-curing-image-max-height": "100%",
        }
      : {}),
    "--tmr-curing-image-x": `${numberInRange(raw(props, "productImageXOffset"), 0, -90, 90)}px`,
    "--tmr-curing-image-y": `${numberInRange(raw(props, "productImageYOffset"), 0, -90, 90)}px`,
    "--tmr-curing-image-fit": imageFit(raw(props, "productImageFit")),
    "--tmr-curing-image-opacity": percentage(
      raw(props, "productImageOpacity"),
      100,
      0,
      100,
    ),
    "--tmr-curing-image-brightness": percentage(
      raw(props, "productImageBrightness"),
      100,
      0,
      220,
    ),
    "--tmr-curing-image-contrast": percentage(
      raw(props, "productImageContrast"),
      100,
      0,
      220,
    ),
    "--tmr-curing-image-saturation": percentage(
      raw(props, "productImageSaturation"),
      100,
      0,
      260,
    ),
    "--tmr-curing-image-hue": `${numberInRange(raw(props, "productImageHue"), 0, -180, 180)}deg`,
    "--tmr-curing-image-invert": percentage(
      raw(props, "productImageInvert"),
      0,
      0,
      100,
    ),
    "--tmr-roi-bg": themeColor(props.backgroundColor, "#C7F136"),
    "--tmr-roi-text": themeColor(props.textColor, "#0E0E0C"),
    "--tmr-roi-sub": themeColor(props.subTextColor, "#2C3A09"),
    "--tmr-roi-eyebrow": themeColor(props.accentTextColor, "#3D4D0E"),
    "--tmr-roi-button-bg": themeColor(props.buttonBackgroundColor, "#0E0E0C"),
    "--tmr-roi-button-text": themeColor(props.buttonTextColor, "#FFFFFF"),
    "--tmr-roi-button-radius": `${numberInRange(raw(props, "buttonRadius"), 10, 0, 32)}px`,
    "--tmr-eco-icon-width": `${numberInRange(raw(props, "iconImageWidth"), 44, 12, 96)}px`,
    "--tmr-eco-icon-height": `${numberInRange(raw(props, "iconImageHeight"), 44, 12, 96)}px`,
    "--tmr-eco-icon-x": `${numberInRange(raw(props, "iconImageXOffset"), 0, -32, 32)}px`,
    "--tmr-eco-icon-y": `${numberInRange(raw(props, "iconImageYOffset"), 0, -32, 32)}px`,
    "--tmr-eco-icon-fit": imageFit(raw(props, "iconImageFit")),
    "--tmr-eco-icon-opacity": percentage(
      raw(props, "iconImageOpacity"),
      100,
      0,
      100,
    ),
    "--tmr-eco-icon-brightness": percentage(
      raw(props, "iconImageBrightness"),
      100,
      0,
      220,
    ),
    "--tmr-eco-icon-contrast": percentage(
      raw(props, "iconImageContrast"),
      100,
      0,
      220,
    ),
    "--tmr-eco-icon-saturation": percentage(
      raw(props, "iconImageSaturation"),
      100,
      0,
      260,
    ),
    "--tmr-eco-icon-hue": `${numberInRange(raw(props, "iconImageHue"), 0, -180, 180)}deg`,
    "--tmr-eco-icon-invert": percentage(
      raw(props, "iconImageInvert"),
      0,
      0,
      100,
    ),
    "--tmr-eco-item-radius": `${numberInRange(raw(props, "itemRadius"), 16, 0, 32)}px`,
    "--tmr-eco-icon-box-radius": `${numberInRange(raw(props, "iconBoxRadius"), 14, 0, 32)}px`,
    "--tmr-eco-diagram-width": `${numberInRange(raw(props, "diagramImageWidth"), 940, 260, 1800)}px`,
    "--tmr-eco-diagram-height": `${numberInRange(raw(props, "diagramImageHeight"), 300, 120, 900)}px`,
    "--tmr-eco-diagram-x": `${numberInRange(raw(props, "diagramImageXOffset"), 0, -160, 160)}px`,
    "--tmr-eco-diagram-y": `${numberInRange(raw(props, "diagramImageYOffset"), 0, -120, 120)}px`,
    "--tmr-eco-diagram-fit": imageFit(raw(props, "diagramImageFit")),
    "--tmr-eco-diagram-opacity": percentage(
      raw(props, "diagramImageOpacity"),
      100,
      0,
      100,
    ),
    "--tmr-eco-diagram-brightness": percentage(
      raw(props, "diagramImageBrightness"),
      100,
      0,
      220,
    ),
    "--tmr-eco-diagram-contrast": percentage(
      raw(props, "diagramImageContrast"),
      100,
      0,
      220,
    ),
    "--tmr-eco-diagram-saturation": percentage(
      raw(props, "diagramImageSaturation"),
      100,
      0,
      260,
    ),
    "--tmr-eco-diagram-hue": `${numberInRange(raw(props, "diagramImageHue"), 0, -180, 180)}deg`,
    "--tmr-eco-diagram-invert": percentage(
      raw(props, "diagramImageInvert"),
      0,
      0,
      100,
    ),
    "--tmr-trust-avatar-width": `${numberInRange(raw(props, "profileImageWidth"), 58, 24, 120)}px`,
    "--tmr-trust-avatar-height": `${numberInRange(raw(props, "profileImageHeight"), 58, 24, 120)}px`,
    "--tmr-trust-avatar-x": `${numberInRange(raw(props, "profileImageXOffset"), 0, -40, 40)}px`,
    "--tmr-trust-avatar-y": `${numberInRange(raw(props, "profileImageYOffset"), 0, -40, 40)}px`,
    "--tmr-trust-avatar-fit": imageFit(raw(props, "profileImageFit")),
    "--tmr-trust-avatar-opacity": percentage(
      raw(props, "profileImageOpacity"),
      100,
      0,
      100,
    ),
    "--tmr-trust-avatar-brightness": percentage(
      raw(props, "profileImageBrightness"),
      100,
      0,
      220,
    ),
    "--tmr-trust-avatar-contrast": percentage(
      raw(props, "profileImageContrast"),
      100,
      0,
      220,
    ),
    "--tmr-trust-avatar-saturation": percentage(
      raw(props, "profileImageSaturation"),
      100,
      0,
      260,
    ),
    "--tmr-trust-avatar-hue": `${numberInRange(raw(props, "profileImageHue"), 0, -180, 180)}deg`,
    "--tmr-trust-avatar-invert": percentage(
      raw(props, "profileImageInvert"),
      0,
      0,
      100,
    ),
    "--tmr-trust-logo-height": `${numberInRange(raw(props, "trustedLogoHeight"), 58, 12, 120)}px`,
    "--tmr-trust-logo-opacity": percentage(
      raw(props, "trustedLogoOpacity"),
      75,
      0,
      100,
    ),
    "--tmr-trust-logo-grayscale": percentage(
      raw(props, "trustedLogoGrayscale"),
      100,
      0,
      100,
    ),
    "--tmr-trust-card-radius": `${numberInRange(raw(props, "cardRadius"), 20, 0, 36)}px`,
    "--tmr-final-bg": "var(--dark, #0E0E0C)",
    "--tmr-final-text": "#FFFFFF",
    "--tmr-final-sub": "#A5A59A",
    "--tmr-final-primary-bg": "var(--lime, #C7F136)",
    "--tmr-final-primary-text": "var(--ink, #0E0E0C)",
    "--tmr-final-secondary-text": "#FFFFFF",
    "--tmr-final-button-radius": `${numberInRange(raw(props, "buttonRadius"), 10, 0, 32)}px`,
    "--tmr-footer-bg": themeColor(raw(props, "backgroundColor"), "#0E0E0C"),
    "--tmr-footer-text": themeColor(raw(props, "textColor"), "#FFFFFF"),
    "--tmr-footer-muted": themeColor(
      raw(props, "mutedTextColor"),
      "#8B8B80",
    ),
    "--tmr-footer-line": themeColor(raw(props, "lineColor"), "#26261F"),
    // Keep logo dimensions bounded while allowing meaningful Studio overrides.
    "--tmr-footer-logo-image-width": `${numberInRange(raw(props, "logoImageWidth"), 116, 40, 300)}px`,
    "--tmr-footer-logo-image-height": `${numberInRange(raw(props, "logoImageHeight"), 24, 12, 100)}px`,
    "--tmr-footer-logo-image-x": `${numberInRange(raw(props, "logoImageXOffset"), 0, -48, 48)}px`,
    "--tmr-footer-logo-image-y": `${numberInRange(raw(props, "logoImageYOffset"), 0, -48, 48)}px`,
    "--tmr-footer-logo-image-fit": imageFit(raw(props, "logoImageFit")),
    "--tmr-footer-logo-image-opacity": percentage(
      raw(props, "logoImageOpacity"),
      100,
      0,
      100,
    ),
    "--tmr-footer-logo-image-brightness": percentage(
      raw(props, "logoImageBrightness"),
      100,
      0,
      220,
    ),
    "--tmr-footer-logo-image-contrast": percentage(
      raw(props, "logoImageContrast"),
      100,
      0,
      220,
    ),
    "--tmr-footer-logo-image-saturation": percentage(
      raw(props, "logoImageSaturation"),
      100,
      0,
      260,
    ),
    "--tmr-footer-logo-image-hue": `${numberInRange(raw(props, "logoImageHue"), 0, -180, 180)}deg`,
    "--tmr-footer-logo-image-invert": percentage(
      raw(props, "logoImageInvert"),
      0,
      0,
      100,
    ),
    "--tmr-footer-logo-svg-width": `${numberInRange(raw(props, "logoSvgWidth"), 116, 40, 300)}px`,
    "--tmr-footer-logo-svg-height": `${numberInRange(raw(props, "logoSvgHeight"), 24, 12, 100)}px`,
    "--tmr-footer-logo-svg-x": `${numberInRange(raw(props, "logoSvgXOffset"), 0, -48, 48)}px`,
    "--tmr-footer-logo-svg-y": `${numberInRange(raw(props, "logoSvgYOffset"), 0, -48, 48)}px`,
    "--tmr-footer-logo-svg-opacity": percentage(
      raw(props, "logoSvgOpacity"),
      100,
      0,
      100,
    ),
    "--tmr-footer-logo-svg-brightness": percentage(
      raw(props, "logoSvgBrightness"),
      100,
      0,
      220,
    ),
    "--tmr-footer-logo-svg-contrast": percentage(
      raw(props, "logoSvgContrast"),
      100,
      0,
      220,
    ),
    "--tmr-footer-logo-svg-saturation": percentage(
      raw(props, "logoSvgSaturation"),
      100,
      0,
      260,
    ),
    "--tmr-footer-logo-svg-hue": `${numberInRange(raw(props, "logoSvgHue"), 0, -180, 180)}deg`,
    "--tmr-footer-logo-svg-invert": percentage(
      raw(props, "logoSvgInvert"),
      0,
      0,
      100,
    ),
  } as any;
}

function indexedSection(
  props: ThreeMashSectionRenderProps,
  defaults: {
    anchor: string;
    className?: string;
    indexNumber: string;
    indexText: string;
    titleText: string;
    titleEmphasis?: string;
    sideHtml: string;
    contentHtml: string;
  },
) {
  return `<section id="${escapeAttr(value(props.sectionAnchorId, defaults.anchor))}" class="tmr-section${defaults.className ? ` ${defaults.className}` : ""}">
  <div class="tmr-wrap">
    <div class="tmr-index"><span class="tmr-index-number">${value(props.indexNumber, defaults.indexNumber)}</span><span class="tmr-index-text">${value(props.indexText, defaults.indexText)}</span><span class="tmr-index-line"></span></div>
    <div class="tmr-head"><h2>${heading(value(props.titleText, defaults.titleText), value(props.titleEmphasis, defaults.titleEmphasis || ""))}</h2><div class="tmr-side">${value(props.sideHtml, defaults.sideHtml)}</div></div>
    ${value(props.contentHtml, defaults.contentHtml)}
  </div>
</section>`;
}

function themeColor(value: unknown, fallback: string) {
  const candidate = typeof value === "string" ? value.trim() : "";
  return /^(?:#[\da-f]{3,8}|[a-z]+|(?:rgb|hsl)a?\([\d\s.,%/+\-]+\))$/i.test(candidate)
    ? candidate
    : fallback;
}

export function solutionThemeStyle(props: ThreeMashSectionRenderProps) {
  return {
    ...threeMashThemeStyle(props),
    "--tmr-bg": themeColor(props.backgroundColor, "#FAFAF7"),
    "--tmr-text": themeColor(props.textColor, "#0E0E0C"),
    "--tmr-sub": themeColor(props.subTextColor, "#55554E"),
    "--tmr-muted": themeColor(props.mutedTextColor, "#8F8F86"),
    "--tmr-line": themeColor(props.lineColor, "#E6E6E0"),
    "--tmr-panel": themeColor(props.panelColor, "#FFFFFF"),
    "--tmr-accent": themeColor(props.accentColor, "#C7F136"),
    "--tmr-accent-text": themeColor(props.accentTextColor, "#3D4D0E"),
    "--tmr-accent-soft": themeColor(props.accentSoftColor, "#F2F8DC"),
    "--tmr-danger": themeColor(props.dangerColor, "#E2492F"),
    "--tmr-word-color": themeColor(
      props.styledPhraseColor,
      themeColor(props.accentColor, "#C7F136"),
    ),
    "--tmr-background-glow-factor": props.showBackgroundGlow === false ? 0 : 1,
    "--tmr-solution-media-start": themeColor(
      props.cardMediaStartColor,
      "#F4F4EF",
    ),
    "--tmr-solution-media-end": themeColor(
      props.cardMediaEndColor,
      "#E9E9E2",
    ),
  };
}

export function finalThemeStyle(props: ThreeMashSectionRenderProps) {
  const primaryButtonBackground = themeColor(
    props.primaryButtonBackgroundColor,
    "#C7F136",
  );

  return {
    ...threeMashThemeStyle(props),
    "--tmr-final-bg": themeColor(props.backgroundColor, "#0E0E0C"),
    "--tmr-final-text": themeColor(props.textColor, "#FFFFFF"),
    "--tmr-final-sub": themeColor(props.subTextColor, "#A5A59A"),
    "--tmr-accent": themeColor(props.accentColor, "#C7F136"),
    "--tmr-final-primary-bg": primaryButtonBackground,
    "--tmr-final-primary-hover": props.primaryButtonBackgroundColor
      ? `color-mix(in srgb, ${primaryButtonBackground} 85%, white)`
      : "#D3F75C",
    "--tmr-final-primary-text": themeColor(
      props.primaryButtonTextColor,
      "#0E0E0C",
    ),
    "--tmr-final-secondary-text": themeColor(
      props.secondaryButtonTextColor,
      "#FFFFFF",
    ),
  };
}

export function ecosystemThemeStyle(props: ThreeMashSectionRenderProps) {
  return {
    ...threeMashThemeStyle(props),
    "--tmr-bg": themeColor(props.backgroundColor, "#FAFAF7"),
    "--tmr-text": themeColor(props.textColor, "#0E0E0C"),
    "--tmr-sub": themeColor(props.subTextColor, "#55554E"),
    "--tmr-muted": themeColor(props.mutedTextColor, "#8F8F86"),
    "--tmr-line": themeColor(props.lineColor, "#E6E6E0"),
    "--tmr-panel": themeColor(props.panelColor, "#FFFFFF"),
    "--tmr-accent": themeColor(props.accentColor, "#C7F136"),
    "--tmr-accent-text": themeColor(props.accentTextColor, "#3D4D0E"),
    "--tmr-accent-soft": themeColor(props.accentSoftColor, "#F2F8DC"),
    "--tmr-word-color": themeColor(
      props.styledPhraseColor,
      themeColor(props.accentColor, "#C7F136"),
    ),
    "--tmr-background-glow-factor": props.showBackgroundGlow === false ? 0 : 1,
  };
}

export function faqThemeStyle(props: ThreeMashSectionRenderProps) {
  return {
    ...threeMashThemeStyle(props),
    "--tmr-bg": themeColor(props.backgroundColor, "#FAFAF7"),
    "--tmr-text": themeColor(props.textColor, "#0E0E0C"),
    "--tmr-sub": themeColor(props.subTextColor, "#55554E"),
    "--tmr-muted": themeColor(props.mutedTextColor, "#8F8F86"),
    "--tmr-line": themeColor(props.lineColor, "#E6E6E0"),
    "--tmr-accent": themeColor(props.accentColor, "#C7F136"),
    "--tmr-accent-text": themeColor(props.accentTextColor, "#3D4D0E"),
  };
}

export function trustThemeStyle(props: ThreeMashSectionRenderProps) {
  return {
    ...threeMashThemeStyle(props),
    "--tmr-bg": themeColor(props.backgroundColor, "#FAFAF7"),
    "--tmr-text": themeColor(props.textColor, "#0E0E0C"),
    "--tmr-sub": themeColor(props.subTextColor, "#55554E"),
    "--tmr-muted": themeColor(props.mutedTextColor, "#8F8F86"),
    "--tmr-line": themeColor(props.lineColor, "#E6E6E0"),
    "--tmr-panel": themeColor(props.panelColor, "#FFFFFF"),
    "--tmr-dark": themeColor(props.darkColor, "#0E0E0C"),
    "--tmr-accent": themeColor(props.accentColor, "#C7F136"),
    "--tmr-accent-text": themeColor(props.accentTextColor, "#3D4D0E"),
    "--tmr-background-glow-factor": props.showBackgroundGlow === false ? 0 : 1,
  };
}

const solutionContentHtml = solutionSetupHtml;

/* Legacy static HTML blocks below are intentionally removed from execution.
 * The active locale-aware render functions are defined after this block.
 */
/*
const curingContentHtml = `<div class="tmr-why-grid"><article>


<div>SEBEP 01</div><h4>Mekanik dayanım</h4><p>Eksik kürleme (undercure) kırılganlık demek — geçici kron ve köprülerin <b>sık kırılmasının</b> en yaygın görünmez sebebi.</p></article><article><div>SEBEP 02</div><h4>Ölçüsel doğruluk</h4><p>Fazla kürleme (overcure) malzemeyi <b>çeker ve deforme eder</b>. Yazıcıda kazanılan ±20 µm, kürleme ünitesinde kaybedilir.</p></article><article><div>SEBEP 03</div><h4>Biyouyumluluk &amp; renk</h4><p>Doğru dönüşüm derecesi <b>monomer salınımını</b> engeller; renk stabilitesi ve hasta güvenliği sağlar.</p></article></div>
    <div class="tmr-products tmr-products-two"><article class="tmr-product"><div class="tmr-product-media"><span class="tmr-tag tmr-lime-tag">YIKAMA</span><img class="tmr-product-img tmr-machine-phrozen" src="${mashW1eImage}" alt="Mash W1E Ultrasonik Yıkama Cihazı"></div><div class="tmr-product-body"><h3>Mash W1E Ultrasonik Yıkama Cihazı</h3><p>Baskı sonrası parçaların yüzeyindeki reçine kalıntılarını <b>ultrasonik yıkama</b> ile temizler; kürleme öncesi yüzeyi hazırlar.</p><div class="tmr-spec"><div><span>İşlem</span><b>Ultrasonik yıkama</b></div><div><span>Akış</span><b>Baskı sonrası temizlik</b></div></div><a class="tmr-go" href="/mash-w1e-ultrasonik-yikama-cihazi">İncele <span>→</span></a></div></article><article class="tmr-product"><div class="tmr-product-media"><span class="tmr-tag">KÜRLEME</span><img class="tmr-product-img tmr-machine-uw02" src="${mashC1eImage}" alt="Mash C1E UV Kürleme Cihazı"></div><div class="tmr-product-body"><h3>Mash C1E UV Kürleme Cihazı</h3><p>24 LED'li 360° ışık sistemi ve 360-530 nm geniş spektrum desteğiyle dental reçine baskılarda <b>UV post-curing</b> adımını tamamlar.</p><div class="tmr-spec"><div><span>Işık sistemi</span><b>360° / 24 LED</b></div><div><span>Spektrum</span><b>360-530 nm</b></div></div><a class="tmr-go" href="/mash-c1e-uv-kurleme-cihazi">İncele <span>→</span></a></div></article></div>
    <p class="tmr-readmore">Derine inmek isteyenlere, Mash Academy'den: <a href="/blog/dental-3d-baskida-overcure-ve-undercure-nedir-en-dogru-kurleme-icin-kapsamli-rehber">Overcure ve Undercure Nedir?</a> · <a href="/blog/dental-3d-baskida-dogru-dalga-boyu-secimi-385nm-mi-405nm-mi">385nm mi 405nm mi?</a></p>`;

const ecosystemContentHtml = `<div class="tmr-eco"><a href="/3d-yazicilar"><span class="tmr-eco-icon"><img src="${ecoPrinterIcon}" alt="" aria-hidden="true"></span><span>3D Yazıcılar</span></a><a href="/dental-3d-yazici-recineleri"><span class="tmr-eco-icon"><img src="${ecoResinIcon}" alt="" aria-hidden="true"></span><span>Dental Reçineler</span></a><a href="/yikama-kurleme-cihazlari"><span class="tmr-eco-icon"><img src="${ecoScannerIcon}" alt="" aria-hidden="true"></span><span>Yıkama &amp; Kürleme</span></a><a href="/masasustu-tarayicilar"><span class="tmr-eco-icon"><img src="${ecoCuringIcon}" alt="" aria-hidden="true"></span><span>Masaüstü Tarayıcılar</span></a><a href="/zirkon-bloklar"><span class="tmr-eco-icon"><img src="${ecoBlocksIcon}" alt="" aria-hidden="true"></span><span>Zirkon Bloklar</span></a><a href="/dental-firinlar"><span class="tmr-eco-icon"><img src="${ecoOvenIcon}" alt="" aria-hidden="true"></span><span>Dental Fırınlar</span></a></div>`;

const trustContentHtml = `<div class="tmr-testimonials"><article class="tmr-testimonial tmr-featured"><div class="tmr-quote">“</div><p>Profesyoneller mutlak başarı için profesyonellere güvenir. Ekipman seçimi, temini, eğitimi ve kullanımında Mash ile iş birliği yapıyoruz.</p><div class="tmr-who"><img class="tmr-avatar" src="${profileMehmet}" alt="Mehmet İşlek"><div><b>Mehmet İşlek</b><small>ATTELIA · Kurucu Başhekim — 22 yıldır gülümseme tasarlayan klinik</small></div></div></article><article class="tmr-testimonial"><div class="tmr-quote">“</div><p>Yenilikçi ve yaratıcı. Donanım, yazılım ve malzemelerde uzun vadeli, başarılı bir iş birliği.</p><div class="tmr-who"><img class="tmr-avatar" src="${profileBerkan}" alt="Berkan Öztaş"><div><b>Berkan Öztaş</b><small>DENTEK · Genel Müd. Yard.</small></div></div></article><article class="tmr-testimonial"><div class="tmr-quote">“</div><p>Sorunları biz daha yaşamadan çözmüşler. Her zaman aynı kalitede üretim — mükemmel sonuçlar.</p><div class="tmr-who"><img class="tmr-avatar" src="${profileGoksel}" alt="Göksel Pişkin"><div><b>Göksel Pişkin</b><small>MIKRO LAB · Kurucu Ortak</small></div></div></article></div><div class="tmr-trusted">${trustedLabelMarkup}${bundledTrustedLogos}</div>`;

const faqContentHtml = `<div class="tmr-faq"><details open><summary>Dental 3D baskıda ölçüsel hassasiyet neden bu kadar önemli?<span>+</span></summary><div>Çünkü bir restorasyonun ilk seferde oturması doğrudan ölçüsel hassasiyete bağlıdır. Ulusal ölçekli klinik verilerde kron tekrarlarının en sık sebepleri <b>proksimal uyumsuzluk, marjinal hatalar ve estetik başarısızlıktır</b> — üçü de birer hassasiyet problemidir. 3mash ekosistemi <b>±20 µm</b> boyutsal hassasiyeti, tek seferlik değil <b>her baskıda</b> tekrar edilebilir şekilde sağlar; bu da tekrar oranını ve gizli maliyeti düşürür.</div></details><details><summary>Bir kron tekrarının (remake) maliyeti gerçekte ne kadar?<span>+</span></summary><div>Tahminî olarak <b>~500 dolar</b> — ve bu tutarın büyük kısmı lab ücreti değil, <b>koltuk süresidir</b> (yeniden prep, ölçü ve yapıştırma randevusu). Klinik işletme gideri saatte ~$375 modellenir; tek bir tekrar bunun çoğunu tüketir. Kendi kalemlerinizle hesaplamak için <a href="#">maliyet detay sayfamıza</a> bakabilirsiniz.</div></details><details><summary>3D baskıda kürleme (post-curing) neden kritik?<span>+</span></summary><div>Çünkü baskı, cihazdan çıktığında henüz bitmemiştir. Yetersiz kürleme (undercure) <b>kırılganlık</b>, fazla kürleme (overcure) ise <b>deformasyon</b> yaratır — yazıcıda kazandığınız hassasiyeti kürlemede kaybedebilirsiniz. 3mash'in akıllı kürleme cihazı parametreleri otomatik yönetir ve bu riski kullanıcı hatasından arındırır.</div></details><details><summary>3mash yalnızca cihaz mı satıyor?<span>+</span></summary><div>Hayır. 3mash entegre bir <b>üretim ekosistemi</b> sunar: yazıcı, reçine ve kürlemeyi birlikte kalibre eder; danışmanlık, Mash Academy eğitimleri ve <b>diş teknisyeni + mühendislerden</b> oluşan satış sonrası teknik destekle tüm süreçte yanınızda olur.</div></details><details><summary>Elimdeki başka marka yazıcıyla çalışır mısınız?<span>+</span></summary><div>Evet. Hem reçine hem yazıcı tarafında güçlü bir teknik birikime sahip olduğumuz için çözümlerimiz <b>marka bağımsızdır</b>; mevcut cihazınızın parametrelerini optimize ederek onu da aynı sonuca getirebiliriz.</div></details></div>`;

*/

function solutionContent(props: ThreeMashSectionRenderProps) {
  const cards = [
    ...(raw(props, "showSolutionCard1") !== false
      ? [solutionP1dCard(props)]
      : []),
    ...(raw(props, "showSolutionCard2") !== false
      ? [solutionSecondCard(props)]
      : []),
    ...(raw(props, "showSolutionCard3") !== false
      ? [solutionResinCategoryCard(props)]
      : []),
    ...(raw(props, "showSolutionCard4") === true
      ? [solutionExtraCard(props, 4)]
      : []),
    ...(raw(props, "showSolutionCard5") === true
      ? [solutionExtraCard(props, 5)]
      : []),
    ...(raw(props, "showSolutionCard6") === true
      ? [solutionExtraCard(props, 6)]
      : []),
  ].filter(Boolean);
  const ariaLabel = plainText(
    localizedValue(props, "carouselAriaLabel", "Çözüm ürünleri", "Solution products"),
  );

  return `<div class="tmr-products" aria-label="${escapeAttr(ariaLabel)}">${cards.join("")}</div>`;
}

function curingReasons(props: ThreeMashSectionRenderProps) {
  const trDefaults = [
    [
      tLocalized("SEBEP 01", "REASON 01"),
      tLocalized("Mekanik dayanım", "Mechanical strength"),
      tLocalized("Eksik kürleme (undercure) kırılganlık demek — geçici kron ve köprülerin <b>sık kırılmasının</b> en yaygın görünmez sebebi.", "Undercuring means brittleness — the most common hidden cause of <b>frequent breakage</b> in temporary crowns and bridges."),
    ],
    [
      tLocalized("SEBEP 02", "REASON 02"),
      tLocalized("Ölçüsel doğruluk", "Dimensional accuracy"),
      tLocalized("Fazla kürleme (overcure) malzemeyi <b>çeker ve deforme eder</b>. Yazıcıda kazanılan ±20 µm, kürleme ünitesinde kaybedilir.", "Overcuring <b>shrinks and deforms</b> the material. The ±20 µm gained at the printer is lost at the curing unit."),
    ],
    [
      tLocalized("SEBEP 03", "REASON 03"),
      tLocalized("Biyouyumluluk &amp; renk", "Biocompatibility &amp; colour"),
      tLocalized("Doğru dönüşüm derecesi <b>monomer salınımını</b> engeller; renk stabilitesi ve hasta güvenliği sağlar.", "The correct degree of conversion prevents <b>monomer release</b>; it ensures color stability and patient safety."),
    ],
  ];

  const enDefaults = [
    [
      "REASON 01",
      "Mechanical strength",
      "Undercure means brittleness — the most common hidden cause of <b>frequent fractures</b> in provisional crowns and bridges.",
    ],
    [
      "REASON 02",
      "Dimensional accuracy",
      "Overcure <b>shrinks and deforms</b> the material. The ±20 µm accuracy achieved in the printer is lost in the curing unit.",
    ],
    [
      "REASON 03",
      "Biocompatibility &amp; color",
      "Proper degree of conversion prevents <b>monomer elution</b>; ensures color stability and patient safety.",
    ],
  ];

  const cards = trDefaults
    .map(([eyebrowTr, titleTr, descriptionTr], index) => {
      const number = index + 1;
      if (raw(props, `showReason${number}`) === false) return "";
      const [eyebrowEn, titleEn, descriptionEn] = enDefaults[index];
      return `<article><div>${localizedField(props, `reason${number}Eyebrow`, eyebrowTr, eyebrowEn)}</div><h3>${localizedField(props, `reason${number}Title`, titleTr, titleEn)}</h3><p>${localizedField(props, `reason${number}DescriptionHtml`, descriptionTr, descriptionEn)}</p></article>`;
    })
    .filter(Boolean);

  return cards.length
    ? `<div class="tmr-why-grid tmr-why-grid-count-${cards.length}">${cards.join("")}</div>`
    : "";
}

function curingProducts(props: ThreeMashSectionRenderProps) {
  const normalizedProps = withLegacyDefaults(props, {
    curingProduct1Tag: {
      legacy: tLocalized("YIKAMA · KÜRLEME", "WASHING · CURING"),
      next: tLocalized("YIKAMA", "WASHING"),
    },
    curingProduct1Title: {
      legacy: "Phrozen Wash & Cure Kit",
      next: tLocalized("Mash W1E Ultrasonik Yıkama Cihazı", "Mash W1E Ultrasonic Washing Device"),
    },
    curingProduct1DescriptionHtml: {
      legacy:
        tLocalized("8L yıkama istasyonu ve kuru+kürleme moduyla baskı sonrası süreci <b>temizleme, kurutma ve 405nm UV kürleme</b> olarak tek akışta toplar.", "With an 8L wash station and dry + cure mode, it brings the post-print process together in a single workflow: <b>cleaning, drying, and 405nm UV curing</b>."),
      next: tLocalized("Reçine baskı sonrası yüzeyde kalan fazla reçineyi <b>ultrasonik temizleme</b> ile kısa sürede ve hassas biçimde uzaklaştırır; kürleme öncesi temiz yüzey sağlar.", "Removes excess resin remaining on the surface after resin printing quickly and precisely with <b>ultrasonic cleaning</b>; provides a clean surface before curing."),
    },
    curingProduct1ImageAlt: {
      legacy: "Phrozen Wash & Cure Kit",
      next: tLocalized("Mash W1E Ultrasonik Yıkama Cihazı", "Mash W1E Ultrasonic Washing Device"),
    },
    curingProduct1Spec1Label: {
      legacy: tLocalized("Yıkama hacmi", "Washing volume"),
      next: tLocalized("İşlem", "Process"),
    },
    curingProduct1Spec1Value: { legacy: "8 L", next: tLocalized("Ultrasonik temizleme", "ultrasonic cleaning") },
    curingProduct1Spec2Label: {
      legacy: tLocalized("Kürleme", "Curing"),
      next: tLocalized("Akış", "Workflow"),
    },
    curingProduct1Spec2Value: { legacy: "405 nm UV", next: tLocalized("Yıkama → kürleme hazırlığı", "Washing → curing preparation") },
    curingProduct1CtaHref: {
      legacy: "https://uk.phrozen3d.com/products/wash-cure-kit",
      next: "/mash-w1e-ultrasonik-yikama-cihazi",
    },
    curingProduct2Tag: { legacy: tLocalized("YIKAMA · KÜRLEME", "WASHING · CURING"), next: tLocalized("KÜRLEME", "CURING") },
    curingProduct2Title: {
      legacy: tLocalized("Creality UW02", "Creality UW02"),
      next: tLocalized("Mash C1E UV Kürleme Cihazı", "Mash C1E UV Curing Device"),
    },
    curingProduct2DescriptionHtml: {
      legacy:
        tLocalized("Baskı sonrası yıkama ve kürleme adımlarını <b>tek kontrollü akışta</b> toplar. P16L ile tamamlayıcı başlangıç seti.", "Brings the post-print washing and curing steps together in a <b>single controlled workflow</b>. A complementary starter set with the P16L."),
      next: tLocalized("Kürleme, polimer malzemelerin <b>sertleştirilme sürecidir.</b> 3D baskı tamamlandıktan sonra ürünün boyutsal kararlılığını ve yüzey dayanımını destekler. Mash C1E, 24 LED'li 360° kürleme sistemi ve 360-530 nm geniş spektrum desteğiyle reçine baskılarınızda <b>hızlı ve homojen kürleme</b> sunar. <b>Sararmayı önlemeye</b> yardımcı olan teknolojisi ve dahili fan sistemiyle güvenilir, profesyonel sonuçlar sağlar.", "Curing is the <b>process of hardening polymer materials.</b> After 3D printing is complete, it supports the dimensional stability and surface durability of the product. With its 24-LED 360° curing system and wide 360–530 nm spectrum support, the Mash C1E offers <b>fast and homogeneous curing</b> for your resin prints. With technology that helps <b>prevent yellowing</b> and a built-in fan system, it delivers reliable, professional results."),
    },
    curingProduct2ImageAlt: {
      legacy: tLocalized("Creality UW02", "Creality UW02"),
      next: tLocalized("Mash C1E UV Kürleme Cihazı", "Mash C1E UV Curing Device"),
    },
    curingProduct2Spec1Label: { legacy: tLocalized("Görev", "Task"), next: tLocalized("Işık", "Light") },
    curingProduct2Spec1Value: {
      legacy: tLocalized("Yıkama + kürleme", "Washing + curing"),
      next: "24 LED / 360°",
    },
    curingProduct2Spec2Label: { legacy: tLocalized("Uyum", "Compatibility"), next: tLocalized("Spektrum", "Spectrum") },
    curingProduct2Spec2Value: {
      legacy: "P16L + CRS",
      next: tLocalized("360-530 nm", "360-530nm"),
    },
    curingProduct2CtaHref: {
      legacy: "/yikama-kurleme-cihazlari",
      next: "/mash-c1e-uv-kurleme-cihazi",
    },
  });
  const staticCuringProps = {
    ...normalizedProps,
  };

  const washCard: ProductCardDefaults = {
    tag: tLocalized("YIKAMA", "WASHING"),
    tagClass: "tmr-lime-tag",
    image: mashW1eImage,
    imageAlt: tLocalized("Mash W1E Ultrasonik Yıkama Cihazı", "Mash W1E Ultrasonic Washing Device"),
    imageClass: "tmr-machine-phrozen",
    title: tLocalized("Mash W1E Ultrasonik Yıkama Cihazı", "Mash W1E Ultrasonic Washing Device"),
    descriptionHtml: tLocalized(
      "Reçine baskı sonrası yüzeyde kalan fazla reçineyi <b>ultrasonik temizleme</b> ile kısa sürede ve hassas biçimde uzaklaştırır; kürleme öncesi temiz yüzey sağlar.",
      "Removes excess resin remaining on the surface after resin printing quickly and precisely with <b>ultrasonic cleaning</b>; provides a clean surface before curing.",
    ),
    specs: [
      [tLocalized("İşlem", "Process"), tLocalized("Ultrasonik temizleme", "Ultrasonic cleaning")],
      [tLocalized("Akış", "Workflow"), tLocalized("Yıkama → kürleme hazırlığı", "Washing → curing preparation")],
    ],
    ctaText: tLocalized("İncele", "Explore"),
    ctaHref: "/mash-w1e-ultrasonik-yikama-cihazi",
  };
  const curingCard: ProductCardDefaults = {
    tag: tLocalized("KÜRLEME", "CURING"),
    image: mashC1eImage,
    imageAlt: tLocalized("Mash C1E UV Kürleme Cihazı", "Mash C1E UV Curing Device"),
    imageClass: "tmr-machine-uw02",
    title: tLocalized("Mash C1E UV Kürleme Cihazı", "Mash C1E UV Curing Device"),
    descriptionHtml: tLocalized(
      "Kürleme, polimer malzemelerin <b>sertleştirilme sürecidir.</b> 3D baskı tamamlandıktan sonra ürünün boyutsal kararlılığını ve yüzey dayanımını destekler. Mash C1E, 24 LED'li 360° kürleme sistemi ve 360-530 nm geniş spektrum desteğiyle reçine baskılarınızda <b>hızlı ve homojen kürleme</b> sunar. <b>Sararmayı önlemeye</b> yardımcı olan teknolojisi ve dahili fan sistemiyle güvenilir, profesyonel sonuçlar sağlar.",
      "Curing is the <b>process of hardening polymer materials.</b> After 3D printing is complete, it supports the dimensional stability and surface durability of the product. With its 24-LED 360° curing system and wide 360–530 nm spectrum support, the Mash C1E offers <b>fast and homogeneous curing</b> for your resin prints. With technology that helps <b>prevent yellowing</b> and a built-in fan system, it delivers reliable, professional results.",
    ),
    specs: [
      [tLocalized("Işık", "Light"), "24 LED / 360°"],
      [tLocalized("Spektrum", "Spectrum"), tLocalized("360-530 nm", "360-530nm")],
    ],
    ctaText: tLocalized("İncele", "Explore"),
    ctaHref: "/mash-c1e-uv-kurleme-cihazi",
  };
  const cards = [
    ...(raw(props, "showProduct1") !== false
      ? [productCard(staticCuringProps, "curingProduct1", washCard, true)]
      : []),
    ...(raw(props, "showProduct2") !== false
      ? [productCard(staticCuringProps, "curingProduct2", curingCard, true)]
      : []),
  ];

  return cards.length
    ? `<div class="tmr-products tmr-products-two${cards.length === 1 ? " tmr-products-single" : ""}">${cards.join("")}</div>`
    : "";
}

function curingContent(props: ThreeMashSectionRenderProps) {
  const academyLinks = [
    ...(raw(props, "showReadMoreLink1") !== false
      ? [`<a href="${escapeAttr(localizedHref(field(props, "readMoreLink1Href", "/blog/dental-3d-baskida-overcure-ve-undercure-nedir-en-dogru-kurleme-icin-kapsamli-rehber")))}">${localizedField(props, "readMoreLink1Text", "Overcure ve Undercure Nedir?", "What is Overcure and Undercure?")}</a>`]
      : []),
    ...(raw(props, "showReadMoreLink2") !== false
      ? [`<a href="${escapeAttr(localizedHref(field(props, "readMoreLink2Href", "/blog/dental-3d-baskida-dogru-dalga-boyu-secimi-385nm-mi-405nm-mi")))}">${localizedField(props, "readMoreLink2Text", "385nm mi 405nm mi?", "385nm or 405nm?")}</a>`]
      : []),
  ];
  const readMore =
    raw(props, "showReadMore") !== false && academyLinks.length
      ? `<p class="tmr-readmore">${localizedField(props, "readMoreText", "Derine inmek isteyenlere, Mash Academy'den:", "For those who want to dive deeper, from Mash Academy:")} ${academyLinks.join(" · ")}</p>`
      : "";

  return `${curingReasons(props)}${curingProducts(props)}${readMore}`;
}

function curingTitleHtml(props: ThreeMashSectionRenderProps) {
  const titleText = localizedField(
    props,
    "titleText",
    "Sadece yazıcı değil. Sonucu",
    "Not just the printer. It is",
  );
  const titleEmphasis = localizedField(
    props,
    "titleEmphasis",
    "kürleme tamamlar.",
    "curing that completes the result.",
  );

  return `${titleText} <span class="tmr-curing-keep"><span class="tmr-title-em">${titleEmphasis}</span></span>`;
}

function ecosystemContent(props: ThreeMashSectionRenderProps) {
  const icons = [
    ecoPrinterIcon,
    ecoResinIcon,
    ecoScannerIcon,
    ecoCuringIcon,
    ecoBlocksIcon,
    ecoOvenIcon,
  ];
  const trTitles = [
    tLocalized("3D Yazıcılar", "3D Printers"),
    tLocalized("Dental Reçineler", "Dental Resins"),
    tLocalized("Yıkama &amp; Kürleme", "Washing &amp; Curing"),
    tLocalized("Masaüstü Tarayıcılar", "Desktop Scanners"),
    tLocalized("Zirkon Bloklar", "Zirconia Blocks"),
    tLocalized("Dental Fırınlar", "Dental Furnaces"),
  ];
  const enTitles = [
    "3D Printers",
    "Dental Resins",
    "Wash &amp; Cure",
    "Desktop Scanners",
    "Zirconia Blocks",
    "Dental Furnaces",
  ];
  const hrefs = [
    "/3d-yazicilar",
    "/dental-3d-yazici-recineleri",
    "/yikama-kurleme-cihazlari",
    "/masasustu-tarayicilar",
    "/zirkon-bloklar",
    "/dental-firinlar",
  ];
  const showIcons = raw(props, "showIcons") !== false;
  const cards = trTitles
    .map((titleTr, index) => {
      const number = index + 1;
      if (raw(props, `showEcosystemItem${number}`) === false) return "";

      const titleEn = enTitles[index];
      const icon = showIcons
        ? `<span class="tmr-eco-icon"><img src="${escapeAttr(imageSource(raw(props, `ecosystemItem${number}IconImageUrl`), icons[index]))}" alt="" aria-hidden="true"></span>`
        : "";
      return `<a class="tmr-eco-card tmr-eco-card-${number}" href="${escapeAttr(localizedHref(field(props, `ecosystemItem${number}Href`, hrefs[index])))}">${icon}<span>${localizedField(props, `ecosystemItem${number}Title`, titleTr, titleEn)}</span></a>`;
    })
    .join("");
  return `<div class="tmr-eco tmr-eco-list">${cards}</div>`;
}

function trustedLogos(props: ThreeMashSectionRenderProps) {
  const defaults = [trustLogo1, trustLogo2, "", trustLogo4, trustLogo5];
  const logos = defaults
    .map((logo, index) => {
      const number = index + 1;
      if (raw(props, `trustedLogo${number}Enabled`) === false) return "";
      const src = imageSource(raw(props, `trustedLogo${number}ImageUrl`), logo);
      if (!src) return "";
      const alt = localizedField(
        props,
        `trustedLogo${number}ImageAlt`,
        `Güvenen marka ${number}`,
        `Trusted brand ${number}`,
      );
      return `<span class="tmr-trusted-logo"><img src="${escapeAttr(src)}" alt="${escapeAttr(alt)}" loading="lazy"></span>`;
    })
    .join("");

  return logos ? `<div class="tmr-trusted-logos">${logos}</div>` : "";
}

function trustContent(props: ThreeMashSectionRenderProps) {
  const defaults = [
    {
      number: 1,
      image: profileMehmet,
      textTr: "Profesyoneller mutlak başarı için profesyonellere güvenir. Ekipman seçimi, temini, eğitimi ve kullanımında Mash ile iş birliği yapıyoruz.",
      textEn: "Professionals trust professionals for absolute success. We collaborate with Mash in equipment selection, supply, training, and operation.",
      nameTr: "Mehmet İşlek",
      nameEn: "Mehmet İşlek",
      roleTr: "ATTELIA · Kurucu Başhekim — 22 yıldır gülümseme tasarlayan klinik",
      roleEn: "ATTELIA · Chief Physician & Founder — Designing smiles for 22 years",
    },
    {
      number: 2,
      image: profileBerkan,
      textTr: "Yenilikçi ve yaratıcı. Donanım, yazılım ve malzemelerde uzun vadeli, başarılı bir iş birliği.",
      textEn: "Innovative and creative. A long-term, successful collaboration across hardware, software, and materials.",
      nameTr: "Berkan Öztaş",
      nameEn: "Berkan Öztaş",
      roleTr: "DENTEK · Genel Müd. Yard.",
      roleEn: "DENTEK · Deputy General Manager",
    },
    {
      number: 3,
      image: profileGoksel,
      textTr: "Sorunları biz daha yaşamadan çözmüşler. Her zaman aynı kalitede üretim — mükemmel sonuçlar.",
      textEn: "They solved problems before we even encountered them. Consistent production quality every single time — excellent results.",
      nameTr: "Göksel Pişkin",
      nameEn: "Göksel Pişkin",
      roleTr: "MIKRO LAB · Kurucu Ortak",
      roleEn: "MIKRO LAB · Co-Founder",
    },
    {
      number: 4,
      image: "",
      textTr: "Yeni müşteri yorumunuzu buraya ekleyin.",
      textEn: "Add the new customer testimonial here.",
      nameTr: "Yeni müşteri",
      nameEn: "New customer",
      roleTr: "Unvan veya kurum",
      roleEn: "Role or organization",
    },
    {
      number: 5,
      image: "",
      textTr: "Yeni müşteri yorumunuzu buraya ekleyin.",
      textEn: "Add another customer testimonial here.",
      nameTr: "Yeni müşteri",
      nameEn: "New customer",
      roleTr: "Unvan veya kurum",
      roleEn: "Role or organization",
    },
  ];

  const cards = defaults
    .filter(({ number }) =>
      number <= 3
        ? raw(props, `showTestimonial${number}`) !== false
        : raw(props, `showTestimonial${number}`) === true,
    )
    .map((item, index) => {
      const { number } = item;
      const image = imageSource(
        raw(props, `testimonial${number}ImageUrl`),
        item.image,
      );
      const alt = localizedField(
        props,
        `testimonial${number}ImageAlt`,
        number <= 3 ? item.nameTr : "Yeni müşteri profil fotoğrafı",
        number <= 3 ? item.nameEn : "New customer profile photo",
      );
      const avatar = image
        ? `<img class="tmr-avatar" src="${escapeAttr(image)}" alt="${escapeAttr(alt)}" loading="lazy">`
        : '<span class="tmr-avatar" aria-hidden="true"></span>';
      const featured = index === 0 ? " tmr-featured" : "";

      return `<article class="tmr-testimonial${featured}"><div class="tmr-quote" aria-hidden="true">“</div><p>${localizedField(props, `testimonial${number}Text`, item.textTr, item.textEn)}</p><div class="tmr-who">${avatar}<div><b>${localizedField(props, `testimonial${number}Name`, item.nameTr, item.nameEn)}</b><small>${localizedField(props, `testimonial${number}Role`, item.roleTr, item.roleEn)}</small></div></div></article>`;
    })
    .join("");
  const testimonialMarkup = cards ? `<div class="tmr-testimonials">${cards}</div>` : "";
  const label = raw(props, "showTrustedLabel") === false
    ? ""
    : `<span class="tmr-trusted-label"><span class="tmr-trusted-label-text">${localizedField(props, "trustedLabel", "Güvenenler", "Trusted by")}</span><img src="${escapeAttr(imageSource(raw(props, "trustedLabelHoverImageUrl"), trustLogo3))}" alt="" aria-hidden="true"></span>`;
  const logos = raw(props, "showTrustedLogos") === false
    ? ""
    : trustedLogos(props);
  const trusted = label || logos
    ? `<div class="tmr-trusted">${label}${logos}</div>`
    : "";

  return `${testimonialMarkup}${trusted}`;
}

function faqContent(props: ThreeMashSectionRenderProps) {
  const defaults = [
    {
      number: 1,
      questionTr: "Dental 3D baskıda ölçüsel hassasiyet neden bu kadar önemli?",
      questionEn: "Why is dimensional accuracy so critical in dental 3D printing?",
      answerTr: "Çünkü bir restorasyonun ilk seferde oturması doğrudan ölçüsel hassasiyete bağlıdır. Ulusal ölçekli klinik verilerde kron tekrarlarının en sık sebepleri <b>proksimal uyumsuzluk, marjinal hatalar ve estetik başarısızlıktır</b> — üçü de birer hassasiyet problemidir. 3mash ekosistemi <b>±20 µm</b> boyutsal hassasiyeti, tek seferlik değil <b>her baskıda</b> tekrar edilebilir şekilde sağlar; bu da tekrar oranını ve gizli maliyeti düşürür.",
      answerEn: "Because whether a restoration seats on the first try directly depends on dimensional accuracy. In national clinical data, the most common reasons for crown remakes are <b>proximal misfit, marginal errors, and esthetic failure</b> — all accuracy problems. The 3mash ecosystem provides <b>±20 µm</b> dimensional accuracy repeatable <b>on every print</b>, which lowers remake rates and hidden costs.",
    },
    {
      number: 2,
      questionTr: "Bir kron tekrarının (remake) maliyeti gerçekte ne kadar?",
      questionEn: "How much does a crown remake actually cost?",
      answerTr: "Tahminî olarak <b>~500 dolar</b> — ve bu tutarın büyük kısmı lab ücreti değil, <b>koltuk süresidir</b> (yeniden prep, ölçü ve yapıştırma randevusu). Klinik işletme gideri saatte ~$375 modellenir; tek bir tekrar bunun çoğunu tüketir. Kendi kalemlerinizle hesaplamak için <a href=\"/pages/hesaplama\">maliyet detay sayfamıza</a> bakabilirsiniz.",
      answerEn: "Estimated at <b>~$500</b> — and the majority is not lab fees, but <b>chairside time</b> (re-prep, impression, and seating appointment). Clinical overhead is modeled at ~$375/hr; a single remake consumes most of it. To calculate with your own numbers, visit our <a href=\"/pages/hesaplama\">cost calculation page</a>.",
    },
    {
      number: 3,
      questionTr: "3D baskıda kürleme (post-curing) neden kritik?",
      questionEn: "Why is post-curing so critical in 3D printing?",
      answerTr: "Çünkü baskı, cihazdan çıktığında henüz bitmemiştir. Yetersiz kürleme (undercure) <b>kırılganlık</b>, fazla kürleme (overcure) ise <b>deformasyon</b> yaratır — yazıcıda kazandığınız hassasiyeti kürlemede kaybedebilirsiniz. 3mash'in akıllı kürleme cihazı parametreleri otomatik yönetir ve bu riski kullanıcı hatasından arındırır.",
      answerEn: "Because a print is not finished when it comes out of the machine. Undercure causes <b>brittleness</b>, while overcure causes <b>deformation</b> — you can lose the accuracy gained in the printer during curing. 3mash smart curing units manage parameters automatically to eliminate this risk.",
    },
    {
      number: 4,
      questionTr: "3mash yalnızca cihaz mı satıyor?",
      questionEn: "Does 3mash only sell equipment?",
      answerTr: "Hayır. 3mash entegre bir <b>üretim ekosistemi</b> sunar: yazıcı, reçine ve kürlemeyi birlikte kalibre eder; danışmanlık, Mash Academy eğitimleri ve <b>diş teknisyeni + mühendislerden</b> oluşan satış sonrası teknik destekle tüm süreçte yanınızda olur.",
      answerEn: "No. 3mash offers an integrated <b>production ecosystem</b>: calibrating printer, resin, and curing together, accompanied by consulting, Mash Academy training, and after-sales technical support from <b>dental technicians + engineers</b>.",
    },
    {
      number: 5,
      questionTr: "Elimdeki başka marka yazıcıyla çalışır mısınız?",
      questionEn: "Can you work with my existing third-party printer?",
      answerTr: "Evet. Hem reçine hem yazıcı tarafında güçlü bir teknik birikime sahip olduğumuz için çözümlerimiz <b>marka bağımsızdır</b>; mevcut cihazınızın parametrelerini optimize ederek onu da aynı sonuca getirebiliriz.",
      answerEn: "Yes. With our deep technical expertise across resins and printers, our solutions are <b>brand-independent</b>; we can optimize parameters for your existing equipment to achieve the same result.",
    },
    {
      number: 6,
      questionTr: "Yeni bir sık sorulan soru ekleyin.",
      questionEn: "Add a new frequently asked question.",
      answerTr: "Bu sorunun yanıtını buraya ekleyin.",
      answerEn: "Add the answer to this question here.",
    },
    {
      number: 7,
      questionTr: "Başka bir sık sorulan soru ekleyin.",
      questionEn: "Add another frequently asked question.",
      answerTr: "Bu sorunun yanıtını buraya ekleyin.",
      answerEn: "Add the answer to this question here.",
    },
    {
      number: 8,
      questionTr: "Bir diğer sık sorulan soru ekleyin.",
      questionEn: "Add one more frequently asked question.",
      answerTr: "Bu sorunun yanıtını buraya ekleyin.",
      answerEn: "Add the answer to this question here.",
    },
  ];
  const visibleFaqs = defaults.filter(({ number }) =>
    number <= 5
      ? raw(props, `showFaq${number}`) !== false
      : raw(props, `showFaq${number}`) === true,
  );
  const questions = visibleFaqs
    .map((item, index) => {
      const open = index === 0 && raw(props, "openFirstFaq") !== false
        ? " open"
        : "";
      const question = localizedField(
        props,
        `faq${item.number}Question`,
        item.questionTr,
        item.questionEn,
      );
      const answer = localizedField(
        props,
        `faq${item.number}AnswerHtml`,
        item.answerTr,
        item.answerEn,
      );
      return `<details${open}><summary>${question}<span aria-hidden=\"true\">+</span></summary><div>${answer}</div></details>`;
    })
    .join("");

  return questions ? `<div class=\"tmr-faq\">${questions}</div>` : "";
}

export function renderSolutionHtml(props: ThreeMashSectionRenderProps) {
  const localizedProps = {
    ...props,
    indexText: localizedValue(
      props,
      "indexText",
      "Çözüm · Üretim Ekosistemi",
      "Solution · Production Ecosystem",
    ),
    titleText: localizedValue(
      props,
      "titleText",
      "Hassasiyet cihazdan çıkmaz;",
      "Precision doesn't come from the device;",
    ),
    titleEmphasis: localizedValue(
      props,
      "titleEmphasis",
      "uyumdan çıkar.",
      "it comes from compatibility.",
    ),
    sideHtml: localizedValue(
      props,
      "sideHtml",
      "Kuronun oturması üç şeyin senkronuna bağlı: <b>yazıcı, reçine, kürleme.</b> Biz üçünü birlikte kalibre edip saha birikimiyle teslim ediyoruz — elinizdeki başka marka cihaza bile.",
      "A crown seating depends on three things in sync: <b>printer, resin, curing.</b> We calibrate all three together and deliver with field-proven knowledge — even for your existing third-party device.",
    ),
  };

  return indexedSection(localizedProps, {
    anchor: "cozum",
    className: "tmr-section-tight tmr-solution",
    indexNumber: "03",
    indexText: "Çözüm · Üretim Ekosistemi",
    titleText: "Hassasiyet cihazdan çıkmaz;",
    titleEmphasis: "uyumdan çıkar.",
    sideHtml: "Kuronun oturması üç şeyin senkronuna bağlı: <b>yazıcı, reçine, kürleme.</b> Biz üçünü birlikte kalibre edip saha birikimiyle teslim ediyoruz — elinizdeki başka marka cihaza bile.",
    contentHtml: solutionContent(props),
  });
}

export function renderCuringHtml(props: ThreeMashSectionRenderProps) {
  return `<section id="${escapeAttr(value(props.sectionAnchorId, "kurleme"))}" class="tmr-section tmr-dark tmr-curing">
  <div class="tmr-wrap">
    <div class="tmr-index"><span class="tmr-index-number">${value(props.indexNumber, "04")}</span><span class="tmr-index-text">${localizedField(props, "indexText", "Kritik Son Adım", "Critical Final Step")}</span><span class="tmr-index-line"></span></div>
    <div class="tmr-head"><h2>${curingTitleHtml(props)}</h2><div class="tmr-side">${localizedField(props, "sideHtml", "Baskı, cihazdan çıktığında bitmemiştir. Yanlış kürlenen iş, <b>doğru basılmış olsa bile</b> başarısız olur. İşte üç sebep:", "The print is not finished when it leaves the device. A poorly cured job, <b>even if correctly printed</b>, will fail. Here are three reasons:")}</div></div>
    ${curingContent(props)}
  </div>
</section>`;
}

export function renderEcosystemHtml(props: ThreeMashSectionRenderProps) {
  const localizedProps = {
    ...props,
    indexText: localizedValue(props, "indexText", "Uçtan Uca", "End to End"),
    titleText: localizedValue(
      props,
      "titleText",
      "Dijital akışın her parçası,",
      "Every part of the digital workflow,",
    ),
    titleEmphasis: localizedValue(
      props,
      "titleEmphasis",
      "tek çatı altında.",
      "under one roof.",
    ),
    sideHtml: localizedValue(
      props,
      "sideHtml",
      "Cihaz satıp gitmiyoruz: doğru ürün için <b>danışmanlık</b>, sürdürülebilirlik için <b>Academy eğitimleri</b>, satış sonrasında teknisyen + mühendis <b>teknik destek.</b>",
      "We don't just sell devices: <b>consulting</b> for the right product, <b>Academy training</b> for sustainability, technician + engineer <b>technical support</b> after the sale.",
    ),
  };
  return indexedSection(localizedProps, {
    anchor: "ekosistem",
    className: "tmr-ecosystem",
    indexNumber: "05",
    indexText: localizedProps.indexText,
    titleText: localizedProps.titleText,
    titleEmphasis: localizedProps.titleEmphasis,
    sideHtml: localizedProps.sideHtml,
    contentHtml: ecosystemContent(props),
  });
}

export function renderTrustHtml(props: ThreeMashSectionRenderProps) {
  const localizedProps = {
    ...props,
    indexText: localizedValue(props, "indexText", "Referanslar", "References"),
    titleText: localizedValue(
      props,
      "titleText",
      "Türkiye'nin en büyük lab'ları neden",
      "Why do Turkey's largest labs",
    ),
    titleEmphasis: localizedValue(
      props,
      "titleEmphasis",
      "bizimle üretiyor?",
      "produce with us?",
    ),
    sideHtml: localizedValue(
      props,
      "sideHtml",
      "Kısa cevap hep aynı: tutarlılık. <b>580+</b> dental laboratuvar ve klinik bu sistemle üretiyor, çünkü sonuç <b>her seferinde</b> aynı çıkıyor.",
      "The short answer is always the same: consistency. <b>580+</b> dental labs and clinics produce with this system because the result is the same <b>every single time.</b>",
    ),
  };

  return indexedSection(localizedProps, {
    anchor: "guven",
    className: "tmr-section-tight tmr-trust-section",
    indexNumber: "06",
    indexText: localizedProps.indexText,
    titleText: localizedProps.titleText,
    titleEmphasis: localizedProps.titleEmphasis,
    sideHtml: localizedProps.sideHtml,
    contentHtml: trustContent(props),
  });
}

export function renderFaqHtml(props: ThreeMashSectionRenderProps) {
  const localizedProps = {
    ...props,
    indexText: localizedValue(
      props,
      "indexText",
      "Sık Sorulanlar",
      "Frequently Asked Questions",
    ),
    titleText: localizedValue(
      props,
      "titleText",
      "Kısa, net cevaplar.",
      "Short, clear answers.",
    ),
    sideHtml: localizedValue(
      props,
      "sideHtml",
      "En kritik kararları hızlı vermeniz için, klinik ve laboratuvarlardan gelen soruları net cevaplarla topladık.",
      "To help you make critical decisions quickly, we've compiled the most common questions from clinics and labs with clear answers.",
    ),
  };

  return indexedSection(localizedProps, {
    anchor: "sss",
    className: "tmr-section-tight tmr-faq-section",
    indexNumber: "07",
    indexText: localizedProps.indexText,
    titleText: localizedProps.titleText,
    sideHtml: localizedProps.sideHtml,
    contentHtml: faqContent(props),
  });
}

export function renderRoiHtml(props: ThreeMashSectionRenderProps) {
  const en = isEnglishLocale();
  const localizedKey = (key: string) => en ? `${key}En` : key;
  const eyebrow = field(props, localizedKey("eyebrowText"), "YATIRIMIN GERİ DÖNÜŞÜ", "RETURN ON INVESTMENT");
  const roiValue = field(props, localizedKey("valueText"), "&lt; 6 ay", "&lt; 6 months");
  const desc = field(props, localizedKey("descriptionHtml"),
    "3mash ekosistemine geçen bir klinik, yatırımını <b>6 aydan kısa sürede</b> geri kazanma potansiyeline sahip. Sonrasında bu verimlilik her yıl sürer: <b>yılda $72–162K'ya varan tasarruf potansiyeli.</b>",
    "A clinic switching to the 3mash ecosystem has the potential to recoup its investment in <b>under 6 months.</b> After that, the efficiency continues every year: <b>savings potential of $72–162K per year.</b>");
  const ctaText = field(props, localizedKey("ctaText"), "Kliniğiniz için hesaplayalım →", "Calculate for your clinic →");
  const metric = props.showReturnMetric !== false
    ? `<div class="tmr-roi-num"><span>${eyebrow}</span><b>${roiValue}</b></div>`
    : "";
  const description = props.showDescription !== false ? `<p>${desc}</p>` : "";
  const cta = props.showCta !== false
    ? `<a class="tmr-btn" href="${escapeAttr(localizedHref(value(props.ctaHref, "/")))}">${ctaText}</a>`
    : "";
  return `<div id="${escapeAttr(field(props, "sectionAnchorId", "yatirim"))}" class="tmr-roi"><div class="tmr-wrap">${metric}${description}${cta}</div></div>`;
}

export function renderFinalHtml(props: ThreeMashSectionRenderProps) {
  const academyHref = normalizedInternalRouteHref(
    value(props.secondaryButtonHref, academyPageHref),
  );
  const titleText = localizedField(
    props,
    "titleText",
    "Bu görünmez kaybı",
    "Let's reduce this invisible loss",
  );
  const titleEmphasis = localizedField(
    props,
    "titleEmphasis",
    "birlikte azaltalım.",
    "together.",
  );
  const descriptionHtml = props.showDescription === false
    ? ""
    : `<p>${localizedField(
      props,
      "descriptionHtml",
      "Mevcut iş akışınızı birlikte inceleyelim; kaybın nerede oluştuğunu birlikte görelim ve size uygun ekosistemi kuralım — <b class='tmr-final-white'>elinizdeki cihazlarla bile.</b>",
      "Let's review your current workflow together; we'll identify where the loss occurs and set up the right ecosystem for you — <b class='tmr-final-white'>even with your existing equipment.</b>",
    )}</p>`;
  const primaryText = localizedField(
    props,
    "primaryButtonText",
    "Uzmana danış — ücretsiz",
    "Talk to an expert — free",
  );
  const secondaryText = localizedField(
    props,
    "secondaryButtonText",
    "Mash Academy'yi keşfet",
    "Explore Mash Academy",
  );
  const primaryHref = localizedHref(
    localizedValue(
      props,
      "primaryButtonHref",
      consultationWhatsappHref,
      "https://wa.me/905314326577?text=Hello%2C%20I%20would%20like%20a%20free%20consultation",
    ),
  );
  const primaryButton = props.showPrimaryButton !== false
    ? `<a class="tmr-btn tmr-btn-lime" href="${escapeAttr(primaryHref)}">${primaryText}</a>`
    : "";
  const secondaryButton = props.showSecondaryButton !== false
    ? `<a class="tmr-btn tmr-btn-invert" href="${escapeAttr(localizedHref(academyHref))}">${secondaryText}</a>`
    : "";
  const actions = primaryButton || secondaryButton
    ? `<div>${primaryButton}${secondaryButton}</div>`
    : "";

  return `<section id="${escapeAttr(field(props, "sectionAnchorId", "iletisim-cta"))}" class="tmr-final"><div class="tmr-wrap"><h2>${heading(titleText, titleEmphasis)}</h2>${descriptionHtml}${actions}</div></section>`;
}

function socialIcon(name: string) {
  const icons: Record<string, string> = {
    instagram: `<rect x="4" y="4" width="16" height="16" rx="5"></rect><circle cx="12" cy="12" r="3.5"></circle><circle cx="16.5" cy="7.5" r="0.8"></circle>`,
    linkedin: `<path d="M6.5 10v8"></path><path d="M6.5 6.5v.1"></path><path d="M10.5 18v-8"></path><path d="M10.5 13.5c0-2.1 1.2-3.5 3.1-3.5s3 1.3 3 3.7V18"></path>`,
    youtube: `<path d="M4.5 8.5c.2-1.4 1-2.2 2.4-2.4C8.2 6 10.1 6 12 6s3.8 0 5.1.1c1.4.2 2.2 1 2.4 2.4.1.9.2 2.1.2 3.5s-.1 2.6-.2 3.5c-.2 1.4-1 2.2-2.4 2.4-1.3.1-3.2.1-5.1.1s-3.8 0-5.1-.1c-1.4-.2-2.2-1-2.4-2.4-.1-.9-.2-2.1-.2-3.5s.1-2.6.2-3.5z"></path><path d="m10.5 9.5 4 2.5-4 2.5z"></path>`,
    facebook: `<path d="M14.5 8H13c-1.1 0-2 .9-2 2v2H8.8v3H11v5h3v-5h2.2l.5-3H14v-1.5c0-.3.2-.5.5-.5h2V8z"></path>`,
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name] || ""}</svg>`;
}

function socialHref(
  props: ThreeMashSectionRenderProps,
  key: string,
  fallback = "",
) {
  const source = raw(props, key);
  const candidate =
    typeof source === "string" && source.trim() ? source.trim() : fallback;
  try {
    const url = new URL(candidate);
    return url.protocol === "https:" && !url.username && !url.password
      ? url.href
      : "";
  } catch {
    return "";
  }
}

function socialLabel(
  props: ThreeMashSectionRenderProps,
  key: string,
  fallback: string,
) {
  const source = raw(props, key);
  return typeof source === "string" && source.trim()
    ? inlineHtml(source.trim())
    : fallback;
}

function footerSocialLinks(props: ThreeMashSectionRenderProps) {
  if (raw(props, "showSocialIcons") === false) return "";

  const links = [
    [
      "facebook",
      "facebookHref",
      "facebookLabel",
      "https://www.facebook.com/3mashsocial/",
      tLocalized("Facebook", "Facebook"),
    ],
    [
      "instagram",
      "instagramHref",
      "instagramLabel",
      "https://instagram.com/3mashsocial",
      tLocalized("Instagram", "Instagram"),
    ],
    [
      "youtube",
      "youtubeHref",
      "youtubeLabel",
      "https://www.youtube.com/@3mashsocial",
      tLocalized("YouTube", "YouTube"),
    ],
    [
      "linkedin",
      "linkedinHref",
      "linkedinLabel",
      "https://www.linkedin.com/company/3mash",
      tLocalized("LinkedIn", "LinkedIn"),
    ],
  ]
    .map(([icon, hrefKey, labelKey, fallbackHref, fallbackLabel]) => {
      const href = socialHref(props, hrefKey, fallbackHref);
      const label = escapeAttr(socialLabel(props, labelKey, fallbackLabel));
      const customImage = imageSource(raw(props, `${icon}IconImage`), "");
      const iconMarkup = customImage
        ? `<img class="tmr-footer-social-image" src="${escapeAttr(customImage)}" alt="" aria-hidden="true" loading="lazy" decoding="async">`
        : socialIcon(icon);
      if (!href)
        return `<span class="tmr-footer-social-icon" aria-label="${label}" role="img">${iconMarkup}</span>`;
      return `<a href="${escapeAttr(href)}" aria-label="${label}" target="_blank" rel="noopener noreferrer">${iconMarkup}</a>`;
    })
    .join("");

  return links ? `<div class="tmr-footer-social">${links}</div>` : "";
}

function footerPaymentBadges(props: ThreeMashSectionRenderProps) {
  const paymentMethodsLabel = localizedField(
    props,
    "paymentMethodsLabel",
    "Ödeme yöntemleri",
    "Payment methods",
  );
  const visaLabel = field(props, "visaBadgeLabel", "VISA");
  const maestroLabel = field(props, "maestroBadgeLabel", "Maestro");
  const mastercardLabel = field(props, "mastercardBadgeLabel", "Mastercard");
  const badge = (
    className: string,
    label: string,
    imageKey: string,
    fallbackMarkup: string,
  ) => {
    const image = imageSource(raw(props, imageKey), "");
    const visual = image
      ? `<img class="tmr-payment-badge-image" src="${escapeAttr(image)}" alt="" aria-hidden="true" loading="lazy" decoding="async">`
      : fallbackMarkup;
    return `<span class="tmr-payment-badge ${className}" aria-label="${escapeAttr(label)}" role="img">${visual}</span>`;
  };
  return `<div class="tmr-footer-payments" aria-label="${escapeAttr(paymentMethodsLabel)}">${badge("tmr-payment-visa", visaLabel, "visaBadgeImage", visaLabel)}${badge("tmr-payment-maestro", maestroLabel, "maestroBadgeImage", "<span></span><span></span>")}${badge("tmr-payment-mastercard", mastercardLabel, "mastercardBadgeImage", "<span></span><span></span>")}</div>`;
}

function footerCopyrightText(props: ThreeMashSectionRenderProps) {
  return localizedField(
    props,
    "copyrightText",
    "© 2026 3MASH Teknoloji A.Ş. Tüm hakları saklıdır.",
    "© 2026 3MASH Technology Inc. All rights reserved.",
  );
}

function normalizeFooterMapsLinks(markup: string) {
  return markup.replace(
    /<a\b([^>]*)href=(["'])#\2([^>]*)>([\s\S]*?)<\/a>/g,
    (match, before, quote, after, label) =>
      isFooterMapsLabel(label)
        ? `<a${before}href=${quote}${footerMapsHref}${quote}${after} target="_blank" rel="noopener noreferrer">${label}</a>`
        : match,
  );
}

function footerLinkKey(href: string) {
  return href.trim().replace(/\/+$/, "") || "/";
}

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href);
}

function externalLinkAttrs(href: string) {
  return isExternalHref(href)
    ? ' target="_blank" rel="noopener noreferrer"'
    : "";
}

function isFooterMapsLabel(label: unknown) {
  const normalized = plainText(label).toLocaleLowerCase("tr-TR");
  return normalized === tLocalized(
    "antalya teknokent, konyaaltı",
    "antalya teknokent, konyaaltı",
  ) || /antalya teknokent|pınarbaşı|hürriyet cad|konyaaltı/.test(normalized);
}

function footerHrefForLabel(label: unknown, href: string) {
  if (href.trim() && href.trim() !== "#") return href;

  const normalizedLabel = plainText(label).toLocaleLowerCase("tr-TR");
  const labelRoutes: Record<string, string> = {
    "mash academy": "/pages/mash-academy",
    "mash academy'yi keşfet": "/pages/mash-academy",
    "mash academy yi kesfet": "/pages/mash-academy",
    hakkımızda: "/pages/about-us",
    hakkimizda: "/pages/about-us",
    "about us": "/pages/about-us",
    kvkk: "/pages/gizlilik-politikasi-ve-kvkk",
    "gizlilik politikası ve kvkk": "/pages/gizlilik-politikasi-ve-kvkk",
    "gizlilik politikası ve kvkk aydınlatma metni": "/pages/gizlilik-politikasi-ve-kvkk",
    "iade & garanti": "/pages/iade-ve-garanti",
    "iade ve garanti": "/pages/iade-ve-garanti",
    "iade ve garanti koşulları": "/pages/iade-ve-garanti",
    "iade ve garanti kosullari": "/pages/iade-ve-garanti",
    "iade ve garanti politikası": "/pages/iade-ve-garanti",
    "mesafeli satış": "/pages/mesafeli-satis-sozlesmesi",
    "mesafeli satis": "/pages/mesafeli-satis-sozlesmesi",
    "mesafeli satış sözleşmesi": "/pages/mesafeli-satis-sozlesmesi",
    "mesafeli satis sozlesmesi": "/pages/mesafeli-satis-sozlesmesi",
    "üyelik sözleşmesi": "/pages/uyelik-sozlesmesi",
    "uyelik sozlesmesi": "/pages/uyelik-sozlesmesi",
    "ticari elektronik ileti": "/pages/ticari-elektronik-ileti-onayi",
    "ticari elektronik ileti onayı": "/pages/ticari-elektronik-ileti-onayi",
    "ticari elektronik ileti onayi": "/pages/ticari-elektronik-ileti-onayi",
    "çerez politikası": "/pages/gizlilik-politikasi-ve-kvkk",
    "privacy & kvkk": "/pages/gizlilik-politikasi-ve-kvkk",
    "privacy and kvkk": "/pages/gizlilik-politikasi-ve-kvkk",
    "privacy policy": "/pages/gizlilik-politikasi-ve-kvkk",
    "return & warranty": "/pages/iade-ve-garanti",
    "return and warranty": "/pages/iade-ve-garanti",
    "return & warranty policy": "/pages/iade-ve-garanti",
    "distance selling": "/pages/mesafeli-satis-sozlesmesi",
    "distance selling agreement": "/pages/mesafeli-satis-sozlesmesi",
    "distance sales": "/pages/mesafeli-satis-sozlesmesi",
    "distance sales agreement": "/pages/mesafeli-satis-sozlesmesi",
    "cookie settings": "#",
    "cookie preferences": "#",
    "cerez tercihleri": "#",
    "çerez tercihleri": "#",
    "çerezler": "#",
    "cerezler": "#",
    cookies: "#",
    "sıkça sorulan sorular": "/pages/sss",
    "sikca sorulan sorular": "/pages/sss",
    sss: "/pages/sss",
    faq: "/pages/sss",
  };

  if (labelRoutes[normalizedLabel]) return localizedHref(labelRoutes[normalizedLabel]);
  if (normalizedLabel === "info@3mash.com") return "mailto:info@3mash.com";
  return isFooterMapsLabel(label) ? footerMapsHref : href;
}

function footerConfiguredHref(
  label: unknown,
  configuredHref: string,
  fallbackHref = "",
) {
  const candidate = configuredHref.trim() || fallbackHref;
  if (!candidate) return footerHrefForLabel(label, "");
  const safeHref = internalSiteHref(candidate);
  return safeHref ? footerHrefForLabel(label, safeHref) : "";
}

function internalSiteHref(href: string) {
  const trimmed = href.trim();
  if (!trimmed) return "";
  if (/^(mailto:|tel:|#)/i.test(trimmed)) {
    return safeNavigationHref(trimmed, "");
  }
  if (trimmed.startsWith("//")) return "";

  try {
    const url = new URL(trimmed);
    if (url.hostname === "3mash.com" || url.hostname === "www.3mash.com") {
      return localizedHref(
        normalizedInternalRouteHref(
          `${url.pathname}${url.search}${url.hash}` || "/",
        ),
      );
    }
    return url.protocol === "https:" && !url.username && !url.password
      ? url.href
      : "";
  } catch {
    // Relative route, keep as-is.
  }

  const safeHref = safeNavigationHref(trimmed, "");
  return safeHref ? localizedHref(normalizedInternalRouteHref(safeHref)) : "";
}

function isCookieSettingsHref(href: string, label: unknown) {
  if (href !== "#") return false;
  const normalized = plainText(label).toLocaleLowerCase("tr-TR");
  return /(çerez|cerez|cookie)/.test(normalized);
}

function footerLegalLinks(props: ThreeMashSectionRenderProps) {
  const defaults: Array<[string, string, string]> = [
    ["KVKK", "Privacy & KVKK", "/pages/gizlilik-politikasi-ve-kvkk"],
    ["Çerez Tercihleri", "Cookie Settings", "#"],
    ["İade & Garanti", "Return & Warranty", "/pages/iade-ve-garanti"],
    ["Mesafeli Satış", "Distance Selling", "/pages/mesafeli-satis-sozlesmesi"],
    ["Üyelik Sözleşmesi", "Membership Agreement", "/pages/uyelik-sozlesmesi"],
  ];
  const links = defaults.flatMap(([fallbackTr, fallbackEn, fallbackHref], index) => {
    const number = index + 1;
    const visibility = raw(props, `showLegalLink${number}`);
    if (
      (number === 5 && visibility !== true) ||
      (number < 5 && visibility === false)
    ) {
      return [];
    }
    const label = localizedField(
      props,
      `legalLink${number}Text`,
      fallbackTr,
      fallbackEn,
    );
    const hrefValue = raw(props, `legalLink${number}Href`);
    const href = footerConfiguredHref(
      label,
      typeof hrefValue === "string" ? hrefValue : "",
      fallbackHref,
    );
    if (!plainText(label) || !href) return [];
    const cookieClass = isCookieSettingsHref(href, label)
      ? ' class="tm-open-cookie-settings"'
      : "";
    return [
      `<a href="${escapeAttr(href)}"${cookieClass}>${label}</a>`,
    ];
  });
  return links.join("<span>·</span>");
}

export function renderFooterHtml(props: ThreeMashSectionRenderProps) {
  const en = isEnglishLocale();
  const title = (key: string, fallbackTr: string, fallbackEn: string) =>
    localizedField(props, key, fallbackTr, fallbackEn);
  const navLinkList = (
    list: IkasNavigationLinkList | undefined,
    columnTitle: string,
  ) => {
    const seen = new Set<string>();
    const links = (list?.links || [])
      .map((link) => {
        const label = link?.label || "";
        const href = footerConfiguredHref(
          label,
          linkHref(link, ""),
        );
        return { label, href, openInNewTab: link?.openInNewTab };
      })
      .filter((link) => {
        if (!link.label || !link.href) return false;
        const key = footerLinkKey(link.href);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    if (!links.length) return "";
    return `<p class="tmr-footer-col-title">${columnTitle}</p>${links
      .map((link) => {
        const cookieClass = isCookieSettingsHref(link.href, link.label)
          ? ' class="tm-open-cookie-settings"'
          : "";
        const targetAttrs = link.openInNewTab
          ? ' target="_blank" rel="noopener noreferrer"'
          : externalLinkAttrs(link.href);
        return `<a href="${escapeAttr(link.href)}"${cookieClass}${targetAttrs}>${escapeHtml(link.label)}</a>`;
      })
      .join("")}`;
  };
  const categoryLinkList = (
    categories: IkasCategoryList | undefined,
    columnTitle: string,
  ) => {
    const limit = numberInRange(raw(props, "footerCategoryLimit"), 6, 1, 24);
    const seen = new Set<string>();
    const links = (categories?.data || [])
      .filter((category): category is IkasCategory =>
        Boolean(category && !category.deleted && category.name),
      )
      .filter((category) => !isLegacyThemeCategoryName(category.name))
      .flatMap((category) => {
        const href = internalSiteHref(getIkasCategoryHref(category));
        if (!href) return [];
        const key = footerLinkKey(href);
        if (seen.has(key)) return [];
        seen.add(key);
        return [{ category, href }];
      })
      .slice(0, limit);
    if (!links.length) return "";
    return `<p class="tmr-footer-col-title">${columnTitle}</p>${links
      .map(
        ({ category, href }) =>
          `<a href="${escapeAttr(href)}">${escapeHtml(category.name)}</a>`,
      )
      .join("")}`;
  };
  const manualLinkList = (
    prefix: "product" | "company" | "contact",
    columnTitle: string,
    defaults: Array<[string, string, string]>,
  ) => {
    const seen = new Set<string>();
    const links = defaults.flatMap(([fallbackTr, fallbackEn, fallbackHref], index) => {
      const number = index + 1;
      const visibility = raw(
        props,
        `show${prefix[0].toUpperCase()}${prefix.slice(1)}Link${number}`,
      );
      const isNewSlot = prefix === "contact" && number === 3;
      if (
        (isNewSlot && visibility !== true) ||
        (!isNewSlot && visibility === false)
      ) {
        return [];
      }
      const label = localizedField(
        props,
        `${prefix}Link${number}Text`,
        fallbackTr,
        fallbackEn,
      );
      const hrefValue = raw(props, `${prefix}Link${number}Href`);
      const href = footerConfiguredHref(
        label,
        typeof hrefValue === "string" ? hrefValue : "",
        fallbackHref,
      );
      if (!plainText(label) || !href) return [];
      const key = footerLinkKey(href);
      if (seen.has(key)) return [];
      seen.add(key);
      const cookieClass = isCookieSettingsHref(href, label)
        ? ' class="tm-open-cookie-settings"'
        : "";
      return [
        `<a href="${escapeAttr(href)}"${cookieClass}${externalLinkAttrs(href)}>${label}</a>`,
      ];
    });
    return links.length
      ? `<p class="tmr-footer-col-title">${columnTitle}</p>${links.join("")}`
      : "";
  };

  const productTitle = title("productColumnTitle", "Ürünler", "Products");
  const companyTitle = title("companyColumnTitle", "Şirket", "COMPANY");
  const contactTitle = title("contactColumnTitle", "İletişim", "CONTACT");
  const productDefaults: Array<[string, string, string]> = [
    ["3D Yazıcılar", "3D Printers", "/3d-yazicilar"],
    ["Dental Reçineler", "Dental Resins", "/dental-3d-yazici-recineleri"],
    ["Yıkama & Kürleme", "Wash & Cure", "/yikama-kurleme-cihazlari"],
    ["Masaüstü Tarayıcılar", "Desktop Scanners", "/masasustu-tarayicilar"],
    ["Zirkon Bloklar", "Zirconia Blocks", "/zirkon-bloklar"],
    ["Dental Fırınlar", "Dental Furnaces", "/dental-firinlar"],
  ];
  const companyDefaults: Array<[string, string, string]> = [
    ["Hakkımızda", "About Us", "/pages/about-us"],
    ["Mash Academy", "Mash Academy", academyPageHref],
    ["Blog", "Blog", "/blog"],
    ["SSS", "FAQ", "/pages/sss"],
  ];
  const contactDefaults: Array<[string, string, string]> = [
    ["info@3mash.com", "info@3mash.com", "mailto:info@3mash.com"],
    [
      "Antalya Teknokent, Konyaaltı",
      "Antalya Teknokent, Konyaaltı",
      footerMapsHref,
    ],
    ["Telefonla İletişim", "Call us", "tel:+905314326577"],
  ];
  const manualProducts = manualLinkList(
    "product",
    productTitle,
    productDefaults,
  );
  const selectedProductFooterLinks = en
    ? props.productFooterLinksEn
    : props.productFooterLinks;
  const products =
    categoryLinkList(props.productCategoryList, productTitle) ||
    navLinkList(selectedProductFooterLinks, productTitle) ||
    manualProducts;
  const selectedCompanyFooterLinks = en
    ? props.companyFooterLinksEn
    : props.companyFooterLinks;
  const company =
    navLinkList(selectedCompanyFooterLinks, companyTitle) ||
    manualLinkList("company", companyTitle, companyDefaults);
  const selectedContactFooterLinks = en
    ? props.contactFooterLinksEn
    : props.contactFooterLinks;
  const contactLinks =
    navLinkList(selectedContactFooterLinks, contactTitle) ||
    manualLinkList("contact", contactTitle, contactDefaults);
  const socialLinks = footerSocialLinks(props);
  const paymentBadges =
    props.showPaymentBadges === false ? "" : footerPaymentBadges(props);
  const contactContent =
    contactLinks ||
    (socialLinks || paymentBadges
      ? `<p class="tmr-footer-col-title">${contactTitle}</p>`
      : "");
  const contact = `${contactContent}${socialLinks}${paymentBadges}`;
  const fallbackDescTr =
    "Dental klinik ve laboratuvarlar için entegre 3D baskı ekosistemi: yazıcı, reçine, kürleme çözümleri ve üretim uzmanlığı bir arada.";
  const fallbackDescEn =
    "Integrated 3D printing ecosystem for dental clinics and laboratories: printers, resins, curing solutions, and manufacturing expertise together.";
  const descriptionText =
    props.showBrand === false || props.showDescription === false
      ? ""
      : localizedField(props, "descriptionText", fallbackDescTr, fallbackDescEn);
  const logoSvg = sanitizeSvgMarkup(svgMarkup(props.logoSvg));
  const selectedLogoImage = props.logoImageUrl
    ? getDefaultSrc(props.logoImageUrl)
    : "";
  const logoVisual = logoSvg
    ? `<span class="tmr-footer-logo-svg">${logoSvg}</span>`
    : `<img src="${escapeAttr(selectedLogoImage || threeMashFullLogoImage)}" alt="${escapeAttr(field(props, "logoImageAlt", "3mash"))}">`;
  const logoHrefValue =
    typeof props.logoHref === "string" && props.logoHref.trim()
      ? props.logoHref
      : "/";
  const logoHref = footerConfiguredHref("", logoHrefValue);
  const logoText = escapeAttr(plainText(field(props, "logoText", "3mash")));
  const logoLink = logoHref
    ? `<a class="tmr-footer-logo" href="${escapeAttr(logoHref)}" aria-label="${logoText}">${logoVisual}</a>`
    : `<span class="tmr-footer-logo" role="img" aria-label="${logoText}">${logoVisual}</span>`;
  const logo = props.showBrand === false
    ? ""
    : `<div>${logoLink}${descriptionText ? `<p>${descriptionText}</p>` : ""}</div>`;
  const columns = [
    logo,
    props.showProductColumn === false ? "" : `<div class="tmr-footer-link-col">${products}</div>`,
    props.showCompanyColumn === false ? "" : `<div class="tmr-footer-link-col">${company}</div>`,
    props.showContactColumn === false ? "" : `<div class="tmr-footer-link-col">${contact}</div>`,
  ].filter(Boolean);
  const copyright = props.showLegalInfo === false
    ? ""
    : footerCopyrightText(props);
  const legalLinks = props.showLegalInfo === false
    ? ""
    : footerLegalLinks(props);
  const legalInfo = copyright || legalLinks
    ? `<div class="tmr-base">${copyright ? `<span>${copyright}</span>` : ""}${legalLinks ? `<div class="tmr-base-meta">${legalLinks}</div>` : ""}</div>`
    : "";
  return `<footer class="tmr-footer"><div class="tmr-wrap"><div class="tmr-footer-cols tmr-footer-cols--${columns.length}">${columns.join("")}</div>${legalInfo}</div></footer>`;
}

export function ThreeMashStaticSection({
  props,
  fallback,
  styleOverrides,
}: {
  props: ThreeMashSectionRenderProps;
  fallback?: string;
  styleOverrides?: Record<string, string | number>;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  const baseHtml =
    props.sectionHtml && props.sectionHtml.trim()
      ? props.sectionHtml
      : fallback || "";
  const cleanedBaseHtml = stripInlineTypographyStyles(baseHtml);
  const renderedHtml = normalizeFooterMapsLinks(
    styleTextChunks(cleanedBaseHtml, props),
  );
  const rootClassName = `three-mash-remaining${/\btmr-(trust|faq)-section\b/.test(renderedHtml) ? " tmr-section-separator-visible" : ""}`;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const productSliderCleanups: Array<() => void> = [];

    const setupProductSliderLoop = (
      slider: HTMLElement,
      track: HTMLElement,
    ) => {
      const rawOriginalCount = Number(slider.dataset.tmrProductsOriginalCount);
      const trackCards = Array.from(track.children).filter(
        (child): child is HTMLElement =>
          child instanceof HTMLElement &&
          child.classList.contains("tmr-product"),
      );
      const originalCount =
        Number.isFinite(rawOriginalCount) && rawOriginalCount > 0
          ? rawOriginalCount
          : trackCards.length % 3 === 0
            ? trackCards.length / 3
            : trackCards.length;
      if (originalCount <= 1) return;

      const measureLoopDistance = () => {
        const firstCloneCard = trackCards[originalCount];
        if (!firstCloneCard) return;

        const distance = firstCloneCard.offsetLeft;
        if (distance <= 0) return;

        track.style.setProperty(
          "--tmr-products-loop-distance",
          `${distance}px`,
        );
        track.style.setProperty(
          "--tmr-products-loop-distance-negative",
          `${distance * -1}px`,
        );
        slider.classList.add("tmr-products-loop-ready");
      };
      const scheduleMeasure = () =>
        window.requestAnimationFrame(measureLoopDistance);

      scheduleMeasure();
      track.querySelectorAll<HTMLImageElement>("img").forEach((image) => {
        if (image.complete) return;
        image.addEventListener("load", scheduleMeasure, { once: true });
        productSliderCleanups.push(() =>
          image.removeEventListener("load", scheduleMeasure),
        );
      });

      if (typeof ResizeObserver !== "undefined") {
        const observer = new ResizeObserver(scheduleMeasure);
        observer.observe(slider);
        observer.observe(track);
        productSliderCleanups.push(() => observer.disconnect());
        return;
      }

      window.addEventListener("resize", scheduleMeasure);
      productSliderCleanups.push(() =>
        window.removeEventListener("resize", scheduleMeasure),
      );
    };

    const normalizeProductSliders = () => {
      root
        .querySelectorAll<HTMLElement>(".tmr-products-live")
        .forEach((slider) => {
          slider.classList.add("tmr-products-slider");
          const existingTrack = Array.from(slider.children).find(
            (child): child is HTMLElement =>
              child instanceof HTMLElement &&
              child.classList.contains("tmr-products-track"),
          );
          if (existingTrack) {
            setupProductSliderLoop(slider, existingTrack);
            return;
          }

          const cards = Array.from(slider.children).filter(
            (child): child is HTMLElement =>
              child instanceof HTMLElement &&
              child.classList.contains("tmr-product"),
          );
          if (!cards.length) return;

          slider.dataset.tmrProductsOriginalCount = String(cards.length);
          const firstDuplicateSet = cards.map(
            (card) => card.cloneNode(true) as HTMLElement,
          );
          const secondDuplicateSet = cards.map(
            (card) => card.cloneNode(true) as HTMLElement,
          );
          const track = document.createElement("div");
          track.className = "tmr-products-track";
          cards.forEach((card) => track.appendChild(card));
          [firstDuplicateSet, secondDuplicateSet].forEach((duplicateSet) => {
            duplicateSet.forEach((clone) => {
              clone.setAttribute("aria-hidden", "true");
              track.appendChild(clone);
            });
          });
          slider.replaceChildren(track);
          setupProductSliderLoop(slider, track);
        });
    };

    const syncFooterCategoryLists = () => {
      root
        .querySelectorAll<HTMLElement>("[data-tmr-footer-sync]")
        .forEach((column) => {
          const sourceName = column.dataset.tmrFooterSync;
          if (!sourceName) return;

          const sourceLinks = Array.from(
            document.querySelectorAll<HTMLAnchorElement>(
              `a[data-tmr-category-source="${sourceName}"]`,
            ),
          );
          if (!sourceLinks.length) return;

          const title = column.querySelector("h6, .tmr-footer-col-title")?.cloneNode(true);
          const seen = new Set<string>();
          const links = sourceLinks
            .map((link) => {
              const label =
                link.querySelector("b")?.textContent?.trim() ||
                link.textContent?.trim() ||
                "";
              const linkHref = link.getAttribute("href")?.trim() || "";
              const key = footerLinkKey(linkHref);
              if (!label || !linkHref || seen.has(key)) return null;
              seen.add(key);

              const item = document.createElement("a");
              item.setAttribute("href", linkHref);
              item.textContent = label;
              return item;
            })
            .filter((item): item is HTMLAnchorElement => Boolean(item));

          if (!links.length) return;
          const signature = links
            .map(
              (item) =>
                `${item.textContent || ""}|${item.getAttribute("href") || ""}`,
            )
            .join("||");
          if (column.dataset.tmrFooterSyncSignature === signature) return;
          column.dataset.tmrFooterSyncSignature = signature;

          column.replaceChildren(...(title ? [title] : []), ...links);
        });
    };

    normalizeProductSliders();
    syncFooterCategoryLists();
    const syncObserver =
      typeof MutationObserver === "undefined"
        ? null
        : new MutationObserver(syncFooterCategoryLists);
    syncObserver?.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["href", "data-tmr-category-source"],
    });

    return () => {
      syncObserver?.disconnect();
      productSliderCleanups.forEach((cleanup) => cleanup());
    };
  }, [props.sectionHtml, fallback]);

  return (
    <div
      ref={rootRef}
      className={rootClassName}
      style={{ ...threeMashThemeStyle(props), ...styleOverrides }}
    >
      <div dangerouslySetInnerHTML={html(renderedHtml)} />
    </div>
  );
}
