import { assertEquals } from "@std/assert";
import {
  findNoteCollection,
  searchNoteCollections,
} from "../src/utils/note-collections.ts";
import { noteCollections } from "../src/data/note-collections/mod.ts";

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
