import { assertEquals, assertThrows } from "@std/assert";
import {
  chordProgressionBarGroups,
  chordProgressionCategoryGroups,
  chordProgressionDefinitions,
  chordProgressions,
} from "../src/data/chord-progressions/mod.ts";
import {
  noteNameToIntegerMap,
  type RootNote,
  rootNotes,
  rootNotesSet,
  rootNoteToIntegerMap,
} from "../src/data/labels/note-labels.ts";
import { noteLabelCollections } from "../src/data/labels/note-label-collections.ts";
import {
  type ChordProgression,
  chordProgression,
  type ChordProgressionBarSegment,
  type ChordProgressionChord,
  type ChordProgressionDefinition,
  type ChordProgressionDefinitionIssue,
  type ChordProgressionIssue,
  type ChordProgressionRomanSymbol,
  type ChordProgressionSecondaryRomanSymbol,
  type ChordProgressionTiming,
  type ChordRootDegree,
  type ParseResult,
  type ResolvedChordProgression,
} from "../src/mod.ts";
import {
  flatChordRootDegrees,
  getChordProgressionChordChangeReferences,
  getChordProgressionChordNames,
  getChordProgressionChordReferencesByBar,
  getChordProgressionDirectRomanSymbols,
  getChordProgressionKeysForCategory,
  getChordProgressionKeysForTotalBars,
  getChordProgressionRomanSymbols,
  getChordProgressionSongChordReferences,
  getChordProgressionTiming,
  getChordProgressionTotalDurationInBars,
  getChordProgressionUniqueChordNames,
  getChordProgressionUniqueChordReferences,
  isChordCollectionKey,
  isChordProgressionAnalysisRomanSymbol,
  isChordProgressionRomanSymbol,
  isChordProgressionSecondaryRomanSymbol,
  isChordRootDegree,
  isValidChordProgressionKey,
  normalizeChordRootDegree,
  parseChordProgression,
  parseChordProgressionDefinition,
  resolveChordProgression,
  sharpChordRootDegrees,
  validateChordProgression,
  validateChordProgressionDefinition,
} from "../src/utils/chord-progressions.ts";

const cMajorReference = {
  rootNote: "C",
  practicalRootNote: "C",
  pitchClass: 0,
  chordName: "CM",
  chordCollectionKey: "major",
} as const;

const fMajorReference = {
  rootNote: "F",
  practicalRootNote: "F",
  pitchClass: 5,
  chordName: "FM",
  chordCollectionKey: "major",
} as const;

const fMinorReference = {
  rootNote: "F",
  practicalRootNote: "F",
  pitchClass: 5,
  chordName: "Fm",
  chordCollectionKey: "minor",
} as const;

const gMajorReference = {
  rootNote: "G",
  practicalRootNote: "G",
  pitchClass: 7,
  chordName: "GM",
  chordCollectionKey: "major",
} as const;

const cDominant7Reference = {
  rootNote: "C",
  practicalRootNote: "C",
  pitchClass: 0,
  chordName: "C7",
  chordCollectionKey: "dominant7",
} as const;

const fDominant7Reference = {
  rootNote: "F",
  practicalRootNote: "F",
  pitchClass: 5,
  chordName: "F7",
  chordCollectionKey: "dominant7",
} as const;

const gDominant7Reference = {
  rootNote: "G",
  practicalRootNote: "G",
  pitchClass: 7,
  chordName: "G7",
  chordCollectionKey: "dominant7",
} as const;

const aMinorReference = {
  rootNote: "A",
  practicalRootNote: "A",
  pitchClass: 9,
  chordName: "Am",
  chordCollectionKey: "minor",
} as const;

Deno.test("chord progression authoring types are exported publicly", () => {
  const rootDegree: ChordRootDegree = "♭7";
  const secondaryRomanSymbol: ChordProgressionSecondaryRomanSymbol = "V7/ii";
  const chord: ChordProgressionChord = {
    degree: rootDegree,
    chordCollectionKey: "dominant7",
    durationInBars: 1,
    analysis: { romanSymbol: secondaryRomanSymbol },
  };
  const progression: ChordProgression = { chords: [chord] };
  // @ts-expect-error Augmented Roman suffixes require uppercase numerals.
  const invalidRomanSymbol: ChordProgressionRomanSymbol = "i+7";

  assertEquals(progression.chords[0], chord);
  assertEquals(isChordProgressionRomanSymbol(invalidRomanSymbol), false);
});

