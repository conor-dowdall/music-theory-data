/**
 * Music theory data structures and utilities for TypeScript/Deno.
 *
 * Features:
 * - Note sequences (scales, modes, chords, arpeggios)
 * - Note labels (accidentals, intervals, chord symbols)
 * - Music theory utilities
 * - Type definitions
 *
 * @example
 * ```ts
 * import * as music_theory_data from "jsr:@musodojo/music-theory-data";
 *
 * // const majorScale: music_theory_data.PitchInteger[]
 * const majorScale = music_theory_data.diatonicModes.ionian.integers;
 * console.log("Major Scale Note Integer Sequence", majorScale);
 *
 * // const melodicMinorTheme: music_theory_data.NoteSequenceTheme
 * const melodicMinorTheme =
 * music_theory_data.allNoteSequenceThemes.melodicMinor;
 * console.log("Melodic Minor Note Sequence Theme", melodicMinorTheme);
 * ```
 *
 * @example
 * ```ts
 * // Using More Specific Module Imports
 * // Import specific modules
 * import { diatonicModes } from "@musodojo/music-theory-data/note-sequences";
 * import { getNoteSequenceLabels } from "@musodojo/music-theory-data/utils";
 *
 * // Get major scale pattern, with autocompleted types
 * const majorScale = diatonicModes.ionian.integers;
 * console.log("Major Scale:", majorScale); // [0, 2, 4, 5, 7, 9, 11]
 *
 * // Get note sequence labels, with autocompleted types
 * const majorScaleLabels = getNoteSequenceLabels("ionian", "flat");
 * console.log("Major Scale Labels:", majorScaleLabels);
 * // ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"]
 * ```
 *
 * @module
 */

export * from "./note-colors/mod.ts";
export * from "./note-labels/mod.ts";
export * from "./note-sequences/mod.ts";
export type * from "./types/mod.d.ts";
export * from "./utils/mod.ts";
