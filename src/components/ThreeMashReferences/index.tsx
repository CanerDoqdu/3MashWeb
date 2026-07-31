import { Props } from "./types";
import crsCompositeSararmaImage from "../../assets/crs-composite-sararma-data";
import { crsModelBottleImage } from "../../assets/crs-model-data";
import { p16lPrimaryImage } from "../../assets/solution-p16l-media-data";
import {
  machineP16L,
  machineUW02,
  profileBerkan,
  profileGoksel,
  profileMehmet,
  resinBottle,
} from "../../assets/remaining-assets-data";
import trustLogo1 from "../../assets/trust-logo-1-data";
import trustLogo2 from "../../assets/trust-logo-2-data";
import trustLogo3 from "../../assets/trust-logo-3-data";
import trustLogo4 from "../../assets/trust-logo-4-data";
import trustLogo5 from "../../assets/trust-logo-5-data";

const defaultDescription =
  "3MASH ekosistemi; kliniklerin, laboratuvarların ve çözüm ortaklarının günlük üretiminde aynı hedefe çalışır: doğru cihaz, doğru malzeme, doğru parametre ve kesintisiz teknik destek.";

const testimonials = [
  {
    name: "Mehmet İşlek",
    role: "ATTELIA - Kurucu Başhekim",
    image: profileMehmet,
    quote:
      "Profesyoneller mutlak başarı için profesyonellere güvenir. Ekipman seçimi, temini, eğitimi ve kullanımında Mash ile iş birliği yapıyoruz.",
    meta: "22 yıldır gülümseme tasarlayan klinik",
  },
  {
    name: "Berkan Öztaş",
    role: "DENTEK - Genel Müd. Yard.",
    image: profileBerkan,
    quote:
      "Yenilikçi ve yaratıcı. Donanım, yazılım ve malzemelerde uzun vadeli, başarılı bir iş birliği.",
    meta: "Dijital üretim ve laboratuvar operasyonu",
  },
  {
    name: "Göksel Pişkin",
    role: "MIKRO LAB - Kurucu Ortak",
    image: profileGoksel,
    quote:
      "Sorunları biz daha yaşamadan çözmüşler. Her zaman aynı kalitede üretim, mükemmel sonuçlar.",
    meta: "Tekrarlanabilir üretim ve teknik süreç",
  },
];

const referenceEntries = [
  ...testimonials.map((item) => ({
    ...item,
    type: "Kullanıcı yorumu",
  })),
  {
    name: "Dr. Barbaros Baran",
    role: "Diş Hekimi",
    quote:
      "CRS Composite Resin ile tamamen dijital olarak üretilen All-on-Six geçici restorasyon, düşük ağırlığı ve takip edilebilir klinik iş akışıyla öne çıktı.",
    meta: "All-on-Six geçici restorasyon vakası",
    type: "Klinik vaka",
  },
  {
    name: "Yapı Dental",
    role: "Dental ürün ve teknoloji iş ortağı",
    quote:
      "Phrozen cihazları üzerinde 3MASH ortaklığıyla geliştirme, ayarlama ve kalibrasyon süreci yürütüldü; CRS reçineleriyle uyum aynı ekosistemde değerlendirildi.",
    meta: "Kalibre edilmiş cihaz ve reçine iş akışı",
    type: "İş ortaklığı",
  },
  {
    name: "Serdent",
    role: "Diş hekimliği ve laboratuvar malzemeleri çözüm ağı",
    quote:
      "Klinik ve laboratuvarlara ürün, eğitim ve teknik servis desteği sunan portföy içinde CRS ve 3MASH markaları birlikte konumlanıyor.",
    meta: "Bölgesel çözüm ve destek ağı",
    type: "Çözüm ortağı",
  },
  {
    name: "Özel Manas Diş Protez Laboratuvarı",
    role: "Diş protez laboratuvarı",
    quote:
      "Laboratuvar üretim paylaşımlarında #3mash, #crs ve #digitaldentistry etiketleriyle dijital dental üretim çalışmalarını öne çıkarıyor.",
    meta: "Kullanıcı üretimi ve laboratuvar paylaşımı",
    type: "Kullanıcı çalışması",
  },
  {
    name: "Mümin Tuğra",
    role: "Dental laboratuvar içerik üreticisi",
    quote:
      "CRS Model ve dijital dental üretim odağındaki paylaşımlarıyla 3MASH ekosistemine bağlı kullanıcı içeriği havuzunda yer alıyor.",
    meta: "CRS Model odaklı üretim içeriği",
    type: "Kullanıcı içeriği",
  },
  {
    name: "Batuhan Arabacı",
    role: "Dental sektör profesyoneli",
    quote:
      "Ürünler için sektöre güçlü giriş yapan ve rakip tanımayan bir çizgi vurgusu yapan olumlu tanıtım ifadesiyle öne çıkıyor.",
    meta: "Sektör yorumu",
    type: "Profesyonel görüş",
  },
];

