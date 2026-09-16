import { localizedHref, tLocalized } from "../../utils/i18n";
import { safeDecodeURI } from "../../utils/safeDecodeURI";
import { safeNavigationHref } from "../../utils/safeRedirect";
import { sanitizeHtml } from "../../utils/sanitizeHtml";
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "preact/hooks";
import { Props } from "./types";
import { tProp, isEnglishLocale } from "../../utils/i18n";

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

const defaultConsultationWhatsappHref =
  "https://wa.me/905314326577?text=Merhaba%2C%20%C3%BCcretsiz%20dan%C4%B1%C5%9Fmanl%C4%B1k%20almak%20istiyorum";
const costDetailPageHref = "/pages/hesaplama";

function href(value?: string) {
  const next = safeNavigationHref(value, "#");
  if (next === "#") return isEnglishLocale() ? "/en/pages/iletisim" : "/pages/iletisim";

  const key = routeKey(next);
  if (key === "pages-iletisim" || key === "iletisim" || key === "contact") {
    return isEnglishLocale() ? "/en/pages/iletisim" : "/pages/iletisim";
  }
  if (
    key === tLocalized("3mash-maliyet-detay-html", "3mash-maliyet-detay-html") ||
    key === tLocalized("maliyet-detay", "maliyet-detay") ||
    key === tLocalized("pages-maliyet-detay", "pages-maliyet-detay") ||
    key === "hesaplama" ||
    key === "pages-hesaplama"
  ) {
    return costDetailPageHref;
  }

  return next;
}

