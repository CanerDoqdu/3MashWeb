import { useEffect, useMemo, useState } from "preact/hooks";
import { Props } from "./types";

type Mode = "clinic" | "lab";

type Preset = {
  workLabel?: string;
  workMin: number;
  workMax: number;
  workStep: number;
  workDefault: number;
  rptDefault: number;
  costMin: number;
  costMax: number;
  costStep: number;
  costDefault: number;
};

function href(value?: string) {
  return value && value.trim() ? value : "#";
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

function StatBlock({ value, suffix, label }: { value?: string; suffix?: string; label?: string }) {
  return (
    <div className="tmhero-stat">
      <div className="tmhero-stat-value">
        {value || ""}
        {suffix ? <em>{suffix}</em> : null}
      </div>
      <div className="tmhero-stat-label">{label || ""}</div>
    </div>
  );
}

export function ThreeMashHero(props: Props) {
  const targetRepeatRate = safeNumber(props.targetRepeatRate, 3);
  const presets = useMemo<Record<Mode, Preset>>(
    () => ({
      clinic: {
        workLabel: props.clinicWorkLabel,
        workMin: safeNumber(props.clinicWorkMin, 20),
        workMax: safeNumber(props.clinicWorkMax, 500),
        workStep: safeNumber(props.clinicWorkStep, 10),
        workDefault: safeNumber(props.clinicWorkDefault, 120),
        rptDefault: safeNumber(props.clinicRptDefault, 10),
        costMin: safeNumber(props.clinicCostMin, 100),
        costMax: safeNumber(props.clinicCostMax, 1500),
        costStep: safeNumber(props.clinicCostStep, 25),
        costDefault: safeNumber(props.clinicCostDefault, 500),
      },
      lab: {
        workLabel: props.labWorkLabel,
        workMin: safeNumber(props.labWorkMin, 100),
        workMax: safeNumber(props.labWorkMax, 2000),
        workStep: safeNumber(props.labWorkStep, 25),
        workDefault: safeNumber(props.labWorkDefault, 300),
        rptDefault: safeNumber(props.labRptDefault, 8),
        costMin: safeNumber(props.labCostMin, 50),
        costMax: safeNumber(props.labCostMax, 600),
        costStep: safeNumber(props.labCostStep, 25),
        costDefault: safeNumber(props.labCostDefault, 200),
      },
    }),
    [
      props.clinicWorkLabel,
      props.clinicWorkMin,
      props.clinicWorkMax,
      props.clinicWorkStep,
      props.clinicWorkDefault,
      props.clinicRptDefault,
      props.clinicCostMin,
      props.clinicCostMax,
      props.clinicCostStep,
      props.clinicCostDefault,
      props.labWorkLabel,
      props.labWorkMin,
      props.labWorkMax,
      props.labWorkStep,
      props.labWorkDefault,
      props.labRptDefault,
      props.labCostMin,
      props.labCostMax,
      props.labCostStep,
      props.labCostDefault,
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
  const targetLoss = yearly * (targetRepeatRate / 100) * cost;
  const cappedTargetLoss = Math.min(currentLoss, targetLoss);
  const savings = Math.max(0, currentLoss - targetLoss);
  const currency = props.currencyPrefix || "";
  const percent = props.percentPrefix || "";
  const negative = props.negativePrefix || "";
  const positive = props.positivePrefix || "";
  const formattedLoss = `${currency}${formatPlain(currentLoss, props.locale)}`;
  const titleUnderlineImage = imageSource(props.titleUnderlineImageUrl);
  const isAtTarget = rpt <= targetRepeatRate;

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
    "--tmhero-title-underline-width": percentage(props.titleUnderlineImageWidth, 72, 10, 140),
    "--tmhero-title-underline-height": `${numberInRange(props.titleUnderlineImageHeight, 22, 4, 80)}px`,
    "--tmhero-title-underline-x": `${numberInRange(props.titleUnderlineImageXOffset, 0, -120, 120)}px`,
    "--tmhero-title-underline-y": `${numberInRange(props.titleUnderlineImageYOffset, 0, -80, 80)}px`,
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
              {props.eyebrowText || ""}
            </div>

            <h1>
              {props.titleBeforeAmount || ""} <span className="tmhero-money">{formattedLoss}</span>{" "}
              {props.titleAfterAmount || ""}{" "}
              <span className="tmhero-em-wrap">
                <span className="tmhero-em">{props.titleEmphasis || ""}</span>
                {props.showTitleUnderline !== false && titleUnderlineImage ? (
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
              {props.subtitleStart || ""} <b>{props.subtitleStrongOne || ""}</b> {props.subtitleMiddle || ""}{" "}
              <b>{props.subtitleStrongTwo || ""}</b> {props.subtitleEnd || ""}
            </p>

            <div className="tmhero-cta">
              <a className="tmhero-btn tmhero-btn-accent" href={href(props.primaryButtonHref)}>
                {props.primaryButtonText || ""}
              </a>
              <a className="tmhero-btn tmhero-btn-line" href={href(props.secondaryButtonHref)}>
                {props.secondaryButtonText || ""}
              </a>
              <span>{props.hintText || ""}</span>
            </div>
          </div>

          <div className="tmhero-calculator-side" id={props.calculatorAnchorId || undefined}>
            <div className={`tmhero-calc${mode === "lab" ? " is-lab-mode" : ""}`}>
              <div className="tmhero-calc-head">
                <span className="tmhero-micro">{props.calculatorEyebrow || ""}</span>
                <span className="tmhero-est">{props.calculatorBadgeText || ""}</span>
              </div>

              <div className="tmhero-segment">
                <button className={mode === "clinic" ? "is-active" : ""} type="button" onClick={() => setMode("clinic")}>
                  {props.clinicModeText || ""}
                </button>
                <button className={mode === "lab" ? "is-active" : ""} type="button" onClick={() => setMode("lab")}>
                  {props.labModeText || ""}
                </button>
              </div>

              <div className="tmhero-slider">
                <div className="tmhero-slider-label">
                  <span>{active.workLabel || ""}</span>
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
                  <span>{props.rptLabel || ""}</span>
                  <b>
                    {percent}
                    {rpt}
                  </b>
                </div>
                <input
                  type="range"
                  min={1}
                  max={20}
                  step={1}
                  value={rpt}
                  style={{ "--p": `${rangeProgress(rpt, 1, 20)}%` } as any}
                  onInput={(event) => setRpt(Number((event.currentTarget as HTMLInputElement).value))}
                  aria-label={props.rptLabel || undefined}
                />
              </div>

              <div className="tmhero-slider">
                <div className="tmhero-slider-label">
                  <span>{props.costLabel || ""}</span>
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
                  aria-label={props.costLabel || undefined}
                />
                <a className="tmhero-calc-link" href={href(props.costDetailHref)}>
                  {props.costDetailText || ""}
                </a>
              </div>

              <div className="tmhero-output">
                <div className="tmhero-row">
                  <span>
                    {props.currentLossLabel || ""} <i>{props.currentLossNote || ""}</i>
                  </span>
                  <b className="tmhero-loss">
                    {negative}
                    {currency}
                    {formatPlain(currentLoss, props.locale)}
                  </b>
                </div>
                <div className="tmhero-row">
                  <span>
                    {props.targetLossLabel || ""} <i>{props.targetLossNote || ""}</i>
                  </span>
                  <b>
                    {negative}
                    {currency}
                    {formatPlain(cappedTargetLoss, props.locale)}
                  </b>
                </div>
              </div>

              <div className="tmhero-total">
                <div className="tmhero-micro">{props.savingsEyebrow || ""}</div>
                <div className={`tmhero-total-value${isAtTarget ? " is-message" : ""}`}>
                  {isAtTarget ? props.alreadyTargetText || "" : `${positive}${currency}${formatPlain(savings, props.locale)}`}
                </div>
              </div>

              <div className="tmhero-fine">
                {props.fineTextBeforeLink || ""} <a href={href(props.fineLinkHref)}>{props.fineLinkText || ""}</a>{" "}
                {props.fineTextAfterLink || ""}
              </div>
            </div>
          </div>
        </div>

        <div className="tmhero-stats">
          <StatBlock value={props.stat1Value} suffix={props.stat1Suffix} label={props.stat1Label} />
          <StatBlock value={props.stat2Value} suffix={props.stat2Suffix} label={props.stat2Label} />
          <StatBlock value={props.stat3Value} suffix={props.stat3Suffix} label={props.stat3Label} />
          <StatBlock value={props.stat4Value} suffix={props.stat4Suffix} label={props.stat4Label} />
        </div>
      </div>
    </section>
  );
}

export default ThreeMashHero;
