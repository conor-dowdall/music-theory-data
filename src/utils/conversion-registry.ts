import type { ChromaticTuple } from "../data/chromatic.ts";
import type {
  Interval,
  NoteName,
  RootNote,
} from "../data/labels/note-labels.ts";
import type { NoteCollectionKey } from "../data/note-collections/mod.ts";
import type { RomanSeventhChord, RomanTriad } from "../types/chords.d.ts";
import {
  getRomanSeventhChordsForRootAndNoteCollectionKey,
  getRomanTriadsForRootAndNoteCollectionKey,
  getSeventhChordsForRootAndNoteCollectionKey,
  getTriadsForRootAndNoteCollectionKey,
  hasAuthoredNoteCollectionHarmony,
} from "./chords.ts";
import { createChromaticTuple } from "./chromatic.ts";
import { getNoteNamesForRootAndNoteCollectionKey } from "./note-names.ts";
import {
  getCompoundIntervalsForRootAndNoteCollectionKey,
  getExtensionsForRootAndNoteCollectionKey,
  getIntervalsForRootAndNoteCollectionKey,
} from "./intervals.ts";

/**
 * Options specifically tailored for robust Conversion Registry UI usage.
 * Requires `fillChromatic: true` and `rotateToRootInteger0: true` to ensure
 * all returned arrays are 12 elements long and indexed by absolute pitch class
 * where C is index 0. The selected root appears at its pitch-class index.
 */
export interface ConversionRegistryOptions {
  /** Requires conversion output to include all 12 chromatic pitch-class slots. */
  fillChromatic: true;
  /** Requires conversion output to be indexed so C is slot 0. */
  rotateToRootInteger0: true;
  /** Optional additional right rotation applied after the registry's required rotation. */
  rotateRight?: number;
}

/**
 * A generic function signature for all registry entries.
 */
export type ConversionFunction<T> = (
  rootNote: RootNote,
  noteCollectionKey: NoteCollectionKey,
  options: ConversionRegistryOptions,
) => ChromaticTuple<T | undefined>;

/** Input shape supported by the conversion registry. */
export type ConversionInputKind = "rootAndNoteCollection";

/** Broad output family produced by a conversion registry entry. */
export type ConversionOutputKind =
  | "noteNames"
  | "intervals"
  | "chordNames"
  | "romanNumerals";

/** Structural shape of conversion registry output. */
export type ConversionOutputShape = "chromatic-12";

/** Indexing convention for conversion registry output. */
export type ConversionOutputIndexing = "absolutePitchClassC0";

/** Marker for how unavailable chromatic slots are represented. */
export type ConversionEmptySlot = "none" | "undefined";

/** Predicate used to decide whether a conversion is available for an input pair. */
export type ConversionAvailabilityFunction = (
  rootNote: RootNote,
  noteCollectionKey: NoteCollectionKey,
) => boolean;

/** Metadata and resolver function for one discoverable conversion. */
export interface ConversionRegistryEntry<T, TId extends string = string> {
  /** Stable machine-readable conversion id. */
  id: TId;
  /** Human-readable display name. */
  name: string;
  /** Short label suitable for compact UI. */
  shortName: string;
  /** Description of what the conversion derives. */
  description: string;
  /** Tiny sample preview suitable for menus or cards. */
  outputPreview: string;
  /** Full sample output demonstrating the returned shape. */
  sampleOutput: string;
  /** Input shape accepted by the conversion. */
  inputKind: ConversionInputKind;
  /** Broad output family produced by the conversion. */
  outputKind: ConversionOutputKind;
  /** Structural output shape produced by the conversion. */
  outputShape: ConversionOutputShape;
  /** Pitch-class indexing convention for the output. */
  outputIndexing: ConversionOutputIndexing;
  /** Whether the conversion may return empty chromatic slots. */
  allowsEmptySlots: boolean;
  /** Empty-slot representation used by the conversion. */
  emptySlot: ConversionEmptySlot;
  /** Optional predicate for conversions that only apply to some collections. */
  isAvailable?: ConversionAvailabilityFunction;
  /** Human-readable explanation shown when the conversion is unavailable. */
  unavailableReason?: string;
  /** Function that performs the conversion. */
  get: ConversionFunction<T>;
}

