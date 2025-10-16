import {
  type Interval,
  intervalToIntegerMap,
  type NoteName,
  noteNameToIntegerMap,
  type RootNoteInteger,
} from "../data/labels/note-labels.ts";

import type { MidiNoteNumber, OctaveNumber } from "../types/midi.d.ts";

export function rootIntegerAndIntervalToMidi(
  rootNoteInteger: RootNoteInteger,
  interval: Interval,
  rootNoteOctaveNumber: OctaveNumber = 4,
): MidiNoteNumber | undefined {
  const intervalValue = intervalToIntegerMap.get(interval);
  if (intervalValue === undefined) return undefined;
  return (rootNoteOctaveNumber + 1) * 12 + rootNoteInteger +
    intervalValue as MidiNoteNumber;
}

export function rootMidiAndIntervalToMidi(
  rootNoteMidi: MidiNoteNumber,
  interval: Interval,
): MidiNoteNumber | undefined {
  const intervalValue = intervalToIntegerMap.get(interval);
  if (intervalValue === undefined) return undefined;
  return rootNoteMidi + intervalValue as MidiNoteNumber;
}

export function noteNameToMidi(
  noteName: NoteName,
  octaveNumber: OctaveNumber = 4,
): MidiNoteNumber | undefined {
  const noteValue = noteNameToIntegerMap.get(noteName);
  if (noteValue === undefined) return undefined;
  return noteValue + (octaveNumber + 1) * 12 as MidiNoteNumber;
}

export function noteNameAndIntervalToMidi(
  noteName: NoteName,
  interval: Interval,
  octaveNumber: OctaveNumber = 4,
): MidiNoteNumber | undefined {
  const noteValue = noteNameToIntegerMap.get(noteName);
  if (noteValue === undefined) return undefined;
  const intervalValue = intervalToIntegerMap.get(interval);
  if (intervalValue === undefined) return undefined;
  return noteValue + (octaveNumber + 1) * 12 as MidiNoteNumber;
}
