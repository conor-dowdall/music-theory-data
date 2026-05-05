import { chordProgressions } from "./progressions.ts";
import { chordProgressionSets } from "./sets.ts";
import type { ChordQuality } from "../../types/chords.d.ts";
import type { NoteCollectionKey } from "../note-collections/mod.ts";

export { chordProgressions } from "./progressions.ts";
export { chordProgressionSets } from "./sets.ts";

export type ChordProgressionKey = keyof typeof chordProgressions;
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
