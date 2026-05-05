import type { ChordProgressionForm } from "../../types/chord-progressions.d.ts";

const fourBarLoop: ChordProgressionForm = {
  id: "fourBarLoop",
  primaryName: "Four Bar Loop",
  aliases: ["4 Bar Loop"],
  summary:
    "A single-section four-bar cycle commonly used for repeating practice and songwriting loops.",
  tags: ["loop", "four bar"],
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
  primaryName: "Twelve Bar Blues Form",
  aliases: ["12 Bar Blues Form"],
  summary:
    "A 12-bar form usually understood as three four-bar phrases in blues-based music.",
  tags: ["blues", "twelve bar", "song form"],
  sections: [
    {
      id: "main",
      label: "Main",
      bars: 12,
    },
  ],
};

const aaba32: ChordProgressionForm = {
  id: "aaba32",
  primaryName: "AABA 32 Bar Form",
  aliases: ["32 Bar AABA"],
  summary:
    "A conventional 32-bar song form with three A sections and a contrasting bridge.",
  tags: ["aaba", "thirty two bar", "song form"],
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
