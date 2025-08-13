import type { Interval, NoteInteger } from "../types/note-labels.d.ts";

export interface PitchCollection {
  primaryName: string;
  names: string[];
  intervals: Interval[];
  integers: NoteInteger[];
  rotation?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  type: string[];
  characteristics: string[];
  pattern: string[];
  patternShort: string[];
}

export type PitchCollectionGroupKey =
  | "diatonicModes"
  | "harmonicMinorModes"
  | "melodicMinorModes"
  | "dominantVariants"
  | "majorVariants"
  | "otherCollections";

export type DiatonicModeKey =
  | "ionian"
  | "dorian"
  | "phrygian"
  | "lydian"
  | "mixolydian"
  | "aeolian"
  | "locrian";

export type HarmonicMinorModeKey =
  | "harmonicMinor"
  | "locrianNatural6"
  | "ionianSharp5"
  | "dorianSharp4"
  | "phrygianDominant"
  | "lydianSharp2"
  | "superLocrianDoubleFlat7";

export type MelodicMinorModeKey =
  | "melodicMinor"
  | "dorianFlat2"
  | "lydianAugmented"
  | "lydianDominant"
  | "mixolydianFlat6"
  | "aeolianFlat5"
  | "altered";
export type DominantVariantKey =
  | "dominant7"
  | "dominant9"
  | "dominant11"
  | "dominant13";

export type MajorVariantKey =
  | "major"
  | "major6"
  | "major7"
  | "major9"
  | "majorAdd9"
  | "major6Add9";

export type OtherPitchCollectionKey = "chromatic" | "wholeTone";

export type PitchCollectionKey =
  | DiatonicModeKey
  | HarmonicMinorModeKey
  | MelodicMinorModeKey
  | DominantVariantKey
  | MajorVariantKey
  | OtherPitchCollectionKey;
