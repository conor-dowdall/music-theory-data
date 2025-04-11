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
  EnharmonicGroup,
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
  NoteName,
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
