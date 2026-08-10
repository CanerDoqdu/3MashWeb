import { useState } from "preact/hooks";
import { Props } from "./types";
import { useSharedProductDetailData } from "../../sub-components/ThreeMashProductDetailData";
import { ProductDetailFaqSection, ProductDetailSectionScope } from "../../sub-components/ThreeMashProductDetailTemplate";

type FaqItem = {
  question: string;
  answerHtml: string;
};

const CRS_COMPOSITE_SLUG = "crs-composite-mukemmel-dayanimli-gecici-recinesi";
const CRS_MODEL_SLUG = "crs-model-yuksek-hassasiyetli-model-recinesi";
const CRS_TRAY_SLUG = "crs-tray-resin-olcu-kasigi-3d-yazici-recinesi";
const CRS_COMPOSITE_FAQ_ITEMS: FaqItem[] = [
  {
    question: "1 kg CRS Composite Reçinesi'nden kaç üye iş alabiliriz?",
    answerHtml: "<p>1000-1200 üye arasında iş alabilirsiniz.</p>",
  },
  {
    question: "CRS Composite reçinesinin kırılma direnci nedir?",
    answerHtml:
      "<p>Kompozit reçinesinin kırılma direnci, baskılar 3D Printer'dan çıkartılıp alkol ile yıkandıktan sonra <b>135-145 MPa</b> arasındadır. Baskı sonrası yapılan post kürleme işleminden sonra bu değer <b>150-155 MPa</b>'a kadar çıkmaktadır.</p>",
  },
  {
    question: "CRS Composite Reçinesi hasta ağzında tat veya koku bırakır mı?",
    answerHtml: "<p>CE Class IIA sertifikalı CRS Composite Reçinesi hasta ağzında tat ve koku bırakmaz.</p>",
  },
  {
    question: "CRS Composite Reçinesi'nin dirençli olması için tavsiye edilen tasarım parametreleri nelerdir?",
    answerHtml:
      "<p>Kompozit reçinesinin dirençli olması için tavsiye ettiğimiz en önemli parametre duvar kalınlığıdır. Tasarlanan işin duvar kalınlığının minimum <b>0,08 mm</b> olması gerekmektedir. Hasta ağzına yapılacak geçici işler 5 üyenin üzerinde ise 2 parça halinde gönderilmesi hasta ağzında oluşabilecek basıncı azaltacak ve dayanımı arttıracaktır. Full işlerde hasta ağzına uygulanacak geçicinin 3-4 üyelik parçalara bölünmesini tavsiye ederiz.</p>",
  },
  {
    question: "CRS Composite Reçinesi klinik uygulamalar için şırınga kompozitler ile uyumlu mudur?",
    answerHtml:
      "<p>Klinik uygulamalarında kullanılan şırınga kompozitler ile birebir uyumludur. Yapılan geçici işlerin üzerine şırınga kompozitler ile istenilen ekleme yapılabilir.</p>",
  },
];
const CRS_MODEL_FAQ_ITEMS: FaqItem[] = [
  {
    question: "1 kg CRS Model Reçinesi'nden kaç adet model basabiliriz?",
    answerHtml: "<p>40-50 arasında model basabilirsiniz.</p>",
  },
  {
    question: "İmplant kütüphaneleri CRS Model Reçinesi ile uyumlu mu?",
    answerHtml:
      "<p>İmplant kütüphaneleri tasarım programlarında yer almaktadır. Üreteceğiniz güdük veya analog modellerde kullandığınız 3D yazıcıya özel parametreler ile uyarlayabilirsiniz.</p>",
  },
  {
    question: "Güdüklü model üretimi için önerdiğiniz parametreler var mı?",
    answerHtml: "<p>Güdüklü model üretimi için parametrelerimiz hazırdır.</p>",
  },
];
const CRS_TRAY_FAQ_ITEMS: FaqItem[] = [
  {
    question: "CRS Tray Resin nedir?",
    answerHtml:
      "<p>CRS Tray Resin, kişiye özel dental ölçü kaşıklarının üretimi için kullanılan, DLP ve LCD 3D yazıcılarla uyumlu bir fotopolimer reçinedir.</p>",
  },
  {
    question: "CRS Tray Resin ne için kullanılır?",
    answerHtml: "<p>CRS Tray Resin, kron, köprü, protez ve ortodontik işlemlerde kullanılan ölçü kaşıklarının üretimi için kullanılır.</p>",
  },
  {
    question: "Hangi yazıcılarla uyumludur?",
    answerHtml: "<p>CRS Tray Resin, 385-405 nm dalga boyunda çalışan DLP ve LCD 3D yazıcılarla uyumludur.</p>",
  },
  {
    question: "Ağız içinde kullanılabilir mi?",
    answerHtml:
      "<p>CRS Tray Resin, doğrudan ağız içinde kullanılmaz; ölçü kaşığı üretimi için geliştirilmiştir ve tam kürlenmemiş hali intraoral kullanım için uygun değildir.</p>",
  },
  {
    question: "Baskı sonrası işlem gerekli mi?",
    answerHtml: "<p>Evet. Baskı sonrası parçalar izopropil alkol ile yıkanmalı ve UV ışık ile post-cure işlemi uygulanmalıdır.</p>",
  },
  {
    question: "Post-cure neden gereklidir?",
    answerHtml: "<p>Post-cure işlemi, reçinenin gerekli mekanik özellikleri kazanmasını ve artık monomerlerin azaltılmasını sağlar.</p>",
  },
  {
    question: "Hangi alanlarda tercih edilir?",
    answerHtml:
      "<p>CRS Tray Resin, implant, protez, ortodonti ve termoform uygulamalarında kullanılan ölçü kaşıklarının üretiminde tercih edilir.</p>",
  },
  {
    question: "Raf ömrü ne kadardır?",
    answerHtml: "<p>Açılmamış ürün, serin ve karanlık ortamda saklandığında yaklaşık 2 yıl raf ömrüne sahiptir.</p>",
  },
  {
    question: "Reçine baskıdan önce karıştırılmalı mı?",
    answerHtml: "<p>Evet. Homojen karışım sağlamak için baskı öncesinde şişe en az 1 dakika çalkalanmalıdır.</p>",
  },
];

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

