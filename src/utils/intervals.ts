import {
  type CompoundInterval,
  compoundToSimpleIntervalMap,
  extensionToSimpleIntervalMap,
  type Interval,
  type IntervalQuality,
  intervalQualityToIntervalMap,
  intervalToIntegerMap,
  type SimpleInterval,
  simpleToCompoundIntervalMap,
  simpleToExtensionIntervalMap,
} from "../data/labels/note-labels.ts";
import {
  type NoteCollectionKey,
  noteCollections,
} from "../data/note-collections/mod.ts";
import { noteLabelCollections } from "@musodojo/music-theory-data";
import { rotateArrayLeft } from "./rotate-array.ts";
import { normalizeAccidentalString } from "./accidentals.ts";

const INTERVAL_NUMBER_REGEX = /\d+$/;

/**
 * Removes octave intervals (such as "8" or "♮8") from a given list of intervals.
 * Highly useful for standardizing chord and scale definitions (scales conventionally include the octave,
 * chords conventionally do not).
 *
 * @param intervals The array of intervals to filter.
 * @returns A new array excluding any octave intervals.
 */
export function filterOutOctaveIntervals(
  intervals: readonly Interval[],
): Interval[] {
  return intervals.filter((i) => i !== "8" && i !== "♮8");
}

/**
 * Parses a string and returns a canonical `Interval` if the string is a valid interval.
 * This handles ASCII accidentals like 'b' and '#' as well as qualities like 'M3', 'm3'.
 * @param name The string to parse.
 * @returns A canonical `Interval` (e.g., "♭3", "♯4") or `undefined` if invalid.
 */
export function normalizeIntervalString(name: string): Interval | undefined {
  if (typeof name !== "string" || name.length === 0) {
    return undefined;
  }

  // 1. Check if it's an explicit interval quality like "M3" or "d5"
  if (intervalQualityToIntervalMap.has(name as IntervalQuality)) {
    return intervalQualityToIntervalMap.get(name as IntervalQuality);
  }

  // 2. Check if it's already a canonical interval like "♭3" or "3"
  if (intervalToIntegerMap.has(name as Interval)) {
    return name as Interval;
  }

  // 3. Try to parse ASCII accidentals before the interval number
  const numberMatch = name.match(INTERVAL_NUMBER_REGEX);
  if (!numberMatch) {
    return undefined;
  }

  const intervalNumberStr = numberMatch[0];
  const accidentalString = name.substring(
    0,
    name.length - intervalNumberStr.length,
  );

  const accidentalSymbols = normalizeAccidentalString(accidentalString);
  if (accidentalSymbols === undefined) {
    return undefined;
  }

  const result = (accidentalSymbols + intervalNumberStr) as Interval;

  return intervalToIntegerMap.has(result) ? result : undefined;
}

/**
 * Parses an array of strings and returns an array of canonical `Interval`s.
 * Any invalid interval strings are filtered out from the result.
 * @param names The array of strings to parse.
 * @returns An array of canonical `Interval`s.
 */
export function normalizeIntervalStringArray(
  names: readonly string[],
): Interval[] {
  return names
    .map((name) => normalizeIntervalString(name))
    .filter((name): name is Interval => name !== undefined);
}

/**
 * Parses a string and returns a canonical `SimpleInterval` if valid.
 */
export function normalizeSimpleIntervalString(
  name: string,
): SimpleInterval | undefined {
  const normalized = normalizeIntervalString(name);
  if (normalized) {
    // A simple interval has a number <= 8
    const num = parseInt(normalized.match(INTERVAL_NUMBER_REGEX)![0], 10);
    if (num <= 8) {
      return normalized as SimpleInterval;
    }
  }
  return undefined;
}

/**
 * Parses an array of strings and returns an array of canonical `SimpleInterval`s.
 */
export function normalizeSimpleIntervalStringArray(
  names: readonly string[],
): SimpleInterval[] {
  return names
    .map((name) => normalizeSimpleIntervalString(name))
    .filter((name): name is SimpleInterval => name !== undefined);
}

