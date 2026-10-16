import type { JSX } from "preact";
import { resolveThemeColor } from "../../utils/themeColor";
import { academyEvent1Image, academyEvent2Image } from "../MashAkademiV2/source-assets";
import type { Props } from "./types";
import { tLocalized } from "../../utils/i18n";
import { safeNavigationHref } from "../../utils/safeRedirect";
import { sanitizeHtml } from "../../utils/sanitizeHtml";

export type MashAkademi2Props = Props;

interface AcademyEvent {
  key: string;
  date: string;
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  href: string;
  ctaText: string;
}

interface ThemeStyle extends JSX.CSSProperties {
  "--ma-bg": string;
  "--ma-text": string;
  "--ma-muted": string;
  "--ma-panel": string;
  "--ma-accent": string;
  "--ma-line": string;
  "--ma-heading": string;
  "--ma-card-title": string;
  "--ma-word-color": string;
  "--ma-max": string;
  "--ma-gap": string;
  "--ma-word-weight": string;
  "--ma-word-style": string;
  "--ma-intro-background": string;
  "--ma-intro-heading": string;
  "--ma-intro-text": string;
  "--ma-intro-muted": string;
  "--ma-intro-accent": string;
  "--ma-archive-background": string;
  "--ma-archive-heading": string;
  "--ma-archive-text": string;
  "--ma-archive-accent": string;
  "--ma-archive-line": string;
}

const sourceDescription =
  "Çalıştığımız sektörlerde özellikle dental alanda öncü isimlerle genç ve değişime açık profesyonelleri buluşturarak bilgi paylaşımını teşvik etmeyi amaçlamaktadır. Amacımız, sektördeki son gelişmeleri yakından takip ederek bu bilgileri paydaşlarımıza aktarmak ve birlikte öğrenerek büyüdüğümüz bir ekosistem oluşturmaktır.<br><br>Mash Academy, sektörün önde gelen isimleriyle işbirliği yaparak eğitimler, seminerler ve etkinlikler düzenlemekte ve katılımcılarını sektördeki en güncel bilgilerle buluşturmaktadır. Ayrıca, genç yeteneklere yönelik mentorluk programları ve uzmanlık eğitimleri ile sektöre yeni katılanları desteklemekteyiz.<br><br>Biz, bilgiyi paylaşmanın ve birlikte öğrenmenin gücüne inanıyoruz. Mash Academy olarak, sektördeki değişimi takip etmek ve bu değişime ayak uydurmak isteyen herkesi bir araya getirerek sektörün gelişimine katkıda bulunmaya davet ediyoruz.<br><br>Siz de bizimle birlikte, bilgiyi paylaşarak ve birlikte öğrenerek sektördeki gelişmelere yön vermek isterseniz, etkinliklerimize katılarak bu heyecanlı yolculuğa ortak olabilirsiniz. Haydi, geleceği birlikte şekillendirelim!";

const sourceDescriptionEn =
  "It aims to encourage knowledge sharing by bringing together leading names and young, forward-thinking professionals in the industries we operate in, especially in dentistry. Our goal is to closely follow the latest developments in the sector, pass this knowledge on to our stakeholders, and create an ecosystem where we grow and learn together.<br><br>Mash Academy collaborates with prominent industry figures to organize trainings, seminars, and events, connecting participants with the latest knowledge in the field. Additionally, we support newcomers to the sector through mentorship programs and specialized training for young talents.<br><br>We believe in the power of sharing knowledge and learning together. As Mash Academy, we invite everyone who wants to follow and adapt to industry changes to come together and contribute to the sector's development.<br><br>If you would like to join us in shaping industry developments by sharing knowledge and learning together, you can be part of this exciting journey by attending our events. Let's shape the future together!";

const sourceArchiveText =
  "Geçmiş etkinliklerimiz arasında sektörde deneyimli isimlerin katıldığı paneller, uzmanlık seminerleri ve interaktif atölye çalışmaları bulunmaktadır. Ayrıca, yeni teknolojiler ve tedavi yöntemlerinin ele alındığı konferanslar düzenlemekteyiz. Bu etkinlikler sayesinde katılımcılarımız, sektördeki gelişmeleri yakından takip etmenin yanı sıra deneyimlerini paylaşarak birbirlerinden öğrenme fırsatı bulmaktadır.";

