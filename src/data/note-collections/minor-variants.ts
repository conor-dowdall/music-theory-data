import type { ChordCollection } from "../../types/note-collections.d.ts";

const minor: ChordCollection = {
  category: "chord",
  primaryName: "m",
  names: ["m", "min", "Minor", "Minor Triad", "-"],
  intervals: ["1", "♭3", "5"],
  integers: [0, 3, 7],
  type: ["minor", "chord", "arpeggio", "triad"],
  characteristics: [
    "sad",
    "melancholic",
    "dark",
    "the most basic minor chord",
  ],
  pattern: ["minor third", "major third"],
  patternShort: ["m3", "M3"],
} as const;

const minor6: ChordCollection = {
  category: "chord",
  primaryName: "m6",
  names: ["m6", "min6", "Minor 6th", "Minor Sixth"],
  intervals: ["1", "♭3", "5", "6"],
  integers: [0, 3, 7, 9],
  type: ["minor", "chord", "arpeggio", "tetrad"],
  characteristics: [
    "jazzy",
    "soulful",
    "less dissonant than m7",
    "dorian feel",
  ],
  pattern: ["minor third", "major third", "major second"],
  patternShort: ["m3", "M3", "M2"],
} as const;

const minor7: ChordCollection = {
  category: "chord",
  primaryName: "m7",
  names: ["m7", "min7", "Minor 7th", "Minor Seventh", "-7"],
  intervals: ["1", "♭3", "5", "♭7"],
  integers: [0, 3, 7, 10],
  type: ["minor", "chord", "arpeggio", "tetrad"],
  characteristics: ["smooth", "jazzy", "versatile"],
  pattern: ["minor third", "major third", "minor third"],
  patternShort: ["m3", "M3", "m3"],
} as const;

const minorMajor7: ChordCollection = {
  category: "chord",
  primaryName: "m(M7)",
  names: [
    "m(M7)",
    "min(M7)",
    "Minor (Major 7th)",
    "Minor Major Seventh",
    "mM7",
    "-M7",
    "-(maj7)",
  ],
  intervals: ["1", "♭3", "5", "7"],
  integers: [0, 3, 7, 11],
  type: ["minor", "chord", "arpeggio", "tetrad"],
  characteristics: [
    "smooth",
    "jazzy",
  ],
  pattern: ["minor third", "major third", "major third"],
  patternShort: ["m3", "M3", "M3"],
};

const minor9: ChordCollection = {
  category: "chord",
  primaryName: "m9",
  names: ["m9", "min9", "Minor 9th", "Minor Ninth", "-9"],
  intervals: ["1", "♭3", "5", "♭7", "9"],
  integers: [0, 3, 7, 10, 14],
  type: ["minor", "chord", "arpeggio", "pentad"],
  characteristics: ["rich", "lush", "sophisticated", "common in jazz"],
  pattern: ["minor third", "major third", "minor third", "major third"],
  patternShort: ["m3", "M3", "m3", "M3"],
} as const;

const minorAdd9: ChordCollection = {
  category: "chord",
  primaryName: "m(add9)",
  names: ["m(add9)", "min(add9)", "Minor add 9"],
  intervals: ["1", "♭3", "5", "9"],
  integers: [0, 3, 7, 14],
  type: ["minor", "chord", "arpeggio", "tetrad"],
  characteristics: [
    "open",
    "modern",
    "adds color without the 7th",
    "pop and rock music",
  ],
  pattern: ["minor third", "major third", "perfect fifth"],
  patternShort: ["m3", "M3", "P5"],
} as const;

const minor6Add9: ChordCollection = {
  category: "chord",
  primaryName: "m6/9",
  names: ["m6/9", "min6/9", "Minor 6/9", "-6/9"],
  intervals: ["1", "♭3", "5", "6", "9"],
  integers: [0, 3, 7, 9, 14],
  type: ["minor", "chord", "arpeggio", "pentad"],
  characteristics: [
    "rich",
    "jazzy",
    "dorian flavor",
    "sophisticated minor sound",
  ],
  pattern: ["minor third", "major third", "major second", "perfect fourth"],
  patternShort: ["m3", "M3", "M2", "P4"],
} as const;

export const _minorVariants = {
  minor,
  minor6,
  minor7,
  minorMajor7,
  minor9,
  minorAdd9,
  minor6Add9,
} as const;

export type MinorVariantKey = keyof typeof _minorVariants;

export const minorVariants: Record<MinorVariantKey, ChordCollection> =
  _minorVariants;