function boolValue(value: unknown): boolean | undefined {
  if (typeof value === "boolean") return value;
  if (value && typeof value === "object") {
    const data = value as Record<string, unknown>;
    for (const candidate of [data.value, data.checked, data.enabled, data.selected]) {
      if (typeof candidate === "boolean") return candidate;
      if (typeof candidate === "string") {
        const parsed: boolean | undefined = boolValue(candidate);
        if (parsed !== undefined) return parsed;
      }
    }
  }

  const normalized = propString(value).trim().toLocaleLowerCase("tr");
  if (["false", "0", "no", "hayir", "hayır", "kapali", "kapalı", "off"].includes(normalized)) return false;
  if (["true", "1", "yes", "evet", "acik", "açık", "on"].includes(normalized)) return true;
  return undefined;
}

function html(value: unknown) {
  return { __html: propString(value) };
}

function slugify(value: string) {
  return value
    .toLocaleLowerCase("tr")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function collectProductStrings(value: unknown, output: string[] = []) {
  if (!value) return output;
  if (typeof value === "string" || typeof value === "number") {
    const raw = String(value).trim();
    if (raw) {
      output.push(raw.toLocaleLowerCase("tr"));
      output.push(slugify(raw));
    }
    return output;
  }
  if (Array.isArray(value)) {
    value.forEach((item) => collectProductStrings(item, output));
    return output;
  }
  if (typeof value === "object") {
    const data = value as Record<string, unknown>;
    for (const key of ["slug", "handle", "url", "path", "href", "name", "title", "id"]) collectProductStrings(data[key], output);
    for (const key of ["metadata", "product", "variant", "variants", "selectedVariant", "category", "categories", "brand"]) {
      collectProductStrings(data[key], output);
    }
  }
  return output;
}

function currentPageStrings() {
  const terms: string[] = [];
  if (typeof window !== "undefined") {
    terms.push(window.location.pathname, window.location.href);
    const nextSlug = (window as any).__NEXT_DATA__?.query?.slug;
    if (typeof nextSlug === "string") terms.push(nextSlug);
  }
  if (typeof document !== "undefined") {
    terms.push(document.title);
    document.querySelectorAll('link[rel="canonical"], meta[property="og:url"], meta[property="og:title"], meta[name="twitter:title"]').forEach((node) => {
      const value = node instanceof HTMLMetaElement ? node.content : node.getAttribute("href");
      if (value) terms.push(value);
    });
  }
  return terms;
}

function productPageTerms(product: unknown) {
  return Array.from(new Set([...collectProductStrings(product), ...currentPageStrings()].map(slugify))).filter((term) => term.length > 2);
}

function isCrsCompositeProduct(product: unknown) {
  const value = productPageTerms(product).join(" ");
  return value.includes(CRS_COMPOSITE_SLUG) || value.includes("crs-composite") || value.includes("custom-composite-resin");
}

function isCrsModelProduct(product: unknown) {
  const value = productPageTerms(product).join(" ");
  return value.includes(CRS_MODEL_SLUG) || value.includes("crs-model") || value.includes("custom-model-sand-resin");
}

function isCrsTrayProduct(product: unknown) {
  const value = productPageTerms(product).join(" ");
  return value.includes(CRS_TRAY_SLUG) || value.includes("crs-tray") || value.includes("tray-resin") || value.includes("olcu-kasigi");
}

function isResinProduct(product: unknown) {
  const terms = productPageTerms(product);
  if (!terms.length) return false;

  const value = terms.join(" ");
  const resinTerms = [
    "dental-3d-yazici-recineleri",
    "recine",
    "recinesi",
    "resin",
    "composite",
    "gingiva",
    "model",
    "denture",
    "aligner",
    "splint",
    "guide",
    "ibt",
    "cast",
    "tray",
    "flexit",
    "trial",
    "study",
    "clear",
  ];

  return resinTerms.some((term) => value.includes(term));
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
  if (isCrsCompositeProduct(props.product)) return CRS_COMPOSITE_FAQ_ITEMS;
  if (isCrsModelProduct(props.product)) return CRS_MODEL_FAQ_ITEMS;
  if (isCrsTrayProduct(props.product)) return CRS_TRAY_FAQ_ITEMS;

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
  const viewProps = props;
  const [openItems, setOpenItems] = useState<Record<number, boolean>>(() =>
    boolValue(viewProps.openFirstItem) === false ? ({} as Record<number, boolean>) : { 0: true }
  );
  const sourceData = useSharedProductDetailData(props.product, (props as Record<string, unknown>).productTemplateJson);
  if (sourceData) {
    return (
      <ProductDetailSectionScope data={sourceData}>
        <ProductDetailFaqSection data={sourceData} />
      </ProductDetailSectionScope>
    );
  }
  if (boolValue(props.sectionVisible) === false || !isResinProduct(props.product)) return null;
  const items = faqItems(viewProps);

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
      if (boolValue(viewProps.allowMultipleOpen) === true) return { ...current, [index]: nextOpen };
      return nextOpen ? { [index]: true } : {};
    });
  }

  return (
    <section id={text(viewProps.sectionAnchorId) || undefined} className="three-mash-product-accordion-faq" style={style}>
      <div className="tmpaf-wrap">
        <div className="tmpaf-head">
          <h2>{text(viewProps.titleText, "Sıkça Sorulan Sorular")}</h2>
          {boolValue(viewProps.showDescription) === true && text(viewProps.descriptionHtml) ? (
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
          <div className="tmpaf-placeholder">{text(viewProps.placeholderText, "SSS içeriği hazırlanıyor")}</div>
        )}
      </div>
    </section>
  );
}

export default ThreeMashProductAccordionFaq;
