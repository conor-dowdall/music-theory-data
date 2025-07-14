/**
 * @module
 *
 * This module provides the core type definitions for musical sequences such as
 * scales, modes, and chords. The central type is `NoteSequenceTheme`, which
 * encapsulates all the necessary data to describe a musical pattern.
 *
 * @example
 * ```ts
 * import type { NoteSequenceTheme, NoteInteger } from "@musodojo/music-theory-data/types";
 *
 * // Define a custom scale (partially)
 * const customScale: Partial<NoteSequenceTheme> = {
 *   primaryName: "Custom Scale",
 *   integers: [0, 2, 4, 5, 7, 9, 11], // e.g., a major scale
 *   type: ["scale"],
 * };
 *
 * // Type-safe pitch class
 * const root: NoteInteger = 0;  // C
 * // @ts-expect-error 12 is not a valid pitch class
 * const invalid: NoteInteger = 12;  // Type error
 * ```
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
  /**
   * An array of interval names relative to the root. For scales and modes,
   * this typically includes the octave ("8"). For chords and arpeggios, it usually does not.
   * @example ["1", "2", "3", "4", "5", "6", "7", "8"] // Ionian Mode
   * @example ["1", "3", "5", "♭7"] // Dominant 7th Chord
   */
  intervals: Interval[];
  /**
   * An array of `NoteInteger`s (0-11) representing the unique pitch classes
   * of the theme, sorted in ascending order. This provides a canonical
   * "fingerprint" of the note collection, independent of melodic or harmonic
   * voicing. It is useful for analysis, comparison, and searching.
   *
   * This array should *not* include the octave (which would be a duplicate of
   * the root note, 0).
   *
   * @example [0, 2, 4, 5, 7, 9, 11] // For a major scale.
   * @example [0, 4, 7, 10] // For a dominant 7th chord.
   * @see {@link NoteInteger}
   */
  integers: NoteInteger[];
  /**
   * A list of classifications for the theme.
   * @example ["major", "mode", "scale"]
   * @example ["dominant", "chord", "arpeggio"]
   */
  type: string[];
  /** A list of subjective or descriptive characteristics (e.g., ["bright", "happy"]). */
  characteristics: string[];
  /**
   * The pattern of intervals as full words.
   * @example ["whole", "whole", "half", ...] // For a scale
   * @example ["major third", "minor third", ...] // For a chord
   */
  pattern: string[];
  /**
   * A short-hand representation of the interval pattern.
   * @example ["W", "W", "H", ...] // For a scale
   * @example ["M3", "m3", ...] // For a chord
   */
  patternShort: string[];
  /** An example of the theme's notes.
   * Typically chords start on C for major and A for minor.
   * diatonicModes has them ascending through C, D, E, F, G, A, B to match each
   * diatonic mode's notes with only natural notes.
   * melodic-and-harmonic minor start on A because they are based on minor.
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
  | "harmonicMinorModes"
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

/** A key for one of the seven modes of the harmonic minor scale. */
export type HarmonicMinorModeKey =
  | "harmonicMinor"
  | "locrianSharp6"
  | "ionianSharp5"
  | "dorianSharp4"
  | "phrygianDominant"
  | "lydianSharp2"
  | "superLocrianDoubleFlat7";

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
  | HarmonicMinorModeKey
  | OtherSequenceKey;
