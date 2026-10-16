import { useState } from "preact/hooks";
import mashp16lMedia from "../../assets/mashp16l-media-data";
import { tLocalized } from "../../utils/i18n";

const featureCards = [
  {
    image: 17,
    title: tLocalized("385 nm UV ışık kaynağı", "385nm UV light source"),
    text: tLocalized("Düşük ışık saçılımıyla hassas kürleme.", "Precise curing with reduced light scattering."),
  },
  {
    image: 6,
    title: tLocalized("Yüksek geçirgenlikli ekran", "High-transmission screen"),
    text: tLocalized("Verimli pozlama ve tutarlı baskı performansı.", "Efficient exposure and consistent printing performance."),
  },
  {
    image: 21,
    title: tLocalized("Kararlı Z ekseni", "Stable Z-axis"),
    text: tLocalized("Endüstriyel sınıf mekanik bileşenlerle kararlı hareket.", "Stable movement with industrial-grade mechanical components."),
  },
  {
    image: 22,
    title: tLocalized("16K ince detay", "16K fine detail"),
    text: tLocalized("Küçük piksel boyutuyla keskin yüzey ayrıntıları.", "Sharp surface detail with a small pixel size."),
  },
  {
    image: 16,
    title: tLocalized("Akıllı otomatik ısıtma", "Smart auto heating"),
    text: tLocalized("Reçineyi ideal çalışma sıcaklığında tutmaya yardımcı olur.", "Helps keep resin at its ideal working temperature."),
  },
  {
    image: 15,
    title: tLocalized("Üretim iş akışı", "Production workflow"),
    text: tLocalized("Dental ve mikro üretim süreçleri için tasarlandı.", "Designed for dental and micro-production workflows."),
  },
];

const galleryCards = [
  { image: 2, title: tLocalized("Otomatik ısıtma ayrıntısı", "Auto-heating detail") },
  { image: 3, title: tLocalized("Baskı süreci kontrolü", "Print-process control") },
  { image: 4, title: tLocalized("Hassas sıcaklık yönetimi", "Precise temperature management") },
  { image: 5, title: tLocalized("Baskı alanı", "Print area") },
  { image: 7, title: tLocalized("Ekran ve optik yapı", "Screen and optical design") },
  { image: 8, title: tLocalized("Cihaz kontrolü", "Device controls") },
  { image: 9, title: tLocalized("Kullanıcı arayüzü", "User interface") },
  { image: 10, title: tLocalized("Uygulama örneği", "Application example") },
  { image: 11, title: tLocalized("Akıllı izleme", "Smart monitoring") },
  { image: 12, title: tLocalized("Uygulama desteği", "Application support") },
  { image: 13, title: tLocalized("Baskı mekanizması", "Printing mechanism") },
  { image: 14, title: tLocalized("Üretim ayrıntısı", "Production detail") },
  { image: 18, title: tLocalized("UV ışık sistemi", "UV light system") },
  { image: 23, title: tLocalized("İnce yüzey ayrıntıları", "Fine surface details") },
  { image: 24, title: tLocalized("Uygulama görünümü", "Application view") },
  { image: 25, title: tLocalized("Baskı örneği", "Print example") },
  { image: 26, title: tLocalized("Dental üretim", "Dental production") },
];

const questions = [
  {
    question: tLocalized("MASH P16L kimler için uygundur?", "Who is the MASH P16L designed for?"),
    answer: tLocalized(
      "Yüksek detaylı dental ve mikro üretim işlerinde hassasiyet ve kararlı iş akışı arayan laboratuvarlar için tasarlanmıştır.",
      "It is designed for laboratories that need precision and a stable workflow for high-detail dental and micro-production."
    ),
  },
  {
    question: tLocalized("385 nm UV ışık kaynağının avantajı nedir?", "What is the benefit of the 385nm UV light source?"),
    answer: tLocalized(
      "Kontrollü ışık dağılımı, küçük geometrilerde hassas kürlemeyi destekler.",
      "Controlled light distribution supports precise curing around small geometries."
    ),
  },
  {
    question: tLocalized("Otomatik reçine besleme nasıl çalışır?", "How does automatic resin feeding work?"),
    answer: tLocalized(
      "Besleme sistemi baskı sırasında reçine seviyesini destekler. Kurulum ve kullanım için cihaz kılavuzundaki güvenlik adımlarını izleyin.",
      "The feeding system helps maintain the resin level during printing. Follow the safety steps in the printer manual for setup and use."
    ),
  },
];

