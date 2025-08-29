import type {
  LowerCaseRomanNumeral,
  SeventhChord,
  Triad,
  UpperCaseRomanNumeral,
} from "../../types/chords.d.ts";

export const diatonicTriads: Triad[] = [
  "M",
  "m",
  "m",
  "M",
  "M",
  "m",
  "°",
] as const;

export const diatonicSeventhChords: SeventhChord[] = [
  "M7",
  "m7",
  "m7",
  "M7",
  "7",
  "m7",
  "ø7",
] as const;

export const harmonicMinorTriads: Triad[] = [
  "m",
  "°",
  "+",
  "m",
  "M",
  "M",
  "°",
] as const;

export const harmonicMinorSeventhChords: SeventhChord[] = [
  "m(M7)",
  "ø7",
  "+M7",
  "m7",
  "7",
  "M7",
  "°7",
] as const;

export const melodicMinorTriads: Triad[] = [
  "m",
  "m",
  "+",
  "M",
  "M",
  "°",
  "°",
] as const;

export const melodicMinorSeventhChords: SeventhChord[] = [
  "m(M7)",
  "m7",
  "+M7",
  "7",
  "7",
  "ø7",
  "ø7",
] as const;

export const upperCaseRomanNumerals: UpperCaseRomanNumeral[] = [
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
] as const;

export const lowerCaseRomanNumerals: LowerCaseRomanNumeral[] = [
  "i",
  "ii",
  "iii",
  "iv",
  "v",
  "vi",
  "vii",
] as const;
