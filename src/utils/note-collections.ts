import {
  type NoteCollectionKey,
  noteCollections,
} from "../data/note-collections/mod.ts";
import type { Interval } from "../data/labels/note-labels.ts";
import type { NoteCollection } from "../types/note-collections.d.ts";

/**
 * Checks if a given string is a valid `NoteCollectionKey`.
 * @param key The string to check.
 * @returns `true` if the key is a valid `NoteCollectionKey`, `false` otherwise.
 */
export function isValidNoteCollectionKey(
  key: string,
): key is NoteCollectionKey {
  return Object.prototype.hasOwnProperty.call(noteCollections, key);
}

const normalizationMap = new Map<string, string>();

const aliasSets: Record<string, string[]> = {
  "♭": ["b", "flat"],
  "♯": ["#", "sharp"],
  "♮": ["n", "natural"],
  "𝄫": ["bb", "doubleflat"],
  "𝄪": ["##", "doublesharp"],

  M: ["maj", "major"],
  m: ["min", "minor"],
  "°": ["dim", "diminished"],
  "+": ["aug", "augmented"],
  ø: ["halfdiminished"],

  "7": ["seventh"],
  dominant: ["dom"],
};

for (const [canonical, aliases] of Object.entries(aliasSets)) {
  for (const alias of aliases) {
    normalizationMap.set(alias, canonical);
  }
}

/**
 * Normalizes a search string by converting aliases to their canonical form,
 * removing non-essential characters, and collapsing whitespace.
 * @param str The string to normalize.
 * @returns A normalized string for searching.
 */
function normalizeSearchTerm(str: string): string {
  // Start with trimming, but preserve original case for now.
  let normalized = str.trim();

  // Iteratively replace all aliases, using a case-insensitive regex.
  // This is crucial because we can't simply lowercase the entire string,
  // as that would merge "M" (major) and "m" (minor) into the same character.
  for (const [alias, canonical] of normalizationMap.entries()) {
    // This regex looks for an alias that is either a whole word (\b)
    // or is immediately followed by a digit (for cases like "b2", "maj7").
    // The "i" flag makes the search case-insensitive.
    const regex = new RegExp(`\\b${alias}(?=[0-9]|\\b)`, "gi");
    normalized = normalized.replace(regex, canonical);
  }

  // Final cleanup: remove non-essential characters and collapse whitespace.
  return normalized.replace(/[-()]/g, "").replace(/\s+/g, " ").trim();
}

/** Search options for finding a note collection. */
export interface SearchOptions {
  /** A text string to search against collection names, aliases, and characteristics. */
  query?: string;
  /** An array of specific intervals that the matching collection must contain. */
  intervals?: Interval[];
  /** A string to filter collections by their mathematical or theoretical type (e.g. "heptatonic"). */
  type?: string;
}

/**
 * Searches the library of musical note collections (scales, chords, modes) based on the provided matching criteria.
 * Supports filtering by text query, required theoretical intervals, and category type.
 * @param options The criteria to use for filtering the collections.
 * @returns An array of `NoteCollection` objects that match the criteria, ranked by relevance if a text query was provided.
 */
export function searchNoteCollections(
  options: SearchOptions,
): NoteCollection[] {
  const { query, intervals, type } = options;
  let candidates = Object.values(noteCollections);

  // 1. Apply hard filters first to narrow down the candidate pool
  if (type) {
    const normalizedType = normalizeSearchTerm(type);
    const searchWords = normalizedType.split(" ");

    candidates = candidates.filter((theme) => {
      const themeTypesString = theme.type.map(normalizeSearchTerm).join(" ");
      return searchWords.every((word) => {
        // Use case-sensitive search for 'M' and 'm'
        const isCaseSensitiveWord = word === "M" || word === "m";
        const regex = new RegExp(
          `\\b${word}\\b`,
          isCaseSensitiveWord ? "" : "i",
        );
        return regex.test(themeTypesString);
      });
    });
  }

  if (intervals && intervals.length > 0) {
    candidates = candidates.filter((theme) =>
      intervals.every((interval) => theme.intervals.includes(interval))
    );
  }

  // If there's no text query, the filtered list is the final result.
  if (!query) {
    return candidates;
  }

  // 2. Apply prioritized text search on the filtered candidates
  const normalizedQuery = normalizeSearchTerm(query);

  if (!normalizedQuery) {
    return candidates;
  }

  const searchWords = normalizedQuery.split(" ");

  // Filter candidates to those that contain all search words
  const textFilteredCandidates = candidates.filter((theme) => {
    const searchableText = [
      theme.primaryName,
      ...theme.names,
      ...theme.type,
      ...theme.characteristics,
    ]
      .map(normalizeSearchTerm)
      .join(" ");

    return searchWords.every((word) => {
      const isCaseSensitiveWord = word === "M" || word === "m";
      const regex = new RegExp(`\\b${word}\\b`, isCaseSensitiveWord ? "" : "i");
      return regex.test(searchableText);
    });
  });

  // 3. Prioritize the filtered results
  const prioritizedResults = new Set<NoteCollection>();

  const passes = [
    // Pass 1: Exact match on primaryName
    (theme: NoteCollection) =>
      normalizeSearchTerm(theme.primaryName) === normalizedQuery,
    // Pass 2: Exact match on any name
    (theme: NoteCollection) =>
      theme.names.some((name) => normalizeSearchTerm(name) === normalizedQuery),
    // Pass 3: Primary name starts with the query
    (theme: NoteCollection) =>
      normalizeSearchTerm(theme.primaryName).startsWith(normalizedQuery),
    // Pass 4: Any name starts with the query
    (theme: NoteCollection) =>
      theme.names.some((name) =>
        normalizeSearchTerm(name).startsWith(normalizedQuery)
      ),
  ];

  for (const pass of passes) {
    for (const theme of textFilteredCandidates) {
      if (pass(theme)) {
        prioritizedResults.add(theme);
      }
    }
  }

  // Add the remaining text-filtered candidates that didn't match a priority pass
  for (const theme of textFilteredCandidates) {
    prioritizedResults.add(theme);
  }

  return Array.from(prioritizedResults);
}

/**
 * Finds the single best matching `NoteCollection` based on search options.
 * This is a convenience wrapper around `searchNoteCollections` that returns only the first result.
 * The search is prioritized to return the most relevant match first.
 * @param options The search options.
 * @returns The best matching `NoteCollection` or `undefined` if no match is found.
 */
export function findNoteCollection(
  options: SearchOptions,
): NoteCollection | undefined {
  return searchNoteCollections(options)[0];
}
