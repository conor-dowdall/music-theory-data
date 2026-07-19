import { assertEquals } from "@std/assert";
import {
  getChordNameForRootAndChordCollectionKey,
  getRomanNumeralForScaleIndexAndChordCollectionKey,
  getRomanSeventhChordsForNoteCollectionKey,
  getRomanSeventhChordsForRootAndNoteCollectionKey,
  getRomanTriadsForNoteCollectionKey,
  getRomanTriadsForRootAndNoteCollectionKey,
  getSeventhChordCollectionKeysForNoteCollectionKey,
  getSeventhChordNamesForRootAndNoteCollectionKey,
  getSeventhChordSuffixesForNoteCollectionKey,
  getTriadChordCollectionKeysForNoteCollectionKey,
  getTriadChordNamesForRootAndNoteCollectionKey,
  getTriadChordSuffixesForNoteCollectionKey,
  hasNoteCollectionHarmony,
} from "../src/utils/chords.ts";
import {
  chordCollectionChordSuffixes,
  chordCollectionClassifications,
  chordCollectionFamilies,
  chordCollectionKeys,
  chordCollectionRomanSuffixes,
  chordCollectionStructures,
  chordCollectionSymbolRenderings,
  getChordCollectionChordSuffix,
  getChordCollectionClassification,
  getChordCollectionKeysByClassification,
  getChordCollectionRomanSuffix,
  isChordCollectionChordSuffix,
  isChordCollectionFamily,
  isChordCollectionRomanSuffix,
  isChordCollectionStructure,
  isSeventhChordCollectionKey,
  isSupportedHarmonyParentKey,
  isTriadChordCollectionKey,
  noteCollectionHarmonyByParentKey,
  seventhChordCollectionKeys,
  supportedHarmonyParentKeys,
  triadChordCollectionKeys,
} from "../src/data/chords/mod.ts";
import { noteCollections } from "../src/data/note-collections/mod.ts";
import type {
  RomanSeventhChord,
  RomanTriad,
  SeventhChordSuffix,
  TriadChordSuffix,
} from "../src/types/chords.ts";

Deno.test("chord collection identity and rendering stay distinct", () => {
  assertEquals(noteCollections.major.primaryName, "M");
  assertEquals(getChordCollectionChordSuffix("major"), "");
  assertEquals(getChordCollectionRomanSuffix("major"), "");
  assertEquals(getChordNameForRootAndChordCollectionKey("C", "major"), "C");
  assertEquals(
    getChordNameForRootAndChordCollectionKey("C", "major7"),
    "CM7",
  );
  assertEquals(
    getRomanNumeralForScaleIndexAndChordCollectionKey(0, "major"),
    "I",
  );
  assertEquals(getChordCollectionChordSuffix("augmentedMajor7"), "+M7");
  assertEquals(getChordCollectionChordSuffix("augmented7"), "+7");
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
});

Deno.test("parent-scale harmony is compiled to canonical chord identities", () => {
  assertEquals(supportedHarmonyParentKeys, [
    "ionian",
    "harmonicMinor",
    "melodicMinor",
  ]);
  assertEquals(triadChordCollectionKeys, [
    "major",
    "minor",
    "diminishedTriad",
    "augmentedTriad",
  ]);
  assertEquals(seventhChordCollectionKeys, [
    "major7",
    "minor7",
    "minorMajor7",
    "dominant7",
    "diminished7",
    "halfDiminished7",
    "augmented7",
    "augmentedMajor7",
  ]);
  assertEquals(noteCollectionHarmonyByParentKey.ionian, {
    triads: [
      "major",
      "minor",
      "minor",
      "major",
      "major",
      "minor",
      "diminishedTriad",
    ],
    sevenths: [
      "major7",
      "minor7",
      "minor7",
      "major7",
      "dominant7",
      "minor7",
      "halfDiminished7",
    ],
  });
  assertEquals(noteCollectionHarmonyByParentKey.harmonicMinor.sevenths, [
    "minorMajor7",
    "halfDiminished7",
    "augmentedMajor7",
    "minor7",
    "dominant7",
    "major7",
    "diminished7",
  ]);
});

