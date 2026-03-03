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
import {
  type Interval,
  intervalToIntegerMap,
} from "../data/labels/note-labels.ts";
import {
  type DiatonicModeKey,
  diatonicModes,
} from "../data/note-collections/diatonic-modes.ts";
import { filterOutOctaveIntervals } from "./intervals.ts";

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

function getChromaticArray<T>(
  items: readonly T[],
  intervals: readonly Interval[],
): (T | undefined)[] {
  const result: (T | undefined)[] = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ];

  const filteredIntervals = filterOutOctaveIntervals(intervals);

  filteredIntervals.forEach((interval, i) => {
    const semitones = intervalToIntegerMap.get(interval);
    if (semitones !== undefined) {
      result[semitones % 12] = items[i];
    }
  });

  return result;
}

/** A union of all valid identifiers for standard seven-note modal scales. */
export type AnyModeKey =
  | DiatonicModeKey
  | HarmonicMinorModeKey
  | MelodicMinorModeKey;

type ModeData = {
  intervals: readonly Interval[];
  rotation: number;
  triads: readonly Triad[];
  sevenths: readonly SeventhChord[];
};

function getModeData(modeKey: AnyModeKey): ModeData | undefined {
  if (Object.prototype.hasOwnProperty.call(diatonicModes, modeKey)) {
    const mode = diatonicModes[modeKey as DiatonicModeKey];
    return {
      intervals: mode.intervals,
      rotation: mode.rotation,
      triads: diatonicTriads,
      sevenths: diatonicSeventhChords,
    };
  }
  if (Object.prototype.hasOwnProperty.call(harmonicMinorModes, modeKey)) {
    const mode = harmonicMinorModes[modeKey as HarmonicMinorModeKey];
    return {
      intervals: mode.intervals,
      rotation: mode.rotation,
      triads: harmonicMinorTriads,
      sevenths: harmonicMinorSeventhChords,
    };
  }
  if (Object.prototype.hasOwnProperty.call(melodicMinorModes, modeKey)) {
    const mode = melodicMinorModes[modeKey as MelodicMinorModeKey];
    return {
      intervals: mode.intervals,
      rotation: mode.rotation,
      triads: melodicMinorTriads,
      sevenths: melodicMinorSeventhChords,
    };
  }
  return undefined;
}

/**
 * Retrieves the triads for a given mode key.
 */
export function getTriads(
  modeKey: AnyModeKey,
  options?: { fillChromatic?: false },
): Triad[];
export function getTriads(
  modeKey: AnyModeKey,
  options: { fillChromatic: true },
): (Triad | undefined)[];
export function getTriads(
  modeKey: AnyModeKey,
  options: { fillChromatic?: boolean } = {},
): Triad[] | (Triad | undefined)[] {
  const data = getModeData(modeKey);
  if (!data) return [];

  const rotatedTriads = Array.from(rotateArrayLeft(data.triads, data.rotation));

  if (options.fillChromatic) {
    return getChromaticArray(rotatedTriads, data.intervals);
  }

  return rotatedTriads;
}

/**
 * Retrieves the seventh chords for a given mode key.
 */
export function getSevenths(
  modeKey: AnyModeKey,
  options?: { fillChromatic?: false },
): SeventhChord[];
export function getSevenths(
  modeKey: AnyModeKey,
  options: { fillChromatic: true },
): (SeventhChord | undefined)[];
export function getSevenths(
  modeKey: AnyModeKey,
  options: { fillChromatic?: boolean } = {},
): SeventhChord[] | (SeventhChord | undefined)[] {
  const data = getModeData(modeKey);
  if (!data) return [];

  const rotatedSevenths = rotateArrayLeft(
    data.sevenths,
    data.rotation,
  ) as SeventhChord[];

  if (options.fillChromatic) {
    return getChromaticArray(rotatedSevenths, data.intervals);
  }

  return rotatedSevenths;
}

/**
 * Retrieves the Roman numeral triads for a given mode key.
 */
export function getRomanTriadsForMode(
  modeKey: AnyModeKey,
  options?: { fillChromatic?: false },
): RomanTriad[];
export function getRomanTriadsForMode(
  modeKey: AnyModeKey,
  options: { fillChromatic: true },
): (RomanTriad | undefined)[];
export function getRomanTriadsForMode(
  modeKey: AnyModeKey,
  options: { fillChromatic?: boolean } = {},
): RomanTriad[] | (RomanTriad | undefined)[] {
  const data = getModeData(modeKey);
  if (!data) return [];

  const rotatedTriads = Array.from(rotateArrayLeft(data.triads, data.rotation));
  const romanTriads = getRomanTriads(rotatedTriads);

  if (options.fillChromatic) {
    return getChromaticArray(romanTriads, data.intervals);
  }

  return romanTriads;
}

/**
 * Retrieves the Roman numeral seventh chords for a given mode key.
 */
export function getRomanSeventhsForMode(
  modeKey: AnyModeKey,
  options?: { fillChromatic?: false },
): RomanSeventhChord[];
export function getRomanSeventhsForMode(
  modeKey: AnyModeKey,
  options: { fillChromatic: true },
): (RomanSeventhChord | undefined)[];
export function getRomanSeventhsForMode(
  modeKey: AnyModeKey,
  options: { fillChromatic?: boolean } = {},
): RomanSeventhChord[] | (RomanSeventhChord | undefined)[] {
  const data = getModeData(modeKey);
  if (!data) return [];

  const rotatedSevenths = rotateArrayLeft(
    data.sevenths,
    data.rotation,
  ) as SeventhChord[];
  const romanSevenths = getRomanSeventhChords(rotatedSevenths);

  if (options.fillChromatic) {
    return getChromaticArray(romanSevenths, data.intervals);
  }

  return romanSevenths;
}
