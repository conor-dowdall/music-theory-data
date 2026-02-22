import {
  type Interval,
  intervalToIntegerMap,
  type NoteName,
  noteNameToIntegerMap,
} from "../data/labels/note-labels.ts";

import type { MidiNoteNumber } from "../types/midi.d.ts";

/**
 * Calculates a MIDI note number based on a starting musical note (represented by its integer value and octave)
 * and an interval to apply to it.
 *
 * @param noteInteger The integer representation of the root note (0-11, where C=0).
 * @param noteOctaveNumber The scientific pitch octave number of the root note.
 * @param interval The interval to apply.
 * @returns The computed MIDI note number, or `undefined` if the interval is invalid.
 */
export function noteIntegerAndIntervalToMidi(
  noteInteger: number,
  noteOctaveNumber: number,
  interval: Interval,
): MidiNoteNumber | undefined {
  const intervalInteger = intervalToIntegerMap.get(interval);
  if (intervalInteger === undefined) return undefined;
  return ((noteOctaveNumber + 1) * 12 +
    noteInteger +
    intervalInteger) as MidiNoteNumber;
}

/**
 * Calculates a MIDI note number based on a starting note name and an interval.
 *
 * @param noteName The canonical name of the root note (e.g., "C", "F♯").
 * @param noteOctaveNumber The scientific pitch octave number of the root note.
 * @param interval The interval to apply.
 * @returns The computed MIDI note number, or `undefined` if the note name or interval is invalid.
 */
export function noteNameAndIntervalToMidi(
  noteName: NoteName,
  noteOctaveNumber: number,
  interval: Interval,
): MidiNoteNumber | undefined {
  const noteInteger = noteNameToIntegerMap.get(noteName);
  if (noteInteger === undefined) return undefined;
  return noteIntegerAndIntervalToMidi(noteInteger, noteOctaveNumber, interval);
}

/**
 * Calculates a new MIDI note number by applying a musical interval to a starting MIDI note number.
 *
 * @param noteMidi The starting MIDI note number.
 * @param interval The interval to add.
 * @returns The new computed MIDI note number, or `undefined` if the interval is invalid.
 */
export function noteMidiAndIntervalToMidi(
  noteMidi: MidiNoteNumber,
  interval: Interval,
): MidiNoteNumber | undefined {
  const intervalValue = intervalToIntegerMap.get(interval);
  if (intervalValue === undefined) return undefined;
  return (noteMidi + intervalValue) as MidiNoteNumber;
}

/**
 * Converts a note name and its specific octave into a standard MIDI note number.
 *
 * @param noteName The canonical name of the note (e.g., "C", "F♯").
 * @param noteOctaveNumber The scientific pitch octave number.
 * @returns The standard MIDI note number, or `undefined` if the note name is invalid.
 */
export function noteNameToMidi(
  noteName: NoteName,
  noteOctaveNumber: number,
): MidiNoteNumber | undefined {
  const noteValue = noteNameToIntegerMap.get(noteName);
  if (noteValue === undefined) return undefined;
  return (noteValue + (noteOctaveNumber + 1) * 12) as MidiNoteNumber;
}
