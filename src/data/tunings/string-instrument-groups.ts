import type { StringInstrumentGroup } from "../../types/string-instruments.d.ts";

/** Curated group for guitar tunings and fretboard use cases. */
export const guitarInstrumentGroup: StringInstrumentGroup = {
  displayName: "Guitar",
  description:
    "Guitar fretboards with common standard, alternate, and open tunings.",
  instrumentKeys: ["guitar"],
} as const;

/** Curated group for bass guitar tunings and fretboard use cases. */
export const bassInstrumentGroup: StringInstrumentGroup = {
  displayName: "Bass",
  description:
    "Bass guitar fretboards with common standard and extended-range tunings.",
  instrumentKeys: ["bassGuitar"],
} as const;

/** Curated group for mandolin, ukulele, and similar fretted strings. */
export const folkAndFrettedStringsInstrumentGroup: StringInstrumentGroup = {
  displayName: "Folk & Fretted Strings",
  description:
    "Mandolin, ukulele, and related fretted string instruments often used in folk, traditional, and popular styles.",
  instrumentKeys: ["mandolin", "ukulele"],
} as const;

/** Curated group for violin, viola, cello, and double bass. */
export const orchestralStringsInstrumentGroup: StringInstrumentGroup = {
  displayName: "Orchestral Strings",
  description:
    "Violin, viola, cello, and double bass as the standard bowed string section of the orchestra.",
  instrumentKeys: ["violin", "viola", "cello", "doubleBass"],
} as const;

const _stringInstrumentGroups = {
  guitar: guitarInstrumentGroup,
  bass: bassInstrumentGroup,
  folkAndFrettedStrings: folkAndFrettedStringsInstrumentGroup,
  orchestralStrings: orchestralStringsInstrumentGroup,
} as const;

/** A key for one of the built-in string instrument groups. */
export type StringInstrumentGroupKey = keyof typeof _stringInstrumentGroups;

/** Dictionary of built-in string instrument groups keyed by group id. */
export type StringInstrumentGroups = Record<
  StringInstrumentGroupKey,
  StringInstrumentGroup
>;

/** Built-in string instrument groups for navigation and filtering. */
export const stringInstrumentGroups: StringInstrumentGroups =
  _stringInstrumentGroups;

/** Ordered keys for the built-in string instrument groups. */
export const stringInstrumentGroupKeys: readonly StringInstrumentGroupKey[] =
  Object.keys(_stringInstrumentGroups) as readonly StringInstrumentGroupKey[];
