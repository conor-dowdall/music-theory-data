import {
  type NoteCollectionKey,
  noteCollections,
} from "../data/note-collections/mod.ts";
import type { ChromaticIndex } from "../data/chromatic.ts";
import {
  type Interval,
  intervalToIntegerMap,
} from "../data/labels/note-labels.ts";
import type { NoteCollection } from "../types/note-collections.ts";
import { normalizeChromaticIndex } from "./chromatic.ts";
import { getIntervalLabelDegree } from "./intervals.ts";

/** One authored position in a note collection. */
export interface NoteCollectionTone {
  /** Zero-based position in the collection's authored tone sequence. */
  readonly collectionIndex: number;
  /** Authored semitone distance from the root, preserving extensions above 11. */
  readonly semitones: number;
  /** Normalized pitch-class distance from the root. */
  readonly pitchClass: ChromaticIndex;
  /** Register displacement represented by the authored semitone value. */
  readonly octaveOffset: number;
  /** Authored interval spelling for this position. */
  readonly interval: Interval;
  /** Diatonic degree parsed from the interval spelling, when available. */
  readonly intervalDegree?: number;
  /** Index in the sequence's distinct, ascending pitch-class list. */
  readonly pitchClassIndex: number;
}

/** Canonical authored tones and their distinct pitch classes. */
export interface NoteCollectionToneSequence {
  readonly tones: readonly NoteCollectionTone[];
  readonly pitchClasses: readonly ChromaticIndex[];
  readonly hasCompoundIntervals: boolean;
}

/** An authored tone resolved from a cyclic collection position. */
export interface PositionedNoteCollectionTone extends NoteCollectionTone {
  /** The requested signed cyclic position. */
  readonly position: number;
  /** Number of complete collection cycles, also used as the octave shift. */
  readonly cycle: number;
  /** Semitone distance after applying the cycle's 12-semitone register shift. */
  readonly resolvedSemitones: number;
}

const toneSequenceCache: Map<NoteCollectionKey, NoteCollectionToneSequence> =
  new Map();

function getAlignedIntervals(collection: NoteCollection): readonly Interval[] {
  if (collection.intervals.length === collection.integers.length) {
    return collection.intervals;
  }

  const trailingInterval = collection.intervals.at(-1);
  const hasConventionalScaleOctave = collection.category === "scale" &&
    collection.intervals.length === collection.integers.length + 1 &&
    trailingInterval !== undefined &&
    getIntervalLabelDegree(trailingInterval) === 8 &&
    intervalToIntegerMap.get(trailingInterval) === 12;

  if (hasConventionalScaleOctave) {
    return collection.intervals.slice(0, -1);
  }

  throw new Error(
    `Note collection "${collection.primaryName}" has unaligned intervals and integers`,
  );
}

/**
 * Creates immutable tone metadata for a note collection. A scale's
 * conventional trailing octave interval is not an additional cyclic position
 * because scale `integers` are authored as a pitch-class sequence.
 */
export function createNoteCollectionToneSequence(
  collection: NoteCollection,
): NoteCollectionToneSequence {
  const intervals = getAlignedIntervals(collection);

  for (let index = 0; index < collection.integers.length; index += 1) {
    const interval = intervals[index];
    if (intervalToIntegerMap.get(interval) !== collection.integers[index]) {
      throw new Error(
        `Note collection "${collection.primaryName}" has mismatched interval and integer values at position ${index}`,
      );
    }
  }

  const pitchClasses = Object.freeze(
    [...new Set(collection.integers.map(normalizeChromaticIndex))].sort((
      a,
      b,
    ) => a - b),
  ) as readonly ChromaticIndex[];

  const tones = Object.freeze(collection.integers.map((semitones, index) => {
    const interval = intervals[index];
    const pitchClass = normalizeChromaticIndex(semitones);
    const intervalDegree = getIntervalLabelDegree(interval);
    const tone: NoteCollectionTone = {
      collectionIndex: index,
      semitones,
      pitchClass,
      octaveOffset: Math.floor(semitones / 12),
      interval,
      ...(intervalDegree === undefined ? {} : { intervalDegree }),
      pitchClassIndex: pitchClasses.indexOf(pitchClass),
    };
    return Object.freeze(tone);
  }));

  const sequence: NoteCollectionToneSequence = Object.freeze({
    tones,
    pitchClasses,
    hasCompoundIntervals: tones.some((tone) => (tone.intervalDegree ?? 0) >= 9),
  });
  return sequence;
}

/** Returns immutable metadata for every authored tone in a built-in collection. */
export function getNoteCollectionToneSequence(
  noteCollectionKey: NoteCollectionKey,
): NoteCollectionToneSequence {
  const cached = toneSequenceCache.get(noteCollectionKey);
  if (cached) return cached;

  const sequence = createNoteCollectionToneSequence(
    noteCollections[noteCollectionKey],
  );
  toneSequenceCache.set(noteCollectionKey, sequence);
  return sequence;
}

/**
 * Resolves a signed integer as a cyclic address over the authored collection.
 * This does not promise an ascending pitch sequence: authored compound tones
 * can overlap the next cycle's register.
 */
export function getNoteCollectionToneAtPosition(
  noteCollectionKey: NoteCollectionKey,
  position: number,
): PositionedNoteCollectionTone | undefined {
  if (!Number.isSafeInteger(position)) return undefined;

  const sequence = getNoteCollectionToneSequence(noteCollectionKey);
  const collectionSize = sequence.tones.length;
  if (collectionSize === 0) return undefined;

  const collectionIndex = ((position % collectionSize) + collectionSize) %
    collectionSize;
  const cycle = Math.floor(position / collectionSize);
  const tone = sequence.tones[collectionIndex];

  return Object.freeze({
    ...tone,
    position,
    cycle,
    resolvedSemitones: tone.semitones + cycle * 12,
  });
}
