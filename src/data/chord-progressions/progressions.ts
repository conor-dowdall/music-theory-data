import type {
  ChordProgression,
  ChordProgressionHarmonySpan,
} from "../../types/chord-progressions.d.ts";

function span(
  degree: ChordProgressionHarmonySpan["degree"],
  quality: ChordProgressionHarmonySpan["quality"],
  bars: number,
  harmonicFunction?: string,
  cue?: string,
): ChordProgressionHarmonySpan {
  return {
    degree,
    quality,
    bars,
    harmonicFunction,
    cue,
  };
}

const oneOneFiveFive: ChordProgression = {
  id: "oneOneFiveFive",
  formId: "fourBarLoop",
  primaryName: "I-I-V-V",
  aliases: ["1 1 5 5"],
  summary: "A four-bar loop with two bars on I followed by two bars on V.",
  idioms: ["common-practice", "pop-rock"],
  tonalContext: "major",
  spans: [
    span("1", "M", 2, "tonic"),
    span("5", "M", 2, "dominant"),
  ],
};

const oneOneFiveV7: ChordProgression = {
  id: "oneOneFiveV7",
  formId: "fourBarLoop",
  primaryName: "I-I-V-V7",
  aliases: ["1 1 5 5 with V7"],
  summary:
    "A four-bar tonic-dominant loop that adds a dominant seventh in the last bar.",
  idioms: ["common-practice", "pop-rock"],
  tonalContext: "major",
  spans: [
    span("1", "M", 2, "tonic"),
    span("5", "M", 1, "dominant"),
    span("5", "7", 1, "dominant", "turnaround"),
  ],
};

const oneOneFourFour: ChordProgression = {
  id: "oneOneFourFour",
  formId: "fourBarLoop",
  primaryName: "I-I-IV-IV",
  aliases: ["1 1 4 4"],
  summary: "A four-bar loop with two bars on I followed by two bars on IV.",
  idioms: ["common-practice", "pop-rock"],
  tonalContext: "major",
  spans: [
    span("1", "M", 2, "tonic"),
    span("4", "M", 2, "subdominant"),
  ],
};

const oneOneFourFive: ChordProgression = {
  id: "oneOneFourFive",
  formId: "fourBarLoop",
  primaryName: "I-I-IV-V",
  aliases: ["1 1 4 5"],
  summary:
    "A four-bar I-IV-V loop that lets the tonic settle before moving through IV to V.",
  idioms: ["common-practice", "pop-rock"],
  tonalContext: "major",
  spans: [
    span("1", "M", 2, "tonic"),
    span("4", "M", 1, "subdominant"),
    span("5", "M", 1, "dominant"),
  ],
};

const oneFourOneFive: ChordProgression = {
  id: "oneFourOneFive",
  formId: "fourBarLoop",
  primaryName: "I-IV-I-V",
  aliases: ["1 4 1 5"],
  summary: "A balanced four-bar loop that returns to I before ending on V.",
  idioms: ["common-practice", "pop-rock"],
  tonalContext: "major",
  spans: [
    span("1", "M", 1, "tonic"),
    span("4", "M", 1, "subdominant"),
    span("1", "M", 1, "tonic"),
    span("5", "M", 1, "dominant"),
  ],
};

const dooWop: ChordProgression = {
  id: "dooWop",
  formId: "fourBarLoop",
  primaryName: "Doo-wop progression",
  aliases: ["I vi IV V", "50s progression", "1 6 4 5"],
  summary:
    "A classic four-chord pop progression that moves from I through vi, IV, and V.",
  idioms: ["pop-rock"],
  tonalContext: "major",
  spans: [
    span("1", "M", 1, "tonic"),
    span("6", "m", 1, "relative minor"),
    span("4", "M", 1, "subdominant"),
    span("5", "M", 1, "dominant"),
  ],
};

const axisProgression: ChordProgression = {
  id: "axisProgression",
  formId: "fourBarLoop",
  primaryName: "Axis progression",
  aliases: ["I V vi IV", "Pop-punk progression", "1 5 6 4"],
  summary:
    "A widely used modern pop and rock progression built from I, V, vi, and IV.",
  idioms: ["pop-rock"],
  tonalContext: "major",
  spans: [
    span("1", "M", 1, "tonic"),
    span("5", "M", 1, "dominant"),
    span("6", "m", 1, "relative minor"),
    span("4", "M", 1, "subdominant"),
  ],
};

const majorTwoFiveOne: ChordProgression = {
  id: "majorTwoFiveOne",
  formId: "fourBarLoop",
  primaryName: "Major ii-V-I",
  aliases: ["ii V I", "iim7 V7 IM7", "2 5 1"],
  summary: "A four-bar major-key cadence with a two-bar tonic resolution.",
  idioms: ["jazz"],
  tonalContext: "major",
  spans: [
    span("2", "m7", 1, "predominant"),
    span("5", "7", 1, "dominant"),
    span("1", "M7", 2, "tonic"),
  ],
};

