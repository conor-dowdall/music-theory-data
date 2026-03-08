import { assertEquals, assertExists } from "@std/assert";
import { conversions } from "../src/utils/conversion-registry.ts";

Deno.test("Conversion Registry - Exists and has exactly 8 entries", () => {
  assertExists(conversions.rootAndNoteCollection);
  assertEquals(Object.values(conversions.rootAndNoteCollection).length, 8);
});

Deno.test("Conversion Registry - Functions operate as expected", () => {
  // Test each function returns a length-12 array with valid inputs
  for (const entry of Object.values(conversions.rootAndNoteCollection)) {
    const result = entry.get("C", "ionian", {
      fillChromatic: true,
      rotateToRootInteger0: true,
    });

    assertExists(result);
    assertEquals(
      result.length,
      12,
      `Function ${entry.id} should return a 12-element array`,
    );
  }
});

Deno.test("Conversion Registry - Options affect output length", () => {
  // Rotate by 1 right
  const rotatedResult = conversions.rootAndNoteCollection.noteNames.get(
    "C",
    "ionian",
    {
      fillChromatic: true,
      rotateToRootInteger0: true,
      rotateRight: 1,
    },
  );

  assertEquals(rotatedResult.length, 12);
  // It rotates right, so B which was at the end (index 11) moves to index 0. C moves to index 1.
  assertEquals(rotatedResult[0], "B");
  assertEquals(rotatedResult[1], "C");
});
