import type { ChromaticTuple } from "../data/chromatic.ts";
import type {
  Interval,
  NoteName,
  RootNote,
} from "../data/labels/note-labels.ts";
import type { NoteCollectionKey } from "../data/note-collections/mod.ts";
import type { RomanSeventhChord, RomanTriad } from "../types/chords.ts";
import {
  getRomanSeventhChordsForRootAndNoteCollectionKey,
  getRomanTriadsForRootAndNoteCollectionKey,
  getSeventhChordNamesForRootAndNoteCollectionKey,
  getTriadChordNamesForRootAndNoteCollectionKey,
  hasNoteCollectionHarmony,
} from "./chords.ts";
import { createChromaticTuple } from "./chromatic.ts";
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

/**
 * Options for display layers that produce 12-slot chromatic UI data.
 * Requires `fillChromatic: true` and `rotateToRootInteger0: true` so every
 * returned array is indexed by absolute pitch class, where C is slot 0.
 */
export interface RootAndNoteCollectionDisplayLayerOptions {
  /** Requires output to include all 12 chromatic pitch-class slots. */
  fillChromatic: true;
  /** Requires output to be indexed so C is slot 0. */
  rotateToRootInteger0: true;
  /** Optional additional right rotation applied after the required C-indexing. */
  rotateRight?: number;
}

/** Function signature for root-and-note-collection display layers. */
export type RootAndNoteCollectionDisplayLayerFunction<T> = (
  rootNote: RootNote,
  noteCollectionKey: NoteCollectionKey,
  options: RootAndNoteCollectionDisplayLayerOptions,
) => ChromaticTuple<T | undefined>;

/** Broad output family produced by a root-and-note-collection display layer. */
export type RootAndNoteCollectionDisplayLayerOutputKind =
  | "noteNames"
  | "intervals"
  | "chordNames"
  | "romanNumerals";

/** Structural output shape produced by root-and-note-collection display layers. */
export type RootAndNoteCollectionDisplayLayerOutputShape = "chromatic-12";

/** Indexing convention for root-and-note-collection display layer output. */
export type RootAndNoteCollectionDisplayLayerOutputIndexing =
  "absolutePitchClassC0";

/** Marker for how unavailable chromatic slots are represented. */
export type RootAndNoteCollectionDisplayLayerEmptySlot = "none" | "undefined";

/** Predicate used to decide whether a display layer is available for an input pair. */
export type RootAndNoteCollectionDisplayLayerAvailabilityFunction = (
  rootNote: RootNote,
  noteCollectionKey: NoteCollectionKey,
) => boolean;

/** Metadata and resolver function for one selectable display layer. */
export interface RootAndNoteCollectionDisplayLayerEntry<
  T,
  TId extends string = string,
> {
  /** Stable machine-readable display-layer id. */
  id: TId;
  /** Human-readable display name. */
  name: string;
  /** Short label suitable for compact UI. */
  shortName: string;
  /** Description of what the display layer derives. */
  description: string;
  /** Tiny sample preview suitable for menus or cards. */
  outputPreview: string;
  /** Full sample output demonstrating the returned shape. */
  sampleOutput: string;
  /** Broad output family produced by the display layer. */
  outputKind: RootAndNoteCollectionDisplayLayerOutputKind;
  /** Structural output shape produced by the display layer. */
  outputShape: RootAndNoteCollectionDisplayLayerOutputShape;
  /** Pitch-class indexing convention for the output. */
  outputIndexing: RootAndNoteCollectionDisplayLayerOutputIndexing;
  /** Whether the display layer may return empty chromatic slots. */
  allowsEmptySlots: boolean;
  /** Empty-slot representation used by the display layer. */
  emptySlot: RootAndNoteCollectionDisplayLayerEmptySlot;
  /** Optional predicate for layers that only apply to some collections. */
  isAvailable?: RootAndNoteCollectionDisplayLayerAvailabilityFunction;
  /** Human-readable explanation shown when the layer is unavailable. */
  unavailableReason?: string;
  /** Function that resolves this display layer for a root and collection key. */
  get: RootAndNoteCollectionDisplayLayerFunction<T>;
}

/** Selectable 12-slot display layers for a root note and note collection key. */
export interface RootAndNoteCollectionDisplayLayers {
  /** Absolute pitch-class note-name labels. */
  noteNames: RootAndNoteCollectionDisplayLayerEntry<NoteName, "note-names">;
  /** Interval labels relative to the root. */
  intervals: RootAndNoteCollectionDisplayLayerEntry<Interval, "intervals">;
  /** Extension-style interval labels. */
  extensions: RootAndNoteCollectionDisplayLayerEntry<
    Interval,
    "extensions"
  >;
  /** Compound interval labels. */
  compoundIntervals: RootAndNoteCollectionDisplayLayerEntry<
    Interval,
    "compound-intervals"
  >;
  /** Rooted triad chord names for collections with supported modal harmony. */
  triads: RootAndNoteCollectionDisplayLayerEntry<string, "triads">;
  /** Rooted seventh-chord names for collections with supported modal harmony. */
  seventhChords: RootAndNoteCollectionDisplayLayerEntry<
    string,
    "seventh-chords"
  >;
  /** Roman numeral triads for collections with supported modal harmony. */
  romanTriads: RootAndNoteCollectionDisplayLayerEntry<
    RomanTriad,
    "roman-triads"
  >;
  /** Roman numeral seventh chords for collections with supported modal harmony. */
  romanSeventhChords: RootAndNoteCollectionDisplayLayerEntry<
    RomanSeventhChord,
    "roman-seventh-chords"
  >;
}

