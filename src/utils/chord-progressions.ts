import {
  type ChordProgressionCuratedCollectionKey,
  chordProgressionFamilies,
  type ChordProgressionFamilyKey,
  type ChordProgressionFormKey,
  chordProgressionForms,
  type ChordProgressionRealizationKey,
  chordProgressionRealizations,
  curatedChordProgressionCollections,
  getChordProgressionStepNoteCollectionKey,
} from "../data/chord-progressions/mod.ts";
import type {
  ChordProgressionCuratedCollection,
  ChordProgressionFamily,
  ChordProgressionForm,
  ChordProgressionHarmonySpan,
  ChordProgressionIdiom,
  ChordProgressionPedagogyLevel,
  ChordProgressionRealization,
  ChordProgressionTimelineSpan,
  ChordProgressionTonalContext,
  ChordProgressionUsage,
} from "../types/chord-progressions.d.ts";
import type { ChordQuality } from "../types/chords.d.ts";
import type { Interval, RootNote } from "../data/labels/note-labels.ts";
import type { NoteCollectionKey } from "../data/note-collections/mod.ts";
import { getRomanNumeralForScaleIndexAndChordQuality } from "./chords.ts";
import { getNoteNamesForRootAndIntervals } from "./note-names.ts";

const INTERVAL_REGEX = /^([𝄫♭♮♯𝄪]*)([1-7])$/;

interface ChordProgressionFacetSearchOptions {
  query?: string;
  idiom?: ChordProgressionIdiom;
  tonalContext?: ChordProgressionTonalContext;
  pedagogyLevel?: ChordProgressionPedagogyLevel;
  usage?: ChordProgressionUsage;
  tag?: string;
}

export interface ChordProgressionFamilySearchOptions
  extends ChordProgressionFacetSearchOptions {}

export interface ChordProgressionRealizationSearchOptions
  extends ChordProgressionFacetSearchOptions {
  familyId?: string;
  formId?: string;
}

export interface ChordProgressionFormSearchOptions {
  query?: string;
  tag?: string;
}

export interface ChordProgressionCuratedCollectionSearchOptions {
  query?: string;
  tag?: string;
  realizationId?: string;
}

export interface ChordProgressionNamedTimelineSpan
  extends ChordProgressionTimelineSpan {
  readonly chordName: string;
  readonly romanName?: string;
  readonly noteCollectionKey?: NoteCollectionKey;
}

export function isValidChordProgressionFamilyKey(
  key: string,
): key is ChordProgressionFamilyKey {
  return Object.prototype.hasOwnProperty.call(chordProgressionFamilies, key);
}

export function isValidChordProgressionRealizationKey(
  key: string,
): key is ChordProgressionRealizationKey {
  return Object.prototype.hasOwnProperty.call(
    chordProgressionRealizations,
    key,
  );
}

export function isValidChordProgressionFormKey(
  key: string,
): key is ChordProgressionFormKey {
  return Object.prototype.hasOwnProperty.call(chordProgressionForms, key);
}

export function isValidChordProgressionCuratedCollectionKey(
  key: string,
): key is ChordProgressionCuratedCollectionKey {
  return Object.prototype.hasOwnProperty.call(
    curatedChordProgressionCollections,
    key,
  );
}

