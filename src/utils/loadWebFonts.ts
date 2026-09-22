/**
 * loadWebFonts.ts
 *
 * Non-blocking Google Fonts loader.
 *
 * Why this exists:
 *   Every compiled component stylesheet (styles.css) inherits the content of
 *   src/global.css. A CSS-level `@import url(...)` at the top of any stylesheet
 *   is render-blocking per spec: the browser cannot apply *any* rule below it
 *   until the imported resource is fetched. Moving font loading here — as a
 *   plain <link rel="stylesheet"> inserted by JS — removes that blocking step
 *   entirely. The browser fetches the font CSS asynchronously in parallel with
 *   everything else, eliminating the FOUC caused by the CSS @import.
 *
 * Deduplication:
 *   Multiple components may call this on the same page. The id check ensures
 *   the <link> is only ever inserted once, regardless of call order or count.
 */

const FONT_LINK_ID = "tm-google-fonts";
const FONT_POPPINS_LINK_ID = "tm-google-fonts-poppins";

const MAIN_FONT_URL =
  "https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800&family=Inter:wght@400;500;600;700&family=Newsreader:ital,wght@1,500;1,600&family=Space+Grotesk:wght@400;500;600;700&display=optional";

const POPPINS_FONT_URL =
  "https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;800&display=swap";

function injectLink(id: string, href: string): void {
  if (typeof document === "undefined") return;
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

/**
 * Injects the main project web fonts (Space Grotesk, Inter, Baloo 2,
 * Newsreader) as a non-blocking <link rel="stylesheet"> into document.head.
 * Safe to call multiple times — only one <link> is ever added.
 */
export function loadWebFonts(): void {
  injectLink(FONT_LINK_ID, MAIN_FONT_URL);
}

/**
 * Injects the Poppins font used by the legal page component.
 * Safe to call multiple times — only one <link> is ever added.
 */
export function loadPoppinsFont(): void {
  injectLink(FONT_POPPINS_LINK_ID, POPPINS_FONT_URL);
}
