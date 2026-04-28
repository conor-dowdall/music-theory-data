import {
  type ChordProgressionTemplateKey,
  chordProgressionTemplates,
} from "../data/chord-progressions/mod.ts";
import type {
  ChordProgressionTemplate,
  ChordProgressionTemplateCategory,
  ChordProgressionTemplateStep,
  ChordProgressionTemplateType,
} from "../types/chord-progressions.d.ts";
import type { ChordQuality } from "../types/chords.d.ts";
import type { Interval, RootNote } from "../data/labels/note-labels.ts";
import { getRomanNumeralForScaleIndexAndChordQuality } from "./chords.ts";
import { getNoteNamesForRootAndIntervals } from "./note-names.ts";

const INTERVAL_REGEX = /^([𝄫♭♮♯𝄪]*)([1-7])$/;

export interface ChordProgressionTemplateSearchOptions {
  query?: string;
  category?: ChordProgressionTemplateCategory;
  templateType?: ChordProgressionTemplateType;
  type?: string;
}

export function isValidChordProgressionTemplateKey(
  key: string,
): key is ChordProgressionTemplateKey {
  return Object.prototype.hasOwnProperty.call(chordProgressionTemplates, key);
}

function flattenTemplateSteps(
  template: ChordProgressionTemplate,
): ChordProgressionTemplateStep[] {
  return template.sections.flatMap((section) => section.chords);
}

function normalizeSearchTerm(str: string): string {
  return str
    .trim()
    .replaceAll("-", " ")
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function getSearchableTemplateText(
  template: ChordProgressionTemplate,
): string {
  return [
    template.primaryName,
    template.templateType,
    template.category,
    ...template.names,
    ...template.type,
    ...template.characteristics,
    ...getChordProgressionTemplateDegreeNames(template),
    ...getChordProgressionTemplateRomanNames(template),
  ]
    .map(normalizeSearchTerm)
    .join(" ");
}

export function searchChordProgressionTemplates(
  options: ChordProgressionTemplateSearchOptions = {},
): ChordProgressionTemplate[] {
  const { query, category, templateType, type } = options;
  let candidates = Object.values(chordProgressionTemplates);

  if (category) {
    candidates = candidates.filter((template) =>
      template.category === category
    );
  }

  if (templateType) {
    candidates = candidates.filter((template) =>
      template.templateType === templateType
    );
  }

  if (type) {
    const normalizedType = normalizeSearchTerm(type);
    candidates = candidates.filter((template) =>
      template.type.map(normalizeSearchTerm).includes(normalizedType)
    );
  }

  if (!query) return candidates;

  const normalizedQuery = normalizeSearchTerm(query);
  if (!normalizedQuery) return candidates;

  const queryWords = normalizedQuery.split(" ");
  const textFilteredCandidates = candidates.filter((template) => {
    const searchableText = getSearchableTemplateText(template);
    return queryWords.every((word) => searchableText.includes(word));
  });

  const prioritizedResults = new Set<ChordProgressionTemplate>();
  const passes = [
    (template: ChordProgressionTemplate) =>
      normalizeSearchTerm(template.primaryName) === normalizedQuery,
    (template: ChordProgressionTemplate) =>
      template.names.some((name) =>
        normalizeSearchTerm(name) === normalizedQuery
      ),
    (template: ChordProgressionTemplate) =>
      normalizeSearchTerm(template.primaryName).startsWith(normalizedQuery),
    (template: ChordProgressionTemplate) =>
      template.names.some((name) =>
        normalizeSearchTerm(name).startsWith(normalizedQuery)
      ),
  ];

  for (const pass of passes) {
    for (const template of textFilteredCandidates) {
      if (pass(template)) prioritizedResults.add(template);
    }
  }

  for (const template of textFilteredCandidates) {
    prioritizedResults.add(template);
  }

  return Array.from(prioritizedResults);
}

export function findChordProgressionTemplate(
  options: ChordProgressionTemplateSearchOptions = {},
): ChordProgressionTemplate | undefined {
  return searchChordProgressionTemplates(options)[0];
}

function resolveTemplate(
  templateOrKey: ChordProgressionTemplate | ChordProgressionTemplateKey,
): ChordProgressionTemplate | undefined {
  if (typeof templateOrKey !== "string") return templateOrKey;
  return chordProgressionTemplates[templateOrKey];
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

export function getChordProgressionTemplateDegreeNames(
  templateOrKey: ChordProgressionTemplate | ChordProgressionTemplateKey,
): string[] {
  const template = resolveTemplate(templateOrKey);
  if (!template) return [];

  return flattenTemplateSteps(template).map((step) =>
    step.interval + step.quality
  );
}

export function getChordProgressionTemplateRomanNames(
  templateOrKey: ChordProgressionTemplate | ChordProgressionTemplateKey,
): string[] {
  const template = resolveTemplate(templateOrKey);
  if (!template) return [];

  return flattenTemplateSteps(template).flatMap((step) => {
    const roman = getRomanNumeralForIntervalAndChordQuality(
      step.interval,
      step.quality,
    );
    return roman ? [roman] : [];
  });
}

export function getChordProgressionTemplateChordNames(
  rootNote: RootNote,
  templateOrKey: ChordProgressionTemplate | ChordProgressionTemplateKey,
): string[] {
  const template = resolveTemplate(templateOrKey);
  if (!template) return [];

  const steps = flattenTemplateSteps(template);
  const noteNames = getNoteNamesForRootAndIntervals(
    rootNote,
    steps.map((step) => step.interval),
  );

  return noteNames.map((noteName, i) => noteName + steps[i].quality);
}