const sourceArchiveTextEn =
  "Our past events include panels featuring experienced names in the industry, expert seminars, and interactive workshops. We also organize conferences covering new technologies and treatment methods. Through these events, our participants get the chance to closely follow developments in the industry as well as learn from each other by sharing their experiences.";

function value(input: string | undefined, fallback: string) {
  return input?.trim() || fallback;
}

function localizedValue(
  trInput: string | undefined,
  enInput: string | undefined,
  fallbackTr: string,
  fallbackEn: string
) {
  return tLocalized(value(trInput, fallbackTr), value(enInput, fallbackEn));
}

function linkHref(input: unknown, fallback: string) {
  let candidate = "";
  if (typeof input === "string") {
    candidate = input;
  } else if (input && typeof input === "object") {
    const link = input as {
      href?: unknown;
      externalLink?: unknown;
      fileUrl?: unknown;
    };
    const value = link.href || link.externalLink || link.fileUrl;
    if (typeof value === "string") candidate = value;
  }

  return safeNavigationHref(candidate, fallback);
}

function imageUrl(input: unknown, fallback: string) {
  if (typeof input === "string" && input.trim()) return input.trim();
  if (!input || typeof input !== "object") return fallback;

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

  if (typeof candidate !== "string" || !candidate.trim()) return fallback;
  const trimmed = candidate.trim();
  return trimmed.startsWith("theme-images/")
    ? `https://cdn.myikas.com/images/${trimmed}/image_3840.webp`
    : trimmed;
}

function boundedNumber(input: unknown, fallback: number, min: number, max: number) {
  const number = typeof input === "number" ? input : Number(input);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(max, Math.max(min, number));
}

function escapeRegExp(input: string) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function styledHtml(markup: string, props: MashAkademi2Props) {
  const phrase = props.styledPhrase?.trim();
  if (props.wordStyleEnabled === false || !phrase) return markup;

  const matcher = new RegExp(escapeRegExp(phrase), "gi");
  return markup
    .split(/(<[^>]+>)/g)
    .map((part) => {
      if (!part || part.startsWith("<")) return part;
      return part.replace(matcher, (match) => `<span class="ma-word-style">${match}</span>`);
    })
    .join("");
}

function richText(input: string, props: MashAkademi2Props) {
  const markup = input
    .replace(/<\/p>\s*<p[^>]*>/gi, "<br />")
    .replace(/^<p[^>]*>/i, "")
    .replace(/<\/p>$/i, "");
  return { __html: styledHtml(sanitizeHtml(markup), props) };
}

function paragraphParts(input: string, props: MashAkademi2Props) {
  return input
    .split(/(?:<br\s*\/?>\s*){2,}/gi)
    .map((part) => sanitizeHtml(styledHtml(part.trim(), props)))
    .filter(Boolean);
}

function optionalEvent(
  props: MashAkademi2Props,
  index: 3 | 4
): AcademyEvent | undefined {
  const title = localizedValue(
    index === 3 ? props.card3Title : props.card4Title,
    index === 3 ? props.card3TitleEn : props.card4TitleEn,
    "",
    ""
  );
  const text = localizedValue(
    index === 3 ? props.card3Text : props.card4Text,
    index === 3 ? props.card3TextEn : props.card4TextEn,
    "",
    ""
  );
  const date = localizedValue(
    index === 3 ? props.card3Date : props.card4Date,
    index === 3 ? props.card3DateEn : props.card4DateEn,
    "",
    ""
  );
  const image = imageUrl(index === 3 ? props.card3ImageUrl : props.card4ImageUrl, "");
  const imageAlt = localizedValue(
    index === 3 ? props.card3ImageAlt : props.card4ImageAlt,
    index === 3 ? props.card3ImageAltEn : props.card4ImageAltEn,
    title,
    title
  );
  const href = linkHref(index === 3 ? props.card3Href : props.card4Href, "");
  const ctaText = localizedValue(
    index === 3 ? props.card3CtaText : props.card4CtaText,
    index === 3 ? props.card3CtaTextEn : props.card4CtaTextEn,
    "",
    ""
  );

  if (!title.trim() || !image || !href || !ctaText.trim()) return undefined;
  return { key: `event${index}`, date, title, text, image, imageAlt, href, ctaText };
}

