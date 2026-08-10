import { getDefaultSrc } from "@ikas/bp-storefront";
import { Props } from "./types";
import { useSharedProductDetailData } from "../../sub-components/ThreeMashProductDetailData";
import { ProductDetailSectionScope, ProductDetailVideoSection } from "../../sub-components/ThreeMashProductDetailTemplate";

type PlainObject = Record<string, unknown>;

function isPlainObject(value: unknown): value is PlainObject {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function propString(value: unknown) {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (!value || typeof value !== "object") return "";

  const data = value as Record<string, unknown>;
  const candidates = [
    data.src,
    data.url,
    data.defaultSrc,
    data.originalSrc,
    data.imageUrl,
    data.value,
    data.html,
    data.text,
    (data.image as Record<string, unknown> | undefined)?.src,
    (data.image as Record<string, unknown> | undefined)?.url,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) return candidate;
  }

  return "";
}

function normalizedKey(value: unknown) {
  return propString(value)
    .trim()
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

function customValuePayload(value: unknown): unknown {
  if (!isPlainObject(value)) return value;
  const nested =
    value.value ??
    value.text ??
    value.html ??
    value.richText ??
    value.content ??
    value.url ??
    value.src ??
    value.imageUrl ??
    value.file ??
    value.image;

  return nested === undefined ? value : nested;
}

function customField(product: unknown, keys: string[]) {
  if (!isPlainObject(product)) return undefined;
  const wanted = new Set(keys.map(normalizedKey));

  for (const key of keys) {
    if (product[key] !== undefined) return customValuePayload(product[key]);
  }

  const containers = [
    product.customFields,
    product.customFieldValues,
    product.productCustomFields,
    product.attributes,
    product.productAttributes,
    product.metafields,
    product.metaFields,
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
          isPlainObject(item.customField) ? item.customField.key || item.customField.code || item.customField.name : "",
          isPlainObject(item.field) ? item.field.key || item.field.code || item.field.name : "",
        ];
        if (aliases.some((alias) => wanted.has(normalizedKey(alias)))) return customValuePayload(item);
      }
      continue;
    }

    if (isPlainObject(container)) {
      for (const [key, value] of Object.entries(container)) {
        if (wanted.has(normalizedKey(key))) return customValuePayload(value);
      }
    }
  }

  return undefined;
}

function customText(product: unknown, keys: string[]) {
  const value = customField(product, keys);
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (typeof value === "string") return value.trim();
  if (isPlainObject(value)) {
    const nested = value.text ?? value.value ?? value.html ?? value.content ?? value.name ?? value.title ?? value.url;
    return typeof nested === "string" ? nested.trim() : "";
  }
  return "";
}

function text(value: unknown, fallback = "") {
  const trimmed = propString(value).trim();
  return trimmed || fallback;
}

function boolValue(value: unknown): boolean | undefined {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  if (value && typeof value === "object") {
    const data = value as Record<string, unknown>;
    for (const candidate of [data.value, data.checked, data.enabled, data.selected, data.current, data.data]) {
      const parsed = boolValue(candidate);
      if (parsed !== undefined) return parsed;
    }
  }
  const normalized = propString(value).trim().toLocaleLowerCase("tr");
  if (["false", "0", "no", "hayir", "hayır", "kapali", "kapalı", "off"].includes(normalized)) return false;
  if (["true", "1", "yes", "evet", "acik", "açık", "on"].includes(normalized)) return true;
  return undefined;
}

function html(value: unknown) {
  return { __html: propString(value) };
}

function pascal(value: string) {
  return value.charAt(0).toLocaleUpperCase("tr") + value.slice(1);
}

const ARGENZ_PRODUCT_BASED_DEFAULTS: Record<string, unknown> = {
  productBasedShowText: false,
  productBasedTitleText: "ArgenZ ST Multilayer Zirkon Blok",
  productBasedMutedEnabled: true,
  productBasedAutoplayEnabled: false,
  productBasedControlsEnabled: true,
  productBasedLoopEnabled: false,
  productBasedVideoAspectRatio: "16 / 9",
  productBasedVideoMaxWidth: 1240,
};

