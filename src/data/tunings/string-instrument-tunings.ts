import {
  bassGuitarTuningKeysByInstrument,
  bassGuitarTunings,
} from "./bass-guitar-tunings.ts";
import {
  folkFrettedStringTuningKeysByInstrument,
  folkFrettedStringTunings,
} from "./folk-fretted-string-tunings.ts";
import { guitarTuningKeys, guitarTunings } from "./guitar-tunings.ts";
import {
  orchestralStringTuningKeysByInstrument,
  orchestralStringTunings,
} from "./orchestral-string-tunings.ts";
import type {
  StringInstrumentFamily,
  StringInstrumentKey,
  StringInstrumentTuning,
} from "../../types/string-instruments.d.ts";

const _stringInstrumentTunings = {
  ...guitarTunings,
  ...bassGuitarTunings,
  ...folkFrettedStringTunings,
  ...orchestralStringTunings,
} as const;

export type StringInstrumentTuningKey = keyof typeof _stringInstrumentTunings;

export type StringInstrumentTunings = Record<
  StringInstrumentTuningKey,
  StringInstrumentTuning
>;

export const stringInstrumentTunings: StringInstrumentTunings =
  _stringInstrumentTunings;

export const stringInstrumentTuningKeys: readonly StringInstrumentTuningKey[] =
  Object.keys(
    _stringInstrumentTunings,
  ) as readonly StringInstrumentTuningKey[];

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

export type StringInstruments = Readonly<
  Record<StringInstrumentKey, StringInstrument>
>;

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

export const stringInstrumentKeys: readonly StringInstrumentKey[] = Object.keys(
  stringInstruments,
) as readonly StringInstrumentKey[];

export type StringInstrumentTuningKeysByInstrument = Readonly<
  Record<StringInstrumentKey, readonly StringInstrumentTuningKey[]>
>;

export const stringInstrumentTuningKeysByInstrument:
  StringInstrumentTuningKeysByInstrument = {
    guitar: guitarTuningKeys,
    ...bassGuitarTuningKeysByInstrument,
    ...folkFrettedStringTuningKeysByInstrument,
    ...orchestralStringTuningKeysByInstrument,
  };
