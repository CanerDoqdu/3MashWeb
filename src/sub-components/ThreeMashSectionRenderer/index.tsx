import { useEffect, useRef } from "preact/hooks";
import {
  createMediaSrcset,
  getDefaultSrc,
  getProductHref,
  getProductVariantFormattedFinalPrice,
  getProductVariantFormattedSellPrice,
  getProductVariantMainImage,
  getSelectedProductVariant,
  hasProductVariantDiscount,
  type IkasProduct,
  type IkasProductList,
  type IkasProductVariant,
} from "@ikas/bp-storefront";
import { profileBerkan, profileGoksel, profileMehmet, resinBottle } from "../../assets/remaining-assets-data";
import crealityUW02 from "../../assets/creality-uw02-data";
import threeMashLogoImage from "../../assets/three-mash-logo-data";
import { ecoBlocksIcon, ecoCuringIcon, ecoOvenIcon, ecoPrinterIcon, ecoResinIcon, ecoScannerIcon } from "../../assets/eco-icons-data";
import { p16lPrimaryImage, resinShowcaseVideo } from "../../assets/solution-p16l-media-data";
import { p16lShowcaseVideo } from "../../assets/p16l-showcase-video-data";
import { p1dShowcaseVideo } from "../../assets/p1d-showcase-video-data";
import phrozenWashCureKit from "../../assets/phrozen-wash-cure-kit-data";
import p1dSectionCardImage from "../../assets/p1d-section-card-data";
import trustLogo1 from "../../assets/trust-logo-1-data";
import trustLogo2 from "../../assets/trust-logo-2-data";
import trustLogo3 from "../../assets/trust-logo-3-data";
import trustLogo4 from "../../assets/trust-logo-4-data";
import trustLogo5 from "../../assets/trust-logo-5-data";
import ecosystemDiagramImage from "../../assets/ecosystem-diagram-data";

const solutionCardVideosEnabled = false;

const trustedLabelMarkup = `<span class="tmr-trusted-label"><span class="tmr-trusted-label-text">Güvenenler</span><img src="${trustLogo3}" alt="" aria-hidden="true"></span>`;
const bundledTrustedLogos = `<div class="tmr-trusted-logos"><span class="tmr-trusted-logo"><img src="${trustLogo1}" alt="Güvenen marka 1"></span><span class="tmr-trusted-logo"><img src="${trustLogo2}" alt="Güvenen marka 2"></span><span class="tmr-trusted-logo"><img src="${trustLogo4}" alt="Güvenen marka 4"></span><span class="tmr-trusted-logo"><img src="${trustLogo5}" alt="Güvenen marka 5"></span></div>`;

export const solutionProductCards = `
      <article class="tmr-product">${p1dInteractiveMediaMarkup("PROFESYONEL", p1dSectionCardImage, "MASH P1D")}<div class="tmr-product-body"><h3>MASH P1D</h3><p>Malzemeye göre tasarlanmış optik sistemle <b>profesyonel DLP</b> üretim. Yüksek hacimli lab ve kliniklerin motoru.</p><div class="tmr-spec"><div><span>Işık kaynağı</span><b>385 nm DLP</b></div><div><span>Hassasiyet</span><b>±20 µm</b></div><div><span>Karakter</span><b>Tekrar edilebilirlik</b></div></div><a class="tmr-go" href="/pages/mash-p1d">İncele <span>→</span></a></div></article>
      <article class="tmr-product">${p16lInteractiveMediaMarkup("GİRİŞ SEGMENTİ", p16lPrimaryImage, "MASH P16L")}<div class="tmr-product-body"><h3>MASH P16L</h3><p>Dijitale yeni geçenler için <b>3mash revizyonlu</b> LCD yazıcı. Aynı parametre desteği, aynı teknik ekip.</p><div class="tmr-spec"><div><span>Teknoloji</span><b>LCD · revize</b></div><div><span>Rol</span><b>Ekosisteme giriş</b></div><div><span>Destek</span><b>Kurulum + eğitim</b></div></div><a class="tmr-go" href="/pages/mash-p16l">İncele <span>→</span></a></div></article>
      <article class="tmr-product"><div class="tmr-product-media"><span class="tmr-tag">RESMİ DİSTRİBÜTÖR</span><img class="tmr-product-img tmr-resin-bottle" src="${resinBottle}" alt="CRS Reçineler"></div><div class="tmr-product-body"><h3>CRS Reçineler</h3><p><b>CE Class IIa</b> biyouyumlu &amp; model reçineleri; cihazınızın parametreleriyle <b>birlikte kalibre edilmiş</b> teslim edilir.</p><div class="tmr-spec"><div><span>Sertifika</span><b>CE Class IIa</b></div><div><span>Uygulama</span><b>Model · geçici · splint · guide</b></div><div><span>Uyum</span><b>Marka bağımsız</b></div></div><a class="tmr-go" href="/pages/crs-recineler">İncele <span>→</span></a></div></article>`;

export const defaultSolutionHtml = `
<section id="cozum" class="tmr-section tmr-section-tight">
  <div class="tmr-wrap">
    <div class="tmr-index"><span class="tmr-index-number">03</span><span class="tmr-index-text">Çözüm · Üretim Ekosistemi</span><span class="tmr-index-line"></span></div>
    <div class="tmr-head"><h2>Hassasiyet cihazdan çıkmaz; <span>uyumdan çıkar.</span></h2><div class="tmr-side">Kuronun oturması üç şeyin senkronuna bağlı: <b>yazıcı, reçine, kürleme.</b> Biz üçünü birlikte kalibre edip know-how'ıyla teslim ediyoruz — elinizdeki başka marka cihaza bile.</div></div>
    <div class="tmr-products tmr-products-slider" aria-label="Çözüm ürünleri">
      <div class="tmr-products-track">${solutionProductCards}${solutionProductCards}${solutionProductCards}
      </div>
    </div>
  </div>
</section>`;

export const defaultCuringHtml = `
<section class="tmr-section tmr-dark" id="kurleme">
  <div class="tmr-wrap">
    <div class="tmr-index"><span class="tmr-index-number">04</span><span class="tmr-index-text">Kritik Son Adım</span><span class="tmr-index-line"></span></div>
    <div class="tmr-head"><h2>Sadece yazıcı değil. Sonucu <span>kürleme</span> tamamlar.</h2><div class="tmr-side">Baskı, cihazdan çıktığında bitmemiştir. Yanlış kürlenen iş, <b>doğru basılmış olsa bile</b> başarısız olur. İşte üç sebep:</div></div>
    <div class="tmr-why-grid"><article><div>SEBEP 01</div><h4>Mekanik dayanım</h4><p>Eksik kürleme (undercure) kırılganlık demek — geçici kron ve köprülerin <b>sık kırılmasının</b> en yaygın görünmez sebebi.</p></article><article><div>SEBEP 02</div><h4>Ölçüsel doğruluk</h4><p>Fazla kürleme (overcure) malzemeyi <b>çeker ve deforme eder</b>. Yazıcıda kazanılan ±20 µm, kürleme ünitesinde kaybedilir.</p></article><article><div>SEBEP 03</div><h4>Biyouyumluluk &amp; renk</h4><p>Doğru dönüşüm derecesi <b>monomer salınımını</b> engeller; renk stabilitesi ve hasta güvenliği sağlar.</p></article></div>
    <div class="tmr-products tmr-products-two"><article class="tmr-product"><div class="tmr-product-media"><span class="tmr-tag tmr-lime-tag">YIKAMA · KÜRLEME</span><img class="tmr-product-img tmr-machine-phrozen" src="${phrozenWashCureKit}" alt="Phrozen Wash &amp; Cure Kit"></div><div class="tmr-product-body"><h3>Phrozen Wash &amp; Cure Kit</h3><p>8L yıkama istasyonu ve kuru+kürleme moduyla baskı sonrası süreci <b>temizleme, kurutma ve 405nm UV kürleme</b> olarak tek akışta toplar.</p><div class="tmr-spec"><div><span>Yıkama hacmi</span><b>8 L</b></div><div><span>Kürleme</span><b>405 nm UV</b></div></div><a class="tmr-go" href="https://uk.phrozen3d.com/products/wash-cure-kit">İncele <span>→</span></a></div></article><article class="tmr-product"><div class="tmr-product-media"><span class="tmr-tag tmr-lime-tag">YIKAMA · KÜRLEME</span><img class="tmr-product-img tmr-machine-uw02" src="${crealityUW02}" alt="Creality UW02 - Yıkama &amp; Kürleme Cihazı"></div><div class="tmr-product-body"><h3>Creality UW02 - Yıkama &amp; Kürleme Cihazı</h3><p>Kürleme, polimer malzemelerin <b>sertleştirilme sürecidir</b>. 3D baskı tamamlandıktan sonra ürünün boyutsal kararlılığını ve yüzey dayanımını destekler.</p><div class="tmr-spec"><div><span>Görev</span><b>Yıkama + kürleme</b></div><div><span>Uyum</span><b>P16L + CRS</b></div></div><a class="tmr-go" href="https://3mash.com/yikama-kurleme-cihazlari">İncele <span>→</span></a></div></article></div>
    <p class="tmr-readmore">Derine inmek isteyenlere, Mash Academy'den: <a href="https://3mash.com/blog/dental-3d-baskida-overcure-ve-undercure-nedir-en-dogru-kurleme-icin-kapsamli-rehber">Overcure ve Undercure Nedir?</a> · <a href="https://3mash.com/blog/dental-3d-baskida-dogru-dalga-boyu-secimi-385nm-mi-405nm-mi">385nm mi 405nm mi?</a></p>
  </div>
</section>`;

export const defaultRoiHtml = `<div class="tmr-roi"><div class="tmr-wrap"><div class="tmr-roi-num"><span>YATIRIMIN GERİ DÖNÜŞÜ</span><b>&lt; 6 ay</b></div><p>3mash ekosistemine geçen bir klinik, yatırımını <b>6 aydan kısa sürede</b> geri kazanma potansiyeline sahip. Sonrasında bu verimlilik her yıl sürer: <b>yılda $72–162K'ya varan tasarruf potansiyeli.</b></p><a class="tmr-btn" href="#hesap">Kliniğiniz için hesaplayalım →</a></div></div>`;

export const defaultEcosystemHtml = `<section id="ekosistem" class="tmr-section"><div class="tmr-wrap"><div class="tmr-index"><span class="tmr-index-number">05</span><span class="tmr-index-text">Uçtan Uca</span><span class="tmr-index-line"></span></div><div class="tmr-head"><h2>Dijital akışın her parçası, <span>tek çatı altında.</span></h2><div class="tmr-side">Cihaz satıp gitmiyoruz: doğru ürün için <b>danışmanlık</b>, sürdürülebilirlik için <b>Academy eğitimleri</b>, satış sonrasında teknisyen + mühendis <b>teknik destek.</b></div></div><div class="tmr-eco"><a href="https://3mash.com/3d-yazicilar"><span class="tmr-eco-icon"><img src="${ecoPrinterIcon}" alt="" aria-hidden="true"></span><span>3D Yazıcılar</span></a><a href="https://3mash.com/dental-3d-yazici-recineleri"><span class="tmr-eco-icon"><img src="${ecoResinIcon}" alt="" aria-hidden="true"></span><span>Dental Reçineler</span></a><a href="https://3mash.com/yikama-kurleme-cihazlari"><span class="tmr-eco-icon"><img src="${ecoScannerIcon}" alt="" aria-hidden="true"></span><span>Yıkama &amp; Kürleme</span></a><a href="https://3mash.com/masasustu-tarayicilar"><span class="tmr-eco-icon"><img src="${ecoCuringIcon}" alt="" aria-hidden="true"></span><span>Masaüstü Tarayıcılar</span></a><a href="https://3mash.com/zirkon-bloklar"><span class="tmr-eco-icon"><img src="${ecoBlocksIcon}" alt="" aria-hidden="true"></span><span>Zirkon Bloklar</span></a><a href="https://3mash.com/dental-firinlar"><span class="tmr-eco-icon"><img src="${ecoOvenIcon}" alt="" aria-hidden="true"></span><span>Dental Fırınlar</span></a></div></div></section>`;

