import type { Interval } from "./note-labels.d.ts";

export type Triad = "M" | "m" | "°" | "+";

export type Seventh =
  | "M7"
  | "m7"
  | "7"
  | "ø7"
  | "m7♭5"
  | "°7"
  | "m(M7)"
  | "+M7"
  | "M7♯5";

export type RomanNumeral =
  | "I"
  | "II"
  | "III"
  | "IV"
  | "V"
  | "VI"
  | "VII"
  | "i"
  | "ii"
  | "iii"
  | "iv"
  | "v"
  | "vi"
  | "vii";

export type RomanTriad =
  | `${RomanNumeral}`
  | `${RomanNumeral}${Triad}`;

export type RomanSeventh = `${RomanNumeral}${Seventh}`;

export interface ModeIntervalChords {
  interval: Interval;
  triad: Triad;
  seventh: Seventh;
  romanTriad: RomanTriad;
  romanSeventh: RomanSeventh;
}
