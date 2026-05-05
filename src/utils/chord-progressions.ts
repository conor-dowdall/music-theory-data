import {
  type ChordProgressionKey,
  chordProgressions,
  type ChordProgressionSetKey,
  chordProgressionSets,
  getChordProgressionStepNoteCollectionKey,
} from "../data/chord-progressions/mod.ts";
import type {
  ChordProgression,
  ChordProgressionChange,
  ChordProgressionSet,
  ChordProgressionTimelineChange,
} from "../types/chord-progressions.d.ts";
import type { ChordQuality } from "../types/chords.d.ts";
import type { Interval, RootNote } from "../data/labels/note-labels.ts";
import type { NoteCollectionKey } from "../data/note-collections/mod.ts";
import { getRomanNumeralForScaleIndexAndChordQuality } from "./chords.ts";
import { getNoteNamesForRootAndIntervals } from "./note-names.ts";

const INTERVAL_REGEX = /^([𝄫♭♮♯𝄪]*)([1-7])$/;

export interface ChordProgressionSearchOptions {
  query?: string;
}

export interface ChordProgressionSetSearchOptions {
  query?: string;
  progressionId?: string;
}

export interface ChordProgressionNamedTimelineChange
  extends ChordProgressionTimelineChange {
  readonly chordName: string;
  readonly romanName?: string;
  readonly noteCollectionKey?: NoteCollectionKey;
}

export function isValidChordProgressionKey(
  key: string,
): key is ChordProgressionKey {
  return Object.prototype.hasOwnProperty.call(chordProgressions, key);
}

export function isValidChordProgressionSetKey(
  key: string,
): key is ChordProgressionSetKey {
  return Object.prototype.hasOwnProperty.call(chordProgressionSets, key);
}

