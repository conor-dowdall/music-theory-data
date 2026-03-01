import { assertEquals } from "@std/assert";
import { getMidiFromNoteName } from "../src/utils/midi.ts";

Deno.test("notes to midi", () => {
  assertEquals(getMidiFromNoteName("C", 0), 12);
  assertEquals(getMidiFromNoteName("C", 4), 60);
  assertEquals(getMidiFromNoteName("C", 4), 60);
  assertEquals(getMidiFromNoteName("D𝄫", 4), 60);
});
