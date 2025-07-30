/**
 * Note sequences module providing collections of musical patterns including diatonic
 * modes, major variants, and dominant variants. This module serves as the main
 * entry point for accessing all note sequence types and data.
 *
 * Available Collections:
 * - Diatonic Modes: Traditional church modes (Ionian, Dorian, etc.)
 * - Major Variants: Major-based chords and arpeggios (major, major7, etc.)
 * - Dominant Variants: Dominant-based harmonies (dominant7, dominant9, etc.)
 * - ...
 *
 * Each sequence includes:
 * - Interval patterns and scale degrees
 * - Common names and characteristics
 * - Example notes
 * - ...
 *
 * @module note-sequences
 */

export * from "./diatonic-modes.ts";
export * from "./dominant-variants.ts";
export * from "./major-variants.ts";
export * from "./melodic-minor-modes.ts";
export * from "./harmonic-minor-modes.ts";
export * from "./other-sequences.ts";
export * from "./note-sequences.ts";
