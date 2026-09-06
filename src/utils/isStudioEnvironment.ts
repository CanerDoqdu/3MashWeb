function isTrustedHost(hostname: string, domain: string) {
  return hostname === domain || hostname.endsWith(`.${domain}`);
}

export function isStudioEnvironment() {
  if (typeof window === "undefined") return false;
  const hostname = window.location.hostname.toLowerCase();
  return (
    isTrustedHost(hostname, "ikasapps.com") ||
    isTrustedHost(hostname, "myikas.com")
  );
}