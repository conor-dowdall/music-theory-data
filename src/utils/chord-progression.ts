import {
  getChordProgressionChordChangeReferences,
  getChordProgressionChordNames,
  getChordProgressionChordReferencesByBar,
  getChordProgressionDirectRomanSymbols,
  getChordProgressionKeysForCategory,
  getChordProgressionKeysForTotalBars,
  getChordProgressionRomanSymbols,
  getChordProgressionSongChordReferences,
  getChordProgressionTotalDurationInBars,
  getChordProgressionUniqueChordNames,
  getChordProgressionUniqueChordReferences,
  isValidChordProgressionKey,
} from "./chord-progressions.ts";

/**
 * Curated helpers for the common progression workflow:
 * start with a progression key or progression object, then derive Roman
 * symbols, rooted chord names, chord references, duration, or catalog groups.
 */
export const chordProgression = {
  /** Returns whether a string is one of the built-in chord progression keys. */
  isValidKey: isValidChordProgressionKey,
  /** Resolves chord names for a progression in the requested root. */
  getChordNames: getChordProgressionChordNames,
  /** Resolves distinct chord names in first-seen order. */
  getUniqueChordNames: getChordProgressionUniqueChordNames,
  /** Resolves Roman symbols directly from degree and chord collection. */
  getDirectRomanSymbols: getChordProgressionDirectRomanSymbols,
  /** Resolves display Roman symbols, preferring authored analysis labels. */
  getRomanSymbols: getChordProgressionRomanSymbols,
  /** Returns one chord reference for each authored chord change. */
  getChordChangeReferences: getChordProgressionChordChangeReferences,
  /** Returns distinct chord references in first-seen order. */
  getUniqueChordReferences: getChordProgressionUniqueChordReferences,
  /** Returns duration-aware chord references grouped by bar. */
  getChordReferencesByBar: getChordProgressionChordReferencesByBar,
  /** Returns duration-aware chord references in song/practice order. */
  getSongChordReferences: getChordProgressionSongChordReferences,
  /** Returns the authored total duration in bars. */
  getTotalDurationInBars: getChordProgressionTotalDurationInBars,
  /** Returns built-in progression keys with the requested total bar count. */
  getKeysForTotalBars: getChordProgressionKeysForTotalBars,
  /** Returns built-in progression keys in the requested musical category. */
  getKeysForCategory: getChordProgressionKeysForCategory,
} as const;
