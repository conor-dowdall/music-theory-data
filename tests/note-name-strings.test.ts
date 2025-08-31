import { assertEquals } from "@std/assert";
import {
  normalizeNoteNameString,
  noteNameStringToInteger,
} from "../src/utils/note-names.ts";

Deno.test("natural notes", () => {
  assertEquals(noteNameStringToInteger("C"), 0);
  assertEquals(noteNameStringToInteger("c"), 0);
  assertEquals(noteNameStringToInteger("D"), 2);
  assertEquals(noteNameStringToInteger("d"), 2);
  assertEquals(noteNameStringToInteger("E"), 4);
  assertEquals(noteNameStringToInteger("e"), 4);
  assertEquals(noteNameStringToInteger("F"), 5);
  assertEquals(noteNameStringToInteger("f"), 5);
  assertEquals(noteNameStringToInteger("G"), 7);
  assertEquals(noteNameStringToInteger("g"), 7);
  assertEquals(noteNameStringToInteger("A"), 9);
  assertEquals(noteNameStringToInteger("a"), 9);
  assertEquals(noteNameStringToInteger("B"), 11);
  assertEquals(noteNameStringToInteger("b"), 11);
});

Deno.test("sharp notes using '#'", () => {
  assertEquals(noteNameStringToInteger("B#"), 0);
  assertEquals(noteNameStringToInteger("b#"), 0);
  assertEquals(noteNameStringToInteger("C#"), 1);
  assertEquals(noteNameStringToInteger("c#"), 1);
  assertEquals(noteNameStringToInteger("D#"), 3);
  assertEquals(noteNameStringToInteger("d#"), 3);
  assertEquals(noteNameStringToInteger("F#"), 6);
  assertEquals(noteNameStringToInteger("f#"), 6);
  assertEquals(noteNameStringToInteger("G#"), 8);
  assertEquals(noteNameStringToInteger("g#"), 8);
  assertEquals(noteNameStringToInteger("A#"), 10);
  assertEquals(noteNameStringToInteger("a#"), 10);
});

Deno.test("flat notes using 'b'", () => {
  assertEquals(noteNameStringToInteger("Db"), 1);
  assertEquals(noteNameStringToInteger("db"), 1);
  assertEquals(noteNameStringToInteger("Eb"), 3);
  assertEquals(noteNameStringToInteger("eb"), 3);
  assertEquals(noteNameStringToInteger("Fb"), 4);
  assertEquals(noteNameStringToInteger("fb"), 4);
  assertEquals(noteNameStringToInteger("Gb"), 6);
  assertEquals(noteNameStringToInteger("gb"), 6);
  assertEquals(noteNameStringToInteger("Ab"), 8);
  assertEquals(noteNameStringToInteger("ab"), 8);
  assertEquals(noteNameStringToInteger("Bb"), 10);
  assertEquals(noteNameStringToInteger("bb"), 10);
  assertEquals(noteNameStringToInteger("Cb"), 11);
  assertEquals(noteNameStringToInteger("cb"), 11);
});

Deno.test("sharp notes using '♯'", () => {
  assertEquals(noteNameStringToInteger("B♯"), 0);
  assertEquals(noteNameStringToInteger("b♯"), 0);
  assertEquals(noteNameStringToInteger("C♯"), 1);
  assertEquals(noteNameStringToInteger("c♯"), 1);
  assertEquals(noteNameStringToInteger("D♯"), 3);
  assertEquals(noteNameStringToInteger("d♯"), 3);
  assertEquals(noteNameStringToInteger("F♯"), 6);
  assertEquals(noteNameStringToInteger("f♯"), 6);
  assertEquals(noteNameStringToInteger("G♯"), 8);
  assertEquals(noteNameStringToInteger("g♯"), 8);
  assertEquals(noteNameStringToInteger("A♯"), 10);
  assertEquals(noteNameStringToInteger("a♯"), 10);
});

