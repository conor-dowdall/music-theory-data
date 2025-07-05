/**
 * enharmonicNoteNameGroups Provides collections of enharmonic note spellings for the 12 pitch classes.
 * Enharmonic notes are different ways of writing the same musical pitch.
 *
 * Features:
 * - Unicode version using proper musical symbols (♯, ♭, ♮)
 * - All common enharmonic spellings for each pitch class
 * - Both simple and double accidentals
 *
 * @example
 * ```ts
 * const cPitchClass = enharmonicNoteNameGroups[0];  // ["C", "C♮", "D𝄫", "B♯"]
 * ```
 *
 * Note: Each top-level-array index represents a pitch class from C (0) to B (11).
 *
 * @module
 */

import type {
  EnharmonicNoteNameGroups,
  NoteExtensionInteger,
  NoteInteger,
  NoteLetter,
  RelativeInterval,
  RelativeIntervalExtension,
} from "../types/note-labels.d.ts";

/**
 * A 2D array, where each inner array contains enharmonically equivalent
 * representations of one of the 12 pitch classes.
 * '♯' and '♭' are used instead of '#' and 'b'.
 */
export const enharmonicNoteNameGroups: EnharmonicNoteNameGroups = [
  ["C", "C♮", "D𝄫", "B♯"], // B♯ is enharmonic with C
  ["D♭", "C♯", "B𝄪"],
  ["D", "D♮", "E𝄫", "C𝄪"],
  ["E♭", "F𝄫", "D♯"],
  ["E", "E♮", "F♭", "D𝄪"],
  ["F", "F♮", "G𝄫", "E♯"],
  ["G♭", "F♯", "E𝄪"],
  ["G", "G♮", "A𝄫", "F𝄪"],
  ["A♭", "G♯"],
  ["A", "A♮", "B𝄫", "G𝄪"],
  ["B♭", "C𝄫", "A♯"],
  ["B", "B♮", "C♭", "A𝄪"],
] as const;

export const noteLetterIntegers: Record<NoteLetter, NoteInteger> = {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 11,
  c: 0,
  d: 2,
  e: 4,
  f: 5,
  g: 7,
  a: 9,
  b: 11,
} as const;

export const relativeIntervalIntegers: Record<RelativeInterval, NoteInteger> = {
  "𝄫1": 10,
  "♭1": 11,
  "♮1": 0,
  "1": 0,
  "♯1": 1,
  "𝄪1": 2,

  "𝄫2": 0,
  "♭2": 1,
  "♮2": 2,
  "2": 2,
  "♯2": 3,
  "𝄪2": 4,

  "𝄫3": 2,
  "♭3": 3,
  "♮3": 4,
  "3": 4,
  "♯3": 5,
  "𝄪3": 6,

  "𝄫4": 3,
  "♭4": 4,
  "♮4": 5,
  "4": 5,
  "♯4": 6,
  "𝄪4": 7,

  "𝄫5": 5,
  "♭5": 6,
  "♮5": 7,
  "5": 7,
  "♯5": 8,
  "𝄪5": 9,

  "𝄫6": 7,
  "♭6": 8,
  "♮6": 9,
  "6": 9,
  "♯6": 10,
  "𝄪6": 11,

  "𝄫7": 9,
  "♭7": 10,
  "♮7": 11,
  "7": 11,
  "♯7": 0,
  "𝄪7": 1,
} as const;

export const relativeIntervalExtensionIntegerExtensions: Record<
  RelativeIntervalExtension,
  NoteExtensionInteger
> = {
  "𝄫8": 22,
  "♭8": 23,
  "♮8": 12,
  "8": 12,
  "♯8": 13,
  "𝄪8": 14,

  "𝄫9": 12,
  "♭9": 13,
  "♮9": 14,
  "9": 14,
  "♯9": 15,
  "𝄪9": 16,

  "𝄫10": 14,
  "♭10": 15,
  "♮10": 16,
  "10": 16,
  "♯10": 17,
  "𝄪10": 18,

  "𝄫11": 15,
  "♭11": 16,
  "♮11": 17,
  "11": 17,
  "♯11": 18,
  "𝄪11": 19,

  "𝄫12": 17,
  "♭12": 18,
  "♮12": 19,
  "12": 19,
  "♯12": 20,
  "𝄪12": 21,

  "𝄫13": 19,
  "♭13": 20,
  "♮13": 21,
  "13": 21,
  "♯13": 22,
  "𝄪13": 23,

  "𝄫14": 21,
  "♭14": 22,
  "♮14": 23,
  "14": 23,
  "♯14": 24,
  "𝄪14": 13,

  "𝄫15": 22,
  "♭15": 23,
  "♮15": 24,
  "15": 24,
  "♯15": 13,
  "𝄪15": 14,
} as const;
