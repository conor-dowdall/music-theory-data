import type { ChromaticIndex } from "../data/chromatic.ts";
import type { Interval } from "../data/labels/note-labels.ts";
import type { NoteCollectionKey } from "../data/note-collections/mod.ts";

/** High-level category for a built-in note collection. */
export type CollectionCategory = "note" | "dyad" | "chord" | "scale";

/** The letter case used when rendering a roman numeral chord symbol. */
export type RomanNumeralCase = "upper" | "lower";

/** Rendering metadata for converting a chord collection into chord/roman symbols. */
export interface ChordCollectionSymbolRendering {
  /** The suffix used after a root note in a chord symbol, e.g. "m7" in "Dm7". */
  readonly chordSuffix: string;
  /** The suffix used after a roman numeral, e.g. "ø7" in "iiø7". */
  readonly romanSuffix: string;
  /** The preferred roman numeral case for this chord collection. */
  readonly numeralCase: RomanNumeralCase;
}

/** Primary construction family of a chord collection. */
export type ChordCollectionFamily =
  | "major"
  | "minor"
  | "dominant"
  | "diminished"
  | "augmented";

/** Structural class of a chord collection beyond its primary family. */
export type ChordCollectionStructure =
  | "triad"
  | "seventh"
  | "added-tone"
  | "extended";

/** Stable musical classification for filtering chord collections. */
export interface ChordCollectionClassification {
  /** Primary construction family, independent of harmonic function. */
  readonly family: ChordCollectionFamily;
  /** Chord construction based on its seventh and extension content. */
  readonly structure: ChordCollectionStructure;
}

/** Shared metadata and interval content for a note, dyad, chord, or scale collection. */
export interface NoteCollectionBase<TInteger extends number = number> {
  /**
   * The top-level musical category for this collection.
   */
  readonly category: CollectionCategory;
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
   * - For notes, dyads, and chords/arpeggios, this typically does not include the octave.
   */
  readonly intervals: readonly Interval[];
  /**
   * The set of semitone values from the root.
   * - For **scales**, this is a pitch class set (0-11) and does not include the octave.
   * - For **notes**, **dyads**, and **chords**, this can include values > 11 to represent extensions (e.g., 14 for a 9th).
   */
  readonly integers: readonly TInteger[];
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
   * - For notes, dyads, and chords/arpeggios, this is the sequence of stacked intervals (e.g., "minor second", "major second", "minor third", "major third").
   */
  readonly pattern: readonly string[];
  /**
   * A short-hand version of the pattern.
   * - For scales/modes, this is the sequence of steps (e.g., "H", "W", "A2", "m3").
   * - For notes, dyads, and chords/arpeggios, this is the sequence of stacked intervals (e.g., "m2", "M2", "m3", "M3").
   */
  readonly patternShort: readonly string[];
  /**
   * The key name (e.g., "ionian") of the parent scale from which this scale could be derived.
   * This is the scale that contains the most notes in common with this scale.
   */
  readonly mostSimilarScale: NoteCollectionKey;
}

/** A scale that can be thought of as a mode of a parent scale (e.g., Ionian, Dorian, Lydian Augmented). */
export interface ModalScaleCollection
  extends NoteCollectionBase<ChromaticIndex> {
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
}

/** A scale that is not a mode of another scale in this collection. */
export interface NonModalScaleCollection
  extends NoteCollectionBase<ChromaticIndex> {
  /** The fundamental classification of the collection. For scales, this is always "scale". */
  readonly category: "scale";
  /** Non-modal scales are not represented as rotations of a parent scale. */
  readonly rotation?: never;
}

/** A single rooted chord quality represented as intervals from its root. */
export interface ChordCollection extends NoteCollectionBase {
  /** The fundamental classification of the collection. For chords, this is always "chord". */
  readonly category: "chord";
  /**
   * `primaryName` and `names` describe the collection for browsing and search.
   * Use the chord symbol rendering helpers for canonical chord-symbol display.
   */
  readonly symbol: ChordCollectionSymbolRendering;
  /** Stable musical classification for filtering and catalog organization. */
  readonly classification: ChordCollectionClassification;
  /** Chord collections are not represented as modal rotations. */
  readonly rotation?: never;
}

/** A two-note collection represented as intervals from its root. */
export interface DyadCollection extends NoteCollectionBase<ChromaticIndex> {
  /** The fundamental classification of the collection. For dyads, this is always "dyad". */
  readonly category: "dyad";
  /** Dyad collections are not represented as modal rotations. */
  readonly rotation?: never;
}

/** A one-note collection containing only the root pitch class. */
export interface NoteOnlyCollection extends NoteCollectionBase<ChromaticIndex> {
  /** The fundamental classification of the collection. For note-only collections, this is always "note". */
  readonly category: "note";
  /** Note-only collections are not represented as modal rotations. */
  readonly rotation?: never;
}

/** Any built-in scale collection shape. */
export type ScaleCollection = ModalScaleCollection | NonModalScaleCollection;

/** Any built-in note, dyad, chord, or scale collection shape. */
export type NoteCollection =
  | ScaleCollection
  | ChordCollection
  | DyadCollection
  | NoteOnlyCollection;
