/**
 * @module
 *
 * This module provides functions for generating label overrides for note sequences.
 * These functions help automate the creation of complex label maps for different
 * musical modes by rotating base patterns.
 */

import type {
  LabelsOverride,
  LabelsOverrideMap,
} from "../types/note-sequences.d.ts";
import type { NoteInteger } from "../types/note-labels.d.ts";
import type {
  RomanNumeral,
  RomanSeventh,
  RomanTriad,
  SeventhQuality,
  TriadQuality,
} from "../types/chord-labels.d.ts";

// --- Base Patterns ---
const DIATONIC_TRIADS: TriadQuality[] = ["M", "m", "m", "M", "M", "m", "°"];
const DIATONIC_SEVENTHS: SeventhQuality[] = [
  "M7",
  "m7",
  "m7",
  "M7",
  "7",
  "m7",
  "ø7",
];

const HARMONIC_MINOR_TRIADS: TriadQuality[] = [
  "m",
  "°",
  "+",
  "m",
  "M",
  "M",
  "°",
];
const HARMONIC_MINOR_SEVENTHS: SeventhQuality[] = [
  "m(M7)",
  "ø7",
  "+M7",
  "m7",
  "7",
  "M7",
  "°7",
];

const MELODIC_MINOR_TRIADS: TriadQuality[] = [
  "m",
  "m",
  "+",
  "M",
  "M",
  "°",
  "°",
];
const MELODIC_MINOR_SEVENTHS: SeventhQuality[] = [
  "m(M7)",
  "m7",
  "+M7",
  "7",
  "7",
  "ø7",
  "ø7",
];

// --- Utility Functions ---

function rotate<T>(array: T[], times: number): T[] {
  const result = [...array];
  for (let i = 0; i < times; i++) {
    result.push(result.shift()!);
  }
  return result;
}

function createLabelsOverrideMap(
  integers: NoteInteger[],
  pattern: string[],
): LabelsOverrideMap {
  const map = new Map<NoteInteger, string>();
  for (let i = 0; i < integers.length; i++) {
    map.set(integers[i], pattern[i]);
  }
  return map;
}

function generateRomanChords(
  qualities: (TriadQuality | SeventhQuality)[],
): (RomanTriad | RomanSeventh)[] {
  const baseNumerals: RomanNumeral[] = [
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
  ];
  return qualities.map((quality, i) => {
    const numeral = baseNumerals[i];
    switch (quality) {
      case "M":
        return numeral.toUpperCase();
      case "m":
        return numeral.toLowerCase();
      case "°":
        return numeral.toLowerCase() + "°";
      case "+":
        return numeral.toUpperCase() + "+";
      case "M7":
        return numeral.toUpperCase() + "M7";
      case "m7":
        return numeral.toLowerCase() + "m7";
      case "7":
        return numeral.toUpperCase() + "7";
      case "ø7":
        return numeral.toLowerCase() + "ø7";
      case "m7♭5":
        return numeral.toLowerCase() + "m7♭5";
      case "°7":
        return numeral.toLowerCase() + "°7";
      case "m(M7)":
        return numeral.toLowerCase() + "m(M7)";
      case "+M7":
        return numeral.toUpperCase() + "+M7";
      case "M7♯5":
        return numeral.toUpperCase() + "M7♯5";
      default:
        return numeral;
    }
  }) as (RomanTriad | RomanSeventh)[];
}

// --- Public API ---

export function generateLabelsOverrideChords(
  integers: NoteInteger[],
  rotation: number,
  triadQualities: TriadQuality[],
  seventhQualities: SeventhQuality[],
): LabelsOverride {
  const rotatedTriads = rotate(triadQualities, rotation);
  const rotatedSevenths = rotate(seventhQualities, rotation);

  const romanTriads = generateRomanChords(rotatedTriads);
  const romanSevenths = generateRomanChords(rotatedSevenths);

  return {
    triad: createLabelsOverrideMap(integers, rotatedTriads),
    romanTriad: createLabelsOverrideMap(integers, romanTriads),
    seventh: createLabelsOverrideMap(integers, rotatedSevenths),
    romanSeventh: createLabelsOverrideMap(integers, romanSevenths),
  };
}

export function generateDiatonicLabelsOverrideChords(
  integers: NoteInteger[],
  rotation: number,
): LabelsOverride {
  return generateLabelsOverrideChords(
    integers,
    rotation,
    DIATONIC_TRIADS,
    DIATONIC_SEVENTHS,
  );
}

export function generateHarmonicMinorLabelsOverrideChords(
  integers: NoteInteger[],
  rotation: number,
): LabelsOverride {
  return generateLabelsOverrideChords(
    integers,
    rotation,
    HARMONIC_MINOR_TRIADS,
    HARMONIC_MINOR_SEVENTHS,
  );
}

export function generateMelodicMinorLabelsOverrideChords(
  integers: NoteInteger[],
  rotation: number,
): LabelsOverride {
  return generateLabelsOverrideChords(
    integers,
    rotation,
    MELODIC_MINOR_TRIADS,
    MELODIC_MINOR_SEVENTHS,
  );
}
