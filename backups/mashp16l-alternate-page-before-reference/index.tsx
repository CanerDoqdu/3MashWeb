import { useState } from "preact/hooks";
import { tLocalized } from "../../utils/i18n";

const media = {
  banner: "https://uniformation3d.com/cdn/shop/files/3000x1200_1_bec26c8e-744c-4acb-be7d-88d94e80d17d.jpg",
  bannerMobile: "https://uniformation3d.com/cdn/shop/files/Banner-Phone_1217816c-0613-4001-b2eb-166ed218d4a6.jpg",
  uv: "https://uniformation3d.com/cdn/shop/files/8_12072ff8-ab23-4b56-8132-43fc9782ba31.jpg",
  uvComparison: [
    "https://uniformation3d.com/cdn/shop/files/9_b478cfed-a14d-40e6-b632-a7628d16a461.jpg",
    "https://uniformation3d.com/cdn/shop/files/10_37ebb50a-e79d-4d04-bacc-1dfda80215e3.jpg",
  ],
  strength: "https://uniformation3d.com/cdn/shop/files/PC-1.jpg",
  precisionVideo: "https://uniformation3d.com/cdn/shop/videos/c/vp/af6e767938594e2abcb37c1974eb7229/af6e767938594e2abcb37c1974eb7229.HD-1080p-7.2Mbps-85284505.mp4",
  precisionPoster: "https://uniformation3d.com/cdn/shop/files/preview_images/af6e767938594e2abcb37c1974eb7229.thumbnail.0000000000_small.jpg",
  applications: [
    "https://uniformation3d.com/cdn/shop/files/1600x900_4.jpg",
    "https://uniformation3d.com/cdn/shop/files/1600x900_5.jpg",
  ],
  zAxis: [
    "https://uniformation3d.com/cdn/shop/files/11_4fc62fea-9b69-4a62-b16c-8d6862cf657e.jpg",
    "https://uniformation3d.com/cdn/shop/files/12_f679902a-6024-4b98-b9cc-cba575207f87.jpg",
  ],
  heating: "https://uniformation3d.com/cdn/shop/files/5_76521a24-d3aa-413f-ad69-7822c81b059e.jpg",
  heatingDetail: "https://uniformation3d.com/cdn/shop/files/13_f9b26c9a-2929-4c00-bd73-759728774bf3.png",
  screen: "https://uniformation3d.com/cdn/shop/files/17_181ae95e-4760-49f7-a791-579a9a135397.jpg",
  screenDetail: "https://uniformation3d.com/cdn/shop/files/17_1671171a-cfa4-42bf-b1ba-de9c0040cc9f.png",
  feedingVideo: "https://uniformation3d.com/cdn/shop/videos/c/vp/028d6018c33449a29bc09747a4503f87/028d6018c33449a29bc09747a4503f87.SD-480p-1.5Mbps-85299009.mp4",
  feedingPoster: "https://uniformation3d.com/cdn/shop/files/preview_images/028d6018c33449a29bc09747a4503f87.thumbnail.0000000000_1200x.jpg",
  lcdVideo: "https://uniformation3d.com/cdn/shop/videos/c/vp/8435a8bcb1554949991ca9ddeb670eeb/8435a8bcb1554949991ca9ddeb670eeb.HD-1080p-7.2Mbps-85297052.mp4",
  lcdPoster: "https://uniformation3d.com/cdn/shop/files/preview_images/8435a8bcb1554949991ca9ddeb670eeb.thumbnail.0000000000_1200x.jpg",
  innovationVideo: "https://uniformation3d.com/cdn/shop/videos/c/vp/c2daab2353144335809bf30d08ba873f/c2daab2353144335809bf30d08ba873f.SD-480p-1.5Mbps-85299606.mp4",
  innovationPoster: "https://uniformation3d.com/cdn/shop/files/preview_images/c2daab2353144335809bf30d08ba873f.thumbnail.0000000000_1200x.jpg",
  app: "https://uniformation3d.com/cdn/shop/files/app_-1600x900_1.jpg",
  monitoring: [
    "https://uniformation3d.com/cdn/shop/files/14_70116d9f-541a-41b8-a4f8-da1d1621e065.jpg",
    "https://uniformation3d.com/cdn/shop/files/15_1862949b-ac5e-47ac-bdb2-5bf1cd2e8185.jpg",
  ],
  antiDrip: "https://uniformation3d.com/cdn/shop/files/banner_3000x1200_2.jpg",
  screenRotation: [
    "https://uniformation3d.com/cdn/shop/files/90_5aaa3fae-c8bc-4e81-8304-eae6bb98907b.jpg",
    "https://uniformation3d.com/cdn/shop/files/800x800.jpg",
  ],
  lighting: [
    "https://uniformation3d.com/cdn/shop/files/eb5e74d7183fac10d8f52fe61222f410.jpg",
    "https://uniformation3d.com/cdn/shop/files/44f40df1f842a490e615564f09ea4772.jpg",
  ],
  creator: [
    "https://img.youtube.com/vi/neKp-2SdQcE/sddefault.jpg",
    "https://uniformation3d.com/cdn/shop/files/channels4_profile_1_b2d9f2c4-086f-4c9a-b7c3-0f9344f95f63.jpg",
  ],
  box: "https://uniformation3d.com/cdn/shop/files/16_0663d4e1-60b9-4885-9b52-140f460fcf6c.jpg",
};

