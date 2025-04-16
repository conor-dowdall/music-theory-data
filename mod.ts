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
 * ---- OR ----
 *
 *  * ```bash
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
