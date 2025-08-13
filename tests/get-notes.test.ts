import { assertEquals } from "@std/assert";
import { getNotes } from "../src/utils/get-notes.ts";

Deno.test("getNotes - Major Scales", () => {
  assertEquals(getNotes("C", "ionian"), [
    "C",
    "D",
    "E",
    "F",
    "G",
    "A",
    "B",
    "C",
  ]);
  assertEquals(getNotes("G", "ionian"), [
    "G",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F♯",
    "G",
  ]);
  assertEquals(getNotes("D", "ionian"), [
    "D",
    "E",
    "F♯",
    "G",
    "A",
    "B",
    "C♯",
    "D",
  ]);
  assertEquals(getNotes("A", "ionian"), [
    "A",
    "B",
    "C♯",
    "D",
    "E",
    "F♯",
    "G♯",
    "A",
  ]);
  assertEquals(getNotes("E", "ionian"), [
    "E",
    "F♯",
    "G♯",
    "A",
    "B",
    "C♯",
    "D♯",
    "E",
  ]);
  assertEquals(getNotes("B", "ionian"), [
    "B",
    "C♯",
    "D♯",
    "E",
    "F♯",
    "G♯",
    "A♯",
    "B",
  ]);
  assertEquals(getNotes("F♯", "ionian"), [
    "F♯",
    "G♯",
    "A♯",
    "B",
    "C♯",
    "D♯",
    "E♯",
    "F♯",
  ]);
  assertEquals(getNotes("C♯", "ionian"), [
    "C♯",
    "D♯",
    "E♯",
    "F♯",
    "G♯",
    "A♯",
    "B♯",
    "C♯",
  ]);

  assertEquals(getNotes("F", "ionian"), [
    "F",
    "G",
    "A",
    "B♭",
    "C",
    "D",
    "E",
    "F",
  ]);
  assertEquals(getNotes("B♭", "ionian"), [
    "B♭",
    "C",
    "D",
    "E♭",
    "F",
    "G",
    "A",
    "B♭",
  ]);
  assertEquals(getNotes("E♭", "ionian"), [
    "E♭",
    "F",
    "G",
    "A♭",
    "B♭",
    "C",
    "D",
    "E♭",
  ]);
  assertEquals(getNotes("A♭", "ionian"), [
    "A♭",
    "B♭",
    "C",
    "D♭",
    "E♭",
    "F",
    "G",
    "A♭",
  ]);
  assertEquals(getNotes("D♭", "ionian"), [
    "D♭",
    "E♭",
    "F",
    "G♭",
    "A♭",
    "B♭",
    "C",
    "D♭",
  ]);
  assertEquals(getNotes("G♭", "ionian"), [
    "G♭",
    "A♭",
    "B♭",
    "C♭",
    "D♭",
    "E♭",
    "F",
    "G♭",
  ]);
  assertEquals(getNotes("C♭", "ionian"), [
    "C♭",
    "D♭",
    "E♭",
    "F♭",
    "G♭",
    "A♭",
    "B♭",
    "C♭",
  ]);
});

Deno.test("getNotes - Minor Scales", () => {
  assertEquals(getNotes("C", "aeolian"), [
    "C",
    "D",
    "E♭",
    "F",
    "G",
    "A♭",
    "B♭",
    "C",
  ]);
  assertEquals(getNotes("A", "aeolian"), [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "A",
  ]);
});

Deno.test("getNotes - Mixolydian Modes", () => {
  assertEquals(getNotes("G♭", "mixolydian"), [
    "G♭",
    "A♭",
    "B♭",
    "C♭",
    "D♭",
    "E♭",
    "F♭",
    "G♭",
  ]);
  assertEquals(getNotes("D♭", "mixolydian"), [
    "D♭",
    "E♭",
    "F",
    "G♭",
    "A♭",
    "B♭",
    "C♭",
    "D♭",
  ]);
});

Deno.test("getNotes - Lydian Modes", () => {
  assertEquals(getNotes("F", "lydian"), [
    "F",
    "G",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ]);
});

Deno.test("getNotes - Dominant 13th Chord", () => {
  assertEquals(getNotes("C", "dominant13"), [
    "C",
    "E",
    "G",
    "B♭",
    "D",
    "F",
    "A",
  ]);
});

Deno.test("getNotes - Locrian Modes", () => {
  assertEquals(getNotes("B", "locrian"), [
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "A",
    "B",
  ]);
  assertEquals(getNotes("F", "locrian"), [
    "F",
    "G♭",
    "A♭",
    "B♭",
    "C♭",
    "D♭",
    "E♭",
    "F",
  ]);
});

Deno.test("getNotes - Super Locrian Double Flat 7 Modes", () => {
  assertEquals(getNotes("D♭", "superLocrianDoubleFlat7"), [
    "D♭",
    "E𝄫",
    "F♭",
    "G𝄫",
    "A𝄫",
    "B𝄫",
    "C𝄫",
    "D♭",
  ]);
  assertEquals(getNotes("A", "superLocrianDoubleFlat7"), [
    "A",
    "B♭",
    "C",
    "D♭",
    "E♭",
    "F",
    "G♭",
    "A",
  ]);
});

Deno.test("getNotes - Invalid Inputs", () => {
  // @ts-expect-error invalid function input
  assertEquals(getNotes("X", "ionian"), []);
  // @ts-expect-error invalid function input
  assertEquals(getNotes("C", "invalid-key"), []);
});

Deno.test("getNotes - Order By Pitch", () => {
  assertEquals(getNotes("C", "dominant13", { orderBy: "pitch" }), [
    "C",
    "D",
    "E",
    "F",
    "G",
    "A",
    "B♭",
  ]);
});
