/**
 * Type definitions for musical note sequences like scales, modes, and chords.
 * Provides TypeScript types for consistent representation of musical patterns.
 *
 * @example
 * ```ts
 * import type { NoteSequenceTheme, NoteInteger } from "@musodojo/music-theory-data/types";
 *
 * // Define a custom scale
 * const customScale: Partial<NoteSequenceTheme> = {
 *   primaryName: "Custom Scale",
 *   sequence: [0, 2, 4, 5, 7, 9, 11],
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

import type {
  Interval,
  NoteInteger,
  NoteLabelThemeKey,
  NoteName,
} from "../types/note-labels.d.ts";

/**
 * A map where keys are `NoteInteger` (0-11) and values are their
 * string labels. Used to provide custom labels for specific notes within a
 * `NoteSequenceTheme`.
 * @see {@link NoteSequenceTheme}
 * @see {@link LabelsOverride}
 */
export type LabelsOverrideMap = Map<NoteInteger, string>;

/**
 * An object that provides custom label mappings for various `NoteLabelTheme`s.
 * This allows a `NoteSequenceTheme` to specify alternative note names for
 * different labeling contexts (e.g., using "MAJ7" in a "quality" theme).
 *
 * @example
 * const major7Labels: LabelsOverride = {
 *   quality: new Map([[0, "R"], [4, "MAJ3"], [7, "P5"], [11, "MAJ7"]]),
 *   relative: new Map([[0, "1"], [4, "3"], [7, "5"], [11, "7"]]),
 * };
 */
export type LabelsOverride = Partial<
  Record<NoteLabelThemeKey, LabelsOverrideMap>
>;

/**
 * The core interface for defining a musical sequence theme (e.g., a scale, chord, or mode).
 * It contains all the necessary information to describe the musical and theoretical
 * properties of the sequence.
 */
export interface NoteSequenceTheme {
  /** The primary, most common human-readable name (e.g., "Major"). */
  primaryName: string;
  /** An array of alternative names and synonyms (e.g., ["Ionian", "Major"]). */
  names: string[];
  /** An array of interval names relative to the root (e.g., ["1", "2", "3", "4", "5", "6", "7", "8"]). */
  intervals: Interval[];
  /**
   * An array of `NoteInteger`s representing the sequence of semitone intervals
   * from the root (e.g., `[0, 2, 4, 5, 7, 9, 11]` for a major scale).
   * @see {@link NoteInteger}
   */
  sequence: NoteInteger[];
  /** A list of classifications for the theme (e.g., ["major", "mode", "scale"]). */
  type: string[];
  /** A list of subjective or descriptive characteristics (e.g., ["bright", "happy"]). */
  characteristics: string[];
  /** The pattern of whole and half steps as full words. Usually "whole", "half", etc. for scales and modes,
   * and "major third", "minor third", etc. for chords and arpeggios
   * @example
   * pattern: ["whole", "whole", "half", "whole", "whole", "whole", "half"], // major scale
   * @example
   * pattern: ["major third", "minor third", "minor third"], // dominant seventh chord or arpeggio
   */
  pattern: string[];
  /** The pattern of whole and half steps as single letters (e.g., ["W", "W", "H"]) for scales and modes and
   * the pattern as "M3", "m3", etc. for chords and arpeggios.
   * @example
   * patternShort: ["W", "W", "H", "W", "W", "W", "H"], // major scale
   * @example
   * patternShort: ["M3", "m3", "m3"], // dominant seventh chord or arpeggio
   */
  patternShort: string[];
  /** An example of the theme's notes, typically starting on C or A for minor
   * (e.g., ["C", "D", "E", "F", "G", "A", "B"]).
   */
  exampleNotes: NoteName[];
  /**
   * Optional overrides for note labels in different `NoteLabelTheme` contexts.
   * @see {@link LabelsOverride}
   */
  labelsOverride?: LabelsOverride;
}

/** A key representing a group of related `NoteSequenceTheme`s. */
export type NoteSequenceThemeGroupKey =
  | "diatonicModes"
  | "dominantVariants"
  | "majorVariants"
  | "melodicMinorModes"
  | "otherSequences";

/** A key for one of the seven diatonic modes. */
export type DiatonicModeKey =
  | "ionian"
  | "dorian"
  | "phrygian"
  | "lydian"
  | "mixolydian"
  | "aeolian"
  | "locrian";

/** A key for a dominant chord variant. */
export type DominantVariantKey =
  | "dominant7"
  | "dominant9"
  | "dominant11"
  | "dominant13";

/** A key for a major chord or scale variant. */
export type MajorVariantKey =
  | "major"
  | "major6"
  | "major7"
  | "major9"
  | "majorAdd9"
  | "major6Add9";

/** A key for one of the seven modes of the melodic minor scale. */
export type MelodicMinorModeKey =
  | "melodicMinor"
  | "dorianFlat2"
  | "lydianAugmented"
  | "lydianDominant"
  | "mixolydianFlat6"
  | "aeolianFlat5"
  | "altered";

/** A key for other miscellaneous sequences. */
export type OtherSequenceKey = "chromatic";

/**
 * A comprehensive key that includes all available `NoteSequenceTheme` keys.
 * This type is a union of all the specific theme key types.
 */
export type NoteSequenceThemeKey =
  | DiatonicModeKey
  | DominantVariantKey
  | MajorVariantKey
  | MelodicMinorModeKey
  | OtherSequenceKey;
