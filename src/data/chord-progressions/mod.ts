import type {
  ChordProgression,
  ChordProgressionChord,
} from "../../types/chord-progressions.d.ts";

function chord(
  degree: ChordProgressionChord["degree"],
  quality: ChordProgressionChord["quality"],
  durationInBars: number,
): ChordProgressionChord {
  return {
    degree,
    quality,
    durationInBars,
  };
}

const oneOneFiveFive: ChordProgression = {
  primaryName: "I | I | V | V",
  chords: [
    chord("1", "M", 2),
    chord("5", "M", 2),
  ],
};

const oneOneFiveFiveDominant7: ChordProgression = {
  primaryName: "I | I | V | V7",
  chords: [
    chord("1", "M", 2),
    chord("5", "M", 1),
    chord("5", "7", 1),
  ],
};

const oneOneFourFour: ChordProgression = {
  primaryName: "I | I | IV | IV",
  chords: [
    chord("1", "M", 2),
    chord("4", "M", 2),
  ],
};

const oneOneFourFive: ChordProgression = {
  primaryName: "I | I | IV | V",
  chords: [
    chord("1", "M", 2),
    chord("4", "M", 1),
    chord("5", "M", 1),
  ],
};

const oneFourOneFive: ChordProgression = {
  primaryName: "I | IV | I | V",
  chords: [
    chord("1", "M", 1),
    chord("4", "M", 1),
    chord("1", "M", 1),
    chord("5", "M", 1),
  ],
};

const oneSixFourFive: ChordProgression = {
  primaryName: "I | vi | IV | V",
  chords: [
    chord("1", "M", 1),
    chord("6", "m", 1),
    chord("4", "M", 1),
    chord("5", "M", 1),
  ],
};

const oneFiveSixFour: ChordProgression = {
  primaryName: "I | V | vi | IV",
  chords: [
    chord("1", "M", 1),
    chord("5", "M", 1),
    chord("6", "m", 1),
    chord("4", "M", 1),
  ],
};

const oneSixTwoFive: ChordProgression = {
  primaryName: "I | vi | ii | V",
  chords: [
    chord("1", "M", 1),
    chord("6", "m", 1),
    chord("2", "m", 1),
    chord("5", "M", 1),
  ],
};

const sixTwoFiveOne: ChordProgression = {
  primaryName: "vi | ii | V | I",
  chords: [
    chord("6", "m", 1),
    chord("2", "m", 1),
    chord("5", "M", 1),
    chord("1", "M", 1),
  ],
};

const majorTwoFiveOne: ChordProgression = {
  primaryName: "iim7 | V7 | IM7 | IM7",
  chords: [
    chord("2", "m7", 1),
    chord("5", "7", 1),
    chord("1", "M7", 2),
  ],
};

const minorTwoFiveOne: ChordProgression = {
  primaryName: "iiø7 | V7 | i | i",
  chords: [
    chord("2", "ø7", 1),
    chord("5", "7", 1),
    chord("1", "m", 2),
  ],
};

const oneFourOneFiveSplitReturn: ChordProgression = {
  primaryName: "I | IV | I | V | I | IV | I V | I",
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
  primaryName: "12 Bar Blues",
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

const twelveBarBluesQuickChange: ChordProgression = {
  primaryName: "12 Bar Blues Quick Change",
  chords: [
    chord("1", "7", 1),
    chord("4", "7", 1),
    chord("1", "7", 2),
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
  oneSixFourFive,
  oneFiveSixFour,
  oneSixTwoFive,
  sixTwoFiveOne,
  majorTwoFiveOne,
  minorTwoFiveOne,
  oneFourOneFiveSplitReturn,
  twelveBarBlues,
  twelveBarBluesQuickChange,
} as const;

export type ChordProgressionKey = keyof typeof _chordProgressions;

export const chordProgressions: Record<ChordProgressionKey, ChordProgression> =
  _chordProgressions;
