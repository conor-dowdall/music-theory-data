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

export type IntervalTransformation =
  | "simpleToExtension"
  | "extensionToSimple"
  | "simpleToCompound"
  | "compoundToSimple";

export interface TransformIntervalsOptions {
  intervalTransformation?: IntervalTransformation;
  filterOutOctave?: boolean;
  shouldSort?: boolean;
}

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

export function getQualitiesFromIntervals(
  intervals: readonly Interval[],
): IntervalQuality[] {
  return intervals.flatMap((interval) => {
    const quality = intervalToIntervalQualityMap.get(interval);
    return quality ? [quality] : [];
  });
}

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