Deno.test("chord collection Roman suffix vocabulary covers every rendering", () => {
  const renderedChordSuffixes = [
    ...new Set(
      Object.values(chordCollectionSymbolRenderings).map((rendering) =>
        rendering.chordSuffix
      ),
    ),
  ];
  const renderedSuffixes = [
    ...new Set(
      Object.values(chordCollectionSymbolRenderings).map((rendering) =>
        rendering.romanSuffix
      ),
    ),
  ].sort();

  assertEquals(renderedChordSuffixes, [...chordCollectionChordSuffixes]);
  assertEquals(renderedSuffixes, [...chordCollectionRomanSuffixes].sort());
  assertEquals(isChordCollectionChordSuffix("+7"), true);
  assertEquals(isChordCollectionChordSuffix(""), true);
  assertEquals(isChordCollectionChordSuffix("M"), false);
  assertEquals(isChordCollectionChordSuffix("M7♯5"), false);
  assertEquals(isChordCollectionRomanSuffix("m6/9"), true);
  assertEquals(isChordCollectionRomanSuffix("garbage"), false);
});

Deno.test("chord collection classification is exhaustive and musically stable", () => {
  assertEquals(chordCollectionFamilies, [
    "major",
    "minor",
    "dominant",
    "diminished",
    "augmented",
  ]);
  assertEquals(chordCollectionStructures, [
    "triad",
    "seventh",
    "added-tone",
    "extended",
  ]);
  assertEquals(
    Object.keys(chordCollectionClassifications),
    [...chordCollectionKeys],
  );

  for (const key of chordCollectionKeys) {
    const collection = noteCollections[key];
    if (collection.category !== "chord") {
      throw new Error(`Expected ${key} to be a chord collection`);
    }
    assertEquals(
      getChordCollectionClassification(key),
      collection.classification,
    );
  }

  assertEquals(getChordCollectionClassification("augmented7"), {
    family: "augmented",
    structure: "seventh",
  });
  assertEquals(
    getChordCollectionKeysByClassification({ family: "dominant" }),
    ["dominant7", "dominant9", "dominant11", "dominant13"],
  );
  assertEquals(
    getChordCollectionKeysByClassification({
      family: "dominant",
      structure: "extended",
    }),
    ["dominant9", "dominant11", "dominant13"],
  );
  assertEquals(
    getChordCollectionKeysByClassification({
      family: "major",
      structure: "added-tone",
    }),
    ["major6", "majorAdd9", "major6Add9"],
  );
  assertEquals(isChordCollectionFamily("augmented"), true);
  assertEquals(isChordCollectionFamily("common"), false);
  assertEquals(isChordCollectionStructure("added-tone"), true);
  assertEquals(isChordCollectionStructure("tetrad"), false);
  assertEquals(isTriadChordCollectionKey("augmentedTriad"), true);
  assertEquals(isTriadChordCollectionKey("major7"), false);
  assertEquals(isSeventhChordCollectionKey("augmented7"), true);
  assertEquals(isSeventhChordCollectionKey("major9"), false);
  assertEquals(isSupportedHarmonyParentKey("melodicMinor"), true);
  assertEquals(isSupportedHarmonyParentKey("minorPentatonic"), false);
});

