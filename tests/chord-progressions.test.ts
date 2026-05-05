import { assertEquals } from "@std/assert";
import {
  chordProgressions,
  chordProgressionSets,
  chordProgressionStepNoteCollectionKeys,
  getChordProgressionStepNoteCollectionKey,
} from "../src/data/chord-progressions/mod.ts";
import {
  findChordProgression,
  findChordProgressionSet,
  getChordProgressionChordTimeline,
  getChordProgressionDegreeNames,
  getChordProgressionNoteCollectionKeys,
  getChordProgressionPaletteChordNames,
  getChordProgressionRomanNames,
  getChordProgressionsForSet,
  getChordProgressionTimeline,
  getChordProgressionTotalBars,
  getRomanNumeralForIntervalAndChordQuality,
  isValidChordProgressionKey,
  isValidChordProgressionSetKey,
  searchChordProgressions,
  searchChordProgressionSets,
} from "../src/utils/chord-progressions.ts";

Deno.test("progression key validation reflects the reduced datasets", () => {
  assertEquals(isValidChordProgressionKey("dooWop"), true);
  assertEquals(isValidChordProgressionKey("oneOneFiveFiveDominant7"), true);
  assertEquals(isValidChordProgressionSetKey("fourBarProgressions"), true);
  assertEquals(isValidChordProgressionKey("rhythmChanges"), false);
  assertEquals(isValidChordProgressionKey("ionian"), false);
  assertEquals(isValidChordProgressionSetKey("commonLoops"), false);
});

Deno.test("progression and set exports are available directly", () => {
  assertEquals(chordProgressions.oneOneFourFive.primaryName, "I-I-IV-V");
  assertEquals(chordProgressionSets.fourBarProgressions.progressionIds, [
    "oneOneFiveFive",
    "oneOneFiveFiveDominant7",
    "oneOneFourFour",
    "oneOneFourFive",
    "oneFourOneFive",
    "dooWop",
    "axisProgression",
    "majorTwoFiveOne",
    "minorTwoFiveOne",
  ]);
});

Deno.test("canonical note collection keys still resolve from chord quality", () => {
  assertEquals(getChordProgressionStepNoteCollectionKey("M"), "major");
  assertEquals(getChordProgressionStepNoteCollectionKey("7"), "dominant7");
  assertEquals(
    getChordProgressionStepNoteCollectionKey("ø7"),
    "halfDiminished7",
  );
  assertEquals(chordProgressionStepNoteCollectionKeys["°7"], "diminished7");
});

Deno.test("progression search supports text lookup on names and formulas", () => {
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
});

Deno.test("set search stays useful for downstream UI", () => {
  assertEquals(
    searchChordProgressionSets({ query: "4 bar" })[0],
    chordProgressionSets.fourBarProgressions,
  );
  assertEquals(
    findChordProgressionSet({ progressionId: "majorTwoFiveOne" }),
    chordProgressionSets.cadences,
  );
  assertEquals(
    findChordProgressionSet({ progressionId: "twelveBarBlues" }),
    chordProgressionSets.twelveBarProgressions,
  );
});

Deno.test("progression helpers expose harmonic identity from changes", () => {
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

Deno.test("timeline helpers expose ordered changes and derived chord names", () => {
  const bluesTimeline = getChordProgressionTimeline("twelveBarBlues");
  assertEquals(bluesTimeline.length, 7);
  assertEquals(bluesTimeline[0], {
    degree: "1",
    quality: "7",
    bars: 4,
    startBar: 1,
    endBar: 5,
  });
  assertEquals(getChordProgressionTotalBars("twelveBarBlues"), 12);
  assertEquals(getChordProgressionTotalBars("majorTwoFiveOne"), 4);

  const oneLoopTimeline = getChordProgressionChordTimeline(
    "G",
    "oneOneFiveFiveDominant7",
  );
  assertEquals(oneLoopTimeline.map((change) => change.chordName), [
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
});

Deno.test("sets resolve to concrete progressions", () => {
  assertEquals(
    getChordProgressionsForSet("fourBarProgressions").map((progression) =>
      progression.id
    ),
    [
      "oneOneFiveFive",
      "oneOneFiveFiveDominant7",
      "oneOneFourFour",
      "oneOneFourFive",
      "oneFourOneFive",
      "dooWop",
      "axisProgression",
      "majorTwoFiveOne",
      "minorTwoFiveOne",
    ],
  );
});

Deno.test("getRomanNumeralForIntervalAndChordQuality", () => {
  assertEquals(getRomanNumeralForIntervalAndChordQuality("♭7", "M7"), "♭VIIM7");
  assertEquals(getRomanNumeralForIntervalAndChordQuality("2", "ø7"), "iiø7");
  assertEquals(getRomanNumeralForIntervalAndChordQuality("5", "7"), "V7");
});