export default function MashP16LAlternatePage() {
  const [activeFeature, setActiveFeature] = useState(0);
  const selectedFeature = featureCards[activeFeature] ?? featureCards[0];

  return (
    <div className="mashp16l-page">
      <section className="mashp16l-hero" aria-labelledby="mashp16l-hero-title">
        <img
          className="mashp16l-hero-image"
          src={mashp16lMedia[0]}
          alt={tLocalized("MASH P16L 3D yazıcı", "MASH P16L 3D printer")}
          fetchPriority="high"
        />
        <div className="mashp16l-hero-shade" />
        <div className="mashp16l-hero-copy">
          <p className="mashp16l-eyebrow">{tLocalized("385 nm UV · 16K hassasiyet", "385nm UV · 16K precision")}</p>
          <h2 id="mashp16l-hero-title">
            {tLocalized("MASH P16L ile ince detaylarda yeni seviye", "A new level of fine detail with MASH P16L")}
          </h2>
          <p>{tLocalized("Dental üretimde netlik, kararlılık ve güvenilir iş akışı.", "Clarity, stability, and a dependable workflow for dental production.")}</p>
        </div>
      </section>

      <section className="mashp16l-intro" aria-labelledby="mashp16l-intro-title">
        <p className="mashp16l-eyebrow">{tLocalized("Öne çıkan özellikler", "Key features")}</p>
        <h2 id="mashp16l-intro-title">{tLocalized("Her ayrıntıda hassasiyet.", "Precision in every detail.")}</h2>
        <p>{tLocalized("Detay, kararlılık ve üretkenlik tek bir dental üretim sisteminde buluşuyor.", "Detail, stability, and productivity come together in one dental production system.")}</p>
      </section>

      <section className="mashp16l-feature-grid" aria-label={tLocalized("MASH P16L özellikleri", "MASH P16L features")}>
        {featureCards.map((feature, index) => (
          <article className="mashp16l-feature-card" key={feature.title}>
            <img src={mashp16lMedia[feature.image]} alt="" loading="lazy" decoding="async" />
            <div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </div>
            <button
              type="button"
              aria-label={tLocalized(`${feature.title} ayrıntılarını göster`, `Show ${feature.title} details`)}
              aria-pressed={activeFeature === index}
              onClick={() => setActiveFeature(index)}
            />
          </article>
        ))}
      </section>

      <section className="mashp16l-uv-section">
        <div className="mashp16l-copy">
          <p className="mashp16l-eyebrow">{selectedFeature.title}</p>
          <h2>{tLocalized("Hassas kürleme için kontrollü ışık.", "Controlled light for precise curing.")}</h2>
          <p>{selectedFeature.text}</p>
        </div>
        <img
          src={mashp16lMedia[17]}
          alt={tLocalized("MASH P16L UV ışık kaynağı", "MASH P16L UV light source")}
          loading="lazy"
          decoding="async"
        />
      </section>

      <section className="mashp16l-media-section" aria-labelledby="mashp16l-media-title">
        <div className="mashp16l-section-heading">
          <p className="mashp16l-eyebrow">{tLocalized("16K stüdyo kalitesinde hassasiyet", "16K studio-grade precision")}</p>
          <h2 id="mashp16l-media-title">{tLocalized("Mikro ayrıntıları görün.", "See the finest details.")}</h2>
        </div>
        <video
          className="mashp16l-video"
          src={mashp16lMedia[20]}
          poster={mashp16lMedia[19]}
          controls
          playsInline
          preload="metadata"
          aria-label={tLocalized("MASH P16L baskı ayrıntıları videosu", "MASH P16L printing detail video")}
        >
          {tLocalized("Tarayıcınız bu videoyu oynatamıyor.", "Your browser cannot play this video.")}
        </video>
      </section>

      <section className="mashp16l-gallery" aria-label={tLocalized("MASH P16L görselleri", "MASH P16L images")}>
        {galleryCards.map((card) => (
          <figure className="mashp16l-gallery-card" key={card.image}>
            <img src={mashp16lMedia[card.image]} alt={card.title} loading="lazy" decoding="async" />
            <figcaption>{card.title}</figcaption>
          </figure>
        ))}
      </section>

      <section className="mashp16l-specs" aria-labelledby="mashp16l-specs-title">
        <div className="mashp16l-section-heading">
          <p className="mashp16l-eyebrow">{tLocalized("16K ekran", "16K screen")}</p>
          <h2 id="mashp16l-specs-title">{tLocalized("Keskin baskıların teknik temeli.", "The technical foundation of sharp prints.")}</h2>
        </div>
        <dl>
          <div><dt>{tLocalized("Çözünürlük", "Resolution")}</dt><dd>15120 × 6230</dd></div>
          <div><dt>{tLocalized("Piksel boyutu", "Pixel size")}</dt><dd>14 × 19 µm</dd></div>
          <div><dt>{tLocalized("Işık düzgünlüğü", "Light uniformity")}</dt><dd>≥ 88%</dd></div>
          <div><dt>{tLocalized("Kontrast oranı", "Contrast ratio")}</dt><dd>≥ 500:1</dd></div>
        </dl>
      </section>

      <section className="mashp16l-faq" aria-labelledby="mashp16l-faq-title">
        <div className="mashp16l-section-heading">
          <p className="mashp16l-eyebrow">{tLocalized("Yardım", "Support")}</p>
          <h2 id="mashp16l-faq-title">{tLocalized("Sıkça sorulan sorular", "Frequently asked questions")}</h2>
        </div>
        <div className="mashp16l-faq-list">
          {questions.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
