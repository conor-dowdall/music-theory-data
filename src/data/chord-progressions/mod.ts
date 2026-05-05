import { chordProgressionForms } from "./forms.ts";
import { chordProgressions } from "./progressions.ts";
import { chordProgressionSets } from "./sets.ts";
import type {
  ChordProgressionIdiom,
  ChordProgressionTonalContext,
} from "../../types/chord-progressions.d.ts";
import type { ChordQuality } from "../../types/chords.d.ts";
import type { NoteCollectionKey } from "../note-collections/mod.ts";

export { chordProgressionForms } from "./forms.ts";
export { chordProgressions } from "./progressions.ts";
export { chordProgressionSets } from "./sets.ts";

export type ChordProgressionKey = keyof typeof chordProgressions;
export type ChordProgressionFormKey = keyof typeof chordProgressionForms;
export type ChordProgressionSetKey = keyof typeof chordProgressionSets;

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
