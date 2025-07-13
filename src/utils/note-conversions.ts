/**
 * Utility functions for converting between note names, integer notation
 * and midi note numbers.
 * simpleNoteNameToInteger handles both #,b and ♯,♭ accidental formats only.
 *
 * @module
 */

import type {
  Interval,
  MidiNoteNumber,
  MidiNoteSequence,
  NoteAlterInteger,
  NoteInteger,
  NoteLabelThemeKey,
  NoteLetter,
  OctaveNumber,
} from "../types/note-labels.d.ts";
import {
  IntervalIntegers,
  noteNameIntegers,
} from "../note-labels/note-labels.ts";
import { noteLabelThemes } from "../note-labels/note-label-themes.ts";

/**
 * Converts a note letter and note alteration (number of semitones) to a note integer (0-11).
 *
 * @param noteLetter The note letter {@link NoteLetter}.
 * @param noteAlterInteger The number of semitones to alter the note
 * (e.g., 1 for sharp, -1 for flat). Defaults to 0.
 * @returns The note integer (0-11) representing the note.
 *
 * @example
 * ```ts
 * // Returns 0
 * noteLetterToInteger("C", 0);
 *
 * // Returns 1
 * noteLetterToInteger("C", 1);
 *
 * // Returns 11
 * noteLetterToInteger("B", 0);
 * ```
 */
export function noteLetterToInteger(
  noteLetter: NoteLetter,
  NoteAlterInteger: NoteAlterInteger = 0,
): NoteInteger {
  const noteInteger = (noteNameIntegers[noteLetter] + NoteAlterInteger + 12) %
    12;
  return noteInteger as NoteInteger;
}

/**
 * Converts a note letter, alteration, and octave to a MIDI note number.
 * Follows "scientific pitch notation" conventions.
 *
 * @param noteLetter The note letter {@link NoteLetter}.
 * @param noteAlterInteger The number of semitones to alter the note letter.
 * @param noteOctave The octave number (e.g., 4 for middle C).
 * @returns The MIDI note number.
 *
 * @example
 * ```ts
 * // Returns 12 (MIDI note number for C0)
 * noteLetterToMidi("C", 0, 0);
 *
 * // Returns 60 (MIDI note number for middle C = C4)
 * noteLetterToMidi("C", 0, 4);
 *
 * // Returns 61 (MIDI note number for C#4)
 * noteLetterToMidi("C", 1, 4);
 * ```
 */
export function noteLetterToMidi(
  noteLetter: NoteLetter,
  noteAlterInteger: NoteAlterInteger,
  noteOctave: number,
): MidiNoteNumber {
  return (
    noteLetterToInteger(noteLetter, noteAlterInteger) +
    (noteOctave + 1) * 12 as MidiNoteNumber
  );
}

/**
 * Converts a musical note name string (e.g., "C#", "Bb", "E") to its
 * corresponding note integer (0-11).
 *
 * The note name should start with a letter from A to G (case-insensitive),
 * optionally followed by one or more sharp ('#' or '♯') or flat ('b' or '♭') symbols.
 * Any other characters after the initial note letter, that are not valid accidentals,
 * will be considered invalid.
 *
 * @param noteName The musical note name string to convert.
 * @returns The note integer (0-11) representing the note,
 * or `undefined` if the input is invalid.
 */
export function simpleNoteNameToInteger(
  noteName: string,
): NoteInteger | undefined {
  const noteLetterRegex = /^[A-Ga-g]/;
  const accidentalRegex = /([#♯]+)|([b♭]+)/g;

  // Extract the note letter part of the note name
  const noteLetterMatch = noteName.match(noteLetterRegex);
  if (!noteLetterMatch) {
    console.warn(`Invalid note name string: ${noteName}`);
    return undefined;
  }

  const noteLetter = noteLetterMatch[0].toUpperCase() as NoteLetter;

  // Extract the accidental part of the note name
  const accidentalString = noteName.substring(1);
  let validAccidentalLength = 0;
  let noteAlterInteger = 0;

  for (const match of accidentalString.matchAll(accidentalRegex)) {
    const sharps = match[1];
    if (sharps) {
      noteAlterInteger += sharps.length;
      validAccidentalLength += sharps.length;
    }

    const flats = match[2];
    if (flats) {
      noteAlterInteger -= flats.length;
      validAccidentalLength += flats.length;
    }
  }

  // Check if the entire accidental string had valid accidentals
  if (accidentalString.length > validAccidentalLength) {
    console.warn(`Invalid accidental characters in: ${noteName}`);
    return undefined;
  }

  return ((noteNameIntegers[noteLetter] + noteAlterInteger + 12) %
    12) as NoteInteger;
}

export function rootIntegerAndIntervalToMidi(
  rootNoteInteger: NoteInteger,
  rootNoteOctave: OctaveNumber,
  interval: Interval,
): MidiNoteNumber {
  return (rootNoteOctave + 1) * 12 + rootNoteInteger +
    IntervalIntegers[interval] as MidiNoteNumber;
}

export function rootMidiAndIntervalToMidi(
  rootNoteMidi: MidiNoteNumber,
  interval: Interval,
): MidiNoteNumber {
  return rootNoteMidi + IntervalIntegers[interval] as MidiNoteNumber;
}

// TODO: make this accept a root note - currently it assumes C
export function midiNoteSequenceToIntervals(
  midiNoteSequence: MidiNoteSequence,
  noteLabelThemeKey: NoteLabelThemeKey,
): (string | null)[] {
  const result = midiNoteSequence.map((note) => {
    if (note === null) return null;
    return noteLabelThemes[noteLabelThemeKey]["labels"][note % 12];
  }) as (string | null)[];
  return result;
}
