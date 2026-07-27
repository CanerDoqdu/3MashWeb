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

function pascal(value: string) {
  return value.charAt(0).toLocaleUpperCase("tr") + value.slice(1);
}

function productBasedApplies(props: Props) {
  return props.productBasedEnabled !== false;
}

const ARGENZ_PRODUCT_BASED_DEFAULTS: Record<string, unknown> = {
  productBasedVideoUrl: "https://www.youtube.com/watch?v=Sg2I5yC8qBk",
  productBasedShowText: false,
  productBasedTitleText: "ArgenZ ST Multilayer Zirkon Blok",
  productBasedMutedEnabled: true,
  productBasedAutoplayEnabled: false,
  productBasedControlsEnabled: true,
  productBasedLoopEnabled: false,
  productBasedVideoAspectRatio: "16 / 9",
  productBasedVideoMaxWidth: 1240,
};

function filled(value: unknown) {
  return typeof value === "string" ? value.trim() !== "" : value !== undefined && value !== null;
}

function normalized(value: unknown) {
  return propString(value).trim().toLocaleLowerCase("tr");
}

function hasWrongVideoValue(data: Record<string, unknown>) {
  const productBasedUrl = normalized(data.productBasedVideoUrl);
  const url = normalized(data.videoUrl);
  const current = productBasedUrl || url;
  if (!current) return false;
  if (current.includes("sg2i5yc8qbk")) return false;
  return current.includes("youtube") || current.includes("youtu.be") || current.includes("vimeo") || current.includes("mp4") || current.includes("webm");
}

function productBasedProps(props: Props): Props {
  if (!productBasedApplies(props)) return props;

  const source = props as Record<string, unknown>;
  const forceArgenzVideo = hasWrongVideoValue(source);

  return new Proxy(props as Record<string, unknown>, {
    get(target, prop) {
      if (typeof prop !== "string") return Reflect.get(target, prop);
      if (prop.startsWith("productBased")) return target[prop];
      const productBasedName = `productBased${pascal(prop)}`;
      const productBasedValue = target[productBasedName];
      if (forceArgenzVideo && productBasedName in ARGENZ_PRODUCT_BASED_DEFAULTS) {
        return ARGENZ_PRODUCT_BASED_DEFAULTS[productBasedName];
      }
      if (filled(productBasedValue)) return productBasedValue;
      if (filled(ARGENZ_PRODUCT_BASED_DEFAULTS[productBasedName])) return ARGENZ_PRODUCT_BASED_DEFAULTS[productBasedName];
      return target[prop];
    },
  }) as Props;
}

function numberValue(value: unknown, fallback: number, min?: number, max?: number) {
  const next = Number(value);
  if (!Number.isFinite(next)) return fallback;
  return Math.min(max ?? next, Math.max(min ?? next, next));
}

function cssLength(value: unknown, fallback: number) {
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
  const id = youtubeId(raw);
  if (!id) return "";
  const params: Record<string, string | number | boolean> = {
    rel: 0,
    playsinline: 1,
    controls: controls ? 1 : 0,
  };
  if (autoplay) params.autoplay = 1;
  if (muted || autoplay) params.mute = 1;
  if (loop) {
    params.loop = 1;
    params.playlist = id;
  }
  return addQuery(`https://www.youtube-nocookie.com/embed/${id}`, params);
}

function youtubeId(value: string) {
  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, "");
    if (host === "youtu.be") return url.pathname.split("/").filter(Boolean)[0] || "";
    if (host.endsWith("youtube.com")) {
      const byQuery = url.searchParams.get("v");
      if (byQuery) return byQuery;
      const parts = url.pathname.split("/").filter(Boolean);
      const markerIndex = parts.findIndex((part) => ["embed", "shorts", "live"].includes(part));
      if (markerIndex >= 0) return parts[markerIndex + 1] || "";
    }
  } catch {
    const match = value.match(/(?:v=|youtu\.be\/|shorts\/|embed\/|live\/)([A-Za-z0-9_-]+)/);
    return match?.[1] || "";
  }
  const match = value.match(/(?:v=|youtu\.be\/|shorts\/|embed\/|live\/)([A-Za-z0-9_-]+)/);
  return match?.[1] || "";
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
  const viewProps = productBasedProps(props);
  const videoUrl = text(viewProps.videoUrl);
  const title = text(viewProps.titleText);
  const description = text(viewProps.descriptionHtml);
  const poster = imageSrc(viewProps.posterImage);
  const controls = viewProps.controlsEnabled !== false;
  const autoplay = viewProps.autoplayEnabled === true;
  const muted = viewProps.mutedEnabled === true || autoplay;
  const loop = viewProps.loopEnabled === true;
  const playsInline = viewProps.playsInlineEnabled !== false;
  const lazy = viewProps.lazyLoadEnabled !== false;
  const align = normalizedAlign(viewProps.textAlign);
  const embed = embedUrl(videoUrl, autoplay, muted, loop, controls);

  const style = {
    "--tmpv-bg": text(viewProps.backgroundColor, "#ffffff"),
    "--tmpv-text": text(viewProps.textColor, "#050505"),
    "--tmpv-muted": text(viewProps.mutedTextColor, "#171717"),
    "--tmpv-max": cssLength(viewProps.maxWidth, 1240),
    "--tmpv-video-max": cssLength(viewProps.videoMaxWidth, 1240),
    "--tmpv-pt": cssLength(viewProps.paddingTop, 72),
    "--tmpv-pb": cssLength(viewProps.paddingBottom, 72),
    "--tmpv-ratio": text(viewProps.videoAspectRatio, "16 / 9"),
    "--tmpv-radius": cssLength(viewProps.videoBorderRadius, 0),
    "--tmpv-fit": objectFit(viewProps.videoFit),
    "--tmpv-title-size": cssLength(viewProps.titleFontSize, 28),
    "--tmpv-body-size": cssLength(viewProps.bodyFontSize, 16),
    "--tmpv-text-gap": cssLength(viewProps.textSpacing, 24),
  } as any;

  return (
    <section id={text(viewProps.sectionAnchorId) || undefined} className="three-mash-product-video" style={style}>
      <div className="tmpv-wrap">
        {viewProps.showText !== false && (title || description) ? (
          <div className={`tmpv-copy tmpv-copy-${align}`}>
            {title ? <h2>{title}</h2> : null}
            {description ? <div className="tmpv-description" dangerouslySetInnerHTML={html(viewProps.descriptionHtml)} /> : null}
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
            <div className="tmpv-placeholder">{text(viewProps.placeholderText, "Video linki ekleyin")}</div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ThreeMashProductVideo;
