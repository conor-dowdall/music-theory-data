import {
  enharmonicNoteNameGroups,
  type Interval,
  intervalToIntegerMap,
  type NoteInteger,
  type NoteLetter,
  noteLetters,
  type NoteName,
  noteNamesSet,
  noteNameToIntegerMap,
  type RootNote,
  rootNotesSet,
} from "../data/labels/note-labels.ts";
import {
  type NoteCollectionKey,
  noteCollections,
} from "../data/note-collections/mod.ts";
import {
  transformIntervals,
  type TransformIntervalsOptions,
} from "./intervals.ts";
import { isValidNoteCollectionKey } from "./note-collections.ts";

/**
 * Parses a string and returns a canonical `NoteName` if the string is a valid note name.
 * This is useful for handling user input that may use ASCII characters like 'b' and '#',
 * as well as double accidentals like 'x', '##', and 'bb'.
 * @param name The string to parse.
 * @returns A canonical `NoteName` (e.g., "B♭", "C𝄪") or `undefined` if the input is not a valid note.
 */
export function normalizeNoteNameString(name: string): NoteName | undefined {
  if (typeof name !== "string" || name.length === 0) {
    return undefined;
  }

  // Check if the name is already a canonical note name (e.g., "C", "B♭")
  // This check is case-sensitive.
  if (noteNamesSet.has(name as NoteName)) {
    return name as NoteName;
  }

  const noteLetterRegex = /^[A-Ga-g]/;
  const accidentalRegex = /([#♯xX𝄪]+)|([b♭𝄫]+)/gu;

  const noteLetterMatch = name.match(noteLetterRegex);
  if (!noteLetterMatch) {
    return undefined;
  }

  const noteLetter = noteLetterMatch[0].toUpperCase() as NoteLetter;
  const accidentalString = name.substring(noteLetterMatch[0].length);
  let validAccidentalLength = 0;
  let noteAlterInteger = 0;

  for (const match of accidentalString.matchAll(accidentalRegex)) {
    const sharps = match[1];
    if (sharps) {
      for (const char of sharps) {
        noteAlterInteger += (char.toLowerCase() === "x" || char === "𝄪")
          ? 2
          : 1;
      }
      validAccidentalLength += sharps.length;
    }

    const flats = match[2];
    if (flats) {
      for (const char of flats) {
        noteAlterInteger -= (char === "𝄫") ? 2 : 1;
      }
      validAccidentalLength += flats.length;
    }
  }

  // Check if the entire accidental string had valid accidentals
  if (accidentalString.length > validAccidentalLength) {
    return undefined;
  }

  let accidentalSymbols = "";
  let currentAlteration = noteAlterInteger;

  while (currentAlteration > 0) {
    if (currentAlteration >= 2) {
      accidentalSymbols += "𝄪";
      currentAlteration -= 2;
    } else {
      accidentalSymbols += "♯";
      currentAlteration -= 1;
    }
  }

  while (currentAlteration < 0) {
    if (currentAlteration <= -2) {
      accidentalSymbols += "𝄫";
      currentAlteration += 2;
    } else {
      accidentalSymbols += "♭";
      currentAlteration += 1;
    }
  }

  const result = (noteLetter + accidentalSymbols) as NoteName;

  return noteNamesSet.has(result) ? result : undefined;
}

/**
 * Parses a string and returns a canonical `RootNote` if the string is a valid root note.
 * This is useful for handling user input that may use ASCII characters for accidentals.
 * It is stricter than `normalizeNoteNameString` as it only allows notes present in the `rootNotes` array.
 * @param name The string to parse.
 * @returns A canonical `RootNote` or `undefined` if the input is not a valid root note.
 */
export function normalizeRootNoteString(name: string): RootNote | undefined {
  const normalizedNote = normalizeNoteNameString(name);

  if (normalizedNote && rootNotesSet.has(normalizedNote as RootNote)) {
    return normalizedNote as RootNote;
  }

  return undefined;
}

export function noteNameToInteger(
  noteName: NoteName,
): NoteInteger | undefined {
  return noteNameToIntegerMap.get(noteName);
}

export function noteNameStringToInteger(
  noteName: string,
): NoteInteger | undefined {
  const normalized = normalizeNoteNameString(noteName);
  if (!normalized) return undefined;
  return noteNameToInteger(normalized);
}

export function getNoteNamesFromRootAndIntervals(
  rootNote: RootNote,
  intervals: readonly Interval[],
  options: TransformIntervalsOptions = {},
): NoteName[] {
  const rootNoteInteger = noteNameToInteger(rootNote);
  if (rootNoteInteger === undefined) return [];
  const rootNoteLetter = rootNote.charAt(0).toUpperCase();
  const rootNoteLetterIndex = noteLetters.indexOf(rootNoteLetter as NoteLetter);

  const intervalsToConvert = Object.keys(options).length > 0
    ? transformIntervals(intervals, options)
    : intervals;

  const noteNames: NoteName[] = intervalsToConvert.flatMap((interval) => {
    const intervalInteger = intervalToIntegerMap.get(interval);
    if (intervalInteger === undefined) return []; // skip over invalid intervals silently

    const absoluteNoteInteger = (rootNoteInteger + intervalInteger) % 12;

    const intervalNumberMatch = interval.match(/\d+/)!;
    const intervalNumber = parseInt(intervalNumberMatch[0], 10);

    const targetNoteLetter =
      noteLetters[(rootNoteLetterIndex + intervalNumber - 1) % 7];

    const enharmonicGroup = enharmonicNoteNameGroups[absoluteNoteInteger];
    const selectedNote = enharmonicGroup.find((noteName) =>
      noteName.startsWith(targetNoteLetter)
    );

    return [selectedNote ?? enharmonicGroup[0]];
  });

  return noteNames;
}

export function getNoteNamesFromRootAndCollectionKey(
  rootNote: RootNote,
  noteCollectionKey: NoteCollectionKey,
  options: TransformIntervalsOptions = {},
): NoteName[] {
  if (!isValidNoteCollectionKey(noteCollectionKey)) return [];

  return getNoteNamesFromRootAndIntervals(
    rootNote,
    noteCollections[noteCollectionKey].intervals,
    options,
  );
}
