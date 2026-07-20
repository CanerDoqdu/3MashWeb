// This file is auto-generated — do not edit manually.
import type { IkasImage } from "@ikas/bp-storefront";
import type { LogoImageFit } from "../../global-types";

export interface Props {
  sectionAnchorId?: string;
  indexNumber?: string;
  indexText?: string;
  titleText?: string;
  titleEmphasis?: string;
  sideHtml?: string;
  badLabel?: string;
  badValue?: string;
  badDescriptionHtml?: string;
  goodLabel?: string;
  goodValue?: string;
  goodDescriptionHtml?: string;
  showHairNote?: boolean;
  hairNoteHtml?: string;
  showReference?: boolean;
  referenceHtml?: string;
  backgroundColor?: string;
  textColor?: string;
  subTextColor?: string;
  mutedTextColor?: string;
  lineColor?: string;
  lineStrongColor?: string;
  panelColor?: string;
  accentColor?: string;
  accentTextColor?: string;
  dangerColor?: string;
  /** Upload image here; size, position and effects are controlled in the image controls group. */
  hairImageUrl?: IkasImage | null;
  hairImageWidth?: number;
  hairImageHeight?: number;
  hairImageXOffset?: number;
  hairImageYOffset?: number;
  hairImageFit?: LogoImageFit;
  hairImageOpacity?: number;
  hairImageBrightness?: number;
  hairImageContrast?: number;
  hairImageSaturation?: number;
  hairImageHue?: number;
  hairImageInvert?: number;
  showDigitalGlitch?: boolean;
  showBadValueCountUp?: boolean;
  wordStyleEnabled?: boolean;
  styledPhrase?: string;
  styledPhraseColor?: string;
  styledPhraseBold?: boolean;
  styledPhraseItalic?: boolean;
}
