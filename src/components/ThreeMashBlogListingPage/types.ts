// This file is auto-generated — do not edit manually.
import type { IkasBlogList, IkasBlogCategoryList } from "@ikas/bp-storefront";

export interface Props {
  /** Tüm yazıları ya da belirli kategori/yazıları seçin; yeni yayınlanan yazılar canlı görünür. */
  blogList: IkasBlogList;
  /** İsteğe bağlı olarak blog kategori bağlantılarını gösterir. */
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
  eyebrowTextEn?: string;
  titleTextEn?: string;
  descriptionTextEn?: string;
  readMoreTextEn?: string;
  emptyTitleEn?: string;
  emptyMessageEn?: string;
  setupMessageEn?: string;
  postCountLabel?: string;
  postCountLabelEn?: string;
  categoryNavLabel?: string;
  categoryNavLabelEn?: string;
  previousPageText?: string;
  previousPageTextEn?: string;
  nextPageText?: string;
  nextPageTextEn?: string;
  showPageIntro?: boolean;
  showPostCount?: boolean;
  showCategoryNav?: boolean;
  showCardCategory?: boolean;
  showCardDate?: boolean;
  showCardExcerpt?: boolean;
  showReadMore?: boolean;
  showPagination?: boolean;
  showSetupMessage?: boolean;
  showEmptyState?: boolean;
}
