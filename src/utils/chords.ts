import {
  diatonicSeventhChords,
  diatonicTriads,
  harmonicMinorSeventhChords,
  harmonicMinorTriads,
  lowerCaseRomanNumerals,
  melodicMinorSeventhChords,
  melodicMinorTriads,
  upperCaseRomanNumerals,
} from "../data/chords/mod.ts";
import type {
  ChordDetails,
  RomanSeventhChord,
  RomanTriad,
  SeventhChord,
  Triad,
} from "../types/chords.d.ts";
import { rotateArrayLeft } from "./rotate-array.ts";
import {
  type HarmonicMinorModeKey,
  harmonicMinorModes,
} from "../data/note-collections/harmonic-minor-modes.ts";
import {
  type MelodicMinorModeKey,
  melodicMinorModes,
} from "../data/note-collections/melodic-minor-modes.ts";
import type { Interval } from "../data/labels/note-labels.ts";
import {
  type DiatonicModeKey,
  diatonicModes,
} from "../data/note-collections/diatonic-modes.ts";

/**
 * Converts standard triad qualities (e.g., "M", "m") into their corresponding Roman numeral representations
 * based on their scale degree index.
 *
 * @param triads An array of triad qualities in order of scale degree.
 * @returns An array of string-based Roman numeral triads (e.g., "I", "ii", "iii°").
 */
export function getRomanTriads(triads: Triad[]): RomanTriad[] {
  return triads.map((quality, i) => {
    switch (quality) {
      case "M":
        return upperCaseRomanNumerals[i];
      case "m":
        return lowerCaseRomanNumerals[i];
      case "°":
        return lowerCaseRomanNumerals[i] + quality;
      case "+":
        return upperCaseRomanNumerals[i] + quality;
      default:
        // This should not happen with valid data. Fail fast if it does.
        throw new Error(`Unhandled triad quality: ${quality}`);
    }
  }) as RomanTriad[];
}

/**
 * Converts standard seventh chord qualities (e.g., "M7", "m7") into their corresponding Roman numeral representations
 * based on their scale degree index.
 *
 * @param sevenths An array of seventh chord qualities in order of scale degree.
 * @returns An array of string-based Roman numeral seventh chords (e.g., "IM7", "ii7", "vii°7").
 */
export function getRomanSeventhChords(
  sevenths: SeventhChord[],
): RomanSeventhChord[] {
  return sevenths.map((quality, i) => {
    switch (quality) {
      case "M7":
        return upperCaseRomanNumerals[i] + quality;
      case "m7":
        return lowerCaseRomanNumerals[i] + quality;
      case "7":
        return upperCaseRomanNumerals[i] + quality;
      case "ø7":
        return lowerCaseRomanNumerals[i] + quality;
      case "m7♭5":
        return lowerCaseRomanNumerals[i] + quality;
      case "°7":
        return lowerCaseRomanNumerals[i] + quality;
      case "m(M7)":
        return lowerCaseRomanNumerals[i] + "M7";
      case "+M7":
        return upperCaseRomanNumerals[i] + quality;
      case "M7♯5":
        return upperCaseRomanNumerals[i] + quality;
      default:
        // This should not happen with valid data. Fail fast if it does.
        throw new Error(`Unhandled seventh chord quality: ${quality}`);
    }
  }) as RomanSeventhChord[];
}

/**
 * Aggregates chord data (triads, sevenths, and roman numerals) for each specific pitch interval
 * of a scale or mode into a structured array of objects.
 *
 * @param intervals The intervals of the mode (excluding the octave).
 * @param triads The basic triad qualities for each interval.
 * @param sevenths The seventh chord qualities for each interval.
 * @param romanTriads The computed Roman numeral triads.
 * @param romanSeventhChords The computed Roman numeral seventh chords.
 * @returns An organized list of full chord details for each degree of the provided mode.
 */
export function getChordDetailsForMode(
  intervals: readonly Interval[],
  triads: readonly Triad[],
  sevenths: readonly SeventhChord[],
  romanTriads: readonly RomanTriad[],
  romanSeventhChords: readonly RomanSeventhChord[],
): ChordDetails[] {
  return intervals
    .filter((interval) => interval !== "8")
    .map((interval, i) => ({
      interval,
      triad: triads[i],
      seventh: sevenths[i],
      romanTriad: romanTriads[i],
      romanSeventhChord: romanSeventhChords[i],
    }));
}

