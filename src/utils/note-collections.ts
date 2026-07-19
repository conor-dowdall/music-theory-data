import {
  type NoteCollectionKey,
  noteCollections,
} from "../data/note-collections/mod.ts";
import type { ChromaticIndex } from "../data/chromatic.ts";
import {
  type Interval,
  rootNoteToIntegerMap,
} from "../data/labels/note-labels.ts";
import type {
  CollectionCategory,
  NoteCollection,
} from "../types/note-collections.ts";
import { normalizeChromaticIndex } from "./chromatic.ts";
import { normalizeRootNoteString } from "./note-names.ts";

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

/** Input for resolving the absolute pitch classes in a rooted note collection. */
export interface GetNoteCollectionPitchClassesParams {
  /** The root note to transpose the collection from, accepting ASCII accidentals such as `Bb` or `F#`. */
  rootNote: string;
  /** The built-in note collection key to resolve. */
  noteCollectionKey: NoteCollectionKey | string;
}

/**
 * Returns the absolute chromatic pitch classes for a root note and note
 * collection key, or `undefined` when either value cannot be resolved.
 */
export function getNoteCollectionPitchClasses({
  rootNote: rawRootNote,
  noteCollectionKey,
}: GetNoteCollectionPitchClassesParams):
  | ReadonlySet<ChromaticIndex>
  | undefined {
  const rootNote = normalizeRootNoteString(rawRootNote);
  if (!rootNote || !isValidNoteCollectionKey(noteCollectionKey)) {
    return undefined;
  }

  const rootInteger = rootNoteToIntegerMap.get(rootNote);
  if (rootInteger === undefined) return undefined;

  const collection = noteCollections[noteCollectionKey];
  const pitchClasses = collection.integers.map((interval) =>
    normalizeChromaticIndex(rootInteger + interval)
  );

  return new Set(pitchClasses);
}

/** Display names keyed by note collection id, using each collection's `primaryName`. */
export const noteCollectionDisplayNames: ReadonlyMap<string, string> = new Map(
  Object.entries(noteCollections).map(([collectionKey, collection]) => [
    collectionKey,
    collection.primaryName,
  ]),
);

/**
 * Returns the display name for a note collection key, falling back to the
 * provided key when it is not one of the built-in collections.
 */
export function getNoteCollectionDisplayName(
  noteCollectionKey: NoteCollectionKey | string,
): string {
  return noteCollectionDisplayNames.get(noteCollectionKey) ?? noteCollectionKey;
}

/** Input for formatting the display identity of a root note and note collection. */
export interface RootAndNoteCollectionIdentityInput {
  /** The root note to display, accepting ASCII accidentals such as `Bb` or `F#`. */
  rootNote: string;
  /** The note collection key or custom collection label to display after the root. */
  noteCollectionKey: NoteCollectionKey | string;
}

/** Display metadata for a rooted note collection, suitable for app UI labels. */
export interface RootAndNoteCollectionIdentity {
  /** Screen-reader-friendly label that always separates the root and collection name with a space. */
  accessibleLabel: string;
  /** The resolved collection display name or chord-symbol suffix. */
  collectionName: string;
  /** Whether the collection was recognized as a chord collection. */
  isChord: boolean;
  /** Compact visual label, such as `C`, `F♯ø7`, or `B♭ Major`. */
  label: string;
  /** The normalized root note when recognized, otherwise the original input string. */
  rootNote: string;
  /** The visual separator used between `rootNote` and `collectionName`. */
  separator: "" | " ";
}

/**
 * Formats the display identity for a root note and note collection.
 * Chord collections use their authored chord-symbol suffix with no separator
 * (e.g. "C", "F♯ø7"), while notes, dyads, scales, and unknown collection
 * keys use a spaced display name (e.g. "C Major").
 */
export function getIdentityForRootAndNoteCollection({
  rootNote,
  noteCollectionKey,
}: RootAndNoteCollectionIdentityInput): RootAndNoteCollectionIdentity {
  const normalizedRootNote = normalizeRootNoteString(rootNote) ?? rootNote;
  const collection = isValidNoteCollectionKey(noteCollectionKey)
    ? noteCollections[noteCollectionKey]
    : undefined;
  const isChord = collection?.category === "chord";
  const collectionName = isChord
    ? collection.symbol.chordSuffix
    : collection?.primaryName ??
      getNoteCollectionDisplayName(noteCollectionKey);
  const separator = isChord ? "" : " ";
  const label = `${normalizedRootNote}${separator}${collectionName}`;
  const accessibleCollectionName = isChord && collectionName === ""
    ? "major chord"
    : collectionName;

  return {
    accessibleLabel: `${normalizedRootNote} ${accessibleCollectionName}`,
    collectionName,
    isChord,
    label,
    rootNote: normalizedRootNote,
    separator,
  };
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
  /** A top-level collection category to match exactly. */
  category?: CollectionCategory;
  /** An array of specific intervals that the matching collection must contain. */
  intervals?: Interval[];
  /** A string to filter collections by their mathematical or theoretical type (e.g. "heptatonic"). */
  type?: string;
}

/**
 * Searches the library of musical note collections (scales, chords, modes) based on the provided matching criteria.
 * Supports filtering by text query, top-level category, required theoretical intervals, and type tags.
 * @param options The criteria to use for filtering the collections.
 * @returns An array of `NoteCollection` objects that match the criteria, ranked by relevance if a text query was provided.
 */
export function searchNoteCollections(
  options: SearchOptions,
): NoteCollection[] {
  const { query, category, intervals, type } = options;
  let candidates = Object.values(noteCollections);

  // 1. Apply hard filters first to narrow down the candidate pool
  if (category) {
    candidates = candidates.filter((theme) => theme.category === category);
  }

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
