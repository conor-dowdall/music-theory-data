import {
  type NoteLabelCollectionKey,
  noteLabelCollections,
  type NoteLabelGroup,
} from "../labels/note-label-collections.ts";
import type { ChromaticMode, ChromaticTuple } from "../chromatic.ts";

/** Whether a note color collection uses absolute pitch classes or root-relative degrees. */
export type NoteColorMode = ChromaticMode;

/** A single note color value, or `null` when no semantic color is assigned. */
export type NoteColorValue = string | null;

/** A fixed 12-slot color tuple for absolute pitch classes or relative degrees. */
export type NoteColorTuple = ChromaticTuple<NoteColorValue>;

/** Metadata and color values for a named 12-slot note color collection. */
export interface NoteColorCollection {
  readonly name: string;
  readonly shortName?: string;
  readonly description: string;
  readonly mode: NoteColorMode;
  readonly labelCollectionKey?: NoteLabelCollectionKey;
  readonly colors: NoteColorTuple;
}

/** Backwards-compatible alias for a single note color value. */
export type Color = NoteColorValue;

/** Backwards-compatible alias for a 12-slot note color tuple. */
export type ColorGroup = NoteColorTuple;

/** Backwards-compatible alias for a note color collection. */
export type ColorCollection = NoteColorCollection;

/** Default label collection keys for absolute and relative note color modes. */
export type DefaultNoteColorLabelCollectionKeys =
  & Readonly<Record<NoteColorMode, NoteLabelCollectionKey>>
  & Readonly<{
    absolute: "noteNamesFlat";
    relative: "intervalsFlat";
  }>;

/** The default note label collection key used for each note color mode. */
export const defaultNoteColorLabelCollectionKeys:
  DefaultNoteColorLabelCollectionKeys = {
    absolute: "noteNamesFlat",
    relative: "intervalsFlat",
  };

/** Returns the default label collection key for an absolute or relative color mode. */
export function getDefaultNoteColorLabelCollectionKey(
  mode: NoteColorMode,
): NoteLabelCollectionKey {
  return defaultNoteColorLabelCollectionKeys[mode];
}

/** Returns the explicit or default label collection key for a note color collection. */
export function getNoteColorLabelCollectionKey(
  collection: NoteColorCollection,
): NoteLabelCollectionKey {
  if (collection.labelCollectionKey) {
    return collection.labelCollectionKey;
  }

  return getDefaultNoteColorLabelCollectionKey(collection.mode);
}

/** Returns the 12 labels that should be displayed with a note color collection. */
export function getNoteColorLabels(
  collection: NoteColorCollection,
): NoteLabelGroup {
  return noteLabelCollections[getNoteColorLabelCollectionKey(collection)]
    .labels;
}

const _colorCollections = {
  musoDojo: {
    name: "Muso Dojo Colors",
    shortName: "Muso Dojo",
    description: "A custom absolute chromatic palette designed by Muso Dojo.",
    mode: "absolute",
    labelCollectionKey: "noteNamesFlat",
    colors: [
      "#ED2929",
      "#9F000F",
      "#78C7C7",
      "#00008B",
      "#FF9933",
      "#EBEB19",
      "#286704",
      "#99CC33",
      "#660099",
      "#CC00FF",
      "#BF6A1F",
      "#FF9EE6",
    ],
  },
  musoDojoRoot: {
    name: "Muso Dojo Root",
    shortName: "Root",
    description:
      "Use the red color from Muso Dojo's colors on just the root note.",
    mode: "relative",
    labelCollectionKey: "intervalsFlat",
    colors: [
      "#ED2929",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
  },
  musoDojoRootAndFifth: {
    name: "Muso Dojo Root and Fifth",
    shortName: "Root and Fifth",
    description:
      "Use the red-and-green colors from Muso Dojo's colors on the root-and-fifth notes.",
    mode: "relative",
    labelCollectionKey: "intervalsFlat",
    colors: [
      "#ED2929",
      null,
      null,
      null,
      null,
      null,
      null,
      "#99CC33",
      null,
      null,
      null,
      null,
    ],
  },
  boomwhackers: {
    name: "Boomwhackers",
    shortName: "Boomwhackers",
    description: "The colors used by Boomwhackers.",
    mode: "absolute",
    labelCollectionKey: "noteNamesFlat",
    colors: [
      "#E21C48",
      "#F26622",
      "#F99D1C",
      "#FFCC33",
      "#FFF32B",
      "#BCD85F",
      "#62BC47",
      "#009C95",
      "#0071BB",
      "#5E50A1",
      "#8D5BA6",
      "#CF3E96",
    ],
  },
} as const;

/** A key for one of the built-in note color collections. */
export type ColorCollectionKey = keyof typeof _colorCollections;

/** Built-in absolute and relative note color palettes. */
export const colorCollections: Record<
  ColorCollectionKey,
  NoteColorCollection
> = _colorCollections;
