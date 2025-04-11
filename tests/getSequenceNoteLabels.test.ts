import { assertEquals } from "@std/assert";
import { getSequenceNoteLabels } from "../src/utils/music-theory-data-utils.ts";

Deno.test("ionian scale flat notes", () => {
  assertEquals(getSequenceNoteLabels("ionian", "flat"), [
    "C",
    "D♭",
    "D",
    "E♭",
    "E",
    "F",
    "G♭",
    "G",
    "A♭",
    "A",
    "B♭",
    "B",
  ]);
});

Deno.test("ionian scale triad chords", () => {
  assertEquals(getSequenceNoteLabels("ionian", "triad"), [
    "M",
    "",
    "m",
    "",
    "m",
    "M",
    "",
    "M",
    "",
    "m",
    "",
    "o",
  ]);
});

Deno.test("lydian scale relative notes", () => {
  assertEquals(getSequenceNoteLabels("lydian", "relative"), [
    "1",
    "♭2",
    "2",
    "♭3",
    "3",
    "4",
    "♯4",
    "5",
    "♭6",
    "6",
    "♭7",
    "7",
  ]);
});

Deno.test("major chord triad chords", () => {
  assertEquals(getSequenceNoteLabels("major", "triad"), [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
});

Deno.test("non-existent sequence theme", () => {
  assertEquals(getSequenceNoteLabels("non-existent", "flat"), undefined);
});

Deno.test("non-existent label theme", () => {
  assertEquals(getSequenceNoteLabels("ionian", "non-existent"), undefined);
});
