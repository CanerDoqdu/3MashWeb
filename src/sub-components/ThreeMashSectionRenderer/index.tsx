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
import { tLocalized, isEnglishLocale, tProp, isTurkishText, localizedHref } from "../../utils/i18n";
import { sanitizeHtml } from "../../utils/sanitizeHtml";
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

const solutionSetupHtml = tLocalized("<div class=\"tmr-products-setup\">Ürünler kısa süre içinde burada listelenecek.</div>", "<div class=\"tmr-products-setup\">Products will be listed here shortly.</div>");

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

export const defaultRoiHtml = tLocalized("<div class=\"tmr-roi\"><div class=\"tmr-wrap\"><div class=\"tmr-roi-num\"><span>YATIRIMIN GERİ DÖNÜŞÜ</span><b>&lt; 6 ay</b></div><p>3mash ekosistemine geçen bir klinik, yatırımını <b>6 aydan kısa sürede</b> geri kazanma potansiyeline sahip. Sonrasında bu verimlilik her yıl sürer: <b>yılda $72–162K'ya varan tasarruf potansiyeli.</b></p><a class=\"tmr-btn\" href=\"/\">Kliniğiniz için hesaplayalım →</a></div></div>", "<div class=\"tmr-roi\"><div class=\"tmr-wrap\"><div class=\"tmr-roi-num\"><span>RETURN ON INVESTMENT</span><b>&lt; 6 months</b></div><p>A clinic that switches to the 3mash ecosystem has the potential to recover its investment in <b>less than 6 months</b>. After that, this efficiency continues every year: <b>up to $72–162K in potential annual savings.</b></p><a class=\"tmr-btn\" href=\"/\">Let's calculate it for your clinic →</a></div></div>");

export const defaultEcosystemHtml = `<section id="ekosistem" class="tmr-section"><div class="tmr-wrap"><div class="tmr-index"><span class="tmr-index-number">05</span><span class="tmr-index-text">Uçtan Uca</span><span class="tmr-index-line"></span></div><div class="tmr-head"><h2>Dijital akışın her parçası, <span>tek çatı altında.</span></h2><div class="tmr-side">Cihaz satıp gitmiyoruz: doğru ürün için <b>danışmanlık</b>, sürdürülebilirlik için <b>Academy eğitimleri</b>, satış sonrasında teknisyen + mühendis <b>teknik destek.</b></div></div><div class="tmr-eco"><a href="/3d-yazicilar"><span class="tmr-eco-icon"><img src="${ecoPrinterIcon}" alt="" aria-hidden="true"></span><span>3D Yazıcılar</span></a><a href="/dental-3d-yazici-recineleri"><span class="tmr-eco-icon"><img src="${ecoResinIcon}" alt="" aria-hidden="true"></span><span>Dental Reçineler</span></a><a href="/yikama-kurleme-cihazlari"><span class="tmr-eco-icon"><img src="${ecoScannerIcon}" alt="" aria-hidden="true"></span><span>Yıkama &amp; Kürleme</span></a><a href="/masasustu-tarayicilar"><span class="tmr-eco-icon"><img src="${ecoCuringIcon}" alt="" aria-hidden="true"></span><span>Masaüstü Tarayıcılar</span></a><a href="/zirkon-bloklar"><span class="tmr-eco-icon"><img src="${ecoBlocksIcon}" alt="" aria-hidden="true"></span><span>Zirkon Bloklar</span></a><a href="/dental-firinlar"><span class="tmr-eco-icon"><img src="${ecoOvenIcon}" alt="" aria-hidden="true"></span><span>Dental Fırınlar</span></a></div></div></section>`;

export const defaultTrustHtml = `<section id="guven" class="tmr-section tmr-section-tight"><div class="tmr-wrap"><div class="tmr-index"><span class="tmr-index-number">06</span><span class="tmr-index-text">Referanslar</span><span class="tmr-index-line"></span></div><div class="tmr-head"><h2>Türkiye'nin en büyük lab'ları neden <span>bizimle üretiyor?</span></h2><div class="tmr-side">Kısa cevap hep aynı: tutarlılık. <b>580+</b> dental laboratuvar ve klinik bu sistemle üretiyor, çünkü sonuç <b>her seferinde</b> aynı çıkıyor.</div></div><div class="tmr-testimonials"><article class="tmr-testimonial tmr-featured"><div class="tmr-quote">“</div><p>Profesyoneller mutlak başarı için profesyonellere güvenir. Ekipman seçimi, temini, eğitimi ve kullanımında Mash ile iş birliği yapıyoruz.</p><div class="tmr-who"><img class="tmr-avatar" src="${profileMehmet}" alt="Mehmet İşlek"><div><b>Mehmet İşlek</b><small>ATTELIA · Kurucu Başhekim — 22 yıldır gülümseme tasarlayan klinik</small></div></div></article><article class="tmr-testimonial"><div class="tmr-quote">“</div><p>Yenilikçi ve yaratıcı. Donanım, yazılım ve malzemelerde uzun vadeli, başarılı bir iş birliği.</p><div class="tmr-who"><img class="tmr-avatar" src="${profileBerkan}" alt="Berkan Öztaş"><div><b>Berkan Öztaş</b><small>DENTEK · Genel Müd. Yard.</small></div></div></article><article class="tmr-testimonial"><div class="tmr-quote">“</div><p>Sorunları biz daha yaşamadan çözmüşler. Her zaman aynı kalitede üretim — mükemmel sonuçlar.</p><div class="tmr-who"><img class="tmr-avatar" src="${profileGoksel}" alt="Göksel Pişkin"><div><b>Göksel Pişkin</b><small>MIKRO LAB · Kurucu Ortak</small></div></div></article></div><div class="tmr-trusted">${trustedLabelMarkup}${bundledTrustedLogos}</div></div></section>`;

