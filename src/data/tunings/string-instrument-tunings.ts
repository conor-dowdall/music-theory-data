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

export {
  guitarTuningGroups,
  guitarTuningKeys,
  guitarTunings,
} from "./guitar-tunings.ts";
export type {
  GuitarTuningGroup,
  GuitarTuningGroupKey,
  GuitarTuningGroups,
  GuitarTuningKey,
  GuitarTunings,
} from "./guitar-tunings.ts";
export {
  orchestralStringsInstrumentGroup,
  orchestralStringTuningKeysByInstrument,
  orchestralStringTunings,
} from "./orchestral-string-tunings.ts";
export type {
  OrchestralStringInstrumentKey,
  OrchestralStringTuningKey,
  OrchestralStringTuningKeysByInstrument,
  OrchestralStringTunings,
} from "./orchestral-string-tunings.ts";
export type {
  OpenStringMidiNotes,
  StringCourseMidiNotes,
  StringInstrumentFamily,
  StringInstrumentGroup,
  StringInstrumentKey,
  StringInstrumentTuning,
} from "../../types/string-instruments.d.ts";

const bassStandardEadg: StringInstrumentTuning = {
  instrument: "bassGuitar",
  primaryName: "Standard EADG",
  names: ["Standard EADG", "4-String Standard", "Bass Standard"],
  openNoteNames: ["E", "A", "D", "G"],
  openMidiNotes: [28, 33, 38, 43],
} as const;

const bassFiveStringBeadg: StringInstrumentTuning = {
  instrument: "bassGuitar",
  primaryName: "5-String Standard BEADG",
  names: ["5-String Standard BEADG", "BEADG", "5-String Bass Standard"],
  openNoteNames: ["B", "E", "A", "D", "G"],
  openMidiNotes: [23, 28, 33, 38, 43],
} as const;

const mandolinStandardGdae: StringInstrumentTuning = {
  instrument: "mandolin",
  primaryName: "Standard GDAE",
  names: ["Standard GDAE", "Mandolin Standard"],
  openNoteNames: ["G", "D", "A", "E"],
  openMidiNotes: [55, 62, 69, 76],
  courseMidiNotes: [
    [55, 55],
    [62, 62],
    [69, 69],
    [76, 76],
  ],
} as const;

const ukuleleStandardGcea: StringInstrumentTuning = {
  instrument: "ukulele",
  primaryName: "Standard GCEA",
  names: ["Standard GCEA", "GCEA", "High G", "Re-entrant GCEA"],
  openNoteNames: ["G", "C", "E", "A"],
  openMidiNotes: [67, 60, 64, 69],
} as const;

const _stringInstrumentTunings = {
  ...guitarTunings,
  bassStandardEadg,
  bassFiveStringBeadg,
  mandolinStandardGdae,
  ukuleleStandardGcea,
  ...orchestralStringTunings,
} as const;

export type StringInstrumentTuningKey = keyof typeof _stringInstrumentTunings;

export type StringInstrumentTunings = Record<
  StringInstrumentTuningKey,
  StringInstrumentTuning
>;

export const stringInstrumentTunings: StringInstrumentTunings =
  _stringInstrumentTunings;

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

export type StringInstrumentTuningKeysByInstrument = Readonly<
  Record<StringInstrumentKey, readonly StringInstrumentTuningKey[]>
>;

export const stringInstrumentTuningKeysByInstrument:
  StringInstrumentTuningKeysByInstrument = {
    guitar: guitarTuningKeys,
    bassGuitar: ["bassStandardEadg", "bassFiveStringBeadg"],
    mandolin: ["mandolinStandardGdae"],
    ukulele: ["ukuleleStandardGcea"],
    ...orchestralStringTuningKeysByInstrument,
  };
