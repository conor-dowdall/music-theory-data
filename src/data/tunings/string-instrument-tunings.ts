import {
  type BassGuitarTuningKey,
  bassGuitarTuningKeysByInstrument,
  bassGuitarTunings,
} from "./bass-guitar-tunings.ts";
import {
  type FolkFrettedStringTuningKey,
  folkFrettedStringTuningKeysByInstrument,
  folkFrettedStringTunings,
} from "./folk-fretted-string-tunings.ts";
import {
  type GuitarTuningKey,
  guitarTuningKeys,
  guitarTunings,
} from "./guitar-tunings.ts";
import {
  type OrchestralStringTuningKey,
  orchestralStringTuningKeysByInstrument,
  orchestralStringTunings,
} from "./orchestral-string-tunings.ts";
import type {
  StringInstrumentFamily,
  StringInstrumentKey,
  StringInstrumentTuning,
} from "../../types/string-instruments.d.ts";

/** Exact built-in string instrument tuning data keyed by tuning id. */
export const builtInStringInstrumentTunings: StringInstrumentTunings = {
  ...guitarTunings,
  ...bassGuitarTunings,
  ...folkFrettedStringTunings,
  ...orchestralStringTunings,
} as const;

/** A key for one of the built-in string instrument tunings. */
export type StringInstrumentTuningKey =
  | GuitarTuningKey
  | BassGuitarTuningKey
  | FolkFrettedStringTuningKey
  | OrchestralStringTuningKey;

/** Dictionary of all built-in string instrument tunings keyed by tuning id. */
export type StringInstrumentTunings = Record<
  StringInstrumentTuningKey,
  StringInstrumentTuning
>;

/** All built-in string instrument tunings from every supported instrument family. */
export const stringInstrumentTunings: StringInstrumentTunings =
  builtInStringInstrumentTunings;

/** Ordered keys for all built-in string instrument tunings. */
export const stringInstrumentTuningKeys: readonly StringInstrumentTuningKey[] =
  Object.keys(
    builtInStringInstrumentTunings,
  ) as readonly StringInstrumentTuningKey[];

/** Metadata for a supported string instrument. */
export interface StringInstrument {
  /** The canonical instrument label to show in app UI. */
  primaryName: string;
  /** True alternate names for search or secondary labels. */
  aliases?: readonly string[];
  /** Broad playing family, suitable for coarse filtering. */
  family: StringInstrumentFamily;
  /** The tuning key to select when an app needs an initial/default tuning. */
  defaultTuning: StringInstrumentTuningKey;
}

/** Dictionary of supported string instruments keyed by instrument id. */
export type StringInstruments = Readonly<
  Record<StringInstrumentKey, StringInstrument>
>;

/** Metadata for all supported string instruments. */
export const stringInstruments: StringInstruments = {
  guitar: {
    primaryName: "Guitar",
    family: "plucked",
    defaultTuning: "guitarStandardE",
  },
  bassGuitar: {
    primaryName: "Bass Guitar",
    aliases: ["Electric Bass"],
    family: "plucked",
    defaultTuning: "bassStandardEadg",
  },
  mandolin: {
    primaryName: "Mandolin",
    family: "plucked",
    defaultTuning: "mandolinStandardGdae",
  },
  ukulele: {
    primaryName: "Ukulele",
    family: "plucked",
    defaultTuning: "ukuleleStandardGcea",
  },
  violin: {
    primaryName: "Violin",
    family: "bowed",
    defaultTuning: "violinStandardGdae",
  },
  viola: {
    primaryName: "Viola",
    family: "bowed",
    defaultTuning: "violaStandardCgda",
  },
  cello: {
    primaryName: "Cello",
    aliases: ["Violoncello"],
    family: "bowed",
    defaultTuning: "celloStandardCgda",
  },
  doubleBass: {
    primaryName: "Double Bass",
    aliases: ["Upright Bass", "Contrabass"],
    family: "bowed",
    defaultTuning: "doubleBassStandardEadg",
  },
};

/** Ordered keys for all supported string instruments. */
export const stringInstrumentKeys: readonly StringInstrumentKey[] = Object.keys(
  stringInstruments,
) as readonly StringInstrumentKey[];

/** Tuning keys grouped by supported string instrument. */
export type StringInstrumentTuningKeysByInstrument = Readonly<
  Record<StringInstrumentKey, readonly StringInstrumentTuningKey[]>
>;

/** Built-in tuning keys grouped by supported string instrument. */
export const stringInstrumentTuningKeysByInstrument:
  StringInstrumentTuningKeysByInstrument = {
    guitar: guitarTuningKeys,
    ...bassGuitarTuningKeysByInstrument,
    ...folkFrettedStringTuningKeysByInstrument,
    ...orchestralStringTuningKeysByInstrument,
  };
