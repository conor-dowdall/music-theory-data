/**
 * Type definitions for musical note names and labeling systems.
 * Provides TypeScript types for consistent representation of note names
 * and their various formats.
 *
 * @example
 * ```ts
 * import type { NoteLabelTheme } from "@musodojo/music-theory-data/types";
 *
 * // Define a custom labeling theme
 * const customTheme: NoteLabelTheme = {
 *   name: "Sharp Notes Ascii Theme",
 *   shortName: "sharp ascii",
 *   isRelative: false,
 *   labels: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
 * };
 * ```
 *
 * @module
 */

/**
 * Represents a note's pitch class as an integer from 0 (C) to 11 (B).
 * This is a foundational type for many other music theory calculations.
 * @see {@link NoteName} for the string representation (e.g., "C♯").
 * @see {@link MidiNoteNumber} for the MIDI representation.
 */
export type NoteInteger = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

/**
 * Represents integers for extended musical intervals beyond the octave,
 * such as ninths, tenths, elevenths, etc.
 * The value `26` allows for a double sharp fifteenth (𝄪15).
 * @see {@link IntervalNumber}
 */
// deno-fmt-ignore
export type NoteExtensionInteger =
  | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23
  | 24 | 25 | 26;

/**
 * Represents a musical pitch alteration as an integer.
 * This provides a numerical way to represent sharps and flats.
 * - Positive values are sharps (e.g., `1` for sharp `♯`, `2` for double sharp `𝄪`).
 * - Negative values are flats (e.g., `-1` for flat `♭`, `-2` for double flat `𝄫`).
 * - Zero represents a natural note.
 * @see {@link NoteAccidental} for the string symbols.
 */
// deno-fmt-ignore
export type NoteAlterInteger =
  | -11 | -10 | -9 | -8 | -7 | -6 | -5 | -4 | -3 | -2 | -1 | -0
  | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

/** The seven standard letters of the musical alphabet. */
export type NoteLetter = "C" | "D" | "E" | "F" | "G" | "A" | "B";

/**
 * Represents musical accidentals as string symbols.
 * Includes standard sharps, flats, naturals, double sharps, and double flats.
 * An empty string can represent a natural note in some contexts.
 */
export type NoteAccidental = "" | "♮" | "𝄫" | "♯" | "♭" | "𝄪";

/**
 * Represents the fundamental quality of a musical interval.
 * - `M`: Major
 * - `m`: minor
 * - `P`: Perfect
 * - `d`: diminished
 * - `A`: Augmented
 */
export type IntervalQualityType = "M" | "m" | "P" | "d" | "A";

/**
 * A template literal type representing a full note name,
 * combining a `NoteLetter` with a `NoteAccidental`.
 * @example "C", "F♯", "G♭"
 */
export type NoteName = `${NoteLetter}${NoteAccidental}`;

/**
 * Represents the number of a musical interval, from unison (1) to a
 * fifteenth (2 octaves).
 * @see {@link NoteExtensionInteger} for intervals beyond the fifteenth.
 */
// deno-fmt-ignore
export type IntervalNumber =
  |  1 |  2 |  3 |  4 |  5 |  6 |  7
  |  8 |  9 | 10 | 11 | 12 | 13 | 14
  | 15;

/**
 * A template literal type representing a musical interval,
 * combining an `NoteAccidental` and an `IntervalNumber`.
 * @example "♭3", "♯5", "7"
 */
export type Interval = `${NoteAccidental}${IntervalNumber}`;

/**
 * A template literal type representing the quality of a musical interval,
 * combining an `IntervalQualityType` and an `IntervalNumber`.
 * @example "m3", "P5", "A4"
 */
export type IntervalQuality = `${IntervalQualityType}${IntervalNumber}`;

/**
 * Represents an array of enharmonically equivalent note names.
 * Enharmonic notes are notes that sound the same but are written differently.
 * @example ["C♯", "D♭"]
 * @see {@link NoteName}
 */
export type EnharmonicNoteNameGroup = NoteName[];

/**
 * A tuple of 12 `EnharmonicNoteNameGroup` arrays, one for each pitch class.
 * Each inner array contains all enharmonically equivalent note names for that
 * pitch class, ordered from flat to sharp.
 * @example
 * // Index 0 (C)
 * ["B♯", "C", "D𝄫"]
 * // Index 1 (C♯/D♭)
 * ["C♯", "D♭"]
 * @see {@link EnharmonicNoteNameGroup}
 */
