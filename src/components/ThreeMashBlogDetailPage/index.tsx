import {
  createMediaSrcset,
  getDefaultSrc,
  getIkasBlogFormattedDate,
} from "@ikas/bp-storefront";
import { Props } from "./types";
import {
  isEnglishLocale,
  localizedHref,
  tLocalized,
} from "../../utils/i18n";
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

function localizedText(
  value: string | undefined,
  valueEn: string | undefined,
  fallback: string,
) {
  const localizedValue = isEnglishLocale() ? valueEn : value;
  return localizedValue?.trim() || fallback;
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
  const heroWidth =
    props.heroImageWidth === "column" || props.heroImageWidth === "full"
      ? props.heroImageWidth
      : "wide";
  const titleAlign = props.titleAlign === "center" ? "center" : "left";
  const headerSpacing =
    props.headerSpacing === "compact" || props.headerSpacing === "normal"
      ? props.headerSpacing
      : "generous";

  const showBackLink = props.showBackLink !== false;
  const showPublicationLabel = props.showPublicationLabel !== false;
  const showCategory = props.showCategory !== false;
  const showReadingTime = props.showReadingTime !== false;
  const showAuthor = props.showAuthor !== false;
  const showExcerpt = props.showExcerpt !== false;
  const showHeroImage = props.showHeroImage !== false;
  const showArticleBody = props.showArticleBody !== false;
  const showSetupMessage = props.showSetupMessage !== false;

  // ── Empty / setup state ─────────────────────────────────────────────────
  if (!blog) {
    if (!showSetupMessage) return null;
    return (
      <section className="three-mash-blog-detail" style={style}>
        <div className="tm-bda-wrap">
          <div className="tm-bda-setup">
            {localizedText(
              props.setupMessage,
              props.setupMessageEn,
              tLocalized(
                "Blog yazısı kısa süre içinde burada gösterilecek.",
                "Blog post will be displayed here shortly.",
              ),
            )}
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
        {showBackLink ? (
          <a
            className="tm-bda-back"
            href={safeNavigationHref(
              localizedHref(props.backLinkHref || tLocalized("/blog", "/blog")),
              tLocalized("/blog", "/blog"),
            )}
          >
            <span aria-hidden="true">←</span>
            <span>
              {localizedText(
                props.backLinkText,
                props.backLinkTextEn,
                tLocalized("Blog'a dön", "Back to blog"),
              )}
            </span>
          </a>
        ) : null}

        {/* ── Article header ────────────────────────────────────────────── */}
        <header
          className={`tm-bda-header tm-bda-align-${titleAlign}`}
        >

          {/* Publication eyebrow */}
          {showPublicationLabel && (
            <span className="tm-bda-eyebrow">
              {localizedText(
                props.publicationLabelText,
                props.publicationLabelTextEn,
                "MASH ACADEMY",
              )}
            </span>
          )}

          {/* Category */}
          {showCategory && blog.category?.name && (
            <span className="tm-bda-category">{blog.category.name}</span>
          )}

          {/* Dominant title */}
          <h1 className="tm-bda-title">{blog.title}</h1>

          {/* Subtitle / excerpt */}
          {showExcerpt && blog.shortDescription && (
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
                    {readingTime}{" "}
                    {localizedText(
                      props.readingTimeSuffix,
                      props.readingTimeSuffixEn,
                      tLocalized("dk okuma", "min read"),
                    )}
                  </span>
                </>
              )}
            </div>
          )}
        </header>

        {/* ── Hero image ─────────────────────────────────────────────────── */}
        {showHeroImage && image && (
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
        {showArticleBody ? (
          <div
            className="tm-bda-body"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(blog.blogContent?.content || ""),
            }}
          />
        ) : null}

      </div>
    </article>
  );
}

export default ThreeMashBlogDetailPage;
