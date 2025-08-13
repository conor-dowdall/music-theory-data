/**
 * Utility functions for working with note sequences and labels.
 *
 * @example
 * ```ts
 * import {
 *   noteNameToInteger,
 *   getNoteSequenceLabels,
 *   searchNoteSequenceThemes,
 * } from "@musodojo/music-theory-data/utils";
 *
 * // Convert notes to integers
 * const pitchClass = noteNameToInteger("C");  // 0
 *
 * // Get sequence labels
 * const labels = getNoteSequenceLabels("ionian", "flat");
 *
 * // Search for minor keyword in all note sequence themes
 * const themes = searchNoteSequenceThemes({query: "minor"});
 * ```
 *
 * @example
 * ```ts
 * import { noteNameToMidi } from "@musodojo/music-theory-data/utils"
 *
 * // Get middle C as a midi note number
 * const middleC = noteNameToMidi("C", 0, 4); // 60
 * ```
 *
 * @module
 */

export * from "./chord-label-generators.ts";
export * from "./get-note-sequence-labels.ts";
export * from "./midi-sequence-generators.ts";
export * from "./note-conversions.ts";
export * from "./search-note-sequence-themes.ts";
export * from "./get-notes.ts";
export * from "./transform-intervals.ts";
