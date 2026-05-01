const BLACK = "#000000";
const WHITE = "#FFFFFF";
const DEFAULT_CONTRAST_CANDIDATES = [BLACK, WHITE] as const;

export function normalizeHexColor(color: string): string | null {
  const value = color.trim();
  const shorthandResult = /^#?([a-f\d])([a-f\d])([a-f\d])$/i.exec(value);

  if (shorthandResult) {
    const [, r, g, b] = shorthandResult;
    return `#${r}${r}${g}${g}${b}${b}`.toUpperCase();
  }

  const result = /^#?([a-f\d]{6})$/i.exec(value);

  return result ? `#${result[1].toUpperCase()}` : null;
}

export function isHexColor(color: string): boolean {
  return normalizeHexColor(color) !== null;
}

/**
 * Parses a hex color string and returns its RGB components.
 * Supports 3-digit (#RGB) and 6-digit (#RRGGBB) formats.
 * @param hex The hex color string.
 * @returns An array [r, g, b] or null if the format is invalid.
 */
export function parseHexColor(hex: string): [number, number, number] | null {
  const normalizedHex = normalizeHexColor(hex);

  if (!normalizedHex) {
    return null;
  }

  return [
    parseInt(normalizedHex.slice(1, 3), 16),
    parseInt(normalizedHex.slice(3, 5), 16),
    parseInt(normalizedHex.slice(5, 7), 16),
  ];
}

function getLinearizedSrgbChannel(value: number): number {
  const sRgb = value / 255;
  return sRgb <= 0.03928 ? sRgb / 12.92 : Math.pow((sRgb + 0.055) / 1.055, 2.4);
}

export function getRelativeLuminance(color: string): number | null {
  const rgb = parseHexColor(color);
  if (!rgb) {
    return null;
  }

  const [r, g, b] = rgb;

  return 0.2126 * getLinearizedSrgbChannel(r) +
    0.7152 * getLinearizedSrgbChannel(g) +
    0.0722 * getLinearizedSrgbChannel(b);
}

export function getContrastRatio(
  foreground: string,
  background: string,
): number | null {
  const foregroundLuminance = getRelativeLuminance(foreground);
  const backgroundLuminance = getRelativeLuminance(background);

  if (foregroundLuminance === null || backgroundLuminance === null) {
    return null;
  }

  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);

  return (lighter + 0.05) / (darker + 0.05);
}

export function getBestContrastColor(
  background: string,
  candidates: readonly string[] = DEFAULT_CONTRAST_CANDIDATES,
): string | null {
  let bestColor: string | null = null;
  let bestContrastRatio = -Infinity;

  for (const candidate of candidates) {
    const normalizedCandidate = normalizeHexColor(candidate);
    if (!normalizedCandidate) {
      continue;
    }

    const ratio = getContrastRatio(normalizedCandidate, background);
    if (ratio !== null && ratio > bestContrastRatio) {
      bestColor = normalizedCandidate;
      bestContrastRatio = ratio;
    }
  }

  return bestColor;
}

/**
 * Calculates whether black or white text has a better contrast ratio against a given background color.
 * @param {string} color - The background color in hex format, e.g. "#E21C48"
 * @returns {'black' | 'white'} - The color that provides better contrast.
 */
export function getContrastColor(color: string): "black" | "white" {
  const bestColor = getBestContrastColor(color);

  return bestColor === WHITE ? "white" : "black";
}
