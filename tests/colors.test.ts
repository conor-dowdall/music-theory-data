import { assertEquals } from "@std/assert";
import {
  CHROMATIC_INDEXES,
  CHROMATIC_NOTE_COUNT,
} from "../src/data/chromatic.ts";
import {
  colorCollections,
  defaultNoteColorLabelCollectionKeys,
  getDefaultNoteColorLabelCollectionKey,
  getNoteColorLabels,
  type NoteColorCollection,
  type NoteColorValue,
} from "../src/data/colors/mod.ts";
import { noteLabelCollections } from "../src/data/labels/note-label-collections.ts";
import {
  getBestContrastColor,
  getContrastColor,
  getContrastRatio,
  getRelativeLuminance,
  isHexColor,
  normalizeHexColor,
  parseHexColor,
} from "../src/utils/colors.ts";
import {
  createChromaticTuple,
  isChromaticIndex,
  isChromaticTuple,
  normalizeChromaticIndex,
} from "../src/utils/chromatic.ts";
import {
  getAbsoluteNoteColorIndex,
  getNoteColorIndex,
  getRelativeNoteColorIndex,
} from "../src/utils/note-colors.ts";

Deno.test("color collections expose chromatic note color metadata", () => {
  const validModes = new Set(["absolute", "relative"]);

  for (const [key, collection] of Object.entries(colorCollections)) {
    assertEquals(
      collection.colors.length,
      CHROMATIC_NOTE_COUNT,
      `${key} should have exactly 12 colors`,
    );
    assertEquals(
      validModes.has(collection.mode),
      true,
      `${key} should have a valid mode`,
    );
    assertEquals(
      collection.relative,
      collection.mode === "relative",
      `${key} should keep relative aligned with mode`,
    );
    assertEquals(
      collection.labelCollectionKey,
      collection.mode === "relative" ? "intervalsFlat" : "noteNamesFlat",
      `${key} should use the default label collection for its mode`,
    );
    assertEquals(
      getNoteColorLabels(collection).length,
      CHROMATIC_NOTE_COUNT,
      `${key} should resolve exactly 12 labels`,
    );
  }
});

Deno.test("default note color label mapping uses flat note names and intervals", () => {
  assertEquals(defaultNoteColorLabelCollectionKeys.absolute, "noteNamesFlat");
  assertEquals(defaultNoteColorLabelCollectionKeys.relative, "intervalsFlat");
  assertEquals(
    getDefaultNoteColorLabelCollectionKey("absolute"),
    "noteNamesFlat",
  );
  assertEquals(
    getDefaultNoteColorLabelCollectionKey("relative"),
    "intervalsFlat",
  );

  const absoluteCollectionWithoutLabelKey: NoteColorCollection = {
    name: "Absolute",
    description: "Absolute colors without an explicit label collection.",
    mode: "absolute",
    colors: colorCollections.musoDojo.colors,
  };
  const relativeCollectionWithoutLabelKey: NoteColorCollection = {
    name: "Relative",
    description: "Relative colors without an explicit label collection.",
    mode: "relative",
    colors: colorCollections.musoDojoRoot.colors,
  };

  assertEquals(
    getNoteColorLabels(absoluteCollectionWithoutLabelKey),
    noteLabelCollections.noteNamesFlat.labels,
  );
  assertEquals(
    getNoteColorLabels(relativeCollectionWithoutLabelKey),
    noteLabelCollections.intervalsFlat.labels,
  );
  assertEquals(
    getNoteColorLabels({
      ...absoluteCollectionWithoutLabelKey,
      labelCollectionKey: "noteNamesSharp",
    }),
    noteLabelCollections.noteNamesSharp.labels,
  );
  assertEquals(
    isChromaticTuple(noteLabelCollections.noteNamesFlat.labels),
    true,
  );
  assertEquals(
    isChromaticTuple(noteLabelCollections.intervalsFlat.labels),
    true,
  );
});

