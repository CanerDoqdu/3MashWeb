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

function pascal(value: string) {
  return value.charAt(0).toLocaleUpperCase("tr") + value.slice(1);
}

function productBasedApplies(props: Props) {
  return props.productBasedEnabled !== false;
}

const ARGENZ_PRODUCT_BASED_DEFAULTS: Record<string, unknown> = {
  productBasedTitleText: "Sıkça Sorulan Sorular",
  productBasedOpenFirstItem: true,
  productBasedFaq1Question: "ArgenZ ST Multilayer hangi uygulamalar için uygundur?",
  productBasedFaq1AnswerHtml:
    "<p>Anterior bölgede yüksek ışık geçirgenliği istenen kron ve köprü uygulamaları için uygundur. Tek kron veya 1 ara gövdeli 3 üyeli köprülere kadar kullanılabilir.</p>",
  productBasedFaq2Question: "Geçirgenlik ve dayanım değerleri nedir?",
  productBasedFaq2AnswerHtml:
    "<p>Kaynak ürün içeriğine göre ışık geçirgenliği <b>%50</b>, eğilme mukavemeti <b>850 MPa</b> ve itriyum mol yüzdesi <b>4Y</b> olarak verilir.</p>",
  productBasedFaq3Question: "Makyaj işlemi gerekir mi?",
  productBasedFaq3AnswerHtml:
    "<p>Ürün sayfasındaki açıklamaya göre makyaj gerektirmez; sadece glaze uygulayıp protezi bitime gönderebilirsiniz.</p>",
  productBasedFaq4Question: "Hangi renk seçenekleri vardır?",
  productBasedFaq4AnswerHtml:
    "<p>A1, A2, A3, A3.5, A4, B1, B2, B3, B4, C1, C2, C3, C4, D2, D3, D4 ve OM1, OM2, OM3 renk seçenekleri bulunur.</p>",
  productBasedFaq5Question: "Hangi kalınlık seçenekleri vardır?",
  productBasedFaq5AnswerHtml: "<p>Kaynak üründe 14 mm, 16 mm, 18 mm ve 20 mm kalınlık seçenekleri yer alır.</p>",
};

function filled(value: unknown) {
  return typeof value === "string" ? value.trim() !== "" : value !== undefined && value !== null;
}

function productBasedProps(props: Props): Props {
  if (!productBasedApplies(props)) return props;

  return new Proxy(props as Record<string, unknown>, {
    get(target, prop) {
      if (typeof prop !== "string") return Reflect.get(target, prop);
      if (prop.startsWith("productBased")) return target[prop];
      const productBasedName = `productBased${pascal(prop)}`;
      const productBasedValue = target[productBasedName];
      if (filled(productBasedValue)) return productBasedValue;
      if (filled(ARGENZ_PRODUCT_BASED_DEFAULTS[productBasedName])) return ARGENZ_PRODUCT_BASED_DEFAULTS[productBasedName];
      return target[prop];
    },
  }) as Props;
}

function numberValue(value: unknown, fallback: number, min?: number, max?: number) {
  const next = Number(value);
  if (!Number.isFinite(next)) return fallback;
  return Math.min(max ?? next, Math.max(min ?? next, next));
}

function cssLength(value: unknown, fallback: number) {
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
  const viewProps = productBasedProps(props);
  const items = faqItems(viewProps);
  const [openItems, setOpenItems] = useState<Record<number, boolean>>(() =>
    viewProps.openFirstItem === false ? ({} as Record<number, boolean>) : { 0: true }
  );

  const style = {
    "--tmpaf-bg": text(viewProps.backgroundColor, "#ffffff"),
    "--tmpaf-title": text(viewProps.titleColor, "#050505"),
    "--tmpaf-row-bg": text(viewProps.rowBackgroundColor, "#f5f5f5"),
    "--tmpaf-row-open-bg": text(viewProps.rowOpenBackgroundColor, "#f5f5f5"),
    "--tmpaf-question": text(viewProps.questionColor, "#050505"),
    "--tmpaf-answer": text(viewProps.answerColor, "#171717"),
    "--tmpaf-icon": text(viewProps.iconColor, "#050505"),
    "--tmpaf-icon-bg": text(viewProps.iconBackgroundColor, "transparent"),
    "--tmpaf-line": text(viewProps.lineColor, "transparent"),
    "--tmpaf-max": cssLength(viewProps.maxWidth, 1240),
    "--tmpaf-list-max": cssLength(viewProps.listMaxWidth, 720),
    "--tmpaf-pt": cssLength(viewProps.paddingTop, 78),
    "--tmpaf-pb": cssLength(viewProps.paddingBottom, 78),
    "--tmpaf-title-gap": cssLength(viewProps.titleSpacing, 32),
    "--tmpaf-row-gap": cssLength(viewProps.rowGap, 16),
    "--tmpaf-row-py": cssLength(viewProps.rowPaddingY, 12),
    "--tmpaf-row-px": cssLength(viewProps.rowPaddingX, 18),
    "--tmpaf-radius": cssLength(viewProps.rowBorderRadius, 999),
    "--tmpaf-answer-pt": cssLength(viewProps.answerPaddingTop, 10),
    "--tmpaf-answer-pb": cssLength(viewProps.answerPaddingBottom, 18),
    "--tmpaf-title-size": cssLength(viewProps.titleFontSize, 30),
    "--tmpaf-question-size": cssLength(viewProps.questionFontSize, 16),
    "--tmpaf-answer-size": cssLength(viewProps.answerFontSize, 15),
  } as any;

  function toggle(index: number) {
    setOpenItems((current) => {
      const nextOpen = !current[index];
      if (viewProps.allowMultipleOpen) return { ...current, [index]: nextOpen };
      return nextOpen ? { [index]: true } : {};
    });
  }

  return (
    <section id={text(viewProps.sectionAnchorId) || undefined} className="three-mash-product-accordion-faq" style={style}>
      <div className="tmpaf-wrap">
        <div className="tmpaf-head">
          <h2>{text(viewProps.titleText, "Sıkça Sorulan Sorular")}</h2>
          {viewProps.showDescription && text(viewProps.descriptionHtml) ? (
            <div className="tmpaf-description" dangerouslySetInnerHTML={html(viewProps.descriptionHtml)} />
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
          <div className="tmpaf-placeholder">{text(viewProps.placeholderText, "FAQ satırı ekleyin")}</div>
        )}
      </div>
    </section>
  );
}

export default ThreeMashProductAccordionFaq;