Deno.test("chord progression runtime guards recognize supported values", () => {
  assertEquals(isChordRootDegree("♭7"), true);
  assertEquals(isChordRootDegree("𝄪4"), true);
  assertEquals(isChordRootDegree("9"), false);
  assertEquals(isChordRootDegree("♭13"), false);
  assertEquals(normalizeChordRootDegree("b3"), "♭3");
  assertEquals(normalizeChordRootDegree("#4"), "♯4");
  assertEquals(normalizeChordRootDegree("bb7"), "𝄫7");
  assertEquals(normalizeChordRootDegree("x4"), "𝄪4");
  assertEquals(normalizeChordRootDegree("♮3"), "♮3");
  assertEquals(normalizeChordRootDegree("M3"), undefined);
  assertEquals(normalizeChordRootDegree("♭13"), undefined);

  assertEquals(
    [...flatChordRootDegrees] as string[],
    [...noteLabelCollections.intervalsFlat.labels],
  );
  assertEquals(
    [...sharpChordRootDegrees] as string[],
    [...noteLabelCollections.intervalsSharp.labels],
  );

  assertEquals(isChordCollectionKey("major"), true);
  assertEquals(isChordCollectionKey("dominant13"), true);
  assertEquals(isChordCollectionKey("ionian"), false);
  assertEquals(isChordCollectionKey(null), false);

  assertEquals(isChordProgressionAnalysisRomanSymbol("I6/9"), true);
  assertEquals(isChordProgressionAnalysisRomanSymbol("V7/ii"), true);
  assertEquals(isChordProgressionAnalysisRomanSymbol("V7/♭II"), true);
  assertEquals(isChordProgressionAnalysisRomanSymbol("nonsense/V"), false);
  assertEquals(isChordProgressionAnalysisRomanSymbol("V7/nope"), false);
  assertEquals(isChordProgressionRomanSymbol("I6/9"), true);
  assertEquals(isChordProgressionRomanSymbol("V7/ii"), false);
  assertEquals(isChordProgressionSecondaryRomanSymbol("V7/ii"), true);
  assertEquals(isChordProgressionSecondaryRomanSymbol("I6/9/ii"), true);
  assertEquals(
    isChordProgressionSecondaryRomanSymbol("Vgarbage/ii"),
    false,
  );
});

Deno.test("parseChordProgression returns fresh validated package data", () => {
  const source = {
    commonName: "Runtime progression",
    category: "jazz",
    ignored: "not part of the package model",
    chords: [
      {
        degree: "2",
        chordCollectionKey: "minor7",
        durationInBars: 0.5,
        ignored: true,
      },
      {
        degree: "5",
        chordCollectionKey: "dominant7",
        durationInBars: 0.5,
        analysis: { romanSymbol: "V7/ii", ignored: true },
      },
    ],
  };
  const result: ParseResult<ChordProgression> = parseChordProgression(source);

  assertEquals(result.success, true);
  if (!result.success) return;
  assertEquals(result.value, {
    chords: [
      { degree: "2", chordCollectionKey: "minor7", durationInBars: 0.5 },
      {
        degree: "5",
        chordCollectionKey: "dominant7",
        durationInBars: 0.5,
        analysis: { romanSymbol: "V7/ii" },
      },
    ],
  });
  assertEquals(Object.is(result.value, source), false);
  assertEquals(result.value.chords[0] === source.chords[0], false);
});

