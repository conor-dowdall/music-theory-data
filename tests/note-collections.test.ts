import { assertEquals } from "@std/assert";
import { noteCollection, rootAndNoteCollection } from "../src/mod.ts";
import {
  findNoteCollection,
  getIdentityForRootAndNoteCollection,
  getNoteCollectionDisplayName,
  getNoteCollectionPitchClasses,
  isValidNoteCollectionKey,
  noteCollectionDisplayNames,
  searchNoteCollections,
} from "../src/utils/note-collections.ts";
import { noteCollections } from "../src/data/note-collections/mod.ts";
import { isChromaticIndex } from "../src/utils/chromatic.ts";

Deno.test("isValidNoteCollectionKey", () => {
  assertEquals(isValidNoteCollectionKey("ionian"), true);
  assertEquals(isValidNoteCollectionKey("major"), true);
  assertEquals(isValidNoteCollectionKey("root"), true);
  assertEquals(isValidNoteCollectionKey("rootAndTritone"), true);
  assertEquals(isValidNoteCollectionKey("rootAndFourth"), true);
  assertEquals(isValidNoteCollectionKey("invalid_key"), false);
  assertEquals(isValidNoteCollectionKey(""), false);
});

Deno.test("searchNoteCollections - by query", () => {
  // "Major" is the primaryName for ionian
  const majorSearch = searchNoteCollections({ query: "Major" });
  assertEquals(majorSearch[0], noteCollections.ionian);

  // "maj" is an alias for "Major"
  const majSearch = searchNoteCollections({ query: "maj" });
  assertEquals(majSearch[0], noteCollections.ionian);

  // "Minor" is the primaryName for aeolian
  const minorSearch = searchNoteCollections({ query: "Minor" });
  assertEquals(minorSearch[0], noteCollections.aeolian);

  // "min" is an alias for "minor"
  const minSearch = searchNoteCollections({ query: "min" });
  assertEquals(minSearch[0], noteCollections.aeolian);

  // "Root Note" is an alias for the root-only collection
  const rootNoteSearch = searchNoteCollections({ query: "Root Note" });
  assertEquals(rootNoteSearch[0], noteCollections.root);
  assertEquals(noteCollections.root.category, "note");

  const tritoneSearch = searchNoteCollections({ query: "Root and Tritone" });
  assertEquals(tritoneSearch[0], noteCollections.rootAndTritone);
  assertEquals(noteCollections.rootAndTritone.category, "dyad");

  const fourthSearch = searchNoteCollections({ query: "Root and Fourth" });
  assertEquals(fourthSearch[0], noteCollections.rootAndFourth);
  assertEquals(noteCollections.rootAndFourth.category, "dyad");
  assertEquals(noteCollections.rootAndFifth.category, "dyad");

  // "dominant" is a type for mixolydian and dominant chords
  const dominantSearch = searchNoteCollections({
    query: "dominant",
    type: "arpeggio",
  });
  assertEquals(dominantSearch.includes(noteCollections.mixolydian), false);
  assertEquals(dominantSearch.includes(noteCollections.dominant7), true);

  // No results
  const noResultSearch = searchNoteCollections({ query: "nonexistent" });
  assertEquals(noResultSearch.length, 0);
});

Deno.test("searchNoteCollections - by type", () => {
  // Should find all 7 diatonic modes
  const churchModeSearch = searchNoteCollections({ type: "church mode" });
  assertEquals(churchModeSearch.length, 7);
  assertEquals(churchModeSearch.includes(noteCollections.ionian), true);
  assertEquals(churchModeSearch.includes(noteCollections.locrian), true);

  // Should find major chords (fixed logic)
  const majorChordSearch = searchNoteCollections({ type: "major chord" });
  assertEquals(majorChordSearch.includes(noteCollections.major), true);
  assertEquals(majorChordSearch.includes(noteCollections.major7), true);

  // Should find major scales (fixed logic)
  const majorScaleSearch = searchNoteCollections({ type: "major scale" });
  assertEquals(majorScaleSearch.includes(noteCollections.ionian), true);
  assertEquals(majorScaleSearch.includes(noteCollections.major), false);
});

