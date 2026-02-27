import { assertEquals } from "@std/assert";
import {
  getIntervalsFromQualities,
  normalizeIntervalStringArray,
} from "../src/utils/intervals.ts";
import {
  getQualitiesFromCollectionKey,
  getQualitiesFromIntervals,
  getQualitiesFromNoteCollection,
} from "../src/utils/qualities.ts";
import type { IntervalQuality } from "../src/data/labels/note-labels.ts";
import { diatonicModes } from "../src/data/note-collections/diatonic-modes.ts";
import {
  type NoteCollectionKey,
  noteCollections,
} from "../src/data/note-collections/mod.ts";

Deno.test("getQualitiesFromIntervals", () => {
  assertEquals(getQualitiesFromIntervals(["1", "3", "5"]), ["P1", "M3", "P5"]);
  assertEquals(getQualitiesFromIntervals(["1", "♭3", "5"]), ["P1", "m3", "P5"]);
  assertEquals(getQualitiesFromIntervals(["1", "♭3", "♭5"]), [
    "P1",
    "m3",
    "d5",
  ]);
});

Deno.test("getQualitiesFromCollectionKey", () => {
  assertEquals(getQualitiesFromCollectionKey("major"), ["P1", "M3", "P5"]);
  assertEquals(getQualitiesFromCollectionKey("minor"), ["P1", "m3", "P5"]);
  assertEquals(getQualitiesFromCollectionKey("major7"), [
    "P1",
    "M3",
    "P5",
    "M7",
  ]);
  assertEquals(getQualitiesFromCollectionKey("ionian"), [
    "P1",
    "M2",
    "M3",
    "P4",
    "P5",
    "M6",
    "M7",
    "P8",
  ]);
  assertEquals(getQualitiesFromCollectionKey("aeolian"), [
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
  assertEquals(
    getQualitiesFromCollectionKey("invalidKey" as NoteCollectionKey),
    [],
  );
});

Deno.test("getQualitiesFromCollectionKey with fillChromatic", () => {
  assertEquals(
    getQualitiesFromCollectionKey("ionian", { fillChromatic: true }),
    ["P1", "m2", "M2", "m3", "M3", "P4", "d5", "P5", "m6", "M6", "m7", "M7"],
  );
  assertEquals(
    getQualitiesFromCollectionKey("dominant13", { fillChromatic: true }),
    ["P1", "m2", "M9", "m3", "M3", "P11", "d5", "P5", "m6", "M13", "m7", "M7"],
  );
  assertEquals(
    getQualitiesFromCollectionKey("dominant13", {
      fillChromatic: true,
      intervalTransformation: "simpleToExtension",
    }),
    ["P1", "m9", "M9", "m3", "M3", "P11", "d5", "P5", "m13", "M13", "m7", "M7"],
  );
  assertEquals(
    getQualitiesFromIntervals(
      normalizeIntervalStringArray(["1", "b3", "5", "b7", "b13", "15"]),
      {
        fillChromatic: true,
        intervalTransformation: "extensionToSimple",
      },
    ),
    ["P1", "m2", "M2", "m3", "M3", "P4", "d5", "P5", "m6", "M6", "m7", "M7"],
  );
});

Deno.test("getIntervalsFromQualities", () => {
  const qualities: IntervalQuality[] = ["P1", "M3", "P5"];
  assertEquals(getIntervalsFromQualities(qualities), ["1", "3", "5"]);

  const qualitiesMinor: IntervalQuality[] = ["P1", "m3", "P5", "m7"];
  assertEquals(getIntervalsFromQualities(qualitiesMinor), [
    "1",
    "♭3",
    "5",
    "♭7",
  ]);
});

Deno.test("getQualitiesFromNoteCollection", () => {
  const collection = diatonicModes.dorian;
  assertEquals(getQualitiesFromNoteCollection(collection), [
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
    getQualitiesFromNoteCollection(dominant13Collection, {
      fillChromatic: true,
    }),
    ["P1", "m2", "M9", "m3", "M3", "P11", "d5", "P5", "m6", "M13", "m7", "M7"],
  );
});
