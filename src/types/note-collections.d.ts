import type { Interval } from "../data/labels/note-labels.ts";
import type { NoteCollectionKey } from "@musodojo/music-theory-data";

export type CollectionCategory = "scale" | "chord";

interface NoteCollectionBase {
  /**
   * The primary, most common, or abbreviated name for the collection.
   * e.g., "Major" for the major scale, "M" for a major triad.
   */
  readonly primaryName: string;
  /**
   * An array of alternative names, symbols, and common abbreviations for the collection.
   * e.g., ["Major", "Ionian", "Major Scale"]
   */
  readonly names: readonly string[];
  /**
   * The intervals from the root note that constitute the collection.
   * - For scales/modes, this conventionally includes the octave ("8").
   * - For chords/arpeggios, this typically does not include the octave.
   */
  readonly intervals: readonly Interval[];
  /**
   * The set of semitone values from the root.
   * - For **scales**, this is a pitch class set (0-11) and does not include the octave.
   * - For **chords**, this can include values > 11 to represent extensions (e.g., 14 for a 9th).
   */
  readonly integers: readonly number[];
  /**
   * An array of tags used for classification and filtering.
   * e.g., ["major", "scale", "heptatonic", "diatonic mode"]
   */
  readonly type: readonly string[];
  /**
   * An array of subjective terms describing the mood, feel, or common usage of the collection.
   * e.g., ["bright", "happy", "stable", "pop music"]
   */
  readonly characteristics: readonly string[];
  /**
   * The pattern of intervals between adjacent notes.
   * - For scales/modes, this is the sequence of steps (e.g., "half", "whole", "augmented second", "minor third").
   * - For chords/arpeggios, this is the sequence of stacked intervals (e.g., "minor second", "major second", "minor third", "major third").
   */
  readonly pattern: readonly string[];
  /**
   * A short-hand version of the pattern.
   * - For scales/modes, this is the sequence of steps (e.g., "H", "W", "A2", "m3").
   * - For chords/arpeggios, this is the sequence of stacked intervals (e.g., "m2", "M2", "m3", "M3").
   */
  readonly patternShort: readonly string[];
}

/** A scale that can be thought of as a mode of a parent scale (e.g., Ionian, Dorian, Lydian Augmented). */
interface ModalScaleCollection extends NoteCollectionBase {
  /**
   * The fundamental classification of the collection. For scales, this is always "scale".
   */
  readonly category: "scale";
  /**
   * The rotation index for a parent scale is always 0.
   * The rotation index relative to a parent scale. e.g., Dorian is 1.
   */
  readonly rotation: number;
  /**
   * The key name (e.g., "ionian") of the parent scale from which this mode is a rotation of.
   */
  readonly rotatedScale: NoteCollectionKey;
  /**
   * The key name (e.g., "ionian") of the parent scale from which this scale could be derived.
   * This is the scale that contains the most notes in common with this scale.
   */
  readonly mostSimilarScale: NoteCollectionKey;
}

/** A scale that is not a mode of another scale in this collection. */
interface NonModalScaleCollection extends NoteCollectionBase {
  readonly category: "scale";
  readonly rotation?: never;
  /**
   * The scale that contains the most notes in common with this scale.
   * The scale that contains the most notes in common with this scale.
   */
  readonly mostSimilarScale: NoteCollectionKey;
}

export interface ChordCollection extends NoteCollectionBase {
  readonly category: "chord";
  readonly rotation?: never;
  /**
   * The scale that contains the most notes in common with this scale.
   */
  readonly mostSimilarScale: NoteCollectionKey;
}

export type ScaleCollection = ModalScaleCollection | NonModalScaleCollection;

export type NoteCollection = ScaleCollection | ChordCollection;