Deno.test("progression definitions parse metadata separately from structure", () => {
  const source = {
    name: "Runtime progression",
    category: "jazz",
    ignored: true,
    progression: {
      ignored: true,
      chords: [
        { degree: "2", chordCollectionKey: "minor7", durationInBars: 0.5 },
        { degree: "5", chordCollectionKey: "dominant7", durationInBars: 0.5 },
      ],
    },
  };
  const result: ParseResult<
    ChordProgressionDefinition,
    ChordProgressionDefinitionIssue
  > = parseChordProgressionDefinition(source);

  assertEquals(result, {
    success: true,
    value: {
      name: "Runtime progression",
      category: "jazz",
      progression: {
        chords: [
          { degree: "2", chordCollectionKey: "minor7", durationInBars: 0.5 },
          {
            degree: "5",
            chordCollectionKey: "dominant7",
            durationInBars: 0.5,
          },
        ],
      },
    },
  });
  assertEquals(
    validateChordProgressionDefinition({
      name: " ",
      category: "not-a-category",
      progression: { chords: [] },
    }).map((issue) => issue.code),
    ["invalid-name", "invalid-category", "empty-progression"],
  );
});

Deno.test("progression validation reports indexed diagnostics", () => {
  const issues: readonly ChordProgressionIssue[] = validateChordProgression({
    chords: [
      {
        degree: "♭13",
        chordCollectionKey: "ionian",
        durationInBars: 0,
        analysis: { romanSymbol: "not-Roman" },
      },
      null,
    ],
  });

  assertEquals(
    issues.map((issue) => ({
      code: issue.code,
      ...("chordIndex" in issue ? { chordIndex: issue.chordIndex } : {}),
    })),
    [
      { code: "invalid-degree", chordIndex: 0 },
      { code: "invalid-chord-collection-key", chordIndex: 0 },
      { code: "invalid-duration", chordIndex: 0 },
      { code: "invalid-analysis", chordIndex: 0 },
      { code: "invalid-chord", chordIndex: 1 },
    ],
  );
  assertEquals(parseChordProgression({ chords: [] }).success, false);
  assertEquals(
    validateChordProgression({
      chords: [{
        degree: "1",
        chordCollectionKey: "major",
        durationInBars: Number.MAX_SAFE_INTEGER + 1,
      }],
    }).map((issue) => issue.code),
    ["unrepresentable-duration"],
  );
  const oversizedProgression = {
    chords: [{
      degree: "1",
      chordCollectionKey: "major",
      durationInBars: 100_001,
    }],
  } as const;
  assertEquals(
    validateChordProgression(oversizedProgression).map((issue) => issue.code),
    ["timeline-too-large"],
  );
  assertEquals(parseChordProgression(oversizedProgression).success, false);
  assertThrows(
    () => getChordProgressionTiming(oversizedProgression),
    Error,
    "100000-bar materialization limit",
  );
});

Deno.test("incomplete final bars are valid and reported as timing metadata", () => {
  const result = parseChordProgression({
    chords: [
      { degree: "1", chordCollectionKey: "major", durationInBars: 0.5 },
    ],
  });

  assertEquals(result.success, true);
  if (!result.success) return;
  assertEquals(
    getChordProgressionTiming(result.value).endsOnBarBoundary,
    false,
  );
  assertEquals(
    getChordProgressionTiming("oneSixFourFive").endsOnBarBoundary,
    true,
  );
});

