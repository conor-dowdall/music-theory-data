import type { ChordProgressionTemplate } from "../../types/chord-progressions.d.ts";

const twelveBarBlues: ChordProgressionTemplate = {
  templateType: "form",
  category: "blues",
  primaryName: "Twelve Bar Blues",
  names: ["Twelve Bar Blues", "12 Bar Blues", "I7 IV7 V7 Blues"],
  type: ["blues", "form", "dominant seventh", "twelve bar", "beginner"],
  characteristics: ["foundational", "cyclical", "common", "blues"],
  sections: [
    {
      name: "Main",
      chords: [
        { interval: "1", quality: "7", noteCollectionKey: "dominant7" },
        { interval: "1", quality: "7", noteCollectionKey: "dominant7" },
        { interval: "1", quality: "7", noteCollectionKey: "dominant7" },
        { interval: "1", quality: "7", noteCollectionKey: "dominant7" },
        { interval: "4", quality: "7", noteCollectionKey: "dominant7" },
        { interval: "4", quality: "7", noteCollectionKey: "dominant7" },
        { interval: "1", quality: "7", noteCollectionKey: "dominant7" },
        { interval: "1", quality: "7", noteCollectionKey: "dominant7" },
        { interval: "5", quality: "7", noteCollectionKey: "dominant7" },
        { interval: "4", quality: "7", noteCollectionKey: "dominant7" },
        { interval: "1", quality: "7", noteCollectionKey: "dominant7" },
        { interval: "5", quality: "7", noteCollectionKey: "dominant7" },
      ],
    },
  ],
};

export const bluesChordProgressionTemplates = {
  twelveBarBlues,
} as const;
