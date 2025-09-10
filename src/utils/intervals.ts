import {
  compoundToSimpleIntervalMap,
  extensionToSimpleIntervalMap,
  type Interval,
  intervalToIntegerMap,
  simpleToCompoundIntervalMap,
  simpleToExtensionIntervalMap,
} from "../data/labels/note-labels.ts";

export function filterOutOctaveIntervals(
  intervals: readonly Interval[],
): Interval[] {
  return intervals.filter((i) => i !== "8" && i !== "♮8");
}

export function toSortedIntervals(
  intervals: readonly Interval[],
): Interval[] {
  return intervals
    .toSorted((a, b) => {
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
  sortIntervals?: boolean;
}

export function transformIntervals(
  intervals: readonly Interval[],
  options: TransformIntervalsOptions = {},
): Interval[] {
  const {
    intervalTransformation,
    filterOutOctave = false,
    sortIntervals = true,
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

  const finalIntervals = fundamentalIntervals.map((interval) =>
    intervalMap.get(interval) ?? interval
  );

  return sortIntervals ? toSortedIntervals(finalIntervals) : finalIntervals;
}