Deno.test("searchNoteCollections - by category", () => {
  const noteSearch = searchNoteCollections({ category: "note" });
  assertEquals(noteSearch, [noteCollections.root]);

  const dyadSearch = searchNoteCollections({ category: "dyad" });
  assertEquals(dyadSearch.includes(noteCollections.rootAndTritone), true);
  assertEquals(dyadSearch.includes(noteCollections.rootAndFourth), true);
  assertEquals(dyadSearch.includes(noteCollections.rootAndFifth), true);
  assertEquals(dyadSearch.includes(noteCollections.major), false);

  const chordSearch = searchNoteCollections({
    category: "chord",
    query: "major",
  });
  assertEquals(chordSearch.includes(noteCollections.major), true);
  assertEquals(chordSearch.includes(noteCollections.ionian), false);
});

Deno.test("searchNoteCollections - by intervals", () => {
  // Ionian/Major scale intervals
  const majorIntervals = searchNoteCollections({
    intervals: ["1", "2", "3", "4", "5", "6", "7"],
  });
  assertEquals(majorIntervals[0], noteCollections.ionian);

  // Minor triad intervals
  const minorTriadIntervals = searchNoteCollections({
    intervals: ["1", "♭3", "5"],
  });
  assertEquals(minorTriadIntervals.includes(noteCollections.aeolian), true);
});

Deno.test("findNoteCollection - finds single best match", () => {
  // Should find ionian because "Major Scale" is an exact name match
  const majorScale = findNoteCollection({ query: "Major Scale" });
  assertEquals(majorScale, noteCollections.ionian);
  const majorScale2 = findNoteCollection({ query: "major scale" });
  assertEquals(majorScale2, noteCollections.ionian);

  const majorTriad = findNoteCollection({ query: "major triad" });
  assertEquals(majorTriad, noteCollections.major);

  const minorTriad = findNoteCollection({ query: "minor triad" });
  assertEquals(minorTriad, noteCollections.minor);

  // Returns undefined if no match
  const noMatch = findNoteCollection({ query: "nonexistent" });
  assertEquals(noMatch, undefined);
});

Deno.test("getNoteCollectionPitchClasses resolves rooted pitch-class sets", () => {
  assertEquals(
    Array.from(
      getNoteCollectionPitchClasses({
        rootNote: "C",
        noteCollectionKey: "ionian",
      }) ?? [],
    ).toSorted((a, b) => a - b),
    [0, 2, 4, 5, 7, 9, 11],
  );

  assertEquals(
    Array.from(
      getNoteCollectionPitchClasses({
        rootNote: "Bb",
        noteCollectionKey: "major",
      }) ?? [],
    ).toSorted((a, b) => a - b),
    [2, 5, 10],
  );

  assertEquals(
    Array.from(
      getNoteCollectionPitchClasses({
        rootNote: "G",
        noteCollectionKey: "dominant9",
      }) ?? [],
    ).toSorted((a, b) => a - b),
    [2, 5, 7, 9, 11],
  );

  assertEquals(
    getNoteCollectionPitchClasses({
      rootNote: "not-a-note",
      noteCollectionKey: "ionian",
    }),
    undefined,
  );
  assertEquals(
    getNoteCollectionPitchClasses({
      rootNote: "C",
      noteCollectionKey: "not-a-collection",
    }),
    undefined,
  );
});

Deno.test("note collection display names are available by key", () => {
  assertEquals(noteCollectionDisplayNames.get("ionian"), "Major");
  assertEquals(noteCollectionDisplayNames.get("major"), "M");
  assertEquals(getNoteCollectionDisplayName("aeolian"), "Minor");
  assertEquals(
    getNoteCollectionDisplayName("not-a-collection"),
    "not-a-collection",
  );
});

