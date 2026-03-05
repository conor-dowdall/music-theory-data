import { assertEquals } from "@std/assert";
import {
  getIntervalsForQualities,
  normalizeIntervalStringArray,
} from "../src/utils/intervals.ts";
import {
  getQualitiesForIntervals,
  getQualitiesForNoteCollection,
  getQualitiesForNoteCollectionKey,
} from "../src/utils/qualities.ts";
import type { IntervalQuality } from "../src/data/labels/note-labels.ts";
import { diatonicModes } from "../src/data/note-collections/diatonic-modes.ts";
import { noteCollections } from "../src/data/note-collections/mod.ts";

Deno.test("getQualitiesForIntervals", () => {
  assertEquals(getQualitiesForIntervals(["1", "3", "5"]), ["P1", "M3", "P5"]);
  assertEquals(getQualitiesForIntervals(["1", "♭3", "5"]), ["P1", "m3", "P5"]);
  assertEquals(getQualitiesForIntervals(["1", "♭3", "♭5"]), [
    "P1",
    "m3",
    "d5",
  ]);
});

Deno.test("getQualitiesForNoteCollectionKey", () => {
  assertEquals(getQualitiesForNoteCollectionKey("major"), ["P1", "M3", "P5"]);
  assertEquals(getQualitiesForNoteCollectionKey("minor"), ["P1", "m3", "P5"]);
  assertEquals(getQualitiesForNoteCollectionKey("major7"), [
    "P1",
    "M3",
    "P5",
    "M7",
  ]);
  assertEquals(getQualitiesForNoteCollectionKey("ionian"), [
    "P1",
    "M2",
    "M3",
    "P4",
    "P5",
    "M6",
    "M7",
    "P8",
  ]);
  assertEquals(getQualitiesForNoteCollectionKey("aeolian"), [
    "P1",
    "M2",
    "m3",
    "P4",
    "P5",
    "m6",
    "m7",
    "P8",
  ]);
  // Invalid key yields empty array
  assertEquals(getQualitiesForNoteCollectionKey("invalid_key" as never), []);
});

Deno.test("getQualitiesForNoteCollectionKey with fillChromatic", () => {
  assertEquals(
    getQualitiesForNoteCollectionKey("ionian", { fillChromatic: true }),
    ["P1", "m2", "M2", "m3", "M3", "P4", "d5", "P5", "m6", "M6", "m7", "M7"],
  );
  assertEquals(
    getQualitiesForNoteCollectionKey("dominant13", { fillChromatic: true }),
    ["P1", "m2", "M9", "m3", "M3", "P11", "d5", "P5", "m6", "M13", "m7", "M7"],
  );
  assertEquals(
    getQualitiesForNoteCollectionKey("dominant13", {
      fillChromatic: true,
      intervalTransformation: "simpleToExtension",
    }),
    ["P1", "m9", "M9", "m3", "M3", "P11", "d5", "P5", "m13", "M13", "m7", "M7"],
  );
  assertEquals(
    getQualitiesForIntervals(
      normalizeIntervalStringArray(["1", "b3", "5", "b7", "b13", "15"]),
      {
        fillChromatic: true,
        intervalTransformation: "extensionToSimple",
      },
    ),
    ["P1", "m2", "M2", "m3", "M3", "P4", "d5", "P5", "m6", "M6", "m7", "M7"],
  );
});

Deno.test("getIntervalsForQualities", () => {
  const qualities: IntervalQuality[] = ["P1", "M3", "P5"];
  assertEquals(getIntervalsForQualities(qualities), ["1", "3", "5"]);

  const qualitiesMinor: IntervalQuality[] = ["P1", "m3", "P5", "m7"];
  assertEquals(getIntervalsForQualities(qualitiesMinor), [
    "1",
    "♭3",
    "5",
    "♭7",
  ]);
});

Deno.test("getQualitiesForNoteCollection", () => {
  const collection = diatonicModes.dorian;
  assertEquals(getQualitiesForNoteCollection(collection), [
    "P1",
    "M2",
    "m3",
    "P4",
    "P5",
    "M6",
    "m7",
    "P8",
  ]);

  const dominant13Collection = noteCollections["dominant13"];
  assertEquals(
    getQualitiesForNoteCollection(dominant13Collection, {
      fillChromatic: true,
    }),
    ["P1", "m2", "M9", "m3", "M3", "P11", "d5", "P5", "m6", "M13", "m7", "M7"],
  );
});
