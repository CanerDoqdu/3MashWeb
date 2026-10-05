import { getDefaultSrc, type IkasImage } from "@ikas/bp-storefront";
import { aboutPage } from "../ThreeMashPageData/sourceData";
import { sanitizeHtml } from "../../utils/sanitizeHtml";
import { tLocalized } from "../../utils/i18n";
import { Props } from "./types";

function value(input: string | undefined, fallback: string) {
  return input?.trim() || fallback;
}

function localizedValue(
  input: string | undefined,
  inputEn: string | undefined,
  fallback: string,
) {
  return tLocalized(value(input, fallback), value(inputEn, fallback));
}

function localizedHtml(
  input: string | undefined,
  inputEn: string | undefined,
  fallback: string,
) {
  return tLocalized(value(input, fallback), value(inputEn, fallback));
}

function themeColor(
  input: string | undefined,
  fallback: string,
  token: string,
  legacyDefaults: string[] = [],
) {
  const trimmed = input?.trim();
  const defaults = [fallback, ...legacyDefaults].map((color) => color.toLowerCase());
  if (!trimmed || defaults.includes(trimmed.toLowerCase())) {
    return `var(${token}, ${fallback})`;
  }
  return trimmed;
}

function imageSource(image: IkasImage | null | undefined, fallback: string) {
  return (image ? getDefaultSrc(image) : "") || fallback;
}

function numberInRange(input: number | undefined, fallback: number, min: number, max: number) {
  if (typeof input !== "number" || !Number.isFinite(input)) return fallback;
  return Math.min(max, Math.max(min, input));
}

