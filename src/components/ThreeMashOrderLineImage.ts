import {
  apiSearchProducts,
  baseStore,
  bs_searchProductsById,
  getIkasOrderLineVariantMainImage,
  getProductVariantMainImage,
  getSrc,
  type IkasProduct,
  type IkasProductVariant,
  type IkasOrderLineItem,
} from "@ikas/bp-storefront";

const threeMashMerchantId = "cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2";
const orderLineImageFallbackStorageKey =
  "threeMashOrderLineImageFallbacks_v2";

const knownOrderLineImageIds: Array<{ pattern: RegExp; imageId: string }> = [
  { pattern: /crs\s+composite/i, imageId: "d875a523-2228-44a7-818d-022312b0a44d" },
  { pattern: /crs\s+model/i, imageId: "36167f47-c92f-4660-967c-d4a8faa86006" },
];

function isBareImageId(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

function merchantImageUrl(imageId: string, size: number) {
  return `https://cdn.myikas.com/images/${threeMashMerchantId}/${imageId}/image_${size}.webp`;
}

function knownProductImageUrl(item: IkasOrderLineItem, size: number) {
  const name = item.variant?.name || "";
  const match = knownOrderLineImageIds.find((entry) => entry.pattern.test(name));
  return match ? merchantImageUrl(match.imageId, size) : "";
}

export function orderLineImageUrl(item: IkasOrderLineItem, size: number) {
  return orderLineImageUrlCandidates(item, size)[0] || "";
}

export function orderLineImageUrlCandidates(
  item: IkasOrderLineItem,
  size: number
) {
  const knownImage = knownProductImageUrl(item, size);

  if (knownImage) {
    return [knownImage];
  }

  const refs = unique([
    imageRef(getIkasOrderLineVariantMainImage(item.variant)),
    ...imageRefsFromOrderLine(item),
    ...storedImageRefsForOrderLine(item),
  ].filter(Boolean));

  // First try the actual URLs/references directly.
  const directUrls = refs
    .map((ref) => {
      if (typeof ref !== "string") return null;

      // Already a usable URL
      if (
        ref.startsWith("http://") ||
        ref.startsWith("https://") ||
        ref.startsWith("//")
      ) {
        return ref;
      }

      return null;
    })
    .filter(Boolean) as string[];

  if (directUrls.length) {
    return unique(directUrls);
  }

  // Only use URL guessing as a last resort.
  return unique(
    refs.flatMap((ref) => imageRefCandidates(ref, size)).slice(0, 3)
  );
}

export function rememberOrderLineImageFallback(product: IkasProduct, variant: IkasProductVariant, extraRefs: string[] = []) {
  const refs = unique([...extraRefs, ...productVariantImageRefs(variant)]);
  const variantId = variant.id?.trim();
  if (!variantId || refs.length === 0 || typeof localStorage === "undefined") return;

  try {
    const stored = JSON.parse(localStorage.getItem(orderLineImageFallbackStorageKey) || "{}") as Record<string, string[]>;
    stored[variantId] = unique(refs);
    if (product.id) stored[`product:${product.id}`] = unique([...(stored[`product:${product.id}`] || []), ...refs]);
    if (product.name) stored[`name:${normalizedProductText(product.name)}`] = unique([...(stored[`name:${normalizedProductText(product.name)}`] || []), ...refs]);
    localStorage.setItem(orderLineImageFallbackStorageKey, JSON.stringify(stored));
  } catch {
    // Cart image fallback is a UI enhancement; ignore storage failures.
  }
}

export async function hydrateMissingOrderLineImageFallbacks(items: IkasOrderLineItem[]) {
const missingItems = items.filter(
  (item) => !item.deleted
);  const productIds = unique(missingItems.map((item) => item.variant?.productId?.trim() || ""));

  try {
    const result = productIds.length ? await bs_searchProductsById(baseStore, { productIds }) : null;
    const products = result?.products || [];
    const unresolvedItems: IkasOrderLineItem[] = [];

    missingItems.forEach((item) => {
      const product = findMatchingProduct(item, products);
      if (!product) {
        unresolvedItems.push(item);
        return;
      }

      const variant = findMatchingVariant(item, product);
      if (!variant) return;

      rememberOrderLineItemImageFallback(item, product, variant);
    });

    const searchedProducts = await hydrateOrderLineImagesBySearch(unresolvedItems);
    return products.length > 0 || searchedProducts;
  } catch {
    return false;
  }
}

async function hydrateOrderLineImagesBySearch(items: IkasOrderLineItem[]) {
  let matched = false;

  for (const item of items) {
    const query = cartSearchQuery(item);
    if (!query) continue;

    try {
      const result = await apiSearchProducts({ input: { query, perPage: 8 } });
      const products = result.data?.data || [];
      const product = findMatchingProduct(item, products) || products[0] || null;
      const variant = product ? findMatchingVariant(item, product) : null;
      if (!product || !variant) continue;

      rememberOrderLineItemImageFallback(item, product, variant);
      matched = true;
    } catch {
      // Continue with the next cart item.
    }
  }

  return matched;
}

function findMatchingProduct(item: IkasOrderLineItem, products: IkasProduct[]) {
  const productId = item.variant?.productId?.trim();
  const itemName = normalizedProductText(item.variant?.name);

  return (
    products.find((product) => productId && product.id === productId) ||
    products.find((product) => itemName && normalizedProductText(product.name) === itemName) ||
    products.find((product) => itemName && itemName.includes(normalizedProductText(product.name))) ||
    products.find((product) => itemName && normalizedProductText(product.name).includes(itemName)) ||
    null
  );
}

function findMatchingVariant(item: IkasOrderLineItem, product: IkasProduct) {
  const itemName = normalizedProductText(item.variant?.name);
  return (
    product.variants?.find((entry) => entry.id === item.variant?.id) ||
    product.variants?.find((entry) => entry.sku && entry.sku === item.variant?.sku) ||
    product.variants?.find((entry) => itemName && normalizedProductText(product.name).includes(itemName)) ||
    product.variants?.[0] ||
    null
  );
}

function cartSearchQuery(item: IkasOrderLineItem) {
  const slug = item.variant?.slug?.trim();
  const sku = item.variant?.sku?.trim();
  const name = item.variant?.name?.trim();
  return sku || name || slug?.replace(/[-/]+/g, " ") || "";
}

function normalizedProductText(value: unknown) {
  return String(value || "")
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function rememberOrderLineItemImageFallback(item: IkasOrderLineItem, product: IkasProduct, variant: IkasProductVariant) {
  const refs = productVariantImageRefs(variant);
  if (refs.length === 0 || typeof localStorage === "undefined") return;

  try {
    const stored = JSON.parse(localStorage.getItem(orderLineImageFallbackStorageKey) || "{}") as Record<string, string[]>;
    if (item.id) stored[`item:${item.id}`] = refs;
    if (item.variant?.id) stored[item.variant.id] = unique([...(stored[item.variant.id] || []), ...refs]);
    if (variant.id) stored[variant.id] = unique([...(stored[variant.id] || []), ...refs]);
    if (product.id) stored[`product:${product.id}`] = unique([...(stored[`product:${product.id}`] || []), ...refs]);
    if (item.variant?.name) stored[`name:${normalizedProductText(item.variant.name)}`] = unique([...(stored[`name:${normalizedProductText(item.variant.name)}`] || []), ...refs]);
    if (product.name) stored[`name:${normalizedProductText(product.name)}`] = unique([...(stored[`name:${normalizedProductText(product.name)}`] || []), ...refs]);
    localStorage.setItem(orderLineImageFallbackStorageKey, JSON.stringify(stored));
  } catch {
    // Cart image fallback is a UI enhancement; ignore storage failures.
  }
}

function productVariantImageRefs(variant: IkasProductVariant) {
  return unique([
    imageRef(getProductVariantMainImage(variant)?.image),
    imageRef(getProductVariantMainImage(variant)),
    ...((variant.images || []).flatMap((item) => [imageRef(item?.image), imageRef(item)])),
  ]);
}

function imageRef(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (!value || typeof value !== "object") return "";

  const data = value as {
    id?: unknown;
    url?: unknown;
    src?: unknown;
    imageUrl?: unknown;
    imageId?: unknown;
    thumbnailUrl?: unknown;
    thumbnailImageId?: unknown;
    value?: unknown;
    mainImageId?: unknown;
    image?: unknown;
    file?: unknown;
  };

  const nestedImage =
    data.image && typeof data.image === "object"
      ? imageRef(data.image)
      : "";

  const nestedFile =
    data.file && typeof data.file === "object"
      ? imageRef(data.file)
      : "";

  const candidates = [
    data.url,
    data.src,
    data.imageUrl,
    data.imageId,
    data.thumbnailUrl,
    data.thumbnailImageId,
    data.mainImageId,

    // Actual nested image before generic object ID.
    nestedImage,
    nestedFile,

    data.value,

    // Generic id MUST be last.
    data.id,
  ];

  const found = candidates.find(
    (candidate) =>
      typeof candidate === "string" &&
      candidate.trim()
  );

  return typeof found === "string" ? found.trim() : "";
}

function imageRefsFromImageLike(value: unknown): string[] {
  if (!value || typeof value !== "object") {
    const ref = imageRef(value);
    return ref ? [ref] : [];
  }

  const data = value as {
    image?: unknown;
    file?: unknown;
  };

  return unique([
    imageRef(data.image),
    imageRef(data.file),
    imageRef(value),
  ]);
}

function imageRefsFromOrderLine(item: IkasOrderLineItem) {
  const data = item as unknown as {
    image?: unknown;
    images?: unknown;
    product?: {
      image?: unknown;
      images?: unknown;
      mainImage?: unknown;
      mainImageId?: unknown;
      thumbnailImage?: unknown;
    };
  };

  const variant = item.variant as unknown as {
    image?: unknown;
    images?: unknown;
    mainImage?: unknown;
    mainImageId?: unknown;
    thumbnailImage?: unknown;
  };

  return [
    imageRef(data.image),

    ...(Array.isArray(data.images)
      ? data.images.flatMap((image) => imageRefsFromImageLike(image))
      : []),

    imageRef(data.product?.mainImage),
    imageRef(data.product?.mainImageId),
    imageRef(data.product?.thumbnailImage),
    imageRef(data.product?.image),

    ...(Array.isArray(data.product?.images)
      ? data.product.images.flatMap((image) => imageRefsFromImageLike(image))
      : []),

    imageRef(variant.mainImage),
    imageRef(variant.mainImageId),
    imageRef(variant.thumbnailImage),
    imageRef(variant.image),

    ...(Array.isArray(variant.images)
      ? variant.images.flatMap((image) => imageRefsFromImageLike(image))
      : []),
  ].filter(Boolean);
}

function storedImageRefsForOrderLine(item: IkasOrderLineItem) {
  if (typeof localStorage === "undefined") return [];

  try {
    const stored = JSON.parse(localStorage.getItem(orderLineImageFallbackStorageKey) || "{}") as Record<string, string[]>;
    const itemId = item.id?.trim();
    const variantId = item.variant?.id?.trim();
    const productId = item.variant?.productId?.trim();
    const itemName = normalizedProductText(item.variant?.name);
    return unique([
      ...(itemId ? stored[`item:${itemId}`] || [] : []),
      ...(variantId ? stored[variantId] || [] : []),
      ...(productId ? stored[`product:${productId}`] || [] : []),
      ...(itemName ? stored[`name:${itemName}`] || [] : []),
    ]);
  } catch {
    return [];
  }
}

function imageRefCandidates(ref: string, size: number) {
  const trimmed = ref.trim();

  if (!trimmed) return [];

  // Already a complete image URL — use it directly.
  if (/^https?:\/\//i.test(trimmed)) {
    return [trimmed];
  }

  // Theme images already have a known CDN structure.
  if (trimmed.startsWith("theme-images/")) {
    return [
      `https://cdn.myikas.com/images/${trimmed}/image_${size}.webp`,
    ];
  }

  // Ikas image ID: let getSrc generate the canonical URL.
  const src = getSrc({ id: trimmed }, size);

  if (
    src &&
    !src.includes("/undefined/") &&
    !src.includes("/null/")
  ) {
    return [src];
  }

  // Last-resort fallback only.
  if (isBareImageId(trimmed)) {
    return [
      `https://cdn.myikas.com/images/${trimmed}/image_${size}.webp`,
    ];
  }

  return [];
}

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}
