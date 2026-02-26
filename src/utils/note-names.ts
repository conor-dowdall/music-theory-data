import {
  enharmonicNoteNameGroups,
  type Interval,
  intervalToIntegerMap,
  type NoteLetter,
  noteLetters,
  type NoteName,
  noteNamesSet,
  noteNameToIntegerMap,
  type RootNote,
  type RootNoteInteger,
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

const NOTE_LETTER_REGEX = /^[A-Ga-g]/;
const ACCIDENTAL_REGEX = /([#♯xX𝄪]+)|([b♭𝄫]+)/gu;
const INTERVAL_NUMBER_REGEX = /\d+/;

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

  const noteLetterMatch = name.match(NOTE_LETTER_REGEX);
  if (!noteLetterMatch) {
    return undefined;
  }

  const noteLetter = noteLetterMatch[0].toUpperCase() as NoteLetter;
  const accidentalString = name.substring(noteLetterMatch[0].length);
  let validAccidentalLength = 0;
  let noteAlterInteger = 0;

  for (const match of accidentalString.matchAll(ACCIDENTAL_REGEX)) {
    const sharps = match[1];
    if (sharps) {
      for (const char of sharps) {
        noteAlterInteger += char.toLowerCase() === "x" || char === "𝄪" ? 2 : 1;
      }
      validAccidentalLength += sharps.length;
    }

    const flats = match[2];
    if (flats) {
      for (const char of flats) {
        noteAlterInteger -= char === "𝄫" ? 2 : 1;
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

/**
 * Gets the integer representation (0-11, where C=0) of a given note name string.
 * @param noteName The note name string to evaluate.
 * @returns The integer value of the root note, or `undefined` if invalid.
 */
export function getNoteIntegerFromString(
  noteName: string,
): RootNoteInteger | undefined {
  const normalized = normalizeNoteNameString(noteName);
  if (!normalized) return undefined;
  return noteNameToIntegerMap.get(normalized);
}

/**
 * Calculates a specific note name given a root note and an interval.
 * @param rootNoteInteger The integer representation of the root note (0-11).
 * @param rootNoteLetterIndex The index of the root note's letter in the noteLetters array (0-6).
 * @param interval The interval to calculate the note from.
 * @returns An object containing the note name and its semitone offset from the root, or undefined if invalid.
 */
function getNoteFromRootAndInterval(
  rootNoteInteger: number,
  rootNoteLetterIndex: number,
  interval: string,
): { noteName: NoteName; semitoneOffset: number } | undefined {
  const intervalInteger = intervalToIntegerMap.get(interval as Interval);
  if (intervalInteger === undefined) return undefined;

  const semitoneOffset = intervalInteger % 12;
  const absoluteNoteInteger = (rootNoteInteger + intervalInteger) % 12;

  const intervalNumberMatch = interval.match(INTERVAL_NUMBER_REGEX);
  let selectedNote: NoteName | undefined;

  if (intervalNumberMatch) {
    const intervalNumber = parseInt(intervalNumberMatch[0], 10);
    // intervalNumber is 1-based (e.g. 1 for Unison), so we subtract 1 for 0-based index calculation
    const targetNoteLetter =
      noteLetters[(rootNoteLetterIndex + intervalNumber - 1) % 7];

    const enharmonicGroup = enharmonicNoteNameGroups[absoluteNoteInteger];
    selectedNote = enharmonicGroup.find((noteName) =>
      noteName.startsWith(targetNoteLetter),
    );
  }

  // Fallback: If no interval number match or specific note not found (less likely with valid intervals),
  // pick the first note in the enharmonic group.
  if (!selectedNote) {
    selectedNote = enharmonicNoteNameGroups[absoluteNoteInteger][0];
  }

  return { noteName: selectedNote, semitoneOffset };
}

/**
 * Calculates an array of specific note names given a root note and an array of intervals.
 * Supports filling chromatic passing notes and other transformations via options.
 * See `tests/get-note-names.test.ts` for comprehensive usage examples.
 *
 * @param rootNote The starting root note.
 * @param intervals An array of intervals relative to the root.
 * @param options Optional settings for formatting the output, such as chromatic filling.
 * @returns An array of computed note names.
 */
export function getNoteNamesFromRootAndIntervals(
  rootNote: RootNote,
  intervals: readonly Interval[],
  options: TransformIntervalsOptions = {},
): NoteName[] {
  // 1. Resolve Root Note
  const rootNoteInteger = noteNameToIntegerMap.get(rootNote);
  if (rootNoteInteger === undefined) return [];
  const rootNoteLetter = rootNote.charAt(0).toUpperCase();
  const rootNoteLetterIndex = noteLetters.indexOf(rootNoteLetter as NoteLetter);

  // 2. Transform Intervals
  const enhancedOptions: TransformIntervalsOptions = options.fillChromatic
    ? ({
        ...options,
        ...(options.rotateToRootInteger0 ? { rootNoteInteger } : {}),
      } as TransformIntervalsOptions)
    : options;

  const intervalsToConvert =
    Object.keys(enhancedOptions).length > 0
      ? transformIntervals(intervals, enhancedOptions)
      : intervals;

  // 3. Generate Note Names
  // Map intervals directly to note names
  const noteNames: NoteName[] = intervalsToConvert.flatMap((interval) => {
    const result = getNoteFromRootAndInterval(
      rootNoteInteger,
      rootNoteLetterIndex,
      interval,
    );
    return result ? [result.noteName] : [];
  });

  return noteNames;
}

/**
 * Retrieves an array of note names for a given root note and a standard collection key (e.g., "major", "aeolian").
 * Automatically inherits contextual hint data (like `mostSimilarScale`) from the collection for better accidental spelling.
 * See `tests/get-note-names.test.ts` for examples of scale and chord spellings.
 *
 * @param rootNote The starting root note.
 * @param noteCollectionKey The identifier for the desired scale or chord.
 * @param options Optional settings for interval transformations or output formatting.
 * @returns An array of computed note names.
 */
export function getNoteNamesFromRootAndCollectionKey(
  rootNote: RootNote,
  noteCollectionKey: NoteCollectionKey,
  options: Omit<TransformIntervalsOptions, "mostSimilarScale"> = {},
): NoteName[] {
  if (!isValidNoteCollectionKey(noteCollectionKey)) return [];

  const collection = noteCollections[noteCollectionKey];
  const mostSimilarScale =
    "mostSimilarScale" in collection ? collection.mostSimilarScale : undefined;

  const finalOptions: TransformIntervalsOptions =
    options.fillChromatic &&
    mostSimilarScale &&
    mostSimilarScale !== noteCollectionKey
      ? ({
          ...options,
          fillChromatic: true,
          mostSimilarScale: mostSimilarScale,
        } as TransformIntervalsOptions)
      : (options as TransformIntervalsOptions);

  return getNoteNamesFromRootAndIntervals(
    rootNote,
    collection.intervals,
    finalOptions,
  );
}
