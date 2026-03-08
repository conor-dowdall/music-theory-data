import type { RootNote } from "../data/labels/note-labels.ts";
import type { NoteCollectionKey } from "../data/note-collections/mod.ts";
import type { Interval } from "../data/labels/note-labels.ts";
import type { RomanSeventhChord, RomanTriad } from "../types/chords.d.ts";
import type { NoteName } from "../data/labels/note-labels.ts";
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

/**
 * Options specifically tailored for robust Conversion Registry UI usage.
 * Requires `fillChromatic: true` and `rotateToRootInteger0: true` to ensure
 * all returned arrays are 12 elements long and uniformly anchored to C=0,
 * making them easy to align in a UI like a fretboard.
 */
export interface ConversionRegistryOptions {
  fillChromatic: true;
  rotateToRootInteger0: true;
  rotateRight?: number;
}

/**
 * A generic function signature for all registry entries.
 */
export type ConversionFunction<T> = (
  rootNote: RootNote,
  noteCollectionKey: NoteCollectionKey,
  options: ConversionRegistryOptions,
) => (T | undefined)[];

export interface ConversionRegistryEntry<T> {
  id: string;
  name: string;
  description: string;
  get: ConversionFunction<T>;
}

export const conversions = {
  rootAndNoteCollection: {
    noteNames: {
      id: "note-names",
      name: "Note Names",
      description: "Returns the specific note names (e.g., 'C', 'E♭', 'G') for the root and collection.",
      get: (root, key, opts) => getNoteNamesForRootAndNoteCollectionKey(root, key, opts),
    } as ConversionRegistryEntry<NoteName | string>,
    intervals: {
      id: "intervals",
      name: "Intervals",
      description: "Returns the relative intervals (e.g., '1', '♭3', '5') for the collection.",
      get: (root, key, opts) => getIntervalsForRootAndNoteCollectionKey(root, key, opts),
    } as ConversionRegistryEntry<Interval>,
    extensions: {
      id: "extensions",
      name: "Extensions",
      description: "Returns intervals with simple intervals converted to extensions where applicable (e.g., '2' becomes '9').",
      get: (root, key, opts) => getExtensionsForRootAndNoteCollectionKey(root, key, opts),
    } as ConversionRegistryEntry<Interval>,
    compoundIntervals: {
      id: "compound-intervals",
      name: "Compound Intervals",
      description: "Returns intervals converted to their compound equivalents (e.g., '3' becomes '10').",
      get: (root, key, opts) => getCompoundIntervalsForRootAndNoteCollectionKey(root, key, opts),
    } as ConversionRegistryEntry<Interval>,
    triads: {
      id: "triads",
      name: "Triads",
      description: "Returns the triads with prepended note names (e.g., 'Cm', 'E♭M').",
      get: (root, key, opts) => getTriadsForRootAndNoteCollectionKey(root, key, opts),
    } as ConversionRegistryEntry<string>,
    seventhChords: {
      id: "seventh-chords",
      name: "Seventh Chords",
      description: "Returns the seventh chords with prepended note names (e.g., 'Cm7', 'E♭M7').",
      get: (root, key, opts) => getSeventhChordsForRootAndNoteCollectionKey(root, key, opts),
    } as ConversionRegistryEntry<string>,
    romanTriads: {
      id: "roman-triads",
      name: "Roman Numeral Triads",
      description: "Returns the Roman numeral representation of the triads (e.g., 'i', 'III').",
      get: (root, key, opts) => getRomanTriadsForRootAndNoteCollectionKey(root, key, opts),
    } as ConversionRegistryEntry<RomanTriad>,
    romanSeventhChords: {
      id: "roman-seventh-chords",
      name: "Roman Numeral Seventh Chords",
      description: "Returns the Roman numeral representation of the seventh chords (e.g., 'i7', 'IIIM7').",
      get: (root, key, opts) => getRomanSeventhChordsForRootAndNoteCollectionKey(root, key, opts),
    } as ConversionRegistryEntry<RomanSeventhChord>,
  }
};
