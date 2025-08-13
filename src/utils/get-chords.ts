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
import { rotateArray } from "./rotate-array.ts";

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
        return lowerCaseRomanNumerals[i] + quality;
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

function getModeChords(
  intervals: Interval[],
  triads: Triad[],
  sevenths: Seventh[],
  romanTriads: RomanTriad[],
  romanSevenths: RomanSeventh[],
): ChordDetails[] {
  return intervals.map((interval, i) => ({
    interval,
    triad: triads[i],
    seventh: sevenths[i],
    romanTriad: romanTriads[i],
    romanSeventh: romanSevenths[i],
  }));
}

export function getDiatonicChords(
  intervals: Interval[],
  rotation: number,
): ChordDetails[] {
  const rotatedTriads = rotateArray(diatonicTriads, rotation);
  const rotatedSevenths = rotateArray(diatonicSevenths, rotation);
  return getModeChords(
    intervals,
    rotatedTriads,
    rotatedSevenths,
    getRomanTriads(rotatedTriads),
    getRomanSevenths(rotatedSevenths),
  );
}

export function getHarmonicMinorChords(
  intervals: Interval[],
  rotation: number,
): ChordDetails[] {
  const rotatedTriads = rotateArray(harmonicMinorTriads, rotation);
  const rotatedSevenths = rotateArray(harmonicMinorSevenths, rotation);
  return getModeChords(
    intervals,
    rotatedTriads,
    rotatedSevenths,
    getRomanTriads(harmonicMinorTriads),
    getRomanSevenths(harmonicMinorSevenths),
  );
}

export function getMelodicMinorChords(
  intervals: Interval[],
  rotation: number,
): ChordDetails[] {
  const rotatedTriads = rotateArray(melodicMinorTriads, rotation);
  const rotatedSevenths = rotateArray(melodicMinorSevenths, rotation);
  return getModeChords(
    intervals,
    rotatedTriads,
    rotatedSevenths,
    getRomanTriads(melodicMinorTriads),
    getRomanSevenths(melodicMinorSevenths),
  );
}

console.table(
  getDiatonicChords(["1", "2", "3", "4", "5", "6", "7", "8"], 0),
);
console.table(
  getDiatonicChords(["1", "2", "3", "4", "5", "6", "7"], 1),
);