const DEFAULT_PRODUCT_BASED_VIDEO_URL_MAP = `
3shape-e2 | https://www.youtube.com/watch?v=6IUVgU336Qc
3shape-e3 | https://www.youtube.com/watch?v=6IUVgU336Qc
3shape-e4 | https://www.youtube.com/watch?v=-gsABaM06sg
crs-composite-mukemmel-dayanimli-gecici-recinesi | https://www.youtube.com/watch?v=IgBVfLPztPg
crs-gingiva-yirtilmaz-dis-eti-recinesi | https://www.youtube.com/watch?v=Lz3AWRKwURs
crs-model-yuksek-hassasiyetli-model-recinesi | https://www.youtube.com/watch?v=dNPHy_sd9aQ
creality-washcure-uw-02 | https://www.youtube.com/watch?v=b3cLqCnfKAk
argenz-st-multilayer-zirkon-blok | https://www.youtube.com/watch?v=Sg2I5yC8qBk
argenz-ht-plus-zirkon-blok | https://www.youtube.com/watch?v=kgyZhW8YC-I
crs-denture-biouyumlu-protez-recinesi | https://www.youtube.com/watch?v=HqZ1a5tra4c
creality-halot-sky-lcd-ekran-kiti-6k-mono | https://www.youtube.com/watch?v=mDQX01qgu60
crs-aligner-memory-shape-ozellikli-aligner-recinesi | https://cdn.myikas.com/videos/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/2dd88d4e-6967-425b-b449-e713c096c324/original.mp4
mash-curie-m1-dental-3d-yazici | https://cdn.myikas.com/videos/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/d789c622-0e3e-499c-84eb-1d5d68943730/original.mp4
trasformer-light-glass-mufla-sistemi | https://cdn.myikas.com/videos/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/1cde49a9-e322-4ac1-9057-092827e4208a/original.mp4
trasformer-comp-flow-siringa-kompozit | https://cdn.myikas.com/videos/cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2/392ca1cc-9a31-40f7-ace6-6bd279f0fc38/original.mp4
mash-study-resin-dental-model-3d-yazici-recinesi | https://www.youtube.com/watch?v=dNPHy_sd9aQ
mash-trial-white-resin-gecici-dental-recinesi | https://www.youtube.com/watch?v=dNPHy_sd9aQ
mash-trial-pink-resin-dental-try-in-gecici-recinesi | https://www.youtube.com/watch?v=dNPHy_sd9aQ
mash-clear-resin-dental-cerrahi-kilavuz-recinesi | https://www.youtube.com/watch?v=dNPHy_sd9aQ
crs-splint-hard-resin-sert-gece-plagi-recinesi | https://www.youtube.com/watch?v=dNPHy_sd9aQ
crs-splint-soft-resin-dental-splint-gece-plak-recinesi | https://www.youtube.com/watch?v=dNPHy_sd9aQ
guide-resin-kilavuz-recinesi-biyouyumlu-cerrahi-rehber | https://www.youtube.com/watch?v=dNPHy_sd9aQ
crs-ibt-resin-ortodontik-ibt-recinesi | https://www.youtube.com/watch?v=dNPHy_sd9aQ
crs-flexit-recin-protez-recinesi | https://www.youtube.com/watch?v=dNPHy_sd9aQ
crs-tray-resin-olcu-kasigi-3d-yazici-recinesi | https://www.youtube.com/watch?v=dNPHy_sd9aQ
piocreat-c01-lcd-ekran-kiti | https://www.youtube.com/watch?v=dNPHy_sd9aQ
seffaf-fep-film-3d-yazici | https://www.youtube.com/watch?v=dNPHy_sd9aQ
mash-p16l-385nm-16k-dental-3d-yazici | https://www.youtube.com/watch?v=dNPHy_sd9aQ
mesa-grade-5-eli-titanyum-disk | https://www.youtube.com/watch?v=dNPHy_sd9aQ
crs-cast-cekmeyen-dokum-recinesi | https://www.youtube.com/watch?v=HqZ1a5tra4c
argenz-ht-multilayer-zirkon-blok | https://www.youtube.com/watch?v=kgyZhW8YC-I
mash-p16l-16k-monokrom-lcd-ekran-yedek-parca | https://www.youtube.com/watch?v=dNPHy_sd9aQ
mash-p16l-recine-tanki-800ml | https://www.youtube.com/watch?v=dNPHy_sd9aQ
`;