const proofStats = [
  { value: "580+", label: "laboratuvar ve klinik" },
  { value: String(referenceEntries.length), label: "referans kaydı" },
  { value: "A-Z", label: "kurulumdan desteğe" },
];

const proofCategories = [
  "Klinik vaka",
  "Kullanıcı yorumu",
  "İş ortaklığı",
  "Laboratuvar paylaşımı",
];

const partnerCards = [
  {
    name: "Yapı Dental",
    title: "Kalibre edilmiş dental üretim ekosistemi",
    text:
      "Phrozen cihazları, CRS Dental reçineleri ve 3MASH teknik birikimi aynı üretim hattında buluşur. Cihaz seçimi, ışık dağılımı, Z ekseni stabilitesi ve reçine parametreleri birlikte değerlendirilir.",
    image: machineP16L,
  },
  {
    name: "Serdent",
    title: "Bölgesel çözüm ve teknik servis ağı",
    text:
      "Klinik ve laboratuvarlara ürün, eğitim ve teknik servis desteği sunan çözüm ağı içinde CRS ve 3MASH markaları birlikte konumlanır.",
    image: resinBottle,
  },
];

const workflowCards = [
  {
    title: "Cihaz",
    text:
      "3D yazıcı, yıkama-kürleme ve tarayıcı seçimi üretim hedefiyle birlikte planlanır.",
    image: p16lPrimaryImage,
  },
  {
    title: "Malzeme",
    text:
      "CRS reçine hattı; model, kompozit, tray ve restoratif uygulamalarda doğru parametreyle çalışır.",
    image: crsModelBottleImage,
  },
  {
    title: "Destek",
    text:
      "Kurulum, eğitim, reçine uyumlama ve satış sonrası teknik destek aynı ekip tarafından takip edilir.",
    image: machineUW02,
  },
];

const storyPoints = [
  "Üst ve alt All-on-Six geçici restorasyon üretimi",
  "Metal bar üzerinde 3D baskılı kompozit köprü yaklaşımı",
  "Düşük ağırlık, takip edilebilir dijital iş akışı ve klinik adaptasyon odağı",
];

const logos = [trustLogo1, trustLogo2, trustLogo3, trustLogo4, trustLogo5];

function text(value: string | undefined, fallback: string) {
  const clean = value?.trim();
  return clean ? clean : fallback;
}