function normalizeSearchTerm(str: string): string {
  return str
    .trim()
    .replaceAll("-", " ")
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function matchesNormalizedTag(tags: readonly string[], tag: string): boolean {
  const normalizedTag = normalizeSearchTerm(tag);
  return tags.map(normalizeSearchTerm).includes(normalizedTag);
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

function flattenRealizationSpans(
  realization: ChordProgressionRealization,
): ChordProgressionHarmonySpan[] {
  return realization.sections.flatMap((section) => section.spans);
}

function getSearchableFamilyText(family: ChordProgressionFamily): string {
  return [
    family.id,
    family.primaryName,
    family.summary,
    ...family.aliases,
    ...family.tags,
    ...family.idioms,
    family.tonalContext,
    family.pedagogyLevel,
    ...family.usages,
    ...getDegreeNamesForShapes(family.formula),
    ...getRomanNumeralNamesForShapes(family.formula),
  ]
    .map(normalizeSearchTerm)
    .join(" ");
}

function getSearchableRealizationText(
  realization: ChordProgressionRealization,
): string {
  const family = getChordProgressionFamilyForRealization(realization);
  const form = getChordProgressionFormForRealization(realization);

  return [
    realization.id,
    realization.primaryName,
    realization.summary,
    ...realization.aliases,
    ...realization.tags,
    ...realization.idioms,
    realization.tonalContext,
    realization.pedagogyLevel,
    ...realization.usages,
    ...realization.sections.map((section) => section.label),
    ...flattenRealizationSpans(realization).flatMap((span) => [
      span.harmonicFunction ?? "",
      span.cue ?? "",
    ]),
    ...getDegreeNamesForShapes(flattenRealizationSpans(realization)),
    ...getRomanNumeralNamesForShapes(flattenRealizationSpans(realization)),
    family?.primaryName ?? "",
    family?.summary ?? "",
    ...(family?.aliases ?? []),
    ...(family?.tags ?? []),
    form?.primaryName ?? "",
    form?.summary ?? "",
    ...(form?.aliases ?? []),
    ...(form?.tags ?? []),
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
    ...form.tags,
    ...form.sections.map((section) => section.label),
  ]
    .map(normalizeSearchTerm)
    .join(" ");
}

function getSearchableCuratedCollectionText(
  collection: ChordProgressionCuratedCollection,
): string {
  return [
    collection.id,
    collection.displayName,
    collection.description,
    ...collection.tags,
    ...collection.realizationIds,
  ]
    .map(normalizeSearchTerm)
    .join(" ");
}

function passesFacetFilters(
  item: {
    idioms: readonly ChordProgressionIdiom[];
    tonalContext: ChordProgressionTonalContext;
    pedagogyLevel: ChordProgressionPedagogyLevel;
    usages: readonly ChordProgressionUsage[];
    tags: readonly string[];
  },
  options: ChordProgressionFacetSearchOptions,
): boolean {
  if (options.idiom && !item.idioms.includes(options.idiom)) return false;
  if (options.tonalContext && item.tonalContext !== options.tonalContext) {
    return false;
  }
  if (
    options.pedagogyLevel && item.pedagogyLevel !== options.pedagogyLevel
  ) {
    return false;
  }
  if (options.usage && !item.usages.includes(options.usage)) return false;
  if (options.tag && !matchesNormalizedTag(item.tags, options.tag)) {
    return false;
  }
  return true;
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

export function searchChordProgressionFamilies(
  options: ChordProgressionFamilySearchOptions = {},
): ChordProgressionFamily[] {
  const filtered = Object.values(chordProgressionFamilies).filter((family) =>
    passesFacetFilters(family, options)
  );

  return applyTextSearch(
    filtered,
    options.query,
    getSearchableFamilyText,
    (family) => family.primaryName,
    (family) => family.aliases,
  );
}

export function findChordProgressionFamily(
  options: ChordProgressionFamilySearchOptions = {},
): ChordProgressionFamily | undefined {
  return searchChordProgressionFamilies(options)[0];
}

export function searchChordProgressionRealizations(
  options: ChordProgressionRealizationSearchOptions = {},
): ChordProgressionRealization[] {
  const filtered = Object.values(chordProgressionRealizations).filter(
    (realization) => {
      if (!passesFacetFilters(realization, options)) return false;
      if (options.familyId && realization.familyId !== options.familyId) {
        return false;
      }
      if (options.formId && realization.formId !== options.formId) return false;
      return true;
    },
  );

  return applyTextSearch(
    filtered,
    options.query,
    getSearchableRealizationText,
    (realization) => realization.primaryName,
    (realization) => realization.aliases,
  );
}

export function findChordProgressionRealization(
  options: ChordProgressionRealizationSearchOptions = {},
): ChordProgressionRealization | undefined {
  return searchChordProgressionRealizations(options)[0];
}

export function searchChordProgressionForms(
  options: ChordProgressionFormSearchOptions = {},
): ChordProgressionForm[] {
  let filtered = Object.values(chordProgressionForms);

  if (options.tag) {
    filtered = filtered.filter((form) =>
      matchesNormalizedTag(form.tags, options.tag!)
    );
  }

  return applyTextSearch(
    filtered,
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

export function searchCuratedChordProgressionCollections(
  options: ChordProgressionCuratedCollectionSearchOptions = {},
): ChordProgressionCuratedCollection[] {
  let filtered = Object.values(curatedChordProgressionCollections);

  if (options.tag) {
    filtered = filtered.filter((collection) =>
      matchesNormalizedTag(collection.tags, options.tag!)
    );
  }

  if (options.realizationId) {
    filtered = filtered.filter((collection) =>
      collection.realizationIds.includes(options.realizationId!)
    );
  }

  return applyTextSearch(
    filtered,
    options.query,
    getSearchableCuratedCollectionText,
    (collection) => collection.displayName,
    () => [],
  );
}

export function findCuratedChordProgressionCollection(
  options: ChordProgressionCuratedCollectionSearchOptions = {},
): ChordProgressionCuratedCollection | undefined {
  return searchCuratedChordProgressionCollections(options)[0];
}

function resolveFamily(
  familyOrKey: ChordProgressionFamily | ChordProgressionFamilyKey,
): ChordProgressionFamily | undefined {
  if (typeof familyOrKey !== "string") return familyOrKey;
  return chordProgressionFamilies[familyOrKey];
}

function resolveRealization(
  realizationOrKey:
    | ChordProgressionRealization
    | ChordProgressionRealizationKey,
): ChordProgressionRealization | undefined {
  if (typeof realizationOrKey !== "string") return realizationOrKey;
  return chordProgressionRealizations[realizationOrKey];
}

function resolveForm(
  formOrKey: ChordProgressionForm | ChordProgressionFormKey,
): ChordProgressionForm | undefined {
  if (typeof formOrKey !== "string") return formOrKey;
  return chordProgressionForms[formOrKey];
}

function resolveCuratedCollection(
  collectionOrKey:
    | ChordProgressionCuratedCollection
    | ChordProgressionCuratedCollectionKey,
): ChordProgressionCuratedCollection | undefined {
  if (typeof collectionOrKey !== "string") return collectionOrKey;
  return curatedChordProgressionCollections[collectionOrKey];
}

export function getChordProgressionFamilyForRealization(
  realizationOrKey:
    | ChordProgressionRealization
    | ChordProgressionRealizationKey,
): ChordProgressionFamily | undefined {
  const realization = resolveRealization(realizationOrKey);
  if (!realization) return undefined;

  return isValidChordProgressionFamilyKey(realization.familyId)
    ? chordProgressionFamilies[realization.familyId]
    : undefined;
}

export function getChordProgressionFormForRealization(
  realizationOrKey:
    | ChordProgressionRealization
    | ChordProgressionRealizationKey,
): ChordProgressionForm | undefined {
  const realization = resolveRealization(realizationOrKey);
  if (!realization?.formId) return undefined;

  return isValidChordProgressionFormKey(realization.formId)
    ? chordProgressionForms[realization.formId]
    : undefined;
}

export function getChordProgressionRealizationsForCuratedCollection(
  collectionOrKey:
    | ChordProgressionCuratedCollection
    | ChordProgressionCuratedCollectionKey,
): ChordProgressionRealization[] {
  const collection = resolveCuratedCollection(collectionOrKey);
  if (!collection) return [];

  return collection.realizationIds.flatMap((id) =>
    isValidChordProgressionRealizationKey(id)
      ? [chordProgressionRealizations[id]]
      : []
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

export function getChordProgressionFamilyDegreeNames(
  familyOrKey: ChordProgressionFamily | ChordProgressionFamilyKey,
): string[] {
  const family = resolveFamily(familyOrKey);
  if (!family) return [];

  return getDegreeNamesForShapes(family.formula);
}

export function getChordProgressionFamilyRomanNames(
  familyOrKey: ChordProgressionFamily | ChordProgressionFamilyKey,
): string[] {
  const family = resolveFamily(familyOrKey);
  if (!family) return [];

  return getRomanNumeralNamesForShapes(family.formula);
}

export function getChordProgressionRealizationTimeline(
  realizationOrKey:
    | ChordProgressionRealization
    | ChordProgressionRealizationKey,
): ChordProgressionTimelineSpan[] {
  const realization = resolveRealization(realizationOrKey);
  if (!realization) return [];

  let barCursor = 1;

  return realization.sections.flatMap((section) =>
    section.spans.map((span) => {
      const timelineSpan: ChordProgressionTimelineSpan = {
        ...span,
        sectionId: section.id,
        sectionLabel: section.label,
        startBar: barCursor,
        endBar: barCursor + span.bars,
      };

      barCursor += span.bars;
      return timelineSpan;
    })
  );
}

export function getChordProgressionRealizationDegreeNames(
  realizationOrKey:
    | ChordProgressionRealization
    | ChordProgressionRealizationKey,
): string[] {
  const realization = resolveRealization(realizationOrKey);
  if (!realization) return [];

  return getDegreeNamesForShapes(flattenRealizationSpans(realization));
}

export function getChordProgressionRealizationRomanNames(
  realizationOrKey:
    | ChordProgressionRealization
    | ChordProgressionRealizationKey,
): string[] {
  const realization = resolveRealization(realizationOrKey);
  if (!realization) return [];

  return getRomanNumeralNamesForShapes(flattenRealizationSpans(realization));
}

export function getChordProgressionRealizationChordTimeline(
  rootNote: RootNote,
  realizationOrKey:
    | ChordProgressionRealization
    | ChordProgressionRealizationKey,
): ChordProgressionNamedTimelineSpan[] {
  const timeline = getChordProgressionRealizationTimeline(realizationOrKey);
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

export function getChordProgressionRealizationPaletteChordNames(
  rootNote: RootNote,
  realizationOrKey:
    | ChordProgressionRealization
    | ChordProgressionRealizationKey,
): string[] {
  return Array.from(
    new Set(
      getChordProgressionRealizationChordTimeline(rootNote, realizationOrKey)
        .map((span) => span.chordName),
    ),
  );
}

export function getChordProgressionRealizationNoteCollectionKeys(
  realizationOrKey:
    | ChordProgressionRealization
    | ChordProgressionRealizationKey,
): NoteCollectionKey[] {
  const realization = resolveRealization(realizationOrKey);
  if (!realization) return [];

  return flattenRealizationSpans(realization).flatMap((span) => {
    const noteCollectionKey = span.noteCollectionKey ??
      getChordProgressionStepNoteCollectionKey(span.quality);
    return noteCollectionKey ? [noteCollectionKey] : [];
  });
}

export function getChordProgressionRealizationTotalBars(
  realizationOrKey:
    | ChordProgressionRealization
    | ChordProgressionRealizationKey,
): number {
  const realization = resolveRealization(realizationOrKey);
  if (!realization) return 0;

  return flattenRealizationSpans(realization).reduce(
    (total, span) => total + span.bars,
    0,
  );
}

export function getChordProgressionFormTotalBars(
  formOrKey: ChordProgressionForm | ChordProgressionFormKey,
): number {
  const form = resolveForm(formOrKey);
  if (!form) return 0;

  return form.sections.reduce((total, section) => total + section.bars, 0);
}