export const defaultFaqHtml = `<section id="sss" class="tmr-section tmr-section-tight"><div class="tmr-wrap"><div class="tmr-index"><span class="tmr-index-number">07</span><span class="tmr-index-text">Sık Sorulanlar</span><span class="tmr-index-line"></span></div><div class="tmr-head"><h2>Kısa, net cevaplar.</h2><div class="tmr-side">En kritik kararları hızlı vermeniz için, klinik ve laboratuvarlardan gelen soruları net cevaplarla topladık.</div></div><div class="tmr-faq"><details open><summary>Dental 3D baskıda ölçüsel hassasiyet neden bu kadar önemli?<span>+</span></summary><div>Çünkü bir restorasyonun ilk seferde oturması doğrudan ölçüsel hassasiyete bağlıdır. Ulusal ölçekli klinik verilerde kron tekrarlarının en sık sebepleri <b>proksimal uyumsuzluk, marjinal hatalar ve estetik başarısızlıktır</b> — üçü de birer hassasiyet problemidir. 3mash ekosistemi <b>±20 µm</b> boyutsal hassasiyeti, tek seferlik değil <b>her baskıda</b> tekrar edilebilir şekilde sağlar; bu da tekrar oranını ve gizli maliyeti düşürür.</div></details><details><summary>Bir kron tekrarının (remake) maliyeti gerçekte ne kadar?<span>+</span></summary><div>Tahminî olarak <b>~500 dolar</b> — ve bu tutarın büyük kısmı lab ücreti değil, <b>koltuk süresidir</b> (yeniden prep, ölçü ve yapıştırma randevusu). Klinik işletme gideri saatte ~$375 modellenir; tek bir tekrar bunun çoğunu tüketir. Kendi kalemlerinizle hesaplamak için <a href="#">maliyet detay sayfamıza</a> bakabilirsiniz.</div></details><details><summary>3D baskıda kürleme (post-curing) neden kritik?<span>+</span></summary><div>Çünkü baskı, cihazdan çıktığında henüz bitmemiştir. Yetersiz kürleme (undercure) <b>kırılganlık</b>, fazla kürleme (overcure) ise <b>deformasyon</b> yaratır — yazıcıda kazandığınız hassasiyeti kürlemede kaybedebilirsiniz. 3mash'in akıllı kürleme cihazı parametreleri otomatik yönetir ve bu riski kullanıcı hatasından arındırır.</div></details><details><summary>3mash yalnızca cihaz mı satıyor?<span>+</span></summary><div>Hayır. 3mash entegre bir <b>üretim ekosistemi</b> sunar: yazıcı, reçine ve kürlemeyi birlikte kalibre eder; danışmanlık, Mash Academy eğitimleri ve <b>diş teknisyeni + mühendislerden</b> oluşan satış sonrası teknik destekle tüm süreçte yanınızda olur.</div></details><details><summary>Elimdeki başka marka yazıcıyla çalışır mısınız?<span>+</span></summary><div>Evet. Hem reçine hem yazıcı tarafında güçlü bir teknik birikime sahip olduğumuz için çözümlerimiz <b>marka bağımsızdır</b>; mevcut cihazınızın parametrelerini optimize ederek onu da aynı sonuca getirebiliriz.</div></details></div></div></section>`;

export const defaultFinalHtml = `<section id="iletisim-cta" class="tmr-final"><div class="tmr-wrap"><h2>Bu görünmez kaybı <span>birlikte azaltalım.</span></h2><p>Mevcut iş akışınızı birlikte inceleyelim; kaybın nerede oluştuğunu birlikte görelim ve size uygun ekosistemi kuralım — <b class="tmr-final-white">elinizdeki cihazlarla bile.</b></p><div><a class="tmr-btn tmr-btn-lime" href="${consultationWhatsappHref}">Uzmana danış — ücretsiz</a><a class="tmr-btn tmr-btn-invert" href="${academyPageHref}">Mash Academy'yi keşfet</a></div></div></section>`;

const defaultFooterLegalLinks: Array<[string, string]> = [
  ["KVKK", "/pages/gizlilik-politikasi-ve-kvkk"],
  [tLocalized("Çerez Politikası", "Cookie Policy"), "/pages/cerez-politikasi"],
  [tLocalized("İade &amp; Garanti", "Return &amp; Warranty"), "/pages/iade-ve-garanti"],
  [tLocalized("Mesafeli Satış", "Distance Sales"), "/pages/mesafeli-satis-sozlesmesi"],
];
const footerDescriptionText = tLocalized(
  "Dental klinik ve laboratuvarlar için entegre 3D baskı ekosistemi: yazıcı, reçine, kürleme çözümleri ve üretim uzmanlığı bir arada.",
  "Integrated 3D printing ecosystem for dental clinics and laboratories: printers, resins, curing solutions, and manufacturing expertise together."
);
const defaultFooterProductLinks: Array<[string, string]> = [
  [tLocalized("3D Yazıcılar", "3D Printers"), "/3d-yazicilar"],
  [tLocalized("Dental Reçineler", "Dental Resins"), "/dental-3d-yazici-recineleri"],
  [tLocalized("Yıkama &amp; Kürleme", "Wash &amp; Cure"), "/yikama-kurleme-cihazlari"],
  [tLocalized("Masaüstü Tarayıcılar", "Desktop Scanners"), "/masasustu-tarayicilar"],
  [tLocalized("Zirkon Bloklar", "Zirconia Blocks"), "/zirkon-bloklar"],
  [tLocalized("Dental Fırınlar", "Dental Furnaces"), "/dental-firinlar"],
];
const defaultFooterCompanyLinks: Array<[string, string]> = [
  [tLocalized("Hakkımızda", "About Us"), "/pages/about-us"],
  [tLocalized("Mash Academy", "Mash Academy"), academyPageHref],
  [tLocalized("Blog", "Blog"), "/blog"],
  [tLocalized("Sıkça Sorulan Sorular", "FAQ"), "/pages/sss"],
];
const defaultFooterContactLinks: Array<[string, string]> = [
  ["info@3mash.com", "mailto:info@3mash.com"],
  [tLocalized("Antalya Teknokent, Konyaaltı", "Antalya Technopolis, Konyaalti"), footerMapsHref],
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

export const defaultFooterHtml = `<footer class="tmr-footer"><div class="tmr-wrap"><div class="tmr-footer-cols"><div><a class="tmr-footer-logo" href="/"><img src="${threeMashFullLogoImage}" alt="3mash"></a><p>${footerDescriptionText}</p></div><div class="tmr-footer-link-col"><p class="tmr-footer-col-title">${tLocalized("Ürünler", "Products")}</p>${defaultFooterProductsHtml}</div><div class="tmr-footer-link-col"><p class="tmr-footer-col-title">${tLocalized("ŞİRKET", "COMPANY")}</p>${defaultFooterCompanyHtml}</div><div class="tmr-footer-link-col"><p class="tmr-footer-col-title">${tLocalized("İLETİŞİM", "CONTACT")}</p><a href="mailto:info@3mash.com">info@3mash.com</a><a href="${footerMapsHref}" target="_blank" rel="noopener noreferrer">${tLocalized("Antalya Teknokent, Konyaaltı", "Antalya Technopolis, Konyaalti")}</a><div class="tmr-footer-social"><a href="https://www.facebook.com/3mashsocial/" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 8H13c-1.1 0-2 .9-2 2v2H8.8v3H11v5h3v-5h2.2l.5-3H14v-1.5c0-.3.2-.5.5-.5h2V8z"></path></svg></a><a href="https://instagram.com/3mashsocial" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="5"></rect><circle cx="12" cy="12" r="3.5"></circle><circle cx="16.5" cy="7.5" r="0.8"></circle></svg></a><a href="https://www.youtube.com/@3mashsocial" aria-label="YouTube" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 8.5c.2-1.4 1-2.2 2.4-2.4C8.2 6 10.1 6 12 6s3.8 0 5.1.1c1.4.2 2.2 1 2.4 2.4.1.9.2 2.1.2 3.5s-.1 2.6-.2 3.5c-.2 1.4-1 2.2-2.4 2.4-1.3.1-3.2.1-5.1.1s-3.8 0-5.1-.1c-1.4-.2-2.2-1-2.4-2.4-.1-.9-.2-2.1-.2-3.5s.1-2.6.2-3.5z"></path><path d="m10.5 9.5 4 2.5-4 2.5z"></path></svg></a><a href="https://www.linkedin.com/company/3mash" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 10v8"></path><path d="M6.5 6.5v.1"></path><path d="M10.5 18v-8"></path><path d="M10.5 13.5c0-2.1 1.2-3.5 3.1-3.5s3 1.3 3 3.7V18"></path></svg></a></div>${footerPaymentBadges()}</div></div><div class="tmr-base"><span>${tLocalized("© 2026 3MASH Teknoloji A.Ş. Tüm hakları saklıdır.", "© 2026 3MASH Technology Inc. All rights reserved.")}</span><div class="tmr-base-meta">${footerLegalLinksHtml}</div></div></div></footer>`;

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

  if (finalPrice) specs.push([tLocalized("Fiyat", "Price"), finalPrice]);
  if (sellPrice) specs.push([tLocalized("Liste", "List"), sellPrice]);
  if (specs.length < 2 && categoryName)
    specs.push([product.brand?.name ? tLocalized("Marka", "Brand") : tLocalized("Kategori", "Category"), categoryName]);

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
    return `<article class="tmr-product">${media}<div class="tmr-product-body"><h3>${escapeHtml(productDefaults.title)}</h3><p>${productDefaults.descriptionHtml}</p><div class="tmr-spec">${productDefaults.specs.map(([label, text]) => `<div><span>${escapeHtml(label)}</span><b>${escapeHtml(text)}</b></div>`).join("")}</div><a class="tmr-go" href="${escapeAttr(localizedHref(productDefaults.ctaHref))}">${escapeHtml(productDefaults.ctaText)} <span>→</span></a></div></article>`;
  }

  const image = imageSource(raw(props, `${prefix}ImageUrl`), defaults.image);
  const alt = field(props, `${prefix}ImageAlt`, defaults.imageAlt);
  const tagClass = defaults.tagClass ? ` ${defaults.tagClass}` : "";
  const media = `<div class="tmr-product-media tmr-product-media-${escapeAttr(prefix)}"><span class="tmr-tag${tagClass}">${field(props, `${prefix}Tag`, defaults.tag)}</span><img class="tmr-product-img ${defaults.imageClass}" src="${escapeAttr(image)}" alt="${escapeAttr(alt)}"></div>`;

  return `<article class="tmr-product">${media}<div class="tmr-product-body"><h3>${field(props, `${prefix}Title`, defaults.title)}</h3><p>${field(props, `${prefix}DescriptionHtml`, defaults.descriptionHtml)}</p><div class="tmr-spec">${specs(props, prefix, defaults.specs.length, defaults.specs)}</div><a class="tmr-go" href="${escapeAttr(localizedHref(linkHref(raw(props, `${prefix}CtaHref`), defaults.ctaHref)))}">${field(props, `${prefix}CtaText`, defaults.ctaText)} <span>→</span></a></div></article>`;
}

