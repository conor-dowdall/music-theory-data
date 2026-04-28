import type { ChordProgressionTemplate } from "../../types/chord-progressions.d.ts";

const twoFiveOneMajor: ChordProgressionTemplate = {
  templateType: "formula",
  category: "jazz",
  primaryName: "iim7 V7 IM7",
  names: [
    "iim7 V7 IM7",
    "ii V I",
    "Two Five One",
    "Major Two Five One",
    "2 5 1",
  ],
  type: ["jazz", "formula", "major key", "cadence", "seventh chords"],
  characteristics: ["functional", "resolving", "foundational", "jazz"],
  sections: [
    {
      name: "Main",
      chords: [
        { interval: "2", quality: "m7" },
        { interval: "5", quality: "7" },
        { interval: "1", quality: "M7" },
      ],
    },
  ],
};

const minorTwoFiveOne: ChordProgressionTemplate = {
  templateType: "formula",
  category: "jazz",
  primaryName: "iiø7 V7 i",
  names: ["iiø7 V7 i", "iiø V i", "Minor Two Five One", "2 5 1 minor"],
  type: ["jazz", "formula", "minor key", "cadence", "seventh chords"],
  characteristics: ["functional", "minor", "resolving", "jazz"],
  sections: [
    {
      name: "Main",
      chords: [
        { interval: "2", quality: "ø7" },
        { interval: "5", quality: "7" },
        { interval: "1", quality: "m" },
      ],
    },
  ],
};

const rhythmChanges: ChordProgressionTemplate = {
  templateType: "form",
  category: "jazz",
  primaryName: "Rhythm Changes",
  names: ["Rhythm Changes", "AABA Rhythm Changes", "Rhythm Changes Form"],
  type: ["jazz", "form", "major key", "turnaround", "AABA"],
  characteristics: [
    "cyclical",
    "functional",
    "jazz",
    "standard",
    "song form",
  ],
  sections: [
    {
      name: "A1",
      chords: [
        { interval: "1", quality: "M7" },
        { interval: "6", quality: "m7" },
        { interval: "2", quality: "m7" },
        { interval: "5", quality: "7" },
        { interval: "3", quality: "m7" },
        { interval: "6", quality: "7" },
        { interval: "2", quality: "m7" },
        { interval: "5", quality: "7" },
      ],
    },
    {
      name: "A2",
      chords: [
        { interval: "1", quality: "M7" },
        { interval: "6", quality: "m7" },
        { interval: "2", quality: "m7" },
        { interval: "5", quality: "7" },
        { interval: "3", quality: "m7" },
        { interval: "6", quality: "7" },
        { interval: "2", quality: "m7" },
        { interval: "5", quality: "7" },
      ],
    },
    {
      name: "B",
      chords: [
        { interval: "3", quality: "7" },
        { interval: "3", quality: "7" },
        { interval: "6", quality: "7" },
        { interval: "6", quality: "7" },
        { interval: "2", quality: "7" },
        { interval: "2", quality: "7" },
        { interval: "5", quality: "7" },
        { interval: "5", quality: "7" },
      ],
    },
    {
      name: "A3",
      chords: [
        { interval: "1", quality: "M7" },
        { interval: "6", quality: "m7" },
        { interval: "2", quality: "m7" },
        { interval: "5", quality: "7" },
        { interval: "3", quality: "m7" },
        { interval: "6", quality: "7" },
        { interval: "2", quality: "m7" },
        { interval: "5", quality: "7" },
      ],
    },
  ],
};

const jazzBluesBasic: ChordProgressionTemplate = {
  templateType: "form",
  category: "jazz",
  primaryName: "Jazz Blues Basic",
  names: ["Jazz Blues Basic", "Jazz Blues"],
  type: ["jazz", "blues", "form", "dominant seventh", "turnaround"],
  characteristics: ["functional", "blues", "jazz", "cyclical"],
  sections: [
    {
      name: "Main",
      chords: [
        { interval: "1", quality: "7" },
        { interval: "4", quality: "7" },
        { interval: "1", quality: "7" },
        { interval: "1", quality: "7" },
        { interval: "4", quality: "7" },
        { interval: "♯4", quality: "°7" },
        { interval: "1", quality: "7" },
        { interval: "6", quality: "7" },
        { interval: "2", quality: "m7" },
        { interval: "5", quality: "7" },
        { interval: "1", quality: "7" },
        { interval: "5", quality: "7" },
      ],
    },
  ],
};

export const jazzChordProgressionTemplates = {
  twoFiveOneMajor,
  minorTwoFiveOne,
  rhythmChanges,
  jazzBluesBasic,
} as const;
