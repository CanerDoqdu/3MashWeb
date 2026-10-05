// This file is auto-generated — do not edit manually.
import type { IkasProduct, IkasNavigationLink, IkasImage } from "@ikas/bp-storefront";

export interface Props {
  /** Geçerli ikas ürün verisi bağlantısı */
  product?: IkasProduct | null;
  /** Üst bant sol kalın vurgulu metin (Örn: Fırsatı kaçırmayın.) */
  announcementStrongText?: string;
  /** Üst bant kampanya ve kalibrasyon açıklama metni */
  announcementText?: string;
  /** Üst bant sağ buton metni (Örn: Ücretsiz parametre uyumlaması →) */
  announcementButtonText?: string;
  /** Duyuru butonu hedef bağlantısı */
  announcementButtonHref?: IkasNavigationLink | null;
  /** Breadcrumb kategori adı (Örn: Dental Reçineler) */
  breadcrumbCategoryText?: string;
  /** Breadcrumb kategori bağlantısı */
  breadcrumbCategoryHref?: IkasNavigationLink | null;
  /** Başlığın hemen üstündeki kategori ve ürün üst etiketi */
  heroKicker?: string;
  /** Ürün ana başlığı (vurgu için <em> veya <b> kullanabilirsiniz) */
  heroTitleHtml?: string;
  /** Başlığın altındaki zengin ürün tanıtım açıklaması */
  heroDescriptionHtml?: string;
  /** 1. teknik özellik rozetinin kalın değeri */
  heroPill1Value?: string;
  /** 1. teknik özellik rozetinin açıklama etiketi */
  heroPill1Label?: string;
  /** 2. teknik özellik rozetinin kalın değeri */
  heroPill2Value?: string;
  /** 2. teknik özellik rozetinin açıklama etiketi */
  heroPill2Label?: string;
  /** 3. teknik özellik rozetinin kalın değeri */
  heroPill3Value?: string;
  /** 3. teknik özellik rozetinin açıklama etiketi */
  heroPill3Label?: string;
  /** 4. teknik özellik rozetinin kalın değeri */
  heroPill4Value?: string;
  /** 4. teknik özellik rozetinin açıklama etiketi */
  heroPill4Label?: string;
  /** Ürün görselinin üzerinde yer alan sertifika rozeti */
  galleryBadge?: string;
  /** Varyant seçim özetinin sol başlığı */
  selectedPrefix?: string;
  /** Varyant seçim özetinin sağındaki teknik destek notu */
  summarySuffix?: string;
  addToCartText?: string;
  addingToCartText?: string;
  outOfStockText?: string;
  whatsappButtonText?: string;
  /** Boş bırakılırsa ürün adına özel otomatik WhatsApp mesajı oluşturulur */
  whatsappButtonHref?: IkasNavigationLink | null;
  trustBadge1?: string;
  trustBadge2?: string;
  trustBadge3?: string;
  categoryText?: string;
  setupMessage?: string;
  optionRequiredMessage?: string;
  addToCartErrorMessage?: string;
  backgroundColor?: string;
  textColor?: string;
  mutedTextColor?: string;
  panelColor?: string;
  lineColor?: string;
  accentColor?: string;
  showTemplatePreview?: boolean;
  /** CRS Composite kaynak yapısındaki reusable template datası. Boş bırakılırsa ürünün varsayılan şablon datası kullanılır. */
  productTemplateJson?: string;
  announcementStrongTextEn?: string;
  announcementTextEn?: string;
  announcementButtonTextEn?: string;
  breadcrumbHomeText?: string;
  breadcrumbHomeTextEn?: string;
  breadcrumbHomeHref?: IkasNavigationLink | null;
  breadcrumbCategoryTextEn?: string;
  categoryTextEn?: string;
  heroKickerEn?: string;
  heroTitleHtmlEn?: string;
  heroDescriptionHtmlEn?: string;
  heroPill1ValueEn?: string;
  heroPill1LabelEn?: string;
  heroPill2ValueEn?: string;
  heroPill2LabelEn?: string;
  heroPill3ValueEn?: string;
  heroPill3LabelEn?: string;
  heroPill4ValueEn?: string;
  heroPill4LabelEn?: string;
  galleryBadgeEn?: string;
  selectedPrefixEn?: string;
  summarySuffixEn?: string;
  addToCartTextEn?: string;
  addingToCartTextEn?: string;
  outOfStockTextEn?: string;
  whatsappButtonTextEn?: string;
  trustBadge1En?: string;
  trustBadge2En?: string;
  trustBadge3En?: string;
  setupMessageEn?: string;
  optionRequiredMessageEn?: string;
  addToCartErrorMessageEn?: string;
  heroPill5Value?: string;
  heroPill5Label?: string;
  heroPill5ValueEn?: string;
  heroPill5LabelEn?: string;
  heroPill6Value?: string;
  heroPill6Label?: string;
  heroPill6ValueEn?: string;
  heroPill6LabelEn?: string;
  galleryImage1?: IkasImage | null;
  galleryImage2?: IkasImage | null;
  galleryImage3?: IkasImage | null;
  galleryImage4?: IkasImage | null;
  galleryImage5?: IkasImage | null;
  galleryImage1Alt?: string;
  galleryImage1AltEn?: string;
  galleryImage2Alt?: string;
  galleryImage2AltEn?: string;
  galleryImage3Alt?: string;
  galleryImage3AltEn?: string;
  galleryImage4Alt?: string;
  galleryImage4AltEn?: string;
  galleryImage5Alt?: string;
  galleryImage5AltEn?: string;
  galleryThumbAriaLabel?: string;
  galleryThumbAriaLabelEn?: string;
  /** Ülke koduyla, yalnızca rakamlardan oluşan numara. */
  whatsappPhoneNumber?: string;
  /** {productName} ve {productUrl} alanları ürün adı ve sayfa adresiyle değiştirilir. */
  whatsappMessageTemplate?: string;
  whatsappMessageTemplateEn?: string;
  previewColorLabel?: string;
  previewColorLabelEn?: string;
  previewSizeLabel?: string;
  previewSizeLabelEn?: string;
  previewColor1?: string;
  previewColor1En?: string;
  previewColor2?: string;
  previewColor2En?: string;
  previewColor3?: string;
  previewColor3En?: string;
  previewSize1?: string;
  previewSize1En?: string;
  previewSize2?: string;
  previewSize2En?: string;
  trustBadgeIconImage?: IkasImage | null;
  previewColorHex1?: string;
  previewColorHex2?: string;
  previewColorHex3?: string;
  showAnnouncement?: boolean;
  showBreadcrumb?: boolean;
  showHeroKicker?: boolean;
  showHeroDescription?: boolean;
  showHeroPills?: boolean;
  showGallery?: boolean;
  showGalleryBadge?: boolean;
  showSelectionSummary?: boolean;
  showAddToCartButton?: boolean;
  showWhatsAppButton?: boolean;
  showTrustBadges?: boolean;
  showHeroPill5?: boolean;
  showHeroPill6?: boolean;
  loginRequiredMessage?: string;
  loginRequiredMessageEn?: string;
}
