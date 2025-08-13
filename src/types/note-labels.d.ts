export type NoteInteger = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export type NoteExtensionInteger =
  | -2
  | -1
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26;

export type NoteLetter = "C" | "D" | "E" | "F" | "G" | "A" | "B";

export type NoteAccidental = "♮" | "♭" | "𝄫" | "♯" | "𝄪";

export type IntervalQualityType = "M" | "m" | "P" | "d" | "A";

export type NoteName = `${NoteLetter}` | `${NoteLetter}${NoteAccidental}`;

export type IntervalNumber =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15;

export type Interval =
  | `${IntervalNumber}`
  | `${NoteAccidental}${IntervalNumber}`;

export type IntervalQuality = `${IntervalQualityType}${IntervalNumber}`;

export type EnharmonicNoteNameGroup = NoteName[];

export type EnharmonicNoteNameGroups = [
  EnharmonicNoteNameGroup,
  EnharmonicNoteNameGroup,
  EnharmonicNoteNameGroup,
  EnharmonicNoteNameGroup,
  EnharmonicNoteNameGroup,
  EnharmonicNoteNameGroup,
  EnharmonicNoteNameGroup,
  EnharmonicNoteNameGroup,
  EnharmonicNoteNameGroup,
  EnharmonicNoteNameGroup,
  EnharmonicNoteNameGroup,
  EnharmonicNoteNameGroup,
];

export type NoteLabelGroup = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

export interface NoteLabelTheme {
  name: string;
  shortName: string;
  isRelative: boolean;
  labels: NoteLabelGroup;
}

export type NoteLabelThemeKey =
  | "flat"
  | "sharp"
  | "fixedDoFlat"
  | "fixedDoSharp"
  | "movableDo"
  | "movableLa";

export type OctaveNumber = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
