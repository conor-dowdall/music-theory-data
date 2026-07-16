import { assertEquals, assertThrows } from "@std/assert";
import {
  chordProgressionBarGroups,
  chordProgressionCategoryGroups,
  chordProgressions,
} from "../src/data/chord-progressions/mod.ts";
import type { RootNote } from "../src/data/labels/note-labels.ts";
import { chordProgression } from "../src/mod.ts";
import type { ChordProgression } from "../src/types/chord-progressions.d.ts";
import {
  getChordProgressionChordChangeReferences,
  getChordProgressionChordNames,
  getChordProgressionChordReferencesByBar,
  getChordProgressionDirectRomanSymbols,
  getChordProgressionKeysForCategory,
  getChordProgressionKeysForTotalBars,
  getChordProgressionRomanSymbols,
  getChordProgressionSongChordReferences,
  getChordProgressionTotalDurationInBars,
  getChordProgressionUniqueChordNames,
  getChordProgressionUniqueChordReferences,
  isValidChordProgressionKey,
} from "../src/utils/chord-progressions.ts";

const cMajorReference = {
  rootNote: "C",
  chordName: "CM",
  chordCollectionKey: "major",
} as const;

const fMajorReference = {
  rootNote: "F",
  chordName: "FM",
  chordCollectionKey: "major",
} as const;

const gMajorReference = {
  rootNote: "G",
  chordName: "GM",
  chordCollectionKey: "major",
} as const;

const cDominant7Reference = {
  rootNote: "C",
  chordName: "C7",
  chordCollectionKey: "dominant7",
} as const;

const fDominant7Reference = {
  rootNote: "F",
  chordName: "F7",
  chordCollectionKey: "dominant7",
} as const;

const gDominant7Reference = {
  rootNote: "G",
  chordName: "G7",
  chordCollectionKey: "dominant7",
} as const;

const aMinorReference = {
  rootNote: "A",
  chordName: "Am",
  chordCollectionKey: "minor",
} as const;

Deno.test("progression key validation reflects the current dataset", () => {
  assertEquals(isValidChordProgressionKey("authenticCadence"), true);
  assertEquals(isValidChordProgressionKey("plagalCadence"), true);
  assertEquals(isValidChordProgressionKey("deceptiveCadence"), true);
  assertEquals(isValidChordProgressionKey("andalusianCadence"), true);
  assertEquals(isValidChordProgressionKey("oneSixFourFive"), true);
  assertEquals(isValidChordProgressionKey("oneFiveSixFour"), true);
  assertEquals(isValidChordProgressionKey("oneSixTwoFive"), true);
  assertEquals(isValidChordProgressionKey("sixTwoFiveOne"), true);
  assertEquals(isValidChordProgressionKey("oneOneFiveFiveDominant7"), true);
  assertEquals(isValidChordProgressionKey("oneOneFourFour"), true);
  assertEquals(isValidChordProgressionKey("oneOneFourFiveDominant7"), true);
  assertEquals(isValidChordProgressionKey("oneFourFiveDominant7Six"), true);
  assertEquals(isValidChordProgressionKey("oneFourOneFiveSplitReturn"), true);
  assertEquals(isValidChordProgressionKey("circleOfFifths"), true);
  assertEquals(isValidChordProgressionKey("minorCircleOfFifths"), true);
  assertEquals(isValidChordProgressionKey("pachelbelCanon"), true);
  assertEquals(isValidChordProgressionKey("backdoorTwoFiveOne"), true);
  assertEquals(isValidChordProgressionKey("twelveBarBluesQuickChange"), true);
  assertEquals(isValidChordProgressionKey("minorBlues"), true);
  assertEquals(isValidChordProgressionKey("jazzBlues"), true);
  assertEquals(isValidChordProgressionKey("autumnLeavesA"), true);
  assertEquals(isValidChordProgressionKey("autumnLeavesB"), true);
  assertEquals(isValidChordProgressionKey("autumnLeavesC"), true);
  assertEquals(isValidChordProgressionKey("rhythmChangesA"), true);
  assertEquals(isValidChordProgressionKey("rhythmChangesBridge"), true);
  assertEquals(isValidChordProgressionKey("oneOneFourFive"), false);
  assertEquals(isValidChordProgressionKey("ionian"), false);
});

