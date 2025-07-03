import { assertEquals } from "@std/assert";
import {
  noteNameToPitchInteger,
  pitchStepToMidiNoteNumber,
} from "../src/utils/note-conversions.ts";

Deno.test("natural notes", () => {
  assertEquals(noteNameToPitchInteger("C"), 0);
  assertEquals(noteNameToPitchInteger("c"), 0);
  assertEquals(noteNameToPitchInteger("D"), 2);
  assertEquals(noteNameToPitchInteger("d"), 2);
  assertEquals(noteNameToPitchInteger("E"), 4);
  assertEquals(noteNameToPitchInteger("e"), 4);
  assertEquals(noteNameToPitchInteger("F"), 5);
  assertEquals(noteNameToPitchInteger("f"), 5);
  assertEquals(noteNameToPitchInteger("G"), 7);
  assertEquals(noteNameToPitchInteger("g"), 7);
  assertEquals(noteNameToPitchInteger("A"), 9);
  assertEquals(noteNameToPitchInteger("a"), 9);
  assertEquals(noteNameToPitchInteger("B"), 11);
  assertEquals(noteNameToPitchInteger("b"), 11);
});

Deno.test("sharp notes using '#'", () => {
  assertEquals(noteNameToPitchInteger("B#"), 0);
  assertEquals(noteNameToPitchInteger("b#"), 0);
  assertEquals(noteNameToPitchInteger("C#"), 1);
  assertEquals(noteNameToPitchInteger("c#"), 1);
  assertEquals(noteNameToPitchInteger("D#"), 3);
  assertEquals(noteNameToPitchInteger("d#"), 3);
  assertEquals(noteNameToPitchInteger("F#"), 6);
  assertEquals(noteNameToPitchInteger("f#"), 6);
  assertEquals(noteNameToPitchInteger("G#"), 8);
  assertEquals(noteNameToPitchInteger("g#"), 8);
  assertEquals(noteNameToPitchInteger("A#"), 10);
  assertEquals(noteNameToPitchInteger("a#"), 10);
});

Deno.test("flat notes using 'b'", () => {
  assertEquals(noteNameToPitchInteger("Db"), 1);
  assertEquals(noteNameToPitchInteger("db"), 1);
  assertEquals(noteNameToPitchInteger("Eb"), 3);
  assertEquals(noteNameToPitchInteger("eb"), 3);
  assertEquals(noteNameToPitchInteger("Fb"), 4);
  assertEquals(noteNameToPitchInteger("fb"), 4);
  assertEquals(noteNameToPitchInteger("Gb"), 6);
  assertEquals(noteNameToPitchInteger("gb"), 6);
  assertEquals(noteNameToPitchInteger("Ab"), 8);
  assertEquals(noteNameToPitchInteger("ab"), 8);
  assertEquals(noteNameToPitchInteger("Bb"), 10);
  assertEquals(noteNameToPitchInteger("bb"), 10);
  assertEquals(noteNameToPitchInteger("Cb"), 11);
  assertEquals(noteNameToPitchInteger("cb"), 11);
});

Deno.test("sharp notes using '♯'", () => {
  assertEquals(noteNameToPitchInteger("B♯"), 0);
  assertEquals(noteNameToPitchInteger("b♯"), 0);
  assertEquals(noteNameToPitchInteger("C♯"), 1);
  assertEquals(noteNameToPitchInteger("c♯"), 1);
  assertEquals(noteNameToPitchInteger("D♯"), 3);
  assertEquals(noteNameToPitchInteger("d♯"), 3);
  assertEquals(noteNameToPitchInteger("F♯"), 6);
  assertEquals(noteNameToPitchInteger("f♯"), 6);
  assertEquals(noteNameToPitchInteger("G♯"), 8);
  assertEquals(noteNameToPitchInteger("g♯"), 8);
  assertEquals(noteNameToPitchInteger("A♯"), 10);
  assertEquals(noteNameToPitchInteger("a♯"), 10);
});

Deno.test("flat notes using '♭'", () => {
  assertEquals(noteNameToPitchInteger("D♭"), 1);
  assertEquals(noteNameToPitchInteger("d♭"), 1);
  assertEquals(noteNameToPitchInteger("E♭"), 3);
  assertEquals(noteNameToPitchInteger("e♭"), 3);
  assertEquals(noteNameToPitchInteger("F♭"), 4);
  assertEquals(noteNameToPitchInteger("f♭"), 4);
  assertEquals(noteNameToPitchInteger("G♭"), 6);
  assertEquals(noteNameToPitchInteger("g♭"), 6);
  assertEquals(noteNameToPitchInteger("A♭"), 8);
  assertEquals(noteNameToPitchInteger("a♭"), 8);
  assertEquals(noteNameToPitchInteger("B♭"), 10);
  assertEquals(noteNameToPitchInteger("b♭"), 10);
  assertEquals(noteNameToPitchInteger("C♭"), 11);
  assertEquals(noteNameToPitchInteger("c♭"), 11);
});

Deno.test("handle double sharps and flats", () => {
  assertEquals(noteNameToPitchInteger("Dbb"), 0);
  assertEquals(noteNameToPitchInteger("D♭♭"), 0);
  assertEquals(noteNameToPitchInteger("B##"), 1);
  assertEquals(noteNameToPitchInteger("b##"), 1);
  assertEquals(noteNameToPitchInteger("C##"), 2);
  assertEquals(noteNameToPitchInteger("c##"), 2);
  assertEquals(noteNameToPitchInteger("D##"), 4);
  assertEquals(noteNameToPitchInteger("d##"), 4);
  assertEquals(noteNameToPitchInteger("Cbb"), 10);
  assertEquals(noteNameToPitchInteger("cbb"), 10);
});

Deno.test("invalid note names", () => {
  assertEquals(noteNameToPitchInteger("H"), undefined);
  assertEquals(noteNameToPitchInteger("Cx"), undefined);
  assertEquals(noteNameToPitchInteger(""), undefined);
  assertEquals(noteNameToPitchInteger(" "), undefined);
});

Deno.test("notes to midi", () => {
  assertEquals(pitchStepToMidiNoteNumber("c", 0, 0), 12);
  assertEquals(pitchStepToMidiNoteNumber("C", 0, 4), 60);
  assertEquals(pitchStepToMidiNoteNumber("C", 1, 4), 61);
});
