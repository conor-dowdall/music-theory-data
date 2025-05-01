/**
 * Provides collections of enharmonic note spellings for the 12 pitch classes.
 * Enharmonic notes are different ways of writing the same musical pitch.
 *
 * Features:
 * - Unicode version using proper musical symbols (♯, ♭, ♮)
 * - All common enharmonic spellings for each pitch class
 * - Both simple and double accidentals
 *
 * Example Usage:
 * ```ts
 * const cPitchClass = enharmonicNotes[0];  // ["C", "C♮", "D♭♭", "B♯"]
 * ```
 *
 * Note: Each top-level-array index represents a pitch class from C (0) to B (11).
 *
 * @module
 */

import type { EnharmonicNotes, PitchStep } from "../types/note-labels.d.ts";
import type { PitchInteger } from "../types/note-sequences.d.ts";

/**
 * A 2D array, where each inner array contains enharmonically equivalent
 * representations of one of the 12 pitch classes.
 * '♯' and '♭' are used instead of '#' and 'b'.
 */
export const enharmonicNotes: EnharmonicNotes = [
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

export const pitchSteps: Record<PitchStep, PitchInteger> = {
  C: 0,
  c: 0,
  D: 2,
  d: 2,
  E: 4,
  e: 4,
  F: 5,
  f: 5,
  G: 7,
  g: 7,
  A: 9,
  a: 9,
  B: 11,
  b: 11,
};