export const defaultTrustHtml = `<section id="guven" class="tmr-section tmr-section-tight"><div class="tmr-wrap"><div class="tmr-index"><span class="tmr-index-number">06</span><span class="tmr-index-text">Referanslar</span><span class="tmr-index-line"></span></div><div class="tmr-head"><h2>Türkiye'nin en büyük lab'ları neden <span>bizimle üretiyor?</span></h2><div class="tmr-side">Kısa cevap hep aynı: tutarlılık. <b>580+</b> dental laboratuvar ve klinik bu sistemle üretiyor, çünkü sonuç <b>her seferinde</b> aynı çıkıyor.</div></div><div class="tmr-testimonials"><article class="tmr-testimonial tmr-featured"><div class="tmr-quote">“</div><p>Profesyoneller mutlak başarı için profesyonellere güvenir. Ekipman seçimi, temini, eğitimi ve kullanımında Mash ile iş birliği yapıyoruz.</p><div class="tmr-who"><img class="tmr-avatar" src="${profileMehmet}" alt="Mehmet İşlek"><div><b>Mehmet İşlek</b><small>ATTELIA · Kurucu Başhekim — 22 yıldır gülümseme tasarlayan klinik</small></div></div></article><article class="tmr-testimonial"><div class="tmr-quote">“</div><p>Yenilikçi ve yaratıcı. Donanım, yazılım ve malzemelerde uzun vadeli, başarılı bir iş birliği.</p><div class="tmr-who"><img class="tmr-avatar" src="${profileBerkan}" alt="Berkan Öztaş"><div><b>Berkan Öztaş</b><small>DENTEK · Genel Müd. Yard.</small></div></div></article><article class="tmr-testimonial"><div class="tmr-quote">“</div><p>Sorunları biz daha yaşamadan çözmüşler. Her zaman aynı kalitede üretim — mükemmel sonuçlar.</p><div class="tmr-who"><img class="tmr-avatar" src="${profileGoksel}" alt="Göksel Pişkin"><div><b>Göksel Pişkin</b><small>MIKRO LAB · Kurucu Ortak</small></div></div></article></div><div class="tmr-trusted">${trustedLabelMarkup}${bundledTrustedLogos}</div></div></section>`;

export const defaultFaqHtml = `<section id="sss" class="tmr-section tmr-section-tight"><div class="tmr-wrap"><div class="tmr-index"><span class="tmr-index-number">07</span><span class="tmr-index-text">Sık Sorulanlar</span><span class="tmr-index-line"></span></div><div class="tmr-head"><h2>Kısa, net cevaplar.</h2><div class="tmr-side">En kritik kararları hızlı vermeniz için, klinik ve laboratuvarlardan gelen soruları net cevaplarla topladık.</div></div><div class="tmr-faq"><details open><summary>Dental 3D baskıda ölçüsel hassasiyet neden bu kadar önemli?<span>+</span></summary><div>Çünkü bir restorasyonun ilk seferde oturması doğrudan ölçüsel hassasiyete bağlıdır. Ulusal ölçekli klinik verilerde kron tekrarlarının en sık sebepleri <b>proksimal uyumsuzluk, marjinal hatalar ve estetik başarısızlıktır</b> — üçü de birer hassasiyet problemidir. 3mash ekosistemi <b>±20 µm</b> boyutsal hassasiyeti, tek seferlik değil <b>her baskıda</b> tekrar edilebilir şekilde sağlar; bu da tekrar oranını ve gizli maliyeti düşürür.</div></details><details><summary>Bir kron tekrarının (remake) maliyeti gerçekte ne kadar?<span>+</span></summary><div>Tahminî olarak <b>~500 dolar</b> — ve bu tutarın büyük kısmı lab ücreti değil, <b>koltuk süresidir</b> (yeniden prep, ölçü ve yapıştırma randevusu). Klinik işletme gideri saatte ~$375 modellenir; tek bir tekrar bunun çoğunu tüketir. Kendi kalemlerinizle hesaplamak için <a href="3MASH-Maliyet-Detay.html">maliyet detay sayfamıza</a> bakabilirsiniz.</div></details><details><summary>3D baskıda kürleme (post-curing) neden kritik?<span>+</span></summary><div>Çünkü baskı, cihazdan çıktığında henüz bitmemiştir. Yetersiz kürleme (undercure) <b>kırılganlık</b>, fazla kürleme (overcure) ise <b>deformasyon</b> yaratır — yazıcıda kazandığınız hassasiyeti kürlemede kaybedebilirsiniz. 3mash'in akıllı kürleme cihazı parametreleri otomatik yönetir ve bu riski kullanıcı hatasından arındırır.</div></details><details><summary>3mash yalnızca cihaz mı satıyor?<span>+</span></summary><div>Hayır. 3mash entegre bir <b>üretim ekosistemi</b> sunar: yazıcı, reçine ve kürlemeyi birlikte kalibre eder; danışmanlık, Mash Academy eğitimleri ve <b>diş teknisyeni + mühendislerden</b> oluşan satış sonrası teknik destekle tüm süreçte yanınızda olur.</div></details><details><summary>Elimdeki başka marka yazıcıyla çalışır mısınız?<span>+</span></summary><div>Evet. Hem reçine hem printer know-how'una sahip olduğumuz için çözümlerimiz <b>marka bağımsızdır</b>; mevcut cihazınızın parametrelerini optimize ederek onu da aynı sonuca getirebiliriz.</div></details></div></div></section>`;

export const defaultFinalHtml = `<section class="tmr-final"><div class="tmr-wrap"><h2>Bu görünmez kaybı <span>birlikte azaltalım.</span></h2><p>Mevcut iş akışınızı birlikte inceleyelim; kaybın nerede oluştuğunu birlikte görelim ve size uygun ekosistemi kuralım — <b>elinizdeki cihazlarla bile.</b></p><div><a class="tmr-btn tmr-btn-lime" href="https://3mash.com/pages/iletisim">Uzmana danış — ücretsiz</a><a class="tmr-btn tmr-btn-invert" href="/pages/mash-academy">Mash Academy'yi keşfet</a></div></div></section>`;

export const defaultFooterHtml = `<footer class="tmr-footer"><div class="tmr-wrap"><div class="tmr-footer-cols"><div><a class="tmr-footer-logo" href="/"><img src="${threeMashLogoImage}" alt="3MASH"><b>mash</b></a><p>Dental klinik ve laboratuvarlar için entegre 3D baskı ekosistemi: yazıcı, reçine, kürleme ve üretim know-how'ı — birlikte.</p></div><div class="tmr-footer-link-col" data-tmr-footer-sync="products"><h6>Ürünler</h6><a href="/3d-yazicilar">3D Yazıcılar</a><a href="/dental-3d-yazici-recineleri">Dental Reçineler</a><a href="/yikama-kurleme-cihazlari">Yıkama &amp; Kürleme</a><a href="/masasustu-tarayicilar">Masaüstü Tarayıcılar</a><a href="/zirkon-bloklar">Zirkon Bloklar</a><a href="/dental-firinlar">Dental Fırınlar</a></div><div class="tmr-footer-link-col"><h6>Şirket</h6><a href="https://3mash.com/pages/about-us">Hakkımızda</a><a href="/pages/mash-academy">Mash Academy</a><a href="https://3mash.com/blog">Blog</a></div><div class="tmr-footer-link-col"><h6>İletişim</h6><a href="mailto:info@3mash.com">info@3mash.com</a><a href="#">Antalya Teknokent, Konyaaltı</a><a href="https://instagram.com/3mashsocial">@3mashsocial</a><div class="tmr-footer-social"><span class="tmr-footer-social-icon" aria-label="Facebook" role="img"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 8H13c-1.1 0-2 .9-2 2v2H8.8v3H11v5h3v-5h2.2l.5-3H14v-1.5c0-.3.2-.5.5-.5h2V8z"></path></svg></span><a href="https://instagram.com/3mashsocial" aria-label="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="5"></rect><circle cx="12" cy="12" r="3.5"></circle><circle cx="16.5" cy="7.5" r="0.8"></circle></svg></a><span class="tmr-footer-social-icon" aria-label="YouTube" role="img"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 8.5c.2-1.4 1-2.2 2.4-2.4C8.2 6 10.1 6 12 6s3.8 0 5.1.1c1.4.2 2.2 1 2.4 2.4.1.9.2 2.1.2 3.5s-.1 2.6-.2 3.5c-.2 1.4-1 2.2-2.4 2.4-1.3.1-3.2.1-5.1.1s-3.8 0-5.1-.1c-1.4-.2-2.2-1-2.4-2.4-.1-.9-.2-2.1-.2-3.5s.1-2.6.2-3.5z"></path><path d="m10.5 9.5 4 2.5-4 2.5z"></path></svg></span><span class="tmr-footer-social-icon" aria-label="LinkedIn" role="img"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 10v8"></path><path d="M6.5 6.5v.1"></path><path d="M10.5 18v-8"></path><path d="M10.5 13.5c0-2.1 1.2-3.5 3.1-3.5s3 1.3 3 3.7V18"></path></svg></span></div></div></div><div class="tmr-base"><span>© 2026 3MASH Teknoloji A.Ş. Tüm hakları saklıdır.</span><div class="tmr-base-meta"><span>KVKK · İade &amp; Garanti · Mesafeli Satış</span></div></div></div></footer>`;

export interface ThreeMashSectionRenderProps {
  productList?: IkasProductList;
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
  legalText?: string;
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
  solutionCard2MediaMode?: string;
  solutionCard2ShowThumbnails?: boolean;
  solutionCard2Image1Enabled?: boolean;
  solutionCard2Image2Enabled?: boolean;
  solutionCard2Image3Enabled?: boolean;
  solutionCard2Image4Enabled?: boolean;
  solutionCard2Image2Url?: unknown;
  solutionCard2Image2Alt?: string;
  solutionCard2Image3Url?: unknown;
  solutionCard2Image3Alt?: string;
  solutionCard2Image4Url?: unknown;
  solutionCard2Image4Alt?: string;
  solutionCard2VideoEnabled?: boolean;
  solutionCard2VideoUpload?: unknown;
  solutionCard2VideoUrl?: string;
  solutionCard2VideoPosterUrl?: unknown;
  solutionCard2VideoLabel?: string;
  solutionCard1VideoEnabled?: boolean;
  solutionCard1VideoUpload?: unknown;
  solutionCard1VideoUrl?: string;
  solutionCard1VideoPosterUrl?: unknown;
  solutionCard1VideoLabel?: string;
  solutionCard3VideoEnabled?: boolean;
  solutionCard3VideoUpload?: unknown;
  solutionCard3VideoUrl?: string;
  solutionCard3VideoPosterUrl?: unknown;
  solutionCard3VideoLabel?: string;
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

function inlineHtml(value: string) {
  return value
    .replace(/<\/p>\s*<p[^>]*>/gi, "<br />")
    .replace(/^<p[^>]*>/i, "")
    .replace(/<\/p>$/i, "");
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
      return part.replace(matcher, (match) => `<span class="tmr-word-style">${match}</span>`);
    })
    .join("");
}

