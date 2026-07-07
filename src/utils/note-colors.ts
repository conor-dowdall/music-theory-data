import type { NoteColorMode } from "../data/colors/mod.ts";
import type { ChromaticIndex } from "../data/chromatic.ts";
import { normalizeChromaticIndex } from "./chromatic.ts";

/** Returns the absolute pitch-class color index for a MIDI note. */
export function getAbsoluteNoteColorIndex(midi: number): ChromaticIndex {
  return normalizeChromaticIndex(midi);
}

/** Returns the pitch-class color index for a MIDI note relative to a root pitch class. */
export function getRelativeNoteColorIndex(
  midi: number,
  rootPitchClass: number,
): ChromaticIndex {
  return normalizeChromaticIndex(midi - rootPitchClass);
}

/** Returns the note color index for absolute or root-relative coloring. */
export function getNoteColorIndex(input: {
  midi: number;
  mode: NoteColorMode;
  rootPitchClass?: number;
}): ChromaticIndex {
  if (input.mode === "relative" && input.rootPitchClass !== undefined) {
    return getRelativeNoteColorIndex(input.midi, input.rootPitchClass);
  }

  return getAbsoluteNoteColorIndex(input.midi);
}
