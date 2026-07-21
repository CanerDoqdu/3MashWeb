// This file is auto-generated — do not edit manually.
import type { IkasImage } from "@ikas/bp-storefront";
import type { LogoImageFit } from "../../global-types";

export interface Props {
  logoText: string;
  logoHref?: string;
  /** Use either Logo Image or Logo SVG. If both are uploaded, Logo SVG is shown. */
  logoImageUrl?: IkasImage | null;
  logoImageAlt?: string;
  /** Use either Logo Image or Logo SVG. If both are uploaded, Logo SVG is shown. */
  logoSvg?: string;
  logoImageWidth?: number;
  logoImageHeight?: number;
  logoImageXOffset?: number;
  logoImageYOffset?: number;
  logoImageFit?: LogoImageFit;
  logoImageOpacity?: number;
  logoImageBrightness?: number;
  logoImageContrast?: number;
  logoImageSaturation?: number;
  logoImageHue?: number;
  logoImageInvert?: number;
  logoSvgWidth?: number;
  logoSvgHeight?: number;
  logoSvgXOffset?: number;
  logoSvgYOffset?: number;
  logoSvgOpacity?: number;
  logoSvgBrightness?: number;
  logoSvgContrast?: number;
  logoSvgSaturation?: number;
  logoSvgHue?: number;
  logoSvgInvert?: number;
  backgroundColor?: string;
  accentColor?: string;
  textColor?: string;
  mutedTextColor?: string;
  lineColor?: string;
  panelColor?: string;
  badgeColor?: string;
  wordStyleEnabled?: boolean;
  styledPhrase?: string;
  styledPhraseColor?: string;
  styledPhraseBold?: boolean;
  styledPhraseItalic?: boolean;
}
