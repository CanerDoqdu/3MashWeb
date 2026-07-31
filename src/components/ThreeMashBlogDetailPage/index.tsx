import {
  createMediaSrcset,
  getDefaultSrc,
  getIkasBlogFormattedDate,
} from "@ikas/bp-storefront";
import { Props } from "./types";

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

export function ThreeMashBlogDetailPage(props: Props) {
  const blog = props.blog;
  const style = {
    "--tm-blog-detail-bg": themeToken(
      props.backgroundColor,
      "#f6f7f3",
      "--tm-theme-bg",
    ),
    "--tm-blog-detail-text": themeToken(
      props.textColor,
      "#10120f",
      "--tm-theme-text",
    ),
    "--tm-blog-detail-muted": themeToken(
      props.mutedTextColor,
      "#64695f",
      "--tm-theme-muted",
    ),
    "--tm-blog-detail-line": themeToken(
      props.lineColor,
      "#dfe3da",
      "--tm-theme-line",
    ),
    "--tm-blog-detail-accent": themeToken(
      props.accentColor,
      "#c7f136",
      "--tm-theme-accent",
    ),
  } as any;

  if (!blog) {
    return (
      <section className="three-mash-blog-detail" style={style}>
        <div className="tm-blog-detail-wrap">
          <div className="tm-blog-detail-setup">
            {props.setupMessage ||
              "Bu sayfanın canlı blog detayı göstermesi için ikas editörde Blog alanını bağlayın."}
          </div>
        </div>
      </section>
    );
  }

  const image = blog.image;

  return (
    <article className="three-mash-blog-detail" style={style}>
      <div className="tm-blog-detail-wrap">
        <a className="tm-blog-detail-back" href={props.backLinkHref || "/blog"}>
          ← {props.backLinkText || "Blog'a dön"}
        </a>
        <header className="tm-blog-detail-head">
          <span className="tm-blog-detail-kicker">MASH ACADEMY</span>
          <div className="tm-blog-detail-meta">
            {blog.category?.name ? <span>{blog.category.name}</span> : null}
            <time>{getIkasBlogFormattedDate(blog)}</time>
          </div>
          <h1>{blog.title}</h1>
          {blog.shortDescription ? <p>{blog.shortDescription}</p> : null}
        </header>

        {image ? (
          <div className="tm-blog-detail-media">
            <img
              src={getDefaultSrc(image)}
              srcSet={createMediaSrcset(image)}
              alt={image.altText || blog.title}
              loading="eager"
              decoding="async"
            />
          </div>
        ) : null}

        <div
          className="tm-blog-detail-content"
          dangerouslySetInnerHTML={{ __html: blog.blogContent?.content || "" }}
        />
      </div>
    </article>
  );
}

export default ThreeMashBlogDetailPage;
