import type {
  ChordProgression,
  ChordProgressionBarGroup,
  ChordProgressionCategoryGroup,
  ChordProgressionCategoryKey,
  ChordProgressionCategoryMetadata,
  ChordProgressionChord,
} from "../../types/chord-progressions.d.ts";

type BuiltInChordProgression = ChordProgression & {
  readonly category: ChordProgressionCategoryKey;
};

function chord(
  degree: ChordProgressionChord["degree"],
  chordCollectionKey: ChordProgressionChord["chordCollectionKey"],
  durationInBars: number,
  analysis?: ChordProgressionChord["analysis"],
): ChordProgressionChord {
  const progressionChord: ChordProgressionChord = {
    degree,
    chordCollectionKey,
    durationInBars,
  };

  if (analysis === undefined) return progressionChord;

  return {
    ...progressionChord,
    analysis,
  };
}

const _chordProgressionCategories = {
  fundamentals: {
    name: "Diatonic Foundations",
    description:
      "Beginner-friendly diatonic progressions and turnarounds for tonic, predominant, and dominant motion.",
  },
  jazz: {
    name: "Jazz Standards & Cadences",
    description:
      "Seventh-chord cadences and reusable sections from foundational jazz-standard forms.",
  },
  blues: {
    name: "Blues Forms",
    description:
      "Blues forms built from dominant-function tonic, subdominant, and dominant areas.",
  },
} as const satisfies Record<
  ChordProgressionCategoryKey,
  ChordProgressionCategoryMetadata
>;

/** Category display metadata for built-in chord progressions. */
export const chordProgressionCategories: Record<
  ChordProgressionCategoryKey,
  ChordProgressionCategoryMetadata
> = _chordProgressionCategories;

/** Built-in chord progression category keys in recommended display order. */
export const chordProgressionCategoryKeys:
  readonly ChordProgressionCategoryKey[] = [
    "fundamentals",
    "jazz",
    "blues",
  ];

const oneOneFiveFive: BuiltInChordProgression = {
  category: "fundamentals",
  chords: [
    chord("1", "major", 2),
    chord("5", "major", 2),
  ],
};

const oneOneFiveFiveDominant7: BuiltInChordProgression = {
  category: "fundamentals",
  chords: [
    chord("1", "major", 2),
    chord("5", "major", 1),
    chord("5", "dominant7", 1),
  ],
};

const oneOneFourFour: BuiltInChordProgression = {
  category: "fundamentals",
  chords: [
    chord("1", "major", 2),
    chord("4", "major", 2),
  ],
};

const oneOneFourFive: BuiltInChordProgression = {
  category: "fundamentals",
  chords: [
    chord("1", "major", 2),
    chord("4", "major", 1),
    chord("5", "major", 1),
  ],
};

const oneFourOneFive: BuiltInChordProgression = {
  category: "fundamentals",
  chords: [
    chord("1", "major", 1),
    chord("4", "major", 1),
    chord("1", "major", 1),
    chord("5", "major", 1),
  ],
};

const oneSixFourFive: BuiltInChordProgression = {
  category: "fundamentals",
  chords: [
    chord("1", "major", 1),
    chord("6", "minor", 1),
    chord("4", "major", 1),
    chord("5", "major", 1),
  ],
};

const oneFiveSixFour: BuiltInChordProgression = {
  category: "fundamentals",
  chords: [
    chord("1", "major", 1),
    chord("5", "major", 1),
    chord("6", "minor", 1),
    chord("4", "major", 1),
  ],
};

const oneSixTwoFive: BuiltInChordProgression = {
  category: "fundamentals",
  chords: [
    chord("1", "major", 1),
    chord("6", "minor", 1),
    chord("2", "minor", 1),
    chord("5", "major", 1),
  ],
};

const sixTwoFiveOne: BuiltInChordProgression = {
  category: "fundamentals",
  chords: [
    chord("6", "minor", 1),
    chord("2", "minor", 1),
    chord("5", "major", 1),
    chord("1", "major", 1),
  ],
};

const majorTwoFiveOne: BuiltInChordProgression = {
  category: "jazz",
  chords: [
    chord("2", "minor7", 1),
    chord("5", "dominant7", 1),
    chord("1", "major7", 2),
  ],
};

const minorTwoFiveOne: BuiltInChordProgression = {
  category: "jazz",
  chords: [
    chord("2", "halfDiminished7", 1),
    chord("5", "dominant7", 1),
    chord("1", "minor", 2),
  ],
};

