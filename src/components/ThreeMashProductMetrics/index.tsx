import { Props } from "./types";

type PlainObject = Record<string, unknown>;

function isPlainObject(value: unknown): value is PlainObject {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

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

function normalizedKey(value: unknown) {
  return propString(value)
    .toLocaleLowerCase("tr")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function payloadValue(value: unknown): unknown {
  if (!isPlainObject(value)) return value;

  const nested =
    value.value ??
    value.text ??
    value.html ??
    value.content ??
    value.title ??
    value.name ??
    (isPlainObject(value.productAttributeOption) ? value.productAttributeOption.name : undefined) ??
    (Array.isArray(value.productAttributeOptions) ? value.productAttributeOptions.map((item) => propString(item)).join(", ") : undefined);

  return nested === undefined ? value : nested;
}

function productField(product: Props["product"], keys: string[]) {
  if (!product) return undefined;
  const wanted = new Set(keys.map(normalizedKey));
  const source = product as unknown as PlainObject;

  for (const key of keys) {
    if (source[key] !== undefined) return payloadValue(source[key]);
  }

  const containers = [
    source.customFields,
    source.customFieldValues,
    source.productCustomFields,
    source.attributes,
    source.productAttributes,
    source.metafields,
    source.metaFields,
  ];

  for (const container of containers) {
    if (Array.isArray(container)) {
      for (const item of container) {
        if (!isPlainObject(item)) continue;
        const aliases = [
          item.key,
          item.code,
          item.name,
          item.slug,
          item.handle,
          item.fieldName,
          item.title,
          isPlainObject(item.productAttribute) ? item.productAttribute.name || item.productAttribute.id : "",
          isPlainObject(item.customField) ? item.customField.key || item.customField.code || item.customField.name : "",
          isPlainObject(item.field) ? item.field.key || item.field.code || item.field.name : "",
        ];
        if (aliases.some((alias) => wanted.has(normalizedKey(alias)))) return payloadValue(item);
      }
      continue;
    }

    if (isPlainObject(container)) {
      for (const [key, value] of Object.entries(container)) {
        if (wanted.has(normalizedKey(key))) return payloadValue(value);
      }
    }
  }

  return undefined;
}

function productMetricField(props: Props, index: number, field: string) {
  const prefix = text(props.productAttributePrefix, "product_metric");
  const data = props as Record<string, unknown>;
  const propKey = `metric${index}${field.charAt(0).toLocaleUpperCase("tr")}${field.slice(1)}AttributeKey`;
  const keys = [
    `${prefix}_${index}_${field}`,
    `${prefix}${index}${field}`,
    `metric_${index}_${field}`,
    `metric${index}${field}`,
    `urun_metrik_${index}_${field}`,
    `ürün_metrik_${index}_${field}`,
  ];
  const customKey = text(data[propKey]);
  return productField(props.product, customKey ? [customKey, ...keys] : keys);
}

function productMetricCount(props: Props) {
  const prefix = text(props.productAttributePrefix, "product_metric");
  const customKey = text(props.metricCountAttributeKey);
  return productField(props.product, customKey ? [customKey, `${prefix}_count`, "metric_count", "metrik_sayisi"] : [`${prefix}_count`, "metric_count", "metrik_sayisi"]);
}

function productStyleField(props: Props, propName: string, defaults: string[]) {
  const data = props as Record<string, unknown>;
  const customKey = text(data[`${propName}AttributeKey`]);
  return productField(props.product, customKey ? [customKey, ...defaults] : defaults);
}

function sourcedValue(props: Props, propName: keyof Props, productValue: unknown) {
  const source = text(props.dataSource, "props");
  if (source === "productAttributes") return productValue ?? props[propName];
  return props[propName];
}

function sourcedStyleValue(props: Props, propName: keyof Props, defaults: string[]) {
  return sourcedValue(props, propName, productStyleField(props, String(propName), defaults));
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
  const source = text(props.dataSource, "props");
  const field = (name: string) => {
    const propKey = `metric${index}${name}`;
    if (source === "productAttributes") return productMetricField(props, index, name.toLocaleLowerCase("tr")) ?? data[propKey];
    return data[propKey];
  };

  const enabled = boolValue(field("Enabled")) ?? data[`metric${index}Enabled`] !== false;
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
  const maxItems = numberValue(sourcedValue(props, "metricCount", productMetricCount(props)) as number | undefined, 3, 1, 6);
  const metrics = [1, 2, 3, 4, 5, 6].slice(0, maxItems).map((index) => metric(props, index)).filter(Boolean);

  const style = {
    "--tmpm-bg": text(sourcedStyleValue(props, "backgroundColor", ["product_metric_background_color", "metric_background_color"]), "#ffffff"),
    "--tmpm-text": text(sourcedStyleValue(props, "textColor", ["product_metric_text_color", "metric_text_color"]), "#050505"),
    "--tmpm-muted": text(sourcedStyleValue(props, "mutedTextColor", ["product_metric_muted_text_color", "metric_muted_text_color"]), "#050505"),
    "--tmpm-circle": text(sourcedStyleValue(props, "circleColor", ["product_metric_circle_color", "metric_circle_color"]), "#d8ff1f"),
    "--tmpm-circle-text": text(sourcedStyleValue(props, "circleTextColor", ["product_metric_circle_text_color", "metric_circle_text_color"]), "#050505"),
    "--tmpm-max": cssLength(sourcedStyleValue(props, "maxWidth", ["product_metric_max_width", "metric_max_width"]) as number | undefined, 1240),
    "--tmpm-pt": cssLength(sourcedStyleValue(props, "paddingTop", ["product_metric_padding_top", "metric_padding_top"]) as number | undefined, 88),
    "--tmpm-pb": cssLength(sourcedStyleValue(props, "paddingBottom", ["product_metric_padding_bottom", "metric_padding_bottom"]) as number | undefined, 88),
    "--tmpm-gap": cssLength(sourcedStyleValue(props, "gridGap", ["product_metric_grid_gap", "metric_grid_gap"]) as number | undefined, 96),
    "--tmpm-circle-size": cssLength(sourcedStyleValue(props, "circleSize", ["product_metric_circle_size", "metric_circle_size"]) as number | undefined, 148),
    "--tmpm-circle-spacing": cssLength(sourcedStyleValue(props, "circleSpacing", ["product_metric_circle_spacing", "metric_circle_spacing"]) as number | undefined, 46),
    "--tmpm-value-size": cssLength(sourcedStyleValue(props, "valueFontSize", ["product_metric_value_font_size", "metric_value_font_size"]) as number | undefined, 50),
    "--tmpm-unit-size": cssLength(sourcedStyleValue(props, "unitFontSize", ["product_metric_unit_font_size", "metric_unit_font_size"]) as number | undefined, 22),
    "--tmpm-title-size": cssLength(sourcedStyleValue(props, "titleFontSize", ["product_metric_title_font_size", "metric_title_font_size"]) as number | undefined, 16),
    "--tmpm-subtitle-size": cssLength(sourcedStyleValue(props, "subtitleFontSize", ["product_metric_subtitle_font_size", "metric_subtitle_font_size"]) as number | undefined, 13),
    "--tmpm-desktop-cols": numberValue(sourcedStyleValue(props, "desktopColumns", ["product_metric_desktop_columns", "metric_desktop_columns"]) as number | undefined, 3, 1, 6),
    "--tmpm-tablet-cols": numberValue(sourcedStyleValue(props, "tabletColumns", ["product_metric_tablet_columns", "metric_tablet_columns"]) as number | undefined, 2, 1, 3),
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
