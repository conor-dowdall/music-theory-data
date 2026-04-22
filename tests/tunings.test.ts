import { assertEquals } from "@std/assert";
import {
  stringInstrumentGroupKeys,
  stringInstrumentGroups,
  stringInstrumentKeys,
  stringInstruments,
  stringInstrumentTuningKeys,
  stringInstrumentTuningKeysByInstrument,
  stringInstrumentTunings,
} from "../src/data/tunings/mod.ts";

Deno.test("stringInstrumentGroups include every instrument exactly once", () => {
  const groupedInstrumentKeys = stringInstrumentGroupKeys.flatMap((
    groupKey,
  ) => [...stringInstrumentGroups[groupKey].instrumentKeys]);

  assertEquals(
    groupedInstrumentKeys.toSorted(),
    [...stringInstrumentKeys].toSorted(),
  );
  assertEquals(
    new Set(groupedInstrumentKeys).size,
    groupedInstrumentKeys.length,
  );
});

Deno.test("stringInstrumentTuningKeysByInstrument include every tuning exactly once", () => {
  const groupedTuningKeys = Object.values(
    stringInstrumentTuningKeysByInstrument,
  ).flatMap((tuningKeys) => [...tuningKeys]);

  assertEquals(
    groupedTuningKeys.toSorted(),
    [...stringInstrumentTuningKeys].toSorted(),
  );
  assertEquals(new Set(groupedTuningKeys).size, groupedTuningKeys.length);
});

Deno.test("stringInstrumentKeys match stringInstruments", () => {
  assertEquals(
    [...stringInstrumentKeys].toSorted(),
    Object.keys(stringInstruments).toSorted(),
  );
});

Deno.test("stringInstrumentTuningKeys match stringInstrumentTunings", () => {
  assertEquals(
    [...stringInstrumentTuningKeys].toSorted(),
    Object.keys(stringInstrumentTunings).toSorted(),
  );
});

Deno.test("stringInstrumentTuningKeysByInstrument match tuning instruments", () => {
  for (const instrumentKey of stringInstrumentKeys) {
    for (
      const tuningKey of stringInstrumentTuningKeysByInstrument[instrumentKey]
    ) {
      assertEquals(
        stringInstrumentTunings[tuningKey].instrument,
        instrumentKey,
      );
    }
  }
});

Deno.test("instrument default tunings belong to their instruments", () => {
  for (const instrumentKey of stringInstrumentKeys) {
    const instrument = stringInstruments[instrumentKey];

    assertEquals(
      stringInstrumentTuningKeysByInstrument[instrumentKey].includes(
        instrument.defaultTuning,
      ),
      true,
    );
  }
});
