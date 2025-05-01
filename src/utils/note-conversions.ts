/**
 * Utility functions for converting between note names, integer notation
 * and midi note numbers.
 * Handles both #,b and ♯,♭ accidental formats.
 *
 * @module
 */

import type { PitchInteger } from "../types/note-sequences.d.ts";
import type { PitchAlter, PitchStep } from "../types/note-labels.d.ts";
import { pitchSteps } from "../note-labels/mod.ts";

/**
 * Converts a pitch step (A-G) and alteration (number of semitones) to a pitch integer (0-11).
 *
 * @param pitchStep The pitch step (A-G).
 * @param pitchAlter The number of semitones to alter the pitch step
 * (e.g., 1 for sharp, -1 for flat). Defaults to 0.
 * @returns The pitch integer (0-11) representing the pitch.
 *
 * @example
 * // Returns 0 (C)
 * pitchStepToPitchInteger("C", 0);
 *
 * @example
 * // Returns 1 (C# or Db)
 * pitchStepToPitchInteger("C", 1);
 *
 * @example
 * // Returns 11 (B)
 * pitchStepToPitchInteger("B", 0);
 */
export function pitchStepToPitchInteger(
  pitchStep: PitchStep,
  pitchAlter: PitchAlter = 0,
): PitchInteger {
  const pitchInteger = (pitchSteps[pitchStep] + pitchAlter + 12) % 12;
  return pitchInteger as PitchInteger;
}

/**
 * Converts a pitch step, alteration, and octave to a MIDI note number.
 * Follows "scientific pitch notation" conventions.
 *
 * @param pitchStep The pitch step (A-G | a-g).
 * @param pitchAlter The number of semitones to alter the pitch step.
 * @param pitchOctave The octave number (e.g., 4 for middle C).
 * @returns The MIDI note number.
 *
 * @example
 * // Returns 12 (MIDI note number for C0)
 * pitchStepToMidiNoteNumber("c", 0, 0);
 *
 * @example
 * // Returns 60 (MIDI note number for middle C = C4)
 * pitchStepToMidiNoteNumber("C", 0, 4);
 *
 * @example
 * // Returns 61 (MIDI note number for C#4)
 * pitchStepToMidiNoteNumber("C", 1, 4);
 */
export function pitchStepToMidiNoteNumber(
  pitchStep: PitchStep,
  pitchAlter: PitchAlter,
  pitchOctave: number,
): number {
  return (
    pitchStepToPitchInteger(pitchStep, pitchAlter) + (pitchOctave + 1) * 12
  );
}

/**
 * Converts a musical note name string (e.g., "C#", "Bb", "E") to its
 * corresponding pitch integer (0-11).
 *
 * The note name should start with a letter from A to G (case-insensitive),
 * optionally followed by one or more sharp ('#' or '♯') or flat ('b' or '♭') symbols.
 * Any other characters after the initial note letter, that are not valid accidentals,
 * will be considered invalid.
 *
 * @param noteName The musical note name string to convert.
 * @returns The pitch integer (0-11) representing the note,
 * or `undefined` if the input is invalid.
 */
export function noteNameToPitchInteger(
  noteName: string,
): PitchInteger | undefined {
  const pitchStepRegex = /^[A-Ga-g]/;
  const accidentalRegex = /([#♯]+)|([b♭]+)/g;

  const pitchStepMatch = noteName.match(pitchStepRegex);
  if (!pitchStepMatch) {
    console.warn(`Invalid note name string: ${noteName}`);
    return undefined;
  }

  const pitchStep = pitchStepMatch[0] as PitchStep;
  if (!(pitchStep in pitchSteps)) {
    console.warn(`Invalid pitch step: ${pitchStep}`);
    return undefined;
  }

  // Extract the accidental part of the note name
  const accidentalString = noteName.substring(1);
  let validAccidentalLength = 0;
  let pitchAlter = 0;

  for (const match of accidentalString.matchAll(accidentalRegex)) {
    const sharps = match[1];
    if (sharps) {
      pitchAlter += sharps.length;
      validAccidentalLength += sharps.length;
    }

    const flats = match[2];
    if (flats) {
      pitchAlter -= flats.length;
      validAccidentalLength += flats.length;
    }
  }

  // Check if the entire accidental string had valid accidentals
  if (accidentalString.length > validAccidentalLength) {
    console.warn(`Invalid accidental characters in: ${noteName}`);
    return undefined;
  }

  return ((pitchSteps[pitchStep] + pitchAlter + 12) % 12) as PitchInteger;
}
