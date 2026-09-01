import { academyEvent1Image, academyEvent2Image, academyIntroImage } from "./source-assets";
import { Props } from "./types";
import { tLocalized } from "../../utils/i18n";
import { sanitizeHtml } from "../../utils/sanitizeHtml";

function value(input: string | undefined, fallback: string) {
  const trimmed = input?.trim();
  return trimmed || fallback;
}

function href(input: string | undefined, fallback = "#") {
  const trimmed = input?.trim();
  return trimmed || fallback;
}

function inlineHtml(input: string | undefined, fallback = "") {
  return value(input, fallback)
    .replace(/<\/p>\s*<p[^>]*>/gi, "<br />")
    .replace(/^<p[^>]*>/i, "")
    .replace(/<\/p>$/i, "");
}

function escapeRegExp(input: string) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function styledHtml(markup: string, props: Props) {
  const phrase = props.styledPhrase?.trim();
  if (props.wordStyleEnabled === false || !phrase) return markup;

  const matcher = new RegExp(escapeRegExp(phrase), "gi");
  return markup
    .split(/(<[^>]+>)/g)
    .map((part) => {
      if (!part || part.startsWith("<")) return part;
      return part.replace(matcher, (match) => `<span class="tma-word-style">${match}</span>`);
    })
    .join("");
}

function richText(input: string | undefined, props: Props, fallback = "") {
  return { __html: styledHtml(sanitizeHtml(inlineHtml(input, fallback)), props) };
}

function imageUrl(input: unknown, fallback: string) {
  if (typeof input === "string" && input.trim()) return input.trim();

  if (input && typeof input === "object") {
    const image = input as {
      id?: unknown;
      url?: unknown;
      src?: unknown;
      imageUrl?: unknown;
      value?: unknown;
      image?: { url?: unknown; src?: unknown };
      file?: { url?: unknown; src?: unknown };
    };
    const candidate =
      image.url ||
      image.src ||
      image.imageUrl ||
      image.value ||
      image.id ||
      image.image?.url ||
      image.image?.src ||
      image.file?.url ||
      image.file?.src;

    if (typeof candidate === "string" && candidate.trim()) {
      const trimmed = candidate.trim();
      return trimmed.startsWith("theme-images/") ? `https://cdn.myikas.com/images/${trimmed}/image_3840.webp` : trimmed;
    }
  }

  return fallback;
}

function numberInRange(input: unknown, fallback: number, min: number, max: number) {
  const numeric = typeof input === "number" ? input : Number(input);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.min(max, Math.max(min, numeric));
}

function cssColor(input: string | undefined, fallback: string) {
  const trimmed = input?.trim();
  return trimmed || fallback;
}

function themeColor(input: string | undefined, fallback: string, token: string, legacyDefaults: string[] = []) {
  const trimmed = input?.trim();
  const normalized = trimmed?.toLowerCase();
  const defaults = [fallback, ...legacyDefaults].map((item) => item.toLowerCase());

  if (!trimmed || (normalized && defaults.includes(normalized))) {
    return `var(${token}, ${fallback})`;
  }

  return trimmed;
}

function htmlParts(input: string | undefined, props: Props, fallback = "") {
  return inlineHtml(input, fallback)
    .split(/(?:<br\s*\/?>\s*){2,}/gi)
    .map((part) => styledHtml(part.trim(), props))
    .filter(Boolean);
}

const sourceDescription = tLocalized(
  "Çalıştığımız sektörlerde özellikle dental alanda öncü isimlerle genç ve değişime açık profesyonelleri buluşturarak bilgi paylaşımını teşvik etmeyi amaçlamaktadır. Amacımız, sektördeki son gelişmeleri yakından takip ederek bu bilgileri paydaşlarımıza aktarmak ve birlikte öğrenerek büyüdüğümüz bir ekosistem oluşturmaktır.<br><br>Mash Academy, sektörün önde gelen isimleriyle işbirliği yaparak eğitimler, seminerler ve etkinlikler düzenlemekte ve katılımcılarını sektördeki en güncel bilgilerle buluşturmaktadır. Ayrıca, genç yeteneklere yönelik mentorluk programları ve uzmanlık eğitimleri ile sektöre yeni katılanları desteklemekteyiz.<br><br>Biz, bilgiyi paylaşmanın ve birlikte öğrenmenin gücüne inanıyoruz. Mash Academy olarak, sektördeki değişimi takip etmek ve bu değişime ayak uydurmak isteyen herkesi bir araya getirerek sektörün gelişimine katkıda bulunmaya davet ediyoruz.<br><br>Siz de bizimle birlikte, bilgiyi paylaşarak ve birlikte öğrenerek sektördeki gelişmelere yön vermek isterseniz, etkinliklerimize katılarak bu heyecanlı yolculuğa ortak olabilirsiniz. Haydi, geleceği birlikte şekillendirelim!",
  "It aims to encourage knowledge sharing by bringing together leading names and young, forward-thinking professionals in the industries we operate in, especially in dentistry. Our goal is to closely follow the latest developments in the sector, pass this knowledge on to our stakeholders, and create an ecosystem where we grow and learn together.<br><br>Mash Academy collaborates with prominent industry figures to organize trainings, seminars, and events, connecting participants with the latest knowledge in the field. Additionally, we support newcomers to the sector through mentorship programs and specialized training for young talents.<br><br>We believe in the power of sharing knowledge and learning together. As Mash Academy, we invite everyone who wants to follow and adapt to industry changes to come together and contribute to the sector's development.<br><br>If you would like to join us in shaping industry developments by sharing knowledge and learning together, you can be part of this exciting journey by attending our events. Let's shape the future together!"
);

