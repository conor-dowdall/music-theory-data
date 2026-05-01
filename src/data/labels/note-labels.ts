import type { ChromaticIndex } from "../chromatic.ts";

/** Represents the mathematical zero-indexed pitch class of a root note, where C is 0 and B is 11. */
export type RootNoteInteger = ChromaticIndex;

const _noteLetters = ["C", "D", "E", "F", "G", "A", "B"] as const;

/** An alphabetical musical note letter without any accidentals. */
export type NoteLetter = (typeof _noteLetters)[number];

/** An ordered array of the seven fundamental note letters (C through B). */
export const noteLetters: readonly NoteLetter[] = _noteLetters;

const _noteAccidentalToIntegerMap = {
  "𝄫": -2,
  "♭": -1,
  "♮": 0,
  "♯": 1,
  "𝄪": 2,
} as const;

/** Valid musical accidental symbols, including double flats and double sharps. */
export type NoteAccidental = keyof typeof _noteAccidentalToIntegerMap;

/** A mapping of an accidental symbol to its numeric semitone alteration (-2 to +2). */
export const noteAccidentalToIntegerMap: ReadonlyMap<NoteAccidental, number> =
  new Map(
    Object.entries(_noteAccidentalToIntegerMap) as [NoteAccidental, number][],
  );

const _enharmonicNoteNameGroups = [
  ["C", "C♮", "B♯", "D𝄫"],
  ["D♭", "C♯", "B𝄪"],
  ["D", "D♮", "E𝄫", "C𝄪"],
  ["E♭", "D♯", "F𝄫"],
  ["E", "E♮", "F♭", "D𝄪"],
  ["F", "F♮", "E♯", "G𝄫"],
  ["G♭", "F♯", "E𝄪"],
  ["G", "G♮", "A𝄫", "F𝄪"],
  ["A♭", "G♯"],
  ["A", "A♮", "B𝄫", "G𝄪"],
  ["B♭", "A♯", "C𝄫"],
  ["B", "B♮", "C♭", "A𝄪"],
] as const;

/** A fully qualified note name string, consisting of a note letter and optional accidentals. */
export type NoteName = (typeof _enharmonicNoteNameGroups)[number][number];

/** A two-dimensional array grouping note names that are enharmonically equivalent (e.g., C♯ and D♭). */
export const enharmonicNoteNameGroups: readonly (readonly NoteName[])[] =
  _enharmonicNoteNameGroups;

/** A flat list of every possible valid note name. */
export const noteNames: readonly NoteName[] = enharmonicNoteNameGroups.flat();

/** A Set of every possible valid note name, optimized for quick existence checks. */
export const noteNamesSet: ReadonlySet<NoteName> = new Set(noteNames);

/** A mapping from a fully qualified note name string to its underlying 0-11 integer representation. */
export const noteNameToIntegerMap: ReadonlyMap<NoteName, RootNoteInteger> =
  (() => {
    const map = new Map<NoteName, RootNoteInteger>();
    _enharmonicNoteNameGroups.forEach((group, index) => {
      group.forEach((note) => {
        map.set(note, index as RootNoteInteger);
      });
    });
    return map;
  })();

const _enharmonicRootNoteGroups = [
  ["C", "B♯"],
  ["D♭", "C♯"],
  ["D"],
  ["E♭", "D♯"],
  ["E", "F♭"],
  ["F", "E♯"],
  ["G♭", "F♯"],
  ["G"],
  ["A♭", "G♯"],
  ["A"],
  ["B♭", "A♯"],
  ["B", "C♭"],
] as const;

/** A restricted subset of note names that are practically viable to be used as musical root notes. */
export type RootNote = (typeof _enharmonicRootNoteGroups)[number][number];

/** A two-dimensional array grouping viable root notes by their enharmonic equivalence. */
export const enharmonicRootNoteGroups: readonly (readonly RootNote[])[] =
  _enharmonicRootNoteGroups;

/** A flat list of every viable root note. */
export const rootNotes: readonly RootNote[] = enharmonicRootNoteGroups.flat();