function solutionP1dCard(props: ThreeMashSectionRenderProps) {
  const en = isEnglishLocale();
  return productCard(props, "solutionCard1", {
    tag: en ? "PROFESSIONAL" : "PROFESYONEL",
    image: p1dSectionCardImage,
    imageAlt: tLocalized("MASH P1D", "MASH P1D"),
    imageClass: "tmr-machine-printer",
    title: tLocalized("MASH P1D", "MASH P1D"),
    descriptionHtml: en
      ? "Professional DLP production with an optical system designed for the material. The engine of high-volume labs and clinics."
      : tLocalized("Malzemeye göre tasarlanmış optik sistemle <b>profesyonel DLP</b> üretim. Yüksek hacimli lab ve kliniklerin motoru.", "<b>Professional DLP</b> production with an optical system designed around the material. The engine of high-volume labs and clinics."),
    specs: en
      ? [
        ["Light source", "385 nm DLP"],
        ["Accuracy", "±20 µm"],
        ["Character", "Repeatability"],
      ]
      : [
        [tLocalized("Işık kaynağı", "Light source"), "385 nm DLP"],
        ["Hassasiyet", "±20 µm"],
        ["Karakter", tLocalized("Tekrar edilebilirlik", "Repeatability")],
      ],
    ctaText: en ? "Explore" : tLocalized("İncele", "Explore"),
    ctaHref: "/3d-yazicilar",
  });
}

function solutionSecondCard(props: ThreeMashSectionRenderProps) {
  const en = isEnglishLocale();
  return productCard(props, "solutionCard2", {
    tag: en ? "ENTRY LEVEL" : tLocalized("GİRİŞ SEGMENTİ", "ENTRY SEGMENT"),
    image: p16lPrimaryImage,
    imageAlt: tLocalized("MASH P16L", "MASH P16L"),
    imageClass: "tmr-machine-p16l",
    title: tLocalized("MASH P16L", "MASH P16L"),
    descriptionHtml: en
      ? "3mash-revised LCD printer for those new to digital. Same parameter support, same technical team."
      : tLocalized("Dijitale yeni geçenler için <b>3mash revizyonlu</b> LCD yazıcı. Aynı parametre desteği, aynı teknik ekip.", "An <b>3mash-revised</b> LCD printer for those new to digital. Same parameter support, same technical team."),
    specs: en
      ? [
        ["Technology", "LCD · revised"],
        ["Role", "Entry to ecosystem"],
        ["Support", "Setup + training"],
      ]
      : [
        [tLocalized("Teknoloji", "Technology"), "LCD · revize"],
        [tLocalized("Rol", "Role"), tLocalized("Ekosisteme giriş", "Entry into the ecosystem")],
        [tLocalized("Destek", "Support"), tLocalized("Kurulum + eğitim", "Installation + training")],
      ],
    ctaText: en ? "Explore" : tLocalized("İncele", "Explore"),
    ctaHref: "/3d-yazicilar",
  });
}

