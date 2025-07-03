/**
 * Utility functions for working with note sequences and labels.
 *
 * @example
 * ```ts
 * import {
 *   pitchStepToPitchInteger,
 *   getNoteSequenceLabels,
 *   searchNoteSequenceThemes,
 * } from "@musodojo/music-theory-data/utils";
 *
 * // Convert notes to integers
 * const pitchClass = pitchStepToPitchInteger("C", 1);  // 1
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
 * import { pitchStepToMidiNoteNumber } from "@musodojo/music-theory-data/utils"
 *
 * // Get middle C as a midi note number
 * const middleC = pitchStepToMidiNoteNumber("C", 0, 4); // 60
 * ```
 *
 * @module
 */

export * from "./note-conversions.ts";
export { getNoteSequenceLabels } from "./get-note-sequence-labels.ts";
export { searchNoteSequenceThemes } from "./search-note-sequence-themes.ts";