Deno.test("progression exports are available directly", () => {
  assertEquals(
    chordProgressions.authenticCadence.commonName,
    "Authentic Cadence",
  );
  assertEquals(
    chordProgressions.plagalCadence.commonName,
    "Plagal Cadence",
  );
  assertEquals(
    chordProgressions.deceptiveCadence.commonName,
    "Deceptive Cadence",
  );
  assertEquals(
    chordProgressions.andalusianCadence.commonName,
    "Andalusian Cadence",
  );
  assertEquals(
    [
      chordProgressions.oneOneFiveFive.commonName,
      chordProgressions.oneOneFiveFiveDominant7.commonName,
      chordProgressions.oneOneFourFour.commonName,
      chordProgressions.oneOneFourFiveDominant7.commonName,
      chordProgressions.oneFourFiveDominant7Six.commonName,
      chordProgressions.oneFourOneFive.commonName,
      chordProgressions.oneSixFourFive.commonName,
      chordProgressions.oneFiveSixFour.commonName,
      chordProgressions.oneSixTwoFive.commonName,
      chordProgressions.sixTwoFiveOne.commonName,
    ],
    [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ],
  );
  assertEquals(
    chordProgressions.circleOfFifths.commonName,
    "Circle of Fifths Progression",
  );
  assertEquals(
    chordProgressions.minorCircleOfFifths.commonName,
    "Minor Circle of Fifths Progression",
  );
  assertEquals(
    chordProgressions.pachelbelCanon.commonName,
    "Pachelbel Progression",
  );
  assertEquals(
    chordProgressions.majorTwoFiveOne.commonName,
    "Major ii–V–I",
  );
  assertEquals(
    chordProgressions.minorTwoFiveOne.commonName,
    "Minor ii–V–i",
  );
  assertEquals(
    chordProgressions.backdoorTwoFiveOne.commonName,
    "Backdoor ii–V–I",
  );
  assertEquals(
    chordProgressions.twelveBarBlues.commonName,
    "12-Bar Blues",
  );
  assertEquals(
    chordProgressions.twelveBarBluesQuickChange.commonName,
    "12-Bar Blues (Quick Change)",
  );
  assertEquals(
    chordProgressions.minorBlues.commonName,
    "Minor Blues",
  );
  assertEquals(
    chordProgressions.jazzBlues.commonName,
    "Jazz Blues",
  );
  assertEquals(
    chordProgressions.autumnLeavesA.commonName,
    "Autumn Leaves A",
  );
  assertEquals(
    chordProgressions.autumnLeavesB.commonName,
    "Autumn Leaves B",
  );
  assertEquals(
    chordProgressions.autumnLeavesC.commonName,
    "Autumn Leaves C",
  );
  assertEquals(
    chordProgressions.rhythmChangesA.commonName,
    "Rhythm Changes A",
  );
  assertEquals(
    chordProgressions.rhythmChangesBridge.commonName,
    "Rhythm Changes Bridge",
  );
  assertEquals(chordProgressions.authenticCadence.category, "cadences");
  assertEquals(chordProgressions.andalusianCadence.category, "commonLoops");
  assertEquals(chordProgressions.oneOneFiveFive.category, "commonLoops");
  assertEquals(chordProgressions.oneSixFourFive.category, "commonLoops");
  assertEquals(
    chordProgressions.oneSixTwoFive.category,
    "turnaroundsAndCycles",
  );
  assertEquals(
    chordProgressions.sixTwoFiveOne.category,
    "turnaroundsAndCycles",
  );
  assertEquals(
    chordProgressions.circleOfFifths.category,
    "turnaroundsAndCycles",
  );
  assertEquals(
    chordProgressions.minorCircleOfFifths.category,
    "turnaroundsAndCycles",
  );
  assertEquals(chordProgressions.autumnLeavesA.category, "jazz");
  assertEquals(chordProgressions.autumnLeavesC.category, "jazz");
  assertEquals(chordProgressions.backdoorTwoFiveOne.category, "jazz");
  assertEquals(chordProgressions.rhythmChangesA.category, "jazz");
  assertEquals(chordProgressions.twelveBarBlues.category, "blues");
  assertEquals(chordProgressions.minorBlues.category, "blues");
  assertEquals(chordProgressions.jazzBlues.category, "blues");
  assertEquals(
    chordProgressions.autumnLeavesA.chords.map((chord) =>
      chord.analysis?.romanSymbol
    ),
    [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ],
  );
  assertEquals(
    chordProgressions.autumnLeavesB.chords.map((chord) =>
      chord.analysis?.romanSymbol
    ),
    [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ],
  );
  assertEquals(
    chordProgressions.autumnLeavesC.chords.map((chord) =>
      chord.analysis?.romanSymbol
    ),
    [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ],
  );
  assertEquals(
    chordProgressions.rhythmChangesA.chords.map((chord) =>
      chord.analysis?.romanSymbol
    ),
    [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      "V7/IV",
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ],
  );
  assertEquals(
    chordProgressions.rhythmChangesBridge.chords.map((chord) =>
      chord.analysis?.romanSymbol
    ),
    ["V7/vi", "V7/ii", "V7/V", undefined],
  );
  assertEquals(
    chordProgressions.oneSixTwoFive.chords.map((chord) => chord.degree),
    [
      "1",
      "6",
      "2",
      "5",
    ],
  );
  assertEquals(
    chordProgressions.majorTwoFiveOne.chords.map((chord) =>
      chord.chordCollectionKey
    ),
    [
      "minor7",
      "dominant7",
      "major7",
    ],
  );
  assertEquals(chordProgressions.twelveBarBluesQuickChange.chords, [
    { degree: "1", chordCollectionKey: "dominant7", durationInBars: 1 },
    { degree: "4", chordCollectionKey: "dominant7", durationInBars: 1 },
    { degree: "1", chordCollectionKey: "dominant7", durationInBars: 2 },
    { degree: "4", chordCollectionKey: "dominant7", durationInBars: 2 },
    { degree: "1", chordCollectionKey: "dominant7", durationInBars: 2 },
    { degree: "5", chordCollectionKey: "dominant7", durationInBars: 1 },
    { degree: "4", chordCollectionKey: "dominant7", durationInBars: 1 },
    { degree: "1", chordCollectionKey: "dominant7", durationInBars: 1 },
    { degree: "5", chordCollectionKey: "dominant7", durationInBars: 1 },
  ]);
});

