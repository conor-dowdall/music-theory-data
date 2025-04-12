/**
 * Type definitions for music theory concepts and patterns.
 * Re-exports all types from the following modules:
 *
 * - note-labels: Types for note names and labeling systems
 * - note-sequences: Types for scales, modes, and chord patterns
 *
 * Example Usage:
 * ```ts
 * import type {
 *   NoteName,           // Note name types
 *   NoteSequenceTheme,  // Sequence types
 *   PitchInteger        // Common types
 * } from "@musodojo/music-theory-data/types";
 * ```
 *
 * @module
 */

export * from "./note-labels.d.ts";
export * from "./note-sequences.d.ts";
