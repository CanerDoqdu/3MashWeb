import { useEffect, useRef, useState } from "preact/hooks";
import { apiSearchProducts, getProductListInitialData, initProductList, type IkasProduct, type IkasProductList } from "@ikas/bp-storefront";
import { renderSolutionHtml, ThreeMashStaticSection } from "../../sub-components/ThreeMashSectionRenderer";
import { Props } from "./types";
import { sanitizeHtml } from "../../utils/sanitizeHtml";
import { debugError } from "../../utils/debugError";

type SelectedProductRef = {
  productId: string;
  variantId: string;
};

function selectedProductRef(source: unknown): SelectedProductRef | null {
  if (typeof source === "string") return { productId: source, variantId: "" };
  if (!source || typeof source !== "object") return null;
  const item = source as {
    productId?: unknown;
    variantId?: unknown;
    id?: unknown;
    product?: { id?: unknown };
    variant?: { id?: unknown };
    value?: {
      productId?: unknown;
      variantId?: unknown;
      id?: unknown;
      product?: { id?: unknown };
      variant?: { id?: unknown };
    };
  };
  const productId = item.productId || item.product?.id || item.value?.productId || item.value?.product?.id || item.value?.id || item.id;
  if (typeof productId !== "string" || !productId) return null;

  const variantId = item.variantId || item.variant?.id || item.value?.variantId || item.value?.variant?.id || "";
  return {
    productId,
    variantId: typeof variantId === "string" ? variantId : "",
  };
}

function productListPropValue(source: unknown): IkasProductList["productListPropValue"] | null {
  if (!source || typeof source !== "object") return null;
  const item = source as {
    productListPropValue?: IkasProductList["productListPropValue"];
    productListType?: IkasProductList["productListPropValue"]["productListType"];
  };
  if (item.productListPropValue) return item.productListPropValue;
  if (item.productListType) return item as IkasProductList["productListPropValue"];
  return null;
}

function normalizeProductList(source: Props["productList"] | undefined): IkasProductList | undefined {
  if (!source) return undefined;

  const list = source as IkasProductList;
  if (Array.isArray(list.data) && list.productListPropValue) return list;

  const propValue = productListPropValue(source);
  if (!propValue) return undefined;

  return initProductList({
    type: propValue.productListType || "ALL",
    sort: propValue.initialSort || "DEFAULT",
    limit: propValue.initialLimit || propValue.productCount || 6,
    pageType: propValue.brand ? "BRAND" : propValue.category ? "CATEGORY" : "CUSTOM",
    filterBrandId: propValue.brand || undefined,
    filterCategoryId: propValue.category || undefined,
    productListPropValue: {
      ...propValue,
      productIds: propValue.productIds || [],
    },
  });
}

function selectedProductRefs(productList: IkasProductList | undefined) {
  return (productList?.productListPropValue?.productIds || []).map(selectedProductRef).filter((item): item is SelectedProductRef => Boolean(item));
}

function needsProductListRefresh(productList: IkasProductList | undefined) {
  if (!productList || productList.isLoading) return false;
  if (!productList.data || productList.data.length === 0) return true;

  const selectedRefs = selectedProductRefs(productList);
  const selectedIds = selectedRefs.map((item) => item.productId);
  const dataIds = (productList?.data || []).map((product) => product?.id).filter(Boolean);
  const uniqueDataIds = new Set(dataIds);

  if (selectedIds.length <= 1) {
    return dataIds.length > 1 && uniqueDataIds.size === 1;
  }

  const uniqueSelectedIds = new Set(selectedIds);

  return uniqueDataIds.size < Math.min(uniqueSelectedIds.size, 6);
}

function orderedProducts(products: IkasProduct[], selectedRefs: SelectedProductRef[]) {
  const productsById = new Map(products.map((product) => [product.id, product]));
  return selectedRefs
    .map((ref) => {
      const product = productsById.get(ref.productId);
      if (!product) return null;

      const variant = ref.variantId ? product.variants?.find((item) => item.id === ref.variantId) : null;
      if (variant) product.selectedVariantValues = variant.variantValues;

      return product;
    })
    .filter((product): product is IkasProduct => Boolean(product));
}

