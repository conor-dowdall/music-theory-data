import type { ChordProgressionTemplate } from "../../types/chord-progressions.d.ts";

const oneFourFive: ChordProgressionTemplate = {
  templateType: "formula",
  category: "basic",
  primaryName: "One Four Five",
  names: ["One Four Five", "1 4 5", "1-4-5", "I IV V", "I-IV-V"],
  type: ["basic", "formula", "major key", "three chord", "beginner"],
  characteristics: [
    "simple",
    "foundational",
    "common",
    "beginner friendly",
    "tonic subdominant dominant",
  ],
  sections: [
    {
      name: "Main",
      chords: [
        { interval: "1", quality: "M" },
        { interval: "4", quality: "M" },
        { interval: "5", quality: "M" },
      ],
    },
  ],
};

const oneOneFiveFive: ChordProgressionTemplate = {
  templateType: "loop",
  category: "basic",
  primaryName: "One One Five Five",
  names: ["One One Five Five", "I I V V", "1 1 5 5", "Tonic Dominant Loop"],
  type: ["basic", "loop", "major key", "tonic dominant", "beginner"],
  characteristics: [
    "simple",
    "playable",
    "stable",
    "beginner friendly",
    "practice loop",
  ],
  sections: [
    {
      name: "Main",
      chords: [
        { interval: "1", quality: "M" },
        { interval: "1", quality: "M" },
        { interval: "5", quality: "M" },
        { interval: "5", quality: "M" },
      ],
    },
  ],
};

const oneOneFiveFiveSeven: ChordProgressionTemplate = {
  templateType: "loop",
  category: "basic",
  primaryName: "One One Five Five Seven",
  names: [
    "One One Five Five Seven",
    "I I V V7",
    "1 1 5 57",
    "Tonic Dominant Seventh Loop",
  ],
  type: [
    "basic",
    "loop",
    "major key",
    "tonic dominant",
    "turnaround",
    "beginner",
  ],
  characteristics: [
    "simple",
    "playable",
    "resolving",
    "beginner friendly",
    "practice loop",
  ],
  sections: [
    {
      name: "Main",
      chords: [
        { interval: "1", quality: "M" },
        { interval: "1", quality: "M" },
        { interval: "5", quality: "M" },
        { interval: "5", quality: "7" },
      ],
    },
  ],
};

export const basicChordProgressionTemplates = {
  oneFourFive,
  oneOneFiveFive,
  oneOneFiveFiveSeven,
} as const;
