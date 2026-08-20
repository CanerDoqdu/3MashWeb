// This file is auto-generated — do not edit manually.
import type { IkasProduct, IkasNavigationLink } from "@ikas/bp-storefront";

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
  inStockText?: string;
  quantityText?: string;
  skuText?: string;
  brandText?: string;
  categoryText?: string;
  descriptionTitle?: string;
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
}
