import {
  createMediaSrcset,
  getBlogListNextPage,
  getBlogListPage,
  getBlogListPrevPage,
  getDefaultSrc,
  getIkasBlogCategoryHref,
  getIkasBlogFormattedDate,
  getIkasBlogHref,
  hasBlogListNextPage,
  hasBlogListPrevPage,
  type IkasBlog,
} from "@ikas/bp-storefront";
import { Props } from "./types";
import { isEnglishLocale, tLocalized } from "../../utils/i18n";

function localizedText(
  value: string | undefined,
  valueEn: string | undefined,
  fallback: string,
) {
  const localizedValue = isEnglishLocale() ? valueEn : value;
  return localizedValue?.trim() || fallback;
}

function themeToken(
  value: string | undefined,
  defaultValue: string,
  tokenName: string,
) {
  const trimmed = value?.trim();
  if (trimmed && trimmed.toLowerCase() !== defaultValue.toLowerCase())
    return trimmed;
  return `var(${tokenName}, ${defaultValue})`;
}

function BlogCard({
  blog,
  readMoreText,
  featured = false,
  showCategory,
  showDate,
  showExcerpt,
  showReadMore,
}: {
  blog: IkasBlog;
  readMoreText: string;
  featured?: boolean;
  showCategory: boolean;
  showDate: boolean;
  showExcerpt: boolean;
  showReadMore: boolean;
}) {
  const image = blog.image;
  const formattedDate = getIkasBlogFormattedDate(blog);
  const hasMeta =
    (showCategory && !!blog.category?.name) || (showDate && !!formattedDate);
  const href =
    getIkasBlogHref(blog) || `/blog/${blog.metadata?.slug || blog.id}`;

  return (
    <a className={`tm-blog-card${featured ? " is-featured" : ""}`} href={href}>
      <div className="tm-blog-card-media">
        {image ? (
          <img
            src={getDefaultSrc(image)}
            srcSet={createMediaSrcset(image)}
            alt={image.altText || blog.title}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="tm-blog-card-fallback" aria-hidden="true">
            {blog.title.slice(0, 1)}
          </div>
        )}
      </div>
      <div className="tm-blog-card-body">
        {hasMeta ? (
          <div className="tm-blog-card-meta">
            {showCategory && blog.category?.name ? (
              <span>{blog.category.name}</span>
            ) : null}
            {showDate && formattedDate ? <time>{formattedDate}</time> : null}
          </div>
        ) : null}
        <h2>{blog.title}</h2>
        {showExcerpt && blog.shortDescription ? (
          <p>{blog.shortDescription}</p>
        ) : null}
        {showReadMore ? <em>{readMoreText} →</em> : null}
      </div>
    </a>
  );
}

