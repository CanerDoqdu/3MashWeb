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
const bundledTrustedLogos = `<div class="tmr-trusted-logos"><span class="tmr-trusted-logo"><img src="${trustLogo1}" alt="Güvenen marka 1"></span><span class="tmr-trusted-logo"><img src="${trustLogo2}" alt="Güvenen marka 2"></span><span class="tmr-trusted-logo"><img src="${trustLogo4}" alt="Güvenen marka 4"></span><span class="tmr-trusted-logo"><img src="${trustLogo5}" alt="Güvenen marka 5"></span></div>`;
const threeMashFullLogoImage =
  "https://cdn.myikas.com/images/theme-images/4a6af8e2-cb7c-4cc8-ba17-13656d4b8670/image_3840.webp";
const footerMapsHref =
  "https://www.google.com/maps/search/?api=1&query=Antalya%20Teknokent%2C%20Konyaalt%C4%B1";
const academyPageHref = "/pages/mash-academy";
const consultationWhatsappHref =
  "https://wa.me/905314326577?text=Merhaba%2C%20%C3%BCcretsiz%20dan%C4%B1%C5%9Fmanl%C4%B1k%20almak%20istiyorum";

const solutionSetupHtml = `<div class="tmr-products-setup">Ürünler kısa süre içinde burada listelenecek.</div>`;

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
    ${solutionSetupHtml}
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

export const defaultRoiHtml = `<div class="tmr-roi"><div class="tmr-wrap"><div class="tmr-roi-num"><span>YATIRIMIN GERİ DÖNÜŞÜ</span><b>&lt; 6 ay</b></div><p>3mash ekosistemine geçen bir klinik, yatırımını <b>6 aydan kısa sürede</b> geri kazanma potansiyeline sahip. Sonrasında bu verimlilik her yıl sürer: <b>yılda $72–162K'ya varan tasarruf potansiyeli.</b></p><a class="tmr-btn" href="/">Kliniğiniz için hesaplayalım →</a></div></div>`;

export const defaultEcosystemHtml = `<section id="ekosistem" class="tmr-section"><div class="tmr-wrap"><div class="tmr-index"><span class="tmr-index-number">05</span><span class="tmr-index-text">Uçtan Uca</span><span class="tmr-index-line"></span></div><div class="tmr-head"><h2>Dijital akışın her parçası, <span>tek çatı altında.</span></h2><div class="tmr-side">Cihaz satıp gitmiyoruz: doğru ürün için <b>danışmanlık</b>, sürdürülebilirlik için <b>Academy eğitimleri</b>, satış sonrasında teknisyen + mühendis <b>teknik destek.</b></div></div><div class="tmr-eco"><a href="/3d-yazicilar"><span class="tmr-eco-icon"><img src="${ecoPrinterIcon}" alt="" aria-hidden="true"></span><span>3D Yazıcılar</span></a><a href="/dental-3d-yazici-recineleri"><span class="tmr-eco-icon"><img src="${ecoResinIcon}" alt="" aria-hidden="true"></span><span>Dental Reçineler</span></a><a href="/yikama-kurleme-cihazlari"><span class="tmr-eco-icon"><img src="${ecoScannerIcon}" alt="" aria-hidden="true"></span><span>Yıkama &amp; Kürleme</span></a><a href="/masasustu-tarayicilar"><span class="tmr-eco-icon"><img src="${ecoCuringIcon}" alt="" aria-hidden="true"></span><span>Masaüstü Tarayıcılar</span></a><a href="/zirkon-bloklar"><span class="tmr-eco-icon"><img src="${ecoBlocksIcon}" alt="" aria-hidden="true"></span><span>Zirkon Bloklar</span></a><a href="/dental-firinlar"><span class="tmr-eco-icon"><img src="${ecoOvenIcon}" alt="" aria-hidden="true"></span><span>Dental Fırınlar</span></a></div></div></section>`;

export const defaultTrustHtml = `<section id="guven" class="tmr-section tmr-section-tight"><div class="tmr-wrap"><div class="tmr-index"><span class="tmr-index-number">06</span><span class="tmr-index-text">Referanslar</span><span class="tmr-index-line"></span></div><div class="tmr-head"><h2>Türkiye'nin en büyük lab'ları neden <span>bizimle üretiyor?</span></h2><div class="tmr-side">Kısa cevap hep aynı: tutarlılık. <b>580+</b> dental laboratuvar ve klinik bu sistemle üretiyor, çünkü sonuç <b>her seferinde</b> aynı çıkıyor.</div></div><div class="tmr-testimonials"><article class="tmr-testimonial tmr-featured"><div class="tmr-quote">“</div><p>Profesyoneller mutlak başarı için profesyonellere güvenir. Ekipman seçimi, temini, eğitimi ve kullanımında Mash ile iş birliği yapıyoruz.</p><div class="tmr-who"><img class="tmr-avatar" src="${profileMehmet}" alt="Mehmet İşlek"><div><b>Mehmet İşlek</b><small>ATTELIA · Kurucu Başhekim — 22 yıldır gülümseme tasarlayan klinik</small></div></div></article><article class="tmr-testimonial"><div class="tmr-quote">“</div><p>Yenilikçi ve yaratıcı. Donanım, yazılım ve malzemelerde uzun vadeli, başarılı bir iş birliği.</p><div class="tmr-who"><img class="tmr-avatar" src="${profileBerkan}" alt="Berkan Öztaş"><div><b>Berkan Öztaş</b><small>DENTEK · Genel Müd. Yard.</small></div></div></article><article class="tmr-testimonial"><div class="tmr-quote">“</div><p>Sorunları biz daha yaşamadan çözmüşler. Her zaman aynı kalitede üretim — mükemmel sonuçlar.</p><div class="tmr-who"><img class="tmr-avatar" src="${profileGoksel}" alt="Göksel Pişkin"><div><b>Göksel Pişkin</b><small>MIKRO LAB · Kurucu Ortak</small></div></div></article></div><div class="tmr-trusted">${trustedLabelMarkup}${bundledTrustedLogos}</div></div></section>`;

export const defaultFaqHtml = `<section id="sss" class="tmr-section tmr-section-tight"><div class="tmr-wrap"><div class="tmr-index"><span class="tmr-index-number">07</span><span class="tmr-index-text">Sık Sorulanlar</span><span class="tmr-index-line"></span></div><div class="tmr-head"><h2>Kısa, net cevaplar.</h2><div class="tmr-side">En kritik kararları hızlı vermeniz için, klinik ve laboratuvarlardan gelen soruları net cevaplarla topladık.</div></div><div class="tmr-faq"><details open><summary>Dental 3D baskıda ölçüsel hassasiyet neden bu kadar önemli?<span>+</span></summary><div>Çünkü bir restorasyonun ilk seferde oturması doğrudan ölçüsel hassasiyete bağlıdır. Ulusal ölçekli klinik verilerde kron tekrarlarının en sık sebepleri <b>proksimal uyumsuzluk, marjinal hatalar ve estetik başarısızlıktır</b> — üçü de birer hassasiyet problemidir. 3mash ekosistemi <b>±20 µm</b> boyutsal hassasiyeti, tek seferlik değil <b>her baskıda</b> tekrar edilebilir şekilde sağlar; bu da tekrar oranını ve gizli maliyeti düşürür.</div></details><details><summary>Bir kron tekrarının (remake) maliyeti gerçekte ne kadar?<span>+</span></summary><div>Tahminî olarak <b>~500 dolar</b> — ve bu tutarın büyük kısmı lab ücreti değil, <b>koltuk süresidir</b> (yeniden prep, ölçü ve yapıştırma randevusu). Klinik işletme gideri saatte ~$375 modellenir; tek bir tekrar bunun çoğunu tüketir. Kendi kalemlerinizle hesaplamak için <a href="#">maliyet detay sayfamıza</a> bakabilirsiniz.</div></details><details><summary>3D baskıda kürleme (post-curing) neden kritik?<span>+</span></summary><div>Çünkü baskı, cihazdan çıktığında henüz bitmemiştir. Yetersiz kürleme (undercure) <b>kırılganlık</b>, fazla kürleme (overcure) ise <b>deformasyon</b> yaratır — yazıcıda kazandığınız hassasiyeti kürlemede kaybedebilirsiniz. 3mash'in akıllı kürleme cihazı parametreleri otomatik yönetir ve bu riski kullanıcı hatasından arındırır.</div></details><details><summary>3mash yalnızca cihaz mı satıyor?<span>+</span></summary><div>Hayır. 3mash entegre bir <b>üretim ekosistemi</b> sunar: yazıcı, reçine ve kürlemeyi birlikte kalibre eder; danışmanlık, Mash Academy eğitimleri ve <b>diş teknisyeni + mühendislerden</b> oluşan satış sonrası teknik destekle tüm süreçte yanınızda olur.</div></details><details><summary>Elimdeki başka marka yazıcıyla çalışır mısınız?<span>+</span></summary><div>Evet. Hem reçine hem yazıcı tarafında güçlü bir teknik birikime sahip olduğumuz için çözümlerimiz <b>marka bağımsızdır</b>; mevcut cihazınızın parametrelerini optimize ederek onu da aynı sonuca getirebiliriz.</div></details></div></div></section>`;

