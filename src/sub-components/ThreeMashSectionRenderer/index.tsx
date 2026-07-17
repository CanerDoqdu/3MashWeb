import { machineP16L, machineUW02, profileBerkan, profileGoksel, profileMehmet, resinBottle } from "../../assets/remaining-assets-data";
import vectorPrinterImage from "../../assets/vectorprinter-data";
import { ecoBlocksIcon, ecoCuringIcon, ecoOvenIcon, ecoPrinterIcon, ecoResinIcon, ecoScannerIcon } from "../../assets/eco-icons-data";

export const solutionProductCards = `
      <article class="tmr-product"><div class="tmr-product-media"><span class="tmr-tag">PROFESYONEL</span><img class="tmr-product-img tmr-machine-printer" src="${vectorPrinterImage}" alt="MASH P1D"></div><div class="tmr-product-body"><h3>MASH P1D</h3><p>Malzemeye göre tasarlanmış optik sistemle <b>profesyonel DLP</b> üretim. Yüksek hacimli lab ve kliniklerin motoru.</p><div class="tmr-spec"><div><span>Işık kaynağı</span><b>385 nm DLP</b></div><div><span>Hassasiyet</span><b>±20 µm</b></div><div><span>Karakter</span><b>Tekrar edilebilirlik</b></div></div><a class="tmr-go" href="https://3mash.com/3d-yazicilar">İncele <span>→</span></a></div></article>
      <article class="tmr-product"><div class="tmr-product-media"><span class="tmr-tag">GİRİŞ SEGMENTİ</span><img class="tmr-product-img tmr-machine-p16l" src="${machineP16L}" alt="MASH P16L"></div><div class="tmr-product-body"><h3>MASH P16L</h3><p>Dijitale yeni geçenler için <b>3mash revizyonlu</b> LCD yazıcı. Aynı parametre desteği, aynı teknik ekip.</p><div class="tmr-spec"><div><span>Teknoloji</span><b>LCD · revize</b></div><div><span>Rol</span><b>Ekosisteme giriş</b></div><div><span>Destek</span><b>Kurulum + eğitim</b></div></div><a class="tmr-go" href="https://3mash.com/3d-yazicilar">İncele <span>→</span></a></div></article>
      <article class="tmr-product"><div class="tmr-product-media"><span class="tmr-tag">RESMİ DİSTRİBÜTÖR</span><img class="tmr-product-img tmr-resin-bottle" src="${resinBottle}" alt="CRS Reçineler"></div><div class="tmr-product-body"><h3>CRS Reçineler</h3><p><b>CE Class IIa</b> biyouyumlu &amp; model reçineleri; cihazınızın parametreleriyle <b>birlikte kalibre edilmiş</b> teslim edilir.</p><div class="tmr-spec"><div><span>Sertifika</span><b>CE Class IIa</b></div><div><span>Uygulama</span><b>Model · geçici · splint · guide</b></div><div><span>Uyum</span><b>Marka bağımsız</b></div></div><a class="tmr-go" href="https://3mash.com/dental-3d-yazici-recineleri">İncele <span>→</span></a></div></article>`;

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
    <div class="tmr-products tmr-products-two"><article class="tmr-product"><div class="tmr-product-media"><span class="tmr-tag tmr-lime-tag">385NM · LCD</span><img class="tmr-product-img tmr-machine-p16l" src="${machineP16L}" alt="MASH P16L – 385nm"></div><div class="tmr-product-body"><h3>MASH P16L – 385nm</h3><p>Dental üretim için 385nm ışık kaynağıyla <b>net detay</b> ve kontrollü yüzey kalitesi. Dijital akışa güçlü başlangıç.</p><div class="tmr-spec"><div><span>Dalga boyu</span><b>385 nm</b></div><div><span>Rol</span><b>Üretim yazıcısı</b></div></div><a class="tmr-go" href="https://3mash.com/3d-yazicilar">İncele <span>→</span></a></div></article><article class="tmr-product"><div class="tmr-product-media"><span class="tmr-tag">YIKAMA · KÜRLEME</span><img class="tmr-product-img tmr-machine-uw02" src="${machineUW02}" alt="Creality UW02"></div><div class="tmr-product-body"><h3>Creality UW02</h3><p>Baskı sonrası yıkama ve kürleme adımlarını <b>tek kontrollü akışta</b> toplar. P16L ile tamamlayıcı başlangıç seti.</p><div class="tmr-spec"><div><span>Görev</span><b>Yıkama + kürleme</b></div><div><span>Uyum</span><b>P16L + CRS</b></div></div><a class="tmr-go" href="https://3mash.com/yikama-kurleme-cihazlari">İncele <span>→</span></a></div></article></div>
    <p class="tmr-readmore">Derine inmek isteyenlere, Mash Academy'den: <a href="https://3mash.com/blog/dental-3d-baskida-overcure-ve-undercure-nedir-en-dogru-kurleme-icin-kapsamli-rehber">Overcure ve Undercure Nedir?</a> · <a href="https://3mash.com/blog/dental-3d-baskida-dogru-dalga-boyu-secimi-385nm-mi-405nm-mi">385nm mi 405nm mi?</a></p>
  </div>