Deno.test(
  "rendered triad and seventh-chord suffixes - Ionian",
  () => {
    assertEquals(
      getTriadChordCollectionKeysForNoteCollectionKey("ionian"),
      [...noteCollectionHarmonyByParentKey.ionian.triads],
    );
    assertEquals(
      getSeventhChordCollectionKeysForNoteCollectionKey("ionian"),
      [...noteCollectionHarmonyByParentKey.ionian.sevenths],
    );
    const triads = getTriadChordSuffixesForNoteCollectionKey("ionian");
    const sevenths = getSeventhChordSuffixesForNoteCollectionKey("ionian");

    const expectedTriads: TriadChordSuffix[] = [
      "",
      "m",
      "m",
      "",
      "",
      "m",
      "°",
    ];
    const expectedSevenths: SeventhChordSuffix[] = [
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

Deno.test("rendered triad suffixes - Locrian", () => {
  const triads = getTriadChordSuffixesForNoteCollectionKey("locrian");
  const expectedTriads: TriadChordSuffix[] = [
    "°",
    "",
    "m",
    "m",
    "",
    "",
    "m",
  ];
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

Deno.test("rendered seventh-chord suffixes - Melodic Minor", () => {
  const sevenths = getSeventhChordSuffixesForNoteCollectionKey("melodicMinor");

  const expectedSevenths: SeventhChordSuffix[] = [
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

Deno.test("Unsupported chord collections return aligned placeholders", () => {
  const triads = getTriadChordSuffixesForNoteCollectionKey("major");
  const romanTriads = getRomanTriadsForNoteCollectionKey("major");
  const majorAdd9Triads = getTriadChordSuffixesForNoteCollectionKey(
    "majorAdd9",
  );
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
  "Unsupported chord collections return undefined chromatic placeholders",
  () => {
    const romanSevenths = getRomanSeventhChordsForNoteCollectionKey("minor", {
      fillChromatic: true,
    });

    assertEquals(romanSevenths.length, 12);
    assertEquals(romanSevenths, Array.from({ length: 12 }, () => undefined));
  },
);

Deno.test(
  "Unsupported scale collections return aligned placeholders",
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
    assertEquals(hasNoteCollectionHarmony("invalid_key" as never), false);
    assertEquals(
      getTriadChordSuffixesForNoteCollectionKey("invalid_key" as never),
      [],
    );
    assertEquals(
      getSeventhChordSuffixesForNoteCollectionKey("invalid_key" as never),
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
      getTriadChordSuffixesForNoteCollectionKey("invalid_key" as never, {
        fillChromatic: true,
      }),
      [] as never,
    );
  },
);

Deno.test("rooted triad chord names - C Ionian", () => {
  const triads = getTriadChordNamesForRootAndNoteCollectionKey("C", "ionian");
  assertEquals(triads, ["C", "Dm", "Em", "F", "G", "Am", "B°"]);
});

Deno.test("rooted seventh-chord names - G Ionian", () => {
  const sevenths = getSeventhChordNamesForRootAndNoteCollectionKey(
    "G",
    "ionian",
  );
  assertEquals(sevenths, ["GM7", "Am7", "Bm7", "CM7", "D7", "Em7", "F♯ø7"]);
});

Deno.test(
  "rooted triad names - C Ionian with fillChromatic",
  () => {
    const triads = getTriadChordNamesForRootAndNoteCollectionKey(
      "C",
      "ionian",
      {
        fillChromatic: true,
      },
    );
    assertEquals(triads.length, 12);
    assertEquals(triads[0], "C");
    assertEquals(triads[1], undefined);
    assertEquals(triads[2], "Dm");
    assertEquals(triads[3], undefined);
    assertEquals(triads[4], "Em");
    assertEquals(triads[5], "F");
    assertEquals(triads[6], undefined);
    assertEquals(triads[7], "G");
    assertEquals(triads[8], undefined);
    assertEquals(triads[9], "Am");
    assertEquals(triads[10], undefined);
    assertEquals(triads[11], "B°");
  },
);

Deno.test(
  "rooted triad names - D Ionian with fillChromatic",
  () => {
    const triads = getTriadChordNamesForRootAndNoteCollectionKey(
      "D",
      "ionian",
      {
        fillChromatic: true,
      },
    );
    assertEquals(triads.length, 12);
    assertEquals(triads[0], "D");
    assertEquals(triads[1], undefined);
    assertEquals(triads[2], "Em");
    assertEquals(triads[3], undefined);
    assertEquals(triads[4], "F♯m");
    assertEquals(triads[5], "G");
    assertEquals(triads[6], undefined);
    assertEquals(triads[7], "A");
    assertEquals(triads[8], undefined);
    assertEquals(triads[9], "Bm");
    assertEquals(triads[10], undefined);
    assertEquals(triads[11], "C♯°");
  },
);

Deno.test(
  "triad chord suffixes rotate with requested layout",
  () => {
    const triads = getTriadChordSuffixesForNoteCollectionKey("ionian", {
      rotateRight: 2,
    });
    // Instead of ["", "m", "m", "", "", "m", "°"]
    // Rotating right by 2 shifts the end to the front: ["m", "°", "", "m", "m", "", ""]
    assertEquals(triads, ["m", "°", "", "m", "m", "", ""]);
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
  "rooted triad names - D Dorian with chromatic root rotation",
  () => {
    // Similarly, "Dm" should be at index 2
    const triads = getTriadChordNamesForRootAndNoteCollectionKey(
      "D",
      "dorian",
      {
        fillChromatic: true,
        rotateToRootInteger0: true,
      },
    );

    assertEquals(triads.length, 12);
    assertEquals(triads[0], "C");
    assertEquals(triads[1], undefined);
    assertEquals(triads[2], "Dm");
    assertEquals(triads[3], undefined);
    assertEquals(triads[4], "Em");
    assertEquals(triads[5], "F");
    assertEquals(triads[6], undefined);
    assertEquals(triads[7], "G");
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
  "Unsupported rooted collections return undefined placeholders",
  () => {
    const sevenths = getRomanSeventhChordsForRootAndNoteCollectionKey(
      "A",
      "minorPentatonic",
      {
        fillChromatic: true,
        rotateToRootInteger0: true,
      },
    );
    const bluesTriads = getTriadChordNamesForRootAndNoteCollectionKey(
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
