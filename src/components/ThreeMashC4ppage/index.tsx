import { ThreeMashFooter } from "../ThreeMashFooter";
import { ThreeMashHeader } from "../ThreeMashHeader";
import type { Props } from "./types";
import { sanitizeHtml } from "../../utils/sanitizeHtml";
import { safeNavigationHref } from "../../utils/safeRedirect";

function hasContent(props: Props) {
  return Boolean(props.titleText || props.descriptionHtml || props.primaryButtonText);
}

export function ThreeMashC4ppage(props: Props) {
  const contentVisible = hasContent(props);
  const primaryButtonHref = safeNavigationHref(props.primaryButtonHref, "/");

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
            {props.descriptionHtml ? <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(props.descriptionHtml) }} /> : null}
            {props.primaryButtonText ? <a href={primaryButtonHref}>{props.primaryButtonText}</a> : null}
          </section>
        ) : null}
      </main>
      <ThreeMashFooter />
    </>
  );
}

export default ThreeMashC4ppage;
