/**
 * Utility functions for working with note sequences and labels.
 *
 * @example
 * ```ts
 * import {
 *   noteLetterToInteger,
 *   getNoteSequenceLabels,
 *   searchNoteSequenceThemes,
 * } from "@musodojo/music-theory-data/utils";
 *
 * // Convert notes to integers
 * const pitchClass = noteLetterToInteger("C", 1);  // 1
 *
 * // Get sequence labels
 * const labels = getNoteSequenceLabels("ionian", "flat");
 *
 * // Search for minor keyword in all note sequence themes
 * const themes = searchNoteSequenceThemes("minor");
 * ```
 *
 * @example
 * ```ts
 * import { noteLetterToMidi } from "@musodojo/music-theory-data/utils"
 *
 * // Get middle C as a midi note number
 * const middleC = noteLetterToMidi("C", 0, 4); // 60
 * ```
 *
 * @module
 */

export * from "./note-conversions.ts";
export * from "./label-generators.ts";
export * from "./midi-sequence-generators.ts";
export { getNoteSequenceLabels } from "./get-note-sequence-labels.ts";
export { searchNoteSequenceThemes } from "./search-note-sequence-themes.ts";
