/**
 * @module
 *
 * This file defines a collection of dominant chord and arpeggio variants.
 * Dominant chords are built on the fifth degree of a scale and have a strong
 * tendency to resolve to the tonic. They are characterized by a major triad
 * with a minor seventh.
 *
 * The variants include the basic dominant 7th chord and its extensions (9th,
 * 11th, 13th). These are typically used as arpeggios or chords, so the
 * `intervals` array for each theme does *not* include the octave ("8").
 */

import type {
  DominantVariantKey,
  NoteSequenceTheme,
} from "../types/note-sequences.d.ts";

/**
 * A record containing various dominant chord and arpeggio structures.
 * Each variant is a `NoteSequenceTheme` that describes its musical properties.
 *
 * The keys of this record are `DominantVariantKey`s, providing type-safe
 * access to each dominant chord definition.
 *
 * @example
 * ```ts
 * import { dominantVariants } from "@musodojo/music-theory-data/note-sequences";
 *
 * const dominant9th = dominantVariants.dominant9;
 * console.log(dominant9th.primaryName); // "9"
 * console.log(dominant9th.intervals);   // ["1", "3", "5", "♭7", "9"]
 * ```
 *
 * @see {@link NoteSequenceTheme} for the structure of each variant definition.
 * @see {@link DominantVariantKey} for the available variant keys.
 */
export const dominantVariants: Record<DominantVariantKey, NoteSequenceTheme> = {
  dominant7: {
    primaryName: "7",
    names: ["7", "Dominant 7th"],
    intervals: ["1", "3", "5", "♭7"],
    sequence: [0, 4, 7, 10],
    type: ["dominant", "major", "chord", "arpeggio"],
    characteristics: ["unstable", "bluesy", "tense", "jazzy"],
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
    characteristics: ["unstable", "bluesy", "tense", "jazzy", "rich"],
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
    characteristics: [
      "unstable",
      "bluesy",
      "tense",
      "jazzy",
      "rich",
      "complex",
    ],
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
    characteristics: [
      "unstable",
      "bluesy",
      "tense",
      "jazzy",
      "rich",
      "complex",
      "lush",
    ],
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
