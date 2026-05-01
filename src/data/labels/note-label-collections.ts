import type { ChromaticMode, ChromaticTuple } from "../chromatic.ts";

/** A fixed 12-element tuple of strings representing each note in the chromatic scale. */
export type NoteLabelGroup = ChromaticTuple<string>;

/** The data interface governing an entire collection array of 12 note labels. */
export interface NoteLabelCollection {
  readonly name: string;
  readonly shortName: string;
  readonly mode: ChromaticMode;
  readonly labels: NoteLabelGroup;
}

const _noteLabelCollections = {
  noteNamesFlat: {
    name: "Flat Note Names",
    shortName: "Flat Notes",
    mode: "absolute",
    labels: ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"],
  },

  noteNamesSharp: {
    name: "Sharp Note Names",
    shortName: "Sharp Notes",
    mode: "absolute",
    labels: ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"],
  },

  intervalsFlat: {
    name: "Flat Note Intervals",
    shortName: "Flat Intervals",
    mode: "relative",
    labels: ["1", "♭2", "2", "♭3", "3", "4", "♭5", "5", "♭6", "6", "♭7", "7"],
  },

  intervalsSharp: {
    name: "Sharp Note Intervals",
    shortName: "Sharp Intervals",
    mode: "relative",
    labels: ["1", "♯1", "2", "♯2", "3", "4", "♯4", "5", "♯5", "6", "♯6", "7"],
  },

  extensionsFlat: {
    name: "Flat Note Extensions",
    shortName: "Flat Extensions",
    mode: "relative",
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

  extensionsSharp: {
    name: "Sharp Note Extensions",
    shortName: "Sharp Extensions",
    mode: "relative",
    labels: [
      "1",
      "♯1",
      "9",
      "♯9",
      "3",
      "11",
      "♯11",
      "5",
      "♯5",
      "13",
      "♯13",
      "7",
    ],
  },

  fixedDoFlat: {
    name: "Solfege Fixed Do Flat Notes",
    shortName: "Fixed Do Flat",
    mode: "absolute",
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
    mode: "absolute",
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
    mode: "relative",
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
    mode: "relative",
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
} as const;

/** A union string of valid keys to lookup different note label collections. */
export type NoteLabelCollectionKey = keyof typeof _noteLabelCollections;

/** A dictionary holding arrays mapping integer semitones into note/solfege names for varied contexts. */
export const noteLabelCollections: Record<
  NoteLabelCollectionKey,
  NoteLabelCollection
> = _noteLabelCollections;