function solutionResinCategoryCard(props: ThreeMashSectionRenderProps) {
  const en = isEnglishLocale();
  return productCard(props, "solutionCard3", {
    tag: en ? "OFFICIAL DISTRIBUTOR" : tLocalized("RESMİ DİSTRİBÜTÖR", "OFFICIAL DISTRIBUTOR"),
    image: crsModelBottleImage,
    imageAlt: en ? "CRS Resins" : tLocalized("CRS Reçineler", "CRS Resins"),
    imageClass: "tmr-resin-bottle",
    title: en ? "CRS Resins" : tLocalized("CRS Reçineler", "CRS Resins"),
    descriptionHtml: en
      ? "<b>CE Class IIa</b> biocompatible &amp; model resins; delivered <b>calibrated together</b> with your device parameters."
      : tLocalized("<b>CE Class IIa</b> biyouyumlu &amp; model reçineleri; cihazınızın parametreleriyle <b>birlikte kalibre edilmiş</b> teslim edilir.", "<b>CE Class IIa</b> biocompatible &amp; model resins; delivered <b>calibrated together</b> with your device's parameters."),
    specs: en
      ? [
        ["Certificate", tLocalized("CE Class IIa", "CE Class IIa")],
        ["Application", "Model · temp · splint · guide"],
        ["Compatibility", "Brand independent"],
      ]
      : [
        ["Sertifika", tLocalized("CE Class IIa", "CE Class IIa")],
        [tLocalized("Uygulama", "APPLICATION"), tLocalized("Model · geçici · splint · guide", "Model · temporary · splint · guide")],
        [tLocalized("Uyum", "Rapport"), tLocalized("Marka bağımsız", "Brand-independent")],
      ],
    ctaText: en ? "Explore" : tLocalized("İncele", "Explore"),
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
  return `<div class="tmr-products" aria-label="${escapeAttr(field(props, "carouselAriaLabel", tLocalized("Çözüm ürünleri", "Solution products")))}">${solutionP1dCard(props)}${solutionSecondCard(props)}${solutionResinCategoryCard(props)}</div>`;
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

  return `<div class="tmr-why-grid">${trDefaults
    .map(([eyebrowTr, titleTr, descriptionTr], index) => {
      const number = index + 1;
      const [eyebrowEn, titleEn, descriptionEn] = enDefaults[index];
      return `<article><div>${field(props, `reason${number}Eyebrow`, eyebrowTr, eyebrowEn)}</div><h3>${field(props, `reason${number}Title`, titleTr, titleEn)}</h3><p>${field(props, `reason${number}DescriptionHtml`, descriptionTr, descriptionEn)}</p></article>`;
    })
    .join("")}</div>`;
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
    curingProduct2Spec2Label: { legacy: tLocalized("Uyum", "Rapport"), next: tLocalized("Spektrum", "Spectrum") },
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

  const en = isEnglishLocale();
  return `<div class="tmr-products tmr-products-two">${productCard(
    staticCuringProps,
    "curingProduct1",
    {
      tag: en ? "WASHING" : tLocalized("YIKAMA", "WASHING"),
      tagClass: "tmr-lime-tag",
      image: mashW1eImage,
      imageAlt: tLocalized("Mash W1E Ultrasonik Yıkama Cihazı", "Mash W1E Ultrasonic Washing Device"),
      imageClass: "tmr-machine-phrozen",
      title: tLocalized("Mash W1E Ultrasonik Yıkama Cihazı", "Mash W1E Ultrasonic Washing Device"),
      descriptionHtml: en
        ? "Removes excess resin remaining on the surface after printing in a short time with <b>ultrasonic cleaning</b>; provides a clean surface before curing."
        : tLocalized("Reçine baskı sonrası yüzeyde kalan fazla reçineyi <b>ultrasonik temizleme</b> ile kısa sürede ve hassas biçimde uzaklaştırır; kürleme öncesi temiz yüzey sağlar.", "Removes excess resin remaining on the surface after resin printing quickly and precisely with <b>ultrasonic cleaning</b>; provides a clean surface before curing."),
      specs: en
        ? [
          ["Process", "Ultrasonic cleaning"],
          ["Workflow", "Washing → curing prep"],
        ]
        : [
          [tLocalized("İşlem", "Process"), tLocalized("Ultrasonik temizleme", "ultrasonic cleaning")],
          [tLocalized("Akış", "Workflow"), tLocalized("Yıkama → kürleme hazırlığı", "Washing → curing preparation")],
        ],
      ctaText: en ? "Explore" : tLocalized("İncele", "Explore"),
      ctaHref: "/mash-w1e-ultrasonik-yikama-cihazi",
    },
  )}${productCard(staticCuringProps, "curingProduct2", {
    tag: en ? "CURING" : tLocalized("KÜRLEME", "CURING"),
    image: mashC1eImage,
    imageAlt: tLocalized("Mash C1E UV Kürleme Cihazı", "Mash C1E UV Curing Device"),
    imageClass: "tmr-machine-uw02",
    title: tLocalized("Mash C1E UV Kürleme Cihazı", "Mash C1E UV Curing Device"),
    descriptionHtml: en
      ? "Provides <b>homogenous UV post-curing</b> with its 24-LED 360° curing system and 360-530 nm wide spectrum support; completes mechanical strength, dimensional accuracy and surface quality goals."
      : tLocalized("24 LED'li 360° kürleme sistemi ve 360-530 nm geniş spektrum desteğiyle <b>homojen UV post-curing</b> sağlar; mekanik dayanım, boyutsal doğruluk ve yüzey kalitesi hedefini tamamlar.", "Delivers <b>homogeneous UV post-curing</b> with a 24-LED 360° curing system and 360-530 nm wide spectrum support; completes the target for mechanical strength, dimensional accuracy, and surface quality."),
    specs: en
      ? [
        ["Light", "24 LED / 360°"],
        ["Spectrum", tLocalized("360-530 nm", "360-530nm")],
      ]
      : [
        [tLocalized("Işık", "Light"), "24 LED / 360°"],
        [tLocalized("Spektrum", "Spectrum"), tLocalized("360-530 nm", "360-530nm")],
      ],
    ctaText: en ? "Explore" : tLocalized("İncele", "Explore"),
    ctaHref: "/mash-c1e-uv-kurleme-cihazi",
  })}</div>`;
}

function curingContent(props: ThreeMashSectionRenderProps) {
  const readMoreTr = tLocalized("Derine inmek isteyenlere, Mash Academy'den:", "For those who want to go deeper, from Mash Academy:");
  const readMoreEn = "For those who want to dive deeper, from Mash Academy:";
  const link1Tr = tLocalized("Overcure ve Undercure Nedir?", "What Are Overcure and Undercure?");
  const link1En = "What is Overcure and Undercure?";
  const link2Tr = "385nm mi 405nm mi?";
  const link2En = "385nm or 405nm?";
  return `${curingReasons(props)}${curingProducts(props)}<p class="tmr-readmore">${field(props, "readMoreText", readMoreTr, readMoreEn)} <a href="${escapeAttr(localizedHref(field(props, "readMoreLink1Href", "/blog/dental-3d-baskida-overcure-ve-undercure-nedir-en-dogru-kurleme-icin-kapsamli-rehber")))}">${field(props, "readMoreLink1Text", link1Tr, link1En)}</a> · <a href="${escapeAttr(localizedHref(field(props, "readMoreLink2Href", "/blog/dental-3d-baskida-dogru-dalga-boyu-secimi-385nm-mi-405nm-mi")))}">${field(props, "readMoreLink2Text", link2Tr, link2En)}</a></p>`;
}

function curingTitleHtml(props: ThreeMashSectionRenderProps) {
  const en = isEnglishLocale();
  const defaultTitleTr = tLocalized("Sadece yazıcı değil. Sonucu", "Not just the printer. The result");
  const defaultTitleEn = "Not just the printer. Curing";
  const defaultEmphasisTr = tLocalized("kürleme tamamlar.", "completes curing.");
  const defaultEmphasisEn = "completes the result.";

  const titleText = field(props, "titleText", defaultTitleTr, defaultTitleEn);
  const titleEmphasis = field(props, "titleEmphasis", defaultEmphasisTr, defaultEmphasisEn);

  if (en) {
    return `Not just the printer. <span class="tmr-curing-keep"><span class="tmr-title-em">Curing</span></span><br>completes the result.`;
  }
  return tLocalized("Sadece yazıcı değil. <span class=\"tmr-curing-keep\">Sonucu <span class=\"tmr-title-em\">kürleme</span></span><br>tamamlar.", "Not just the printer. <span class=\"tmr-curing-keep\">It is <span class=\"tmr-title-em\">curing</span></span><br>that completes the result.");
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
      const titleEn = enTitles[index];
      const icon = showIcons
        ? `<span class="tmr-eco-icon"><img src="${escapeAttr(imageSource(raw(props, `ecosystemItem${number}IconImageUrl`), icons[index]))}" alt="" aria-hidden="true"></span>`
        : "";
      return `<a class="tmr-eco-card tmr-eco-card-${number}" href="${escapeAttr(localizedHref(field(props, `ecosystemItem${number}Href`, hrefs[index])))}">${icon}<span>${field(props, `ecosystemItem${number}Title`, titleTr, titleEn)}</span></a>`;
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
        `Trusted brand ${number}`,
      );
      return `<span class="tmr-trusted-logo"><img src="${escapeAttr(src)}" alt="${escapeAttr(alt)}"></span>`;
    })
    .join("");

  return logos ? `<div class="tmr-trusted-logos">${logos}</div>` : "";
}