</section>`;

export const defaultRoiHtml = `<div class="tmr-roi"><div class="tmr-wrap"><div class="tmr-roi-num"><span>YATIRIMIN GERİ DÖNÜŞÜ</span><b>&lt; 6 ay</b></div><p>3mash ekosistemine geçen bir klinik, yatırımını <b>6 aydan kısa sürede</b> geri kazanma potansiyeline sahip. Sonrasında bu verimlilik her yıl sürer: <b>yılda $72–162K'ya varan tasarruf potansiyeli.</b></p><a class="tmr-btn" href="#hesap">Kliniğiniz için hesaplayalım →</a></div></div>`;

export const defaultEcosystemHtml = `<section id="ekosistem" class="tmr-section"><div class="tmr-wrap"><div class="tmr-index"><span class="tmr-index-number">05</span><span class="tmr-index-text">Uçtan Uca</span><span class="tmr-index-line"></span></div><div class="tmr-head"><h2>Dijital akışın her parçası, <span>tek çatı altında.</span></h2><div class="tmr-side">Cihaz satıp gitmiyoruz: doğru ürün için <b>danışmanlık</b>, sürdürülebilirlik için <b>Academy eğitimleri</b>, satış sonrasında teknisyen + mühendis <b>teknik destek.</b></div></div><div class="tmr-eco"><a href="https://3mash.com/3d-yazicilar"><span class="tmr-eco-icon"><img src="${ecoPrinterIcon}" alt="" aria-hidden="true"></span><span>3D Yazıcılar</span></a><a href="https://3mash.com/dental-3d-yazici-recineleri"><span class="tmr-eco-icon"><img src="${ecoResinIcon}" alt="" aria-hidden="true"></span><span>Dental Reçineler</span></a><a href="https://3mash.com/yikama-kurleme-cihazlari"><span class="tmr-eco-icon"><img src="${ecoScannerIcon}" alt="" aria-hidden="true"></span><span>Yıkama &amp; Kürleme</span></a><a href="https://3mash.com/masasustu-tarayicilar"><span class="tmr-eco-icon"><img src="${ecoCuringIcon}" alt="" aria-hidden="true"></span><span>Masaüstü Tarayıcılar</span></a><a href="https://3mash.com/zirkon-bloklar"><span class="tmr-eco-icon"><img src="${ecoBlocksIcon}" alt="" aria-hidden="true"></span><span>Zirkon Bloklar</span></a><a href="https://3mash.com/dental-firinlar"><span class="tmr-eco-icon"><img src="${ecoOvenIcon}" alt="" aria-hidden="true"></span><span>Dental Fırınlar</span></a></div></div></section>`;

