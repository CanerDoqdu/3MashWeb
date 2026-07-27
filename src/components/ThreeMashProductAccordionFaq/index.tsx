import { useState } from "preact/hooks";
import { Props } from "./types";

type FaqItem = {
  question: string;
  answerHtml: string;
};

function propString(value: unknown) {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (!value || typeof value !== "object") return "";

  const data = value as Record<string, unknown>;
  const candidates = [data.value, data.html, data.text, data.title, data.name, data.content];
  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) return candidate;
  }
  return "";
}

function text(value: unknown, fallback = "") {
  const trimmed = propString(value).trim();
  return trimmed || fallback;
}

function html(value: unknown) {
  return { __html: propString(value) };
}

function numberValue(value: number | undefined, fallback: number, min?: number, max?: number) {
  const next = Number(value);
  if (!Number.isFinite(next)) return fallback;
  return Math.min(max ?? next, Math.max(min ?? next, next));
}

function cssLength(value: number | undefined, fallback: number) {
  return `${numberValue(value, fallback)}px`;
}

function parseExtraItems(value: unknown): FaqItem[] {
  const source = propString(value);
  if (!source) return [];

  try {
    const parsed = JSON.parse(source);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        const data = item as Record<string, unknown>;
        const question = text(data.question || data.soru || data.title || data.baslik);
        const answerHtml = text(data.answerHtml || data.answer || data.cevapHtml || data.cevap || data.html || data.text);
        return question ? { question, answerHtml } : null;
      })
      .filter(Boolean) as FaqItem[];
  } catch {
    return [];
  }
}

function faqItems(props: Props) {
  const builtIn = Array.from({ length: 12 }, (_, index) => {
    const number = index + 1;
    const data = props as unknown as Record<string, unknown>;
    const question = text(data[`faq${number}Question`]);
    const answerHtml = text(data[`faq${number}AnswerHtml`]);
    return question ? { question, answerHtml } : null;
  }).filter(Boolean) as FaqItem[];

  return [...builtIn, ...parseExtraItems(props.extraFaqItemsJson)];
}

export function ThreeMashProductAccordionFaq(props: Props) {
  const items = faqItems(props);
  const [openItems, setOpenItems] = useState<Record<number, boolean>>(() =>
    props.openFirstItem === false ? ({} as Record<number, boolean>) : { 0: true }
  );

  const style = {
    "--tmpaf-bg": text(props.backgroundColor, "#ffffff"),
    "--tmpaf-title": text(props.titleColor, "#050505"),
    "--tmpaf-row-bg": text(props.rowBackgroundColor, "#f5f5f5"),
    "--tmpaf-row-open-bg": text(props.rowOpenBackgroundColor, "#f5f5f5"),
    "--tmpaf-question": text(props.questionColor, "#050505"),
    "--tmpaf-answer": text(props.answerColor, "#171717"),
    "--tmpaf-icon": text(props.iconColor, "#050505"),
    "--tmpaf-icon-bg": text(props.iconBackgroundColor, "transparent"),
    "--tmpaf-line": text(props.lineColor, "transparent"),
    "--tmpaf-max": cssLength(props.maxWidth, 1240),
    "--tmpaf-list-max": cssLength(props.listMaxWidth, 720),
    "--tmpaf-pt": cssLength(props.paddingTop, 78),
    "--tmpaf-pb": cssLength(props.paddingBottom, 78),
    "--tmpaf-title-gap": cssLength(props.titleSpacing, 32),
    "--tmpaf-row-gap": cssLength(props.rowGap, 16),
    "--tmpaf-row-py": cssLength(props.rowPaddingY, 12),
    "--tmpaf-row-px": cssLength(props.rowPaddingX, 18),
    "--tmpaf-radius": cssLength(props.rowBorderRadius, 999),
    "--tmpaf-answer-pt": cssLength(props.answerPaddingTop, 10),
    "--tmpaf-answer-pb": cssLength(props.answerPaddingBottom, 18),
    "--tmpaf-title-size": cssLength(props.titleFontSize, 30),
    "--tmpaf-question-size": cssLength(props.questionFontSize, 16),
    "--tmpaf-answer-size": cssLength(props.answerFontSize, 15),
  } as any;

  function toggle(index: number) {
    setOpenItems((current) => {
      const nextOpen = !current[index];
      if (props.allowMultipleOpen) return { ...current, [index]: nextOpen };
      return nextOpen ? { [index]: true } : {};
    });
  }

  return (
    <section id={text(props.sectionAnchorId) || undefined} className="three-mash-product-accordion-faq" style={style}>
      <div className="tmpaf-wrap">
        <div className="tmpaf-head">
          <h2>{text(props.titleText, "Sıkça Sorulan Sorular")}</h2>
          {props.showDescription && text(props.descriptionHtml) ? (
            <div className="tmpaf-description" dangerouslySetInnerHTML={html(props.descriptionHtml)} />
          ) : null}
        </div>

        {items.length ? (
          <div className="tmpaf-list">
            {items.map((item, index) => {
              const isOpen = !!openItems[index];
              const panelId = `tmpaf-panel-${index}`;
              return (
                <article className={`tmpaf-item${isOpen ? " is-open" : ""}`} key={`${item.question}-${index}`}>
                  <button
                    type="button"
                    className="tmpaf-trigger"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(index)}
                  >
                    <span className="tmpaf-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path d="m9 6 6 6-6 6" />
                      </svg>
                    </span>
                    <span>{item.question}</span>
                  </button>
                  <div id={panelId} className="tmpaf-panel" hidden={!isOpen}>
                    {item.answerHtml ? (
                      <div className="tmpaf-answer" dangerouslySetInnerHTML={{ __html: item.answerHtml }} />
                    ) : (
                      <div className="tmpaf-answer tmpaf-empty">Cevap metni ekleyin.</div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="tmpaf-placeholder">{text(props.placeholderText, "FAQ satırı ekleyin")}</div>
        )}
      </div>
    </section>
  );
}

export default ThreeMashProductAccordionFaq;
