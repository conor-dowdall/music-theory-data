import {
  type ChordProgressionKey,
  chordProgressions,
} from "../data/chord-progressions/mod.ts";
import { getChordQualityNoteCollectionKey } from "../data/chords/mod.ts";
import type { ChordProgression } from "../types/chord-progressions.d.ts";
import type { RootNote } from "../data/labels/note-labels.ts";
import type { NoteCollectionKey } from "../data/note-collections/mod.ts";
import {
  getNoteNamesForRootAndIntervals,
  normalizeRootNoteString,
} from "./note-names.ts";

export interface ChordProgressionChordReference {
  readonly rootNote: RootNote;
  readonly chordName: string;
  readonly noteCollectionKey: NoteCollectionKey;
}

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

export function getChordProgressionRomanSymbols(
  progressionOrKey: ChordProgression | ChordProgressionKey,
): string[] {
  const progression = resolveProgression(progressionOrKey);
  if (!progression) return [];

  return progression.chords.map((chord) => chord.romanSymbol);
}

export function getChordProgressionUniqueChordNames(
  rootNote: RootNote,
  progressionOrKey: ChordProgression | ChordProgressionKey,
): string[] {
  return Array.from(
    new Set(getChordProgressionChordNames(rootNote, progressionOrKey)),
  );
}

export function getChordProgressionChordReferences(
  rootNote: RootNote,
  progressionOrKey: ChordProgression | ChordProgressionKey,
): ChordProgressionChordReference[] {
  const progression = resolveProgression(progressionOrKey);
  if (!progression) return [];

  const chordRootNotes = getNoteNamesForRootAndIntervals(
    rootNote,
    progression.chords.map((chord) => chord.degree),
  ).map((noteName) => normalizeRootNoteString(noteName));

  return progression.chords.flatMap((chord, index) => {
    const chordRootNote = chordRootNotes[index];
    if (!chordRootNote) return [];

    return [{
      rootNote: chordRootNote,
      chordName: chordRootNote + chord.quality,
      noteCollectionKey: getChordQualityNoteCollectionKey(chord.quality),
    }];
  });
}

export function getChordProgressionUniqueChordReferences(
  rootNote: RootNote,
  progressionOrKey: ChordProgression | ChordProgressionKey,
): ChordProgressionChordReference[] {
  const uniqueReferences: ChordProgressionChordReference[] = [];
  const seen = new Set<string>();

  for (
    const reference of getChordProgressionChordReferences(
      rootNote,
      progressionOrKey,
    )
  ) {
    const key =
      `${reference.rootNote}:${reference.noteCollectionKey}:${reference.chordName}`;
    if (seen.has(key)) continue;
    seen.add(key);
    uniqueReferences.push(reference);
  }

  return uniqueReferences;
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
