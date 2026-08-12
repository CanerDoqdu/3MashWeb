import { useMemo, useState } from "preact/hooks";
import { Props } from "./types";

type CostItem = {
  number: string;
  title: string;
  value: string;
  description: string;
};

type Scenario = {
  label: string;
  value: string;
  note: string;
};

type CostMode = "clinic" | "lab";

type CalculatorPreset = {
  monthlyVolume: number;
  repeatRate: number;
  timeHours: number;
  hourlyCost: number;
  productionCost: number;
  adminCost: number;
};

const clinicCosts: CostItem[] = [
  {
    number: "01",
    title: "Koltuk süresi",
    value: "$375 / saat",
    description:
      "Yeniden çağırma, prova, düzeltme ve yapıştırma randevusu klinikteki en pahalı kalemdir.",
  },
  {
    number: "02",
    title: "Tekrar ölçü",
    value: "1 ekstra akış",
    description:
      "Tarama veya ölçü yenilendiğinde hekim, asistan ve hasta takvimi aynı vaka için tekrar kullanılır.",
  },
  {
    number: "03",
    title: "Üretim tekrarı",
    value: "malzeme + zaman",
    description:
      "Reçine, baskı süresi, yıkama, kürleme ve post-process adımları ikinci kez çalışır.",
  },
  {
    number: "04",
    title: "Hasta deneyimi",
    value: "güven kaybı",
    description:
      "İlk seferde oturmayan restorasyon hasta algısında görünmeyen ama uzun vadeli bir maliyet oluşturur.",
  },
];

const labCosts: CostItem[] = [
  {
    number: "01",
    title: "Operatör zamanı",
    value: "planlama + takip",
    description:
      "Dosyanın yeniden hazırlanması, cihaz sırası ve kontrol adımları üretim kapasitesinden yer alır.",
  },
  {
    number: "02",
    title: "Cihaz kapasitesi",
    value: "boş slot kaybı",
    description:
      "Tekrar baskı, aynı makinede yeni işlerin başlamasını geciktirir ve teslim sürelerini sıkıştırır.",
  },
  {
    number: "03",
    title: "Sarf tüketimi",
    value: "reçine + aksesuar",
    description:
      "Reçine, film, platform temizliği ve kürleme döngüsü her tekrar için yeniden tüketilir.",
  },
  {
    number: "04",
    title: "Teslimat baskısı",
    value: "acil iş",
    description:
      "Tekrar üretilen vaka, normal iş akışını keserek hızlandırılmış kontrol ve sevkiyat ihtiyacı doğurur.",
  },
];

const presets: Record<CostMode, CalculatorPreset> = {
  clinic: {
    monthlyVolume: 120,
    repeatRate: 10,
    timeHours: 1,
    hourlyCost: 375,
    productionCost: 95,
    adminCost: 30,
  },
  lab: {
    monthlyVolume: 300,
    repeatRate: 8,
    timeHours: 0.6,
    hourlyCost: 90,
    productionCost: 120,
    adminCost: 26,
  },
};

function text(value: string | undefined, fallback: string) {
  return value?.trim() || fallback;
}

function href(value: string | undefined, fallback: string) {
  const next = value?.trim();
  return next && next !== "#" ? next : fallback;
}

function themeColor(
  input: string | undefined,
  fallback: string,
  token: string,
  legacyDefaults: string[] = [],
) {
  const trimmed = input?.trim();
  const normalized = trimmed?.toLowerCase();
  const defaults = [fallback, ...legacyDefaults].map((item) =>
    item.toLowerCase(),
  );

  if (!trimmed || (normalized && defaults.includes(normalized))) {
    return `var(${token}, ${fallback})`;
  }

  return trimmed;
}

