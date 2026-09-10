import {
  createMediaSrcset,
  getDefaultSrc,
  getIkasBlogFormattedDate,
} from "@ikas/bp-storefront";
import { Props } from "./types";
import { localizedHref, tLocalized, tProp } from "../../utils/i18n";
import { sanitizeHtml } from "../../utils/sanitizeHtml";
import { safeNavigationHref } from "../../utils/safeRedirect";

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Resolve a colour prop, falling back to a CSS variable. */
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

/** Strip HTML tags and estimate reading time in minutes. */
function estimateReadingTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const words = text ? text.split(" ").length : 0;
  return Math.max(1, Math.round(words / 200));
}

// ─── Component ──────────────────────────────────────────────────────────────

export function ThreeMashBlogDetailPage(props: Props) {
  const blog = props.blog;

  // ── CSS custom properties driven by props ───────────────────────────────
  const style = {
    "--tm-bda-bg": themeToken(props.backgroundColor, "#f6f7f3", "--tm-theme-bg"),
    "--tm-bda-text": themeToken(props.textColor, "#10120f", "--tm-theme-text"),
    "--tm-bda-muted": themeToken(
      props.mutedTextColor,
      "#64695f",
      "--tm-theme-muted",
    ),
    "--tm-bda-line": themeToken(props.lineColor, "#dfe3da", "--tm-theme-line"),
    "--tm-bda-accent": themeToken(
      props.accentColor,
      "#c7f136",
      "--tm-theme-accent",
    ),
    "--tm-bda-content-width": props.contentWidth?.trim() || "720px",
    "--tm-bda-body-size": props.bodyFontSize?.trim() || "19px",
  } as any;

  // ── Resolved layout options ─────────────────────────────────────────────
  const heroWidth = props.heroImageWidth || "wide";
  const titleAlign = props.titleAlign || "left";
  const headerSpacing = props.headerSpacing || "generous";

  const showPublicationLabel = props.showPublicationLabel !== false;
  const showCategory = props.showCategory !== false;
  const showReadingTime = props.showReadingTime !== false;
  const showAuthor = props.showAuthor !== false;

  // ── Empty / setup state ─────────────────────────────────────────────────
  if (!blog) {
    return (
      <section className="three-mash-blog-detail" style={style}>
        <div className="tm-bda-wrap">
          <div className="tm-bda-setup">
            {props.setupMessage ||
              tLocalized("Blog yazısı kısa süre içinde burada gösterilecek.", "Blog post will be displayed here shortly.")}
          </div>
        </div>
      </section>
    );
  }

  // ── Computed values ─────────────────────────────────────────────────────
  const image = blog.image;
  const formattedDate = getIkasBlogFormattedDate(blog);
  const readingTime = showReadingTime
    ? estimateReadingTime(blog.blogContent?.content || "")
    : 0;

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <article
      className={`three-mash-blog-detail tm-bda-spacing-${headerSpacing}`}
      style={style}
    >
      <div className="tm-bda-wrap">

        {/* ← Back link — quiet, editorial */}
        <a
          className="tm-bda-back"
          href={safeNavigationHref(localizedHref(props.backLinkHref || tLocalized("/blog", "/blog")), tLocalized("/blog", "/blog"))}
          aria-label={props.backLinkText || tLocalized("Blog'a dön", "Back to blog")}
        >
          <span aria-hidden="true">←</span>
          <span>{props.backLinkText || tLocalized("Blog'a dön", "Back to blog")}</span>
        </a>

        {/* ── Article header ────────────────────────────────────────────── */}
        <header
          className={`tm-bda-header tm-bda-align-${titleAlign}`}
        >

          {/* Publication eyebrow */}
          {showPublicationLabel && (
            <span className="tm-bda-eyebrow" aria-label={tLocalized("Yayın etiketi", "Publication tag")}>
              {tLocalized("MASH ACADEMY", "MASH ACADEMY")}
            </span>
          )}

          {/* Category */}
          {showCategory && blog.category?.name && (
            <span className="tm-bda-category">{blog.category.name}</span>
          )}

          {/* Dominant title */}
          <h1 className="tm-bda-title">{blog.title}</h1>

          {/* Subtitle / excerpt */}
          {blog.shortDescription && (
            <p className="tm-bda-subtitle">{blog.shortDescription}</p>
          )}

          {/* Meta strip — date + reading time */}
          {showAuthor && (
            <div className="tm-bda-meta">
              {formattedDate && (
                <time className="tm-bda-meta-date" dateTime={formattedDate}>
                  {formattedDate}
                </time>
              )}
              {showReadingTime && readingTime > 0 && (
                <>
                  <span className="tm-bda-meta-sep" aria-hidden="true">·</span>
                  <span className="tm-bda-meta-reading">
                    {readingTime} {tLocalized("dk okuma", "min read")}
                  </span>
                </>
              )}
            </div>
          )}
        </header>

        {/* ── Hero image ─────────────────────────────────────────────────── */}
        {image && (
          <div className={`tm-bda-hero tm-bda-hero--${heroWidth}`}>
            <img
              src={getDefaultSrc(image)}
              srcSet={createMediaSrcset(image)}
              alt={image.altText || blog.title}
              loading="eager"
              decoding="async"
            />
          </div>
        )}

        {/* ── Article body ───────────────────────────────────────────────── */}
        <div
          className="tm-bda-body"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(blog.blogContent?.content || "") }}
        />

      </div>
    </article>
  );
}

export default ThreeMashBlogDetailPage;
