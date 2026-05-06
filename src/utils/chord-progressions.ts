import {
  chordProgressionBarGroups,
  type ChordProgressionKey,
  chordProgressions,
} from "../data/chord-progressions/mod.ts";
import { getChordQualityNoteCollectionKey } from "../data/chords/mod.ts";
import type {
  ChordProgression,
  ChordProgressionChord,
} from "../types/chord-progressions.d.ts";
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

interface ResolvedChordProgressionChordReference {
  readonly chord: ChordProgressionChord;
  readonly reference: ChordProgressionChordReference;
}

const BAR_DURATION_EPSILON = 0.000000001;

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

function createChordProgressionChordReference(
  chord: ChordProgressionChord,
  chordRootNote: RootNote,
): ChordProgressionChordReference {
  return {
    rootNote: chordRootNote,
    chordName: chordRootNote + chord.quality,
    noteCollectionKey: getChordQualityNoteCollectionKey(chord.quality),
  };
}

function getResolvedChordProgressionChordReferences(
  rootNote: RootNote,
  progressionOrKey: ChordProgression | ChordProgressionKey,
): ResolvedChordProgressionChordReference[] {
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
      chord,
      reference: createChordProgressionChordReference(chord, chordRootNote),
    }];
  });
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

export function getChordProgressionKeysForTotalBars(
  totalBars: number,
): ChordProgressionKey[] {
  return chordProgressionBarGroups.find((group) =>
    group.totalBars === totalBars
  )
    ?.progressionKeys.slice() ?? [];
}

export function getChordProgressionUniqueChordNames(
  rootNote: RootNote,
  progressionOrKey: ChordProgression | ChordProgressionKey,
): string[] {
  return Array.from(
    new Set(getChordProgressionChordNames(rootNote, progressionOrKey)),
  );
}

/**
 * Returns one chord reference for each authored chord entry in
 * `progression.chords`.
 *
 * This is the "chord changes" view: a chord lasting 2 bars is returned once,
 * because it is one chord entry/change, while repeated entries are preserved.
 */
export function getChordProgressionChordChangeReferences(
  rootNote: RootNote,
  progressionOrKey: ChordProgression | ChordProgressionKey,
): ChordProgressionChordReference[] {
  return getResolvedChordProgressionChordReferences(
    rootNote,
    progressionOrKey,
  ).map(({ reference }) => reference);
}

/**
 * Returns each distinct chord reference once, preserving first-seen order from
 * the chord-change list.
 */
export function getChordProgressionUniqueChordReferences(
  rootNote: RootNote,
  progressionOrKey: ChordProgression | ChordProgressionKey,
): ChordProgressionChordReference[] {
  const uniqueReferences: ChordProgressionChordReference[] = [];
  const seen = new Set<string>();

  for (
    const reference of getChordProgressionChordChangeReferences(
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

/**
 * Returns duration-aware chord references grouped by bar.
 *
 * Each outer array item is one bar. A 2-bar chord appears in two bar entries,
 * and a split bar can contain multiple chord references in order.
 */
export function getChordProgressionChordReferencesByBar(
  rootNote: RootNote,
  progressionOrKey: ChordProgression | ChordProgressionKey,
): ChordProgressionChordReference[][] {
  const bars: ChordProgressionChordReference[][] = [];
  let currentBar: ChordProgressionChordReference[] = [];
  let remainingBarDuration = 1;

  const pushCurrentBar = () => {
    if (currentBar.length > 0) {
      bars.push(currentBar);
    }

    currentBar = [];
    remainingBarDuration = 1;
  };

  for (
    const { chord, reference } of getResolvedChordProgressionChordReferences(
      rootNote,
      progressionOrKey,
    )
  ) {
    let remainingChordDuration = chord.durationInBars;

    if (
      !Number.isFinite(remainingChordDuration) ||
      remainingChordDuration <= BAR_DURATION_EPSILON
    ) {
      continue;
    }

    while (remainingChordDuration > BAR_DURATION_EPSILON) {
      currentBar.push(reference);

      const filledDuration = Math.min(
        remainingChordDuration,
        remainingBarDuration,
      );

      remainingChordDuration -= filledDuration;
      remainingBarDuration -= filledDuration;

      if (remainingBarDuration <= BAR_DURATION_EPSILON) {
        pushCurrentBar();
      }
    }
  }

  pushCurrentBar();

  return bars;
}

/**
 * Returns duration-aware chord references in song/practice order.
 *
 * This flattens `getChordProgressionChordReferencesByBar`, so a 2-bar chord
 * appears twice and split bars preserve their left-to-right order.
 */
export function getChordProgressionSongChordReferences(
  rootNote: RootNote,
  progressionOrKey: ChordProgression | ChordProgressionKey,
): ChordProgressionChordReference[] {
  return getChordProgressionChordReferencesByBar(
    rootNote,
    progressionOrKey,
  ).flat();
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
