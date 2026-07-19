import {
  getRomanSeventhChordsForNoteCollectionKey,
  getRomanTriadsForNoteCollectionKey,
  getSeventhChordCollectionKeysForNoteCollectionKey,
  getSeventhChordSuffixesForNoteCollectionKey,
  getTriadChordCollectionKeysForNoteCollectionKey,
  getTriadChordSuffixesForNoteCollectionKey,
  hasNoteCollectionHarmony,
} from "./chords.ts";
import {
  getCompoundIntervalsForNoteCollectionKey,
  getExtensionsForNoteCollectionKey,
  getIntervalsForNoteCollectionKey,
} from "./intervals.ts";
import {
  findNoteCollection,
  getNoteCollectionDisplayName,
  isValidNoteCollectionKey,
  searchNoteCollections,
} from "./note-collections.ts";
import { getQualitiesForNoteCollectionKey } from "./qualities.ts";
import {
  getNoteCollectionToneAtPosition,
  getNoteCollectionToneSequence,
} from "./note-collection-tones.ts";

/**
 * Curated helpers for the common catalog workflow:
 * start with a note-collection key or search criteria, then inspect intervals,
 * qualities, display names, or supported modal harmony before choosing a root.
 */
export const noteCollection = {
  /** Returns whether a string is one of the built-in note collection keys. */
  isValidKey: isValidNoteCollectionKey,
  /** Finds note collections by query, category, intervals, or type metadata. */
  search: searchNoteCollections,
  /** Finds the single best matching note collection for search criteria. */
  find: findNoteCollection,
  /** Returns a note collection's display name, falling back to the supplied key. */
  getDisplayName: getNoteCollectionDisplayName,
  /** Resolves interval labels for a note collection key. */
  getIntervals: getIntervalsForNoteCollectionKey,
  /** Resolves extension-style interval labels for a note collection key. */
  getExtensions: getExtensionsForNoteCollectionKey,
  /** Resolves compound interval labels for a note collection key. */
  getCompoundIntervals: getCompoundIntervalsForNoteCollectionKey,
  /** Resolves interval qualities for a note collection key. */
  getQualities: getQualitiesForNoteCollectionKey,
  /** Returns whether the collection belongs to a supported harmony system. */
  hasHarmony: hasNoteCollectionHarmony,
  /** Resolves canonical triad chord identities for a note collection key. */
  getTriadChordCollectionKeys: getTriadChordCollectionKeysForNoteCollectionKey,
  /** Resolves canonical seventh-chord identities for a note collection key. */
  getSeventhChordCollectionKeys:
    getSeventhChordCollectionKeysForNoteCollectionKey,
  /** Resolves rendered triad suffixes for a note collection key. */
  getTriadChordSuffixes: getTriadChordSuffixesForNoteCollectionKey,
  /** Resolves rendered seventh-chord suffixes for a note collection key. */
  getSeventhChordSuffixes: getSeventhChordSuffixesForNoteCollectionKey,
  /** Resolves Roman numeral triads for a supported harmony system. */
  getRomanTriads: getRomanTriadsForNoteCollectionKey,
  /** Resolves Roman numeral seventh chords for a supported harmony system. */
  getRomanSeventhChords: getRomanSeventhChordsForNoteCollectionKey,
  /** Returns the immutable authored tone sequence for a collection. */
  getToneSequence: getNoteCollectionToneSequence,
  /** Resolves a signed integer as a cyclic position in a collection. */
  getToneAtPosition: getNoteCollectionToneAtPosition,
} as const;
