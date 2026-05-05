import type {
  ChordProgression,
  ChordProgressionChange,
} from "../../types/chord-progressions.d.ts";

function change(
  degree: ChordProgressionChange["degree"],
  quality: ChordProgressionChange["quality"],
  bars: number,
): ChordProgressionChange {
  return {
    degree,
    quality,
    bars,
  };
}

const oneOneFiveFive: ChordProgression = {
  id: "oneOneFiveFive",
  primaryName: "I-I-V-V",
  aliases: ["1 1 5 5"],
  summary: "A four-bar loop with two bars on I followed by two bars on V.",
  changes: [
    change("1", "M", 2),
    change("5", "M", 2),
  ],
};

const oneOneFiveFiveDominant7: ChordProgression = {
  id: "oneOneFiveFiveDominant7",
  primaryName: "I-I-V-V7",
  aliases: ["1 1 5 5 with V7"],
  summary:
    "A four-bar tonic-dominant loop that adds a dominant seventh in the last bar.",
  changes: [
    change("1", "M", 2),
    change("5", "M", 1),
    change("5", "7", 1),
  ],
};

const oneOneFourFour: ChordProgression = {
  id: "oneOneFourFour",
  primaryName: "I-I-IV-IV",
  aliases: ["1 1 4 4"],
  summary: "A four-bar loop with two bars on I followed by two bars on IV.",
  changes: [
    change("1", "M", 2),
    change("4", "M", 2),
  ],
};

const oneOneFourFive: ChordProgression = {
  id: "oneOneFourFive",
  primaryName: "I-I-IV-V",
  aliases: ["I IV V", "1 1 4 5"],
  summary:
    "A four-bar I-IV-V loop that lets the tonic settle before moving through IV to V.",
  changes: [
    change("1", "M", 2),
    change("4", "M", 1),
    change("5", "M", 1),
  ],
};

const oneFourOneFive: ChordProgression = {
  id: "oneFourOneFive",
  primaryName: "I-IV-I-V",
  aliases: ["1 4 1 5"],
  summary: "A balanced four-bar loop that returns to I before ending on V.",
  changes: [
    change("1", "M", 1),
    change("4", "M", 1),
    change("1", "M", 1),
    change("5", "M", 1),
  ],
};

const dooWop: ChordProgression = {
  id: "dooWop",
  primaryName: "Doo-wop progression",
  aliases: ["I vi IV V", "50s progression", "1 6 4 5"],
  summary:
    "A classic four-chord pop progression that moves from I through vi, IV, and V.",
  changes: [
    change("1", "M", 1),
    change("6", "m", 1),
    change("4", "M", 1),
    change("5", "M", 1),
  ],
};

const axisProgression: ChordProgression = {
  id: "axisProgression",
  primaryName: "Axis progression",
  aliases: ["I V vi IV", "1 5 6 4"],
  summary:
    "A widely used modern pop and rock progression built from I, V, vi, and IV.",
  changes: [
    change("1", "M", 1),
    change("5", "M", 1),
    change("6", "m", 1),
    change("4", "M", 1),
  ],
};

const majorTwoFiveOne: ChordProgression = {
  id: "majorTwoFiveOne",
  primaryName: "Major ii-V-I",
  aliases: ["ii V I", "2 5 1"],
  summary: "A four-bar major-key cadence with a two-bar tonic resolution.",
  changes: [
    change("2", "m7", 1),
    change("5", "7", 1),
    change("1", "M7", 2),
  ],
};

const minorTwoFiveOne: ChordProgression = {
  id: "minorTwoFiveOne",
  primaryName: "Minor ii-V-i",
  aliases: ["iiø V i", "iiø7 V7 i", "2 5 1 minor"],
  summary: "A four-bar minor-key cadence with a two-bar tonic resolution.",
  changes: [
    change("2", "ø7", 1),
    change("5", "7", 1),
    change("1", "m", 2),
  ],
};

const twelveBarBlues: ChordProgression = {
  id: "twelveBarBlues",
  primaryName: "12-bar blues",
  aliases: ["Twelve bar blues", "I7 IV7 V7 blues"],
  summary:
    "The standard 12-bar blues with the tonic held through the opening phrase.",
  changes: [
    change("1", "7", 4),
    change("4", "7", 2),
    change("1", "7", 2),
    change("5", "7", 1),
    change("4", "7", 1),
    change("1", "7", 1),
    change("5", "7", 1),
  ],
};

export const chordProgressions = {
  oneOneFiveFive,
  oneOneFiveFiveDominant7,
  oneOneFourFour,
  oneOneFourFive,
  oneFourOneFive,
  dooWop,
  axisProgression,
  majorTwoFiveOne,
  minorTwoFiveOne,
  twelveBarBlues,
} as const;
