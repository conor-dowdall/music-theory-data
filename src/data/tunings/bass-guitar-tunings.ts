import type {
  StringInstrumentKey,
  StringInstrumentTuning,
} from "../../types/string-instruments.d.ts";

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

const _bassGuitarTunings = {
  bassStandardEadg,
  bassFiveStringBeadg,
} as const;

export type BassGuitarTuningKey = keyof typeof _bassGuitarTunings;

export type BassGuitarTunings = Record<
  BassGuitarTuningKey,
  StringInstrumentTuning
>;

export const bassGuitarTunings: BassGuitarTunings = _bassGuitarTunings;

export const bassGuitarTuningKeys: readonly BassGuitarTuningKey[] = Object.keys(
  _bassGuitarTunings,
) as readonly BassGuitarTuningKey[];

export type BassGuitarTuningKeysByInstrument = Readonly<
  Record<BassGuitarInstrumentKey, readonly BassGuitarTuningKey[]>
>;

export const bassGuitarTuningKeysByInstrument:
  BassGuitarTuningKeysByInstrument = {
    bassGuitar: bassGuitarTuningKeys,
  };