Deno.test("built-in progression events and practice relationships stay coherent", () => {
  for (const [key, progression] of Object.entries(chordProgressions)) {
    const totalBars = progression.chords.reduce(
      (total, chord) => total + chord.durationInBars,
      0,
    );

    assertEquals(
      Number.isInteger(totalBars),
      true,
      `${key} must have a whole-number loop length`,
    );

    progression.chords.forEach((chord, index) => {
      assertEquals(
        Number.isFinite(chord.durationInBars) && chord.durationInBars > 0,
        true,
        `${key}[${index}] must have a positive finite duration`,
      );

      const nextChord = progression.chords[index + 1];
      const repeatsWithoutChanging = nextChord !== undefined &&
        chord.degree === nextChord.degree &&
        chord.chordCollectionKey === nextChord.chordCollectionKey;

      assertEquals(
        repeatsWithoutChanging,
        false,
        `${key}[${index}] must use duration rather than a duplicate event`,
      );
    });
  }

  assertEquals(
    chordProgressions.autumnLeavesA.chords.slice(-3),
    chordProgressions.minorTwoFiveOne.chords,
  );
  assertEquals(
    chordProgressions.autumnLeavesB.chords.slice(0, 3),
    chordProgressions.minorTwoFiveOne.chords,
  );
  assertEquals(chordProgressions.autumnLeavesB.chords, [
    ...chordProgressions.autumnLeavesA.chords.slice(4),
    ...chordProgressions.autumnLeavesA.chords.slice(0, 4),
  ]);
  assertEquals(
    chordProgressions.autumnLeavesC.chords.slice(0, 2),
    chordProgressions.minorTwoFiveOne.chords.slice(0, 2),
  );
  assertEquals(
    chordProgressions.autumnLeavesC.chords.slice(2, 6).map((chord) =>
      chord.durationInBars
    ),
    [0.5, 0.5, 0.5, 0.5],
  );
  assertEquals(
    chordProgressions.autumnLeavesC.chords[3].degree,
    "7",
  );
  assertEquals(
    chordProgressions.minorCircleOfFifths.chords.slice(1).map((chord) => ({
      degree: chord.degree,
      chordCollectionKey: chord.chordCollectionKey,
    })),
    chordProgressions.autumnLeavesA.chords.map((chord) => ({
      degree: chord.degree,
      chordCollectionKey: chord.chordCollectionKey,
    })),
  );
  assertEquals(
    chordProgressions.circleOfFifths.chords.slice(-4),
    chordProgressions.sixTwoFiveOne.chords,
  );
  assertEquals(
    chordProgressions.oneFourFiveDominant7Six.chords.slice(-2),
    chordProgressions.deceptiveCadence.chords,
  );
  assertEquals(
    chordProgressions.rhythmChangesA.chords.slice(0, 4),
    chordProgressions.rhythmChangesA.chords.slice(4, 8),
  );
  assertEquals(
    chordProgressions.rhythmChangesA.chords.slice(0, 4).map((chord) =>
      chord.degree
    ),
    chordProgressions.oneSixTwoFive.chords.map((chord) => chord.degree),
  );
  assertEquals(
    chordProgressions.jazzBlues.chords.slice(5, 9).map((chord) => ({
      degree: chord.degree,
      chordCollectionKey: chord.chordCollectionKey,
    })),
    chordProgressions.jazzBlues.chords.slice(9).map((chord) => ({
      degree: chord.degree,
      chordCollectionKey: chord.chordCollectionKey,
    })),
  );
});

Deno.test("progressions are grouped by exact total bars", () => {
  assertEquals(chordProgressionBarGroups, [
    {
      totalBars: 2,
      progressionKeys: [
        "authenticCadence",
        "plagalCadence",
        "deceptiveCadence",
      ],
    },
    {
      totalBars: 4,
      progressionKeys: [
        "oneOneFiveFive",
        "oneOneFiveFiveDominant7",
        "oneOneFourFour",
        "oneOneFourFiveDominant7",
        "oneFourFiveDominant7Six",
        "oneFourOneFive",
        "oneSixFourFive",
        "oneFiveSixFour",
        "oneSixTwoFive",
        "sixTwoFiveOne",
        "andalusianCadence",
        "majorTwoFiveOne",
        "minorTwoFiveOne",
        "backdoorTwoFiveOne",
      ],
    },
    {
      totalBars: 8,
      progressionKeys: [
        "oneFourOneFiveSplitReturn",
        "circleOfFifths",
        "minorCircleOfFifths",
        "pachelbelCanon",
        "autumnLeavesA",
        "autumnLeavesB",
        "autumnLeavesC",
        "rhythmChangesA",
        "rhythmChangesBridge",
      ],
    },
    {
      totalBars: 12,
      progressionKeys: [
        "twelveBarBlues",
        "twelveBarBluesQuickChange",
        "minorBlues",
        "jazzBlues",
      ],
    },
  ]);
});

