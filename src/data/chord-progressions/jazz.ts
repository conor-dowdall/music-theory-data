import type { ChordProgressionTemplate } from "../../types/chord-progressions.d.ts";

const twoFiveOneMajor: ChordProgressionTemplate = {
  templateType: "formula",
  category: "jazz",
  primaryName: "Two Five One Major",
  names: ["Two Five One Major", "ii V I", "2 5 1", "2m7 57 1M7"],
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
  primaryName: "Minor Two Five One",
  names: ["Minor Two Five One", "iiø V i", "2ø7 57 1m", "Minor ii V i"],
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

const rhythmChangesASection: ChordProgressionTemplate = {
  templateType: "form",
  category: "jazz",
  primaryName: "Rhythm Changes A Section",
  names: ["Rhythm Changes A Section", "Rhythm A", "I vi ii V"],
  type: ["jazz", "form", "major key", "turnaround", "A section"],
  characteristics: ["cyclical", "functional", "jazz", "standard"],
  sections: [
    {
      name: "A",
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

const rhythmChangesBSection: ChordProgressionTemplate = {
  templateType: "form",
  category: "jazz",
  primaryName: "Rhythm Changes B Section",
  names: [
    "Rhythm Changes B Section",
    "Rhythm Bridge",
    "III7 VI7 II7 V7",
    "3 6 2 5",
  ],
  type: ["jazz", "form", "bridge", "dominant cycle", "B section"],
  characteristics: [
    "functional",
    "circle of fifths",
    "secondary dominants",
    "jazz",
    "standard",
  ],
  sections: [
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
  ],
};

const jazzBluesBasic: ChordProgressionTemplate = {
  templateType: "form",
  category: "jazz",
  primaryName: "Jazz Blues Basic",
  names: ["Jazz Blues Basic", "Jazz Blues", "Basic Jazz Blues"],
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
  rhythmChangesASection,
  rhythmChangesBSection,
  jazzBluesBasic,
} as const;
