/**
 * Collection of note labeling systems used in music theory and composition.
 * Provides various ways to represent musical pitches and harmonies.
 *
 * Features:
 * - Accidental styles (sharp ♯, flat ♭)
 * - Interval qualities (perfect, major, minor)
 * - Relative and Extension Notes (6, 13)
 * - Solfege systems (fixed do, movable do)
 * - Chord symbols (triads, sevenths)
 * - Roman numeral chords
 *
 * @example
 * ```ts
 * import { noteLabelThemes } from "@musodojo/music-theory-data/note-labels";
 *
 * // Get flat note names
 * const flatLabels = noteLabelThemes.flat.labels;  // ["C", "D♭", "D", ...]
 *
 * // Get relative interval qualities
 * const qualities = noteLabelThemes.quality.labels;  // ["P1", "m2", "M2", ...]
 * ```
 *
 * @module
 */

import type {
  NoteLabelTheme,
  NoteLabelThemeKey,
} from "../types/note-labels.d.ts";

/**
 * An object containing the available note label themes,
 * such as flat notes, sharp notes, and various other representations.
 */
export const noteLabelThemes: Record<NoteLabelThemeKey, NoteLabelTheme> = {
  flat: {
    name: "Flat Notes",
    shortName: "Flat",
    isRelative: false,
    labels: ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"],
  },

  sharp: {
    name: "Sharp Notes",
    shortName: "Sharp",
    isRelative: false,
    labels: ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"],
  },

  fixedDoFlat: {
    name: "Solfege Fixed Do Flat Notes",
    shortName: "Fixed Do Flat",
    isRelative: false,
    labels: [
      "do",
      "re♭",
      "re",
      "mi♭",
      "mi",
      "fa",
      "sol♭",
      "sol",
      "la♭",
      "la",
      "si♭",
      "si",
    ],
  },

  fixedDoSharp: {
    name: "Solfege Fixed Do Sharp Notes",
    shortName: "Fixed Do Sharp",
    isRelative: false,
    labels: [
      "do",
      "do♯",
      "re",
      "re♯",
      "mi",
      "fa",
      "fa♯",
      "sol",
      "sol♯",
      "la",
      "la♯",
      "si",
    ],
  },

  movableDo: {
    name: "Solfege Movable Do Notes",
    shortName: "Movable Do",
    isRelative: true,
    labels: [
      "do",
      "ra",
      "re",
      "me",
      "mi",
      "fa",
      "fi",
      "sol",
      "le",
      "la",
      "te",
      "ti",
    ],
  },

  movableLa: {
    name: "Solfege Movable La Notes",
    shortName: "Movable La",
    isRelative: true,
    labels: [
      "la",
      "te",
      "ti",
      "do",
      "di",
      "re",
      "re",
      "mi",
      "fa",
      "fi",
      "sol",
      "si",
    ],
  },
};
