import { assertEquals } from "@std/assert";
import {
  chordProgressionStepNoteCollectionKeys,
  chordProgressionTemplateCategoryMetadata,
  chordProgressionTemplateGroupsMetadata,
  chordProgressionTemplates,
  chordProgressionTemplateTypeMetadata,
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
  assertEquals(isValidChordProgressionTemplateKey("oneFive"), true);
  assertEquals(isValidChordProgressionTemplateKey("oneFour"), true);
  assertEquals(isValidChordProgressionTemplateKey("oneOneFiveFive"), true);
  assertEquals(isValidChordProgressionTemplateKey("oneOneFiveFiveSeven"), true);
  assertEquals(isValidChordProgressionTemplateKey("oneFourOneFive"), true);
  assertEquals(isValidChordProgressionTemplateKey("twoFiveOneMajor"), true);
  assertEquals(isValidChordProgressionTemplateKey("rhythmChanges"), true);
  assertEquals(isValidChordProgressionTemplateKey("jazzBluesBasic"), true);
  assertEquals(isValidChordProgressionTemplateKey("ionian"), false);
  assertEquals(isValidChordProgressionTemplateKey(""), false);
});

Deno.test("chord progression template exports", () => {
  assertEquals(
    chordProgressionTemplates.oneFourFive.primaryName,
    "I IV V",
  );
  assertEquals(
    groupedChordProgressionTemplates.basicChordProgressionTemplates.oneFourFive,
    chordProgressionTemplates.oneFourFive,
  );
  assertEquals(
    groupedChordProgressionTemplates.basicChordProgressionTemplates.oneFive,
    chordProgressionTemplates.oneFive,
  );
  assertEquals(chordProgressionTemplates.oneFourFive.templateType, "formula");
  assertEquals(chordProgressionTemplates.oneFive.templateType, "formula");
  assertEquals(chordProgressionTemplates.oneOneFiveFive.templateType, "loop");
  assertEquals(chordProgressionTemplates.twelveBarBlues.templateType, "form");
  assertEquals(
    groupedChordProgressionTemplates.jazzChordProgressionTemplates
      .rhythmChanges.sections.map((section) => section.name),
    ["A1", "A2", "B", "A3"],
  );
});

Deno.test("chord progression template metadata matches exported groups", () => {
  assertEquals(
    Object.keys(chordProgressionTemplateGroupsMetadata),
    Object.keys(groupedChordProgressionTemplates),
  );
  assertEquals(
    chordProgressionTemplateCategoryMetadata.basic.displayName,
    "Basic",
  );
  assertEquals(
    chordProgressionTemplateCategoryMetadata.jazz.displayName,
    "Jazz",
  );
  assertEquals(chordProgressionTemplateTypeMetadata.form.displayName, "Form");
  assertEquals(chordProgressionTemplateTypeMetadata.loop.displayName, "Loop");
});

Deno.test("chord progression steps use canonical chord collection keys", () => {
  for (const template of Object.values(chordProgressionTemplates)) {
    for (const section of template.sections) {
      for (const step of section.chords) {
        assertEquals(
          step.noteCollectionKey,
          chordProgressionStepNoteCollectionKeys[step.quality],
        );
      }
    }
  }
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
    searchChordProgressionTemplates({ query: "one five" })[0],
    chordProgressionTemplates.oneFive,
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
    loopTemplates.includes(chordProgressionTemplates.oneFourOneFive),
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
    formTemplates.includes(chordProgressionTemplates.rhythmChanges),
    true,
  );
  assertEquals(formTemplates.includes(chordProgressionTemplates.dooWop), false);
});

