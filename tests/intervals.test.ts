import { assertEquals } from "@std/assert";
import {
  getCompoundIntervalsForNoteCollectionKey,
  getCompoundIntervalsForRootAndNoteCollectionKey,
  getExtensionsForNoteCollectionKey,
  getExtensionsForRootAndNoteCollectionKey,
  getIntervalsForNoteCollectionKey,
  getIntervalsForRootAndNoteCollectionKey,
  transformIntervals,
} from "../src/utils/intervals.ts";
import { diatonicModes } from "../src/data/note-collections/diatonic-modes.ts";
import { dominantVariants } from "../src/data/note-collections/dominant-variants.ts";

Deno.test("simpleToExtension ionian", () => {
  const spread = transformIntervals(diatonicModes.ionian.intervals, {
    intervalTransformation: "simpleToExtension",
    filterOutOctave: true,
    shouldSort: true,
  });
  assertEquals(spread, ["1", "3", "5", "7", "9", "11", "13"]);
});

Deno.test("simpleToExtension ionian - unsorted", () => {
  const spread = transformIntervals(diatonicModes.ionian.intervals, {
    intervalTransformation: "simpleToExtension",
    filterOutOctave: true,
    shouldSort: false,
  });
  assertEquals(spread, ["1", "9", "3", "11", "5", "13", "7"]);
});

Deno.test("simpleToExtension ionian with octave", () => {
  const spread = transformIntervals(diatonicModes.ionian.intervals, {
    intervalTransformation: "simpleToExtension",
    filterOutOctave: false,
    shouldSort: true,
  });
  assertEquals(spread, ["1", "3", "5", "7", "8", "9", "11", "13"]);
});

Deno.test("simpleToExtension - dorian", () => {
  const spread = transformIntervals(diatonicModes.dorian.intervals, {
    intervalTransformation: "simpleToExtension",
    filterOutOctave: true,
    shouldSort: true,
  });
  assertEquals(spread, ["1", "♭3", "5", "♭7", "9", "11", "13"]);
});

Deno.test("extensionToSimple - dominant9", () => {
  const compressed = transformIntervals(dominantVariants.dominant9.intervals, {
    intervalTransformation: "extensionToSimple",
  });
  assertEquals(compressed, ["1", "2", "3", "5", "♭7"]);
});

Deno.test("getIntervalsForNoteCollectionKey", () => {
  // ionian scale
  const intervals1 = getIntervalsForNoteCollectionKey("ionian");
  assertEquals(intervals1, ["1", "2", "3", "4", "5", "6", "7", "8"]);

  // minor pentatonic scale
  const intervals2 = getIntervalsForNoteCollectionKey("minorPentatonic");
  assertEquals(intervals2, ["1", "♭3", "4", "5", "♭7", "8"]);

  // fillChromatic: true
  const intervals3 = getIntervalsForNoteCollectionKey("ionian", {
    fillChromatic: true,
  });
  assertEquals(intervals3, [
    "1",
    "♭2",
    "2",
    "♭3",
    "3",
    "4",
    "♭5",
    "5",
    "♭6",
    "6",
    "♭7",
    "7",
  ]);

  // fillChromatic: true with a scale that has mostSimilarScale
  // minor pentatonic has mostSimilarScale: "aeolian"
  const intervals4 = getIntervalsForNoteCollectionKey("minorPentatonic", {
    fillChromatic: true,
  });
  // Aeolian intervals: 1, 2, ♭3, 4, 5, ♭6, ♭7
  assertEquals(intervals4, [
    "1",
    "♭2",
    "2",
    "♭3",
    "3",
    "4",
    "♭5",
    "5",
    "♭6",
    "6",
    "♭7",
    "7",
  ]);
});

Deno.test("getExtensionsForNoteCollectionKey", () => {
  // simple intervals to extensions in a major scale
  const extensions = getExtensionsForNoteCollectionKey("ionian");
  assertEquals(extensions, ["1", "3", "5", "7", "9", "11", "13"]);

  // handle fillChromatic: true
  const intervals = getExtensionsForNoteCollectionKey("ionian", {
    fillChromatic: true,
  });
  assertEquals(intervals, [
    "1",
    "♭9",
    "9",
    "♭3",
    "3",
    "11",
    "♭5",
    "5",
    "♭13",
    "13",
    "♭7",
    "7",
  ]);
});

Deno.test("getCompoundIntervalsForNoteCollectionKey", () => {
  // simple intervals to compound intervals in a major scale
  const compound = getCompoundIntervalsForNoteCollectionKey("ionian");
  assertEquals(compound, ["1", "9", "10", "11", "12", "13", "14"]);

  // handle fillChromatic: true
  const intervals = getCompoundIntervalsForNoteCollectionKey("ionian", {
    fillChromatic: true,
  });
  assertEquals(intervals, [
    "1",
    "♭9",
    "9",
    "♭10",
    "10",
    "11",
    "♭12",
    "12",
    "♭13",
    "13",
    "♭14",
    "14",
  ]);
});

Deno.test("getIntervalsForRootAndNoteCollectionKey", () => {
  // fillChromatic: true with rotateToRootInteger0: true
  const intervals = getIntervalsForRootAndNoteCollectionKey("F", "ionian", {
    fillChromatic: true,
    rotateToRootInteger0: true,
  });
  // F is index 5. C is index 0.
  // F Ionian intervals: 1, 2, 3, 4, 5, 6, 7
  // Absolute mapping:
  // C (0) -> 5
  // D (2) -> 6
  // E (4) -> 7
  // F (5) -> 1
  // G (7) -> 2
  // A (9) -> 3
  // Bb (10) -> 4
  assertEquals(intervals[0], "5");
  assertEquals(intervals[2], "6");
  assertEquals(intervals[4], "7");
  assertEquals(intervals[5], "1");
  assertEquals(intervals[7], "2");
  assertEquals(intervals[9], "3");
  assertEquals(intervals[10], "4");
  assertEquals(intervals.length, 12);
});

Deno.test("getExtensionsForRootAndNoteCollectionKey", () => {
  const intervals = getExtensionsForRootAndNoteCollectionKey("F", "ionian", {
    fillChromatic: true,
    rotateToRootInteger0: true,
  });
  // F is index 5. C is index 0.
  // F Ionian extensions: 1, 9, 3, 11, 5, 13, 7 (filterOutOctave handles removing 8)
  assertEquals(intervals[0], "5"); // C -> 5
  assertEquals(intervals[2], "13"); // D -> 13
  assertEquals(intervals[4], "7"); // E -> 7
  assertEquals(intervals[5], "1"); // F -> 1
  assertEquals(intervals[7], "9"); // G -> 9
  assertEquals(intervals[9], "3"); // A -> 3
  assertEquals(intervals[10], "11"); // Bb -> 11
  assertEquals(intervals.length, 12);
});

Deno.test("getCompoundIntervalsForRootAndNoteCollectionKey", () => {
  const intervals = getCompoundIntervalsForRootAndNoteCollectionKey(
    "F",
    "ionian",
    {
      fillChromatic: true,
      rotateToRootInteger0: true,
    },
  );
  // F Ionian compound: 1, 9, 10, 11, 12, 13, 14
  assertEquals(intervals[0], "12"); // C -> 12
  assertEquals(intervals[2], "13"); // D -> 13
  assertEquals(intervals[4], "14"); // E -> 14
  assertEquals(intervals[5], "1"); // F -> 1
  assertEquals(intervals[7], "9"); // G -> 9
  assertEquals(intervals[9], "10"); // A -> 10
  assertEquals(intervals[10], "11"); // Bb -> 11
  assertEquals(intervals.length, 12);
});