function trustContent(props: ThreeMashSectionRenderProps) {
  const trDefaults = [
    [
      profileMehmet,
      tLocalized("Mehmet İşlek", "Mehmet İşlek"),
      tLocalized("Profesyoneller mutlak başarı için profesyonellere güvenir. Ekipman seçimi, temini, eğitimi ve kullanımında Mash ile iş birliği yapıyoruz.", "Professionals trust professionals for absolute success. We collaborate with Mash on equipment selection, supply, training, and use."),
      tLocalized("Mehmet İşlek", "Mehmet İşlek"),
      tLocalized("ATTELIA · Kurucu Başhekim — 22 yıldır gülümseme tasarlayan klinik", "ATTELIA · Founding Chief Physician — a clinic designing smiles for 22 years"),
    ],
    [
      profileBerkan,
      tLocalized("Berkan Öztaş", "Berkan Öztaş"),
      tLocalized("Yenilikçi ve yaratıcı. Donanım, yazılım ve malzemelerde uzun vadeli, başarılı bir iş birliği.", "Innovative and creative. A long-term, successful partnership in hardware, software, and materials."),
      tLocalized("Berkan Öztaş", "Berkan Öztaş"),
      tLocalized("DENTEK · Genel Müd. Yard.", "DENTEK · Assistant General Manager"),
    ],
    [
      profileGoksel,
      tLocalized("Göksel Pişkin", "Göksel Pişkin"),
      tLocalized("Sorunları biz daha yaşamadan çözmüşler. Her zaman aynı kalitede üretim — mükemmel sonuçlar.", "They've solved problems before we even encountered them. Always the same production quality — perfect results."),
      tLocalized("Göksel Pişkin", "Göksel Pişkin"),
      tLocalized("MIKRO LAB · Kurucu Ortak", "MIKRO LAB · Founding Partner"),
    ],
  ];

  const enDefaults = [
    [
      profileMehmet,
      tLocalized("Mehmet İşlek", "Mehmet İşlek"),
      "Professionals trust professionals for absolute success. We collaborate with Mash in equipment selection, supply, training, and operation.",
      tLocalized("Mehmet İşlek", "Mehmet İşlek"),
      "ATTELIA · Chief Physician & Founder — Designing smiles for 22 years",
    ],
    [
      profileBerkan,
      tLocalized("Berkan Öztaş", "Berkan Öztaş"),
      "Innovative and creative. A long-term, successful collaboration across hardware, software, and materials.",
      tLocalized("Berkan Öztaş", "Berkan Öztaş"),
      "DENTEK · Deputy General Manager",
    ],
    [
      profileGoksel,
      tLocalized("Göksel Pişkin", "Göksel Pişkin"),
      "They solved problems before we even encountered them. Consistent production quality every single time — excellent results.",
      tLocalized("Göksel Pişkin", "Göksel Pişkin"),
      "MIKRO LAB · Co-Founder",
    ],
  ];

  const cards = trDefaults
    .map(([image, altTr, textTr, nameTr, roleTr], index) => {
      const number = index + 1;
      const featured = index === 0 ? " tmr-featured" : "";
      const [, altEn, textEn, nameEn, roleEn] = enDefaults[index];
      return `<article class="tmr-testimonial${featured}"><div class="tmr-quote">“</div><p>${field(props, `testimonial${number}Text`, textTr, textEn)}</p><div class="tmr-who"><img class="tmr-avatar" src="${escapeAttr(imageSource(raw(props, `testimonial${number}ImageUrl`), image))}" alt="${escapeAttr(field(props, `testimonial${number}ImageAlt`, altTr, altEn))}"><div><b>${field(props, `testimonial${number}Name`, nameTr, nameEn)}</b><small>${field(props, `testimonial${number}Role`, roleTr, roleEn)}</small></div></div></article>`;
    })
    .join("");
  const label = tProp(raw(props, "trustedLabel") as string | undefined, "Güvenenler", "Trusted by");
  return `<div class="tmr-testimonials">${cards}</div><div class="tmr-trusted"><span class="tmr-trusted-label"><span class="tmr-trusted-label-text">${label}</span><img src="${trustLogo3}" alt="" aria-hidden="true"></span>${trustedLogos(props)}</div>`;
}

