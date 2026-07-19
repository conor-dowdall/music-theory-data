import {
  getChordCollectionChordSuffix,
  getChordCollectionSymbolRendering,
  isSupportedHarmonyParentKey,
  lowerCaseRomanNumerals,
  type NoteCollectionHarmony,
  noteCollectionHarmonyByParentKey,
  type RomanSeventhChord,
  type RomanTriad,
  type SeventhChordCollectionKey,
  type SeventhChordSuffix,
  type TriadChordCollectionKey,
  type TriadChordSuffix,
  upperCaseRomanNumerals,
} from "../data/chords/mod.ts";
import {
  type ChordCollectionKey,
  type NoteCollectionKey,
  noteCollections,
} from "../data/note-collections/mod.ts";
import { rotateArrayLeft, rotateArrayRight } from "./rotate-array.ts";
import {
  type Interval,
  intervalToIntegerMap,
} from "../data/labels/note-labels.ts";
import type { ChromaticIndex, ChromaticTuple } from "../data/chromatic.ts";
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

/** Returns a Roman numeral for a scale degree index and chord collection key. */
export function getRomanNumeralForScaleIndexAndChordCollectionKey(
  scaleIndex: number,
  chordCollectionKey: ChordCollectionKey,
): string | undefined {
  const rendering = getChordCollectionSymbolRendering(chordCollectionKey);
  const numerals = rendering.numeralCase === "lower"
    ? lowerCaseRomanNumerals
    : upperCaseRomanNumerals;
  const romanNumeral = numerals[scaleIndex];

  if (romanNumeral === undefined) return undefined;

  return romanNumeral + rendering.romanSuffix;
}

function getRomanSymbolsForChordCollectionKeys(
  chordCollectionKeys: readonly ChordCollectionKey[],
): string[] {
  return chordCollectionKeys.map((chordCollectionKey, scaleIndex) => {
    const roman = getRomanNumeralForScaleIndexAndChordCollectionKey(
      scaleIndex,
      chordCollectionKey,
    );
    if (roman === undefined) {
      throw new Error(`Missing Roman numeral for scale degree ${scaleIndex}`);
    }
    return roman;
  });
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
  harmony: NoteCollectionHarmony;
};

function getModeData(modeKey: NoteCollectionKey): ModeData | undefined {
  const mode = noteCollections[modeKey];
  if (
    mode === undefined || mode.category !== "scale" ||
    mode.rotation === undefined || !Number.isInteger(mode.rotation) ||
    mode.rotation < 0 ||
    mode.rotation >= mode.integers.length || mode.integers.length !== 7 ||
    !isSupportedHarmonyParentKey(mode.rotatedScale)
  ) return undefined;

  return {
    intervals: mode.intervals,
    rotation: mode.rotation,
    harmony: noteCollectionHarmonyByParentKey[mode.rotatedScale],
  };
}

/**
 * Checks whether a note collection belongs to a supported modal harmony system.
 * Unsupported collections intentionally return undefined chord placeholders.
 */
