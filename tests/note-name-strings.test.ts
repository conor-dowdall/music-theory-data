import { assertEquals, assertThrows } from "@std/assert";
import {
  getNoteIntegerFromString,
  normalizeNoteNameString,
  normalizeNoteNameStringArray,
  normalizeRootNoteStringArray,
  type NoteName,
  noteNames,
  noteNameToIntegerMap,
  resolvePracticalRootNote,
  rootNotes,
  rootNotesSet,
  rootNoteToIntegerMap,
} from "../src/mod.ts";

Deno.test("natural notes", () => {
  assertEquals(getNoteIntegerFromString("C"), 0);
  assertEquals(getNoteIntegerFromString("c"), 0);
  assertEquals(getNoteIntegerFromString("D"), 2);
  assertEquals(getNoteIntegerFromString("d"), 2);
  assertEquals(getNoteIntegerFromString("E"), 4);
  assertEquals(getNoteIntegerFromString("e"), 4);
  assertEquals(getNoteIntegerFromString("F"), 5);
  assertEquals(getNoteIntegerFromString("f"), 5);
  assertEquals(getNoteIntegerFromString("G"), 7);
  assertEquals(getNoteIntegerFromString("g"), 7);
  assertEquals(getNoteIntegerFromString("A"), 9);
  assertEquals(getNoteIntegerFromString("a"), 9);
  assertEquals(getNoteIntegerFromString("B"), 11);
  assertEquals(getNoteIntegerFromString("b"), 11);
});

Deno.test("sharp notes using '#'", () => {
  assertEquals(getNoteIntegerFromString("B#"), 0);
  assertEquals(getNoteIntegerFromString("b#"), 0);
  assertEquals(getNoteIntegerFromString("C#"), 1);
  assertEquals(getNoteIntegerFromString("c#"), 1);
  assertEquals(getNoteIntegerFromString("D#"), 3);
  assertEquals(getNoteIntegerFromString("d#"), 3);
  assertEquals(getNoteIntegerFromString("F#"), 6);
  assertEquals(getNoteIntegerFromString("f#"), 6);
  assertEquals(getNoteIntegerFromString("G#"), 8);
  assertEquals(getNoteIntegerFromString("g#"), 8);
  assertEquals(getNoteIntegerFromString("A#"), 10);
  assertEquals(getNoteIntegerFromString("a#"), 10);
});

Deno.test("flat notes using 'b'", () => {
  assertEquals(getNoteIntegerFromString("Db"), 1);
  assertEquals(getNoteIntegerFromString("db"), 1);
  assertEquals(getNoteIntegerFromString("Eb"), 3);
  assertEquals(getNoteIntegerFromString("eb"), 3);
  assertEquals(getNoteIntegerFromString("Fb"), 4);
  assertEquals(getNoteIntegerFromString("fb"), 4);
  assertEquals(getNoteIntegerFromString("Gb"), 6);
  assertEquals(getNoteIntegerFromString("gb"), 6);
  assertEquals(getNoteIntegerFromString("Ab"), 8);
  assertEquals(getNoteIntegerFromString("ab"), 8);
  assertEquals(getNoteIntegerFromString("Bb"), 10);
  assertEquals(getNoteIntegerFromString("bb"), 10);
  assertEquals(getNoteIntegerFromString("Cb"), 11);
  assertEquals(getNoteIntegerFromString("cb"), 11);
});

Deno.test("sharp notes using '♯'", () => {
  assertEquals(getNoteIntegerFromString("B♯"), 0);
  assertEquals(getNoteIntegerFromString("b♯"), 0);
  assertEquals(getNoteIntegerFromString("C♯"), 1);
  assertEquals(getNoteIntegerFromString("c♯"), 1);
  assertEquals(getNoteIntegerFromString("D♯"), 3);
  assertEquals(getNoteIntegerFromString("d♯"), 3);
  assertEquals(getNoteIntegerFromString("F♯"), 6);
  assertEquals(getNoteIntegerFromString("f♯"), 6);
  assertEquals(getNoteIntegerFromString("G♯"), 8);
  assertEquals(getNoteIntegerFromString("g♯"), 8);
  assertEquals(getNoteIntegerFromString("A♯"), 10);
  assertEquals(getNoteIntegerFromString("a♯"), 10);
});

Deno.test("flat notes using '♭'", () => {
  assertEquals(getNoteIntegerFromString("D♭"), 1);
  assertEquals(getNoteIntegerFromString("d♭"), 1);
  assertEquals(getNoteIntegerFromString("E♭"), 3);
  assertEquals(getNoteIntegerFromString("e♭"), 3);
  assertEquals(getNoteIntegerFromString("F♭"), 4);
  assertEquals(getNoteIntegerFromString("f♭"), 4);
  assertEquals(getNoteIntegerFromString("G♭"), 6);
  assertEquals(getNoteIntegerFromString("g♭"), 6);
  assertEquals(getNoteIntegerFromString("A♭"), 8);
  assertEquals(getNoteIntegerFromString("a♭"), 8);
  assertEquals(getNoteIntegerFromString("B♭"), 10);
  assertEquals(getNoteIntegerFromString("b♭"), 10);
  assertEquals(getNoteIntegerFromString("C♭"), 11);
  assertEquals(getNoteIntegerFromString("c♭"), 11);
});

