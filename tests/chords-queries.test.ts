import { assertEquals } from "@std/assert";
import {
  getRomanSeventhChordsForNoteCollectionKey,
  getRomanTriadsForNoteCollectionKey,
  getSeventhChordsForNoteCollectionKey,
  getTriadsForNoteCollectionKey,
} from "../src/utils/chords.ts";
import type {
  RomanSeventhChord,
  RomanTriad,
  SeventhChord,
  Triad,
} from "../src/types/chords.d.ts";

Deno.test(
  "getTriadsForNoteCollectionKey and getSeventhChordsForNoteCollectionKey - Ionian",
  () => {
    const triads = getTriadsForNoteCollectionKey("ionian");
    const sevenths = getSeventhChordsForNoteCollectionKey("ionian");

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
  },
);

Deno.test(
  "getRomanTriadsForNoteCollectionKey and getRomanSeventhChordsForNoteCollectionKey - Dorian",
  () => {
    const romanTriads = getRomanTriadsForNoteCollectionKey("dorian");
    const romanSevenths = getRomanSeventhChordsForNoteCollectionKey("dorian");

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
  },
);

Deno.test("getTriadsForNoteCollectionKey - Locrian", () => {
  const triads = getTriadsForNoteCollectionKey("locrian");
  const expectedTriads: Triad[] = ["°", "M", "m", "m", "M", "M", "m"];
  assertEquals(triads, expectedTriads);
});

Deno.test("getRomanSeventhChordsForNoteCollectionKey - Harmonic Minor", () => {
  const romanSevenths = getRomanSeventhChordsForNoteCollectionKey(
    "harmonicMinor",
  );

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

Deno.test("getRomanTriadsForNoteCollectionKey - Phrygian Dominant", () => {
  const romanTriads = getRomanTriadsForNoteCollectionKey("phrygianDominant");

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

Deno.test("getSeventhChordsForNoteCollectionKey - Melodic Minor", () => {
  const sevenths = getSeventhChordsForNoteCollectionKey("melodicMinor");

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

Deno.test("getRomanTriadsForNoteCollectionKey - fillChromatic", () => {
  const chords = getRomanTriadsForNoteCollectionKey("ionian", {
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

Deno.test("Fallback to mostSimilarScale - Major Triad Collection", () => {
  const triads = getTriadsForNoteCollectionKey("major");
  const romanTriads = getRomanTriadsForNoteCollectionKey("major");

  // A major triad has intervals "1", "3", "5".
  // Its mostSimilarScale is "ionian", which has triads: ["M", "m", "m", "M", "M", "m", "°"]
  // Index 0 ("1") -> "M", Index 2 ("3") -> "m", Index 4 ("5") -> "M"
  assertEquals(triads, ["M", "m", "M"]);
  assertEquals(romanTriads, ["I", "iii", "V"]);
});

Deno.test(
  "Fallback to mostSimilarScale - Minor Triad Collection with fillChromatic",
  () => {
    const romanSevenths = getRomanSeventhChordsForNoteCollectionKey("minor", {
      fillChromatic: true,
    });
    // A minor triad has intervals "1", "b3", "5".
    // mostSimilarScale is "aeolian", which has seventh chords: ["m7", "ø7", "M7", "m7", "m7", "M7", "7"]
    // Roman sevenths for aeolian: ["im7", "iiø7", "IIIM7", "ivm7", "vm7", "VIM7", "VII7"]
    // "1" (0 semitones) -> "im7", "b3" (3 semitones) -> "IIIM7", "5" (7 semitones) -> "vm7"

    assertEquals(romanSevenths.length, 12);
    assertEquals(romanSevenths[0], "im7");
    assertEquals(romanSevenths[3], "IIIM7");
    assertEquals(romanSevenths[7], "vm7");
    assertEquals(romanSevenths[1], undefined);
  },
);

Deno.test(
  "Fallback tests - invalid keys gracefully return empty arrays",
  () => {
    assertEquals(getTriadsForNoteCollectionKey("invalid_key" as never), []);
    assertEquals(
      getSeventhChordsForNoteCollectionKey("invalid_key" as never),
      [],
    );
    assertEquals(
      getRomanTriadsForNoteCollectionKey("invalid_key" as never),
      [],
    );
    assertEquals(
      getRomanSeventhChordsForNoteCollectionKey("invalid_key" as never),
      [],
    );

    assertEquals(
      getTriadsForNoteCollectionKey("invalid_key" as never, {
        fillChromatic: true,
      }),
      [] as never,
    );
  },
);