function filled(value: unknown) {
  return typeof value === "string" ? value.trim() !== "" : value !== undefined && value !== null;
}

function slugify(value: string) {
  return value
    .toLocaleLowerCase("tr")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function collectProductStrings(value: unknown, output: string[] = []) {
  if (!value) return output;
  if (typeof value === "string" || typeof value === "number") {
    const raw = String(value).trim();
    if (raw) {
      output.push(raw.toLocaleLowerCase("tr"));
      output.push(slugify(raw));
    }
    return output;
  }
  if (Array.isArray(value)) {
    value.forEach((item) => collectProductStrings(item, output));
    return output;
  }
  if (typeof value === "object") {
    const data = value as Record<string, unknown>;
    for (const key of ["slug", "handle", "url", "path", "href", "name", "title", "id"]) collectProductStrings(data[key], output);
    for (const key of ["metadata", "product", "variant", "variants", "selectedVariant"]) collectProductStrings(data[key], output);
  }
  return output;
}

function productMatchesCurrentPage(product: unknown) {
  if (!product) return false;
  if (typeof window === "undefined") return true;
  const current = `${window.location.pathname} ${window.location.href}`.toLocaleLowerCase("tr");
  const currentSlug = slugify(window.location.pathname);
  const terms = Array.from(new Set(collectProductStrings(product))).filter((term) => term.length > 2);
  return terms.some((term) => current.includes(term) || currentSlug.includes(term));
}

function targetSlugsMatch(data: Record<string, unknown>) {
  const raw = propString(data.productBasedTargetSlugs).trim();
  if (!raw) return undefined;
  if (typeof window === "undefined") return undefined;
  const current = `${window.location.pathname} ${window.location.href}`.toLocaleLowerCase("tr");
  const currentSlug = slugify(window.location.pathname);
  const targets = raw
    .split(/[\n,;]+/)
    .map((item) => slugify(item.trim()))
    .filter(Boolean);
  return targets.some((target) => current.includes(target) || currentSlug.includes(target));
}

function slugListMatch(value: unknown, product: unknown) {
  const targets = propString(value)
    .split(/[\n,;]+/)
    .map((item) => slugify(item.trim()))
    .filter(Boolean);
  if (!targets.length) return undefined;

  const terms = collectProductStrings(product).map(slugify);
  if (typeof window !== "undefined") {
    terms.push(slugify(window.location.pathname));
    terms.push(slugify(window.location.href));
  }

  const uniqueTerms = Array.from(new Set(terms.filter((term) => term.length > 2)));
  if (!uniqueTerms.length) return undefined;
  return targets.some((target) =>
    uniqueTerms.some((term) => term === target || term.includes(target) || (target.length >= 14 && target.includes(term))),
  );
}

function productBasedHidden(props: Props) {
  const visibility = productBasedVisibilityOverride(props);
  if (visibility === false) return true;
  return slugListMatch((props as Record<string, unknown>).productBasedHiddenSlugs, props.product) === true;
}

function productSelectionMatchesCurrent(selection: unknown, currentProduct: unknown) {
  const targets = Array.from(new Set(collectProductStrings(selection).map(slugify))).filter((term) => term.length > 2);
  if (!targets.length) return false;

  const terms = collectProductStrings(currentProduct).map(slugify);
  if (typeof window !== "undefined") {
    terms.push(slugify(window.location.pathname));
    terms.push(slugify(window.location.href));
  }

  const uniqueTerms = Array.from(new Set(terms.filter((term) => term.length > 2)));
  return targets.some((target) =>
    uniqueTerms.some((term) => term === target || term.includes(target) || (target.length >= 14 && target.includes(term))),
  );
}

function productBasedVisibilityOverride(props: Props) {
  const data = props as Record<string, unknown>;
  for (let index = 1; index <= 5; index += 1) {
    const product = data[`productBasedVisibilityProduct${index}`];
    if (!product) continue;
    if (productSelectionMatchesCurrent(product, props.product)) {
      const showValue = data[`productBasedVisibilityShow${index}`];
      return (showValue === undefined ? boolValue(data[`productBasedVisibilityVisible${index}`]) : boolValue(showValue)) !== false;
    }
  }
  return undefined;
}

function normalizedJson(value: unknown) {
  try {
    return JSON.stringify(value ?? "").toLocaleLowerCase("tr");
  } catch {
    return propString(value).toLocaleLowerCase("tr");
  }
}

function currentPathText() {
  if (typeof window === "undefined") return "";
  return `${window.location.pathname} ${window.location.href}`.toLocaleLowerCase("tr");
}

function productLooksLikeCrsComposite(data: Record<string, unknown>) {
  const combined = `${normalizedJson(data.product)} ${currentPathText()}`;
  return (
    combined.includes("crs-composite-mukemmel-dayanimli-gecici-recinesi") ||
    combined.includes("crs composite") ||
    combined.includes("custom composite resin")
  );
}

function targetLooksLikeCrsComposite(data: Record<string, unknown>) {
  const targetMatch = targetSlugsMatch(data);
  if (targetMatch !== true) return false;
  const targets = propString(data.productBasedTargetSlugs).toLocaleLowerCase("tr");
  return targets.includes("crs-composite-mukemmel-dayanimli-gecici-recinesi") || targets.includes("crs composite");
}

function productLooksLikeCrsTray(data: Record<string, unknown>) {
  const combined = `${normalizedJson(data.product)} ${currentPathText()}`;
  return (
    combined.includes("crs-tray-resin-olcu-kasigi-3d-yazici-recinesi") ||
    combined.includes("crs tray") ||
    combined.includes("tray resin") ||
    combined.includes("olcu kasigi") ||
    combined.includes("ölçü kaşığı")
  );
}

function targetLooksLikeCrsTray(data: Record<string, unknown>) {
  const targetMatch = targetSlugsMatch(data);
  if (targetMatch !== true) return false;
  const targets = propString(data.productBasedTargetSlugs).toLocaleLowerCase("tr");
  return targets.includes("crs-tray-resin-olcu-kasigi-3d-yazici-recinesi") || targets.includes("crs tray");
}

function stripHtml(value: string) {
  return value
    .replace(/<\/(p|div|li|br|h[1-6])>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'");
}

function currentMatchTerms(product?: unknown) {
  const terms: string[] = [];
  if (typeof window !== "undefined") {
    const pathSlug = slugify(window.location.pathname);
    if (pathSlug && !["pages", "product", "products", "urun", "urunler"].includes(pathSlug)) terms.push(pathSlug);

    const titleSlug = slugify(document.title || "");
    if (titleSlug) terms.push(titleSlug);

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href || "";
    const ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]')?.content || "";
    for (const urlValue of [canonical, ogUrl]) {
      try {
        const url = new URL(urlValue);
        const urlSlug = slugify(url.pathname);
        if (urlSlug) terms.push(urlSlug);
      } catch {
        const urlSlug = slugify(urlValue);
        if (urlSlug) terms.push(urlSlug);
      }
    }

    const nextDataSlug = ((window as any).__NEXT_DATA__?.query?.slug ?? "") as unknown;
    if (typeof nextDataSlug === "string") terms.push(slugify(nextDataSlug));
  }

  if (isPlainObject(product)) {
    for (const key of ["slug", "handle", "url", "path", "href", "name", "title"]) {
      const term = slugify(propString(product[key]));
      if (term) terms.push(term);
    }
  }

  return Array.from(new Set(terms.filter((term) => term.length > 8)));
}

function hasMappedRows(value: unknown) {
  return stripHtml(propString(value))
    .split(/\r?\n/)
    .map((row) => row.trim())
    .filter(Boolean)
    .some((row) => row.includes("|") || row.includes("=>") || row.includes(","));
}

function productSpecificValueBySlug(value: unknown, product?: unknown) {
  const matchTerms = currentMatchTerms(product);
  if (!matchTerms.length) return "";

  const rows = stripHtml(propString(value))
    .split(/\r?\n/)
    .map((row) => row.trim())
    .filter(Boolean);

  let selected = "";
  let selectedLength = 0;

  function appendUrlPart(current: string, part: string) {
    if (!current) return part;
    if (/[?&]$/.test(current) || /^[A-Za-z0-9_-]+=/.test(part)) return `${current}${part}`;
    return `${current}${part}`;
  }

  for (let index = 0; index < rows.length; index += 1) {
    const row = rows[index];
    const separator = row.includes("|") ? "|" : row.includes("=>") ? "=>" : row.includes(",") ? "," : "";
    if (!separator) continue;
    const separatorIndex = row.indexOf(separator);
    const rawTarget = row.slice(0, separatorIndex);
    let nextValue = row.slice(separatorIndex + separator.length).trim();

    while (index + 1 < rows.length) {
      const following = rows[index + 1];
      const followingStartsNewMapping = following.includes("|") || following.includes("=>");
      if (followingStartsNewMapping) break;
      nextValue = appendUrlPart(nextValue, following);
      index += 1;
    }

    const target = slugify(rawTarget);
    if (!target || !nextValue) continue;
    const matchesTarget = matchTerms.some((term) => {
      if (term === target) return true;
      if (term.length >= 14 && term.includes(target)) return true;
      if (target.length >= 14 && target.includes(term)) return true;
      return false;
    });
    if (matchesTarget && target.length > selectedLength) {
      selected = nextValue;
      selectedLength = target.length;
    }
  }

  return selected;
}

function productBasedApplies(props: Props) {
  if (boolValue(props.productBasedEnabled) === false) return false;
  if (productBasedHidden(props)) return false;
  if (productBasedVisibilityOverride(props) === true) return true;
  const productBasedVideoUrlValue = text(props.productBasedVideoUrl) || DEFAULT_PRODUCT_BASED_VIDEO_URL_MAP;
  if (!filled(productBasedVideoUrlValue)) return false;
  const targetMatch = targetSlugsMatch(props as Record<string, unknown>);
  if (targetMatch !== undefined) return targetMatch;
  return props.product ? productMatchesCurrentPage(props.product) : true;
}

function productBasedProps(props: Props): Props {
  if (!productBasedApplies(props)) return props;

  return new Proxy(props as Record<string, unknown>, {
    get(target, prop) {
      if (typeof prop !== "string") return Reflect.get(target, prop);
      if (prop.startsWith("productBased")) return target[prop];
      const productBasedName = `productBased${pascal(prop)}`;
      const productBasedValue = target[productBasedName];
      if (filled(productBasedValue)) return productBasedValue;
      if (filled(ARGENZ_PRODUCT_BASED_DEFAULTS[productBasedName])) return ARGENZ_PRODUCT_BASED_DEFAULTS[productBasedName];
      return target[prop];
    },
  }) as Props;
}

function numberValue(value: unknown, fallback: number, min?: number, max?: number) {
  const next = Number(value);
  if (!Number.isFinite(next)) return fallback;
  return Math.min(max ?? next, Math.max(min ?? next, next));
}

function cssLength(value: unknown, fallback: number) {
  return `${numberValue(value, fallback)}px`;
}

function normalizedAlign(value: unknown) {
  const align = text(value, "center").toLowerCase();
  return ["left", "center", "right"].includes(align) ? align : "center";
}

function objectFit(value: unknown) {
  const fit = text(value, "cover").toLowerCase();
  return ["contain", "cover", "fill", "scale-down"].includes(fit) ? fit : "cover";
}

function imageSrc(value: unknown) {
  if (!value) return "";
  if (typeof value === "string") return value.trim();
  try {
    return getDefaultSrc(value as any) || propString(value);
  } catch {
    return propString(value);
  }
}

function addQuery(url: string, params: Record<string, string | number | boolean>) {
  try {
    const next = new URL(url);
    for (const [key, value] of Object.entries(params)) next.searchParams.set(key, String(value));
    return next.toString();
  } catch {
    const query = Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
      .join("&");
    return `${url}${url.includes("?") ? "&" : "?"}${query}`;
  }
}

function parseYoutubeTime(value: string) {
  const raw = decodeURIComponent(value).trim().toLowerCase();
  if (!raw) return 0;
  if (/^\d+$/.test(raw)) return Number(raw);

  const hours = Number(raw.match(/(\d+)h/)?.[1] || 0);
  const minutes = Number(raw.match(/(\d+)m/)?.[1] || 0);
  const seconds = Number(raw.match(/(\d+)s/)?.[1] || 0);
  return hours * 3600 + minutes * 60 + seconds;
}

function youtubeStart(value: string) {
  try {
    const url = new URL(value);
    return parseYoutubeTime(url.searchParams.get("start") || url.searchParams.get("t") || "");
  } catch {
    const match = value.match(/[?&](?:start|t)=([^&]+)/);
    return parseYoutubeTime(match?.[1] || "");
  }
}

function youtubeEmbed(value: string, autoplay: boolean, muted: boolean, loop: boolean, controls: boolean) {
  const raw = value.trim();
  if (!raw) return "";
  const id = youtubeId(raw);
  if (!id) return "";
  const start = youtubeStart(raw);
  const params: Record<string, string | number | boolean> = {
    rel: 0,
    playsinline: 1,
    controls: controls ? 1 : 0,
  };
  if (start > 0) params.start = start;
  if (autoplay) params.autoplay = 1;
  if (muted || autoplay) params.mute = 1;
  if (loop) {
    params.loop = 1;
    params.playlist = id;
  }
  return addQuery(`https://www.youtube-nocookie.com/embed/${id}`, params);
}

function youtubeId(value: string) {
  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, "");
    if (host === "youtu.be") return url.pathname.split("/").filter(Boolean)[0] || "";
    if (host.endsWith("youtube.com")) {
      const byQuery = url.searchParams.get("v");
      if (byQuery) return byQuery;
      const parts = url.pathname.split("/").filter(Boolean);
      const markerIndex = parts.findIndex((part) => ["embed", "shorts", "live"].includes(part));
      if (markerIndex >= 0) return parts[markerIndex + 1] || "";
    }
  } catch {
    const match = value.match(/(?:v=|youtu\.be\/|shorts\/|embed\/|live\/)([A-Za-z0-9_-]+)/);
    return match?.[1] || "";
  }
  const match = value.match(/(?:v=|youtu\.be\/|shorts\/|embed\/|live\/)([A-Za-z0-9_-]+)/);
  return match?.[1] || "";
}

