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
  testimonial1Text?: string;
  /** Upload a replacement profile photo. If empty, the bundled profile photo is used. */
  testimonial1ImageUrl?: IkasImage | null;
  testimonial1ImageAlt?: string;
  testimonial1Name?: string;
  testimonial1Role?: string;
  testimonial2Text?: string;
  /** Upload a replacement profile photo. If empty, the bundled profile photo is used. */
  testimonial2ImageUrl?: IkasImage | null;
  testimonial2ImageAlt?: string;
  testimonial2Name?: string;
  testimonial2Role?: string;
  testimonial3Text?: string;
  /** Upload a replacement profile photo. If empty, the bundled profile photo is used. */
  testimonial3ImageUrl?: IkasImage | null;
  testimonial3ImageAlt?: string;
  testimonial3Name?: string;
  testimonial3Role?: string;
  profileImageWidth?: number;
  profileImageHeight?: number;
  profileImageXOffset?: number;
  profileImageYOffset?: number;
  profileImageFit?: LogoImageFit;
  profileImageOpacity?: number;
  profileImageBrightness?: number;
  profileImageContrast?: number;
  profileImageSaturation?: number;
  profileImageHue?: number;
  profileImageInvert?: number;
  trustedLabel?: string;
  /** Upload a replacement trusted logo strip. If empty, the bundled strip is used. */
  trustedImageUrl?: IkasImage | null;
  trustedImageAlt?: string;
  trustedLogoHeight?: number;
  trustedLogoOpacity?: number;
  trustedLogoGrayscale?: number;
  backgroundColor?: string;
  textColor?: string;
  subTextColor?: string;
  mutedTextColor?: string;
  lineColor?: string;
  panelColor?: string;
  darkColor?: string;
  accentColor?: string;
  accentTextColor?: string;
  cardRadius?: number;
}
