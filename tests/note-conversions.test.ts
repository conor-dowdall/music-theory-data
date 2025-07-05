import { assertEquals } from "@std/assert";
import {
  noteLetterToMidiNoteNumber,
  simpleNoteNameToInteger,
} from "../src/utils/note-conversions.ts";

Deno.test("natural notes", () => {
  assertEquals(simpleNoteNameToInteger("C"), 0);
  assertEquals(simpleNoteNameToInteger("c"), 0);
  assertEquals(simpleNoteNameToInteger("D"), 2);
  assertEquals(simpleNoteNameToInteger("d"), 2);
  assertEquals(simpleNoteNameToInteger("E"), 4);
  assertEquals(simpleNoteNameToInteger("e"), 4);
  assertEquals(simpleNoteNameToInteger("F"), 5);
  assertEquals(simpleNoteNameToInteger("f"), 5);
  assertEquals(simpleNoteNameToInteger("G"), 7);
  assertEquals(simpleNoteNameToInteger("g"), 7);
  assertEquals(simpleNoteNameToInteger("A"), 9);
  assertEquals(simpleNoteNameToInteger("a"), 9);
  assertEquals(simpleNoteNameToInteger("B"), 11);
  assertEquals(simpleNoteNameToInteger("b"), 11);
});

Deno.test("sharp notes using '#'", () => {
  assertEquals(simpleNoteNameToInteger("B#"), 0);
  assertEquals(simpleNoteNameToInteger("b#"), 0);
  assertEquals(simpleNoteNameToInteger("C#"), 1);
  assertEquals(simpleNoteNameToInteger("c#"), 1);
  assertEquals(simpleNoteNameToInteger("D#"), 3);
  assertEquals(simpleNoteNameToInteger("d#"), 3);
  assertEquals(simpleNoteNameToInteger("F#"), 6);
  assertEquals(simpleNoteNameToInteger("f#"), 6);
  assertEquals(simpleNoteNameToInteger("G#"), 8);
  assertEquals(simpleNoteNameToInteger("g#"), 8);
  assertEquals(simpleNoteNameToInteger("A#"), 10);
  assertEquals(simpleNoteNameToInteger("a#"), 10);
});

Deno.test("flat notes using 'b'", () => {
  assertEquals(simpleNoteNameToInteger("Db"), 1);
  assertEquals(simpleNoteNameToInteger("db"), 1);
  assertEquals(simpleNoteNameToInteger("Eb"), 3);
  assertEquals(simpleNoteNameToInteger("eb"), 3);
  assertEquals(simpleNoteNameToInteger("Fb"), 4);
  assertEquals(simpleNoteNameToInteger("fb"), 4);
  assertEquals(simpleNoteNameToInteger("Gb"), 6);
  assertEquals(simpleNoteNameToInteger("gb"), 6);
  assertEquals(simpleNoteNameToInteger("Ab"), 8);
  assertEquals(simpleNoteNameToInteger("ab"), 8);
  assertEquals(simpleNoteNameToInteger("Bb"), 10);
  assertEquals(simpleNoteNameToInteger("bb"), 10);
  assertEquals(simpleNoteNameToInteger("Cb"), 11);
  assertEquals(simpleNoteNameToInteger("cb"), 11);
});

Deno.test("sharp notes using '♯'", () => {
  assertEquals(simpleNoteNameToInteger("B♯"), 0);
  assertEquals(simpleNoteNameToInteger("b♯"), 0);
  assertEquals(simpleNoteNameToInteger("C♯"), 1);
  assertEquals(simpleNoteNameToInteger("c♯"), 1);
  assertEquals(simpleNoteNameToInteger("D♯"), 3);
  assertEquals(simpleNoteNameToInteger("d♯"), 3);
  assertEquals(simpleNoteNameToInteger("F♯"), 6);
  assertEquals(simpleNoteNameToInteger("f♯"), 6);
  assertEquals(simpleNoteNameToInteger("G♯"), 8);
  assertEquals(simpleNoteNameToInteger("g♯"), 8);
  assertEquals(simpleNoteNameToInteger("A♯"), 10);
  assertEquals(simpleNoteNameToInteger("a♯"), 10);
});

Deno.test("flat notes using '♭'", () => {
  assertEquals(simpleNoteNameToInteger("D♭"), 1);
  assertEquals(simpleNoteNameToInteger("d♭"), 1);
  assertEquals(simpleNoteNameToInteger("E♭"), 3);
  assertEquals(simpleNoteNameToInteger("e♭"), 3);
  assertEquals(simpleNoteNameToInteger("F♭"), 4);
  assertEquals(simpleNoteNameToInteger("f♭"), 4);
  assertEquals(simpleNoteNameToInteger("G♭"), 6);
  assertEquals(simpleNoteNameToInteger("g♭"), 6);
  assertEquals(simpleNoteNameToInteger("A♭"), 8);
  assertEquals(simpleNoteNameToInteger("a♭"), 8);
  assertEquals(simpleNoteNameToInteger("B♭"), 10);
  assertEquals(simpleNoteNameToInteger("b♭"), 10);
  assertEquals(simpleNoteNameToInteger("C♭"), 11);
  assertEquals(simpleNoteNameToInteger("c♭"), 11);
});

Deno.test("handle double sharps and flats", () => {
  assertEquals(simpleNoteNameToInteger("Dbb"), 0);
  assertEquals(simpleNoteNameToInteger("D♭♭"), 0);
  assertEquals(simpleNoteNameToInteger("B##"), 1);
  assertEquals(simpleNoteNameToInteger("b##"), 1);
  assertEquals(simpleNoteNameToInteger("C##"), 2);
  assertEquals(simpleNoteNameToInteger("c##"), 2);
  assertEquals(simpleNoteNameToInteger("D##"), 4);
  assertEquals(simpleNoteNameToInteger("d##"), 4);
  assertEquals(simpleNoteNameToInteger("Cbb"), 10);
  assertEquals(simpleNoteNameToInteger("cbb"), 10);
});

Deno.test("invalid note names", () => {
  assertEquals(simpleNoteNameToInteger("H"), undefined);
  assertEquals(simpleNoteNameToInteger("Cx"), undefined);
  assertEquals(simpleNoteNameToInteger(""), undefined);
  assertEquals(simpleNoteNameToInteger(" "), undefined);
});

Deno.test("notes to midi", () => {
  assertEquals(noteLetterToMidiNoteNumber("c", 0, 0), 12);
  assertEquals(noteLetterToMidiNoteNumber("C", 0, 4), 60);
  assertEquals(noteLetterToMidiNoteNumber("C", 1, 4), 61);
});