Deno.test("flat notes using '♭'", () => {
  assertEquals(noteNameStringToInteger("D♭"), 1);
  assertEquals(noteNameStringToInteger("d♭"), 1);
  assertEquals(noteNameStringToInteger("E♭"), 3);
  assertEquals(noteNameStringToInteger("e♭"), 3);
  assertEquals(noteNameStringToInteger("F♭"), 4);
  assertEquals(noteNameStringToInteger("f♭"), 4);
  assertEquals(noteNameStringToInteger("G♭"), 6);
  assertEquals(noteNameStringToInteger("g♭"), 6);
  assertEquals(noteNameStringToInteger("A♭"), 8);
  assertEquals(noteNameStringToInteger("a♭"), 8);
  assertEquals(noteNameStringToInteger("B♭"), 10);
  assertEquals(noteNameStringToInteger("b♭"), 10);
  assertEquals(noteNameStringToInteger("C♭"), 11);
  assertEquals(noteNameStringToInteger("c♭"), 11);
});

Deno.test("handle double sharps and flats", () => {
  assertEquals(noteNameStringToInteger("Dbb"), 0);
  assertEquals(noteNameStringToInteger("D♭♭"), 0);
  assertEquals(noteNameStringToInteger("B##"), 1);
  assertEquals(noteNameStringToInteger("b##"), 1);
  assertEquals(noteNameStringToInteger("C##"), 2);
  assertEquals(noteNameStringToInteger("c##"), 2);
  assertEquals(noteNameStringToInteger("D##"), 4);
  assertEquals(noteNameStringToInteger("d##"), 4);
  assertEquals(noteNameStringToInteger("Cbb"), 10);
  assertEquals(noteNameStringToInteger("cbb"), 10);
  assertEquals(noteNameStringToInteger("Cx"), 2);
  assertEquals(noteNameStringToInteger("E𝄫"), 2);
});

Deno.test("invalid note names", () => {
  assertEquals(noteNameStringToInteger("E𝄫b"), undefined);
  assertEquals(noteNameStringToInteger("H"), undefined);
  assertEquals(noteNameStringToInteger(""), undefined);
  assertEquals(noteNameStringToInteger(" "), undefined);
});

Deno.test("normalize valid note name strings", () => {
  assertEquals(normalizeNoteNameString("Cbb"), "C𝄫");
  assertEquals(normalizeNoteNameString("C♭♭"), "C𝄫");
  assertEquals(normalizeNoteNameString("Cb"), "C♭");
  assertEquals(normalizeNoteNameString("C♭"), "C♭");
  assertEquals(normalizeNoteNameString("C"), "C");
  assertEquals(normalizeNoteNameString("C#"), "C♯");
  assertEquals(normalizeNoteNameString("C♯"), "C♯");
  assertEquals(normalizeNoteNameString("C##"), "C𝄪");
  assertEquals(normalizeNoteNameString("C♯♯"), "C𝄪");
  assertEquals(normalizeNoteNameString("Cx"), "C𝄪");
  assertEquals(normalizeNoteNameString("CX"), "C𝄪");
});

Deno.test("normalize invalid note name strings", () => {
  assertEquals(normalizeNoteNameString("Cbbb"), undefined);
  assertEquals(normalizeNoteNameString("C♭♭♭"), undefined);
  assertEquals(normalizeNoteNameString("Cu"), undefined);
  assertEquals(normalizeNoteNameString("J♭"), undefined);
  assertEquals(normalizeNoteNameString("Q"), undefined);
  assertEquals(normalizeNoteNameString("C###"), undefined);
  assertEquals(normalizeNoteNameString("C♯♯♯♯♯♯"), undefined);
  assertEquals(normalizeNoteNameString("C##u"), undefined);
  assertEquals(normalizeNoteNameString("Ca♯♯"), undefined);
  assertEquals(normalizeNoteNameString("CCx"), undefined);
  assertEquals(normalizeNoteNameString("CXxxZX"), undefined);
});