function numberInRange(value: unknown, fallback: number, min: number, max: number) {
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

function percentage(value: unknown, fallback: number, min: number, max: number) {
  return `${numberInRange(value, fallback, min, max)}%`;
}

function imageFit(value: unknown) {
  return value === "cover" || value === "fill" || value === "scale-down" ? value : "contain";
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
  return String(value ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeHtml(value: unknown) {
  return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
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
  try {
    return getSelectedProductVariant(product) || product.variants?.[0] || null;
  } catch {
    return product.variants?.[0] || null;
  }
}

function plainText(source: unknown) {
  if (typeof source !== "string") return "";
  return source.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
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
  const categoryName = product.categories?.[0]?.name || product.brand?.name || "3MASH";
  const rawDescription = (product as { shortDescription?: unknown; description?: unknown }).shortDescription || (product as { description?: unknown }).description;
  const description = truncateText(plainText(rawDescription), 145);
  const finalPrice = variant ? getProductVariantFormattedFinalPrice(variant) : "";
  const sellPrice = variant && hasProductVariantDiscount(variant) ? getProductVariantFormattedSellPrice(variant) : "";
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
    if (typeof image.image?.url === "string") return imageIdToUrl(image.image.url);
    if (typeof image.image?.src === "string") return imageIdToUrl(image.image.src);
    if (typeof image.file?.url === "string") return imageIdToUrl(image.file.url);
    if (typeof image.file?.src === "string") return imageIdToUrl(image.file.src);
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
    if (typeof link.href === "string" && link.href.trim()) return link.href.trim();
    if (typeof link.externalLink === "string" && link.externalLink.trim()) return link.externalLink.trim();
    if (typeof link.fileUrl === "string" && link.fileUrl.trim()) return link.fileUrl.trim();
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
    "/urunler/masasustu-tarayicilar": "/masasustu-tarayicilar",
    "/urunler/zirkon-bloklar": "/zirkon-bloklar",
    "/urunler/dental-firinlar": "/dental-firinlar",
  };
  return routes[normalized] || current;
}

function raw(props: object, key: string) {
  return (props as Record<string, unknown>)[key];
}

function mediaSource(source: unknown, fallback = "") {
  if (typeof source === "string" && source.trim()) {
    return imageIdToUrl(source);
  }

  if (source && typeof source === "object") {
    const media = source as {
      id?: unknown;
      url?: unknown;
      src?: unknown;
      videoUrl?: unknown;
      value?: unknown;
      video?: { url?: unknown; src?: unknown };
      file?: { url?: unknown; src?: unknown };
    };
    if (typeof media.url === "string") return imageIdToUrl(media.url);
    if (typeof media.src === "string") return imageIdToUrl(media.src);
    if (typeof media.videoUrl === "string") return imageIdToUrl(media.videoUrl);
    if (typeof media.value === "string") return imageIdToUrl(media.value);
    if (typeof media.id === "string") return imageIdToUrl(media.id);
    if (typeof media.video?.url === "string") return imageIdToUrl(media.video.url);
    if (typeof media.video?.src === "string") return imageIdToUrl(media.video.src);
    if (typeof media.file?.url === "string") return imageIdToUrl(media.file.url);
    if (typeof media.file?.src === "string") return imageIdToUrl(media.file.src);
  }

  return fallback;
}

function field(props: ThreeMashSectionRenderProps, key: string, fallback: string) {
  return value(raw(props, key), fallback);
}

function themeTokenValue(source: unknown, defaultValue: string, tokenName: string) {
  const trimmed = typeof source === "string" ? source.trim() : "";
  if (trimmed && trimmed.toLowerCase() !== defaultValue.toLowerCase()) return trimmed;
  return `var(${tokenName}, ${defaultValue})`;
}

function specs(props: ThreeMashSectionRenderProps, prefix: string, count: number, defaults: Array<[string, string]>) {
  return defaults
    .slice(0, count)
    .map(([label, text], index) => {
      const number = index + 1;
      return `<div><span>${field(props, `${prefix}Spec${number}Label`, label)}</span><b>${field(props, `${prefix}Spec${number}Value`, text)}</b></div>`;
    })
    .join("");
}

function imageMediaMarkup(src: string, alt: string, imageClass: string) {
  return `<img class="tmr-product-img ${imageClass}" src="${escapeAttr(src)}" alt="${escapeAttr(alt)}">`;
}

function videoMediaMarkup(src: string, poster: string) {
  return `<video class="tmr-product-video" src="${escapeAttr(src)}" poster="${escapeAttr(poster)}" muted autoplay loop playsinline preload="metadata"></video><button class="tmr-video-toggle" type="button" aria-label="Video duraklat" data-tmr-video-toggle="true"><span class="tmr-video-pause" aria-hidden="true"></span><span class="tmr-video-play" aria-hidden="true"></span></button>`;
}

function p1dInteractiveMediaMarkup(tag: string, imageSrc: string, alt: string) {
  const safeImage = escapeAttr(imageSrc);
  const safeAlt = escapeAttr(alt || "MASH P1D");
  const safeTag = inlineHtml(tag || "PROFESYONEL");
  const safeVideo = escapeAttr(p1dShowcaseVideo);

  return `<div class="tmr-product-media tmr-product-media-interactive tmr-product-media-solutionCard1"><span class="tmr-tag">${safeTag}</span><div class="tmr-media-main"><img class="tmr-product-img tmr-machine-printer" src="${safeImage}" alt="${safeAlt}"></div><div class="tmr-media-thumbs"><button class="tmr-media-thumb is-active" type="button" aria-label="${safeAlt}" data-tmr-product-media="true" data-tmr-media-type="image" data-tmr-media-src="${safeImage}" data-tmr-media-alt="${safeAlt}" data-tmr-media-image-class="tmr-machine-printer"><img src="${safeImage}" alt="${safeAlt}"></button><button class="tmr-media-thumb tmr-media-thumb-video" type="button" aria-label="Video" data-tmr-product-media="true" data-tmr-media-type="video" data-tmr-media-src="${safeVideo}" data-tmr-media-poster="${safeImage}"><video src="${safeVideo}" poster="${safeImage}" muted playsinline preload="metadata"></video><b>Video</b></button></div></div>`;
}

function p16lInteractiveMediaMarkup(tag: string, imageSrc: string, alt: string) {
  const safeImage = escapeAttr(imageSrc);
  const safeAlt = escapeAttr(alt || "MASH P16L");
  const safeTag = inlineHtml(tag || "GİRİŞ SEGMENTİ");
  const safeVideo = escapeAttr(p16lShowcaseVideo);

  return `<div class="tmr-product-media tmr-product-media-interactive tmr-product-media-solutionCard2 tmr-product-media-p16l"><span class="tmr-tag">${safeTag}</span><div class="tmr-media-main tmr-p16l-main"><img class="tmr-product-img tmr-machine-p16l" src="${safeImage}" alt="${safeAlt}"></div><div class="tmr-media-thumbs"><button class="tmr-media-thumb is-active" type="button" aria-label="${safeAlt}" data-tmr-product-media="true" data-tmr-media-type="image" data-tmr-media-src="${safeImage}" data-tmr-media-alt="${safeAlt}" data-tmr-media-image-class="tmr-machine-p16l"><img src="${safeImage}" alt="${safeAlt}"></button><button class="tmr-media-thumb tmr-media-thumb-video" type="button" aria-label="Video" data-tmr-product-media="true" data-tmr-media-type="video" data-tmr-media-src="${safeVideo}" data-tmr-media-poster="${safeImage}"><video src="${safeVideo}" poster="${safeImage}" muted playsinline preload="metadata"></video><b>Video</b></button></div></div>`;
}

function enhanceLegacySolutionMedia(markup: string) {
  let enhanced = markup;

  if (enhanced.includes("tmr-machine-printer") && !enhanced.includes("data-tmr-media-src")) {
    enhanced = enhanced.replace(
      /<div class="tmr-product-media tmr-product-media-interactive tmr-product-media-solutionCard1"><span class="tmr-tag">([^<]*)<\/span><div class="tmr-media-main"><img class="tmr-product-img tmr-machine-printer" src="([^"]*)" alt="([^"]*)"><\/div><\/div>/g,
      (_match, tag: string, src: string, alt: string) => p1dInteractiveMediaMarkup(tag, src, alt),
    );
  }

  if (!enhanced.includes("tmr-machine-p16l") || enhanced.includes("tmr-product-media-solutionCard2")) return enhanced;

  return enhanced.replace(
    /<div class="tmr-product-media"><span class="tmr-tag">([^<]*)<\/span><img class="tmr-product-img tmr-machine-p16l" src="([^"]*)" alt="([^"]*)"><\/div>/g,
    (_match, tag: string, src: string, alt: string) => p16lInteractiveMediaMarkup(tag, src, alt),
  );
}

function interactiveMedia(
  props: ThreeMashSectionRenderProps,
  prefix: string,
  defaults: { image: string; imageAlt: string; imageClass: string; tag: string; tagClass?: string },
  images: Array<{ id: string; src: string; alt: string }>,
  bundledVideo: string,
  defaultMode = "image1",
  forceBundledVideo = false,
) {
  const videoUrl = value(raw(props, `${prefix}VideoUrl`), "");
  const videoSrc = mediaSource(raw(props, `${prefix}VideoUpload`), videoUrl || bundledVideo);
  const videoEnabled = solutionCardVideosEnabled && Boolean(videoSrc) && (raw(props, `${prefix}VideoEnabled`) !== false || (forceBundledVideo && Boolean(bundledVideo)));
  const activeMode = value(raw(props, `${prefix}MediaMode`), defaultMode);
  const activeImage = images.find((item) => item.id === activeMode) || images[0];
  const showVideo = activeMode === "video" && videoEnabled;
  const tagClass = defaults.tagClass ? ` ${defaults.tagClass}` : "";
  const poster = imageSource(raw(props, `${prefix}VideoPosterUrl`), activeImage?.src || "");
  const hasImage = Boolean(activeImage?.src);
  const mainMedia = showVideo
    ? videoMediaMarkup(videoSrc, poster)
    : hasImage
      ? imageMediaMarkup(activeImage.src, activeImage.alt || defaults.imageAlt, defaults.imageClass)
      : `<div class="tmr-media-placeholder"><span>Görsel / Video</span></div>`;
  const hasThumbnails = images.length > 0 || videoEnabled;
  const thumbnails = raw(props, `${prefix}ShowThumbnails`) === false || !hasThumbnails
    ? ""
    : `<div class="tmr-media-thumbs">${images
        .map((item) => `<button class="tmr-media-thumb${item.id === activeMode && !showVideo ? " is-active" : ""}" type="button" aria-label="${escapeAttr(item.alt)}" data-tmr-product-media="true" data-tmr-media-type="image" data-tmr-media-src="${escapeAttr(item.src)}" data-tmr-media-alt="${escapeAttr(item.alt)}" data-tmr-media-image-class="${escapeAttr(defaults.imageClass)}"><img src="${escapeAttr(item.src)}" alt="${escapeAttr(item.alt)}"></button>`)
        .join("")}${videoEnabled ? `<button class="tmr-media-thumb tmr-media-thumb-video${showVideo ? " is-active" : ""}" type="button" aria-label="${escapeAttr(field(props, `${prefix}VideoLabel`, "Video"))}" data-tmr-product-media="true" data-tmr-media-type="video" data-tmr-media-src="${escapeAttr(videoSrc)}" data-tmr-media-poster="${escapeAttr(poster)}"><video src="${escapeAttr(videoSrc)}" poster="${escapeAttr(poster)}" muted playsinline preload="metadata"></video><b>${field(props, `${prefix}VideoLabel`, "Video")}</b></button>` : ""}</div>`;

  return `<div class="tmr-product-media tmr-product-media-interactive tmr-product-media-${prefix}${prefix === "solutionCard2" ? " tmr-product-media-p16l" : ""}${showVideo ? " is-video-active" : ""}"><span class="tmr-tag${tagClass}">${field(props, `${prefix}Tag`, defaults.tag)}</span><div class="tmr-media-main${prefix === "solutionCard2" ? " tmr-p16l-main" : ""}">${mainMedia}</div>${thumbnails}</div>`;
}

function p16lMedia(props: ThreeMashSectionRenderProps, defaults: { image: string; imageAlt: string; imageClass: string; tag: string; tagClass?: string }) {
  const images = [
    {
      id: "image1",
      enabled: raw(props, "solutionCard2Image1Enabled") !== false,
      src: imageSource(raw(props, "solutionCard2ImageUrl"), defaults.image),
      alt: field(props, "solutionCard2ImageAlt", defaults.imageAlt),
    },
    {
      id: "image2",
      enabled: raw(props, "solutionCard2Image2Enabled") === true,
      src: imageSource(raw(props, "solutionCard2Image2Url"), ""),
      alt: field(props, "solutionCard2Image2Alt", "MASH P16L alternatif görsel 1"),
    },
    {
      id: "image3",
      enabled: raw(props, "solutionCard2Image3Enabled") === true,
      src: imageSource(raw(props, "solutionCard2Image3Url"), ""),
      alt: field(props, "solutionCard2Image3Alt", "MASH P16L alternatif görsel 2"),
    },
    {
      id: "image4",
      enabled: raw(props, "solutionCard2Image4Enabled") === true,
      src: imageSource(raw(props, "solutionCard2Image4Url"), ""),
      alt: field(props, "solutionCard2Image4Alt", "MASH P16L alternatif görsel 3"),
    },
  ].filter((item) => item.enabled && item.src);

  return interactiveMedia(props, "solutionCard2", defaults, images, p16lShowcaseVideo, "image1", true);
}

function resinMedia(props: ThreeMashSectionRenderProps, defaults: { image: string; imageAlt: string; imageClass: string; tag: string; tagClass?: string }) {
  const image = imageSource(raw(props, "solutionCard3ImageUrl"), defaults.image);
  const alt = field(props, "solutionCard3ImageAlt", defaults.imageAlt);
  return interactiveMedia(props, "solutionCard3", defaults, [{ id: "image1", src: image, alt }], resinShowcaseVideo);
}

function p1dMedia(props: ThreeMashSectionRenderProps, defaults: { image: string; imageAlt: string; imageClass: string; tag: string; tagClass?: string }) {
  const image = imageSource(raw(props, "solutionCard1ImageUrl"), defaults.image);
  const alt = field(props, "solutionCard1ImageAlt", defaults.imageAlt);
  return interactiveMedia(props, "solutionCard1", defaults, image ? [{ id: "image1", src: image, alt }] : [], p1dShowcaseVideo, "image1", true);
}

function productCard(
  props: ThreeMashSectionRenderProps,
  prefix: string,
  defaults: {
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
  },
) {
  const image = imageSource(raw(props, `${prefix}ImageUrl`), defaults.image);
  const alt = field(props, `${prefix}ImageAlt`, defaults.imageAlt);
  const tagClass = defaults.tagClass ? ` ${defaults.tagClass}` : "";
  const media = prefix === "solutionCard2"
    ? p16lMedia(props, defaults)
    : prefix === "solutionCard1"
      ? p1dMedia(props, defaults)
    : prefix === "solutionCard3"
      ? resinMedia(props, defaults)
      : `<div class="tmr-product-media"><span class="tmr-tag${tagClass}">${field(props, `${prefix}Tag`, defaults.tag)}</span><img class="tmr-product-img ${defaults.imageClass}" src="${escapeAttr(image)}" alt="${escapeAttr(alt)}"></div>`;

  return `<article class="tmr-product">${media}<div class="tmr-product-body"><h3>${field(props, `${prefix}Title`, defaults.title)}</h3><p>${field(props, `${prefix}DescriptionHtml`, defaults.descriptionHtml)}</p><div class="tmr-spec">${specs(props, prefix, defaults.specs.length, defaults.specs)}</div><a class="tmr-go" href="${escapeAttr(linkHref(raw(props, `${prefix}CtaHref`), defaults.ctaHref))}">${field(props, `${prefix}CtaText`, defaults.ctaText)} <span>→</span></a></div></article>`;
}

export function threeMashThemeStyle(props: ThreeMashSectionRenderProps) {
  return {
    "--tmr-bg": themeTokenValue(props.backgroundColor, "#FAFAF7", "--tm-theme-bg"),
    "--tmr-text": themeTokenValue(props.textColor, "#0E0E0C", "--tm-theme-text"),
    "--tmr-sub": themeTokenValue(props.subTextColor, "#55554E", "--tm-theme-sub"),
    "--tmr-muted": themeTokenValue(props.mutedTextColor, "#8F8F86", "--tm-theme-muted"),
    "--tmr-line": themeTokenValue(props.lineColor, "#E6E6E0", "--tm-theme-line"),
    "--tmr-panel": themeTokenValue(props.panelColor, "#FFFFFF", "--tm-theme-panel"),
    "--tmr-dark": themeTokenValue(props.darkColor, "#0E0E0C", "--tm-theme-dark"),
    "--tmr-accent": themeTokenValue(props.accentColor, "#C7F136", "--tm-theme-accent"),
    "--tmr-background-glow-factor": raw(props, "showBackgroundGlow") === false ? 0 : 1,
    "--tmr-accent-text": themeTokenValue(props.accentTextColor, "#3D4D0E", "--tm-theme-accent-text"),
    "--tmr-accent-soft": themeTokenValue(props.accentSoftColor, "#F2F8DC", "--tm-theme-accent-soft"),
    "--tmr-danger": themeTokenValue(props.dangerColor, "#E2492F", "--tm-theme-danger"),
    "--tmr-word-color": themeTokenValue(props.styledPhraseColor, "#C7F136", "--tm-theme-accent"),
    "--tmr-word-weight": props.styledPhraseBold ? "800" : "inherit",
    "--tmr-word-style": props.styledPhraseItalic ? "italic" : "inherit",
    "--tmr-solution-carousel-duration": `${numberInRange(raw(props, "carouselDurationSeconds"), 24, 4, 90)}s`,
    "--tmr-solution-edge-fade-width": `${numberInRange(raw(props, "edgeFadeWidth"), 44, 0, 120)}px`,
    "--tmr-solution-card-gap": `${numberInRange(raw(props, "cardGap"), 22, 8, 48)}px`,
    "--tmr-solution-card-radius": `${numberInRange(raw(props, "cardRadius"), 20, 0, 36)}px`,
    "--tmr-solution-media-start": value(raw(props, "cardMediaStartColor"), "#F4F4EF"),
    "--tmr-solution-media-end": value(raw(props, "cardMediaEndColor"), "#E9E9E2"),
    "--tmr-solution-image-width": `${numberInRange(raw(props, "productImageWidth"), 170, 48, 280)}px`,
    "--tmr-solution-image-height": `${numberInRange(raw(props, "productImageHeight"), 156, 48, 240)}px`,
    "--tmr-solution-image-x": `${numberInRange(raw(props, "productImageXOffset"), 0, -90, 90)}px`,
    "--tmr-solution-image-y": `${numberInRange(raw(props, "productImageYOffset"), 0, -90, 90)}px`,
    "--tmr-solution-image-fit": imageFit(raw(props, "productImageFit")),
    "--tmr-solution-image-opacity": percentage(raw(props, "productImageOpacity"), 100, 0, 100),
    "--tmr-solution-image-brightness": percentage(raw(props, "productImageBrightness"), 100, 0, 220),
    "--tmr-solution-image-contrast": percentage(raw(props, "productImageContrast"), 100, 0, 220),
    "--tmr-solution-image-saturation": percentage(raw(props, "productImageSaturation"), 100, 0, 260),
    "--tmr-solution-image-hue": `${numberInRange(raw(props, "productImageHue"), 0, -180, 180)}deg`,
    "--tmr-solution-image-invert": percentage(raw(props, "productImageInvert"), 0, 0, 100),
    "--tmr-curing-background": themeTokenValue(raw(props, "backgroundColor"), "#0E0E0C", "--tm-theme-dark"),
    "--tmr-curing-reason-bg": value(raw(props, "reasonCardBackgroundColor"), "#161612"),
    "--tmr-curing-product-media-start": value(raw(props, "productMediaStartColor"), "#1D1D17"),
    "--tmr-curing-product-media-end": value(raw(props, "productMediaEndColor"), "#14140F"),
    "--tmr-curing-reason-radius": `${numberInRange(raw(props, "reasonCardRadius"), 18, 0, 36)}px`,
    "--tmr-curing-product-radius": `${numberInRange(raw(props, "productCardRadius"), 20, 0, 36)}px`,
    "--tmr-curing-image-width": `${numberInRange(raw(props, "productImageWidth"), 205, 48, 340)}px`,
    "--tmr-curing-image-height": `${numberInRange(raw(props, "productImageHeight"), 190, 48, 300)}px`,
    "--tmr-curing-image-x": `${numberInRange(raw(props, "productImageXOffset"), 0, -90, 90)}px`,
    "--tmr-curing-image-y": `${numberInRange(raw(props, "productImageYOffset"), 0, -90, 90)}px`,
    "--tmr-curing-image-fit": imageFit(raw(props, "productImageFit")),
    "--tmr-curing-image-opacity": percentage(raw(props, "productImageOpacity"), 100, 0, 100),
    "--tmr-curing-image-brightness": percentage(raw(props, "productImageBrightness"), 100, 0, 220),
    "--tmr-curing-image-contrast": percentage(raw(props, "productImageContrast"), 100, 0, 220),
    "--tmr-curing-image-saturation": percentage(raw(props, "productImageSaturation"), 100, 0, 260),
    "--tmr-curing-image-hue": `${numberInRange(raw(props, "productImageHue"), 0, -180, 180)}deg`,
    "--tmr-curing-image-invert": percentage(raw(props, "productImageInvert"), 0, 0, 100),
    "--tmr-roi-bg": themeTokenValue(raw(props, "backgroundColor"), "#C7F136", "--tm-theme-accent"),
    "--tmr-roi-text": themeTokenValue(raw(props, "textColor"), "#0E0E0C", "--tm-theme-text"),
    "--tmr-roi-sub": themeTokenValue(raw(props, "subTextColor"), "#2C3A09", "--tm-theme-accent-text"),
    "--tmr-roi-eyebrow": themeTokenValue(raw(props, "accentTextColor"), "#3D4D0E", "--tm-theme-accent-text"),
    "--tmr-roi-button-bg": value(raw(props, "buttonBackgroundColor"), "#0E0E0C"),
    "--tmr-roi-button-text": value(raw(props, "buttonTextColor"), "#FFFFFF"),
    "--tmr-roi-button-radius": `${numberInRange(raw(props, "buttonRadius"), 10, 0, 32)}px`,
    "--tmr-eco-icon-width": `${numberInRange(raw(props, "iconImageWidth"), 44, 12, 96)}px`,
    "--tmr-eco-icon-height": `${numberInRange(raw(props, "iconImageHeight"), 44, 12, 96)}px`,
    "--tmr-eco-icon-x": `${numberInRange(raw(props, "iconImageXOffset"), 0, -32, 32)}px`,
    "--tmr-eco-icon-y": `${numberInRange(raw(props, "iconImageYOffset"), 0, -32, 32)}px`,
    "--tmr-eco-icon-fit": imageFit(raw(props, "iconImageFit")),
    "--tmr-eco-icon-opacity": percentage(raw(props, "iconImageOpacity"), 100, 0, 100),
    "--tmr-eco-icon-brightness": percentage(raw(props, "iconImageBrightness"), 100, 0, 220),
    "--tmr-eco-icon-contrast": percentage(raw(props, "iconImageContrast"), 100, 0, 220),
    "--tmr-eco-icon-saturation": percentage(raw(props, "iconImageSaturation"), 100, 0, 260),
    "--tmr-eco-icon-hue": `${numberInRange(raw(props, "iconImageHue"), 0, -180, 180)}deg`,
    "--tmr-eco-icon-invert": percentage(raw(props, "iconImageInvert"), 0, 0, 100),
    "--tmr-eco-item-radius": `${numberInRange(raw(props, "itemRadius"), 16, 0, 32)}px`,
    "--tmr-eco-icon-box-radius": `${numberInRange(raw(props, "iconBoxRadius"), 14, 0, 32)}px`,
    "--tmr-eco-diagram-width": `${numberInRange(raw(props, "diagramImageWidth"), 940, 260, 1800)}px`,
    "--tmr-eco-diagram-height": `${numberInRange(raw(props, "diagramImageHeight"), 300, 120, 900)}px`,
    "--tmr-eco-diagram-x": `${numberInRange(raw(props, "diagramImageXOffset"), 0, -160, 160)}px`,
    "--tmr-eco-diagram-y": `${numberInRange(raw(props, "diagramImageYOffset"), 0, -120, 120)}px`,
    "--tmr-eco-diagram-fit": imageFit(raw(props, "diagramImageFit")),
    "--tmr-eco-diagram-opacity": percentage(raw(props, "diagramImageOpacity"), 100, 0, 100),
    "--tmr-eco-diagram-brightness": percentage(raw(props, "diagramImageBrightness"), 100, 0, 220),
    "--tmr-eco-diagram-contrast": percentage(raw(props, "diagramImageContrast"), 100, 0, 220),
    "--tmr-eco-diagram-saturation": percentage(raw(props, "diagramImageSaturation"), 100, 0, 260),
    "--tmr-eco-diagram-hue": `${numberInRange(raw(props, "diagramImageHue"), 0, -180, 180)}deg`,
    "--tmr-eco-diagram-invert": percentage(raw(props, "diagramImageInvert"), 0, 0, 100),
    "--tmr-trust-avatar-width": `${numberInRange(raw(props, "profileImageWidth"), 58, 24, 120)}px`,
    "--tmr-trust-avatar-height": `${numberInRange(raw(props, "profileImageHeight"), 58, 24, 120)}px`,
    "--tmr-trust-avatar-x": `${numberInRange(raw(props, "profileImageXOffset"), 0, -40, 40)}px`,
    "--tmr-trust-avatar-y": `${numberInRange(raw(props, "profileImageYOffset"), 0, -40, 40)}px`,
    "--tmr-trust-avatar-fit": imageFit(raw(props, "profileImageFit")),
    "--tmr-trust-avatar-opacity": percentage(raw(props, "profileImageOpacity"), 100, 0, 100),
    "--tmr-trust-avatar-brightness": percentage(raw(props, "profileImageBrightness"), 100, 0, 220),
    "--tmr-trust-avatar-contrast": percentage(raw(props, "profileImageContrast"), 100, 0, 220),
    "--tmr-trust-avatar-saturation": percentage(raw(props, "profileImageSaturation"), 100, 0, 260),
    "--tmr-trust-avatar-hue": `${numberInRange(raw(props, "profileImageHue"), 0, -180, 180)}deg`,
    "--tmr-trust-avatar-invert": percentage(raw(props, "profileImageInvert"), 0, 0, 100),
    "--tmr-trust-logo-height": `${numberInRange(raw(props, "trustedLogoHeight"), 58, 12, 120)}px`,
    "--tmr-trust-logo-opacity": percentage(raw(props, "trustedLogoOpacity"), 75, 0, 100),
    "--tmr-trust-logo-grayscale": percentage(raw(props, "trustedLogoGrayscale"), 100, 0, 100),
    "--tmr-trust-card-radius": `${numberInRange(raw(props, "cardRadius"), 20, 0, 36)}px`,
    "--tmr-final-bg": themeTokenValue(raw(props, "backgroundColor"), "#0E0E0C", "--tm-theme-dark"),
    "--tmr-final-text": value(raw(props, "textColor"), "#FFFFFF"),
    "--tmr-final-sub": value(raw(props, "subTextColor"), "#A5A59A"),
    "--tmr-final-primary-bg": themeTokenValue(raw(props, "primaryButtonBackgroundColor"), "#C7F136", "--tm-theme-accent"),
    "--tmr-final-primary-text": themeTokenValue(raw(props, "primaryButtonTextColor"), "#0E0E0C", "--tm-theme-text"),
    "--tmr-final-secondary-text": value(raw(props, "secondaryButtonTextColor"), "#FFFFFF"),
    "--tmr-final-button-radius": `${numberInRange(raw(props, "buttonRadius"), 10, 0, 32)}px`,
    "--tmr-footer-bg": themeTokenValue(raw(props, "backgroundColor"), "#0E0E0C", "--tm-theme-dark"),
    "--tmr-footer-text": value(raw(props, "textColor"), "#FFFFFF"),
    "--tmr-footer-muted": value(raw(props, "mutedTextColor"), "#8B8B80"),
    "--tmr-footer-line": value(raw(props, "lineColor"), "#26261F"),
    "--tmr-footer-logo-image-width": `${numberInRange(raw(props, "logoImageWidth"), 32, 12, 120)}px`,
    "--tmr-footer-logo-image-height": `${numberInRange(raw(props, "logoImageHeight"), 32, 12, 120)}px`,
    "--tmr-footer-logo-image-x": `${numberInRange(raw(props, "logoImageXOffset"), 0, -48, 48)}px`,
    "--tmr-footer-logo-image-y": `${numberInRange(raw(props, "logoImageYOffset"), 0, -48, 48)}px`,
    "--tmr-footer-logo-image-fit": imageFit(raw(props, "logoImageFit")),
    "--tmr-footer-logo-image-opacity": percentage(raw(props, "logoImageOpacity"), 100, 0, 100),
    "--tmr-footer-logo-image-brightness": percentage(raw(props, "logoImageBrightness"), 100, 0, 220),
    "--tmr-footer-logo-image-contrast": percentage(raw(props, "logoImageContrast"), 100, 0, 220),
    "--tmr-footer-logo-image-saturation": percentage(raw(props, "logoImageSaturation"), 100, 0, 260),
    "--tmr-footer-logo-image-hue": `${numberInRange(raw(props, "logoImageHue"), 0, -180, 180)}deg`,
    "--tmr-footer-logo-image-invert": percentage(raw(props, "logoImageInvert"), 0, 0, 100),
    "--tmr-footer-logo-svg-width": `${numberInRange(raw(props, "logoSvgWidth"), 32, 12, 120)}px`,
    "--tmr-footer-logo-svg-height": `${numberInRange(raw(props, "logoSvgHeight"), 32, 12, 120)}px`,
    "--tmr-footer-logo-svg-x": `${numberInRange(raw(props, "logoSvgXOffset"), 0, -48, 48)}px`,
    "--tmr-footer-logo-svg-y": `${numberInRange(raw(props, "logoSvgYOffset"), 0, -48, 48)}px`,
    "--tmr-footer-logo-svg-opacity": percentage(raw(props, "logoSvgOpacity"), 100, 0, 100),
    "--tmr-footer-logo-svg-brightness": percentage(raw(props, "logoSvgBrightness"), 100, 0, 220),
    "--tmr-footer-logo-svg-contrast": percentage(raw(props, "logoSvgContrast"), 100, 0, 220),
    "--tmr-footer-logo-svg-saturation": percentage(raw(props, "logoSvgSaturation"), 100, 0, 260),
    "--tmr-footer-logo-svg-hue": `${numberInRange(raw(props, "logoSvgHue"), 0, -180, 180)}deg`,
    "--tmr-footer-logo-svg-invert": percentage(raw(props, "logoSvgInvert"), 0, 0, 100),
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

const solutionContentHtml = `<div class="tmr-products tmr-products-slider" aria-label="Çözüm ürünleri">
      <div class="tmr-products-track">${solutionProductCards}${solutionProductCards}${solutionProductCards}
      </div>
    </div>`;

const curingContentHtml = `<div class="tmr-why-grid"><article><div>SEBEP 01</div><h4>Mekanik dayanım</h4><p>Eksik kürleme (undercure) kırılganlık demek — geçici kron ve köprülerin <b>sık kırılmasının</b> en yaygın görünmez sebebi.</p></article><article><div>SEBEP 02</div><h4>Ölçüsel doğruluk</h4><p>Fazla kürleme (overcure) malzemeyi <b>çeker ve deforme eder</b>. Yazıcıda kazanılan ±20 µm, kürleme ünitesinde kaybedilir.</p></article><article><div>SEBEP 03</div><h4>Biyouyumluluk &amp; renk</h4><p>Doğru dönüşüm derecesi <b>monomer salınımını</b> engeller; renk stabilitesi ve hasta güvenliği sağlar.</p></article></div>
    <div class="tmr-products tmr-products-two"><article class="tmr-product"><div class="tmr-product-media"><span class="tmr-tag tmr-lime-tag">YIKAMA · KÜRLEME</span><img class="tmr-product-img tmr-machine-phrozen" src="${phrozenWashCureKit}" alt="Phrozen Wash &amp; Cure Kit"></div><div class="tmr-product-body"><h3>Phrozen Wash &amp; Cure Kit</h3><p>8L yıkama istasyonu ve kuru+kürleme moduyla baskı sonrası süreci <b>temizleme, kurutma ve 405nm UV kürleme</b> olarak tek akışta toplar.</p><div class="tmr-spec"><div><span>Yıkama hacmi</span><b>8 L</b></div><div><span>Kürleme</span><b>405 nm UV</b></div></div><a class="tmr-go" href="https://uk.phrozen3d.com/products/wash-cure-kit">İncele <span>→</span></a></div></article><article class="tmr-product"><div class="tmr-product-media"><span class="tmr-tag tmr-lime-tag">YIKAMA · KÜRLEME</span><img class="tmr-product-img tmr-machine-uw02" src="${crealityUW02}" alt="Creality UW02 - Yıkama &amp; Kürleme Cihazı"></div><div class="tmr-product-body"><h3>Creality UW02 - Yıkama &amp; Kürleme Cihazı</h3><p>Kürleme, polimer malzemelerin <b>sertleştirilme sürecidir</b>. 3D baskı tamamlandıktan sonra ürünün boyutsal kararlılığını ve yüzey dayanımını destekler.</p><div class="tmr-spec"><div><span>Görev</span><b>Yıkama + kürleme</b></div><div><span>Uyum</span><b>P16L + CRS</b></div></div><a class="tmr-go" href="https://3mash.com/yikama-kurleme-cihazlari">İncele <span>→</span></a></div></article></div>
    <p class="tmr-readmore">Derine inmek isteyenlere, Mash Academy'den: <a href="https://3mash.com/blog/dental-3d-baskida-overcure-ve-undercure-nedir-en-dogru-kurleme-icin-kapsamli-rehber">Overcure ve Undercure Nedir?</a> · <a href="https://3mash.com/blog/dental-3d-baskida-dogru-dalga-boyu-secimi-385nm-mi-405nm-mi">385nm mi 405nm mi?</a></p>`;

const ecosystemContentHtml = `<div class="tmr-eco"><a href="https://3mash.com/3d-yazicilar"><span class="tmr-eco-icon"><img src="${ecoPrinterIcon}" alt="" aria-hidden="true"></span><span>3D Yazıcılar</span></a><a href="https://3mash.com/dental-3d-yazici-recineleri"><span class="tmr-eco-icon"><img src="${ecoResinIcon}" alt="" aria-hidden="true"></span><span>Dental Reçineler</span></a><a href="https://3mash.com/yikama-kurleme-cihazlari"><span class="tmr-eco-icon"><img src="${ecoScannerIcon}" alt="" aria-hidden="true"></span><span>Yıkama &amp; Kürleme</span></a><a href="https://3mash.com/masasustu-tarayicilar"><span class="tmr-eco-icon"><img src="${ecoCuringIcon}" alt="" aria-hidden="true"></span><span>Masaüstü Tarayıcılar</span></a><a href="https://3mash.com/zirkon-bloklar"><span class="tmr-eco-icon"><img src="${ecoBlocksIcon}" alt="" aria-hidden="true"></span><span>Zirkon Bloklar</span></a><a href="https://3mash.com/dental-firinlar"><span class="tmr-eco-icon"><img src="${ecoOvenIcon}" alt="" aria-hidden="true"></span><span>Dental Fırınlar</span></a></div>`;

const trustContentHtml = `<div class="tmr-testimonials"><article class="tmr-testimonial tmr-featured"><div class="tmr-quote">“</div><p>Profesyoneller mutlak başarı için profesyonellere güvenir. Ekipman seçimi, temini, eğitimi ve kullanımında Mash ile iş birliği yapıyoruz.</p><div class="tmr-who"><img class="tmr-avatar" src="${profileMehmet}" alt="Mehmet İşlek"><div><b>Mehmet İşlek</b><small>ATTELIA · Kurucu Başhekim — 22 yıldır gülümseme tasarlayan klinik</small></div></div></article><article class="tmr-testimonial"><div class="tmr-quote">“</div><p>Yenilikçi ve yaratıcı. Donanım, yazılım ve malzemelerde uzun vadeli, başarılı bir iş birliği.</p><div class="tmr-who"><img class="tmr-avatar" src="${profileBerkan}" alt="Berkan Öztaş"><div><b>Berkan Öztaş</b><small>DENTEK · Genel Müd. Yard.</small></div></div></article><article class="tmr-testimonial"><div class="tmr-quote">“</div><p>Sorunları biz daha yaşamadan çözmüşler. Her zaman aynı kalitede üretim — mükemmel sonuçlar.</p><div class="tmr-who"><img class="tmr-avatar" src="${profileGoksel}" alt="Göksel Pişkin"><div><b>Göksel Pişkin</b><small>MIKRO LAB · Kurucu Ortak</small></div></div></article></div><div class="tmr-trusted">${trustedLabelMarkup}${bundledTrustedLogos}</div>`;

const faqContentHtml = `<div class="tmr-faq"><details open><summary>Dental 3D baskıda ölçüsel hassasiyet neden bu kadar önemli?<span>+</span></summary><div>Çünkü bir restorasyonun ilk seferde oturması doğrudan ölçüsel hassasiyete bağlıdır. Ulusal ölçekli klinik verilerde kron tekrarlarının en sık sebepleri <b>proksimal uyumsuzluk, marjinal hatalar ve estetik başarısızlıktır</b> — üçü de birer hassasiyet problemidir. 3mash ekosistemi <b>±20 µm</b> boyutsal hassasiyeti, tek seferlik değil <b>her baskıda</b> tekrar edilebilir şekilde sağlar; bu da tekrar oranını ve gizli maliyeti düşürür.</div></details><details><summary>Bir kron tekrarının (remake) maliyeti gerçekte ne kadar?<span>+</span></summary><div>Tahminî olarak <b>~500 dolar</b> — ve bu tutarın büyük kısmı lab ücreti değil, <b>koltuk süresidir</b> (yeniden prep, ölçü ve yapıştırma randevusu). Klinik işletme gideri saatte ~$375 modellenir; tek bir tekrar bunun çoğunu tüketir. Kendi kalemlerinizle hesaplamak için <a href="3MASH-Maliyet-Detay.html">maliyet detay sayfamıza</a> bakabilirsiniz.</div></details><details><summary>3D baskıda kürleme (post-curing) neden kritik?<span>+</span></summary><div>Çünkü baskı, cihazdan çıktığında henüz bitmemiştir. Yetersiz kürleme (undercure) <b>kırılganlık</b>, fazla kürleme (overcure) ise <b>deformasyon</b> yaratır — yazıcıda kazandığınız hassasiyeti kürlemede kaybedebilirsiniz. 3mash'in akıllı kürleme cihazı parametreleri otomatik yönetir ve bu riski kullanıcı hatasından arındırır.</div></details><details><summary>3mash yalnızca cihaz mı satıyor?<span>+</span></summary><div>Hayır. 3mash entegre bir <b>üretim ekosistemi</b> sunar: yazıcı, reçine ve kürlemeyi birlikte kalibre eder; danışmanlık, Mash Academy eğitimleri ve <b>diş teknisyeni + mühendislerden</b> oluşan satış sonrası teknik destekle tüm süreçte yanınızda olur.</div></details><details><summary>Elimdeki başka marka yazıcıyla çalışır mısınız?<span>+</span></summary><div>Evet. Hem reçine hem printer know-how'una sahip olduğumuz için çözümlerimiz <b>marka bağımsızdır</b>; mevcut cihazınızın parametrelerini optimize ederek onu da aynı sonuca getirebiliriz.</div></details></div>`;

function solutionCards(props: ThreeMashSectionRenderProps) {
  return [
    productCard(props, "solutionCard1", {
      tag: "PROFESYONEL",
      image: p1dSectionCardImage,
      imageAlt: "MASH P1D",
      imageClass: "tmr-machine-printer",
      title: "MASH P1D",
      descriptionHtml: "Malzemeye göre tasarlanmış optik sistemle <b>profesyonel DLP</b> üretim. Yüksek hacimli lab ve kliniklerin motoru.",
      specs: [["Işık kaynağı", "385 nm DLP"], ["Hassasiyet", "±20 µm"], ["Karakter", "Tekrar edilebilirlik"]],
      ctaText: "İncele",
      ctaHref: "/pages/mash-p1d",
    }),
    productCard(props, "solutionCard2", {
      tag: "GİRİŞ SEGMENTİ",
      image: p16lPrimaryImage,
      imageAlt: "MASH P16L",
      imageClass: "tmr-machine-p16l",
      title: "MASH P16L",
      descriptionHtml: "Dijitale yeni geçenler için <b>3mash revizyonlu</b> LCD yazıcı. Aynı parametre desteği, aynı teknik ekip.",
      specs: [["Teknoloji", "LCD · revize"], ["Rol", "Ekosisteme giriş"], ["Destek", "Kurulum + eğitim"]],
      ctaText: "İncele",
      ctaHref: "/pages/mash-p16l",
    }),
    productCard(props, "solutionCard3", {
      tag: "RESMİ DİSTRİBÜTÖR",
      image: resinBottle,
      imageAlt: "CRS Reçineler",
      imageClass: "tmr-resin-bottle",
      title: "CRS Reçineler",
      descriptionHtml: "<b>CE Class IIa</b> biyouyumlu &amp; model reçineleri; cihazınızın parametreleriyle <b>birlikte kalibre edilmiş</b> teslim edilir.",
      specs: [["Sertifika", "CE Class IIa"], ["Uygulama", "Model · geçici · splint · guide"], ["Uyum", "Marka bağımsız"]],
      ctaText: "İncele",
      ctaHref: "/pages/crs-recineler",
    }),
  ].join("");
}

function solutionContent(props: ThreeMashSectionRenderProps) {
  const liveProducts = props.productList?.data?.slice(0, 6) || [];
  if (liveProducts.length > 0) {
    const cards = liveProducts.map(liveProductCard).join("");
    const noPause = raw(props, "pauseOnHover") === false ? " tmr-products-no-pause" : "";
    return `<div class="tmr-products tmr-products-slider tmr-products-live${noPause}" aria-label="${escapeAttr(field(props, "carouselAriaLabel", "Çözüm ürünleri"))}"><div class="tmr-products-track">${cards}${cards}${cards}</div></div>`;
  }

  return `<div class="tmr-products-setup">Bu bölümün ikas ürünlerini göstermesi için editörde <b>Product List</b> alanını All Products veya ilgili kategori/list olarak bağlayın.</div>`;
}

function curingReasons(props: ThreeMashSectionRenderProps) {
  const defaults = [
    ["SEBEP 01", "Mekanik dayanım", "Eksik kürleme (undercure) kırılganlık demek — geçici kron ve köprülerin <b>sık kırılmasının</b> en yaygın görünmez sebebi."],
    ["SEBEP 02", "Ölçüsel doğruluk", "Fazla kürleme (overcure) malzemeyi <b>çeker ve deforme eder</b>. Yazıcıda kazanılan ±20 µm, kürleme ünitesinde kaybedilir."],
    ["SEBEP 03", "Biyouyumluluk &amp; renk", "Doğru dönüşüm derecesi <b>monomer salınımını</b> engeller; renk stabilitesi ve hasta güvenliği sağlar."],
  ];
  return `<div class="tmr-why-grid">${defaults
    .map(([eyebrow, title, description], index) => {
      const number = index + 1;
      return `<article><div>${field(props, `reason${number}Eyebrow`, eyebrow)}</div><h4>${field(props, `reason${number}Title`, title)}</h4><p>${field(props, `reason${number}DescriptionHtml`, description)}</p></article>`;
    })
    .join("")}</div>`;
}

function curingProducts(props: ThreeMashSectionRenderProps) {
  return `<div class="tmr-products tmr-products-two">${productCard(props, "curingProduct1", {
    tag: "YIKAMA · KÜRLEME",
    tagClass: "tmr-lime-tag",
    image: phrozenWashCureKit,
    imageAlt: "Phrozen Wash & Cure Kit",
    imageClass: "tmr-machine-phrozen",
    title: "Phrozen Wash & Cure Kit",
    descriptionHtml: "8L yıkama istasyonu ve kuru+kürleme moduyla baskı sonrası süreci <b>temizleme, kurutma ve 405nm UV kürleme</b> olarak tek akışta toplar.",
    specs: [["Yıkama hacmi", "8 L"], ["Kürleme", "405 nm UV"]],
    ctaText: "İncele",
    ctaHref: "https://uk.phrozen3d.com/products/wash-cure-kit",
  })}${productCard(props, "curingProduct2", {
    tag: "YIKAMA · KÜRLEME",
    tagClass: "tmr-lime-tag",
    image: crealityUW02,
    imageAlt: "Creality UW02 - Yıkama & Kürleme Cihazı",
    imageClass: "tmr-machine-uw02",
    title: "Creality UW02 - Yıkama & Kürleme Cihazı",
    descriptionHtml: "Kürleme, polimer malzemelerin <b>sertleştirilme sürecidir</b>. 3D baskı tamamlandıktan sonra ürünün boyutsal kararlılığını ve yüzey dayanımını destekler.",
    specs: [["Görev", "Yıkama + kürleme"], ["Uyum", "P16L + CRS"]],
    ctaText: "İncele",
    ctaHref: "https://3mash.com/yikama-kurleme-cihazlari",
  })}</div>`;
}

function curingContent(props: ThreeMashSectionRenderProps) {
  return `${curingReasons(props)}${curingProducts(props)}<p class="tmr-readmore">${field(props, "readMoreText", "Derine inmek isteyenlere, Mash Academy'den:")} <a href="${escapeAttr(field(props, "readMoreLink1Href", "https://3mash.com/blog/dental-3d-baskida-overcure-ve-undercure-nedir-en-dogru-kurleme-icin-kapsamli-rehber"))}">${field(props, "readMoreLink1Text", "Overcure ve Undercure Nedir?")}</a> · <a href="${escapeAttr(field(props, "readMoreLink2Href", "https://3mash.com/blog/dental-3d-baskida-dogru-dalga-boyu-secimi-385nm-mi-405nm-mi"))}">${field(props, "readMoreLink2Text", "385nm mi 405nm mi?")}</a></p>`;
}

function ecosystemContent(props: ThreeMashSectionRenderProps) {
  const icons = [ecoPrinterIcon, ecoResinIcon, ecoScannerIcon, ecoCuringIcon, ecoBlocksIcon, ecoOvenIcon];
  const titles = ["3D Yazıcılar", "Dental Reçineler", "Yıkama &amp; Kürleme", "Masaüstü Tarayıcılar", "Zirkon Bloklar", "Dental Fırınlar"];
  const hrefs = ["https://3mash.com/3d-yazicilar", "https://3mash.com/dental-3d-yazici-recineleri", "https://3mash.com/yikama-kurleme-cihazlari", "https://3mash.com/masasustu-tarayicilar", "https://3mash.com/zirkon-bloklar", "https://3mash.com/dental-firinlar"];
  const showIcons = raw(props, "showIcons") !== false;
  const cards = titles
    .map((title, index) => {
      const number = index + 1;
      const icon = showIcons ? `<span class="tmr-eco-icon"><img src="${escapeAttr(imageSource(raw(props, `ecosystemItem${number}IconImageUrl`), icons[index]))}" alt="" aria-hidden="true"></span>` : "";
      return `<a class="tmr-eco-card tmr-eco-card-${number}" href="${escapeAttr(field(props, `ecosystemItem${number}Href`, hrefs[index]))}">${icon}<span>${field(props, `ecosystemItem${number}Title`, title)}</span></a>`;
    })
    .join("");
  const diagramSrc = imageSource(raw(props, "diagramImageUrl"), ecosystemDiagramImage);
  const showDiagram = raw(props, "showDiagram") !== false && Boolean(diagramSrc);
  if (!showDiagram) {
    return `<div class="tmr-eco tmr-eco-list">${cards}</div>`;
  }

  const diagram = `<img class="tmr-eco-diagram" src="${escapeAttr(diagramSrc)}" alt="${escapeAttr(field(props, "diagramImageAlt", ""))}" aria-hidden="${field(props, "diagramImageAlt", "") ? "false" : "true"}">`;
  return `<div class="tmr-eco-map has-diagram">${diagram}<div class="tmr-eco">${cards}</div></div>`;
}

function trustedLogos(props: ThreeMashSectionRenderProps) {
  const defaults = [trustLogo1, trustLogo2, "", trustLogo4, trustLogo5];
  const logos = defaults
    .map((logo, index) => {
      const number = index + 1;
      if (raw(props, `trustedLogo${number}Enabled`) === false) return "";
      const src = imageSource(raw(props, `trustedLogo${number}ImageUrl`), logo);
      if (!src) return "";
      const alt = field(props, `trustedLogo${number}ImageAlt`, `Güvenen marka ${number}`);
      return `<span class="tmr-trusted-logo"><img src="${escapeAttr(src)}" alt="${escapeAttr(alt)}"></span>`;
    })
    .join("");

  return logos ? `<div class="tmr-trusted-logos">${logos}</div>` : "";
}

function trustContent(props: ThreeMashSectionRenderProps) {
  const defaults = [
    [profileMehmet, "Mehmet İşlek", "Profesyoneller mutlak başarı için profesyonellere güvenir. Ekipman seçimi, temini, eğitimi ve kullanımında Mash ile iş birliği yapıyoruz.", "Mehmet İşlek", "ATTELIA · Kurucu Başhekim — 22 yıldır gülümseme tasarlayan klinik"],
    [profileBerkan, "Berkan Öztaş", "Yenilikçi ve yaratıcı. Donanım, yazılım ve malzemelerde uzun vadeli, başarılı bir iş birliği.", "Berkan Öztaş", "DENTEK · Genel Müd. Yard."],
    [profileGoksel, "Göksel Pişkin", "Sorunları biz daha yaşamadan çözmüşler. Her zaman aynı kalitede üretim — mükemmel sonuçlar.", "Göksel Pişkin", "MIKRO LAB · Kurucu Ortak"],
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
    ["Dental 3D baskıda ölçüsel hassasiyet neden bu kadar önemli?", "Çünkü bir restorasyonun ilk seferde oturması doğrudan ölçüsel hassasiyete bağlıdır. Ulusal ölçekli klinik verilerde kron tekrarlarının en sık sebepleri <b>proksimal uyumsuzluk, marjinal hatalar ve estetik başarısızlıktır</b> — üçü de birer hassasiyet problemidir. 3mash ekosistemi <b>±20 µm</b> boyutsal hassasiyeti, tek seferlik değil <b>her baskıda</b> tekrar edilebilir şekilde sağlar; bu da tekrar oranını ve gizli maliyeti düşürür."],
    ["Bir kron tekrarının (remake) maliyeti gerçekte ne kadar?", "Tahminî olarak <b>~500 dolar</b> — ve bu tutarın büyük kısmı lab ücreti değil, <b>koltuk süresidir</b> (yeniden prep, ölçü ve yapıştırma randevusu). Klinik işletme gideri saatte ~$375 modellenir; tek bir tekrar bunun çoğunu tüketir. Kendi kalemlerinizle hesaplamak için <a href=\"3MASH-Maliyet-Detay.html\">maliyet detay sayfamıza</a> bakabilirsiniz."],
    ["3D baskıda kürleme (post-curing) neden kritik?", "Çünkü baskı, cihazdan çıktığında henüz bitmemiştir. Yetersiz kürleme (undercure) <b>kırılganlık</b>, fazla kürleme (overcure) ise <b>deformasyon</b> yaratır — yazıcıda kazandığınız hassasiyeti kürlemede kaybedebilirsiniz. 3mash'in akıllı kürleme cihazı parametreleri otomatik yönetir ve bu riski kullanıcı hatasından arındırır."],
    ["3mash yalnızca cihaz mı satıyor?", "Hayır. 3mash entegre bir <b>üretim ekosistemi</b> sunar: yazıcı, reçine ve kürlemeyi birlikte kalibre eder; danışmanlık, Mash Academy eğitimleri ve <b>diş teknisyeni + mühendislerden</b> oluşan satış sonrası teknik destekle tüm süreçte yanınızda olur."],
    ["Elimdeki başka marka yazıcıyla çalışır mısınız?", "Evet. Hem reçine hem printer know-how'una sahip olduğumuz için çözümlerimiz <b>marka bağımsızdır</b>; mevcut cihazınızın parametrelerini optimize ederek onu da aynı sonuca getirebiliriz."],
  ];
  return `<div class="tmr-faq">${defaults
    .map(([question, answer], index) => {
      const number = index + 1;
      const open = index === 0 && raw(props, "openFirstFaq") !== false ? " open" : "";
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
    sideHtml: "Kuronun oturması üç şeyin senkronuna bağlı: <b>yazıcı, reçine, kürleme.</b> Biz üçünü birlikte kalibre edip know-how'ıyla teslim ediyoruz — elinizdeki başka marka cihaza bile.",
    contentHtml: solutionContent(props),
  });
}

export function renderCuringHtml(props: ThreeMashSectionRenderProps) {
  return indexedSection(props, {
    anchor: "kurleme",
    className: "tmr-dark tmr-curing",
    indexNumber: "04",
    indexText: "Kritik Son Adım",
    titleText: "Sadece yazıcı değil. Sonucu",
    titleEmphasis: "kürleme tamamlar.",
    sideHtml: "Baskı, cihazdan çıktığında bitmemiştir. Yanlış kürlenen iş, <b>doğru basılmış olsa bile</b> başarısız olur. İşte üç sebep:",
    contentHtml: curingContent(props),
  });
}

export function renderEcosystemHtml(props: ThreeMashSectionRenderProps) {
  return indexedSection(props, {
    anchor: "ekosistem",
    className: "tmr-ecosystem",
    indexNumber: "05",
    indexText: "Uçtan Uca",
    titleText: "Dijital akışın her parçası,",
    titleEmphasis: "tek çatı altında.",
    sideHtml: "Cihaz satıp gitmiyoruz: doğru ürün için <b>danışmanlık</b>, sürdürülebilirlik için <b>Academy eğitimleri</b>, satış sonrasında teknisyen + mühendis <b>teknik destek.</b>",
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
    sideHtml: "Kısa cevap hep aynı: tutarlılık. <b>580+</b> dental laboratuvar ve klinik bu sistemle üretiyor, çünkü sonuç <b>her seferinde</b> aynı çıkıyor.",
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
    sideHtml: "En kritik kararları hızlı vermeniz için, klinik ve laboratuvarlardan gelen soruları net cevaplarla topladık.",
    contentHtml: faqContent(props),
  });
}

export function renderRoiHtml(props: ThreeMashSectionRenderProps) {
  return `<div id="${escapeAttr(field(props, "sectionAnchorId", "yatirim"))}" class="tmr-roi"><div class="tmr-wrap"><div class="tmr-roi-num"><span>${value(props.eyebrowText, "YATIRIMIN GERİ DÖNÜŞÜ")}</span><b>${value(props.valueText, "&lt; 6 ay")}</b></div><p>${value(props.descriptionHtml, "3mash ekosistemine geçen bir klinik, yatırımını <b>6 aydan kısa sürede</b> geri kazanma potansiyeline sahip. Sonrasında bu verimlilik her yıl sürer: <b>yılda $72–162K'ya varan tasarruf potansiyeli.</b>")}</p><a class="tmr-btn" href="${escapeAttr(value(props.ctaHref, "#hesap"))}">${value(props.ctaText, "Kliniğiniz için hesaplayalım →")}</a></div></div>`;
}

export function renderFinalHtml(props: ThreeMashSectionRenderProps) {
  return `<section id="${escapeAttr(field(props, "sectionAnchorId", "iletisim-cta"))}" class="tmr-final"><div class="tmr-wrap"><h2>${heading(value(props.titleText, "Bu görünmez kaybı"), value(props.titleEmphasis, "birlikte azaltalım."))}</h2><p>${value(props.descriptionHtml, "Mevcut iş akışınızı birlikte inceleyelim; kaybın nerede oluştuğunu birlikte görelim ve size uygun ekosistemi kuralım — <b>elinizdeki cihazlarla bile.</b>")}</p><div><a class="tmr-btn tmr-btn-lime" href="${escapeAttr(value(props.primaryButtonHref, "https://3mash.com/pages/iletisim"))}">${value(props.primaryButtonText, "Uzmana danış — ücretsiz")}</a><a class="tmr-btn tmr-btn-invert" href="${escapeAttr(value(props.secondaryButtonHref, "/pages/mash-academy"))}">${value(props.secondaryButtonText, "Mash Academy'yi keşfet")}</a></div></div></section>`;
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

function socialHref(props: ThreeMashSectionRenderProps, key: string, fallback = "") {
  const source = raw(props, key);
  return typeof source === "string" && source.trim() ? source.trim() : fallback;
}

function socialLabel(props: ThreeMashSectionRenderProps, key: string, fallback: string) {
  const source = raw(props, key);
  return typeof source === "string" && source.trim() ? inlineHtml(source.trim()) : fallback;
}

function footerSocialLinks(props: ThreeMashSectionRenderProps) {
  if (raw(props, "showSocialIcons") === false) return "";

  const links = [
    ["facebook", "facebookHref", "facebookLabel", "", "Facebook"],
    ["instagram", "instagramHref", "instagramLabel", "https://instagram.com/3mashsocial", "Instagram"],
    ["youtube", "youtubeHref", "youtubeLabel", "", "YouTube"],
    ["linkedin", "linkedinHref", "linkedinLabel", "", "LinkedIn"],
  ]
    .map(([icon, hrefKey, labelKey, fallbackHref, fallbackLabel]) => {
      const href = socialHref(props, hrefKey, fallbackHref);
      const label = escapeAttr(socialLabel(props, labelKey, fallbackLabel));
      if (!href) return `<span class="tmr-footer-social-icon" aria-label="${label}" role="img">${socialIcon(icon)}</span>`;
      return `<a href="${escapeAttr(href)}" aria-label="${label}" target="_blank" rel="noopener noreferrer">${socialIcon(icon)}</a>`;
    })
    .join("");

  return links ? `<div class="tmr-footer-social">${links}</div>` : "";
}

function footerCopyrightText(props: ThreeMashSectionRenderProps) {
  const fallback = "© 2026 3MASH Teknoloji A.Ş. Tüm hakları saklıdır.";
  const current = value(props.copyrightText, fallback);
  if (/all\s+rights\s+(reserved|preserved)/i.test(current)) return fallback;
  if (/3MASH\s+Teknoloji\s+A\.Ş\./i.test(current) && !/Tüm\s+hakları\s+saklıdır/i.test(current)) {
    return current.replace(/3MASH\s+Teknoloji\s+A\.Ş\./i, "3MASH Teknoloji A.Ş. Tüm hakları saklıdır.");
  }
  return current;
}

function normalizeFooterLegalText(markup: string) {
  return markup
    .replace(/All\s+rights\s+(reserved|preserved)\.?/gi, "Tüm hakları saklıdır.")
    .replace(/(©\s*2026\s*3MASH\s+Teknoloji\s+A\.Ş\.)(?!\s*Tüm\s+hakları\s+saklıdır)/gi, "$1 Tüm hakları saklıdır.");
}

export function renderFooterHtml(props: ThreeMashSectionRenderProps) {
  const logoSvg = svgMarkup(raw(props, "logoSvg"));
  const logoImage = imageSource(raw(props, "logoImageUrl"), threeMashLogoImage);
  const logoVisual = logoSvg
    ? `<span class="tmr-footer-logo-svg" aria-hidden="true">${logoSvg}</span>`
    : `<img src="${escapeAttr(logoImage)}" alt="${escapeAttr(field(props, "logoImageAlt", "3mash"))}">`;

  function linkList(prefix: string, title: string, defaults: Array<[string, string]>) {
    return `<h6>${title}</h6>${defaults
      .map(([text, link], index) => {
        const number = index + 1;
        const rawHref = raw(props, `${prefix}Link${number}Href`);
        const resolvedHref = prefix === "product" ? productPageHref(rawHref, link) : field(props, `${prefix}Link${number}Href`, link);
        return `<a href="${escapeAttr(resolvedHref)}">${field(props, `${prefix}Link${number}Text`, text)}</a>`;
      })
      .join("")}`;
  }

  const products = value(
    undefined,
    linkList("product", field(props, "productColumnTitle", "Ürünler"), [
      ["3D Yazıcılar", "/3d-yazicilar"],
      ["Dental Reçineler", "/dental-3d-yazici-recineleri"],
      ["Yıkama &amp; Kürleme", "/yikama-kurleme-cihazlari"],
      ["Masaüstü Tarayıcılar", "/masasustu-tarayicilar"],
      ["Zirkon Bloklar", "/zirkon-bloklar"],
      ["Dental Fırınlar", "/dental-firinlar"],
    ]),
  );
  const company = value(
    undefined,
    linkList("company", field(props, "companyColumnTitle", "Şirket"), [
      ["Hakkımızda", "https://3mash.com/pages/about-us"],
      ["Mash Academy", "/pages/mash-academy"],
      ["Blog", "https://3mash.com/blog"],
    ]),
  );
  const socialLinks = footerSocialLinks(props);
  const contact = value(
    undefined,
    linkList("contact", field(props, "contactColumnTitle", "İletişim"), [
      ["info@3mash.com", "mailto:info@3mash.com"],
      ["Antalya Teknokent, Konyaaltı", "#"],
      ["@3mashsocial", "https://instagram.com/3mashsocial"],
    ]) + socialLinks,
  );
  return `<footer class="tmr-footer"><div class="tmr-wrap"><div class="tmr-footer-cols"><div><a class="tmr-footer-logo" href="${escapeAttr(field(props, "logoHref", "/"))}">${logoVisual}<b>${value(props.logoText, "mash")}</b></a><p>${value(props.descriptionText, "Dental klinik ve laboratuvarlar için entegre 3D baskı ekosistemi: yazıcı, reçine, kürleme ve üretim know-how'ı — birlikte.")}</p></div><div class="tmr-footer-link-col" data-tmr-footer-sync="products">${products}</div><div class="tmr-footer-link-col">${company}</div><div class="tmr-footer-link-col">${contact}</div></div><div class="tmr-base"><span>${footerCopyrightText(props)}</span><div class="tmr-base-meta"><span>${value(props.legalText, "KVKK · İade &amp; Garanti · Mesafeli Satış")}</span></div></div></div></footer>`;
}

export function ThreeMashStaticSection({ props, fallback }: { props: ThreeMashSectionRenderProps; fallback: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const baseHtml = props.sectionHtml && props.sectionHtml.trim() ? props.sectionHtml : fallback;
  const renderedHtml = normalizeFooterLegalText(styleTextChunks(enhanceLegacySolutionMedia(baseHtml), props));
  const rootClassName = `three-mash-remaining${/\btmr-(trust|faq)-section\b/.test(renderedHtml) ? " tmr-section-separator-visible" : ""}`;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const syncFooterCategoryLists = () => {
      root.querySelectorAll<HTMLElement>("[data-tmr-footer-sync]").forEach((column) => {
        const sourceName = column.dataset.tmrFooterSync;
        if (!sourceName) return;

        const sourceLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>(`a[data-tmr-category-source="${sourceName}"]`));
        if (!sourceLinks.length) return;

        const title = column.querySelector("h6")?.cloneNode(true);
        const seen = new Set<string>();
        const links = sourceLinks
          .map((link) => {
            const label = link.querySelector("b")?.textContent?.trim() || link.textContent?.trim() || "";
            const linkHref = link.getAttribute("href")?.trim() || "";
            const key = `${label}|${linkHref}`;
            if (!label || !linkHref || seen.has(key)) return null;
            seen.add(key);

            const item = document.createElement("a");
            item.setAttribute("href", linkHref);
            item.textContent = label;
            return item;
          })
          .filter((item): item is HTMLAnchorElement => Boolean(item));

        if (!links.length) return;
        const signature = links.map((item) => `${item.textContent || ""}|${item.getAttribute("href") || ""}`).join("||");
        if (column.dataset.tmrFooterSyncSignature === signature) return;
        column.dataset.tmrFooterSyncSignature = signature;

        column.replaceChildren(...(title ? [title] : []), ...links);
      });
    };

    const syncSolutionVideoFade = (stage: Element | null) => {
      if (!stage?.classList.contains("tmr-product-media-p16l") && !stage?.classList.contains("tmr-product-media-solutionCard1")) return;

      const video = stage.querySelector(".tmr-product-video") as HTMLVideoElement | null;
      if (!video || video.dataset.tmrSolutionFadeBound === "true") return;

      video.dataset.tmrSolutionFadeBound = "true";
      const syncEndingState = () => {
        if (!Number.isFinite(video.duration) || video.duration <= 0) return;

        const remaining = video.duration - video.currentTime;
        if (remaining > 0 && remaining <= 0.42) {
          if (stage.classList.contains("is-video-ending")) return;
          stage.classList.add("is-video-ending");
          window.setTimeout(() => {
            const imageTrigger = stage.querySelector('[data-tmr-product-media][data-tmr-media-type="image"]') as HTMLElement | null;
            if (!imageTrigger || !stage.classList.contains("is-video-ending")) return;
            activateMedia(imageTrigger);
          }, 190);
          return;
        }
      };

      video.addEventListener("timeupdate", syncEndingState);
      video.addEventListener("loadedmetadata", syncEndingState);
      video.addEventListener("seeked", syncEndingState);
    };

    const activateMedia = (trigger: HTMLElement) => {
      const stage = trigger.closest(".tmr-product-media-interactive");
      const main = stage?.querySelector(".tmr-media-main");
      const src = trigger.dataset.tmrMediaSrc || "";
      if (!stage || !main || !src) return;

      const type = trigger.dataset.tmrMediaType;
      const markup = type === "video"
        ? videoMediaMarkup(src, trigger.dataset.tmrMediaPoster || "")
        : imageMediaMarkup(src, trigger.dataset.tmrMediaAlt || "", trigger.dataset.tmrMediaImageClass || "tmr-product-img");

      stage.classList.toggle("is-video-active", type === "video");
      stage.classList.remove("is-video-paused");
      stage.classList.remove("is-video-ending");
      main.innerHTML = markup;
      stage.querySelectorAll(".tmr-media-thumb").forEach((item) => item.classList.remove("is-active"));
      trigger.classList.add("is-active");
      if (type === "video") {
        syncSolutionVideoFade(stage);
      }
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const videoToggle = target?.closest("[data-tmr-video-toggle]") as HTMLElement | null;
      if (videoToggle && root.contains(videoToggle)) {
        event.preventDefault();
        event.stopPropagation();

        const stage = videoToggle.closest(".tmr-product-media-interactive");
        const video = stage?.querySelector(".tmr-product-video") as HTMLVideoElement | null;
        if (!stage || !video) return;

        if (video.paused) {
          void video.play();
          stage.classList.remove("is-video-paused");
          videoToggle.setAttribute("aria-label", "Video duraklat");
        } else {
          video.pause();
          stage.classList.add("is-video-paused");
          videoToggle.setAttribute("aria-label", "Video oynat");
        }
        return;
      }

      const trigger = target?.closest("[data-tmr-product-media]") as HTMLElement | null;
      if (!trigger || !root.contains(trigger)) return;

      event.preventDefault();
      event.stopPropagation();

      activateMedia(trigger);
    };

    const handlePointerEnter = (event: PointerEvent) => {
      if (raw(props, "hoverVideoAutoplayEnabled") === false) return;

      const stage = event.currentTarget as HTMLElement | null;
      if (!stage?.classList.contains("tmr-product-media-solutionCard1") && !stage?.classList.contains("tmr-product-media-solutionCard2") && !stage?.classList.contains("tmr-product-media-solutionCard3")) return;

      const videoTrigger = stage.querySelector('[data-tmr-product-media][data-tmr-media-type="video"]') as HTMLElement | null;
      if (!videoTrigger || videoTrigger.classList.contains("is-active")) return;

      activateMedia(videoTrigger);
    };

    syncFooterCategoryLists();
    const syncObserver = typeof MutationObserver === "undefined" ? null : new MutationObserver(syncFooterCategoryLists);
    syncObserver?.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["href", "data-tmr-category-source"] });

    root.addEventListener("click", handleClick);
    root.querySelectorAll(".tmr-product-media-solutionCard1, .tmr-product-media-solutionCard2, .tmr-product-media-solutionCard3").forEach((stage) => {
      stage.addEventListener("pointerenter", handlePointerEnter as EventListener);
      syncSolutionVideoFade(stage);
    });

    return () => {
      syncObserver?.disconnect();
      root.removeEventListener("click", handleClick);
      root.querySelectorAll(".tmr-product-media-solutionCard1, .tmr-product-media-solutionCard2, .tmr-product-media-solutionCard3").forEach((stage) => {
        stage.removeEventListener("pointerenter", handlePointerEnter as EventListener);
      });
    };
  }, [props.sectionHtml, fallback]);

  return (
    <div ref={rootRef} className={rootClassName} style={threeMashThemeStyle(props)}>
      <div dangerouslySetInnerHTML={html(renderedHtml)} />
    </div>
  );
}