function vimeoEmbed(value: string, autoplay: boolean, muted: boolean, loop: boolean, controls: boolean) {
  const raw = value.trim();
  if (!raw) return "";
  const match = raw.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (!match) return "";
  return addQuery(`https://player.vimeo.com/video/${match[1]}`, {
    autoplay: autoplay ? 1 : 0,
    muted: muted || autoplay ? 1 : 0,
    loop: loop ? 1 : 0,
    controls: controls ? 1 : 0,
  });
}

function embedUrl(value: string, autoplay: boolean, muted: boolean, loop: boolean, controls: boolean) {
  const raw = value.trim();
  if (!raw) return "";
  if (/youtube\.com|youtu\.be/i.test(raw)) return youtubeEmbed(raw, autoplay, muted, loop, controls);
  if (/vimeo\.com/i.test(raw)) return vimeoEmbed(raw, autoplay, muted, loop, controls);
  if (/\/embed\//i.test(raw) || /player\./i.test(raw)) {
    return addQuery(raw, {
      autoplay: autoplay ? 1 : 0,
      mute: muted || autoplay ? 1 : 0,
      muted: muted || autoplay ? 1 : 0,
      loop: loop ? 1 : 0,
      controls: controls ? 1 : 0,
    });
  }
  return "";
}

function isNativeVideo(value: string) {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(value.trim());
}

