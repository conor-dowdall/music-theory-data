import type { NoteCollection } from "../../types/note-collections.d.ts";

const majorPentatonic: NoteCollection = {
  primaryName: "Major Pentatonic",
  names: ["Major Pentatonic"],
  intervals: ["1", "2", "3", "5", "6", "8"],
  integers: [0, 2, 4, 7, 9],
  type: ["major", "pentatonic", "scale", "gapped scale"],
  characteristics: [
    "open",
    "positive",
    "simple",
    "found in many cultures",
    "folk music",
    "country music",
  ],
  pattern: ["whole", "whole", "minor third", "whole", "minor third"],
  patternShort: ["W", "W", "m3", "W", "m3"],
} as const;

const suspendedPentatonic: NoteCollection = {
  primaryName: "Suspended Pentatonic",
  names: ["Suspended Pentatonic", "Egyptian Pentatonic"],
  intervals: ["1", "2", "4", "5", "♭7", "8"],
  integers: [0, 2, 5, 7, 10],
  type: ["suspended", "pentatonic", "scale", "gapped scale"],
  characteristics: ["open", "stable", "neutral", "neither major nor minor"],
  pattern: ["whole", "minor third", "whole", "minor third"],
  patternShort: ["W", "m3", "W", "m3"],
} as const;

const bluesMinorPentatonic: NoteCollection = {
  primaryName: "Blues Minor Pentatonic",
  names: ["Blues Minor Pentatonic"],
  intervals: ["1", "♭3", "4", "♭5", "♭7", "8"],
  integers: [0, 3, 5, 8, 10],
  type: ["minor", "pentatonic", "scale", "gapped scale", "blues"],
  characteristics: ["bluesy", "tense", "minor with a blue note"],
  pattern: ["minor third", "whole", "half", "minor third"],
  patternShort: ["m3", "W", "H", "m3"],
} as const;

const bluesMajorPentatonic: NoteCollection = {
  primaryName: "Blues Major Pentatonic",
  names: ["Blues Major Pentatonic"],
  intervals: ["1", "2", "♭3", "5", "6", "8"],
  integers: [0, 2, 5, 7, 9],
  type: ["major", "pentatonic", "scale", "gapped scale", "blues"],
  characteristics: ["bluesy", "country", "major with a blue note"],
  pattern: ["whole", "half", "major third", "whole"],
  patternShort: ["W", "H", "M3", "W"],
} as const;

const minorPentatonic: NoteCollection = {
  primaryName: "Minor Pentatonic",
  names: ["Minor Pentatonic"],
  intervals: ["1", "♭3", "4", "5", "♭7", "8"],
  integers: [0, 3, 5, 7, 10],
  type: ["minor", "pentatonic", "scale", "gapped scale"],
  characteristics: [
    "bluesy",
    "rock",
    "versatile",
    "found in many cultures",
    "relative of major pentatonic",
  ],
  pattern: ["minor third", "whole", "whole", "minor third", "whole"],
  patternShort: ["m3", "W", "W", "m3", "W"],
} as const;

const dominantPentatonic: NoteCollection = {
  primaryName: "Dominant Pentatonic",
  names: ["Dominant Pentatonic"],
  intervals: ["1", "2", "3", "5", "♭7", "8"],
  integers: [0, 2, 4, 7, 10],
  type: ["dominant", "pentatonic", "scale", "gapped scale"],
  characteristics: ["bluesy", "dominant feel", "mixolydian flavor"],
  pattern: ["whole", "whole", "minor third", "minor third"],
  patternShort: ["W", "W", "m3", "m3"],
} as const;

export const _pentatonicVariants = {
  majorPentatonic,
  suspendedPentatonic,
  bluesMinorPentatonic,
  bluesMajorPentatonic,
  minorPentatonic,
  dominantPentatonic,
} as const;

export type PentatonicVariantKey = keyof typeof _pentatonicVariants;

export const pentatonicVariants: Record<PentatonicVariantKey, NoteCollection> =
  _pentatonicVariants;
