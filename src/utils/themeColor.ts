const themeColorAliases: Record<string, string> = {
  "3mash accent": "var(--tm-theme-accent, #C7F136)",
  "3mash background": "var(--tm-theme-bg, #FAFAF7)",
  "3mash text": "var(--tm-theme-text, #0E0E0C)",
};

export function resolveThemeColor(value: unknown): string {
  if (typeof value !== "string") return "";

  const trimmed = value.trim();
  return themeColorAliases[trimmed.toLowerCase()] ?? trimmed;
}

export function resolveThemeColorWithAlpha(
  value: unknown,
  alphaSuffix: string,
  opacityPercent: number,
): string {
  const color = resolveThemeColor(value);
  if (!color) return "";
  return color.startsWith("var(")
    ? `color-mix(in srgb, ${color} ${opacityPercent}%, transparent)`
    : `${color}${alphaSuffix}`;
}
