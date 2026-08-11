import { useEffect } from "preact/hooks";
import { p16lPrimaryImage } from "../../assets/solution-p16l-media-data";

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
  return trimmed ? trimmed : fallback;
}

export default function ThreeMashPrintersSourceLanding(props: Props) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const payload = {
      enabled: true,
      highlightText: textValue(props.eyebrowText, "⚡ Hangi yazıcı size uygun?"),
      text: "Hız, çözünürlük ve bütçeye göre karşılaştırın; emin değilseniz ekibimiz eşleştirir.",
      ctaText: "Karşılaştırmaya git →",
      href: "#karsilastir",
    };
    const targetWindow = window as AnnouncementWindow;
    targetWindow.__THREE_MASH_PRODUCT_ANNOUNCEMENT__ = payload;
    window.dispatchEvent(new CustomEvent("three-mash:product-announcement", { detail: payload }));

    return () => {
      delete targetWindow.__THREE_MASH_PRODUCT_ANNOUNCEMENT__;
      window.dispatchEvent(new CustomEvent("three-mash:product-announcement", { detail: { enabled: false } }));
    };
  }, [props.eyebrowText]);

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
            <a href="/">Ana sayfa</a> &nbsp;/&nbsp; Ürünler &nbsp;/&nbsp; 3D Yazıcılar
          </div>
          <h1>
            {textValue(props.heroTitlePrefix, "±20 mikron")} <span className="em">{textValue(props.heroTitleEmphasis, "burada doğar.")}</span>
          </h1>
          <p className="sub" dangerouslySetInnerHTML={{ __html: props.heroDescriptionHtml || "Hassasiyet tesadüf değildir; <b>doğru dalga boyu</b>, termal stabilite ve kalibrasyonla kurulur. 3mash yazıcıları malzemeye göre tasarlanır: <b>385 nm</b> ışık reçinenin kürlenme spektrumuna tam uyar, entegre ısıtma viskoziteyi sabitler. Üstelik <b>gizli lisans veya RFID ücreti yok</b> — istediğiniz reçineyle çalışırsınız." }} />
          <div className="cta">
            <a className="btn lime" href={props.primaryButtonHref || "#karsilastir"}>{props.primaryButtonText || "Yazıcıları karşılaştır ↓"}</a>
            <a className="btn line" href={props.secondaryButtonHref || "/pages/iletisim"}>{props.secondaryButtonText || "Bana uygun olanı öner"}</a>
          </div>
          <div className="vstrip">
            <div>
              <div className="v">{textValue(props.metric1Value, "385")} <em>nm</em></div>
              <div className="l">{textValue(props.metric1Label, "reçine kürlenme spektrumuna tam uyum · keskin marjin")}</div>
            </div>
            <div>
              <div className="v">{textValue(props.metric2Value, "14×19")} <em>µm</em></div>
              <div className="l">{textValue(props.metric2Label, "MASH P16L · 16K XY çözünürlük")}</div>
            </div>
            <div>
              <div className="v">±20 <em>µm</em></div>
              <div className="l">CURIE M1 · tekrarlanabilir doğruluk</div>
            </div>
            <div>
              <div className="v">0 <em>gizli ücret</em></div>
              <div className="l">lisans / RFID kilidi yok · marka bağımsız reçine</div>
            </div>
          </div>
        </div>
      </div>

      <section id="karsilastir">
        <div className="wrap">
          <div className="idx"><span className="n">01</span><span className="t">Cihazlar</span><span className="ln" /></div>
          <div className="shead">
            <h2>İhtiyacınıza göre <span className="em">üç yol.</span></h2>
            <div className="side">En yüksek çözünürlük, en yüksek hız ya da en uygun giriş — üçü de aynı 3mash desteğiyle ve <b>gizli ücret olmadan</b> gelir.</div>
          </div>
          <div className="pgrid">
            <div className="pc hot">
              <div className="ph"><span className="tag hot">EN YÜKSEK ÇÖZÜNÜRLÜK</span><span className="st">Satışta</span><img className="printer-img printer-img-p16l" src={p16lPrimaryImage} alt="MASH P16L dental 3D yazıcı" loading="lazy" /></div>
              <div className="bd">
                <h3>MASH P16L</h3>
                <div className="ds">385 nm profesyonel dental yazıcı. <b>16K</b> ultra çözünürlük ve termal kontrolle en detaylı yüzey ve keskin marjin.</div>
                <div className="kv">
                  <div><span>Çözünürlük</span><b>14×19 µm · 16K</b></div>
                  <div><span>Işık</span><b>385 nm UV</b></div>
                  <div><span>Kalibrasyon</span><b>8 nokta dikey kilit</b></div>
                </div>
                <a className="go" href="/mash-p16l-385nm-16k-dental-3d-yazici">İncele <span>→</span></a>
              </div>
            </div>
            <div className="pc">
              <div className="ph"><span className="tag">YERLİ · HIZLI</span><span className="st">Talep üzerine</span><img className="printer-img printer-img-curie" src={curieM1MainImage} alt="Mash CURIE M1 dental 3D yazıcı" loading="lazy" /></div>
              <div className="bd">
                <h3>Mash CURIE M1</h3>
                <div className="ds">Antalya Teknokent'te üretilen <b>tamamen yerli</b> yazıcı. Hız ve düşük toplam maliyet için tasarlandı.</div>
                <div className="kv">
                  <div><span>Hassasiyet</span><b>±20 µm tekrarlanabilir</b></div>
                  <div><span>Hız</span><b>14 dk'da geçici kron</b></div>
                  <div><span>Kalibrasyon</span><b>6 aya kadar gerekmez</b></div>
                </div>
                <a className="go" href="/mash-curie-m1-dental-3d-yazici">İncele <span>→</span></a>
              </div>
            </div>
            <div className="pc">
              <div className="ph ph-halot"><span className="tag">EKONOMİK GİRİŞ</span><span className="st">Talep üzerine</span><img className="printer-img printer-img-halot" src={halotSkyPrinterImage} alt="Creality Halot-Sky 6K dental 3D yazıcı" loading="lazy" /></div>
              <div className="bd">
                <h3>Creality Halot-Sky 6K</h3>
                <div className="ds">6K çözünürlük; <b>3mash iyileştirmeli</b> versiyonda <b>±15 µm</b> garanti. $10.000'lık cihaz kalitesine çok daha uygun fiyata.</div>
                <div className="kv">
                  <div><span>Çözünürlük</span><b>6K</b></div>
                  <div><span>Hassasiyet</span><b>±15 µm (arttırılmış)</b></div>
                  <div><span>Versiyon</span><b>Fabrika / Arttırılmış</b></div>
                </div>
                <a className="go" href="/creality-halot-sky-6k">İncele <span>→</span></a>
              </div>
            </div>
          </div>

          <div className="cmp">
            <table>
              <thead><tr>
                <th>Özellik</th>
                <th>MASH P16L<span className="t">En yüksek çözünürlük</span></th>
                <th>Mash CURIE M1<span className="t">Hız + yerli</span></th>
                <th>Creality Halot-Sky 6K<span className="t">Ekonomik giriş</span></th>
              </tr></thead>
              <tbody>
                <tr><td>Çözünürlük / Hassasiyet</td><td><b>14×19 µm</b> · 16K</td><td><b>±20 µm</b> tekrarlanabilir</td><td><b>±15 µm</b> (arttırılmış)</td></tr>
                <tr><td>Işık kaynağı</td><td>385 nm UV</td><td>Yerli optik sistem</td><td>6K LCD</td></tr>
                <tr><td>Hız</td><td>Yüksek detay odaklı</td><td><b>14 dk'da</b> geçici kron</td><td>Standart</td></tr>
                <tr><td>Termal kontrol</td><td>Entegre ısıtma (25/30°C)</td><td>—</td><td>—</td></tr>
                <tr><td>Kalibrasyon</td><td>8 nokta dikey kilit · aylarca stabil</td><td>6 aya kadar gerekmez</td><td>3mash servis desteği</td></tr>
                <tr><td>Gizli lisans / RFID</td><td className="yes">Yok</td><td className="yes">Yok</td><td className="yes">Yok</td></tr>
                <tr><td>En uygun</td><td>Detay & keskin marjin gereken işler</td><td>Yüksek hacim, hız, düşük TCO</td><td>Dijitale ekonomik giriş</td></tr>
              </tbody>
            </table>
          </div>
          <p className="note">Not: Tüm 3mash yazıcılarında <b>gizli lisans veya RFID ücreti yoktur</b> ve dilediğiniz marka reçineyle çalışabilirsiniz. Stok durumu için ekibimize danışın.</p>
        </div>
      </section>

      <section className="section-no-top">
        <div className="wrap">
          <div className="idx"><span className="n">02</span><span className="t">Öne Çıkan</span><span className="ln" /></div>
          <div className="flag">
            <div>
              <div className="tag">MASH P16L · 385nm · 16K</div>
              <h3>Marjin hattı, <span className="em">saç telinden ince.</span></h3>
              <p>Profesyonel 385 nm UV kaynağı reçinelerin kürlenme spektrumuna tam uyar; parazit ışığı minimize ederek <b>keskin marjin hatları</b> sunar. 16K çözünürlük 14×19 µm XY hassasiyet getirir; entegre termal kontrol reçine viskozitesini sabitleyerek <b>her baskıda</b> aynı sonucu güvence altına alır.</p>
              <a className="go" href="/mash-p16l-385nm-16k-dental-3d-yazici">Ürün detayına git →</a>
            </div>
            <div className="spectbl">
              <div><span>XY çözünürlük</span><b>14×19 µm (16K)</b></div>
              <div><span>Işık kaynağı</span><b>385 nm UV</b></div>
              <div><span>Termal kontrol</span><b>Entegre (25/30°C)</b></div>
              <div><span>Kalibrasyon</span><b>8 nokta dikey kilit</b></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-no-top">
        <div className="wrap">
          <div className="idx"><span className="n">03</span><span className="t">Neden 3mash Yazıcıları Farklı</span><span className="ln" /></div>
          <div className="shead">
            <h2>İyi cihaz değil, <span className="em">doğru sistem.</span></h2>
            <div className="side">Hassasiyet dört şeyin bir araya gelmesiyle çıkar. 3mash yazıcıları bunları baştan düşünülerek tasarlanır.</div>
          </div>
          <div className="whygrid">
            <div className="why"><div className="n">01</div><h4>Malzemeye göre ışık</h4><p><b>385 nm</b> dalga boyu reçine kimyasına uyar; parazit ışığı azaltır, marjini keskinleştirir. (P16L)</p></div>
            <div className="why"><div className="n">02</div><h4>Termal stabilite</h4><p>Entegre ısıtma <b>reçine viskozitesini</b> sabitler; baskıdan baskıya sonucu tekrar edilebilir kılar.</p></div>
            <div className="why"><div className="n">03</div><h4>Kalibrasyon derdi yok</h4><p>8 nokta dikey kilit ve <b>6 aya kadar</b> kalibrasyon gerektirmeyen yapı — her gün aynı doğruluk.</p></div>
            <div className="why"><div className="n">04</div><h4>Kilitlenme yok</h4><p><b>Gizli lisans / RFID ücreti yok.</b> İstediğiniz marka reçineyle çalışır, bir ekosisteme mahkûm olmazsınız.</p></div>
          </div>

          <div className="cure">
            <div className="tx">
              <h3>Yazıcı, hikâyenin <span className="em">üçte biri.</span></h3>
              <p>En iyi cihaz bile yanlış reçine veya yanlış kürlemeyle hassasiyeti kaybeder. Kuronun oturması <b>yazıcı + reçine + kürlemenin</b> senkronuna bağlıdır — biz üçünü birlikte kalibre ediyoruz.</p>
            </div>
            <div className="lk">
              <a className="btn" href="/dental-3d-yazici-recineleri">Uyumlu reçineler →</a>
              <a className="btn line" href="/#kurleme">Kürlemenin önemi →</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-no-top" id="sss">
        <div className="wrap">
          <div className="idx"><span className="n">04</span><span className="t">Sık Sorulanlar</span><span className="ln" /></div>
          <div className="shead"><h2>Yazıcı seçerken merak edilenler.</h2><div className="side">Diş hekimleri ve laboratuvarların en çok sorduğu sorular, net cevaplarla.</div></div>
          <div className="faq">
            <div className="qa"><details open><summary>Hangi dental 3D yazıcıyı seçmeliyim?<span className="pl">+</span></summary>
              <div className="a">İhtiyacınıza göre: en yüksek çözünürlük ve keskin marjin için <b>MASH P16L</b> (385 nm · 16K · 14×19 µm); hız ve düşük toplam maliyet için yerli <b>Mash CURIE M1</b> (±20 µm, 14 dk'da geçici kron); dijitale ekonomik giriş için <b>Creality Halot-Sky 6K</b> (arttırılmış versiyonda ±15 µm). Emin değilseniz yukarıdaki <a href="#karsilastir">karşılaştırmayı</a> kullanın veya ekibimize danışın.</div></details></div>
            <div className="qa"><details><summary>385 nm mi, 405 nm mi? Fark ne?<span className="pl">+</span></summary>
              <div className="a"><b>385 nm</b> dalga boyu, çoğu dental reçinenin kürlenme spektrumuna daha iyi uyar; parazit ışığı azaltır ve daha keskin marjinler sağlar. MASH P16L bu yüzden profesyonel 385 nm UV kaynağı kullanır. Detaylı karşılaştırma için Mash Academy'deki <a href="/blog/dental-3d-baskida-dogru-dalga-boyu-secimi-385nm-mi-405nm-mi">385nm mi 405nm mi?</a> yazısına bakabilirsiniz.</div></details></div>
            <div className="qa"><details><summary>Gizli lisans veya RFID reçine ücreti var mı?<span className="pl">+</span></summary>
              <div className="a"><b>Hayır.</b> 3mash yazıcılarında gizli lisans veya RFID kilidi yoktur. Cihazı bir marka reçineye mahkûm etmiyoruz; dilediğiniz reçineyle çalışabilir, maliyetinizi kendiniz kontrol edebilirsiniz.</div></details></div>
            <div className="qa"><details><summary>Ne sıklıkta kalibrasyon gerekir?<span className="pl">+</span></summary>
              <div className="a">Sık sık değil. MASH P16L <b>8 nokta dikey kilit</b> sayesinde aylarca stabil kalır; Mash CURIE M1 <b>6 aya kadar</b> kalibrasyon gerektirmez. Böylece her gün aynı doğrulukta baskı alırsınız.</div></details></div>
            <div className="qa"><details><summary>Başka marka reçineyle çalışır mı?<span className="pl">+</span></summary>
              <div className="a">Evet. 3mash yazıcıları marka bağımsızdır. Dahası teknik ekibimiz, kullandığınız reçineyi <b>cihazınızın parametreleriyle birlikte kalibre ederek</b> en iyi sonucu almanızı sağlar.</div></details></div>
          </div>
        </div>
      </section>

      <section className="final">
        <div className="wrap">
          <h2>Doğru yazıcıyı <span className="em">birlikte seçelim.</span></h2>
          <p>Hangi işler, hangi hacim, hangi bütçe? Kısa bir görüşmeyle size en uygun cihazı, reçineyi ve doğru parametreleri <b>ücretsiz</b> önerelim — elinizdeki cihazı da değerlendiririz.</p>
          <div className="cta">
            <a className="btn lime" href="/pages/iletisim">Uzmana danış — ücretsiz</a>
            <a className="btn inv" href="#karsilastir">Karşılaştırmaya dön</a>
          </div>
        </div>
      </section>
    </div>
  );
}
