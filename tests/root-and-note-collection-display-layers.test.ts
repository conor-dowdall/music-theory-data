import { assert, assertEquals, assertExists } from "@std/assert";
import {
  getAvailableRootAndNoteCollectionDisplayLayers,
  isRootAndNoteCollectionDisplayLayerAvailable,
  rootAndNoteCollection,
  rootAndNoteCollectionDisplayLayers,
} from "../src/mod.ts";

const rootAndNoteCollectionDisplayLayerKeys = [
  "noteNames",
  "intervals",
  "extensions",
  "compoundIntervals",
  "triads",
  "seventhChords",
  "romanTriads",
  "romanSeventhChords",
] as const;

const displayLayerOptions = {
  fillChromatic: true,
  rotateToRootInteger0: true,
} as const;

function getOutputPreviewValues(outputPreview: string): string[] {
  return outputPreview.replace(/\.\.\.$/, "").split(",").map((value) =>
    value.trim()
  ).filter(Boolean);
}

Deno.test("rootAndNoteCollection exposes display layers", () => {
  assertEquals(
    rootAndNoteCollection.displayLayers,
    rootAndNoteCollectionDisplayLayers,
  );

  for (const key of rootAndNoteCollectionDisplayLayerKeys) {
    assertExists(rootAndNoteCollectionDisplayLayers[key]);
  }
});

Deno.test("display layer entries include UI metadata", () => {
  const ids = new Set<string>();

  for (const key of rootAndNoteCollectionDisplayLayerKeys) {
    const entry = rootAndNoteCollectionDisplayLayers[key];

    assertExists(entry.id);
    assertExists(entry.name);
    assertExists(entry.shortName);
    assertExists(entry.description);
    assertExists(entry.outputPreview);
    assertExists(entry.sampleOutput);
    assertEquals("example" in entry, false);
    assertEquals(entry.outputShape, "chromatic-12");
    assertEquals(entry.outputIndexing, "absolutePitchClassC0");
    assertEquals(
      entry.emptySlot,
      entry.allowsEmptySlots ? "undefined" : "none",
    );
    ids.add(entry.id);
  }

  assertEquals(ids.size, rootAndNoteCollectionDisplayLayerKeys.length);
});

Deno.test("display layer output previews use real display layer values", () => {
  for (const entry of Object.values(rootAndNoteCollectionDisplayLayers)) {
    const result = entry.get("C", "ionian", displayLayerOptions);
    const resultValues = new Set(
      result.filter((value: unknown) => value !== undefined),
    );

    for (const previewValue of getOutputPreviewValues(entry.outputPreview)) {
      assert(
        resultValues.has(previewValue),
        `${entry.id} outputPreview value ${previewValue} should exist in C ionian output`,
      );
    }
  }
});

Deno.test("display layer functions return chromatic tuples", () => {
  for (const entry of Object.values(rootAndNoteCollectionDisplayLayers)) {
    const result = entry.get("C", "ionian", displayLayerOptions);
    assertExists(result);
    assertEquals(
      result.length,
      12,
      `Function ${entry.id} should return a 12-element array`,
    );
  }
});

Deno.test("available display layer helpers filter unsupported harmony layers", () => {
  const ionianDisplayLayerIds = getAvailableRootAndNoteCollectionDisplayLayers(
    "C",
    "ionian",
  ).map((entry) => entry.id);

  assertEquals(ionianDisplayLayerIds.includes("triads"), true);
  assertEquals(ionianDisplayLayerIds.includes("roman-seventh-chords"), true);

  const majorChordDisplayLayerIds =
    getAvailableRootAndNoteCollectionDisplayLayers(
      "C",
      "major",
    ).map((entry) => entry.id);

  assertEquals(majorChordDisplayLayerIds.includes("note-names"), true);
  assertEquals(majorChordDisplayLayerIds.includes("triads"), false);
  assertEquals(
    majorChordDisplayLayerIds.includes("roman-seventh-chords"),
    false,
  );

  assertEquals(
    isRootAndNoteCollectionDisplayLayerAvailable(
      rootAndNoteCollectionDisplayLayers.triads,
      "C",
      "ionian",
    ),
    true,
  );
  assertEquals(
    isRootAndNoteCollectionDisplayLayerAvailable(
      rootAndNoteCollectionDisplayLayers.triads,
      "C",
      "minorPentatonic",
    ),
    false,
  );
  assertEquals(
    rootAndNoteCollection.isDisplayLayerAvailable(
      rootAndNoteCollection.displayLayers.triads,
      "C",
      "ionian",
    ),
    true,
  );
  assertEquals(
    rootAndNoteCollection.getAvailableDisplayLayers("C", "major").map((entry) =>
      entry.id
    ).includes("triads"),
    false,
  );
  assertExists(rootAndNoteCollectionDisplayLayers.triads.unavailableReason);
});

Deno.test("display layer options affect output length", () => {
  const rotatedResult = rootAndNoteCollectionDisplayLayers.noteNames.get(
    "C",
    "ionian",
    {
      ...displayLayerOptions,
      rotateRight: 1,
    },
  );

  assertEquals(rotatedResult.length, 12);
  assertEquals(rotatedResult[0], "B");
  assertEquals(rotatedResult[1], "C");
});

Deno.test("display layer chromatic tuples are indexed by absolute C pitch class", () => {
  const noteNames = rootAndNoteCollectionDisplayLayers.noteNames.get(
    "F",
    "ionian",
    displayLayerOptions,
  );
  const intervals = rootAndNoteCollectionDisplayLayers.intervals.get(
    "F",
    "ionian",
    displayLayerOptions,
  );
  const romanTriads = rootAndNoteCollectionDisplayLayers.romanTriads.get(
    "F",
    "ionian",
    displayLayerOptions,
  );

  assertEquals(noteNames[0], "C");
  assertEquals(noteNames[5], "F");
  assertEquals(intervals[0], "5");
  assertEquals(intervals[5], "1");
  assertEquals(romanTriads[0], "V");
  assertEquals(romanTriads[5], "I");
});
