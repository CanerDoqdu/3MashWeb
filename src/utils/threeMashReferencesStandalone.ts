import { getDefaultSrc, IkasImage } from "@ikas/bp-storefront";
import { safeNavigationHref } from "./safeRedirect";
import { sanitizeHtml } from "./sanitizeHtml";
import { isEnglishLocale } from "./i18n";

type AppearanceProps = {
  backgroundColor?: string;
  textColor?: string;
  mutedTextColor?: string;
  lineColor?: string;
  maxWidth?: number;
  paddingTop?: number;
  paddingBottom?: number;
};

export function localizedReferenceText(
  value: string | undefined,
  valueEn: string | undefined,
  fallback: string,
) {
  const selected = isEnglishLocale() ? valueEn : value;
  return selected?.trim() || fallback;
}

export function referenceRichHtml(value: string) {
  const cleaned = value
    .replace(/\sstyle=(["']).*?\1/gi, "")
    .replace(/^<p[^>]*>/i, "")
    .replace(/<\/p>$/i, "");

  return sanitizeHtml(cleaned);
}

export function referenceImage(
  image: IkasImage | null | undefined,
  fallback = "",
) {
  return (image ? getDefaultSrc(image) : "") || fallback;
}

export function referenceHref(value: string | undefined, fallback: string) {
  return safeNavigationHref(value, fallback);
}

export function escapeReferenceHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function referencesRootStyle(props: AppearanceProps): Record<string, string> {
  const maxWidth = finiteNumber(props.maxWidth, 1220);
  const paddingTop = finiteNumber(props.paddingTop, 84);
  const paddingBottom = finiteNumber(props.paddingBottom, 92);

  return {
    "--tm-ref-bg": props.backgroundColor?.trim() || "var(--tm-theme-bg, #FAFAF7)",
    "--tm-ref-text": props.textColor?.trim() || "var(--tm-theme-text, #0E0E0C)",
    "--tm-ref-muted": props.mutedTextColor?.trim() || "var(--tm-theme-sub, #55554e)",
    "--tm-ref-line": props.lineColor?.trim() || "var(--tm-theme-line, #E6E6E0)",
    "--tm-ref-max": `${maxWidth}px`,
    "--tm-ref-pt": `${paddingTop}px`,
    "--tm-ref-pb": `${paddingBottom}px`,
  };
}

function finiteNumber(value: number | undefined, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}