const highlightCards = [
  {
    title: tLocalized("385 nm UV ışık kaynağı", "385nm UV Light Source"),
    text: tLocalized("Daha kontrollü ışık dağılımı ve hassas kürleme.", "Controlled light distribution for precise curing."),
    image: media.uv,
  },
  {
    title: tLocalized("Yüksek geçirgenlikli ekran", "High-Transmission Screen"),
    text: tLocalized("Daha verimli pozlama için yüksek geçirgenlikli optik yapı.", "High-transmission optics for efficient exposure."),
    image: media.screen,
  },
  {
    title: tLocalized("Endüstriyel bilyalı vida", "Industrial-Grade Ball Screw"),
    text: tLocalized("Kararlı Z ekseni hareketi ve tekrarlanabilir baskı.", "Stable Z-axis movement and repeatable printing."),
    image: media.zAxis[0],
  },
  {
    title: tLocalized("16K ince detay", "16K Exquisite Details"),
    text: tLocalized("Küçük piksel boyutuyla keskin yüzey ayrıntıları.", "Sharp surface detail with a small pixel size."),
    image: media.precisionPoster,
  },
  {
    title: tLocalized("Akıllı otomatik ısıtma", "Smart Auto Heating"),
    text: tLocalized("Reçineyi çalışma sıcaklığında tutmaya yardımcı olur.", "Helps keep resin at its working temperature."),
    image: media.heating,
  },
  {
    title: tLocalized("Canlı izleme ve time-lapse", "Live Monitoring & Time-Lapse"),
    text: tLocalized("Baskı sürecini takip edin ve kayıt altına alın.", "Monitor and capture the printing process."),
    image: media.monitoring[0],
  },
  {
    title: tLocalized("Otomatik reçine besleme", "Auto Resin Feeding System"),
    text: tLocalized("Uzun baskılarda reçine akışını destekler.", "Supports resin flow during longer prints."),
    image: media.feedingPoster,
  },
];