/** A Set of every viable root note, optimized for quick existence checks. */
export const rootNotesSet: ReadonlySet<RootNote> = new Set(rootNotes);

/** A mapping from a viable root note string to its underlying 0-11 integer representation. */
export const rootNoteToIntegerMap: ReadonlyMap<RootNote, RootNoteInteger> =
  (() => {
    const map = new Map<RootNote, RootNoteInteger>();
    enharmonicRootNoteGroups.forEach((group, index) => {
      group.forEach((note) => {
        map.set(note, index as RootNoteInteger);
      });
    });
    return map;
  })();

/** A numeric string representing the numerical span of a simple interval (e.g. "3", "7"). */
export type SimpleIntervalNumber =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8";

const _simpleIntervalToIntegerMap = {
  "𝄫1": -2,
  "♭1": -1,
  "♮1": 0,
  "1": 0,
  "♯1": 1,
  "𝄪1": 2,

  "𝄫2": 0,
  "♭2": 1,
  "♮2": 2,
  "2": 2,
  "♯2": 3,
  "𝄪2": 4,

  "𝄫3": 2,
  "♭3": 3,
  "♮3": 4,
  "3": 4,
  "♯3": 5,
  "𝄪3": 6,

  "𝄫4": 3,
  "♭4": 4,
  "♮4": 5,
  "4": 5,
  "♯4": 6,
  "𝄪4": 7,

  "𝄫5": 5,
  "♭5": 6,
  "♮5": 7,
  "5": 7,
  "♯5": 8,
  "𝄪5": 9,

  "𝄫6": 7,
  "♭6": 8,
  "♮6": 9,
  "6": 9,
  "♯6": 10,
  "𝄪6": 11,

  "𝄫7": 9,
  "♭7": 10,
  "♮7": 11,
  "7": 11,
  "♯7": 12,
  "𝄪7": 13,

  "𝄫8": 10,
  "♭8": 11,
  "♮8": 12,
  "8": 12,
  "♯8": 13,
  "𝄪8": 14,
} as const;

/** A fully qualified simple (single octave) interval string, including an optional accidental symbol (e.g., "M3", "b7"). */
export type SimpleInterval = keyof typeof _simpleIntervalToIntegerMap;

/** A numeric string representing the numerical span of a compound interval (e.g. "9", "13"). */
export type CompoundIntervalNumber =
  | "9"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14"
  | "15";

const _compoundIntervalToIntegerMap = {
  "𝄫9": 12,
  "♭9": 13,
  "♮9": 14,
  "9": 14,
  "♯9": 15,
  "𝄪9": 16,

  "𝄫10": 14,
  "♭10": 15,
  "♮10": 16,
  "10": 16,
  "♯10": 17,
  "𝄪10": 18,

  "𝄫11": 15,
  "♭11": 16,
  "♮11": 17,
  "11": 17,
  "♯11": 18,
  "𝄪11": 19,

  "𝄫12": 17,
  "♭12": 18,
  "♮12": 19,
  "12": 19,
  "♯12": 20,
  "𝄪12": 21,

  "𝄫13": 19,
  "♭13": 20,
  "♮13": 21,
  "13": 21,
  "♯13": 22,
  "𝄪13": 23,

  "𝄫14": 21,
  "♭14": 22,
  "♮14": 23,
  "14": 23,
  "♯14": 24,
  "𝄪14": 25,

  "𝄫15": 22,
  "♭15": 23,
  "♮15": 24,
  "15": 24,
  "♯15": 25,
  "𝄪15": 26,
} as const;

/** A fully qualified compound (multi-octave) interval string (e.g., "b9", "#11"). */
export type CompoundInterval = keyof typeof _compoundIntervalToIntegerMap;

/** An interval number ignoring any quality or accidentals, and can be simple or compound. */
export type IntervalNumber = SimpleIntervalNumber | CompoundIntervalNumber;

const _intervalToIntegerMap = {
  ..._simpleIntervalToIntegerMap,
  ..._compoundIntervalToIntegerMap,
} as const;

