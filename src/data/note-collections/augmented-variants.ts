import type { ChordCollection } from "../../types/note-collections.d.ts";

const augmentedTriad: ChordCollection = {
  category: "chord",
  primaryName: "aug",
  names: ["aug", "+", "Augmented Triad"],
  intervals: ["1", "3", "♯5"],
  integers: [0, 4, 8],
  type: ["augmented", "chord", "arpeggio", "triad"],
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
  pattern: ["major third", "major third", "major second"],
  patternShort: ["M3", "M3", "M2"],
} as const;

export const _augmentedVariants = {
  augmentedTriad,
  augmented7,
} as const;

export type AugmentedVariantKey = keyof typeof _augmentedVariants;

export const augmentedVariants: Record<AugmentedVariantKey, ChordCollection> =
  _augmentedVariants;
