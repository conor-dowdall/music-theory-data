/**
 * @module
 *
 * This file contains a collection of major chord and arpeggio variants commonly
 * used in music. These patterns build upon the basic major triad (1-3-5) by
 * adding extensions like 6ths, 7ths, and 9ths to create richer harmonic
 * structures.
 *
 * As these are chord-based structures, the `intervals` array for each theme
 * does not include the octave ("8").
 */

import type {
  MajorVariantKey,
  NoteSequenceTheme,
} from "../types/note-sequences.d.ts";

/**
 * A record containing various major chord and arpeggio structures.
 * Each variant is a `NoteSequenceTheme` that describes its musical properties.
 *
 * The keys of this record are `MajorVariantKey`s, providing type-safe
 * access to each major chord definition.
 *
 * @example
 * ```ts
 * import { majorVariants } from "@musodojo/music-theory-data/note-sequences";
 *
 * const major7th = majorVariants.major7;
 * console.log(major7th.primaryName); // "M7"
 * console.log(major7th.intervals);   // ["1", "3", "5", "7"]
 * ```
 *
 * @see {@link NoteSequenceTheme} for the structure of each variant definition.
 * @see {@link MajorVariantKey} for the available variant keys.
 */
export const majorVariants: Record<MajorVariantKey, NoteSequenceTheme> = {
  major: {
    primaryName: "M",
    names: ["M", "maj", "Major", "Major Triad", "Δ"],
    intervals: ["1", "3", "5"],
    integers: [0, 4, 7],
    type: ["major", "chord", "arpeggio", "triad"],
    characteristics: [
      "stable",
      "happy",
      "bright",
      "the most basic major chord",
    ],
    pattern: ["major third", "minor third"],
    patternShort: ["M3", "m3"],
    exampleNotes: ["C", "E", "G"],
  },
  major6: {
    primaryName: "6",
    names: ["6", "M6", "maj6", "Major 6th", "Major Sixth"],
    intervals: ["1", "3", "5", "6"],
    integers: [0, 4, 7, 9],
    type: ["major", "chord", "arpeggio", "tetrad"],
    characteristics: [
      "stable",
      "happy",
      "bright",
      "sweet",
      "melodic",
      "less tension than a major 7th",
      "common in early jazz and pop",
    ],
    pattern: ["major third", "minor third", "major second"],
    patternShort: ["M3", "m3", "M2"],
    exampleNotes: ["C", "E", "G", "A"],
  },
  major7: {
    primaryName: "M7",
    names: ["M7", "maj7", "Major 7th", "Major Seventh", "Δ7"],
    intervals: ["1", "3", "5", "7"],
    integers: [0, 4, 7, 11],
    type: ["major", "chord", "arpeggio", "tetrad"],
    characteristics: [
      "stable",
      "happy",
      "bright",
      "sophisticated",
      "lush",
      "jazzy and sophisticated",
    ],
    pattern: ["major third", "minor third", "major third"],
    patternShort: ["M3", "m3", "M3"],
    exampleNotes: ["C", "E", "G", "B"],
  },
  major9: {
    primaryName: "M9",
    names: ["M9", "maj9", "Major 9th", "Major Ninth", "Δ9"],
    intervals: ["1", "3", "5", "7", "9"],
    integers: [0, 2, 4, 7, 11],
    type: ["major", "chord", "arpeggio", "pentad"],
    characteristics: [
      "stable",
      "happy",
      "bright",
      "colorful",
      "rich",
      "airy",
      "adds a layer of complexity and color",
    ],
    pattern: ["major third", "minor third", "major third", "minor third"],
    patternShort: ["M3", "m3", "M3", "m3"],
    exampleNotes: ["C", "E", "G", "B", "D"],
    labelsOverride: {
      quality: new Map([[2, "M9"]]),
      relative: new Map([[2, "9"]]),
    },
  },
  majorAdd9: {
    primaryName: "add9",
    names: ["add9", "maj(add9)", "M(add9)", "Major add 9"],
    intervals: ["1", "3", "5", "9"],
    integers: [0, 2, 4, 7],
    type: ["major", "chord", "arpeggio", "tetrad"],
    characteristics: [
      "stable",
      "happy",
      "bright",
      "colorful",
      "open",
      "airy",
      "different from a major 9th as it lacks the 7th",
    ],
    pattern: ["major third", "minor third", "perfect fifth"],
    patternShort: ["M3", "m3", "P5"],
    exampleNotes: ["C", "E", "G", "D"],
    labelsOverride: {
      quality: new Map([[2, "M9"]]),
      relative: new Map([[2, "9"]]),
    },
  },
  major6Add9: {
    primaryName: "6/9",
    names: ["6/9", "M6/9", "maj6/9", "Major 6/9", "6add9", "Major add6 add9"],
    intervals: ["1", "3", "5", "6", "9"],
    integers: [0, 2, 4, 7, 9],
    type: ["major", "chord", "arpeggio", "pentad"],
    characteristics: [
      "stable",
      "happy",
      "bright",
      "sweet",
      "melodic",
      "colorful",
      "rich",
      "open",
      "very lush and rich",
      "alternative to a major 7th chord",
      "popular in jazz piano voicings",
    ],
    pattern: ["major third", "minor third", "major second", "perfect fourth"],
    patternShort: ["M3", "m3", "M2", "P4"],
    exampleNotes: ["C", "E", "G", "A", "D"],
    labelsOverride: {
      quality: new Map([[2, "M9"]]),
      relative: new Map([[2, "9"]]),
    },
  },
} as const;