/** A fully qualified simple or compound interval string. */
export type Interval = keyof typeof _intervalToIntegerMap;

/** A mapping to convert any Interval string into its integer semitone offset. */
export const intervalToIntegerMap: ReadonlyMap<Interval, number> = new Map(
  Object.entries(_intervalToIntegerMap) as [Interval, number][],
);

const _simpleToExtensionIntervalMap = {
  "2": "9",
  "♮2": "♮9",
  "♭2": "♭9",
  "♯2": "♯9",
  "4": "11",
  "♮4": "♮11",
  "♭4": "♭11",
  "♯4": "♯11",
  "6": "13",
  "♮6": "♮13",
  "♭6": "♭13",
  "♯6": "♯13",
} as const;

/** A mapping converting applicable simple intervals into equivalent extended intervals (e.g., "2" -> "9"). */
export const simpleToExtensionIntervalMap: ReadonlyMap<
  SimpleInterval,
  CompoundInterval
> = new Map(
  Object.entries(_simpleToExtensionIntervalMap) as [
    SimpleInterval,
    CompoundInterval,
  ][],
);

const _extensionToSimpleIntervalMap = {
  "9": "2",
  "♮9": "♮2",
  "♭9": "♭2",
  "♯9": "♯2",
  "11": "4",
  "♮11": "♮4",
  "♭11": "♭4",
  "♯11": "♯4",
  "13": "6",
  "♮13": "♮6",
  "♭13": "♭6",
  "♯13": "♯6",
} as const;

/** A mapping converting applicable extended intervals back out into simple intervals (e.g., "9" -> "2"). */
export const extensionToSimpleIntervalMap: ReadonlyMap<
  CompoundInterval,
  SimpleInterval
> = new Map(
  Object.entries(_extensionToSimpleIntervalMap) as [
    CompoundInterval,
    SimpleInterval,
  ][],
);

const _simpleToCompoundIntervalMap = {
  "2": "9",
  "♮2": "♮9",
  "♭2": "♭9",
  "♯2": "♯9",
  "3": "10",
  "♮3": "♮10",
  "♭3": "♭10",
  "♯3": "♯10",
  "4": "11",
  "♮4": "♮11",
  "♭4": "♭11",
  "♯4": "♯11",
  "5": "12",
  "♮5": "♮12",
  "♭5": "♭12",
  "♯5": "♯12",
  "6": "13",
  "♮6": "♮13",
  "♭6": "♭13",
  "♯6": "♯13",
  "7": "14",
  "♮7": "♮14",
  "♭7": "♭14",
  "♯7": "♯14",
} as const;

/** A rigorous mapping converting *all* simple intervals into compound intervals via adding a pure octave. */
export const simpleToCompoundIntervalMap: ReadonlyMap<
  SimpleInterval,
  CompoundInterval
> = new Map(
  Object.entries(_simpleToCompoundIntervalMap) as [
    SimpleInterval,
    CompoundInterval,
  ][],
);

const _compoundToSimpleIntervalMap = {
  "9": "2",
  "♮9": "♮2",
  "♭9": "♭2",
  "♯9": "♯2",
  "10": "3",
  "♮10": "♮3",
  "♭10": "♭3",
  "♯10": "♯3",
  "11": "4",
  "♮11": "♮4",
  "♭11": "♭4",
  "♯11": "♯4",
  "12": "5",
  "♮12": "♮5",
  "♭12": "♭5",
  "♯12": "♯5",
  "13": "6",
  "♮13": "♮6",
  "♭13": "♭6",
  "♯13": "♯6",
  "14": "7",
  "♮14": "♮7",
  "♭14": "♭7",
  "♯14": "♯7",
} as const;

/** A rigorous mapping converting *all* compound intervals into simple intervals via subtracting a pure octave. */
export const compoundToSimpleIntervalMap: ReadonlyMap<
  CompoundInterval,
  SimpleInterval
> = new Map(
  Object.entries(_compoundToSimpleIntervalMap) as [
    CompoundInterval,
    SimpleInterval,
  ][],
);

