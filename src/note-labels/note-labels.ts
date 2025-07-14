/**
 * enharmonicNoteNameGroups Provides collections of enharmonic note spellings for the 12 pitch classes.
 * Enharmonic notes are different ways of writing the same musical pitch. 42 note names!
 *
 * Features:
 * - Unicode version using proper musical symbols (♯, ♭, ♮)
 * - All common enharmonic spellings for each pitch class
 * - Bare note name, natural accidental, simple-and-double accidental (C C♮ C♭ C𝄫 C♯ C𝄪)
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
  Interval,
  IntervalQuality,
  NoteAccidental,
  NoteExtensionInteger,
  NoteInteger,
  NoteName,
} from "../types/note-labels.d.ts";

/**
 * A 2D array, where each inner array contains enharmonically equivalent
 * representations of one of the 12 pitch classes.
 * '♯' and '♭' are used instead of '#' and 'b'.
 */
export const enharmonicNoteNameGroups: EnharmonicNoteNameGroups = [
  ["C", "C♮", "B♯", "D𝄫"],
  ["D♭", "C♯", "B𝄪"],
  ["D", "D♮", "E𝄫", "C𝄪"],
  ["E♭", "D♯", "F𝄫"],
  ["E", "E♮", "F♭", "D𝄪"],
  ["F", "F♮", "E♯", "G𝄫"],
  ["G♭", "F♯", "E𝄪"],
  ["G", "G♮", "A𝄫", "F𝄪"],
  ["A♭", "G♯"],
  ["A", "A♮", "B𝄫", "G𝄪"],
  ["B♭", "A♯", "C𝄫"],
  ["B", "B♮", "C♭", "A𝄪"],
] as const;

/**
 * Maps note accidentals to their corresponding alteration integers.
 * - `𝄫` (double flat) is -2
 * - `♭` (flat) is -1
 * - `♮` (natural) is 0
 * - `♯` (sharp) is 1
 * - `𝄪` (double sharp) is 2
 */
export const noteAccidentalIntegers: Record<NoteAccidental, number> = {
  "𝄫": -2,
  "♭": -1,
  "♮": 0,
  "♯": 1,
  "𝄪": 2,
} as const;

export const noteNameIntegers: Record<NoteName, NoteInteger> = {
  "C𝄫": 10,
  "C♭": 11,
  "C♮": 0,
  "C": 0,
  "C♯": 1,
  "C𝄪": 2,

  "D𝄫": 0,
  "D♭": 1,
  "D♮": 2,
  "D": 2,
  "D♯": 3,
  "D𝄪": 4,

  "E𝄫": 2,
  "E♭": 3,
  "E♮": 4,
  "E": 4,
  "E♯": 5,
  "E𝄪": 6,

  "F𝄫": 3,
  "F♭": 4,
  "F♮": 5,
  "F": 5,
  "F♯": 6,
  "F𝄪": 7,

  "G𝄫": 5,
  "G♭": 6,
  "G♮": 7,
  "G": 7,
  "G♯": 8,
  "G𝄪": 9,

  "A𝄫": 7,
  "A♭": 8,
  "A♮": 9,
  "A": 9,
  "A♯": 10,
  "A𝄪": 11,

  "B𝄫": 9,
  "B♭": 10,
  "B♮": 11,
  "B": 11,
  "B♯": 0,
  "B𝄪": 1,
} as const;

export const IntervalIntegers: Record<
  Interval,
  NoteInteger | NoteExtensionInteger
> = {
  "𝄫1": 10, // just choose 10, so all Interval typescript types are covered
  "♭1": 11, // just choose 11, so all Interval typescript types are covered
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
  "♯7": 12,
  "𝄪7": 13,

  "𝄫8": 10,
  "♭8": 11,
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
  "𝄪14": 25,

  "𝄫15": 22,
  "♭15": 23,
  "♮15": 24,
  "15": 24,
  "♯15": 25,
  "𝄪15": 26,
} as const;

export const IntervalQualityIntegers: Partial<
  Record<IntervalQuality, NoteInteger | NoteExtensionInteger>
> = {
  "P1": 0,
  "A1": 1,

  "d2": 0,
  "m2": 1,
  "M2": 2,
  "A2": 3,

  "d3": 2,
  "m3": 3,
  "M3": 4,
  "A3": 5,

  "d4": 4,
  "P4": 5,
  "A4": 6,

  "d5": 6,
  "P5": 7,
  "A5": 8,

  "d6": 7,
  "m6": 8,
  "M6": 9,
  "A6": 10,

  "d7": 9,
  "m7": 10,
  "M7": 11,
  "A7": 12,

  "d8": 11,
  "P8": 12,
  "A8": 13,

  "d9": 12,
  "m9": 13,
  "M9": 14,
  "A9": 15,

  "d10": 14,
  "m10": 15,
  "M10": 16,
  "A10": 17,

  "d11": 16,
  "P11": 17,
  "A11": 19,

  "d12": 18,
  "P12": 19,
  "A12": 20,

  "d13": 19,
  "m13": 20,
  "M13": 21,
  "A13": 22,

  "d14": 21,
  "m14": 22,
  "M14": 23,
  "A14": 24,

  "d15": 23,
  "P15": 24,
  "A15": 25,
} as const;
