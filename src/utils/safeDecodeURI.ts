/**
 * Safely decodes a URI component.
 *
 * Returns the input unchanged if decoding fails (invalid UTF-8).
 * This prevents DoS-by-crafted-hash (#%FF%FF%FF).
 */
export function safeDecodeURI(value: string): string {
  if (!value) return value;

  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
