import type { NoteLabelTheme } from "../../types/note-labels.d.ts";

/**
 * Defines a type that represents the available note label themes.
 */
export type NoteLabelThemes = typeof noteLabelThemes;

/**
 * Defines a type that represents the names of the available
 * note label themes.
 */
export type NoteLabelThemeName = keyof NoteLabelThemes;

/**
 * An object containing the available note label themes,
 * such as flat notes, sharp notes, and various other representations.
 */
export const noteLabelThemes = {
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

  relative: {
    name: "Relative Intervals",
    shortName: "Relative",
    isRelative: true,
    labels: ["1", "♭2", "2", "♭3", "3", "4", "♭5", "5", "♭6", "6", "♭7", "7"],
  },

  quality: {
    name: "Relative Interval Qualities",
    shortName: "Quality",
    isRelative: true,
    labels: [
      "P1",
      "m2",
      "M2",
      "m3",
      "M3",
      "P4",
      "d5",
      "P5",
      "m6",
      "M6",
      "m7",
      "M7",
    ],
  },

  extension: {
    name: "Relative Interval Extensions",
    shortName: "Extension",
    isRelative: true,
    labels: [
      "1",
      "♭9",
      "9",
      "♭3",
      "3",
      "11",
      "♭5",
      "5",
      "♭13",
      "13",
      "♭7",
      "7",
    ],
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

  /**
   * Can be overwritten in a specific NoteSequenceTheme using labelsOverride.
   * e.g. "M", "m", "o", "+", ...
   */
  triad: {
    name: "Triad Chords",
    shortName: "Triad",
    isRelative: true,
    labels: ["", "", "", "", "", "", "", "", "", "", "", ""],
  },

  /**
   * Can be overwritten in a specific NoteSequenceTheme using labelsOverride.
   * e.g. "I", "ii", "V", ...
   */
  romanTriad: {
    name: "Roman Numeral Triad Chords",
    shortName: "Roman Triad",
    isRelative: true,
    labels: ["", "", "", "", "", "", "", "", "", "", "", ""],
  },

  /**
   * Can be overwritten in a specific NoteSequenceTheme using labelsOverride.
   * e.g. "M7", "m7", "7", ...
   */
  seventh: {
    name: "Seventh Chords",
    shortName: "Seventh",
    isRelative: true,
    labels: ["", "", "", "", "", "", "", "", "", "", "", ""],
  },

  /**
   * Can be overwritten in a specific NoteSequenceTheme using labelsOverride.
   * e.g. "IM7", "iim7", "V7", ...
   */
  romanSeventh: {
    name: "Roman Numeral Seventh Chords",
    shortName: "Roman Seventh",
    isRelative: true,
    labels: ["", "", "", "", "", "", "", "", "", "", "", ""],
  },
} satisfies Record<string, NoteLabelTheme>;
