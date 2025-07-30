import { diatonicModes } from "../src/note-sequences/diatonic-modes.ts";
import { harmonicMinorModes } from "../src/note-sequences/harmonic-minor-modes.ts";
import {
  generateDiatonicLabelsOverrideChords,
  generateHarmonicMinorLabelsOverrideChords,
} from "../src/utils/chord-label-generators.ts";
import { assertEquals } from "@std/assert";

Deno.test("generateDiatonicLabelsOverrideChords - debug", () => {
  console.log("---- HARMONIC MINOR ----");
  const harmonicMinorIntegers = harmonicMinorModes.harmonicMinor.integers;
  console.log(
    generateHarmonicMinorLabelsOverrideChords(harmonicMinorIntegers, 0),
  );

  console.log("---- DIATONIC MODES ----");
  const ionianIntegers = diatonicModes.ionian.integers;
  console.log(generateDiatonicLabelsOverrideChords(ionianIntegers, 0));
});

Deno.test("generateDiatonicLabelsOverrideChords - Ionian (rotation 0)", () => {
  const ionianIntegers = diatonicModes.ionian.integers;
  const labels = generateDiatonicLabelsOverrideChords(ionianIntegers, 0);

  const expectedTriads = new Map([
    [0, "M"],
    [2, "m"],
    [4, "m"],
    [5, "M"],
    [7, "M"],
    [9, "m"],
    [11, "°"],
  ]);

  const expectedRomanTriads = new Map([
    [0, "I"],
    [2, "ii"],
    [4, "iii"],
    [5, "IV"],
    [7, "V"],
    [9, "vi"],
    [11, "vii°"],
  ]);

  const expectedSevenths = new Map([
    [0, "M7"],
    [2, "m7"],
    [4, "m7"],
    [5, "M7"],
    [7, "7"],
    [9, "m7"],
    [11, "ø7"],
  ]);

  const expectedRomanSevenths = new Map([
    [0, "IM7"],
    [2, "iim7"],
    [4, "iiim7"],
    [5, "IVM7"],
    [7, "V7"],
    [9, "vim7"],
    [11, "viiø7"],
  ]);

  assertEquals(labels.triad, expectedTriads);
  assertEquals(labels.romanTriad, expectedRomanTriads);
  assertEquals(labels.seventh, expectedSevenths);
  assertEquals(labels.romanSeventh, expectedRomanSevenths);
});

Deno.test("generateDiatonicLabelsOverrideChords - Dorian (rotation 1)", () => {
  const dorianIntegers = diatonicModes.dorian.integers;
  const labels = generateDiatonicLabelsOverrideChords(dorianIntegers, 1);

  const expectedTriads = new Map([
    [0, "m"],
    [2, "m"],
    [3, "M"],
    [5, "M"],
    [7, "m"],
    [9, "°"],
    [10, "M"],
  ]);

  const expectedRomanTriads = new Map([
    [0, "i"],
    [2, "ii"],
    [3, "III"],
    [5, "IV"],
    [7, "v"],
    [9, "vi°"],
    [10, "VII"],
  ]);

  const expectedSevenths = new Map([
    [0, "m7"],
    [2, "m7"],
    [3, "M7"],
    [5, "7"],
    [7, "m7"],
    [9, "ø7"],
    [10, "M7"],
  ]);

  const expectedRomanSevenths = new Map([
    [0, "im7"],
    [2, "iim7"],
    [3, "IIIM7"],
    [5, "IV7"],
    [7, "vm7"],
    [9, "viø7"],
    [10, "VIIM7"],
  ]);

  assertEquals(labels.triad, expectedTriads);
  assertEquals(labels.romanTriad, expectedRomanTriads);
  assertEquals(labels.seventh, expectedSevenths);
  assertEquals(labels.romanSeventh, expectedRomanSevenths);
});

Deno.test("generateDiatonicLabelsOverrideChords - Locrian (rotation 6)", () => {
  const locrianIntegers = diatonicModes.locrian.integers;
  const labels = generateDiatonicLabelsOverrideChords(locrianIntegers, 6);

  const expectedTriads = new Map([
    [0, "°"],
    [1, "M"],
    [3, "m"],
    [5, "m"],
    [6, "M"],
    [8, "M"],
    [10, "m"],
  ]);

  const expectedRomanTriads = new Map([
    [0, "i°"],
    [1, "II"],
    [3, "iii"],
    [5, "iv"],
    [6, "V"],
    [8, "VI"],
    [10, "vii"],
  ]);

  const expectedSevenths = new Map([
    [0, "ø7"],
    [1, "M7"],
    [3, "m7"],
    [5, "m7"],
    [6, "M7"],
    [8, "7"],
    [10, "m7"],
  ]);

  const expectedRomanSevenths = new Map([
    [0, "iø7"],
    [1, "IIM7"],
    [3, "iiim7"],
    [5, "ivm7"],
    [6, "VM7"],
    [8, "VI7"],
    [10, "viim7"],
  ]);

  assertEquals(labels.triad, expectedTriads);
  assertEquals(labels.romanTriad, expectedRomanTriads);
  assertEquals(labels.seventh, expectedSevenths);
  assertEquals(labels.romanSeventh, expectedRomanSevenths);
});
