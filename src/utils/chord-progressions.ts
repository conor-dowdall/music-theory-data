import {
  type ChordProgressionKey,
  chordProgressions,
} from "../data/chord-progressions/mod.ts";
import type { ChordProgression } from "../types/chord-progressions.d.ts";
import type { RootNote } from "../data/labels/note-labels.ts";
import { getNoteNamesForRootAndIntervals } from "./note-names.ts";

export function isValidChordProgressionKey(
  key: string,
): key is ChordProgressionKey {
  return Object.prototype.hasOwnProperty.call(chordProgressions, key);
}

function resolveProgression(
  progressionOrKey: ChordProgression | ChordProgressionKey,
): ChordProgression | undefined {
  if (typeof progressionOrKey !== "string") return progressionOrKey;
  return chordProgressions[progressionOrKey];
}

export function getChordProgressionChordNames(
  rootNote: RootNote,
  progressionOrKey: ChordProgression | ChordProgressionKey,
): string[] {
  const progression = resolveProgression(progressionOrKey);
  if (!progression) return [];

  const noteNames = getNoteNamesForRootAndIntervals(
    rootNote,
    progression.chords.map((chord) => chord.degree),
  );

  return progression.chords.map((chord, index) =>
    noteNames[index] + chord.quality
  );
}

export function getChordProgressionUniqueChordNames(
  rootNote: RootNote,
  progressionOrKey: ChordProgression | ChordProgressionKey,
): string[] {
  return Array.from(
    new Set(getChordProgressionChordNames(rootNote, progressionOrKey)),
  );
}

export function getChordProgressionTotalDurationInBars(
  progressionOrKey: ChordProgression | ChordProgressionKey,
): number {
  const progression = resolveProgression(progressionOrKey);
  if (!progression) return 0;

  return progression.chords.reduce(
    (total, chord) => total + chord.durationInBars,
    0,
  );
}
