/**
 * Aggregates and exports all note sequence collections with their associated types.
 * This module serves as the main entry point for accessing note sequences,
 * providing both flat and grouped access patterns.
 *
 * Features:
 * - Flat access to all sequences via `flatNoteSequenceThemes`
 * - Grouped access via `noteSequenceThemes`
 * - Type-safe access through TypeScript types
 *
 * Example Usage:
 * ```ts
 * // Flat access
 * const ionian = flatNoteSequenceThemes.ionian;
 * const major7 = flatNoteSequenceThemes.major7;
 *
 * // Grouped access
 * const modes = noteSequenceThemes.diatonicModes;
 * const majors = noteSequenceThemes.majorVariants;
 * const ionian = noteSequenceThemes.diatonicModes.ionian;
 * const major7 = noteSequenceThemes.majorVariants.major7;
 * ```
 *
 * @module
 */

import { diatonicModes } from "./diatonic-modes.ts";
import { dominantVariants } from "./dominant-variants.ts";
import { majorVariants } from "./major-variants.ts";

/**
 * A flattened collection of all note sequence themes for direct access
 */
export const flatNoteSequenceThemes = {
  ...diatonicModes,
  ...dominantVariants,
  ...majorVariants,
} as const;

/**
 * A grouped collection of all note sequence themes
 */
export const noteSequenceThemes = {
  diatonicModes,
  dominantVariants,
  majorVariants,
} as const;

/*
 * Defines a type that represents the available note sequence themes.
 */
export type NoteSequenceThemes = typeof noteSequenceThemes;

/*
 * Defines a type that represents the names of the available
 * note sequence theme groups.
 */
export type NoteSequenceThemeGroup = keyof NoteSequenceThemes;

/*
 * Defines a type that represents the names of the available
 * note sequence themes.
 */
export type NoteSequenceThemeName = {
  [K in keyof NoteSequenceThemes]: keyof NoteSequenceThemes[K];
}[keyof NoteSequenceThemes];
