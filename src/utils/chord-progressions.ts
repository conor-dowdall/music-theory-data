import {
  type ChordProgressionFormKey,
  chordProgressionForms,
  type ChordProgressionKey,
  chordProgressions,
  type ChordProgressionSetKey,
  chordProgressionSets,
  getChordProgressionStepNoteCollectionKey,
} from "../data/chord-progressions/mod.ts";
import type {
  ChordProgression,
  ChordProgressionForm,
  ChordProgressionHarmonySpan,
  ChordProgressionIdiom,
  ChordProgressionSet,
  ChordProgressionTimelineSpan,
  ChordProgressionTonalContext,
} from "../types/chord-progressions.d.ts";
import type { ChordQuality } from "../types/chords.d.ts";
import type { Interval, RootNote } from "../data/labels/note-labels.ts";
import type { NoteCollectionKey } from "../data/note-collections/mod.ts";
import { getRomanNumeralForScaleIndexAndChordQuality } from "./chords.ts";
import { getNoteNamesForRootAndIntervals } from "./note-names.ts";

const INTERVAL_REGEX = /^([𝄫♭♮♯𝄪]*)([1-7])$/;

export interface ChordProgressionSearchOptions {
  query?: string;
  idiom?: ChordProgressionIdiom;
  tonalContext?: ChordProgressionTonalContext;
  formId?: string;
}

export interface ChordProgressionFormSearchOptions {
  query?: string;
}

export interface ChordProgressionSetSearchOptions {
  query?: string;
  progressionId?: string;
}

export interface ChordProgressionNamedTimelineSpan
  extends ChordProgressionTimelineSpan {
  readonly chordName: string;
  readonly romanName?: string;
  readonly noteCollectionKey?: NoteCollectionKey;
}

export function isValidChordProgressionKey(
  key: string,
): key is ChordProgressionKey {
  return Object.prototype.hasOwnProperty.call(chordProgressions, key);
}