/**
 * Parses a string and returns a canonical `CompoundInterval` if valid.
 */
export function normalizeCompoundIntervalString(
  name: string,
): CompoundInterval | undefined {
  const normalized = normalizeIntervalString(name);
  if (normalized) {
    // A compound interval has a number >= 9
    const num = parseInt(normalized.match(INTERVAL_NUMBER_REGEX)![0], 10);
    if (num >= 9) {
      return normalized as CompoundInterval;
    }
  }
  return undefined;
}

/**
 * Parses an array of strings and returns an array of canonical `CompoundInterval`s.
 */
export function normalizeCompoundIntervalStringArray(
  names: readonly string[],
): CompoundInterval[] {
  return names
    .map((name) => normalizeCompoundIntervalString(name))
    .filter((name): name is CompoundInterval => name !== undefined);
}

/**
 * Removes any intervals that mathematically resolve to the root note (0 modulo 12),
 * except for the unison ("1" or "♮1") itself if it is present.
 * This effectively prevents octaves ("8", "15") from overwriting the explicit unison
 * slot when mapping intervals into a strict 12-semitone chromatic scale.
 *
 * @param intervals The array of intervals to filter.
 * @returns A new array excluding higher root-equivalent intervals.
 */
export function filterOutRootLikeIntervals(
  intervals: readonly Interval[],
): Interval[] {
  const hasUnison = intervals.some(
    (i) => i === "1" || i === "♮1" || i === "𝄫2",
  );

  return intervals.filter((interval) => {
    const semitones = intervalToIntegerMap.get(interval);
    if (semitones === undefined) return true; // keep it if invalid, though shouldn't happen
    const isRootSlot = semitones % 12 === 0;

    // If it falls on the root slot, we only keep it if it IS the unison
    if (isRootSlot) {
      if (
        hasUnison &&
        interval !== "1" &&
        interval !== "♮1" &&
        interval !== "𝄫2"
      ) {
        return false;
      }
    }
    return true;
  });
}

/**
 * Sorts an array of intervals in ascending order based on their integer value.
 * This is a pure function and returns a new sorted array, leaving the original array unchanged.
 * @param intervals The array of intervals to sort.
 * @returns A new array with the sorted intervals.
 */
export function sortIntervals(intervals: readonly Interval[]): Interval[] {
  return intervals.toSorted((a, b) => {
    const intA = intervalToIntegerMap.get(a);
    const intB = intervalToIntegerMap.get(b);
    if (intA === undefined || intB === undefined) return 0;
    return intA - intB;
  });
}

/** Specifies a direction for converting between simple and compound/extension intervals. */
export type IntervalTransformation =
  | "simpleToExtension"
  | "extensionToSimple"
  | "simpleToCompound"
  | "compoundToSimple";

/** Options for grouping and preprocessing intervals before they are evaluated. */
export type TransformIntervalsOptions =
  & {
    /**
     * Transforms intervals between simple, compound, and extended forms.
     * For example, "simpleToExtension" might change "2" into "9".
     */
    intervalTransformation?: IntervalTransformation;
    /**
     * Continues to filter out octave intervals (like "8") from the results.
     * Typically useful for scales where octaves are included by default but not needed for some applications.
     */
    filterOutOctave?: boolean;
    /**
     * Will sort intervals in ascending order based on their integer value.
     * If `fillChromatic` is true, sorting is ignored as the array is fixed to the 12 semitones.
     */
    shouldSort?: boolean;
    /**
     * A fixed number of steps to rotate the array left (positive) or right (negative).
     * Rotation pushes elements from the beginning of the array to the end (left) or vice versa.
     */
    rotateLeft?: number;
  }
  & (
    | {
      /**
       * When true, generates a 12-element array representing the chromatic scale (0-11).
       * Missing semitones are filled with standard flat intervals (like "♭2").
       * Compound intervals are placed in their respective integer modulo 12 slot.
       */
      fillChromatic: true;
      /**
       * If `fillChromatic` is true, this optionally overlays intervals from a known
       * note collection (like a major scale) to provide better enharmonic spelling
       * for the "background" chromatic notes.
       */
      mostSimilarScale?: NoteCollectionKey;
      /**
       * If provided, allows for absolute rotations (like rotating to C=0).
       */
      rootNoteInteger?: number;
      /**
       * Rotates the returned array so that the note corresponding to root C (integer 0)
       * is positioned at index 0. Has no semantic effect on purely relative intervals.
       * Only applicable when fillChromatic is true and rootNoteInteger is provided.
       */
      rotateToRootInteger0?: boolean;
    }
    | {
      fillChromatic?: false;
      mostSimilarScale?: never;
      rootNoteInteger?: never;
      rotateToRootInteger0?: never;
    }
  );

