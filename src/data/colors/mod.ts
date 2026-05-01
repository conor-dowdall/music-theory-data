import {
  type NoteLabelCollectionKey,
  noteLabelCollections,
  type NoteLabelGroup,
} from "../labels/note-label-collections.ts";
import type { ChromaticTuple } from "../chromatic.ts";

export type NoteColorMode = "absolute" | "relative";
export type NoteColorValue = string | null;
export type NoteColorTuple = ChromaticTuple<NoteColorValue>;

export interface NoteColorCollection {
  readonly name: string;
  readonly shortName?: string;
  readonly description: string;
  readonly mode: NoteColorMode;
  readonly labelCollectionKey?: NoteLabelCollectionKey;
  readonly colors: NoteColorTuple;

  /** @deprecated Use mode === "relative" instead. */
  readonly relative?: boolean;
}

export type Color = NoteColorValue;
export type ColorGroup = NoteColorTuple;
export type ColorCollection = NoteColorCollection;

export type DefaultNoteColorLabelCollectionKeys =
  & Readonly<Record<NoteColorMode, NoteLabelCollectionKey>>
  & Readonly<{
    absolute: "noteNamesFlat";
    relative: "intervalsFlat";
  }>;

export const defaultNoteColorLabelCollectionKeys:
  DefaultNoteColorLabelCollectionKeys = {
    absolute: "noteNamesFlat",
    relative: "intervalsFlat",
  };

export function getDefaultNoteColorLabelCollectionKey(
  mode: NoteColorMode,
): NoteLabelCollectionKey {
  return defaultNoteColorLabelCollectionKeys[mode];
}

export function getNoteColorLabelCollectionKey(
  collection: NoteColorCollection,
): NoteLabelCollectionKey {
  if (collection.labelCollectionKey) {
    return collection.labelCollectionKey;
  }

  const mode = collection.mode ??
    (collection.relative ? "relative" : "absolute");

  return getDefaultNoteColorLabelCollectionKey(mode);
}

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
    relative: false,
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
    relative: true,
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
    relative: true,
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
    relative: false,
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

export type ColorCollectionKey = keyof typeof _colorCollections;

export const colorCollections: Record<
  ColorCollectionKey,
  NoteColorCollection
> = _colorCollections;