Deno.test("root and note collection identities format app-facing labels", () => {
  assertEquals(
    getIdentityForRootAndNoteCollection({
      rootNote: "Bb",
      noteCollectionKey: "ionian",
    }),
    {
      accessibleLabel: "B♭ Major",
      collectionName: "Major",
      isChord: false,
      label: "B♭ Major",
      rootNote: "B♭",
      separator: " ",
    },
  );

  assertEquals(
    getIdentityForRootAndNoteCollection({
      rootNote: "C",
      noteCollectionKey: "major",
    }),
    {
      accessibleLabel: "C major chord",
      collectionName: "",
      isChord: true,
      label: "C",
      rootNote: "C",
      separator: "",
    },
  );

  assertEquals(
    getIdentityForRootAndNoteCollection({
      rootNote: "F#",
      noteCollectionKey: "halfDiminished7",
    }),
    {
      accessibleLabel: "F♯ ø7",
      collectionName: "ø7",
      isChord: true,
      label: "F♯ø7",
      rootNote: "F♯",
      separator: "",
    },
  );

  assertEquals(
    getIdentityForRootAndNoteCollection({
      rootNote: "not-a-root",
      noteCollectionKey: "customCollection",
    }),
    {
      accessibleLabel: "not-a-root customCollection",
      collectionName: "customCollection",
      isChord: false,
      label: "not-a-root customCollection",
      rootNote: "not-a-root",
      separator: " ",
    },
  );
});

Deno.test("root and note collection focus object exposes common derivations", () => {
  assertEquals(
    rootAndNoteCollection.getIdentity({
      rootNote: "Bb",
      noteCollectionKey: "ionian",
    }),
    getIdentityForRootAndNoteCollection({
      rootNote: "Bb",
      noteCollectionKey: "ionian",
    }),
  );
  assertEquals(rootAndNoteCollection.getNoteNames("C", "major"), [
    "C",
    "E",
    "G",
  ]);
  assertEquals(rootAndNoteCollection.getIntervals("C", "major"), [
    "1",
    "3",
    "5",
  ]);
  assertEquals(rootAndNoteCollection.getTriadChordNames("C", "ionian"), [
    "C",
    "Dm",
    "Em",
    "F",
    "G",
    "Am",
    "B°",
  ]);
  assertEquals(
    rootAndNoteCollection.displayLayers.noteNames.id,
    "note-names",
  );
});

Deno.test("note collection focus object exposes catalog derivations", () => {
  assertEquals(noteCollection.isValidKey("ionian"), true);
  assertEquals(
    noteCollection.find({ query: "major scale" }),
    noteCollections.ionian,
  );
  assertEquals(noteCollection.search({ category: "note" }), [
    noteCollections.root,
  ]);
  assertEquals(noteCollection.getDisplayName("major"), "M");
  assertEquals(noteCollection.getIntervals("major"), ["1", "3", "5"]);
  assertEquals(noteCollection.getExtensions("dominant9"), [
    "1",
    "3",
    "5",
    "♭7",
    "9",
  ]);
  assertEquals(noteCollection.getCompoundIntervals("major"), ["1", "10", "12"]);
  assertEquals(noteCollection.getQualities("major"), ["P1", "M3", "P5"]);
  assertEquals(noteCollection.hasHarmony("ionian"), true);
  assertEquals(noteCollection.hasHarmony("major"), false);
  assertEquals(noteCollection.getTriadChordCollectionKeys("ionian"), [
    "major",
    "minor",
    "minor",
    "major",
    "major",
    "minor",
    "diminishedTriad",
  ]);
  assertEquals(noteCollection.getTriadChordSuffixes("ionian"), [
    "",
    "m",
    "m",
    "",
    "",
    "m",
    "°",
  ]);
  assertEquals(noteCollection.getSeventhChordSuffixes("ionian"), [
    "M7",
    "m7",
    "m7",
    "M7",
    "7",
    "m7",
    "ø7",
  ]);
  assertEquals(noteCollection.getRomanTriads("ionian"), [
    "I",
    "ii",
    "iii",
    "IV",
    "V",
    "vi",
    "vii°",
  ]);
  assertEquals(noteCollection.getRomanSeventhChords("ionian"), [
    "IM7",
    "iim7",
    "iiim7",
    "IVM7",
    "V7",
    "vim7",
    "viiø7",
  ]);
});

Deno.test("non-chord collection integers are chromatic pitch classes", () => {
  for (const collection of Object.values(noteCollections)) {
    if (collection.category === "chord") continue;

    assertEquals(
      collection.integers.every(isChromaticIndex),
      true,
      `${collection.primaryName} should use 0-11 chromatic integers`,
    );
  }
});
