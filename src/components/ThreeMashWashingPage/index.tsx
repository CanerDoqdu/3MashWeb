import { ThreeMashFooter } from "../ThreeMashFooter";
import { ThreeMashHeader } from "../ThreeMashHeader";
import type { Props } from "./types";

function hasContent(props: Props) {
  return Boolean(props.titleText || props.descriptionHtml || props.primaryButtonText);
}

export function ThreeMashWashingPage(props: Props) {
  const contentVisible = hasContent(props);

  return (
    <>
      <ThreeMashHeader logoText="mash" />
      <main className="three-mash-empty-product-page" aria-hidden={!contentVisible} style={{
        background: props.backgroundColor || "#fafaf7",
        color: props.textColor || "#0e0e0c",
      }}>
        {contentVisible ? (
          <section className="three-mash-empty-product-content">
            {props.eyebrowText ? <span>{props.eyebrowText}</span> : null}
            {props.titleText ? <h1>{props.titleText}</h1> : null}
            {props.descriptionHtml ? <p dangerouslySetInnerHTML={{ __html: props.descriptionHtml }} /> : null}
            {props.primaryButtonText ? <a href={props.primaryButtonHref || "/"}>{props.primaryButtonText}</a> : null}
          </section>
        ) : null}
      </main>
      <ThreeMashFooter />
    </>
  );
}

export default ThreeMashWashingPage;
