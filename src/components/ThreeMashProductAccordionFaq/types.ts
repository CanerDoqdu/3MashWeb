// This file is auto-generated — do not edit manually.
import type { IkasProduct } from "@ikas/bp-storefront";

export interface Props {
  /** Ürün sayfasındaki mevcut ürünü bağla. SSS sadece reçine ürünlerinde render edilir. */
  product?: IkasProduct | null;
  /** Kapalıysa SSS section render edilmez. */
  sectionVisible?: boolean;
  /** Sayfa içi link için id. Boş bırakılabilir. */
  sectionAnchorId?: string;
  titleText?: string;
  showDescription?: boolean;
  descriptionHtml?: string;
  openFirstItem?: boolean;
  allowMultipleOpen?: boolean;
  faq1Question?: string;
  faq1AnswerHtml?: string;
  faq2Question?: string;
  faq2AnswerHtml?: string;
  faq3Question?: string;
  faq3AnswerHtml?: string;
  faq4Question?: string;
  faq4AnswerHtml?: string;
  faq5Question?: string;
  faq5AnswerHtml?: string;
  faq6Question?: string;
  faq6AnswerHtml?: string;
  faq7Question?: string;
  faq7AnswerHtml?: string;
  faq8Question?: string;
  faq8AnswerHtml?: string;
  faq9Question?: string;
  faq9AnswerHtml?: string;
  faq10Question?: string;
  faq10AnswerHtml?: string;
  faq11Question?: string;
  faq11AnswerHtml?: string;
  faq12Question?: string;
  faq12AnswerHtml?: string;
  /** Daha fazla satır için JSON array girin: [{"question":"Soru","answerHtml":"<p>Cevap</p>"}] */
  extraFaqItemsJson?: string;
  maxWidth?: number;
  listMaxWidth?: number;
  paddingTop?: number;
  paddingBottom?: number;
  titleSpacing?: number;
  rowGap?: number;
  rowPaddingY?: number;
  rowPaddingX?: number;
  rowBorderRadius?: number;
  answerPaddingTop?: number;
  answerPaddingBottom?: number;
  titleFontSize?: number;
  questionFontSize?: number;
  answerFontSize?: number;
  backgroundColor?: string;
  titleColor?: string;
  rowBackgroundColor?: string;
  rowOpenBackgroundColor?: string;
  questionColor?: string;
  answerColor?: string;
  iconColor?: string;
  iconBackgroundColor?: string;
  lineColor?: string;
  placeholderText?: string;
  /** CRS kaynaklı reusable ürün template datası. Doluysa bu section kendi karşılık gelen bölümünü bu datadan render eder. */
  productTemplateJson?: string;
}
