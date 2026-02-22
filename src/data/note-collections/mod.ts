import { diatonicModes } from "./diatonic-modes.ts";
import { pentatonicVariants } from "./pentatonic-variants.ts";
import { majorVariants } from "./major-variants.ts";
import { minorVariants } from "./minor-variants.ts";
import { dominantVariants } from "./dominant-variants.ts";
import { harmonicMinorModes } from "./harmonic-minor-modes.ts";
import { melodicMinorModes } from "./melodic-minor-modes.ts";
import { diminishedVariants } from "./diminished-variants.ts";
import { augmentedVariants } from "./augmented-variants.ts";
import { otherNoteCollections } from "./other-collections.ts";

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

/** A massive, flattened dictionary of every pre-defined musical scale, mode, chord, and arpeggio inside the library. */
export const noteCollections = {
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

/** A strictly typed generic string representing any key corresponding to a NoteCollection loaded in `noteCollections`. */
export type NoteCollectionKey = keyof typeof noteCollections;

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
      "Other note collections that don't fall into a specific category.",
  },
} as const;