export function isValidChordProgressionFormKey(
  key: string,
): key is ChordProgressionFormKey {
  return Object.prototype.hasOwnProperty.call(chordProgressionForms, key);
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

function getRomanNumeralNamesForShapes(
  shapes: readonly Pick<ChordProgressionHarmonySpan, "degree" | "quality">[],
): string[] {
  return shapes.flatMap((shape) => {
    const roman = getRomanNumeralForIntervalAndChordQuality(
      shape.degree,
      shape.quality,
    );
    return roman ? [roman] : [];
  });
}

function getDegreeNamesForShapes(
  shapes: readonly Pick<ChordProgressionHarmonySpan, "degree" | "quality">[],
): string[] {
  return shapes.map((shape) => shape.degree + shape.quality);
}

function getSearchableProgressionText(progression: ChordProgression): string {
  const form = getChordProgressionFormForProgression(progression);
  const formSectionLabels = form?.sections.map((section) => section.label) ??
    [];

  return [
    progression.id,
    progression.primaryName,
    progression.summary ?? "",
    ...progression.aliases,
    ...(progression.idioms ?? []),
    progression.tonalContext ?? "",
    ...progression.spans.flatMap((span) => [
      span.harmonicFunction ?? "",
      span.cue ?? "",
    ]),
    ...getDegreeNamesForShapes(progression.spans),
    ...getRomanNumeralNamesForShapes(progression.spans),
    form?.primaryName ?? "",
    form?.summary ?? "",
    ...(form?.aliases ?? []),
    ...formSectionLabels,
  ]
    .map(normalizeSearchTerm)
    .join(" ");
}

function getSearchableFormText(form: ChordProgressionForm): string {
  return [
    form.id,
    form.primaryName,
    form.summary,
    ...form.aliases,
    ...form.sections.map((section) => section.label),
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
  const filtered = Object.values(chordProgressions).filter((progression) => {
    if (options.idiom && !progression.idioms?.includes(options.idiom)) {
      return false;
    }
    if (
      options.tonalContext &&
      progression.tonalContext !== options.tonalContext
    ) {
      return false;
    }
    if (options.formId && progression.formId !== options.formId) return false;
    return true;
  });

  return applyTextSearch(
    filtered,
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

export function searchChordProgressionForms(
  options: ChordProgressionFormSearchOptions = {},
): ChordProgressionForm[] {
  return applyTextSearch(
    Object.values(chordProgressionForms),
    options.query,
    getSearchableFormText,
    (form) => form.primaryName,
    (form) => form.aliases,
  );
}

export function findChordProgressionForm(
  options: ChordProgressionFormSearchOptions = {},
): ChordProgressionForm | undefined {
  return searchChordProgressionForms(options)[0];
}

export function searchChordProgressionSets(
  options: ChordProgressionSetSearchOptions = {},
): ChordProgressionSet[] {
  let filtered = Object.values(chordProgressionSets);

  if (options.progressionId) {
    filtered = filtered.filter((set) =>
      set.progressionIds.includes(options.progressionId!)
    );
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

function resolveForm(
  formOrKey: ChordProgressionForm | ChordProgressionFormKey,
): ChordProgressionForm | undefined {
  if (typeof formOrKey !== "string") return formOrKey;
  return chordProgressionForms[formOrKey];
}

function resolveSet(
  setOrKey: ChordProgressionSet | ChordProgressionSetKey,
): ChordProgressionSet | undefined {
  if (typeof setOrKey !== "string") return setOrKey;
  return chordProgressionSets[setOrKey];
}

export function getChordProgressionFormForProgression(
  progressionOrKey: ChordProgression | ChordProgressionKey,
): ChordProgressionForm | undefined {
  const progression = resolveProgression(progressionOrKey);
  if (!progression?.formId) return undefined;

  return isValidChordProgressionFormKey(progression.formId)
    ? chordProgressionForms[progression.formId]
    : undefined;
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

  return getDegreeNamesForShapes(progression.spans);
}

export function getChordProgressionRomanNames(
  progressionOrKey: ChordProgression | ChordProgressionKey,
): string[] {
  const progression = resolveProgression(progressionOrKey);
  if (!progression) return [];

  return getRomanNumeralNamesForShapes(progression.spans);
}

function getFormSectionRanges(form: ChordProgressionForm) {
  let barCursor = 1;

  return form.sections.map((section) => {
    const startBar = barCursor;
    const endBar = startBar + section.bars;
    barCursor = endBar;

    return {
      id: section.id,
      label: section.label,
      startBar,
      endBar,
    };
  });
}

export function getChordProgressionTimeline(
  progressionOrKey: ChordProgression | ChordProgressionKey,
): ChordProgressionTimelineSpan[] {
  const progression = resolveProgression(progressionOrKey);
  if (!progression) return [];

  const form = getChordProgressionFormForProgression(progression);
  const sectionRanges = form ? getFormSectionRanges(form) : [];
  let barCursor = 1;

  return progression.spans.map((span) => {
    const startBar = barCursor;
    const endBar = startBar + span.bars;
    barCursor = endBar;

    const section = sectionRanges.find((range) =>
      startBar >= range.startBar && endBar <= range.endBar
    );

    return {
      ...span,
      startBar,
      endBar,
      sectionId: section?.id,
      sectionLabel: section?.label,
    };
  });
}

export function getChordProgressionChordTimeline(
  rootNote: RootNote,
  progressionOrKey: ChordProgression | ChordProgressionKey,
): ChordProgressionNamedTimelineSpan[] {
  const timeline = getChordProgressionTimeline(progressionOrKey);
  if (!timeline.length) return [];

  const noteNames = getNoteNamesForRootAndIntervals(
    rootNote,
    timeline.map((span) => span.degree),
  );

  return timeline.map((span, index) => ({
    ...span,
    chordName: noteNames[index] + span.quality,
    romanName: getRomanNumeralForIntervalAndChordQuality(
      span.degree,
      span.quality,
    ),
    noteCollectionKey: span.noteCollectionKey ??
      getChordProgressionStepNoteCollectionKey(span.quality),
  }));
}

export function getChordProgressionPaletteChordNames(
  rootNote: RootNote,
  progressionOrKey: ChordProgression | ChordProgressionKey,
): string[] {
  return Array.from(
    new Set(
      getChordProgressionChordTimeline(rootNote, progressionOrKey).map((span) =>
        span.chordName
      ),
    ),
  );
}

export function getChordProgressionNoteCollectionKeys(
  progressionOrKey: ChordProgression | ChordProgressionKey,
): NoteCollectionKey[] {
  const progression = resolveProgression(progressionOrKey);
  if (!progression) return [];

  return progression.spans.flatMap((span) => {
    const noteCollectionKey = span.noteCollectionKey ??
      getChordProgressionStepNoteCollectionKey(span.quality);
    return noteCollectionKey ? [noteCollectionKey] : [];
  });
}

export function getChordProgressionTotalBars(
  progressionOrKey: ChordProgression | ChordProgressionKey,
): number {
  const progression = resolveProgression(progressionOrKey);
  if (!progression) return 0;

  return progression.spans.reduce((total, span) => total + span.bars, 0);
}

export function getChordProgressionFormTotalBars(
  formOrKey: ChordProgressionForm | ChordProgressionFormKey,
): number {
  const form = resolveForm(formOrKey);
  if (!form) return 0;

  return form.sections.reduce((total, section) => total + section.bars, 0);
}
