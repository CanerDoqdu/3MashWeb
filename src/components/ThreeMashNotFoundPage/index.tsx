import { Props } from "./types";

const defaultBackgroundImage = "https://cdn.myikas.com/images/theme-images/ebbf8195-570a-4650-893b-b460bab2c034/image_1080.webp";

function text(value: string | undefined, fallback: string) {
  const trimmed = value?.trim();
  return trimmed || fallback;
}

function numberInRange(value: unknown, fallback: number, min: number, max: number) {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.min(max, Math.max(min, numeric));
}

export function ThreeMashNotFoundPage(props: Props) {
  const style = {
    "--tm-404-bg-image": `url(${text(props.backgroundImageUrl, defaultBackgroundImage)})`,
    "--tm-404-min-height": `${numberInRange(props.minHeight, 100, 40, 140)}vh`,
    "--tm-404-overlay": props.overlayColor || "transparent",
    "--tm-404-overlay-opacity": numberInRange(props.overlayOpacity, 0, 0, 100) / 100,
    "--tm-404-text": props.textColor || "#ffffff",
    "--tm-404-button-text": props.buttonTextColor || "#ffffff",
    "--tm-404-button-bg": props.buttonBackgroundColor || "transparent",
  } as any;

  return (
    <section className="three-mash-not-found-page" style={style}>
      <div className="tm-404-content">
        <span>{text(props.titleText, "Aradığınız Sayfa Bulunamadı.")}</span>
        <a className="tm-404-link" href={text(props.buttonHref, "/")}>
          {text(props.buttonText, "DEVAM")}
        </a>
      </div>
    </section>
  );
}

export default ThreeMashNotFoundPage;
