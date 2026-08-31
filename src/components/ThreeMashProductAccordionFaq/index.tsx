import { useState } from "preact/hooks";
import { Props } from "./types";
import { useSharedProductDetailData, resolveProductDetailData } from "../../sub-components/ThreeMashProductDetailData";
import { ProductDetailFaqSection, ProductDetailSectionScope, type ProductDetailTemplateData } from "../../sub-components/ThreeMashProductDetailTemplate";
import { makePlaceholderFaq } from "../../sub-components/ThreeMashProductSectionPlaceholder";
import { tLocalized, isEnglishLocale, isTurkishText } from "../../utils/i18n";

type FaqItem = {
  question: string;
  answerHtml: string;
};

function trimmedText(value: unknown): string {
  const trimmed = typeof value === "string" ? value.trim() : "";
  if (isEnglishLocale() && isTurkishText(trimmed)) return "";
  return trimmed;
}

function overrideFaqData(baseData: ProductDetailTemplateData | null, props: Props): ProductDetailTemplateData | null {
  if (!baseData) return null;

  const currentFaq = baseData.faq;
  const title = trimmedText((props as any).titleHtml || (props as any).titleText) || currentFaq?.titleHtml || tLocalized("Sıkça Sorulan Sorular", "Frequently Asked Questions");
  const side = trimmedText((props as any).sideHtml || (props as any).descriptionHtml) || currentFaq?.sideHtml || "";

  const customItems = Array.from({ length: 12 }, (_, index) => {
    const number = index + 1;
    const data = props as unknown as Record<string, unknown>;
    const question = trimmedText(data[`faq${number}Question`]);
    const answerHtml = trimmedText(data[`faq${number}AnswerHtml`]);
    return question ? { question, answerHtml } : null;
  }).filter(Boolean) as FaqItem[];

  const faq = {
    index: currentFaq?.index || "05",
    label: currentFaq?.label || tLocalized("SIKÇA SORULAN SORULAR", "FREQUENTLY ASKED QUESTIONS"),
    titleHtml: title,
    sideHtml: side,
    items: customItems.length ? customItems : (currentFaq?.items ? [...currentFaq.items] : []),
  };

  return {
    ...baseData,
    faq,
  };
}

export function ThreeMashProductAccordionFaq(props: Props) {
  const sharedData = useSharedProductDetailData(props.product, (props as Record<string, unknown>).productTemplateJson);
  const fallbackData = props.product ? resolveProductDetailData(props.product) : null;
  const rawData = sharedData || fallbackData || makePlaceholderFaq();

  const data = overrideFaqData(rawData, props) || makePlaceholderFaq();

  return (
    <ProductDetailSectionScope data={data}>
      <ProductDetailFaqSection data={data} />
    </ProductDetailSectionScope>
  );
}

export default ThreeMashProductAccordionFaq;
