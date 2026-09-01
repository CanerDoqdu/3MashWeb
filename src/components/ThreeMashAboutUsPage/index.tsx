import { aboutPage } from "../ThreeMashPageData/sourceData";
import { Props } from "./types";
import { tLocalized } from "../../utils/i18n";

function text(value: string | undefined, fallback: string) {
  return value?.trim() || fallback;
}

function numberValue(value: number | undefined, fallback: number) {
  return typeof value === "number" ? value : fallback;
}

function html(value: string | undefined, fallback: string) {
  return value?.trim() || fallback;
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
    html: html((props as any)[`block${index + 1}Html`], block.html),
    imageUrl: imageUrl(
      (props as any)[`block${index + 1}ImageUrl`],
      block.imageUrl,
    ),
    imageAlt: text((props as any)[`block${index + 1}ImageAlt`], block.imageAlt),
  }));

  // NOTE: Same dynamic property access pattern for values.
  const values = aboutPage.values.map((value, index) => ({
    ...value,
    title: text((props as any)[`value${index + 1}Title`], value.title),
    subTitle: text((props as any)[`value${index + 1}SubTitle`], value.subTitle),
    imageUrl: imageUrl(
      (props as any)[`value${index + 1}ImageUrl`],
      value.imageUrl,
    ),
    imageAlt: text((props as any)[`value${index + 1}ImageAlt`], value.imageAlt),
  }));

  const valuesTitle = splitTitle(
    text(props.valuesTitle, aboutPage.valuesTitle),
  );
  const heroTitle = html(props.introTitleHtml, aboutPage.introTitleHtml);
  const heroQuote = html(props.introContentHtml, aboutPage.introContentHtml);

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
    "--tmabout-panel": themeColor(
      props.panelColor,
      "#F1F1EC",
      "--tm-theme-panel",
      ["#f7f7f7", "#ffffff", "#fff"],
    ),
    "--tmabout-line": "var(--tm-theme-line, #E6E6E0)",
    "--tmabout-accent": "var(--tm-theme-accent, #C7F136)",
    "--tmabout-dark": "var(--tm-theme-dark, #0E0E0C)",
    "--tmabout-max": `${numberValue(props.maxWidth, 1180)}px`,
  } as any; // CSS-in-JS: dynamic properties use CSS custom variable names

  return (
    <section className="three-mash-about-page" style={style}>
      <div className="tmabout-shell">
        <section className="tmabout-hero">
          <span className="tmabout-kicker">{tLocalized("3MASH", "3MASH")}</span>
          <div className="tmabout-hero-grid">
            <div>
              <h1>{aboutPage.title}</h1>
              <p>{aboutPage.description}</p>
            </div>
            <blockquote>
              <div
                className="tmabout-hero-title"
                dangerouslySetInnerHTML={{ __html: heroTitle }}
              />
              <div
                className="tmabout-quote"
                dangerouslySetInnerHTML={{ __html: heroQuote }}
              />
            </blockquote>
          </div>
        </section>

        <section className="tmabout-story">
          <div className="tmabout-story-copy">
            <span className="tmabout-section-code">01</span>
            <div
              className="tmabout-rich"
              dangerouslySetInnerHTML={{ __html: blocks[0]?.html || "" }}
            />
          </div>
          <figure className="tmabout-story-media">
            <img
              src={blocks[0]?.imageUrl}
              alt={blocks[0]?.imageAlt || "3mash"}
              loading="eager"
              decoding="async"
            />
          </figure>
        </section>

        <section className="tmabout-mission">
          <figure className="tmabout-mission-media">
            <img
              src={blocks[1]?.imageUrl}
              alt={blocks[1]?.imageAlt || tLocalized("Misyon ve vizyon", "Mission and vision")}
              loading="lazy"
              decoding="async"
            />
          </figure>
          <div className="tmabout-mission-panel">
            <span className="tmabout-section-code">02</span>
            <div
              className="tmabout-rich"
              dangerouslySetInnerHTML={{ __html: blocks[1]?.html || "" }}
            />
          </div>
        </section>

        <section className="tmabout-values">
          <div className="tmabout-values-head">
            <span className="tmabout-section-code">03</span>
            <h2>
              {valuesTitle.first} <em>{valuesTitle.rest}</em>
            </h2>
          </div>
          <div className="tmabout-values-grid">
            {values.map((value, index) => (
              <article className="tmabout-value-card" key={value.title}>
                <span className="tmabout-value-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="tmabout-value-media">
                  {value.imageUrl ? (
                    <img
                      src={value.imageUrl}
                      alt={value.imageAlt || value.title}
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
      </div>
    </section>
  );
}

export default ThreeMashAboutUsPage;
