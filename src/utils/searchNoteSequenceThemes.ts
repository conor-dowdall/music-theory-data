/**
 * Utility functions for searching note sequence themes by various criteria.
 *
 * Features:
 * - Case-insensitive searching
 * - Searches across multiple fields
 * - Deduplicates results
 *
 * Example Usage:
 * ```ts
 * import { searchNoteSequenceThemes } from "@musodojo/music-theory-data/utils";
 *
 * // Search for minor scales/modes/chords/arpeggios
 * const minorThemes = searchNoteSequenceThemes("minor");
 * // ["melodicMinor", "dorianFlat2"]
 * ```
 *
 * @module
 */

import type { NoteSequenceTheme } from "../types/note-sequences.d.ts";
import { flatNoteSequenceThemes } from "../note-sequences/note-sequences.ts";

/**
 * Searches note sequence themes by matching the query string against various fields.
 * Returns theme themes that match in any of these fields:
 * - primaryName
 * - names
 * - type
 * - characteristics
 *
 * @param query The search term to look for
 * @returns Array of matching note sequence themes, with no duplicates
 */
export function searchNoteSequenceThemes(query: string): NoteSequenceTheme[] {
  const results = new Set<NoteSequenceTheme>();
  const searchTerm = query.toLowerCase();

  for (const theme of Object.values(flatNoteSequenceThemes)) {
    // Check primary name
    if (theme.primaryName.toLowerCase().includes(searchTerm)) {
      results.add(theme);
      continue;
    }

    // Check alternate names
    if (theme.names.some((name) => name.toLowerCase().includes(searchTerm))) {
      results.add(theme);
      continue;
    }

    // Check types
    if (theme.type.some((type) => type.toLowerCase().includes(searchTerm))) {
      results.add(theme);
      continue;
    }

    // Check characteristics
    if (
      theme.characteristics.some((char) =>
        char.toLowerCase().includes(searchTerm)
      )
    ) {
      results.add(theme);
      continue;
    }
  }

  return Array.from(results);
}
