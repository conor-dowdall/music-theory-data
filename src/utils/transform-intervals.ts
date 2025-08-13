import type { Interval } from "../types/note-labels.d.ts";

/**
 * Defines the possible transformation types for an interval sequence.
 * - `spread`: Converts simple intervals (2, 4, 6) to their extended
 *   counterparts (9, 11, 13) and reorders them for typical chord voicings.
 * - `compress`: Converts extended intervals back to their simple, in-octave forms.
 */
export type IntervalTransformation = "spread" | "compress";

const spreadMap: Record<string, Interval> = {
  "2": "9",
  "♭2": "♭9",
  "♯2": "♯9",
  "4": "11",
  "♭4": "♭11",
  "♯4": "♯11",
  "6": "13",
  "♭6": "♭13",
  "♯6": "♯13",
};

const compressMap: Record<string, Interval> = {
  "9": "2",
  "♭9": "♭2",
  "♯9": "♯2",
  "11": "4",
  "♭11": "♭4",
  "♯11": "♯4",
  "13": "6",
  "♭13": "♭6",
  "♯13": "♯6",
};

/**
 * Transforms a sequence of musical intervals by either "spreading" them to
 * their extended forms (e.g., 2nd to 9th) or "compressing" them back to
 * their simple, within-octave forms.
 *
 * @param intervals - An array of `Interval` strings to transform.
 * @param transformation - The type of transformation to apply: "spread" or "compress".
 * @returns A new array of transformed `Interval` strings.
 *
 * @example
 * ```ts
 * // Spread a major scale into a 13th chord structure
 * const majorScaleIntervals: Interval[] = ["1", "2", "3", "4", "5", "6", "7", "8"];
 * const spread = transformIntervals(majorScaleIntervals, "spread");
 * // Returns: ["1", "3", "5", "7", "9", "11", "13"]
 *
 * // Compress a dominant 9th chord
 * const dominant9thIntervals: Interval[] = ["1", "3", "5", "♭7", "9"];
 * const compressed = transformIntervals(dominant9thIntervals, "compress");
 * // Returns: ["1", "3", "5", "♭7", "2"]
 * ```
 */
export function transformIntervals(
  intervals: Interval[],
  transformation: IntervalTransformation,
): Interval[] {
  if (transformation === "spread") {
    const coreTones: Interval[] = [];
    const extensions: Interval[] = [];
    const intervalsWithoutOctave = intervals.filter((i) =>
      i !== "8" && i !== "♮8"
    );

    for (const interval of intervalsWithoutOctave) {
      const intervalNumber = parseInt(interval.replace(/[^0-9]/g, ""), 10);
      if ([1, 3, 5, 7].includes(intervalNumber)) {
        coreTones.push(interval);
      } else {
        extensions.push(interval);
      }
    }

    const transformedExtensions = extensions.map((interval) => {
      const strippedInterval = interval.replace(/[♮]/g, "");
      return spreadMap[strippedInterval] || interval;
    });

    return [...coreTones, ...transformedExtensions];
  }

  if (transformation === "compress") {
    return intervals.map((interval) => {
      const strippedInterval = interval.replace(/[♮]/g, "");
      return compressMap[strippedInterval] || interval;
    });
  }

  return [...intervals];
}
