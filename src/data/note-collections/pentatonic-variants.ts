import type {
  ModalScaleCollection,
  ParentScaleCollection,
  ScaleCollection,
} from "../../types/note-collections.d.ts";

const majorPentatonic: ParentScaleCollection = {
  category: "scale",
  rotation: 0,
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

const suspendedPentatonic: ModalScaleCollection = {
  category: "scale",
  rotation: 1,
  parentScale: "majorPentatonic",
  primaryName: "Suspended Pentatonic",
  names: ["Suspended Pentatonic", "Egyptian Pentatonic"],
  intervals: ["1", "2", "4", "5", "♭7", "8"],
  integers: [0, 2, 5, 7, 10],
  type: ["suspended", "pentatonic", "scale", "gapped scale"],
  characteristics: ["open", "stable", "neutral", "neither major nor minor"],
  pattern: ["whole", "minor third", "whole", "minor third", "whole"],
  patternShort: ["W", "m3", "W", "m3", "W"],
} as const;

const bluesMinorPentatonic: ModalScaleCollection = {
  category: "scale",
  rotation: 2,
  parentScale: "majorPentatonic",
  primaryName: "Blues Minor Pentatonic",
  names: ["Blues Minor Pentatonic"],
  intervals: ["1", "♭3", "4", "♭6", "♭7", "8"],
  integers: [0, 3, 5, 8, 10],
  type: ["minor", "pentatonic", "scale", "gapped scale", "blues"],
  characteristics: ["bluesy", "tense"],
  pattern: ["minor third", "whole", "minor third", "whole", "whole"],
  patternShort: ["m3", "W", "m3", "W", "W"],
} as const;

const bluesMajorPentatonic: ModalScaleCollection = {
  category: "scale",
  rotation: 3,
  parentScale: "majorPentatonic",
  primaryName: "Blues Major Pentatonic",
  names: ["Blues Major Pentatonic"],
  intervals: ["1", "2", "4", "5", "6", "8"],
  integers: [0, 2, 5, 7, 9],
  type: ["major", "pentatonic", "scale", "gapped scale", "blues"],
  characteristics: ["bluesy", "country"],
  pattern: ["whole", "minor third", "whole", "whole", "minor third"],
  patternShort: ["W", "m3", "W", "W", "m3"],
} as const;

const minorPentatonic: ModalScaleCollection = {
  category: "scale",
  rotation: 4,
  parentScale: "majorPentatonic",
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

export const _pentatonicVariants = {
  majorPentatonic,
  suspendedPentatonic,
  bluesMinorPentatonic,
  bluesMajorPentatonic,
  minorPentatonic,
} as const;

export type PentatonicVariantKey = keyof typeof _pentatonicVariants;

export const pentatonicVariants: Record<PentatonicVariantKey, ScaleCollection> =
  _pentatonicVariants;
