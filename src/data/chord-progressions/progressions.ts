import type {
  ChordProgression,
  ChordProgressionChord,
} from "../../types/chord-progressions.d.ts";

function chord(
  degree: ChordProgressionChord["degree"],
  quality: ChordProgressionChord["quality"],
  bars: number,
): ChordProgressionChord {
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
  chords: [
    chord("1", "M", 2),
    chord("5", "M", 2),
  ],
};

const oneOneFiveFiveDominant7: ChordProgression = {
  id: "oneOneFiveFiveDominant7",
  primaryName: "I-I-V-V7",
  aliases: ["1 1 5 5 with V7"],
  summary:
    "A four-bar tonic-dominant loop that adds a dominant seventh in the last bar.",
  chords: [
    chord("1", "M", 2),
    chord("5", "M", 1),
    chord("5", "7", 1),
  ],
};

const oneOneFourFour: ChordProgression = {
  id: "oneOneFourFour",
  primaryName: "I-I-IV-IV",
  aliases: ["1 1 4 4"],
  summary: "A four-bar loop with two bars on I followed by two bars on IV.",
  chords: [
    chord("1", "M", 2),
    chord("4", "M", 2),
  ],
};

const oneOneFourFive: ChordProgression = {
  id: "oneOneFourFive",
  primaryName: "I-I-IV-V",
  aliases: ["I IV V", "1 1 4 5"],
  summary:
    "A four-bar I-IV-V loop that lets the tonic settle before moving through IV to V.",
  chords: [
    chord("1", "M", 2),
    chord("4", "M", 1),
    chord("5", "M", 1),
  ],
};

const oneFourOneFive: ChordProgression = {
  id: "oneFourOneFive",
  primaryName: "I-IV-I-V",
  aliases: ["1 4 1 5"],
  summary: "A balanced four-bar loop that returns to I before ending on V.",
  chords: [
    chord("1", "M", 1),
    chord("4", "M", 1),
    chord("1", "M", 1),
    chord("5", "M", 1),
  ],
};

const dooWop: ChordProgression = {
  id: "dooWop",
  primaryName: "I-vi-IV-V",
  aliases: ["Doo-wop progression", "50s progression", "1 6 4 5"],
  summary:
    "A classic four-chord pop progression that moves from I through vi, IV, and V.",
  chords: [
    chord("1", "M", 1),
    chord("6", "m", 1),
    chord("4", "M", 1),
    chord("5", "M", 1),
  ],
};

const axisProgression: ChordProgression = {
  id: "axisProgression",
  primaryName: "I-V-vi-IV",
  aliases: ["Axis progression", "1 5 6 4"],
  summary:
    "A widely used modern pop and rock progression built from I, V, vi, and IV.",
  chords: [
    chord("1", "M", 1),
    chord("5", "M", 1),
    chord("6", "m", 1),
    chord("4", "M", 1),
  ],
};

const majorTwoFiveOne: ChordProgression = {
  id: "majorTwoFiveOne",
  primaryName: "ii-V-I (major)",
  aliases: ["ii V I", "2 5 1"],
  summary: "A four-bar major-key cadence with a two-bar tonic resolution.",
  chords: [
    chord("2", "m7", 1),
    chord("5", "7", 1),
    chord("1", "M7", 2),
  ],
};

const minorTwoFiveOne: ChordProgression = {
  id: "minorTwoFiveOne",
  primaryName: "iiø-V-i (minor)",
  aliases: ["Minor ii-V-i", "iiø V i", "iiø7 V7 i", "2 5 1 minor"],
  summary: "A four-bar minor-key cadence with a two-bar tonic resolution.",
  chords: [
    chord("2", "ø7", 1),
    chord("5", "7", 1),
    chord("1", "m", 2),
  ],
};

const oneFourOneFiveEightBar: ChordProgression = {
  id: "oneFourOneFiveEightBar",
  primaryName: "I-IV-I-V / I-IV-[I-V]-I",
  aliases: [
    "1 4 1 5 / 1 4 [1 5] 1",
    "I IV I V / I IV I V I",
  ],
  summary:
    "An eight-bar two-phrase loop whose second phrase splits one bar between I and V before returning to I.",
  chords: [
    chord("1", "M", 1),
    chord("4", "M", 1),
    chord("1", "M", 1),
    chord("5", "M", 1),
    chord("1", "M", 1),
    chord("4", "M", 1),
    chord("1", "M", 0.5),
    chord("5", "M", 0.5),
    chord("1", "M", 1),
  ],
};

const twelveBarBlues: ChordProgression = {
  id: "twelveBarBlues",
  primaryName: "12-bar blues",
  aliases: ["Twelve bar blues", "I7 IV7 V7 blues"],
  summary:
    "The standard 12-bar blues with the tonic held through the opening phrase.",
  chords: [
    chord("1", "7", 4),
    chord("4", "7", 2),
    chord("1", "7", 2),
    chord("5", "7", 1),
    chord("4", "7", 1),
    chord("1", "7", 1),
    chord("5", "7", 1),
  ],
};

const _chordProgressions = {
  oneOneFiveFive,
  oneOneFiveFiveDominant7,
  oneOneFourFour,
  oneOneFourFive,
  oneFourOneFive,
  dooWop,
  axisProgression,
  majorTwoFiveOne,
  minorTwoFiveOne,
  oneFourOneFiveEightBar,
  twelveBarBlues,
} as const;

export type ChordProgressionKey = keyof typeof _chordProgressions;

export const chordProgressions: Record<ChordProgressionKey, ChordProgression> =
  _chordProgressions;
