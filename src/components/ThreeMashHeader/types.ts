// This file is auto-generated — do not edit manually.
import type { IkasImage, IkasProductList } from "@ikas/bp-storefront";
import type { LogoImageFit } from "../../global-types";

export interface Props {
  showAnnouncement?: boolean;
  announcementHighlightText?: string;
  announcementText?: string;
  announcementCtaText?: string;
  announcementHref?: string;
  /** Duyuru bandındaki sağ üst dil değiştirici butonunu ve açılır menüsünü gösterir veya gizler. */
  showAnnouncementLangSwitch?: boolean;
  turkishFlagImage?: IkasImage | null;
  turkishText?: string;
  englishFlagImage?: IkasImage | null;
  englishText?: string;
  /** Yüklenen WebP logo görseli. */
  logoImageUrl?: IkasImage | null;
  /** Logo tıklandığında gidilecek anasayfa adresi. */
  logoHref?: string;
  logoImageAlt?: string;
  /** Görsel yüklenmediğinde veya ekran okuyucular için metin. */
  logoText?: string;
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
  productsMenuText?: string;
  showAllProductsLink?: boolean;
  allProductsText?: string;
  allProductsHref?: string;
  showProductsFeatureCard?: boolean;
  productsFeatureEyebrow?: string;
  productsFeatureTitle?: string;
  productsFeatureDescription?: string;
  productsFeatureCtaText?: string;
  /** Öne çıkan kartın yönlendireceği ürün veya kategori sayfası. */
  productsFeatureHref?: string;
  /** Öne çıkan ürün kartının arka plan rengi */
  featureCardBgColor?: string;
  /** Öne çıkan ürün kartının yazı rengi */
  featureCardTextColor?: string;
  /** Öne çıkan ürün kartının neon vurgu rengi (rozet, buton kenarı vb.) */
  featureCardAccentColor?: string;
  productsCol1Title?: string;
  showProduct1?: boolean;
  product1Title?: string;
  product1Description?: string;
  product1Href?: string;
  showProduct2?: boolean;
  product2Title?: string;
  product2Description?: string;
  product2Href?: string;
  showProduct3?: boolean;
  product3Title?: string;
  product3Description?: string;
  product3Href?: string;
  /** Ürün 1 (3D Yazıcı) ikonunu özel görsel ile değiştir (WebP/PNG). Boşsa varsayılan emoji ikon kullanılır. */
  product1IconImageUrl?: IkasImage | null;
  /** Ürün 2 (Reçine) ikonunu özel görsel ile değiştir (WebP/PNG). Boşsa varsayılan emoji ikon kullanılır. */
  product2IconImageUrl?: IkasImage | null;
  /** Ürün 3 (Fırın/Kürleme) ikonunu özel görsel ile değiştir (WebP/PNG). Boşsa varsayılan emoji ikon kullanılır. */
  product3IconImageUrl?: IkasImage | null;
  showProduct7?: boolean;
  product7Title?: string;
  product7Description?: string;
  product7Href?: string;
  product7IconImageUrl?: IkasImage | null;
  showProduct9?: boolean;
  product9Title?: string;
  product9Description?: string;
  product9Href?: string;
  product9IconImageUrl?: IkasImage | null;
  productsCol2Title?: string;
  showProduct4?: boolean;
  product4Title?: string;
  product4Description?: string;
  product4Href?: string;
  showProduct5?: boolean;
  product5Title?: string;
  product5Description?: string;
  product5Href?: string;
  showProduct6?: boolean;
  product6Title?: string;
  product6Description?: string;
  product6Href?: string;
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
  whyMenuText?: string;
  showWhyItem1?: boolean;
  why1Number?: string;
  why1Title?: string;
  why1Description?: string;
  /** Tıklanınca gidilecek çapa (#sebep, #cozum vb.) veya sayfa linki (örn: / veya /urunler). Varsayılan: / */
  why1Href?: string;
  showWhyItem2?: boolean;
  why2Number?: string;
  why2Title?: string;
  why2Description?: string;
  /** Tıklanınca gidilecek çapa (#sebep, #cozum vb.) veya sayfa linki. Sayfa içi bölüm için /#sebep yazın. */
  why2Href?: string;
  showWhyItem3?: boolean;
  why3Number?: string;
  why3Title?: string;
  why3Description?: string;
  /** Tıklanınca gidilecek çapa (#cozum vb.) veya sayfa linki. Sayfa içi bölüm için /#cozum yazın. */
  why3Href?: string;
  showWhyItem4?: boolean;
  why4Number?: string;
  why4Title?: string;
  why4Description?: string;
  /** Tıklanınca gidilecek çapa (#kurleme vb.) veya sayfa linki. Sayfa içi bölüm için /#kurleme yazın. */
  why4Href?: string;
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
  referencesText?: string;
  /** Tıklanınca gidilecek bölüm çapa linki (örn: /#referanslar) veya sayfa rotası (örn: /referanslar). Varsayılan: /#referanslar */
  referencesHref?: string;
  /** Anasayfadaki referanslar bölümünün HTML ID değeri (# olmadan, örn: referanslar). */
  referencesSectionId?: string;
  showAcademyMenu?: boolean;
  academyText?: string;
  /** Mash Academy sayfasına giden rota veya bağlantı adresi. */
  academyHref?: string;
  showSearchButton?: boolean;
  searchPlaceholder?: string;
  /** Arama yapıldığında sonuçların listeleneceği sayfa rotası. */
  searchHref?: string;
  /** Canlı arama önerileri ve hızlı sonuçlar için Tüm Ürünler listesini bağlayın. */
  searchProductList?: IkasProductList;
  /** Özel görsel ikon (WebP/PNG). Yüklenmezse varsayılan büyüteç ikonu görünür. */
  searchIconImageUrl?: IkasImage | null;
  /** Özel vektörel SVG arama ikonu kodu. */
  searchIconSvg?: string;
  /** Profil butonuna tıklandığında açılır hesap panelinin açılmasını sağlar. */
  showProfileMenu?: boolean;
  /** Giriş yapmamış kullanıcıların yönlendirileceği sayfa rotası. */
  accountHref?: string;
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
  /** Sepet sayfasına giden rota. */
  cartHref?: string;
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
}
