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
 * Timing:
 *   This module calls loadWebFonts()/preconnect() itself, at module-evaluation
 *   time, instead of waiting for a component to call it inside a useEffect.
 *   useEffect only runs *after* first paint, which is exactly what caused the
 *   font flash — the browser painted with the fallback font, then swapped in
 *   Space Grotesk well after that. Importing this file (for its side effect)
 *   as early as possible in the app is what actually fixes that.
 *
 * Deduplication:
 *   Multiple components may call this on the same page. The id check ensures
 *   the <link> is only ever inserted once, regardless of call order or count.
 */

const FONT_LINK_ID = "tm-google-fonts";
const FONT_POPPINS_LINK_ID = "tm-google-fonts-poppins";
const PRECONNECT_GOOGLEAPIS_ID = "tm-preconnect-googleapis";
const PRECONNECT_GSTATIC_ID = "tm-preconnect-gstatic";
const MAIN_FONT_URL =
  "https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800&family=Inter:wght@400;500;600;700&family=Newsreader:ital,wght@1,500;1,600&family=Playfair+Display:wght@600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap";
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

function preconnect(id: string, href: string): void {
  if (typeof document === "undefined") return;
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "preconnect";
  link.href = href;
  if (href.includes("gstatic")) link.crossOrigin = "anonymous";
  document.head.appendChild(link);
}

/**
 * Warms up the connection to Google Fonts hosts before the actual font CSS
 * request goes out, shaving off DNS/TLS round-trip time.
 * Safe to call multiple times — only one <link> per host is ever added.
 */
export function preconnectGoogleFonts(): void {
  preconnect(PRECONNECT_GOOGLEAPIS_ID, "https://fonts.googleapis.com");
  preconnect(PRECONNECT_GSTATIC_ID, "https://fonts.gstatic.com");
}

/**
 * Injects the main project web fonts (Space Grotesk, Inter, Baloo 2,
 * Newsreader) as a non-blocking <link rel="stylesheet"> into document.head.
 * Safe to call multiple times — only one <link> is ever added.
 */
export function loadWebFonts(): void {
  preconnectGoogleFonts();
  injectLink(FONT_LINK_ID, MAIN_FONT_URL);
}

/**
 * Injects the Poppins font used by the legal page component.
 * Safe to call multiple times — only one <link> is ever added.
 */
export function loadPoppinsFont(): void {
  injectLink(FONT_POPPINS_LINK_ID, POPPINS_FONT_URL);
}

// ── Auto-run at module-evaluation time ──────────────────────────────────
// This is the actual fix for the font flash: fonts are requested the moment
// this module is imported (e.g. from the app entry point), not when some
// component's useEffect happens to run after first paint.
if (typeof document !== "undefined") {
  loadWebFonts();
}