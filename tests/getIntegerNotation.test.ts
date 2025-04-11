import { assertEquals } from "@std/assert";
import { getIntegerNotation } from "../src/utils/music-theory-data-utils.ts";

Deno.test("natural notes", () => {
  assertEquals(getIntegerNotation("C"), 0);
  assertEquals(getIntegerNotation("c"), 0);
  assertEquals(getIntegerNotation("D"), 2);
  assertEquals(getIntegerNotation("d"), 2);
  assertEquals(getIntegerNotation("E"), 4);
  assertEquals(getIntegerNotation("e"), 4);
  assertEquals(getIntegerNotation("F"), 5);
  assertEquals(getIntegerNotation("f"), 5);
  assertEquals(getIntegerNotation("G"), 7);
  assertEquals(getIntegerNotation("g"), 7);
  assertEquals(getIntegerNotation("A"), 9);
  assertEquals(getIntegerNotation("a"), 9);
  assertEquals(getIntegerNotation("B"), 11);
  assertEquals(getIntegerNotation("b"), 11);
});

Deno.test("sharp notes using '#'", () => {
  assertEquals(getIntegerNotation("B#"), 0);
  assertEquals(getIntegerNotation("b#"), 0);
  assertEquals(getIntegerNotation("C#"), 1);
  assertEquals(getIntegerNotation("c#"), 1);
  assertEquals(getIntegerNotation("D#"), 3);
  assertEquals(getIntegerNotation("d#"), 3);
  assertEquals(getIntegerNotation("F#"), 6);
  assertEquals(getIntegerNotation("f#"), 6);
  assertEquals(getIntegerNotation("G#"), 8);
  assertEquals(getIntegerNotation("g#"), 8);
  assertEquals(getIntegerNotation("A#"), 10);
  assertEquals(getIntegerNotation("a#"), 10);
});

Deno.test("flat notes using 'b'", () => {
  assertEquals(getIntegerNotation("Db"), 1);
  assertEquals(getIntegerNotation("db"), 1);
  assertEquals(getIntegerNotation("Eb"), 3);
  assertEquals(getIntegerNotation("eb"), 3);
  assertEquals(getIntegerNotation("Fb"), 4);
  assertEquals(getIntegerNotation("fb"), 4);
  assertEquals(getIntegerNotation("Gb"), 6);
  assertEquals(getIntegerNotation("gb"), 6);
  assertEquals(getIntegerNotation("Ab"), 8);
  assertEquals(getIntegerNotation("ab"), 8);
  assertEquals(getIntegerNotation("Bb"), 10);
  assertEquals(getIntegerNotation("bb"), 10);
  assertEquals(getIntegerNotation("Cb"), 11);
  assertEquals(getIntegerNotation("cb"), 11);
});

Deno.test("sharp notes using '♯'", () => {
  assertEquals(getIntegerNotation("B♯"), 0);
  assertEquals(getIntegerNotation("b♯"), 0);
  assertEquals(getIntegerNotation("C♯"), 1);
  assertEquals(getIntegerNotation("c♯"), 1);
  assertEquals(getIntegerNotation("D♯"), 3);
  assertEquals(getIntegerNotation("d♯"), 3);
  assertEquals(getIntegerNotation("F♯"), 6);
  assertEquals(getIntegerNotation("f♯"), 6);
  assertEquals(getIntegerNotation("G♯"), 8);
  assertEquals(getIntegerNotation("g♯"), 8);
  assertEquals(getIntegerNotation("A♯"), 10);
  assertEquals(getIntegerNotation("a♯"), 10);
});

Deno.test("flat notes using '♭'", () => {
  assertEquals(getIntegerNotation("D♭"), 1);
  assertEquals(getIntegerNotation("d♭"), 1);
  assertEquals(getIntegerNotation("E♭"), 3);
  assertEquals(getIntegerNotation("e♭"), 3);
  assertEquals(getIntegerNotation("F♭"), 4);
  assertEquals(getIntegerNotation("f♭"), 4);
  assertEquals(getIntegerNotation("G♭"), 6);
  assertEquals(getIntegerNotation("g♭"), 6);
  assertEquals(getIntegerNotation("A♭"), 8);
  assertEquals(getIntegerNotation("a♭"), 8);
  assertEquals(getIntegerNotation("B♭"), 10);
  assertEquals(getIntegerNotation("b♭"), 10);
  assertEquals(getIntegerNotation("C♭"), 11);
  assertEquals(getIntegerNotation("c♭"), 11);
});

Deno.test("handle double sharps and flats", () => {
  assertEquals(getIntegerNotation("Dbb"), 0);
  assertEquals(getIntegerNotation("D♭♭"), 0);
  assertEquals(getIntegerNotation("B##"), 1);
  assertEquals(getIntegerNotation("b##"), 1);
  assertEquals(getIntegerNotation("C##"), 2);
  assertEquals(getIntegerNotation("c##"), 2);
  assertEquals(getIntegerNotation("D##"), 4);
  assertEquals(getIntegerNotation("d##"), 4);
  assertEquals(getIntegerNotation("Cbb"), 10);
  assertEquals(getIntegerNotation("cbb"), 10);
});

Deno.test("invalid note names", () => {
  assertEquals(getIntegerNotation("H"), undefined);
  assertEquals(getIntegerNotation("Cx"), undefined);
  assertEquals(getIntegerNotation("Dbbbb"), undefined);
  assertEquals(getIntegerNotation(""), undefined);
  assertEquals(getIntegerNotation(" "), undefined);
});
