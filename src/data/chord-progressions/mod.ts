import { basicChordProgressionTemplates } from "./basic.ts";
import { bluesChordProgressionTemplates } from "./blues.ts";
import { jazzChordProgressionTemplates } from "./jazz.ts";
import { popChordProgressionTemplates } from "./pop.ts";
import type {
  ChordProgressionTemplateCategory,
  ChordProgressionTemplateType,
} from "../../types/chord-progressions.d.ts";

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

/** Human-readable DisplayName and Description metadata for top-level chord progression groups. */
export const chordProgressionTemplateGroupsMetadata: Record<
  ChordProgressionTemplateGroupKey,
  {
    displayName: string;
    description: string;
  }
> = {
  basicChordProgressionTemplates: {
    displayName: "Basic",
    description:
      "Simple beginner-friendly formulas and playable loops built from foundational harmonic movement.",
  },
  popChordProgressionTemplates: {
    displayName: "Pop",
    description:
      "Common songwriting loops used across pop, rock, folk, and related styles.",
  },
  bluesChordProgressionTemplates: {
    displayName: "Blues",
    description:
      "Blues forms and dominant-chord progressions, including twelve-bar templates.",
  },
  jazzChordProgressionTemplates: {
    displayName: "Jazz",
    description:
      "Functional harmony templates, turnarounds, cadences, and standard jazz forms.",
  },
} as const;

/** Human-readable DisplayName and Description metadata for chord progression categories. */
export const chordProgressionTemplateCategoryMetadata: Record<
  ChordProgressionTemplateCategory,
  {
    displayName: string;
    description: string;
  }
> = {
  basic: chordProgressionTemplateGroupsMetadata.basicChordProgressionTemplates,
  pop: chordProgressionTemplateGroupsMetadata.popChordProgressionTemplates,
  blues: chordProgressionTemplateGroupsMetadata.bluesChordProgressionTemplates,
  jazz: chordProgressionTemplateGroupsMetadata.jazzChordProgressionTemplates,
} as const;

/** Human-readable DisplayName and Description metadata for chord progression template types. */
export const chordProgressionTemplateTypeMetadata: Record<
  ChordProgressionTemplateType,
  {
    displayName: string;
    description: string;
  }
> = {
  formula: {
    displayName: "Formula",
    description:
      "A reusable harmonic relationship, not necessarily a complete playable loop or song form.",
  },
  loop: {
    displayName: "Loop",
    description: "A short playable chord progression intended to repeat.",
  },
  form: {
    displayName: "Form",
    description:
      "A longer structured progression with named sections or a conventional song form.",
  },
} as const;
