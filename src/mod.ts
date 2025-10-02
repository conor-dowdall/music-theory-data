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
 * // The details for the Ionian Diatonic Mode (Major Scale).
 * console.log("ionian details: ", music_theory_data.noteCollections.ionian);
 * // ionian details:  {
 * // primaryName: "Major",
 * // names: [ "Major", "Ionian", "Major Scale", "Ionian Mode", "Diatonic Major" ],
 * // intervals: [
 * //   "1", "2", "3",
 * //   "4", "5", "6",
 * //   "7", "8"
 * // ],
 * // integers: [
 * //   0, 2,  4, 5,
 * //   7, 9, 11
 * // ],
 * // rotation: 0,
 * // type: [
 * //   "major.
 * // ...
 * // }
 * // Get the notes of a stored chord, or scale.
 * console.log("A harmonic minor: ", music_theory_data.getNoteNamesFromRootAndCollectionKey("A", "harmonicMinor"))
 * // A harmonic minor: ["A", "B", "C", "D", "E", "F", "G♯", "A"]
 * ```
 */
export * from "./data/mod.ts";
export type * from "./types/mod.d.ts";
export * from "./utils/mod.ts";
