import type { NoteAccidental } from "../data/labels/note-labels.ts";
import type { ChordCollectionKey } from "../data/note-collections/mod.ts";
import type {
  ChordCollectionRomanSuffix,
  LowerCaseChordCollectionRomanSuffix,
  LowerCaseRomanNumeral,
  RomanNumeral,
  UpperCaseChordCollectionRomanSuffix,
  UpperCaseRomanNumeral,
} from "./chords.ts";

/** A broad musical category for organizing built-in chord progressions in UIs. */
export type ChordProgressionCategoryKey =
  | "commonLoops"
  | "turnaroundsAndCycles"
  | "cadences"
  | "blues"
  | "jazz";

/** Display metadata for a chord-progression category. */
export interface ChordProgressionCategoryMetadata {
  /** Display name for the category. */
  readonly name: string;
  /** Short description of the progressions grouped in the category. */
  readonly description: string;
}

/** A supported accidental prefix for authored progression scale degrees. */
export type ChordProgressionDegreeAccidental = "" | NoteAccidental;

/** A diatonic scale-degree number usable as a chord root. */
export type ScaleDegreeNumber = "1" | "2" | "3" | "4" | "5" | "6" | "7";

/** A chord root degree relative to the progression tonic, e.g. "1", "♭3", or "♯4". */
export type ChordRootDegree =
  `${ChordProgressionDegreeAccidental}${ScaleDegreeNumber}`;

/** A supported accidental prefix for progression Roman symbols. */
export type ChordProgressionRomanAccidental = ChordProgressionDegreeAccidental;

/** A rendered chord suffix for progression Roman symbols. */
export type ChordProgressionRomanChordSuffix = ChordCollectionRomanSuffix;

/** A direct Roman symbol relative to the progression tonic. */
export type ChordProgressionRomanSymbol =
  | `${ChordProgressionRomanAccidental}${UpperCaseRomanNumeral}${UpperCaseChordCollectionRomanSuffix}`
  | `${ChordProgressionRomanAccidental}${LowerCaseRomanNumeral}${LowerCaseChordCollectionRomanSuffix}`;

/** A target Roman degree in a secondary-function symbol. */
export type ChordProgressionSecondaryRomanTarget =
  `${ChordProgressionRomanAccidental}${RomanNumeral}`;

type ChordProgressionSecondaryRomanSymbolForTarget<
  TTarget extends RomanNumeral,
> =
  `${ChordProgressionRomanSymbol}/${ChordProgressionRomanAccidental}${TTarget}`;

/** A secondary-function Roman symbol for analysis or display. */
export type ChordProgressionSecondaryRomanSymbol =
  | ChordProgressionSecondaryRomanSymbolForTarget<UpperCaseRomanNumeral>
  | ChordProgressionSecondaryRomanSymbolForTarget<LowerCaseRomanNumeral>;

/** A Roman symbol intended for harmonic-function analysis or display. */
export type ChordProgressionAnalysisRomanSymbol =
  | ChordProgressionRomanSymbol
  | ChordProgressionSecondaryRomanSymbol;

/** Optional harmonic-function metadata for a progression chord. */
export interface ChordProgressionChordAnalysis {
  /**
   * A Roman symbol for functional analysis when that is clearer than the
   * derived direct tonic-relative symbol.
   * e.g. "V7/vi".
   */
  readonly romanSymbol: ChordProgressionAnalysisRomanSymbol;
}

/** One authored chord event inside a chord progression template. */
export interface ChordProgressionChord {
  /**
   * The chord root interval relative to the tonic.
   * e.g. "1", "4", "5", "♭7".
   */
  readonly degree: ChordRootDegree;
  /**
   * The chord collection that supplies this event's pitch content and symbol
   * rendering.
   * e.g. "major", "minor", "dominant7", "major6", "minor6".
   */
  readonly chordCollectionKey: ChordCollectionKey;
  /**
   * Duration expressed in bars, independent of tempo.
   * May be fractional when a bar contains more than one chord.
   */
  readonly durationInBars: number;
  /**
   * Optional harmonic-function metadata for analysis or display.
   */
  readonly analysis?: ChordProgressionChordAnalysis;
}

/** A non-empty ordered sequence of authored progression chord events. */
export type ChordProgressionChords = readonly [
  ChordProgressionChord,
  ...ChordProgressionChord[],
];

/** A harmonic progression structure made from one or more ordered chord events. */
export interface ChordProgression {
  /** Ordered chord events that make up the progression. */
  readonly chords: ChordProgressionChords;
}

/** Catalog metadata associated with a reusable chord progression structure. */
export interface ChordProgressionDefinition {
  /** Human-readable catalog name. */
  readonly name: string;
  /** Optional catalog category; applications may define uncategorized entries. */
  readonly category?: ChordProgressionCategoryKey;
  /** Harmonic structure described by this catalog entry. */
  readonly progression: ChordProgression;
}

/** A group of chord progression keys that share the same total bar count. */
export interface ChordProgressionBarGroup<TKey extends string = string> {
  /** Total duration in bars shared by the grouped progressions. */
  readonly totalBars: number;
  /** Progression keys belonging to this bar-count group. */
  readonly progressionKeys: readonly TKey[];
}

/** A group of chord progression keys that share a musical category. */
export interface ChordProgressionCategoryGroup<TKey extends string = string>
  extends ChordProgressionCategoryMetadata {
  /** Category shared by the grouped progressions. */
  readonly category: ChordProgressionCategoryKey;
  /** Progression keys belonging to this category group. */
  readonly progressionKeys: readonly TKey[];
}
