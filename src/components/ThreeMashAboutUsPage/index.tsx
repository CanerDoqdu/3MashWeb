import { aboutPage } from "../ThreeMashPageData/sourceData";
import { Props } from "./types";
import { tLocalized } from "../../utils/i18n";
import { sanitizeHtml } from "../../utils/sanitizeHtml";
import { getDefaultSrc, type IkasImage } from "@ikas/bp-storefront";

function text(value: string | undefined, fallback: string) {
  return value?.trim() || fallback;
}

function localizedText(
  value: string | undefined,
  valueEn: string | undefined,
  fallback: string,
) {
  return tLocalized(text(value, fallback), text(valueEn, fallback));
}

function numberValue(value: number | undefined, fallback: number) {
  return typeof value === "number" ? value : fallback;
}

function html(value: string | undefined, fallback: string) {
  return value?.trim() || fallback;
}

function localizedHtml(
  value: string | undefined,
  valueEn: string | undefined,
  fallback: string,
) {
  return tLocalized(html(value, fallback), html(valueEn, fallback));
}

function themeColor(
  input: string | undefined,
  fallback: string,
  token: string,
  legacyDefaults: string[] = [],
) {
  const trimmed = input?.trim();
  const normalized = trimmed?.toLowerCase();
  const defaults = [fallback, ...legacyDefaults].map((item) =>
    item.toLowerCase(),
  );

  if (!trimmed || (normalized && defaults.includes(normalized))) {
    return `var(${token}, ${fallback})`;
  }

  return trimmed;
}

function imageUrl(input: string | undefined, fallback: string) {
  const trimmed = input?.trim();
  if (!trimmed) return fallback;
  return trimmed.startsWith("theme-images/")
    ? `https://cdn.myikas.com/images/${trimmed}/image_3840.webp`
    : trimmed;
}

function imageSource(
  image: IkasImage | null | undefined,
  legacyUrl: string | undefined,
  fallback: string,
) {
  const selectedImage = image ? getDefaultSrc(image) : "";
  return selectedImage || imageUrl(legacyUrl, fallback);
}

function splitTitle(value: string) {
  const cleaned = value.replace(/[⚖️🧭🔭]/g, "").trim();
  const [first = cleaned, ...rest] = cleaned.split(/\s+/);
  return { first, rest: rest.join(" ") };
}