const sourcePastText =
  tLocalized("Geçmiş etkinliklerimiz arasında sektörde deneyimli isimlerin katıldığı paneller, uzmanlık seminerleri ve interaktif atölye çalışmaları bulunmaktadır. Ayrıca, yeni teknolojiler ve tedavi yöntemlerinin ele alındığı konferanslar düzenlemekteyiz. Bu etkinlikler sayesinde katılımcılarımız, sektördeki gelişmeleri yakından takip etmenin yanı sıra deneyimlerini paylaşarak birbirlerinden öğrenme fırsatı bulmaktadır.", "Our past events include panels featuring experienced names in the industry, expert seminars, and interactive workshops. We also organize conferences covering new technologies and treatment methods. Through these events, our participants get the chance to closely follow developments in the industry as well as learn from each other by sharing their experiences.");

const sourceIntroTitle = tLocalized("Bilgiyle büyüyen ekosistem.", "An ecosystem powered by knowledge.");
const sourceQuoteAuthor = tLocalized("M. Kemal Atatürk", "M. Kemal Atatürk");
const sourcePastTitle = tLocalized("Geçmiş Etkinlikler", "Past Events");
const sourceReadMore = tLocalized("Devamını Oku", "Read More");

export function ThreeMashAcademyPage(props: Props) {
  const sourceTitle = tLocalized("Mash Academy", "Mash Academy");
  const sourceQuote = tLocalized(
    "Eğitimdir ki bir milleti ya hür bağımsız şanlı yüce bir toplum olarak yaşatır veya bir milleti esaret ve sefalete terk eder.",
    "It is education that lifts a nation to a free, independent, glorious and elevated society, or abandons a nation to captivity and misery."
  );

  const accentColor = themeColor(props.accentColor, "#C7F136", "--tm-theme-accent", ["#caff12"]);
  const headingColor = themeColor(props.headingColor, "#0E0E0C", "--tm-theme-text", ["#1f2933", "#111111", "#070707"]);
  const mutedColor = themeColor(props.mutedTextColor, "#55554e", "--tm-theme-sub", ["#555555", "#777777"]);
  const textColor = themeColor(props.textColor, "#0E0E0C", "--tm-theme-text", ["#111111", "#000000"]);

  const style = {
    "--tma-bg": themeColor(props.backgroundColor, "#FAFAF7", "--tm-theme-bg", ["#ffffff", "#fff"]),
    "--tma-text": textColor,
    "--tma-muted": mutedColor,
    "--tma-panel": themeColor(props.panelColor, "#F1F1EC", "--tm-theme-panel", ["#ffffff", "#fff"]),
    "--tma-accent": accentColor,
    "--tma-line": themeColor(props.lineColor, "#E6E6E0", "--tm-theme-line", ["#e8e8e8"]),
    "--tma-quote": themeColor(props.quoteTextColor, "#0E0E0C", "--tm-theme-text", ["#070707", "#111111"]),
    "--tma-quote-author": themeColor(props.quoteAuthorColor, "#55554e", "--tm-theme-sub", ["#2b2b2b"]),
    "--tma-heading": headingColor,
    "--tma-intro-bg": themeColor(props.introBackgroundColor, "#F1F1EC", "--tm-theme-panel", ["#ffffff", "#fff"]),
    "--tma-intro-text": themeColor(props.introTextColor, "#0E0E0C", "--tm-theme-text", ["#000000", "#111111"]),
    "--tma-card-title": themeColor(props.cardTitleColor, "#0E0E0C", "--tm-theme-text", ["#1f2933"]),
    "--tma-event-date": themeColor(props.eventDateColor, "#8f8f86", "--tm-theme-muted", ["#777777"]),
    "--tma-event-image-bg": themeColor(props.eventImageBackgroundColor, "#E6E6E0", "--tm-theme-line", ["#f7f7f7"]),
    "--tma-read-more": themeColor(props.readMoreColor, "#0E0E0C", "--tm-theme-text", ["#32303d"]),
    "--tma-word-color": cssColor(props.styledPhraseColor, accentColor),
    "--tma-max": `${numberInRange(props.maxContentWidth, 1280, 720, 1800)}px`,
    "--tma-quote-width": `${numberInRange(props.quoteWidthPercent, 50, 30, 100)}%`,
    "--tma-quote-min": `${numberInRange(props.quoteMinWidth, 520, 260, 900)}px`,
    "--tma-quote-padding": `${numberInRange(props.quotePadding, 30, 0, 96)}px`,
    "--tma-gap": `${numberInRange(props.sectionGap, 32, 0, 120)}px`,
    "--tma-intro-image-max": "560px",
    "--tma-event-gap": `${numberInRange(props.eventCardsGap, 24, 8, 80)}px`,
    "--tma-event-ratio": value(props.eventImageRatio, "1 / 1"),
    "--tma-word-weight": props.styledPhraseBold === false ? "inherit" : "700",
    "--tma-word-style": props.styledPhraseItalic ? "italic" : "inherit",
  } as any;

  const events = [
    {
      image: academyEvent1Image,
      fallbackTitle: tLocalized("Blender for Dental ile IBAR Üzeri Composite Kron Tasarım Eğitimi Raporu", "Composite Crown Design Over IBAR with Blender for Dental Training Report"),
      fallbackText: tLocalized("''Blender for Dental ile IBAR Üzeri Composite Kron Tasarım Eğitimi\" webinarında, dijital diş hekimliği alanında yenilikçi yaklaşımlar ve IBAR destekli hibrit protez tasarımı ele alınmıştır.", "In the webinar \"Composite Crown Design Over IBAR with Blender for Dental,\" innovative approaches in digital dentistry and IBAR-supported hybrid prosthesis design were discussed."),
      fallbackHref: tLocalized("/blog/blender-for-dental-ile-ibar-uzeri-composite-kron-tasarim-egitimi-raporu", "/blog/blender-for-dental-ile-ibar-uzeri-composite-kron-tasarim-egitimi-raporu"),
      fallbackDate: "Apr 2, 2025",
    },
    {
      image: academyEvent2Image,
      fallbackTitle: tLocalized("IBAR Tasarımı Eğitimi", "IBAR Design Training"),
      fallbackText: tLocalized("Eğitim Mash Academy tarafından, 23 Mart 2024 tarihinde Antalya'da organize edilmiştir. Eğitimcilerimizden Vahit Topçu \"Hibrit Protez Tasarımı\" ve Alihan Şahbaz \"IBAR Tasarımı\" eğitimi ile katılımcılara tecrübelerini aktarmıştır. Eğitimin sonunda 3D printer kullanımındaki sık karşılaşılan hatalar ve püf noktalara değinilmiştir.", "The training was organized by Mash Academy in Antalya on March 23, 2024. Our instructors Vahit Topçu, with the \"Hybrid Denture Design\" training, and Alihan Şahbaz, with the \"IBAR Design\" training, shared their experience with participants. At the end of the training, common mistakes and tips in 3D printer use were covered."),
      fallbackHref: tLocalized("/blog/ibar-tasarimi-egitimi", "/blog/ibar-tasarimi-egitimi"),
      fallbackDate: "Apr 5, 2024",
    },
  ];

  const descriptionParts = htmlParts(undefined, props, sourceDescription);
  return (
    <section className="three-mash-academy-page" style={style}>
      <div className="tma-shell">
        <section className="tma-quote-section">
          <h1 dangerouslySetInnerHTML={richText(undefined, props, sourceTitle)} />
          <blockquote>
            <p dangerouslySetInnerHTML={richText(undefined, props, sourceQuote)} />
            <cite dangerouslySetInnerHTML={richText(undefined, props, sourceQuoteAuthor)} />
          </blockquote>
        </section>

        <section className="tma-intro">
          <div className="tma-intro-media">
            <img src={academyIntroImage} alt={sourceTitle} loading="eager" decoding="async" />
          </div>
          <div className="tma-section-head">
            <h2 dangerouslySetInnerHTML={richText(undefined, props, sourceIntroTitle)} />
            <div className="tma-description-flow">
              {descriptionParts.map((part, index) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: part }} />
              ))}
            </div>
          </div>
        </section>

        <section className="tma-past">
          <div className="tma-section-head">
            <h2 dangerouslySetInnerHTML={richText(undefined, props, sourcePastTitle)} />
          </div>
          <p dangerouslySetInnerHTML={richText(undefined, props, sourcePastText)} />
        </section>

        <section className="tma-events" id="tma-events">
          {events.map((event, index) => (
            <article className="tma-card" key={index}>
              <a className="tma-card-image" href={href(undefined, event.fallbackHref)}>
                <img src={event.image} alt={event.fallbackTitle} loading="lazy" decoding="async" />
              </a>
              <div className="tma-card-body">
                <span className="tma-card-date">{event.fallbackDate}</span>
                <a className="tma-card-title" href={href(undefined, event.fallbackHref)} dangerouslySetInnerHTML={richText(undefined, props, event.fallbackTitle)} />
                <p dangerouslySetInnerHTML={richText(undefined, props, event.fallbackText)} />
                <a className="tma-read-more" href={href(undefined, event.fallbackHref)} dangerouslySetInnerHTML={richText(undefined, props, sourceReadMore)} />
              </div>
            </article>
          ))}
        </section>
      </div>
    </section>
  );
}

export default ThreeMashAcademyPage;
