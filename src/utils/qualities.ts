import {
  type Interval,
  type IntervalQuality,
  intervalToIntervalQualityMap,
} from "../data/labels/note-labels.ts";
import type { ChromaticTuple } from "../data/chromatic.ts";
import {
  type NoteCollectionKey,
  noteCollections,
} from "../data/note-collections/mod.ts";
import type { NoteCollection } from "../types/note-collections.d.ts";
import {
  type FillChromaticTransformIntervalsOptions,
  type NoteCollectionKeyTransformOptions,
  transformIntervals,
  type TransformIntervalsOptions,
} from "./intervals.ts";
import { createChromaticTuple } from "./chromatic.ts";
import { isValidNoteCollectionKey } from "./note-collections.ts";

/** A 12-slot chromatic tuple of interval qualities. */
export type ChromaticIntervalQualityTuple = ChromaticTuple<IntervalQuality>;

function getQualityForInterval(interval: Interval): IntervalQuality {
  const quality = intervalToIntervalQualityMap.get(interval);
  if (quality === undefined) {
    throw new Error(`Unhandled interval quality for interval ${interval}.`);
  }
  return quality;
}

/**
 * Calculates an array of specific interval qualities given an array of intervals.
 * Supports filling chromatic passing notes and other transformations via options.
 *
 * @param intervals An array of specific intervals.
 * @param options Optional settings for formatting the output, such as chromatic filling.
 * @returns An array of computed interval qualities.
 */
export function getQualitiesForIntervals(
  intervals: readonly Interval[],
  options: FillChromaticTransformIntervalsOptions,
): ChromaticIntervalQualityTuple;
/** Returns only the interval qualities produced by the supplied intervals. */
export function getQualitiesForIntervals(
  intervals: readonly Interval[],
  options?: TransformIntervalsOptions,
): IntervalQuality[];
export function getQualitiesForIntervals(
  intervals: readonly Interval[],
  options: TransformIntervalsOptions = {},
): IntervalQuality[] | ChromaticIntervalQualityTuple {
  const intervalsToConvert = Object.keys(options).length > 0
    ? transformIntervals(intervals, options)
    : intervals;

  const qualities = intervalsToConvert.map(getQualityForInterval);

  return options.fillChromatic ? createChromaticTuple(qualities) : qualities;
}

/**
 * Retrieves an array of interval qualities for a standard collection key (e.g., "major", "aeolian").
 * Automatically inherits contextual hint data (like `mostSimilarScale`) from the collection.
 *
 * @param noteCollectionKey The identifier for the desired scale or chord.
 * @param options Optional settings for interval transformations or output formatting.
 * @returns An array of computed interval qualities.
 */
export function getQualitiesForNoteCollectionKey(
  noteCollectionKey: NoteCollectionKey,
  options: NoteCollectionKeyTransformOptions & { fillChromatic: true },
): ChromaticIntervalQualityTuple;
/** Returns only the interval qualities in the requested note collection. */
export function getQualitiesForNoteCollectionKey(
  noteCollectionKey: NoteCollectionKey,
  options?: NoteCollectionKeyTransformOptions,
): IntervalQuality[];
export function getQualitiesForNoteCollectionKey(
  noteCollectionKey: NoteCollectionKey,
  options: NoteCollectionKeyTransformOptions = {},
): IntervalQuality[] | ChromaticIntervalQualityTuple {
  if (!isValidNoteCollectionKey(noteCollectionKey)) return [];

  const collection = noteCollections[noteCollectionKey];
  return getQualitiesForNoteCollection(collection, options);
}

/**
 * Extracts the interval qualities (e.g., "P1", "M2", "m3") from a NoteCollection.
 * Automatically inherits contextual hint data (like `mostSimilarScale`) from the collection.
 * @param collection The NoteCollection object.
 * @param options Optional settings for interval transformations or output formatting.
 * @returns An array of IntervalQuality strings.
 */
export function getQualitiesForNoteCollection(
  collection: NoteCollection,
  options: NoteCollectionKeyTransformOptions & { fillChromatic: true },
): ChromaticIntervalQualityTuple;
/** Returns only the interval qualities in the supplied note collection. */
export function getQualitiesForNoteCollection(
  collection: NoteCollection,
  options?: NoteCollectionKeyTransformOptions,
): IntervalQuality[];
export function getQualitiesForNoteCollection(
  collection: NoteCollection,
  options: NoteCollectionKeyTransformOptions = {},
): IntervalQuality[] | ChromaticIntervalQualityTuple {
  const mostSimilarScale = collection.mostSimilarScale;

  const finalOptions: TransformIntervalsOptions =
    options.fillChromatic && mostSimilarScale
      ? ({
        ...options,
        fillChromatic: true,
        mostSimilarScale: mostSimilarScale,
      } as TransformIntervalsOptions)
      : (options as TransformIntervalsOptions);

  return getQualitiesForIntervals(collection.intervals, finalOptions);
}
