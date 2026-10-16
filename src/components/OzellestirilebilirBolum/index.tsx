import { IkasComponentRenderer } from "@ikas/bp-storefront";
import type { JSX } from "preact";
import { isEnglishLocale } from "../../utils/i18n";
import { sanitizeHtml } from "../../utils/sanitizeHtml";
import { resolveThemeColor } from "../../utils/themeColor";
import { Props } from "./types";

function localized(value?: string, valueEn?: string): string {
  return (isEnglishLocale() ? valueEn : value)?.trim() ?? "";
}

function safeColor(value: string | undefined, fallback: string): string {
  const color = resolveThemeColor(value);
  return /^(#[\da-f]{3,8}|rgba?\([\d\s.,%]+\)|hsla?\([\d\s.,%deg]+\)|[a-z]{1,20}|var\(--[\w-]+(?:\s*,\s*(?:#[\da-f]{3,8}|[a-z]+))?\))$/i.test(color)
    ? color
    : fallback;
}

function boundedNumber(value: number | undefined, fallback: number, min: number, max: number): number {
  return typeof value === "number" && Number.isFinite(value)
    ? Math.min(max, Math.max(min, value))
    : fallback;
}

function safeMaxWidth(value: string | undefined): string {
  const width = value?.trim() ?? "";
  return /^(?:\d+(?:\.\d+)?(?:px|rem|em|vw|%)|none)$/i.test(width) ? width : "1280px";
}

function safeMinHeight(value: string | undefined): string {
  const height = value?.trim() ?? "";
  return /^(?:0|(?:\d+(?:\.\d+)?)(?:px|rem|em|vh|svh|lvh|dvh|vw|svw|lvw|%))$|^auto$/i.test(height)
    ? height
    : "100vh";
}

export function OzellestirilebilirBolum(props: Props) {
  const heading = sanitizeHtml(localized(props.sectionHeading, props.sectionHeadingEn));
  const description = sanitizeHtml(localized(props.sectionDescription, props.sectionDescriptionEn));
  const desktopColumns = boundedNumber(props.desktopColumns, 2, 1, 4);
  const mobileColumns = boundedNumber(props.mobileColumns, 1, 1, 2);
  const style = {
    backgroundColor: safeColor(props.backgroundColor, "#ffffff"),
    color: safeColor(props.textColor, "#1f2937"),
    minHeight: safeMinHeight(props.sectionMinHeight),
    "--desktop-padding-top": `${boundedNumber(props.desktopPaddingTop, 64, 0, 512)}px`,
    "--desktop-padding-bottom": `${boundedNumber(props.desktopPaddingBottom, 64, 0, 512)}px`,
    "--desktop-columns": desktopColumns,
    "--mobile-columns": mobileColumns,
    "--desktop-gap": `${boundedNumber(props.desktopGap, 24, 0, 128)}px`,
    "--mobile-gap": `${boundedNumber(props.mobileGap, 16, 0, 128)}px`,
    "--mobile-padding-top": `${boundedNumber(props.mobilePaddingTop, 40, 0, 512)}px`,
    "--mobile-padding-bottom": `${boundedNumber(props.mobilePaddingBottom, 40, 0, 512)}px`,
  } as JSX.CSSProperties;

  return (
    <section className="ozellestirilebilir-bolum" style={style}>
      <div className="ozellestirilebilir-bolum-inner" style={{ maxWidth: safeMaxWidth(props.contentMaxWidth) }}>
        {props.showSectionHeading === true && (heading || description) && (
          <header className="ozellestirilebilir-bolum-header">
            {heading && <div className="ozellestirilebilir-bolum-heading" dangerouslySetInnerHTML={{ __html: heading }} />}
            {description && <div className="ozellestirilebilir-bolum-description" dangerouslySetInnerHTML={{ __html: description }} />}
          </header>
        )}
        <div className="ozellestirilebilir-bolum-grid">
          <IkasComponentRenderer
            id="customizable-section-content"
            components={props.contentBlocks as any[]}
            parentProps={props}
          />
        </div>
      </div>
    </section>
  );
}

export default OzellestirilebilirBolum;
