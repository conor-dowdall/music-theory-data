import type { NoteInteger } from "../../types/labels.d.ts";

const _noteLetters = [
  "C",
  "D",
  "E",
  "F",
  "G",
  "A",
  "B",
] as const;

export type NoteLetter = typeof _noteLetters[number];

export const noteLetters: readonly NoteLetter[] = _noteLetters;

const _noteAccidentalToIntegerMap = {
  "𝄫": -2,
  "♭": -1,
  "♮": 0,
  "♯": 1,
  "𝄪": 2,
} as const;

export type NoteAccidental = keyof typeof _noteAccidentalToIntegerMap;

export const noteAccidentalToIntegerMap: Record<
  NoteAccidental,
  number
> = _noteAccidentalToIntegerMap;

const _noteNameToIntegerMap = {
  "C𝄫": 10,
  "C♭": 11,
  "C♮": 0,
  "C": 0,
  "C♯": 1,
  "C𝄪": 2,

  "D𝄫": 0,
  "D♭": 1,
  "D♮": 2,
  "D": 2,
  "D♯": 3,
  "D𝄪": 4,

  "E𝄫": 2,
  "E♭": 3,
  "E♮": 4,
  "E": 4,
  "E♯": 5,
  "E𝄪": 6,

  "F𝄫": 3,
  "F♭": 4,
  "F♮": 5,
  "F": 5,
  "F♯": 6,
  "F𝄪": 7,

  "G𝄫": 5,
  "G♭": 6,
  "G♮": 7,
  "G": 7,
  "G♯": 8,
  "G𝄪": 9,

  "A𝄫": 7,
  "A♭": 8,
  "A♮": 9,
  "A": 9,
  "A♯": 10,
  "A𝄪": 11,

  "B𝄫": 9,
  "B♭": 10,
  "B♮": 11,
  "B": 11,
  "B♯": 0,
  "B𝄪": 1,
} as const;
// satisfies Record<
//   NoteLetter | `${NoteLetter}${NoteAccidental}`,
//   NoteInteger
// >; // extra type safety for development purposes only (causes slow types)

export type NoteName = keyof typeof _noteNameToIntegerMap;

export const noteNameToIntegerMap: Record<NoteName, NoteInteger> =
  _noteNameToIntegerMap;

const _rootNotes = [
  "C♭",
  "G♭",
  "D♭",
  "A♭",
  "E♭",
  "B♭",
  "F",
  "C",
  "G",
  "D",
  "A",
  "E",
  "B",
  "F♯",
  "C♯",
] as const;
// satisfies NoteName[]; // extra type safety for development purposes only (causes slow types)

export type RootNote = typeof _rootNotes[number];

export const rootNotes: readonly RootNote[] = _rootNotes;

export const enharmonicNoteNameGroups: readonly NoteName[][] = [
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
// satisfies Record<
//   SimpleIntervalNumber | `${NoteAccidental}${SimpleIntervalNumber}`,
//   number
// >; // extra type safety for development purposes only (causes slow types)

export type SimpleInterval = keyof typeof _simpleIntervalToIntegerMap;

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
// satisfies Record<
//   CompoundIntervalNumber | `${NoteAccidental}${CompoundIntervalNumber}`,
//   number
// >; // extra type safety for development purposes only (causes slow types)

export type CompoundInterval = keyof typeof _compoundIntervalToIntegerMap;

export type IntervalNumber = SimpleIntervalNumber | CompoundIntervalNumber;

const _intervalToIntegerMap = {
  ..._simpleIntervalToIntegerMap,
  ..._compoundIntervalToIntegerMap,
} as const;

export type Interval = keyof typeof _intervalToIntegerMap;

export const intervalToIntegerMap: Record<Interval, number> =
  _intervalToIntegerMap;

export const simpleToExtensionIntervalMap: Partial<
  Record<SimpleInterval, CompoundInterval>
> = {
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

export const extensionToSimpleIntervalMap: Partial<
  Record<CompoundInterval, SimpleInterval>
> = {
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

export const simpleToCompoundIntervalMap: Partial<
  Record<SimpleInterval, CompoundInterval>
> = {
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

export const compoundToSimpleIntervalMap: Partial<
  Record<CompoundInterval, SimpleInterval>
> = {
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

export type IntervalQualityType = "d" | "m" | "P" | "M" | "A";

const _intervalQualityToIntegerMap = {
  "d1": -1,
  "P1": 0,
  "A1": 1,

  "d2": 0,
  "m2": 1,
  "M2": 2,
  "A2": 3,

  "d3": 2,
  "m3": 3,
  "M3": 4,
  "A3": 5,

  "d4": 4,
  "P4": 5,
  "A4": 6,

  "d5": 6,
  "P5": 7,
  "A5": 8,

  "d6": 7,
  "m6": 8,
  "M6": 9,
  "A6": 10,

  "d7": 9,
  "m7": 10,
  "M7": 11,
  "A7": 12,

  "d8": 11,
  "P8": 12,
  "A8": 13,

  "d9": 12,
  "m9": 13,
  "M9": 14,
  "A9": 15,

  "d10": 14,
  "m10": 15,
  "M10": 16,
  "A10": 17,

  "d11": 16,
  "P11": 17,
  "A11": 19,

  "d12": 18,
  "P12": 19,
  "A12": 20,

  "d13": 19,
  "m13": 20,
  "M13": 21,
  "A13": 22,

  "d14": 21,
  "m14": 22,
  "M14": 23,
  "A14": 24,

  "d15": 23,
  "P15": 24,
  "A15": 25,
} as const;
// satisfies Partial<
//   Record<`${IntervalQualityType}${IntervalNumber}`, number>
// >; // extra type safety for development purposes only (causes slow types)

export type IntervalQuality = keyof typeof _intervalQualityToIntegerMap;

export const intervalQualityToIntegerMap: Record<
  IntervalQuality,
  number
> = _intervalQualityToIntegerMap;
