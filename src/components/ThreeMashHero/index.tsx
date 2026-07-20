import { useEffect, useMemo, useState } from "preact/hooks";
import { Props } from "./types";

type Mode = "clinic" | "lab";

type Preset = {
  workLabel?: string;
  workMin: number;
  workMax: number;
  workStep: number;
  workDefault: number;
  rptLabel?: string;
  rptMin: number;
  rptMax: number;
  rptStep: number;
  rptDefault: number;
  targetRepeatRate: number;
  costLabel?: string;
  costMin: number;
  costMax: number;
  costStep: number;
  costDefault: number;
  costDetailText?: string;
  costDetailHref?: string;
};

function href(value?: string) {
  return value && value.trim() ? value : "#";
}

function inlineHtml(value?: string) {
  return (value || "")
    .trim()
    .replace(/<\/p>\s*<p[^>]*>/gi, "<br />")
    .replace(/^<p[^>]*>/i, "")
    .replace(/<\/p>$/i, "");
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function styleTextChunks(markup: string, props?: Props) {
  const target = props?.styledPhrase?.trim();
  if (props?.wordStyleEnabled === false || !target) return markup;

  const matcher = new RegExp(escapeRegExp(target), "gi");
  return markup
    .split(/(<[^>]+>)/g)
    .map((part) => {
      if (!part || part.startsWith("<")) return part;
      return part.replace(matcher, (match) => `<span class="tmhero-word-style">${match}</span>`);
    })
    .join("");
}

function richText(value?: string, props?: Props) {
  return { __html: styleTextChunks(inlineHtml(value), props) };
}

function RichInline({ value, className, wordStyle }: { value?: string; className?: string; wordStyle?: Props }) {
  return <span className={className} dangerouslySetInnerHTML={richText(value, wordStyle)} />;
}

function smoothAnchorClick(event: MouseEvent, targetHref?: string) {
  const target = href(targetHref);
  if (!target.startsWith("#") || target.length <= 1) return;

  const section = document.querySelector(target);
  if (!section) return;

  event.preventDefault();
  section.scrollIntoView({ behavior: "smooth", block: "start" });
}

function imageSource(value: unknown) {
  if (typeof value === "string" && value.trim()) {
    return imageIdToUrl(value);
  }

  if (value && typeof value === "object") {
    const image = value as {
      id?: unknown;
      url?: unknown;
      src?: unknown;
      imageUrl?: unknown;
      value?: unknown;
      image?: { url?: unknown; src?: unknown };
      file?: { url?: unknown; src?: unknown };
    };
    if (typeof image.url === "string") return imageIdToUrl(image.url);
    if (typeof image.src === "string") return imageIdToUrl(image.src);
    if (typeof image.imageUrl === "string") return imageIdToUrl(image.imageUrl);
    if (typeof image.value === "string") return imageIdToUrl(image.value);
    if (typeof image.id === "string") return imageIdToUrl(image.id);
    if (typeof image.image?.url === "string") return imageIdToUrl(image.image.url);
    if (typeof image.image?.src === "string") return imageIdToUrl(image.image.src);
    if (typeof image.file?.url === "string") return imageIdToUrl(image.file.url);
    if (typeof image.file?.src === "string") return imageIdToUrl(image.file.src);
  }

  return "";
}

function imageIdToUrl(value: string) {
  const trimmed = value.trim();
  if (trimmed.startsWith("theme-images/")) {
    return `https://cdn.myikas.com/images/${trimmed}/image_3840.webp`;
  }
  return trimmed;
}

function safeNumber(value: number | undefined, fallback: number) {
  return Number.isFinite(value) ? Number(value) : fallback;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function numberInRange(value: unknown, fallback: number, min: number, max: number) {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return clamp(numeric, min, max);
}

function imageFit(value: unknown, fallback = "contain") {
  return value === "cover" || value === "fill" || value === "scale-down" || value === "contain" ? value : fallback;
}

function percentage(value: unknown, fallback: number, min: number, max: number) {
  return `${numberInRange(value, fallback, min, max)}%`;
}

function rangeProgress(value: number, min: number, max: number) {
  if (max <= min) return 0;
  return clamp(((value - min) / (max - min)) * 100, 0, 100);
}

function formatPlain(value: number, locale?: string) {
  try {
    return Math.round(value).toLocaleString(locale || "tr-TR");
  } catch {
    return String(Math.round(value));
  }
}

function StatBlock({ value, suffix, label, wordStyle }: { value?: string; suffix?: string; label?: string; wordStyle: Props }) {
  return (
    <div className="tmhero-stat">
      <div className="tmhero-stat-value">
        <span dangerouslySetInnerHTML={richText(value, wordStyle)} />
        {suffix ? <em dangerouslySetInnerHTML={richText(suffix, wordStyle)} /> : null}
      </div>
      <div className="tmhero-stat-label" dangerouslySetInnerHTML={richText(label, wordStyle)} />
    </div>
  );
}

export function ThreeMashHero(props: Props) {
  const presets = useMemo<Record<Mode, Preset>>(
    () => ({
      clinic: {
        workLabel: props.clinicWorkLabel,
        workMin: safeNumber(props.clinicWorkMin, 20),
        workMax: safeNumber(props.clinicWorkMax, 500),
        workStep: safeNumber(props.clinicWorkStep, 10),
        workDefault: safeNumber(props.clinicWorkDefault, 120),
        rptLabel: props.clinicRptLabel,
        rptMin: safeNumber(props.clinicRptMin, 1),
        rptMax: safeNumber(props.clinicRptMax, 20),
        rptStep: safeNumber(props.clinicRptStep, 1),
        rptDefault: safeNumber(props.clinicRptDefault, 10),
        targetRepeatRate: safeNumber(props.clinicTargetRepeatRate, 3),
        costLabel: props.clinicCostLabel,
        costMin: safeNumber(props.clinicCostMin, 100),
        costMax: safeNumber(props.clinicCostMax, 1500),
        costStep: safeNumber(props.clinicCostStep, 25),
        costDefault: safeNumber(props.clinicCostDefault, 500),
        costDetailText: props.clinicCostDetailText,
        costDetailHref: props.clinicCostDetailHref,
      },
      lab: {
        workLabel: props.labWorkLabel,
        workMin: safeNumber(props.labWorkMin, 100),
        workMax: safeNumber(props.labWorkMax, 2000),
        workStep: safeNumber(props.labWorkStep, 25),
        workDefault: safeNumber(props.labWorkDefault, 300),
        rptLabel: props.labRptLabel,
        rptMin: safeNumber(props.labRptMin, 1),
        rptMax: safeNumber(props.labRptMax, 20),
        rptStep: safeNumber(props.labRptStep, 1),
        rptDefault: safeNumber(props.labRptDefault, 8),
        targetRepeatRate: safeNumber(props.labTargetRepeatRate, 3),
        costLabel: props.labCostLabel,
        costMin: safeNumber(props.labCostMin, 50),
        costMax: safeNumber(props.labCostMax, 600),
        costStep: safeNumber(props.labCostStep, 25),
        costDefault: safeNumber(props.labCostDefault, 200),
        costDetailText: props.labCostDetailText,
        costDetailHref: props.labCostDetailHref,
      },
    }),
    [
      props.clinicWorkLabel,
      props.clinicWorkMin,
      props.clinicWorkMax,
      props.clinicWorkStep,
      props.clinicWorkDefault,
      props.clinicRptLabel,
      props.clinicRptMin,
      props.clinicRptMax,
      props.clinicRptStep,
      props.clinicRptDefault,
      props.clinicTargetRepeatRate,
      props.clinicCostLabel,
      props.clinicCostMin,
      props.clinicCostMax,
      props.clinicCostStep,
      props.clinicCostDefault,
      props.clinicCostDetailText,
      props.clinicCostDetailHref,
      props.labWorkLabel,
      props.labWorkMin,
      props.labWorkMax,
      props.labWorkStep,
      props.labWorkDefault,
      props.labRptLabel,
      props.labRptMin,
      props.labRptMax,
      props.labRptStep,
      props.labRptDefault,
      props.labTargetRepeatRate,
      props.labCostLabel,
      props.labCostMin,
      props.labCostMax,
      props.labCostStep,
      props.labCostDefault,
      props.labCostDetailText,
      props.labCostDetailHref,
    ],
  );

  const [mode, setMode] = useState<Mode>("clinic");
  const active = presets[mode];
  const [work, setWork] = useState(active.workDefault);
  const [rpt, setRpt] = useState(active.rptDefault);
  const [cost, setCost] = useState(active.costDefault);

  useEffect(() => {
    const next = presets[mode];
    setWork(next.workDefault);
    setRpt(next.rptDefault);
    setCost(next.costDefault);
  }, [mode, presets]);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlCost = Number(params.get("rc"));
      const storedCost = Number(window.localStorage.getItem("mash_remake_cost"));
      const externalCost = urlCost > 0 ? urlCost : storedCost > 0 ? storedCost : 0;
      if (externalCost > 0) {
        setCost(externalCost);
      }
    } catch {
      // External cost handoff is optional.
    }
  }, []);

  const yearly = work * 12;
  const currentLoss = yearly * (rpt / 100) * cost;
  const targetLoss = yearly * (active.targetRepeatRate / 100) * cost;
  const cappedTargetLoss = Math.min(currentLoss, targetLoss);
  const savings = Math.max(0, currentLoss - targetLoss);
  const currency = props.currencyPrefix || "";
  const percent = props.percentPrefix || "";
  const negative = props.negativePrefix || "";
  const positive = props.positivePrefix || "";
  const formattedLoss = `${currency}${formatPlain(currentLoss, props.locale)}`;
  const titleUnderlineImage = imageSource(props.titleUnderlineImageUrl);
  const showDesktopTitleUnderline = props.showTitleUnderline !== false;
  const showTabletTitleUnderline = props.showTitleUnderlineTablet !== false;
  const showMobileTitleUnderline = props.showTitleUnderlineMobile !== false;
  const shouldRenderTitleUnderline = showDesktopTitleUnderline || showTabletTitleUnderline || showMobileTitleUnderline;
  const isAtTarget = rpt <= active.targetRepeatRate;

  const themeStyle = {
    "--tmhero-bg": props.backgroundColor || "#FAFAF7",
    "--tmhero-text": props.textColor || "#0E0E0C",
    "--tmhero-muted": props.mutedTextColor || "#8F8F86",
    "--tmhero-sub": props.subTextColor || "#55554E",
    "--tmhero-line": props.lineColor || "#E6E6E0",
    "--tmhero-panel": props.panelColor || "#FFFFFF",
    "--tmhero-accent": props.accentColor || "#C7F136",
    "--tmhero-accent-soft": props.accentSoftColor || "#F2F8DC",
    "--tmhero-accent-text": props.accentTextColor || "#3D4D0E",
    "--tmhero-lab-accent": props.labAccentColor || "#7C4DFF",
    "--tmhero-lab-accent-text": props.labAccentTextColor || "#4F2FCF",
    "--tmhero-danger": props.dangerColor || "#E2492F",
    "--tmhero-word-color": props.styledPhraseColor || "#C7F136",
    "--tmhero-word-weight": props.styledPhraseBold ? "800" : "inherit",
    "--tmhero-word-style": props.styledPhraseItalic ? "italic" : "inherit",
    "--tmhero-title-underline-width": percentage(props.titleUnderlineImageWidth, 72, 10, 140),
    "--tmhero-title-underline-height": `${numberInRange(props.titleUnderlineImageHeight, 22, 4, 80)}px`,
    "--tmhero-title-underline-x": `${numberInRange(props.titleUnderlineImageXOffset, 0, -120, 120)}px`,
    "--tmhero-title-underline-y": `${numberInRange(props.titleUnderlineImageYOffset, 0, -80, 80)}px`,
    "--tmhero-title-underline-desktop-display": showDesktopTitleUnderline ? "block" : "none",
    "--tmhero-title-underline-tablet-display": showTabletTitleUnderline ? "block" : "none",
    "--tmhero-title-underline-mobile-display": showMobileTitleUnderline ? "block" : "none",
    "--tmhero-title-underline-tablet-width": percentage(props.titleUnderlineTabletWidth, 66, 10, 140),
    "--tmhero-title-underline-tablet-height": `${numberInRange(props.titleUnderlineTabletHeight, 18, 4, 80)}px`,
    "--tmhero-title-underline-tablet-x": `${numberInRange(props.titleUnderlineTabletXOffset, 0, -120, 120)}px`,
    "--tmhero-title-underline-tablet-y": `${numberInRange(props.titleUnderlineTabletYOffset, 0, -80, 80)}px`,
    "--tmhero-title-underline-mobile-width": percentage(props.titleUnderlineMobileWidth, 58, 10, 140),
    "--tmhero-title-underline-mobile-height": `${numberInRange(props.titleUnderlineMobileHeight, 14, 4, 80)}px`,
    "--tmhero-title-underline-mobile-x": `${numberInRange(props.titleUnderlineMobileXOffset, -6, -120, 120)}px`,
    "--tmhero-title-underline-mobile-y": `${numberInRange(props.titleUnderlineMobileYOffset, 0, -80, 80)}px`,
    "--tmhero-title-underline-fit": imageFit(props.titleUnderlineImageFit, "fill"),
    "--tmhero-title-underline-opacity": numberInRange(props.titleUnderlineImageOpacity, 100, 0, 100) / 100,
    "--tmhero-title-underline-brightness": percentage(props.titleUnderlineImageBrightness, 100, 0, 220),
    "--tmhero-title-underline-contrast": percentage(props.titleUnderlineImageContrast, 100, 0, 220),
    "--tmhero-title-underline-saturation": percentage(props.titleUnderlineImageSaturation, 100, 0, 300),
    "--tmhero-title-underline-hue": `${numberInRange(props.titleUnderlineImageHue, 0, -180, 180)}deg`,
    "--tmhero-title-underline-invert": percentage(props.titleUnderlineImageInvert, 0, 0, 100),
  } as any;

  return (
    <section className="three-mash-hero" style={themeStyle}>
      <div className="tmhero-wrap">
        <div className="tmhero-top">
          <div className="tmhero-copy">
            <div className="tmhero-micro">
              <span className="tmhero-dot" />
              <RichInline value={props.eyebrowText} wordStyle={props} />
            </div>

            <h1>
              <RichInline value={props.titleBeforeAmount} wordStyle={props} /> <span className="tmhero-money">{formattedLoss}</span>{" "}
              <RichInline value={props.titleAfterAmount} wordStyle={props} />{" "}
              <span className="tmhero-em-wrap">
                <span className="tmhero-em" dangerouslySetInnerHTML={richText(props.titleEmphasis, props)} />
                {shouldRenderTitleUnderline && titleUnderlineImage ? (
                  <img
                    className="tmhero-title-underline-image"
                    src={titleUnderlineImage}
                    alt={props.titleUnderlineImageAlt || ""}
                    aria-hidden={props.titleUnderlineImageAlt ? undefined : "true"}
                  />
                ) : null}
              </span>
            </h1>

            <p className="tmhero-subtitle">
              <RichInline value={props.subtitleStart} wordStyle={props} /> <b dangerouslySetInnerHTML={richText(props.subtitleStrongOne, props)} />{" "}
              <RichInline value={props.subtitleMiddle} wordStyle={props} />{" "}
              <b dangerouslySetInnerHTML={richText(props.subtitleStrongTwo, props)} /> <RichInline value={props.subtitleEnd} wordStyle={props} />
            </p>

            <div className="tmhero-cta">
              <a className="tmhero-btn tmhero-btn-accent" href={href(props.primaryButtonHref)} onClick={(event) => smoothAnchorClick(event, props.primaryButtonHref)}>
                <RichInline value={props.primaryButtonText} wordStyle={props} />
              </a>
              <a className="tmhero-btn tmhero-btn-line" href={href(props.secondaryButtonHref)}>
                <RichInline value={props.secondaryButtonText} wordStyle={props} />
              </a>
              <span dangerouslySetInnerHTML={richText(props.hintText, props)} />
            </div>
          </div>

          <div className="tmhero-calculator-side" id={props.calculatorAnchorId || undefined}>
            <div className={`tmhero-calc${mode === "lab" ? " is-lab-mode" : ""}`}>
              <div className="tmhero-calc-head">
                <span className="tmhero-micro" dangerouslySetInnerHTML={richText(props.calculatorEyebrow, props)} />
                <span className="tmhero-est" dangerouslySetInnerHTML={richText(props.calculatorBadgeText, props)} />
              </div>

              <div className="tmhero-segment">
                <button className={mode === "clinic" ? "is-active" : ""} type="button" onClick={() => setMode("clinic")}>
                  <RichInline value={props.clinicModeText} wordStyle={props} />
                </button>
                <button className={mode === "lab" ? "is-active" : ""} type="button" onClick={() => setMode("lab")}>
                  <RichInline value={props.labModeText} wordStyle={props} />
                </button>
              </div>

              <div className="tmhero-slider">
                <div className="tmhero-slider-label">
                  <span dangerouslySetInnerHTML={richText(active.workLabel, props)} />
                  <b>{formatPlain(work, props.locale)}</b>
                </div>
                <input
                  type="range"
                  min={active.workMin}
                  max={active.workMax}
                  step={active.workStep}
                  value={work}
                  style={{ "--p": `${rangeProgress(work, active.workMin, active.workMax)}%` } as any}
                  onInput={(event) => setWork(Number((event.currentTarget as HTMLInputElement).value))}
                  aria-label={active.workLabel || undefined}
                />
              </div>

              <div className="tmhero-slider">
                <div className="tmhero-slider-label">
                  <span dangerouslySetInnerHTML={richText(active.rptLabel, props)} />
                  <b>
                    {percent}
                    {rpt}
                  </b>
                </div>
                <input
                  type="range"
                  min={active.rptMin}
                  max={active.rptMax}
                  step={active.rptStep}
                  value={rpt}
                  style={{ "--p": `${rangeProgress(rpt, active.rptMin, active.rptMax)}%` } as any}
                  onInput={(event) => setRpt(Number((event.currentTarget as HTMLInputElement).value))}
                  aria-label={active.rptLabel || undefined}
                />
              </div>

              <div className="tmhero-slider">
                <div className="tmhero-slider-label">
                  <span dangerouslySetInnerHTML={richText(active.costLabel, props)} />
                  <b>
                    {currency}
                    {formatPlain(cost, props.locale)}
                  </b>
                </div>
                <input
                  type="range"
                  min={active.costMin}
                  max={Math.max(active.costMax, cost)}
                  step={active.costStep}
                  value={cost}
                  style={{ "--p": `${rangeProgress(cost, active.costMin, Math.max(active.costMax, cost))}%` } as any}
                  onInput={(event) => setCost(Number((event.currentTarget as HTMLInputElement).value))}
                  aria-label={active.costLabel || undefined}
                />
                <a className="tmhero-calc-link" href={href(active.costDetailHref)}>
                  <RichInline value={active.costDetailText} wordStyle={props} />
                </a>
              </div>

              <div className="tmhero-output">
                <div className="tmhero-row">
                  <span>
                    <RichInline value={props.currentLossLabel} wordStyle={props} /> <i dangerouslySetInnerHTML={richText(props.currentLossNote, props)} />
                  </span>
                  <b className="tmhero-loss">
                    {negative}
                    {currency}
                    {formatPlain(currentLoss, props.locale)}
                  </b>
                </div>
                <div className="tmhero-row">
                  <span>
                    <RichInline value={props.targetLossLabel} wordStyle={props} /> <i dangerouslySetInnerHTML={richText(props.targetLossNote, props)} />
                  </span>
                  <b>
                    {negative}
                    {currency}
                    {formatPlain(cappedTargetLoss, props.locale)}
                  </b>
                </div>
              </div>

              <div className="tmhero-total">
                <div className="tmhero-micro" dangerouslySetInnerHTML={richText(props.savingsEyebrow, props)} />
                <div className={`tmhero-total-value${isAtTarget ? " is-message" : ""}`}>
                  {isAtTarget ? <RichInline value={props.alreadyTargetText} wordStyle={props} /> : `${positive}${currency}${formatPlain(savings, props.locale)}`}
                </div>
              </div>

              <div className="tmhero-fine">
                <RichInline value={props.fineTextBeforeLink} wordStyle={props} /> <a href={href(props.fineLinkHref)} dangerouslySetInnerHTML={richText(props.fineLinkText, props)} />{" "}
                <RichInline value={props.fineTextAfterLink} wordStyle={props} />
              </div>
            </div>
          </div>
        </div>

        <div className="tmhero-stats">
          <StatBlock value={props.stat1Value} suffix={props.stat1Suffix} label={props.stat1Label} wordStyle={props} />
          <StatBlock value={props.stat2Value} suffix={props.stat2Suffix} label={props.stat2Label} wordStyle={props} />
          <StatBlock value={props.stat3Value} suffix={props.stat3Suffix} label={props.stat3Label} wordStyle={props} />
          <StatBlock value={props.stat4Value} suffix={props.stat4Suffix} label={props.stat4Label} wordStyle={props} />
        </div>
      </div>
    </section>
  );
}

export default ThreeMashHero;
