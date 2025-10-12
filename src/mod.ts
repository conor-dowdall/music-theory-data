/**
 * A comprehensive library of music theory data, including scales, chords, and notes.
 *
 * This package provides a collection of datasets and utility functions
 * to work with fundamental concepts of music theory. It's designed to be
 * a foundational block for music-related applications, educational tools,
 * and creative coding projects.
 *
 * @module
 * @example
 * ```ts
 * // Import the entire library
 * import * as music_theory_data from "jsr:@musodojo/music-theory-data";
 *
 * // You can now access all the data and functions.
 *
 * // The details for the Ionian Diatonic Mode (Major Scale).
 * console.log("ionian details: ", music_theory_data.noteCollections.ionian);
 * // ionian details:  {
 * //   category: "scale",
 * //   rotation: 0,
 * //   primaryName: "Major",
 * //   names: [
 * //     "Major",
 * //     "Ionian",
 * //     "Major Scale",
 * //     "Ionian Mode",
 * //     "Diatonic Major",
 * //   ],
 * //   intervals: ["1", "2", "3", "4", "5", "6", "7", "8"],
 * //   integers: [0, 2, 4, 5, 7, 9, 11],
 * //   type: [
 * //     "major",
 * //     "ionian",
 * //     "mode",
 * //     "scale",
 * //     "church mode",
 * //     "diatonic mode",
 * //     "heptatonic",
 * //     "first diatonic mode",
 * //     "do mode",
 * //   ],
 * //   characteristics: [
 * //     "bright",
 * //     "happy",
 * //     "stable",
 * //     "uplifting",
 * //     "consonant",
 * //     "western",
 * //     "foundational",
 * //     "simple",
 * //     "pop music",
 * //     "major tonality",
 * //     "commonly used western scale",
 * //   ],
 * //   pattern: ["whole", "whole", "half", "whole", "whole", "whole", "half"],
 * //   patternShort: ["W", "W", "H", "W", "W", "W", "H"],
 * // }
 *
 * // Get the notes of a stored chord, or scale.
 * console.log("A harmonic minor: ", music_theory_data.getNoteNamesFromRootAndCollectionKey("A", "harmonicMinor"))
 * // A harmonic minor: ["A", "B", "C", "D", "E", "F", "G♯", "A"]
 *
 * // Log the array of all available Note Collection Keys
 * console.log(Object.keys(music_theory_data.noteCollections));
 *
 * // Log the array of all available Grouped Note Collections Keys
 * console.log(Object.keys(music_theory_data.groupedNoteCollections));
 * ```
 */
export * from "./data/mod.ts";
export type * from "./types/mod.d.ts";
export * from "./utils/mod.ts";
