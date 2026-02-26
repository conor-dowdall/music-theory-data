import {
  compoundToSimpleIntervalMap,
  extensionToSimpleIntervalMap,
  type Interval,
  type IntervalQuality,
  intervalQualityToIntervalMap,
  intervalToIntegerMap,
  intervalToIntervalQualityMap,
  simpleToCompoundIntervalMap,
  simpleToExtensionIntervalMap,
} from "../data/labels/note-labels.ts";
import type { NoteCollection } from "../types/note-collections.d.ts";
import {
  type NoteCollectionKey,
  noteCollections,
} from "../data/note-collections/mod.ts";
import { noteLabelCollections } from "@musodojo/music-theory-data";
import { rotateArrayLeft } from "./rotate-array.ts";

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
export type TransformIntervalsOptions = {
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
} & (
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

  const transformedIntervals = fundamentalIntervals.map(
    (interval) => intervalMap.get(interval) ?? interval,
  );

  if (fillChromatic) {
    const chromaticMap = [
      ...noteLabelCollections.intervalsFlat.labels,
    ] as Interval[];

    if (mostSimilarScale) {
      const collection = noteCollections[mostSimilarScale];
      if (collection && collection.intervals !== intervals) {
        collection.intervals.forEach((interval) => {
          const transformed = intervalMap.get(interval) ?? interval;
          const semitones = intervalToIntegerMap.get(transformed);
          if (semitones !== undefined) {
            chromaticMap[semitones % 12] = transformed;
          }
        });
      }
    }

    // Now overlay the provided parsed intervals
    transformedIntervals.forEach((interval) => {
      const semitones = intervalToIntegerMap.get(interval);
      if (semitones !== undefined) {
        chromaticMap[semitones % 12] = interval;
      }
    });

    let result = chromaticMap;

    if (options.rotateToRootInteger0 && options.rootNoteInteger !== undefined) {
      result = rotateArrayLeft(result, -options.rootNoteInteger);
    }

    if (rotateLeft !== undefined) {
      result = rotateArrayLeft(result, rotateLeft);
    }

    return result;
  }

  let result = shouldSort
    ? sortIntervals(transformedIntervals)
    : transformedIntervals;

  if (rotateLeft !== undefined) {
    result = rotateArrayLeft(result, rotateLeft);
  }

  return result;
}

/**
 * Extracts generic interval qualities (e.g., "P5", "m3" becomes "P", "m") from a list of intervals.
 *
 * @param intervals An array of specific intervals.
 * @returns An array of the corresponding interval qualities.
 */
export function getQualitiesFromIntervals(
  intervals: readonly Interval[],
): IntervalQuality[] {
  return intervals.flatMap((interval) => {
    const quality = intervalToIntervalQualityMap.get(interval);
    return quality ? [quality] : [];
  });
}

/**
 * Retrieves the base intervals associated with a given set of interval qualities.
 *
 * @param qualities An array of generic interval qualities.
 * @returns An array of corresponding base intervals.
 */
export function getIntervalsFromQualities(
  qualities: IntervalQuality[],
): Interval[] {
  return qualities.flatMap((quality) => {
    const interval = intervalQualityToIntervalMap.get(quality);
    return interval ? [interval] : [];
  });
}

/**
 * Extracts the interval qualities (e.g., "P1", "M2", "m3") from a NoteCollection.
 * @param collection The NoteCollection object.
 * @returns An array of IntervalQuality strings.
 */
export function getQualitiesFromNoteCollection(
  collection: NoteCollection,
): IntervalQuality[] {
  return getQualitiesFromIntervals(collection.intervals);
}