Deno.test("chromatic index helpers normalize pitch classes", () => {
  assertEquals(CHROMATIC_INDEXES.length, CHROMATIC_NOTE_COUNT);
  assertEquals(normalizeChromaticIndex(0), 0);
  assertEquals(normalizeChromaticIndex(11), 11);
  assertEquals(normalizeChromaticIndex(12), 0);
  assertEquals(normalizeChromaticIndex(25), 1);
  assertEquals(normalizeChromaticIndex(1201), 1);
  assertEquals(normalizeChromaticIndex(-1), 11);
  assertEquals(normalizeChromaticIndex(-12), 0);
  assertEquals(normalizeChromaticIndex(-13), 11);
  assertEquals(isChromaticIndex(0), true);
  assertEquals(isChromaticIndex(11), true);
  assertEquals(isChromaticIndex(12), false);
  assertEquals(isChromaticIndex(1.5), false);
});

Deno.test("note color MIDI indexing supports absolute and relative modes", () => {
  assertEquals(getAbsoluteNoteColorIndex(60), 0);
  assertEquals(getAbsoluteNoteColorIndex(67), 7);
  assertEquals(getAbsoluteNoteColorIndex(-1), 11);

  assertEquals(getRelativeNoteColorIndex(60, 0), 0);
  assertEquals(getRelativeNoteColorIndex(67, 0), 7);
  assertEquals(getRelativeNoteColorIndex(62, 2), 0);
  assertEquals(getRelativeNoteColorIndex(69, 2), 7);

  assertEquals(getNoteColorIndex({ midi: 67, mode: "absolute" }), 7);
  assertEquals(
    getNoteColorIndex({ midi: 69, mode: "relative", rootPitchClass: 2 }),
    7,
  );
  assertEquals(getNoteColorIndex({ midi: 69, mode: "relative" }), 9);
});

Deno.test("chromatic tuples accept null note colors", () => {
  const colors = createChromaticTuple<NoteColorValue>([
    "#000000",
    null,
    null,
    null,
    null,
    null,
    null,
    "#FFFFFF",
    null,
    null,
    null,
    null,
  ]);

  assertEquals(colors.length, CHROMATIC_NOTE_COUNT);
  assertEquals(isChromaticTuple(colors), true);
  assertEquals(colors[1], null);
  assertEquals(colorCollections.musoDojoRoot.colors[1], null);

  let didThrow = false;
  try {
    createChromaticTuple(["#000000"]);
  } catch {
    didThrow = true;
  }
  assertEquals(didThrow, true);
});

Deno.test("hex color utilities normalize and reject expected strings", () => {
  const cases: readonly [
    input: string,
    normalized: string | null,
    rgb: [number, number, number] | null,
  ][] = [
    ["#RGB", null, null],
    ["#abc", "#AABBCC", [170, 187, 204]],
    ["abc", "#AABBCC", [170, 187, 204]],
    ["#ABCDEF", "#ABCDEF", [171, 205, 239]],
    ["abcdef", "#ABCDEF", [171, 205, 239]],
    [" #03f ", "#0033FF", [0, 51, 255]],
    ["#abz", null, null],
    ["#abcd", null, null],
    ["blue", null, null],
    ["", null, null],
  ];

  for (const [input, normalized, rgb] of cases) {
    assertEquals(normalizeHexColor(input), normalized);
    assertEquals(isHexColor(input), normalized !== null);
    assertEquals(parseHexColor(input), rgb);
  }
});

Deno.test("contrast utilities calculate luminance and best contrast colors", () => {
  assertEquals(getRelativeLuminance("#000"), 0);
  assertEquals(getRelativeLuminance("#fff"), 1);
  assertEquals(getRelativeLuminance("invalid"), null);
  assertEquals(getContrastRatio("#000", "#fff"), 21);
  assertEquals(getContrastRatio("#000", "invalid"), null);
  assertEquals(getBestContrastColor("#000"), "#FFFFFF");
  assertEquals(getBestContrastColor("#fff"), "#000000");
  assertEquals(getBestContrastColor("invalid"), null);
  assertEquals(getContrastColor("#000"), "white");
  assertEquals(getContrastColor("#fff"), "black");
  assertEquals(getContrastColor("invalid"), "black");
});
