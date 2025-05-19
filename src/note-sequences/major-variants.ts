/**
 * Collection of major chord and arpeggio variants commonly used in music.
 * These patterns build upon the basic major triad (1-3-5) by adding extensions
 * like 6ths, 7ths, and 9ths to create richer harmonic structures.
 *
 * Key variants include:
 * - Major Triad: The basic major chord
 * - Major 6th: Adds major 6th to triad
 * - Major 7th: Adds major 7th to triad
 * - ...
 *
 * @module
 */

import type { NoteSequenceTheme } from "../types/note-sequences.d.ts";

/**
 * Type representing all available major variant names/keys.
 * Provides type-safe access to properties.
 *
 * @example
 * ```ts
 * // Type-safe chord variant access
 * function getMajorChord(type: MajorVariantKey) {
 *   return majorVariants[type];
 * }
 *
 * const maj7 = getMajorChord("major7");     // Valid
 * // @ts-expect-error bad major variant name
 * const invalid = getMajorChord("minor7");   // Type error
 * ```
 */
export type MajorVariantKey =
  | "major"
  | "major6"
  | "major7"
  | "major9"
  | "majorAdd9"
  | "major6Add9";

/**
 * These are variants of the major-style chord.
 * @see {@link MajorVariantKey} for the type of each variant.
 * @see {@link NoteSequenceTheme} for the structure of each variant.
 */
export const majorVariants: Record<MajorVariantKey, NoteSequenceTheme> = {
  major: {
    primaryName: "M",
    names: ["M", "Major"],
    sequence: [0, 4, 7],
    type: ["major", "chord", "arpeggio"],
    characteristics: ["stable", "happy", "bright"],
    pattern: ["major third", "minor third"],
    patternShort: ["M3", "m3"],
    degrees: ["1", "3", "5"],
    exampleNotes: ["C", "E", "G"],
  },
  major6: {
    primaryName: "M6",
    names: ["M6", "6", "Major 6th"],
    sequence: [0, 4, 7, 9],
    type: ["major", "chord", "arpeggio"],
    characteristics: ["stable", "happy", "bright", "sweet", "melodic"],
    pattern: ["major third", "minor third", "major second"],
    patternShort: ["M3", "m3", "M2"],
    degrees: ["1", "3", "5", "6"],
    exampleNotes: ["C", "E", "G", "A"],
  },
  major7: {
    primaryName: "M7",
    names: ["M7", "7", "Major 7th"],
    sequence: [0, 4, 7, 11],
    type: ["major", "chord", "arpeggio"],
    characteristics: ["stable", "happy", "bright", "sophisticated", "lush"],
    pattern: ["major third", "minor third", "major third"],
    patternShort: ["M3", "m3", "M3"],
    degrees: ["1", "3", "5", "7"],
    exampleNotes: ["C", "E", "G", "B"],
  },
  major9: {
    primaryName: "M9",
    names: ["M9", "9", "Major 9th"],
    sequence: [0, 2, 4, 7, 11],
    type: ["major", "chord", "arpeggio"],
    characteristics: ["stable", "happy", "bright", "colorful", "rich", "airy"],
    pattern: ["major third", "minor third", "major third", "minor third"],
    patternShort: ["M3", "m3", "M3", "m3"],
    degrees: ["1", "3", "5", "7", "9"],
    exampleNotes: ["C", "E", "G", "B", "D"],
    labelsOverride: {
      quality: new Map([[2, "M9"]]),
      relative: new Map([[2, "9"]]),
    },
  },
  majorAdd9: {
    primaryName: "add9",
    names: ["add9", "Major add 9"],
    sequence: [0, 2, 4, 7],
    type: ["major", "chord", "arpeggio"],
    characteristics: ["stable", "happy", "bright", "colorful", "open", "airy"],
    pattern: ["major third", "minor third", "perfect fifth"],
    patternShort: ["M3", "m3", "P5"],
    degrees: ["1", "3", "5", "9"],
    exampleNotes: ["C", "E", "G", "D"],
    labelsOverride: {
      quality: new Map([[2, "M9"]]),
      relative: new Map([[2, "9"]]),
    },
  },
  major6Add9: {
    primaryName: "6add9",
    names: ["6add9", "Major 6 add 9", "6/9", "Major 6/9"],
    sequence: [0, 2, 4, 7, 9],
    type: ["major", "chord", "arpeggio"],
    characteristics: [
      "stable",
      "happy",
      "bright",
      "sweet",
      "melodic",
      "colorful",
      "rich",
      "open",
    ],
    pattern: ["major third", "minor third", "major second", "perfect fourth"],
    patternShort: ["M3", "m3", "M2", "P4"],
    degrees: ["1", "3", "5", "6", "9"],
    exampleNotes: ["C", "E", "G", "A", "D"],
    labelsOverride: {
      quality: new Map([[2, "M9"]]),
      relative: new Map([[2, "9"]]),
    },
  },
} as const;
