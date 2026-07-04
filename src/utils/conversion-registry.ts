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
) => ChromaticTuple<T | undefined>;

export type ConversionInputKind = "rootAndNoteCollection";

export type ConversionOutputKind =
  | "noteNames"
  | "intervals"
  | "chordNames"
  | "romanNumerals";

export type ConversionOutputShape = "chromatic-12";

export type ConversionOutputIndexing = "absolutePitchClassC0";

export type ConversionEmptySlot = "none" | "undefined";

export type ConversionAvailabilityFunction = (
  rootNote: RootNote,
  noteCollectionKey: NoteCollectionKey,
) => boolean;

export interface ConversionRegistryEntry<T, TId extends string = string> {
  id: TId;
  name: string;
  shortName: string;
  description: string;
  example: string;
  inputKind: ConversionInputKind;
  outputKind: ConversionOutputKind;
  outputShape: ConversionOutputShape;
  outputIndexing: ConversionOutputIndexing;
  allowsEmptySlots: boolean;
  emptySlot: ConversionEmptySlot;
  isAvailable?: ConversionAvailabilityFunction;
  unavailableReason?: string;
  get: ConversionFunction<T>;
}

export interface RootAndNoteCollectionConversions {
  noteNames: ConversionRegistryEntry<NoteName, "note-names">;
  intervals: ConversionRegistryEntry<Interval, "intervals">;
  extensions: ConversionRegistryEntry<Interval, "extensions">;
  compoundIntervals: ConversionRegistryEntry<Interval, "compound-intervals">;
  triads: ConversionRegistryEntry<string, "triads">;
  seventhChords: ConversionRegistryEntry<string, "seventh-chords">;
  romanTriads: ConversionRegistryEntry<RomanTriad, "roman-triads">;
  romanSeventhChords: ConversionRegistryEntry<
    RomanSeventhChord,
    "roman-seventh-chords"
  >;
}

export interface ConversionRegistry {
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

export const conversions: ConversionRegistry = {
  rootAndNoteCollection: {
    noteNames: {
      id: "note-names",
      name: "Note Names",
      shortName: "Notes",
      description:
        "Returns 12 absolute pitch-class slots for the root and collection, indexed so C is slot 0.",
      example: "C, D♭, D, E♭, E, F, G♭, G, A♭, A, B♭, B",
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
      example: "1, ♭2, 2, ♭3, 3, 4, ♭5, 5, ♭6, 6, ♭7, 7",
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
      example: "1, ♭9, 9, ♭3, 3, 11, ♭5, 5, ♭13, 13, ♭7, 7",
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
      example: "1, ♭9, 9, ♭10, 10, 11, ♭12, 12, ♭13, 13, ♭14, 14",
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
      example: "CM, -, Dm, -, Em, FM, -, GM, -, Am, -, B°",
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
      example: "CM7, -, Dm7, -, Em7, FM7, -, G7, -, Am7, -, Bø7",
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
      example: "I, -, ii, -, iii, IV, -, V, -, vi, -, vii°",
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
      example: "IM7, -, iim7, -, iiim7, IVM7, -, V7, -, vim7, -, viiø7",
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

export const rootAndNoteCollectionConversions:
  RootAndNoteCollectionConversions = conversions.rootAndNoteCollection;

export type RootAndNoteCollectionConversionKey =
  keyof typeof rootAndNoteCollectionConversions;

export type RootAndNoteCollectionConversion =
  typeof rootAndNoteCollectionConversions[RootAndNoteCollectionConversionKey];

export function isRootAndNoteCollectionConversionAvailable(
  conversion: RootAndNoteCollectionConversion,
  rootNote: RootNote,
  noteCollectionKey: NoteCollectionKey,
): boolean {
  return conversion.isAvailable?.(rootNote, noteCollectionKey) ?? true;
}

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