const supportedHarmonyUnavailableReason =
  "This note collection does not belong to a supported modal harmony system.";

const isSupportedHarmonyAvailable:
  RootAndNoteCollectionDisplayLayerAvailabilityFunction = (
    _rootNote,
    noteCollectionKey,
  ) => hasNoteCollectionHarmony(noteCollectionKey);

const absolutePitchClassC0: RootAndNoteCollectionDisplayLayerOutputIndexing =
  "absolutePitchClassC0";

function createDisplayLayerResult<T>(
  values: readonly (T | undefined)[],
): ChromaticTuple<T | undefined> {
  return createChromaticTuple(values);
}

/** Selectable UI display layers for root-and-note-collection workflows. */
export const rootAndNoteCollectionDisplayLayers:
  RootAndNoteCollectionDisplayLayers = {
    noteNames: {
      id: "note-names",
      name: "Note Names",
      shortName: "Notes",
      description:
        "Returns 12 absolute pitch-class slots for the root and collection, indexed so C is slot 0.",
      outputPreview: "C, E♭, G...",
      sampleOutput: "C, D♭, D, E♭, E, F, G♭, G, A♭, A, B♭, B",
      outputKind: "noteNames",
      outputShape: "chromatic-12",
      outputIndexing: absolutePitchClassC0,
      allowsEmptySlots: false,
      emptySlot: "none",
      get: (root, key, opts) =>
        createDisplayLayerResult(
          getNoteNamesForRootAndNoteCollectionKey(root, key, opts),
        ),
    },
    intervals: {
      id: "intervals",
      name: "Intervals",
      shortName: "Intervals",
      description:
        "Returns 12 absolute pitch-class slots labeled with intervals relative to the root, indexed so C is slot 0.",
      outputPreview: "1, ♭3, 5...",
      sampleOutput: "1, ♭2, 2, ♭3, 3, 4, ♭5, 5, ♭6, 6, ♭7, 7",
      outputKind: "intervals",
      outputShape: "chromatic-12",
      outputIndexing: absolutePitchClassC0,
      allowsEmptySlots: false,
      emptySlot: "none",
      get: (root, key, opts) =>
        createDisplayLayerResult(
          getIntervalsForRootAndNoteCollectionKey(root, key, opts),
        ),
    },
    extensions: {
      id: "extensions",
      name: "Extensions",
      shortName: "Extensions",
      description:
        "Returns 12 chromatic interval slots with simple intervals converted to extensions where applicable.",
      outputPreview: "1, 9, ♭13...",
      sampleOutput: "1, ♭9, 9, ♭3, 3, 11, ♭5, 5, ♭13, 13, ♭7, 7",
      outputKind: "intervals",
      outputShape: "chromatic-12",
      outputIndexing: absolutePitchClassC0,
      allowsEmptySlots: false,
      emptySlot: "none",
      get: (root, key, opts) =>
        createDisplayLayerResult(
          getExtensionsForRootAndNoteCollectionKey(root, key, opts),
        ),
    },
    compoundIntervals: {
      id: "compound-intervals",
      name: "Compound Intervals",
      shortName: "Compound",
      description:
        "Returns 12 chromatic interval slots with simple intervals converted to compound equivalents.",
      outputPreview: "1, 10, 12...",
      sampleOutput: "1, ♭9, 9, ♭10, 10, 11, ♭12, 12, ♭13, 13, ♭14, 14",
      outputKind: "intervals",
      outputShape: "chromatic-12",
      outputIndexing: absolutePitchClassC0,
      allowsEmptySlots: false,
      emptySlot: "none",
      get: (root, key, opts) =>
        createDisplayLayerResult(
          getCompoundIntervalsForRootAndNoteCollectionKey(root, key, opts),
        ),
    },
    triads: {
      id: "triads",
      name: "Triads",
      shortName: "Triads",
      description:
        "Returns 12 chromatic triad-name slots for note collections with supported modal harmony.",
      outputPreview: "CM, Dm, Em...",
      sampleOutput: "CM, -, Dm, -, Em, FM, -, GM, -, Am, -, B°",
      outputKind: "chordNames",
      outputShape: "chromatic-12",
      outputIndexing: absolutePitchClassC0,
      allowsEmptySlots: true,
      emptySlot: "undefined",
      isAvailable: isSupportedHarmonyAvailable,
      unavailableReason: supportedHarmonyUnavailableReason,
      get: (root, key, opts) =>
        createDisplayLayerResult(
          getTriadChordNamesForRootAndNoteCollectionKey(root, key, opts),
        ),
    },
    seventhChords: {
      id: "seventh-chords",
      name: "Seventh Chords",
      shortName: "Sevenths",
      description:
        "Returns 12 chromatic seventh-chord-name slots for note collections with supported modal harmony.",
      outputPreview: "CM7, Dm7, Em7...",
      sampleOutput: "CM7, -, Dm7, -, Em7, FM7, -, G7, -, Am7, -, Bø7",
      outputKind: "chordNames",
      outputShape: "chromatic-12",
      outputIndexing: absolutePitchClassC0,
      allowsEmptySlots: true,
      emptySlot: "undefined",
      isAvailable: isSupportedHarmonyAvailable,
      unavailableReason: supportedHarmonyUnavailableReason,
      get: (root, key, opts) =>
        createDisplayLayerResult(
          getSeventhChordNamesForRootAndNoteCollectionKey(root, key, opts),
        ),
    },
    romanTriads: {
      id: "roman-triads",
      name: "Roman Numeral Triads",
      shortName: "Roman Triads",
      description:
        "Returns 12 chromatic Roman numeral triad slots for note collections with supported modal harmony.",
      outputPreview: "I, ii, iii...",
      sampleOutput: "I, -, ii, -, iii, IV, -, V, -, vi, -, vii°",
      outputKind: "romanNumerals",
      outputShape: "chromatic-12",
      outputIndexing: absolutePitchClassC0,
      allowsEmptySlots: true,
      emptySlot: "undefined",
      isAvailable: isSupportedHarmonyAvailable,
      unavailableReason: supportedHarmonyUnavailableReason,
      get: (root, key, opts) =>
        createDisplayLayerResult(
          getRomanTriadsForRootAndNoteCollectionKey(root, key, opts),
        ),
    },
    romanSeventhChords: {
      id: "roman-seventh-chords",
      name: "Roman Numeral Seventh Chords",
      shortName: "Roman Sevenths",
      description:
        "Returns 12 chromatic Roman numeral seventh-chord slots for note collections with supported modal harmony.",
      outputPreview: "IM7, iim7, iiim7...",
      sampleOutput: "IM7, -, iim7, -, iiim7, IVM7, -, V7, -, vim7, -, viiø7",
      outputKind: "romanNumerals",
      outputShape: "chromatic-12",
      outputIndexing: absolutePitchClassC0,
      allowsEmptySlots: true,
      emptySlot: "undefined",
      isAvailable: isSupportedHarmonyAvailable,
      unavailableReason: supportedHarmonyUnavailableReason,
      get: (root, key, opts) =>
        createDisplayLayerResult(
          getRomanSeventhChordsForRootAndNoteCollectionKey(root, key, opts),
        ),
    },
  };

