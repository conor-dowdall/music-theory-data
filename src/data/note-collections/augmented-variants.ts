import type { ChordCollection } from "../../types/note-collections.d.ts";

const augmentedTriad: ChordCollection = {
  category: "chord",
  mostSimilarScale: "ionian",
  primaryName: "aug",
  names: ["aug", "+", "Augmented Triad"],
  symbol: { chordSuffix: "+", romanSuffix: "+", numeralCase: "upper" },
  intervals: ["1", "3", "♯5"],
  integers: [0, 4, 8],
  type: ["augmented", "chord", "arpeggio", "triad"],
  characteristics: ["tense", "unstable", "dreamy", "dissonant"],
  pattern: ["major third", "major third"],
  patternShort: ["M3", "M3"],
} as const;

const augmented7: ChordCollection = {
  category: "chord",
  mostSimilarScale: "mixolydian",
  primaryName: "aug7",
  names: ["aug7", "+7", "7♯5", "Augmented Seventh"],
  symbol: { chordSuffix: "+7", romanSuffix: "+7", numeralCase: "upper" },
  intervals: ["1", "3", "♯5", "♭7"],
  integers: [0, 4, 8, 10],
  type: ["augmented", "dominant", "chord", "arpeggio", "tetrad"],
  characteristics: ["tense", "unstable", "dissonant", "dominant function"],
  pattern: ["major third", "major third", "major second"],
  patternShort: ["M3", "M3", "M2"],
} as const;

const augmentedMajor7: ChordCollection = {
  category: "chord",
  mostSimilarScale: "ionian",
  primaryName: "augM7",
  names: [
    "augM7",
    "+M7",
    "M7♯5",
    "maj7♯5",
    "Augmented Major 7th",
    "Augmented Major Seventh",
  ],
  symbol: { chordSuffix: "+M7", romanSuffix: "+M7", numeralCase: "upper" },
  intervals: ["1", "3", "♯5", "7"],
  integers: [0, 4, 8, 11],
  type: ["augmented", "major", "chord", "arpeggio", "tetrad"],
  characteristics: [
    "dreamy",
    "unstable",
    "lush",
    "bright",
    "used in jazz and film harmony",
  ],
  pattern: ["major third", "major third", "minor third"],
  patternShort: ["M3", "M3", "m3"],
} as const;

const _augmentedVariants = {
  augmentedTriad,
  augmented7,
  augmentedMajor7,
} as const;

/** A key for one of the built-in augmented-family chord collections. */
export type AugmentedVariantKey =
  | "augmentedTriad"
  | "augmented7"
  | "augmentedMajor7";

/** Built-in augmented-family chord collections keyed by collection id. */
export const augmentedVariants: Record<AugmentedVariantKey, ChordCollection> =
  _augmentedVariants;
