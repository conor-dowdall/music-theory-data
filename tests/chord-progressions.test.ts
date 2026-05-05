import { assertEquals } from "@std/assert";
import { chordProgressions } from "../src/data/chord-progressions/mod.ts";
import {
  getChordProgressionChordNames,
  getChordProgressionTotalDurationInBars,
  getChordProgressionUniqueChordNames,
  isValidChordProgressionKey,
} from "../src/utils/chord-progressions.ts";

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
  assertEquals(chordProgressions.oneOneFourFive.primaryName, "I | I | IV | V");
  assertEquals(chordProgressions.oneSixFourFive.primaryName, "I | vi | IV | V");
  assertEquals(chordProgressions.oneSixTwoFive.primaryName, "I | vi | ii | V");
  assertEquals(chordProgressions.sixTwoFiveOne.primaryName, "vi | ii | V | I");
  assertEquals(
    chordProgressions.majorTwoFiveOne.primaryName,
    "iim7 | V7 | Imaj7 | Imaj7",
  );
  assertEquals(
    chordProgressions.twelveBarBlues.primaryName,
    "12 Bar Blues",
  );
  assertEquals(
    chordProgressions.twelveBarBluesQuickChange.primaryName,
    "12 Bar Blues Quick Change",
  );
  assertEquals(chordProgressions.twelveBarBluesQuickChange.chords, [
    { degree: "1", quality: "7", durationInBars: 1 },
    { degree: "4", quality: "7", durationInBars: 1 },
    { degree: "1", quality: "7", durationInBars: 2 },
    { degree: "4", quality: "7", durationInBars: 2 },
    { degree: "1", quality: "7", durationInBars: 2 },
    { degree: "5", quality: "7", durationInBars: 1 },
    { degree: "4", quality: "7", durationInBars: 1 },
    { degree: "1", quality: "7", durationInBars: 1 },
    { degree: "5", quality: "7", durationInBars: 1 },
  ]);
});

Deno.test("progression helpers expose chord names and total duration", () => {
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
