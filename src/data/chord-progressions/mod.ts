import type {
  ChordProgression,
  ChordProgressionBarGroup,
  ChordProgressionChord,
} from "../../types/chord-progressions.d.ts";

function chord(
  romanSymbol: ChordProgressionChord["romanSymbol"],
  degree: ChordProgressionChord["degree"],
  quality: ChordProgressionChord["quality"],
  durationInBars: number,
): ChordProgressionChord {
  return {
    romanSymbol,
    degree,
    quality,
    durationInBars,
  };
}

const oneOneFiveFive: ChordProgression = {
  chords: [
    chord("I", "1", "M", 2),
    chord("V", "5", "M", 2),
  ],
};

const oneOneFiveFiveDominant7: ChordProgression = {
  chords: [
    chord("I", "1", "M", 2),
    chord("V", "5", "M", 1),
    chord("V7", "5", "7", 1),
  ],
};

const oneOneFourFour: ChordProgression = {
  chords: [
    chord("I", "1", "M", 2),
    chord("IV", "4", "M", 2),
  ],
};

const oneOneFourFive: ChordProgression = {
  chords: [
    chord("I", "1", "M", 2),
    chord("IV", "4", "M", 1),
    chord("V", "5", "M", 1),
  ],
};

const oneFourOneFive: ChordProgression = {
  chords: [
    chord("I", "1", "M", 1),
    chord("IV", "4", "M", 1),
    chord("I", "1", "M", 1),
    chord("V", "5", "M", 1),
  ],
};

const oneSixFourFive: ChordProgression = {
  chords: [
    chord("I", "1", "M", 1),
    chord("vi", "6", "m", 1),
    chord("IV", "4", "M", 1),
    chord("V", "5", "M", 1),
  ],
};

const oneFiveSixFour: ChordProgression = {
  chords: [
    chord("I", "1", "M", 1),
    chord("V", "5", "M", 1),
    chord("vi", "6", "m", 1),
    chord("IV", "4", "M", 1),
  ],
};

const oneSixTwoFive: ChordProgression = {
  chords: [
    chord("I", "1", "M", 1),
    chord("vi", "6", "m", 1),
    chord("ii", "2", "m", 1),
    chord("V", "5", "M", 1),
  ],
};

const sixTwoFiveOne: ChordProgression = {
  chords: [
    chord("vi", "6", "m", 1),
    chord("ii", "2", "m", 1),
    chord("V", "5", "M", 1),
    chord("I", "1", "M", 1),
  ],
};

const majorTwoFiveOne: ChordProgression = {
  chords: [
    chord("iim7", "2", "m7", 1),
    chord("V7", "5", "7", 1),
    chord("IM7", "1", "M7", 2),
  ],
};

const minorTwoFiveOne: ChordProgression = {
  chords: [
    chord("iiø7", "2", "ø7", 1),
    chord("V7", "5", "7", 1),
    chord("i", "1", "m", 2),
  ],
};

const oneFourOneFiveSplitReturn: ChordProgression = {
  chords: [
    chord("I", "1", "M", 1),
    chord("IV", "4", "M", 1),
    chord("I", "1", "M", 1),
    chord("V", "5", "M", 1),
    chord("I", "1", "M", 1),
    chord("IV", "4", "M", 1),
    chord("I", "1", "M", 0.5),
    chord("V", "5", "M", 0.5),
    chord("I", "1", "M", 1),
  ],
};

const twelveBarBlues: ChordProgression = {
  commonName: "12 Bar Blues",
  chords: [
    chord("I7", "1", "7", 4),
    chord("IV7", "4", "7", 2),
    chord("I7", "1", "7", 2),
    chord("V7", "5", "7", 1),
    chord("IV7", "4", "7", 1),
    chord("I7", "1", "7", 1),
    chord("V7", "5", "7", 1),
  ],
};

const twelveBarBluesQuickChange: ChordProgression = {
  commonName: "12 Bar Blues Quick Change",
  chords: [
    chord("I7", "1", "7", 1),
    chord("IV7", "4", "7", 1),
    chord("I7", "1", "7", 2),
    chord("IV7", "4", "7", 2),
    chord("I7", "1", "7", 2),
    chord("V7", "5", "7", 1),
    chord("IV7", "4", "7", 1),
    chord("I7", "1", "7", 1),
    chord("V7", "5", "7", 1),
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

/** A key for one of the built-in chord progression templates. */
export type ChordProgressionKey = keyof typeof _chordProgressions;

/** Built-in chord progression templates keyed by progression id. */
export const chordProgressions: Record<ChordProgressionKey, ChordProgression> =
  _chordProgressions;

const chordProgressionsByTotalBars = Object.entries(chordProgressions)
  .reduce<Map<number, ChordProgressionKey[]>>((groups, [key, progression]) => {
    const totalBars = progression.chords.reduce(
      (total, chord) => total + chord.durationInBars,
      0,
    );
    const progressionKeys = groups.get(totalBars);
    if (progressionKeys) {
      progressionKeys.push(key as ChordProgressionKey);
    } else {
      groups.set(totalBars, [key as ChordProgressionKey]);
    }
    return groups;
  }, new Map());

/** Built-in chord progression keys grouped by total duration in bars. */
export const chordProgressionBarGroups: readonly ChordProgressionBarGroup<
  ChordProgressionKey
>[] = Array.from(
  chordProgressionsByTotalBars,
  ([totalBars, progressionKeys]) => ({
    totalBars,
    progressionKeys,
  }),
).sort((a, b) => a.totalBars - b.totalBars);