async function fetchRecentStoreProducts(productList: IkasProductList) {
  const liveAllProducts = initProductList({
    type: "ALL",
    sort: productList.sort || "DEFAULT",
    limit: Math.max(productList.limit || 6, 20),
    pageType: "CUSTOM",
    excludedFields: productList.excludedFields || undefined,
    productListPropValue: {
      id: "",
      productListType: "ALL",
      initialSort: productList.sort || "DEFAULT",
      initialLimit: Math.max(productList.limit || 6, 20),
      productCount: null,
      productIds: [],
      usePageFilter: false,
      category: null,
      brand: null,
      relatedProductsType: null,
    },
  });

  await getProductListInitialData(liveAllProducts);

  return (liveAllProducts.data || []).slice(0, 6);
}

export function ThreeMashSolution(props: Props) {
  const [resolvedProducts, setResolvedProducts] = useState<IkasProduct[] | null>(null);
  const refreshRequestKeyRef = useRef("");
  const normalizedProductList = normalizeProductList(props.productList);
  const productList = resolvedProducts && normalizedProductList ? { ...normalizedProductList, data: resolvedProducts } : normalizedProductList;
  const dynamicProps = { ...props, productList, sectionHtml: undefined, contentHtml: undefined };

  useEffect(() => {
    const productList = normalizeProductList(props.productList);
    if (!needsProductListRefresh(productList)) return;
    if (!productList) return;

    const selectedRefs = selectedProductRefs(productList);
    const requestKey =
      selectedRefs.map((item) => `${item.productId}:${item.variantId}`).join("|") ||
      [
        productList.type,
        productList.sort,
        productList.limit,
        productList.productListPropValue?.category || productList.filterCategoryId || "",
        productList.productListPropValue?.brand || productList.filterBrandId || "",
      ].join("|");
    if (refreshRequestKeyRef.current === requestKey) return;
    refreshRequestKeyRef.current = requestKey;

    let isMounted = true;
    getProductListInitialData(productList)
      .then(async () => {
        const loadedProducts = productList.data || [];
        if (!selectedRefs.length) {
          if (isMounted && loadedProducts.length > 0) {
            setResolvedProducts(loadedProducts.slice(0, 6));
            return;
          }

          const recentProducts = await fetchRecentStoreProducts(productList);
          if (isMounted && recentProducts.length > 0) setResolvedProducts(recentProducts);
          return;
        }

        const refreshedProducts = orderedProducts(loadedProducts, selectedRefs);
        if (refreshedProducts.length >= Math.min(new Set(selectedRefs.map((item) => item.productId)).size, 6)) {
          if (isMounted) setResolvedProducts(refreshedProducts);
          return;
        }

        const response = await apiSearchProducts({
          input: {
            productIdList: selectedRefs.map((item) => item.productId),
            page: 1,
            perPage: Math.max(selectedRefs.length, 20),
          },
        } as Parameters<typeof apiSearchProducts>[0], productList.excludedFields || []);

        const apiProducts = response.data?.data || [];
        const orderedApiProducts = orderedProducts(apiProducts, selectedRefs);
        if (isMounted && orderedApiProducts.length > 0) {
          setResolvedProducts(orderedApiProducts);
          return;
        }

        const recentProducts = await fetchRecentStoreProducts(productList);
        if (isMounted && recentProducts.length > 0) setResolvedProducts(recentProducts);
      })
      .catch((error) => {
        debugError("ThreeMashSolution product list refresh failed", error);
      });

    return () => {
      isMounted = false;
    };
  }, [props.productList]);

  return <ThreeMashStaticSection props={dynamicProps} fallback={renderSolutionHtml(dynamicProps)} />;
}

export default ThreeMashSolution;
