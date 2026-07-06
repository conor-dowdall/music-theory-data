import type {
  ChordCollection,
  ModalScaleCollection,
  NoteCollection,
} from "../../types/note-collections.d.ts";

const diminishedTriad: ChordCollection = {
  category: "chord",
  mostSimilarScale: "locrian",
  primaryName: "dim",
  names: ["dim", "°", "Diminished Triad"],
  symbol: { chordSuffix: "°", romanSuffix: "°", numeralCase: "lower" },
  intervals: ["1", "♭3", "♭5"],
  integers: [0, 3, 6],
  type: ["diminished", "chord", "arpeggio", "triad"],
  characteristics: ["tense", "unstable", "dissonant"],
  pattern: ["minor third", "minor third"],
  patternShort: ["m3", "m3"],
} as const;

const diminished7: ChordCollection = {
  category: "chord",
  mostSimilarScale: "wholeHalfDiminished",
  primaryName: "dim7",
  names: ["dim7", "°7", "Diminished 7th"],
  symbol: { chordSuffix: "°7", romanSuffix: "°7", numeralCase: "lower" },
  intervals: ["1", "♭3", "♭5", "𝄫7"],
  integers: [0, 3, 6, 9],
  type: ["diminished", "chord", "arpeggio", "tetrad", "symmetrical"],
  characteristics: ["very tense", "unstable", "symmetrical", "passing chord"],
  pattern: ["minor third", "minor third", "minor third"],
  patternShort: ["m3", "m3", "m3"],
} as const;

const halfDiminished7: ChordCollection = {
  category: "chord",
  mostSimilarScale: "locrian",
  primaryName: "m7♭5",
  names: ["m7♭5", "ø7", "Half Diminished 7th"],
  symbol: { chordSuffix: "ø7", romanSuffix: "ø7", numeralCase: "lower" },
  intervals: ["1", "♭3", "♭5", "♭7"],
  integers: [0, 3, 6, 10],
  type: ["diminished", "minor", "chord", "arpeggio", "tetrad"],
  characteristics: ["tense", "jazzy", "leading to minor"],
  pattern: ["minor third", "minor third", "major third"],
  patternShort: ["m3", "m3", "M3"],
} as const;

const wholeHalfDiminished: ModalScaleCollection = {
  category: "scale",
  rotation: 0,
  rotatedScale: "wholeHalfDiminished",
  mostSimilarScale: "wholeHalfDiminished",
  primaryName: "Whole Half Diminished",
  names: ["Whole Half Diminished"],
  intervals: ["1", "2", "♭3", "4", "♭5", "♭6", "6", "7", "8"],
  integers: [0, 2, 3, 5, 6, 8, 9, 11],
  type: ["diminished", "scale", "symmetrical", "octatonic"],
  characteristics: ["tense", "jazzy", "symmetrical", "alternating tones"],
  pattern: ["whole", "half", "whole", "half", "whole", "half", "whole", "half"],
  patternShort: ["W", "H", "W", "H", "W", "H", "W", "H"],
} as const;

const halfWholeDiminished: ModalScaleCollection = {
  category: "scale",
  rotation: 1,
  rotatedScale: "wholeHalfDiminished",
  mostSimilarScale: "wholeHalfDiminished",
  primaryName: "Half Whole Diminished",
  names: ["Half Whole Diminished", "Dominant Diminished"],
  intervals: ["1", "♭2", "♯2", "3", "♯4", "5", "6", "♭7", "8"],
  integers: [0, 1, 3, 4, 6, 7, 9, 10],
  type: ["diminished", "dominant", "scale", "symmetrical", "octatonic"],
  characteristics: [
    "tense",
    "jazzy",
    "symmetrical",
    "used over dominant 7th chords",
  ],
  pattern: ["half", "whole", "half", "whole", "half", "whole", "half", "whole"],
  patternShort: ["H", "W", "H", "W", "H", "W", "H", "W"],
} as const;

export const _diminishedVariants = {
  diminishedTriad,
  diminished7,
  halfDiminished7,
  wholeHalfDiminished,
  halfWholeDiminished,
} as const;

export type DiminishedVariantKey = keyof typeof _diminishedVariants;

/** Built-in diminished chord and scale collections keyed by collection id. */
export const diminishedVariants: Record<DiminishedVariantKey, NoteCollection> =
  _diminishedVariants;
