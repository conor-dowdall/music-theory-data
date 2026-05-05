import type { ChordProgressionSet } from "../../types/chord-progressions.d.ts";

const fourBarProgressions: ChordProgressionSet = {
  id: "fourBarProgressions",
  displayName: "4-Bar Progressions",
  description: "Progressions authored as 4-bar cycles.",
  progressionIds: [
    "oneOneFiveFive",
    "oneOneFiveFiveDominant7",
    "oneOneFourFour",
    "oneOneFourFive",
    "oneFourOneFive",
    "dooWop",
    "axisProgression",
    "majorTwoFiveOne",
    "minorTwoFiveOne",
  ],
};

const cadences: ChordProgressionSet = {
  id: "cadences",
  displayName: "Cadences",
  description:
    "Short progressions whose identity comes from harmonic resolution.",
  progressionIds: [
    "majorTwoFiveOne",
    "minorTwoFiveOne",
  ],
};

const twelveBarProgressions: ChordProgressionSet = {
  id: "twelveBarProgressions",
  displayName: "12-Bar Progressions",
  description: "Progressions authored as 12-bar cycles.",
  progressionIds: ["twelveBarBlues"],
};

export const chordProgressionSets = {
  fourBarProgressions,
  cadences,
  twelveBarProgressions,
} as const;