const autumnLeavesA: BuiltInChordProgression = {
  commonName: "Autumn Leaves A Section",
  category: "jazz",
  chords: [
    chord("2", "minor7", 1),
    chord("5", "dominant7", 1),
    chord("1", "major7", 1),
    chord("4", "major7", 1),
    chord("7", "halfDiminished7", 1, { romanSymbol: "iiø7/vi" }),
    chord("3", "dominant7", 1, { romanSymbol: "V7/vi" }),
    chord("6", "minor", 2),
  ],
};

const autumnLeavesB: BuiltInChordProgression = {
  commonName: "Autumn Leaves B Section",
  category: "jazz",
  chords: [
    chord("7", "halfDiminished7", 1, { romanSymbol: "iiø7/vi" }),
    chord("3", "dominant7", 1, { romanSymbol: "V7/vi" }),
    chord("6", "minor", 2),
    chord("2", "minor7", 1),
    chord("5", "dominant7", 1),
    chord("1", "major7", 1),
    chord("4", "major7", 1),
  ],
};

const oneFourOneFiveSplitReturn: BuiltInChordProgression = {
  category: "fundamentals",
  chords: [
    chord("1", "major", 1),
    chord("4", "major", 1),
    chord("1", "major", 1),
    chord("5", "major", 1),
    chord("1", "major", 1),
    chord("4", "major", 1),
    chord("1", "major", 0.5),
    chord("5", "major", 0.5),
    chord("1", "major", 1),
  ],
};

const twelveBarBlues: BuiltInChordProgression = {
  commonName: "12 Bar Blues",
  category: "blues",
  chords: [
    chord("1", "dominant7", 4),
    chord("4", "dominant7", 2),
    chord("1", "dominant7", 2),
    chord("5", "dominant7", 1),
    chord("4", "dominant7", 1),
    chord("1", "dominant7", 1),
    chord("5", "dominant7", 1),
  ],
};

const twelveBarBluesQuickChange: BuiltInChordProgression = {
  commonName: "12 Bar Blues Quick Change",
  category: "blues",
  chords: [
    chord("1", "dominant7", 1),
    chord("4", "dominant7", 1),
    chord("1", "dominant7", 2),
    chord("4", "dominant7", 2),
    chord("1", "dominant7", 2),
    chord("5", "dominant7", 1),
    chord("4", "dominant7", 1),
    chord("1", "dominant7", 1),
    chord("5", "dominant7", 1),
  ],
};

const rhythmChangesA: BuiltInChordProgression = {
  commonName: "Rhythm Changes A Section",
  category: "jazz",
  chords: [
    chord("1", "major", 0.5),
    chord("6", "dominant7", 0.5),
    chord("2", "minor7", 0.5),
    chord("5", "dominant7", 0.5),
    chord("3", "minor7", 0.5),
    chord("6", "dominant7", 0.5),
    chord("2", "minor7", 0.5),
    chord("5", "dominant7", 0.5),
    chord("1", "major", 0.5),
    chord("1", "dominant7", 0.5),
    chord("4", "major", 0.5),
    chord("♯4", "diminished7", 0.5),
    chord("1", "major", 0.5),
    chord("6", "dominant7", 0.5),
    chord("2", "minor7", 0.5),
    chord("5", "dominant7", 0.5),
  ],
};

const rhythmChangesBridge: BuiltInChordProgression = {
  commonName: "Rhythm Changes Bridge",
  category: "jazz",
  chords: [
    chord("3", "dominant7", 2),
    chord("6", "dominant7", 2),
    chord("2", "dominant7", 2),
    chord("5", "dominant7", 2),
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
  autumnLeavesA,
  autumnLeavesB,
  rhythmChangesA,
  rhythmChangesBridge,
  twelveBarBlues,
  twelveBarBluesQuickChange,
} as const;

/** A key for one of the built-in chord progression templates. */
export type ChordProgressionKey = keyof typeof _chordProgressions;

/** Built-in chord progression templates keyed by progression id. */
export const chordProgressions: Record<
  ChordProgressionKey,
  BuiltInChordProgression
> = _chordProgressions;

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

/** Built-in chord progression keys grouped by musical category. */
export const chordProgressionCategoryGroups:
  readonly ChordProgressionCategoryGroup<ChordProgressionKey>[] =
    chordProgressionCategoryKeys.map((category) => ({
      category,
      ...chordProgressionCategories[category],
      progressionKeys: Object.entries(chordProgressions).flatMap(
        ([key, progression]) =>
          progression.category === category ? [key as ChordProgressionKey] : [],
      ),
    }));
