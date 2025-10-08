import { assertEquals } from "@std/assert";
import { noteNameToMidi } from "../src/utils/midi.ts";

Deno.test("notes to midi", () => {
  assertEquals(noteNameToMidi("C", 0), 12);
  assertEquals(noteNameToMidi("C", 4), 60);
  assertEquals(noteNameToMidi("C", 4), 60);
  assertEquals(noteNameToMidi("D𝄫", 4), 60);
});
