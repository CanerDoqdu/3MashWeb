import { IkasStorefrontConfig } from "@ikas/bp-storefront";

function isTrustedHost(hostname: string, domain: string): boolean {
  return hostname === domain || hostname.endsWith(`.${domain}`);
}

/**
 * Returns true ONLY when running inside the ikas theme visual customizer / studio editor.
 * Standalone top-level browser windows (e.g. testing on *.myikas.com or live domains)
 * are NEVER studio environments, preventing auth bypasses for real users.
 */
export function isStudioEnvironment(): boolean {
  if (typeof window === "undefined") return false;

  // 1. Direct ikas editor config inspection
  try {
    if (typeof IkasStorefrontConfig !== "undefined") {
      if ((IkasStorefrontConfig as any).isEditor === true) return true;
      if (
        typeof (IkasStorefrontConfig as any).getIsPreview === "function" &&
        (IkasStorefrontConfig as any).getIsPreview() === true &&
        window.self !== window.top
      ) {
        return true;
      }
    }
  } catch {}

  // 2. Query param explicitly set by the ikas visual customizer iframe
  try {
    const search = window.location.search;
    if (
      (search.includes("ikas-editor=true") ||
        search.includes("isEditor=true") ||
        search.includes("studio=true")) &&
      window.self !== window.top
    ) {
      return true;
    }
  } catch {}

  // 3. Iframe check: The ikas theme editor embeds the storefront inside an iframe
  // on admin / customizer domains. If window.self === window.top, it is a standalone
  // browser tab/window and MUST NOT be treated as the editor.
  try {
    const isInIframe = window.self !== window.top;
    if (isInIframe) {
      const hostname = window.location.hostname.toLowerCase();
      if (
        isTrustedHost(hostname, "ikasapps.com") ||
        isTrustedHost(hostname, "myikas.com")
      ) {
        return true;
      }
    }
  } catch {
    // Cross-origin access to window.top throws only when embedded inside an external iframe (ikas admin)
    const hostname = window.location.hostname.toLowerCase();
    if (
      isTrustedHost(hostname, "ikasapps.com") ||
      isTrustedHost(hostname, "myikas.com")
    ) {
      return true;
    }
  }

  return false;
}