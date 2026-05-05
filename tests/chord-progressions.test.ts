import { assertEquals } from "@std/assert";
import { chordProgressions } from "../src/data/chord-progressions/mod.ts";
import {
  chordQualityNoteCollectionKeys,
  getChordQualityNoteCollectionKey,
} from "../src/data/chords/mod.ts";
import {
  findChordProgression,
  findChordProgressionEntry,
  getChordProgressionChordTimeline,
  getChordProgressionDegreeNames,
  getChordProgressionDurationGroups,
  getChordProgressionEntries,
  getChordProgressionNoteCollectionKeys,
  getChordProgressionPaletteChordNames,
  getChordProgressionRomanNames,
  getChordProgressionTimeline,
  getChordProgressionTotalDurationInBars,
  getRomanNumeralForIntervalAndChordQuality,
  isValidChordProgressionKey,
  searchChordProgressionEntries,
  searchChordProgressions,
} from "../src/utils/chord-progressions.ts";

Deno.test("progression key validation reflects the current dataset", () => {
  assertEquals(isValidChordProgressionKey("dooWop"), true);
  assertEquals(isValidChordProgressionKey("oneOneFiveFiveDominant7"), true);
  assertEquals(isValidChordProgressionKey("oneFourOneFiveEightBar"), true);
  assertEquals(isValidChordProgressionKey("rhythmChanges"), false);
  assertEquals(isValidChordProgressionKey("ionian"), false);
});

Deno.test("progression exports are available directly", () => {
  assertEquals(chordProgressions.oneOneFourFive.primaryName, "I-I-IV-V");
  assertEquals(chordProgressions.dooWop.primaryName, "I-vi-IV-V");
  assertEquals(chordProgressions.oneFourOneFiveEightBar.chords, [
    { degree: "1", quality: "M", durationInBars: 1 },
    { degree: "4", quality: "M", durationInBars: 1 },
    { degree: "1", quality: "M", durationInBars: 1 },
    { degree: "5", quality: "M", durationInBars: 1 },
    { degree: "1", quality: "M", durationInBars: 1 },
    { degree: "4", quality: "M", durationInBars: 1 },
    { degree: "1", quality: "M", durationInBars: 0.5 },
    { degree: "5", quality: "M", durationInBars: 0.5 },
    { degree: "1", quality: "M", durationInBars: 1 },
  ]);
});

Deno.test("canonical note collection keys still resolve from chord quality", () => {
  assertEquals(getChordQualityNoteCollectionKey("M"), "major");
  assertEquals(getChordQualityNoteCollectionKey("+"), "augmentedTriad");
  assertEquals(getChordQualityNoteCollectionKey("7"), "dominant7");
  assertEquals(
    getChordQualityNoteCollectionKey("ø7"),
    "halfDiminished7",
  );
  assertEquals(getChordQualityNoteCollectionKey("m7♭5"), "halfDiminished7");
  assertEquals(getChordQualityNoteCollectionKey("m(M7)"), "minorMajor7");
  assertEquals(getChordQualityNoteCollectionKey("+M7"), "augmentedMajor7");
  assertEquals(getChordQualityNoteCollectionKey("M7♯5"), "augmentedMajor7");
  assertEquals(chordQualityNoteCollectionKeys["°7"], "diminished7");
});

Deno.test("progression search supports text lookup and structural filters", () => {
  assertEquals(
    searchChordProgressions({ query: "ii v i" })[0],
    chordProgressions.majorTwoFiveOne,
  );
  assertEquals(
    findChordProgression({ query: "50s progression" }),
    chordProgressions.dooWop,
  );
  assertEquals(
    searchChordProgressions({ query: "I IV V" })[0],
    chordProgressions.oneOneFourFive,
  );
  assertEquals(
    searchChordProgressions({ query: "12 bar blues" })[0],
    chordProgressions.twelveBarBlues,
  );
  assertEquals(
    searchChordProgressions({ query: "axis progression" })[0],
    chordProgressions.axisProgression,
  );
  assertEquals(
    searchChordProgressions({ totalDurationInBars: 8 }),
    [chordProgressions.oneFourOneFiveEightBar],
  );
  assertEquals(
    searchChordProgressionEntries({ totalDurationInBars: 8 }),
    [
      {
        key: "oneFourOneFiveEightBar",
        progression: chordProgressions.oneFourOneFiveEightBar,
      },
    ],
  );
  assertEquals(
    findChordProgressionEntry({ query: "50s progression" }),
    {
      key: "dooWop",
      progression: chordProgressions.dooWop,
    },
  );
});