export function HakkimizdaSayfasiV2(props: Props) {
  const story = aboutPage.blocks[0];
  const missionVision = aboutPage.blocks[1];
  const principles = [
    {
      title: localizedValue(props.principle1Title, props.principle1TitleEn, aboutPage.values[0].title),
      description: localizedValue(props.principle1Description, props.principle1DescriptionEn, aboutPage.values[0].subTitle),
      image: imageSource(props.principle1Image, aboutPage.values[0].imageUrl),
      imageAlt: localizedValue(props.principle1ImageAlt, props.principle1ImageAltEn, aboutPage.values[0].imageAlt),
      visible: props.showPrinciple1 !== false,
    },
    {
      title: localizedValue(props.principle2Title, props.principle2TitleEn, aboutPage.values[1].title),
      description: localizedValue(props.principle2Description, props.principle2DescriptionEn, aboutPage.values[1].subTitle),
      image: imageSource(props.principle2Image, aboutPage.values[1].imageUrl),
      imageAlt: localizedValue(props.principle2ImageAlt, props.principle2ImageAltEn, aboutPage.values[1].imageAlt),
      visible: props.showPrinciple2 !== false,
    },
    {
      title: localizedValue(props.principle3Title, props.principle3TitleEn, aboutPage.values[2].title),
      description: localizedValue(props.principle3Description, props.principle3DescriptionEn, aboutPage.values[2].subTitle),
      image: imageSource(props.principle3Image, aboutPage.values[2].imageUrl),
      imageAlt: localizedValue(props.principle3ImageAlt, props.principle3ImageAltEn, aboutPage.values[2].imageAlt),
      visible: props.showPrinciple3 !== false,
    },
    {
      title: localizedValue(props.principle4Title, props.principle4TitleEn, aboutPage.values[3].title),
      description: localizedValue(props.principle4Description, props.principle4DescriptionEn, aboutPage.values[3].subTitle),
      image: imageSource(props.principle4Image, aboutPage.values[3].imageUrl),
      imageAlt: localizedValue(props.principle4ImageAlt, props.principle4ImageAltEn, aboutPage.values[3].imageAlt),
      visible: props.showPrinciple4 !== false,
    },
  ];

  const title = localizedValue(props.pageTitle, props.pageTitleEn, aboutPage.title);
  const description = localizedValue(props.pageDescription, props.pageDescriptionEn, aboutPage.description);
  const brand = localizedValue(props.brandLabel, props.brandLabelEn, "3MASH");
  const quoteHeading = localizedHtml(props.quoteHeadingHtml, props.quoteHeadingHtmlEn, aboutPage.introTitleHtml);
  const quote = localizedHtml(props.quoteHtml, props.quoteHtmlEn, aboutPage.introContentHtml);
  const storyHtml = localizedHtml(props.storyHtml, props.storyHtmlEn, story.html);
  const missionVisionHtml = localizedHtml(
    props.missionVisionHtml,
    props.missionVisionHtmlEn,
    missionVision.html,
  );
  const valuesHeading = localizedValue(
    props.valuesHeading,
    props.valuesHeadingEn,
    aboutPage.valuesTitle,
  );

  const style = {
    "--hmv-bg": themeColor(props.backgroundColor, "#FAFAF7", "--tm-theme-bg", ["#ffffff", "#fff"]),
    "--hmv-heading": themeColor(props.headingColor, "#0E0E0C", "--tm-theme-text", ["#111111"]),
    "--hmv-text": themeColor(props.bodyColor, "#0E0E0C", "--tm-theme-text", ["#111111"]),
    "--hmv-muted": themeColor(props.secondaryTextColor, "#55554E", "--tm-theme-sub", ["#555555", "#777777"]),
    "--hmv-accent": themeColor(props.accentColor, "#C7F136", "--tm-theme-accent", [
      "#caff12",
      "#0e0e0c",
      "#000000",
      "#111111",
      "#222222",
    ]),
    "--hmv-content-width": `${numberInRange(props.contentWidth, 1180, 720, 1800)}px`,
  } as any;

  return (
    <section className="hmv-about-v2" style={style}>
      <div className="hmv-shell">
        {props.showIntroduction !== false && (
          <section className="hmv-introduction">
            <header className="hmv-masthead">
              <div className="hmv-title-block">
                <span className="hmv-brand">{brand}</span>
                <h1>{title}</h1>
                <p className="hmv-description">{description}</p>
              </div>
              <aside className="hmv-quote">
                <div
                  className="hmv-quote-heading"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(quoteHeading) }}
                />
                <blockquote dangerouslySetInnerHTML={{ __html: sanitizeHtml(quote) }} />
              </aside>
            </header>
          </section>
        )}

        {props.showStory !== false && (
          <section className="hmv-story">
            {story && (
              <figure className="hmv-story-image">
                <img
                  src={imageSource(props.storyImage, story.imageUrl)}
                  alt={localizedValue(props.storyImageAlt, props.storyImageAltEn, story.imageAlt)}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            )}
            <div className="hmv-story-copy">
              <span className="hmv-index" aria-hidden="true">01</span>
              <div
                className="hmv-rich hmv-story-rich"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(storyHtml) }}
              />
            </div>
          </section>
        )}

        {props.showMissionAndVision !== false && (
          <section className="hmv-mission">
            <div className="hmv-mission-copy">
              <span className="hmv-index" aria-hidden="true">02</span>
              <div
                className="hmv-rich"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(missionVisionHtml) }}
              />
            </div>
            {missionVision && (
              <figure className="hmv-mission-image">
                <img
                  src={imageSource(props.missionVisionImage, missionVision.imageUrl)}
                  alt={localizedValue(
                    props.missionVisionImageAlt,
                    props.missionVisionImageAltEn,
                    missionVision.imageAlt,
                  )}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            )}
          </section>
        )}

        {props.showPrinciples !== false && (
          <section className="hmv-values">
            <header className="hmv-values-heading">
              <span className="hmv-index" aria-hidden="true">03</span>
              <h2>{valuesHeading}</h2>
            </header>
            <div className="hmv-principles">
              {principles.map((principle, index) =>
                principle.visible ? (
                  <article className="hmv-principle" key={index}>
                    <span className="hmv-principle-number" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {principle.image && (
                      <img
                        className="hmv-principle-image"
                        src={principle.image}
                        alt={principle.imageAlt}
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                    <div className="hmv-principle-copy">
                      <h3>{principle.title.replace(/^\d+\.\s*/, "")}</h3>
                      <p>{principle.description}</p>
                    </div>
                  </article>
                ) : null,
              )}
            </div>
          </section>
        )}
      </div>
    </section>
  );
}

export default HakkimizdaSayfasiV2;
