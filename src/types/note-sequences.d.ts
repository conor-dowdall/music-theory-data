import type { NoteLabelThemeName } from "../note-labels/note-label-themes.ts";

/** Represents the pitch class in integer notation - a number between 0 (C) and 11 (B). */
export type PitchInteger = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

/**
 * Defines a type that represents a Map of PitchInteger to string.
 * This is used for overriding labels in a specific NoteSequenceTheme.
 */
export type LabelsOverrideMap = Map<PitchInteger, string>;

/**
 * Defines a type that represents the labels override for each note label theme.
 * This allows for partial overrides of the labels in a specific NoteSequenceTheme.
 */
export type LabelsOverride = Partial<
  Record<NoteLabelThemeName, LabelsOverrideMap>
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
   */
  sequence: PitchInteger[];
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
