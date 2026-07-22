import { Props } from "./types";

const introImage = "https://cdn.myikas.com/images/theme-images/b466a06c-a82a-4154-913c-4280388d5cfe/image_1080.webp";
const event1Image = "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/6d1b6f60-7cc3-4a9c-abc3-94d3f73871a5/image_1080.webp";
const event2Image = "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/7373343b-e10f-4e5c-aec6-fe2c0e05dae5/image_1080.webp";

const liveIntroHtml = `Çalıştığımız sektörlerde özellikle dental alanda öncü isimlerle genç ve değişime açık profesyonelleri buluşturarak bilgi paylaşımını teşvik etmeyi amaçlamaktadır. Amacımız, sektördeki son gelişmeleri yakından takip ederek bu bilgileri paydaşlarımıza aktarmak ve birlikte öğrenerek büyüdüğümüz bir ekosistem oluşturmaktır.<br /><br />Mash Academy, sektörün önde gelen isimleriyle işbirliği yaparak eğitimler, seminerler ve etkinlikler düzenlemekte ve katılımcılarını sektördeki en güncel bilgilerle buluşturmaktadır. Ayrıca, genç yeteneklere yönelik mentorluk programları ve uzmanlık eğitimleri ile sektöre yeni katılanları desteklemekteyiz.<br /><br />Biz, bilgiyi paylaşmanın ve birlikte öğrenmenin gücüne inanıyoruz. Mash Academy olarak, sektördeki değişimi takip etmek ve bu değişime ayak uydurmak isteyen herkesi bir araya getirerek sektörün gelişimine katkıda bulunmaya davet ediyoruz.<br /><br />Siz de bizimle birlikte, bilgiyi paylaşarak ve birlikte öğrenerek sektördeki gelişmelere yön vermek isterseniz, etkinliklerimize katılarak bu heyecanlı yolculuğa ortak olabilirsiniz. Haydi, geleceği birlikte şekillendirelim!`;

const livePastEventsText = "Geçmiş etkinliklerimiz arasında sektörde deneyimli isimlerin katıldığı paneller, uzmanlık seminerleri ve interaktif atölye çalışmaları bulunmaktadır. Ayrıca, yeni teknolojiler ve tedavi yöntemlerinin ele alındığı konferanslar düzenlemekteyiz. Bu etkinlikler sayesinde katılımcılarımız, sektördeki gelişmeleri yakından takip etmenin yanı sıra deneyimlerini paylaşarak birbirlerinden öğrenme fırsatı bulmaktadır.";

const legacyValues = new Set([
  "Dijital üretimi sadece cihazla değil, doğru bilgiyle kurun.",
  "Klinik ve laboratuvar ekipleri için <b>baskı, reçine, kürleme ve parametre yönetimini</b> pratik eğitimlerle tek akışta topluyoruz.",
  "Başlangıç kurulumu",
  "Cihaz seçimi, ilk kalibrasyon ve üretim standardınızı birlikte netleştiririz.",
  "Parametre eğitimi",
  "Reçine, yazıcı ve kürleme ayarlarının aynı sonucu vermesi için ekibinizi eğitiriz.",
  "Süreç desteği",
  "Üretim başladıktan sonra kalite kontrol, tekrar iş analizi ve teknik destek devam eder.",
  "Eğitim planlayın",
  "Ana sayfaya dön",
]);

function href(value?: string, fallback = "#") {
  const trimmed = value?.trim();
  return trimmed || fallback;
}

function liveValue(value: string | undefined, fallback: string) {
  const trimmed = value?.trim();
  if (!trimmed || legacyValues.has(trimmed)) return fallback;
  return trimmed;
}

function imageIdToUrl(value: string) {
  const trimmed = value.trim();
  if (trimmed.startsWith("theme-images/")) {
    return `https://cdn.myikas.com/images/${trimmed}/image_3840.webp`;
  }
  return trimmed;
}

