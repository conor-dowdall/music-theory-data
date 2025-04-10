import { diatonicModes } from "./diatonic-modes.ts";
import { dominantVariants } from "./dominant-variants.ts";
import { majorVariants } from "./major-variants.ts";

/*
 * A collection of all note sequence themes
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