export function ThreeMashAboutUsPage(props: Props) {
  // NOTE: Dynamic property access via template literals (e.g., `block${index + 1}Html`) requires
  // type narrowing to 'any' because TypeScript cannot statically verify computed property names.
  const blocks = aboutPage.blocks.map((block, index) => ({
    ...block,
    html: localizedHtml(
      (props as any)[`block${index + 1}Html`],
      (props as any)[`block${index + 1}HtmlEn`],
      block.html,
    ),
    imageUrl: imageSource(
      (props as any)[`block${index + 1}Image`],
      (props as any)[`block${index + 1}ImageUrl`],
      block.imageUrl,
    ),
    imageAlt: localizedText(
      (props as any)[`block${index + 1}ImageAlt`],
      (props as any)[`block${index + 1}ImageAltEn`],
      block.imageAlt,
    ),
  }));

  // NOTE: Same dynamic property access pattern for values.
  const values = aboutPage.values.map((value, index) => ({
    ...value,
    title: localizedText(
      (props as any)[`value${index + 1}Title`],
      (props as any)[`value${index + 1}TitleEn`],
      value.title,
    ),
    subTitle: localizedText(
      (props as any)[`value${index + 1}SubTitle`],
      (props as any)[`value${index + 1}SubTitleEn`],
      value.subTitle,
    ),
    imageUrl: imageSource(
      (props as any)[`value${index + 1}Image`],
      (props as any)[`value${index + 1}ImageUrl`],
      value.imageUrl,
    ),
    imageAlt: localizedText(
      (props as any)[`value${index + 1}ImageAlt`],
      (props as any)[`value${index + 1}ImageAltEn`],
      value.imageAlt,
    ),
    show: (props as any)[`showValue${index + 1}`] !== false,
    number: index + 1,
  }));

  const valuesTitle = splitTitle(
    localizedText(props.valuesTitle, props.valuesTitleEn, aboutPage.valuesTitle),
  );
  const heroTitle = localizedHtml(
    props.introTitleHtml,
    props.introTitleHtmlEn,
    aboutPage.introTitleHtml,
  );
  const heroQuote = localizedHtml(
    props.introContentHtml,
    props.introContentHtmlEn,
    aboutPage.introContentHtml,
  );
  const pageTitle = localizedText(
    props.pageTitleText,
    props.pageTitleTextEn,
    aboutPage.title,
  );
  const pageDescription = localizedText(
    props.pageDescriptionText,
    props.pageDescriptionTextEn,
    aboutPage.description,
  );
  const kicker = localizedText(
    props.brandKickerText,
    props.brandKickerTextEn,
    "3MASH",
  );

  const style = {
    "--tmabout-bg": themeColor(
      props.backgroundColor,
      "#FAFAF7",
      "--tm-theme-bg",
      ["#ffffff", "#fff"],
    ),
    "--tmabout-text": themeColor(
      props.textColor,
      "#0E0E0C",
      "--tm-theme-text",
      ["#2b2b2b", "#111111", "#000000"],
    ),
    "--tmabout-muted": themeColor(
      props.mutedTextColor,
      "#55554e",
      "--tm-theme-sub",
      ["#5f5f5f", "#777777"],
    ),
    "--tmabout-line": "var(--tm-theme-line, #E6E6E0)",
    "--tmabout-accent": "var(--tm-theme-accent, #C7F136)",
    "--tmabout-dark": "var(--tm-theme-dark, #0E0E0C)",
    "--tmabout-max": `${numberValue(props.maxWidth, 1180)}px`,
  } as any; // CSS-in-JS: dynamic properties use CSS custom variable names

  return (
    <section className="three-mash-about-page" style={style}>
      <div className="tmabout-shell">
        {props.showIntro !== false && (
          <section className="tmabout-hero">
            <span className="tmabout-kicker">{kicker}</span>
            <div className="tmabout-hero-grid">
              <div>
                <h1>{pageTitle}</h1>
                <p>{pageDescription}</p>
              </div>
              <blockquote>
                <div
                  className="tmabout-hero-title"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(heroTitle) }}
                />
                <div
                  className="tmabout-quote"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(heroQuote) }}
                />
              </blockquote>
            </div>
          </section>
        )}

        {props.showStoryBlock !== false && (
          <section className="tmabout-story">
            <div className="tmabout-story-copy">
              <span className="tmabout-section-code">
                {text(props.storySectionCode, "01")}
              </span>
              <div
                className="tmabout-rich"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(blocks[0]?.html || "") }}
              />
            </div>
            <figure className="tmabout-story-media">
              <img
                src={blocks[0]?.imageUrl}
                alt={blocks[0]?.imageAlt || ""}
                loading="eager"
                decoding="async"
              />
            </figure>
          </section>
        )}

        {props.showMissionVision !== false && (
          <section className="tmabout-mission">
            <figure className="tmabout-mission-media">
              <img
                src={blocks[1]?.imageUrl}
                alt={blocks[1]?.imageAlt || ""}
                loading="lazy"
                decoding="async"
              />
            </figure>
            <div className="tmabout-mission-panel">
              <span className="tmabout-section-code">
                {text(props.missionSectionCode, "02")}
              </span>
              <div
                className="tmabout-rich"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(blocks[1]?.html || "") }}
              />
            </div>
          </section>
        )}

        {props.showValues !== false && (
          <section className="tmabout-values">
            <div className="tmabout-values-head">
              <span className="tmabout-section-code">
                {text(props.valuesSectionCode, "03")}
              </span>
              <h2>
                {valuesTitle.first} <em>{valuesTitle.rest}</em>
              </h2>
            </div>
            <div className="tmabout-values-grid">
              {values.filter((value) => value.show).map((value) => (
                <article className="tmabout-value-card" key={value.title}>
                  <span className="tmabout-value-number">
                    {String(value.number).padStart(2, "0")}
                  </span>
                  <div className="tmabout-value-media">
                    {value.imageUrl ? (
                      <img
                        src={value.imageUrl}
                        alt={value.imageAlt || ""}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : null}
                  </div>
                  <div className="tmabout-value-body">
                    <h3>{value.title.replace(/^\d+\.\s*/, "")}</h3>
                    <p>{value.subTitle}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  );
}

export default ThreeMashAboutUsPage;
