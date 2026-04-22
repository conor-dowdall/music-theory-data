import type { StringInstrumentGroup } from "../../types/string-instruments.d.ts";

export const guitarInstrumentGroup: StringInstrumentGroup = {
  displayName: "Guitar",
  description:
    "Guitar fretboards with common standard, alternate, and open tunings.",
  instrumentKeys: ["guitar"],
} as const;

export const bassInstrumentGroup: StringInstrumentGroup = {
  displayName: "Bass",
  description:
    "Bass guitar fretboards with common standard and extended-range tunings.",
  instrumentKeys: ["bassGuitar"],
} as const;

export const folkAndFrettedStringsInstrumentGroup: StringInstrumentGroup = {
  displayName: "Folk & Fretted Strings",
  description:
    "Mandolin, ukulele, and related fretted string instruments often used in folk, traditional, and popular styles.",
  instrumentKeys: ["mandolin", "ukulele"],
} as const;

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

export type StringInstrumentGroupKey = keyof typeof _stringInstrumentGroups;

export type StringInstrumentGroups = Record<
  StringInstrumentGroupKey,
  StringInstrumentGroup
>;

export const stringInstrumentGroups: StringInstrumentGroups =
  _stringInstrumentGroups;

export const stringInstrumentGroupKeys: readonly StringInstrumentGroupKey[] =
  Object.keys(_stringInstrumentGroups) as readonly StringInstrumentGroupKey[];
