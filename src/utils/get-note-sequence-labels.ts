/**
 * Utility for getting note labels from note sequences with optional overrides.
 * Combines note label themes with sequence-specific label customizations.
 *
 * @example
 * ```ts
 * import { getNoteSequenceLabels } from "@musodojo/music-theory-data/utils";
 *
 * // Get standard major scale labels
 * const majorLabels = getNoteSequenceLabels("ionian", "flat");
 * // ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"]
 *
 * // Get dominant9 chord with quality labels
 * const dom9Labels = getNoteSequenceLabels("dominant7", "quality");
 * // original note labels: ["P1","m2","M2","m3","M3","P4","d5","P5","m6","M6","m7","M7",]
 * // M9 applied to the M2 label
 * // with label overrides:["P1","m2","M9","m3","M3","P4","d5","P5","m6","M6","m7","M7",]
 * ```
 *
 * Features:
 * - Combines note label themes with sequence-specific overrides
 * - Type-safe theme name parameters
 * - Returns undefined for invalid themes
 * - Preserves original labels when no override exists
 *
 * @module
 */

import type {
  NoteInteger,
  NoteLabelGroup,
  NoteLabelTheme,
  NoteLabelThemeKey,
} from "../types/note-labels.d.ts";
import type {
  NoteSequenceTheme,
  NoteSequenceThemeKey,
} from "../types/note-sequences.d.ts";
import { noteLabelThemes } from "../note-labels/note-label-themes.ts";
import { allNoteSequenceThemes } from "../note-sequences/note-sequences.ts";

/**
 * Gets the array of 12 note labels for a given note sequence theme and note label theme.
 * The note sequence can have an optional labelsOverride property, which updates the labels
 * in the original note label theme.
 *
 * @param noteSequenceThemeKey The name/key of the note sequence theme.
 * @param noteLabelThemeKey The name/key of the note label theme.
 * @returns The note labels array, or undefined if not found.
 *          The array is of type NoteLabelGroup, which is an array of 12 strings.
 */
export function getNoteSequenceLabels(
  noteSequenceThemeKey: NoteSequenceThemeKey,
  noteLabelThemeKey: NoteLabelThemeKey,
): NoteLabelGroup | undefined {
  const noteSequenceTheme = allNoteSequenceThemes[
    noteSequenceThemeKey
  ] as NoteSequenceTheme;
  if (!noteSequenceTheme) return undefined; // runtime check

  const noteLabelTheme = noteLabelThemes[noteLabelThemeKey] as NoteLabelTheme;
  if (!noteLabelTheme) return undefined; // runtime check

  const labels = noteLabelTheme.labels;
  if (!("labelsOverride" in noteSequenceTheme)) return labels;

  // TODO: review this code and the necessity of the function getNoteSequenceLabels
  // and how to adapt it for the updated types and data structures
  // const overrideMap = noteSequenceTheme.labelsOverride?.[noteLabelThemeKey];
  const overrideMap = new Map();
  if (!overrideMap) return labels;

  return labels.map(
    (label, index) => overrideMap.get(index as NoteInteger) ?? label,
  ) as NoteLabelGroup;
}
