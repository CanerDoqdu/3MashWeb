// This file is auto-generated — do not edit manually.
import type { IkasProductList } from "@ikas/bp-storefront";
import type { LogoImageFit } from "../../global-types";

export interface Props {
  /** Bind this to All Products or the current product list/category. Section 3 only renders live ikas products; old static demo products are not used. */
  productList: IkasProductList;
  sectionAnchorId?: string;
  indexNumber?: string;
  indexText?: string;
  titleText?: string;
  titleEmphasis?: string;
  sideHtml?: string;
  carouselAriaLabel?: string;
  carouselDurationSeconds?: number;
  pauseOnHover?: boolean;
  edgeFadeWidth?: number;
  cardGap?: number;
  productImageWidth?: number;
  productImageHeight?: number;
  productImageXOffset?: number;
  productImageYOffset?: number;
  productImageFit?: LogoImageFit;
  productImageOpacity?: number;
  productImageBrightness?: number;
  productImageContrast?: number;
  productImageSaturation?: number;
  productImageHue?: number;
  productImageInvert?: number;
  backgroundColor?: string;
  textColor?: string;
  subTextColor?: string;
  mutedTextColor?: string;
  lineColor?: string;
  panelColor?: string;
  accentColor?: string;
  accentTextColor?: string;
  accentSoftColor?: string;
  dangerColor?: string;
  cardMediaStartColor?: string;
  cardMediaEndColor?: string;
  cardRadius?: number;
  hoverVideoAutoplayEnabled?: boolean;
  wordStyleEnabled?: boolean;
  styledPhrase?: string;
  styledPhraseColor?: string;
  styledPhraseBold?: boolean;
  styledPhraseItalic?: boolean;
  showBackgroundGlow?: boolean;
}
