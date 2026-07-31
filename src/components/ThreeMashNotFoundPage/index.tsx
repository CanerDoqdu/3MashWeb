import { Props } from "./types";

const defaultBackgroundImage =
  "https://cdn.myikas.com/images/theme-images/ebbf8195-570a-4650-893b-b460bab2c034/image_1080.webp";

function text(value: string | undefined, fallback: string) {
  const trimmed = value?.trim();
  return trimmed || fallback;
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
  const title = text(props.titleText, "Aradığınız Sayfa Bulunamadı.");
  const style = {
    "--tm-404-bg-image": `url(${text(props.backgroundImageUrl, defaultBackgroundImage)})`,
    "--tm-404-min-height": `${numberInRange(props.minHeight, 76, 40, 140)}vh`,
    "--tm-404-overlay": props.overlayColor || "var(--tm-theme-dark, #0E0E0C)",
    "--tm-404-overlay-opacity":
      numberInRange(props.overlayOpacity, 18, 0, 100) / 100,
    "--tm-404-text": themeColor(props.textColor, "#0E0E0C", "--tm-theme-text", [
      "#ffffff",
      "#fff",
    ]),
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
          <span className="tm-404-kicker">404</span>
          <h1>{title}</h1>
          <p>
            Bu bağlantı taşınmış, kaldırılmış veya adres hatalı yazılmış
            olabilir. Ana sayfaya dönerek 3mash ürün ve içeriklerine yeniden
            ulaşabilirsiniz.
          </p>
          <a className="tm-404-link" href={text(props.buttonHref, "/")}>
            {text(props.buttonText, "Ana sayfaya dön")}
          </a>
        </div>
      </div>
    </section>
  );
}

export default ThreeMashNotFoundPage;
