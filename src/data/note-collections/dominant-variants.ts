import type {
  ChordCollection,
  NonModalScaleCollection,
  NoteCollection,
} from "../../types/note-collections.ts";

const dominant7: ChordCollection = {
  category: "chord",
  classification: { family: "dominant", structure: "seventh" },
  mostSimilarScale: "mixolydian",
  primaryName: "7",
  names: ["7", "dom7", "Dominant 7th", "Dominant Seventh"],
  symbol: { chordSuffix: "7", romanSuffix: "7", numeralCase: "upper" },
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

const dominant9: ChordCollection = {
  category: "chord",
  classification: { family: "dominant", structure: "extended" },
  mostSimilarScale: "mixolydian",
  primaryName: "9",
  names: ["9", "dom9", "Dominant 9th", "Dominant Ninth"],
  symbol: { chordSuffix: "9", romanSuffix: "9", numeralCase: "upper" },
  intervals: ["1", "3", "5", "♭7", "9"],
  integers: [0, 4, 7, 10, 14],
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

const dominant11: ChordCollection = {
  category: "chord",
  classification: { family: "dominant", structure: "extended" },
  mostSimilarScale: "mixolydian",
  primaryName: "11",
  names: ["11", "dom11", "Dominant 11th", "Dominant Eleventh"],
  symbol: { chordSuffix: "11", romanSuffix: "11", numeralCase: "upper" },
  intervals: ["1", "3", "5", "♭7", "9", "11"],
  integers: [0, 4, 7, 10, 14, 17],
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

const dominant13: ChordCollection = {
  category: "chord",
  classification: { family: "dominant", structure: "extended" },
  mostSimilarScale: "mixolydian",
  primaryName: "13",
  names: ["13", "dom13", "Dominant 13th", "Dominant Thirteenth"],
  symbol: { chordSuffix: "13", romanSuffix: "13", numeralCase: "upper" },
  intervals: ["1", "3", "5", "♭7", "9", "11", "13"],
  integers: [0, 4, 7, 10, 14, 17, 21],
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
    "major third",
  ],
  patternShort: ["M3", "m3", "m3", "M3", "m3", "M3"],
} as const;

const dominantPentatonic: NonModalScaleCollection = {
  category: "scale",
  mostSimilarScale: "mixolydian",
  primaryName: "Dominant Pentatonic",
  names: ["Dominant Pentatonic"],
  intervals: ["1", "2", "3", "5", "♭7", "8"],
  integers: [0, 2, 4, 7, 10],
  type: ["dominant", "pentatonic", "scale", "gapped scale"],
  characteristics: ["bluesy", "dominant feel", "mixolydian flavor"],
  pattern: ["whole", "whole", "minor third", "minor third"],
  patternShort: ["W", "W", "m3", "m3"],
} as const;

const _dominantVariants = {
  dominant7,
  dominant9,
  dominant11,
  dominant13,
  dominantPentatonic,
} as const;

/** A key for one of the built-in dominant-family chord or scale collections. */
export type DominantVariantKey =
  | "dominant7"
  | "dominant9"
  | "dominant11"
  | "dominant13"
  | "dominantPentatonic";

/** Built-in dominant-family chord and scale collections keyed by collection id. */
export const dominantVariants: Record<DominantVariantKey, NoteCollection> =
  _dominantVariants;