function numberValue(value: number | undefined, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function colorValue(value: string | undefined, fallback: string) {
  const clean = value?.trim();
  return clean || fallback;
}

function richHtml(value: string | undefined, fallback: string) {
  const cleaned = text(value, fallback)
    .replace(/\sstyle=(["']).*?\1/gi, "")
    .replace(/^<p[^>]*>/i, "")
    .replace(/<\/p>$/i, "");

  return { __html: cleaned };
}

function safeHref(value: string | undefined, fallback: string) {
  const clean = value?.trim();
  return clean || fallback;
}

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href);
}

function ActionLink({
  href,
  children,
  variant,
}: {
  href: string;
  children: string;
  variant: "primary" | "secondary";
}) {
  return (
    <a
      className={`tmref-action tmref-action-${variant}`}
      href={href}
      target={isExternalHref(href) ? "_blank" : undefined}
      rel={isExternalHref(href) ? "noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

export function ThreeMashReferences(props: Props) {
  const maxWidth = numberValue(props.maxWidth, 1220);
  const paddingTop = numberValue(props.paddingTop, 84);
  const paddingBottom = numberValue(props.paddingBottom, 92);
  const primaryHref = safeHref(props.primaryButtonHref, "#referanslar-vaka");
  const secondaryHref = safeHref(props.secondaryButtonHref, "#referanslar-isleyis");

  const rootStyle = {
    "--tm-ref-bg": colorValue(
      props.backgroundColor,
      "var(--tm-theme-bg, #FAFAF7)",
    ),
    "--tm-ref-text": colorValue(
      props.textColor,
      "var(--tm-theme-text, #0E0E0C)",
    ),
    "--tm-ref-muted": colorValue(
      props.mutedTextColor,
      "var(--tm-theme-sub, #55554e)",
    ),
    "--tm-ref-line": colorValue(
      props.lineColor,
      "var(--tm-theme-line, #E6E6E0)",
    ),
    "--tm-ref-max": `${maxWidth}px`,
    "--tm-ref-pt": `${paddingTop}px`,
    "--tm-ref-pb": `${paddingBottom}px`,
  } as Record<string, string>;

  return (
    <section
      id={text(props.sectionAnchorId, "referanslar")}
      className="three-mash-references"
      style={rootStyle}
    >
      <div className="tmref-shell">
        <div className="tmref-hero">
          <div className="tmref-hero-copy">
            <div
              className="tmref-eyebrow"
              dangerouslySetInnerHTML={richHtml(
                props.eyebrowText,
                "Referanslar ve başarı hikayeleri",
              )}
            />
            <h2
              dangerouslySetInnerHTML={richHtml(
                props.titleText,
                "Dijital üretimde güveni <em>gerçek işlerle</em> kuruyoruz.",
              )}
            />
            <p
              dangerouslySetInnerHTML={richHtml(
                props.descriptionHtml,
                defaultDescription,
              )}
            />
            <div className="tmref-actions" aria-label="Referanslar aksiyonları">
              <ActionLink href={primaryHref} variant="primary">
                {text(props.primaryButtonText, "Başarı hikayesini gör")}
              </ActionLink>
              <ActionLink href={secondaryHref} variant="secondary">
                {text(props.secondaryButtonText, "Ekosistemi incele")}
              </ActionLink>
            </div>
          </div>

          <div className="tmref-hero-proof" aria-label="3MASH referans özeti">
            <div className="tmref-proof-panel">
              <span>Referans havuzu</span>
              <strong>Kliniklerden laboratuvarlara uzanan saha kaydı.</strong>
              <p>
                Yorumlar, klinik vakalar, iş ortakları ve üretim paylaşımları
                aynı sayfada tek bir güven mimarisi olarak sunulur.
              </p>
            </div>
            <div className="tmref-proof-categories">
              {proofCategories.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="tmref-stat-row">
              {proofStats.map((item) => (
                <div key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="tmref-logo-strip" aria-label="3MASH güven logoları">
          {logos.map((logo, index) => (
            <div className="tmref-logo-cell" key={index}>
              <img src={logo} alt="" loading="lazy" />
            </div>
          ))}
        </div>

        <section
          className="tmref-reference-wall"
          aria-label="3MASH referans yorumları"
        >
          {referenceEntries.map((item, index) => (
            <article
              className={`tmref-testimonial ${index === 0 ? "is-featured" : ""}`}
              key={item.name}
            >
              <div className="tmref-card-topline">
                <span>{item.type}</span>
              </div>
              <div className="tmref-quote-mark">“</div>
              <p>{item.quote}</p>
              <div
                className={`tmref-person ${
                  "image" in item && item.image ? "has-image" : "has-no-image"
                }`}
              >
                {"image" in item && item.image ? (
                  <img src={item.image} alt={item.name} loading="lazy" />
                ) : (
                  <span
                    className="tmref-profile-placeholder"
                    aria-hidden="true"
                  />
                )}
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                  <small>{item.meta}</small>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section
          className="tmref-case"
          id="referanslar-vaka"
          aria-labelledby="tmref-case-title"
        >
          <div className="tmref-case-copy">
            <div className="tmref-section-kicker">Klinik başarı hikayesi</div>
            <h3 id="tmref-case-title">
              Dr. Barbaros Baran ile All-on-Six geçici restorasyon.
            </h3>
            <p>
              CRS Composite Resin ile tamamen dijital olarak üretilen geçici
              restorasyon; hafif yapı, kontrollü üretim süreci ve klinik
              adaptasyon odağıyla 3MASH ekosisteminin sahadaki karşılığını
              gösterir.
            </p>
            <ul className="tmref-story-list">
              {storyPoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="tmref-case-media">
            <img
              src={crsCompositeSararmaImage}
              alt="CRS Composite Resin ile dijital restorasyon çalışması"
            />
            <div className="tmref-media-caption">
              <strong>CRS Composite Resin</strong>
              <span>Dijital geçici restorasyon ve klinik takip süreci</span>
            </div>
          </div>
        </section>

        <section
          className="tmref-partners"
          aria-labelledby="tmref-partners-title"
        >
          <div className="tmref-section-heading">
            <div className="tmref-section-kicker">Çözüm ortakları</div>
            <h3 id="tmref-partners-title">
              Cihaz, reçine ve teknik destek aynı iş akışında buluşur.
            </h3>
          </div>
          <div className="tmref-partner-grid">
            {partnerCards.map((item) => (
              <article className="tmref-partner-card" key={item.name}>
                <div className="tmref-partner-image">
                  <img src={item.image} alt={item.name} loading="lazy" />
                </div>
                <div>
                  <span>{item.name}</span>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="tmref-workflow"
          id="referanslar-isleyis"
          aria-labelledby="tmref-workflow-title"
        >
          <div className="tmref-workflow-copy">
            <div className="tmref-section-kicker">3MASH ile üretim akışı</div>
            <h3 id="tmref-workflow-title">
              Referansların ortak noktası ürün değil, çalışan sistem.
            </h3>
            <p>
              Başarılı sonuç yalnızca bir cihaz veya tek bir reçineyle oluşmaz.
              Laboratuvarda tekrarlanabilir kalite için donanım, malzeme,
              eğitim ve teknik destek birlikte ilerler.
            </p>
          </div>
          <div className="tmref-workflow-grid">
            {workflowCards.map((item) => (
              <article className="tmref-workflow-card" key={item.title}>
                <div className="tmref-workflow-image">
                  <img src={item.image} alt={item.title} loading="lazy" />
                </div>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
