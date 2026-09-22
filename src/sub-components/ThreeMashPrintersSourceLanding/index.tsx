import { useLayoutEffect } from "preact/hooks";
import { p16lPrimaryImage } from "../../assets/solution-p16l-media-data";
import { isEnglishLocale, translateText, tLocalized, localizedHref } from "../../utils/i18n";
import { safeNavigationHref, safeRedirect } from "../../utils/safeRedirect";
import { sanitizeHtml } from "../../utils/sanitizeHtml";

const curieM1MainImage =
  "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/302ffc22-20c4-49b7-8d16-b303e079f0cf/1080/1.webp";

const halotSkyPrinterImage =
  "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/d5482fea-966e-4198-887b-7a1ffd659ed7/1080/creality-halot-sky-cl-89-recine-3d-yaz--8eb5-.webp";

type AnnouncementWindow = Window & {
  __THREE_MASH_PRODUCT_ANNOUNCEMENT__?: {
    enabled?: boolean;
    highlightText?: string;
    text?: string;
    ctaText?: string;
    href?: string;
  };
};

type Props = {
  eyebrowText?: string;
  heroTitlePrefix?: string;
  heroTitleEmphasis?: string;
  heroDescriptionHtml?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  metric1Value?: string;
  metric1Label?: string;
  metric2Value?: string;
  metric2Label?: string;
  backgroundColor?: string;
  textColor?: string;
  mutedTextColor?: string;
  accentColor?: string;
  lineColor?: string;
};

function textValue(value: string | undefined, fallback: string) {
  const trimmed = value?.trim();
  return trimmed ? translateText(trimmed) : translateText(fallback);
}

function smoothAnchorClick(event: Event, rawHref: string) {
  if (typeof window === "undefined" || !rawHref.startsWith("#") || rawHref.length <= 1) return;

  const target = document.getElementById(rawHref.slice(1));
  if (!target) return;

  event.preventDefault();
  event.stopPropagation();
  target.scrollIntoView({ behavior: "smooth", block: "center" });
}

// `path` must already be the final, locale-resolved path (use localePath()).
function crossPageAnchorClick(event: Event, path: string, sectionId: string, block: ScrollLogicalPosition = "center") {
  if (typeof window === "undefined") return;

  event.preventDefault();
  event.stopPropagation();
  try {
    localStorage.setItem("tmcl-pending-anchor-scroll", JSON.stringify({ sectionId, block }));
  } catch {
    // Continue with normal route navigation if storage is unavailable.
  }
  window.location.href = safeRedirect(path);
}

// Returns the Turkish path on the TR site and the English path on the EN site.
function localePath(turkishPath: string, englishPath: string) {
  return isEnglishLocale() ? englishPath : turkishPath;
}

function printerProductHref(turkishPath: string, englishPath: string) {
  return localePath(turkishPath, englishPath);
}

