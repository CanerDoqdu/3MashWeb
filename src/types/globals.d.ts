/**
 * Global type augmentation for browser APIs and third-party scripts.
 * This file declares ambient types for window globals and external libraries.
 *
 * Usage:
 * - IDE autocomplete works correctly
 * - No "as any" needed for known globals
 * - Type-safe access to merchant configs and third-party APIs
 */

declare global {
  interface Window {
    /**
     * Meta Pixel (Facebook) tracking API.
     * Available when Meta Pixel script is loaded.
     */
    fbq?: (event: string, action: string, data?: Record<string, any>) => void;

    /**
     * Google Analytics 4 tracking API.
     * Available when GA4 script is loaded.
     */
    gtag?: (command: string, action: string, data?: Record<string, any>) => void;

    /**
     * Google Tag Manager dataLayer.
     * Available when GTM script is loaded.
     */
    dataLayer?: Array<Record<string, any>>;

    /**
     * Three Mash theme configuration object.
     * Runtime-configured by merchant or environment variables.
     */
    __THREEMASH_CONFIG__?: {
      merchantId?: string;
      whatsappNumber?: string;
      mapsQuery?: string;
      [key: string]: any;
    };

    /**
     * Merchant's custom error tracking callback.
     * If defined, errors are reported to merchant's own tracking service.
     * Use `debugError()` utility to report errors safely.
     */
    __MERCHANT_ERROR_TRACKER?: (label: string, error: any) => void;

    /**
     * ikas Storefront runtime API.
     * Provided by ikas framework for accessing store data and utilities.
     */
    __IKAS_STOREFRONT_API__?: any;

    /**
     * Next.js page data (pages router).
     * Available in Next.js apps at runtime. Contains build-time props and query params.
     */
    __NEXT_DATA__?: {
      props?: Record<string, any>;
      query?: Record<string, string | string[]>;
      page?: string;
      [key: string]: any;
    };
  }
}

export {};
