import type {
  LabelsOverride,
  LabelsOverrideMap,
  PitchInteger,
} from "../../types/note-sequences.d.ts";
import type {
  EnharmonicNotes,
  NoteLabelGroup,
  NoteName,
} from "../../types/note-labels.d.ts";
import {
  noteLabelThemes,
  type NoteLabelThemeName,
} from "../note-labels/note-label-themes.ts";
import {
  noteSequenceThemes,
  type NoteSequenceThemeName,
} from "../note-sequences/note-sequences.ts";
import {
  enharmonicNotesAlt,
  enharmonicNotesUnicode,
} from "../note-labels/enharmonic-notes.ts";

/**
 * Gets the integer notation (pitch class 0-11) of a given note name.
 * Handles both '#'/'b' and '♯'/'♭' notations, and is case-insensitive.
 *
 * @param noteName The note name to convert (e.g., "C#", "db", "E♭").
 * @returns The pitch integer (0-11) if found, otherwise undefined.
 */
export function getIntegerNotation(
  noteName: NoteName
): PitchInteger | undefined {
  const lowerCaseNoteName = noteName.toLowerCase();

  const checkEnharmonicNotes = (
    enharmonicNotes: EnharmonicNotes
  ): PitchInteger | undefined => {
    for (let index = 0; index < enharmonicNotes.length; index++) {
      const containsNote = enharmonicNotes[index].some(
        (n) => n.toLowerCase() === lowerCaseNoteName
      );
      if (containsNote) return index as PitchInteger;
    }
    return undefined;
  };

  const resultAlt = checkEnharmonicNotes(enharmonicNotesAlt);
  if (resultAlt !== undefined) return resultAlt;
  return checkEnharmonicNotes(enharmonicNotesUnicode);
}

export function getSequenceNoteLabels(
  noteSequenceThemeName: NoteSequenceThemeName,
  noteLabelThemeName: NoteLabelThemeName
): NoteLabelGroup | undefined {
  const noteSequenceTheme = noteSequenceThemes[noteSequenceThemeName];
  if (!noteSequenceTheme) return undefined;

  const noteLabelTheme = noteLabelThemes[noteLabelThemeName];
  if (!noteLabelTheme) return undefined;

  let labels = [...noteLabelTheme.labels] as NoteLabelGroup;

  if ("labelsOverride" in noteSequenceTheme) {
    labels = labels.map((label, index) => {
      const labelsOverride = noteSequenceTheme.labelsOverride as LabelsOverride;
      if (noteLabelThemeName in labelsOverride) {
        const labelsOverrideMap = labelsOverride[
          noteLabelThemeName
        ] as LabelsOverrideMap;
        return labelsOverrideMap.get(index as PitchInteger) ?? label;
      }
      return label;
    }) as NoteLabelGroup;
  }

  return labels;
}
