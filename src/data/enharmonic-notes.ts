import { EnharmonicNotes } from "../../types/note-labels";

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
