/**
 * Collection of dominant chord and scale variants.
 * These are based on the dominant seventh chord structure (major triad with minor seventh).
 *
 * @example
 * ```ts
 * // Example usage of the dominantVariants
 * import { dominantVariants } from "@musodojo/music-theory-data/note-sequences";
 *
 * // Accessing a specific dominant variant
 * const dominant7 = dominantVariants.dominant7;
 * console.log(dominant7.primaryName);  // "7"
 * console.log(dominant7.sequence);     // [0, 4, 7, 10]
 * ```
 *
 * @module
 */

import type {
  DominantVariantKey,
  NoteSequenceTheme,
} from "../types/note-sequences.d.ts";

/**
 * Dominant chord/arpeggio variants.
 * Each variant represents a different form of dominant harmony,
 * from basic dominant seventh to extended dominant structures.
 * @see {@link DominantVariantKey} for the name of each variant.
 * @see {@link NoteSequenceTheme} for the structure of each variant.
 */
export const dominantVariants: Record<DominantVariantKey, NoteSequenceTheme> = {
  dominant7: {
    primaryName: "7",
    names: ["7", "Dominant 7th"],
    intervals: ["1", "3", "5", "♭7"],
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
    exampleNotes: ["C", "E", "G", "B♭"],
  },
  dominant9: {
    primaryName: "9",
    names: ["9", "Dominant 9th"],
    intervals: ["1", "3", "5", "♭7", "9"],
    sequence: [0, 2, 4, 7, 10],
    type: ["dominant", "major", "chord", "arpeggio"],
    characteristics: ["unstable", "bluesy", "flat seventh", "jazzy"],
    pattern: ["major third", "minor third", "minor third", "major third"],
    patternShort: ["M3", "m3", "m3", "M3"],
    exampleNotes: ["C", "E", "G", "B♭", "D"],
    labelsOverride: {
      quality: new Map([[2, "M9"]]),
      relative: new Map([[2, "9"]]),
    },
  },
  dominant11: {
    primaryName: "11",
    names: ["11", "Dominant 11th"],
    intervals: ["1", "3", "5", "♭7", "9", "11"],
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
    intervals: ["1", "3", "5", "♭7", "9", "11", "13"],
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
} as const;