function richHtml(value: string | undefined, fallback: string) {
  return {
    __html: text(value, fallback)
      .replace(/\sstyle=("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
      .replace(/<\/p>\s*<p[^>]*>/gi, "<br />")
      .replace(/^<p[^>]*>/i, "")
      .replace(/<\/p>$/i, ""),
  };
}

function formatCurrency(value: number) {
  return `$${Math.round(value).toLocaleString("tr-TR")}`;
}

function formatNumber(value: number) {
  return Math.round(value).toLocaleString("tr-TR");
}

function formatControlValue(value: number, step: number) {
  if (step < 1) {
    return value.toLocaleString("tr-TR", {
      maximumFractionDigits: 2,
      minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    });
  }

  return formatNumber(value);
}

function rangeProgress(value: number, min: number, max: number) {
  if (max <= min) return "0%";
  return `${Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))}%`;
}

function SliderControl({
  label,
  value,
  suffix,
  min,
  max,
  step,
  onInput,
}: {
  label: string;
  value: number;
  suffix?: string;
  min: number;
  max: number;
  step: number;
  onInput: (value: number) => void;
}) {
  return (
    <label className="tm-cost-control">
      <span>
        {label}
        <b>
          {suffix === "$" ? "$" : ""}
          {formatControlValue(value, step)}
          {suffix && suffix !== "$" ? ` ${suffix}` : ""}
        </b>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        style={{ "--tm-cost-range": rangeProgress(value, min, max) } as any}
        onInput={(event) =>
          onInput(Number((event.currentTarget as HTMLInputElement).value))
        }
      />
    </label>
  );
}

export function ThreeMashCostDetailPage(props: Props) {
  const [mode, setMode] = useState<CostMode>("clinic");
  const [monthlyVolume, setMonthlyVolume] = useState(
    presets.clinic.monthlyVolume,
  );
  const [repeatRate, setRepeatRate] = useState(presets.clinic.repeatRate);
  const [timeHours, setTimeHours] = useState(presets.clinic.timeHours);
  const [hourlyCost, setHourlyCost] = useState(presets.clinic.hourlyCost);
  const [productionCost, setProductionCost] = useState(
    presets.clinic.productionCost,
  );
  const [adminCost, setAdminCost] = useState(presets.clinic.adminCost);

  const timeCost = timeHours * hourlyCost;
  const perRepeatCost = timeCost + productionCost + adminCost;
  const yearlyRepeatCount = monthlyVolume * 12 * (repeatRate / 100);
  const yearlyLoss = yearlyRepeatCount * perRepeatCost;
  const targetLoss = monthlyVolume * 12 * 0.03 * perRepeatCost;
  const savingsPotential = Math.max(0, yearlyLoss - targetLoss);
  const scenarios: Scenario[] = useMemo(
    () => [
      {
        label: mode === "clinic" ? "Aylık vaka" : "Aylık üretim",
        value: formatNumber(monthlyVolume),
        note:
          mode === "clinic"
            ? "Restoratif vaka hacmi"
            : "Laboratuvar üretim adedi",
      },
      {
        label: "Mevcut tekrar",
        value: `%${formatNumber(repeatRate)}`,
        note: "İlk seferde kabul edilmeyen iş oranı",
      },
      {
        label: "Tekrar maliyeti",
        value: formatCurrency(perRepeatCost),
        note: "Aşağıdaki kalemlerden oluşur",
      },
      {
        label: "Yıllık kayıp",
        value: formatCurrency(yearlyLoss),
        note: `${formatNumber(monthlyVolume)} x 12 x %${formatNumber(repeatRate)} x ${formatCurrency(perRepeatCost)}`,
      },
    ],
    [mode, monthlyVolume, repeatRate, perRepeatCost, yearlyLoss],
  );

  function applyMode(nextMode: CostMode) {
    const next = presets[nextMode];
    setMode(nextMode);
    setMonthlyVolume(next.monthlyVolume);
    setRepeatRate(next.repeatRate);
    setTimeHours(next.timeHours);
    setHourlyCost(next.hourlyCost);
    setProductionCost(next.productionCost);
    setAdminCost(next.adminCost);
  }

  const style = {
    "--tm-cost-bg": themeColor(
      props.backgroundColor,
      "#FAFAF7",
      "--tm-theme-bg",
      ["#ffffff", "#fff"],
    ),
    "--tm-cost-text": themeColor(
      props.textColor,
      "#0E0E0C",
      "--tm-theme-text",
      ["#000000", "#111111"],
    ),
    "--tm-cost-muted": themeColor(
      props.mutedTextColor,
      "#55554e",
      "--tm-theme-sub",
      ["#777777", "#6b7280"],
    ),
    "--tm-cost-line": themeColor(
      props.lineColor,
      "#E6E6E0",
      "--tm-theme-line",
      ["#e5e5e5", "#d9d9d9"],
    ),
    "--tm-cost-panel": "var(--tm-theme-panel, #F1F1EC)",
    "--tm-cost-accent": "var(--tm-theme-accent, #C7F136)",
    "--tm-cost-dark": "var(--tm-theme-dark, #0E0E0C)",
    "--tm-cost-accent-text": "var(--tm-theme-accent-text, #3D4D0E)",
  } as any;

  return (
    <section className="three-mash-cost-detail-page" style={style}>
      <div className="tm-cost-shell">
        <section className="tm-cost-hero">
          <div className="tm-cost-hero-copy">
            <span
              className="tm-cost-kicker"
              dangerouslySetInnerHTML={richHtml(
                props.eyebrowText,
                "MALİYET DETAYI",
              )}
            />
            <h1
              dangerouslySetInnerHTML={richHtml(
                props.titleText,
                "Bir tekrarın gerçek maliyeti <em>kalem kalem.</em>",
              )}
            />
            <p
              dangerouslySetInnerHTML={richHtml(
                props.descriptionText,
                "Kron, splint veya model tekrarları sadece malzeme firelerinden oluşmaz. Asıl fark; koltuk süresi, yeniden ölçü, üretim zamanı ve hasta memnuniyeti gibi görünmeyen kalemlerde birikir.",
              )}
            />
            <div className="tm-cost-actions">
              <a href={href(props.primaryButtonHref, "/")}>
                <span
                  dangerouslySetInnerHTML={richHtml(
                    props.primaryButtonText,
                    "Hesaplayıcıya dön →",
                  )}
                />
              </a>
              <a href={href(props.secondaryButtonHref, "/pages/iletisim")}>
                <span
                  dangerouslySetInnerHTML={richHtml(
                    props.secondaryButtonText,
                    "Ücretsiz analiz iste",
                  )}
                />
              </a>
            </div>
          </div>

          <aside className="tm-cost-formula" aria-label="Örnek hesap">
            <span>ÖRNEK HESAP</span>
            <b>120 x 12 x %10 x $500</b>
            <strong>$72.000</strong>
            <p>
              Aylık vaka, yıllık dönem, tekrar oranı ve  tekrar maliyeti.
            </p>
          </aside>
        </section>

        <section className="tm-cost-scenario">
          {scenarios.map((item) => (
            <div className="tm-cost-scenario-card" key={item.label}>
              <span>{item.label}</span>
              <b>{item.value}</b>
              <p>{item.note}</p>
            </div>
          ))}
        </section>

        <section className="tm-cost-calculator" id="kalem-kalem">
          <div className="tm-cost-calculator-copy">
            <span className="tm-cost-index">01</span>
            <h2>
              Kalemleri değiştir, <em>gerçek kaybı gör.</em>
            </h2>
            <p>
              Bu hesap satış fiyatı karşılaştırması değildir. Tekrar işin
              işletmeye bindirdiği zamanı, sarfı ve operasyon baskısını birlikte
              toplar.
            </p>
            <div className="tm-cost-mode-tabs" aria-label="Hesaplama modu">
              <button
                className={mode === "clinic" ? "is-active" : ""}
                type="button"
                onClick={() => applyMode("clinic")}
              >
                Klinik
              </button>
              <button
                className={mode === "lab" ? "is-active" : ""}
                type="button"
                onClick={() => applyMode("lab")}
              >
                Laboratuvar
              </button>
            </div>
          </div>

          <div className="tm-cost-calculator-panel">
            <div className="tm-cost-controls">
              <SliderControl
                label={mode === "clinic" ? "Aylık vaka" : "Aylık üretim"}
                value={monthlyVolume}
                min={mode === "clinic" ? 20 : 100}
                max={mode === "clinic" ? 500 : 2000}
                step={mode === "clinic" ? 10 : 25}
                onInput={setMonthlyVolume}
              />
              <SliderControl
                label="Mevcut tekrar oranı"
                value={repeatRate}
                suffix="%"
                min={1}
                max={20}
                step={1}
                onInput={setRepeatRate}
              />
              <SliderControl
                label={mode === "clinic" ? "Koltuk süresi" : "Operatör süresi"}
                value={timeHours}
                suffix="saat"
                min={0.25}
                max={3}
                step={0.25}
                onInput={setTimeHours}
              />
              <SliderControl
                label={
                  mode === "clinic"
                    ? "Saatlik klinik gideri"
                    : "Saatlik operasyon gideri"
                }
                value={hourlyCost}
                suffix="$"
                min={50}
                max={500}
                step={25}
                onInput={setHourlyCost}
              />
              <SliderControl
                label={
                  mode === "clinic"
                    ? "Lab / malzeme kalemi"
                    : "Sarf + cihaz kalemi"
                }
                value={productionCost}
                suffix="$"
                min={25}
                max={600}
                step={25}
                onInput={setProductionCost}
              />
              <SliderControl
                label="Planlama / teslim baskısı"
                value={adminCost}
                suffix="$"
                min={0}
                max={250}
                step={10}
                onInput={setAdminCost}
              />
            </div>

            <div className="tm-cost-live-output">
              <span>TEK TEKRARIN TOPLAMI</span>
              <strong>{formatCurrency(perRepeatCost)}</strong>
              <div className="tm-cost-live-lines">
                <div>
                  <span>
                    {mode === "clinic" ? "Koltuk süresi" : "Operatör zamanı"}
                  </span>
                  <b>{formatCurrency(timeCost)}</b>
                </div>
                <div>
                  <span>
                    {mode === "clinic" ? "Lab / malzeme" : "Sarf + cihaz"}
                  </span>
                  <b>{formatCurrency(productionCost)}</b>
                </div>
                <div>
                  <span>Planlama / teslim</span>
                  <b>{formatCurrency(adminCost)}</b>
                </div>
              </div>
              <div className="tm-cost-live-loss">
                <span>Tahmini yıllık kayıp</span>
                <b>{formatCurrency(yearlyLoss)}</b>
              </div>
              <div className="tm-cost-live-save">
                <span>≤%3 hedef oranla düşebilecek yük</span>
                <b>{formatCurrency(savingsPotential)}</b>
              </div>
            </div>
          </div>
        </section>

        <section className="tm-cost-breakdown">
          <div className="tm-cost-section-head">
            <span className="tm-cost-index">02</span>
            <h2>
              Klinik tarafında <em>nereden kaybolur?</em>
            </h2>
            <p>
              Hastanın ağzına ilk seferde oturmayan iş, aynı vakanın ikinci kez
              planlanması anlamına gelir.
            </p>
          </div>
          <div className="tm-cost-card-grid">
            {clinicCosts.map((item) => (
              <article className="tm-cost-card" key={item.number}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <strong>{item.value}</strong>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="tm-cost-dark-band">
          <div>
            <span>HASSASİYET ETKİSİ</span>
            <h2>
              Maliyet hesabı, sadece fiyat değil <em>tekrar oranı</em>{" "}
              hesabıdır.
            </h2>
          </div>
          <div className="tm-cost-band-table">
            <div>
              <span>Mevcut tekrar oranı</span>
              <b>%7-12</b>
            </div>
            <div>
              <span>Hedef tekrar oranı</span>
              <b>≤%3</b>
            </div>
            <div>
              <span>Boyutsal hassasiyet hedefi</span>
              <b>±20 µm</b>
            </div>
            <div>
              <span>Geri dönüş potansiyeli</span>
              <b>&lt; 6 ay</b>
            </div>
          </div>
        </section>

        <section className="tm-cost-breakdown">
          <div className="tm-cost-section-head">
            <span className="tm-cost-index">03</span>
            <h2>
              Laboratuvar tarafında <em>hangi kalemler büyür?</em>
            </h2>
            <p>
              Yüksek hacimde küçük tekrar oranları bile cihaz sırası, operatör
              zamanı ve teslim baskısıyla hızlıca birikir.
            </p>
          </div>
          <div className="tm-cost-card-grid">
            {labCosts.map((item) => (
              <article className="tm-cost-card" key={item.number}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <strong>{item.value}</strong>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="tm-cost-method">
          <div>
            <span className="tm-cost-index">04</span>
            <h2>Hesaplama mantığı</h2>
          </div>
          <div className="tm-cost-method-grid">
            <div>
              <b>Aylık hacim</b>
              <p>Klinikte restoratif vaka, laboratuvarda üretim adedi.</p>
            </div>
            <div>
              <b>Tekrar oranı</b>
              <p>
                İlk seferde kabul edilmeyen ve yeniden işlenen vaka yüzdesi.
              </p>
            </div>
            <div>
              <b>Birim tekrar maliyeti</b>
              <p>Koltuk süresi, operatör zamanı, sarf ve teslim baskısı.</p>
            </div>
            <div>
              <b>Yıllık kayıp</b>
              <p>Aylık hacim x 12 x tekrar oranı x birim maliyet.</p>
            </div>
          </div>
        </section>

        <section className="tm-cost-final">
          <div>
            <span>SONRAKİ ADIM</span>
            <h2>
              Kendi tekrar oranınızla <em>gerçek tabloyu</em> çıkarın.
            </h2>
          </div>
          <a href={href(props.primaryButtonHref, "/")}>
            <span
              dangerouslySetInnerHTML={richHtml(
                props.primaryButtonText,
                "Hesaplayıcıya dön →",
              )}
            />
          </a>
        </section>
      </div>
    </section>
  );
}

export default ThreeMashCostDetailPage;