Deno.test("chord progression template render helpers", () => {
  assertEquals(getChordProgressionTemplateDegreeNames("oneFive"), [
    "1M",
    "5M",
  ]);
  assertEquals(getChordProgressionTemplateRomanNames("oneFour"), [
    "I",
    "IV",
  ]);
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
  assertEquals(getChordProgressionTemplateRomanNames("oneFourOneFive"), [
    "I",
    "IV",
    "I",
    "V",
  ]);
  assertEquals(getChordProgressionTemplateChordNames("D", "oneFourOneFive"), [
    "DM",
    "GM",
    "DM",
    "AM",
  ]);
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
  assertEquals(chordProgressionTemplates.rhythmChanges.sections, [
    {
      name: "A1",
      chords: [
        { interval: "1", quality: "M7", noteCollectionKey: "major7" },
        { interval: "6", quality: "m7", noteCollectionKey: "minor7" },
        { interval: "2", quality: "m7", noteCollectionKey: "minor7" },
        { interval: "5", quality: "7", noteCollectionKey: "dominant7" },
        { interval: "3", quality: "m7", noteCollectionKey: "minor7" },
        { interval: "6", quality: "7", noteCollectionKey: "dominant7" },
        { interval: "2", quality: "m7", noteCollectionKey: "minor7" },
        { interval: "5", quality: "7", noteCollectionKey: "dominant7" },
      ],
    },
    {
      name: "A2",
      chords: [
        { interval: "1", quality: "M7", noteCollectionKey: "major7" },
        { interval: "6", quality: "m7", noteCollectionKey: "minor7" },
        { interval: "2", quality: "m7", noteCollectionKey: "minor7" },
        { interval: "5", quality: "7", noteCollectionKey: "dominant7" },
        { interval: "3", quality: "m7", noteCollectionKey: "minor7" },
        { interval: "6", quality: "7", noteCollectionKey: "dominant7" },
        { interval: "2", quality: "m7", noteCollectionKey: "minor7" },
        { interval: "5", quality: "7", noteCollectionKey: "dominant7" },
      ],
    },
    {
      name: "B",
      chords: [
        { interval: "3", quality: "7", noteCollectionKey: "dominant7" },
        { interval: "3", quality: "7", noteCollectionKey: "dominant7" },
        { interval: "6", quality: "7", noteCollectionKey: "dominant7" },
        { interval: "6", quality: "7", noteCollectionKey: "dominant7" },
        { interval: "2", quality: "7", noteCollectionKey: "dominant7" },
        { interval: "2", quality: "7", noteCollectionKey: "dominant7" },
        { interval: "5", quality: "7", noteCollectionKey: "dominant7" },
        { interval: "5", quality: "7", noteCollectionKey: "dominant7" },
      ],
    },
    {
      name: "A3",
      chords: [
        { interval: "1", quality: "M7", noteCollectionKey: "major7" },
        { interval: "6", quality: "m7", noteCollectionKey: "minor7" },
        { interval: "2", quality: "m7", noteCollectionKey: "minor7" },
        { interval: "5", quality: "7", noteCollectionKey: "dominant7" },
        { interval: "3", quality: "m7", noteCollectionKey: "minor7" },
        { interval: "6", quality: "7", noteCollectionKey: "dominant7" },
        { interval: "2", quality: "m7", noteCollectionKey: "minor7" },
        { interval: "5", quality: "7", noteCollectionKey: "dominant7" },
      ],
    },
  ]);
  assertEquals(getChordProgressionTemplateRomanNames("rhythmChanges"), [
    "IM7",
    "vim7",
    "iim7",
    "V7",
    "iiim7",
    "VI7",
    "iim7",
    "V7",
    "IM7",
    "vim7",
    "iim7",
    "V7",
    "iiim7",
    "VI7",
    "iim7",
    "V7",
    "III7",
    "III7",
    "VI7",
    "VI7",
    "II7",
    "II7",
    "V7",
    "V7",
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
    getChordProgressionTemplateChordNames("B♭", "rhythmChanges").slice(16, 24),
    ["D7", "D7", "G7", "G7", "C7", "C7", "F7", "F7"],
  );
});
