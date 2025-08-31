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
  reorderByPitch?: boolean;
}

export function transformIntervals(
  intervals: readonly Interval[],
  transformation: IntervalTransformation,
  options: TransformIntervalsOptions = {},
): Interval[] {
  const {
    filterOutOctave = false,
    reorderByPitch = true,
  } = options;

  const map: Record<string, Interval | undefined> = (() => {
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

  let startIntervals = intervals;

  if (filterOutOctave) {
    startIntervals = startIntervals
      .filter(
        (i) => i !== "8" && i !== "♮8",
      );
  }

  const finalIntervals = startIntervals.map((interval) =>
    map[interval] ?? interval
  );

  if (reorderByPitch) {
    finalIntervals
      .sort((a, b) => {
        const intA = intervalToIntegerMap[a];
        const intB = intervalToIntegerMap[b];
        return intA - intB;
      });
  }

  return finalIntervals;
}
