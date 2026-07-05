import { assertEquals, assertThrows } from "@std/assert";
import {
  chordProgressionBarGroups,
  chordProgressionCategoryGroups,
  chordProgressions,
} from "../src/data/chord-progressions/mod.ts";
import type { ChordProgression } from "../src/types/chord-progressions.d.ts";
import {
  getChordProgressionChordChangeReferences,
  getChordProgressionChordNames,
  getChordProgressionChordReferencesByBar,
  getChordProgressionDirectRomanSymbols,
  getChordProgressionDisplayRomanSymbols,
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
  noteCollectionKey: "major",
} as const;

const fMajorReference = {
  rootNote: "F",
  chordName: "FM",
  noteCollectionKey: "major",
} as const;

const gMajorReference = {
  rootNote: "G",
  chordName: "GM",
  noteCollectionKey: "major",
} as const;

const cDominant7Reference = {
  rootNote: "C",
  chordName: "C7",
  noteCollectionKey: "dominant7",
} as const;

const fDominant7Reference = {
  rootNote: "F",
  chordName: "F7",
  noteCollectionKey: "dominant7",
} as const;

const gDominant7Reference = {
  rootNote: "G",
  chordName: "G7",
  noteCollectionKey: "dominant7",
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
  assertEquals(isValidChordProgressionKey("oneFourOneFiveSplitReturn"), true);
  assertEquals(isValidChordProgressionKey("circleOfFifths"), true);
  assertEquals(isValidChordProgressionKey("pachelbelCanon"), true);
  assertEquals(isValidChordProgressionKey("backdoorTwoFiveOne"), true);
  assertEquals(isValidChordProgressionKey("twelveBarBluesQuickChange"), true);
  assertEquals(isValidChordProgressionKey("minorBlues"), true);
  assertEquals(isValidChordProgressionKey("jazzBlues"), true);
  assertEquals(isValidChordProgressionKey("autumnLeavesA"), true);
  assertEquals(isValidChordProgressionKey("autumnLeavesB"), true);
  assertEquals(isValidChordProgressionKey("rhythmChangesA"), true);
  assertEquals(isValidChordProgressionKey("rhythmChangesBridge"), true);
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
    chordProgressions.oneOneFourFive.commonName,
    undefined,
  );
  assertEquals(
    chordProgressions.circleOfFifths.commonName,
    "Circle of Fifths Progression",
  );
  assertEquals(
    chordProgressions.pachelbelCanon.commonName,
    "Pachelbel Canon",
  );
  assertEquals(
    chordProgressions.backdoorTwoFiveOne.commonName,
    "Backdoor ii-V-I",
  );
  assertEquals(
    chordProgressions.twelveBarBlues.commonName,
    "12 Bar Blues",
  );
  assertEquals(
    chordProgressions.twelveBarBluesQuickChange.commonName,
    "12 Bar Blues Quick Change",
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
    "Autumn Leaves A Section",
  );
  assertEquals(
    chordProgressions.autumnLeavesB.commonName,
    "Autumn Leaves B Section",
  );
  assertEquals(
    chordProgressions.rhythmChangesA.commonName,
    "Rhythm Changes A Section",
  );
  assertEquals(
    chordProgressions.rhythmChangesBridge.commonName,
    "Rhythm Changes Bridge",
  );
  assertEquals(chordProgressions.authenticCadence.category, "cadences");
  assertEquals(chordProgressions.andalusianCadence.category, "cadences");
  assertEquals(chordProgressions.oneOneFiveFive.category, "commonLoops");
  assertEquals(chordProgressions.oneSixFourFive.category, "commonLoops");
  assertEquals(chordProgressions.oneSixTwoFive.category, "commonLoops");
  assertEquals(chordProgressions.autumnLeavesA.category, "jazz");
  assertEquals(chordProgressions.backdoorTwoFiveOne.category, "jazz");
  assertEquals(chordProgressions.rhythmChangesA.category, "jazz");
  assertEquals(chordProgressions.twelveBarBlues.category, "blues");
  assertEquals(chordProgressions.minorBlues.category, "blues");
  assertEquals(chordProgressions.jazzBlues.category, "blues");
  assertEquals(
    chordProgressions.autumnLeavesA.chords.map((chord) =>
      chord.analysis?.romanSymbol
    ),
    [undefined, undefined, undefined, undefined, "iiø7/vi", "V7/vi", undefined],
  );
  assertEquals(
    chordProgressions.autumnLeavesB.chords.map((chord) =>
      chord.analysis?.romanSymbol
    ),
    ["iiø7/vi", "V7/vi", undefined, undefined, undefined, undefined, undefined],
  );
  assertEquals(
    chordProgressions.rhythmChangesA.chords.some((chord) =>
      chord.analysis !== undefined
    ),
    false,
  );
  assertEquals(
    chordProgressions.rhythmChangesBridge.chords.some((chord) =>
      chord.analysis !== undefined
    ),
    false,
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
        "oneOneFourFive",
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
        "pachelbelCanon",
        "autumnLeavesA",
        "autumnLeavesB",
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
      name: "Common Loops & Sequences",
      description:
        "Reusable diatonic and modal loops, pop progressions, and root-motion sequences.",
      progressionKeys: [
        "oneOneFiveFive",
        "oneOneFiveFiveDominant7",
        "oneOneFourFour",
        "oneOneFourFive",
        "oneFourOneFive",
        "oneSixFourFive",
        "oneFiveSixFour",
        "oneSixTwoFive",
        "sixTwoFiveOne",
        "oneFourOneFiveSplitReturn",
        "circleOfFifths",
        "pachelbelCanon",
      ],
    },
    {
      category: "cadences",
      name: "Cadences",
      description:
        "Short resolution patterns for tonic arrival, plagal motion, deceptive motion, and modal minor closure.",
      progressionKeys: [
        "authenticCadence",
        "plagalCadence",
        "deceptiveCadence",
        "andalusianCadence",
      ],
    },
    {
      category: "blues",
      name: "Blues Forms",
      description:
        "Blues forms built from dominant-function tonic, subdominant, and dominant areas.",
      progressionKeys: [
        "twelveBarBlues",
        "twelveBarBluesQuickChange",
        "minorBlues",
        "jazzBlues",
      ],
    },
    {
      category: "jazz",
      name: "Jazz Cadences & Standards",
      description:
        "Seventh-chord cadences and reusable sections from foundational jazz-standard forms.",
      progressionKeys: [
        "majorTwoFiveOne",
        "minorTwoFiveOne",
        "backdoorTwoFiveOne",
        "autumnLeavesA",
        "autumnLeavesB",
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
    getChordProgressionDirectRomanSymbols("oneFourOneFiveSplitReturn"),
    ["I", "IV", "I", "V", "I", "IV", "I", "V", "I"],
  );
  assertEquals(
    getChordProgressionDirectRomanSymbols("circleOfFifths"),
    ["I", "IV", "vii°", "iii", "vi", "ii", "V", "I"],
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
    [
      "im7",
      "ivm7",
      "im7",
      "im7",
      "ivm7",
      "ivm7",
      "im7",
      "im7",
      "♭VI7",
      "V7",
      "im7",
      "V7",
    ],
  );
  assertEquals(
    getChordProgressionDirectRomanSymbols("jazzBlues"),
    [
      "I7",
      "IV7",
      "I7",
      "vm7",
      "I7",
      "IV7",
      "♯iv°7",
      "I7",
      "VI7",
      "iim7",
      "V7",
      "iiim7",
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
    ["iim7", "V7", "IM7", "IVM7", "viiø7", "III7", "vi"],
  );
  assertEquals(
    getChordProgressionDirectRomanSymbols("autumnLeavesB"),
    ["viiø7", "III7", "vi", "iim7", "V7", "IM7", "IVM7"],
  );
  assertEquals(
    getChordProgressionDirectRomanSymbols("rhythmChangesA"),
    [
      "I",
      "VI7",
      "iim7",
      "V7",
      "iiim7",
      "VI7",
      "iim7",
      "V7",
      "I",
      "I7",
      "IV",
      "iv",
      "I",
      "V7",
      "I",
      "V7",
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
    ["iim7", "V7", "IM7", "IVM7", "iiø7/vi", "V7/vi", "vi"],
  );
  assertEquals(
    getChordProgressionDisplayRomanSymbols("oneOneFiveFiveDominant7"),
    ["I", "V", "V7"],
  );
  assertEquals(
    getChordProgressionDisplayRomanSymbols("autumnLeavesA"),
    ["iim7", "V7", "IM7", "IVM7", "iiø7/vi", "V7/vi", "vi"],
  );
  assertEquals(
    getChordProgressionDisplayRomanSymbols("autumnLeavesB"),
    ["iiø7/vi", "V7/vi", "vi", "iim7", "V7", "IM7", "IVM7"],
  );
  assertEquals(
    getChordProgressionDisplayRomanSymbols("rhythmChangesA"),
    getChordProgressionDirectRomanSymbols("rhythmChangesA"),
  );
  assertEquals(
    getChordProgressionDisplayRomanSymbols("rhythmChangesBridge"),
    getChordProgressionDirectRomanSymbols("rhythmChangesBridge"),
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
    "oneOneFourFive",
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
    "pachelbelCanon",
    "autumnLeavesA",
    "autumnLeavesB",
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
    "andalusianCadence",
  ]);
  assertEquals(getChordProgressionKeysForCategory("commonLoops"), [
    "oneOneFiveFive",
    "oneOneFiveFiveDominant7",
    "oneOneFourFour",
    "oneOneFourFive",
    "oneFourOneFive",
    "oneSixFourFive",
    "oneFiveSixFour",
    "oneSixTwoFive",
    "sixTwoFiveOne",
    "oneFourOneFiveSplitReturn",
    "circleOfFifths",
    "pachelbelCanon",
  ]);
  assertEquals(getChordProgressionKeysForCategory("jazz"), [
    "majorTwoFiveOne",
    "minorTwoFiveOne",
    "backdoorTwoFiveOne",
    "autumnLeavesA",
    "autumnLeavesB",
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
    getChordProgressionChordNames("C", "pachelbelCanon"),
    ["CM", "GM", "Am", "Em", "FM", "CM", "FM", "GM"],
  );
  assertEquals(
    getChordProgressionChordNames("C", "backdoorTwoFiveOne"),
    ["Fm7", "B♭7", "CM7"],
  );
  assertEquals(
    getChordProgressionChordNames("G", "autumnLeavesA"),
    ["Am7", "D7", "GM7", "CM7", "F♯ø7", "B7", "Em"],
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
        noteCollectionKey: "major",
      },
      {
        rootNote: "D",
        chordName: "DM",
        noteCollectionKey: "major",
      },
      {
        rootNote: "D",
        chordName: "D7",
        noteCollectionKey: "dominant7",
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
  assertEquals(getChordProgressionTotalDurationInBars("andalusianCadence"), 4);
  assertEquals(getChordProgressionTotalDurationInBars("majorTwoFiveOne"), 4);
  assertEquals(getChordProgressionTotalDurationInBars("backdoorTwoFiveOne"), 4);
  assertEquals(getChordProgressionTotalDurationInBars("circleOfFifths"), 8);
  assertEquals(getChordProgressionTotalDurationInBars("pachelbelCanon"), 8);
  assertEquals(getChordProgressionTotalDurationInBars("autumnLeavesA"), 8);
  assertEquals(getChordProgressionTotalDurationInBars("autumnLeavesB"), 8);
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
