import { assertEquals, assertExists } from "@std/assert";
import {
  conversions,
  getAvailableRootAndNoteCollectionConversions,
  isRootAndNoteCollectionConversionAvailable,
  rootAndNoteCollectionConversions,
} from "../src/mod.ts";

const rootAndNoteCollectionConversionKeys = [
  "noteNames",
  "intervals",
  "extensions",
  "compoundIntervals",
  "triads",
  "seventhChords",
  "romanTriads",
  "romanSeventhChords",
] as const;

const registryOptions = {
  fillChromatic: true,
  rotateToRootInteger0: true,
} as const;

Deno.test("Conversion Registry - exposes root and note collection conversions", () => {
  assertExists(conversions.rootAndNoteCollection);
  assertEquals(
    rootAndNoteCollectionConversions,
    conversions.rootAndNoteCollection,
  );

  for (const key of rootAndNoteCollectionConversionKeys) {
    assertExists(rootAndNoteCollectionConversions[key]);
  }
});

Deno.test("Conversion Registry - entries include UI metadata", () => {
  const entries = Object.values(rootAndNoteCollectionConversions);
  const ids = new Set<string>();

  for (const entry of entries) {
    assertExists(entry.id);
    assertExists(entry.name);
    assertExists(entry.shortName);
    assertExists(entry.description);
    assertExists(entry.example);
    assertEquals(entry.inputKind, "rootAndNoteCollection");
    assertEquals(entry.outputShape, "chromatic-12");
    assertEquals(
      entry.emptySlot,
      entry.allowsEmptySlots ? "undefined" : "none",
    );
    ids.add(entry.id);
  }

  assertEquals(ids.size, entries.length);
});

Deno.test("Conversion Registry - functions return chromatic tuples", () => {
  for (const entry of Object.values(rootAndNoteCollectionConversions)) {
    const result = entry.get("C", "ionian", registryOptions);
    assertExists(result);
    assertEquals(
      result.length,
      12,
      `Function ${entry.id} should return a 12-element array`,
    );
  }
});

Deno.test("Conversion Registry - filters unavailable authored harmony conversions", () => {
  const ionianConversionIds = getAvailableRootAndNoteCollectionConversions(
    "C",
    "ionian",
  ).map((entry) => entry.id);

  assertEquals(ionianConversionIds.includes("triads"), true);
  assertEquals(ionianConversionIds.includes("roman-seventh-chords"), true);

  const majorChordConversionIds = getAvailableRootAndNoteCollectionConversions(
    "C",
    "major",
  ).map((entry) => entry.id);

  assertEquals(majorChordConversionIds.includes("note-names"), true);
  assertEquals(majorChordConversionIds.includes("triads"), false);
  assertEquals(majorChordConversionIds.includes("roman-seventh-chords"), false);

  assertEquals(
    isRootAndNoteCollectionConversionAvailable(
      rootAndNoteCollectionConversions.triads,
      "C",
      "ionian",
    ),
    true,
  );
  assertEquals(
    isRootAndNoteCollectionConversionAvailable(
      rootAndNoteCollectionConversions.triads,
      "C",
      "minorPentatonic",
    ),
    false,
  );
  assertExists(rootAndNoteCollectionConversions.triads.unavailableReason);
});

Deno.test("Conversion Registry - Options affect output length", () => {
  const rotatedResult = rootAndNoteCollectionConversions.noteNames.get(
    "C",
    "ionian",
    {
      ...registryOptions,
      rotateRight: 1,
    },
  );

  assertEquals(rotatedResult.length, 12);
  assertEquals(rotatedResult[0], "B");
  assertEquals(rotatedResult[1], "C");
});
