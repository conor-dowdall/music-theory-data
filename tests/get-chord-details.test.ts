import { assertEquals } from "@std/assert";
import {
  getChordDetailsForDiatonicMode,
  getChordDetailsForHarmonicMinorMode,
  getChordDetailsForMelodicMinorMode,
} from "../src/utils/get-chords.ts";
import type { ChordDetails } from "../src/types/chords.d.ts";

Deno.test("getChordDetailsForDiatonicMode - Ionian", () => {
  const chords = getChordDetailsForDiatonicMode("ionian");

  const expectedChords: ChordDetails[] = [
    {
      interval: "1",
      triad: "M",
      seventh: "M7",
      romanTriad: "I",
      romanSeventhChord: "IM7",
    },
    {
      interval: "2",
      triad: "m",
      seventh: "m7",
      romanTriad: "ii",
      romanSeventhChord: "iim7",
    },
    {
      interval: "3",
      triad: "m",
      seventh: "m7",
      romanTriad: "iii",
      romanSeventhChord: "iiim7",
    },
    {
      interval: "4",
      triad: "M",
      seventh: "M7",
      romanTriad: "IV",
      romanSeventhChord: "IVM7",
    },
    {
      interval: "5",
      triad: "M",
      seventh: "7",
      romanTriad: "V",
      romanSeventhChord: "V7",
    },
    {
      interval: "6",
      triad: "m",
      seventh: "m7",
      romanTriad: "vi",
      romanSeventhChord: "vim7",
    },
    {
      interval: "7",
      triad: "°",
      seventh: "ø7",
      romanTriad: "vii°",
      romanSeventhChord: "viiø7",
    },
  ];

  assertEquals(chords, expectedChords);
});

Deno.test("getChordDetailsForDiatonicMode - Dorian", () => {
  const chords = getChordDetailsForDiatonicMode("dorian");

  const expectedChords: ChordDetails[] = [
    {
      interval: "1",
      triad: "m",
      seventh: "m7",
      romanTriad: "i",
      romanSeventhChord: "im7",
    },
    {
      interval: "2",
      triad: "m",
      seventh: "m7",
      romanTriad: "ii",
      romanSeventhChord: "iim7",
    },
    {
      interval: "♭3",
      triad: "M",
      seventh: "M7",
      romanTriad: "III",
      romanSeventhChord: "IIIM7",
    },
    {
      interval: "4",
      triad: "M",
      seventh: "7",
      romanTriad: "IV",
      romanSeventhChord: "IV7",
    },
    {
      interval: "5",
      triad: "m",
      seventh: "m7",
      romanTriad: "v",
      romanSeventhChord: "vm7",
    },
    {
      interval: "6",
      triad: "°",
      seventh: "ø7",
      romanTriad: "vi°",
      romanSeventhChord: "viø7",
    },
    {
      interval: "♭7",
      triad: "M",
      seventh: "M7",
      romanTriad: "VII",
      romanSeventhChord: "VIIM7",
    },
  ];

  assertEquals(chords, expectedChords);
});

Deno.test("getChordDetailsForDiatonicMode - Locrian", () => {
  const chords = getChordDetailsForDiatonicMode("locrian");

  const expectedChords: ChordDetails[] = [
    {
      interval: "1",
      triad: "°",
      seventh: "ø7",
      romanTriad: "i°",
      romanSeventhChord: "iø7",
    },
    {
      interval: "♭2",
      triad: "M",
      seventh: "M7",
      romanTriad: "II",
      romanSeventhChord: "IIM7",
    },
    {
      interval: "♭3",
      triad: "m",
      seventh: "m7",
      romanTriad: "iii",
      romanSeventhChord: "iiim7",
    },
    {
      interval: "4",
      triad: "m",
      seventh: "m7",
      romanTriad: "iv",
      romanSeventhChord: "ivm7",
    },
    {
      interval: "♭5",
      triad: "M",
      seventh: "M7",
      romanTriad: "V",
      romanSeventhChord: "VM7",
    },
    {
      interval: "♭6",
      triad: "M",
      seventh: "7",
      romanTriad: "VI",
      romanSeventhChord: "VI7",
    },
    {
      interval: "♭7",
      triad: "m",
      seventh: "m7",
      romanTriad: "vii",
      romanSeventhChord: "viim7",
    },
  ];

  assertEquals(chords, expectedChords);
});

