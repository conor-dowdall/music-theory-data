/**
 * Parses a hex color string and returns its RGB components.
 * Supports 3-digit (#RGB) and 6-digit (#RRGGBB) formats.
 * @param hex The hex color string.
 * @returns An array [r, g, b] or null if the format is invalid.
 */
export function parseHexColor(hex: string): [number, number, number] | null {
  const hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
  const shorthandHexRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const fullHex = hex.replace(
    shorthandHexRegex,
    (_, r, g, b) => r + r + g + g + b + b,
  );

  const result = hexRegex.exec(fullHex);
  return result
    ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16),
    ]
    : null;
}

/**
 * Calculates whether black or white text has a better contrast ratio against a given background color.
 * @param {string} color - The background color in hex format, e.g. "#E21C48"
 * @returns {'black' | 'white'} - The color that provides better contrast.
 */
export function getContrastColor(color: string): "black" | "white" {
  // For now, we only support hex colors as that's what's in the library.
  // This can be expanded to support rgb(), hsl(), and color keywords if needed.
  const rgb = parseHexColor(color);
  if (!rgb) {
    return "black"; // Default to black if color parsing fails
  }

  const [r, g, b] = rgb;

  // Formula for relative luminance (from WCAG)
  // https://www.w3.org/TR/WCAG20/#relativeluminancedef
  const getLuminance = (c: number) => {
    const sRGB = c / 255;
    return sRGB <= 0.03928
      ? sRGB / 12.92
      : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  };

  const luminance = 0.2126 * getLuminance(r) +
    0.7152 * getLuminance(g) +
    0.0722 * getLuminance(b);

  // Use a threshold of 0.179 as recommended by WCAG for contrast
  return luminance > 0.179 ? "black" : "white";
}
