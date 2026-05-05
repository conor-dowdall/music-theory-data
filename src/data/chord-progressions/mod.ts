import { curatedChordProgressionCollections } from "./curated.ts";
import { chordProgressionFamilies } from "./families.ts";
import { chordProgressionForms } from "./forms.ts";
import { chordProgressionRealizations } from "./realizations.ts";
import type {
  ChordProgressionIdiom,
  ChordProgressionPedagogyLevel,
  ChordProgressionTonalContext,
  ChordProgressionUsage,
} from "../../types/chord-progressions.d.ts";
import type { ChordQuality } from "../../types/chords.d.ts";
import type { NoteCollectionKey } from "../note-collections/mod.ts";

export { curatedChordProgressionCollections } from "./curated.ts";
export { chordProgressionFamilies } from "./families.ts";
export { chordProgressionForms } from "./forms.ts";
export { chordProgressionRealizations } from "./realizations.ts";

export type ChordProgressionFamilyKey = keyof typeof chordProgressionFamilies;
export type ChordProgressionRealizationKey =
  keyof typeof chordProgressionRealizations;
export type ChordProgressionFormKey = keyof typeof chordProgressionForms;
export type ChordProgressionCuratedCollectionKey =
  keyof typeof curatedChordProgressionCollections;

export type ChordProgressionStepNoteCollectionKeyMap = Partial<
  Record<ChordQuality, NoteCollectionKey>
>;

export const chordProgressionStepNoteCollectionKeys:
  ChordProgressionStepNoteCollectionKeyMap = {
    M: "major",
    m: "minor",
    "7": "dominant7",
    M7: "major7",
    m7: "minor7",
    "ø7": "halfDiminished7",
    "°7": "diminished7",
  } as const;

export function getChordProgressionStepNoteCollectionKey(
  quality: ChordQuality,
): NoteCollectionKey | undefined {
  return chordProgressionStepNoteCollectionKeys[quality];
}

export const chordProgressionIdiomMetadata: Record<
  ChordProgressionIdiom,
  {
    displayName: string;
    description: string;
  }
> = {
  "common-practice": {
    displayName: "Common Practice",
    description:
      "Broadly tonal harmonic language that is not tied to one modern genre label.",
  },
  blues: {
    displayName: "Blues",
    description:
      "Blues-based harmony, especially dominant-function sonorities used as stable colors.",
  },
  jazz: {
    displayName: "Jazz",
    description:
      "Functional and idiomatic jazz harmony, including cadences, standards, and blues variants.",
  },
  "pop-rock": {
    displayName: "Pop / Rock",
    description:
      "Common loops and progressions used across pop, rock, folk, and related songwriting traditions.",
  },
} as const;

export const chordProgressionTonalContextMetadata: Record<
  ChordProgressionTonalContext,
  {
    displayName: string;
    description: string;
  }
> = {
  major: {
    displayName: "Major",
    description: "Centered in a major-key harmonic world.",
  },
  minor: {
    displayName: "Minor",
    description: "Centered in a minor-key harmonic world.",
  },
  "dominant-blues": {
    displayName: "Dominant Blues",
    description:
      "Uses blues harmony where dominant chords behave as stable centers rather than only dominant-function chords.",
  },
  mixed: {
    displayName: "Mixed",
    description:
      "Combines multiple tonal colors or idioms that do not fit one plain major/minor label.",
  },
} as const;

export const chordProgressionPedagogyLevelMetadata: Record<
  ChordProgressionPedagogyLevel,
  {
    displayName: string;
    description: string;
  }
> = {
  beginner: {
    displayName: "Beginner",
    description:
      "Accessible to new players working with a small set of chord shapes and basic timekeeping.",
  },
  "early-intermediate": {
    displayName: "Early Intermediate",
    description:
      "Introduces richer harmony or harmonic function while remaining manageable in guided practice.",
  },
  intermediate: {
    displayName: "Intermediate",
    description:
      "Requires stronger form awareness, harmonic fluency, or faster changes.",
  },
} as const;

export const chordProgressionUsageMetadata: Record<
  ChordProgressionUsage,
  {
    displayName: string;
    description: string;
  }
> = {
  practice: {
    displayName: "Practice",
    description:
      "Useful for repetition, play-along work, or structured skill-building.",
  },
  reference: {
    displayName: "Reference",
    description:
      "Useful as a stable harmonic example or educational lookup entry.",
  },
  songwriting: {
    displayName: "Songwriting",
    description:
      "Useful as a compositional building block or common song pattern.",
  },
  "ear-training": {
    displayName: "Ear Training",
    description:
      "Useful for hearing harmonic function, tension, and resolution.",
  },
} as const;
