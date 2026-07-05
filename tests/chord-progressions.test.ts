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
  assertEquals(isValidChordProgressionKey("oneSixFourFive"), true);
  assertEquals(isValidChordProgressionKey("oneFiveSixFour"), true);
  assertEquals(isValidChordProgressionKey("oneSixTwoFive"), true);
  assertEquals(isValidChordProgressionKey("sixTwoFiveOne"), true);
  assertEquals(isValidChordProgressionKey("oneOneFiveFiveDominant7"), true);
  assertEquals(isValidChordProgressionKey("oneFourOneFiveSplitReturn"), true);
  assertEquals(isValidChordProgressionKey("twelveBarBluesQuickChange"), true);
  assertEquals(isValidChordProgressionKey("autumnLeavesA"), true);
  assertEquals(isValidChordProgressionKey("autumnLeavesB"), true);
  assertEquals(isValidChordProgressionKey("rhythmChanges"), true);
  assertEquals(isValidChordProgressionKey("ionian"), false);
});

Deno.test("progression exports are available directly", () => {
  assertEquals(
    chordProgressions.oneOneFourFive.commonName,
    undefined,
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
    chordProgressions.autumnLeavesA.commonName,
    "Autumn Leaves A Section",
  );
  assertEquals(
    chordProgressions.autumnLeavesB.commonName,
    "Autumn Leaves B Section",
  );
  assertEquals(
    chordProgressions.rhythmChanges.commonName,
    "Rhythm Changes",
  );
  assertEquals(chordProgressions.oneOneFiveFive.category, "fundamentals");
  assertEquals(chordProgressions.oneSixFourFive.category, "popular");
  assertEquals(chordProgressions.autumnLeavesA.category, "jazz");
  assertEquals(chordProgressions.twelveBarBlues.category, "blues");
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
        "majorTwoFiveOne",
        "minorTwoFiveOne",
      ],
    },
    {
      totalBars: 8,
      progressionKeys: [
        "oneFourOneFiveSplitReturn",
        "autumnLeavesA",
        "autumnLeavesB",
      ],
    },
    {
      totalBars: 12,
      progressionKeys: ["twelveBarBlues", "twelveBarBluesQuickChange"],
    },
    {
      totalBars: 32,
      progressionKeys: ["rhythmChanges"],
    },
  ]);
});

Deno.test("progressions are grouped by musical category", () => {
  assertEquals(chordProgressionCategoryGroups, [
    {
      category: "fundamentals",
      name: "Fundamentals",
      description:
        "Small tonic, subdominant, and dominant patterns for core harmonic motion.",
      progressionKeys: [
        "oneOneFiveFive",
        "oneOneFiveFiveDominant7",
        "oneOneFourFour",
        "oneOneFourFive",
        "oneFourOneFive",
        "oneFourOneFiveSplitReturn",
      ],
    },
    {
      category: "popular",
      name: "Popular Loops",
      description:
        "Common diatonic loops used widely in popular, rock, folk, and songwriting contexts.",
      progressionKeys: [
        "oneSixFourFive",
        "oneFiveSixFour",
      ],
    },
    {
      category: "jazz",
      name: "Jazz & Turnarounds",
      description:
        "ii-V motion, turnarounds, and jazz-standard forms with richer chord collections.",
      progressionKeys: [
        "oneSixTwoFive",
        "sixTwoFiveOne",
        "majorTwoFiveOne",
        "minorTwoFiveOne",
        "autumnLeavesA",
        "autumnLeavesB",
        "rhythmChanges",
      ],
    },
    {
      category: "blues",
      name: "Blues",
      description:
        "Blues forms built from dominant-function tonic, subdominant, and dominant areas.",
      progressionKeys: ["twelveBarBlues", "twelveBarBluesQuickChange"],
    },
  ]);
});

Deno.test("progression helpers expose chord names and total duration", () => {
  assertEquals(
    getChordProgressionDirectRomanSymbols("oneOneFiveFiveDominant7"),
    ["I", "V", "V7"],
  );
  assertEquals(
    getChordProgressionDirectRomanSymbols("oneFourOneFiveSplitReturn"),
    ["I", "IV", "I", "V", "I", "IV", "I", "V", "I"],
  );
  assertEquals(
    getChordProgressionDirectRomanSymbols("twelveBarBlues"),
    ["I7", "IV7", "I7", "V7", "IV7", "I7", "V7"],
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
    getChordProgressionDirectRomanSymbols("rhythmChanges").slice(8, 12),
    ["I", "I7", "IV", "♯iv°7"],
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
    "majorTwoFiveOne",
    "minorTwoFiveOne",
  ]);
  assertEquals(getChordProgressionKeysForTotalBars(8), [
    "oneFourOneFiveSplitReturn",
    "autumnLeavesA",
    "autumnLeavesB",
  ]);
  assertEquals(getChordProgressionKeysForTotalBars(12), [
    "twelveBarBlues",
    "twelveBarBluesQuickChange",
  ]);
  assertEquals(getChordProgressionKeysForTotalBars(32), ["rhythmChanges"]);
  assertEquals(getChordProgressionKeysForTotalBars(16), []);
  assertEquals(getChordProgressionKeysForCategory("fundamentals"), [
    "oneOneFiveFive",
    "oneOneFiveFiveDominant7",
    "oneOneFourFour",
    "oneOneFourFive",
    "oneFourOneFive",
    "oneFourOneFiveSplitReturn",
  ]);
  assertEquals(getChordProgressionKeysForCategory("popular"), [
    "oneSixFourFive",
    "oneFiveSixFour",
  ]);
  assertEquals(getChordProgressionKeysForCategory("jazz"), [
    "oneSixTwoFive",
    "sixTwoFiveOne",
    "majorTwoFiveOne",
    "minorTwoFiveOne",
    "autumnLeavesA",
    "autumnLeavesB",
    "rhythmChanges",
  ]);
  assertEquals(getChordProgressionKeysForCategory("blues"), [
    "twelveBarBlues",
    "twelveBarBluesQuickChange",
  ]);
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
    getChordProgressionChordReferencesByBar("C", "rhythmChanges").length,
    32,
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
  assertEquals(getChordProgressionTotalDurationInBars("majorTwoFiveOne"), 4);
  assertEquals(getChordProgressionTotalDurationInBars("autumnLeavesA"), 8);
  assertEquals(getChordProgressionTotalDurationInBars("autumnLeavesB"), 8);
  assertEquals(getChordProgressionTotalDurationInBars("rhythmChanges"), 32);
  assertEquals(
    getChordProgressionTotalDurationInBars("oneFourOneFiveSplitReturn"),
    8,
  );
});
