import type {
  StringInstrumentKey,
  StringInstrumentTuning,
} from "../../types/string-instruments.ts";

/** Instrument keys covered by the bass guitar tuning catalog. */
export type BassGuitarInstrumentKey = Extract<
  StringInstrumentKey,
  "bassGuitar"
>;

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

/** Exact built-in bass guitar tuning data keyed by tuning id. */
export const builtInBassGuitarTunings = {
  bassStandardEadg,
  bassFiveStringBeadg,
} as const;

/** A key for one of the built-in bass guitar tunings. */
export type BassGuitarTuningKey = keyof typeof builtInBassGuitarTunings;

/** Dictionary of built-in bass guitar tunings keyed by tuning id. */
export type BassGuitarTunings = Record<
  BassGuitarTuningKey,
  StringInstrumentTuning
>;

/** Built-in bass guitar tunings. */
export const bassGuitarTunings: BassGuitarTunings = builtInBassGuitarTunings;

/** Ordered keys for the built-in bass guitar tunings. */
export const bassGuitarTuningKeys: readonly BassGuitarTuningKey[] = Object.keys(
  builtInBassGuitarTunings,
) as readonly BassGuitarTuningKey[];

/** Bass guitar tuning keys grouped by instrument. */
export type BassGuitarTuningKeysByInstrument = Readonly<
  Record<BassGuitarInstrumentKey, readonly BassGuitarTuningKey[]>
>;

/** Built-in bass guitar tuning keys grouped by instrument. */
export const bassGuitarTuningKeysByInstrument:
  BassGuitarTuningKeysByInstrument = {
    bassGuitar: bassGuitarTuningKeys,
  };
