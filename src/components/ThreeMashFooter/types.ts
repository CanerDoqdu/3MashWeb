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
  /** Kategori rotasını tam domain olmadan /masasustu-tarayicilar biçiminde girin. */
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
  /** SSS sayfası için yayın rotası /pages/sss biçimindedir. */
  companyLink4Href?: string;
  contactLink1Text?: string;
  /** Email için mailto: formatı kullanılır. */
  contactLink1Href?: string;
  contactLink2Text?: string;
  /** Harita bağlantısı için HTTPS adresi kullanın. */
  contactLink2Href?: string;
  contactLink3Text?: string;
  /** Telefon bağlantısını tel:+ülke-kodu-numara biçiminde girin. */
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
  /** Genişlik piksel cinsindendir; geçerli aralık 40–300 px. */
  logoImageWidth?: number;
  /** Yükseklik piksel cinsindendir; geçerli aralık 12–100 px. */
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
  /** Genişlik piksel cinsindendir; geçerli aralık 40–300 px. */
  logoSvgWidth?: number;
  /** Yükseklik piksel cinsindendir; geçerli aralık 12–100 px. */
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
  /** Kategori rotasını tam domain olmadan /zirkon-bloklar biçiminde girin. */
  productLink5Href?: string;
  /** Altıncı bağlantıyı gizlemek için görünürlük anahtarını kapatın. */
  productLink6Text?: string;
  /** Kategori rotasını tam domain olmadan /dental-firinlar biçiminde girin. */
  productLink6Href?: string;
  legalLink1Text?: string;
  /** KVKK sayfası için yayın routeu: /pages/kvkk. */
  legalLink1Href?: string;
  legalLink2Text?: string;
  /** Çerez tercihleri için # kullanın; bu bağlantı çerez ayarlarını açar. */
  legalLink2Href?: string;
  legalLink3Text?: string;
  /** İade ve garanti sayfası için yayın rotası /pages/iade-ve-garanti biçimindedir. */
  legalLink3Href?: string;
  legalLink4Text?: string;
  /** Mesafeli satış sayfası için yayın rotası /pages/mesafeli-satis-sozlesmesi biçimindedir. */
  legalLink4Href?: string;
  descriptionTextEn?: string;
  productColumnTitleEn?: string;
  productLink1TextEn?: string;
  productLink2TextEn?: string;
  productLink3TextEn?: string;
  productLink4TextEn?: string;
  productLink5TextEn?: string;
  productLink6TextEn?: string;
  productFooterLinksEn?: IkasNavigationLinkList;
  companyColumnTitleEn?: string;
  companyLink1TextEn?: string;
  companyLink2TextEn?: string;
  companyLink3TextEn?: string;
  companyLink4TextEn?: string;
  companyFooterLinksEn?: IkasNavigationLinkList;
  contactColumnTitleEn?: string;
  contactLink1TextEn?: string;
  contactLink2TextEn?: string;
  contactLink3TextEn?: string;
  contactFooterLinksEn?: IkasNavigationLinkList;
  paymentMethodsLabel?: string;
  paymentMethodsLabelEn?: string;
  copyrightTextEn?: string;
  legalLink1TextEn?: string;
  legalLink2TextEn?: string;
  legalLink3TextEn?: string;
  legalLink4TextEn?: string;
  showBrand?: boolean;
  showDescription?: boolean;
  showProductColumn?: boolean;
  showCompanyColumn?: boolean;
  showContactColumn?: boolean;
  showSocialIcons?: boolean;
  showPaymentBadges?: boolean;
  showLegalInfo?: boolean;
  showProductLink1?: boolean;
  showProductLink2?: boolean;
  showProductLink3?: boolean;
  showProductLink4?: boolean;
  showProductLink5?: boolean;
  showProductLink6?: boolean;
  showCompanyLink1?: boolean;
  showLegalLink1?: boolean;
  showCompanyLink2?: boolean;
  showLegalLink2?: boolean;
  showCompanyLink3?: boolean;
  showLegalLink3?: boolean;
  showCompanyLink4?: boolean;
  showLegalLink4?: boolean;
  showContactLink1?: boolean;
  showContactLink2?: boolean;
  showContactLink3?: boolean;
  legalLink5Text?: string;
  /** Üyelik sözleşmesi sayfası için yayın rotası /pages/uyelik-sozlesmesi biçimindedir. */
  legalLink5Href?: string;
  legalLink5TextEn?: string;
  visaBadgeLabel?: string;
  maestroBadgeLabel?: string;
  mastercardBadgeLabel?: string;
  showLegalLink5?: boolean;
  /** Güvenli bağlantı için HTTPS adresi kullanın. */
  facebookHref?: string;
  facebookLabel?: string;
  /** Güvenli bağlantı için HTTPS adresi kullanın. */
  instagramHref?: string;
  instagramLabel?: string;
  /** Güvenli bağlantı için HTTPS adresi kullanın. */
  youtubeHref?: string;
  youtubeLabel?: string;
  /** Güvenli bağlantı için HTTPS adresi kullanın. */
  linkedinHref?: string;
  linkedinLabel?: string;
  facebookIconImage?: IkasImage | null;
  instagramIconImage?: IkasImage | null;
  youtubeIconImage?: IkasImage | null;
  linkedinIconImage?: IkasImage | null;
  visaBadgeImage?: IkasImage | null;
  maestroBadgeImage?: IkasImage | null;
  mastercardBadgeImage?: IkasImage | null;
}
