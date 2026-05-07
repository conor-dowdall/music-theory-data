import {
  chordQualityRomanRenderings,
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
  ChordQuality,
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
import type { ChromaticIndex, ChromaticTuple } from "../data/chromatic.ts";
import {
  type DiatonicModeKey,
  diatonicModes,
} from "../data/note-collections/diatonic-modes.ts";
import {
  isOctaveInterval,
  type NoteCollectionKeyTransformOptions,
  type RootAndNoteCollectionKeyTransformOptions,
} from "./intervals.ts";
import { createChromaticTuple, normalizeChromaticIndex } from "./chromatic.ts";
import { getNoteNamesForRootAndNoteCollectionKey } from "./note-names.ts";
import {
  noteNameToIntegerMap,
  type RootNote,
} from "../data/labels/note-labels.ts";

export function getRomanNumeralForScaleIndexAndChordQuality(
  scaleIndex: number,
  quality: ChordQuality,
): string | undefined {
  const rendering = chordQualityRomanRenderings.get(quality);
  if (rendering === undefined) return undefined;

  const numerals = rendering.numeralCase === "lower"
    ? lowerCaseRomanNumerals
    : upperCaseRomanNumerals;
  const romanNumeral = numerals[scaleIndex];

  if (romanNumeral === undefined) return undefined;

  return romanNumeral + rendering.suffix;
}

/**
 * Converts standard triad qualities (e.g., "M", "m") into their corresponding Roman numeral representations
 * based on their scale degree index.
 *
 * @param triads An array of triad qualities in order of scale degree.
 * @returns An array of string-based Roman numeral triads (e.g., "I", "ii", "iii°").
 */
export function getRomanTriads(triads: Triad[]): RomanTriad[] {
  return triads.map((quality, i) => {
    const roman = getRomanNumeralForScaleIndexAndChordQuality(i, quality);
    if (roman === undefined) {
      throw new Error(`Unhandled triad quality: ${quality}`);
    }
    return roman;
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
    const roman = getRomanNumeralForScaleIndexAndChordQuality(i, quality);
    if (roman === undefined) {
      throw new Error(`Unhandled seventh chord quality: ${quality}`);
    }
    return roman;
  }) as RomanSeventhChord[];
}

function getChromaticArray<T>(
  items: readonly T[],
  intervals: readonly Interval[],
): ChromaticTuple<T | undefined> {
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

  intervals.forEach((interval, i) => {
    if (isOctaveInterval(interval)) {
      return;
    }

    const semitones = intervalToIntegerMap.get(interval);
    if (semitones !== undefined) {
      result[normalizeChromaticIndex(semitones)] = items[i];
    }
  });

  return createChromaticTuple(result);
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

function getUndefinedChordPlaceholders<T>(
  intervals: readonly Interval[],
  fillChromatic: boolean | undefined,
): readonly (T | undefined)[] {
  if (fillChromatic) {
    return createChromaticTuple(Array.from({ length: 12 }, () => undefined));
  }

  return intervals
    .filter((interval) => !isOctaveInterval(interval))
    .map(() => undefined);
}

/**
 * A generic core helper function to evaluate and return chords for any given NoteCollectionKey.
 *
 * @template T The underlying chord type extracted automatically from ModeData (e.g., `Triad` or `SeventhChord`).
 * @template U The final returned array type. If `transformRoman` is provided, this represents the Roman numeral type (e.g., `RomanTriad`). If no transformation is applied, `U` defaults to `T`.
 */
function getChordsForNoteCollectionKey<T, U = T>(
  noteCollectionKey: NoteCollectionKey,
  options: NoteCollectionKeyTransformOptions,
  extractChords: (data: ModeData) => readonly T[],
  transformRoman?: (chords: T[]) => U[],
  rootOptions?: {
    rotateToRootInteger0?: boolean;
    rootNoteInteger?: ChromaticIndex;
  },
): (U | undefined)[] {
  // 1. Verify that the requested note collection exists.
  const collection = noteCollections[noteCollectionKey];
  if (!collection) return [];

  const { rotateRight, fillChromatic } = options;
  const { rotateToRootInteger0, rootNoteInteger } = rootOptions ?? {};

  // Helper function to apply requested rotations after the chord array is cleanly generated.
  const applyRotations = (
    chordsArray: readonly (U | undefined)[],
    isChromatic: boolean,
  ) => {
    let result = [...chordsArray];

    // If fillChromatic is true, the array represents the 12 absolute semitones (where index 0 = the root note relative to itself).
    if (isChromatic) {
      if (rotateToRootInteger0 && rootNoteInteger !== undefined) {
        // Shift the array so that the absolute root note (rootNoteInteger) sits at index 0.
        result = rotateArrayRight(result, rootNoteInteger);
      }
    } else {
      // NOTE: When fillChromatic is false, rotateToRootInteger0 doesn't make geometric sense
      // because the array isn't guaranteed to be 12 elements. But if the user explicitly provided it
      // we should simply shift the array elements by `rootNoteInteger` positions to satisfy the API.
      if (rotateToRootInteger0 && rootNoteInteger !== undefined) {
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
      return applyRotations(
        getChromaticArray(processedChords, data.intervals),
        true,
      );
    }

    // 2d. Otherwise, return the sequentially packed list.
    return applyRotations(processedChords, false);
  }

  // 3. Collections without authored chord systems should not infer harmony from
  // mostSimilarScale. Return undefined placeholders so array positions stay meaningful.
  return applyRotations(
    getUndefinedChordPlaceholders<U>(collection.intervals, fillChromatic),
    fillChromatic === true,
  );
}

/**
 * Retrieves the triads for a given note collection key.
 */
export function getTriadsForNoteCollectionKey(
  noteCollectionKey: NoteCollectionKey,
  options: NoteCollectionKeyTransformOptions = {},
): (Triad | undefined)[] {
  return getChordsForNoteCollectionKey<Triad>(
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
  options: NoteCollectionKeyTransformOptions = {},
): (SeventhChord | undefined)[] {
  return getChordsForNoteCollectionKey<SeventhChord>(
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
  options: NoteCollectionKeyTransformOptions = {},
): (RomanTriad | undefined)[] {
  return getChordsForNoteCollectionKey<Triad, RomanTriad>(
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
  options: NoteCollectionKeyTransformOptions = {},
): (RomanSeventhChord | undefined)[] {
  return getChordsForNoteCollectionKey<SeventhChord, RomanSeventhChord>(
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
  options: RootAndNoteCollectionKeyTransformOptions = {},
): (string | undefined)[] {
  const noteNames = getNoteNamesForRootAndNoteCollectionKey(
    rootNote,
    noteCollectionKey,
    options,
  );
  const { rotateToRootInteger0, ...restOptions } = options;
  const chords = getChordsForNoteCollectionKey<Triad>(
    noteCollectionKey,
    restOptions,
    (data) => data.triads,
    undefined,
    {
      rootNoteInteger: noteNameToIntegerMap.get(rootNote),
      rotateToRootInteger0,
    },
  );

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
  options: RootAndNoteCollectionKeyTransformOptions = {},
): (string | undefined)[] {
  const noteNames = getNoteNamesForRootAndNoteCollectionKey(
    rootNote,
    noteCollectionKey,
    options,
  );
  const { rotateToRootInteger0, ...restOptions } = options;
  const chords = getChordsForNoteCollectionKey<SeventhChord>(
    noteCollectionKey,
    restOptions,
    (data) => data.sevenths,
    undefined,
    {
      rootNoteInteger: noteNameToIntegerMap.get(rootNote),
      rotateToRootInteger0,
    },
  );

  return chords.map((chord, i) => {
    if (chord === undefined) return undefined;
    return noteNames[i] + chord;
  });
}

/**
 * Retrieves the Roman numeral triads for a given root note and note collection key.
 * This is particularly useful when options.fillChromatic is true, as it positions the chords
 * at their correct absolute pitch degrees.
 */
export function getRomanTriadsForRootAndNoteCollectionKey(
  rootNote: RootNote,
  noteCollectionKey: NoteCollectionKey,
  options: RootAndNoteCollectionKeyTransformOptions = {},
): (RomanTriad | undefined)[] {
  const { rotateToRootInteger0, ...restOptions } = options;
  return getChordsForNoteCollectionKey<Triad, RomanTriad>(
    noteCollectionKey,
    restOptions,
    (data) => data.triads,
    getRomanTriads,
    {
      rootNoteInteger: noteNameToIntegerMap.get(rootNote),
      rotateToRootInteger0,
    },
  );
}

/**
 * Retrieves the Roman numeral seventh chords for a given root note and note collection key.
 * This is particularly useful when options.fillChromatic is true, as it positions the chords
 * at their correct absolute pitch degrees.
 */
export function getRomanSeventhChordsForRootAndNoteCollectionKey(
  rootNote: RootNote,
  noteCollectionKey: NoteCollectionKey,
  options: RootAndNoteCollectionKeyTransformOptions = {},
): (RomanSeventhChord | undefined)[] {
  const { rotateToRootInteger0, ...restOptions } = options;
  return getChordsForNoteCollectionKey<SeventhChord, RomanSeventhChord>(
    noteCollectionKey,
    restOptions,
    (data) => data.sevenths,
    getRomanSeventhChords,
    {
      rootNoteInteger: noteNameToIntegerMap.get(rootNote),
      rotateToRootInteger0,
    },
  );
}
