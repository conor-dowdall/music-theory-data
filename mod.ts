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
 * const majorScale = music_theory_data.diatonicModes.ionian.sequence;
 * console.log("Major Scale Note Sequence", majorScale);
 *
 * // const melodicMinorTheme: music_theory_data.NoteSequenceTheme
 * const melodicMinorTheme =
 * music_theory_data.flatNoteSequenceThemes.melodicMinor;
 * console.log("Melodic Minor Note Sequence Theme", melodicMinorTheme);
 * ```
 *
 * @example
 * Using More Specific Module Imports
 * ```ts
 * // Import specific modules
 * import { diatonicModes } from "@musodojo/music-theory-data/note-sequences";
 * import { getNoteSequenceLabels } from "@musodojo/music-theory-data/utils";
 *
 * // Get major scale pattern, with autocompleted types
 * const majorScale = diatonicModes.ionian.sequence;
 * console.log("Major Scale:", majorScale); // [0, 2, 4, 5, 7, 9, 11]
 *
 * // Get note sequence labels, with autocompleted types
 * const majorScaleLabels = getNoteSequenceLabels("ionian", "flat");
 * console.log("Major Scale Labels:", majorScaleLabels);
 * // ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"]
 * ```
 *
 * @example
 * ```bash
 * deno add jsr:@musodojo/music-theory-data
 * ```
 * ```ts
 * import * as music_theory_data from "@musodojo/music-theory-data";
 * // ...
 * ```
 * @module
 */

export * from "./src/note-sequences/mod.ts";
export * from "./src/note-labels/mod.ts";
export * from "./src/utils/mod.ts";
export * from "./src/types/mod.ts";
