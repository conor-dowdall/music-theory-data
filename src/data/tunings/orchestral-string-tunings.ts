import type {
  StringInstrumentKey,
  StringInstrumentTuning,
} from "../../types/string-instruments.d.ts";

export { orchestralStringsInstrumentGroup } from "./string-instrument-groups.ts";

/** Instrument keys covered by the orchestral string tuning registry. */
export type OrchestralStringInstrumentKey = Extract<
  StringInstrumentKey,
  "violin" | "viola" | "cello" | "doubleBass"
>;

const violinStandardGdae: StringInstrumentTuning = {
  instrument: "violin",
  primaryName: "Standard GDAE",
  names: ["Standard GDAE", "Violin Standard"],
  openNoteNames: ["G", "D", "A", "E"],
  openMidiNotes: [55, 62, 69, 76],
} as const;

const violaStandardCgda: StringInstrumentTuning = {
  instrument: "viola",
  primaryName: "Standard CGDA",
  names: ["Standard CGDA", "Viola Standard"],
  openNoteNames: ["C", "G", "D", "A"],
  openMidiNotes: [48, 55, 62, 69],
} as const;

const celloStandardCgda: StringInstrumentTuning = {
  instrument: "cello",
  primaryName: "Standard CGDA",
  names: ["Standard CGDA", "Cello Standard"],
  openNoteNames: ["C", "G", "D", "A"],
  openMidiNotes: [36, 43, 50, 57],
} as const;

const doubleBassStandardEadg: StringInstrumentTuning = {
  instrument: "doubleBass",
  primaryName: "Standard EADG",
  names: ["Standard EADG", "Double Bass Standard", "Upright Bass Standard"],
  openNoteNames: ["E", "A", "D", "G"],
  openMidiNotes: [28, 33, 38, 43],
} as const;

const _orchestralStringTunings = {
  violinStandardGdae,
  violaStandardCgda,
  celloStandardCgda,
  doubleBassStandardEadg,
} as const;

/** A key for one of the built-in orchestral string tunings. */
export type OrchestralStringTuningKey = keyof typeof _orchestralStringTunings;

/** Dictionary of built-in orchestral string tunings keyed by tuning id. */
export type OrchestralStringTunings = Record<
  OrchestralStringTuningKey,
  StringInstrumentTuning
>;

/** Built-in violin, viola, cello, and double bass tunings. */
export const orchestralStringTunings: OrchestralStringTunings =
  _orchestralStringTunings;

/** Orchestral string tuning keys grouped by instrument. */
export type OrchestralStringTuningKeysByInstrument = Readonly<
  Record<OrchestralStringInstrumentKey, readonly OrchestralStringTuningKey[]>
>;

/** Built-in orchestral string tuning keys grouped by instrument. */
export const orchestralStringTuningKeysByInstrument:
  OrchestralStringTuningKeysByInstrument = {
    violin: ["violinStandardGdae"],
    viola: ["violaStandardCgda"],
    cello: ["celloStandardCgda"],
    doubleBass: ["doubleBassStandardEadg"],
  };
