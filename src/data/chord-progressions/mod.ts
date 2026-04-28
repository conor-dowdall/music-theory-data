import { basicChordProgressionTemplates } from "./basic.ts";
import { bluesChordProgressionTemplates } from "./blues.ts";
import { jazzChordProgressionTemplates } from "./jazz.ts";
import { popChordProgressionTemplates } from "./pop.ts";

export { basicChordProgressionTemplates } from "./basic.ts";
export { bluesChordProgressionTemplates } from "./blues.ts";
export { jazzChordProgressionTemplates } from "./jazz.ts";
export { popChordProgressionTemplates } from "./pop.ts";

export const chordProgressionTemplates = {
  ...basicChordProgressionTemplates,
  ...popChordProgressionTemplates,
  ...bluesChordProgressionTemplates,
  ...jazzChordProgressionTemplates,
} as const;

export type ChordProgressionTemplateKey =
  keyof typeof chordProgressionTemplates;

export const groupedChordProgressionTemplates = {
  basicChordProgressionTemplates,
  popChordProgressionTemplates,
  bluesChordProgressionTemplates,
  jazzChordProgressionTemplates,
} as const;

export type ChordProgressionTemplateGroupKey =
  keyof typeof groupedChordProgressionTemplates;