Deno.test("progressions are grouped by musical category", () => {
  assertEquals(chordProgressionCategoryGroups, [
    {
      category: "commonLoops",
      name: "Common Progressions",
      description:
        "Reusable diatonic and modal progressions found across popular styles.",
      progressionKeys: [
        "oneOneFiveFive",
        "oneOneFiveFiveDominant7",
        "oneOneFourFour",
        "oneOneFourFiveDominant7",
        "oneFourFiveDominant7Six",
        "oneFourOneFive",
        "oneSixFourFive",
        "oneFiveSixFour",
        "oneFourOneFiveSplitReturn",
        "pachelbelCanon",
        "andalusianCadence",
      ],
    },
    {
      category: "turnaroundsAndCycles",
      name: "Turnarounds & Cycles",
      description:
        "Turnarounds and longer root-motion cycles that lead back toward tonic.",
      progressionKeys: [
        "oneSixTwoFive",
        "sixTwoFiveOne",
        "circleOfFifths",
        "minorCircleOfFifths",
      ],
    },
    {
      category: "cadences",
      name: "Cadences",
      description:
        "Short resolution patterns for authentic, plagal, and deceptive motion.",
      progressionKeys: [
        "authenticCadence",
        "plagalCadence",
        "deceptiveCadence",
      ],
    },
    {
      category: "blues",
      name: "Blues Forms",
      description:
        "Major, minor, and jazz blues forms built from tonic, subdominant, dominant, and turnaround areas.",
      progressionKeys: [
        "twelveBarBlues",
        "twelveBarBluesQuickChange",
        "minorBlues",
        "jazzBlues",
      ],
    },
    {
      category: "jazz",
      name: "Jazz Progressions",
      description:
        "Foundational jazz cadences, substitutions, and standard-form sections.",
      progressionKeys: [
        "majorTwoFiveOne",
        "minorTwoFiveOne",
        "backdoorTwoFiveOne",
        "autumnLeavesA",
        "autumnLeavesB",
        "autumnLeavesC",
        "rhythmChangesA",
        "rhythmChangesBridge",
      ],
    },
  ]);
});

