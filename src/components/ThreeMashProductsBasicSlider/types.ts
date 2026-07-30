// This file is auto-generated — do not edit manually.
import type { IkasProduct, IkasImage } from "@ikas/bp-storefront";

export interface Props {
  /** Ürün sayfasındaki mevcut ürünü bağla. Slider sadece reçine ürünlerinde render edilir. */
  product?: IkasProduct | null;
  /** Kapalıysa ürünler basic slider section render edilmez. */
  sectionVisible?: boolean;
  sectionAnchorId?: string;
  setupMessage?: string;
  carouselAriaLabel?: string;
  showIntro?: boolean;
  introTitle?: string;
  introDescriptionHtml?: string;
  /** left, center veya right yazın. */
  introAlign?: string;
  introMaxWidth?: number;
  introSpacing?: number;
  introTitleFontSize?: number;
  introBodyFontSize?: number;
  imageCount?: number;
  image1Enabled?: boolean;
  /** Boş bırakılırsa component içindeki hazır görsel kullanılır. */
  image1?: IkasImage | null;
  image1Alt?: string;
  image2Enabled?: boolean;
  /** Boş bırakılırsa component içindeki hazır görsel kullanılır. */
  image2?: IkasImage | null;
  image2Alt?: string;
  image3Enabled?: boolean;
  /** Boş bırakılırsa component içindeki hazır görsel kullanılır. */
  image3?: IkasImage | null;
  image3Alt?: string;
  image4Enabled?: boolean;
  /** Boş bırakılırsa component içindeki hazır görsel kullanılır. */
  image4?: IkasImage | null;
  image4Alt?: string;
  image5Enabled?: boolean;
  /** Boş bırakılırsa component içindeki hazır görsel kullanılır. */
  image5?: IkasImage | null;
  image5Alt?: string;
  image6Enabled?: boolean;
  /** Boş bırakılırsa component içindeki hazır görsel kullanılır. */
  image6?: IkasImage | null;
  image6Alt?: string;
  image7Enabled?: boolean;
  /** Boş bırakılırsa component içindeki hazır görsel kullanılır. */
  image7?: IkasImage | null;
  image7Alt?: string;
  image8Enabled?: boolean;
  /** Boş bırakılırsa component içindeki hazır görsel kullanılır. */
  image8?: IkasImage | null;
  image8Alt?: string;
  image9Enabled?: boolean;
  /** Boş bırakılırsa component içindeki hazır görsel kullanılır. */
  image9?: IkasImage | null;
  image9Alt?: string;
  maxWidth?: number;
  paddingTop?: number;
  paddingBottom?: number;
  visibleImagesDesktop?: number;
  visibleImagesTablet?: number;
  imageGap?: number;
  carouselDurationSeconds?: number;
  pauseOnHover?: boolean;
  edgeFadeWidth?: number;
  imageWidth?: number;
  imageHeight?: number;
  imageXOffset?: number;
  imageYOffset?: number;
  /** contain, cover, fill veya scale-down. */
  imageFit?: string;
  imageScale?: number;
  imageOpacity?: number;
  imageBrightness?: number;
  imageContrast?: number;
  imageSaturation?: number;
  imageHue?: number;
  imageInvert?: number;
  backgroundColor?: string;
  textColor?: string;
  subTextColor?: string;
  /** CRS kaynaklı reusable ürün template datası. Doluysa source'da karşılığı olmayan bu section ürün template'inde render edilmez. */
  productTemplateJson?: string;
}
