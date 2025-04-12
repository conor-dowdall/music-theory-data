/**
 * Type definitions for musical note names and labeling systems.
 * Provides TypeScript types for consistent representation of note names
 * and their various formats.
 *
 * Key Types:
 * - NoteName: String representation of a note (e.g., "C", "D♭")
 * - EnharmonicGroup: Array of equivalent note spellings
 * - NoteLabelGroup: Fixed set of 12 note names
 * - NoteLabelTheme: Complete labeling system definition
 *
 * Example Usage:
 * ```ts
 * import type { NoteName, NoteLabelTheme } from "@musodojo/music-theory-data/types";
 *
 * // Type-safe note name
 * const note: NoteName = "C♯";
 *
 * // Define a custom labeling theme
 * const customTheme: NoteLabelTheme = {
 *   name: "Custom",
 *   shortName: "cst",
 *   isRelative: false,
 *   labels: ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"]
 * };
 * ```
 *
 * @module
 */

/** Represents the string value of a musical note name (e.g., "C", "D♭", "E♮", "F♯",). */
export type NoteName = string;

/** Represents an array of enharmonically equivalent NoteNames. */
export type EnharmonicGroup = NoteName[];

/**
 * Represents an array of 12 EnharmonicGroups, where each group contains
 * enharmonic equivalents for a specific pitch class.
 */
export type EnharmonicNotes = [
  EnharmonicGroup,
  EnharmonicGroup,
  EnharmonicGroup,
  EnharmonicGroup,
  EnharmonicGroup,
  EnharmonicGroup,
  EnharmonicGroup,
  EnharmonicGroup,
  EnharmonicGroup,
  EnharmonicGroup,
  EnharmonicGroup,
  EnharmonicGroup
];

/*
 * Represents a group of 12 NoteNames, where each name corresponds to a
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
