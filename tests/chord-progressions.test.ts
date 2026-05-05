import { assertEquals } from "@std/assert";
import {
  chordProgressionFamilies,
  chordProgressionForms,
  chordProgressionIdiomMetadata,
  chordProgressionPedagogyLevelMetadata,
  chordProgressionRealizations,
  chordProgressionStepNoteCollectionKeys,
  chordProgressionTonalContextMetadata,
  chordProgressionUsageMetadata,
  curatedChordProgressionCollections,
  getChordProgressionStepNoteCollectionKey,
} from "../src/data/chord-progressions/mod.ts";
import {
  findChordProgressionFamily,
  findChordProgressionRealization,
  findCuratedChordProgressionCollection,
  getChordProgressionFamilyDegreeNames,
  getChordProgressionFamilyForRealization,
  getChordProgressionFamilyRomanNames,
  getChordProgressionFormForRealization,
  getChordProgressionFormTotalBars,
  getChordProgressionRealizationChordTimeline,
  getChordProgressionRealizationDegreeNames,
  getChordProgressionRealizationNoteCollectionKeys,
  getChordProgressionRealizationPaletteChordNames,
  getChordProgressionRealizationRomanNames,
  getChordProgressionRealizationsForCuratedCollection,
  getChordProgressionRealizationTimeline,
  getChordProgressionRealizationTotalBars,
  getRomanNumeralForIntervalAndChordQuality,
  isValidChordProgressionCuratedCollectionKey,
  isValidChordProgressionFamilyKey,
  isValidChordProgressionFormKey,
  isValidChordProgressionRealizationKey,
  searchChordProgressionFamilies,
  searchChordProgressionForms,
  searchChordProgressionRealizations,
  searchCuratedChordProgressionCollections,
} from "../src/utils/chord-progressions.ts";

Deno.test("progression key validation reflects the new split datasets", () => {
  assertEquals(isValidChordProgressionFamilyKey("oneFourFiveMajor"), true);
  assertEquals(
    isValidChordProgressionRealizationKey("rhythmChangesBasicAaba"),
    true,
  );
  assertEquals(isValidChordProgressionFormKey("aaba32"), true);
  assertEquals(
    isValidChordProgressionCuratedCollectionKey("firstPlayableLoops"),
    true,
  );
  assertEquals(isValidChordProgressionFamilyKey("oneFourFive"), false);
  assertEquals(isValidChordProgressionRealizationKey("ionian"), false);
});

Deno.test("facet metadata exports cover the new classification model", () => {
  assertEquals(
    chordProgressionIdiomMetadata["pop-rock"].displayName,
    "Pop / Rock",
  );
  assertEquals(
    chordProgressionTonalContextMetadata["dominant-blues"].displayName,
    "Dominant Blues",
  );
  assertEquals(
    chordProgressionPedagogyLevelMetadata["early-intermediate"].displayName,
    "Early Intermediate",
  );
  assertEquals(
    chordProgressionUsageMetadata["ear-training"].displayName,
    "Ear Training",
  );
});