export function ThreeMashBlogListingPage(props: Props) {
  const blogList = props.blogList;
  const blogs = blogList?.data || [];
  const categories = props.blogCategoryList?.data || [];
  const currentPage = blogList?.page ?? 1;
  const readMoreText = localizedText(
    props.readMoreText,
    props.readMoreTextEn,
    tLocalized("Oku", "Read"),
  );
  const showCardCategory = props.showCardCategory !== false;
  const showCardDate = props.showCardDate !== false;
  const showCardExcerpt = props.showCardExcerpt !== false;
  const showReadMore = props.showReadMore !== false;
  const showListHeader =
    props.showPageIntro !== false ||
    (!!blogList && props.showPostCount !== false);

  const handlePageChange = async (targetPage: number) => {
    if (!blogList || targetPage < 1) return;
    await getBlogListPage(blogList, targetPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const style = {
    "--tm-blog-bg": themeToken(
      props.backgroundColor,
      "#f6f7f3",
      "--tm-theme-bg",
    ),
    "--tm-blog-text": themeToken(props.textColor, "#10120f", "--tm-theme-text"),
    "--tm-blog-muted": themeToken(
      props.mutedTextColor,
      "#64695f",
      "--tm-theme-muted",
    ),
    "--tm-blog-card": themeToken(
      props.cardColor,
      "#ffffff",
      "--tm-theme-panel",
    ),
    "--tm-blog-line": themeToken(props.lineColor, "#dfe3da", "--tm-theme-line"),
    "--tm-blog-accent": themeToken(
      props.accentColor,
      "#c7f136",
      "--tm-theme-accent",
    ),
  } as any;

  return (
    <section className="three-mash-blog-page" style={style}>
      <div className="tm-blog-wrap">
        {showListHeader ? (
          <div className="tm-blog-head">
            {props.showPageIntro !== false ? (
              <div>
                <p className="tm-blog-eyebrow">
                  {localizedText(
                    props.eyebrowText,
                    props.eyebrowTextEn,
                    tLocalized("MASH ACADEMY", "MASH ACADEMY"),
                  )}
                </p>
                <h1>
                  {localizedText(
                    props.titleText,
                    props.titleTextEn,
                    tLocalized(
                      "Dental üretim notları.",
                      "Dental manufacturing notes.",
                    ),
                  )}
                </h1>
                <span>
                  {localizedText(
                    props.descriptionText,
                    props.descriptionTextEn,
                    tLocalized(
                      "ikas blog panelinden yayınlanan içerikler bu sayfada canlı olarak listelenir.",
                      "Articles published from the ikas blog panel are listed live on this page.",
                    ),
                  )}
                </span>
              </div>
            ) : null}
            {blogList && props.showPostCount !== false ? (
              <div className="tm-blog-count">
                <strong>{blogList.count ?? blogs.length}</strong>
                <span>
                  {localizedText(
                    props.postCountLabel,
                    props.postCountLabelEn,
                    tLocalized("yazı", "posts"),
                  )}
                </span>
              </div>
            ) : null}
          </div>
        ) : null}

        {props.showCategoryNav !== false && categories.length > 0 ? (
          <nav
            className="tm-blog-categories"
            aria-label={localizedText(
              props.categoryNavLabel,
              props.categoryNavLabelEn,
              tLocalized("Blog kategorileri", "Blog categories"),
            )}
          >
            {categories.map((category) => (
              <a href={getIkasBlogCategoryHref(category)} key={category.id}>
                {category.name}
              </a>
            ))}
          </nav>
        ) : null}

        {!blogList ? (
          props.showSetupMessage !== false ? (
            <div className="tm-blog-setup">
              {localizedText(
                props.setupMessage,
                props.setupMessageEn,
                tLocalized(
                  "Blog yazıları kısa süre içinde burada listelenecek.",
                  "Blog posts will be listed here shortly.",
                ),
              )}
            </div>
          ) : null
        ) : blogs.length > 0 ? (
          <>
            <div
              className={`tm-blog-grid${blogs.length === 1 ? " is-single" : ""}`}
            >
              {blogs.map((blog) => (
                <BlogCard
                  blog={blog}
                  readMoreText={readMoreText}
                  showCategory={showCardCategory}
                  showDate={showCardDate}
                  showExcerpt={showCardExcerpt}
                  showReadMore={showReadMore}
                  key={blog.id}
                />
              ))}
            </div>
            {props.showPagination !== false ? (
              <div className="tm-blog-pagination">
                <button
                  type="button"
                  disabled={!hasBlogListPrevPage(blogList)}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  {localizedText(
                    props.previousPageText,
                    props.previousPageTextEn,
                    tLocalized("Önceki", "Previous"),
                  )}
                </button>
                <span>{currentPage}</span>
                <button
                  type="button"
                  disabled={!hasBlogListNextPage(blogList)}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  {localizedText(
                    props.nextPageText,
                    props.nextPageTextEn,
                    tLocalized("Sonraki", "Next"),
                  )}
                </button>
              </div>
            ) : null}
          </>
        ) : props.showEmptyState !== false ? (
          <div className="tm-blog-empty">
            <h2>
              {localizedText(
                props.emptyTitle,
                props.emptyTitleEn,
                tLocalized("Blog yazısı bulunamadı", "No blog posts found"),
              )}
            </h2>
            <p>
              {localizedText(
                props.emptyMessage,
                props.emptyMessageEn,
                tLocalized(
                  "Bu listeye bağlı yayında olan blog yazısı yok.",
                  "No published blog posts are connected to this list.",
                ),
              )}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default ThreeMashBlogListingPage;
