import { assertEquals } from "@std/assert";
import { diatonicModes } from "../src/data/note-sequences/diatonic-modes.ts";
import { harmonicMinorModes } from "../src/note-sequences/harmonic-minor-modes.ts";
import { melodicMinorModes } from "../src/note-sequences/melodic-minor-modes.ts";
import {
  generateDiatonicChords,
  generateHarmonicMinorChords,
  generateMelodicMinorChords,
} from "../src/utils/chord-label-generators.ts";
import type { ScaleIntervalChords } from "../src/types/chord-labels.d.ts";

Deno.test("generateDiatonicChords - Ionian (rotation 0)", () => {
  const ionianIntervals = diatonicModes.ionian.intervals.slice(0, 7);
  const chords = generateDiatonicChords(ionianIntervals, 0);

  const expectedChords: ScaleIntervalChords[] = [
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

Deno.test("generateDiatonicChords - Dorian (rotation 1)", () => {
  const dorianIntervals = diatonicModes.dorian.intervals.slice(0, 7);
  const chords = generateDiatonicChords(dorianIntervals, 1);

  const expectedChords: ScaleIntervalChords[] = [
    {
      interval: "1",
      triad: "m",
      seventh: "m7",
      romanTriad: "ii",
      romanSeventh: "iim7",
    },
    {
      interval: "2",
      triad: "m",
      seventh: "m7",
      romanTriad: "iii",
      romanSeventh: "iiim7",
    },
    {
      interval: "♭3",
      triad: "M",
      seventh: "M7",
      romanTriad: "IV",
      romanSeventh: "IVM7",
    },
    {
      interval: "4",
      triad: "M",
      seventh: "7",
      romanTriad: "V",
      romanSeventh: "V7",
    },
    {
      interval: "5",
      triad: "m",
      seventh: "m7",
      romanTriad: "vi",
      romanSeventh: "vim7",
    },
    {
      interval: "6",
      triad: "°",
      seventh: "ø7",
      romanTriad: "vii°",
      romanSeventh: "viiø7",
    },
    {
      interval: "♭7",
      triad: "M",
      seventh: "M7",
      romanTriad: "I",
      romanSeventh: "IM7",
    },
  ];

  assertEquals(chords, expectedChords);
});

Deno.test("generateDiatonicChords - Locrian (rotation 6)", () => {
  const locrianIntervals = diatonicModes.locrian.intervals.slice(0, 7);
  const chords = generateDiatonicChords(locrianIntervals, 6);

  const expectedChords: ScaleIntervalChords[] = [
    {
      interval: "1",
      triad: "°",
      seventh: "ø7",
      romanTriad: "vii°",
      romanSeventh: "viiø7",
    },
    {
      interval: "♭2",
      triad: "M",
      seventh: "M7",
      romanTriad: "I",
      romanSeventh: "IM7",
    },
    {
      interval: "♭3",
      triad: "m",
      seventh: "m7",
      romanTriad: "ii",
      romanSeventh: "iim7",
    },
    {
      interval: "4",
      triad: "m",
      seventh: "m7",
      romanTriad: "iii",
      romanSeventh: "iiim7",
    },
    {
      interval: "♭5",
      triad: "M",
      seventh: "M7",
      romanTriad: "IV",
      romanSeventh: "IVM7",
    },
    {
      interval: "♭6",
      triad: "M",
      seventh: "7",
      romanTriad: "V",
      romanSeventh: "V7",
    },
    {
      interval: "♭7",
      triad: "m",
      seventh: "m7",
      romanTriad: "vi",
      romanSeventh: "vim7",
    },
  ];

  assertEquals(chords, expectedChords);
});

Deno.test("generateHarmonicMinorChords - Harmonic Minor (rotation 0)", () => {
  const harmonicMinorIntervals = harmonicMinorModes.harmonicMinor.intervals
    .slice(0, 7);
  const chords = generateHarmonicMinorChords(
    harmonicMinorIntervals,
    0,
  );

  const expectedChords: ScaleIntervalChords[] = [
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

Deno.test("generateHarmonicMinorChords - Phrygian Dominant (rotation 4)", () => {
  const phrygianDominantIntervals = harmonicMinorModes.phrygianDominant
    .intervals.slice(0, 7);
  const chords = generateHarmonicMinorChords(
    phrygianDominantIntervals,
    4,
  );

  const expectedChords: ScaleIntervalChords[] = [
    {
      interval: "1",
      triad: "M",
      seventh: "7",
      romanTriad: "V",
      romanSeventh: "V7",
    },
    {
      interval: "♭2",
      triad: "M",
      seventh: "M7",
      romanTriad: "VI",
      romanSeventh: "VIM7",
    },
    {
      interval: "3",
      triad: "°",
      seventh: "°7",
      romanTriad: "vii°",
      romanSeventh: "vii°7",
    },
    {
      interval: "4",
      triad: "m",
      seventh: "m(M7)",
      romanTriad: "i",
      romanSeventh: "iM7",
    },
    {
      interval: "5",
      triad: "°",
      seventh: "ø7",
      romanTriad: "ii°",
      romanSeventh: "iiø7",
    },
    {
      interval: "♭6",
      triad: "+",
      seventh: "+M7",
      romanTriad: "III+",
      romanSeventh: "III+M7",
    },
    {
      interval: "♭7",
      triad: "m",
      seventh: "m7",
      romanTriad: "iv",
      romanSeventh: "ivm7",
    },
  ];

  assertEquals(chords, expectedChords);
});

Deno.test("generateMelodicMinorChords - Melodic Minor (rotation 0)", () => {
  const melodicMinorIntervals = melodicMinorModes.melodicMinor.intervals.slice(
    0,
    7,
  );
  const chords = generateMelodicMinorChords(
    melodicMinorIntervals,
    0,
  );

  const expectedChords: ScaleIntervalChords[] = [
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
