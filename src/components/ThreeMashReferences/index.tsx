import { Props } from "./types";
import crsCompositeSararmaImage from "../../assets/crs-composite-sararma-data";
import { crsModelBottleImage } from "../../assets/crs-model-data";
import { p16lPrimaryImage } from "../../assets/solution-p16l-media-data";
import { sanitizeHtml } from "../../utils/sanitizeHtml";
import { safeNavigationHref } from "../../utils/safeRedirect";
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
import { tLocalized } from "../../utils/i18n";

const defaultDescription = tLocalized(
  "3MASH ekosistemi; kliniklerin, laboratuvarların ve çözüm ortaklarının günlük üretiminde aynı hedefe çalışır: doğru cihaz, doğru malzeme, doğru parametre ve kesintisiz teknik destek.",
  "The 3MASH ecosystem works toward the same goal in daily production for clinics, laboratories, and solution partners: the right device, the right material, the right parameters, and continuous technical support."
);

const testimonials = [
  {
    name: tLocalized("Mehmet İşlek", "Mehmet İşlek"),
    role: tLocalized("ATTELIA - Kurucu Başhekim", "ATTELIA - Founding Chief Physician"),
    image: profileMehmet,
    quote: tLocalized(
      "Profesyoneller mutlak başarı için profesyonellere güvenir. Ekipman seçimi, temini, eğitimi ve kullanımında Mash ile iş birliği yapıyoruz.",
      "Professionals trust professionals for absolute success. We collaborate with Mash in equipment selection, supply, training, and operation."
    ),
    meta: tLocalized("22 yıldır gülümseme tasarlayan klinik", "Clinic designing smiles for 22 years"),
  },
  {
    name: tLocalized("Berkan Öztaş", "Berkan Öztaş"),
    role: tLocalized("DENTEK - Genel Müd. Yard.", "DENTEK - Asst. General Manager"),
    image: profileBerkan,
    quote: tLocalized(
      "Yenilikçi ve yaratıcı. Donanım, yazılım ve malzemelerde uzun vadeli, başarılı bir iş birliği.",
      "Innovative and creative. A long-term, successful partnership across hardware, software, and materials."
    ),
    meta: tLocalized("Dijital üretim ve laboratuvar operasyonu", "Digital production and laboratory operation"),
  },
  {
    name: tLocalized("Göksel Pişkin", "Göksel Pişkin"),
    role: tLocalized("MIKRO LAB - Kurucu Ortak", "MIKRO LAB - Co-founder"),
    image: profileGoksel,
    quote: tLocalized(
      "Sorunları biz daha yaşamadan çözmüşler. Her zaman aynı kalitede üretim, mükemmel sonuçlar.",
      "They solved issues before we even encountered them. Consistent production quality and excellent results every time."
    ),
    meta: tLocalized("Tekrarlanabilir üretim ve teknik süreç", "Repeatable production and technical process"),
  },
];