const minorTwoFiveOne: ChordProgression = {
  id: "minorTwoFiveOne",
  formId: "fourBarLoop",
  primaryName: "Minor ii-V-i",
  aliases: ["iiø V i", "iiø7 V7 i", "2 5 1 minor"],
  summary: "A four-bar minor-key cadence with a two-bar tonic resolution.",
  idioms: ["jazz"],
  tonalContext: "minor",
  spans: [
    span("2", "ø7", 1, "predominant"),
    span("5", "7", 1, "dominant"),
    span("1", "m", 2, "tonic"),
  ],
};

const twelveBarBlues: ChordProgression = {
  id: "twelveBarBlues",
  formId: "twelveBarBlues",
  primaryName: "12-bar blues",
  aliases: ["Twelve bar blues", "I7 IV7 V7 blues"],
  summary:
    "The standard 12-bar blues with the tonic held through the opening phrase.",
  idioms: ["blues", "pop-rock"],
  tonalContext: "dominant-blues",
  spans: [
    span("1", "7", 4, "tonic"),
    span("4", "7", 2, "subdominant"),
    span("1", "7", 2, "tonic"),
    span("5", "7", 1, "dominant"),
    span("4", "7", 1, "subdominant"),
    span("1", "7", 1, "tonic"),
    span("5", "7", 1, "turnaround"),
  ],
};

const twelveBarBluesQuickChange: ChordProgression = {
  id: "twelveBarBluesQuickChange",
  formId: "twelveBarBlues",
  primaryName: "12-bar blues quick change",
  aliases: ["Quick-change blues"],
  summary: "A common 12-bar blues variant that moves to IV in the second bar.",
  idioms: ["blues", "pop-rock"],
  tonalContext: "dominant-blues",
  spans: [
    span("1", "7", 1, "tonic"),
    span("4", "7", 1, "subdominant"),
    span("1", "7", 2, "tonic"),
    span("4", "7", 2, "subdominant"),
    span("1", "7", 2, "tonic"),
    span("5", "7", 1, "dominant"),
    span("4", "7", 1, "subdominant"),
    span("1", "7", 1, "tonic"),
    span("5", "7", 1, "turnaround"),
  ],
};

const rhythmChanges: ChordProgression = {
  id: "rhythmChanges",
  formId: "aaba32",
  primaryName: "Rhythm changes",
  aliases: ["AABA rhythm changes"],
  summary:
    "A standard 32-bar AABA progression built from turnaround harmony and a dominant bridge.",
  idioms: ["jazz"],
  tonalContext: "major",
  spans: [
    span("1", "M7", 1, "tonic"),
    span("6", "m7", 1, "prolongation"),
    span("2", "m7", 1, "predominant"),
    span("5", "7", 1, "dominant"),
    span("3", "m7", 1, "passing"),
    span("6", "7", 1, "secondary dominant"),
    span("2", "m7", 1, "predominant"),
    span("5", "7", 1, "dominant"),
    span("1", "M7", 1, "tonic"),
    span("6", "m7", 1, "prolongation"),
    span("2", "m7", 1, "predominant"),
    span("5", "7", 1, "dominant"),
    span("3", "m7", 1, "passing"),
    span("6", "7", 1, "secondary dominant"),
    span("2", "m7", 1, "predominant"),
    span("5", "7", 1, "dominant"),
    span("3", "7", 2, "secondary dominant"),
    span("6", "7", 2, "secondary dominant"),
    span("2", "7", 2, "secondary dominant"),
    span("5", "7", 2, "dominant"),
    span("1", "M7", 1, "tonic"),
    span("6", "m7", 1, "prolongation"),
    span("2", "m7", 1, "predominant"),
    span("5", "7", 1, "dominant"),
    span("3", "m7", 1, "passing"),
    span("6", "7", 1, "secondary dominant"),
    span("2", "m7", 1, "predominant"),
    span("5", "7", 1, "dominant"),
  ],
};

const jazzBlues: ChordProgression = {
  id: "jazzBlues",
  formId: "twelveBarBlues",
  primaryName: "Jazz blues",
  aliases: ["Basic jazz blues"],
  summary:
    "A 12-bar jazz blues that adds passing diminished color and a ii-V turnaround to the blues frame.",
  idioms: ["jazz", "blues"],
  tonalContext: "mixed",
  spans: [
    span("1", "7", 1, "tonic"),
    span("4", "7", 1, "subdominant"),
    span("1", "7", 2, "tonic"),
    span("4", "7", 1, "subdominant"),
    span("♯4", "°7", 1, "passing"),
    span("1", "7", 1, "tonic"),
    span("6", "7", 1, "secondary dominant"),
    span("2", "m7", 1, "predominant"),
    span("5", "7", 1, "dominant"),
    span("1", "7", 1, "tonic"),
    span("5", "7", 1, "turnaround"),
  ],
};

export const chordProgressions = {
  oneOneFiveFive,
  oneOneFiveV7,
  oneOneFourFour,
  oneOneFourFive,
  oneFourOneFive,
  dooWop,
  axisProgression,
  majorTwoFiveOne,
  minorTwoFiveOne,
  twelveBarBlues,
  twelveBarBluesQuickChange,
  rhythmChanges,
  jazzBlues,
} as const;