/** Key for a root-and-note-collection display layer. */
export type RootAndNoteCollectionDisplayLayerKey =
  keyof typeof rootAndNoteCollectionDisplayLayers;

/** Any root-and-note-collection display layer entry. */
export type RootAndNoteCollectionDisplayLayer =
  typeof rootAndNoteCollectionDisplayLayers[
    RootAndNoteCollectionDisplayLayerKey
  ];

/** Returns whether a root-and-note-collection display layer applies to an input pair. */
export function isRootAndNoteCollectionDisplayLayerAvailable(
  displayLayer: RootAndNoteCollectionDisplayLayer,
  rootNote: RootNote,
  noteCollectionKey: NoteCollectionKey,
): boolean {
  return displayLayer.isAvailable?.(rootNote, noteCollectionKey) ?? true;
}

/** Returns all root-and-note-collection display layers available for an input pair. */
export function getAvailableRootAndNoteCollectionDisplayLayers(
  rootNote: RootNote,
  noteCollectionKey: NoteCollectionKey,
): RootAndNoteCollectionDisplayLayer[] {
  return Object.values(rootAndNoteCollectionDisplayLayers).filter((
    displayLayer,
  ) =>
    isRootAndNoteCollectionDisplayLayerAvailable(
      displayLayer,
      rootNote,
      noteCollectionKey,
    )
  );
}

/**
 * Curated helpers for the common app workflow:
 * start with a root note and a note-collection key, then derive names,
 * intervals, harmony, identity labels, or selectable display layers.
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
  /** Resolves rooted triad chord names for supported modal harmony. */
  getTriadChordNames: getTriadChordNamesForRootAndNoteCollectionKey,
  /** Resolves rooted seventh-chord names for supported modal harmony. */
  getSeventhChordNames: getSeventhChordNamesForRootAndNoteCollectionKey,
  /** Resolves Roman numeral triads for supported modal harmony. */
  getRomanTriads: getRomanTriadsForRootAndNoteCollectionKey,
  /** Resolves Roman numeral seventh chords for supported modal harmony. */
  getRomanSeventhChords: getRomanSeventhChordsForRootAndNoteCollectionKey,
  /** UI-friendly 12-slot display layers. */
  displayLayers: rootAndNoteCollectionDisplayLayers,
  /** Returns whether a display layer applies to an input pair. */
  isDisplayLayerAvailable: isRootAndNoteCollectionDisplayLayerAvailable,
  /** Returns all display layers available for an input pair. */
  getAvailableDisplayLayers: getAvailableRootAndNoteCollectionDisplayLayers,
} as const;