Deno.test("progression helpers expose chord names and total duration", () => {
  assertEquals(
    getChordProgressionDirectRomanSymbols("authenticCadence"),
    ["V7", "I"],
  );
  assertEquals(
    getChordProgressionDirectRomanSymbols("plagalCadence"),
    ["IV", "I"],
  );
  assertEquals(
    getChordProgressionDirectRomanSymbols("deceptiveCadence"),
    ["V7", "vi"],
  );
  assertEquals(
    getChordProgressionDirectRomanSymbols("andalusianCadence"),
    ["i", "♭VII", "♭VI", "V"],
  );
  assertEquals(
    getChordProgressionDirectRomanSymbols("oneOneFiveFiveDominant7"),
    ["I", "V", "V7"],
  );
  assertEquals(
    getChordProgressionDirectRomanSymbols("oneOneFourFour"),
    ["I", "IV"],
  );
  assertEquals(
    getChordProgressionDirectRomanSymbols("oneOneFourFiveDominant7"),
    ["I", "IV", "V7"],
  );
  assertEquals(
    getChordProgressionDirectRomanSymbols("oneFourFiveDominant7Six"),
    ["I", "IV", "V7", "vi"],
  );
  assertEquals(
    getChordProgressionDirectRomanSymbols("oneFourOneFiveSplitReturn"),
    ["I", "IV", "I", "V", "I", "IV", "I", "V", "I"],
  );
  assertEquals(
    getChordProgressionDirectRomanSymbols("circleOfFifths"),
    ["I", "IV", "vii°", "iii", "vi", "ii", "V", "I"],
  );
  assertEquals(
    getChordProgressionDirectRomanSymbols("minorCircleOfFifths"),
    ["i", "ivm7", "♭VII7", "♭IIIM7", "♭VIM7", "iiø7", "V7", "i"],
  );
  assertEquals(
    getChordProgressionDirectRomanSymbols("pachelbelCanon"),
    ["I", "V", "vi", "iii", "IV", "I", "IV", "V"],
  );
  assertEquals(
    getChordProgressionDirectRomanSymbols("backdoorTwoFiveOne"),
    ["ivm7", "♭VII7", "IM7"],
  );
  assertEquals(
    getChordProgressionDirectRomanSymbols("twelveBarBlues"),
    ["I7", "IV7", "I7", "V7", "IV7", "I7", "V7"],
  );
  assertEquals(
    getChordProgressionDirectRomanSymbols("minorBlues"),
    ["im7", "ivm7", "im7", "iiø7", "V7", "im7", "V7"],
  );
  assertEquals(
    getChordProgressionDirectRomanSymbols("jazzBlues"),
    [
      "I7",
      "IV7",
      "I7",
      "IV7",
      "♯iv°7",
      "I7",
      "VI7",
      "iim7",
      "V7",
      "I7",
      "VI7",
      "iim7",
      "V7",
    ],
  );
  assertEquals(
    getChordProgressionDirectRomanSymbols("autumnLeavesA"),
    ["ivm7", "♭VII7", "♭IIIM7", "♭VIM7", "iiø7", "V7", "i"],
  );
  assertEquals(
    getChordProgressionDirectRomanSymbols("autumnLeavesB"),
    ["iiø7", "V7", "i", "ivm7", "♭VII7", "♭IIIM7", "♭VIM7"],
  );
  assertEquals(
    getChordProgressionDirectRomanSymbols("autumnLeavesC"),
    ["iiø7", "V7", "im7", "VII7", "♭viim7", "VI7", "♭VIM7", "V7", "i"],
  );
  assertEquals(
    getChordProgressionDirectRomanSymbols("rhythmChangesA"),
    [
      "I",
      "vi",
      "iim7",
      "V7",
      "I",
      "vi",
      "iim7",
      "V7",
      "I",
      "I7",
      "IV",
      "iv",
      "I",
      "V7",
      "I",
    ],
  );
  assertEquals(
    getChordProgressionDirectRomanSymbols("rhythmChangesBridge"),
    ["III7", "VI7", "II7", "V7"],
  );
  assertEquals(
    getChordProgressionRomanSymbols("oneOneFiveFiveDominant7"),
    ["I", "V", "V7"],
  );
  assertEquals(
    getChordProgressionRomanSymbols("autumnLeavesA"),
    ["ivm7", "♭VII7", "♭IIIM7", "♭VIM7", "iiø7", "V7", "i"],
  );
  assertEquals(
    getChordProgressionRomanSymbols("autumnLeavesB"),
    ["iiø7", "V7", "i", "ivm7", "♭VII7", "♭IIIM7", "♭VIM7"],
  );
  assertEquals(
    getChordProgressionRomanSymbols("autumnLeavesC"),
    ["iiø7", "V7", "im7", "VII7", "♭viim7", "VI7", "♭VIM7", "V7", "i"],
  );
  assertEquals(
    getChordProgressionRomanSymbols("rhythmChangesA"),
    [
      "I",
      "vi",
      "iim7",
      "V7",
      "I",
      "vi",
      "iim7",
      "V7",
      "I",
      "V7/IV",
      "IV",
      "iv",
      "I",
      "V7",
      "I",
    ],
  );
  assertEquals(
    getChordProgressionRomanSymbols("rhythmChangesBridge"),
    ["V7/vi", "V7/ii", "V7/V", "V7"],
  );
  assertEquals(
    getChordProgressionRomanSymbols("jazzBlues"),
    [
      "I7",
      "IV7",
      "I7",
      "IV7",
      "♯iv°7",
      "I7",
      "V7/ii",
      "iim7",
      "V7",
      "I7",
      "V7/ii",
      "iim7",
      "V7",
    ],
  );

  const richerChordCollectionProgression = {
    chords: [
      { degree: "1", chordCollectionKey: "major6", durationInBars: 1 },
      { degree: "6", chordCollectionKey: "minor6", durationInBars: 1 },
      {
        degree: "3",
        chordCollectionKey: "augmentedMajor7",
        durationInBars: 1,
      },
      { degree: "♭7", chordCollectionKey: "major", durationInBars: 1 },
    ],
  } satisfies ChordProgression;

  assertEquals(
    getChordProgressionDirectRomanSymbols(richerChordCollectionProgression),
    ["I6", "vim6", "III+M7", "♭VII"],
  );
  assertEquals(
    getChordProgressionChordNames("C", richerChordCollectionProgression),
    ["C6", "Am6", "E+M7", "B♭M"],
  );

  const doubleAccidentalProgression = {
    chords: [
      { degree: "♯5", chordCollectionKey: "major", durationInBars: 1 },
    ],
  } satisfies ChordProgression;

  assertEquals(
    getChordProgressionChordNames("B", doubleAccidentalProgression),
    ["F𝄪M"],
  );
  assertEquals(
    getChordProgressionChordChangeReferences(
      "B",
      doubleAccidentalProgression,
    ),
    [{
      rootNote: "F𝄪",
      chordName: "F𝄪M",
      chordCollectionKey: "major",
    }],
  );

  const naturalDegreeProgression = {
    chords: [
      { degree: "♮3", chordCollectionKey: "major", durationInBars: 1 },
    ],
  } satisfies ChordProgression;

  assertEquals(
    getChordProgressionDirectRomanSymbols(naturalDegreeProgression),
    ["III"],
  );

  const invalidDegreeProgression = {
    chords: [
      { degree: "M3", chordCollectionKey: "major", durationInBars: 1 },
    ],
  } as unknown as ChordProgression;

  assertThrows(
    () => getChordProgressionDirectRomanSymbols(invalidDegreeProgression),
    Error,
    "Invalid chord degree: M3",
  );

  assertEquals(getChordProgressionKeysForTotalBars(2), [
    "authenticCadence",
    "plagalCadence",
    "deceptiveCadence",
  ]);
  assertEquals(getChordProgressionKeysForTotalBars(4), [
    "oneOneFiveFive",
    "oneOneFiveFiveDominant7",
    "oneOneFourFour",
    "oneOneFourFiveDominant7",
    "oneFourFiveDominant7Six",
    "oneFourOneFive",
    "oneSixFourFive",
    "oneFiveSixFour",
    "oneSixTwoFive",
    "sixTwoFiveOne",
    "andalusianCadence",
    "majorTwoFiveOne",
    "minorTwoFiveOne",
    "backdoorTwoFiveOne",
  ]);
  assertEquals(getChordProgressionKeysForTotalBars(8), [
    "oneFourOneFiveSplitReturn",
    "circleOfFifths",
    "minorCircleOfFifths",
    "pachelbelCanon",
    "autumnLeavesA",
    "autumnLeavesB",
    "autumnLeavesC",
    "rhythmChangesA",
    "rhythmChangesBridge",
  ]);
  assertEquals(getChordProgressionKeysForTotalBars(12), [
    "twelveBarBlues",
    "twelveBarBluesQuickChange",
    "minorBlues",
    "jazzBlues",
  ]);
  assertEquals(getChordProgressionKeysForTotalBars(32), []);
  assertEquals(getChordProgressionKeysForTotalBars(16), []);
  assertEquals(getChordProgressionKeysForCategory("cadences"), [
    "authenticCadence",
    "plagalCadence",
    "deceptiveCadence",
  ]);
  assertEquals(getChordProgressionKeysForCategory("commonLoops"), [
    "oneOneFiveFive",
    "oneOneFiveFiveDominant7",
    "oneOneFourFour",
    "oneOneFourFiveDominant7",
    "oneFourFiveDominant7Six",
    "oneFourOneFive",
    "oneSixFourFive",
    "oneFiveSixFour",
    "oneFourOneFiveSplitReturn",
    "pachelbelCanon",
    "andalusianCadence",
  ]);
  assertEquals(getChordProgressionKeysForCategory("turnaroundsAndCycles"), [
    "oneSixTwoFive",
    "sixTwoFiveOne",
    "circleOfFifths",
    "minorCircleOfFifths",
  ]);
  assertEquals(getChordProgressionKeysForCategory("jazz"), [
    "majorTwoFiveOne",
    "minorTwoFiveOne",
    "backdoorTwoFiveOne",
    "autumnLeavesA",
    "autumnLeavesB",
    "autumnLeavesC",
    "rhythmChangesA",
    "rhythmChangesBridge",
  ]);
  assertEquals(getChordProgressionKeysForCategory("blues"), [
    "twelveBarBlues",
    "twelveBarBluesQuickChange",
    "minorBlues",
    "jazzBlues",
  ]);
  assertEquals(
    getChordProgressionChordNames("C", "andalusianCadence"),
    ["Cm", "B♭M", "A♭M", "GM"],
  );
  assertEquals(
    getChordProgressionChordNames("G", "oneOneFiveFiveDominant7"),
    ["GM", "DM", "D7"],
  );
  assertEquals(
    getChordProgressionChordNames("C", "oneFourOneFiveSplitReturn"),
    ["CM", "FM", "CM", "GM", "CM", "FM", "CM", "GM", "CM"],
  );
  assertEquals(
    getChordProgressionChordNames("C", "sixTwoFiveOne"),
    ["Am", "Dm", "GM", "CM"],
  );
  assertEquals(
    getChordProgressionChordNames("C", "circleOfFifths"),
    ["CM", "FM", "B°", "Em", "Am", "Dm", "GM", "CM"],
  );
  assertEquals(
    getChordProgressionChordNames("C", "minorCircleOfFifths"),
    ["Cm", "Fm7", "B♭7", "E♭M7", "A♭M7", "Dø7", "G7", "Cm"],
  );
  assertEquals(
    getChordProgressionChordNames("C", "pachelbelCanon"),
    ["CM", "GM", "Am", "Em", "FM", "CM", "FM", "GM"],
  );
  assertEquals(
    getChordProgressionChordNames("C", "backdoorTwoFiveOne"),
    ["Fm7", "B♭7", "CM7"],
  );
  assertEquals(
    getChordProgressionChordNames("G", "autumnLeavesA"),
    ["Cm7", "F7", "B♭M7", "E♭M7", "Aø7", "D7", "Gm"],
  );
  assertEquals(
    getChordProgressionChordNames("G", "autumnLeavesC"),
    ["Aø7", "D7", "Gm7", "F♯7", "Fm7", "E7", "E♭M7", "D7", "Gm"],
  );
  assertEquals(
    ([
      "D♭",
      "E♭",
      "F♭",
      "G♭",
      "A♭",
      "B♭",
      "C♭",
    ] as const satisfies readonly RootNote[]).map((rootNote) =>
      getChordProgressionChordNames(rootNote, "autumnLeavesC")[3]
    ),
    ["C7", "D7", "E♭7", "F7", "G7", "A7", "B♭7"],
  );
  assertEquals(
    getChordProgressionUniqueChordNames("G", "oneOneFiveFiveDominant7"),
    ["GM", "DM", "D7"],
  );
  assertEquals(
    getChordProgressionUniqueChordNames("C", "oneFourOneFiveSplitReturn"),
    ["CM", "FM", "GM"],
  );
  assertEquals(
    getChordProgressionChordChangeReferences(
      "G",
      "oneOneFiveFiveDominant7",
    ),
    [
      {
        rootNote: "G",
        chordName: "GM",
        chordCollectionKey: "major",
      },
      {
        rootNote: "D",
        chordName: "DM",
        chordCollectionKey: "major",
      },
      {
        rootNote: "D",
        chordName: "D7",
        chordCollectionKey: "dominant7",
      },
    ],
  );
  assertEquals(
    getChordProgressionChordChangeReferences("C", "oneOneFiveFive"),
    [
      cMajorReference,
      gMajorReference,
    ],
  );
  assertEquals(
    getChordProgressionChordReferencesByBar("C", "oneOneFiveFive"),
    [
      [cMajorReference],
      [cMajorReference],
      [gMajorReference],
      [gMajorReference],
    ],
  );
  assertEquals(
    getChordProgressionSongChordReferences("C", "oneOneFiveFive"),
    [
      cMajorReference,
      cMajorReference,
      gMajorReference,
      gMajorReference,
    ],
  );
  assertEquals(
    getChordProgressionUniqueChordReferences("C", "oneOneFiveFive"),
    [
      cMajorReference,
      gMajorReference,
    ],
  );
  assertEquals(
    getChordProgressionChordChangeReferences("C", "oneFourOneFive"),
    [
      cMajorReference,
      fMajorReference,
      cMajorReference,
      gMajorReference,
    ],
  );
  assertEquals(
    getChordProgressionUniqueChordReferences("C", "oneFourOneFive"),
    [
      cMajorReference,
      fMajorReference,
      gMajorReference,
    ],
  );
  assertEquals(
    getChordProgressionChordReferencesByBar(
      "C",
      "oneFourOneFiveSplitReturn",
    ),
    [
      [cMajorReference],
      [fMajorReference],
      [cMajorReference],
      [gMajorReference],
      [cMajorReference],
      [fMajorReference],
      [cMajorReference, gMajorReference],
      [cMajorReference],
    ],
  );
  assertEquals(
    getChordProgressionChordReferencesByBar("C", "authenticCadence"),
    [
      [gDominant7Reference],
      [cMajorReference],
    ],
  );
  assertEquals(
    getChordProgressionChordReferencesByBar("C", "plagalCadence"),
    [
      [fMajorReference],
      [cMajorReference],
    ],
  );
  assertEquals(
    getChordProgressionChordReferencesByBar("C", "deceptiveCadence"),
    [
      [gDominant7Reference],
      [aMinorReference],
    ],
  );
  assertEquals(
    getChordProgressionChordReferencesByBar("C", "oneOneFourFour"),
    [
      [cMajorReference],
      [cMajorReference],
      [fMajorReference],
      [fMajorReference],
    ],
  );
  assertEquals(
    getChordProgressionChordReferencesByBar(
      "C",
      "oneOneFourFiveDominant7",
    ),
    [
      [cMajorReference],
      [cMajorReference],
      [fMajorReference],
      [gDominant7Reference],
    ],
  );
  assertEquals(
    getChordProgressionChordReferencesByBar(
      "C",
      "oneFourFiveDominant7Six",
    ),
    [
      [cMajorReference],
      [fMajorReference],
      [gDominant7Reference],
      [aMinorReference],
    ],
  );
  assertEquals(
    getChordProgressionChordReferencesByBar("C", "twelveBarBlues").length,
    12,
  );
  assertEquals(
    getChordProgressionChordReferencesByBar("C", "minorBlues").length,
    12,
  );
  assertEquals(
    getChordProgressionChordReferencesByBar("C", "jazzBlues").length,
    12,
  );
  assertEquals(
    getChordProgressionChordReferencesByBar("C", "circleOfFifths").length,
    8,
  );
  assertEquals(
    getChordProgressionChordReferencesByBar("C", "minorCircleOfFifths")
      .length,
    8,
  );
  assertEquals(
    getChordProgressionChordReferencesByBar("C", "pachelbelCanon").length,
    8,
  );
  assertEquals(
    getChordProgressionChordReferencesByBar("C", "rhythmChangesA").length,
    8,
  );
  assertEquals(
    getChordProgressionChordReferencesByBar("C", "rhythmChangesBridge").length,
    8,
  );
  assertEquals(
    getChordProgressionUniqueChordReferences("C", "oneFourOneFiveSplitReturn"),
    [
      cMajorReference,
      fMajorReference,
      gMajorReference,
    ],
  );
  assertEquals(
    getChordProgressionUniqueChordReferences("C", "twelveBarBlues"),
    [
      cDominant7Reference,
      fDominant7Reference,
      gDominant7Reference,
    ],
  );
  assertEquals(getChordProgressionTotalDurationInBars("twelveBarBlues"), 12);
  assertEquals(
    getChordProgressionTotalDurationInBars("twelveBarBluesQuickChange"),
    12,
  );
  assertEquals(getChordProgressionTotalDurationInBars("minorBlues"), 12);
  assertEquals(getChordProgressionTotalDurationInBars("jazzBlues"), 12);
  assertEquals(
    getChordProgressionTotalDurationInBars("authenticCadence"),
    2,
  );
  assertEquals(getChordProgressionTotalDurationInBars("plagalCadence"), 2);
  assertEquals(getChordProgressionTotalDurationInBars("deceptiveCadence"), 2);
  assertEquals(getChordProgressionTotalDurationInBars("oneOneFourFour"), 4);
  assertEquals(
    getChordProgressionTotalDurationInBars("oneOneFourFiveDominant7"),
    4,
  );
  assertEquals(
    getChordProgressionTotalDurationInBars("oneFourFiveDominant7Six"),
    4,
  );
  assertEquals(getChordProgressionTotalDurationInBars("andalusianCadence"), 4);
  assertEquals(getChordProgressionTotalDurationInBars("majorTwoFiveOne"), 4);
  assertEquals(getChordProgressionTotalDurationInBars("backdoorTwoFiveOne"), 4);
  assertEquals(getChordProgressionTotalDurationInBars("circleOfFifths"), 8);
  assertEquals(
    getChordProgressionTotalDurationInBars("minorCircleOfFifths"),
    8,
  );
  assertEquals(getChordProgressionTotalDurationInBars("pachelbelCanon"), 8);
  assertEquals(getChordProgressionTotalDurationInBars("autumnLeavesA"), 8);
  assertEquals(getChordProgressionTotalDurationInBars("autumnLeavesB"), 8);
  assertEquals(getChordProgressionTotalDurationInBars("autumnLeavesC"), 8);
  assertEquals(getChordProgressionTotalDurationInBars("rhythmChangesA"), 8);
  assertEquals(
    getChordProgressionTotalDurationInBars("rhythmChangesBridge"),
    8,
  );
  assertEquals(
    getChordProgressionTotalDurationInBars("oneFourOneFiveSplitReturn"),
    8,
  );
});

