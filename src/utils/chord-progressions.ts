import {
  type ChordProgressionKey,
  chordProgressions,
} from "../data/chord-progressions/mod.ts";
import { getChordQualityNoteCollectionKey } from "../data/chords/mod.ts";
import type {
  ChordProgression,
  ChordProgressionChord,
  ChordProgressionTimelineChord,
} from "../types/chord-progressions.d.ts";
import type { ChordQuality } from "../types/chords.d.ts";
import type { Interval, RootNote } from "../data/labels/note-labels.ts";
import type { NoteCollectionKey } from "../data/note-collections/mod.ts";
import { getRomanNumeralForScaleIndexAndChordQuality } from "./chords.ts";
import { getNoteNamesForRootAndIntervals } from "./note-names.ts";

const INTERVAL_REGEX = /^([𝄫♭♮♯𝄪]*)([1-7])$/;

export interface ChordProgressionEntry {
  readonly key: ChordProgressionKey;
  readonly progression: ChordProgression;
}

export interface ChordProgressionDurationGroup {
  readonly totalDurationInBars: number;
  readonly displayName: string;
  readonly progressions: readonly ChordProgressionEntry[];
}

export interface ChordProgressionNamedTimelineChord
  extends ChordProgressionTimelineChord {
  readonly chordName: string;
  readonly romanName?: string;
  readonly noteCollectionKey: NoteCollectionKey;
}

export function isValidChordProgressionKey(
  key: string,
): key is ChordProgressionKey {
  return Object.prototype.hasOwnProperty.call(chordProgressions, key);
}

function getRomanNumeralNamesForChords(
  chords: readonly Pick<ChordProgressionChord, "degree" | "quality">[],
): string[] {
  return chords.flatMap((chord) => {
    const roman = getRomanNumeralForIntervalAndChordQuality(
      chord.degree,
      chord.quality,
    );
    return roman ? [roman] : [];
  });
}

function getDegreeNamesForChords(
  chords: readonly Pick<ChordProgressionChord, "degree" | "quality">[],
): string[] {
  return chords.map((chord) => chord.degree + chord.quality);
}

export function getChordProgressionEntries(): ChordProgressionEntry[] {
  return Object.entries(chordProgressions).map(([key, progression]) => ({
    key: key as ChordProgressionKey,
    progression,
  }));
}

export function getChordProgressionDurationGroups(): ChordProgressionDurationGroup[] {
  const groups = new Map<number, ChordProgressionEntry[]>();

  for (const entry of getChordProgressionEntries()) {
    const totalDurationInBars = getChordProgressionTotalDurationInBars(
      entry.progression,
    );
    const existing = groups.get(totalDurationInBars);

    if (existing) {
      existing.push(entry);
      continue;
    }

    groups.set(totalDurationInBars, [entry]);
  }

  return Array.from(groups.entries())
    .sort(([a], [b]) => a - b)
    .map(([totalDurationInBars, progressions]) => ({
      totalDurationInBars,
      displayName: `${totalDurationInBars}-Bar Loops`,
      progressions,
    }));
}

function resolveProgression(
  progressionOrKey: ChordProgression | ChordProgressionKey,
): ChordProgression | undefined {
  if (typeof progressionOrKey !== "string") return progressionOrKey;
  return chordProgressions[progressionOrKey];
}

export function getRomanNumeralForIntervalAndChordQuality(
  interval: Interval,
  quality: ChordQuality,
): string | undefined {
  const match = interval.match(INTERVAL_REGEX);
  if (!match) return undefined;

  const [, accidental, intervalNumber] = match;
  const roman = getRomanNumeralForScaleIndexAndChordQuality(
    Number(intervalNumber) - 1,
    quality,
  );

  return roman === undefined ? undefined : accidental + roman;
}

export function getChordProgressionDegreeNames(
  progressionOrKey: ChordProgression | ChordProgressionKey,
): string[] {
  const progression = resolveProgression(progressionOrKey);
  if (!progression) return [];

  return getDegreeNamesForChords(progression.chords);
}

export function getChordProgressionRomanNames(
  progressionOrKey: ChordProgression | ChordProgressionKey,
): string[] {
  const progression = resolveProgression(progressionOrKey);
  if (!progression) return [];

  return getRomanNumeralNamesForChords(progression.chords);
}

export function getChordProgressionTimeline(
  progressionOrKey: ChordProgression | ChordProgressionKey,
): ChordProgressionTimelineChord[] {
  const progression = resolveProgression(progressionOrKey);
  if (!progression) return [];

  let barCursor = 1;

  return progression.chords.map((chord) => {
    const startBar = barCursor;
    const endBar = startBar + chord.durationInBars;
    barCursor = endBar;

    return {
      ...chord,
      startBar,
      endBar,
    };
  });
}

export function getChordProgressionChordTimeline(
  rootNote: RootNote,
  progressionOrKey: ChordProgression | ChordProgressionKey,
): ChordProgressionNamedTimelineChord[] {
  const timeline = getChordProgressionTimeline(progressionOrKey);
  if (!timeline.length) return [];

  const noteNames = getNoteNamesForRootAndIntervals(
    rootNote,
    timeline.map((chord) => chord.degree),
  );

  return timeline.map((chord, index) => ({
    ...chord,
    chordName: noteNames[index] + chord.quality,
    romanName: getRomanNumeralForIntervalAndChordQuality(
      chord.degree,
      chord.quality,
    ),
    noteCollectionKey: getChordQualityNoteCollectionKey(chord.quality),
  }));
}

export function getChordProgressionPaletteChordNames(
  rootNote: RootNote,
  progressionOrKey: ChordProgression | ChordProgressionKey,
): string[] {
  return Array.from(
    new Set(
      getChordProgressionChordTimeline(rootNote, progressionOrKey).map(
        (chord) => chord.chordName,
      ),
    ),
  );
}

export function getChordProgressionNoteCollectionKeys(
  progressionOrKey: ChordProgression | ChordProgressionKey,
): NoteCollectionKey[] {
  const progression = resolveProgression(progressionOrKey);
  if (!progression) return [];

  return progression.chords.map((chord) =>
    getChordQualityNoteCollectionKey(chord.quality)
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