/**
 * Computes and aggregates comprehensive chord details (triads and sevenths) for a specific
 * standard diatonic mode.
 *
 * @param diatonicModeKey The identifier for the diatonic mode (e.g. "ionian", "dorian").
 * @returns An array of detailed chord objects mapped to each scale degree.
 */
export function getChordDetailsForDiatonicMode(
  diatonicModeKey: DiatonicModeKey,
): ChordDetails[] {
  const mode = diatonicModes[diatonicModeKey];
  const rotation = mode.rotation;
  const rotatedTriads = rotateArrayLeft(diatonicTriads, rotation);
  const rotatedSeventhChords = rotateArrayLeft(diatonicSeventhChords, rotation);
  return getChordDetailsForMode(
    mode.intervals,
    rotatedTriads,
    rotatedSeventhChords,
    getRomanTriads(rotatedTriads),
    getRomanSeventhChords(rotatedSeventhChords),
  );
}

/**
 * Computes and aggregates comprehensive chord details (triads and sevenths) for a specific
 * harmonic minor scale mode.
 *
 * @param harmonicMinorModeKey The identifier for the mode (e.g. "harmonicMinor", "phrygianDominant").
 * @returns An array of detailed chord objects mapped to each scale degree.
 */
export function getChordDetailsForHarmonicMinorMode(
  harmonicMinorModeKey: HarmonicMinorModeKey,
): ChordDetails[] {
  const mode = harmonicMinorModes[harmonicMinorModeKey];
  const rotation = mode.rotation;
  const rotatedTriads = rotateArrayLeft(harmonicMinorTriads, rotation);
  const rotatedSeventhChords = rotateArrayLeft(
    harmonicMinorSeventhChords,
    rotation,
  );
  return getChordDetailsForMode(
    mode.intervals,
    rotatedTriads,
    rotatedSeventhChords,
    getRomanTriads(rotatedTriads),
    getRomanSeventhChords(rotatedSeventhChords),
  );
}

/**
 * Computes and aggregates comprehensive chord details (triads and sevenths) for a specific
 * melodic minor scale mode.
 *
 * @param melodicMinorModeKey The identifier for the mode (e.g. "melodicMinor", "superLocrian").
 * @returns An array of detailed chord objects mapped to each scale degree.
 */
export function getChordDetailsForMelodicMinorMode(
  melodicMinorModeKey: MelodicMinorModeKey,
): ChordDetails[] {
  const mode = melodicMinorModes[melodicMinorModeKey];
  const rotation = mode.rotation;
  const rotatedTriads = rotateArrayLeft(melodicMinorTriads, rotation);
  const rotatedSeventhChords = rotateArrayLeft(
    melodicMinorSeventhChords,
    rotation,
  );
  return getChordDetailsForMode(
    mode.intervals,
    rotatedTriads,
    rotatedSeventhChords,
    getRomanTriads(rotatedTriads),
    getRomanSeventhChords(rotatedSeventhChords),
  );
}

/** A union of all valid identifiers for standard seven-note modal scales. */
export type AnyModeKey =
  | DiatonicModeKey
  | HarmonicMinorModeKey
  | MelodicMinorModeKey;

/**
 * Resolves the given mode key to its parent scale type (diatonic, harmonic minor, or melodic minor)
 * and computes its chord details dynamically.
 *
 * @param modeKey The generic modal identifier.
 * @returns Complete chord details mapped per scale degree, or an empty array if invalid.
 */
export function getChordDetailsForModeKey(modeKey: AnyModeKey): ChordDetails[] {
  if (Object.prototype.hasOwnProperty.call(diatonicModes, modeKey)) {
    return getChordDetailsForDiatonicMode(modeKey as DiatonicModeKey);
  }
  if (Object.prototype.hasOwnProperty.call(harmonicMinorModes, modeKey)) {
    return getChordDetailsForHarmonicMinorMode(modeKey as HarmonicMinorModeKey);
  }
  if (Object.prototype.hasOwnProperty.call(melodicMinorModes, modeKey)) {
    return getChordDetailsForMelodicMinorMode(modeKey as MelodicMinorModeKey);
  }
  return [];
}