Deno.test("handle double sharps and flats", () => {
  assertEquals(getNoteIntegerFromString("Dbb"), 0);
  assertEquals(getNoteIntegerFromString("D♭♭"), 0);
  assertEquals(getNoteIntegerFromString("B##"), 1);
  assertEquals(getNoteIntegerFromString("b##"), 1);
  assertEquals(getNoteIntegerFromString("C##"), 2);
  assertEquals(getNoteIntegerFromString("c##"), 2);
  assertEquals(getNoteIntegerFromString("D##"), 4);
  assertEquals(getNoteIntegerFromString("d##"), 4);
  assertEquals(getNoteIntegerFromString("Cbb"), 10);
  assertEquals(getNoteIntegerFromString("cbb"), 10);
  assertEquals(getNoteIntegerFromString("Cx"), 2);
  assertEquals(getNoteIntegerFromString("E𝄫"), 2);
});

Deno.test("invalid note names", () => {
  assertEquals(getNoteIntegerFromString("E𝄫b"), undefined);
  assertEquals(getNoteIntegerFromString("H"), undefined);
  assertEquals(getNoteIntegerFromString(""), undefined);
  assertEquals(getNoteIntegerFromString(" "), undefined);
});

Deno.test("normalize valid note name strings", () => {
  assertEquals(normalizeNoteNameString("Cbb"), "C𝄫");
  assertEquals(normalizeNoteNameString("C♭♭"), "C𝄫");
  assertEquals(normalizeNoteNameString("Cb"), "C♭");
  assertEquals(normalizeNoteNameString("C♭"), "C♭");
  assertEquals(normalizeNoteNameString("C"), "C");
  assertEquals(normalizeNoteNameString("C#"), "C♯");
  assertEquals(normalizeNoteNameString("C♯"), "C♯");
  assertEquals(normalizeNoteNameString("C##"), "C𝄪");
  assertEquals(normalizeNoteNameString("C♯♯"), "C𝄪");
  assertEquals(normalizeNoteNameString("Cx"), "C𝄪");
  assertEquals(normalizeNoteNameString("CX"), "C𝄪");
});

Deno.test("normalize invalid note name strings", () => {
  assertEquals(normalizeNoteNameString("Cbbb"), undefined);
  assertEquals(normalizeNoteNameString("C♭♭♭"), undefined);
  assertEquals(normalizeNoteNameString("Cu"), undefined);
  assertEquals(normalizeNoteNameString("J♭"), undefined);
  assertEquals(normalizeNoteNameString("Q"), undefined);
  assertEquals(normalizeNoteNameString("C###"), undefined);
  assertEquals(normalizeNoteNameString("C♯♯♯♯♯♯"), undefined);
  assertEquals(normalizeNoteNameString("C##u"), undefined);
  assertEquals(normalizeNoteNameString("Ca♯♯"), undefined);
  assertEquals(normalizeNoteNameString("CCx"), undefined);
  assertEquals(normalizeNoteNameString("CXxxZX"), undefined);
});

Deno.test("normalize array of potential note name strings", () => {
  const input = ["C", "Db", "invalid", "Fx", ""];
  const expected = ["C", "D♭", "F𝄪"];
  assertEquals(normalizeNoteNameStringArray(input), expected);
});

Deno.test("normalize array of potential root note strings", () => {
  const input = ["C", "Db", "Fx", "invalid", "B#", "Dbb", "E##"];
  // Fx is a valid NoteName (F𝄪) but NOT a valid RootNote.
  // B# normalizes to B♯, which IS a valid RootNote.
  // Dbb normalizes to D𝄫, which IS NOT a valid RootNote.
  // E## normalizes to E𝄪, which IS NOT a valid RootNote.
  const expected = ["C", "D♭", "B♯"];
  assertEquals(normalizeRootNoteStringArray(input), expected);
});

Deno.test("practical root resolution preserves every note name's pitch", () => {
  for (const noteName of noteNames) {
    const practicalRootNote = resolvePracticalRootNote(noteName);

    assertEquals(rootNotesSet.has(practicalRootNote), true, noteName);
    assertEquals(
      rootNoteToIntegerMap.get(practicalRootNote),
      noteNameToIntegerMap.get(noteName),
      noteName,
    );
  }
});

Deno.test("practical root resolution preserves every existing root spelling", () => {
  for (const rootNote of rootNotes) {
    assertEquals(resolvePracticalRootNote(rootNote), rootNote);
  }
});

Deno.test("practical root resolution deterministically respells theoretical notes", () => {
  assertEquals(resolvePracticalRootNote("F𝄪"), "G");
  assertEquals(resolvePracticalRootNote("B𝄫"), "A");
  assertEquals(resolvePracticalRootNote("B𝄪"), "C♯");
  assertEquals(resolvePracticalRootNote("E𝄫"), "D");
  assertEquals(resolvePracticalRootNote("C♯"), "C♯");
  assertEquals(resolvePracticalRootNote("D♭"), "D♭");
  assertEquals(resolvePracticalRootNote("C♮"), "C");
});

Deno.test("practical root resolution rejects missing canonical mappings", () => {
  assertThrows(
    () => resolvePracticalRootNote("not-a-note" as NoteName),
    Error,
    "No chromatic index mapping",
  );
});