function imageSource(value: unknown, fallback = "") {
  if (typeof value === "string" && value.trim()) {
    return imageIdToUrl(value);
  }

  if (value && typeof value === "object") {
    const image = value as {
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

function numberInRange(value: unknown, fallback: number, min: number, max: number) {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.min(max, Math.max(min, numeric));
}

function safeAspectRatio(value: string | undefined, fallback: string) {
  const trimmed = value?.trim();
  return trimmed && /^\d+(\.\d+)?\s*\/\s*\d+(\.\d+)?$/.test(trimmed) ? trimmed : fallback;
}

function themeToken(value: string | undefined, defaultValue: string, tokenName: string) {
  const trimmed = value?.trim();
  if (trimmed && trimmed.toLowerCase() !== defaultValue.toLowerCase()) return trimmed;
  return `var(${tokenName}, ${defaultValue})`;
}

function inlineHtml(value?: string) {
  return (value || "")
    .trim()
    .replace(/<\/p>\s*<p[^>]*>/gi, "<br />")
    .replace(/^<p[^>]*>/i, "")
    .replace(/<\/p>$/i, "");
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function styleTextChunks(markup: string, props?: Props) {
  const target = props?.styledPhrase?.trim();
  if (props?.wordStyleEnabled === false || !target) return markup;

  const matcher = new RegExp(escapeRegExp(target), "gi");
  return markup
    .split(/(<[^>]+>)/g)
    .map((part) => {
      if (!part || part.startsWith("<")) return part;
      return part.replace(matcher, (match) => `<span class="tmap-word-style">${match}</span>`);
    })
    .join("");
}

function richText(value?: string, props?: Props) {
  return { __html: styleTextChunks(inlineHtml(value), props) };
}

function EventCard({
  href,
  image,
  imageAlt,
  title,
  date,
  excerpt,
  readMoreText,
  wordStyle,
}: {
  href: string;
  image: string;
  imageAlt: string;
  title: string;
  date: string;
  excerpt: string;
  readMoreText: string;
  wordStyle: Props;
}) {
  return (
    <article className="tmap-event-card">
      <a className="tmap-event-image" href={href}>
        <img src={image} alt={imageAlt || title} loading="lazy" decoding="async" />
      </a>
      <div className="tmap-event-content">
        <a href={href}>
          <h2 dangerouslySetInnerHTML={richText(title, wordStyle)} />
        </a>
        <div className="tmap-event-date">
          <svg viewBox="0 0 448 512" aria-hidden="true">
            <path d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z" />
          </svg>
          <span>{date}</span>
        </div>
        <p dangerouslySetInnerHTML={richText(excerpt, wordStyle)} />
        <a className="tmap-read-more" href={href} dangerouslySetInnerHTML={richText(readMoreText, wordStyle)} />
      </div>
    </article>
  );
}

export function ThreeMashAcademyPage(props: Props) {
  const pageTitle = liveValue(props.eyebrowText, "Mash Academy");
  const quote = liveValue(
    props.titleText,
    `"Eğitimdir ki bir milleti ya hür bağımsız şanlı yüce bir toplum olarak yaşatır veya bir milleti esaret ve sefalete terk eder."`,
  );
  const introHtml = liveValue(props.descriptionHtml, liveIntroHtml);
  const pastTitle = liveValue(props.card3Title, "Geçmiş Etkinlikler");
  const pastDescription = liveValue(props.card3Text, livePastEventsText);
  const quoteAuthor = liveValue(props.quoteAuthorText, "M. Kemal Atatürk");
  const introTitle = liveValue(props.introTitleText, "Mash Academy,");
  const event1ReadMoreText = liveValue(props.primaryButtonText, "Devamını Oku");
  const event2ReadMoreText = liveValue(props.secondaryButtonText, "Devamını Oku");
  const showIntroImage = props.showIntroImage !== false;
  const showPastSection = props.showPastSection !== false;
  const showEventCards = props.showEventCards !== false;

  const themeStyle = {
    "--tmap-bg": themeToken(props.backgroundColor, "#ffffff", "--tm-theme-bg"),
    "--tmap-text": themeToken(props.textColor, "#2b2b2b", "--tm-theme-text"),
    "--tmap-muted": themeToken(props.mutedTextColor, "#535353", "--tm-theme-muted"),
    "--tmap-panel": themeToken(props.panelColor, "#ffffff", "--tm-theme-panel"),
    "--tmap-line": themeToken(props.lineColor, "#eeeeee", "--tm-theme-line"),
    "--tmap-accent": themeToken(props.accentColor, "#32303d", "--tm-theme-text"),
    "--tmap-heading": themeToken(props.headingColor, "#2b2b2b", "--tm-theme-text"),
    "--tmap-quote-text": themeToken(props.quoteTextColor, "#070707", "--tm-theme-text"),
    "--tmap-quote-author": themeToken(props.quoteAuthorColor, "#2b2b2b", "--tm-theme-text"),
    "--tmap-intro-bg": themeToken(props.introBackgroundColor, "#ffffff", "--tm-theme-panel"),
    "--tmap-intro-text": themeToken(props.introTextColor, "#000000", "--tm-theme-text"),
    "--tmap-card-title": themeToken(props.cardTitleColor, "#32303d", "--tm-theme-text"),
    "--tmap-event-date": themeToken(props.eventDateColor, "#32303d", "--tm-theme-text"),
    "--tmap-event-image-bg": themeToken(props.eventImageBackgroundColor, "#f8f8f8", "--tm-theme-bg"),
    "--tmap-read-more": themeToken(props.readMoreColor, "#32303d", "--tm-theme-text"),
    "--tmap-word-color": themeToken(props.styledPhraseColor, "#C7F136", "--tm-theme-accent"),
    "--tmap-word-weight": props.styledPhraseBold ? "800" : "inherit",
    "--tmap-word-style": props.styledPhraseItalic ? "italic" : "inherit",
    "--tmap-max-width": `${numberInRange(props.maxContentWidth, 1180, 760, 1600)}px`,
    "--tmap-quote-width": `${numberInRange(props.quoteWidthPercent, 50, 24, 100)}%`,
    "--tmap-quote-min-width": `${numberInRange(props.quoteMinWidth, 520, 0, 900)}px`,
    "--tmap-quote-padding": `${numberInRange(props.quotePadding, 30, 0, 80)}px`,
    "--tmap-section-gap": `${numberInRange(props.sectionGap, 32, 0, 120)}px`,
    "--tmap-intro-image-width": `${numberInRange(props.introImageWidthVw, 53, 20, 100)}vw`,
    "--tmap-intro-image-max-width": `${numberInRange(props.introImageMaxWidth, 800, 220, 1400)}px`,
    "--tmap-intro-image-min-height": `${numberInRange(props.introImageMinHeight, 520, 180, 900)}px`,
    "--tmap-event-gap": `${numberInRange(props.eventCardsGap, 24, 0, 80)}px`,
    "--tmap-event-image-ratio": safeAspectRatio(props.eventImageRatio, "1 / 1"),
  } as any;

  return (
    <section className="three-mash-academy-page" style={themeStyle}>
      <div className="tmap-quote-section">
        <h1 dangerouslySetInnerHTML={richText(pageTitle, props)} />
        <div className="tmap-quote">
          <p dangerouslySetInnerHTML={richText(quote, props)} />
          <strong dangerouslySetInnerHTML={richText(quoteAuthor, props)} />
        </div>
      </div>

      <div className="tmap-spacer" aria-hidden="true" />

      <div className={`tmap-intro-section${showIntroImage ? "" : " tmap-intro-section-no-image"}`}>
        <div className="tmap-intro-copy">
          <h2 dangerouslySetInnerHTML={richText(introTitle, props)} />
          <div dangerouslySetInnerHTML={richText(introHtml, props)} />
        </div>
        {showIntroImage && (
          <div className="tmap-intro-media">
            <img src={imageSource(props.introImageUrl, introImage)} alt={props.introImageAlt || "Mash Academy"} loading="lazy" decoding="async" />
          </div>
        )}
      </div>

      <div className="tmap-spacer" aria-hidden="true" />

      {showPastSection && (
        <div className="tmap-past-section">
          <h2 dangerouslySetInnerHTML={richText(pastTitle, props)} />
          <p dangerouslySetInnerHTML={richText(pastDescription, props)} />
        </div>
      )}

      {showEventCards && (
        <div className="tmap-events">
          <EventCard
            href={href(props.primaryButtonHref, "/blog/blender-for-dental-ile-ibar-uzeri-composite-kron-tasarim-egitimi-raporu")}
            image={imageSource(props.event1ImageUrl, event1Image)}
            imageAlt={props.event1ImageAlt || "Blender for Dental ile IBAR eğitimi"}
            title={liveValue(props.card1Title, "Blender for Dental ile IBAR Üzeri Composite Kron Tasarım Eğitimi Raporu")}
            date={liveValue(props.event1Date, "Apr 2, 2025")}
            excerpt={liveValue(
              props.card1Text,
              `''Blender for Dental ile IBAR Üzeri Composite Kron Tasarım Eğitimi" webinarında, dijital diş hekimliği alanında yenilikçi yaklaşımlar ve IBAR destekli hibrit protez tasarımı ele alınmıştır.`,
            )}
            readMoreText={event1ReadMoreText}
            wordStyle={props}
          />
          <EventCard
            href={href(props.secondaryButtonHref, "/blog/ibar-tasarimi-egitimi")}
            image={imageSource(props.event2ImageUrl, event2Image)}
            imageAlt={props.event2ImageAlt || "IBAR Tasarımı Eğitimi"}
            title={liveValue(props.card2Title, "IBAR Tasarımı Eğitimi")}
            date={liveValue(props.event2Date, "Apr 5, 2024")}
            excerpt={liveValue(
              props.card2Text,
              `Eğitim Mash Academy tarafından, 23 Mart 2024 tarihinde Antalya'da organize edilmiştir. Eğitimcilerimizden Vahit Topçu "Hibrit Protez Tasarımı" ve Alihan Şahbaz "IBAR Tasarımı" eğitimi ile katılımcılara tecrübelerini aktarmıştır. Eğitimin sonunda 3D printer kullanımındaki sık karşılaşılan hatalar ve püf noktalara değinilmiştir.`,
            )}
            readMoreText={event2ReadMoreText}
            wordStyle={props}
          />
        </div>
      )}
    </section>
  );
}

export default ThreeMashAcademyPage;