Deno.test("family, form, and curated exports are available directly", () => {
  assertEquals(
    chordProgressionFamilies.oneFourFiveMajor.primaryName,
    "I-IV-V foundation",
  );
  assertEquals(
    chordProgressionForms.aaba32.sections.map((section) => section.label),
    [
      "A1",
      "A2",
      "B",
      "A3",
    ],
  );
  assertEquals(
    curatedChordProgressionCollections.songwriterCoreLoops.realizationIds,
    ["oneFourOneFiveLoopBasic", "dooWopLoopBasic", "axisLoopBasic"],
  );
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

Deno.test("family search supports query and facet filters", () => {
  assertEquals(
    searchChordProgressionFamilies({ query: "ii v i" })[0],
    chordProgressionFamilies.majorTwoFiveOne,
  );
  assertEquals(
    findChordProgressionFamily({ query: "nostalgic relative minor pop" }),
    chordProgressionFamilies.dooWop,
  );

  const bluesFamilies = searchChordProgressionFamilies({
    idiom: "blues",
    tonalContext: "dominant-blues",
  });
  assertEquals(
    bluesFamilies.includes(chordProgressionFamilies.twelveBarBlues),
    true,
  );
  assertEquals(
    bluesFamilies.includes(chordProgressionFamilies.axisProgression),
    false,
  );
});

Deno.test("realization search supports family, form, idiom, and text lookups", () => {
  assertEquals(
    searchChordProgressionRealizations({ query: "quick change blues" })[0],
    chordProgressionRealizations.twelveBarBluesQuickChange,
  );
  assertEquals(
    findChordProgressionRealization({
      query: "dominant seventh resolution setup",
    }),
    chordProgressionRealizations.tonicDominantLoopWithV7,
  );

  const popLoops = searchChordProgressionRealizations({
    idiom: "pop-rock",
    formId: "fourBarLoop",
  });
  assertEquals(
    popLoops.includes(chordProgressionRealizations.axisLoopBasic),
    true,
  );
  assertEquals(
    popLoops.includes(chordProgressionRealizations.majorTwoFiveOneBasic),
    false,
  );
  assertEquals(
    popLoops.includes(chordProgressionRealizations.oneFourLiftLoopBasic),
    true,
  );

  const aabaEntries = searchChordProgressionRealizations({ formId: "aaba32" });
  assertEquals(aabaEntries, [
    chordProgressionRealizations.rhythmChangesBasicAaba,
  ]);
});

Deno.test("form and curated collection search stay useful for downstream UI", () => {
  assertEquals(
    searchChordProgressionForms({ query: "32 bar aaba" })[0],
    chordProgressionForms.aaba32,
  );
  assertEquals(
    searchCuratedChordProgressionCollections({ query: "songwriting loops" })[0],
    curatedChordProgressionCollections.songwriterCoreLoops,
  );
  assertEquals(
    findCuratedChordProgressionCollection({ realizationId: "jazzBluesBasic" }),
    curatedChordProgressionCollections.bluesFoundations,
  );
});

Deno.test("family helpers expose the abstract harmonic identity", () => {
  assertEquals(getChordProgressionFamilyDegreeNames("oneFourFiveMajor"), [
    "1M",
    "4M",
    "5M",
  ]);
  assertEquals(getChordProgressionFamilyRomanNames("oneFourFiveMajor"), [
    "I",
    "IV",
    "V",
  ]);
  assertEquals(getChordProgressionFamilyRomanNames("majorTwoFiveOne"), [
    "iim7",
    "V7",
    "IM7",
  ]);
});

Deno.test("realization helpers expose timeline, palette, and note collection views", () => {
  assertEquals(
    getChordProgressionRealizationDegreeNames("twelveBarBluesBasic"),
    ["17", "47", "17", "57", "47", "17", "57"],
  );
  assertEquals(
    getChordProgressionRealizationRomanNames("twelveBarBluesQuickChange"),
    ["I7", "IV7", "I7", "IV7", "I7", "V7", "IV7", "I7", "V7"],
  );

  const bluesTimeline = getChordProgressionRealizationTimeline(
    "twelveBarBluesBasic",
  );
  assertEquals(bluesTimeline.length, 7);
  assertEquals(bluesTimeline[0], {
    degree: "1",
    quality: "7",
    bars: 4,
    harmonicFunction: "tonic",
    cue: undefined,
    sectionId: "main",
    sectionLabel: "Main",
    startBar: 1,
    endBar: 5,
  });
  assertEquals(
    getChordProgressionRealizationTotalBars("twelveBarBluesBasic"),
    12,
  );
  assertEquals(
    getChordProgressionRealizationTotalBars("majorTwoFiveOneBasic"),
    4,
  );

  const oneLoopTimeline = getChordProgressionRealizationChordTimeline(
    "G",
    "tonicDominantLoopWithV7",
  );
  assertEquals(oneLoopTimeline.map((span) => span.chordName), [
    "GM",
    "DM",
    "D7",
  ]);
  assertEquals(
    getChordProgressionRealizationPaletteChordNames(
      "G",
      "tonicDominantLoopWithV7",
    ),
    ["GM", "DM", "D7"],
  );
  assertEquals(
    getChordProgressionRealizationNoteCollectionKeys("tonicDominantLoopWithV7"),
    ["major", "major", "dominant7"],
  );
});

Deno.test("realizations stay linked to their abstract family and optional form", () => {
  assertEquals(
    getChordProgressionFamilyForRealization("rhythmChangesBasicAaba"),
    chordProgressionFamilies.rhythmChanges,
  );
  assertEquals(
    getChordProgressionFamilyForRealization("tonicDominantLoopBasic"),
    chordProgressionFamilies.oneFiveMajor,
  );
  assertEquals(
    getChordProgressionFormForRealization("rhythmChangesBasicAaba"),
    chordProgressionForms.aaba32,
  );
  assertEquals(getChordProgressionFormTotalBars("aaba32"), 32);
});

Deno.test("curated collections resolve to concrete playable realizations", () => {
  assertEquals(
    getChordProgressionRealizationsForCuratedCollection("firstPlayableLoops")
      .map((realization) => realization.id),
    [
      "tonicDominantLoopBasic",
      "tonicDominantLoopWithV7",
      "oneFourLiftLoopBasic",
      "oneFourFiveStarterLoop",
      "oneFourOneFiveLoopBasic",
      "dooWopLoopBasic",
      "axisLoopBasic",
    ],
  );
});

Deno.test("getRomanNumeralForIntervalAndChordQuality", () => {
  assertEquals(getRomanNumeralForIntervalAndChordQuality("♭7", "M7"), "♭VIIM7");
  assertEquals(getRomanNumeralForIntervalAndChordQuality("2", "ø7"), "iiø7");
  assertEquals(getRomanNumeralForIntervalAndChordQuality("5", "7"), "V7");
  assertEquals(getRomanNumeralForIntervalAndChordQuality("♯4", "°7"), "♯iv°7");
});
