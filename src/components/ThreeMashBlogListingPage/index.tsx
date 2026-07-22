import {
  createMediaSrcset,
  getBlogListNextPage,
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

function themeToken(value: string | undefined, defaultValue: string, tokenName: string) {
  const trimmed = value?.trim();
  if (trimmed && trimmed.toLowerCase() !== defaultValue.toLowerCase()) return trimmed;
  return `var(${tokenName}, ${defaultValue})`;
}

function BlogCard({ blog, readMoreText }: { blog: IkasBlog; readMoreText: string }) {
  const image = blog.image;
  const href = getIkasBlogHref(blog) || `/blog/${blog.metadata?.slug || blog.id}`;

  return (
    <a className="tm-blog-card" href={href}>
      <div className="tm-blog-card-media">
        {image ? (
          <img src={getDefaultSrc(image)} srcSet={createMediaSrcset(image)} alt={image.altText || blog.title} loading="lazy" decoding="async" />
        ) : (
          <div className="tm-blog-card-fallback" aria-hidden="true">{blog.title.slice(0, 1)}</div>
        )}
      </div>
      <div className="tm-blog-card-body">
        <div className="tm-blog-card-meta">
          {blog.category?.name ? <span>{blog.category.name}</span> : null}
          <time>{getIkasBlogFormattedDate(blog)}</time>
        </div>
        <h2>{blog.title}</h2>
        {blog.shortDescription ? <p>{blog.shortDescription}</p> : null}
        <em>{readMoreText}</em>
      </div>
    </a>
  );
}

export function ThreeMashBlogListingPage(props: Props) {
  const blogList = props.blogList;
  const blogs = blogList?.data || [];
  const categories = props.blogCategoryList?.data || [];
  const style = {
    "--tm-blog-bg": themeToken(props.backgroundColor, "#f6f7f3", "--tm-theme-bg"),
    "--tm-blog-text": themeToken(props.textColor, "#10120f", "--tm-theme-text"),
    "--tm-blog-muted": themeToken(props.mutedTextColor, "#64695f", "--tm-theme-muted"),
    "--tm-blog-card": themeToken(props.cardColor, "#ffffff", "--tm-theme-panel"),
    "--tm-blog-line": themeToken(props.lineColor, "#dfe3da", "--tm-theme-line"),
    "--tm-blog-accent": themeToken(props.accentColor, "#c7f136", "--tm-theme-accent"),
  } as any;

  return (
    <section className="three-mash-blog-page" style={style}>
      <div className="tm-blog-wrap">
        <div className="tm-blog-head">
          <div>
            <p className="tm-blog-eyebrow">{props.eyebrowText || "MASH ACADEMY"}</p>
            <h1>{props.titleText || "Blog"}</h1>
            <span>{props.descriptionText || "ikas blog panelinden yayınlanan içerikler bu sayfada canlı olarak listelenir."}</span>
          </div>
          {blogList ? (
            <div className="tm-blog-count">
              <strong>{blogList.count ?? blogs.length}</strong>
              <span>yazı</span>
            </div>
          ) : null}
        </div>

        {categories.length > 0 ? (
          <nav className="tm-blog-categories" aria-label="Blog kategorileri">
            {categories.map((category) => (
              <a href={getIkasBlogCategoryHref(category)} key={category.id}>{category.name}</a>
            ))}
          </nav>
        ) : null}

        {!blogList ? (
          <div className="tm-blog-setup">
            {props.setupMessage || "Bu sayfanın canlı blogları göstermesi için ikas editörde Blog List alanını All Blogs veya ilgili kategori olarak bağlayın."}
          </div>
        ) : blogs.length > 0 ? (
          <>
            <div className="tm-blog-grid">
              {blogs.map((blog) => (
                <BlogCard blog={blog} readMoreText={props.readMoreText || "Oku"} key={blog.id} />
              ))}
            </div>
            <div className="tm-blog-pagination">
              <button type="button" disabled={!hasBlogListPrevPage(blogList)} onClick={() => getBlogListPrevPage(blogList)}>Önceki</button>
              <span>{blogList.page || 1}</span>
              <button type="button" disabled={!hasBlogListNextPage(blogList)} onClick={() => getBlogListNextPage(blogList)}>Sonraki</button>
            </div>
          </>
        ) : (
          <div className="tm-blog-empty">
            <h2>{props.emptyTitle || "Blog yazısı bulunamadı"}</h2>
            <p>{props.emptyMessage || "Bu listeye bağlı yayında olan blog yazısı yok."}</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ThreeMashBlogListingPage;
