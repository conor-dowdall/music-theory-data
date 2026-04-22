import type {
  StringInstrumentKey,
  StringInstrumentTuning,
} from "../../types/string-instruments.d.ts";

export type FolkFrettedStringInstrumentKey = Extract<
  StringInstrumentKey,
  "mandolin" | "ukulele"
>;

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

const _folkFrettedStringTunings = {
  mandolinStandardGdae,
  ukuleleStandardGcea,
} as const;

export type FolkFrettedStringTuningKey = keyof typeof _folkFrettedStringTunings;

export type FolkFrettedStringTunings = Record<
  FolkFrettedStringTuningKey,
  StringInstrumentTuning
>;

export const folkFrettedStringTunings: FolkFrettedStringTunings =
  _folkFrettedStringTunings;

export const folkFrettedStringTuningKeys:
  readonly FolkFrettedStringTuningKey[] = Object.keys(
    _folkFrettedStringTunings,
  ) as readonly FolkFrettedStringTuningKey[];

export type FolkFrettedStringTuningKeysByInstrument = Readonly<
  Record<FolkFrettedStringInstrumentKey, readonly FolkFrettedStringTuningKey[]>
>;

export const folkFrettedStringTuningKeysByInstrument:
  FolkFrettedStringTuningKeysByInstrument = {
    mandolin: ["mandolinStandardGdae"],
    ukulele: ["ukuleleStandardGcea"],
  };
