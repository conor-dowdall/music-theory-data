import type {
  Interval,
  MidiNoteNumber,
  MidiNoteSequence,
  // NoteInteger,
  // OctaveNumber,
} from "../types/note-labels.d.ts";
import {
  // rootIntegerAndIntervalToMidi,
  rootMidiAndIntervalToMidi,
} from "./note-conversions.ts";

// export function intervalsToExerciseMidi(
//   rootNoteInteger: NoteInteger,
//   rootNoteOctave: OctaveNumber,
//   intervals: Interval[],
//   numOctaves: number,
//   extraNotes: number,
//   extraRests: number,
// ): MidiNoteExerciseNotes {
//   let exercise: MidiNoteExerciseNotes = [];
//   const rootNoteMidi = rootIntegerAndIntervalToMidi(
//     rootNoteInteger,
//     rootNoteOctave,
//     "1", // unison with the root note
//   ) as MidiNoteNumber;
//   let midiNoteNumber: MidiNoteNumber;

//   // ascending part
//   for (let octave = 0; octave < numOctaves; octave++) {
//     intervals.forEach((interval) => {
//       midiNoteNumber = rootMidiAndIntervalToMidi(rootNoteMidi, interval) +
//         octave * 12 as MidiNoteNumber;
//       exercise.push(midiNoteNumber);
//     });
//   }

//   // handle any extra notes
//   if (extraNotes > 0) {
//     const baseNoteForExtraOctave = rootNoteMidi +
//       numOctaves * 12 as MidiNoteNumber;
//     for (let i = 0; i < extraNotes; i++) {
//       // extra notes could theoretically be more than the number of intervals
//       // use a 1-based index for intervalIndex - don't add root note again
//       // because octave is included in intervals array
//       const intervalIndex = (i + 1) % intervals.length;
//       const interval = intervals[intervalIndex];
//       const octaveOffset = Math.floor((i + 1) / intervals.length) * 12;
//       midiNoteNumber =
//         rootMidiAndIntervalToMidi(baseNoteForExtraOctave, interval) +
//         octaveOffset as MidiNoteNumber;
//       exercise.push(midiNoteNumber);
//     }
//   }

//   // descending part
//   // avoid duplicating the last ascending note
//   // avoid duplicating the first note of the pattern as well
//   // so it loops seamlessly
//   const descendingPart = [...exercise].reverse().slice(1, -1);
//   exercise = exercise.concat(descendingPart);

//   // Add the root note again at the end before the rests
//   if (exercise.length > 0) {
//     exercise.push(exercise[0]);
//   }

//   // extra rests at the end
//   if (extraRests > 0) {
//     for (let i = 0; i < extraRests; i++) {
//       exercise.push(null);
//     }
//   }

//   return exercise;
// }

function generateMonotonicMidiNoteSequence(
  rootNoteMidi: MidiNoteNumber,
  intervals: Interval[],
  numNotes: number,
  startFromIndex: number,
  direction: "ascending" | "descending",
  repeatOctave: boolean = false,
): MidiNoteSequence {
  const notes: MidiNoteNumber[] = [];
  const intervalLength = intervals.length;

  if (intervalLength === 0) return [];

  let currentIntervals = [...intervals];
  if (!repeatOctave) {
    currentIntervals = intervals.filter((i) => i !== "8" && i !== "♮8");
  }

  const currentIntervalsLength = currentIntervals.length;
  if (currentIntervalsLength === 0) return [];

  for (let i = 0; i < numNotes; i++) {
    const intervalIndex = (startFromIndex + i) % currentIntervalsLength;
    const interval = currentIntervals[intervalIndex];
    const octaveOffset =
      Math.floor((startFromIndex + i) / currentIntervalsLength) * 12;

    const note = rootMidiAndIntervalToMidi(rootNoteMidi, interval);

    if (direction === "ascending") {
      notes.push((note + octaveOffset) as MidiNoteNumber);
    } else { // descending
      notes.push((note - octaveOffset) as MidiNoteNumber);
    }
  }

  return notes;
}

export type ExerciseDirection =
  | "ascending"
  | "descending"
  | "ascending-descending"
  | "descending-ascending";

export function generateMidiNoteSequence(
  rootNoteMidi: MidiNoteNumber,
  intervals: Interval[],
  numNotes: number,
  startFromIndex: number,
  noteCount: number,
  direction: ExerciseDirection,
  repeatOctave: boolean = false,
): MidiNoteSequence {
  let exercise: MidiNoteSequence = [];

  if (direction === "ascending") {
    exercise = generateMonotonicMidiNoteSequence(
      rootNoteMidi,
      intervals,
      noteCount,
      startFromIndex,
      "ascending",
      repeatOctave,
    );
  } else if (direction === "descending") {
    exercise = generateMonotonicMidiNoteSequence(
      rootNoteMidi,
      intervals,
      noteCount,
      startFromIndex,
      "descending",
      repeatOctave,
    );
  } else if (direction === "ascending-descending") {
    const ascendingNotes = generateMonotonicMidiNoteSequence(
      rootNoteMidi,
      intervals,
      noteCount,
      startFromIndex,
      "ascending",
      repeatOctave,
    );
    exercise = [...ascendingNotes, ...[...ascendingNotes].reverse().slice(1)];
  } else if (direction === "descending-ascending") {
    const descendingNotes = generateMonotonicMidiNoteSequence(
      rootNoteMidi,
      intervals,
      noteCount,
      startFromIndex,
      "descending",
      repeatOctave,
    );
    exercise = [...descendingNotes, ...[...descendingNotes].reverse().slice(1)];
  }

  return exercise.slice(0, numNotes);
}