export const defaultFinalHtml = `<section id="iletisim-cta" class="tmr-final"><div class="tmr-wrap"><h2>Bu görünmez kaybı <span>birlikte azaltalım.</span></h2><p>Mevcut iş akışınızı birlikte inceleyelim; kaybın nerede oluştuğunu birlikte görelim ve size uygun ekosistemi kuralım — <b class="tmr-final-white">elinizdeki cihazlarla bile.</b></p><div><a class="tmr-btn tmr-btn-lime" href="${consultationWhatsappHref}">Uzmana danış — ücretsiz</a><a class="tmr-btn tmr-btn-invert" href="${academyPageHref}">Mash Academy'yi keşfet</a></div></div></section>`;

const defaultFooterLegalLinks: Array<[string, string]> = [
  ["KVKK", "/pages/gizlilik-politikasi-ve-kvkk"],
  ["İade &amp; Garanti", "/pages/iade-ve-garanti"],
  ["Mesafeli Satış", "/pages/mesafeli-satis-sozlesmesi"],
];
const footerDescriptionText =
  "Dental klinik ve laboratuvarlar için entegre 3D baskı ekosistemi: yazıcı, reçine, kürleme çözümleri ve üretim uzmanlığı bir arada.";
const defaultFooterProductLinks: Array<[string, string]> = [
  ["3D Yazıcılar", "/3d-yazicilar"],
  ["Dental Reçineler", "/dental-3d-yazici-recineleri"],
  ["Yıkama &amp; Kürleme", "/yikama-kurleme-cihazlari"],
  ["Masaüstü Tarayıcılar", "/masasustu-tarayicilar"],
  ["Zirkon Bloklar", "/zirkon-bloklar"],
  ["Dental Fırınlar", "/dental-firinlar"],
];
const defaultFooterCompanyLinks: Array<[string, string]> = [
  ["Hakkımızda", "/pages/about-us"],
  ["Mash Academy", academyPageHref],
  ["Blog", "/blog"],
  ["Sıkça Sorulan Sorular", "/pages/sss"],
];
const defaultFooterContactLinks: Array<[string, string]> = [
  ["info@3mash.com", "mailto:info@3mash.com"],
  ["Antalya Teknokent, Konyaaltı", footerMapsHref],
];
const footerLegalLinksHtml = defaultFooterLegalLinks
  .map(([label, href]) => `<a href="${href}">${label}</a>`)
  .join("<span>·</span>");
const defaultFooterProductsHtml = defaultFooterProductLinks
  .map(([label, href]) => `<a href="${href}">${label}</a>`)
  .join("");
const defaultFooterCompanyHtml = defaultFooterCompanyLinks
  .map(([label, href]) => `<a href="${href}">${label}</a>`)
  .join("");

export const defaultFooterHtml = `<footer class="tmr-footer"><div class="tmr-wrap"><div class="tmr-footer-cols"><div><a class="tmr-footer-logo" href="/"><img src="${threeMashFullLogoImage}" alt="3mash"></a><p>${footerDescriptionText}</p></div><div class="tmr-footer-link-col"><p class="tmr-footer-col-title">Ürünler</p>${defaultFooterProductsHtml}</div><div class="tmr-footer-link-col"><p class="tmr-footer-col-title">ŞİRKET</p>${defaultFooterCompanyHtml}</div><div class="tmr-footer-link-col"><p class="tmr-footer-col-title">İLETİŞİM</p><a href="mailto:info@3mash.com">info@3mash.com</a><a href="${footerMapsHref}" target="_blank" rel="noopener noreferrer">Antalya Teknokent, Konyaaltı</a><div class="tmr-footer-social"><a href="https://www.facebook.com/3mashsocial/" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 8H13c-1.1 0-2 .9-2 2v2H8.8v3H11v5h3v-5h2.2l.5-3H14v-1.5c0-.3.2-.5.5-.5h2V8z"></path></svg></a><a href="https://instagram.com/3mashsocial" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="5"></rect><circle cx="12" cy="12" r="3.5"></circle><circle cx="16.5" cy="7.5" r="0.8"></circle></svg></a><a href="https://www.youtube.com/@3mashsocial" aria-label="YouTube" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 8.5c.2-1.4 1-2.2 2.4-2.4C8.2 6 10.1 6 12 6s3.8 0 5.1.1c1.4.2 2.2 1 2.4 2.4.1.9.2 2.1.2 3.5s-.1 2.6-.2 3.5c-.2 1.4-1 2.2-2.4 2.4-1.3.1-3.2.1-5.1.1s-3.8 0-5.1-.1c-1.4-.2-2.2-1-2.4-2.4-.1-.9-.2-2.1-.2-3.5s.1-2.6.2-3.5z"></path><path d="m10.5 9.5 4 2.5-4 2.5z"></path></svg></a><a href="https://www.linkedin.com/company/3mash" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 10v8"></path><path d="M6.5 6.5v.1"></path><path d="M10.5 18v-8"></path><path d="M10.5 13.5c0-2.1 1.2-3.5 3.1-3.5s3 1.3 3 3.7V18"></path></svg></a></div>${footerPaymentBadges()}</div></div><div class="tmr-base"><span>© 2026 3MASH Teknoloji A.Ş. Tüm hakları saklıdır.</span><div class="tmr-base-meta">${footerLegalLinksHtml}</div></div></div></footer>`;

export interface ThreeMashSectionRenderProps {
  productList?: IkasProductList;
  productCategoryList?: IkasCategoryList;
  productFooterLinks?: IkasNavigationLinkList;
  footerCategoryLimit?: number;
  companyFooterLinks?: IkasNavigationLinkList;
  contactFooterLinks?: IkasNavigationLinkList;
  curingProduct1Product?: IkasProduct | null;
  curingProduct2Product?: IkasProduct | null;
  sectionHtml?: string;
  sectionAnchorId?: string;
  indexNumber?: string;
  indexText?: string;
  titleText?: string;
  titleEmphasis?: string;
  sideHtml?: string;
  contentHtml?: string;
  eyebrowText?: string;
  valueText?: string;
  descriptionHtml?: string;
  ctaText?: string;
  ctaHref?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  logoText?: string;
  descriptionText?: string;
  productsColumnHtml?: string;
  companyColumnHtml?: string;
  contactColumnHtml?: string;
  copyrightText?: string;
  legalLink1Text?: string;
  legalLink1Href?: string;
  legalLink2Text?: string;
  legalLink2Href?: string;
  legalLink3Text?: string;
  legalLink3Href?: string;
  legalLink4Text?: string;
  legalLink4Href?: string;
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
  logoImageUrl?: unknown;
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
  textColor?: string;
  subTextColor?: string;
  mutedTextColor?: string;
  lineColor?: string;
  panelColor?: string;
  darkColor?: string;
  accentColor?: string;
  accentTextColor?: string;
  accentSoftColor?: string;
  dangerColor?: string;
  hoverVideoAutoplayEnabled?: boolean;
  wordStyleEnabled?: boolean;
  styledPhrase?: string;
  styledPhraseColor?: string;
  styledPhraseBold?: boolean;
  styledPhraseItalic?: boolean;
}

