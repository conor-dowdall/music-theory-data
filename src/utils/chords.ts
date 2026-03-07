import {
  diatonicSeventhChords,
  diatonicTriads,
  harmonicMinorSeventhChords,
  harmonicMinorTriads,
  lowerCaseRomanNumerals,
  melodicMinorSeventhChords,
  melodicMinorTriads,
  upperCaseRomanNumerals,
} from "../data/chords/mod.ts";
import {
  type NoteCollectionKey,
  noteCollections,
} from "../data/note-collections/mod.ts";
import type {
  RomanSeventhChord,
  RomanTriad,
  SeventhChord,
  Triad,
} from "../types/chords.d.ts";
import { rotateArrayLeft, rotateArrayRight } from "./rotate-array.ts";
import {
  type HarmonicMinorModeKey,
  harmonicMinorModes,
} from "../data/note-collections/harmonic-minor-modes.ts";
import {
  type MelodicMinorModeKey,
  melodicMinorModes,
} from "../data/note-collections/melodic-minor-modes.ts";
import {
  type Interval,
  intervalToIntegerMap,
} from "../data/labels/note-labels.ts";
import {
  type DiatonicModeKey,
  diatonicModes,
} from "../data/note-collections/diatonic-modes.ts";
import {
  filterOutOctaveIntervals,
  type TransformIntervalsOptions,
} from "./intervals.ts";
import { getNoteNamesForRootAndNoteCollectionKey } from "./note-names.ts";
import {
  noteNameToIntegerMap,
  type RootNote,
} from "../data/labels/note-labels.ts";

/**
 * Converts standard triad qualities (e.g., "M", "m") into their corresponding Roman numeral representations
 * based on their scale degree index.
 *
 * @param triads An array of triad qualities in order of scale degree.
 * @returns An array of string-based Roman numeral triads (e.g., "I", "ii", "iii°").
 */
export function getRomanTriads(triads: Triad[]): RomanTriad[] {
  return triads.map((quality, i) => {
    switch (quality) {
      case "M":
        return upperCaseRomanNumerals[i];
      case "m":
        return lowerCaseRomanNumerals[i];
      case "°":
        return lowerCaseRomanNumerals[i] + quality;
      case "+":
        return upperCaseRomanNumerals[i] + quality;
      default:
        // This should not happen with valid data. Fail fast if it does.
        throw new Error(`Unhandled triad quality: ${quality}`);
    }
  }) as RomanTriad[];
}

/**
 * Converts standard seventh chord qualities (e.g., "M7", "m7") into their corresponding Roman numeral representations
 * based on their scale degree index.
 *
 * @param sevenths An array of seventh chord qualities in order of scale degree.
 * @returns An array of string-based Roman numeral seventh chords (e.g., "IM7", "ii7", "vii°7").
 */
export function getRomanSeventhChords(
  sevenths: SeventhChord[],
): RomanSeventhChord[] {
  return sevenths.map((quality, i) => {
    switch (quality) {
      case "M7":
        return upperCaseRomanNumerals[i] + quality;
      case "m7":
        return lowerCaseRomanNumerals[i] + quality;
      case "7":
        return upperCaseRomanNumerals[i] + quality;
      case "ø7":
        return lowerCaseRomanNumerals[i] + quality;
      case "m7♭5":
        return lowerCaseRomanNumerals[i] + quality;
      case "°7":
        return lowerCaseRomanNumerals[i] + quality;
      case "m(M7)":
        return lowerCaseRomanNumerals[i] + "M7";
      case "+M7":
        return upperCaseRomanNumerals[i] + quality;
      case "M7♯5":
        return upperCaseRomanNumerals[i] + quality;
      default:
        // This should not happen with valid data. Fail fast if it does.
        throw new Error(`Unhandled seventh chord quality: ${quality}`);
    }
  }) as RomanSeventhChord[];
}

function getChromaticArray<T>(
  items: readonly T[],
  intervals: readonly Interval[],
): (T | undefined)[] {
  const result: (T | undefined)[] = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ];

  const filteredIntervals = filterOutOctaveIntervals(intervals);

  filteredIntervals.forEach((interval, i) => {
    const semitones = intervalToIntegerMap.get(interval);
    if (semitones !== undefined) {
      result[semitones % 12] = items[i];
    }
  });

  return result;
}

type ModeData = {
  intervals: readonly Interval[];
  rotation: number;
  triads: readonly Triad[];
  sevenths: readonly SeventhChord[];
};

