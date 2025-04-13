/**
 * Collection of dominant chord and scale variants.
 * These are based on the dominant seventh chord structure (major triad with minor seventh).
 * @module
 */

import type { NoteSequenceTheme } from "../types/note-sequences.d.ts";

/**
 * Dominant chord/arpeggio variants.
 * Each variant represents a different form of dominant harmony,
 * from basic dominant seventh to extended dominant structures.
 */
export const dominantVariants: Record<string, NoteSequenceTheme> = {
  dominant7: {
    primaryName: "7",
    names: ["7", "Dominant 7th"],
    sequence: [0, 4, 7, 10],
    type: ["dominant", "major", "chord", "arpeggio"],
    characteristics: [
      "unstable",
      "bluesy",
      "flat seventh",
      "jazzy",
      "authentic cadence",
    ],
    pattern: ["major third", "minor third", "minor third"],
    patternShort: ["M3", "m3", "m3"],
    degrees: ["1", "3", "5", "♭7"],
    exampleNotes: ["C", "E", "G", "B♭"],
  },
  dominant9: {
    primaryName: "9",
    names: ["9", "Dominant 9th"],
    sequence: [0, 2, 4, 7, 10],
    type: ["dominant", "major", "chord", "arpeggio"],
    characteristics: ["unstable", "bluesy", "flat seventh", "jazzy"],
    pattern: ["major third", "minor third", "minor third", "major third"],
    patternShort: ["M3", "m3", "m3", "M3"],
    degrees: ["1", "3", "5", "♭7", "9"],
    exampleNotes: ["C", "E", "G", "B♭", "D"],
    labelsOverride: {
      quality: new Map([[2, "M9"]]),
      relative: new Map([[2, "9"]]),
    },
  },
  dominant11: {
    primaryName: "11",
    names: ["11", "Dominant 11th"],
    sequence: [0, 2, 4, 5, 7, 10],
    type: ["dominant", "major", "chord", "arpeggio"],
    characteristics: ["unstable", "bluesy", "flat seventh", "jazzy"],
    pattern: [
      "major third",
      "minor third",
      "minor third",
      "major third",
      "minor third",
    ],
    patternShort: ["M3", "m3", "m3", "M3", "m3"],
    degrees: ["1", "3", "5", "♭7", "9", "11"],
    exampleNotes: ["C", "E", "G", "B♭", "D", "F"],
    labelsOverride: {
      quality: new Map([
        [2, "M9"],
        [5, "M11"],
      ]),
      relative: new Map([
        [2, "9"],
        [5, "11"],
      ]),
    },
  },
  dominant13: {
    primaryName: "13",
    names: ["13", "Dominant 13th"],
    sequence: [0, 2, 4, 5, 7, 9, 10],
    type: ["dominant", "major", "chord", "arpeggio"],
    characteristics: ["unstable", "bluesy", "flat seventh", "jazzy"],
    pattern: [
      "major third",
      "minor third",
      "minor third",
      "major third",
      "minor third",
      "minor third",
    ],
    patternShort: ["M3", "m3", "m3", "M3", "m3", "m3"],
    degrees: ["1", "3", "5", "♭7", "9", "11", "13"],
    exampleNotes: ["C", "E", "G", "B♭", "D", "F", "A"],
    labelsOverride: {
      quality: new Map([
        [2, "M9"],
        [5, "M11"],
        [9, "M13"],
      ]),
      relative: new Map([
        [2, "9"],
        [5, "11"],
        [9, "13"],
      ]),
    },
  },
};

/**
 * Type representing all available dominant variant themes
 * @example
 * ```ts
 * // Type-safe access to dominant variants
 * function getDominantChordSequence(type: keyof DominantVariants) {
 *   return dominantVariants[type].sequence;
 * }
 *
 * // TypeScript knows these are valid
 * const dom7 = getDominantChord("dominant7");  // [0, 4, 7, 10]
 * const dom9 = getDominantChord("dominant9");  // [0, 2, 4, 7, 10]
 *
 * // TypeScript error: not a valid dominant variant
 * const invalid = getDominantChord("major7");  // Error!
 * ```
 */
export type DominantVariants = typeof dominantVariants;
