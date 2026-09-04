export function isStudioEnvironment() {
  if (typeof window === "undefined") return false;
  return (
    window.location.hostname.includes("ikasapps.com") ||
    window.location.hostname.includes("myikas.com") ||
    (typeof window.parent !== "undefined" && window.parent !== window)
  );
}