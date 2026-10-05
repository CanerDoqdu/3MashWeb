// This file is auto-generated — do not edit manually.
import type { IkasProduct, IkasProductList } from "@ikas/bp-storefront";

export interface Props {
  /** Kategori otomatik seçimi ve ürün verisi için kullanılır. */
  product?: IkasProduct | null;
  /** İlgili ürünler başlığının yanındaki sıra numarası. */
  relatedIndex?: string;
  /** Sıra numarasının yanında gösterilen bölüm etiketi. */
  relatedLabel?: string;
  /** Ürün carouselinin üst başlığı. HTML biçimlendirmesi desteklenir. */
  relatedTitleHtml?: string;
  /** Sayfa sonundaki CTA alanının başlığı. HTML biçimlendirmesi desteklenir. */
  finalCtaTitleHtml?: string;
  /** Son CTA alanındaki başlık altı açıklama. HTML biçimlendirmesi desteklenir. */
  finalCtaTextHtml?: string;
  /** Lime arka planlı birincil buton etiketi. */
  primaryButtonText?: string;
  /** Birincil CTA hedef adresi. */
  primaryButtonHref?: string;
  /** Çerçeveli ikincil buton etiketi. */
  secondaryButtonText?: string;
  /** İkincil CTA hedef adresi. */
  secondaryButtonHref?: string;
  backgroundColor?: string;
  finalCtaBackground?: string;
  finalCtaTextColor?: string;
  accentColor?: string;
  /** Gelişmiş ürün şablonu JSON verisi; boş bırakıldığında ürün verisinin otomatik çözümlemesi kullanılır. */
  productTemplateJson?: string;
  /** auto veya manual. Auto, seçili ürünün kategorisini kullanır. */
  sourceMode?: string;
  /** Manuel kaynak modu seçildiğinde gösterilecek ürün listesi. */
  productList?: IkasProductList;
  /** 1 ile 40 arasında. */
  productLimit?: number;
  showCurrentProduct?: boolean;
  sectionAnchorId?: string;
  titleText?: string;
  titleTextEn?: string;
  descriptionHtml?: string;
  descriptionHtmlEn?: string;
  relatedLabelEn?: string;
  relatedTitleHtmlEn?: string;
  finalCtaTitleHtmlEn?: string;
  finalCtaTextHtmlEn?: string;
  primaryButtonTextEn?: string;
  secondaryButtonTextEn?: string;
  showHeader?: boolean;
  showArrows?: boolean;
  showCategoryName?: boolean;
  showPrice?: boolean;
  openLinksInNewTab?: boolean;
  showRelatedProducts?: boolean;
  showFinalCta?: boolean;
  /** 1 ile 6 arasında. */
  scrollByCards?: number;
  /** 0 ile 120 piksel arasında. */
  cardGap?: number;
  /** 480 ile 2560 piksel arasında. */
  maxWidth?: number;
  /** 0 ile 320 piksel arasında. */
  paddingTop?: number;
  /** 0 ile 320 piksel arasında. */
  paddingBottom?: number;
  /** 1 ile 6 arasında. */
  visibleCardsDesktop?: number;
  /** 1 ile 4 arasında. */
  visibleCardsTablet?: number;
  /** 1 ile 2 arasında. */
  visibleCardsMobile?: number;
  /** 120 ile 520 piksel arasında. */
  imageHeight?: number;
  /** contain, cover, fill veya scale-down değerlerinden biri. */
  imageFit?: string;
  /** 0.2 ile 2 arasında. */
  imageScale?: number;
  /** -120 ile 120 piksel arasında. */
  imageYOffset?: number;
  /** 1 ile 4 arasında. */
  titleMaxLines?: number;
  /** 12 ile 72 piksel arasında. */
  titleFontSize?: number;
  /** 10 ile 24 piksel arasında. */
  cardTitleFontSize?: number;
  /** 10 ile 24 piksel arasında. */
  priceFontSize?: number;
  mutedTextColor?: string;
  cardBackgroundColor?: string;
  arrowBackgroundColor?: string;
  arrowColor?: string;
  setupMessage?: string;
  setupMessageEn?: string;
  previousProductsLabel?: string;
  previousProductsLabelEn?: string;
  nextProductsLabel?: string;
  nextProductsLabelEn?: string;
  categoryProductsAriaLabel?: string;
  categoryProductsAriaLabelEn?: string;
  loadingProductsText?: string;
  loadingProductsTextEn?: string;
  relatedProductLinkText?: string;
  relatedProductLinkTextEn?: string;
  textColor?: string;
}
