/**
 * Melodic minor modes.
 * Each mode is derived from the melodic minor scale and has its own unique characteristics.
 * These modes are often used in jazz and fusion genres.
 *
 * @example
 * ```ts
 * // Example usage of the melodicMinorModes type
 * import { melodicMinorModes } from "@musodojo/music-theory-data/note-sequences";
 *
 * // Accessing a specific melodic minor mode
 * const melodicMinor = melodicMinorModes.melodicMinor;
 * console.log(melodicMinor.primaryName);  // "Melodic Minor"
 * console.log(melodicMinor.sequence);     // [0, 2, 3, 5, 7, 9, 11]
 * ```
 *
 * @module
 */

import type { NoteSequenceTheme } from "../types/note-sequences.d.ts";

/**
 * Type representing all available melodic minor modes.
 * Provides type-safe access to properties.
 */
export type MelodicMinorMode =
  | "melodicMinor"
  | "dorianFlat2"
  | "lydianAugmented"
  | "lydianDominant";

/**
 * These are variants of the melodic minor modes.
 * Each mode is derived from the melodic minor scale and has its own unique characteristics.
 * These modes are often used in jazz and fusion genres.
 * @see {@link MelodicMinorMode} for the type of each mode.
 * @see {@link NoteSequenceTheme} for the structure of each mode.
 */
export const melodicMinorModes: Record<MelodicMinorMode, NoteSequenceTheme> = {
  melodicMinor: {
    primaryName: "Melodic Minor",
    names: [
      "Melodic Minor",
      "Jazz Minor",
      "Ascending Melodic Minor Scale",
      "Minor Ionian",
      "Ionian ♭3",
      "Ionian b3",
      "Ionian Flat Third",
      "Dorian Major 7",
      "Dorian Major Seventh",
    ],
    sequence: [0, 2, 3, 5, 7, 9, 11],
    type: ["melodic minor mode", "minor", "mode", "scale", "first mode"],
    characteristics: [
      "minor tonality",
      "minor scale start, major scale finish",
      "jazz and classical music",
      "classical: raised 6th and 7th degrees when ascending",
      "classical: natural minor / aeolian mode when descending",
      "jazz: raised 6th and 7th degrees in both directions",
      "used in jazz improvisation",
      "common in jazz and fusion genres",
      "can be used over minor chords",
    ],
    pattern: ["whole", "half", "whole", "whole", "whole", "whole", "half"],
    patternShort: ["W", "H", "W", "W", "W", "W", "H"],
    degrees: ["1", "2", "♭3", "4", "5", "6", "7", "8"],
    exampleNotes: ["A", "B", "C", "D", "E", "F♯", "G♯", "A"],
  },
  dorianFlat2: {
    primaryName: "Dorian ♭2",
    names: [
      "Dorian ♭2",
      "Dorian Flat Second",
      "Phrygian ♮6",
      "Phrygian Raised Sixth",
    ],
    sequence: [0, 1, 3, 5, 7, 9, 10],
    type: [
      "melodic minor mode",
      "dorian",
      "minor",
      "mode",
      "scale",
      "second mode",
    ],
    characteristics: [
      "minor tonality",
      "jazz and fusion genres",
      "used in jazz improvisation",
      "can be used over minor chords",
      "used in modal jazz compositions",
      "Assyrian music",
    ],
    pattern: ["half", "whole", "whole", "whole", "whole", "half", "whole"],
    patternShort: ["H", "W", "W", "W", "W", "H", "W"],
    degrees: ["1", "♭2", "♭3", "4", "5", "6", "♭7", "8"],
    exampleNotes: ["A", "B♭", "C", "D", "E", "F♯", "G", "A"],
  },
  lydianAugmented: {
    primaryName: "Lydian Augmented",
    names: ["Lydian Augmented", "Lydian ♯5", "Lydian #5", "Lydian Sharp Fifth"],
    sequence: [0, 2, 4, 6, 8, 9, 11],
    type: [
      "melodic minor mode",
      "lydian",
      "augmented",
      "mode",
      "scale",
      "third mode",
    ],
    characteristics: [
      "major tonality",
      "jazz and fusion genres",
      "used in jazz improvisation",
      "can be used over major chords",
      "used in modal jazz compositions",
    ],
    pattern: ["whole", "whole", "whole", "whole", "half", "whole", "half"],
    patternShort: ["W", "W", "W", "W", "H", "W", "H"],
    degrees: ["1", "2", "3", "♯4", "♯5", "6", "7", "8"],
    exampleNotes: ["A", "B", "C♯", "D♯", "E♯", "F♯", "G♯", "A"],
    labelsOverride: {
      quality: new Map([
        [6, "A4"],
        [8, "A5"],
      ]),
      relative: new Map([
        [6, "♯4"],
        [8, "♯5"],
      ]),
      extension: new Map([
        [6, "♯11"],
        [8, "♯5"],
      ]),
    },
  },
  lydianDominant: {
    primaryName: "Lydian Dominant",
    names: [
      "Lydian Dominant",
      "Lydian ♭7",
      "Lydian b7",
      "Lydian Flat Seventh",
      "Mixolydian ♯4",
      "Mixolydian #4",
      "Mixolydian Sharp Fourth",
      "Mixolydian Augmented Fourth",
    ],
    sequence: [0, 2, 4, 6, 7, 9, 10],
    type: [
      "melodic minor mode",
      "lydian",
      "dominant",
      "mode",
      "scale",
      "fourth mode",
    ],
    characteristics: [
      "dominant tonality",
      "jazz and fusion genres",
      "used in jazz improvisation",
      "can be used over dominant chords",
      "used in modal jazz compositions",
    ],
    pattern: ["whole", "whole", "whole", "half", "whole", "half", "whole"],
    patternShort: ["W", "W", "W", "H", "W", "H", "W"],
    degrees: ["1", "2", "3", "♯4", "5", "6", "♭7", "8"],
    exampleNotes: ["A", "B", "C♯", "D♯", "E", "F♯", "G", "A"],
    labelsOverride: {
      quality: new Map([[6, "A4"]]),
      relative: new Map([[6, "♯4"]]),
      extension: new Map([[6, "♯11"]]),
    },
  },
} as const;
