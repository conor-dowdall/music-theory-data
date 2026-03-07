import { assertEquals } from "@std/assert";
import {
  getNoteNamesForRootAndIntervals,
  getNoteNamesForRootAndNoteCollectionKey,
} from "../src/utils/note-names.ts";
import { diatonicModes } from "../src/data/note-collections/diatonic-modes.ts";

Deno.test("getNoteNamesForRootAndNoteCollectionKey - Major Scales", () => {
  assertEquals(getNoteNamesForRootAndNoteCollectionKey("C", "ionian"), [
    "C",
    "D",
    "E",
    "F",
    "G",
    "A",
    "B",
    "C",
  ]);
  assertEquals(getNoteNamesForRootAndNoteCollectionKey("G", "ionian"), [
    "G",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F♯",
    "G",
  ]);
  assertEquals(getNoteNamesForRootAndNoteCollectionKey("D", "ionian"), [
    "D",
    "E",
    "F♯",
    "G",
    "A",
    "B",
    "C♯",
    "D",
  ]);
  assertEquals(getNoteNamesForRootAndNoteCollectionKey("A", "ionian"), [
    "A",
    "B",
    "C♯",
    "D",
    "E",
    "F♯",
    "G♯",
    "A",
  ]);
  assertEquals(getNoteNamesForRootAndNoteCollectionKey("E", "ionian"), [
    "E",
    "F♯",
    "G♯",
    "A",
    "B",
    "C♯",
    "D♯",
    "E",
  ]);
  assertEquals(getNoteNamesForRootAndNoteCollectionKey("B", "ionian"), [
    "B",
    "C♯",
    "D♯",
    "E",
    "F♯",
    "G♯",
    "A♯",
    "B",
  ]);
  assertEquals(getNoteNamesForRootAndNoteCollectionKey("F♯", "ionian"), [
    "F♯",
    "G♯",
    "A♯",
    "B",
    "C♯",
    "D♯",
    "E♯",
    "F♯",
  ]);
  assertEquals(getNoteNamesForRootAndNoteCollectionKey("C♯", "ionian"), [
    "C♯",
    "D♯",
    "E♯",
    "F♯",
    "G♯",
    "A♯",
    "B♯",
    "C♯",
  ]);

  assertEquals(getNoteNamesForRootAndNoteCollectionKey("F", "ionian"), [
    "F",
    "G",
    "A",
    "B♭",
    "C",
    "D",
    "E",
    "F",
  ]);
  assertEquals(getNoteNamesForRootAndNoteCollectionKey("B♭", "ionian"), [
    "B♭",
    "C",
    "D",
    "E♭",
    "F",
    "G",
    "A",
    "B♭",
  ]);
  assertEquals(getNoteNamesForRootAndNoteCollectionKey("E♭", "ionian"), [
    "E♭",
    "F",
    "G",
    "A♭",
    "B♭",
    "C",
    "D",
    "E♭",
  ]);
  assertEquals(getNoteNamesForRootAndNoteCollectionKey("A♭", "ionian"), [
    "A♭",
    "B♭",
    "C",
    "D♭",
    "E♭",
    "F",
    "G",
    "A♭",
  ]);
  assertEquals(getNoteNamesForRootAndNoteCollectionKey("D♭", "ionian"), [
    "D♭",
    "E♭",
    "F",
    "G♭",
    "A♭",
    "B♭",
    "C",
    "D♭",
  ]);
  assertEquals(getNoteNamesForRootAndNoteCollectionKey("G♭", "ionian"), [
    "G♭",
    "A♭",
    "B♭",
    "C♭",
    "D♭",
    "E♭",
    "F",
    "G♭",
  ]);
  assertEquals(getNoteNamesForRootAndNoteCollectionKey("C♭", "ionian"), [
    "C♭",
    "D♭",
    "E♭",
    "F♭",
    "G♭",
    "A♭",
    "B♭",
    "C♭",
  ]);
});

Deno.test("getNoteNamesForRootAndNoteCollectionKey - Minor Scales", () => {
  assertEquals(getNoteNamesForRootAndNoteCollectionKey("C", "aeolian"), [
    "C",
    "D",
    "E♭",
    "F",
    "G",
    "A♭",
    "B♭",
    "C",
  ]);
  assertEquals(getNoteNamesForRootAndNoteCollectionKey("A", "aeolian"), [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "A",
  ]);
});

Deno.test("getNoteNamesForRootAndNoteCollectionKey - Mixolydian Modes", () => {
  assertEquals(getNoteNamesForRootAndNoteCollectionKey("G♭", "mixolydian"), [
    "G♭",
    "A♭",
    "B♭",
    "C♭",
    "D♭",
    "E♭",
    "F♭",
    "G♭",
  ]);
  assertEquals(getNoteNamesForRootAndNoteCollectionKey("D♭", "mixolydian"), [
    "D♭",
    "E♭",
    "F",
    "G♭",
    "A♭",
    "B♭",
    "C♭",
    "D♭",
  ]);
});