/**
 * Applies a series of formatting steps to an array of intervals, such as changing compound formats,
 * filtering octaves, and sorting.
 *
 * @param intervals The initial array of intervals.
 * @param options Configuration for the desired transformations.
 * @returns A new transformed array of intervals.
 */
export function transformIntervals(
  intervals: readonly Interval[],
  options: TransformIntervalsOptions = {},
): Interval[] {
  const {
    intervalTransformation,
    filterOutOctave = false,
    shouldSort = true,
    fillChromatic = false,
    mostSimilarScale,
    rotateLeft,
  } = options;

  const intervalMap: ReadonlyMap<Interval, Interval> = (() => {
    switch (intervalTransformation) {
      case "simpleToExtension":
        return simpleToExtensionIntervalMap;
      case "extensionToSimple":
        return extensionToSimpleIntervalMap;
      case "simpleToCompound":
        return simpleToCompoundIntervalMap;
      case "compoundToSimple":
        return compoundToSimpleIntervalMap;
      default:
        return new Map();
    }
  })();

  const fundamentalIntervals = filterOutOctave
    ? filterOutOctaveIntervals(intervals)
    : intervals;

  if (fillChromatic) {
    const chromaticMap = [
      ...noteLabelCollections.intervalsFlat.labels,
    ] as Interval[];

    if (mostSimilarScale) {
      const collection = noteCollections[mostSimilarScale];
      if (collection && collection.intervals !== intervals) {
        collection.intervals.forEach((interval) => {
          const semitones = intervalToIntegerMap.get(interval);
          if (semitones !== undefined) {
            chromaticMap[semitones % 12] = interval;
          }
        });
      }
    }

    // Now overlay the provided parsed intervals
    const filteredIntervalsForOverlay = filterOutRootLikeIntervals(
      fundamentalIntervals,
    );

    filteredIntervalsForOverlay.forEach((interval) => {
      const semitones = intervalToIntegerMap.get(interval);
      if (semitones !== undefined) {
        chromaticMap[semitones % 12] = interval;
      }
    });

    let result = chromaticMap.map(
      (interval) => intervalMap.get(interval) ?? interval,
    );

    if (options.rotateToRootInteger0 && options.rootNoteInteger !== undefined) {
      result = rotateArrayLeft(result, -options.rootNoteInteger);
    }

    if (rotateLeft !== undefined) {
      result = rotateArrayLeft(result, rotateLeft);
    }

    return result;
  }

  const transformedIntervals = fundamentalIntervals.map(
    (interval) => intervalMap.get(interval) ?? interval,
  );

  let result = shouldSort
    ? sortIntervals(transformedIntervals)
    : transformedIntervals;

  if (rotateLeft !== undefined) {
    result = rotateArrayLeft(result, rotateLeft);
  }

  return result;
}

/**
 * Retrieves the base intervals associated with a given set of interval qualities.
 *
 * @param qualities An array of generic interval qualities.
 * @returns An array of corresponding base intervals.
 */
export function getIntervalsFromQualities(
  qualities: readonly IntervalQuality[],
): Interval[] {
  return qualities.flatMap((quality) => {
    const interval = intervalQualityToIntervalMap.get(quality);
    return interval ? [interval] : [];
  });
}
