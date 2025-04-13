/**
 * Music theory data structures and utilities for TypeScript/Deno.
 *
 * Features:
 * - Note sequences (scales, modes, chords, arpeggios)
 * - Note labels (accidentals, intervals, chord symbols)
 * - Music theory utilities
 * - Type definitions
 *
 * Example Usage:
 * ```ts
 * import { diatonicModes } from "@musodojo/music-theory-data/note-sequences";
 * import { enharmonicNotesUnicode } from "@musodojo/music-theory-data/note-labels";
 * import { getIntegerNotation } from "@musodojo/music-theory-data/utils";
 * import type { NoteSequenceTheme } from "@musodojo/music-theory-data/types";
 *
 * // Get major scale pattern
 * const majorScale = diatonicModes.ionian.sequence;  // [0, 2, 4, 5, 7, 9, 11]
 * ```
 *
 * @module
 */

export * from "./src/note-sequences/mod.ts";
export * from "./src/note-labels/mod.ts";
export * from "./src/utils/mod.ts";
export * from "./src/types/mod.ts";
