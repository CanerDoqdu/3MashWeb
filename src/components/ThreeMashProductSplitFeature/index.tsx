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

function imageSrc(value: unknown) {
  if (!value) return "";
  if (typeof value === "string") return value.trim();
  try {
    return getDefaultSrc(value as any) || propString(value);
  } catch {
    return propString(value);
  }
}

function html(value: unknown) {
  return { __html: propString(value) };
}

function text(value: unknown, fallback: string) {
  const trimmed = propString(value).trim();
  return trimmed ? trimmed : fallback;
}

function pascal(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function productBasedApplies(props: Props) {
  return props.productBasedEnabled !== false;
}

const ARGENZ_PRODUCT_BASED_DEFAULTS: Record<string, unknown> = {
  productBasedTitleHtml: "",
  productBasedTitleLine1Before: "",
  productBasedTitleLine1Highlight: "Süper Işık Geçirgenliği(ST)",
  productBasedTitleLine1After: " ile",
  productBasedTitleLine2Before: "Üst Düzey Uyum",
  productBasedTitleLine2Highlight: "",
  productBasedTitleLine2After: "",
  productBasedTitleLine3Before: "",
  productBasedTitleLine3Highlight: "",
  productBasedTitleLine3After: "",
  productBasedIntroHtml:
    "<p>Anterior kron ve köprü uygulamalarında, yüksek ışık geçirgenliği ile yandaki diş rengine en üst düzeyde uyum aranır.</p><p>ArgenZ ST Multilayer Zirkon Blok, doğal dentindeki renk geçişlerini katman çizgileri olmadan taklit eder ve süper şeffaflığıyla klinik ile laboratuvarlara büyük avantaj sağlar.</p><p>Makyaj gerektirmez; <b>sadece glaze uygulayıp</b> protezi bitime gönderebilirsiniz.</p>",
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
  productBasedReverseLayout: false,
  productBasedMaxWidth: 1900,
  productBasedPaddingTop: 118,
  productBasedPaddingBottom: 88,
  productBasedColumnGap: 140,
  productBasedTextColumnWidth: 460,
  productBasedContentWidth: 460,
  productBasedMediaColumnWidth: 1080,
  productBasedTitleFontSize: 28,
  productBasedBodyFontSize: 15,
  productBasedTitleMarginBottom: 42,
  productBasedIntroMarginBottom: 0,
  productBasedProofTitleMarginTop: 36,
  productBasedProofTitleMarginBottom: 20,
  productBasedScoreGap: 34,
  productBasedScoreBarMarginTop: 34,
  productBasedScoreBarWidth: 429,
  productBasedScoreBarHeight: 18,
  productBasedMediaDisplayWidth: 1080,
  productBasedMediaTopMargin: 0,
  productBasedMediaAspectRatio: "1.42 / 1",
  productBasedMediaBorderRadius: 28,
  productBasedImageObjectFit: "cover",
  productBasedImageScale: 1,
  productBasedImageXOffset: 0,
  productBasedImageYOffset: 0,
  productBasedBackgroundColor: "#ffffff",
  productBasedTextColor: "#000000",
  productBasedMutedTextColor: "#000000",
  productBasedAccentColor: "#dbfa37",
  productBasedMediaBackgroundColor: "#eeeeee",
};

const CRS_TRAY_PRODUCT_BASED_DEFAULTS: Record<string, unknown> = {
  productBasedTitleHtml: "Ölçü Süreçlerinde <mark>Stabil ve Tekrarlanabilir Sonuçlar</mark>",
  productBasedTitleLine1Before: "",
  productBasedTitleLine1Highlight: "",
  productBasedTitleLine1After: "",
  productBasedTitleLine2Before: "",
  productBasedTitleLine2Highlight: "",
  productBasedTitleLine2After: "",
  productBasedTitleLine3Before: "",
  productBasedTitleLine3Highlight: "",
  productBasedTitleLine3After: "",
  productBasedIntroHtml:
    "<p><b>CRS Tray Reçinesi</b> ile üretilen ölçü kaşıkları, dijital tasarım sürecine uyumlu şekilde hazırlanır ve her baskıda aynı formun korunmasına katkı sağlar. Bu sayede <b>ölçü süreçlerinde daha kontrollü ve öngörülebilir sonuçlar elde edilmesine yardımcı olur.</b></p>",
  productBasedDetailHtml: "",
  productBasedProofTitle: "CRS Tray Reçinesi'ni satın alanlar nasıl değerlendirdi?",
  productBasedQuote1Text: "",
  productBasedQuote1Name: "",
  productBasedQuote1Role: "",
  productBasedQuote2Text: "",
  productBasedQuote2Name: "",
  productBasedQuote2Role: "",
  productBasedQuote3Text: "",
  productBasedQuote3Name: "",
  productBasedQuote3Role: "",
  productBasedShowScoreBars: true,
  productBasedScore1Text: "<p>Ölçü kaşıklarının baskı sonrası formunu koruduğu ve stabil sonuçlar sunduğu belirtiliyor.</p>",
  productBasedScore1Value: 99,
  productBasedScore2Text: "<p>Tekrarlanabilir üretim sayesinde dijital iş akışına kolayca entegre edildiği ifade ediliyor.</p>",
  productBasedScore2Value: 96,
  productBasedScore3Text: "<p>Farklı dental ölçü uygulamalarında güvenle tercih edildiği görülüyor.</p>",
  productBasedScore3Value: 95,
  productBasedMediaLayout: "single",
  productBasedImageUrl: "https://cdn.myikas.com/images/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/c089d52c-d0b8-4a97-8ac2-11fdc42768cf/1080/crs-tray-recinesi.webp",
  productBasedImageAlt: "CRS Tray Resin ölçü kaşığı 3D yazıcı reçinesi",
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
  productBasedReverseLayout: false,
  productBasedMaxWidth: 1640,
  productBasedPaddingTop: 52,
  productBasedPaddingBottom: 72,
  productBasedColumnGap: 260,
  productBasedTextColumnWidth: 520,
  productBasedContentWidth: 520,
  productBasedMediaColumnWidth: 760,
  productBasedTitleFontSize: 32,
  productBasedBodyFontSize: 16,
  productBasedMediaAspectRatio: "1.56 / 1",
  productBasedMediaBorderRadius: 0,
  productBasedImageObjectFit: "contain",
  productBasedImageScale: 1.45,
  productBasedImageXOffset: 0,
  productBasedImageYOffset: 0,
  productBasedBackgroundColor: "#ffffff",
  productBasedTextColor: "#000000",
  productBasedMutedTextColor: "#000000",
  productBasedAccentColor: "#dbfa37",
  productBasedMediaBackgroundColor: "#ffffff",
  productBasedTitleMarginBottom: 18,
  productBasedIntroMarginBottom: 0,
  productBasedProofTitleMarginTop: 39,
  productBasedProofTitleMarginBottom: 38,
  productBasedScoreGap: 73,
  productBasedScoreBarMarginTop: 34,
  productBasedScoreBarWidth: 429,
  productBasedScoreBarHeight: 18,
  productBasedMediaDisplayWidth: 630,
  productBasedMediaTopMargin: 281,
};

function filled(value: unknown) {
  return typeof value === "string" ? value.trim() !== "" : value !== undefined && value !== null;
}

function normalized(value: unknown) {
  return propString(value).trim().toLocaleLowerCase("tr");
}

function normalizedJson(value: unknown) {
  try {
    return JSON.stringify(value ?? "").toLocaleLowerCase("tr");
  } catch {
    return normalized(value);
  }
}

function productLooksLikeCrsTray(data: Record<string, unknown>) {
  const productText = normalizedJson(data.product);
  const pageText = [
    data.productBasedTitleHtml,
    data.productBasedTitleLine1Before,
    data.productBasedTitleLine1Highlight,
    data.productBasedTitleLine1After,
    data.productBasedTitleLine2Before,
    data.productBasedTitleLine2Highlight,
    data.productBasedTitleLine2After,
    data.productBasedIntroHtml,
    data.productBasedImageUrl,
    data.titleHtml,
    data.titleLine1Before,
    data.titleLine1Highlight,
    data.titleLine1After,
    data.titleLine2Before,
    data.titleLine2Highlight,
    data.titleLine2After,
    data.introHtml,
    data.imageUrl,
  ]
    .map(normalized)
    .join(" ");

  const combined = `${productText} ${pageText}`;
  return (
    combined.includes("9a834f16-e7e0-41da-b7ab-2854e565daf2") ||
    combined.includes("crs-tray-resin") ||
    combined.includes("ölçü kaşığı") ||
    combined.includes("olcu kasigi")
  );
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
    data.titleHtml,
    data.titleLine1Before,
    data.titleLine1Highlight,
    data.titleLine1After,
    data.titleLine2Before,
    data.titleLine2Highlight,
    data.titleLine2After,
    data.titleLine3Before,
    data.titleLine3Highlight,
    data.titleLine3After,
  ]
    .map(normalized)
    .join(" ");

  const bodyParts = [
    data.productBasedIntroHtml,
    data.productBasedDetailHtml,
    data.productBasedProofTitle,
    data.productBasedQuote1Text,
    data.productBasedQuote1Name,
    data.productBasedQuote1Role,
    data.productBasedQuote2Text,
    data.productBasedQuote2Name,
    data.productBasedQuote2Role,
    data.productBasedQuote3Text,
    data.productBasedQuote3Name,
    data.productBasedQuote3Role,
    data.introHtml,
    data.detailHtml,
    data.proofTitle,
    data.quote1Text,
    data.quote1Name,
    data.quote1Role,
    data.quote2Text,
    data.quote2Name,
    data.quote2Role,
    data.quote3Text,
    data.quote3Name,
    data.quote3Role,
  ]
    .map(normalized)
    .join(" ");

  const imageParts = [
    data.productBasedImageUrl,
    data.productBasedImage2Url,
    data.productBasedImage3Url,
    data.productBasedImage4Url,
    data.imageUrl,
    data.image2Url,
    data.image3Url,
    data.image4Url,
  ]
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

const ARGENZ_STALE_PRODUCT_BASED_VALUES: Record<string, unknown[]> = {
  productBasedTitleLine1Highlight: ["Katman Çizgileri"],
  productBasedTitleLine2Highlight: ["Olmadan"],
  productBasedTitleLine2After: [" Doğal Diş"],
  productBasedTitleLine3Before: ["Görünümü"],
  productBasedIntroHtml: [
    "<p>ArgenZ HT+ Multilayer Zirkonyum Blokları, dişin doğal gradyanını katman çizgileri olmaksızın yansıtarak benzersiz dayanıklılık ve renk doğruluğu sağlar. ABD'de izostatik presleme yöntemiyle üretilen bu yüksek kalite bloklar <b>FDA 510(k)</b> onayına sahiptir.</p>",
  ],
  productBasedProofTitle: ["Argen bloklarını kullananlar nasıl değerlendirdi?"],
  productBasedQuote1Text: [
    "<p>Koleden insizale renk geçişleri çok başarılı. Doğala özdeş renk geçişini yakalamak diğer bloklara nazaran daha az müdahale ile mümkün oluyor.</p>",
  ],
  productBasedQuote1Name: ["Robert"],
  productBasedQuote1Role: ["CadCrowns, CA Inc."],
  productBasedQuote2Text: [
    "<p>ArgenZ HT+, zirkonyum blok konusundaki tercihimiz. Şeffaflığı tam yerinde ve rengi harika. Dayanıklılığı da tam anlamıyla mükemmel.</p>",
  ],
  productBasedQuote2Name: ["Tokuma Tanizaki"],
  productBasedQuote2Role: ["ACL Hawaii, Inc"],
  productBasedImageAlt: ["ArgenZ HT+ Multilayer zirkonyum blok doğal diş görünümü"],
  productBasedMaxWidth: [1640, 1740, 1780],
  productBasedPaddingTop: [132],
  productBasedPaddingBottom: [142],
  productBasedColumnGap: [72, 160, 180, 220, 260],
  productBasedTextColumnWidth: [340, 420, 500, 520],
  productBasedContentWidth: [340, 420, 470, 500, 510],
  productBasedMediaColumnWidth: [856, 960],
  productBasedTitleMarginBottom: [48],
  productBasedMediaDisplayWidth: [856, 960],
  productBasedTitleFontSize: [22, 24, 30, 32],
  productBasedBodyFontSize: [13, 14, 16],
};

function samePropValue(value: unknown, staleValue: unknown) {
  if (typeof staleValue === "number") return Number(value) === staleValue;
  return normalized(value) === normalized(staleValue);
}

function isKnownStaleArgenzValue(propName: string, value: unknown) {
  const staleValues = ARGENZ_STALE_PRODUCT_BASED_VALUES[propName];
  if (staleValues?.some((staleValue) => samePropValue(value, staleValue))) return true;

  if (propName.toLowerCase().includes("imageurl")) {
    const image = normalized(value);
    return image.includes("52f4db8b") || image.includes("409af8d9") || image.includes("def44dad");
  }

  return false;
}

function productBasedProps(props: Props): Props {
  if (!productBasedApplies(props)) return props;

  const source = props as Record<string, unknown>;
  const useCrsDefaults = productLooksLikeCrsTray(source);
  const useArgenzDefaults = hasStaleSplitContent(source);
  const defaults = useCrsDefaults ? CRS_TRAY_PRODUCT_BASED_DEFAULTS : ARGENZ_PRODUCT_BASED_DEFAULTS;

  return new Proxy(props as Record<string, unknown>, {
    get(target, prop) {
      if (typeof prop !== "string") return Reflect.get(target, prop);
      if (prop.startsWith("productBased")) return target[prop];
      const productBasedName = `productBased${pascal(prop)}`;
      const defaultValue = defaults[productBasedName];
      if (Object.prototype.hasOwnProperty.call(target, productBasedName)) {
        const productBasedValue = target[productBasedName];
        const isStaleLayoutValue =
          [
            "productBasedColumnGap",
            "productBasedTextColumnWidth",
            "productBasedContentWidth",
            "productBasedMediaColumnWidth",
            "productBasedMediaDisplayWidth",
            "productBasedTitleFontSize",
            "productBasedBodyFontSize",
          ].includes(productBasedName) && isKnownStaleArgenzValue(productBasedName, productBasedValue);
        if (!useCrsDefaults && (isStaleLayoutValue || (useArgenzDefaults && isKnownStaleArgenzValue(productBasedName, productBasedValue)))) {
          return defaultValue;
        }
        if (productBasedValue !== undefined && productBasedValue !== null) return productBasedValue;
      }
      if (useArgenzDefaults && productBasedName in defaults) {
        return defaultValue;
      }
      if (filled(defaultValue)) return defaultValue;
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

function cssLengthOrFallback(value: unknown, fallback: number, unit = "px") {
  const next = Number(value);
  return `${Number.isFinite(next) && next > 0 ? next : fallback}${unit}`;
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
  const srcText = imageSrc(src).trim();
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
    "--tmpsf-content-w": cssLengthOrFallback((viewProps as any).contentWidth, numberValue(viewProps.textColumnWidth, 540)),
    "--tmpsf-media-col": cssLength(viewProps.mediaColumnWidth, 720),
    "--tmpsf-title-size": cssLength(viewProps.titleFontSize, 34),
    "--tmpsf-body-size": cssLength(viewProps.bodyFontSize, 17),
    "--tmpsf-media-ratio": ratioValue(viewProps.mediaAspectRatio, mode === "grid" ? "1.44 / 1" : "1.5 / 1"),
    "--tmpsf-media-radius": cssLength(viewProps.mediaBorderRadius, 28),
    "--tmpsf-image-fit": objectFit(viewProps.imageObjectFit),
    "--tmpsf-image-scale": numberValue(viewProps.imageScale, 1, 0.2, 2),
    "--tmpsf-image-x": cssLength(viewProps.imageXOffset, 0),
    "--tmpsf-image-y": cssLength(viewProps.imageYOffset, 0),
    "--tmpsf-title-mb": cssLength((viewProps as any).titleMarginBottom, 42),
    "--tmpsf-intro-mb": cssLength((viewProps as any).introMarginBottom, 0),
    "--tmpsf-proof-mt": cssLength((viewProps as any).proofTitleMarginTop, 38),
    "--tmpsf-proof-mb": cssLength((viewProps as any).proofTitleMarginBottom, 20),
    "--tmpsf-score-gap": cssLength((viewProps as any).scoreGap, 34),
    "--tmpsf-score-bar-mt": cssLength((viewProps as any).scoreBarMarginTop, 34),
    "--tmpsf-score-bar-w": cssLengthOrFallback((viewProps as any).scoreBarWidth, 9999),
    "--tmpsf-score-bar-h": cssLength((viewProps as any).scoreBarHeight, 18),
    "--tmpsf-media-display-w": cssLengthOrFallback((viewProps as any).mediaDisplayWidth, numberValue(viewProps.mediaColumnWidth, 720)),
    "--tmpsf-media-mt": cssLength((viewProps as any).mediaTopMargin, 0),
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
