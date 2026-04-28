import type { ChordProgressionTemplate } from "../../types/chord-progressions.d.ts";

const oneFourFive: ChordProgressionTemplate = {
  templateType: "formula",
  category: "basic",
  primaryName: "I IV V",
  names: ["I IV V", "One Four Five", "1 4 5"],
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

const oneFive: ChordProgressionTemplate = {
  templateType: "formula",
  category: "basic",
  primaryName: "I V",
  names: ["I V", "One Five", "1 5"],
  type: ["basic", "formula", "major key", "two chord", "beginner"],
  characteristics: [
    "simple",
    "foundational",
    "common",
    "beginner friendly",
    "tonic dominant",
  ],
  sections: [
    {
      name: "Main",
      chords: [
        { interval: "1", quality: "M" },
        { interval: "5", quality: "M" },
      ],
    },
  ],
};

const oneFour: ChordProgressionTemplate = {
  templateType: "formula",
  category: "basic",
  primaryName: "I IV",
  names: ["I IV", "One Four", "1 4"],
  type: ["basic", "formula", "major key", "two chord", "beginner"],
  characteristics: [
    "simple",
    "foundational",
    "common",
    "beginner friendly",
    "tonic subdominant",
  ],
  sections: [
    {
      name: "Main",
      chords: [
        { interval: "1", quality: "M" },
        { interval: "4", quality: "M" },
      ],
    },
  ],
};

const oneOneFiveFive: ChordProgressionTemplate = {
  templateType: "loop",
  category: "basic",
  primaryName: "I I V V",
  names: ["I I V V", "One One Five Five", "1 1 5 5", "Tonic Dominant Loop"],
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
  primaryName: "I I V V7",
  names: [
    "I I V V7",
    "One One Five Five-Seven",
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

const oneFourOneFive: ChordProgressionTemplate = {
  templateType: "loop",
  category: "basic",
  primaryName: "I IV I V",
  names: ["I IV I V", "One Four One Five", "1 4 1 5"],
  type: ["basic", "loop", "major key", "three chord", "beginner"],
  characteristics: [
    "simple",
    "playable",
    "balanced",
    "beginner friendly",
    "practice loop",
  ],
  sections: [
    {
      name: "Main",
      chords: [
        { interval: "1", quality: "M" },
        { interval: "4", quality: "M" },
        { interval: "1", quality: "M" },
        { interval: "5", quality: "M" },
      ],
    },
  ],
};

export const basicChordProgressionTemplates = {
  oneFourFive,
  oneFive,
  oneFour,
  oneOneFiveFive,
  oneOneFiveFiveSeven,
  oneFourOneFive,
} as const;
