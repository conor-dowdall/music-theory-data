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
import type { NoteCollectionKey } from "../data/note-collections/mod.ts";

/**
 * Removes octave intervals (such as "8" or "♮8") from a given list of intervals.
 * Highly useful for standardizing chord definitions that conventionally ignore the octave.
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
export interface TransformIntervalsOptions {
  intervalTransformation?: IntervalTransformation;
  filterOutOctave?: boolean;
  shouldSort?: boolean;
  fillChromatic?: boolean;
  rotateToRootInteger0?: boolean;
  mostSimilarScale?: NoteCollectionKey;
}

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

  const finalIntervals = fundamentalIntervals.map(
    (interval) => intervalMap.get(interval) ?? interval,
  );

  return shouldSort ? sortIntervals(finalIntervals) : finalIntervals;
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