// deno-fmt-ignore
export type EnharmonicNoteNameGroups = [
  EnharmonicNoteNameGroup, EnharmonicNoteNameGroup, EnharmonicNoteNameGroup,
  EnharmonicNoteNameGroup, EnharmonicNoteNameGroup, EnharmonicNoteNameGroup,
  EnharmonicNoteNameGroup, EnharmonicNoteNameGroup, EnharmonicNoteNameGroup,
  EnharmonicNoteNameGroup, EnharmonicNoteNameGroup, EnharmonicNoteNameGroup,
];

/**
 * Represents a group of 12 note name strings, where each string corresponds
 * to a pitch class by its array index (0-11). This is used for defining
 * the labels within a `NoteLabelTheme`.
 */
// deno-fmt-ignore
export type NoteLabelGroup = [
  string, string, string,
  string, string, string,
  string, string, string,
  string, string, string,
];

/**
 * Defines the structure for a theme of musical note labels. Themes provide
 * different ways to name the 12 pitch classes (e.g., with flats, sharps,
 * or relative solfege syllables).
 *
 * @property name - The full, human-readable name of the theme (e.g., "Flat Note Names").
 * @property shortName - A concise, often programmatic, name (e.g., "flat").
 * @property isRelative - If `true`, the labels are relative to a tonal center (e.g., solfege). If `false`, they are fixed (e.g., "C", "C♯").
 * @property labels - The set of 12 string labels for the pitch classes.
 */
export interface NoteLabelTheme {
  name: string;
  shortName: string;
  isRelative: boolean;
  labels: NoteLabelGroup;
}

/**
 * A key representing one of the available `NoteLabelTheme` definitions.
 * This provides a way to reference specific themes programmatically.
 * @see {@link NoteLabelTheme}
 */
// deno-fmt-ignore
export type NoteLabelThemeKey =
  | "flat"
  | "sharp"
  | "relative"
  | "quality"
  | "extension"
  | "fixedDoFlat"
  | "fixedDoSharp"
  | "movableDo"
  | "movableLa"
  | "triad"
  | "romanTriad"
  | "seventh"
  | "romanSeventh";

/**
 * Represents a MIDI note number, an integer from 0 to 127.
 * MIDI is a standard for digital instruments. Middle C is typically 60.
 * @see {@link NoteInteger} for the pitch class (0-11).
 * @see {@link OctaveNumber} for the octave.
 */
// deno-fmt-ignore
export type MidiNoteNumber =
  |   0 |   1 |   2 |   3 |   4 |   5 |   6 |   7 |   8 |   9
  |  10 |  11 |  12 |  13 |  14 |  15 |  16 |  17 |  18 |  19
  |  20 |  21 |  22 |  23 |  24 |  25 |  26 |  27 |  28 |  29
  |  30 |  31 |  32 |  33 |  34 |  35 |  36 |  37 |  38 |  39
  |  40 |  41 |  42 |  43 |  44 |  45 |  46 |  47 |  48 |  49
  |  50 |  51 |  52 |  53 |  54 |  55 |  56 |  57 |  58 |  59
  |  60 |  61 |  62 |  63 |  64 |  65 |  66 |  67 |  68 |  69
  |  70 |  71 |  72 |  73 |  74 |  75 |  76 |  77 |  78 |  79
  |  80 |  81 |  82 |  83 |  84 |  85 |  86 |  87 |  88 |  89
  |  90 |  91 |  92 |  93 |  94 |  95 |  96 |  97 |  98 |  99
  | 100 | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109
  | 110 | 111 | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119
  | 120 | 121 | 122 | 123 | 124 | 125 | 126 | 127;

/**
 * Represents a sequence of MIDI notes. `null` values can be used
 * to represent rests or empty steps in the sequence.
 */
export type MidiNoteSequence = (MidiNoteNumber | null)[];

/**
 * Represents the standard musical octave numbers.
 * In many systems, octave 4 is the octave of Middle C.
 * The formula `midi = (octave + 1) * 12 + noteInteger` can convert a
 * pitch-class note in a given octave to a MIDI note number.
 */
export type OctaveNumber = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
