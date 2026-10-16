import { getDefaultSrc } from "@ikas/bp-storefront";
import type { IkasImage, IkasVideo } from "@ikas/bp-storefront";
import type { JSX } from "preact";
import { isEnglishLocale } from "../../utils/i18n";
import { safeExternalNavigationHref } from "../../utils/safeRedirect";
import { sanitizeHtml } from "../../utils/sanitizeHtml";
import { resolveThemeColor } from "../../utils/themeColor";
import type { Props } from "./types";

function localized(value?: string, valueEn?: string): string {
  return (isEnglishLocale() ? valueEn : value)?.trim() ?? "";
}

function safeColor(value: string | undefined, fallback: string): string {
  const color = resolveThemeColor(value);

  const literalColor = /^(?:#[\da-f]{3,4}|#[\da-f]{6}|#[\da-f]{8}|(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\([\da-z\s.,%/+()-]+\)|[a-z]{1,20})$/i;
  const themeVariable = /^var\(--[a-z\d_-]+(?:\s*,\s*(?:#[\da-f]{3,4}|#[\da-f]{6}|#[\da-f]{8}|(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\([\da-z\s.,%/+()-]+\)|[a-z]{1,20}))?\)$/i;
  return literalColor.test(color) || themeVariable.test(color)
    ? color
    : fallback;
}

function safeLength(value: string | undefined, fallback: string, allowAuto = false, allowNone = false): string {
  const length = value?.trim() ?? "";
  const pattern = /^(?:\d+(?:\.\d+)?(?:px|rem|em|vw|vh|svh|lvh|dvh|%)|0)$/i;
  return pattern.test(length) || (allowAuto && length.toLowerCase() === "auto") || (allowNone && length.toLowerCase() === "none")
    ? length
    : fallback;
}

function boundedNumber(value: number | undefined, fallback: number, min: number, max: number): number {
  return typeof value === "number" && Number.isFinite(value)
    ? Math.min(max, Math.max(min, value))
    : fallback;
}

function imageSource(image?: IkasImage | null): string {
  return image ? getDefaultSrc(image) : "";
}

function videoSource(video?: IkasVideo | null): string {
  return video?.videoSrc?.trim() ?? "";
}

function renderImage(image: IkasImage | null | undefined, alt: string, fit: "cover" | "contain" = "cover") {
  const src = imageSource(image);
  return src ? <img src={src} alt={alt} loading="lazy" style={{ objectFit: fit }} /> : null;
}

function renderVideo(
  video: IkasVideo | null | undefined,
  poster: IkasImage | null | undefined,
  label: string,
  props: Props,
) {
  const src = videoSource(video);
  if (!src) return null;

  const posterSrc = imageSource(poster);
  return (
    <video
      src={src}
      poster={posterSrc || undefined}
      controls={props.videoKontrolleriniGoster !== false}
      muted={props.videoSessizOynat === true}
      loop={props.videoDonguluOynat === true}
      playsInline
      preload="metadata"
      aria-label={label || undefined}
    />
  );
}

function renderCopy(
  titleValue: string,
  descriptionValue: string,
  buttonTextValue: string,
  buttonUrlValue: string | undefined,
  props: Props,
) {
  const title = sanitizeHtml(titleValue);
  const description = sanitizeHtml(descriptionValue);
  const buttonText = buttonTextValue.trim();
  const buttonUrl = buttonText && props.butonlariGoster !== false && buttonUrlValue?.trim()
    ? safeExternalNavigationHref(buttonUrlValue.trim(), "")
    : "";

  if (!title && !description && !(buttonText && buttonUrl)) return null;

  return (
    <div className="ozellestirilebilir-icerik-bolumu-copy">
      {title && <div className="ozellestirilebilir-icerik-bolumu-title" dangerouslySetInnerHTML={{ __html: title }} />}
      {description && <div className="ozellestirilebilir-icerik-bolumu-description" dangerouslySetInnerHTML={{ __html: description }} />}
      {buttonUrl && buttonText && (
        <a
          className="ozellestirilebilir-icerik-bolumu-button"
          href={buttonUrl}
          style={{
            backgroundColor: safeColor(props.buttonBackgroundColor, "#111827"),
            color: safeColor(props.buttonTextColor, "#ffffff"),
          }}
        >
          {buttonText}
        </a>
      )}
    </div>
  );
}

export function OzellestirilebilirIcerikBolumu(props: Props) {
  const configuredSectionType = props.bolumTuru ?? "yalnizca-yazi";
  const textAlignment = props.yaziHizalamasi === "ortalanmis"
    ? "center"
    : props.yaziHizalamasi === "saga-hizali"
      ? "right"
      : "left";
  const sectionStyle = {
    backgroundColor: safeColor(props.backgroundColor, "#ffffff"),
    color: safeColor(props.textColor, "#1f2937"),
    minHeight: safeLength(props.bolumMinYuksekligi, "100vh", true),
    textAlign: textAlignment,
    "--content-max-width": safeLength(props.icerikGenisligi, "1280px", true, true),
    "--copy-align": textAlignment === "center" ? "center" : textAlignment === "right" ? "flex-end" : "flex-start",
    "--desktop-padding-top": `${boundedNumber(props.masaustuUstBosluk, 64, 0, 512)}px`,
    "--desktop-padding-bottom": `${boundedNumber(props.masaustuAltBosluk, 64, 0, 512)}px`,
    "--desktop-padding-side": `${boundedNumber(props.masaustuYanBosluk, 24, 0, 256)}px`,
    "--mobile-padding-top": `${boundedNumber(props.mobilUstBosluk, 40, 0, 512)}px`,
    "--mobile-padding-bottom": `${boundedNumber(props.mobilAltBosluk, 40, 0, 512)}px`,
    "--mobile-padding-side": `${boundedNumber(props.mobilYanBosluk, 16, 0, 256)}px`,
    "--title-font-size": `${boundedNumber(props.baslikYaziBoyutu, 42, 12, 96)}px`,
    "--description-font-size": `${boundedNumber(props.aciklamaYaziBoyutu, 16, 10, 48)}px`,
    "--media-border-radius": `${boundedNumber(props.medyaKoseYumusakligi, 12, 0, 64)}px`,
  } as JSX.CSSProperties;
  const showMedia = props.medyaGoster !== false;
  const imageTextImage = showMedia ? renderImage(
    props.gorselYaziGorseli,
    localized(props.gorselYaziGorselAciklamasi, props.gorselYaziGorselAciklamasiIngilizce),
  ) : null;
  const imageTextCopy = renderCopy(
    localized(props.gorselYaziBaslik, props.gorselYaziBaslikIngilizce),
    localized(props.gorselYaziAciklama, props.gorselYaziAciklamaIngilizce),
    localized(props.gorselYaziDugmeMetni, props.gorselYaziDugmeMetniIngilizce),
    props.gorselYaziDugmeBaglantisi,
    props,
  );
  const textOnlyCopy = renderCopy(
    localized(props.yaziHizaliBaslik, props.yaziHizaliBaslikIngilizce),
    localized(props.yaziHizaliAciklama, props.yaziHizaliAciklamaIngilizce),
    localized(props.yaziHizaliDugmeMetni, props.yaziHizaliDugmeMetniIngilizce),
    props.yaziHizaliDugmeBaglantisi,
    props,
  );
  const videoTextVideo = showMedia
    ? renderVideo(props.videoYaziVideo, props.videoYaziKapakGorseli, localized(props.videoYaziVideoAciklamasi, props.videoYaziVideoAciklamasiIngilizce), props)
    : null;
  const videoTextCopy = renderCopy(
    localized(props.videoYaziBaslik, props.videoYaziBaslikIngilizce),
    localized(props.videoYaziAciklama, props.videoYaziAciklamaIngilizce),
    localized(props.videoYaziDugmeMetni, props.videoYaziDugmeMetniIngilizce),
    props.videoYaziDugmeBaglantisi,
    props,
  );
  const soloVideo = showMedia
    ? renderVideo(props.yalnizcaVideo, props.yalnizcaVideoKapakGorseli, localized(props.yalnizcaVideoAciklamasi, props.yalnizcaVideoAciklamasiIngilizce), props)
    : null;
  const pairedVideo = showMedia
    ? renderVideo(props.videoGorselVideo, props.videoGorselVideoKapak, localized(props.videoGorselVideoAciklamasi, props.videoGorselVideoAciklamasiIngilizce), props)
    : null;
  const pairedImage = showMedia
    ? renderImage(props.videoGorselGorseli, localized(props.videoGorselAlternatifMetni, props.videoGorselAlternatifMetniIngilizce))
    : null;
  const soloImage = showMedia
    ? renderImage(
      props.yalnizcaGorsel,
      localized(props.yalnizcaGorselAciklamasi, props.yalnizcaGorselAciklamasiIngilizce),
      props.yalnizcaGorselSigdirma ?? "cover",
    )
    : null;
  const sectionType = configuredSectionType === "yalnizca-yazi" &&
    !textOnlyCopy &&
    (imageTextImage || imageTextCopy)
    ? "gorsel-yazi"
    : configuredSectionType;

  let content = null;
  if (sectionType === "gorsel-yazi") {
    const layout = props.gorselYaziDuzeni ?? "gorsel-solda";
    const mediaFirst = layout === "gorsel-solda" || layout === "gorsel-ustte";
    content = (
      <div className={`ozellestirilebilir-icerik-bolumu-layout image-text layout-${layout}${imageTextImage ? " has-media" : ""}${imageTextCopy ? " has-copy" : ""}`}>
        {mediaFirst ? <>{imageTextImage && <div className="ozellestirilebilir-icerik-bolumu-media">{imageTextImage}</div>}{imageTextCopy}</> : <>{imageTextCopy}{imageTextImage && <div className="ozellestirilebilir-icerik-bolumu-media">{imageTextImage}</div>}</>}
      </div>
    );
  } else if (sectionType === "yalnizca-yazi") {
    content = textOnlyCopy;
  } else if (sectionType === "video-yazi") {
    const layout = props.videoYaziDuzeni ?? "video-solda";
    const mediaFirst = layout === "video-solda" || layout === "video-ustte";
    content = (
      <div className={`ozellestirilebilir-icerik-bolumu-layout video-text layout-${layout}${videoTextVideo ? " has-media" : ""}${videoTextCopy ? " has-copy" : ""}`}>
        {mediaFirst ? <>{videoTextVideo && <div className="ozellestirilebilir-icerik-bolumu-media">{videoTextVideo}</div>}{videoTextCopy}</> : <>{videoTextCopy}{videoTextVideo && <div className="ozellestirilebilir-icerik-bolumu-media">{videoTextVideo}</div>}</>}
      </div>
    );
  } else if (sectionType === "yalnizca-video") {
    const widthClass = props.tekMedyaGenisligi === "tam-genislik" ? " is-wide" : "";
    content = soloVideo && <div className={`ozellestirilebilir-icerik-bolumu-single-media${widthClass}`}><div className="ozellestirilebilir-icerik-bolumu-media">{soloVideo}</div></div>;
  } else if (sectionType === "video-gorsel") {
    const arrangement = props.videoGorselDuzeni ?? "yan-yana";
    const mediaCount = Number(Boolean(pairedVideo)) + Number(Boolean(pairedImage));
    content = (
      <div className={`ozellestirilebilir-icerik-bolumu-layout video-image layout-${arrangement}${mediaCount === 1 ? " has-one-media" : ""}`}>
        {pairedVideo && <div className="ozellestirilebilir-icerik-bolumu-media">{pairedVideo}</div>}
        {pairedImage && <div className="ozellestirilebilir-icerik-bolumu-media">{pairedImage}</div>}
      </div>
    );
  } else {
    const widthClass = props.tekMedyaGenisligi === "tam-genislik" ? " is-wide" : "";
    content = soloImage && <div className={`ozellestirilebilir-icerik-bolumu-single-media${widthClass}`}><div className="ozellestirilebilir-icerik-bolumu-media">{soloImage}</div></div>;
  }

  return (
    <section className="ozellestirilebilir-icerik-bolumu" style={sectionStyle}>
      <div className="ozellestirilebilir-icerik-bolumu-inner">
        {content}
      </div>
    </section>
  );
}

export default OzellestirilebilirIcerikBolumu;
