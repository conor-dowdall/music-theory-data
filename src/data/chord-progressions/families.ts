import type {
  ChordProgressionDegreeShape,
  ChordProgressionFamily,
} from "../../types/chord-progressions.d.ts";

function step(
  degree: ChordProgressionDegreeShape["degree"],
  quality: ChordProgressionDegreeShape["quality"],
  harmonicFunction?: string,
): ChordProgressionDegreeShape {
  return {
    degree,
    quality,
    harmonicFunction,
  };
}

const oneFiveMajor: ChordProgressionFamily = {
  id: "oneFiveMajor",
  primaryName: "I-V foundation",
  aliases: ["I V", "1 5"],
  summary:
    "A stripped-back tonic-to-dominant family that underpins many beginner loops and cadence drills.",
  formula: [
    step("1", "M", "tonic"),
    step("5", "M", "dominant"),
  ],
  tags: ["foundation", "two chord", "major key"],
  idioms: ["common-practice", "pop-rock"],
  tonalContext: "major",
  pedagogyLevel: "beginner",
  usages: ["practice", "reference", "ear-training"],
};

const oneFourMajor: ChordProgressionFamily = {
  id: "oneFourMajor",
  primaryName: "I-IV foundation",
  aliases: ["I IV", "1 4"],
  summary:
    "A simple tonic-to-subdominant family that teaches the first strong lift away from home.",
  formula: [
    step("1", "M", "tonic"),
    step("4", "M", "subdominant"),
  ],
  tags: ["foundation", "two chord", "major key"],
  idioms: ["common-practice", "pop-rock"],
  tonalContext: "major",
  pedagogyLevel: "beginner",
  usages: ["practice", "reference", "ear-training"],
};

const oneFourFiveMajor: ChordProgressionFamily = {
  id: "oneFourFiveMajor",
  primaryName: "I-IV-V foundation",
  aliases: ["I IV V", "1 4 5"],
  summary:
    "The foundational three-chord major-key family behind a huge amount of Western popular music.",
  formula: [
    step("1", "M", "tonic"),
    step("4", "M", "subdominant"),
    step("5", "M", "dominant"),
  ],
  tags: ["foundation", "three chord", "major key"],
  idioms: ["common-practice", "pop-rock"],
  tonalContext: "major",
  pedagogyLevel: "beginner",
  usages: ["practice", "reference", "ear-training", "songwriting"],
};

const oneFourOneFiveLoop: ChordProgressionFamily = {
  id: "oneFourOneFiveLoop",
  primaryName: "I-IV-I-V loop family",
  aliases: ["I IV I V", "1 4 1 5"],
  summary:
    "A balanced four-bar loop that returns to tonic before setting up the dominant.",
  formula: [
    step("1", "M", "tonic"),
    step("4", "M", "subdominant"),
    step("1", "M", "tonic"),
    step("5", "M", "dominant"),
  ],
  tags: ["foundation", "loop", "four bar", "major key"],
  idioms: ["common-practice", "pop-rock"],
  tonalContext: "major",
  pedagogyLevel: "beginner",
  usages: ["practice", "reference", "songwriting"],
};

const dooWop: ChordProgressionFamily = {
  id: "dooWop",
  primaryName: "Doo-wop progression",
  aliases: ["I vi IV V", "50s progression", "1 6 4 5"],
  summary:
    "A classic four-chord pop loop with a nostalgic arc through the relative minor.",
  formula: [
    step("1", "M", "tonic"),
    step("6", "m", "relative minor"),
    step("4", "M", "subdominant"),
    step("5", "M", "dominant"),
  ],
  tags: ["loop", "major key", "classic pop"],
  idioms: ["pop-rock"],
  tonalContext: "major",
  pedagogyLevel: "beginner",
  usages: ["practice", "songwriting", "reference"],
};

const axisProgression: ChordProgressionFamily = {
  id: "axisProgression",
  primaryName: "Axis progression",
  aliases: ["I V vi IV", "Pop-punk progression", "1 5 6 4"],
  summary:
    "A modern pop and rock loop that stays extremely approachable for beginner players.",
  formula: [
    step("1", "M", "tonic"),
    step("5", "M", "dominant"),
    step("6", "m", "relative minor"),
    step("4", "M", "subdominant"),
  ],
  tags: ["loop", "major key", "modern pop"],
  idioms: ["pop-rock"],
  tonalContext: "major",
  pedagogyLevel: "beginner",
  usages: ["practice", "songwriting", "reference"],
};

