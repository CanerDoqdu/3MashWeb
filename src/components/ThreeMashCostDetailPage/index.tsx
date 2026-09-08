import { useEffect, useMemo, useState } from "preact/hooks";
import { Props } from "./types";
import { isEnglishLocale, localizedHref, tLocalized, tProp } from "../../utils/i18n";
import { sanitizeHtml } from "../../utils/sanitizeHtml";
import { safeNavigationHref } from "../../utils/safeRedirect";

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

const fmt = (n: number) => "$" + Math.round(n).toLocaleString("tr-TR");

function rangeProgress(val: number, min: number, max: number) {
  if (max <= min) return "0%";
  return `${Math.min(100, Math.max(0, ((val - min) / (max - min)) * 100))}%`;
}

export function ThreeMashCostDetailPage(props: Props) {
  const [mode, setMode] = useState<CostMode>("klinik");
  const [saved, setSaved] = useState(false);

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
      // NOTE: _remakeTotal is typed in src/types/globals.d.ts (inter-component communication).
      window._remakeTotal = Math.round(total);
    }
  }, [total]);

  const handleUseBtn = () => {
    const rounded = Math.round(total);
    if (typeof window !== "undefined") {
      // NOTE: _remakeTotal is typed in src/types/globals.d.ts (inter-component communication).
      window._remakeTotal = rounded;
      setSaved(true);
    }
  };

  const baseHomeUrl = localizedHref(safeNavigationHref(props.useButtonHref, "/"));
  const calculatorUrl = localizedHref(`${baseHomeUrl}#hesap`);
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
  } as any; // CSS-in-JS: dynamic properties use CSS custom variable names

  return (
    <div className="three-mash-cost-detail-page" style={customStyle}>
      <div className="top">
        <div className="wrap">
          <div className="crumb">
            <a href={baseHomeUrl}>
              {props.breadcrumbHomeText || tLocalized("Ana sayfa", "Home")}
            </a>{" "}
            &nbsp;/&nbsp;{" "}
            <a href={calculatorUrl}>
              {props.breadcrumbParentText || tLocalized("Tasarruf hesaplayıcı", "Savings calculator")}
            </a>{" "}
            &nbsp;/&nbsp; {props.breadcrumbCurrentText || tLocalized("Bir tekrarın maliyeti", "Cost of a remake")}
          </div>
          {props.heroTitle ? (
            <h1 dangerouslySetInnerHTML={{ __html: sanitizeHtml(props.heroTitle) }} />
          ) : (
            <h1>
              {tLocalized("Bir tekrarın gerçek maliyeti neden", "Why does a remake really cost")}<br /><span className="em">{tLocalized("~500 dolar?", "~$500?")}</span>
            </h1>
          )}
          {props.heroAnswer ? (
            <p className="answer" dangerouslySetInnerHTML={{ __html: sanitizeHtml(props.heroAnswer) }} />
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
              else if (f.kind === "mult") valText = val + (isEnglishLocale() ? " unit" : tLocalized("ünite", "unit"));

              return (
                <div className="li" key={f.id}>
                  <div className="lab">
                    <span>
                      {f.label} <span className="hint">· {f.hint}</span>
                    </span>
                    <b id={`lb_${f.id}`}>{valText}</b>
                  </div>
                  {/* NOTE: style with custom CSS property --p for range progress visualization */}
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
          <h2>{tLocalized("Maliyet nereden geliyor?", "Where does the cost come from?")}</h2>
          <p>
            {tLocalized("Sektördeki yaygın yanılgı, bir tekrarın maliyetini yalnızca", "A common misconception in the industry is that the cost of a remake is measured only by")} <b>{tLocalized("yeniden lab ücreti", "re-lab fee")}</b> {tLocalized("olarak görmektir.\r\n            Oysa bir kron reddedildiğinde asıl kaybı yaratan üç kalem vardır ve en büyüğü ilk sırada:", "as.\r\n            Yet when a crown is rejected, there are three real cost items behind the loss — and the biggest one comes first:")}
          </p>
          <p>
            <b>{tLocalized("1. Koltuk süresi (en büyük kalem).", "1. Chair time (the largest line item).")}</b> {tLocalized("Hastayı geri çağırmak, yeniden prep/ölçü almak ve yeni işi\r\n            yapıştırmak ortalama 45–75 dakika alır. Bir kliniğin ortalama işletme gideri saatte", "Recalling the patient, re-prepping/taking a new impression, and\r\n            cementing the new work takes 45–75 minutes on average. A clinic's average operating cost per hour")} <b>~$375</b> {tLocalized("olarak\r\n            modellenir; bu tek başına $280–470 demektir.", "as\r\n            modeled; this alone means $280–470.")}
          </p>
          <p>
            <b>{tLocalized("2. Yeniden üretim + lojistik.", "2. Remanufacturing + logistics.")}</b> {tLocalized("Yeni birimin lab ücreti, iki yönlü kargo ve varsa acele (rush)\r\n            farkı.", "The new unit's lab fee, two-way shipping, and any rush (rush)\r\n            surcharge, if applicable.")}
          </p>
          <p>
            <b>{tLocalized("3. Görünmeyenler.", "3. The invisibles.")}</b> {tLocalized("İskonto/jest, boşa giden randevu slotu, malzeme israfı ve hasta güveninde\r\n            aşınma.", "Discounts/favors, wasted appointment slots, material waste, and patient trust\r\n            erosion.")}
          </p>

          <div className="study">
            <span className="tag">{tLocalized("HAKEMLİ KLİNİK VERİ", "PEER-REVIEWED CLINICAL DATA")}</span>
            <h3>{tLocalized("Tekrar oranı gerçekte ne kadar? Ulusal PBRN, 3.750 kron üzerinde ölçtü.", "What is the remake rate really? The National PBRN measured it across 3,750 crowns.")}</h3>
            <div className="meta">
              {tLocalized("McCracken M.S. ve ark. (National Dental PBRN Collaborative Group) ·", "McCracken M.S. et al. (National Dental PBRN Collaborative Group) ·")} <i>{tLocalized("Journal of Prosthodontics", "Journal of Prosthodontics")}</i>,
              2019;28(2):122–130
            </div>
            <ul>
              <li>
                <b>{tLocalized("205 diş hekimi", "205 dentists")}</b>{tLocalized(", gerçek klinik pratiğinde", ", in real clinical practice")} <b>{tLocalized("3.750 tek-ünite kron", "3,750 single-unit crowns")}</b> {tLocalized("değerlendirdi.", "evaluated.")}
              </li>
              <li>
                {tLocalized("Ortalama tekrar (remake) oranı", "Average remake rate")} <b>%3,8</b> — fakat hekimden hekime <b>{tLocalized("%0 ile %42", "0% to 42%")}</b> {tLocalized("arasında\r\n                değişiyor.", "between\r\n                varies.")}
              </li>
              <li>
                {tLocalized("Hekimlerin %58'i hiç kron reddetmezken, tüm reddetmeler %42'lik gruptan geldi — yani sorun", "While 58% of clinicians never reject a crown, all rejections came from the remaining 42% — meaning the problem")}{" "}
                <b>{tLocalized("tekil, çözülebilir", "single, dissolvable")}</b> {tLocalized("bir uygulama farkı.", "one application difference.")}
              </li>
              <li>
                {tLocalized("En sık ret sebepleri:", "Most common reasons for rejection:")} <b>{tLocalized("proksimal uyumsuzluk, marjinal hatalar ve estetik başarısızlık", "proximal misfit, marginal errors, and aesthetic failure")}</b> {tLocalized("— üçü de\r\n                doğrudan", "— all three\r\n                directly")} <b>{tLocalized("ölçüsel hassasiyet", "dimensional accuracy")}</b> problemi.
              </li>
            </ul>
            <a className="link" href="https://doi.org/10.1111/jopr.12995" target="_blank" rel="noopener noreferrer">
              {tLocalized("DOI: 10.1111/jopr.12995 · Kaynağı aç →", "DOI: 10.1111/jopr.12995 · Open source →")}
            </a>
          </div>

          <div className="study">
            <span className="tag">{tLocalized("HAKEMLİ · ÖLÇÜSEL DOĞRULUK", "PEER-REVIEWED · DIMENSIONAL ACCURACY")}</span>
            <h3>{tLocalized("Peki sapma neden oluşuyor? Doğruluk, kullanılan sisteme göre uçtan uca değişiyor.", "So why does deviation occur? Accuracy varies end-to-end depending on the system used.")}</h3>
            <div className="meta">
              {tLocalized("Etemad-Shahidi Y. ve ark. ·", "Etemad-Shahidi Y. et al. ·")} <i>{tLocalized("J Clin Med", "J Clin Med")}</i> {tLocalized("2020 (sistematik derleme) &nbsp;·&nbsp; Németh A. ve ark.\r\n              ·", "2020 (systematic review) &nbsp;·&nbsp; Németh A. et al.\r\n              ·")} <i>{tLocalized("J Dentistry", "J Dentistry")}</i> {tLocalized("2023 (ağ meta-analizi)", "2023 (network meta-analysis)")}
            </div>
            <ul>
              <li>
                {tLocalized("Sistematik derlemede full-arch model doğruluğu en iyi sistemde", "In the systematic review, full-arch model accuracy with the best system")} <b>3,3 µm</b>{tLocalized("'ye inerken, bazı\r\n                cihazlarda", "down to, on some devices")} <b>130–190 µm</b>{tLocalized("'ye çıkıyor — yani doğru sonucu cihaz ve parametre belirliyor.", "it goes up to — meaning the device and parameters determine the correct result.")}
              </li>
              <li>
                {tLocalized("Ağ meta-analizi", "Network meta-analysis")} <b>{tLocalized("SLA, DLP ve PolyJet", "SLA, DLP, and PolyJet")}</b>{tLocalized("'i en doğru teknolojiler olarak gösteriyor (SLA ~", "as the most accurate technology (SLA ~")}
                <b>86,7 µm</b>, DLP ~<b>97,9 µm</b> {tLocalized("ortalama trueness).", "average trueness).")}
              </li>
              <li>
                {tLocalized("Yani sapma tesadüf değil, yönetilebilir bir değişken.", "So the deviation isn't chance — it's a manageable variable.")} <b>{tLocalized("3mash bu değişkenleri birlikte kalibre ederek ±20 µm'yi her baskıda", "3mash calibrates these variables together to deliver ±20 µm on every print")}</b>{" "}
                {tLocalized("sabitler; tekrar oranı ve maliyet de bu sayede düşer.", "fixes it; this also lowers the remake rate and cost.")}
              </li>
            </ul>
            <a className="link" href="https://doi.org/10.3390/jcm9103357" target="_blank" rel="noopener noreferrer">
              {tLocalized("DOI: 10.3390/jcm9103357 →", "DOI: 10.3390/jcm9103357 →")}
            </a>
            &nbsp;&nbsp;
            <a
              className="link"
              href="https://doi.org/10.1016/j.jdent.2023.104532"
              target="_blank"
              rel="noopener noreferrer"
            >
              {tLocalized("DOI: 10.1016/j.jdent.2023.104532 →", "DOI: 10.1016/j.jdent.2023.104532 →")}
            </a>
          </div>

          <div className="callout">
            <p>
              <b>{tLocalized("3mash bağlantısı:", "3mash connection:")}</b> {tLocalized("çalışmanın işaret ettiği üç sebep de (proksimal uyum, marjin, estetik)", "the three reasons the study points to (proximal fit, margin, aesthetics)")}{" "}
              <b>{tLocalized("±20 µm tekrar edilebilir hassasiyetle", "with ±20 µm repeatable precision")}</b> {tLocalized("doğrudan azalır. Tekrar oranınızı %42'lerden ya da\r\n              %10'lardan", "decreases directly. Whether your remake rate is coming down from around 42% or\r\n              from around 10%,")} <b>≤%3'e</b> {tLocalized("çektiğinizde, yukarıdaki kalem-kalem maliyet aynı oranda düşer.", "when you cut this out, the itemized cost above drops by the same rate.")}
            </p>
          </div>

          <p className="mini-src">
            {tLocalized("Kaynaklar: Tekrar oranı ve ret sebepleri — McCracken ve ark.,", "Sources: Remake rate and rejection causes — McCracken et al.,")}{" "}
            <a href="https://doi.org/10.1111/jopr.12995" target="_blank" rel="noopener noreferrer">
              {tLocalized("J Prosthodont 2019 (10.1111/jopr.12995)", "J Prosthodont 2019 (10.1111/jopr.12995)")}
            </a>
            {tLocalized(". Ölçüsel doğruluk — Etemad-Shahidi ve ark.,", ". Dimensional accuracy — Etemad-Shahidi et al.,")}{" "}
            <a href="https://doi.org/10.3390/jcm9103357" target="_blank" rel="noopener noreferrer">
              {tLocalized("J Clin Med 2020 (10.3390/jcm9103357)", "J Clin Med 2020 (10.3390/jcm9103357)")}
            </a>{" "}
            {tLocalized("ve Németh ve ark.,", "and Németh et al.,")}{" "}
            <a href="https://doi.org/10.1016/j.jdent.2023.104532" target="_blank" rel="noopener noreferrer">
              {tLocalized("J Dentistry 2023 (10.1016/j.jdent.2023.104532)", "J Dentistry 2023 (10.1016/j.jdent.2023.104532)")}
            </a>
            {tLocalized(". Maliyet modeli (koltuk süresi/işletme gideri) — Spear Education, “The Cost of Laboratory Remakes.”\r\n            Rakamlar tahminî olup iş akışınıza göre değişir.", ". Cost model (chair time/operating expense) — Spear Education, \"The Cost of Laboratory Remakes.\"\r\n            Figures are estimates and vary by your workflow.")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ThreeMashCostDetailPage;