export function hasNoteCollectionHarmony(
  noteCollectionKey: NoteCollectionKey,
): boolean {
  return getModeData(noteCollectionKey) !== undefined;
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
 * Resolves canonical harmony values for a note collection and applies layout transformations.
 *
 * @template TKey The canonical chord collection key type.
 * @template TOutput The rendered or canonical output type.
 */
function getHarmonyValuesForNoteCollectionKey<
  TKey extends ChordCollectionKey,
  TOutput = TKey,
>(
  noteCollectionKey: NoteCollectionKey,
  options: NoteCollectionKeyTransformOptions,
  extractChordCollectionKeys: (
    harmony: NoteCollectionHarmony,
  ) => readonly TKey[],
  transform?: (chordCollectionKeys: readonly TKey[]) => readonly TOutput[],
  rootOptions?: {
    rotateToRootInteger0?: boolean;
    rootNoteInteger?: ChromaticIndex;
  },
): (TOutput | undefined)[] {
  // 1. Verify that the requested note collection exists.
  const collection = noteCollections[noteCollectionKey];
  if (!collection) return [];

  const { rotateRight, fillChromatic } = options;
  const { rotateToRootInteger0, rootNoteInteger } = rootOptions ?? {};

  // Helper function to apply requested rotations after the chord array is cleanly generated.
  const applyRotations = (
    chordsArray: readonly (TOutput | undefined)[],
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
    const rotatedChordCollectionKeys = rotateArrayLeft(
      extractChordCollectionKeys(data.harmony),
      data.rotation,
    );

    // 2b. Render canonical identities only when the caller requested it.
    const processedChords = transform
      ? transform(rotatedChordCollectionKeys)
      : (rotatedChordCollectionKeys as unknown as readonly TOutput[]);

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

  // 3. Collections outside supported harmony systems should not infer harmony from
  // mostSimilarScale. Return undefined placeholders so array positions stay meaningful.
  return applyRotations(
    getUndefinedChordPlaceholders<TOutput>(
      collection.intervals,
      fillChromatic,
    ),
    fillChromatic === true,
  );
}

/** Returns canonical triad chord identities for a note collection. */
export function getTriadChordCollectionKeysForNoteCollectionKey(
  noteCollectionKey: NoteCollectionKey,
  options: NoteCollectionKeyTransformOptions = {},
): (TriadChordCollectionKey | undefined)[] {
  return getHarmonyValuesForNoteCollectionKey<TriadChordCollectionKey>(
    noteCollectionKey,
    options,
    (harmony) => harmony.triads,
  );
}

/** Returns canonical seventh-chord identities for a note collection. */
export function getSeventhChordCollectionKeysForNoteCollectionKey(
  noteCollectionKey: NoteCollectionKey,
  options: NoteCollectionKeyTransformOptions = {},
): (SeventhChordCollectionKey | undefined)[] {
  return getHarmonyValuesForNoteCollectionKey<SeventhChordCollectionKey>(
    noteCollectionKey,
    options,
    (harmony) => harmony.sevenths,
  );
}

function getTriadChordSuffix(
  chordCollectionKey: TriadChordCollectionKey,
): TriadChordSuffix {
  const suffix = getChordCollectionChordSuffix(chordCollectionKey);
  if (suffix === "M" || suffix === "m" || suffix === "°" || suffix === "+") {
    return suffix;
  }
  throw new Error(`Invalid triad suffix for ${chordCollectionKey}: ${suffix}`);
}

function getSeventhChordSuffix(
  chordCollectionKey: SeventhChordCollectionKey,
): SeventhChordSuffix {
  const suffix = getChordCollectionChordSuffix(chordCollectionKey);
  switch (suffix) {
    case "M7":
    case "m7":
    case "m(M7)":
    case "7":
    case "°7":
    case "ø7":
    case "+7":
    case "+M7":
      return suffix;
    default:
      throw new Error(
        `Invalid seventh-chord suffix for ${chordCollectionKey}: ${suffix}`,
      );
  }
}

/** Returns rendered triad suffixes for a note collection. */
export function getTriadChordSuffixesForNoteCollectionKey(
  noteCollectionKey: NoteCollectionKey,
  options: NoteCollectionKeyTransformOptions = {},
): (TriadChordSuffix | undefined)[] {
  return getHarmonyValuesForNoteCollectionKey<
    TriadChordCollectionKey,
    TriadChordSuffix
  >(
    noteCollectionKey,
    options,
    (harmony) => harmony.triads,
    (keys) => keys.map(getTriadChordSuffix),
  );
}

/** Returns rendered seventh-chord suffixes for a note collection. */
export function getSeventhChordSuffixesForNoteCollectionKey(
  noteCollectionKey: NoteCollectionKey,
  options: NoteCollectionKeyTransformOptions = {},
): (SeventhChordSuffix | undefined)[] {
  return getHarmonyValuesForNoteCollectionKey<
    SeventhChordCollectionKey,
    SeventhChordSuffix
  >(
    noteCollectionKey,
    options,
    (harmony) => harmony.sevenths,
    (keys) => keys.map(getSeventhChordSuffix),
  );
}

/** Retrieves Roman numeral triads for a note collection. */
export function getRomanTriadsForNoteCollectionKey(
  noteCollectionKey: NoteCollectionKey,
  options: NoteCollectionKeyTransformOptions = {},
): (RomanTriad | undefined)[] {
  return getHarmonyValuesForNoteCollectionKey<
    TriadChordCollectionKey,
    RomanTriad
  >(
    noteCollectionKey,
    options,
    (harmony) => harmony.triads,
    (keys) => getRomanSymbolsForChordCollectionKeys(keys) as RomanTriad[],
  );
}

/** Retrieves Roman numeral seventh chords for a note collection. */
export function getRomanSeventhChordsForNoteCollectionKey(
  noteCollectionKey: NoteCollectionKey,
  options: NoteCollectionKeyTransformOptions = {},
): (RomanSeventhChord | undefined)[] {
  return getHarmonyValuesForNoteCollectionKey<
    SeventhChordCollectionKey,
    RomanSeventhChord
  >(
    noteCollectionKey,
    options,
    (harmony) => harmony.sevenths,
    (keys) =>
      getRomanSymbolsForChordCollectionKeys(keys) as RomanSeventhChord[],
  );
}

/** Returns rooted triad names, such as `CM`, `Dm`, or `B°`. */
export function getTriadChordNamesForRootAndNoteCollectionKey(
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
  const chordCollectionKeys = getHarmonyValuesForNoteCollectionKey<
    TriadChordCollectionKey
  >(
    noteCollectionKey,
    restOptions,
    (harmony) => harmony.triads,
    undefined,
    {
      rootNoteInteger: noteNameToIntegerMap.get(rootNote),
      rotateToRootInteger0,
    },
  );

  return chordCollectionKeys.map((chordCollectionKey, index) => {
    const noteName = noteNames[index];
    if (chordCollectionKey === undefined || noteName === undefined) {
      return undefined;
    }
    return noteName + getChordCollectionChordSuffix(chordCollectionKey);
  });
}

/** Returns rooted seventh-chord names, such as `CM7`, `G7`, or `Bø7`. */
export function getSeventhChordNamesForRootAndNoteCollectionKey(
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
  const chordCollectionKeys = getHarmonyValuesForNoteCollectionKey<
    SeventhChordCollectionKey
  >(
    noteCollectionKey,
    restOptions,
    (harmony) => harmony.sevenths,
    undefined,
    {
      rootNoteInteger: noteNameToIntegerMap.get(rootNote),
      rotateToRootInteger0,
    },
  );

  return chordCollectionKeys.map((chordCollectionKey, index) => {
    const noteName = noteNames[index];
    if (chordCollectionKey === undefined || noteName === undefined) {
      return undefined;
    }
    return noteName + getChordCollectionChordSuffix(chordCollectionKey);
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
  return getHarmonyValuesForNoteCollectionKey<
    TriadChordCollectionKey,
    RomanTriad
  >(
    noteCollectionKey,
    restOptions,
    (harmony) => harmony.triads,
    (keys) => getRomanSymbolsForChordCollectionKeys(keys) as RomanTriad[],
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
  return getHarmonyValuesForNoteCollectionKey<
    SeventhChordCollectionKey,
    RomanSeventhChord
  >(
    noteCollectionKey,
    restOptions,
    (harmony) => harmony.sevenths,
    (keys) =>
      getRomanSymbolsForChordCollectionKeys(keys) as RomanSeventhChord[],
    {
      rootNoteInteger: noteNameToIntegerMap.get(rootNote),
      rotateToRootInteger0,
    },
  );
}
