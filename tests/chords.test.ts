import { assertEquals } from "@std/assert";
import {
  getRomanNumeralForScaleIndexAndChordCollectionKey,
  getRomanNumeralForScaleIndexAndChordQuality,
  getRomanSeventhChordsForNoteCollectionKey,
  getRomanSeventhChordsForRootAndNoteCollectionKey,
  getRomanTriadsForNoteCollectionKey,
  getRomanTriadsForRootAndNoteCollectionKey,
  getSeventhChordsForNoteCollectionKey,
  getSeventhChordsForRootAndNoteCollectionKey,
  getTriadsForNoteCollectionKey,
  getTriadsForRootAndNoteCollectionKey,
} from "../src/utils/chords.ts";
import {
  chordCollectionSymbolRenderings,
  chordQualityRomanRenderings,
  getChordCollectionChordSuffix,
  getChordCollectionRomanSuffix,
  getChordQualityChordCollectionKey,
} from "../src/data/chords/mod.ts";
import { noteCollections } from "../src/data/note-collections/mod.ts";
import type {
  RomanSeventhChord,
  RomanTriad,
  SeventhChord,
  Triad,
} from "../src/types/chords.d.ts";

Deno.test("chord quality and chord collection rendering stay distinct", () => {
  assertEquals(getChordQualityChordCollectionKey("+M7"), "augmentedMajor7");
  assertEquals(getChordQualityChordCollectionKey("M7♯5"), "augmentedMajor7");
  assertEquals(getChordCollectionChordSuffix("augmentedMajor7"), "+M7");
  assertEquals(getChordCollectionRomanSuffix("augmentedMajor7"), "+M7");
  assertEquals(
    getRomanNumeralForScaleIndexAndChordCollectionKey(2, "augmentedMajor7"),
    "III+M7",
  );
  assertEquals(getChordCollectionChordSuffix("halfDiminished7"), "ø7");
  assertEquals(getChordCollectionRomanSuffix("major6"), "6");
  assertEquals(getChordCollectionRomanSuffix("minor6"), "m6");
  const halfDiminished7 = noteCollections.halfDiminished7;
  if (halfDiminished7.category !== "chord") {
    throw new Error("Expected halfDiminished7 to be a chord collection");
  }
  assertEquals(
    chordCollectionSymbolRenderings.halfDiminished7,
    halfDiminished7.symbol,
  );
  assertEquals(
    getRomanNumeralForScaleIndexAndChordQuality(1, "m7♭5"),
    "iiø7",
  );
  assertEquals(
    getRomanNumeralForScaleIndexAndChordQuality(2, "M7♯5"),
    "III+M7",
  );
  assertEquals(chordQualityRomanRenderings.get("m7♭5"), {
    numeralCase: "lower",
    suffix: "ø7",
  });
  assertEquals(chordQualityRomanRenderings.get("M7♯5"), {
    numeralCase: "upper",
    suffix: "+M7",
  });
});

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

Deno.test("Non-authored chord collections return aligned placeholders", () => {
  const triads = getTriadsForNoteCollectionKey("major");
  const romanTriads = getRomanTriadsForNoteCollectionKey("major");
  const majorAdd9Triads = getTriadsForNoteCollectionKey("majorAdd9");
  const majorAdd9RomanSevenths = getRomanSeventhChordsForNoteCollectionKey(
    "majorAdd9",
  );

  assertEquals(triads, [undefined, undefined, undefined]);
  assertEquals(romanTriads, [undefined, undefined, undefined]);
  assertEquals(majorAdd9Triads, [
    undefined,
    undefined,
    undefined,
    undefined,
  ]);
  assertEquals(majorAdd9RomanSevenths, [
    undefined,
    undefined,
    undefined,
    undefined,
  ]);
});

Deno.test(
  "Non-authored chord collections return undefined chromatic placeholders",
  () => {
    const romanSevenths = getRomanSeventhChordsForNoteCollectionKey("minor", {
      fillChromatic: true,
    });

    assertEquals(romanSevenths.length, 12);
    assertEquals(romanSevenths, Array.from({ length: 12 }, () => undefined));
  },
);

Deno.test(
  "Non-authored scale collections return aligned placeholders",
  () => {
    const minorPentatonicTriads = getRomanTriadsForNoteCollectionKey(
      "minorPentatonic",
    );
    const bluesPentatonicSevenths = getRomanSeventhChordsForNoteCollectionKey(
      "bluesPentatonic",
    );

    assertEquals(minorPentatonicTriads, [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ]);
    assertEquals(bluesPentatonicSevenths, [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ]);
  },
);

