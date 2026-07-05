import type { Interval, NoteAccidental } from "../data/labels/note-labels.ts";
import type { ChordCollectionKey } from "../data/note-collections/mod.ts";
import type { ChordCollectionRomanSuffix, RomanNumeral } from "./chords.d.ts";

/** A broad musical category for organizing built-in chord progressions in UIs. */
export type ChordProgressionCategoryKey =
  | "fundamentals"
  | "popular"
  | "jazz"
  | "blues";

/** Display metadata for a chord-progression category. */
export interface ChordProgressionCategoryMetadata {
  readonly name: string;
  readonly description: string;
}

/** A supported accidental prefix for authored progression scale degrees. */
export type ChordProgressionDegreeAccidental = "" | NoteAccidental;

/** A chord root degree relative to the progression tonic, e.g. "1", "♭3", or "♯4". */
export type ChordProgressionDegree = Extract<
  Interval,
  `${ChordProgressionDegreeAccidental}${number}`
>;

/** A supported accidental prefix for progression Roman symbols. */
export type ChordProgressionRomanAccidental = ChordProgressionDegreeAccidental;

/** A rendered chord suffix for progression Roman symbols. */
export type ChordProgressionRomanChordSuffix = ChordCollectionRomanSuffix;

/** A direct Roman symbol relative to the progression tonic. */
export type ChordProgressionRomanSymbol =
  `${ChordProgressionRomanAccidental}${RomanNumeral}${ChordProgressionRomanChordSuffix}`;

/** A target Roman degree in a secondary-function symbol. */
export type ChordProgressionSecondaryRomanTarget =
  `${ChordProgressionRomanAccidental}${RomanNumeral}`;

/** A secondary-function Roman symbol for analysis or display. */
export type ChordProgressionSecondaryRomanSymbol =
  `${string}/${ChordProgressionSecondaryRomanTarget}`;

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
  readonly degree: ChordProgressionDegree;
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

/** A named chord progression template made from ordered chord events. */
export interface ChordProgression {
  readonly commonName?: string;
  readonly category?: ChordProgressionCategoryKey;
  readonly chords: readonly ChordProgressionChord[];
}

/** A group of chord progression keys that share the same total bar count. */
export interface ChordProgressionBarGroup<TKey extends string = string> {
  readonly totalBars: number;
  readonly progressionKeys: readonly TKey[];
}

/** A group of chord progression keys that share a musical category. */
export interface ChordProgressionCategoryGroup<TKey extends string = string>
  extends ChordProgressionCategoryMetadata {
  readonly category: ChordProgressionCategoryKey;
  readonly progressionKeys: readonly TKey[];
}
