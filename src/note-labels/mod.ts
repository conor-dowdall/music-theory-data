/**
 * Note labels module providing collections of note names and labeling systems.
 *
 * Features:
 * - Enharmonic note spellings (Unicode and ASCII)
 * - Note labeling themes (flat, sharp, roman numerals, etc.)
 * - Common music theory naming conventions
 *
 * Example Usage:
 * ```ts
 * import { enharmonicNotesUnicode, noteLabelThemes } from "@musodojo/music-theory-data/note-labels";
 *
 * // Get note spellings for C (pitch class 0)
 * const cNotes = enharmonicNotesUnicode[0];  // ["C", "C♮", "D♭♭", "B♯"]
 *
 * // Get basic flat note labels
 * const flatLabels = noteLabelThemes.flat.labels;  // ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"]
 * ```
 *
 * @module
 */

export * from "./enharmonic-notes.ts";
export * from "./note-label-themes.ts";
