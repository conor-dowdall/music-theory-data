import type { Interval } from "../data/labels/note-labels.ts";
import type { MidiNoteNumber, MidiNoteSequence } from "../types/midi.d.ts";
import { noteMidiAndIntervalToMidi } from "./midi.ts";

/** Specifies the musical contour or direction for generating a sequence of notes. */
export type MidiNoteSequenceDirection =
  | "ascending"
  | "descending"
  | "ascending-descending"
  | "descending-ascending";

/** Configuration options for generating a sequence of MIDI notes from an interval pattern. */
export interface MidiNoteSequenceOptions {
  /** The starting MIDI note number acting as the root. */
  rootNoteMidi: MidiNoteNumber;
  /** The array of intervals relative to the root that comprise the scale or arpeggio. */
  intervals: Interval[];
  /** The direction contour of the sequence. */
  direction: MidiNoteSequenceDirection;
  /** The index in the intervals array to start on (allows generating inversions or modes). */
  startFromIndex?: number;
  /** Whether to remove octave intervals from the base array before generating. */
  filterOutOctave?: boolean;
  /** The number of `null` rests to append to the very end of the sequence. */
  restsAtEnd?: number;
  /** An exact specific number of notes to generate for the monotonic portion (ascend/descend) of the sequence. Overrides `numOctaves` if provided. */
  numNotes?: number;
  /** How many octaves the monotonic portion of the sequence should span if `numNotes` is not provided. */
  numOctaves?: number;
  /** A literal number of extra sequence steps to compute past the octave limit if `numNotes` is not provided. */
  extraNotes?: number;
}

/**
 * Generates a monotonic sequence of MIDI notes.
 * @param rootNoteMidi The root MIDI note number.
 * @param intervals The array of intervals to generate the sequence from.
 * @param numNotes The number of notes to generate.
 * @param startFromIndex The starting index in the intervals array.
 * @param direction The direction of the sequence ('ascending' or 'descending').
 * @returns An array of MIDI note numbers.
 * @throws {Error} If a MIDI note cannot be calculated for an interval.
 */
function getMonotonicMidiNoteSequence(
  rootNoteMidi: MidiNoteNumber,
  intervals: Interval[],
  numNotes: number,
  startFromIndex: number,
  direction: "ascending" | "descending",
): MidiNoteSequence {
  const notes: MidiNoteNumber[] = [];
  const intervalsLength = intervals.length;

  if (intervalsLength === 0 || numNotes <= 0) return [];

  for (let i = 0; i < numNotes; i++) {
    let intervalIndex: number;
    let octaveOffset: number;

    if (direction === "ascending") {
      intervalIndex = (startFromIndex + i) % intervalsLength;
      octaveOffset = Math.floor((startFromIndex + i) / intervalsLength) * 12;
      const interval = intervals[intervalIndex];
      const note = noteMidiAndIntervalToMidi(rootNoteMidi, interval);
      if (note === undefined) {
        throw new Error(
          `Could not calculate MIDI note for interval ${interval} at index ${intervalIndex}`,
        );
      }
      notes.push((note + octaveOffset) as MidiNoteNumber);
    } // descending...
    else {
      intervalIndex =
        (((startFromIndex - i) % intervalsLength) + intervalsLength) %
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
      const note = noteMidiAndIntervalToMidi(
        (rootNoteMidi - octaveOffset) as MidiNoteNumber,
        interval,
      );
      if (note === undefined) {
        throw new Error(
          `Could not calculate MIDI note for interval ${interval} at index ${intervalIndex}`,
        );
      }
      notes.push(note);
    }
  }

  return notes;
}

/**
 * Generates a sequence of MIDI notes based on the provided options.
 * The sequence can be ascending, descending, or a combination of both.
 * @param options The options for generating the MIDI note sequence.
 * @returns A sequence of MIDI notes.
 * @throws {Error} If a MIDI note cannot be calculated for an interval.
 */
export function getMidiNoteSequence(
  options: MidiNoteSequenceOptions,
): MidiNoteSequence {
  const {
    rootNoteMidi,
    intervals,
    direction,
    startFromIndex = 0,
    filterOutOctave = true,
    numNotes,
    numOctaves = 1,
    restsAtEnd = 0,
    extraNotes = 0,
  } = options;

  const fundamentalIntervals = filterOutOctave
    ? intervals.filter((i) => i !== "8" && i !== "♮8")
    : intervals;

  if (fundamentalIntervals.length === 0) return [];

  // Calculate the total number of notes for the (first) monotonic part of the sequence.
  // This is simply reversed and sliced to create the ascending-descending or descending-ascending sequences.
  // numOctaves = 0: fundamentalIntervals.length
  // numOctaves = 1: fundamentalIntervals.length + 1
  // numOctaves = 2: 2 * fundamentalIntervals.length + 1
  const monotonicNoteCount = numNotes ??
    (numOctaves === 0
        ? fundamentalIntervals.length
        : numOctaves * fundamentalIntervals.length + 1) + extraNotes;

  if (monotonicNoteCount <= 0) return [];

  let sequence: MidiNoteSequence = [];
  const monotonicNotes = (dir: "ascending" | "descending") =>
    getMonotonicMidiNoteSequence(
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

  if (restsAtEnd > 0) sequence.push(...Array(restsAtEnd).fill(null));

  return sequence;
}