const majorTwoFiveOne: ChordProgressionFamily = {
  id: "majorTwoFiveOne",
  primaryName: "Major ii-V-I cadence",
  aliases: ["ii V I", "iim7 V7 IM7", "2 5 1"],
  summary:
    "The essential major-key jazz cadence and a central functional harmony reference.",
  formula: [
    step("2", "m7", "predominant"),
    step("5", "7", "dominant"),
    step("1", "M7", "tonic"),
  ],
  tags: ["cadence", "seventh chords", "major key"],
  idioms: ["jazz"],
  tonalContext: "major",
  pedagogyLevel: "early-intermediate",
  usages: ["practice", "reference", "ear-training"],
};

const minorTwoFiveOne: ChordProgressionFamily = {
  id: "minorTwoFiveOne",
  primaryName: "Minor ii-V-i cadence",
  aliases: ["iiø V i", "iiø7 V7 i", "2 5 1 minor"],
  summary:
    "The core minor-key jazz cadence built from a half-diminished ii chord and dominant resolution.",
  formula: [
    step("2", "ø7", "predominant"),
    step("5", "7", "dominant"),
    step("1", "m", "tonic"),
  ],
  tags: ["cadence", "seventh chords", "minor key"],
  idioms: ["jazz"],
  tonalContext: "minor",
  pedagogyLevel: "early-intermediate",
  usages: ["practice", "reference", "ear-training"],
};

const twelveBarBlues: ChordProgressionFamily = {
  id: "twelveBarBlues",
  primaryName: "12-bar blues",
  aliases: ["Twelve Bar Blues", "I7 IV7 V7 blues"],
  summary:
    "The foundational 12-bar dominant-blues harmonic cycle used across countless blues and rock performances.",
  formula: [
    step("1", "7", "tonic"),
    step("1", "7", "tonic"),
    step("1", "7", "tonic"),
    step("1", "7", "tonic"),
    step("4", "7", "subdominant"),
    step("4", "7", "subdominant"),
    step("1", "7", "tonic"),
    step("1", "7", "tonic"),
    step("5", "7", "dominant"),
    step("4", "7", "subdominant"),
    step("1", "7", "tonic"),
    step("5", "7", "turnaround"),
  ],
  tags: ["blues", "twelve bar", "dominant seventh"],
  idioms: ["blues", "pop-rock"],
  tonalContext: "dominant-blues",
  pedagogyLevel: "beginner",
  usages: ["practice", "reference", "ear-training"],
};

const rhythmChanges: ChordProgressionFamily = {
  id: "rhythmChanges",
  primaryName: "Rhythm changes",
  aliases: ["AABA rhythm changes", "Rhythm changes form"],
  summary:
    "A standard 32-bar jazz song family built from turnaround language and a dominant bridge.",
  formula: [
    step("1", "M7", "tonic"),
    step("6", "m7", "prolongation"),
    step("2", "m7", "predominant"),
    step("5", "7", "dominant"),
    step("3", "m7", "passing"),
    step("6", "7", "secondary dominant"),
    step("2", "m7", "predominant"),
    step("5", "7", "dominant"),
    step("3", "7", "secondary dominant"),
    step("6", "7", "secondary dominant"),
    step("2", "7", "secondary dominant"),
    step("5", "7", "dominant"),
  ],
  tags: ["jazz standard", "aaba", "turnaround"],
  idioms: ["jazz"],
  tonalContext: "major",
  pedagogyLevel: "intermediate",
  usages: ["practice", "reference", "ear-training"],
};

const jazzBlues: ChordProgressionFamily = {
  id: "jazzBlues",
  primaryName: "Jazz blues",
  aliases: ["Jazz blues basic"],
  summary:
    "A blues family that adds classic jazz color tones and a ii-V turnaround to the 12-bar frame.",
  formula: [
    step("1", "7", "tonic"),
    step("4", "7", "subdominant"),
    step("1", "7", "tonic"),
    step("♯4", "°7", "passing"),
    step("6", "7", "secondary dominant"),
    step("2", "m7", "predominant"),
    step("5", "7", "dominant"),
  ],
  tags: ["blues", "jazz", "turnaround"],
  idioms: ["jazz", "blues"],
  tonalContext: "mixed",
  pedagogyLevel: "early-intermediate",
  usages: ["practice", "reference", "ear-training"],
};

export const chordProgressionFamilies = {
  oneFiveMajor,
  oneFourMajor,
  oneFourFiveMajor,
  oneFourOneFiveLoop,
  dooWop,
  axisProgression,
  majorTwoFiveOne,
  minorTwoFiveOne,
  twelveBarBlues,
  rhythmChanges,
  jazzBlues,
} as const;