/** Curated conversions for APIs that start with a root note and note collection key. */
export interface RootAndNoteCollectionConversions {
  /** Converts the input pair to absolute pitch-class note names. */
  noteNames: ConversionRegistryEntry<NoteName, "note-names">;
  /** Converts the input pair to interval labels. */
  intervals: ConversionRegistryEntry<Interval, "intervals">;
  /** Converts the input pair to extension-style interval labels. */
  extensions: ConversionRegistryEntry<Interval, "extensions">;
  /** Converts the input pair to compound interval labels. */
  compoundIntervals: ConversionRegistryEntry<Interval, "compound-intervals">;
  /** Converts authored modal harmony to triad chord names. */
  triads: ConversionRegistryEntry<string, "triads">;
  /** Converts authored modal harmony to seventh-chord names. */
  seventhChords: ConversionRegistryEntry<string, "seventh-chords">;
  /** Converts authored modal harmony to Roman numeral triads. */
  romanTriads: ConversionRegistryEntry<RomanTriad, "roman-triads">;
  /** Converts authored modal harmony to Roman numeral seventh chords. */
  romanSeventhChords: ConversionRegistryEntry<
    RomanSeventhChord,
    "roman-seventh-chords"
  >;
}

/** Top-level conversion registry grouped by input shape. */
export interface ConversionRegistry {
  /** Conversions that derive data from a root note and note collection key. */
  rootAndNoteCollection: RootAndNoteCollectionConversions;
}

const authoredHarmonyUnavailableReason =
  "This note collection does not have authored modal harmony data.";

const isAuthoredHarmonyAvailable: ConversionAvailabilityFunction = (
  _rootNote,
  noteCollectionKey,
) => hasAuthoredNoteCollectionHarmony(noteCollectionKey);

const absolutePitchClassC0: ConversionOutputIndexing = "absolutePitchClassC0";

function createConversionResult<T>(
  values: readonly (T | undefined)[],
): ChromaticTuple<T | undefined> {
  return createChromaticTuple(values);
}

