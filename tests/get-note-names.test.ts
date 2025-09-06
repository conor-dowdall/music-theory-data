import { assertEquals } from "@std/assert";
import {
  getNoteNamesFromRootAndCollectionKey,
  getNoteNamesFromRootAndIntervals,
} from "../src/utils/note-names.ts";
import { diatonicModes } from "../src/data/note-collections/diatonic-modes.ts";
import { filterOutOctaveIntervals } from "../src/utils/intervals.ts";

Deno.test("getNoteNamesFromRootAndCollectionKey - Major Scales", () => {
  assertEquals(getNoteNamesFromRootAndCollectionKey("C", "ionian"), [
    "C",
    "D",
    "E",
    "F",
    "G",
    "A",
    "B",
    "C",
  ]);
  assertEquals(getNoteNamesFromRootAndCollectionKey("G", "ionian"), [
    "G",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F♯",
    "G",
  ]);
  assertEquals(getNoteNamesFromRootAndCollectionKey("D", "ionian"), [
    "D",
    "E",
    "F♯",
    "G",
    "A",
    "B",
    "C♯",
    "D",
  ]);
  assertEquals(getNoteNamesFromRootAndCollectionKey("A", "ionian"), [
    "A",
    "B",
    "C♯",
    "D",
    "E",
    "F♯",
    "G♯",
    "A",
  ]);
  assertEquals(getNoteNamesFromRootAndCollectionKey("E", "ionian"), [
    "E",
    "F♯",
    "G♯",
    "A",
    "B",
    "C♯",
    "D♯",
    "E",
  ]);
  assertEquals(getNoteNamesFromRootAndCollectionKey("B", "ionian"), [
    "B",
    "C♯",
    "D♯",
    "E",
    "F♯",
    "G♯",
    "A♯",
    "B",
  ]);
  assertEquals(getNoteNamesFromRootAndCollectionKey("F♯", "ionian"), [
    "F♯",
    "G♯",
    "A♯",
    "B",
    "C♯",
    "D♯",
    "E♯",
    "F♯",
  ]);
  assertEquals(getNoteNamesFromRootAndCollectionKey("C♯", "ionian"), [
    "C♯",
    "D♯",
    "E♯",
    "F♯",
    "G♯",
    "A♯",
    "B♯",
    "C♯",
  ]);

  assertEquals(getNoteNamesFromRootAndCollectionKey("F", "ionian"), [
    "F",
    "G",
    "A",
    "B♭",
    "C",
    "D",
    "E",
    "F",
  ]);
  assertEquals(getNoteNamesFromRootAndCollectionKey("B♭", "ionian"), [
    "B♭",
    "C",
    "D",
    "E♭",
    "F",
    "G",
    "A",
    "B♭",
  ]);
  assertEquals(getNoteNamesFromRootAndCollectionKey("E♭", "ionian"), [
    "E♭",
    "F",
    "G",
    "A♭",
    "B♭",
    "C",
    "D",
    "E♭",
  ]);
  assertEquals(getNoteNamesFromRootAndCollectionKey("A♭", "ionian"), [
    "A♭",
    "B♭",
    "C",
    "D♭",
    "E♭",
    "F",
    "G",
    "A♭",
  ]);
  assertEquals(getNoteNamesFromRootAndCollectionKey("D♭", "ionian"), [
    "D♭",
    "E♭",
    "F",
    "G♭",
    "A♭",
    "B♭",
    "C",
    "D♭",
  ]);
  assertEquals(getNoteNamesFromRootAndCollectionKey("G♭", "ionian"), [
    "G♭",
    "A♭",
    "B♭",
    "C♭",
    "D♭",
    "E♭",
    "F",
    "G♭",
  ]);
  assertEquals(getNoteNamesFromRootAndCollectionKey("C♭", "ionian"), [
    "C♭",
    "D♭",
    "E♭",
    "F♭",
    "G♭",
    "A♭",
    "B♭",
    "C♭",
  ]);
});

Deno.test("getNoteNamesFromRootAndCollectionKey - Minor Scales", () => {
  assertEquals(getNoteNamesFromRootAndCollectionKey("C", "aeolian"), [
    "C",
    "D",
    "E♭",
    "F",
    "G",
    "A♭",
    "B♭",
    "C",
  ]);
  assertEquals(getNoteNamesFromRootAndCollectionKey("A", "aeolian"), [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "A",
  ]);
});

Deno.test("getNoteNamesFromRootAndCollectionKey - Mixolydian Modes", () => {
  assertEquals(getNoteNamesFromRootAndCollectionKey("G♭", "mixolydian"), [
    "G♭",
    "A♭",
    "B♭",
    "C♭",
    "D♭",
    "E♭",
    "F♭",
    "G♭",
  ]);
  assertEquals(getNoteNamesFromRootAndCollectionKey("D♭", "mixolydian"), [
    "D♭",
    "E♭",
    "F",
    "G♭",
    "A♭",
    "B♭",
    "C♭",
    "D♭",
  ]);
});

Deno.test("getNoteNamesFromRootAndCollectionKey - Lydian Modes", () => {
  assertEquals(getNoteNamesFromRootAndCollectionKey("F", "lydian"), [
    "F",
    "G",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ]);
});

Deno.test("getNoteNamesFromRootAndCollectionKey - Dominant 13th Chord", () => {
  assertEquals(getNoteNamesFromRootAndCollectionKey("C", "dominant13"), [
    "C",
    "E",
    "G",
    "B♭",
    "D",
    "F",
    "A",
  ]);
});

Deno.test("getNoteNamesFromRootAndCollectionKey - Locrian Modes", () => {
  assertEquals(getNoteNamesFromRootAndCollectionKey("B", "locrian"), [
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "A",
    "B",
  ]);
  assertEquals(getNoteNamesFromRootAndCollectionKey("F", "locrian"), [
    "F",
    "G♭",
    "A♭",
    "B♭",
    "C♭",
    "D♭",
    "E♭",
    "F",
  ]);
});

Deno.test("getNoteNamesFromRootAndCollectionKey - Super Locrian Double Flat 7 Modes", () => {
  assertEquals(
    getNoteNamesFromRootAndCollectionKey("D♭", "superLocrianDoubleFlat7"),
    [
      "D♭",
      "E𝄫",
      "F♭",
      "G𝄫",
      "A𝄫",
      "B𝄫",
      "C𝄫",
      "D♭",
    ],
  );
  assertEquals(
    getNoteNamesFromRootAndCollectionKey("A", "superLocrianDoubleFlat7"),
    [
      "A",
      "B♭",
      "C",
      "D♭",
      "E♭",
      "F",
      "G♭",
      "A",
    ],
  );
  assertEquals(
    getNoteNamesFromRootAndCollectionKey("C♭", "superLocrianDoubleFlat7"),
    [
      "C♭",
      "D𝄫",
      "E𝄫",
      "F𝄫",
      "G𝄫",
      "A𝄫",
      "A♭", // no triple flats are used in this library
      "C♭",
    ],
  );
});

Deno.test("getNoteNamesFromRootAndIntervals", () => {
  assertEquals(
    getNoteNamesFromRootAndIntervals(
      "B♭",
      filterOutOctaveIntervals(diatonicModes.aeolian.intervals),
    ),
    ["B♭", "C", "D♭", "E♭", "F", "G♭", "A♭"],
  );
  assertEquals(
    getNoteNamesFromRootAndIntervals(
      "B♭",
      diatonicModes.aeolian.intervals,
    ),
    ["B♭", "C", "D♭", "E♭", "F", "G♭", "A♭", "B♭"],
  );
});