const referenceEntries = [
  ...testimonials.map((item) => ({
    ...item,
    type: tLocalized("Kullanıcı yorumu", "User Review"),
  })),
  {
    name: tLocalized("Dr. Barbaros Baran", "Dr. Barbaros Baran"),
    role: tLocalized("Diş Hekimi", "Dentist"),
    quote: tLocalized(
      "CRS Composite Resin ile tamamen dijital olarak üretilen All-on-Six geçici restorasyon, düşük ağırlığı ve takip edilebilir klinik iş akışıyla öne çıktı.",
      "The All-on-Six temporary restoration produced entirely digitally with CRS Composite Resin stood out with its lightweight structure and traceable clinical workflow."
    ),
    meta: tLocalized("All-on-Six geçici restorasyon vakası", "All-on-Six provisional restoration case"),
    type: tLocalized("Klinik vaka", "Clinical Case"),
  },
  {
    name: tLocalized("Yapı Dental", "Yapı Dental"),
    role: tLocalized("Dental ürün ve teknoloji iş ortağı", "Dental products & technology partner"),
    quote: tLocalized(
      "Phrozen cihazları üzerinde 3MASH ortaklığıyla geliştirme, ayarlama ve kalibrasyon süreci yürütüldü; CRS reçineleriyle uyum aynı ekosistemde değerlendirildi.",
      "Development, calibration, and adjustment processes were carried out on Phrozen devices in partnership with 3MASH; compatibility with CRS resins was verified in the same ecosystem."
    ),
    meta: tLocalized("Kalibre edilmiş cihaz ve reçine iş akışı", "Calibrated device & resin workflow"),
    type: tLocalized("İş ortaklığı", "Partnership"),
  },
  {
    name: tLocalized("Serdent", "serdent"),
    role: tLocalized("Diş hekimliği ve laboratuvar malzemeleri çözüm ağı", "Dental and lab supplies solution network"),
    quote: tLocalized(
      "Klinik ve laboratuvarlara ürün, eğitim ve teknik servis desteği sunan portföy içinde CRS ve 3MASH markaları birlikte konumlanıyor.",
      "CRS and 3MASH brands are positioned together within a portfolio offering product, training, and technical service support to clinics and laboratories."
    ),
    meta: tLocalized("Bölgesel çözüm ve destek ağı", "Regional solution & support network"),
    type: tLocalized("Çözüm ortağı", "Solution Partner"),
  },
  {
    name: tLocalized("Özel Manas Diş Protez Laboratuvarı", "Ozel Manas Dental Prosthesis Laboratory"),
    role: tLocalized("Diş protez laboratuvarı", "Dental prosthesis laboratory"),
    quote: tLocalized(
      "Laboratuvar üretim paylaşımlarında #3mash, #crs ve #digitaldentistry etiketleriyle dijital dental üretim çalışmalarını öne çıkarıyor.",
      "Highlights digital dental production work with #3mash, #crs, and #digitaldentistry tags in laboratory production shares."
    ),
    meta: tLocalized("Kullanıcı üretimi ve laboratuvar paylaşımı", "User production & laboratory share"),
    type: tLocalized("Kullanıcı çalışması", "User Showcase"),
  },
  {
    name: tLocalized("Mümin Tuğra", "Mümin Tuğra"),
    role: tLocalized("Dental laboratuvar içerik üreticisi", "Dental laboratory content creator"),
    quote: tLocalized(
      "CRS Model ve dijital dental üretim odağındaki paylaşımlarıyla 3MASH ekosistemine bağlı kullanıcı içeriği havuzunda yer alıyor.",
      "Included in the 3MASH ecosystem user content pool with focus on CRS Model and digital dental fabrication."
    ),
    meta: tLocalized("CRS Model odaklı üretim içeriği", "CRS Model focused production content"),
    type: tLocalized("Kullanıcı içeriği", "User Content"),
  },
  {
    name: tLocalized("Batuhan Arabacı", "Batuhan Arabacı"),
    role: tLocalized("Dental sektör profesyoneli", "Dental industry professional"),
    quote: tLocalized(
      "Ürünler için sektöre güçlü giriş yapan ve rakip tanımayan bir çizgi vurgusu yapan olumlu tanıtım ifadesiyle öne çıkıyor.",
      "Stands out with positive commentary highlighting a strong market entrance and unrivaled quality."
    ),
    meta: tLocalized("Sektör yorumu", "Industry review"),
    type: tLocalized("Profesyonel görüş", "Professional Opinion"),
  },
];

const proofStats = [
  { value: "580+", label: tLocalized("laboratuvar ve klinik", "laboratories and clinics") },
  { value: String(referenceEntries.length), label: tLocalized("referans kaydı", "reference records") },
  { value: "A-Z", label: tLocalized("kurulumdan desteğe", "from installation to support") },
];

const proofCategories = [
  tLocalized("Klinik vaka", "Clinical Case"),
  tLocalized("Kullanıcı yorumu", "User Review"),
  tLocalized("İş ortaklığı", "Partnership"),
  tLocalized("Laboratuvar paylaşımı", "Lab Showcase"),
];

