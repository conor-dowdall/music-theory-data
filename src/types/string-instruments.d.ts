import type { MidiNoteNumber } from "./midi.d.ts";

/**
 * One or more MIDI note numbers for open strings or courses.
 *
 * Entries follow the written spelling of the tuning, such as guitar EADGBE
 * or violin GDAE. That is usually low-to-high, but it is not a promise that
 * the MIDI values are sorted. Re-entrant tunings, such as high-G ukulele,
 * can move down and then back up in pitch.
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
   * openNoteNames[i] names openMidiNotes[i]. Entries follow the written
   * spelling of the tuning, for example guitar EADGBE or DADGAD. For many
   * linear tunings that means low-to-high, but string numbering and UI layout
   * often run the other way: guitar string 1 is the high E, and many tab or
   * fretboard views draw the highest-pitched string first or on top. Those
   * views may intentionally render these arrays in reverse.
   */
  readonly openNoteNames: readonly string[];
  /**
   * MIDI note numbers for the open strings/courses.
   *
   * Values use the same index order as openNoteNames. Do not sort them for
   * display: written tuning order, string-number order, visual order, and
   * numerical pitch order are separate concerns, especially for re-entrant
   * tunings.
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
