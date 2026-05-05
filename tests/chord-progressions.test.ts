import { assertEquals } from "@std/assert";
import {
  chordProgressionForms,
  chordProgressionIdiomMetadata,
  chordProgressions,
  chordProgressionSets,
  chordProgressionStepNoteCollectionKeys,
  chordProgressionTonalContextMetadata,
  getChordProgressionStepNoteCollectionKey,
} from "../src/data/chord-progressions/mod.ts";
import {
  findChordProgression,
  findChordProgressionSet,
  getChordProgressionChordTimeline,
  getChordProgressionDegreeNames,
  getChordProgressionFormForProgression,
  getChordProgressionFormTotalBars,
  getChordProgressionNoteCollectionKeys,
  getChordProgressionPaletteChordNames,
  getChordProgressionRomanNames,
  getChordProgressionsForSet,
  getChordProgressionTimeline,
  getChordProgressionTotalBars,
  getRomanNumeralForIntervalAndChordQuality,
  isValidChordProgressionFormKey,
  isValidChordProgressionKey,
  isValidChordProgressionSetKey,
  searchChordProgressionForms,
  searchChordProgressions,
  searchChordProgressionSets,
} from "../src/utils/chord-progressions.ts";

Deno.test("progression key validation reflects the simplified datasets", () => {
  assertEquals(isValidChordProgressionKey("dooWop"), true);
  assertEquals(isValidChordProgressionKey("rhythmChanges"), true);
  assertEquals(isValidChordProgressionFormKey("aaba32"), true);
  assertEquals(isValidChordProgressionSetKey("commonLoops"), true);
  assertEquals(isValidChordProgressionKey("ionian"), false);
  assertEquals(isValidChordProgressionSetKey("beginnerFoundations"), false);
});

Deno.test("facet metadata exports cover the intrinsic classification model", () => {
  assertEquals(
    chordProgressionIdiomMetadata["pop-rock"].displayName,
    "Pop / Rock",
  );
  assertEquals(
    chordProgressionTonalContextMetadata["dominant-blues"].displayName,
    "Dominant Blues",
  );
});

Deno.test("progression, form, and set exports are available directly", () => {
  assertEquals(chordProgressions.oneOneFourFive.primaryName, "I-I-IV-V");
  assertEquals(
    chordProgressionForms.aaba32.sections.map((section) => section.label),
    [
      "A1",
      "A2",
      "B",
      "A3",
    ],
  );
  assertEquals(chordProgressionSets.songwritingLoops.progressionIds, [
    "oneFourOneFive",
    "dooWop",
    "axisProgression",
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

Deno.test("progression search supports query and intrinsic facet filters", () => {
  assertEquals(
    searchChordProgressions({ query: "ii v i" })[0],
    chordProgressions.majorTwoFiveOne,
  );
  assertEquals(
    findChordProgression({ query: "50s progression" }),
    chordProgressions.dooWop,
  );

  const popLoops = searchChordProgressions({
    idiom: "pop-rock",
    formId: "fourBarLoop",
  });
  assertEquals(popLoops.includes(chordProgressions.axisProgression), true);
  assertEquals(popLoops.includes(chordProgressions.majorTwoFiveOne), false);

  const aabaEntries = searchChordProgressions({ formId: "aaba32" });
  assertEquals(aabaEntries, [chordProgressions.rhythmChanges]);
});

Deno.test("form and set search stay useful for downstream UI", () => {
  assertEquals(
    searchChordProgressionForms({ query: "32 bar aaba" })[0],
    chordProgressionForms.aaba32,
  );
  assertEquals(
    searchChordProgressionSets({ query: "songwriting loops" })[0],
    chordProgressionSets.songwritingLoops,
  );
  assertEquals(
    findChordProgressionSet({ progressionId: "jazzBlues" }),
    chordProgressionSets.bluesForms,
  );
});

Deno.test("progression helpers expose harmonic identity from spans", () => {
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

Deno.test("timeline helpers derive section labels from forms when available", () => {
  const bluesTimeline = getChordProgressionTimeline("twelveBarBlues");
  assertEquals(bluesTimeline.length, 7);
  assertEquals(bluesTimeline[0], {
    degree: "1",
    quality: "7",
    bars: 4,
    harmonicFunction: "tonic",
    cue: undefined,
    startBar: 1,
    endBar: 5,
    sectionId: "phrase1",
    sectionLabel: "Phrase 1",
  });
  assertEquals(getChordProgressionTotalBars("twelveBarBlues"), 12);
  assertEquals(getChordProgressionTotalBars("majorTwoFiveOne"), 4);

  const rhythmTimeline = getChordProgressionTimeline("rhythmChanges");
  assertEquals(rhythmTimeline[0].sectionLabel, "A1");
  assertEquals(rhythmTimeline[8].sectionLabel, "A2");
  assertEquals(rhythmTimeline[16].sectionLabel, "B");
  assertEquals(rhythmTimeline[20].sectionLabel, "A3");

  const oneLoopTimeline = getChordProgressionChordTimeline("G", "oneOneFiveV7");
  assertEquals(oneLoopTimeline.map((span) => span.chordName), [
    "GM",
    "DM",
    "D7",
  ]);
  assertEquals(getChordProgressionPaletteChordNames("G", "oneOneFiveV7"), [
    "GM",
    "DM",
    "D7",
  ]);
  assertEquals(getChordProgressionNoteCollectionKeys("oneOneFiveV7"), [
    "major",
    "major",
    "dominant7",
  ]);
});

Deno.test("progressions stay linked to optional forms", () => {
  assertEquals(
    getChordProgressionFormForProgression("rhythmChanges"),
    chordProgressionForms.aaba32,
  );
  assertEquals(
    getChordProgressionFormForProgression("dooWop"),
    chordProgressionForms.fourBarLoop,
  );
  assertEquals(getChordProgressionFormTotalBars("aaba32"), 32);
});

Deno.test("sets resolve to concrete progressions", () => {
  assertEquals(
    getChordProgressionsForSet("commonLoops").map((progression) =>
      progression.id
    ),
    [
      "oneOneFiveFive",
      "oneOneFiveV7",
      "oneOneFourFour",
      "oneOneFourFive",
      "oneFourOneFive",
      "dooWop",
      "axisProgression",
    ],
  );
});

Deno.test("getRomanNumeralForIntervalAndChordQuality", () => {
  assertEquals(getRomanNumeralForIntervalAndChordQuality("♭7", "M7"), "♭VIIM7");
  assertEquals(getRomanNumeralForIntervalAndChordQuality("2", "ø7"), "iiø7");
  assertEquals(getRomanNumeralForIntervalAndChordQuality("5", "7"), "V7");
  assertEquals(getRomanNumeralForIntervalAndChordQuality("♯4", "°7"), "♯iv°7");
});