export function MashAkademi2(props: MashAkademi2Props) {
  const pageTitle = localizedValue(props.eyebrowText, props.eyebrowTextEn, "Mash Academy", "Mash Academy");
  const introTitle = localizedValue(
    props.introTitleText,
    props.introTitleTextEn,
    "Bilgiyle büyüyen ekosistem.",
    "An ecosystem powered by knowledge."
  );
  const description = localizedValue(props.descriptionHtml, props.descriptionHtmlEn, sourceDescription, sourceDescriptionEn);
  const quote = localizedValue(
    props.quoteText,
    props.quoteTextEn,
    "Eğitimdir ki bir milleti ya hür bağımsız şanlı yüce bir toplum olarak yaşatır veya bir milleti esaret ve sefalete terk eder.",
    "It is education that lifts a nation to a free, independent, glorious and elevated society, or abandons a nation to captivity and misery."
  );
  const quoteAuthor = localizedValue(
    props.quoteAuthorText,
    props.quoteAuthorTextEn,
    "M. Kemal Atatürk",
    "M. Kemal Atatürk"
  );
  const quotePortrait = imageUrl(
    props.quotePortraitImage,
    "https://upload.wikimedia.org/wikipedia/commons/1/1e/Kemal_Atat%C3%BCrk_portrait.jpg"
  );
  const quotePortraitAlt = localizedValue(
    props.quotePortraitAlt,
    props.quotePortraitAltEn,
    "Mustafa Kemal Atatürk portresi",
    "Portrait of Mustafa Kemal Atatürk"
  );
  const quoteFrame = imageUrl(props.quoteFrameImage, "");
  const archiveTitle = localizedValue(
    props.archiveTitle,
    props.archiveTitleEn,
    "Geçmiş Etkinlikler",
    "Past Events"
  );
  const archiveText = localizedValue(props.archiveText, props.archiveTextEn, sourceArchiveText, sourceArchiveTextEn);

  const accent = resolveThemeColor(props.accentColor) || "#b8ff4a";
  const heading = resolveThemeColor(props.headingColor) || "#f7fbff";
  const muted = resolveThemeColor(props.mutedTextColor) || "#d2dfef";
  const text = resolveThemeColor(props.textColor) || "#edf5ff";
  const style: ThemeStyle = {
    "--ma-bg": resolveThemeColor(props.backgroundColor) || "#0a1320",
    "--ma-text": text,
    "--ma-muted": muted,
    "--ma-panel": resolveThemeColor(props.panelColor) || "#101b2a",
    "--ma-accent": accent,
    "--ma-line": resolveThemeColor(props.lineColor) || "#2b3c4e",
    "--ma-heading": heading,
    "--ma-card-title": resolveThemeColor(props.cardTitleColor) || "#f6fbff",
    "--ma-word-color": resolveThemeColor(props.styledPhraseColor) || accent,
    "--ma-max": `${boundedNumber(props.maxContentWidth, 1280, 720, 1800)}px`,
    "--ma-gap": `${boundedNumber(props.eventCardsGap, 24, 8, 80)}px`,
    "--ma-word-weight": props.styledPhraseBold === false ? "inherit" : "700",
    "--ma-word-style": props.styledPhraseItalic ? "italic" : "inherit",
    "--ma-intro-background": resolveThemeColor(props.introBackgroundColor) || "#122436",
    "--ma-intro-heading": resolveThemeColor(props.introTitleColor) || "#c4d8e6",
    "--ma-intro-text": resolveThemeColor(props.introTextColor) || "#c1d3df",
    "--ma-intro-muted": resolveThemeColor(props.introMutedTextColor) || "#9fb5c2",
    "--ma-intro-accent": resolveThemeColor(props.introAccentColor) || "#b8e65b",
    "--ma-archive-background": resolveThemeColor(props.archiveBackgroundColor) || "#172722",
    "--ma-archive-heading": resolveThemeColor(props.archiveTitleColor) || "#bcd8c4",
    "--ma-archive-text": resolveThemeColor(props.archiveTextColor) || "#a8c2ad",
    "--ma-archive-accent": resolveThemeColor(props.archiveAccentColor) || "#a7cf73",
    "--ma-archive-line": resolveThemeColor(props.archiveBorderColor) || "#365644",
  };

  const event1Title = localizedValue(
    props.card1Title,
    props.card1TitleEn,
    "Blender for Dental ile IBAR Üzeri Composite Kron Tasarım Eğitimi Raporu",
    "Composite Crown Design Over IBAR with Blender for Dental Training Report"
  );
  const event1Text = localizedValue(
    props.card1Text,
    props.card1TextEn,
    "Blender for Dental ile IBAR Üzeri Composite Kron Tasarım Eğitimi webinarında, dijital diş hekimliği alanında yenilikçi yaklaşımlar ve IBAR destekli hibrit protez tasarımı ele alınmıştır.",
    "In the webinar \"Composite Crown Design Over IBAR with Blender for Dental,\" innovative approaches in digital dentistry and IBAR-supported hybrid prosthesis design were discussed."
  );
  const event2Title = localizedValue(props.card2Title, props.card2TitleEn, "IBAR Tasarımı Eğitimi", "IBAR Design Training");
  const event2Text = localizedValue(
    props.card2Text,
    props.card2TextEn,
    "Eğitim Mash Academy tarafından, 23 Mart 2024 tarihinde Antalya'da organize edilmiştir. Eğitimcilerimizden Vahit Topçu \"Hibrit Protez Tasarımı\" ve Alihan Şahbaz \"IBAR Tasarımı\" eğitimi ile katılımcılara tecrübelerini aktarmıştır. Eğitimin sonunda 3D printer kullanımındaki sık karşılaşılan hatalar ve püf noktalara değinilmiştir.",
    "The training was organized by Mash Academy in Antalya on March 23, 2024. Our instructors Vahit Topçu, with the \"Hybrid Denture Design\" training, and Alihan Şahbaz, with the \"IBAR Design\" training, shared their experience with participants. At the end of the training, common mistakes and tips in 3D printer use were covered."
  );

  const events: AcademyEvent[] = [];
  if (props.showEvent1 !== false) {
    events.push({
      key: "event1",
      date: localizedValue(props.card1Date, props.card1DateEn, "Apr 2, 2025", "Apr 2, 2025"),
      title: event1Title,
      text: event1Text,
      image: imageUrl(props.card1ImageUrl, academyEvent1Image),
      imageAlt: localizedValue(props.card1ImageAlt, props.card1ImageAltEn, event1Title, event1Title),
      href: linkHref(
        props.card1Href,
        "/blog/blender-for-dental-ile-ibar-uzeri-composite-kron-tasarim-egitimi-raporu"
      ),
      ctaText: localizedValue(props.card1CtaText, props.card1CtaTextEn, "Devamını Oku", "Read More"),
    });
  }
  if (props.showEvent2 !== false) {
    events.push({
      key: "event2",
      date: localizedValue(props.card2Date, props.card2DateEn, "Apr 5, 2024", "Apr 5, 2024"),
      title: event2Title,
      text: event2Text,
      image: imageUrl(props.card2ImageUrl, academyEvent2Image),
      imageAlt: localizedValue(props.card2ImageAlt, props.card2ImageAltEn, event2Title, event2Title),
      href: linkHref(props.card2Href, "/blog/ibar-tasarimi-egitimi"),
      ctaText: localizedValue(props.card2CtaText, props.card2CtaTextEn, "Devamını Oku", "Read More"),
    });
  }
  if (props.showEvent3 === true) {
    const event = optionalEvent(props, 3);
    if (event) events.push(event);
  }
  if (props.showEvent4 === true) {
    const event = optionalEvent(props, 4);
    if (event) events.push(event);
  }

  const descriptionParts = paragraphParts(description, props);
  const introImage = imageUrl(
    props.introImageUrl,
    "https://images.unsplash.com/photo-1727250877958-f262a4eb21cd?auto=format&fit=crop&w=1400&q=85"
  );
  const introImageAlt = localizedValue(
    props.introImageAlt,
    props.introImageAltEn,
    "Diş kliniğinde birlikte çalışan iki sağlık profesyoneli",
    "Two dental professionals working together in a clinic"
  );

  return (
    <section className="mash-akademi2" style={style}>
      <div className="mash-akademi2-glow mash-akademi2-glow-a" aria-hidden="true" />
      <div className="mash-akademi2-glow mash-akademi2-glow-b" aria-hidden="true" />
      <div className="mash-akademi2-inner">
        {props.showIntroSection !== false && (
          <section className={`ma-intro${props.showIntroImage === false ? " ma-intro-text-only" : ""}`}>
            {props.showIntroImage !== false && (
              <div className="ma-intro-media">
                <img src={introImage} alt={introImageAlt} loading="eager" decoding="async" />
              </div>
            )}
            <div className="ma-intro-shade" aria-hidden="true" />
            <div className="ma-intro-copy">
              <span className="ma-eyebrow" dangerouslySetInnerHTML={richText(pageTitle, props)} />
              <h1 dangerouslySetInnerHTML={richText(introTitle, props)} />
              <div className="ma-intro-description">
                {descriptionParts.map((part, index) => (
                  <p key={index} dangerouslySetInnerHTML={{ __html: part }} />
                ))}
              </div>
              {events[0] && (
                <a className="ma-intro-cta" href={events[0].href}>
                  <span dangerouslySetInnerHTML={richText(events[0].ctaText, props)} />
                  <span className="ma-cta-arrow" aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </section>
        )}

        {props.showQuoteSection !== false && (
          <section className="ma-quote">
            <div className="ma-quote-portrait">
              <img src={quotePortrait} alt={quotePortraitAlt} loading="eager" decoding="async" />
              {quoteFrame && <img className="ma-quote-frame" src={quoteFrame} alt="" aria-hidden="true" />}
            </div>
            <div className="ma-quote-copy">
              <span className="ma-quote-eyebrow" dangerouslySetInnerHTML={richText(pageTitle, props)} />
              <span className="ma-quote-symbol" aria-hidden="true">“</span>
              <blockquote>
                <p dangerouslySetInnerHTML={richText(quote, props)} />
                <cite dangerouslySetInnerHTML={richText(quoteAuthor, props)} />
              </blockquote>
            </div>
          </section>
        )}

        {props.showEventCards !== false && events.length > 0 && (
          <section className="ma-events" aria-label={pageTitle}>
            {events.map((event, index) => (
              <article className={`ma-event ma-event-${index + 1}`} key={event.key}>
                <div className="ma-event-image">
                  <img src={event.image} alt={event.imageAlt} loading="lazy" decoding="async" />
                </div>
                <div className="ma-event-content glass-panel">
                  <span className="ma-event-number" aria-hidden="true">{`0${index + 1}`}</span>
                  {event.date && <time className="ma-event-date">{event.date}</time>}
                  <h2 dangerouslySetInnerHTML={richText(event.title, props)} />
                  <p dangerouslySetInnerHTML={richText(event.text, props)} />
                  <a className="ma-event-cta" href={event.href}>
                    <span dangerouslySetInnerHTML={richText(event.ctaText, props)} />
                    <span className="ma-cta-arrow" aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </section>
        )}

        {props.showArchiveSection !== false && (
          <section className="ma-archive glass-panel">
            <div className="ma-archive-copy">
              <h2 dangerouslySetInnerHTML={richText(archiveTitle, props)} />
              <p dangerouslySetInnerHTML={richText(archiveText, props)} />
            </div>
            <span className="ma-archive-line" aria-hidden="true" />
          </section>
        )}
      </div>
    </section>
  );
}

export default MashAkademi2;
