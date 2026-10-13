import { useEffect, useRef, useState } from "preact/hooks";
import { tLocalized } from "../../utils/i18n";

interface Props {
  videoHref: string;
  poster?: string;
  title: string;
}

interface YouTubeVideo {
  miniEmbedHref: string;
  modalEmbedHref: string;
}

function getYouTubeVideo(href: string): YouTubeVideo | null {
  try {
    const url = new URL(href);
    const host = url.hostname.toLowerCase();
    let videoId = "";

    if (host === "youtu.be") {
      videoId = url.pathname.split("/").filter(Boolean)[0] || "";
    } else if (["youtube.com", "www.youtube.com", "m.youtube.com"].includes(host)) {
      const segments = url.pathname.split("/").filter(Boolean);
      videoId = segments[0] === "shorts" || segments[0] === "embed" ? segments[1] || "" : url.searchParams.get("v") || "";
    }

    if (!/^[\w-]{11}$/.test(videoId)) return null;

    const sharedParams = {
      playsinline: "1",
      rel: "0",
    };
    const miniParams = new URLSearchParams({
      ...sharedParams,
      autoplay: "1",
      controls: "0",
      disablekb: "1",
      enablejsapi: "1",
      fs: "0",
      iv_load_policy: "3",
      loop: "1",
      modestbranding: "1",
      mute: "1",
      playlist: videoId,
      showinfo: "0",
    });
    const modalParams = new URLSearchParams({
      ...sharedParams,
      autoplay: "1",
      controls: "0",
      disablekb: "1",
      enablejsapi: "1",
      fs: "0",
      iv_load_policy: "3",
      loop: "1",
      modestbranding: "1",
      mute: "1",
      playlist: videoId,
    });
    return {
      miniEmbedHref: `https://www.youtube-nocookie.com/embed/${videoId}?${miniParams.toString()}`,
      modalEmbedHref: `https://www.youtube-nocookie.com/embed/${videoId}?${modalParams.toString()}`,
    };
  } catch {
    return null;
  }
}

export default function ThreeMashShopperVideo({ videoHref, poster, title }: Props) {
  const videoHitAreaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const miniYouTubeRef = useRef<HTMLIFrameElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const youtubeVideo = getYouTubeVideo(videoHref);

  useEffect(() => {
    if (!youtubeVideo) return;

    const iframe = miniYouTubeRef.current;
    const frameWindow = iframe?.contentWindow;
    if (!iframe || !frameWindow) return;

    const sendCommand = (func: string, args: unknown[] = []) => {
      frameWindow.postMessage(
        JSON.stringify({ event: "command", func, args }),
        "https://www.youtube-nocookie.com"
      );
    };
    const onMessage = (event: MessageEvent) => {
      if (
        event.source !== frameWindow ||
        event.origin !== "https://www.youtube-nocookie.com" ||
        typeof event.data !== "string"
      ) {
        return;
      }

      let message: { event?: string; info?: number };
      try {
        message = JSON.parse(event.data) as { event?: string; info?: number };
      } catch {
        return;
      }

      if (message.event === "onStateChange" && message.info === 0) {
        sendCommand("seekTo", [0, true]);
        sendCommand("playVideo");
      }
    };
    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
    };
  }, [youtubeVideo?.miniEmbedHref]);

  useEffect(() => {
    if (!isExpanded) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsExpanded(false);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
      videoHitAreaRef.current?.focus();
    };
  }, [isExpanded]);

  if (isDismissed) return null;

  function dismiss() {
    videoRef.current?.pause();
    setIsExpanded(false);
    setIsDismissed(true);
  }

  return (
    <>
      <aside
        className="tmpv-shopper"
        aria-label={title}
      >
        <div
          ref={videoHitAreaRef}
          className="tmpv-shopper-video-hit-area"
          role="button"
          tabIndex={0}
          aria-label={tLocalized("Videoyu büyüt ve oynat", "Expand and play video")}
          onClick={() => setIsExpanded(true)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setIsExpanded(true);
            }
          }}
        >
          {youtubeVideo ? (
            <iframe
              ref={miniYouTubeRef}
              className="tmpv-shopper-mini-embed"
              src={youtubeVideo.miniEmbedHref}
              title={title}
              allow="autoplay; encrypted-media; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              tabIndex={-1}
              onLoad={() => {
                miniYouTubeRef.current?.contentWindow?.postMessage(
                  JSON.stringify({ event: "command", func: "addEventListener", args: ["onStateChange"] }),
                  "https://www.youtube-nocookie.com"
                );
              }}
            />
          ) : (
            <video
              ref={videoRef}
              className="wht-neo-shopper-video"
              data-role="videoPlayer"
              src={videoHref}
              poster={poster || undefined}
              playsInline
              autoPlay
              muted
              preload="auto"
              loop
            />
          )}
        </div>
        <button
          type="button"
          className="tmpv-shopper-close"
          onClick={dismiss}
          aria-label={tLocalized("Videoyu kapat", "Close video")}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m7 7 10 10M17 7 7 17" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </button>
      </aside>

      {isExpanded ? (
        <div
          className="tmpv-shopper-modal"
          onClick={() => setIsExpanded(false)}
          role="presentation"
        >
          <section
            className="tmpv-shopper-dialog"
            role="dialog"
            aria-modal="true"
            aria-label={title}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              type="button"
              className="tmpv-shopper-modal-close"
              onClick={() => setIsExpanded(false)}
              aria-label={tLocalized("Videoyu kapat", "Close video")}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m7 7 10 10M17 7 7 17" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </button>
            {youtubeVideo ? (
              <iframe
                className="tmpv-shopper-modal-embed"
                src={youtubeVideo.modalEmbedHref}
                title={title}
                allow="autoplay; encrypted-media; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : (
              <video
                className="tmpv-shopper-modal-embed"
                src={videoHref}
                poster={poster || undefined}
                autoPlay
                controls
                loop
                playsInline
              />
            )}
          </section>
        </div>
      ) : null}
    </>
  );
}
