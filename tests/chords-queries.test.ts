import { assertEquals } from "@std/assert";
import {
  getRomanSeventhsForMode,
  getRomanTriadsForMode,
  getSevenths,
  getTriads,
} from "../src/utils/chords.ts";
import type {
  RomanSeventhChord,
  RomanTriad,
  SeventhChord,
  Triad,
} from "../src/types/chords.d.ts";

Deno.test("getTriads and getSevenths - Ionian", () => {
  const triads = getTriads("ionian");
  const sevenths = getSevenths("ionian");

  const expectedTriads: Triad[] = ["M", "m", "m", "M", "M", "m", "°"];
  const expectedSevenths: SeventhChord[] = [
    "M7",
    "m7",
    "m7",
    "M7",
    "7",
    "m7",
    "ø7",
  ];

  assertEquals(triads, expectedTriads);
  assertEquals(sevenths, expectedSevenths);
});

Deno.test("getRomanTriadsForMode and getRomanSeventhsForMode - Dorian", () => {
  const romanTriads = getRomanTriadsForMode("dorian");
  const romanSevenths = getRomanSeventhsForMode("dorian");

  const expectedRomanTriads: RomanTriad[] = [
    "i",
    "ii",
    "III",
    "IV",
    "v",
    "vi°",
    "VII",
  ];
  const expectedRomanSevenths: RomanSeventhChord[] = [
    "im7",
    "iim7",
    "IIIM7",
    "IV7",
    "vm7",
    "viø7",
    "VIIM7",
  ];

  assertEquals(romanTriads, expectedRomanTriads);
  assertEquals(romanSevenths, expectedRomanSevenths);
});

Deno.test("getTriads - Locrian", () => {
  const triads = getTriads("locrian");
  const expectedTriads: Triad[] = ["°", "M", "m", "m", "M", "M", "m"];
  assertEquals(triads, expectedTriads);
});

Deno.test("getRomanSeventhsForMode - Harmonic Minor", () => {
  const romanSevenths = getRomanSeventhsForMode("harmonicMinor");

  const expectedRomanSevenths: RomanSeventhChord[] = [
    "iM7",
    "iiø7",
    "III+M7",
    "ivm7",
    "V7",
    "VIM7",
    "vii°7",
  ];

  assertEquals(romanSevenths, expectedRomanSevenths);
});

Deno.test("getRomanTriadsForMode - Phrygian Dominant", () => {
  const romanTriads = getRomanTriadsForMode("phrygianDominant");

  const expectedRomanTriads: RomanTriad[] = [
    "I",
    "II",
    "iii°",
    "iv",
    "v°",
    "VI+",
    "vii",
  ];

  assertEquals(romanTriads, expectedRomanTriads);
});

Deno.test("getSevenths - Melodic Minor", () => {
  const sevenths = getSevenths("melodicMinor");

  const expectedSevenths: SeventhChord[] = [
    "m(M7)",
    "m7",
    "+M7",
    "7",
    "7",
    "ø7",
    "ø7",
  ];

  assertEquals(sevenths, expectedSevenths);
});

Deno.test("getRomanTriadsForMode - fillChromatic", () => {
  const chords = getRomanTriadsForMode("ionian", {
    fillChromatic: true,
  });

  assertEquals(chords.length, 12);
  assertEquals(chords[0], "I");
  assertEquals(chords[1], undefined);
  assertEquals(chords[2], "ii");
  assertEquals(chords[3], undefined);
  assertEquals(chords[4], "iii");
  assertEquals(chords[5], "IV");
  assertEquals(chords[6], undefined);
  assertEquals(chords[7], "V");
  assertEquals(chords[8], undefined);
  assertEquals(chords[9], "vi");
  assertEquals(chords[10], undefined);
  assertEquals(chords[11], "vii°");
});

Deno.test(
  "Fallback tests - invalid keys gracefully return empty arrays",
  () => {
    assertEquals(getTriads("invalid_key" as never), []);
    assertEquals(getSevenths("invalid_key" as never), []);
    assertEquals(getRomanTriadsForMode("invalid_key" as never), []);
    assertEquals(getRomanSeventhsForMode("invalid_key" as never), []);

    assertEquals(
      getTriads("invalid_key" as never, {
        fillChromatic: true,
      }),
      [] as never,
    );
  },
);
