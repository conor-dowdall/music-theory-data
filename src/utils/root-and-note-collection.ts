import {
  getIdentityForRootAndNoteCollection,
  getNoteCollectionPitchClasses,
} from "./note-collections.ts";
import { getNoteNamesForRootAndNoteCollectionKey } from "./note-names.ts";
import {
  getCompoundIntervalsForRootAndNoteCollectionKey,
  getExtensionsForRootAndNoteCollectionKey,
  getIntervalsForRootAndNoteCollectionKey,
} from "./intervals.ts";
import {
  getRomanSeventhChordsForRootAndNoteCollectionKey,
  getRomanTriadsForRootAndNoteCollectionKey,
  getSeventhChordsForRootAndNoteCollectionKey,
  getTriadsForRootAndNoteCollectionKey,
} from "./chords.ts";
import { rootAndNoteCollectionConversions } from "./conversion-registry.ts";

/**
 * Curated helpers for the common app workflow:
 * start with a root note and a note-collection key, then derive names,
 * intervals, harmony, identity labels, or selectable conversion layers.
 */
export const rootAndNoteCollection = {
  /** Formats a compact display identity such as `CM`, `F♯ø7`, or `B♭ Major`. */
  getIdentity: getIdentityForRootAndNoteCollection,
  /** Resolves the absolute chromatic pitch classes in the rooted collection. */
  getPitchClasses: getNoteCollectionPitchClasses,
  /** Resolves note names for the rooted collection. */
  getNoteNames: getNoteNamesForRootAndNoteCollectionKey,
  /** Resolves interval labels for the rooted collection. */
  getIntervals: getIntervalsForRootAndNoteCollectionKey,
  /** Resolves interval labels with simple intervals converted to extensions where applicable. */
  getExtensions: getExtensionsForRootAndNoteCollectionKey,
  /** Resolves interval labels with simple intervals converted to compound equivalents. */
  getCompoundIntervals: getCompoundIntervalsForRootAndNoteCollectionKey,
  /** Resolves rooted triad chord names for collections with authored modal harmony. */
  getTriads: getTriadsForRootAndNoteCollectionKey,
  /** Resolves rooted seventh-chord names for collections with authored modal harmony. */
  getSeventhChords: getSeventhChordsForRootAndNoteCollectionKey,
  /** Resolves Roman numeral triads for collections with authored modal harmony. */
  getRomanTriads: getRomanTriadsForRootAndNoteCollectionKey,
  /** Resolves Roman numeral seventh chords for collections with authored modal harmony. */
  getRomanSeventhChords: getRomanSeventhChordsForRootAndNoteCollectionKey,
  /** UI-friendly conversion registry entries for selectable 12-slot display layers. */
  conversions: rootAndNoteCollectionConversions,
} as const;