function html(value?: string, fallback = "") {
  return { __html: value && value.trim() ? value : fallback };
}

function value(value: unknown, fallback: string) {
  const trimmed = typeof value === "string" ? value.trim() : "";
  return inlineHtml(trimmed || fallback);
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
  return stripInlineTypographyStyles(
    value
      .replace(/<\/p>\s*<p[^>]*>/gi, "<br />")
      .replace(/^<p[^>]*>/i, "")
      .replace(/<\/p>$/i, ""),
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
    product.categories?.[0]?.name || product.brand?.name || "3MASH";
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
    if (link.label === "MASH P1D") return "/pages/mash-p1d";
    if (link.label === "MASH P16L") return "/pages/mash-p16l";
    if (link.label === "CRS Reçineler") return "/pages/crs-recineler";
  }

  return fallback;
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
  return routes[normalized] || current;
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
  return routes[key] || href;
}

function raw(props: object, key: string) {
  return (props as Record<string, unknown>)[key];
}

function field(
  props: ThreeMashSectionRenderProps,
  key: string,
  fallback: string,
) {
  return value(raw(props, key), fallback);
}

function specs(
  props: ThreeMashSectionRenderProps,
  prefix: string,
  count: number,
  defaults: Array<[string, string]>,
) {
  return defaults
    .slice(0, count)
    .map(([label, text], index) => {
      const number = index + 1;
      return `<div><span>${field(props, `${prefix}Spec${number}Label`, label)}</span><b>${field(props, `${prefix}Spec${number}Value`, text)}</b></div>`;
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
): ProductCardDefaults {
  const variant = selectedVariant(product);
  const media = variant ? getProductVariantMainImage(variant) : undefined;
  const image = media?.image ? getDefaultSrc(media.image) : defaults.image;
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

  if (finalPrice) specs.push(["Fiyat", finalPrice]);
  if (sellPrice) specs.push(["Liste", sellPrice]);
  if (specs.length < 2 && categoryName)
    specs.push([product.brand?.name ? "Marka" : "Kategori", categoryName]);

  return {
    ...defaults,
    tag: categoryName,
    image,
    imageAlt: media?.image?.altText || product.name,
    title: product.name,
    descriptionHtml: escapeHtml(description),
    specs: specs.length ? specs : defaults.specs,
    ctaText: "İncele",
    ctaHref: getProductHref(product),
  };
}

function productCard(
  props: ThreeMashSectionRenderProps,
  prefix: string,
  defaults: ProductCardDefaults,
) {
  const selectedProduct = raw(props, `${prefix}Product`);
  if (isIkasProduct(selectedProduct)) {
    const productDefaults = productCardDefaultsFromProduct(
      selectedProduct,
      defaults,
    );
    const tagClass = productDefaults.tagClass
      ? ` ${productDefaults.tagClass}`
      : "";
    const media = `<div class="tmr-product-media tmr-product-media-${escapeAttr(prefix)}"><span class="tmr-tag${tagClass}">${escapeHtml(productDefaults.tag)}</span><img class="tmr-product-img ${productDefaults.imageClass}" src="${escapeAttr(productDefaults.image)}" alt="${escapeAttr(productDefaults.imageAlt)}"></div>`;
    return `<article class="tmr-product">${media}<div class="tmr-product-body"><h3>${escapeHtml(productDefaults.title)}</h3><p>${productDefaults.descriptionHtml}</p><div class="tmr-spec">${productDefaults.specs.map(([label, text]) => `<div><span>${escapeHtml(label)}</span><b>${escapeHtml(text)}</b></div>`).join("")}</div><a class="tmr-go" href="${escapeAttr(productDefaults.ctaHref)}">${escapeHtml(productDefaults.ctaText)} <span>→</span></a></div></article>`;
  }

  const image = imageSource(raw(props, `${prefix}ImageUrl`), defaults.image);
  const alt = field(props, `${prefix}ImageAlt`, defaults.imageAlt);
  const tagClass = defaults.tagClass ? ` ${defaults.tagClass}` : "";
  const media = `<div class="tmr-product-media tmr-product-media-${escapeAttr(prefix)}"><span class="tmr-tag${tagClass}">${field(props, `${prefix}Tag`, defaults.tag)}</span><img class="tmr-product-img ${defaults.imageClass}" src="${escapeAttr(image)}" alt="${escapeAttr(alt)}"></div>`;

  return `<article class="tmr-product">${media}<div class="tmr-product-body"><h3>${field(props, `${prefix}Title`, defaults.title)}</h3><p>${field(props, `${prefix}DescriptionHtml`, defaults.descriptionHtml)}</p><div class="tmr-spec">${specs(props, prefix, defaults.specs.length, defaults.specs)}</div><a class="tmr-go" href="${escapeAttr(linkHref(raw(props, `${prefix}CtaHref`), defaults.ctaHref))}">${field(props, `${prefix}CtaText`, defaults.ctaText)} <span>→</span></a></div></article>`;
}

function solutionP1dCard(props: ThreeMashSectionRenderProps) {
  return productCard(props, "solutionCard1", {
    tag: "PROFESYONEL",
    image: p1dSectionCardImage,
    imageAlt: "MASH P1D",
    imageClass: "tmr-machine-printer",
    title: "MASH P1D",
    descriptionHtml:
      "Malzemeye göre tasarlanmış optik sistemle <b>profesyonel DLP</b> üretim. Yüksek hacimli lab ve kliniklerin motoru.",
    specs: [
      ["Işık kaynağı", "385 nm DLP"],
      ["Hassasiyet", "±20 µm"],
      ["Karakter", "Tekrar edilebilirlik"],
    ],
    ctaText: "İncele",
    ctaHref: "/3d-yazicilar",
  });
}

function solutionSecondCard(props: ThreeMashSectionRenderProps) {
  return productCard(props, "solutionCard2", {
    tag: "GİRİŞ SEGMENTİ",
    image: p16lPrimaryImage,
    imageAlt: "MASH P16L",
    imageClass: "tmr-machine-p16l",
    title: "MASH P16L",
    descriptionHtml:
      "Dijitale yeni geçenler için <b>3mash revizyonlu</b> LCD yazıcı. Aynı parametre desteği, aynı teknik ekip.",
    specs: [
      ["Teknoloji", "LCD · revize"],
      ["Rol", "Ekosisteme giriş"],
      ["Destek", "Kurulum + eğitim"],
    ],
    ctaText: "İncele",
    ctaHref: "/3d-yazicilar",
  });
}

function solutionResinCategoryCard(props: ThreeMashSectionRenderProps) {
  return productCard(props, "solutionCard3", {
    tag: "RESMİ DİSTRİBÜTÖR",
    image: crsModelBottleImage,
    imageAlt: "CRS Reçineler",
    imageClass: "tmr-resin-bottle",
    title: "CRS Reçineler",
    descriptionHtml:
      "<b>CE Class IIa</b> biyouyumlu &amp; model reçineleri; cihazınızın parametreleriyle <b>birlikte kalibre edilmiş</b> teslim edilir.",
    specs: [
      ["Sertifika", "CE Class IIa"],
      ["Uygulama", "Model · geçici · splint · guide"],
      ["Uyum", "Marka bağımsız"],
    ],
    ctaText: "İncele",
    ctaHref: "/dental-3d-yazici-recineleri",
  });
}

function solutionDefaultCards(props: ThreeMashSectionRenderProps) {
  return `<div class="tmr-products">${solutionP1dCard(props)}${solutionSecondCard(props)}${solutionResinCategoryCard(props)}</div>`;
}

export function threeMashThemeStyle(props: ThreeMashSectionRenderProps) {
  return {
    "--tmr-bg": "var(--bg, #FAFAF7)",
    "--tmr-text": "var(--ink, #0E0E0C)",
    "--tmr-sub": "var(--sub, #55554E)",
    "--tmr-muted": "var(--mut, #8F8F86)",
    "--tmr-line": "var(--line, #E6E6E0)",
    "--tmr-line-strong": "var(--line2, #D5D5CD)",
    "--tmr-panel": "#FFFFFF",
    "--tmr-dark": "var(--dark, #0E0E0C)",
    "--tmr-accent": "var(--lime, #C7F136)",
    "--tmr-background-glow-factor": 0,
    "--tmr-accent-text": "var(--lime-ink, #3D4D0E)",
    "--tmr-accent-soft": "var(--lime-soft, #F2F8DC)",
    "--tmr-danger": "var(--red, #E2492F)",
    "--tmr-word-color": "var(--lime, #C7F136)",
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
    "--tmr-curing-background": "var(--dark, #0E0E0C)",
    "--tmr-curing-reason-bg": "#161612",
    "--tmr-curing-product-media-start": "#1D1D17",
    "--tmr-curing-product-media-end": "#14140F",
    "--tmr-curing-reason-radius": `${numberInRange(raw(props, "reasonCardRadius"), 18, 0, 36)}px`,
    "--tmr-curing-product-radius": `${numberInRange(raw(props, "productCardRadius"), 20, 0, 36)}px`,
    "--tmr-curing-image-width": `${numberInRange(raw(props, "productImageWidth"), 226, 48, 380)}px`,
    "--tmr-curing-image-height": `${numberInRange(raw(props, "productImageHeight"), 206, 48, 340)}px`,
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
    "--tmr-roi-bg": "var(--lime, #C7F136)",
    "--tmr-roi-text": "var(--ink, #0E0E0C)",
    "--tmr-roi-sub": "#2C3A09",
    "--tmr-roi-eyebrow": "var(--lime-ink, #3D4D0E)",
    "--tmr-roi-button-bg": "var(--ink, #0E0E0C)",
    "--tmr-roi-button-text": "#FFFFFF",
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
    "--tmr-footer-bg": "var(--tm-theme-dark, #0E0E0C)",
    "--tmr-footer-text": "#FFFFFF",
    "--tmr-footer-muted": "#8B8B80",
    "--tmr-footer-line": "#26261F",
    // Footer instances may retain an old editor value. Match the global header brand mark on every page.
    "--tmr-footer-logo-image-width": `${numberInRange(raw(props, "logoImageWidth"), 116, 116, 118)}px`,
    "--tmr-footer-logo-image-height": `${numberInRange(raw(props, "logoImageHeight"), 24, 24, 25)}px`,
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
    "--tmr-footer-logo-svg-width": `${numberInRange(raw(props, "logoSvgWidth"), 116, 116, 118)}px`,
    "--tmr-footer-logo-svg-height": `${numberInRange(raw(props, "logoSvgHeight"), 24, 24, 25)}px`,
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

const solutionContentHtml = solutionSetupHtml;

const curingContentHtml = `<div class="tmr-why-grid"><article>


<div>SEBEP 01</div><h4>Mekanik dayanım</h4><p>Eksik kürleme (undercure) kırılganlık demek — geçici kron ve köprülerin <b>sık kırılmasının</b> en yaygın görünmez sebebi.</p></article><article><div>SEBEP 02</div><h4>Ölçüsel doğruluk</h4><p>Fazla kürleme (overcure) malzemeyi <b>çeker ve deforme eder</b>. Yazıcıda kazanılan ±20 µm, kürleme ünitesinde kaybedilir.</p></article><article><div>SEBEP 03</div><h4>Biyouyumluluk &amp; renk</h4><p>Doğru dönüşüm derecesi <b>monomer salınımını</b> engeller; renk stabilitesi ve hasta güvenliği sağlar.</p></article></div>
    <div class="tmr-products tmr-products-two"><article class="tmr-product"><div class="tmr-product-media"><span class="tmr-tag tmr-lime-tag">YIKAMA</span><img class="tmr-product-img tmr-machine-phrozen" src="${mashW1eImage}" alt="Mash W1E Ultrasonik Yıkama Cihazı"></div><div class="tmr-product-body"><h3>Mash W1E Ultrasonik Yıkama Cihazı</h3><p>Baskı sonrası parçaların yüzeyindeki reçine kalıntılarını <b>ultrasonik yıkama</b> ile temizler; kürleme öncesi yüzeyi hazırlar.</p><div class="tmr-spec"><div><span>İşlem</span><b>Ultrasonik yıkama</b></div><div><span>Akış</span><b>Baskı sonrası temizlik</b></div></div><a class="tmr-go" href="/mash-w1e-ultrasonik-yikama-cihazi">İncele <span>→</span></a></div></article><article class="tmr-product"><div class="tmr-product-media"><span class="tmr-tag">KÜRLEME</span><img class="tmr-product-img tmr-machine-uw02" src="${mashC1eImage}" alt="Mash C1E UV Kürleme Cihazı"></div><div class="tmr-product-body"><h3>Mash C1E UV Kürleme Cihazı</h3><p>24 LED'li 360° ışık sistemi ve 360-530 nm geniş spektrum desteğiyle dental reçine baskılarda <b>UV post-curing</b> adımını tamamlar.</p><div class="tmr-spec"><div><span>Işık sistemi</span><b>360° / 24 LED</b></div><div><span>Spektrum</span><b>360-530 nm</b></div></div><a class="tmr-go" href="/mash-c1e-uv-kurleme-cihazi">İncele <span>→</span></a></div></article></div>
    <p class="tmr-readmore">Derine inmek isteyenlere, Mash Academy'den: <a href="/blog/dental-3d-baskida-overcure-ve-undercure-nedir-en-dogru-kurleme-icin-kapsamli-rehber">Overcure ve Undercure Nedir?</a> · <a href="/blog/dental-3d-baskida-dogru-dalga-boyu-secimi-385nm-mi-405nm-mi">385nm mi 405nm mi?</a></p>`;

const ecosystemContentHtml = `<div class="tmr-eco"><a href="/3d-yazicilar"><span class="tmr-eco-icon"><img src="${ecoPrinterIcon}" alt="" aria-hidden="true"></span><span>3D Yazıcılar</span></a><a href="/dental-3d-yazici-recineleri"><span class="tmr-eco-icon"><img src="${ecoResinIcon}" alt="" aria-hidden="true"></span><span>Dental Reçineler</span></a><a href="/yikama-kurleme-cihazlari"><span class="tmr-eco-icon"><img src="${ecoScannerIcon}" alt="" aria-hidden="true"></span><span>Yıkama &amp; Kürleme</span></a><a href="/masasustu-tarayicilar"><span class="tmr-eco-icon"><img src="${ecoCuringIcon}" alt="" aria-hidden="true"></span><span>Masaüstü Tarayıcılar</span></a><a href="/zirkon-bloklar"><span class="tmr-eco-icon"><img src="${ecoBlocksIcon}" alt="" aria-hidden="true"></span><span>Zirkon Bloklar</span></a><a href="/dental-firinlar"><span class="tmr-eco-icon"><img src="${ecoOvenIcon}" alt="" aria-hidden="true"></span><span>Dental Fırınlar</span></a></div>`;

const trustContentHtml = `<div class="tmr-testimonials"><article class="tmr-testimonial tmr-featured"><div class="tmr-quote">“</div><p>Profesyoneller mutlak başarı için profesyonellere güvenir. Ekipman seçimi, temini, eğitimi ve kullanımında Mash ile iş birliği yapıyoruz.</p><div class="tmr-who"><img class="tmr-avatar" src="${profileMehmet}" alt="Mehmet İşlek"><div><b>Mehmet İşlek</b><small>ATTELIA · Kurucu Başhekim — 22 yıldır gülümseme tasarlayan klinik</small></div></div></article><article class="tmr-testimonial"><div class="tmr-quote">“</div><p>Yenilikçi ve yaratıcı. Donanım, yazılım ve malzemelerde uzun vadeli, başarılı bir iş birliği.</p><div class="tmr-who"><img class="tmr-avatar" src="${profileBerkan}" alt="Berkan Öztaş"><div><b>Berkan Öztaş</b><small>DENTEK · Genel Müd. Yard.</small></div></div></article><article class="tmr-testimonial"><div class="tmr-quote">“</div><p>Sorunları biz daha yaşamadan çözmüşler. Her zaman aynı kalitede üretim — mükemmel sonuçlar.</p><div class="tmr-who"><img class="tmr-avatar" src="${profileGoksel}" alt="Göksel Pişkin"><div><b>Göksel Pişkin</b><small>MIKRO LAB · Kurucu Ortak</small></div></div></article></div><div class="tmr-trusted">${trustedLabelMarkup}${bundledTrustedLogos}</div>`;

const faqContentHtml = `<div class="tmr-faq"><details open><summary>Dental 3D baskıda ölçüsel hassasiyet neden bu kadar önemli?<span>+</span></summary><div>Çünkü bir restorasyonun ilk seferde oturması doğrudan ölçüsel hassasiyete bağlıdır. Ulusal ölçekli klinik verilerde kron tekrarlarının en sık sebepleri <b>proksimal uyumsuzluk, marjinal hatalar ve estetik başarısızlıktır</b> — üçü de birer hassasiyet problemidir. 3mash ekosistemi <b>±20 µm</b> boyutsal hassasiyeti, tek seferlik değil <b>her baskıda</b> tekrar edilebilir şekilde sağlar; bu da tekrar oranını ve gizli maliyeti düşürür.</div></details><details><summary>Bir kron tekrarının (remake) maliyeti gerçekte ne kadar?<span>+</span></summary><div>Tahminî olarak <b>~500 dolar</b> — ve bu tutarın büyük kısmı lab ücreti değil, <b>koltuk süresidir</b> (yeniden prep, ölçü ve yapıştırma randevusu). Klinik işletme gideri saatte ~$375 modellenir; tek bir tekrar bunun çoğunu tüketir. Kendi kalemlerinizle hesaplamak için <a href="#">maliyet detay sayfamıza</a> bakabilirsiniz.</div></details><details><summary>3D baskıda kürleme (post-curing) neden kritik?<span>+</span></summary><div>Çünkü baskı, cihazdan çıktığında henüz bitmemiştir. Yetersiz kürleme (undercure) <b>kırılganlık</b>, fazla kürleme (overcure) ise <b>deformasyon</b> yaratır — yazıcıda kazandığınız hassasiyeti kürlemede kaybedebilirsiniz. 3mash'in akıllı kürleme cihazı parametreleri otomatik yönetir ve bu riski kullanıcı hatasından arındırır.</div></details><details><summary>3mash yalnızca cihaz mı satıyor?<span>+</span></summary><div>Hayır. 3mash entegre bir <b>üretim ekosistemi</b> sunar: yazıcı, reçine ve kürlemeyi birlikte kalibre eder; danışmanlık, Mash Academy eğitimleri ve <b>diş teknisyeni + mühendislerden</b> oluşan satış sonrası teknik destekle tüm süreçte yanınızda olur.</div></details><details><summary>Elimdeki başka marka yazıcıyla çalışır mısınız?<span>+</span></summary><div>Evet. Hem reçine hem yazıcı tarafında güçlü bir teknik birikime sahip olduğumuz için çözümlerimiz <b>marka bağımsızdır</b>; mevcut cihazınızın parametrelerini optimize ederek onu da aynı sonuca getirebiliriz.</div></details></div>`;

function solutionContent(props: ThreeMashSectionRenderProps) {
  return `<div class="tmr-products" aria-label="${escapeAttr(field(props, "carouselAriaLabel", "Çözüm ürünleri"))}">${solutionP1dCard(props)}${solutionSecondCard(props)}${solutionResinCategoryCard(props)}</div>`;
}

function curingReasons(props: ThreeMashSectionRenderProps) {
  const defaults = [
    [
      "SEBEP 01",
      "Mekanik dayanım",
      "Eksik kürleme (undercure) kırılganlık demek — geçici kron ve köprülerin <b>sık kırılmasının</b> en yaygın görünmez sebebi.",
    ],
    [
      "SEBEP 02",
      "Ölçüsel doğruluk",
      "Fazla kürleme (overcure) malzemeyi <b>çeker ve deforme eder</b>. Yazıcıda kazanılan ±20 µm, kürleme ünitesinde kaybedilir.",
    ],
    [
      "SEBEP 03",
      "Biyouyumluluk &amp; renk",
      "Doğru dönüşüm derecesi <b>monomer salınımını</b> engeller; renk stabilitesi ve hasta güvenliği sağlar.",
    ],
  ];
  return `<div class="tmr-why-grid">${defaults
    .map(([eyebrow, title, description], index) => {
      const number = index + 1;
      return `<article><div>${field(props, `reason${number}Eyebrow`, eyebrow)}</div><h3>${field(props, `reason${number}Title`, title)}</h3><p>${field(props, `reason${number}DescriptionHtml`, description)}</p></article>`;
    })
    .join("")}</div>`;
}

function curingProducts(props: ThreeMashSectionRenderProps) {
  const normalizedProps = withLegacyDefaults(props, {
    curingProduct1Tag: {
      legacy: "YIKAMA · KÜRLEME",
      next: "YIKAMA",
    },
    curingProduct1Title: {
      legacy: "Phrozen Wash & Cure Kit",
      next: "Mash W1E Ultrasonik Yıkama Cihazı",
    },
    curingProduct1DescriptionHtml: {
      legacy:
        "8L yıkama istasyonu ve kuru+kürleme moduyla baskı sonrası süreci <b>temizleme, kurutma ve 405nm UV kürleme</b> olarak tek akışta toplar.",
      next: "Reçine baskı sonrası yüzeyde kalan fazla reçineyi <b>ultrasonik temizleme</b> ile kısa sürede ve hassas biçimde uzaklaştırır; kürleme öncesi temiz yüzey sağlar.",
    },
    curingProduct1ImageAlt: {
      legacy: "Phrozen Wash & Cure Kit",
      next: "Mash W1E Ultrasonik Yıkama Cihazı",
    },
    curingProduct1Spec1Label: {
      legacy: "Yıkama hacmi",
      next: "İşlem",
    },
    curingProduct1Spec1Value: { legacy: "8 L", next: "Ultrasonik temizleme" },
    curingProduct1Spec2Label: {
      legacy: "Kürleme",
      next: "Akış",
    },
    curingProduct1Spec2Value: { legacy: "405 nm UV", next: "Yıkama → kürleme hazırlığı" },
    curingProduct1CtaHref: {
      legacy: "https://uk.phrozen3d.com/products/wash-cure-kit",
      next: "/mash-w1e-ultrasonik-yikama-cihazi",
    },
    curingProduct2Tag: { legacy: "YIKAMA · KÜRLEME", next: "KÜRLEME" },
    curingProduct2Title: {
      legacy: "Creality UW02",
      next: "Mash C1E UV Kürleme Cihazı",
    },
    curingProduct2DescriptionHtml: {
      legacy:
        "Baskı sonrası yıkama ve kürleme adımlarını <b>tek kontrollü akışta</b> toplar. P16L ile tamamlayıcı başlangıç seti.",
      next: "24 LED'li 360° kürleme sistemi ve 360-530 nm geniş spektrum desteğiyle <b>homojen UV post-curing</b> sağlar; mekanik dayanım, boyutsal doğruluk ve yüzey kalitesi hedefini tamamlar.",
    },
    curingProduct2ImageAlt: {
      legacy: "Creality UW02",
      next: "Mash C1E UV Kürleme Cihazı",
    },
    curingProduct2Spec1Label: { legacy: "Görev", next: "Işık" },
    curingProduct2Spec1Value: {
      legacy: "Yıkama + kürleme",
      next: "24 LED / 360°",
    },
    curingProduct2Spec2Label: { legacy: "Uyum", next: "Spektrum" },
    curingProduct2Spec2Value: {
      legacy: "P16L + CRS",
      next: "360-530 nm",
    },
    curingProduct2CtaHref: {
      legacy: "/yikama-kurleme-cihazlari",
      next: "/mash-c1e-uv-kurleme-cihazi",
    },
  });
  const staticCuringProps = {
    ...normalizedProps,
    curingProduct1Product: null,
    curingProduct2Product: null,
  };

  return `<div class="tmr-products tmr-products-two">${productCard(
    staticCuringProps,
    "curingProduct1",
    {
      tag: "YIKAMA",
      tagClass: "tmr-lime-tag",
      image: mashW1eImage,
      imageAlt: "Mash W1E Ultrasonik Yıkama Cihazı",
      imageClass: "tmr-machine-phrozen",
      title: "Mash W1E Ultrasonik Yıkama Cihazı",
      descriptionHtml:
        "Reçine baskı sonrası yüzeyde kalan fazla reçineyi <b>ultrasonik temizleme</b> ile kısa sürede ve hassas biçimde uzaklaştırır; kürleme öncesi temiz yüzey sağlar.",
      specs: [
        ["İşlem", "Ultrasonik temizleme"],
        ["Akış", "Yıkama → kürleme hazırlığı"],
      ],
      ctaText: "İncele",
      ctaHref: "/mash-w1e-ultrasonik-yikama-cihazi",
    },
  )}${productCard(staticCuringProps, "curingProduct2", {
    tag: "KÜRLEME",
    image: mashC1eImage,
    imageAlt: "Mash C1E UV Kürleme Cihazı",
    imageClass: "tmr-machine-uw02",
    title: "Mash C1E UV Kürleme Cihazı",
    descriptionHtml:
      "24 LED'li 360° kürleme sistemi ve 360-530 nm geniş spektrum desteğiyle <b>homojen UV post-curing</b> sağlar; mekanik dayanım, boyutsal doğruluk ve yüzey kalitesi hedefini tamamlar.",
    specs: [
      ["Işık", "24 LED / 360°"],
      ["Spektrum", "360-530 nm"],
    ],
    ctaText: "İncele",
    ctaHref: "/mash-c1e-uv-kurleme-cihazi",
  })}</div>`;
}

function curingContent(props: ThreeMashSectionRenderProps) {
  return `${curingReasons(props)}${curingProducts(props)}<p class="tmr-readmore">${field(props, "readMoreText", "Derine inmek isteyenlere, Mash Academy'den:")} <a href="${escapeAttr(field(props, "readMoreLink1Href", "/blog/dental-3d-baskida-overcure-ve-undercure-nedir-en-dogru-kurleme-icin-kapsamli-rehber"))}">${field(props, "readMoreLink1Text", "Overcure ve Undercure Nedir?")}</a> · <a href="${escapeAttr(field(props, "readMoreLink2Href", "/blog/dental-3d-baskida-dogru-dalga-boyu-secimi-385nm-mi-405nm-mi"))}">${field(props, "readMoreLink2Text", "385nm mi 405nm mi?")}</a></p>`;
}

function curingTitleHtml(props: ThreeMashSectionRenderProps) {
  const titleText = value(props.titleText, "Sadece yazıcı değil. Sonucu");
  const titleEmphasis = value(props.titleEmphasis, "kürleme tamamlar.");

  if (
    titleText === "Sadece yazıcı değil. Sonucu" &&
    titleEmphasis === "kürleme tamamlar."
  ) {
    return `Sadece yazıcı değil. <span class="tmr-curing-keep">Sonucu <span class="tmr-title-em">kürleme</span></span><br>tamamlar.`;
  }

  return heading(titleText, titleEmphasis);
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
  const titles = [
    "3D Yazıcılar",
    "Dental Reçineler",
    "Yıkama &amp; Kürleme",
    "Masaüstü Tarayıcılar",
    "Zirkon Bloklar",
    "Dental Fırınlar",
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
  const cards = titles
    .map((title, index) => {
      const number = index + 1;
      const icon = showIcons
        ? `<span class="tmr-eco-icon"><img src="${escapeAttr(imageSource(raw(props, `ecosystemItem${number}IconImageUrl`), icons[index]))}" alt="" aria-hidden="true"></span>`
        : "";
      return `<a class="tmr-eco-card tmr-eco-card-${number}" href="${escapeAttr(field(props, `ecosystemItem${number}Href`, hrefs[index]))}">${icon}<span>${field(props, `ecosystemItem${number}Title`, title)}</span></a>`;
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
      const alt = field(
        props,
        `trustedLogo${number}ImageAlt`,
        `Güvenen marka ${number}`,
      );
      return `<span class="tmr-trusted-logo"><img src="${escapeAttr(src)}" alt="${escapeAttr(alt)}"></span>`;
    })
    .join("");

  return logos ? `<div class="tmr-trusted-logos">${logos}</div>` : "";
}

function trustContent(props: ThreeMashSectionRenderProps) {
  const defaults = [
    [
      profileMehmet,
      "Mehmet İşlek",
      "Profesyoneller mutlak başarı için profesyonellere güvenir. Ekipman seçimi, temini, eğitimi ve kullanımında Mash ile iş birliği yapıyoruz.",
      "Mehmet İşlek",
      "ATTELIA · Kurucu Başhekim — 22 yıldır gülümseme tasarlayan klinik",
    ],
    [
      profileBerkan,
      "Berkan Öztaş",
      "Yenilikçi ve yaratıcı. Donanım, yazılım ve malzemelerde uzun vadeli, başarılı bir iş birliği.",
      "Berkan Öztaş",
      "DENTEK · Genel Müd. Yard.",
    ],
    [
      profileGoksel,
      "Göksel Pişkin",
      "Sorunları biz daha yaşamadan çözmüşler. Her zaman aynı kalitede üretim — mükemmel sonuçlar.",
      "Göksel Pişkin",
      "MIKRO LAB · Kurucu Ortak",
    ],
  ];
  const cards = defaults
    .map(([image, alt, text, name, role], index) => {
      const number = index + 1;
      const featured = index === 0 ? " tmr-featured" : "";
      return `<article class="tmr-testimonial${featured}"><div class="tmr-quote">“</div><p>${field(props, `testimonial${number}Text`, text)}</p><div class="tmr-who"><img class="tmr-avatar" src="${escapeAttr(imageSource(raw(props, `testimonial${number}ImageUrl`), image))}" alt="${escapeAttr(field(props, `testimonial${number}ImageAlt`, alt))}"><div><b>${field(props, `testimonial${number}Name`, name)}</b><small>${field(props, `testimonial${number}Role`, role)}</small></div></div></article>`;
    })
    .join("");
  const label = field(props, "trustedLabel", "Güvenenler");
  return `<div class="tmr-testimonials">${cards}</div><div class="tmr-trusted"><span class="tmr-trusted-label"><span class="tmr-trusted-label-text">${label}</span><img src="${trustLogo3}" alt="" aria-hidden="true"></span>${trustedLogos(props)}</div>`;
}

function faqContent(props: ThreeMashSectionRenderProps) {
  const defaults = [
    [
      "Dental 3D baskıda ölçüsel hassasiyet neden bu kadar önemli?",
      "Çünkü bir restorasyonun ilk seferde oturması doğrudan ölçüsel hassasiyete bağlıdır. Ulusal ölçekli klinik verilerde kron tekrarlarının en sık sebepleri <b>proksimal uyumsuzluk, marjinal hatalar ve estetik başarısızlıktır</b> — üçü de birer hassasiyet problemidir. 3mash ekosistemi <b>±20 µm</b> boyutsal hassasiyeti, tek seferlik değil <b>her baskıda</b> tekrar edilebilir şekilde sağlar; bu da tekrar oranını ve gizli maliyeti düşürür.",
    ],
    [
      "Bir kron tekrarının (remake) maliyeti gerçekte ne kadar?",
      'Tahminî olarak <b>~500 dolar</b> — ve bu tutarın büyük kısmı lab ücreti değil, <b>koltuk süresidir</b> (yeniden prep, ölçü ve yapıştırma randevusu). Klinik işletme gideri saatte ~$375 modellenir; tek bir tekrar bunun çoğunu tüketir. Kendi kalemlerinizle hesaplamak için <a href="/pages/hesaplama">maliyet detay sayfamıza</a> bakabilirsiniz.',
    ],
    [
      "3D baskıda kürleme (post-curing) neden kritik?",
      "Çünkü baskı, cihazdan çıktığında henüz bitmemiştir. Yetersiz kürleme (undercure) <b>kırılganlık</b>, fazla kürleme (overcure) ise <b>deformasyon</b> yaratır — yazıcıda kazandığınız hassasiyeti kürlemede kaybedebilirsiniz. 3mash'in akıllı kürleme cihazı parametreleri otomatik yönetir ve bu riski kullanıcı hatasından arındırır.",
    ],
    [
      "3mash yalnızca cihaz mı satıyor?",
      "Hayır. 3mash entegre bir <b>üretim ekosistemi</b> sunar: yazıcı, reçine ve kürlemeyi birlikte kalibre eder; danışmanlık, Mash Academy eğitimleri ve <b>diş teknisyeni + mühendislerden</b> oluşan satış sonrası teknik destekle tüm süreçte yanınızda olur.",
    ],
    [
      "Elimdeki başka marka yazıcıyla çalışır mısınız?",
      "Evet. Hem reçine hem yazıcı tarafında güçlü bir teknik birikime sahip olduğumuz için çözümlerimiz <b>marka bağımsızdır</b>; mevcut cihazınızın parametrelerini optimize ederek onu da aynı sonuca getirebiliriz.",
    ],
  ];
  return `<div class="tmr-faq">${defaults
    .map(([question, answer], index) => {
      const number = index + 1;
      const open =
        index === 0 && raw(props, "openFirstFaq") !== false ? " open" : "";
      return `<details${open}><summary>${field(props, `faq${number}Question`, question)}<span>+</span></summary><div>${field(props, `faq${number}AnswerHtml`, answer)}</div></details>`;
    })
    .join("")}</div>`;
}

export function renderSolutionHtml(props: ThreeMashSectionRenderProps) {
  return indexedSection(props, {
    anchor: "cozum",
    className: "tmr-section-tight tmr-solution",
    indexNumber: "03",
    indexText: "Çözüm · Üretim Ekosistemi",
    titleText: "Hassasiyet cihazdan çıkmaz;",
    titleEmphasis: "uyumdan çıkar.",
    sideHtml:
      "Kuronun oturması üç şeyin senkronuna bağlı: <b>yazıcı, reçine, kürleme.</b> Biz üçünü birlikte kalibre edip saha birikimiyle teslim ediyoruz — elinizdeki başka marka cihaza bile.",
    contentHtml: solutionContent(props),
  });
}

export function renderCuringHtml(props: ThreeMashSectionRenderProps) {
  return `<section id="${escapeAttr(value(props.sectionAnchorId, "kurleme"))}" class="tmr-section tmr-dark tmr-curing">
  <div class="tmr-wrap">
    <div class="tmr-index"><span class="tmr-index-number">${value(props.indexNumber, "04")}</span><span class="tmr-index-text">${value(props.indexText, "Kritik Son Adım")}</span><span class="tmr-index-line"></span></div>
    <div class="tmr-head"><h2>${curingTitleHtml(props)}</h2><div class="tmr-side">${value(props.sideHtml, "Baskı, cihazdan çıktığında bitmemiştir. Yanlış kürlenen iş, <b>doğru basılmış olsa bile</b> başarısız olur. İşte üç sebep:")}</div></div>
    ${curingContent(props)}
  </div>
</section>`;
}

export function renderEcosystemHtml(props: ThreeMashSectionRenderProps) {
  return indexedSection(props, {
    anchor: "ekosistem",
    className: "tmr-ecosystem",
    indexNumber: "05",
    indexText: "Uçtan Uca",
    titleText: "Dijital akışın her parçası,",
    titleEmphasis: "tek çatı altında.",
    sideHtml:
      "Cihaz satıp gitmiyoruz: doğru ürün için <b>danışmanlık</b>, sürdürülebilirlik için <b>Academy eğitimleri</b>, satış sonrasında teknisyen + mühendis <b>teknik destek.</b>",
    contentHtml: ecosystemContent(props),
  });
}

export function renderTrustHtml(props: ThreeMashSectionRenderProps) {
  return indexedSection(props, {
    anchor: "guven",
    className: "tmr-section-tight tmr-trust-section",
    indexNumber: "06",
    indexText: "Referanslar",
    titleText: "Türkiye'nin en büyük lab'ları neden",
    titleEmphasis: "bizimle üretiyor?",
    sideHtml:
      "Kısa cevap hep aynı: tutarlılık. <b>580+</b> dental laboratuvar ve klinik bu sistemle üretiyor, çünkü sonuç <b>her seferinde</b> aynı çıkıyor.",
    contentHtml: trustContent(props),
  });
}

export function renderFaqHtml(props: ThreeMashSectionRenderProps) {
  return indexedSection(props, {
    anchor: "sss",
    className: "tmr-section-tight tmr-faq-section",
    indexNumber: "07",
    indexText: "Sık Sorulanlar",
    titleText: "Kısa, net cevaplar.",
    sideHtml:
      "En kritik kararları hızlı vermeniz için, klinik ve laboratuvarlardan gelen soruları net cevaplarla topladık.",
    contentHtml: faqContent(props),
  });
}

export function renderRoiHtml(props: ThreeMashSectionRenderProps) {
  return `<div id="${escapeAttr(field(props, "sectionAnchorId", "yatirim"))}" class="tmr-roi"><div class="tmr-wrap"><div class="tmr-roi-num"><span>${value(props.eyebrowText, "YATIRIMIN GERİ DÖNÜŞÜ")}</span><b>${value(props.valueText, "&lt; 6 ay")}</b></div><p>${value(props.descriptionHtml, "3mash ekosistemine geçen bir klinik, yatırımını <b>6 aydan kısa sürede</b> geri kazanma potansiyeline sahip. Sonrasında bu verimlilik her yıl sürer: <b>yılda $72–162K'ya varan tasarruf potansiyeli.</b>")}</p><a class="tmr-btn" href="${escapeAttr(value(props.ctaHref, "/"))}">${value(props.ctaText, "Kliniğiniz için hesaplayalım →")}</a></div></div>`;
}

export function renderFinalHtml(props: ThreeMashSectionRenderProps) {
  const academyHref = normalizedInternalRouteHref(
    value(props.secondaryButtonHref, academyPageHref),
  );
return `<section id="${escapeAttr(field(props, "sectionAnchorId", "iletisim-cta"))}" class="tmr-final"><div class="tmr-wrap"><h2>${heading(value(props.titleText, "Bu görünmez kaybı"), value(props.titleEmphasis, "birlikte azaltalım."))}</h2><p>${value(props.descriptionHtml, "Mevcut iş akışınızı birlikte inceleyelim; kaybın nerede oluştuğunu birlikte görelim ve size uygun ekosistemi kuralım — <b class='tmr-final-white'>elinizdeki cihazlarla bile.</b>")}</p><div><a class="tmr-btn tmr-btn-lime" href="${escapeAttr(value(props.primaryButtonHref, consultationWhatsappHref))}">${value(props.primaryButtonText, "Uzmana danış — ücretsiz")}</a><a class="tmr-btn tmr-btn-invert" href="${escapeAttr(academyHref)}">${value(props.secondaryButtonText, "Mash Academy'yi keşfet")}</a></div></div></section>`;}

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
  return typeof source === "string" && source.trim() ? source.trim() : fallback;
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
      "Facebook",
    ],
    [
      "instagram",
      "instagramHref",
      "instagramLabel",
      "https://instagram.com/3mashsocial",
      "Instagram",
    ],
    [
      "youtube",
      "youtubeHref",
      "youtubeLabel",
      "https://www.youtube.com/@3mashsocial",
      "YouTube",
    ],
    [
      "linkedin",
      "linkedinHref",
      "linkedinLabel",
      "https://www.linkedin.com/company/3mash",
      "LinkedIn",
    ],
  ]
    .map(([icon, hrefKey, labelKey, fallbackHref, fallbackLabel]) => {
      const href = socialHref(props, hrefKey, fallbackHref);
      const label = escapeAttr(socialLabel(props, labelKey, fallbackLabel));
      if (!href)
        return `<span class="tmr-footer-social-icon" aria-label="${label}" role="img">${socialIcon(icon)}</span>`;
      return `<a href="${escapeAttr(href)}" aria-label="${label}" target="_blank" rel="noopener noreferrer">${socialIcon(icon)}</a>`;
    })
    .join("");

  return links ? `<div class="tmr-footer-social">${links}</div>` : "";
}

function footerPaymentBadges() {
  return `<div class="tmr-footer-payments" aria-label="Ödeme yöntemleri"><span class="tmr-payment-badge tmr-payment-visa" aria-label="Visa" role="img">VISA</span><span class="tmr-payment-badge tmr-payment-maestro" aria-label="Maestro" role="img"><span></span><span></span></span><span class="tmr-payment-badge tmr-payment-mastercard" aria-label="Mastercard" role="img"><span></span><span></span></span></div>`;
}

function footerCopyrightText(props: ThreeMashSectionRenderProps) {
  const fallback = "© 2026 3MASH Teknoloji A.Ş. Tüm hakları saklıdır.";
  const current = value(props.copyrightText, fallback);
  if (/all\s+rights\s+(reserved|preserved)/i.test(current)) return fallback;
  if (
    /3MASH\s+Teknoloji\s+A\.Ş\./i.test(current) &&
    !/Tüm\s+hakları\s+saklıdır/i.test(current)
  ) {
    return current.replace(
      /3MASH\s+Teknoloji\s+A\.Ş\./i,
      "3MASH Teknoloji A.Ş. Tüm hakları saklıdır.",
    );
  }
  return current;
}

function normalizeFooterLegalText(markup: string) {
  return markup
    .replace(
      /All\s+rights\s+(reserved|preserved)\.?/gi,
      "Tüm hakları saklıdır.",
    )
    .replace(
      /(©\s*2026\s*3MASH\s+Teknoloji\s+A\.Ş\.)(?!\s*Tüm\s+hakları\s+saklıdır)/gi,
      "$1 Tüm hakları saklıdır.",
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
  return (
    plainText(label).toLocaleLowerCase("tr-TR") ===
    "antalya teknokent, konyaaltı"
  );
}

function footerHrefForLabel(label: unknown, href: string) {
  const normalizedLabel = plainText(label).toLocaleLowerCase("tr-TR");
  const labelRoutes: Record<string, string> = {
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
    "sıkça sorulan sorular": "/pages/sss",
    "sikca sorulan sorular": "/pages/sss",
    sss: "/pages/sss",
    faq: "/pages/sss",
  };

  if (labelRoutes[normalizedLabel]) return labelRoutes[normalizedLabel];
  return isFooterMapsLabel(label) ? footerMapsHref : href;
}

function internalSiteHref(href: string) {
  const trimmed = href.trim();
  if (!trimmed) return "";
  if (/^(mailto:|tel:|#)/i.test(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed);
    if (url.hostname === "3mash.com" || url.hostname === "www.3mash.com") {
      return normalizedInternalRouteHref(
        `${url.pathname}${url.search}${url.hash}` || "/",
      );
    }
  } catch {
    // Relative route, keep as-is.
  }

  return normalizedInternalRouteHref(trimmed);
}

function footerLegalLinks(props: ThreeMashSectionRenderProps) {
  void props;
  return defaultFooterLegalLinks
    .map(
      ([text, target]) =>
        `<a href="${escapeAttr(internalSiteHref(target))}">${text}</a>`,
    )
    .join("<span>·</span>");
}

export function renderFooterHtml(props: ThreeMashSectionRenderProps) {
  const logoVisual = `<img src="${escapeAttr(threeMashFullLogoImage)}" alt="${escapeAttr(field(props, "logoImageAlt", "3mash"))}">`;

  function navLinkList(
    list: IkasNavigationLinkList | undefined,
    title: string,
  ) {
    const seen = new Set<string>();
    const links = (list?.links || [])
      .map((link) => {
        const label = link?.label || "";
        const href = internalSiteHref(linkHref(link, ""));
        return { ...link, href: footerHrefForLabel(label, href) };
      })
      .filter((link) => {
        if (!link?.label || !link.href) return false;
        const key = footerLinkKey(link.href);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    if (!links.length) return "";
    return `<p class="tmr-footer-col-title">${title}</p>${links
      .map(
        (link) =>
          `<a href="${escapeAttr(link.href)}"${link.openInNewTab ? ' target="_blank" rel="noopener noreferrer"' : externalLinkAttrs(link.href)}>${escapeHtml(link.label)}</a>`,
      )
      .join("")}`;
  }

  function categoryLinkList(
    categories: IkasCategoryList | undefined,
    title: string,
  ) {
    const limit = numberInRange(raw(props, "footerCategoryLimit"), 6, 1, 24);
    const seen = new Set<string>();
    const links = (categories?.data || [])
      .filter((category): category is IkasCategory =>
        Boolean(
          category &&
          !category.deleted &&
          category.name &&
          getIkasCategoryHref(category),
        ),
      )
      .filter((category) => !isLegacyThemeCategoryName(category.name))
      .filter((category) => {
        const key = footerLinkKey(
          internalSiteHref(getIkasCategoryHref(category)),
        );
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .slice(0, limit);
    if (!links.length) return "";
    return `<p class="tmr-footer-col-title">${title}</p>${links
      .map(
        (category) =>
          `<a href="${escapeAttr(internalSiteHref(getIkasCategoryHref(category)))}">${escapeHtml(category.name)}</a>`,
      )
      .join("")}`;
  }

  function linkList(
    prefix: string,
    title: string,
    defaults: Array<[string, string]>,
  ) {
    void prefix;
    const seen = new Set<string>();
    return `<p class="tmr-footer-col-title">${title}</p>${defaults
      .map(([label, link]) => {
        const resolvedHref = footerHrefForLabel(label, internalSiteHref(link));
        const key = footerLinkKey(resolvedHref);
        if (seen.has(key)) return "";
        seen.add(key);
        return `<a href="${escapeAttr(resolvedHref)}"${externalLinkAttrs(resolvedHref)}>${label}</a>`;
      })
      .join("")}`;
  }

  const products = linkList("product", "Ürünler", defaultFooterProductLinks);
  const company = linkList("company", "ŞİRKET", defaultFooterCompanyLinks);
  const socialLinks = footerSocialLinks(props);
  const paymentBadges = footerPaymentBadges();
  const contact = value(
    undefined,
    linkList("contact", "İLETİŞİM", defaultFooterContactLinks) +
      socialLinks +
      paymentBadges,
  );
  return `<footer class="tmr-footer"><div class="tmr-wrap"><div class="tmr-footer-cols"><div><a class="tmr-footer-logo" href="${escapeAttr(internalSiteHref(field(props, "logoHref", "/")))}">${logoVisual}</a><p>${footerDescriptionText}</p></div><div class="tmr-footer-link-col">${products}</div><div class="tmr-footer-link-col">${company}</div><div class="tmr-footer-link-col">${contact}</div></div><div class="tmr-base"><span>© 2026 3MASH Teknoloji A.Ş. Tüm hakları saklıdır.</span><div class="tmr-base-meta">${footerLegalLinks(props)}</div></div></div></footer>`;
}

export function ThreeMashStaticSection({
  props,
  fallback,
}: {
  props: ThreeMashSectionRenderProps;
  fallback?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  const baseHtml =
    props.sectionHtml && props.sectionHtml.trim()
      ? props.sectionHtml
      : fallback || "";
  const cleanedBaseHtml = stripInlineTypographyStyles(baseHtml);
  const renderedHtml = normalizeFooterMapsLinks(
    normalizeFooterLegalText(styleTextChunks(cleanedBaseHtml, props)),
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

          const title = column.querySelector("h6")?.cloneNode(true);
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

    const blockStudioFooterPageNavigation = (event: MouseEvent) => {
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>(".tmr-footer a[href]")
          : null;
      if (!target) return;

      const href = target.getAttribute("href") || "";
      if (!href.startsWith("/pages/")) return;

      const isStudioPreview =
        window.location.hostname.includes("ikasapps.com") ||
        window.location.hostname.includes("myikas.com") ||
        document.referrer.includes("ikasapps.com") ||
        document.referrer.includes("myikas.com");

      if (!isStudioPreview) return;
      event.preventDefault();
      event.stopPropagation();
    };

    normalizeProductSliders();
    syncFooterCategoryLists();
    root.addEventListener("click", blockStudioFooterPageNavigation, true);
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
      root.removeEventListener("click", blockStudioFooterPageNavigation, true);
      syncObserver?.disconnect();
      productSliderCleanups.forEach((cleanup) => cleanup());
    };
  }, [props.sectionHtml, fallback]);

  return (
    <div
      ref={rootRef}
      className={rootClassName}
      style={threeMashThemeStyle(props)}
    >
      <div dangerouslySetInnerHTML={html(renderedHtml)} />
    </div>
  );
}
