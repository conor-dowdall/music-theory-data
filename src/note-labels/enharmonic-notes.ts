/**
 * Provides collections of enharmonic note spellings for the 12 pitch classes.
 * Enharmonic notes are different ways of writing the same musical pitch.
 *
 * Features:
 * - Unicode version using proper musical symbols (♯, ♭, ♮)
 * - ASCII version using standard characters (#, b)
 * - All common enharmonic spellings for each pitch class
 * - Both simple and double accidentals
 *
 * Example Usage:
 * ```ts
 * // Unicode accidentals
 * const cPitchClass = enharmonicNotesUnicode[0];  // ["C", "C♮", "D♭♭", "B♯"]
 *
 * // ASCII accidentals
 * const fSharp = enharmonicNotesAlt[6];  // ["Gb", "F#", "E##"]
 * ```
 *
 * Note: Each top-level array index represents a pitch class from C (0) to B (11).
 *
 * @module enharmonic-notes
 */

import type { EnharmonicNotes } from "../types/note-labels.d.ts";

/**
 * A 2D array, where each inner array contains enharmonically equivalent
 * representations of one of the 12 pitch classes.
 * '♯' and '♭' are used instead of '#' and 'b'.
 */
export const enharmonicNotesUnicode: EnharmonicNotes = [
  ["C", "C♮", "D♭♭", "B♯"], // B♯ is enharmonic with C
  ["D♭", "C♯", "B♯♯"],
  ["D", "D♮", "E♭♭", "C♯♯"],
  ["E♭", "F♭♭", "D♯"],
  ["E", "E♮", "F♭", "D♯♯"],
  ["F", "F♮", "G♭♭", "E♯"],
  ["G♭", "F♯", "E♯♯"],
  ["G", "G♮", "A♭♭", "F♯♯"],
  ["A♭", "G♯"],
  ["A", "A♮", "B♭♭", "G♯♯"],
  ["B♭", "C♭♭", "A♯"],
  ["B", "B♮", "C♭", "A♯♯"],
];

/**
 * A 2D array, where each inner array contains enharmonically equivalent
 * representations of one of the 12 pitch classes.
 * '#' and 'b' are used instead of '♯' and '♭'.
 */
export const enharmonicNotesAlt: EnharmonicNotes = [
  ["Dbb", "B#"],
  ["Db", "C#", "B##"],
  ["Ebb", "C##"],
  ["Eb", "Fbb", "D#"],
  ["Fb", "D##"],
  ["Gbb", "E#"],
  ["Gb", "F#", "E##"],
  ["Abb", "F##"],
  ["Ab", "G#"],
  ["Bbb", "G##"],
  ["Bb", "Cbb", "A#"],
  ["Cb", "A##"],
];