/** Curated conversion registry for discoverable music-theory derivations. */
export const conversions: ConversionRegistry = {
  rootAndNoteCollection: {
    noteNames: {
      id: "note-names",
      name: "Note Names",
      shortName: "Notes",
      description:
        "Returns 12 absolute pitch-class slots for the root and collection, indexed so C is slot 0.",
      outputPreview: "C, E♭, G...",
      sampleOutput: "C, D♭, D, E♭, E, F, G♭, G, A♭, A, B♭, B",
      inputKind: "rootAndNoteCollection",
      outputKind: "noteNames",
      outputShape: "chromatic-12",
      outputIndexing: absolutePitchClassC0,
      allowsEmptySlots: false,
      emptySlot: "none",
      get: (root, key, opts) =>
        createConversionResult(
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
      inputKind: "rootAndNoteCollection",
      outputKind: "intervals",
      outputShape: "chromatic-12",
      outputIndexing: absolutePitchClassC0,
      allowsEmptySlots: false,
      emptySlot: "none",
      get: (root, key, opts) =>
        createConversionResult(
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
      inputKind: "rootAndNoteCollection",
      outputKind: "intervals",
      outputShape: "chromatic-12",
      outputIndexing: absolutePitchClassC0,
      allowsEmptySlots: false,
      emptySlot: "none",
      get: (root, key, opts) =>
        createConversionResult(
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
      inputKind: "rootAndNoteCollection",
      outputKind: "intervals",
      outputShape: "chromatic-12",
      outputIndexing: absolutePitchClassC0,
      allowsEmptySlots: false,
      emptySlot: "none",
      get: (root, key, opts) =>
        createConversionResult(
          getCompoundIntervalsForRootAndNoteCollectionKey(root, key, opts),
        ),
    },
    triads: {
      id: "triads",
      name: "Triads",
      shortName: "Triads",
      description:
        "Returns 12 chromatic triad-name slots for note collections with authored modal harmony.",
      outputPreview: "CM, Dm, Em...",
      sampleOutput: "CM, -, Dm, -, Em, FM, -, GM, -, Am, -, B°",
      inputKind: "rootAndNoteCollection",
      outputKind: "chordNames",
      outputShape: "chromatic-12",
      outputIndexing: absolutePitchClassC0,
      allowsEmptySlots: true,
      emptySlot: "undefined",
      isAvailable: isAuthoredHarmonyAvailable,
      unavailableReason: authoredHarmonyUnavailableReason,
      get: (root, key, opts) =>
        createConversionResult(
          getTriadsForRootAndNoteCollectionKey(root, key, opts),
        ),
    },
    seventhChords: {
      id: "seventh-chords",
      name: "Seventh Chords",
      shortName: "Sevenths",
      description:
        "Returns 12 chromatic seventh-chord-name slots for note collections with authored modal harmony.",
      outputPreview: "CM7, Dm7, Em7...",
      sampleOutput: "CM7, -, Dm7, -, Em7, FM7, -, G7, -, Am7, -, Bø7",
      inputKind: "rootAndNoteCollection",
      outputKind: "chordNames",
      outputShape: "chromatic-12",
      outputIndexing: absolutePitchClassC0,
      allowsEmptySlots: true,
      emptySlot: "undefined",
      isAvailable: isAuthoredHarmonyAvailable,
      unavailableReason: authoredHarmonyUnavailableReason,
      get: (root, key, opts) =>
        createConversionResult(
          getSeventhChordsForRootAndNoteCollectionKey(root, key, opts),
        ),
    },
    romanTriads: {
      id: "roman-triads",
      name: "Roman Numeral Triads",
      shortName: "Roman Triads",
      description:
        "Returns 12 chromatic Roman numeral triad slots for note collections with authored modal harmony.",
      outputPreview: "I, ii, iii...",
      sampleOutput: "I, -, ii, -, iii, IV, -, V, -, vi, -, vii°",
      inputKind: "rootAndNoteCollection",
      outputKind: "romanNumerals",
      outputShape: "chromatic-12",
      outputIndexing: absolutePitchClassC0,
      allowsEmptySlots: true,
      emptySlot: "undefined",
      isAvailable: isAuthoredHarmonyAvailable,
      unavailableReason: authoredHarmonyUnavailableReason,
      get: (root, key, opts) =>
        createConversionResult(
          getRomanTriadsForRootAndNoteCollectionKey(root, key, opts),
        ),
    },
    romanSeventhChords: {
      id: "roman-seventh-chords",
      name: "Roman Numeral Seventh Chords",
      shortName: "Roman Sevenths",
      description:
        "Returns 12 chromatic Roman numeral seventh-chord slots for note collections with authored modal harmony.",
      outputPreview: "IM7, iim7, iiim7...",
      sampleOutput: "IM7, -, iim7, -, iiim7, IVM7, -, V7, -, vim7, -, viiø7",
      inputKind: "rootAndNoteCollection",
      outputKind: "romanNumerals",
      outputShape: "chromatic-12",
      outputIndexing: absolutePitchClassC0,
      allowsEmptySlots: true,
      emptySlot: "undefined",
      isAvailable: isAuthoredHarmonyAvailable,
      unavailableReason: authoredHarmonyUnavailableReason,
      get: (root, key, opts) =>
        createConversionResult(
          getRomanSeventhChordsForRootAndNoteCollectionKey(root, key, opts),
        ),
    },
  },
};

/** Convenience handle for root-and-note-collection conversions. */
export const rootAndNoteCollectionConversions:
  RootAndNoteCollectionConversions = conversions.rootAndNoteCollection;

/** Key for a root-and-note-collection conversion entry. */
export type RootAndNoteCollectionConversionKey =
  keyof typeof rootAndNoteCollectionConversions;

/** Any root-and-note-collection conversion registry entry. */
export type RootAndNoteCollectionConversion =
  typeof rootAndNoteCollectionConversions[RootAndNoteCollectionConversionKey];

/** Returns whether a root-and-note-collection conversion applies to an input pair. */
export function isRootAndNoteCollectionConversionAvailable(
  conversion: RootAndNoteCollectionConversion,
  rootNote: RootNote,
  noteCollectionKey: NoteCollectionKey,
): boolean {
  return conversion.isAvailable?.(rootNote, noteCollectionKey) ?? true;
}

/** Returns all root-and-note-collection conversions available for an input pair. */
export function getAvailableRootAndNoteCollectionConversions(
  rootNote: RootNote,
  noteCollectionKey: NoteCollectionKey,
): RootAndNoteCollectionConversion[] {
  return Object.values(rootAndNoteCollectionConversions).filter((conversion) =>
    isRootAndNoteCollectionConversionAvailable(
      conversion,
      rootNote,
      noteCollectionKey,
    )
  );
}
