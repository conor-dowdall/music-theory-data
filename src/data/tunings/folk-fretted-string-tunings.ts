import type {
  StringInstrumentKey,
  StringInstrumentTuning,
} from "../../types/string-instruments.ts";

/** Instrument keys covered by the folk and fretted string tuning catalog. */
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

/** Exact built-in folk and fretted string tuning data keyed by tuning id. */
export const builtInFolkFrettedStringTunings = {
  mandolinStandardGdae,
  ukuleleStandardGcea,
} as const;

/** A key for one of the built-in folk or fretted string tunings. */
export type FolkFrettedStringTuningKey =
  keyof typeof builtInFolkFrettedStringTunings;

/** Dictionary of built-in folk and fretted string tunings keyed by tuning id. */
export type FolkFrettedStringTunings = Record<
  FolkFrettedStringTuningKey,
  StringInstrumentTuning
>;

/** Built-in mandolin and ukulele tunings. */
export const folkFrettedStringTunings: FolkFrettedStringTunings =
  builtInFolkFrettedStringTunings;

/** Ordered keys for the built-in folk and fretted string tunings. */
export const folkFrettedStringTuningKeys:
  readonly FolkFrettedStringTuningKey[] = Object.keys(
    builtInFolkFrettedStringTunings,
  ) as readonly FolkFrettedStringTuningKey[];

/** Folk and fretted string tuning keys grouped by instrument. */
export interface FolkFrettedStringTuningKeysByInstrument {
  readonly mandolin: readonly Extract<
    FolkFrettedStringTuningKey,
    "mandolinStandardGdae"
  >[];
  readonly ukulele: readonly Extract<
    FolkFrettedStringTuningKey,
    "ukuleleStandardGcea"
  >[];
}

/** Built-in folk and fretted string tuning keys grouped by instrument. */
export const folkFrettedStringTuningKeysByInstrument:
  FolkFrettedStringTuningKeysByInstrument = {
    mandolin: ["mandolinStandardGdae"],
    ukulele: ["ukuleleStandardGcea"],
  };
