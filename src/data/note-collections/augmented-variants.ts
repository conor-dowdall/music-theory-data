import type { ChordCollection } from "../../types/note-collections.d.ts";

const augmentedTriad: ChordCollection = {
  category: "chord",
  primaryName: "aug",
  names: ["aug", "+", "Augmented Triad"],
  intervals: ["1", "3", "♯5"],
  integers: [0, 4, 8],
  type: ["augmented", "chord", "arpeggio", "triad", "symmetrical"],
  characteristics: ["tense", "unstable", "dreamy", "dissonant"],
  pattern: ["major third", "major third"],
  patternShort: ["M3", "M3"],
} as const;

const augmented7: ChordCollection = {
  category: "chord",
  primaryName: "aug7",
  names: ["aug7", "+7", "7♯5", "Augmented Seventh"],
  intervals: ["1", "3", "♯5", "♭7"],
  integers: [0, 4, 8, 10],
  type: ["augmented", "dominant", "chord", "arpeggio", "tetrad"],
  characteristics: ["tense", "unstable", "dissonant", "dominant function"],
  pattern: ["major third", "major third", "minor second"],
  patternShort: ["M3", "M3", "m2"],
} as const;

const italian6: ChordCollection = {
  category: "chord",
  primaryName: "It+6",
  names: ["It+6", "Italian 6th"],
  intervals: ["1", "3", "♭6"],
  integers: [0, 4, 8],
  type: ["augmented", "chord", "arpeggio", "triad", "classical"],
  characteristics: [
    "classical harmony",
    "pre-dominant function",
    "chromatic",
  ],
  pattern: ["major third", "diminished fourth"],
  patternShort: ["M3", "d4"],
} as const;

const french6: ChordCollection = {
  category: "chord",
  primaryName: "Fr+6",
  names: ["Fr+6", "French 6th"],
  intervals: ["1", "3", "♯4", "♭6"],
  integers: [0, 4, 6, 8],
  type: ["augmented", "chord", "arpeggio", "tetrad", "classical"],
  characteristics: [
    "classical harmony",
    "pre-dominant function",
    "chromatic",
    "contains a tritone",
  ],
  pattern: ["major third", "minor second", "major second"],
  patternShort: ["M3", "m2", "M2"],
} as const;

const german6: ChordCollection = {
  category: "chord",
  primaryName: "Ger+6",
  names: ["Ger+6", "German 6th"],
  intervals: ["1", "3", "5", "♭6"],
  integers: [0, 4, 7, 8],
  type: ["augmented", "chord", "arpeggio", "tetrad", "classical"],
  characteristics: [
    "classical harmony",
    "pre-dominant function",
    "chromatic",
    "enharmonically equivalent to a dominant 7th",
  ],
  pattern: ["major third", "minor third", "augmented unison"],
  patternShort: ["M3", "m3", "A1"],
} as const;

export const _augmentedVariants = {
  augmentedTriad,
  augmented7,
  italian6,
  french6,
  german6,
} as const;

export type AugmentedVariantKey = keyof typeof _augmentedVariants;

export const augmentedVariants: Record<AugmentedVariantKey, ChordCollection> =
  _augmentedVariants;
