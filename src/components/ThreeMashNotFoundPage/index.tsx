import { Props } from "./types";
import {
  isEnglishLocale,
  localizedHref,
  tProp,
} from "../../utils/i18n";
import { safeNavigationHref } from "../../utils/safeRedirect";

function text(value: string | undefined, fallbackTr: string, fallbackEn?: string) {
  return tProp(value, fallbackTr, fallbackEn || fallbackTr);
}

function localizedText(
  valueTr: string | undefined,
  valueEn: string | undefined,
  fallbackTr: string,
  fallbackEn: string,
) {
  return isEnglishLocale()
    ? text(valueEn, fallbackEn, fallbackEn)
    : text(valueTr, fallbackTr, fallbackEn);
}

function numberInRange(
  value: unknown,
  fallback: number,
  min: number,
  max: number,
) {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.min(max, Math.max(min, numeric));
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

export function ThreeMashNotFoundPage(props: Props) {
  const title = localizedText(
    props.titleText,
    props.titleTextEn,
    "Aradığınız Sayfa Bulunamadı.",
    "Page Not Found.",
  );
  const description = localizedText(
    props.descriptionText,
    props.descriptionTextEn,
    "Bu bağlantı taşınmış, kaldırılmış veya adres hatalı yazılmış olabilir. Ana sayfaya dönerek 3mash ürün ve içeriklerine yeniden ulaşabilirsiniz.",
    "This link may have been moved, removed, or mistyped. You can return to the homepage to explore 3mash products and content.",
  );
  const buttonText = localizedText(
    props.buttonText,
    props.buttonTextEn,
    "DEVAM",
    "Continue",
  );
  const errorCode = text(props.errorCodeText, "404");
  const style = {
    "--tm-404-background": themeColor(
      props.backgroundColor,
      "#0E0E0C",
      "--tm-theme-dark",
    ),
    "--tm-404-code": JSON.stringify(errorCode),
    "--tm-404-min-height": `${numberInRange(props.minHeight, 76, 40, 140)}vh`,
    "--tm-404-button-text": themeColor(
      props.buttonTextColor,
      "#0E0E0C",
      "--tm-theme-text",
      ["#ffffff", "#fff"],
    ),
    "--tm-404-button-bg": themeColor(
      props.buttonBackgroundColor,
      "#C7F136",
      "--tm-theme-accent",
      ["transparent", "#ffffff", "#fff"],
    ),
  } as any;

  return (
    <section className="three-mash-not-found-page" style={style}>
      <div className="tm-404-shell">
        <div className="tm-404-panel">
          <span className="tm-404-kicker">{errorCode}</span>
          <h1>{title}</h1>
          {props.showDescription !== false && <p>{description}</p>}
          {props.showHomeButton !== false && (
            <a
              className="tm-404-link"
              href={safeNavigationHref(
                localizedHref(text(props.buttonHref, "/")),
                "/",
              )}
            >
              {buttonText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export default ThreeMashNotFoundPage;
