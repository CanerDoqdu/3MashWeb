import { getDefaultSrc } from "@ikas/bp-storefront";
import { Props } from "./types";

function propString(value: unknown) {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (!value || typeof value !== "object") return "";

  const data = value as Record<string, unknown>;
  const candidates = [
    data.src,
    data.url,
    data.defaultSrc,
    data.originalSrc,
    data.imageUrl,
    data.value,
    data.html,
    data.text,
    (data.image as Record<string, unknown> | undefined)?.src,
    (data.image as Record<string, unknown> | undefined)?.url,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) return candidate;
  }

  return "";
}

function text(value: unknown, fallback = "") {
  const trimmed = propString(value).trim();
  return trimmed || fallback;
}

function html(value: unknown) {
  return { __html: propString(value) };
}

function numberValue(value: number | undefined, fallback: number, min?: number, max?: number) {
  const next = Number(value);
  if (!Number.isFinite(next)) return fallback;
  return Math.min(max ?? next, Math.max(min ?? next, next));
}

function cssLength(value: number | undefined, fallback: number) {
  return `${numberValue(value, fallback)}px`;
}

function normalizedAlign(value: unknown) {
  const align = text(value, "center").toLowerCase();
  return ["left", "center", "right"].includes(align) ? align : "center";
}

function objectFit(value: unknown) {
  const fit = text(value, "cover").toLowerCase();
  return ["contain", "cover", "fill", "scale-down"].includes(fit) ? fit : "cover";
}

function imageSrc(value: unknown) {
  if (!value) return "";
  if (typeof value === "string") return value.trim();
  try {
    return getDefaultSrc(value as any) || propString(value);
  } catch {
    return propString(value);
  }
}

function addQuery(url: string, params: Record<string, string | number | boolean>) {
  try {
    const next = new URL(url);
    for (const [key, value] of Object.entries(params)) next.searchParams.set(key, String(value));
    return next.toString();
  } catch {
    const query = Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
      .join("&");
    return `${url}${url.includes("?") ? "&" : "?"}${query}`;
  }
}

function youtubeEmbed(value: string, autoplay: boolean, muted: boolean, loop: boolean, controls: boolean) {
  const raw = value.trim();
  if (!raw) return "";
  const match = raw.match(/(?:v=|youtu\.be\/|shorts\/|embed\/)([A-Za-z0-9_-]+)/);
  if (!match) return "";
  const id = match[1];
  return addQuery(`https://www.youtube.com/embed/${id}`, {
    rel: 0,
    modestbranding: 1,
    playsinline: 1,
    controls: controls ? 1 : 0,
    autoplay: autoplay ? 1 : 0,
    mute: muted || autoplay ? 1 : 0,
    loop: loop ? 1 : 0,
    playlist: loop ? id : "",
  });
}

function vimeoEmbed(value: string, autoplay: boolean, muted: boolean, loop: boolean, controls: boolean) {
  const raw = value.trim();
  if (!raw) return "";
  const match = raw.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (!match) return "";
  return addQuery(`https://player.vimeo.com/video/${match[1]}`, {
    autoplay: autoplay ? 1 : 0,
    muted: muted || autoplay ? 1 : 0,
    loop: loop ? 1 : 0,
    controls: controls ? 1 : 0,
  });
}

function embedUrl(value: string, autoplay: boolean, muted: boolean, loop: boolean, controls: boolean) {
  const raw = value.trim();
  if (!raw) return "";
  if (/youtube\.com|youtu\.be/i.test(raw)) return youtubeEmbed(raw, autoplay, muted, loop, controls);
  if (/vimeo\.com/i.test(raw)) return vimeoEmbed(raw, autoplay, muted, loop, controls);
  if (/\/embed\//i.test(raw) || /player\./i.test(raw)) {
    return addQuery(raw, {
      autoplay: autoplay ? 1 : 0,
      mute: muted || autoplay ? 1 : 0,
      muted: muted || autoplay ? 1 : 0,
      loop: loop ? 1 : 0,
      controls: controls ? 1 : 0,
    });
  }
  return "";
}

function isNativeVideo(value: string) {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(value.trim());
}

export function ThreeMashProductVideo(props: Props) {
  const videoUrl = text(props.videoUrl);
  const title = text(props.titleText);
  const description = text(props.descriptionHtml);
  const poster = imageSrc(props.posterImage);
  const controls = props.controlsEnabled !== false;
  const autoplay = props.autoplayEnabled === true;
  const muted = props.mutedEnabled === true || autoplay;
  const loop = props.loopEnabled === true;
  const playsInline = props.playsInlineEnabled !== false;
  const lazy = props.lazyLoadEnabled !== false;
  const align = normalizedAlign(props.textAlign);
  const embed = embedUrl(videoUrl, autoplay, muted, loop, controls);

  const style = {
    "--tmpv-bg": text(props.backgroundColor, "#ffffff"),
    "--tmpv-text": text(props.textColor, "#050505"),
    "--tmpv-muted": text(props.mutedTextColor, "#171717"),
    "--tmpv-max": cssLength(props.maxWidth, 1240),
    "--tmpv-video-max": cssLength(props.videoMaxWidth, 1240),
    "--tmpv-pt": cssLength(props.paddingTop, 72),
    "--tmpv-pb": cssLength(props.paddingBottom, 72),
    "--tmpv-ratio": text(props.videoAspectRatio, "16 / 9"),
    "--tmpv-radius": cssLength(props.videoBorderRadius, 0),
    "--tmpv-fit": objectFit(props.videoFit),
    "--tmpv-title-size": cssLength(props.titleFontSize, 28),
    "--tmpv-body-size": cssLength(props.bodyFontSize, 16),
    "--tmpv-text-gap": cssLength(props.textSpacing, 24),
  } as any;

  return (
    <section id={text(props.sectionAnchorId) || undefined} className="three-mash-product-video" style={style}>
      <div className="tmpv-wrap">
        {props.showText !== false && (title || description) ? (
          <div className={`tmpv-copy tmpv-copy-${align}`}>
            {title ? <h2>{title}</h2> : null}
            {description ? <div className="tmpv-description" dangerouslySetInnerHTML={html(props.descriptionHtml)} /> : null}
          </div>
        ) : null}

        <div className="tmpv-frame">
          {embed ? (
            <iframe
              src={embed}
              title={title || "Video"}
              loading={lazy ? "lazy" : undefined}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : videoUrl && isNativeVideo(videoUrl) ? (
            <video
              src={videoUrl}
              poster={poster || undefined}
              controls={controls}
              autoPlay={autoplay}
              muted={muted}
              loop={loop}
              playsInline={playsInline}
              preload={lazy ? "metadata" : "auto"}
            />
          ) : (
            <div className="tmpv-placeholder">{text(props.placeholderText, "Video linki ekleyin")}</div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ThreeMashProductVideo;
