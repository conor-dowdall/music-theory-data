/**
 * This module provides functions for generating musical note sequences
 * based on a root note and a specified note sequence theme. It ensures
 * that the resulting note names are musically correct, handling complex
 * enharmonic spellings for different musical keys.
 *
 * @module
 */

import { allNoteSequenceThemes } from "../note-sequences/note-sequences.ts";
import { noteNameStringToInteger } from "./note-conversions.ts";
import {
  enharmonicNoteNameGroups,
  intervalIntegers,
  noteLetters,
} from "../note-labels/note-labels.ts";
import type { Interval, NoteLetter, NoteName } from "../types/note-labels.d.ts";
import type { NoteSequenceThemeKey } from "../types/note-sequences.d.ts";

/**
 * Generates a musically correct sequence of note names from a root note
 * and a note sequence theme.
 *
 * This function ensures that the note names are spelled correctly according
 * to the musical key, avoiding common enharmonic errors. For example, in
 * D-flat major, the seventh note is C, not B, and for a C dominant 13th
 * chord, the notes are spelled C, E, G, B♭, D, F, A.
 *
 * @param {NoteName} rootNote - The root note of the sequence (e.g., "C", "D♭", "F♯").
 * @param {NoteSequenceThemeKey} sequenceThemeKey - The key identifying the desired
 * note sequence theme (e.g., "ionian", "dorian", "major7").
 *
 * @returns {NoteName[]} An array of note names representing the generated
 * musical sequence. If the root note or sequence key is invalid, an empty
 * array is returned.
 *
 * @example
 * ```ts
 * // Get the notes of the C major scale
 * const cMajorScale = getNotes("C", "ionian");
 * // Returns: ["C", "D", "E", "F", "G", "A", "B"]
 *
 * // Get the notes of the D-flat major scale
 * const dFlatMajorScale = getNotes("D♭", "ionian");
 * // Returns: ["D♭", "E♭", "F", "G♭", "A♭", "B♭", "C"]
 *
 * // Get the notes of a C dominant 13th chord
 * const c13 = getNotes("C", "dominant13");
 * // Returns: ["C", "E", "G", "B♭", "D", "F", "A"]
 * ```
 */
export function getNotes(
  rootNote: NoteName,
  sequenceThemeKey: NoteSequenceThemeKey,
  options: { orderBy?: "intervals" | "pitch" } = {},
): NoteName[] {
  const rootNoteInteger = noteNameStringToInteger(rootNote);
  if (rootNoteInteger === undefined) {
    console.warn(`Invalid root note: ${rootNote}`);
    return [];
  }

  const noteSequence = allNoteSequenceThemes[sequenceThemeKey];
  if (!noteSequence) {
    console.warn(`Invalid note sequence theme key: ${sequenceThemeKey}`);
    return [];
  }

  const rootNoteLetter = rootNote.charAt(0).toUpperCase() as NoteLetter;
  const rootNoteLetterIndex = noteLetters.indexOf(rootNoteLetter);

  const notes: NoteName[] = noteSequence.intervals.map((interval) => {
    const intervalInteger = intervalIntegers[interval as Interval];
    const absoluteNoteInteger = (rootNoteInteger + intervalInteger) % 12;

    const intervalNumberMatch = interval.match(/\d+/);
    if (!intervalNumberMatch) {
      // Should not happen with valid data
      return enharmonicNoteNameGroups[absoluteNoteInteger][0];
    }
    const intervalNumber = parseInt(intervalNumberMatch[0], 10);

    const targetNoteLetter =
      noteLetters[(rootNoteLetterIndex + intervalNumber - 1) % 7];

    const enharmonicGroup = enharmonicNoteNameGroups[absoluteNoteInteger];
    const selectedNote = enharmonicGroup.find((noteName) =>
      noteName.startsWith(targetNoteLetter)
    );

    return selectedNote || enharmonicGroup[0];
  });

  if (options.orderBy === "pitch") {
    notes.sort((a, b) => {
      const aInt = noteNameStringToInteger(a);
      const bInt = noteNameStringToInteger(b);
      if (aInt === undefined || bInt === undefined) return 0;
      return aInt - bInt;
    });
  }

  return notes;
}
