import type { NoteColorMode } from "../data/colors/mod.ts";
import type { ChromaticIndex } from "../data/chromatic.ts";
import { normalizeChromaticIndex } from "./chromatic.ts";

export function getAbsoluteNoteColorIndex(midi: number): ChromaticIndex {
  return normalizeChromaticIndex(midi);
}

export function getRelativeNoteColorIndex(
  midi: number,
  rootPitchClass: number,
): ChromaticIndex {
  return normalizeChromaticIndex(midi - rootPitchClass);
}

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