function faqContent(props: ThreeMashSectionRenderProps) {
  const trDefaults = [
    [
      tLocalized("Dental 3D baskıda ölçüsel hassasiyet neden bu kadar önemli?", "Why is dimensional accuracy so important in dental 3D printing?"),
      tLocalized("Çünkü bir restorasyonun ilk seferde oturması doğrudan ölçüsel hassasiyete bağlıdır. Ulusal ölçekli klinik verilerde kron tekrarlarının en sık sebepleri <b>proksimal uyumsuzluk, marjinal hatalar ve estetik başarısızlıktır</b> — üçü de birer hassasiyet problemidir. 3mash ekosistemi <b>±20 µm</b> boyutsal hassasiyeti, tek seferlik değil <b>her baskıda</b> tekrar edilebilir şekilde sağlar; bu da tekrar oranını ve gizli maliyeti düşürür.", "Because a restoration fitting the first time depends directly on dimensional accuracy. In national-scale clinical data, the most common causes of crown remakes are <b>proximal misfit, marginal errors, and aesthetic failure</b> — all three are precision problems. The 3mash ecosystem delivers <b>±20 µm</b> dimensional accuracy repeatably, <b>with every print</b> rather than just once — lowering the remake rate and hidden cost."),
    ],
    [
      tLocalized("Bir kron tekrarının (remake) maliyeti gerçekte ne kadar?", "How much does a crown remake actually cost?"),
      tLocalized("Tahminî olarak <b>~500 dolar</b> — ve bu tutarın büyük kısmı lab ücreti değil, <b>koltuk süresidir</b> (yeniden prep, ölçü ve yapıştırma randevusu). Klinik işletme gideri saatte ~$375 modellenir; tek bir tekrar bunun çoğunu tüketir. Kendi kalemlerinizle hesaplamak için <a href=\"/pages/hesaplama\">maliyet detay sayfamıza</a> bakabilirsiniz.", "Roughly <b>~$500</b> — and most of that amount is not the lab fee, but <b>chair time</b> (re-prep, impression, and cementation appointment). Clinical overhead is modeled at ~$375 per hour; a single remake consumes most of that. You can check our <a href=\"/pages/hesaplama\">cost detail page</a> to calculate it with your own figures."),
    ],
    [
      tLocalized("3D baskıda kürleme (post-curing) neden kritik?", "Why is curing (post-curing) critical in 3D printing?"),
      tLocalized("Çünkü baskı, cihazdan çıktığında henüz bitmemiştir. Yetersiz kürleme (undercure) <b>kırılganlık</b>, fazla kürleme (overcure) ise <b>deformasyon</b> yaratır — yazıcıda kazandığınız hassasiyeti kürlemede kaybedebilirsiniz. 3mash'in akıllı kürleme cihazı parametreleri otomatik yönetir ve bu riski kullanıcı hatasından arındırır.", "Because the print isn't finished when it comes out of the device. Undercuring causes <b>brittleness</b>, while overcuring causes <b>deformation</b> — you can lose the precision you gained on the printer during curing. 3mash's smart curing device manages the parameters automatically, removing this risk from user error."),
    ],
    [
      tLocalized("3mash yalnızca cihaz mı satıyor?", "Does 3mash only sell devices?"),
      tLocalized("Hayır. 3mash entegre bir <b>üretim ekosistemi</b> sunar: yazıcı, reçine ve kürlemeyi birlikte kalibre eder; danışmanlık, Mash Academy eğitimleri ve <b>diş teknisyeni + mühendislerden</b> oluşan satış sonrası teknik destekle tüm süreçte yanınızda olur.", "No. 3mash offers an integrated <b>production ecosystem</b>: it calibrates the printer, resin, and curing together, and stays by your side throughout the entire process with consulting, Mash Academy training, and after-sales technical support made up of <b>dental technicians + engineers</b>."),
    ],
    [
      tLocalized("Elimdeki başka marka yazıcıyla çalışır mısınız?", "Do you work with the other-brand printer I already have?"),
      tLocalized("Evet. Hem reçine hem yazıcı tarafında güçlü bir teknik birikime sahip olduğumuz için çözümlerimiz <b>marka bağımsızdır</b>; mevcut cihazınızın parametrelerini optimize ederek onu da aynı sonuca getirebiliriz.", "Yes. Since we have strong technical expertise on both the resin and printer side, our solutions are <b>brand-independent</b>; we can optimize your existing device's parameters to get it to the same result."),
    ],
  ];

  const enDefaults = [
    [
      "Why is dimensional accuracy so critical in dental 3D printing?",
      "Because whether a restoration seats on the first try directly depends on dimensional accuracy. In national clinical data, the most common reasons for crown remakes are <b>proximal misfit, marginal errors, and esthetic failure</b> — all accuracy problems. The 3mash ecosystem provides <b>±20 µm</b> dimensional accuracy repeatable <b>on every print</b>, which lowers remake rates and hidden costs.",
    ],
    [
      "How much does a crown remake actually cost?",
      'Estimated at <b>~$500</b> — and the majority is not lab fees, but <b>chairside time</b> (re-prep, impression, and seating appointment). Clinical overhead is modeled at ~$375/hr; a single remake consumes most of it. To calculate with your own numbers, visit our <a href="/pages/hesaplama">cost calculation page</a>.',
    ],
    [
      "Why is post-curing so critical in 3D printing?",
      "Because a print is not finished when it comes out of the machine. Undercure causes <b>brittleness</b>, while overcure causes <b>deformation</b> — you can lose the accuracy gained in the printer during curing. 3mash smart curing units manage parameters automatically to eliminate this risk.",
    ],
    [
      "Does 3mash only sell equipment?",
      "No. 3mash offers an integrated <b>production ecosystem</b>: calibrating printer, resin, and curing together, accompanied by consulting, Mash Academy training, and after-sales technical support from <b>dental technicians + engineers</b>.",
    ],
    [
      "Can you work with my existing third-party printer?",
      "Yes. With our deep technical expertise across resins and printers, our solutions are <b>brand-independent</b>; we can optimize parameters for your existing equipment to achieve the same result.",
    ],
  ];

  return `<div class="tmr-faq">${trDefaults
    .map(([qTr, aTr], index) => {
      const number = index + 1;
      const [qEn, aEn] = enDefaults[index];
      const open =
        index === 0 && raw(props, "openFirstFaq") !== false ? " open" : "";
      return `<details${open}><summary>${field(props, `faq${number}Question`, qTr, qEn)}<span>+</span></summary><div>${field(props, `faq${number}AnswerHtml`, aTr, aEn)}</div></details>`;
    })
    .join("")}</div>`;
}

export function renderSolutionHtml(props: ThreeMashSectionRenderProps) {
  return indexedSection(props, {
    anchor: "cozum",
    className: "tmr-section-tight tmr-solution",
    indexNumber: "03",
    indexText: tProp(props.indexText as string | undefined, "Çözüm · Üretim Ekosistemi", "Solution · Production Ecosystem"),
    titleText: tProp(props.titleText as string | undefined, "Hassasiyet cihazdan çıkmaz;", "Precision doesn't come from the device;"),
    titleEmphasis: tProp(props.titleEmphasis as string | undefined, "uyumdan çıkar.", "it comes from compatibility."),
    sideHtml: tProp(props.sideHtml as string | undefined,
      "Kuronun oturması üç şeyin senkronuna bağlı: <b>yazıcı, reçine, kürleme.</b> Biz üçünü birlikte kalibre edip saha birikimiyle teslim ediyoruz — elinizdeki başka marka cihaza bile.",
      "A crown seating depends on three things in sync: <b>printer, resin, curing.</b> We calibrate all three together and deliver with field-proven knowledge — even for your existing third-party device."),
    contentHtml: solutionContent(props),
  });
}

export function renderCuringHtml(props: ThreeMashSectionRenderProps) {
  const en = isEnglishLocale();
  return `<section id="${escapeAttr(value(props.sectionAnchorId, "kurleme"))}" class="tmr-section tmr-dark tmr-curing">
  <div class="tmr-wrap">
    <div class="tmr-index"><span class="tmr-index-number">${value(props.indexNumber, "04")}</span><span class="tmr-index-text">${tProp(props.indexText as string | undefined, "Kritik Son Adım", "Critical Final Step")}</span><span class="tmr-index-line"></span></div>
    <div class="tmr-head"><h2>${curingTitleHtml(props)}</h2><div class="tmr-side">${tProp(props.sideHtml as string | undefined, "Baskı, cihazdan çıktığında bitmemiştir. Yanlış kürlenen iş, <b>doğru basılmış olsa bile</b> başarısız olur. İşte üç sebep:", "The print is not finished when it leaves the device. A poorly cured job, <b>even if correctly printed</b>, will fail. Here are three reasons:")}</div></div>
    ${curingContent(props)}
  </div>
</section>`;
}

