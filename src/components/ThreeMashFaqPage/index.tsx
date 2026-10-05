import { faqSections } from "../ThreeMashPageData/sourceData";
import { Props } from "./types";
import { isEnglishLocale, tLocalized } from "../../utils/i18n";
import { sanitizeHtml } from "../../utils/sanitizeHtml";

function numberValue(value: number | undefined, fallback: number) {
  return typeof value === "number" ? value : fallback;
}

function localizedText(value: string | undefined, valueEn: string | undefined, fallback: string) {
  const localizedValue = isEnglishLocale() ? valueEn : value;
  return localizedValue?.trim() || fallback;
}

const criticalFaqCss = `
.three-mash-faq-page {
  width: 100%;
  overflow-x: hidden;
  background: var(--tmfaq-bg, var(--tm-theme-bg, #fafaf7));
  color: var(--tmfaq-text, var(--tm-theme-text, #0e0e0c));
  font-family: var(--tm-theme-font-body, "Inter", system-ui, sans-serif);
}
.three-mash-faq-page, .three-mash-faq-page * { box-sizing: border-box; }
.tmfaq-shell {
  width: 100%;
  max-width: min(var(--tmfaq-max, 1180px), 1180px);
  margin: 0 auto;
  padding: 42px 24px 62px;
}
.tmfaq-hero h1, .tmfaq-section h2 {
  margin: 0;
  color: var(--tmfaq-text, var(--tm-theme-text, #0e0e0c));
  font-family: var(--tm-theme-font-heading, "Space Grotesk", "Inter", sans-serif);
  font-weight: 800;
  letter-spacing: 0;
}
.tmfaq-section h2 { font-size: 32px; line-height: 1; }
.tmfaq-list { display: grid; grid-template-columns: minmax(0, 1fr); gap: 12px; }
.tmfaq-item {
  overflow: hidden;
  border: 1px solid var(--tmfaq-line, var(--tm-theme-line, #e6e6e0));
  background: #fff;
}
.tmfaq-item summary {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 34px;
  gap: 16px;
  align-items: center;
  min-height: 68px;
  padding: 18px 20px;
  color: var(--tmfaq-text, var(--tm-theme-text, #0e0e0c));
  cursor: pointer;
  list-style: none;
}
.tmfaq-item summary span {
  min-width: 0;
  font-family: var(--tm-theme-font-heading, "Space Grotesk", "Inter", sans-serif);
  font-size: 17px;
  font-weight: 800;
  line-height: 1.22;
  overflow-wrap: anywhere;
}
`;

function themeColor(
  input: string | undefined,
  fallback: string,
  token: string,
  legacyDefaults: string[] = [],
) {
  const trimmed = input?.trim();
  const normalized = trimmed?.toLowerCase();
  const defaults = [fallback, ...legacyDefaults].map((item) =>
    item.toLowerCase(),
  );

  if (!trimmed || (normalized && defaults.includes(normalized))) {
    return `var(${token}, ${fallback})`;
  }

  return trimmed;
}

function sectionsFromProps(props: Props) {
  const resin = faqSections[0];
  const printer = faqSections[1];
  const resinOverrides = [
    { question: props.resinQuestion1, questionEn: props.resinQuestion1En, answer: props.resinAnswer1, answerEn: props.resinAnswer1En },
    { question: props.resinQuestion2, questionEn: props.resinQuestion2En, answer: props.resinAnswer2, answerEn: props.resinAnswer2En },
    { question: props.resinQuestion3, questionEn: props.resinQuestion3En, answer: props.resinAnswer3, answerEn: props.resinAnswer3En },
    { question: props.resinQuestion4, questionEn: props.resinQuestion4En, answer: props.resinAnswer4, answerEn: props.resinAnswer4En },
    { question: props.resinQuestion5, questionEn: props.resinQuestion5En, answer: props.resinAnswer5, answerEn: props.resinAnswer5En },
    { question: props.resinQuestion6, questionEn: props.resinQuestion6En, answer: props.resinAnswer6, answerEn: props.resinAnswer6En },
    { question: props.resinQuestion7, questionEn: props.resinQuestion7En, answer: props.resinAnswer7, answerEn: props.resinAnswer7En },
    { question: props.resinQuestion8, questionEn: props.resinQuestion8En, answer: props.resinAnswer8, answerEn: props.resinAnswer8En },
    { question: props.resinQuestion9, questionEn: props.resinQuestion9En, answer: props.resinAnswer9, answerEn: props.resinAnswer9En },
    { question: props.resinQuestion10, questionEn: props.resinQuestion10En, answer: props.resinAnswer10, answerEn: props.resinAnswer10En },
  ];
  const printerOverrides = [
    { question: props.printerQuestion1, questionEn: props.printerQuestion1En, answer: props.printerAnswer1, answerEn: props.printerAnswer1En },
    { question: props.printerQuestion2, questionEn: props.printerQuestion2En, answer: props.printerAnswer2, answerEn: props.printerAnswer2En },
    { question: props.printerQuestion3, questionEn: props.printerQuestion3En, answer: props.printerAnswer3, answerEn: props.printerAnswer3En },
  ];
  const sections = [
    {
      title: localizedText(props.resinSectionTitle, props.resinSectionTitleEn, resin.title),
      questions: resin.questions.map((item, index) => ({
        question: localizedText(resinOverrides[index].question, resinOverrides[index].questionEn, item.question),
        answerHtml: localizedText(resinOverrides[index].answer, resinOverrides[index].answerEn, item.answerHtml),
      })),
    },
    {
      title: localizedText(props.printerSectionTitle, props.printerSectionTitleEn, printer.title),
      questions: printer.questions.map((item, index) => ({
        question: localizedText(printerOverrides[index].question, printerOverrides[index].questionEn, item.question),
        answerHtml: localizedText(printerOverrides[index].answer, printerOverrides[index].answerEn, item.answerHtml),
      })),
    },
  ];

  if (props.showExtraResinFaq === true) {
    const question = localizedText(props.resinQuestion11, props.resinQuestion11En, tLocalized("Yeni reçine sorusu", "New resin question"));
    const answerHtml = localizedText(props.resinAnswer11, props.resinAnswer11En, tLocalized("<p>Yanıtınızı buraya yazın.</p>", "<p>Enter the answer here.</p>"));
    if (question.trim() && answerHtml.trim()) sections[0].questions.push({ question, answerHtml });
  }

  if (props.showExtraPrinterFaq === true) {
    const question = localizedText(props.printerQuestion4, props.printerQuestion4En, tLocalized("Yeni yazıcı sorusu", "New printer question"));
    const answerHtml = localizedText(props.printerAnswer4, props.printerAnswer4En, tLocalized("<p>Yanıtınızı buraya yazın.</p>", "<p>Enter the answer here.</p>"));
    if (question.trim() && answerHtml.trim()) sections[1].questions.push({ question, answerHtml });
  }

  return sections.filter((section, index) => index === 0
    ? props.showResinFaq !== false
    : props.showPrinterFaq !== false);
}

