import { assertEquals } from "@std/assert";
import {
  getNoteNamesFromRootAndCollectionKey,
  getNoteNamesFromRootAndIntervals,
} from "../src/utils/note-names.ts";
import { diatonicModes } from "../src/data/note-collections/diatonic-modes.ts";
import type { NoteCollectionKey } from "../src/data/note-collections/mod.ts";
import { isValidNoteCollectionKey } from "../src/utils/note-collections.ts";

Deno.test("getNoteNamesFromRootAndCollectionKey - Major Scales", () => {
  assertEquals(getNoteNamesFromRootAndCollectionKey("C", "ionian"), [
    "C",
    "D",
    "E",
    "F",
    "G",
    "A",
    "B",
    "C",
  ]);
  assertEquals(getNoteNamesFromRootAndCollectionKey("G", "ionian"), [
    "G",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F♯",
    "G",
  ]);
  assertEquals(getNoteNamesFromRootAndCollectionKey("D", "ionian"), [
    "D",
    "E",
    "F♯",
    "G",
    "A",
    "B",
    "C♯",
    "D",
  ]);
  assertEquals(getNoteNamesFromRootAndCollectionKey("A", "ionian"), [
    "A",
    "B",
    "C♯",
    "D",
    "E",
    "F♯",
    "G♯",
    "A",
  ]);
  assertEquals(getNoteNamesFromRootAndCollectionKey("E", "ionian"), [
    "E",
    "F♯",
    "G♯",
    "A",
    "B",
    "C♯",
    "D♯",
    "E",
  ]);
  assertEquals(getNoteNamesFromRootAndCollectionKey("B", "ionian"), [
    "B",
    "C♯",
    "D♯",
    "E",
    "F♯",
    "G♯",
    "A♯",
    "B",
  ]);
  assertEquals(getNoteNamesFromRootAndCollectionKey("F♯", "ionian"), [
    "F♯",
    "G♯",
    "A♯",
    "B",
    "C♯",
    "D♯",
    "E♯",
    "F♯",
  ]);
  assertEquals(getNoteNamesFromRootAndCollectionKey("C♯", "ionian"), [
    "C♯",
    "D♯",
    "E♯",
    "F♯",
    "G♯",
    "A♯",
    "B♯",
    "C♯",
  ]);

  assertEquals(getNoteNamesFromRootAndCollectionKey("F", "ionian"), [
    "F",
    "G",
    "A",
    "B♭",
    "C",
    "D",
    "E",
    "F",
  ]);
  assertEquals(getNoteNamesFromRootAndCollectionKey("B♭", "ionian"), [
    "B♭",
    "C",
    "D",
    "E♭",
    "F",
    "G",
    "A",
    "B♭",
  ]);
  assertEquals(getNoteNamesFromRootAndCollectionKey("E♭", "ionian"), [
    "E♭",
    "F",
    "G",
    "A♭",
    "B♭",
    "C",
    "D",
    "E♭",
  ]);
  assertEquals(getNoteNamesFromRootAndCollectionKey("A♭", "ionian"), [
    "A♭",
    "B♭",
    "C",
    "D♭",
    "E♭",
    "F",
    "G",
    "A♭",
  ]);
  assertEquals(getNoteNamesFromRootAndCollectionKey("D♭", "ionian"), [
    "D♭",
    "E♭",
    "F",
    "G♭",
    "A♭",
    "B♭",
    "C",
    "D♭",
  ]);
  assertEquals(getNoteNamesFromRootAndCollectionKey("G♭", "ionian"), [
    "G♭",
    "A♭",
    "B♭",
    "C♭",
    "D♭",
    "E♭",
    "F",
    "G♭",
  ]);
  assertEquals(getNoteNamesFromRootAndCollectionKey("C♭", "ionian"), [
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

Deno.test("getNoteNamesFromRootAndCollectionKey - Minor Scales", () => {
  assertEquals(getNoteNamesFromRootAndCollectionKey("C", "aeolian"), [
    "C",
    "D",
    "E♭",
    "F",
    "G",
    "A♭",
    "B♭",
    "C",
  ]);
  assertEquals(getNoteNamesFromRootAndCollectionKey("A", "aeolian"), [
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

Deno.test("getNoteNamesFromRootAndCollectionKey - Mixolydian Modes", () => {
  assertEquals(getNoteNamesFromRootAndCollectionKey("G♭", "mixolydian"), [
    "G♭",
    "A♭",
    "B♭",
    "C♭",
    "D♭",
    "E♭",
    "F♭",
    "G♭",
  ]);
  assertEquals(getNoteNamesFromRootAndCollectionKey("D♭", "mixolydian"), [
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

Deno.test("getNoteNamesFromRootAndCollectionKey - Lydian Modes", () => {
  assertEquals(getNoteNamesFromRootAndCollectionKey("F", "lydian"), [
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

Deno.test("getNoteNamesFromRootAndCollectionKey - Major Chord", () => {
  assertEquals(getNoteNamesFromRootAndCollectionKey("D", "major"), [
    "D",
    "F♯",
    "A",
  ]);
});

Deno.test("getNoteNamesFromRootAndCollectionKey - Major Seventh Chord", () => {
  assertEquals(getNoteNamesFromRootAndCollectionKey("G", "major7"), [
    "G",
    "B",
    "D",
    "F♯",
  ]);
});

Deno.test("getNoteNamesFromRootAndCollectionKey - Dominant 13th Chord", () => {
  assertEquals(getNoteNamesFromRootAndCollectionKey("C", "dominant13"), [
    "C",
    "E",
    "G",
    "B♭",
    "D",
    "F",
    "A",
  ]);
});

Deno.test("getNoteNamesFromRootAndCollectionKey - Locrian Modes", () => {
  assertEquals(getNoteNamesFromRootAndCollectionKey("B", "locrian"), [
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "A",
    "B",
  ]);
  assertEquals(getNoteNamesFromRootAndCollectionKey("F", "locrian"), [
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
  "getNoteNamesFromRootAndCollectionKey - Super Locrian Double Flat 7 Modes",
  () => {
    assertEquals(
      getNoteNamesFromRootAndCollectionKey("D♭", "superLocrianDoubleFlat7"),
      ["D♭", "E𝄫", "F♭", "G𝄫", "A𝄫", "B𝄫", "C𝄫", "D♭"],
    );
    assertEquals(
      getNoteNamesFromRootAndCollectionKey("A", "superLocrianDoubleFlat7"),
      ["A", "B♭", "C", "D♭", "E♭", "F", "G♭", "A"],
    );
    assertEquals(
      getNoteNamesFromRootAndCollectionKey("C♭", "superLocrianDoubleFlat7"),
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

Deno.test("getNoteNamesFromRootAndIntervals", () => {
  assertEquals(
    getNoteNamesFromRootAndIntervals("B♭", diatonicModes.aeolian.intervals, {
      filterOutOctave: true,
    }),
    ["B♭", "C", "D♭", "E♭", "F", "G♭", "A♭"],
  );
  assertEquals(
    getNoteNamesFromRootAndIntervals("B♭", diatonicModes.aeolian.intervals),
    ["B♭", "C", "D♭", "E♭", "F", "G♭", "A♭", "B♭"],
  );
});

Deno.test("getNoteNamesFromRootAndCollectionKey - Invalid Key", () => {
  assertEquals(
    getNoteNamesFromRootAndCollectionKey(
      "C",
      "invalidKey" as NoteCollectionKey,
    ),
    [],
  );
});

Deno.test("isValidNoteCollectionKey", () => {
  assertEquals(isValidNoteCollectionKey("ionian"), true);
  assertEquals(isValidNoteCollectionKey("major"), true);
  assertEquals(isValidNoteCollectionKey("invalidKey"), false);
  assertEquals(isValidNoteCollectionKey(""), false);
});

Deno.test("getNoteNamesFromRootAndIntervals - fillChromatic", () => {
  // C Major: C, D, E, F, G, A, B
  // Defaults (C-based): C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  // Result should be mixed.
  // C (0), Db (1), D (2), Eb (3), E (4), F (5), Gb (6), G (7), Ab (8), A (9), Bb (10), B (11)
  const ionianIntervals = diatonicModes.ionian.intervals;
  const cMajorChromatic = getNoteNamesFromRootAndIntervals(
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
  const dMajorChromatic = getNoteNamesFromRootAndIntervals(
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
  const fDefaults = getNoteNamesFromRootAndIntervals("F", [], {
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
  const fMajorChromatic = getNoteNamesFromRootAndIntervals(
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

Deno.test("getNoteNamesFromRootAndIntervals - rotateToRootInteger0", () => {
  const ionianIntervals = diatonicModes.ionian.intervals;

  // C Major (fillChromatic, rotate) - Should be standard C Chromatic
  // C (0). Rotate by 0. No change.
  const cMajorRotated = getNoteNamesFromRootAndIntervals("C", ionianIntervals, {
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
  const dMajorRotated = getNoteNamesFromRootAndIntervals("D", ionianIntervals, {
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
  const fDefaultsRotated = getNoteNamesFromRootAndIntervals("F", [], {
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
  "getNoteNamesFromRootAndCollectionKey - fillChromatic with mostSimilarScale",
  () => {
    // D major chord has mostSimilarScale "ionian" (D, E, F#, G, A, B, C#)
    // Without mostSimilarScale, D major chord with fillChromatic would be:
    // D, Eb, E, F, F#, G, Ab, A, Bb, B, C, Db
    // With mostSimilarScale "ionian", the Db is overwritten by C# (and E, G, B are provided by the scale)
    assertEquals(
      getNoteNamesFromRootAndCollectionKey("D", "major", {
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
