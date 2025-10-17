import {
  type Interval,
  intervalToIntegerMap,
  type NoteName,
  noteNameToIntegerMap,
} from "../data/labels/note-labels.ts";

import type { MidiNoteNumber } from "../types/midi.d.ts";

export function noteIntegerAndIntervalToMidi(
  noteInteger: number,
  noteOctaveNumber: number,
  interval: Interval,
): MidiNoteNumber | undefined {
  const intervalInteger = intervalToIntegerMap.get(interval);
  if (intervalInteger === undefined) return undefined;
  return (noteOctaveNumber + 1) * 12 + noteInteger +
    intervalInteger as MidiNoteNumber;
}

export function noteNameAndIntervalToMidi(
  noteName: NoteName,
  noteOctaveNumber: number,
  interval: Interval,
): MidiNoteNumber | undefined {
  const noteInteger = noteNameToIntegerMap.get(noteName);
  if (noteInteger === undefined) return undefined;
  return noteIntegerAndIntervalToMidi(
    noteInteger,
    noteOctaveNumber,
    interval,
  );
}

export function noteMidiAndIntervalToMidi(
  noteMidi: MidiNoteNumber,
  interval: Interval,
): MidiNoteNumber | undefined {
  const intervalValue = intervalToIntegerMap.get(interval);
  if (intervalValue === undefined) return undefined;
  return noteMidi + intervalValue as MidiNoteNumber;
}

export function noteNameToMidi(
  noteName: NoteName,
  noteOctaveNumber: number,
): MidiNoteNumber | undefined {
  const noteValue = noteNameToIntegerMap.get(noteName);
  if (noteValue === undefined) return undefined;
  return noteValue + (noteOctaveNumber + 1) * 12 as MidiNoteNumber;
}