export function renderEcosystemHtml(props: ThreeMashSectionRenderProps) {
  const en = isEnglishLocale();
  return indexedSection(props, {
    anchor: "ekosistem",
    className: "tmr-ecosystem",
    indexNumber: "05",
    indexText: tProp(props.indexText as string | undefined, "Uçtan Uca", "End to End"),
    titleText: tProp(props.titleText as string | undefined, "Dijital akışın her parçası,", "Every part of the digital workflow,"),
    titleEmphasis: tProp(props.titleEmphasis as string | undefined, "tek çatı altında.", "under one roof."),
    sideHtml: tProp(props.sideHtml as string | undefined,
      "Cihaz satıp gitmiyoruz: doğru ürün için <b>danışmanlık</b>, sürdürülebilirlik için <b>Academy eğitimleri</b>, satış sonrasında teknisyen + mühendis <b>teknik destek.</b>",
      "We don't just sell devices: <b>consulting</b> for the right product, <b>Academy training</b> for sustainability, technician + engineer <b>technical support</b> after the sale."),
    contentHtml: ecosystemContent(props),
  });
}

export function renderTrustHtml(props: ThreeMashSectionRenderProps) {
  const en = isEnglishLocale();
  return indexedSection(props, {
    anchor: "guven",
    className: "tmr-section-tight tmr-trust-section",
    indexNumber: "06",
    indexText: tProp(props.indexText as string | undefined, "Referanslar", "References"),
    titleText: tProp(props.titleText as string | undefined, "Türkiye'nin en büyük lab'ları neden", "Why do Turkey's largest labs"),
    titleEmphasis: tProp(props.titleEmphasis as string | undefined, "bizimle üretiyor?", "produce with us?"),
    sideHtml: tProp(props.sideHtml as string | undefined,
      "Kısa cevap hep aynı: tutarlılık. <b>580+</b> dental laboratuvar ve klinik bu sistemle üretiyor, çünkü sonuç <b>her seferinde</b> aynı çıkıyor.",
      "The short answer is always the same: consistency. <b>580+</b> dental labs and clinics produce with this system because the result is the same <b>every single time.</b>"),
    contentHtml: trustContent(props),
  });
}

export function renderFaqHtml(props: ThreeMashSectionRenderProps) {
  const en = isEnglishLocale();
  return indexedSection(props, {
    anchor: "sss",
    className: "tmr-section-tight tmr-faq-section",
    indexNumber: "07",
    indexText: tProp(props.indexText as string | undefined, "Sık Sorulanlar", "Frequently Asked Questions"),
    titleText: tProp(props.titleText as string | undefined, "Kısa, net cevaplar.", "Short, clear answers."),
    sideHtml: tProp(props.sideHtml as string | undefined,
      "En kritik kararları hızlı vermeniz için, klinik ve laboratuvarlardan gelen soruları net cevaplarla topladık.",
      "To help you make critical decisions quickly, we've compiled the most common questions from clinics and labs with clear answers."),
    contentHtml: faqContent(props),
  });
}

export function renderRoiHtml(props: ThreeMashSectionRenderProps) {
  const en = isEnglishLocale();
  const eyebrow = tProp(props.eyebrowText as string | undefined, "YATIRIMIN GERİ DÖNÜŞÜ", "RETURN ON INVESTMENT");
  const desc = tProp(props.descriptionHtml as string | undefined,
    "3mash ekosistemine geçen bir klinik, yatırımını <b>6 aydan kısa sürede</b> geri kazanma potansiyeline sahip. Sonrasında bu verimlilik her yıl sürer: <b>yılda $72–162K'ya varan tasarruf potansiyeli.</b>",
    "A clinic switching to the 3mash ecosystem has the potential to recoup its investment in <b>under 6 months.</b> After that, the efficiency continues every year: <b>savings potential of $72–162K per year.</b>");
  const ctaText = tProp(props.ctaText as string | undefined, "Kliniğiniz için hesaplayalım →", "Calculate for your clinic →");
  return `<div id="${escapeAttr(field(props, "sectionAnchorId", "yatirim"))}" class="tmr-roi"><div class="tmr-wrap"><div class="tmr-roi-num"><span>${eyebrow}</span><b>${value(props.valueText, "&lt; 6 ay")}</b></div><p>${desc}</p><a class="tmr-btn" href="${escapeAttr(localizedHref(value(props.ctaHref, "/")))}">${ctaText}</a></div></div>`;
}


export function renderFinalHtml(props: ThreeMashSectionRenderProps) {
  const academyHref = normalizedInternalRouteHref(
    value(props.secondaryButtonHref, academyPageHref),
  );

  const titleText = field(props, "titleText", tLocalized("Bu görünmez kaybı", "This invisible loss"), "Let's reduce this invisible loss");
  const titleEmphasis = field(props, "titleEmphasis", tLocalized("birlikte azaltalım.", "let's reduce it together."), "together.");
  const descriptionHtml = field(
    props,
    "descriptionHtml",
    tLocalized("Mevcut iş akışınızı birlikte inceleyelim; kaybın nerede oluştuğunu birlikte görelim ve size uygun ekosistemi kuralım — <b class='tmr-final-white'>elinizdeki cihazlarla bile.</b>", "Let's review your current workflow together, identify where the loss is occurring, and build the right ecosystem for you — <b class='tmr-final-white'>even with the devices you already have.</b>"),
    "Let's review your current workflow together; we'll identify where the loss occurs and set up the right ecosystem for you — <b class='tmr-final-white'>even with your existing equipment.</b>"
  );
  const primaryText = field(props, "primaryButtonText", tLocalized("Uzmana danış — ücretsiz", "consult an expert — free"), "Talk to an expert — free");
  const secondaryText = field(props, "secondaryButtonText", tLocalized("Mash Academy'yi keşfet", "explore mash academy"), "Explore Mash Academy");

  return `<section id="${escapeAttr(field(props, "sectionAnchorId", "iletisim-cta"))}" class="tmr-final"><div class="tmr-wrap"><h2>${heading(titleText, titleEmphasis)}</h2><p>${descriptionHtml}</p><div><a class="tmr-btn tmr-btn-lime" href="${escapeAttr(localizedHref(value(props.primaryButtonHref, consultationWhatsappHref)))}">${primaryText}</a><a class="tmr-btn tmr-btn-invert" href="${escapeAttr(localizedHref(academyHref))}">${secondaryText}</a></div></div></section>`;
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
      if (!href)
        return `<span class="tmr-footer-social-icon" aria-label="${label}" role="img">${socialIcon(icon)}</span>`;
      return `<a href="${escapeAttr(href)}" aria-label="${label}" target="_blank" rel="noopener noreferrer">${socialIcon(icon)}</a>`;
    })
    .join("");

  return links ? `<div class="tmr-footer-social">${links}</div>` : "";
}

