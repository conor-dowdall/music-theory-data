import type {
  ChordProgressionCuratedCollection,
} from "../../types/chord-progressions.d.ts";

const beginnerFoundations: ChordProgressionCuratedCollection = {
  id: "beginnerFoundations",
  displayName: "Beginner Foundations",
  description:
    "A compact starter pack of four-bar loops that introduce home, away, and three-chord movement without awkward micro-phrases.",
  tags: ["starter", "beginner", "reference"],
  realizationIds: [
    "tonicDominantLoopBasic",
    "oneFourLiftLoopBasic",
    "oneFourFiveStarterLoop",
    "oneFourOneFiveLoopBasic",
    "dooWopLoopBasic",
  ],
};

const firstPlayableLoops: ChordProgressionCuratedCollection = {
  id: "firstPlayableLoops",
  displayName: "First Playable Loops",
  description:
    "Short repeating progressions that are especially practical for fretboard or keyboard workspace practice.",
  tags: ["practice", "loop", "beginner"],
  realizationIds: [
    "tonicDominantLoopBasic",
    "tonicDominantLoopWithV7",
    "oneFourLiftLoopBasic",
    "oneFourFiveStarterLoop",
    "oneFourOneFiveLoopBasic",
    "dooWopLoopBasic",
    "axisLoopBasic",
  ],
};

const songwriterCoreLoops: ChordProgressionCuratedCollection = {
  id: "songwriterCoreLoops",
  displayName: "Songwriter Core Loops",
  description:
    "A compact set of familiar loops that cover a lot of beginner-friendly songwriting territory.",
  tags: ["songwriting", "loop", "pop-rock"],
  realizationIds: [
    "oneFourOneFiveLoopBasic",
    "dooWopLoopBasic",
    "axisLoopBasic",
  ],
};

const bluesFoundations: ChordProgressionCuratedCollection = {
  id: "bluesFoundations",
  displayName: "Blues Foundations",
  description:
    "Core 12-bar realizations that move from straight-ahead blues into a light jazz-blues vocabulary.",
  tags: ["blues", "form", "practice"],
  realizationIds: [
    "twelveBarBluesBasic",
    "twelveBarBluesQuickChange",
    "jazzBluesBasic",
  ],
};

const jazzCadenceStarter: ChordProgressionCuratedCollection = {
  id: "jazzCadenceStarter",
  displayName: "Jazz Cadence Starter",
  description:
    "A focused set for learning functional jazz harmony before stepping into longer song forms.",
  tags: ["jazz", "cadence", "ear-training"],
  realizationIds: [
    "majorTwoFiveOneBasic",
    "minorTwoFiveOneBasic",
    "rhythmChangesBasicAaba",
  ],
};

const structuredForms: ChordProgressionCuratedCollection = {
  id: "structuredForms",
  displayName: "Structured Forms",
  description:
    "Longer progressions that matter more as complete forms than as short reusable chord loops.",
  tags: ["form", "reference", "practice"],
  realizationIds: [
    "twelveBarBluesBasic",
    "twelveBarBluesQuickChange",
    "rhythmChangesBasicAaba",
    "jazzBluesBasic",
  ],
};

export const curatedChordProgressionCollections = {
  beginnerFoundations,
  firstPlayableLoops,
  songwriterCoreLoops,
  bluesFoundations,
  jazzCadenceStarter,
  structuredForms,
} as const;
