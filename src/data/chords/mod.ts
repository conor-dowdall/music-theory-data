import {
  type ChordCollectionKey,
  type NoteCollectionKey,
  noteCollections,
} from "../note-collections/mod.ts";
import type {
  ChordCollectionSymbolRendering,
  RomanNumeralCase,
} from "../../types/note-collections.d.ts";

export type {
  ChordCollectionSymbolRendering,
  RomanNumeralCase,
} from "../../types/note-collections.d.ts";

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

/** A supported triad chord quality suffix. */
export type Triad = (typeof _triadChordQualities)[number];

/** A supported seventh-chord quality suffix. */
export type SeventhChord = (typeof _seventhChordQualities)[number];

/** Any supported chord quality suffix. */
export type ChordQuality = Triad | SeventhChord;

/** An uppercase roman numeral for scale degrees one through seven. */
export type UpperCaseRomanNumeral = (typeof _upperCaseRomanNumerals)[number];

/** A lowercase roman numeral for scale degrees one through seven. */
export type LowerCaseRomanNumeral = (typeof _lowerCaseRomanNumerals)[number];

/** Any supported roman numeral scale-degree symbol. */
export type RomanNumeral = UpperCaseRomanNumeral | LowerCaseRomanNumeral;

/** A roman-numeral triad symbol with an optional triad quality suffix. */
export type RomanTriad = `${RomanNumeral}` | `${RomanNumeral}${Triad}`;

/** A roman-numeral seventh-chord symbol with a seventh quality suffix. */
export type RomanSeventhChord = `${RomanNumeral}${SeventhChord}`;

/** Rendering metadata for converting a chord quality into roman notation. */
export interface ChordQualityRomanRendering {
  readonly numeralCase: RomanNumeralCase;
  readonly suffix: string;
}

const _chordQualityNoteCollectionKeys = {
  M: "major",
  m: "minor",
  "°": "diminishedTriad",
  "+": "augmentedTriad",
  M7: "major7",
  m7: "minor7",
  "7": "dominant7",
  "ø7": "halfDiminished7",
  "m7♭5": "halfDiminished7",
  "°7": "diminished7",
  "m(M7)": "minorMajor7",
  "+M7": "augmentedMajor7",
  "M7♯5": "augmentedMajor7",
} as const satisfies Record<ChordQuality, ChordCollectionKey>;

function getChordCollectionSymbolRenderings(): Record<
  ChordCollectionKey,
  ChordCollectionSymbolRendering
> {
  const renderings = Object.fromEntries(
    Object.entries(noteCollections).flatMap(([key, collection]) =>
      collection.category === "chord" ? [[key, collection.symbol]] : []
    ),
  );

  return renderings as Record<
    ChordCollectionKey,
    ChordCollectionSymbolRendering
  >;
}

export type ChordCollectionChordSuffix = string;

export type ChordCollectionRomanSuffix = string;

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

/** Maps each supported chord quality to its matching chord collection key. */
export type ChordQualityChordCollectionKeyMap = Record<
  ChordQuality,
  ChordCollectionKey
>;

/** Chord collection keys for every supported chord quality. */
export const chordQualityChordCollectionKeys:
  ChordQualityChordCollectionKeyMap = _chordQualityNoteCollectionKeys;

/** Maps each supported chord quality to its matching note-collection key. */
export type ChordQualityNoteCollectionKeyMap = Record<
  ChordQuality,
  NoteCollectionKey
>;

/** Note-collection keys for every supported chord quality. */
export const chordQualityNoteCollectionKeys: ChordQualityNoteCollectionKeyMap =
  chordQualityChordCollectionKeys;

/** Symbol rendering metadata for every built-in chord collection. */
export const chordCollectionSymbolRenderings: Record<
  ChordCollectionKey,
  ChordCollectionSymbolRendering
> = getChordCollectionSymbolRenderings();

/** Roman numeral rendering metadata for each supported chord quality. */
export const chordQualityRomanRenderings: ReadonlyMap<
  ChordQuality,
  ChordQualityRomanRendering
> = new Map(
  chordQualities.map((quality) => {
    const chordCollectionKey = chordQualityChordCollectionKeys[quality];
    const rendering = chordCollectionSymbolRenderings[chordCollectionKey];
    return [
      quality,
      {
        numeralCase: rendering.numeralCase,
        suffix: rendering.romanSuffix,
      },
    ] as const;
  }),
);

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

/** Returns the note-collection key that describes the notes in a chord quality. */
export function getChordQualityNoteCollectionKey(
  quality: ChordQuality,
): NoteCollectionKey {
  return chordQualityNoteCollectionKeys[quality];
}

/** Returns the chord-collection key that describes the notes in a chord quality. */
export function getChordQualityChordCollectionKey(
  quality: ChordQuality,
): ChordCollectionKey {
  return chordQualityChordCollectionKeys[quality];
}

/** Returns symbol rendering metadata for a chord collection. */
export function getChordCollectionSymbolRendering(
  chordCollectionKey: ChordCollectionKey,
): ChordCollectionSymbolRendering {
  return chordCollectionSymbolRenderings[chordCollectionKey];
}

/** Returns the chord-symbol suffix for a chord collection. */
export function getChordCollectionChordSuffix(
  chordCollectionKey: ChordCollectionKey,
): ChordCollectionChordSuffix {
  return getChordCollectionSymbolRendering(chordCollectionKey).chordSuffix;
}

/** Returns the roman-symbol suffix for a chord collection. */
export function getChordCollectionRomanSuffix(
  chordCollectionKey: ChordCollectionKey,
): ChordCollectionRomanSuffix {
  return getChordCollectionSymbolRendering(chordCollectionKey).romanSuffix;
}
