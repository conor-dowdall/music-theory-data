import { assertEquals } from "@std/assert";
import {
  chordProgressionBarGroups,
  chordProgressions,
} from "../src/data/chord-progressions/mod.ts";
import {
  getChordProgressionChordChangeReferences,
  getChordProgressionChordNames,
  getChordProgressionChordReferencesByBar,
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
  assertEquals(isValidChordProgressionKey("rhythmChanges"), false);
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
    chordProgressions.oneSixTwoFive.chords.map((chord) => chord.romanSymbol),
    [
      "I",
      "vi",
      "ii",
      "V",
    ],
  );
  assertEquals(
    chordProgressions.majorTwoFiveOne.chords.map((chord) => chord.romanSymbol),
    [
      "iim7",
      "V7",
      "IM7",
    ],
  );
  assertEquals(chordProgressions.twelveBarBluesQuickChange.chords, [
    { romanSymbol: "I7", degree: "1", quality: "7", durationInBars: 1 },
    { romanSymbol: "IV7", degree: "4", quality: "7", durationInBars: 1 },
    { romanSymbol: "I7", degree: "1", quality: "7", durationInBars: 2 },
    { romanSymbol: "IV7", degree: "4", quality: "7", durationInBars: 2 },
    { romanSymbol: "I7", degree: "1", quality: "7", durationInBars: 2 },
    { romanSymbol: "V7", degree: "5", quality: "7", durationInBars: 1 },
    { romanSymbol: "IV7", degree: "4", quality: "7", durationInBars: 1 },
    { romanSymbol: "I7", degree: "1", quality: "7", durationInBars: 1 },
    { romanSymbol: "V7", degree: "5", quality: "7", durationInBars: 1 },
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
      progressionKeys: ["oneFourOneFiveSplitReturn"],
    },
    {
      totalBars: 12,
      progressionKeys: ["twelveBarBlues", "twelveBarBluesQuickChange"],
    },
  ]);
});

Deno.test("progression helpers expose chord names and total duration", () => {
  assertEquals(
    getChordProgressionRomanSymbols("oneOneFiveFiveDominant7"),
    ["I", "V", "V7"],
  );
  assertEquals(
    getChordProgressionRomanSymbols("oneFourOneFiveSplitReturn"),
    ["I", "IV", "I", "V", "I", "IV", "I", "V", "I"],
  );
  assertEquals(
    getChordProgressionRomanSymbols("twelveBarBlues"),
    ["I7", "IV7", "I7", "V7", "IV7", "I7", "V7"],
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
  assertEquals(getChordProgressionKeysForTotalBars(12), [
    "twelveBarBlues",
    "twelveBarBluesQuickChange",
  ]);
  assertEquals(getChordProgressionKeysForTotalBars(16), []);
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
  assertEquals(
    getChordProgressionTotalDurationInBars("oneFourOneFiveSplitReturn"),
    8,
  );
});
