import type { ChordProgressionSet } from "../../types/chord-progressions.d.ts";

const foundations: ChordProgressionSet = {
  id: "foundations",
  displayName: "Foundations",
  description:
    "A compact set of foundational major-key loops built from I, IV, and V.",
  progressionIds: [
    "oneOneFiveFive",
    "oneOneFourFour",
    "oneOneFourFive",
    "oneFourOneFive",
  ],
};

const commonLoops: ChordProgressionSet = {
  id: "commonLoops",
  displayName: "Common Loops",
  description:
    "Short repeating progressions that show up frequently in beginner-friendly tonal music.",
  progressionIds: [
    "oneOneFiveFive",
    "oneOneFiveV7",
    "oneOneFourFour",
    "oneOneFourFive",
    "oneFourOneFive",
    "dooWop",
    "axisProgression",
  ],
};

const songwritingLoops: ChordProgressionSet = {
  id: "songwritingLoops",
  displayName: "Songwriting Loops",
  description:
    "Common four-bar pop and rock progressions that are widely reused in songwriting.",
  progressionIds: [
    "oneFourOneFive",
    "dooWop",
    "axisProgression",
  ],
};

const bluesForms: ChordProgressionSet = {
  id: "bluesForms",
  displayName: "Blues Forms",
  description:
    "Core blues progressions ranging from the standard 12-bar cycle to a jazz-blues variant.",
  progressionIds: [
    "twelveBarBlues",
    "twelveBarBluesQuickChange",
    "jazzBlues",
  ],
};

const jazzHarmony: ChordProgressionSet = {
  id: "jazzHarmony",
  displayName: "Jazz Harmony",
  description:
    "Core jazz cadential and form-based progressions, from ii-V-I to rhythm changes.",
  progressionIds: [
    "majorTwoFiveOne",
    "minorTwoFiveOne",
    "rhythmChanges",
    "jazzBlues",
  ],
};

const structuredForms: ChordProgressionSet = {
  id: "structuredForms",
  displayName: "Structured Forms",
  description:
    "Longer progressions whose identity depends strongly on a named form.",
  progressionIds: [
    "twelveBarBlues",
    "twelveBarBluesQuickChange",
    "rhythmChanges",
    "jazzBlues",
  ],
};

export const chordProgressionSets = {
  foundations,
  commonLoops,
  songwritingLoops,
  bluesForms,
  jazzHarmony,
  structuredForms,
} as const;
