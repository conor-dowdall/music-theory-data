import { assert, assertEquals, assertThrows } from "@std/assert";
import {
  beatSubdivisionKeys,
  beatSubdivisions,
  colorCollectionKeys,
  colorCollections,
  createNoteCollectionToneSequence,
  getBeatSubdivisionCount,
  getBeatSubdivisionStep,
  groupedNoteCollections,
  isBeatSubdivisionKey,
  isColorCollectionKey,
  isMidiNoteNumber,
  isNoteCollectionGroupKey,
  isStringInstrumentKey,
  isStringInstrumentTuningKey,
  isStringInstrumentTuningKeyForInstrument,
  noteCollection,
  noteCollectionGroupKeys,
  noteCollections,
  stringInstrumentKeys,
  stringInstruments,
  type StringInstrumentTuningKeyFor,
  stringInstrumentTuningKeys,
  stringInstrumentTuningKeysByInstrument,
  stringInstrumentTunings,
} from "../src/mod.ts";

const prototypePropertyNames = ["toString", "constructor", "__proto__"];

Deno.test("runtime value and catalog guards reject invalid inputs", () => {
  for (const midi of [0, 1, 60, 126, 127]) {
    assertEquals(isMidiNoteNumber(midi), true);
  }
  for (
    const value of [
      -1,
      128,
      60.5,
      "60",
      Number.NaN,
      Number.POSITIVE_INFINITY,
      Number.NEGATIVE_INFINITY,
    ]
  ) {
    assertEquals(isMidiNoteNumber(value), false);
  }

  assertEquals(isStringInstrumentKey("guitar"), true);
  assertEquals(isStringInstrumentTuningKey("guitarStandardE"), true);
  assertEquals(isColorCollectionKey("musoDojo"), true);
  assertEquals(isNoteCollectionGroupKey("diatonicModes"), true);
  assertEquals(isBeatSubdivisionKey("3-per-beat"), true);

  for (const value of prototypePropertyNames) {
    assertEquals(isStringInstrumentKey(value), false);
    assertEquals(isStringInstrumentTuningKey(value), false);
    assertEquals(isColorCollectionKey(value), false);
    assertEquals(isNoteCollectionGroupKey(value), false);
    assertEquals(isBeatSubdivisionKey(value), false);
    assertEquals(
      isStringInstrumentTuningKeyForInstrument("guitar", value),
      false,
    );
  }
  assertEquals(isBeatSubdivisionKey("9-per-beat"), false);
  assertEquals(isBeatSubdivisionKey(3), false);
});

Deno.test("instrument-specific tuning guard validates and narrows membership", () => {
  const guitarCandidate: unknown = "guitarDropD";
  if (
    isStringInstrumentTuningKeyForInstrument("guitar", guitarCandidate)
  ) {
    const guitarTuning: StringInstrumentTuningKeyFor<"guitar"> =
      guitarCandidate;
    assertEquals(guitarTuning, "guitarDropD");
  } else {
    throw new Error("Expected guitarDropD to be a guitar tuning");
  }

  // @ts-expect-error A bass tuning is not assignable to a guitar tuning key.
  const invalidGuitarTuning: StringInstrumentTuningKeyFor<"guitar"> =
    "bassStandardEadg";
  assertEquals(invalidGuitarTuning, "bassStandardEadg");

  assertEquals(
    isStringInstrumentTuningKeyForInstrument("guitar", "bassStandardEadg"),
    false,
  );
  assertEquals(
    isStringInstrumentTuningKeyForInstrument(
      "bassGuitar",
      "bassStandardEadg",
    ),
    true,
  );
  assertEquals(
    isStringInstrumentTuningKeyForInstrument("violin", "violaStandardCgda"),
    false,
  );
  assertEquals(
    isStringInstrumentTuningKeyForInstrument(
      "constructor" as "guitar",
      "guitarStandardE",
    ),
    false,
  );
});

Deno.test("ordered catalog keys are complete, unique, and stable", () => {
  assertEquals(colorCollectionKeys, [
    "musoDojo",
    "musoDojoRoot",
    "musoDojoRootAndFifth",
    "boomwhackers",
  ]);
  assertEquals(noteCollectionGroupKeys, [
    "diatonicModes",
    "pentatonicVariants",
    "majorVariants",
    "minorVariants",
    "dominantVariants",
    "harmonicMinorModes",
    "melodicMinorModes",
    "diminishedVariants",
    "augmentedVariants",
    "otherNoteCollections",
  ]);

  const catalogs = [
    [colorCollectionKeys, colorCollections],
    [noteCollectionGroupKeys, groupedNoteCollections],
    [stringInstrumentKeys, stringInstruments],
    [stringInstrumentTuningKeys, stringInstrumentTunings],
  ] as const;
  for (const [keys, catalog] of catalogs) {
    assertEquals(new Set(keys).size, keys.length);
    assertEquals([...keys].toSorted(), Object.keys(catalog).toSorted());
  }

  for (const instrument of stringInstrumentKeys) {
    const tuningKeys = stringInstrumentTuningKeysByInstrument[instrument];
    assertEquals(new Set(tuningKeys).size, tuningKeys.length);
  }
});

