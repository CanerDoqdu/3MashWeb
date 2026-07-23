import {
  getIkasOrderLineVariantMainImage,
  getSrc,
  type IkasOrderLineItem,
} from "@ikas/bp-storefront";

const threeMashMerchantId = "cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2";

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

export function orderLineImageUrlCandidates(item: IkasOrderLineItem, size: number) {
  const knownImage = knownProductImageUrl(item, size);
  if (knownImage) return [knownImage];

  const image = getIkasOrderLineVariantMainImage(item.variant);
  const imageId = image?.id?.trim();

  if (!image || !imageId) return [];
  if (/^https?:\/\//i.test(imageId)) return [imageId];
  if (isBareImageId(imageId)) {
    return [
      merchantImageUrl(imageId, size),
      merchantImageUrl(imageId, 1080),
      `https://cdn.myikas.com/images/${imageId}/image_${size}.webp`,
      `https://cdn.myikas.com/images/${imageId}/image_1080.webp`,
    ];
  }

  const safeImage = image;
  const src = getSrc(safeImage, size);
  return src.includes("/undefined/") || src.includes("/null/") ? [] : [src];
}
