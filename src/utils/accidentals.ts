export const ACCIDENTAL_REGEX = /([#♯xX𝄪]+)|([b♭𝄫]+)/gu;

/**
 * Parses an accidental string containing ASCII or standard accidental characters
 * and normalizes it into canonical accidental symbols ('♯', '♭', '𝄪', '𝄫').
 * @param accidentalString The string containing only accidentals.
 * @returns A canonical accidental string, or undefined if the string contained invalid characters.
 */
export function normalizeAccidentalString(
  accidentalString: string,
): string | undefined {
  if (accidentalString.length === 0) return "";

  let validAccidentalLength = 0;
  let alterInteger = 0;

  for (const match of accidentalString.matchAll(ACCIDENTAL_REGEX)) {
    const sharps = match[1];
    if (sharps) {
      for (const char of sharps) {
        alterInteger += char.toLowerCase() === "x" || char === "𝄪" ? 2 : 1;
      }
      validAccidentalLength += sharps.length;
    }

    const flats = match[2];
    if (flats) {
      for (const char of flats) {
        alterInteger -= char === "𝄫" ? 2 : 1;
      }
      validAccidentalLength += flats.length;
    }
  }

  if (accidentalString.length > validAccidentalLength) {
    return undefined;
  }

  let accidentalSymbols = "";
  let currentAlteration = alterInteger;

  while (currentAlteration > 0) {
    if (currentAlteration >= 2) {
      accidentalSymbols += "𝄪";
      currentAlteration -= 2;
    } else {
      accidentalSymbols += "♯";
      currentAlteration -= 1;
    }
  }

  while (currentAlteration < 0) {
    if (currentAlteration <= -2) {
      accidentalSymbols += "𝄫";
      currentAlteration += 2;
    } else {
      accidentalSymbols += "♭";
      currentAlteration += 1;
    }
  }

  return accidentalSymbols;
}
