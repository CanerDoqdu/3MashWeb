// This file is auto-generated — do not edit manually.
import type { IkasProduct, IkasImage } from "@ikas/bp-storefront";

export interface Props {
  /** Ürün sayfasındaki mevcut ürünü bağla. Component sadece ArgenZ zirkon blok ürünlerinde render eder. */
  product?: IkasProduct | null;
  /** Sadece zirkon blok ürün sayfalarında gösterilecek büyük görsel. */
  image?: IkasImage | null;
  /** CRS kaynaklı reusable ürün template datası. Doluysa source'da karşılığı olmayan bu section ürün template'inde render edilmez. */
  productTemplateJson?: string;
  backgroundColor?: string;
}
