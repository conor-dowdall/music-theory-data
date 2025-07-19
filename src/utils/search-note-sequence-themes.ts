/**
 * @module
 *
 * This module provides a powerful and flexible utility for searching and filtering
 * the library's collection of note sequence themes.
 *
 * It allows for searching by general text query, specific intervals, or theme type,
 * making it useful for musicians and developers at all levels.
 *
 * @example
 * ```ts
 * import { searchNoteSequenceThemes } from "@musodojo/music-theory-data/utils";
 *
 * // A search for "minor"
 * const minorResults = searchNoteSequenceThemes({ query: "minor" });
 *
 * // A search for "b2"
 * const flat2Results = searchNoteSequenceThemes({ query: "b2" });
 *
 * // Advanced search for scales containing specific intervals
 * const scalesWithFlat7 = searchNoteSequenceThemes({
 *   type: "scale",
 *   intervals: ["1", "3", "5", "♭7"],
 * });
 * ```
 */

import type { NoteSequenceTheme } from "../types/note-sequences.d.ts";
import type { Interval } from "../types/note-labels.d.ts";
import { allNoteSequenceThemes } from "../note-sequences/note-sequences.ts";

// --- Normalization --- //

const normalizationMap = new Map<string, string>();

// Systematically define aliases based on the project's type definitions.
const aliasSets: Record<string, string[]> = {
  // From NoteAccidental
  "♭": ["b", "flat"],
  "♯": ["#", "sharp"],
  "♮": ["n", "natural"],
  "𝄫": ["bb", "doubleflat"],
  "𝄪": ["##", "doublesharp"],

  // From TriadQuality & common terms
  "M": ["maj", "major"],
  "m": ["min", "minor"],
  "°": ["dim", "diminished"],
  "+": ["aug", "augmented"],
  "ø": ["halfdiminished"],

  // Other common terms
  "7": ["seventh"],
  "dominant": ["dom"],
};

// Populate the map
for (const [canonical, aliases] of Object.entries(aliasSets)) {
  for (const alias of aliases) {
    normalizationMap.set(alias, canonical);
  }
}

/**
 * Converts a string into a canonical, simplified format for searching.
 * This makes the search case-insensitive and forgiving of aliases.
 * @internal
 */
function normalize(str: string): string {
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

// --- Search Functionality --- //

export interface SearchOptions {
  query?: string;
  intervals?: Interval[];
  type?: string;
}

/**
 * Searches all note sequence themes based on a flexible set of criteria.
 * The search prioritizes results in a musically relevant order:
 * 1. Exact matches on primary name and other names.
 * 2. Partial matches on primary name and other names.
 * 3. Partial matches on type.
 * 4. Partial matches on characteristics.
 *
 * @param options - The search criteria.
 * @returns An array of unique `NoteSequenceTheme` objects that match the criteria.
 */
export function searchNoteSequenceThemes(
  options: SearchOptions,
): NoteSequenceTheme[] {
  const { query, intervals, type } = options;
  let candidates = Object.values(allNoteSequenceThemes);

  // 1. Apply hard filters first to narrow down the candidate pool
  if (type) {
    const normalizedType = normalize(type);
    candidates = candidates.filter((theme) =>
      theme.type.some((t) => normalize(t).includes(normalizedType))
    );
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
  const prioritizedResults = new Set<NoteSequenceTheme>();
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) {
    return candidates;
  }

  // Use case-sensitive search for "M" and "m" to avoid incorrect matches.
  const isCaseSensitiveQuery = normalizedQuery === "M" ||
    normalizedQuery === "m";
  const regexFlags = isCaseSensitiveQuery ? "" : "i";
  const searchRegex = new RegExp(`\\b${normalizedQuery}\\b`, regexFlags);

  const passes = [
    // Pass 1: Exact match on primaryName
    (theme: NoteSequenceTheme) =>
      normalize(theme.primaryName) === normalizedQuery,
    // Pass 2: Exact match on any name
    (theme: NoteSequenceTheme) =>
      theme.names.some((name) => normalize(name) === normalizedQuery),
    // Pass 3: Whole word match on primaryName
    (theme: NoteSequenceTheme) =>
      searchRegex.test(normalize(theme.primaryName)),
    // Pass 4: Whole word match on any name
    (theme: NoteSequenceTheme) =>
      theme.names.some((name) => searchRegex.test(normalize(name))),
    // Pass 7: Whole word match on any type
    (theme: NoteSequenceTheme) =>
      theme.type.some((t) => searchRegex.test(normalize(t))),
    // Pass 8: Whole word match on any characteristic
    (theme: NoteSequenceTheme) =>
      theme.characteristics.some((c) => searchRegex.test(normalize(c))),
  ];

  for (const pass of passes) {
    for (const theme of candidates) {
      if (pass(theme)) {
        prioritizedResults.add(theme);
      }
    }
  }

  return Array.from(prioritizedResults);
}
