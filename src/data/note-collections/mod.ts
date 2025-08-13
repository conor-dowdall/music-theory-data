import { diatonicModes } from "./diatonic-modes.ts";
import { harmonicMinorModes } from "./harmonic-minor-modes.ts";
import { melodicMinorModes } from "./melodic-minor-modes.ts";
import { dominantVariants } from "./dominant-variants.ts";
import { majorVariants } from "./major-variants.ts";
import { otherNoteCollections } from "./other-collections.ts";

import type { NoteCollectionGroupKey } from "../../types/note-collections.d.ts";

export { diatonicModes } from "./diatonic-modes.ts";
export { dominantVariants } from "./dominant-variants.ts";
export { harmonicMinorModes } from "./harmonic-minor-modes.ts";
export { majorVariants } from "./major-variants.ts";
export { melodicMinorModes } from "./melodic-minor-modes.ts";
export { otherNoteCollections } from "./other-collections.ts";

export const pitchCollections = {
  ...diatonicModes,
  ...harmonicMinorModes,
  ...melodicMinorModes,
  ...dominantVariants,
  ...majorVariants,
  ...otherNoteCollections,
} as const;

export const groupedPitchCollections = {
  diatonicModes,
  harmonicMinorModes,
  melodicMinorModes,
  dominantVariants,
  majorVariants,
  otherNoteCollections,
} as const;

export const pitchCollectionGroupsMetadata: Record<
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
  dominantVariants: {
    displayName: "Dominant Variants",
    description:
      "Chord structures based on the dominant seventh chord, including extended harmonies (9ths, 11ths, 13ths).",
  },
  majorVariants: {
    displayName: "Major Variants",
    description:
      "Chord structures based on the major triad, including sixth and major seventh harmonies.",
  },
  otherNoteCollections: {
    displayName: "Other",
    description:
      "Other pitch collections that don't fall into a specific category.",
  },
} as const;
