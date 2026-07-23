import { useEffect, useRef, useState } from "preact/hooks";
import { apiSearchProducts, getProductListInitialData, type IkasProduct } from "@ikas/bp-storefront";
import { renderSolutionHtml, ThreeMashStaticSection } from "../../sub-components/ThreeMashSectionRenderer";
import { Props } from "./types";

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

function selectedProductRefs(productList: Props["productList"] | undefined) {
  return (productList?.productListPropValue?.productIds || []).map(selectedProductRef).filter((item): item is SelectedProductRef => Boolean(item));
}

function needsProductListRefresh(productList: Props["productList"] | undefined) {
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

export function ThreeMashSolution(props: Props) {
  const [resolvedProducts, setResolvedProducts] = useState<IkasProduct[] | null>(null);
  const refreshRequestKeyRef = useRef("");
  const productList = resolvedProducts && props.productList ? { ...props.productList, data: resolvedProducts } : props.productList;
  const dynamicProps = { ...props, productList, sectionHtml: undefined, contentHtml: undefined };

  useEffect(() => {
    const productList = props.productList;
    if (!needsProductListRefresh(productList)) return;

    const selectedRefs = selectedProductRefs(productList);
    const requestKey = selectedRefs.map((item) => `${item.productId}:${item.variantId}`).join("|");
    if (!requestKey || refreshRequestKeyRef.current === requestKey) return;
    refreshRequestKeyRef.current = requestKey;

    let isMounted = true;
    getProductListInitialData(productList)
      .then(async () => {
        const refreshedProducts = orderedProducts(productList.data || [], selectedRefs);
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
        }
      })
      .catch((error) => {
        console.error("ThreeMashSolution product list refresh failed", error);
      });

    return () => {
      isMounted = false;
    };
  }, [props.productList]);

  return <ThreeMashStaticSection props={dynamicProps} fallback={renderSolutionHtml(dynamicProps)} />;
}

export default ThreeMashSolution;
