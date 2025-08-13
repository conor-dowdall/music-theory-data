import type {
  Interval,
  NoteInteger,
  NoteLabelCollectionKey,
  NoteLetter,
  NoteName,
  OctaveNumber,
} from "../types/labels.d.ts";
import {
  intervalIntegers,
  noteNameIntegers,
} from "../data/labels/note-labels.ts";
import { noteLabelCollections } from "../data/labels/note-label-collections.ts";
import type { MidiNoteNumber, MidiNoteSequence } from "../types/midi.d.ts";

export function noteNameToInteger(
  noteName: NoteName,
  alteration: number = 0,
): NoteInteger {
  const noteValue = noteNameIntegers[noteName] + alteration;
  return (noteValue % 12 + 12) % 12 as NoteInteger;
}

export function noteNameToMidi(
  noteName: NoteName,
  octaveNumber: OctaveNumber,
  alteration: number = 0,
): MidiNoteNumber {
  const noteValue = noteNameIntegers[noteName] + alteration;
  return noteValue + (octaveNumber + 1) * 12 as MidiNoteNumber;
}

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
  noteLabelCollectionKey: NoteLabelCollectionKey,
): (string | null)[] {
  const result = midiNoteSequence.map((note) => {
    if (note === null) return null;
    return noteLabelCollections[noteLabelCollectionKey]["labels"][note % 12];
  }) as (string | null)[];
  return result;
}
