/**
 * Utility function for searching {@link allNoteSequenceThemes} by various criteria.
 *
 * Features:
 * - Case-insensitive searching
 * - Searches across multiple fields
 * - Deduplicates results
 *
 * @example
 * ```ts
 * import { searchNoteSequenceThemes } from "@musodojo/music-theory-data/utils";
 *
 * // Search for minor scales/modes/chords/arpeggios
 * const minorThemes = searchNoteSequenceThemes("minor");
 * // [ "minor": {...}, "melodicMinor": {...} ]
 * ```
 *
 * @module
 */

import type { NoteSequenceTheme } from "../types/note-sequences.d.ts";
import { allNoteSequenceThemes } from "../note-sequences/note-sequences.ts";

/**
 * Searches all {@link allNoteSequenceThemes} by matching the query string against various fields.
 * Returns theme themes that match any of these fields, in order of these fields:
 * - primaryName
 * - names
 * - type
 * - characteristics
 *
 * @param query The search term to look for
 * @returns Array of matching {@link NoteSequenceTheme} (using above matching order) ,
 * with no duplicates
 */
export function searchNoteSequenceThemes(query: string): NoteSequenceTheme[] {
  const results = new Set<NoteSequenceTheme>();
  const searchTerm = query.toLowerCase();

  // Search primary names first
  for (const theme of Object.values(allNoteSequenceThemes)) {
    if (theme.primaryName.toLowerCase().includes(searchTerm)) {
      results.add(theme);
    }
  }

  // Search alternate names
  for (const theme of Object.values(allNoteSequenceThemes)) {
    if (theme.names.some((name) => name.toLowerCase().includes(searchTerm))) {
      results.add(theme);
    }
  }

  // Search type properties
  for (const theme of Object.values(allNoteSequenceThemes)) {
    if (theme.type.some((type) => type.toLowerCase().includes(searchTerm))) {
      results.add(theme);
    }
  }

  // Search characteristics properties
  for (const theme of Object.values(allNoteSequenceThemes)) {
    if (
      theme.characteristics.some((char) =>
        char.toLowerCase().includes(searchTerm)
      )
    ) {
      results.add(theme);
    }
  }

  return Array.from(results);
}
