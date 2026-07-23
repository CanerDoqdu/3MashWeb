import { useEffect, useRef } from "preact/hooks";

import { getAcademySourceHtml } from "./source-html";
import { academySourceCss } from "./source-styles";
import { Props } from "./types";

const academyHostCss = `
  :host {
    display: block;
    width: 100%;
    background: #ffffff;
    color: #2b2b2b;
    font-family: Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  }
`;

export function ThreeMashAcademyPage(_props: Props) {
  const hostRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!hostRef.current) {
      return;
    }

    const root = hostRef.current.shadowRoot ?? hostRef.current.attachShadow({ mode: "open" });
    root.innerHTML = `<style>${academySourceCss}${academyHostCss}</style>${getAcademySourceHtml()}`;
  }, []);

  return <section ref={hostRef} className="three-mash-academy-page" />;
}

export default ThreeMashAcademyPage;