Deno.test("getNoteNamesForRootAndNoteCollectionKey - Lydian Modes", () => {
  assertEquals(getNoteNamesForRootAndNoteCollectionKey("F", "lydian"), [
    "F",
    "G",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ]);
});

Deno.test("getNoteNamesForRootAndNoteCollectionKey - Major Chord", () => {
  assertEquals(getNoteNamesForRootAndNoteCollectionKey("D", "major"), [
    "D",
    "F♯",
    "A",
  ]);
});

Deno.test(
  "getNoteNamesForRootAndNoteCollectionKey - Major Seventh Chord",
  () => {
    assertEquals(getNoteNamesForRootAndNoteCollectionKey("G", "major7"), [
      "G",
      "B",
      "D",
      "F♯",
    ]);
  },
);

Deno.test(
  "getNoteNamesForRootAndNoteCollectionKey - Dominant 13th Chord",
  () => {
    assertEquals(getNoteNamesForRootAndNoteCollectionKey("C", "dominant13"), [
      "C",
      "E",
      "G",
      "B♭",
      "D",
      "F",
      "A",
    ]);
  },
);

Deno.test("getNoteNamesForRootAndNoteCollectionKey - Locrian Modes", () => {
  assertEquals(getNoteNamesForRootAndNoteCollectionKey("B", "locrian"), [
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "A",
    "B",
  ]);
  assertEquals(getNoteNamesForRootAndNoteCollectionKey("F", "locrian"), [
    "F",
    "G♭",
    "A♭",
    "B♭",
    "C♭",
    "D♭",
    "E♭",
    "F",
  ]);
});

Deno.test(
  "getNoteNamesForRootAndNoteCollectionKey - Super Locrian Double Flat 7 Modes",
  () => {
    assertEquals(
      getNoteNamesForRootAndNoteCollectionKey("D♭", "superLocrianDoubleFlat7"),
      ["D♭", "E𝄫", "F♭", "G𝄫", "A𝄫", "B𝄫", "C𝄫", "D♭"],
    );
    assertEquals(
      getNoteNamesForRootAndNoteCollectionKey("A", "superLocrianDoubleFlat7"),
      ["A", "B♭", "C", "D♭", "E♭", "F", "G♭", "A"],
    );
    assertEquals(
      getNoteNamesForRootAndNoteCollectionKey("C♭", "superLocrianDoubleFlat7"),
      [
        "C♭",
        "D𝄫",
        "E𝄫",
        "F𝄫",
        "G𝄫",
        "A𝄫",
        "A♭", // no triple flats are used in this library, i.e. Bbbb
        "C♭",
      ],
    );
  },
);

Deno.test("getNoteNamesForRootAndIntervals", () => {
  assertEquals(
    getNoteNamesForRootAndIntervals("B♭", diatonicModes.aeolian.intervals, {
      filterOutOctave: true,
    }),
    ["B♭", "C", "D♭", "E♭", "F", "G♭", "A♭"],
  );
  assertEquals(
    getNoteNamesForRootAndIntervals("B♭", diatonicModes.aeolian.intervals),
    ["B♭", "C", "D♭", "E♭", "F", "G♭", "A♭", "B♭"],
  );
});

Deno.test("getNoteNamesForRootAndNoteCollectionKey - Invalid Key", () => {
  assertEquals(
    getNoteNamesForRootAndNoteCollectionKey("C", "invalid_key" as never),
    [],
  );
});

