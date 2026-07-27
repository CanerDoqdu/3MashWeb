import { academyEvent1Image, academyEvent2Image, academyIntroImage } from "./source-assets";
import { Props } from "./types";

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
  return { __html: styledHtml(inlineHtml(input, fallback), props) };
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

export function ThreeMashAcademyPage(props: Props) {
  const style = {
    "--tma-bg": cssColor(props.backgroundColor, "#ffffff"),
    "--tma-text": cssColor(props.textColor, "#111111"),
    "--tma-muted": cssColor(props.mutedTextColor, "#555555"),
    "--tma-panel": cssColor(props.panelColor, "#ffffff"),
    "--tma-accent": cssColor(props.accentColor, "#caff12"),
    "--tma-line": cssColor(props.lineColor, "#e8e8e8"),
    "--tma-quote": cssColor(props.quoteTextColor, "#070707"),
    "--tma-quote-author": cssColor(props.quoteAuthorColor, "#2b2b2b"),
    "--tma-heading": cssColor(props.headingColor, "#1f2933"),
    "--tma-intro-bg": cssColor(props.introBackgroundColor, "#ffffff"),
    "--tma-intro-text": cssColor(props.introTextColor, "#000000"),
    "--tma-card-title": cssColor(props.cardTitleColor, "#1f2933"),
    "--tma-event-date": cssColor(props.eventDateColor, "#777777"),
    "--tma-event-image-bg": cssColor(props.eventImageBackgroundColor, "#f7f7f7"),
    "--tma-read-more": cssColor(props.readMoreColor, "#32303d"),
    "--tma-word-color": cssColor(props.styledPhraseColor, cssColor(props.accentColor, "#caff12")),
    "--tma-max": `${numberInRange(props.maxContentWidth, 1280, 720, 1800)}px`,
    "--tma-quote-width": `${numberInRange(props.quoteWidthPercent, 50, 30, 100)}%`,
    "--tma-quote-min": `${numberInRange(props.quoteMinWidth, 520, 260, 900)}px`,
    "--tma-quote-padding": `${numberInRange(props.quotePadding, 30, 0, 96)}px`,
    "--tma-gap": `${numberInRange(props.sectionGap, 32, 0, 120)}px`,
    "--tma-intro-image-width": `${numberInRange(props.introImageWidthVw, 53, 20, 100)}vw`,
    "--tma-intro-image-max": `${numberInRange(props.introImageMaxWidth, 800, 240, 1400)}px`,
    "--tma-intro-image-min-height": `${numberInRange(props.introImageMinHeight, 0, 0, 720)}px`,
    "--tma-event-gap": `${numberInRange(props.eventCardsGap, 24, 8, 80)}px`,
    "--tma-event-ratio": value(props.eventImageRatio, "1 / 1"),
    "--tma-word-weight": props.styledPhraseBold === false ? "inherit" : "700",
    "--tma-word-style": props.styledPhraseItalic ? "italic" : "inherit",
  } as any;

  const events = [
    {
      title: props.card1Title,
      text: props.card1Text,
      href: props.primaryButtonHref,
      button: props.primaryButtonText,
      image: imageUrl(props.event1ImageUrl, academyEvent1Image),
      alt: props.event1ImageAlt,
      date: props.event1Date,
      fallbackTitle: "Blender for Dental ile IBAR Üzeri Composite Kron Tasarım Eğitimi Raporu",
      fallbackText: "''Blender for Dental ile IBAR Üzeri Composite Kron Tasarım Eğitimi\" webinarında, dijital diş hekimliği alanında yenilikçi yaklaşımlar ve IBAR destekli hibrit protez tasarımı ele alınmıştır.",
      fallbackHref: "/blog/blender-for-dental-ile-ibar-uzeri-composite-kron-tasarim-egitimi-raporu",
      fallbackDate: "Apr 2, 2025",
    },
    {
      title: props.card2Title,
      text: props.card2Text,
      href: props.secondaryButtonHref,
      button: props.secondaryButtonText,
      image: imageUrl(props.event2ImageUrl, academyEvent2Image),
      alt: props.event2ImageAlt,
      fallbackTitle: "IBAR Tasarımı Eğitimi",
      fallbackText: "Eğitim Mash Academy tarafından, 23 Mart 2024 tarihinde Antalya'da organize edilmiştir. Eğitimcilerimizden Vahit Topçu \"Hibrit Protez Tasarımı\" ve Alihan Şahbaz \"IBAR Tasarımı\" eğitimi ile katılımcılara tecrübelerini aktarmıştır. Eğitimin sonunda 3D printer kullanımındaki sık karşılaşılan hatalar ve püf noktalara değinilmiştir.",
      fallbackHref: "/blog/ibar-tasarimi-egitimi",
      fallbackDate: "Apr 5, 2024",
      date: props.event2Date,
    },
  ];

  return (
    <section className="three-mash-academy-page" style={style}>
      <div className="tma-wrap">
        <section className="tma-quote-section">
          <h1 dangerouslySetInnerHTML={richText(props.eyebrowText, props, "Mash Academy")} />
          <blockquote>
            <p dangerouslySetInnerHTML={richText(props.titleText, props, "\"Eğitimdir ki bir milleti ya hür bağımsız şanlı yüce bir toplum olarak yaşatır veya bir milleti esaret ve sefalete terk eder.\"")} />
            <cite dangerouslySetInnerHTML={richText(props.quoteAuthorText, props, "M. Kemal Atatürk")} />
          </blockquote>
        </section>

        <section className="tma-intro">
          {props.showIntroImage === false ? null : (
            <div className="tma-intro-media">
              <img src={imageUrl(props.introImageUrl, academyIntroImage)} alt={props.introImageAlt || ""} loading="eager" decoding="async" />
            </div>
          )}
          <div className="tma-intro-copy">
            <h2 dangerouslySetInnerHTML={richText(props.introTitleText, props, "Mash Academy,")} />
            <div
              className="tma-rich"
              dangerouslySetInnerHTML={richText(
                props.descriptionHtml,
                props,
                "Çalıştığımız sektörlerde özellikle dental alanda öncü isimlerle genç ve değişime açık profesyonelleri buluşturarak bilgi paylaşımını teşvik etmeyi amaçlamaktadır. Amacımız, sektördeki son gelişmeleri yakından takip ederek bu bilgileri paydaşlarımıza aktarmak ve birlikte öğrenerek büyüdüğümüz bir ekosistem oluşturmaktır.<br><br>Mash Academy, sektörün önde gelen isimleriyle işbirliği yaparak eğitimler, seminerler ve etkinlikler düzenlemekte ve katılımcılarını sektördeki en güncel bilgilerle buluşturmaktadır. Ayrıca, genç yeteneklere yönelik mentorluk programları ve uzmanlık eğitimleri ile sektöre yeni katılanları desteklemekteyiz.<br><br>Biz, bilgiyi paylaşmanın ve birlikte öğrenmenin gücüne inanıyoruz. Mash Academy olarak, sektördeki değişimi takip etmek ve bu değişime ayak uydurmak isteyen herkesi bir araya getirerek sektörün gelişimine katkıda bulunmaya davet ediyoruz.<br><br>Siz de bizimle birlikte, bilgiyi paylaşarak ve birlikte öğrenerek sektördeki gelişmelere yön vermek isterseniz, etkinliklerimize katılarak bu heyecanlı yolculuğa ortak olabilirsiniz. Haydi, geleceği birlikte şekillendirelim!"
              )}
            />
          </div>
        </section>

        {props.showPastSection === false ? null : (
          <section className="tma-past">
            <h2 dangerouslySetInnerHTML={richText(props.card3Title, props, "Geçmiş Etkinlikler")} />
            <div
              className="tma-rich tma-past-text"
              dangerouslySetInnerHTML={richText(
                props.card3Text,
                props,
                "Geçmiş etkinliklerimiz arasında sektörde deneyimli isimlerin katıldığı paneller, uzmanlık seminerleri ve interaktif atölye çalışmaları bulunmaktadır. Ayrıca, yeni teknolojiler ve tedavi yöntemlerinin ele alındığı konferanslar düzenlemekteyiz. Bu etkinlikler sayesinde katılımcılarımız, sektördeki gelişmeleri yakından takip etmenin yanı sıra deneyimlerini paylaşarak birbirlerinden öğrenme fırsatı bulmaktadır."
              )}
            />
          </section>
        )}

        {props.showEventCards === false ? null : (
          <section className="tma-events">
            {events.map((event, index) => (
              <article className="tma-card" key={index}>
                <a className="tma-card-image" href={href(event.href, event.fallbackHref)}>
                  <img src={event.image} alt={event.alt || ""} loading="lazy" decoding="async" />
                </a>
                <div className="tma-card-body">
                  <a className="tma-card-title" href={href(event.href, event.fallbackHref)} dangerouslySetInnerHTML={richText(event.title, props, event.fallbackTitle)} />
                  <span className="tma-card-date">{value(event.date, event.fallbackDate)}</span>
                  <p dangerouslySetInnerHTML={richText(event.text, props, event.fallbackText)} />
                  <a className="tma-read-more" href={href(event.href, event.fallbackHref)} dangerouslySetInnerHTML={richText(event.button, props, "Devamını Oku")} />
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </section>
  );
}

export default ThreeMashAcademyPage;
