import type { MidiNoteNumber } from "./midi.d.ts";

/**
 * One or more MIDI note numbers for open strings or courses.
 *
 * The order is the instrument tuning order used throughout this package,
 * not a guarantee of ascending pitch. Re-entrant tunings, such as high-G
 * ukulele, can move down and then back up in MIDI value.
 */
export type OpenStringMidiNotes = readonly [
  MidiNoteNumber,
  ...MidiNoteNumber[],
];

/**
 * One or more MIDI note numbers for a single physical string course.
 *
 * Most instruments have one note per course. Instruments with doubled or
 * paired strings, such as mandolin, can use this to describe the individual
 * notes within each course.
 */
export type StringCourseMidiNotes = readonly [
  MidiNoteNumber,
  ...MidiNoteNumber[],
];

export type StringInstrumentKey =
  | "guitar"
  | "bassGuitar"
  | "mandolin"
  | "ukulele"
  | "violin"
  | "viola"
  | "cello"
  | "doubleBass";

export type StringInstrumentFamily = "plucked" | "bowed";

export interface StringInstrumentTuning {
  /** The instrument this tuning belongs to. */
  readonly instrument: StringInstrumentKey;
  /** The canonical label to show in app UI. */
  readonly primaryName: string;
  /**
   * Alternate tuning labels, compact spellings, and search terms.
   *
   * Prefer primaryName for visible labels. This list is intentionally broader
   * and is best suited for search, matching, and secondary metadata.
   */
  readonly names: readonly string[];
  /**
   * Display note names for the open strings/courses.
   *
   * This array uses the same index order as openMidiNotes:
   * openNoteNames[i] names openMidiNotes[i]. The order is conventional tuning
   * order, generally bass-to-treble for linear tunings. Many string UIs draw
   * the treble/high string first or on top, so a tab or fretboard view may
   * intentionally render these arrays in reverse.
   */
  readonly openNoteNames: readonly string[];
  /**
   * MIDI note numbers for the open strings/courses.
   *
   * Values are in the same instrument tuning order as openNoteNames. Do not
   * sort them for display: re-entrant tunings may not be numerically ascending.
   */
  readonly openMidiNotes: OpenStringMidiNotes;
  /**
   * Optional detail for multi-string courses.
   *
   * Most instruments can use openMidiNotes directly. Instruments such as
   * mandolin can add courseMidiNotes when doubled or paired strings matter.
   * When present, courseMidiNotes uses the same outer order as openMidiNotes.
   */
  readonly courseMidiNotes?: readonly StringCourseMidiNotes[];
}

export interface StringInstrumentGroup {
  /** The label to show for this curated instrument group in app UI. */
  readonly displayName: string;
  /** Short explanatory text for contexts that need more than a label. */
  readonly description: string;
  /** Instrument keys included in this curated group. */
  readonly instrumentKeys: readonly StringInstrumentKey[];
}