function footerPaymentBadges() {
  return tLocalized("<div class=\"tmr-footer-payments\" aria-label=\"Ödeme yöntemleri\"><span class=\"tmr-payment-badge tmr-payment-visa\" aria-label=\"Visa\" role=\"img\">VISA</span><span class=\"tmr-payment-badge tmr-payment-maestro\" aria-label=\"Maestro\" role=\"img\"><span></span><span></span></span><span class=\"tmr-payment-badge tmr-payment-mastercard\" aria-label=\"Mastercard\" role=\"img\"><span></span><span></span></span></div>", "<div class=\"tmr-footer-payments\" aria-label=\"Payment methods\"><span class=\"tmr-payment-badge tmr-payment-visa\" aria-label=\"Visa\" role=\"img\">VISA</span><span class=\"tmr-payment-badge tmr-payment-maestro\" aria-label=\"Maestro\" role=\"img\"><span></span><span></span></span><span class=\"tmr-payment-badge tmr-payment-mastercard\" aria-label=\"Mastercard\" role=\"img\"><span></span><span></span></span></div>");
}

function footerCopyrightText(props: ThreeMashSectionRenderProps) {
  const fallback = tLocalized("© 2026 3MASH Teknoloji A.Ş. Tüm hakları saklıdır.", "© 2026 3MASH Teknoloji A.Ş. All rights reserved.");
  const current = value(props.copyrightText, fallback);
  if (/all\s+rights\s+(reserved|preserved)/i.test(current)) return fallback;
  if (
    /3MASH\s+Teknoloji\s+A\.Ş\./i.test(current) &&
    !/Tüm\s+hakları\s+saklıdır/i.test(current)
  ) {
    return current.replace(
      /3MASH\s+Teknoloji\s+A\.Ş\./i,
      tLocalized("3MASH Teknoloji A.Ş. Tüm hakları saklıdır.", "3MASH Teknoloji A.Ş. All rights reserved."),
    );
  }
  return current;
}

function normalizeFooterLegalText(markup: string) {
  return markup
    .replace(
      /All\s+rights\s+(reserved|preserved)\.?/gi,
      tLocalized("Tüm hakları saklıdır.", "All rights reserved."),
    )
    .replace(
      /(©\s*2026\s*3MASH\s+Teknoloji\s+A\.Ş\.)(?!\s*Tüm\s+hakları\s+saklıdır)/gi,
      tLocalized("$1 Tüm hakları saklıdır.", "$1 All rights reserved."),
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
    tLocalized("antalya teknokent, konyaaltı", "Antalya Technopark, Konyaalti")
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
    "çerez politikası": "/pages/cerez-politikasi",
    "cerez politikasi": "/pages/cerez-politikasi",
    "cookie policy": "/pages/cerez-politikasi",
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
      return localizedHref(
        normalizedInternalRouteHref(
          `${url.pathname}${url.search}${url.hash}` || "/",
        ),
      );
    }
  } catch {
    // Relative route, keep as-is.
  }

  return localizedHref(normalizedInternalRouteHref(trimmed));
}

function footerLegalLinks(props: ThreeMashSectionRenderProps) {
  void props;
  const en = isEnglishLocale();
  const links = en
    ? [
      ["Privacy &amp; KVKK", "/pages/gizlilik-politikasi-ve-kvkk"],
      ["Cookie Policy", "/pages/cerez-politikasi"],
      ["Cookie Settings", "#cookie-settings"],
      ["Return &amp; Warranty", "/pages/iade-ve-garanti"],
      ["Distance Selling", "/pages/mesafeli-satis-sozlesmesi"],
    ]
    : [
      ["KVKK", "/pages/gizlilik-politikasi-ve-kvkk"],
      ["Çerez Politikası", "/pages/cerez-politikasi"],
      ["Çerez Tercihleri", "#cerez-ayarlari"],
      ["İade &amp; Garanti", "/pages/iade-ve-garanti"],
      ["Mesafeli Satış", "/pages/mesafeli-satis-sozlesmesi"],
    ];
  return links
    .map(
      ([text, target]) =>
        `<a href="${target.startsWith('#') ? target : escapeAttr(internalSiteHref(target))}" class="${target.startsWith('#') ? 'tm-open-cookie-settings' : ''}">${text}</a>`,
    )
    .join("<span>·</span>");
}

export function renderFooterHtml(props: ThreeMashSectionRenderProps) {
  const en = isEnglishLocale();
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

  const productLinks: Array<[string, string]> = en
    ? [
      ["3D Printers", "/3d-yazicilar"],
      ["Dental Resins", "/dental-3d-yazici-recineleri"],
      ["Wash &amp; Cure", "/yikama-kurleme-cihazlari"],
      ["Desktop Scanners", "/masasustu-tarayicilar"],
      ["Zirconia Blocks", "/zirkon-bloklar"],
      ["Dental Furnaces", "/dental-firinlar"],
    ]
    : defaultFooterProductLinks;

  const companyLinks: Array<[string, string]> = en
    ? [
      ["About Us", "/pages/about-us"],
      [tLocalized("Mash Academy", "Mash Academy"), academyPageHref],
      [tLocalized("Blog", "Blog"), "/blog"],
      ["FAQ", "/pages/sss"],
    ]
    : defaultFooterCompanyLinks;

  const products = linkList("product", en ? "PRODUCTS" : tLocalized("Ürünler", "Products"), productLinks);
  const company = linkList("company", en ? "COMPANY" : tLocalized("ŞİRKET", "COMPANY"), companyLinks);
  const socialLinks = footerSocialLinks(props);
  const paymentBadges = footerPaymentBadges();
  const contact = value(
    undefined,
    linkList("contact", en ? "CONTACT" : tLocalized("İLETİŞİM", "CONTACT"), defaultFooterContactLinks) +
    socialLinks +
    paymentBadges,
  );
  const copyrightText = tLocalized("© 2026 3MASH Teknoloji A.Ş. Tüm hakları saklıdır.", "© 2026 3MASH Technology Inc. All rights reserved.");
  const descriptionText = en
    ? "Integrated 3D printing ecosystem for dental clinics and laboratories: printers, resins, curing solutions, and manufacturing expertise together."
    : footerDescriptionText;
  return `<footer class="tmr-footer"><div class="tmr-wrap"><div class="tmr-footer-cols"><div><a class="tmr-footer-logo" href="${escapeAttr(internalSiteHref(field(props, "logoHref", "/")))}">${logoVisual}</a><p>${descriptionText}</p></div><div class="tmr-footer-link-col">${products}</div><div class="tmr-footer-link-col">${company}</div><div class="tmr-footer-link-col">${contact}</div></div><div class="tmr-base"><span>${copyrightText}</span><div class="tmr-base-meta">${footerLegalLinks(props)}</div></div></div></footer>`;
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
      style={threeMashThemeStyle(props)}
    >
      <div dangerouslySetInnerHTML={html(renderedHtml)} />
    </div>
  );
}
