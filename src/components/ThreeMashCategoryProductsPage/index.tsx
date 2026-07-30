import ThreeMashCategoryLanding from "../../sub-components/ThreeMashCategoryLanding";
import { dentalResinsCategoryData, printersCategoryData, categoryLandingDataFromKey } from "../../sub-components/ThreeMashCategoryLanding/presets";
import ThreeMashPrintersSourceLanding from "../../sub-components/ThreeMashPrintersSourceLanding";
import { ThreeMashProductsPage } from "../ThreeMashProductsPage";
import { listingProps } from "../ThreeMashProductListingPresets";
import type { Props } from "./types";

function currentLocationKeys() {
  if (typeof window === "undefined") return [];
  const activeSelector = '[aria-selected="true"], [aria-current="page"], [data-state="active"], [data-active="true"], .active, .selected';
  const keys = [
    window.location.href,
    window.location.pathname,
    window.location.search,
    window.location.hash,
    document.title,
  ];
  try {
    document.querySelectorAll(activeSelector).forEach((item) => {
      const text = item.textContent?.trim();
      if (text) keys.push(text);
    });
  } catch {
    // Ignore DOM lookup failures in storefront runtime.
  }
  try {
    keys.push(
      window.parent.location.href,
      window.parent.location.pathname,
      window.parent.location.search,
      window.parent.location.hash,
      window.parent.document?.title || "",
    );
    window.parent.document?.querySelectorAll(activeSelector).forEach((item) => {
      const text = item.textContent?.trim();
      if (text) keys.push(text);
    });
  } catch {
    // Studio preview can be cross-origin; ignore parent URL when it is not readable.
  }
  return keys;
}

function categoryEntityText(category: unknown): string {
  if (!category || typeof category !== "object") return "";
  const data = category as Record<string, unknown>;
  return [data.name, data.slug, data.path, data.href, data.url].filter(Boolean).join(" ");
}

function productListEntityText(productList: Props["productList"]): string {
  return (productList?.data || [])
    .slice(0, 12)
    .flatMap((product) => [
      product.name,
      (product as unknown as Record<string, unknown>).slug,
      product.brand?.name,
      ...(product.categories || []).flatMap((category) => [category.name, (category as unknown as Record<string, unknown>).slug]),
    ])
    .filter(Boolean)
    .join(" ");
}

export function ThreeMashCategoryProductsPage(props: Props) {
  const detectedCategoryData =
    categoryLandingDataFromKey(categoryEntityText(props.productList?.category)) ||
    categoryLandingDataFromKey(props.productList?.category?.name) ||
    categoryLandingDataFromKey(productListEntityText(props.productList)) ||
    currentLocationKeys().map(categoryLandingDataFromKey).find(Boolean);

  const categoryData =
    detectedCategoryData ||
    (props.categoryTemplate === "printers" ? printersCategoryData : null) ||
    (props.categoryTemplate === "dental-resins" ? dentalResinsCategoryData : null);

  if (categoryData === printersCategoryData) {
    return <ThreeMashPrintersSourceLanding />;
  }

  if (categoryData) {
    return <ThreeMashCategoryLanding data={categoryData} productList={props.productList} />;
  }

  return (
    <ThreeMashProductsPage
      {...listingProps(props, {
        eyebrowText: "ÜRÜN KATEGORİSİ",
        titleText: "",
        descriptionText: "Bu kategoriye bağlı aktif ürünleri canlı olarak inceleyin.",
        showSort: false,
      })}
    />
  );
}

export default ThreeMashCategoryProductsPage;
