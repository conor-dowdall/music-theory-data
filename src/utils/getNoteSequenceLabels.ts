import type { NoteLabelGroup } from "../types/note-labels.d.ts";
import type {
  NoteSequenceTheme,
  PitchInteger,
} from "../types/note-sequences.d.ts";
import {
  type NoteLabelThemeName,
  noteLabelThemes,
} from "../note-labels/note-label-themes.ts";
import {
  flatNoteSequenceThemes,
  type NoteSequenceThemeName,
} from "../note-sequences/note-sequences.ts";

/**
 * Gets the array of 12 note labels for a given note sequence theme and note label theme.
 * The note sequence can have an optional labelsOverride property, which updates the labels
 * in the original note label theme.
 *
 * @param noteSequenceThemeName The name of the note sequence theme.
 * @param noteLabelThemeName The name of the note label theme.
 * @returns The note labels array, or undefined if not found.
 *          The array is of type NoteLabelGroup, which is an array of 12 strings.
 */
export function getNoteSequenceLabels(
  noteSequenceThemeName: NoteSequenceThemeName,
  noteLabelThemeName: NoteLabelThemeName,
): NoteLabelGroup | undefined {
  const noteSequenceTheme = flatNoteSequenceThemes[noteSequenceThemeName] as
    | NoteSequenceTheme
    | undefined;
  if (!noteSequenceTheme) return undefined;

  const noteLabelTheme = noteLabelThemes[noteLabelThemeName];
  if (!noteLabelTheme) return undefined;

  const labels = noteLabelTheme.labels;
  if (!("labelsOverride" in noteSequenceTheme)) return labels;

  const overrideMap = noteSequenceTheme.labelsOverride?.[noteLabelThemeName];
  if (!overrideMap) return labels;

  return labels.map(
    (label, index) => overrideMap.get(index as PitchInteger) ?? label,
  ) as NoteLabelGroup;
}
