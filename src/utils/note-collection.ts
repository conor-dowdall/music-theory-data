import {
  getRomanSeventhChordsForNoteCollectionKey,
  getRomanTriadsForNoteCollectionKey,
  getSeventhChordsForNoteCollectionKey,
  getTriadsForNoteCollectionKey,
  hasAuthoredNoteCollectionHarmony,
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

/**
 * Curated helpers for the common catalog workflow:
 * start with a note-collection key or search criteria, then inspect intervals,
 * qualities, display names, or authored modal harmony before choosing a root.
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
  /** Returns whether the collection has authored modal harmony data. */
  hasAuthoredHarmony: hasAuthoredNoteCollectionHarmony,
  /** Resolves authored triad qualities for a note collection key. */
  getTriads: getTriadsForNoteCollectionKey,
  /** Resolves authored seventh-chord qualities for a note collection key. */
  getSeventhChords: getSeventhChordsForNoteCollectionKey,
  /** Resolves authored Roman numeral triads for a note collection key. */
  getRomanTriads: getRomanTriadsForNoteCollectionKey,
  /** Resolves authored Roman numeral seventh chords for a note collection key. */
  getRomanSeventhChords: getRomanSeventhChordsForNoteCollectionKey,
} as const;
