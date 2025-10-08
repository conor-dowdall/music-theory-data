import type { NoteCollection } from "../../types/note-collections.d.ts";

const augmentedTriad: NoteCollection = {
  primaryName: "aug",
  names: ["aug", "+", "Augmented Triad"],
  intervals: ["1", "3", "♯5"],
  integers: [0, 4, 8],
  type: ["augmented", "chord", "arpeggio", "triad", "symmetrical"],
  characteristics: ["tense", "unstable", "dreamy", "dissonant"],
  pattern: ["major third", "major third"],
  patternShort: ["M3", "M3"],
} as const;

const italian6: NoteCollection = {
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

const french6: NoteCollection = {
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

const german6: NoteCollection = {
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

const augmented7: NoteCollection = {
  primaryName: "aug7",
  names: ["aug7", "+7", "7♯5", "Augmented Seventh"],
  intervals: ["1", "3", "♯5", "♭7"],
  integers: [0, 4, 8, 10],
  type: ["augmented", "dominant", "chord", "arpeggio", "tetrad"],
  characteristics: ["tense", "unstable", "dissonant", "dominant function"],
  pattern: ["major third", "major third", "minor second"],
  patternShort: ["M3", "M3", "m2"],
} as const;

export const _augmented = {
  augmentedTriad,
  italian6,
  french6,
  german6,
  augmented7,
} as const;

export type AugmentedKey = keyof typeof _augmented;

export const augmented: Record<AugmentedKey, NoteCollection> = _augmented;
