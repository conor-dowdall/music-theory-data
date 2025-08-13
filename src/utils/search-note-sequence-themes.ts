import type { PitchCollection } from "@musodojo/music-theory-data";
import type { Interval } from "../types/labels.d.ts";
import { pitchCollections } from "../data/pitch-collections/mod.ts";

const normalizationMap = new Map<string, string>();

const aliasSets: Record<string, string[]> = {
  "♭": ["b", "flat"],
  "♯": ["#", "sharp"],
  "♮": ["n", "natural"],
  "𝄫": ["bb", "doubleflat"],
  "𝄪": ["##", "doublesharp"],

  "M": ["maj", "major"],
  "m": ["min", "minor"],
  "°": ["dim", "diminished"],
  "+": ["aug", "augmented"],
  "ø": ["halfdiminished"],

  "7": ["seventh"],
  "dominant": ["dom"],
};

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
): PitchCollection[] {
  const { query, intervals, type } = options;
  let candidates = Object.values(pitchCollections);

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
  const prioritizedResults = new Set<PitchCollection>();
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
    (theme: PitchCollection) =>
      normalize(theme.primaryName) === normalizedQuery,
    // Pass 2: Exact match on any name
    (theme: PitchCollection) =>
      theme.names.some((name) => normalize(name) === normalizedQuery),
    // Pass 3: Whole word match on primaryName
    (theme: PitchCollection) => searchRegex.test(normalize(theme.primaryName)),
    // Pass 4: Whole word match on any name
    (theme: PitchCollection) =>
      theme.names.some((name) => searchRegex.test(normalize(name))),
    // Pass 7: Whole word match on any type
    (theme: PitchCollection) =>
      theme.type.some((t) => searchRegex.test(normalize(t))),
    // Pass 8: Whole word match on any characteristic
    (theme: PitchCollection) =>
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
