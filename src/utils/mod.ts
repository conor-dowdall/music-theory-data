/**
 * Utility functions for working with note sequences and labels.
 *
 * Available utilities:
 * - getIntegerNotation: Convert note names to pitch classes (0-11)
 * - getNoteSequenceLabels: Get labels for note sequences with overrides
 *
 * Example Usage:
 * ```ts
 * import {
 *   getIntegerNotation,
 *   getNoteSequenceLabels
 * } from "@musodojo/music-theory-data/utils";
 *
 * // Convert notes to integers
 * const pitchClass = getIntegerNotation("C♯");  // 1
 *
 * // Get sequence labels
 * const labels = getNoteSequenceLabels("ionian", "flat");
 * ```
 *
 * @module
 */

export { getIntegerNotation } from "./getIntegerNotation.ts";
export { getNoteSequenceLabels } from "./getNoteSequenceLabels.ts";
