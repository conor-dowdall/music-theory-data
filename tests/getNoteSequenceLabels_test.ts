import { assertEquals } from "@std/assert";
import { getNoteSequenceLabels } from "../src/utils/getNoteSequenceLabels.ts";

Deno.test("ionian scale flat notes", () => {
  assertEquals(getNoteSequenceLabels("ionian", "flat"), [
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
  assertEquals(getNoteSequenceLabels("ionian", "triad"), [
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
  assertEquals(getNoteSequenceLabels("lydian", "relative"), [
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
  assertEquals(getNoteSequenceLabels("major", "triad"), [
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
  // @ts-expect-error non-existent theme
  assertEquals(getNoteSequenceLabels("non-existent", "flat"), undefined);
});

Deno.test("non-existent label theme", () => {
  assertEquals(getNoteSequenceLabels("ionian", "non-existent"), undefined);
});

Deno.test("lydian augmented scale sharp notes", () => {
  assertEquals(getNoteSequenceLabels("lydianAugmented", "sharp"), [
    "C",
    "C♯",
    "D",
    "D♯",
    "E",
    "F",
    "F♯",
    "G",
    "G♯",
    "A",
    "A♯",
    "B",
  ]);
});
