// This file is auto-generated — do not edit manually.
import type { IkasCategoryList, IkasNavigationLinkList, IkasImage } from "@ikas/bp-storefront";
import type { LogoImageFit } from "../../global-types";

export interface Props {
  logoText?: string;
  descriptionText?: string;
  productLink1Text?: string;
  productLink1Href?: string;
  productLink2Text?: string;
  productLink2Href?: string;
  productLink3Text?: string;
  productLink3Href?: string;
  productLink4Text?: string;
  productLink4Href?: string;
  companyLink1Text?: string;
  companyLink1Href?: string;
  companyLink2Text?: string;
  companyLink2Href?: string;
  companyLink3Text?: string;
  companyLink3Href?: string;
  companyLink4Text?: string;
  companyLink4Href?: string;
  contactLink1Text?: string;
  contactLink1Href?: string;
  contactLink2Text?: string;
  contactLink2Href?: string;
  contactLink3Text?: string;
  contactLink3Href?: string;
  copyrightText?: string;
  legalText?: string;
  backgroundColor?: string;
  textColor?: string;
  mutedTextColor?: string;
  lineColor?: string;
  accentColor?: string;
  productColumnTitle?: string;
  companyColumnTitle?: string;
  contactColumnTitle?: string;
  /** Bind to All Categories or selected categories. When set, the footer Products column reads live ikas categories. */
  productCategoryList?: IkasCategoryList;
  /** Optional editor-managed links for the footer Products column. Used when Product Footer Categories is empty. */
  productFooterLinks?: IkasNavigationLinkList;
  /** Maximum number of live ikas categories shown in the footer Products column. */
  footerCategoryLimit?: number;
  /** Optional editor-managed links for the footer Company column. */
  companyFooterLinks?: IkasNavigationLinkList;
  /** Optional editor-managed links for the footer Contact column. */
  contactFooterLinks?: IkasNavigationLinkList;
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
  wordStyleEnabled?: boolean;
  styledPhrase?: string;
  styledPhraseColor?: string;
  styledPhraseBold?: boolean;
  styledPhraseItalic?: boolean;
}
