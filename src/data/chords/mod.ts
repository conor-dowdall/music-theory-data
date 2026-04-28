const _triadChordQualities = ["M", "m", "°", "+"] as const;

const _seventhChordQualities = [
  "M7",
  "m7",
  "7",
  "ø7",
  "m7♭5",
  "°7",
  "m(M7)",
  "+M7",
  "M7♯5",
] as const;

const _upperCaseRomanNumerals = [
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
] as const;

const _lowerCaseRomanNumerals = [
  "i",
  "ii",
  "iii",
  "iv",
  "v",
  "vi",
  "vii",
] as const;

export type Triad = (typeof _triadChordQualities)[number];
export type SeventhChord = (typeof _seventhChordQualities)[number];
export type ChordQuality = Triad | SeventhChord;

export type UpperCaseRomanNumeral = (typeof _upperCaseRomanNumerals)[number];
export type LowerCaseRomanNumeral = (typeof _lowerCaseRomanNumerals)[number];
export type RomanNumeral = UpperCaseRomanNumeral | LowerCaseRomanNumeral;

export type RomanTriad = `${RomanNumeral}` | `${RomanNumeral}${Triad}`;
export type RomanSeventhChord = `${RomanNumeral}${SeventhChord}`;
export type RomanNumeralCase = "upper" | "lower";

export interface ChordQualityRomanRendering {
  readonly numeralCase: RomanNumeralCase;
  readonly suffix: string;
}

/** The complete set of supported triad chord qualities. */
export const triadChordQualities: readonly Triad[] = _triadChordQualities;

/** The complete set of supported seventh chord qualities. */
export const seventhChordQualities: readonly SeventhChord[] =
  _seventhChordQualities;

/** The complete set of supported chord suffix qualities. */
export const chordQualities: readonly ChordQuality[] = [
  ...triadChordQualities,
  ...seventhChordQualities,
];

/** Roman numeral rendering metadata for each supported chord quality. */
export const chordQualityRomanRenderings: ReadonlyMap<
  ChordQuality,
  ChordQualityRomanRendering
> = new Map([
  ["M", { numeralCase: "upper", suffix: "" }],
  ["m", { numeralCase: "lower", suffix: "" }],
  ["°", { numeralCase: "lower", suffix: "°" }],
  ["+", { numeralCase: "upper", suffix: "+" }],
  ["M7", { numeralCase: "upper", suffix: "M7" }],
  ["m7", { numeralCase: "lower", suffix: "m7" }],
  ["7", { numeralCase: "upper", suffix: "7" }],
  ["ø7", { numeralCase: "lower", suffix: "ø7" }],
  ["m7♭5", { numeralCase: "lower", suffix: "m7♭5" }],
  ["°7", { numeralCase: "lower", suffix: "°7" }],
  ["m(M7)", { numeralCase: "lower", suffix: "M7" }],
  ["+M7", { numeralCase: "upper", suffix: "+M7" }],
  ["M7♯5", { numeralCase: "upper", suffix: "M7♯5" }],
]);

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
export const upperCaseRomanNumerals: readonly UpperCaseRomanNumeral[] =
  _upperCaseRomanNumerals;

/** An array mapping 7 index scale degrees to their corresponding lower-case Roman numerals. */
export const lowerCaseRomanNumerals: readonly LowerCaseRomanNumeral[] =
  _lowerCaseRomanNumerals;
