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

function text(value: unknown, fallback = "") {
  const trimmed = propString(value).trim();
  return trimmed || fallback;
}

function numberValue(value: number | undefined, fallback: number, min?: number, max?: number) {
  const next = Number(value);
  if (!Number.isFinite(next)) return fallback;
  return Math.min(max ?? next, Math.max(min ?? next, next));
}

function cssLength(value: number | undefined, fallback: number) {
  return `${numberValue(value, fallback)}px`;
}

function metric(props: Props, index: number) {
  const data = props as Record<string, unknown>;
  const enabled = data[`metric${index}Enabled`] !== false;
  const value = text(data[`metric${index}Value`]);
  const title = text(data[`metric${index}Title`]);

  if (!enabled || (!value && !title)) return null;

  return {
    value,
    unit: text(data[`metric${index}Unit`]),
    title,
    subtitle: text(data[`metric${index}Subtitle`]),
  };
}

export function ThreeMashProductMetrics(props: Props) {
  const maxItems = numberValue(props.metricCount, 3, 1, 6);
  const metrics = [1, 2, 3, 4, 5, 6].slice(0, maxItems).map((index) => metric(props, index)).filter(Boolean);

  const style = {
    "--tmpm-bg": text(props.backgroundColor, "#ffffff"),
    "--tmpm-text": text(props.textColor, "#050505"),
    "--tmpm-muted": text(props.mutedTextColor, "#050505"),
    "--tmpm-circle": text(props.circleColor, "#d8ff1f"),
    "--tmpm-circle-text": text(props.circleTextColor, "#050505"),
    "--tmpm-max": cssLength(props.maxWidth, 1240),
    "--tmpm-pt": cssLength(props.paddingTop, 88),
    "--tmpm-pb": cssLength(props.paddingBottom, 88),
    "--tmpm-gap": cssLength(props.gridGap, 96),
    "--tmpm-circle-size": cssLength(props.circleSize, 148),
    "--tmpm-circle-spacing": cssLength(props.circleSpacing, 46),
    "--tmpm-value-size": cssLength(props.valueFontSize, 50),
    "--tmpm-unit-size": cssLength(props.unitFontSize, 22),
    "--tmpm-title-size": cssLength(props.titleFontSize, 16),
    "--tmpm-subtitle-size": cssLength(props.subtitleFontSize, 13),
    "--tmpm-desktop-cols": numberValue(props.desktopColumns, 3, 1, 6),
    "--tmpm-tablet-cols": numberValue(props.tabletColumns, 2, 1, 3),
  } as any;

  return (
    <section id={text(props.sectionAnchorId) || undefined} className="three-mash-product-metrics" style={style}>
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
