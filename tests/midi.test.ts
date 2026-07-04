import { assertEquals } from "@std/assert";
import {
  formatMidiNote,
  formatSpelledMidiNote,
  getMidiForNoteName,
  getMidiOctave,
} from "../src/utils/midi.ts";

Deno.test("notes to midi", () => {
  assertEquals(getMidiForNoteName("C", 0), 12);
  assertEquals(getMidiForNoteName("C", 4), 60);
  assertEquals(getMidiForNoteName("C", 4), 60);
  assertEquals(getMidiForNoteName("D𝄫", 4), 60);
});

Deno.test("MIDI note formatting uses scientific pitch notation", () => {
  assertEquals(getMidiOctave(0), -1);
  assertEquals(getMidiOctave(12), 0);
  assertEquals(getMidiOctave(60), 4);
  assertEquals(getMidiOctave(127), 9);

  assertEquals(formatMidiNote(60), "C4");
  assertEquals(formatMidiNote(61), "D♭4");
  assertEquals(formatMidiNote(59), "B3");
  assertEquals(formatMidiNote(0), "C-1");
  assertEquals(formatMidiNote(61, { spelling: "flat" }), "D♭4");
  assertEquals(formatMidiNote(61, { spelling: "sharp" }), "C♯4");
  assertEquals(formatMidiNote(70, { spelling: "flat" }), "B♭4");
  assertEquals(formatMidiNote(70, { spelling: "sharp" }), "A♯4");
});

Deno.test("spelled MIDI note formatting preserves supplied spelling", () => {
  assertEquals(formatSpelledMidiNote("C♯", 61), "C♯4");
  assertEquals(formatSpelledMidiNote("D♭", 61), "D♭4");
  assertEquals(formatSpelledMidiNote("", 61), "");
});