const uvTabs = [
  {
    label: tLocalized("385 nm ışık", "385nm Light"),
    title: tLocalized("Daha kontrollü ışık dağılımı", "More controlled light distribution"),
    text: tLocalized("385 nm dalga boyu, düşük ışık saçılımıyla küçük detayların daha net kürlenmesine yardımcı olur.", "The 385nm wavelength helps cure fine details with reduced light scattering."),
    image: media.uvComparison[0],
  },
  {
    label: tLocalized("Hassasiyet", "Precision"),
    title: tLocalized("Daha ince detaylar", "Finer details"),
    text: tLocalized("Düşük penetrasyon derinliği, küçük geometrilerde istenmeyen kürlenmeyi azaltmaya yardımcı olur.", "Lower penetration helps reduce unwanted curing around small geometries."),
    image: media.uvComparison[1],
  },
  {
    label: tLocalized("Karşılaştırma", "Comparison"),
    title: tLocalized("385 nm ve 405 nm", "385nm vs. 405nm"),
    text: tLocalized("Farklı reçine ve kullanım senaryoları için kontrollü pozlama yaklaşımını keşfedin.", "Explore controlled exposure for different resins and workflows."),
    image: media.uv,
  },
];

const applicationCards = [
  {
    title: tLocalized("Takı tasarımları", "Jewelry Designs"),
    text: tLocalized("Küçük ve karmaşık geometriler için yüksek çözünürlüklü üretim.", "High-resolution production for small, intricate geometries."),
    image: media.applications[0],
  },
  {
    title: tLocalized("Dental uygulamalar", "Dental Applications"),
    text: tLocalized("Laboratuvar iş akışlarında hassas dental parçalar üretin.", "Produce precise dental parts for laboratory workflows."),
    image: media.applications[1],
  },
  {
    title: tLocalized("Mikro detaylar", "Fine Detail Models"),
    text: tLocalized("Keskin kenarlar ve ince yüzey dokuları için ayrıntılı baskılar.", "Detailed prints with crisp edges and fine surface textures."),
    image: media.zAxis[1],
  },
];

const faqItems = [
  {
    question: tLocalized("MASH P16L kimler için uygundur?", "Who should choose the MASH P16L?"),
    answer: tLocalized("Yüksek detaylı dental ve mikro üretim işlerinde hassasiyet, kararlı hareket ve güvenilir iş akışı arayan laboratuvarlar için tasarlanmıştır.", "It is designed for laboratories seeking fine detail, stable motion, and a dependable workflow for dental and micro-production."),
  },
  {
    question: tLocalized("385 nm UV ışık kaynağının avantajı nedir?", "What is the benefit of the 385nm UV light source?"),
    answer: tLocalized("Kontrollü ışık dağılımı ve düşük saçılım, küçük özelliklerin daha hassas kürlenmesine yardımcı olur. Uygun reçine profiliyle birlikte kullanılmalıdır.", "Controlled light distribution and reduced scattering help cure small features precisely. Use it with a compatible resin profile."),
  },
  {
    question: tLocalized("Otomatik reçine besleme nasıl çalışır?", "How does automatic resin feeding work?"),
    answer: tLocalized("Besleme sistemi baskı sırasında tank seviyesini destekler. Kurulum ve kullanım için cihaz kılavuzundaki güvenlik adımlarını izleyin.", "The feeding system helps maintain the resin level during printing. Follow the safety steps in the printer manual for setup and use."),
  },
  {
    question: tLocalized("Baskı sürecini uzaktan izleyebilir miyim?", "Can I monitor a print remotely?"),
    answer: tLocalized("Akıllı uygulama ve kamera özellikleri, desteklenen ağ ve cihaz kurulumuyla baskı sürecini izlemenize yardımcı olur.", "The smart-app and camera features can help monitor a print when the supported network and device setup are in place."),
  },
  {
    question: tLocalized("Kutu içeriğinde neler bulunur?", "What is included in the box?"),
    answer: tLocalized("Paket içeriği satış bölgesine ve ürün paketine göre değişebilir. Siparişinizde listelenen içeriği ve güncel ürün kılavuzunu kontrol edin.", "Package contents may vary by sales region and bundle. Check the contents listed with your order and the current product manual."),
  },
];

