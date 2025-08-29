import {
  type Interval,
  intervalToIntegerMap,
  type NoteName,
  noteNameToIntegerMap,
} from "../data/labels/note-labels.ts";
import type { NoteInteger, OctaveNumber } from "../types/labels.d.ts";
import type { MidiNoteNumber } from "../types/midi.d.ts";

export function rootIntegerAndIntervalToMidi(
  rootNoteInteger: NoteInteger,
  rootNoteOctave: OctaveNumber,
  interval: Interval,
): MidiNoteNumber {
  return (rootNoteOctave + 1) * 12 + rootNoteInteger +
    intervalToIntegerMap[interval] as MidiNoteNumber;
}

export function rootMidiAndIntervalToMidi(
  rootNoteMidi: MidiNoteNumber,
  interval: Interval,
): MidiNoteNumber {
  return rootNoteMidi + intervalToIntegerMap[interval] as MidiNoteNumber;
}

export function noteNameToMidi(
  noteName: NoteName,
  octaveNumber: OctaveNumber,
  alteration: number = 0,
): MidiNoteNumber | undefined {
  const noteValue = noteNameToIntegerMap[noteName];
  const finalValue = noteValue + alteration;
  return finalValue + (octaveNumber + 1) * 12 as MidiNoteNumber;
}