Deno.test(
  "Invalid keys gracefully return empty arrays",
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

Deno.test("getTriadsForRootAndNoteCollectionKey - C Ionian", () => {
  const triads = getTriadsForRootAndNoteCollectionKey("C", "ionian");
  assertEquals(triads, ["CM", "Dm", "Em", "FM", "GM", "Am", "B°"]);
});

Deno.test("getSeventhChordsForRootAndNoteCollectionKey - G Ionian", () => {
  const sevenths = getSeventhChordsForRootAndNoteCollectionKey("G", "ionian");
  assertEquals(sevenths, ["GM7", "Am7", "Bm7", "CM7", "D7", "Em7", "F♯ø7"]);
});

Deno.test(
  "getTriadsForRootAndNoteCollectionKey - C Ionian with fillChromatic",
  () => {
    const triads = getTriadsForRootAndNoteCollectionKey("C", "ionian", {
      fillChromatic: true,
    });
    assertEquals(triads.length, 12);
    assertEquals(triads[0], "CM");
    assertEquals(triads[1], undefined);
    assertEquals(triads[2], "Dm");
    assertEquals(triads[3], undefined);
    assertEquals(triads[4], "Em");
    assertEquals(triads[5], "FM");
    assertEquals(triads[6], undefined);
    assertEquals(triads[7], "GM");
    assertEquals(triads[8], undefined);
    assertEquals(triads[9], "Am");
    assertEquals(triads[10], undefined);
    assertEquals(triads[11], "B°");
  },
);

Deno.test(
  "getTriadsForRootAndNoteCollectionKey - D Ionian with fillChromatic",
  () => {
    const triads = getTriadsForRootAndNoteCollectionKey("D", "ionian", {
      fillChromatic: true,
    });
    assertEquals(triads.length, 12);
    assertEquals(triads[0], "DM");
    assertEquals(triads[1], undefined);
    assertEquals(triads[2], "Em");
    assertEquals(triads[3], undefined);
    assertEquals(triads[4], "F♯m");
    assertEquals(triads[5], "GM");
    assertEquals(triads[6], undefined);
    assertEquals(triads[7], "AM");
    assertEquals(triads[8], undefined);
    assertEquals(triads[9], "Bm");
    assertEquals(triads[10], undefined);
    assertEquals(triads[11], "C♯°");
  },
);

Deno.test(
  "getTriadsForNoteCollectionKey - rotateRight shifts chord array",
  () => {
    const triads = getTriadsForNoteCollectionKey("ionian", { rotateRight: 2 });
    // Instead of ["M", "m", "m", "M", "M", "m", "°"]
    // Rotating right by 2 shifts the end to the front: ["m", "°", "M", "m", "m", "M", "M"]
    assertEquals(triads, ["m", "°", "M", "m", "m", "M", "M"]);
  },
);

Deno.test(
  "getRomanTriadsForRootAndNoteCollectionKey - D Dorian with fillChromatic and rotateToRootInteger0",
  () => {
    // If we take D Dorian, "i" is at index 0 without rotation.
    // If we rotate to root 2 (D), the "i" should be at index 2.
    // Original without rotation:
    // 0:i, 1:-, 2:ii, 3:III, 4:-, ...

    const chords = getRomanTriadsForRootAndNoteCollectionKey("D", "dorian", {
      fillChromatic: true,
      rotateToRootInteger0: true,
    });

    assertEquals(chords.length, 12);
    assertEquals(chords[0], "VII");
    assertEquals(chords[1], undefined);
    assertEquals(chords[2], "i"); // Root D
    assertEquals(chords[3], undefined);
    assertEquals(chords[4], "ii");
    assertEquals(chords[5], "III");
    assertEquals(chords[6], undefined);
    assertEquals(chords[7], "IV");
    assertEquals(chords[8], undefined);
    assertEquals(chords[9], "v");
    assertEquals(chords[10], undefined);
    assertEquals(chords[11], "vi°");
  },
);

Deno.test(
  "getTriadsForRootAndNoteCollectionKey - D Dorian with fillChromatic and rotateToRootInteger0",
  () => {
    // Similarly, "Dm" should be at index 2
    const triads = getTriadsForRootAndNoteCollectionKey("D", "dorian", {
      fillChromatic: true,
      rotateToRootInteger0: true,
    });

    assertEquals(triads.length, 12);
    assertEquals(triads[0], "CM");
    assertEquals(triads[1], undefined);
    assertEquals(triads[2], "Dm");
    assertEquals(triads[3], undefined);
    assertEquals(triads[4], "Em");
    assertEquals(triads[5], "FM");
    assertEquals(triads[6], undefined);
    assertEquals(triads[7], "GM");
    assertEquals(triads[8], undefined);
    assertEquals(triads[9], "Am");
    assertEquals(triads[10], undefined);
    assertEquals(triads[11], "B°");
  },
);

Deno.test(
  "getRomanTriadsForRootAndNoteCollectionKey - C Ionian with fillChromatic",
  () => {
    const triads = getRomanTriadsForRootAndNoteCollectionKey("C", "ionian", {
      fillChromatic: true,
      rotateToRootInteger0: true,
    });
    assertEquals(triads.length, 12);
    assertEquals(triads[0], "I");
    assertEquals(triads[1], undefined);
    assertEquals(triads[2], "ii");
    assertEquals(triads[3], undefined);
    assertEquals(triads[4], "iii");
    assertEquals(triads[5], "IV");
    assertEquals(triads[6], undefined);
    assertEquals(triads[7], "V");
    assertEquals(triads[8], undefined);
    assertEquals(triads[9], "vi");
    assertEquals(triads[10], undefined);
    assertEquals(triads[11], "vii°");
  },
);

Deno.test(
  "getRomanTriadsForRootAndNoteCollectionKey - F Ionian with fillChromatic and rotateToRootInteger0 = false",
  () => {
    // If we don't rotate to root integer 0, F Ionian stays relative to F.
    // Index 0 is F, 2 is G, 4 is A, 5 is Bb
    const triads = getRomanTriadsForRootAndNoteCollectionKey("F", "ionian", {
      fillChromatic: true,
      rotateToRootInteger0: false,
    });
    assertEquals(triads[0], "I"); // F
    assertEquals(triads[2], "ii"); // G
    assertEquals(triads[4], "iii"); // A
    assertEquals(triads[5], "IV"); // Bb
    assertEquals(triads[7], "V"); // C
  },
);

Deno.test(
  "getRomanSeventhChordsForRootAndNoteCollectionKey - F Ionian with fillChromatic and rotateToRootInteger0 = true",
  () => {
    const sevenths = getRomanSeventhChordsForRootAndNoteCollectionKey(
      "F",
      "ionian",
      {
        fillChromatic: true,
        rotateToRootInteger0: true,
      },
    );
    // Rotating F to root integer 0 pushes F (index 5) past index 0.
    // In F major: F=I, G=ii, A=iii, Bb=IV, C=V, D=vi, E=vii°
    // Absolute positions:
    // C=0 -> V
    // D=2 -> vi
    // E=4 -> vii°
    // F=5 -> I
    // G=7 -> ii
    // A=9 -> iii
    // Bb=10 -> IV

    assertEquals(sevenths.length, 12);
    assertEquals(sevenths[0], "V7"); // C
    assertEquals(sevenths[1], undefined);
    assertEquals(sevenths[2], "vim7"); // D
    assertEquals(sevenths[3], undefined);
    assertEquals(sevenths[4], "viiø7"); // E
    assertEquals(sevenths[5], "IM7"); // F
    assertEquals(sevenths[6], undefined);
    assertEquals(sevenths[7], "iim7"); // G
    assertEquals(sevenths[8], undefined);
    assertEquals(sevenths[9], "iiim7"); // A
    assertEquals(sevenths[10], "IVM7"); // Bb
    assertEquals(sevenths[11], undefined);
  },
);

Deno.test(
  "Non-authored rooted collections return undefined placeholders",
  () => {
    const sevenths = getRomanSeventhChordsForRootAndNoteCollectionKey(
      "A",
      "minorPentatonic",
      {
        fillChromatic: true,
        rotateToRootInteger0: true,
      },
    );
    const bluesTriads = getTriadsForRootAndNoteCollectionKey(
      "C",
      "bluesPentatonic",
    );

    assertEquals(sevenths.length, 12);
    assertEquals(sevenths, Array.from({ length: 12 }, () => undefined));
    assertEquals(bluesTriads, [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ]);
  },
);
