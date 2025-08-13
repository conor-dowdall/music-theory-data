import { pitchCollections } from "../data/pitch-collections/mod.ts";
import { noteNameStringToInteger } from "./note-conversions.ts";
import {
  enharmonicNoteNameGroups,
  intervalIntegers,
  noteLetters,
} from "../data/labels/note-labels.ts";
import type { Interval, NoteLetter, NoteName } from "../types/labels.d.ts";
import type { PitchCollectionKey } from "../types/pitch-collections.d.ts";

export function getNotes(
  rootNote: NoteName,
  pitchCollectionKey: PitchCollectionKey,
  options: { orderBy?: "intervals" | "pitch" } = {},
): NoteName[] {
  const rootNoteInteger = noteNameStringToInteger(rootNote);
  if (rootNoteInteger === undefined) {
    console.warn(`Invalid root note: ${rootNote}`);
    return [];
  }

  const noteSequence = pitchCollections[pitchCollectionKey];
  if (!noteSequence) {
    console.warn(`Invalid note sequence theme key: ${pitchCollectionKey}`);
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
