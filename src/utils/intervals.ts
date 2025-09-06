import {
  compoundToSimpleIntervalMap,
  extensionToSimpleIntervalMap,
  type Interval,
  intervalToIntegerMap,
  simpleToCompoundIntervalMap,
  simpleToExtensionIntervalMap,
} from "../data/labels/note-labels.ts";

export type IntervalTransformation =
  | "simpleToExtension"
  | "extensionToSimple"
  | "simpleToCompound"
  | "compoundToSimple";

export interface TransformIntervalsOptions {
  filterOutOctave?: boolean;
  sortIntervals?: boolean;
}

export function filterOutOctaveIntervals(
  intervals: readonly Interval[],
): Interval[] {
  return intervals.filter((i) => i !== "8" && i !== "♮8");
}

export function sortIntervalArray(intervals: Interval[]) {
  intervals
    .sort((a, b) => {
      const intA = intervalToIntegerMap.get(a);
      const intB = intervalToIntegerMap.get(b);
      if (intA === undefined || intB === undefined) return 0;
      return intA - intB;
    });
}

export function transformIntervals(
  intervals: readonly Interval[],
  transformation: IntervalTransformation,
  options: TransformIntervalsOptions = {},
): Interval[] {
  const {
    filterOutOctave = false,
    sortIntervals = true,
  } = options;

  const intervalMap: ReadonlyMap<Interval, Interval> = (() => {
    switch (transformation) {
      case "simpleToExtension":
        return simpleToExtensionIntervalMap;
      case "extensionToSimple":
        return extensionToSimpleIntervalMap;
      case "simpleToCompound":
        return simpleToCompoundIntervalMap;
      case "compoundToSimple":
        return compoundToSimpleIntervalMap;
    }
  })();

  const fundamentalIntervals = filterOutOctave
    ? filterOutOctaveIntervals(intervals)
    : intervals;

  const finalIntervals = fundamentalIntervals.map((interval) =>
    intervalMap.get(interval) ?? interval
  );

  if (sortIntervals) sortIntervalArray(finalIntervals);

  return finalIntervals;
}
