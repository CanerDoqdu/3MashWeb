import { Props } from "./types";

function href(value?: string) {
  const trimmed = value?.trim();
  return trimmed || "#";
}

function inlineHtml(value?: string) {
  return (value || "")
    .trim()
    .replace(/<\/p>\s*<p[^>]*>/gi, "<br />")
    .replace(/^<p[^>]*>/i, "")
    .replace(/<\/p>$/i, "");
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function styleTextChunks(markup: string, props?: Props) {
  const target = props?.styledPhrase?.trim();
  if (props?.wordStyleEnabled === false || !target) return markup;

  const matcher = new RegExp(escapeRegExp(target), "gi");
  return markup
    .split(/(<[^>]+>)/g)
    .map((part) => {
      if (!part || part.startsWith("<")) return part;
      return part.replace(matcher, (match) => `<span class="tmap-word-style">${match}</span>`);
    })
    .join("");
}

function richText(value?: string, props?: Props) {
  return { __html: styleTextChunks(inlineHtml(value), props) };
}

function AcademyCard({ number, title, text, wordStyle }: { number: string; title?: string; text?: string; wordStyle: Props }) {
  return (
    <article className="tmap-card">
      <span>{number}</span>
      <b dangerouslySetInnerHTML={richText(title, wordStyle)} />
      <p dangerouslySetInnerHTML={richText(text, wordStyle)} />
    </article>
  );
}

export function ThreeMashAcademyPage(props: Props) {
  const themeStyle = {
    "--tmap-bg": props.backgroundColor || "#FAFAF7",
    "--tmap-text": props.textColor || "#0E0E0C",
    "--tmap-muted": props.mutedTextColor || "#6F6F67",
    "--tmap-panel": props.panelColor || "#FFFFFF",
    "--tmap-accent": props.accentColor || "#C7F136",
    "--tmap-line": props.lineColor || "#E3E3DA",
    "--tmap-word-color": props.styledPhraseColor || "#C7F136",
    "--tmap-word-weight": props.styledPhraseBold ? "800" : "inherit",
    "--tmap-word-style": props.styledPhraseItalic ? "italic" : "inherit",
  } as any;

  return (
    <section className="three-mash-academy-page" style={themeStyle}>
      <div className="tmap-wrap">
        <div className="tmap-kicker">
          <span />
          <span dangerouslySetInnerHTML={richText(props.eyebrowText, props)} />
        </div>
        <div className="tmap-head">
          <h1 dangerouslySetInnerHTML={richText(props.titleText, props)} />
          <div className="tmap-description" dangerouslySetInnerHTML={richText(props.descriptionHtml, props)} />
        </div>
        <div className="tmap-cards">
          <AcademyCard number="01" title={props.card1Title} text={props.card1Text} wordStyle={props} />
          <AcademyCard number="02" title={props.card2Title} text={props.card2Text} wordStyle={props} />
          <AcademyCard number="03" title={props.card3Title} text={props.card3Text} wordStyle={props} />
        </div>
        <div className="tmap-actions">
          <a className="tmap-button tmap-button-primary" href={href(props.primaryButtonHref)}>
            <span dangerouslySetInnerHTML={richText(props.primaryButtonText, props)} />
          </a>
          <a className="tmap-button tmap-button-secondary" href={href(props.secondaryButtonHref)}>
            <span dangerouslySetInnerHTML={richText(props.secondaryButtonText, props)} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default ThreeMashAcademyPage;