Deno.test("chord progression focus object exposes progression derivations", () => {
  assertEquals(chordProgression.isValidKey("autumnLeavesA"), true);
  assertEquals(chordProgression.isValidKey("ionian"), false);
  assertEquals(chordProgression.getDirectRomanSymbols("autumnLeavesA"), [
    "ivm7",
    "♭VII7",
    "♭IIIM7",
    "♭VIM7",
    "iiø7",
    "V7",
    "i",
  ]);
  assertEquals(chordProgression.getRomanSymbols("autumnLeavesA"), [
    "ivm7",
    "♭VII7",
    "♭IIIM7",
    "♭VIM7",
    "iiø7",
    "V7",
    "i",
  ]);
  assertEquals(chordProgression.getChordNames("C", "oneSixFourFive"), [
    "CM",
    "Am",
    "FM",
    "GM",
  ]);
  assertEquals(chordProgression.getUniqueChordNames("C", "oneFourOneFive"), [
    "CM",
    "FM",
    "GM",
  ]);
  assertEquals(
    chordProgression.getChordChangeReferences("C", "oneOneFiveFive"),
    [
      cMajorReference,
      gMajorReference,
    ],
  );
  assertEquals(
    chordProgression.getUniqueChordReferences("C", "oneOneFiveFive"),
    [
      cMajorReference,
      gMajorReference,
    ],
  );
  assertEquals(
    chordProgression.getChordReferencesByBar("C", "oneOneFiveFive"),
    [
      [cMajorReference],
      [cMajorReference],
      [gMajorReference],
      [gMajorReference],
    ],
  );
  assertEquals(
    chordProgression.getSongChordReferences("C", "oneOneFiveFive"),
    [
      cMajorReference,
      cMajorReference,
      gMajorReference,
      gMajorReference,
    ],
  );
  assertEquals(chordProgression.getTotalDurationInBars("oneOneFiveFive"), 4);
  assertEquals(chordProgression.getKeysForTotalBars(2), [
    "authenticCadence",
    "plagalCadence",
    "deceptiveCadence",
  ]);
  assertEquals(chordProgression.getKeysForCategory("cadences"), [
    "authenticCadence",
    "plagalCadence",
    "deceptiveCadence",
  ]);
});
