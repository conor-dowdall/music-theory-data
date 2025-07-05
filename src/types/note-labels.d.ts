/**
 * Type definitions for musical note names and labeling systems.
 * Provides TypeScript types for consistent representation of note names
 * and their various formats.
 *
 * @example
 * ```ts
 * import type { NoteLabelTheme } from "@musodojo/music-theory-data/types";
 *
 * // Define a custom labeling theme
 * const customTheme: NoteLabelTheme = {
 *   name: "Sharp Notes Ascii Theme",
 *   shortName: "sharp ascii",
 *   isRelative: false,
 *   labels: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
 * };
 * ```
 *
 * @module
 */

/** Represents a note's pitch class in integer notation - a number between 0 (C) and 11 (B). */
export type NoteInteger = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

/** Represents the extension integers for note extensions, e.g. ninths, tenths, ... */
export type NoteExtensionInteger =
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24;

/* Represents a musical pitch alteration as an integer value.
 * The value can range from -11 to +11, where:
 * - Negative values indicate flat alterations (e.g., -1 for flat, -2 for double flat)
 * - Positive values indicate sharp alterations (e.g., +1 for sharp, +2 for double sharp)
 * - Zero indicates no alteration (natural)
 */
export type NoteAlterInteger =
  | -11
  | -10
  | -9
  | -8
  | -7
  | -6
  | -5
  | -4
  | -3
  | -2
  | -1
  | -0
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11;

/* * Represents the letters used in music notation, both uppercase and lowercase. */
export type NoteLetter =
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "A"
  | "B"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "a"
  | "b";

/** Represents the possible accidentals for a note. */
export type NoteAccidental = "" | "♮" | "𝄫" | "♯" | "♭" | "𝄪";

/* Represents the basic structure of the possible names of an individual note. */
export type NoteName = `${NoteLetter}${NoteAccidental}`;

export type RelativeIntervalNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type RelativeInterval = `${NoteAccidental}${RelativeIntervalNumber}`;

export type RelativeIntervalExtensionNumber =
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15;

export type RelativeIntervalExtension =
  `${NoteAccidental}${RelativeIntervalExtensionNumber}`;

/** Represents an array of enharmonically equivalent note names. */
export type EnharmonicNoteNameGroup = NoteName[];

/**
 * Represents an array of 12 EnharmonicNoteNameGroup arrays, where each EnharmonicNoteNameGroup contains
 * enharmonic equivalents for its matching array index in EnharmonicNoteNameGroups.
 */
export type EnharmonicNoteNameGroups = [
  EnharmonicNoteNameGroup,
  EnharmonicNoteNameGroup,
  EnharmonicNoteNameGroup,
  EnharmonicNoteNameGroup,
  EnharmonicNoteNameGroup,
  EnharmonicNoteNameGroup,
  EnharmonicNoteNameGroup,
  EnharmonicNoteNameGroup,
  EnharmonicNoteNameGroup,
  EnharmonicNoteNameGroup,
  EnharmonicNoteNameGroup,
  EnharmonicNoteNameGroup,
];

/*
 * Represents a group of 12 note name strings, where each name corresponds to a
 * the array its array index.
 */
export type NoteLabelGroup = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

/**
 * Defines the structure for a theme of musical note labels. Each theme
 * provides a set of 12 labels for the 12 pitch classes, and indicates
 * whether the labels are relative to a root, or fixed to a pitch class.
 */
export interface NoteLabelTheme {
  name: string;
  shortName: string;
  isRelative: boolean;
  labels: NoteLabelGroup;
}
