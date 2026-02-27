import { assertEquals } from "@std/assert";
import {
  normalizeCompoundIntervalString,
  normalizeCompoundIntervalStringArray,
  normalizeIntervalString,
  normalizeIntervalStringArray,
  normalizeSimpleIntervalString,
  normalizeSimpleIntervalStringArray,
} from "../src/utils/intervals.ts";

Deno.test("normalize interval qualities", () => {
  assertEquals(normalizeIntervalString("M3"), "3");
  assertEquals(normalizeIntervalString("m3"), "♭3");
  assertEquals(normalizeIntervalString("P5"), "5");
  assertEquals(normalizeIntervalString("d5"), "♭5");
  assertEquals(normalizeIntervalString("A4"), "♯4");
  assertEquals(normalizeIntervalString("AA4"), "𝄪4");
  assertEquals(normalizeIntervalString("dd5"), "𝄫5");
});

Deno.test("normalize ASCII accidentals in intervals", () => {
  assertEquals(normalizeIntervalString("b3"), "♭3");
  assertEquals(normalizeIntervalString("bb7"), "𝄫7");
  assertEquals(normalizeIntervalString("#4"), "♯4");
  assertEquals(normalizeIntervalString("##4"), "𝄪4");
  assertEquals(normalizeIntervalString("x4"), "𝄪4");
  assertEquals(normalizeIntervalString("3"), "3");
  // mixed accidentals that cancel out
  assertEquals(normalizeIntervalString("b#3"), "3");
  // natural symbol explicitly
  assertEquals(normalizeIntervalString("♮3"), "♮3");
});

Deno.test("invalid intervals return undefined", () => {
  assertEquals(normalizeIntervalString(""), undefined);
  assertEquals(normalizeIntervalString("M 3"), undefined);
  assertEquals(normalizeIntervalString("invalid"), undefined);
  assertEquals(normalizeIntervalString("b"), undefined);
  assertEquals(normalizeIntervalString("16"), undefined); // out of bounds
});

Deno.test("normalize array of intervals", () => {
  const input = ["M3", "b7", "invalid", "P5", "x4", "8"];
  const expected = ["3", "♭7", "5", "𝄪4", "8"];
  assertEquals(normalizeIntervalStringArray(input), expected);
});

Deno.test("normalize simple intervals", () => {
  assertEquals(normalizeSimpleIntervalString("M3"), "3");
  assertEquals(normalizeSimpleIntervalString("9"), undefined); // compound
  assertEquals(normalizeSimpleIntervalString("b7"), "♭7");
  assertEquals(normalizeSimpleIntervalString("b9"), undefined);

  const input = ["M3", "9", "b7", "b9"];
  const expected = ["3", "♭7"];
  assertEquals(normalizeSimpleIntervalStringArray(input), expected);
});

Deno.test("normalize compound intervals", () => {
  assertEquals(normalizeCompoundIntervalString("M3"), undefined); // simple
  assertEquals(normalizeCompoundIntervalString("9"), "9");
  assertEquals(normalizeCompoundIntervalString("b7"), undefined);
  assertEquals(normalizeCompoundIntervalString("b9"), "♭9");

  const input = ["M3", "9", "b7", "b9", "13"];
  const expected = ["9", "♭9", "13"];
  assertEquals(normalizeCompoundIntervalStringArray(input), expected);
});
