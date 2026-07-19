import {
  getChordProgressionChordChangeReferences,
  getChordProgressionChordNames,
  getChordProgressionChordReferencesByBar,
  getChordProgressionDirectRomanSymbols,
  getChordProgressionKeysForCategory,
  getChordProgressionKeysForTotalBars,
  getChordProgressionRomanSymbols,
  getChordProgressionRomanSymbolsByBar,
  getChordProgressionSongChordReferences,
  getChordProgressionTiming,
  getChordProgressionTotalDurationInBars,
  getChordProgressionUniqueChordNames,
  getChordProgressionUniqueChordReferences,
  isChordCollectionKey,
  isChordProgressionAnalysisRomanSymbol,
  isChordProgressionRomanSymbol,
  isChordProgressionSecondaryRomanSymbol,
  isChordRootDegree,
  isValidChordProgressionKey,
  normalizeChordRootDegree,
  parseChordProgression,
  parseChordProgressionDefinition,
  resolveChordProgression,
  validateChordProgression,
  validateChordProgressionDefinition,
} from "./chord-progressions.ts";

/**
 * Curated helpers for the common progression workflow:
 * start with a progression key or progression object, then derive Roman
 * symbols, rooted chord names, chord references, duration, or catalog groups.
 */
export const chordProgression = {
  /** Returns whether a string is one of the built-in chord progression keys. */
  isValidKey: isValidChordProgressionKey,
  /** Returns whether a runtime value is a canonical chord root degree. */
  isRootDegree: isChordRootDegree,
  /** Normalizes ASCII or Unicode accidentals in a chord root degree. */
  normalizeRootDegree: normalizeChordRootDegree,
  /** Returns whether a runtime value identifies a chord collection. */
  isChordCollectionKey,
  /** Returns whether a runtime value is a supported analysis symbol. */
  isAnalysisRomanSymbol: isChordProgressionAnalysisRomanSymbol,
  /** Returns whether a runtime value is a supported direct Roman symbol. */
  isRomanSymbol: isChordProgressionRomanSymbol,
  /** Returns whether a runtime value is a secondary-function Roman symbol. */
  isSecondaryRomanSymbol: isChordProgressionSecondaryRomanSymbol,
  /** Parses unknown persisted progression data with diagnostics. */
  parse: parseChordProgression,
  /** Parses unknown persisted catalog-definition data with diagnostics. */
  parseDefinition: parseChordProgressionDefinition,
  /** Returns diagnostics for unknown progression data. */
  validate: validateChordProgression,
  /** Returns diagnostics for unknown progression catalog-definition data. */
  validateDefinition: validateChordProgressionDefinition,
  /** Resolves authored, rooted, analyzed, and timed event data together. */
  resolve: resolveChordProgression,
  /** Compiles root-independent bar timing and source-linked segments. */
  getTiming: getChordProgressionTiming,
  /** Resolves chord names for a progression in the requested root. */
  getChordNames: getChordProgressionChordNames,
  /** Resolves distinct chord names in first-seen order. */
  getUniqueChordNames: getChordProgressionUniqueChordNames,
  /** Resolves Roman symbols directly from degree and chord collection. */
  getDirectRomanSymbols: getChordProgressionDirectRomanSymbols,
  /** Resolves display Roman symbols, preferring authored analysis labels. */
  getRomanSymbols: getChordProgressionRomanSymbols,
  /** Returns Roman symbols grouped by their exact bar positions. */
  getRomanSymbolsByBar: getChordProgressionRomanSymbolsByBar,
  /** Returns one chord reference for each authored chord change. */
  getChordChangeReferences: getChordProgressionChordChangeReferences,
  /** Returns distinct chord references in first-seen order. */
  getUniqueChordReferences: getChordProgressionUniqueChordReferences,
  /** Returns duration-aware chord references grouped by bar. */
  getChordReferencesByBar: getChordProgressionChordReferencesByBar,
  /** Returns duration-aware chord references in song/practice order. */
  getSongChordReferences: getChordProgressionSongChordReferences,
  /** Returns the normalized total duration in bars. */
  getTotalDurationInBars: getChordProgressionTotalDurationInBars,
  /** Returns built-in progression keys with the requested total bar count. */
  getKeysForTotalBars: getChordProgressionKeysForTotalBars,
  /** Returns built-in progression keys in the requested musical category. */
  getKeysForCategory: getChordProgressionKeysForCategory,
} as const;
