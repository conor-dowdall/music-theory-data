import { assertEquals } from "@std/assert";
import { transformIntervals } from "../src/utils/intervals.ts";
import { diatonicModes } from "../src/data/note-collections/diatonic-modes.ts";
import { dominantVariants } from "../src/data/note-collections/dominant-variants.ts";

Deno.test("simpleToExtension ionian", () => {
  const spread = transformIntervals(
    diatonicModes.ionian.intervals,
    {
      intervalTransformation: "simpleToExtension",
      filterOutOctave: true,
      sortIntervals: true,
    },
  );
  assertEquals(spread, ["1", "3", "5", "7", "9", "11", "13"]);
});

Deno.test("simpleToExtension ionian - unsorted", () => {
  const spread = transformIntervals(
    diatonicModes.ionian.intervals,
    {
      intervalTransformation: "simpleToExtension",
      filterOutOctave: true,
      sortIntervals: false,
    },
  );
  assertEquals(spread, ["1", "9", "3", "11", "5", "13", "7"]);
});

Deno.test("simpleToExtension ionian with octave", () => {
  const spread = transformIntervals(
    diatonicModes.ionian.intervals,
    {
      intervalTransformation: "simpleToExtension",
      filterOutOctave: false,
      sortIntervals: true,
    },
  );
  assertEquals(spread, ["1", "3", "5", "7", "8", "9", "11", "13"]);
});

Deno.test("simpleToExtension - dorian", () => {
  const spread = transformIntervals(
    diatonicModes.dorian.intervals,
    {
      intervalTransformation: "simpleToExtension",
      filterOutOctave: true,
      sortIntervals: true,
    },
  );
  assertEquals(spread, ["1", "♭3", "5", "♭7", "9", "11", "13"]);
});

Deno.test("extensionToSimple - dominant9", () => {
  const compressed = transformIntervals(
    dominantVariants.dominant9.intervals,
    {
      intervalTransformation: "extensionToSimple",
    },
  );
  assertEquals(compressed, ["1", "2", "3", "5", "♭7"]);
});
