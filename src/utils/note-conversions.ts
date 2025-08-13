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
  NoteInteger,
  NoteLabelThemeKey,
  NoteLetter,
  NoteName,
  OctaveNumber,
} from "../types/note-labels.d.ts";
import {
  intervalIntegers,
  noteNameIntegers,
} from "../note-labels/note-labels.ts";
import { noteLabelThemes } from "../note-labels/note-label-themes.ts";
import type { MidiNoteSequence } from "../types/note-sequences.d.ts";

/**
 * Converts a note name and alteration to a note integer (0-11).
 *
 * @param noteName The note name {@link NoteName}.
 * @param alteration The number of semitones to alter the note
 * (e.g., 1 for sharp, -1 for flat). Defaults to 0.
 * @returns The note integer (0-11) representing the note.
 *
 * @example
 * ```ts
 * // Returns 0
 * noteNameToInteger("C", 0);
 *
 * // Returns 1
 * noteNameToInteger("C", 1);
 *
 * // Returns 11
 * noteNameToInteger("B", 0);
 * ```
 */
export function noteNameToInteger(
  noteName: NoteName,
  alteration: number = 0,
): NoteInteger {
  const noteValue = noteNameIntegers[noteName] + alteration;
  return (noteValue % 12 + 12) % 12 as NoteInteger;
}

/**
 * Converts a note name, alteration, and octave to a MIDI note number.
 * Follows "scientific pitch notation" conventions.
 *
 * @param noteName The note name {@link NoteName}.
 * @param alteration The number of semitones to alter the note name.
 * @param noteOctave The octave number (e.g., 4 for middle C).
 * @returns The MIDI note number.
 *
 * @example
 * ```ts
 * // Returns 12 (MIDI note number for C0)
 * noteNameToMidi("C", 0, 0);
 *
 * // Returns 60 (MIDI note number for middle C = C4)
 * noteNameToMidi("C", 0, 4);
 *
 * // Returns 61 (MIDI note number for C#4)
 * noteNameToMidi("C", 1, 4);
 * ```
 */
export function noteNameToMidi(
  noteName: NoteName,
  octaveNumber: OctaveNumber,
  alteration: number = 0,
): MidiNoteNumber {
  const noteValue = noteNameIntegers[noteName] + alteration;
  return noteValue + (octaveNumber + 1) * 12 as MidiNoteNumber;
}

/**
 * Converts a musical note name string including ASCII sharps and flats
 * (e.g., "C#", "Bb", "E") to its corresponding note integer (0-11).
 *
 * The note name should start with a letter from A to G (case-insensitive),
 * optionally followed by one or more sharp symbols ('#', '♯', 'x', or '𝄪'), which add 1 or 2 to the value,
 * or flat ('b' or '♭') or double flat ('𝄫') symbols, which subtract 1 or 2.
 * Any other characters after the initial note letter, that are not valid accidentals,
 * will be considered invalid.
 * Alterations should be less than 12 semitones away in total.
 *
 * @param noteName The musical note name string to convert.
 * @returns The note integer (0-11) representing the note,
 * or `undefined` if the input is invalid.
 */
export function noteNameStringToInteger(
  noteName: string,
): NoteInteger | undefined {
  const noteLetterRegex = /^[A-Ga-g]/;
  const accidentalRegex = /([#♯x𝄪]+)|([b♭𝄫]+)/gu; // u for unicode support

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
      for (const char of sharps) {
        noteAlterInteger += char === "x" || char === "𝄪" ? 2 : 1;
      }
      validAccidentalLength += sharps.length;
    }

    const flats = match[2];
    if (flats) {
      for (const char of flats) {
        noteAlterInteger -= char === "𝄫" ? 2 : 1;
      }
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
    intervalIntegers[interval] as MidiNoteNumber;
}

export function rootMidiAndIntervalToMidi(
  rootNoteMidi: MidiNoteNumber,
  interval: Interval,
): MidiNoteNumber {
  return rootNoteMidi + intervalIntegers[interval] as MidiNoteNumber;
}

// TODO: another function to return an array of note names for a sequence, like ["C", "D", "E♭", ...] for C minor
// TODO: make midiNoteSequenceToIntervals accept a root note - currently it assumes C
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
