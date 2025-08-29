import type { Interval } from "../data/labels/note-labels.ts";
import type { MidiNoteNumber, MidiNoteSequence } from "../types/midi.d.ts";
import { rootMidiAndIntervalToMidi } from "./midi.ts";

export type MidiNoteSequenceDirection =
  | "ascending"
  | "descending"
  | "ascending-descending"
  | "descending-ascending";

// TODO: add property `restsAtEnd` to add null values to array end
export interface MidiNoteSequenceOptions {
  rootNoteMidi: MidiNoteNumber;
  intervals: Interval[];
  direction: MidiNoteSequenceDirection;
  startFromIndex?: number;
  filterOutOctave?: boolean;
  numNotes?: number;
  numOctaves?: number;
  extraNotes?: number;
}

function getMonotonicMidiNoteSequence(
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
        : numOctaves * fundamentalIntervals.length + 1) +
      extraNotes;

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

  return sequence;
}
