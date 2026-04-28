import { assertEquals } from "@std/assert";
import {
  chordProgressionTemplates,
  groupedChordProgressionTemplates,
} from "../src/data/chord-progressions/mod.ts";
import {
  findChordProgressionTemplate,
  getChordProgressionTemplateChordNames,
  getChordProgressionTemplateDegreeNames,
  getChordProgressionTemplateRomanNames,
  getRomanNumeralForIntervalAndChordQuality,
  isValidChordProgressionTemplateKey,
  searchChordProgressionTemplates,
} from "../src/utils/chord-progressions.ts";

Deno.test("isValidChordProgressionTemplateKey", () => {
  assertEquals(isValidChordProgressionTemplateKey("oneFourFive"), true);
  assertEquals(isValidChordProgressionTemplateKey("oneOneFiveFive"), true);
  assertEquals(isValidChordProgressionTemplateKey("oneOneFiveFiveSeven"), true);
  assertEquals(isValidChordProgressionTemplateKey("twoFiveOneMajor"), true);
  assertEquals(
    isValidChordProgressionTemplateKey("rhythmChangesBSection"),
    true,
  );
  assertEquals(isValidChordProgressionTemplateKey("jazzBluesBasic"), true);
  assertEquals(isValidChordProgressionTemplateKey("ionian"), false);
  assertEquals(isValidChordProgressionTemplateKey(""), false);
});

Deno.test("chord progression template exports", () => {
  assertEquals(
    chordProgressionTemplates.oneFourFive.primaryName,
    "One Four Five",
  );
  assertEquals(
    groupedChordProgressionTemplates.basicChordProgressionTemplates.oneFourFive,
    chordProgressionTemplates.oneFourFive,
  );
  assertEquals(chordProgressionTemplates.oneFourFive.templateType, "formula");
  assertEquals(chordProgressionTemplates.oneOneFiveFive.templateType, "loop");
  assertEquals(chordProgressionTemplates.twelveBarBlues.templateType, "form");
  assertEquals(
    groupedChordProgressionTemplates.jazzChordProgressionTemplates
      .rhythmChangesASection.sections[0].name,
    "A",
  );
});

Deno.test("searchChordProgressionTemplates - by query and category", () => {
  assertEquals(
    searchChordProgressionTemplates({ query: "I IV V" })[0],
    chordProgressionTemplates.oneFourFive,
  );
  assertEquals(
    searchChordProgressionTemplates({ query: "1 4 5" })[0],
    chordProgressionTemplates.oneFourFive,
  );
  assertEquals(
    searchChordProgressionTemplates({ query: "two five one" })[0],
    chordProgressionTemplates.twoFiveOneMajor,
  );
  assertEquals(
    findChordProgressionTemplate({ query: "jazz blues" }),
    chordProgressionTemplates.jazzBluesBasic,
  );

  const jazzTemplates = searchChordProgressionTemplates({ category: "jazz" });
  assertEquals(
    jazzTemplates.includes(chordProgressionTemplates.twoFiveOneMajor),
    true,
  );
  assertEquals(
    jazzTemplates.includes(chordProgressionTemplates.oneFourFive),
    false,
  );

  const loopTemplates = searchChordProgressionTemplates({
    templateType: "loop",
  });
  assertEquals(
    loopTemplates.includes(chordProgressionTemplates.oneOneFiveFive),
    true,
  );
  assertEquals(
    loopTemplates.includes(chordProgressionTemplates.oneOneFiveFiveSeven),
    true,
  );
  assertEquals(
    loopTemplates.includes(chordProgressionTemplates.oneFourFive),
    false,
  );

  const formTemplates = searchChordProgressionTemplates({
    templateType: "form",
  });
  assertEquals(
    formTemplates.includes(chordProgressionTemplates.rhythmChangesBSection),
    true,
  );
  assertEquals(formTemplates.includes(chordProgressionTemplates.dooWop), false);
});

Deno.test("chord progression template render helpers", () => {
  assertEquals(getChordProgressionTemplateDegreeNames("oneFourFive"), [
    "1M",
    "4M",
    "5M",
  ]);
  assertEquals(getChordProgressionTemplateRomanNames("oneFourFive"), [
    "I",
    "IV",
    "V",
  ]);
  assertEquals(getChordProgressionTemplateChordNames("C", "oneFourFive"), [
    "CM",
    "FM",
    "GM",
  ]);
});

Deno.test("chord progression template render helpers - playable loops", () => {
  assertEquals(getChordProgressionTemplateRomanNames("oneOneFiveFive"), [
    "I",
    "I",
    "V",
    "V",
  ]);
  assertEquals(getChordProgressionTemplateRomanNames("oneOneFiveFiveSeven"), [
    "I",
    "I",
    "V",
    "V7",
  ]);
  assertEquals(
    getChordProgressionTemplateChordNames("G", "oneOneFiveFiveSeven"),
    [
      "GM",
      "GM",
      "DM",
      "D7",
    ],
  );
});

Deno.test("chord progression template render helpers - seventh chords", () => {
  assertEquals(getChordProgressionTemplateDegreeNames("twoFiveOneMajor"), [
    "2m7",
    "57",
    "1M7",
  ]);
  assertEquals(getChordProgressionTemplateRomanNames("twoFiveOneMajor"), [
    "iim7",
    "V7",
    "IM7",
  ]);
  assertEquals(getChordProgressionTemplateChordNames("B♭", "twoFiveOneMajor"), [
    "Cm7",
    "F7",
    "B♭M7",
  ]);
});

Deno.test("getRomanNumeralForIntervalAndChordQuality", () => {
  assertEquals(getRomanNumeralForIntervalAndChordQuality("♭7", "M7"), "♭VIIM7");
  assertEquals(getRomanNumeralForIntervalAndChordQuality("2", "ø7"), "iiø7");
  assertEquals(getRomanNumeralForIntervalAndChordQuality("5", "7"), "V7");
  assertEquals(getRomanNumeralForIntervalAndChordQuality("♯4", "°7"), "♯iv°7");
});

Deno.test("sectioned templates preserve section labels and order", () => {
  assertEquals(chordProgressionTemplates.rhythmChangesASection.sections, [
    {
      name: "A",
      chords: [
        { interval: "1", quality: "M7" },
        { interval: "6", quality: "m7" },
        { interval: "2", quality: "m7" },
        { interval: "5", quality: "7" },
        { interval: "3", quality: "m7" },
        { interval: "6", quality: "7" },
        { interval: "2", quality: "m7" },
        { interval: "5", quality: "7" },
      ],
    },
  ]);
  assertEquals(getChordProgressionTemplateRomanNames("rhythmChangesASection"), [
    "IM7",
    "vim7",
    "iim7",
    "V7",
    "iiim7",
    "VI7",
    "iim7",
    "V7",
  ]);
  assertEquals(
    chordProgressionTemplates.rhythmChangesBSection.sections[0].name,
    "B",
  );
  assertEquals(getChordProgressionTemplateRomanNames("rhythmChangesBSection"), [
    "III7",
    "III7",
    "VI7",
    "VI7",
    "II7",
    "II7",
    "V7",
    "V7",
  ]);
  assertEquals(
    getChordProgressionTemplateChordNames("B♭", "rhythmChangesBSection"),
    [
      "D7",
      "D7",
      "G7",
      "G7",
      "C7",
      "C7",
      "F7",
      "F7",
    ],
  );
});