/** The alphabetical descriptor of an interval's harmonic quality (e.g., major 'M', minor 'm', perfect 'P'). */
export type IntervalQualityType = "dd" | "d" | "m" | "P" | "M" | "A" | "AA";

const _intervalQualityToIntegerMap = {
  dd1: -2,
  d1: -1,
  P1: 0,
  A1: 1,
  AA1: 2,

  dd2: -1,
  d2: 0,
  m2: 1,
  M2: 2,
  A2: 3,
  AA2: 4,

  dd3: 1,
  d3: 2,
  m3: 3,
  M3: 4,
  A3: 5,
  AA3: 6,

  dd4: 3,
  d4: 4,
  P4: 5,
  A4: 6,
  AA4: 7,

  dd5: 5,
  d5: 6,
  P5: 7,
  A5: 8,
  AA5: 9,

  dd6: 6,
  d6: 7,
  m6: 8,
  M6: 9,
  A6: 10,
  AA6: 11,

  dd7: 8,
  d7: 9,
  m7: 10,
  M7: 11,
  A7: 12,
  AA7: 13,

  dd8: 10,
  d8: 11,
  P8: 12,
  A8: 13,
  AA8: 14,

  dd9: 11,
  d9: 12,
  m9: 13,
  M9: 14,
  A9: 15,
  AA9: 16,

  dd10: 13,
  d10: 14,
  m10: 15,
  M10: 16,
  A10: 17,
  AA10: 18,

  dd11: 15,
  d11: 16,
  P11: 17,
  A11: 19,
  AA11: 20,

  dd12: 17,
  d12: 18,
  P12: 19,
  A12: 20,
  AA12: 21,

  dd13: 18,
  d13: 19,
  m13: 20,
  M13: 21,
  A13: 22,
  AA13: 23,

  dd14: 20,
  d14: 21,
  m14: 22,
  M14: 23,
  A14: 24,
  AA14: 25,

  dd15: 22,
  d15: 23,
  P15: 24,
  A15: 25,
  AA15: 26,
} as const;

/** An interval represented explicitly by its harmonic quality prefix rather than accidentals (e.g. 'M3' instead of '♮3'). */
export type IntervalQuality = keyof typeof _intervalQualityToIntegerMap;

/** Maps an interval quality explicitly to its numerical integer semitone offset. */
export const intervalQualityToIntegerMap: ReadonlyMap<IntervalQuality, number> =
  new Map(
    Object.entries(_intervalQualityToIntegerMap) as [IntervalQuality, number][],
  );

const _intervalToIntervalQualityMap = {
  "𝄫1": "dd1",
  "♭1": "d1",
  "1": "P1",
  "♮1": "P1",
  "♯1": "A1",
  "𝄪1": "AA1",

  "𝄫2": "d2",
  "♭2": "m2",
  "2": "M2",
  "♮2": "M2",
  "♯2": "A2",
  "𝄪2": "AA2",

  "𝄫3": "d3",
  "♭3": "m3",
  "3": "M3",
  "♮3": "M3",
  "♯3": "A3",
  "𝄪3": "AA3",

  "𝄫4": "dd4",
  "♭4": "d4",
  "4": "P4",
  "♮4": "P4",
  "♯4": "A4",
  "𝄪4": "AA4",

  "𝄫5": "dd5",
  "♭5": "d5",
  "5": "P5",
  "♮5": "P5",
  "♯5": "A5",
  "𝄪5": "AA5",

  "𝄫6": "d6",
  "♭6": "m6",
  "6": "M6",
  "♮6": "M6",
  "♯6": "A6",
  "𝄪6": "AA6",

  "𝄫7": "d7",
  "♭7": "m7",
  "7": "M7",
  "♮7": "M7",
  "♯7": "A7",
  "𝄪7": "AA7",

  "𝄫8": "dd8",
  "♭8": "d8",
  "8": "P8",
  "♮8": "P8",
  "♯8": "A8",
  "𝄪8": "AA8",

  "𝄫9": "d9",
  "♭9": "m9",
  "9": "M9",
  "♮9": "M9",
  "♯9": "A9",
  "𝄪9": "AA9",

  "𝄫10": "d10",
  "♭10": "m10",
  "10": "M10",
  "♮10": "M10",
  "♯10": "A10",
  "𝄪10": "AA10",

  "𝄫11": "dd11",
  "♭11": "d11",
  "11": "P11",
  "♮11": "P11",
  "♯11": "A11",
  "𝄪11": "AA11",

  "𝄫12": "dd12",
  "♭12": "d12",
  "12": "P12",
  "♮12": "P12",
  "♯12": "A12",
  "𝄪12": "AA12",

  "𝄫13": "d13",
  "♭13": "m13",
  "13": "M13",
  "♮13": "M13",
  "♯13": "A13",
  "𝄪13": "AA13",

  "𝄫14": "d14",
  "♭14": "m14",
  "14": "M14",
  "♮14": "M14",
  "♯14": "A14",
  "𝄪14": "AA14",

  "𝄫15": "dd15",
  "♭15": "d15",
  "15": "P15",
  "♮15": "P15",
  "♯15": "A15",
  "𝄪15": "AA15",
} as const;

