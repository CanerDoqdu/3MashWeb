import { faqSections } from "../ThreeMashPageData/sourceData";
import { Props } from "./types";
import { t, tLocalized, tProp } from "../../utils/i18n";
import { sanitizeHtml } from "../../utils/sanitizeHtml";

function text(value: string | undefined, fallbackTr: string, fallbackEn?: string) {
  return tProp(value, fallbackTr, fallbackEn || fallbackTr);
}

function numberValue(value: number | undefined, fallback: number) {
  return typeof value === "number" ? value : fallback;
}

function propText(value: string | undefined, fallback: string) {
  return value?.trim() || fallback;
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

  // NOTE: Dynamic property access via template literals (e.g., `resinQuestion${index + 1}`) requires
  // type narrowing to 'any' because TypeScript cannot statically verify computed property names.
  return [
    {
      title: propText(props.resinSectionTitle, resin.title),
      questions: resin.questions.map((item, index) => ({
        question: propText(
          (props as any)[`resinQuestion${index + 1}`],
          item.question,
        ),
        answerHtml: propText(
          (props as any)[`resinAnswer${index + 1}`],
          item.answerHtml,
        ),
      })),
    },
    {
      title: propText(props.printerSectionTitle, printer.title),
      questions: printer.questions.map((item, index) => ({
        question: propText(
          (props as any)[`printerQuestion${index + 1}`],
          item.question,
        ),
        answerHtml: propText(
          (props as any)[`printerAnswer${index + 1}`],
          item.answerHtml,
        ),
      })),
    },
  ];
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
    "--tmfaq-accent": "var(--tm-theme-accent, #C7F136)",
    "--tmfaq-dark": "var(--tm-theme-dark, #0E0E0C)",
    "--tmfaq-max": `${numberValue(props.maxWidth, 1180)}px`,
  } as any; // CSS-in-JS: dynamic properties use CSS custom variable names
  const pageTitle = text(props.titleText, tLocalized("Sık Sorulan Sorular", "Frequently Asked Questions"), "Frequently Asked Questions");

  return (
    <section className="three-mash-faq-page" style={style}>
      <style dangerouslySetInnerHTML={{ __html: criticalFaqCss }} />
      <div className="tmfaq-shell">
        {props.showPageTitle !== false ? (
          <section className="tmfaq-hero">
            <span className="tmfaq-kicker">{t("sections.faq.indexText", "SSS")}</span>
            <div className="tmfaq-hero-grid">
              <h1>{pageTitle}</h1>
              <p>
                {tLocalized(
                  tLocalized("Dental üretim akışı, reçine kullanımı ve 3D yazıcı süreçlerinde en sık gelen soruları tek yerde topladık.", "We gathered the most frequent questions on dental manufacturing workflows, resin usage, and 3D printing in one place."),
                  "We gathered the most frequent questions on dental manufacturing workflows, resin usage, and 3D printing in one place."
                )}
              </p>
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
