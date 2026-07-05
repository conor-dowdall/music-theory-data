import { assertEquals } from "@std/assert";
import {
  formatMidiNote,
  formatNoteNameWithMidiOctave,
  getMidiForNoteName,
  getScientificPitchOctaveForMidiNote,
} from "../src/utils/midi.ts";

Deno.test("notes to midi", () => {
  assertEquals(getMidiForNoteName("C", 0), 12);
  assertEquals(getMidiForNoteName("C", 4), 60);
  assertEquals(getMidiForNoteName("C", 4), 60);
  assertEquals(getMidiForNoteName("D𝄫", 4), 60);
});

Deno.test("MIDI note formatting uses scientific pitch notation", () => {
  assertEquals(getScientificPitchOctaveForMidiNote(0), -1);
  assertEquals(getScientificPitchOctaveForMidiNote(12), 0);
  assertEquals(getScientificPitchOctaveForMidiNote(60), 4);
  assertEquals(getScientificPitchOctaveForMidiNote(127), 9);

  assertEquals(formatMidiNote(60), "C4");
  assertEquals(formatMidiNote(61), "D♭4");
  assertEquals(formatMidiNote(59), "B3");
  assertEquals(formatMidiNote(0), "C-1");
  assertEquals(formatMidiNote(61, { spelling: "flat" }), "D♭4");
  assertEquals(formatMidiNote(61, { spelling: "sharp" }), "C♯4");
  assertEquals(formatMidiNote(70, { spelling: "flat" }), "B♭4");
  assertEquals(formatMidiNote(70, { spelling: "sharp" }), "A♯4");
});

Deno.test("note name with MIDI octave formatting preserves supplied note name", () => {
  assertEquals(formatNoteNameWithMidiOctave("C♯", 61), "C♯4");
  assertEquals(formatNoteNameWithMidiOctave("D♭", 61), "D♭4");
  assertEquals(formatNoteNameWithMidiOctave("", 61), "");
});