function ImageCard({
  src,
  alt,
  title,
  text,
}: {
  src: string;
  alt: string;
  title: string;
  text: string;
}) {
  return (
    <article className="tmgk-card">
      <img src={src} alt={alt} loading="lazy" decoding="async" />
      <div className="tmgk-card-copy">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </article>
  );
}

function FeatureMedia({
  src,
  poster,
  alt,
}: {
  src: string;
  poster: string;
  alt: string;
}) {
  return (
    <video
      className="tmgk-video"
      src={src}
      poster={poster}
      controls
      playsInline
      preload="metadata"
      aria-label={alt}
    >
      {tLocalized("Tarayıcınız bu videoyu oynatamıyor.", "Your browser cannot play this video.")}
    </video>
  );
}

export default function MashP16LAlternatePage() {
  const [activeUvTab, setActiveUvTab] = useState(0);
  const activeTab = uvTabs[activeUvTab] ?? uvTabs[0];

  return (
    <div className="tmgk-page">
      <section className="tmgk-hero" aria-labelledby="tmgk-hero-title">
        <picture className="tmgk-hero-media">
          <source media="(max-width: 700px)" srcSet={media.bannerMobile} />
          <img src={media.banner} alt={tLocalized("MASH P16L reçineli 3D yazıcı", "MASH P16L resin 3D printer")} />
        </picture>
        <div className="tmgk-hero-shade" />
        <div className="tmgk-hero-copy">
          <p className="tmgk-eyebrow">{tLocalized("385 nm UV · 16K hassasiyet", "385nm UV · 16K Precision")}</p>
          <h2 id="tmgk-hero-title">{tLocalized("MASH P16L ile ince detaylarda yeni seviye", "A new level of fine detail with MASH P16L")}</h2>
          <a className="tmgk-button" href="#satinal">{tLocalized("Ürünü incele", "Explore the printer")}</a>
        </div>
      </section>

      <section className="tmgk-intro" aria-labelledby="tmgk-highlights-title">
        <p className="tmgk-eyebrow">{tLocalized("Öne çıkanlar", "At a glance")}</p>
        <h2 id="tmgk-highlights-title">{tLocalized("Her ayrıntıda hassasiyet.", "Precision in every detail.")}</h2>
        <p>{tLocalized("Detay, kararlılık ve üretkenlik tek bir dental üretim sisteminde buluşuyor.", "Detail, stability, and productivity come together in one dental production system.")}</p>
      </section>

      <section className="tmgk-highlights" aria-label={tLocalized("MASH P16L öne çıkan özellikleri", "MASH P16L key features")}>
        {highlightCards.map((card, index) => (
          <article className={`tmgk-highlight tmgk-highlight-${index + 1}`} key={card.title}>
            <img src={card.image} alt={card.title} loading="lazy" decoding="async" />
            <div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="tmgk-split tmgk-uv-feature">
        <div className="tmgk-copy">
          <p className="tmgk-eyebrow">{tLocalized("385 nm UV ışık kaynağı", "385nm UV Light Source")}</p>
          <h2>{tLocalized("Hassas kürleme için kontrollü ışık.", "Controlled light for precise curing.")}</h2>
          <p>{tLocalized("Işık kaynağı, ışık saçılımını azaltmaya ve küçük geometrilerde istenmeyen kürlenmeyi sınırlamaya yardımcı olur.", "The light source helps reduce scattering and limit unwanted curing around small geometries.")}</p>
        </div>
        <img src={media.uv} alt={tLocalized("385 nm UV ışık kaynağı ve optik sistemi", "385nm UV light source and optical system")} loading="lazy" decoding="async" />
      </section>

      <section className="tmgk-uv-tabs" aria-labelledby="tmgk-uv-tabs-title">
        <div className="tmgk-section-heading">
          <p className="tmgk-eyebrow">{tLocalized("Işık ve doğruluk", "Light and accuracy")}</p>
          <h2 id="tmgk-uv-tabs-title">{tLocalized("385 nm UV ile hassas kürleme", "Precision curing powered by 385nm UV light")}</h2>
        </div>
        <div className="tmgk-tab-buttons" aria-label={tLocalized("385 nm özellikleri", "385nm feature tabs")}>
          {uvTabs.map((tab, index) => (
            <button
              key={tab.label}
              type="button"
              aria-pressed={activeUvTab === index}
              onClick={() => setActiveUvTab(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="tmgk-tab-panel" aria-live="polite">
          <div>
            <h3>{activeTab.title}</h3>
            <p>{activeTab.text}</p>
          </div>
          <img src={activeTab.image} alt={activeTab.title} loading="lazy" decoding="async" />
        </div>
      </section>

      <section className="tmgk-strength">
        <img src={media.strength} alt={tLocalized("MASH P16L gövdesinin ve baskı mekanizmasının yakın görünümü", "Close view of the MASH P16L frame and printing mechanism")} loading="lazy" decoding="async" />
        <div className="tmgk-strength-copy">
          <p className="tmgk-eyebrow">{tLocalized("Detayın ötesinde", "Beyond detail")}</p>
          <h2>{tLocalized("Güç için tasarlandı.", "Built for strength.")}</h2>
          <p>{tLocalized("Geliştirilmiş kürleme ve sağlam mekanik yapı, günlük üretimde güvenilir sonuçlar için birlikte çalışır.", "Enhanced curing and a robust mechanical structure work together for dependable daily production.")}</p>
        </div>
      </section>

      <section className="tmgk-precision">
        <div className="tmgk-section-heading">
          <p className="tmgk-eyebrow">{tLocalized("16K stüdyo kalitesinde hassasiyet", "16K Studio-Grade Precision")}</p>
          <h2>{tLocalized("Mikro ayrıntıları görün.", "See the finest details.")}</h2>
        </div>
        <FeatureMedia src={media.precisionVideo} poster={media.precisionPoster} alt={tLocalized("MASH P16L 16K baskı detaylarını gösteren video", "Video demonstrating MASH P16L 16K print detail")} />
      </section>

      <section className="tmgk-specs" aria-labelledby="tmgk-specs-title">
        <div className="tmgk-section-heading">
          <p className="tmgk-eyebrow">{tLocalized("16K ekran", "16K Screen")}</p>
          <h2 id="tmgk-specs-title">{tLocalized("Keskin baskıların teknik temeli.", "The technical foundation of sharp prints.")}</h2>
        </div>
        <dl className="tmgk-spec-grid">
          <div><dt>{tLocalized("Çözünürlük", "Resolution")}</dt><dd>15120 × 6230</dd></div>
          <div><dt>{tLocalized("Piksel boyutu", "Pixel Size")}</dt><dd>14 × 19 µm</dd></div>
          <div><dt>{tLocalized("Işık uniformitesi", "Light Uniformity")}</dt><dd>≥ 88%</dd></div>
          <div><dt>{tLocalized("Kontrast oranı", "Contrast Ratio")}</dt><dd>≥ 500:1</dd></div>
        </dl>
      </section>

      <section className="tmgk-applications">
        <div className="tmgk-section-heading">
          <p className="tmgk-eyebrow">{tLocalized("Uygulama alanları", "Applications")}</p>
          <h2>{tLocalized("Her uygulama için tasarlandı.", "Designed for every application.")}</h2>
        </div>
        <div className="tmgk-card-grid tmgk-three-cards">
          {applicationCards.map((card) => <ImageCard key={card.title} src={card.image} {...card} alt={card.title} />)}
        </div>
      </section>

      <section className="tmgk-zaxis">
        <div className="tmgk-zaxis-copy">
          <p className="tmgk-eyebrow">{tLocalized("Kararlı Z ekseni", "Stable Z-Axis")}</p>
          <h2>{tLocalized("Hassasiyet için sağlam hareket.", "Stable motion, designed for precision.")}</h2>
          <p>{tLocalized("Endüstriyel sınıf bilyalı vida, dayanıklı ve aşınmaya dirençli hareket sağlayarak katman tutarlılığını destekler.", "The industrial-grade ball screw is built for durable, wear-resistant motion and consistent layers.")}</p>
        </div>
        <div className="tmgk-pair-images">
          {media.zAxis.map((src, index) => <img key={src} src={src} alt={tLocalized(`Z ekseni mekanizması detay ${index + 1}`, `Z-axis mechanism detail ${index + 1}`)} loading="lazy" decoding="async" />)}
        </div>
      </section>

      <section className="tmgk-split tmgk-heating">
        <img src={media.heating} alt={tLocalized("Otomatik reçine ısıtma sistemi", "Automatic resin heating system")} loading="lazy" decoding="async" />
        <div className="tmgk-copy">
          <p className="tmgk-eyebrow">{tLocalized("Akıllı otomatik ısıtma", "Smart Auto Heating")}</p>
          <h2>{tLocalized("Reçineyi ideal çalışma sıcaklığında tutun.", "Keep resin at its ideal working temperature.")}</h2>
          <p>{tLocalized("Akıllı ısıtma sistemi, reçineyi baskı için uygun çalışma koşullarında tutmaya yardımcı olur.", "The smart heating system helps keep resin in suitable working conditions for printing.")}</p>
          <img className="tmgk-detail-image" src={media.heatingDetail} alt={tLocalized("Reçine ısıtma sisteminin yakın görünümü", "Close-up of the resin heating system")} loading="lazy" decoding="async" />
        </div>
      </section>

      <section className="tmgk-split tmgk-screen">
        <div className="tmgk-copy">
          <p className="tmgk-eyebrow">{tLocalized("16K yüksek geçirgenlikli ekran", "16K High-Transmission Screen")}</p>
          <h2>{tLocalized("Işığı verimli kullanın.", "Make every ray count.")}</h2>
          <p>{tLocalized("Yüksek geçirgenlikli ve ısıya dayanıklı polarizör, LCD ekranın daha verimli çalışmasını destekler.", "A high-transmission, heat-resistant polarizer supports efficient LCD performance.")}</p>
          <img className="tmgk-detail-image" src={media.screenDetail} alt={tLocalized("Yüksek geçirgenlikli LCD ekran detayı", "High-transmission LCD screen detail")} loading="lazy" decoding="async" />
        </div>
        <img src={media.screen} alt={tLocalized("MASH P16L 16K LCD ekranı", "MASH P16L 16K LCD screen")} loading="lazy" decoding="async" />
      </section>

      <section className="tmgk-productivity">
        <div className="tmgk-section-heading">
          <p className="tmgk-eyebrow">{tLocalized("Üretkenlik", "Productivity")}</p>
          <h2>{tLocalized("Verimlilik için tasarlandı.", "Boost productivity, designed for efficiency.")}</h2>
        </div>
        <div className="tmgk-video-grid">
          <article>
            <FeatureMedia src={media.feedingVideo} poster={media.feedingPoster} alt={tLocalized("Otomatik reçine besleme sisteminin çalışması", "Automatic resin feeding system in operation")} />
            <h3>{tLocalized("Otomatik reçine besleme", "Automatic Resin Feeding")}</h3>
            <p>{tLocalized("Uzun baskı işlerinde reçine seviyesini korumaya yardımcı olur.", "Helps maintain resin levels during longer print jobs.")}</p>
          </article>
          <article>
            <FeatureMedia src={media.lcdVideo} poster={media.lcdPoster} alt={tLocalized("LCD ekran değişiminin gösterimi", "Demonstration of LCD screen replacement")} />
            <h3>{tLocalized("Kolay LCD değişimi", "Quick LCD Replacement")}</h3>
            <p>{tLocalized("Bakım için erişilebilir ve pratik ekran değişimi.", "Accessible, practical screen replacement for maintenance.")}</p>
          </article>
        </div>
      </section>

      <section className="tmgk-innovation">
        <FeatureMedia src={media.innovationVideo} poster={media.innovationPoster} alt={tLocalized("MASH P16L kullanıcı odaklı özelliklerinin tanıtım videosu", "Video introducing user-focused MASH P16L features")} />
        <div className="tmgk-innovation-copy">
          <p className="tmgk-eyebrow">{tLocalized("Yenilik DNA'mızda", "Innovation in our DNA")}</p>
          <h2>{tLocalized("Her ayrıntıda kullanıcı odağı.", "User-focused in every detail.")}</h2>
        </div>
      </section>

      <section className="tmgk-app">
        <img src={media.app} alt={tLocalized("Yazıcıyı uzaktan izleyen akıllı uygulama arayüzü", "Smart-app interface for remote printer monitoring")} loading="lazy" decoding="async" />
        <div className="tmgk-copy">
          <p className="tmgk-eyebrow">{tLocalized("Akıllı uygulama", "Smart App")}</p>
          <h2>{tLocalized("Baskı sürecini uzaktan yönetin.", "Manage print jobs remotely.")}</h2>
          <p>{tLocalized("Baskı ilerlemesini izleyin, işleri uzaktan yönetin ve tek dokunuşla kontrol edin.", "Monitor print progress, manage jobs remotely, and use one-touch controls.")}</p>
        </div>
      </section>

      <section className="tmgk-monitoring">
        <div className="tmgk-section-heading">
          <p className="tmgk-eyebrow">{tLocalized("Bağlantılı iş akışı", "Connected Workflow")}</p>
          <h2>{tLocalized("Baskıyı canlı izleyin ve kaydedin.", "Monitor and capture every print.")}</h2>
        </div>
        <div className="tmgk-card-grid">
          <ImageCard src={media.monitoring[0]} alt={tLocalized("Canlı baskı izleme görüntüsü", "Live print monitoring view")} title={tLocalized("Gerçek zamanlı izleme", "Real-Time Monitoring")} text={tLocalized("Baskının durumunu ve ilerlemesini takip edin.", "Follow print status and progress.")} />
          <ImageCard src={media.monitoring[1]} alt={tLocalized("Time-lapse baskı kaydı", "Time-lapse print recording")} title={tLocalized("Time-lapse fotoğraf", "Time-Lapse Photography")} text={tLocalized("Baskı sürecini görsel olarak kaydedin.", "Capture the printing process as a visual record.")} />
          <ImageCard src={media.app} alt={tLocalized("Dosya aktarım seçenekleri", "File transfer options")} title={tLocalized("3 dosya aktarım yöntemi", "3 File Transfer Methods")} text={tLocalized("İş akışınıza uygun aktarım yolunu kullanın.", "Choose a transfer method that fits your workflow.")} />
        </div>
      </section>

      <section className="tmgk-antidrip">
        <img src={media.antiDrip} alt={tLocalized("Damlamayı azaltan baskı tablası tasarımı", "Build-plate design that helps reduce dripping")} loading="lazy" decoding="async" />
        <div>
          <p className="tmgk-eyebrow">{tLocalized("Daha temiz çalışma alanı", "A cleaner workspace")}</p>
          <h2>{tLocalized("Entegre damlama önleyici tabla tasarımı.", "Integrated anti-drip build-plate design.")}</h2>
          <p>{tLocalized("Daha az damlama. Daha az dağınıklık.", "Less drip. Less mess.")}</p>
        </div>
      </section>

      <section className="tmgk-controls">
        <div className="tmgk-section-heading">
          <p className="tmgk-eyebrow">{tLocalized("Kullanıcı odaklı kontrol", "User-Focused Controls")}</p>
          <h2>{tLocalized("90° dönebilen ekran ve gizli düğmeler.", "90° Rotatable Screen & Hidden Buttons")}</h2>
          <p>{tLocalized("Esnek görüntüleme açısı, farklı tezgâh düzenlerinde rahat kullanım sağlar.", "Flexible viewing makes operation comfortable across different bench setups.")}</p>
        </div>
        <div className="tmgk-control-images">
          {media.screenRotation.map((src, index) => <img key={src} src={src} alt={tLocalized(`Dönebilen ekran tasarımı ${index + 1}`, `Rotatable screen design ${index + 1}`)} loading="lazy" decoding="async" />)}
        </div>
      </section>

      <section className="tmgk-lighting">
        <div className="tmgk-section-heading">
          <p className="tmgk-eyebrow">{tLocalized("Daha iyi görünürlük", "Improved Visibility")}</p>
          <h2>{tLocalized("Dahili yüksek parlaklıklı aydınlatma.", "Built-In High-Brightness Lighting")}</h2>
          <p>{tLocalized("Baskı haznesini ve iş akışını daha rahat gözlemleyin.", "See the build area and workflow more clearly.")}</p>
        </div>
        <div className="tmgk-lighting-images">
          {media.lighting.map((src, index) => <img key={src} src={src} alt={tLocalized(`Dahili aydınlatma görünümü ${index + 1}`, `Built-in lighting view ${index + 1}`)} loading="lazy" decoding="async" />)}
        </div>
      </section>

      <section className="tmgk-creators">
        <div className="tmgk-section-heading">
          <p className="tmgk-eyebrow">{tLocalized("Üreticilerden yorumlar", "From the Creator Community")}</p>
          <h2>{tLocalized("MASH P16L hakkında üreticiler ne diyor?", "What creators say about the MASH P16L")}</h2>
        </div>
        <div className="tmgk-creator-card">
          <img src={media.creator[0]} alt={tLocalized("3D yazıcı inceleme videosu önizlemesi", "3D printer review video thumbnail")} loading="lazy" decoding="async" />
          <div>
            <img className="tmgk-creator-avatar" src={media.creator[1]} alt={tLocalized("İçerik üreticisi profil görseli", "Creator profile image")} loading="lazy" decoding="async" />
            <h3>{tLocalized("Bağımsız incelemeyi izleyin", "Watch an independent review")}</h3>
            <p>{tLocalized("Baskı deneyimi ve iş akışı hakkında daha fazla bilgi için video incelemesini açın.", "Open the video review for more about the printing experience and workflow.")}</p>
            <a href="https://www.youtube.com/watch?v=neKp-2SdQcE" target="_blank" rel="noopener noreferrer" aria-label={tLocalized("YouTube'da inceleme videosunu yeni sekmede aç", "Open the review video on YouTube in a new tab")}>
              {tLocalized("YouTube'da izle", "Watch on YouTube")} ↗
            </a>
          </div>
        </div>
      </section>

      <section className="tmgk-box">
        <img src={media.box} alt={tLocalized("Yazıcı kutusundaki aksesuarlar ve ekipmanlar", "Accessories and equipment included with the printer")} loading="lazy" decoding="async" />
        <div className="tmgk-copy">
          <p className="tmgk-eyebrow">{tLocalized("Kutuda ne var?", "What's in the box")}</p>
          <h2>{tLocalized("Kurulum için ihtiyacınız olanlar.", "Everything for your setup.")}</h2>
          <p>{tLocalized("Paket içeriği sipariş seçeneğine ve bölgeye göre değişebilir; siparişinizdeki listeyi kontrol edin.", "Package contents can vary by bundle and region; check the list supplied with your order.")}</p>
        </div>
      </section>

      <section className="tmgk-faq" aria-labelledby="tmgk-faq-title">
        <div className="tmgk-section-heading">
          <p className="tmgk-eyebrow">{tLocalized("Yardım", "Support")}</p>
          <h2 id="tmgk-faq-title">{tLocalized("Sıkça sorulan sorular", "Frequently Asked Questions")}</h2>
        </div>
        <div className="tmgk-faq-list">
          {faqItems.map((item) => (
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
