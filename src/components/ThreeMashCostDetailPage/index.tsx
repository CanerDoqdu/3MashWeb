import { useEffect, useMemo, useState } from "preact/hooks";
import { Props } from "./types";
import { isEnglishLocale, tLocalized, tProp } from "../../utils/i18n";

type CostMode = "klinik" | "lab";

type FieldDef = {
  id: string;
  label: string;
  hint: string;
  min: number;
  max: number;
  step: number;
  val: number;
  color: string;
  kind: "rate" | "min" | "mult" | "perUnit" | "flat";
  pairsWith?: string;
};

const STORAGE_KEY = "mash_cost_detail_state";
const fmt = (n: number) => "$" + Math.round(n).toLocaleString("tr-TR");

function rangeProgress(val: number, min: number, max: number) {
  if (max <= min) return "0%";
  return `${Math.min(100, Math.max(0, ((val - min) / (max - min)) * 100))}%`;
}

export function ThreeMashCostDetailPage(props: Props) {
  const [mode, setMode] = useState<CostMode>("klinik");
  const [saved, setSaved] = useState(false);
  const [initialized, setInitialized] = useState(false);

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

  // Load persisted state from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (data.mode === "klinik" || data.mode === "lab") {
          setMode(data.mode);
        }
        if (data.values) {
          if (typeof data.values.chairRate === "number") setChairRate(data.values.chairRate);
          if (typeof data.values.chairMin === "number") setChairMin(data.values.chairMin);
          if (typeof data.values.units === "number") setUnits(data.values.units);
          if (typeof data.values.labFee === "number") setLabFee(data.values.labFee);
          if (typeof data.values.ship === "number") setShip(data.values.ship);
          if (typeof data.values.misc === "number") setMisc(data.values.misc);
          if (typeof data.values.matUnit === "number") setMatUnit(data.values.matUnit);
          if (typeof data.values.unitsL === "number") setUnitsL(data.values.unitsL);
          if (typeof data.values.labRate === "number") setLabRate(data.values.labRate);
          if (typeof data.values.labMin === "number") setLabMin(data.values.labMin);
          if (typeof data.values.shipL === "number") setShipL(data.values.shipL);
          if (typeof data.values.goodwill === "number") setGoodwill(data.values.goodwill);
        }
      }
    } catch (_) {}
    setInitialized(true);
  }, []);

  // Save state to localStorage whenever any value or mode changes
  useEffect(() => {
    if (!initialized) return;
    try {
      const stateObj = {
        mode,
        values: {
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
        },
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateObj));
    } catch (_) {}
  }, [
    initialized,
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
  ]);

  const modelData: Record<CostMode, { per: string; fields: FieldDef[] }> = {
    klinik: {
      per: tLocalized("KLİNİK", "CLINIC"),
      fields: [
        { id: "chairRate", label: tLocalized("Hekim + koltuk maliyeti", "Doctor + chair cost"), hint: tLocalized("işletme gideri, $/saat", "operating cost, $/hr"), min: 150, max: 700, step: 25, val: chairRate, color: "#E2492F", kind: "rate" },
        { id: "chairMin", label: tLocalized("Bir tekrara harcanan süre", "Time spent per remake"), hint: tLocalized("prep + ölçü + yapıştırma, dk", "prep + scan + cementation, min"), min: 20, max: 120, step: 5, val: chairMin, color: "#E2492F", kind: "min", pairsWith: "chairRate" },
        { id: "units", label: tLocalized("İşteki ünite sayısı", "Units per case"), hint: tLocalized("birim", "units"), min: 1, max: 6, step: 1, val: units, color: "#7C9C36", kind: "mult" },
        { id: "labFee", label: tLocalized("Yeniden lab ücreti", "Remake lab fee"), hint: tLocalized("ünite başına, $", "per unit, $"), min: 0, max: 400, step: 10, val: labFee, color: "#7C9C36", kind: "perUnit" },
        { id: "ship", label: tLocalized("Kargo / lojistik", "Shipping / logistics"), hint: tLocalized("gidiş-dönüş, $", "round-trip, $"), min: 0, max: 120, step: 5, val: ship, color: "#B7B7AE", kind: "flat" },
        { id: "misc", label: tLocalized("İskonto / jest / israf", "Discount / goodwill / waste"), hint: "$", min: 0, max: 200, step: 5, val: misc, color: "#B7B7AE", kind: "flat" },
      ],
    },
    lab: {
      per: tLocalized("LAB", "LAB"),
      fields: [
        { id: "matUnit", label: tLocalized("Yeniden üretim malzemesi", "Remake material"), hint: tLocalized("reçine/disk, $/birim", "resin/disc, per unit $"), min: 0, max: 200, step: 5, val: matUnit, color: "#E2492F", kind: "perUnit" },
        { id: "unitsL", label: tLocalized("İşteki ünite sayısı", "Units per case"), hint: tLocalized("birim", "units"), min: 1, max: 12, step: 1, val: unitsL, color: "#7C9C36", kind: "mult" },
        { id: "labRate", label: tLocalized("Üretim iş gücü", "Production labor"), hint: tLocalized("baskı+kürleme+QC, $/saat", "print+curing+QC, $/hr"), min: 20, max: 200, step: 10, val: labRate, color: "#E2492F", kind: "rate" },
        { id: "labMin", label: tLocalized("Yeniden üretim süresi", "Remake production time"), hint: tLocalized("dk", "min"), min: 10, max: 180, step: 10, val: labMin, color: "#E2492F", kind: "min", pairsWith: "labRate" },
        { id: "shipL", label: tLocalized("Kargo (iki yön)", "Shipping (two-way)"), hint: "$", min: 0, max: 150, step: 5, val: shipL, color: "#B7B7AE", kind: "flat" },
        { id: "goodwill", label: tLocalized("İskonto / müşteri jesti", "Discount / customer goodwill"), hint: "$", min: 0, max: 250, step: 10, val: goodwill, color: "#B7B7AE", kind: "flat" },
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
        { n: tLocalized("Koltuk süresi", "Chair time"), v: chair, c: "#E2492F" },
        { n: tLocalized("Yeniden üretim", "Remake production"), v: production, c: "#7C9C36" },
        { n: tLocalized("Lojistik + diğer", "Logistics + other"), v: logi, c: "#B7B7AE" },
      ];
    } else {
      const prod = matUnit * unitsL + (labRate * labMin) / 60;
      const logi = shipL + goodwill;
      pList = [
        { n: tLocalized(tLocalized("Üretim (malzeme+işçilik)", "Production (material+labor)"), "Production (material+labor)"), v: prod, c: "#E2492F" },
        { n: tLocalized("Kargo + jest", "Shipping + goodwill"), v: logi, c: "#B7B7AE" },
      ];
    }
    const tot = pList.reduce((sum, item) => sum + item.v, 0);
    return { parts: pList, total: tot };
  }, [mode, chairRate, chairMin, units, labFee, ship, misc, matUnit, unitsL, labRate, labMin, shipL, goodwill]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any)._remakeTotal = Math.round(total);
    }
  }, [total]);

  const handleUseBtn = () => {
    const rounded = Math.round(total);
    if (typeof window !== "undefined") {
      (window as any)._remakeTotal = rounded;
      try {
        localStorage.setItem("mash_remake_cost", String(rounded));
        localStorage.setItem(
          "mash_calculator_mode",
          mode === "lab" ? "lab" : "clinic",
        );
      } catch (_) {}
      setSaved(true);
    }
  };

  const baseHomeUrl = props.useButtonHref || "/";
  const homeMode = mode === "lab" ? "lab" : "clinic";
  const homeHref = baseHomeUrl.includes("?")
    ? `${baseHomeUrl}&rc=${Math.round(total)}&mode=${homeMode}#hesap`
    : `${baseHomeUrl}?rc=${Math.round(total)}&mode=${homeMode}#hesap`;

  const d = modelData[mode];

  const customStyle = {
    "--bg": props.backgroundColor || "#FAFAF7",
    "--ink": props.textColor || "#0E0E0C",
    "--sub": props.mutedTextColor || "#55554E",
    "--lime": props.accentColor || "#C7F136",
    "--line": props.lineColor || "#E6E6E0",
  } as any;

  return (
    <div className="three-mash-cost-detail-page" style={customStyle}>
      <div className="top">
        <div className="wrap">
          <div className="crumb">
            <a href={props.useButtonHref || "/"}>
              {props.breadcrumbHomeText || tLocalized("Ana sayfa", "Home")}
            </a>{" "}
            &nbsp;/&nbsp;{" "}
            <a href={(props.useButtonHref || "/") + "#hesap"}>
              {props.breadcrumbParentText || tLocalized("Tasarruf hesaplayıcı", "Savings calculator")}
            </a>{" "}
            &nbsp;/&nbsp; {props.breadcrumbCurrentText || tLocalized("Bir tekrarın maliyeti", "Cost of a remake")}
          </div>
          {props.heroTitle ? (
            <h1 dangerouslySetInnerHTML={{ __html: props.heroTitle }} />
          ) : (
            <h1>
              {tLocalized("Bir tekrarın gerçek maliyeti neden", "Why does a remake really cost")}<br /><span className="em">{tLocalized("~500 dolar?", "~$500?")}</span>
            </h1>
          )}
          {props.heroAnswer ? (
            <p className="answer" dangerouslySetInnerHTML={{ __html: props.heroAnswer }} />
          ) : (
            <p className="answer">
              {tLocalized(
                "Kısa cevap: çünkü bir remake'in maliyeti lab ücretinden ibaret değildir. Asıl yükü koltuk süresi oluşturur — yeniden prep, yeniden ölçü/tarama ve yeniden yapıştırma randevusu. Ulusal ölçekli klinik veriler tekrar oranını ortalama %3,8, ama hekimden hekime %0–42 aralığında gösteriyor. Aşağıda kendi kalemlerinizle gerçek rakamınızı çıkarabilirsiniz.",
                "Short answer: because the cost of a remake is not just the lab fee. The primary burden is chair time — appointments for re-prep, re-impression/scan, and re-cementation. National clinical data shows an average remake rate of 3.8%, ranging from 0% to 42% across practitioners. Calculate your own figure below item by item."
              )}
            </p>
          )}
        </div>
      </div>

      <div className="wrap cols">
        {/* SOL: hesaplayıcı (sticky) */}
        <div className="calc">
          <div className="h">
            <span className="micro">{tLocalized("TEKRAR MALİYETİ · KALEM KALEM", "REMAKE COST · ITEM BY ITEM")}</span>
            <span className="micro" id="perLabel">
              {d.per}
            </span>
          </div>
          <div className="seg" id="seg">
            <button
              className={mode === "klinik" ? "on" : ""}
              type="button"
              onClick={() => setMode("klinik")}
            >
              {tLocalized("Klinik", "Clinic")}
            </button>
            <button
              className={mode === "lab" ? "on" : ""}
              type="button"
              onClick={() => setMode("lab")}
            >
              {tLocalized("Laboratuvar", "Lab")}
            </button>
          </div>

          <div id="fields">
            {d.fields.map((f) => {
              const val = values[f.id];
              let valText = fmt(val);
              if (f.kind === "rate") valText = fmt(val) + (isEnglishLocale() ? "/hr" : "/sa");
              else if (f.kind === "min") valText = val + (isEnglishLocale() ? " min" : " dk");
              else if (f.kind === "mult") valText = val + (isEnglishLocale() ? " unit" : " ünite");

              return (
                <div className="li" key={f.id}>
                  <div className="lab">
                    <span>
                      {f.label} <span className="hint">· {f.hint}</span>
                    </span>
                    <b id={`lb_${f.id}`}>{valText}</b>
                  </div>
                  <input
                    type="range"
                    id={f.id}
                    min={f.min}
                    max={f.max}
                    step={f.step}
                    value={val}
                    style={{ "--p": rangeProgress(val, f.min, f.max) } as any}
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
                {p.n} · <b style={{ fontFamily: "'Space Grotesk'" }}>{fmt(p.v)}</b>
              </div>
            ))}
          </div>

          <div className="tot">
            <span className="micro">{tLocalized("BİR TEKRARIN TOPLAM MALİYETİ", "TOTAL COST PER REMAKE")}</span>
            <span className="v" id="total">
              {fmt(total)}
            </span>
          </div>

          <div className="use">
            <a className="btn lime" id="useBtn" href={homeHref} onClick={handleUseBtn}>
              {props.useButtonText || tLocalized("Bu değeri ana sayfada kullan →", "Use this value on homepage →")}
            </a>
          </div>

          {saved && (
            <div className="saved" id="saved">
              {tLocalized("✓ Değer kaydedildi — ana sayfadaki hesaplayıcıya taşındı.", "✓ Value saved — transferred to homepage calculator.")}
            </div>
          )}
        </div>

        {/* SAĞ: açıklama + bilim */}
        <div className="explain">
          <h2>Maliyet nereden geliyor?</h2>
          <p>
            Sektördeki yaygın yanılgı, bir tekrarın maliyetini yalnızca <b>yeniden lab ücreti</b> olarak görmektir.
            Oysa bir kron reddedildiğinde asıl kaybı yaratan üç kalem vardır ve en büyüğü ilk sırada:
          </p>
          <p>
            <b>1. Koltuk süresi (en büyük kalem).</b> Hastayı geri çağırmak, yeniden prep/ölçü almak ve yeni işi
            yapıştırmak ortalama 45–75 dakika alır. Bir kliniğin ortalama işletme gideri saatte <b>~$375</b> olarak
            modellenir; bu tek başına $280–470 demektir.
          </p>
          <p>
            <b>2. Yeniden üretim + lojistik.</b> Yeni birimin lab ücreti, iki yönlü kargo ve varsa acele (rush)
            farkı.
          </p>
          <p>
            <b>3. Görünmeyenler.</b> İskonto/jest, boşa giden randevu slotu, malzeme israfı ve hasta güveninde
            aşınma.
          </p>

          <div className="study">
            <span className="tag">HAKEMLİ KLİNİK VERİ</span>
            <h3>Tekrar oranı gerçekte ne kadar? Ulusal PBRN, 3.750 kron üzerinde ölçtü.</h3>
            <div className="meta">
              McCracken M.S. ve ark. (National Dental PBRN Collaborative Group) · <i>Journal of Prosthodontics</i>,
              2019;28(2):122–130
            </div>
            <ul>
              <li>
                <b>205 diş hekimi</b>, gerçek klinik pratiğinde <b>3.750 tek-ünite kron</b> değerlendirdi.
              </li>
              <li>
                Ortalama tekrar (remake) oranı <b>%3,8</b> — fakat hekimden hekime <b>%0 ile %42</b> arasında
                değişiyor.
              </li>
              <li>
                Hekimlerin %58'i hiç kron reddetmezken, tüm reddetmeler %42'lik gruptan geldi — yani sorun{" "}
                <b>tekil, çözülebilir</b> bir uygulama farkı.
              </li>
              <li>
                En sık ret sebepleri: <b>proksimal uyumsuzluk, marjinal hatalar ve estetik başarısızlık</b> — üçü de
                doğrudan <b>ölçüsel hassasiyet</b> problemi.
              </li>
            </ul>
            <a className="link" href="https://doi.org/10.1111/jopr.12995" target="_blank" rel="noopener noreferrer">
              DOI: 10.1111/jopr.12995 · Kaynağı aç →
            </a>
          </div>

          <div className="study">
            <span className="tag">HAKEMLİ · ÖLÇÜSEL DOĞRULUK</span>
            <h3>Peki sapma neden oluşuyor? Doğruluk, kullanılan sisteme göre uçtan uca değişiyor.</h3>
            <div className="meta">
              Etemad-Shahidi Y. ve ark. · <i>J Clin Med</i> 2020 (sistematik derleme) &nbsp;·&nbsp; Németh A. ve ark.
              · <i>J Dentistry</i> 2023 (ağ meta-analizi)
            </div>
            <ul>
              <li>
                Sistematik derlemede full-arch model doğruluğu en iyi sistemde <b>3,3 µm</b>'ye inerken, bazı
                cihazlarda <b>130–190 µm</b>'ye çıkıyor — yani doğru sonucu cihaz ve parametre belirliyor.
              </li>
              <li>
                Ağ meta-analizi <b>SLA, DLP ve PolyJet</b>'i en doğru teknolojiler olarak gösteriyor (SLA ~
                <b>86,7 µm</b>, DLP ~<b>97,9 µm</b> ortalama trueness).
              </li>
              <li>
                Yani sapma tesadüf değil, yönetilebilir bir değişken. <b>3mash bu değişkenleri birlikte kalibre ederek ±20 µm'yi her baskıda</b>{" "}
                sabitler; tekrar oranı ve maliyet de bu sayede düşer.
              </li>
            </ul>
            <a className="link" href="https://doi.org/10.3390/jcm9103357" target="_blank" rel="noopener noreferrer">
              DOI: 10.3390/jcm9103357 →
            </a>
            &nbsp;&nbsp;
            <a
              className="link"
              href="https://doi.org/10.1016/j.jdent.2023.104532"
              target="_blank"
              rel="noopener noreferrer"
            >
              DOI: 10.1016/j.jdent.2023.104532 →
            </a>
          </div>

          <div className="callout">
            <p>
              <b>3mash bağlantısı:</b> çalışmanın işaret ettiği üç sebep de (proksimal uyum, marjin, estetik){" "}
              <b>±20 µm tekrar edilebilir hassasiyetle</b> doğrudan azalır. Tekrar oranınızı %42'lerden ya da
              %10'lardan <b>≤%3'e</b> çektiğinizde, yukarıdaki kalem-kalem maliyet aynı oranda düşer.
            </p>
          </div>

          <p className="mini-src">
            Kaynaklar: Tekrar oranı ve ret sebepleri — McCracken ve ark.,{" "}
            <a href="https://doi.org/10.1111/jopr.12995" target="_blank" rel="noopener noreferrer">
              J Prosthodont 2019 (10.1111/jopr.12995)
            </a>
            . Ölçüsel doğruluk — Etemad-Shahidi ve ark.,{" "}
            <a href="https://doi.org/10.3390/jcm9103357" target="_blank" rel="noopener noreferrer">
              J Clin Med 2020 (10.3390/jcm9103357)
            </a>{" "}
            ve Németh ve ark.,{" "}
            <a href="https://doi.org/10.1016/j.jdent.2023.104532" target="_blank" rel="noopener noreferrer">
              J Dentistry 2023 (10.1016/j.jdent.2023.104532)
            </a>
            . Maliyet modeli (koltuk süresi/işletme gideri) — Spear Education, “The Cost of Laboratory Remakes.”
            Rakamlar tahminî olup iş akışınıza göre değişir.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ThreeMashCostDetailPage;