function normalizeSearchTerm(str: string): string {
  return str
    .trim()
    .replaceAll("-", " ")
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function getRomanNumeralNamesForChanges(
  changes: readonly Pick<ChordProgressionChange, "degree" | "quality">[],
): string[] {
  return changes.flatMap((change) => {
    const roman = getRomanNumeralForIntervalAndChordQuality(
      change.degree,
      change.quality,
    );
    return roman ? [roman] : [];
  });
}

function getDegreeNamesForChanges(
  changes: readonly Pick<ChordProgressionChange, "degree" | "quality">[],
): string[] {
  return changes.map((change) => change.degree + change.quality);
}

function getSearchableProgressionText(progression: ChordProgression): string {
  const totalBars = progression.changes.reduce(
    (total, change) => total + change.bars,
    0,
  );

  return [
    progression.id,
    progression.primaryName,
    progression.summary ?? "",
    ...progression.aliases,
    ...getDegreeNamesForChanges(progression.changes),
    ...getRomanNumeralNamesForChanges(progression.changes),
    `${totalBars} bar`,
  ]
    .map(normalizeSearchTerm)
    .join(" ");
}

function getSearchableSetText(set: ChordProgressionSet): string {
  return [
    set.id,
    set.displayName,
    set.description,
    ...set.progressionIds,
  ]
    .map(normalizeSearchTerm)
    .join(" ");
}

function applyTextSearch<T>(
  items: readonly T[],
  query: string | undefined,
  getSearchableText: (item: T) => string,
  getPrimaryName: (item: T) => string,
  getAliases: (item: T) => readonly string[],
): T[] {
  if (!query) return [...items];

  const normalizedQuery = normalizeSearchTerm(query);
  if (!normalizedQuery) return [...items];

  const queryWords = normalizedQuery.split(" ");
  const filtered = items.filter((item) => {
    const searchableText = getSearchableText(item);
    return queryWords.every((word) => searchableText.includes(word));
  });

  const prioritized = new Set<T>();
  const passes = [
    (item: T) => normalizeSearchTerm(getPrimaryName(item)) === normalizedQuery,
    (item: T) =>
      getAliases(item).some((alias) =>
        normalizeSearchTerm(alias) === normalizedQuery
      ),
    (item: T) =>
      normalizeSearchTerm(getPrimaryName(item)).startsWith(normalizedQuery),
    (item: T) =>
      getAliases(item).some((alias) =>
        normalizeSearchTerm(alias).startsWith(normalizedQuery)
      ),
  ];

  for (const pass of passes) {
    for (const item of filtered) {
      if (pass(item)) prioritized.add(item);
    }
  }

  for (const item of filtered) {
    prioritized.add(item);
  }

  return Array.from(prioritized);
}

export function searchChordProgressions(
  options: ChordProgressionSearchOptions = {},
): ChordProgression[] {
  return applyTextSearch(
    Object.values(chordProgressions),
    options.query,
    getSearchableProgressionText,
    (progression) => progression.primaryName,
    (progression) => progression.aliases,
  );
}

export function findChordProgression(
  options: ChordProgressionSearchOptions = {},
): ChordProgression | undefined {
  return searchChordProgressions(options)[0];
}

export function searchChordProgressionSets(
  options: ChordProgressionSetSearchOptions = {},
): ChordProgressionSet[] {
  let filtered = Object.values(chordProgressionSets);

  if (options.progressionId) {
    filtered = filtered.filter((set) =>
      set.progressionIds.includes(options.progressionId!)
    ).sort((a, b) => a.progressionIds.length - b.progressionIds.length);
  }

  return applyTextSearch(
    filtered,
    options.query,
    getSearchableSetText,
    (set) => set.displayName,
    () => [],
  );
}

export function findChordProgressionSet(
  options: ChordProgressionSetSearchOptions = {},
): ChordProgressionSet | undefined {
  return searchChordProgressionSets(options)[0];
}

function resolveProgression(
  progressionOrKey: ChordProgression | ChordProgressionKey,
): ChordProgression | undefined {
  if (typeof progressionOrKey !== "string") return progressionOrKey;
  return chordProgressions[progressionOrKey];
}

function resolveSet(
  setOrKey: ChordProgressionSet | ChordProgressionSetKey,
): ChordProgressionSet | undefined {
  if (typeof setOrKey !== "string") return setOrKey;
  return chordProgressionSets[setOrKey];
}

export function getChordProgressionsForSet(
  setOrKey: ChordProgressionSet | ChordProgressionSetKey,
): ChordProgression[] {
  const set = resolveSet(setOrKey);
  if (!set) return [];

  return set.progressionIds.flatMap((id) =>
    isValidChordProgressionKey(id) ? [chordProgressions[id]] : []
  );
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

  return getDegreeNamesForChanges(progression.changes);
}

export function getChordProgressionRomanNames(
  progressionOrKey: ChordProgression | ChordProgressionKey,
): string[] {
  const progression = resolveProgression(progressionOrKey);
  if (!progression) return [];

  return getRomanNumeralNamesForChanges(progression.changes);
}

export function getChordProgressionTimeline(
  progressionOrKey: ChordProgression | ChordProgressionKey,
): ChordProgressionTimelineChange[] {
  const progression = resolveProgression(progressionOrKey);
  if (!progression) return [];

  let barCursor = 1;

  return progression.changes.map((change) => {
    const startBar = barCursor;
    const endBar = startBar + change.bars;
    barCursor = endBar;

    return {
      ...change,
      startBar,
      endBar,
    };
  });
}

export function getChordProgressionChordTimeline(
  rootNote: RootNote,
  progressionOrKey: ChordProgression | ChordProgressionKey,
): ChordProgressionNamedTimelineChange[] {
  const timeline = getChordProgressionTimeline(progressionOrKey);
  if (!timeline.length) return [];

  const noteNames = getNoteNamesForRootAndIntervals(
    rootNote,
    timeline.map((change) => change.degree),
  );

  return timeline.map((change, index) => ({
    ...change,
    chordName: noteNames[index] + change.quality,
    romanName: getRomanNumeralForIntervalAndChordQuality(
      change.degree,
      change.quality,
    ),
    noteCollectionKey: getChordProgressionStepNoteCollectionKey(change.quality),
  }));
}

export function getChordProgressionPaletteChordNames(
  rootNote: RootNote,
  progressionOrKey: ChordProgression | ChordProgressionKey,
): string[] {
  return Array.from(
    new Set(
      getChordProgressionChordTimeline(rootNote, progressionOrKey).map(
        (change) => change.chordName,
      ),
    ),
  );
}

export function getChordProgressionNoteCollectionKeys(
  progressionOrKey: ChordProgression | ChordProgressionKey,
): NoteCollectionKey[] {
  const progression = resolveProgression(progressionOrKey);
  if (!progression) return [];

  return progression.changes.flatMap((change) => {
    const noteCollectionKey = getChordProgressionStepNoteCollectionKey(
      change.quality,
    );
    return noteCollectionKey ? [noteCollectionKey] : [];
  });
}

export function getChordProgressionTotalBars(
  progressionOrKey: ChordProgression | ChordProgressionKey,
): number {
  const progression = resolveProgression(progressionOrKey);
  if (!progression) return 0;

  return progression.changes.reduce((total, change) => total + change.bars, 0);
}
