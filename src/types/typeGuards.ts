/**
 * Type guard functions and safe casting utilities.
 * Use these instead of "as any" for safe type narrowing.
 *
 * Philosophy:
 * - Runtime checks are explicit and documented
 * - No silent failures or type-safety holes
 * - Compiled code is smaller than inline checks
 */

/**
 * Type guard: Check if value is a non-empty string.
 */
export function isString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

/**
 * Type guard: Check if value is a number within optional bounds.
 */
export function isNumber(
  value: unknown,
  min?: number,
  max?: number,
): value is number {
  if (typeof value !== "number" || isNaN(value)) return false;
  if (min !== undefined && value < min) return false;
  if (max !== undefined && value > max) return false;
  return true;
}

/**
 * Type guard: Check if value is a plain object (not null, array, etc).
 */
export function isPlainObject(value: unknown): value is Record<string, any> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    !(value instanceof Date) &&
    !(value instanceof RegExp)
  );
}

/**
 * Type guard: Check if object has required property with expected type.
 */
export function hasProperty<T extends Record<string, any>>(
  obj: unknown,
  key: string | number,
  typeCheck?: (v: any) => boolean,
): obj is T {
  if (!isPlainObject(obj)) return false;
  if (!(key in obj)) return false;
  if (typeCheck && !typeCheck(obj[key])) return false;
  return true;
}

/**
 * Safe access to potentially undefined nested properties.
 * Returns undefined instead of throwing.
 *
 * @example
 * const price = safeGet(product, ["selectedVariant", "price", "amount"]);
 */
export function safeGet<T = any>(
  obj: unknown,
  path: (string | number | symbol)[],
  defaultValue?: T,
): T | undefined {
  let current: any = obj;
  for (const key of path) {
    if (current == null) return defaultValue;
    current = current[key];
  }
  return current ?? defaultValue;
}

/**
 * Cast unknown value to object with property check.
 * Throws if type is wrong (better than silent undefined).
 *
 * @example
 * const config = castObject(window.__THREEMASH_CONFIG__, "merchantId");
 * console.log(config.merchantId); // Safe to access
 */
export function castObject<T extends Record<string, any>>(
  value: unknown,
  expectedProp?: keyof T,
): T {
  if (!isPlainObject(value)) {
    throw new TypeError(
      `Expected plain object, got ${typeof value}`,
    );
  }
  if (expectedProp && !(expectedProp in value)) {
    throw new TypeError(
      `Expected property "${String(expectedProp)}" not found in object`,
    );
  }
  return value as T;
}

/**
 * Safe call to optional function.
 * Returns result or undefined, never throws.
 *
 * @example
 * window.fbq?.("consent", "grant");  // Preact-style optional chaining
 * safeFunctionCall(window.fbq, "consent", "grant");  // Explicit, guaranteed safe
 */
export function safeFunctionCall<R = any>(
  fn: unknown,
  ...args: any[]
): R | undefined {
  if (typeof fn === "function") {
    try {
      return fn(...args) as R;
    } catch (e) {
      // Silently fail — third-party APIs can throw
      return undefined;
    }
  }
  return undefined;
}

/**
 * Get string value from various input types.
 * Used for normalizing user input, props, API responses.
 *
 * @example
 * const name = stringValue(props.name, "Unknown");
 */
export function stringValue(
  value: unknown,
  fallback: string = "",
): string {
  if (isString(value)) return value;
  if (typeof value === "number") return String(value);
  if (typeof value === "boolean") return value ? "true" : "false";
  return fallback;
}

/**
 * Get number value from various input types.
 * Used for normalizing user input, API responses.
 *
 * @example
 * const quantity = numberValue(input, 1, 1, 100);
 */
export function numberValue(
  value: unknown,
  fallback: number = 0,
  min?: number,
  max?: number,
): number {
  let num: number;

  if (typeof value === "number") {
    num = value;
  } else if (typeof value === "string") {
    num = parseFloat(value);
    if (isNaN(num)) return fallback;
  } else {
    return fallback;
  }

  if (min !== undefined && num < min) return fallback;
  if (max !== undefined && num > max) return fallback;
  return num;
}

/**
 * Type-safe array access with index bounds checking.
 *
 * @example
 * const first = arrayItem(products, 0);  // undefined if empty, never throws
 */
export function arrayItem<T>(arr: unknown, index: number): T | undefined {
  if (!Array.isArray(arr)) return undefined;
  if (index < 0 || index >= arr.length) return undefined;
  return arr[index] as T;
}