function getModeData(modeKey: NoteCollectionKey): ModeData | undefined {
  if (Object.prototype.hasOwnProperty.call(diatonicModes, modeKey)) {
    const mode = diatonicModes[modeKey as DiatonicModeKey];
    return {
      intervals: mode.intervals,
      rotation: mode.rotation,
      triads: diatonicTriads,
      sevenths: diatonicSeventhChords,
    };
  }
  if (Object.prototype.hasOwnProperty.call(harmonicMinorModes, modeKey)) {
    const mode = harmonicMinorModes[modeKey as HarmonicMinorModeKey];
    return {
      intervals: mode.intervals,
      rotation: mode.rotation,
      triads: harmonicMinorTriads,
      sevenths: harmonicMinorSeventhChords,
    };
  }
  if (Object.prototype.hasOwnProperty.call(melodicMinorModes, modeKey)) {
    const mode = melodicMinorModes[modeKey as MelodicMinorModeKey];
    return {
      intervals: mode.intervals,
      rotation: mode.rotation,
      triads: melodicMinorTriads,
      sevenths: melodicMinorSeventhChords,
    };
  }
  return undefined;
}

/**
 * A generic core helper function to evaluate and return chords for any given NoteCollectionKey.
 *
 * @template T The underlying chord type extracted automatically from ModeData (e.g., `Triad` or `SeventhChord`).
 * @template U The final returned array type. If `transformRoman` is provided, this represents the Roman numeral type (e.g., `RomanTriad`). If no transformation is applied, `U` defaults to `T`.
 */
function getChordsForNoteCollection<T, U = T>(
  noteCollectionKey: NoteCollectionKey,
  options: Omit<TransformIntervalsOptions, "mostSimilarScale">,
  extractChords: (data: ModeData) => readonly T[],
  transformRoman?: (chords: T[]) => U[],
): (U | undefined)[] {
  // 1. Verify that the requested note collection exists.
  const collection = noteCollections[noteCollectionKey];
  if (!collection) return [];

  const { rotateRight, rotateToRootInteger0, rootNoteInteger, fillChromatic } =
    options;

  // Helper function to apply requested rotations after the chord array is cleanly generated.
  const applyRotations = (chordsArray: (U | undefined)[]) => {
    let result = chordsArray;

    // If fillChromatic is true, the array represents the 12 absolute semitones (where index 0 = the root note relative to itself).
    if (fillChromatic) {
      if (rotateToRootInteger0 && rootNoteInteger !== undefined) {
        // Shift the array so that the absolute root note (rootNoteInteger) sits at index 0.
        result = rotateArrayRight(result, rootNoteInteger);
      }
    }

    // Apply any explicit arbitrary rightward rotations requested by the user.
    if (rotateRight !== undefined) {
      result = rotateArrayRight(result, rotateRight);
    }
    return result;
  };

  // 2. Check if the collection is a fundamental, complete mode (Diatonic, Harmonic/Melodic Minor).
  // These modes have predefined, strictly defined chord arrays (triads/sevenths) that we can extract directly.
  const data = getModeData(noteCollectionKey);
  if (data) {
    // 2a. Rotate the base mode chords by the mode's inherent rotation (e.g., Dorian is rotation 1 of Diatonic parent).
    const rotatedChords = rotateArrayLeft(extractChords(data), data.rotation);

    // 2b. Map the standard chords to Roman Numerals if a transform function was provided.
    const processedChords = transformRoman
      ? transformRoman(rotatedChords)
      : (rotatedChords as unknown as U[]);

    // 2c. If requested, map the sequential chord list into a 12-semitone chromatic sparse array.
    if (fillChromatic) {
      return applyRotations(getChromaticArray(processedChords, data.intervals));
    }

    // 2d. Otherwise, return the sequentially packed list.
    return applyRotations(processedChords);
  }

  // 3. If the collection is NOT a primary mode (e.g., a custom scale like Minor Pentatonic),
  // we cannot look up predefined chords. Instead, we fall back to its "most Similar Scale".
  const similarScaleKey = collection.mostSimilarScale;
  const similarData = getModeData(similarScaleKey);
  if (!similarData) return [];

  // 3a. Retrieve and rotate the chords for the similar scale exactly like step 2.
  const similarChords = rotateArrayLeft(
    extractChords(similarData),
    similarData.rotation,
  );
  const similarProcessedChords = transformRoman
    ? transformRoman(similarChords)
    : (similarChords as unknown as U[]);

  // 3b. Pluck out only the chords that align with the intervals actually present in the custom scale.
  // E.g. For Minor Pentatonic (intervals 1, b3, 4, 5, b7), we grab the 1st, 3rd, 4th, 5th, and 7th chords of Aeolian.
  const collectionChords = collection.intervals
    .map((interval) => {
      const index = similarData.intervals.indexOf(interval);
      return index !== -1 ? similarProcessedChords[index] : undefined;
    })
    .filter((chord) => chord !== undefined) as U[];

  // 3c. Format and return just like step 2.
  if (fillChromatic) {
    return applyRotations(
      getChromaticArray(collectionChords, collection.intervals),
    );
  }

  return applyRotations(collectionChords);
}

