import { diatonicModes } from "./diatonic-modes.ts";
import { dominantVariants } from "./dominant-variants.ts";
import { majorVariants } from "./major-variants.ts";

/*
 * Defines a type that represents the available note sequence themes.
 */
export type NoteSequenceThemes = typeof noteSequenceThemes;

/*
 * Defines a type that represents the names of the available
 * note sequence themes.
 */
export type NoteSequenceThemeName = keyof NoteSequenceThemes;

/*
 * An object containing the available note sequence themes,
 * such as diatonic modes, major variants, and dominant variants.
 */
export const noteSequenceThemes = {
  ...diatonicModes,
  ...dominantVariants,
  ...majorVariants,
};
