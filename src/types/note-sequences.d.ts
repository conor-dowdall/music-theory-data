/**
 * Type definitions for musical note sequences like scales, modes, and chords.
 * Provides TypeScript types for consistent representation of musical patterns.
 *
 * Key Types:
 * - NoteInteger: Numbers 0-11 representing pitch classes
 * - NoteSequenceTheme: Complete definition of a musical pattern
 * - LabelsOverride: Custom labeling for specific contexts
 *
 * @example
 * ```ts
 * import type { NoteSequenceTheme, NoteInteger } from "@musodojo/music-theory-data/types";
 *
 * // Define a custom scale
 * // @ts-expect-error properties missing from NoteSequenceTheme
 * const customScale: NoteSequenceTheme = {
 *   primaryName: "Custom Scale",
 *   sequence: [0, 2, 4, 5, 7, 9, 11],
 *   // ...other required properties
 * };
 *
 * // Type-safe pitch class
 * const root: NoteInteger = 0;  // C
 * // @ts-expect-error 12 is not a valid pitch class
 * const invalid: NoteInteger = 12;  // Type error
 * ```
 *
 * @module
 */

import type { NoteLabelThemeKey } from "../note-labels/note-label-themes.ts";
import type { NoteInteger } from "../types/note-labels.d.ts";

/**
 * Defines a type that represents a Map of NoteInteger to string.
 * This is used for overriding labels in a specific NoteSequenceTheme.
 */
export type LabelsOverrideMap = Map<NoteInteger, string>;

/**
 * Defines a type that represents the labels override for each note label theme.
 * This allows for partial overrides of the labels in a specific NoteSequenceTheme.
 */
export type LabelsOverride = Partial<
  Record<NoteLabelThemeKey, LabelsOverrideMap>
>;

/**
 * Represents a musical-sequence theme, such as a chord, scale, or mode.
 */
export interface NoteSequenceTheme {
  /**
   * The primary, human-readable name of the theme
   * (e.g., "Major").
   */
  primaryName: string;
  /**
   * An array of names for the theme
   * (e.g., ["Ionian", "Major"]).
   */
  names: string[];
  /**
   * An array of numerical semitone intervals from the root
   * (e.g., [0, 2, 4, 5, 7, 9, 11]).
   * @see {@link NoteInteger}
   */
  sequence: NoteInteger[];
  /**
   * An array of general types this theme belongs to
   * (e.g., ["major", "mode", "scale"]).
   */
  type: string[];
  /**
   * An array of descriptive characteristics of the theme
   *  (e.g., ["bright", "happy"]).
   */
  characteristics: string[];
  /**
   * An array describing the intervallic pattern
   * (e.g., ["whole" "half", ...]).
   */
  pattern: string[];
  /**
   * A short version of the intervallic pattern
   * (e.g., ["W", "H", ...]).
   */
  patternShort: string[];
  /**
   * An array of degree names
   * (e.g., ["1", "2", "3", ...]).
   */
  degrees: string[];
  /**
   * Example notes for the theme
   * (e.g., ["C", "D", "E"]).
   */
  exampleNotes: string[];
  /**
   * Optional overrides for labels.
   */
  labelsOverride?: LabelsOverride;
}
