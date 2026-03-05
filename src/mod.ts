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
 * import * as music_theory_data from "jsr:@musodojo/music-theory-data";
 *
 * // Get the notes of A Harmonic Minor
 * const notes1 = music_theory_data.getNoteNamesForRootAndNoteCollectionKey(
 *   "A",
 *   "harmonicMinor",
 * );
 * console.log(notes1);
 * // ["A", "B", "C", "D", "E", "F", "G♯", "A"]
 *
 * // Automatically knows whether to use flats or sharps
 * const notes2 = music_theory_data.getNoteNamesForRootAndNoteCollectionKey(
 *   "F",
 *   "ionian",
 * );
 * console.log(notes2);
 * //  ["F", "G", "A", "B♭", "C", "D", "E", "F"];
 *
 * // Get the full data structure for the Ionian mode (Major Scale)
 * const ionian = music_theory_data.noteCollections.ionian;
 *
 * console.log(ionian.primaryName);
 * // "Major"
 *
 * console.log(ionian.intervals);
 * // ["1", "2", "3", "4", "5", "6", "7", "8"]
 *
 * // Log an array of all available Note Collection Keys
 * console.log(Object.keys(music_theory_data.noteCollections));
 * // ["ionian", "dorian", "phrygian", ...]
 *
 * // Log an array of all available Grouped Note Collections Keys
 * console.log(Object.keys(music_theory_data.groupedNoteCollections));
 * // ["diatonicModes", "pentatonicVariants", ...]
 * ```
 */
export * from "./data/mod.ts";
export type * from "./types/mod.d.ts";
export * from "./utils/mod.ts";
