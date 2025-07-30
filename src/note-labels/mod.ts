/**
 * @module
 *
 * Note labels module providing collections of note names, labeling systems,
 * and utilities for note conversions to pitch integers, and midi note numbers.
 *
 * Features:
 * - Enharmonic note spellings
 * - Note labeling themes (flat, sharp, roman numerals, etc.)
 * - Common music theory naming conventions
 *
 * @example
 * ```ts
 * import { enharmonicNoteNameGroups } from "@musodojo/music-theory-data/note-labels";
 *
 * // Get note spellings for C (pitch class 0)
 * const cNotes = enharmonicNoteNameGroups[0];  // ["C", "C♮", "D♭♭", "B♯"]
 * ```
 *
 * @example
 * ```ts
 * import { noteLabelThemes } from "@musodojo/music-theory-data/note-labels";
 *
 * // Get basic flat note labels
 * const flatLabels = noteLabelThemes.flat.labels;  // ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"]
 * ```
 */

export * from "./note-labels.ts";
export * from "./note-label-themes.ts";
