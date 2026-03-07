import { assertEquals } from "@std/assert";
import {
  getCompoundIntervalsForNoteCollectionKey,
  getExtensionsForNoteCollectionKey,
  getIntervalsForNoteCollectionKey,
} from "../src/utils/intervals.ts";

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
