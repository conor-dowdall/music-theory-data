import type { RomanNumeral, Seventh, Triad } from "../../types/chords.d.ts";

export const diatonicTriads: Triad[] = [
  "M",
  "m",
  "m",
  "M",
  "M",
  "m",
  "°",
];

export const diatonicSevenths: Seventh[] = [
  "M7",
  "m7",
  "m7",
  "M7",
  "7",
  "m7",
  "ø7",
];

export const harmonicMinorTriads: Triad[] = [
  "m",
  "°",
  "+",
  "m",
  "M",
  "M",
  "°",
];

export const harmonicMinorSevenths: Seventh[] = [
  "m(M7)",
  "ø7",
  "+M7",
  "m7",
  "7",
  "M7",
  "°7",
];

export const melodicMinorTriads: Triad[] = [
  "m",
  "m",
  "+",
  "M",
  "M",
  "°",
  "°",
];

export const melodicMinorSevenths: Seventh[] = [
  "m(M7)",
  "m7",
  "+M7",
  "7",
  "7",
  "ø7",
  "ø7",
];

export const upperCaseRomanNumerals: RomanNumeral[] = [
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
];

export const lowerCaseRomanNumerals: RomanNumeral[] = [
  "i",
  "ii",
  "iii",
  "iv",
  "v",
  "vi",
  "vii",
];
