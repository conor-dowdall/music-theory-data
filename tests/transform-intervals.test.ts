import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { transformIntervals } from "../src/utils/transform-intervals.ts";
import type { Interval } from "../src/types/note-labels.d.ts";

Deno.test("transformIntervals - Spread", () => {
  const majorScaleIntervals: Interval[] = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
  ];
  const spread = transformIntervals(majorScaleIntervals, "spread");
  assertEquals(spread, ["1", "3", "5", "7", "9", "11", "13"]);
});

Deno.test("transformIntervals - Compress", () => {
  const dominant9thIntervals: Interval[] = ["1", "3", "5", "♭7", "9"];
  const compressed = transformIntervals(dominant9thIntervals, "compress");
  assertEquals(compressed, ["1", "3", "5", "♭7", "2"]);
});
