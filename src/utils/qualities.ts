import {
  type Interval,
  type IntervalQuality,
  intervalToIntervalQualityMap,
} from "../data/labels/note-labels.ts";
import {
  type NoteCollectionKey,
  noteCollections,
} from "../data/note-collections/mod.ts";
import type { NoteCollection } from "../types/note-collections.d.ts";
import {
  transformIntervals,
  type TransformIntervalsOptions,
} from "./intervals.ts";
import { isValidNoteCollectionKey } from "./note-collections.ts";

/**
 * Calculates an array of specific interval qualities given an array of intervals.
 * Supports filling chromatic passing notes and other transformations via options.
 *
 * @param intervals An array of specific intervals.
 * @param options Optional settings for formatting the output, such as chromatic filling.
 * @returns An array of computed interval qualities.
 */
export function getQualitiesFromIntervals(
  intervals: readonly Interval[],
  options: TransformIntervalsOptions = {},
): IntervalQuality[] {
  const intervalsToConvert = Object.keys(options).length > 0
    ? transformIntervals(intervals, options)
    : intervals;

  return intervalsToConvert.flatMap((interval) => {
    const quality = intervalToIntervalQualityMap.get(interval);
    return quality ? [quality] : [];
  });
}

/**
 * Retrieves an array of interval qualities for a standard collection key (e.g., "major", "aeolian").
 * Automatically inherits contextual hint data (like `mostSimilarScale`) from the collection.
 *
 * @param noteCollectionKey The identifier for the desired scale or chord.
 * @param options Optional settings for interval transformations or output formatting.
 * @returns An array of computed interval qualities.
 */
export function getQualitiesFromCollectionKey(
  noteCollectionKey: NoteCollectionKey,
  options: Omit<TransformIntervalsOptions, "mostSimilarScale"> = {},
): IntervalQuality[] {
  if (!isValidNoteCollectionKey(noteCollectionKey)) return [];

  const collection = noteCollections[noteCollectionKey];
  return getQualitiesFromNoteCollection(collection, options);
}

/**
 * Extracts the interval qualities (e.g., "P1", "M2", "m3") from a NoteCollection.
 * Automatically inherits contextual hint data (like `mostSimilarScale`) from the collection.
 * @param collection The NoteCollection object.
 * @param options Optional settings for interval transformations or output formatting.
 * @returns An array of IntervalQuality strings.
 */
export function getQualitiesFromNoteCollection(
  collection: NoteCollection,
  options: Omit<TransformIntervalsOptions, "mostSimilarScale"> = {},
): IntervalQuality[] {
  const mostSimilarScale = collection.mostSimilarScale;

  const finalOptions: TransformIntervalsOptions =
    options.fillChromatic && mostSimilarScale
      ? ({
        ...options,
        fillChromatic: true,
        mostSimilarScale: mostSimilarScale,
      } as TransformIntervalsOptions)
      : (options as TransformIntervalsOptions);

  return getQualitiesFromIntervals(collection.intervals, finalOptions);
}
