/**
 * @module
 *
 * This module provides functions for generating MIDI note sequences.
 * These sequences can be used for musical exercises, scales, arpeggios,
 * and other melodic patterns.
 *
 * @example
 * ```ts
 * import { generateMidiNoteSequence } from "@musodojo/music-theory-data/utils";
 * import type { GenerateMidiNoteSequenceOptions } from "@musodojo/music-theory-data/utils";
 * import { diatonicModes } from "@musodojo/music-theory-data/note-sequences";
 *
 * const options: GenerateMidiNoteSequenceOptions = {
 *   rootNoteMidi: 60, // Middle C
 *   intervals: diatonicModes.ionian.intervals,
 *   numOctaves: 2,
 *   direction: "ascending-descending",
 * };
 *
 * const sequence = generateMidiNoteSequence(options);
 * // sequence will contain a 2-octave major scale, ascending and descending.
 * ```
 */

import type {
  Interval,
  MidiNoteNumber,
  MidiNoteSequence,
} from "../types/note-labels.d.ts";
import { rootMidiAndIntervalToMidi } from "./note-conversions.ts";

/**
 * Defines the possible directions for a generated musical sequence.
 * - `ascending`: Notes increase in pitch.
 * - `descending`: Notes decrease in pitch.
 * - `ascending-descending`: Ascends and then descends back to the start.
 * - `descending-ascending`: Descends and then ascends back to the start.
 */
export type MidiNoteSequenceDirection =
  | "ascending"
  | "descending"
  | "ascending-descending"
  | "descending-ascending";

/**
 * Defines the options for generating a MIDI note sequence.
 * This interface allows for flexible sequence generation by specifying either
 * a total number of notes or a number of octaves plus extra notes.
 */
export interface GenerateMidiNoteSequenceOptions {
  /** The MIDI note number for the root of the sequence (e.g., 60 for Middle C). */
  rootNoteMidi: MidiNoteNumber;
  /** An array of `Interval` strings that define the pattern (e.g., ["1", "3", "5"] for a triad). */
  intervals: Interval[];
  /** The direction of the sequence. */
  direction: MidiNoteSequenceDirection;
  /** The index of the `intervals` array to start the sequence from. Defaults to 0. */
  startFromIndex?: number;
  /**
   * Explicitly controls whether the octave interval ('8' or '♮8') is included
   * in each octave. If not provided, the default is false, for simplified
   * looping capabilities and consistent behavior between scales and modes, which
   * typically include the octave, and chords and arpeggios, which do not.
   */
  includeOctaveIntervals?: boolean;
  /**
   * The total number of notes to generate for the monotonic part of the sequence.
   * If provided, this overrides `numOctaves` and `extraNotes`.
   * If not provided, the sequence length is determined by `numOctaves` and `extraNotes`.
   * Applies to the initial monotonic part of the sequence: "ascending" or "descending" only.
   * "ascending-descending" and "descending-ascending" simply reverse and slice the monotonic part,
   * which is of length numNotes, if provided.
   */
  numNotes?: number;
  /**
   * The number of octaves to generate for the sequence. Defaults to 1.
   * If `numOctaves` is set to 0, the sequence will be the length of the `intervals` array.
   */
  numOctaves?: number;
  /** The number of extra notes to add after the full octaves are generated. Defaults to 0. */
  extraNotes?: number;
}

/**
 * Generates a monotonic (single-direction) sequence of MIDI notes.
 * This is a pure generation function that loops over a given set of intervals.
 * @internal
 */
