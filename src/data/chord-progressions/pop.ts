import type { ChordProgressionTemplate } from "../../types/chord-progressions.d.ts";

const dooWop: ChordProgressionTemplate = {
  templateType: "loop",
  category: "pop",
  primaryName: "Doo Wop",
  names: ["Doo Wop", "I vi IV V", "1 6 4 5", "50s Progression"],
  type: ["pop", "loop", "major key", "songwriting", "beginner"],
  characteristics: ["nostalgic", "stable", "songwriting", "common"],
  sections: [
    {
      name: "Main",
      chords: [
        { interval: "1", quality: "M" },
        { interval: "6", quality: "m" },
        { interval: "4", quality: "M" },
        { interval: "5", quality: "M" },
      ],
    },
  ],
};

const axisProgression: ChordProgressionTemplate = {
  templateType: "loop",
  category: "pop",
  primaryName: "Axis Progression",
  names: ["Axis Progression", "I V vi IV", "1 5 6 4", "Pop Punk Progression"],
  type: ["pop", "loop", "major key", "songwriting", "beginner"],
  characteristics: ["anthemic", "common", "songwriting", "stable"],
  sections: [
    {
      name: "Main",
      chords: [
        { interval: "1", quality: "M" },
        { interval: "5", quality: "M" },
        { interval: "6", quality: "m" },
        { interval: "4", quality: "M" },
      ],
    },
  ],
};

export const popChordProgressionTemplates = {
  dooWop,
  axisProgression,
} as const;
