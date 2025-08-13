import { assertEquals } from "@std/assert";
import {
  getDiatonicModeChordDetails,
  getHarmonicMinorModeChordDetails,
  getMelodicMinorModeChordDetails,
} from "../src/utils/get-chords.ts";
import type { ChordDetails } from "../src/types/chords.d.ts";

Deno.test("getDiatonicModeChordDetails - Ionian", () => {
  const chords = getDiatonicModeChordDetails("ionian");

  const expectedChords: ChordDetails[] = [
    {
      interval: "1",
      triad: "M",
      seventh: "M7",
      romanTriad: "I",
      romanSeventh: "IM7",
    },
    {
      interval: "2",
      triad: "m",
      seventh: "m7",
      romanTriad: "ii",
      romanSeventh: "iim7",
    },
    {
      interval: "3",
      triad: "m",
      seventh: "m7",
      romanTriad: "iii",
      romanSeventh: "iiim7",
    },
    {
      interval: "4",
      triad: "M",
      seventh: "M7",
      romanTriad: "IV",
      romanSeventh: "IVM7",
    },
    {
      interval: "5",
      triad: "M",
      seventh: "7",
      romanTriad: "V",
      romanSeventh: "V7",
    },
    {
      interval: "6",
      triad: "m",
      seventh: "m7",
      romanTriad: "vi",
      romanSeventh: "vim7",
    },
    {
      interval: "7",
      triad: "°",
      seventh: "ø7",
      romanTriad: "vii°",
      romanSeventh: "viiø7",
    },
  ];

  assertEquals(chords, expectedChords);
});

Deno.test("getDiatonicModeChordDetails - Dorian", () => {
  const chords = getDiatonicModeChordDetails("dorian");

  const expectedChords: ChordDetails[] = [
    {
      interval: "1",
      triad: "m",
      seventh: "m7",
      romanTriad: "i",
      romanSeventh: "im7",
    },
    {
      interval: "2",
      triad: "m",
      seventh: "m7",
      romanTriad: "ii",
      romanSeventh: "iim7",
    },
    {
      interval: "♭3",
      triad: "M",
      seventh: "M7",
      romanTriad: "III",
      romanSeventh: "IIIM7",
    },
    {
      interval: "4",
      triad: "M",
      seventh: "7",
      romanTriad: "IV",
      romanSeventh: "IV7",
    },
    {
      interval: "5",
      triad: "m",
      seventh: "m7",
      romanTriad: "v",
      romanSeventh: "vm7",
    },
    {
      interval: "6",
      triad: "°",
      seventh: "ø7",
      romanTriad: "vi°",
      romanSeventh: "viø7",
    },
    {
      interval: "♭7",
      triad: "M",
      seventh: "M7",
      romanTriad: "VII",
      romanSeventh: "VIIM7",
    },
  ];

  assertEquals(chords, expectedChords);
});

Deno.test("getDiatonicModeChordDetails - Locrian", () => {
  const chords = getDiatonicModeChordDetails("locrian");

  const expectedChords: ChordDetails[] = [
    {
      interval: "1",
      triad: "°",
      seventh: "ø7",
      romanTriad: "i°",
      romanSeventh: "iø7",
    },
    {
      interval: "♭2",
      triad: "M",
      seventh: "M7",
      romanTriad: "II",
      romanSeventh: "IIM7",
    },
    {
      interval: "♭3",
      triad: "m",
      seventh: "m7",
      romanTriad: "iii",
      romanSeventh: "iiim7",
    },
    {
      interval: "4",
      triad: "m",
      seventh: "m7",
      romanTriad: "iv",
      romanSeventh: "ivm7",
    },
    {
      interval: "♭5",
      triad: "M",
      seventh: "M7",
      romanTriad: "V",
      romanSeventh: "VM7",
    },
    {
      interval: "♭6",
      triad: "M",
      seventh: "7",
      romanTriad: "VI",
      romanSeventh: "VI7",
    },
    {
      interval: "♭7",
      triad: "m",
      seventh: "m7",
      romanTriad: "vii",
      romanSeventh: "viim7",
    },
  ];

  assertEquals(chords, expectedChords);
});

