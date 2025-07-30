/**
 * Provides data structures for associating colors with musical notes / note integers.
 * @module
 */

/**
 * Represents a CSS color value (e.g., "#FF0000", "red", "rgba(0, 0, 0, 0.5)").
 * Can also be `null` to indicate no color for that note in a color theme.
 */
export type NoteColor = string | null;

/**
 * An array of 12 {@link NoteColor} values, where each index
 * corresponds to a specific pitch class in chromatic order
 * `null` values are typically used in themes
 * where only certain notes are to be assigned a color,
 * e.g., the root note.
 * @see NoteColor
 */
export type NoteColorGroup = [
  NoteColor,
  NoteColor,
  NoteColor,
  NoteColor,
  NoteColor,
  NoteColor,
  NoteColor,
  NoteColor,
  NoteColor,
  NoteColor,
  NoteColor,
  NoteColor,
];

/**
 * Defines a color theme for musical notes.
 * @see NoteColorGroup
 */
export interface NoteColorTheme {
  name: string;
  relative: boolean;
  colors: NoteColorGroup;
}
