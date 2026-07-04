import { assertEquals } from "@std/assert";
import {
  getFixedDoSyllableForNoteName,
  getFixedDoSyllablesForNoteNames,
  getMovableDoSyllableEntryForInterval,
  getMovableDoSyllableForInterval,
  getMovableDoSyllablesForIntervals,
  movableDoIntervalSyllableMaps,
  solfegeSystemMetadata,
} from "../src/mod.ts";

Deno.test("fixed do omits accidentals by default", () => {
  assertEquals(getFixedDoSyllableForNoteName("C"), "do");
  assertEquals(getFixedDoSyllableForNoteName("C♯"), "do");
  assertEquals(getFixedDoSyllableForNoteName("C𝄪"), "do");
  assertEquals(getFixedDoSyllableForNoteName("D♭"), "re");
  assertEquals(getFixedDoSyllableForNoteName("B"), "si");
});

Deno.test("fixed do supports ti and accidental-symbol policies", () => {
  assertEquals(
    getFixedDoSyllableForNoteName("B♭", { seventhSyllable: "ti" }),
    "ti",
  );
  assertEquals(
    getFixedDoSyllableForNoteName("B♭", {
      seventhSyllable: "ti",
      accidentalPolicy: "symbolAccidentals",
    }),
    "ti♭",
  );
  assertEquals(
    getFixedDoSyllablesForNoteNames(["C𝄪", "D𝄫", "E♮"], {
      accidentalPolicy: "symbolAccidentals",
    }),
    ["do𝄪", "re𝄫", "mi♮"],
  );
});

Deno.test("movable do maps interval spellings instead of chromatic slots", () => {
  assertEquals(getMovableDoSyllableForInterval("♯4"), "fi");
  assertEquals(getMovableDoSyllableForInterval("♭5"), "se");
  assertEquals(getMovableDoSyllableForInterval("♯5"), "si");
  assertEquals(getMovableDoSyllableForInterval("7"), "ti");
  assertEquals(getMovableDoSyllableForInterval("♭9"), "ra");
  assertEquals(getMovableDoSyllableForInterval("𝄫7"), "la");

  const loweredThird = getMovableDoSyllableEntryForInterval("♭3");
  assertEquals(loweredThird?.syllable, "me");
  assertEquals(loweredThird?.aliases, ["ma"]);
});

Deno.test("la-based movable minor maps the tonic to la", () => {
  assertEquals(getMovableDoSyllableForInterval("1", "laBasedMinor"), "la");
  assertEquals(getMovableDoSyllableForInterval("♭3", "laBasedMinor"), "do");
  assertEquals(getMovableDoSyllableForInterval("5", "laBasedMinor"), "mi");
  assertEquals(getMovableDoSyllableForInterval("♭7", "laBasedMinor"), "sol");
  assertEquals(getMovableDoSyllableForInterval("7", "laBasedMinor"), "si");
  assertEquals(getMovableDoSyllableForInterval("𝄫7", "laBasedMinor"), "se");
});

Deno.test("movable do leaves unsupported spellings undefined", () => {
  assertEquals(getMovableDoSyllableForInterval("𝄪4"), undefined);
  assertEquals(getMovableDoSyllableForInterval("𝄫9"), undefined);
  assertEquals(
    getMovableDoSyllablesForIntervals(["1", "♭3", "5", "𝄪4"]),
    ["do", "me", "sol", undefined],
  );
});

Deno.test("solfege metadata and maps are exported", () => {
  assertEquals(solfegeSystemMetadata.fixedDo.shortName, "Fixed Do");
  assertEquals(solfegeSystemMetadata.doBased.shortName, "Movable Do");
  assertEquals(
    solfegeSystemMetadata.laBasedMinor.shortName,
    "Movable La",
  );
  assertEquals(movableDoIntervalSyllableMaps.doBased.get("1")?.syllable, "do");
  assertEquals(
    movableDoIntervalSyllableMaps.laBasedMinor.get("1")?.syllable,
    "la",
  );
});
