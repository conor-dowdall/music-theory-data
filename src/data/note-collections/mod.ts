import type { NoteCollection } from "../../types/note-collections.ts";
import { type DiatonicModeKey, diatonicModes } from "./diatonic-modes.ts";
import {
  type PentatonicVariantKey,
  pentatonicVariants,
} from "./pentatonic-variants.ts";
import { type MajorVariantKey, majorVariants } from "./major-variants.ts";
import { type MinorVariantKey, minorVariants } from "./minor-variants.ts";
import {
  type DominantVariantKey,
  dominantVariants,
} from "./dominant-variants.ts";
import {
  type HarmonicMinorModeKey,
  harmonicMinorModes,
} from "./harmonic-minor-modes.ts";
import {
  type MelodicMinorModeKey,
  melodicMinorModes,
} from "./melodic-minor-modes.ts";
import {
  type DiminishedVariantKey,
  diminishedVariants,
} from "./diminished-variants.ts";
import {
  type AugmentedVariantKey,
  augmentedVariants,
} from "./augmented-variants.ts";
import {
  type OtherNoteCollectionKey,
  otherNoteCollections,
} from "./other-collections.ts";

export { diatonicModes } from "./diatonic-modes.ts";
export { pentatonicVariants } from "./pentatonic-variants.ts";
export { majorVariants } from "./major-variants.ts";
export { minorVariants } from "./minor-variants.ts";
export { dominantVariants } from "./dominant-variants.ts";
export { harmonicMinorModes } from "./harmonic-minor-modes.ts";
export { melodicMinorModes } from "./melodic-minor-modes.ts";
export { diminishedVariants } from "./diminished-variants.ts";
export { augmentedVariants } from "./augmented-variants.ts";
export { otherNoteCollections } from "./other-collections.ts";
export type { DiatonicModeKey } from "./diatonic-modes.ts";
export type { PentatonicVariantKey } from "./pentatonic-variants.ts";
export type { MajorVariantKey } from "./major-variants.ts";
export type { MinorVariantKey } from "./minor-variants.ts";
export type { DominantVariantKey } from "./dominant-variants.ts";
export type { HarmonicMinorModeKey } from "./harmonic-minor-modes.ts";
export type { MelodicMinorModeKey } from "./melodic-minor-modes.ts";
export type { DiminishedVariantKey } from "./diminished-variants.ts";
export type { AugmentedVariantKey } from "./augmented-variants.ts";
export type { OtherNoteCollectionKey } from "./other-collections.ts";

/** A strictly typed generic string representing any key corresponding to a NoteCollection loaded in `noteCollections`. */
export type NoteCollectionKey =
  | DiatonicModeKey
  | PentatonicVariantKey
  | MajorVariantKey
  | MinorVariantKey
  | DominantVariantKey
  | HarmonicMinorModeKey
  | MelodicMinorModeKey
  | DiminishedVariantKey
  | AugmentedVariantKey
  | OtherNoteCollectionKey;

/** A massive, flattened dictionary of every pre-defined musical note, dyad, scale, mode, chord, and arpeggio inside the library. */
export const builtInNoteCollections: Record<
  NoteCollectionKey,
  NoteCollection
> = {
  ...diatonicModes,
  ...pentatonicVariants,
  ...majorVariants,
  ...minorVariants,
  ...dominantVariants,
  ...harmonicMinorModes,
  ...melodicMinorModes,
  ...diminishedVariants,
  ...augmentedVariants,
  ...otherNoteCollections,
} as const;

/** A massive, flattened dictionary of every pre-defined musical note, dyad, scale, mode, chord, and arpeggio inside the library. */
export const noteCollections: Record<NoteCollectionKey, NoteCollection> =
  builtInNoteCollections;

/** A strictly typed key for any built-in note collection categorized as a chord. */
export type ChordCollectionKey =
  | MajorVariantKey
  | MinorVariantKey
  | "dominant7"
  | "dominant9"
  | "dominant11"
  | "dominant13"
  | "diminishedTriad"
  | "diminished7"
  | "halfDiminished7"
  | AugmentedVariantKey;

/** An organized, grouped dictionary splitting note collections into theoretical categories (e.g. Diatonic Modes, Major Variants). */
export const groupedNoteCollections = {
  diatonicModes,
  pentatonicVariants,
  majorVariants,
  minorVariants,
  dominantVariants,
  harmonicMinorModes,
  melodicMinorModes,
  diminishedVariants,
  augmentedVariants,
  otherNoteCollections,
} as const;

/** A strictly typed generic string representing the key of a top-level note collection category array. */
export type NoteCollectionGroupKey = keyof typeof groupedNoteCollections;

/** Ordered keys for the built-in note collection groups. */
export const noteCollectionGroupKeys: readonly NoteCollectionGroupKey[] = Object
  .keys(groupedNoteCollections) as NoteCollectionGroupKey[];

/** Returns whether a value is a built-in note collection group key. */
export function isNoteCollectionGroupKey(
  value: unknown,
): value is NoteCollectionGroupKey {
  return typeof value === "string" &&
    Object.prototype.hasOwnProperty.call(groupedNoteCollections, value);
}

/** Human-readable DisplayName and Description metadata representing the mathematical traits of a Collection Group. */
export const noteCollectionGroupsMetadata: Record<
  NoteCollectionGroupKey,
  {
    displayName: string;
    description: string;
  }
> = {
  diatonicModes: {
    displayName: "Diatonic Modes",
    description:
      "Traditional seven-note scales derived from the major scale, each starting on a different scale degree.",
  },
  pentatonicVariants: {
    displayName: "Pentatonic Variants",
    description: "Five-note scales used widely in folk, blues, and rock music.",
  },
  majorVariants: {
    displayName: "Major Variants",
    description:
      "Chord structures based on the major triad, including sixth and major seventh harmonies.",
  },
  minorVariants: {
    displayName: "Minor Variants",
    description:
      "Chord structures based on the minor triad, including sixth and seventh harmonies.",
  },
  dominantVariants: {
    displayName: "Dominant Variants",
    description:
      "Chord structures based on the dominant seventh chord, including extended harmonies (9ths, 11ths, 13ths).",
  },
  harmonicMinorModes: {
    displayName: "Harmonic Minor Modes",
    description:
      "Seven-note scales derived from the harmonic minor scale, each starting on a different scale degree.",
  },
  melodicMinorModes: {
    displayName: "Melodic Minor Modes",
    description:
      "Seven-note scales derived from the melodic minor scale, each starting on a different scale degree.",
  },
  diminishedVariants: {
    displayName: "Diminished",
    description: "Tense and dissonant chords and scales built on minor thirds.",
  },
  augmentedVariants: {
    displayName: "Augmented",
    description:
      "Unstable and dreamy chords and scales, including classical augmented sixth chords.",
  },
  otherNoteCollections: {
    displayName: "Other",
    description:
      "Single notes, dyads, and other useful collections that don't belong to a larger theory family.",
  },
} as const;
