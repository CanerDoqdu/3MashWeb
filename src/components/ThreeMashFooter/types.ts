// This file is auto-generated — do not edit manually.
import type { IkasCategoryList, IkasNavigationLinkList, IkasImage } from "@ikas/bp-storefront";
import type { LogoImageFit } from "../../global-types";

export interface Props {
  logoText?: string;
  descriptionText?: string;
  productLink1Text?: string;
  /** Tam domain kullanmayın; kategori routeunu /3d-yazicilar olarak girin. */
  productLink1Href?: string;
  productLink2Text?: string;
  /** Tam domain kullanmayın; kategori routeunu /dental-3d-yazici-recineleri olarak girin. */
  productLink2Href?: string;
  productLink3Text?: string;
  /** Tam domain kullanmayın; kategori routeunu /yikama-kurleme-cihazlari olarak girin. */
  productLink3Href?: string;
  productLink4Text?: string;
  /** Tam domain kullanmayın; kategori routeunu /zirkon-bloklar olarak girin. */
  productLink4Href?: string;
  companyLink1Text?: string;
  /** Hakkımızda sayfası için yayın routeu: /pages/hakkimizda. */
  companyLink1Href?: string;
  companyLink2Text?: string;
  /** Doğru Academy routeu /pages/mash-academy. */
  companyLink2Href?: string;
  companyLink3Text?: string;
  /** Tam domain kullanmayın; blog routeunu /blog olarak girin. */
  companyLink3Href?: string;
  companyLink4Text?: string;
  /** Tam domain kullanmayın; iletişim routeunu /pages/iletisim olarak girin. */
  companyLink4Href?: string;
  contactLink1Text?: string;
  /** Email için mailto: formatı kullanılır. */
  contactLink1Href?: string;
  contactLink2Text?: string;
  /** Harita linki dış Linkidır. */
  contactLink2Href?: string;
  contactLink3Text?: string;
  contactLink3Href?: string;
  copyrightText?: string;
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
  /** Alt bilgi Ürünler sütunu için editörden yönetilen isteğe bağlı Bağlantılar. Ürün alt bilgi kategorileri boş olduğunda kullanılır. */
  productFooterLinks?: IkasNavigationLinkList;
  /** Alt bilgi Ürünler sütununda gösterilecek maksimum canlı ikas kategori sayısı. */
  footerCategoryLimit?: number;
  /** Alt bilgi Şirket sütunu için editörden yönetilen isteğe bağlı Bağlantılar. */
  companyFooterLinks?: IkasNavigationLinkList;
  /** Alt bilgi İletişim sütunu için editörden yönetilen isteğe bağlı Bağlantılar. */
  contactFooterLinks?: IkasNavigationLinkList;
  /** Tam domain kullanmayın; anasayfa için / girin. */
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
  productLink5Text?: string;
  /** Tam domain kullanmayın; kategori routeunu /dental-firinlar olarak girin. */
  productLink5Href?: string;
  productLink6Text?: string;
  /** Beş ürün linki yeterliyse boş bırakın. */
  productLink6Href?: string;
  legalLink1Text?: string;
  /** KVKK sayfası için yayın routeu: /pages/kvkk. */
  legalLink1Href?: string;
  legalLink2Text?: string;
  /** İade ve garanti sayfası için yayın routeu: /pages/iade-ve-garanti. */
  legalLink2Href?: string;
  legalLink3Text?: string;
  /** Mesafeli satış sayfası için yayın routeu: /pages/mesafeli-satis-sozlesmesi. */
  legalLink3Href?: string;
  legalLink4Text?: string;
  /** Üyelik sözleşmesi sayfası için yayın routeu: /pages/uyelik-sozlesmesi. */
  legalLink4Href?: string;
}