export const defaultTrustHtml = `<section id="guven" class="tmr-section tmr-section-tight"><div class="tmr-wrap"><div class="tmr-index"><span class="tmr-index-number">06</span><span class="tmr-index-text">Referanslar</span><span class="tmr-index-line"></span></div><div class="tmr-head"><h2>Türkiye'nin en büyük lab'ları neden <span>bizimle üretiyor?</span></h2><div class="tmr-side">Kısa cevap hep aynı: tutarlılık. <b>580+</b> dental laboratuvar ve klinik bu sistemle üretiyor, çünkü sonuç <b>her seferinde</b> aynı çıkıyor.</div></div><div class="tmr-testimonials"><article class="tmr-testimonial tmr-featured"><div class="tmr-quote">“</div><p>Profesyoneller mutlak başarı için profesyonellere güvenir. Ekipman seçimi, temini, eğitimi ve kullanımında Mash ile iş birliği yapıyoruz.</p><div class="tmr-who"><img class="tmr-avatar" src="${profileMehmet}" alt="Mehmet İşlek"><div><b>Mehmet İşlek</b><small>ATTELIA · Kurucu Başhekim — 22 yıldır gülümseme tasarlayan klinik</small></div></div></article><article class="tmr-testimonial"><div class="tmr-quote">“</div><p>Yenilikçi ve yaratıcı. Donanım, yazılım ve malzemelerde uzun vadeli, başarılı bir iş birliği.</p><div class="tmr-who"><img class="tmr-avatar" src="${profileBerkan}" alt="Berkan Öztaş"><div><b>Berkan Öztaş</b><small>DENTEK · Genel Müd. Yard.</small></div></div></article><article class="tmr-testimonial"><div class="tmr-quote">“</div><p>Sorunları biz daha yaşamadan çözmüşler. Her zaman aynı kalitede üretim — mükemmel sonuçlar.</p><div class="tmr-who"><img class="tmr-avatar" src="${profileGoksel}" alt="Göksel Pişkin"><div><b>Göksel Pişkin</b><small>MIKRO LAB · Kurucu Ortak</small></div></div></article></div><div class="tmr-trusted"><span>Güvenenler</span><img src="https://cdn.myikas.com/images/theme-images/b99ef0bf-eb57-4adc-8a1e-9708c1ba81ff/image_3840.webp" alt="DentLab, Dentek, Attelia, Tekka ve daha fazlası"></div></div></section>`;

export const defaultFaqHtml = `<section id="sss" class="tmr-section tmr-section-tight"><div class="tmr-wrap"><div class="tmr-index"><span class="tmr-index-number">07</span><span class="tmr-index-text">Sık Sorulanlar</span><span class="tmr-index-line"></span></div><div class="tmr-head"><h2>Kısa, net cevaplar.</h2><div class="tmr-side">Diş hekimlerinin ve laboratuvarların en çok sorduğu sorular — dolambaçsız yanıtlarla.</div></div><div class="tmr-faq"><details open><summary>Dental 3D baskıda ölçüsel hassasiyet neden bu kadar önemli?<span>+</span></summary><div>Çünkü bir restorasyonun ilk seferde oturması doğrudan ölçüsel hassasiyete bağlıdır. Ulusal ölçekli klinik verilerde kron tekrarlarının en sık sebepleri <b>proksimal uyumsuzluk, marjinal hatalar ve estetik başarısızlıktır</b> — üçü de birer hassasiyet problemidir. 3mash ekosistemi <b>±20 µm</b> boyutsal hassasiyeti, tek seferlik değil <b>her baskıda</b> tekrar edilebilir şekilde sağlar; bu da tekrar oranını ve gizli maliyeti düşürür.</div></details><details><summary>Bir kron tekrarının (remake) maliyeti gerçekte ne kadar?<span>+</span></summary><div>Tahminî olarak <b>~500 dolar</b> — ve bu tutarın büyük kısmı lab ücreti değil, <b>koltuk süresidir</b> (yeniden prep, ölçü ve yapıştırma randevusu). Klinik işletme gideri saatte ~$375 modellenir; tek bir tekrar bunun çoğunu tüketir. Kendi kalemlerinizle hesaplamak için <a href="3MASH-Maliyet-Detay.html">maliyet detay sayfamıza</a> bakabilirsiniz.</div></details><details><summary>3D baskıda kürleme (post-curing) neden kritik?<span>+</span></summary><div>Çünkü baskı, cihazdan çıktığında henüz bitmemiştir. Yetersiz kürleme (undercure) <b>kırılganlık</b>, fazla kürleme (overcure) ise <b>deformasyon</b> yaratır — yazıcıda kazandığınız hassasiyeti kürlemede kaybedebilirsiniz. 3mash'in akıllı kürleme cihazı parametreleri otomatik yönetir ve bu riski kullanıcı hatasından arındırır.</div></details><details><summary>3mash yalnızca cihaz mı satıyor?<span>+</span></summary><div>Hayır. 3mash entegre bir <b>üretim ekosistemi</b> sunar: yazıcı, reçine ve kürlemeyi birlikte kalibre eder; danışmanlık, Mash Academy eğitimleri ve <b>diş teknisyeni + mühendislerden</b> oluşan satış sonrası teknik destekle tüm süreçte yanınızda olur.</div></details><details><summary>Elimdeki başka marka yazıcıyla çalışır mısınız?<span>+</span></summary><div>Evet. Hem reçine hem printer know-how'una sahip olduğumuz için çözümlerimiz <b>marka bağımsızdır</b>; mevcut cihazınızın parametrelerini optimize ederek onu da aynı sonuca getirebiliriz.</div></details></div></div></section>`;