/**
 * Retrieves the triads for a given note collection key.
 */
export function getTriadsForNoteCollectionKey(
  noteCollectionKey: NoteCollectionKey,
  options: Omit<TransformIntervalsOptions, "mostSimilarScale"> = {},
): (Triad | undefined)[] {
  return getChordsForNoteCollection<Triad>(
    noteCollectionKey,
    options,
    (data) => data.triads,
  );
}

/**
 * Retrieves the seventh chords for a given note collection key.
 */
export function getSeventhChordsForNoteCollectionKey(
  noteCollectionKey: NoteCollectionKey,
  options: Omit<TransformIntervalsOptions, "mostSimilarScale"> = {},
): (SeventhChord | undefined)[] {
  return getChordsForNoteCollection<SeventhChord>(
    noteCollectionKey,
    options,
    (data) => data.sevenths,
  );
}

/**
 * Retrieves the Roman numeral triads for a given note collection key.
 */
export function getRomanTriadsForNoteCollectionKey(
  noteCollectionKey: NoteCollectionKey,
  options: Omit<TransformIntervalsOptions, "mostSimilarScale"> = {},
): (RomanTriad | undefined)[] {
  return getChordsForNoteCollection<Triad, RomanTriad>(
    noteCollectionKey,
    options,
    (data) => data.triads,
    getRomanTriads,
  );
}

/**
 * Retrieves the Roman numeral seventh chords for a given note collection key.
 */
export function getRomanSeventhChordsForNoteCollectionKey(
  noteCollectionKey: NoteCollectionKey,
  options: Omit<TransformIntervalsOptions, "mostSimilarScale"> = {},
): (RomanSeventhChord | undefined)[] {
  return getChordsForNoteCollection<SeventhChord, RomanSeventhChord>(
    noteCollectionKey,
    options,
    (data) => data.sevenths,
    getRomanSeventhChords,
  );
}

/**
 * Retrieves the triads with prepended note names for a given root note and note collection key.
 * Example: ["CM", "Dm", "Em", "FM", "GM", "Am", "B°"]
 */
export function getTriadsForRootAndNoteCollectionKey(
  rootNote: RootNote,
  noteCollectionKey: NoteCollectionKey,
  options: Omit<TransformIntervalsOptions, "mostSimilarScale"> = {},
): (string | undefined)[] {
  const noteNames = getNoteNamesForRootAndNoteCollectionKey(
    rootNote,
    noteCollectionKey,
    options,
  );
  const chords = getTriadsForNoteCollectionKey(noteCollectionKey, {
    ...options,
    rootNoteInteger: noteNameToIntegerMap.get(rootNote),
  });

  return chords.map((chord, i) => {
    if (chord === undefined) return undefined;
    return noteNames[i] + chord;
  });
}

/**
 * Retrieves the seventh chords with prepended note names for a given root note and note collection key.
 * Example: ["CM7", "Dm7", "Em7", "FM7", "G7", "Am7", "Bø7"]
 */
export function getSeventhChordsForRootAndNoteCollectionKey(
  rootNote: RootNote,
  noteCollectionKey: NoteCollectionKey,
  options: Omit<TransformIntervalsOptions, "mostSimilarScale"> = {},
): (string | undefined)[] {
  const noteNames = getNoteNamesForRootAndNoteCollectionKey(
    rootNote,
    noteCollectionKey,
    options,
  );
  const chords = getSeventhChordsForNoteCollectionKey(noteCollectionKey, {
    ...options,
    rootNoteInteger: noteNameToIntegerMap.get(rootNote),
  });

  return chords.map((chord, i) => {
    if (chord === undefined) return undefined;
    return noteNames[i] + chord;
  });
}