export function ThreeMashFaqPage(props: Props) {
  const sections = sectionsFromProps(props);
  const style = {
    "--tmfaq-bg": themeColor(
      props.backgroundColor,
      "#FAFAF7",
      "--tm-theme-bg",
      ["#ffffff", "#fff"],
    ),
    "--tmfaq-text": themeColor(props.textColor, "#0E0E0C", "--tm-theme-text", [
      "#101010",
      "#111111",
      "#000000",
    ]),
    "--tmfaq-muted": themeColor(
      props.mutedTextColor,
      "#55554e",
      "--tm-theme-sub",
      ["#6f6f6f", "#777777"],
    ),
    "--tmfaq-panel": themeColor(
      props.panelColor,
      "#F1F1EC",
      "--tm-theme-panel",
      ["#ebebeb", "#ffffff", "#fff"],
    ),
    "--tmfaq-line": themeColor(props.lineColor, "#E6E6E0", "--tm-theme-line", [
      "#e5e5e5",
    ]),
    "--tmfaq-accent": themeColor(
      props.accentColor,
      "#C7F136",
      "--tm-theme-accent",
    ),
    "--tmfaq-dark": themeColor(
      props.darkColor,
      "#0E0E0C",
      "--tm-theme-dark",
    ),
    "--tmfaq-max": `${numberValue(props.maxWidth, 1180)}px`,
  } as any; // CSS-in-JS: dynamic properties use CSS custom variable names
  const pageTitle = localizedText(
    props.titleText,
    props.titleTextEn,
    tLocalized("Sık Sorulan Sorular", "Frequently Asked Questions"),
  );
  const kickerText = localizedText(
    props.kickerText,
    props.kickerTextEn,
    tLocalized("SSS", "FAQ"),
  );
  const introText = localizedText(
    props.introText,
    props.introTextEn,
    tLocalized(
      "Dental üretim akışı, reçine kullanımı ve 3D yazıcı süreçlerinde en sık gelen soruları tek yerde topladık.",
      "We gathered the most frequent questions on dental manufacturing workflows, resin usage, and 3D printing.",
    ),
  );

  return (
    <section className="three-mash-faq-page" style={style}>
      <style dangerouslySetInnerHTML={{ __html: criticalFaqCss }} />
      <div className="tmfaq-shell">
        {props.showPageTitle !== false ? (
          <section className="tmfaq-hero">
            <span className="tmfaq-kicker">{kickerText}</span>
            <div className="tmfaq-hero-grid">
              <h1>{pageTitle}</h1>
              <p>{introText}</p>
            </div>
          </section>
        ) : null}

        {sections.map((section, sectionIndex) => (
          <section className="tmfaq-section" key={section.title}>
            <div className="tmfaq-section-head">
              <span className="tmfaq-section-code">
                {String(sectionIndex + 1).padStart(2, "0")}
              </span>
              <h2>{section.title}</h2>
            </div>
            <div className="tmfaq-list">
              {section.questions.map((item, itemIndex) => (
                <details
                  className="tmfaq-item"
                  key={`${sectionIndex}-${itemIndex}`}
                  open={sectionIndex === 0 && itemIndex === 0}
                >
                  <summary>
                    <span>{item.question}</span>
                    <b aria-hidden="true">+</b>
                  </summary>
                  <div
                    className="tmfaq-answer"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.answerHtml) }}
                  />
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

export default ThreeMashFaqPage;