export const defaultFinalHtml = `<section class="tmr-final"><div class="tmr-wrap"><h2>Bu görünmez kaybı <span>birlikte azaltalım.</span></h2><p>Mevcut iş akışınızı birlikte inceleyelim; kaybın nerede oluştuğunu birlikte görelim ve size uygun ekosistemi kuralım — <b>elinizdeki cihazlarla bile.</b></p><div><a class="tmr-btn tmr-btn-lime" href="https://3mash.com/pages/iletisim">Uzmana danış — ücretsiz</a><a class="tmr-btn tmr-btn-invert" href="https://3mash.com/pages/mash-academy">Mash Academy'yi keşfet</a></div></div></section>`;

export const defaultFooterHtml = `<footer class="tmr-footer"><div class="tmr-wrap"><div class="tmr-footer-cols"><div><div class="tmr-footer-logo"><span>∞</span><b>mash</b></div><p>Dental klinik ve laboratuvarlar için entegre 3D baskı ekosistemi: yazıcı, reçine, kürleme ve üretim know-how'ı — birlikte.</p></div><div><h6>Ürünler</h6><a href="https://3mash.com/3d-yazicilar">3D Yazıcılar</a><a href="https://3mash.com/dental-3d-yazici-recineleri">Dental Reçineler</a><a href="https://3mash.com/yikama-kurleme-cihazlari">Yıkama &amp; Kürleme</a><a href="https://3mash.com/zirkon-bloklar">Zirkon Bloklar</a></div><div><h6>Şirket</h6><a href="https://3mash.com/pages/about-us">Hakkımızda</a><a href="https://3mash.com/pages/mash-academy">Mash Academy</a><a href="https://3mash.com/blog">Blog</a><a href="https://3mash.com/pages/iletisim">İletişim</a></div><div><h6>İletişim</h6><a href="mailto:info@3mash.com">info@3mash.com</a><a href="#">Antalya Teknokent, Konyaaltı</a><a href="https://instagram.com/3mashsocial">@3mashsocial</a></div></div><div class="tmr-base"><span>© 2026 3MASH Teknoloji A.Ş.</span><span>KVKK · İade &amp; Garanti · Mesafeli Satış</span></div></div></footer>`;

export interface ThreeMashSectionRenderProps {
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
  backgroundColor?: string;
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
}

function html(value?: string, fallback = "") {
  return { __html: value && value.trim() ? value : fallback };
}

function value(value: string | undefined, fallback: string) {
  const trimmed = value?.trim();
  return trimmed || fallback;
}

function escapeAttr(value: string) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function heading(titleText: string, titleEmphasis = "") {
  return `${titleText}${titleEmphasis ? ` <span>${titleEmphasis}</span>` : ""}`;
}

