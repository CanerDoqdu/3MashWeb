import { getDefaultSrc, type IkasImage, type IkasVideo } from "@ikas/bp-storefront";
import type { JSX } from "preact";
import { safeExternalNavigationHref } from "../../utils/safeRedirect";
import { isEnglishLocale } from "../../utils/i18n";
import { sanitizeHtml } from "../../utils/sanitizeHtml";
import type {
  CustomizableSectionLayout,
  CustomizableSectionMediaFit,
  CustomizableSectionTextAlignment,
} from "../../global-types";
import { Props } from "./types";

interface ContentBlock {
  enabled?: boolean;
  layout?: CustomizableSectionLayout;
  alignment?: CustomizableSectionTextAlignment;
  title?: string;
  description?: string;
  titleEn?: string;
  descriptionEn?: string;
  image?: IkasImage | null;
  imageAlt?: string;
  imageAltEn?: string;
  video?: IkasVideo | null;
  buttonText?: string;
  buttonTextEn?: string;
  buttonUrl?: string;
  backgroundColor?: string;
  textColor?: string;
}

function localized(value?: string, valueEn?: string): string {
  return (isEnglishLocale() ? valueEn : value)?.trim() ?? "";
}

function safeColor(value: string | undefined, fallback: string): string {
  const color = value?.trim() ?? "";
  return /^(#[\da-f]{3,8}|rgba?\([\d\s.,%]+\)|hsla?\([\d\s.,%deg]+\)|[a-z]{1,20})$/i.test(color)
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
  return /^(?:0|(?:\d+(?:\.\d+)?)(?:px|rem|em|vh|svh|lvh|dvh|vw|svw|lvw|dvw|%))$|^auto$/i.test(height)
    ? height
    : "100vh";
}

function renderMedia(block: ContentBlock, mediaFit: CustomizableSectionMediaFit, mediaRadius: number) {
  const layout = block.layout ?? "text";
  if (layout === "text") return null;

  const isVideo = layout.startsWith("video");
  const imageUrl = block.image ? getDefaultSrc(block.image) : "";
  const videoUrl = block.video?.videoSrc?.trim() ?? "";
  const mediaUrl = isVideo ? videoUrl : imageUrl;
  if (!mediaUrl) return null;

  const style: JSX.CSSProperties = {
    borderRadius: `${mediaRadius}px`,
    objectFit: mediaFit,
  };

  if (isVideo) {
    const poster = block.video?.thumbnailImage
      ? getDefaultSrc(block.video.thumbnailImage)
      : undefined;
    return (
      <div className="ozellestirilebilir-bolum-media">
        <video
          src={mediaUrl}
          poster={poster}
          controls
          playsInline
          preload="metadata"
          style={style}
        />
      </div>
    );
  }

  return (
    <div className="ozellestirilebilir-bolum-media">
      <img
        src={mediaUrl}
        alt={localized(block.imageAlt, block.imageAltEn)}
        loading="lazy"
        decoding="async"
        style={style}
      />
    </div>
  );
}

function renderBlock(block: ContentBlock, index: number, mediaFit: CustomizableSectionMediaFit, mediaRadius: number, buttonBackground: string, buttonText: string, defaultTextColor: string, blockRadius: number) {
  if (block.enabled !== true) return null;

  const title = sanitizeHtml(localized(block.title, block.titleEn));
  const description = sanitizeHtml(localized(block.description, block.descriptionEn));
  const buttonLabel = localized(block.buttonText, block.buttonTextEn);
  const buttonHref = safeExternalNavigationHref(block.buttonUrl, "");
  const media = renderMedia(block, mediaFit, mediaRadius);
  if (!title && !description && !media && !(buttonLabel && buttonHref)) return null;

  const layout = block.layout ?? "text";
  const layoutClass = layout.replace(/^(image|video)$/, "$1-left");
  const textColor = safeColor(block.textColor, defaultTextColor);
  const backgroundColor = safeColor(block.backgroundColor, "transparent");

  return (
    <article
      className={`ozellestirilebilir-bolum-block ozellestirilebilir-bolum-layout-${layoutClass}`}
      data-layout={layout}
      data-has-media={media ? "true" : "false"}
      data-has-copy={title || description || (buttonLabel && buttonHref) ? "true" : "false"}
      key={`custom-block-${index + 1}`}
      style={{
        backgroundColor,
        borderRadius: `${blockRadius}px`,
        color: textColor,
        textAlign: block.alignment ?? "left",
      }}
    >
      {media}
      {(title || description || (buttonLabel && buttonHref)) && (
        <div className="ozellestirilebilir-bolum-copy">
          {title && <div className="ozellestirilebilir-bolum-title" dangerouslySetInnerHTML={{ __html: title }} />}
          {description && <div className="ozellestirilebilir-bolum-description" dangerouslySetInnerHTML={{ __html: description }} />}
          {buttonLabel && buttonHref && (
            <a
              className="ozellestirilebilir-bolum-button"
              href={buttonHref}
              style={{ backgroundColor: buttonBackground, color: buttonText }}
            >
              {buttonLabel}
            </a>
          )}
        </div>
      )}
    </article>
  );
}

export function OzellestirilebilirBolum(props: Props) {
  const heading = sanitizeHtml(localized(props.sectionHeading, props.sectionHeadingEn));
  const description = sanitizeHtml(localized(props.sectionDescription, props.sectionDescriptionEn));
  const blocks: ContentBlock[] = [
    { enabled: props.showBlock1, layout: props.block1Layout, alignment: props.block1Alignment, title: props.block1Title, description: props.block1Description, titleEn: props.block1TitleEn, descriptionEn: props.block1DescriptionEn, image: props.block1Image, imageAlt: props.block1ImageAlt, imageAltEn: props.block1ImageAltEn, video: props.block1Video, buttonText: props.block1ButtonText, buttonTextEn: props.block1ButtonTextEn, buttonUrl: props.block1ButtonUrl, backgroundColor: props.block1BackgroundColor, textColor: props.block1TextColor },
    { enabled: props.showBlock2, layout: props.block2Layout, alignment: props.block2Alignment, title: props.block2Title, description: props.block2Description, titleEn: props.block2TitleEn, descriptionEn: props.block2DescriptionEn, image: props.block2Image, imageAlt: props.block2ImageAlt, imageAltEn: props.block2ImageAltEn, video: props.block2Video, buttonText: props.block2ButtonText, buttonTextEn: props.block2ButtonTextEn, buttonUrl: props.block2ButtonUrl, backgroundColor: props.block2BackgroundColor, textColor: props.block2TextColor },
    { enabled: props.showBlock3, layout: props.block3Layout, alignment: props.block3Alignment, title: props.block3Title, description: props.block3Description, titleEn: props.block3TitleEn, descriptionEn: props.block3DescriptionEn, image: props.block3Image, imageAlt: props.block3ImageAlt, imageAltEn: props.block3ImageAltEn, video: props.block3Video, buttonText: props.block3ButtonText, buttonTextEn: props.block3ButtonTextEn, buttonUrl: props.block3ButtonUrl, backgroundColor: props.block3BackgroundColor, textColor: props.block3TextColor },
    { enabled: props.showBlock4, layout: props.block4Layout, alignment: props.block4Alignment, title: props.block4Title, description: props.block4Description, titleEn: props.block4TitleEn, descriptionEn: props.block4DescriptionEn, image: props.block4Image, imageAlt: props.block4ImageAlt, imageAltEn: props.block4ImageAltEn, video: props.block4Video, buttonText: props.block4ButtonText, buttonTextEn: props.block4ButtonTextEn, buttonUrl: props.block4ButtonUrl, backgroundColor: props.block4BackgroundColor, textColor: props.block4TextColor },
    { enabled: props.showBlock5, layout: props.block5Layout, alignment: props.block5Alignment, title: props.block5Title, description: props.block5Description, titleEn: props.block5TitleEn, descriptionEn: props.block5DescriptionEn, image: props.block5Image, imageAlt: props.block5ImageAlt, imageAltEn: props.block5ImageAltEn, video: props.block5Video, buttonText: props.block5ButtonText, buttonTextEn: props.block5ButtonTextEn, buttonUrl: props.block5ButtonUrl, backgroundColor: props.block5BackgroundColor, textColor: props.block5TextColor },
    { enabled: props.showBlock6, layout: props.block6Layout, alignment: props.block6Alignment, title: props.block6Title, description: props.block6Description, titleEn: props.block6TitleEn, descriptionEn: props.block6DescriptionEn, image: props.block6Image, imageAlt: props.block6ImageAlt, imageAltEn: props.block6ImageAltEn, video: props.block6Video, buttonText: props.block6ButtonText, buttonTextEn: props.block6ButtonTextEn, buttonUrl: props.block6ButtonUrl, backgroundColor: props.block6BackgroundColor, textColor: props.block6TextColor },
  ];

  const desktopColumns = boundedNumber(props.desktopColumns, 2, 1, 4);
  const mobileColumns = boundedNumber(props.mobileColumns, 1, 1, 2);
  const gap = boundedNumber(props.desktopGap, 24, 0, 128);
  const style = {
    backgroundColor: safeColor(props.backgroundColor, "#ffffff"),
    color: safeColor(props.textColor, "#1f2937"),
    minHeight: safeMinHeight(props.sectionMinHeight),
    "--desktop-padding-top": `${boundedNumber(props.desktopPaddingTop, 64, 0, 512)}px`,
    "--desktop-padding-bottom": `${boundedNumber(props.desktopPaddingBottom, 64, 0, 512)}px`,
    "--desktop-columns": desktopColumns,
    "--mobile-columns": mobileColumns,
    "--desktop-gap": `${gap}px`,
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
          {blocks.map((block, index) =>
            renderBlock(
              block,
              index,
              props.mediaFit ?? "cover",
              boundedNumber(props.mediaBorderRadius, 12, 0, 128),
              safeColor(props.buttonBackgroundColor, "#111827"),
              safeColor(props.buttonTextColor, "#ffffff"),
              safeColor(props.textColor, "#1f2937"),
              boundedNumber(props.blockBorderRadius, 12, 0, 128),
            )
          )}
        </div>
      </div>
    </section>
  );
}

export default OzellestirilebilirBolum;
