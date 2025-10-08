import { diatonicModes } from "./diatonic-modes.ts";
import { pentatonicVariants } from "./pentatonic-variants.ts";
import { majorVariants } from "./major-variants.ts";
import { minorVariants } from "./minor-variants.ts";
import { dominantVariants } from "./dominant-variants.ts";
import { harmonicMinorModes } from "./harmonic-minor-modes.ts";
import { melodicMinorModes } from "./melodic-minor-modes.ts";
import { diminished } from "./diminished.ts";
import { augmented } from "./augmented.ts";
import { otherNoteCollections } from "./other-collections.ts";

export { diatonicModes } from "./diatonic-modes.ts";
export { pentatonicVariants } from "./pentatonic-variants.ts";
export { majorVariants } from "./major-variants.ts";
export { minorVariants } from "./minor-variants.ts";
export { dominantVariants } from "./dominant-variants.ts";
export { harmonicMinorModes } from "./harmonic-minor-modes.ts";
export { melodicMinorModes } from "./melodic-minor-modes.ts";
export { diminished } from "./diminished.ts";
export { augmented } from "./augmented.ts";
export { otherNoteCollections } from "./other-collections.ts";

export const noteCollections = {
  ...diatonicModes,
  ...pentatonicVariants,
  ...majorVariants,
  ...minorVariants,
  ...dominantVariants,
  ...harmonicMinorModes,
  ...melodicMinorModes,
  ...diminished,
  ...augmented,
  ...otherNoteCollections,
} as const;

export type NoteCollectionKey = keyof typeof noteCollections;

export const groupedNoteCollections = {
  diatonicModes,
  pentatonicVariants,
  majorVariants,
  minorVariants,
  dominantVariants,
  harmonicMinorModes,
  melodicMinorModes,
  diminished,
  augmented,
  otherNoteCollections,
} as const;

export type NoteCollectionGroupKey = keyof typeof groupedNoteCollections;

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
  diminished: {
    displayName: "Diminished",
    description: "Tense and dissonant chords and scales built on minor thirds.",
  },
  augmented: {
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
