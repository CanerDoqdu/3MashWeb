// This file is auto-generated — do not edit manually.
import type { IkasBlogList, IkasBlogCategoryList } from "@ikas/bp-storefront";

export interface Props {
  /** Tüm bloglara ya da istenen blog kategorisi/listesine bağlayın. Yeni ikas blog yazıları burada otomatik görünür. */
  blogList: IkasBlogList;
  /** İsteğe bağlı dinamik blog kategori etiketleri. */
  blogCategoryList?: IkasBlogCategoryList;
  eyebrowText?: string;
  titleText?: string;
  descriptionText?: string;
  readMoreText?: string;
  emptyTitle?: string;
  emptyMessage?: string;
  setupMessage?: string;
  backgroundColor?: string;
  textColor?: string;
  mutedTextColor?: string;
  cardColor?: string;
  lineColor?: string;
  accentColor?: string;
}