function generateMonotonicMidiNoteSequence(
  rootNoteMidi: MidiNoteNumber,
  intervals: Interval[],
  numNotes: number,
  startFromIndex: number,
  direction: "ascending" | "descending",
): MidiNoteSequence {
  const notes: MidiNoteNumber[] = [];
  const intervalsLength = intervals.length;

  if (intervalsLength === 0 || numNotes <= 0) {
    return [];
  }

  for (let i = 0; i < numNotes; i++) {
    let intervalIndex: number;
    let octaveOffset: number;

    if (direction === "ascending") {
      intervalIndex = (startFromIndex + i) % intervalsLength;
      octaveOffset = Math.floor((startFromIndex + i) / intervalsLength) * 12;
      const interval = intervals[intervalIndex];
      const note = rootMidiAndIntervalToMidi(rootNoteMidi, interval);
      notes.push((note + octaveOffset) as MidiNoteNumber);
    } // descending...
    else {
      intervalIndex =
        ((startFromIndex - i) % intervalsLength + intervalsLength) %
        intervalsLength;
      /**
       * octaveOffset increases every time we've looped through all intervals
       * The Math.max(0, ...) is a piece of defensive programming. It protects the function from producing illogical results if it
       * ever receives invalid input.
       * @example
       * intervalsLength = 7
       * Imagine we accidentally pass startFromIndex = 10. This is not a valid index for the intervals array,
       * but a robust function should handle it gracefully.
       */
      octaveOffset =
        Math.max(0, Math.ceil((i - startFromIndex) / intervalsLength)) * 12;
      const interval = intervals[intervalIndex];
      // Subtract octaveOffset from root before applying interval
      const note = rootMidiAndIntervalToMidi(
        (rootNoteMidi - octaveOffset) as MidiNoteNumber,
        interval,
      );
      notes.push(note as MidiNoteNumber);
    }
  }

  return notes;
}

/**
 * Generates a sequence of MIDI notes based on a root note, intervals, and other options.
 *
 * This function offers two ways to specify the length of the sequence:
 * 1. `numNotes`: For a fixed total number of notes.
 * 2. `numOctaves` and `extraNotes`: For a length defined by musical octaves.
 *
 * @param options - The configuration object for the sequence generation.
 * @returns An array of `MidiNoteNumber`s.
 */
export function generateMidiNoteSequence(
  options: GenerateMidiNoteSequenceOptions,
): MidiNoteSequence {
  const {
    rootNoteMidi,
    intervals,
    direction,
    startFromIndex = 0,
    // includeOctaveIntervals is false (filter out '8' and '♮8' by default)
    includeOctaveIntervals = false,
    numNotes,
    numOctaves = 1,
    extraNotes = 0,
  } = options;

  // Create the fundamental sequence of intervals for one octave.
  // Scales and modes usually include the octave in the intervals
  // whereas, chords and arpeggios, do not
  // use filter for a consistent interval structure
  const fundamentalIntervals = includeOctaveIntervals
    ? intervals
    : intervals.filter((i) => i !== "8" && i !== "♮8");

  if (fundamentalIntervals.length === 0) return [];

  // Calculate the total number of notes for the (first) monotonic part of the sequence.
  // This is simply reversed and sliced to create the ascending-descending or descending-ascending sequences.
  // numOctaves = 0: fundamentalIntervals.length
  // numOctaves = 1: fundamentalIntervals.length + 1
  // numOctaves = 2: 2 * fundamentalIntervals.length + 1
  const monotonicNoteCount = numNotes ??
    (numOctaves === 0
        ? fundamentalIntervals.length
        : numOctaves * fundamentalIntervals.length + 1) +
      extraNotes;

  if (monotonicNoteCount <= 0) return [];

  let sequence: MidiNoteSequence = [];
  const monotonicNotes = (dir: "ascending" | "descending") =>
    generateMonotonicMidiNoteSequence(
      rootNoteMidi,
      fundamentalIntervals,
      monotonicNoteCount,
      startFromIndex,
      dir,
    );

  switch (direction) {
    case "ascending":
      sequence = monotonicNotes("ascending");
      break;
    case "descending":
      sequence = monotonicNotes("descending");
      break;
    case "ascending-descending": {
      const ascendingNotes = monotonicNotes("ascending");
      // Exclude the peak note to avoid duplication when reversing
      const descendingPart = [...ascendingNotes].reverse().slice(1);
      sequence = [...ascendingNotes, ...descendingPart];
      break;
    }
    case "descending-ascending": {
      const descendingNotes = monotonicNotes("descending");
      // Exclude the lowest note to avoid duplication when reversing
      const ascendingPart = [...descendingNotes].reverse().slice(1);
      sequence = [...descendingNotes, ...ascendingPart];
      break;
    }
  }

  return sequence;
}
