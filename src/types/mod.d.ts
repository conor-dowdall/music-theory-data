/**
 * @module
 *
 * Type definitions for music theory concepts and patterns.
 * Re-exports all types from the following modules:
 *
 * - chord-labels: Types for chord qualities and Roman numerals
 * - note-colors: Types for associating colors with musical notes / note integers
 * - note-labels: Types for note names and labeling systems
 * - note-sequences: Types for scales, modes, and chord patterns
 */

export type * from "./chord-labels.d.ts";
export type * from "./note-colors.d.ts";
export type * from "./note-labels.d.ts";
export type * from "./note-sequences.d.ts";