function routeKey(value: string) {
  return value
    .trim()
    .toLocaleLowerCase("tr-TR")
    .replace(/^https?:\/\/(?:www\.)?3mash\.com/i, "")
    .split(/[?#]/)[0]
    .replace(/\/+$/g, "")
    .replace(/^\//, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function consultationHref(value?: string) {
  const current = href(value);
  const key = routeKey(current);
  if (
    current === "#" ||
    key === tLocalized("pages-iletisim", "pages-iletisim") ||
    key === tLocalized("iletisim", "iletisim") ||
    key === "contact"
  ) {
    return defaultConsultationWhatsappHref;
  }
  return current;
}

function stripInlineTypographyStyles(markup: string) {
  return markup.replace(
    /\sstyle=("[^"]*"|'[^']*'|[^\s>]+)/gi,
    (_match, rawValue: string) => {
      const quote =
        rawValue[0] === '"' || rawValue[0] === "'" ? rawValue[0] : "";
      const style = quote ? rawValue.slice(1, -1) : rawValue;
      const kept = style
        .split(";")
        .map((part) => part.trim())
        .filter(
          (part) =>
            part &&
            !/^(font-family|font-size|font-weight|font-style|font-variant(?:-[\w-]+)?|letter-spacing|color|background(?:-color)?|border-color|text-align)\s*:/i.test(
              part,
            ),
        );

      return kept.length ? ` style=${quote}${kept.join("; ")}${quote}` : "";
    },
  );
}

function inlineHtml(value?: string) {
  return stripInlineTypographyStyles(
    (value || "")
      .trim()
      .replace(/<\/p>\s*<p[^>]*>/gi, "<br />")
      .replace(/^<p[^>]*>/i, "")
      .replace(/<\/p>$/i, ""),
  );
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
      return part.replace(
        matcher,
        (match) => `<span class="tmhero-word-style">${match}</span>`,
      );
    })
    .join("");
}

function richText(value?: string, props?: Props) {
  return { __html: styleTextChunks(sanitizeHtml(inlineHtml(value)), props) };
}

function statRichText(value?: string) {
  return {
    __html: sanitizeHtml(inlineHtml(value))
      .replace(/\sclass=("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
      .replace(/\s(?:color|bgcolor)=("[^"]*"|'[^']*'|[^\s>]+)/gi, ""),
  };
}

function RichInline({
  value,
  className,
  wordStyle,
}: {
  value?: string;
  className?: string;
  wordStyle?: Props;
}) {
  return (
    <span
      className={className}
      dangerouslySetInnerHTML={richText(value, wordStyle)}
    />
  );
}

function smoothAnchorClick(event: MouseEvent, targetHref?: string) {
  const target = href(targetHref);

  let hash = "";

  try {
    const url = new URL(target, window.location.href);
    hash = url.hash;
  } catch {
    if (target.startsWith("#")) hash = target;
  }

  if (!hash || hash.length <= 1) return;

  const targetId = safeDecodeURI(hash.slice(1)).trim();
  const section = document.getElementById(targetId);

  if (!section) return;

  event.preventDefault();

  const startY = window.scrollY;
  const targetY =
    section.getBoundingClientRect().top +
    window.scrollY -
    80; // header offset

  const distance = targetY - startY;
  const duration = 700;
  const startTime = performance.now();

  const easeInOutCubic = (t: number) =>
    t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * eased);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      window.history.pushState(null, "", hash);
    }
  };

  requestAnimationFrame(animate);
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
    if (typeof image.image?.url === "string")
      return imageIdToUrl(image.image.url);
    if (typeof image.image?.src === "string")
      return imageIdToUrl(image.image.src);
    if (typeof image.file?.url === "string")
      return imageIdToUrl(image.file.url);
    if (typeof image.file?.src === "string")
      return imageIdToUrl(image.file.src);
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

function numberInRange(
  value: unknown,
  fallback: number,
  min: number,
  max: number,
) {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return clamp(numeric, min, max);
}

function imageFit(value: unknown, fallback = "contain") {
  return value === "cover" ||
    value === "fill" ||
    value === "scale-down" ||
    value === "contain"
    ? value
    : fallback;
}

function percentage(
  value: unknown,
  fallback: number,
  min: number,
  max: number,
) {
  return `${numberInRange(value, fallback, min, max)}%`;
}

// FIX: `mode` is now `Mode | null`. Returning null when the URL carries no
// mode parameter at all is the whole point: the old version defaulted to
// "clinic", so every popstate / visibilitychange fired AFTER the cleanup
// effect had stripped ?rc/&mode from the URL would "import" a phantom
// clinic state and silently yank the user back out of Laboratuvar — one of
// the two ways sliders appeared to jump on their own.
function importedCalculatorState(): { mode: Mode | null; cost: number } {
  if (typeof window === "undefined") {
    return { mode: null, cost: 0 };
  }

  try {
    let urlMode: string | null = null;
    let urlCost = 0;

    // 1. Check window.location.search (?rc=340&mode=lab)
    if (window.location.search) {
      const params = new URLSearchParams(window.location.search);
      urlMode = params.get("mode");
      const rc = Number(params.get("rc"));
      if (Number.isFinite(rc) && rc > 0) urlCost = rc;
    }

    // 2. Check hash-based query params (#hesap?rc=340&mode=lab)
    if ((!urlMode || !urlCost) && window.location.hash) {
      const hashStr = window.location.hash;
      const qIndex = hashStr.indexOf("?");
      if (qIndex !== -1) {
        const hashParams = new URLSearchParams(hashStr.slice(qIndex));
        if (!urlMode) urlMode = hashParams.get("mode");
        if (!urlCost) {
          const rc = Number(hashParams.get("rc"));
          if (Number.isFinite(rc) && rc > 0) urlCost = rc;
        }
      }
    }

    const mode: Mode | null =
      urlMode === "lab" || urlMode === "laboratuvar"
        ? "lab"
        : urlMode === "clinic" || urlMode === "klinik"
          ? "clinic"
          : null;

    return { mode, cost: urlCost };
  } catch {
    return { mode: null, cost: 0 };
  }
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

function StatBlock({
  value,
  suffix,
  label,
  wordStyle,
}: {
  value?: string;
  suffix?: string;
  label?: string;
  wordStyle: Props;
}) {
  return (
    <div className="tmhero-stat">
      <div className="tmhero-stat-value">
        <span dangerouslySetInnerHTML={statRichText(value)} />
        {suffix ? <em dangerouslySetInnerHTML={statRichText(suffix)} /> : null}
      </div>
      <div
        className="tmhero-stat-label"
        dangerouslySetInnerHTML={richText(label, wordStyle)}
      />
    </div>
  );
}

export function ThreeMashHero(props: Props) {
  const [heroReady, setHeroReady] = useState(true);

  // --- Localize all Turkish default prop values to English when on /en ---
  props = {
    ...props,
    eyebrowText: tProp(props.eyebrowText, "DENTAL ÜRETİMİN GÖRÜNMEZ FATURASI", "THE INVISIBLE INVOICE OF DENTAL PRODUCTION"),
    titleBeforeAmount: tProp(props.titleBeforeAmount, "Kliniğiniz her yıl", "Your clinic loses"),
    labTitleBeforeAmount: tProp(props.labTitleBeforeAmount, "Laboratuvarınız her yıl", "Your lab loses"),
    titleAfterAmount: tProp(props.titleAfterAmount, "sessizce kaybediyor olabilir.", "silently every year."),
    titleEmphasis: tProp(props.titleEmphasis, "Farkında bile olmadan.", "Without even realizing it."),
    subtitleStart: tProp(props.subtitleStart, "Bu para reklama gitmiyor, yeni cihaza da gitmiyor. Hastanın ağzına", "This money doesn't go to ads or new equipment. Because of work that"),
    subtitleStrongOne: tProp(props.subtitleStrongOne, "ilk seferde oturmayan işler", "doesn't seat on the first try"),
    subtitleMiddle: tProp(props.subtitleMiddle, "yüzünden, sessizce üretim maliyetine dönüşüyor. Yandaki değerleri", ", it silently turns into production waste. Adjust the values on the right"),
    subtitleStrongTwo: tProp(props.subtitleStrongTwo, "kendinize göre ayarlayın", "to your own numbers"),
    subtitleEnd: tProp(props.subtitleEnd, "— yukarıdaki rakam anında sizin kliniğinize göre güncellenir.", "— and the figure above instantly updates for your clinic."),
    primaryButtonText: tProp(props.primaryButtonText, "Sebebini görün ↓", "See why ↓"),
    secondaryButtonText: tProp(props.secondaryButtonText, "Ücretsiz danışmanlık", "Free consultation"),
    hintText: tProp(props.hintText, "Bağlayıcılık yok · 20 dk", "No commitment · 20 min"),
    calculatorEyebrow: tProp(props.calculatorEyebrow, "TASARRUF HESAPLAYICI", "SAVINGS CALCULATOR"),
    calculatorBadgeText: tProp(props.calculatorBadgeText, "TAHMİNİ", "ESTIMATED"),
    clinicModeText: tProp(props.clinicModeText, tLocalized("Klinik", "Clinic"), "Clinic"),
    labModeText: tProp(props.labModeText, tLocalized("Laboratuvar", "Lab"), "Lab"),
    clinicWorkLabel: tProp(props.clinicWorkLabel, "Aylık restoratif vaka", "Monthly restorative cases"),
    clinicRptLabel: tProp(props.clinicRptLabel, "Mevcut tekrar oranınız (RPT)", "Current remake rate (RPT)"),
    clinicCostLabel: tProp(props.clinicCostLabel, "Bir tekrarın size maliyeti", "Cost to you per remake"),
    clinicCostDetailText: tProp(props.clinicCostDetailText, "Bu maliyet nelerden oluşuyor? Kalem kalem hesaplayın →", "What does this cost include? Calculate item by item →"),
    labWorkLabel: tProp(props.labWorkLabel, "Aylık üretim adedi", "Monthly production volume"),
    labRptLabel: tProp(props.labRptLabel, "Mevcut tekrar oranınız (RPT)", "Current remake rate (RPT)"),
    labCostLabel: tProp(props.labCostLabel, "Bir tekrarın size maliyeti", "Cost to you per remake"),
    labCostDetailText: tProp(props.labCostDetailText, "Bu maliyet nelerden oluşuyor? Kalem kalem hesaplayın →", "What does this cost include? Calculate item by item →"),
    currentLossLabel: tProp(props.currentLossLabel, "Tahmini yıllık kayıp", "Estimated annual loss"),
    currentLossNote: tProp(props.currentLossNote, "· mevcut oranla", "· at current rate"),
    targetLossLabel: tProp(props.targetLossLabel, "Hedef oranla", "At target rate"),
    targetLossNote: tProp(props.targetLossNote, "· ≤%3, 3mash desteğiyle", "· ≤3%, with 3mash support"),
    savingsEyebrow: tProp(props.savingsEyebrow, "YILLIK TASARRUF POTANSİYELİNİZ", "YOUR ANNUAL SAVINGS POTENTIAL"),
    alreadyTargetText: tProp(props.alreadyTargetText, "Zaten hedef banttasınız 👏", "You're already in the target band 👏"),
    fineTextBeforeLink: tProp(props.fineTextBeforeLink, "Basitleştirilmiş bir tahmindir; sonuçlar iş akışınıza göre değişir. Kesin analiz için", "This is a simplified estimate; results vary by workflow. For precise analysis,"),
    fineLinkText: tProp(props.fineLinkText, "ücretsiz danışmanlık", "free consultation"),
    fineTextAfterLink: tProp(props.fineTextAfterLink, "alın.", "."),
    stat1Label: tProp(props.stat1Label, "her baskıda boyutsal hassasiyet - insan saç telinin yarısı", "dimensional accuracy on every print — half a human hair"),
    stat2Label: tProp(props.stat2Label, "3mash müşterilerinde tekrarlanan iş oranı (%7-12'den)", "remake rate in 3mash customers (down from 7-12%)"),
    stat3Label: tProp(props.stat3Label, "yatırımın kendini geri ödeme potansiyeli", "investment payback potential"),
    stat4Label: tProp(props.stat4Label, "dental lab & klinik bu sistemle üretiyor", "dental labs & clinics produce with this system"),
  };

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

  // ===========================================================================
  // ROOT-CAUSE FIX (replaces every previous ref/remount workaround)
  //
  // The old code read the URL inside useState initializers:
  //     useState<Mode>(importedCalculatorState().mode)
  //
  // On the SERVER `window` is undefined, so the HTML was ALWAYS rendered as
  // "clinic". On the CLIENT the very first render was already "lab". Preact's
  // hydration deliberately does NOT write props onto existing server DOM (the
  // only exception is `value`/`checked`) — it adopts the markup as-is. So:
  //
  //   • the Klinik button kept class="is-active" straight from the server,
  //     even though `mode` was correctly "lab"  → Issue 1 (homepage shows
  //     Klinik while the numbers are Lab's);
  //   • every <input type="range"> kept the CLINIC min/max/step and the
  //     clinic gradient, while its `value` WAS overwritten with the lab
  //     number → the browser clamps that value into the wrong range and the
  //     painted gradient no longer matches the thumb. Any later re-render
  //     re-clamps all six/three inputs at once → Issue 2 (every pointer
  //     jumps).
  //
  // And because `mode` never actually CHANGED ("lab" === "lab"), no follow-up
  // diff ever ran to repair any of it. That is why className-only, then
  // inline-style, then ref-based patches each fixed one visible symptom and
  // left the next one behind.
  //
  // The fix is to stop diverging from the server on the first render: start
  // in the same state the server rendered ("clinic"), then apply the URL in a
  // useLayoutEffect after mount. That is a REAL state transition, so Preact
  // re-diffs the whole subtree and repairs className, min/max/step, style,
  // innerHTML and the detail-link href on its own — before the browser paints,
  // so there is no visible flash.
  // ===========================================================================
  const [mode, setMode] = useState<Mode>("clinic");
  const active = presets[mode];

  const [work, setWork] = useState(presets.clinic.workDefault);
  const [rpt, setRpt] = useState(presets.clinic.rptDefault);
  const [cost, setCost] = useState(presets.clinic.costDefault);

  // Mirrors for the URL-sync effect, which is registered once and must not
  // close over stale render values.
  const modeRef = useRef<Mode>(mode);
  const presetsRef = useRef(presets);
  modeRef.current = mode;
  presetsRef.current = presets;

  // Remembers the exact search+hash we last imported from, so a plain tab
  // switch (visibilitychange) or an unrelated history event can never re-run
  // the import and stomp on values the user has since adjusted by hand.
  const lastSyncedUrlRef = useRef<string | null>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const urlKey = () => `${window.location.search}${window.location.hash}`;

    function syncFromUrl(force?: boolean) {
      const key = urlKey();
      if (!force && key === lastSyncedUrlRef.current) return;
      lastSyncedUrlRef.current = key;

      const imported = importedCalculatorState();

      // Nothing to import (e.g. the cleanup effect below already stripped the
      // params). Leave whatever the user is currently looking at alone.
      if (!imported.mode && imported.cost <= 0) return;

      const prevMode = modeRef.current;
      const nextMode = imported.mode ?? prevMode;

      if (nextMode !== prevMode) {
        const nextPreset = presetsRef.current[nextMode];
        modeRef.current = nextMode;
        setMode(nextMode);
        setWork(nextPreset.workDefault);
        setRpt(nextPreset.rptDefault);
        setCost(imported.cost > 0 ? imported.cost : nextPreset.costDefault);
        return;
      }

      // Same mode, fresh ?rc=... — apply it. (The old code returned early
      // here without ever calling setCost, which is why an imported cost for
      // the mode you were already in was silently dropped and the slider sat
      // on 500 / 28.57%.)
      if (imported.cost > 0) setCost(imported.cost);
    }

    syncFromUrl(true);

    const onPopState = () => syncFromUrl();
    const onVisibilityChange = () => {
      if (!document.hidden) syncFromUrl();
    };

    window.addEventListener("popstate", onPopState);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.removeEventListener("popstate", onPopState);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Clean up URL params after reading them (one-time). Runs as a passive
  // effect, i.e. after the layout effect above has already imported them.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);
    let needsCleanup = false;

    // Clean search params
    if (url.searchParams.has("rc") || url.searchParams.has("mode")) {
      url.searchParams.delete("rc");
      url.searchParams.delete("mode");
      needsCleanup = true;
    }

    // Clean hash-based query params (#hesap?rc=340&mode=lab -> #hesap)
    if (url.hash) {
      const qIndex = url.hash.indexOf("?");
      if (qIndex !== -1) {
        url.hash = url.hash.slice(0, qIndex);
        needsCleanup = true;
      }
    }

    if (needsCleanup) {
      const cleanUrl = url.search
        ? `${url.pathname}${url.search}${url.hash}`
        : `${url.pathname}${url.hash}`;
      window.history.replaceState(null, "", cleanUrl);
      lastSyncedUrlRef.current = `${url.search}${url.hash}`;
    }
  }, []);

  // Belt-and-braces DOM sync for the three range inputs. Note this now writes
  // min/max/step too — writing only `value` (as before) was actively harmful
  // after a hydration mismatch, because the browser clamps the new value into
  // the OLD range and the thumb lands somewhere the gradient doesn't agree
  // with. Order matters: range first, then value.
  const workInputRef = useRef<HTMLInputElement | null>(null);
  const rptInputRef = useRef<HTMLInputElement | null>(null);
  const costInputRef = useRef<HTMLInputElement | null>(null);

  // Same treatment for the two segment buttons, so their active state can
  // never be inherited from mismatched server markup.
  const clinicBtnRef = useRef<HTMLButtonElement | null>(null);
  const labBtnRef = useRef<HTMLButtonElement | null>(null);

  const initialLoss =
    presets.clinic.workDefault *
    12 *
    (presets.clinic.rptDefault / 100) *
    presets.clinic.costDefault;
  const initialAnimatedLoss = initialLoss > 100000 ? 100000 : 10000;
  const [animatedLoss, setAnimatedLoss] = useState(initialAnimatedLoss);
  const animatedLossRef = useRef(initialAnimatedLoss);
  const currentLossRef = useRef(0);

  function applyMode(nextMode: Mode) {
    const next = presets[nextMode];
    modeRef.current = nextMode;
    setMode(nextMode);
    setWork(next.workDefault);
    setRpt(next.rptDefault);
    setCost(next.costDefault);
  }

  const yearly = work * 12;
  const currentLoss = yearly * (rpt / 100) * cost;
  currentLossRef.current = currentLoss;
  const targetLoss = yearly * (active.targetRepeatRate / 100) * cost;
  const cappedTargetLoss = Math.min(currentLoss, targetLoss);
  const savings = Math.max(0, currentLoss - targetLoss);
  const currency = props.currencyPrefix || "";
  const percent = props.percentPrefix || "";
  const negative = props.negativePrefix || "";
  const positive = props.positivePrefix || "";
  const titleLoss = animatedLoss;

  const formattedLoss = `${currency}${formatPlain(titleLoss, props.locale)}`;
  const titleUnderlineImage = imageSource(props.titleUnderlineImageUrl);
  const showDesktopTitleUnderline = props.showTitleUnderline !== false;
  const showTabletTitleUnderline = props.showTitleUnderlineTablet !== false;
  const showMobileTitleUnderline = props.showTitleUnderlineMobile !== false;
  const shouldRenderTitleUnderline =
    showDesktopTitleUnderline ||
    showTabletTitleUnderline ||
    showMobileTitleUnderline;
  const isAtTarget = rpt <= active.targetRepeatRate;
  const secondaryButtonHref = consultationHref(props.secondaryButtonHref);
  const secondaryButtonExternal = /^https?:\/\//i.test(secondaryButtonHref);
  const titleBeforeAmount =
    mode === "lab"
      ? props.labTitleBeforeAmount ||
        props.titleBeforeAmount?.replace(tLocalized("Kliniğiniz", "Your clinic"), tLocalized("Laboratuvarınız", "Your laboratory")).replace(/clinic/i, "laboratory")
      : props.titleBeforeAmount;

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof window.requestAnimationFrame !== "function"
    ) {
      animatedLossRef.current = currentLoss;
      setAnimatedLoss(currentLossRef.current);
      return;
    }

    let animationFrame = 0;
    let startTime: number | null = null;
    const targetLoss = currentLossRef.current;
    const startLoss = animatedLossRef.current;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / 1500, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextLoss = startLoss + (targetLoss - startLoss) * eased;
      animatedLossRef.current = nextLoss;
      setAnimatedLoss(nextLoss);

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animate);
        return;
      }

      animatedLossRef.current = currentLossRef.current;
      setAnimatedLoss(currentLossRef.current);
    };

    animationFrame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [currentLoss]);

  const themeStyle = {
    "--tmhero-bg": "var(--bg, #FAFAF7)",
    "--tmhero-text": "var(--ink, #0E0E0C)",
    "--tmhero-muted": props.mutedTextColor || "#55554E",
    "--tmhero-sub": "var(--sub, #55554E)",
    "--tmhero-line": "var(--line, #E6E6E0)",
    "--tmhero-line-strong": "var(--line2, #D5D5CD)",
    "--tmhero-panel": "#FFFFFF",
    "--tmhero-accent": "var(--lime, #C7F136)",
    "--tmhero-accent-soft": "var(--lime-soft, #F2F8DC)",
    "--tmhero-accent-text": "var(--lime-ink, #3D4D0E)",
    "--tmhero-primary-button-text": "var(--ink, #0E0E0C)",
    "--tmhero-secondary-button-text": "var(--ink, #0E0E0C)",
    "--tmhero-lab-accent": "var(--lime, #C7F136)",
    "--tmhero-lab-accent-text": "var(--lime-ink, #3D4D0E)",
    "--tmhero-danger": props.dangerColor || "#B52E1E",
    "--tmhero-word-color": "var(--lime, #C7F136)",
    "--tmhero-word-weight": props.styledPhraseBold ? "800" : "inherit",
    "--tmhero-word-style": props.styledPhraseItalic ? "italic" : "inherit",
    "--tmhero-title-underline-width": percentage(
      props.titleUnderlineImageWidth,
      72,
      10,
      140,
    ),
    "--tmhero-title-underline-height": `${numberInRange(props.titleUnderlineImageHeight, 22, 4, 80)}px`,
    "--tmhero-title-underline-x": `${numberInRange(props.titleUnderlineImageXOffset, 0, -120, 120)}px`,
    "--tmhero-title-underline-y": `${numberInRange(props.titleUnderlineImageYOffset, 0, -80, 80)}px`,
    "--tmhero-title-underline-desktop-display": showDesktopTitleUnderline
      ? "block"
      : "none",
    "--tmhero-title-underline-tablet-display": showTabletTitleUnderline
      ? "block"
      : "none",
    "--tmhero-title-underline-mobile-display": showMobileTitleUnderline
      ? "block"
      : "none",
    "--tmhero-title-underline-tablet-width": percentage(
      props.titleUnderlineTabletWidth,
      66,
      10,
      140,
    ),
    "--tmhero-title-underline-tablet-height": `${numberInRange(props.titleUnderlineTabletHeight, 18, 4, 80)}px`,
    "--tmhero-title-underline-tablet-x": `${numberInRange(props.titleUnderlineTabletXOffset, 0, -120, 120)}px`,
    "--tmhero-title-underline-tablet-y": `${numberInRange(props.titleUnderlineTabletYOffset, 0, -80, 80)}px`,
    "--tmhero-title-underline-mobile-width": percentage(
      props.titleUnderlineMobileWidth,
      58,
      10,
      140,
    ),
    "--tmhero-title-underline-mobile-height": `${numberInRange(props.titleUnderlineMobileHeight, 14, 4, 80)}px`,
    "--tmhero-title-underline-mobile-x": `${numberInRange(props.titleUnderlineMobileXOffset, -6, -120, 120)}px`,
    "--tmhero-title-underline-mobile-y": `${numberInRange(props.titleUnderlineMobileYOffset, 0, -80, 80)}px`,
    "--tmhero-title-underline-fit": imageFit(
      props.titleUnderlineImageFit,
      "fill",
    ),
    "--tmhero-title-underline-opacity":
      numberInRange(props.titleUnderlineImageOpacity, 100, 0, 100) / 100,
    "--tmhero-title-underline-brightness": percentage(
      props.titleUnderlineImageBrightness,
      100,
      0,
      220,
    ),
    "--tmhero-title-underline-contrast": percentage(
      props.titleUnderlineImageContrast,
      100,
      0,
      220,
    ),
    "--tmhero-title-underline-saturation": percentage(
      props.titleUnderlineImageSaturation,
      100,
      0,
      300,
    ),
    "--tmhero-title-underline-hue": `${numberInRange(props.titleUnderlineImageHue, 0, -180, 180)}deg`,
    "--tmhero-title-underline-invert": percentage(
      props.titleUnderlineImageInvert,
      0,
      0,
      100,
    ),
  } as any; // CSS-in-JS: dynamic CSS custom properties for theme styling

  const sliderAccent =
    mode === "lab"
      ? "var(--tmhero-lab-accent, #C7F136)"
      : "var(--tmhero-accent, #C7F136)";
  const costMax = Math.max(active.costMax, cost);
  const workProgress = rangeProgress(work, active.workMin, active.workMax);
  const rptProgress = rangeProgress(rpt, active.rptMin, active.rptMax);
  const costProgress = rangeProgress(cost, active.costMin, costMax);

  function syncRange(
    el: HTMLInputElement | null,
    min: number,
    max: number,
    step: number,
    value: number,
    progress: number,
  ) {
    if (!el) return;
    // Range BEFORE value — otherwise the browser clamps the new value into
    // the old range and the thumb desyncs from the gradient.
    const nextMin = String(min);
    const nextMax = String(max);
    const nextStep = String(step);
    if (el.min !== nextMin) el.min = nextMin;
    if (el.max !== nextMax) el.max = nextMax;
    if (el.step !== nextStep) el.step = nextStep;
    const nextValue = String(value);
    if (el.value !== nextValue) el.value = nextValue;
    el.style.setProperty("--p", `${progress}%`);
    el.style.background = `linear-gradient(90deg, ${sliderAccent} ${progress}%, #e8e8e1 ${progress}%)`;
  }

  useLayoutEffect(() => {
    syncRange(
      workInputRef.current,
      active.workMin,
      active.workMax,
      active.workStep,
      work,
      workProgress,
    );
  });

  useLayoutEffect(() => {
    syncRange(
      rptInputRef.current,
      active.rptMin,
      active.rptMax,
      active.rptStep,
      rpt,
      rptProgress,
    );
  });

  useLayoutEffect(() => {
    syncRange(
      costInputRef.current,
      active.costMin,
      costMax,
      active.costStep,
      cost,
      costProgress,
    );
  });

  useLayoutEffect(() => {
    const clinicActive = mode === "clinic";
    if (clinicBtnRef.current) {
      clinicBtnRef.current.className = clinicActive ? "is-active" : "";
    }
    if (labBtnRef.current) {
      labBtnRef.current.className = clinicActive ? "" : "is-active";
    }
  }, [mode]);

  return (
  <section className={`three-mash-hero${heroReady ? " is-ready" : ""}`} style={themeStyle}>
      <div className="tmhero-wrap">
        <div className="tmhero-top">
          <div className="tmhero-copy">
            <div className="tmhero-micro">
              <span className="tmhero-dot" />
              <RichInline value={props.eyebrowText} wordStyle={props} />
            </div>

            <h1>
              {isEnglishLocale() ? (
                <>
                  <span className="tmhero-line-1" style={{ display: "block" }}>
                    <RichInline value={titleBeforeAmount} wordStyle={props} />
                  </span>
                  <span className="tmhero-loss-line" style={{ display: "block" }}>
                    <span className="tmhero-money">{formattedLoss}</span> silently
                  </span>
                  <span className="tmhero-line-after" style={{ display: "block" }}>
                    {tLocalized("every year.", "every year")}
                  </span>
                  <span className="tmhero-em-wrap" style={{ display: "block" }}>
                    <span
                      className="tmhero-em"
                      dangerouslySetInnerHTML={richText(props.titleEmphasis, props)}
                    />
                    {shouldRenderTitleUnderline && titleUnderlineImage ? (
                      <img
                        className="tmhero-title-underline-image"
                        src={titleUnderlineImage}
                        alt={props.titleUnderlineImageAlt || ""}
                        aria-hidden={props.titleUnderlineImageAlt ? undefined : "true"}
                      />
                    ) : null}
                  </span>
                </>
              ) : (
                <>
                  <RichInline value={titleBeforeAmount} wordStyle={props} />{" "}
                  <span className="tmhero-loss-line" style={{ display: "block" }}>
                    <span className="tmhero-money">{formattedLoss}</span>{" "}
                    <RichInline value={props.titleAfterAmount} wordStyle={props} />
                  </span>{" "}
                  <span className="tmhero-em-wrap">
                    <span
                      className="tmhero-em"
                      dangerouslySetInnerHTML={richText(props.titleEmphasis, props)}
                    />
                    {shouldRenderTitleUnderline && titleUnderlineImage ? (
                      <img
                        className="tmhero-title-underline-image"
                        src={titleUnderlineImage}
                        alt={props.titleUnderlineImageAlt || ""}
                        aria-hidden={props.titleUnderlineImageAlt ? undefined : "true"}
                      />
                    ) : null}
                  </span>
                </>
              )}
            </h1>

            <p className="tmhero-subtitle">
              <RichInline value={props.subtitleStart} wordStyle={props} />{" "}
              <b
                dangerouslySetInnerHTML={richText(
                  props.subtitleStrongOne,
                  props,
                )}
              />{" "}
              <RichInline value={props.subtitleMiddle} wordStyle={props} />{" "}
              <b
                dangerouslySetInnerHTML={richText(
                  props.subtitleStrongTwo,
                  props,
                )}
              />{" "}
              <RichInline value={props.subtitleEnd} wordStyle={props} />
            </p>

            <div className="tmhero-cta">
              <a
                className="tmhero-btn tmhero-btn-accent"
                href={href(props.primaryButtonHref)}
                onClick={(event) =>
                  smoothAnchorClick(event, props.primaryButtonHref)
                }
              >
                <RichInline value={props.primaryButtonText} wordStyle={props} />
              </a>
              <a
                className="tmhero-btn tmhero-btn-line"
                href={secondaryButtonHref}
                target={secondaryButtonExternal ? "_blank" : undefined}
                rel={
                  secondaryButtonExternal ? "noopener noreferrer" : undefined
                }
                onClick={(event) =>
                  smoothAnchorClick(event, secondaryButtonHref)
                }
              >
                <RichInline
                  value={props.secondaryButtonText}
                  wordStyle={props}
                />
              </a>
              <span dangerouslySetInnerHTML={richText(props.hintText, props)} />
            </div>
          </div>

          <div
            className="tmhero-calculator-side"
            id={props.calculatorAnchorId || undefined}
          >
            <div
              className={`tmhero-calc${mode === "lab" ? " is-lab-mode" : ""}`}
            >
              <div className="tmhero-calc-head">
                <span
                  className="tmhero-micro"
                  dangerouslySetInnerHTML={richText(
                    props.calculatorEyebrow,
                    props,
                  )}
                />
                <span
                  className="tmhero-est"
                  dangerouslySetInnerHTML={richText(
                    props.calculatorBadgeText,
                    props,
                  )}
                />
              </div>

              <div className="tmhero-segment">
                <button
                  ref={clinicBtnRef}
                  className={mode === "clinic" ? "is-active" : ""}
                  type="button"
                  onClick={() => applyMode("clinic")}
                >
                  <RichInline value={props.clinicModeText} wordStyle={props} />
                </button>
                <button
                  ref={labBtnRef}
                  className={mode === "lab" ? "is-active" : ""}
                  type="button"
                  onClick={() => applyMode("lab")}
                >
                  <RichInline value={props.labModeText} wordStyle={props} />
                </button>
              </div>

              {/* key={mode} forces Preact to fully unmount/remount each slider
                  block when mode changes, so a fresh DOM node is built with
                  the new preset's min/max/step and gradient rather than being
                  patched in place. */}
              <div className="tmhero-slider" key={`${mode}-work`}>
                <div className="tmhero-slider-label">
                  <span
                    dangerouslySetInnerHTML={richText(active.workLabel, props)}
                  />
                  <b>{formatPlain(work, props.locale)}</b>
                </div>
                <input
                  ref={workInputRef}
                  type="range"
                  min={active.workMin}
                  max={active.workMax}
                  step={active.workStep}
                  value={work}
                  style={
                    {
                      "--p": `${workProgress}%`,
                      background: `linear-gradient(90deg, ${sliderAccent} ${workProgress}%, #e8e8e1 ${workProgress}%)`,
                    } as any
                  }
                  onInput={(event) => {
                    setWork(
                      Number((event.currentTarget as HTMLInputElement).value),
                    );
                  }}
                  aria-label={active.workLabel || undefined}
                />
              </div>

              <div className="tmhero-slider" key={`${mode}-rpt`}>
                <div className="tmhero-slider-label">
                  <span
                    dangerouslySetInnerHTML={richText(active.rptLabel, props)}
                  />
                  <b>
                    {percent}
                    {rpt}
                  </b>
                </div>
                <input
                  ref={rptInputRef}
                  type="range"
                  min={active.rptMin}
                  max={active.rptMax}
                  step={active.rptStep}
                  value={rpt}
                  style={
                    {
                      "--p": `${rptProgress}%`,
                      background: `linear-gradient(90deg, ${sliderAccent} ${rptProgress}%, #e8e8e1 ${rptProgress}%)`,
                    } as any
                  }
                  onInput={(event) => {
                    setRpt(
                      Number((event.currentTarget as HTMLInputElement).value),
                    );
                  }}
                  aria-label={active.rptLabel || undefined}
                />
              </div>

              <div className="tmhero-slider" key={`${mode}-cost`}>
                <div className="tmhero-slider-label">
                  <span
                    dangerouslySetInnerHTML={richText(active.costLabel, props)}
                  />
                  <b>
                    {currency}
                    {formatPlain(cost, props.locale)}
                  </b>
                </div>
                <input
                  ref={costInputRef}
                  type="range"
                  min={active.costMin}
                  max={costMax}
                  step={active.costStep}
                  value={cost}
                  style={
                    {
                      "--p": `${costProgress}%`,
                      background: `linear-gradient(90deg, ${sliderAccent} ${costProgress}%, #e8e8e1 ${costProgress}%)`,
                    } as any
                  }
                  onInput={(event) => {
                    setCost(
                      Number((event.currentTarget as HTMLInputElement).value),
                    );
                  }}
                  aria-label={active.costLabel || undefined}
                />
                <a
                  className="tmhero-calc-link"
                  href={`${localizedHref(active.costDetailHref || costDetailPageHref)}${(active.costDetailHref || costDetailPageHref).includes("?") ? "&" : "?"}mode=${mode === "lab" ? "lab" : "clinic"}`}
                >
                  <RichInline value={active.costDetailText} wordStyle={props} />
                </a>
              </div>

              <div className="tmhero-output">
                <div className="tmhero-row">
                  <span>
                    <RichInline
                      value={props.currentLossLabel}
                      wordStyle={props}
                    />{" "}
                    <i
                      dangerouslySetInnerHTML={richText(
                        props.currentLossNote,
                        props,
                      )}
                    />
                  </span>
                  <b className="tmhero-loss">
                    {negative}
                    {currency}
                    {formatPlain(currentLoss, props.locale)}
                  </b>
                </div>
                <div className="tmhero-row">
                  <span>
                    <RichInline
                      value={props.targetLossLabel}
                      wordStyle={props}
                    />{" "}
                    <i
                      dangerouslySetInnerHTML={richText(
                        props.targetLossNote,
                        props,
                      )}
                    />
                  </span>
                  <b>
                    {negative}
                    {currency}
                    {formatPlain(cappedTargetLoss, props.locale)}
                  </b>
                </div>
              </div>

              <div className="tmhero-total">
                <div
                  className="tmhero-micro"
                  dangerouslySetInnerHTML={richText(
                    props.savingsEyebrow,
                    props,
                  )}
                />
                <div
                  className={`tmhero-total-value${isAtTarget ? " is-message" : ""}`}
                >
                  {isAtTarget ? (
                    <RichInline
                      value={props.alreadyTargetText}
                      wordStyle={props}
                    />
                  ) : (
                    `${positive}${currency}${formatPlain(savings, props.locale)}`
                  )}
                </div>
              </div>

              <div className="tmhero-fine">
                <RichInline
                  value={props.fineTextBeforeLink}
                  wordStyle={props}
                />{" "}
                <a
                  href={href(props.fineLinkHref)}
                  dangerouslySetInnerHTML={richText(props.fineLinkText, props)}
                />{" "}
                <RichInline value={props.fineTextAfterLink} wordStyle={props} />
              </div>
            </div>
          </div>
        </div>

        <div className="tmhero-stats">
          <StatBlock
            value={props.stat1Value}
            suffix={props.stat1Suffix}
            label={props.stat1Label}
            wordStyle={props}
          />
          <StatBlock
            value={props.stat2Value}
            suffix={props.stat2Suffix}
            label={props.stat2Label}
            wordStyle={props}
          />
          <StatBlock
            value={props.stat3Value}
            suffix={props.stat3Suffix}
            label={props.stat3Label}
            wordStyle={props}
          />
          <StatBlock
            value={props.stat4Value}
            suffix={props.stat4Suffix}
            label={props.stat4Label}
            wordStyle={props}
          />
        </div>
      </div>
    </section>
  );
}

export default ThreeMashHero;