export function threeMashThemeStyle(props: ThreeMashSectionRenderProps) {
  return {
    "--tmr-bg": props.backgroundColor || "#FAFAF7",
    "--tmr-text": props.textColor || "#0E0E0C",
    "--tmr-sub": props.subTextColor || "#55554E",
    "--tmr-muted": props.mutedTextColor || "#8F8F86",
    "--tmr-line": props.lineColor || "#E6E6E0",
    "--tmr-panel": props.panelColor || "#FFFFFF",
    "--tmr-dark": props.darkColor || "#0E0E0C",
    "--tmr-accent": props.accentColor || "#C7F136",
    "--tmr-accent-text": props.accentTextColor || "#3D4D0E",
    "--tmr-accent-soft": props.accentSoftColor || "#F2F8DC",
    "--tmr-danger": props.dangerColor || "#E2492F",
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
    <div class="tmr-products tmr-products-two"><article class="tmr-product"><div class="tmr-product-media"><span class="tmr-tag tmr-lime-tag">385NM · LCD</span><img class="tmr-product-img tmr-machine-p16l" src="${machineP16L}" alt="MASH P16L – 385nm"></div><div class="tmr-product-body"><h3>MASH P16L – 385nm</h3><p>Dental üretim için 385nm ışık kaynağıyla <b>net detay</b> ve kontrollü yüzey kalitesi. Dijital akışa güçlü başlangıç.</p><div class="tmr-spec"><div><span>Dalga boyu</span><b>385 nm</b></div><div><span>Rol</span><b>Üretim yazıcısı</b></div></div><a class="tmr-go" href="https://3mash.com/3d-yazicilar">İncele <span>→</span></a></div></article><article class="tmr-product"><div class="tmr-product-media"><span class="tmr-tag">YIKAMA · KÜRLEME</span><img class="tmr-product-img tmr-machine-uw02" src="${machineUW02}" alt="Creality UW02"></div><div class="tmr-product-body"><h3>Creality UW02</h3><p>Baskı sonrası yıkama ve kürleme adımlarını <b>tek kontrollü akışta</b> toplar. P16L ile tamamlayıcı başlangıç seti.</p><div class="tmr-spec"><div><span>Görev</span><b>Yıkama + kürleme</b></div><div><span>Uyum</span><b>P16L + CRS</b></div></div><a class="tmr-go" href="https://3mash.com/yikama-kurleme-cihazlari">İncele <span>→</span></a></div></article></div>
    <p class="tmr-readmore">Derine inmek isteyenlere, Mash Academy'den: <a href="https://3mash.com/blog/dental-3d-baskida-overcure-ve-undercure-nedir-en-dogru-kurleme-icin-kapsamli-rehber">Overcure ve Undercure Nedir?</a> · <a href="https://3mash.com/blog/dental-3d-baskida-dogru-dalga-boyu-secimi-385nm-mi-405nm-mi">385nm mi 405nm mi?</a></p>`;

const ecosystemContentHtml = `<div class="tmr-eco"><a href="https://3mash.com/3d-yazicilar"><span class="tmr-eco-icon"><img src="${ecoPrinterIcon}" alt="" aria-hidden="true"></span><span>3D Yazıcılar</span></a><a href="https://3mash.com/dental-3d-yazici-recineleri"><span class="tmr-eco-icon"><img src="${ecoResinIcon}" alt="" aria-hidden="true"></span><span>Dental Reçineler</span></a><a href="https://3mash.com/yikama-kurleme-cihazlari"><span class="tmr-eco-icon"><img src="${ecoScannerIcon}" alt="" aria-hidden="true"></span><span>Yıkama &amp; Kürleme</span></a><a href="https://3mash.com/masasustu-tarayicilar"><span class="tmr-eco-icon"><img src="${ecoCuringIcon}" alt="" aria-hidden="true"></span><span>Masaüstü Tarayıcılar</span></a><a href="https://3mash.com/zirkon-bloklar"><span class="tmr-eco-icon"><img src="${ecoBlocksIcon}" alt="" aria-hidden="true"></span><span>Zirkon Bloklar</span></a><a href="https://3mash.com/dental-firinlar"><span class="tmr-eco-icon"><img src="${ecoOvenIcon}" alt="" aria-hidden="true"></span><span>Dental Fırınlar</span></a></div>`;

const trustContentHtml = `<div class="tmr-testimonials"><article class="tmr-testimonial tmr-featured"><div class="tmr-quote">“</div><p>Profesyoneller mutlak başarı için profesyonellere güvenir. Ekipman seçimi, temini, eğitimi ve kullanımında Mash ile iş birliği yapıyoruz.</p><div class="tmr-who"><img class="tmr-avatar" src="${profileMehmet}" alt="Mehmet İşlek"><div><b>Mehmet İşlek</b><small>ATTELIA · Kurucu Başhekim — 22 yıldır gülümseme tasarlayan klinik</small></div></div></article><article class="tmr-testimonial"><div class="tmr-quote">“</div><p>Yenilikçi ve yaratıcı. Donanım, yazılım ve malzemelerde uzun vadeli, başarılı bir iş birliği.</p><div class="tmr-who"><img class="tmr-avatar" src="${profileBerkan}" alt="Berkan Öztaş"><div><b>Berkan Öztaş</b><small>DENTEK · Genel Müd. Yard.</small></div></div></article><article class="tmr-testimonial"><div class="tmr-quote">“</div><p>Sorunları biz daha yaşamadan çözmüşler. Her zaman aynı kalitede üretim — mükemmel sonuçlar.</p><div class="tmr-who"><img class="tmr-avatar" src="${profileGoksel}" alt="Göksel Pişkin"><div><b>Göksel Pişkin</b><small>MIKRO LAB · Kurucu Ortak</small></div></div></article></div><div class="tmr-trusted"><span>Güvenenler</span><img src="https://cdn.myikas.com/images/theme-images/b99ef0bf-eb57-4adc-8a1e-9708c1ba81ff/image_3840.webp" alt="DentLab, Dentek, Attelia, Tekka ve daha fazlası"></div>`;

const faqContentHtml = `<div class="tmr-faq"><details open><summary>Dental 3D baskıda ölçüsel hassasiyet neden bu kadar önemli?<span>+</span></summary><div>Çünkü bir restorasyonun ilk seferde oturması doğrudan ölçüsel hassasiyete bağlıdır. Ulusal ölçekli klinik verilerde kron tekrarlarının en sık sebepleri <b>proksimal uyumsuzluk, marjinal hatalar ve estetik başarısızlıktır</b> — üçü de birer hassasiyet problemidir. 3mash ekosistemi <b>±20 µm</b> boyutsal hassasiyeti, tek seferlik değil <b>her baskıda</b> tekrar edilebilir şekilde sağlar; bu da tekrar oranını ve gizli maliyeti düşürür.</div></details><details><summary>Bir kron tekrarının (remake) maliyeti gerçekte ne kadar?<span>+</span></summary><div>Tahminî olarak <b>~500 dolar</b> — ve bu tutarın büyük kısmı lab ücreti değil, <b>koltuk süresidir</b> (yeniden prep, ölçü ve yapıştırma randevusu). Klinik işletme gideri saatte ~$375 modellenir; tek bir tekrar bunun çoğunu tüketir. Kendi kalemlerinizle hesaplamak için <a href="3MASH-Maliyet-Detay.html">maliyet detay sayfamıza</a> bakabilirsiniz.</div></details><details><summary>3D baskıda kürleme (post-curing) neden kritik?<span>+</span></summary><div>Çünkü baskı, cihazdan çıktığında henüz bitmemiştir. Yetersiz kürleme (undercure) <b>kırılganlık</b>, fazla kürleme (overcure) ise <b>deformasyon</b> yaratır — yazıcıda kazandığınız hassasiyeti kürlemede kaybedebilirsiniz. 3mash'in akıllı kürleme cihazı parametreleri otomatik yönetir ve bu riski kullanıcı hatasından arındırır.</div></details><details><summary>3mash yalnızca cihaz mı satıyor?<span>+</span></summary><div>Hayır. 3mash entegre bir <b>üretim ekosistemi</b> sunar: yazıcı, reçine ve kürlemeyi birlikte kalibre eder; danışmanlık, Mash Academy eğitimleri ve <b>diş teknisyeni + mühendislerden</b> oluşan satış sonrası teknik destekle tüm süreçte yanınızda olur.</div></details><details><summary>Elimdeki başka marka yazıcıyla çalışır mısınız?<span>+</span></summary><div>Evet. Hem reçine hem printer know-how'una sahip olduğumuz için çözümlerimiz <b>marka bağımsızdır</b>; mevcut cihazınızın parametrelerini optimize ederek onu da aynı sonuca getirebiliriz.</div></details></div>`;

export function renderSolutionHtml(props: ThreeMashSectionRenderProps) {
  return indexedSection(props, {
    anchor: "cozum",
    className: "tmr-section-tight",
    indexNumber: "03",
    indexText: "Çözüm · Üretim Ekosistemi",
    titleText: "Hassasiyet cihazdan çıkmaz;",
    titleEmphasis: "uyumdan çıkar.",
    sideHtml: "Kuronun oturması üç şeyin senkronuna bağlı: <b>yazıcı, reçine, kürleme.</b> Biz üçünü birlikte kalibre edip know-how'ıyla teslim ediyoruz — elinizdeki başka marka cihaza bile.",
    contentHtml: solutionContentHtml,
  });
}

export function renderCuringHtml(props: ThreeMashSectionRenderProps) {
  return indexedSection(props, {
    anchor: "kurleme",
    className: "tmr-dark",
    indexNumber: "04",
    indexText: "Kritik Son Adım",
    titleText: "Sadece yazıcı değil. Sonucu",
    titleEmphasis: "kürleme tamamlar.",
    sideHtml: "Baskı, cihazdan çıktığında bitmemiştir. Yanlış kürlenen iş, <b>doğru basılmış olsa bile</b> başarısız olur. İşte üç sebep:",
    contentHtml: curingContentHtml,
  });
}

export function renderEcosystemHtml(props: ThreeMashSectionRenderProps) {
  return indexedSection(props, {
    anchor: "ekosistem",
    indexNumber: "05",
    indexText: "Uçtan Uca",
    titleText: "Dijital akışın her parçası,",
    titleEmphasis: "tek çatı altında.",
    sideHtml: "Cihaz satıp gitmiyoruz: doğru ürün için <b>danışmanlık</b>, sürdürülebilirlik için <b>Academy eğitimleri</b>, satış sonrasında teknisyen + mühendis <b>teknik destek.</b>",
    contentHtml: ecosystemContentHtml,
  });
}

export function renderTrustHtml(props: ThreeMashSectionRenderProps) {
  return indexedSection(props, {
    anchor: "guven",
    className: "tmr-section-tight",
    indexNumber: "06",
    indexText: "Referanslar",
    titleText: "Türkiye'nin en büyük lab'ları neden",
    titleEmphasis: "bizimle üretiyor?",
    sideHtml: "Kısa cevap hep aynı: tutarlılık. <b>580+</b> dental laboratuvar ve klinik bu sistemle üretiyor, çünkü sonuç <b>her seferinde</b> aynı çıkıyor.",
    contentHtml: trustContentHtml,
  });
}

export function renderFaqHtml(props: ThreeMashSectionRenderProps) {
  return indexedSection(props, {
    anchor: "sss",
    className: "tmr-section-tight",
    indexNumber: "07",
    indexText: "Sık Sorulanlar",
    titleText: "Kısa, net cevaplar.",
    sideHtml: "Diş hekimlerinin ve laboratuvarların en çok sorduğu sorular — dolambaçsız yanıtlarla.",
    contentHtml: faqContentHtml,
  });
}

export function renderRoiHtml(props: ThreeMashSectionRenderProps) {
  return `<div class="tmr-roi"><div class="tmr-wrap"><div class="tmr-roi-num"><span>${value(props.eyebrowText, "YATIRIMIN GERİ DÖNÜŞÜ")}</span><b>${value(props.valueText, "&lt; 6 ay")}</b></div><p>${value(props.descriptionHtml, "3mash ekosistemine geçen bir klinik, yatırımını <b>6 aydan kısa sürede</b> geri kazanma potansiyeline sahip. Sonrasında bu verimlilik her yıl sürer: <b>yılda $72–162K'ya varan tasarruf potansiyeli.</b>")}</p><a class="tmr-btn" href="${escapeAttr(value(props.ctaHref, "#hesap"))}">${value(props.ctaText, "Kliniğiniz için hesaplayalım →")}</a></div></div>`;
}

export function renderFinalHtml(props: ThreeMashSectionRenderProps) {
  return `<section class="tmr-final"><div class="tmr-wrap"><h2>${heading(value(props.titleText, "Bu görünmez kaybı"), value(props.titleEmphasis, "birlikte azaltalım."))}</h2><p>${value(props.descriptionHtml, "Mevcut iş akışınızı birlikte inceleyelim; kaybın nerede oluştuğunu birlikte görelim ve size uygun ekosistemi kuralım — <b>elinizdeki cihazlarla bile.</b>")}</p><div><a class="tmr-btn tmr-btn-lime" href="${escapeAttr(value(props.primaryButtonHref, "https://3mash.com/pages/iletisim"))}">${value(props.primaryButtonText, "Uzmana danış — ücretsiz")}</a><a class="tmr-btn tmr-btn-invert" href="${escapeAttr(value(props.secondaryButtonHref, "https://3mash.com/pages/mash-academy"))}">${value(props.secondaryButtonText, "Mash Academy'yi keşfet")}</a></div></div></section>`;
}

export function renderFooterHtml(props: ThreeMashSectionRenderProps) {
  const products = value(props.productsColumnHtml, `<h6>Ürünler</h6><a href="https://3mash.com/3d-yazicilar">3D Yazıcılar</a><a href="https://3mash.com/dental-3d-yazici-recineleri">Dental Reçineler</a><a href="https://3mash.com/yikama-kurleme-cihazlari">Yıkama &amp; Kürleme</a><a href="https://3mash.com/zirkon-bloklar">Zirkon Bloklar</a>`);
  const company = value(props.companyColumnHtml, `<h6>Şirket</h6><a href="https://3mash.com/pages/about-us">Hakkımızda</a><a href="https://3mash.com/pages/mash-academy">Mash Academy</a><a href="https://3mash.com/blog">Blog</a><a href="https://3mash.com/pages/iletisim">İletişim</a>`);
  const contact = value(props.contactColumnHtml, `<h6>İletişim</h6><a href="mailto:info@3mash.com">info@3mash.com</a><a href="#">Antalya Teknokent, Konyaaltı</a><a href="https://instagram.com/3mashsocial">@3mashsocial</a>`);
  return `<footer class="tmr-footer"><div class="tmr-wrap"><div class="tmr-footer-cols"><div><div class="tmr-footer-logo"><span>∞</span><b>${value(props.logoText, "mash")}</b></div><p>${value(props.descriptionText, "Dental klinik ve laboratuvarlar için entegre 3D baskı ekosistemi: yazıcı, reçine, kürleme ve üretim know-how'ı — birlikte.")}</p></div><div>${products}</div><div>${company}</div><div>${contact}</div></div><div class="tmr-base"><span>${value(props.copyrightText, "© 2026 3MASH Teknoloji A.Ş.")}</span><span>${value(props.legalText, "KVKK · İade &amp; Garanti · Mesafeli Satış")}</span></div></div></footer>`;
}

export function ThreeMashStaticSection({ props, fallback }: { props: ThreeMashSectionRenderProps; fallback: string }) {
  return (
    <div className="three-mash-remaining" style={threeMashThemeStyle(props)}>
      <div dangerouslySetInnerHTML={html(props.sectionHtml, fallback)} />
    </div>
  );
}