Deno.test("getChordDetailsForHarmonicMinorMode - Harmonic Minor", () => {
  const chords = getChordDetailsForHarmonicMinorMode("harmonicMinor");

  const expectedChords: ChordDetails[] = [
    {
      interval: "1",
      triad: "m",
      seventh: "m(M7)",
      romanTriad: "i",
      romanSeventhChord: "iM7",
    },
    {
      interval: "2",
      triad: "°",
      seventh: "ø7",
      romanTriad: "ii°",
      romanSeventhChord: "iiø7",
    },
    {
      interval: "♭3",
      triad: "+",
      seventh: "+M7",
      romanTriad: "III+",
      romanSeventhChord: "III+M7",
    },
    {
      interval: "4",
      triad: "m",
      seventh: "m7",
      romanTriad: "iv",
      romanSeventhChord: "ivm7",
    },
    {
      interval: "5",
      triad: "M",
      seventh: "7",
      romanTriad: "V",
      romanSeventhChord: "V7",
    },
    {
      interval: "♭6",
      triad: "M",
      seventh: "M7",
      romanTriad: "VI",
      romanSeventhChord: "VIM7",
    },
    {
      interval: "7",
      triad: "°",
      seventh: "°7",
      romanTriad: "vii°",
      romanSeventhChord: "vii°7",
    },
  ];

  assertEquals(chords, expectedChords);
});

Deno.test("getChordDetailsForHarmonicMinorMode - Phrygian Dominant", () => {
  const chords = getChordDetailsForHarmonicMinorMode("phrygianDominant");

  const expectedChords: ChordDetails[] = [
    {
      interval: "1",
      triad: "M",
      seventh: "7",
      romanTriad: "I",
      romanSeventhChord: "I7",
    },
    {
      interval: "♭2",
      triad: "M",
      seventh: "M7",
      romanTriad: "II",
      romanSeventhChord: "IIM7",
    },
    {
      interval: "3",
      triad: "°",
      seventh: "°7",
      romanTriad: "iii°",
      romanSeventhChord: "iii°7",
    },
    {
      interval: "4",
      triad: "m",
      seventh: "m(M7)",
      romanTriad: "iv",
      romanSeventhChord: "ivM7",
    },
    {
      interval: "5",
      triad: "°",
      seventh: "ø7",
      romanTriad: "v°",
      romanSeventhChord: "vø7",
    },
    {
      interval: "♭6",
      triad: "+",
      seventh: "+M7",
      romanTriad: "VI+",
      romanSeventhChord: "VI+M7",
    },
    {
      interval: "♭7",
      triad: "m",
      seventh: "m7",
      romanTriad: "vii",
      romanSeventhChord: "viim7",
    },
  ];

  assertEquals(chords, expectedChords);
});

Deno.test("getChordDetailsForMelodicMinorMode - Melodic Minor", () => {
  const chords = getChordDetailsForMelodicMinorMode("melodicMinor");

  const expectedChords: ChordDetails[] = [
    {
      interval: "1",
      triad: "m",
      seventh: "m(M7)",
      romanTriad: "i",
      romanSeventhChord: "iM7",
    },
    {
      interval: "2",
      triad: "m",
      seventh: "m7",
      romanTriad: "ii",
      romanSeventhChord: "iim7",
    },
    {
      interval: "♭3",
      triad: "+",
      seventh: "+M7",
      romanTriad: "III+",
      romanSeventhChord: "III+M7",
    },
    {
      interval: "4",
      triad: "M",
      seventh: "7",
      romanTriad: "IV",
      romanSeventhChord: "IV7",
    },
    {
      interval: "5",
      triad: "M",
      seventh: "7",
      romanTriad: "V",
      romanSeventhChord: "V7",
    },
    {
      interval: "6",
      triad: "°",
      seventh: "ø7",
      romanTriad: "vi°",
      romanSeventhChord: "viø7",
    },
    {
      interval: "7",
      triad: "°",
      seventh: "ø7",
      romanTriad: "vii°",
      romanSeventhChord: "viiø7",
    },
  ];

  assertEquals(chords, expectedChords);
});
