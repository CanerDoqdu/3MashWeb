import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "preact/hooks";
import { Props } from "./types";
import { isEnglishLocale, localizedHref } from "../../utils/i18n";
import { sanitizeHtml } from "../../utils/sanitizeHtml";
import { safeNavigationHref } from "../../utils/safeRedirect";

type CostMode = "klinik" | "lab";

type FieldDef = {
  id: string;
  label: string;
  labelHtml: string;
  min: number;
  max: number;
  step: number;
  val: number;
  color: string;
  kind: "rate" | "min" | "mult" | "perUnit" | "flat";
  pairsWith?: string;
};

function localizedProp(
  value: string | null | undefined,
  valueEn: string | null | undefined,
  fallbackTr: string,
  fallbackEn: string,
): string {
  const isEnglish = isEnglishLocale();
  const localizedValue = isEnglish ? valueEn : value;
  return localizedValue?.trim() || (isEnglish ? fallbackEn : fallbackTr);
}

function plainText(value: string): string {
  return value
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function localizedFieldLabel(
  value: string | null | undefined,
  valueEn: string | null | undefined,
  fallbackTr: string,
  fallbackEn: string,
): Pick<FieldDef, "label" | "labelHtml"> {
  const labelHtml = localizedProp(value, valueEn, fallbackTr, fallbackEn);
  return { label: plainText(labelHtml), labelHtml };
}

const fmt = (n: number, currencySymbol: string) =>
  currencySymbol + Math.round(n).toLocaleString("tr-TR");

const DEFAULT_STUDY_ONE_TR = `<span class="tag">HAKEMLİ KLİNİK VERİ</span><h3>Tekrar oranı gerçekte ne kadar? Ulusal PBRN, 3.750 kron üzerinde ölçtü.</h3><div class="meta">McCracken M.S. ve ark. (National Dental PBRN Collaborative Group) · <i>Journal of Prosthodontics</i>, 2019;28(2):122–130</div><ul><li><b>205 diş hekimi</b>, gerçek klinik pratiğinde <b>3.750 tek-ünite kron</b> değerlendirdi.</li><li>Ortalama tekrar (remake) oranı <b>%3,8</b> — fakat hekimden hekime <b>%0 ile %42</b> arasında değişiyor.</li><li>Hekimlerin %58'i hiç kron reddetmezken, tüm reddetmeler %42'lik gruptan geldi — yani sorun <b>tekil, çözülebilir</b> bir uygulama farkı.</li><li>En sık ret sebepleri: <b>proksimal uyumsuzluk, marjinal hatalar ve estetik başarısızlık</b> — üçü de doğrudan <b>ölçüsel hassasiyet</b> problemi.</li></ul><a class="link" href="https://doi.org/10.1111/jopr.12995" target="_blank" rel="noopener noreferrer">DOI: 10.1111/jopr.12995 · Kaynağı aç →</a>`;
const DEFAULT_STUDY_ONE_EN = `<span class="tag">PEER-REVIEWED CLINICAL DATA</span><h3>What is the remake rate really? The National PBRN measured it across 3,750 crowns.</h3><div class="meta">McCracken M.S. et al. (National Dental PBRN Collaborative Group) · <i>Journal of Prosthodontics</i>, 2019;28(2):122–130</div><ul><li><b>205 dentists</b> evaluated <b>3,750 single-unit crowns</b> in real clinical practice.</li><li>Average remake rate is <b>3.8%</b> — but varies from <b>0% to 42%</b> across practitioners.</li><li>While 58% of clinicians never reject a crown, all rejections came from the remaining 42% — meaning the problem is <b>single and solvable</b>.</li><li>Most common rejection causes: <b>proximal misfit, marginal errors, and aesthetic failure</b> — all direct <b>dimensional accuracy</b> problems.</li></ul><a class="link" href="https://doi.org/10.1111/jopr.12995" target="_blank" rel="noopener noreferrer">DOI: 10.1111/jopr.12995 · Open source →</a>`;
const DEFAULT_STUDY_TWO_TR = `<span class="tag">HAKEMLİ · ÖLÇÜSEL DOĞRULUK</span><h3>Peki sapma neden oluşuyor? Doğruluk, kullanılan sisteme göre uçtan uca değişiyor.</h3><div class="meta">Etemad-Shahidi Y. ve ark. · <i>J Clin Med</i> 2020 (sistematik derleme) · Németh A. ve ark. · <i>J Dentistry</i> 2023 (ağ meta-analizi)</div><ul><li>Sistematik derlemede full-arch model doğruluğu en iyi sistemde <b>3,3 µm</b>'ye inerken, bazı cihazlarda <b>130–190 µm</b>'ye çıkıyor — yani doğru sonucu cihaz ve parametre belirliyor.</li><li>Ağ meta-analizi <b>SLA, DLP ve PolyJet</b>'i en doğru teknolojiler olarak gösteriyor (SLA ~<b>86,7 µm</b>, DLP ~<b>97,9 µm</b> ortalama trueness).</li><li>Yani sapma tesadüf değil, yönetilebilir bir değişken. <b>3mash bu değişkenleri birlikte kalibre ederek ±20 µm'yi her baskıda</b> sabitler; tekrar oranı ve maliyet de bu sayede düşer.</li></ul><a class="link" href="https://doi.org/10.3390/jcm9103357" target="_blank" rel="noopener noreferrer">DOI: 10.3390/jcm9103357 →</a>&nbsp;&nbsp;<a class="link" href="https://doi.org/10.1016/j.jdent.2023.104532" target="_blank" rel="noopener noreferrer">DOI: 10.1016/j.jdent.2023.104532 →</a>`;
const DEFAULT_STUDY_TWO_EN = `<span class="tag">PEER-REVIEWED · DIMENSIONAL ACCURACY</span><h3>So why does deviation occur? Accuracy varies end-to-end depending on the system used.</h3><div class="meta">Etemad-Shahidi Y. et al. · <i>J Clin Med</i> 2020 (systematic review) · Németh A. et al. · <i>J Dentistry</i> 2023 (network meta-analysis)</div><ul><li>In the systematic review, full-arch model accuracy with the best system goes down to <b>3.3 µm</b>, while on some devices it goes up to <b>130–190 µm</b> — meaning the device and parameters determine the correct result.</li><li>The network meta-analysis ranks <b>SLA, DLP, and PolyJet</b> as the most accurate technologies (SLA ~<b>86.7 µm</b>, DLP ~<b>97.9 µm</b> average trueness).</li><li>Deviation is not chance; it is a manageable variable. <b>3mash calibrates these variables together to deliver ±20 µm on every print</b>, lowering remake rate and cost.</li></ul><a class="link" href="https://doi.org/10.3390/jcm9103357" target="_blank" rel="noopener noreferrer">DOI: 10.3390/jcm9103357 →</a>&nbsp;&nbsp;<a class="link" href="https://doi.org/10.1016/j.jdent.2023.104532" target="_blank" rel="noopener noreferrer">DOI: 10.1016/j.jdent.2023.104532 →</a>`;
const DEFAULT_CALLOUT_TR = `<p><b>3mash bağlantısı:</b> çalışmanın işaret ettiği üç sebep de (proksimal uyum, marjin, estetik) <b>±20 µm tekrar edilebilir hassasiyetle</b> doğrudan azalır. Tekrar oranınızı %42'lerden ya da %10'lardan <b>≤%3'e</b> çektiğinizde, yukarıdaki kalem-kalem maliyet aynı oranda düşer.</p>`;
const DEFAULT_CALLOUT_EN = `<p><b>3mash connection:</b> the three reasons highlighted by the study (proximal fit, margin, aesthetics) are directly reduced with <b>±20 µm repeatable precision</b>. When you lower your remake rate from around 42% or 10% to <b>≤3%</b>, the itemized cost above drops by the same rate.</p>`;
const DEFAULT_SOURCE_NOTES_TR = `Kaynaklar: Tekrar oranı ve ret sebepleri — McCracken ve ark., <a href="https://doi.org/10.1111/jopr.12995" target="_blank" rel="noopener noreferrer">J Prosthodont 2019 (10.1111/jopr.12995)</a>. Ölçüsel doğruluk — Etemad-Shahidi ve ark., <a href="https://doi.org/10.3390/jcm9103357" target="_blank" rel="noopener noreferrer">J Clin Med 2020 (10.3390/jcm9103357)</a> ve Németh ve ark., <a href="https://doi.org/10.1016/j.jdent.2023.104532" target="_blank" rel="noopener noreferrer">J Dentistry 2023 (10.1016/j.jdent.2023.104532)</a>. Maliyet modeli (koltuk süresi/işletme gideri) — Spear Education, “The Cost of Laboratory Remakes.” Rakamlar tahminî olup iş akışınıza göre değişir.`;
const DEFAULT_SOURCE_NOTES_EN = `Sources: Remake rate and rejection causes — McCracken et al., <a href="https://doi.org/10.1111/jopr.12995" target="_blank" rel="noopener noreferrer">J Prosthodont 2019 (10.1111/jopr.12995)</a>. Dimensional accuracy — Etemad-Shahidi et al., <a href="https://doi.org/10.3390/jcm9103357" target="_blank" rel="noopener noreferrer">J Clin Med 2020 (10.3390/jcm9103357)</a> and Németh et al., <a href="https://doi.org/10.1016/j.jdent.2023.104532" target="_blank" rel="noopener noreferrer">J Dentistry 2023 (10.1016/j.jdent.2023.104532)</a>. Cost model (chair time/operating expense) — Spear Education, “The Cost of Laboratory Remakes.” Figures are estimates and vary by your workflow.`;

const segActiveStyle = {
  background: "var(--ink)",
  borderColor: "var(--ink)",
  color: "#fff",
} as any;
const segInactiveStyle = {
  background: "#fff",
  borderColor: "var(--line)",
  color: "var(--sub)",
} as any;

// FIX: returns null when the URL carries no mode at all, instead of silently
// defaulting to "klinik". The old version defaulted, which meant the
// visibilitychange listener below would drag the user back to Klinik every
// time they switched tabs after manually choosing Laboratuvar.
function readModeFromUrl(): CostMode | null {
  if (typeof window === "undefined") return null;

  try {
    const params = new URLSearchParams(window.location.search);
    const urlMode = params.get("mode");
    if (urlMode === "lab" || urlMode === "laboratuvar") return "lab";
    if (urlMode === "clinic" || urlMode === "klinik") return "klinik";

    const hash = window.location.hash;
    const qIndex = hash.indexOf("?");
    if (qIndex !== -1) {
      const hashParams = new URLSearchParams(hash.slice(qIndex));
      const hashMode = hashParams.get("mode");
      if (hashMode === "lab" || hashMode === "laboratuvar") return "lab";
      if (hashMode === "clinic" || hashMode === "klinik") return "klinik";
    }
  } catch (_) {}

  return null;
}

function rangeProgress(val: number, min: number, max: number) {
  if (max <= min) return "0%";
  return `${Math.min(100, Math.max(0, ((val - min) / (max - min)) * 100))}%`;
}

export function ThreeMashCostDetailPage(props: Props) {
  // ===========================================================================
  // ROOT-CAUSE FIX — see the long note in ThreeMashHero; the same bug lived
  // here.
  //
  // `useState(getInitialMode)` read window.location during the very first
  // render. On the server there is no window, so the HTML always shipped as
  // "klinik"; on the client the first render was already "lab". Preact's
  // hydration adopts the server DOM without re-applying props (only
  // value/checked are special-cased), so:
  //
  //   • the Klinik button kept class="on" and the active inline style;
  //   • all six <input type="range"> kept the KLİNİK min/max/step and the
  //     klinik gradient while their `value` was overwritten with the lab
  //     number — the browser then clamps that value into the wrong range.
  //     Any later re-render (i.e. touching ANY slider) re-clamps all six at
  //     once, which is exactly the "bütün pointerlar yerinden oynuyor"
  //     symptom.
  //
  // Because `mode` never actually changed ("lab" === "lab"), no diff ever ran
  // to repair it. So: render the server's state first, then apply the URL in
  // a layout effect — a real transition that makes Preact fix everything
  // before the first paint.
  // ===========================================================================
  const [mode, setMode] = useState<CostMode>("klinik");
  const [saved, setSaved] = useState(false);

  const klinikBtnRef = useRef<HTMLButtonElement | null>(null);
  const labBtnRef = useRef<HTMLButtonElement | null>(null);

  // Belt-and-braces: force the segment buttons' class + style onto the DOM
  // after every render, so they can never be inherited from server markup.
  useLayoutEffect(() => {
    const klinikActive = mode === "klinik";
    if (klinikBtnRef.current) {
      klinikBtnRef.current.className = klinikActive ? "on" : "";
      Object.assign(
        klinikBtnRef.current.style,
        klinikActive ? segActiveStyle : segInactiveStyle,
      );
    }
    if (labBtnRef.current) {
      const labActive = !klinikActive;
      labBtnRef.current.className = labActive ? "on" : "";
      Object.assign(
        labBtnRef.current.style,
        labActive ? segActiveStyle : segInactiveStyle,
      );
    }
  }, [mode]);

  // Remembers which search+hash we last imported from, so a tab switch or an
  // unrelated history event can't re-apply a stale ?mode= and undo a choice
  // the user made by hand on this page.
  const lastSyncedUrlRef = useRef<string | null>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const urlKey = () => `${window.location.search}${window.location.hash}`;

    function syncModeFromUrl(force?: boolean) {
      const key = urlKey();
      if (!force && key === lastSyncedUrlRef.current) return;
      lastSyncedUrlRef.current = key;

      const next = readModeFromUrl();
      if (!next) return; // no mode in the URL — leave the user's choice alone
      setMode((prev) => (prev !== next ? next : prev));
    }

    syncModeFromUrl(true);

    const onPopState = () => syncModeFromUrl();
    const onVisibilityChange = () => {
      if (!document.hidden) syncModeFromUrl();
    };

    window.addEventListener("popstate", onPopState);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.removeEventListener("popstate", onPopState);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  // Klinik input states (initialized from props or defaults)
  const [chairRate, setChairRate] = useState(props.defaultChairRate ?? 375);
  const [chairMin, setChairMin] = useState(props.defaultChairMin ?? 55);
  const [units, setUnits] = useState(props.defaultUnits ?? 1);
  const [labFee, setLabFee] = useState(props.defaultLabFee ?? 110);
  const [ship, setShip] = useState(props.defaultShip ?? 25);
  const [misc, setMisc] = useState(props.defaultMisc ?? 20);

  // Lab input states (initialized from props or defaults)
  const [matUnit, setMatUnit] = useState(props.defaultMatUnit ?? 35);
  const [unitsL, setUnitsL] = useState(props.defaultUnitsL ?? 3);
  const [labRate, setLabRate] = useState(props.defaultLabRate ?? 60);
  const [labMin, setLabMin] = useState(props.defaultLabMin ?? 70);
  const [shipL, setShipL] = useState(props.defaultShipL ?? 35);
  const [goodwill, setGoodwill] = useState(props.defaultGoodwill ?? 40);

  const modelData: Record<CostMode, { per: string; fields: FieldDef[] }> = {
    klinik: {
      per: localizedProp(props.clinicModeSummary, props.clinicModeSummaryEn, "KLİNİK", "CLINIC"),
      fields: [
        {
          id: "chairRate",
          ...localizedFieldLabel(props.chairRateLabel, props.chairRateLabelEn, 'Hekim + koltuk maliyeti <span class="hint">· işletme gideri, $/saat</span>', 'Doctor + chair cost <span class="hint">· operating cost, $/hr</span>'),
          min: 150, max: 700, step: 25, val: chairRate, color: "#E2492F", kind: "rate",
        },
        {
          id: "chairMin",
          ...localizedFieldLabel(props.chairMinLabel, props.chairMinLabelEn, 'Bir tekrara harcanan süre <span class="hint">· prep + ölçü + yapıştırma, dk</span>', 'Time spent per remake <span class="hint">· prep + scan + cementation, min</span>'),
          min: 20, max: 120, step: 5, val: chairMin, color: "#E2492F", kind: "min", pairsWith: "chairRate",
        },
        {
          id: "units",
          ...localizedFieldLabel(props.unitsLabel, props.unitsLabelEn, 'İşteki ünite sayısı <span class="hint">· birim</span>', 'Units per case <span class="hint">· units</span>'),
          min: 1, max: 6, step: 1, val: units, color: "#7C9C36", kind: "mult",
        },
        {
          id: "labFee",
          ...localizedFieldLabel(props.labFeeLabel, props.labFeeLabelEn, 'Yeniden lab ücreti <span class="hint">· ünite başına, $</span>', 'Remake lab fee <span class="hint">· per unit, $</span>'),
          min: 0, max: 400, step: 10, val: labFee, color: "#7C9C36", kind: "perUnit",
        },
        {
          id: "ship",
          ...localizedFieldLabel(props.shipLabel, props.shipLabelEn, 'Kargo / lojistik <span class="hint">· gidiş-dönüş, $</span>', 'Shipping / logistics <span class="hint">· round-trip, $</span>'),
          min: 0, max: 120, step: 5, val: ship, color: "#B7B7AE", kind: "flat",
        },
        {
          id: "misc",
          ...localizedFieldLabel(props.miscLabel, props.miscLabelEn, 'İskonto / jest / israf <span class="hint">· $</span>', 'Discount / goodwill / waste <span class="hint">· $</span>'),
          min: 0, max: 200, step: 5, val: misc, color: "#B7B7AE", kind: "flat",
        },
      ],
    },
    lab: {
      per: localizedProp(props.labModeSummary, props.labModeSummaryEn, "LAB", "LAB"),
      fields: [
        {
          id: "matUnit",
          ...localizedFieldLabel(props.matUnitLabel, props.matUnitLabelEn, 'Yeniden üretim malzemesi <span class="hint">· reçine/disk, $/birim</span>', 'Remake material <span class="hint">· resin/disc, per unit $</span>'),
          min: 0, max: 200, step: 5, val: matUnit, color: "#E2492F", kind: "perUnit",
        },
        {
          id: "unitsL",
          ...localizedFieldLabel(props.unitsLLabel, props.unitsLLabelEn, 'İşteki ünite sayısı <span class="hint">· birim</span>', 'Units per case <span class="hint">· units</span>'),
          min: 1, max: 12, step: 1, val: unitsL, color: "#7C9C36", kind: "mult",
        },
        {
          id: "labRate",
          ...localizedFieldLabel(props.labRateLabel, props.labRateLabelEn, 'Üretim iş gücü <span class="hint">· baskı+kürleme+QC, $/saat</span>', 'Production labor <span class="hint">· print+curing+QC, $/hr</span>'),
          min: 20, max: 200, step: 10, val: labRate, color: "#E2492F", kind: "rate",
        },
        {
          id: "labMin",
          ...localizedFieldLabel(props.labMinLabel, props.labMinLabelEn, 'Yeniden üretim süresi <span class="hint">· dk</span>', 'Remake production time <span class="hint">· min</span>'),
          min: 10, max: 180, step: 10, val: labMin, color: "#E2492F", kind: "min", pairsWith: "labRate",
        },
        {
          id: "shipL",
          ...localizedFieldLabel(props.shipLLabel, props.shipLLabelEn, 'Kargo (iki yön) <span class="hint">· $</span>', 'Shipping (two-way) <span class="hint">· $</span>'),
          min: 0, max: 150, step: 5, val: shipL, color: "#B7B7AE", kind: "flat",
        },
        {
          id: "goodwill",
          ...localizedFieldLabel(props.goodwillLabel, props.goodwillLabelEn, 'İskonto / müşteri jesti <span class="hint">· $</span>', 'Discount / customer goodwill <span class="hint">· $</span>'),
          min: 0, max: 250, step: 10, val: goodwill, color: "#B7B7AE", kind: "flat",
        },
      ],
    },
  };

  const values: Record<string, number> = {
    chairRate,
    chairMin,
    units,
    labFee,
    ship,
    misc,
    matUnit,
    unitsL,
    labRate,
    labMin,
    shipL,
    goodwill,
  };

  const setters: Record<string, (v: number) => void> = {
    chairRate: setChairRate,
    chairMin: setChairMin,
    units: setUnits,
    labFee: setLabFee,
    ship: setShip,
    misc: setMisc,
    matUnit: setMatUnit,
    unitsL: setUnitsL,
    labRate: setLabRate,
    labMin: setLabMin,
    shipL: setShipL,
    goodwill: setGoodwill,
  };

  const { parts, total } = useMemo(() => {
    let pList: { n: string; v: number; c: string }[] = [];
    if (mode === "klinik") {
      const chair = (chairRate * chairMin) / 60;
      const production = labFee * units;
      const logi = ship + misc;
      pList = [
        {
          n: localizedProp(props.clinicChairTimePartLabel, props.clinicChairTimePartLabelEn, "Koltuk süresi", "Chair time"),
          v: chair,
          c: "#E2492F",
        },
        {
          n: localizedProp(props.clinicProductionPartLabel, props.clinicProductionPartLabelEn, "Yeniden üretim", "Remake production"),
          v: production,
          c: "#7C9C36",
        },
        {
          n: localizedProp(props.clinicLogisticsPartLabel, props.clinicLogisticsPartLabelEn, "Lojistik + diğer", "Logistics + other"),
          v: logi,
          c: "#B7B7AE",
        },
      ];
    } else {
      const prod = matUnit * unitsL + (labRate * labMin) / 60;
      const logi = shipL + goodwill;
      pList = [
        {
          n: localizedProp(props.labProductionPartLabel, props.labProductionPartLabelEn, "Üretim (malzeme+işçilik)", "Production (material+labor)"),
          v: prod,
          c: "#E2492F",
        },
        {
          n: localizedProp(props.labShippingPartLabel, props.labShippingPartLabelEn, "Kargo + jest", "Shipping + goodwill"),
          v: logi,
          c: "#B7B7AE",
        },
      ];
    }
    const tot = pList.reduce((sum, item) => sum + item.v, 0);
    return { parts: pList, total: tot };
  }, [
    mode,
    chairRate,
    chairMin,
    units,
    labFee,
    ship,
    misc,
    matUnit,
    unitsL,
    labRate,
    labMin,
    shipL,
    goodwill,
    props.clinicChairTimePartLabel,
    props.clinicChairTimePartLabelEn,
    props.clinicProductionPartLabel,
    props.clinicProductionPartLabelEn,
    props.clinicLogisticsPartLabel,
    props.clinicLogisticsPartLabelEn,
    props.labProductionPartLabel,
    props.labProductionPartLabelEn,
    props.labShippingPartLabel,
    props.labShippingPartLabelEn,
  ]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // NOTE: _remakeTotal is typed in src/types/globals.d.ts (inter-component communication).
      window._remakeTotal = Math.round(total);
    }
  }, [total]);

  const handleUseBtn = (event: Event) => {
    setSaved(true);
    // FIX: force a real, full-page navigation instead of letting the
    // storefront's SPA router (Router.navigate / anchor click intercept)
    // soft-navigate. A soft navigation can leave ThreeMashHero mounted
    // from before, so its own mount-once URL read never re-runs and the
    // imported mode/cost never show up on the homepage.
    event.preventDefault();
    if (typeof window !== "undefined") {
      window.location.href = homeHref;
    }
  };

  const homeMode = mode === "lab" ? "lab" : "clinic";
  const homeHref = localizedHref(`/?rc=${Math.round(total)}&mode=${homeMode}`);
  const baseHomeUrl = localizedHref(safeNavigationHref(props.useButtonHref?.trim() || "/", "/"));
  const calculatorUrl = localizedHref(`${baseHomeUrl.split("#")[0] || "/"}#hesap`);

  const d = modelData[mode];

  // FIX: the six sliders here never got the imperative DOM sync that Hero's
  // three sliders have — and Hero's version was itself incomplete, since it
  // only wrote `value` and the gradient. min/max/step matter most: after a
  // hydration mismatch the DOM node still carries the OTHER mode's range, so
  // the browser clamps every value it's handed and all thumbs jump. Write the
  // range first, then the value, then the gradient — every render.
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useLayoutEffect(() => {
    d.fields.forEach((f) => {
      const el = inputRefs.current[f.id];
      if (!el) return;

      const val = values[f.id];
      const nextMin = String(f.min);
      const nextMax = String(f.max);
      const nextStep = String(f.step);
      if (el.min !== nextMin) el.min = nextMin;
      if (el.max !== nextMax) el.max = nextMax;
      if (el.step !== nextStep) el.step = nextStep;

      const nextValue = String(val);
      if (el.value !== nextValue) el.value = nextValue;

      const p = rangeProgress(val, f.min, f.max);
      el.style.setProperty("--p", p);
      el.style.background = `linear-gradient(90deg, var(--lime, #C7F136) ${p}, #e8e8e1 ${p})`;
    });
  });

  const customStyle = {
    "--bg": props.backgroundColor || "#FAFAF7",
    "--ink": props.textColor || "#0E0E0C",
    "--sub": props.mutedTextColor || "#55554E",
    "--lime": props.accentColor || "#C7F136",
    "--line": props.lineColor || "#E6E6E0",
  } as any; // CSS-in-JS: dynamic properties use CSS custom variable names

  const showHero = props.showHero !== false;
  const showCalculator = props.showCalculator !== false;
  const showExplanation = props.showExplanation !== false;
  const showFirstStudy = props.showFirstStudy !== false;
  const showSecondStudy = props.showSecondStudy !== false;
  const showCallout = props.showCallout !== false;
  const showSourceNotes = props.showSourceNotes !== false;
  const showSavedMessage = props.showSavedMessage !== false;
  const showResearchColumn =
    showExplanation || showFirstStudy || showSecondStudy || showCallout || showSourceNotes;
  const singleColumn = showCalculator !== showResearchColumn;
  const currencySymbol = props.currencySymbol?.trim() || "$";

  return (
    <div className="three-mash-cost-detail-page" style={customStyle}>
      {showHero && (
        <div className="top">
          <div className="wrap">
            <div className="crumb">
              <a href={baseHomeUrl}>
                {localizedProp(props.breadcrumbHomeText, props.breadcrumbHomeTextEn, "Ana sayfa", "Home")}
              </a>{" "}
              &nbsp;/&nbsp;{" "}
              <a href={calculatorUrl}>
                {localizedProp(props.breadcrumbParentText, props.breadcrumbParentTextEn, "Tasarruf hesaplayıcı", "Savings calculator")}
              </a>{" "}
              &nbsp;/&nbsp;{" "}
              {localizedProp(props.breadcrumbCurrentText, props.breadcrumbCurrentTextEn, "Bir tekrarın maliyeti", "Cost of a remake")}
            </div>
            <h1
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(
                  localizedProp(
                    props.heroTitle,
                    props.heroTitleEn,
                    'Bir tekrarın gerçek maliyeti neden<br><span class="em">~500 dolar?</span>',
                    'Why does a remake really cost<br><span class="em">~$500?</span>',
                  ),
                ),
              }}
            />
            <p
              className="answer"
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(
                  localizedProp(
                    props.heroAnswer,
                    props.heroAnswerEn,
                    'Çünkü bir remake\'in maliyeti <b>lab ücretinden ibaret değildir.</b> Asıl yükü <span class="k">koltuk süresi</span> oluşturur — yeniden prep, yeniden ölçü/tarama ve yeniden yapıştırma randevusu. Ulusal ölçekli klinik veriler tekrar oranını ortalama <b>%3,8</b>, ama hekimden hekime <b>%0–42</b> aralığında gösteriyor. Aşağıda kendi kalemlerinizle gerçek rakamınızı çıkarabilirsiniz.',
                    'Short answer: because the cost of a remake is not just the lab fee. The primary burden is <span class="k">chair time</span> — appointments for re-prep, re-impression/scan, and re-cementation. National clinical data shows an average remake rate of <b>3.8%</b>, ranging from <b>0%–42%</b> across practitioners. Calculate your own figure below item by item.',
                  ),
                ),
              }}
            />
          </div>
        </div>
      )}

      <div className={`wrap cols${singleColumn ? " single" : ""}`}>
        {/* SOL: hesaplayıcı (sticky) */}
        {showCalculator && (
        <div className="calc">
          <div className="h">
            <span className="micro">
              {localizedProp(props.calculatorKicker, props.calculatorKickerEn, "TEKRAR MALİYETİ · KALEM KALEM", "REMAKE COST · ITEM BY ITEM")}
            </span>
            <span className="micro" id="perLabel">
              {d.per}
            </span>
          </div>
          <div className="seg" id="seg">
            <button
              ref={klinikBtnRef}
              className={mode === "klinik" ? "on" : ""}
              style={mode === "klinik" ? segActiveStyle : segInactiveStyle}
              type="button"
              onClick={() => setMode("klinik")}
            >
              {localizedProp(props.clinicModeButton, props.clinicModeButtonEn, "Klinik", "Clinic")}
            </button>
            <button
              ref={labBtnRef}
              className={mode === "lab" ? "on" : ""}
              style={mode === "lab" ? segActiveStyle : segInactiveStyle}
              type="button"
              onClick={() => setMode("lab")}
            >
              {localizedProp(props.labModeButton, props.labModeButtonEn, "Laboratuvar", "Lab")}
            </button>
          </div>

          <div id="fields">
            {d.fields.map((f) => {
              const val = values[f.id];
              let valText = fmt(val, currencySymbol);
              if (f.kind === "rate") {
                valText =
                  fmt(val, currencySymbol) +
                  localizedProp(props.rateUnitSuffix, props.rateUnitSuffixEn, "/sa", "/hr");
              } else if (f.kind === "min") {
                valText =
                  val +
                  localizedProp(props.timeUnitSuffix, props.timeUnitSuffixEn, " dk", " min");
              } else if (f.kind === "mult") {
                valText =
                  val +
                  localizedProp(props.countUnitSuffix, props.countUnitSuffixEn, "-ünite", "unit");
              }

              return (
                <div className="li" key={`${mode}-${f.id}`}>
                  <div className="lab">
                    <span
                      dangerouslySetInnerHTML={{ __html: sanitizeHtml(f.labelHtml) }}
                    />
                    <b id={`lb_${f.id}`}>{valText}</b>
                  </div>
                  {/* NOTE: style with custom CSS property --p for range progress visualization */}
                  <input
                    ref={(el) => {
                      inputRefs.current[f.id] = (el as HTMLInputElement) || null;
                    }}
                    type="range"
                    id={f.id}
                    min={f.min}
                    max={f.max}
                    step={f.step}
                    value={val}
                    style={
                      {
                        "--p": rangeProgress(val, f.min, f.max),
                        background: `linear-gradient(90deg, var(--lime, #C7F136) ${rangeProgress(val, f.min, f.max)}, #e8e8e1 ${rangeProgress(val, f.min, f.max)})`,
                      } as any
                    }
                    onInput={(e) => {
                      const setter = setters[f.id];
                      if (setter) setter(Number((e.currentTarget as HTMLInputElement).value));
                    }}
                    aria-label={f.label}
                  />
                </div>
              );
            })}
          </div>

          <div className="bar" id="bar">
            {parts.map((p) => (
              <span
                key={p.n}
                style={{
                  width: `${total ? (p.v / total) * 100 : 0}%`,
                  background: p.c,
                }}
              />
            ))}
          </div>

          <div className="legend" id="legend">
            {parts.map((p) => (
              <div key={p.n}>
                <i style={{ background: p.c }} />
                {p.n} · <b style={{ fontFamily: "'Space Grotesk'" }}>{fmt(p.v, currencySymbol)}</b>
              </div>
            ))}
          </div>

          <div className="tot">
            <span className="micro">
              {localizedProp(props.totalCostLabel, props.totalCostLabelEn, "BİR TEKRARIN TOPLAM MALİYETİ", "TOTAL COST PER REMAKE")}
            </span>
            <span className="v" id="total">
              {fmt(total, currencySymbol)}
            </span>
          </div>

          <div className="use">
            <a className="btn lime" id="useBtn" href={homeHref} onClick={handleUseBtn}>
              {localizedProp(props.useButtonText, props.useButtonTextEn, "Bu değeri ana sayfada kullan →", "Use this value on homepage →")}
            </a>
          </div>

          {saved && showSavedMessage && (
            <div className="saved" id="saved">
              {localizedProp(props.savedMessage, props.savedMessageEn, "✓ Değer kaydedildi — ana sayfadaki hesaplayıcıya taşındı.", "✓ Value saved — transferred to homepage calculator.")}
            </div>
          )}
        </div>
        )}

        {/* SAĞ: açıklama + bilim */}
        {showResearchColumn && (
        <div className="explain">
          {showExplanation && (
            <>
              <h2>
                {localizedProp(
                  props.explanationTitle,
                  props.explanationTitleEn,
                  "Maliyet nereden geliyor?",
                  "Where does the cost come from?",
                )}
              </h2>
              <div
                className="explanation-body"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(
                    localizedProp(
                      props.explanationBody,
                      props.explanationBodyEn,
                      '<p>Sektördeki yaygın yanılgı, bir tekrarın maliyetini yalnızca <b>yeniden lab ücreti</b> olarak görmektir. Oysa bir kron reddedildiğinde asıl kaybı yaratan üç kalem vardır ve en büyüğü ilk sırada:</p><p><b>1. Koltuk süresi (en büyük kalem).</b> Hastayı geri çağırmak, yeniden prep/ölçü almak ve yeni işi yapıştırmak ortalama 45–75 dakika alır. Bir kliniğin ortalama işletme gideri saatte <b>~$375</b> olarak modellenir; bu tek başına $280–470 demektir.</p><p><b>2. Yeniden üretim + lojistik.</b> Yeni birimin lab ücreti, iki yönlü kargo ve varsa acele (rush) farkı.</p><p><b>3. Görünmeyenler.</b> İskonto/jest, boşa giden randevu slotu, malzeme israfı ve hasta güveninde aşınma.</p>',
                      '<p>A common misconception in the industry is that the cost of a remake is measured only by the <b>re-lab fee</b>. Yet when a crown is rejected, there are three real cost items behind the loss — and the biggest one comes first:</p><p><b>1. Chair time (the largest line item).</b> Recalling the patient, re-prepping/taking a new impression, and cementing the new work takes 45–75 minutes on average. A clinic\'s average operating cost per hour is modeled at <b>~$375</b>; this alone means $280–470.</p><p><b>2. Remanufacturing + logistics.</b> The new unit\'s lab fee, two-way shipping, and any rush surcharge, if applicable.</p><p><b>3. The invisibles.</b> Discounts/favors, wasted appointment slots, material waste, and patient trust erosion.</p>',
                    ),
                  ),
                }}
              />
            </>
          )}

          {showFirstStudy && (
          <div
            className="study"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(
                localizedProp(
                  props.studyOneContent,
                  props.studyOneContentEn,
                  DEFAULT_STUDY_ONE_TR,
                  DEFAULT_STUDY_ONE_EN,
                ),
              ),
            }}
          />
          )}

          {showSecondStudy && (
          <div
            className="study"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(
                localizedProp(
                  props.studyTwoContent,
                  props.studyTwoContentEn,
                  DEFAULT_STUDY_TWO_TR,
                  DEFAULT_STUDY_TWO_EN,
                ),
              ),
            }}
          />
          )}

          {showCallout && (
            <div
              className="callout"
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(
                  localizedProp(
                    props.calloutContent,
                    props.calloutContentEn,
                    DEFAULT_CALLOUT_TR,
                    DEFAULT_CALLOUT_EN,
                  ),
                ),
              }}
            />
          )}

          {showSourceNotes && (
            <p
              className="mini-src"
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(
                  localizedProp(
                    props.sourceNotes,
                    props.sourceNotesEn,
                    DEFAULT_SOURCE_NOTES_TR,
                    DEFAULT_SOURCE_NOTES_EN,
                  ),
                ),
              }}
            />
          )}
        </div>
        )}
      </div>
    </div>
  );
}

export default ThreeMashCostDetailPage;
