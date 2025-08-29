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
 * // For example, let's log the stored details for the Ionian Diatonic Mode (Major Scale).
 * console.log(music_theory_data.groupedNoteCollections.diatonicModes.ionian);
 * ```
 */
export * from "./data/mod.ts";
export type * from "./types/mod.d.ts";
export * from "./utils/mod.ts";
