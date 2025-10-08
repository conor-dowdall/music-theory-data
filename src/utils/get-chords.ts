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
import { rotateArray } from "./rotate-array.ts";
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
        return upperCaseRomanNumerals[i];
    }
  }) as RomanTriad[];
}

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
        return upperCaseRomanNumerals[i] + quality;
    }
  }) as RomanSeventhChord[];
}

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

export function getChordDetailsForDiatonicMode(
  diatonicModeKey: DiatonicModeKey,
): ChordDetails[] {
  const mode = diatonicModes[diatonicModeKey];
  const rotation = mode.rotation as number;
  const rotatedTriads = rotateArray(diatonicTriads, rotation);
  const rotatedSeventhChords = rotateArray(diatonicSeventhChords, rotation);
  return getChordDetailsForMode(
    mode.intervals,
    rotatedTriads,
    rotatedSeventhChords,
    getRomanTriads(rotatedTriads),
    getRomanSeventhChords(rotatedSeventhChords),
  );
}

export function getChordDetailsForHarmonicMinorMode(
  harmonicMinorModeKey: HarmonicMinorModeKey,
): ChordDetails[] {
  const mode = harmonicMinorModes[harmonicMinorModeKey];
  const rotation = mode.rotation as number;
  const rotatedTriads = rotateArray(harmonicMinorTriads, rotation);
  const rotatedSeventhChords = rotateArray(
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

export function getChordDetailsForMelodicMinorMode(
  melodicMinorModeKey: MelodicMinorModeKey,
): ChordDetails[] {
  const mode = melodicMinorModes[melodicMinorModeKey];
  const rotation = mode.rotation as number;
  const rotatedTriads = rotateArray(melodicMinorTriads, rotation);
  const rotatedSeventhChords = rotateArray(melodicMinorSeventhChords, rotation);
  return getChordDetailsForMode(
    mode.intervals,
    rotatedTriads,
    rotatedSeventhChords,
    getRomanTriads(rotatedTriads),
    getRomanSeventhChords(rotatedSeventhChords),
  );
}

export type AnyModeKey =
  | DiatonicModeKey
  | HarmonicMinorModeKey
  | MelodicMinorModeKey;

export function getChordDetailsForModeKey(
  modeKey: AnyModeKey,
): ChordDetails[] {
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
