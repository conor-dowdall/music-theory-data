/**
 * Utility functions for converting between note names and integer notation (pitch classes).
 * Handles both ASCII and Unicode accidental formats.
 *
 * Example Usage:
 * ```ts
 * import { getIntegerNotation } from "@musodojo/music-theory-data/utils";
 *
 * // Convert note names to pitch classes
 * getIntegerNotation("C");     // 0
 * getIntegerNotation("F#");    // 6
 * getIntegerNotation("B♭");    // 10
 * getIntegerNotation("xyz");   // undefined
 * ```
 *
 * Features:
 * - Case-insensitive matching
 * - Supports ASCII (#, b) and Unicode (♯, ♭) accidentals
 * - Returns undefined for invalid note names
 * - Type-safe return value (PitchInteger | undefined)
 *
 * @module
 */

import type { EnharmonicNotes, NoteName } from "../types/note-labels.d.ts";
import type { PitchInteger } from "../types/note-sequences.d.ts";
import {
  enharmonicNotesAlt,
  enharmonicNotesUnicode,
} from "../note-labels/enharmonic-notes.ts";

/**
 * Gets the integer notation (pitch class 0-11) of a given note name.
 * Handles both '#'/'b' and '♯'/'♭' notations, and is case-insensitive.
 *
 * @param noteName The note name to convert (e.g., "C#", "db", "E♭").
 * @returns The pitch integer (0-11) if found, otherwise undefined.
 */
export function getIntegerNotation(
  noteName: NoteName,
): PitchInteger | undefined {
  const lowerCaseNoteName = noteName.toLowerCase();

  const checkEnharmonicNotes = (
    enharmonicNotes: EnharmonicNotes,
  ): PitchInteger | undefined => {
    for (let index = 0; index < enharmonicNotes.length; index++) {
      const containsNote = enharmonicNotes[index].some(
        (n) => n.toLowerCase() === lowerCaseNoteName,
      );
      if (containsNote) return index as PitchInteger;
    }
    return undefined;
  };

  const resultAlt = checkEnharmonicNotes(enharmonicNotesAlt);
  if (resultAlt !== undefined) return resultAlt;
  return checkEnharmonicNotes(enharmonicNotesUnicode);
}