export function ThreeMashProductVideo(props: Props) {
  const sourceData = useSharedProductDetailData(props.product, (props as Record<string, unknown>).productTemplateJson);
  if (sourceData) {
    return (
      <ProductDetailSectionScope data={sourceData}>
        <ProductDetailVideoSection data={sourceData} />
      </ProductDetailSectionScope>
    );
  }
  const hasProductBasedMatch = productBasedApplies(props);
  const viewProps = hasProductBasedMatch ? productBasedProps(props) : props;
  const productVideoUrl = customText(props.product, ["product_video_url", "video_url", "tanitim_video_url", "urun_video_url", "ürün_video_url"]);
  const productBasedVideoUrlValue = text(props.productBasedVideoUrl) || DEFAULT_PRODUCT_BASED_VIDEO_URL_MAP;
  const slugMappedVideoUrl =
    productSpecificValueBySlug(productBasedVideoUrlValue, props.product) ||
    productSpecificValueBySlug((props as Record<string, unknown>).productBasedVideoUrlMap, props.product);
  const crsCompositeVideoUrl =
    productLooksLikeCrsComposite(props as Record<string, unknown>) || targetLooksLikeCrsComposite(props as Record<string, unknown>)
      ? "https://www.youtube.com/watch?v=IgBVfLPztPg"
      : "";
  const crsTrayVideoUrl =
    productLooksLikeCrsTray(props as Record<string, unknown>) || targetLooksLikeCrsTray(props as Record<string, unknown>)
      ? "https://www.youtube.com/watch?v=dNPHy_sd9aQ"
      : "";
  const productBasedVideoUrl = hasProductBasedMatch && !hasMappedRows(productBasedVideoUrlValue) ? productBasedVideoUrlValue : "";
  const videoUrl = slugMappedVideoUrl || crsCompositeVideoUrl || crsTrayVideoUrl || productBasedVideoUrl || productVideoUrl || text(props.videoUrl);
  const title = text(viewProps.titleText);
  const description = text(viewProps.descriptionHtml);
  const poster = imageSrc(viewProps.posterImage);
  const controls = viewProps.controlsEnabled !== false;
  const autoplay = viewProps.autoplayEnabled === true;
  const muted = viewProps.mutedEnabled === true || autoplay;
  const loop = viewProps.loopEnabled === true;
  const playsInline = viewProps.playsInlineEnabled !== false;
  const lazy = viewProps.lazyLoadEnabled !== false;
  const align = normalizedAlign(viewProps.textAlign);
  const embed = embedUrl(videoUrl, autoplay, muted, loop, controls);

  const style = {
    "--tmpv-bg": text(viewProps.backgroundColor, "#ffffff"),
    "--tmpv-text": text(viewProps.textColor, "#050505"),
    "--tmpv-muted": text(viewProps.mutedTextColor, "#171717"),
    "--tmpv-max": cssLength(viewProps.maxWidth, 1240),
    "--tmpv-video-max": cssLength(viewProps.videoMaxWidth, 1240),
    "--tmpv-pt": cssLength(viewProps.paddingTop, 72),
    "--tmpv-pb": cssLength(viewProps.paddingBottom, 72),
    "--tmpv-ratio": text(viewProps.videoAspectRatio, "16 / 9"),
    "--tmpv-radius": cssLength(viewProps.videoBorderRadius, 0),
    "--tmpv-fit": objectFit(viewProps.videoFit),
    "--tmpv-title-size": cssLength(viewProps.titleFontSize, 28),
    "--tmpv-body-size": cssLength(viewProps.bodyFontSize, 16),
    "--tmpv-text-gap": cssLength(viewProps.textSpacing, 24),
  } as any;

  return (
    <section id={text(viewProps.sectionAnchorId) || undefined} className="three-mash-product-video" style={style}>
      <div className="tmpv-wrap">
        {viewProps.showText !== false && (title || description) ? (
          <div className={`tmpv-copy tmpv-copy-${align}`}>
            {title ? <h2>{title}</h2> : null}
            {description ? <div className="tmpv-description" dangerouslySetInnerHTML={html(viewProps.descriptionHtml)} /> : null}
          </div>
        ) : null}

        <div className="tmpv-frame">
          {embed ? (
            <iframe
              src={embed}
              title={title || "Video"}
              loading={lazy ? "lazy" : undefined}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : videoUrl && isNativeVideo(videoUrl) ? (
            <video
              src={videoUrl}
              poster={poster || undefined}
              controls={controls}
              autoPlay={autoplay}
              muted={muted}
              loop={loop}
              playsInline={playsInline}
              preload={lazy ? "metadata" : "auto"}
            />
          ) : (
            <div className="tmpv-placeholder">{text(viewProps.placeholderText, "Video hazırlanıyor")}</div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ThreeMashProductVideo;
