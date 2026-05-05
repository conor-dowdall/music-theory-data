import type { ChordProgressionForm } from "../../types/chord-progressions.d.ts";

const fourBarLoop: ChordProgressionForm = {
  id: "fourBarLoop",
  primaryName: "4-bar loop",
  aliases: ["Four bar loop"],
  summary:
    "A single-section four-bar cycle commonly used as a short repeating progression.",
  sections: [
    {
      id: "main",
      label: "Main",
      bars: 4,
    },
  ],
};

const twelveBarBlues: ChordProgressionForm = {
  id: "twelveBarBlues",
  primaryName: "12-bar blues form",
  aliases: ["Twelve bar blues form"],
  summary:
    "A 12-bar form usually understood as three four-bar phrases in blues-based music.",
  sections: [
    {
      id: "phrase1",
      label: "Phrase 1",
      bars: 4,
    },
    {
      id: "phrase2",
      label: "Phrase 2",
      bars: 4,
    },
    {
      id: "phrase3",
      label: "Phrase 3",
      bars: 4,
    },
  ],
};

const aaba32: ChordProgressionForm = {
  id: "aaba32",
  primaryName: "32-bar AABA form",
  aliases: ["AABA 32 bar form"],
  summary:
    "A conventional 32-bar song form with three A sections and a contrasting bridge.",
  sections: [
    {
      id: "a1",
      label: "A1",
      bars: 8,
    },
    {
      id: "a2",
      label: "A2",
      bars: 8,
    },
    {
      id: "b",
      label: "B",
      bars: 8,
    },
    {
      id: "a3",
      label: "A3",
      bars: 8,
    },
  ],
};

export const chordProgressionForms = {
  fourBarLoop,
  twelveBarBlues,
  aaba32,
} as const;
