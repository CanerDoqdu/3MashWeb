import { stringValue, castObject, isString } from "../types/typeGuards";

type BusinessConfig = {
  merchantId: string;
  whatsappNumber: string;
  mapsQuery: string;
  recipientEmail: string;
};

const defaultConfig: BusinessConfig = {
  merchantId: "cf198e6e-64d0-4718-8ad4-1fc8e54e3dd2",
  whatsappNumber: "905314326577",
  mapsQuery: "Antalya Teknokent, Konyaaltı",
  recipientEmail: "info@3mash.com",
};

function getRuntimeConfig(): BusinessConfig {
  // Environment variables (from build or runtime)
  const runtimeEnv =
    typeof window !== "undefined" && (window as any).__THREEMASH_ENV__
      ? (window as any).__THREEMASH_ENV__
      : typeof process !== "undefined"
        ? process.env
        : {};

  // Runtime config object (merchant-provided). Do not touch window during SSR/module evaluation.
  const runtime =
    typeof window !== "undefined" && (window as any).__THREEMASH_CONFIG__
      ? (window as any).__THREEMASH_CONFIG__
      : {};

  // Merge and return
  return {
    merchantId:
      runtime.merchantId ??
      runtimeEnv.VITE_THREEMASH_MERCHANT_ID ??
      defaultConfig.merchantId,
    whatsappNumber:
      runtime.whatsappNumber ??
      runtimeEnv.VITE_THREEMASH_WHATSAPP_NUMBER ??
      defaultConfig.whatsappNumber,
    mapsQuery:
      runtime.mapsQuery ??
      runtimeEnv.VITE_THREEMASH_MAPS_QUERY ??
      defaultConfig.mapsQuery,
    recipientEmail:
      runtime.recipientEmail ??
      runtimeEnv.VITE_THREEMASH_RECIPIENT_EMAIL ??
      defaultConfig.recipientEmail,
  };
}

export const businessConfig = getRuntimeConfig();

export function getMerchantImageBaseUrl() {
  return `https://cdn.myikas.com/images/${businessConfig.merchantId}/`;
}

export function getWhatsAppHref(message?: string) {
  const encodedMessage = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${businessConfig.whatsappNumber}${encodedMessage}`;
}

export function getGoogleMapsHref(query = businessConfig.mapsQuery) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
