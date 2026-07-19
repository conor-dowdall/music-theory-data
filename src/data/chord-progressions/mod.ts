import type {
  ChordProgression,
  ChordProgressionBarGroup,
  ChordProgressionCategoryGroup,
  ChordProgressionCategoryKey,
  ChordProgressionCategoryMetadata,
  ChordProgressionChord,
  ChordProgressionDefinition,
} from "../../types/chord-progressions.ts";

/** A built-in progression with an assigned package category. */
export type BuiltInChordProgressionDefinition = ChordProgressionDefinition & {
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

/**
 * This catalog is a focused set of recognizable, loop-ready harmonic
 * progressions for instrumental practice. Entries are practical realizations
 * of musical concepts, not an exhaustive taxonomy of music theory.
 */
const _chordProgressionCategories = {
  commonLoops: {
    name: "Common Progressions",
    description:
      "Reusable diatonic and modal progressions found across popular styles.",
  },
  turnaroundsAndCycles: {
    name: "Turnarounds & Cycles",
    description:
      "Turnarounds and longer root-motion cycles that lead back toward tonic.",
  },
  cadences: {
    name: "Cadences",
    description:
      "Focused four-bar practice loops for authentic, plagal, minor plagal, and deceptive resolution.",
  },
  blues: {
    name: "Blues Forms",
    description:
      "Major, minor, and jazz blues forms built from tonic, subdominant, dominant, and turnaround areas.",
  },
  jazz: {
    name: "Jazz Progressions",
    description:
      "Foundational jazz cadences, substitutions, and standard-form sections.",
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
    "turnaroundsAndCycles",
    "cadences",
    "blues",
    "jazz",
  ];

// Common Progressions

const oneOneFiveFive: ChordProgression = {
  chords: [
    chord("1", "major", 2),
    chord("5", "major", 2),
  ],
};

const oneOneFiveFiveDominant7: ChordProgression = {
  chords: [
    chord("1", "major", 2),
    chord("5", "major", 1),
    chord("5", "dominant7", 1),
  ],
};

const oneOneFourFour: ChordProgression = {
  chords: [
    chord("1", "major", 2),
    chord("4", "major", 2),
  ],
};

const oneOneFourFiveDominant7: ChordProgression = {
  chords: [
    chord("1", "major", 2),
    chord("4", "major", 1),
    chord("5", "dominant7", 1),
  ],
};

const oneFourFiveDominant7Six: ChordProgression = {
  chords: [
    chord("1", "major", 1),
    chord("4", "major", 1),
    chord("5", "dominant7", 1),
    chord("6", "minor", 1),
  ],
};

const oneFourOneFive: ChordProgression = {
  chords: [
    chord("1", "major", 1),
    chord("4", "major", 1),
    chord("1", "major", 1),
    chord("5", "major", 1),
  ],
};

const oneSixFourFive: ChordProgression = {
  chords: [
    chord("1", "major", 1),
    chord("6", "minor", 1),
    chord("4", "major", 1),
    chord("5", "major", 1),
  ],
};

const oneFiveSixFour: ChordProgression = {
  chords: [
    chord("1", "major", 1),
    chord("5", "major", 1),
    chord("6", "minor", 1),
    chord("4", "major", 1),
  ],
};

const oneFourOneFiveSplitReturn: ChordProgression = {
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

const pachelbelCanon: ChordProgression = {
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

const andalusianCadence: ChordProgression = {
  chords: [
    chord("1", "minor", 1),
    chord("♭7", "major", 1),
    chord("♭6", "major", 1),
    chord("5", "major", 1),
  ],
};

// Turnarounds & Cycles

const oneSixTwoFive: ChordProgression = {
  chords: [
    chord("1", "major", 1),
    chord("6", "minor", 1),
    chord("2", "minor", 1),
    chord("5", "major", 1),
  ],
};

const sixTwoFiveOne: ChordProgression = {
  chords: [
    chord("6", "minor", 1),
    chord("2", "minor", 1),
    chord("5", "major", 1),
    chord("1", "major", 1),
  ],
};

const circleOfFifths: ChordProgression = {
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

const minorCircleOfFifths: ChordProgression = {
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

// Cadences

const authenticCadence: ChordProgression = {
  chords: [
    chord("5", "dominant7", 2),
    chord("1", "major", 2),
  ],
};

const plagalCadence: ChordProgression = {
  chords: [
    chord("4", "major", 2),
    chord("1", "major", 2),
  ],
};

const minorPlagalCadence: ChordProgression = {
  chords: [
    chord("4", "minor", 2),
    chord("1", "major", 2),
  ],
};

const deceptiveCadence: ChordProgression = {
  chords: [
    chord("5", "dominant7", 2),
    chord("6", "minor", 2),
  ],
};

// Blues Forms

const twelveBarBlues: ChordProgression = {
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

const twelveBarBluesQuickChange: ChordProgression = {
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

const minorBlues: ChordProgression = {
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

const jazzBlues: ChordProgression = {
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

// Jazz Progressions

const majorTwoFiveOne: ChordProgression = {
  chords: [
    chord("2", "minor7", 1),
    chord("5", "dominant7", 1),
    chord("1", "major7", 2),
  ],
};

const minorTwoFiveOne: ChordProgression = {
  chords: [
    chord("2", "halfDiminished7", 1),
    chord("5", "dominant7", 1),
    chord("1", "minor", 2),
  ],
};

const backdoorTwoFiveOne: ChordProgression = {
  chords: [
    chord("4", "minor7", 1),
    chord("♭7", "dominant7", 1),
    chord("1", "major7", 2),
  ],
};

const autumnLeavesA: ChordProgression = {
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

const autumnLeavesB: ChordProgression = {
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

const autumnLeavesC: ChordProgression = {
  chords: [
    chord("2", "halfDiminished7", 1),
    chord("5", "dominant7", 1),
    chord("1", "minor7", 0.5),
    chord("♭1", "dominant7", 0.5),
    chord("♭7", "minor7", 0.5),
    chord("6", "dominant7", 0.5),
    chord("♭6", "major7", 1),
    chord("5", "dominant7", 1),
    chord("1", "minor", 2),
  ],
};

const rhythmChangesA: ChordProgression = {
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

const rhythmChangesBridge: ChordProgression = {
  chords: [
    chord("3", "dominant7", 2, { romanSymbol: "V7/vi" }),
    chord("6", "dominant7", 2, { romanSymbol: "V7/ii" }),
    chord("2", "dominant7", 2, { romanSymbol: "V7/V" }),
    chord("5", "dominant7", 2),
  ],
};

/** A key for one of the built-in chord progression definitions. */
export type ChordProgressionKey =
  | "oneOneFiveFive"
  | "oneOneFiveFiveDominant7"
  | "oneOneFourFour"
  | "oneOneFourFiveDominant7"
  | "oneFourFiveDominant7Six"
  | "oneFourOneFive"
  | "oneSixFourFive"
  | "oneFiveSixFour"
  | "oneFourOneFiveSplitReturn"
  | "pachelbelCanon"
  | "andalusianCadence"
  | "oneSixTwoFive"
  | "sixTwoFiveOne"
  | "circleOfFifths"
  | "minorCircleOfFifths"
  | "authenticCadence"
  | "plagalCadence"
  | "minorPlagalCadence"
  | "deceptiveCadence"
  | "twelveBarBlues"
  | "twelveBarBluesQuickChange"
  | "minorBlues"
  | "jazzBlues"
  | "majorTwoFiveOne"
  | "minorTwoFiveOne"
  | "backdoorTwoFiveOne"
  | "autumnLeavesA"
  | "autumnLeavesB"
  | "autumnLeavesC"
  | "rhythmChangesA"
  | "rhythmChangesBridge";

/** Built-in catalog definitions are the single authored source for metadata and structure. */
export const chordProgressionDefinitions: Readonly<
  Record<ChordProgressionKey, BuiltInChordProgressionDefinition>
> = {
  oneOneFiveFive: {
    name: "I–V",
    category: "commonLoops",
    progression: oneOneFiveFive,
  },
  oneOneFiveFiveDominant7: {
    name: "I–V–V7",
    category: "commonLoops",
    progression: oneOneFiveFiveDominant7,
  },
  oneOneFourFour: {
    name: "I–IV",
    category: "commonLoops",
    progression: oneOneFourFour,
  },
  oneOneFourFiveDominant7: {
    name: "I–IV–V7",
    category: "commonLoops",
    progression: oneOneFourFiveDominant7,
  },
  oneFourFiveDominant7Six: {
    name: "I–IV–V7–vi",
    category: "commonLoops",
    progression: oneFourFiveDominant7Six,
  },
  oneFourOneFive: {
    name: "I–IV–I–V",
    category: "commonLoops",
    progression: oneFourOneFive,
  },
  oneSixFourFive: {
    name: "I–vi–IV–V",
    category: "commonLoops",
    progression: oneSixFourFive,
  },
  oneFiveSixFour: {
    name: "I–V–vi–IV",
    category: "commonLoops",
    progression: oneFiveSixFour,
  },
  oneFourOneFiveSplitReturn: {
    name: "I–IV–I–V–I–IV–I–V–I",
    category: "commonLoops",
    progression: oneFourOneFiveSplitReturn,
  },
  pachelbelCanon: {
    name: "Pachelbel Progression",
    category: "commonLoops",
    progression: pachelbelCanon,
  },
  andalusianCadence: {
    name: "Andalusian Cadence",
    category: "commonLoops",
    progression: andalusianCadence,
  },
  oneSixTwoFive: {
    name: "I–vi–ii–V",
    category: "turnaroundsAndCycles",
    progression: oneSixTwoFive,
  },
  sixTwoFiveOne: {
    name: "vi–ii–V–I",
    category: "turnaroundsAndCycles",
    progression: sixTwoFiveOne,
  },
  circleOfFifths: {
    name: "Circle of Fifths Progression",
    category: "turnaroundsAndCycles",
    progression: circleOfFifths,
  },
  minorCircleOfFifths: {
    name: "Minor Circle of Fifths Progression",
    category: "turnaroundsAndCycles",
    progression: minorCircleOfFifths,
  },
  authenticCadence: {
    name: "Authentic Cadence (V7–I)",
    category: "cadences",
    progression: authenticCadence,
  },
  plagalCadence: {
    name: "Plagal Cadence (IV–I)",
    category: "cadences",
    progression: plagalCadence,
  },
  minorPlagalCadence: {
    name: "Minor Plagal Cadence (iv–I)",
    category: "cadences",
    progression: minorPlagalCadence,
  },
  deceptiveCadence: {
    name: "Deceptive Cadence (V7–vi)",
    category: "cadences",
    progression: deceptiveCadence,
  },
  twelveBarBlues: {
    name: "12-Bar Blues",
    category: "blues",
    progression: twelveBarBlues,
  },
  twelveBarBluesQuickChange: {
    name: "12-Bar Blues (Quick Change)",
    category: "blues",
    progression: twelveBarBluesQuickChange,
  },
  minorBlues: {
    name: "Minor Blues",
    category: "blues",
    progression: minorBlues,
  },
  jazzBlues: {
    name: "Jazz Blues",
    category: "blues",
    progression: jazzBlues,
  },
  majorTwoFiveOne: {
    name: "Major ii–V–I",
    category: "jazz",
    progression: majorTwoFiveOne,
  },
  minorTwoFiveOne: {
    name: "Minor ii–V–i",
    category: "jazz",
    progression: minorTwoFiveOne,
  },
  backdoorTwoFiveOne: {
    name: "Backdoor ii–V–I",
    category: "jazz",
    progression: backdoorTwoFiveOne,
  },
  autumnLeavesA: {
    name: "Autumn Leaves A",
    category: "jazz",
    progression: autumnLeavesA,
  },
  autumnLeavesB: {
    name: "Autumn Leaves B",
    category: "jazz",
    progression: autumnLeavesB,
  },
  autumnLeavesC: {
    name: "Autumn Leaves C",
    category: "jazz",
    progression: autumnLeavesC,
  },
  rhythmChangesA: {
    name: "Rhythm Changes A",
    category: "jazz",
    progression: rhythmChangesA,
  },
  rhythmChangesBridge: {
    name: "Rhythm Changes Bridge",
    category: "jazz",
    progression: rhythmChangesBridge,
  },
};

/** Built-in chord progression structures derived from the catalog definitions. */
export const chordProgressions: Record<
  ChordProgressionKey,
  ChordProgression
> = Object.fromEntries(
  Object.entries(chordProgressionDefinitions).map(([key, definition]) => [
    key,
    definition.progression,
  ]),
) as Record<ChordProgressionKey, ChordProgression>;

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
        ([key]) =>
          chordProgressionDefinitions[key as ChordProgressionKey].category ===
              category
            ? [key as ChordProgressionKey]
            : [],
      ),
    }));
