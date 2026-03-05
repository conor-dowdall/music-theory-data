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
import { rotateArrayLeft } from "./rotate-array.ts";
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
import { filterOutOctaveIntervals } from "./intervals.ts";

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
  collectionKey: NoteCollectionKey,
  options: { fillChromatic?: boolean },
  extractChords: (data: ModeData) => readonly T[],
  transformRoman?: (chords: T[]) => U[],
): (U | undefined)[] {
  const collection = noteCollections[collectionKey];
  if (!collection) return [];

  const data = getModeData(collectionKey);
  if (data) {
    const rotatedChords = Array.from(
      rotateArrayLeft(extractChords(data), data.rotation),
    ) as T[];
    const processedChords = transformRoman
      ? transformRoman(rotatedChords)
      : (rotatedChords as unknown as U[]);

    if (options.fillChromatic) {
      return getChromaticArray(processedChords, data.intervals);
    }
    return processedChords;
  }

  const similarScaleKey = collection.mostSimilarScale;
  const similarData = getModeData(similarScaleKey);
  if (!similarData) return [];

  const similarChords = Array.from(
    rotateArrayLeft(extractChords(similarData), similarData.rotation),
  ) as T[];
  const similarProcessedChords = transformRoman
    ? transformRoman(similarChords)
    : (similarChords as unknown as U[]);

  const collectionChords = collection.intervals
    .map((interval) => {
      const index = similarData.intervals.indexOf(interval);
      return index !== -1 ? similarProcessedChords[index] : undefined;
    })
    .filter((chord) => chord !== undefined) as U[];

  if (options.fillChromatic) {
    return getChromaticArray(collectionChords, collection.intervals);
  }

  return collectionChords;
}

/**
 * Retrieves the triads for a given note collection key.
 */
export function getTriadsForNoteCollectionKey(
  collectionKey: NoteCollectionKey,
  options: { fillChromatic?: boolean } = {},
): (Triad | undefined)[] {
  return getChordsForNoteCollection<Triad>(
    collectionKey,
    options,
    (data) => data.triads,
  );
}

/**
 * Retrieves the seventh chords for a given note collection key.
 */
export function getSeventhChordsForNoteCollectionKey(
  collectionKey: NoteCollectionKey,
  options: { fillChromatic?: boolean } = {},
): (SeventhChord | undefined)[] {
  return getChordsForNoteCollection<SeventhChord>(
    collectionKey,
    options,
    (data) => data.sevenths,
  );
}

/**
 * Retrieves the Roman numeral triads for a given note collection key.
 */
export function getRomanTriadsForNoteCollectionKey(
  collectionKey: NoteCollectionKey,
  options: { fillChromatic?: boolean } = {},
): (RomanTriad | undefined)[] {
  return getChordsForNoteCollection<Triad, RomanTriad>(
    collectionKey,
    options,
    (data) => data.triads,
    getRomanTriads,
  );
}

/**
 * Retrieves the Roman numeral seventh chords for a given note collection key.
 */
export function getRomanSeventhChordsForNoteCollectionKey(
  collectionKey: NoteCollectionKey,
  options: { fillChromatic?: boolean } = {},
): (RomanSeventhChord | undefined)[] {
  return getChordsForNoteCollection<SeventhChord, RomanSeventhChord>(
    collectionKey,
    options,
    (data) => data.sevenths,
    getRomanSeventhChords,
  );
}