const partnerCards = [
  {
    name: tLocalized("Yapı Dental", "Yapı Dental"),
    title: tLocalized("Kalibre edilmiş dental üretim ekosistemi", "Calibrated dental production ecosystem"),
    text: tLocalized(
      "Phrozen cihazları, CRS Dental reçineleri ve 3MASH teknik birikimi aynı üretim hattında buluşur. Cihaz seçimi, ışık dağılımı, Z ekseni stabilitesi ve reçine parametreleri birlikte değerlendirilir.",
      "Phrozen hardware, CRS Dental resins, and 3MASH technical expertise unite on the same line. Device selection, light uniformity, Z-axis stability, and resin parameters are evaluated together."
    ),
    image: machineP16L,
  },
  {
    name: tLocalized("Serdent", "serdent"),
    title: tLocalized("Bölgesel çözüm ve teknik servis ağı", "Regional solution & technical service network"),
    text: tLocalized(
      "Klinik ve laboratuvarlara ürün, eğitim ve teknik servis desteği sunan çözüm ağı içinde CRS ve 3MASH markaları birlikte konumlanır.",
      "CRS and 3MASH brands are positioned together within a solution network delivering product, training, and service support to clinics and labs."
    ),
    image: resinBottle,
  },
];

const workflowCards = [
  {
    title: tLocalized("Cihaz", "Hardware"),
    text: tLocalized(
      "3D yazıcı, yıkama-kürleme ve tarayıcı seçimi üretim hedefiyle birlikte planlanır.",
      "3D printer, wash-cure, and scanner selections are planned alongside production goals."
    ),
    image: p16lPrimaryImage,
  },
  {
    title: tLocalized("Malzeme", "Material"),
    text: tLocalized(
      "CRS reçine hattı; model, kompozit, tray ve restoratif uygulamalarda doğru parametreyle çalışır.",
      "The CRS resin line operates with validated parameters for model, composite, tray, and restorative applications."
    ),
    image: crsModelBottleImage,
  },
  {
    title: tLocalized("Destek", "Support"),
    text: tLocalized(
      "Kurulum, eğitim, reçine uyumlama ve satış sonrası teknik destek aynı ekip tarafından takip edilir.",
      "Installation, training, resin profiling, and after-sales support are handled by the same team."
    ),
    image: machineUW02,
  },
];

const storyPoints = [
  tLocalized("Üst ve alt All-on-Six geçici restorasyon üretimi", "Upper and lower All-on-Six provisional restoration fabrication"),
  tLocalized("Metal bar üzerinde 3D baskılı kompozit köprü yaklaşımı", "3D-printed composite bridge on metal bar framework"),
  tLocalized("Düşük ağırlık, takip edilebilir dijital iş akışı ve klinik adaptasyon odağı", "Low weight, traceable digital workflow, and clinical adaptation focus"),
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

  return { __html: sanitizeHtml(cleaned) };
}

