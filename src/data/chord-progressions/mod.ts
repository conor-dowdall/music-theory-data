import type {
  ChordProgression,
  ChordProgressionBarGroup,
  ChordProgressionCategoryGroup,
  ChordProgressionCategoryKey,
  ChordProgressionCategoryMetadata,
  ChordProgressionChord,
} from "../../types/chord-progressions.d.ts";

/** A built-in progression with an assigned package category. */
export type BuiltInChordProgression = ChordProgression & {
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
  commonLoops: {
    name: "Common Loops & Sequences",
    description:
      "Reusable diatonic and modal loops, pop progressions, and root-motion sequences.",
  },
  cadences: {
    name: "Cadences",
    description:
      "Short resolution patterns for tonic arrival, plagal and deceptive motion, and the Andalusian minor pattern.",
  },
  blues: {
    name: "Blues Forms",
    description:
      "Major, minor, and jazz blues forms built from tonic, subdominant, dominant, and turnaround areas.",
  },
  jazz: {
    name: "Jazz Cadences & Standards",
    description:
      "Seventh-chord cadences and reusable sections from foundational jazz-standard forms.",
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
    "commonLoops",
    "cadences",
    "blues",
    "jazz",
  ];

const oneOneFiveFive: BuiltInChordProgression = {
  category: "commonLoops",
  chords: [
    chord("1", "major", 2),
    chord("5", "major", 2),
  ],
};

const oneOneFiveFiveDominant7: BuiltInChordProgression = {
  category: "commonLoops",
  chords: [
    chord("1", "major", 2),
    chord("5", "major", 1),
    chord("5", "dominant7", 1),
  ],
};

const oneOneFourFour: BuiltInChordProgression = {
  category: "commonLoops",
  chords: [
    chord("1", "major", 2),
    chord("4", "major", 2),
  ],
};

const oneOneFourFiveDominant7: BuiltInChordProgression = {
  category: "commonLoops",
  chords: [
    chord("1", "major", 2),
    chord("4", "major", 1),
    chord("5", "dominant7", 1),
  ],
};

const oneFourFiveDominant7Six: BuiltInChordProgression = {
  category: "commonLoops",
  chords: [
    chord("1", "major", 1),
    chord("4", "major", 1),
    chord("5", "dominant7", 1),
    chord("6", "minor", 1),
  ],
};

const oneFourOneFive: BuiltInChordProgression = {
  category: "commonLoops",
  chords: [
    chord("1", "major", 1),
    chord("4", "major", 1),
    chord("1", "major", 1),
    chord("5", "major", 1),
  ],
};

const oneSixFourFive: BuiltInChordProgression = {
  category: "commonLoops",
  chords: [
    chord("1", "major", 1),
    chord("6", "minor", 1),
    chord("4", "major", 1),
    chord("5", "major", 1),
  ],
};

const oneFiveSixFour: BuiltInChordProgression = {
  category: "commonLoops",
  chords: [
    chord("1", "major", 1),
    chord("5", "major", 1),
    chord("6", "minor", 1),
    chord("4", "major", 1),
  ],
};

const oneSixTwoFive: BuiltInChordProgression = {
  category: "commonLoops",
  chords: [
    chord("1", "major", 1),
    chord("6", "minor", 1),
    chord("2", "minor", 1),
    chord("5", "major", 1),
  ],
};

const sixTwoFiveOne: BuiltInChordProgression = {
  category: "commonLoops",
  chords: [
    chord("6", "minor", 1),
    chord("2", "minor", 1),
    chord("5", "major", 1),
    chord("1", "major", 1),
  ],
};

const oneFourOneFiveSplitReturn: BuiltInChordProgression = {
  category: "commonLoops",
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

const circleOfFifths: BuiltInChordProgression = {
  commonName: "Circle of Fifths Progression",
  category: "commonLoops",
  chords: [
    chord("1", "major", 1),
    chord("4", "major", 1),
    chord("7", "diminishedTriad", 1),
    chord("3", "minor", 1),
    chord("6", "minor", 1),
    chord("2", "minor", 1),
    chord("5", "major", 1),
    chord("1", "major", 1),
  ],
};

const minorCircleOfFifths: BuiltInChordProgression = {
  commonName: "Minor Circle of Fifths Progression",
  category: "commonLoops",
  chords: [
    chord("1", "minor", 1),
    chord("4", "minor7", 1),
    chord("♭7", "dominant7", 1),
    chord("♭3", "major7", 1),
    chord("♭6", "major7", 1),
    chord("2", "halfDiminished7", 1),
    chord("5", "dominant7", 1),
    chord("1", "minor", 1),
  ],
};

const pachelbelCanon: BuiltInChordProgression = {
  commonName: "Canon Progression",
  category: "commonLoops",
  chords: [
    chord("1", "major", 1),
    chord("5", "major", 1),
    chord("6", "minor", 1),
    chord("3", "minor", 1),
    chord("4", "major", 1),
    chord("1", "major", 1),
    chord("4", "major", 1),
    chord("5", "major", 1),
  ],
};

const authenticCadence: BuiltInChordProgression = {
  commonName: "Authentic Cadence",
  category: "cadences",
  chords: [
    chord("5", "dominant7", 1),
    chord("1", "major", 1),
  ],
};

const plagalCadence: BuiltInChordProgression = {
  commonName: "Plagal Cadence",
  category: "cadences",
  chords: [
    chord("4", "major", 1),
    chord("1", "major", 1),
  ],
};

const deceptiveCadence: BuiltInChordProgression = {
  commonName: "Deceptive Cadence",
  category: "cadences",
  chords: [
    chord("5", "dominant7", 1),
    chord("6", "minor", 1),
  ],
};

const andalusianCadence: BuiltInChordProgression = {
  commonName: "Andalusian Cadence",
  category: "cadences",
  chords: [
    chord("1", "minor", 1),
    chord("♭7", "major", 1),
    chord("♭6", "major", 1),
    chord("5", "major", 1),
  ],
};

const twelveBarBlues: BuiltInChordProgression = {
  commonName: "12-Bar Blues",
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
  commonName: "12-Bar Blues (Quick Change)",
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

const minorBlues: BuiltInChordProgression = {
  commonName: "Minor Blues",
  category: "blues",
  chords: [
    chord("1", "minor7", 4),
    chord("4", "minor7", 2),
    chord("1", "minor7", 2),
    chord("2", "halfDiminished7", 1),
    chord("5", "dominant7", 1),
    chord("1", "minor7", 1),
    chord("5", "dominant7", 1),
  ],
};

const jazzBlues: BuiltInChordProgression = {
  commonName: "Jazz Blues",
  category: "blues",
  chords: [
    chord("1", "dominant7", 1),
    chord("4", "dominant7", 1),
    chord("1", "dominant7", 2),
    chord("4", "dominant7", 1),
    chord("♯4", "diminished7", 1),
    chord("1", "dominant7", 1),
    chord("6", "dominant7", 1, { romanSymbol: "V7/ii" }),
    chord("2", "minor7", 1),
    chord("5", "dominant7", 1),
    chord("1", "dominant7", 0.5),
    chord("6", "dominant7", 0.5, { romanSymbol: "V7/ii" }),
    chord("2", "minor7", 0.5),
    chord("5", "dominant7", 0.5),
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

const backdoorTwoFiveOne: BuiltInChordProgression = {
  commonName: "Backdoor ii–V–I",
  category: "jazz",
  chords: [
    chord("4", "minor7", 1),
    chord("♭7", "dominant7", 1),
    chord("1", "major7", 2),
  ],
};

const autumnLeavesA: BuiltInChordProgression = {
  commonName: "Minor Standard A",
  category: "jazz",
  chords: [
    chord("4", "minor7", 1),
    chord("♭7", "dominant7", 1),
    chord("♭3", "major7", 1),
    chord("♭6", "major7", 1),
    chord("2", "halfDiminished7", 1),
    chord("5", "dominant7", 1),
    chord("1", "minor", 2),
  ],
};

const autumnLeavesB: BuiltInChordProgression = {
  commonName: "Minor Standard B",
  category: "jazz",
  chords: [
    chord("2", "halfDiminished7", 1),
    chord("5", "dominant7", 1),
    chord("1", "minor", 2),
    chord("4", "minor7", 1),
    chord("♭7", "dominant7", 1),
    chord("♭3", "major7", 1),
    chord("♭6", "major7", 1),
  ],
};

const autumnLeavesC: BuiltInChordProgression = {
  commonName: "Minor Standard C",
  category: "jazz",
  chords: [
    chord("2", "halfDiminished7", 1),
    chord("5", "dominant7", 1),
    chord("1", "minor7", 0.5),
    chord("7", "dominant7", 0.5),
    chord("♭7", "minor7", 0.5),
    chord("6", "dominant7", 0.5),
    chord("♭6", "major7", 1),
    chord("5", "dominant7", 1),
    chord("1", "minor", 2),
  ],
};

const rhythmChangesA: BuiltInChordProgression = {
  commonName: "Rhythm Changes A",
  category: "jazz",
  chords: [
    chord("1", "major", 0.5),
    chord("6", "minor", 0.5),
    chord("2", "minor7", 0.5),
    chord("5", "dominant7", 0.5),
    chord("1", "major", 0.5),
    chord("6", "minor", 0.5),
    chord("2", "minor7", 0.5),
    chord("5", "dominant7", 0.5),
    chord("1", "major", 0.5),
    chord("1", "dominant7", 0.5, { romanSymbol: "V7/IV" }),
    chord("4", "major", 0.5),
    chord("4", "minor", 0.5),
    chord("1", "major", 0.5),
    chord("5", "dominant7", 0.5),
    chord("1", "major", 1),
  ],
};

const rhythmChangesBridge: BuiltInChordProgression = {
  commonName: "Rhythm Changes Bridge",
  category: "jazz",
  chords: [
    chord("3", "dominant7", 2, { romanSymbol: "V7/vi" }),
    chord("6", "dominant7", 2, { romanSymbol: "V7/ii" }),
    chord("2", "dominant7", 2, { romanSymbol: "V7/V" }),
    chord("5", "dominant7", 2),
  ],
};

/** Exact built-in chord progression data keyed by progression id. */
export const builtInChordProgressions = {
  oneOneFiveFive,
  oneOneFiveFiveDominant7,
  oneOneFourFour,
  oneOneFourFiveDominant7,
  oneFourFiveDominant7Six,
  oneFourOneFive,
  oneSixFourFive,
  oneFiveSixFour,
  oneSixTwoFive,
  sixTwoFiveOne,
  oneFourOneFiveSplitReturn,
  circleOfFifths,
  minorCircleOfFifths,
  pachelbelCanon,
  authenticCadence,
  plagalCadence,
  deceptiveCadence,
  andalusianCadence,
  twelveBarBlues,
  twelveBarBluesQuickChange,
  minorBlues,
  jazzBlues,
  majorTwoFiveOne,
  minorTwoFiveOne,
  backdoorTwoFiveOne,
  autumnLeavesA,
  autumnLeavesB,
  autumnLeavesC,
  rhythmChangesA,
  rhythmChangesBridge,
} as const;

/** A key for one of the built-in chord progression templates. */
export type ChordProgressionKey = keyof typeof builtInChordProgressions;

/** Built-in chord progression templates keyed by progression id. */
export const chordProgressions: Record<
  ChordProgressionKey,
  BuiltInChordProgression
> = builtInChordProgressions;

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