Deno.test("progression entry and duration groups support downstream UI", () => {
  assertEquals(getChordProgressionEntries()[0], {
    key: "oneOneFiveFive",
    progression: chordProgressions.oneOneFiveFive,
  });
  assertEquals(getChordProgressionDurationGroups(), [
    {
      totalDurationInBars: 4,
      displayName: "4-Bar Loops",
      progressions: [
        {
          key: "oneOneFiveFive",
          progression: chordProgressions.oneOneFiveFive,
        },
        {
          key: "oneOneFiveFiveDominant7",
          progression: chordProgressions.oneOneFiveFiveDominant7,
        },
        {
          key: "oneOneFourFour",
          progression: chordProgressions.oneOneFourFour,
        },
        {
          key: "oneOneFourFive",
          progression: chordProgressions.oneOneFourFive,
        },
        {
          key: "oneFourOneFive",
          progression: chordProgressions.oneFourOneFive,
        },
        { key: "dooWop", progression: chordProgressions.dooWop },
        {
          key: "axisProgression",
          progression: chordProgressions.axisProgression,
        },
        {
          key: "majorTwoFiveOne",
          progression: chordProgressions.majorTwoFiveOne,
        },
        {
          key: "minorTwoFiveOne",
          progression: chordProgressions.minorTwoFiveOne,
        },
      ],
    },
    {
      totalDurationInBars: 8,
      displayName: "8-Bar Loops",
      progressions: [
        {
          key: "oneFourOneFiveEightBar",
          progression: chordProgressions.oneFourOneFiveEightBar,
        },
      ],
    },
    {
      totalDurationInBars: 12,
      displayName: "12-Bar Loops",
      progressions: [
        {
          key: "twelveBarBlues",
          progression: chordProgressions.twelveBarBlues,
        },
      ],
    },
  ]);
});

Deno.test("progression helpers expose harmonic identity from chords", () => {
  assertEquals(getChordProgressionDegreeNames("oneOneFourFive"), [
    "1M",
    "4M",
    "5M",
  ]);
  assertEquals(getChordProgressionRomanNames("oneOneFourFive"), [
    "I",
    "IV",
    "V",
  ]);
  assertEquals(getChordProgressionRomanNames("majorTwoFiveOne"), [
    "iim7",
    "V7",
    "IM7",
  ]);
});

Deno.test("timeline helpers expose ordered chords and derived chord names", () => {
  const bluesTimeline = getChordProgressionTimeline("twelveBarBlues");
  assertEquals(bluesTimeline.length, 7);
  assertEquals(bluesTimeline[0], {
    degree: "1",
    quality: "7",
    durationInBars: 4,
    startBar: 1,
    endBar: 5,
  });
  assertEquals(getChordProgressionTotalDurationInBars("twelveBarBlues"), 12);
  assertEquals(getChordProgressionTotalDurationInBars("majorTwoFiveOne"), 4);
  assertEquals(
    getChordProgressionTotalDurationInBars("oneFourOneFiveEightBar"),
    8,
  );

  const eightBarTimeline = getChordProgressionTimeline(
    "oneFourOneFiveEightBar",
  );
  assertEquals(eightBarTimeline[6], {
    degree: "1",
    quality: "M",
    durationInBars: 0.5,
    startBar: 7,
    endBar: 7.5,
  });
  assertEquals(eightBarTimeline[7], {
    degree: "5",
    quality: "M",
    durationInBars: 0.5,
    startBar: 7.5,
    endBar: 8,
  });

  const oneLoopTimeline = getChordProgressionChordTimeline(
    "G",
    "oneOneFiveFiveDominant7",
  );
  assertEquals(oneLoopTimeline.map((chord) => chord.chordName), [
    "GM",
    "DM",
    "D7",
  ]);
  assertEquals(
    getChordProgressionPaletteChordNames("G", "oneOneFiveFiveDominant7"),
    ["GM", "DM", "D7"],
  );
  assertEquals(
    getChordProgressionNoteCollectionKeys("oneOneFiveFiveDominant7"),
    ["major", "major", "dominant7"],
  );
  assertEquals(
    getChordProgressionPaletteChordNames("C", "oneFourOneFiveEightBar"),
    ["CM", "FM", "GM"],
  );
});

Deno.test("getRomanNumeralForIntervalAndChordQuality", () => {
  assertEquals(getRomanNumeralForIntervalAndChordQuality("♭7", "M7"), "♭VIIM7");
  assertEquals(getRomanNumeralForIntervalAndChordQuality("2", "ø7"), "iiø7");
  assertEquals(getRomanNumeralForIntervalAndChordQuality("5", "7"), "V7");
});