Deno.test("progression key validation reflects the current dataset", () => {
  assertEquals(isValidChordProgressionKey("authenticCadence"), true);
  assertEquals(isValidChordProgressionKey("plagalCadence"), true);
  assertEquals(isValidChordProgressionKey("minorPlagalCadence"), true);
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
    Object.keys(chordProgressionDefinitions),
    Object.keys(chordProgressions),
  );
  for (
    const key of Object.keys(chordProgressions) as Array<
      keyof typeof chordProgressions
    >
  ) {
    assertEquals(
      Object.is(
        chordProgressionDefinitions[key].progression,
        chordProgressions[key],
      ),
      true,
    );
    assertEquals(chordProgressionDefinitions[key].name.trim().length > 0, true);
    assertEquals("category" in chordProgressions[key], false);
    assertEquals("name" in chordProgressions[key], false);
  }
  assertEquals(
    chordProgressionDefinitions.authenticCadence.name,
    "Authentic Cadence (V7–I)",
  );
  assertEquals(
    chordProgressionDefinitions.plagalCadence.name,
    "Plagal Cadence (IV–I)",
  );
  assertEquals(
    chordProgressionDefinitions.minorPlagalCadence.name,
    "Minor Plagal Cadence (iv–I)",
  );
  assertEquals(
    chordProgressionDefinitions.deceptiveCadence.name,
    "Deceptive Cadence (V7–vi)",
  );
  assertEquals(
    chordProgressionDefinitions.andalusianCadence.name,
    "Andalusian Cadence",
  );
  assertEquals(
    [
      chordProgressionDefinitions.oneOneFiveFive.name,
      chordProgressionDefinitions.oneOneFiveFiveDominant7.name,
      chordProgressionDefinitions.oneOneFourFour.name,
      chordProgressionDefinitions.oneOneFourFiveDominant7.name,
      chordProgressionDefinitions.oneFourFiveDominant7Six.name,
      chordProgressionDefinitions.oneFourOneFive.name,
      chordProgressionDefinitions.oneSixFourFive.name,
      chordProgressionDefinitions.oneFiveSixFour.name,
      chordProgressionDefinitions.oneSixTwoFive.name,
      chordProgressionDefinitions.sixTwoFiveOne.name,
    ],
    [
      "I–V",
      "I–V–V7",
      "I–IV",
      "I–IV–V7",
      "I–IV–V7–vi",
      "I–IV–I–V",
      "I–vi–IV–V",
      "I–V–vi–IV",
      "I–vi–ii–V",
      "vi–ii–V–I",
    ],
  );
  assertEquals(
    chordProgressionDefinitions.circleOfFifths.name,
    "Circle of Fifths Progression",
  );
  assertEquals(
    chordProgressionDefinitions.minorCircleOfFifths.name,
    "Minor Circle of Fifths Progression",
  );
  assertEquals(
    chordProgressionDefinitions.pachelbelCanon.name,
    "Pachelbel Progression",
  );
  assertEquals(
    chordProgressionDefinitions.majorTwoFiveOne.name,
    "Major ii–V–I",
  );
  assertEquals(
    chordProgressionDefinitions.minorTwoFiveOne.name,
    "Minor ii–V–i",
  );
  assertEquals(
    chordProgressionDefinitions.backdoorTwoFiveOne.name,
    "Backdoor ii–V–I",
  );
  assertEquals(
    chordProgressionDefinitions.twelveBarBlues.name,
    "12-Bar Blues",
  );
  assertEquals(
    chordProgressionDefinitions.twelveBarBluesQuickChange.name,
    "12-Bar Blues (Quick Change)",
  );
  assertEquals(
    chordProgressionDefinitions.minorBlues.name,
    "Minor Blues",
  );
  assertEquals(
    chordProgressionDefinitions.jazzBlues.name,
    "Jazz Blues",
  );
  assertEquals(
    chordProgressionDefinitions.autumnLeavesA.name,
    "Autumn Leaves A",
  );
  assertEquals(
    chordProgressionDefinitions.autumnLeavesB.name,
    "Autumn Leaves B",
  );
  assertEquals(
    chordProgressionDefinitions.autumnLeavesC.name,
    "Autumn Leaves C",
  );
  assertEquals(
    chordProgressionDefinitions.rhythmChangesA.name,
    "Rhythm Changes A",
  );
  assertEquals(
    chordProgressionDefinitions.rhythmChangesBridge.name,
    "Rhythm Changes Bridge",
  );
  assertEquals(
    chordProgressionDefinitions.authenticCadence.category,
    "cadences",
  );
  assertEquals(
    chordProgressionDefinitions.minorPlagalCadence.category,
    "cadences",
  );
  assertEquals(
    chordProgressionDefinitions.andalusianCadence.category,
    "commonLoops",
  );
  assertEquals(
    chordProgressionDefinitions.oneOneFiveFive.category,
    "commonLoops",
  );
  assertEquals(
    chordProgressionDefinitions.oneSixFourFive.category,
    "commonLoops",
  );
  assertEquals(
    chordProgressionDefinitions.oneSixTwoFive.category,
    "turnaroundsAndCycles",
  );
  assertEquals(
    chordProgressionDefinitions.sixTwoFiveOne.category,
    "turnaroundsAndCycles",
  );
  assertEquals(
    chordProgressionDefinitions.circleOfFifths.category,
    "turnaroundsAndCycles",
  );
  assertEquals(
    chordProgressionDefinitions.minorCircleOfFifths.category,
    "turnaroundsAndCycles",
  );
  assertEquals(chordProgressionDefinitions.autumnLeavesA.category, "jazz");
  assertEquals(chordProgressionDefinitions.autumnLeavesC.category, "jazz");
  assertEquals(
    chordProgressionDefinitions.backdoorTwoFiveOne.category,
    "jazz",
  );
  assertEquals(chordProgressionDefinitions.rhythmChangesA.category, "jazz");
  assertEquals(chordProgressionDefinitions.twelveBarBlues.category, "blues");
  assertEquals(chordProgressionDefinitions.minorBlues.category, "blues");
  assertEquals(chordProgressionDefinitions.jazzBlues.category, "blues");
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
    assertEquals(
      validateChordProgression(progression),
      [],
      `${key} must pass runtime validation`,
    );
    assertEquals(
      parseChordProgression(progression).success,
      true,
      `${key} must be runtime parseable`,
    );

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
    [...chordProgressions.minorTwoFiveOne.chords],
  );
  assertEquals(
    chordProgressions.autumnLeavesB.chords.slice(0, 3),
    [...chordProgressions.minorTwoFiveOne.chords],
  );
  assertEquals(
    [...chordProgressions.autumnLeavesB.chords],
    [
      ...chordProgressions.autumnLeavesA.chords.slice(4),
      ...chordProgressions.autumnLeavesA.chords.slice(0, 4),
    ],
  );
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
    "♭1",
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
    [...chordProgressions.sixTwoFiveOne.chords],
  );
  assertEquals(
    chordProgressions.oneFourFiveDominant7Six.chords.slice(-2).map((chord) => ({
      degree: chord.degree,
      chordCollectionKey: chord.chordCollectionKey,
    })),
    chordProgressions.deceptiveCadence.chords.map((chord) => ({
      degree: chord.degree,
      chordCollectionKey: chord.chordCollectionKey,
    })),
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
        "andalusianCadence",
        "oneSixTwoFive",
        "sixTwoFiveOne",
        "authenticCadence",
        "plagalCadence",
        "minorPlagalCadence",
        "deceptiveCadence",
        "majorTwoFiveOne",
        "minorTwoFiveOne",
        "backdoorTwoFiveOne",
      ],
    },
    {
      totalBars: 8,
      progressionKeys: [
        "oneFourOneFiveSplitReturn",
        "pachelbelCanon",
        "circleOfFifths",
        "minorCircleOfFifths",
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
        "Focused four-bar practice loops for authentic, plagal, minor plagal, and deceptive resolution.",
      progressionKeys: [
        "authenticCadence",
        "plagalCadence",
        "minorPlagalCadence",
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
    getChordProgressionDirectRomanSymbols("minorPlagalCadence"),
    ["iv", "I"],
  );
  assertEquals(
    getChordProgressionDirectRomanSymbols("deceptiveCadence"),
    ["V7", "vi"],
  );
  for (
    const key of [
      "authenticCadence",
      "plagalCadence",
      "minorPlagalCadence",
      "deceptiveCadence",
    ] as const
  ) {
    const formula = getChordProgressionDirectRomanSymbols(key).join("–");
    assertEquals(
      chordProgressionDefinitions[key].name.endsWith(`(${formula})`),
      true,
      `${key} title must include its exact Roman formula`,
    );
  }
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
    ["iiø7", "V7", "im7", "♭I7", "♭viim7", "VI7", "♭VIM7", "V7", "i"],
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
    ["iiø7", "V7", "im7", "♭I7", "♭viim7", "VI7", "♭VIM7", "V7", "i"],
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

  const cSharpJazzBluesSharpFourReference =
    getChordProgressionChordChangeReferences("C♯", "jazzBlues")[4];
  assertEquals(cSharpJazzBluesSharpFourReference, {
    rootNote: "F𝄪",
    practicalRootNote: "G",
    pitchClass: rootNoteToIntegerMap.get("G"),
    chordName: "F𝄪°7",
    chordCollectionKey: "diminished7",
  });
  assertEquals(getChordProgressionRomanSymbols("jazzBlues")[4], "♯iv°7");

  const flatOneProgression = {
    chords: [
      { degree: "♭1", chordCollectionKey: "major", durationInBars: 1 },
    ],
  } satisfies ChordProgression;
  assertEquals(
    getChordProgressionChordChangeReferences("B♭", flatOneProgression),
    [{
      rootNote: "B𝄫",
      practicalRootNote: "A",
      pitchClass: rootNoteToIntegerMap.get("A"),
      chordName: "B𝄫M",
      chordCollectionKey: "major",
    }],
  );
  assertEquals(getChordProgressionRomanSymbols(flatOneProgression), ["♭I"]);

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
      practicalRootNote: "G",
      pitchClass: 7,
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

  assertEquals(getChordProgressionKeysForTotalBars(2), []);
  assertEquals(getChordProgressionKeysForTotalBars(4), [
    "oneOneFiveFive",
    "oneOneFiveFiveDominant7",
    "oneOneFourFour",
    "oneOneFourFiveDominant7",
    "oneFourFiveDominant7Six",
    "oneFourOneFive",
    "oneSixFourFive",
    "oneFiveSixFour",
    "andalusianCadence",
    "oneSixTwoFive",
    "sixTwoFiveOne",
    "authenticCadence",
    "plagalCadence",
    "minorPlagalCadence",
    "deceptiveCadence",
    "majorTwoFiveOne",
    "minorTwoFiveOne",
    "backdoorTwoFiveOne",
  ]);
  assertEquals(getChordProgressionKeysForTotalBars(8), [
    "oneFourOneFiveSplitReturn",
    "pachelbelCanon",
    "circleOfFifths",
    "minorCircleOfFifths",
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
    "minorPlagalCadence",
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
    ["Aø7", "D7", "Gm7", "G♭7", "Fm7", "E7", "E♭M7", "D7", "Gm"],
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
    ["D𝄫7", "E𝄫7", "F𝄫7", "G𝄫7", "A𝄫7", "B𝄫7", "C𝄫7"],
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
        practicalRootNote: "G",
        pitchClass: 7,
        chordName: "GM",
        chordCollectionKey: "major",
      },
      {
        rootNote: "D",
        practicalRootNote: "D",
        pitchClass: 2,
        chordName: "DM",
        chordCollectionKey: "major",
      },
      {
        rootNote: "D",
        practicalRootNote: "D",
        pitchClass: 2,
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
      [gDominant7Reference],
      [cMajorReference],
      [cMajorReference],
    ],
  );
  assertEquals(
    getChordProgressionChordReferencesByBar("C", "plagalCadence"),
    [
      [fMajorReference],
      [fMajorReference],
      [cMajorReference],
      [cMajorReference],
    ],
  );
  assertEquals(
    getChordProgressionChordReferencesByBar("C", "minorPlagalCadence"),
    [
      [fMinorReference],
      [fMinorReference],
      [cMajorReference],
      [cMajorReference],
    ],
  );
  assertEquals(
    getChordProgressionChordReferencesByBar("C", "deceptiveCadence"),
    [
      [gDominant7Reference],
      [gDominant7Reference],
      [aMinorReference],
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
    4,
  );
  assertEquals(getChordProgressionTotalDurationInBars("plagalCadence"), 4);
  assertEquals(
    getChordProgressionTotalDurationInBars("minorPlagalCadence"),
    4,
  );
  assertEquals(getChordProgressionTotalDurationInBars("deceptiveCadence"), 4);
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

Deno.test("all built-in progression references preserve practical-root pitch", () => {
  for (const rootNote of rootNotes) {
    for (const progression of Object.values(chordProgressions)) {
      for (
        const reference of getChordProgressionChordChangeReferences(
          rootNote,
          progression,
        )
      ) {
        const theoreticalPitchClass = noteNameToIntegerMap.get(
          reference.rootNote,
        );
        const practicalPitchClass = rootNoteToIntegerMap.get(
          reference.practicalRootNote,
        );
        const context = `${rootNote}: ${reference.chordName}`;

        assertEquals(
          rootNotesSet.has(reference.practicalRootNote),
          true,
          context,
        );
        assertEquals(reference.pitchClass, theoreticalPitchClass, context);
        assertEquals(practicalPitchClass, theoreticalPitchClass, context);
      }
    }
  }
});

Deno.test("canonical progression resolver keeps event relationships together", () => {
  const resolved: ResolvedChordProgression = resolveChordProgression(
    "C",
    "oneFourOneFiveSplitReturn",
  );

  assertEquals(resolved.totalDurationInBars, 8);
  assertEquals(resolved.requiredBarDivision, 2);
  assertEquals(resolved.events.length, 9);
  assertEquals(resolved.events[6], {
    eventIndex: 6,
    chord: chordProgressions.oneFourOneFiveSplitReturn.chords[6],
    reference: cMajorReference,
    directRomanSymbol: "I",
    romanSymbol: "I",
    startInBars: 6,
    durationInBars: 0.5,
  });
  assertEquals(resolved.events[7], {
    eventIndex: 7,
    chord: chordProgressions.oneFourOneFiveSplitReturn.chords[7],
    reference: gMajorReference,
    directRomanSymbol: "V",
    romanSymbol: "V",
    startInBars: 6.5,
    durationInBars: 0.5,
  });
  assertEquals(resolved.bars[6], {
    barIndex: 6,
    startInBars: 6,
    durationInBars: 1,
    segments: [
      {
        eventIndex: 6,
        barIndex: 6,
        offsetInBar: 0,
        durationInBars: 0.5,
        continuesFromPreviousBar: false,
        continuesIntoNextBar: false,
      },
      {
        eventIndex: 7,
        barIndex: 6,
        offsetInBar: 0.5,
        durationInBars: 0.5,
        continuesFromPreviousBar: false,
        continuesIntoNextBar: false,
      },
    ],
  });
  assertEquals(resolved.bars[7], {
    barIndex: 7,
    startInBars: 7,
    durationInBars: 1,
    segments: [{
      eventIndex: 8,
      barIndex: 7,
      offsetInBar: 0,
      durationInBars: 1,
      continuesFromPreviousBar: false,
      continuesIntoNextBar: false,
    }],
  });
});

Deno.test("canonical progression resolver distinguishes direct and analysis symbols", () => {
  const event = resolveChordProgression("C", "jazzBlues").events[6];

  assertEquals(event.directRomanSymbol, "VI7");
  assertEquals(event.romanSymbol, "V7/ii");
});

Deno.test("canonical progression resolver handles rational and partial bars", () => {
  const thirds = resolveChordProgression("C", {
    chords: [
      { degree: "1", chordCollectionKey: "major", durationInBars: 1 / 3 },
      { degree: "4", chordCollectionKey: "major", durationInBars: 1 / 3 },
      { degree: "5", chordCollectionKey: "major", durationInBars: 1 / 3 },
    ],
  });
  assertEquals(thirds.requiredBarDivision, 3);
  assertEquals(thirds.totalDurationInBars, 1);
  assertEquals(
    thirds.bars[0]?.segments.map((segment) => ({
      eventIndex: segment.eventIndex,
      offsetInBar: segment.offsetInBar,
      durationInBars: segment.durationInBars,
    })),
    [
      { eventIndex: 0, offsetInBar: 0, durationInBars: 1 / 3 },
      { eventIndex: 1, offsetInBar: 1 / 3, durationInBars: 1 / 3 },
      { eventIndex: 2, offsetInBar: 2 / 3, durationInBars: 1 / 3 },
    ],
  );

  const partial = resolveChordProgression("C", {
    chords: [
      { degree: "1", chordCollectionKey: "major", durationInBars: 0.75 },
      { degree: "5", chordCollectionKey: "major", durationInBars: 0.5 },
    ],
  });
  assertEquals(partial.requiredBarDivision, 4);
  assertEquals(partial.totalDurationInBars, 1.25);
  assertEquals(partial.bars, [
    {
      barIndex: 0,
      startInBars: 0,
      durationInBars: 1,
      segments: [
        {
          eventIndex: 0,
          barIndex: 0,
          offsetInBar: 0,
          durationInBars: 0.75,
          continuesFromPreviousBar: false,
          continuesIntoNextBar: false,
        },
        {
          eventIndex: 1,
          barIndex: 0,
          offsetInBar: 0.75,
          durationInBars: 0.25,
          continuesFromPreviousBar: false,
          continuesIntoNextBar: true,
        },
      ],
    },
    {
      barIndex: 1,
      startInBars: 1,
      durationInBars: 0.25,
      segments: [{
        eventIndex: 1,
        barIndex: 1,
        offsetInBar: 0,
        durationInBars: 0.25,
        continuesFromPreviousBar: true,
        continuesIntoNextBar: false,
      }],
    },
  ]);
});

Deno.test("root-independent timing preserves multi-bar event continuation", () => {
  const timing: ChordProgressionTiming = getChordProgressionTiming(
    "authenticCadence",
  );
  const segments: readonly ChordProgressionBarSegment[] = timing.bars.flatMap(
    (bar) => bar.segments,
  );

  assertEquals(timing.totalDurationInBars, 4);
  assertEquals(timing.requiredBarDivision, 1);
  assertEquals(timing.endsOnBarBoundary, true);
  assertEquals(segments, [
    {
      eventIndex: 0,
      barIndex: 0,
      offsetInBar: 0,
      durationInBars: 1,
      continuesFromPreviousBar: false,
      continuesIntoNextBar: true,
    },
    {
      eventIndex: 0,
      barIndex: 1,
      offsetInBar: 0,
      durationInBars: 1,
      continuesFromPreviousBar: true,
      continuesIntoNextBar: false,
    },
    {
      eventIndex: 1,
      barIndex: 2,
      offsetInBar: 0,
      durationInBars: 1,
      continuesFromPreviousBar: false,
      continuesIntoNextBar: true,
    },
    {
      eventIndex: 1,
      barIndex: 3,
      offsetInBar: 0,
      durationInBars: 1,
      continuesFromPreviousBar: true,
      continuesIntoNextBar: false,
    },
  ]);
});

Deno.test("canonical progression resolver rejects invalid event durations", () => {
  const invalidProgression = {
    chords: [
      { degree: "1", chordCollectionKey: "major", durationInBars: 0 },
    ],
  } as ChordProgression;

  assertThrows(
    () => resolveChordProgression("C", invalidProgression),
    Error,
    "Chord progression chord 0 must have a finite positive durationInBars",
  );
});

Deno.test("chord progression focus object exposes progression derivations", () => {
  assertEquals(chordProgression.isValidKey("autumnLeavesA"), true);
  assertEquals(chordProgression.isValidKey("ionian"), false);
  assertEquals(chordProgression.isRootDegree("♯4"), true);
  assertEquals(chordProgression.isRootDegree("9"), false);
  assertEquals(chordProgression.normalizeRootDegree("b3"), "♭3");
  assertEquals(chordProgression.isChordCollectionKey("major7"), true);
  assertEquals(chordProgression.isRomanSymbol("V7"), true);
  assertEquals(chordProgression.isSecondaryRomanSymbol("V7/IV"), true);
  assertEquals(chordProgression.isAnalysisRomanSymbol("V7/IV"), true);
  assertEquals(chordProgression.parse({ chords: [] }).success, false);
  assertEquals(
    chordProgression.parseDefinition({
      name: "Cadence",
      progression: {
        chords: [{
          degree: "5",
          chordCollectionKey: "dominant7",
          durationInBars: 1,
        }],
      },
    }).success,
    true,
  );
  assertEquals(
    chordProgression.validate({ chords: [] })[0]?.code,
    "empty-progression",
  );
  assertEquals(
    chordProgression.validateDefinition({
      name: "",
      progression: { chords: [] },
    }).map((issue) => issue.code),
    ["invalid-name", "empty-progression"],
  );
  assertEquals(
    chordProgression.getTiming("authenticCadence").bars.map((bar) =>
      bar.segments.map((segment) => segment.eventIndex)
    ),
    [[0], [0], [1], [1]],
  );
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
  assertEquals(chordProgression.getKeysForTotalBars(2), []);
  assertEquals(chordProgression.getKeysForCategory("cadences"), [
    "authenticCadence",
    "plagalCadence",
    "minorPlagalCadence",
    "deceptiveCadence",
  ]);
});