Deno.test("getHarmonicMinorModeChordDetails - Harmonic Minor", () => {
  const chords = getHarmonicMinorModeChordDetails("harmonicMinor");

  const expectedChords: ChordDetails[] = [
    {
      interval: "1",
      triad: "m",
      seventh: "m(M7)",
      romanTriad: "i",
      romanSeventh: "iM7",
    },
    {
      interval: "2",
      triad: "°",
      seventh: "ø7",
      romanTriad: "ii°",
      romanSeventh: "iiø7",
    },
    {
      interval: "♭3",
      triad: "+",
      seventh: "+M7",
      romanTriad: "III+",
      romanSeventh: "III+M7",
    },
    {
      interval: "4",
      triad: "m",
      seventh: "m7",
      romanTriad: "iv",
      romanSeventh: "ivm7",
    },
    {
      interval: "5",
      triad: "M",
      seventh: "7",
      romanTriad: "V",
      romanSeventh: "V7",
    },
    {
      interval: "♭6",
      triad: "M",
      seventh: "M7",
      romanTriad: "VI",
      romanSeventh: "VIM7",
    },
    {
      interval: "7",
      triad: "°",
      seventh: "°7",
      romanTriad: "vii°",
      romanSeventh: "vii°7",
    },
  ];

  assertEquals(chords, expectedChords);
});

Deno.test("getHarmonicMinorModeChordDetails - Phrygian Dominant", () => {
  const chords = getHarmonicMinorModeChordDetails("phrygianDominant");

  const expectedChords: ChordDetails[] = [
    {
      interval: "1",
      triad: "M",
      seventh: "7",
      romanTriad: "I",
      romanSeventh: "I7",
    },
    {
      interval: "♭2",
      triad: "M",
      seventh: "M7",
      romanTriad: "II",
      romanSeventh: "IIM7",
    },
    {
      interval: "3",
      triad: "°",
      seventh: "°7",
      romanTriad: "iii°",
      romanSeventh: "iii°7",
    },
    {
      interval: "4",
      triad: "m",
      seventh: "m(M7)",
      romanTriad: "iv",
      romanSeventh: "ivM7",
    },
    {
      interval: "5",
      triad: "°",
      seventh: "ø7",
      romanTriad: "v°",
      romanSeventh: "vø7",
    },
    {
      interval: "♭6",
      triad: "+",
      seventh: "+M7",
      romanTriad: "VI+",
      romanSeventh: "VI+M7",
    },
    {
      interval: "♭7",
      triad: "m",
      seventh: "m7",
      romanTriad: "vii",
      romanSeventh: "viim7",
    },
  ];

  assertEquals(chords, expectedChords);
});

Deno.test("getMelodicMinorModeChordDetails - Melodic Minor", () => {
  const chords = getMelodicMinorModeChordDetails("melodicMinor");

  const expectedChords: ChordDetails[] = [
    {
      interval: "1",
      triad: "m",
      seventh: "m(M7)",
      romanTriad: "i",
      romanSeventh: "iM7",
    },
    {
      interval: "2",
      triad: "m",
      seventh: "m7",
      romanTriad: "ii",
      romanSeventh: "iim7",
    },
    {
      interval: "♭3",
      triad: "+",
      seventh: "+M7",
      romanTriad: "III+",
      romanSeventh: "III+M7",
    },
    {
      interval: "4",
      triad: "M",
      seventh: "7",
      romanTriad: "IV",
      romanSeventh: "IV7",
    },
    {
      interval: "5",
      triad: "M",
      seventh: "7",
      romanTriad: "V",
      romanSeventh: "V7",
    },
    {
      interval: "6",
      triad: "°",
      seventh: "ø7",
      romanTriad: "vi°",
      romanSeventh: "viø7",
    },
    {
      interval: "7",
      triad: "°",
      seventh: "ø7",
      romanTriad: "vii°",
      romanSeventh: "viiø7",
    },
  ];

  assertEquals(chords, expectedChords);
});
