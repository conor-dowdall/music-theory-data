/**
 * Aggregates and exports all note sequence collections with their associated types.
 * This module serves as the main entry point for accessing note sequences,
 * providing both flat and grouped access patterns.
 *
 * Features:
 * - Flat access to all sequences via `allNoteSequenceThemes`
 * - Grouped access via `noteSequenceThemes`
 * - Type-safe access through TypeScript types
 *
 * @example
 * ```ts
 * // Grouped access
 * const modes = noteSequenceThemes.diatonicModes;
 * const majors = noteSequenceThemes.majorVariants;
 * const ionian = noteSequenceThemes.diatonicModes.ionian;
 * const major7 = noteSequenceThemes.majorVariants.major7;
 *
 * // Flat access
 * const ionianFromAll = allNoteSequenceThemes.ionian;
 * const major7FromAll = allNoteSequenceThemes.major7;
 * ```
 *
 * @module
 */

import type { NoteSequenceThemeGroupKey } from "../types/note-sequences.d.ts";
import { diatonicModes } from "./diatonic-modes.ts";
import { dominantVariants } from "./dominant-variants.ts";
import { majorVariants } from "./major-variants.ts";
import { melodicMinorModes } from "./melodic-minor-modes.ts";
import { harmonicMinorModes } from "./harmonic-minor-modes.ts";
import { otherSequences } from "./other-sequences.ts";

/**
 * A flattened collection of all note sequence themes for direct access
 */
export const allNoteSequenceThemes = {
  ...diatonicModes,
  ...harmonicMinorModes,
  ...melodicMinorModes,
  ...majorVariants,
  ...dominantVariants,
  ...otherSequences,
} as const;

/**
 * A grouped collection of all note sequence themes
 */
export const noteSequenceThemes = {
  diatonicModes,
  dominantVariants,
  majorVariants,
  melodicMinorModes,
  harmonicMinorModes,
  otherSequences,
} as const;

/**
 * Metadata describing each note sequence theme group.
 */
export const noteSequenceThemeGroupsMetadata: Record<
  NoteSequenceThemeGroupKey,
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
  melodicMinorModes: {
    displayName: "Melodic Minor Modes",
    description:
      "Seven-note scales derived from the melodic minor scale, each starting on a different scale degree.",
  },
  harmonicMinorModes: {
    displayName: "Harmonic Minor Modes",
    description:
      "Seven-note scales derived from the harmonic minor scale, each starting on a different scale degree.",
  },
  otherSequences: {
    displayName: "Other",
    description:
      "Other note sequences that don't fall into a specific category.",
  },
} as const;
