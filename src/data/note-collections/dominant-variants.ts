import type { NoteCollection } from "../../types/note-collections.d.ts";

const dominant7: NoteCollection = {
  category: "chord",
  primaryName: "7",
  names: ["7", "dom7", "Dominant 7th", "Dominant Seventh"],
  intervals: ["1", "3", "5", "♭7"],
  integers: [0, 4, 7, 10],
  type: ["dominant", "major", "chord", "arpeggio", "tetrad"],
  characteristics: [
    "unstable",
    "bluesy",
    "tense",
    "jazzy",
    "major with flat 7th",
    "minor 7th",
    "the most common dominant chord",
    "used in blues, jazz, and rock",
    "foundational dominant chord",
    "creates strong tension and resolution",
    "used in an authentic cadence",
  ],
  pattern: ["major third", "minor third", "minor third"],
  patternShort: ["M3", "m3", "m3"],
} as const;

const dominant9: NoteCollection = {
  category: "chord",
  primaryName: "9",
  names: ["9", "dom9", "Dominant 9th", "Dominant Ninth"],
  intervals: ["1", "3", "5", "♭7", "9"],
  integers: [0, 2, 4, 7, 10],
  type: ["dominant", "major", "chord", "arpeggio", "pentad"],
  characteristics: [
    "unstable",
    "bluesy",
    "tense",
    "jazzy",
    "rich",
    "richer than a 7th chord",
    "common in jazz and R&B",
  ],
  pattern: ["major third", "minor third", "minor third", "major third"],
  patternShort: ["M3", "m3", "m3", "M3"],
} as const;

const dominant11: NoteCollection = {
  category: "chord",
  primaryName: "11",
  names: ["11", "dom11", "Dominant 11th", "Dominant Eleventh"],
  intervals: ["1", "3", "5", "♭7", "9", "11"],
  integers: [0, 2, 4, 5, 7, 10],
  type: ["dominant", "major", "chord", "arpeggio", "hexad"],
  characteristics: [
    "unstable",
    "bluesy",
    "tense",
    "jazzy",
    "rich",
    "complex",
    "dissonant 3rd",
    "can be voiced without the 3rd and 5th",
    "can be dissonant",
  ],
  pattern: [
    "major third",
    "minor third",
    "minor third",
    "major third",
    "minor third",
  ],
  patternShort: ["M3", "m3", "m3", "M3", "m3"],
} as const;

const dominant13: NoteCollection = {
  category: "chord",
  primaryName: "13",
  names: ["13", "dom13", "Dominant 13th", "Dominant Thirteenth"],
  intervals: ["1", "3", "5", "♭7", "9", "11", "13"],
  integers: [0, 2, 4, 5, 7, 9, 10],
  type: ["dominant", "major", "chord", "arpeggio", "heptad"],
  characteristics: [
    "unstable",
    "bluesy",
    "tense",
    "jazzy",
    "rich",
    "complex",
    "lush",
    "the richest dominant extension",
    "common in big band and modern jazz",
  ],
  pattern: [
    "major third",
    "minor third",
    "minor third",
    "major third",
    "minor third",
    "minor third",
  ],
  patternShort: ["M3", "m3", "m3", "M3", "m3", "m3"],
} as const;

export const _dominantVariants = {
  dominant7,
  dominant9,
  dominant11,
  dominant13,
} as const;

export type DominantVariantKey = keyof typeof _dominantVariants;

export const dominantVariants: Record<DominantVariantKey, NoteCollection> =
  _dominantVariants;
