/**
 * Type definitions for musical note names and labeling systems.
 * Provides TypeScript types for consistent representation of note names
 * and their various formats.
 *
 * Key Types:
 * - EnharmonicNoteGroup: Array of equivalent note spellings
 * - NoteLabelGroup: Fixed set of 12 note names
 * - NoteLabelTheme: Complete labeling system definition
 *
 * @example
 * ```ts
 * import type {  NoteLabelTheme } from "@musodojo/music-theory-data/types";
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

/* Represents the name of an individual note as a string. */
export type NoteName = string;

/** Represents an array of enharmonically equivalent note name strings. */
export type EnharmonicNoteGroup = NoteName[];

/**
 * Represents an array of 12 EnharmonicNoteGroups, where each group contains
 * enharmonic equivalents for a specific pitch class.
 */
export type EnharmonicNotes = [
  EnharmonicNoteGroup,
  EnharmonicNoteGroup,
  EnharmonicNoteGroup,
  EnharmonicNoteGroup,
  EnharmonicNoteGroup,
  EnharmonicNoteGroup,
  EnharmonicNoteGroup,
  EnharmonicNoteGroup,
  EnharmonicNoteGroup,
  EnharmonicNoteGroup,
  EnharmonicNoteGroup,
  EnharmonicNoteGroup
];

/*
 * Represents a group of 12 note name strings, where each name corresponds to a
 * specific pitch class (e.g., "C", "D♭", "D", etc.).
 */
export type NoteLabelGroup = [
  NoteName,
  NoteName,
  NoteName,
  NoteName,
  NoteName,
  NoteName,
  NoteName,
  NoteName,
  NoteName,
  NoteName,
  NoteName,
  NoteName
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

export type PitchStep =
  | "C"
  | "c"
  | "D"
  | "d"
  | "E"
  | "e"
  | "F"
  | "f"
  | "G"
  | "g"
  | "A"
  | "a"
  | "B"
  | "b";

export type PitchAlter =
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
