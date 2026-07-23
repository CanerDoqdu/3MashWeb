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
  /** Tüm Kategoriler ya da seçili kategorilere bağlayın. Ayarlandığında alt bilgi Ürünler sütunu canlı ikas kategorilerini okur. */
  productCategoryList?: IkasCategoryList;
  /** Alt bilgi Ürünler sütunu için editörden yönetilen isteğe bağlı bağlantılar. Ürün alt bilgi kategorileri boş olduğunda kullanılır. */
  productFooterLinks?: IkasNavigationLinkList;
  /** Alt bilgi Ürünler sütununda gösterilecek maksimum canlı ikas kategori sayısı. */
  footerCategoryLimit?: number;
  /** Alt bilgi Şirket sütunu için editörden yönetilen isteğe bağlı bağlantılar. */
  companyFooterLinks?: IkasNavigationLinkList;
  /** Alt bilgi İletişim sütunu için editörden yönetilen isteğe bağlı bağlantılar. */
  contactFooterLinks?: IkasNavigationLinkList;
  logoHref?: string;
  /** Logo görseli veya Logo SVG kullanın. İkisi de girilirse Logo SVG gösterilir. */
  logoImageUrl?: IkasImage | null;
  logoImageAlt?: string;
  /** Logo görseli veya Logo SVG kullanın. İkisi de girilirse Logo SVG gösterilir. */
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
