// This file is auto-generated — do not edit manually.
import type { IkasProduct, IkasProductList } from "@ikas/bp-storefront";

export interface Props {
  /** Otomatik mod için sayfa ürününe bağlayın. */
  product?: IkasProduct | null;
  /** Manuel modda kategori veya ürün listesi seçmek için kullanılır. */
  productList?: IkasProductList;
  /** auto veya manual. auto ürünün ilk kategorisini kullanır. */
  sourceMode?: string;
  sectionAnchorId?: string;
  showHeader?: boolean;
  titleText?: string;
  descriptionHtml?: string;
  setupMessage?: string;
  showArrows?: boolean;
  showCurrentProduct?: boolean;
  showCategoryName?: boolean;
  showPrice?: boolean;
  openLinksInNewTab?: boolean;
  productLimit?: number;
  scrollByCards?: number;
  maxWidth?: number;
  paddingTop?: number;
  paddingBottom?: number;
  cardGap?: number;
  visibleCardsDesktop?: number;
  visibleCardsTablet?: number;
  visibleCardsMobile?: number;
  imageHeight?: number;
  /** contain, cover, fill veya scale-down. */
  imageFit?: string;
  imageScale?: number;
  imageYOffset?: number;
  titleMaxLines?: number;
  titleFontSize?: number;
  cardTitleFontSize?: number;
  priceFontSize?: number;
  backgroundColor?: string;
  textColor?: string;
  mutedTextColor?: string;
  cardBackgroundColor?: string;
  arrowBackgroundColor?: string;
  arrowColor?: string;
  /** CRS kaynaklı reusable ürün template datası. Doluysa bu section kendi karşılık gelen bölümünü bu datadan render eder. */
  productTemplateJson?: string;
}
