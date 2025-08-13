import {
  diatonicSevenths,
  diatonicTriads,
  harmonicMinorSevenths,
  harmonicMinorTriads,
  lowerCaseRomanChords,
  melodicMinorSevenths,
  melodicMinorTriads,
  upperCaseRomanChords,
} from "../chord-labels/mod.ts";
import type {
  ChordQuality,
  RomanChord,
  RomanSeventhChord,
  ScaleIntervalChords,
  SeventhChord,
} from "../types/chord-labels.d.ts";
import type { Interval } from "../types/note-labels.d.ts";
import { rotateArray } from "./rotate-array.ts";

function generateRomanTriads(chordTypes: ChordQuality[]): RomanChord[] {
  return chordTypes.map((quality, i) => {
    switch (quality) {
      case "M":
        return upperCaseRomanChords[i];
      case "m":
        return lowerCaseRomanChords[i];
      case "°":
        return lowerCaseRomanChords[i] + quality;
      case "+":
        return upperCaseRomanChords[i] + quality;
      default:
        return upperCaseRomanChords[i];
    }
  }) as RomanChord[];
}

function generateRomanSevenths(
  chordTypes: SeventhChord[],
): RomanSeventhChord[] {
  return chordTypes.map((quality, i) => {
    switch (quality) {
      case "M7":
        return upperCaseRomanChords[i] + quality;
      case "m7":
        return lowerCaseRomanChords[i] + quality;
      case "7":
        return upperCaseRomanChords[i] + quality;
      case "ø7":
        return lowerCaseRomanChords[i] + quality;
      case "m7♭5":
        return lowerCaseRomanChords[i] + quality;
      case "°7":
        return lowerCaseRomanChords[i] + quality;
      case "m(M7)":
        return lowerCaseRomanChords[i] + quality;
      case "+M7":
        return upperCaseRomanChords[i] + quality;
      case "M7♯5":
        return upperCaseRomanChords[i] + quality;
      default:
        return upperCaseRomanChords[i] + quality;
    }
  }) as RomanSeventhChord[];
}

// TODO: add functions to return array of chord names, not an object
// TODO: filter octave out, i.e. 8

function generateScaleChords(
  intervals: Interval[],
  triads: ChordQuality[],
  sevenths: SeventhChord[],
  romanTriads: RomanChord[],
  romanSevenths: RomanSeventhChord[],
): ScaleIntervalChords[] {
  return intervals.map((interval, i) => ({
    interval,
    triad: triads[i],
    seventh: sevenths[i],
    romanTriad: romanTriads[i],
    romanSeventh: romanSevenths[i],
  }));
}

export function generateDiatonicChords(
  intervals: Interval[],
  rotation: number,
): ScaleIntervalChords[] {
  const rotatedTriads = rotateArray(diatonicTriads, rotation);
  const rotatedSevenths = rotateArray(diatonicSevenths, rotation);
  return generateScaleChords(
    intervals,
    rotatedTriads,
    rotatedSevenths,
    generateRomanTriads(rotatedTriads),
    generateRomanSevenths(rotatedSevenths),
  );
}

export function generateHarmonicMinorChords(
  intervals: Interval[],
  rotation: number,
): ScaleIntervalChords[] {
  const rotatedTriads = rotateArray(harmonicMinorTriads, rotation);
  const rotatedSevenths = rotateArray(harmonicMinorSevenths, rotation);
  return generateScaleChords(
    intervals,
    rotatedTriads,
    rotatedSevenths,
    generateRomanTriads(harmonicMinorTriads),
    generateRomanSevenths(harmonicMinorSevenths),
  );
}

export function generateMelodicMinorChords(
  intervals: Interval[],
  rotation: number,
): ScaleIntervalChords[] {
  const rotatedTriads = rotateArray(melodicMinorTriads, rotation);
  const rotatedSevenths = rotateArray(melodicMinorSevenths, rotation);
  return generateScaleChords(
    intervals,
    rotatedTriads,
    rotatedSevenths,
    generateRomanTriads(melodicMinorTriads),
    generateRomanSevenths(melodicMinorSevenths),
  );
}

console.table(
  generateDiatonicChords(["1", "2", "3", "4", "5", "6", "7", "8"], 0),
);
console.table(
  generateDiatonicChords(["1", "2", "3", "4", "5", "6", "7"], 1),
);
