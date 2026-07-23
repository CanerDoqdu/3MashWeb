// This file is auto-generated — do not edit manually.
import type { IkasProductList, IkasImage } from "@ikas/bp-storefront";
import type { LogoImageFit } from "../../global-types";

export interface Props {
  showAnnouncement?: boolean;
  announcementHighlightText?: string;
  announcementText?: string;
  announcementCtaText?: string;
  announcementHref?: string;
  logoText: string;
  logoHref?: string;
  productsMenuText?: string;
  /** Ürünler mega menüsündeki sağ alt küçük bağlantı metni. */
  allProductsText?: string;
  /** Ürünler mega menüsündeki sağ alt küçük bağlantı adresi. */
  allProductsHref?: string;
  productsFeatureEyebrow?: string;
  productsFeatureTitle?: string;
  productsFeatureDescription?: string;
  productsFeatureCtaText?: string;
  productsFeatureHref?: string;
  productsCol1Title?: string;
  product1Title?: string;
  product1Description?: string;
  product1Href?: string;
  product2Title?: string;
  product2Description?: string;
  product2Href?: string;
  product3Title?: string;
  product3Description?: string;
  product3Href?: string;
  productsCol2Title?: string;
  product4Title?: string;
  product4Description?: string;
  product4Href?: string;
  product5Title?: string;
  product5Description?: string;
  product5Href?: string;
  product6Title?: string;
  product6Description?: string;
  product6Href?: string;
  whyMenuText?: string;
  why1Number?: string;
  why1Title?: string;
  why1Description?: string;
  why1Href?: string;
  why2Number?: string;
  why2Title?: string;
  why2Description?: string;
  why2Href?: string;
  why3Number?: string;
  why3Title?: string;
  why3Description?: string;
  why3Href?: string;
  why4Number?: string;
  why4Title?: string;
  why4Description?: string;
  why4Href?: string;
  referencesText?: string;
  referencesHref?: string;
  academyText?: string;
  academyHref?: string;
  searchHref?: string;
  /** üst menü arama önerileri için Tüm Ürünler olarak bağlayın. */
  searchProductList?: IkasProductList;
  searchAriaLabel?: string;
  accountHref?: string;
  accountAriaLabel?: string;
  cartHref?: string;
  cartAriaLabel?: string;
  cartCount?: string;
  mobileMenuLabel?: string;
  backgroundColor?: string;
  announcementBackgroundColor?: string;
  announcementTextColor?: string;
  accentColor?: string;
  textColor?: string;
  mutedTextColor?: string;
  lineColor?: string;
  panelColor?: string;
  badgeColor?: string;
  /** Logo görseli veya Logo SVG kullanın. İkisi de girilirse Logo SVG gösterilir. */
  logoImageUrl?: IkasImage | null;
  logoImageAlt?: string;
  /** Logo görseli veya Logo SVG kullanın. İkisi de girilirse Logo SVG gösterilir. */
  logoSvg?: string;
  /** Görseli buradan yükleyin; boyut, konum ve efektler ilgili kontrol grubundan yönetilir. */
  productsFeatureImageUrl?: IkasImage | null;
  productsFeatureImageAlt?: string;
  /** İkon görseli veya ikon SVG kullanın. İkisi de girilirse ikon görseli gösterilir. */
  product1IconSvg?: string;
  /** İkon görseli veya ikon SVG kullanın. İkisi de girilirse ikon görseli gösterilir. */
  product2IconSvg?: string;
  /** İkon görseli veya ikon SVG kullanın. İkisi de girilirse ikon görseli gösterilir. */
  product3IconSvg?: string;
  /** İkon görseli veya ikon SVG kullanın. İkisi de girilirse ikon görseli gösterilir. */
  product4IconSvg?: string;
  /** İkon görseli veya ikon SVG kullanın. İkisi de girilirse ikon görseli gösterilir. */
  product5IconSvg?: string;
  /** İkon görseli veya ikon SVG kullanın. İkisi de girilirse ikon görseli gösterilir. */
  product6IconSvg?: string;
  /** İkon görseli veya ikon SVG kullanın. İkisi de girilirse ikon görseli gösterilir. */
  searchIconSvg?: string;
  /** İkon görseli veya ikon SVG kullanın. İkisi de girilirse ikon görseli gösterilir. */
  accountIconSvg?: string;
  /** İkon görseli veya ikon SVG kullanın. İkisi de girilirse ikon görseli gösterilir. */
  cartIconSvg?: string;
  searchDrawerTitle?: string;
  searchPlaceholder?: string;
  searchCloseLabel?: string;
  searchSubmitLabel?: string;
  searchQueryParam?: string;
  whyMenuEyebrow?: string;
  whyMenuDescription?: string;
  /** İkon görseli veya ikon SVG kullanın. İkisi de girilirse ikon görseli gösterilir. */
  product1IconImageUrl?: IkasImage | null;
  /** İkon görseli veya ikon SVG kullanın. İkisi de girilirse ikon görseli gösterilir. */
  product2IconImageUrl?: IkasImage | null;
  /** İkon görseli veya ikon SVG kullanın. İkisi de girilirse ikon görseli gösterilir. */
  product3IconImageUrl?: IkasImage | null;
  /** İkon görseli veya ikon SVG kullanın. İkisi de girilirse ikon görseli gösterilir. */
  product4IconImageUrl?: IkasImage | null;
  /** İkon görseli veya ikon SVG kullanın. İkisi de girilirse ikon görseli gösterilir. */
  product5IconImageUrl?: IkasImage | null;
  /** İkon görseli veya ikon SVG kullanın. İkisi de girilirse ikon görseli gösterilir. */
  product6IconImageUrl?: IkasImage | null;
  /** İkon görseli veya ikon SVG kullanın. İkisi de girilirse ikon görseli gösterilir. */
  searchIconImageUrl?: IkasImage | null;
  /** İkon görseli veya ikon SVG kullanın. İkisi de girilirse ikon görseli gösterilir. */
  accountIconImageUrl?: IkasImage | null;
  /** İkon görseli veya ikon SVG kullanın. İkisi de girilirse ikon görseli gösterilir. */
  cartIconImageUrl?: IkasImage | null;
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
  productsFeatureImageWidth?: number;
  productsFeatureImageHeight?: number;
  productsFeatureImageXOffset?: number;
  productsFeatureImageYOffset?: number;
  productsFeatureImageFit?: LogoImageFit;
  productsFeatureImageOpacity?: number;
  productsFeatureImageBrightness?: number;
  productsFeatureImageContrast?: number;
  productsFeatureImageSaturation?: number;
  productsFeatureImageHue?: number;
  productsFeatureImageInvert?: number;
  productIconImageWidth?: number;
  productIconImageHeight?: number;
  productIconImageXOffset?: number;
  productIconImageYOffset?: number;
  productIconImageFit?: LogoImageFit;
  productIconImageOpacity?: number;
  productIconImageBrightness?: number;
  productIconImageContrast?: number;
  productIconImageSaturation?: number;
  productIconImageHue?: number;
  productIconImageInvert?: number;
  productIconSvgWidth?: number;
  productIconSvgHeight?: number;
  productIconSvgXOffset?: number;
  productIconSvgYOffset?: number;
  productIconSvgOpacity?: number;
  productIconSvgBrightness?: number;
  productIconSvgContrast?: number;
  productIconSvgSaturation?: number;
  productIconSvgHue?: number;
  productIconSvgInvert?: number;
  actionIconImageWidth?: number;
  actionIconImageHeight?: number;
  actionIconImageXOffset?: number;
  actionIconImageYOffset?: number;
  actionIconImageFit?: LogoImageFit;
  actionIconImageOpacity?: number;
  actionIconImageBrightness?: number;
  actionIconImageContrast?: number;
  actionIconImageSaturation?: number;
  actionIconImageHue?: number;
  actionIconImageInvert?: number;
  actionIconSvgWidth?: number;
  actionIconSvgHeight?: number;
  actionIconSvgXOffset?: number;
  actionIconSvgYOffset?: number;
  actionIconSvgOpacity?: number;
  actionIconSvgBrightness?: number;
  actionIconSvgContrast?: number;
  actionIconSvgSaturation?: number;
  actionIconSvgHue?: number;
  actionIconSvgInvert?: number;
  why5Number?: string;
  why5Title?: string;
  why5Description?: string;
  why5Href?: string;
  why6Number?: string;
  why6Title?: string;
  why6Description?: string;
  why6Href?: string;
  why7Number?: string;
  why7Title?: string;
  why7Description?: string;
  why7Href?: string;
  showProductIcons?: boolean;
  showActionIcons?: boolean;
  showWhyItemGlow?: boolean;
  showProfileMenu?: boolean;
  profileMenuTitle?: string;
  profileMenuDescription?: string;
  profilePrimaryText?: string;
  profilePrimaryHref?: string;
  profileSecondaryText?: string;
  profileSecondaryHref?: string;
  showStorePanel?: boolean;
  storePanelTitle?: string;
  storePanelDescription?: string;
  storePanelButtonText?: string;
  storePanelButtonHref?: string;
  storePanelNote?: string;
  announcementWordStyleEnabled?: boolean;
  announcementStyledPhrase?: string;
  announcementStyledPhraseColor?: string;
  announcementStyledPhraseBold?: boolean;
  announcementStyledPhraseItalic?: boolean;
  wordStyleEnabled?: boolean;
  styledPhrase?: string;
  styledPhraseColor?: string;
  styledPhraseBold?: boolean;
  styledPhraseItalic?: boolean;
  profileLink1Text?: string;
  profileLink2Text?: string;
  profileLink2Href?: string;
  profileLink3Text?: string;
  profileLink3Href?: string;
  storeItemCountText?: string;
  storeEmptyTitle?: string;
  storeEmptyDescription?: string;
  storeSecondaryButtonText?: string;
  storeSecondaryButtonHref?: string;
  profileLink1Href?: string;
  profileLink4Text?: string;
  profileLink4Href?: string;
  profileLink5Text?: string;
  profileLink5Href?: string;
  profileLink6Text?: string;
  profileLink6Href?: string;
}
