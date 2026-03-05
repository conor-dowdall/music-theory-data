import { assertEquals } from "@std/assert";
import { getMidiForNoteName } from "../src/utils/midi.ts";

Deno.test("notes to midi", () => {
  assertEquals(getMidiForNoteName("C", 0), 12);
  assertEquals(getMidiForNoteName("C", 4), 60);
  assertEquals(getMidiForNoteName("C", 4), 60);
  assertEquals(getMidiForNoteName("D𝄫", 4), 60);
});
