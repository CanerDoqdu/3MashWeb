import { Props } from "./types";

function propString(value: unknown) {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (!value || typeof value !== "object") return "";

  const data = value as Record<string, unknown>;
  const candidates = [data.value, data.text, data.html, data.label, data.title];
  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) return candidate;
  }

  return "";
}

function boolValue(value: unknown) {
  if (typeof value === "boolean") return value;
  const normalized = propString(value).trim().toLocaleLowerCase("tr");
  if (["false", "0", "no", "hayir", "hayır", "kapali", "kapalı"].includes(normalized)) return false;
  if (["true", "1", "yes", "evet", "acik", "açık"].includes(normalized)) return true;
  return undefined;
}

function text(value: unknown, fallback = "") {
  const trimmed = propString(value).trim();
  return trimmed || fallback;
}

function pascal(value: string) {
  return value.charAt(0).toLocaleUpperCase("tr") + value.slice(1);
}

function productBasedApplies(props: Props) {
  return props.productBasedEnabled !== false;
}

const ARGENZ_PRODUCT_BASED_DEFAULTS: Record<string, unknown> = {
  productBasedMetricCount: 3,
  productBasedMetric1Enabled: true,
  productBasedMetric1Value: "50",
  productBasedMetric1Unit: "%",
  productBasedMetric1Title: "Işık Geçirgenliği",
  productBasedMetric1Subtitle: "Süper Translüsent",
  productBasedMetric2Enabled: true,
  productBasedMetric2Value: "850",
  productBasedMetric2Unit: "MPa",
  productBasedMetric2Title: "Eğilme Mukavemeti",
  productBasedMetric2Subtitle: "",
  productBasedMetric3Enabled: true,
  productBasedMetric3Value: "4Y",
  productBasedMetric3Unit: "",
  productBasedMetric3Title: "İtriyum Mol Yüzdesi",
  productBasedMetric3Subtitle: "",
  productBasedMetric4Enabled: false,
  productBasedMetric5Enabled: false,
  productBasedMetric6Enabled: false,
};

function filled(value: unknown) {
  return typeof value === "string" ? value.trim() !== "" : value !== undefined && value !== null;
}

function valueFor(props: Props, propName: keyof Props) {
  if (!productBasedApplies(props)) return props[propName];

  const data = props as Record<string, unknown>;
  const productBasedName = `productBased${pascal(String(propName))}`;
  const productBasedValue = data[productBasedName];
  if (filled(productBasedValue)) return productBasedValue;
  if (filled(ARGENZ_PRODUCT_BASED_DEFAULTS[productBasedName])) return ARGENZ_PRODUCT_BASED_DEFAULTS[productBasedName];
  return props[propName];
}

function numberValue(value: unknown, fallback: number, min?: number, max?: number) {
  const next = Number(value);
  if (!Number.isFinite(next)) return fallback;
  return Math.min(max ?? next, Math.max(min ?? next, next));
}

function cssLength(value: unknown, fallback: number) {
  return `${numberValue(value, fallback)}px`;
}

function metric(props: Props, index: number) {
  const field = (name: string) => {
    const propKey = `metric${index}${name}`;
    return valueFor(props, propKey as keyof Props);
  };

  const enabled = boolValue(field("Enabled")) ?? field("Enabled") !== false;
  const value = text(field("Value"));
  const title = text(field("Title"));

  if (!enabled || (!value && !title)) return null;

  return {
    value,
    unit: text(field("Unit")),
    title,
    subtitle: text(field("Subtitle")),
  };
}

export function ThreeMashProductMetrics(props: Props) {
  const maxItems = numberValue(valueFor(props, "metricCount"), 3, 1, 6);
  const metrics = [1, 2, 3, 4, 5, 6].slice(0, maxItems).map((index) => metric(props, index)).filter(Boolean);

  const style = {
    "--tmpm-bg": text(valueFor(props, "backgroundColor"), "#ffffff"),
    "--tmpm-text": text(valueFor(props, "textColor"), "#050505"),
    "--tmpm-muted": text(valueFor(props, "mutedTextColor"), "#050505"),
    "--tmpm-circle": text(valueFor(props, "circleColor"), "#d8ff1f"),
    "--tmpm-circle-text": text(valueFor(props, "circleTextColor"), "#050505"),
    "--tmpm-max": cssLength(valueFor(props, "maxWidth"), 1240),
    "--tmpm-pt": cssLength(valueFor(props, "paddingTop"), 88),
    "--tmpm-pb": cssLength(valueFor(props, "paddingBottom"), 88),
    "--tmpm-gap": cssLength(valueFor(props, "gridGap"), 96),
    "--tmpm-circle-size": cssLength(valueFor(props, "circleSize"), 148),
    "--tmpm-circle-spacing": cssLength(valueFor(props, "circleSpacing"), 46),
    "--tmpm-value-size": cssLength(valueFor(props, "valueFontSize"), 50),
    "--tmpm-unit-size": cssLength(valueFor(props, "unitFontSize"), 22),
    "--tmpm-title-size": cssLength(valueFor(props, "titleFontSize"), 16),
    "--tmpm-subtitle-size": cssLength(valueFor(props, "subtitleFontSize"), 13),
    "--tmpm-desktop-cols": numberValue(valueFor(props, "desktopColumns"), 3, 1, 6),
    "--tmpm-tablet-cols": numberValue(valueFor(props, "tabletColumns"), 2, 1, 3),
  } as any;

  return (
    <section id={text(valueFor(props, "sectionAnchorId")) || undefined} className="three-mash-product-metrics" style={style}>
      <div className="tmpm-wrap">
        <div className="tmpm-grid">
          {metrics.map((item, index) => {
            const metricItem = item as { value: string; unit: string; title: string; subtitle: string };
            return (
              <article className="tmpm-item" key={index}>
                <div className="tmpm-circle">
                  <strong>{metricItem.value}</strong>
                  {metricItem.unit ? <span>{metricItem.unit}</span> : null}
                </div>
                <div className="tmpm-copy">
                  {metricItem.title ? <h3>{metricItem.title}</h3> : null}
                  {metricItem.subtitle ? <p>{metricItem.subtitle}</p> : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ThreeMashProductMetrics;