/** Maps a generic, potentially accidental-defined interval to its proper harmonic `IntervalQuality`. */
export const intervalToIntervalQualityMap: ReadonlyMap<
  Interval,
  IntervalQuality
> = new Map(
  Object.entries(_intervalToIntervalQualityMap) as [
    Interval,
    IntervalQuality,
  ][],
);

const _intervalQualityToIntervalMap = {
  dd1: "𝄫1",
  d1: "♭1",
  P1: "1",
  A1: "♯1",
  AA1: "𝄪1",

  d2: "𝄫2",
  m2: "♭2",
  M2: "2",
  A2: "♯2",
  AA2: "𝄪2",

  d3: "𝄫3",
  m3: "♭3",
  M3: "3",
  A3: "♯3",
  AA3: "𝄪3",

  dd4: "𝄫4",
  d4: "♭4",
  P4: "4",
  A4: "♯4",
  AA4: "𝄪4",

  dd5: "𝄫5",
  d5: "♭5",
  P5: "5",
  A5: "♯5",
  AA5: "𝄪5",

  d6: "𝄫6",
  m6: "♭6",
  M6: "6",
  A6: "♯6",
  AA6: "𝄪6",

  d7: "𝄫7",
  m7: "♭7",
  M7: "7",
  A7: "♯7",
  AA7: "𝄪7",

  dd8: "𝄫8",
  d8: "♭8",
  P8: "8",
  A8: "♯8",
  AA8: "𝄪8",

  d9: "𝄫9",
  m9: "♭9",
  M9: "9",
  A9: "♯9",
  AA9: "𝄪9",

  d10: "𝄫10",
  m10: "♭10",
  M10: "10",
  A10: "♯10",
  AA10: "𝄪10",

  dd11: "𝄫11",
  d11: "♭11",
  P11: "11",
  A11: "♯11",
  AA11: "𝄪11",

  dd12: "𝄫12",
  d12: "♭12",
  P12: "12",
  A12: "♯12",
  AA12: "𝄪12",

  d13: "𝄫13",
  m13: "♭13",
  M13: "13",
  A13: "♯13",
  AA13: "𝄪13",

  d14: "𝄫14",
  m14: "♭14",
  M14: "14",
  A14: "♯14",
  AA14: "𝄪14",

  dd15: "𝄫15",
  d15: "♭15",
  P15: "15",
  A15: "♯15",
  AA15: "𝄪15",
} as const;

/** Maps a strict interval quality identifier back into its accidental-defined `Interval` string equivalent. */
export const intervalQualityToIntervalMap: ReadonlyMap<
  IntervalQuality,
  Interval
> = new Map(
  Object.entries(_intervalQualityToIntervalMap) as [
    IntervalQuality,
    Interval,
  ][],
);