function safeHref(value: string | undefined, fallback: string) {
  return safeNavigationHref(value, fallback);
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
      rel={isExternalHref(href) ? "noopener noreferrer" : undefined}
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
                tLocalized("Referanslar ve başarı hikayeleri", "References and success stories"),
              )}
            />
            <h2
              dangerouslySetInnerHTML={richHtml(
                props.titleText,
                tLocalized("Dijital üretimde güveni <em>gerçek işlerle</em> kuruyoruz.", "We build trust in digital production with <em>real results</em>."),
              )}
            />
            <p
              dangerouslySetInnerHTML={richHtml(
                props.descriptionHtml,
                defaultDescription,
              )}
            />
            <div className="tmref-actions" aria-label={tLocalized("Referanslar aksiyonları", "References actions")}>
              <ActionLink href={primaryHref} variant="primary">
                {text(props.primaryButtonText, tLocalized("Başarı hikayesini gör", "View success story"))}
              </ActionLink>
              <ActionLink href={secondaryHref} variant="secondary">
                {text(props.secondaryButtonText, tLocalized("Ekosistemi incele", "Explore ecosystem"))}
              </ActionLink>
            </div>
          </div>

          <div className="tmref-hero-proof" aria-label={tLocalized("3MASH referans özeti", "3MASH reference summary")}>
            <div className="tmref-proof-panel">
              <span>{tLocalized("Referans havuzu", "Reference Pool")}</span>
              <strong>{tLocalized("Kliniklerden laboratuvarlara uzanan saha kaydı.", "Field records spanning clinics to laboratories.")}</strong>
              <p>
                {tLocalized(
                  "Yorumlar, klinik vakalar, iş ortakları ve üretim paylaşımları aynı sayfada tek bir güven mimarisi olarak sunulur.",
                  "Reviews, clinical cases, partnerships, and production shares presented as a single architecture of trust."
                )}
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

        <div className="tmref-logo-strip" aria-label={tLocalized("3MASH güven logoları", "3MASH trust logos")}>
          {logos.map((logo, index) => (
            <div className="tmref-logo-cell" key={index}>
              <img src={logo} alt="" loading="lazy" />
            </div>
          ))}
        </div>

        <section
          className="tmref-reference-wall"
          aria-label={tLocalized("3MASH referans yorumları", "3MASH reference reviews")}
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
            <div className="tmref-section-kicker">{tLocalized("Klinik başarı hikayesi", "Clinical Success Story")}</div>
            <h3 id="tmref-case-title">
              {tLocalized("Dr. Barbaros Baran ile All-on-Six geçici restorasyon.", "All-on-Six temporary restoration with Dr. Barbaros Baran.")}
            </h3>
            <p>
              {tLocalized(
                "CRS Composite Resin ile tamamen dijital olarak üretilen geçici restorasyon; hafif yapı, kontrollü üretim süreci ve klinik adaptasyon odağıyla 3MASH ekosisteminin sahadaki karşılığını gösterir.",
                "The provisional restoration produced entirely digitally with CRS Composite Resin demonstrates the field value of the 3MASH ecosystem through lightweight design, controlled manufacturing, and clinical precision."
              )}
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
              alt={tLocalized("CRS Composite Resin ile dijital restorasyon çalışması", "Digital restoration study with CRS Composite Resin")}
            />
            <div className="tmref-media-caption">
              <strong>{tLocalized("CRS Composite Resin", "CRS Composite Resin")}</strong>
              <span>{tLocalized("Dijital geçici restorasyon ve klinik takip süreci", "Digital provisional restoration and clinical follow-up")}</span>
            </div>
          </div>
        </section>

        <section
          className="tmref-partners"
          aria-labelledby="tmref-partners-title"
        >
          <div className="tmref-section-heading">
            <div className="tmref-section-kicker">{tLocalized("Çözüm ortakları", "Solution Partners")}</div>
            <h3 id="tmref-partners-title">
              {tLocalized("Cihaz, reçine ve teknik destek aynı iş akışında buluşur.", "Hardware, resin, and technical support unite in the same workflow.")}
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
            <div className="tmref-section-kicker">{tLocalized("3MASH ile üretim akışı", "Production Workflow with 3MASH")}</div>
            <h3 id="tmref-workflow-title">
              {tLocalized("Referansların ortak noktası ürün değil, çalışan sistem.", "The common thread of references isn't just a product—it's a working system.")}
            </h3>
            <p>
              {tLocalized(
                "Başarılı sonuç yalnızca bir cihaz veya tek bir reçineyle oluşmaz. Laboratuvarda tekrarlanabilir kalite için donanım, malzeme, eğitim ve teknik destek birlikte ilerler.",
                "Successful results don't come from a single printer or resin alone. Hardware, materials, training, and support work together for repeatable quality in the lab."
              )}
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

export default ThreeMashReferences;
