import { Props } from "./types";

function propString(value: unknown) {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (!value || typeof value !== "object") return "";

  const data = value as Record<string, unknown>;
  const candidates = [
    data.src,
    data.url,
    data.href,
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

function html(value: unknown) {
  return { __html: propString(value) };
}

function text(value: unknown, fallback: string) {
  const trimmed = propString(value).trim();
  return trimmed ? trimmed : fallback;
}

function pascal(value: string) {
  return value.charAt(0).toLocaleUpperCase("tr") + value.slice(1);
}

function productBasedApplies(props: Props) {
  return props.productBasedEnabled !== false;
}

const ARGENZ_PRODUCT_BASED_DEFAULTS: Record<string, unknown> = {
  productBasedTitleHtml: "",
  productBasedTitleLine1Before: "",
  productBasedTitleLine1Highlight: "Süper Işık Geçirgenliği(ST)",
  productBasedTitleLine1After: " ile Üst Düzey Uyum",
  productBasedTitleLine2Before: "",
  productBasedTitleLine2Highlight: "",
  productBasedTitleLine2After: "",
  productBasedTitleLine3Before: "",
  productBasedTitleLine3Highlight: "",
  productBasedTitleLine3After: "",
  productBasedIntroHtml:
    "<p>Anterior bölgede uygulanacak kron ve köprü uygulamalarında yüksek ışık geçirgenliği ve yandaki diş rengi ile uyum en üst düzeyde aranmaktadır.</p><p>ArgenZ ST Multilayer Zirkon Blok, doğal dentinin belirgin renk geçişini katman çizgileri olmadan taklit edebilmesi ve süper şeffaflık özelliğiyle diş hekimleri ve laboratuvarlarına büyük avantaj sağlar.</p><p>Makyaj gerektirmez, <b>sadece glaze uygulayıp</b> protezi bitime gönderebilirsiniz.</p>",
  productBasedDetailHtml: "",
  productBasedProofTitle: "",
  productBasedQuote1Text: "",
  productBasedQuote1Name: "",
  productBasedQuote1Role: "",
  productBasedQuote2Text: "",
  productBasedQuote2Name: "",
  productBasedQuote2Role: "",
  productBasedQuote3Text: "",
  productBasedQuote3Name: "",
  productBasedQuote3Role: "",
  productBasedShowScoreBars: false,
  productBasedScore1Text: "",
  productBasedScore2Text: "",
  productBasedScore3Text: "",
  productBasedMediaLayout: "single",
  productBasedImageUrl: "https://cdn.myikas.com/images/theme-images/5574c72d-1874-42b8-9512-c20987744b5c/image_1080.webp",
  productBasedImageAlt: "ArgenZ ST Multilayer zirkon blok ile doğal diş görünümü",
  productBasedImageLabel: "",
  productBasedImage2Url: "",
  productBasedImage2Alt: "",
  productBasedImage2Label: "",
  productBasedImage3Url: "",
  productBasedImage3Alt: "",
  productBasedImage3Label: "",
  productBasedImage4Url: "",
  productBasedImage4Alt: "",
  productBasedImage4Label: "",
  productBasedImageObjectFit: "contain",
  productBasedAccentColor: "#dbfa37",
  productBasedMediaBackgroundColor: "#ffffff",
};

function filled(value: unknown) {
  return typeof value === "string" ? value.trim() !== "" : value !== undefined && value !== null;
}

function normalized(value: unknown) {
  return propString(value).trim().toLocaleLowerCase("tr");
}

function hasStaleSplitContent(data: Record<string, unknown>) {
  const titleParts = [
    data.productBasedTitleHtml,
    data.productBasedTitleLine1Before,
    data.productBasedTitleLine1Highlight,
    data.productBasedTitleLine1After,
    data.productBasedTitleLine2Before,
    data.productBasedTitleLine2Highlight,
    data.productBasedTitleLine2After,
    data.productBasedTitleLine3Before,
    data.productBasedTitleLine3Highlight,
    data.productBasedTitleLine3After,
  ]
    .map(normalized)
    .join(" ");

  const bodyParts = [data.productBasedIntroHtml, data.productBasedDetailHtml, data.productBasedQuote1Text, data.productBasedQuote2Text, data.productBasedQuote3Text]
    .map(normalized)
    .join(" ");

  const imageParts = [data.productBasedImageUrl, data.productBasedImage2Url, data.productBasedImage3Url, data.productBasedImage4Url]
    .map(normalized)
    .join(" ");

  return (
    titleParts.includes("katman çizgileri") ||
    titleParts.includes("olmadan") ||
    titleParts.includes("doğal diş") ||
    bodyParts.includes("koleden insizale") ||
    bodyParts.includes("argenz ht+") ||
    imageParts.includes("52f4db8b") ||
    imageParts.includes("409af8d9") ||
    imageParts.includes("def44dad")
  );
}

function productBasedProps(props: Props): Props {
  if (!productBasedApplies(props)) return props;

  const source = props as Record<string, unknown>;
  const useArgenzDefaults = hasStaleSplitContent(source);

  return new Proxy(props as Record<string, unknown>, {
    get(target, prop) {
      if (typeof prop !== "string") return Reflect.get(target, prop);
      if (prop.startsWith("productBased")) return target[prop];
      const productBasedName = `productBased${pascal(prop)}`;
      const productBasedValue = target[productBasedName];
      if (useArgenzDefaults && productBasedName in ARGENZ_PRODUCT_BASED_DEFAULTS) {
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

function cssLength(value: unknown, fallback: number, unit = "px") {
  return `${numberValue(value, fallback)}${unit}`;
}

function ratioValue(value: unknown, fallback: string) {
  const trimmed = propString(value).trim();
  return trimmed || fallback;
}

function mediaMode(value?: unknown) {
  const normalized = propString(value).trim().toLowerCase();
  return normalized === "grid" || normalized === "compare" || normalized === "karşılaştırma" ? "grid" : "single";
}

function objectFit(value?: unknown) {
  const normalized = propString(value).trim().toLowerCase();
  return ["contain", "cover", "fill", "scale-down"].includes(normalized) ? normalized : "cover";
}

function clampPercent(value: unknown, fallback: number) {
  return numberValue(value, fallback, 0, 100);
}

function renderTitle(props: Props) {
  if (propString(props.titleHtml).trim()) {
    return <h2 className="tmpsf-title" dangerouslySetInnerHTML={html(props.titleHtml)} />;
  }

  const lines = [
    [text(props.titleLine1Before, ""), text(props.titleLine1Highlight, ""), text(props.titleLine1After, "")],
    [text(props.titleLine2Before, ""), text(props.titleLine2Highlight, ""), text(props.titleLine2After, "")],
    [text(props.titleLine3Before, ""), text(props.titleLine3Highlight, ""), text(props.titleLine3After, "")],
  ];

  return (
    <h2 className="tmpsf-title">
      {lines.map(([before, highlight, after], index) => {
        if (!before && !highlight && !after) return null;
        return (
          <span className="tmpsf-title-line" key={index}>
            {before ? <>{before}</> : null}
            {highlight ? <mark>{highlight}</mark> : null}
            {after ? <>{after}</> : null}
          </span>
        );
      })}
    </h2>
  );
}

function renderQuote(textValue: unknown, name: unknown, role: unknown, index?: number) {
  const quoteText = propString(textValue).trim();
  const nameText = propString(name).trim();
  const roleText = propString(role).trim();
  if (!quoteText) return null;

  return (
    <figure className="tmpsf-quote" key={index}>
      <blockquote dangerouslySetInnerHTML={html(quoteText)} />
      {nameText || roleText ? (
        <figcaption>
          {nameText ? <b>{nameText}</b> : null}
          {roleText ? <span>{roleText}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}

function renderScore(textValue: unknown, value: number | undefined, fallbackValue: number, index: number) {
  const scoreText = propString(textValue).trim();
  if (!scoreText) return null;
  const score = clampPercent(value, fallbackValue);

  return (
    <div className="tmpsf-score" key={index}>
      <p dangerouslySetInnerHTML={html(scoreText)} />
      <div className="tmpsf-score-row">
        <span className="tmpsf-score-track">
          <span style={{ width: `${score}%` }} />
        </span>
        <b>%{score}</b>
      </div>
    </div>
  );
}

function renderMediaItem(src: unknown, alt: unknown, label: unknown, index: number) {
  const srcText = propString(src).trim();
  const altText = propString(alt).trim();
  const labelText = propString(label).trim();
  if (!srcText) return null;

  return (
    <figure className="tmpsf-media-item" key={index}>
      {labelText ? <figcaption>{labelText}</figcaption> : null}
      <img src={srcText} alt={altText || labelText || ""} loading="lazy" decoding="async" />
    </figure>
  );
}

export function ThreeMashProductSplitFeature(props: Props) {
  const viewProps = productBasedProps(props);
  const mode = mediaMode(viewProps.mediaLayout);
  const mediaItems = [
    renderMediaItem(viewProps.imageUrl, viewProps.imageAlt, viewProps.imageLabel, 1),
    renderMediaItem(viewProps.image2Url, viewProps.image2Alt, viewProps.image2Label, 2),
    renderMediaItem(viewProps.image3Url, viewProps.image3Alt, viewProps.image3Label, 3),
    renderMediaItem(viewProps.image4Url, viewProps.image4Alt, viewProps.image4Label, 4),
  ].filter(Boolean);

  const style = {
    "--tmpsf-bg": text(viewProps.backgroundColor, "#ffffff"),
    "--tmpsf-text": text(viewProps.textColor, "#050505"),
    "--tmpsf-muted": text(viewProps.mutedTextColor, "#181818"),
    "--tmpsf-accent": text(viewProps.accentColor, "#c7f136"),
    "--tmpsf-media-bg": text(viewProps.mediaBackgroundColor, "#eeeeee"),
    "--tmpsf-score-track": text(viewProps.scoreTrackColor, "#050505"),
    "--tmpsf-max": cssLength(viewProps.maxWidth, 1240),
    "--tmpsf-pt": cssLength(viewProps.paddingTop, 82),
    "--tmpsf-pb": cssLength(viewProps.paddingBottom, 82),
    "--tmpsf-gap": cssLength(viewProps.columnGap, 64),
    "--tmpsf-text-col": cssLength(viewProps.textColumnWidth, 420),
    "--tmpsf-media-col": cssLength(viewProps.mediaColumnWidth, 720),
    "--tmpsf-title-size": cssLength(viewProps.titleFontSize, 34),
    "--tmpsf-body-size": cssLength(viewProps.bodyFontSize, 17),
    "--tmpsf-media-ratio": ratioValue(viewProps.mediaAspectRatio, mode === "grid" ? "1.44 / 1" : "1.5 / 1"),
    "--tmpsf-media-radius": cssLength(viewProps.mediaBorderRadius, 28),
    "--tmpsf-image-fit": objectFit(viewProps.imageObjectFit),
    "--tmpsf-image-scale": numberValue(viewProps.imageScale, 1, 0.2, 2),
    "--tmpsf-image-x": cssLength(viewProps.imageXOffset, 0),
    "--tmpsf-image-y": cssLength(viewProps.imageYOffset, 0),
  } as any;

  const quoteNodes = [
    renderQuote(viewProps.quote1Text, viewProps.quote1Name, viewProps.quote1Role, 1),
    renderQuote(viewProps.quote2Text, viewProps.quote2Name, viewProps.quote2Role, 2),
    renderQuote(viewProps.quote3Text, viewProps.quote3Name, viewProps.quote3Role, 3),
  ].filter(Boolean);

  const scoreNodes = [
    renderScore(viewProps.score1Text, viewProps.score1Value, 99, 1),
    renderScore(viewProps.score2Text, viewProps.score2Value, 97, 2),
    renderScore(viewProps.score3Text, viewProps.score3Value, 96, 3),
  ].filter(Boolean);

  return (
    <section
      id={text(viewProps.sectionAnchorId, "") || undefined}
      className={`three-mash-product-split-feature${viewProps.reverseLayout ? " is-reversed" : ""} is-${mode}`}
      style={style}
    >
      <div className="tmpsf-wrap">
        <div className="tmpsf-copy">
          {renderTitle(viewProps)}
          {text(viewProps.introHtml, "") ? <div className="tmpsf-intro" dangerouslySetInnerHTML={html(viewProps.introHtml)} /> : null}
          {text(viewProps.detailHtml, "") ? <div className="tmpsf-detail" dangerouslySetInnerHTML={html(viewProps.detailHtml)} /> : null}
          {text(viewProps.proofTitle, "") ? <h3>{text(viewProps.proofTitle, "")}</h3> : null}
          {viewProps.showScoreBars ? <div className="tmpsf-scores">{scoreNodes}</div> : <div className="tmpsf-quotes">{quoteNodes}</div>}
        </div>

        <div className="tmpsf-media" aria-label={text(viewProps.imageAlt, "Ürün görseli")}>
          {mediaItems.length ? mediaItems : <div className="tmpsf-media-placeholder">Görsel ekleyin</div>}
        </div>
      </div>
    </section>
  );
}

export default ThreeMashProductSplitFeature;