Deno.test("note collection tones preserve authored scale and chord positions", () => {
  const ionian = noteCollection.getToneSequence("ionian");
  assertEquals(ionian.tones.length, 7);
  assertEquals(ionian.pitchClasses, [0, 2, 4, 5, 7, 9, 11]);
  assertEquals(ionian.hasCompoundIntervals, false);
  assertEquals(ionian.tones[2], {
    collectionIndex: 2,
    semitones: 4,
    pitchClass: 4,
    octaveOffset: 0,
    interval: "3",
    intervalDegree: 3,
    pitchClassIndex: 2,
  });

  const major = noteCollection.getToneSequence("major");
  assertEquals(major.tones.map((tone) => tone.interval), ["1", "3", "5"]);
  assertEquals(major.pitchClasses, [0, 4, 7]);

  const major7 = noteCollection.getToneSequence("major7");
  assertEquals(major7.tones.map((tone) => tone.semitones), [0, 4, 7, 11]);
  assertEquals(major7.hasCompoundIntervals, false);

  const dominant9 = noteCollection.getToneSequence("dominant9");
  assertEquals(
    dominant9.tones.map((tone) => tone.semitones),
    [0, 4, 7, 10, 14],
  );
  assertEquals(dominant9.tones[4].pitchClass, 2);
  assertEquals(dominant9.tones[4].octaveOffset, 1);
  assertEquals(dominant9.tones[4].intervalDegree, 9);
  assertEquals(dominant9.hasCompoundIntervals, true);
  assert(Object.isFrozen(dominant9));
  assert(Object.isFrozen(dominant9.tones));

  for (const key of Object.keys(noteCollections)) {
    if (!noteCollection.isValidKey(key)) {
      throw new Error(`Unexpected note collection key: ${key}`);
    }
    const sequence = noteCollection.getToneSequence(key);
    assertEquals(sequence.tones.length, noteCollections[key].integers.length);
  }
});

Deno.test("tone sequences deduplicate only derived pitch classes", () => {
  const majorCollection = noteCollections.major;
  if (majorCollection.category !== "chord") {
    throw new Error("Expected major to be a chord collection");
  }
  const octaveDoubledMajor = createNoteCollectionToneSequence({
    ...majorCollection,
    intervals: ["1", "3", "5", "8"],
    integers: [0, 4, 7, 12],
  });

  assertEquals(octaveDoubledMajor.tones.length, 4);
  assertEquals(octaveDoubledMajor.pitchClasses, [0, 4, 7]);
  assertEquals(octaveDoubledMajor.tones[0].pitchClassIndex, 0);
  assertEquals(octaveDoubledMajor.tones[3].pitchClassIndex, 0);

  assertThrows(() =>
    createNoteCollectionToneSequence({
      ...majorCollection,
      intervals: ["1", "♭3", "5"],
      integers: [0, 4, 7],
    })
  );
});

Deno.test("tone positions use signed cyclic addressing", () => {
  assertEquals(noteCollection.getToneAtPosition("major", -1), {
    collectionIndex: 2,
    semitones: 7,
    pitchClass: 7,
    octaveOffset: 0,
    interval: "5",
    intervalDegree: 5,
    pitchClassIndex: 2,
    position: -1,
    cycle: -1,
    resolvedSemitones: -5,
  });
  assertEquals(
    noteCollection.getToneAtPosition("major", 3)?.resolvedSemitones,
    12,
  );
  assertEquals(
    noteCollection.getToneAtPosition("major", 7)?.resolvedSemitones,
    28,
  );
  assertEquals(
    noteCollection.getToneAtPosition("dominant9", 4)?.resolvedSemitones,
    14,
  );
  assertEquals(
    noteCollection.getToneAtPosition("dominant9", 5)?.resolvedSemitones,
    12,
  );
  assertEquals(noteCollection.getToneAtPosition("major", 1.5), undefined);
});

Deno.test("beat subdivisions expose exact meter-neutral rational steps", () => {
  assertEquals(beatSubdivisionKeys, [
    "1-per-beat",
    "2-per-beat",
    "3-per-beat",
    "4-per-beat",
    "5-per-beat",
    "6-per-beat",
    "7-per-beat",
    "8-per-beat",
  ]);
  assertEquals(Object.keys(beatSubdivisions), [...beatSubdivisionKeys]);
  assertEquals(new Set(beatSubdivisionKeys).size, beatSubdivisionKeys.length);

  for (let count = 1; count <= 8; count += 1) {
    const key = `${count}-per-beat`;
    assert(isBeatSubdivisionKey(key));
    assertEquals(getBeatSubdivisionCount(key), count);
    assertEquals(getBeatSubdivisionStep(key), {
      numerator: 1,
      denominator: count,
    });
  }
});
