import type { ChordProgressionTemplate } from "../../types/chord-progressions.d.ts";

const dooWop: ChordProgressionTemplate = {
  templateType: "loop",
  category: "pop",
  primaryName: "I vi IV V",
  names: ["I vi IV V", "Doo Wop", "1 6 4 5", "50s Progression"],
  type: ["pop", "loop", "major key", "songwriting", "beginner"],
  characteristics: ["nostalgic", "stable", "songwriting", "common"],
  sections: [
    {
      name: "Main",
      chords: [
        { interval: "1", quality: "M", noteCollectionKey: "major" },
        { interval: "6", quality: "m", noteCollectionKey: "minor" },
        { interval: "4", quality: "M", noteCollectionKey: "major" },
        { interval: "5", quality: "M", noteCollectionKey: "major" },
      ],
    },
  ],
};

const axisProgression: ChordProgressionTemplate = {
  templateType: "loop",
  category: "pop",
  primaryName: "I V vi IV",
  names: ["I V vi IV", "Axis Progression", "1 5 6 4", "Pop Punk Progression"],
  type: ["pop", "loop", "major key", "songwriting", "beginner"],
  characteristics: ["anthemic", "common", "songwriting", "stable"],
  sections: [
    {
      name: "Main",
      chords: [
        { interval: "1", quality: "M", noteCollectionKey: "major" },
        { interval: "5", quality: "M", noteCollectionKey: "major" },
        { interval: "6", quality: "m", noteCollectionKey: "minor" },
        { interval: "4", quality: "M", noteCollectionKey: "major" },
      ],
    },
  ],
};

export const popChordProgressionTemplates = {
  dooWop,
  axisProgression,
} as const;
