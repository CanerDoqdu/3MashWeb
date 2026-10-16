// This file is auto-generated — do not edit manually.
import type { IkasImage, IkasProductList, IkasVideo } from "@ikas/bp-storefront";
import type { LogoImageFit } from "../../global-types";

export interface Props {
  showAnnouncement?: boolean;
  announcementHighlightText?: string;
  announcementText?: string;
  announcementCtaText?: string;
  announcementHref?: string;
  logoText?: string;
  /** Logo tıklanınca gidilecek anasayfa routeu. */
  logoHref?: string;
  productsMenuText?: string;
  /** Ürünler mega menüsündeki sağ alt küçük bağlantı metni. */
  allProductsText?: string;
  /** Ürünler mega menüsündeki sağ alt küçük bağlantı adresi. Arama sayfası için /search yazın. */
  allProductsHref?: string;
  productsFeatureEyebrow?: string;
  productsFeatureTitle?: string;
  productsFeatureDescription?: string;
  productsFeatureCtaText?: string;
  /** C4P kartının gideceği çalışan ürün/kategori routeu. */
  productsFeatureHref?: string;
  productsCol1Title?: string;
  /** Ürünler menüsünde sol sütundaki ilk kategori başlığı. */
  product1Title?: string;
  /** 3D Yazıcılar kartı alt açıklaması. */
  product1Description?: string;
  /** 3D Yazıcılar kategori routeu. */
  product1Href?: string;
  /** Ürünler menüsünde sol sütundaki ikinci kategori başlığı. */
  product2Title?: string;
  /** Yıkama kartının altında gösterilen kısa açıklama. */
  product2Description?: string;
  /** Yıkama kategorisine giden bağlantı rotası. */
  product2Href?: string;
  /** Ürünler menüsünde sol sütundaki üçüncü kategori başlığı. */
  product3Title?: string;
  /** Kürleme kartının altında gösterilen kısa açıklama. */
  product3Description?: string;
  /** Kürleme cihazları kategorisine giden bağlantı rotası. */
  product3Href?: string;
  productsCol2Title?: string;
  /** Ürünler menüsünde sağ sütundaki ilk kategori başlığı. */
  product4Title?: string;
  /** Dental Reçineler kartının altında gösterilen kısa açıklama. */
  product4Description?: string;
  /** Dental Reçineler kategorisine giden bağlantı rotası. */
  product4Href?: string;
  /** Ürünler menüsünde sağ sütundaki ikinci kategori başlığı. */
  product5Title?: string;
  /** Zirkon Bloklar kartı alt açıklaması. */
  product5Description?: string;
  /** Zirkon Bloklar kategori routeu. */
  product5Href?: string;
  /** Ürünler menüsünde sağ sütundaki üçüncü kategori başlığı. */
  product6Title?: string;
  /** Dental Fırınlar kartı alt açıklaması. */
  product6Description?: string;
  /** Dental Fırınlar kategori routeu. */
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
  /** Referanslar menü linki. Başka sayfadan doğal olarak anasayfaya gider ve #guven hashini taşır. */
  referencesHref?: string;
  academyText?: string;
  academyHref?: string;
  /** Arama sayfası routeu. Tam domain kullanmayın; /search yazın. */
  searchHref?: string;
  /** Hesap giriş routeu. Tam domain kullanmayın; /account/login yazın. */
  accountHref?: string;
  /** Sepet routeu. Tam domain kullanmayın; /cart yazın. */
  cartHref?: string;
  product7Title?: string;
  product7Description?: string;
  product7Href?: string;
  backgroundColor?: string;
  /** Duyuru bandındaki sağ üst dil değiştirici butonunu ve açılır menüsünü gösterir veya gizler. */
  showAnnouncementLangSwitch?: boolean;
  turkishFlagImage?: IkasImage | null;
  turkishText?: string;
  englishFlagImage?: IkasImage | null;
  englishText?: string;
  /** Yüklenen WebP logo görseli. */
  logoImageUrl?: IkasImage | null;
  logoImageAlt?: string;
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
  showAllProductsLink?: boolean;
  showProductsFeatureCard?: boolean;
  /** Öne çıkan ürün kartının arka plan rengi */
  featureCardBgColor?: string;
  /** Öne çıkan ürün kartının yazı rengi */
  featureCardTextColor?: string;
  /** Öne çıkan ürün kartının neon vurgu rengi (rozet, buton kenarı vb.) */
  featureCardAccentColor?: string;
  showProduct1?: boolean;
  showProduct2?: boolean;
  showProduct3?: boolean;
  /** Ürün 1 (3D Yazıcı) ikonunu özel görsel ile değiştir (WebP/PNG). Boşsa varsayılan emoji ikon kullanılır. */
  product1IconImageUrl?: IkasImage | null;
  /** Ürün 2 (Reçine) ikonunu özel görsel ile değiştir (WebP/PNG). Boşsa varsayılan emoji ikon kullanılır. */
  product2IconImageUrl?: IkasImage | null;
  /** Ürün 3 (Fırın/Kürleme) ikonunu özel görsel ile değiştir (WebP/PNG). Boşsa varsayılan emoji ikon kullanılır. */
  product3IconImageUrl?: IkasImage | null;
  showProduct7?: boolean;
  product7IconImageUrl?: IkasImage | null;
  showProduct9?: boolean;
  product9Title?: string;
  product9Description?: string;
  product9Href?: string;
  product9IconImageUrl?: IkasImage | null;
  showProduct4?: boolean;
  showProduct5?: boolean;
  showProduct6?: boolean;
  /** Ürün 4 ikonunu özel görsel ile değiştir (WebP/PNG). Boşsa varsayılan emoji ikon kullanılır. */
  product4IconImageUrl?: IkasImage | null;
  /** Ürün 5 ikonunu özel görsel ile değiştir (WebP/PNG). Boşsa varsayılan emoji ikon kullanılır. */
  product5IconImageUrl?: IkasImage | null;
  /** Ürün 6 ikonunu özel görsel ile değiştir (WebP/PNG). Boşsa varsayılan emoji ikon kullanılır. */
  product6IconImageUrl?: IkasImage | null;
  showProduct8?: boolean;
  product8Title?: string;
  product8Description?: string;
  product8Href?: string;
  product8IconImageUrl?: IkasImage | null;
  showProduct10?: boolean;
  product10Title?: string;
  product10Description?: string;
  product10Href?: string;
  product10IconImageUrl?: IkasImage | null;
  showWhyMenu?: boolean;
  showWhyItem1?: boolean;
  showWhyItem2?: boolean;
  showWhyItem3?: boolean;
  showWhyItem4?: boolean;
  showWhyItem5?: boolean;
  why5Number?: string;
  why5Title?: string;
  why5Description?: string;
  why5Href?: string;
  showWhyItem6?: boolean;
  why6Number?: string;
  why6Title?: string;
  why6Description?: string;
  why6Href?: string;
  showWhyItemGlow?: boolean;
  showReferencesMenu?: boolean;
  /** Anasayfadaki referanslar bölümünün HTML ID değeri (# olmadan, örn: referanslar). */
  referencesSectionId?: string;
  showAcademyMenu?: boolean;
  showSearchButton?: boolean;
  searchPlaceholder?: string;
  /** Özel görsel ikon (WebP/PNG). Yüklenmezse varsayılan büyüteç ikonu görünür. */
  searchIconImageUrl?: IkasImage | null;
  /** Özel vektörel SVG arama ikonu kodu. */
  searchIconSvg?: string;
  /** Profil butonuna tıklandığında açılır hesap panelinin açılmasını sağlar. */
  showProfileMenu?: boolean;
  profileMenuDescription?: string;
  /** Kullanıcı giriş yapmamışken panel altındaki buton metni. */
  profileLoginButtonText?: string;
  /** Kullanıcı giriş yapmışken panel altındaki çıkış buton metni. */
  profileLink6Text?: string;
  profileLink1Text?: string;
  profileLink1Href?: string;
  profileLink2Text?: string;
  profileLink2Href?: string;
  profileLink3Text?: string;
  profileLink3Href?: string;
  profileLink4Text?: string;
  profileLink4Href?: string;
  profileLink5Text?: string;
  profileLink5Href?: string;
  /** Özel görsel ikon (WebP/PNG). Yüklenmezse varsayılan kullanıcı ikonu görünür. */
  accountIconImageUrl?: IkasImage | null;
  /** Özel vektörel SVG hesap ikonu kodu. */
  accountIconSvg?: string;
  /** Sepet butonuna tıklandığında açılır sepet çekmecesinin/panelinin açılmasını sağlar. */
  showStorePanel?: boolean;
  /** Sepet boşken panelde gösterilen buton metni. */
  storePanelButtonText?: string;
  /** Özel görsel ikon (WebP/PNG). Yüklenmezse varsayılan sepet/çanta ikonu görünür. */
  cartIconImageUrl?: IkasImage | null;
  /** Özel vektörel SVG sepet ikonu kodu. */
  cartIconSvg?: string;
  /** Mobil cihazlarda hamburger menü butonunun yardımcı metni. */
  mobileMenuLabel?: string;
  showMobileProductsLink?: boolean;
  /** Mobil menüde görünecek Ürünler buton metni (boş bırakılırsa masaüstü başlığı kullanılır). */
  mobileProductsText?: string;
  /** Mobil menüde Ürünler tıklandığında gidilecek rota. */
  mobileProductsHref?: string;
  /** Mobil menüdeki renkli vurgulu ek linki açıp kapatır. */
  showMobileHighlightLink?: boolean;
  /** Vurgulu butonun üzerinde yazacak başlık metni (örn: Dental Reçineler). */
  mobileHighlightText?: string;
  /** Tıklanınca yönlendirilecek sayfa veya bölüm adresi. */
  mobileHighlightHref?: string;
  showMobileWhyLink?: boolean;
  /** Mobil menüde görünecek Neden 3mash buton metni. */
  mobileWhyText?: string;
  /** Mobil menüde Neden 3mash tıklandığında gidilecek bölüm çapa linki. */
  mobileWhyHref?: string;
  showMobileReferencesLink?: boolean;
  /** Mobil menüde görünecek Referanslar buton metni. */
  mobileReferencesText?: string;
  /** Mobil menüde Referanslar tıklandığında gidilecek bölüm veya sayfa rotası. */
  mobileReferencesHref?: string;
  showMobileAcademyLink?: boolean;
  /** Mobil menüde görünecek Akademi buton metni. */
  mobileAcademyText?: string;
  /** Mobil menüde Akademi tıklandığında gidilecek rota. */
  mobileAcademyHref?: string;
  showMobileAccountLink?: boolean;
  /** Kullanıcı giriş yapmışken mobil menüde görünecek metin. */
  mobileAccountText?: string;
  /** Kullanıcı giriş yapmamışken mobil menüde görünecek metin. */
  mobileLoginText?: string;
  /** Giriş yapılmadığında yönlendirilecek sayfa rotası. */
  mobileAccountHref?: string;
  /** Mobil menü altında Türkçe / İngilizce bayrak ve dil butonları. */
  showMobileLangSwitch?: boolean;
  announcementHighlightTextEn?: string;
  announcementTextEn?: string;
  announcementCtaTextEn?: string;
  productsMenuTextEn?: string;
  allProductsTextEn?: string;
  productsFeatureEyebrowEn?: string;
  productsFeatureTitleEn?: string;
  productsFeatureDescriptionEn?: string;
  productsFeatureCtaTextEn?: string;
  productsCol1TitleEn?: string;
  product1TitleEn?: string;
  product1DescriptionEn?: string;
  product2TitleEn?: string;
  product2DescriptionEn?: string;
  product3TitleEn?: string;
  product3DescriptionEn?: string;
  product7TitleEn?: string;
  product7DescriptionEn?: string;
  product9TitleEn?: string;
  product9DescriptionEn?: string;
  productsCol2TitleEn?: string;
  product4TitleEn?: string;
  product4DescriptionEn?: string;
  product5TitleEn?: string;
  product5DescriptionEn?: string;
  product6TitleEn?: string;
  product6DescriptionEn?: string;
  product8TitleEn?: string;
  product8DescriptionEn?: string;
  product10TitleEn?: string;
  product10DescriptionEn?: string;
  whyMenuTextEn?: string;
  why1TitleEn?: string;
  why1DescriptionEn?: string;
  why2TitleEn?: string;
  why2DescriptionEn?: string;
  why3TitleEn?: string;
  why3DescriptionEn?: string;
  why4TitleEn?: string;
  why4DescriptionEn?: string;
  why5TitleEn?: string;
  why5DescriptionEn?: string;
  why6TitleEn?: string;
  why6DescriptionEn?: string;
  referencesTextEn?: string;
  academyTextEn?: string;
  searchPlaceholderEn?: string;
  profileMenuDescriptionEn?: string;
  profileLoginButtonTextEn?: string;
  profileLink6TextEn?: string;
  profileLink1TextEn?: string;
  profileLink2TextEn?: string;
  profileLink3TextEn?: string;
  profileLink4TextEn?: string;
  profileLink5TextEn?: string;
  storePanelButtonTextEn?: string;
  mobileMenuLabelEn?: string;
  mobileProductsTextEn?: string;
  mobileHighlightTextEn?: string;
  mobileWhyTextEn?: string;
  mobileReferencesTextEn?: string;
  mobileAcademyTextEn?: string;
  mobileAccountTextEn?: string;
  mobileLoginTextEn?: string;
  showActionIcons?: boolean;
  styledPhrase?: string;
  wordStyleEnabled?: boolean;
  styledPhraseBold?: boolean;
  styledPhraseItalic?: boolean;
  announcementStyledPhraseBold?: boolean;
  announcementStyledPhraseItalic?: boolean;
  searchQueryParam?: string;
  showShopperVideo?: boolean;
  /** YouTube Shorts, YouTube veya doğrudan video dosyası bağlantısı. */
  shopperVideoHref?: string;
  /** Canlı arama önerileri ve hızlı sonuçlar için Tüm Ürünler listesini bağlayın. */
  searchProductList?: IkasProductList;
  shopperVideo?: IkasVideo | null;
  shopperVideoWindowWidth?: number;
  shopperVideoWindowHeight?: number;
}
