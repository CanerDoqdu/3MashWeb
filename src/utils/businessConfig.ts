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
  const runtimeEnv =
    (globalThis as typeof globalThis & {
      __THREEMASH_ENV__?: Record<string, string | undefined>;
      process?: { env?: Record<string, string | undefined> };
    }).__THREEMASH_ENV__ ??
    (globalThis as typeof globalThis & { process?: { env?: Record<string, string | undefined> } }).process?.env ??
    {};

  const runtime =
    typeof window !== "undefined"
      ? ((window as typeof window & { __THREEMASH_CONFIG__?: Partial<BusinessConfig> }).__THREEMASH_CONFIG__ ?? {})
      : {};

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