Deno.test("getNoteNamesForRootAndIntervals - fillChromatic", () => {
  // C Major: C, D, E, F, G, A, B
  // Defaults (C-based): C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  // Result should be mixed.
  // C (0), Db (1), D (2), Eb (3), E (4), F (5), Gb (6), G (7), Ab (8), A (9), Bb (10), B (11)
  const ionianIntervals = diatonicModes.ionian.intervals;
  const cMajorChromatic = getNoteNamesForRootAndIntervals(
    "C",
    ionianIntervals,
    { fillChromatic: true },
  );
  assertEquals(cMajorChromatic, [
    "C",
    "D♭",
    "D",
    "E♭",
    "E",
    "F",
    "G♭",
    "G",
    "A♭",
    "A",
    "B♭",
    "B",
  ]);

  // D Major: D, E, F#, G, A, B, C#
  // Root D defaults (rotated flat notes): D, Eb, E, F, Gb, G, Ab, A, Bb, B, C, Db
  // Expected overwrites:
  // 2 (M2) -> E (matches default)
  // 4 (M3) -> F# (overwrites Gb)
  // 5 (P4) -> G (matches default)
  // 7 (P5) -> A (matches default)
  // 9 (M6) -> B (matches default)
  // 11 (M7) -> C# (overwrites Db)
  // Result: D, Eb, E, F, F#, G, Ab, A, Bb, B, C, C#
  const dMajorChromatic = getNoteNamesForRootAndIntervals(
    "D",
    ionianIntervals, // Ionian is Major
    { fillChromatic: true },
  );
  assertEquals(dMajorChromatic, [
    "D",
    "E♭",
    "E", // M2
    "F",
    "F♯", // M3 (overwrites Gb)
    "G", // P4
    "A♭",
    "A", // P5
    "B♭",
    "B", // M6
    "C",
    "C♯", // M7 (overwrites Db)
  ]);

  // Test F with empty intervals - should just return defaults relative to root
  const fDefaults = getNoteNamesForRootAndIntervals("F", [], {
    fillChromatic: true,
  });
  // F chromatic with flats: F, Gb, G, Ab, A, Bb, B, C, Db, D, Eb, E
  assertEquals(fDefaults, [
    "F",
    "G♭",
    "G",
    "A♭",
    "A",
    "B♭",
    "C♭",
    "C",
    "D♭",
    "D",
    "E♭",
    "E",
  ]);

  // Test F with ionian intervals
  const fMajorChromatic = getNoteNamesForRootAndIntervals(
    "F",
    ionianIntervals,
    {
      fillChromatic: true,
    },
  );
  // F flat chromatic: F, Gb, G, Ab, A, Bb, B, C, Db, D, Eb, E
  assertEquals(fMajorChromatic, [
    "F",
    "G♭",
    "G",
    "A♭",
    "A",
    "B♭",
    "C♭",
    "C",
    "D♭",
    "D",
    "E♭",
    "E",
  ]);
});

Deno.test("getNoteNamesForRootAndIntervals - rotateToRootInteger0", () => {
  const ionianIntervals = diatonicModes.ionian.intervals;

  // C Major (fillChromatic, rotate) - Should be standard C Chromatic
  // C (0). Rotate by 0. No change.
  const cMajorRotated = getNoteNamesForRootAndIntervals("C", ionianIntervals, {
    fillChromatic: true,
    rotateToRootInteger0: true,
  });
  assertEquals(cMajorRotated, [
    "C",
    "D♭",
    "D",
    "E♭",
    "E",
    "F",
    "G♭",
    "G",
    "A♭",
    "A",
    "B♭",
    "B",
  ]);

  // D Major (fillChromatic, rotate)
  // D Major filled: [D, Eb, E, F, F#, G, Ab, A, Bb, B, C, C#]
  // Rotated to C (Right shift 2): [C, C#, D, Eb, E, F, F#, G, Ab, A, Bb, B]
  const dMajorRotated = getNoteNamesForRootAndIntervals("D", ionianIntervals, {
    fillChromatic: true,
    rotateToRootInteger0: true,
  });
  assertEquals(dMajorRotated, [
    "C",
    "C♯",
    "D",
    "E♭",
    "E",
    "F",
    "F♯",
    "G",
    "A♭",
    "A",
    "B♭",
    "B",
  ]);

  // F Major Intervals (fillChromatic, rotate)
  // F Major filled: [F, Gb, G, Ab, A, Bb, B, C, Db, D, Eb, E]
  // Rotated to C (Right shift 5 (F)):
  // Indexes in F-base: 0=F, 1=Gb, 2=G, 3=Ab, 4=A, 5=Bb, 6=B, 7=C...
  // Shift 5. Old 7 becomes (7+5)%12 = 0. So C becomes 0.
  // Result should start with C.
  // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  const fDefaultsRotated = getNoteNamesForRootAndIntervals("F", [], {
    fillChromatic: true,
    rotateToRootInteger0: true,
  });
  assertEquals(fDefaultsRotated, [
    "C",
    "D♭",
    "D",
    "E♭",
    "E",
    "F",
    "G♭",
    "G",
    "A♭",
    "A",
    "B♭",
    "C♭",
  ]);
});

Deno.test(
  "getNoteNamesForRootAndNoteCollectionKey - fillChromatic with mostSimilarScale",
  () => {
    // D major chord has mostSimilarScale "ionian" (D, E, F#, G, A, B, C#)
    // Without mostSimilarScale, D major chord with fillChromatic would be:
    // D, Eb, E, F, F#, G, Ab, A, Bb, B, C, Db
    // With mostSimilarScale "ionian", the Db is overwritten by C# (and E, G, B are provided by the scale)
    assertEquals(
      getNoteNamesForRootAndNoteCollectionKey("D", "major", {
        fillChromatic: true,
      }),
      [
        "D",
        "E♭", // default flat
        "E", // from mostSimilarScale (Ionian M2)
        "F", // default flat
        "F♯", // from major chord (and Ionian M3)
        "G", // from mostSimilarScale (Ionian P4)
        "A♭", // default flat
        "A", // from major chord (and Ionian P5)
        "B♭", // default flat
        "B", // from mostSimilarScale (Ionian M6)
        "C", // default flat
        "C♯", // from mostSimilarScale (Ionian M7)
      ],
    );
  },
);
