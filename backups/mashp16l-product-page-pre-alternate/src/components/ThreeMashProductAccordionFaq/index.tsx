import { useState } from "preact/hooks";
import { Props } from "./types";
import { useSharedProductDetailData, resolveProductDetailData } from "../../sub-components/ThreeMashProductDetailData";
import { ProductDetailFaqSection, ProductDetailSectionScope, type ProductDetailTemplateData } from "../../sub-components/ThreeMashProductDetailTemplate";
import { makePlaceholderFaq } from "../../sub-components/ThreeMashProductSectionPlaceholder";
import { tLocalized, isEnglishLocale, isTurkishText, translateText } from "../../utils/i18n";
import { isStudioEnvironment } from "../../utils/isStudioEnvironment";

type FaqItem = {
  question: string;
  answerHtml: string;
};

function trimmedText(value: string | undefined): string {
  const trimmed = typeof value === "string" ? value.trim() : "";
  if (isEnglishLocale() && isTurkishText(trimmed)) return "";
  return trimmed;
}

function studioOverride(value: string | undefined, defaultValue: string): string | undefined {
  const trimmed = trimmedText(value);
  return trimmed && trimmed !== defaultValue ? translateText(trimmed) : undefined;
}

function overrideFaqData(baseData: ProductDetailTemplateData | null, props: Props): ProductDetailTemplateData | null {
  if (!baseData) return null;

  const currentFaq = baseData.faq;
  const defaults = [
    { q: "Buraya ürünle ilgili sık sorulan 1. soruyu yazın.", qe: "Add the first frequently asked question about this product here.", a: "Buraya 1. sorunun yanıtını yazın.", ae: "Add the answer to question 1 here." },
    { q: "Buraya ürünle ilgili sık sorulan 2. soruyu yazın.", qe: "Add the second frequently asked question about this product here.", a: "Buraya 2. sorunun yanıtını yazın.", ae: "Add the answer to question 2 here." },
    { q: "Buraya ürünle ilgili sık sorulan 3. soruyu yazın.", qe: "Add the third frequently asked question about this product here.", a: "Buraya 3. sorunun yanıtını yazın.", ae: "Add the answer to question 3 here." },
    { q: "Buraya ürünle ilgili sık sorulan 4. soruyu yazın.", qe: "Add the fourth frequently asked question about this product here.", a: "Buraya 4. sorunun yanıtını yazın.", ae: "Add the answer to question 4 here." },
    { q: "Buraya ürünle ilgili sık sorulan 5. soruyu yazın.", qe: "Add the fifth frequently asked question about this product here.", a: "Buraya 5. sorunun yanıtını yazın.", ae: "Add the answer to question 5 here." },
    { q: "Buraya ürünle ilgili sık sorulan 6. soruyu yazın.", qe: "Add the sixth frequently asked question about this product here.", a: "Buraya 6. sorunun yanıtını yazın.", ae: "Add the answer to question 6 here." },
    { q: "Buraya ürünle ilgili yeni 7. soruyu yazın.", qe: "Add a new seventh question about this product here.", a: "Buraya 7. sorunun yanıtını yazın.", ae: "Add the answer to question 7 here." },
    { q: "Buraya ürünle ilgili yeni 8. soruyu yazın.", qe: "Add a new eighth question about this product here.", a: "Buraya 8. sorunun yanıtını yazın.", ae: "Add the answer to question 8 here." },
  ];
  const inputs = [
    { q: props.faq1Question, qe: props.faq1QuestionEn, a: props.faq1AnswerHtml, ae: props.faq1AnswerHtmlEn, show: props.showFaqItem1 !== false },
    { q: props.faq2Question, qe: props.faq2QuestionEn, a: props.faq2AnswerHtml, ae: props.faq2AnswerHtmlEn, show: props.showFaqItem2 !== false },
    { q: props.faq3Question, qe: props.faq3QuestionEn, a: props.faq3AnswerHtml, ae: props.faq3AnswerHtmlEn, show: props.showFaqItem3 !== false },
    { q: props.faq4Question, qe: props.faq4QuestionEn, a: props.faq4AnswerHtml, ae: props.faq4AnswerHtmlEn, show: props.showFaqItem4 !== false },
    { q: props.faq5Question, qe: props.faq5QuestionEn, a: props.faq5AnswerHtml, ae: props.faq5AnswerHtmlEn, show: props.showFaqItem5 !== false },
    { q: props.faq6Question, qe: props.faq6QuestionEn, a: props.faq6AnswerHtml, ae: props.faq6AnswerHtmlEn, show: props.showFaqItem6 !== false },
  ];
  const items: FaqItem[] = [];

  inputs.forEach((input, index) => {
    if (!input.show) return;
    const defaultsForItem = defaults[index];
    const existingItem = currentFaq?.items[index];
    const question = studioOverride(isEnglishLocale() ? input.qe : input.q, isEnglishLocale() ? defaultsForItem.qe : defaultsForItem.q)
      || existingItem?.question
      || "";
    const answerHtml = studioOverride(isEnglishLocale() ? input.ae : input.a, isEnglishLocale() ? defaultsForItem.ae : defaultsForItem.a)
      || existingItem?.answerHtml
      || "";
    const hasOverride = Boolean(
      studioOverride(input.q, defaultsForItem.q)
      || studioOverride(input.qe, defaultsForItem.qe)
      || studioOverride(input.a, defaultsForItem.a)
      || studioOverride(input.ae, defaultsForItem.ae)
    );
    if (existingItem || (hasOverride && question && answerHtml)) items.push({ question, answerHtml });
  });

  items.push(...(currentFaq?.items.slice(6) ?? []));

  const extraInputs = [
    { q: props.faq7Question, qe: props.faq7QuestionEn, a: props.faq7AnswerHtml, ae: props.faq7AnswerHtmlEn, show: props.showFaqItem7 === true },
    { q: props.faq8Question, qe: props.faq8QuestionEn, a: props.faq8AnswerHtml, ae: props.faq8AnswerHtmlEn, show: props.showFaqItem8 === true },
  ];
  extraInputs.forEach((input, index) => {
    if (!input.show) return;
    const defaultsForItem = defaults[index + 6];
    const question = isEnglishLocale() ? trimmedText(input.qe) : trimmedText(input.q);
    const answerHtml = isEnglishLocale() ? trimmedText(input.ae) : trimmedText(input.a);
    const defaultQuestion = isEnglishLocale() ? defaultsForItem.qe : defaultsForItem.q;
    const defaultAnswer = isEnglishLocale() ? defaultsForItem.ae : defaultsForItem.a;
    if (question && answerHtml && question !== defaultQuestion && answerHtml !== defaultAnswer) {
      items.push({ question: translateText(question), answerHtml: translateText(answerHtml) });
    }
  });

  const defaultLabel = isEnglishLocale() ? "FREQUENTLY ASKED QUESTIONS" : "SIKÇA SORULAN SORULAR";
  const defaultTitle = isEnglishLocale()
    ? 'Frequently asked questions <span class="em">and answers.</span>'
    : 'Sıkça sorulan sorular <span class="em">ve yanıtlar.</span>';
  const defaultSide = isEnglishLocale()
    ? "Explanations for the most frequently asked questions about this product."
    : "Bu ürünle ilgili en çok merak edilen konulara dair açıklamalar.";
  const title = studioOverride(isEnglishLocale() ? props.titleHtmlEn : props.titleHtml, defaultTitle)
    || currentFaq?.titleHtml
    || tLocalized(defaultTitle, defaultTitle);
  const side = studioOverride(isEnglishLocale() ? props.sideHtmlEn : props.sideHtml, defaultSide)
    || currentFaq?.sideHtml
    || "";
  const label = studioOverride(isEnglishLocale() ? props.sectionLabelEn : props.sectionLabel, defaultLabel)
    || currentFaq?.label
    || tLocalized(defaultLabel, defaultLabel);
  const indexValue = trimmedText(props.sectionIndex);
  const index = indexValue && indexValue !== "05" ? indexValue : currentFaq?.index || "05";

  const faq = {
    ...currentFaq,
    index,
    label,
    titleHtml: title,
    sideHtml: side,
    openFirst: props.openFirst ?? currentFaq?.openFirst ?? true,
    items,
  };

  return {
    ...baseData,
    faq,
  };
}

export function ThreeMashProductAccordionFaq(props: Props) {
  const isStudio = isStudioEnvironment();
  const sharedData = useSharedProductDetailData(props.product, props.productTemplateJson);
  const fallbackData = props.product ? resolveProductDetailData(props.product) : null;
  const rawData = sharedData || fallbackData || (isStudio ? makePlaceholderFaq() : null);

  if (!rawData) return null;

  const data = overrideFaqData(rawData, props) || rawData;

  return (
    <ProductDetailSectionScope
      data={data}
      colorOverrides={{
        backgroundColor: props.backgroundColor,
        textColor: props.textColor,
        lineColor: props.lineColor,
      }}
    >
      <ProductDetailFaqSection data={data} />
    </ProductDetailSectionScope>
  );
}

export default ThreeMashProductAccordionFaq;
