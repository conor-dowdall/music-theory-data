import {
  diatonicSevenths,
  diatonicTriads,
  harmonicMinorSevenths,
  harmonicMinorTriads,
  lowerCaseRomanNumerals,
  melodicMinorSevenths,
  melodicMinorTriads,
  upperCaseRomanNumerals,
} from "../data/chords/mod.ts";
import type {
  ChordDetails,
  RomanSeventh,
  RomanTriad,
  Seventh,
  Triad,
} from "../types/chords.d.ts";
import type { Interval } from "../types/labels.d.ts";
import type {
  DiatonicModeKey,
  HarmonicMinorModeKey,
  MelodicMinorModeKey,
} from "../types/note-collections.d.ts";
import { diatonicModes } from "../data/note-collections/mod.ts";
import { rotateArray } from "./rotate-array.ts";
import { harmonicMinorModes } from "../data/note-collections/harmonic-minor-modes.ts";
import { melodicMinorModes } from "../data/note-collections/melodic-minor-modes.ts";

function getRomanTriads(chordTypes: Triad[]): RomanTriad[] {
  return chordTypes.map((quality, i) => {
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

function getRomanSevenths(
  chordTypes: Seventh[],
): RomanSeventh[] {
  return chordTypes.map((quality, i) => {
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
  }) as RomanSeventh[];
}

// TODO: add functions to return array of chord names, not an object
// TODO: filter octave out, i.e. 8

export function getModeChordDetails(
  intervals: Interval[],
  triads: Triad[],
  sevenths: Seventh[],
  romanTriads: RomanTriad[],
  romanSevenths: RomanSeventh[],
): ChordDetails[] {
  return intervals
    .filter((interval) => interval !== "8")
    .map((interval, i) => ({
      interval,
      triad: triads[i],
      seventh: sevenths[i],
      romanTriad: romanTriads[i],
      romanSeventh: romanSevenths[i],
    }));
}

export function getDiatonicModeChordDetails(
  diatonicModeKey: DiatonicModeKey,
): ChordDetails[] {
  const mode = diatonicModes[diatonicModeKey];
  const rotation = mode.rotation as number;
  const rotatedTriads = rotateArray(diatonicTriads, rotation);
  const rotatedSevenths = rotateArray(diatonicSevenths, rotation);
  return getModeChordDetails(
    mode.intervals,
    rotatedTriads,
    rotatedSevenths,
    getRomanTriads(rotatedTriads),
    getRomanSevenths(rotatedSevenths),
  );
}

export function getHarmonicMinorModeChordDetails(
  harmonicMinorModeKey: HarmonicMinorModeKey,
): ChordDetails[] {
  const mode = harmonicMinorModes[harmonicMinorModeKey];
  const rotation = mode.rotation as number;
  const rotatedTriads = rotateArray(harmonicMinorTriads, rotation);
  const rotatedSevenths = rotateArray(harmonicMinorSevenths, rotation);
  return getModeChordDetails(
    mode.intervals,
    rotatedTriads,
    rotatedSevenths,
    getRomanTriads(rotatedTriads),
    getRomanSevenths(rotatedSevenths),
  );
}

export function getMelodicMinorModeChordDetails(
  melodicMinorModeKey: MelodicMinorModeKey,
): ChordDetails[] {
  const mode = melodicMinorModes[melodicMinorModeKey];
  const rotation = mode.rotation as number;
  const rotatedTriads = rotateArray(melodicMinorTriads, rotation);
  const rotatedSevenths = rotateArray(melodicMinorSevenths, rotation);
  return getModeChordDetails(
    mode.intervals,
    rotatedTriads,
    rotatedSevenths,
    getRomanTriads(rotatedTriads),
    getRomanSevenths(rotatedSevenths),
  );
}