export default function ThreeMashPrintersSourceLanding(props: Props) {
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const payload = {
      enabled: true,
      highlightText: textValue(props.eyebrowText, tLocalized("⚡ Hangi yazıcı size uygun?", "⚡ Which printer suits you?")),
      text: tLocalized("Hız, çözünürlük ve bütçeye göre karşılaştırın; emin değilseniz ekibimiz eşleştirir.", "Compare based on speed, resolution, and budget; if you're not sure, our team will match you with the right option."),
      ctaText: tLocalized("Karşılaştırmaya git →", "Go to comparison →"),
      href: "#karsilastirma-tablosu",
    };
    const targetWindow = window as AnnouncementWindow;
    targetWindow.__THREE_MASH_PRODUCT_ANNOUNCEMENT__ = payload;
    window.dispatchEvent(new CustomEvent("three-mash:product-announcement", { detail: payload }));

    return () => {
      window.requestAnimationFrame(() => {
        if (targetWindow.__THREE_MASH_PRODUCT_ANNOUNCEMENT__ !== payload) return;
        delete targetWindow.__THREE_MASH_PRODUCT_ANNOUNCEMENT__;
        window.dispatchEvent(new CustomEvent("three-mash:product-announcement", { detail: { enabled: false } }));
      });
    };
  }, [props.eyebrowText]);

  const compareHref = "#karsilastirma-tablosu";
  const contactHref = localePath("/pages/iletisim", "/en/pages/iletisim");
  const resinsHref = localePath("/dental-3d-yazici-recineleri", "/en/dental-resins");
  const washCureHref = localePath("/yikama-kurleme-cihazlari", "/en/wash-and-cure-devices");
  const wavelengthBlogHref = localePath(
    "/blog/dental-3d-baskida-dogru-dalga-boyu-secimi-385nm-mi-405nm-mi",
    "/en/blog/dental-3d-baskida-dogru-dalga-boyu-secimi-385nm-mi-405nm-mi"
  );
  const p16lHref = printerProductHref("/mash-p16l-385nm-16k-dental-3d-yazici", "/en/mash-p16l-385nm-16k-dental-3d-printer");

  return (
    <div className="three-mash-printers-source" style={{
      "--p-bg": textValue(props.backgroundColor, "var(--tm-theme-bg, #FAFAF7)"),
      "--p-ink": textValue(props.textColor, "#0d0d0b"),
      "--p-sub": textValue(props.mutedTextColor, "#4f514a"),
      "--p-line": textValue(props.lineColor, "#deded6"),
      "--p-lime": textValue(props.accentColor, "#c7f136"),
    } as any}>
      <div className="hero">
        <div className="wrap">
          <div className="crumb">
            <a href={localizedHref("/")}>{tLocalized("Ana sayfa", "Home")}</a> &nbsp;/&nbsp; <a href={localizedHref("/search")}>{tLocalized("Ürünler", "Products")}</a> &nbsp;/&nbsp; <span aria-current="page">{tLocalized("3D Yazıcılar", "3D Printers")}</span>
          </div>
          <h1>
            {textValue(props.heroTitlePrefix, tLocalized("±20 mikron", "±20 microns"))} <span className="em">{textValue(props.heroTitleEmphasis, tLocalized("burada doğar.", "is born here."))}</span>
          </h1>
          <p className="sub" dangerouslySetInnerHTML={{ __html: sanitizeHtml(props.heroDescriptionHtml || tLocalized("Hassasiyet tesadüf değildir; <b>doğru dalga boyu</b>, termal stabilite ve kalibrasyonla kurulur. 3mash yazıcıları malzemeye göre tasarlanır: <b>385 nm</b> ışık reçinenin kürlenme spektrumuna tam uyar, entegre ısıtma viskoziteyi sabitler. Üstelik <b>gizli lisans veya RFID ücreti yok</b> — istediğiniz reçineyle çalışırsınız.", "Precision is not a coincidence; it's built with <b>the right wavelength</b>, thermal stability, and calibration. 3mash printers are designed around the material: <b>385 nm</b> light matches the resin's curing spectrum exactly, and integrated heating stabilizes viscosity. What's more, <b>there are no hidden license or RFID fees</b> — you can work with any resin you want.")) }} />
          <div className="cta">
            <a className="btn lime" href={compareHref} onClick={(event) => smoothAnchorClick(event, compareHref)}>{props.primaryButtonText || tLocalized("Yazıcıları karşılaştır ↓", "Compare printers ↓")}</a>
            <a className="btn line" href={isEnglishLocale() ? contactHref : safeNavigationHref(props.secondaryButtonHref, contactHref)}>{props.secondaryButtonText || tLocalized("Bana uygun olanı öner", "Recommend the right one for me")}</a>
          </div>
          <div className="vstrip">
            <div>
              <div className="v">{textValue(props.metric1Value, "385")} <em>nm</em></div>
              <div className="l">{textValue(props.metric1Label, tLocalized("reçine kürlenme spektrumuna tam uyum · keskin marjin", "perfect match to the resin's curing spectrum · sharp margin"))}</div>
            </div>
            <div>
              <div className="v">{textValue(props.metric2Value, "14×19")} <em>µm</em></div>
              <div className="l">{textValue(props.metric2Label, tLocalized("MASH P16L · 16K XY çözünürlük", "MASH P16L · 16K XY resolution"))}</div>
            </div>
            <div>
              <div className="v">±20 <em>µm</em></div>
              <div className="l">{tLocalized("CURIE M1 · tekrarlanabilir doğruluk", "CURIE M1 · repeatable accuracy")}</div>
            </div>
            <div>
              <div className="v">0 <em>{tLocalized("gizli ücret", "hidden fee")}</em></div>
              <div className="l">{tLocalized("lisans / RFID kilidi yok · marka bağımsız reçine", "no license / RFID lock · brand-independent resin")}</div>
            </div>
          </div>
        </div>
      </div>

      <section id="karsilastir">
        <div className="wrap">
          <div className="idx"><span className="n">01</span>          <span className="t">{tLocalized("CİHAZLAR", "DEVICES")}</span><span className="ln" /></div>
          <div className="shead">
            <h2>{tLocalized("İhtiyacınıza göre", "Based on your needs,")} <span className="em">{tLocalized("üç yol.", "three options.")}</span></h2>
            <div className="side">{tLocalized("En yüksek çözünürlük, en yüksek hız ya da en uygun giriş — üçü de aynı 3mash desteğiyle ve", "Highest resolution, highest speed, or the best entry point — all three come with the same 3mash support and")} <b>{tLocalized("gizli ücret olmadan", "without hidden fees")}</b>{tLocalized(" gelir.", ".")}</div>
          </div>
          <div className="pgrid">
            <div className="pc hot">
              <div className="ph"><span className="tag hot">{tLocalized("EN YÜKSEK ÇÖZÜNÜRLÜK", "HIGHEST RESOLUTION")}</span><span className="st">{tLocalized("Satışta", "For sale")}</span><img className="printer-img printer-img-p16l" src={p16lPrimaryImage} alt={tLocalized("MASH P16L dental 3D yazıcı", "MASH P16L dental 3D printer")} loading="lazy" /></div>
              <div className="bd">
                <h3>{tLocalized("MASH P16L", "MASH P16L")}</h3>
                <div className="ds">{tLocalized("385 nm profesyonel dental yazıcı.", "385 nm professional dental printer.")} <b>16K</b> {tLocalized("ultra çözünürlük ve termal kontrolle en detaylı yüzey ve keskin marjin.", "ultra resolution and thermal control deliver the most detailed surfaces and the sharpest margins.")}</div>
                <div className="kv">
                  <div><span>{tLocalized("Çözünürlük", "Resolution")}</span><b>14×19 µm · 16K</b></div>
                  <div><span>{tLocalized("Işık", "Light")}</span><b>385 nm UV</b></div>
                  <div><span>{tLocalized("Kalibrasyon", "Calibration")}</span><b>{tLocalized("8 nokta dikey kilit", "8-point vertical lock")}</b></div>
                </div>
                <a className="go" href={p16lHref}>{tLocalized("İncele", "View")} <span>→</span></a>
              </div>
            </div>
            <div className="pc">
              <div className="ph"><span className="tag">{tLocalized("YERLİ · HIZLI", "LOCAL · FAST")}</span><span className="st">{tLocalized("Talep üzerine", "On request")}</span><img className="printer-img printer-img-curie" src={curieM1MainImage} alt={tLocalized("Mash CURIE M1 dental 3D yazıcı", "Mash CURIE M1 dental 3D printer")} loading="lazy" /></div>
              <div className="bd">
                <h3>{tLocalized("Mash CURIE M1", "Mash CURIE M1")}</h3>
                <div className="ds">{tLocalized("Antalya Teknokent'te üretilen", "Made at Antalya Teknokent, this")} <b>{tLocalized("tamamen yerli", "fully domestic")}</b> {tLocalized("yazıcı. Hız ve düşük toplam maliyet için tasarlandı.", "printer is designed for speed and a low total cost of ownership.")}</div>
                <div className="kv">
                  <div><span>{tLocalized("Hassasiyet", "Precision")}</span><b>{tLocalized("±20 µm tekrarlanabilir", "±20 µm repeatable")}</b></div>
                  <div><span>{tLocalized("Hız", "Speed")}</span><b>{tLocalized("14 dk'da geçici kron", "Temporary crown in 14 minutes")}</b></div>
                  <div><span>{tLocalized("Kalibrasyon", "Calibration")}</span><b>{tLocalized("6 aya kadar gerekmez", "Not required for up to 6 months")}</b></div>
                </div>
                <a className="go" href={printerProductHref("/mash-curie-m1-dental-3d-yazici", "/en/mash-curie-m1-dental-3d-printer")}>{tLocalized("İncele", "View")} <span>→</span></a>
              </div>
            </div>
            <div className="pc">
              <div className="ph ph-halot"><span className="tag">{tLocalized("EKONOMİK GİRİŞ", "ECONOMICAL ENTRY")}</span><span className="st">{tLocalized("Talep üzerine", "On request")}</span><img className="printer-img printer-img-halot" src={halotSkyPrinterImage} alt={tLocalized("Creality Halot-Sky 6K dental 3D yazıcı", "Creality Halot-Sky 6K dental 3D printer")} loading="lazy" /></div>
              <div className="bd">
                <h3>{tLocalized("Creality Halot-Sky 6K", "Creality Halot-Sky 6K")}</h3>
                <div className="ds">{tLocalized("6K çözünürlük;", "6K resolution; the")} <b>{tLocalized("3mash iyileştirmeli", "3mash-enhanced")}</b> {tLocalized("versiyonda", "version guarantees")} <b>±15 µm</b>{tLocalized(" garanti.", ".")} {tLocalized("$10.000'lık cihaz kalitesine çok daha uygun fiyata.", "Quality close to a $10,000 device at a far more affordable price.")}</div>
                <div className="kv">
                  <div><span>{tLocalized("Çözünürlük", "Resolution")}</span><b>{tLocalized("6K", "6K")}</b></div>
                  <div><span>{tLocalized("Hassasiyet", "Precision")}</span><b>{tLocalized("±15 µm (arttırılmış)", "±15 µm (enhanced)")}</b></div>
                  <div><span>{tLocalized("Versiyon", "Version")}</span><b>{tLocalized("Fabrika / Arttırılmış", "Factory / Enhanced")}</b></div>
                </div>
                <a className="go" href={printerProductHref("/creality-halot-sky-6k", "/en/creality-halot-sky-6k-1")}>{tLocalized("İncele", "View")} <span>→</span></a>
              </div>
            </div>
          </div>

          <div className="cmp" id="karsilastirma-tablosu">
            <table>
              <thead><tr>
                <th>{tLocalized("Özellik", "Feature")}</th>
                <th>{tLocalized("MASH P16L", "MASH P16L")}<span className="t">{tLocalized("En yüksek çözünürlük", "Highest resolution")}</span></th>
                <th>{tLocalized("Mash CURIE M1", "Mash CURIE M1")}<span className="t">{tLocalized("Hız + yerli", "Speed + domestic")}</span></th>
                <th>{tLocalized("Creality Halot-Sky 6K", "Creality Halot-Sky 6K")}<span className="t">{tLocalized("Ekonomik giriş", "Economical entry")}</span></th>
              </tr></thead>
              <tbody>
                <tr><td>{tLocalized("Çözünürlük / Hassasiyet", "Resolution / Precision")}</td><td><b>14×19 µm</b> · 16K</td><td><b>±20 µm</b> {tLocalized("tekrarlanabilir", "repeatable")}</td><td><b>±15 µm</b> {tLocalized("(arttırılmış)", "(enhanced)")}</td></tr>
                <tr><td>{tLocalized("Işık kaynağı", "Light source")}</td><td>385 nm UV</td><td>{tLocalized("Yerli optik sistem", "Domestic optical system")}</td><td>6K LCD</td></tr>
                <tr><td>{tLocalized("Hız", "Speed")}</td><td>{tLocalized("Yüksek detay odaklı", "Detail-focused")}</td><td><b>{tLocalized("14 dk'da", "14 min")}</b> {tLocalized("geçici kron", "for a temporary crown")}</td><td>{tLocalized("Standart", "Standard")}</td></tr>
                <tr><td>{tLocalized("Termal kontrol", "Thermal control")}</td><td>{tLocalized("Entegre ısıtma (25/30°C)", "Integrated heating (25/30°C)")}</td><td>—</td><td>—</td></tr>
                <tr><td>{tLocalized("Kalibrasyon", "Calibration")}</td><td>{tLocalized("8 nokta dikey kilit · aylarca stabil", "8-point vertical lock · stable for months")}</td><td>{tLocalized("6 aya kadar gerekmez", "Not required for up to 6 months")}</td><td>{tLocalized("3mash servis desteği", "3mash service support")}</td></tr>
                <tr><td>{tLocalized("Gizli lisans / RFID", "Hidden license / RFID")}</td><td className="yes">{tLocalized("Yok", "None")}</td><td className="yes">{tLocalized("Yok", "None")}</td><td className="yes">{tLocalized("Yok", "None")}</td></tr>
                <tr><td>{tLocalized("En uygun", "Best for")}</td><td>{tLocalized("Detay & keskin marjin gereken işler", "Work requiring detail & sharp margins")}</td><td>{tLocalized("Yüksek hacim, hız, düşük TCO", "High volume, speed, low TCO")}</td><td>{tLocalized("Dijitale ekonomik giriş", "An economical entry into digital")}</td></tr>
              </tbody>
            </table>
          </div>
          <p className="note">{tLocalized("Not: Tüm 3mash yazıcılarında", "Note: All 3mash printers come with")} <b>{tLocalized("gizli lisans veya RFID ücreti yoktur", "no hidden license or RFID fee")}</b> {tLocalized("ve dilediğiniz marka reçineyle çalışabilirsiniz. Stok durumu için ekibimize danışın.", "and let you work with any resin brand you prefer. Ask our team about stock availability.")}</p>
        </div>
      </section>

      <section className="section-no-top">
        <div className="wrap">
          <div className="idx"><span className="n">02</span>          <span className="t">{tLocalized("ÖNE ÇIKAN", "FEATURED")}</span><span className="ln" /></div>
          <div className="flag">
            <div>
              <div className="tag">{tLocalized("MASH P16L · 385nm · 16K", "MASH P16L · 385 nm · 16K")}</div>
              <h3>{tLocalized("Marjin hattı,", "Margin line,")} <span className="em">{tLocalized("saç telinden ince.", "thinner than a strand of hair.")}</span></h3>
              <p>{tLocalized("Profesyonel 385 nm UV kaynağı reçinelerin kürlenme spektrumuna tam uyar; parazit ışığı minimize ederek", "The professional 385 nm UV source matches the curing spectrum of resins and minimizes stray light for")} <b>{tLocalized("keskin marjin hatları", "sharp margin lines")}</b>{tLocalized(" sunar. 16K çözünürlük 14×19 µm XY hassasiyet getirir; entegre termal kontrol reçine viskozitesini sabitleyerek", ". 16K resolution brings 14×19 µm XY precision; integrated thermal control stabilizes resin viscosity, so you get the same result")} <b>{tLocalized("her baskıda", "with every print")}</b>{tLocalized(" aynı sonucu güvence altına alır.", ".")}</p>
              <a className="go" href={p16lHref}>{tLocalized("Ürün detayına git →", "Go to product details →")}</a>
            </div>
            <div className="spectbl">
              <div><span>{tLocalized("XY çözünürlük", "XY resolution")}</span><b>14×19 µm (16K)</b></div>
              <div><span>{tLocalized("Işık kaynağı", "Light source")}</span><b>385 nm UV</b></div>
              <div><span>{tLocalized("Termal kontrol", "Thermal control")}</span><b>{tLocalized("Entegre (25/30°C)", "Integrated (25/30°C)")}</b></div>
              <div><span>{tLocalized("Kalibrasyon", "Calibration")}</span><b>{tLocalized("8 nokta dikey kilit", "8-point vertical lock")}</b></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-no-top">
        <div className="wrap">
          <div className="idx"><span className="n">03</span>          <span className="t">{tLocalized("NEDEN 3MASH YAZICILARI FARKLI", "WHY 3MASH PRINTERS ARE DIFFERENT")}</span><span className="ln" /></div>
          <div className="shead">
            <h2>{tLocalized("İyi cihaz değil,", "Not just a good device,")} <span className="em">{tLocalized("doğru sistem.", "the right system.")}</span></h2>
            <div className="side">{tLocalized("Hassasiyet dört şeyin bir araya gelmesiyle çıkar. 3mash yazıcıları bunları baştan düşünülerek tasarlanır.", "Precision comes from the combination of four things. 3mash printers are designed with these in mind from the start.")}</div>
          </div>
          <div className="whygrid">
            <div className="why"><div className="n">01</div><h4>{tLocalized("Malzemeye göre ışık", "Light matched to the material")}</h4><p>{tLocalized("", "The ")}<b>385 nm</b> {tLocalized("dalga boyu reçine kimyasına uyar; parazit ışığı azaltır, marjini keskinleştirir. (P16L)", "wavelength matches the resin chemistry; it reduces stray light and sharpens the margin. (P16L)")}</p></div>
            <div className="why"><div className="n">02</div><h4>{tLocalized("Termal stabilite", "Thermal stability")}</h4><p>{tLocalized("Entegre ısıtma", "Integrated heating stabilizes")} <b>{tLocalized("reçine viskozitesini", "resin viscosity")}</b> {tLocalized("sabitler; baskıdan baskıya sonucu tekrar edilebilir kılar.", "and keeps results repeatable from print to print.")}</p></div>
            <div className="why"><div className="n">03</div><h4>{tLocalized("Kalibrasyon derdi yok", "No calibration hassle")}</h4><p>{tLocalized("8 nokta dikey kilit ve", "8-point vertical lock and")} <b>{tLocalized("6 aya kadar", "up to 6 months")}</b> {tLocalized("kalibrasyon gerektirmeyen yapı — her gün aynı doğruluk.", "of calibration-free operation — the same accuracy, every day.")}</p></div>
            <div className="why"><div className="n">04</div><h4>{tLocalized("Kilitlenme yok", "No lock-in")}</h4><p><b>{tLocalized("Gizli lisans / RFID ücreti yok.", "No hidden license / RFID fee.")}</b> {tLocalized("İstediğiniz marka reçineyle çalışır, bir ekosisteme mahkûm olmazsınız.", "Works with the resin brand you want, so you're not locked into one ecosystem.")}</p></div>
          </div>

          <div className="cure">
            <div className="tx">
              <h3>{tLocalized("Yazıcı, hikâyenin", "The printer is")} <span className="em">{tLocalized("üçte biri.", "only one-third of the story.")}</span></h3>
              <p>{tLocalized("En iyi cihaz bile yanlış reçine veya yanlış kürlemeyle hassasiyeti kaybeder. Kuronun oturması", "Even the best device loses precision with the wrong resin or the wrong curing. Whether a crown seats properly depends on the synchronization of")} <b>{tLocalized("yazıcı + reçine + kürlemenin", "printer + resin + curing")}</b>{tLocalized(" senkronuna bağlıdır — biz üçünü birlikte kalibre ediyoruz.", " — we calibrate all three together.")}</p>
            </div>
            <div className="lk">
              <a className="btn" href={resinsHref}>{tLocalized("Uyumlu reçineler →", "Compatible resins →")}</a>
              <a
                className="btn line"
                href={`${washCureHref}#neden-gerekli`}
                onClick={(event) => crossPageAnchorClick(event, washCureHref, "neden-gerekli")}
              >
                {tLocalized("Kürlemenin önemi →", "The importance of curing →")}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-no-top" id="sss">
        <div className="wrap">
          <div className="idx"><span className="n">04</span>          <span className="t">{tLocalized("SIK SORULANLAR", "FREQUENTLY ASKED QUESTIONS")}</span><span className="ln" /></div>
          <div className="shead"><h2>{tLocalized("Yazıcı seçerken merak edilenler.", "Frequently asked questions when choosing a printer.")}</h2><div className="side">{tLocalized("Diş hekimleri ve laboratuvarların en çok sorduğu sorular, net cevaplarla.", "The most frequently asked questions from dentists and labs, with clear answers.")}</div></div>
          <div className="faq">
            <div className="qa"><details open><summary>{tLocalized("Hangi dental 3D yazıcıyı seçmeliyim?", "Which dental 3D printer should I choose?")}<span className="pl">+</span></summary>
              <div className="a">{tLocalized("İhtiyacınıza göre: en yüksek çözünürlük ve keskin marjin için", "It depends on your needs: for the highest resolution and sharpest margins, choose the")} <b>MASH P16L</b> {tLocalized("(385 nm · 16K · 14×19 µm); hız ve düşük toplam maliyet için yerli", "(385 nm · 16K · 14×19 µm); for speed and low total cost, the domestic")} <b>Mash CURIE M1</b> {tLocalized("(±20 µm, 14 dk'da geçici kron); dijitale ekonomik giriş için", "(±20 µm, temporary crown in 14 min); for an economical entry into digital, the")} <b>Creality Halot-Sky 6K</b> {tLocalized("(arttırılmış versiyonda ±15 µm). Emin değilseniz yukarıdaki", "(±15 µm in the enhanced version). If you're not sure, check out")} <a href="#karsilastir">{tLocalized("karşılaştırmayı", "the comparison")}</a> {tLocalized("kullanın veya ekibimize danışın.", "above or consult our team.")}</div></details></div>
            <div className="qa"><details><summary>{tLocalized("385 nm mi, 405 nm mi? Fark ne?", "385 nm or 405 nm? What's the difference?")}<span className="pl">+</span></summary>
              <div className="a">{tLocalized("", "The ")}<b>385 nm</b> {tLocalized("dalga boyu, çoğu dental reçinenin kürlenme spektrumuna daha iyi uyar; parazit ışığı azaltır ve daha keskin marjinler sağlar. MASH P16L bu yüzden profesyonel 385 nm UV kaynağı kullanır. Detaylı karşılaştırma için Mash Academy'deki", "wavelength better matches the curing spectrum of most dental resins; it reduces stray light and provides sharper margins. This is why the MASH P16L uses a professional 385 nm UV source. For a detailed comparison, see the Mash Academy article")} <a href={wavelengthBlogHref}>{tLocalized("385nm mi 405nm mi?", "385nm or 405nm?")}</a>{tLocalized(" yazısına bakabilirsiniz.", "")}</div></details></div>
            <div className="qa"><details><summary>{tLocalized("Gizli lisans veya RFID reçine ücreti var mı?", "Is there a hidden license or RFID resin fee?")}<span className="pl">+</span></summary>
              <div className="a"><b>{tLocalized("Hayır.", "No.")}</b> {tLocalized("3mash yazıcılarında gizli lisans veya RFID kilidi yoktur. Cihazı bir marka reçineye mahkûm etmiyoruz; dilediğiniz reçineyle çalışabilir, maliyetinizi kendiniz kontrol edebilirsiniz.", "3mash printers have no hidden license or RFID lock. We don't tie the device to a single resin brand; you can work with any resin you like and control your own costs.")}</div></details></div>
            <div className="qa"><details><summary>{tLocalized("Ne sıklıkta kalibrasyon gerekir?", "How often is calibration required?")}<span className="pl">+</span></summary>
              <div className="a">{tLocalized("Sık sık değil. MASH P16L", "Not often. The MASH P16L's")} <b>{tLocalized("8 nokta dikey kilit", "8-point vertical lock")}</b> {tLocalized("sayesinde aylarca stabil kalır; Mash CURIE M1", "keeps it stable for months; the Mash CURIE M1 goes")} <b>{tLocalized("6 aya kadar", "up to 6 months")}</b> {tLocalized("kalibrasyon gerektirmez. Böylece her gün aynı doğrulukta baskı alırsınız.", "without calibration. That way you get the same print accuracy every day.")}</div></details></div>
            <div className="qa"><details><summary>{tLocalized("Başka marka reçineyle çalışır mı?", "Does it work with another brand's resin?")}<span className="pl">+</span></summary>
              <div className="a">{tLocalized("Evet. 3mash yazıcıları marka bağımsızdır. Dahası teknik ekibimiz, kullandığınız reçineyi", "Yes. 3mash printers are brand-independent. What's more, our technical team helps you get the best result with the resin you use by")} <b>{tLocalized("cihazınızın parametreleriyle birlikte kalibre ederek", "calibrating it together with your device's parameters")}</b>{tLocalized(" en iyi sonucu almanızı sağlar.", ".")}</div></details></div>
          </div>
        </div>
      </section>

      <section className="final">
        <div className="wrap">
          <h2>{tLocalized("Doğru yazıcıyı", "Let's choose the right printer")} <span className="em">{tLocalized("birlikte seçelim.", "together.")}</span></h2>
          <p>{tLocalized("Hangi işler, hangi hacim, hangi bütçe? Kısa bir görüşmeyle size en uygun cihazı, reçineyi ve doğru parametreleri", "What kind of work, what volume, what budget? In a short conversation we'll recommend the right device, resin, and parameters for you")} <b>{tLocalized("ücretsiz", "free of charge")}</b>{tLocalized(" önerelim — elinizdeki cihazı da değerlendiririz.", " — and we'll evaluate the device you already own, too.")}</p>
          <div className="cta">
            <a className="btn lime" href={contactHref}>{tLocalized("Uzmana danış — ücretsiz", "Consult an expert — free")}</a>
            <a className="btn inv" href={compareHref} onClick={(event) => smoothAnchorClick(event, compareHref)}>{tLocalized("Karşılaştırmaya dön", "Back to comparison")}</a>
          </div>
        </div>
      </section>
    </div>
  );
}
