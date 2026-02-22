import type {
  LowerCaseRomanNumeral,
  SeventhChord,
  Triad,
  UpperCaseRomanNumeral,
} from "../../types/chords.d.ts";

/** An ordered array containing the fundamental triad qualities of the diatonic major scale. */
export const diatonicTriads: Triad[] = [
  "M",
  "m",
  "m",
  "M",
  "M",
  "m",
  "°",
] as const;

/** An ordered array containing the fundamental seventh-chord qualities of the diatonic major scale. */
export const diatonicSeventhChords: SeventhChord[] = [
  "M7",
  "m7",
  "m7",
  "M7",
  "7",
  "m7",
  "ø7",
] as const;

/** An ordered array containing the fundamental triad qualities of the harmonic minor scale. */
export const harmonicMinorTriads: Triad[] = [
  "m",
  "°",
  "+",
  "m",
  "M",
  "M",
  "°",
] as const;

/** An ordered array containing the fundamental seventh-chord qualities of the harmonic minor scale. */
export const harmonicMinorSeventhChords: SeventhChord[] = [
  "m(M7)",
  "ø7",
  "+M7",
  "m7",
  "7",
  "M7",
  "°7",
] as const;

/** An ordered array containing the fundamental triad qualities of the melodic minor scale. */
export const melodicMinorTriads: Triad[] = [
  "m",
  "m",
  "+",
  "M",
  "M",
  "°",
  "°",
] as const;

/** An ordered array containing the fundamental seventh-chord qualities of the melodic minor scale. */
export const melodicMinorSeventhChords: SeventhChord[] = [
  "m(M7)",
  "m7",
  "+M7",
  "7",
  "7",
  "ø7",
  "ø7",
] as const;

/** An array mapping 7 index scale degrees to their corresponding upper-case Roman numerals. */
export const upperCaseRomanNumerals: UpperCaseRomanNumeral[] = [
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
] as const;

/** An array mapping 7 index scale degrees to their corresponding lower-case Roman numerals. */
export const lowerCaseRomanNumerals: LowerCaseRomanNumeral[] = [
  "i",
  "ii",
  "iii",
  "iv",
  "v",
  "vi",
  "vii",
] as const;
