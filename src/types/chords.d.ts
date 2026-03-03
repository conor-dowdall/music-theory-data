export type Triad = "M" | "m" | "°" | "+";

export type SeventhChord =
  | "M7"
  | "m7"
  | "7"
  | "ø7"
  | "m7♭5"
  | "°7"
  | "m(M7)"
  | "+M7"
  | "M7♯5";

export type UpperCaseRomanNumeral =
  | "I"
  | "II"
  | "III"
  | "IV"
  | "V"
  | "VI"
  | "VII";

export type LowerCaseRomanNumeral =
  | "i"
  | "ii"
  | "iii"
  | "iv"
  | "v"
  | "vi"
  | "vii";

export type RomanNumeral = UpperCaseRomanNumeral | LowerCaseRomanNumeral;

export type RomanTriad = `${RomanNumeral}` | `${RomanNumeral}${Triad}`;

export type RomanSeventhChord = `${RomanNumeral}${SeventhChord}`;
