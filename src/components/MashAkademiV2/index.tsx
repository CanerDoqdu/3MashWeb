import { academyEvent1Image, academyEvent2Image, academyIntroImage } from "./source-assets";
import { Props } from "./types";
import { tLocalized } from "../../utils/i18n";
import { safeNavigationHref } from "../../utils/safeRedirect";
import { sanitizeHtml } from "../../utils/sanitizeHtml";

function value(input: string | undefined, fallback: string) {
  const trimmed = input?.trim();
  return trimmed || fallback;
}

function localizedValue(
  trInput: string | undefined,
  enInput: string | undefined,
  fallbackTr: string,
  fallbackEn: string
) {
  return tLocalized(value(trInput, fallbackTr), value(enInput, fallbackEn));
}

function href(input: string | undefined, fallback = "#") {
  return safeNavigationHref(input, fallback);
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
    .map((part) => sanitizeHtml(styledHtml(part.trim(), props)))
    .filter(Boolean);
}

export function MashAkademiV2(props: Props) {
  const sourceDescription = tLocalized(
    "Çalıştığımız sektörlerde özellikle dental alanda öncü isimlerle genç ve değişime açık profesyonelleri buluşturarak bilgi paylaşımını teşvik etmeyi amaçlamaktadır. Amacımız, sektördeki son gelişmeleri yakından takip ederek bu bilgileri paydaşlarımıza aktarmak ve birlikte öğrenerek büyüdüğümüz bir ekosistem oluşturmaktır.<br><br>Mash Academy, sektörün önde gelen isimleriyle işbirliği yaparak eğitimler, seminerler ve etkinlikler düzenlemekte ve katılımcılarını sektördeki en güncel bilgilerle buluşturmaktadır. Ayrıca, genç yeteneklere yönelik mentorluk programları ve uzmanlık eğitimleri ile sektöre yeni katılanları desteklemekteyiz.<br><br>Biz, bilgiyi paylaşmanın ve birlikte öğrenmenin gücüne inanıyoruz. Mash Academy olarak, sektördeki değişimi takip etmek ve bu değişime ayak uydurmak isteyen herkesi bir araya getirerek sektörün gelişimine katkıda bulunmaya davet ediyoruz.<br><br>Siz de bizimle birlikte, bilgiyi paylaşarak ve birlikte öğrenerek sektördeki gelişmelere yön vermek isterseniz, etkinliklerimize katılarak bu heyecanlı yolculuğa ortak olabilirsiniz. Haydi, geleceği birlikte şekillendirelim!",
    "It aims to encourage knowledge sharing by bringing together leading names and young, forward-thinking professionals in the industries we operate in, especially in dentistry. Our goal is to closely follow the latest developments in the sector, pass this knowledge on to our stakeholders, and create an ecosystem where we grow and learn together.<br><br>Mash Academy collaborates with prominent industry figures to organize trainings, seminars, and events, connecting participants with the latest knowledge in the field. Additionally, we support newcomers to the sector through mentorship programs and specialized training for young talents.<br><br>We believe in the power of sharing knowledge and learning together. As Mash Academy, we invite everyone who wants to follow and adapt to industry changes to come together and contribute to the sector's development.<br><br>If you would like to join us in shaping industry developments by sharing knowledge and learning together, you can be part of this exciting journey by attending our events. Let's shape the future together!"
  );

  const sourcePastText =
    tLocalized("Geçmiş etkinliklerimiz arasında sektörde deneyimli isimlerin katıldığı paneller, uzmanlık seminerleri ve interaktif atölye çalışmaları bulunmaktadır. Ayrıca, yeni teknolojiler ve tedavi yöntemlerinin ele alındığı konferanslar düzenlemekteyiz. Bu etkinlikler sayesinde katılımcılarımız, sektördeki gelişmeleri yakından takip etmenin yanı sıra deneyimlerini paylaşarak birbirlerinden öğrenme fırsatı bulmaktadır.", "Our past events include panels featuring experienced names in the industry, expert seminars, and interactive workshops. We also organize conferences covering new technologies and treatment methods. Through these events, our participants get the chance to closely follow developments in the industry as well as learn from each other by sharing their experiences.");

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
    "--tma-heading": headingColor,
    "--tma-card-title": themeColor(props.cardTitleColor, "#0E0E0C", "--tm-theme-text", ["#1f2933"]),
    "--tma-word-color": cssColor(props.styledPhraseColor, accentColor),
    "--tma-max": `${numberInRange(props.maxContentWidth, 1280, 720, 1800)}px`,
    "--tma-event-gap": `${numberInRange(props.eventCardsGap, 24, 8, 80)}px`,
    "--tma-word-weight": props.styledPhraseBold === false ? "inherit" : "700",
    "--tma-word-style": props.styledPhraseItalic ? "italic" : "inherit",
  } as any;

  const pageTitle = localizedValue(props.eyebrowText, props.eyebrowTextEn, "Mash Academy", "Mash Academy");
  const quote = localizedValue(
    props.titleText,
    props.titleTextEn,
    "Eğitimdir ki bir milleti ya hür bağımsız şanlı yüce bir toplum olarak yaşatır veya bir milleti esaret ve sefalete terk eder.",
    "It is education that lifts a nation to a free, independent, glorious and elevated society, or abandons a nation to captivity and misery."
  );
  const quoteAuthor = localizedValue(props.quoteAuthorText, undefined, "M. Kemal Atatürk", "M. Kemal Atatürk");
  const introTitle = localizedValue(
    props.introTitleText,
    props.introTitleTextEn,
    "Bilgiyle büyüyen ekosistem.",
    "An ecosystem powered by knowledge."
  );
  const description = localizedValue(props.descriptionHtml, props.descriptionHtmlEn, sourceDescription, sourceDescription);
  const pastTitle = localizedValue(props.card3Title, props.card3TitleEn, "Geçmiş Etkinlikler", "Past Events");
  const pastText = localizedValue(props.card3Text, props.card3TextEn, sourcePastText, sourcePastText);
  const readMoreText = localizedValue(props.primaryButtonText, props.primaryButtonTextEn, "Devamını Oku", "Read More");
  const event1FallbackTitle = "Blender for Dental ile IBAR Üzeri Composite Kron Tasarım Eğitimi Raporu";
  const event1FallbackTitleEn = "Composite Crown Design Over IBAR with Blender for Dental Training Report";
  const event1Title = localizedValue(props.card1Title, props.card1TitleEn, event1FallbackTitle, event1FallbackTitleEn);
  const event1Text = localizedValue(
    props.card1Text,
    props.card1TextEn,
    "''Blender for Dental ile IBAR Üzeri Composite Kron Tasarım Eğitimi\" webinarında, dijital diş hekimliği alanında yenilikçi yaklaşımlar ve IBAR destekli hibrit protez tasarımı ele alınmıştır.",
    "In the webinar \"Composite Crown Design Over IBAR with Blender for Dental,\" innovative approaches in digital dentistry and IBAR-supported hybrid prosthesis design were discussed."
  );
  const event2FallbackTitle = "IBAR Tasarımı Eğitimi";
  const event2FallbackTitleEn = "IBAR Design Training";
  const event2Title = localizedValue(props.card2Title, props.card2TitleEn, event2FallbackTitle, event2FallbackTitleEn);
  const event2Text = localizedValue(
    props.card2Text,
    props.card2TextEn,
    "Eğitim Mash Academy tarafından, 23 Mart 2024 tarihinde Antalya'da organize edilmiştir. Eğitimcilerimizden Vahit Topçu \"Hibrit Protez Tasarımı\" ve Alihan Şahbaz \"IBAR Tasarımı\" eğitimi ile katılımcılara tecrübelerini aktarmıştır. Eğitimin sonunda 3D printer kullanımındaki sık karşılaşılan hatalar ve püf noktalara değinilmiştir.",
    "The training was organized by Mash Academy in Antalya on March 23, 2024. Our instructors Vahit Topçu, with the \"Hybrid Denture Design\" training, and Alihan Şahbaz, with the \"IBAR Design\" training, shared their experience with participants. At the end of the training, common mistakes and tips in 3D printer use were covered."
  );
  const event3Title = localizedValue(props.event3Title, props.event3TitleEn, "Mash Academy Etkinliği", "Mash Academy Event");
  const event3Text = localizedValue(
    props.event3Text,
    props.event3TextEn,
    "Mash Academy etkinliğinde ele alınan konular ve katılımcılara sunulan deneyim hakkında bilgi.",
    "Information about a Mash Academy event."
  );
  const event4Title = localizedValue(props.event4Title, props.event4TitleEn, "Mash Academy Etkinliği", "Mash Academy Event");
  const event4Text = localizedValue(
    props.event4Text,
    props.event4TextEn,
    "Mash Academy etkinliğinde ele alınan konular ve katılımcılara sunulan deneyim hakkında bilgi.",
    "Information about a Mash Academy event."
  );
  const event3Image = imageUrl(props.event3ImageUrl, "");
  const event3Href = safeNavigationHref(props.event3Href, "");
  const event4Image = imageUrl(props.event4ImageUrl, "");
  const event4Href = safeNavigationHref(props.event4Href, "");

  const events = [
    ...(props.showEvent1 !== false
      ? [
          {
            key: "event1",
            image: imageUrl(props.event1ImageUrl, academyEvent1Image),
            imageAlt: localizedValue(props.event1ImageAlt, props.event1ImageAltEn, event1Title, event1Title),
            date: localizedValue(props.event1Date, props.event1DateEn, "Apr 2, 2025", "Apr 2, 2025"),
            title: event1Title,
            text: event1Text,
            href: href(
              props.primaryButtonHref,
              "/blog/blender-for-dental-ile-ibar-uzeri-composite-kron-tasarim-egitimi-raporu"
            ),
            buttonText: localizedValue(props.primaryButtonText, props.primaryButtonTextEn, "Devamını Oku", "Read More"),
          },
        ]
      : []),
    ...(props.showEvent2 !== false
      ? [
          {
            key: "event2",
            image: imageUrl(props.event2ImageUrl, academyEvent2Image),
            imageAlt: localizedValue(props.event2ImageAlt, props.event2ImageAltEn, event2Title, event2Title),
            date: localizedValue(props.event2Date, props.event2DateEn, "Apr 5, 2024", "Apr 5, 2024"),
            title: event2Title,
            text: event2Text,
            href: href(props.secondaryButtonHref, "/blog/ibar-tasarimi-egitimi"),
            buttonText: localizedValue(props.secondaryButtonText, props.secondaryButtonTextEn, "Devamını Oku", "Read More"),
          },
        ]
      : []),
    ...(props.showEvent3 === true && event3Image && event3Href
      ? [
          {
            key: "event3",
            image: event3Image,
            imageAlt: localizedValue(props.event3ImageAlt, props.event3ImageAltEn, event3Title, event3Title),
            date: props.event3Date?.trim() ?? "",
            title: event3Title,
            text: event3Text,
            href: event3Href,
            buttonText: readMoreText,
          },
        ]
      : []),
    ...(props.showEvent4 === true && event4Image && event4Href
      ? [
          {
            key: "event4",
            image: event4Image,
            imageAlt: localizedValue(props.event4ImageAlt, props.event4ImageAltEn, event4Title, event4Title),
            date: props.event4Date?.trim() ?? "",
            title: event4Title,
            text: event4Text,
            href: event4Href,
            buttonText: readMoreText,
          },
        ]
      : []),
  ];

  const descriptionParts = htmlParts(description, props);
  return (
    <section className="three-mash-academy-page-v2" style={style}>
      <div className="tma-shell">
        {props.showIntroSection !== false && (
          <>
            <section className={`tma-intro${props.showIntroImage === false ? " tma-intro-text-only" : ""}`}>
              {props.showIntroImage !== false && (
                <div className="tma-intro-media">
                  <img
                    src={imageUrl(props.introImageUrl, academyIntroImage)}
                    alt={localizedValue(props.introImageAlt, props.introImageAltEn, pageTitle, "Mash Academy")}
                    loading="eager"
                    decoding="async"
                  />
                </div>
              )}
              <div className="tma-hero-copy">
                <h1 dangerouslySetInnerHTML={richText(pageTitle, props)} />
                <h2 dangerouslySetInnerHTML={richText(introTitle, props)} />
                {props.showIntroImage === false && (
                  <div className="tma-description-flow">
                    {descriptionParts.map((part, index) => (
                      <p key={index} dangerouslySetInnerHTML={{ __html: part }} />
                    ))}
                  </div>
                )}
              </div>
              {props.showIntroImage !== false && <span className="tma-hero-index" aria-hidden="true" />}
            </section>
            {props.showIntroImage !== false && (
              <section className="tma-intro-copy">
                <div className="tma-copy-marker" aria-hidden="true" />
                <div className="tma-description-flow">
                  {descriptionParts.map((part, index) => (
                    <p key={index} dangerouslySetInnerHTML={{ __html: part }} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {props.showQuoteSection !== false && (
          <section className="tma-quote-section">
            <span className="tma-quote-mark" aria-hidden="true">“</span>
            <blockquote>
              <p dangerouslySetInnerHTML={richText(quote, props)} />
              <cite dangerouslySetInnerHTML={richText(quoteAuthor, props)} />
            </blockquote>
          </section>
        )}

        {props.showEventCards !== false && events.length > 0 && (
          <section className={`tma-events${events.length === 1 ? " tma-events-single" : ""}`} id="tma-events">
            {events.map((event, index) => (
              <article className={`tma-card${index === 0 ? " tma-card-featured" : ""}`} key={event.key}>
                <a className="tma-card-image" href={event.href}>
                  <img src={event.image} alt={event.imageAlt} loading="lazy" decoding="async" />
                </a>
                <div className="tma-card-body">
                  {event.date && <span className="tma-card-date">{event.date}</span>}
                  <a className="tma-card-title" href={event.href} dangerouslySetInnerHTML={richText(event.title, props)} />
                  <p dangerouslySetInnerHTML={richText(event.text, props)} />
                  <a className="tma-read-more" href={event.href} dangerouslySetInnerHTML={richText(event.buttonText, props)} />
                </div>
              </article>
            ))}
          </section>
        )}

        {props.showPastSection !== false && (
          <section className="tma-past">
            <div className="tma-section-head">
              <h2 dangerouslySetInnerHTML={richText(pastTitle, props)} />
            </div>
            <p dangerouslySetInnerHTML={richText(pastText, props)} />
          </section>
        )}
      </div>
    </section>
  );
}

export default MashAkademiV2;
